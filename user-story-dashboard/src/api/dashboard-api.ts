import { trackerFetch } from "./tracker-client";
export interface DashboardSummary {totalStories:number;completedStories:number;inProgressStories:number;blockedStories:number;totalStoryPoints:number;completedStoryPoints:number;sprintCompletionPercentage:number;charts:Record<string,any[]>}
export async function getSummary(params=new URLSearchParams()){return trackerFetch<DashboardSummary>(`/dashboard/summary${params.size?"?"+params:""}`)}
export async function drillDown(params:URLSearchParams){return trackerFetch<any>(`/dashboard/drill-down?${params}`)}
