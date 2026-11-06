export interface DatabaseConfig { connectionString?:string }
export function databaseConfig():DatabaseConfig{return {connectionString:process.env.DATABASE_URL}}
