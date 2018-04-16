/// <reference types="react" />
import * as React from 'react';
import { LoadableDataRecord } from './LoadableDataRecord';
import { LoadableDataObject } from './LoadableDataObject';
export interface IInfiniteListProps {
    loadableData: LoadableDataRecord<any> | LoadableDataObject<any>;
    rowHeight: number;
    requestMore: (startIndex: number, stopIndex: number) => any;
    elementCreator: (item: any, style: React.CSSProperties) => JSX.Element;
    emptyElementCreator: (index: number, style: React.CSSProperties) => JSX.Element;
}
export declare class InfiniteList extends React.PureComponent<IInfiniteListProps, undefined> {
    private _virtualList;
    render(): JSX.Element;
    private isRowLoaded;
    private loadMoreRows;
    private handleScroll;
    private rowRenderer;
}
