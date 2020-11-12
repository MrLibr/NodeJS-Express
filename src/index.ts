import express, { Request, Response } from 'express';
import os from 'os';
import path from 'path';
import { HTTPStatuses } from './constants/http-statuses.constants';
import { PathConstants } from './constants/path.constants';
import { RouterConstants } from './constants/router.constants';

const app = express();

app.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res
    .status( HTTPStatuses.SUCCESS )
    .sendFile( path.join( __dirname, PathConstants.VIEWS_FOLDER, PathConstants.HOME_PAGE ) );
} );

app.get( RouterConstants.ABOUT, ( req: Request, res: Response ) => {
  res
    .status( HTTPStatuses.SUCCESS )
    .sendFile( path.join( __dirname, PathConstants.VIEWS_FOLDER, PathConstants.ABOUT_PAGE ) );
} );

const PORT: string | number = process.env.PORT || 3000;

app.listen( PORT, () => {
  console.log( `Server Is Running with OS: ${ os.platform() } ${ os.arch() }... You Can Watch This http://localhost:${ PORT }` );
} );
