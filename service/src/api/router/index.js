import KoaRouter from 'koa-router';
import returnMsg from '../../utils/returnMsg'

const index = KoaRouter();
index.get('/get-banner', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: {imgUrl:'image/main.png'},...returnMsg.success};
});

index.get('/get-poster', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: {imgUrl:'image/post.gif'},...returnMsg.success};
});

export default index


