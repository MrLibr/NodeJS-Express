import express, { Request, Response } from 'express';
import { ParamsConstants } from './../constants/params.constants';
import { PathConstants } from './../constants/path.constants';
import { RouterConstants } from './../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  res.render( PathConstants.ORDERS_PAGE, {
    isOrders: true,
    title: ParamsConstants.ORDERS_HEADER + req.user.name
  } );
} );

router.post( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  res.redirect( RouterConstants.ORDERS );
} );

export default router;
