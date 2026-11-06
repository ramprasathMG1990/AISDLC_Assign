import test from "node:test";
import assert from "node:assert/strict";
import { ExportService } from "../../src/services/export-service.js";
import { InMemoryStoryRepository } from "../../src/repositories/story-repository.js";
test("CSV export uses active filtered repository scope",async()=>{const repo=new InMemoryStoryRepository();await repo.create({userStoryId:"x",title:"Safe,\"title",description:"line1\nline2",applicationId:"a",featureId:"f",storyPoints:5,priority:"High",status:"New",createdAt:"2026-01-01",updatedAt:"2026-01-01",createdById:"u",updatedById:"u"});const csv=await new ExportService(repo).csv({});assert.match(csv,/Safe,\"\"title/);assert.match(csv,/line1\nline2/)});
