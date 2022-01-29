"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const tools = require("../public/tools");
describe("Test Suite 1", () => {
    it("Test A", () => {
        assert.ok(true, "This shouldn't fail");
    });
    it("Test B", () => {
        assert.ok(1 === 1, "This shouldn't fail");
        assert.ok(false, "This should fail");
    });
    it("Test C", () => {
        assert.ok(tools);
    });
});
//# sourceMappingURL=toolsTest.js.map