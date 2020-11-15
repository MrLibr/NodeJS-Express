import fs from 'fs';
import path from 'path';
import { PathConstants } from '../constants/path.constants';
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

  static async fetch(): Promise<ICard> {
    return new Promise( ( resolve, reject ) => {
      fs.readFile(
        Card.getPath(),
        'UTF-8',
        ( error, data ) => error ? reject( error ) : resolve( JSON.parse( data ) )
      );
    } );
  }

  static async add( course: ICourse ): Promise<void> {
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

    return new Promise( ( resolve, reject ) => {
      fs.writeFile(
        Card.getPath(),
        JSON.stringify( card ),
        error => error ? reject( error ) : resolve()
      );
    } );
  }
}
