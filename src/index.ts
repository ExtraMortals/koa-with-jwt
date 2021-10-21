import Koa from 'koa';
import { router } from './route';
import { JWT } from './jwt';
import { ErrorHandler } from './unauth';

const app = new Koa();

// ㅇㅁㅇ!!
app.use(ErrorHandler);
app.use(JWT);
app.use(router.routes());
app.use(router.allowedMethods());

// Listen
app.listen(4000, ()=> console.log("Listening to port 4000"));