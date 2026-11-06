export function Loading(){return <p role="status">Loading dashboard…</p>}
export function ErrorView({message,onRetry}:{message:string;onRetry:()=>void}){return <div role="alert"><p>{message}</p><button onClick={onRetry}>Retry</button></div>}
export function EmptyState(){return <p role="status">No stories match the active filters.</p>}
