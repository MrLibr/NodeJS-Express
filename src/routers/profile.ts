import express, { Request, Response } from 'express';
import { ErrorTypes } from '../constants/error-message.constants';
import { ParamsConstants } from '../constants/params.constants';
import { PathConstants } from '../constants/path.constants';
import authMiddleware from '../middleware/auth.middleware';
import User from '../models/user';
import { notificationSuccessUpdateUserInfo } from '../services/notification.service';
import { RouterConstants } from './../constants/router.constants';

const router = express.Router();

router.get( RouterConstants.ROOT, authMiddleware, async ( req: Request, res: Response ) => {
  res.render( PathConstants.PROFILE_PAGE, {
    title: ParamsConstants.PROFILE_HEADER + req.user.name,
    isProfile: true,
    user: req.user.toObject(),
    successOperation: req.flash( ErrorTypes.SUCCESS_OPERATION )
  } );
} );

router.post( RouterConstants.ROOT, authMiddleware, async ( req: Request, res: Response ) => {
  try {
    const updateData = { name: req.body.name };

    if ( req.file ) {
      updateData.avatarUrl = req.file.filename;
    }

    await User.findOneAndUpdate( { _id: req.user._id }, updateData );
    notificationSuccessUpdateUserInfo( req, res );
  } catch ( error ) {
    console.log( error );
  }

} );

export default router;
