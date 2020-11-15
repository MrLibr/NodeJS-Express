import express, { Request, Response } from 'express';
import { ParamsConstants } from './../constants/params.constants';
import { PathConstants } from './../constants/path.constants';
import { RouterConstants } from './../constants/router.constants';
import { Card, ICard } from './../models/card';
import Course, { ICourse } from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const card: ICard = await Card.fetch();
  res.render( PathConstants.CARD_PAGE, {
    title: ParamsConstants.CARD_HEADER,
    isCard: true,
    card
  } );
} );

router.post( RouterConstants.ADD, async ( req: Request, res: Response ) => {
  const course: ICourse = await Course.getById( req.body.id ) as ICourse;
  await Card.add( course );
  res.redirect( RouterConstants.CARD );
} );
export default router;
