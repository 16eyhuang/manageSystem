const mysqlJs=require('../../common/mysql');
const tool=require('../../common/tool');

class avatar{
    async postAvatar(ctx){
        let url='http://up.imgapi.com/';
        let deadline=Math.floor(new Date().getTime()/1000)+60;
        let aid=1622308;
        let from=ctx.request.body.from;
        let data={};
        data.deadline=deadline;
        data.aid=aid;
        data.from=from;
        data.token='936405e830e54cba87b37191d7142823ba4c1f0c:mAcmlCBgDdsYr8R3O_X5b5T_qe8=:eyJkZWFkbGluZSI6MTU2NTIyNTI5OSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNjgwNTUzIiwiYWlkIjoiMTYyMjMwOCIsImZyb20iOiJ3ZWIifQ==';
        let res=await tool.awaitPost(url,data);
        return ctx.body=res;
    }
}
module.exports=new avatar();
