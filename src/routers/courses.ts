import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import { NamingConstants } from './../constants/naming.constants';
import Course from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const courses = await Course.find().lean();

  res.render( PathConstants.ALL_COURSES, {
    title: ParamsConstants.ALL_COURSES_PAGE,
    isAllCourses: true,
    courses
  } );
} );

router.get( RouterConstants.BY_ID, async ( req: Request, res: Response ) => {
  const course = await Course.findById( req.params.id ).lean();

  res.render( PathConstants.CURRENT_COURSE_PAGE, {
    layout: NamingConstants.ADDITIONAL_LAYOUT,
    title: ParamsConstants.COURSE_HEADER + course?.title,
    course
  } );
} );

router.get( RouterConstants.EDIT_BY_ID, async ( req: Request, res: Response ) => {
  const { allow } = req.query;

  if ( !allow ) {
    return res.redirect( RouterConstants.ROOT );
  } else {
    const course = await Course.findById( req.params.id ).lean();

    res.render( PathConstants.EDIT_COURSE_PAGE, {
      title: ParamsConstants.EDIT_COURSE_HEADER + course?.title,
      course
    } );
  }
} );

router.post( RouterConstants.EDIT, async ( req: Request, res: Response ) => {
  await Course.findOneAndUpdate( req.body._id, req.body );
  res.redirect( RouterConstants.ALL_COURSES );
} );

export default router;
