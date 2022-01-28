"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test2 = exports.Test1 = void 0;
const assert = require("assert");
function Test1() {
    assert.ok(true, "This shouldn't fail");
}
exports.Test1 = Test1;
;
function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
}
exports.Test2 = Test2;
;
//# sourceMappingURL=tools.test.js.map