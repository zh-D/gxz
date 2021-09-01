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
var path = require("path");
var ora = require("ora");
var fs = require("fs-extra");
var shell = require("shelljs");
var downloadGitRepo = require('download-git-repo');
var execSync = require('child_process').execSync;
function downloadAndGenerateProject(dirname, templateUrl) {
    var _this = this;
    var spinner = ora('download git repo start').start();
    return new Promise(function (resolve) {
        downloadGitRepo(templateUrl, path.join(process.cwd(), dirname), function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            spinner.fail('download git repo failed.');
                            console.error(err);
                            process.exit(1);
                        }
                        spinner.succeed('download git repo successfully.');
                        return [4 /*yield*/, onDownloadSuccess(dirname)];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
exports.default = downloadAndGenerateProject;
function onDownloadSuccess(dirname) {
    // 进入生成的项目目录
    shell.cd(dirname);
    // 修改 package.json 的 name 字段
    modifyPackageJson(dirname);
    // Initialize git repo
    var initializedGit = false;
    if (tryGitInit()) {
        initializedGit = true;
        console.log();
        console.log('Initialized a git repository.');
    }
    // Create git commit if git repo was initialized
    if (initializedGit && tryGitCommit()) {
        console.log();
        console.log('Created git commit.');
    }
}
function modifyPackageJson(dirname) {
    var packageObj;
    try {
        packageObj = fs.readJsonSync('package.json');
        packageObj.name = dirname;
    }
    catch (err) {
        console.error(err);
    }
    try {
        fs.writeJsonSync('package.json', packageObj, {
            spaces: 2,
        });
    }
    catch (err) {
        console.error(err);
    }
}
function tryGitInit() {
    try {
        execSync('git --version', { stdio: 'ignore' });
        if (isInGitRepository()) {
            return false;
        }
        execSync('git init', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        console.warn('Git repo not initialized', e);
        return false;
    }
}
function isInGitRepository() {
    try {
        execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
function tryGitCommit() {
    try {
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "Initialize project using create-dzh"', {
            stdio: 'ignore',
        });
        return true;
    }
    catch (e) {
        // We couldn't commit in already initialized git repo,
        // maybe the commit author config is not set.
        // In the future, we might supply our own committer
        // like Ember CLI does, but for now, let's just
        // remove the Git files to avoid a half-done state.
        console.warn('Git commit not created', e);
        console.warn('Removing .git directory...');
        try {
            // unlinkSync() doesn't work on directories.
            fs.removeSync('.git');
        }
        catch (removeErr) {
            // Ignore.
        }
        return false;
    }
}
