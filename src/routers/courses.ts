import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
import { NamingConstants } from './../constants/naming.constants';
import Course, { ICourse } from './../models/course';

const router = express.Router();

router.get( RouterConstants.ROOT, async ( req: Request, res: Response ) => {
  const courses: ICourse[] = await Course.getAll();

  res.render( PathConstants.ALL_COURSES, {
    title: ParamsConstants.ALL_COURSES_PAGE,
    isAllCourses: true,
    courses
  } );
} );

router.get( RouterConstants.BY_ID, async ( req: Request, res: Response ) => {
  const course: ICourse | undefined = await Course.getById( req.params.id );
  res.render( PathConstants.CURRENT_COURSE_PAGE, {
    layout: NamingConstants.ADDITIONAL_LAYOUT,
    title: ParamsConstants.COURSE_HEADER + course?.title,
    course
  } );
} );

export default router;
