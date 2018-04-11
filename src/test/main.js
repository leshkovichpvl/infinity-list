"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const InfiniteList_1 = require("../InfiniteList");
const LoadableDataObject_1 = require("../LoadableDataObject");
class App extends React.Component {
    render() {
        return React.createElement(InfiniteList_1.InfiniteList, { loadableData: LoadableDataObject_1.LoadableDataObject.createNullInstance(), rowHeight: 100, requestMore: (startIndex, stopIndex) => void 0, elementCreator: (item, style) => React.createElement("div", { key: item.id, style: style }, item.id), emptyElementCreator: (index, style) => React.createElement("div", { key: `empty:${index}`, style: style }, index) });
    }
}
const div = document.createElement('div');
document.body.appendChild(div);
react_dom_1.render(React.createElement(App, null), div);
//# sourceMappingURL=main.js.map