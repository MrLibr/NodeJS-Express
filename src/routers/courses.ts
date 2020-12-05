import express, { Request, Response } from 'express';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { notificationNotPermission, notificationSuccessDeleteCourse, notificationSuccessUpdateCourse } from '../services/notification.service';
import { catchErrors } from '../services/validation.service';
import { isOwnerOrAdmin } from '../utils/router.helpers';
import { ErrorTypes } from './../constants/error-message.constants';
import { NamingConstants } from './../constants/naming.constants';
import { ParamsConstants } from './../constants/params.constants';
import Course, { ICourse } from './../models/course';
import { coursesValidation } from './../services/validation.service';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  try {
    const courses = await Course.find()
      .populate( ParamsConstants.USER_ID, `${ ParamsConstants.EMAIL } ${ ParamsConstants.NAME }` )
      .lean();

    res.render( PathConstants.ALL_COURSES, {
      title: ParamsConstants.ALL_COURSES_PAGE,
      isAllCourses: true,
      courses,
      userId: req.user ? req.user._id : null,
      userStatus: req.user ? req.user.status : null,
      successOperation: req.flash( ErrorTypes.SUCCESS_OPERATION ),
      undefinedError: req.flash( ErrorTypes.UNDEFINED_ERROR )
    } );
  } catch ( error ) {
    console.log( error );
  }
} );

router.get( RouterConstants.BY_ID, async ( req: Request, res: Response ) => {
  try {
    const course = await Course.findById( req.params.id ).lean();

    res.render( PathConstants.CURRENT_COURSE_PAGE, {
      layout: NamingConstants.ADDITIONAL_LAYOUT,
      title: ParamsConstants.COURSE_HEADER + course?.title,
      course
    } );
  } catch ( error ) {
    console.log( error );
  }
} );

router.get( RouterConstants.EDIT_BY_ID, guardMiddleware, async ( req: Request, res: Response ) => {
  const { allow } = req.query;

  if ( !allow ) {
    return res.redirect( RouterConstants.ROOT );
  } else {

    try {
      const course = await Course.findById( req.params.id ).lean() as ICourse;

      if ( isOwnerOrAdmin( req, course ) ) {
        res.render( PathConstants.EDIT_COURSE_PAGE, {
          title: ParamsConstants.EDIT_COURSE_HEADER + course?.title,
          course
        } );
      } else {
        return notificationNotPermission( req, res );
      }

    } catch ( error ) {
      console.log( error );
    }
  }
} );

router.post( RouterConstants.EDIT, guardMiddleware, coursesValidation, async ( req: Request, res: Response ) => {
  try {
    const editPagePath: string = RouterConstants.ALL_COURSES + RouterConstants.ROOT + req.body.id + RouterConstants.EDIT + ParamsConstants.PERMISSION_ACCESS;

    if ( catchErrors( req, res, editPagePath ) ) {
      const course = await Course.findById( req.body.id ).lean() as ICourse;

      if ( isOwnerOrAdmin( req, course ) ) {
        await Course.findByIdAndUpdate( req.body.id, req.body );
        notificationSuccessUpdateCourse( req, res );
      } else {
        return notificationNotPermission( req, res );
      }
    }
  } catch ( error ) {
    console.log( error );
  }
} );

router.post( RouterConstants.REMOVE, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    const course = await Course.findById( req.body.id ).lean() as ICourse;

    if ( isOwnerOrAdmin( req, course ) ) {
      await Course.findByIdAndDelete( req.body.id );
      notificationSuccessDeleteCourse( req, res );
    } else {
      return notificationNotPermission( req, res );
    }

  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
