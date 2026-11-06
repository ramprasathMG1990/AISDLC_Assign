import { useState } from "react";
import { downloadCsv } from "../../api/export-api";
export function ExportControls({filter}:{filter:any}){const [busy,setBusy]=useState(false),[error,setError]=useState("");async function run(){setBusy(true);setError("");try{await downloadCsv(filter)}catch(e:any){setError(e.message)}finally{setBusy(false)}}return <div><button disabled={busy} onClick={run}>{busy?"Preparing export…":"Export CSV"}</button>{error&&<p role="alert">{error}</p>}</div>}
