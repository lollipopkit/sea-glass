# Icon

24px 网格、1.9px 圆头线条的界面图标，颜色跟随 `currentColor`。

- 使用方提供：`name`。通用：`plus` `close` `search` `mic` `wave` `image` `chevron` `chevron-down` `link` `refresh` `list` `grid` `globe` `more` `settings`；可选 `size`（默认 22）、`label`。
- 没有 `label` 时图标对读屏软件隐藏，此时图标旁必须有文字，或其父级按钮有无障碍名称。
- 需要用 `<img>` 引用的场合，使用 `assets/Icons/` 中的同名 SVG 文件；目前只有 `plus` `close` `search` `mic` `wave` `image` 有 SVG 文件。

- 新增：`share` `comment` `download` `edit` `more-vert` `check`。
- `filled`：`share`、`comment`、`edit`、`image` 有实心版本，用于工具栏等需要更醒目的位置；`Toolbar` 默认使用实心版本。
