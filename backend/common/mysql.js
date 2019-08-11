const mysql=require('mysql');
const tool=require('./tool.js');

db=mysql.createPool({
    host:'localhost',
    post:'3306',
    user:'root',
    password: tool.env()==='production'?'123456Aa+':'12345678',
    database:'mytest'
});

module.exports={
    queryFromMysql:(sql=>{
        return new Promise((resolve,reject)=>{
            db.query(sql,(err,data)=>{
                if(err)
                    reject(err)
                else
                    resolve(data)
            })
        })
    })
}
