import { Router } from "express";
import { StoryService, ApiError } from "../services/story-service.js";
import { validateFilter } from "../validation/request-validation.js";
import { canSoftDelete } from "../services/story-delete-service.js";
export function storiesRouter(service:StoryService){const r=Router();
 r.post("/",async(req,res,next)=>{try{res.status(201).json(await service.create(req.body,(req as any).identity.sub))}catch(e){next(e)}});
 r.get("/",async(req,res,next)=>{const checked=validateFilter(req.query);if(checked.errors)return res.status(400).json({code:"VALIDATION_ERROR",message:"Invalid filter",fieldErrors:checked.errors});try{res.json(await service.list(checked.value??{}))}catch(e){next(e)}});
 r.get("/:storyId",async(req,res,next)=>{try{res.json(await service.get(req.params.storyId))}catch(e){next(e)}});
 r.patch("/:storyId",async(req,res,next)=>{try{const current=await service.get(req.params.storyId);const actor=(req as any).identity;if(current.createdById!==actor.sub&&!actor.roles.includes("administrator")&&!actor.roles.includes("delivery-manager"))return res.status(403).json({code:"FORBIDDEN",message:"Permission denied"});res.json(await service.update(req.params.storyId,req.body,actor.sub))}catch(e){next(e)}});
 r.delete("/:storyId",async(req,res,next)=>{try{const s=await service.get(req.params.storyId);if(!canSoftDelete((req as any).identity,s))return res.status(403).json({code:"FORBIDDEN",message:"Permission denied"});await service.delete(req.params.storyId,(req as any).identity.sub);res.status(204).send()}catch(e){next(e)}});
 return r
}
