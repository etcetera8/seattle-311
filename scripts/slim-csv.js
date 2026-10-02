// Trims and slims and converts 311 data to JSON
import { createReadStream, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";

const input = process.argv[2] ?? "public/Customer_Service_Requests_20261002.csv";
const output = process.argv[3] ?? "public/requests.json";

function parseLine(line) {
  const fields = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

const rl = createInterface({ input: createReadStream(input), crlfDelay: Infinity });

let latIdx, lngIdx;
const points = [];
let skipped = 0;

for await (const line of rl) {
  const fields = parseLine(line);
  if (latIdx === undefined) {
    latIdx = fields.indexOf("Latitude");
    lngIdx = fields.indexOf("Longitude");
    if (latIdx === -1 || lngIdx === -1) throw new Error("Latitude/Longitude columns not found");
    continue;
  }
  const lat = parseFloat(fields[latIdx]);
  const lng = parseFloat(fields[lngIdx]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat === 0 || lng === 0) {
    skipped++;
    continue;
  }
  points.push([+lng.toFixed(5), +lat.toFixed(5)]);
}

writeFileSync(output, JSON.stringify(points));
console.log(`Wrote ${points.length} points to ${output} (skipped ${skipped} rows without coordinates)`);
