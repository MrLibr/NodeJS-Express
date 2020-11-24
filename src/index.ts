import express, { NextFunction } from 'express';
import expressHandlebars from 'express-handlebars';
import mongoose from 'mongoose';
import os from 'os';
import { NamingConstants } from './constants/naming.constants';
import { PathConstants } from './constants/path.constants';
import { RouterConstants } from './constants/router.constants';
import User from './models/user';
import aboutRouters from './routers/about';
import addCourseRouters from './routers/add';
import cardRouters from './routers/cart';
import allCoursesRouters from './routers/courses';
import homeRouters from './routers/home';
import ordersRouters from './routers/orders';


const app = express();
const handlebars = expressHandlebars.create( {
  defaultLayout: NamingConstants.MAIN_LAYOUT,
  extname: NamingConstants.HANDLEBARS
} );

app.engine( NamingConstants.HANDLEBARS, handlebars.engine );
app.set( NamingConstants.VIEW_ENGINE, NamingConstants.HANDLEBARS );
app.set( PathConstants.VIEWS_FOLDER_STANDART, PathConstants.VIEWS_FOLDER_CUSTOM );

app.use( express.static( PathConstants.PUBLIC_FOLDER ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const currentUser = await User.findById( '5fb7d139ad5c1462c95ad0a3' );
    req.user = currentUser;
    next();
  } catch ( error ) {
    console.log( error );
  }
} );

app.use( RouterConstants.ROOT, homeRouters );
app.use( RouterConstants.ALL_COURSES, allCoursesRouters );
app.use( RouterConstants.ADD, addCourseRouters );
app.use( RouterConstants.ABOUT, aboutRouters );
app.use( RouterConstants.ORDERS, ordersRouters );
app.use( RouterConstants.CART, cardRouters );

serverStart();

async function serverStart() {
  try {
    const PORT: string | number = process.env.PORT || 3000;
    const url: string = `mongodb+srv://Libr:26ZzcP4IBlap5p0L@courseshop.1blve.mongodb.net/coursesShop`;

    await mongoose.connect( url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    } );

    const condidate = await User.findOne().lean();

    if ( !condidate ) {
      const newUser = new User( {
        email: 'max@gmail.com',
        name: 'Maxim',
        card: { items: [] }
      } );

      await newUser.save();
    }

    app.listen( PORT, () => {
      console.log( `Server Is Running with OS: ${ os.platform() } ${ os.arch() }... You Can Watch This http://localhost:${ PORT }` );
    } );
  } catch ( error ) {
    console.log( error );
  }
}
