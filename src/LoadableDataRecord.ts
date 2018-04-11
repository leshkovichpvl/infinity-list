import { List, Record } from 'immutable';

export class LoadableDataPackRecord<T> extends Record({
    startIndex: void 0,
    stopIndex: void 0,
    items: List()
}) {
    readonly startIndex: number;
    readonly stopIndex: number;
    readonly items: List<T>;

    static createInstance<T>(startIndex: number, stopIndex: number, items: List<T>) {
        return new LoadableDataPackRecord<T>({startIndex, stopIndex, items});
    }

    hasIndex(index: number) {
        return -1 !== this.getRange().indexOf(index);
    }

    getItem(index: number): T {
        const pathIndex = this.getRange().indexOf(index);

        return this.items.get(pathIndex);
    }

    incrementIndexes(count = 1): LoadableDataPackRecord<T> {
       return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    }

    set<K extends string, V>(k: K, v: V): LoadableDataPackRecord<T> {
        return <LoadableDataPackRecord<T>> super.set(k, v);
    }

    private getRange(): number[] {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    };
}

export class LoadableDataRecord<T> extends Record({
    dataCount: void 0,
    packs: List()
}) {
    readonly dataCount: number;
    readonly packs: List<LoadableDataPackRecord<T>>;

    static createInstance<T>(dataCount: number, packs: List<LoadableDataPackRecord<T>>) {
        return new LoadableDataRecord<T>({dataCount, packs});
    }

    static createNullInstance<T>() {
        return new LoadableDataRecord<T>({dataCount: 0, packs: List()});
    }

    addPack(pack: LoadableDataPackRecord<T>): LoadableDataRecord<T> {

        if (this.hasIndex([pack.startIndex, pack.stopIndex])) {
            throw new Error(`Fail Add Pack: wrong indexes startIndex ${pack.startIndex} or stopIndex ${pack.stopIndex}`);
        }

        return this.set('packs', this.packs.concat([pack]));
    }

    setDataCount(count: number): LoadableDataRecord<T> {
        return this.set('dataCount', count);
    }

    unShiftList(list: List<T>): LoadableDataRecord<T> {

        return this.set(
            'packs',
            this.packs
                .reduce((newList: List<LoadableDataPackRecord<T>>, pack: LoadableDataPackRecord<T>) => newList.concat([pack.incrementIndexes(list.size)]).toList(), List())
                .unshift(LoadableDataPackRecord.createInstance(0, list.size - 1, list))
        ).incrementDataCount(list.size);
    }

    unShiftOne(item: T): LoadableDataRecord<T> {

        return this.set(
            'packs',
            this.packs
                .reduce((newList: List<LoadableDataPackRecord<T>>, pack: LoadableDataPackRecord<T>) => newList.concat([pack.incrementIndexes()]).toList(), List())
                .unshift(LoadableDataPackRecord.createInstance(0, 0, List([item])))
        ).incrementDataCount();
    }

    incrementDataCount(count = 1): LoadableDataRecord<T> {
        return this.setDataCount(this.dataCount + count);
    }

    getList(): List<T> {
        return this.packs.valueSeq().reduce((list: List<T>, pack: LoadableDataPackRecord<T>) => list.concat(pack.items).toList(), List());
    }

    findByIndex(index: number): T | null {
        const pack = this.getPackByIndex(index);

        return pack ? pack.getItem(index) : null;
    }

    hasIndex(value: number | [number, number]) {

        if (Array.isArray(value)) {
            const [startIndex, stopIndex] = value;

            return !!this.getPackByIndex(startIndex) || !!this.getPackByIndex(stopIndex);
        }

        return !!this.getPackByIndex(value);
    }

    set<K extends string, V>(k: K, v: V): LoadableDataRecord<T> {
        return <LoadableDataRecord<T>> super.set(k, v);
    }

    private getPackByIndex(index: number): LoadableDataPackRecord<T> | void {
        return this.packs.find(pack => pack && pack.hasIndex(index));
    };

}
