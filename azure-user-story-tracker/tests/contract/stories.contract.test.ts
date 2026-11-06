import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../../src/app.js";
process.env.ALLOW_DEV_AUTH="true";
test("story CRUD contract",async()=>{const app=createApp();const created=await request(app).post("/stories").set("x-user-id","creator-1").set("x-roles","creator").send({userStoryId:"story-1",title:"Title",description:"Description",applicationId:"app-1",featureId:"feature-1",storyPoints:3,priority:"High",status:"New"});assert.equal(created.status,201);const listed=await request(app).get("/stories?status=New");assert.equal(listed.status,200);assert.equal(listed.body.items.length,1)});
