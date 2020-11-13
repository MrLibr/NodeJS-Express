import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import Course from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.ADD_COURSE_PAGE, {
    title: ParamsConstants.ADD_COURSE_PAGE,
    isAddCourse: true
  } );
} );

router.post( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const { title, price, img } = req.body;
  const course = new Course( title, price, img );
  await course.save();

  res.redirect( RouterConstants.ALL_COURSES );
} );

export default router;
