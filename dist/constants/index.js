'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templateEnum = exports.version = exports.name = undefined;

var _package = require('../../package.json');

var templateEnum = {
    web: {
        repo: 'ZYK1236/react-ts-cli',
        devCommand: 'yarn start'
    },
    miniApp: {
        repo: 'CyberspaceStudio/miniapp-init',
        devCommand: 'yarn dev:weapp|tt|...'
    }
};

exports.name = _package.name;
exports.version = _package.version;
exports.templateEnum = templateEnum;