<div align="center">

# Handwrite

### Turn academic material into natural-looking handwritten notebook pages.

A portable Agent Skill for planning, writing, and rendering readable student-style assignment pages with controlled human irregularity.

[![Agent Skills](https://img.shields.io/badge/format-Agent%20Skills-6554c0)](https://agentskills.io/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## What it does

Handwrite helps an AI agent transform source material—typed notes, assignment questions, PDFs, or screenshots—into a complete sequence of handwritten notebook-page images.

It is designed around a specific visual target: **ordinary student handwriting that is readable but not unnaturally uniform**.

- Audits the source and tracks topic coverage before rendering.
- Plans page breaks instead of cramming everything onto one sheet.
- Uses casual blue-ballpoint handwriting with controlled irregularity.
- Keeps equations, diagrams, labels, and tables technically accurate.
- Maintains a consistent visual personality across continuation pages.
- Uses supplied handwriting references as style guidance without copying their content.
- Routes rendering to the host's native image tool or a connected image provider.
- Falls back honestly when the host cannot generate images.

## Preview of the workflow

```text
Source material
  PDF · DOCX · screenshots · typed text · assignment questions
       |
       v
1. INGEST & AUDIT
  Extract requirements, topics, equations, diagrams and constraints
       |
       v
2. COVERAGE MAP
  Build a checklist so no requested topic disappears
       |
       v
3. PAGE PLANNER
  Allocate content to readable portrait pages
       |
       v
4. PAGE COMPOSER
  Write concise, technically correct page content
       |
       v
5. IMAGE RENDERER
  Native image tool OR connected provider/MCP tool
       |
       v
6. QUALITY GATE
  Check legibility, clipping, coverage, equations and consistency
       |
       v
Handwritten page images + completion report
```

## The visual philosophy

Handwrite does **not** aim for calligraphy or a perfect handwriting font. Its default target is a real student's notebook page:

| Dimension | Default |
|---|---|
| Writing instrument | Blue ballpoint |
| Handwriting | Casual, readable, mildly irregular |
| Letterforms | Slightly varied height, width and joins |
| Alignment | Subtly drifting baselines and imperfect margins |
| Spacing | Naturally inconsistent, never chaotic |
| Diagrams | Simple, hand-drawn, blue ink |
| Paper | Off-white/white, subtle texture and bends |
| Photography | Full page visible, soft shadow, slight phone-camera perspective |
| Colour | Blue ink only; no coloured highlights |
| Readability | High; imperfections must not obscure content |

The default balance is approximately **70% orderly readability / 30% natural irregularity**. This is a visual target, not a numerical image-generation parameter.

## Install

The skill follows the open [Agent Skills format](https://agentskills.io/): a folder containing `SKILL.md` plus optional references, assets, and scripts.

### Claude Code

```bash
mkdir -p ~/.claude/skills
cp -R skills/handwrite-assignment ~/.claude/skills/
```

### OpenAI Codex

```bash
mkdir -p ~/.agents/skills
cp -R skills/handwrite-assignment ~/.agents/skills/
```

### Gemini CLI and other compatible agents

Use the agent's documented Agent Skills directory or import flow. The portable skill folder is:

```text
skills/handwrite-assignment/
```

### ChatGPT

ChatGPT's skill and plugin availability depends on the current product surface, account, and workspace. This repository is not automatically installed into ChatGPT by being public on GitHub. Use the supported import/upload mechanism available in your ChatGPT environment, if enabled.

For a general overview of the format and client support, see [Agent Skills](https://agentskills.io/) and [the client showcase](https://agentskills.io/).

## Image generation: the important distinction

A skill is an instruction package. **It is not an image model, an API key, or a universal image-generation runtime.**

Handwrite can render images when the host exposes:
1. a native image-generation tool; or
2. a connected image-generation provider through an MCP server or another tool adapter.

If neither exists, the agent should still audit the source, plan pages, and return render-ready prompts—but it must say that image rendering is unavailable. It must never claim that an image was generated when no renderer ran.

This repository also includes a minimal MCP bridge for OpenAI Images API-compatible providers. It lets MCP-capable hosts call an image renderer through a common tool interface. It is not a universal provider adapter and currently supports generation (not reference-image editing).

See:
- [`mcp-image-provider/README.md`](mcp-image-provider/README.md)
- [`docs/IMAGE_RENDERING.md`](docs/IMAGE_RENDERING.md)
- [`docs/PORTABILITY.md`](docs/PORTABILITY.md)
- [`skills/handwrite-assignment/references/image-rendering.md`](skills/handwrite-assignment/references/image-rendering.md)

## Usage

After installing the skill, try:

```text
Use Handwrite to turn this assignment into handwritten notebook pages.
Read the entire source first, create a topic coverage checklist, split it into
readable portrait pages, and generate each page in order. Use the default
casual blue-ballpoint student handwriting style with natural irregularity.
Do not repeat the title on continuation pages.
```

Useful follow-up commands:

| Command | Action |
|---|---|
| `START ASSIGNMENT` | Inspect source and prepare the page plan |
| `GENERATE PAGE 1` | Render the first planned page |
| `NEXT PAGE` | Render the next page |
| `CONTINUE WITHOUT HEADER` | Continue without repeating title/details |
| `MAKE IT MORE IRREGULAR` | Increase natural variation without harming readability |
| `MAKE IT NEATER` | Reduce irregularity without making it typeset |
| `REMOVE HIGHLIGHTS` | Enforce blue ink only |
| `FIX THIS PAGE` | Correct a page while preserving style |
| `CHECK CONTENT` | Audit coverage and technical accuracy |

## Repository layout

```text
handwrite/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── .gitignore
├── .github/
│   └── workflows/
│       └── validate.yml
├── skills/
│   └── handwrite-assignment/
│       ├── SKILL.md
│       ├── references/
│       │   ├── page-planning.md
│       │   ├── handwriting-style.md
│       │   ├── image-rendering.md
│       │   └── quality-checklist.md
│       └── assets/
│           └── page-brief-template.md
├── docs/
│   ├── IMAGE_RENDERING.md
│   └── PORTABILITY.md
├── mcp-image-provider/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── README.md
│   └── src/
│       └── index.ts
├── evals/
│   ├── cases.yaml
│   └── README.md
└── scripts/
    └── validate_skill.py
```

## Quality and evaluation

The repository includes:
- a lightweight frontmatter and structure validator;
- scenario-based evaluation cases for coverage, continuation pages, visual style, and missing renderer behavior;
- a page-level quality checklist;
- CI validation on pushes and pull requests.

Run:

```bash
python scripts/validate_skill.py
```

## Safety and privacy

- Do not invent personal details, institutional information, dates, or citations.
- Treat uploaded source files and reference images as user-provided content.
- Do not copy private or unrelated text from a handwriting reference image.
- Do not put provider API keys in `SKILL.md`, prompts, examples, or committed files.
- Use provider credentials through the host's secret manager or environment variables.
- Make generated pages available only to the user unless they explicitly request sharing.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports should include the host agent, renderer/provider, a minimal source example, and the failure mode. Never include private student records or API keys in issues.

## License

Apache-2.0. See [LICENSE](LICENSE).
