# PromptBar

带附件、语音输入和语音对话入口的单行输入栏。

- 使用方提供：`placeholder`、`onSubmit`；可选 `onAttach`、`onMic`、`onVoice`，以及三个按钮的无障碍标签 `attachLabel`、`micLabel`、`voiceLabel`。受控时传 `value` 与 `onChange`。
- 布局固定：左侧 `plus`（`bare`），中间输入框，右侧 `mic`（`bare`）和 `wave`（`inset`）。高度 `space-16`。
- 默认 `tone` 为 `cobalt`。输入栏通常固定在页面底部，此时外层容器使用 `blur-glass` 作为 backdrop-filter 模糊半径。
- 按回车提交；内容为空时不提交。
- 获得焦点时：顶部不显示边框（顶部暗线也隐去），两侧和底部出现同色调中间色细环（侧边约 1px、底部约 2.5px），外侧扩散一圈同色调柔光，底色向 `*-hi` 提亮，约 0.3 秒过渡。
