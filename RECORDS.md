##npm run jest 
##.bablerc 配置
##react-router4的按需加载
##antd的按需加载
##webpack的合理配置,性能优化
##react-router-redux的使用
##fetch的封装(用于网络请求)
##lodash的使用
##使用koa
##数据库选择mongodb和mongose连接koa
mongod.exe --dbpath c:/data/baletu
.\mongod.exe --dbpath c:/data/baletu    // window powershell
##引入Font Awesome 字体图标库
url: http://www.bootcss.com/p/font-awesome/#whats-new
##router 路由切换的动画
##eslint的设置 ,全部变量的设置
    在webpack中设置全部变量
    new webpack.DefinePlugin(Object.assign(env.stringified,{RES_URL :JSON.stringify("http://localhost:3030")})),
    
    在 .eslintrc中配置
    {
      "env": {
        "browser": true,
        "node": true
      },
      "parser": "babel-eslint",
      "globals": {
        "RES_URL": true,   // 使用全局变量
        "__DEV__": true
      }
    }
###项目优化
单独打包核心包,react,redux等
使用static给组件做prop的类型控制和默认值  
事件都绑定在实例上,而不是类的原型上 
尽量少用setState  