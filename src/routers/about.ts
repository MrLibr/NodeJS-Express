import express, { Request, Response } from 'express';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import { RouterConstants } from '../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.ABOUT_PAGE, {
    title: ParamsConstants.ABOUT_PAGE,
    isAbout: true
  } );
} );

export default router;
