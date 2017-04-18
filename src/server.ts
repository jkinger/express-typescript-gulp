import path from 'path';
import express from 'express';
import bodyParser from 'body-parser'; // Parse incoming request bodies
import cookieParser from 'cookie-parser'; // Parse incoming request's cookies
import logger from 'morgan'; // HTTP request logger middleware
import compression from 'compression'; // Compress response bodies for all requests
import errorHandler from 'errorhandler';
import chalk from 'chalk';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '../..'));

// Controllers
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
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Add cache control headers
function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

// Serve static files with cache control headers
app.use('/styles', cacheControl, express.static(path.join(__dirname, 'styles'), { maxAge: 30 }));
app.use('/images', cacheControl, express.static(path.join(__dirname, 'images'), { maxAge: 30 }));
// app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

// Add routes
app.use('/', index);
app.use('/about', about);
app.use('/blog', blog);
app.use('/contact', contact);
app.use('/portfolio', portfolio);
app.use('/services', services);

// Error Handler.
app.use(errorHandler());

// Start Express server.
const server = app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});
