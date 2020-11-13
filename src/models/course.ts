import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PathConstants } from './../constants/path.constants';

export interface ICourse {
  id: string;
  title: string;
  price: number;
  description: string;
  img: string;
}

export default class Course {
  private id: string;
  private title: string;
  private price: number;
  private description: string;
  private img: string;

  constructor ( title: string, price: number, description: string, img: string ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.img = img;
    this.id = uuidv4();
  }

  static getAll(): Promise<ICourse[]> {
    return new Promise( ( resolve, reject ) => {
      fs.readFile(
        path.join(
          __dirname,
          PathConstants.UP_FOLDER,
          PathConstants.UP_FOLDER,
          PathConstants.DATA_FOLDER,
          PathConstants.COURSES_JSON
        ), 'UTF-8',
        ( error, data ) => error ? reject( error ) : resolve( JSON.parse( data ) ) );
    } );
  }

  getObject(): ICourse {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      description: this.description,
      img: this.img
    };
  }

  async save(): Promise<void> {
    const courses: ICourse[] = await Course.getAll();
    courses.push( this.getObject() );

    return new Promise( ( resolve, reject ) => {
      fs.writeFile(
        path.join(
          __dirname,
          PathConstants.UP_FOLDER,
          PathConstants.UP_FOLDER,
          PathConstants.DATA_FOLDER,
          PathConstants.COURSES_JSON
        ),
        JSON.stringify( courses ),
        error => error ? reject( error ) : resolve() );
    } );
  }
}
