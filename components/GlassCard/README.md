# GlassCard

承载一组相关内容的磨砂卡片。

- 使用方提供：`children`（正文）；可选 `title`、`footer`（按钮或 Chip）、`tone`。没有 `title` 时传 `aria-label`。
- 圆角 `radius-lg`，内边距 `space-4`，卡片之间间距 `space-6`。卡片头部的图标按钮用 `IconButton` 的 `sm` 尺寸。
- 默认 `tone` 为 `frost`。带色调的卡片只用于需要用户注意的提示，一屏不超过一张。
- 卡片内不再嵌套卡片。
