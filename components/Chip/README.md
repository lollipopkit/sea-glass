# Chip

一到两个词的状态或分类标签。

- 使用方提供：`children`；可选 `tone`、`icon`。传入 `onClick` 时渲染为可切换的筛选按钮，`selected` 控制选中状态（选中时使用 `*-hi` 底色）。
- 状态含义固定：`seafoam` 完成或在线，`amber` 待处理或警告，`coral` 失败或危险，`aqua` 信息。状态必须有文字说明，不能只靠颜色区分。
- 使用 `caption` 字号，高度 28px，投影为 `shadow-rest`。
