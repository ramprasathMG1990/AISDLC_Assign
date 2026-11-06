export const STORY_STATUSES = ["New","Approved","Ready","In Progress","Blocked","Testing","Completed","Closed"] as const;
export type StoryStatus = typeof STORY_STATUSES[number];
export const PRIORITIES = ["Low","Medium","High","Critical"] as const;
export type Priority = typeof PRIORITIES[number];
export interface FilterSet { searchText?: string; applicationId?: string; moduleId?: string; featureId?: string; sprintId?: string; releaseId?: string; assigneeId?: string; status?: StoryStatus; startDate?: string; endDate?: string; page?: number; pageSize?: number; sort?: string }
export interface Pagination { page:number; pageSize:number; totalItems:number; totalPages:number }
