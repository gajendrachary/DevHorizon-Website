# DevHorizon Technologies — Official Website

High-performance static website for **DevHorizon Technologies**, built with **Hugo Extended** and powered by the **DevHorizon Design Language System (@devhorizon/dls)**.

## Architecture

- **Static Site Generator**: [Hugo Extended](https://gohugo.io/) (v0.145+)
- **Design System**: Decoupled `@devhorizon/dls` (Tokens, atomic components, obsidian & silver palette)
- **Deployment Target**: GitHub Pages with automatic GitHub Actions CI/CD
- **Performance**: Sub-150ms static compilation, zero external runtime database dependencies, instant global edge delivery

## Getting Started

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (`brew install hugo`)
- Git

### Development

```bash
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/gajendrachary/DevHorizon-Website.git
cd DevHorizon-Website

# Start the Hugo development server with live reload
npm run dev
# or: hugo server -D -p 1313
```

Visit `http://localhost:1313/` in your browser.

### Building for Production

```bash
npm run build
# or: hugo --minify
```

The optimized static production files are output to `dist-hugo/`.

### Standalone DLS Development

To run the interactive Design Language System component workbench independently:

```bash
npm run dls:dev
# Starts Vite playground on http://localhost:5175
```

## Structure

```
.
├── assets/          # Global DLS stylesheets and Hugo asset pipeline resources
├── content/         # Markdown content and page sections
├── layouts/         # Hugo HTML templates and DLS reusable partials
├── packages/dls/    # Standalone @devhorizon/dls design system submodule
├── static/          # Static assets (images, logos, favicon, robots.txt)
└── hugo.toml        # Hugo site configuration and metadata
```

## License

Copyright © 2026 DevHorizon Technologies Pvt Ltd. All rights reserved.
