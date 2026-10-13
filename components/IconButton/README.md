# IconButton

只有图标或单个字母的圆形按钮。

- 使用方提供：`label`（必填，作为无障碍名称和悬停提示）、`icon` 或 `monogram`；可选 `tone`、`size`（`sm` 36px / `md` 48px / `lg` 96px）。`sm` 用于卡片头部、列表行等紧凑位置。
- `variant`：`glass`（默认，独立浮在页面上的圆形色块）、`bare`（放在胶囊色块内部，无背景）、`inset`（放在胶囊色块内部，使用 `*-hi` 高亮底色，表示该组内最主要的操作）。
- `bare` 和 `inset` 的 `tone` 必须与所在色块一致。
- `monogram` 只放一个字母，用于账户头像；不要用于品牌标志。
