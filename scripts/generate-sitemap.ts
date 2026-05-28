import { writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://devhorizontech.com"

interface SitemapEntry {
  path: string
  lastmod?: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/services/web-development", changefreq: "monthly", priority: "1.0" },
  { path: "/services/mobile-apps", changefreq: "monthly", priority: "1.0" },
  { path: "/services/meta-ads", changefreq: "monthly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/reviews", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/careers", changefreq: "weekly", priority: "0.9" },
  { path: "/get-quote", changefreq: "monthly", priority: "0.9" },
]

function generateSitemap(entries: SitemapEntry[]) {
  const today = new Date().toISOString().split("T")[0]
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)
