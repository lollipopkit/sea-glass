/* @ds-bundle: {"format":4,"namespace":"SeaGlass","components":[{"name":"Button"},{"name":"IconButton"},{"name":"SegmentedNav"},{"name":"PromptBar"},{"name":"Chip"},{"name":"GlassCard"},{"name":"Meter"},{"name":"Sparkline"},{"name":"Slider"},{"name":"ScrollArea"},{"name":"Toolbar"},{"name":"Fab"},{"name":"SwatchPicker"},{"name":"ToggleButton"},{"name":"Icon"}]} */
(function (root, factory) {
  /* UMD: CommonJS (npm, bundlers) or a classic <script> that extends window.SeaGlass */
  if (typeof module === 'object' && module.exports) module.exports = factory(require('react'));
  else root.SeaGlass = Object.assign(root.SeaGlass || {}, factory(root.React));
})(typeof self !== 'undefined' ? self : this, function (R) {
  var h = R.createElement;
  /* DOM-wide listeners and grain tiles start only in a browser, so the module also loads during server rendering */
  var BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';
  var TONES = ['seafoam', 'aqua', 'cobalt', 'lilac', 'coral', 'amber', 'frost'];
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function tone(t, fallback) { return 'sg-tone-' + (TONES.indexOf(t) >= 0 ? t : fallback); }
  function omit(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }

  var PATHS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M7 16l3.5-4 3 3 2-2 2.5 3"/><circle cx="15.5" cy="9" r="1.5"/>',
    layout: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M10 3.5v17M10 12h10.5"/>',
    folder: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
    sparkle: '<path d="M11 3.5l1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8zM18 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    share: '<circle cx="17.5" cy="5.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M8.7 10.7l6.6-3.9M8.7 13.3l6.6 3.9"/>',
    comment: '<path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5H9.5l-4.5 3.5V6A1.5 1.5 0 0 1 5 4.5z"/><path d="M8 9h8M8 12.5h5"/>',
    download: '<path d="M12 4v10.5M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
    edit: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M5 19h1.4l9.8-9.8-1.4-1.4L5 17.6zM3 21v-4.25L16.2 3.58c.2-.18.42-.33.66-.43.25-.1.5-.15.77-.15s.53.05.78.15c.25.1.47.25.65.45L20.43 5c.2.18.35.4.44.65.09.25.14.5.14.75 0 .27-.05.52-.14.77-.1.25-.24.47-.44.66L7.25 21z"/>',   /* outlined pencil drawn as one shape: thick body, round cap, square tail (reference) */
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
    video: '<rect x="3.5" y="6.5" width="12" height="11" rx="2.5"/><path d="M15.5 10.5l5-3v9l-5-3z"/>',
    dialpad: '<g fill="currentColor" stroke="none"><circle cx="7" cy="4.5" r="1.9"/><circle cx="12" cy="4.5" r="1.9"/><circle cx="17" cy="4.5" r="1.9"/><circle cx="7" cy="9.5" r="1.9"/><circle cx="12" cy="9.5" r="1.9"/><circle cx="17" cy="9.5" r="1.9"/><circle cx="7" cy="14.5" r="1.9"/><circle cx="12" cy="14.5" r="1.9"/><circle cx="17" cy="14.5" r="1.9"/><circle cx="12" cy="19.5" r="1.9"/></g>',
    speaker: '<path d="M4.5 9.5h3l4.5-4v13l-4.5-4h-3z"/><path d="M15.5 9.5a3.2 3.2 0 0 1 0 5M17.2 5.6a7 7 0 0 1 0 12.8"/>',
    'call-end': '<path fill="currentColor" stroke="none" d="M12 8.2c3.5 0 6.7 1.2 8.9 3.3.5.5.5 1.2 0 1.7l-2 2c-.4.4-1.1.5-1.6.1l-1.4-1.1c-.3-.2-.5-.6-.5-1v-2.4c-1.1-.4-2.3-.6-3.4-.6s-2.3.2-3.4.6v2.4c0 .4-.2.8-.5 1l-1.4 1.1c-.5.4-1.2.3-1.6-.1l-2-2c-.5-.5-.5-1.2 0-1.7C5.3 9.4 8.5 8.2 12 8.2z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    'more-vert': '<path d="M12 6h.01M12 12h.01M12 18h.01" stroke-width="3"/>',
    more: '<path d="M6 12h.01M12 12h.01M18 12h.01" stroke-width="3"/>',
    settings: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    chevron: '<path d="M10 6l6 6-6 6"/>',
    'chevron-down': '<path d="M6 10l6 6 6-6"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
    list: '<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.5 5.4 3.5 8.5s-1.1 5.9-3.5 8.5c-2.4-2.6-3.5-5.4-3.5-8.5s1.1-5.9 3.5-8.5"/>',
  };

  /* filled versions (solid shapes, holes cut with even-odd) for icons that read better solid in toolbars and FABs */
  var FILLED = {
    mail: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M4 4.5h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2zM4.6 7.2v1.5l7.4 4.7 7.4-4.7V7.2L12 11.9z"/>',   /* solid envelope, the flap a thin cut line */
    mic: '<path fill="currentColor" stroke="none" d="M12 2.5a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-7 0V6A3.5 3.5 0 0 1 12 2.5z"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke-width="2.2"/>',
    speaker: '<path fill="currentColor" stroke="none" d="M3.5 10a1.5 1.5 0 0 1 1.5-1.5h2.3l3.9-3.3c.65-.55 1.65-.09 1.65.76v12.08c0 .85-1 1.31-1.65.76L7.3 15.5H5A1.5 1.5 0 0 1 3.5 14z"/><path fill="currentColor" stroke="none" d="M14.6 9.2c1.15.62 1.9 1.6 1.9 2.8s-.75 2.18-1.9 2.8z"/><path d="M16.9 5.4a7.2 7.2 0 0 1 0 13.2" stroke-width="2.3"/>',
    'call-end': '<path fill="currentColor" stroke="none" d="M12 8.2c3.5 0 6.7 1.2 8.9 3.3.5.5.5 1.2 0 1.7l-2 2c-.4.4-1.1.5-1.6.1l-1.4-1.1c-.3-.2-.5-.6-.5-1v-2.4c-1.1-.4-2.3-.6-3.4-.6s-2.3.2-3.4.6v2.4c0 .4-.2.8-.5 1l-1.4 1.1c-.5.4-1.2.3-1.6-.1l-2-2c-.5-.5-.5-1.2 0-1.7C5.3 9.4 8.5 8.2 12 8.2z"/>',
    share: '<g fill="currentColor" stroke="none"><circle cx="17.5" cy="5.5" r="3"/><circle cx="6.5" cy="12" r="3"/><circle cx="17.5" cy="18.5" r="3"/></g><path d="M8.7 10.7l6.6-3.9M8.7 13.3l6.6 3.9" stroke-width="2.2"/>',
    comment: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M5 4h14a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H9.7L4 21.5V6a1 1 0 0 1 1-2zM7.5 8.2v1.8h9V8.2zM7.5 11.7v1.8h6v-1.8z"/>',
    edit: '<path fill="currentColor" stroke="none" d="M15.3 4.4a1.5 1.5 0 0 1 2.1 0l2.2 2.2a1.5 1.5 0 0 1 0 2.1l-1.6 1.6-4.3-4.3zM12.3 7.4l4.3 4.3L8.7 19.6a1 1 0 0 1-.6.3L4 20.5l.6-4.1a1 1 0 0 1 .3-.6z"/>',
    image: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11A2.5 2.5 0 0 1 5.5 4zM6.5 16.5h11l-3.4-4.6-2.6 3.3-1.8-2.2z"/>'
  };

  function Icon(p) {
    var size = p.size || 22;
    return h('svg', {
      className: cx('sg-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': p.label ? undefined : 'true', role: p.label ? 'img' : undefined, 'aria-label': p.label,
      dangerouslySetInnerHTML: { __html: (p.filled && FILLED[p.name]) || PATHS[p.name] || '' }
    });
  }

  function Button(p) {
    var rest = omit(p, ['tone', 'size', 'icon', 'children', 'className', 'filled', 'label']);
    var only = p.icon && (p.children == null || p.children === false);
    return h('button', Object.assign({ type: 'button' }, rest, {
      'aria-label': only ? p.label : undefined, title: only ? p.label : undefined,
      className: cx('sg-btn sg-glass sg-focusable sg-spot sg-jelly', only && 'sg-btn-icon', tone(p.tone, 'frost'), 'sg-size-' + (p.size || 'md'), p.className)
    }), p.icon ? h(Icon, { name: p.icon, filled: p.filled, size: p.size === 'xl' ? 50 : p.size === 'lg' ? 28 : p.size === 'sm' ? 18 : 22 }) : null, p.children);
  }

  function IconButton(p) {
    var variant = p.variant || 'glass';
    var rest = omit(p, ['tone', 'size', 'icon', 'monogram', 'label', 'variant', 'className', 'filled', 'iconSize']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      'aria-label': p.label, title: p.label,
      className: cx('sg-iconbtn sg-focusable sg-spot sg-jelly', variant === 'glass' && 'sg-glass', 'sg-v-' + variant,
        tone(p.tone, 'frost'), 'sg-size-' + (p.size || 'md'), p.className)
    }), p.monogram ? h('span', { className: 'sg-mono', 'aria-hidden': 'true' }, p.monogram)
      : h(Icon, { name: p.icon || 'plus', filled: p.filled, size: p.iconSize || (p.size === 'lg' ? 40 : p.size === 'sm' ? 20 : 22) }));
  }

  /* SegmentedNav selection: one half-transparent *-hi pill (the indicator) slides between items. Its two edges are
     separate springs: the edge leading the move is stiff, the trailing edge is soft, so the pill stretches toward the
     new item and then catches up, and it flattens a little while stretched. It reads the target item's box every
     frame, so it also follows the item while that item's icon is opening. While the selected item is pressed, the
     indicator copies the item's jelly transform. */
  var SEG_SPRING = { lead: { k: 560, c: 36 }, trail: { k: 230, c: 25 } };
  function segReduced() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function segAnimate(st) {
    var host = st.host, ind = st.ind; if (!host || !ind) return;
    var el = host.querySelector('.sg-seg-item[aria-selected="true"]');
    if (!el) { ind.style.opacity = '0'; return; }
    ind.style.opacity = '1';
    function target() { return { l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth, t: el.offsetTop, hgt: el.offsetHeight }; }
    function paint() {
      var w = Math.max(0, st.r - st.l), stretch = st.rest > 0 ? Math.max(0, w / st.rest - 1) : 0;
      var sy = 1 - Math.min(0.1, stretch * 0.18);
      ind.style.width = w + 'px'; ind.style.height = st.hgt + 'px';
      ind.style.transform = 'translate(' + st.l + 'px,' + st.t + 'px) scaleY(' + sy.toFixed(4) + ')';
    }
    var T = target();
    if (st.l == null || segReduced()) { st.l = T.l; st.r = T.r; st.vl = st.vr = 0; st.t = T.t; st.hgt = T.hgt; st.rest = T.r - T.l; paint(); return; }
    st.dir = (T.l + T.r) / 2 >= (st.l + st.r) / 2 ? 1 : -1;
    cancelAnimationFrame(st.raf); var last = 0;
    function step(now) {
      var dt = last ? Math.min(0.032, (now - last) / 1000) : 0.016; last = now;
      T = target(); st.t = T.t; st.hgt = T.hgt; st.rest = T.r - T.l;
      var sl = st.dir > 0 ? SEG_SPRING.trail : SEG_SPRING.lead, sr = st.dir > 0 ? SEG_SPRING.lead : SEG_SPRING.trail;
      for (var n = 0; n < 2; n++) {   /* two half steps for stability */
        var h2 = dt / 2;
        st.vl += (-sl.k * (st.l - T.l) - sl.c * st.vl) * h2; st.l += st.vl * h2;
        st.vr += (-sr.k * (st.r - T.r) - sr.c * st.vr) * h2; st.r += st.vr * h2;
      }
      paint();
      if (Math.abs(st.l - T.l) < 0.3 && Math.abs(st.r - T.r) < 0.3 && Math.abs(st.vl) < 4 && Math.abs(st.vr) < 4) {
        st.l = T.l; st.r = T.r; st.vl = st.vr = 0; paint(); st.raf = 0; return;
      }
      st.raf = requestAnimationFrame(step);
    }
    st.vl = st.vl || 0; st.vr = st.vr || 0;
    st.raf = requestAnimationFrame(step);
  }

  function SegmentedNav(p) {
    var items = p.items || [];
    var st = R.useState(p.defaultValue != null ? p.defaultValue : (items[0] && items[0].id));
    var value = p.value != null ? p.value : st[0];
    var anim = R.useRef({}).current, hostRef = R.useRef(null), indRef = R.useRef(null);
    function pick(id) { if (p.value == null) st[1](id); if (p.onChange) p.onChange(id); }
    function onKey(e) {
      var i = items.findIndex(function (it) { return it.id === value; });
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var next = items[(i + d + items.length) % items.length];
      pick(next.id);
      var btn = e.currentTarget.querySelector('[data-id="' + next.id + '"]');
      if (btn) btn.focus();
    }
    R.useLayoutEffect(function () { anim.host = hostRef.current; anim.ind = indRef.current; segAnimate(anim); }, [value, items.length, p.size]);
    R.useEffect(function () {
      var host = hostRef.current; if (!host) return;
      /* keep the indicator on its item when sizes change (fonts loading, labels changing, window resizing) */
      var ro = window.ResizeObserver ? new ResizeObserver(function () { if (!anim.raf) { anim.l = null; segAnimate(anim); } }) : null;
      if (ro) { ro.observe(host); Array.prototype.forEach.call(host.querySelectorAll('.sg-seg-item'), function (b) { ro.observe(b); }); }
      /* follow the selected item's press deformation */
      var mo = window.MutationObserver ? new MutationObserver(function (ms) {
        for (var i = 0; i < ms.length; i++) {
          var t = ms[i].target; if (t.getAttribute('aria-selected') !== 'true' || anim.raf || !anim.ind) continue;
          var m = t.style.transform || '';
          anim.ind.style.transformOrigin = t.style.transformOrigin || '';
          anim.ind.style.transform = 'translate(' + anim.l + 'px,' + anim.t + 'px) ' + m;
        }
      }) : null;
      if (mo) mo.observe(host, { subtree: true, attributes: true, attributeFilter: ['style'] });
      return function () { if (ro) ro.disconnect(); if (mo) mo.disconnect(); cancelAnimationFrame(anim.raf); anim.raf = 0; };
    }, [items.length]);
    var isz = p.size === 'lg' ? 24 : 22;
    return h('div', {
      ref: hostRef, role: 'tablist', 'aria-label': p['aria-label'], onKeyDown: onKey,
      className: cx('sg-seg sg-glass', tone(p.tone, 'lilac'), 'sg-size-' + (p.size || 'md'), p.className)
    }, h('span', { ref: indRef, className: 'sg-seg-ind', 'aria-hidden': 'true' }),
    items.map(function (it) {
      var on = it.id === value;
      return h('button', {
        key: it.id, type: 'button', role: 'tab', 'aria-selected': on ? 'true' : 'false', tabIndex: on ? 0 : -1,
        'data-id': it.id, className: cx('sg-seg-item sg-focusable sg-spot sg-jelly', it.icon && 'has-icon'), onClick: function () { pick(it.id); }
      }, it.icon ? h('span', { className: 'sg-seg-icon', 'aria-hidden': 'true' }, h(Icon, { name: it.icon, filled: p.filled !== false, size: isz })) : null,
        h('span', { className: 'sg-seg-label' }, it.label));
    }));
  }

  function PromptBar(p) {
    var st = R.useState('');
    var value = p.value != null ? p.value : st[0];
    function change(e) { if (p.value == null) st[1](e.target.value); if (p.onChange) p.onChange(e.target.value); }
    function submit(e) { e.preventDefault(); if (p.onSubmit && value.trim()) p.onSubmit(value); }
    var t = TONES.indexOf(p.tone) >= 0 ? p.tone : 'cobalt';
    return h('form', { className: cx('sg-prompt sg-glass', tone(t, 'cobalt'), p.className), onSubmit: submit, role: 'search' },
      h(IconButton, { variant: 'bare', tone: t, icon: 'plus', label: p.attachLabel || 'Add attachment', onClick: p.onAttach }),
      h('input', {
        className: 'sg-prompt-input', value: value, onChange: change,
        placeholder: p.placeholder || 'Ask anything', 'aria-label': p.placeholder || 'Ask anything'
      }),
      h(IconButton, { variant: 'bare', tone: t, icon: 'mic', label: p.micLabel || 'Dictate', onClick: p.onMic }),
      h(IconButton, { variant: 'inset', tone: t, icon: 'wave', label: p.voiceLabel || 'Start voice conversation', onClick: p.onVoice }));
  }

  function Chip(p) {
    var cls = cx('sg-chip sg-glass sg-flat', tone(p.tone, 'frost'), p.onClick && 'sg-focusable sg-spot sg-jelly', p.className);
    var kids = [p.icon ? h(Icon, { key: 'i', name: p.icon, size: 16 }) : null, p.children];
    if (p.onClick) return h('button', { type: 'button', className: cls, onClick: p.onClick, 'aria-pressed': p.selected == null ? undefined : String(!!p.selected) }, kids);
    return h('span', { className: cls }, kids);
  }

  function GlassCard(p) {
    return h('section', { className: cx('sg-card sg-glass', tone(p.tone, 'frost'), p.className), 'aria-label': p.title ? undefined : p['aria-label'] },
      p.title ? h('h3', { className: 'sg-card-title' }, p.title) : null,
      h('div', { className: 'sg-card-body' }, p.children),
      p.footer ? h('div', { className: 'sg-card-foot' }, p.footer) : null);
  }

  var STATE = { warn: 'amber', danger: 'coral' };
  function Meter(p) {
    var v = Math.max(0, Math.min(100, +p.value || 0));
    var warnAt = p.warnAt == null ? 80 : p.warnAt, dangerAt = p.dangerAt == null ? 90 : p.dangerAt;
    var t = v >= dangerAt ? STATE.danger : v >= warnAt ? STATE.warn : (p.tone || 'cobalt');
    var text = p.valueText != null ? p.valueText : v.toFixed(1) + '%';
    return h('div', { className: cx('sg-meter', tone(t, 'cobalt'), p.className) },
      p.icon ? h(Icon, { name: p.icon, size: 20, className: 'sg-meter-icon' }) : null,
      p.label ? h('span', { className: 'sg-meter-label' }, p.label) : null,
      h('div', { className: 'sg-meter-track', role: 'meter', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': v, 'aria-label': p.label },
        h('div', { className: 'sg-meter-bar', style: { width: v + '%' } })),
      h('span', { className: 'sg-meter-value' }, text));
  }

  function Sparkline(p) {
    var d = (p.data || []).map(Number), n = d.length, H = p.height || 64, W = 300;
    if (n < 2) return h('svg', { className: 'sg-spark', height: H });
    var max = p.max != null ? p.max : Math.max.apply(null, d), min = p.min != null ? p.min : 0;
    var span = max - min || 1, pad = 3;
    var pts = d.map(function (y, i) { return [i / (n - 1) * W, pad + (1 - (y - min) / span) * (H - pad * 2)]; });
    var line = pts.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('');
    return h('svg', { className: cx('sg-spark', tone(p.tone, 'cobalt'), p.className), viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', width: '100%', height: H, role: 'img', 'aria-label': p.label },
      p.area === false ? null : h('path', { className: 'sg-spark-area', d: line + 'L' + W + ' ' + H + 'L0 ' + H + 'Z' }),
      h('path', { className: 'sg-spark-line', d: line, vectorEffect: 'non-scaling-stroke' }));
  }

  function Slider(p) {
    var min = p.min != null ? +p.min : 0, max = p.max != null ? +p.max : 100, step = p.step != null ? +p.step : 1;
    var st = R.useState(p.defaultValue != null ? +p.defaultValue : min);
    var v = p.value != null ? +p.value : st[0];
    var autoId = R.useId ? R.useId() : undefined;
    var id = p.id || autoId;
    var fmt = p.format || function (x) { return String(x); };
    var pct = max > min ? (v - min) / (max - min) * 100 : 0;
    function change(e) { var n = parseFloat(e.target.value); if (p.value == null) st[1](n); if (p.onChange) p.onChange(n); }
    return h('div', { className: cx('sg-slider', tone(p.tone, 'cobalt'), p.disabled && 'is-disabled', p.className) },
      p.label ? h('label', { className: 'sg-slider-label', htmlFor: id }, p.label) : null,
      h('input', {
        id: id, type: 'range', className: 'sg-slider-input', min: min, max: max, step: step, value: v,
        disabled: p.disabled, onChange: change, 'aria-label': p.label ? undefined : p['aria-label'],
        'aria-valuetext': fmt(v), style: { '--sg-pct': pct + '%' }
      }),
      p.showValue === false ? null : h('output', { className: 'sg-slider-value', htmlFor: id }, fmt(v)));
  }

  /* Interactive light and jelly apply to every glass surface (.sg-glass) and to the inner controls that are not glass
     (segmented-nav items, bare icon buttons). Any other element opts in with .sg-spot / .sg-jelly; .sg-nojelly opts out
     of the deformation. */
  var SPOT_SEL = '.sg-spot, .sg-glass';
  var JELLY_SEL = '.sg-jelly, .sg-glass';
  /* the element that deforms for a target: the nearest jelly surface, or for a .sg-jelly-host (a control whose
     surface is one of its children, such as ToggleButton) that child. Disabled controls do not deform. */
  function jellyFor(t) {
    if (!t || !t.closest) return null;
    var host = t.closest('.sg-jelly-host'), el = host ? host.querySelector('.sg-jelly, .sg-glass') : t.closest(JELLY_SEL);
    if (!el || el.classList.contains('sg-nojelly') || el.disabled || (el.closest && el.closest(':disabled'))) return null;
    return el;
  }

  /* pointer-following light: one shared listener writes the pointer position into --sg-mx / --sg-my on every lit
     surface under the pointer (a button and the card it sits in), at most once per frame */
  function setSpot(el, x, y) {
    var r = el.getBoundingClientRect();
    el.style.setProperty('--sg-mx', (x - r.left) + 'px');
    el.style.setProperty('--sg-my', (y - r.top) + 'px');
  }
  function spotChain(t) {
    var out = [], el = t && t.closest ? t.closest(SPOT_SEL) : null;
    while (el && out.length < 4) { out.push(el); el = el.parentElement ? el.parentElement.closest(SPOT_SEL) : null; }
    return out;
  }
  if (BROWSER && !window.__sgSpot) {
    window.__sgSpot = true;
    var pending = null, frame = 0;
    var apply = function () {
      frame = 0; if (!pending) return;
      for (var i = 0; i < pending.els.length; i++) setSpot(pending.els[i], pending.x, pending.y);
      pending = null;
    };
    /* while a surface is hovered or pressed (and for a moment after, while its colours ease back), its grain and rim
       layers get their own compositor layers: the hover colour, the light and the press then repaint only the
       surface's background, not the masked layers on top. Only a handful of surfaces are ever "hot" at once. */
    var hot = new Map();
    var heat = function (els) {
      for (var i = 0; i < els.length; i++) { var el = els[i]; if (!el.classList.contains('sg-glass')) continue;
        clearTimeout(hot.get(el)); hot.set(el, 0); if (!el.classList.contains('sg-hot')) el.classList.add('sg-hot'); }
    };
    var cool = function (el) {
      clearTimeout(hot.get(el));
      hot.set(el, setTimeout(function () { hot.delete(el); el.classList.remove('sg-hot'); }, 700));
    };
    document.addEventListener('pointerover', function (e) { heat(spotChain(e.target)); }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      var from = spotChain(e.target), to = e.relatedTarget ? spotChain(e.relatedTarget) : [];
      for (var i = 0; i < from.length; i++) if (to.indexOf(from[i]) < 0 && from[i].classList.contains('sg-glass')) cool(from[i]);
    }, { passive: true });
    document.addEventListener('focusin', function (e) { var c = spotChain(e.target); heat(c); setTimeout(function () { c.forEach(cool); }, 800); }, true);
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var els = spotChain(e.target); if (!els.length) return;
      pending = { els: els, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    }, { passive: true });
  }

  /* Jelly press: every jelly surface deforms like a soft gel around the point it is pressed, in any direction.
     A damped spring drives the press amount p (0 rest, 1 pressed): pressing is quick and nearly critically damped;
     releasing is underdamped, so p overshoots below 0 and the shape wobbles out and back before settling.
     Shape: let u be the direction from the element's centre to the press point (any angle, in px space) and m how far
     out the press is (0 at the centre, 1 at the edge). The surface is compressed along u by `dir` px * m and bulges
     across u, built as a matrix R(θ)·diag(1-a, 1+b)·R(-θ) so the squash follows the true press angle, not just the axes.
     The far side along u is the transform origin, so the side under the pointer goes in and the far side stays put.
     Near the centre the press becomes a uniform push into the page (`centre` px). While held, the direction eases
     toward the pointer instead of jumping. Amounts are clamped so small elements do not over-deform. */
  var JELLY = { dir: 7, centre: 3, bulge: 0.45, maxA: 0.11, ease: 0.3,
    press: { k: 900, c: 46 }, release: { k: 380, c: 13.5 } };
  var reduceMotion = BROWSER && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function jellyState(el) {
    if (!el.__sgJelly) el.__sgJelly = { p: 0, v: 0, target: 0, nx: 0, ny: 0, tx: 0, ty: 0, raf: 0, last: 0, spring: JELLY.press };
    return el.__sgJelly;
  }
  function jellyRender(el, s) {
    s.nx += (s.tx - s.nx) * JELLY.ease; s.ny += (s.ty - s.ny) * JELLY.ease;
    var w = el.offsetWidth || 1, hgt = el.offsetHeight || 1, p = s.p;
    if (Math.abs(p) < 0.002 && Math.abs(s.v) < 0.01) { el.style.transform = ''; el.style.willChange = ''; return; }
    if (!el.style.willChange) el.style.willChange = 'transform';   /* composited only while it moves: each frame is a transform, not a repaint */
    var px = s.nx * w / 2, py = s.ny * hgt / 2, len = Math.hypot(px, py);
    var m = Math.min(1, Math.hypot(s.nx, s.ny));
    var ux = len > 0.01 ? px / len : 0, uy = len > 0.01 ? py / len : 1;
    var extent = Math.hypot(w * ux, hgt * uy);                        /* size along u (elliptical, equal in every direction on a circle) */
    var across = Math.hypot(w * uy, hgt * ux);                        /* size across u */
    var a = Math.max(-JELLY.maxA, Math.min(JELLY.maxA, p * JELLY.dir * m / extent));
    var b = JELLY.bulge * a * extent / across;
    b = Math.max(-JELLY.maxA, Math.min(JELLY.maxA, b));
    var s0 = 1 - Math.max(-0.05, Math.min(0.06, p * JELLY.centre * (1 - m) / Math.min(w, hgt)));
    var c = ux, sn = uy, ca = 1 - a, cb = 1 + b;
    var m11 = s0 * (ca * c * c + cb * sn * sn), m22 = s0 * (ca * sn * sn + cb * c * c), m12 = s0 * (ca - cb) * c * sn;
    var ox = w / 2 - ux * extent / 2 * m, oy = hgt / 2 - uy * extent / 2 * m;
    ox = Math.max(0, Math.min(w, ox)); oy = Math.max(0, Math.min(hgt, oy));
    el.style.transformOrigin = ox.toFixed(1) + 'px ' + oy.toFixed(1) + 'px';
    el.style.transform = 'matrix(' + m11.toFixed(4) + ',' + m12.toFixed(4) + ',' + m12.toFixed(4) + ',' + m22.toFixed(4) + ',0,0)';
  }
  function jellyStep(el) {
    var s = el.__sgJelly, now = performance.now(), dt = Math.min(0.032, (now - (s.last || now)) / 1000 || 0.016);
    s.last = now;
    var steps = 4, h = dt / steps;
    for (var i = 0; i < steps; i++) { var a = -s.spring.k * (s.p - s.target) - s.spring.c * s.v; s.v += a * h; s.p += s.v * h; }
    jellyRender(el, s);
    if (Math.abs(s.p - s.target) < 0.002 && Math.abs(s.v) < 0.01 && Math.abs(s.tx - s.nx) < 0.01 && Math.abs(s.ty - s.ny) < 0.01) { s.p = s.target; s.v = 0; jellyRender(el, s); s.raf = 0; s.last = 0; return; }
    s.raf = requestAnimationFrame(function () { jellyStep(el); });
  }
  function jellyKick(el) { var s = el.__sgJelly; if (!s.raf) { s.last = 0; s.raf = requestAnimationFrame(function () { jellyStep(el); }); } }
  function jellyAim(el, s, e, snap) {
    var r = el.getBoundingClientRect();
    s.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    s.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    if (snap) { s.nx = s.tx; s.ny = s.ty; }
  }
  if (BROWSER && !window.__sgJelly) {
    window.__sgJelly = true;
    var active = null;
    var release = function () {
      if (!active) return;
      active.classList.remove('is-pressed');
      var s = jellyState(active); s.target = 0; s.spring = JELLY.release; jellyKick(active); active = null;
    };
    document.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || (reduceMotion && reduceMotion.matches)) return;
      var el = jellyFor(e.target);
      if (!el) return;
      setSpot(el, e.clientX, e.clientY); el.classList.add('is-pressed');
      var s = jellyState(el); jellyAim(el, s, e, Math.abs(s.p) < 0.05);
      s.target = 1; s.spring = JELLY.press; active = el; jellyKick(el);
    }, { passive: true });
    document.addEventListener('pointermove', function (e) {
      if (!active) return;
      var s = jellyState(active); var r = active.getBoundingClientRect();
      if (e.clientX < r.left - 8 || e.clientX > r.right + 8 || e.clientY < r.top - 8 || e.clientY > r.bottom + 8) { release(); return; }
      jellyAim(active, s, e); setSpot(active, e.clientX, e.clientY); jellyKick(active);
    }, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('pointercancel', release, { passive: true });
    window.addEventListener('blur', release);
    /* keyboard activation (Enter / Space) presses from the centre */
    document.addEventListener('keydown', function (e) {
      if ((e.key !== 'Enter' && e.key !== ' ') || e.repeat || (reduceMotion && reduceMotion.matches)) return;
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) return;
      var el = jellyFor(document.activeElement);
      if (!el) return;
      el.style.setProperty('--sg-mx', '50%'); el.style.setProperty('--sg-my', '50%'); el.classList.add('is-pressed');
      var s = jellyState(el); s.nx = s.ny = s.tx = s.ty = 0; s.target = 1; s.spring = JELLY.press; active = el; jellyKick(el);
    });
    document.addEventListener('keyup', function (e) { if (e.key === 'Enter' || e.key === ' ') release(); });
  }

  function ScrollArea(p) {
    var style = Object.assign({}, p.style || {});
    if (p.maxHeight != null) style.maxHeight = typeof p.maxHeight === 'number' ? p.maxHeight + 'px' : p.maxHeight;
    if (p.height != null) style.height = typeof p.height === 'number' ? p.height + 'px' : p.height;
    return h('div', {
      className: cx('sg-scrollarea sg-scroll', p.tone ? tone(p.tone, 'frost') : null, p.className), style: style,
      tabIndex: p.tabIndex != null ? p.tabIndex : 0, role: p.role || 'region', 'aria-label': p['aria-label']
    }, p.children);
  }

  /* Grain, randomly placed: drawn once at load into a 200 CSS px canvas tile (at device-pixel resolution) from a seeded generator (mulberry32).
     Two layers: fine noise on every pixel (light or dark with equal odds, so the mean colour is unchanged) and
     sparse, slightly stronger specks (1.5% of pixels, a tenth of them 2px) at random positions. The tile becomes --sg-grain;
     every glass surface also gets its own random --sg-grain-pos so neighbouring surfaces never line up.
     Without a canvas the SVG noise in bundle.css stays in use. */
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  /* fleck settings: CSS custom properties on :root (see bundle.css), overridable with SeaGlass.setGrain */
  var FLECK_KEYS = { dark: '--sg-fleck-dark', light: '--sg-fleck-light', size: '--sg-fleck-size', stretch: '--sg-fleck-stretch', darkAlpha: '--sg-fleck-dark-alpha', lightAlpha: '--sg-fleck-light-alpha' };
  var FLECK_DEFAULTS = { dark: 10, light: 5, size: 1, stretch: 1, darkAlpha: 1, lightAlpha: 1 };
  /* fleck settings: inline values on :root (SeaGlass.setParams writes those) over the stylesheet values, which are
     read from the computed style only once (or again via SeaGlass.refreshGrain). Reading the computed style on every
     change would force a style recalculation of the whole page each time a slider moves. */
  var fleckBase = null;
  function fleckSettings(fresh) {
    var root = document.documentElement, o = {};
    if (!fleckBase || fresh) {
      var cs = null; try { cs = getComputedStyle(root); } catch (e) {}
      fleckBase = {};
      for (var k0 in FLECK_KEYS) { var v0 = cs ? parseFloat(cs.getPropertyValue(FLECK_KEYS[k0])) : NaN; fleckBase[k0] = isFinite(v0) && v0 >= 0 ? v0 : FLECK_DEFAULTS[k0]; }
    }
    for (var k in FLECK_KEYS) { var v = parseFloat(root.style.getPropertyValue(FLECK_KEYS[k])); o[k] = isFinite(v) && v >= 0 ? v : fleckBase[k]; }
    return o;
  }
  /* dark themes: white flecks on a dark surface read far stronger than on a light one, so they are drawn weaker there.
     The theme comes from data-theme (dark/night or light/day) or, without it, from the system setting; only a page
     that sets neither is checked by the lightness of its --paper colour, parsed as text (no canvas, no readback). */
  var paperDark = null;
  function hexLum(v) {
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v), r, g, b2;
    if (m) { var x = m[1]; if (x.length === 3) x = x[0] + x[0] + x[1] + x[1] + x[2] + x[2]; r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b2 = parseInt(x.slice(4, 6), 16); }
    else { m = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(v); if (!m) return null; r = +m[1]; g = +m[2]; b2 = +m[3]; }
    return 0.2126 * r + 0.7152 * g + 0.0722 * b2;
  }
  function pageIsDark() {
    var t = (document.documentElement.getAttribute('data-theme') || '').toLowerCase();
    if (t === 'dark' || t === 'night') return true;
    if (t === 'light' || t === 'day') return false;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
    if (paperDark == null) { try { var l = hexLum(getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()); paperDark = l != null && l < 100; } catch (e) { paperDark = false; } }
    return paperDark;
  }
  /* flecks: small angular shards (3 or 4 corners, long and thin more often than not, 0.2 to 2.5 CSS px), dark and
     light, scattered at random. Count and contrast measured on the reference: about 8 dark and 7 light per 100 square
     CSS px. The mask tile holds every fleck (its alpha is the fleck's strength); the light tile holds the light ones
     in solid white. The glass paints the tone's ink through the mask with the light tile on top.
     Self-contained (only mulberry32), so the same code runs in a worker on an OffscreenCanvas. */
  function drawGrainTiles(cm, cl, N, dpr, CSS_N, seed, darkPage, F) {
    var rnd = mulberry32(seed >>> 0);
    function shard(dark) {
      var cx = rnd() * N, cy = rnd() * N, r = Math.exp(-0.6 + rnd() * 1.25 + (rnd() < 0.1 ? 0.4 : 0)) * 0.6 * F.size * dpr;
      var n = 3 + (rnd() < 0.45 ? 1 : 0), rot = rnd() * 6.283, stretch = Math.min(1, (dark ? 0.2 + rnd() * 0.4 : 0.4 + rnd() * 0.45) / Math.max(0.2, F.stretch)), pts = [];
      for (var q = 0; q < n; q++) { var t = rot + q / n * 6.283 + (rnd() - 0.5) * 1.1, rr = r * (0.55 + rnd() * 0.75);
        pts.push([Math.cos(t) * rr, Math.sin(t) * rr * stretch]); }
      var c = Math.cos(rot), sn = Math.sin(rot);
      var a = Math.min(1, dark ? (0.5 + rnd() * 0.3) * (darkPage ? 1.3 : 1) * F.darkAlpha : (0.8 + rnd() * 0.2) * (darkPage ? 0.35 : 1) * F.lightAlpha);
      cm.fillStyle = 'rgba(0,0,0,' + a + ')';
      for (var ox = -1; ox <= 1; ox++) for (var oy = -1; oy <= 1; oy++) {
        var bx = cx + ox * N, by = cy + oy * N; if (bx < -8 * dpr || by < -8 * dpr || bx > N + 8 * dpr || by > N + 8 * dpr) continue;
        var path = new Path2D();
        for (var q2 = 0; q2 < n; q2++) { var px = bx + pts[q2][0] * c - pts[q2][1] * sn, py = by + pts[q2][0] * sn + pts[q2][1] * c; if (q2) path.lineTo(px, py); else path.moveTo(px, py); }
        path.closePath(); cm.fill(path);
        if (!dark) { cl.fillStyle = cl.strokeStyle = '#fff'; cl.lineWidth = 1 * dpr; cl.lineJoin = 'round'; cl.fill(path); cl.stroke(path); }   /* the white reaches past the mask edge, so no ink shows round a light fleck */
      }
    }
    var nd = Math.round(CSS_N * CSS_N * F.dark / 100), nl = Math.round(CSS_N * CSS_N * F.light / 100);
    for (var k = 0; k < nd + nl; k++) shard(k < nd ? 1 : 0);
  }

  /* Rim highlight as an alpha mask, the same light the two inset shadows draw (a wide band along the bottom that wraps
     up round the ends, and a soft rim all round the inside of the outline), computed from the signed distance to the
     rounded rectangle and a Gaussian falloff. Shape only, no colour: the glass paints *-glow through it, so a theme
     switch needs no new masks. One mask per size and radius, shared by every surface of that size; a mask is a plain
     image to draw, where each inset shadow cost about as much to rasterise as the whole rest of the surface.
     Self-contained, so it also runs in the worker. */
  function rimAlpha(w, h, R, layers) {
    function erfc(x) { var z = Math.abs(x), t = 1 / (1 + 0.5 * z), r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277))))))))); return x >= 0 ? r : 2 - r; }
    var out = new Uint8ClampedArray(w * h * 4), L = [];
    for (var k = 0; k < layers.length; k++) {
      var l = layers[k], hw = w / 2 - l.S, hh = h / 2 - l.S;
      L.push({ cy: h / 2 + l.dy, hw: hw, hh: hh, r: Math.max(0, Math.min(R - l.S, hw, hh)), sig: Math.max(0.01, l.B / 2) * Math.SQRT2, A: l.A, empty: hw <= 0 || hh <= 0 });
    }
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var px = i + 0.5, py = j + 0.5, keep = 1;
      for (var n = 0; n < L.length; n++) {
        var q = L[n]; if (q.empty) { keep *= 1 - q.A; continue; }
        var qx = Math.abs(px - w / 2) - (q.hw - q.r), qy = Math.abs(py - q.cy) - (q.hh - q.r);
        var sd = Math.min(Math.max(qx, qy), 0) + Math.sqrt(Math.max(qx, 0) * Math.max(qx, 0) + Math.max(qy, 0) * Math.max(qy, 0)) - q.r;
        keep *= 1 - q.A * (1 - 0.5 * erfc(sd / q.sig));   /* inset shadow: covered outside the inner shape, Gaussian edge */
      }
      out[(j * w + i) * 4 + 3] = Math.round((1 - keep) * 255);
    }
    return out;
  }

  /* Tiles are drawn in a worker on OffscreenCanvas when the browser allows it, so neither page load nor a theme switch
     nor a grain slider waits for them; otherwise on the main thread after the current frame. PNG encoding is
     asynchronous either way, and CSS gets short blob: URLs (a 75 KB data: URL in a custom property on :root made every
     style recalculation of the page several times slower). The canvases are CPU-backed (willReadFrequently): small
     tiles draw faster there, encode without a GPU readback, and do not compete with the page's own GPU work. */
  var grainWorker = null, grainWorkerFailed = false, grainJobs = {}, grainJobId = 0;
  function getGrainWorker() {
    if (grainWorker || grainWorkerFailed) return grainWorker;
    try {
      if (typeof OffscreenCanvas === 'undefined' || !window.Worker || !window.Blob || !URL.createObjectURL) throw 0;
      var src = mulberry32.toString() + '\n' + drawGrainTiles.toString() + '\n' + rimAlpha.toString() + '\n' +
        'onmessage=function(e){var d=e.data;try{if(d.type==="rim"){var c=new OffscreenCanvas(d.w,d.h);c.getContext("2d").putImageData(new ImageData(rimAlpha(d.w,d.h,d.R,d.layers),d.w,d.h),0,0);' +
        'c.convertToBlob({type:"image/png"}).then(function(b){postMessage({id:d.id,blob:b})},function(){postMessage({id:d.id,error:1})});return}' +
        'var a=new OffscreenCanvas(d.N,d.N),b=new OffscreenCanvas(d.N,d.N);' +
        'var o={willReadFrequently:true};drawGrainTiles(a.getContext("2d",o),b.getContext("2d",o),d.N,d.dpr,d.CSS_N,d.seed,d.dark,d.F);' +
        'Promise.all([a.convertToBlob({type:"image/png"}),b.convertToBlob({type:"image/png"})]).then(function(r){postMessage({id:d.id,mask:r[0],light:r[1]})},function(){postMessage({id:d.id,error:1})})}' +
        'catch(x){postMessage({id:d.id,error:1})}};';
      grainWorker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      grainWorker.onmessage = function (e) {
        var d = e.data, job = grainJobs[d.id]; delete grainJobs[d.id]; if (!job) return;
        if (job.type === 'rim') { if (d.error) { grainWorkerFailed = true; makeRimHere(job); } else job.done(URL.createObjectURL(d.blob)); return; }
        if (d.error) { grainWorkerFailed = true; makeGrainHere(job); return; }
        job.done({ mask: URL.createObjectURL(d.mask), light: URL.createObjectURL(d.light), size: job.CSS_N });
      };
      grainWorker.onerror = function () {   /* blocked by the page's policy, or no OffscreenCanvas 2D: draw here instead */
        grainWorkerFailed = true; grainWorker = null;
        for (var id in grainJobs) { var j = grainJobs[id]; delete grainJobs[id]; if (j.type === 'rim') makeRimHere(j); else makeGrainHere(j); }
      };
    } catch (e) { grainWorkerFailed = true; grainWorker = null; }
    return grainWorker;
  }
  function makeGrainHere(job) {
    setTimeout(function () {
      try {
        var mk = function () { var c = document.createElement('canvas'); c.width = c.height = job.N; return c; };
        var o = { willReadFrequently: true }, cvM = mk(), cvL = mk(), cm = cvM.getContext('2d', o), cl = cvL.getContext('2d', o); if (!cm || !cl) return;
        drawGrainTiles(cm, cl, job.N, job.dpr, job.CSS_N, job.seed, job.dark, job.F);
        var toUrl = function (cv, cb) {
          if (cv.toBlob && window.URL && URL.createObjectURL) cv.toBlob(function (b) { cb(b ? URL.createObjectURL(b) : cv.toDataURL('image/png')); }, 'image/png');
          else cb(cv.toDataURL('image/png'));
        };
        toUrl(cvM, function (mu) { toUrl(cvL, function (lu) { job.done({ mask: mu, light: lu, size: job.CSS_N }); }); });
      } catch (e) { /* keep the SVG grain */ }
    }, 0);
  }
  function makeGrain(seed, darkPage, F, done) {
    var CSS_N = 200, dpr = Math.max(1, Math.min(3, Math.round(window.devicePixelRatio || 1)));
    var job = { id: ++grainJobId, N: CSS_N * dpr, dpr: dpr, CSS_N: CSS_N, seed: seed, dark: !!darkPage, F: F || fleckSettings(), done: done || function () {} };
    var w = getGrainWorker();
    if (w) { grainJobs[job.id] = job; w.postMessage({ id: job.id, N: job.N, dpr: dpr, CSS_N: CSS_N, seed: seed, dark: job.dark, F: job.F }); }
    else makeGrainHere(job);
  }
  function makeRimHere(job) {
    setTimeout(function () {
      try {
        var c = document.createElement('canvas'); c.width = job.w; c.height = job.h;
        c.getContext('2d', { willReadFrequently: true }).putImageData(new ImageData(rimAlpha(job.w, job.h, job.R, job.layers), job.w, job.h), 0, 0);
        if (c.toBlob) c.toBlob(function (b) { job.done(b ? URL.createObjectURL(b) : c.toDataURL('image/png')); }, 'image/png'); else job.done(c.toDataURL('image/png'));
      } catch (e) { /* the element keeps its inset shadows */ }
    }, 0);
  }
  var rimCache = {}, rimWaiting = {}, rimDirty = new Set ? new Set() : null, rimTimer = 0, rimRO = null;
  function rimLayers(el, cs) {
    if (el.classList.contains('sg-flat')) return [{ dy: -5, B: 6, S: -3, A: 1 }, { dy: 0, B: 5, S: 0, A: 0.8 }];
    var r = parseFloat(cs.getPropertyValue('--sg-r')) || 12, e = parseFloat(cs.getPropertyValue('--sg-edge-glow')); e = isFinite(e) ? e / 100 : 0.85;
    return [{ dy: -1.4 * r, B: r, S: -0.35 * r, A: 1 }, { dy: -0.45 * r, B: 0.9 * r, S: 0.12 * r, A: e }];
  }
  /* Nine-slice: along a straight edge the rim does not change, so where the browser supports -webkit-mask-box-image a
     small mask (corners plus a 2px middle) is stretched to any width and height. One mask then serves every surface
     with the same corner radius and rim, whatever its size; without it, one full-size mask per size. */
  var RIM_9 = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-mask-box-image', 'none');
  function rimUpdate(el) {
    if (!el.isConnected) { if (rimRO) rimRO.unobserve(el); return; }
    var w = el.offsetWidth, h = el.offsetHeight; if (!w || !h) return;
    var cs = getComputedStyle(el), R = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, w / 2, h / 2), layers = rimLayers(el, cs);
    var mw = w, mh = h, sx = 0, sy = 0;
    if (RIM_9) {
      var reachX = 0, reachY = 0;
      layers.forEach(function (l) { reachX = Math.max(reachX, Math.max(0, l.S) + 1.5 * l.B); reachY = Math.max(reachY, Math.abs(l.dy) + Math.max(0, l.S) + 1.5 * l.B); });
      sx = Math.ceil(R + reachX) + 1; sy = Math.ceil(R + reachY) + 1;
      if (w > 2 * sx + 2) mw = 2 * sx + 2; else sx = 0;
      if (h > 2 * sy + 2) mh = 2 * sy + 2; else sy = 0;
    }
    var key = [mw, mh, Math.round(R * 2) / 2, layers.map(function (l) { return [l.dy, l.B, l.S, l.A].map(function (v) { return Math.round(v * 100) / 100; }).join(','); }).join(';')].join('|');
    var boxKey = key + '|' + w + 'x' + h;
    if (el.__sgRimKey === boxKey) return;
    el.__sgRimKey = boxKey;
    var apply = function (url) {
      if (el.__sgRimKey !== boxKey) return;
      if (RIM_9) {
        /* slices: the stretched middle where the mask is shorter than the surface, else exactly half each way */
        var t = sy || mh / 2, l = sx || mw / 2, bt = sy || mh - t, rt = sx || mw - l;
        el.style.setProperty('--sg-rim-box', 'url("' + url + '") ' + t + ' ' + rt + ' ' + bt + ' ' + l + ' fill / ' + t + 'px ' + rt + 'px ' + bt + 'px ' + l + 'px stretch');
        el.classList.add('sg-rim9');
      } else el.style.setProperty('--sg-rim-mask', 'url("' + url + '")');
      el.classList.add('sg-rimmed');
    };
    if (rimCache[key]) { apply(rimCache[key]); return; }
    /* nine-slice masks are a few thousand pixels: drawn here at once (well under a millisecond), so the surface is
       painted with its mask from its first frame and never rasterised with the inset shadows first */
    if (RIM_9) {
      try {
        var c = document.createElement('canvas'); c.width = mw; c.height = mh;
        c.getContext('2d', { willReadFrequently: true }).putImageData(new ImageData(rimAlpha(mw, mh, R, layers), mw, mh), 0, 0);
        rimCache[key] = c.toDataURL('image/png'); apply(rimCache[key]); return;
      } catch (e) { /* fall through to the worker */ }
    }
    if (rimWaiting[key]) { rimWaiting[key].push(apply); return; }
    rimWaiting[key] = [apply];
    var job = { type: 'rim', id: ++grainJobId, w: mw, h: mh, R: R, layers: layers, done: function (url) { rimCache[key] = url; var list = rimWaiting[key] || []; delete rimWaiting[key]; list.forEach(function (f) { f(url); }); } };
    var wk = getGrainWorker();
    if (wk) { grainJobs[job.id] = job; wk.postMessage({ type: 'rim', id: job.id, w: mw, h: mh, R: R, layers: layers }); }
    else makeRimHere(job);
  }
  /* a surface gets its first mask right away (next frame); later size changes wait until the size settles, so a panel
     that is still animating keeps its last mask, stretched, meanwhile */
  var rimSoon = [], rimSoonRaf = 0;
  function rimSchedule(el, now) {
    if (!el.__sgRimKey) {
      if (now) { rimUpdate(el); return; }
      rimSoon.push(el);
      if (!rimSoonRaf) rimSoonRaf = requestAnimationFrame(function () { rimSoonRaf = 0; var l = rimSoon; rimSoon = []; l.forEach(rimUpdate); });
      return;
    }
    if (!rimDirty) return; rimDirty.add(el);
    clearTimeout(rimTimer); rimTimer = setTimeout(function () { var l = Array.from(rimDirty); rimDirty.clear(); l.forEach(rimUpdate); }, 140);
  }
  function rimWatch(el) {
    if (el.__sgRimWatched) return; el.__sgRimWatched = true;
    /* ResizeObserver reports after layout and before paint: a first mask made there is in the very first frame */
    if (!rimRO && window.ResizeObserver) rimRO = new ResizeObserver(function (es) { es.forEach(function (e) { rimSchedule(e.target, true); }); });
    if (rimRO) rimRO.observe(el); else rimSchedule(el);
  }
  function rimRefreshAll() { Array.prototype.forEach.call(document.querySelectorAll('.sg-glass'), function (el) { el.__sgRimKey = null; rimSchedule(el); }); }
  function applyGrain(tiles, darkPage) {
    var root = document.documentElement;
    root.style.setProperty('--sg-grain-mask', 'url("' + tiles.mask + '")');
    root.style.setProperty('--sg-grain-light', 'url("' + tiles.light + '")');
    root.style.setProperty('--sg-grain-size', tiles.size + 'px');
    root.classList.add('sg-has-flecks'); root.classList.toggle('sg-dark-page', !!darkPage);
  }
  function scatterGrain(el) {
    if (el.__sgGrain) return; el.__sgGrain = true;
    el.style.setProperty('--sg-grain-pos', Math.floor(Math.random() * 200) + 'px ' + Math.floor(Math.random() * 200) + 'px');
    el.style.setProperty('--sg-band-x1', Math.round(24 + Math.random() * 20) + '%');
    el.style.setProperty('--sg-band-x2', Math.round(56 + Math.random() * 20) + '%');
  }
  if (BROWSER && !window.__sgGrainInit && document.createElement) {
    window.__sgGrainInit = true;
    var seed = (window.crypto && window.crypto.getRandomValues) ? window.crypto.getRandomValues(new Uint32Array(1))[0] : Math.floor(Math.random() * 4294967296);
    var grainKey = function (d, F) { return (d ? 1 : 0) + JSON.stringify(F); };
    var grainCache = {}, lastKey = null, wantKey = null;
    /* draw (or reuse) the tiles for the current theme and --sg-fleck-* settings; switching back to a theme seen
       before costs nothing. The dark/light class changes at once, the tiles follow when ready. */
    var regrain = function () {
      var d = pageIsDark(), F = fleckSettings(), key = grainKey(d, F);
      document.documentElement.classList.toggle('sg-dark-page', d);
      if (key === lastKey) return; lastKey = key; wantKey = key;
      if (grainCache[key]) { applyGrain(grainCache[key], d); return; }
      makeGrain(seed, d, F, function (tiles) { grainCache[key] = tiles; if (wantKey === key) applyGrain(tiles, d); });
    };
    regrain();
    window.__sgRegrain = regrain;
    window.__sgRefreshGrain = function () { fleckSettings(true); paperDark = null; lastKey = null; regrain(); };
    /* a theme switch changes every colour at once: without this, each control would also run its own colour and
       shadow transition, dozens of multi-layer box-shadow animations in the same frames */
    var themeSwitch = function () {
      var root = document.documentElement; root.classList.add('sg-theme-switching');
      requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('sg-theme-switching'); }); });
    };
    if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', function () { themeSwitch(); regrain(); }); }
    if (window.MutationObserver) new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) if (ms[i].attributeName === 'data-theme') { themeSwitch(); break; }
      regrain();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });
    /* a surface whose corner radius animates (ToggleButton) gets a new mask when the radius settles */
    document.addEventListener('transitionend', function (e) { var t = e.target; if (t && t.classList && t.classList.contains('sg-glass') && /radius/.test(e.propertyName)) rimSchedule(t); }, true);
    var scan = function (root) {
      if (!root || !root.querySelectorAll) return;
      if (root.classList && root.classList.contains('sg-glass')) { scatterGrain(root); rimWatch(root); }
      var list = root.querySelectorAll('.sg-glass'); for (var n = 0; n < list.length; n++) { scatterGrain(list[n]); rimWatch(list[n]); }
    };
    if (window.MutationObserver) {
      new MutationObserver(function (muts) { for (var m = 0; m < muts.length; m++) for (var q = 0; q < muts[m].addedNodes.length; q++) scan(muts[m].addedNodes[q]); })
        .observe(document.documentElement, { childList: true, subtree: true });
    }
    scan(document.documentElement);
  }

  /* Toolbar: a glass pill of bare icon buttons. Left/right arrow keys move focus between them (roving tabindex).
     The More button (an item with `more: true`, or a `more-vert` item without its own onClick) opens a menu: the pill
     grows into a vertical glass panel, every toolbar button moves from its place in the row to its row in the list
     and shows its label, and the extra `menuItems` come out of the More button below a divider. Closing plays the same
     motion back. The panel opens upward or downward, whichever side has more room, and keeps its place in the layout. */
  function tbReduced() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function tbRel(el, base) { var r = el.getBoundingClientRect(); return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height }; }
  var TB_EASE = 'cubic-bezier(.3, 1.25, .45, 1)', TB_OPEN_MS = 460, TB_CLOSE_MS = 340;

  function Toolbar(p) {
    var items = p.items || [], extra = p.menuItems || [], t = TONES.indexOf(p.tone) >= 0 ? p.tone : 'lilac';
    var moreIdx = -1;
    items.forEach(function (it, i) { if (it.more || (it.icon === 'more-vert' && !it.onClick && moreIdx < 0)) moreIdx = i; });
    var st = R.useState(0), cur = Math.min(st[0], Math.max(0, items.length - 1));
    var md = R.useState('closed'), mode = md[0];               /* closed | open | closing */
    var wrapRef = R.useRef(null), barRef = R.useRef(null), snap = R.useRef(null), anims = R.useRef([]), kb = R.useRef(false);
    var openish = mode !== 'closed';

    function rows() { return barRef.current ? Array.prototype.slice.call(barRef.current.querySelectorAll('[data-tb]')) : []; }
    function stopAnims() { anims.current.forEach(function (a) { try { a.cancel(); } catch (e) {} }); anims.current = []; }
    function measure() {
      var base = wrapRef.current.getBoundingClientRect(), o = { bar: tbRel(barRef.current, base), rows: {} };
      rows().forEach(function (el) { var ic = el.querySelector('.sg-tb-icon') || el; o.rows[el.getAttribute('data-tb')] = tbRel(ic, base); });   /* the icons are what stay visible, so the motion is measured on them */
      return o;
    }
    function openMenu(viaKey) {
      if (mode !== 'closed' || !wrapRef.current) return;
      stopAnims(); kb.current = !!viaKey;
      var m = measure(), r = wrapRef.current.getBoundingClientRect(), vh = window.innerHeight || 800, vw = window.innerWidth || 1200;
      snap.current = { closed: m, up: (vh - r.bottom) < 320 && r.top > (vh - r.bottom), right: r.left + 260 > vw };
      wrapRef.current.style.width = m.bar.w + 'px'; wrapRef.current.style.height = m.bar.h + 'px';
      md[1]('open');
    }
    function closeMenu(focusMore) {
      if (mode !== 'open' || !snap.current) return;
      stopAnims();
      var C = snap.current.closed, O = measure(), reduced = tbReduced(), dur = reduced ? 1 : TB_CLOSE_MS, list = [];
      var bar = barRef.current, moreKey = 'i' + moreIdx;
      list.push(bar.animate([{ width: O.bar.w + 'px', height: O.bar.h + 'px', borderRadius: '24px' }, { width: C.bar.w + 'px', height: C.bar.h + 'px', borderRadius: C.bar.h / 2 + 'px' }], { duration: dur, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' }));
      rows().forEach(function (el, n) {
        var k = el.getAttribute('data-tb'), from = O.rows[k], to = C.rows[k] || C.rows[moreKey]; if (!from || !to) return;
        var dx = (to.x + to.w / 2) - (from.x + from.w / 2), dy = (to.y + to.h / 2) - (from.y + from.h / 2), isExtra = !C.rows[k];
        list.push(el.animate([{ transform: 'none', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px)' + (isExtra ? ' scale(.5)' : ''), opacity: isExtra ? 0 : 1 }], { duration: dur, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards', delay: reduced ? 0 : Math.min(60, n * 8) }));
        var lab = el.querySelector('.sg-tb-label'); if (lab) list.push(lab.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur * 0.4, fill: 'forwards' }));
      });
      anims.current = list; md[1]('closing');
      var done = function () { md[1]('closed'); if (focusMore) setTimeout(function () { var b = barRef.current && barRef.current.querySelector('[data-tb="' + moreKey + '"]'); if (b) b.focus({ preventScroll: true }); }, 0); };
      if (list[0]) list[0].onfinish = done; else done();
    }

    R.useLayoutEffect(function () {
      if (mode === 'open' && snap.current && !snap.current.played) {
        snap.current.played = true; snap.prevOpen = true;
        var bar = barRef.current, moreKey = 'i' + moreIdx;
        /* fix the rows to the panel's final inner width, so they do not stretch while the panel's width animates */
        bar.style.removeProperty('--tb-row-w');
        var inner = bar.clientWidth - parseFloat(getComputedStyle(bar).paddingLeft) - parseFloat(getComputedStyle(bar).paddingRight);
        bar.style.setProperty('--tb-row-w', inner + 'px');
        var C = snap.current.closed, O = measure(), reduced = tbReduced(), dur = reduced ? 1 : TB_OPEN_MS, list = [];
        list.push(bar.animate([{ width: C.bar.w + 'px', height: C.bar.h + 'px', borderRadius: C.bar.h / 2 + 'px' }, { width: O.bar.w + 'px', height: O.bar.h + 'px', borderRadius: '24px' }], { duration: dur, easing: TB_EASE }));
        rows().forEach(function (el, n) {
          var k = el.getAttribute('data-tb'), to = O.rows[k], from = C.rows[k] || C.rows[moreKey]; if (!from || !to) return;
          var dx = (from.x + from.w / 2) - (to.x + to.w / 2), dy = (from.y + from.h / 2) - (to.y + to.h / 2), isExtra = !C.rows[k];
          list.push(el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' + (isExtra ? ' scale(.5)' : ''), opacity: isExtra ? 0 : 1 }, { transform: 'none', opacity: 1 }], { duration: dur, easing: TB_EASE, delay: reduced ? 0 : n * 22, fill: 'backwards' }));
          var lab = el.querySelector('.sg-tb-label'); if (lab && !isExtra) list.push(lab.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur * 0.6, delay: reduced ? 0 : dur * 0.35 + n * 22, fill: 'backwards', easing: 'ease-out' }));
        });
        var sep = bar.querySelector('.sg-tb-sep'); if (sep) list.push(sep.animate([{ opacity: 0, transform: 'scaleX(.3)' }, { opacity: 1, transform: 'none' }], { duration: dur * 0.6, delay: reduced ? 0 : dur * 0.4, fill: 'backwards', easing: 'ease-out' }));
        var mi = bar.querySelector('.sg-tb-more .sg-tb-icon'); if (mi) list.push(mi.animate([{ transform: 'rotate(-90deg) scale(.5)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: dur * 0.7, easing: TB_EASE }));
        anims.current = list; if (list[0]) list[0].onfinish = function () { if (barRef.current) barRef.current.scrollTop = 0; };
        if (kb.current) { var first = bar.querySelector('[data-tb]:not(:disabled)'); if (first) first.focus({ preventScroll: true }); }
      }
      if (mode === 'closed') {
        stopAnims(); snap.current = null; if (barRef.current) barRef.current.style.removeProperty('--tb-row-w');
        var wasOpen = !!snap.prevOpen; snap.prevOpen = false;
        var ic = wasOpen && !tbReduced() && barRef.current && barRef.current.querySelector('.sg-tb-more .sg-tb-icon');
        if (ic) ic.animate([{ transform: 'rotate(90deg) scale(.5)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 300, easing: TB_EASE });
        if (wrapRef.current) { wrapRef.current.style.width = ''; wrapRef.current.style.height = ''; }
      }
    }, [mode]);

    R.useEffect(function () {
      if (mode !== 'open') return;
      function down(e) { if (barRef.current && !barRef.current.contains(e.target)) closeMenu(false); }
      function esc(e) { if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); } }
      document.addEventListener('pointerdown', down, true); document.addEventListener('keydown', esc);
      return function () { document.removeEventListener('pointerdown', down, true); document.removeEventListener('keydown', esc); };
    });

    function onKey(e) {
      if (openish) {
        var list = rows().filter(function (b) { return !b.disabled; }), i = list.indexOf(document.activeElement);
        var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : e.key === 'Home' ? -i : e.key === 'End' ? list.length - 1 - i : 0;
        if (!d || !list.length) return; e.preventDefault(); list[(i + d + list.length) % list.length].focus({ preventScroll: true }); return;
      }
      var d2 = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -cur : e.key === 'End' ? items.length - 1 - cur : 0;
      if (!d2) return; e.preventDefault();
      var next = (cur + d2 + items.length) % items.length; st[1](next);
      var btns = e.currentTarget.querySelectorAll('.sg-tb-item'); if (btns[next]) btns[next].focus({ preventScroll: true });
    }
    function btn(it, key, i, isMore, isExtra) {
      var label = isMore && openish ? (p.closeLabel || 'Close') : it.label;
      return h('button', {
        key: key, type: 'button', 'data-tb': key, disabled: it.disabled, title: openish ? undefined : label,
        'aria-label': openish ? undefined : label,
        'aria-haspopup': isMore ? 'menu' : undefined, 'aria-expanded': isMore ? String(mode === 'open') : undefined,
        role: isExtra ? 'menuitem' : undefined,
        tabIndex: openish ? (isMore ? 0 : -1) : (i === cur ? 0 : -1),
        onFocus: isExtra || openish ? undefined : function () { st[1](i); },
        onClick: function (e) {
          if (isMore) { if (mode === 'open') closeMenu(true); else openMenu(e.detail === 0); return; }
          if (it.onClick) it.onClick(e);
          if (mode === 'open') closeMenu(true);
        },
        className: cx('sg-iconbtn sg-v-bare sg-tb-btn sg-focusable sg-spot sg-jelly', !isExtra && 'sg-tb-item', isMore && 'sg-tb-more', tone(t, 'lilac'))
      }, h('span', { className: 'sg-tb-icon' }, h(Icon, { name: isMore && openish ? 'close' : it.icon, filled: p.filled !== false, size: 24 })),
        h('span', { className: 'sg-tb-label' }, label));
    }
    var dir = snap.current ? (snap.current.up ? ' is-up' : ' is-down') + (snap.current.right ? ' is-right' : '') : '';
    var kids = [];
    items.forEach(function (it, i) { if (i !== moreIdx) kids.push(btn(it, 'i' + i, i, false, false)); });
    if (openish && extra.length) {
      kids.push(h('div', { key: 'sep', className: 'sg-tb-sep', role: 'separator' }));
      kids.push(h('div', { key: 'menu', role: 'menu', 'aria-label': p.menuLabel || (items[moreIdx] && items[moreIdx].label) || 'More', className: 'sg-tb-menu' },
        extra.map(function (it, j) { return btn(it, 'x' + j, -1, false, true); })));
    }
    if (moreIdx >= 0) { var mb = btn(items[moreIdx], 'i' + moreIdx, moreIdx, true, false); if (openish && snap.current && !snap.current.up) kids.unshift(mb); else kids.push(mb); }
    return h('div', { ref: wrapRef, className: cx('sg-tb-wrap', openish && 'is-open') },
      h('div', { ref: barRef, role: 'toolbar', 'aria-label': p['aria-label'], 'aria-orientation': openish ? 'vertical' : 'horizontal', onKeyDown: onKey,
        className: cx('sg-toolbar sg-glass', tone(t, 'lilac'), openish && 'is-open' + dir, p.className) }, kids));
  }

  /* Fab: a floating action button, a square with large rounded corners (about 29% of its side).
     With children it becomes the extended form: icon and label in a rounded rectangle of the same height. */
  function Fab(p) {
    var ext = p.children != null && p.children !== false;
    var rest = omit(p, ['tone', 'size', 'icon', 'label', 'children', 'className', 'filled']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      'aria-label': ext ? undefined : p.label, title: ext ? undefined : p.label,
      className: cx('sg-fab sg-glass sg-focusable', ext && 'sg-fab-ext', tone(p.tone, ext ? 'aqua' : 'coral'), 'sg-size-' + (p.size || 'md'), p.className)
    }), h(Icon, { name: p.icon || 'plus', filled: !!p.filled, size: p.size === 'lg' ? 34 : 28 }), ext ? h('span', { className: 'sg-fab-label' }, p.children) : null);
  }

  /* SwatchPicker: a radio group of glass discs in any colour. Each disc derives its own fill, highlight, bottom glow
     and ink from the one colour it is given, so the glass reads the same as the tone surfaces. */
  function SwatchPicker(p) {
    var opts = p.options || [];
    var st = R.useState(p.defaultValue != null ? p.defaultValue : (opts[0] && opts[0].id));
    var value = p.value != null ? p.value : st[0];
    function pick(id) { if (p.value == null) st[1](id); if (p.onChange) p.onChange(id); }
    function onKey(e) {
      var i = opts.findIndex(function (o) { return o.id === value; });
      var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!d) return; e.preventDefault();
      var next = opts[(i + d + opts.length) % opts.length]; pick(next.id);
      var el = e.currentTarget.querySelector('[data-id="' + next.id + '"]'); if (el) el.focus();
    }
    return h('div', { role: 'radiogroup', 'aria-label': p['aria-label'], onKeyDown: onKey, className: cx('sg-swatches', 'sg-size-' + (p.size || 'md'), p.className) },
      opts.map(function (o) {
        var on = o.id === value;
        return h('button', {
          key: o.id, type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false', 'aria-label': o.label, title: o.label,
          tabIndex: on ? 0 : -1, 'data-id': o.id, className: 'sg-swatch sg-glass sg-focusable', style: { '--sg-swatch': o.color },
          onClick: function () { pick(o.id); }
        }, on ? h(Icon, { name: 'check', size: p.size === 'lg' ? 30 : 20 }) : null);
      }));
  }

  /* ToggleButton: an icon toggle with its label below. Off, a flat plain pill on the surface (no glass, no shadow);
     on, it turns into a glass rounded square in its tone, the corners and the glass easing in together. */
  /* MenuPanel: a glass menu that grows out of a control (the anchor) and shrinks back into it. It opens next to the
     control, on the side with more room (above it, or below its label), aligned to the control's left or right edge,
     and animates from a box lying exactly on the control to its own box; the rows slide out of the control one after
     another. Used by ToggleButton. */
  function MenuPanel(p) {
    var ref = R.useRef(null), anims = R.useRef([]);
    var place = R.useState(null), pl = place[0];
    R.useLayoutEffect(function () {
      var wrap = p.wrapRef.current, a = p.anchorRef.current; if (!wrap || !a) return;
      var wr = wrap.getBoundingClientRect(), ar = a.getBoundingClientRect(), vh = window.innerHeight || 800, vw = window.innerWidth || 1200;
      var up = (vh - ar.bottom) < 300 && ar.top > (vh - ar.bottom), right = ar.left + 240 > vw;
      place[1]({ up: up, right: right, a: { x: ar.left - wr.left, y: ar.top - wr.top, w: ar.width, h: ar.height, r: parseFloat(getComputedStyle(a).borderTopLeftRadius) || 16 }, ww: wr.width, wh: wr.height });
    }, []);
    function stop() { anims.current.forEach(function (x) { try { x.cancel(); } catch (e) {} }); anims.current = []; }
    R.useLayoutEffect(function () {
      var el = ref.current; if (!el || !pl) return;
      stop();
      var reduced = tbReduced(), A = pl.a, w = el.offsetWidth, hgt = el.offsetHeight, closing = p.closing;
      var dur = reduced ? 1 : (closing ? 300 : 440), ease = closing ? 'cubic-bezier(.4, 0, .2, 1)' : TB_EASE;
      /* the start box sits exactly on the control: same size, shifted back over it */
      var shift = pl.up ? A.h + 8 : A.y - (pl.wh + 8);
      var box0 = { width: A.w + 'px', height: A.h + 'px', borderRadius: A.r + 'px', transform: 'translateY(' + shift + 'px)', opacity: 0.6 };
      var box1 = { width: w + 'px', height: hgt + 'px', borderRadius: '22px', transform: 'none', opacity: 1 };
      if (closing) { box0.opacity = 0; }
      var list = [el.animate(closing ? [box1, box0] : [box0, box1], { duration: dur, easing: ease, fill: closing ? 'forwards' : 'none' })];
      /* rows start (or end) at the anchor's centre */
      var er = el.getBoundingClientRect(), wr = p.wrapRef.current.getBoundingClientRect(), acx = wr.left + A.x + A.w / 2, acy = wr.top + A.y + A.h / 2;
      Array.prototype.forEach.call(el.querySelectorAll('.sg-menu-item'), function (row, n) {
        var rr = row.getBoundingClientRect(), dx = acx - (rr.left + 22), dy = acy - (rr.top + rr.height / 2);
        var k0 = { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.6)', opacity: 0 }, k1 = { transform: 'none', opacity: 1 };
        list.push(row.animate(closing ? [k1, k0] : [k0, k1], { duration: dur, easing: ease, delay: reduced ? 0 : (closing ? 0 : 40 + n * 26), fill: closing ? 'forwards' : 'backwards' }));
      });
      anims.current = list;
      if (closing) list[0].onfinish = function () { p.onClosed(); };
      else if (p.focusFirst) { var f = el.querySelector('.sg-menu-item:not(:disabled)'); if (f) f.focus({ preventScroll: true }); }
      return stop;
    }, [pl, p.closing]);
    R.useEffect(function () {
      if (p.closing) return;
      function down(e) { var w = p.wrapRef.current; if (w && !w.contains(e.target)) p.onClose(false); }
      function key(e) { if (e.key === 'Escape') { e.preventDefault(); p.onClose(true); } }
      document.addEventListener('pointerdown', down, true); document.addEventListener('keydown', key);
      return function () { document.removeEventListener('pointerdown', down, true); document.removeEventListener('keydown', key); };
    });
    function onKey(e) {
      var rows = Array.prototype.slice.call(ref.current.querySelectorAll('.sg-menu-item:not(:disabled)')), i = rows.indexOf(document.activeElement);
      var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : e.key === 'Home' ? -i : e.key === 'End' ? rows.length - 1 - i : 0;
      if (!d || !rows.length) return; e.preventDefault(); rows[(i + d + rows.length) % rows.length].focus({ preventScroll: true });
    }
    var style = { visibility: pl ? 'visible' : 'hidden' };
    if (pl) {
      /* next to the control, clear of it and of its label, so the control stays visible and clickable */
      if (pl.up) style.bottom = (pl.wh - pl.a.y + 8) + 'px'; else style.top = (pl.wh + 8) + 'px';
      if (pl.right) style.right = (pl.ww - pl.a.x - pl.a.w) + 'px'; else style.left = pl.a.x + 'px';
    }
    return h('div', { ref: ref, role: 'menu', 'aria-label': p.label, onKeyDown: onKey, style: style,
      className: cx('sg-menu sg-glass', tone(p.tone, 'frost'), pl && (pl.up ? 'is-up' : 'is-down')) },
      (p.items || []).map(function (it, j) {
        return h('button', { key: it.id || j, type: 'button', role: 'menuitem', disabled: it.disabled, tabIndex: -1,
          className: 'sg-menu-item sg-focusable sg-spot sg-jelly',
          onClick: function (e) { if (it.onClick) it.onClick(e); p.onClose(true); } },
          it.icon ? h(Icon, { name: it.icon, filled: !!it.filled, size: 22 }) : h('span', { className: 'sg-menu-noicon' }), h('span', null, it.label));
      }));
  }

  /* ToggleButton: an icon toggle with its label below. Off, a flat plain pill on the surface (no glass, no shadow);
     on, it turns into a glass rounded square in its tone, the corners and the glass easing in together.
     With `menuItems` it is a menu button instead (for "More"): it does not toggle, it shows as on while its menu is
     open, and the menu grows out of it. */
  function ToggleButton(p) {
    var st = R.useState(!!p.defaultPressed), menu = p.menuItems && p.menuItems.length ? p.menuItems : null;
    var ms = R.useState('closed'), mode = ms[0], kbOpen = R.useRef(false);
    var wrapRef = R.useRef(null), faceRef = R.useRef(null), btnRef = R.useRef(null);
    var on = menu ? mode === 'open' : (p.pressed != null ? !!p.pressed : st[0]), tog = !menu && p.toggle !== false;
    function click(e) {
      if (menu) { if (mode === 'open') ms[1]('closing'); else if (mode === 'closed') { kbOpen.current = e.detail === 0; ms[1]('open'); } if (p.onClick) p.onClick(e); return; }
      if (tog) { if (p.pressed == null) st[1](!on); if (p.onChange) p.onChange(!on); } if (p.onClick) p.onClick(e);
    }
    var rest = omit(p, ['tone', 'size', 'icon', 'label', 'pressed', 'defaultPressed', 'onChange', 'onClick', 'toggle', 'className', 'filled', 'menuItems', 'menuLabel', 'menuTone']);
    var button = h('button', Object.assign({ type: 'button', ref: btnRef }, rest, {
      'aria-pressed': tog ? String(on) : undefined, onClick: click,
      'aria-haspopup': menu ? 'menu' : undefined, 'aria-expanded': menu ? String(mode === 'open') : undefined,
      className: cx('sg-toggle sg-focusable sg-jelly-host', tone(p.tone, 'aqua'), 'sg-size-' + (p.size || 'md'), on && 'is-on', !menu && p.className)
    }), h('span', { ref: faceRef, className: 'sg-toggle-face sg-glass' },
        h(Icon, { name: p.icon || 'plus', filled: p.filled !== false, size: p.size === 'sm' ? 26 : 34 })),
      h('span', { className: 'sg-toggle-label' }, p.label));
    if (!menu) return button;
    return h('span', { ref: wrapRef, className: cx('sg-toggle-wrap', p.className) }, button,
      mode !== 'closed' ? h(MenuPanel, { wrapRef: wrapRef, anchorRef: faceRef, items: menu, label: p.menuLabel || p.label, tone: p.menuTone,
        closing: mode === 'closing', focusFirst: kbOpen.current,
        onClose: function (refocus) { if (mode === 'open') { ms[1]('closing'); if (refocus && btnRef.current) btnRef.current.focus({ preventScroll: true }); } },
        onClosed: function () { ms[1]('closed'); } }) : null);
  }

  /* Adjustable glass parameters: one list for docs and tools. Each is a CSS custom property; `unit` is appended to the
     number. Grain (group 'grain') applies to the whole page and redraws the grain tiles; the others can be set on any
     element. Defaults match bundle.css. */
  var PARAMS = [
    { id: 'grain', css: '--opacity-grain', def: 0.3, min: 0, max: 0.6, step: 0.01, unit: '', group: 'grain' },
    { id: 'fleckDark', css: '--sg-fleck-dark', def: 10, min: 0, max: 30, step: 0.5, unit: '', group: 'grain' },
    { id: 'fleckLight', css: '--sg-fleck-light', def: 5, min: 0, max: 30, step: 0.5, unit: '', group: 'grain' },
    { id: 'fleckSize', css: '--sg-fleck-size', def: 1, min: 0.4, max: 2.5, step: 0.05, unit: '', group: 'grain' },
    { id: 'fleckStretch', css: '--sg-fleck-stretch', def: 1, min: 0.3, max: 2.5, step: 0.05, unit: '', group: 'grain' },
    { id: 'fleckDarkAlpha', css: '--sg-fleck-dark-alpha', def: 1, min: 0, max: 2, step: 0.05, unit: '', group: 'grain' },
    { id: 'fleckLightAlpha', css: '--sg-fleck-light-alpha', def: 1, min: 0, max: 1.25, step: 0.05, unit: '', group: 'grain' },
    { id: 'grainReach', css: '--sg-grain-reach', def: 0.7, min: 0, max: 1.5, step: 0.05, unit: '', group: 'grain' },
    { id: 'bandY', css: '--sg-band-y', def: 48, min: 20, max: 80, step: 1, unit: '%', group: 'band' },
    { id: 'bandSpread', css: '--sg-band-spread', def: 24, min: 5, max: 50, step: 1, unit: '%', group: 'band' },
    { id: 'bandStrength', css: '--sg-band-strength', def: 38, min: 0, max: 100, step: 1, unit: '%', group: 'band' },
    { id: 'bandDepth', css: '--sg-band-depth', def: 16, min: 0, max: 50, step: 1, unit: '%', group: 'band' },
    { id: 'spotStrength', css: '--sg-spot-strength', def: 40, min: 0, max: 100, step: 1, unit: '%', group: 'band' },
    { id: 'spotWidth', css: '--sg-spot-width', def: 32, min: 10, max: 60, step: 1, unit: '%', group: 'band' },
    { id: 'glowStart', css: '--sg-glow-start', def: 62, min: 30, max: 95, step: 1, unit: '%', group: 'light' },
    { id: 'glowMid', css: '--sg-glow-mid', def: 50, min: 0, max: 100, step: 1, unit: '%', group: 'light' },
    { id: 'edgeGlow', css: '--sg-edge-glow', def: 85, min: 0, max: 100, step: 1, unit: '%', group: 'light' },
    { id: 'highlightWidth', css: '--sg-highlight-width', def: 1, min: 0, max: 2, step: 0.05, unit: '', group: 'light' },
    { id: 'topLight', css: '--sg-top-light', def: 20, min: 0, max: 60, step: 1, unit: '%', group: 'light' },
    { id: 'topLine', css: '--sg-top-line', def: 6, min: 0, max: 30, step: 1, unit: '%', group: 'light' },
    { id: 'shadowY', css: '--sg-shadow-y', def: 0.85, min: 0, max: 2, step: 0.05, unit: '', group: 'shadow' },
    { id: 'shadowBlur', css: '--sg-shadow-blur', def: 0.15, min: 0, max: 1, step: 0.01, unit: '', group: 'shadow' },
    { id: 'castLight', css: '--sg-cast-light', def: 60, min: 0, max: 100, step: 1, unit: '%', group: 'shadow' }
  ];
  function paramById(id) { for (var i = 0; i < PARAMS.length; i++) if (PARAMS[i].id === id || PARAMS[i].css === id) return PARAMS[i]; return null; }
  /* setParams({ bandStrength: 50, shadowY: 1 }, el?) — numbers get the parameter's unit; null removes the override.
     Without el the values go on :root. Grain values always go on :root and redraw the tiles. */
  function setParams(values, el) {
    var regrain = false, rimAgain = false;
    for (var k in values) {
      var d = paramById(k); if (!d) continue;
      var target = (d.group === 'grain' || !el) ? document.documentElement : el, v = values[k];
      if (v == null) target.style.removeProperty(d.css); else target.style.setProperty(d.css, typeof v === 'number' ? v + d.unit : String(v));
      if (d.group === 'grain' && d.id !== 'grain' && d.id !== 'grainReach') regrain = true;
      if (d.id === 'highlightWidth' || d.id === 'edgeGlow') rimAgain = true;
    }
    /* redrawing the tiles takes a few tens of ms: wait until a slider has paused */
    if (regrain && window.__sgRegrain) { clearTimeout(setParams.t); setParams.t = setTimeout(window.__sgRegrain, 120); }
    if (rimAgain) rimRefreshAll();
  }
  function getParams(el) {
    var cs = getComputedStyle(el || document.documentElement), o = {};
    for (var i = 0; i < PARAMS.length; i++) { var v = parseFloat(cs.getPropertyValue(PARAMS[i].css)); o[PARAMS[i].id] = isFinite(v) ? v : PARAMS[i].def; }
    return o;
  }
  function resetParams(el) { var o = {}; for (var i = 0; i < PARAMS.length; i++) o[PARAMS[i].id] = null; setParams(o, el); }

  var api = { Button: Button, IconButton: IconButton, SegmentedNav: SegmentedNav, PromptBar: PromptBar, Chip: Chip, GlassCard: GlassCard, Meter: Meter, Sparkline: Sparkline, Slider: Slider, ScrollArea: ScrollArea, Toolbar: Toolbar, Fab: Fab, SwatchPicker: SwatchPicker, ToggleButton: ToggleButton, MenuPanel: MenuPanel, Icon: Icon, tones: TONES, params: PARAMS, setParams: setParams, getParams: getParams, resetParams: resetParams, refreshGrain: function () { if (BROWSER && window.__sgRefreshGrain) window.__sgRefreshGrain(); } };
  return api;
});
