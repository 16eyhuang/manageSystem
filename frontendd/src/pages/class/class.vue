<template>
  <div class="class-schedule">
    <div class="select-group">
      <el-select v-model="choose_year" @change="judgeSemester">
        <el-option v-for="item in year_options" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="choose_semester" @change="judgeSemester">
        <el-option v-for="item in semester_options" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="choose_type" style="padding: 0 20px;">
        <el-option label="学生" value="student"></el-option>
        <el-option label="教师" value="teacher"></el-option>
      </el-select>
      <el-input placeholder="请输入姓名" v-model="search_name">
        <el-button slot="append" icon="el-icon-search"
                   @click="getClassScheduleByFindObj(createFindObj(search_name,real_semester,choose_type))"></el-button>
      </el-input>
    </div>
    <div class="schedule-wrapper">
      <!--课程表-->
      <div class="schedule" v-loading="is_schedule_loading" v-show="!isShowClassDetail">
        <!--周几-->
        <div class="schedule-week-wrapper">
          <div class="schedule-week-item"></div>
          <div class="schedule-week-item">周日</div>
          <div class="schedule-week-item">周一</div>
          <div class="schedule-week-item">周二</div>
          <div class="schedule-week-item">周三</div>
          <div class="schedule-week-item">周四</div>
          <div class="schedule-week-item">周五</div>
          <div class="schedule-week-item" style="border-right: none">周六</div>
        </div>
        <div class="schedule-time-wrapper">
          <div class="schedule-time-item" title="08:00-08:45">1</div>
          <div class="schedule-time-item" title="08:55-09:40">2</div>
          <div class="schedule-time-item" title="10:00-10:45">3</div>
          <div class="schedule-time-item" title="10:55-11:40">4</div>
          <div class="schedule-time-item" title="11:50-12:35">5</div>
          <div class="schedule-time-item" title="14:00-14:45">6</div>
          <div class="schedule-time-item" title="14:55-15:40">7</div>
          <div class="schedule-time-item" title="16:00-16:45">8</div>
          <div class="schedule-time-item" title="16:55-17:40">9</div>
          <div class="schedule-time-item" title="17:50-18:35">0</div>
          <div class="schedule-time-item" title="19:20-20:05">A</div>
          <div class="schedule-time-item" title="20:15-21:00">B</div>
          <div class="schedule-time-item" style="border-bottom: none" title="21:10-21:55">C</div>
        </div>
        <div v-for="item in show_class_arr" class="schedule-class-basic"
             :style="{backgroundColor:item.color,top:item.top,width:item.width,height:item.height,left:item.left}" @click="showClassDetail(item)">
          <div style="width: 90%;font-size: 10px;">{{item.class_name_forShow}}</div>
          <div style="width: 90%;font-size: 10px;margin-top: 5px;">{{item.classroom}}</div>
        </div>
      </div>
      <!--课程详细信息-->
      <div class="class-detail-wrapper" v-show="isShowClassDetail" :style="{backgroundColor: classDetail.color}" style="font-size: 14px;">
        <div class="class-detail-top" style="width: 100%;display: flex;flex-direction: column;height:auto;font-size: 25px;color: #ffffff;">
          <i style="margin:10px 0 10px 5%;cursor: pointer;" class="el-icon-back" @click="backToClass"></i>
          <div style="margin-left: 5%;padding-bottom: 10px;width: 90%;border-bottom: 1px solid #ffffff;" >{{classDetail.class_name}}</div>
        </div>
        <div class="class-detail-item" style="color: #ffffff;width: 90%;margin-left: 5%;padding: 15px 0;display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #ffffff;">
          <i class="el-icon-ice-cream-square" style="padding: 0 5px 0 5px;"></i>
          <div style="padding-right: 50px;">班号</div>
          <div>{{classDetail.class_id}}</div>
        </div>
        <div class="class-detail-item" style="color: #ffffff;width: 90%;margin-left: 5%;padding: 15px 0;display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #ffffff;">
          <i class="el-icon-location" style="padding: 0 5px 0 5px;"></i>
          <div style="padding-right: 50px;">教室</div>
          <div>{{classDetail.classroom}}</div>
        </div>
        <div class="class-detail-item" style="color: #ffffff;width: 90%;margin-left: 5%;padding: 15px 0;display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #ffffff;">
          <i class="el-icon-s-custom" style="padding: 0 5px 0 5px;"></i>
          <div style="padding-right: 50px;">教师</div>
          <div>{{classDetail.class_teacher}}</div>
        </div>
        <div class="class-detail-item" style="color: #ffffff;width: 90%;margin-left: 5%;padding: 15px 0;display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #ffffff;">
          <i class="el-icon-time" style="padding: 0 5px 0 5px;"></i>
          <div style="padding-right: 50px;">时间</div>
          <div>{{classDetail.class_time}}</div>
        </div>
        <div class="class-detail-item" style="color: #ffffff;width: 90%;margin-left: 5%;padding: 15px 0;display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #ffffff;cursor: pointer;" @click="changeShowStudent">
          <i class="el-icon-user" style="padding: 0 5px 0 5px;"></i>
          <div style="padding-right: 250px;">学生</div>
          <i :class="showStudent?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        </div>
        <div v-show="showStudent">
          <el-table :data="classDetail.class_student" style="width: 100%;" max-height="200" row-style="{backgroundColor:classDetail.color}">
            <el-table-column prop="student_id" label="学号" min-width="100"></el-table-column>
            <el-table-column prop="student_major" label="专业" min-width="150"></el-table-column>
            <el-table-column prop="student_name" label="姓名" min-width="75"></el-table-column>
            <el-table-column prop="student_sex" label="性别" min-width="50"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="schedule-right-wrapper" style="margin-left: 50px; width: 400px;height: 550px;display: flex;flex-direction: column;">
        <div style="width: 50%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
          <div style="font-size: 16px;font-weight: 700;margin-bottom: 20px;">当前周数：</div>
          <el-input v-model="currentWeek" size="mini">
            <el-button slot="prepend" icon="el-icon-arrow-left" @click="subtractCurrentWeek"></el-button>
            <el-button slot="append" icon="el-icon-arrow-right" @click="addCurrentWeek"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        class_data: [],
        choose_year: '2019-2020学年',
        choose_semester: '秋季学期',
        choose_type: "student",
        year_options: ['2019-2020学年', '2018-2019学年', '2017-2018学年', '2016-2017学年'],
        semester_options: ['秋季学期', '春季学期', '夏季学期'],
        colorArr: ["#666666", "#FF9900", "#996633", "#9933FF", "#FF3300", "#66CC00", "#0066FF", "#006600", "#663300", "#FF3366", "#000066", "#CC9090", "#ff6633", "#33CCCC", "#33CC33", "#009999"],
        search_name: "",
        is_schedule_loading: false,
        currentWeek:0,
        isShowClassDetail:false,
        classDetail:'',
        showStudent:false
      }
    },
    computed: {
      class_schedule() {
        if (this.class_data.length > 0) {
          let str = this.choose_year + this.choose_semester;
          let arr = [];
          let class_data = this.class_data;
          for (let i = 0; i < this.class_data.length; i++) {
            // if(class_data[i].class_semester===str){
            let obj = {};
            obj.class_id = class_data[i].class_id;
            obj.class_name = class_data[i].class_name;
            obj.class_name_forShow = class_data[i].class_name.replace(/\[.*?\]/g, '');
            obj.class_semester = class_data[i].class_semester;
            obj.class_teacher = class_data[i].class_teacher;
            obj.class_student = class_data[i].class_student;
            obj.class_time = class_data[i].class_time;
            let timeArr = class_data[i].class_time.split('，');
            //console.log(timeArr);
            let duration_temp = timeArr[0].replace(/[^0-9]/ig, " ").split(" ");
            obj.duration = {start: parseInt(duration_temp[0]), end: parseInt(duration_temp[1])};
            obj.real_time = [];
            for (let j = 1; j < timeArr.length; j++) {
              let obj2 = {};
              obj2.day = timeArr[j].slice(0, 2);
              let temp = timeArr[j].slice(3, timeArr[j].length - 2);
              let temparr = temp.split('');
              if (temparr[0] === "单") {
                obj2.type = "单";
                temparr.shift();
                obj2.timeArr = temparr;
              } else if (temparr[0] === "双") {
                obj2.type = "双";
                temparr.shift();
                obj2.timeArr = temparr;
              } else {
                obj2.type = "全";
                obj2.timeArr = temparr;
              }
              obj.real_time.push(obj2);
            }
            obj.classroom = class_data[i].classroom;
            obj.color = this.colorArr[i];
            arr.push(obj);
            //}
          }
          return arr;
        } else {
          return [];
        }
      },
      show_class_arr() {
        if (this.class_schedule.length == 0) {
          return []
        } else {
          let arr = [];
          let class_schedule = this.class_schedule;
          //console.log(class_schedule.length);
          for (let i = 0; i < class_schedule.length; i++) {
            let real_time = class_schedule[i].real_time;
            for (let j = 0; j < real_time.length; j++) {
              let obj = {};
              obj.class_id = class_schedule[i].class_id;
              obj.class_name = class_schedule[i].class_name;
              obj.class_name_forShow = class_schedule[i].class_name_forShow;
              obj.class_semester = class_schedule[i].class_semester;
              obj.class_student = class_schedule[i].class_student;
              obj.class_teacher = class_schedule[i].class_teacher;
              obj.class_time = class_schedule[i].class_time;
              obj.classroom = class_schedule[i].classroom;
              obj.color = class_schedule[i].color;
              obj.duration = class_schedule[i].duration;
              obj.real_time = class_schedule[i].real_time;
              obj.type = real_time[j].type;
              obj.width = "50px";
              switch (real_time[j].day) {
                case "周日":
                  obj.left = "50px";
                  break;
                case "周一":
                  obj.left = "100px";
                  break;
                case "周二":
                  obj.left = "150px";
                  break;
                case "周三":
                  obj.left = "200px";
                  break;
                case "周四":
                  obj.left = "250px";
                  break;
                case "周五":
                  obj.left = "300px";
                  break;
                case "周六":
                  obj.left = "350px";
                  break;
              }
              obj.height = (real_time[j].timeArr.length * 40) + "px";
              switch (real_time[j].timeArr[0]) {
                case "1": {
                  obj.top = "30px";
                  break;
                }
                case "2": {
                  obj.top = "70px";
                  break;
                }
                case "3": {
                  obj.top = "110px";
                  break;
                }
                case "4": {
                  obj.top = "150px";
                  break;
                }
                case "5": {
                  obj.top = "190px";
                  break;
                }
                case "6": {
                  obj.top = "230px";
                  break;
                }
                case "7": {
                  obj.top = "270px";
                  break;
                }
                case "8": {
                  obj.top = "310px";
                  break;
                }
                case "9": {
                  obj.top = "350px";
                  break;
                }
                case "0": {
                  obj.top = "390px";
                  break;
                }
                case "A": {
                  obj.top = "430px";
                  break;
                }
                case "B": {
                  obj.top = "470px";
                  break;
                }
                case "C": {
                  obj.top = "510px";
                  break;
                }
              }
              /*这里判断单双周和范围*/
              if(obj.type==="全"){
                if(this.currentWeek>=obj.duration.start&&this.currentWeek<=obj.duration.end){
                  arr.push(obj);
                }
              }
              else if(obj.type==="单"){
                if(this.currentWeek%2===1&&this.currentWeek>=obj.duration.start&&this.currentWeek<=obj.duration.end){
                  arr.push(obj);
                }
              }
              else if(obj.type==="双"){
                if(this.currentWeek%2===0&&this.currentWeek>=obj.duration.start&&this.currentWeek<=obj.duration.end){
                  arr.push(obj);
                }
              }
            }
          }
          return arr;
        }
      },
      real_semester() {
        return this.choose_year + this.choose_semester;
      }
    },
    components: {},
    mounted() {
      this.getClassScheduleByFindObj(this.createFindObj("黄恩毅", "2018-2019学年秋季学期", "student"));
      this.initCurrentWeek();
    },
    methods: {
      createFindObj(name, semester, type) {
        let obj = {}
        if (type === "student") {
          obj = {"class_student": {"$elemMatch": {"student_name": name}}, "class_semester": semester};
        } else if (type === "teacher") {
          let reg = "^.*" + name + ".*$";
          //console.log(String(reg));
          obj = {"class_teacher": reg, "class_semester": semester};
        }
        return JSON.stringify(obj);
      },

      getClassScheduleByFindObj(findObj) {
        this.is_schedule_loading = true;
        this.$axios
          .post('/api/class/getClassByFindObj', {
            findObj: findObj
          })
          .then(res => {
            if (res.data.status == 200) {
              this.class_data = res.data.data;
              this.is_schedule_loading = false;
              //console.log(this.class_data);
              //console.log(this.class_schedule);
              console.log(this.show_class_arr)
            } else {
              this.is_schedule_loading = false;
              this.$message({
                message: '请求出错',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.is_schedule_loading = false;
          })
      },

      getClassSchedule(name) {
        this.is_schedule_loading = true;
        this.$axios
          .post('/api/class/getClassByName', {
            name: name
          })
          .then(res => {
            if (res.data.status == 200) {
              this.class_data = res.data.data;
              //console.log(this.class_data);
              this.is_schedule_loading = false;
              console.log(this.show_class_arr);
            } else {
              this.is_schedule_loading = false;
              this.$message({
                message: '请求出错',
                type: 'error'
              });
            }
            //console.log(this.class_data);
            //console.log(this.class_schedule);
            //console.log(this.show_class_arr);
          })
          .catch(err => {
            console.log(err);
            this.is_schedule_loading = false;
          })
      },

      /*
      * 判断输入学期是否合法*/
      judgeSemester() {
        if (this.choose_semester === '夏季学期' && this.choose_year === '2019-2020学年') {
          this.$message({
            message: '2019-2020学年开始没有夏季学期',
            type: 'warning'
          });
          this.choose_semester = '秋季学期';
        }
      },

      /*
      * 初始化当前周*/
      initCurrentWeek(){
        let start=new Date('2019-08-26');
        let end=new Date();
        let interval=end.getTime()-start.getTime();
        interval=parseInt(interval/24/60/60/1000);
        this.currentWeek=(parseInt(interval/7)+1);
      },

      subtractCurrentWeek(){
        if(this.currentWeek>=2){
          this.currentWeek-=1;
        }
      },

      addCurrentWeek(){
        if(this.currentWeek<=17){
          this.currentWeek+=1;
        }
      },

      showClassDetail(item){
        console.log(item);
        this.classDetail=item;
        this.isShowClassDetail=true;
      },

      backToClass(){
        this.isShowClassDetail=false;
        this.showStudent=false;
      },

      changeShowStudent(){
        this.showStudent=!this.showStudent;
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .class-schedule {
    display flex
    flex-direction column
    width 100%;
    height 100%;
    background-color #ffffff
  }

  .select-group {
    display: flex;
    margin 20px 2.5% 20px 2.5%;
  }

  .schedule {
    width 400px;
    height 550px;
    border 1px solid #000000;
    position relative
    margin-left 2.5%;
  }

  .class-detail-wrapper{
    width 400px;
    height auto;
    display flex
    flex-direction column
    margin-left 2.5%;
  }

  .schedule-wrapper {
    display flex;
  }

  .schedule-week-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 29px;
    width: 400px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid green;
    font-size: 12px;
  }

  .schedule-week-item {
    width: 50px;
    border-right: 1px solid red;
    line-height: 30px;
    text-align center;
  }

  .schedule-time-wrapper {
    position: absolute;
    top: 30px;
    left: 0;
    width: 49px;
    height: 520px;
    border-right: 1px solid red;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .schedule-time-item {
    width: 100%;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid red;
  }

  .schedule-class-basic {
    position: absolute;
    color: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: blue
    cursor pointer
  }
</style>
