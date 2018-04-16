export declare class LoadableDataPackObject<T> {
    startIndex: number;
    stopIndex: number;
    items: T[];
    static createInstance<T>(startIndex: number, stopIndex: number, items: T[]): LoadableDataPackObject<T>;
    constructor(startIndex: number, stopIndex: number, items: T[]);
    hasIndex(index: number): boolean;
    getItem(index: number): T;
    incrementIndexes(count?: number): LoadableDataPackObject<T>;
    private set(k, v);
    private getRange();
}
export declare class LoadableDataObject<T> {
    dataCount: number;
    packs: LoadableDataPackObject<T>[];
    static createInstance<T>(dataCount: number, packs: LoadableDataPackObject<T>[]): LoadableDataObject<T>;
    static createNullInstance<T>(): LoadableDataObject<T>;
    constructor(dataCount: number, packs?: LoadableDataPackObject<T>[]);
    addPack(pack: LoadableDataPackObject<T>): LoadableDataObject<T>;
    setDataCount(count: number): LoadableDataObject<T>;
    unShiftList(list: T[]): LoadableDataObject<T>;
    unShiftOne(item: T): LoadableDataObject<T>;
    incrementDataCount(count?: number): LoadableDataObject<T>;
    getList(): T[];
    findByIndex(index: number): T | null;
    hasIndex(value: number | [number, number]): boolean;
    private set(k, v);
    private getPackByIndex(index);
}
