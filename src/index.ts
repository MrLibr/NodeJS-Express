import express, { Request, Response } from 'express';
import expressHandlebars from 'express-handlebars';
import os from 'os';
import { NamingConstants } from './constants/naming.constants';
import { PathConstants } from './constants/path.constants';
import { RouterConstants } from './constants/router.constants';


const app = express();
const handlebars = expressHandlebars.create( {
  defaultLayout: NamingConstants.MAIN_LAYOUT,
  extname: NamingConstants.HANDLEBARS
} );

app.engine( NamingConstants.HANDLEBARS, handlebars.engine );
app.set( NamingConstants.VIEW_ENGINE, NamingConstants.HANDLEBARS );
app.set( PathConstants.VIEWS_FOLDER_STANDART, PathConstants.VIEWS_FOLDER_CUSTOM );

app.use( express.static( PathConstants.PUBLIC_FOLDER ) );

app.get( RouterConstants.ROOT, ( req: Request, res: Response ) => {
  res.render( PathConstants.HOME_PAGE );
} );

app.get( RouterConstants.ABOUT, ( req: Request, res: Response ) => {
  res.render( PathConstants.ABOUT_PAGE );
} );

const PORT: string | number = process.env.PORT || 3000;

app.listen( PORT, () => {
  console.log( `Server Is Running with OS: ${ os.platform() } ${ os.arch() }... You Can Watch This http://localhost:${ PORT }` );
} );
