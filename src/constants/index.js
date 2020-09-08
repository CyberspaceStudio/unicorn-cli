import { name, version } from '../../package.json';

const templateEnum = {
    web: {
        repo: 'ZYK1236/react-ts-cli',
        devCommand: 'npm run dev'
    },
    miniApp: {
        repo: 'CyberspaceStudio/miniapp-init',
        devCommand: 'npm run dev:weapp|tt|...'
    }
};

export {
    name,
    version,
    templateEnum
};