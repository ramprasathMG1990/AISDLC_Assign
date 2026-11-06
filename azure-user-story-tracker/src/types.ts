export const STORY_STATUSES=["New","Approved","Ready","In Progress","Blocked","Testing","Completed","Closed"] as const;
export type StoryStatus=typeof STORY_STATUSES[number];
export type Priority="Low"|"Medium"|"High"|"Critical"|string;
export interface FilterSet {searchText?:string;applicationId?:string;moduleId?:string;featureId?:string;sprintId?:string;releaseId?:string;assigneeId?:string;status?:StoryStatus;startDate?:string;endDate?:string;page?:number;pageSize?:number;sort?:string}
export interface UserStory { userStoryId:string;title:string;description:string;applicationId:string;moduleId?:string;featureId:string;storyPoints:number;priority:Priority|string;status:StoryStatus;sprintId?:string;releaseId?:string;assigneeId?:string;businessOwnerId?:string;acceptanceCriteria?:string;dependencies?:string[];createdAt:string;updatedAt:string;createdById:string;updatedById:string;deletedAt?:string;deletedById?:string}
