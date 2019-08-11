import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login';

Vue.use(Router);

export const normalRouter=[
  {
    path:'/',
    component: login
  },
  {
    path:'/index',
    component:resolve=>require(['@/pages/index/index'],resolve),
    redirect:'/home',
    name:'首页',
    children:[
      {
        path: '/home',
        component: resolve => require(['@/pages/home/home'], resolve),
        name: '工作台',
        icon: 'el-icon-monitor'
      },
      {
        path:'/form',
        component:resolve => require(['@/pages/system/system'],resolve),
        name:'表单页',
        icon:'el-icon-menu',
        children: [
          {
            path:'/stepForm',
            component:resolve=>require(['@/pages/form/stepForm'],resolve),
            name:'修改密码',
            children:[
              {
                path:'/',
                redirect:'/stepForm/step1'
              },
              {
                path:'/stepForm/step1',
                component:resolve=>require(['@/pages/stepFormSteps/step1'],resolve),
                name:'验证身份'
              },
              {
                path:'/stepForm/step2',
                component:resolve=>require(['@/pages/stepFormSteps/step2'],resolve),
                name:'设置新密码'
              },
              {
                path:'/stepForm/step3',
                component:resolve=>require(['@/pages/stepFormSteps/step3'],resolve),
                name:'完成'
              }
            ]
          },
          {
            path: '/fileUpload',
            component: resolve => require(['@/pages/form/fileUpload'], resolve),
            name: '文件上传',
            children: [
              {
                path: '/uploadFileDetail',
                component: resolve => require(['@/pages/details/uploadFileDetail'], resolve),
                name: '文件详情'
              }
            ]
          },
          {
            path:'/account',
            component:resolve => require(['@/pages/account/account'],resolve),
            name:'账户设置'
          }
        ]
      },
      {
        path: '/testAdmin',
        name:'权限测试页',
        icon: 'el-icon-s-check',
        redirect:'/admin'
      },
    ]
  },
  {
    path:'*',
    redirect:'/404'
  },
  {
    path:'/404',
    component:resolve => require(['@/components/404/404'],resolve),
    name:'404',
    icon:'el-icon-warning-outline'
  }
]

export default new Router({
  routes: normalRouter
});

export const authRouter=[
  {
    path:'/admin',
    name:'admin',
    component: resolve=>require(['@/pages/admin/admin'],resolve),
    meta:{role:'admin'}
  }
];
