let MongoClient=require('mongodb').MongoClient;
//const DB_CONN_STR="mongodb://localhost:27017/";

module.exports={
    /*
    * 查询mongodb
    * params:
    *   db_conn_str:mongodb地址
    *   table:查询的数据库
    *   collection:查询的集合
    *   findObj:查询条件
    * reject:
    *   err
    * resolve:
    *   查询到的内容*/
    queryMongodb:((db_conn_str,table,collection,findObj)=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(db_conn_str,{useNewUrlParser: true, useUnifiedTopology: true},function (err,db) {
                if(err){
                    reject(err);
                }
                else{
                    let dbo=db.db(table);
                    dbo.collection(collection).find(findObj).toArray(function (err,result) {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                        db.close();
                    });
                }
            });
        });
    })
}
