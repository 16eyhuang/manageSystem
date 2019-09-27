const db_conn_str="mongodb://localhost:27017/";
const table="class";
const collection="class_detail2";
const mongodbJs=require('../../common/mongodb');

/*
* 处理查询到的数据（把学生删掉）
* params:
*   msg:待处理的数据
* return:
*   arr:课程信息*/
function dealWithMsg(msg) {
    let arr=[];
    for(let i=0;i<msg.length;i++){
        let obj={};
        obj.class_id=msg[i].class_id;
        obj.class_name=msg[i].class_name;
        obj.class_semester=msg[i].class_semester;
        obj.class_time=msg[i].class_time;
        obj.class_teacher=msg[i].class_teacher;
        obj.classroom=msg[i].classroom;
        obj.class_student=msg[i].class_student;
        arr.push(obj);
    }
    return arr;
}

class _class {
    /*
    * 依据姓名获取所有课程*/
    async getClassByName(ctx){
        let res;
        let name=ctx.request.body.name;
        let findObj={class_student:{"$elemMatch":{student_name:name}}};
        let msg=await mongodbJs.queryMongodb(db_conn_str,table,collection,findObj);
        let arr=dealWithMsg(msg);
        //console.log(arr);
        res={
            status:200,
            data:arr
        }
        return ctx.body=res;
    }

    /*
    * 依据姓名和学期获取课程*/
    async getClassByClassAndSemester(ctx){
        let res;
        let name=ctx.request.body.name;
        let semester=ctx.request.body.semester;
        let findObj={class_student:{"$elemMatch":{student_name:name}},class_semester:semester};
        let msg=await mongodbJs.queryMongodb(db_conn_str,table,collection,findObj);
        let arr=dealWithMsg(msg);
        res={
            status:200,
            data:arr
        }
        return ctx.body=res;
    }

    /*
    * 依据条件获取课程*/
    async getClassByFindObj(ctx){
        let res;
        let findObj=JSON.parse(ctx.request.body.findObj);
        if(findObj.class_teacher!==null&&findObj.class_teacher!==undefined){
            findObj.class_teacher=new RegExp(findObj.class_teacher);
        }
        //console.log(findObj);
        let msg=await mongodbJs.queryMongodb(db_conn_str,table,collection,findObj);
        let arr=dealWithMsg(msg);
        res={
            status:200,
            data:arr
        }
        return ctx.body=res;
    }

    /*
    * 依据教师名字查询教师任课*/
    async getTeacherClassByName(ctx){
        let res;
        let name=ctx.request.body.name;
        let reg=new RegExp("^.*"+name+".*$");
        let findObj={class_teacher:reg};
        let msg=await mongodbJs.queryMongodb(db_conn_str,table,collection,findObj);
        let arr=dealWithMsg(msg);
        //console.log(arr);
        res={
            status:200,
            data:arr
        }
        return ctx.body=res;
    }
}

module.exports=new _class();
