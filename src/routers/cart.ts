import express, { Request, Response } from 'express';
import { HTTPStatuses } from '../constants/http-statuses.constants';
import { PathConstants } from '../constants/path.constants';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { ICart } from '../models/cart';
import Course from '../models/course';
import { deleteErrorNotification, notificationErrorAuthorization, notificationSuccessAddToCart, successNotification } from '../services/notification.service';
import { ErrorMessages, ErrorTypes } from './../constants/error-message.constants';
import { ParamsConstants } from './../constants/params.constants';
import { RouterConstants } from './../constants/router.constants';
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
      totalPrice,
      successOperation: req.flash( ErrorTypes.SUCCESS_OPERATION ),
      deleteError: req.flash( ErrorTypes.DELETE_ERROR )
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
      await req.user.addToCart( course );
      notificationSuccessAddToCart( req, res );
    } else {
      notificationErrorAuthorization( req, res );
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

    successNotification( req, ErrorMessages.REMOVE_COURSE_SUCCESS );
    res.status( HTTPStatuses.SUCCESS ).json( { courses, totalPrice: totalPrice } );
  } catch ( error ) {
    deleteErrorNotification( req, ErrorMessages.REMOVE_COURSE_FAILED );
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
