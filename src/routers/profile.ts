import express, { Request, Response } from 'express';
import { ErrorTypes } from '../constants/error-message.constants';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import authMiddleware from '../middleware/auth.middleware';
import { RouterConstants } from './../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, authMiddleware, async ( req: Request, res: Response ) => {
  res.render( PathConstants.PROFILE_PAGE, {
    title: ParamsConstants.PROFILE_HEADER + req.user.name,
    isProfile: true,
    user: req.user.toObject(),
    undefinedError: req.flash( ErrorTypes.UNDEFINED_ERROR )
  } );
} );

export default router;
