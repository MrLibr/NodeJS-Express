import { model, Schema } from 'mongoose';
import { ModelsConstants } from './../constants/models.constants';

export interface IOrder {
  courses: {
    courseId: string;
    count: number;
  };
  userId: string;
  createDate: Date;
}

export const orderSchema: Schema<IOrder> = new Schema<IOrder>( {
  courses: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: ModelsConstants.COURSE,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelsConstants.USER,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
} );

export default model( ModelsConstants.ORDER, orderSchema );
