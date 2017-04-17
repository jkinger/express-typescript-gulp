import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser"; //Parse incoming request bodies (json) to be used by your handlers
import * as cookieParser from "cookie-parser"; //Parse incoming request's cookies to be used by your handlers
import * as morgan from "morgan"; // HTTP request logger middleware
import * as compression from "compression"; // The middleware will attempt to compress response bodies for all requests

const app = express();
const ROOT = path.join(path.resolve(__dirname, '../..'));

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Add html template render engine.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));

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
app.use('/styles', cacheControl, express.static(path.join(__dirname, 'styles'), {maxAge: 30})); // server assets
//app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false})); // client assets

// Add routes
app.get("/", (req, res) => {
    res.render(
        "index",
        { title: "Typescript + Gulp + Pug + Express",
          message: "So Far So Good!" })
});

let server = app.listen(app.get('port'), () => {
 console.log(`Listening on: http://localhost:${server.address().port}`);
});