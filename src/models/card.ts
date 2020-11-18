import fs from 'fs';
import path from 'path';
import { PathConstants } from '../constants/path.constants';
import { ICard, ICardCourse } from './card';
import { ICourse } from './course';


export interface ICardCourse extends ICourse {
  count: number;
}

export interface ICard {
  courses: ICardCourse[];
  price: number;
}

export class Card {

  private static getPath(): string {
    return path.join(
      __dirname,
      PathConstants.UP_FOLDER,
      PathConstants.UP_FOLDER,
      PathConstants.DATA_FOLDER,
      PathConstants.CARD_JSON
    );
  }

  private static async saveToFile( data: ICard ): Promise<ICard> {
    return new Promise( ( resolve, reject ) => {
      fs.writeFile(
        Card.getPath(),
        JSON.stringify( data ),
        error => error ? reject( error ) : resolve( data )
      );
    } );
  }

  static async fetch(): Promise<ICard> {
    return new Promise( ( resolve, reject ) => {
      fs.readFile(
        Card.getPath(),
        'UTF-8',
        ( error, data ) => error ? reject( error ) : resolve( JSON.parse( data ) )
      );
    } );
  }

  static async add( course: ICourse ): Promise<ICard> {
    const card: ICard = await Card.fetch();
    const courseIndexInCard = card.courses.findIndex( ( currentCourse: ICourse ) => {
      return currentCourse.id === course.id;
    } );
    const candidate: ICardCourse = card.courses[ courseIndexInCard ];

    if ( candidate ) {
      candidate.count++;
      card.courses[ courseIndexInCard ] = candidate;
    } else {
      card.courses.push( { ...course, count: 1 } );
    }

    card.price += +course.price;
    return Card.saveToFile( card );
  }

  static async remove( id: string ): Promise<ICard> {
    const card: ICard = await Card.fetch();
    const index: number = card.courses.findIndex( course => course.id === id );
    const currentCourse: ICardCourse = card.courses[ index ];

    if ( currentCourse.count === 1 ) {
      card.courses = card.courses.filter( course => course.id !== id );
    } else {
      card.courses[ index ].count--;
    }

    card.price -= currentCourse.price;
    return Card.saveToFile( card );
  }
}
