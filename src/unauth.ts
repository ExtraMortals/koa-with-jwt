import Koa from 'koa';

export const ErrorHandler = async (ctx : Koa.Context, next : Koa.Next) =>{
    return next().catch((e : unknown )=>{ // on Auth Error
        if (e instanceof Koa.HttpError){
            console.log("headers : ", e.headers)
            console.log("status : ", e.status)
        }else{
            ctx.body = "unknown error!";
        }
    })
}