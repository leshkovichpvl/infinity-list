"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoadableDataPackObject {
    constructor(startIndex, stopIndex, items) {
        this.startIndex = startIndex;
        this.stopIndex = stopIndex;
        this.items = items;
    }
    static createInstance(startIndex, stopIndex, items) {
        return new LoadableDataPackObject(startIndex, stopIndex, items);
    }
    hasIndex(index) {
        return -1 !== this.getRange().indexOf(index);
    }
    getItem(index) {
        const pathIndex = this.getRange().indexOf(index);
        return this.items[pathIndex];
    }
    incrementIndexes(count = 1) {
        return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    }
    set(k, v) {
        this[k] = v;
        return this;
    }
    getRange() {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    }
    ;
}
exports.LoadableDataPackObject = LoadableDataPackObject;
class LoadableDataObject {
    constructor(dataCount, packs = []) {
        this.dataCount = dataCount;
        this.packs = packs;
    }
    static createInstance(dataCount, packs) {
        return new LoadableDataObject(dataCount, packs);
    }
    static createNullInstance() {
        return new LoadableDataObject(0, []);
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
        const packs = this.packs;
        packs
            .reduce((newList, pack) => newList.concat([pack.incrementIndexes(list.length)]), [])
            .unshift(LoadableDataPackObject.createInstance(0, list.length - 1, list));
        return this.set('packs', packs).incrementDataCount(list.length);
    }
    unShiftOne(item) {
        const packs = this.packs;
        packs
            .reduce((newList, pack) => newList.concat([pack.incrementIndexes()]), [])
            .unshift(LoadableDataPackObject.createInstance(0, 0, [item]));
        return this.set('packs', packs).incrementDataCount();
    }
    incrementDataCount(count = 1) {
        return this.setDataCount(this.dataCount + count);
    }
    getList() {
        return this.packs.reduce((list, pack) => list.concat(pack.items), []);
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
        this[k] = v;
        return this;
    }
    getPackByIndex(index) {
        return this.packs.find(pack => pack && pack.hasIndex(index));
    }
    ;
}
exports.LoadableDataObject = LoadableDataObject;
//# sourceMappingURL=LoadableDataObject.js.map