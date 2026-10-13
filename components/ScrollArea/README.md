# ScrollArea

带 Sea Glass 滚动条的可滚动区域。

- 使用方提供：`children`、`aria-label`（区域名称）；可选 `maxHeight` 或 `height`（数字按 px）、`tone`（滚动条色调，默认跟随所在色块，否则为中性灰）、`style`、`className`。
- 滚动条：透明轨道，滑块为距边缘 4px 的胶囊，颜色为 `*-fill` 与 `*-ink` 的混合，底部带 `*-glow` 亮边；悬停时变宽、变深，拖动时更深。没有箭头按钮。
- 区域默认可通过 Tab 聚焦，聚焦后可用方向键、Page Up/Down 滚动；聚焦时显示与其他控件相同的色调细环和柔光。
- 只需要滚动条样式时，给任意可滚动元素加类名 `sg-scroll`。Firefox 使用标准属性 `scrollbar-width: thin` 与 `scrollbar-color`，外观为同色的细滚动条。
- `overscroll-behavior: contain`：滚动到头时不带动外层页面。
