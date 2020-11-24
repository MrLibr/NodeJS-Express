import { model, Schema } from 'mongoose';
import { ModelsConstants } from './../constants/models.constants';
import { cartSchema, ICart, ICartCourse } from './cart';
import { ICourse } from './course';

export interface IUser {
  email: string;
  name: string;
  cart: ICart;
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
  cart: cartSchema
} );

userSchema.methods.addToCart = function ( course: ICourse ): Promise<void> {
  const items: ICartCourse[] = [ ...this.cart.items ];
  const index: number = items.findIndex( item => item.courseId.toString() === course._id?.toString() );

  if ( index < 0 ) {
    items.push( { count: 1, courseId: course._id! } );
  } else {
    items[ index ].count++;
  }

  this.cart = { items };
  return this.save();
};

userSchema.methods.removeFromCart = function ( id: string ): Promise<void> {
  let items: ICartCourse[] = [ ...this.cart.items ];
  const index: number = items.findIndex( item => item.courseId.toString() === id );

  if ( items[ index ].count > 1 ) {
    items[ index ].count--;
  } else {
    items = items.filter( course => course.courseId.toString() !== id );
  }

  this.cart = { items };
  return this.save();
};

userSchema.methods.clearCart = function (): Promise<void> {
  this.cart.items = [];
  return this.save();
};

export default model( ModelsConstants.USER, userSchema );
