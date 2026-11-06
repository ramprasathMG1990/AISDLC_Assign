import test from "node:test";
import assert from "node:assert/strict";
import { CsvExporter } from "../../src/integrations/csv-exporter.js";
test("escapes RFC 4180 fields",()=>{const csv=new CsvExporter().exportCsv(["title"],[["A, \"quoted\" story"],["line 1\nline 2"]]);assert.match(csv,/A, ""quoted"" story/);assert.match(csv,/\"line 1\nline 2\"/)});
