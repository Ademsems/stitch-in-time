import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — explicitly WELCOMES AI answer-engine crawlers (GEO strategy)
 * alongside standard search bots. Update SITE.url before launch.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAndSearchBots = [
    "GPTBot", // OpenAI / ChatGPT
    "OAI-SearchBot", // OpenAI search
    "ChatGPT-User",
    "ClaudeBot", // Anthropic
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "Google-Extended", // Gemini / AI Overviews training
    "Googlebot",
    "Bingbot",
    "Applebot",
    "Applebot-Extended",
    "DuckDuckBot",
    "Amazonbot",
    "CCBot", // Common Crawl
  ];

  return {
    rules: [
      // All AI + search bots: full access.
      ...aiAndSearchBots.map((agent) => ({
        userAgent: agent,
        allow: "/",
      })),
      // Everyone else: also allowed.
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
