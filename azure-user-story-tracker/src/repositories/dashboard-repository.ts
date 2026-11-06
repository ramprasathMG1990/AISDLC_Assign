import { InMemoryStoryRepository } from "./story-repository.js";
import { FilterSet, UserStory } from "../types.js";
export class DashboardRepository {constructor(private stories:InMemoryStoryRepository){} async getActive(filter:FilterSet):Promise<UserStory[]>{return (await this.stories.list({...filter,page:1,pageSize:200})).items}}
