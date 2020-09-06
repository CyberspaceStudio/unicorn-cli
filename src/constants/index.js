import { name, version } from '../../package.json';

const templateEnum = {
    web: {
        repo: 'ZYK1236/react-ts-cli',
        devCommand: 'yarn start'
    },
    miniApp: {
        repo: 'CyberspaceStudio/miniapp-init',
        devCommand: 'yarn dev:weapp|tt|...'
    }
};

export {
    name,
    version,
    templateEnum
};