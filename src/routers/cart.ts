import express, { Request, Response } from 'express';
import { HTTPStatuses } from '../constants/http-statuses.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import guardMiddleware from '../middleware/guard.middleware';
import { ICart } from '../models/cart';
import Course from '../models/course';
import { ParamsConstants } from './../constants/params.constants';
import { ICourse } from './../models/course';
import { IUser } from './../models/user';

export interface IAdvancedCourse extends ICourse {
  count: number;
}

const router = express.Router();

router.get( RouterConstants.ROOT, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    const user: IUser = await req.user.populate( ParamsConstants.CART_COURSES_ID ).execPopulate();

    const courses: IAdvancedCourse[] = mapToCart( user.cart );
    const totalPrice: number = computePrice( courses );

    res.render( PathConstants.CART_PAGE, {
      title: ParamsConstants.CART_HEADER,
      isCart: true,
      courses,
      totalPrice
    } );
  } catch ( error ) {
    console.log( error );
  }
} );

router.post( RouterConstants.ADD, guardMiddleware, async ( req: Request, res: Response ) => {
  try {

    const course: ICourse = await Course.findById( req.body.id ).lean() as ICourse;
    const currentUser = req.session.user;

    if ( currentUser ) {
      await currentUser.addToCart( course );
      res.redirect( RouterConstants.CART );
    } else {
      res.redirect( RouterConstants.AUTH );
    }
  } catch ( error ) {
    console.log( error );
  }
} );

router.delete( RouterConstants.REMOVE + RouterConstants.BY_ID, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    await req.user.removeFromCart( req.params.id );
    const user: IUser = await req.user.populate( ParamsConstants.CART_COURSES_ID ).execPopulate();

    const courses: IAdvancedCourse[] = mapToCart( user.cart );
    const totalPrice: number = computePrice( courses );

    res.status( HTTPStatuses.SUCCESS ).json( { courses, totalPrice: totalPrice } );
  } catch ( error ) {
    console.log( error );
  }
} );


export function mapToCart( cart: ICart ): IAdvancedCourse[] {
  return cart.items.map( course => ( { ...course.courseId._doc, count: course.count } ) );
}

export function computePrice( courses: IAdvancedCourse[] ): number {
  return courses.reduce( ( total: number, currentCourse: IAdvancedCourse ) => total + currentCourse.count * currentCourse.price, 0 );
}

export default router;
