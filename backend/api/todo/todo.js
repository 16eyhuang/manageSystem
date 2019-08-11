const mysql=require('mysql');
const url=require('url');
const mysqlJs=require('../../common/mysql');
const tool=require('../../common/tool');

class todo {
    /*获取某一用户的所有todo*/
    async getUserTodo(ctx){
        let res;
        let uid=ctx.request.body.uid;
        let todoList=JSON.parse(JSON.stringify(await mysqlJs.queryFromMysql(`SELECT * FROM todo WHERE uid = ${uid} ORDER BY todoid DESC`)));
        res={
            status:200,
            data:todoList
        }
        return ctx.body=res;
    }

    /*添加一条todo*/
    async addTodo(ctx){
        let res;
        let uid=ctx.request.body.uid;
        let username=ctx.request.body.username;
        let content=ctx.request.body.content;
        let addTime=new Date().getTime();
        let insertTodo=await mysqlJs.queryFromMysql(`INSERT INTO todo (uid, username, addTime, content) VALUES ('${uid}', '${username}', '${addTime}', '${content}')`);
        if(!insertTodo){
            res={
                status:201,
                message:'增加todo失败，请稍后重试'
            }
        }
        else{
            res={
                status:200,
                message: '增加todo成功'
            }
        }
        return ctx.body=res;
    }

    /*删除某一条todo*/
    async deleteTodo(ctx){
        let res;
        let todoid=ctx.request.body.todoid;
        let deleteTodo=await mysqlJs.queryFromMysql(`DELETE FROM todo WHERE todoid = '${todoid}'`);
        if(!deleteTodo){
            res={
                status:201,
                message:'删除todo失败，请稍后重试'
            }
        }
        else {
            res={
                status:200,
                message:'删除todo成功'
            }
        }
        return ctx.body=res;
    }

    /*变更todo状态*/
    async updateTodoState(ctx){
        let res;
        let todoid=ctx.request.body.todoid;
        let state=ctx.request.body.state;
        let updateState=await mysqlJs.queryFromMysql(`UPDATE todo SET todostate = '${state}' WHERE todoid = '${todoid}'`);
        if(!updateState){
            res={
                status:201,
                message:'更新todo失败，请稍后重试'
            }
        }
        else{
            res={
                status:200,
                message:'更新todo状态成功'
            }
        }
        return ctx.body=res;
    }
}

module.exports=new todo();
