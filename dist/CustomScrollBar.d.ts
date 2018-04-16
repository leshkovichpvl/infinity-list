/// <reference types="react" />
import * as React from 'react';
export interface ICustomScrollBarProps {
    width?: number | string;
    height?: number | string;
    handleScroll?: (event) => void;
    autoHeight?: boolean;
    autoHeightMin?: number | string;
    autoHeightMax?: number | string;
}
export declare class CustomScrollBar extends React.PureComponent<ICustomScrollBarProps, undefined> {
    render(): JSX.Element;
}
