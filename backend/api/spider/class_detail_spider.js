/*用来爬取课程信息的，并且存储到mongodb*/
let http = require('http');
let iconv = require('iconv-lite');
let MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/";

/*
* 提取相关信息
* params:
*   html:原始网页
* return:
*   obj:课程信息对象*/
function dealWithHtml(html) {
    let obj = {}; //课程信息对象
    let class_id = html.match(/id="ctl00_cpContent_lbl_ClassID">(.+?)<\/span>/) || null;
    if (class_id == null) {
        return {};
    }
    if (class_id != null && class_id[1] && class_id[1] != null && class_id[1] != undefined) {
        obj.class_id = class_id[1].trim();
    }
    let class_name = html.match(/id="ctl00_cpContent_lbl_CourseName">(.+?)<\/span>/) || null;
    if (class_name != null && class_name[1] && class_name[1] != null && class_name[1] != undefined) {
        obj.class_name = class_name[1].trim();
    }
    let class_semester = html.match(/id="ctl00_cpContent_lbl_Semester">(.+?)<\/span>/) || null;
    if (class_semester != null && class_semester[1] && class_semester[1] != null && class_semester[1] != undefined) {
        obj.class_semester = class_semester[1].trim();
    }
    let class_time = html.match(/id="ctl00_cpContent_lbl_Time">(.+?)<\/span>/) || null;
    if (class_time != null && class_time[1] && class_time[1] != null && class_time[1] != undefined) {
        obj.class_time = class_time[1].trim();
    }
    let class_teacher = html.match(/id="ctl00_cpContent_KkbTeacher".*?>(.+?)<\/a>/) || null;
    if (class_teacher != null && class_teacher[1] && class_teacher[1] != null && class_teacher[1] != undefined) {
        obj.class_teacher = class_teacher[1].trim();
    }
    let classroom = html.match(/id="ctl00_cpContent_KkbClassroom".*?>(.+?)<\/a>/) || null;
    if (classroom != null && classroom[1] && classroom[1] != null && classroom[1] != undefined) {
        obj.classroom = classroom[1].trim();
    }

    obj.class_student = [];

    let temp = html.split('上课学生');
    if (temp[1] == '' || temp[1] == null || temp[1] == undefined) {
        //obj={};
        return obj;
    }

    let tempStr = temp[1];
    let student1 = tempStr.match(/<tr class="gridview_alter">\r\n\t\t\t<td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td align="center">/g);
    if (student1 && student1.length > 0) {
        for (let i = 0; i < student1.length; i++) {
            let stuObj = {};
            let msg = student1[i].match(/<tr class="gridview_alter">\r\n\t\t\t<td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td align="center">/);
            stuObj.student_id = msg[1].trim();
            stuObj.student_name = msg[2].trim();
            stuObj.student_sex = msg[3].trim();
            stuObj.student_major = msg[4].trim();
            obj.class_student.push(stuObj);
        }
    }

    let student2 = tempStr.match(/<tr class="gridview_row">\r\n\t\t\t<td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td align="center">/g);
    if (student2 && student2.length > 0) {
        for (let i = 0; i < student2.length; i++) {
            let stuObj = {};
            let msg = student2[i].match(/<tr class="gridview_row">\r\n\t\t\t<td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td align="center">/);
            stuObj.student_id = msg[1].trim();
            stuObj.student_name = msg[2].trim();
            stuObj.student_sex = msg[3].trim();
            stuObj.student_major = msg[4].trim();
            obj.class_student.push(stuObj);
        }
    }
    return obj;
}

/*
* 爬取学分制课程信息
* params:
*   classId:课程号
* resolve:
*   处理后的课程对象
* reject:
*   发生错误*/
function awaitGetClass(classId) {
    return new Promise((resolve, reject) => {
        //学分制的课程详情
        let url = `http://credit.stu.edu.cn/Info/DisplayKkb.aspx?ClassID=${classId}&auth=F4CEA04DD7168B8FFDCAFF8240B7B83E`;
        let html = '';
        http.get(url, function (res) {
            res.on('data', function (data) {
                data = iconv.decode(data, 'GBK');
                html += data;
            });
            res.on('end', function () {
                resolve(dealWithHtml(html));
            });
        }).on('error', function (err) {
            console.log('error:' + classId);
            reject(err);
        });
    });
}

/*
* 将数据插入Mongodb中
* params:
*   data:待插入的数据
*   table:插入的表
*   collection:插入的集合*/
function awaitInsertClassData(data, table, collection) {
    return new Promise((resolve, reject) => {
        if (!data.class_id) {
            resolve(data);
            return;
        }
        MongoClient.connect(DB_CONN_STR, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
            if (err) {
                reject(err);
                throw err;
            }
            let dbo = db.db(table);
            dbo.collection(collection).insertOne(data, function (err, res) {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(res);
                db.close();
            });
        });
    });
}

/*
* 先获取再存储
* params:
*   classId:课程号
* return:
*   res:存储结果*/
async function getAndSave(classId) {
    let html = await awaitGetClass(classId);
    let res = await awaitInsertClassData(html, 'class', 'class_detail');
    return res;
}

/*
* 获取并存储[start,end]范围内的课程信息*/
async function getAllClass(start, end) {
    console.log(new Date().toTimeString());
    for (let i = start; i <= end; i++) {
        await getAndSave(i);
    }
    console.log(new Date().toTimeString());
}
