import compression from 'compression';
import flash from 'connect-flash';
import connectMongoSession from 'connect-mongodb-session';
import csurf from 'csurf';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import os from 'os';
import { ConfigConstants } from './constants/config.constants';
import { NamingConstants } from './constants/naming.constants';
import { ParamsConstants } from './constants/params.constants';
import { PathConstants } from './constants/path.constants';
import { RouterConstants } from './constants/router.constants';
import authMiddleware from './middleware/auth.middleware';
import createUserModelMiddleware from './middleware/create-user-model.middleware';
import errorMiddleware from './middleware/error.middleware';
import filesMiddleware from './middleware/files.middleware';
import tokenMiddleware from './middleware/token.middleware';
import aboutRouters from './routers/about';
import addCourseRouters from './routers/add';
import authRouters from './routers/auth';
import cardRouters from './routers/cart';
import allCoursesRouters from './routers/courses';
import homeRouters from './routers/home';
import ordersRouters from './routers/orders';
import profileRouters from './routers/profile';


const app = express();
const handlebars = expressHandlebars.create( {
  defaultLayout: NamingConstants.MAIN_LAYOUT,
  extname: NamingConstants.HANDLEBARS,
  helpers: require( './utils/handlebars.helpers' )
} );

const MongoDBStore = connectMongoSession( session );
const store = new MongoDBStore( {
  collection: NamingConstants.COLLECTION_SESSION,
  uri: ConfigConstants.MONGO_DB_URI
} );

app.engine( NamingConstants.HANDLEBARS, handlebars.engine );
app.set( NamingConstants.VIEW_ENGINE, NamingConstants.HANDLEBARS );
app.set( PathConstants.VIEWS_FOLDER_STANDART, PathConstants.VIEWS_FOLDER_CUSTOM );

app.use( express.static( PathConstants.PUBLIC_FOLDER ) );
app.use( express.static( PathConstants.AVATAR_FOLDER ) );

app.use( express.urlencoded( { extended: true } ) );
app.use( session( {
  secret: ConfigConstants.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store
} ) );
app.use( filesMiddleware.single( ParamsConstants.AVATAR ) );
app.use( helmet( { contentSecurityPolicy: false } ) );
app.use( compression() );
app.use( csurf() );
app.use( flash() );
app.use( authMiddleware );
app.use( tokenMiddleware );
app.use( createUserModelMiddleware );

app.use( RouterConstants.ROOT, homeRouters );
app.use( RouterConstants.AUTH, authRouters );
app.use( RouterConstants.ALL_COURSES, allCoursesRouters );
app.use( RouterConstants.ADD, addCourseRouters );
app.use( RouterConstants.ABOUT, aboutRouters );
app.use( RouterConstants.ORDERS, ordersRouters );
app.use( RouterConstants.CART, cardRouters );
app.use( RouterConstants.PROFILE, profileRouters );
app.use( errorMiddleware );

serverStart();

async function serverStart() {
  try {
    const PORT: string | number = process.env.PORT || 3000;

    await mongoose.connect( ConfigConstants.MONGO_DB_URI, {
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
