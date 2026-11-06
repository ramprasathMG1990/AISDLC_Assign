import { Router } from "express";
import { InMemoryStatusHistoryRepository } from "../repositories/status-history-repository.js";
import { InMemoryAuditRepository } from "../repositories/audit-repository.js";
export function historyRouter(history:InMemoryStatusHistoryRepository,audit:InMemoryAuditRepository,service:any){const r=Router();r.get("/:storyId/history",async(req,res,next)=>{try{await service.get(req.params.storyId);res.json(history.list(req.params.storyId))}catch(e){next(e)}});r.get("/:storyId/audit",async(req,res,next)=>{try{await service.get(req.params.storyId);res.json(audit.list(req.params.storyId))}catch(e){next(e)}});return r}
