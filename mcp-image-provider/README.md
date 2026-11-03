# Handwrite MCP Image Provider

A small MCP server that exposes `generate_handwritten_page` to MCP-compatible agent hosts. It bridges the Handwrite skill to an OpenAI Images API-compatible endpoint.

## Requirements

- Node.js 20+
- An API key for an image-generation provider that implements the compatible `/images/generations` request/response shape
- An MCP-capable host

Compatibility varies by provider. Do not assume every provider accepts the same model names, image sizes, or response fields.

## Setup

```bash
cd mcp-image-provider
npm install
cp .env.example .env
```

Set these environment variables in the MCP host configuration (prefer host secrets over a committed `.env` file):

| Variable | Purpose | Default |
|---|---|---|
| `IMAGE_API_BASE_URL` | API base URL, including `/v1` if required | `https://api.openai.com/v1` |
| `IMAGE_API_KEY` | Provider API key | Required |
| `IMAGE_MODEL` | Image model identifier | `gpt-image-1` |
| `IMAGE_SIZE` | Provider-supported size | `1024x1536` |
| `IMAGE_OUTPUT_DIR` | Local output directory | `./generated` |

Build and run:

```bash
npm run build
npm start
```

For local development:

```bash
npm run dev
```

## MCP tool

`generate_handwritten_page`

Input:
- `prompt` (required): full page-specific prompt, including exact page text;
- `size` (optional): provider-supported image dimensions;
- `filename` (optional): output filename stem.

Output:
- image content returned to the MCP client;
- a text result with model and saved output path.

## Connect to an MCP host

Configure the host to launch this server with:
- command: `node`
- args: `["/absolute/path/to/mcp-image-provider/dist/index.js"]`
- environment: `IMAGE_API_KEY`, `IMAGE_API_BASE_URL`, `IMAGE_MODEL`, `IMAGE_SIZE`, `IMAGE_OUTPUT_DIR`

The exact MCP configuration file and schema are host-specific. Follow the host's current documentation.

## Limitations

- This is a minimal OpenAI Images API-compatible bridge, not a universal adapter for every image API.
- It currently exposes generation, not image editing or reference-image uploads.
- Provider-specific parameters may need adjustment.
- The host must support MCP image content for the image to display inline.
- Keep API keys out of source control.
- Generated pages should be inspected for text corruption and cropping.

## Security notes

The server makes outbound requests only to the configured API base URL and, if the provider returns a URL instead of base64, downloads that returned image URL. Use trusted providers and a controlled runtime. Do not pass secrets in prompts.
