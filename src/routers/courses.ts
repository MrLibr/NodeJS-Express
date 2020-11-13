import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';
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

export default router;
