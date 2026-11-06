import { AuthIdentity, AuthorizationServiceImpl } from "./authorization-service.js";
import { UserStory } from "../types.js";
export function canSoftDelete(actor:AuthIdentity,story:UserStory){return new AuthorizationServiceImpl().canDelete(actor,story)}
