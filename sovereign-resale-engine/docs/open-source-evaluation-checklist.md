# Open Source Evaluation Checklist — Sovereign AI Sales Agent

Every plugin, skill, MCP server, npm dependency, and external tool added to the **Sovereign AI Sales Agent** codebase must be evaluated against this safety and compliance checklist before installation.

---

## 🛡️ Open Source Security & Compliance Audit Criteria

| Criterion | Requirement / Standard | Verification Method | Status |
|-----------|------------------------|--------------------|--------|
| **1. Official / Trusted Source** | Must originate from official vendor repositories (e.g. Google, Anthropic, OpenJS, Microsoft, standard npm registry) or verified maintainers. | Check publisher provenance & signed commits | MANDATORY 🔒 |
| **2. Compatible Licence** | Permissive open-source license required (MIT, Apache-2.0, BSD-3-Clause, ISC). No copyleft or proprietary restrictions. | Inspect LICENSE file / `spdx` tag | MANDATORY 🔒 |
| **3. Active Maintenance** | Recent commits/releases within last 6 months; active response to critical security issues. | Inspect GitHub commit history & release log | REQUIRED ✅ |
| **4. Active Issue Maintenance** | No unresolved critical security CVEs or unaddressed vulnerability reports. | Check GitHub Security Advisories & Dependabot | REQUIRED ✅ |
| **5. Automated Test Suite** | Must include CI workflow (GitHub Actions) with unit/integration tests passing cleanly. | Inspect `.github/workflows` & build status | REQUIRED ✅ |
| **6. Security Policy** | Must have a documented `SECURITY.md` or clear vulnerability disclosure protocol. | Inspect `SECURITY.md` in repository root | REQUIRED ✅ |
| **7. Zero Embedded Credentials** | Must NOT contain hardcoded API keys, private tokens, passwords, or embedded secrets. | Scan with Gitleaks & static AST inspection | MANDATORY 🔒 |
| **8. Zero Licence Bypasses** | Must NOT contain crack tools, licence keygen scripts, or anti-tamper circumvention hacks. | Source code review & AST analysis | MANDATORY 🔒 |
| **9. No Dataset Redistribution** | Must NOT redistribute protected, private, scraped, or copyright-restricted datasets. | Data folder audit & license check | MANDATORY 🔒 |
| **10. Zero Unnecessary Telemetry** | No silent background tracking, analytics, phone-home metrics, or remote logging. | Network audit & source code check | MANDATORY 🔒 |
| **11. No Unexplained Binaries** | Must NOT contain compiled `.exe`, `.dll`, `.so`, or obfuscated binary payloads without open source build scripts. | File extension audit (`Get-ChildItem -Recurse`) | MANDATORY 🔒 |
| **12. Safe Installation Scripts** | Installation must NOT require elevated administrator (`sudo` / `RunAsAdmin`) privileges or execute unverified curl pipe shell scripts. | Inspect `package.json` scripts & install scripts | MANDATORY 🔒 |
| **13. Clear Removal Procedure** | Package can be uninstalled cleanly via standard package manager (`pnpm remove`) or directory removal. | Verify clean dependency graph removal | REQUIRED ✅ |

---

## 📋 Evaluation Workflow for New Dependencies

1. **Pre-Installation Audit:** Run all 13 checklist items against the target repository URL.
2. **Security Scan:** Run `gitleaks` and `semgrep` on the dependency source before importing.
3. **Lockfile Pinning:** Always commit strict lockfile hashes (`pnpm-lock.yaml`).
4. **Documentation Update:** Record the new tool in `docs/tooling-inventory.md` with source URL, licence, and purpose.
