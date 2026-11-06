import test from "node:test";
import assert from "node:assert/strict";
import { canTransition } from "../../src/services/story-status-service.js";
test("adjacent transitions pass",()=>{assert.equal(canTransition("New","Approved"),true);assert.equal(canTransition("Completed","Closed"),true)});
test("skips and backward transitions fail",()=>{assert.equal(canTransition("New","Ready"),false);assert.equal(canTransition("Closed","Completed"),false)});
