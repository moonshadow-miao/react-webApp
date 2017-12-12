import KoaRouter from 'koa-router';

const api = KoaRouter({ prefix: '/api'});

api.get('/',
  async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.status = 200;
    ctx.body = { data: 'Hello World' };
  });

export default api


