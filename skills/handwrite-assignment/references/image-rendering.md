# Image rendering guide

## Renderer selection

A skill does not itself generate pixels. Select:
1. native image generation exposed by the host;
2. a connected provider/MCP image tool;
3. otherwise return prompts and explain that rendering is unavailable.

Do not hallucinate tool names, API parameters, image outputs, or provider capabilities. Follow the exact schema exposed by the current host.

## Prompt construction

Every render request should contain:
- page orientation and framing;
- the complete page text, copied exactly from the composed page;
- handwriting style;
- paper and lighting;
- page-specific layout;
- negative constraints;
- reference-image instructions, if applicable.

## Base visual prompt

> Create one complete portrait A4-like photograph of a student's handwritten academic notebook page. Use casual, readable blue-ballpoint handwriting with moderately irregular letter sizes, slightly inconsistent natural spacing, subtly changing slant, gently uneven baselines, imperfect underlines and bullets, mild pen-pressure variation, and a few naturally tighter lines. The writing should look like ordinary student work written at a normal pace: neither calligraphic nor uniformly neat. Use plain off-white or white paper with subtle texture, mild natural bends, soft ambient shadow, and a slight smartphone photograph perspective. Use blue ink only for all text, diagrams, tables, and marks. Include every supplied word, equation, and symbol accurately. Keep the entire page visible and legible. Avoid digital fonts, typesetting, perfect alignment, uniform letterforms, polished infographic styling, coloured highlights, decorative graphics, severe paper damage, and illegible scribbles.

Append:
1. exact page content;
2. a page-specific layout brief;
3. any user-provided reference-image guidance;
4. a negative instruction against repeated headers on continuation pages.

## Exact text preservation

Image models can distort spelling, symbols, and equations. Reduce this risk:
- keep text concise;
- split dense pages;
- avoid tiny labels;
- use simple diagrams;
- inspect every rendered page;
- offer a text transcript for verification.

Never ask the image model to invent missing academic content. Supply the content explicitly.

## Aspect ratio and framing

Use a portrait aspect ratio close to A-series paper when supported. Prefer a single page image. The entire paper should fit within the frame with a modest margin. Do not crop page corners or content.

## Reference images

Pass reference images through the host's supported image-reference mechanism. If the renderer cannot accept reference images, state this limitation and use the written style guide. Do not pretend the reference was used.
