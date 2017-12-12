import Koa from 'koa';
// import api from './api';
// import config from './config';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

const app = new Koa()
  .use(cors())
  .use(async (ctx, next) => {
    ctx.state.collections = '';
    ctx.state.authorizationHeader = `Key`;
    await next();
  })

export default app;