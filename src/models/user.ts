import { model, Schema } from 'mongoose';
import { cardSchema, ICard } from './card';

export interface IUser {
  email: string;
  name: string;
  card: ICard;
};

export const userSchema: Schema<IUser> = new Schema<IUser>( {
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  card: cardSchema
} );

export default model( 'User', userSchema );
