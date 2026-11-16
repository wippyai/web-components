import { ref as ft, inject as ki, createApp as oo, defineComponent as ao, computed as pt, openBlock as nn, createElementBlock as sn } from "vue";
import { addCollection as lo } from "@iconify/vue";
import { config as on, addIcons as co, on as uo, applyThemeMode as dt, host as ho, hostCss as fo, loadCss as po, define as mo } from "@wippy-fe/proxy";
import { getActivePinia as go, createPinia as bo, setActivePinia as xo } from "pinia";
var Er = "data-wippy-visible";
function an(e) {
  const t = e.getAttribute(Er);
  return t === "true" ? !0 : t === "false" ? !1 : null;
}
var wo = Object.defineProperty, vo = (e, t, r) => t in e ? wo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => vo(e, typeof t != "symbol" ? t + "" : t, r), yo = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], _o = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function ln(e) {
  const t = e.startsWith("--") ? e : `--${e}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(t) ? t : null;
}
function ko(...e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e)
    if (r)
      for (const [n, i] of Object.entries(r)) {
        if ((n === "@light" || n === "@dark") && i && typeof i == "object") {
          for (const [o, l] of Object.entries(i)) {
            const f = typeof l == "string" ? ln(o) : null;
            f && t.add(f);
          }
          continue;
        }
        const s = typeof i == "string" ? ln(n) : null;
        s && t.add(s);
      }
  return [...t].sort();
}
function Co(e) {
  if (e.length === 0)
    return "";
  const t = e.map((r) => `  ${r}: inherit;`).join(`
`);
  return `${_o} {
${t}
}`;
}
function Ro(e, t) {
  const r = Co(t);
  r && Ci(e, r, "@wippy-fe/css-variables-bridge");
}
function Ao(e, t) {
  const n = (t ?? yo).map(async (i) => {
    const s = fo[i];
    if (!s)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${i}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await po(s);
    } catch (o) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${i}" (${s}):`, o), null;
    }
  });
  return Promise.all(n).then((i) => {
    for (const s of i) {
      if (!s)
        continue;
      const o = document.createElement("style");
      o.textContent = s, o.setAttribute("role", "@wippy-fe/host-css"), e.appendChild(o);
    }
  });
}
function Eo(e, t) {
  const r = document.createElement("style");
  r.textContent = t, e.appendChild(r);
}
function Ci(e, t, r) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const i = new CSSStyleSheet();
    i.replaceSync(t), e.adoptedStyleSheets = [...e.adoptedStyleSheets, i];
    return;
  }
  const n = document.createElement("style");
  n.setAttribute("role", r), n.textContent = t, e.appendChild(n);
}
function So(e, t) {
  Ci(e, t, "@wippy-fe/custom-css");
}
function Ri(e) {
  return e.__wippyHost ?? null;
}
function Do(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function Io(e, t, r) {
  switch (r.type) {
    case "string":
      return { value: t };
    case "number": {
      const n = Number.parseFloat(t);
      return Number.isNaN(n) ? { value: void 0, error: `Invalid ${e}: expected a number` } : { value: n };
    }
    case "integer": {
      const n = Number.parseInt(t, 10);
      return Number.isNaN(n) ? { value: void 0, error: `Invalid ${e}: expected an integer` } : { value: n };
    }
    case "boolean":
      return { value: t !== "false" };
    case "array":
    case "object":
      try {
        const n = JSON.parse(t);
        return r.type === "array" && !Array.isArray(n) ? { value: void 0, error: `Invalid ${e}: expected a JSON array` } : { value: n };
      } catch {
        return { value: void 0, error: `Invalid ${e}: must be valid JSON` };
      }
    default:
      return { value: t };
  }
}
function zt(e, t) {
  const r = {}, n = [];
  for (const [i, s] of Object.entries(t.properties)) {
    const o = e.getAttribute(i), l = Do(i);
    if (o === null) {
      s.default !== void 0 && (r[l] = s.default);
      continue;
    }
    const f = Io(i, o, s);
    f.error ? n.push(f.error) : r[l] = f.value;
  }
  return { props: r, errors: n };
}
var To = class {
  constructor(e, t) {
    oe(this, "_props"), oe(this, "_errors"), oe(this, "_content"), oe(this, "_hostVisibility"), oe(this, "_propsListeners", /* @__PURE__ */ new Set()), oe(this, "_contentListeners", /* @__PURE__ */ new Set()), oe(this, "_hostVisibilityListeners", /* @__PURE__ */ new Set()), oe(this, "_disposed", !1), oe(this, "_emitToDom"), oe(this, "props"), oe(this, "events"), oe(this, "content"), oe(this, "hostVisibility"), this._props = e.props, this._errors = e.errors, this._content = e.content, this._hostVisibility = e.hostVisibility, this._emitToDom = t;
    const r = this;
    this.props = {
      get value() {
        return r._props;
      },
      get errors() {
        return r._errors;
      },
      subscribe(n, i) {
        return r._subscribeProps(n, i);
      }
    }, this.events = {
      emit(n, i) {
        r._disposed || r._emitToDom(n, i);
      }
    }, this.content = e.hasContent ? {
      get value() {
        return r._content;
      },
      subscribe(n, i) {
        return r._subscribeContent(n, i);
      }
    } : null, this.hostVisibility = {
      get value() {
        return r._hostVisibility;
      },
      subscribe(n, i) {
        return r._subscribeHostVisibility(n, i);
      }
    };
  }
  /** @internal */
  notifyProps(e, t) {
    if (!this._disposed) {
      this._props = e, this._errors = t;
      for (const r of this._propsListeners)
        r(e, t);
    }
  }
  /** @internal */
  notifyContent(e) {
    if (!this._disposed) {
      this._content = e;
      for (const t of this._contentListeners)
        t(e);
    }
  }
  /** @internal */
  notifyHostVisibility(e, t) {
    if (!(this._disposed || e === t)) {
      this._hostVisibility = e;
      for (const r of this._hostVisibilityListeners)
        r(e, t);
    }
  }
  /** @internal */
  dispose() {
    this._disposed || (this._disposed = !0, this._propsListeners.clear(), this._contentListeners.clear(), this._hostVisibilityListeners.clear());
  }
  _subscribeProps(e, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._propsListeners.add(e), t?.immediate && e(this._props, this._errors);
    const r = () => {
      this._propsListeners.delete(e), t?.signal?.removeEventListener("abort", r);
    };
    return t?.signal?.addEventListener("abort", r, { once: !0 }), r;
  }
  _subscribeContent(e, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._contentListeners.add(e), t?.immediate && e(this._content);
    const r = () => {
      this._contentListeners.delete(e), t?.signal?.removeEventListener("abort", r);
    };
    return t?.signal?.addEventListener("abort", r, { once: !0 }), r;
  }
  _subscribeHostVisibility(e, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._hostVisibilityListeners.add(e), t?.immediate && e(this._hostVisibility, this._hostVisibility);
    const r = () => {
      this._hostVisibilityListeners.delete(e), t?.signal?.removeEventListener("abort", r);
    };
    return t?.signal?.addEventListener("abort", r, { once: !0 }), r;
  }
}, Fo = class extends HTMLElement {
  constructor() {
    super(), oe(this, "_internals"), oe(this, "_contentObserver", null), oe(this, "_initialized", !1), oe(this, "_container", null), oe(this, "_reactive", null), oe(this, "_lastProps", null), oe(this, "_lastErrors", []), oe(this, "_lastContent", null), oe(this, "_themeUnsub", null), oe(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = an(this);
  }
  /**
   * Override to provide the component's configuration.
   * Must be static because `observedAttributes` reads it before construction.
   *
   * Specify the generic to get typed `validateProps`:
   * ```ts
   * static get wippyConfig(): WippyElementConfig<MyProps> { ... }
   * ```
   */
  static get wippyConfig() {
    return { propsSchema: { properties: {} } };
  }
  /**
   * Derived from the props schema + any `extraObservedAttributes`.
   */
  static get observedAttributes() {
    const e = this.wippyConfig, t = Object.keys(e.propsSchema.properties), r = e.extraObservedAttributes ?? [];
    return [.../* @__PURE__ */ new Set([...t, ...r, Er])];
  }
  /**
   * Host-owned logical activity. `null` means no host manages this element.
   * It is not CSS visibility or viewport intersection.
   */
  get hostVisible() {
    return this._hostVisible;
  }
  /**
   * Panel-scoped `host` wrapper attached by the managed-layout shell's
   * content resolvers (`ComponentResolver` / `WebComponentPackageLoader`).
   *
   * Inside a managed-layout panel, this is a wrapper around the universal
   * `host` API where context-aware calls (`layout.broadcast / send / on`)
   * are routed through the panel-bound bus — so `sourcePanelId` is
   * attributed correctly without postMessage indirection. Layout
   * mutations and other host methods pass through unchanged.
   *
   * `null` outside a managed-layout context (compat shell, chat sidebar,
   * standalone playground). Subclass code that needs a host in those
   * cases can fall back to `import { host } from '@wippy-fe/proxy'`.
   */
  get host() {
    return Ri(this);
  }
  /**
   * Emit a CustomEvent that bubbles and crosses shadow DOM boundaries.
   */
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, {
      bubbles: !0,
      composed: !0,
      detail: t
    }));
  }
  /**
   * Opt-in reactive adapter — framework-agnostic. Subscribe to prop
   * changes, content changes, or emit typed events from a non-Vue
   * consumer without re-rolling reactivity.
   *
   * ```ts
   * class MyEl extends WippyElement<{ count: number }, { tick: { n: number } }> {
   *   protected onMount() {
   *     const ctrl = new AbortController()
   *     this.reactive.props.subscribe(({ count }) => {
   *       this.shadowRoot!.querySelector('.n')!.textContent = String(count)
   *     }, { signal: ctrl.signal, immediate: true })
   *   }
   *   tick(n: number) { this.reactive.events.emit('tick', { n }) }
   * }
   * ```
   *
   * Allocation cost is zero unless this getter is touched. Disposed on
   * `disconnectedCallback`; a fresh adapter is allocated on the next
   * access after reconnect.
   */
  get reactive() {
    if (!this._reactive) {
      const e = this.constructor.wippyConfig, t = !!e.contentTemplate;
      let r, n;
      if (this._lastProps !== null)
        r = this._lastProps, n = this._lastErrors;
      else {
        const s = zt(this, e.propsSchema);
        e.validateProps && s.errors.push(...e.validateProps(s.props)), r = s.props, n = s.errors, this._lastProps = r, this._lastErrors = n;
      }
      const i = t ? this._lastContent ?? this._extractContent(e.contentTemplate) : null;
      t && this._lastContent === null && (this._lastContent = i), this._reactive = new To(
        { props: r, errors: n, content: i, hasContent: t, hostVisibility: this._hostVisible },
        this.emitEvent.bind(this)
      );
    }
    return this._reactive;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    this._internals.states.add("loading");
    try {
      const e = this.constructor.wippyConfig, t = this._initialized, r = this.shadowRoot ?? this.attachShadow({ mode: e.shadowMode ?? "open" });
      let n;
      if (t)
        n = this._container;
      else {
        this.onInit(r), e.inlineCss && Eo(r, e.inlineCss);
        try {
          const c = on?.theming, d = ko(
            c?.global?.cssVariables,
            c?.children?.cssVariables
          );
          Ro(r, d);
        } catch {
        }
        if (e.customCss !== !1)
          try {
            const c = on?.theming, d = [c?.global?.customCSS, c?.children?.customCSS].filter(Boolean).join(`
`);
            d && So(r, d);
          } catch {
          }
        (e.hostCssKeys === void 0 || e.hostCssKeys.length > 0) && Ao(r, e.hostCssKeys), n = document.createElement("div"), n.setAttribute("data-wippy-theme-root", "");
        const f = e.containerClasses ?? [];
        f.length > 0 && n.classList.add(...f), r.appendChild(n), this._container = n, co(lo);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = uo("@theme", (f) => this._applyTheme(f)));
      const { props: i, errors: s } = zt(this, e.propsSchema);
      e.validateProps && s.push(...e.validateProps(i));
      const o = i;
      this._lastProps = o, this._lastErrors = s;
      let l = null;
      e.contentTemplate && (l = this._extractContent(e.contentTemplate), this._lastContent = l, this._contentObserver = new MutationObserver(() => {
        const f = this._extractContent(e.contentTemplate);
        this._lastContent = f, this._reactive?.notifyContent(f), this.onContentChanged(f);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(r, n, o, s, l, t), this._internals.states.delete("loading"), this._internals.states.add("ready"), t || (this._initialized = !0), this.onReady(), this.emitEvent("load");
    } catch (e) {
      this.onError(e), this._internals.states.delete("loading"), this._internals.states.add("error"), this.emitEvent("error", {
        message: e instanceof Error ? e.message : String(e),
        error: e
      });
    }
  }
  /**
   * Applies a forced theme mode to this host element AND the shadow container.
   * The container class drives in-shadow selectors (Tailwind `dark:` utilities,
   * `.w-theme-dark &`); the host-element class drives `:host(.w-theme-*)`
   * selectors. On `@theme` broadcasts the resolved `mode` is passed in directly
   * (don't re-read `getThemeMode()` — the proxy's config-vs-emit order isn't a
   * contract); on the initial connect it defaults to the host's current mode.
   * No-op for an older proxy without `getThemeMode` — `applyThemeMode` clamps
   * `undefined` to 'auto'.
   */
  _applyTheme(e = ho.getThemeMode?.()) {
    dt(e, this), this._container && dt(e, this._container);
  }
  disconnectedCallback() {
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), dt("auto", this), this._container && dt("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), this.emitEvent("unload"), this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus;
  }
  attributeChangedCallback(e, t, r) {
    if (t === r)
      return;
    if (e === Er) {
      const l = this._hostVisible, f = an(this);
      if (f === l)
        return;
      this._hostVisible = f, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(f, l), this.onHostVisibilityChanged(f, l));
      return;
    }
    const n = this.constructor.wippyConfig, { props: i, errors: s } = zt(this, n.propsSchema);
    n.validateProps && s.push(...n.validateProps(i));
    const o = i;
    this._lastProps = o, this._lastErrors = s, this._reactive?.notifyProps(o, s), this.onPropsChanged(o, s);
  }
  // ── Hooks ──────────────────────────────────────────────────
  /** Called right after shadow DOM is attached, before CSS or container. */
  onInit(e) {
  }
  /** Called after internals state is set to ready, before the `load` event. */
  onReady() {
  }
  /** Called when connectedCallback throws. Default logs to console. */
  onError(e) {
    console.error(`${this.constructor.name} initialization failed:`, e);
  }
  /** Called when observed attributes change. Override to update framework state. */
  onPropsChanged(e, t) {
  }
  /**
   * Called when the host changes logical activity. `null` means unmanaged.
   * This does not imply a DOM remount or a CSS/viewport visibility change.
   */
  onHostVisibilityChanged(e, t) {
  }
  /**
   * Extract text from a child `<template data-type="...">` element.
   *
   * A template keeps its children in one of two places. Parsed HTML (page
   * markup, `innerHTML`) puts them in `template.content`, a DocumentFragment.
   * DOM APIs add them as the template element's own child nodes and leave
   * `template.content` empty: that is how a Vue SFC sets
   * `<template data-type="...">{{ text }}</template>`. The content fragment is
   * read first, then the element's own children. Only text is returned, never
   * markup, in both cases.
   */
  _extractContent(e) {
    const t = this.querySelector(`template[data-type="${e}"]`);
    return t ? t.content.textContent?.trim() || t.textContent?.trim() || "" : null;
  }
  /** Called when child `<template>` content changes. Override to update framework state. */
  onContentChanged(e) {
  }
};
function No(e) {
  return e.__wippyHostBus ?? null;
}
function Oo(e) {
  return e.dataset.wippyPanelId ?? null;
}
var Bo = Object.defineProperty, Mo = (e, t, r) => t in e ? Bo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Je = (e, t, r) => Mo(e, typeof t != "symbol" ? t + "" : t, r), Po = /* @__PURE__ */ Symbol("wippy:emit"), Ai = /* @__PURE__ */ Symbol("wippy:props"), Lo = /* @__PURE__ */ Symbol("wippy:props_error"), Ei = /* @__PURE__ */ Symbol("wippy:content"), qo = /* @__PURE__ */ Symbol("wippy:panel-id"), zo = /* @__PURE__ */ Symbol("wippy:layout-bus"), jo = /* @__PURE__ */ Symbol("wippy:host"), $o = /* @__PURE__ */ Symbol("wippy:host-visibility");
function Uo() {
  const e = ki(Ai);
  if (!e)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return e;
}
function Jo() {
  const e = ki(Ei);
  if (!e)
    throw new Error("useContent() must be called inside a WippyVueElement with contentTemplate configured");
  return e;
}
var Wo = class extends Fo {
  constructor() {
    super(...arguments), Je(this, "_vueApp", null), Je(this, "_propsRef", ft({})), Je(this, "_errorsRef", ft([])), Je(this, "_contentRef", ft(null)), Je(this, "_hostVisibilityRef", ft(null)), Je(this, "_bridgeAbort", null);
  }
  /**
   * Override to provide Vue-specific configuration.
   */
  static get vueConfig() {
    throw new Error("WippyVueElement subclass must override static get vueConfig()");
  }
  onMount(e, t, r, n, i, s) {
    const o = this.constructor.vueConfig;
    this._propsRef.value = r, this._errorsRef.value = n, this._contentRef.value = i ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const c of n)
      this.emitEvent("invalid", { message: c });
    const l = new AbortController();
    this._bridgeAbort = l, this.reactive.props.subscribe((c, d) => {
      this._propsRef.value = c, this._errorsRef.value = [...d];
      for (const u of d)
        this.emitEvent("invalid", { message: u });
    }, { signal: l.signal }), this.reactive.content && this.reactive.content.subscribe((c) => {
      this._contentRef.value = c;
    }, { signal: l.signal }), this.reactive.hostVisibility.subscribe((c) => {
      this._hostVisibilityRef.value = c;
    }, { signal: l.signal });
    const f = (c) => {
      if (l.signal.aborted)
        return;
      const d = go(), u = oo(c.rootComponent);
      this._vueApp = u;
      const p = bo();
      if (c.piniaPlugins)
        for (const a of c.piniaPlugins)
          p.use(a);
      if (u.use(p), c.plugins)
        for (const a of c.plugins)
          u.use(a);
      u.provide(Ai, this._propsRef), u.provide(Lo, this._errorsRef), u.provide(Po, this.emitEvent.bind(this)), u.provide(Ei, this._contentRef), u.provide($o, this._hostVisibilityRef), u.provide(qo, Oo(this)), u.provide(zo, No(this)), u.provide(jo, Ri(this)), c.providers && c.providers(u, this), u.mount(t), d && xo(d);
    };
    if (o.rootComponent)
      f(o);
    else if (o.lazyConfig) {
      const c = document.createElement("wippy-loading");
      c.setAttribute("no-bg", ""), t.appendChild(c), o.lazyConfig().then((d) => {
        l.signal.aborted || (c.remove(), f(d));
      }).catch((d) => {
        if (l.signal.aborted)
          return;
        const u = d instanceof Error ? d.message : String(d), p = document.createElement("wippy-error");
        p.setAttribute("title", "Failed to load"), p.setAttribute("message", u), c.replaceWith(p), this.emitEvent("error", { message: u });
      });
    } else
      throw new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._vueApp && (this._vueApp.unmount(), this._vueApp = null);
  }
};
const cn = {};
function Vo(e) {
  let t = cn[e];
  if (t)
    return t;
  t = cn[e] = [];
  for (let r = 0; r < 128; r++) {
    const n = String.fromCharCode(r);
    t.push(n);
  }
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    t[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  }
  return t;
}
function Ge(e, t) {
  typeof t != "string" && (t = Ge.defaultChars);
  const r = Vo(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(n) {
    let i = "";
    for (let s = 0, o = n.length; s < o; s += 3) {
      const l = parseInt(n.slice(s + 1, s + 3), 16);
      if (l < 128) {
        i += r[l];
        continue;
      }
      if ((l & 224) === 192 && s + 3 < o) {
        const f = parseInt(n.slice(s + 4, s + 6), 16);
        if ((f & 192) === 128) {
          const c = l << 6 & 1984 | f & 63;
          c < 128 ? i += "��" : i += String.fromCharCode(c), s += 3;
          continue;
        }
      }
      if ((l & 240) === 224 && s + 6 < o) {
        const f = parseInt(n.slice(s + 4, s + 6), 16), c = parseInt(n.slice(s + 7, s + 9), 16);
        if ((f & 192) === 128 && (c & 192) === 128) {
          const d = l << 12 & 61440 | f << 6 & 4032 | c & 63;
          d < 2048 || d >= 55296 && d <= 57343 ? i += "���" : i += String.fromCharCode(d), s += 6;
          continue;
        }
      }
      if ((l & 248) === 240 && s + 9 < o) {
        const f = parseInt(n.slice(s + 4, s + 6), 16), c = parseInt(n.slice(s + 7, s + 9), 16), d = parseInt(n.slice(s + 10, s + 12), 16);
        if ((f & 192) === 128 && (c & 192) === 128 && (d & 192) === 128) {
          let u = l << 18 & 1835008 | f << 12 & 258048 | c << 6 & 4032 | d & 63;
          u < 65536 || u > 1114111 ? i += "����" : (u -= 65536, i += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023))), s += 9;
          continue;
        }
      }
      i += "�";
    }
    return i;
  });
}
Ge.defaultChars = ";/?:@&=+$,#";
Ge.componentChars = "";
const un = {};
function Ho(e) {
  let t = un[e];
  if (t)
    return t;
  t = un[e] = [];
  for (let r = 0; r < 128; r++) {
    const n = String.fromCharCode(r);
    /^[0-9a-z]$/i.test(n) ? t.push(n) : t.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
  }
  for (let r = 0; r < e.length; r++)
    t[e.charCodeAt(r)] = e[r];
  return t;
}
function Ne(e, t, r) {
  typeof t != "string" && (r = t, t = Ne.defaultChars), typeof r > "u" && (r = !0);
  const n = Ho(t);
  let i = "";
  for (let s = 0, o = e.length; s < o; s++) {
    const l = e.charCodeAt(s);
    if (r && l === 37 && s + 2 < o && /^[0-9a-f]{2}$/i.test(e.slice(s + 1, s + 3))) {
      i += e.slice(s, s + 3), s += 2;
      continue;
    }
    if (l < 128) {
      i += n[l];
      continue;
    }
    if (l >= 55296 && l <= 57343) {
      if (l >= 55296 && l <= 56319 && s + 1 < o) {
        const f = e.charCodeAt(s + 1);
        if (f >= 56320 && f <= 57343) {
          i += encodeURIComponent(e[s] + e[s + 1]), s++;
          continue;
        }
      }
      i += "%EF%BF%BD";
      continue;
    }
    i += encodeURIComponent(e[s]);
  }
  return i;
}
Ne.defaultChars = ";/?:@&=+$,-_.!~*'()#";
Ne.componentChars = "-_.!~*'()";
function Sr(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function Ct() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const Yo = /^([a-z0-9.+-]+:)/i, Go = /:[0-9]*$/, Zo = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Xo = ["<", ">", '"', "`", " ", "\r", `
`, "	"], Ko = ["{", "}", "|", "\\", "^", "`"].concat(Xo), Qo = ["'"].concat(Ko), hn = ["%", "/", "?", ";", "#"].concat(Qo), fn = ["/", "?", "#"], ea = 255, pn = /^[+a-z0-9A-Z_-]{0,63}$/, ta = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, dn = {
  javascript: !0,
  "javascript:": !0
}, mn = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function Dr(e, t) {
  if (e && e instanceof Ct) return e;
  const r = new Ct();
  return r.parse(e, t), r;
}
Ct.prototype.parse = function(e, t) {
  let r, n, i, s = e;
  if (s = s.trim(), !t && e.split("#").length === 1) {
    const c = Zo.exec(s);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  let o = Yo.exec(s);
  if (o && (o = o[0], r = o.toLowerCase(), this.protocol = o, s = s.substr(o.length)), (t || o || s.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = s.substr(0, 2) === "//", i && !(o && dn[o]) && (s = s.substr(2), this.slashes = !0)), !dn[o] && (i || o && !mn[o])) {
    let c = -1;
    for (let h = 0; h < fn.length; h++)
      n = s.indexOf(fn[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    let d, u;
    c === -1 ? u = s.lastIndexOf("@") : u = s.lastIndexOf("@", c), u !== -1 && (d = s.slice(0, u), s = s.slice(u + 1), this.auth = d), c = -1;
    for (let h = 0; h < hn.length; h++)
      n = s.indexOf(hn[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    c === -1 && (c = s.length), s[c - 1] === ":" && c--;
    const p = s.slice(0, c);
    s = s.slice(c), this.parseHost(p), this.hostname = this.hostname || "";
    const a = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!a) {
      const h = this.hostname.split(/\./);
      for (let m = 0, g = h.length; m < g; m++) {
        const k = h[m];
        if (k && !k.match(pn)) {
          let y = "";
          for (let _ = 0, C = k.length; _ < C; _++)
            k.charCodeAt(_) > 127 ? y += "x" : y += k[_];
          if (!y.match(pn)) {
            const _ = h.slice(0, m), C = h.slice(m + 1), w = k.match(ta);
            w && (_.push(w[1]), C.unshift(w[2])), C.length && (s = C.join(".") + s), this.hostname = _.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > ea && (this.hostname = ""), a && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const l = s.indexOf("#");
  l !== -1 && (this.hash = s.substr(l), s = s.slice(0, l));
  const f = s.indexOf("?");
  return f !== -1 && (this.search = s.substr(f), s = s.slice(0, f)), s && (this.pathname = s), mn[r] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
Ct.prototype.parseHost = function(e) {
  let t = Go.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Ge,
  encode: Ne,
  format: Sr,
  parse: Dr
}, Symbol.toStringTag, { value: "Module" })), Si = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Di = /[\0-\x1F\x7F-\x9F]/, na = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Or = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/, Ii = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/, Ti = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Si,
  Cc: Di,
  Cf: na,
  P: Or,
  S: Ii,
  Z: Ti
}, Symbol.toStringTag, { value: "Module" })), sa = [
  8364,
  0,
  8218,
  402,
  8222,
  8230,
  8224,
  8225,
  710,
  8240,
  352,
  8249,
  338,
  0,
  381,
  0,
  0,
  8216,
  8217,
  8220,
  8221,
  8226,
  8211,
  8212,
  732,
  8482,
  353,
  8250,
  339,
  0,
  382,
  376
];
function Fi(e) {
  return e === 0 || e >= 55296 && e <= 57343 || e > 1114111;
}
function Ni(e) {
  return Fi(e) ? 65533 : e >= 128 && e <= 159 && sa[e - 128] || e;
}
function oa(e) {
  return Fi(e) ? 65533 : e;
}
function aa(e) {
  return e - 1 >>> 0 < 127 || e - 160 >>> 0 < 55136 ? String.fromCharCode(e) : String.fromCodePoint(Ni(e));
}
const ye = /* @__PURE__ */ (() => {
  const e = new Uint8Array(127);
  let t = 0;
  for (let r = 33; r <= 126; r++)
    r !== 34 && r !== 36 && r !== 92 && (e[r] = t++);
  return e;
})();
function la(e, t, r, n, i, s) {
  const l = e.length, f = s * 90;
  let c = 0;
  const d = () => {
    const R = ye[e.charCodeAt(c++)];
    return R < s ? R : R * 91 - f + ye[e.charCodeAt(c++)];
  }, u = r - n, p = r + i, a = new Int32Array(p);
  a.fill(-1, n, s), a.fill(-1, s + u, p);
  const h = new Int32Array(p), m = new Int32Array(p);
  function g(R, I) {
    let F = 0, S = I;
    const Y = I + R;
    for (; S < Y; ) {
      const P = ye[e.charCodeAt(c++)];
      if (P < 89)
        F += P, a[S++] = F;
      else if (P === 89) {
        let M = ye[e.charCodeAt(c++)] + 2;
        for (; M--; )
          a[S++] = ++F;
      } else {
        const M = ye[e.charCodeAt(c++)];
        F += 89 + // eslint-disable-next-line unicorn/prefer-minimal-ternary -- branches read a different number of side-effecting input bytes
        (M < 90 ? M * 91 + ye[e.charCodeAt(c++)] : ye[e.charCodeAt(c++)] * 8281 + ye[e.charCodeAt(c++)] * 91 + ye[e.charCodeAt(c++)]), a[S++] = F;
      }
    }
  }
  g(n, 0), g(u, s);
  const k = new Int32Array(i * 2);
  let y = 0, _ = 0;
  function C(R, I) {
    for (let F = 0; F < R; F++) {
      const S = I + F, Y = d(), P = d();
      k[_ * 2] = Y, k[_ * 2 + 1] = P, _ += 1, h[S] = y;
      const M = (a[Y] < 0 ? m[Y] : 1) + (a[P] < 0 ? m[P] : 1);
      m[S] = M, y += M;
    }
  }
  C(i - s + n, s + u), C(s - n, n);
  const w = new Uint16Array(y);
  let b = 0;
  for (let R = 0; R < _; R++)
    for (let I = 0; I < 2; I++) {
      const F = k[R * 2 + I], S = a[F];
      if (S < 0) {
        let Y = h[F];
        const P = Y + m[F];
        for (; Y < P; )
          w[b++] = w[Y++];
      } else
        w[b++] = S;
    }
  const v = new Uint16Array(t);
  let x = 0;
  for (; c < l; ) {
    let R = ye[e.charCodeAt(c++)];
    R >= s && (R = R * 91 - f + ye[e.charCodeAt(c++)]);
    const I = a[R];
    if (I < 0) {
      let F = h[R];
      const S = F + m[R];
      for (; F < S; )
        v[x++] = w[F++];
    } else
      v[x++] = I;
  }
  return v;
}
const Oi = /* @__PURE__ */ la("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61), Bi = /* @__PURE__ */ new Uint16Array([
  512,
  26465,
  29036,
  7,
  0,
  2,
  4,
  116,
  24638,
  116,
  24636,
  8693,
  29807,
  24610,
  621,
  1,
  0,
  0,
  3,
  112,
  24614,
  111,
  115,
  24615
]);
var Z;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.FLAG13 = 8192] = "FLAG13", e[e.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE", e[e.VALUE_MASK = 8191] = "VALUE_MASK";
})(Z || (Z = {}));
var se;
(function(e) {
  e[e.AMP = 38] = "AMP", e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_X = 120] = "LOWER_X";
})(se || (se = {}));
const Ze = 32, Mi = 21, ca = 2097151, Ir = 2047;
let Pi = 0;
function ua(e) {
  const t = e >>> Mi;
  return t === Ir ? Pi : t;
}
function Br(e) {
  return e - se.ZERO >>> 0 <= 9;
}
function Li(e) {
  return (e | Ze) - se.LOWER_A >>> 0 <= 5;
}
function qi(e) {
  return (e | Ze) - se.LOWER_A >>> 0 <= 25;
}
function ha(e) {
  return e === se.EQUALS || qi(e) || Br(e);
}
var de;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(de || (de = {}));
var Re;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Re || (Re = {}));
class fa {
  decodeTree;
  emitCodePoint;
  errors;
  /** The current state of the decoder. */
  state = de.EntityStart;
  /** Characters that were consumed while parsing an entity. */
  consumed = 1;
  /**
   * The result of the entity.
   *
   * For named entities: the trie index of the best legacy match so far
   * (0 = none). For numeric entities: the accumulated code point.
   */
  result = 0;
  /** The current index in the decode tree. */
  treeIndex = 0;
  /**
   * Characters consumed since the last recorded legacy match, plus one.
   * Invariant at the top of the `stateNamedEntity` loop: `excess` equals
   * the number of unrecorded consumed characters + 1.
   */
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: False positive (read via destructuring)
  excess = 1;
  /** The mode in which the decoder is operating. */
  decodeMode = Re.Strict;
  /** The number of characters that have been consumed in the current run. */
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: False positive
  runConsumed = 0;
  constructor(t, r, n) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = n;
  }
  /**
   * Resets the instance to make it reusable.
   * @param decodeMode Entity decoding mode to use.
   */
  startEntity(t) {
    this.decodeMode = t, this.state = de.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the non-streaming `decodeWithTrie`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, r) {
    switch (this.state) {
      case de.EntityStart:
        return t.charCodeAt(r) === se.NUM ? (this.state = de.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = de.NamedEntity, this.stateNamedEntity(t, r));
      case de.NumericStart:
        return this.stateNumericStart(t, r);
      case de.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case de.NumericHex:
        return this.stateNumericHex(t, r);
      default:
        return this.stateNamedEntity(t, r);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  // eslint-disable-next-line unicorn/consistent-class-member-order
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | Ze) === se.LOWER_X ? (this.state = de.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = de.NumericDecimal, this.stateNumericDecimal(t, r));
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML
   * spec. Digit parsing matches the hex loop in `parseNumericEntity`.
   * The accumulated value is preserved for numeric validation callbacks.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, r) {
    const n = t.length;
    let { result: i } = this, { consumed: s } = this;
    for (; r < n; ) {
      const o = t.charCodeAt(r);
      if (Br(o) || Li(o)) {
        const l = o <= se.NINE ? o - se.ZERO : (o | Ze) - se.LOWER_A + 10;
        i = i * 16 + l, s += 1, r += 1;
      } else
        return this.result = i, this.consumed = s, this.emitNumericEntity(o, 3);
    }
    return this.result = i, this.consumed = s, -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML
   * spec. Digit parsing matches the decimal loop in `parseNumericEntity`.
   * The accumulated value is preserved for numeric validation callbacks.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, r) {
    const n = t.length;
    let { result: i } = this, { consumed: s } = this;
    for (; r < n; ) {
      const o = t.charCodeAt(r) - se.ZERO;
      if (o >>> 0 > 9)
        return this.result = i, this.consumed = s, this.emitNumericEntity(o + se.ZERO, 2);
      i = i * 10 + o, s += 1, r += 1;
    }
    return this.result = i, this.consumed = s, -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, r) {
    if (this.consumed <= r)
      return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === se.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Re.Strict)
      return 0;
    return this.emitCodePoint((this.decodeTree === Bi ? oa : Ni)(this.result), this.consumed), this.errors && (t !== se.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Flush locally-tracked walk state back to the fields, then emit the
   * recorded legacy match or reject (cold path — at most once per
   * entity). Called after failed navigation (leaf node, branch miss, or
   * compact-run mismatch). In attribute mode, reject if no legacy was
   * recorded at the current node, if we descended past it, or if the
   * pending input character is an invalid attribute terminator.
   * @param consumed Locally-tracked consumed count.
   * @param excess Locally-tracked excess count.
   * @param char Pending input character (may be the mismatching char).
   * @param valueLength Value length at the current trie node.
   */
  flushAndEmitLegacyOrReject(t, r, n, i) {
    return this.consumed = t, this.excess = r, this.result === 0 || this.decodeMode === Re.Attribute && (i === 0 || r > 1 || ha(n)) ? 0 : this.emitNotTerminatedNamedEntity();
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, r) {
    const { decodeTree: n } = this, i = t.length, s = this.decodeMode === Re.Strict;
    let { treeIndex: o } = this, { excess: l } = this, { consumed: f } = this, c = n[o];
    for (; r < i; ) {
      for (; (c & (Z.VALUE_LENGTH | Z.FLAG13)) === 0 && (c & Z.JUMP_TABLE) !== 0; ) {
        const a = t.charCodeAt(r), h = c & Z.JUMP_TABLE, m = (c & Z.BRANCH_LENGTH) >> 7;
        if (m === 0) {
          if (a !== h)
            return this.flushAndEmitLegacyOrReject(f, l, a, 0);
          o += 1;
        } else {
          const g = a - h;
          if (g >>> 0 >= m)
            return this.flushAndEmitLegacyOrReject(f, l, a, 0);
          const k = n[o + 1 + g];
          if (k === 0)
            return this.flushAndEmitLegacyOrReject(f, l, a, 0);
          o = o + m + k & 65535;
        }
        if (c = n[o], r += 1, l += 1, r >= i)
          break;
      }
      if (r >= i)
        break;
      if ((c & (Z.VALUE_LENGTH | Z.FLAG13)) === Z.FLAG13) {
        const a = (c & Z.BRANCH_LENGTH) >> 7;
        let { runConsumed: h } = this;
        if (h === 0) {
          const m = t.charCodeAt(r);
          if (m !== (c & Z.JUMP_TABLE))
            return this.flushAndEmitLegacyOrReject(f, l, m, 0);
          r += 1, l += 1, h = 1;
        }
        for (; h < a; ) {
          if (r >= i)
            return this.treeIndex = o, this.excess = l, this.consumed = f, this.runConsumed = h, -1;
          const m = h - 1, k = n[o + 1 + (m >> 1)] >> ((m & 1) << 3) & 255, y = t.charCodeAt(r);
          if (y !== k)
            return this.runConsumed = 0, this.flushAndEmitLegacyOrReject(f, l, y, 0);
          r += 1, l += 1, h += 1;
        }
        this.runConsumed = 0, o += 1 + (a >> 1), c = n[o];
        continue;
      }
      const d = c >>> 14, u = t.charCodeAt(r);
      if (d !== 0) {
        if (!s && (c & Z.FLAG13) === 0 && (this.result = o, f += l - 1, l = 1), u === se.SEMI)
          return this.emitNamedEntityData(o, d, f + l);
        if (d === 1)
          return this.flushAndEmitLegacyOrReject(f, l, u, d);
      }
      const p = zi(n, c, o + (d || 1), u);
      if (p < 0)
        return this.flushAndEmitLegacyOrReject(f, l, u, d);
      o = p, c = n[o], r += 1, l += 1;
    }
    return !s && c >>> 14 && (c & Z.FLAG13) === 0 && (this.result = o, f += l - 1, l = 1), this.treeIndex = o, this.excess = l, this.consumed = f, -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    const { result: t, decodeTree: r } = this, n = r[t] >>> 14;
    return this.emitNamedEntityData(t, n, this.consumed), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   * @param result The index of the entity in the decode tree.
   * @param valueLength Encoded value length (header plus any value words).
   * @param consumed The number of characters consumed.
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, r, n) {
    const { decodeTree: i } = this;
    return this.emitCodePoint(r === 1 ? i[t] & Z.VALUE_MASK : i[t + 1], n), r === 3 && this.emitCodePoint(i[t + 2], n), n;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   * @returns The number of characters consumed.
   */
  end() {
    switch (this.state) {
      case de.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Re.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case de.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case de.NumericHex:
        return this.emitNumericEntity(0, 3);
      case de.NumericStart:
        return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      default:
        return 0;
    }
  }
}
function zi(e, t, r, n) {
  const i = (t & Z.BRANCH_LENGTH) >> 7, s = t & Z.JUMP_TABLE;
  if (s) {
    if (i === 0)
      return n === s ? r : -1;
    const f = n - s;
    if (f >>> 0 >= i)
      return -1;
    const c = e[r + f];
    return c === 0 ? -1 : r + i + c - 1 & 65535;
  }
  if (i === 0)
    return -1;
  const o = i + 1 >> 1, l = r + o + i;
  for (let f = 0; f < i; f++) {
    const d = e[r + (f >> 1)] >> ((f & 1) << 3) & 255;
    if (d === n) {
      const u = r + o + f;
      return l + e[u] & 65535;
    }
    if (d > n)
      return -1;
  }
  return -1;
}
function gn(e, t, r) {
  return r === 1 ? String.fromCharCode(e[t] & Z.VALUE_MASK) : r === 2 ? String.fromCharCode(e[t + 1]) : String.fromCharCode(e[t + 1], e[t + 2]);
}
function pa(e, t, r) {
  let n = t + 1, i = 0, s = n;
  if (n < r && (e.charCodeAt(n) | Ze) === se.LOWER_X)
    for (n += 1, s = n; n < r; ) {
      const l = e.charCodeAt(n);
      if (Br(l))
        i = i * 16 + (l - se.ZERO);
      else if (Li(l))
        i = i * 16 + ((l | Ze) - se.LOWER_A + 10);
      else
        break;
      n += 1;
    }
  else
    for (; n < r; ) {
      const l = e.charCodeAt(n) - se.ZERO;
      if (l >>> 0 > 9)
        break;
      i = i * 10 + l, n += 1;
    }
  if (n === s)
    return 0;
  n < r && e.charCodeAt(n) === se.SEMI && (n += 1), i > 1114111 && (i = 1114112);
  let o = n - t;
  return o >= Ir && (Pi = o, o = Ir), o << Mi | i;
}
function da(e, t, r) {
  const n = Oi;
  let i = e.indexOf("&");
  if (i < 0)
    return e;
  const s = e.length;
  let o = 0, l = "";
  const f = n[0], c = f & Z.JUMP_TABLE, d = (f & Z.BRANCH_LENGTH) >> 7;
  do {
    const u = i + 1, p = e.charCodeAt(u);
    let a, h;
    if (p === se.NUM) {
      const m = pa(e, u, s);
      a = ua(m), a > 0 && e.charCodeAt(u + a - 1) !== se.SEMI && (a = 0), h = a === 0 ? "" : aa(m & ca);
    } else if (qi(p)) {
      a = 0, h = "";
      const m = p - c;
      let g;
      if (m >>> 0 < d) {
        const w = n[1 + m];
        g = w === 0 ? -1 : d + w & 65535;
      } else
        g = -1;
      let k = 0, y = 0, _ = g < 0 ? 0 : n[g], C = u + 1;
      e: for (; C < s; ) {
        for (
          ;
          // Value-less, non-run node with a nonzero jump offset.
          (_ & (Z.VALUE_LENGTH | Z.FLAG13)) === 0 && (_ & Z.JUMP_TABLE) !== 0;
        ) {
          const x = _ & Z.JUMP_TABLE, R = (_ & Z.BRANCH_LENGTH) >> 7;
          if (R === 0) {
            if (e.charCodeAt(C) !== x)
              break e;
            g += 1;
          } else {
            const I = e.charCodeAt(C) - x;
            if (I >>> 0 >= R)
              break e;
            const F = n[g + 1 + I];
            if (F === 0)
              break e;
            g = g + R + F & 65535;
          }
          if (_ = n[g], C += 1, C >= s)
            break e;
        }
        if ((_ & (Z.VALUE_LENGTH | Z.FLAG13)) === Z.FLAG13) {
          const x = (_ & Z.BRANCH_LENGTH) >> 7;
          if (e.charCodeAt(C) !== (_ & Z.JUMP_TABLE))
            break;
          C += 1;
          const R = x - 1;
          let I = g + 1, F = 0;
          for (; F + 1 < R; F += 2) {
            const S = n[I];
            if (e.charCodeAt(C) !== (S & 255) || (C += 1, e.charCodeAt(C) !== (S >> 8 & 255)))
              break e;
            C += 1, I += 1;
          }
          if (F < R) {
            if (e.charCodeAt(C) !== (n[I] & 255))
              break;
            C += 1;
          }
          g += 1 + (x >> 1), _ = n[g];
          continue;
        }
        const w = _ >>> 14, b = e.charCodeAt(C);
        if (w !== 0) {
          if (b === se.SEMI) {
            a = C - u + 1, h = w === 1 ? String.fromCharCode(_ & Z.VALUE_MASK) : gn(n, g, w);
            break;
          }
          if (w === 1)
            break;
        }
        const v = zi(n, _, g + (w || 1), b);
        if (v < 0)
          break;
        g = v, _ = n[g], C += 1;
      }
      h === "" && a > 0 && (h = gn(n, k, y));
    } else
      a = 0, h = "";
    a === 0 || r ? i = u : (o < i && (l += e.slice(o, i)), l += h, i = o = u + a), e.charCodeAt(i) !== se.AMP && (i = e.indexOf("&", i));
  } while (i >= 0);
  return l + e.slice(o);
}
function ji(e) {
  return da(e, !0, !1);
}
function $i(e) {
  return e === 34 ? "&quot;" : e === 38 ? "&amp;" : e === 39 ? "&apos;" : e === 60 ? "&lt;" : e === 62 ? "&gt;" : "&nbsp;";
}
const ma = 1342177476, jt = /["&'<>\u0080-\uFFFF]/g;
function bn(e) {
  return e >= 128 || e >= 32 && e < 64 && (ma >>> e & 1) === 1;
}
function Ui(e) {
  const { length: t } = e;
  let r, n = 0, i = 0;
  for (; i < t; ) {
    const s = e.charCodeAt(i);
    if (!bn(s)) {
      const l = Math.min(i + 32, t);
      let f = i + 1;
      for (; f < l && !bn(e.charCodeAt(f)); )
        f++;
      if (f < l) {
        i = f;
        continue;
      }
      if (f >= t || (jt.lastIndex = f, !jt.test(e)))
        break;
      i = jt.lastIndex - 1;
      continue;
    }
    if (r === void 0 ? r = e.substring(0, i) : n !== i && (r += e.substring(n, i)), s < 64) {
      r += $i(s), n = i += 1;
      continue;
    }
    const o = e.codePointAt(i);
    r += `&#x${o.toString(16)};`, o !== s && i++, n = i += 1;
  }
  return r === void 0 ? e : (n < t && (r += e.substr(n)), r);
}
function Ji(e, t) {
  if (e.lastIndex = 0, !e.test(t))
    return t;
  let r = "", n = 0;
  do {
    const i = e.lastIndex - 1;
    n !== i && (r += t.substring(n, i));
    const s = t.charCodeAt(i);
    r += $i(s), n = i + 1;
  } while (e.test(t));
  return r + t.substring(n);
}
const ga = /["&\u{A0}]/gu;
function ba(e) {
  return Ji(ga, e);
}
const xa = /[&<>\u{A0}]/gu;
function wa(e) {
  return Ji(xa, e);
}
var va = class {
  src_Any = Si.source;
  src_Cc = Di.source;
  src_Z = Ti.source;
  src_P = Or.source;
  src_ZPCc = [
    this.src_Z,
    this.src_P,
    this.src_Cc
  ].join("|");
  src_ZCc = [this.src_Z, this.src_Cc].join("|");
  cache = {};
  opts = {
    maxLength: 1e4,
    urlAuth: !1,
    schema_names: []
  };
  constructor(e = {}) {
    this.opts = {
      ...this.opts,
      ...e
    };
  }
  set(e = {}) {
    return this.opts = {
      ...this.opts,
      ...e
    }, this.cache = {}, this;
  }
  escapeRE(e) {
    return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  nestedPairRE(e, t, r = 4) {
    const n = this.escapeRE(e), i = this.escapeRE(t), s = `(?:(?!${this.src_ZCc}|${n}|${i}).)`;
    let o = `${n}${s}{0,1000}${i}`;
    for (let l = 2; l <= r; l++) o = `${n}(?:${s}|${o}){0,1000}${i}`;
    return o;
  }
  get_text_separators() {
    return this.cache.text_separators ??= /[><\uff5c]/;
  }
  get_pseudo_letter() {
    return this.cache.src_pseudo_letter ??= new RegExp(`(?:(?!${this.get_text_separators().source}|${this.src_ZPCc})${this.src_Any})`);
  }
  get_ipv4_addr() {
    return this.cache.src_ip4 ??= /* @__PURE__ */ new RegExp("(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[.]){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])");
  }
  get_ipv6_addr() {
    const e = "[0-9A-Fa-f]{1,4}", t = `(?:(?:${e}:${e})|${this.get_ipv4_addr().source})`;
    return this.cache.src_ip6_addr ??= new RegExp(`(?:(?:${e}:){6}${t}|::(?:${e}:){5}${t}|(?:${e})?::(?:${e}:){4}${t}|(?:(?:${e}:){0,1}${e})?::(?:${e}:){3}${t}|(?:(?:${e}:){0,2}${e})?::(?:${e}:){2}${t}|(?:(?:${e}:){0,3}${e})?::${e}:${t}|(?:(?:${e}:){0,4}${e})?::${t}|(?:(?:${e}:){0,5}${e})?::${e}|(?:(?:${e}:){0,6}${e})?::)`);
  }
  get_ipv6_url_host() {
    return this.cache.src_ip6_host ??= new RegExp(`\\[${this.get_ipv6_addr().source}\\]`);
  }
  get_ipv6_mail_host() {
    return this.cache.src_ipv6_mail_host ??= new RegExp(`\\[IPv6:${this.get_ipv6_addr().source}\\]`);
  }
  get_auth() {
    return this.cache.src_auth ??= new RegExp(`(?:(?:(?!${this.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`);
  }
  get_port() {
    return this.cache.src_port ??= /* @__PURE__ */ new RegExp("(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?");
  }
  get_host_terminator() {
    return this.cache.src_host_terminator ??= new RegExp(`(?=$|${this.get_text_separators().source}|${this.src_ZPCc})(?!${this.opts["---"] ? "-(?!--)|" : "-|"}_|:\\d|\\.-|\\.(?!$|${this.src_ZPCc}))`);
  }
  get_path_terminator() {
    return this.cache.src_path_terminator ??= new RegExp(`${this.src_ZPCc}|${this.get_text_separators().source}`);
  }
  get_path() {
    return this.cache.src_path ??= new RegExp(`(?:[/?#](?:${this.nestedPairRE("[", "]")}|${this.nestedPairRE("(", ")")}|${this.nestedPairRE("{", "}")}|\\"(?:(?!${this.src_ZCc}|["]).){1,100}\\"|\\'(?:(?!${this.src_ZCc}|[']).){1,100}\\'|\\'(?=${this.get_pseudo_letter().source}|[-])|\\.{2,20}[:]?[a-zA-Z0-9%/&]|\\.(?!${this.src_ZCc}|[.]|$)|` + (this.opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-{0,19})|" : "\\-{1,20}|") + `,(?!${this.src_ZCc}|$)|;(?!${this.src_ZCc}|$)|\\!{1,20}(?!${this.src_ZCc}|[!]|$)|\\?(?!${this.src_ZCc}|[?]|$)|` + this.get_path_extra().source + `[\\\\/:%@#&=_~*]|(?!${this.get_path_terminator().source}).){1,${this.opts.maxLength}}|\\/)?`);
  }
  get_mail_name() {
    return this.cache.src_mail_name ??= /* @__PURE__ */ new RegExp("[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9](?:[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9]|[.](?=[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9])){0,63}");
  }
  get_xn() {
    return this.cache.src_xn ??= /* @__PURE__ */ new RegExp("xn--[a-z0-9\\-]{1,59}");
  }
  get_tld() {
    if (this.cache.tld) return this.cache.tld;
    const e = [...new Set(this.opts.tlds || [])].sort().reverse().join("|");
    return this.cache.tld = new RegExp(`${e || "$#none#$"}|${this.get_xn().source}`), this.cache.tld;
  }
  get_domain_root() {
    return this.cache.src_domain_root ??= new RegExp("(?:" + this.get_xn().source + `|${this.get_pseudo_letter().source}{1,63})`);
  }
  get_domain() {
    return this.cache.src_domain ??= new RegExp("(?:" + this.get_xn().source + `|(?:${this.get_pseudo_letter().source})|(?:${this.get_pseudo_letter().source}(?:-|${this.get_pseudo_letter().source}){0,61}${this.get_pseudo_letter().source}))`);
  }
  get_url_host_port() {
    return this.cache.url_host_port ??= new RegExp("(?:" + this.get_ipv6_url_host().source + `|(?:(?:(?:${this.get_domain().source})\\.){0,10}${this.get_domain().source}))` + this.get_port().source + this.get_host_terminator().source);
  }
  get_fuzzy_url_host_port() {
    return this.cache.fuzzy_url_host_port ??= new RegExp("(?:" + (this.opts.fuzzyIP ? this.get_ipv4_addr().source + "|" : "") + `(?:(?:(?:${this.get_domain().source})\\.){1,10}(?:${this.get_tld().source})))` + this.get_host_terminator().source);
  }
  get_mail_host() {
    return this.cache.src_mail_host ??= new RegExp("(?:" + this.get_ipv6_mail_host().source + `|(?:(?:(?:${this.get_domain().source})\\.){0,4}${this.get_domain().source}))` + this.get_host_terminator().source);
  }
  get_fuzzy_mail_host() {
    return this.cache.src_fuzzy_mail_host ??= new RegExp("(?:" + this.get_ipv6_mail_host().source + `|(?:(?:(?:${this.get_domain().source})[.]){1,4}${this.get_domain_root().source}))` + this.get_host_terminator().source);
  }
  get_path_extra() {
    return this.cache.src_path_extra ??= /* @__PURE__ */ new RegExp("");
  }
  get_fuzzy_mail_host_search() {
    return this.cache.mail_fuzzy_host_search ??= new RegExp(`@${this.get_fuzzy_mail_host().source}`, "ig");
  }
  get_fuzzy_link_search() {
    return this.cache.link_fuzzy_search ??= new RegExp(`(^|(?![.:/\\-_@])(?:[$+<=>^\`|｜]|${this.src_ZPCc}))(?:(?![$+<=>^\`|｜])${this.get_fuzzy_url_host_port().source}${this.get_path().source})`, "ig");
  }
  get_http_validator() {
    return this.cache.http_validator ??= new RegExp("\\/\\/" + (this.opts.urlAuth ? this.get_auth().source : "") + this.get_url_host_port().source + this.get_path().source, "iy");
  }
  get_relative_proto_validator() {
    return this.cache.relative_proto_validator ??= new RegExp((this.opts.urlAuth ? this.get_auth().source : "") + `(?:localhost|${this.get_ipv6_url_host().source}|(?:(?:${this.get_domain().source})[.]){1,10}${this.get_domain_root().source})` + this.get_port().source + this.get_host_terminator().source + this.get_path().source, "iy");
  }
  get_mail_name_validator() {
    return this.cache.mail_name_validator ??= new RegExp(`(?:^|${this.get_text_separators().source}|"|\\(|${this.src_ZCc})(${this.get_mail_name().source})$`);
  }
  get_mailto_validator() {
    return this.cache.mailto_validator ??= new RegExp(`${this.get_mail_name().source}@${this.get_mail_host().source}`, "iy");
  }
  get_schema_names() {
    return this.cache.schema_names ??= new RegExp((this.opts.schema_names || []).map((e) => this.escapeRE(e)).join("|"));
  }
  get_schema_search() {
    return this.cache.schema_search ??= new RegExp(`(^|(?!_)(?:[><｜]|${this.src_ZPCc}))(${this.get_schema_names().source})`, "ig");
  }
  get_schema_at_start() {
    return this.cache.schema_at_start ??= new RegExp(`^${this.get_schema_search().source}`, "i");
  }
}, $t = {
  validate: (e, t, r) => {
    const n = r.re.get_http_validator();
    n.lastIndex = t;
    const i = n.exec(e);
    return i ? i[0].length : 0;
  },
  normalize: (e, t) => t.normalize(e)
}, ya = {
  "http:": $t,
  "https:": $t,
  "ftp:": $t,
  "//": {
    validate: function(e, t, r) {
      const n = r.re.get_relative_proto_validator();
      n.lastIndex = t;
      const i = n.exec(e);
      return i ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : i[0].length : 0;
    },
    normalize: (e, t) => t.normalize(e)
  },
  "mailto:": {
    validate: function(e, t, r) {
      const n = r.re.get_mailto_validator();
      n.lastIndex = t;
      const i = n.exec(e);
      return i ? i[0].length : 0;
    },
    normalize: (e, t) => t.normalize(e)
  }
}, _a = "a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw", ka = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф";
function Ca() {
  const e = ka.split("|");
  return _a.split("|").forEach((t) => {
    const r = t.indexOf(":"), n = t.slice(0, r);
    for (const i of t.slice(r + 1)) e.push(n + i);
  }), e;
}
var Ra = {
  fuzzyLink: !1,
  fuzzyEmail: !0,
  fuzzyIP: !1,
  "---": !1,
  tlds: Ca(),
  urlAuth: !1,
  maxLength: 1e4
}, xn = class {
  /** Prefix (protocol) for matched string. Empty for fuzzy links. */
  schema;
  /** First position of matched string. */
  index;
  /** Next position after matched string. */
  lastIndex;
  /** Matched string. */
  raw;
  /** Normalized text of matched string. */
  text;
  /** Normalized URL of matched string. */
  url;
  constructor(e, t, r, n) {
    const i = e.slice(r, n);
    this.schema = t.toLowerCase(), this.index = r, this.lastIndex = n, this.raw = i, this.text = i, this.url = i;
  }
}, Aa = class {
  __opts__;
  __schemas__;
  re;
  /**
  * Creates new linkifier instance.
  *
  * By default understands:
  *
  * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
  * - "fuzzy" emails (foo@bar.com).
  *
  * See {@link LinkifyConstructorOptions} for available options.
  *
  * @param options Recognition options.
  *
  * @example
  * ```javascript
  * import { LinkifyIt } from 'linkify-it'
  *
  * const linkify = new LinkifyIt({ fuzzyLink: true })
  *
  * linkify
  *   .tlds(require('tlds'))       // Reload with full TLD list
  *   .tlds('onion', true)         // Add unofficial `.onion` domain
  *   .add('ftp:', null)           // Disable `ftp:` protocol
  *   .set({ fuzzyIP: true })      // Enable IPs in fuzzy links
  *
  * console.log(linkify.test('Site github.com!')) // true
  * console.log(linkify.match('Site github.com!'))
  * ```
  */
  constructor(e = {}) {
    const { rebuilder: t, ...r } = e;
    this.__opts__ = {
      ...Ra,
      ...r
    }, this.__schemas__ = { ...ya }, this.re = t || new va(), this.re.set({
      ...this.__opts__,
      schema_names: Object.keys(this.__schemas__)
    });
  }
  /**
  * Add new rule definition.
  *
  * `schema` is a link prefix (usually, protocol name with `:` at the end,
  * `skype:` for example). `linkify-it` makes sure that prefix is not
  * preceded with alphanumeric char and symbols. Only whitespaces and
  * punctuation allowed.
  *
  * `definition` is a rule to check tail after link prefix. To disable an
  * existing rule, pass `null`.
  *
  * @param schema Rule name (fixed pattern prefix).
  * @param definition Schema definition, or `null` to disable the rule.
  *
  * See [twitter mentions example](https://github.com/markdown-it/linkify-it/blob/master/examples/twitter.mjs).
  */
  add(e, t = null) {
    if (!t) delete this.__schemas__[e];
    else {
      const r = {
        normalize: (n, i) => i.normalize(n),
        ...t
      };
      this.__schemas__[e] = r;
    }
    return this.re.set({
      ...this.__opts__,
      schema_names: Object.keys(this.__schemas__)
    }), this;
  }
  /**
  * Set recognition options for links without schema.
  *
  * @param options Recognition options.
  */
  set(e = {}) {
    return this.__opts__ = {
      ...this.__opts__,
      ...e
    }, this.re.set({
      ...this.__opts__,
      schema_names: Object.keys(this.__schemas__)
    }), this;
  }
  /**
  * Searches linkifiable pattern and returns `true` on success or `false` on fail.
  *
  * @param text Text to scan.
  */
  test(e) {
    if (!e.length) return !1;
    let t, r;
    for (r = this.re.get_schema_search(), r.lastIndex = 0; (t = r.exec(e)) !== null; ) if (this.testSchemaAt(e, t[2], r.lastIndex)) return !0;
    if (this.__opts__.fuzzyLink && this.__schemas__["http:"] && (r = this.re.get_fuzzy_link_search(), r.lastIndex = 0, r.exec(e) !== null))
      return !0;
    if (this.__opts__.fuzzyEmail && this.__schemas__["mailto:"] && e.indexOf("@") >= 0) {
      const n = this.re.get_fuzzy_mail_host_search(), i = this.re.get_mail_name_validator();
      for (n.lastIndex = 0; (t = n.exec(e)) !== null; ) {
        const s = e.slice(Math.max(0, t.index - 65), t.index);
        if (i.test(s)) return !0;
      }
    }
    return !1;
  }
  /**
  * Similar to {@link LinkifyIt.test} but checks only specific protocol tail exactly
  * at given position. Returns length of found pattern (0 on fail).
  *
  * @param text Text to scan.
  * @param schema Rule (schema) name.
  * @param pos Text offset to check from.
  */
  testSchemaAt(e, t, r) {
    return this.__schemas__[t.toLowerCase()] ? this.__schemas__[t.toLowerCase()].validate(e.slice(0, r + this.__opts__.maxLength), r, this) : 0;
  }
  /**
  * Returns array of found link descriptions or `null` on fail. We strongly
  * recommend to use {@link LinkifyIt.test} first, for best speed.
  *
  * @param text Text to scan.
  */
  match(e) {
    const t = [], r = this.re.get_schema_search();
    let n, i, s, o, l, f, c = !1, d = !1, u = !1, p = 0;
    if (!e.length) return null;
    for (r.lastIndex = 0, this.__opts__.fuzzyLink && this.__schemas__["http:"] && (n = this.re.get_fuzzy_link_search(), n.lastIndex = 0), this.__opts__.fuzzyEmail && this.__schemas__["mailto:"] && (i = this.re.get_fuzzy_mail_host_search(), i.lastIndex = 0, s = this.re.get_mail_name_validator()); ; ) {
      const a = Math.max(p - 1, 0);
      if (i && s && !u && (!l || l.index < p))
        for (i.lastIndex < a && (i.lastIndex = a); ; ) {
          const y = i.exec(e);
          if (!y) {
            u = !0, l = void 0;
            break;
          }
          const _ = s.exec(e.slice(Math.max(0, y.index - 65), y.index));
          if (_) {
            if (l = {
              schema: "mailto:",
              index: y.index - _[1].length,
              lastIndex: y.index + y[0].length
            }, l.index >= p) break;
            i.lastIndex < a && (i.lastIndex = a);
          }
        }
      if (n && !d && (!o || o.index < p))
        for (n.lastIndex < a && (n.lastIndex = a); ; ) {
          const y = n.exec(e);
          if (!y) {
            d = !0, o = void 0;
            break;
          }
          if (o = {
            schema: "",
            index: y.index + y[1].length,
            lastIndex: y.index + y[0].length
          }, o.index >= p) break;
          n.lastIndex < a && (n.lastIndex = a);
        }
      let h = l;
      (!h || o && (o.index < h.index || o.index === h.index && o.lastIndex > h.lastIndex)) && (h = o);
      let m;
      if (!c) for (; ; ) {
        if (!f) {
          r.lastIndex < a && (r.lastIndex = a);
          const C = r.exec(e);
          if (!C) {
            c = !0;
            break;
          }
          f = {
            schema: C[2],
            index: C.index + C[1].length,
            lastIndex: C.index + C[0].length
          };
        }
        if (f.index < p) {
          f = void 0;
          continue;
        }
        if (h && f.index > h.index) break;
        const y = f;
        f = void 0;
        const _ = this.testSchemaAt(e, y.schema, y.lastIndex);
        if (_) {
          m = {
            schema: y.schema,
            index: y.index,
            lastIndex: y.lastIndex + _
          };
          break;
        }
      }
      let g = m;
      if ((!g || l && (l.index < g.index || l.index === g.index && l.lastIndex > g.lastIndex)) && (g = l), (!g || o && (o.index < g.index || o.index === g.index && o.lastIndex > g.lastIndex)) && (g = o), !g) break;
      g === l ? l = void 0 : g === o && (o = void 0);
      const k = new xn(e, g.schema, g.index, g.lastIndex);
      k.schema ? this.__schemas__[k.schema].normalize(k, this) : this.normalize(k), t.push(k), p = g.lastIndex;
    }
    return t.length ? t : null;
  }
  /**
  * Returns fully-formed (not fuzzy) link if it starts at the beginning
  * of the string, and null otherwise.
  *
  * @param text Text to scan.
  */
  matchAtStart(e) {
    if (!e.length) return null;
    const t = this.re.get_schema_at_start().exec(e);
    if (!t) return null;
    const r = this.testSchemaAt(e, t[2], t[0].length);
    if (!r) return null;
    const n = new xn(e, t[2], t.index + t[1].length, t.index + t[0].length + r);
    return this.__schemas__[n.schema].normalize(n, this), n;
  }
  /**
  * Load (or merge) new TLDs list. Those are used for fuzzy links (without
  * prefix) to avoid false positives. By default this algorithm is used:
  *
  * - hostname with any 2-letter root zones are ok.
  * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
  *   are ok.
  * - encoded (`xn--...`) root zones are ok.
  *
  * If list is replaced, then exact match for 2-chars root zones will be checked.
  *
  * @param list List of TLDs.
  * @param keepOld Merge with current list if `true` (`false` by default).
  */
  tlds(e, t = !1) {
    return e = Array.isArray(e) ? e : [e], t ? this.__opts__.tlds = this.__opts__.tlds.concat(e) : this.__opts__.tlds = e, this.re.set({
      ...this.__opts__,
      schema_names: Object.keys(this.__schemas__)
    }), this;
  }
  /**
  * Default normalizer (if schema does not define its own).
  *
  * @param match Match to normalize.
  */
  normalize(e) {
    e.schema || (e.url = `http://${e.url}`), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = `mailto:${e.url}`);
  }
};
const Ye = 2147483647, Ae = 36, Mr = 1, rt = 26, Ea = 38, Sa = 700, Wi = 72, Vi = 128, Hi = "-", Da = /^xn--/, Ia = /[^\0-\x7F]/, Ta = /[\x2E\u3002\uFF0E\uFF61]/g, Fa = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Ut = Ae - Mr, Ee = Math.floor, Jt = String.fromCharCode;
function Oe(e) {
  throw new RangeError(Fa[e]);
}
function Na(e, t) {
  const r = [];
  let n = e.length;
  for (; n--; )
    r[n] = t(e[n]);
  return r;
}
function Yi(e, t) {
  const r = e.split("@");
  let n = "";
  r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(Ta, ".");
  const i = e.split("."), s = Na(i, t).join(".");
  return n + s;
}
function Gi(e) {
  const t = [];
  let r = 0;
  const n = e.length;
  for (; r < n; ) {
    const i = e.charCodeAt(r++);
    if (i >= 55296 && i <= 56319 && r < n) {
      const s = e.charCodeAt(r++);
      (s & 64512) == 56320 ? t.push(((i & 1023) << 10) + (s & 1023) + 65536) : (t.push(i), r--);
    } else
      t.push(i);
  }
  return t;
}
const Oa = (e) => String.fromCodePoint(...e), Ba = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Ae;
}, wn = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, Zi = function(e, t, r) {
  let n = 0;
  for (e = r ? Ee(e / Sa) : e >> 1, e += Ee(e / t); e > Ut * rt >> 1; n += Ae)
    e = Ee(e / Ut);
  return Ee(n + (Ut + 1) * e / (e + Ea));
}, Xi = function(e) {
  const t = [], r = e.length;
  let n = 0, i = Vi, s = Wi, o = e.lastIndexOf(Hi);
  o < 0 && (o = 0);
  for (let l = 0; l < o; ++l)
    e.charCodeAt(l) >= 128 && Oe("not-basic"), t.push(e.charCodeAt(l));
  for (let l = o > 0 ? o + 1 : 0; l < r; ) {
    const f = n;
    for (let d = 1, u = Ae; ; u += Ae) {
      l >= r && Oe("invalid-input");
      const p = Ba(e.charCodeAt(l++));
      p >= Ae && Oe("invalid-input"), p > Ee((Ye - n) / d) && Oe("overflow"), n += p * d;
      const a = u <= s ? Mr : u >= s + rt ? rt : u - s;
      if (p < a)
        break;
      const h = Ae - a;
      d > Ee(Ye / h) && Oe("overflow"), d *= h;
    }
    const c = t.length + 1;
    s = Zi(n - f, c, f == 0), Ee(n / c) > Ye - i && Oe("overflow"), i += Ee(n / c), n %= c, t.splice(n++, 0, i);
  }
  return String.fromCodePoint(...t);
}, Ki = function(e) {
  const t = [];
  e = Gi(e);
  const r = e.length;
  let n = Vi, i = 0, s = Wi;
  for (const f of e)
    f < 128 && t.push(Jt(f));
  const o = t.length;
  let l = o;
  for (o && t.push(Hi); l < r; ) {
    let f = Ye;
    for (const d of e)
      d >= n && d < f && (f = d);
    const c = l + 1;
    f - n > Ee((Ye - i) / c) && Oe("overflow"), i += (f - n) * c, n = f;
    for (const d of e)
      if (d < n && ++i > Ye && Oe("overflow"), d === n) {
        let u = i;
        for (let p = Ae; ; p += Ae) {
          const a = p <= s ? Mr : p >= s + rt ? rt : p - s;
          if (u < a)
            break;
          const h = u - a, m = Ae - a;
          t.push(
            Jt(wn(a + h % m, 0))
          ), u = Ee(h / m);
        }
        t.push(Jt(wn(u, 0))), s = Zi(i, c, l === o), i = 0, ++l;
      }
    ++i, ++n;
  }
  return t.join("");
}, Ma = function(e) {
  return Yi(e, function(t) {
    return Da.test(t) ? Xi(t.slice(4).toLowerCase()) : t;
  });
}, Pa = function(e) {
  return Yi(e, function(t) {
    return Ia.test(t) ? "xn--" + Ki(t) : t;
  });
}, vn = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Gi,
    encode: Oa
  },
  decode: Xi,
  encode: Ki,
  toASCII: Pa,
  toUnicode: Ma
};
var yn = Object.defineProperty, Qi = (e, t) => {
  let r = {};
  for (var n in e) yn(r, n, {
    get: e[n],
    enumerable: !0
  });
  return yn(r, Symbol.toStringTag, { value: "Module" }), r;
}, La = /* @__PURE__ */ Qi({
  arrayReplaceAt: () => qa,
  asciiTrim: () => It,
  callable: () => es,
  escapeHtml: () => Me,
  escapeRE: () => Ga,
  fromCodePoint: () => nt,
  isMdAsciiPunct: () => ot,
  isPunctChar: () => rs,
  isPunctCharCode: () => st,
  isSpace: () => ne,
  isValidEntityCode: () => Pr,
  isWhiteSpace: () => it,
  lib: () => Za,
  normalizeReference: () => Dt,
  unescapeAll: () => Xe,
  unescapeMd: () => Ua
});
function es(e) {
  const t = function(...r) {
    return Reflect.construct(e, r, new.target && new.target !== t ? new.target : e);
  };
  return Object.defineProperty(t, "name", { value: e.name }), Object.setPrototypeOf(t, e), t.prototype = e.prototype, t;
}
function qa(e, t, r) {
  return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function Pr(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function nt(e) {
  if (e > 65535) {
    e -= 65536;
    const t = 55296 + (e >> 10), r = 56320 + (e & 1023);
    return String.fromCharCode(t, r);
  }
  return String.fromCharCode(e);
}
var ts = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, za = new RegExp(`${ts.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`, "gi"), ja = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function $a(e, t) {
  if (t.charCodeAt(0) === 35 && ja.test(t)) {
    const n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return Pr(n) ? nt(n) : e;
  }
  const r = ji(e);
  return r !== e ? r : e;
}
function Ua(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(ts, "$1");
}
function Xe(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(za, function(t, r, n) {
    return r || $a(t, n);
  });
}
var Ja = /[&<>"]/, Wa = /[&<>"]/g, Va = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function Ha(e) {
  return Va[e];
}
function Me(e) {
  return Ja.test(e) ? e.replace(Wa, Ha) : e;
}
var Ya = /[.?*+^$[\]\\(){}|-]/g;
function Ga(e) {
  return e.replace(Ya, "\\$&");
}
function ne(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function it(e) {
  if (e >= 8192 && e <= 8202) return !0;
  switch (e) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function rs(e) {
  return Or.test(e) || Ii.test(e);
}
function st(e) {
  return rs(nt(e));
}
function ot(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Dt(e) {
  return e = e.trim().replace(/\s+/g, " "), e.toLowerCase().toUpperCase();
}
function _n(e) {
  return e === 32 || e === 9 || e === 10 || e === 13;
}
function It(e) {
  let t = 0;
  for (; t < e.length && _n(e.charCodeAt(t)); t++) ;
  let r = e.length - 1;
  for (; r >= t && _n(e.charCodeAt(r)); r--) ;
  return e.slice(t, r + 1);
}
var Za = {
  mdurl: ra,
  ucmicro: ia
};
function Xa(e, t, r) {
  let n, i, s, o;
  const l = e.posMax, f = e.pos;
  for (e.pos = t + 1, n = 1; e.pos < l; ) {
    if (s = e.src.charCodeAt(e.pos), s === 93 && (n--, n === 0)) {
      i = !0;
      break;
    }
    if (o = e.pos, e.md.inline.skipToken(e), s === 91) {
      if (o === e.pos - 1) n++;
      else if (r)
        return e.pos = f, -1;
    }
  }
  let c = -1;
  return i && (c = e.pos), e.pos = f, c;
}
function Ka(e, t, r) {
  let n, i = t;
  const s = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(i) === 60) {
    for (i++; i < r; ) {
      if (n = e.charCodeAt(i), n === 10 || n === 60) return s;
      if (n === 62)
        return s.pos = i + 1, s.str = Xe(e.slice(t + 1, i)), s.ok = !0, s;
      if (n === 92 && i + 1 < r) {
        i += 2;
        continue;
      }
      i++;
    }
    return s;
  }
  let o = 0;
  for (; i < r && (n = e.charCodeAt(i), !(n === 32 || n < 32 || n === 127)); ) {
    if (n === 92 && i + 1 < r) {
      if (e.charCodeAt(i + 1) === 32) {
        i++;
        continue;
      }
      i += 2;
      continue;
    }
    if (n === 40 && (o++, o > 32))
      return s;
    if (n === 41) {
      if (o === 0) break;
      o--;
    }
    i++;
  }
  return t === i || o !== 0 || (s.str = Xe(e.slice(t, i)), s.pos = i, s.ok = !0), s;
}
function Qa(e, t, r, n) {
  let i, s = t;
  const o = {
    ok: !1,
    can_continue: !1,
    pos: 0,
    str: "",
    marker: 0
  };
  if (n)
    o.str = n.str, o.marker = n.marker;
  else {
    if (s >= r) return o;
    let l = e.charCodeAt(s);
    if (l !== 34 && l !== 39 && l !== 40) return o;
    t++, s++, l === 40 && (l = 41), o.marker = l;
  }
  for (; s < r; ) {
    if (i = e.charCodeAt(s), i === o.marker)
      return o.pos = s + 1, o.str += Xe(e.slice(t, s)), o.ok = !0, o;
    if (i === 40 && o.marker === 41) return o;
    i === 92 && s + 1 < r && s++, s++;
  }
  return o.can_continue = !0, o.str += Xe(e.slice(t, s)), o;
}
var el = /* @__PURE__ */ Qi({
  parseLinkDestination: () => Ka,
  parseLinkLabel: () => Xa,
  parseLinkTitle: () => Qa
});
function at(e) {
  "@babel/helpers - typeof";
  return at = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, at(e);
}
function tl(e, t) {
  if (at(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (at(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rl(e) {
  var t = tl(e, "string");
  return at(t) == "symbol" ? t : t + "";
}
function z(e, t, r) {
  return (t = rl(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var je = class {
  constructor(e, t, r) {
    z(
      this,
      /**
      * Source map info. Format: `[ line_begin, line_end ]`
      */
      "map",
      null
    ), z(
      this,
      /**
      * nesting level, the same as `state.level`
      */
      "level",
      0
    ), z(
      this,
      /**
      * An array of child nodes (inline and img tokens)
      */
      "children",
      null
    ), z(
      this,
      /**
      * In a case of self-closing tag (code, html, fence, etc.),
      * it has contents of this tag.
      */
      "content",
      ""
    ), z(
      this,
      /**
      * '*' or '_' for emphasis, fence string for fence, etc.
      */
      "markup",
      ""
    ), z(
      this,
      /**
      * Additional information:
      *
      * - Info string for "fence" tokens
      * - The value "auto" for autolink "link_open" and "link_close" tokens
      * - The string value of the item marker for ordered-list "list_item_open" tokens
      */
      "info",
      ""
    ), z(
      this,
      /**
      * True for block-level tokens, false for inline tokens.
      * Used in renderer to calculate line breaks
      */
      "block",
      !1
    ), z(
      this,
      /**
      * If it's true, ignore this element when rendering. Used for tight lists
      * to hide paragraphs.
      */
      "hidden",
      !1
    ), this.type = e, this.tag = t, this.attrs = null, this.nesting = r, this.meta = null;
  }
  /**
  * Search attribute index by name.
  */
  attrIndex(e) {
    if (!this.attrs) return -1;
    const t = this.attrs;
    for (let r = 0, n = t.length; r < n; r++) if (t[r][0] === e) return r;
    return -1;
  }
  /**
  * Add `[ name, value ]` attribute to list. Init attrs if necessary
  */
  attrPush(e) {
    this.attrs ? this.attrs.push(e) : this.attrs = [e];
  }
  /**
  * Set `name` attribute to `value`. Override old value if exists.
  */
  attrSet(e, t) {
    const r = this.attrIndex(e), n = [e, t];
    r < 0 ? this.attrPush(n) : this.attrs[r] = n;
  }
  /**
  * Get the value of attribute `name`, or null if it does not exist.
  */
  attrGet(e) {
    const t = this.attrIndex(e);
    let r = null;
    return t >= 0 && (r = this.attrs[t][1]), r;
  }
  /**
  * Join value to existing attribute via space. Or create new attribute if not
  * exists. Useful to operate with token classes.
  */
  attrJoin(e, t) {
    const r = this.attrIndex(e);
    r < 0 ? this.attrPush([e, t]) : this.attrs[r][1] = `${this.attrs[r][1]} ${t}`;
  }
}, lt = class {
  constructor() {
    z(
      this,
      /** @internal */
      "__rules__",
      []
    ), z(
      this,
      /** @internal */
      "__cache__",
      null
    );
  }
  /** @internal */
  __find__(e) {
    for (let t = 0; t < this.__rules__.length; t++) if (this.__rules__[t].name === e) return t;
    return -1;
  }
  /** @internal */
  __compile__() {
    const e = /* @__PURE__ */ new Set();
    this.__rules__.forEach((t) => {
      t.enabled && t.alt.forEach((r) => {
        r && e.add(r);
      });
    }), this.__cache__ = /* @__PURE__ */ Object.create(null), this.__cache__[""] = [], this.__rules__.forEach((t) => {
      t.enabled && this.__cache__[""].push(t.fn);
    }), e.forEach((t) => {
      this.__cache__[t] = [], this.__rules__.forEach((r) => {
        r.enabled && r.alt.indexOf(t) >= 0 && this.__cache__[t].push(r.fn);
      });
    });
  }
  /**
  * Replace rule by name with new function & options. Throws error if name not
  * found.
  *
  * @example Replace existing typographer replacement rule with new one
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * const md = new MarkdownIt()
  *
  * md.core.ruler.at('replacements', function replace(state) {
  *   //...
  * });
  * ```
  */
  at(e, t, r = {}) {
    const n = this.__find__(e);
    if (n === -1) throw new Error(`Parser rule not found: ${e}`);
    this.__rules__[n].fn = t, this.__rules__[n].alt = r.alt || [], this.__cache__ = null;
  }
  /**
  * Add new rule to chain before one with given name. See also
  * {@link Ruler.after}, {@link Ruler.push}.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * const md = new MarkdownIt()
  *
  * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
  *   //...
  * });
  * ```
  */
  before(e, t, r, n = {}) {
    const i = this.__find__(e);
    if (i === -1) throw new Error(`Parser rule not found: ${e}`);
    this.__rules__.splice(i, 0, {
      name: t,
      enabled: !0,
      fn: r,
      alt: n.alt || []
    }), this.__cache__ = null;
  }
  /**
  * Add new rule to chain after one with given name. See also
  * {@link Ruler.before}, {@link Ruler.push}.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * const md = new MarkdownIt()
  *
  * md.inline.ruler.after('text', 'my_rule', function replace(state) {
  *   //...
  * });
  * ```
  */
  after(e, t, r, n = {}) {
    const i = this.__find__(e);
    if (i === -1) throw new Error(`Parser rule not found: ${e}`);
    this.__rules__.splice(i + 1, 0, {
      name: t,
      enabled: !0,
      fn: r,
      alt: n.alt || []
    }), this.__cache__ = null;
  }
  /**
  * Push new rule to the end of chain. See also
  * {@link Ruler.before}, {@link Ruler.after}.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * const md = new MarkdownIt()
  *
  * md.core.ruler.push('my_rule', function replace(state) {
  *   //...
  * });
  * ```
  */
  push(e, t, r = {}) {
    this.__rules__.push({
      name: e,
      enabled: !0,
      fn: t,
      alt: r.alt || []
    }), this.__cache__ = null;
  }
  /**
  * Enable rules with given names. If any rule name not found - throw Error.
  * Errors can be disabled by second param.
  *
  * See also {@link Ruler.disable}, {@link Ruler.enableOnly}.
  *
  * Returns list of found rule names (if no exception happened).
  */
  enable(e, t = !1) {
    Array.isArray(e) || (e = [e]);
    const r = [];
    return e.forEach((n) => {
      const i = this.__find__(n);
      if (i < 0) {
        if (t) return;
        throw new Error(`Rules manager: invalid rule name ${n}`);
      }
      this.__rules__[i].enabled = !0, r.push(n);
    }), this.__cache__ = null, r;
  }
  /**
  * Enable rules with given names, and disable everything else. If any rule name
  * not found - throw Error. Errors can be disabled by second param.
  *
  * See also {@link Ruler.disable}, {@link Ruler.enable}.
  */
  enableOnly(e, t = !1) {
    Array.isArray(e) || (e = [e]), this.__rules__.forEach((r) => {
      r.enabled = !1;
    }), this.enable(e, t);
  }
  /**
  * Disable rules with given names. If any rule name not found - throw Error.
  * Errors can be disabled by second param.
  *
  * See also {@link Ruler.enable}, {@link Ruler.enableOnly}.
  *
  * Returns list of found rule names (if no exception happened).
  */
  disable(e, t = !1) {
    Array.isArray(e) || (e = [e]);
    const r = [];
    return e.forEach((n) => {
      const i = this.__find__(n);
      if (i < 0) {
        if (t) return;
        throw new Error(`Rules manager: invalid rule name ${n}`);
      }
      this.__rules__[i].enabled = !1, r.push(n);
    }), this.__cache__ = null, r;
  }
  /**
  * Return array of active functions (rules) for given chain name. It analyzes
  * rules configuration, compiles caches if not exists and returns result.
  *
  * Default chain name is `''` (empty string). It can't be skipped. That's
  * done intentionally, to keep signature monomorphic for high speed.
  */
  getRules(e) {
    return this.__cache__ || this.__compile__(), this.__cache__[e] || [];
  }
}, De = {};
De.code_inline = function(e, t, r, n, i) {
  const s = e[t];
  return `<code${i.renderAttrs(s)}>${Me(s.content)}</code>`;
};
De.code_block = function(e, t, r, n, i) {
  const s = e[t];
  return `<pre${i.renderAttrs(s)}><code>${Me(e[t].content)}</code></pre>
`;
};
De.fence = function(e, t, r, n, i) {
  const s = e[t], o = s.info ? Xe(s.info).trim() : "";
  let l = "", f = "";
  if (o) {
    const d = o.split(/(\s+)/g);
    l = d[0], f = d.slice(2).join("");
  }
  let c;
  if (r.highlight ? c = r.highlight(s.content, l, f) || Me(s.content) : c = Me(s.content), c.indexOf("<pre") === 0) return c + `
`;
  if (o) {
    const d = s.attrIndex("class"), u = s.attrs ? s.attrs.slice() : [];
    d < 0 ? u.push(["class", `${r.langPrefix}${l}`]) : (u[d] = [u[d][0], u[d][1]], u[d][1] += ` ${r.langPrefix}${l}`);
    const p = { attrs: u };
    return `<pre><code${i.renderAttrs(p)}>${c}</code></pre>
`;
  }
  return `<pre><code${i.renderAttrs(s)}>${c}</code></pre>
`;
};
De.image = function(e, t, r, n, i) {
  const s = e[t];
  return s.attrs[s.attrIndex("alt")][1] = i.renderInlineAsText(s.children, r, n), i.renderToken(e, t, r);
};
De.hardbreak = function(e, t, r) {
  return r.xhtmlOut ? `<br />
` : `<br>
`;
};
De.softbreak = function(e, t, r) {
  return r.breaks ? r.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
De.text = function(e, t) {
  return Me(e[t].content);
};
De.html_block = function(e, t) {
  return e[t].content;
};
De.html_inline = function(e, t) {
  return e[t].content;
};
var ns = class {
  constructor() {
    z(
      this,
      /**
      * Contains render rules for tokens. Can be updated and extended.
      *
      * See [source code](https://github.com/markdown-it/markdown-it/blob/master/src/renderer.ts)
      * for more details and examples.
      *
      * @example Custom render rules
      * ```javascript
      * import MarkdownIt from 'markdown-it'
      * const md = new MarkdownIt()
      *
      * md.renderer.rules.strong_open  = function () { return '<b>'; };
      * md.renderer.rules.strong_close = function () { return '</b>'; };
      *
      * const result = md.renderInline(...);
      * ```
      *
      * @example Each rule is called as independent static function with fixed signature
      * ```javascript
      * function my_token_render(tokens, idx, options, env, renderer) {
      *   // ...
      *   return renderedHTML;
      * }
      * ```
      */
      "rules",
      Object.assign({}, De)
    );
  }
  /**
  * Render token attributes to string.
  */
  renderAttrs(e) {
    let t, r, n;
    if (!e.attrs) return "";
    for (n = "", t = 0, r = e.attrs.length; t < r; t++) n += ` ${Me(e.attrs[t][0])}="${Me(String(e.attrs[t][1]))}"`;
    return n;
  }
  /**
  * Default token renderer. Can be overriden by custom function
  * in {@link Renderer.rules}.
  */
  renderToken(e, t, r) {
    const n = e[t];
    let i = "";
    if (n.hidden) return "";
    let s = t - 1;
    for (; s >= 0 && e[s].hidden && e[s].nesting === 0; ) s--;
    n.block && n.nesting !== -1 && s >= 0 && e[s].hidden && e[s].nesting === -1 && (i += `
`), i += (n.nesting === -1 ? "</" : "<") + n.tag, i += this.renderAttrs(n), n.nesting === 0 && r.xhtmlOut && (i += " /");
    let o = !1;
    if (n.block && (o = !0, n.nesting === 1)) {
      let l = t + 1;
      for (; l < e.length && e[l].hidden && e[l].nesting === 0; ) l++;
      if (l < e.length) {
        const f = e[l];
        (f.type === "inline" || f.hidden || f.nesting === -1 && f.tag === n.tag) && (o = !1);
      }
    }
    return i += o ? `>
` : ">", i;
  }
  /**
  * The same as {@link Renderer.render}, but for single token of `inline` type.
  */
  renderInline(e, t, r) {
    let n = "";
    const i = this.rules;
    for (let s = 0, o = e.length; s < o; s++) {
      const l = e[s].type;
      typeof i[l] < "u" ? n += i[l](e, s, t, r, this) : n += this.renderToken(e, s, t);
    }
    return n;
  }
  /**
  * Special kludge for image `alt` attributes to conform CommonMark spec.
  * Don't try to use it! Spec requires to show `alt` content with stripped markup,
  * instead of simple escaping.
  */
  renderInlineAsText(e, t, r) {
    let n = "";
    for (let i = 0, s = e.length; i < s; i++) switch (e[i].type) {
      case "text":
      case "code_inline":
        n += e[i].content;
        break;
      case "image":
        n += this.renderInlineAsText(e[i].children, t, r);
        break;
      case "html_inline":
      case "html_block":
        n += e[i].content;
        break;
      case "softbreak":
      case "hardbreak":
        n += `
`;
    }
    return n;
  }
  /**
  * Takes token stream and generates HTML. Probably, you will never need to call
  * this method directly.
  */
  render(e, t, r) {
    let n = "";
    const i = this.rules;
    for (let s = 0, o = e.length; s < o; s++) {
      const l = e[s].type;
      l === "inline" ? n += this.renderInline(e[s].children, t, r) : typeof i[l] < "u" ? n += i[l](e, s, t, r, this) : n += this.renderToken(e, s, t);
    }
    return n;
  }
}, is = class {
  constructor(e, t, r) {
    z(this, "tokens", []), z(this, "inlineMode", !1), z(this, "Token", je), this.src = e, this.env = r, this.md = t;
  }
}, nl = /\r\n?/g, il = /\0/g;
function sl(e) {
  let t;
  t = e.src.replace(nl, `
`), t = t.replace(il, "�"), e.src = t;
}
function ol(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function al(e) {
  const t = e.tokens;
  let r = 0;
  for (let n = 0; n < t.length; n++)
    t[n].type !== "reference_definition" && (n !== r && (t[r] = t[n]), r++);
  t.length !== r && (t.length = r);
}
function ll(e) {
  const t = e.tokens;
  for (let r = 0, n = t.length; r < n; r++) {
    const i = t[r];
    i.type === "inline" && e.md.inline.parse(i.content, e.md, e.env, i.children);
  }
}
function cl(e) {
  return /^<a[>\s]/i.test(e);
}
function ul(e) {
  return /^<\/a\s*>/i.test(e);
}
function hl(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let r = 0, n = t.length; r < n; r++) {
      if (t[r].type !== "inline" || !e.md.linkify.test(t[r].content)) continue;
      const i = t[r].children, s = [];
      let o = 0;
      for (let l = i.length - 1; l >= 0; l--) {
        const f = i[l];
        if (f.type === "link_close") {
          for (l--; i[l].level !== f.level && i[l].type !== "link_open"; ) l--;
          continue;
        }
        if (f.type === "html_inline" && (cl(f.content) && o > 0 && o--, ul(f.content) && o++), !(o > 0) && f.type === "text" && e.md.linkify.test(f.content)) {
          const c = f.content;
          let d = e.md.linkify.match(c);
          const u = [];
          let p = f.level, a = 0;
          d.length > 0 && d[0].index === 0 && l > 0 && i[l - 1].type === "text_special" && (d = d.slice(1));
          for (let h = 0; h < d.length; h++) {
            const m = d[h].url, g = e.md.normalizeLink(m);
            if (!e.md.validateLink(g)) continue;
            let k = d[h].text;
            d[h].schema ? d[h].schema === "mailto:" && !/^mailto:/i.test(k) ? k = e.md.normalizeLinkText(`mailto:${k}`).replace(/^mailto:/, "") : k = e.md.normalizeLinkText(k) : k = e.md.normalizeLinkText(`http://${k}`).replace(/^http:\/\//, "");
            const y = d[h].index;
            if (y > a) {
              const b = new e.Token("text", "", 0);
              b.content = c.slice(a, y), b.level = p, u.push(b);
            }
            const _ = new e.Token("link_open", "a", 1);
            _.attrs = [["href", g]], _.level = p++, _.markup = "linkify", _.info = "auto", u.push(_);
            const C = new e.Token("text", "", 0);
            C.content = k, C.level = p, u.push(C);
            const w = new e.Token("link_close", "a", -1);
            w.level = --p, w.markup = "linkify", w.info = "auto", u.push(w), a = d[h].lastIndex;
          }
          if (a < c.length) {
            const h = new e.Token("text", "", 0);
            h.content = c.slice(a), h.level = p, u.push(h);
          }
          s.push({
            index: l,
            nodes: u
          });
        }
      }
      if (s.length > 0) {
        let l = i.length;
        for (const u of s) l += u.nodes.length - 1;
        const f = new Array(l);
        let c = 0, d = 0;
        s.reverse();
        for (let u = 0; u < i.length; u++) {
          const p = s[c];
          if (p?.index === u) {
            for (const a of p.nodes) f[d++] = a;
            c++;
          } else f[d++] = i[u];
        }
        t[r].children = f;
      }
    }
}
var ss = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, fl = /\((c|tm|r)\)/i, pl = /\((c|tm|r)\)/gi, dl = {
  c: "©",
  r: "®",
  tm: "™"
};
function ml(e, t) {
  return dl[t.toLowerCase()];
}
function gl(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && (n.content = n.content.replace(pl, ml)), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function bl(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && ss.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function xl(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (fl.test(e.tokens[t].content) && gl(e.tokens[t].children), ss.test(e.tokens[t].content) && bl(e.tokens[t].children));
}
var wl = /['"]/, kn = /['"]/g, Cn = "’", vl = 1e3;
function Rn(e, t, r) {
  for (; e.length > r; ) {
    const n = e.pop();
    n.isSingleQuote ? t.single = n.prevSameQuoteIdx : t.double = n.prevSameQuoteIdx;
  }
}
function mt(e, t, r, n) {
  e[t] || (e[t] = []), e[t].push({
    pos: r,
    ch: n
  });
}
function yl(e, t) {
  let r = "", n = 0;
  t.sort((i, s) => i.pos - s.pos);
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    r += e.slice(n, s.pos) + s.ch, n = s.pos + 1;
  }
  return r + e.slice(n);
}
function _l(e, t) {
  let r;
  const n = [], i = {
    single: -1,
    double: -1
  }, s = {};
  for (let o = 0; o < e.length; o++) {
    const l = e[o], f = e[o].level;
    for (r = n.length - 1; r >= 0 && !(n[r].level <= f); r--) ;
    if (Rn(n, i, r + 1), l.type !== "text") continue;
    const c = l.content;
    let d = 0;
    const u = c.length;
    e: for (; d < u; ) {
      kn.lastIndex = d;
      const p = kn.exec(c);
      if (!p) break;
      let a = !0, h = !0;
      d = p.index + 1;
      const m = p[0] === "'";
      let g = 32;
      if (p.index - 1 >= 0) g = c.charCodeAt(p.index - 1);
      else for (r = o - 1; r >= 0 && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r--)
        if (e[r].content) {
          g = e[r].content.charCodeAt(e[r].content.length - 1);
          break;
        }
      let k = 32;
      if (d < u) k = c.charCodeAt(d);
      else for (r = o + 1; r < e.length && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r++)
        if (e[r].content) {
          k = e[r].content.charCodeAt(0);
          break;
        }
      const y = ot(g) || st(g), _ = ot(k) || st(k), C = it(g), w = it(k);
      if (w ? a = !1 : _ && (C || y || (a = !1)), C ? h = !1 : y && (w || _ || (h = !1)), k === 34 && p[0] === '"' && g >= 48 && g <= 57 && (h = a = !1), a && h && (a = y, h = _), !a && !h) {
        m && mt(s, o, p.index, Cn);
        continue;
      }
      if (h && (r = m ? i.single : i.double, r >= 0 && n[r].level === f)) {
        const b = n[r];
        let v, x;
        m ? (v = t.md.options.quotes[2], x = t.md.options.quotes[3]) : (v = t.md.options.quotes[0], x = t.md.options.quotes[1]), mt(s, o, p.index, x), mt(s, b.tokenIdx, b.contentPos, v), Rn(n, i, r);
        continue e;
      }
      if (a) {
        if (n.length >= vl) return;
        n.push({
          tokenIdx: o,
          contentPos: p.index,
          isSingleQuote: m,
          level: f,
          prevSameQuoteIdx: m ? i.single : i.double
        }), m ? i.single = n.length - 1 : i.double = n.length - 1;
      } else h && m && mt(s, o, p.index, Cn);
    }
  }
  Object.keys(s).forEach(function(o) {
    const l = Number(o);
    e[l].content = yl(e[l].content, s[o]);
  });
}
function kl(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !wl.test(e.tokens[t].content) || _l(e.tokens[t].children, e);
}
function Cl(e) {
  let t, r;
  const n = e.length;
  for (t = 0; t < n; t++) e[t].type === "text_special" && (e[t].type = "text");
  for (t = r = 0; t < n; t++) e[t].type === "text" && t + 1 < n && e[t + 1].type === "text" ? e[t + 1].content = e[t].content + e[t + 1].content : (t !== r && (e[r] = e[t]), r++);
  t !== r && (e.length = r);
}
function Rl(e) {
  let t, r;
  const n = e.tokens, i = n.length;
  for (let s = 0; s < i; s++) {
    if (n[s].type !== "inline") continue;
    const o = n[s].children, l = o.length;
    for (t = 0; t < l; t++)
      o[t].type === "text_special" && (o[t].type = "text"), o[t].children && Cl(o[t].children);
    for (t = r = 0; t < l; t++) o[t].type === "text" && t + 1 < l && o[t + 1].type === "text" ? o[t + 1].content = o[t].content + o[t + 1].content : (t !== r && (o[r] = o[t]), r++);
    t !== r && (o.length = r);
  }
}
var Wt = [
  ["normalize", sl],
  ["block", ol],
  ["strip_references", al],
  ["inline", ll],
  ["linkify", hl],
  ["replacements", xl],
  ["smartquotes", kl],
  ["text_join", Rl]
], os = class {
  constructor() {
    z(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of core rules.
      */
      "ruler",
      new lt()
    ), z(this, "State", is);
    for (let e = 0; e < Wt.length; e++) this.ruler.push(Wt[e][0], Wt[e][1]);
  }
  /**
  * Executes core chain rules.
  */
  process(e) {
    const t = this.ruler.getRules("");
    for (let r = 0, n = t.length; r < n; r++) t[r](e);
  }
}, as = class {
  constructor(e, t, r, n) {
    z(this, "bMarks", []), z(this, "eMarks", []), z(this, "tShift", []), z(this, "sCount", []), z(this, "bsCount", []), z(this, "blkIndent", 0), z(this, "line", 0), z(this, "lineMax", 0), z(this, "tight", !1), z(this, "listIndent", -1), z(this, "parentType", "root"), z(this, "level", 0), z(this, "Token", je), this.src = e, this.md = t, this.env = r, this.tokens = n;
    const i = this.src;
    for (let s = 0, o = 0, l = 0, f = 0, c = i.length, d = !1; o < c; o++) {
      const u = i.charCodeAt(o);
      if (!d)
        if (ne(u)) {
          l++, u === 9 ? f += 4 - f % 4 : f++;
          continue;
        } else d = !0;
      (u === 10 || o === c - 1) && (u !== 10 && o++, this.bMarks.push(s), this.eMarks.push(o), this.tShift.push(l), this.sCount.push(f), this.bsCount.push(0), d = !1, l = 0, f = 0, s = o + 1);
    }
    this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  push(e, t, r) {
    const n = new je(e, t, r);
    return n.block = !0, r < 0 && this.level--, n.level = this.level, r > 0 && this.level++, this.tokens.push(n), n;
  }
  isEmpty(e) {
    return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
  }
  skipEmptyLines(e) {
    for (let t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++) ;
    return e;
  }
  skipSpaces(e) {
    for (let t = this.src.length; e < t && ne(this.src.charCodeAt(e)); e++) ;
    return e;
  }
  skipSpacesBack(e, t) {
    if (e <= t) return e;
    for (; e > t; ) if (!ne(this.src.charCodeAt(--e))) return e + 1;
    return e;
  }
  skipChars(e, t) {
    for (let r = this.src.length; e < r && this.src.charCodeAt(e) === t; e++) ;
    return e;
  }
  skipCharsBack(e, t, r) {
    if (e <= r) return e;
    for (; e > r; ) if (t !== this.src.charCodeAt(--e)) return e + 1;
    return e;
  }
  getLines(e, t, r, n) {
    if (e >= t) return "";
    const i = new Array(t - e);
    for (let s = 0, o = e; o < t; o++, s++) {
      let l = 0;
      const f = this.bMarks[o];
      let c = f, d;
      for (o + 1 < t || n ? d = this.eMarks[o] + 1 : d = this.eMarks[o]; c < d && l < r; ) {
        const u = this.src.charCodeAt(c);
        if (ne(u))
          u === 9 ? l += 4 - (l + this.bsCount[o]) % 4 : l++;
        else if (c - f < this.tShift[o]) l++;
        else break;
        c++;
      }
      l > r ? i[s] = new Array(l - r + 1).join(" ") + this.src.slice(c, d) : i[s] = this.src.slice(c, d);
    }
    return i.join("");
  }
}, Al = 65536;
function Vt(e, t) {
  const r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  return e.src.slice(r, n);
}
function An(e) {
  const t = [], r = e.length;
  let n = 0, i = e.charCodeAt(n), s = !1, o = 0, l = "";
  for (; n < r; )
    i === 124 && (s ? (l += e.substring(o, n - 1), o = n) : (t.push(l + e.substring(o, n)), l = "", o = n + 1)), s = i === 92, n++, i = e.charCodeAt(n);
  return t.push(l + e.substring(o)), t;
}
function El(e, t, r, n) {
  if (t + 2 > r) return !1;
  let i = t + 1;
  if (e.sCount[i] < e.blkIndent || e.sCount[i] - e.blkIndent >= 4) return !1;
  let s = e.bMarks[i] + e.tShift[i];
  if (s >= e.eMarks[i]) return !1;
  const o = e.src.charCodeAt(s++);
  if (o !== 124 && o !== 45 && o !== 58 || s >= e.eMarks[i]) return !1;
  const l = e.src.charCodeAt(s++);
  if (l !== 124 && l !== 45 && l !== 58 && !ne(l) || o === 45 && ne(l)) return !1;
  for (; s < e.eMarks[i]; ) {
    const C = e.src.charCodeAt(s);
    if (C !== 124 && C !== 45 && C !== 58 && !ne(C)) return !1;
    s++;
  }
  let f = Vt(e, t + 1), c = f.split("|");
  const d = [];
  for (let C = 0; C < c.length; C++) {
    const w = c[C].trim();
    if (!w) {
      if (C === 0 || C === c.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(w)) return !1;
    w.charCodeAt(w.length - 1) === 58 ? d.push(w.charCodeAt(0) === 58 ? "center" : "right") : w.charCodeAt(0) === 58 ? d.push("left") : d.push("");
  }
  if (f = Vt(e, t).trim(), f.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4) return !1;
  c = An(f), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop();
  const u = c.length;
  if (u === 0 || u !== d.length) return !1;
  if (n) return !0;
  const p = e.parentType;
  e.parentType = "table";
  const a = e.md.block.ruler.getRules("blockquote"), h = e.push("table_open", "table", 1), m = [t, 0];
  h.map = m;
  const g = e.push("thead_open", "thead", 1);
  g.map = [t, t + 1];
  const k = e.push("tr_open", "tr", 1);
  k.map = [t, t + 1];
  for (let C = 0; C < c.length; C++) {
    const w = e.push("th_open", "th", 1);
    d[C] && (w.attrs = [["style", `text-align:${d[C]}`]]);
    const b = e.push("inline", "", 0);
    b.content = c[C].trim(), b.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let y, _ = 0;
  for (i = t + 2; i < r && !(e.sCount[i] < e.blkIndent); i++) {
    let C = !1;
    for (let b = 0, v = a.length; b < v; b++) if (a[b](e, i, r, !0)) {
      C = !0;
      break;
    }
    if (C || (f = Vt(e, i).trim(), !f) || e.sCount[i] - e.blkIndent >= 4 || (c = An(f), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop(), _ += u - c.length, _ > Al)) break;
    if (i === t + 2) {
      const b = e.push("tbody_open", "tbody", 1);
      b.map = y = [t + 2, 0];
    }
    const w = e.push("tr_open", "tr", 1);
    w.map = [i, i + 1];
    for (let b = 0; b < u; b++) {
      const v = e.push("td_open", "td", 1);
      d[b] && (v.attrs = [["style", `text-align:${d[b]}`]]);
      const x = e.push("inline", "", 0);
      x.content = c[b] ? c[b].trim() : "", x.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return y && (e.push("tbody_close", "tbody", -1), y[1] = i), e.push("table_close", "table", -1), m[1] = i, e.parentType = p, e.line = i, !0;
}
function Sl(e, t, r) {
  if (e.sCount[t] - e.blkIndent < 4) return !1;
  let n = t + 1, i = n;
  for (; n < r; ) {
    if (e.isEmpty(n)) {
      n++;
      continue;
    }
    if (e.sCount[n] - e.blkIndent >= 4) {
      n++, i = n;
      continue;
    }
    break;
  }
  e.line = i;
  const s = e.push("code_block", "code", 0);
  return s.content = e.getLines(t, i, 4 + e.blkIndent, !1) + `
`, s.map = [t, e.line], !0;
}
function Dl(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || i + 3 > s) return !1;
  const o = e.src.charCodeAt(i);
  if (o !== 126 && o !== 96) return !1;
  let l = i;
  i = e.skipChars(i, o);
  let f = i - l;
  if (f < 3) return !1;
  const c = e.src.slice(l, i), d = e.src.slice(i, s);
  if (o === 96 && d.indexOf(String.fromCharCode(o)) >= 0)
    return !1;
  if (n) return !0;
  let u = t, p = !1;
  for (; u++, !(u >= r || (i = l = e.bMarks[u] + e.tShift[u], s = e.eMarks[u], i < s && e.sCount[u] < e.blkIndent)); )
    if (e.src.charCodeAt(i) === o && !(e.sCount[u] - e.blkIndent >= 4) && (i = e.skipChars(i, o), !(i - l < f) && (i = e.skipSpaces(i), !(i < s)))) {
      p = !0;
      break;
    }
  f = e.sCount[t], e.line = u + (p ? 1 : 0);
  const a = e.push("fence", "code", 0);
  return a.info = d, a.content = e.getLines(t + 1, u, f, !0), a.markup = c, a.map = [t, e.line], !0;
}
function Il(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  const o = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 62) return !1;
  if (n) return !0;
  const l = [], f = [], c = [], d = [], u = e.md.block.ruler.getRules("blockquote"), p = e.parentType;
  e.parentType = "blockquote";
  let a = !1, h;
  for (h = t; h < r; h++) {
    const _ = e.sCount[h] < e.blkIndent;
    if (i = e.bMarks[h] + e.tShift[h], s = e.eMarks[h], i >= s) break;
    if (e.src.charCodeAt(i++) === 62 && !_) {
      let w = e.sCount[h] + 1, b, v;
      e.src.charCodeAt(i) === 32 ? (i++, w++, v = !1, b = !0) : e.src.charCodeAt(i) === 9 ? (b = !0, (e.bsCount[h] + w) % 4 === 3 ? (i++, w++, v = !1) : v = !0) : b = !1;
      let x = w;
      for (l.push(e.bMarks[h]), e.bMarks[h] = i; i < s; ) {
        const R = e.src.charCodeAt(i);
        if (ne(R))
          R === 9 ? x += 4 - (x + e.bsCount[h] + (v ? 1 : 0)) % 4 : x++;
        else break;
        i++;
      }
      a = i >= s, f.push(e.bsCount[h]), e.bsCount[h] = e.sCount[h] + 1 + (b ? 1 : 0), c.push(e.sCount[h]), e.sCount[h] = x - w, d.push(e.tShift[h]), e.tShift[h] = i - e.bMarks[h];
      continue;
    }
    if (a) break;
    let C = !1;
    for (let w = 0, b = u.length; w < b; w++) if (u[w](e, h, r, !0)) {
      C = !0;
      break;
    }
    if (C) {
      e.lineMax = h, e.blkIndent !== 0 && (l.push(e.bMarks[h]), f.push(e.bsCount[h]), d.push(e.tShift[h]), c.push(e.sCount[h]), e.sCount[h] -= e.blkIndent);
      break;
    }
    l.push(e.bMarks[h]), f.push(e.bsCount[h]), d.push(e.tShift[h]), c.push(e.sCount[h]), e.sCount[h] = -1;
  }
  const m = e.blkIndent;
  e.blkIndent = 0;
  const g = e.push("blockquote_open", "blockquote", 1);
  g.markup = ">";
  const k = [t, 0];
  g.map = k, e.md.block.tokenize(e, t, h);
  const y = e.push("blockquote_close", "blockquote", -1);
  y.markup = ">", e.lineMax = o, e.parentType = p, k[1] = e.line;
  for (let _ = 0; _ < d.length; _++)
    e.bMarks[_ + t] = l[_], e.tShift[_ + t] = d[_], e.sCount[_ + t] = c[_], e.bsCount[_ + t] = f[_];
  return e.blkIndent = m, !0;
}
function Tl(e, t, r, n) {
  const i = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  let s = e.bMarks[t] + e.tShift[t];
  const o = e.src.charCodeAt(s++);
  if (o !== 42 && o !== 45 && o !== 95) return !1;
  let l = 1;
  for (; s < i; ) {
    const c = e.src.charCodeAt(s++);
    if (c !== o && !ne(c)) return !1;
    c === o && l++;
  }
  if (l < 3) return !1;
  if (n) return !0;
  e.line = t + 1;
  const f = e.push("hr", "hr", 0);
  return f.map = [t, e.line], f.markup = Array(l + 1).join(String.fromCharCode(o)), !0;
}
function En(e, t) {
  const r = e.eMarks[t];
  let n = e.bMarks[t] + e.tShift[t];
  const i = e.src.charCodeAt(n++);
  return i !== 42 && i !== 45 && i !== 43 || n < r && !ne(e.src.charCodeAt(n)) ? -1 : n;
}
function Sn(e, t) {
  const r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  let i = r;
  if (i + 1 >= n) return -1;
  let s = e.src.charCodeAt(i++);
  if (s < 48 || s > 57) return -1;
  for (; ; ) {
    if (i >= n) return -1;
    if (s = e.src.charCodeAt(i++), s >= 48 && s <= 57) {
      if (i - r >= 10) return -1;
      continue;
    }
    if (s === 41 || s === 46) break;
    return -1;
  }
  return i < n && (s = e.src.charCodeAt(i), !ne(s)) ? -1 : i;
}
function Fl(e, t) {
  const r = e.level + 2;
  for (let n = t + 2, i = e.tokens.length - 2; n < i; n++) e.tokens[n].level === r && e.tokens[n].type === "paragraph_open" && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
function Nl(e, t, r, n) {
  let i, s, o, l, f = t, c = !0;
  if (e.sCount[f] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[f] - e.listIndent >= 4 && e.sCount[f] < e.blkIndent) return !1;
  let d = !1;
  n && e.parentType === "paragraph" && e.sCount[f] >= e.blkIndent && (d = !0);
  let u, p, a;
  if ((a = Sn(e, f)) >= 0) {
    if (u = !0, o = e.bMarks[f] + e.tShift[f], p = Number(e.src.slice(o, a - 1)), d && p !== 1) return !1;
  } else if ((a = En(e, f)) >= 0) u = !1;
  else return !1;
  if (d && e.skipSpaces(a) >= e.eMarks[f])
    return !1;
  if (n) return !0;
  const h = e.src.charCodeAt(a - 1), m = e.tokens.length;
  u ? (l = e.push("ordered_list_open", "ol", 1), p !== 1 && (l.attrs = [["start", p]])) : l = e.push("bullet_list_open", "ul", 1);
  const g = [f, 0];
  l.map = g, l.markup = String.fromCharCode(h);
  let k = !1;
  const y = e.md.block.ruler.getRules("list"), _ = e.parentType;
  for (e.parentType = "list"; f < r; ) {
    s = a, i = e.eMarks[f];
    const C = e.sCount[f] + a - (e.bMarks[f] + e.tShift[f]);
    let w = C;
    for (; s < i; ) {
      const M = e.src.charCodeAt(s);
      if (M === 9) w += 4 - (w + e.bsCount[f]) % 4;
      else if (M === 32) w++;
      else break;
      s++;
    }
    const b = s;
    let v;
    b >= i ? v = 1 : v = w - C, v > 4 && (v = 1);
    const x = C + v;
    l = e.push("list_item_open", "li", 1), l.markup = String.fromCharCode(h);
    const R = [f, 0];
    l.map = R, u && (l.info = e.src.slice(o, a - 1));
    const I = e.tight, F = e.tShift[f], S = e.sCount[f], Y = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = x, e.tight = !0, e.tShift[f] = b - e.bMarks[f], e.sCount[f] = w, b >= i && e.isEmpty(f + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, f, r), (!e.tight || k) && (c = !1), k = e.line - f > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = Y, e.tShift[f] = F, e.sCount[f] = S, e.tight = I, l = e.push("list_item_close", "li", -1), l.markup = String.fromCharCode(h), f = e.line, R[1] = f, f >= r || e.sCount[f] < e.blkIndent || e.sCount[f] - e.blkIndent >= 4) break;
    let P = !1;
    for (let M = 0, B = y.length; M < B; M++) if (y[M](e, f, r, !0)) {
      P = !0;
      break;
    }
    if (P) break;
    if (u) {
      if (a = Sn(e, f), a < 0) break;
      o = e.bMarks[f] + e.tShift[f];
    } else if (a = En(e, f), a < 0) break;
    if (h !== e.src.charCodeAt(a - 1)) break;
  }
  return u ? l = e.push("ordered_list_close", "ol", -1) : l = e.push("bullet_list_close", "ul", -1), l.markup = String.fromCharCode(h), g[1] = f, e.line = f, e.parentType = _, c && Fl(e, m), !0;
}
var Ht = 999;
function Ol(e) {
  let t = e.length;
  for (let r = 0; r < e.length - 1; r++) {
    const n = e.charCodeAt(r);
    if (n < 55296 || n > 56319) continue;
    const i = e.charCodeAt(r + 1);
    i >= 56320 && i <= 57343 && (t--, r++);
  }
  return t;
}
function tt(e, t) {
  return Math.min(e.eMarks[t] + 1, e.src.length);
}
function gt(e, t) {
  const r = e.lineMax;
  if (t >= r || e.isEmpty(t)) return -1;
  let n = !1;
  if (e.sCount[t] - e.blkIndent > 3 && (n = !0), e.sCount[t] < 0 && (n = !0), !n) {
    const i = e.md.block.ruler.getRules("reference"), s = e.parentType;
    e.parentType = "reference";
    let o = !1;
    for (let l = 0, f = i.length; l < f; l++) if (i[l](e, t, r, !0)) {
      o = !0;
      break;
    }
    if (e.parentType = s, o) return -1;
  }
  return e.bMarks[t] + e.tShift[t];
}
function Bl(e, t, r, n) {
  const i = e.src;
  let s = e.bMarks[t] + e.tShift[t], o = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || i.charCodeAt(s) !== 91) return !1;
  let l = tt(e, t), f = "", c = -1, d = ++s;
  for (; s < l; ) {
    if (f.length + s - d > Ht * 2) return !1;
    let b = i.charCodeAt(s);
    if (b === 91) return !1;
    if (b === 93) {
      c = s;
      break;
    }
    if (b === 92 && (b = i.charCodeAt(++s)), b === 10 && s < l) {
      const v = gt(e, o);
      if (v < 0) return !1;
      f += i.slice(d, l), s = d = v, l = tt(e, o++);
      continue;
    }
    s++;
  }
  if (c < 0 || i.charCodeAt(c + 1) !== 58 || (f += i.slice(d, c), f.length > Ht && Ol(f) > Ht)) return !1;
  for (s = c + 2; s < l; ) {
    const b = i.charCodeAt(s);
    if (b === 10) {
      const v = gt(e, o);
      if (v < 0) break;
      s = v, l = tt(e, o++);
    } else if (ne(b)) s++;
    else break;
  }
  const u = e.md.helpers.parseLinkDestination(i, s, l);
  if (!u.ok) return !1;
  const p = e.md.normalizeLink(u.str);
  if (!e.md.validateLink(p)) return !1;
  s = u.pos;
  const a = s, h = l, m = o;
  for (; s < l; ) {
    const b = i.charCodeAt(s);
    if (b === 10) {
      const v = gt(e, o);
      if (v < 0) break;
      s = v, l = tt(e, o++);
    } else if (ne(b)) s++;
    else break;
  }
  const g = s;
  let k = e.md.helpers.parseLinkTitle(i, s, l);
  for (; k.can_continue; ) {
    const b = gt(e, o);
    if (b < 0) break;
    s = b, l = tt(e, o++), k = e.md.helpers.parseLinkTitle(i, s, l, k);
  }
  let y;
  for (g !== a && k.ok ? (y = k.str, s = k.pos) : (y = "", s = a, l = h, o = m); s < l && ne(i.charCodeAt(s)); )
    s++;
  if (s < l && i.charCodeAt(s) !== 10 && y)
    for (y = "", s = a, l = h, o = m; s < l && ne(i.charCodeAt(s)); )
      s++;
  if (s < l && i.charCodeAt(s) !== 10) return !1;
  const _ = Dt(f);
  if (!_) return !1;
  if (n) return !0;
  typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[_] > "u" && (e.env.references[_] = {
    title: y,
    href: p
  });
  const C = e.push("reference_definition", "", 0);
  C.map = [t, o], C.hidden = !0;
  const w = /* @__PURE__ */ Object.create(null);
  return w.label = _, C.meta = w, e.line = o, !0;
}
var Ml = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Pl = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`, Ll = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", ls = new RegExp(`^(?:${Pl}|${Ll})`), qe = [
  [
    /^<(script|pre|style|textarea)(?=(\s|>|$))/i,
    /<\/(script|pre|style|textarea)>/i,
    !0
  ],
  [
    /^<!--/,
    /-->/,
    !0
  ],
  [
    /^<\?/,
    /\?>/,
    !0
  ],
  [
    /^<![A-Za-z]/,
    />/,
    !0
  ],
  [
    /^<!\[CDATA\[/,
    /\]\]>/,
    !0
  ],
  [
    new RegExp(`^</?(${Ml.join("|")})(?=(\\s|/?>|$))`, "i"),
    /^$/,
    !0
  ],
  [
    new RegExp(`${ls.source}\\s*$`),
    /^$/,
    !1
  ]
];
function ql(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(i) !== 60) return !1;
  let o = e.src.slice(i, s), l = 0;
  for (; l < qe.length && !qe[l][0].test(o); l++) ;
  if (l === qe.length) return !1;
  if (n) return qe[l][2];
  let f = t + 1;
  const c = qe[l][1].test("");
  if (!qe[l][1].test(o)) {
    for (; f < r && !(e.sCount[f] < e.blkIndent && (c || !e.isEmpty(f))); f++)
      if (i = e.bMarks[f] + e.tShift[f], s = e.eMarks[f], o = e.src.slice(i, s), qe[l][1].test(o)) {
        o.length !== 0 && f++;
        break;
      }
  }
  e.line = f;
  const d = e.push("html_block", "", 0);
  return d.map = [t, f], d.content = e.getLines(t, f, e.blkIndent, !0), !0;
}
function zl(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  let o = e.src.charCodeAt(i);
  if (o !== 35 || i >= s) return !1;
  let l = 1;
  for (o = e.src.charCodeAt(++i); o === 35 && i < s && l <= 6; )
    l++, o = e.src.charCodeAt(++i);
  if (l > 6 || i < s && !ne(o)) return !1;
  if (n) return !0;
  s = e.skipSpacesBack(s, i);
  const f = e.skipCharsBack(s, 35, i);
  f > i && ne(e.src.charCodeAt(f - 1)) && (s = f), e.line = t + 1;
  const c = e.push("heading_open", `h${l}`, 1);
  c.markup = "########".slice(0, l), c.map = [t, e.line];
  const d = e.push("inline", "", 0);
  d.content = It(e.src.slice(i, s)), d.map = [t, e.line], d.children = [];
  const u = e.push("heading_close", `h${l}`, -1);
  return u.markup = "########".slice(0, l), !0;
}
function jl(e, t, r) {
  const n = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  const i = e.parentType;
  e.parentType = "paragraph";
  let s = 0, o, l = t + 1;
  for (; l < r && !e.isEmpty(l); l++) {
    if (e.sCount[l] - e.blkIndent > 3) continue;
    if (e.sCount[l] >= e.blkIndent) {
      let a = e.bMarks[l] + e.tShift[l];
      const h = e.eMarks[l];
      if (a < h && (o = e.src.charCodeAt(a), (o === 45 || o === 61) && (a = e.skipChars(a, o), a = e.skipSpaces(a), a >= h))) {
        s = o === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[l] < 0) continue;
    let p = !1;
    for (let a = 0, h = n.length; a < h; a++) if (n[a](e, l, r, !0)) {
      p = !0;
      break;
    }
    if (p) break;
  }
  if (!s)
    return e.parentType = i, !1;
  const f = It(e.getLines(t, l, e.blkIndent, !1));
  e.line = l + 1;
  const c = e.push("heading_open", `h${s}`, 1);
  c.markup = String.fromCharCode(o), c.map = [t, e.line];
  const d = e.push("inline", "", 0);
  d.content = f, d.map = [t, e.line - 1], d.children = [];
  const u = e.push("heading_close", `h${s}`, -1);
  return u.markup = String.fromCharCode(o), e.parentType = i, !0;
}
function $l(e, t, r) {
  const n = e.md.block.ruler.getRules("paragraph"), i = e.parentType;
  let s = t + 1;
  for (e.parentType = "paragraph"; s < r && !e.isEmpty(s); s++) {
    if (e.sCount[s] - e.blkIndent > 3 || e.sCount[s] < 0) continue;
    let c = !1;
    for (let d = 0, u = n.length; d < u; d++) if (n[d](e, s, r, !0)) {
      c = !0;
      break;
    }
    if (c) break;
  }
  const o = It(e.getLines(t, s, e.blkIndent, !1));
  e.line = s;
  const l = e.push("paragraph_open", "p", 1);
  l.map = [t, e.line];
  const f = e.push("inline", "", 0);
  return f.content = o, f.map = [t, e.line], f.children = [], e.push("paragraph_close", "p", -1), e.parentType = i, !0;
}
var bt = [
  [
    "table",
    El,
    ["paragraph", "reference"]
  ],
  ["code", Sl],
  [
    "fence",
    Dl,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "blockquote",
    Il,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "hr",
    Tl,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "list",
    Nl,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["reference", Bl],
  [
    "html_block",
    ql,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  [
    "heading",
    zl,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["lheading", jl],
  ["paragraph", $l]
], cs = class {
  constructor() {
    z(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of block rules.
      */
      "ruler",
      new lt()
    ), z(this, "State", as);
    for (let e = 0; e < bt.length; e++) this.ruler.push(bt[e][0], bt[e][1], { alt: (bt[e][2] || []).slice() });
  }
  tokenize(e, t, r) {
    const n = this.ruler.getRules(""), i = n.length, s = e.md.options.maxNesting;
    let o = t, l = !1;
    for (; o < r && (e.line = o = e.skipEmptyLines(o), !(o >= r || e.sCount[o] < e.blkIndent)); ) {
      if (e.level >= s) {
        e.line = r;
        break;
      }
      const f = e.line;
      let c = !1;
      for (let d = 0; d < i; d++)
        if (c = n[d](e, o, r, !1), c) {
          if (f >= e.line) throw new Error("block rule didn't increment state.line");
          break;
        }
      if (!c) throw new Error("none of the block rules matched");
      e.tight = !l, e.isEmpty(e.line - 1) && (l = !0), o = e.line, o < r && e.isEmpty(o) && (l = !0, o++, e.line = o);
    }
  }
  /**
  * Process input string and push block tokens into `outTokens`
  */
  parse(e, t, r, n) {
    if (!e) return;
    const i = new this.State(e, t, r, n);
    this.tokenize(i, i.line, i.lineMax);
  }
}, us = class {
  constructor(e, t, r, n) {
    z(this, "pos", 0), z(this, "level", 0), z(this, "pending", ""), z(this, "pendingLevel", 0), z(this, "cache", {}), z(this, "backticks", {}), z(this, "backticksScanned", !1), z(this, "skipHtmlSpecial", !1), z(this, "linkLevel", 0), z(this, "delimiters", []), z(this, "_prev_delimiters", []), z(this, "Token", je), this.src = e, this.env = r, this.md = t, this.tokens = n, this.tokens_meta = Array(n.length), this.posMax = this.src.length;
  }
  pushPending() {
    const e = new je("text", "", 0);
    return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
  }
  push(e, t, r) {
    this.pending && this.pushPending();
    const n = new je(e, t, r);
    let i;
    return r < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n.level = this.level, r > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], i = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n), this.tokens_meta.push(i), n;
  }
  scanDelims(e, t) {
    const r = this.posMax, n = this.src.charCodeAt(e);
    let i;
    if (e === 0) i = 32;
    else if (e === 1)
      i = this.src.charCodeAt(0), (i & 63488) === 55296 && (i = 65533);
    else if (i = this.src.charCodeAt(e - 1), (i & 64512) === 56320) {
      const h = this.src.charCodeAt(e - 2);
      i = (h & 64512) === 55296 ? 65536 + (h - 55296 << 10) + (i - 56320) : 65533;
    } else (i & 64512) === 55296 && (i = 65533);
    let s = e;
    for (; s < r && this.src.charCodeAt(s) === n; ) s++;
    const o = s - e;
    let l = s < r ? this.src.charCodeAt(s) : 32;
    if ((l & 64512) === 55296) {
      const h = this.src.charCodeAt(s + 1);
      l = (h & 64512) === 56320 ? 65536 + (l - 55296 << 10) + (h - 56320) : 65533;
    } else (l & 64512) === 56320 && (l = 65533);
    const f = ot(i) || st(i), c = ot(l) || st(l), d = it(i), u = it(l), p = !u && (!c || d || f), a = !d && (!f || u || c);
    return {
      can_open: p && (t || !a || f),
      can_close: a && (t || !p || c),
      length: o
    };
  }
};
function Ul(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Jl(e, t) {
  let r = e.pos;
  for (; r < e.posMax && !Ul(e.src.charCodeAt(r)); ) r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}
function Wl(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function Vl(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 45 || e === 46;
}
function Hl(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const r = e.pos, n = e.posMax;
  if (r + 3 > n || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47) return !1;
  const i = r - Math.min(10, e.pending.length, r);
  let s = r;
  for (; s > i && Vl(e.src.charCodeAt(s - 1)); ) s--;
  if (s === r || !Wl(e.src.charCodeAt(s))) return !1;
  const o = r - s, l = e.md.linkify.matchAtStart(e.src.slice(s));
  if (!l) return !1;
  let f = l.url;
  if (f.length <= o) return !1;
  let c = f.length;
  for (; c > 0 && f.charCodeAt(c - 1) === 42; ) c--;
  c !== f.length && (f = f.slice(0, c));
  const d = e.md.normalizeLink(f);
  if (!e.md.validateLink(d)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -o);
    const u = e.push("link_open", "a", 1);
    u.attrs = [["href", d]], u.markup = "linkify", u.info = "auto";
    const p = e.push("text", "", 0);
    p.content = e.md.normalizeLinkText(f);
    const a = e.push("link_close", "a", -1);
    a.markup = "linkify", a.info = "auto";
  }
  return e.pos += f.length - o, !0;
}
function Yl(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 10) return !1;
  const n = e.pending.length - 1, i = e.posMax;
  if (!t)
    if (n >= 0 && e.pending.charCodeAt(n) === 32)
      if (n >= 1 && e.pending.charCodeAt(n - 1) === 32) {
        let s = n - 1;
        for (; s >= 1 && e.pending.charCodeAt(s - 1) === 32; ) s--;
        e.pending = e.pending.slice(0, s), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else e.push("softbreak", "br", 0);
  for (r++; r < i && ne(e.src.charCodeAt(r)); ) r++;
  return e.pos = r, !0;
}
var Lr = [];
for (let e = 0; e < 256; e++) Lr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  Lr[e.charCodeAt(0)] = 1;
});
function Gl(e, t) {
  let r = e.pos;
  const n = e.posMax;
  if (e.src.charCodeAt(r) !== 92 || (r++, r >= n)) return !1;
  let i = e.src.charCodeAt(r);
  if (i === 10) {
    for (t || e.push("hardbreak", "br", 0), r++; r < n && (i = e.src.charCodeAt(r), !!ne(i)); )
      r++;
    return e.pos = r, !0;
  }
  if (i === 32) {
    if (!t) {
      const l = e.push("text_special", "", 0);
      l.content = "\\", l.markup = "\\", l.info = "escape";
    }
    return e.pos = r, !0;
  }
  let s = e.src[r];
  if (i >= 55296 && i <= 56319 && r + 1 < n) {
    const l = e.src.charCodeAt(r + 1);
    l >= 56320 && l <= 57343 && (s += e.src[r + 1], r++);
  }
  const o = "\\" + s;
  if (!t) {
    const l = e.push("text_special", "", 0);
    i < 256 && Lr[i] !== 0 ? l.content = s : l.content = o, l.markup = o, l.info = "escape";
  }
  return e.pos = r + 1, !0;
}
function Zl(e) {
  const t = {};
  let r = 0;
  for (; (r = e.indexOf("`", r)) !== -1; ) {
    const n = r;
    for (; e.charCodeAt(++r) === 96; ) ;
    t[r - n] = n;
  }
  return t;
}
function Xl(e, t) {
  var r;
  const n = e.pos;
  if (e.src.charCodeAt(n) !== 96) return !1;
  const i = e.posMax;
  let s = n + 1;
  for (; s < i && e.src.charCodeAt(s) === 96; ) s++;
  const o = e.src.slice(n, s), l = o.length;
  if (e.backticksScanned || (e.backticks = Zl(e.src), e.backticksScanned = !0), ((r = e.backticks[l]) !== null && r !== void 0 ? r : -1) >= s) {
    let f = s, c;
    for (; (c = e.src.indexOf("`", f)) !== -1 && c < i; ) {
      for (f = c + 1; e.src.charCodeAt(f) === 96; ) f++;
      if (f > i) break;
      if (f - c === l) {
        if (!t) {
          const d = e.push("code_inline", "code", 0);
          d.markup = o;
          let u = e.src.slice(s, c).replace(/\n/g, " ");
          u.startsWith(" ") && u.endsWith(" ") && /[^ ]/.test(u) && (u = u.slice(1, -1)), d.content = u;
        }
        return e.pos = f, !0;
      }
    }
  }
  return t || (e.pending += o), e.pos = s, !0;
}
function Kl(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 126) return !1;
  const i = e.scanDelims(e.pos, !0);
  let s = i.length;
  const o = String.fromCharCode(n);
  if (s < 2) return !1;
  let l;
  s % 2 && (l = e.push("text", "", 0), l.content = o, s--);
  for (let f = 0; f < s; f += 2)
    l = e.push("text", "", 0), l.content = o + o, e.delimiters.push({
      marker: n,
      length: 0,
      token: e.tokens.length - 1,
      end: -1,
      open: i.can_open,
      close: i.can_close
    });
  return e.pos += i.length, !0;
}
function Dn(e, t) {
  let r;
  const n = [], i = t.length;
  for (let s = 0; s < i; s++) {
    const o = t[s];
    if (o.marker !== 126 || o.end === -1) continue;
    const l = t[o.end];
    r = e.tokens[o.token], r.type = "s_open", r.tag = "s", r.nesting = 1, r.markup = "~~", r.content = "", r = e.tokens[l.token], r.type = "s_close", r.tag = "s", r.nesting = -1, r.markup = "~~", r.content = "", e.tokens[l.token - 1].type === "text" && e.tokens[l.token - 1].content === "~" && n.push(l.token - 1);
  }
  for (; n.length; ) {
    const s = n.pop();
    let o = s + 1;
    for (; o < e.tokens.length && e.tokens[o].type === "s_close"; ) o++;
    o--, s !== o && (r = e.tokens[o], e.tokens[o] = e.tokens[s], e.tokens[s] = r);
  }
}
function Ql(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Dn(e, e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && Dn(e, s);
  }
}
var hs = {
  tokenize: Kl,
  postProcess: Ql
};
function ec(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 95 && n !== 42) return !1;
  const i = e.scanDelims(e.pos, n === 42);
  for (let s = 0; s < i.length; s++) {
    const o = e.push("text", "", 0);
    o.content = String.fromCharCode(n), e.delimiters.push({
      marker: n,
      length: i.length,
      token: e.tokens.length - 1,
      end: -1,
      open: i.can_open,
      close: i.can_close
    });
  }
  return e.pos += i.length, !0;
}
function In(e, t) {
  const r = t.length;
  for (let n = r - 1; n >= 0; n--) {
    const i = t[n];
    if (i.marker !== 95 && i.marker !== 42 || i.end === -1) continue;
    const s = t[i.end], o = n > 0 && t[n - 1].end === i.end + 1 && t[n - 1].marker === i.marker && t[n - 1].token === i.token - 1 && t[i.end + 1].token === s.token + 1, l = String.fromCharCode(i.marker), f = e.tokens[i.token];
    f.type = o ? "strong_open" : "em_open", f.tag = o ? "strong" : "em", f.nesting = 1, f.markup = o ? l + l : l, f.content = "";
    const c = e.tokens[s.token];
    c.type = o ? "strong_close" : "em_close", c.tag = o ? "strong" : "em", c.nesting = -1, c.markup = o ? l + l : l, c.content = "", o && (e.tokens[t[n - 1].token].content = "", e.tokens[t[i.end + 1].token].content = "", n--);
  }
}
function tc(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  In(e, e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && In(e, s);
  }
}
var fs = {
  tokenize: ec,
  postProcess: tc
};
function rc(e, t) {
  let r, n, i, s, o = "", l = "", f = e.pos, c = !0;
  if (e.src.charCodeAt(e.pos) !== 91) return !1;
  const d = e.pos, u = e.posMax, p = e.pos + 1, a = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (a < 0) return !1;
  let h = a + 1;
  if (h < u && e.src.charCodeAt(h) === 40) {
    for (c = !1, h++; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
      ;
    if (h >= u) return !1;
    if (f = h, i = e.md.helpers.parseLinkDestination(e.src, h, e.posMax), i.ok) {
      for (o = e.md.normalizeLink(i.str), e.md.validateLink(o) ? h = i.pos : o = "", f = h; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
        ;
      if (i = e.md.helpers.parseLinkTitle(e.src, h, e.posMax), h < u && f !== h && i.ok)
        for (l = i.str, h = i.pos; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
          ;
    }
    (h >= u || e.src.charCodeAt(h) !== 41) && (c = !0), h++;
  }
  if (c) {
    if (typeof e.env.references > "u") return !1;
    if (h < u && e.src.charCodeAt(h) === 91 ? (f = h + 1, h = e.md.helpers.parseLinkLabel(e, h), h >= 0 ? n = e.src.slice(f, h++) : h = a + 1) : h = a + 1, n || (n = e.src.slice(p, a)), n = Dt(n), s = e.env.references[n], !s)
      return e.pos = d, !1;
    o = s.href, l = s.title;
  }
  if (!t) {
    e.pos = p, e.posMax = a;
    const m = e.push("link_open", "a", 1), g = [["href", o]];
    if (m.attrs = g, l && g.push(["title", l]), n) {
      const k = /* @__PURE__ */ Object.create(null);
      k.label = n, m.meta = k;
    }
    e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = h, e.posMax = u, !0;
}
function nc(e, t) {
  let r, n, i, s, o, l, f, c, d = "";
  const u = e.pos, p = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91) return !1;
  const a = e.pos + 2, h = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (h < 0) return !1;
  if (s = h + 1, s < p && e.src.charCodeAt(s) === 40) {
    for (s++; s < p && (r = e.src.charCodeAt(s), !(!ne(r) && r !== 10)); s++)
      ;
    if (s >= p) return !1;
    for (c = s, l = e.md.helpers.parseLinkDestination(e.src, s, e.posMax), l.ok && (d = e.md.normalizeLink(l.str), e.md.validateLink(d) ? s = l.pos : d = ""), c = s; s < p && (r = e.src.charCodeAt(s), !(!ne(r) && r !== 10)); s++)
      ;
    if (l = e.md.helpers.parseLinkTitle(e.src, s, e.posMax), s < p && c !== s && l.ok)
      for (f = l.str, s = l.pos; s < p && (r = e.src.charCodeAt(s), !(!ne(r) && r !== 10)); s++)
        ;
    else f = "";
    if (s >= p || e.src.charCodeAt(s) !== 41)
      return e.pos = u, !1;
    s++;
  } else {
    if (typeof e.env.references > "u") return !1;
    if (s < p && e.src.charCodeAt(s) === 91 ? (c = s + 1, s = e.md.helpers.parseLinkLabel(e, s), s >= 0 ? i = e.src.slice(c, s++) : s = h + 1) : s = h + 1, i || (i = e.src.slice(a, h)), i = Dt(i), o = e.env.references[i], !o)
      return e.pos = u, !1;
    d = o.href, f = o.title;
  }
  if (!t) {
    n = e.src.slice(a, h);
    const m = [];
    e.md.inline.parse(n, e.md, e.env, m);
    const g = e.push("image", "img", 0), k = [["src", d], ["alt", ""]];
    if (g.attrs = k, g.children = m, g.content = n, f && k.push(["title", f]), i) {
      const y = /* @__PURE__ */ Object.create(null);
      y.label = i, g.meta = y;
    }
  }
  return e.pos = s, e.posMax = p, !0;
}
var ic = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, sc = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function oc(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 60) return !1;
  const n = e.pos, i = e.posMax;
  for (; ; ) {
    if (++r >= i) return !1;
    const o = e.src.charCodeAt(r);
    if (o === 60) return !1;
    if (o === 62) break;
  }
  const s = e.src.slice(n + 1, r);
  if (sc.test(s)) {
    const o = e.md.normalizeLink(s);
    if (!e.md.validateLink(o)) return !1;
    if (!t) {
      const l = e.push("link_open", "a", 1);
      l.attrs = [["href", o]], l.markup = "autolink", l.info = "auto";
      const f = e.push("text", "", 0);
      f.content = e.md.normalizeLinkText(s);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += s.length + 2, !0;
  }
  if (ic.test(s)) {
    const o = e.md.normalizeLink(`mailto:${s}`);
    if (!e.md.validateLink(o)) return !1;
    if (!t) {
      const l = e.push("link_open", "a", 1);
      l.attrs = [["href", o]], l.markup = "autolink", l.info = "auto";
      const f = e.push("text", "", 0);
      f.content = e.md.normalizeLinkText(s);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += s.length + 2, !0;
  }
  return !1;
}
function ac(e) {
  return /^<a[>\s]/i.test(e);
}
function lc(e) {
  return /^<\/a\s*>/i.test(e);
}
function ps(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function cc(e, t) {
  const r = e.src;
  let n, i;
  if (r.startsWith("<!--", t)) {
    if (r.startsWith(">", t + 4)) return t + 5;
    if (r.startsWith("->", t + 4)) return t + 6;
    n = t + 4, i = "-->";
  } else if (r.startsWith("<![CDATA[", t))
    n = t + 9, i = "]]>";
  else if (r.charCodeAt(t + 1) === 63)
    n = t + 2, i = "?>";
  else if (ps(r.charCodeAt(t + 2)))
    n = t + 3, i = ">";
  else return -1;
  if (e.skipHtmlSpecial) return -1;
  const s = r.indexOf(i, n);
  return s < 0 ? (e.skipHtmlSpecial = !0, -1) : s + i.length;
}
function uc(e, t) {
  if (!e.md.options.html) return !1;
  const r = e.posMax, n = e.pos;
  if (e.src.charCodeAt(n) !== 60 || n + 2 >= r) return !1;
  let i;
  const s = e.src.charCodeAt(n + 1);
  if (s === 33 || s === 63) i = cc(e, n);
  else if (s === 47 || ps(s)) {
    const o = e.src.slice(n).match(ls);
    i = o ? n + o[0].length : -1;
  } else return !1;
  if (i < 0) return !1;
  if (!t) {
    const o = e.push("html_inline", "", 0);
    o.content = e.src.slice(n, i), ac(o.content) && e.linkLevel++, lc(o.content) && e.linkLevel--;
  }
  return e.pos = i, !0;
}
var hc = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, fc = /^&([a-z][a-z0-9]{1,31});/i;
function pc(e, t) {
  const r = e.pos, n = e.posMax;
  if (e.src.charCodeAt(r) !== 38 || r + 1 >= n) return !1;
  if (e.src.charCodeAt(r + 1) === 35) {
    const i = e.src.slice(r).match(hc);
    if (i) {
      if (!t) {
        const s = i[1][0].toLowerCase() === "x" ? parseInt(i[1].slice(1), 16) : parseInt(i[1], 10), o = e.push("text_special", "", 0);
        o.content = Pr(s) ? nt(s) : nt(65533), o.markup = i[0], o.info = "entity";
      }
      return e.pos += i[0].length, !0;
    }
  } else {
    const i = e.src.slice(r).match(fc);
    if (i) {
      const s = ji(i[0]);
      if (s !== i[0]) {
        if (!t) {
          const o = e.push("text_special", "", 0);
          o.content = s, o.markup = i[0], o.info = "entity";
        }
        return e.pos += i[0].length, !0;
      }
    }
  }
  return !1;
}
function Tn(e) {
  const t = {}, r = e.length;
  if (!r) return;
  let n = 0, i = -2;
  const s = [];
  for (let o = 0; o < r; o++) {
    const l = e[o];
    if (s.push(0), (e[n].marker !== l.marker || i !== l.token - 1) && (n = o), i = l.token, l.length = l.length || 0, !l.close) continue;
    t.hasOwnProperty(l.marker) || (t[l.marker] = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ]);
    const f = t[l.marker][(l.open ? 3 : 0) + l.length % 3];
    let c = n - s[n] - 1, d = c;
    for (; c > f; c -= s[c] + 1) {
      const u = e[c];
      if (u.marker === l.marker && u.open && u.end < 0) {
        let p = !1;
        if ((u.close || l.open) && (u.length + l.length) % 3 === 0 && (u.length % 3 !== 0 || l.length % 3 !== 0) && (p = !0), !p) {
          const a = c > 0 && !e[c - 1].open ? s[c - 1] + 1 : 0;
          s[o] = o - c + a, s[c] = a, l.open = !1, u.end = o, u.close = !1, d = -1, i = -2;
          break;
        }
      }
    }
    d !== -1 && (t[l.marker][(l.open ? 3 : 0) + (l.length || 0) % 3] = d);
  }
}
function dc(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Tn(e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && Tn(s);
  }
}
function mc(e) {
  let t, r, n = 0;
  const i = e.tokens, s = e.tokens.length;
  for (t = r = 0; t < s; t++)
    i[t].nesting < 0 && n--, i[t].level = n, i[t].nesting > 0 && n++, i[t].type === "text" && t + 1 < s && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== r && (i[r] = i[t]), r++);
  t !== r && (i.length = r);
}
var Yt = [
  ["text", Jl],
  ["linkify", Hl],
  ["newline", Yl],
  ["escape", Gl],
  ["backticks", Xl],
  ["strikethrough", hs.tokenize],
  ["emphasis", fs.tokenize],
  ["link", rc],
  ["image", nc],
  ["autolink", oc],
  ["html_inline", uc],
  ["entity", pc]
], Gt = [
  ["balance_pairs", dc],
  ["strikethrough", hs.postProcess],
  ["emphasis", fs.postProcess],
  ["fragments_join", mc]
], ds = class {
  constructor() {
    z(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of inline rules.
      */
      "ruler",
      new lt()
    ), z(
      this,
      /**
      * {@link Ruler} instance. Second ruler used for post-processing
      * (e.g. in emphasis-like rules).
      */
      "ruler2",
      new lt()
    ), z(this, "State", us);
    for (let e = 0; e < Yt.length; e++) this.ruler.push(Yt[e][0], Yt[e][1]);
    for (let e = 0; e < Gt.length; e++) this.ruler2.push(Gt[e][0], Gt[e][1]);
  }
  skipToken(e) {
    const t = e.pos, r = this.ruler.getRules(""), n = r.length, i = e.md.options.maxNesting, s = e.cache;
    if (typeof s[t] < "u") {
      e.pos = s[t];
      return;
    }
    let o = !1;
    if (e.level < i) {
      for (let l = 0; l < n; l++)
        if (e.level++, o = r[l](e, !0), e.level--, o) {
          if (t >= e.pos) throw new Error("inline rule didn't increment state.pos");
          break;
        }
    } else e.pos = e.posMax;
    o || e.pos++, s[t] = e.pos;
  }
  tokenize(e) {
    const t = this.ruler.getRules(""), r = t.length, n = e.posMax, i = e.md.options.maxNesting;
    for (; e.pos < n; ) {
      const s = e.pos;
      let o = !1;
      if (e.level < i) {
        for (let l = 0; l < r; l++)
          if (o = t[l](e, !1), o) {
            if (s >= e.pos) throw new Error("inline rule didn't increment state.pos");
            break;
          }
      }
      if (o) {
        if (e.pos >= n) break;
        continue;
      }
      e.pending += e.src[e.pos++];
    }
    e.pending && e.pushPending();
  }
  /**
  * Process input string and push inline tokens into `outTokens`
  */
  parse(e, t, r, n) {
    const i = new this.State(e, t, r, n);
    this.tokenize(i);
    const s = this.ruler2.getRules(""), o = s.length;
    for (let l = 0; l < o; l++) s[l](i);
  }
}, gc = {
  default: {
    options: {
      html: !1,
      xhtmlOut: !1,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 100
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  },
  zero: {
    options: {
      html: !1,
      xhtmlOut: !1,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 20
    },
    components: {
      core: { rules: [
        "normalize",
        "block",
        "strip_references",
        "inline",
        "text_join"
      ] },
      block: { rules: ["paragraph"] },
      inline: {
        rules: ["text"],
        rules2: ["balance_pairs", "fragments_join"]
      }
    }
  },
  commonmark: {
    options: {
      html: !0,
      xhtmlOut: !0,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 20
    },
    components: {
      core: { rules: [
        "normalize",
        "block",
        "strip_references",
        "inline",
        "text_join"
      ] },
      block: { rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ] },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  }
}, bc = /^(vbscript|javascript|file|data):/, xc = /^data:image\/(gif|png|jpeg|webp);/, Fn = [
  "http:",
  "https:",
  "mailto:"
], Ie = class {
  /**
  * Link validation function. CommonMark allows too much in links. By default
  * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
  * except some embedded image types.
  *
  * You can change this behaviour:
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * const md = new MarkdownIt()
  *
  * // enable everything
  * md.validateLink = function () { return true; }
  * ```
  */
  validateLink(e) {
    const t = e.trim().toLowerCase();
    return bc.test(t) ? xc.test(t) : !0;
  }
  /**
  * Function used to encode link url to a machine-readable format,
  * which includes url-encoding, punycode, etc.
  */
  normalizeLink(e) {
    const t = Dr(e, !0);
    if (t.hostname && (!t.protocol || Fn.indexOf(t.protocol) >= 0))
      try {
        t.hostname = vn.toASCII(t.hostname);
      } catch {
      }
    return t.auth && (t.auth = Ne(t.auth)), t.hostname && (t.hostname = Ne(t.hostname)), t.pathname && (t.pathname = Ne(t.pathname)), t.search && (t.search = Ne(t.search)), t.hash && (t.hash = Ne(t.hash)), Sr(t);
  }
  /**
  * Function used to decode link url to a human-readable format`
  */
  normalizeLinkText(e) {
    const t = Dr(e, !0);
    if (t.hostname && (!t.protocol || Fn.indexOf(t.protocol) >= 0))
      try {
        t.hostname = vn.toUnicode(t.hostname);
      } catch {
      }
    return Ge(Sr(t), Ge.defaultChars + "%");
  }
  constructor(...e) {
    z(
      this,
      /**
      * Instance of {@link ParserInline}. You may need it to add new rules when
      * writing plugins. For simple rules control use {@link MarkdownIt.disable}
      * and {@link MarkdownIt.enable}.
      */
      "inline",
      new ds()
    ), z(
      this,
      /**
      * Instance of {@link ParserBlock}. You may need it to add new rules when
      * writing plugins. For simple rules control use {@link MarkdownIt.disable}
      * and {@link MarkdownIt.enable}.
      */
      "block",
      new cs()
    ), z(
      this,
      /**
      * Instance of {@link ParserCore} chain executor. You may need it to add new
      * rules when writing plugins. For simple rules control use
      * {@link MarkdownIt.disable} and {@link MarkdownIt.enable}.
      */
      "core",
      new os()
    ), z(
      this,
      /**
      * Instance of {@link Renderer}. Use it to modify output look. Or to add rendering
      * rules for new token types, generated by plugins.
      *
      * See {@link Renderer} docs and
      * [source code](https://github.com/markdown-it/markdown-it/blob/master/src/renderer.ts).
      *
      * @example
      * ```javascript
      * import MarkdownIt from 'markdown-it'
      * const md = new MarkdownIt()
      *
      * function myToken(tokens, idx, options, env, self) {
      *   //...
      *   return result;
      * };
      *
      * md.renderer.rules['my_token'] = myToken
      * ```
      */
      "renderer",
      new ns()
    ), z(
      this,
      /**
      * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
      * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/src/rules_core/linkify.ts)
      * rule.
      */
      "linkify",
      new Aa()
    ), z(
      this,
      /**
      * Assorted utility functions, useful to write plugins. See details
      * [here](https://github.com/markdown-it/markdown-it/blob/master/src/common/utils.ts).
      */
      "utils",
      La
    ), z(
      this,
      /**
      * Link components parser functions, useful to write plugins. See details
      * [here](https://github.com/markdown-it/markdown-it/blob/master/src/helpers).
      */
      "helpers",
      Object.assign({}, el)
    );
    const [t, r] = e;
    typeof t == "string" ? (this.configure(t), r && this.set(r)) : (this.configure("default"), this.set(t || {}));
  }
  /**
  * Set parser options (in the same format as in constructor). Probably, you
  * will never need it, but you can change options after constructor call.
  *
  * __Note:__ To achieve the best possible performance, don't modify a
  * `markdown-it` instance options on the fly. If you need multiple configurations
  * it's best to create multiple instances and initialize each with separate
  * config.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  *
  * const md = new MarkdownIt()
  *   .set({ html: true, breaks: true })
  *   .set({ typographer: true })
  * ```
  */
  set(e) {
    return Object.assign(this.options, e), this;
  }
  /**
  * Batch load of all options and compenent settings. This is internal method,
  * and you probably will not need it. But if you will - see available presets
  * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/src/presets)
  *
  * We strongly recommend to use presets instead of direct config loads. That
  * will give better compatibility with next versions.
  */
  configure(e) {
    let t;
    if (typeof e == "string") {
      const i = e;
      if (t = gc[i], !t) throw new Error(`Wrong 'markdown-it' preset "${i}", check name`);
    } else t = e;
    if (!t) throw new Error("Wrong `markdown-it` preset, can't be empty");
    t.options && (this.options = { ...t.options });
    const r = t.components;
    if (r) {
      var n;
      [
        "core",
        "block",
        "inline"
      ].forEach((s) => {
        var o;
        const l = (o = r[s]) === null || o === void 0 ? void 0 : o.rules;
        l && this[s].ruler.enableOnly(l);
      });
      const i = (n = r.inline) === null || n === void 0 ? void 0 : n.rules2;
      i && this.inline.ruler2.enableOnly(i);
    }
    return this;
  }
  /**
  * Enable list or rules. It will automatically find appropriate components,
  * containing rules with given names. If rule not found, and `ignoreInvalid`
  * not set - throws exception.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  *
  * const md = new MarkdownIt()
  *   .enable(['sub', 'sup'])
  *   .disable('smartquotes')
  * ```
  */
  enable(e, t = !1) {
    let r = [];
    Array.isArray(e) || (e = [e]), [
      "core",
      "block",
      "inline"
    ].forEach((i) => {
      r = r.concat(this[i].ruler.enable(e, !0));
    }), r = r.concat(this.inline.ruler2.enable(e, !0));
    const n = e.filter((i) => r.indexOf(i) < 0);
    if (n.length && !t) throw new Error(`MarkdownIt. Failed to enable unknown rule(s): ${n}`);
    return this;
  }
  /**
  * The same as {@link MarkdownIt.enable}, but turn specified rules off.
  */
  disable(e, t = !1) {
    let r = [];
    Array.isArray(e) || (e = [e]), [
      "core",
      "block",
      "inline"
    ].forEach((i) => {
      r = r.concat(this[i].ruler.disable(e, !0));
    }), r = r.concat(this.inline.ruler2.disable(e, !0));
    const n = e.filter((i) => r.indexOf(i) < 0);
    if (n.length && !t) throw new Error(`MarkdownIt. Failed to disable unknown rule(s): ${n}`);
    return this;
  }
  /**
  * Load specified plugin with given params into current parser instance.
  * It's just a sugar to call `plugin(md, params)` with curring.
  *
  * @example
  * ```javascript
  * import MarkdownIt from 'markdown-it'
  * import iterator from 'markdown-it-for-inline'
  *
  * const md = new MarkdownIt()
  *   .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
  *     tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar')
  *   })
  * ```
  */
  use(e, ...t) {
    return e.apply(e, [this, ...t]), this;
  }
  /**
  * Parse input string and return list of block tokens (special token type
  * "inline" will contain list of inline tokens). You should not call this
  * method directly, until you write custom renderer (for example, to produce
  * AST).
  *
  * `env` is used to pass data between "distributed" rules and return additional
  * metadata like reference info, needed for the renderer. It also can be used to
  * inject data in specific cases. Usually, you will be ok to pass `{}`,
  * and then pass updated object to renderer.
  */
  parse(e, t) {
    if (typeof e != "string") throw new Error("Input data should be a String");
    const r = new this.core.State(e, this, t);
    return this.core.process(r), r.tokens;
  }
  /**
  * Render markdown string into html. It does all magic for you :).
  *
  * `env` can be used to inject additional metadata (`{}` by default).
  * But you will not need it with high probability. See also comment
  * in {@link MarkdownIt.parse}.
  */
  render(e, t = {}) {
    return this.renderer.render(this.parse(e, t), this.options, t);
  }
  /**
  * The same as {@link MarkdownIt.parse} but skip all block rules. It returns
  * the block tokens list with the single `inline` element, containing parsed
  * inline tokens in `children` property. Also updates `env` object.
  */
  parseInline(e, t) {
    const r = new this.core.State(e, this, t);
    return r.inlineMode = !0, this.core.process(r), r.tokens;
  }
  /**
  * Similar to {@link MarkdownIt.render} but for single paragraph content.
  * Result will NOT be wrapped into `<p>` tags.
  */
  renderInline(e, t = {}) {
    return this.renderer.render(this.parseInline(e, t), this.options, t);
  }
};
z(Ie, "Token", je);
z(Ie, "Ruler", lt);
z(Ie, "Renderer", ns);
z(Ie, "ParserCore", os);
z(Ie, "StateCore", is);
z(Ie, "ParserBlock", cs);
z(Ie, "StateBlock", as);
z(Ie, "ParserInline", ds);
z(Ie, "StateInline", us);
var wc = es(Ie);
function vc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ms(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      var i = !1;
      try {
        i = this instanceof n;
      } catch {
      }
      return i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var $;
(function(e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})($ || ($ = {}));
var E;
(function(e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.DeclarationSequence = 20] = "DeclarationSequence", e[e.InSpecialComment = 21] = "InSpecialComment", e[e.InCommentLike = 22] = "InCommentLike", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.InPlainText = 25] = "InPlainText", e[e.InEntity = 26] = "InEntity";
})(E || (E = {}));
function ze(e) {
  return e === $.Space || e === $.NewLine || e === $.Tab || e === $.FormFeed || e === $.CarriageReturn;
}
function We(e) {
  return e === $.Slash || e === $.Gt || ze(e);
}
function yc(e) {
  return e >= $.LowerA && e <= $.LowerZ || e >= $.UpperA && e <= $.UpperZ;
}
var _e;
(function(e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
})(_e || (_e = {}));
const W = {
  Empty: new Uint8Array(0),
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 33, 62]),
  // `--!>`
  Doctype: new Uint8Array([100, 111, 99, 116, 121, 112, 101]),
  // `doctype`
  IframeEnd: new Uint8Array([60, 47, 105, 102, 114, 97, 109, 101]),
  // `</iframe`
  NoembedEnd: new Uint8Array([
    60,
    47,
    110,
    111,
    101,
    109,
    98,
    101,
    100
  ]),
  // `</noembed`
  NoframesEnd: new Uint8Array([
    60,
    47,
    110,
    111,
    102,
    114,
    97,
    109,
    101,
    115
  ]),
  // `</noframes`
  Plaintext: new Uint8Array([
    60,
    47,
    112,
    108,
    97,
    105,
    110,
    116,
    101,
    120,
    116
  ]),
  // `</plaintext`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
}, _c = /* @__PURE__ */ new Map([
  [W.IframeEnd[2], W.IframeEnd],
  [W.NoembedEnd[2], W.NoembedEnd],
  [W.Plaintext[2], W.Plaintext],
  [W.ScriptEnd[2], W.ScriptEnd],
  [W.TitleEnd[2], W.TitleEnd],
  [W.XmpEnd[2], W.XmpEnd]
]);
class gs {
  cbs;
  /** The current state the tokenizer is in. */
  state = E.Text;
  /** The read buffer. */
  buffer = "";
  /** The beginning of the section that is currently being read. */
  sectionStart = 0;
  /** The index within the buffer that we are currently looking at. */
  index = 0;
  /** The start of the last entity. */
  entityStart = 0;
  /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
  baseState = E.Text;
  /** For special parsing behavior inside of script and style tags. */
  isSpecial = !1;
  /** Indicates whether the tokenizer has been paused. */
  running = !0;
  /** The offset of the current buffer. */
  offset = 0;
  xmlMode;
  decodeEntities;
  recognizeSelfClosing;
  entityDecoder;
  constructor({ xmlMode: t = !1, decodeEntities: r = !0, recognizeSelfClosing: n = t }, i) {
    this.cbs = i, this.xmlMode = t, this.decodeEntities = r, this.recognizeSelfClosing = n, this.entityDecoder = new fa(t ? Bi : Oi, (s, o) => this.emitCodePoint(s, o));
  }
  reset() {
    this.state = E.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = E.Text, this.isSpecial = !1, this.currentSequence = W.Empty, this.sequenceIndex = 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(t) {
    t === $.Lt || !this.decodeEntities && this.fastForwardTo($.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = E.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === $.Amp && this.startEntity();
  }
  currentSequence = W.Empty;
  sequenceIndex = 0;
  enterTagBody() {
    this.currentSequence === W.Plaintext ? (this.currentSequence = W.Empty, this.state = E.InPlainText) : this.isSpecial ? (this.state = E.InSpecialTag, this.sequenceIndex = 0) : this.state = E.Text;
  }
  /**
   * Match the opening tag name against an HTML text-only tag sequence.
   *
   * Some tags share an initial prefix (`script`/`style`, `title`/`textarea`,
   * `noembed`/`noframes`), so we may switch to an alternate sequence at the
   * first distinguishing byte.  On a successful full match we fall back to
   * the normal tag-name state; a later `>` will enter raw-text, RCDATA, or
   * plaintext mode based on `currentSequence` / `isSpecial`.
   * @param c Current character code point.
   */
  stateSpecialStartSequence(t) {
    const r = t | 32;
    if (this.sequenceIndex < this.currentSequence.length) {
      if (r === this.currentSequence[this.sequenceIndex]) {
        this.sequenceIndex++;
        return;
      }
      if (this.sequenceIndex === 3) {
        if (this.currentSequence === W.ScriptEnd && r === W.StyleEnd[3]) {
          this.currentSequence = W.StyleEnd, this.sequenceIndex = 4;
          return;
        }
        if (this.currentSequence === W.TitleEnd && r === W.TextareaEnd[3]) {
          this.currentSequence = W.TextareaEnd, this.sequenceIndex = 4;
          return;
        }
      } else if (this.sequenceIndex === 4 && this.currentSequence === W.NoembedEnd && r === W.NoframesEnd[4]) {
        this.currentSequence = W.NoframesEnd, this.sequenceIndex = 5;
        return;
      }
    } else if (We(t)) {
      this.sequenceIndex = 0, this.state = E.InTagName, this.stateInTagName(t);
      return;
    }
    this.isSpecial = !1, this.currentSequence = W.Empty, this.sequenceIndex = 0, this.state = E.InTagName, this.stateInTagName(t);
  }
  stateCDATASequence(t) {
    t === W.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === W.Cdata.length && (this.state = E.InCommentLike, this.currentSequence = W.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.xmlMode ? (this.state = E.InDeclaration, this.stateInDeclaration(t)) : (this.state = E.InSpecialComment, this.stateInSpecialComment(t)));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   * @param c Current character code point.
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === t)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Emit a comment token and return to the text state.
   * @param offset Number of characters in the end sequence that have already been matched.
   */
  emitComment(t) {
    this.cbs.oncomment(this.sectionStart, this.index, t), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = E.Text;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   * @param c Current character code point.
   */
  stateInCommentLike(t) {
    !this.xmlMode && this.currentSequence === W.CommentEnd && this.sequenceIndex <= 1 && /*
     * We're still at the very start of the comment: the only
     * characters consumed since `<!--` are the dashes that
     * advanced sequenceIndex (0 for `<!-->`, 1 for `<!--->`).
     */
    this.index === this.sectionStart + this.sequenceIndex && t === $.Gt ? this.emitComment(this.sequenceIndex) : this.currentSequence === W.CommentEnd && this.sequenceIndex === 2 && t === $.Gt ? this.emitComment(2) : this.currentSequence === W.CommentEnd && this.sequenceIndex === this.currentSequence.length - 1 && t !== $.Gt ? this.sequenceIndex = +(t === $.Dash) : t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === W.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 3), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = E.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   * @param c Current character code point.
   */
  isTagStartChar(t) {
    return this.xmlMode ? !We(t) : yc(t);
  }
  /**
   * Scan raw-text / RCDATA content for the matching end tag.
   *
   * For RCDATA tags (`<title>`, `<textarea>`) entities are decoded inline.
   * For raw-text tags (`<script>`, `<style>`, etc.) we fast-forward to `<`.
   * @param c Current character code point.
   */
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (We(t)) {
        const r = this.index - this.currentSequence.length;
        if (this.sectionStart < r) {
          const n = this.index;
          this.index = r, this.cbs.ontext(this.sectionStart, r), this.index = n;
        }
        this.isSpecial = !1, this.sectionStart = r + 2, this.stateInClosingTagName(t);
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === W.TitleEnd || this.currentSequence === W.TextareaEnd ? this.decodeEntities && t === $.Amp && this.startEntity() : this.fastForwardTo($.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === $.Lt);
  }
  stateBeforeTagName(t) {
    if (t === $.ExclamationMark)
      this.state = E.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === $.Questionmark)
      this.xmlMode ? (this.state = E.InProcessingInstruction, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.state = E.InSpecialComment, this.sectionStart = this.index);
    else if (this.isTagStartChar(t)) {
      this.sectionStart = this.index;
      const r = this.xmlMode || this.cbs.isInForeignContext?.() ? void 0 : _c.get(t | 32);
      r === void 0 ? this.state = E.InTagName : (this.isSpecial = !0, this.currentSequence = r, this.sequenceIndex = 3, this.state = E.SpecialStartSequence);
    } else t === $.Slash ? this.state = E.BeforeClosingTagName : (this.state = E.Text, this.stateText(t));
  }
  stateInTagName(t) {
    We(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    ze(t) ? this.xmlMode || (this.state = E.InSpecialComment, this.sectionStart = this.index) : t === $.Gt ? (this.state = E.Text, this.xmlMode || (this.sectionStart = this.index + 1)) : (this.state = this.isTagStartChar(t) ? E.InClosingTagName : E.InSpecialComment, this.sectionStart = this.index);
  }
  stateInClosingTagName(t) {
    We(t) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = E.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === $.Gt || this.fastForwardTo($.Gt)) && (this.state = E.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === $.Gt ? (this.cbs.onopentagend(this.index), this.enterTagBody(), this.sectionStart = this.index + 1) : t === $.Slash ? this.state = E.InSelfClosingTag : ze(t) || (this.state = E.InAttributeName, this.sectionStart = this.index);
  }
  /**
   * Handle `/` before `>` in an opening tag.
   *
   * In HTML mode, text-only tags ignore the self-closing flag and still enter
   * their raw-text/RCDATA/plaintext state unless self-closing tags are being
   * recognized. In XML mode, or for ordinary tags, the tokenizer returns to
   * regular text parsing after emitting the self-closing callback.
   * @param c Current character code point.
   */
  stateInSelfClosingTag(t) {
    if (t === $.Gt) {
      if (this.cbs.onselfclosingtag(this.index), this.sectionStart = this.index + 1, !this.recognizeSelfClosing) {
        this.enterTagBody();
        return;
      }
      this.state = E.Text, this.isSpecial = !1, this.currentSequence = W.Empty;
    } else ze(t) || (this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === $.Eq || We(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = E.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === $.Eq ? this.state = E.BeforeAttributeValue : t === $.Slash || t === $.Gt ? (this.cbs.onattribend(_e.NoValue, this.sectionStart), this.sectionStart = -1, this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t)) : ze(t) || (this.cbs.onattribend(_e.NoValue, this.sectionStart), this.state = E.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === $.DoubleQuote ? (this.state = E.InAttributeValueDq, this.sectionStart = this.index + 1) : t === $.SingleQuote ? (this.state = E.InAttributeValueSq, this.sectionStart = this.index + 1) : ze(t) || (this.sectionStart = this.index, this.state = E.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
  }
  handleInAttributeValue(t, r) {
    t === r || !this.decodeEntities && this.fastForwardTo(r) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(r === $.DoubleQuote ? _e.Double : _e.Single, this.index + 1), this.state = E.BeforeAttributeName) : this.decodeEntities && t === $.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, $.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, $.SingleQuote);
  }
  stateInAttributeValueNoQuotes(t) {
    ze(t) || t === $.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(_e.Unquoted, this.index), this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === $.Amp && this.startEntity();
  }
  /**
   * Distinguish between CDATA, declarations, HTML comments, and HTML bogus
   * comments after `<!`.
   *
   * In HTML mode, only real comments and doctypes stay on declaration paths;
   * everything else becomes a bogus comment terminated by the next `>`.
   * @param c Current character code point.
   */
  stateBeforeDeclaration(t) {
    t === $.OpeningSquareBracket ? (this.state = E.CDATASequence, this.sequenceIndex = 0) : this.xmlMode ? this.state = t === $.Dash ? E.BeforeComment : E.InDeclaration : (t | 32) === W.Doctype[0] ? (this.state = E.DeclarationSequence, this.currentSequence = W.Doctype, this.sequenceIndex = 1) : t === $.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = E.Text, this.sectionStart = this.index + 1) : t === $.Dash ? this.state = E.BeforeComment : this.state = E.InSpecialComment;
  }
  /**
   * Continue matching `doctype` after `<!d`.
   *
   * A full `doctype` match stays on the declaration path; any other name falls
   * back to an HTML bogus comment, which matches browser behavior for
   * non-doctype `<!...>` constructs.
   * @param c Current character code point.
   */
  stateDeclarationSequence(t) {
    this.sequenceIndex === this.currentSequence.length ? (this.state = E.InDeclaration, this.stateInDeclaration(t)) : (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : t === $.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = E.Text, this.sectionStart = this.index + 1) : this.state = E.InSpecialComment;
  }
  stateInDeclaration(t) {
    (t === $.Gt || this.fastForwardTo($.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = E.Text, this.sectionStart = this.index + 1);
  }
  /**
   * XML processing instructions (`<?...?>`).
   *
   * In HTML mode `<?` is routed to `InSpecialComment` instead, so this
   * state is only reachable in XML mode.
   * @param c Current character code point.
   */
  stateInProcessingInstruction(t) {
    t === $.Questionmark ? this.sequenceIndex = 1 : t === $.Gt && this.sequenceIndex === 1 ? (this.cbs.onprocessinginstruction(this.sectionStart, this.index - 1), this.sequenceIndex = 0, this.state = E.Text, this.sectionStart = this.index + 1) : this.sequenceIndex = Number(this.fastForwardTo($.Questionmark));
  }
  stateBeforeComment(t) {
    t === $.Dash ? (this.state = E.InCommentLike, this.currentSequence = W.CommentEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : this.xmlMode ? this.state = E.InDeclaration : t === $.Gt ? (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = E.Text, this.sectionStart = this.index + 1) : this.state = E.InSpecialComment;
  }
  stateInSpecialComment(t) {
    (t === $.Gt || this.fastForwardTo($.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = E.Text, this.sectionStart = this.index + 1);
  }
  startEntity() {
    this.baseState = this.state, this.state = E.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? Re.Strict : this.baseState === E.Text || this.baseState === E.InSpecialTag ? Re.Legacy : Re.Attribute);
  }
  stateInEntity() {
    const t = this.index - this.offset, r = this.entityDecoder.write(this.buffer, t);
    if (r >= 0)
      this.state = this.baseState, r === 0 && (this.index -= 1);
    else {
      if (t < this.buffer.length && this.buffer.charCodeAt(t) === $.Amp) {
        this.state = this.baseState, this.index -= 1;
        return;
      }
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === E.Text || this.state === E.InPlainText || this.state === E.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === E.InAttributeValueDq || this.state === E.InAttributeValueSq || this.state === E.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case E.Text: {
          this.stateText(t);
          break;
        }
        case E.InPlainText: {
          this.index = this.buffer.length + this.offset - 1;
          break;
        }
        case E.SpecialStartSequence: {
          this.stateSpecialStartSequence(t);
          break;
        }
        case E.InSpecialTag: {
          this.stateInSpecialTag(t);
          break;
        }
        case E.CDATASequence: {
          this.stateCDATASequence(t);
          break;
        }
        case E.DeclarationSequence: {
          this.stateDeclarationSequence(t);
          break;
        }
        case E.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(t);
          break;
        }
        case E.InAttributeName: {
          this.stateInAttributeName(t);
          break;
        }
        case E.InCommentLike: {
          this.stateInCommentLike(t);
          break;
        }
        case E.InSpecialComment: {
          this.stateInSpecialComment(t);
          break;
        }
        case E.BeforeAttributeName: {
          this.stateBeforeAttributeName(t);
          break;
        }
        case E.InTagName: {
          this.stateInTagName(t);
          break;
        }
        case E.InClosingTagName: {
          this.stateInClosingTagName(t);
          break;
        }
        case E.BeforeTagName: {
          this.stateBeforeTagName(t);
          break;
        }
        case E.AfterAttributeName: {
          this.stateAfterAttributeName(t);
          break;
        }
        case E.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(t);
          break;
        }
        case E.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(t);
          break;
        }
        case E.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(t);
          break;
        }
        case E.AfterClosingTagName: {
          this.stateAfterClosingTagName(t);
          break;
        }
        case E.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(t);
          break;
        }
        case E.InSelfClosingTag: {
          this.stateInSelfClosingTag(t);
          break;
        }
        case E.InDeclaration: {
          this.stateInDeclaration(t);
          break;
        }
        case E.BeforeDeclaration: {
          this.stateBeforeDeclaration(t);
          break;
        }
        case E.BeforeComment: {
          this.stateBeforeComment(t);
          break;
        }
        case E.InProcessingInstruction: {
          this.stateInProcessingInstruction(t);
          break;
        }
        case E.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === E.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
  }
  handleTrailingCommentLikeData(t) {
    if (this.state !== E.InCommentLike)
      return !1;
    if (this.currentSequence === W.CdataEnd)
      if (this.xmlMode)
        this.sectionStart < t && this.cbs.oncdata(this.sectionStart, t, 0);
      else {
        const r = this.sectionStart - W.Cdata.length - 1;
        this.cbs.oncomment(r, t, 0);
      }
    else {
      const r = this.xmlMode ? 0 : Math.min(this.sequenceIndex, W.CommentEnd.length - 1);
      this.cbs.oncomment(this.sectionStart, t, r);
    }
    return !0;
  }
  handleTrailingMarkupDeclaration(t) {
    if (this.xmlMode)
      switch (this.state) {
        case E.InSpecialComment:
        case E.BeforeComment:
        case E.CDATASequence:
        case E.DeclarationSequence:
        case E.InDeclaration:
          return this.cbs.ontext(this.sectionStart, t), !0;
        default:
          return !1;
      }
    switch (this.state) {
      case E.BeforeDeclaration:
      case E.InSpecialComment:
      case E.BeforeComment:
      case E.CDATASequence:
        return this.cbs.oncomment(this.sectionStart, t, 0), !0;
      case E.DeclarationSequence:
        return this.sequenceIndex !== W.Doctype.length && this.cbs.oncomment(this.sectionStart, t, 0), !0;
      case E.InDeclaration:
        return !0;
      default:
        return !1;
    }
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    if (!(this.handleTrailingCommentLikeData(t) || this.handleTrailingMarkupDeclaration(t)) && !(this.sectionStart >= t))
      switch (this.state) {
        case E.InTagName:
        case E.BeforeAttributeName:
        case E.BeforeAttributeValue:
        case E.AfterAttributeName:
        case E.InAttributeName:
        case E.InAttributeValueSq:
        case E.InAttributeValueDq:
        case E.InAttributeValueNq:
        case E.InClosingTagName:
          break;
        default:
          this.cbs.ontext(this.sectionStart, t);
      }
  }
  emitCodePoint(t, r) {
    this.baseState !== E.Text && this.baseState !== E.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + r, this.index = this.sectionStart - 1, this.cbs.onattribentity(t)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + r, this.index = this.sectionStart - 1, this.cbs.ontextentity(t, this.sectionStart));
  }
}
const { fromCodePoint: Nn } = String, Ve = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), ce = /* @__PURE__ */ new Set(["p"]), He = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]), On = /* @__PURE__ */ new Set(["thead", "tbody"]), Bn = /* @__PURE__ */ new Set(["dd", "dt"]), Mn = /* @__PURE__ */ new Set(["rt", "rp"]), kc = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["a", /* @__PURE__ */ new Set(["a"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", ce],
  ["h1", He],
  ["h2", He],
  ["h3", He],
  ["h4", He],
  ["h5", He],
  ["h6", He],
  ["select", Ve],
  ["input", Ve],
  ["output", Ve],
  ["button", Ve],
  ["datalist", Ve],
  ["textarea", Ve],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Bn],
  ["dt", Bn],
  ["address", ce],
  ["article", ce],
  ["aside", ce],
  ["blockquote", ce],
  ["details", ce],
  ["div", ce],
  ["dl", ce],
  ["fieldset", ce],
  ["figcaption", ce],
  ["figure", ce],
  ["footer", ce],
  ["form", ce],
  ["header", ce],
  ["hr", ce],
  ["main", ce],
  ["nav", ce],
  ["ol", ce],
  ["pre", ce],
  ["section", ce],
  ["table", ce],
  ["ul", ce],
  ["rt", Mn],
  ["rp", Mn],
  ["tbody", On],
  ["tfoot", On]
]), Pn = "doctype", Cc = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Rc = /* @__PURE__ */ new Set(["math", "svg"]), Ln = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), qn = /* @__PURE__ */ new Map([
  ["altglyph", "altGlyph"],
  ["altglyphdef", "altGlyphDef"],
  ["altglyphitem", "altGlyphItem"],
  ["animatecolor", "animateColor"],
  ["animatemotion", "animateMotion"],
  ["animatetransform", "animateTransform"],
  ["clippath", "clipPath"],
  ["feblend", "feBlend"],
  ["fecolormatrix", "feColorMatrix"],
  ["fecomponenttransfer", "feComponentTransfer"],
  ["fecomposite", "feComposite"],
  ["feconvolvematrix", "feConvolveMatrix"],
  ["fediffuselighting", "feDiffuseLighting"],
  ["fedisplacementmap", "feDisplacementMap"],
  ["fedistantlight", "feDistantLight"],
  ["fedropshadow", "feDropShadow"],
  ["feflood", "feFlood"],
  ["fefunca", "feFuncA"],
  ["fefuncb", "feFuncB"],
  ["fefuncg", "feFuncG"],
  ["fefuncr", "feFuncR"],
  ["fegaussianblur", "feGaussianBlur"],
  ["feimage", "feImage"],
  ["femerge", "feMerge"],
  ["femergenode", "feMergeNode"],
  ["femorphology", "feMorphology"],
  ["feoffset", "feOffset"],
  ["fepointlight", "fePointLight"],
  ["fespecularlighting", "feSpecularLighting"],
  ["fespotlight", "feSpotLight"],
  ["fetile", "feTile"],
  ["feturbulence", "feTurbulence"],
  ["foreignobject", "foreignObject"],
  ["glyphref", "glyphRef"],
  ["lineargradient", "linearGradient"],
  ["radialgradient", "radialGradient"],
  ["textpath", "textPath"]
]);
var Fe;
(function(e) {
  e[e.None = 0] = "None", e[e.Svg = 1] = "Svg", e[e.MathML = 2] = "MathML";
})(Fe || (Fe = {}));
const Ac = /\s|\//;
class qr {
  options;
  /** The start index of the last event. */
  startIndex = 0;
  /** The end index of the last event. */
  endIndex = 0;
  /**
   * Store the start index of the current open tag,
   * so we can update the start index for attributes.
   */
  openTagStart = 0;
  tagname = "";
  attribname = "";
  attribvalue = "";
  attribs = null;
  stack = [];
  foreignContext;
  cbs;
  lowerCaseTagNames;
  lowerCaseAttributeNames;
  recognizeSelfClosing;
  /** We are parsing HTML. Inverse of the `xmlMode` option. */
  htmlMode;
  tokenizer;
  buffers = [];
  bufferOffset = 0;
  /** The index of the last written buffer. Used when resuming after a `pause()`. */
  writeIndex = 0;
  /** Indicates whether the parser has finished running / `.end` has been called. */
  ended = !1;
  constructor(t, r = {}) {
    this.options = r, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = r.lowerCaseTags ?? this.htmlMode, this.lowerCaseAttributeNames = r.lowerCaseAttributeNames ?? this.htmlMode, this.recognizeSelfClosing = r.recognizeSelfClosing ?? !this.htmlMode, this.tokenizer = new (r.Tokenizer ?? gs)(this.options, this), this.foreignContext = [Fe.None], this.cbs.onparserinit?.(this);
  }
  // Tokenizer event handlers
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ontext(t, r) {
    const n = this.getSlice(t, r);
    this.endIndex = r - 1, this.cbs.ontext?.(n), this.startIndex = r;
  }
  /**
   * @param cp Current Unicode code point.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ontextentity(t, r) {
    this.endIndex = r - 1, this.cbs.ontext?.(Nn(t)), this.startIndex = r;
  }
  /** @internal */
  isInForeignContext() {
    return this.foreignContext[0] !== Fe.None;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   * @param name Name of the pseudo selector.
   */
  isVoidElement(t) {
    return this.htmlMode && Cc.has(t);
  }
  /**
   * Read a tag name from the buffer.
   *
   * When `lowerCaseTagNames` is enabled (the default in HTML mode), the name
   * is lowercased and may be adjusted for SVG casing or the `image` → `img`
   * alias.
   * @param start Start index of the tag name in the buffer.
   * @param endIndex End index of the tag name in the buffer.
   */
  readTagName(t, r) {
    const n = this.lowerCaseTagNames ? this.getSlice(t, r).toLowerCase() : this.getSlice(t, r);
    if (!(this.lowerCaseTagNames && this.htmlMode))
      return n;
    if (this.foreignContext[0] === Fe.Svg)
      return qn.get(n) ?? n;
    if (this.foreignContext.length > 1) {
      const i = qn.get(n);
      if (i !== void 0 && this.stack.includes(i))
        return i;
    }
    return this.isInForeignContext() ? n : n === "image" ? "img" : n;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onopentagname(t, r) {
    this.endIndex = r, this.emitOpenTag(this.readTagName(t, r));
  }
  emitOpenTag(t) {
    if (this.openTagStart = this.startIndex, this.tagname = t, this.htmlMode && t === "form" && this.stack.includes("form")) {
      this.tagname = "";
      return;
    }
    const r = this.htmlMode && kc.get(t);
    if (r)
      for (; this.stack.length > 0 && r.has(this.stack[0]); )
        this.popElement(!0);
    this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (t === "svg" ? this.foreignContext.unshift(Fe.Svg) : t === "math" ? this.foreignContext.unshift(Fe.MathML) : Ln.has(t) && this.foreignContext.unshift(Fe.None))), this.cbs.onopentagname?.(t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    this.startIndex = this.openTagStart, this.attribs && (this.cbs.onopentag?.(this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /**
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onclosetag(t, r) {
    this.endIndex = r;
    const n = this.readTagName(t, r);
    if (this.isVoidElement(n))
      this.htmlMode && n === "br" && (this.cbs.onopentagname?.("br"), this.cbs.onopentag?.("br", {}, !0), this.cbs.onclosetag?.("br", !1));
    else {
      const i = this.stack.indexOf(n);
      if (i !== -1) {
        for (let s = 0; s < i; s++)
          this.popElement(!0);
        this.popElement(!1);
      } else this.htmlMode && n === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = r + 1;
  }
  /**
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onselfclosingtag(t) {
    this.endIndex = t, this.recognizeSelfClosing || this.isInForeignContext() ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
  }
  /**
   * Pop the top element off the stack, emit a close event, and maintain
   * the foreign context stack.
   * @param implied Whether this close is implied (not from an explicit end tag).
   */
  popElement(t) {
    const r = this.stack.shift();
    this.htmlMode && (Rc.has(r) || Ln.has(r)) && this.foreignContext.shift(), this.cbs.onclosetag?.(r, t);
  }
  closeCurrentTag(t) {
    const r = this.tagname;
    this.endOpenTag(t), this.stack[0] === r && this.popElement(!t);
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribname(t, r) {
    this.startIndex = t;
    const n = this.getSlice(t, r);
    this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribdata(t, r) {
    this.attribvalue += this.getSlice(t, r);
  }
  /**
   * @param cp Current Unicode code point.
   * @internal
   */
  onattribentity(t) {
    this.attribvalue += Nn(t);
  }
  /**
   * @param quote Quote type used for the current attribute.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onattribend(t, r) {
    this.endIndex = r, this.cbs.onattribute?.(this.attribname, this.attribvalue, t === _e.Double ? '"' : t === _e.Single ? "'" : t === _e.NoValue ? void 0 : null), this.attribs && !Object.hasOwn(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(t) {
    const r = t.search(Ac);
    let n = r < 0 ? t : t.substr(0, r);
    return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  ondeclaration(t, r) {
    this.endIndex = r;
    const n = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const i = this.htmlMode ? this.lowerCaseTagNames ? Pn : n.slice(0, Pn.length) : this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`!${i}`, `!${n}`);
    }
    this.startIndex = r + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @internal
   */
  onprocessinginstruction(t, r) {
    this.endIndex = r;
    const n = this.getSlice(t, r);
    if (this.cbs.onprocessinginstruction) {
      const i = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`?${i}`, `?${n}`);
    }
    this.startIndex = r + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @param offset Offset applied when computing parser indices.
   * @internal
   */
  oncomment(t, r, n) {
    this.endIndex = r, this.cbs.oncomment?.(this.getSlice(t, r - n)), this.cbs.oncommentend?.(), this.startIndex = r + 1;
  }
  /**
   * @param start Start index for the current parser event.
   * @param endIndex End index for the current parser event.
   * @param offset Offset applied when computing parser indices.
   * @internal
   */
  oncdata(t, r, n) {
    this.endIndex = r;
    const i = this.getSlice(t, r - n);
    !this.htmlMode || this.options.recognizeCDATA ? (this.cbs.oncdatastart?.(), this.cbs.ontext?.(i), this.cbs.oncdataend?.()) : this.isInForeignContext() ? this.cbs.ontext?.(i) : (this.cbs.oncomment?.(`[CDATA[${i}]]`), this.cbs.oncommentend?.()), this.startIndex = r + 1;
  }
  /** @internal */
  onend() {
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let t = 0; t < this.stack.length; t++)
        this.cbs.onclosetag(this.stack[t], !0);
    }
    this.cbs.onend?.();
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    this.cbs.onreset?.(), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, this.cbs.onparserinit?.(this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(Fe.None), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   * @param data Document to parse.
   */
  parseComplete(t) {
    this.reset(), this.end(t);
  }
  getSlice(t, r) {
    if (t === r)
      return "";
    for (; t - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let n = this.buffers[0].slice(t - this.bufferOffset, r - this.bufferOffset);
    for (; r - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), n += this.buffers[0].slice(0, r - this.bufferOffset);
    return n;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   * @param chunk Chunk to parse.
   */
  write(t) {
    if (this.ended) {
      this.cbs.onerror?.(new Error(".write() after done!"));
      return;
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   * @param chunk Optional final chunk to parse.
   */
  end(t) {
    if (this.ended) {
      this.cbs.onerror?.(new Error(".end() after done!"));
      return;
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
}
var G;
(function(e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
})(G || (G = {}));
function bs(e) {
  return e.type === G.Tag || e.type === G.Script || e.type === G.Style;
}
const xs = G.Root, ws = G.Text, vs = G.Directive, ys = G.Comment, _s = G.Script, ks = G.Style, Cs = G.Tag, Rs = G.CDATA, Ec = G.Doctype, Sc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CDATA: Rs,
  Comment: ys,
  Directive: vs,
  Doctype: Ec,
  get ElementType() {
    return G;
  },
  Root: xs,
  Script: _s,
  Style: ks,
  Tag: Cs,
  Text: ws,
  isTag: bs
}, Symbol.toStringTag, { value: "Module" }));
class As {
  /** Parent of the node */
  parent = null;
  /** Previous sibling */
  prev = null;
  /** Next sibling */
  next = null;
  /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
  startIndex = null;
  /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
  endIndex = null;
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(t) {
    this.parent = t;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(t) {
    this.prev = t;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(t) {
    this.next = t;
  }
  /**
   * Clone this node, and optionally its children.
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(t = !1) {
    return Fs(this, t);
  }
}
class zr extends As {
  data;
  /**
   * @param data The content of the data node
   */
  constructor(t) {
    super(), this.data = t;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(t) {
    this.data = t;
  }
}
class Tr extends zr {
  type = G.Text;
  get nodeType() {
    return 3;
  }
}
class Es extends zr {
  type = G.Comment;
  get nodeType() {
    return 8;
  }
}
class Ss extends zr {
  type = G.Directive;
  name;
  constructor(t, r) {
    super(r), this.name = t;
  }
  get nodeType() {
    return 1;
  }
  /** If this is a doctype, the document type name (parse5 only). */
  "x-name";
  /** If this is a doctype, the document type public identifier (parse5 only). */
  "x-publicId";
  /** If this is a doctype, the document type system identifier (parse5 only). */
  "x-systemId";
}
class jr extends As {
  children;
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(t) {
    super(), this.children = t;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    return this.children[0] ?? null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(t) {
    this.children = t;
  }
}
class Ds extends jr {
  type = G.CDATA;
  get nodeType() {
    return 4;
  }
}
class Fr extends jr {
  type = G.Root;
  get nodeType() {
    return 9;
  }
}
class Is extends jr {
  name;
  attribs;
  type;
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   * @param type Node type used for the new node instance.
   */
  constructor(t, r, n = [], i = t === "script" ? G.Script : t === "style" ? G.Style : G.Tag) {
    super(n), this.name = t, this.attribs = r, this.type = i;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(t) {
    this.name = t;
  }
  get attributes() {
    return Object.keys(this.attribs).map((t) => ({
      name: t,
      value: this.attribs[t],
      namespace: this["x-attribsNamespace"]?.[t],
      prefix: this["x-attribsPrefix"]?.[t]
    }));
  }
  /** Element namespace (parse5 only). */
  namespace;
  /** Element attribute namespaces (parse5 only). */
  "x-attribsNamespace";
  /** Element attribute namespace-related prefixes (parse5 only). */
  "x-attribsPrefix";
}
function we(e) {
  return bs(e);
}
function $r(e) {
  return e.type === G.CDATA;
}
function Ke(e) {
  return e.type === G.Text;
}
function Ts(e) {
  return e.type === G.Comment;
}
function Dc(e) {
  return e.type === G.Directive;
}
function Ic(e) {
  return e.type === G.Root;
}
function Se(e) {
  return Object.hasOwn(e, "children");
}
function Fs(e, t = !1) {
  let r;
  if (Ke(e))
    r = new Tr(e.data);
  else if (Ts(e))
    r = new Es(e.data);
  else if (we(e)) {
    const n = t ? Zt(e.children) : [], i = new Is(e.name, { ...e.attribs }, n);
    for (const s of n)
      s.parent = i;
    e.namespace != null && (i.namespace = e.namespace), e["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), r = i;
  } else if ($r(e)) {
    const n = t ? Zt(e.children) : [], i = new Ds(n);
    for (const s of n)
      s.parent = i;
    r = i;
  } else if (Ic(e)) {
    const n = t ? Zt(e.children) : [], i = new Fr(n);
    for (const s of n)
      s.parent = i;
    e["x-mode"] && (i["x-mode"] = e["x-mode"]), r = i;
  } else if (Dc(e)) {
    const n = new Ss(e.name, e.data);
    e["x-name"] != null && (n["x-name"] = e["x-name"], n["x-publicId"] = e["x-publicId"], n["x-systemId"] = e["x-systemId"]), r = n;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r;
}
function Zt(e) {
  const t = e.map((r) => Fs(r, !0));
  for (let r = 1; r < t.length; r++)
    t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t;
}
const zn = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class Rt {
  /** The elements of the DOM */
  dom = [];
  /** The root element for the DOM */
  root = new Fr(this.dom);
  /** Called once parsing has completed. */
  callback;
  /** Settings for the handler. */
  options;
  /** Callback whenever a tag is closed. */
  elementCB;
  /** Indicated whether parsing has been completed. */
  done = !1;
  /** Stack of open tags. */
  tagStack = [this.root];
  /** A data node that is still being written to. */
  lastNode = null;
  /** Reference to the parser instance. Used for location information. */
  parser = null;
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(t, r, n) {
    typeof r == "function" && (n = r, r = zn), typeof t == "object" && (r = t, t = void 0), this.callback = t ?? null, this.options = r ?? zn, this.elementCB = n ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new Fr(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(t) {
    this.handleCallback(t);
  }
  onclosetag() {
    this.lastNode = null;
    const t = this.tagStack.pop();
    this.options.withEndIndices && this.parser && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
  }
  onopentag(t, r) {
    const n = this.options.xmlMode ? G.Tag : void 0, i = new Is(t, r, void 0, n);
    this.addNode(i), this.tagStack.push(i);
  }
  ontext(t) {
    const { lastNode: r } = this;
    if (r && r.type === G.Text)
      r.data += t, this.options.withEndIndices && this.parser && (r.endIndex = this.parser.endIndex);
    else {
      const n = new Tr(t);
      this.addNode(n), this.lastNode = n;
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === G.Comment) {
      this.lastNode.data += t;
      return;
    }
    const r = new Es(t);
    this.addNode(r), this.lastNode = r;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const t = new Tr(""), r = new Ds([t]);
    this.addNode(r), t.parent = r, this.lastNode = t;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(t, r) {
    const n = new Ss(t, r);
    this.addNode(n);
  }
  handleCallback(t) {
    if (typeof this.callback == "function")
      this.callback(t, this.dom);
    else if (t)
      throw t;
  }
  addNode(t) {
    const r = this.tagStack[this.tagStack.length - 1], n = r.children[r.children.length - 1];
    this.options.withStartIndices && this.parser && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && this.parser && (t.endIndex = this.parser.endIndex), r.children.push(t), n && (t.prev = n, n.next = t), t.parent = r, this.lastNode = null;
  }
}
function ct(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return Ns(e, Array.isArray(t) ? t : [t], r, n);
}
function Ns(e, t, r, n) {
  const i = [], s = [Array.isArray(t) ? t : [t]], o = [0];
  for (; ; ) {
    if (o[0] >= s[0].length) {
      if (o.length === 1)
        return i;
      s.shift(), o.shift();
      continue;
    }
    const l = s[0][o[0]++];
    if (e(l) && (i.push(l), --n <= 0))
      return i;
    r && Se(l) && l.children.length > 0 && (o.unshift(0), s.unshift(l.children));
  }
}
function Ur(e, t, r = !0) {
  const n = Array.isArray(t) ? t : [t];
  for (const i of n) {
    if (we(i) && e(i))
      return i;
    if (r && Se(i) && i.children.length > 0) {
      const s = Ur(e, i.children, !0);
      if (s)
        return s;
    }
  }
  return null;
}
function Os(e, t) {
  return (Array.isArray(t) ? t : [t]).some((r) => we(r) && e(r) || Se(r) && Os(e, r.children));
}
function Tc(e, t) {
  const r = [], n = [Array.isArray(t) ? t : [t]], i = [0];
  for (; ; ) {
    if (i[0] >= n[0].length) {
      if (n.length === 1)
        return r;
      n.shift(), i.shift();
      continue;
    }
    const s = n[0][i[0]++];
    we(s) && e(s) && r.push(s), Se(s) && s.children.length > 0 && (i.unshift(0), n.unshift(s.children));
  }
}
const At = {
  tag_name(e) {
    return typeof e == "function" ? (t) => we(t) && e(t.name) : e === "*" ? we : (t) => we(t) && t.name === e;
  },
  tag_type(e) {
    return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
  },
  tag_contains(e) {
    return typeof e == "function" ? (t) => Ke(t) && e(t.data) : (t) => Ke(t) && t.data === e;
  }
};
function Jr(e, t) {
  return typeof t == "function" ? (r) => we(r) && t(r.attribs[e]) : (r) => we(r) && r.attribs[e] === t;
}
function Fc(e, t) {
  return (r) => e(r) || t(r);
}
function Bs(e) {
  const t = Object.keys(e).map((r) => {
    const n = e[r];
    return Object.hasOwn(At, r) ? At[r](n) : Jr(r, n);
  });
  return t.length === 0 ? null : t.reduce(Fc);
}
function Nc(e, t) {
  const r = Bs(e);
  return r ? r(t) : !0;
}
function Oc(e, t, r, n = Number.POSITIVE_INFINITY) {
  const i = Bs(e);
  return i ? ct(i, t, r, n) : [];
}
function Bc(e, t, r = !0) {
  return Array.isArray(t) || (t = [t]), Ur(Jr("id", e), t, r);
}
function Qe(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(At.tag_name(e), t, r, n);
}
function Mc(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(Jr("class", e), t, r, n);
}
function Pc(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(At.tag_type(e), t, r, n);
}
const Lc = new Map("altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath".split(" ").map((e) => [e.toLowerCase(), e])), qc = new Map("definitionURL attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ").map((e) => [e.toLowerCase(), e])), zc = new Set("style script xmp iframe noembed noframes plaintext noscript".split(" ")), jc = new Set("area base basefont br col command embed frame hr img input isindex keygen link meta param source track wbr".split(" ")), $c = /* @__PURE__ */ new Set(["svg", "math"]), Uc = new Set("mi mo mn ms mtext annotation-xml foreignObject desc title".split(" "));
function Jc(e, t = {}) {
  const r = "length" in e ? e : [e], n = t.xmlMode ?? !1;
  let i = "";
  for (let s = 0; s < r.length; s++)
    i += Ps(r[s], t, n);
  return i;
}
function Ms(e, t, r) {
  let n = "";
  for (let i = 0; i < e.length; i++)
    n += Ps(e[i], t, r);
  return n;
}
function Ps(e, t, r) {
  switch (e.type) {
    case xs:
      return Ms(e.children, t, r);
    case vs:
      return `<${e.data}>`;
    case ys:
      return `<!--${e.data}-->`;
    case Rs:
      return `<![CDATA[${e.children[0].data}]]>`;
    case _s:
    case ks:
    case Cs:
      return Wc(e, t, r);
    case ws: {
      const n = e, i = n.data || "";
      return (t.encodeEntities ?? t.decodeEntities) !== !1 && !(!r && n.parent && zc.has(n.parent.name)) ? r || t.encodeEntities !== "utf8" ? Ui(i) : wa(i) : i;
    }
  }
}
function Wc(e, t, r) {
  r === "foreign" && (e.name = Lc.get(e.name) ?? e.name, e.parent && Uc.has(e.parent.name) && (r = !1)), !r && $c.has(e.name) && (r = "foreign");
  const { name: n, children: i } = e, s = !r && jc.has(n);
  let o = `<${n}${Hc(e.attribs, t, r)}`;
  return i.length === 0 && (r ? t.selfClosingTags !== !1 : t.selfClosingTags && s) ? o += r ? "/>" : " />" : (o += ">", i.length > 0 && (o += Ms(i, t, r)), s || (o += `</${n}>`)), o;
}
function Vc(e) {
  return e.replaceAll('"', "&quot;");
}
function Hc(e, t, r) {
  if (!e)
    return "";
  const n = (t.encodeEntities ?? t.decodeEntities) === !1 ? Vc : r || t.encodeEntities !== "utf8" ? Ui : ba, i = r === "foreign", s = !!(t.emptyAttrs ?? r);
  let o = "";
  for (const l in e) {
    if (!Object.hasOwn(e, l))
      continue;
    const f = e[l], c = i ? qc.get(l) ?? l : l;
    o += !s && (f == null || f === "") ? ` ${c}` : ` ${c}="${n(f == null ? "" : String(f))}"`;
  }
  return o;
}
function Ls(e, t) {
  return Jc(e, t);
}
function Yc(e, t) {
  return Se(e) ? e.children.map((r) => Ls(r, t)).join("") : "";
}
function yt(e) {
  return Array.isArray(e) ? e.map(yt).join("") : we(e) ? e.name === "br" ? `
` : yt(e.children) : $r(e) ? yt(e.children) : Ke(e) ? e.data : "";
}
function Et(e) {
  return Array.isArray(e) ? e.map(Et).join("") : Se(e) && !Ts(e) ? Et(e.children) : Ke(e) ? e.data : "";
}
function Nr(e) {
  return Array.isArray(e) ? e.map(Nr).join("") : Se(e) && (e.type === G.Tag || $r(e)) ? Nr(e.children) : Ke(e) ? e.data : "";
}
function Wr(e) {
  const t = St(Qc, e);
  return t ? t.name === "feed" ? Gc(t) : Zc(t) : null;
}
function Gc(e) {
  const t = e.children, r = {
    type: "atom",
    items: Qe("entry", t).map((s) => {
      const { children: o } = s, l = { media: qs(o) };
      ge(l, "id", "id", o), ge(l, "title", "title", o);
      const f = St("link", o)?.attribs.href;
      f && (l.link = f);
      const c = Be("summary", o) || Be("content", o);
      c && (l.description = c);
      const d = Be("updated", o);
      return d && (l.pubDate = new Date(d)), l;
    })
  };
  ge(r, "id", "id", t), ge(r, "title", "title", t);
  const n = St("link", t)?.attribs.href;
  n && (r.link = n), ge(r, "description", "subtitle", t);
  const i = Be("updated", t);
  return i && (r.updated = new Date(i)), ge(r, "author", "email", t, !0), r;
}
function Zc(e) {
  const t = St("channel", e.children)?.children ?? [], r = {
    type: e.name.substr(0, 3),
    id: "",
    items: Qe("item", e.children).map((i) => {
      const { children: s } = i, o = { media: qs(s) };
      ge(o, "id", "guid", s), ge(o, "title", "title", s), ge(o, "link", "link", s), ge(o, "description", "description", s);
      const l = Be("pubDate", s) || Be("dc:date", s);
      return l && (o.pubDate = new Date(l)), o;
    })
  };
  ge(r, "title", "title", t), ge(r, "link", "link", t), ge(r, "description", "description", t);
  const n = Be("lastBuildDate", t);
  return n && (r.updated = new Date(n)), ge(r, "author", "managingEditor", t, !0), r;
}
const Xc = ["url", "type", "lang"], Kc = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function qs(e) {
  return Qe("media:content", e).map((t) => {
    const { attribs: r } = t, n = {
      medium: r.medium,
      isDefault: !!r.isDefault
    };
    for (const i of Xc)
      r[i] && (n[i] = r[i]);
    for (const i of Kc)
      r[i] && (n[i] = Number.parseInt(r[i], 10));
    return r.expression && (n.expression = r.expression), n;
  });
}
function St(e, t) {
  return Qe(e, t, !0, 1)[0];
}
function Be(e, t, r = !1) {
  return Et(Qe(e, t, r, 1)).trim();
}
function ge(e, t, r, n, i = !1) {
  const s = Be(r, n, i);
  s && (e[t] = s);
}
function Qc(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
function eu(e) {
  let t = e.length;
  for (; --t >= 0; ) {
    const r = e[t];
    if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) {
      e.splice(t, 1);
      continue;
    }
    for (let n = r.parent; n; n = n.parent)
      if (e.includes(n)) {
        e.splice(t, 1);
        break;
      }
  }
  return e;
}
var xe;
(function(e) {
  e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
})(xe || (xe = {}));
function zs(e, t) {
  const r = [], n = [];
  if (e === t)
    return 0;
  let i = Se(e) ? e : e.parent;
  for (; i; )
    r.unshift(i), i = i.parent;
  for (i = Se(t) ? t : t.parent; i; )
    n.unshift(i), i = i.parent;
  const s = Math.min(r.length, n.length);
  let o = 0;
  for (; o < s && r[o] === n[o]; )
    o++;
  if (o === 0)
    return xe.DISCONNECTED;
  const l = r[o - 1], f = l.children, c = r[o], d = n[o];
  return f.indexOf(c) > f.indexOf(d) ? l === t ? xe.FOLLOWING | xe.CONTAINED_BY : xe.FOLLOWING : l === e ? xe.PRECEDING | xe.CONTAINS : xe.PRECEDING;
}
function tu(e) {
  return e = e.filter((t, r, n) => !n.includes(t, r + 1)), e.sort((t, r) => {
    const n = zs(t, r);
    return n & xe.PRECEDING ? -1 : n & xe.FOLLOWING ? 1 : 0;
  }), e;
}
function ut(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    const t = e.parent.children, r = t.lastIndexOf(e);
    r !== -1 && t.splice(r, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
function ru(e, t) {
  if (t.prev = e.prev, t.prev && (t.prev.next = t), t.next = e.next, t.next && (t.next.prev = t), t.parent = e.parent, t.parent) {
    const { children: r } = t.parent, n = r.lastIndexOf(e);
    if (n === -1)
      return;
    r[n] = t, e.parent = null;
  }
}
function nu(e, t) {
  if (ut(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const r = e.children[e.children.length - 2];
    r.next = t, t.prev = r;
  } else
    t.prev = null;
}
function iu(e, t) {
  ut(t);
  const { parent: r } = e, n = e.next;
  if (t.next = n, t.prev = e, e.next = t, t.parent = r, n) {
    if (n.prev = t, r) {
      const i = r.children;
      i.splice(i.lastIndexOf(n), 0, t);
    }
  } else r && r.children.push(t);
}
function su(e, t) {
  if (ut(t), t.parent = e, t.prev = null, e.children.unshift(t) === 1)
    t.next = null;
  else {
    const r = e.children[1];
    r.prev = t, t.next = r;
  }
}
function ou(e, t) {
  ut(t);
  const { parent: r } = e;
  if (r) {
    const n = r.children;
    n.splice(n.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = r, t.prev = e.prev, t.next = e, e.prev = t;
}
function js(e) {
  return Se(e) ? e.children : [];
}
function $s(e) {
  return e.parent || null;
}
function au(e) {
  const t = $s(e);
  if (t != null)
    return js(t);
  const r = [e];
  let { prev: n, next: i } = e;
  for (; n != null; )
    r.unshift(n), { prev: n } = n;
  for (; i != null; )
    r.push(i), { next: i } = i;
  return r;
}
function lu(e, t) {
  const { attribs: r } = e;
  return r?.[t];
}
function cu(e, t) {
  const { attribs: r } = e;
  return r != null && Object.hasOwn(r, t) && r[t] != null;
}
function uu(e) {
  return e.name;
}
function hu(e) {
  let { next: t } = e;
  for (; t !== null && !we(t); )
    ({ next: t } = t);
  return t;
}
function fu(e) {
  let { prev: t } = e;
  for (; t !== null && !we(t); )
    ({ prev: t } = t);
  return t;
}
const pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return xe;
  },
  append: iu,
  appendChild: nu,
  compareDocumentPosition: zs,
  existsOne: Os,
  filter: ct,
  find: Ns,
  findAll: Tc,
  findOne: Ur,
  getAttributeValue: lu,
  getChildren: js,
  getElementById: Bc,
  getElements: Oc,
  getElementsByClassName: Mc,
  getElementsByTagName: Qe,
  getElementsByTagType: Pc,
  getFeed: Wr,
  getInnerHTML: Yc,
  getName: uu,
  getOuterHTML: Ls,
  getParent: $s,
  getSiblings: au,
  getText: yt,
  hasAttrib: cu,
  innerText: Nr,
  nextElementSibling: hu,
  prepend: ou,
  prependChild: su,
  prevElementSibling: fu,
  removeElement: ut,
  removeSubsets: eu,
  replaceElement: ru,
  testElement: Nc,
  textContent: Et,
  uniqueSort: tu
}, Symbol.toStringTag, { value: "Module" }));
function Us(e, t) {
  const r = new Rt(void 0, t);
  return new qr(r, t).end(e), r.root;
}
function du(e, t, r) {
  const n = new Rt((i) => e(i, n.root), t, r);
  return new qr(n, t);
}
const mu = { xmlMode: !0 };
function gu(e, t = mu) {
  return Wr(Us(e, t).children);
}
const bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DefaultHandler: Rt,
  DomHandler: Rt,
  DomUtils: pu,
  ElementType: Sc,
  Parser: qr,
  get QuoteType() {
    return _e;
  },
  Tokenizer: gs,
  createDocumentStream: du,
  getFeed: Wr,
  parseDocument: Us,
  parseFeed: gu
}, Symbol.toStringTag, { value: "Module" })), xu = /* @__PURE__ */ ms(bu);
var Xt, jn;
function wu() {
  return jn || (jn = 1, Xt = (e) => {
    if (typeof e != "string")
      throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }), Xt;
}
var Kt = {}, $n;
function vu() {
  if ($n) return Kt;
  $n = 1;
  function e(r) {
    return Object.prototype.toString.call(r) === "[object Object]";
  }
  function t(r) {
    var n, i;
    return e(r) === !1 ? !1 : (n = r.constructor, n === void 0 ? !0 : (i = n.prototype, !(e(i) === !1 || i.hasOwnProperty("isPrototypeOf") === !1)));
  }
  return Kt.isPlainObject = t, Kt;
}
var _t = { exports: {} }, yu = _t.exports, Un;
function _u() {
  return Un || (Un = 1, (function(e) {
    (function(t, r) {
      e.exports ? e.exports = r() : t.parseSrcset = r();
    })(yu, function() {
      return function(t) {
        function r(C) {
          return C === " " || // space
          C === "	" || // horizontal tab
          C === `
` || // new line
          C === "\f" || // form feed
          C === "\r";
        }
        function n(C) {
          var w, b = C.exec(t.substring(g));
          if (b)
            return w = b[0], g += w.length, w;
        }
        for (var i = t.length, s = /^[ \t\n\r\u000c]+/, o = /^[, \t\n\r\u000c]+/, l = /^[^ \t\n\r\u000c]+/, f = /[,]+$/, c = /^\d+$/, d = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, u, p, a, h, m, g = 0, k = []; ; ) {
          if (n(o), g >= i)
            return k;
          u = n(l), p = [], u.slice(-1) === "," ? (u = u.replace(f, ""), _()) : y();
        }
        function y() {
          for (n(s), a = "", h = "in descriptor"; ; ) {
            if (m = t.charAt(g), h === "in descriptor")
              if (r(m))
                a && (p.push(a), a = "", h = "after descriptor");
              else if (m === ",") {
                g += 1, a && p.push(a), _();
                return;
              } else if (m === "(")
                a = a + m, h = "in parens";
              else if (m === "") {
                a && p.push(a), _();
                return;
              } else
                a = a + m;
            else if (h === "in parens")
              if (m === ")")
                a = a + m, h = "in descriptor";
              else if (m === "") {
                p.push(a), _();
                return;
              } else
                a = a + m;
            else if (h === "after descriptor" && !r(m))
              if (m === "") {
                _();
                return;
              } else
                h = "in descriptor", g -= 1;
            g += 1;
          }
        }
        function _() {
          var C = !1, w, b, v, x, R = {}, I, F, S, Y, P;
          for (x = 0; x < p.length; x++)
            I = p[x], F = I[I.length - 1], S = I.substring(0, I.length - 1), Y = parseInt(S, 10), P = parseFloat(S), c.test(S) && F === "w" ? ((w || b) && (C = !0), Y === 0 ? C = !0 : w = Y) : d.test(S) && F === "x" ? ((w || b || v) && (C = !0), P < 0 ? C = !0 : b = P) : c.test(S) && F === "h" ? ((v || b) && (C = !0), Y === 0 ? C = !0 : v = Y) : C = !0;
          C ? console && console.log && console.log("Invalid srcset descriptor found in '" + t + "' at '" + I + "'.") : (R.url = u, w && (R.w = w), b && (R.d = b), v && (R.h = v), k.push(R));
        }
      };
    });
  })(_t)), _t.exports;
}
var xt = { exports: {} }, Jn;
function ku() {
  if (Jn) return xt.exports;
  Jn = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return xt.exports = t(), xt.exports.createColors = t, xt.exports;
}
const Cu = {}, Ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cu
}, Symbol.toStringTag, { value: "Module" })), ke = /* @__PURE__ */ ms(Ru);
var Qt, Wn;
function Vr() {
  if (Wn) return Qt;
  Wn = 1;
  let e = /* @__PURE__ */ ku(), t = ke;
  class r extends Error {
    constructor(i, s, o, l, f, c) {
      super(i), this.name = "CssSyntaxError", this.reason = i, f && (this.file = f), l && (this.source = l), c && (this.plugin = c), typeof s < "u" && typeof o < "u" && (typeof s == "number" ? (this.line = s, this.column = o) : (this.line = s.line, this.column = s.column, this.endLine = o.line, this.endColumn = o.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, r);
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
    }
    showSourceCode(i) {
      if (!this.source) return "";
      let s = this.source;
      i == null && (i = e.isColorSupported);
      let o = (a) => a, l = (a) => a, f = (a) => a;
      if (i) {
        let { bold: a, gray: h, red: m } = e.createColors(!0);
        l = (g) => a(m(g)), o = (g) => h(g), t && (f = (g) => t(g));
      }
      let c = s.split(/\r?\n/), d = Math.max(this.line - 3, 0), u = Math.min(this.line + 2, c.length), p = String(u).length;
      return c.slice(d, u).map((a, h) => {
        let m = d + 1 + h, g = " " + (" " + m).slice(-p) + " | ";
        if (m === this.line) {
          if (a.length > 160) {
            let y = 20, _ = typeof this.endColumn == "number" ? this.endColumn : this.column, C = Math.max(0, this.column - y), w = Math.max(this.column + y, _ + y), b = a.slice(C, w), v = o(g.replace(/\d/g, " ")) + a.slice(0, Math.min(this.column - 1, y - 1)).replace(/[^\t]/g, " ");
            return l(">") + o(g) + f(b) + `
 ` + v + l("^");
          }
          let k = o(g.replace(/\d/g, " ")) + a.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return l(">") + o(g) + f(a) + `
 ` + k + l("^");
        }
        return " " + o(g) + f(a);
      }).join(`
`);
    }
    toString() {
      let i = this.showSourceCode();
      return i && (i = `

` + i + `
`), this.name + ": " + this.message + i;
    }
  }
  return Qt = r, r.default = r, Qt;
}
var er, Vn;
function Js() {
  if (Vn) return er;
  Vn = 1;
  const e = /[\t\n\f\r "#'()/;[\\\]{}]/, t = {
    after: `
`,
    beforeClose: `
`,
    beforeComment: `
`,
    beforeDecl: `
`,
    beforeOpen: " ",
    beforeRule: `
`,
    colon: ": ",
    commentLeft: " ",
    commentRight: " ",
    emptyBody: "",
    indent: "    ",
    semicolon: !1
  };
  function r(f) {
    return f[0].toUpperCase() + f.slice(1);
  }
  function n(f, c) {
    let d = "@" + c.name, u = c.params ? f.rawValue(c, "params") : "", p = c.raws.afterName;
    return typeof p > "u" ? p = u ? " " : "" : p === "" && u && !e.test(u[0]) && (p = " "), d + p + u;
  }
  function i(f) {
    if (!f.prop.startsWith("--")) return !1;
    let c = f.raws.before;
    return typeof c > "u" || !/[^\s;]$/.test(c);
  }
  function s(f, c, d) {
    let u = d.nodes, p = u.length - 1;
    for (; p > 0 && u[p].type === "comment"; )
      p -= 1;
    let a = f.raw(d, "semicolon"), h = d.type === "document";
    for (let m = u.length - 1; m >= 0; m--) {
      let g = u[m], k = p !== m || a;
      !k && m < u.length - 1 && (g.type === "atrule" && !g.nodes || g.type === "decl" && i(g)) && (k = !0), c.push({
        document: h,
        node: g,
        semicolon: k
      });
    }
  }
  function o(f, c, d, u) {
    let p = f.raw(d, "between", "beforeOpen");
    f.builder(u + p + "{", d, "start");
    let a = d.nodes && d.nodes.length, h = () => {
      let m = a ? f.raw(d, "after") : f.raw(d, "after", "emptyBody");
      m && f.builder(m), f.builder("}", d, "end"), d.type === "rule" && d.raws.ownSemicolon && f.builder(d.raws.ownSemicolon, d, "end");
    };
    a ? (c.push(h), s(f, c, d)) : h();
  }
  class l {
    constructor(c) {
      this.builder = c;
    }
    atrule(c, d) {
      let u = n(this, c);
      if (c.nodes)
        this.block(c, u);
      else {
        let p = (c.raws.between || "") + (d ? ";" : "");
        this.builder(u + p, c);
      }
    }
    beforeAfter(c, d) {
      let u;
      c.type === "decl" ? u = this.raw(c, null, "beforeDecl") : c.type === "comment" ? u = this.raw(c, null, "beforeComment") : d === "before" ? u = this.raw(c, null, "beforeRule") : u = this.raw(c, null, "beforeClose");
      let p = c.parent, a = 0;
      for (; p && p.type !== "root"; )
        a += 1, p = p.parent;
      if (u.includes(`
`)) {
        let h = this.raw(c, null, "indent");
        if (h.length)
          for (let m = 0; m < a; m++) u += h;
      }
      return u;
    }
    block(c, d) {
      let u = this.raw(c, "between", "beforeOpen");
      this.builder(d + u + "{", c, "start");
      let p;
      c.nodes && c.nodes.length ? (this.body(c), p = this.raw(c, "after")) : p = this.raw(c, "after", "emptyBody"), p && this.builder(p), this.builder("}", c, "end");
    }
    body(c) {
      let d = l.prototype, u = ["atrule", "block", "body", "rule", "stringify"].every(
        (a) => this[a] === d[a]
      ), p = [];
      for (s(this, p, c); p.length > 0; ) {
        let a = p.pop();
        if (typeof a == "function") {
          a();
          continue;
        }
        let h = a.node, m = this.raw(h, "before");
        m && this.builder(m), u && h.type === "rule" ? o(this, p, h, this.rawValue(h, "selector")) : u && h.type === "atrule" && h.nodes ? o(this, p, h, n(this, h)) : this.stringify(h, a.semicolon);
      }
    }
    comment(c) {
      let d = this.raw(c, "left", "commentLeft"), u = this.raw(c, "right", "commentRight");
      this.builder("/*" + d + c.text + u + "*/", c);
    }
    decl(c, d) {
      let u = c.raws, p = this.raw(c, "between", "colon"), a = c.prop + p + this.rawValue(c, "value");
      c.important && (a += u.important || " !important"), d && (a += ";"), this.builder(a, c);
    }
    document(c) {
      this.body(c);
    }
    raw(c, d, u) {
      let p;
      if (u || (u = d), d && (p = c.raws[d], typeof p < "u"))
        return p;
      let a = c.parent;
      if (u === "before" && (!a || a.type === "root" && a.first === c || a && a.type === "document"))
        return "";
      if (!a) return t[u];
      let h = c.root(), m = h.rawCache || (h.rawCache = {});
      if (typeof m[u] < "u")
        return m[u];
      if (u === "before" || u === "after")
        return this.beforeAfter(c, u);
      {
        let g = "raw" + r(u);
        this[g] ? p = this[g](h, c) : h.walk((k) => {
          if (p = k.raws[d], typeof p < "u") return !1;
        });
      }
      return typeof p > "u" && (p = t[u]), m[u] = p, p;
    }
    rawBeforeClose(c) {
      let d;
      return c.walk((u) => {
        if (u.nodes && u.nodes.length > 0 && typeof u.raws.after < "u")
          return d = u.raws.after, d.includes(`
`) && (d = d.replace(/[^\n]+$/, "")), !1;
      }), d && (d = d.replace(/\S/g, "")), d;
    }
    rawBeforeComment(c, d) {
      let u;
      return c.walkComments((p) => {
        if (typeof p.raws.before < "u")
          return u = p.raws.before, u.includes(`
`) && (u = u.replace(/[^\n]+$/, "")), !1;
      }), typeof u > "u" ? u = this.raw(d, null, "beforeDecl") : u && (u = u.replace(/\S/g, "")), u;
    }
    rawBeforeDecl(c, d) {
      let u;
      return c.walkDecls((p) => {
        if (typeof p.raws.before < "u")
          return u = p.raws.before, u.includes(`
`) && (u = u.replace(/[^\n]+$/, "")), !1;
      }), typeof u > "u" ? u = this.raw(d, null, "beforeRule") : u && (u = u.replace(/\S/g, "")), u;
    }
    rawBeforeOpen(c) {
      let d;
      return c.walk((u) => {
        if (u.type !== "decl" && (d = u.raws.between, typeof d < "u"))
          return !1;
      }), d;
    }
    rawBeforeRule(c) {
      let d;
      return c.walk((u) => {
        if (u.nodes && (u.parent !== c || c.first !== u) && typeof u.raws.before < "u")
          return d = u.raws.before, d.includes(`
`) && (d = d.replace(/[^\n]+$/, "")), !1;
      }), d && (d = d.replace(/\S/g, "")), d;
    }
    rawColon(c) {
      let d;
      return c.walkDecls((u) => {
        if (typeof u.raws.between < "u")
          return d = u.raws.between.replace(/[^\s:]/g, ""), !1;
      }), d;
    }
    rawEmptyBody(c) {
      let d;
      return c.walk((u) => {
        if (u.nodes && u.nodes.length === 0 && (d = u.raws.after, typeof d < "u"))
          return !1;
      }), d;
    }
    rawIndent(c) {
      if (c.raws.indent) return c.raws.indent;
      let d;
      return c.walk((u) => {
        let p = u.parent;
        if (p && p !== c && p.parent && p.parent === c && typeof u.raws.before < "u") {
          let a = u.raws.before.split(`
`);
          return d = a[a.length - 1], d = d.replace(/\S/g, ""), !1;
        }
      }), d;
    }
    rawSemicolon(c) {
      let d;
      return c.walk((u) => {
        if (u.nodes && u.nodes.length && u.last.type === "decl" && (d = u.raws.semicolon, typeof d < "u"))
          return !1;
      }), d;
    }
    rawValue(c, d) {
      let u = c[d], p = c.raws[d];
      return p && p.value === u ? p.raw : u;
    }
    root(c) {
      !(c.parent && c.parent.type === "document") && c.source && c.source.input.hasBOM && this.builder("\uFEFF", c, "start"), this.body(c), c.raws.after && this.builder(c.raws.after);
    }
    rule(c) {
      this.block(c, this.rawValue(c, "selector")), c.raws.ownSemicolon && this.builder(c.raws.ownSemicolon, c, "end");
    }
    stringify(c, d) {
      if (!this[c.type])
        throw new Error(
          "Unknown AST node type " + c.type + ". Maybe you need to change PostCSS stringifier."
        );
      this[c.type](c, d);
    }
  }
  return er = l, l.default = l, er;
}
var tr, Hn;
function Tt() {
  if (Hn) return tr;
  Hn = 1;
  let e = Js();
  const t = /(<)(\/?style\b)/gi, r = /(<)(!--)/g;
  function n(l) {
    return l.includes("<") ? l.replace(t, "\\3c $2").replace(r, "\\3c $2") : l;
  }
  function i(l, f, c) {
    let d = [], u = 0, p = 0;
    for (let a = 0; a < l.length; a += 3) {
      let h = p, m = u + l[a].length;
      for (; u < m; )
        f[u] === c[p] ? (u += 1, p += 1) : (u += 1, p += 4);
      d.push(c.slice(h, p));
    }
    return d;
  }
  class s extends e {
    escapeHTML(f) {
      let c = this.builder, d, u;
      if (this.builder = (a, h, m) => {
        d ? (u += a, d.push(a, h, m)) : a.includes("<") ? (u = a, d = [a, h, m]) : c(a, h, m);
      }, f(), this.builder = c, !d) return;
      let p = n(u);
      if (p === u)
        for (let a = 0; a < d.length; a += 3)
          c(d[a], d[a + 1], d[a + 2]);
      else {
        let a = i(d, u, p);
        for (let h = 0; h < d.length; h += 3)
          c(a[h / 3], d[h + 1], d[h + 2]);
      }
    }
    root(f) {
      f.parent && f.parent.type === "document" ? (this.escapeHTML(() => this.body(f)), f.raws.after && this.builder(f.raws.after)) : this.escapeHTML(() => super.root(f));
    }
  }
  function o(l, f) {
    let c = new s(f);
    l.type === "root" || l.type === "document" ? c.stringify(l) : c.escapeHTML(() => c.stringify(l));
  }
  return tr = o, o.default = o, tr;
}
var wt = {}, Yn;
function Ft() {
  return Yn || (Yn = 1, wt.isClean = /* @__PURE__ */ Symbol("isClean"), wt.my = /* @__PURE__ */ Symbol("my")), wt;
}
var rr, Gn;
function Nt() {
  if (Gn) return rr;
  Gn = 1;
  let e = Vr(), t = Js(), r = Tt(), { isClean: n, my: i } = Ft();
  function s(f, c) {
    let d = new f.constructor(), u = [[f, d, c]];
    for (; u.length > 0; ) {
      let [p, a, h] = u.pop();
      for (let m in p) {
        if (!Object.prototype.hasOwnProperty.call(p, m) || m === "proxyCache") continue;
        let g = p[m], k = typeof g;
        if (m === "parent" && k === "object")
          h && (a[m] = h);
        else if (m === "source")
          a[m] = g;
        else if (Array.isArray(g)) {
          let y = [];
          a[m] = y;
          for (let _ of g) {
            let C = new _.constructor();
            y.push(C), u.push([_, C, a]);
          }
        } else {
          if (k === "object" && g !== null) {
            let y = new g.constructor();
            u.push([g, y, void 0]), g = y;
          }
          a[m] = g;
        }
      }
    }
    return d;
  }
  function o(f, c) {
    if (c && typeof c.offset < "u")
      return c.offset;
    let d = 1, u = 1, p = 0;
    for (let a = 0; a < f.length; a++) {
      if (u === c.line && d === c.column) {
        p = a;
        break;
      }
      f[a] === `
` ? (d = 1, u += 1) : d += 1;
    }
    return p;
  }
  class l {
    get proxyOf() {
      return this;
    }
    constructor(c = {}) {
      this.raws = {}, this[n] = !1, this[i] = !0;
      for (let d of Object.keys(c))
        if (d !== "__proto__")
          if (d === "nodes") {
            this.nodes = [];
            for (let u of c[d])
              typeof u.clone == "function" && u.parent ? this.append(u.clone()) : this.append(u);
          } else
            this[d] = c[d];
    }
    addToError(c) {
      if (c.postcssNode = this, c.stack && this.source && /\n\s{4}at /.test(c.stack)) {
        let d = this.source;
        c.stack = c.stack.replace(
          /\n\s{4}at /,
          `$&${d.input.from}:${d.start.line}:${d.start.column}$&`
        );
      }
      return c;
    }
    after(c) {
      return this.parent.insertAfter(this, c), this;
    }
    assign(c = {}) {
      for (let d in c)
        this[d] = c[d];
      return this;
    }
    before(c) {
      return this.parent.insertBefore(this, c), this;
    }
    cleanRaws(c) {
      delete this.raws.before, delete this.raws.after, c || delete this.raws.between;
    }
    clone(c = {}) {
      let d = s(this);
      for (let u in c)
        d[u] = c[u];
      return d;
    }
    cloneAfter(c = {}) {
      let d = this.clone(c);
      return this.parent.insertAfter(this, d), d;
    }
    cloneBefore(c = {}) {
      let d = this.clone(c);
      return this.parent.insertBefore(this, d), d;
    }
    error(c, d = {}) {
      if (this.source) {
        let { end: u, start: p } = this.rangeBy(d);
        return this.source.input.error(
          c,
          { column: p.column, line: p.line },
          { column: u.column, line: u.line },
          d
        );
      }
      return new e(c);
    }
    getProxyProcessor() {
      return {
        get(c, d) {
          return d === "proxyOf" ? c : d === "root" ? () => c.root().toProxy() : c[d];
        },
        set(c, d, u) {
          return c[d] === u || (c[d] = u, (d === "prop" || d === "value" || d === "name" || d === "params" || d === "important" || /* c8 ignore next */
          d === "text") && c.markDirty()), !0;
        }
      };
    }
    /* c8 ignore next 3 */
    markClean() {
      this[n] = !0;
    }
    markDirty() {
      if (this[n]) {
        this[n] = !1;
        let c = this;
        for (; c = c.parent; )
          c[n] = !1;
      }
    }
    next() {
      if (!this.parent) return;
      let c = this.parent.index(this);
      return this.parent.nodes[c + 1];
    }
    positionBy(c = {}) {
      let d = "document" in this.source.input ? this.source.input.document : this.source.input.css, u = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: o(d, this.source.start)
      };
      if (c.index)
        u = this.positionInside(c.index);
      else if (c.word) {
        let a = d.slice(
          o(d, this.source.start),
          this.rangeBy().end.offset
        ).indexOf(c.word);
        a !== -1 && (u = this.positionInside(a));
      }
      return u;
    }
    positionInside(c) {
      let d = this.source.start.column, u = this.source.start.line, p = "document" in this.source.input ? this.source.input.document : this.source.input.css, a = o(p, this.source.start), h = a + c;
      for (let m = a; m < h; m++)
        p[m] === `
` ? (d = 1, u += 1) : d += 1;
      return { column: d, line: u, offset: h };
    }
    prev() {
      if (!this.parent) return;
      let c = this.parent.index(this);
      return this.parent.nodes[c - 1];
    }
    rangeBy(c = {}) {
      let d = "document" in this.source.input ? this.source.input.document : this.source.input.css, u = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: o(d, this.source.start)
      }, p = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line,
        offset: typeof this.source.end.offset == "number" ? (
          // `source.end.offset` is exclusive, so we don't need to add 1
          this.source.end.offset
        ) : (
          // Since line/column in this.source.end is inclusive,
          // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
          // So, we add 1 to convert it to exclusive.
          o(d, this.source.end) + 1
        )
      } : {
        column: u.column + 1,
        line: u.line,
        offset: u.offset + 1
      };
      if (c.word) {
        let h = d.slice(
          o(d, this.source.start),
          p.offset
        ).indexOf(c.word);
        h !== -1 && (u = this.positionInside(h), p = this.positionInside(h + c.word.length));
      } else
        c.start ? u = {
          column: c.start.column,
          line: c.start.line,
          offset: o(d, c.start)
        } : typeof c.index == "number" && (u = this.positionInside(c.index)), c.end ? p = {
          column: c.end.column,
          line: c.end.line,
          offset: o(d, c.end)
        } : typeof c.endIndex == "number" ? p = this.positionInside(c.endIndex) : typeof c.index == "number" && (p = this.positionInside(c.index + 1));
      return (p.line < u.line || p.line === u.line && p.column <= u.column) && (p = {
        column: u.column + 1,
        line: u.line,
        offset: u.offset + 1
      }), { end: p, start: u };
    }
    raw(c, d) {
      return new t().raw(this, c, d);
    }
    remove() {
      return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
    }
    replaceWith(...c) {
      if (this.parent) {
        let d = this, u = !1;
        for (let p of c)
          p === this ? u = !0 : u ? (this.parent.insertAfter(d, p), d = p) : this.parent.insertBefore(d, p);
        u || this.remove();
      }
      return this;
    }
    root() {
      let c = this;
      for (; c.parent && c.parent.type !== "document"; )
        c = c.parent;
      return c;
    }
    toJSON(c, d) {
      let u = d == null;
      d = d || /* @__PURE__ */ new Map();
      let p = [], a = [[this, p, 0]];
      for (let m = 0; m < a.length; m++) {
        let [g, k, y] = a[m], _ = {};
        k[y] = _;
        for (let C in g) {
          if (!Object.prototype.hasOwnProperty.call(g, C) || C === "parent" || C === "proxyCache") continue;
          let w = g[C];
          if (Array.isArray(w)) {
            let b = [];
            _[C] = b;
            for (let v = 0; v < w.length; v++) {
              let x = w[v];
              typeof x == "object" && x.toJSON ? x.toJSON === l.prototype.toJSON ? a.push([x, b, v]) : b[v] = x.toJSON(null, d) : b[v] = x;
            }
          } else if (typeof w == "object" && w.toJSON)
            w.toJSON === l.prototype.toJSON ? a.push([w, _, C]) : _[C] = w.toJSON(null, d);
          else if (C === "source") {
            if (w == null) continue;
            let b = d.get(w.input);
            b == null && (b = d.size, d.set(w.input, b)), _[C] = {
              end: w.end,
              inputId: b,
              start: w.start
            };
          } else
            _[C] = w;
        }
      }
      let h = p[0];
      return u && (h.inputs = [...d.keys()].map((m) => m.toJSON())), h;
    }
    toProxy() {
      return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
    }
    toString(c = r) {
      c.stringify && (c = c.stringify);
      let d = "";
      return c(this, (u) => {
        d += u;
      }), d;
    }
    warn(c, d, u = {}) {
      let p = { node: this };
      for (let a in u) p[a] = u[a];
      return c.warn(d, p);
    }
  }
  return rr = l, l.default = l, rr;
}
var nr, Zn;
function Ot() {
  if (Zn) return nr;
  Zn = 1;
  let e = Nt();
  class t extends e {
    constructor(n) {
      super(n), this.type = "comment";
    }
  }
  return nr = t, t.default = t, nr;
}
var ir, Xn;
function Bt() {
  if (Xn) return ir;
  Xn = 1;
  let e = Nt();
  class t extends e {
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
    constructor(n) {
      n && typeof n.value < "u" && typeof n.value != "string" && (n = { ...n, value: String(n.value) }), super(n), this.type = "decl";
    }
  }
  return ir = t, t.default = t, ir;
}
var sr, Kn;
function Pe() {
  if (Kn) return sr;
  Kn = 1;
  let e = Ot(), t = Bt(), r = Nt(), { isClean: n, my: i } = Ft(), s, o, l, f;
  function c(p) {
    let a = p.slice();
    for (; a.length > 0; ) {
      let h = a.pop();
      if (delete h.source, h.nodes) {
        h.nodes = h.nodes.slice();
        for (let m of h.nodes) a.push(m);
      }
    }
    return p.slice();
  }
  function d(p) {
    let a = [p];
    for (; a.length > 0; ) {
      let h = a.pop();
      if (h[n] = !1, h.proxyOf.nodes)
        for (let m of h.proxyOf.nodes) a.push(m);
    }
  }
  class u extends r {
    get first() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[0];
    }
    get last() {
      if (this.proxyOf.nodes)
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
    append(...a) {
      for (let h of a) {
        let m = this.normalize(h, this.last);
        for (let g of m) this.proxyOf.nodes.push(g);
      }
      return this.markDirty(), this;
    }
    cleanRaws(a) {
      let h = [this];
      for (; h.length > 0; ) {
        let m = h.pop();
        if (m !== this && m.cleanRaws !== u.prototype.cleanRaws) {
          m.cleanRaws(a);
          continue;
        }
        if (r.prototype.cleanRaws.call(m, a), m.nodes)
          for (let g of m.nodes) h.push(g);
      }
    }
    each(a) {
      if (!this.proxyOf.nodes) return;
      let h = this.getIterator(), m, g;
      for (; this.indexes[h] < this.proxyOf.nodes.length && (m = this.indexes[h], g = a(this.proxyOf.nodes[m], m), g !== !1); )
        this.indexes[h] += 1;
      return delete this.indexes[h], g;
    }
    every(a) {
      return this.nodes.every(a);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
      let a = this.lastEach;
      return this.indexes[a] = 0, a;
    }
    getProxyProcessor() {
      return {
        get(a, h) {
          return h === "proxyOf" ? a : a[h] ? h === "each" || typeof h == "string" && h.startsWith("walk") ? (...m) => a[h](
            ...m.map((g) => typeof g == "function" ? (k, y) => g(k.toProxy(), y) : g)
          ) : h === "every" || h === "some" ? (m) => a[h](
            (g, ...k) => m(g.toProxy(), ...k)
          ) : h === "root" ? () => a.root().toProxy() : h === "nodes" ? a.nodes.map((m) => m.toProxy()) : h === "first" || h === "last" ? a[h].toProxy() : a[h] : a[h];
        },
        set(a, h, m) {
          return a[h] === m || (a[h] = m, (h === "name" || h === "params" || h === "selector") && a.markDirty()), !0;
        }
      };
    }
    index(a) {
      return typeof a == "number" ? a : (a.proxyOf && (a = a.proxyOf), this.proxyOf.nodes.indexOf(a));
    }
    insertAfter(a, h) {
      let m = this.index(a), g = this.normalize(h, this.proxyOf.nodes[m]).reverse();
      m = this.index(a);
      for (let y of g) this.proxyOf.nodes.splice(m + 1, 0, y);
      let k;
      for (let y in this.indexes)
        k = this.indexes[y], m < k && (this.indexes[y] = k + g.length);
      return this.markDirty(), this;
    }
    insertBefore(a, h) {
      let m = this.index(a), g = m === 0 ? "prepend" : !1, k = this.normalize(
        h,
        this.proxyOf.nodes[m],
        g
      ).reverse();
      m = this.index(a);
      for (let _ of k) this.proxyOf.nodes.splice(m, 0, _);
      let y;
      for (let _ in this.indexes)
        y = this.indexes[_], m <= y && (this.indexes[_] = y + k.length);
      return this.markDirty(), this;
    }
    normalize(a, h) {
      if (typeof a == "string")
        a = c(o(a).nodes);
      else if (typeof a > "u")
        a = [];
      else if (Array.isArray(a)) {
        a = a.slice(0);
        for (let g of a)
          g.parent && g.parent.removeChild(g, "ignore");
      } else if (a.type === "root" && this.type !== "document") {
        a = a.nodes.slice(0);
        for (let g of a)
          g.parent && g.parent.removeChild(g, "ignore");
      } else if (a.type)
        a = [a];
      else if (a.prop) {
        if (typeof a.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof a.value != "string" && (a.value = String(a.value)), a = [new t(a)];
      } else if (a.selector || a.selectors)
        a = [new f(a)];
      else if (a.name)
        a = [new s(a)];
      else if (a.text)
        a = [new e(a)];
      else
        throw new Error("Unknown node type in node creation");
      return a.map((g) => (g[i] || u.rebuild(g), g = g.proxyOf, g.parent && g.parent.removeChild(g), g[n] && d(g), g.raws || (g.raws = {}), typeof g.raws.before > "u" && h && typeof h.raws.before < "u" && (g.raws.before = h.raws.before.replace(/\S/g, "")), g.parent = this.proxyOf, g));
    }
    prepend(...a) {
      a = a.reverse();
      for (let h of a) {
        let m = this.normalize(h, this.first, "prepend").reverse();
        for (let g of m) this.proxyOf.nodes.unshift(g);
        for (let g in this.indexes)
          this.indexes[g] = this.indexes[g] + m.length;
      }
      return this.markDirty(), this;
    }
    push(a) {
      return a.parent = this, this.proxyOf.nodes.push(a), this;
    }
    removeAll() {
      for (let a of this.proxyOf.nodes) a.parent = void 0;
      return this.proxyOf.nodes = [], this.markDirty(), this;
    }
    removeChild(a) {
      a = this.index(a), this.proxyOf.nodes[a].parent = void 0, this.proxyOf.nodes.splice(a, 1);
      let h;
      for (let m in this.indexes)
        h = this.indexes[m], h >= a && (this.indexes[m] = h - 1);
      return this.markDirty(), this;
    }
    replaceValues(a, h, m) {
      return m || (m = h, h = {}), this.walkDecls((g) => {
        h.props && !h.props.includes(g.prop) || h.fast && !g.value.includes(h.fast) || (g.value = g.value.replace(a, m));
      }), this.markDirty(), this;
    }
    some(a) {
      return this.nodes.some(a);
    }
    walk(a) {
      if (!this.proxyOf.nodes) return;
      let h = [{ iterator: this.getIterator(), node: this.proxyOf }];
      for (; h.length > 0; ) {
        let { iterator: m, node: g } = h[h.length - 1], k = g.indexes[m];
        if (k >= g.proxyOf.nodes.length) {
          delete g.indexes[m], h.pop();
          let C = h[h.length - 1];
          C && (C.node.indexes[C.iterator] += 1);
          continue;
        }
        let y = g.proxyOf.nodes[k], _;
        try {
          _ = a(y, k);
        } catch (C) {
          throw y.addToError(C);
        }
        if (_ === !1) {
          for (let C of h)
            delete C.node.indexes[C.iterator];
          return !1;
        }
        y.walk && y.proxyOf.nodes ? h.push({ iterator: y.getIterator(), node: y }) : g.indexes[m] += 1;
      }
    }
    walkAtRules(a, h) {
      return h ? a instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "atrule" && a.test(m.name))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "atrule" && m.name === a)
          return h(m, g);
      }) : (h = a, this.walk((m, g) => {
        if (m.type === "atrule")
          return h(m, g);
      }));
    }
    walkComments(a) {
      return this.walk((h, m) => {
        if (h.type === "comment")
          return a(h, m);
      });
    }
    walkDecls(a, h) {
      return h ? a instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "decl" && a.test(m.prop))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "decl" && m.prop === a)
          return h(m, g);
      }) : (h = a, this.walk((m, g) => {
        if (m.type === "decl")
          return h(m, g);
      }));
    }
    walkRules(a, h) {
      return h ? a instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "rule" && a.test(m.selector))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "rule" && m.selector === a)
          return h(m, g);
      }) : (h = a, this.walk((m, g) => {
        if (m.type === "rule")
          return h(m, g);
      }));
    }
  }
  return u.registerParse = (p) => {
    o = p;
  }, u.registerRule = (p) => {
    f = p;
  }, u.registerAtRule = (p) => {
    s = p;
  }, u.registerRoot = (p) => {
    l = p;
  }, sr = u, u.default = u, u.rebuild = (p) => {
    let a = [p];
    for (; a.length > 0; ) {
      let h = a.pop();
      if (h.type === "atrule" ? Object.setPrototypeOf(h, s.prototype) : h.type === "rule" ? Object.setPrototypeOf(h, f.prototype) : h.type === "decl" ? Object.setPrototypeOf(h, t.prototype) : h.type === "comment" ? Object.setPrototypeOf(h, e.prototype) : h.type === "root" && Object.setPrototypeOf(h, l.prototype), h[i] = !0, h.nodes)
        for (let m of h.nodes) a.push(m);
    }
  }, sr;
}
var or, Qn;
function Hr() {
  if (Qn) return or;
  Qn = 1;
  let e = Pe();
  class t extends e {
    constructor(n) {
      super(n), this.type = "atrule";
    }
    append(...n) {
      return this.proxyOf.nodes || (this.nodes = []), super.append(...n);
    }
    prepend(...n) {
      return this.proxyOf.nodes || (this.nodes = []), super.prepend(...n);
    }
  }
  return or = t, t.default = t, e.registerAtRule(t), or;
}
var ar, ei;
function Yr() {
  if (ei) return ar;
  ei = 1;
  let e = Pe(), t, r;
  class n extends e {
    constructor(s) {
      super({ type: "document", ...s }), this.nodes || (this.nodes = []);
    }
    toResult(s = {}) {
      return new t(new r(), this, s).stringify();
    }
  }
  return n.registerLazyResult = (i) => {
    t = i;
  }, n.registerProcessor = (i) => {
    r = i;
  }, ar = n, n.default = n, ar;
}
var lr, ti;
function Au() {
  if (ti) return lr;
  ti = 1;
  let e = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  return lr = { nanoid: (n = 21) => {
    let i = "", s = n | 0;
    for (; s-- > 0; )
      i += e[Math.random() * 64 | 0];
    return i;
  }, customAlphabet: (n, i = 21) => (s = i) => {
    let o = "", l = s | 0;
    for (; l-- > 0; )
      o += n[Math.random() * n.length | 0];
    return o;
  } }, lr;
}
var cr, ri;
function Ws() {
  if (ri) return cr;
  ri = 1;
  let { existsSync: e, readFileSync: t, realpathSync: r } = ke, { dirname: n, isAbsolute: i, join: s, relative: o, sep: l } = ke, { SourceMapConsumer: f, SourceMapGenerator: c } = ke;
  function d(a) {
    try {
      return r(a);
    } catch {
      return a;
    }
  }
  function u(a) {
    return Buffer ? Buffer.from(a, "base64").toString() : window.atob(a);
  }
  class p {
    constructor(h, m) {
      if (m.map === !1) return;
      m.unsafeMap && (this.unsafeMap = !0), this.loadAnnotation(h), this.inline = this.startWith(this.annotation, "data:");
      let g = m.map ? m.map.prev : void 0, k = this.loadMap(m.from, g);
      !this.mapFile && m.from && (this.mapFile = m.from), this.mapFile && (this.root = n(this.mapFile)), k && (this.text = k);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new f(this.json || this.text)), this.consumerCache;
    }
    decodeInline(h) {
      let m = /^data:application\/json;charset=utf-?8;base64,/, g = /^data:application\/json;base64,/, k = /^data:application\/json;charset=utf-?8,/, y = /^data:application\/json,/, _ = h.match(k) || h.match(y);
      if (_)
        return decodeURIComponent(h.substr(_[0].length));
      let C = h.match(m) || h.match(g);
      if (C)
        return u(h.substr(C[0].length));
      let w = h.slice(22);
      throw w = w.slice(0, w.indexOf(",")), new Error("Unsupported source map encoding " + w);
    }
    getAnnotationURL(h) {
      return h.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(h) {
      return typeof h != "object" ? !1 : typeof h.mappings == "string" || typeof h._mappings == "string" || Array.isArray(h.sections);
    }
    loadAnnotation(h) {
      let m = h.match(/\/\*\s*# sourceMappingURL=/g);
      if (!m) return;
      let g = h.lastIndexOf(m.pop()), k = h.indexOf("*/", g);
      g > -1 && k > -1 && (this.annotation = this.getAnnotationURL(h.substring(g, k)));
    }
    loadFile(h, m, g) {
      if (!g && !this.unsafeMap) {
        if (!/\.map$/i.test(h) || !m) return;
        let k = o(d(n(m)), d(h));
        if (k === ".." || k.startsWith(".." + l) || i(k))
          return;
      }
      if (this.root = n(h), e(h))
        return this.mapFile = h, t(h, "utf-8").toString().trim();
    }
    loadMap(h, m) {
      if (m === !1) return !1;
      if (m) {
        if (typeof m == "string")
          return m;
        if (typeof m == "function") {
          let g = m(h);
          if (g) {
            let k = this.loadFile(g, h, !0);
            if (!k)
              throw new Error(
                "Unable to load previous source map: " + g.toString()
              );
            return k;
          }
        } else {
          if (m instanceof f)
            return c.fromSourceMap(m).toString();
          if (m instanceof c)
            return m.toString();
          if (this.isMap(m))
            return JSON.stringify(m);
          throw new Error(
            "Unsupported previous source map format: " + m.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let g = this.annotation;
          h && (g = s(n(h), g));
          let k = this.loadFile(g, h, !1);
          if (k)
            try {
              this.json = JSON.parse(k.replace(/^\)]}'[^\n]*\n/, ""));
            } catch {
              return;
            }
          return k;
        }
      }
    }
    startWith(h, m) {
      return h ? h.substr(0, m.length) === m : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return cr = p, p.default = p, cr;
}
var ur, ni;
function Mt() {
  if (ni) return ur;
  ni = 1;
  let { nanoid: e } = /* @__PURE__ */ Au(), { isAbsolute: t, resolve: r } = ke, { SourceMapConsumer: n, SourceMapGenerator: i } = ke, { fileURLToPath: s, pathToFileURL: o } = ke, l = Vr(), f = Ws(), c = ke, d = /* @__PURE__ */ Symbol("lineToIndexCache"), u = !!(n && i), p = !!(r && t);
  function a(m) {
    if (m[d]) return m[d];
    let g = m.css.split(`
`), k = new Array(g.length), y = 0;
    for (let _ = 0, C = g.length; _ < C; _++)
      k[_] = y, y += g[_].length + 1;
    return m[d] = k, k;
  }
  class h {
    get from() {
      return this.file || this.id;
    }
    constructor(g, k = {}) {
      if (g === null || typeof g > "u" || typeof g == "object" && !g.toString)
        throw new Error(`PostCSS received ${g} instead of CSS string`);
      if (this.css = g.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, this.document = this.css, k.document && (this.document = k.document.toString()), k.from && (!p || /^\w+:\/\//.test(k.from) || t(k.from) ? this.file = k.from : this.file = r(k.from)), p && u) {
        let y = new f(this.css, k);
        if (y.text) {
          this.map = y;
          let _ = y.consumer().file;
          !this.file && _ && (this.file = this.mapResolve(_));
        }
      }
      this.file || (this.id = "<input css " + e(6) + ">"), this.map && (this.map.file = this.from);
    }
    error(g, k, y, _ = {}) {
      let C, w, b, v, x;
      if (k && typeof k == "object") {
        let I = k, F = y;
        if (typeof I.offset == "number") {
          v = I.offset;
          let S = this.fromOffset(v);
          k = S.line, y = S.col;
        } else
          k = I.line, y = I.column, v = this.fromLineAndColumn(k, y);
        if (typeof F.offset == "number") {
          b = F.offset;
          let S = this.fromOffset(b);
          w = S.line, C = S.col;
        } else
          w = F.line, C = F.column, b = this.fromLineAndColumn(F.line, F.column);
      } else if (y)
        v = this.fromLineAndColumn(k, y);
      else {
        v = k;
        let I = this.fromOffset(v);
        k = I.line, y = I.col;
      }
      let R = this.origin(k, y, w, C);
      return R ? x = new l(
        g,
        R.endLine === void 0 ? R.line : { column: R.column, line: R.line },
        R.endLine === void 0 ? R.column : { column: R.endColumn, line: R.endLine },
        R.source,
        R.file,
        _.plugin
      ) : x = new l(
        g,
        w === void 0 ? k : { column: y, line: k },
        w === void 0 ? y : { column: C, line: w },
        this.css,
        this.file,
        _.plugin
      ), x.input = {
        column: y,
        endColumn: C,
        endLine: w,
        endOffset: b,
        line: k,
        offset: v,
        source: this.css
      }, this.file && (o && (x.input.url = o(this.file).toString()), x.input.file = this.file), x;
    }
    fromLineAndColumn(g, k) {
      return a(this)[g - 1] + k - 1;
    }
    fromOffset(g) {
      let k = a(this), y = k[k.length - 1], _ = 0;
      if (g >= y)
        _ = k.length - 1;
      else {
        let C = k.length - 2, w;
        for (; _ < C; )
          if (w = _ + (C - _ >> 1), g < k[w])
            C = w - 1;
          else if (g >= k[w + 1])
            _ = w + 1;
          else {
            _ = w;
            break;
          }
      }
      return {
        col: g - k[_] + 1,
        line: _ + 1
      };
    }
    mapResolve(g) {
      return /^\w+:\/\//.test(g) ? g : r(this.map.consumer().sourceRoot || this.map.root || ".", g);
    }
    origin(g, k, y, _) {
      if (!this.map) return !1;
      let C = this.map.consumer(), w = C.originalPositionFor({ column: k - 1, line: g });
      if (!w.source) return !1;
      let b;
      if (typeof y == "number") {
        let I = C.originalPositionFor({
          column: _ - 1,
          line: y
        });
        I.source && (b = I);
      }
      let v;
      t(w.source) ? v = o(w.source) : v = new URL(
        w.source,
        o(this.map.mapFile || r(".") + "/")
      );
      let x = {
        column: w.column + 1,
        endColumn: b && b.column + 1,
        endLine: b && b.line,
        line: w.line,
        url: v.toString()
      };
      if (v.protocol === "file:")
        if (s)
          x.file = s(v);
        else
          throw new Error("file: protocol is not available in this PostCSS build");
      let R = C.sourceContentFor(w.source);
      return R && (x.source = R), x;
    }
    toJSON() {
      let g = {};
      for (let k of ["hasBOM", "css", "file", "id"])
        this[k] != null && (g[k] = this[k]);
      return this.map && (g.map = { ...this.map }, g.map.consumerCache && (g.map.consumerCache = void 0)), g;
    }
  }
  return ur = h, h.default = h, c && c.registerInput && c.registerInput(h), ur;
}
var hr, ii;
function ht() {
  if (ii) return hr;
  ii = 1;
  let e = Pe(), t, r;
  class n extends e {
    constructor(s) {
      super(s), this.type = "root", this.nodes || (this.nodes = []);
    }
    normalize(s, o, l) {
      let f = /* @__PURE__ */ new Set();
      for (let d of Array.isArray(s) ? s : [s])
        d && typeof d == "object" && !d.parent && d.raws && typeof d.raws.before < "u" && f.add(d.raws);
      let c = super.normalize(s);
      if (o) {
        if (l === "prepend")
          this.nodes.length > 1 ? o.raws.before = this.nodes[1].raws.before : delete o.raws.before;
        else if (this.first !== o)
          for (let d of c)
            f.has(d.raws) || (d.raws.before = o.raws.before);
      }
      return c;
    }
    removeChild(s, o) {
      let l = this.index(s);
      return !o && l === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[l].raws.before), super.removeChild(s);
    }
    toResult(s = {}) {
      return new t(new r(), this, s).stringify();
    }
  }
  return n.registerLazyResult = (i) => {
    t = i;
  }, n.registerProcessor = (i) => {
    r = i;
  }, hr = n, n.default = n, e.registerRoot(n), hr;
}
var fr, si;
function Vs() {
  if (si) return fr;
  si = 1;
  let e = {
    comma(t) {
      return e.split(t, [","], !0);
    },
    space(t) {
      let r = [" ", `
`, "	"];
      return e.split(t, r);
    },
    split(t, r, n) {
      if (typeof t != "string") return [];
      let i = [], s = "", o = !1, l = 0, f = !1, c = "", d = !1, u = !1;
      for (let a = 0; a < t.length; a++) {
        let h = t[a];
        if (u) {
          s += h, h === "*" && t[a + 1] === "/" && (s += "/", a += 1, u = !1);
          continue;
        }
        if (d)
          d = !1;
        else if (h === "\\")
          d = !0;
        else if (f)
          h === c && (f = !1);
        else if (h === '"' || h === "'")
          f = !0, c = h;
        else if (h === "/" && t[a + 1] === "*") {
          s += "/*", a += 1, u = !0;
          continue;
        } else h === "(" ? l += 1 : h === ")" ? l > 0 && (l -= 1) : l === 0 && r.includes(h) && (o = !0);
        if (o) {
          let m = s.trim();
          (n || m !== "") && i.push(m), s = "", o = !1;
        } else
          s += h;
      }
      let p = s.trim();
      return (n || p !== "") && i.push(p), i;
    }
  };
  return fr = e, e.default = e, fr;
}
var pr, oi;
function Gr() {
  if (oi) return pr;
  oi = 1;
  let e = Pe(), t = Vs();
  class r extends e {
    get selectors() {
      return t.comma(this.selector);
    }
    set selectors(i) {
      let s = this.selector ? this.selector.match(/,\s*/) : null, o = s ? s[0] : "," + this.raw("between", "beforeOpen");
      this.selector = i.join(o);
    }
    constructor(i) {
      super(i), this.type = "rule", this.nodes || (this.nodes = []);
    }
  }
  return pr = r, r.default = r, e.registerRule(r), pr;
}
var dr, ai;
function Eu() {
  if (ai) return dr;
  ai = 1;
  let e = Hr(), t = Ot(), r = Bt(), n = Mt(), i = Ws(), s = ht(), o = Gr();
  function l(d, u) {
    return d.inputs ? d.inputs.map((p) => {
      let a = { ...p, __proto__: n.prototype };
      return a.map && (a.map = {
        ...a.map,
        __proto__: i.prototype
      }), a;
    }) : u;
  }
  function f(d, u, p) {
    let a = { ...d };
    if (delete a.inputs, delete a.nodes, a.source) {
      let { inputId: m, ...g } = a.source;
      a.source = g, m != null && (a.source.input = u[m]);
    }
    let h;
    if (a.type === "root")
      h = new s(a);
    else if (a.type === "decl")
      h = new r(a);
    else if (a.type === "rule")
      h = new o(a);
    else if (a.type === "comment")
      h = new t(a);
    else if (a.type === "atrule")
      h = new e(a);
    else
      throw new Error("Unknown node type: " + d.type);
    if (p) {
      h.nodes = p;
      for (let m of p) m.parent = h;
    }
    return h;
  }
  function c(d, u) {
    if (Array.isArray(d)) return d.map((h) => c(h));
    let p, a = [
      { childIndex: 0, children: [], inputs: l(d, u), json: d }
    ];
    for (; a.length > 0; ) {
      let h = a[a.length - 1], m = h.json.nodes;
      if (m && h.childIndex < m.length) {
        let k = m[h.childIndex];
        h.childIndex += 1, a.push({
          childIndex: 0,
          children: [],
          inputs: l(k, h.inputs),
          json: k
        });
        continue;
      }
      a.pop();
      let g = f(
        h.json,
        h.inputs,
        m ? h.children : void 0
      );
      a.length > 0 ? a[a.length - 1].children.push(g) : p = g;
    }
    return p;
  }
  return dr = c, c.default = c, dr;
}
var mr, li;
function Hs() {
  if (li) return mr;
  li = 1;
  let { dirname: e, relative: t, resolve: r, sep: n } = ke, { SourceMapConsumer: i, SourceMapGenerator: s } = ke, { pathToFileURL: o } = ke, l = Mt(), f = !!(i && s), c = !!(e && r && t && n);
  class d {
    constructor(p, a, h, m) {
      this.stringify = p, this.mapOpts = h.map || {}, this.root = a, this.opts = h, this.css = m, this.originalCSS = m, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let p;
      this.isInline() ? p = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? p = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? p = this.mapOpts.annotation(this.opts.to, this.root) : p = this.outputFile() + ".map";
      let a = `
`;
      this.css.includes(`\r
`) && (a = `\r
`), this.css += a + "/*# sourceMappingURL=" + p + " */";
    }
    applyPrevMaps() {
      for (let p of this.previous()) {
        let a = this.toUrl(this.path(p.file)), h = p.root || e(p.file), m;
        this.mapOpts.sourcesContent === !1 ? (m = new i(p.text), m.sourcesContent && (m.sourcesContent = null)) : m = p.consumer(), this.map.applySourceMap(m, a, this.toUrl(this.path(h)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1) {
        if (this.root) {
          let p;
          for (let a = this.root.nodes.length - 1; a >= 0; a--)
            p = this.root.nodes[a], p.type === "comment" && p.text.startsWith("# sourceMappingURL=") && this.root.removeChild(a);
        } else if (this.css) {
          let p = "/*# sourceMappingURL=", a = "", h = 0, m;
          for (; (m = this.css.indexOf(p, h)) !== -1; ) {
            let g = this.css.indexOf("*/", m + p.length);
            if (g === -1) break;
            if (g + 2 === this.css.length || /[\t\n\f\r ]/.test(this.css[g + 2]))
              for (; m > h && (this.css[m - 1] === `
` || this.css[m - 1] === "\r"); )
                m--;
            a += this.css.slice(h, m), h = g + 2;
          }
          h > 0 && (this.css = a + this.css.slice(h));
        }
      }
    }
    generate() {
      if (this.clearAnnotation(), c && f && this.isMap())
        return this.generateMap();
      {
        let p = "";
        return this.stringify(this.root, (a) => {
          p += a;
        }), [p];
      }
    }
    generateMap() {
      if (this.root)
        this.generateString();
      else if (this.previous().length === 1) {
        let p = this.previous()[0].consumer();
        p.file = this.outputFile(), this.map = s.fromSourceMap(p, {
          ignoreInvalidMapping: !0
        });
      } else
        this.map = new s({
          file: this.outputFile(),
          ignoreInvalidMapping: !0
        }), this.map.addMapping({
          generated: { column: 0, line: 1 },
          original: { column: 0, line: 1 },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
    }
    generateString() {
      this.css = "", this.map = new s({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      });
      let p = 1, a = 1, h = "<no source>", m = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ""
      }, g, k;
      this.stringify(this.root, (y, _, C) => {
        if (this.css += y, _ && C !== "end" && (m.generated.line = p, m.generated.column = a - 1, _.source && _.source.start ? (m.source = this.sourcePath(_), m.original.line = _.source.start.line, m.original.column = _.source.start.column - 1, this.map.addMapping(m)) : (m.source = h, m.original.line = 1, m.original.column = 0, this.map.addMapping(m))), k = y.match(/\n/g), k ? (p += k.length, g = y.lastIndexOf(`
`), a = y.length - g) : a += y.length, _ && C !== "start") {
          let w = _.parent || { raws: {} };
          (!(_.type === "decl" || _.type === "atrule" && !_.nodes) || _ !== w.last || w.raws.semicolon) && (_.source && _.source.end ? (m.source = this.sourcePath(_), m.original.line = _.source.end.line, m.original.column = _.source.end.column - 1, m.generated.line = p, m.generated.column = a - 2, this.map.addMapping(m)) : (m.source = h, m.original.line = 1, m.original.column = 0, m.generated.line = p, m.generated.column = a - 1, this.map.addMapping(m)));
        }
      });
    }
    isAnnotation() {
      return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((p) => p.annotation) : !0;
    }
    isInline() {
      if (typeof this.mapOpts.inline < "u")
        return this.mapOpts.inline;
      let p = this.mapOpts.annotation;
      return typeof p < "u" && p !== !0 ? !1 : this.previous().length ? this.previous().some((a) => a.inline) : !0;
    }
    isMap() {
      return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
    }
    isSourcesContent() {
      return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((p) => p.withContent()) : !0;
    }
    outputFile() {
      return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
    }
    path(p) {
      if (this.mapOpts.absolute || p.charCodeAt(0) === 60 || /^\w+:\/\//.test(p)) return p;
      let a = this.memoizedPaths.get(p);
      if (a) return a;
      let h = this.opts.to ? e(this.opts.to) : ".";
      typeof this.mapOpts.annotation == "string" && (h = e(r(h, this.mapOpts.annotation)));
      let m = t(h, p);
      return this.memoizedPaths.set(p, m), m;
    }
    previous() {
      if (!this.previousMaps)
        if (this.previousMaps = [], this.root)
          this.root.walk((p) => {
            if (p.source && p.source.input.map) {
              let a = p.source.input.map;
              this.previousMaps.includes(a) || this.previousMaps.push(a);
            }
          });
        else {
          let p = new l(this.originalCSS, this.opts);
          p.map && this.previousMaps.push(p.map);
        }
      return this.previousMaps;
    }
    setSourcesContent() {
      let p = {};
      if (this.root)
        this.root.walk((a) => {
          if (a.source) {
            let h = a.source.input.from;
            if (h && !p[h]) {
              p[h] = !0;
              let m = this.usesFileUrls ? this.toFileUrl(h) : this.toUrl(this.path(h));
              this.map.setSourceContent(m, a.source.input.css);
            }
          }
        });
      else if (this.css) {
        let a = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(a, this.css);
      }
    }
    sourcePath(p) {
      return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(p.source.input.from) : this.toUrl(this.path(p.source.input.from));
    }
    toBase64(p) {
      return Buffer ? Buffer.from(p).toString("base64") : window.btoa(unescape(encodeURIComponent(p)));
    }
    toFileUrl(p) {
      let a = this.memoizedFileURLs.get(p);
      if (a) return a;
      if (o) {
        let h = o(p).toString();
        return this.memoizedFileURLs.set(p, h), h;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(p) {
      let a = this.memoizedURLs.get(p);
      if (a) return a;
      n === "\\" && (p = p.replace(/\\/g, "/"));
      let h = encodeURI(p).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(p, h), h;
    }
  }
  return mr = d, mr;
}
var gr, ci;
function Su() {
  if (ci) return gr;
  ci = 1;
  const e = 39, t = 34, r = 92, n = 47, i = 10, s = 32, o = 12, l = 9, f = 13, c = 91, d = 93, u = 40, p = 41, a = 123, h = 125, m = 59, g = 42, k = 58, y = 64, _ = /[\t\n\f\r "#'()/;[\\\]{}]/g, C = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, w = /.[\r\n"'(/\\]/, b = /[\da-f]/i, v = /(^|[\t\n\f\r "'(),/:;[\]{}])url$/i, x = /[\t\n\f\r ]*["']/y;
  return gr = function(I, F = {}) {
    let S = I.css.valueOf(), Y = F.ignoreErrors, P, M, B, D, O, j, U, V, X = S.length, q = 0, ie = [], K = -1;
    function re() {
      return q;
    }
    function he(le) {
      throw I.error("Unclosed " + le, q);
    }
    function me() {
      return ie.length === 0 && q >= X;
    }
    function fe(le) {
      if (ie.length) return ie.pop();
      if (q >= X) return;
      let pe = le ? le.ignoreUnclosed : !1;
      switch (P = S.charCodeAt(q), P) {
        case i:
        case s:
        case l:
        case f:
        case o: {
          D = q;
          do
            D += 1, P = S.charCodeAt(D);
          while (P === s || P === i || P === l || P === f || P === o);
          j = ["space", S.slice(q, D)], q = D - 1;
          break;
        }
        case c:
        case d:
        case a:
        case h:
        case k:
        case m:
        case p: {
          let be = String.fromCharCode(P);
          j = [be, be, q];
          break;
        }
        case u: {
          if (x.lastIndex = q + 1, v.test(S.substring(q - 4, q)) && !x.test(S)) {
            D = q;
            do {
              if (U = !1, D = S.indexOf(")", D + 1), D === -1)
                if (Y || pe) {
                  D = q;
                  break;
                } else
                  he("bracket");
              for (V = D; S.charCodeAt(V - 1) === r; )
                V -= 1, U = !U;
            } while (U);
            j = ["brackets", S.slice(q, D + 1), q, D], q = D;
          } else q <= K ? j = ["(", "(", q] : (D = S.indexOf(")", q + 1), M = S.slice(q, D + 1), D === -1 || w.test(M) ? (K = D === -1 ? X : D, j = ["(", "(", q]) : (j = ["brackets", M, q, D], q = D));
          break;
        }
        case e:
        case t: {
          O = P === e ? "'" : '"', D = q;
          do {
            if (U = !1, D = S.indexOf(O, D + 1), D === -1)
              if (Y || pe) {
                D = q + 1;
                break;
              } else
                he("string");
            for (V = D; S.charCodeAt(V - 1) === r; )
              V -= 1, U = !U;
          } while (U);
          j = ["string", S.slice(q, D + 1), q, D], q = D;
          break;
        }
        case y: {
          _.lastIndex = q + 1, _.test(S), _.lastIndex === 0 ? D = S.length - 1 : D = _.lastIndex - 2, j = ["at-word", S.slice(q, D + 1), q, D], q = D;
          break;
        }
        case r: {
          for (D = q, B = !0; S.charCodeAt(D + 1) === r; )
            D += 1, B = !B;
          if (P = S.charCodeAt(D + 1), B && P !== n && P !== s && P !== i && P !== l && P !== f && P !== o && (D += 1, b.test(S.charAt(D)))) {
            for (; b.test(S.charAt(D + 1)); )
              D += 1;
            S.charCodeAt(D + 1) === s && (D += 1);
          }
          j = ["word", S.slice(q, D + 1), q, D], q = D;
          break;
        }
        default: {
          P === n && S.charCodeAt(q + 1) === g ? (D = S.indexOf("*/", q + 2) + 1, D === 0 && (Y || pe ? D = S.length : he("comment")), j = ["comment", S.slice(q, D + 1), q, D], q = D) : (C.lastIndex = q + 1, C.test(S), C.lastIndex === 0 ? D = S.length - 1 : D = C.lastIndex - 2, j = ["word", S.slice(q, D + 1), q, D], q = D);
          break;
        }
      }
      return q++, j;
    }
    function ae(le) {
      ie.push(le);
    }
    return {
      back: ae,
      endOfFile: me,
      nextToken: fe,
      position: re
    };
  }, gr;
}
var br, ui;
function Du() {
  if (ui) return br;
  ui = 1;
  let e = Hr(), t = Ot(), r = Bt(), n = ht(), i = Gr(), s = Su();
  const o = {
    empty: !0,
    space: !0
  };
  function l(d) {
    for (let u = d.length - 1; u >= 0; u--) {
      let p = d[u], a = p[3] || p[2];
      if (a) return a;
    }
  }
  function f(d, u, p) {
    let a = "";
    for (let h = u; h < p; h++) a += d[h][1];
    return a;
  }
  class c {
    constructor(u) {
      this.input = u, this.root = new n(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: u, start: { column: 1, line: 1, offset: 0 } };
    }
    atrule(u) {
      let p = new e();
      p.name = u[1].slice(1), p.name === "" && this.unnamedAtrule(p, u), this.init(p, u[2]);
      let a, h, m, g = !1, k = !1, y = [], _ = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (u = this.tokenizer.nextToken(), a = u[0], a === "(" || a === "[" ? _.push(a === "(" ? ")" : "]") : a === "{" && _.length > 0 ? _.push("}") : a === _[_.length - 1] && _.pop(), _.length === 0)
          if (a === ";") {
            p.source.end = this.getPosition(u[2]), p.source.end.offset++, this.semicolon = !0;
            break;
          } else if (a === "{") {
            k = !0;
            break;
          } else if (a === "}") {
            if (y.length > 0) {
              for (m = y.length - 1, h = y[m]; h && h[0] === "space"; )
                h = y[--m];
              h && (p.source.end = this.getPosition(h[3] || h[2]), p.source.end.offset++);
            }
            this.end(u);
            break;
          } else
            y.push(u);
        else
          y.push(u);
        if (this.tokenizer.endOfFile()) {
          g = !0;
          break;
        }
      }
      p.raws.between = this.spacesAndCommentsFromEnd(y), y.length ? (p.raws.afterName = this.spacesAndCommentsFromStart(y), this.raw(p, "params", y), g && (u = y[y.length - 1], p.source.end = this.getPosition(u[3] || u[2]), p.source.end.offset++, this.spaces = p.raws.between, p.raws.between = "")) : (p.raws.afterName = "", p.params = ""), k && (p.nodes = [], this.current = p);
    }
    checkMissedSemicolon(u) {
      let p = this.colon(u);
      if (p === !1) return;
      let a = 0, h;
      for (let m = p - 1; m >= 0 && (h = u[m], !(h[0] !== "space" && (a += 1, a === 2))); m--)
        ;
      throw this.input.error(
        "Missed semicolon",
        h[0] === "word" ? h[3] + 1 : h[2]
      );
    }
    colon(u) {
      let p = 0, a, h, m;
      for (let [g, k] of u.entries()) {
        if (h = k, m = h[0], m === "(" && (p += 1), m === ")" && (p -= 1), p === 0 && m === ":")
          if (!a)
            this.doubleColon(h);
          else {
            if (a[0] === "word" && a[1] === "progid")
              continue;
            return g;
          }
        a = h;
      }
      return !1;
    }
    comment(u) {
      let p = new t();
      this.init(p, u[2]), p.source.end = this.getPosition(u[3] || u[2]), p.source.end.offset++;
      let a = u[1].slice(2, -2);
      if (!a.trim())
        p.text = "", p.raws.left = a, p.raws.right = "";
      else {
        let h = a.match(/^(\s*)([^]*\S)(\s*)$/);
        p.text = h[2], p.raws.left = h[1], p.raws.right = h[3];
      }
    }
    createTokenizer() {
      this.tokenizer = s(this.input);
    }
    decl(u, p) {
      let a = new r();
      this.init(a, u[0][2]);
      let h = u[u.length - 1];
      h[0] === ";" && (this.semicolon = !0, u.pop()), a.source.end = this.getPosition(
        h[3] || h[2] || l(u)
      ), a.source.end.offset++;
      let m = 0;
      for (; u[m][0] !== "word"; )
        m === u.length - 1 && this.unknownWord([u[m]]), m++;
      a.raws.before += f(u, 0, m), a.source.start = this.getPosition(u[m][2]);
      let g = m;
      for (; m < u.length; ) {
        let b = u[m][0];
        if (b === ":" || b === "space" || b === "comment")
          break;
        m++;
      }
      a.prop = f(u, g, m);
      let k = m, y;
      for (; m < u.length && (y = u[m], m++, y[0] !== ":"); )
        y[0] === "word" && /\w/.test(y[1]) && this.unknownWord([y]);
      a.raws.between = f(u, k, m), (a.prop[0] === "_" || a.prop[0] === "*") && (a.raws.before += a.prop[0], a.prop = a.prop.slice(1));
      let _ = m;
      for (; m < u.length; ) {
        let b = u[m][0];
        if (b !== "space" && b !== "comment") break;
        m++;
      }
      let C = u.slice(_, m);
      u = u.slice(m), this.precheckMissedSemicolon(u);
      for (let b = u.length - 1; b >= 0; b--) {
        if (y = u[b], y[1].toLowerCase() === "!important") {
          a.important = !0;
          let v = this.stringFrom(u, b);
          v = this.spacesFromEnd(u) + v, v !== " !important" && (a.raws.important = v);
          break;
        } else if (y[1].toLowerCase() === "important") {
          let v = u.slice(0), x = "";
          for (let R = b; R > 0; R--) {
            let I = v[R][0];
            if (x.trim().startsWith("!") && I !== "space")
              break;
            x = v.pop()[1] + x;
          }
          x.trim().startsWith("!") && (a.important = !0, a.raws.important = x, u = v);
        }
        if (y[0] !== "space" && y[0] !== "comment")
          break;
      }
      u.some((b) => b[0] !== "space" && b[0] !== "comment") && (a.raws.between += C.map((b) => b[1]).join(""), C = []), this.raw(a, "value", C.concat(u), p), a.value.includes(":") && !p && this.checkMissedSemicolon(u);
    }
    doubleColon(u) {
      throw this.input.error(
        "Double colon",
        { offset: u[2] },
        { offset: u[2] + u[1].length }
      );
    }
    emptyRule(u) {
      let p = new i();
      this.init(p, u[2]), p.selector = "", p.raws.between = "", this.current = p;
    }
    end(u) {
      this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(u[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(u);
    }
    endFile() {
      this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
    }
    freeSemicolon(u) {
      if (this.spaces += u[1], this.current.nodes) {
        let p = this.current.nodes[this.current.nodes.length - 1];
        p && p.type === "rule" && !p.raws.ownSemicolon && (p.raws.ownSemicolon = this.spaces, this.spaces = "", p.source.end = this.getPosition(u[2]), p.source.end.offset++);
      }
    }
    // Helpers
    getPosition(u) {
      let p = this.input.fromOffset(u);
      return {
        column: p.col,
        line: p.line,
        offset: u
      };
    }
    init(u, p) {
      this.current.push(u), u.source = {
        input: this.input,
        start: this.getPosition(p)
      }, u.raws.before = this.spaces, this.spaces = "", u.type !== "comment" && (this.semicolon = !1);
    }
    other(u) {
      let p = !1, a = null, h = !1, m = null, g = [], k = u[1].startsWith("--"), y = [], _ = u;
      for (; _; ) {
        if (a = _[0], y.push(_), a === "(" || a === "[")
          m || (m = _), g.push(a === "(" ? ")" : "]");
        else if (k && h && a === "{")
          m || (m = _), g.push("}");
        else if (g.length === 0)
          if (a === ";")
            if (h) {
              this.decl(y, k);
              return;
            } else
              break;
          else if (a === "{") {
            this.rule(y);
            return;
          } else if (a === "}") {
            this.tokenizer.back(y.pop()), p = !0;
            break;
          } else a === ":" && (h = !0);
        else a === g[g.length - 1] && (g.pop(), g.length === 0 && (m = null));
        _ = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile() && (p = !0), g.length > 0 && this.unclosedBracket(m), p && h) {
        if (!k)
          for (; y.length && (_ = y[y.length - 1][0], !(_ !== "space" && _ !== "comment")); )
            this.tokenizer.back(y.pop());
        this.decl(y, k);
      } else
        this.unknownWord(y);
    }
    parse() {
      let u;
      for (; !this.tokenizer.endOfFile(); )
        switch (u = this.tokenizer.nextToken(), u[0]) {
          case "space":
            this.spaces += u[1];
            break;
          case ";":
            this.freeSemicolon(u);
            break;
          case "}":
            this.end(u);
            break;
          case "comment":
            this.comment(u);
            break;
          case "at-word":
            this.atrule(u);
            break;
          case "{":
            this.emptyRule(u);
            break;
          default:
            this.other(u);
            break;
        }
      this.endFile();
    }
    precheckMissedSemicolon() {
    }
    raw(u, p, a, h) {
      let m, g, k = a.length, y = "", _ = "", C = !0, w, b;
      for (let v = 0; v < k; v += 1)
        m = a[v], g = m[0], g === "space" && v === k - 1 && !h ? C = !1 : g === "comment" ? (b = a[v - 1] ? a[v - 1][0] : "empty", w = a[v + 1] ? a[v + 1][0] : "empty", !o[b] && !o[w] ? _ === "," ? C = !1 : (y += m[1], _ = m[1].slice(-1)) : C = !1) : (y += m[1], _ = m[1].slice(-1));
      if (!C) {
        let v = a.reduce((x, R) => x + R[1], "");
        u.raws[p] = { raw: v, value: y };
      }
      u[p] = y;
    }
    rule(u) {
      u.pop();
      let p = new i();
      this.init(p, u[0][2]), p.raws.between = this.spacesAndCommentsFromEnd(u), this.raw(p, "selector", u), this.current = p;
    }
    spacesAndCommentsFromEnd(u) {
      let p, a = "";
      for (; u.length && (p = u[u.length - 1][0], !(p !== "space" && p !== "comment")); )
        a = u.pop()[1] + a;
      return a;
    }
    // Errors
    spacesAndCommentsFromStart(u) {
      let p, a = "";
      for (; u.length && (p = u[0][0], !(p !== "space" && p !== "comment")); )
        a += u.shift()[1];
      return a;
    }
    spacesFromEnd(u) {
      let p, a = "";
      for (; u.length && (p = u[u.length - 1][0], p === "space"); )
        a = u.pop()[1] + a;
      return a;
    }
    stringFrom(u, p) {
      let a = "";
      for (let h = p; h < u.length; h++)
        a += u[h][1];
      return u.splice(p, u.length - p), a;
    }
    unclosedBlock() {
      let u = this.current.source.start;
      throw this.input.error("Unclosed block", u.line, u.column);
    }
    unclosedBracket(u) {
      throw this.input.error(
        "Unclosed bracket",
        { offset: u[2] },
        { offset: u[2] + 1 }
      );
    }
    unexpectedClose(u) {
      throw this.input.error(
        "Unexpected }",
        { offset: u[2] },
        { offset: u[2] + 1 }
      );
    }
    unknownWord(u) {
      throw this.input.error(
        "Unknown word " + u[0][1],
        { offset: u[0][2] },
        { offset: u[0][2] + u[0][1].length }
      );
    }
    unnamedAtrule(u, p) {
      throw this.input.error(
        "At-rule without name",
        { offset: p[2] },
        { offset: p[2] + p[1].length }
      );
    }
  }
  return br = c, br;
}
var xr, hi;
function Zr() {
  if (hi) return xr;
  hi = 1;
  let e = Pe(), t = Mt(), r = Du();
  function n(i, s) {
    let o = new t(i, s), l = new r(o);
    try {
      l.parse();
    } catch (f) {
      throw process.env.NODE_ENV !== "production" && f.name === "CssSyntaxError" && s && s.from && (/\.scss$/i.test(s.from) ? f.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(s.from) ? f.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(s.from) && (f.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), f;
    }
    return l.root;
  }
  return xr = n, n.default = n, e.registerParse(n), xr;
}
var wr, fi;
function Ys() {
  if (fi) return wr;
  fi = 1;
  let e = Pe(), { my: t } = Ft();
  class r {
    constructor(i, s = {}) {
      if (this.type = "warning", this.text = i, s.node && s.node.source) {
        s.node[t] || e.rebuild(s.node);
        let o = s.node.rangeBy(s);
        this.line = o.start.line, this.column = o.start.column, this.endLine = o.end.line, this.endColumn = o.end.column;
      }
      for (let o in s) this[o] = s[o];
    }
    toString() {
      return this.node ? this.node.error(this.text, {
        index: this.index,
        plugin: this.plugin,
        start: this.start,
        word: this.word
      }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
    }
  }
  return wr = r, r.default = r, wr;
}
var vr, pi;
function Xr() {
  if (pi) return vr;
  pi = 1;
  let e = Ys();
  class t {
    get content() {
      return this.css;
    }
    constructor(n, i, s) {
      this.processor = n, this.messages = [], this.root = i, this.opts = s, this.css = "", this.map = void 0;
    }
    toString() {
      return this.css;
    }
    warn(n, i = {}) {
      i.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (i.plugin = this.lastPlugin.postcssPlugin);
      let s = new e(n, i);
      return this.messages.push(s), s;
    }
    warnings() {
      return this.messages.filter((n) => n.type === "warning");
    }
  }
  return vr = t, t.default = t, vr;
}
var yr, di;
function Gs() {
  if (di) return yr;
  di = 1;
  let e = {};
  return yr = function(r) {
    e[r] || (e[r] = !0, typeof console < "u" && console.warn && console.warn(r));
  }, yr;
}
var _r, mi;
function Zs() {
  if (mi) return _r;
  mi = 1;
  let e = Pe(), t = Yr(), r = Hs(), n = Zr(), i = Xr(), s = ht(), o = Tt(), { isClean: l, my: f } = Ft(), c = Gs();
  const d = {
    atrule: "AtRule",
    comment: "Comment",
    decl: "Declaration",
    document: "Document",
    root: "Root",
    rule: "Rule"
  }, u = {
    AtRule: !0,
    AtRuleExit: !0,
    Comment: !0,
    CommentExit: !0,
    Declaration: !0,
    DeclarationExit: !0,
    Document: !0,
    DocumentExit: !0,
    Once: !0,
    OnceExit: !0,
    postcssPlugin: !0,
    prepare: !0,
    Root: !0,
    RootExit: !0,
    Rule: !0,
    RuleExit: !0
  }, p = {
    Once: !0,
    postcssPlugin: !0,
    prepare: !0
  }, a = 0;
  function h(C) {
    return typeof C == "object" && typeof C.then == "function";
  }
  function m(C) {
    let w = !1, b = d[C.type];
    return C.type === "decl" ? w = C.prop.toLowerCase() : C.type === "atrule" && (w = C.name.toLowerCase()), w && C.append ? [
      b,
      b + "-" + w,
      a,
      b + "Exit",
      b + "Exit-" + w
    ] : w ? [b, b + "-" + w, b + "Exit", b + "Exit-" + w] : C.append ? [b, a, b + "Exit"] : [b, b + "Exit"];
  }
  function g(C) {
    let w;
    return C.type === "document" ? w = ["Document", a, "DocumentExit"] : C.type === "root" ? w = ["Root", a, "RootExit"] : w = m(C), {
      eventIndex: 0,
      events: w,
      iterator: 0,
      node: C,
      visitorIndex: 0,
      visitors: []
    };
  }
  function k(C) {
    let w = [C];
    for (; w.length > 0; ) {
      let b = w.pop();
      if (b[l] = !1, b.nodes)
        for (let v of b.nodes) w.push(v);
    }
    return C;
  }
  let y = {};
  class _ {
    get content() {
      return this.stringify().content;
    }
    get css() {
      return this.stringify().css;
    }
    get map() {
      return this.stringify().map;
    }
    get messages() {
      return this.sync().messages;
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      return this.sync().root;
    }
    get [Symbol.toStringTag]() {
      return "LazyResult";
    }
    constructor(w, b, v) {
      this.stringified = !1, this.processed = !1;
      let x;
      if (typeof b == "object" && b !== null && (b.type === "root" || b.type === "document"))
        x = k(b);
      else if (b instanceof _ || b instanceof i)
        x = k(b.root), b.map && (typeof v.map > "u" && (v.map = {}), v.map.inline || (v.map.inline = !1), v.map.prev = b.map);
      else {
        let R = n;
        v.syntax && (R = v.syntax.parse), v.parser && (R = v.parser), R.parse && (R = R.parse);
        try {
          x = R(b, v);
        } catch (I) {
          this.processed = !0, this.error = I;
        }
        x && !x[f] && e.rebuild(x);
      }
      this.result = new i(w, x, v), this.helpers = { ...y, postcss: y, result: this.result }, this.plugins = this.processor.plugins.map((R) => typeof R == "object" && R.prepare ? { ...R, ...R.prepare(this.result) } : R);
    }
    async() {
      return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
    }
    catch(w) {
      return this.async().catch(w);
    }
    finally(w) {
      return this.async().finally(w);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(w, b) {
      let v = this.result.lastPlugin;
      try {
        if (b && b.addToError(w), this.error = w, w.name === "CssSyntaxError" && !w.plugin)
          w.plugin = v.postcssPlugin, w.setMessage();
        else if (v.postcssVersion && process.env.NODE_ENV !== "production") {
          let x = v.postcssPlugin, R = v.postcssVersion, I = this.result.processor.version, F = R.split("."), S = I.split(".");
          (F[0] !== S[0] || parseInt(F[1]) > parseInt(S[1])) && console.error(
            "Unknown error from PostCSS plugin. Your current PostCSS version is " + I + ", but " + x + " uses " + R + ". Perhaps this is the source of the error below."
          );
        }
      } catch (x) {
        console && console.error && console.error(x);
      }
      return w;
    }
    prepareVisitors() {
      this.listeners = {};
      let w = (b, v, x) => {
        this.listeners[v] || (this.listeners[v] = []), this.listeners[v].push([b, x]);
      };
      for (let b of this.plugins)
        if (typeof b == "object")
          for (let v in b) {
            if (!u[v] && /^[A-Z]/.test(v))
              throw new Error(
                `Unknown event ${v} in ${b.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!p[v])
              if (typeof b[v] == "object")
                for (let x in b[v])
                  x === "*" ? w(b, v, b[v][x]) : w(
                    b,
                    v + "-" + x.toLowerCase(),
                    b[v][x]
                  );
              else typeof b[v] == "function" && w(b, v, b[v]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let w = 0; w < this.plugins.length; w++) {
        let b = this.plugins[w], v = this.runOnRoot(b);
        if (h(v))
          try {
            await v;
          } catch (x) {
            throw this.handleError(x);
          }
      }
      if (this.prepareVisitors(), this.hasListener) {
        let w = this.result.root;
        for (; !w[l]; ) {
          w[l] = !0;
          let b = [g(w)];
          for (; b.length > 0; ) {
            let v = this.visitTick(b);
            if (h(v))
              try {
                await v;
              } catch (x) {
                let R = b[b.length - 1].node;
                throw this.handleError(x, R);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [b, v] of this.listeners.OnceExit) {
            this.result.lastPlugin = b;
            try {
              if (w.type === "document") {
                let x = w.nodes.map(
                  (R) => v(R, this.helpers)
                );
                await Promise.all(x);
              } else
                await v(w, this.helpers);
            } catch (x) {
              throw this.handleError(x);
            }
          }
      }
      return this.processed = !0, this.stringify();
    }
    runOnRoot(w) {
      this.result.lastPlugin = w;
      try {
        if (typeof w == "object" && w.Once) {
          if (this.result.root.type === "document") {
            let b = this.result.root.nodes.map(
              (v) => w.Once(v, this.helpers)
            );
            return h(b[0]) ? Promise.all(b) : b;
          }
          return w.Once(this.result.root, this.helpers);
        } else if (typeof w == "function")
          return w(this.result.root, this.result);
      } catch (b) {
        throw this.handleError(b);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = !0, this.sync();
      let w = this.result.opts, b = o;
      w.syntax && (b = w.syntax.stringify), w.stringifier && (b = w.stringifier), b.stringify && (b = b.stringify);
      let v = this.result.root.source;
      if (w.map === void 0 && !(v && v.input && v.input.map)) {
        let I = "";
        return b(this.result.root, (F) => {
          I += F;
        }), this.result.css = I, this.result;
      }
      let R = new r(b, this.result.root, this.result.opts).generate();
      return this.result.css = R[0], this.result.map = R[1], this.result;
    }
    sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      if (this.processed = !0, this.processing)
        throw this.getAsyncError();
      for (let w of this.plugins) {
        let b = this.runOnRoot(w);
        if (h(b))
          throw this.getAsyncError();
      }
      if (this.prepareVisitors(), this.hasListener) {
        let w = this.result.root;
        for (; !w[l]; )
          w[l] = !0, this.walkSync(w);
        if (this.listeners.OnceExit)
          if (w.type === "document")
            for (let b of w.nodes)
              this.visitSync(this.listeners.OnceExit, b);
          else
            this.visitSync(this.listeners.OnceExit, w);
      }
      return this.result;
    }
    then(w, b) {
      return process.env.NODE_ENV !== "production" && ("from" in this.opts || c(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(w, b);
    }
    toString() {
      return this.css;
    }
    visitSync(w, b) {
      for (let [v, x] of w) {
        this.result.lastPlugin = v;
        let R;
        try {
          R = x(b, this.helpers);
        } catch (I) {
          throw this.handleError(I, b.proxyOf);
        }
        if (b.type !== "root" && b.type !== "document" && !b.parent)
          return !0;
        if (h(R))
          throw this.getAsyncError();
      }
    }
    visitTick(w) {
      let b = w[w.length - 1], { node: v, visitors: x } = b;
      if (v.type !== "root" && v.type !== "document" && !v.parent) {
        w.pop();
        return;
      }
      if (x.length > 0 && b.visitorIndex < x.length) {
        let [I, F] = x[b.visitorIndex];
        b.visitorIndex += 1, b.visitorIndex === x.length && (b.visitors = [], b.visitorIndex = 0), this.result.lastPlugin = I;
        try {
          return F(v.toProxy(), this.helpers);
        } catch (S) {
          throw this.handleError(S, v);
        }
      }
      if (b.iterator !== 0) {
        let I = b.iterator;
        b.descending && (b.descending = !1, v.indexes[I] += 1);
        let F;
        for (; F = v.nodes[v.indexes[I]]; ) {
          if (!F[l]) {
            F[l] = !0, b.descending = !0, w.push(g(F));
            return;
          }
          v.indexes[I] += 1;
        }
        b.iterator = 0, delete v.indexes[I];
      }
      let R = b.events;
      for (; b.eventIndex < R.length; ) {
        let I = R[b.eventIndex];
        if (b.eventIndex += 1, I === a) {
          v.nodes && v.nodes.length && (v[l] = !0, b.iterator = v.getIterator());
          return;
        } else if (this.listeners[I]) {
          b.visitors = this.listeners[I];
          return;
        }
      }
      w.pop();
    }
    walkSync(w) {
      w[l] = !0;
      let b = [{ eventIndex: 0, events: m(w), iterator: 0, node: w }];
      for (; b.length > 0; ) {
        let v = b[b.length - 1], x = v.node;
        if (v.iterator !== 0) {
          let R = v.iterator;
          v.descending && (v.descending = !1, x.indexes[R] += 1);
          let I, F = !1;
          for (; I = x.nodes[x.indexes[R]]; ) {
            if (!I[l]) {
              I[l] = !0, v.descending = !0, b.push({
                eventIndex: 0,
                events: m(I),
                iterator: 0,
                node: I
              }), F = !0;
              break;
            }
            x.indexes[R] += 1;
          }
          if (F) continue;
          v.iterator = 0, delete x.indexes[R];
        }
        if (v.eventIndex < v.events.length) {
          let R = v.events[v.eventIndex];
          if (v.eventIndex += 1, R === a)
            x.nodes && x.nodes.length && (v.iterator = x.getIterator());
          else {
            let I = this.listeners[R];
            I && this.visitSync(I, x.toProxy()) && b.pop();
          }
          continue;
        }
        b.pop();
      }
    }
    warnings() {
      return this.sync().warnings();
    }
  }
  return _.registerPostcss = (C) => {
    y = C;
  }, _r = _, _.default = _, s.registerLazyResult(_), t.registerLazyResult(_), _r;
}
var kr, gi;
function Iu() {
  if (gi) return kr;
  gi = 1;
  let e = Hs(), t = Zr(), r = Xr(), n = Tt(), i = Gs();
  class s {
    get content() {
      return this.result.css;
    }
    get css() {
      return this.result.css;
    }
    get map() {
      return this.result.map;
    }
    get messages() {
      return [];
    }
    get opts() {
      return this.result.opts;
    }
    get processor() {
      return this.result.processor;
    }
    get root() {
      if (this._root)
        return this._root;
      let l, f = t;
      try {
        l = f(this._css, this._opts);
      } catch (c) {
        this.error = c;
      }
      if (this.error)
        throw this.error;
      return this._root = l, l;
    }
    get [Symbol.toStringTag]() {
      return "NoWorkResult";
    }
    constructor(l, f, c) {
      f = f.toString(), this.stringified = !1, this._processor = l, this._css = f, this._opts = c, this._map = void 0;
      let d = n;
      this.result = new r(this._processor, void 0, this._opts), this.result.css = f;
      let u = this;
      Object.defineProperty(this.result, "root", {
        get() {
          return u.root;
        }
      });
      let p = new e(d, void 0, this._opts, f);
      if (p.isMap()) {
        let [a, h] = p.generate();
        a && (this.result.css = a), h && (this.result.map = h);
      } else
        p.clearAnnotation(), this.result.css = p.css;
    }
    async() {
      return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
    }
    catch(l) {
      return this.async().catch(l);
    }
    finally(l) {
      return this.async().finally(l);
    }
    sync() {
      if (this.error) throw this.error;
      return this.result;
    }
    then(l, f) {
      return process.env.NODE_ENV !== "production" && ("from" in this._opts || i(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(l, f);
    }
    toString() {
      return this._css;
    }
    warnings() {
      return [];
    }
  }
  return kr = s, s.default = s, kr;
}
var Cr, bi;
function Tu() {
  if (bi) return Cr;
  bi = 1;
  let e = Yr(), t = Zs(), r = Iu(), n = ht();
  class i {
    constructor(o = []) {
      this.version = "8.5.33", this.plugins = this.normalize(o);
    }
    normalize(o) {
      let l = [];
      for (let f of o)
        if (f.postcss === !0 ? f = f() : f.postcss && (f = f.postcss), typeof f == "object" && Array.isArray(f.plugins))
          l = l.concat(f.plugins);
        else if (typeof f == "object" && f.postcssPlugin)
          l.push(f);
        else if (typeof f == "function")
          l.push(f);
        else if (typeof f == "object" && (f.parse || f.stringify)) {
          if (process.env.NODE_ENV !== "production")
            throw new Error(
              "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
            );
        } else
          throw new Error(f + " is not a PostCSS plugin");
      return l;
    }
    process(o, l = {}) {
      return !this.plugins.length && !l.parser && !l.stringifier && !l.syntax ? new r(this, o, l) : new t(this, o, l);
    }
    use(o) {
      return this.plugins = this.plugins.concat(this.normalize([o])), this;
    }
  }
  return Cr = i, i.default = i, n.registerProcessor(i), e.registerProcessor(i), Cr;
}
var Rr, xi;
function Fu() {
  if (xi) return Rr;
  xi = 1;
  let e = Hr(), t = Ot(), r = Pe(), n = Vr(), i = Bt(), s = Yr(), o = Eu(), l = Mt(), f = Zs(), c = Vs(), d = Nt(), u = Zr(), p = Tu(), a = Xr(), h = ht(), m = Gr(), g = Tt(), k = Ys();
  function y(..._) {
    return _.length === 1 && Array.isArray(_[0]) && (_ = _[0]), new p(_);
  }
  return y.plugin = function(C, w) {
    let b = !1;
    function v(...R) {
      console && console.warn && !b && (b = !0, console.warn(
        C + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
      ), process.env.LANG && process.env.LANG.startsWith("zh") && console.warn(
        C + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
      ));
      let I = w(...R);
      return I.postcssPlugin = C, I.postcssVersion = new p().version, I;
    }
    let x;
    return Object.defineProperty(v, "postcss", {
      get() {
        return x || (x = v()), x;
      }
    }), v.process = function(R, I, F) {
      return y([v(F)]).process(R, I);
    }, v;
  }, y.stringify = g, y.parse = u, y.fromJSON = o, y.list = c, y.comment = (_) => new t(_), y.atRule = (_) => new e(_), y.decl = (_) => new i(_), y.rule = (_) => new m(_), y.root = (_) => new h(_), y.document = (_) => new s(_), y.CssSyntaxError = n, y.Declaration = i, y.Container = r, y.Processor = p, y.Document = s, y.Comment = t, y.Warning = k, y.AtRule = e, y.Result = a, y.Input = l, y.Rule = m, y.Root = h, y.Node = d, f.registerPostcss(y), Rr = y, y.default = y, Rr;
}
var vt = { exports: {} }, kt = { exports: {} }, Nu = kt.exports, wi;
function Ou() {
  return wi || (wi = 1, (function(e, t) {
    (function(r, n) {
      e.exports = n();
    })(Nu, (function() {
      var r = 1e3, n = 6e4, i = 36e5, s = "millisecond", o = "second", l = "minute", f = "hour", c = "day", d = "week", u = "month", p = "quarter", a = "year", h = "date", m = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, k = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(P) {
        var M = ["th", "st", "nd", "rd"], B = P % 100;
        return "[" + P + (M[(B - 20) % 10] || M[B] || M[0]) + "]";
      } }, _ = function(P, M, B) {
        var D = String(P);
        return !D || D.length >= M ? P : "" + Array(M + 1 - D.length).join(B) + P;
      }, C = { s: _, z: function(P) {
        var M = -P.utcOffset(), B = Math.abs(M), D = Math.floor(B / 60), O = B % 60;
        return (M <= 0 ? "+" : "-") + _(D, 2, "0") + ":" + _(O, 2, "0");
      }, m: function P(M, B) {
        if (M.date() < B.date()) return -P(B, M);
        var D = 12 * (B.year() - M.year()) + (B.month() - M.month()), O = M.clone().add(D, u), j = B - O < 0, U = M.clone().add(D + (j ? -1 : 1), u);
        return +(-(D + (B - O) / (j ? O - U : U - O)) || 0);
      }, a: function(P) {
        return P < 0 ? Math.ceil(P) || 0 : Math.floor(P);
      }, p: function(P) {
        return { M: u, y: a, w: d, d: c, D: h, h: f, m: l, s: o, ms: s, Q: p }[P] || String(P || "").toLowerCase().replace(/s$/, "");
      }, u: function(P) {
        return P === void 0;
      } }, w = "en", b = {};
      b[w] = y;
      var v = "$isDayjsObject", x = function(P) {
        return P instanceof S || !(!P || !P[v]);
      }, R = function P(M, B, D) {
        var O;
        if (!M) return w;
        if (typeof M == "string") {
          var j = M.toLowerCase();
          b[j] && (O = j), B && (b[j] = B, O = j);
          var U = M.split("-");
          if (!O && U.length > 1) return P(U[0]);
        } else {
          var V = M.name;
          b[V] = M, O = V;
        }
        return !D && O && (w = O), O || !D && w;
      }, I = function(P, M) {
        if (x(P)) return P.clone();
        var B = typeof M == "object" ? M : {};
        return B.date = P, B.args = arguments, new S(B);
      }, F = C;
      F.l = R, F.i = x, F.w = function(P, M) {
        return I(P, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset });
      };
      var S = (function() {
        function P(B) {
          this.$L = R(B.locale, null, !0), this.parse(B), this.$x = this.$x || B.x || {}, this[v] = !0;
        }
        var M = P.prototype;
        return M.parse = function(B) {
          this.$d = (function(D) {
            var O = D.date, j = D.utc;
            if (O === null) return /* @__PURE__ */ new Date(NaN);
            if (F.u(O)) return /* @__PURE__ */ new Date();
            if (O instanceof Date) return new Date(O);
            if (typeof O == "string" && !/Z$/i.test(O)) {
              var U = O.match(g);
              if (U) {
                var V = U[2] - 1 || 0, X = (U[7] || "0").substring(0, 3);
                return j ? new Date(Date.UTC(U[1], V, U[3] || 1, U[4] || 0, U[5] || 0, U[6] || 0, X)) : new Date(U[1], V, U[3] || 1, U[4] || 0, U[5] || 0, U[6] || 0, X);
              }
            }
            return new Date(O);
          })(B), this.init();
        }, M.init = function() {
          var B = this.$d;
          this.$y = B.getFullYear(), this.$M = B.getMonth(), this.$D = B.getDate(), this.$W = B.getDay(), this.$H = B.getHours(), this.$m = B.getMinutes(), this.$s = B.getSeconds(), this.$ms = B.getMilliseconds();
        }, M.$utils = function() {
          return F;
        }, M.isValid = function() {
          return this.$d.toString() !== m;
        }, M.isSame = function(B, D) {
          var O = I(B);
          return this.startOf(D) <= O && O <= this.endOf(D);
        }, M.isAfter = function(B, D) {
          return I(B) < this.startOf(D);
        }, M.isBefore = function(B, D) {
          return this.endOf(D) < I(B);
        }, M.$g = function(B, D, O) {
          return F.u(B) ? this[D] : this.set(O, B);
        }, M.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, M.valueOf = function() {
          return this.$d.getTime();
        }, M.startOf = function(B, D) {
          var O = this, j = !!F.u(D) || D, U = F.p(B), V = function(fe, ae) {
            var le = F.w(O.$u ? Date.UTC(O.$y, ae, fe) : new Date(O.$y, ae, fe), O);
            return j ? le : le.endOf(c);
          }, X = function(fe, ae) {
            return F.w(O.toDate()[fe].apply(O.toDate("s"), (j ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ae)), O);
          }, q = this.$W, ie = this.$M, K = this.$D, re = "set" + (this.$u ? "UTC" : "");
          switch (U) {
            case a:
              return j ? V(1, 0) : V(31, 11);
            case u:
              return j ? V(1, ie) : V(0, ie + 1);
            case d:
              var he = this.$locale().weekStart || 0, me = (q < he ? q + 7 : q) - he;
              return V(j ? K - me : K + (6 - me), ie);
            case c:
            case h:
              return X(re + "Hours", 0);
            case f:
              return X(re + "Minutes", 1);
            case l:
              return X(re + "Seconds", 2);
            case o:
              return X(re + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, M.endOf = function(B) {
          return this.startOf(B, !1);
        }, M.$set = function(B, D) {
          var O, j = F.p(B), U = "set" + (this.$u ? "UTC" : ""), V = (O = {}, O[c] = U + "Date", O[h] = U + "Date", O[u] = U + "Month", O[a] = U + "FullYear", O[f] = U + "Hours", O[l] = U + "Minutes", O[o] = U + "Seconds", O[s] = U + "Milliseconds", O)[j], X = j === c ? this.$D + (D - this.$W) : D;
          if (j === u || j === a) {
            var q = this.clone().set(h, 1);
            q.$d[V](X), q.init(), this.$d = q.set(h, Math.min(this.$D, q.daysInMonth())).$d;
          } else V && this.$d[V](X);
          return this.init(), this;
        }, M.set = function(B, D) {
          return this.clone().$set(B, D);
        }, M.get = function(B) {
          return this[F.p(B)]();
        }, M.add = function(B, D) {
          var O, j = this;
          B = Number(B);
          var U = F.p(D), V = function(ie) {
            var K = I(j);
            return F.w(K.date(K.date() + Math.round(ie * B)), j);
          };
          if (U === u) return this.set(u, this.$M + B);
          if (U === a) return this.set(a, this.$y + B);
          if (U === c) return V(1);
          if (U === d) return V(7);
          var X = (O = {}, O[l] = n, O[f] = i, O[o] = r, O)[U] || 1, q = this.$d.getTime() + B * X;
          return F.w(q, this);
        }, M.subtract = function(B, D) {
          return this.add(-1 * B, D);
        }, M.format = function(B) {
          var D = this, O = this.$locale();
          if (!this.isValid()) return O.invalidDate || m;
          var j = B || "YYYY-MM-DDTHH:mm:ssZ", U = F.z(this), V = this.$H, X = this.$m, q = this.$M, ie = O.weekdays, K = O.months, re = O.meridiem, he = function(ae, le, pe, be) {
            return ae && (ae[le] || ae(D, j)) || pe[le].slice(0, be);
          }, me = function(ae) {
            return F.s(V % 12 || 12, ae, "0");
          }, fe = re || function(ae, le, pe) {
            var be = ae < 12 ? "AM" : "PM";
            return pe ? be.toLowerCase() : be;
          };
          return j.replace(k, (function(ae, le) {
            return le || (function(pe) {
              switch (pe) {
                case "YY":
                  return String(D.$y).slice(-2);
                case "YYYY":
                  return F.s(D.$y, 4, "0");
                case "M":
                  return q + 1;
                case "MM":
                  return F.s(q + 1, 2, "0");
                case "MMM":
                  return he(O.monthsShort, q, K, 3);
                case "MMMM":
                  return he(K, q);
                case "D":
                  return D.$D;
                case "DD":
                  return F.s(D.$D, 2, "0");
                case "d":
                  return String(D.$W);
                case "dd":
                  return he(O.weekdaysMin, D.$W, ie, 2);
                case "ddd":
                  return he(O.weekdaysShort, D.$W, ie, 3);
                case "dddd":
                  return ie[D.$W];
                case "H":
                  return String(V);
                case "HH":
                  return F.s(V, 2, "0");
                case "h":
                  return me(1);
                case "hh":
                  return me(2);
                case "a":
                  return fe(V, X, !0);
                case "A":
                  return fe(V, X, !1);
                case "m":
                  return String(X);
                case "mm":
                  return F.s(X, 2, "0");
                case "s":
                  return String(D.$s);
                case "ss":
                  return F.s(D.$s, 2, "0");
                case "SSS":
                  return F.s(D.$ms, 3, "0");
                case "Z":
                  return U;
              }
              return null;
            })(ae) || U.replace(":", "");
          }));
        }, M.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, M.diff = function(B, D, O) {
          var j, U = this, V = F.p(D), X = I(B), q = (X.utcOffset() - this.utcOffset()) * n, ie = this - X, K = function() {
            return F.m(U, X);
          };
          switch (V) {
            case a:
              j = K() / 12;
              break;
            case u:
              j = K();
              break;
            case p:
              j = K() / 3;
              break;
            case d:
              j = (ie - q) / 6048e5;
              break;
            case c:
              j = (ie - q) / 864e5;
              break;
            case f:
              j = ie / i;
              break;
            case l:
              j = ie / n;
              break;
            case o:
              j = ie / r;
              break;
            default:
              j = ie;
          }
          return O ? j : F.a(j);
        }, M.daysInMonth = function() {
          return this.endOf(u).$D;
        }, M.$locale = function() {
          return b[this.$L];
        }, M.locale = function(B, D) {
          if (!B) return this.$L;
          var O = this.clone(), j = R(B, D, !0);
          return j && (O.$L = j), O;
        }, M.clone = function() {
          return F.w(this.$d, this);
        }, M.toDate = function() {
          return new Date(this.valueOf());
        }, M.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, M.toISOString = function() {
          return this.$d.toISOString();
        }, M.toString = function() {
          return this.$d.toUTCString();
        }, P;
      })(), Y = S.prototype;
      return I.prototype = Y, [["$ms", s], ["$s", o], ["$m", l], ["$H", f], ["$W", c], ["$M", u], ["$y", a], ["$D", h]].forEach((function(P) {
        Y[P[1]] = function(M) {
          return this.$g(M, P[0], P[1]);
        };
      })), I.extend = function(P, M) {
        return P.$i || (P(M, S, I), P.$i = !0), I;
      }, I.locale = R, I.isDayjs = x, I.unix = function(P) {
        return I(1e3 * P);
      }, I.en = b[w], I.Ls = b, I.p = {}, I;
    }));
  })(kt)), kt.exports;
}
var vi;
function Bu() {
  if (vi) return vt.exports;
  vi = 1;
  const e = Ou();
  function t(n) {
    for (n = n.replace(/[\x00-\x20]+/g, ""); ; ) {
      const i = n.indexOf("<!--");
      if (i === -1)
        break;
      const s = n.indexOf("-->", i + 4);
      if (s === -1)
        break;
      n = n.substring(0, i) + n.substring(s + 3);
    }
    return n;
  }
  function r(n, i) {
    i = i || {};
    const s = i.allowedSchemes || ["http", "https", "ftp", "mailto", "tel", "sms"], o = i.allowProtocolRelative !== !1;
    if (typeof n != "string")
      return !1;
    n = t(n);
    const l = n.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);
    if (!l)
      return n.match(/^[/\\]{2}/) ? !o : !1;
    const f = l[1].toLowerCase();
    return s.indexOf(f) === -1;
  }
  return vt.exports = function(n) {
    const i = {};
    return i.options = n || {}, i.filterTag = i.options.filterTag || function(s) {
      return s = s.trim(), s.toLowerCase();
    }, i.string = function(s, o) {
      return typeof s != "string" && (typeof s == "number" || typeof s == "boolean" ? s += "" : s = ""), s = s.trim(), o !== void 0 && s === "" && (s = o), s;
    }, i.strings = function(s) {
      return Array.isArray(s) ? s.map(function(o) {
        return i.string(o);
      }) : [];
    }, i.integer = function(s, o, l, f) {
      if (o === void 0 && (o = 0), typeof s == "number")
        s = Math.floor(s);
      else
        try {
          s = parseInt(s, 10), isNaN(s) && (s = o);
        } catch {
          s = o;
        }
      return typeof l == "number" && s < l && (s = l), typeof f == "number" && s > f && (s = f), s;
    }, i.padInteger = function(s, o) {
      let l = s + "";
      for (; l.length < o; )
        l = "0" + l;
      return l;
    }, i.float = function(s, o, l, f) {
      if (o === void 0 && (o = 0), typeof s != "number")
        try {
          s = parseFloat(s, 10), isNaN(s) && (s = o);
        } catch {
          s = o;
        }
      return typeof l == "number" && s < l && (s = l), typeof f == "number" && s > f && (s = f), s;
    }, i.naughtyHref = r, i.url = function(s, o, l) {
      if (s = i.string(s, o), s === o)
        return s;
      if (s = t(s), r(s) || (s = f(s), s === null))
        return o;
      return s;
      function f(c) {
        return c.match(/^(((https?|ftp):\/\/)|((mailto|tel|sms):)|#|([^/.]+)?\/|[^/.]+$)/) ? c : c.match(/^[^/.]+\.[^/.]+/) ? (l ? "https://" : "http://") + c : null;
      }
    }, i.select = function(s, o, l) {
      if (s = i.string(s), !o || !o.length)
        return l;
      let f;
      return typeof o[0] == "object" ? (f = o.find(function(c) {
        return c.value === null || c.value === void 0 ? !1 : c.value.toString() === s;
      }), f != null ? f.value : l) : (f = o.find(function(c) {
        return c == null ? !1 : c.toString() === s;
      }), f !== void 0 ? f : l);
    }, i.boolean = function(s, o) {
      return s === !0 ? !0 : s === !1 ? !1 : (s = i.string(s, o), s === o ? s === void 0 ? !1 : s : (s = s.toLowerCase().charAt(0), s === "" || s === "n" || s === "0" || s === "f" ? !1 : s === "t" || s === "y" || s === "1"));
    }, i.addBooleanFilterToCriteria = function(s, o, l, f) {
      f === void 0 && (f = null);
      let c = typeof s == "object" && s !== null ? s[o] : s;
      c = c === void 0 ? f : c, c = i.booleanOrNull(c), c === null || (c ? l[o] = !0 : l[o] = { $ne: !0 });
    }, i.booleanOrNull = function(s, o) {
      return s === !0 || s === !1 || s === null ? s : (s = i.string(s, o), s === o ? o === void 0 ? null : s : s === "null" ? null : (s = s.toLowerCase().charAt(0), s === "" || s === "n" || s === "0" || s === "f" ? !1 : s === "t" || s === "y" || s === "1" ? !0 : s === "a" ? null : o));
    }, i.date = function(s, o, l) {
      let f;
      function c() {
        return o === void 0 && (o = e().format("YYYY-MM-DD")), o;
      }
      if (typeof s == "string") {
        if (s.match(/\//)) {
          if (f = s.split("/"), f.length === 2)
            return (l || /* @__PURE__ */ new Date()).getFullYear() + "-" + i.padInteger(f[0], 2) + "-" + i.padInteger(f[1], 2);
          if (f.length === 3) {
            if (f[2] < 100) {
              const d = l || /* @__PURE__ */ new Date(), u = d.getFullYear() % 100, p = d.getFullYear() - u;
              let a = parseInt(f[2]) + p;
              a - d.getFullYear() > 50 && (a -= 100), f[2] = a;
            }
            return i.padInteger(f[2], 4) + "-" + i.padInteger(f[0], 2) + "-" + i.padInteger(f[1], 2);
          } else
            return c();
        } else if (s.match(/-/))
          return f = s.split("-"), f.length === 2 ? (l || /* @__PURE__ */ new Date()).getFullYear() + "-" + i.padInteger(f[0], 2) + "-" + i.padInteger(f[1], 2) : f.length === 3 ? i.padInteger(f[0], 4) + "-" + i.padInteger(f[1], 2) + "-" + i.padInteger(f[2], 2) : c();
      }
      try {
        return s === null || (s = l || new Date(s), isNaN(s.getTime())) ? c() : s.getFullYear() + "-" + i.padInteger(s.getMonth() + 1, 2) + "-" + i.padInteger(s.getDate(), 2);
      } catch {
        return c();
      }
    }, i.formatDate = function(s) {
      return e(s).format("YYYY-MM-DD");
    }, i.time = function(s, o) {
      s = i.string(s).toLowerCase(), s = s.trim();
      const l = s.match(/^(\d+)([:|.](\d+))?([:|.](\d+))?\s*(am|pm|AM|PM|a|p|A|M)?$/);
      if (l) {
        let f = parseInt(l[1], 10);
        const c = l[3] !== void 0 ? parseInt(l[3], 10) : 0, d = l[5] !== void 0 ? parseInt(l[5], 10) : 0;
        let u = l[6] ? l[6].toLowerCase() : l[6];
        return u = u && u.charAt(0), f === 12 && u === "a" ? f -= 12 : f === 12 && u === "p" || u === "p" && (f += 12), (f === 24 || f === "24") && (f = 0), i.padInteger(f, 2) + ":" + i.padInteger(c, 2) + ":" + i.padInteger(d, 2);
      } else
        return o !== void 0 ? o : e().format("HH:mm");
    }, i.formatTime = function(s) {
      return e(s).format("HH:mm:ss");
    }, i.tags = function(s, o) {
      return typeof s == "string" && (s = s.split(/,\s*/)), Array.isArray(s) ? s.map((d) => i.string(d)).map(o || i.filterTag).filter((d) => d.length > 0) : [];
    }, i.idRegExp = i.options.idRegExp || /^[A-Za-z0-9_]+$/, i.id = function(s, o) {
      const l = i.string(s, o);
      return l === o || l.match(i.idRegExp) ? l : o;
    }, i.ids = function(s) {
      return Array.isArray(s) ? s.filter(function(l) {
        return i.id(l) !== void 0;
      }) : [];
    }, i;
  }, vt.exports.naughtyHref = r, vt.exports;
}
var Ar, yi;
function Mu() {
  if (yi) return Ar;
  yi = 1;
  const e = xu, t = wu(), { isPlainObject: r } = vu(), n = _u(), { parse: i } = Fu(), { naughtyHref: s } = Bu(), o = [
    "img",
    "audio",
    "video",
    "picture",
    "svg",
    "object",
    "map",
    "iframe",
    "embed"
  ], l = ["script", "style"], f = [
    "animate",
    "animatecolor",
    "animatemotion",
    "animatetransform",
    "set"
  ], c = ["href"], d = ["debug", "info", "warn", "error"];
  function u(v) {
    const x = v && v.logger || console, R = {};
    for (const I of d)
      R[I] = typeof x[I] == "function" ? (...F) => x[I](...F) : (...F) => console[I](...F);
    return R;
  }
  function p(v, x) {
    v && Object.keys(v).forEach(function(R) {
      x(v[R], R);
    });
  }
  function a(v, x) {
    return {}.hasOwnProperty.call(v, x);
  }
  function h(v, x) {
    return !Array.isArray(v) || !Array.isArray(x) ? x : v.concat(x);
  }
  function m(v, x) {
    const R = /* @__PURE__ */ Object.create(null);
    for (const I of [v, x])
      for (const F of Object.keys(I))
        R[F] = a(R, F) ? R[F].concat(I[F]) : I[F];
    return R;
  }
  function g(v, x) {
    const R = [];
    return p(v, function(I) {
      x(I) && R.push(I);
    }), R;
  }
  function k(v) {
    for (const x in v)
      if (a(v, x))
        return !1;
    return !0;
  }
  function y(v) {
    return v.map(function(x) {
      if (!x.url)
        throw new Error("URL missing");
      return x.url + (x.w ? ` ${x.w}w` : "") + (x.h ? ` ${x.h}h` : "") + (x.d ? ` ${x.d}x` : "");
    }).join(", ");
  }
  Ar = w;
  const _ = /^[^\0\t\n\f\r /<=>]+$/, C = 8;
  function w(v, x, R) {
    if (v == null)
      return "";
    const I = R && R.depth || 0, F = R && R.iframeFallbackDepth || 0;
    typeof v == "number" && (v = v.toString());
    let S = "", Y = "";
    function P(A, N) {
      const T = this;
      this.tag = A, this.attribs = N || {}, this.tagPosition = S.length, this.text = "", this.openingTagLength = 0, this.mediaChildren = [], this.updateParentNodeText = function() {
        if (re.length) {
          const L = re[re.length - 1];
          L.text += T.text;
        }
      }, this.updateParentNodeMediaChildren = function() {
        re.length && o.includes(this.tag) && re[re.length - 1].mediaChildren.push(this.tag);
      };
    }
    x = Object.assign({}, w.defaults, x), x.parser = Object.assign({}, b, x.parser), typeof v == "string" && !x.parser.xmlMode && (v = v.replaceAll("<![CDATA[", "<!&#91;CDATA["));
    const M = u(x), B = function(A) {
      return x.allowedTags === !1 || (x.allowedTags || []).indexOf(A) > -1;
    };
    l.forEach(function(A) {
      B(A) && !x.allowVulnerableTags && M.warn(
        `Your \`allowedTags\` option includes \`${A}\`, which is inherently vulnerable to XSS attacks. Please remove it from \`allowedTags\`, or, to disable this warning, add the \`allowVulnerableTags\` option and ensure you are accounting for this risk.`
      );
    });
    const D = x.nonTextTags || [
      "script",
      "style",
      "textarea",
      "option",
      "xmp"
    ];
    let O, j;
    x.allowedAttributes && (O = {}, j = {}, p(x.allowedAttributes, function(A, N) {
      O[N] = [];
      const T = [];
      A.forEach(function(L) {
        typeof L == "string" && L.indexOf("*") >= 0 ? T.push(t(L).replace(/\\\*/g, ".*")) : O[N].push(L);
      }), T.length && (j[N] = new RegExp("^(" + T.join("|") + ")$"));
    }));
    const U = {}, V = {}, X = {};
    p(x.allowedClasses, function(A, N) {
      if (O && (a(O, N) || (O[N] = []), O[N].push("class")), U[N] = A, Array.isArray(A)) {
        const T = [];
        U[N] = [], X[N] = [], A.forEach(function(L) {
          typeof L == "string" && L.indexOf("*") >= 0 ? T.push(t(L).replace(/\\\*/g, ".*")) : L instanceof RegExp ? X[N].push(L) : U[N].push(L);
        }), T.length && (V[N] = new RegExp("^(" + T.join("|") + ")$"));
      }
    });
    const q = {};
    let ie;
    p(x.transformTags, function(A, N) {
      let T;
      typeof A == "function" ? T = A : typeof A == "string" && (T = w.simpleTransform(A)), N === "*" ? ie = T : q[N] = T;
    });
    let K, re, he, me, fe, ae, le, pe, be = !1;
    Kr();
    const et = new e.Parser({
      onopentag: function(A, N) {
        if (x.onOpenTag && x.onOpenTag(A, N), Pt(), x.enforceHtmlBoundary && A === "html" && Kr(), pe)
          return;
        if (fe) {
          ae++;
          return;
        }
        const T = new P(A, N);
        re.push(T);
        let L = !1;
        const te = !!T.text;
        let ue;
        if (a(q, A) && (ue = q[A](A, N), T.attribs = N = ue.attribs, ue.text !== void 0 && (T.innerText = ue.text), A !== ue.tagName && (T.name = A = ue.tagName, me[K] = ue.tagName)), ie && (ue = ie(A, N), T.attribs = N = ue.attribs, A !== ue.tagName && (T.name = A = ue.tagName, me[K] = ue.tagName)), (!B(A) || eo(A, N) || x.disallowedTagsMode === "recursiveEscape" && !k(he) || x.nestingLimit != null && K >= x.nestingLimit) && (L = !0, he[K] = !0, (x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") && D.indexOf(A) !== -1 && (fe = !0, ae = 1, T.tag.toLowerCase() === "noscript" && (le = Xs("noscript", et.endIndex + 1)))), K++, L) {
          if (x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") {
            if (T.innerText && !te) {
              const H = Ce(T.innerText);
              x.textFilter ? S += x.textFilter(H, A) : S += H, be = !0;
            }
            return;
          }
          Y = S, S = "";
        }
        if (S += "<" + A, A === "script" && (x.allowedScriptHostnames || x.allowedScriptDomains) && (T.innerText = ""), L && (x.disallowedTagsMode === "escape" || x.disallowedTagsMode === "recursiveEscape") && x.preserveEscapedAttributes ? p(N, function(H, J) {
          S += " " + J + '="' + Ce(H || "", !0) + '"';
        }) : (!O || a(O, A) || O["*"]) && p(N, function(H, J) {
          if (!_.test(J)) {
            delete T.attribs[J];
            return;
          }
          if (H === "" && !x.allowedEmptyAttributes.includes(J) && (x.nonBooleanAttributes.includes(J) || x.nonBooleanAttributes.includes("*"))) {
            delete T.attribs[J];
            return;
          }
          let Ue = !1;
          if (!O || a(O, A) && O[A].indexOf(J) !== -1 || O["*"] && O["*"].indexOf(J) !== -1 || a(j, A) && j[A].test(J) || j["*"] && j["*"].test(J))
            Ue = !0;
          else if (O && O[A]) {
            for (const Q of O[A])
              if (r(Q) && Q.name && Q.name === J) {
                Ue = !0;
                let ee = "";
                if (Q.multiple === !0) {
                  const Le = H.split(" ");
                  for (const Te of Le)
                    Q.values.indexOf(Te) !== -1 && (ee === "" ? ee = Te : ee += " " + Te);
                } else Q.values.indexOf(H) >= 0 && (ee = H);
                H = ee;
              }
          }
          if (Ue) {
            if (x.allowedSchemesAppliedToAttributes.indexOf(J) !== -1 && Lt(A, H)) {
              delete T.attribs[J];
              return;
            }
            if (A === "meta" && J.toLowerCase() === "content" && Ks(N) && Qs(H)) {
              delete T.attribs[J];
              return;
            }
            if (A === "script" && J === "src") {
              let Q = !0;
              try {
                const ee = Qr(H);
                if (x.allowedScriptHostnames || x.allowedScriptDomains) {
                  const Le = (x.allowedScriptHostnames || []).find(function(ve) {
                    return ve === ee.url.hostname;
                  }), Te = (x.allowedScriptDomains || []).find(function(ve) {
                    return ee.url.hostname === ve || ee.url.hostname.endsWith(`.${ve}`);
                  });
                  Q = Le || Te;
                }
              } catch {
                Q = !1;
              }
              if (!Q) {
                delete T.attribs[J];
                return;
              }
            }
            if (A === "iframe" && J === "src") {
              let Q = !0;
              try {
                const ee = Qr(H);
                if (ee.isRelativeUrl)
                  Q = a(x, "allowIframeRelativeUrls") ? x.allowIframeRelativeUrls : !x.allowedIframeHostnames && !x.allowedIframeDomains;
                else if (x.allowedIframeHostnames || x.allowedIframeDomains) {
                  const Le = (x.allowedIframeHostnames || []).find(function(ve) {
                    return ve === ee.url.hostname;
                  }), Te = (x.allowedIframeDomains || []).find(function(ve) {
                    return ee.url.hostname === ve || ee.url.hostname.endsWith(`.${ve}`);
                  });
                  Q = Le || Te;
                }
              } catch {
                Q = !1;
              }
              if (!Q) {
                delete T.attribs[J];
                return;
              }
            }
            if (J === "srcset" || J === "imagesrcset")
              try {
                let Q = n(H);
                if (Q.forEach(function(ee) {
                  Lt(A, ee.url) && (ee.evil = !0);
                }), Q = g(Q, function(ee) {
                  return !ee.evil;
                }), Q.length)
                  H = y(g(Q, function(ee) {
                    return !ee.evil;
                  })), T.attribs[J] = H;
                else {
                  delete T.attribs[J];
                  return;
                }
              } catch {
                delete T.attribs[J];
                return;
              }
            if (J === "class") {
              const Q = U[A], ee = U["*"], Le = V[A], Te = X[A], ve = X["*"], io = V["*"], rn = [
                Le,
                io
              ].concat(Te, ve).filter(function(so) {
                return so;
              });
              if (Q && ee ? H = en(
                H,
                h(Q, ee),
                rn
              ) : H = en(
                H,
                Q || ee,
                rn
              ), !H.length) {
                delete T.attribs[J];
                return;
              }
            }
            if (J === "style") {
              if (x.parseStyleAttributes)
                try {
                  const Q = i(A + " {" + H + "}", { map: !1 }), ee = to(
                    Q,
                    x.allowedStyles
                  );
                  if (H = ro(ee), H.length === 0) {
                    delete T.attribs[J];
                    return;
                  }
                } catch {
                  typeof window < "u" && M.warn(
                    `Failed to parse "${A} {${H}}". If you are running this in a browser, we recommend disabling style parsing with the parseStyleAttributes option, since it only works in a node environment due to a postcss dependency. More info: https://github.com/apostrophecms/sanitize-html/issues/547`
                  ), delete T.attribs[J];
                  return;
                }
              else if (x.allowedStyles)
                throw new Error("allowedStyles option cannot be used together with parseStyleAttributes: false.");
            }
            S += " " + J, H && H.length ? S += '="' + Ce(H, !0) + '"' : x.allowedEmptyAttributes.includes(J) && (S += '=""');
          } else
            delete T.attribs[J];
        }), x.selfClosing.indexOf(A) !== -1)
          S += " />";
        else if (S += ">", T.innerText && !te) {
          const H = Ce(T.innerText);
          x.textFilter ? S += x.textFilter(H, A) : S += H, be = !0;
        }
        L && (S = Y + Ce(S), Y = ""), T.openingTagLength = S.length - T.tagPosition;
      },
      ontext: function(A) {
        if (Pt(), fe || pe)
          return;
        const N = re[re.length - 1];
        let T;
        if (N && (T = N.tag, A = N.innerText !== void 0 ? N.innerText : A), x.disallowedTagsMode === "completelyDiscard" && !B(T))
          A = "";
        else if (T && B(T) && (x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") && T === "script")
          S += A;
        else if (T && B(T) && (x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") && T === "style")
          S += re.some((L) => [L.tag, L.name].some(
            (te) => te === "svg" || te === "math"
          )) ? A.replace(/</g, "\\3c ") : A;
        else if (T && B(T) && (x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") && (T === "textarea" || T === "xmp"))
          T === "xmp" ? S += A.replace(/</g, "&lt;").replace(/>/g, "&gt;") : S += Ce(A, !1);
        else if (
          // htmlparser2 treats <iframe> as a raw-text element, so markup inside
          // (including after an unclosed <iframe>) arrives as a single text node.
          // When the iframe is discarded, re-sanitize that fallback markup as HTML
          // instead of escaping it as plain text (issue #5550).
          // The nested call continues from the current depth so that
          // `nestingLimit` applies to the whole output.
          T === "iframe" && !B(T) && x.disallowedTagsMode === "discard" && F < C
        )
          S += w(A, x, {
            depth: K,
            iframeFallbackDepth: F + 1
          });
        else if (!be) {
          const L = Ce(A, !1);
          x.textFilter ? S += x.textFilter(L, T) : S += L;
        }
        if (re.length) {
          const L = re[re.length - 1];
          L.text += A;
        }
      },
      onclosetag: function(A, N) {
        if (x.onCloseTag && x.onCloseTag(A, N), Pt(), pe) {
          const te = re[re.length - 1];
          if (!te || te.tag !== A)
            return;
        } else if (fe)
          if (ae--, !ae)
            fe = !1, le !== null && (pe = !0);
          else
            return;
        const T = re.pop();
        if (!T)
          return;
        if (T.tag !== A) {
          re.push(T);
          return;
        }
        fe = x.enforceHtmlBoundary ? A === "html" : !1, K--;
        const L = he[K];
        if (L) {
          if (delete he[K], x.disallowedTagsMode === "discard" || x.disallowedTagsMode === "completelyDiscard") {
            T.updateParentNodeText();
            return;
          }
          Y = S, S = "";
        }
        if (me[K] && (A = me[K], delete me[K]), x.exclusiveFilter) {
          const te = x.exclusiveFilter(T);
          if (te === "excludeTag") {
            L && (S = Y, Y = ""), S = S.substring(0, T.tagPosition) + S.substring(T.tagPosition + T.openingTagLength);
            return;
          } else if (te) {
            S = S.substring(0, T.tagPosition);
            return;
          }
        }
        if (T.updateParentNodeMediaChildren(), T.updateParentNodeText(), // Already output />
        x.selfClosing.indexOf(A) !== -1 || // Escaped tag, closing tag is implied
        N && !B(A) && ["escape", "recursiveEscape"].indexOf(x.disallowedTagsMode) >= 0) {
          L && (S = Y, Y = "");
          return;
        }
        S += "</" + A + ">", L && (S = Y + Ce(S), Y = ""), be = !1;
      }
    }, x.parser);
    if (et.write(v), et.end(), x.disallowedTagsMode === "escape" || x.disallowedTagsMode === "recursiveEscape") {
      const A = et.endIndex;
      if (A != null && A >= 0 && A < v.length) {
        const N = v.substring(A);
        S += Ce(N);
      } else (A == null || A < 0) && v.length > 0 && S === "" && (S = Ce(v));
    }
    return S;
    function Kr() {
      S = "", K = I, re = [], he = {}, me = {}, fe = !1, ae = 0, le = null, pe = !1;
    }
    function Pt() {
      le !== null && et.startIndex >= le && (le = null, pe = !1);
    }
    function Xs(A, N) {
      const T = new RegExp("</" + A + "[\\t\\n\\f\\r />]", "ig");
      T.lastIndex = N;
      const L = T.exec(v);
      return L ? L.index : 1 / 0;
    }
    function Ce(A, N) {
      return typeof A != "string" && (A = A + ""), x.parser.decodeEntities && (A = A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), N && (A = A.replace(/"/g, "&quot;"))), A = A.replace(/&(?![a-zA-Z0-9#]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), N && (A = A.replace(/"/g, "&quot;")), A;
    }
    function Lt(A, N) {
      const T = a(x.allowedSchemesByTag, A) ? x.allowedSchemesByTag[A] : x.allowedSchemes || [];
      return s(N, {
        allowedSchemes: T,
        allowProtocolRelative: x.allowProtocolRelative
      });
    }
    function Ks(A) {
      return Object.keys(A).some(function(N) {
        return N.toLowerCase() === "http-equiv" && String(A[N]).trim().toLowerCase() === "refresh";
      });
    }
    function Qs(A) {
      const N = String(A), T = function(J) {
        return J === " " || J === "	" || J === `
` || J === "\f" || J === "\r";
      };
      let L = 0;
      const te = function() {
        for (; L < N.length && T(N[L]); )
          L++;
      }, ue = function(J) {
        return (N[J] || "").toLowerCase();
      };
      te();
      const tn = L;
      for (; L < N.length && /[0-9.]/.test(N[L]); )
        L++;
      if (L === tn)
        return !0;
      if (L < N.length) {
        const J = N[L];
        if (J !== ";" && J !== "," && !T(J))
          return !0;
        te(), (N[L] === ";" || N[L] === ",") && L++, te();
      }
      if (L >= N.length)
        return !1;
      let $e = N.slice(L), H = !0;
      if (ue(L) === "u" && (H = !1, ue(L + 1) === "r" && ue(L + 2) === "l" && (L += 3, te(), N[L] === "=" && (L++, te(), H = !0))), H) {
        const J = N[L];
        if ((J === '"' || J === "'") && L++, $e = N.slice(L), J === '"' || J === "'") {
          const Ue = $e.indexOf(J);
          Ue !== -1 && ($e = $e.slice(0, Ue));
        }
      }
      return Lt("meta", $e);
    }
    function eo(A, N) {
      if (!qt(A).some((L) => f.includes(L)))
        return !1;
      const T = x.allowedSchemesAppliedToAttributes || [];
      return Object.keys(N || {}).some(function(L) {
        if (!qt(L).includes("attributename"))
          return !1;
        const te = (N[L] || "").trim().toLowerCase();
        return T.includes(te) || qt(te).some((ue) => c.includes(ue) || T.includes(ue));
      });
    }
    function qt(A) {
      return A.toLowerCase().split(":").map((N) => N.trim());
    }
    function Qr(A) {
      if (A = A.replace(/^(\w+:)?\s*[\\/]\s*[\\/]/, "$1//"), A.startsWith("relative:"))
        throw new Error("relative: exploit attempt");
      let N = "relative://relative-site";
      for (let te = 0; te < 100; te++)
        N += `/${te}`;
      const T = new URL(A, N);
      return {
        isRelativeUrl: T && T.hostname === "relative-site" && T.protocol === "relative:",
        url: T
      };
    }
    function to(A, N) {
      if (!N)
        return A;
      const T = A.nodes[0];
      let L;
      return N[T.selector] && N["*"] ? L = m(
        N[T.selector],
        N["*"]
      ) : L = N[T.selector] || N["*"], L && (A.nodes[0].nodes = T.nodes.reduce(no(L), [])), A;
    }
    function ro(A) {
      return A.nodes[0].nodes.reduce(function(N, T) {
        return N.push(
          `${T.prop}:${T.value}${T.important ? " !important" : ""}`
        ), N;
      }, []).join(";");
    }
    function no(A) {
      return function(N, T) {
        return a(A, T.prop) && A[T.prop].some(function(te) {
          return te.test(T.value);
        }) && N.push(T), N;
      };
    }
    function en(A, N, T) {
      return N ? (A = A.split(/\s+/), A.filter(function(L) {
        return N.indexOf(L) !== -1 || T.some(function(te) {
          return te.test(L);
        });
      }).join(" ")) : A;
    }
  }
  const b = {
    decodeEntities: !0
  };
  return w.defaults = {
    allowedTags: [
      // Sections derived from MDN element categories and limited to the more
      // benign categories.
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
      // Content sectioning
      "address",
      "article",
      "aside",
      "footer",
      "header",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hgroup",
      "main",
      "nav",
      "section",
      // Text content
      "blockquote",
      "dd",
      "div",
      "dl",
      "dt",
      "figcaption",
      "figure",
      "hr",
      "li",
      "menu",
      "ol",
      "p",
      "pre",
      "ul",
      // Inline text semantics
      "a",
      "abbr",
      "b",
      "bdi",
      "bdo",
      "br",
      "cite",
      "code",
      "data",
      "dfn",
      "em",
      "i",
      "kbd",
      "mark",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "time",
      "u",
      "var",
      "wbr",
      // Table content
      "caption",
      "col",
      "colgroup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr"
    ],
    // Tags that cannot be boolean
    nonBooleanAttributes: [
      "abbr",
      "accept",
      "accept-charset",
      "accesskey",
      "action",
      "allow",
      "alt",
      "as",
      "autocapitalize",
      "autocomplete",
      "blocking",
      "charset",
      "cite",
      "class",
      "color",
      "cols",
      "colspan",
      "content",
      "contenteditable",
      "coords",
      "crossorigin",
      "data",
      "datetime",
      "decoding",
      "dir",
      "dirname",
      "download",
      "draggable",
      "enctype",
      "enterkeyhint",
      "fetchpriority",
      "for",
      "form",
      "formaction",
      "formenctype",
      "formmethod",
      "formtarget",
      "headers",
      "height",
      "hidden",
      "high",
      "href",
      "hreflang",
      "http-equiv",
      "id",
      "imagesizes",
      "imagesrcset",
      "inputmode",
      "integrity",
      "is",
      "itemid",
      "itemprop",
      "itemref",
      "itemtype",
      "kind",
      "label",
      "lang",
      "list",
      "loading",
      "low",
      "max",
      "maxlength",
      "media",
      "method",
      "min",
      "minlength",
      "name",
      "nonce",
      "optimum",
      "pattern",
      "ping",
      "placeholder",
      "popover",
      "popovertarget",
      "popovertargetaction",
      "poster",
      "preload",
      "referrerpolicy",
      "rel",
      "rows",
      "rowspan",
      "sandbox",
      "scope",
      "shape",
      "size",
      "sizes",
      "slot",
      "span",
      "spellcheck",
      "src",
      "srcdoc",
      "srclang",
      "srcset",
      "start",
      "step",
      "style",
      "tabindex",
      "target",
      "title",
      "translate",
      "type",
      "usemap",
      "value",
      "width",
      "wrap",
      // Event handlers
      "onauxclick",
      "onafterprint",
      "onbeforematch",
      "onbeforeprint",
      "onbeforeunload",
      "onbeforetoggle",
      "onblur",
      "oncancel",
      "oncanplay",
      "oncanplaythrough",
      "onchange",
      "onclick",
      "onclose",
      "oncontextlost",
      "oncontextmenu",
      "oncontextrestored",
      "oncopy",
      "oncuechange",
      "oncut",
      "ondblclick",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "ondurationchange",
      "onemptied",
      "onended",
      "onerror",
      "onfocus",
      "onformdata",
      "onhashchange",
      "oninput",
      "oninvalid",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onlanguagechange",
      "onload",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onmessage",
      "onmessageerror",
      "onmousedown",
      "onmouseenter",
      "onmouseleave",
      "onmousemove",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      "onoffline",
      "ononline",
      "onpagehide",
      "onpageshow",
      "onpaste",
      "onpause",
      "onplay",
      "onplaying",
      "onpopstate",
      "onprogress",
      "onratechange",
      "onreset",
      "onresize",
      "onrejectionhandled",
      "onscroll",
      "onscrollend",
      "onsecuritypolicyviolation",
      "onseeked",
      "onseeking",
      "onselect",
      "onslotchange",
      "onstalled",
      "onstorage",
      "onsubmit",
      "onsuspend",
      "ontimeupdate",
      "ontoggle",
      "onunhandledrejection",
      "onunload",
      "onvolumechange",
      "onwaiting",
      "onwheel"
    ],
    disallowedTagsMode: "discard",
    allowedAttributes: {
      a: ["href", "name", "target"],
      // We don't currently allow img itself by default, but
      // these attributes would make sense if we did.
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"]
    },
    allowedEmptyAttributes: [
      "alt"
    ],
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta", "col"],
    // URL schemes we permit
    allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: [
      "href",
      "src",
      "cite",
      "action",
      "formaction",
      "data",
      "xlink:href",
      "poster",
      "background",
      "ping",
      "longdesc",
      "usemap",
      "codebase",
      "classid",
      "archive",
      "profile",
      "manifest",
      "itemid",
      "dynsrc",
      "lowsrc"
    ],
    allowProtocolRelative: !0,
    enforceHtmlBoundary: !1,
    parseStyleAttributes: !0,
    preserveEscapedAttributes: !1
  }, w.simpleTransform = function(v, x, R) {
    return R = R === void 0 ? !0 : R, x = x || {}, function(I, F) {
      let S;
      if (R)
        for (S in x)
          F[S] = x[S];
      else
        F = x;
      return {
        tagName: v,
        attribs: F
      };
    };
  }, Ar;
}
var Pu = /* @__PURE__ */ Mu();
const _i = /* @__PURE__ */ vc(Pu), Lu = () => Uo(), qu = [
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "main",
  "nav",
  "section",
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "ol",
  "p",
  "pre",
  "ul",
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "img",
  "kbd",
  "mark",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr"
], zu = {
  a: ["href", "name", "target"],
  span: ["class"],
  pre: ["class"],
  code: ["class"],
  img: ["src", "alt", "title", "width", "height", "loading"]
}, ju = ["innerHTML"], $u = {
  key: 1,
  class: "markdown-empty"
}, Uu = /* @__PURE__ */ ao({
  __name: "markdown-view",
  setup(e) {
    const t = Lu(), r = Jo(), n = new wc({
      html: !1,
      breaks: !0,
      linkify: !0,
      typographer: !1
    }), i = pt(
      () => t.value.content || r.value || ""
    ), s = pt(() => {
      const f = t.value.allowedTags;
      return f && f.length > 0 ? f : qu;
    }), o = pt(() => {
      const f = t.value.allowedAttributes;
      if (f)
        try {
          return JSON.parse(f);
        } catch {
        }
      return zu;
    }), l = pt(() => {
      if (!i.value) return "";
      const f = n.render(i.value);
      return _i(f, {
        allowedTags: s.value,
        allowedAttributes: o.value,
        allowedClasses: {
          code: ["language-*"],
          pre: ["language-*"],
          span: ["language-*"]
        },
        transformTags: {
          a: _i.simpleTransform("a", { rel: "noopener noreferrer" })
        }
      });
    });
    return (f, c) => l.value ? (nn(), sn("article", {
      key: 0,
      class: "data-body markdown-container",
      innerHTML: l.value
    }, null, 8, ju)) : (nn(), sn("div", $u, " No markdown content provided. "));
  }
}), Ju = ":root{--p-form-field-padding-x: .75rem;--p-form-field-padding-y: .5rem;--p-form-field-sm-padding-x: .625rem;--p-form-field-sm-padding-y: .375rem;--p-form-field-lg-padding-x: .875rem;--p-form-field-lg-padding-y: .625rem;--p-form-field-border-radius: .375rem;--p-form-field-transition-duration: .2s;--p-form-field-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgba(18, 18, 23, .05);--p-focus-ring-width: 1px;--p-focus-ring-style: solid;--p-focus-ring-color: color-mix(in srgb, var(--p-primary-color) 100%, transparent);--p-focus-ring-offset: 2px;--p-toggleswitch-width: 2.5rem;--p-toggleswitch-height: 1.5rem;--p-toggleswitch-border-radius: 30px;--p-toggleswitch-gap: .25rem;--p-toggleswitch-border-width: 1px;--p-toggleswitch-transition-duration: .2s;--p-toggleswitch-slide-duration: .2s;--p-toggleswitch-handle-size: 1rem;--p-toggleswitch-handle-border-radius: 9999px}:root{color-scheme:light dark;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-secondary: #6f7385;--p-secondary-50: color-mix(in srgb, var(--p-secondary) 5%, white);--p-secondary-100: color-mix(in srgb, var(--p-secondary) 10%, white);--p-secondary-200: color-mix(in srgb, var(--p-secondary) 20%, white);--p-secondary-300: color-mix(in srgb, var(--p-secondary) 35%, white);--p-secondary-400: color-mix(in srgb, var(--p-secondary) 65%, white);--p-secondary-500: var(--p-secondary);--p-secondary-600: color-mix(in srgb, var(--p-secondary) 80%, black);--p-secondary-700: color-mix(in srgb, var(--p-secondary) 65%, black);--p-secondary-800: color-mix(in srgb, var(--p-secondary) 55%, black);--p-secondary-900: color-mix(in srgb, var(--p-secondary) 50%, black);--p-secondary-950: color-mix(in srgb, var(--p-secondary) 30%, black);--p-danger: rgb(239, 68, 68);--p-danger-50: color-mix(in srgb, var(--p-danger) 5%, white);--p-danger-100: color-mix(in srgb, var(--p-danger) 10%, white);--p-danger-200: color-mix(in srgb, var(--p-danger) 20%, white);--p-danger-300: color-mix(in srgb, var(--p-danger) 30%, white);--p-danger-400: color-mix(in srgb, var(--p-danger) 40%, white);--p-danger-500: var(--p-danger);--p-danger-600: color-mix(in srgb, var(--p-danger) 80%, black);--p-danger-700: color-mix(in srgb, var(--p-danger) 70%, black);--p-danger-800: color-mix(in srgb, var(--p-danger) 60%, black);--p-danger-900: color-mix(in srgb, var(--p-danger) 50%, black);--p-danger-950: color-mix(in srgb, var(--p-danger) 40%, black);--p-success: rgb(34, 197, 94);--p-success-50: color-mix(in srgb, var(--p-success) 5%, white);--p-success-100: color-mix(in srgb, var(--p-success) 10%, white);--p-success-200: color-mix(in srgb, var(--p-success) 20%, white);--p-success-300: color-mix(in srgb, var(--p-success) 30%, white);--p-success-400: color-mix(in srgb, var(--p-success) 40%, white);--p-success-500: var(--p-success);--p-success-600: color-mix(in srgb, var(--p-success) 80%, black);--p-success-700: color-mix(in srgb, var(--p-success) 70%, black);--p-success-800: color-mix(in srgb, var(--p-success) 60%, black);--p-success-900: color-mix(in srgb, var(--p-success) 50%, black);--p-success-950: color-mix(in srgb, var(--p-success) 40%, black);--p-warn: rgb(249, 115, 22);--p-warn-50: color-mix(in srgb, var(--p-warn) 5%, white);--p-warn-100: color-mix(in srgb, var(--p-warn) 10%, white);--p-warn-200: color-mix(in srgb, var(--p-warn) 20%, white);--p-warn-300: color-mix(in srgb, var(--p-warn) 30%, white);--p-warn-400: color-mix(in srgb, var(--p-warn) 40%, white);--p-warn-500: var(--p-warn);--p-warn-600: color-mix(in srgb, var(--p-warn) 80%, black);--p-warn-700: color-mix(in srgb, var(--p-warn) 70%, black);--p-warn-800: color-mix(in srgb, var(--p-warn) 60%, black);--p-warn-900: color-mix(in srgb, var(--p-warn) 50%, black);--p-warn-950: color-mix(in srgb, var(--p-warn) 40%, black);--p-info: rgb(14, 165, 233);--p-info-50: color-mix(in srgb, var(--p-info) 5%, white);--p-info-100: color-mix(in srgb, var(--p-info) 10%, white);--p-info-200: color-mix(in srgb, var(--p-info) 20%, white);--p-info-300: color-mix(in srgb, var(--p-info) 30%, white);--p-info-400: color-mix(in srgb, var(--p-info) 40%, white);--p-info-500: var(--p-info);--p-info-600: color-mix(in srgb, var(--p-info) 80%, black);--p-info-700: color-mix(in srgb, var(--p-info) 70%, black);--p-info-800: color-mix(in srgb, var(--p-info) 60%, black);--p-info-900: color-mix(in srgb, var(--p-info) 50%, black);--p-info-950: color-mix(in srgb, var(--p-info) 40%, black);--p-help: rgb(168, 85, 247);--p-help-50: color-mix(in srgb, var(--p-help) 5%, white);--p-help-100: color-mix(in srgb, var(--p-help) 10%, white);--p-help-200: color-mix(in srgb, var(--p-help) 20%, white);--p-help-300: color-mix(in srgb, var(--p-help) 30%, white);--p-help-400: color-mix(in srgb, var(--p-help) 40%, white);--p-help-500: var(--p-help);--p-help-600: color-mix(in srgb, var(--p-help) 80%, black);--p-help-700: color-mix(in srgb, var(--p-help) 70%, black);--p-help-800: color-mix(in srgb, var(--p-help) 60%, black);--p-help-900: color-mix(in srgb, var(--p-help) 50%, black);--p-help-950: color-mix(in srgb, var(--p-help) 40%, black);--p-accent: rgb(20, 184, 166);--p-accent-50: color-mix(in srgb, var(--p-accent) 5%, white);--p-accent-100: color-mix(in srgb, var(--p-accent) 10%, white);--p-accent-200: color-mix(in srgb, var(--p-accent) 20%, white);--p-accent-300: color-mix(in srgb, var(--p-accent) 30%, white);--p-accent-400: color-mix(in srgb, var(--p-accent) 40%, white);--p-accent-500: var(--p-accent);--p-accent-600: color-mix(in srgb, var(--p-accent) 80%, black);--p-accent-700: color-mix(in srgb, var(--p-accent) 70%, black);--p-accent-800: color-mix(in srgb, var(--p-accent) 60%, black);--p-accent-900: color-mix(in srgb, var(--p-accent) 50%, black);--p-accent-950: color-mix(in srgb, var(--p-accent) 40%, black);--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-content-border-radius: 6px;--p-font-heading-family: var(--v-font-family-head, Arial);--p-font-heading-scale: 1;--p-font-heading-line-height: 1.5;--p-font-heading-letter-spacing: normal;--p-font-heading-stretch: normal;--p-font-heading-variation-settings: normal;--p-font-body-scale: 1;--p-font-body-line-height: 1.5;--p-font-body-letter-spacing: normal;--p-font-body-stretch: normal;--p-font-body-variation-settings: normal;--p-font-mono-family: ui-monospace}:root{--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}@media(prefers-color-scheme:dark){:root:not(.w-theme-light){--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}}:root.w-theme-dark,.w-theme-dark{color-scheme:dark;--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}:root.w-theme-light,.w-theme-light{color-scheme:light;--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}.markdown-container{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:var(--p-text-color, #333);line-height:1.6;width:100%;box-sizing:border-box;overflow-wrap:break-word;word-break:break-word}.markdown-empty{color:var(--p-text-muted-color, #999);font-style:italic;text-align:center}", Wu = { props: { type: "object", properties: { content: { type: "string", default: "", description: "Markdown source text to render (GFM)" }, "allowed-tags": { type: "array", items: { type: "string" }, default: [], description: "Override sanitizer tag whitelist (empty = built-in defaults). WARNING: widening this is a security decision — only do it for trusted input." }, "allowed-attributes": { type: "string", default: "", description: "JSON-stringified `{tag: [attr,...]}` map for sanitize-html (empty = defaults)" } } } }, Vu = {
  wippy: Wu
};
class Hu extends Wo {
  static get wippyConfig() {
    return {
      propsSchema: Vu.wippy.props,
      hostCssKeys: ["themeConfigUrl", "markdownCssUrl"],
      inlineCss: Ju,
      contentTemplate: "text/markdown"
    };
  }
  static get vueConfig() {
    return {
      rootComponent: Uu
    };
  }
}
mo(import.meta.url, Hu);
