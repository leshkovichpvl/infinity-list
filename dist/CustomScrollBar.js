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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_custom_scrollbars_1 = require("react-custom-scrollbars");
var reduce = function (keys, props) { return keys.reduce(function (newParams, key) {
    return void 0 === props[key] ? newParams : __assign({}, newParams, (_a = {}, _a[key] = props[key], _a));
    var _a;
}, {}); };
var CustomScrollBar = /** @class */ (function (_super) {
    __extends(CustomScrollBar, _super);
    function CustomScrollBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomScrollBar.prototype.render = function () {
        var params = reduce(['autoHeight', 'autoHeightMin', 'autoHeightMax'], this.props);
        var style = reduce(['width', 'height'], this.props);
        return React.createElement(react_custom_scrollbars_1.Scrollbars, __assign({}, params, { style: style, onScroll: this.props.handleScroll, renderTrackHorizontal: function (props) { return React.createElement("div", __assign({}, props, { className: "scrollbar--track-horizontal" })); }, renderTrackVertical: function (props) { return React.createElement("div", __assign({}, props, { className: "scrollbar--track-vertical" })); }, renderThumbHorizontal: function (props) { return React.createElement("div", __assign({}, props, { className: "scrollbar--thumb-horizontal" })); }, renderThumbVertical: function (props) { return React.createElement("div", __assign({}, props, { className: "scrollbar--thumb-vertical" })); }, renderView: function (props) { return React.createElement("div", __assign({}, props, { className: "scrollbar--view" })); } }), this.props.children);
    };
    return CustomScrollBar;
}(React.PureComponent));
exports.CustomScrollBar = CustomScrollBar;
//# sourceMappingURL=CustomScrollBar.js.map