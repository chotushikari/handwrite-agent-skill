# Image rendering and provider integration

## Why this is separate from the skill

Agent Skills standardizes a folder of instructions and resources. It does not standardize image-generation model APIs, tool names, credentials, or binary output handling.

For that reason, Handwrite keeps the core skill provider-neutral and delegates pixel generation to the host.

## Integration options

### Option A — Native image tool (recommended)

If the agent host provides image generation directly, use it. This usually gives the best integration with the chat UI and may support image references and iterative edits.

### Option B — MCP image provider

For hosts that support MCP tools, connect an image-generation MCP server. Expose a focused tool such as `generate_handwritten_page` with inputs:
- `prompt`: exact page-specific prompt;
- `aspect_ratio`: portrait format;
- `reference_images`: optional references, if supported;
- `output_format`: PNG or another supported image format.

Return a real image or file resource, not just a textual success message.

### Option C — Provider-specific adapter

An application can implement an adapter around its chosen image API. Keep credentials outside the repository, use environment variables or a secrets manager, and normalize outputs to image files/resources.

## Suggested adapter contract

```ts
type GeneratePageRequest = {
  prompt: string;
  aspectRatio?: "3:4" | "2:3" | "A4";
  referenceImages?: Array<{ uri: string; mediaType?: string }>;
  outputFormat?: "png" | "jpeg" | "webp";
};

type GeneratePageResult = {
  imageUri: string;
  mimeType: string;
  width?: number;
  height?: number;
  provider: string;
  model?: string;
};
```

The contract is illustrative, not a universal MCP or vendor API schema. Adapt it to the target host's actual tool schema.

## Provider checklist

- [ ] Document supported model and endpoint.
- [ ] Keep API keys in environment variables/secrets.
- [ ] Validate input size and allowed output formats.
- [ ] Support reference images where the provider allows it.
- [ ] Return an image resource/file that the host can display.
- [ ] Report provider errors and rate limits accurately.
- [ ] Avoid logging private assignment text or reference images by default.
- [ ] Add integration tests with mocked provider responses.
- [ ] Document cost, retention, and data handling.

## Capability fallback

If no renderer is available:
1. complete source audit;
2. create page plan;
3. compose exact page content;
4. produce page-specific prompts;
5. clearly state that image files were not generated.

Do not silently substitute text for images.
