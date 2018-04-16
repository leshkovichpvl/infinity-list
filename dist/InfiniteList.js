"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var React = require("react");
var List_1 = require("react-virtualized/dist/commonjs/List");
var AutoSizer_1 = require("react-virtualized/dist/commonjs/AutoSizer");
var InfiniteLoader_1 = require("react-virtualized/dist/commonjs/InfiniteLoader");
var CustomScrollBar_1 = require("./CustomScrollBar");
var InfiniteList = /** @class */ (function (_super) {
    __extends(InfiniteList, _super);
    function InfiniteList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRowLoaded = function (_a) {
            var index = _a.index;
            return _this.props.loadableData.hasIndex(index);
        };
        _this.loadMoreRows = function (_a) {
            var startIndex = _a.startIndex, stopIndex = _a.stopIndex;
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_b) {
                    if (this.props.loadableData.hasIndex([startIndex, stopIndex])) {
                        throw new Error("Fail LoadMore wrong indexes startIndex " + startIndex + " or stopIndex " + stopIndex);
                    }
                    this.props.requestMore(startIndex, stopIndex);
                    return [2 /*return*/, awaiter(function () { return _this.props.loadableData.hasIndex(stopIndex); })];
                });
            });
        };
        _this.handleScroll = function (_a) {
            var target = _a.target;
            var scrollTop = target.scrollTop, scrollLeft = target.scrollLeft;
            var Grid = _this._virtualList.Grid;
            Grid.handleScrollEvent({ scrollTop: scrollTop, scrollLeft: scrollLeft });
        };
        _this.rowRenderer = function (_a) {
            var index = _a.index, style = _a.style;
            var item = _this.props.loadableData.findByIndex(index);
            if (null === item) {
                return _this.props.emptyElementCreator(index, style);
            }
            return _this.props.elementCreator(item, style);
        };
        return _this;
    }
    InfiniteList.prototype.render = function () {
        var _this = this;
        var _a = this.props, loadableData = _a.loadableData, rowHeight = _a.rowHeight;
        return React.createElement(AutoSizer_1.AutoSizer, null, function (_a) {
            var height = _a.height, width = _a.width;
            return React.createElement(InfiniteLoader_1.InfiniteLoader, { isRowLoaded: _this.isRowLoaded, loadMoreRows: _this.loadMoreRows, rowCount: loadableData.dataCount }, function (_a) {
                var onRowsRendered = _a.onRowsRendered;
                return (React.createElement(CustomScrollBar_1.CustomScrollBar, { width: width, height: height, handleScroll: _this.handleScroll },
                    React.createElement(List_1.List, { height: height, width: width, onRowsRendered: onRowsRendered, ref: function (r) { return _this._virtualList = r; }, rowCount: loadableData.dataCount, rowHeight: rowHeight, rowRenderer: _this.rowRenderer, style: defaultListStyle })));
            });
        });
    };
    return InfiniteList;
}(React.PureComponent));
exports.InfiniteList = InfiniteList;
var defaultListStyle = { overflowX: 'initial', overflowY: 'initial' };
var awaiter = function (isCompleted) {
    var _await = function (resolve) { return setTimeout(function () {
        if (isCompleted()) {
            resolve();
            return;
        }
        _await(resolve);
    }, 0); };
    return new Promise(function (resolve) { return _await(resolve); });
};
//# sourceMappingURL=InfiniteList.js.map