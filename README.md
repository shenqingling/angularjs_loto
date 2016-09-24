# angularjs_loto

Imitating Loto analysis by AngularJs. It's a test project on AnjularJs.


## 项目运行

进入项目文件夹，运行：

```
bower install
# 在 app 下生成 bower_components 文件夹

npm insall
# 在项目文件夹下生成 node_modules 文件夹

gulp serve
# 启动本地服务
```

## Testing

Running `gulp test` will run the unit tests with karma.

### 测试环境安装笔记

1. 安装Karma: `yo angular` 安装后发现没有 `karma.conf.js` 文件。于是 `npm install -g karma`
2. 生成 `karma.conf.js` 文件，运行 `karma init`
3. 安装karma jasmine 适配器 和 karma chrome 的适配器。`npm i -D jasmine-core karma-jasmine karma-chrome-launcher`
4. 测试覆盖率 `npm i -D karma-coverage` -> [指导页面](http://www.cnblogs.com/xiaxianfei/p/5600242.html)
5. 测试报告 `npm install karma-jasmine-html-reporter --save-dev` -> [指导页面](https://www.npmjs.com/package/karma-jasmine-html-reporter)


---
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.