import express, { Request, Response } from 'express';
import { ErrorTypes } from '../constants/error-message.constants';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { notificationSuccessAddNewCourse } from '../services/notification.service';
import Course from './../models/course';
import { catchErrors, coursesValidation } from './../services/validation.service';

const router = express.Router();

router.get( RouterConstants.ROOT, guardMiddleware, ( req: Request, res: Response ) => {
  res.render( PathConstants.ADD_COURSE_PAGE, {
    title: ParamsConstants.ADD_COURSE_PAGE,
    isAddCourse: true,
    undefinedError: req.flash( ErrorTypes.UNDEFINED_ERROR )
  } );
} );

router.post( RouterConstants.ROOT, guardMiddleware, coursesValidation, async ( req: Request, res: Response ) => {
  if ( catchErrors( req, res, RouterConstants.ADD ) ) {
    const { title, price, description, img } = req.body;
    const course = new Course( { title, price, description, img, userId: req.user } );

    try {
      await course.save();
      notificationSuccessAddNewCourse( req, res );
    } catch ( error ) {
      console.log( error );
    }
  }
} );

export default router;
