import { StoryStatus } from "../types.js";
export interface StatusHistory {historyId:string;userStoryId:string;previousStatus:StoryStatus|null;newStatus:StoryStatus;actorId:string;occurredAt:string}
export class InMemoryStatusHistoryRepository { private rows:StatusHistory[]=[]; append(row:Omit<StatusHistory,"historyId"|"occurredAt">){const rowFull={...row,historyId:crypto.randomUUID(),occurredAt:new Date().toISOString()};this.rows.push(rowFull);return rowFull} list(id:string){return this.rows.filter(r=>r.userStoryId===id)} }
