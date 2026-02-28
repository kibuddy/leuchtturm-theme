# Leuchtturm - Ghost Theme

Custom Ghost theme for [KI-Buddy](https://ki-buddy.cloud) and [marekschilke.de](https://marekschilke.de). Fork of [Casper](https://github.com/TryGhost/Casper) with custom branding, lighthouse hero animation, and Medienkompetenz focus.

## Features

- Animated SVG lighthouse hero section
- Dark mode / Auto color scheme support
- Custom shop page template (`page-shop.hbs`)
- Responsive navigation layouts
- PhotoSwipe lightbox integration
- Newsletter signup integration
- Social media icons (X, LinkedIn, Bluesky, Mastodon, etc.)

## Development

Styles are compiled using Gulp/PostCSS. You need [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.

```bash
# Install dependencies
yarn install

# Build CSS + JS
yarn build

# Dev mode with livereload
yarn dev

# Create distribution ZIP
yarn zip
```

## Deployment

```bash
# Deploy to Ghost EN (ki-buddy.cloud)
./deploy.sh en

# Deploy to Ghost DE (marekschilke.de)
./deploy.sh de
```

## Structure

```
leuchtturm/
├── default.hbs          # Main layout
├── index.hbs            # Homepage with lighthouse hero
├── post.hbs             # Article template
├── page.hbs             # Generic page
├── page-shop.hbs        # Shop page template
├── assets/
│   ├── css/             # Source CSS
│   ├── js/              # Source JS
│   ├── built/           # Compiled output
│   └── images/          # Screenshots
└── partials/
    ├── post-card.hbs    # Post card component
    ├── lightbox.hbs     # PhotoSwipe lightbox
    └── icons/           # SVG icons
```

## PostCSS Features

- Autoprefixer
- [Color Mod](https://github.com/jonathantneal/postcss-color-mod-function)
- cssnano minification

## SVG Icons

Inline SVG icons via Handlebars partials in `/partials/icons`. Use `{{> "icons/rss"}}` to include.

## Copyright & License

Based on Casper (c) Ghost Foundation. Modifications (c) Marek Schilke. Released under [MIT](LICENSE).
