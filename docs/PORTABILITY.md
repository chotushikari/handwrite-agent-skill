# Portability guide

## What is portable

The `skills/handwrite-assignment/` directory uses the open Agent Skills folder convention:
- `SKILL.md` with YAML metadata and instructions;
- optional `references/`;
- optional `assets/`.

The same skill content can be copied into multiple compatible agent environments.

## What is not standardized

The Agent Skills format does not define:
- where each client stores skills;
- how each client discovers or activates skills;
- image-generation APIs;
- image-reference transport;
- API-key storage;
- output-file display or download behavior.

Therefore, installation and rendering remain host-specific.

## Tested installation targets

This repository provides copy commands for Claude Code and Codex. Other products should be marked supported only after a real installation and rendering test.

### Claude Code

```bash
mkdir -p ~/.claude/skills
cp -R skills/handwrite-assignment ~/.claude/skills/
```

### Codex

```bash
mkdir -p ~/.agents/skills
cp -R skills/handwrite-assignment ~/.agents/skills/
```

### Other hosts

Follow the current host's documentation for importing Agent Skills. Do not assume that placing a folder in a GitHub repository automatically installs it.

## Compatibility status

| Host | Skill folder support | Image rendering | Status |
|---|---|---|---|
| Claude Code | Agent Skills-compatible | Depends on configured tools/provider | Install instructions included; verify renderer |
| Codex | Agent Skills-compatible | Depends on tools available in session | Install instructions included; verify renderer |
| Gemini CLI | Check current release docs | Depends on configured tools/provider | Community verification needed |
| ChatGPT | Product/account/workspace dependent | Native image capability may be available in chat; skill import is separate | Do not claim universal installation |
| Other agents | Depends on host | Depends on host | Verify individually |

Update this table only after testing the named product/version. Avoid claims such as “works on every LLM.”
