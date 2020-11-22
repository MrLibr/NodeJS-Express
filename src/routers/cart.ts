import express, { Request, Response } from 'express';
import { HTTPStatuses } from '../constants/http-statuses.constants';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import Cart, { ICart } from '../models/cart';
import Course, { ICourse } from '../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const cart: ICart = await Cart.fetch();
  res.render( PathConstants.CART_PAGE, {
    title: ParamsConstants.CART_HEADER,
    isCart: true,
    courses: cart.courses,
    totalPrice: cart.price
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

export default router;
