import KoaRouter from 'koa-router';
import upload from './router/upload'
import login from './router/user'

const router = KoaRouter({ prefix: '/api'});

router.use('/upload', upload.routes())
.use('/login',login.routes())

export default router


