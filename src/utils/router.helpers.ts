import { Request } from 'express';
import { UserStatus } from '../constants/params.constants';
import { ICart } from '../models/cart';
import { ICourse } from '../models/course';
import { IOrder } from './../models/order';

export interface IAdvancedCourse extends ICourse {
  count: number;
}

export function mapToCart( cart: ICart ): IAdvancedCourse[] {
  return cart.items.map( course => ( { ...course.courseId._doc, count: course.count } ) );
}

export function computePrice( courses: IAdvancedCourse[] ): number {
  return courses.reduce( ( total: number, currentCourse: IAdvancedCourse ) => total + currentCourse.count * currentCourse.price, 0 );
}

export function getTotalOrder( orders: IOrder[] ) {
  return orders.map( ( order: IOrder ) => ( {
    id: order._id,
    courses: order.courses,
    data: new Date( order.createDate ).toLocaleDateString(),
    user: order.userId,
    price: order.courses.reduce( ( total: number, course: number ) => total += course.count * course.courseId.price, 0 )
  } ) );
}

export function isOwnerOrAdmin( req: Request, course: ICourse ): boolean {
  const isUserCreator: boolean = course.userId.toString() === req.user._id.toString();
  const isRootStatus: boolean = req.user.status === UserStatus.ADMIN || req.user.status === UserStatus.MODERATOR;
  return isUserCreator || isRootStatus;
}
