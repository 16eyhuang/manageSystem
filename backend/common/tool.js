const ctypto=require('crypto');
const request=require('request');

module.exports={
    //md5加密密码
    md5:(str)=>{
        return ctypto.createHash('md5').update(str).digest('hex');
    },
    //将request包变成同步
    awaitRequest:(url)=>{
        return new Promise((resolve,reject)=>{
            request.get(url,(error,response,body)=>{
                if(error)
                    reject(error)
                else
                    resolve(body)
            })
        })
    },
    //同步post
    awaitPost:(url,data)=>{
        return new Promise((resolve,reject)=>{
            request.post(url,data,(error,response,body)=>{
                if(error)
                    reject(error)
                else
                    resolve(body)
            })
        })
    },
    //判断是否为生产环境
    env:()=>{
        return process.env.NODE_ENV || 'production';
    }
}
