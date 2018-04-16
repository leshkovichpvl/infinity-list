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
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var LoadableDataPackRecord = /** @class */ (function (_super) {
    __extends(LoadableDataPackRecord, _super);
    function LoadableDataPackRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadableDataPackRecord.createInstance = function (startIndex, stopIndex, items) {
        return new LoadableDataPackRecord({ startIndex: startIndex, stopIndex: stopIndex, items: items });
    };
    LoadableDataPackRecord.prototype.hasIndex = function (index) {
        return -1 !== this.getRange().indexOf(index);
    };
    LoadableDataPackRecord.prototype.getItem = function (index) {
        var pathIndex = this.getRange().indexOf(index);
        return this.items.get(pathIndex);
    };
    LoadableDataPackRecord.prototype.incrementIndexes = function (count) {
        if (count === void 0) { count = 1; }
        return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    };
    LoadableDataPackRecord.prototype.set = function (k, v) {
        return _super.prototype.set.call(this, k, v);
    };
    LoadableDataPackRecord.prototype.getRange = function () {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    };
    ;
    return LoadableDataPackRecord;
}(immutable_1.Record({
    startIndex: void 0,
    stopIndex: void 0,
    items: immutable_1.List()
})));
exports.LoadableDataPackRecord = LoadableDataPackRecord;
var LoadableDataRecord = /** @class */ (function (_super) {
    __extends(LoadableDataRecord, _super);
    function LoadableDataRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadableDataRecord.createInstance = function (dataCount, packs) {
        return new LoadableDataRecord({ dataCount: dataCount, packs: packs });
    };
    LoadableDataRecord.createNullInstance = function () {
        return new LoadableDataRecord({ dataCount: 0, packs: immutable_1.List() });
    };
    LoadableDataRecord.prototype.addPack = function (pack) {
        if (this.hasIndex([pack.startIndex, pack.stopIndex])) {
            throw new Error("Fail Add Pack: wrong indexes startIndex " + pack.startIndex + " or stopIndex " + pack.stopIndex);
        }
        return this.set('packs', this.packs.concat([pack]));
    };
    LoadableDataRecord.prototype.setDataCount = function (count) {
        return this.set('dataCount', count);
    };
    LoadableDataRecord.prototype.unShiftList = function (list) {
        return this.set('packs', this.packs
            .reduce(function (newList, pack) { return newList.concat([pack.incrementIndexes(list.size)]).toList(); }, immutable_1.List())
            .unshift(LoadableDataPackRecord.createInstance(0, list.size - 1, list))).incrementDataCount(list.size);
    };
    LoadableDataRecord.prototype.unShiftOne = function (item) {
        return this.set('packs', this.packs
            .reduce(function (newList, pack) { return newList.concat([pack.incrementIndexes()]).toList(); }, immutable_1.List())
            .unshift(LoadableDataPackRecord.createInstance(0, 0, immutable_1.List([item])))).incrementDataCount();
    };
    LoadableDataRecord.prototype.incrementDataCount = function (count) {
        if (count === void 0) { count = 1; }
        return this.setDataCount(this.dataCount + count);
    };
    LoadableDataRecord.prototype.getList = function () {
        return this.packs.valueSeq().reduce(function (list, pack) { return list.concat(pack.items).toList(); }, immutable_1.List());
    };
    LoadableDataRecord.prototype.findByIndex = function (index) {
        var pack = this.getPackByIndex(index);
        return pack ? pack.getItem(index) : null;
    };
    LoadableDataRecord.prototype.hasIndex = function (value) {
        if (Array.isArray(value)) {
            var startIndex = value[0], stopIndex = value[1];
            return !!this.getPackByIndex(startIndex) || !!this.getPackByIndex(stopIndex);
        }
        return !!this.getPackByIndex(value);
    };
    LoadableDataRecord.prototype.set = function (k, v) {
        return _super.prototype.set.call(this, k, v);
    };
    LoadableDataRecord.prototype.getPackByIndex = function (index) {
        return this.packs.find(function (pack) { return pack && pack.hasIndex(index); });
    };
    ;
    return LoadableDataRecord;
}(immutable_1.Record({
    dataCount: void 0,
    packs: immutable_1.List()
})));
exports.LoadableDataRecord = LoadableDataRecord;
//# sourceMappingURL=LoadableDataRecord.js.map