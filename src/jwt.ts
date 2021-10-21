import { sign, verify } from "jsonwebtoken";
import { Context } from "koa";
import jwt from "koa-jwt";
import { WebToken } from "./model";

const JWT_SECRET = "TOPSECRET1q2w3e4r" // TODO => dotenv
const TOKEN_VALID_TIME = 60; // 60분 동안 유효~

const Hour = (h : number)=>{
    return h * 60;
}

const JWT = jwt({
    secret: JWT_SECRET,
    cookie: "jwt_token",
}).unless({
    path: [/^\/public/] // JWT 지정하지 않을 경로를 선택.. 정규표현식으로 ㅎ
})



const genToken = (strdata: string, numbdata: number)  =>{
    const ret =  {
        strdata: strdata,
        numdata: numbdata,
        exp: (Date.now() / 1000)  - Hour(TOKEN_VALID_TIME)
    }
    return sign(ret, JWT_SECRET) 
    // TODO
    // exp 를 토큰안에 멍청하게 박아두지 말고 
    // sign 의 세번째 인자 의 옵션객체에 expiresIn 을 박아 넣어두자~
}

export {JWT, genToken};