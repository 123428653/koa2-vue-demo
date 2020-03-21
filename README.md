# 基于Koa2、Mysql、vue-cli前后端分离项目

## 目录结构

```
├── public    
├── server            // 后端项目
│   ├── api           // 接口模块（路由）                              
│   ├── config        // mysql配置、控制台日志配置                              
│   ├── controller    // 数据库增删改查操作                              
│   ├── lib           // 链接数据库、sql操作                              
│   ├── logs          // 控制台日志输出                              
│   ├── middleware    // koa中间件                              
│   ├── public        // 静态资源                              
│   ├── .babelrc      // babel配置（async）                              
│   ├── .gitignore    // git忽略目录、文件配置                             
│   ├── app.js        // 项目主入口                           
├── src                                         
│   ├── assets                             
│   │   └── css                              
│   │       └── styles.css                                          
│   ├── utils
│   │   └── http.js   
│   │   └── utils.js
│   ├── views
│   │   └── Home.vue                               
│   ├── App.vue
│   ├── main.js
│   ├── router.js
``` 

## 后端安装注意事项与启动

1. 本地必须已安装Mysql(建议5.7.x)版本，太高版本有报错现象。
2. 本地新建数据库名为：koa2_demo，账号、密码、端口参照目录server/config/index.js中。
3. 全局安装(Mac需要加sudo)：
```bash
npm install supervisor -g
```

4. 全局安装(Mac需要加sudo): 
```bash
npm install pm2 -g
```

5. 安装后端所需依赖：
```bash
cd server && npm install
```

6. 启动项目：npm dev 或者 npm start ,
```bash
npm dev
```

或者

```bash
npm start
```

npm dev:是基于supervisor启动的修改代码有实时更新

npm start:基于pm2后台进行启动(可用于生产环境)

## 前端项目安装、启动

1. 终端处于koa2-vue-demo目录下安装依赖:
```bash
npm install
```

2. 启动开发环境
```bash
npm run dev
```

3. 打包生产环境
```bash
npm run build
```

4. eslint修复
```bash
npm run lint
```

## 项目地址
完整的项目d地址[GitHub koa2-vue-demo](https://github.com/yiluyanxia/vue-todolist)。 


