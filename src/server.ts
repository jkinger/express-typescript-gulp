import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser'; // Parse incoming request bodies
import * as cookieParser from 'cookie-parser'; // Parse incoming request's cookies
import * as logger from 'morgan'; // HTTP request logger middleware
import * as compression from 'compression'; // Compress response bodies for all requests
import * as errorHandler from 'errorhandler';
import * as chalk from 'chalk';
import i18next from 'i18next';
import i18nextExpress from 'i18next-express-middleware'; // middleware to use i18next in express.js.
import router from './router';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '../..'));


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

// multilingual support
i18next
  .use(i18nextExpress.LanguageDetector)
  .init({
    preload: ['en', 'es']
   });

app.use(i18nextExpress.handle(i18next, {
  removeLngFromUrl: false
}));

// Add cache control headers
function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

// Serve static files with cache control headers
app.use('/styles', cacheControl, express.static(path.join(__dirname, 'styles'), { maxAge: 30 }));
app.use('/images', cacheControl, express.static(path.join(__dirname, 'images'), { maxAge: 30 }));
app.use('/js', cacheControl, express.static(path.join(__dirname, 'js'), { maxAge: 30 }));

// Add routes
app.use(router);

// Error Handler.
app.use(errorHandler());

// Start Express server.
const server = app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')}
    in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});
