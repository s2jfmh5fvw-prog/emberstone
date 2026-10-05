# PAP SMP website repository

Production: https://papsmp.de

The maintained website is **papsmp-website/**, a static Astro application. The root-level Emberstone HTML, styles, assets, package scripts and worker.js are historical files, retained unchanged. They are not the PAP SMP production build or an active PAP API.

## Source of truth and deployment

GitHub s2jfmh5fvw-prog/emberstone → main → Cloudflare Pages project emberstone → papsmp.de.

Confirmed Cloudflare configuration on 2026-09-30:

- Production branch: main; automatic Git deployments enabled.
- Root directory: papsmp-website.
- Build command: npm ci && npm run build.
- Output directory: dist (relative to papsmp-website).
- Build system: version 3; build cache disabled.
- Node: 22 (Cloudflare resolved 22.22.0); Astro requires >=22.12.0.
- No Pages Functions, runtime bindings or configured production variables were listed.
- Pull requests/other branches receive preview deployments.

The branch pap-smp-production is a historical branch, not the configured production source. Do not switch production to it or copy its older assets over main.

## Local verification

Run from papsmp-website, not from the repository root:

```sh
npm ci
npm run check
npm run build
npm run dev
```

After publishing, confirm the exact commit in Cloudflare's successful production deployment and test https://papsmp.de in a browser on desktop and mobile. A successful push alone does not prove deployment. Compare built HTML/assets with the domain; use existing deployment retries only for a confirmed failed deployment. Do not use direct upload or a Worker deployment to bypass Git.

## Protected files and remaining releases

The resourcepacks in papsmp-website/public/downloads are READ ONLY for ordinary website maintenance. Preserve their bytes and existing URLs; do not rebuild or repackage them. The explicitly requested 2026-10-05 release publishes the separately validated Alpha v1.0 RC2 files (resource revision 3.2.10, Visual addon 0.3.1-alpha, Travel Menu 1.4.0-alpha.2) as new versioned downloads. Existing 3.2.8, 3.2.2 and unversioned URLs remain byte-identical for existing server configurations. The active links, hashes and FAQ answer use papsmp-website/src/data/pack-release.ts. Installation, rollback, release evidence and SHA-256 are linked beside the downloads. Native Java/Bedrock graphical acceptance and production server installation remain separate from website publication.

Existing PAP artwork and motion assets are retained. Do not overwrite other working copies without comparing their changes first.

Impressum and Datenschutz are explicitly marked placeholders; real operator details and a reviewed description of actual processing are still required. Search crawling remains disabled by robots.txt until this release gate is resolved. YouTube/Twitch are not yet confirmed destinations. Bedrock/server acceptance and VIP checkout are separate release gates; no availability or player statistics are invented.

See papsmp-website/CONTENT_REQUIRED.md for the content handoff.
