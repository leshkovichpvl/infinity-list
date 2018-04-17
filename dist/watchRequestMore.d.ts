/// <reference types="autobahn" />
import { CancelEffect, ForkEffect, TakeEffect } from 'redux-saga/effects';
import * as autobahn from 'autobahn';
export declare function watchRequestMore(WAMPSession: Promise<autobahn.Session>, action: any, handler: any): IterableIterator<TakeEffect | ForkEffect | CancelEffect>;
