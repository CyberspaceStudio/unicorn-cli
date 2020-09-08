'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var Inquirer = _interopRequireWildcard(_inquirer);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _promisfy = require('promisfy');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.name('unicorn-cli');
var downloadGitPro = (0, _promisfy.promisfy)(_downloadGitRepo2.default);

_commander2.default.command('create <app-name>').description('create a new project').usage('<app-name>').alias('c').action(async function (appName) {
    (0, _utils.showCliSlogen)();

    var _ref = await Inquirer.prompt([{
        type: 'confirm',
        name: 'isUpdatePluginInit',
        message: '请确认已全局安装 npm-check-updates'
    }]),
        isUpdatePluginInit = _ref.isUpdatePluginInit;

    if (!isUpdatePluginInit) {
        process.exit(1);
    }

    var dirs = _fs2.default.readdirSync(process.cwd());

    if (dirs.includes(appName)) {
        var _ref2 = await Inquirer.prompt([{
            type: 'confirm',
            name: 'isOverwrite',
            message: '文件夹已存在，是否选择覆盖'
        }]),
            isOverwrite = _ref2.isOverwrite;

        if (!isOverwrite) {
            process.exit(1);
        }
    }

    Inquirer.prompt([{
        type: 'list',
        name: 'projectType',
        message: '选择你的项目类型',
        choices: ['web', 'miniApp']
    }]).then(async function (_ref3) {
        var projectType = _ref3.projectType;

        _rimraf2.default.sync(appName);

        var _templateEnum$project = _constants.templateEnum[projectType],
            repo = _templateEnum$project.repo,
            devCommand = _templateEnum$project.devCommand;

        var spinner = (0, _ora2.default)('🚀 template downloading...');

        spinner.start();
        try {
            _mkdirp2.default.sync(appName);
            await downloadGitPro(repo, appName);
            spinner.succeed('downloaded');

            console.log('');
            console.log(' Now Run:');
            console.log('  cd ' + appName);
            // 自动升级所有的包到最新版本   暂时没有风险
            console.log('  ncu -u');
            console.log('  npm install');
            console.log('  ' + devCommand);
            console.log('');
        } catch (e) {
            spinner.stop('download error');
        }
    });
});

_commander2.default.version(_constants.name + ' ' + _constants.version).parse(process.argv);