export interface FilterState {searchText:string;applicationId?:string;moduleId?:string;featureId?:string;sprintId?:string;releaseId?:string;assigneeId?:string;status?:string;startDate?:string;endDate?:string;page:number;pageSize:number}
export const defaultFilters=():FilterState=>({searchText:"",page:1,pageSize:25});
