import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "handwrite-image-provider",
  version: "0.1.0",
});

const baseUrl = (process.env.IMAGE_API_BASE_URL ?? "https://api.openai.com/v1").replace(/\/+$/, "");
const apiKey = process.env.IMAGE_API_KEY;
const model = process.env.IMAGE_MODEL ?? "gpt-image-1";
const size = process.env.IMAGE_SIZE ?? "1024x1536";
const outputDir = path.resolve(process.env.IMAGE_OUTPUT_DIR ?? "./generated");

function getMimeType(value: string | undefined): string {
  if (value === "image/jpeg" || value === "image/webp" || value === "image/png") return value;
  return "image/png";
}

async function downloadImage(url: string): Promise<{ bytes: Buffer; mimeType: string }> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image URL download failed: HTTP ${response.status}`);
  }
  const mimeType = getMimeType(response.headers.get("content-type") ?? undefined);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0 || bytes.length > 25 * 1024 * 1024) {
    throw new Error("Downloaded image is empty or exceeds the 25 MB safety limit.");
  }
  return { bytes, mimeType };
}

server.tool(
  "generate_handwritten_page",
  [
    "Generate one handwritten notebook-page image from a fully composed page prompt.",
    "Use this tool only after the academic page content has been audited and written.",
    "The tool uses an OpenAI Images API-compatible endpoint configured through environment variables.",
    "It returns the generated image and saves a copy in IMAGE_OUTPUT_DIR.",
  ].join(" "),
  {
    prompt: z.string().min(30).max(20000).describe("Complete visual prompt including exact page text and layout."),
    size: z.string().optional().describe("Provider-supported image size. Defaults to IMAGE_SIZE."),
    filename: z.string().optional().describe("Optional simple output filename; extension is selected from image MIME type."),
  },
  async ({ prompt, size: requestedSize, filename }) => {
    if (!apiKey) {
      return {
        isError: true,
        content: [{ type: "text", text: "IMAGE_API_KEY is not configured. Set it in the MCP server environment; no image was generated." }],
      };
    }

    const response = await fetch(`${baseUrl}/images/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        size: requestedSize ?? size,
      }),
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 2000);
      return {
        isError: true,
        content: [{ type: "text", text: `Image provider returned HTTP ${response.status}: ${detail}` }],
      };
    }

    const payload = await response.json() as {
      data?: Array<{ b64_json?: string; url?: string }>;
    };
    const item = payload.data?.[0];
    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: "Provider response did not contain an image. No image was saved." }],
      };
    }

    let bytes: Buffer;
    let mimeType = "image/png";

    if (item.b64_json) {
      bytes = Buffer.from(item.b64_json, "base64");
    } else if (item.url) {
      const downloaded = await downloadImage(item.url);
      bytes = downloaded.bytes;
      mimeType = downloaded.mimeType;
    } else {
      return {
        isError: true,
        content: [{ type: "text", text: "Provider response contained neither b64_json nor url." }],
      };
    }

    if (bytes.length === 0 || bytes.length > 25 * 1024 * 1024) {
      return {
        isError: true,
        content: [{ type: "text", text: "Generated image is empty or exceeds the 25 MB safety limit." }],
      };
    }

    await mkdir(outputDir, { recursive: true });
    const ext = mimeType === "image/jpeg" ? "jpg" : mimeType === "image/webp" ? "webp" : "png";
    const safeStem = (filename ?? `handwrite-page-${randomUUID()}`)
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 80) || `handwrite-page-${randomUUID()}`;
    const outputPath = path.join(outputDir, `${safeStem}.${ext}`);
    await writeFile(outputPath, bytes);

    return {
      content: [
        {
          type: "image",
          data: bytes.toString("base64"),
          mimeType,
        },
        {
          type: "text",
          text: `Generated one page with model "${model}". Saved image to: ${outputPath}`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
