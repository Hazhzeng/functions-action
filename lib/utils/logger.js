"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const core = __importStar(require("@actions/core"));
const state_1 = require("../constants/state");
const log_level_1 = require("../constants/log_level");
const parser_1 = require("./parser");
class Logger {
    static SetLevel(newLevel) {
        Logger.LogLevel = newLevel;
    }
    static Debug(message, debugPrinter = core.debug) {
        if (Logger.LogLevel <= log_level_1.LogLevelConstant.Debug &&
            parser_1.Parser.IsTrueLike(process.env.GITHUB_ACTION_DEBUG)) {
            debugPrinter(message);
        }
    }
    static Info(message, infoPrinter = core.info) {
        if (Logger.LogLevel <= log_level_1.LogLevelConstant.Info) {
            infoPrinter(message);
        }
    }
    static Warn(message, warnPrinter = core.warning) {
        if (Logger.LogLevel <= log_level_1.LogLevelConstant.Warning) {
            warnPrinter(message);
        }
    }
    static Error(message, errorPrinter = core.error) {
        if (Logger.LogLevel <= log_level_1.LogLevelConstant.Error) {
            errorPrinter(message);
        }
    }
    static PrintTraceback(be, printer = Logger.Error) {
        be.PrintTraceback(printer);
    }
    static PrintCurrentState(state, printer = Logger.Debug) {
        printer(`##[${state_1.StateConstant[state]}]`);
    }
    static PrintStateParameters(state, params, printer = Logger.Debug) {
        printer(`[${state_1.StateConstant[state]}] params`);
        for (let key in params) {
            printer(`  ${key} = ${params[key]}`);
        }
    }
    static PrintStateContext(state, context, printer = Logger.Debug) {
        printer(`[${state_1.StateConstant[state]}] context`);
        for (let key in context) {
            printer(`  ${key} = ${context[key]}`);
        }
    }
}
exports.Logger = Logger;
Logger.DefaultLogLevel = log_level_1.LogLevelConstant.Debug;
Logger.LogLevel = Logger.DefaultLogLevel;
