import express, { Request, Response } from 'express';
import { HTTPStatuses } from '../constants/http-statuses.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import Cart, { ICart } from '../models/cart';
import Course from '../models/course';
import { ParamsConstants } from './../constants/params.constants';
import { ICourse } from './../models/course';
import { IUser } from './../models/user';

export interface IAdvancedCourse extends ICourse {
  count: number;
}

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const user: IUser = await req.user
    .populate( 'cart.items.courseId' )
    .execPopulate();

  const courses: IAdvancedCourse[] = mapToCart( user.cart );
  const totalPrice: number = computePrice( courses );

  res.render( PathConstants.CART_PAGE, {
    title: ParamsConstants.CART_HEADER,
    isCart: true,
    courses,
    totalPrice
  } );
} );

router.post( RouterConstants.ADD, async ( req: Request, res: Response ) => {
  const course: ICourse = await Course.findById( req.body.id ).lean() as ICourse;
  await req.user.addToCart( course );
  res.redirect( RouterConstants.CART );
} );

router.delete( RouterConstants.REMOVE + RouterConstants.BY_ID, async ( req: Request, res: Response ) => {
  const cart: ICart = await Cart.remove( req.params.id );
  res.status( HTTPStatuses.SUCCESS ).json( cart );
} );


function mapToCart( cart: ICart ): IAdvancedCourse[] {
  return cart.items.map( course => ( { ...course.courseId._doc, count: course.count } ) );
}

function computePrice( courses: IAdvancedCourse[] ): number {
  return courses.reduce( ( total: number, currentCourse: IAdvancedCourse ) => total + currentCourse.count * currentCourse.price, 0 );
}

export default router;
