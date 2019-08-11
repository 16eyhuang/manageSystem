## 基于node.js和vue全家桶构建的一个项目
线上预览地址：http://120.27.243.127  （管理员账户：admin  密码：123456）

## 技术栈
前端：vue2 、 vuex 、 vue-router 、 axios 、 webpack 、 ES6 、 stylus 、 element-ui

后端：node 、koa2

数据库：mysql


## 项目结构

### 前端项目结构


```
├──  build                               
├──  config                              
├──  node_modules                          
├──  src                                    ---核心代码目录
|   ├──  assets                            
|   |    ├── images                         ---静态资源存放目录
|   ├──  common                             ---字体图标存放目录
|   ├──  components                         ---组件存放目录
|   ├──  pages                              ---页面存放目录(可复用的则封装为组件，不可以的写为页面)
|   ├──  router                             ---路由
|   ├──  store                              ---vuex相关的文件
|   ├──  tools                              
|   |    ├── index.js                       ---封装了一些常用的函数
|   ├── App.vue                           
|   ├── main.js                          
├── package.json     
......                                      
```

### 后端项目结构

```                       
├──  api                                    ---接口目录                 
├── common                                  
├── upload                                  ---文件上传的路径
├── app.js                                  ---入口文件
├── package.json                                
```

## 快速部署


### 首先把项目代码clone下来
```
git clone https://github.com/16eyhuang/manageSystem.git
```


### 配置mysql环境
首先要安装mysql，在此不赘述，相关教程网上都有
新建一个数据库，起名叫mytest（可以改名，不过要在后端项目中mysql.js里更改相关配置）
运行根目录下的mytest.sql（安装了相关图形化辅助的可以在相关应用中直接执行，或者亦可以复制所有语句在命令行下运行）


### 安装npm包 & 运行项目
```
cd manageSystem
cd fontend
npm install     // 首先安装前端的依赖包
npm run dev     // 运行前端项目

cd ../          //回到根目录
cd backend
npm install     // 安装后端的依赖包
export NODE_ENV=development;           // 这个命令是为了区分不同的环境来读取不同的配置
node app.js     // 运行后端项目
```

