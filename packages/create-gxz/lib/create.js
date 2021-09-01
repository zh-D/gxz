"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs-extra");
var checkEmpty_1 = require("./utils/checkEmpty");
var selectTemplate_1 = require("./selectTemplate");
var downloadAndGenerateProject_1 = require("./downloadAndGenerateProject");
var chalk = require('chalk');
function create(dirname, templateName) {
    return __awaiter(this, void 0, void 0, function () {
        var dirPath, empty, go, templateUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirPath = path.join(process.cwd(), dirname);
                    return [4 /*yield*/, fs.ensureDir(dirPath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, checkEmpty_1.default(dirPath)];
                case 2:
                    empty = _a.sent();
                    if (!!empty) return [3 /*break*/, 4];
                    return [4 /*yield*/, inquirer.prompt({
                            type: 'confirm',
                            name: 'go',
                            message: 'The existing file in the current directory. Are you sure to continue ？',
                            default: false,
                        })];
                case 3:
                    go = (_a.sent()).go;
                    if (!go)
                        process.exit(1);
                    _a.label = 4;
                case 4: return [4 /*yield*/, selectTemplate_1.default(templateName)];
                case 5:
                    templateUrl = _a.sent();
                    return [4 /*yield*/, downloadAndGenerateProject_1.default(dirname, templateUrl)];
                case 6:
                    _a.sent();
                    console.log();
                    console.log('Initialize project successfully.');
                    console.log();
                    console.log('Starts the development server.');
                    console.log();
                    console.log(chalk.cyan("    cd " + dirname));
                    console.log(chalk.cyan('    npm install'));
                    console.log(chalk.cyan('    npm start'));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = create;
