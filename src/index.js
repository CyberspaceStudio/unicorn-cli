import program from 'commander';
import * as Inquirer from 'inquirer';
import downloadGit from 'download-git-repo';
import { promisfy } from 'promisfy';
import ora from 'ora';
import fs from 'fs';
import rm from 'rimraf';
import { showCliSlogen } from './utils';
import { name, version, templateEnum } from './constants';

program.name('kite-cli');
const downloadGitPro = promisfy(downloadGit);

program
    .command('create <app-name>')
    .description('create a new project')
    .usage('<app-name>')
    .alias('c')
    .action(async (appName) => {
        const targetDir = process.cwd() + '\\' + appName;
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
            } else {
                rm.sync(targetDir);
            }
        }
                
        Inquirer.prompt([{
            type: 'list',
            name: 'projectType',
            message: '请选择项目类型',
            choices: [
                'web',
                'miniApp',
            ],
        }]).then(async ({ projectType }) => {
            const { repo, devCommand } = templateEnum[projectType];
            const spinner = ora('🚀 template downloading...');

            spinner.start();
            try {
                await downloadGitPro(repo, targetDir);
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
