import { model, Schema } from 'mongoose';
import { ModelsConstants } from '../constants/models.constants';
export interface ICartCourse {
  count: number;
  courseId: string;
}

export interface ICart {
  items: ICartCourse[];
}

export const cartSchema: Schema<ICart> = new Schema( {
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

export default model( ModelsConstants.CART, cartSchema );
