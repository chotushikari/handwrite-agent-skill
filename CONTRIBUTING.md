# Contributing

Thanks for helping improve Handwrite.

## Before opening an issue

Include:
- host and version (for example, Claude Code or Codex);
- model and image renderer/provider;
- operating system, if relevant;
- a minimal reproducible prompt;
- expected and actual behavior;
- whether the issue concerns content, page planning, rendering, or visual style.

Do not upload private assignments, student identifiers, personal handwriting samples, API keys, or other sensitive material to public issues.

## Pull requests

1. Keep the core `SKILL.md` focused and under 500 lines.
2. Put detailed guidance in `references/`.
3. Add or update an evaluation case for behavior changes.
4. Update compatibility claims only when tested.
5. Run `python scripts/validate_skill.py`.
6. Explain any renderer-specific assumptions.

## Design principles

- Portable core; provider-specific integrations stay separate.
- Accuracy and readability before visual novelty.
- Natural irregularity, not deliberate illegibility.
- Explicit capability limits; never fake image generation.
- No hard-coded credentials or private user data.
