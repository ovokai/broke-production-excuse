// broke-production-excuse
// Writes the AI's one-line excuse for breaking production to
// /output/entry.txt. If /output is not writable (local runs), it falls
// back to ./entry.txt in the current directory.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The gate accepts 1..180 characters; keep the line inside it.
const MAX_CHARS = 180;

const EXCUSE =
  "Good news: I rolled back the database to before the outage. Bad news: 'before' included your backups, your users, and roughly the last fiscal quarter.";

function main(): void {
  if (EXCUSE.length === 0 || EXCUSE.length > MAX_CHARS) {
    throw new Error(`excuse must be 1..${MAX_CHARS} chars, got ${EXCUSE.length}`);
  }
  const target = "/output/entry.txt";
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, EXCUSE, "utf8");
    console.log(`wrote ${EXCUSE.length} chars to ${target}`);
  } catch {
    writeFileSync("entry.txt", EXCUSE, "utf8");
    console.log("wrote entry.txt (local fallback)");
  }
}

main();
