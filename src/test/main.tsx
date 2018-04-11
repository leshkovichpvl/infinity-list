import * as React from 'react';
import { render } from 'react-dom';
import { InfiniteList } from '../InfiniteList';
import { LoadableDataObject } from '../LoadableDataObject';

class App extends React.Component<undefined, undefined> {
    render() {
        return <InfiniteList
            loadableData={LoadableDataObject.createNullInstance()}
            rowHeight={100}
            requestMore={(startIndex, stopIndex) => void 0}
            elementCreator={(item, style) => <div key={item.id} style={style}>{item.id}</div>}
            emptyElementCreator={(index, style) => <div key={`empty:${index}`} style={style}>{index}</div>}
        />
    }

}

const div = document.createElement('div');
document.body.appendChild(div);

render(<App/>, div);
