import express, { Request, Response } from 'express';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import guardMiddleware from '../middleware/guard-routers.middleware';
import { NamingConstants } from './../constants/naming.constants';
import { ParamsConstants } from './../constants/params.constants';
import Course from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  try {
    const courses = await Course.find()
      .populate( ParamsConstants.USER_ID, `${ ParamsConstants.EMAIL } ${ ParamsConstants.NAME }` )
      .lean();

    res.render( PathConstants.ALL_COURSES, {
      title: ParamsConstants.ALL_COURSES_PAGE,
      isAllCourses: true,
      courses
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
      const course = await Course.findById( req.params.id ).lean();

      res.render( PathConstants.EDIT_COURSE_PAGE, {
        title: ParamsConstants.EDIT_COURSE_HEADER + course?.title,
        course
      } );
    } catch ( error ) {
      console.log( error );
    }
  }
} );

router.post( RouterConstants.EDIT, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    await Course.findByIdAndUpdate( req.body.id, req.body );
    res.redirect( RouterConstants.ALL_COURSES );
  } catch ( error ) {
    console.log( error );
  }
} );

router.post( RouterConstants.REMOVE, guardMiddleware, async ( req: Request, res: Response ) => {
  try {
    await Course.findByIdAndDelete( req.body.id );
    res.redirect( RouterConstants.ALL_COURSES );
  } catch ( error ) {
    console.log( error );
  }
} );

export default router;
