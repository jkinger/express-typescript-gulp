import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser'; // Parse incoming request bodies
import * as cookieParser from 'cookie-parser'; // Parse incoming request's cookies
import * as morgan from 'morgan'; // HTTP request logger middleware
import * as compression from 'compression'; // Compress response bodies for all requests

const app = express();
const ROOT = path.join(path.resolve(__dirname, '../..'));

/**
 * Controllers
 */
import index from './controllers/index';
import about from './controllers/about';
import blog from './controllers/blog';
import contact from './controllers/contact';
import portfolio from './controllers/portfolio';
import services from './controllers/services';

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Add html template render engine.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Add middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('dev'));

// Add cache control headers
function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

// Serve static files with cache control headers
app.use('/styles', cacheControl, express.static(path.join(__dirname, 'styles'), {maxAge: 30}));
app.use('/images', cacheControl, express.static(path.join(__dirname, 'images'), {maxAge: 30}));
// app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

// Add routes
app.use('/', index);
app.use('/about', about);
app.use('/blog', blog);
app.use('/contact', contact);
app.use('/portfolio', portfolio);
app.use('/services', services);

const server = app.listen(app.get('port'), () => {
 console.log(`Listening on: http://localhost:${server.address().port}`);
});
