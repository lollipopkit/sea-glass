(function () {
  var R = React, h = R.createElement, S = window.SeaGlass;
  var TONES = S.tones;
  var LANGS = [{ id: 'zh', label: '中文', html: 'zh-CN' }, { id: 'en', label: 'English', html: 'en' }];
  var LangCtx = R.createContext('zh');
  function useL() { var lang = R.useContext(LangCtx); return function (x) { return x && typeof x === 'object' && !Array.isArray(x) && (x.zh != null || x.en != null) ? (x[lang] != null ? x[lang] : x.en) : x; }; }

  var UI = {
    eyebrow: { zh: 'Sea Glass · 组件', en: 'Sea Glass · Components' },
    title: { zh: 'Sea Glass 组件', en: 'Sea Glass components' },
    lede: { zh: '15 个 React 组件，全部以 window.SeaGlass 暴露。色块为磨砂质感：颜色饱和、表面有细小的碎片状颗粒、底部偏亮、下方有同形投影。每个色块只用一个色调的四个颜色：fill 作底色，hi 作选中高亮，glow 作底部高光，ink 作文字。所有色块都有跟随鼠标的悬停光、按下光和按下位置相关的果冻形变。下方示例都可以直接操作，色调可切换。',
            en: 'Fifteen React components, all exposed on window.SeaGlass. Surfaces are frosted: saturated color, fine flecks, a lighter lower quarter and a same-shape shadow below. Each surface uses the four colors of one tone: fill for the base, hi for selection, glow for the lower highlight, ink for text. Every surface has a pointer-following hover light, a press light and a jelly squash that depends on where it is pressed. Every example below is live, and its tone can be switched.' },
    theme: { zh: '主题', en: 'Theme' }, language: { zh: '语言', en: 'Language' },
    system: { zh: '系统', en: 'System' }, day: { zh: '日间', en: 'Day' }, night: { zh: '夜间', en: 'Night' },
    toc: { zh: '组件目录', en: 'Components' }, params: { zh: '参数', en: 'Parameters' }, paramsLede: { zh: '玻璃质感的全部可调参数。每一项都是 CSS 自定义属性，可以写在 :root 上作用于整页，也可以写在任意元素或单个组件上；颗粒参数作用于整页。也可以在脚本中调用 SeaGlass.setParams({ bandStrength: 50 })。调整结果保存在本浏览器中，下方的 CSS 可直接复制使用。', en: 'Every adjustable parameter of the glass. Each is a CSS custom property: set it on :root for the whole page, or on any element or single component; grain settings apply to the whole page. From script, call SeaGlass.setParams({ bandStrength: 50 }). Your settings are kept in this browser, and the CSS below can be copied as is.' }, reset: { zh: '恢复默认', en: 'Reset all' }, copy: { zh: '复制 CSS', en: 'Copy CSS' }, copied: { zh: '已复制', en: 'Copied' }, noChange: { zh: '/* 与默认值相同，无需覆盖 */', en: '/* Same as the defaults; nothing to override */' }, grain: { zh: '颗粒强度', en: 'Grain' }, tones: { zh: '色调', en: 'Tones' }, basics: { zh: '基础', en: 'Foundations' },
    tonesLede: { zh: '组件的 tone 属性取以下七个值之一。每个色调的 ink 在 fill 与 hi 上的对比度均不低于 5.2:1。', en: 'A component’s tone prop takes one of these seven values. In every tone, ink reaches at least 5.2:1 contrast on both fill and hi.' },
    toneGroup: { zh: '色调', en: 'tone' },
    props: { zh: 'Props', en: 'Props' }, rules: { zh: '规则', en: 'Guidelines' },
    cols: { zh: ['属性', '类型', '默认值', '说明'], en: ['Prop', 'Type', 'Default', 'Description'] },
    foot: { zh: '使用方式：先加载 React 18 与 ReactDOM 18，再加载 tokens.css 与 components/bundle.css，最后加载 components/bundle.js。字体 Google Sans Flex 来自 Google Fonts。界面文字由使用方传入，组件本身不包含固定文案，只有 PromptBar 三个按钮的无障碍名称有英文默认值。',
           en: 'To use: load React 18 and ReactDOM 18, then tokens.css and components/bundle.css, then components/bundle.js. The Google Sans Flex font comes from Google Fonts. All visible text is passed in by the consumer; the components contain no fixed copy except the English default accessible names of the three PromptBar buttons.' }
  };
  var TONE_NOTE = {
    cobalt: { zh: '主要操作', en: 'Primary actions' }, lilac: { zh: '导航、创作', en: 'Navigation, creation' }, seafoam: { zh: '完成、在线', en: 'Done, online' },
    amber: { zh: '警告、待处理', en: 'Warning, pending' }, coral: { zh: '失败、危险', en: 'Failed, destructive' }, aqua: { zh: '信息', en: 'Information' }, frost: { zh: '默认、次要', en: 'Default, secondary' }
  };
  var REQ = { zh: '必填', en: 'required' };
  var PGROUPS = [
    { id: 'grain', name: { zh: '颗粒', en: 'Grain' }, note: { zh: '作用于整页；调整后重新生成颗粒图块。', en: 'Applies to the whole page; the grain tiles are redrawn.' } },
    { id: 'band', name: { zh: '中部色带', en: 'Middle band' }, note: { zh: '中部较深的横向色带与两处随机位置的深色斑块。', en: 'The deeper band across the middle and two deeper spots at random positions.' } },
    { id: 'light', name: { zh: '高光', en: 'Highlights' }, note: { zh: '底部高光、沿轮廓的边缘光、顶部亮带与暗线。', en: 'Lower highlight, rim along the outline, top light band and top line.' } },
    { id: 'shadow', name: { zh: '投影', en: 'Shadow' }, note: { zh: '倍数以 --sg-rim（约为控件高度的四分之一）为单位。', en: 'Multipliers are of --sg-rim, about a quarter of the control height.' } }
  ];
  var PLABEL = {
    grain: { zh: '颗粒强度', en: 'Grain strength' }, fleckDark: { zh: '暗颗粒密度（每 100 平方像素）', en: 'Dark flecks per 100 px²' }, fleckLight: { zh: '亮颗粒密度（每 100 平方像素）', en: 'Light flecks per 100 px²' },
    fleckSize: { zh: '颗粒大小', en: 'Fleck size' }, fleckStretch: { zh: '颗粒拉伸', en: 'Fleck stretch' }, fleckDarkAlpha: { zh: '暗颗粒强度', en: 'Dark fleck strength' }, fleckLightAlpha: { zh: '亮颗粒强度', en: 'Light fleck strength' },
    grainReach: { zh: '投影区颗粒范围', en: 'Grain below the shape' },
    bandY: { zh: '色带位置（距顶部）', en: 'Band position from top' }, bandSpread: { zh: '色带半高', en: 'Band half height' }, bandStrength: { zh: '色带强度', en: 'Band strength' }, bandDepth: { zh: '色带深度（*-ink 占比）', en: 'Band depth (share of *-ink)' },
    spotStrength: { zh: '斑块强度', en: 'Spot strength' }, spotWidth: { zh: '斑块半宽', en: 'Spot half width' },
    glowStart: { zh: '底部高光起点（距顶部）', en: 'Lower highlight start from top' }, glowMid: { zh: '底部高光强度', en: 'Lower highlight strength' }, edgeGlow: { zh: '边缘光强度', en: 'Rim light strength' },
    highlightWidth: { zh: '高光宽度', en: 'Highlight width' }, topLight: { zh: '顶部亮带', en: 'Top light band' }, topLine: { zh: '顶部暗线', en: 'Top line' },
    shadowY: { zh: '投影偏移', en: 'Shadow offset' }, shadowBlur: { zh: '投影模糊', en: 'Shadow blur' }, castLight: { zh: '透射光中的色调占比', en: 'Tone share in the cast light' }
  };
  var G = {
    act: { zh: '操作', en: 'Actions' }, nav: { zh: '导航', en: 'Navigation' }, input: { zh: '输入', en: 'Input' }, status: { zh: '状态', en: 'Status' },
    box: { zh: '容器', en: 'Containers' }, data: { zh: '数据', en: 'Data' }, media: { zh: '媒体', en: 'Media' }
  };

  var DOCS = [
    { id: 'button', name: 'Button', group: G.act, tone: 'cobalt',
      summary: { zh: '全圆角的磨砂色块按钮，用于触发一个操作。', en: 'A fully rounded frosted button that triggers one action.' },
      props: [['children', 'ReactNode', '—', { zh: '按钮文字，动词开头的短标签', en: 'Label: a short phrase starting with a verb' }], ['tone', 'Tone', "'frost'", { zh: '色调', en: 'Tone' }], ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", { zh: '高度 36 / 48 / 64 / 72px', en: 'Height 36 / 48 / 64 / 72px' }], ['label', 'string', { zh: '仅图标时必填', en: 'required when icon-only' }, { zh: '无障碍名称；仅图标时按钮宽度按尺寸固定（xl 为 180px）', en: 'Accessible name; an icon-only button has a fixed width per size (180px at xl)' }], ['filled', 'boolean', 'false', { zh: '实心图标', en: 'Solid icon' }], ['icon', 'IconName', '—', { zh: '标签前的图标', en: 'Icon before the label' }], ['onClick', '() => void', '—', { zh: '点击回调', en: 'Click handler' }], ['disabled', 'boolean', 'false', { zh: '禁用，不透明度 opacity-disabled', en: 'Disabled, at opacity-disabled' }]],
      rules: { zh: ['每个视图只有一个主要操作使用 cobalt；coral 只用于删除等危险操作。', '文字颜色为该色调的 *-ink，不改为白色。', '不加描边；与背景的区分依靠投影和文字。', '同一行按钮间距 space-4。'],
               en: ['Only one primary action per view uses cobalt; coral is only for destructive actions such as delete.', 'Text uses the tone’s *-ink, never white.', 'No outline: the shadow and the label set the button apart from the background.', 'Buttons in a row are space-4 apart.'] },
      demo: function (t, L) { return [h(S.Button, { key: 1, tone: t }, L({ zh: '继续', en: 'Continue' })), h(S.Button, { key: 2, tone: t, icon: 'plus' }, L({ zh: '新建合集', en: 'New collection' })), h(S.Button, { key: 3, tone: t, size: 'sm' }, L({ zh: '小号', en: 'Small' })), h(S.Button, { key: 4, tone: t, size: 'lg', icon: 'image' }, L({ zh: '创建', en: 'Create' })), h(S.Button, { key: 5, tone: t, disabled: true }, L({ zh: '已禁用', en: 'Disabled' })), h(S.Button, { key: 6, tone: t, size: 'xl', icon: 'call-end', filled: true, label: L({ zh: '挂断', en: 'End call' }) })]; } },
    { id: 'iconbutton', name: 'IconButton', group: G.act, tone: 'frost',
      summary: { zh: '只有图标或单个字母的圆形按钮。', en: 'A round button holding only an icon or a single letter.' },
      props: [['label', 'string', REQ, { zh: '无障碍名称与悬停提示', en: 'Accessible name and tooltip' }], ['icon', 'IconName', "'plus'", { zh: '图标', en: 'Icon' }], ['monogram', 'string', '—', { zh: '单个字母，用于账户头像', en: 'One letter, for an account avatar' }], ['tone', 'Tone', "'frost'", { zh: '色调', en: 'Tone' }], ['size', "'sm' | 'md' | 'lg'", "'md'", '36 / 48 / 96px'], ['variant', "'glass' | 'bare' | 'inset'", "'glass'", { zh: '独立色块 / 色块内无底色 / 色块内高亮', en: 'Standalone / inside a surface, no fill / inside a surface, highlighted' }]],
      rules: { zh: ['bare 与 inset 的 tone 必须与所在色块一致。', 'sm 用于卡片头部、列表行等紧凑位置。', 'monogram 只放一个字母，不用于品牌标志。'],
               en: ['bare and inset must use the tone of the surface they sit on.', 'Use sm in compact places such as card headers and list rows.', 'A monogram holds one letter and is never used as a logo.'] },
      demo: function (t, L) { return [h(S.IconButton, { key: 1, tone: t, size: 'lg', monogram: 'S', label: L({ zh: '账户', en: 'Account' }) }), h(S.IconButton, { key: 2, tone: t, icon: 'search', label: L({ zh: '搜索', en: 'Search' }) }), h(S.IconButton, { key: 3, tone: t, size: 'sm', icon: 'close', label: L({ zh: '关闭', en: 'Close' }) }),
        h('div', { key: 4, className: 'sg-glass sg-tone-' + t, style: { display: 'flex', gap: 'var(--space-1)', padding: 'var(--space-2)', borderRadius: 'var(--radius-pill)' } }, h(S.IconButton, { variant: 'bare', tone: t, icon: 'mic', label: L({ zh: '语音输入', en: 'Dictate' }) }), h(S.IconButton, { variant: 'inset', tone: t, icon: 'wave', label: L({ zh: '语音对话', en: 'Voice conversation' }) }))]; } },
    { id: 'toolbar', name: 'Toolbar', group: G.act, tone: 'lilac',
      summary: { zh: '一组图标操作按钮，排在一个玻璃胶囊里。', en: 'A row of icon actions in one glass pill.' },
      props: [['items', '{ icon, label, onClick? }[]', REQ, { zh: '操作；label 为无障碍名称', en: 'Actions; label is the accessible name' }], ['aria-label', 'string', REQ, { zh: '工具栏名称', en: 'Name of the toolbar' }], ['tone', 'Tone', "'lilac'", { zh: '色调', en: 'Tone' }], ['filled', 'boolean', 'true', { zh: '使用实心图标', en: 'Use solid icons' }], ['menuItems', '{ icon, label, onClick? }[]', '—', { zh: '只在菜单中出现的操作；由最后的“更多”按钮打开', en: 'Actions shown only in the menu, opened by the trailing More button' }], ['closeLabel', 'string', "'Close'", { zh: '菜单打开时“更多”按钮的名称', en: 'Name of the More button while the menu is open' }]],
      rules: { zh: ['高 60px，图标 24px；share、comment、edit、image 默认为实心。', '只占一个 Tab 位置，方向键在按钮之间移动。', '常与一个 Fab 并排，两者等高。', '点击“更多”：胶囊展开为竖向面板，所有按钮移动到列表中并显示文字，menuItems 从“更多”按钮处展开；Esc、点击外部或选择一项后收回。'], en: ['60px tall with 24px icons; share, comment, edit and image are solid by default.', 'One Tab stop; arrow keys move between the buttons.', 'Often paired with a Fab of the same height.', 'More opens a menu: the pill grows into a vertical panel, every button moves into the list and shows its label, and menuItems come out of the More button; Esc, a click outside or choosing an item closes it.'] },
      demo: function (t, L) { return [h(S.Toolbar, { key: 1, tone: t, 'aria-label': L({ zh: '照片操作', en: 'Photo actions' }), items: [{ icon: 'share', label: L({ zh: '分享', en: 'Share' }) }, { icon: 'comment', label: L({ zh: '评论', en: 'Comment' }) }, { icon: 'download', label: L({ zh: '下载', en: 'Download' }) }, { icon: 'edit', label: L({ zh: '编辑', en: 'Edit' }) }, { icon: 'more-vert', label: L({ zh: '更多', en: 'More' }) }], closeLabel: L({ zh: '关闭', en: 'Close' }), menuItems: [{ icon: 'link', label: L({ zh: '复制链接', en: 'Copy link' }) }, { icon: 'folder', label: L({ zh: '移到相册', en: 'Move to album' }) }, { icon: 'image', label: L({ zh: '设为壁纸', en: 'Use as wallpaper' }) }, { icon: 'settings', label: L({ zh: '详细信息', en: 'Details' }) }] }), h(S.Fab, { key: 2, tone: 'coral', label: L({ zh: '新建', en: 'New' }) })]; } },
    { id: 'fab', name: 'Fab', group: G.act, tone: 'aqua',
      summary: { zh: '页面上最主要操作的悬浮按钮，大圆角方形，可带文字。', en: 'The floating button for the main action, a rounded square that can carry a label.' },
      props: [['label', 'string', { zh: '仅图标时必填', en: 'required when icon-only' }, { zh: '无障碍名称', en: 'Accessible name' }], ['children', 'ReactNode', '—', { zh: '传入后成为扩展形态', en: 'Makes it the extended form' }], ['icon', 'IconName', "'plus'", { zh: '图标', en: 'Icon' }], ['tone', 'Tone', { zh: 'coral / 扩展 aqua', en: 'coral / extended aqua' }, { zh: '色调', en: 'Tone' }], ['size', "'md' | 'lg'", "'md'", { zh: '56px / 96px（扩展 56 / 72px）', en: '56px / 96px (extended 56 / 72px)' }]],
      rules: { zh: ['圆角约为边长的 28%：60px 用 17px，96px 用 28px。', '每屏只放一个 Fab。'], en: ['Corner radius is about 28% of the side: 17px at 60px, 28px at 96px.', 'One Fab per screen.'] },
      demo: function (t, L) { return [h(S.Fab, { key: 1, tone: t, label: L({ zh: '新建', en: 'New' }) }), h(S.Fab, { key: 2, tone: t, label: L({ zh: '新建', en: 'New' }), size: 'lg' }), h(S.Fab, { key: 3, tone: t, icon: 'edit' }, L({ zh: '写邮件', en: 'Compose' })), h(S.Fab, { key: 4, tone: t, icon: 'edit', size: 'lg' }, L({ zh: '写邮件', en: 'Compose' }))]; } },
    { id: 'swatchpicker', name: 'SwatchPicker', group: G.input, tone: null,
      summary: { zh: '从一组任意颜色中选一个的圆形色块选择器。', en: 'A round swatch picker for choosing one of any set of colours.' },
      props: [['options', '{ id, color, label }[]', REQ, { zh: '颜色选项，color 为任意 CSS 颜色', en: 'Options; color is any CSS colour' }], ['aria-label', 'string', REQ, { zh: '选择器名称', en: 'Name of the picker' }], ['value / onChange', 'string / (id) => void', '—', { zh: '受控选中项', en: 'Controlled selection' }], ['size', "'md' | 'lg'", "'md'", '48px / 96px']],
      rules: { zh: ['质感由给定颜色推导：高光、底部暖白高光、勾选与选中环都来自同一颜色。', '选中项显示勾选符号和一圈细环。', '颜色名称写在 label 里，读屏软件读出。'], en: ['The glass is derived from the given colour: highlight, warm lower glow, check and ring all come from it.', 'The chosen swatch shows a check and a thin ring.', 'Put the colour name in label so screen readers announce it.'] },
      demo: function (t, L) { return [h(S.SwatchPicker, { key: 1, size: 'lg', 'aria-label': L({ zh: '强调色', en: 'Accent' }), defaultValue: 'b', options: [{ id: 'a', color: '#fde3cb', label: L({ zh: '奶油', en: 'Cream' }) }, { id: 'b', color: '#fcd4b8', label: L({ zh: '桃色', en: 'Peach' }) }, { id: 'c', color: '#fbbd98', label: L({ zh: '杏色', en: 'Apricot' }) }] }), h(S.SwatchPicker, { key: 2, 'aria-label': L({ zh: '色调', en: 'Tone' }), defaultValue: 'd', options: [{ id: 'd', color: '#bccaf6', label: L({ zh: '长春花蓝', en: 'Periwinkle' }) }, { id: 'e', color: '#b5e6cd', label: L({ zh: '薄荷', en: 'Mint' }) }, { id: 'f', color: '#eebcf3', label: L({ zh: '丁香', en: 'Lilac' }) }, { id: 'g', color: '#f5d38e', label: L({ zh: '琥珀', en: 'Amber' }) }] })]; } },
    { id: 'togglebutton', name: 'ToggleButton', group: G.act, tone: 'aqua',
      summary: { zh: '带下方文字标签的图标切换按钮。关闭时为平面胶囊，开启时变为玻璃圆角方形。', en: 'An icon toggle with its label below. Off, it is a flat pill; on, it becomes a glass rounded square.' },
      props: [['icon', 'IconName', REQ, { zh: '图标', en: 'Icon' }], ['label', 'string', REQ, { zh: '下方文字，同时作为无障碍名称', en: 'Text below, also the accessible name' }], ['pressed', 'boolean', '—', { zh: '受控时的开关状态', en: 'State when controlled' }], ['defaultPressed', 'boolean', 'false', { zh: '非受控时的初始状态', en: 'Initial state when uncontrolled' }], ['onChange', '(pressed) => void', '—', { zh: '切换回调', en: 'Change handler' }], ['toggle', 'boolean', 'true', { zh: 'false 时作为普通按钮，不切换', en: 'false makes it a plain button that does not toggle' }], ['menuItems', '{ icon?, label, onClick? }[]', '—', { zh: '传入后作为菜单按钮（“更多”），菜单从按钮处展开', en: 'Makes it a menu button (More); the menu grows out of it' }], ['tone', 'Tone', "'aqua'", { zh: '开启时的色调', en: 'Tone when on' }], ['size', "'sm' | 'md'", "'md'", { zh: '按钮 64×48 / 88×68px', en: 'Face 64×48 / 88×68px' }]],
      rules: { zh: ['关闭：surface 底色的平面胶囊，没有颗粒、高光和投影。', '开启：圆角 16px（约为高度的 22%），带颗粒、高光、投影；圆角和颜色一起过渡。', '整排放在比 surface 深的底板上，使关闭状态的胶囊可见。同一排按钮间距 space-2；“更多”传入 menuItems，菜单从按钮处展开。'],
               en: ['Off: a flat pill in surface colour, with no grain, highlight or shadow.', 'On: 16px corners (about 22% of the height) with grain, highlight and shadow; corners and colour change together.', 'Place the row on a panel darker than surface so the off pills stay visible. Buttons in a row are space-2 apart; give More its menuItems and the menu grows out of the button.'] },
      demo: function (t, L) { return [h('div', { key: 1, style: { display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', background: 'color-mix(in oklab, var(--cobalt-fill) 28%, var(--paper))', borderRadius: '28px', padding: 'var(--space-4)' } }, h(S.ToggleButton, { tone: t, icon: 'dialpad', label: L({ zh: '拨号键盘', en: 'Keypad' }) }), h(S.ToggleButton, { tone: t, icon: 'mic', label: L({ zh: '静音', en: 'Mute' }) }), h(S.ToggleButton, { tone: t, icon: 'speaker', label: L({ zh: '扬声器', en: 'Speaker' }), defaultPressed: true }), h(S.ToggleButton, { tone: t, icon: 'more-vert', label: L({ zh: '更多', en: 'More' }), menuItems: [{ icon: 'plus', label: L({ zh: '添加通话', en: 'Add call' }) }, { icon: 'video', label: L({ zh: '视频通话', en: 'Video call' }) }, { icon: 'comment', label: L({ zh: '发送信息', en: 'Send message' }) }, { icon: 'settings', label: L({ zh: '通话设置', en: 'Call settings' }) }] })), h(S.Button, { key: 2, tone: 'coral', size: 'xl', icon: 'call-end', filled: true, label: L({ zh: '挂断', en: 'End call' }) })]; } },
    { id: 'segmentednav', name: 'SegmentedNav', group: G.nav, tone: 'lilac',
      summary: { zh: '在 2 到 4 个同级视图之间切换的胶囊导航栏。', en: 'A pill-shaped bar that switches between two to four sibling views.' },
      props: [['items', '{ id, label, icon? }[]', REQ, { zh: '选项', en: 'Options' }], ['aria-label', 'string', REQ, { zh: '导航名称', en: 'Name of the navigation' }], ['value', 'string', '—', { zh: '受控时的选中项', en: 'Selected item when controlled' }], ['defaultValue', 'string', { zh: '第一项', en: 'first item' }, { zh: '非受控时的初始选中项', en: 'Initial item when uncontrolled' }], ['onChange', '(id) => void', '—', { zh: '切换回调', en: 'Change handler' }], ['tone', 'Tone', "'lilac'", { zh: '色调', en: 'Tone' }], ['size', "'md' | 'lg'", "'md'", { zh: '导航栏高 48 / 66px', en: 'Bar height 48 / 66px' }], ['filled', 'boolean', 'true', { zh: '选中项使用实心图标', en: 'Solid icon on the selected item' }]],
      rules: { zh: ['选中项显示为内嵌的半透明 *-hi 高亮胶囊，并显示图标；未选中项只显示文字。', '切换时高亮胶囊滑向新选项：前沿先到、后沿跟上，胶囊先拉长再收拢，约 0.3 秒；图标同时展开或收起，文字平滑移动。', '外沿到选项 5px；选项高 38px，左右 space-4。lg：外沿 8px，选项高 50px，文字 20px。', '支持左右方向键切换。超过 4 项时改用列表或菜单。'],
               en: ['The selected item is an inset half-transparent *-hi pill and shows its icon; other items show text only.', 'On change the pill slides to the new item: the leading edge arrives first and the trailing edge follows, so it stretches and then settles in about 0.3 s; icons open and close at the same time and labels slide instead of jumping.', '5px from the edge to the items; items are 38px tall with space-4 on each side. lg: 8px edge, 50px items, 20px text.', 'Left and right arrow keys switch items. Use a list or menu for more than four.'] },
      demo: function (t, L) { return [h(S.SegmentedNav, { key: t, 'aria-label': L({ zh: '图库', en: 'Library' }), tone: t, items: [{ id: 'photos', label: L({ zh: '照片', en: 'Photos' }), icon: 'image' }, { id: 'collections', label: L({ zh: '合集', en: 'Collections' }), icon: 'folder' }, { id: 'create', label: L({ zh: '创作', en: 'Create' }), icon: 'plus' }] }), h(S.SegmentedNav, { key: t + 'lg', size: 'lg', 'aria-label': L({ zh: '应用', en: 'Apps' }), tone: t, items: [{ id: 'mail', label: L({ zh: '邮件', en: 'Mail' }), icon: 'mail' }, { id: 'meet', label: L({ zh: '会议', en: 'Meet' }), icon: 'video' }] })]; } },
    { id: 'promptbar', name: 'PromptBar', group: G.input, tone: 'cobalt', wide: true,
      summary: { zh: '带附件、语音输入和语音对话入口的单行输入栏。', en: 'A single-line input with attachment, dictation and voice conversation buttons.' },
      props: [['placeholder', 'string', "'Ask anything'", { zh: '占位文字，也是无障碍名称', en: 'Placeholder, also the accessible name' }], ['onSubmit', '(value) => void', '—', { zh: '回车提交，内容为空时不触发', en: 'Called on Enter; not called when empty' }], ['onAttach / onMic / onVoice', '() => void', '—', { zh: '三个按钮的回调', en: 'Handlers for the three buttons' }], ['attachLabel / micLabel / voiceLabel', 'string', { zh: '英文默认值', en: 'English defaults' }, { zh: '三个按钮的无障碍名称，非英文界面必须传入', en: 'Accessible names of the three buttons; pass them for any non-English UI' }], ['value / onChange', 'string / (v) => void', '—', { zh: '受控输入', en: 'Controlled input' }], ['tone', 'Tone', "'cobalt'", { zh: '色调', en: 'Tone' }]],
      rules: { zh: ['布局固定：左侧 plus，中间输入框，右侧 mic 与 wave。高度 space-16。', '固定在页面底部时，外层使用 blur-glass 作为背景模糊半径。', '获得焦点时边缘出现 *-ink 细环和同色调柔光，底色提亮，约 0.3 秒过渡。'],
               en: ['Fixed layout: plus on the left, the input in the middle, mic and wave on the right. Height space-16.', 'When pinned to the bottom of the page, the wrapper blurs what is behind it by blur-glass.', 'On focus a thin *-ink ring and a soft halo of the tone ease in, and the bar lightens.'] },
      demo: function (t, L) { return [h('div', { key: 1, style: { width: '100%', maxWidth: '560px' } }, h(S.PromptBar, { tone: t, placeholder: L({ zh: '有问题，尽管问', en: 'Ask anything' }), attachLabel: L({ zh: '添加附件', en: 'Add attachment' }), micLabel: L({ zh: '语音输入', en: 'Dictate' }), voiceLabel: L({ zh: '开始语音对话', en: 'Start voice conversation' }) }))]; } },
    { id: 'slider', name: 'Slider', group: G.input, tone: 'cobalt', wide: true,
      summary: { zh: '在一个连续范围内选择数值的滑块。', en: 'A slider for picking a value in a continuous range.' },
      props: [['label / aria-label', 'string', REQ, { zh: '名称；没有可见标签时传 aria-label', en: 'Name; pass aria-label when there is no visible label' }], ['value / onChange', 'number / (v) => void', '—', { zh: '受控数值', en: 'Controlled value' }], ['defaultValue', 'number', 'min', { zh: '非受控时的初始值', en: 'Initial value when uncontrolled' }], ['min / max / step', 'number', '0 / 100 / 1', { zh: '范围与步长', en: 'Range and step' }], ['format', '(v) => string', 'String', { zh: '数值显示格式，也是读屏软件读出的内容', en: 'Value format, also what screen readers announce' }], ['showValue', 'boolean', 'true', { zh: '是否在右侧显示数值', en: 'Show the value on the right' }], ['tone', 'Tone', "'cobalt'", { zh: '色调', en: 'Tone' }], ['disabled', 'boolean', 'false', { zh: '禁用', en: 'Disabled' }]],
      rules: { zh: ['轨道 *-fill，已选部分 *-ink，与 Meter 一致。', '滑块为 *-ink 色圆形色块，与页面背景和轨道的对比度均不低于 3:1。', '支持方向键、Page Up/Down、Home/End；键盘聚焦时滑块外出现细环和柔光。'],
               en: ['Track in *-fill, the selected part in *-ink, as in Meter.', 'The thumb is a round *-ink bead, at least 3:1 against both the page and the track.', 'Arrow keys, Page Up/Down and Home/End work; keyboard focus adds a thin ring and a soft halo to the thumb.'] },
      demo: function (t, L) { return [h('div', { key: 1, className: 'stack' }, h(S.Slider, { tone: t, label: L({ zh: '音量', en: 'Volume' }), defaultValue: 64, format: function (v) { return v + '%'; } }), h(S.Slider, { tone: t, label: L({ zh: '亮度', en: 'Brightness' }), defaultValue: 30 }), h(S.Slider, { tone: t, label: L({ zh: '已禁用', en: 'Disabled' }), defaultValue: 50, disabled: true }))]; } },
    { id: 'chip', name: 'Chip', group: G.status, tone: 'seafoam',
      summary: { zh: '一到两个词的状态或分类标签。', en: 'A one- or two-word status or category label.' },
      props: [['children', 'ReactNode', '—', { zh: '标签文字', en: 'Label' }], ['tone', 'Tone', "'frost'", { zh: '色调，状态含义见规则', en: 'Tone; see the guidelines for status meanings' }], ['icon', 'IconName', '—', { zh: '文字前的图标', en: 'Icon before the label' }], ['onClick', '() => void', '—', { zh: '传入后渲染为可切换的筛选按钮', en: 'Renders a toggleable filter button' }], ['selected', 'boolean', '—', { zh: '筛选按钮的选中状态', en: 'Pressed state of the filter' }]],
      rules: { zh: ['seafoam 完成或在线，amber 待处理，coral 失败，aqua 信息。', '状态必须有文字，不能只靠颜色区分。', 'caption 字号，高 28px，投影 shadow-rest。'],
               en: ['seafoam means done or online, amber pending, coral failed, aqua information.', 'Every status carries text; color alone never tells statuses apart.', 'caption text, 28px tall, shadow-rest.'] },
      demo: function (t, L) { return [h(S.Chip, { key: 1, tone: t }, L({ zh: '在线', en: 'Online' })), h(S.Chip, { key: 2, tone: t, icon: 'close' }, L({ zh: '失败', en: 'Failed' })), h(Toggle, { key: 3, tone: t, label: L({ zh: '筛选：2024', en: 'Filter: 2024' }) })]; } },
    { id: 'glasscard', name: 'GlassCard', group: G.box, tone: 'frost',
      summary: { zh: '承载一组相关内容的磨砂卡片。', en: 'A frosted card for one group of related content.' },
      props: [['children', 'ReactNode', '—', { zh: '正文', en: 'Body' }], ['title', 'string', '—', { zh: '卡片标题', en: 'Card title' }], ['footer', 'ReactNode', '—', { zh: '底部按钮或 Chip', en: 'Buttons or chips at the bottom' }], ['tone', 'Tone', "'frost'", { zh: '色调', en: 'Tone' }], ['aria-label', 'string', '—', { zh: '没有 title 时必填', en: 'Required when there is no title' }]],
      rules: { zh: ['圆角 radius-lg，内边距 space-4，卡片间距 space-6。', '带色调的卡片只用于需要注意的提示，一屏不超过一张。', '卡片内不再嵌套卡片。'],
               en: ['radius-lg corners, space-4 padding, space-6 between cards.', 'A tinted card is only for a notice that needs attention, at most one per screen.', 'Never nest a card inside a card.'] },
      demo: function (t, L) { return [h('div', { key: 1, style: { width: '100%', maxWidth: '320px' } }, h(S.GlassCard, { tone: t, title: L({ zh: '存储空间即将用完', en: 'Storage almost full' }), footer: [h(S.Button, { key: 'a', tone: 'cobalt', size: 'sm' }, L({ zh: '管理存储空间', en: 'Manage storage' })), h(S.Chip, { key: 'b', tone: 'amber' }, L({ zh: '已用 94%', en: '94% used' }))] }, L({ zh: '已使用 15 GB 中的 14.2 GB。删除较大的视频，或增加空间。', en: '14.2 GB of 15 GB used. Delete large videos or add space.' })))]; } },
    { id: 'scrollarea', name: 'ScrollArea', group: G.box, tone: 'frost', wide: true,
      summary: { zh: '带 Sea Glass 滚动条的可滚动区域。', en: 'A scrolling region with Sea Glass scrollbars.' },
      props: [['children', 'ReactNode', '—', { zh: '内容', en: 'Content' }], ['aria-label', 'string', REQ, { zh: '区域名称', en: 'Name of the region' }], ['maxHeight / height', 'number | string', '—', { zh: '高度限制，数字按 px', en: 'Height limit; numbers are px' }], ['tone', 'Tone', { zh: '跟随所在色块', en: 'inherits' }, { zh: '滚动条色调', en: 'Scrollbar tone' }]],
      rules: { zh: ['滑块为距边缘 4px 的胶囊，悬停时变宽变深，没有箭头按钮。', '默认可聚焦，可用方向键和 Page Up/Down 滚动。', '只要滚动条样式时，给任意可滚动元素加类名 sg-scroll。'],
               en: ['The thumb is a pill inset 4px from the edge; it widens and darkens on hover. No arrow buttons.', 'Focusable by default, scrollable with the arrow keys and Page Up/Down.', 'For the scrollbar alone, add the class sg-scroll to any scrolling element.'] },
      demo: function (t, L) { var rows = []; for (var i = 1; i <= 24; i++) rows.push(h('div', { key: i, style: { padding: '8px 16px', borderBottom: '1px solid var(--line)' } }, L({ zh: '消息 ', en: 'Message ' }) + i)); return [h('div', { key: 1, style: { width: '100%', maxWidth: '360px' } }, h(S.ScrollArea, { maxHeight: 180, tone: t, 'aria-label': L({ zh: '消息', en: 'Messages' }), style: { background: 'var(--surface)' } }, rows))]; } },
    { id: 'meter', name: 'Meter', group: G.data, tone: 'cobalt', wide: true,
      summary: { zh: '带标签和数值的水平用量条。', en: 'A horizontal usage bar with a label and a value.' },
      props: [['value', 'number', REQ, '0–100'], ['label', 'string', '—', { zh: '指标名称', en: 'Metric name' }], ['icon', 'IconName', '—', { zh: '标签前的图标', en: 'Icon before the label' }], ['tone', 'Tone', "'cobalt'", { zh: '正常状态的色调', en: 'Tone in the normal state' }], ['valueText', 'string', "'xx.x%'", { zh: '替换默认数值文字', en: 'Replaces the default value text' }], ['warnAt / dangerAt', 'number', '80 / 90', { zh: '达到后改为 amber / coral', en: 'Switches to amber / coral at these values' }]],
      rules: { zh: ['轨道 *-fill，进度 *-ink，对比度不低于 5.2:1。', '数值文字始终显示，状态不只靠颜色表达。', '同一指标在同一页面始终使用同一色调。'],
               en: ['Track in *-fill, progress in *-ink, at least 5.2:1 apart.', 'The value text is always shown, so state never relies on color alone.', 'A metric keeps the same tone everywhere on a page.'] },
      demo: function (t, L) { return [h('div', { key: 1, className: 'stack' }, h(S.Meter, { icon: 'image', label: L({ zh: '照片', en: 'Photos' }), value: 32.4, tone: t }), h(S.Meter, { icon: 'folder', label: L({ zh: '文件', en: 'Files' }), value: 83.1, tone: t }), h(S.Meter, { icon: 'globe', label: L({ zh: '配额', en: 'Quota' }), value: 96.4, tone: t }))]; } },
    { id: 'sparkline', name: 'Sparkline', group: G.data, tone: 'aqua', wide: true,
      summary: { zh: '无坐标轴的小型折线图，显示一个指标最近的变化。', en: 'A small line chart without axes that shows how one metric changed recently.' },
      props: [['data', 'number[]', REQ, { zh: '至少 2 个点', en: 'At least two points' }], ['label', 'string', REQ, { zh: '无障碍名称', en: 'Accessible name' }], ['tone', 'Tone', "'cobalt'", { zh: '色调', en: 'Tone' }], ['height', 'number', '64', { zh: '高度 px，宽度填满容器', en: 'Height in px; width fills the container' }], ['max / min', 'number', { zh: '数据最大值 / 0', en: 'data max / 0' }, { zh: '纵轴范围', en: 'Vertical range' }], ['area', 'boolean', 'true', { zh: '面积填充', en: 'Area fill' }]],
      rules: { zh: ['折线 *-ink，2px 圆头；面积 *-fill，单色，不加渐变。', '百分比指标传 max，避免微小波动被放大。', '当前值以大号数字显示在折线上方。'],
               en: ['Line in *-ink, 2px with round caps; area in a flat *-fill.', 'Pass max for percentages so small changes are not blown up.', 'Show the current value as a large number above the line.'] },
      demo: function (t, L) { return [h('div', { key: 1, className: 'stack' }, h(S.Sparkline, { tone: t, max: 3.6, label: L({ zh: '带宽', en: 'Bandwidth' }), data: [1.2,1.4,1.1,1.3,1.2,1.5,1.1,1.2,1.4,1.3,1.1,1.6,1.2,1.3,2.4,1.3,1.4,3.5] }), h(S.Sparkline, { tone: t, area: false, max: 2, height: 48, label: L({ zh: '请求数', en: 'Requests' }), data: [.1,.2,.1,1.8,.1,.2,.1,.3,1.4,.1,.6,.1,1.3,.2,.4,1,.3,.5,1.6,.1] }))]; } },
    { id: 'icon', name: 'Icon', group: G.media, tone: null,
      summary: { zh: '24px 网格、1.9px 圆头线条的界面图标，颜色跟随 currentColor。', en: 'Interface icons on a 24px grid with 1.9px round-capped strokes, colored by currentColor.' },
      props: [['name', 'IconName', REQ, { zh: '图标名称', en: 'Icon name' }], ['size', 'number', '22', { zh: '边长 px', en: 'Size in px' }], ['label', 'string', '—', { zh: '传入后对读屏软件可见', en: 'Makes the icon visible to screen readers' }]],
      rules: { zh: ['没有 label 时图标对读屏软件隐藏，旁边必须有文字或按钮名称。', '图标与文字间距 space-2 到 space-3。', '不使用表情符号作为图标。'],
               en: ['Without a label the icon is hidden from screen readers, so text or a button name must sit beside it.', 'space-2 to space-3 between an icon and its text.', 'Never use emoji as icons.'] },
      demo: function () { return ICONS.map(function (n) { return h('figure', { key: n, className: 'icon-cell' }, h(S.Icon, { name: n, size: 26 }), h('figcaption', null, n)); }); } }
  ];
  var ICONS = ['plus','close','search','mic','wave','image','chevron','chevron-down','link','refresh','list','grid','globe','more','more-vert','settings','layout','folder','sparkle','share','comment','download','edit','check'];

  function Toggle(p) {
    var st = R.useState(true);
    return h(S.Chip, { tone: p.tone, selected: st[0], onClick: function () { st[1](!st[0]); } }, p.label);
  }

  function ToneBar(p) {
    var L = useL();
    return h('div', { className: 'tonebar', role: 'group', 'aria-label': p.name + ' ' + L(UI.toneGroup) }, TONES.map(function (t) {
      return h('button', { key: t, type: 'button', className: 'swatch-btn sg-focusable sg-tone-' + t, 'aria-pressed': String(p.value === t), title: t + ' · ' + L(TONE_NOTE[t]), onClick: function () { p.onChange(t); } }, h('span', { className: 'dot' }), t);
    }));
  }

  function Section(p) {
    var L = useL(), d = p.doc, st = R.useState(d.tone);
    return h('section', { id: d.id, className: 'comp' },
      h('header', { className: 'comp-head' },
        h('div', null, h('p', { className: 'eyebrow' }, L(d.group)), h('h2', null, d.name), h('p', { className: 'lede' }, L(d.summary)))),
      d.tone ? h(ToneBar, { name: d.name, value: st[0], onChange: st[1] }) : null,
      h('div', { className: 'stage' + (d.wide ? ' wide' : '') }, d.demo(st[0], L)),
      h('div', { className: 'comp-body' },
        h('div', { className: 'props' }, h('h3', null, L(UI.props)),
          h('div', { className: 'table-wrap' }, h('table', null,
            h('thead', null, h('tr', null, L(UI.cols).map(function (x) { return h('th', { key: x, scope: 'col' }, x); }))),
            h('tbody', null, d.props.map(function (r) { return h('tr', { key: r[0] }, h('td', null, h('code', null, r[0])), h('td', null, h('code', null, r[1])), h('td', null, L(r[2])), h('td', null, L(r[3]))); }))))),
        h('div', { className: 'rules' }, h('h3', null, L(UI.rules)), h('ul', null, L(d.rules).map(function (r, i) { return h('li', { key: i }, r); })))));
  }

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function initialLang() {
    var saved = store('sg-lang'); if (saved === 'zh' || saved === 'en') return saved;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return /^zh\b/i.test(nav) ? 'zh' : 'en';
  }
  function applyTheme(v) {
    var el = document.documentElement;
    if (v === 'system') el.removeAttribute('data-theme'); else el.setAttribute('data-theme', v);
    store('sg-theme', v);
  }

  function App() {
    var th = R.useState(store('sg-theme') || 'system');
    var lg = R.useState(initialLang());
    var po = R.useState(false);   /* the parameter panel starts collapsed to its button */
    var pr = R.useState(function () {
      var o = {}; try { o = JSON.parse(store('sg-params') || '{}') || {}; } catch (e) { o = {}; }
      var old = store('sg-grain-v') === '2' ? parseFloat(store('sg-grain')) : NaN; if (o.grain == null && isFinite(old)) o.grain = old;
      var v = {}; S.params.forEach(function (d) { var x = parseFloat(o[d.id]); v[d.id] = isFinite(x) && x >= d.min && x <= d.max ? x : d.def; }); return v;
    });
    R.useEffect(function () {
      var changed = {}; S.params.forEach(function (d) { changed[d.id] = pr[0][d.id] === d.def ? null : pr[0][d.id]; });
      S.setParams(changed); store('sg-params', JSON.stringify(pr[0]));
    }, [pr[0]]);
    var lang = lg[0];
    R.useEffect(function () { applyTheme(th[0]); }, [th[0]]);
    R.useEffect(function () {
      var meta = LANGS.filter(function (x) { return x.id === lang; })[0];
      document.documentElement.lang = meta.html; store('sg-lang', lang);
    }, [lang]);
    return h(LangCtx.Provider, { value: lang }, h(Page, { theme: th, lang: lg, params: pr, paramsOpen: po }));
  }

  function fmtParam(d, v) { return d.unit === '%' ? Math.round(v) + '%' : (d.step < 0.05 ? v.toFixed(2) : d.step < 0.5 ? v.toFixed(2).replace(/0$/, '') : String(v)); }
  function Params(p) {
    var L = useL(), vals = p.params[0], set = p.params[1], open = p.open[0], setOpen = p.open[1];
    var cp = R.useState(false), panelRef = R.useRef(null), fabRef = R.useRef(null), first = R.useRef(true);
    function upd(id, v) { var o = Object.assign({}, vals); o[id] = v; set(o); }
    function reset() { var o = {}; S.params.forEach(function (d) { o[d.id] = d.def; }); set(o); }
    var lines = S.params.filter(function (d) { return vals[d.id] !== d.def; }).map(function (d) { return '  ' + d.css + ': ' + vals[d.id] + d.unit + ';'; });
    var css = lines.length ? ':root {\n' + lines.join('\n') + '\n}' : L(UI.noChange);
    function copy() {
      var done = function () { cp[1](true); setTimeout(function () { cp[1](false); }, 1500); };
      try { navigator.clipboard.writeText(css).then(done, function () {}); } catch (e) {}
    }
    R.useEffect(function () {
      if (first.current) { first.current = false; return; }
      if (open) { var t = panelRef.current && panelRef.current.querySelector('.pf-title'); if (t) t.focus({ preventScroll: true }); }
      else if (fabRef.current) { var b = fabRef.current.querySelector('button'); if (b) b.focus({ preventScroll: true }); }
    }, [open]);
    function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); setOpen(false); } }
    return h(R.Fragment, null,
      h('div', { ref: fabRef, className: 'pf-fab' + (open ? ' is-hidden' : '') },
        h(S.Fab, { tone: 'cobalt', icon: 'settings', label: L(UI.params), 'aria-expanded': String(open), 'aria-controls': 'param-panel', tabIndex: open ? -1 : 0, onClick: function () { setOpen(true); } })),
      h('section', { id: 'param-panel', ref: panelRef, role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'pf-title', 'aria-hidden': open ? undefined : 'true',
        className: 'pf-panel sg-glass sg-tone-frost' + (open ? ' is-open' : ''), onKeyDown: onKey, inert: open ? undefined : '' },
        h('header', { className: 'pf-head' },
          h('div', null, h('h2', { id: 'pf-title', className: 'pf-title', tabIndex: -1 }, L(UI.params)), h('p', { className: 'pf-lede' }, L(UI.paramsLede))),
          h(S.IconButton, { variant: 'bare', tone: 'frost', icon: 'close', size: 'sm', label: L({ zh: '收起', en: 'Collapse' }), onClick: function () { setOpen(false); } })),
        h('div', { className: 'pf-body sg-scroll sg-tone-frost' },
          PGROUPS.map(function (g) {
            return h('fieldset', { key: g.id, className: 'param-group' },
              h('legend', null, L(g.name)), h('p', { className: 'param-note' }, L(g.note)),
              S.params.filter(function (d) { return d.group === g.id; }).map(function (d) {
                return h('div', { key: d.id, className: 'param-row' + (vals[d.id] !== d.def ? ' is-set' : '') },
                  h(S.Slider, { id: 'p-' + d.id, label: L(PLABEL[d.id]), tone: 'cobalt', min: d.min, max: d.max, step: d.step, value: vals[d.id], onChange: function (v) { upd(d.id, v); }, format: function (v) { return fmtParam(d, v); } }),
                  h('code', { className: 'param-css' }, d.css));
              }));
          }),
          h('pre', { className: 'param-out', 'aria-live': 'polite' }, css)),
        h('footer', { className: 'pf-foot' },
          h(S.Button, { size: 'sm', onClick: reset, disabled: !lines.length }, L(UI.reset)),
          h(S.Button, { size: 'sm', tone: 'cobalt', onClick: copy, disabled: !lines.length }, cp[0] ? L(UI.copied) : L(UI.copy)))));
  }

  function Page(p) {
    var L = useL();
    return h('div', { className: 'page' },
      h('header', { className: 'masthead' },
        h('div', { className: 'mast-text' },
          h('p', { className: 'eyebrow' }, L(UI.eyebrow)),
          h('h1', null, L(UI.title)),
          h('p', { className: 'lede' }, L(UI.lede))),
        h('div', { className: 'mast-ctl' },
          h('div', { className: 'ctl' }, h('span', { className: 'cap', id: 'lbl-lang' }, L(UI.language)),
            h(S.SegmentedNav, { 'aria-label': L(UI.language), tone: 'frost', value: p.lang[0], onChange: p.lang[1], items: LANGS.map(function (x) { return { id: x.id, label: x.label }; }) })),
          h('div', { className: 'ctl' }, h('span', { className: 'cap' }, L(UI.theme)),
            h(S.SegmentedNav, { 'aria-label': L(UI.theme), tone: 'frost', value: p.theme[0], onChange: p.theme[1], items: [{ id: 'system', label: L(UI.system) }, { id: 'light', label: L(UI.day) }, { id: 'dark', label: L(UI.night) }] })))),
      h('div', { className: 'layout' },
        h('nav', { className: 'toc', 'aria-label': L(UI.toc) },
          h('button', { type: 'button', className: 'toc-link toc-btn', onClick: function () { p.paramsOpen[1](true); } }, L(UI.params)),
          h('a', { href: '#tones', className: 'toc-link' }, L(UI.tones)),
          DOCS.map(function (d) { return h('a', { key: d.id, href: '#' + d.id, className: 'toc-link' }, d.name); })),
        h('main', { className: 'content' },
          h('section', { id: 'tones', className: 'comp' },
            h('header', { className: 'comp-head' }, h('div', null, h('p', { className: 'eyebrow' }, L(UI.basics)), h('h2', null, L(UI.tones)), h('p', { className: 'lede' }, L(UI.tonesLede)))),
            h('div', { className: 'tone-grid' }, TONES.map(function (t) {
              return h('div', { key: t, className: 'tone-card sg-glass sg-tone-' + t },
                h('div', { className: 'tone-hi' }, h('strong', null, t), h('span', null, L(TONE_NOTE[t]))),
                h('p', { className: 'tone-codes' }, ['-fill', '-hi', '-glow', '-ink'].map(function (x, i) { return h('code', { key: x }, (i ? '' : t) + x); })));
            }))),
          DOCS.map(function (d) { return h(Section, { key: d.id, doc: d }); }),
          h('footer', { className: 'foot' }, L(UI.foot)))),
      h(Params, { params: p.params, open: p.paramsOpen }));
  }
  ReactDOM.createRoot(document.getElementById('app')).render(h(App));
})();
