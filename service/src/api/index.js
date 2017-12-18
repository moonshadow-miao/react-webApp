import KoaRouter from 'koa-router';
import upload from './router/upload'
import user from './router/user'
import index from './router/index'

const router = KoaRouter({prefix: '/api'});

router
.use('/user', user.routes())
.use('/info', index.routes())
.use('/upload', upload.routes())

export default router


