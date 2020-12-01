import express, { Request, Response } from 'express';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { getTotalOrder } from '../utils/router.helpers';
import { ParamsConstants } from './../constants/params.constants';
import { PathConstants } from './../constants/path.constants';
import { RouterConstants } from './../constants/router.constants';
import Order, { IOrder } from './../models/order';
import { IUser } from './../models/user';

const router = express.Router();

router.get( RouterConstants.ROOT, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    const orders = await Order
      .find( { [ ParamsConstants.USER_ID ]: req.user._id } )
      .populate( ParamsConstants.USER_ID )
      .populate( ParamsConstants.COURSES_ID ).lean() as IOrder[];

    res.render( PathConstants.ORDERS_PAGE, {
      isOrders: true,
      title: ParamsConstants.ORDERS_HEADER + req.user.name,
      totalOrder: getTotalOrder( orders )
    } );
  } catch ( error ) {
    console.log( error );
  }
} );

router.post( RouterConstants.ROOT, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    const user: IUser = await req.user.populate( ParamsConstants.CART_COURSES_ID ).execPopulate();
    const courses = [ ...user.cart.items ];
    const order = new Order( { userId: user, courses } );

    await order.save();
    await req.user.clearCart();

    res.redirect( RouterConstants.ORDERS );
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
