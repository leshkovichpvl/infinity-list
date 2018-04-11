import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export interface ICustomScrollBarProps {
    width?: number | string;
    height?: number | string;
    handleScroll?: (event) => void;
    autoHeight?: boolean;
    autoHeightMin?: number | string;
    autoHeightMax?: number | string;
}

const reduce = (
    keys: string[],
    props: ICustomScrollBarProps
) => keys.reduce((newParams, key) => void 0 === props[key] ? newParams : {...newParams, [key]: props[key]}, {});

export class CustomScrollBar extends React.PureComponent<ICustomScrollBarProps, undefined> {

    render() {
        const params = reduce(['autoHeight', 'autoHeightMin', 'autoHeightMax'], this.props);
        const style = reduce(['width', 'height'], this.props);

        return <Scrollbars
            {...params}
            style={style}
            onScroll={this.props.handleScroll}
            renderTrackHorizontal={props => <div {...props} className="scrollbar--track-horizontal"/>}
            renderTrackVertical={props => <div {...props} className="scrollbar--track-vertical"/>}
            renderThumbHorizontal={props => <div {...props} className="scrollbar--thumb-horizontal"/>}
            renderThumbVertical={props => <div {...props} className="scrollbar--thumb-vertical"/>}
            renderView={props => <div {...props} className="scrollbar--view"/>}
        >
            {this.props.children}
        </Scrollbars>
    }
}
