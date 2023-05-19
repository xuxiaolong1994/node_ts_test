import express from 'express'
import bodyParser from 'body-parser';
// import { APIError } from './model/run-acorn/entity/message';
// import { postsRouter } from './api/posts/apiPosts';
import { acorn_run } from './model/run-acorn/service/acorn-service.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const logger: express.RequestHandler = (req, res, next) => {
  console.log(
    new Date() + ' - ' + req.method + ' - ' + ' Request to ' + req.path
  );
  next();
};
app.use(logger);

// app.use((req, res, next) => {
//   if (req.accepts('application/json')) {
//     next();
//   }
//   else {
//     next(new APIError('Content Type Not supported', 'This API only supports application/json', 400));
//   }
// });

//设置允许跨域
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE'
  });
  next()
});

app.disable('x-powered-by');



app.get('/headers', (req, res, next) => res.json(req.headers));

// routes
app.get('/', (req, res, next) => {
  res.send('hello world!!');
});

// app.use('/posts', postsRouter);


// const result = acorn_run("D:/MF/PageSponsor.tsx")
// const result = acorn_run("D:/MF/Herebyfile.mjs")


const result = acorn_run("D:/MF/git/node_ts_test/src/server.ts")
console.log('acorn_run:', result);

app.listen(process.env.PORT || 8091, () => {
  console.log('Server started....');
});







