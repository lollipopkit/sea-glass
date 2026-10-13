# Sea Glass

以磨砂玻璃质感为特征的界面设计系统：柔和的色块、全圆角控件、表面碎片状颗粒、底部高光与同形投影，以及跟随鼠标的悬停光和按压形变。

## 内容

| 目录 | 说明 |
| --- | --- |
| `tokens/tokens.json` | 设计令牌：颜色（日间、夜间两套主题）、字体、间距、圆角、投影、不透明度 |
| `tokens/tokens.css` | 由 `tokens.json` 生成的 CSS 自定义属性；默认日间，`data-theme="dark"` 或系统深色设置时为夜间 |
| `components/bundle.js` | 全部 React 组件（UMD：作为经典脚本时挂在 `window.SeaGlass` 上，不需要构建；也可作为 CommonJS 模块引入） |
| `components/index.mjs` | npm 包的 ESM 入口 |
| `components/bundle.css` | 组件样式、玻璃质感与全部可调参数 |
| `components/index.d.ts` | TypeScript 类型声明 |
| `components/<组件>/` | 每个组件的说明（`README.md`）和预览片段（`preview.html`） |
| `docs/design.md` | 设计说明：原则、颜色、字体、质感、可调参数、性能、交互状态 |
| `assets/icons/` | 部分图标的 SVG 文件 |
| `site/` | 单文件组件参考页（`index.html`，中英双语、主题切换、参数面板）及其源码和构建脚本 |
| `examples/minimal.html` | 最小使用示例 |

## 使用

### npm

```sh
npm i sea-glass
```

```js
import 'sea-glass/tokens.css';
import 'sea-glass/style.css';
import { Button, SegmentedNav, Toolbar, setParams } from 'sea-glass';
```

需要 React 18 及以上版本（peer dependency）。字体 Google Sans Flex 需自行引入（见下方 `<link>`）。同时提供 ESM、CommonJS 和 TypeScript 类型，可在服务端渲染时加载；悬停光、按压形变和颗粒只在浏览器中启动。

### `<script>` 标签

依赖 React 18 与 ReactDOM 18（UMD 版本）。按以下顺序加载：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,400..700&display=swap">
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>
```

```js
const { Button, SegmentedNav, Toolbar } = window.SeaGlass;
```

组件：Button、IconButton、SegmentedNav、PromptBar、Chip、GlassCard、Meter、Sparkline、Slider、ScrollArea、Toolbar、Fab、SwatchPicker、ToggleButton、Icon。各组件的属性见 `components/<组件>/README.md` 和 `components/index.d.ts`，完整示例见组件参考页。

任意元素加类名 `sg-glass` 和 `sg-tone-<色调>`（seafoam、aqua、cobalt、lilac、coral、amber、frost）即可获得玻璃质感。

## 可调参数

玻璃质感的各项效果（颗粒、中部色带、高光、投影）都是 CSS 自定义属性，可写在 `:root`、任意元素或单个组件上，也可在脚本中调用：

```js
SeaGlass.setParams({ bandStrength: 50, fleckDark: 14 });
SeaGlass.resetParams();
```

参数列表见 `docs/design.md` 的“可调参数”一节，或 `SeaGlass.params`。

## 组件参考页

`site/index.html` 是不依赖构建的单文件页面，可直接用浏览器打开，也可用 GitHub Pages 发布 `site` 目录。修改 `tokens/tokens.json`、`components/bundle.*` 或 `site/app.js` 后，在仓库根目录运行：

```sh
python3 site/build.py
```

该脚本同时重新生成 `tokens/tokens.css`。

## 浏览器支持

需要支持 CSS `color-mix()`、`@property` 和 `:has()` 的浏览器（Chrome、Edge 111 以上，Safari 16.4 以上，Firefox 128 以上）。边缘高光在支持 `-webkit-mask-box-image` 的浏览器中使用九宫格遮罩，其他浏览器按尺寸生成整张遮罩，生成前使用内阴影。
