import { useEffect, useState } from "react";
import { defaultFilters, FilterState } from "../state/filter-store";
import { getSummary, drillDown } from "../api/dashboard-api";
import { FilterPanel } from "../components/filters/FilterPanel";
import { KpiCards } from "../components/dashboard/KpiCards";
import { PortfolioCharts } from "../components/dashboard/PortfolioCharts";
import { ProgressCharts } from "../components/dashboard/ProgressCharts";
import { StoryList } from "../components/stories/StoryList";
import { ExportControls } from "../components/export/ExportControls";
import { Loading, ErrorView, EmptyState } from "../components/feedback/Feedback";

export function DashboardPage() {
 const [filter,setFilter]=useState<FilterState>(defaultFilters());
 const [summary,setSummary]=useState<any>(null);
 const [stories,setStories]=useState<any>(null);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState("");

 async function load(f=filter){
  setLoading(true); setError("");
  try {
   const params=new URLSearchParams();
   Object.entries(f).forEach(([key,value])=>{
    if(value!==undefined&&value!==""&&key!=="page"&&key!=="pageSize") params.set(key,String(value));
   });
   const data=await getSummary(params);
   setSummary(data);
   if(data.totalStories===0) setStories({items:[],pagination:{page:1,totalPages:0}});
  } catch(e:any) { setError(e.message); } finally { setLoading(false); }
 }
 useEffect(()=>{load()},[filter]);
 async function select(dimension:string,value:string){
  const data=await drillDown(new URLSearchParams({dimension,value}));
  setStories(data);
 }
 async function loadStories(){
  const params=new URLSearchParams({dimension:"status"});
  Object.entries(filter).forEach(([key,value])=>{
   if(value!==undefined&&value!==""&&key!=="page"&&key!=="pageSize") params.set(key,String(value));
  });
  setStories(await drillDown(params));
 }
 return (
  <main>
   <h1>User Story Dashboard</h1>
   <FilterPanel value={filter} onChange={patch=>setFilter({...filter,...patch,page:1})} onClear={()=>setFilter(defaultFilters())}/>
   <ExportControls filter={filter}/>
   {loading ? <Loading/> : error ? <ErrorView message={error} onRetry={()=>load()}/> : !summary ? <EmptyState/> : (
    <>
     <KpiCards data={summary}/>
     {summary.totalStories===0 ? <EmptyState/> : <>
      <PortfolioCharts series={summary.charts} onSelect={select}/>
      <ProgressCharts data={summary.charts.velocity}/>
     </>}
     <button className="story-load" onClick={loadStories}>Load filtered stories</button>
     <StoryList data={stories} onPage={page=>setFilter({...filter,page})}/>
    </>
   )}
  </main>
 );
}
