"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadableDataPackObject = /** @class */ (function () {
    function LoadableDataPackObject(startIndex, stopIndex, items) {
        this.startIndex = startIndex;
        this.stopIndex = stopIndex;
        this.items = items;
    }
    LoadableDataPackObject.createInstance = function (startIndex, stopIndex, items) {
        return new LoadableDataPackObject(startIndex, stopIndex, items);
    };
    LoadableDataPackObject.prototype.hasIndex = function (index) {
        return -1 !== this.getRange().indexOf(index);
    };
    LoadableDataPackObject.prototype.getItem = function (index) {
        var pathIndex = this.getRange().indexOf(index);
        return this.items[pathIndex];
    };
    LoadableDataPackObject.prototype.incrementIndexes = function (count) {
        if (count === void 0) { count = 1; }
        return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    };
    LoadableDataPackObject.prototype.set = function (k, v) {
        this[k] = v;
        return this;
    };
    LoadableDataPackObject.prototype.getRange = function () {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    };
    ;
    return LoadableDataPackObject;
}());
exports.LoadableDataPackObject = LoadableDataPackObject;
var LoadableDataObject = /** @class */ (function () {
    function LoadableDataObject(dataCount, packs) {
        if (packs === void 0) { packs = []; }
        this.dataCount = dataCount;
        this.packs = packs;
    }
    LoadableDataObject.createInstance = function (dataCount, packs) {
        return new LoadableDataObject(dataCount, packs);
    };
    LoadableDataObject.createNullInstance = function () {
        return new LoadableDataObject(0, []);
    };
    LoadableDataObject.prototype.addPack = function (pack) {
        if (this.hasIndex([pack.startIndex, pack.stopIndex])) {
            throw new Error("Fail Add Pack: wrong indexes startIndex " + pack.startIndex + " or stopIndex " + pack.stopIndex);
        }
        return this.set('packs', this.packs.concat([pack]));
    };
    LoadableDataObject.prototype.setDataCount = function (count) {
        return this.set('dataCount', count);
    };
    LoadableDataObject.prototype.unShiftList = function (list) {
        var packs = this.packs;
        packs
            .reduce(function (newList, pack) { return newList.concat([pack.incrementIndexes(list.length)]); }, [])
            .unshift(LoadableDataPackObject.createInstance(0, list.length - 1, list));
        return this.set('packs', packs).incrementDataCount(list.length);
    };
    LoadableDataObject.prototype.unShiftOne = function (item) {
        var packs = this.packs;
        packs
            .reduce(function (newList, pack) { return newList.concat([pack.incrementIndexes()]); }, [])
            .unshift(LoadableDataPackObject.createInstance(0, 0, [item]));
        return this.set('packs', packs).incrementDataCount();
    };
    LoadableDataObject.prototype.incrementDataCount = function (count) {
        if (count === void 0) { count = 1; }
        return this.setDataCount(this.dataCount + count);
    };
    LoadableDataObject.prototype.getList = function () {
        return this.packs.reduce(function (list, pack) { return list.concat(pack.items); }, []);
    };
    LoadableDataObject.prototype.findByIndex = function (index) {
        var pack = this.getPackByIndex(index);
        return pack ? pack.getItem(index) : null;
    };
    LoadableDataObject.prototype.hasIndex = function (value) {
        if (Array.isArray(value)) {
            var startIndex = value[0], stopIndex = value[1];
            return !!this.getPackByIndex(startIndex) || !!this.getPackByIndex(stopIndex);
        }
        return !!this.getPackByIndex(value);
    };
    LoadableDataObject.prototype.set = function (k, v) {
        this[k] = v;
        return this;
    };
    LoadableDataObject.prototype.getPackByIndex = function (index) {
        return this.packs.find(function (pack) { return pack && pack.hasIndex(index); });
    };
    ;
    return LoadableDataObject;
}());
exports.LoadableDataObject = LoadableDataObject;
//# sourceMappingURL=LoadableDataObject.js.map