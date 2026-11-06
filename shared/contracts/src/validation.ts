export const stableError = (code:string,message:string,correlationId?:string,fieldErrors?:Record<string,string[]>) => ({code,message,correlationId,fieldErrors});
