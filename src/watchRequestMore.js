"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_saga_1 = require("redux-saga");
const effects_1 = require("redux-saga/effects");
function* watchRequestMore(WAMPSession, action, handler) {
    let task;
    while (true) {
        const { startIndex, stopIndex } = yield effects_1.take(action);
        if (task) {
            yield effects_1.cancel(task);
        }
        task = yield effects_1.fork(function* () {
            yield effects_1.call(redux_saga_1.delay, 500);
            yield effects_1.call(handler, startIndex, stopIndex, WAMPSession);
        });
    }
}
exports.watchRequestMore = watchRequestMore;
//# sourceMappingURL=watchRequestMore.js.map