<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## 🛑 STRICT RULE: ZERO HARDCODING ALLOWED

1. **NO HARDCODED LISTS**: Never hardcode static keyword arrays, banned words, industry lists, or regex arrays inside source files (.ts, .js, .tsx).
2. **100% DYNAMIC CONFIGURATION**: All target filters, niche selections, blacklists, email copy templates, and criteria MUST be dynamic — fetched from Dashboard Settings DB or evaluated dynamically using AI LLMs.
3. **DASHBOARD CONTROL**: The user must always have full control via the Dashboard UI to modify targeting rules at runtime without code changes.

## Antigravity Tooling Rules

1. Before modifying a shared module, inspect the code-review graph and identify the impact radius.
2. Use gsd-discuss-phase, gsd-spec-phase and gsd-plan-phase before implementation.
3. Implement one approved phase only.
4. Use gsd-code-review and gsd-secure-phase before completing a phase.
5. Do not use gsd-autonomous, gsd-fast or gsd-quick for architecture, database, licensing, security, email delivery or migration work without explicit user approval.
6. Do not install a plugin, skill, MCP server or dependency without documenting its source, licence and purpose.
7. Never use cracked tools, licence bypasses, leaked API keys or repositories redistributing protected paid datasets.
8. Prefer legitimate maintained open-source alternatives.
9. Do not assume the newest library version is automatically safe or compatible.
10. Every completed phase must pass the canonical verification gate and code review.
11. Never claim a plugin, skill or MCP is available until it has been verified in the active session.
12. If a required tool is unavailable, report it honestly and continue only with an approved fallback.
