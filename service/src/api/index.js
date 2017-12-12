import KoaRouter from 'koa-router';

const api = KoaRouter();

api.get('/',
  async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.status = 200;
    ctx.body = { data: 'Hello World' };
  });

export default api


