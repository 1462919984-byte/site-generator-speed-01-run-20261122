[![make.fun - site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/1462919984-byte/site-generator-speed-01-run-20261122/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/1462919984-byte/site-generator-speed-01-run-20261122/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

# site-generator-speed-01-run-20261122

A faster drop-in for make.fun's own `makefun-site` 1.0.0: a single dependency-free ES module
(`solve.js`) whose `run(input)` returns, byte for byte, the output tree that `makefun-site`'s
`build` returns for a case's site, and `main.ts`, the driver the harness runs.

The reference walks a metalsmith-shaped pipeline of plugins over one build object, rendering each
page through an interpreted template tree and each Markdown body through a lexer/parser in the
shape of marked. This entry keeps the exact semantics but:

- parses front matter and Markdown line by line without `split('\n')`-and-regex per line,
- renders Markdown blocks straight to HTML in one pass (no block-token objects),
- compiles each template (with its `include`s inlined at parse time) into a JavaScript function
  once per case, with direct property-access code for `{{ path }}`, `{% if %}`, `{% for %}`,
- caches slugs and each page's reading minutes within a case,
- builds every output string with array joins and single-pass HTML escaping.

Nothing is cached from one case to the next; each case is answered alone and deterministically.

## Run it

The harness runs `node /bot/main.ts` (Node 22). Locally, with a practice kit:

```sh
node cli/makefun.mjs grade-local --kit <kit> --bot <this-repository> --driver docker
```

`main.ts` reads every case from `/input/cases.json` (`MAKEFUN_INPUT_DIR` outside a container),
answers each with `run` from `solve.js`, and writes `/output/answers.json`
(`MAKEFUN_OUTPUT_DIR` outside a container).
