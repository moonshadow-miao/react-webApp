import Koa from 'koa';
import api from './api';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
const path = require('path');
const serve = require('koa-static');

const app = new Koa();

// 统一处理错误
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
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
const resource = serve(path.join(__dirname,'../static'));
app.use(resource);

// 设置跨域请求设置
var corsOptions = {
  origin: 'http://locahost:3000',
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials:true,
  maxAge:43200
}

app.use(cors(corsOptions))
.use(bodyParser())
.use(api.routes())

export default app;