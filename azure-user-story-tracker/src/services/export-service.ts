import { InMemoryStoryRepository } from "../repositories/story-repository.js";
import { FilterSet } from "../types.js";
import { CsvExporter } from "../integrations/csv-exporter.js";
import { createPdf } from "../integrations/pdf-exporter.js";
export class ExportService {constructor(private repo:InMemoryStoryRepository){} async csv(filter:FilterSet){const r=await this.repo.list({...filter,page:1,pageSize:200});const headers=["userStoryId","title","description","status","priority","storyPoints"];const rows=r.items.map(s=>[s.userStoryId,s.title,s.description,s.status,s.priority,s.storyPoints]);return new CsvExporter().exportCsv(headers,rows)} async pdf(summary:any,filter:FilterSet){return createPdf(summary,filter)}}
