import KoaRouter from 'koa-router';
import {returnMsg} from '../../utils/index'

const index = KoaRouter();

// 返回首页城市列表
index.get('/get-cities', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: {cities:[{city_id:'1',city_name:'上海'},{city_id:'2',city_name:'北京'},{city_id:'3',city_name:'广州'},{city_id:'4',city_name:'深圳'},{city_id:'5',city_name:'杭州'},{city_id:'6',city_name:'南京'},{city_id:'7',city_name:'苏州'}]},...returnMsg.success};
});

// 根据城市获取首页广告图和banner图
index.get('/get-index-img/:id', async (ctx, next) => {
  console.log(ctx.params.id);
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: {poster:'image/post.gif',banner:'image/main.png'},...returnMsg.success};
});

export default index


