import * as React from 'react';
import { List as VirtualList } from 'react-virtualized/dist/commonjs/List';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader';
import { LoadableDataRecord } from './LoadableDataRecord';
import { LoadableDataObject } from './LoadableDataObject';
import { CustomScrollBar } from './CustomScrollBar';

export interface IInfiniteListProps {
    loadableData: LoadableDataRecord<any> | LoadableDataObject<any>;
    rowHeight: number;
    requestMore: (startIndex: number, stopIndex: number) => any;
    elementCreator: (item: any, style: React.CSSProperties) => JSX.Element;
    emptyElementCreator: (index: number, style: React.CSSProperties) => JSX.Element;
}

export class InfiniteList extends React.PureComponent<IInfiniteListProps, undefined> {

    private _virtualList: VirtualList;

    render() {
        const {loadableData, rowHeight} = this.props;

        return <AutoSizer>
            {({height, width}) =>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={loadableData.dataCount}
                >
                    {({onRowsRendered}) => (
                        <CustomScrollBar
                            width={width}
                            height={height}
                            handleScroll={this.handleScroll}
                        >
                            <VirtualList
                                {...loadableData.packs}
                                height={height}
                                width={width}
                                onRowsRendered={onRowsRendered}
                                ref={r => this._virtualList = r}
                                rowCount={loadableData.dataCount}
                                rowHeight={rowHeight}
                                rowRenderer={this.rowRenderer}
                                style={defaultListStyle}
                            />
                        </CustomScrollBar>
                    )}
                </InfiniteLoader>
            }
        </AutoSizer>;
    }

    private isRowLoaded = ({index}) => this.props.loadableData.hasIndex(index);

    private loadMoreRows = async ({startIndex, stopIndex}) => {

        if (this.props.loadableData.hasIndex([startIndex, stopIndex])) {
            throw new Error(`Fail LoadMore wrong indexes startIndex ${startIndex} or stopIndex ${stopIndex}`);
        }

        this.props.requestMore(startIndex, stopIndex);

        return awaiter(() => this.props.loadableData.hasIndex(stopIndex));
    };

    private handleScroll = ({target}) => {
        const {scrollTop, scrollLeft} = target;

        const {Grid} = this._virtualList;

        Grid.handleScrollEvent({scrollTop, scrollLeft});
    };

    private rowRenderer = ({index, style}) => {
        const item = this.props.loadableData.findByIndex(index);

        if (null === item) {
            return this.props.emptyElementCreator(index, style);
        }

        return this.props.elementCreator(item, style);
    };
}

const defaultListStyle: React.CSSProperties = {overflowX: 'initial', overflowY: 'initial'};

const awaiter = (isCompleted: () => boolean) => {
    const _await = resolve => setTimeout(() => {
        if (isCompleted()) {
            resolve();
            return;
        }
        _await(resolve);
    }, 0);
    return new Promise(resolve => _await(resolve));
};
