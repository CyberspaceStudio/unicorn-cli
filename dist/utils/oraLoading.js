'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.oraLoading = undefined;

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var oraLoading = exports.oraLoading = async function oraLoading(fn, msg) {
    var spinner = (0, _ora2.default)(msg);
    spinner.start();
    var result = await fn.apply(undefined, _toConsumableArray(argv));
    if (result) {
        spinner.succeed();
    } else {
        spinner.stop();
    }
    return result;
};