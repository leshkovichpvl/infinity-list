import { delay } from 'redux-saga';
import { call, cancel, CancelEffect, fork, ForkEffect, take, TakeEffect } from 'redux-saga/effects';
import * as autobahn from 'autobahn';

export function* watchRequestMore(WAMPSession: Promise<autobahn.Session>, action, handler) {
    let task;

    while (true) {
        const {startIndex, stopIndex} = yield take(action);

        if (task) {
            yield cancel(task);
        }

        task = yield fork(function* () {
            yield call(delay, 500);

            yield call(handler, startIndex, stopIndex, WAMPSession);
        });
    }
}
