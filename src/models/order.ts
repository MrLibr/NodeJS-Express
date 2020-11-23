import { model, Schema } from 'mongoose';
import { ModelsConstants } from './../constants/models.constants';
import { ICourse } from './course';

export interface IOrder {
  courses: {
    course: ICourse;
    count: number;
  };
  user: {
    userId: string;
    name: string;
  };
  createDate: Date;
}

const orderSchema: Schema<IOrder> = new Schema<IOrder>( {
  courses: [
    {
      course: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelsConstants.USER,
      required: true
    },
    name: {
      type: String
    }
  },
  createDate: {
    type: Date,
    default: Date.now
  }
} );

export default model( ModelsConstants.ORDER, orderSchema );
