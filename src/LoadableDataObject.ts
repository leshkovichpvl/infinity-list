
export class LoadableDataPackObject<T> {

    static createInstance<T>(startIndex: number, stopIndex: number, items: T[]) {
        return new LoadableDataPackObject<T>(startIndex, stopIndex, items);
    }

    constructor(
        public startIndex: number,
        public stopIndex: number,
        public items: T[]
    ) {}

    hasIndex(index: number) {
        return -1 !== this.getRange().indexOf(index);
    }

    getItem(index: number): T {
        const pathIndex = this.getRange().indexOf(index);

        return this.items[pathIndex];
    }

    incrementIndexes(count = 1): LoadableDataPackObject<T> {
        return this.set('startIndex', this.startIndex + count).set('stopIndex', this.stopIndex + count);
    }

    private set(k: string, v: any): LoadableDataPackObject<T> {
        this[k] = v;

        return this;
    }

    private getRange(): number[] {
        return Array.from(Array(this.stopIndex + 1).keys()).slice(this.startIndex);
    };
}

export class LoadableDataObject<T> {

    static createInstance<T>(dataCount: number, packs: LoadableDataPackObject<T>[]) {
        return new LoadableDataObject<T>(dataCount, packs);
    }

    static createNullInstance<T>() {
        return new LoadableDataObject<T>(0, []);
    }

    constructor(
        public dataCount: number,
        public packs: LoadableDataPackObject<T>[] = []
    ) {}

    addPack(pack: LoadableDataPackObject<T>): LoadableDataObject<T> {

        if (this.hasIndex([pack.startIndex, pack.stopIndex])) {
            throw new Error(`Fail Add Pack: wrong indexes startIndex ${pack.startIndex} or stopIndex ${pack.stopIndex}`);
        }

        return this.set('packs', this.packs.concat([pack]));
    }

    setDataCount(count: number): LoadableDataObject<T> {
        return this.set('dataCount', count);
    }

    unShiftList(list: T[]): LoadableDataObject<T> {
        const packs = this.packs;

        packs
            .reduce((newList: LoadableDataPackObject<T>[], pack: LoadableDataPackObject<T>) => newList.concat([pack.incrementIndexes(list.length)]), [])
            .unshift(LoadableDataPackObject.createInstance(0, list.length - 1, list))
        ;

        return this.set('packs', packs).incrementDataCount(list.length);
    }

    unShiftOne(item: T): LoadableDataObject<T> {
        const packs = this.packs;

        packs
            .reduce((newList: LoadableDataPackObject<T>[], pack: LoadableDataPackObject<T>) => newList.concat([pack.incrementIndexes()]), [])
            .unshift(LoadableDataPackObject.createInstance(0, 0, [item]))
        ;

        return this.set('packs', packs).incrementDataCount();
    }

    incrementDataCount(count = 1): LoadableDataObject<T> {
        return this.setDataCount(this.dataCount + count);
    }

    getList(): T[] {
        return this.packs.reduce((list: T[], pack: LoadableDataPackObject<T>) => list.concat(pack.items), []);
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

    private set(k: string, v: any): LoadableDataObject<T> {
        this[k] = v;

        return this;
    }

    private getPackByIndex(index: number): LoadableDataPackObject<T> | void {
        return this.packs.find(pack => pack && pack.hasIndex(index));
    };

}
