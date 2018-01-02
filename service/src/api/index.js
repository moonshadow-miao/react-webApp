import KoaRouter from 'koa-router';
import upload from './router/upload'
import user from './router/user'
import index from './router/index'
import jwt from 'koa-jwt'
import {secret} from '../congfig'
const router = KoaRouter({prefix: '/api'});

router
.use(jwt({secret}).unless({
  path:[/\/api/]
}))
.use('/user', user.routes())
.use('/info', index.routes())
.use('/upload', upload.routes())

export default router


