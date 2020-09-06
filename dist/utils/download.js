'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.downDir = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downDir = exports.downDir = async function downDir(repo, tag) {
   var project = repoUrlObj.v + '/' + repo; //下载的项目
   //  C:\Users\lee\.myTempalte
   var dest = downloadDirectory + '/' + repo; //把项目下载当对应的目录中
   var filePath = '';
   if (tag) {
      project += '#' + tag;
      filePath = dest + '#' + tag;
   }

   try {
      await (0, _downloadGitRepo2.default)(project, filePath);
   } catch (error) {
      console.log(chalk.red('\u4E0B\u8F7D\u4ED3\u5E93' + project + '\u4FE1\u606F\u5931\u8D25\uFF0C\u9519\u8BEF\u4FE1\u606F\uFF1A' + error + ' \n'));
   }
   return { dest: dest, filePath: filePath };
};