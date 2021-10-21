import Router, { RouterContext } from 'koa-router';
import { genToken } from './jwt';
import { WebToken } from './model';
import { nextTick } from 'process';
import Koa from 'koa';


export const router = new Router();


// 토큰 없어두 댐 ㅎ
router.get('/public', async (ctx: RouterContext) =>{
    ctx.body = "hello public!";
})

router.get('/public/login', async(ctx: RouterContext, next :Koa.Next) =>{ 
    if (ctx.query["id"] !== undefined && typeof(ctx.query["id"]) === 'string'){
        const token = genToken(ctx.query["id"], Math.random() * 100);
        ctx.cookies.set('jwt_token', token);
        ctx.body = token;
    }
    else{
        ctx.status = 401;
        ctx.body = "please pass your id into query <id>";
    }
})

router.get('/public/logout', async(ctx: RouterContext)=>{
    ctx.cookies.set('jwt_token', null);
    ctx.body = "logout!";
})


// 토큰 필요 ㅠ
router.get('/', (ctx : RouterContext)=>{
    ctx.body = "hello auth";
})

router.get('/sans', (ctx: RouterContext) =>{
    ctx.body = '몰라요';
})

router.get('/userinfo', (ctx: RouterContext)=>{
        ctx.body = ctx.state.user;
})