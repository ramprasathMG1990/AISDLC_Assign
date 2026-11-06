import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../../src/app.js";
process.env.ALLOW_DEV_AUTH="true";
test("dashboard summary contract",async()=>{const app=createApp();const ok=await request(app).get("/dashboard/summary");assert.equal(ok.status,200);assert.equal(ok.body.totalStories,0);const bad=await request(app).get("/dashboard/summary?endDate=2025-01-01&startDate=2025-02-01");assert.equal(bad.status,400)});
