'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved: 确保在项目文件夹中的任何连接都解决了
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd()); // cwd方法返回进程的当前目录（绝对路径）

// process.cwd()与__dirname的区别。前者进程发起时的位置，后者是脚本的位置，两者可能是不一致的。比如，node ./code/program.js，对于process.cwd()来说，返回的是当前目录（.）；对于__dirname来说，返回是脚本所在目录，即./code/program.js。
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;


function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer:我们用` public_url `环境变量或“主页”字段来推断
// "public path" at which the app is served.:   应用程序提供的“公共路径”
// Webpack needs to know it to put the right <script> hrefs into HTML even in :  WebPACK需要知道这个公共路径,正确的把所有脚本到输出到HTML
// single-page apps that may serve index.html for nested URLs like /todos/42. 单页应用程序可能为index.html嵌套网址,如/todos/ 42。
// We can't use a relative path in HTML because we don't want to load something  我们不能在HTML中使用相对路径，因为我们不想加载某些东西。
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
