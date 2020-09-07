import program from 'commander';
import * as Inquirer from 'inquirer';
import downloadGit from 'download-git-repo';
import { promisfy } from 'promisfy';
import ora from 'ora';
import fs from 'fs';
import rm from 'rimraf'
import mkdirp from 'mkdirp'
import { showCliSlogen } from './utils';
import { name, version, templateEnum } from './constants';

program.name('unicorn-cli');
const downloadGitPro = promisfy(downloadGit);

program
    .command('create <app-name>')
    .description('create a new project')
    .usage('<app-name>')
    .alias('c')
    .action(async (appName) => {
        showCliSlogen();

        const dirs = fs.readdirSync(process.cwd());

        if (dirs.includes(appName)) {
            const { isOverwrite } = await Inquirer.prompt([{
                type: 'confirm',
                name: 'isOverwrite',
                message: '文件夹已存在，是否选择覆盖'
            }]);
            if (!isOverwrite) {
                process.exit(1);
            }
        }
                
        Inquirer.prompt([{
            type: 'list',
            name: 'projectType',
            message: '选择你的项目类型',
            choices: [
                'web',
                'miniApp',
            ],
        }]).then(async ({ projectType }) => {
            rm.sync(appName)

            const { repo, devCommand } = templateEnum[projectType];
            const spinner = ora('🚀 template downloading...');

            spinner.start();
            try {
                mkdirp.sync(appName)
                await downloadGitPro(repo, appName);
                spinner.succeed('downloaded');

                console.log('');
                console.log(' Now Run:');
                console.log(`  cd ${appName}`);
                console.log('  yarn install');
                console.log(`  ${devCommand}`);
                console.log('');
            } catch (e) {
                spinner.stop('download error');
            }
        });
    });

program
    .version(`${name} ${version}`)
    .parse(process.argv);
