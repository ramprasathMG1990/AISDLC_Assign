import { UserStory } from "../types.js";
import { FilterSet } from "../types.js";
import { InMemoryTransaction, RepositoryContext } from "./base-repository.js";
export interface StoryRepository extends RepositoryContext {
  create(story:UserStory):Promise<UserStory>; get(id:string):Promise<UserStory|undefined>; list(filter:FilterSet):Promise<{items:UserStory[];total:number}>; update(id:string,patch:Partial<UserStory>,actor:string):Promise<UserStory|undefined>; softDelete(id:string,actor:string):Promise<boolean>;
}
export class InMemoryStoryRepository implements StoryRepository {
  private data=new Map<string,UserStory>();
  constructor(seed:UserStory[]=[]){ seed.forEach(s=>this.data.set(s.userStoryId,s)); }
  async transaction<T>(work:(tx:InMemoryTransaction)=>Promise<T>){ return work(new InMemoryTransaction()); }
  async create(s:UserStory){ this.data.set(s.userStoryId,s); return s; }
  async get(id:string){ const s=this.data.get(id); return s&&!s.deletedAt?s:undefined; }
  async list(f:FilterSet){ let items=[...this.data.values()].filter(s=>!s.deletedAt);
    if(f.searchText){const q=f.searchText.toLowerCase();items=items.filter(s=>s.title.toLowerCase().includes(q)||s.description.toLowerCase().includes(q))}
    const one=(v:string|undefined,k:keyof UserStory)=>!v||items.filter(s=>String(s[k])===v).length>=0;
    if(f.applicationId)items=items.filter(s=>s.applicationId===f.applicationId); if(f.moduleId)items=items.filter(s=>s.moduleId===f.moduleId); if(f.featureId)items=items.filter(s=>s.featureId===f.featureId); if(f.sprintId)items=items.filter(s=>s.sprintId===f.sprintId); if(f.releaseId)items=items.filter(s=>s.releaseId===f.releaseId); if(f.assigneeId)items=items.filter(s=>s.assigneeId===f.assigneeId); if(f.status)items=items.filter(s=>s.status===f.status);
    if(f.startDate)items=items.filter(s=>s.createdAt.slice(0,10)>=f.startDate!); if(f.endDate)items=items.filter(s=>s.createdAt.slice(0,10)<=f.endDate!);
    const page=f.page??1,size=f.pageSize??25,total=items.length;return {items:items.slice((page-1)*size,page*size),total};
  }
  async update(id:string,p:Partial<UserStory>,actor:string){const s=this.data.get(id);if(!s||s.deletedAt)return undefined;const next={...s,...p,updatedAt:new Date().toISOString(),updatedById:actor};this.data.set(id,next);return next}
  async softDelete(id:string,actor:string){const s=this.data.get(id);if(!s||s.deletedAt)return false;s.deletedAt=new Date().toISOString();s.deletedById=actor;return true}
  snapshot(){return [...this.data.values()].filter(s=>!s.deletedAt)}
}
