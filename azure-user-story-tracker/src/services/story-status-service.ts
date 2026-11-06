import { StoryStatus } from "../types.js";
export const STORY_SEQUENCE=["New","Approved","Ready","In Progress","Blocked","Testing","Completed","Closed"] as const;
export function canTransition(from:StoryStatus,to:StoryStatus){const i=STORY_SEQUENCE.indexOf(from as typeof STORY_SEQUENCE[number]);return i>=0&&STORY_SEQUENCE[i+1]===to}
