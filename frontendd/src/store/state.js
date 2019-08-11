export default {
  isCollapse: false,  //导航栏是否收缩，false为未收缩
  user:{},
  routerMatched:'', //存储路由的名字
  newrouter:[], //实现动态路由
  isLoadComplete:'',  //用来判断首页背景图是否加载完成
  step:1, //分布表单的步骤数
  stepForm:{
    username:'',
    password:'',
    confirmPassword:''
  }  //分步表单中填写的数据
};
