// main.ts — the driver the harness runs (node22): reads /input/cases.json, answers each case
// with run() from solve.js, writes /output/answers.json. No V8 flags: on this entry, leaving the
// engine's defaults on (incremental marking, lazy compilation) measures faster than turning
// incremental marking off.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as { run: (input: unknown) => unknown };

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as { id: string; input: unknown }[];
const answers: unknown[] = [];
for (const c of cases) answers.push(run(c.input));
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
