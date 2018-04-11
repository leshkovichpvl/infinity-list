"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const List_1 = require("react-virtualized/dist/commonjs/List");
const AutoSizer_1 = require("react-virtualized/dist/commonjs/AutoSizer");
const InfiniteLoader_1 = require("react-virtualized/dist/commonjs/InfiniteLoader");
const CustomScrollBar_1 = require("./CustomScrollBar");
class InfiniteList extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.isRowLoaded = ({ index }) => this.props.loadableData.hasIndex(index);
        this.loadMoreRows = ({ startIndex, stopIndex }) => __awaiter(this, void 0, void 0, function* () {
            if (this.props.loadableData.hasIndex([startIndex, stopIndex])) {
                throw new Error(`Fail LoadMore wrong indexes startIndex ${startIndex} or stopIndex ${stopIndex}`);
            }
            this.props.requestMore(startIndex, stopIndex);
            return awaiter(() => this.props.loadableData.hasIndex(stopIndex));
        });
        this.handleScroll = ({ target }) => {
            const { scrollTop, scrollLeft } = target;
            const { Grid } = this._virtualList;
            Grid.handleScrollEvent({ scrollTop, scrollLeft });
        };
        this.rowRenderer = ({ index, style }) => {
            const item = this.props.loadableData.findByIndex(index);
            if (null === item) {
                return this.props.emptyElementCreator(index, style);
            }
            return this.props.elementCreator(item, style);
        };
    }
    render() {
        const { loadableData, rowHeight } = this.props;
        return React.createElement(AutoSizer_1.AutoSizer, null, ({ height, width }) => React.createElement(InfiniteLoader_1.InfiniteLoader, { isRowLoaded: this.isRowLoaded, loadMoreRows: this.loadMoreRows, rowCount: loadableData.dataCount }, ({ onRowsRendered, registerChild }) => (React.createElement(CustomScrollBar_1.CustomScrollBar, { width: width, height: height, handleScroll: this.handleScroll },
            React.createElement(List_1.List, { height: height, width: width, onRowsRendered: onRowsRendered, ref: r => this._virtualList = r, rowCount: loadableData.dataCount, rowHeight: rowHeight, rowRenderer: this.rowRenderer, style: { overflowX: 'initial', overflowY: 'initial' } })))));
    }
}
exports.InfiniteList = InfiniteList;
const awaiter = (isCompleted) => {
    const _await = resolve => setTimeout(() => {
        if (isCompleted()) {
            resolve();
            return;
        }
        _await(resolve);
    }, 0);
    return new Promise(resolve => _await(resolve));
};
//# sourceMappingURL=InfiniteList.js.map