import KoaRouter from 'koa-router';
import User from '../model/user'

const index = KoaRouter();
index.get('/get-banner', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: {imgUrl:'/main.png'}};
});

export default index


