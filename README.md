<div align="center">

<img src="docs/images/handwrite-hero.svg" alt="Handwrite workflow from source material to notebook pages" width="820">

# Handwrite

### Turn assignments, notes, and PDFs into handwritten notebook-page images.

[![Agent Skills](https://img.shields.io/badge/format-Agent%20Skills-6554c0?style=for-the-badge)](https://agentskills.io/)
[![CI](https://img.shields.io/github/actions/workflow/status/chotushikari/handwrite-agent-skill/validate.yml?branch=main&style=for-the-badge&label=checks)](https://github.com/chotushikari/handwrite-agent-skill/actions)
[![License](https://img.shields.io/badge/license-Apache--2.0-2ea44f?style=for-the-badge)](LICENSE)

</div>

Handwrite is a portable Agent Skill that reads source material, plans realistic pages, follows an optional handwriting reference, and produces one notebook-page image per page.

## What you provide → what you get

<div align="center">

<img src="docs/images/handwritten-reference-example.png" alt="Handwriting reference example supplied by a user" width="43%">
&nbsp;&nbsp;
<img src="docs/images/handwritten-page-example.png" alt="Handwritten notebook page example produced by the workflow" width="43%">

<br>
<sub><strong>What you provide:</strong> a handwriting sample to guide the style &nbsp; → &nbsp; <strong>What you get:</strong> a handwritten notebook page.</sub>

</div>

> These examples demonstrate the reference-to-output workflow. They contain different subject matter and are not a same-content before/after pair.

### You provide

- An assignment, notes, PDF, DOCX, screenshot, photo, or pasted text.
- Optionally, one to three clear photos of your own handwriting, like the example above.
- Any page-count, formatting, equation, diagram, or question-order requirements.

### You get

- A source coverage checklist and page plan.
- One portrait notebook-page image per page.
- Consistent student-style handwriting across continuation pages.
- Technical content, equations, tables, and diagrams preserved as closely as the renderer allows.
- A content and legibility check after rendering.

## Use it in four steps

### 1. Copy the skill

Clone this repository:

```bash
git clone https://github.com/chotushikari/handwrite-agent-skill.git
```

Copy the complete `skills/handwrite-assignment/` folder, including `SKILL.md`, `references/`, and `assets/`, into your tool's Agent Skills directory:

| Tool | Directory |
| --- | --- |
| Claude Code | `~/.claude/skills/handwrite-assignment/` |
| OpenAI Codex | `~/.agents/skills/handwrite-assignment/` |
| VS Code / GitHub Copilot | `.github/skills/handwrite-assignment/` or `.agents/skills/handwrite-assignment/` |
| Other agents | Use the directory documented by that tool |

### 2. Configure image generation

Use either:

- the host's native image-generation tool; or
- the included [`mcp-image-provider/`](mcp-image-provider/) with a compatible image API.

The skill does not install or provide an image model. Without an image renderer, it returns the page plan and render-ready prompts instead of images.

### 3. Attach files and start

Attach:

1. The source assignment or notes.
2. An optional handwriting reference photo.

Then send:

```text
Use the handwrite-assignment skill.
Read the complete source before generating anything.
Create a coverage checklist and a page plan first.
Use my attached notebook photo only as a handwriting-style reference.
Preserve the source meaning, equations, diagrams, tables, and question order.
Create one portrait A4-like notebook page per image.
Keep the handwriting natural and readable.
Generate page 1 first so I can review the style.
```

### 4. Review and continue

Review page 1 before generating the remaining pages:

| Instruction | Use it to |
| --- | --- |
| `Make it more irregular` | Add variation in size, spacing, slant, and baseline |
| `Make it neater` | Improve readability without making it typeset |
| `Fix this page: ...` | Correct a specific error |
| `Continue with page 2` | Generate the next page without repeating the title block |
| `Check content` | Compare the rendered pages with the source |

Save the page images. Combine them into a PDF if a single submission file is required.

## Rendering workflow

<div align="center">

<img src="docs/images/workflow.svg" alt="Five-step Handwrite workflow" width="900">

</div>

1. **Audit** the complete source.
2. **Plan** page breaks for readable content.
3. **Compose** exact page text before rendering.
4. **Render** one portrait page at a time.
5. **Inspect** coverage, equations, labels, clipping, and legibility.

## Default page style

| Detail | Default |
| --- | --- |
| Ink | Blue ballpoint |
| Handwriting | Readable, casual, mildly irregular |
| Page | Portrait A4-like layout with modest whitespace |
| Paper | Off-white or white with subtle texture |
| Diagrams | Simple, hand-drawn, blue ink |
| Colour | Blue ink only; no coloured highlights |
| Continuation pages | No repeated title or student details |

<div align="center">

<img src="docs/images/notebook-preview.svg" alt="Illustrative notebook-page output" width="360">

<br>
<sub>Illustrative output style. The repository does not include a fixed handwriting font.</sub>

</div>

## Requirements and limitations

- An Agent Skills-compatible host.
- An image-generation tool or configured image provider for actual page images.
- Source material supplied by the user.
- A handwriting reference is optional; the default style is used when none is provided.

Handwrite does not invent missing facts, student details, equations, citations, or assignment requirements. It must not claim images were generated when no renderer ran. Inspect generated pages before submitting them because image models can corrupt text, equations, and labels.

## Repository

```text
skills/handwrite-assignment/
├── SKILL.md                         # Core workflow
├── references/                      # Planning, style, rendering, and QA guidance
└── assets/page-brief-template.md    # Page prompt template

mcp-image-provider/                  # Optional MCP image bridge
docs/                                # Rendering and portability guides
evals/                              # Scenario-based evaluation cases
scripts/validate_skill.py            # Local validator
```

Validate the skill locally:

```bash
python scripts/validate_skill.py
```

## Troubleshooting

- **Skill not recognised:** confirm `handwrite-assignment/SKILL.md` exists directly inside the copied folder, then reload the host.
- **No images generated:** configure a native image tool or the optional MCP provider.
- **Writing is too perfect:** attach a clearer handwriting reference and request more variation.
- **Page is crowded:** ask for more pages rather than smaller writing.

## License

Apache-2.0. See [`LICENSE`](LICENSE).
