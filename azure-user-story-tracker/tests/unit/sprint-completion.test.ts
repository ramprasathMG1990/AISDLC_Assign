import test from "node:test";
import assert from "node:assert/strict";
import { DashboardService } from "../../src/services/dashboard-service.js";
import { DashboardRepository } from "../../src/repositories/dashboard-repository.js";
import { InMemoryStoryRepository } from "../../src/repositories/story-repository.js";
test("sprint completion and empty sprint",async()=>{const repo=new InMemoryStoryRepository([{userStoryId:"1",title:"a",description:"d",applicationId:"a",featureId:"f",storyPoints:2,priority:"Low",status:"Completed",sprintId:"s1",createdAt:"2026-01-01",updatedAt:"2026-01-01",createdById:"u",updatedById:"u"}]);const service=new DashboardService(new DashboardRepository(repo));assert.equal((await service.summary({sprintId:"s1"})).sprintCompletionPercentage,100);assert.equal((await service.summary({sprintId:"empty"})).sprintCompletionPercentage,0)});
