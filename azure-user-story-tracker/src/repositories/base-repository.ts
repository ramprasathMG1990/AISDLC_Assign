export interface Transaction { commit(): Promise<void>; rollback(): Promise<void> }
export interface RepositoryContext { transaction<T>(work:(tx:Transaction)=>Promise<T>):Promise<T> }
export class InMemoryTransaction implements Transaction { async commit(){} async rollback(){} }
