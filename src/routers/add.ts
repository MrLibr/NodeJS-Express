import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { notificationSuccessAddNewCourse } from '../services/notification.service';
import Course from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, guardMiddleware, ( req: Request, res: Response ) => {
  res.render( PathConstants.ADD_COURSE_PAGE, {
    title: ParamsConstants.ADD_COURSE_PAGE,
    isAddCourse: true
  } );
} );

router.post( RouterConstants.ROOT, guardMiddleware, async ( req: Request, res: Response ) => {
  const { title, price, description, img } = req.body;
  const course = new Course( { title, price, description, img, userId: req.user } );

  try {
    await course.save();
    notificationSuccessAddNewCourse( req, res );
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
