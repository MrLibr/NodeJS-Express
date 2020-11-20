import { model, Schema } from 'mongoose';
import { ModelsConstants } from './../constants/models.constants';
export interface ICardCourse {
  count: number;
  courseId: string;
}

export interface ICard {
  items: ICardCourse[];
}

export const cardSchema: Schema<ICard> = new Schema( {
  items: [ {
    count: {
      type: Number,
      required: true,
      default: 1
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: ModelsConstants.COURSE,
      required: true
    }
  } ]
} );

export default model( ModelsConstants.CARD, cardSchema );
