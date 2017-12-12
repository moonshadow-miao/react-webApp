import Koa from 'koa';
import router from './api';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

const path = require('path');
const serve = require('koa-static');
let json = require('koa-json');

const app = new Koa();

function MyError(message,status) {
  this.name = 'MyError';
  this.message = message || '请求失败!';
  this.status = status || 200;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

global.MyError = MyError;


// 统一处理错误
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 200;
    ctx.response.body = {
      message: err.message
    };
  }
};
app.use(errorHandler);

// 标识响应时间字段
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// 设置静态资源
const resource = serve(path.join(__dirname, '../static'));
app.use(resource);

// 设置跨域请求设置
const corsOptions = {
  origin: 'http://locahost:3000',
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  maxAge: 43200
};

// 请求体解析配置
const parseOption = {
  onerror: function (err, ctx) {
    ctx.throw('参数解析错误', 422);
  }
};

app.use(async (ctx, next) => {
  if (ctx.path.indexOf('/upload') !== -1) ctx.disableBodyParser = true;
  await next();
}).use(bodyParser(parseOption));

app.use(cors(corsOptions))
.use(json())
.use(router.routes())
.use(router.allowedMethods());
export default app;