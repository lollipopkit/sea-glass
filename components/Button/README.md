# Button

全圆角的磨砂色块按钮，用于触发一个操作。

- 使用方提供：`children`（动词开头的短标签）、`onClick`；可选 `tone`、`size`（`sm` 36px / `md` 48px / `lg` 64px / `xl` 72px）、`icon`、`filled`（实心图标）。
- 只有图标、没有 `children` 时必须传 `label`（无障碍名称），按钮宽度按尺寸固定：`sm` 56px、`md` 80px、`lg` 120px、`xl` 180px。
- `xl` 用于一个界面中唯一的大面积操作，例如挂断通话：`tone="coral"`、`icon="call-end"`、`filled`，宽 180px、高 72px（按参考图测量）。
- 默认 `tone` 为 `frost`，用于次要操作。每个视图只有一个主要操作使用 `cobalt`；`lilac` 用于创作类入口；`coral` 只用于删除等危险操作。
- 文字使用 `label` 字号，颜色为该色调的 `*-ink`，不要改为白色。
- 不要在按钮外再加描边；与背景的区分依靠 `shadow-float` 投影和文字本身。
- 同一行按钮间距 `space-4`。禁用状态使用 `opacity-disabled`，并保留文字。
