<template>
  <div class="toDoList">
    <el-card class="box-card" v-loading="todoLoading">
      <div slot="header" class="clearfix">
        <input type="text" placeholder="please enter your todo list here" v-model="newToDoList"
               @keyup.enter="addTodoList">
        <el-button style="float: right; padding: 3px 0" type="text" @click='addTodoList'>新增</el-button>
      </div>
      <div v-for="(item,key) in showList" :key="key" class="text item">
        <input type="checkbox" name="" id="" checked="item.todostate==1" @change="updateTodoState(item.todoid,key)">
        <img v-if="item.todostate==1" src="~@/assets/images/checked.svg" alt="" height="40">
        <img v-else src="~@/assets/images/unchecked.svg" alt="" height="40">
        <label :class="{ isComplete:item.todostate==1 }" :title="item.addTime | formatteraddTime">{{ item.content }}</label>
        <span class="el-icon-close delete-icon" @click='deleteThisTodoList(item.todoid)'></span>
      </div>
      <el-pagination layout="total, prev, pager, next" :total="todoList.length" :page-size="7" :current-page="currentPage" @current-change="handlePageChange"></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {formatterTime} from '@/tools/index';

  export default {
    data() {
      return {
        todoList: [
          // { name: '完成目前在写的这个项目', checked: false },
          // { name: '将该项目成功部署到服务器', checked: true },
          // { name: '学会react和angular', checked: false },
          // {
          //   name: '看完《Javascript权威指南》，话说已经很久没看了。。。',
          //   checked: false
          // },
          // { name: '学linux', checked: false },
          // { name: '工资突破10k，三线小县城能达到这水平么。。。', checked: false },
          // { name: '买房买车买老婆，呸，说错了，是娶老婆', checked: false }
        ],
        newToDoList: '',
        showList:[],
        todoLoading:false,
        currentPage:1,
        todoPageSize:7,
        minInterval:3000,   //todo最小更新间隔
      };
    },
    methods: {
      addTodoList() {
        if (!this.newToDoList) {
          this.$tips({
            type: 'error',
            message: '不能为空哦!'
          });
          return;
        }
        this.todoLoading=true;
        let uid=this.user.uid;
        let username=this.user.username;
        let content=this.newToDoList;
        this.$axios
          .post('/api/todo/addTodo',{
            uid:uid,
            username:username,
            content:content
          })
          .then(res=>{
            //console.log(res);
            if(res.data.status==200){
              this.getUserTodo();   //新增成功则刷新
            }
            else{
              this.todoLoading=false;
              this.$tips({
                type:'error',
                message:res.data.message
              })
            }
          })
          .catch(err=>{
            console.log(err);
            this.todoLoading=false;
            this.$tips({
              type:'error',
              message:'出现错误'
            })
          })
          .finally(()=>{
            this.newToDoList = '';
          })
      },
      deleteThisTodoList(key) {
        let yu=this.todoList.length%7;
        this.$confirm('确定删除该条todo？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
        }).then(()=>{
          this.todoLoading=true;
          this.$axios
            .post('/api/todo/deleteTodo',{todoid:key})
            .then(res=>{
              if(res.data.status==200){
                this.getUserTodo(this.currentPage,yu);
              }
              else {
                this.todoLoading=false;
                this.$tips({
                  type:'error',
                  message:res.data.message
                })
              }
            })
            .catch(err=>{
              console.log(err);
              this.todoLoading=false;
              this.$tips({
                type:'error',
                message:'出现错误'
              })
            })
        }).catch(()=>{});
      },
      getUserTodo(curPage=1,yu=0) {
        let uid = this.user.uid;
        this.todoLoading=true;
        this.$axios
          .post('/api/todo/getUserTodo', {uid: uid})
          .then(res => {
            //console.log('111');
            if(res.data.status==200){
              this.todoList = res.data.data;
              if(yu==1&&curPage>1){
                curPage--;
              }
              this.currentPage=curPage;
              this.showList=this.todoList.slice((curPage-1)*this.todoPageSize,(curPage-1)*this.todoPageSize+7);
              this.todoLoading=false;
            }
            else{
              this.todoLoading=false;
              this.$tips({
                type:'error',
                message:res.data.message
              })
            }
          })
          .catch(err => {
            console.log(err);
            this.todoLoading=false;
            this.$tips({
              type:'error',
              message:'获取todo失败'
            })
          })
      },
      handlePageChange(val){
        this.showList=this.todoList.slice((val-1)*this.todoPageSize,(val-1)*this.todoPageSize+this.todoPageSize);
        this.currentPage=val;
      },
      updateTodoState(todoid,index){
        console.log(todoid);
        if(this.todoList[index].lastChangeTime&&this.todoList[index].lastChangeTime!=null){
          let now=new Date().getTime();
          if(now-this.todoList[index].lastChangeTime<this.minInterval){
            this.$confirm(`更新过于频繁，请过${this.minInterval-(now-this.todoList[index].lastChangeTime)}ms后再来吧`,'提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            })
            return;
          }
        }
        this.todoList[index].todostate==1?this.todoList[index].todostate=0:this.todoList[index].todostate=1;
        let now=new Date().getTime();
        this.todoList[index].lastChangeTime=now;
        //这里采用的策略是先变更状态再请求后台，若更新失败则变回来。。
        this.$axios
          .post('/api/todo/updateTodoState',{todoid:todoid,state:this.todoList[index].todostate})
          .then(res=>{
            if(res.data.status==200){

            }
            else{
              console.log(`更新todo${todoid}失败`);
              this.$tips({
                type:'error',
                message:`后台更新todo${todoid}失败，请重试`
              })
            }
          })
          .catch(err=>{
            console.log(err);
            this.$tips({
              type:'error',
              message:`后台更新todo${todoid}失败，请重试`
            })
          })
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    filters: {
      formatteraddTime(val) {
        val = new Date(val).getTime();
        return formatterTime(val)+'提交';
      }
    },
    mounted() {
      this.getUserTodo()
    }
  };
</script>
<style lang='stylus' scoped>
  .box-card {
    width: 100%;

    .clearfix {
      &:before, &:after {
        display: table;
        content: '';
      }

      &:after {
        clear: both;
      }

      input {
        border: none;
        outline: none;
        width: 50%;
      }
    }

    .item {
      background: #fff;
      color: #4d4d4d;
      font: 14px Helvetica Neue, Helvetica, Arial, sans-serif;
      font-weight: 300;
      margin: 0 auto;
      line-height: 50px;
      border-bottom: 1px solid #ededed;
      position: relative;
      display: flex;
      align-items: center;

      &:hover .delete-icon {
        display: block;
      }

      img {
        flex: 0 0 40px;
      }

      input {
        position: absolute;
        border: none;
        bottom: 0;
        height: auto;
        margin: auto 0;
        opacity: 0;
        text-align: center;
        top: 0;
        width: 40px;
        height: 50px;
      }

      label {
        font-size: 14px;
        flex: 1;
        padding-left: 10px;
      }

      .isComplete {
        text-decoration: line-through;
        color: #d9d9d9;
      }

      .delete-icon {
        float: right;
        font-size: 20px;
        color: #F56C6C;
        cursor: pointer;
        display: none;
        flex: 0 0 20px;
      }
    }
  }
</style>
