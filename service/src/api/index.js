import KoaRouter from 'koa-router';
import upload from './router/upload'
import user from './router/user'
import index from './router/index'

const router = KoaRouter({prefix: '/api'});

router.use('/upload', upload.routes())
.use('/user', user.routes())

export default router


