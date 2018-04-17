/// <reference types="autobahn" />
import * as autobahn from 'autobahn';
export declare function watchRequestMore(WAMPSession: Promise<autobahn.Session>, action: any, handler: any): IterableIterator<any>;
