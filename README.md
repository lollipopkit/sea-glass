# Sea Glass

English | [简体中文](https://github.com/lollipopkit/sea-glass/blob/main/README.zh-CN.md)

Design source: [@jmcg_me](https://x.com/jmcg_me/status/2109384135257305221)

A frosted-glass UI design system: soft color surfaces, fully rounded controls, fine fleck grain, a lighter lower edge with a same-shape shadow, a pointer-following hover light and a jelly press.

## Contents

| Path | Description |
| --- | --- |
| `tokens/tokens.json` | Design tokens: colors (day and night themes), type, spacing, radii, shadows, opacity |
| `tokens/tokens.css` | CSS custom properties generated from `tokens.json`; day by default, night with `data-theme="dark"` or the system dark setting |
| `components/bundle.js` | All React components (UMD: as a classic script it extends `window.SeaGlass` with no build step; also loadable as CommonJS) |
| `components/index.mjs` | ESM entry of the npm package |
| `components/bundle.css` | Component styles, the glass material and all adjustable parameters |
| `components/index.d.ts` | TypeScript declarations |
| `components/<Component>/` | Per-component notes (`README.md`) and preview snippet (`preview.html`) |
| `docs/design.md` | Design notes: principles, color, type, material, parameters, performance, interaction states |
| `assets/icons/` | SVG files for some icons |
| `site/` | Single-file component reference (`index.html`, bilingual, theme switch, parameter panel) with its source and build script |
| `examples/minimal.html` | Minimal usage example |

## Usage

### npm

```sh
npm i sea-glass
```

```js
import 'sea-glass/tokens.css';
import 'sea-glass/style.css';
import { Button, SegmentedNav, Toolbar, setParams } from 'sea-glass';
```

Requires React 18 or later (peer dependency). Load the Google Sans Flex font yourself (see the `<link>` below). ESM, CommonJS and TypeScript types are included, and the module can be loaded during server rendering; the hover light, press deformation and grain start only in the browser.

### `<script>` tags

Requires React 18 and ReactDOM 18 (UMD builds). Load in this order:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,400..700&display=swap">
<link rel="stylesheet" href="https://unpkg.com/sea-glass/tokens/tokens.css">
<link rel="stylesheet" href="https://unpkg.com/sea-glass/components/bundle.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/sea-glass/components/bundle.js"></script>
```

```js
const { Button, SegmentedNav, Toolbar } = window.SeaGlass;
```

Components: Button, IconButton, SegmentedNav, PromptBar, Chip, GlassCard, Meter, Sparkline, Slider, ScrollArea, Toolbar, Fab, SwatchPicker, ToggleButton, Icon. Props are documented in `components/<Component>/README.md` and `components/index.d.ts`; full examples are on the component reference page.

Add the classes `sg-glass` and `sg-tone-<tone>` (seafoam, aqua, cobalt, lilac, coral, amber, frost) to any element to give it the glass material.

## Parameters

Every part of the glass (grain, middle band, highlight, shadow) is a CSS custom property. Set it on `:root`, any element or a single component, or from script:

```js
SeaGlass.setParams({ bandStrength: 50, fleckDark: 14 });
SeaGlass.resetParams();
```

See "Adjustable parameters" in `docs/design.md`, or `SeaGlass.params`, for the list.

## Component reference

`site/index.html` is a single-file page with no build dependency: open it in a browser, or publish the `site` directory with GitHub Pages. After changing `tokens/tokens.json`, `components/bundle.*` or `site/app.js`, run from the repository root:

```sh
python3 site/build.py
```

The script also regenerates `tokens/tokens.css`.

## Browser support

Requires CSS `color-mix()`, `@property` and `:has()` (Chrome and Edge 111+, Safari 16.4+, Firefox 128+). The rim highlight uses a nine-slice mask where `-webkit-mask-box-image` is supported; elsewhere a full mask is generated per size, with an inset shadow until it is ready.

## License

[Apache-2.0](LICENSE)
