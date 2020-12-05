import { Request } from 'express';
import multer from 'multer';
import { PathConstants } from '../constants/path.constants';

const storage = multer.diskStorage( {
  destination( req: Request, file: Express.Multer.File, callback: any ) {
    callback( null, PathConstants.AVATAR_FOLDER );
  },
  filename( req: Request, file: Express.Multer.File, callback: any ) {
    callback( null, file.originalname + Date.now() );
  }
} );

const fileFilter = ( req: Request, file: Express.Multer.File, callback: any ) => {
  const allowedImgTypes: string[] = [ 'image/png', 'image/jpg', 'image/jpeg' ];

  if ( allowedImgTypes.includes( file.mimetype ) ) {
    callback( null, true );
  } else {
    callback( null, false );
  }
};

export default multer( { storage, fileFilter } );
