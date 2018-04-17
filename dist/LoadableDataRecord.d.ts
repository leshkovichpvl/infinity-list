import { List } from 'immutable';
declare const LoadableDataPackRecord_base: any;
export declare class LoadableDataPackRecord<T> extends LoadableDataPackRecord_base {
    readonly startIndex: number;
    readonly stopIndex: number;
    readonly items: List<T>;
    static createInstance<T>(startIndex: number, stopIndex: number, items: List<T>): any;
    hasIndex(index: number): boolean;
    getItem(index: number): T;
    incrementIndexes(count?: number): LoadableDataPackRecord<T>;
    set<K extends string, V>(k: K, v: V): LoadableDataPackRecord<T>;
    private getRange();
}
declare const LoadableDataRecord_base: any;
export declare class LoadableDataRecord<T> extends LoadableDataRecord_base {
    readonly dataCount: number;
    readonly packs: List<LoadableDataPackRecord<T>>;
    static createInstance<T>(dataCount: number, packs: List<LoadableDataPackRecord<T>>): any;
    static createNullInstance<T>(): any;
    addPack(pack: LoadableDataPackRecord<T>): LoadableDataRecord<T>;
    setDataCount(count: number): LoadableDataRecord<T>;
    unShiftList(list: List<T>): LoadableDataRecord<T>;
    unShiftOne(item: T): LoadableDataRecord<T>;
    incrementDataCount(count?: number): LoadableDataRecord<T>;
    getList(): List<T>;
    findByIndex(index: number): T | null;
    hasIndex(value: number | [number, number]): boolean;
    set<K extends string, V>(k: K, v: V): LoadableDataRecord<T>;
    private getPackByIndex(index);
}
