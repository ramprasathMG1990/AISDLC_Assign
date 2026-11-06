import { Router } from "express";
import { DashboardService } from "../services/dashboard-service.js";
import { DrillDownService } from "../services/drill-down-service.js";
import { validateFilter } from "../validation/request-validation.js";
export function dashboardRouter(summary:DashboardService,drill:DrillDownService){const r=Router();r.get("/summary",async(req,res,next)=>{const c=validateFilter(req.query);if(c.errors)return res.status(400).json({code:"VALIDATION_ERROR",message:"Invalid filter",fieldErrors:c.errors});try{res.json(await summary.summary(c.value??{}))}catch(e){next(e)}});r.get("/drill-down",async(req,res,next)=>{const c=validateFilter(req.query);if(c.errors||!req.query.dimension)return res.status(400).json({code:"VALIDATION_ERROR",message:"Invalid drill-down selection"});try{res.json(await drill.query(c.value??{},String(req.query.dimension),req.query.value?String(req.query.value):undefined))}catch(e){next(e)}});return r}
