"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_custom_scrollbars_1 = require("react-custom-scrollbars");
class CustomScrollBar extends React.PureComponent {
    render() {
        const params = {};
        const style = {};
        ['autoHeight', 'autoHeightMin', 'autoHeightMax'].forEach(key => {
            if (void 0 !== this.props[key]) {
                params[key] = this.props[key];
            }
        });
        ['width', 'height'].forEach(key => {
            if (void 0 !== this.props[key]) {
                style[key] = this.props[key];
            }
        });
        return React.createElement(react_custom_scrollbars_1.Scrollbars, Object.assign({}, params, { style: style, onScroll: this.props.handleScroll, renderTrackHorizontal: props => React.createElement("div", Object.assign({}, props, { className: "scrollbar--track-horizontal" })), renderTrackVertical: props => React.createElement("div", Object.assign({}, props, { className: "scrollbar--track-vertical" })), renderThumbHorizontal: props => React.createElement("div", Object.assign({}, props, { className: "scrollbar--thumb-horizontal" })), renderThumbVertical: props => React.createElement("div", Object.assign({}, props, { className: "scrollbar--thumb-vertical" })), renderView: props => React.createElement("div", Object.assign({}, props, { className: "scrollbar--view" })) }), this.props.children);
    }
}
exports.CustomScrollBar = CustomScrollBar;
//# sourceMappingURL=CustomScrollBar.js.map