import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryStoryRepository } from "../../src/repositories/story-repository.js";
test("soft delete excludes from active list",{timeout:1000},async()=>{const repo=new InMemoryStoryRepository();await repo.create({userStoryId:"1",title:"t",description:"d",applicationId:"a",featureId:"f",storyPoints:1,priority:"Low",status:"New",createdAt:"2026-01-01",updatedAt:"2026-01-01",createdById:"u",updatedById:"u"});await repo.softDelete("1","u");assert.equal((await repo.list({})).total,0)});
