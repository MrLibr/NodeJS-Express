import express from 'express';
import expressHandlebars from 'express-handlebars';
import mongoose from 'mongoose';
import os from 'os';
import { NamingConstants } from './constants/naming.constants';
import { PathConstants } from './constants/path.constants';
import { RouterConstants } from './constants/router.constants';
import aboutRouters from './routers/about';
import addCourseRouters from './routers/add';
import cardRouters from './routers/card';
import allCoursesRouters from './routers/courses';
import homeRouters from './routers/home';


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

app.use( RouterConstants.ROOT, homeRouters );
app.use( RouterConstants.ALL_COURSES, allCoursesRouters );
app.use( RouterConstants.ADD, addCourseRouters );
app.use( RouterConstants.ABOUT, aboutRouters );
app.use( RouterConstants.CARD, cardRouters );

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

    app.listen( PORT, () => {
      console.log( `Server Is Running with OS: ${ os.platform() } ${ os.arch() }... You Can Watch This http://localhost:${ PORT }` );
    } );
  } catch ( error ) {
    console.log( error );
  }
}
