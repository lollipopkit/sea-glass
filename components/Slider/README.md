# Slider

在一个连续范围内选择数值的滑块。

- 使用方提供：`label`（或无标签时的 `aria-label`）；受控时传 `value` 与 `onChange`，非受控时可传 `defaultValue`；可选 `min`（默认 0）、`max`（默认 100）、`step`（默认 1）、`tone`（默认 `cobalt`）、`format`（数值显示格式）、`showValue`（默认显示数值）、`disabled`。
- 轨道使用 `*-fill`，已选部分使用 `*-ink`，与 `Meter` 一致。滑块为 `*-ink` 色的圆形色块，底部偏亮，下方有投影；它与页面背景、轨道的对比度均不低于 3:1。
- 基于原生 `input type=range`：支持方向键、Page Up/Down、Home/End，读屏软件读出 `format` 后的数值。
- 键盘聚焦时滑块外显示同色调细环与柔光，带过渡；按下时滑块横向拉宽、纵向压扁（118% × 86%），松开后以带回弹的曲线恢复。
- 数值显示在右侧，使用等宽数字；需要单位时通过 `format` 加上，例如 `v => v + '%'`。
