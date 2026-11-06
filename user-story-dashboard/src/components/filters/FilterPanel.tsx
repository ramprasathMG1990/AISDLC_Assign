import { FilterState } from "../../state/filter-store";

export function FilterPanel({value,onChange,onClear}:{value:FilterState;onChange:(patch:Partial<FilterState>)=>void;onClear:()=>void}) {
 const select=(label:string,key:keyof FilterState)=>{
  const status=key==="status";
  return (
   <label>{label}
    <select aria-label={label} value={String(value[key]??"")} onChange={e=>onChange({[key]:e.target.value||undefined})}>
     <option value="">All {label.toLowerCase()}</option>
     {status&&["New","Approved","Ready","In Progress","Blocked","Testing","Completed","Closed"].map(s=><option key={s} value={s}>{s}</option>)}
    </select>
   </label>
  );
 };
 return (
  <form className="filters" onSubmit={e=>e.preventDefault()}>
   <label>Search<input aria-label="Search stories" value={value.searchText} onChange={e=>onChange({searchText:e.target.value})}/></label>
   {select("Application","applicationId")}
   {select("Module","moduleId")}
   {select("Feature","featureId")}
   {select("Sprint","sprintId")}
   {select("Release","releaseId")}
   {select("Assignee","assigneeId")}
   {select("Status","status")}
   <label>Start date<input type="date" aria-label="Start date" value={value.startDate??""} onChange={e=>onChange({startDate:e.target.value||undefined})}/></label>
   <label>End date<input type="date" aria-label="End date" value={value.endDate??""} onChange={e=>onChange({endDate:e.target.value||undefined})}/></label>
   <button type="button" onClick={onClear}>Clear filters</button>
  </form>
 );
}
