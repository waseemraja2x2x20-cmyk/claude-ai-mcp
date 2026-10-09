---
name: n8n
description: Build n8n custom nodes (declarative and programmatic), credentials and trigger nodes, then test, lint and publish them. Use when the owner mentions n8n, an n8n node, or connecting a service to n8n.
---

# n8n

Read `custom-nodes-reference.md` for project setup, programmatic and declarative nodes, credentials, property types, display options, trigger (polling) nodes, testing and publishing.

## Rules for this repo

- Before building a custom node, check whether n8n's built-in HTTP Request node or an existing community node already does the job. Most simple APIs need no custom node.
- Keep any node package in its own folder (for example `n8n-nodes-<name>/`) with its own `package.json`. Do not add npm dependencies to `growth-framework/`.
- API keys go in n8n credentials (`typeOptions: { password: true }`), never in the repo.
- Blog routines already run as Claude routines. Do not rebuild them in n8n unless the owner asks.
- Publishing to npm is public; ask the owner before `npm publish`.
- New work goes to a branch and preview first, like every other manual change.
