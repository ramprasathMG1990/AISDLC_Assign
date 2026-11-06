import { InMemoryStoryRepository } from "../repositories/story-repository.js";
import { FilterSet } from "../types.js";
export class DrillDownService {
 constructor(private repo:InMemoryStoryRepository){}
 async query(filter:FilterSet,dimension:string,value?:string){
  const copy={...filter};
  if(value){
   const map:any={status:"status",application:"applicationId",module:"moduleId",feature:"featureId",sprint:"sprintId",release:"releaseId",assignee:"assigneeId"};
   if(map[dimension]) (copy as any)[map[dimension]]=value;
  }
  const r=await this.repo.list(copy);
  return {items:r.items,pagination:{page:copy.page??1,pageSize:copy.pageSize??25,totalItems:r.total,totalPages:Math.ceil(r.total/(copy.pageSize??25))}};
 }
}
