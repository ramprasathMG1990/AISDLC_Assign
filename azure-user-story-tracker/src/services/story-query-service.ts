import { FilterSet } from "../types.js";
import { InMemoryStoryRepository } from "../repositories/story-repository.js";
export class StoryQueryService {constructor(private repo:InMemoryStoryRepository){} query(f:FilterSet){return this.repo.list(f)}}
