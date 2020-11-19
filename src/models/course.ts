import { model, Schema } from 'mongoose';

export interface ICourse {
  id?: string;
  title: string;
  price: number;
  description: string;
  img: string;
}

export const courseSchema: Schema<ICourse> = new Schema<ICourse>( {
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    maxlength: 5000,
    required: true
  },
  img: {
    type: String,
    required: true
  }
} );

export default model( 'Course', courseSchema );
