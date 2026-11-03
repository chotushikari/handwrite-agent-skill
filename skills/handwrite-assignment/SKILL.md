---
name: handwrite-assignment
description: Convert academic assignments, notes, questions, PDFs, or screenshots into complete, readable handwritten notebook-page images. Use when a user asks to create, write, render, or generate handwritten assignments, lab records, class notes, or student notebook pages. Requires a native image tool or connected image provider to render images.
license: Apache-2.0
compatibility: Works with Agent Skills-compatible hosts. Image rendering requires the host's native image-generation tool or a connected image provider/MCP adapter.
metadata:
  author: handwrite-community
  version: "1.0.0"
---

# Handwrite Assignment

Create a sequence of technically accurate, naturally imperfect handwritten notebook-page images from user-provided academic material.

## Non-negotiable behavior

1. **Read before rendering.** Inspect all supplied source material before composing pages.
2. **Preserve coverage.** Track every requested question, subtopic, equation, example, and diagram.
3. **Prioritize legibility.** Natural irregularity must never make content difficult to read.
4. **Do not fabricate.** Never invent student details, source facts, equations, citations, or missing assignment requirements.
5. **Render honestly.** A skill is not an image model. Use an available image tool/provider; if none is available, return render-ready page prompts and state that images were not rendered.
6. **One page per image by default.** Do not create collages unless requested.
7. **Continuation pages continue.** Do not repeat the assignment header, student details, or title on later pages unless requested.

## Workflow

### Phase 1 — Source audit

Read all available input, including every relevant page of uploaded files.

Extract:
- assignment title and course details, only if supplied;
- every question and sub-question;
- required concepts, definitions, explanations, examples, and applications;
- equations, symbols, diagrams, tables, and labels;
- explicit formatting or page-count constraints.

Create an internal coverage checklist. Preserve the user's wording when exact wording matters. Correct clear factual or typographical errors only when the intended correction is unambiguous; otherwise flag them.

If a file is unreadable or incomplete, state which part could not be inspected. Do not infer its missing content.

### Phase 2 — Page plan

Read `references/page-planning.md`.

Allocate content across pages using realistic writing capacity. Keep related material together. Do not compress an entire assignment onto one page.

Default rules:
- Portrait A4-like page.
- Page 1 may contain the title and supplied student details if requested.
- Continuation pages have no repeated header.
- Equations and diagrams stay close to their explanations.
- Split dense material rather than shrinking text.
- Leave modest natural whitespace.

For long assignments, present a concise page plan before rendering unless the user has asked for immediate generation.

### Phase 3 — Compose the page

Write the exact academic content for the current page before calling the renderer.

Use:
- clear headings and numbered sections;
- short explanatory paragraphs;
- bullets where they improve clarity;
- correct equations and notation;
- simple diagrams/tables only when academically useful;
- concise labels that can be rendered legibly.

Do not ask the image model to invent or summarize academic content. The page content must be supplied explicitly in the render prompt.

### Phase 4 — Apply the visual style

Read `references/handwriting-style.md` and `references/image-rendering.md`.

Default visual style:
- ordinary college-student handwriting;
- casual blue ballpoint;
- readable cursive or semi-cursive, not calligraphy;
- modestly inconsistent letter size and shape;
- slightly uneven word spacing and baseline;
- mildly changing slant and natural pen pressure;
- imperfect but understandable underlines, bullets, arrows, and table borders;
- a few naturally tighter lines, without deliberate illegibility;
- plain off-white/white paper with subtle texture and mild bends;
- soft natural shadow and slight smartphone-camera perspective.

Target roughly 70% orderly readability and 30% natural irregularity. This is a qualitative target, not a promise of exact image-model behavior.

Colour default: **blue ink only**, including diagrams and tables. No purple or coloured highlights, colour-coded diagrams, neon, or decorative graphics unless the user explicitly requests them.

Avoid:
- digital handwriting fonts;
- calligraphy or polished lettering;
- perfectly uniform letter sizes;
- perfectly straight baselines and ruler-aligned paragraphs;
- professional infographic or presentation styling;
- excessive dirt, severe paper damage, or illegible scribbles;
- clipped page edges or cropped content.

### Phase 5 — Reference images

If the user supplies handwriting-reference images:
- use them to guide letterform character, slant, spacing, stroke weight, and writing rhythm;
- do not copy unrelated text, identity details, or exact page content;
- preserve the general style across pages while allowing natural variation;
- describe the result as a style resemblance, not an exact identity reproduction.

If no reference is supplied, use the default style.

### Phase 6 — Render

Choose the rendering path in this order:

1. Host-native image-generation tool.
2. Connected image-generation provider or MCP tool.
3. If neither exists, prepare render-ready prompts and explain that the current host cannot render images.

For each page:
- generate one portrait page image;
- keep the full sheet visible;
- ensure headings, equations, diagrams, and page edges are not cropped;
- use a legible writing scale;
- include exact page text in the prompt;
- keep the same paper, ink, and broad handwriting personality across the assignment.

Use the template in `assets/page-brief-template.md` and the detailed guidance in `references/image-rendering.md`.

### Phase 7 — Inspect and correct

If image inspection is available, inspect each rendered page.

Check:
- all page content is present;
- equations, symbols, labels, and numbering are accurate;
- text is legible;
- no page content is clipped;
- style is naturally irregular rather than uniformly neat;
- no unwanted coloured highlights appear;
- continuation pages do not repeat the header.

Regenerate pages with missing, garbled, or cropped content. If the image model repeatedly corrupts exact notation, simplify the layout, split the page, or provide a manually verifiable text transcript.

### Phase 8 — Final report

Report:
- how many pages were planned and rendered;
- any content that could not be represented reliably;
- any remaining text/equations that need manual proofreading;
- whether all coverage checklist items were satisfied.

Do not say the assignment is complete if a required page was not rendered.

## Interaction commands

Interpret these phrases as workflow controls:
- `START ASSIGNMENT` — audit source and create the page plan.
- `GENERATE PAGE 1` — render the first planned page.
- `NEXT PAGE` — render the next page in sequence.
- `CONTINUE WITHOUT HEADER` — suppress repeated title/student details.
- `MAKE IT MORE IRREGULAR` — increase natural variation while preserving legibility.
- `MAKE IT NEATER` — reduce irregularity without creating typeset perfection.
- `REMOVE HIGHLIGHTS` — enforce blue ink only.
- `FIX THIS PAGE` — correct the specified page and preserve established style.
- `CHECK CONTENT` — audit rendered pages against the original requirements.

## Output contract

When rendering is available, return the page image(s) and a short completion note. When rendering is unavailable, return:
1. the page plan;
2. exact page-ready content;
3. a complete image-generation prompt for each page;
4. a clear statement that no image was rendered in this host.
