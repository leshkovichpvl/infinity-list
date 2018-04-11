"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class LoadableDataPackRecord extends immutable_1.Record({
    startIndex: void 0,
    stopIndex: void 0,
    items: immutable_1.List()
}) {
    static createInstance(startIndex, stopIndex, items) {
        return new LoadableDataPackRecord({ startIndex, stopIndex, items });
    }
    hasIndex(index) {
        return -1 !== this.getRange().indexOf(index);
    }
    getItem(index) {
        const pathIndex = this.getRange().indexOf(index);
        return this.items.get(pathIndex);
    }
    incrementIndexes(count = 1) {
        return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    }
    set(k, v) {
        return super.set(k, v);
    }
    getRange() {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    }
    ;
}
exports.LoadableDataPackRecord = LoadableDataPackRecord;
class LoadableDataRecord extends immutable_1.Record({
    dataCount: void 0,
    packs: immutable_1.List()
}) {
    static createInstance(dataCount, packs) {
        return new LoadableDataRecord({ dataCount, packs });
    }
    static createNullInstance() {
        return new LoadableDataRecord({ dataCount: 0, packs: immutable_1.List() });
    }
    addPack(pack) {
        if (this.hasIndex([pack.startIndex, pack.stopIndex])) {
            throw new Error(`Fail Add Pack: wrong indexes startIndex ${pack.startIndex} or stopIndex ${pack.stopIndex}`);
        }
        return this.set('packs', this.packs.concat([pack]));
    }
    setDataCount(count) {
        return this.set('dataCount', count);
    }
    unShiftList(list) {
        return this.set('packs', this.packs
            .reduce((newList, pack) => newList.concat([pack.incrementIndexes(list.size)]).toList(), immutable_1.List())
            .unshift(LoadableDataPackRecord.createInstance(0, list.size - 1, list))).incrementDataCount(list.size);
    }
    unShiftOne(item) {
        return this.set('packs', this.packs
            .reduce((newList, pack) => newList.concat([pack.incrementIndexes()]).toList(), immutable_1.List())
            .unshift(LoadableDataPackRecord.createInstance(0, 0, immutable_1.List([item])))).incrementDataCount();
    }
    incrementDataCount(count = 1) {
        return this.setDataCount(this.dataCount + count);
    }
    getList() {
        return this.packs.valueSeq().reduce((list, pack) => list.concat(pack.items).toList(), immutable_1.List());
    }
    findByIndex(index) {
        const pack = this.getPackByIndex(index);
        return pack ? pack.getItem(index) : null;
    }
    hasIndex(value) {
        if (Array.isArray(value)) {
            const [startIndex, stopIndex] = value;
            return !!this.getPackByIndex(startIndex) || !!this.getPackByIndex(stopIndex);
        }
        return !!this.getPackByIndex(value);
    }
    set(k, v) {
        return super.set(k, v);
    }
    getPackByIndex(index) {
        return this.packs.find(pack => pack && pack.hasIndex(index));
    }
    ;
}
exports.LoadableDataRecord = LoadableDataRecord;
//# sourceMappingURL=LoadableDataRecord.js.map