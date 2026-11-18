import { ref as ft, inject as Ei, createApp as po, defineComponent as mo, shallowRef as go, onUnmounted as bo, computed as pt, openBlock as an, createElementBlock as ln } from "vue";
import { addCollection as xo } from "@iconify/vue";
import { config as At, addIcons as wo, on as Si, applyThemeMode as dt, host as yo, hostCss as vo, loadCss as _o, define as ko } from "@wippy-fe/proxy";
import { getActivePinia as Co, createPinia as Ro, setActivePinia as Ao } from "pinia";
var Ir = "data-wippy-visible";
function cn(e) {
  const t = e.getAttribute(Ir);
  return t === "true" ? !0 : t === "false" ? !1 : null;
}
var Eo = Object.defineProperty, Di = (e) => {
  throw TypeError(e);
}, So = (e, t, r) => t in e ? Eo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => So(e, typeof t != "symbol" ? t + "" : t, r), Ii = (e, t, r) => t.has(e) || Di("Cannot " + r), Do = (e, t, r) => (Ii(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Io = (e, t, r) => t.has(e) ? Di("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), To = (e, t, r, n) => (Ii(e, t, "write to private field"), t.set(e, r), r), Fo = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], No = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function un(e) {
  const t = e.startsWith("--") ? e : `--${e}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(t) ? t : null;
}
function Oo(...e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e)
    if (r)
      for (const [n, i] of Object.entries(r)) {
        if ((n === "@light" || n === "@dark") && i && typeof i == "object") {
          for (const [a, l] of Object.entries(i)) {
            const f = typeof l == "string" ? un(a) : null;
            f && t.add(f);
          }
          continue;
        }
        const s = typeof i == "string" ? un(n) : null;
        s && t.add(s);
      }
  return [...t].sort();
}
function Mo(e) {
  if (e.length === 0)
    return "";
  const t = e.map((r) => `  ${r}: inherit;`).join(`
`);
  return `${No} {
${t}
}`;
}
function Bo(e, t) {
  const r = Mo(t);
  r && Ti(e, r, "@wippy-fe/css-variables-bridge");
}
function Po(e, t) {
  const n = (t ?? Fo).map(async (i) => {
    const s = vo[i];
    if (!s)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${i}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await _o(s);
    } catch (a) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${i}" (${s}):`, a), null;
    }
  });
  return Promise.all(n).then((i) => {
    for (const s of i) {
      if (!s)
        continue;
      const a = document.createElement("style");
      a.textContent = s, a.setAttribute("role", "@wippy-fe/host-css"), e.appendChild(a);
    }
  });
}
function Lo(e, t) {
  const r = document.createElement("style");
  r.textContent = t, e.appendChild(r);
}
function Ti(e, t, r) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const i = new CSSStyleSheet();
    i.replaceSync(t), e.adoptedStyleSheets = [...e.adoptedStyleSheets, i];
    return;
  }
  const n = document.createElement("style");
  n.setAttribute("role", r), n.textContent = t, e.appendChild(n);
}
function zo(e, t) {
  Ti(e, t, "@wippy-fe/custom-css");
}
function Fi(e) {
  return e.__wippyHost ?? null;
}
function qo(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
function jo(e, t, r) {
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
function Ut(e, t) {
  const r = {}, n = [];
  for (const [i, s] of Object.entries(t.properties)) {
    const a = e.getAttribute(i), l = qo(i);
    if (a === null) {
      s.default !== void 0 && (r[l] = s.default);
      continue;
    }
    const f = jo(i, a, s);
    f.error ? n.push(f.error) : r[l] = f.value;
  }
  return { props: r, errors: n };
}
var $o = class {
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
}, _t, Uo = class extends HTMLElement {
  constructor() {
    super(), oe(this, "_internals"), oe(this, "_contentObserver", null), oe(this, "_initialized", !1), oe(this, "_container", null), Io(this, _t, null), oe(this, "_attachment", 0), oe(this, "_reactive", null), oe(this, "_lastProps", null), oe(this, "_lastErrors", []), oe(this, "_lastContent", null), oe(this, "_themeUnsub", null), oe(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = cn(this);
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
    return [.../* @__PURE__ */ new Set([...t, ...r, Ir])];
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
    return Fi(this);
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
        const s = Ut(this, e.propsSchema);
        e.validateProps && s.errors.push(...e.validateProps(s.props)), r = s.props, n = s.errors, this._lastProps = r, this._lastErrors = n;
      }
      const i = t ? this._lastContent ?? this._extractContent(e.contentTemplate) : null;
      t && this._lastContent === null && (this._lastContent = i), this._reactive = new $o(
        { props: r, errors: n, content: i, hasContent: t, hostVisibility: this._hostVisible },
        this.emitEvent.bind(this)
      );
    }
    return this._reactive;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    const e = ++this._attachment;
    this._internals.states.add("loading");
    try {
      const t = this.constructor.wippyConfig, r = this._initialized, n = Do(this, _t) ?? To(this, _t, this.shadowRoot ?? this.attachShadow({ mode: t.shadowMode ?? "open" }));
      let i;
      if (this._container)
        i = this._container;
      else {
        if (this.onInit(n), e !== this._attachment)
          return;
        t.inlineCss && Lo(n, t.inlineCss);
        try {
          const d = At?.theming, u = Oo(
            d?.global?.cssVariables,
            d?.children?.cssVariables
          );
          Bo(n, u);
        } catch {
        }
        if (t.customCss !== !1)
          try {
            const d = At?.theming, u = [d?.global?.customCSS, d?.children?.customCSS].filter(Boolean).join(`
`);
            u && zo(n, u);
          } catch {
          }
        (t.hostCssKeys === void 0 || t.hostCssKeys.length > 0) && Po(n, t.hostCssKeys), i = document.createElement("div"), i.setAttribute("data-wippy-theme-root", "");
        const c = t.containerClasses ?? [];
        c.length > 0 && i.classList.add(...c), n.appendChild(i), this._container = i, wo(xo);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = Si("@theme", (c) => this._applyTheme(c)));
      const { props: s, errors: a } = Ut(this, t.propsSchema);
      t.validateProps && a.push(...t.validateProps(s));
      const l = s;
      this._lastProps = l, this._lastErrors = a;
      let f = null;
      if (t.contentTemplate && (f = this._extractContent(t.contentTemplate), this._lastContent = f, this._contentObserver = new MutationObserver(() => {
        const c = this._extractContent(t.contentTemplate);
        this._lastContent = c, this._reactive?.notifyContent(c), this.onContentChanged(c);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(n, i, l, a, f, r), e !== this._attachment)
        return;
      this._internals.states.delete("loading"), this._internals.states.add("ready"), r || (this._initialized = !0), this.onReady(), e === this._attachment && this.emitEvent("load");
    } catch (t) {
      if (e !== this._attachment || (this.onError(t), e !== this._attachment))
        return;
      this._internals.states.delete("loading"), this._internals.states.add("error"), this.emitEvent("error", {
        message: t instanceof Error ? t.message : String(t),
        error: t
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
  _applyTheme(e = yo.getThemeMode?.()) {
    dt(e, this), this._container && dt(e, this._container);
  }
  disconnectedCallback() {
    const e = ++this._attachment;
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), dt("auto", this), this._container && dt("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), e === this._attachment && (this.emitEvent("unload"), e === this._attachment && (this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus));
  }
  attributeChangedCallback(e, t, r) {
    if (t === r)
      return;
    if (e === Ir) {
      const l = this._hostVisible, f = cn(this);
      if (f === l)
        return;
      this._hostVisible = f, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(f, l), this.onHostVisibilityChanged(f, l));
      return;
    }
    const n = this.constructor.wippyConfig, { props: i, errors: s } = Ut(this, n.propsSchema);
    n.validateProps && s.push(...n.validateProps(i));
    const a = i;
    this._lastProps = a, this._lastErrors = s, this._reactive?.notifyProps(a, s), this.onPropsChanged(a, s);
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
_t = /* @__PURE__ */ new WeakMap();
function Jo(e) {
  return e.__wippyHostBus ?? null;
}
function Wo(e) {
  return e.dataset.wippyPanelId ?? null;
}
var Vo = Object.defineProperty, Ho = (e, t, r) => t in e ? Vo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fe = (e, t, r) => Ho(e, typeof t != "symbol" ? t + "" : t, r);
function hn(e, t, r) {
  const n = e.createElement("div"), i = r ? t.failed : t.loading;
  n.dataset.lazyState = r ? "failed" : "loading", n.setAttribute("role", r ? "alert" : "status"), n.setAttribute("aria-label", i), n.style.cssText = "display:grid;place-items:center;text-align:center;";
  const s = t.surface === "page";
  if (n.style.cssText += s ? "block-size:100%;min-block-size:0;" : "min-block-size:2rem;font-size:.875rem;", r)
    n.style.color = "var(--p-danger-500, currentColor)", n.textContent = !s && t.iconOnly ? "⚠" : i, !s && t.iconOnly && (n.title = i);
  else {
    const a = e.createElement("style");
    a.textContent = '@media (prefers-reduced-motion: no-preference) { [data-lazy-state="loading"] > [data-wippy-spinner] { animation: wippy-lazy-spin 1s linear infinite; } } @keyframes wippy-lazy-spin { to { transform: rotate(1turn); } }';
    const l = e.createElement("span");
    l.dataset.wippySpinner = "", l.setAttribute("aria-hidden", "true"), l.style.cssText = "display:block;box-sizing:border-box;inline-size:1em;block-size:1em;border:2px solid var(--p-surface-300, currentColor);border-top-color:var(--p-primary-color, currentColor);border-radius:50%;", l.style.fontSize = s ? "2rem" : "1em", n.append(a, l);
  }
  return n;
}
var Yo = /* @__PURE__ */ Symbol("wippy:emit"), Ni = /* @__PURE__ */ Symbol("wippy:props"), Go = /* @__PURE__ */ Symbol("wippy:props_error"), Oi = /* @__PURE__ */ Symbol("wippy:content"), Zo = /* @__PURE__ */ Symbol("wippy:panel-id"), Xo = /* @__PURE__ */ Symbol("wippy:layout-bus"), Ko = /* @__PURE__ */ Symbol("wippy:host"), Qo = /* @__PURE__ */ Symbol("wippy:host-visibility");
function ea() {
  const e = Ei(Ni);
  if (!e)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return e;
}
function ta() {
  const e = Ei(Oi);
  if (!e)
    throw new Error("useContent() must be called inside a WippyVueElement with contentTemplate configured");
  return e;
}
var mt = /* @__PURE__ */ new WeakMap();
function fn(e, t) {
  const r = mt.get(e);
  if (r)
    return r;
  const n = Promise.resolve().then(t);
  return mt.set(e, n), n.catch(() => {
    mt.get(e) === n && mt.delete(e);
  }), n;
}
var ra = class extends Uo {
  constructor() {
    super(...arguments), Fe(this, "_vueApp", null), Fe(this, "_mountingApp", !1), Fe(this, "_mountState", "idle"), Fe(this, "_feedback", null), Fe(this, "_propsRef", ft({})), Fe(this, "_errorsRef", ft([])), Fe(this, "_contentRef", ft(null)), Fe(this, "_hostVisibilityRef", ft(null)), Fe(this, "_bridgeAbort", null);
  }
  /**
   * Override to provide Vue-specific configuration.
   */
  static get vueConfig() {
    throw new Error("WippyVueElement subclass must override static get vueConfig()");
  }
  /** Prepare the implementation without creating a Vue or Pinia instance. */
  static async preloadImplementation() {
    const e = this.vueConfig;
    e.mountLifecycle && !e.rootComponent && e.lazyConfig && await fn(this, e.lazyConfig);
  }
  /** Undefined on configurations that use only the legacy load event. */
  get wippyMountState() {
    return this.constructor.vueConfig.mountLifecycle ? this._mountState : void 0;
  }
  onMount(e, t, r, n, i, s) {
    const a = this.constructor, l = a.vueConfig, f = new AbortController();
    this._bridgeAbort = f;
    const c = () => !f.signal.aborted && this._bridgeAbort === f;
    this._mountState = "mounting", this._propsRef.value = r, this._errorsRef.value = n, this._contentRef.value = i ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const u of n)
      if (this.emitEvent("invalid", { message: u }), !c())
        return;
    this.reactive.props.subscribe((u, p) => {
      this._propsRef.value = u, this._errorsRef.value = [...p];
      for (const o of p)
        this.emitEvent("invalid", { message: o });
    }, { signal: f.signal }), this.reactive.content && this.reactive.content.subscribe((u) => {
      this._contentRef.value = u;
    }, { signal: f.signal }), this.reactive.hostVisibility.subscribe((u) => {
      this._hostVisibilityRef.value = u;
    }, { signal: f.signal });
    const d = (u) => {
      if (!c())
        return;
      const p = Co(), o = po(u.rootComponent);
      let h = !1, m = !1, g, k;
      this._mountingApp = !0;
      try {
        const v = Ro();
        if (u.piniaPlugins)
          for (const _ of u.piniaPlugins)
            v.use(_);
        o.use(v);
        for (const _ of u.plugins ?? [])
          o.use(_);
        if (o.provide(Ni, this._propsRef), o.provide(Go, this._errorsRef), o.provide(Yo, this.emitEvent.bind(this)), o.provide(Oi, this._contentRef), o.provide(Qo, this._hostVisibilityRef), o.provide(Zo, Wo(this)), o.provide(Xo, Jo(this)), o.provide(Ko, Fi(this)), u.providers?.(o, this), !c())
          return;
        if (k = o.config.errorHandler, l.mountLifecycle && (o.config.errorHandler = (_, C, x) => {
          m || (g = _), m = !0, k?.(_, C, x);
        }), o.mount(t), h = !0, m)
          throw g;
        c() && (this._vueApp = o);
      } finally {
        l.mountLifecycle && h && (o.config.errorHandler = k);
        try {
          h && (m || !c()) && o.unmount();
        } finally {
          Ao(p), this._mountingApp = !1;
        }
      }
      l.mountLifecycle && queueMicrotask(() => {
        c() && this.isConnected && (this._mountState = "mounted", this.dispatchEvent(new Event("wippy-mounted")));
      });
    };
    if (l.rootComponent) {
      if (this._mountingApp && l.mountLifecycle) {
        queueMicrotask(() => {
          try {
            d(l);
          } catch (u) {
            c() && (this._mountState = "failed", this.emitEvent("error", { message: u instanceof Error ? u.message : String(u), error: u }));
          }
        });
        return;
      }
      try {
        d(l);
      } catch (u) {
        if (c())
          throw this._mountState = "failed", u;
      }
    } else if (l.lazyConfig) {
      const u = t.ownerDocument, p = l.lazyUi;
      p?.surface === "page" && (t.style.blockSize = "100%", t.style.minBlockSize = "0");
      let o = !1, h, m;
      const g = () => {
        clearTimeout(h), clearTimeout(m), this._feedback?.remove(), this._feedback = null;
      };
      f.signal.addEventListener("abort", g, { once: !0 });
      const k = () => {
        if (!c() || o)
          return;
        const x = p ? hn(u, p, !1) : u.createElement("wippy-loading");
        x.setAttribute("no-bg", ""), this._feedback = x, t.appendChild(x);
      }, v = (x) => {
        if (!c())
          return;
        o = !0, g(), this._mountState = "failed";
        const b = p?.failed ?? (x instanceof Error ? x.message : String(x)), y = p ? hn(u, p, !0) : u.createElement("wippy-error");
        p || (y.setAttribute("title", "Failed to load"), y.setAttribute("message", b)), this._feedback = y, t.appendChild(y), this.emitEvent("error", p ? { message: b, error: x } : { message: b });
      }, _ = p?.delay ?? (p?.surface === "compact" ? 200 : 0);
      _ > 0 ? h = setTimeout(k, _) : k(), p && (m = setTimeout(() => v(new Error("The component did not load in time.")), p.timeout ?? 3e4)), (l.mountLifecycle ? fn(a, l.lazyConfig) : l.lazyConfig()).then((x) => {
        !c() || o || (o = !0, g(), d(x));
      }, (x) => {
        o || v(x);
      }).catch(v);
    } else
      throw this._mountState = "failed", new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._mountState = "idle", this._feedback?.remove(), this._feedback = null;
    const e = this._vueApp;
    this._vueApp = null, e?.unmount();
  }
};
const pn = {};
function na(e) {
  let t = pn[e];
  if (t)
    return t;
  t = pn[e] = [];
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
  const r = na(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(n) {
    let i = "";
    for (let s = 0, a = n.length; s < a; s += 3) {
      const l = parseInt(n.slice(s + 1, s + 3), 16);
      if (l < 128) {
        i += r[l];
        continue;
      }
      if ((l & 224) === 192 && s + 3 < a) {
        const f = parseInt(n.slice(s + 4, s + 6), 16);
        if ((f & 192) === 128) {
          const c = l << 6 & 1984 | f & 63;
          c < 128 ? i += "��" : i += String.fromCharCode(c), s += 3;
          continue;
        }
      }
      if ((l & 240) === 224 && s + 6 < a) {
        const f = parseInt(n.slice(s + 4, s + 6), 16), c = parseInt(n.slice(s + 7, s + 9), 16);
        if ((f & 192) === 128 && (c & 192) === 128) {
          const d = l << 12 & 61440 | f << 6 & 4032 | c & 63;
          d < 2048 || d >= 55296 && d <= 57343 ? i += "���" : i += String.fromCharCode(d), s += 6;
          continue;
        }
      }
      if ((l & 248) === 240 && s + 9 < a) {
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
const dn = {};
function ia(e) {
  let t = dn[e];
  if (t)
    return t;
  t = dn[e] = [];
  for (let r = 0; r < 128; r++) {
    const n = String.fromCharCode(r);
    /^[0-9a-z]$/i.test(n) ? t.push(n) : t.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
  }
  for (let r = 0; r < e.length; r++)
    t[e.charCodeAt(r)] = e[r];
  return t;
}
function Oe(e, t, r) {
  typeof t != "string" && (r = t, t = Oe.defaultChars), typeof r > "u" && (r = !0);
  const n = ia(t);
  let i = "";
  for (let s = 0, a = e.length; s < a; s++) {
    const l = e.charCodeAt(s);
    if (r && l === 37 && s + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(s + 1, s + 3))) {
      i += e.slice(s, s + 3), s += 2;
      continue;
    }
    if (l < 128) {
      i += n[l];
      continue;
    }
    if (l >= 55296 && l <= 57343) {
      if (l >= 55296 && l <= 56319 && s + 1 < a) {
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
Oe.defaultChars = ";/?:@&=+$,-_.!~*'()#";
Oe.componentChars = "-_.!~*'()";
function Tr(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function Et() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const sa = /^([a-z0-9.+-]+:)/i, oa = /:[0-9]*$/, aa = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, la = ["<", ">", '"', "`", " ", "\r", `
`, "	"], ca = ["{", "}", "|", "\\", "^", "`"].concat(la), ua = ["'"].concat(ca), mn = ["%", "/", "?", ";", "#"].concat(ua), gn = ["/", "?", "#"], ha = 255, bn = /^[+a-z0-9A-Z_-]{0,63}$/, fa = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, xn = {
  javascript: !0,
  "javascript:": !0
}, wn = {
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
function Fr(e, t) {
  if (e && e instanceof Et) return e;
  const r = new Et();
  return r.parse(e, t), r;
}
Et.prototype.parse = function(e, t) {
  let r, n, i, s = e;
  if (s = s.trim(), !t && e.split("#").length === 1) {
    const c = aa.exec(s);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  let a = sa.exec(s);
  if (a && (a = a[0], r = a.toLowerCase(), this.protocol = a, s = s.substr(a.length)), (t || a || s.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = s.substr(0, 2) === "//", i && !(a && xn[a]) && (s = s.substr(2), this.slashes = !0)), !xn[a] && (i || a && !wn[a])) {
    let c = -1;
    for (let h = 0; h < gn.length; h++)
      n = s.indexOf(gn[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    let d, u;
    c === -1 ? u = s.lastIndexOf("@") : u = s.lastIndexOf("@", c), u !== -1 && (d = s.slice(0, u), s = s.slice(u + 1), this.auth = d), c = -1;
    for (let h = 0; h < mn.length; h++)
      n = s.indexOf(mn[h]), n !== -1 && (c === -1 || n < c) && (c = n);
    c === -1 && (c = s.length), s[c - 1] === ":" && c--;
    const p = s.slice(0, c);
    s = s.slice(c), this.parseHost(p), this.hostname = this.hostname || "";
    const o = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!o) {
      const h = this.hostname.split(/\./);
      for (let m = 0, g = h.length; m < g; m++) {
        const k = h[m];
        if (k && !k.match(bn)) {
          let v = "";
          for (let _ = 0, C = k.length; _ < C; _++)
            k.charCodeAt(_) > 127 ? v += "x" : v += k[_];
          if (!v.match(bn)) {
            const _ = h.slice(0, m), C = h.slice(m + 1), x = k.match(fa);
            x && (_.push(x[1]), C.unshift(x[2])), C.length && (s = C.join(".") + s), this.hostname = _.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > ha && (this.hostname = ""), o && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const l = s.indexOf("#");
  l !== -1 && (this.hash = s.substr(l), s = s.slice(0, l));
  const f = s.indexOf("?");
  return f !== -1 && (this.search = s.substr(f), s = s.slice(0, f)), s && (this.pathname = s), wn[r] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
Et.prototype.parseHost = function(e) {
  let t = oa.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Ge,
  encode: Oe,
  format: Tr,
  parse: Fr
}, Symbol.toStringTag, { value: "Module" })), Mi = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Bi = /[\0-\x1F\x7F-\x9F]/, da = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Pr = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/, Pi = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/, Li = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Mi,
  Cc: Bi,
  Cf: da,
  P: Pr,
  S: Pi,
  Z: Li
}, Symbol.toStringTag, { value: "Module" })), ga = [
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
function zi(e) {
  return e === 0 || e >= 55296 && e <= 57343 || e > 1114111;
}
function qi(e) {
  return zi(e) ? 65533 : e >= 128 && e <= 159 && ga[e - 128] || e;
}
function ba(e) {
  return zi(e) ? 65533 : e;
}
function xa(e) {
  return e - 1 >>> 0 < 127 || e - 160 >>> 0 < 55136 ? String.fromCharCode(e) : String.fromCodePoint(qi(e));
}
const ve = /* @__PURE__ */ (() => {
  const e = new Uint8Array(127);
  let t = 0;
  for (let r = 33; r <= 126; r++)
    r !== 34 && r !== 36 && r !== 92 && (e[r] = t++);
  return e;
})();
function wa(e, t, r, n, i, s) {
  const l = e.length, f = s * 90;
  let c = 0;
  const d = () => {
    const R = ve[e.charCodeAt(c++)];
    return R < s ? R : R * 91 - f + ve[e.charCodeAt(c++)];
  }, u = r - n, p = r + i, o = new Int32Array(p);
  o.fill(-1, n, s), o.fill(-1, s + u, p);
  const h = new Int32Array(p), m = new Int32Array(p);
  function g(R, I) {
    let F = 0, S = I;
    const Y = I + R;
    for (; S < Y; ) {
      const P = ve[e.charCodeAt(c++)];
      if (P < 89)
        F += P, o[S++] = F;
      else if (P === 89) {
        let B = ve[e.charCodeAt(c++)] + 2;
        for (; B--; )
          o[S++] = ++F;
      } else {
        const B = ve[e.charCodeAt(c++)];
        F += 89 + // eslint-disable-next-line unicorn/prefer-minimal-ternary -- branches read a different number of side-effecting input bytes
        (B < 90 ? B * 91 + ve[e.charCodeAt(c++)] : ve[e.charCodeAt(c++)] * 8281 + ve[e.charCodeAt(c++)] * 91 + ve[e.charCodeAt(c++)]), o[S++] = F;
      }
    }
  }
  g(n, 0), g(u, s);
  const k = new Int32Array(i * 2);
  let v = 0, _ = 0;
  function C(R, I) {
    for (let F = 0; F < R; F++) {
      const S = I + F, Y = d(), P = d();
      k[_ * 2] = Y, k[_ * 2 + 1] = P, _ += 1, h[S] = v;
      const B = (o[Y] < 0 ? m[Y] : 1) + (o[P] < 0 ? m[P] : 1);
      m[S] = B, v += B;
    }
  }
  C(i - s + n, s + u), C(s - n, n);
  const x = new Uint16Array(v);
  let b = 0;
  for (let R = 0; R < _; R++)
    for (let I = 0; I < 2; I++) {
      const F = k[R * 2 + I], S = o[F];
      if (S < 0) {
        let Y = h[F];
        const P = Y + m[F];
        for (; Y < P; )
          x[b++] = x[Y++];
      } else
        x[b++] = S;
    }
  const y = new Uint16Array(t);
  let w = 0;
  for (; c < l; ) {
    let R = ve[e.charCodeAt(c++)];
    R >= s && (R = R * 91 - f + ve[e.charCodeAt(c++)]);
    const I = o[R];
    if (I < 0) {
      let F = h[R];
      const S = F + m[R];
      for (; F < S; )
        y[w++] = x[F++];
    } else
      y[w++] = I;
  }
  return y;
}
const ji = /* @__PURE__ */ wa("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61), $i = /* @__PURE__ */ new Uint16Array([
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
const Ze = 32, Ui = 21, ya = 2097151, Nr = 2047;
let Ji = 0;
function va(e) {
  const t = e >>> Ui;
  return t === Nr ? Ji : t;
}
function Lr(e) {
  return e - se.ZERO >>> 0 <= 9;
}
function Wi(e) {
  return (e | Ze) - se.LOWER_A >>> 0 <= 5;
}
function Vi(e) {
  return (e | Ze) - se.LOWER_A >>> 0 <= 25;
}
function _a(e) {
  return e === se.EQUALS || Vi(e) || Lr(e);
}
var de;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(de || (de = {}));
var Re;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Re || (Re = {}));
class ka {
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
      const a = t.charCodeAt(r);
      if (Lr(a) || Wi(a)) {
        const l = a <= se.NINE ? a - se.ZERO : (a | Ze) - se.LOWER_A + 10;
        i = i * 16 + l, s += 1, r += 1;
      } else
        return this.result = i, this.consumed = s, this.emitNumericEntity(a, 3);
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
      const a = t.charCodeAt(r) - se.ZERO;
      if (a >>> 0 > 9)
        return this.result = i, this.consumed = s, this.emitNumericEntity(a + se.ZERO, 2);
      i = i * 10 + a, s += 1, r += 1;
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
    return this.emitCodePoint((this.decodeTree === $i ? ba : qi)(this.result), this.consumed), this.errors && (t !== se.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
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
    return this.consumed = t, this.excess = r, this.result === 0 || this.decodeMode === Re.Attribute && (i === 0 || r > 1 || _a(n)) ? 0 : this.emitNotTerminatedNamedEntity();
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
    let { treeIndex: a } = this, { excess: l } = this, { consumed: f } = this, c = n[a];
    for (; r < i; ) {
      for (; (c & (Z.VALUE_LENGTH | Z.FLAG13)) === 0 && (c & Z.JUMP_TABLE) !== 0; ) {
        const o = t.charCodeAt(r), h = c & Z.JUMP_TABLE, m = (c & Z.BRANCH_LENGTH) >> 7;
        if (m === 0) {
          if (o !== h)
            return this.flushAndEmitLegacyOrReject(f, l, o, 0);
          a += 1;
        } else {
          const g = o - h;
          if (g >>> 0 >= m)
            return this.flushAndEmitLegacyOrReject(f, l, o, 0);
          const k = n[a + 1 + g];
          if (k === 0)
            return this.flushAndEmitLegacyOrReject(f, l, o, 0);
          a = a + m + k & 65535;
        }
        if (c = n[a], r += 1, l += 1, r >= i)
          break;
      }
      if (r >= i)
        break;
      if ((c & (Z.VALUE_LENGTH | Z.FLAG13)) === Z.FLAG13) {
        const o = (c & Z.BRANCH_LENGTH) >> 7;
        let { runConsumed: h } = this;
        if (h === 0) {
          const m = t.charCodeAt(r);
          if (m !== (c & Z.JUMP_TABLE))
            return this.flushAndEmitLegacyOrReject(f, l, m, 0);
          r += 1, l += 1, h = 1;
        }
        for (; h < o; ) {
          if (r >= i)
            return this.treeIndex = a, this.excess = l, this.consumed = f, this.runConsumed = h, -1;
          const m = h - 1, k = n[a + 1 + (m >> 1)] >> ((m & 1) << 3) & 255, v = t.charCodeAt(r);
          if (v !== k)
            return this.runConsumed = 0, this.flushAndEmitLegacyOrReject(f, l, v, 0);
          r += 1, l += 1, h += 1;
        }
        this.runConsumed = 0, a += 1 + (o >> 1), c = n[a];
        continue;
      }
      const d = c >>> 14, u = t.charCodeAt(r);
      if (d !== 0) {
        if (!s && (c & Z.FLAG13) === 0 && (this.result = a, f += l - 1, l = 1), u === se.SEMI)
          return this.emitNamedEntityData(a, d, f + l);
        if (d === 1)
          return this.flushAndEmitLegacyOrReject(f, l, u, d);
      }
      const p = Hi(n, c, a + (d || 1), u);
      if (p < 0)
        return this.flushAndEmitLegacyOrReject(f, l, u, d);
      a = p, c = n[a], r += 1, l += 1;
    }
    return !s && c >>> 14 && (c & Z.FLAG13) === 0 && (this.result = a, f += l - 1, l = 1), this.treeIndex = a, this.excess = l, this.consumed = f, -1;
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
function Hi(e, t, r, n) {
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
  const a = i + 1 >> 1, l = r + a + i;
  for (let f = 0; f < i; f++) {
    const d = e[r + (f >> 1)] >> ((f & 1) << 3) & 255;
    if (d === n) {
      const u = r + a + f;
      return l + e[u] & 65535;
    }
    if (d > n)
      return -1;
  }
  return -1;
}
function yn(e, t, r) {
  return r === 1 ? String.fromCharCode(e[t] & Z.VALUE_MASK) : r === 2 ? String.fromCharCode(e[t + 1]) : String.fromCharCode(e[t + 1], e[t + 2]);
}
function Ca(e, t, r) {
  let n = t + 1, i = 0, s = n;
  if (n < r && (e.charCodeAt(n) | Ze) === se.LOWER_X)
    for (n += 1, s = n; n < r; ) {
      const l = e.charCodeAt(n);
      if (Lr(l))
        i = i * 16 + (l - se.ZERO);
      else if (Wi(l))
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
  let a = n - t;
  return a >= Nr && (Ji = a, a = Nr), a << Ui | i;
}
function Ra(e, t, r) {
  const n = ji;
  let i = e.indexOf("&");
  if (i < 0)
    return e;
  const s = e.length;
  let a = 0, l = "";
  const f = n[0], c = f & Z.JUMP_TABLE, d = (f & Z.BRANCH_LENGTH) >> 7;
  do {
    const u = i + 1, p = e.charCodeAt(u);
    let o, h;
    if (p === se.NUM) {
      const m = Ca(e, u, s);
      o = va(m), o > 0 && e.charCodeAt(u + o - 1) !== se.SEMI && (o = 0), h = o === 0 ? "" : xa(m & ya);
    } else if (Vi(p)) {
      o = 0, h = "";
      const m = p - c;
      let g;
      if (m >>> 0 < d) {
        const x = n[1 + m];
        g = x === 0 ? -1 : d + x & 65535;
      } else
        g = -1;
      let k = 0, v = 0, _ = g < 0 ? 0 : n[g], C = u + 1;
      e: for (; C < s; ) {
        for (
          ;
          // Value-less, non-run node with a nonzero jump offset.
          (_ & (Z.VALUE_LENGTH | Z.FLAG13)) === 0 && (_ & Z.JUMP_TABLE) !== 0;
        ) {
          const w = _ & Z.JUMP_TABLE, R = (_ & Z.BRANCH_LENGTH) >> 7;
          if (R === 0) {
            if (e.charCodeAt(C) !== w)
              break e;
            g += 1;
          } else {
            const I = e.charCodeAt(C) - w;
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
          const w = (_ & Z.BRANCH_LENGTH) >> 7;
          if (e.charCodeAt(C) !== (_ & Z.JUMP_TABLE))
            break;
          C += 1;
          const R = w - 1;
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
          g += 1 + (w >> 1), _ = n[g];
          continue;
        }
        const x = _ >>> 14, b = e.charCodeAt(C);
        if (x !== 0) {
          if (b === se.SEMI) {
            o = C - u + 1, h = x === 1 ? String.fromCharCode(_ & Z.VALUE_MASK) : yn(n, g, x);
            break;
          }
          if (x === 1)
            break;
        }
        const y = Hi(n, _, g + (x || 1), b);
        if (y < 0)
          break;
        g = y, _ = n[g], C += 1;
      }
      h === "" && o > 0 && (h = yn(n, k, v));
    } else
      o = 0, h = "";
    o === 0 || r ? i = u : (a < i && (l += e.slice(a, i)), l += h, i = a = u + o), e.charCodeAt(i) !== se.AMP && (i = e.indexOf("&", i));
  } while (i >= 0);
  return l + e.slice(a);
}
function Yi(e) {
  return Ra(e, !0, !1);
}
function Gi(e) {
  return e === 34 ? "&quot;" : e === 38 ? "&amp;" : e === 39 ? "&apos;" : e === 60 ? "&lt;" : e === 62 ? "&gt;" : "&nbsp;";
}
const Aa = 1342177476, Jt = /["&'<>\u0080-\uFFFF]/g;
function vn(e) {
  return e >= 128 || e >= 32 && e < 64 && (Aa >>> e & 1) === 1;
}
function Zi(e) {
  const { length: t } = e;
  let r, n = 0, i = 0;
  for (; i < t; ) {
    const s = e.charCodeAt(i);
    if (!vn(s)) {
      const l = Math.min(i + 32, t);
      let f = i + 1;
      for (; f < l && !vn(e.charCodeAt(f)); )
        f++;
      if (f < l) {
        i = f;
        continue;
      }
      if (f >= t || (Jt.lastIndex = f, !Jt.test(e)))
        break;
      i = Jt.lastIndex - 1;
      continue;
    }
    if (r === void 0 ? r = e.substring(0, i) : n !== i && (r += e.substring(n, i)), s < 64) {
      r += Gi(s), n = i += 1;
      continue;
    }
    const a = e.codePointAt(i);
    r += `&#x${a.toString(16)};`, a !== s && i++, n = i += 1;
  }
  return r === void 0 ? e : (n < t && (r += e.substr(n)), r);
}
function Xi(e, t) {
  if (e.lastIndex = 0, !e.test(t))
    return t;
  let r = "", n = 0;
  do {
    const i = e.lastIndex - 1;
    n !== i && (r += t.substring(n, i));
    const s = t.charCodeAt(i);
    r += Gi(s), n = i + 1;
  } while (e.test(t));
  return r + t.substring(n);
}
const Ea = /["&\u{A0}]/gu;
function Sa(e) {
  return Xi(Ea, e);
}
const Da = /[&<>\u{A0}]/gu;
function Ia(e) {
  return Xi(Da, e);
}
var Ta = class {
  src_Any = Mi.source;
  src_Cc = Bi.source;
  src_Z = Li.source;
  src_P = Pr.source;
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
    let a = `${n}${s}{0,1000}${i}`;
    for (let l = 2; l <= r; l++) a = `${n}(?:${s}|${a}){0,1000}${i}`;
    return a;
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
}, Wt = {
  validate: (e, t, r) => {
    const n = r.re.get_http_validator();
    n.lastIndex = t;
    const i = n.exec(e);
    return i ? i[0].length : 0;
  },
  normalize: (e, t) => t.normalize(e)
}, Fa = {
  "http:": Wt,
  "https:": Wt,
  "ftp:": Wt,
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
}, Na = "a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw", Oa = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф";
function Ma() {
  const e = Oa.split("|");
  return Na.split("|").forEach((t) => {
    const r = t.indexOf(":"), n = t.slice(0, r);
    for (const i of t.slice(r + 1)) e.push(n + i);
  }), e;
}
var Ba = {
  fuzzyLink: !1,
  fuzzyEmail: !0,
  fuzzyIP: !1,
  "---": !1,
  tlds: Ma(),
  urlAuth: !1,
  maxLength: 1e4
}, _n = class {
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
}, Pa = class {
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
      ...Ba,
      ...r
    }, this.__schemas__ = { ...Fa }, this.re = t || new Ta(), this.re.set({
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
    let n, i, s, a, l, f, c = !1, d = !1, u = !1, p = 0;
    if (!e.length) return null;
    for (r.lastIndex = 0, this.__opts__.fuzzyLink && this.__schemas__["http:"] && (n = this.re.get_fuzzy_link_search(), n.lastIndex = 0), this.__opts__.fuzzyEmail && this.__schemas__["mailto:"] && (i = this.re.get_fuzzy_mail_host_search(), i.lastIndex = 0, s = this.re.get_mail_name_validator()); ; ) {
      const o = Math.max(p - 1, 0);
      if (i && s && !u && (!l || l.index < p))
        for (i.lastIndex < o && (i.lastIndex = o); ; ) {
          const v = i.exec(e);
          if (!v) {
            u = !0, l = void 0;
            break;
          }
          const _ = s.exec(e.slice(Math.max(0, v.index - 65), v.index));
          if (_) {
            if (l = {
              schema: "mailto:",
              index: v.index - _[1].length,
              lastIndex: v.index + v[0].length
            }, l.index >= p) break;
            i.lastIndex < o && (i.lastIndex = o);
          }
        }
      if (n && !d && (!a || a.index < p))
        for (n.lastIndex < o && (n.lastIndex = o); ; ) {
          const v = n.exec(e);
          if (!v) {
            d = !0, a = void 0;
            break;
          }
          if (a = {
            schema: "",
            index: v.index + v[1].length,
            lastIndex: v.index + v[0].length
          }, a.index >= p) break;
          n.lastIndex < o && (n.lastIndex = o);
        }
      let h = l;
      (!h || a && (a.index < h.index || a.index === h.index && a.lastIndex > h.lastIndex)) && (h = a);
      let m;
      if (!c) for (; ; ) {
        if (!f) {
          r.lastIndex < o && (r.lastIndex = o);
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
        const v = f;
        f = void 0;
        const _ = this.testSchemaAt(e, v.schema, v.lastIndex);
        if (_) {
          m = {
            schema: v.schema,
            index: v.index,
            lastIndex: v.lastIndex + _
          };
          break;
        }
      }
      let g = m;
      if ((!g || l && (l.index < g.index || l.index === g.index && l.lastIndex > g.lastIndex)) && (g = l), (!g || a && (a.index < g.index || a.index === g.index && a.lastIndex > g.lastIndex)) && (g = a), !g) break;
      g === l ? l = void 0 : g === a && (a = void 0);
      const k = new _n(e, g.schema, g.index, g.lastIndex);
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
    const n = new _n(e, t[2], t.index + t[1].length, t.index + t[0].length + r);
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
const Ye = 2147483647, Ae = 36, zr = 1, rt = 26, La = 38, za = 700, Ki = 72, Qi = 128, es = "-", qa = /^xn--/, ja = /[^\0-\x7F]/, $a = /[\x2E\u3002\uFF0E\uFF61]/g, Ua = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Vt = Ae - zr, Ee = Math.floor, Ht = String.fromCharCode;
function Me(e) {
  throw new RangeError(Ua[e]);
}
function Ja(e, t) {
  const r = [];
  let n = e.length;
  for (; n--; )
    r[n] = t(e[n]);
  return r;
}
function ts(e, t) {
  const r = e.split("@");
  let n = "";
  r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace($a, ".");
  const i = e.split("."), s = Ja(i, t).join(".");
  return n + s;
}
function rs(e) {
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
const Wa = (e) => String.fromCodePoint(...e), Va = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Ae;
}, kn = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, ns = function(e, t, r) {
  let n = 0;
  for (e = r ? Ee(e / za) : e >> 1, e += Ee(e / t); e > Vt * rt >> 1; n += Ae)
    e = Ee(e / Vt);
  return Ee(n + (Vt + 1) * e / (e + La));
}, is = function(e) {
  const t = [], r = e.length;
  let n = 0, i = Qi, s = Ki, a = e.lastIndexOf(es);
  a < 0 && (a = 0);
  for (let l = 0; l < a; ++l)
    e.charCodeAt(l) >= 128 && Me("not-basic"), t.push(e.charCodeAt(l));
  for (let l = a > 0 ? a + 1 : 0; l < r; ) {
    const f = n;
    for (let d = 1, u = Ae; ; u += Ae) {
      l >= r && Me("invalid-input");
      const p = Va(e.charCodeAt(l++));
      p >= Ae && Me("invalid-input"), p > Ee((Ye - n) / d) && Me("overflow"), n += p * d;
      const o = u <= s ? zr : u >= s + rt ? rt : u - s;
      if (p < o)
        break;
      const h = Ae - o;
      d > Ee(Ye / h) && Me("overflow"), d *= h;
    }
    const c = t.length + 1;
    s = ns(n - f, c, f == 0), Ee(n / c) > Ye - i && Me("overflow"), i += Ee(n / c), n %= c, t.splice(n++, 0, i);
  }
  return String.fromCodePoint(...t);
}, ss = function(e) {
  const t = [];
  e = rs(e);
  const r = e.length;
  let n = Qi, i = 0, s = Ki;
  for (const f of e)
    f < 128 && t.push(Ht(f));
  const a = t.length;
  let l = a;
  for (a && t.push(es); l < r; ) {
    let f = Ye;
    for (const d of e)
      d >= n && d < f && (f = d);
    const c = l + 1;
    f - n > Ee((Ye - i) / c) && Me("overflow"), i += (f - n) * c, n = f;
    for (const d of e)
      if (d < n && ++i > Ye && Me("overflow"), d === n) {
        let u = i;
        for (let p = Ae; ; p += Ae) {
          const o = p <= s ? zr : p >= s + rt ? rt : p - s;
          if (u < o)
            break;
          const h = u - o, m = Ae - o;
          t.push(
            Ht(kn(o + h % m, 0))
          ), u = Ee(h / m);
        }
        t.push(Ht(kn(u, 0))), s = ns(i, c, l === a), i = 0, ++l;
      }
    ++i, ++n;
  }
  return t.join("");
}, Ha = function(e) {
  return ts(e, function(t) {
    return qa.test(t) ? is(t.slice(4).toLowerCase()) : t;
  });
}, Ya = function(e) {
  return ts(e, function(t) {
    return ja.test(t) ? "xn--" + ss(t) : t;
  });
}, Cn = {
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
    decode: rs,
    encode: Wa
  },
  decode: is,
  encode: ss,
  toASCII: Ya,
  toUnicode: Ha
};
var Rn = Object.defineProperty, os = (e, t) => {
  let r = {};
  for (var n in e) Rn(r, n, {
    get: e[n],
    enumerable: !0
  });
  return Rn(r, Symbol.toStringTag, { value: "Module" }), r;
}, Ga = /* @__PURE__ */ os({
  arrayReplaceAt: () => Za,
  asciiTrim: () => Nt,
  callable: () => as,
  escapeHtml: () => Pe,
  escapeRE: () => ol,
  fromCodePoint: () => nt,
  isMdAsciiPunct: () => ot,
  isPunctChar: () => cs,
  isPunctCharCode: () => st,
  isSpace: () => ne,
  isValidEntityCode: () => qr,
  isWhiteSpace: () => it,
  lib: () => al,
  normalizeReference: () => Ft,
  unescapeAll: () => Xe,
  unescapeMd: () => el
});
function as(e) {
  const t = function(...r) {
    return Reflect.construct(e, r, new.target && new.target !== t ? new.target : e);
  };
  return Object.defineProperty(t, "name", { value: e.name }), Object.setPrototypeOf(t, e), t.prototype = e.prototype, t;
}
function Za(e, t, r) {
  return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function qr(e) {
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
var ls = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, Xa = new RegExp(`${ls.source}|${/&([a-z#][a-z0-9]{1,31});/gi.source}`, "gi"), Ka = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function Qa(e, t) {
  if (t.charCodeAt(0) === 35 && Ka.test(t)) {
    const n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return qr(n) ? nt(n) : e;
  }
  const r = Yi(e);
  return r !== e ? r : e;
}
function el(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(ls, "$1");
}
function Xe(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(Xa, function(t, r, n) {
    return r || Qa(t, n);
  });
}
var tl = /[&<>"]/, rl = /[&<>"]/g, nl = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function il(e) {
  return nl[e];
}
function Pe(e) {
  return tl.test(e) ? e.replace(rl, il) : e;
}
var sl = /[.?*+^$[\]\\(){}|-]/g;
function ol(e) {
  return e.replace(sl, "\\$&");
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
function cs(e) {
  return Pr.test(e) || Pi.test(e);
}
function st(e) {
  return cs(nt(e));
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
function Ft(e) {
  return e = e.trim().replace(/\s+/g, " "), e.toLowerCase().toUpperCase();
}
function An(e) {
  return e === 32 || e === 9 || e === 10 || e === 13;
}
function Nt(e) {
  let t = 0;
  for (; t < e.length && An(e.charCodeAt(t)); t++) ;
  let r = e.length - 1;
  for (; r >= t && An(e.charCodeAt(r)); r--) ;
  return e.slice(t, r + 1);
}
var al = {
  mdurl: pa,
  ucmicro: ma
};
function ll(e, t, r) {
  let n, i, s, a;
  const l = e.posMax, f = e.pos;
  for (e.pos = t + 1, n = 1; e.pos < l; ) {
    if (s = e.src.charCodeAt(e.pos), s === 93 && (n--, n === 0)) {
      i = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), s === 91) {
      if (a === e.pos - 1) n++;
      else if (r)
        return e.pos = f, -1;
    }
  }
  let c = -1;
  return i && (c = e.pos), e.pos = f, c;
}
function cl(e, t, r) {
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
  let a = 0;
  for (; i < r && (n = e.charCodeAt(i), !(n === 32 || n < 32 || n === 127)); ) {
    if (n === 92 && i + 1 < r) {
      if (e.charCodeAt(i + 1) === 32) {
        i++;
        continue;
      }
      i += 2;
      continue;
    }
    if (n === 40 && (a++, a > 32))
      return s;
    if (n === 41) {
      if (a === 0) break;
      a--;
    }
    i++;
  }
  return t === i || a !== 0 || (s.str = Xe(e.slice(t, i)), s.pos = i, s.ok = !0), s;
}
function ul(e, t, r, n) {
  let i, s = t;
  const a = {
    ok: !1,
    can_continue: !1,
    pos: 0,
    str: "",
    marker: 0
  };
  if (n)
    a.str = n.str, a.marker = n.marker;
  else {
    if (s >= r) return a;
    let l = e.charCodeAt(s);
    if (l !== 34 && l !== 39 && l !== 40) return a;
    t++, s++, l === 40 && (l = 41), a.marker = l;
  }
  for (; s < r; ) {
    if (i = e.charCodeAt(s), i === a.marker)
      return a.pos = s + 1, a.str += Xe(e.slice(t, s)), a.ok = !0, a;
    if (i === 40 && a.marker === 41) return a;
    i === 92 && s + 1 < r && s++, s++;
  }
  return a.can_continue = !0, a.str += Xe(e.slice(t, s)), a;
}
var hl = /* @__PURE__ */ os({
  parseLinkDestination: () => cl,
  parseLinkLabel: () => ll,
  parseLinkTitle: () => ul
});
function at(e) {
  "@babel/helpers - typeof";
  return at = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, at(e);
}
function fl(e, t) {
  if (at(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (at(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function pl(e) {
  var t = fl(e, "string");
  return at(t) == "symbol" ? t : t + "";
}
function q(e, t, r) {
  return (t = pl(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var $e = class {
  constructor(e, t, r) {
    q(
      this,
      /**
      * Source map info. Format: `[ line_begin, line_end ]`
      */
      "map",
      null
    ), q(
      this,
      /**
      * nesting level, the same as `state.level`
      */
      "level",
      0
    ), q(
      this,
      /**
      * An array of child nodes (inline and img tokens)
      */
      "children",
      null
    ), q(
      this,
      /**
      * In a case of self-closing tag (code, html, fence, etc.),
      * it has contents of this tag.
      */
      "content",
      ""
    ), q(
      this,
      /**
      * '*' or '_' for emphasis, fence string for fence, etc.
      */
      "markup",
      ""
    ), q(
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
    ), q(
      this,
      /**
      * True for block-level tokens, false for inline tokens.
      * Used in renderer to calculate line breaks
      */
      "block",
      !1
    ), q(
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
    q(
      this,
      /** @internal */
      "__rules__",
      []
    ), q(
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
  return `<code${i.renderAttrs(s)}>${Pe(s.content)}</code>`;
};
De.code_block = function(e, t, r, n, i) {
  const s = e[t];
  return `<pre${i.renderAttrs(s)}><code>${Pe(e[t].content)}</code></pre>
`;
};
De.fence = function(e, t, r, n, i) {
  const s = e[t], a = s.info ? Xe(s.info).trim() : "";
  let l = "", f = "";
  if (a) {
    const d = a.split(/(\s+)/g);
    l = d[0], f = d.slice(2).join("");
  }
  let c;
  if (r.highlight ? c = r.highlight(s.content, l, f) || Pe(s.content) : c = Pe(s.content), c.indexOf("<pre") === 0) return c + `
`;
  if (a) {
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
  return Pe(e[t].content);
};
De.html_block = function(e, t) {
  return e[t].content;
};
De.html_inline = function(e, t) {
  return e[t].content;
};
var us = class {
  constructor() {
    q(
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
    for (n = "", t = 0, r = e.attrs.length; t < r; t++) n += ` ${Pe(e.attrs[t][0])}="${Pe(String(e.attrs[t][1]))}"`;
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
    let a = !1;
    if (n.block && (a = !0, n.nesting === 1)) {
      let l = t + 1;
      for (; l < e.length && e[l].hidden && e[l].nesting === 0; ) l++;
      if (l < e.length) {
        const f = e[l];
        (f.type === "inline" || f.hidden || f.nesting === -1 && f.tag === n.tag) && (a = !1);
      }
    }
    return i += a ? `>
` : ">", i;
  }
  /**
  * The same as {@link Renderer.render}, but for single token of `inline` type.
  */
  renderInline(e, t, r) {
    let n = "";
    const i = this.rules;
    for (let s = 0, a = e.length; s < a; s++) {
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
    for (let s = 0, a = e.length; s < a; s++) {
      const l = e[s].type;
      l === "inline" ? n += this.renderInline(e[s].children, t, r) : typeof i[l] < "u" ? n += i[l](e, s, t, r, this) : n += this.renderToken(e, s, t);
    }
    return n;
  }
}, hs = class {
  constructor(e, t, r) {
    q(this, "tokens", []), q(this, "inlineMode", !1), q(this, "Token", $e), this.src = e, this.env = r, this.md = t;
  }
}, dl = /\r\n?/g, ml = /\0/g;
function gl(e) {
  let t;
  t = e.src.replace(dl, `
`), t = t.replace(ml, "�"), e.src = t;
}
function bl(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function xl(e) {
  const t = e.tokens;
  let r = 0;
  for (let n = 0; n < t.length; n++)
    t[n].type !== "reference_definition" && (n !== r && (t[r] = t[n]), r++);
  t.length !== r && (t.length = r);
}
function wl(e) {
  const t = e.tokens;
  for (let r = 0, n = t.length; r < n; r++) {
    const i = t[r];
    i.type === "inline" && e.md.inline.parse(i.content, e.md, e.env, i.children);
  }
}
function yl(e) {
  return /^<a[>\s]/i.test(e);
}
function vl(e) {
  return /^<\/a\s*>/i.test(e);
}
function _l(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let r = 0, n = t.length; r < n; r++) {
      if (t[r].type !== "inline" || !e.md.linkify.test(t[r].content)) continue;
      const i = t[r].children, s = [];
      let a = 0;
      for (let l = i.length - 1; l >= 0; l--) {
        const f = i[l];
        if (f.type === "link_close") {
          for (l--; i[l].level !== f.level && i[l].type !== "link_open"; ) l--;
          continue;
        }
        if (f.type === "html_inline" && (yl(f.content) && a > 0 && a--, vl(f.content) && a++), !(a > 0) && f.type === "text" && e.md.linkify.test(f.content)) {
          const c = f.content;
          let d = e.md.linkify.match(c);
          const u = [];
          let p = f.level, o = 0;
          d.length > 0 && d[0].index === 0 && l > 0 && i[l - 1].type === "text_special" && (d = d.slice(1));
          for (let h = 0; h < d.length; h++) {
            const m = d[h].url, g = e.md.normalizeLink(m);
            if (!e.md.validateLink(g)) continue;
            let k = d[h].text;
            d[h].schema ? d[h].schema === "mailto:" && !/^mailto:/i.test(k) ? k = e.md.normalizeLinkText(`mailto:${k}`).replace(/^mailto:/, "") : k = e.md.normalizeLinkText(k) : k = e.md.normalizeLinkText(`http://${k}`).replace(/^http:\/\//, "");
            const v = d[h].index;
            if (v > o) {
              const b = new e.Token("text", "", 0);
              b.content = c.slice(o, v), b.level = p, u.push(b);
            }
            const _ = new e.Token("link_open", "a", 1);
            _.attrs = [["href", g]], _.level = p++, _.markup = "linkify", _.info = "auto", u.push(_);
            const C = new e.Token("text", "", 0);
            C.content = k, C.level = p, u.push(C);
            const x = new e.Token("link_close", "a", -1);
            x.level = --p, x.markup = "linkify", x.info = "auto", u.push(x), o = d[h].lastIndex;
          }
          if (o < c.length) {
            const h = new e.Token("text", "", 0);
            h.content = c.slice(o), h.level = p, u.push(h);
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
            for (const o of p.nodes) f[d++] = o;
            c++;
          } else f[d++] = i[u];
        }
        t[r].children = f;
      }
    }
}
var fs = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, kl = /\((c|tm|r)\)/i, Cl = /\((c|tm|r)\)/gi, Rl = {
  c: "©",
  r: "®",
  tm: "™"
};
function Al(e, t) {
  return Rl[t.toLowerCase()];
}
function El(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && (n.content = n.content.replace(Cl, Al)), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function Sl(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    n.type === "text" && !t && fs.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), n.type === "link_open" && n.info === "auto" && t--, n.type === "link_close" && n.info === "auto" && t++;
  }
}
function Dl(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (kl.test(e.tokens[t].content) && El(e.tokens[t].children), fs.test(e.tokens[t].content) && Sl(e.tokens[t].children));
}
var Il = /['"]/, En = /['"]/g, Sn = "’", Tl = 1e3;
function Dn(e, t, r) {
  for (; e.length > r; ) {
    const n = e.pop();
    n.isSingleQuote ? t.single = n.prevSameQuoteIdx : t.double = n.prevSameQuoteIdx;
  }
}
function gt(e, t, r, n) {
  e[t] || (e[t] = []), e[t].push({
    pos: r,
    ch: n
  });
}
function Fl(e, t) {
  let r = "", n = 0;
  t.sort((i, s) => i.pos - s.pos);
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    r += e.slice(n, s.pos) + s.ch, n = s.pos + 1;
  }
  return r + e.slice(n);
}
function Nl(e, t) {
  let r;
  const n = [], i = {
    single: -1,
    double: -1
  }, s = {};
  for (let a = 0; a < e.length; a++) {
    const l = e[a], f = e[a].level;
    for (r = n.length - 1; r >= 0 && !(n[r].level <= f); r--) ;
    if (Dn(n, i, r + 1), l.type !== "text") continue;
    const c = l.content;
    let d = 0;
    const u = c.length;
    e: for (; d < u; ) {
      En.lastIndex = d;
      const p = En.exec(c);
      if (!p) break;
      let o = !0, h = !0;
      d = p.index + 1;
      const m = p[0] === "'";
      let g = 32;
      if (p.index - 1 >= 0) g = c.charCodeAt(p.index - 1);
      else for (r = a - 1; r >= 0 && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r--)
        if (e[r].content) {
          g = e[r].content.charCodeAt(e[r].content.length - 1);
          break;
        }
      let k = 32;
      if (d < u) k = c.charCodeAt(d);
      else for (r = a + 1; r < e.length && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r++)
        if (e[r].content) {
          k = e[r].content.charCodeAt(0);
          break;
        }
      const v = ot(g) || st(g), _ = ot(k) || st(k), C = it(g), x = it(k);
      if (x ? o = !1 : _ && (C || v || (o = !1)), C ? h = !1 : v && (x || _ || (h = !1)), k === 34 && p[0] === '"' && g >= 48 && g <= 57 && (h = o = !1), o && h && (o = v, h = _), !o && !h) {
        m && gt(s, a, p.index, Sn);
        continue;
      }
      if (h && (r = m ? i.single : i.double, r >= 0 && n[r].level === f)) {
        const b = n[r];
        let y, w;
        m ? (y = t.md.options.quotes[2], w = t.md.options.quotes[3]) : (y = t.md.options.quotes[0], w = t.md.options.quotes[1]), gt(s, a, p.index, w), gt(s, b.tokenIdx, b.contentPos, y), Dn(n, i, r);
        continue e;
      }
      if (o) {
        if (n.length >= Tl) return;
        n.push({
          tokenIdx: a,
          contentPos: p.index,
          isSingleQuote: m,
          level: f,
          prevSameQuoteIdx: m ? i.single : i.double
        }), m ? i.single = n.length - 1 : i.double = n.length - 1;
      } else h && m && gt(s, a, p.index, Sn);
    }
  }
  Object.keys(s).forEach(function(a) {
    const l = Number(a);
    e[l].content = Fl(e[l].content, s[a]);
  });
}
function Ol(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !Il.test(e.tokens[t].content) || Nl(e.tokens[t].children, e);
}
function Ml(e) {
  let t, r;
  const n = e.length;
  for (t = 0; t < n; t++) e[t].type === "text_special" && (e[t].type = "text");
  for (t = r = 0; t < n; t++) e[t].type === "text" && t + 1 < n && e[t + 1].type === "text" ? e[t + 1].content = e[t].content + e[t + 1].content : (t !== r && (e[r] = e[t]), r++);
  t !== r && (e.length = r);
}
function Bl(e) {
  let t, r;
  const n = e.tokens, i = n.length;
  for (let s = 0; s < i; s++) {
    if (n[s].type !== "inline") continue;
    const a = n[s].children, l = a.length;
    for (t = 0; t < l; t++)
      a[t].type === "text_special" && (a[t].type = "text"), a[t].children && Ml(a[t].children);
    for (t = r = 0; t < l; t++) a[t].type === "text" && t + 1 < l && a[t + 1].type === "text" ? a[t + 1].content = a[t].content + a[t + 1].content : (t !== r && (a[r] = a[t]), r++);
    t !== r && (a.length = r);
  }
}
var Yt = [
  ["normalize", gl],
  ["block", bl],
  ["strip_references", xl],
  ["inline", wl],
  ["linkify", _l],
  ["replacements", Dl],
  ["smartquotes", Ol],
  ["text_join", Bl]
], ps = class {
  constructor() {
    q(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of core rules.
      */
      "ruler",
      new lt()
    ), q(this, "State", hs);
    for (let e = 0; e < Yt.length; e++) this.ruler.push(Yt[e][0], Yt[e][1]);
  }
  /**
  * Executes core chain rules.
  */
  process(e) {
    const t = this.ruler.getRules("");
    for (let r = 0, n = t.length; r < n; r++) t[r](e);
  }
}, ds = class {
  constructor(e, t, r, n) {
    q(this, "bMarks", []), q(this, "eMarks", []), q(this, "tShift", []), q(this, "sCount", []), q(this, "bsCount", []), q(this, "blkIndent", 0), q(this, "line", 0), q(this, "lineMax", 0), q(this, "tight", !1), q(this, "listIndent", -1), q(this, "parentType", "root"), q(this, "level", 0), q(this, "Token", $e), this.src = e, this.md = t, this.env = r, this.tokens = n;
    const i = this.src;
    for (let s = 0, a = 0, l = 0, f = 0, c = i.length, d = !1; a < c; a++) {
      const u = i.charCodeAt(a);
      if (!d)
        if (ne(u)) {
          l++, u === 9 ? f += 4 - f % 4 : f++;
          continue;
        } else d = !0;
      (u === 10 || a === c - 1) && (u !== 10 && a++, this.bMarks.push(s), this.eMarks.push(a), this.tShift.push(l), this.sCount.push(f), this.bsCount.push(0), d = !1, l = 0, f = 0, s = a + 1);
    }
    this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  push(e, t, r) {
    const n = new $e(e, t, r);
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
    for (let s = 0, a = e; a < t; a++, s++) {
      let l = 0;
      const f = this.bMarks[a];
      let c = f, d;
      for (a + 1 < t || n ? d = this.eMarks[a] + 1 : d = this.eMarks[a]; c < d && l < r; ) {
        const u = this.src.charCodeAt(c);
        if (ne(u))
          u === 9 ? l += 4 - (l + this.bsCount[a]) % 4 : l++;
        else if (c - f < this.tShift[a]) l++;
        else break;
        c++;
      }
      l > r ? i[s] = new Array(l - r + 1).join(" ") + this.src.slice(c, d) : i[s] = this.src.slice(c, d);
    }
    return i.join("");
  }
}, Pl = 65536;
function Gt(e, t) {
  const r = e.bMarks[t] + e.tShift[t], n = e.eMarks[t];
  return e.src.slice(r, n);
}
function In(e) {
  const t = [], r = e.length;
  let n = 0, i = e.charCodeAt(n), s = !1, a = 0, l = "";
  for (; n < r; )
    i === 124 && (s ? (l += e.substring(a, n - 1), a = n) : (t.push(l + e.substring(a, n)), l = "", a = n + 1)), s = i === 92, n++, i = e.charCodeAt(n);
  return t.push(l + e.substring(a)), t;
}
function Ll(e, t, r, n) {
  if (t + 2 > r) return !1;
  let i = t + 1;
  if (e.sCount[i] < e.blkIndent || e.sCount[i] - e.blkIndent >= 4) return !1;
  let s = e.bMarks[i] + e.tShift[i];
  if (s >= e.eMarks[i]) return !1;
  const a = e.src.charCodeAt(s++);
  if (a !== 124 && a !== 45 && a !== 58 || s >= e.eMarks[i]) return !1;
  const l = e.src.charCodeAt(s++);
  if (l !== 124 && l !== 45 && l !== 58 && !ne(l) || a === 45 && ne(l)) return !1;
  for (; s < e.eMarks[i]; ) {
    const C = e.src.charCodeAt(s);
    if (C !== 124 && C !== 45 && C !== 58 && !ne(C)) return !1;
    s++;
  }
  let f = Gt(e, t + 1), c = f.split("|");
  const d = [];
  for (let C = 0; C < c.length; C++) {
    const x = c[C].trim();
    if (!x) {
      if (C === 0 || C === c.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(x)) return !1;
    x.charCodeAt(x.length - 1) === 58 ? d.push(x.charCodeAt(0) === 58 ? "center" : "right") : x.charCodeAt(0) === 58 ? d.push("left") : d.push("");
  }
  if (f = Gt(e, t).trim(), f.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4) return !1;
  c = In(f), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop();
  const u = c.length;
  if (u === 0 || u !== d.length) return !1;
  if (n) return !0;
  const p = e.parentType;
  e.parentType = "table";
  const o = e.md.block.ruler.getRules("blockquote"), h = e.push("table_open", "table", 1), m = [t, 0];
  h.map = m;
  const g = e.push("thead_open", "thead", 1);
  g.map = [t, t + 1];
  const k = e.push("tr_open", "tr", 1);
  k.map = [t, t + 1];
  for (let C = 0; C < c.length; C++) {
    const x = e.push("th_open", "th", 1);
    d[C] && (x.attrs = [["style", `text-align:${d[C]}`]]);
    const b = e.push("inline", "", 0);
    b.content = c[C].trim(), b.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let v, _ = 0;
  for (i = t + 2; i < r && !(e.sCount[i] < e.blkIndent); i++) {
    let C = !1;
    for (let b = 0, y = o.length; b < y; b++) if (o[b](e, i, r, !0)) {
      C = !0;
      break;
    }
    if (C || (f = Gt(e, i).trim(), !f) || e.sCount[i] - e.blkIndent >= 4 || (c = In(f), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop(), _ += u - c.length, _ > Pl)) break;
    if (i === t + 2) {
      const b = e.push("tbody_open", "tbody", 1);
      b.map = v = [t + 2, 0];
    }
    const x = e.push("tr_open", "tr", 1);
    x.map = [i, i + 1];
    for (let b = 0; b < u; b++) {
      const y = e.push("td_open", "td", 1);
      d[b] && (y.attrs = [["style", `text-align:${d[b]}`]]);
      const w = e.push("inline", "", 0);
      w.content = c[b] ? c[b].trim() : "", w.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return v && (e.push("tbody_close", "tbody", -1), v[1] = i), e.push("table_close", "table", -1), m[1] = i, e.parentType = p, e.line = i, !0;
}
function zl(e, t, r) {
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
function ql(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || i + 3 > s) return !1;
  const a = e.src.charCodeAt(i);
  if (a !== 126 && a !== 96) return !1;
  let l = i;
  i = e.skipChars(i, a);
  let f = i - l;
  if (f < 3) return !1;
  const c = e.src.slice(l, i), d = e.src.slice(i, s);
  if (a === 96 && d.indexOf(String.fromCharCode(a)) >= 0)
    return !1;
  if (n) return !0;
  let u = t, p = !1;
  for (; u++, !(u >= r || (i = l = e.bMarks[u] + e.tShift[u], s = e.eMarks[u], i < s && e.sCount[u] < e.blkIndent)); )
    if (e.src.charCodeAt(i) === a && !(e.sCount[u] - e.blkIndent >= 4) && (i = e.skipChars(i, a), !(i - l < f) && (i = e.skipSpaces(i), !(i < s)))) {
      p = !0;
      break;
    }
  f = e.sCount[t], e.line = u + (p ? 1 : 0);
  const o = e.push("fence", "code", 0);
  return o.info = d, o.content = e.getLines(t + 1, u, f, !0), o.markup = c, o.map = [t, e.line], !0;
}
function jl(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  const a = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 62) return !1;
  if (n) return !0;
  const l = [], f = [], c = [], d = [], u = e.md.block.ruler.getRules("blockquote"), p = e.parentType;
  e.parentType = "blockquote";
  let o = !1, h;
  for (h = t; h < r; h++) {
    const _ = e.sCount[h] < e.blkIndent;
    if (i = e.bMarks[h] + e.tShift[h], s = e.eMarks[h], i >= s) break;
    if (e.src.charCodeAt(i++) === 62 && !_) {
      let x = e.sCount[h] + 1, b, y;
      e.src.charCodeAt(i) === 32 ? (i++, x++, y = !1, b = !0) : e.src.charCodeAt(i) === 9 ? (b = !0, (e.bsCount[h] + x) % 4 === 3 ? (i++, x++, y = !1) : y = !0) : b = !1;
      let w = x;
      for (l.push(e.bMarks[h]), e.bMarks[h] = i; i < s; ) {
        const R = e.src.charCodeAt(i);
        if (ne(R))
          R === 9 ? w += 4 - (w + e.bsCount[h] + (y ? 1 : 0)) % 4 : w++;
        else break;
        i++;
      }
      o = i >= s, f.push(e.bsCount[h]), e.bsCount[h] = e.sCount[h] + 1 + (b ? 1 : 0), c.push(e.sCount[h]), e.sCount[h] = w - x, d.push(e.tShift[h]), e.tShift[h] = i - e.bMarks[h];
      continue;
    }
    if (o) break;
    let C = !1;
    for (let x = 0, b = u.length; x < b; x++) if (u[x](e, h, r, !0)) {
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
  const v = e.push("blockquote_close", "blockquote", -1);
  v.markup = ">", e.lineMax = a, e.parentType = p, k[1] = e.line;
  for (let _ = 0; _ < d.length; _++)
    e.bMarks[_ + t] = l[_], e.tShift[_ + t] = d[_], e.sCount[_ + t] = c[_], e.bsCount[_ + t] = f[_];
  return e.blkIndent = m, !0;
}
function $l(e, t, r, n) {
  const i = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  let s = e.bMarks[t] + e.tShift[t];
  const a = e.src.charCodeAt(s++);
  if (a !== 42 && a !== 45 && a !== 95) return !1;
  let l = 1;
  for (; s < i; ) {
    const c = e.src.charCodeAt(s++);
    if (c !== a && !ne(c)) return !1;
    c === a && l++;
  }
  if (l < 3) return !1;
  if (n) return !0;
  e.line = t + 1;
  const f = e.push("hr", "hr", 0);
  return f.map = [t, e.line], f.markup = Array(l + 1).join(String.fromCharCode(a)), !0;
}
function Tn(e, t) {
  const r = e.eMarks[t];
  let n = e.bMarks[t] + e.tShift[t];
  const i = e.src.charCodeAt(n++);
  return i !== 42 && i !== 45 && i !== 43 || n < r && !ne(e.src.charCodeAt(n)) ? -1 : n;
}
function Fn(e, t) {
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
function Ul(e, t) {
  const r = e.level + 2;
  for (let n = t + 2, i = e.tokens.length - 2; n < i; n++) e.tokens[n].level === r && e.tokens[n].type === "paragraph_open" && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
function Jl(e, t, r, n) {
  let i, s, a, l, f = t, c = !0;
  if (e.sCount[f] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[f] - e.listIndent >= 4 && e.sCount[f] < e.blkIndent) return !1;
  let d = !1;
  n && e.parentType === "paragraph" && e.sCount[f] >= e.blkIndent && (d = !0);
  let u, p, o;
  if ((o = Fn(e, f)) >= 0) {
    if (u = !0, a = e.bMarks[f] + e.tShift[f], p = Number(e.src.slice(a, o - 1)), d && p !== 1) return !1;
  } else if ((o = Tn(e, f)) >= 0) u = !1;
  else return !1;
  if (d && e.skipSpaces(o) >= e.eMarks[f])
    return !1;
  if (n) return !0;
  const h = e.src.charCodeAt(o - 1), m = e.tokens.length;
  u ? (l = e.push("ordered_list_open", "ol", 1), p !== 1 && (l.attrs = [["start", p]])) : l = e.push("bullet_list_open", "ul", 1);
  const g = [f, 0];
  l.map = g, l.markup = String.fromCharCode(h);
  let k = !1;
  const v = e.md.block.ruler.getRules("list"), _ = e.parentType;
  for (e.parentType = "list"; f < r; ) {
    s = o, i = e.eMarks[f];
    const C = e.sCount[f] + o - (e.bMarks[f] + e.tShift[f]);
    let x = C;
    for (; s < i; ) {
      const B = e.src.charCodeAt(s);
      if (B === 9) x += 4 - (x + e.bsCount[f]) % 4;
      else if (B === 32) x++;
      else break;
      s++;
    }
    const b = s;
    let y;
    b >= i ? y = 1 : y = x - C, y > 4 && (y = 1);
    const w = C + y;
    l = e.push("list_item_open", "li", 1), l.markup = String.fromCharCode(h);
    const R = [f, 0];
    l.map = R, u && (l.info = e.src.slice(a, o - 1));
    const I = e.tight, F = e.tShift[f], S = e.sCount[f], Y = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = w, e.tight = !0, e.tShift[f] = b - e.bMarks[f], e.sCount[f] = x, b >= i && e.isEmpty(f + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, f, r), (!e.tight || k) && (c = !1), k = e.line - f > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = Y, e.tShift[f] = F, e.sCount[f] = S, e.tight = I, l = e.push("list_item_close", "li", -1), l.markup = String.fromCharCode(h), f = e.line, R[1] = f, f >= r || e.sCount[f] < e.blkIndent || e.sCount[f] - e.blkIndent >= 4) break;
    let P = !1;
    for (let B = 0, M = v.length; B < M; B++) if (v[B](e, f, r, !0)) {
      P = !0;
      break;
    }
    if (P) break;
    if (u) {
      if (o = Fn(e, f), o < 0) break;
      a = e.bMarks[f] + e.tShift[f];
    } else if (o = Tn(e, f), o < 0) break;
    if (h !== e.src.charCodeAt(o - 1)) break;
  }
  return u ? l = e.push("ordered_list_close", "ol", -1) : l = e.push("bullet_list_close", "ul", -1), l.markup = String.fromCharCode(h), g[1] = f, e.line = f, e.parentType = _, c && Ul(e, m), !0;
}
var Zt = 999;
function Wl(e) {
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
function bt(e, t) {
  const r = e.lineMax;
  if (t >= r || e.isEmpty(t)) return -1;
  let n = !1;
  if (e.sCount[t] - e.blkIndent > 3 && (n = !0), e.sCount[t] < 0 && (n = !0), !n) {
    const i = e.md.block.ruler.getRules("reference"), s = e.parentType;
    e.parentType = "reference";
    let a = !1;
    for (let l = 0, f = i.length; l < f; l++) if (i[l](e, t, r, !0)) {
      a = !0;
      break;
    }
    if (e.parentType = s, a) return -1;
  }
  return e.bMarks[t] + e.tShift[t];
}
function Vl(e, t, r, n) {
  const i = e.src;
  let s = e.bMarks[t] + e.tShift[t], a = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || i.charCodeAt(s) !== 91) return !1;
  let l = tt(e, t), f = "", c = -1, d = ++s;
  for (; s < l; ) {
    if (f.length + s - d > Zt * 2) return !1;
    let b = i.charCodeAt(s);
    if (b === 91) return !1;
    if (b === 93) {
      c = s;
      break;
    }
    if (b === 92 && (b = i.charCodeAt(++s)), b === 10 && s < l) {
      const y = bt(e, a);
      if (y < 0) return !1;
      f += i.slice(d, l), s = d = y, l = tt(e, a++);
      continue;
    }
    s++;
  }
  if (c < 0 || i.charCodeAt(c + 1) !== 58 || (f += i.slice(d, c), f.length > Zt && Wl(f) > Zt)) return !1;
  for (s = c + 2; s < l; ) {
    const b = i.charCodeAt(s);
    if (b === 10) {
      const y = bt(e, a);
      if (y < 0) break;
      s = y, l = tt(e, a++);
    } else if (ne(b)) s++;
    else break;
  }
  const u = e.md.helpers.parseLinkDestination(i, s, l);
  if (!u.ok) return !1;
  const p = e.md.normalizeLink(u.str);
  if (!e.md.validateLink(p)) return !1;
  s = u.pos;
  const o = s, h = l, m = a;
  for (; s < l; ) {
    const b = i.charCodeAt(s);
    if (b === 10) {
      const y = bt(e, a);
      if (y < 0) break;
      s = y, l = tt(e, a++);
    } else if (ne(b)) s++;
    else break;
  }
  const g = s;
  let k = e.md.helpers.parseLinkTitle(i, s, l);
  for (; k.can_continue; ) {
    const b = bt(e, a);
    if (b < 0) break;
    s = b, l = tt(e, a++), k = e.md.helpers.parseLinkTitle(i, s, l, k);
  }
  let v;
  for (g !== o && k.ok ? (v = k.str, s = k.pos) : (v = "", s = o, l = h, a = m); s < l && ne(i.charCodeAt(s)); )
    s++;
  if (s < l && i.charCodeAt(s) !== 10 && v)
    for (v = "", s = o, l = h, a = m; s < l && ne(i.charCodeAt(s)); )
      s++;
  if (s < l && i.charCodeAt(s) !== 10) return !1;
  const _ = Ft(f);
  if (!_) return !1;
  if (n) return !0;
  typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[_] > "u" && (e.env.references[_] = {
    title: v,
    href: p
  });
  const C = e.push("reference_definition", "", 0);
  C.map = [t, a], C.hidden = !0;
  const x = /* @__PURE__ */ Object.create(null);
  return x.label = _, C.meta = x, e.line = a, !0;
}
var Hl = [
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
], Yl = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`, Gl = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", ms = new RegExp(`^(?:${Yl}|${Gl})`), qe = [
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
    new RegExp(`^</?(${Hl.join("|")})(?=(\\s|/?>|$))`, "i"),
    /^$/,
    !0
  ],
  [
    new RegExp(`${ms.source}\\s*$`),
    /^$/,
    !1
  ]
];
function Zl(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(i) !== 60) return !1;
  let a = e.src.slice(i, s), l = 0;
  for (; l < qe.length && !qe[l][0].test(a); l++) ;
  if (l === qe.length) return !1;
  if (n) return qe[l][2];
  let f = t + 1;
  const c = qe[l][1].test("");
  if (!qe[l][1].test(a)) {
    for (; f < r && !(e.sCount[f] < e.blkIndent && (c || !e.isEmpty(f))); f++)
      if (i = e.bMarks[f] + e.tShift[f], s = e.eMarks[f], a = e.src.slice(i, s), qe[l][1].test(a)) {
        a.length !== 0 && f++;
        break;
      }
  }
  e.line = f;
  const d = e.push("html_block", "", 0);
  return d.map = [t, f], d.content = e.getLines(t, f, e.blkIndent, !0), !0;
}
function Xl(e, t, r, n) {
  let i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  let a = e.src.charCodeAt(i);
  if (a !== 35 || i >= s) return !1;
  let l = 1;
  for (a = e.src.charCodeAt(++i); a === 35 && i < s && l <= 6; )
    l++, a = e.src.charCodeAt(++i);
  if (l > 6 || i < s && !ne(a)) return !1;
  if (n) return !0;
  s = e.skipSpacesBack(s, i);
  const f = e.skipCharsBack(s, 35, i);
  f > i && ne(e.src.charCodeAt(f - 1)) && (s = f), e.line = t + 1;
  const c = e.push("heading_open", `h${l}`, 1);
  c.markup = "########".slice(0, l), c.map = [t, e.line];
  const d = e.push("inline", "", 0);
  d.content = Nt(e.src.slice(i, s)), d.map = [t, e.line], d.children = [];
  const u = e.push("heading_close", `h${l}`, -1);
  return u.markup = "########".slice(0, l), !0;
}
function Kl(e, t, r) {
  const n = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  const i = e.parentType;
  e.parentType = "paragraph";
  let s = 0, a, l = t + 1;
  for (; l < r && !e.isEmpty(l); l++) {
    if (e.sCount[l] - e.blkIndent > 3) continue;
    if (e.sCount[l] >= e.blkIndent) {
      let o = e.bMarks[l] + e.tShift[l];
      const h = e.eMarks[l];
      if (o < h && (a = e.src.charCodeAt(o), (a === 45 || a === 61) && (o = e.skipChars(o, a), o = e.skipSpaces(o), o >= h))) {
        s = a === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[l] < 0) continue;
    let p = !1;
    for (let o = 0, h = n.length; o < h; o++) if (n[o](e, l, r, !0)) {
      p = !0;
      break;
    }
    if (p) break;
  }
  if (!s)
    return e.parentType = i, !1;
  const f = Nt(e.getLines(t, l, e.blkIndent, !1));
  e.line = l + 1;
  const c = e.push("heading_open", `h${s}`, 1);
  c.markup = String.fromCharCode(a), c.map = [t, e.line];
  const d = e.push("inline", "", 0);
  d.content = f, d.map = [t, e.line - 1], d.children = [];
  const u = e.push("heading_close", `h${s}`, -1);
  return u.markup = String.fromCharCode(a), e.parentType = i, !0;
}
function Ql(e, t, r) {
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
  const a = Nt(e.getLines(t, s, e.blkIndent, !1));
  e.line = s;
  const l = e.push("paragraph_open", "p", 1);
  l.map = [t, e.line];
  const f = e.push("inline", "", 0);
  return f.content = a, f.map = [t, e.line], f.children = [], e.push("paragraph_close", "p", -1), e.parentType = i, !0;
}
var xt = [
  [
    "table",
    Ll,
    ["paragraph", "reference"]
  ],
  ["code", zl],
  [
    "fence",
    ql,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "blockquote",
    jl,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "hr",
    $l,
    [
      "paragraph",
      "reference",
      "blockquote",
      "list"
    ]
  ],
  [
    "list",
    Jl,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["reference", Vl],
  [
    "html_block",
    Zl,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  [
    "heading",
    Xl,
    [
      "paragraph",
      "reference",
      "blockquote"
    ]
  ],
  ["lheading", Kl],
  ["paragraph", Ql]
], gs = class {
  constructor() {
    q(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of block rules.
      */
      "ruler",
      new lt()
    ), q(this, "State", ds);
    for (let e = 0; e < xt.length; e++) this.ruler.push(xt[e][0], xt[e][1], { alt: (xt[e][2] || []).slice() });
  }
  tokenize(e, t, r) {
    const n = this.ruler.getRules(""), i = n.length, s = e.md.options.maxNesting;
    let a = t, l = !1;
    for (; a < r && (e.line = a = e.skipEmptyLines(a), !(a >= r || e.sCount[a] < e.blkIndent)); ) {
      if (e.level >= s) {
        e.line = r;
        break;
      }
      const f = e.line;
      let c = !1;
      for (let d = 0; d < i; d++)
        if (c = n[d](e, a, r, !1), c) {
          if (f >= e.line) throw new Error("block rule didn't increment state.line");
          break;
        }
      if (!c) throw new Error("none of the block rules matched");
      e.tight = !l, e.isEmpty(e.line - 1) && (l = !0), a = e.line, a < r && e.isEmpty(a) && (l = !0, a++, e.line = a);
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
}, bs = class {
  constructor(e, t, r, n) {
    q(this, "pos", 0), q(this, "level", 0), q(this, "pending", ""), q(this, "pendingLevel", 0), q(this, "cache", {}), q(this, "backticks", {}), q(this, "backticksScanned", !1), q(this, "skipHtmlSpecial", !1), q(this, "linkLevel", 0), q(this, "delimiters", []), q(this, "_prev_delimiters", []), q(this, "Token", $e), this.src = e, this.env = r, this.md = t, this.tokens = n, this.tokens_meta = Array(n.length), this.posMax = this.src.length;
  }
  pushPending() {
    const e = new $e("text", "", 0);
    return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
  }
  push(e, t, r) {
    this.pending && this.pushPending();
    const n = new $e(e, t, r);
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
    const a = s - e;
    let l = s < r ? this.src.charCodeAt(s) : 32;
    if ((l & 64512) === 55296) {
      const h = this.src.charCodeAt(s + 1);
      l = (h & 64512) === 56320 ? 65536 + (l - 55296 << 10) + (h - 56320) : 65533;
    } else (l & 64512) === 56320 && (l = 65533);
    const f = ot(i) || st(i), c = ot(l) || st(l), d = it(i), u = it(l), p = !u && (!c || d || f), o = !d && (!f || u || c);
    return {
      can_open: p && (t || !o || f),
      can_close: o && (t || !p || c),
      length: a
    };
  }
};
function ec(e) {
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
function tc(e, t) {
  let r = e.pos;
  for (; r < e.posMax && !ec(e.src.charCodeAt(r)); ) r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}
function rc(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function nc(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 45 || e === 46;
}
function ic(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const r = e.pos, n = e.posMax;
  if (r + 3 > n || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47) return !1;
  const i = r - Math.min(10, e.pending.length, r);
  let s = r;
  for (; s > i && nc(e.src.charCodeAt(s - 1)); ) s--;
  if (s === r || !rc(e.src.charCodeAt(s))) return !1;
  const a = r - s, l = e.md.linkify.matchAtStart(e.src.slice(s));
  if (!l) return !1;
  let f = l.url;
  if (f.length <= a) return !1;
  let c = f.length;
  for (; c > 0 && f.charCodeAt(c - 1) === 42; ) c--;
  c !== f.length && (f = f.slice(0, c));
  const d = e.md.normalizeLink(f);
  if (!e.md.validateLink(d)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -a);
    const u = e.push("link_open", "a", 1);
    u.attrs = [["href", d]], u.markup = "linkify", u.info = "auto";
    const p = e.push("text", "", 0);
    p.content = e.md.normalizeLinkText(f);
    const o = e.push("link_close", "a", -1);
    o.markup = "linkify", o.info = "auto";
  }
  return e.pos += f.length - a, !0;
}
function sc(e, t) {
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
var jr = [];
for (let e = 0; e < 256; e++) jr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  jr[e.charCodeAt(0)] = 1;
});
function oc(e, t) {
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
  const a = "\\" + s;
  if (!t) {
    const l = e.push("text_special", "", 0);
    i < 256 && jr[i] !== 0 ? l.content = s : l.content = a, l.markup = a, l.info = "escape";
  }
  return e.pos = r + 1, !0;
}
function ac(e) {
  const t = {};
  let r = 0;
  for (; (r = e.indexOf("`", r)) !== -1; ) {
    const n = r;
    for (; e.charCodeAt(++r) === 96; ) ;
    t[r - n] = n;
  }
  return t;
}
function lc(e, t) {
  var r;
  const n = e.pos;
  if (e.src.charCodeAt(n) !== 96) return !1;
  const i = e.posMax;
  let s = n + 1;
  for (; s < i && e.src.charCodeAt(s) === 96; ) s++;
  const a = e.src.slice(n, s), l = a.length;
  if (e.backticksScanned || (e.backticks = ac(e.src), e.backticksScanned = !0), ((r = e.backticks[l]) !== null && r !== void 0 ? r : -1) >= s) {
    let f = s, c;
    for (; (c = e.src.indexOf("`", f)) !== -1 && c < i; ) {
      for (f = c + 1; e.src.charCodeAt(f) === 96; ) f++;
      if (f > i) break;
      if (f - c === l) {
        if (!t) {
          const d = e.push("code_inline", "code", 0);
          d.markup = a;
          let u = e.src.slice(s, c).replace(/\n/g, " ");
          u.startsWith(" ") && u.endsWith(" ") && /[^ ]/.test(u) && (u = u.slice(1, -1)), d.content = u;
        }
        return e.pos = f, !0;
      }
    }
  }
  return t || (e.pending += a), e.pos = s, !0;
}
function cc(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 126) return !1;
  const i = e.scanDelims(e.pos, !0);
  let s = i.length;
  const a = String.fromCharCode(n);
  if (s < 2) return !1;
  let l;
  s % 2 && (l = e.push("text", "", 0), l.content = a, s--);
  for (let f = 0; f < s; f += 2)
    l = e.push("text", "", 0), l.content = a + a, e.delimiters.push({
      marker: n,
      length: 0,
      token: e.tokens.length - 1,
      end: -1,
      open: i.can_open,
      close: i.can_close
    });
  return e.pos += i.length, !0;
}
function Nn(e, t) {
  let r;
  const n = [], i = t.length;
  for (let s = 0; s < i; s++) {
    const a = t[s];
    if (a.marker !== 126 || a.end === -1) continue;
    const l = t[a.end];
    r = e.tokens[a.token], r.type = "s_open", r.tag = "s", r.nesting = 1, r.markup = "~~", r.content = "", r = e.tokens[l.token], r.type = "s_close", r.tag = "s", r.nesting = -1, r.markup = "~~", r.content = "", e.tokens[l.token - 1].type === "text" && e.tokens[l.token - 1].content === "~" && n.push(l.token - 1);
  }
  for (; n.length; ) {
    const s = n.pop();
    let a = s + 1;
    for (; a < e.tokens.length && e.tokens[a].type === "s_close"; ) a++;
    a--, s !== a && (r = e.tokens[a], e.tokens[a] = e.tokens[s], e.tokens[s] = r);
  }
}
function uc(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Nn(e, e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && Nn(e, s);
  }
}
var xs = {
  tokenize: cc,
  postProcess: uc
};
function hc(e, t) {
  const r = e.pos, n = e.src.charCodeAt(r);
  if (t || n !== 95 && n !== 42) return !1;
  const i = e.scanDelims(e.pos, n === 42);
  for (let s = 0; s < i.length; s++) {
    const a = e.push("text", "", 0);
    a.content = String.fromCharCode(n), e.delimiters.push({
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
function On(e, t) {
  const r = t.length;
  for (let n = r - 1; n >= 0; n--) {
    const i = t[n];
    if (i.marker !== 95 && i.marker !== 42 || i.end === -1) continue;
    const s = t[i.end], a = n > 0 && t[n - 1].end === i.end + 1 && t[n - 1].marker === i.marker && t[n - 1].token === i.token - 1 && t[i.end + 1].token === s.token + 1, l = String.fromCharCode(i.marker), f = e.tokens[i.token];
    f.type = a ? "strong_open" : "em_open", f.tag = a ? "strong" : "em", f.nesting = 1, f.markup = a ? l + l : l, f.content = "";
    const c = e.tokens[s.token];
    c.type = a ? "strong_close" : "em_close", c.tag = a ? "strong" : "em", c.nesting = -1, c.markup = a ? l + l : l, c.content = "", a && (e.tokens[t[n - 1].token].content = "", e.tokens[t[i.end + 1].token].content = "", n--);
  }
}
function fc(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  On(e, e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && On(e, s);
  }
}
var ws = {
  tokenize: hc,
  postProcess: fc
};
function pc(e, t) {
  let r, n, i, s, a = "", l = "", f = e.pos, c = !0;
  if (e.src.charCodeAt(e.pos) !== 91) return !1;
  const d = e.pos, u = e.posMax, p = e.pos + 1, o = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (o < 0) return !1;
  let h = o + 1;
  if (h < u && e.src.charCodeAt(h) === 40) {
    for (c = !1, h++; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
      ;
    if (h >= u) return !1;
    if (f = h, i = e.md.helpers.parseLinkDestination(e.src, h, e.posMax), i.ok) {
      for (a = e.md.normalizeLink(i.str), e.md.validateLink(a) ? h = i.pos : a = "", f = h; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
        ;
      if (i = e.md.helpers.parseLinkTitle(e.src, h, e.posMax), h < u && f !== h && i.ok)
        for (l = i.str, h = i.pos; h < u && (r = e.src.charCodeAt(h), !(!ne(r) && r !== 10)); h++)
          ;
    }
    (h >= u || e.src.charCodeAt(h) !== 41) && (c = !0), h++;
  }
  if (c) {
    if (typeof e.env.references > "u") return !1;
    if (h < u && e.src.charCodeAt(h) === 91 ? (f = h + 1, h = e.md.helpers.parseLinkLabel(e, h), h >= 0 ? n = e.src.slice(f, h++) : h = o + 1) : h = o + 1, n || (n = e.src.slice(p, o)), n = Ft(n), s = e.env.references[n], !s)
      return e.pos = d, !1;
    a = s.href, l = s.title;
  }
  if (!t) {
    e.pos = p, e.posMax = o;
    const m = e.push("link_open", "a", 1), g = [["href", a]];
    if (m.attrs = g, l && g.push(["title", l]), n) {
      const k = /* @__PURE__ */ Object.create(null);
      k.label = n, m.meta = k;
    }
    e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = h, e.posMax = u, !0;
}
function dc(e, t) {
  let r, n, i, s, a, l, f, c, d = "";
  const u = e.pos, p = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91) return !1;
  const o = e.pos + 2, h = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
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
    if (s < p && e.src.charCodeAt(s) === 91 ? (c = s + 1, s = e.md.helpers.parseLinkLabel(e, s), s >= 0 ? i = e.src.slice(c, s++) : s = h + 1) : s = h + 1, i || (i = e.src.slice(o, h)), i = Ft(i), a = e.env.references[i], !a)
      return e.pos = u, !1;
    d = a.href, f = a.title;
  }
  if (!t) {
    n = e.src.slice(o, h);
    const m = [];
    e.md.inline.parse(n, e.md, e.env, m);
    const g = e.push("image", "img", 0), k = [["src", d], ["alt", ""]];
    if (g.attrs = k, g.children = m, g.content = n, f && k.push(["title", f]), i) {
      const v = /* @__PURE__ */ Object.create(null);
      v.label = i, g.meta = v;
    }
  }
  return e.pos = s, e.posMax = p, !0;
}
var mc = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, gc = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function bc(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 60) return !1;
  const n = e.pos, i = e.posMax;
  for (; ; ) {
    if (++r >= i) return !1;
    const a = e.src.charCodeAt(r);
    if (a === 60) return !1;
    if (a === 62) break;
  }
  const s = e.src.slice(n + 1, r);
  if (gc.test(s)) {
    const a = e.md.normalizeLink(s);
    if (!e.md.validateLink(a)) return !1;
    if (!t) {
      const l = e.push("link_open", "a", 1);
      l.attrs = [["href", a]], l.markup = "autolink", l.info = "auto";
      const f = e.push("text", "", 0);
      f.content = e.md.normalizeLinkText(s);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += s.length + 2, !0;
  }
  if (mc.test(s)) {
    const a = e.md.normalizeLink(`mailto:${s}`);
    if (!e.md.validateLink(a)) return !1;
    if (!t) {
      const l = e.push("link_open", "a", 1);
      l.attrs = [["href", a]], l.markup = "autolink", l.info = "auto";
      const f = e.push("text", "", 0);
      f.content = e.md.normalizeLinkText(s);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += s.length + 2, !0;
  }
  return !1;
}
function xc(e) {
  return /^<a[>\s]/i.test(e);
}
function wc(e) {
  return /^<\/a\s*>/i.test(e);
}
function ys(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function yc(e, t) {
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
  else if (ys(r.charCodeAt(t + 2)))
    n = t + 3, i = ">";
  else return -1;
  if (e.skipHtmlSpecial) return -1;
  const s = r.indexOf(i, n);
  return s < 0 ? (e.skipHtmlSpecial = !0, -1) : s + i.length;
}
function vc(e, t) {
  if (!e.md.options.html) return !1;
  const r = e.posMax, n = e.pos;
  if (e.src.charCodeAt(n) !== 60 || n + 2 >= r) return !1;
  let i;
  const s = e.src.charCodeAt(n + 1);
  if (s === 33 || s === 63) i = yc(e, n);
  else if (s === 47 || ys(s)) {
    const a = e.src.slice(n).match(ms);
    i = a ? n + a[0].length : -1;
  } else return !1;
  if (i < 0) return !1;
  if (!t) {
    const a = e.push("html_inline", "", 0);
    a.content = e.src.slice(n, i), xc(a.content) && e.linkLevel++, wc(a.content) && e.linkLevel--;
  }
  return e.pos = i, !0;
}
var _c = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, kc = /^&([a-z][a-z0-9]{1,31});/i;
function Cc(e, t) {
  const r = e.pos, n = e.posMax;
  if (e.src.charCodeAt(r) !== 38 || r + 1 >= n) return !1;
  if (e.src.charCodeAt(r + 1) === 35) {
    const i = e.src.slice(r).match(_c);
    if (i) {
      if (!t) {
        const s = i[1][0].toLowerCase() === "x" ? parseInt(i[1].slice(1), 16) : parseInt(i[1], 10), a = e.push("text_special", "", 0);
        a.content = qr(s) ? nt(s) : nt(65533), a.markup = i[0], a.info = "entity";
      }
      return e.pos += i[0].length, !0;
    }
  } else {
    const i = e.src.slice(r).match(kc);
    if (i) {
      const s = Yi(i[0]);
      if (s !== i[0]) {
        if (!t) {
          const a = e.push("text_special", "", 0);
          a.content = s, a.markup = i[0], a.info = "entity";
        }
        return e.pos += i[0].length, !0;
      }
    }
  }
  return !1;
}
function Mn(e) {
  const t = {}, r = e.length;
  if (!r) return;
  let n = 0, i = -2;
  const s = [];
  for (let a = 0; a < r; a++) {
    const l = e[a];
    if (s.push(0), (e[n].marker !== l.marker || i !== l.token - 1) && (n = a), i = l.token, l.length = l.length || 0, !l.close) continue;
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
          const o = c > 0 && !e[c - 1].open ? s[c - 1] + 1 : 0;
          s[a] = a - c + o, s[c] = o, l.open = !1, u.end = a, u.close = !1, d = -1, i = -2;
          break;
        }
      }
    }
    d !== -1 && (t[l.marker][(l.open ? 3 : 0) + (l.length || 0) % 3] = d);
  }
}
function Rc(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  Mn(e.delimiters);
  for (let i = 0; i < r; i++) {
    var n;
    const s = (n = t[i]) === null || n === void 0 ? void 0 : n.delimiters;
    s && Mn(s);
  }
}
function Ac(e) {
  let t, r, n = 0;
  const i = e.tokens, s = e.tokens.length;
  for (t = r = 0; t < s; t++)
    i[t].nesting < 0 && n--, i[t].level = n, i[t].nesting > 0 && n++, i[t].type === "text" && t + 1 < s && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== r && (i[r] = i[t]), r++);
  t !== r && (i.length = r);
}
var Xt = [
  ["text", tc],
  ["linkify", ic],
  ["newline", sc],
  ["escape", oc],
  ["backticks", lc],
  ["strikethrough", xs.tokenize],
  ["emphasis", ws.tokenize],
  ["link", pc],
  ["image", dc],
  ["autolink", bc],
  ["html_inline", vc],
  ["entity", Cc]
], Kt = [
  ["balance_pairs", Rc],
  ["strikethrough", xs.postProcess],
  ["emphasis", ws.postProcess],
  ["fragments_join", Ac]
], vs = class {
  constructor() {
    q(
      this,
      /**
      * {@link Ruler} instance. Keep configuration of inline rules.
      */
      "ruler",
      new lt()
    ), q(
      this,
      /**
      * {@link Ruler} instance. Second ruler used for post-processing
      * (e.g. in emphasis-like rules).
      */
      "ruler2",
      new lt()
    ), q(this, "State", bs);
    for (let e = 0; e < Xt.length; e++) this.ruler.push(Xt[e][0], Xt[e][1]);
    for (let e = 0; e < Kt.length; e++) this.ruler2.push(Kt[e][0], Kt[e][1]);
  }
  skipToken(e) {
    const t = e.pos, r = this.ruler.getRules(""), n = r.length, i = e.md.options.maxNesting, s = e.cache;
    if (typeof s[t] < "u") {
      e.pos = s[t];
      return;
    }
    let a = !1;
    if (e.level < i) {
      for (let l = 0; l < n; l++)
        if (e.level++, a = r[l](e, !0), e.level--, a) {
          if (t >= e.pos) throw new Error("inline rule didn't increment state.pos");
          break;
        }
    } else e.pos = e.posMax;
    a || e.pos++, s[t] = e.pos;
  }
  tokenize(e) {
    const t = this.ruler.getRules(""), r = t.length, n = e.posMax, i = e.md.options.maxNesting;
    for (; e.pos < n; ) {
      const s = e.pos;
      let a = !1;
      if (e.level < i) {
        for (let l = 0; l < r; l++)
          if (a = t[l](e, !1), a) {
            if (s >= e.pos) throw new Error("inline rule didn't increment state.pos");
            break;
          }
      }
      if (a) {
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
    const s = this.ruler2.getRules(""), a = s.length;
    for (let l = 0; l < a; l++) s[l](i);
  }
}, Ec = {
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
}, Sc = /^(vbscript|javascript|file|data):/, Dc = /^data:image\/(gif|png|jpeg|webp);/, Bn = [
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
    return Sc.test(t) ? Dc.test(t) : !0;
  }
  /**
  * Function used to encode link url to a machine-readable format,
  * which includes url-encoding, punycode, etc.
  */
  normalizeLink(e) {
    const t = Fr(e, !0);
    if (t.hostname && (!t.protocol || Bn.indexOf(t.protocol) >= 0))
      try {
        t.hostname = Cn.toASCII(t.hostname);
      } catch {
      }
    return t.auth && (t.auth = Oe(t.auth)), t.hostname && (t.hostname = Oe(t.hostname)), t.pathname && (t.pathname = Oe(t.pathname)), t.search && (t.search = Oe(t.search)), t.hash && (t.hash = Oe(t.hash)), Tr(t);
  }
  /**
  * Function used to decode link url to a human-readable format`
  */
  normalizeLinkText(e) {
    const t = Fr(e, !0);
    if (t.hostname && (!t.protocol || Bn.indexOf(t.protocol) >= 0))
      try {
        t.hostname = Cn.toUnicode(t.hostname);
      } catch {
      }
    return Ge(Tr(t), Ge.defaultChars + "%");
  }
  constructor(...e) {
    q(
      this,
      /**
      * Instance of {@link ParserInline}. You may need it to add new rules when
      * writing plugins. For simple rules control use {@link MarkdownIt.disable}
      * and {@link MarkdownIt.enable}.
      */
      "inline",
      new vs()
    ), q(
      this,
      /**
      * Instance of {@link ParserBlock}. You may need it to add new rules when
      * writing plugins. For simple rules control use {@link MarkdownIt.disable}
      * and {@link MarkdownIt.enable}.
      */
      "block",
      new gs()
    ), q(
      this,
      /**
      * Instance of {@link ParserCore} chain executor. You may need it to add new
      * rules when writing plugins. For simple rules control use
      * {@link MarkdownIt.disable} and {@link MarkdownIt.enable}.
      */
      "core",
      new ps()
    ), q(
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
      new us()
    ), q(
      this,
      /**
      * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
      * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/src/rules_core/linkify.ts)
      * rule.
      */
      "linkify",
      new Pa()
    ), q(
      this,
      /**
      * Assorted utility functions, useful to write plugins. See details
      * [here](https://github.com/markdown-it/markdown-it/blob/master/src/common/utils.ts).
      */
      "utils",
      Ga
    ), q(
      this,
      /**
      * Link components parser functions, useful to write plugins. See details
      * [here](https://github.com/markdown-it/markdown-it/blob/master/src/helpers).
      */
      "helpers",
      Object.assign({}, hl)
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
      if (t = Ec[i], !t) throw new Error(`Wrong 'markdown-it' preset "${i}", check name`);
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
        var a;
        const l = (a = r[s]) === null || a === void 0 ? void 0 : a.rules;
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
q(Ie, "Token", $e);
q(Ie, "Ruler", lt);
q(Ie, "Renderer", us);
q(Ie, "ParserCore", ps);
q(Ie, "StateCore", hs);
q(Ie, "ParserBlock", gs);
q(Ie, "StateBlock", ds);
q(Ie, "ParserInline", vs);
q(Ie, "StateInline", bs);
var Ic = as(Ie);
function Tc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function _s(e) {
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
function je(e) {
  return e === $.Space || e === $.NewLine || e === $.Tab || e === $.FormFeed || e === $.CarriageReturn;
}
function We(e) {
  return e === $.Slash || e === $.Gt || je(e);
}
function Fc(e) {
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
}, Nc = /* @__PURE__ */ new Map([
  [W.IframeEnd[2], W.IframeEnd],
  [W.NoembedEnd[2], W.NoembedEnd],
  [W.Plaintext[2], W.Plaintext],
  [W.ScriptEnd[2], W.ScriptEnd],
  [W.TitleEnd[2], W.TitleEnd],
  [W.XmpEnd[2], W.XmpEnd]
]);
class ks {
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
    this.cbs = i, this.xmlMode = t, this.decodeEntities = r, this.recognizeSelfClosing = n, this.entityDecoder = new ka(t ? $i : ji, (s, a) => this.emitCodePoint(s, a));
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
    return this.xmlMode ? !We(t) : Fc(t);
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
      const r = this.xmlMode || this.cbs.isInForeignContext?.() ? void 0 : Nc.get(t | 32);
      r === void 0 ? this.state = E.InTagName : (this.isSpecial = !0, this.currentSequence = r, this.sequenceIndex = 3, this.state = E.SpecialStartSequence);
    } else t === $.Slash ? this.state = E.BeforeClosingTagName : (this.state = E.Text, this.stateText(t));
  }
  stateInTagName(t) {
    We(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    je(t) ? this.xmlMode || (this.state = E.InSpecialComment, this.sectionStart = this.index) : t === $.Gt ? (this.state = E.Text, this.xmlMode || (this.sectionStart = this.index + 1)) : (this.state = this.isTagStartChar(t) ? E.InClosingTagName : E.InSpecialComment, this.sectionStart = this.index);
  }
  stateInClosingTagName(t) {
    We(t) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = E.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === $.Gt || this.fastForwardTo($.Gt)) && (this.state = E.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === $.Gt ? (this.cbs.onopentagend(this.index), this.enterTagBody(), this.sectionStart = this.index + 1) : t === $.Slash ? this.state = E.InSelfClosingTag : je(t) || (this.state = E.InAttributeName, this.sectionStart = this.index);
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
    } else je(t) || (this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === $.Eq || We(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = E.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === $.Eq ? this.state = E.BeforeAttributeValue : t === $.Slash || t === $.Gt ? (this.cbs.onattribend(_e.NoValue, this.sectionStart), this.sectionStart = -1, this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t)) : je(t) || (this.cbs.onattribend(_e.NoValue, this.sectionStart), this.state = E.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === $.DoubleQuote ? (this.state = E.InAttributeValueDq, this.sectionStart = this.index + 1) : t === $.SingleQuote ? (this.state = E.InAttributeValueSq, this.sectionStart = this.index + 1) : je(t) || (this.sectionStart = this.index, this.state = E.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
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
    je(t) || t === $.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(_e.Unquoted, this.index), this.state = E.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === $.Amp && this.startEntity();
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
const { fromCodePoint: Pn } = String, Ve = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), ce = /* @__PURE__ */ new Set(["p"]), He = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p"]), Ln = /* @__PURE__ */ new Set(["thead", "tbody"]), zn = /* @__PURE__ */ new Set(["dd", "dt"]), qn = /* @__PURE__ */ new Set(["rt", "rp"]), Oc = /* @__PURE__ */ new Map([
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
  ["dd", zn],
  ["dt", zn],
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
  ["rt", qn],
  ["rp", qn],
  ["tbody", Ln],
  ["tfoot", Ln]
]), jn = "doctype", Mc = /* @__PURE__ */ new Set([
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
]), Bc = /* @__PURE__ */ new Set(["math", "svg"]), $n = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), Un = /* @__PURE__ */ new Map([
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
var Ne;
(function(e) {
  e[e.None = 0] = "None", e[e.Svg = 1] = "Svg", e[e.MathML = 2] = "MathML";
})(Ne || (Ne = {}));
const Pc = /\s|\//;
class $r {
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
    this.options = r, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = r.lowerCaseTags ?? this.htmlMode, this.lowerCaseAttributeNames = r.lowerCaseAttributeNames ?? this.htmlMode, this.recognizeSelfClosing = r.recognizeSelfClosing ?? !this.htmlMode, this.tokenizer = new (r.Tokenizer ?? ks)(this.options, this), this.foreignContext = [Ne.None], this.cbs.onparserinit?.(this);
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
    this.endIndex = r - 1, this.cbs.ontext?.(Pn(t)), this.startIndex = r;
  }
  /** @internal */
  isInForeignContext() {
    return this.foreignContext[0] !== Ne.None;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   * @param name Name of the pseudo selector.
   */
  isVoidElement(t) {
    return this.htmlMode && Mc.has(t);
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
    if (this.foreignContext[0] === Ne.Svg)
      return Un.get(n) ?? n;
    if (this.foreignContext.length > 1) {
      const i = Un.get(n);
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
    const r = this.htmlMode && Oc.get(t);
    if (r)
      for (; this.stack.length > 0 && r.has(this.stack[0]); )
        this.popElement(!0);
    this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (t === "svg" ? this.foreignContext.unshift(Ne.Svg) : t === "math" ? this.foreignContext.unshift(Ne.MathML) : $n.has(t) && this.foreignContext.unshift(Ne.None))), this.cbs.onopentagname?.(t), this.cbs.onopentag && (this.attribs = {});
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
    this.htmlMode && (Bc.has(r) || $n.has(r)) && this.foreignContext.shift(), this.cbs.onclosetag?.(r, t);
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
    this.attribvalue += Pn(t);
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
    const r = t.search(Pc);
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
      const i = this.htmlMode ? this.lowerCaseTagNames ? jn : n.slice(0, jn.length) : this.getInstructionName(n);
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
    this.cbs.onreset?.(), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, this.cbs.onparserinit?.(this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(Ne.None), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
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
function Cs(e) {
  return e.type === G.Tag || e.type === G.Script || e.type === G.Style;
}
const Rs = G.Root, As = G.Text, Es = G.Directive, Ss = G.Comment, Ds = G.Script, Is = G.Style, Ts = G.Tag, Fs = G.CDATA, Lc = G.Doctype, zc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CDATA: Fs,
  Comment: Ss,
  Directive: Es,
  Doctype: Lc,
  get ElementType() {
    return G;
  },
  Root: Rs,
  Script: Ds,
  Style: Is,
  Tag: Ts,
  Text: As,
  isTag: Cs
}, Symbol.toStringTag, { value: "Module" }));
class Ns {
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
    return zs(this, t);
  }
}
class Ur extends Ns {
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
class Or extends Ur {
  type = G.Text;
  get nodeType() {
    return 3;
  }
}
class Os extends Ur {
  type = G.Comment;
  get nodeType() {
    return 8;
  }
}
class Ms extends Ur {
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
class Jr extends Ns {
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
class Bs extends Jr {
  type = G.CDATA;
  get nodeType() {
    return 4;
  }
}
class Mr extends Jr {
  type = G.Root;
  get nodeType() {
    return 9;
  }
}
class Ps extends Jr {
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
  return Cs(e);
}
function Wr(e) {
  return e.type === G.CDATA;
}
function Ke(e) {
  return e.type === G.Text;
}
function Ls(e) {
  return e.type === G.Comment;
}
function qc(e) {
  return e.type === G.Directive;
}
function jc(e) {
  return e.type === G.Root;
}
function Se(e) {
  return Object.hasOwn(e, "children");
}
function zs(e, t = !1) {
  let r;
  if (Ke(e))
    r = new Or(e.data);
  else if (Ls(e))
    r = new Os(e.data);
  else if (we(e)) {
    const n = t ? Qt(e.children) : [], i = new Ps(e.name, { ...e.attribs }, n);
    for (const s of n)
      s.parent = i;
    e.namespace != null && (i.namespace = e.namespace), e["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), r = i;
  } else if (Wr(e)) {
    const n = t ? Qt(e.children) : [], i = new Bs(n);
    for (const s of n)
      s.parent = i;
    r = i;
  } else if (jc(e)) {
    const n = t ? Qt(e.children) : [], i = new Mr(n);
    for (const s of n)
      s.parent = i;
    e["x-mode"] && (i["x-mode"] = e["x-mode"]), r = i;
  } else if (qc(e)) {
    const n = new Ms(e.name, e.data);
    e["x-name"] != null && (n["x-name"] = e["x-name"], n["x-publicId"] = e["x-publicId"], n["x-systemId"] = e["x-systemId"]), r = n;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return r.startIndex = e.startIndex, r.endIndex = e.endIndex, e.sourceCodeLocation != null && (r.sourceCodeLocation = e.sourceCodeLocation), r;
}
function Qt(e) {
  const t = e.map((r) => zs(r, !0));
  for (let r = 1; r < t.length; r++)
    t[r].prev = t[r - 1], t[r - 1].next = t[r];
  return t;
}
const Jn = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class St {
  /** The elements of the DOM */
  dom = [];
  /** The root element for the DOM */
  root = new Mr(this.dom);
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
    typeof r == "function" && (n = r, r = Jn), typeof t == "object" && (r = t, t = void 0), this.callback = t ?? null, this.options = r ?? Jn, this.elementCB = n ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new Mr(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
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
    const n = this.options.xmlMode ? G.Tag : void 0, i = new Ps(t, r, void 0, n);
    this.addNode(i), this.tagStack.push(i);
  }
  ontext(t) {
    const { lastNode: r } = this;
    if (r && r.type === G.Text)
      r.data += t, this.options.withEndIndices && this.parser && (r.endIndex = this.parser.endIndex);
    else {
      const n = new Or(t);
      this.addNode(n), this.lastNode = n;
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === G.Comment) {
      this.lastNode.data += t;
      return;
    }
    const r = new Os(t);
    this.addNode(r), this.lastNode = r;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const t = new Or(""), r = new Bs([t]);
    this.addNode(r), t.parent = r, this.lastNode = t;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(t, r) {
    const n = new Ms(t, r);
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
  return qs(e, Array.isArray(t) ? t : [t], r, n);
}
function qs(e, t, r, n) {
  const i = [], s = [Array.isArray(t) ? t : [t]], a = [0];
  for (; ; ) {
    if (a[0] >= s[0].length) {
      if (a.length === 1)
        return i;
      s.shift(), a.shift();
      continue;
    }
    const l = s[0][a[0]++];
    if (e(l) && (i.push(l), --n <= 0))
      return i;
    r && Se(l) && l.children.length > 0 && (a.unshift(0), s.unshift(l.children));
  }
}
function Vr(e, t, r = !0) {
  const n = Array.isArray(t) ? t : [t];
  for (const i of n) {
    if (we(i) && e(i))
      return i;
    if (r && Se(i) && i.children.length > 0) {
      const s = Vr(e, i.children, !0);
      if (s)
        return s;
    }
  }
  return null;
}
function js(e, t) {
  return (Array.isArray(t) ? t : [t]).some((r) => we(r) && e(r) || Se(r) && js(e, r.children));
}
function $c(e, t) {
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
const Dt = {
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
function Hr(e, t) {
  return typeof t == "function" ? (r) => we(r) && t(r.attribs[e]) : (r) => we(r) && r.attribs[e] === t;
}
function Uc(e, t) {
  return (r) => e(r) || t(r);
}
function $s(e) {
  const t = Object.keys(e).map((r) => {
    const n = e[r];
    return Object.hasOwn(Dt, r) ? Dt[r](n) : Hr(r, n);
  });
  return t.length === 0 ? null : t.reduce(Uc);
}
function Jc(e, t) {
  const r = $s(e);
  return r ? r(t) : !0;
}
function Wc(e, t, r, n = Number.POSITIVE_INFINITY) {
  const i = $s(e);
  return i ? ct(i, t, r, n) : [];
}
function Vc(e, t, r = !0) {
  return Array.isArray(t) || (t = [t]), Vr(Hr("id", e), t, r);
}
function Qe(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(Dt.tag_name(e), t, r, n);
}
function Hc(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(Hr("class", e), t, r, n);
}
function Yc(e, t, r = !0, n = Number.POSITIVE_INFINITY) {
  return ct(Dt.tag_type(e), t, r, n);
}
const Gc = new Map("altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath".split(" ").map((e) => [e.toLowerCase(), e])), Zc = new Map("definitionURL attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ").map((e) => [e.toLowerCase(), e])), Xc = new Set("style script xmp iframe noembed noframes plaintext noscript".split(" ")), Kc = new Set("area base basefont br col command embed frame hr img input isindex keygen link meta param source track wbr".split(" ")), Qc = /* @__PURE__ */ new Set(["svg", "math"]), eu = new Set("mi mo mn ms mtext annotation-xml foreignObject desc title".split(" "));
function tu(e, t = {}) {
  const r = "length" in e ? e : [e], n = t.xmlMode ?? !1;
  let i = "";
  for (let s = 0; s < r.length; s++)
    i += Js(r[s], t, n);
  return i;
}
function Us(e, t, r) {
  let n = "";
  for (let i = 0; i < e.length; i++)
    n += Js(e[i], t, r);
  return n;
}
function Js(e, t, r) {
  switch (e.type) {
    case Rs:
      return Us(e.children, t, r);
    case Es:
      return `<${e.data}>`;
    case Ss:
      return `<!--${e.data}-->`;
    case Fs:
      return `<![CDATA[${e.children[0].data}]]>`;
    case Ds:
    case Is:
    case Ts:
      return ru(e, t, r);
    case As: {
      const n = e, i = n.data || "";
      return (t.encodeEntities ?? t.decodeEntities) !== !1 && !(!r && n.parent && Xc.has(n.parent.name)) ? r || t.encodeEntities !== "utf8" ? Zi(i) : Ia(i) : i;
    }
  }
}
function ru(e, t, r) {
  r === "foreign" && (e.name = Gc.get(e.name) ?? e.name, e.parent && eu.has(e.parent.name) && (r = !1)), !r && Qc.has(e.name) && (r = "foreign");
  const { name: n, children: i } = e, s = !r && Kc.has(n);
  let a = `<${n}${iu(e.attribs, t, r)}`;
  return i.length === 0 && (r ? t.selfClosingTags !== !1 : t.selfClosingTags && s) ? a += r ? "/>" : " />" : (a += ">", i.length > 0 && (a += Us(i, t, r)), s || (a += `</${n}>`)), a;
}
function nu(e) {
  return e.replaceAll('"', "&quot;");
}
function iu(e, t, r) {
  if (!e)
    return "";
  const n = (t.encodeEntities ?? t.decodeEntities) === !1 ? nu : r || t.encodeEntities !== "utf8" ? Zi : Sa, i = r === "foreign", s = !!(t.emptyAttrs ?? r);
  let a = "";
  for (const l in e) {
    if (!Object.hasOwn(e, l))
      continue;
    const f = e[l], c = i ? Zc.get(l) ?? l : l;
    a += !s && (f == null || f === "") ? ` ${c}` : ` ${c}="${n(f == null ? "" : String(f))}"`;
  }
  return a;
}
function Ws(e, t) {
  return tu(e, t);
}
function su(e, t) {
  return Se(e) ? e.children.map((r) => Ws(r, t)).join("") : "";
}
function kt(e) {
  return Array.isArray(e) ? e.map(kt).join("") : we(e) ? e.name === "br" ? `
` : kt(e.children) : Wr(e) ? kt(e.children) : Ke(e) ? e.data : "";
}
function It(e) {
  return Array.isArray(e) ? e.map(It).join("") : Se(e) && !Ls(e) ? It(e.children) : Ke(e) ? e.data : "";
}
function Br(e) {
  return Array.isArray(e) ? e.map(Br).join("") : Se(e) && (e.type === G.Tag || Wr(e)) ? Br(e.children) : Ke(e) ? e.data : "";
}
function Yr(e) {
  const t = Tt(uu, e);
  return t ? t.name === "feed" ? ou(t) : au(t) : null;
}
function ou(e) {
  const t = e.children, r = {
    type: "atom",
    items: Qe("entry", t).map((s) => {
      const { children: a } = s, l = { media: Vs(a) };
      ge(l, "id", "id", a), ge(l, "title", "title", a);
      const f = Tt("link", a)?.attribs.href;
      f && (l.link = f);
      const c = Be("summary", a) || Be("content", a);
      c && (l.description = c);
      const d = Be("updated", a);
      return d && (l.pubDate = new Date(d)), l;
    })
  };
  ge(r, "id", "id", t), ge(r, "title", "title", t);
  const n = Tt("link", t)?.attribs.href;
  n && (r.link = n), ge(r, "description", "subtitle", t);
  const i = Be("updated", t);
  return i && (r.updated = new Date(i)), ge(r, "author", "email", t, !0), r;
}
function au(e) {
  const t = Tt("channel", e.children)?.children ?? [], r = {
    type: e.name.substr(0, 3),
    id: "",
    items: Qe("item", e.children).map((i) => {
      const { children: s } = i, a = { media: Vs(s) };
      ge(a, "id", "guid", s), ge(a, "title", "title", s), ge(a, "link", "link", s), ge(a, "description", "description", s);
      const l = Be("pubDate", s) || Be("dc:date", s);
      return l && (a.pubDate = new Date(l)), a;
    })
  };
  ge(r, "title", "title", t), ge(r, "link", "link", t), ge(r, "description", "description", t);
  const n = Be("lastBuildDate", t);
  return n && (r.updated = new Date(n)), ge(r, "author", "managingEditor", t, !0), r;
}
const lu = ["url", "type", "lang"], cu = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function Vs(e) {
  return Qe("media:content", e).map((t) => {
    const { attribs: r } = t, n = {
      medium: r.medium,
      isDefault: !!r.isDefault
    };
    for (const i of lu)
      r[i] && (n[i] = r[i]);
    for (const i of cu)
      r[i] && (n[i] = Number.parseInt(r[i], 10));
    return r.expression && (n.expression = r.expression), n;
  });
}
function Tt(e, t) {
  return Qe(e, t, !0, 1)[0];
}
function Be(e, t, r = !1) {
  return It(Qe(e, t, r, 1)).trim();
}
function ge(e, t, r, n, i = !1) {
  const s = Be(r, n, i);
  s && (e[t] = s);
}
function uu(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
function hu(e) {
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
function Hs(e, t) {
  const r = [], n = [];
  if (e === t)
    return 0;
  let i = Se(e) ? e : e.parent;
  for (; i; )
    r.unshift(i), i = i.parent;
  for (i = Se(t) ? t : t.parent; i; )
    n.unshift(i), i = i.parent;
  const s = Math.min(r.length, n.length);
  let a = 0;
  for (; a < s && r[a] === n[a]; )
    a++;
  if (a === 0)
    return xe.DISCONNECTED;
  const l = r[a - 1], f = l.children, c = r[a], d = n[a];
  return f.indexOf(c) > f.indexOf(d) ? l === t ? xe.FOLLOWING | xe.CONTAINED_BY : xe.FOLLOWING : l === e ? xe.PRECEDING | xe.CONTAINS : xe.PRECEDING;
}
function fu(e) {
  return e = e.filter((t, r, n) => !n.includes(t, r + 1)), e.sort((t, r) => {
    const n = Hs(t, r);
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
function pu(e, t) {
  if (t.prev = e.prev, t.prev && (t.prev.next = t), t.next = e.next, t.next && (t.next.prev = t), t.parent = e.parent, t.parent) {
    const { children: r } = t.parent, n = r.lastIndexOf(e);
    if (n === -1)
      return;
    r[n] = t, e.parent = null;
  }
}
function du(e, t) {
  if (ut(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const r = e.children[e.children.length - 2];
    r.next = t, t.prev = r;
  } else
    t.prev = null;
}
function mu(e, t) {
  ut(t);
  const { parent: r } = e, n = e.next;
  if (t.next = n, t.prev = e, e.next = t, t.parent = r, n) {
    if (n.prev = t, r) {
      const i = r.children;
      i.splice(i.lastIndexOf(n), 0, t);
    }
  } else r && r.children.push(t);
}
function gu(e, t) {
  if (ut(t), t.parent = e, t.prev = null, e.children.unshift(t) === 1)
    t.next = null;
  else {
    const r = e.children[1];
    r.prev = t, t.next = r;
  }
}
function bu(e, t) {
  ut(t);
  const { parent: r } = e;
  if (r) {
    const n = r.children;
    n.splice(n.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = r, t.prev = e.prev, t.next = e, e.prev = t;
}
function Ys(e) {
  return Se(e) ? e.children : [];
}
function Gs(e) {
  return e.parent || null;
}
function xu(e) {
  const t = Gs(e);
  if (t != null)
    return Ys(t);
  const r = [e];
  let { prev: n, next: i } = e;
  for (; n != null; )
    r.unshift(n), { prev: n } = n;
  for (; i != null; )
    r.push(i), { next: i } = i;
  return r;
}
function wu(e, t) {
  const { attribs: r } = e;
  return r?.[t];
}
function yu(e, t) {
  const { attribs: r } = e;
  return r != null && Object.hasOwn(r, t) && r[t] != null;
}
function vu(e) {
  return e.name;
}
function _u(e) {
  let { next: t } = e;
  for (; t !== null && !we(t); )
    ({ next: t } = t);
  return t;
}
function ku(e) {
  let { prev: t } = e;
  for (; t !== null && !we(t); )
    ({ prev: t } = t);
  return t;
}
const Cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return xe;
  },
  append: mu,
  appendChild: du,
  compareDocumentPosition: Hs,
  existsOne: js,
  filter: ct,
  find: qs,
  findAll: $c,
  findOne: Vr,
  getAttributeValue: wu,
  getChildren: Ys,
  getElementById: Vc,
  getElements: Wc,
  getElementsByClassName: Hc,
  getElementsByTagName: Qe,
  getElementsByTagType: Yc,
  getFeed: Yr,
  getInnerHTML: su,
  getName: vu,
  getOuterHTML: Ws,
  getParent: Gs,
  getSiblings: xu,
  getText: kt,
  hasAttrib: yu,
  innerText: Br,
  nextElementSibling: _u,
  prepend: bu,
  prependChild: gu,
  prevElementSibling: ku,
  removeElement: ut,
  removeSubsets: hu,
  replaceElement: pu,
  testElement: Jc,
  textContent: It,
  uniqueSort: fu
}, Symbol.toStringTag, { value: "Module" }));
function Zs(e, t) {
  const r = new St(void 0, t);
  return new $r(r, t).end(e), r.root;
}
function Ru(e, t, r) {
  const n = new St((i) => e(i, n.root), t, r);
  return new $r(n, t);
}
const Au = { xmlMode: !0 };
function Eu(e, t = Au) {
  return Yr(Zs(e, t).children);
}
const Su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DefaultHandler: St,
  DomHandler: St,
  DomUtils: Cu,
  ElementType: zc,
  Parser: $r,
  get QuoteType() {
    return _e;
  },
  Tokenizer: ks,
  createDocumentStream: Ru,
  getFeed: Yr,
  parseDocument: Zs,
  parseFeed: Eu
}, Symbol.toStringTag, { value: "Module" })), Du = /* @__PURE__ */ _s(Su);
var er, Wn;
function Iu() {
  return Wn || (Wn = 1, er = (e) => {
    if (typeof e != "string")
      throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }), er;
}
var tr = {}, Vn;
function Tu() {
  if (Vn) return tr;
  Vn = 1;
  function e(r) {
    return Object.prototype.toString.call(r) === "[object Object]";
  }
  function t(r) {
    var n, i;
    return e(r) === !1 ? !1 : (n = r.constructor, n === void 0 ? !0 : (i = n.prototype, !(e(i) === !1 || i.hasOwnProperty("isPrototypeOf") === !1)));
  }
  return tr.isPlainObject = t, tr;
}
var Ct = { exports: {} }, Fu = Ct.exports, Hn;
function Nu() {
  return Hn || (Hn = 1, (function(e) {
    (function(t, r) {
      e.exports ? e.exports = r() : t.parseSrcset = r();
    })(Fu, function() {
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
          var x, b = C.exec(t.substring(g));
          if (b)
            return x = b[0], g += x.length, x;
        }
        for (var i = t.length, s = /^[ \t\n\r\u000c]+/, a = /^[, \t\n\r\u000c]+/, l = /^[^ \t\n\r\u000c]+/, f = /[,]+$/, c = /^\d+$/, d = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, u, p, o, h, m, g = 0, k = []; ; ) {
          if (n(a), g >= i)
            return k;
          u = n(l), p = [], u.slice(-1) === "," ? (u = u.replace(f, ""), _()) : v();
        }
        function v() {
          for (n(s), o = "", h = "in descriptor"; ; ) {
            if (m = t.charAt(g), h === "in descriptor")
              if (r(m))
                o && (p.push(o), o = "", h = "after descriptor");
              else if (m === ",") {
                g += 1, o && p.push(o), _();
                return;
              } else if (m === "(")
                o = o + m, h = "in parens";
              else if (m === "") {
                o && p.push(o), _();
                return;
              } else
                o = o + m;
            else if (h === "in parens")
              if (m === ")")
                o = o + m, h = "in descriptor";
              else if (m === "") {
                p.push(o), _();
                return;
              } else
                o = o + m;
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
          var C = !1, x, b, y, w, R = {}, I, F, S, Y, P;
          for (w = 0; w < p.length; w++)
            I = p[w], F = I[I.length - 1], S = I.substring(0, I.length - 1), Y = parseInt(S, 10), P = parseFloat(S), c.test(S) && F === "w" ? ((x || b) && (C = !0), Y === 0 ? C = !0 : x = Y) : d.test(S) && F === "x" ? ((x || b || y) && (C = !0), P < 0 ? C = !0 : b = P) : c.test(S) && F === "h" ? ((y || b) && (C = !0), Y === 0 ? C = !0 : y = Y) : C = !0;
          C ? console && console.log && console.log("Invalid srcset descriptor found in '" + t + "' at '" + I + "'.") : (R.url = u, x && (R.w = x), b && (R.d = b), y && (R.h = y), k.push(R));
        }
      };
    });
  })(Ct)), Ct.exports;
}
var wt = { exports: {} }, Yn;
function Ou() {
  if (Yn) return wt.exports;
  Yn = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return wt.exports = t(), wt.exports.createColors = t, wt.exports;
}
const Mu = {}, Bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mu
}, Symbol.toStringTag, { value: "Module" })), ke = /* @__PURE__ */ _s(Bu);
var rr, Gn;
function Gr() {
  if (Gn) return rr;
  Gn = 1;
  let e = /* @__PURE__ */ Ou(), t = ke;
  class r extends Error {
    constructor(i, s, a, l, f, c) {
      super(i), this.name = "CssSyntaxError", this.reason = i, f && (this.file = f), l && (this.source = l), c && (this.plugin = c), typeof s < "u" && typeof a < "u" && (typeof s == "number" ? (this.line = s, this.column = a) : (this.line = s.line, this.column = s.column, this.endLine = a.line, this.endColumn = a.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, r);
    }
    setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
    }
    showSourceCode(i) {
      if (!this.source) return "";
      let s = this.source;
      i == null && (i = e.isColorSupported);
      let a = (o) => o, l = (o) => o, f = (o) => o;
      if (i) {
        let { bold: o, gray: h, red: m } = e.createColors(!0);
        l = (g) => o(m(g)), a = (g) => h(g), t && (f = (g) => t(g));
      }
      let c = s.split(/\r?\n/), d = Math.max(this.line - 3, 0), u = Math.min(this.line + 2, c.length), p = String(u).length;
      return c.slice(d, u).map((o, h) => {
        let m = d + 1 + h, g = " " + (" " + m).slice(-p) + " | ";
        if (m === this.line) {
          if (o.length > 160) {
            let v = 20, _ = typeof this.endColumn == "number" ? this.endColumn : this.column, C = Math.max(0, this.column - v), x = Math.max(this.column + v, _ + v), b = o.slice(C, x), y = a(g.replace(/\d/g, " ")) + o.slice(0, Math.min(this.column - 1, v - 1)).replace(/[^\t]/g, " ");
            return l(">") + a(g) + f(b) + `
 ` + y + l("^");
          }
          let k = a(g.replace(/\d/g, " ")) + o.slice(0, this.column - 1).replace(/[^\t]/g, " ");
          return l(">") + a(g) + f(o) + `
 ` + k + l("^");
        }
        return " " + a(g) + f(o);
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
  return rr = r, r.default = r, rr;
}
var nr, Zn;
function Xs() {
  if (Zn) return nr;
  Zn = 1;
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
    let o = f.raw(d, "semicolon"), h = d.type === "document";
    for (let m = u.length - 1; m >= 0; m--) {
      let g = u[m], k = p !== m || o;
      !k && m < u.length - 1 && (g.type === "atrule" && !g.nodes || g.type === "decl" && i(g)) && (k = !0), c.push({
        document: h,
        node: g,
        semicolon: k
      });
    }
  }
  function a(f, c, d, u) {
    let p = f.raw(d, "between", "beforeOpen");
    f.builder(u + p + "{", d, "start");
    let o = d.nodes && d.nodes.length, h = () => {
      let m = o ? f.raw(d, "after") : f.raw(d, "after", "emptyBody");
      m && f.builder(m), f.builder("}", d, "end"), d.type === "rule" && d.raws.ownSemicolon && f.builder(d.raws.ownSemicolon, d, "end");
    };
    o ? (c.push(h), s(f, c, d)) : h();
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
      let p = c.parent, o = 0;
      for (; p && p.type !== "root"; )
        o += 1, p = p.parent;
      if (u.includes(`
`)) {
        let h = this.raw(c, null, "indent");
        if (h.length)
          for (let m = 0; m < o; m++) u += h;
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
        (o) => this[o] === d[o]
      ), p = [];
      for (s(this, p, c); p.length > 0; ) {
        let o = p.pop();
        if (typeof o == "function") {
          o();
          continue;
        }
        let h = o.node, m = this.raw(h, "before");
        m && this.builder(m), u && h.type === "rule" ? a(this, p, h, this.rawValue(h, "selector")) : u && h.type === "atrule" && h.nodes ? a(this, p, h, n(this, h)) : this.stringify(h, o.semicolon);
      }
    }
    comment(c) {
      let d = this.raw(c, "left", "commentLeft"), u = this.raw(c, "right", "commentRight");
      this.builder("/*" + d + c.text + u + "*/", c);
    }
    decl(c, d) {
      let u = c.raws, p = this.raw(c, "between", "colon"), o = c.prop + p + this.rawValue(c, "value");
      c.important && (o += u.important || " !important"), d && (o += ";"), this.builder(o, c);
    }
    document(c) {
      this.body(c);
    }
    raw(c, d, u) {
      let p;
      if (u || (u = d), d && (p = c.raws[d], typeof p < "u"))
        return p;
      let o = c.parent;
      if (u === "before" && (!o || o.type === "root" && o.first === c || o && o.type === "document"))
        return "";
      if (!o) return t[u];
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
          let o = u.raws.before.split(`
`);
          return d = o[o.length - 1], d = d.replace(/\S/g, ""), !1;
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
  return nr = l, l.default = l, nr;
}
var ir, Xn;
function Ot() {
  if (Xn) return ir;
  Xn = 1;
  let e = Xs();
  const t = /(<)(\/?style\b)/gi, r = /(<)(!--)/g;
  function n(l) {
    return l.includes("<") ? l.replace(t, "\\3c $2").replace(r, "\\3c $2") : l;
  }
  function i(l, f, c) {
    let d = [], u = 0, p = 0;
    for (let o = 0; o < l.length; o += 3) {
      let h = p, m = u + l[o].length;
      for (; u < m; )
        f[u] === c[p] ? (u += 1, p += 1) : (u += 1, p += 4);
      d.push(c.slice(h, p));
    }
    return d;
  }
  class s extends e {
    escapeHTML(f) {
      let c = this.builder, d, u;
      if (this.builder = (o, h, m) => {
        d ? (u += o, d.push(o, h, m)) : o.includes("<") ? (u = o, d = [o, h, m]) : c(o, h, m);
      }, f(), this.builder = c, !d) return;
      let p = n(u);
      if (p === u)
        for (let o = 0; o < d.length; o += 3)
          c(d[o], d[o + 1], d[o + 2]);
      else {
        let o = i(d, u, p);
        for (let h = 0; h < d.length; h += 3)
          c(o[h / 3], d[h + 1], d[h + 2]);
      }
    }
    root(f) {
      f.parent && f.parent.type === "document" ? (this.escapeHTML(() => this.body(f)), f.raws.after && this.builder(f.raws.after)) : this.escapeHTML(() => super.root(f));
    }
  }
  function a(l, f) {
    let c = new s(f);
    l.type === "root" || l.type === "document" ? c.stringify(l) : c.escapeHTML(() => c.stringify(l));
  }
  return ir = a, a.default = a, ir;
}
var yt = {}, Kn;
function Mt() {
  return Kn || (Kn = 1, yt.isClean = /* @__PURE__ */ Symbol("isClean"), yt.my = /* @__PURE__ */ Symbol("my")), yt;
}
var sr, Qn;
function Bt() {
  if (Qn) return sr;
  Qn = 1;
  let e = Gr(), t = Xs(), r = Ot(), { isClean: n, my: i } = Mt();
  function s(f, c) {
    let d = new f.constructor(), u = [[f, d, c]];
    for (; u.length > 0; ) {
      let [p, o, h] = u.pop();
      for (let m in p) {
        if (!Object.prototype.hasOwnProperty.call(p, m) || m === "proxyCache") continue;
        let g = p[m], k = typeof g;
        if (m === "parent" && k === "object")
          h && (o[m] = h);
        else if (m === "source")
          o[m] = g;
        else if (Array.isArray(g)) {
          let v = [];
          o[m] = v;
          for (let _ of g) {
            let C = new _.constructor();
            v.push(C), u.push([_, C, o]);
          }
        } else {
          if (k === "object" && g !== null) {
            let v = new g.constructor();
            u.push([g, v, void 0]), g = v;
          }
          o[m] = g;
        }
      }
    }
    return d;
  }
  function a(f, c) {
    if (c && typeof c.offset < "u")
      return c.offset;
    let d = 1, u = 1, p = 0;
    for (let o = 0; o < f.length; o++) {
      if (u === c.line && d === c.column) {
        p = o;
        break;
      }
      f[o] === `
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
        offset: a(d, this.source.start)
      };
      if (c.index)
        u = this.positionInside(c.index);
      else if (c.word) {
        let o = d.slice(
          a(d, this.source.start),
          this.rangeBy().end.offset
        ).indexOf(c.word);
        o !== -1 && (u = this.positionInside(o));
      }
      return u;
    }
    positionInside(c) {
      let d = this.source.start.column, u = this.source.start.line, p = "document" in this.source.input ? this.source.input.document : this.source.input.css, o = a(p, this.source.start), h = o + c;
      for (let m = o; m < h; m++)
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
        offset: a(d, this.source.start)
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
          a(d, this.source.end) + 1
        )
      } : {
        column: u.column + 1,
        line: u.line,
        offset: u.offset + 1
      };
      if (c.word) {
        let h = d.slice(
          a(d, this.source.start),
          p.offset
        ).indexOf(c.word);
        h !== -1 && (u = this.positionInside(h), p = this.positionInside(h + c.word.length));
      } else
        c.start ? u = {
          column: c.start.column,
          line: c.start.line,
          offset: a(d, c.start)
        } : typeof c.index == "number" && (u = this.positionInside(c.index)), c.end ? p = {
          column: c.end.column,
          line: c.end.line,
          offset: a(d, c.end)
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
      let p = [], o = [[this, p, 0]];
      for (let m = 0; m < o.length; m++) {
        let [g, k, v] = o[m], _ = {};
        k[v] = _;
        for (let C in g) {
          if (!Object.prototype.hasOwnProperty.call(g, C) || C === "parent" || C === "proxyCache") continue;
          let x = g[C];
          if (Array.isArray(x)) {
            let b = [];
            _[C] = b;
            for (let y = 0; y < x.length; y++) {
              let w = x[y];
              typeof w == "object" && w.toJSON ? w.toJSON === l.prototype.toJSON ? o.push([w, b, y]) : b[y] = w.toJSON(null, d) : b[y] = w;
            }
          } else if (typeof x == "object" && x.toJSON)
            x.toJSON === l.prototype.toJSON ? o.push([x, _, C]) : _[C] = x.toJSON(null, d);
          else if (C === "source") {
            if (x == null) continue;
            let b = d.get(x.input);
            b == null && (b = d.size, d.set(x.input, b)), _[C] = {
              end: x.end,
              inputId: b,
              start: x.start
            };
          } else
            _[C] = x;
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
      for (let o in u) p[o] = u[o];
      return c.warn(d, p);
    }
  }
  return sr = l, l.default = l, sr;
}
var or, ei;
function Pt() {
  if (ei) return or;
  ei = 1;
  let e = Bt();
  class t extends e {
    constructor(n) {
      super(n), this.type = "comment";
    }
  }
  return or = t, t.default = t, or;
}
var ar, ti;
function Lt() {
  if (ti) return ar;
  ti = 1;
  let e = Bt();
  class t extends e {
    get variable() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
    constructor(n) {
      n && typeof n.value < "u" && typeof n.value != "string" && (n = { ...n, value: String(n.value) }), super(n), this.type = "decl";
    }
  }
  return ar = t, t.default = t, ar;
}
var lr, ri;
function Le() {
  if (ri) return lr;
  ri = 1;
  let e = Pt(), t = Lt(), r = Bt(), { isClean: n, my: i } = Mt(), s, a, l, f;
  function c(p) {
    let o = p.slice();
    for (; o.length > 0; ) {
      let h = o.pop();
      if (delete h.source, h.nodes) {
        h.nodes = h.nodes.slice();
        for (let m of h.nodes) o.push(m);
      }
    }
    return p.slice();
  }
  function d(p) {
    let o = [p];
    for (; o.length > 0; ) {
      let h = o.pop();
      if (h[n] = !1, h.proxyOf.nodes)
        for (let m of h.proxyOf.nodes) o.push(m);
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
    append(...o) {
      for (let h of o) {
        let m = this.normalize(h, this.last);
        for (let g of m) this.proxyOf.nodes.push(g);
      }
      return this.markDirty(), this;
    }
    cleanRaws(o) {
      let h = [this];
      for (; h.length > 0; ) {
        let m = h.pop();
        if (m !== this && m.cleanRaws !== u.prototype.cleanRaws) {
          m.cleanRaws(o);
          continue;
        }
        if (r.prototype.cleanRaws.call(m, o), m.nodes)
          for (let g of m.nodes) h.push(g);
      }
    }
    each(o) {
      if (!this.proxyOf.nodes) return;
      let h = this.getIterator(), m, g;
      for (; this.indexes[h] < this.proxyOf.nodes.length && (m = this.indexes[h], g = o(this.proxyOf.nodes[m], m), g !== !1); )
        this.indexes[h] += 1;
      return delete this.indexes[h], g;
    }
    every(o) {
      return this.nodes.every(o);
    }
    getIterator() {
      this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
      let o = this.lastEach;
      return this.indexes[o] = 0, o;
    }
    getProxyProcessor() {
      return {
        get(o, h) {
          return h === "proxyOf" ? o : o[h] ? h === "each" || typeof h == "string" && h.startsWith("walk") ? (...m) => o[h](
            ...m.map((g) => typeof g == "function" ? (k, v) => g(k.toProxy(), v) : g)
          ) : h === "every" || h === "some" ? (m) => o[h](
            (g, ...k) => m(g.toProxy(), ...k)
          ) : h === "root" ? () => o.root().toProxy() : h === "nodes" ? o.nodes.map((m) => m.toProxy()) : h === "first" || h === "last" ? o[h].toProxy() : o[h] : o[h];
        },
        set(o, h, m) {
          return o[h] === m || (o[h] = m, (h === "name" || h === "params" || h === "selector") && o.markDirty()), !0;
        }
      };
    }
    index(o) {
      return typeof o == "number" ? o : (o.proxyOf && (o = o.proxyOf), this.proxyOf.nodes.indexOf(o));
    }
    insertAfter(o, h) {
      let m = this.index(o), g = this.normalize(h, this.proxyOf.nodes[m]).reverse();
      m = this.index(o);
      for (let v of g) this.proxyOf.nodes.splice(m + 1, 0, v);
      let k;
      for (let v in this.indexes)
        k = this.indexes[v], m < k && (this.indexes[v] = k + g.length);
      return this.markDirty(), this;
    }
    insertBefore(o, h) {
      let m = this.index(o), g = m === 0 ? "prepend" : !1, k = this.normalize(
        h,
        this.proxyOf.nodes[m],
        g
      ).reverse();
      m = this.index(o);
      for (let _ of k) this.proxyOf.nodes.splice(m, 0, _);
      let v;
      for (let _ in this.indexes)
        v = this.indexes[_], m <= v && (this.indexes[_] = v + k.length);
      return this.markDirty(), this;
    }
    normalize(o, h) {
      if (typeof o == "string")
        o = c(a(o).nodes);
      else if (typeof o > "u")
        o = [];
      else if (Array.isArray(o)) {
        o = o.slice(0);
        for (let g of o)
          g.parent && g.parent.removeChild(g, "ignore");
      } else if (o.type === "root" && this.type !== "document") {
        o = o.nodes.slice(0);
        for (let g of o)
          g.parent && g.parent.removeChild(g, "ignore");
      } else if (o.type)
        o = [o];
      else if (o.prop) {
        if (typeof o.value > "u")
          throw new Error("Value field is missed in node creation");
        typeof o.value != "string" && (o.value = String(o.value)), o = [new t(o)];
      } else if (o.selector || o.selectors)
        o = [new f(o)];
      else if (o.name)
        o = [new s(o)];
      else if (o.text)
        o = [new e(o)];
      else
        throw new Error("Unknown node type in node creation");
      return o.map((g) => (g[i] || u.rebuild(g), g = g.proxyOf, g.parent && g.parent.removeChild(g), g[n] && d(g), g.raws || (g.raws = {}), typeof g.raws.before > "u" && h && typeof h.raws.before < "u" && (g.raws.before = h.raws.before.replace(/\S/g, "")), g.parent = this.proxyOf, g));
    }
    prepend(...o) {
      o = o.reverse();
      for (let h of o) {
        let m = this.normalize(h, this.first, "prepend").reverse();
        for (let g of m) this.proxyOf.nodes.unshift(g);
        for (let g in this.indexes)
          this.indexes[g] = this.indexes[g] + m.length;
      }
      return this.markDirty(), this;
    }
    push(o) {
      return o.parent = this, this.proxyOf.nodes.push(o), this;
    }
    removeAll() {
      for (let o of this.proxyOf.nodes) o.parent = void 0;
      return this.proxyOf.nodes = [], this.markDirty(), this;
    }
    removeChild(o) {
      o = this.index(o), this.proxyOf.nodes[o].parent = void 0, this.proxyOf.nodes.splice(o, 1);
      let h;
      for (let m in this.indexes)
        h = this.indexes[m], h >= o && (this.indexes[m] = h - 1);
      return this.markDirty(), this;
    }
    replaceValues(o, h, m) {
      return m || (m = h, h = {}), this.walkDecls((g) => {
        h.props && !h.props.includes(g.prop) || h.fast && !g.value.includes(h.fast) || (g.value = g.value.replace(o, m));
      }), this.markDirty(), this;
    }
    some(o) {
      return this.nodes.some(o);
    }
    walk(o) {
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
        let v = g.proxyOf.nodes[k], _;
        try {
          _ = o(v, k);
        } catch (C) {
          throw v.addToError(C);
        }
        if (_ === !1) {
          for (let C of h)
            delete C.node.indexes[C.iterator];
          return !1;
        }
        v.walk && v.proxyOf.nodes ? h.push({ iterator: v.getIterator(), node: v }) : g.indexes[m] += 1;
      }
    }
    walkAtRules(o, h) {
      return h ? o instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "atrule" && o.test(m.name))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "atrule" && m.name === o)
          return h(m, g);
      }) : (h = o, this.walk((m, g) => {
        if (m.type === "atrule")
          return h(m, g);
      }));
    }
    walkComments(o) {
      return this.walk((h, m) => {
        if (h.type === "comment")
          return o(h, m);
      });
    }
    walkDecls(o, h) {
      return h ? o instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "decl" && o.test(m.prop))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "decl" && m.prop === o)
          return h(m, g);
      }) : (h = o, this.walk((m, g) => {
        if (m.type === "decl")
          return h(m, g);
      }));
    }
    walkRules(o, h) {
      return h ? o instanceof RegExp ? this.walk((m, g) => {
        if (m.type === "rule" && o.test(m.selector))
          return h(m, g);
      }) : this.walk((m, g) => {
        if (m.type === "rule" && m.selector === o)
          return h(m, g);
      }) : (h = o, this.walk((m, g) => {
        if (m.type === "rule")
          return h(m, g);
      }));
    }
  }
  return u.registerParse = (p) => {
    a = p;
  }, u.registerRule = (p) => {
    f = p;
  }, u.registerAtRule = (p) => {
    s = p;
  }, u.registerRoot = (p) => {
    l = p;
  }, lr = u, u.default = u, u.rebuild = (p) => {
    let o = [p];
    for (; o.length > 0; ) {
      let h = o.pop();
      if (h.type === "atrule" ? Object.setPrototypeOf(h, s.prototype) : h.type === "rule" ? Object.setPrototypeOf(h, f.prototype) : h.type === "decl" ? Object.setPrototypeOf(h, t.prototype) : h.type === "comment" ? Object.setPrototypeOf(h, e.prototype) : h.type === "root" && Object.setPrototypeOf(h, l.prototype), h[i] = !0, h.nodes)
        for (let m of h.nodes) o.push(m);
    }
  }, lr;
}
var cr, ni;
function Zr() {
  if (ni) return cr;
  ni = 1;
  let e = Le();
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
  return cr = t, t.default = t, e.registerAtRule(t), cr;
}
var ur, ii;
function Xr() {
  if (ii) return ur;
  ii = 1;
  let e = Le(), t, r;
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
  }, ur = n, n.default = n, ur;
}
var hr, si;
function Pu() {
  if (si) return hr;
  si = 1;
  let e = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  return hr = { nanoid: (n = 21) => {
    let i = "", s = n | 0;
    for (; s-- > 0; )
      i += e[Math.random() * 64 | 0];
    return i;
  }, customAlphabet: (n, i = 21) => (s = i) => {
    let a = "", l = s | 0;
    for (; l-- > 0; )
      a += n[Math.random() * n.length | 0];
    return a;
  } }, hr;
}
var fr, oi;
function Ks() {
  if (oi) return fr;
  oi = 1;
  let { existsSync: e, readFileSync: t, realpathSync: r } = ke, { dirname: n, isAbsolute: i, join: s, relative: a, sep: l } = ke, { SourceMapConsumer: f, SourceMapGenerator: c } = ke;
  function d(o) {
    try {
      return r(o);
    } catch {
      return o;
    }
  }
  function u(o) {
    return Buffer ? Buffer.from(o, "base64").toString() : window.atob(o);
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
      let m = /^data:application\/json;charset=utf-?8;base64,/, g = /^data:application\/json;base64,/, k = /^data:application\/json;charset=utf-?8,/, v = /^data:application\/json,/, _ = h.match(k) || h.match(v);
      if (_)
        return decodeURIComponent(h.substr(_[0].length));
      let C = h.match(m) || h.match(g);
      if (C)
        return u(h.substr(C[0].length));
      let x = h.slice(22);
      throw x = x.slice(0, x.indexOf(",")), new Error("Unsupported source map encoding " + x);
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
        let k = a(d(n(m)), d(h));
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
  return fr = p, p.default = p, fr;
}
var pr, ai;
function zt() {
  if (ai) return pr;
  ai = 1;
  let { nanoid: e } = /* @__PURE__ */ Pu(), { isAbsolute: t, resolve: r } = ke, { SourceMapConsumer: n, SourceMapGenerator: i } = ke, { fileURLToPath: s, pathToFileURL: a } = ke, l = Gr(), f = Ks(), c = ke, d = /* @__PURE__ */ Symbol("lineToIndexCache"), u = !!(n && i), p = !!(r && t);
  function o(m) {
    if (m[d]) return m[d];
    let g = m.css.split(`
`), k = new Array(g.length), v = 0;
    for (let _ = 0, C = g.length; _ < C; _++)
      k[_] = v, v += g[_].length + 1;
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
        let v = new f(this.css, k);
        if (v.text) {
          this.map = v;
          let _ = v.consumer().file;
          !this.file && _ && (this.file = this.mapResolve(_));
        }
      }
      this.file || (this.id = "<input css " + e(6) + ">"), this.map && (this.map.file = this.from);
    }
    error(g, k, v, _ = {}) {
      let C, x, b, y, w;
      if (k && typeof k == "object") {
        let I = k, F = v;
        if (typeof I.offset == "number") {
          y = I.offset;
          let S = this.fromOffset(y);
          k = S.line, v = S.col;
        } else
          k = I.line, v = I.column, y = this.fromLineAndColumn(k, v);
        if (typeof F.offset == "number") {
          b = F.offset;
          let S = this.fromOffset(b);
          x = S.line, C = S.col;
        } else
          x = F.line, C = F.column, b = this.fromLineAndColumn(F.line, F.column);
      } else if (v)
        y = this.fromLineAndColumn(k, v);
      else {
        y = k;
        let I = this.fromOffset(y);
        k = I.line, v = I.col;
      }
      let R = this.origin(k, v, x, C);
      return R ? w = new l(
        g,
        R.endLine === void 0 ? R.line : { column: R.column, line: R.line },
        R.endLine === void 0 ? R.column : { column: R.endColumn, line: R.endLine },
        R.source,
        R.file,
        _.plugin
      ) : w = new l(
        g,
        x === void 0 ? k : { column: v, line: k },
        x === void 0 ? v : { column: C, line: x },
        this.css,
        this.file,
        _.plugin
      ), w.input = {
        column: v,
        endColumn: C,
        endLine: x,
        endOffset: b,
        line: k,
        offset: y,
        source: this.css
      }, this.file && (a && (w.input.url = a(this.file).toString()), w.input.file = this.file), w;
    }
    fromLineAndColumn(g, k) {
      return o(this)[g - 1] + k - 1;
    }
    fromOffset(g) {
      let k = o(this), v = k[k.length - 1], _ = 0;
      if (g >= v)
        _ = k.length - 1;
      else {
        let C = k.length - 2, x;
        for (; _ < C; )
          if (x = _ + (C - _ >> 1), g < k[x])
            C = x - 1;
          else if (g >= k[x + 1])
            _ = x + 1;
          else {
            _ = x;
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
    origin(g, k, v, _) {
      if (!this.map) return !1;
      let C = this.map.consumer(), x = C.originalPositionFor({ column: k - 1, line: g });
      if (!x.source) return !1;
      let b;
      if (typeof v == "number") {
        let I = C.originalPositionFor({
          column: _ - 1,
          line: v
        });
        I.source && (b = I);
      }
      let y;
      t(x.source) ? y = a(x.source) : y = new URL(
        x.source,
        a(this.map.mapFile || r(".") + "/")
      );
      let w = {
        column: x.column + 1,
        endColumn: b && b.column + 1,
        endLine: b && b.line,
        line: x.line,
        url: y.toString()
      };
      if (y.protocol === "file:")
        if (s)
          w.file = s(y);
        else
          throw new Error("file: protocol is not available in this PostCSS build");
      let R = C.sourceContentFor(x.source);
      return R && (w.source = R), w;
    }
    toJSON() {
      let g = {};
      for (let k of ["hasBOM", "css", "file", "id"])
        this[k] != null && (g[k] = this[k]);
      return this.map && (g.map = { ...this.map }, g.map.consumerCache && (g.map.consumerCache = void 0)), g;
    }
  }
  return pr = h, h.default = h, c && c.registerInput && c.registerInput(h), pr;
}
var dr, li;
function ht() {
  if (li) return dr;
  li = 1;
  let e = Le(), t, r;
  class n extends e {
    constructor(s) {
      super(s), this.type = "root", this.nodes || (this.nodes = []);
    }
    normalize(s, a, l) {
      let f = /* @__PURE__ */ new Set();
      for (let d of Array.isArray(s) ? s : [s])
        d && typeof d == "object" && !d.parent && d.raws && typeof d.raws.before < "u" && f.add(d.raws);
      let c = super.normalize(s);
      if (a) {
        if (l === "prepend")
          this.nodes.length > 1 ? a.raws.before = this.nodes[1].raws.before : delete a.raws.before;
        else if (this.first !== a)
          for (let d of c)
            f.has(d.raws) || (d.raws.before = a.raws.before);
      }
      return c;
    }
    removeChild(s, a) {
      let l = this.index(s);
      return !a && l === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[l].raws.before), super.removeChild(s);
    }
    toResult(s = {}) {
      return new t(new r(), this, s).stringify();
    }
  }
  return n.registerLazyResult = (i) => {
    t = i;
  }, n.registerProcessor = (i) => {
    r = i;
  }, dr = n, n.default = n, e.registerRoot(n), dr;
}
var mr, ci;
function Qs() {
  if (ci) return mr;
  ci = 1;
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
      let i = [], s = "", a = !1, l = 0, f = !1, c = "", d = !1, u = !1;
      for (let o = 0; o < t.length; o++) {
        let h = t[o];
        if (u) {
          s += h, h === "*" && t[o + 1] === "/" && (s += "/", o += 1, u = !1);
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
        else if (h === "/" && t[o + 1] === "*") {
          s += "/*", o += 1, u = !0;
          continue;
        } else h === "(" ? l += 1 : h === ")" ? l > 0 && (l -= 1) : l === 0 && r.includes(h) && (a = !0);
        if (a) {
          let m = s.trim();
          (n || m !== "") && i.push(m), s = "", a = !1;
        } else
          s += h;
      }
      let p = s.trim();
      return (n || p !== "") && i.push(p), i;
    }
  };
  return mr = e, e.default = e, mr;
}
var gr, ui;
function Kr() {
  if (ui) return gr;
  ui = 1;
  let e = Le(), t = Qs();
  class r extends e {
    get selectors() {
      return t.comma(this.selector);
    }
    set selectors(i) {
      let s = this.selector ? this.selector.match(/,\s*/) : null, a = s ? s[0] : "," + this.raw("between", "beforeOpen");
      this.selector = i.join(a);
    }
    constructor(i) {
      super(i), this.type = "rule", this.nodes || (this.nodes = []);
    }
  }
  return gr = r, r.default = r, e.registerRule(r), gr;
}
var br, hi;
function Lu() {
  if (hi) return br;
  hi = 1;
  let e = Zr(), t = Pt(), r = Lt(), n = zt(), i = Ks(), s = ht(), a = Kr();
  function l(d, u) {
    return d.inputs ? d.inputs.map((p) => {
      let o = { ...p, __proto__: n.prototype };
      return o.map && (o.map = {
        ...o.map,
        __proto__: i.prototype
      }), o;
    }) : u;
  }
  function f(d, u, p) {
    let o = { ...d };
    if (delete o.inputs, delete o.nodes, o.source) {
      let { inputId: m, ...g } = o.source;
      o.source = g, m != null && (o.source.input = u[m]);
    }
    let h;
    if (o.type === "root")
      h = new s(o);
    else if (o.type === "decl")
      h = new r(o);
    else if (o.type === "rule")
      h = new a(o);
    else if (o.type === "comment")
      h = new t(o);
    else if (o.type === "atrule")
      h = new e(o);
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
    let p, o = [
      { childIndex: 0, children: [], inputs: l(d, u), json: d }
    ];
    for (; o.length > 0; ) {
      let h = o[o.length - 1], m = h.json.nodes;
      if (m && h.childIndex < m.length) {
        let k = m[h.childIndex];
        h.childIndex += 1, o.push({
          childIndex: 0,
          children: [],
          inputs: l(k, h.inputs),
          json: k
        });
        continue;
      }
      o.pop();
      let g = f(
        h.json,
        h.inputs,
        m ? h.children : void 0
      );
      o.length > 0 ? o[o.length - 1].children.push(g) : p = g;
    }
    return p;
  }
  return br = c, c.default = c, br;
}
var xr, fi;
function eo() {
  if (fi) return xr;
  fi = 1;
  let { dirname: e, relative: t, resolve: r, sep: n } = ke, { SourceMapConsumer: i, SourceMapGenerator: s } = ke, { pathToFileURL: a } = ke, l = zt(), f = !!(i && s), c = !!(e && r && t && n);
  class d {
    constructor(p, o, h, m) {
      this.stringify = p, this.mapOpts = h.map || {}, this.root = o, this.opts = h, this.css = m, this.originalCSS = m, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
    }
    addAnnotation() {
      let p;
      this.isInline() ? p = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? p = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? p = this.mapOpts.annotation(this.opts.to, this.root) : p = this.outputFile() + ".map";
      let o = `
`;
      this.css.includes(`\r
`) && (o = `\r
`), this.css += o + "/*# sourceMappingURL=" + p + " */";
    }
    applyPrevMaps() {
      for (let p of this.previous()) {
        let o = this.toUrl(this.path(p.file)), h = p.root || e(p.file), m;
        this.mapOpts.sourcesContent === !1 ? (m = new i(p.text), m.sourcesContent && (m.sourcesContent = null)) : m = p.consumer(), this.map.applySourceMap(m, o, this.toUrl(this.path(h)));
      }
    }
    clearAnnotation() {
      if (this.mapOpts.annotation !== !1) {
        if (this.root) {
          let p;
          for (let o = this.root.nodes.length - 1; o >= 0; o--)
            p = this.root.nodes[o], p.type === "comment" && p.text.startsWith("# sourceMappingURL=") && this.root.removeChild(o);
        } else if (this.css) {
          let p = "/*# sourceMappingURL=", o = "", h = 0, m;
          for (; (m = this.css.indexOf(p, h)) !== -1; ) {
            let g = this.css.indexOf("*/", m + p.length);
            if (g === -1) break;
            if (g + 2 === this.css.length || /[\t\n\f\r ]/.test(this.css[g + 2]))
              for (; m > h && (this.css[m - 1] === `
` || this.css[m - 1] === "\r"); )
                m--;
            o += this.css.slice(h, m), h = g + 2;
          }
          h > 0 && (this.css = o + this.css.slice(h));
        }
      }
    }
    generate() {
      if (this.clearAnnotation(), c && f && this.isMap())
        return this.generateMap();
      {
        let p = "";
        return this.stringify(this.root, (o) => {
          p += o;
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
      let p = 1, o = 1, h = "<no source>", m = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ""
      }, g, k;
      this.stringify(this.root, (v, _, C) => {
        if (this.css += v, _ && C !== "end" && (m.generated.line = p, m.generated.column = o - 1, _.source && _.source.start ? (m.source = this.sourcePath(_), m.original.line = _.source.start.line, m.original.column = _.source.start.column - 1, this.map.addMapping(m)) : (m.source = h, m.original.line = 1, m.original.column = 0, this.map.addMapping(m))), k = v.match(/\n/g), k ? (p += k.length, g = v.lastIndexOf(`
`), o = v.length - g) : o += v.length, _ && C !== "start") {
          let x = _.parent || { raws: {} };
          (!(_.type === "decl" || _.type === "atrule" && !_.nodes) || _ !== x.last || x.raws.semicolon) && (_.source && _.source.end ? (m.source = this.sourcePath(_), m.original.line = _.source.end.line, m.original.column = _.source.end.column - 1, m.generated.line = p, m.generated.column = o - 2, this.map.addMapping(m)) : (m.source = h, m.original.line = 1, m.original.column = 0, m.generated.line = p, m.generated.column = o - 1, this.map.addMapping(m)));
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
      return typeof p < "u" && p !== !0 ? !1 : this.previous().length ? this.previous().some((o) => o.inline) : !0;
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
      let o = this.memoizedPaths.get(p);
      if (o) return o;
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
              let o = p.source.input.map;
              this.previousMaps.includes(o) || this.previousMaps.push(o);
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
        this.root.walk((o) => {
          if (o.source) {
            let h = o.source.input.from;
            if (h && !p[h]) {
              p[h] = !0;
              let m = this.usesFileUrls ? this.toFileUrl(h) : this.toUrl(this.path(h));
              this.map.setSourceContent(m, o.source.input.css);
            }
          }
        });
      else if (this.css) {
        let o = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(o, this.css);
      }
    }
    sourcePath(p) {
      return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(p.source.input.from) : this.toUrl(this.path(p.source.input.from));
    }
    toBase64(p) {
      return Buffer ? Buffer.from(p).toString("base64") : window.btoa(unescape(encodeURIComponent(p)));
    }
    toFileUrl(p) {
      let o = this.memoizedFileURLs.get(p);
      if (o) return o;
      if (a) {
        let h = a(p).toString();
        return this.memoizedFileURLs.set(p, h), h;
      } else
        throw new Error(
          "`map.absolute` option is not available in this PostCSS build"
        );
    }
    toUrl(p) {
      let o = this.memoizedURLs.get(p);
      if (o) return o;
      n === "\\" && (p = p.replace(/\\/g, "/"));
      let h = encodeURI(p).replace(/[#?]/g, encodeURIComponent);
      return this.memoizedURLs.set(p, h), h;
    }
  }
  return xr = d, xr;
}
var wr, pi;
function zu() {
  if (pi) return wr;
  pi = 1;
  const e = 39, t = 34, r = 92, n = 47, i = 10, s = 32, a = 12, l = 9, f = 13, c = 91, d = 93, u = 40, p = 41, o = 123, h = 125, m = 59, g = 42, k = 58, v = 64, _ = /[\t\n\f\r "#'()/;[\\\]{}]/g, C = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, x = /.[\r\n"'(/\\]/, b = /[\da-f]/i, y = /(^|[\t\n\f\r "'(),/:;[\]{}])url$/i, w = /[\t\n\f\r ]*["']/y;
  return wr = function(I, F = {}) {
    let S = I.css.valueOf(), Y = F.ignoreErrors, P, B, M, D, O, j, U, V, X = S.length, z = 0, ie = [], K = -1;
    function re() {
      return z;
    }
    function he(le) {
      throw I.error("Unclosed " + le, z);
    }
    function me() {
      return ie.length === 0 && z >= X;
    }
    function fe(le) {
      if (ie.length) return ie.pop();
      if (z >= X) return;
      let pe = le ? le.ignoreUnclosed : !1;
      switch (P = S.charCodeAt(z), P) {
        case i:
        case s:
        case l:
        case f:
        case a: {
          D = z;
          do
            D += 1, P = S.charCodeAt(D);
          while (P === s || P === i || P === l || P === f || P === a);
          j = ["space", S.slice(z, D)], z = D - 1;
          break;
        }
        case c:
        case d:
        case o:
        case h:
        case k:
        case m:
        case p: {
          let be = String.fromCharCode(P);
          j = [be, be, z];
          break;
        }
        case u: {
          if (w.lastIndex = z + 1, y.test(S.substring(z - 4, z)) && !w.test(S)) {
            D = z;
            do {
              if (U = !1, D = S.indexOf(")", D + 1), D === -1)
                if (Y || pe) {
                  D = z;
                  break;
                } else
                  he("bracket");
              for (V = D; S.charCodeAt(V - 1) === r; )
                V -= 1, U = !U;
            } while (U);
            j = ["brackets", S.slice(z, D + 1), z, D], z = D;
          } else z <= K ? j = ["(", "(", z] : (D = S.indexOf(")", z + 1), B = S.slice(z, D + 1), D === -1 || x.test(B) ? (K = D === -1 ? X : D, j = ["(", "(", z]) : (j = ["brackets", B, z, D], z = D));
          break;
        }
        case e:
        case t: {
          O = P === e ? "'" : '"', D = z;
          do {
            if (U = !1, D = S.indexOf(O, D + 1), D === -1)
              if (Y || pe) {
                D = z + 1;
                break;
              } else
                he("string");
            for (V = D; S.charCodeAt(V - 1) === r; )
              V -= 1, U = !U;
          } while (U);
          j = ["string", S.slice(z, D + 1), z, D], z = D;
          break;
        }
        case v: {
          _.lastIndex = z + 1, _.test(S), _.lastIndex === 0 ? D = S.length - 1 : D = _.lastIndex - 2, j = ["at-word", S.slice(z, D + 1), z, D], z = D;
          break;
        }
        case r: {
          for (D = z, M = !0; S.charCodeAt(D + 1) === r; )
            D += 1, M = !M;
          if (P = S.charCodeAt(D + 1), M && P !== n && P !== s && P !== i && P !== l && P !== f && P !== a && (D += 1, b.test(S.charAt(D)))) {
            for (; b.test(S.charAt(D + 1)); )
              D += 1;
            S.charCodeAt(D + 1) === s && (D += 1);
          }
          j = ["word", S.slice(z, D + 1), z, D], z = D;
          break;
        }
        default: {
          P === n && S.charCodeAt(z + 1) === g ? (D = S.indexOf("*/", z + 2) + 1, D === 0 && (Y || pe ? D = S.length : he("comment")), j = ["comment", S.slice(z, D + 1), z, D], z = D) : (C.lastIndex = z + 1, C.test(S), C.lastIndex === 0 ? D = S.length - 1 : D = C.lastIndex - 2, j = ["word", S.slice(z, D + 1), z, D], z = D);
          break;
        }
      }
      return z++, j;
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
  }, wr;
}
var yr, di;
function qu() {
  if (di) return yr;
  di = 1;
  let e = Zr(), t = Pt(), r = Lt(), n = ht(), i = Kr(), s = zu();
  const a = {
    empty: !0,
    space: !0
  };
  function l(d) {
    for (let u = d.length - 1; u >= 0; u--) {
      let p = d[u], o = p[3] || p[2];
      if (o) return o;
    }
  }
  function f(d, u, p) {
    let o = "";
    for (let h = u; h < p; h++) o += d[h][1];
    return o;
  }
  class c {
    constructor(u) {
      this.input = u, this.root = new n(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: u, start: { column: 1, line: 1, offset: 0 } };
    }
    atrule(u) {
      let p = new e();
      p.name = u[1].slice(1), p.name === "" && this.unnamedAtrule(p, u), this.init(p, u[2]);
      let o, h, m, g = !1, k = !1, v = [], _ = [];
      for (; !this.tokenizer.endOfFile(); ) {
        if (u = this.tokenizer.nextToken(), o = u[0], o === "(" || o === "[" ? _.push(o === "(" ? ")" : "]") : o === "{" && _.length > 0 ? _.push("}") : o === _[_.length - 1] && _.pop(), _.length === 0)
          if (o === ";") {
            p.source.end = this.getPosition(u[2]), p.source.end.offset++, this.semicolon = !0;
            break;
          } else if (o === "{") {
            k = !0;
            break;
          } else if (o === "}") {
            if (v.length > 0) {
              for (m = v.length - 1, h = v[m]; h && h[0] === "space"; )
                h = v[--m];
              h && (p.source.end = this.getPosition(h[3] || h[2]), p.source.end.offset++);
            }
            this.end(u);
            break;
          } else
            v.push(u);
        else
          v.push(u);
        if (this.tokenizer.endOfFile()) {
          g = !0;
          break;
        }
      }
      p.raws.between = this.spacesAndCommentsFromEnd(v), v.length ? (p.raws.afterName = this.spacesAndCommentsFromStart(v), this.raw(p, "params", v), g && (u = v[v.length - 1], p.source.end = this.getPosition(u[3] || u[2]), p.source.end.offset++, this.spaces = p.raws.between, p.raws.between = "")) : (p.raws.afterName = "", p.params = ""), k && (p.nodes = [], this.current = p);
    }
    checkMissedSemicolon(u) {
      let p = this.colon(u);
      if (p === !1) return;
      let o = 0, h;
      for (let m = p - 1; m >= 0 && (h = u[m], !(h[0] !== "space" && (o += 1, o === 2))); m--)
        ;
      throw this.input.error(
        "Missed semicolon",
        h[0] === "word" ? h[3] + 1 : h[2]
      );
    }
    colon(u) {
      let p = 0, o, h, m;
      for (let [g, k] of u.entries()) {
        if (h = k, m = h[0], m === "(" && (p += 1), m === ")" && (p -= 1), p === 0 && m === ":")
          if (!o)
            this.doubleColon(h);
          else {
            if (o[0] === "word" && o[1] === "progid")
              continue;
            return g;
          }
        o = h;
      }
      return !1;
    }
    comment(u) {
      let p = new t();
      this.init(p, u[2]), p.source.end = this.getPosition(u[3] || u[2]), p.source.end.offset++;
      let o = u[1].slice(2, -2);
      if (!o.trim())
        p.text = "", p.raws.left = o, p.raws.right = "";
      else {
        let h = o.match(/^(\s*)([^]*\S)(\s*)$/);
        p.text = h[2], p.raws.left = h[1], p.raws.right = h[3];
      }
    }
    createTokenizer() {
      this.tokenizer = s(this.input);
    }
    decl(u, p) {
      let o = new r();
      this.init(o, u[0][2]);
      let h = u[u.length - 1];
      h[0] === ";" && (this.semicolon = !0, u.pop()), o.source.end = this.getPosition(
        h[3] || h[2] || l(u)
      ), o.source.end.offset++;
      let m = 0;
      for (; u[m][0] !== "word"; )
        m === u.length - 1 && this.unknownWord([u[m]]), m++;
      o.raws.before += f(u, 0, m), o.source.start = this.getPosition(u[m][2]);
      let g = m;
      for (; m < u.length; ) {
        let b = u[m][0];
        if (b === ":" || b === "space" || b === "comment")
          break;
        m++;
      }
      o.prop = f(u, g, m);
      let k = m, v;
      for (; m < u.length && (v = u[m], m++, v[0] !== ":"); )
        v[0] === "word" && /\w/.test(v[1]) && this.unknownWord([v]);
      o.raws.between = f(u, k, m), (o.prop[0] === "_" || o.prop[0] === "*") && (o.raws.before += o.prop[0], o.prop = o.prop.slice(1));
      let _ = m;
      for (; m < u.length; ) {
        let b = u[m][0];
        if (b !== "space" && b !== "comment") break;
        m++;
      }
      let C = u.slice(_, m);
      u = u.slice(m), this.precheckMissedSemicolon(u);
      for (let b = u.length - 1; b >= 0; b--) {
        if (v = u[b], v[1].toLowerCase() === "!important") {
          o.important = !0;
          let y = this.stringFrom(u, b);
          y = this.spacesFromEnd(u) + y, y !== " !important" && (o.raws.important = y);
          break;
        } else if (v[1].toLowerCase() === "important") {
          let y = u.slice(0), w = "";
          for (let R = b; R > 0; R--) {
            let I = y[R][0];
            if (w.trim().startsWith("!") && I !== "space")
              break;
            w = y.pop()[1] + w;
          }
          w.trim().startsWith("!") && (o.important = !0, o.raws.important = w, u = y);
        }
        if (v[0] !== "space" && v[0] !== "comment")
          break;
      }
      u.some((b) => b[0] !== "space" && b[0] !== "comment") && (o.raws.between += C.map((b) => b[1]).join(""), C = []), this.raw(o, "value", C.concat(u), p), o.value.includes(":") && !p && this.checkMissedSemicolon(u);
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
      let p = !1, o = null, h = !1, m = null, g = [], k = u[1].startsWith("--"), v = [], _ = u;
      for (; _; ) {
        if (o = _[0], v.push(_), o === "(" || o === "[")
          m || (m = _), g.push(o === "(" ? ")" : "]");
        else if (k && h && o === "{")
          m || (m = _), g.push("}");
        else if (g.length === 0)
          if (o === ";")
            if (h) {
              this.decl(v, k);
              return;
            } else
              break;
          else if (o === "{") {
            this.rule(v);
            return;
          } else if (o === "}") {
            this.tokenizer.back(v.pop()), p = !0;
            break;
          } else o === ":" && (h = !0);
        else o === g[g.length - 1] && (g.pop(), g.length === 0 && (m = null));
        _ = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile() && (p = !0), g.length > 0 && this.unclosedBracket(m), p && h) {
        if (!k)
          for (; v.length && (_ = v[v.length - 1][0], !(_ !== "space" && _ !== "comment")); )
            this.tokenizer.back(v.pop());
        this.decl(v, k);
      } else
        this.unknownWord(v);
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
    raw(u, p, o, h) {
      let m, g, k = o.length, v = "", _ = "", C = !0, x, b;
      for (let y = 0; y < k; y += 1)
        m = o[y], g = m[0], g === "space" && y === k - 1 && !h ? C = !1 : g === "comment" ? (b = o[y - 1] ? o[y - 1][0] : "empty", x = o[y + 1] ? o[y + 1][0] : "empty", !a[b] && !a[x] ? _ === "," ? C = !1 : (v += m[1], _ = m[1].slice(-1)) : C = !1) : (v += m[1], _ = m[1].slice(-1));
      if (!C) {
        let y = o.reduce((w, R) => w + R[1], "");
        u.raws[p] = { raw: y, value: v };
      }
      u[p] = v;
    }
    rule(u) {
      u.pop();
      let p = new i();
      this.init(p, u[0][2]), p.raws.between = this.spacesAndCommentsFromEnd(u), this.raw(p, "selector", u), this.current = p;
    }
    spacesAndCommentsFromEnd(u) {
      let p, o = "";
      for (; u.length && (p = u[u.length - 1][0], !(p !== "space" && p !== "comment")); )
        o = u.pop()[1] + o;
      return o;
    }
    // Errors
    spacesAndCommentsFromStart(u) {
      let p, o = "";
      for (; u.length && (p = u[0][0], !(p !== "space" && p !== "comment")); )
        o += u.shift()[1];
      return o;
    }
    spacesFromEnd(u) {
      let p, o = "";
      for (; u.length && (p = u[u.length - 1][0], p === "space"); )
        o = u.pop()[1] + o;
      return o;
    }
    stringFrom(u, p) {
      let o = "";
      for (let h = p; h < u.length; h++)
        o += u[h][1];
      return u.splice(p, u.length - p), o;
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
  return yr = c, yr;
}
var vr, mi;
function Qr() {
  if (mi) return vr;
  mi = 1;
  let e = Le(), t = zt(), r = qu();
  function n(i, s) {
    let a = new t(i, s), l = new r(a);
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
  return vr = n, n.default = n, e.registerParse(n), vr;
}
var _r, gi;
function to() {
  if (gi) return _r;
  gi = 1;
  let e = Le(), { my: t } = Mt();
  class r {
    constructor(i, s = {}) {
      if (this.type = "warning", this.text = i, s.node && s.node.source) {
        s.node[t] || e.rebuild(s.node);
        let a = s.node.rangeBy(s);
        this.line = a.start.line, this.column = a.start.column, this.endLine = a.end.line, this.endColumn = a.end.column;
      }
      for (let a in s) this[a] = s[a];
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
  return _r = r, r.default = r, _r;
}
var kr, bi;
function en() {
  if (bi) return kr;
  bi = 1;
  let e = to();
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
  return kr = t, t.default = t, kr;
}
var Cr, xi;
function ro() {
  if (xi) return Cr;
  xi = 1;
  let e = {};
  return Cr = function(r) {
    e[r] || (e[r] = !0, typeof console < "u" && console.warn && console.warn(r));
  }, Cr;
}
var Rr, wi;
function no() {
  if (wi) return Rr;
  wi = 1;
  let e = Le(), t = Xr(), r = eo(), n = Qr(), i = en(), s = ht(), a = Ot(), { isClean: l, my: f } = Mt(), c = ro();
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
  }, o = 0;
  function h(C) {
    return typeof C == "object" && typeof C.then == "function";
  }
  function m(C) {
    let x = !1, b = d[C.type];
    return C.type === "decl" ? x = C.prop.toLowerCase() : C.type === "atrule" && (x = C.name.toLowerCase()), x && C.append ? [
      b,
      b + "-" + x,
      o,
      b + "Exit",
      b + "Exit-" + x
    ] : x ? [b, b + "-" + x, b + "Exit", b + "Exit-" + x] : C.append ? [b, o, b + "Exit"] : [b, b + "Exit"];
  }
  function g(C) {
    let x;
    return C.type === "document" ? x = ["Document", o, "DocumentExit"] : C.type === "root" ? x = ["Root", o, "RootExit"] : x = m(C), {
      eventIndex: 0,
      events: x,
      iterator: 0,
      node: C,
      visitorIndex: 0,
      visitors: []
    };
  }
  function k(C) {
    let x = [C];
    for (; x.length > 0; ) {
      let b = x.pop();
      if (b[l] = !1, b.nodes)
        for (let y of b.nodes) x.push(y);
    }
    return C;
  }
  let v = {};
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
    constructor(x, b, y) {
      this.stringified = !1, this.processed = !1;
      let w;
      if (typeof b == "object" && b !== null && (b.type === "root" || b.type === "document"))
        w = k(b);
      else if (b instanceof _ || b instanceof i)
        w = k(b.root), b.map && (typeof y.map > "u" && (y.map = {}), y.map.inline || (y.map.inline = !1), y.map.prev = b.map);
      else {
        let R = n;
        y.syntax && (R = y.syntax.parse), y.parser && (R = y.parser), R.parse && (R = R.parse);
        try {
          w = R(b, y);
        } catch (I) {
          this.processed = !0, this.error = I;
        }
        w && !w[f] && e.rebuild(w);
      }
      this.result = new i(x, w, y), this.helpers = { ...v, postcss: v, result: this.result }, this.plugins = this.processor.plugins.map((R) => typeof R == "object" && R.prepare ? { ...R, ...R.prepare(this.result) } : R);
    }
    async() {
      return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
    }
    catch(x) {
      return this.async().catch(x);
    }
    finally(x) {
      return this.async().finally(x);
    }
    getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
    handleError(x, b) {
      let y = this.result.lastPlugin;
      try {
        if (b && b.addToError(x), this.error = x, x.name === "CssSyntaxError" && !x.plugin)
          x.plugin = y.postcssPlugin, x.setMessage();
        else if (y.postcssVersion && process.env.NODE_ENV !== "production") {
          let w = y.postcssPlugin, R = y.postcssVersion, I = this.result.processor.version, F = R.split("."), S = I.split(".");
          (F[0] !== S[0] || parseInt(F[1]) > parseInt(S[1])) && console.error(
            "Unknown error from PostCSS plugin. Your current PostCSS version is " + I + ", but " + w + " uses " + R + ". Perhaps this is the source of the error below."
          );
        }
      } catch (w) {
        console && console.error && console.error(w);
      }
      return x;
    }
    prepareVisitors() {
      this.listeners = {};
      let x = (b, y, w) => {
        this.listeners[y] || (this.listeners[y] = []), this.listeners[y].push([b, w]);
      };
      for (let b of this.plugins)
        if (typeof b == "object")
          for (let y in b) {
            if (!u[y] && /^[A-Z]/.test(y))
              throw new Error(
                `Unknown event ${y} in ${b.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
              );
            if (!p[y])
              if (typeof b[y] == "object")
                for (let w in b[y])
                  w === "*" ? x(b, y, b[y][w]) : x(
                    b,
                    y + "-" + w.toLowerCase(),
                    b[y][w]
                  );
              else typeof b[y] == "function" && x(b, y, b[y]);
          }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
    async runAsync() {
      this.plugin = 0;
      for (let x = 0; x < this.plugins.length; x++) {
        let b = this.plugins[x], y = this.runOnRoot(b);
        if (h(y))
          try {
            await y;
          } catch (w) {
            throw this.handleError(w);
          }
      }
      if (this.prepareVisitors(), this.hasListener) {
        let x = this.result.root;
        for (; !x[l]; ) {
          x[l] = !0;
          let b = [g(x)];
          for (; b.length > 0; ) {
            let y = this.visitTick(b);
            if (h(y))
              try {
                await y;
              } catch (w) {
                let R = b[b.length - 1].node;
                throw this.handleError(w, R);
              }
          }
        }
        if (this.listeners.OnceExit)
          for (let [b, y] of this.listeners.OnceExit) {
            this.result.lastPlugin = b;
            try {
              if (x.type === "document") {
                let w = x.nodes.map(
                  (R) => y(R, this.helpers)
                );
                await Promise.all(w);
              } else
                await y(x, this.helpers);
            } catch (w) {
              throw this.handleError(w);
            }
          }
      }
      return this.processed = !0, this.stringify();
    }
    runOnRoot(x) {
      this.result.lastPlugin = x;
      try {
        if (typeof x == "object" && x.Once) {
          if (this.result.root.type === "document") {
            let b = this.result.root.nodes.map(
              (y) => x.Once(y, this.helpers)
            );
            return h(b[0]) ? Promise.all(b) : b;
          }
          return x.Once(this.result.root, this.helpers);
        } else if (typeof x == "function")
          return x(this.result.root, this.result);
      } catch (b) {
        throw this.handleError(b);
      }
    }
    stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = !0, this.sync();
      let x = this.result.opts, b = a;
      x.syntax && (b = x.syntax.stringify), x.stringifier && (b = x.stringifier), b.stringify && (b = b.stringify);
      let y = this.result.root.source;
      if (x.map === void 0 && !(y && y.input && y.input.map)) {
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
      for (let x of this.plugins) {
        let b = this.runOnRoot(x);
        if (h(b))
          throw this.getAsyncError();
      }
      if (this.prepareVisitors(), this.hasListener) {
        let x = this.result.root;
        for (; !x[l]; )
          x[l] = !0, this.walkSync(x);
        if (this.listeners.OnceExit)
          if (x.type === "document")
            for (let b of x.nodes)
              this.visitSync(this.listeners.OnceExit, b);
          else
            this.visitSync(this.listeners.OnceExit, x);
      }
      return this.result;
    }
    then(x, b) {
      return process.env.NODE_ENV !== "production" && ("from" in this.opts || c(
        "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
      )), this.async().then(x, b);
    }
    toString() {
      return this.css;
    }
    visitSync(x, b) {
      for (let [y, w] of x) {
        this.result.lastPlugin = y;
        let R;
        try {
          R = w(b, this.helpers);
        } catch (I) {
          throw this.handleError(I, b.proxyOf);
        }
        if (b.type !== "root" && b.type !== "document" && !b.parent)
          return !0;
        if (h(R))
          throw this.getAsyncError();
      }
    }
    visitTick(x) {
      let b = x[x.length - 1], { node: y, visitors: w } = b;
      if (y.type !== "root" && y.type !== "document" && !y.parent) {
        x.pop();
        return;
      }
      if (w.length > 0 && b.visitorIndex < w.length) {
        let [I, F] = w[b.visitorIndex];
        b.visitorIndex += 1, b.visitorIndex === w.length && (b.visitors = [], b.visitorIndex = 0), this.result.lastPlugin = I;
        try {
          return F(y.toProxy(), this.helpers);
        } catch (S) {
          throw this.handleError(S, y);
        }
      }
      if (b.iterator !== 0) {
        let I = b.iterator;
        b.descending && (b.descending = !1, y.indexes[I] += 1);
        let F;
        for (; F = y.nodes[y.indexes[I]]; ) {
          if (!F[l]) {
            F[l] = !0, b.descending = !0, x.push(g(F));
            return;
          }
          y.indexes[I] += 1;
        }
        b.iterator = 0, delete y.indexes[I];
      }
      let R = b.events;
      for (; b.eventIndex < R.length; ) {
        let I = R[b.eventIndex];
        if (b.eventIndex += 1, I === o) {
          y.nodes && y.nodes.length && (y[l] = !0, b.iterator = y.getIterator());
          return;
        } else if (this.listeners[I]) {
          b.visitors = this.listeners[I];
          return;
        }
      }
      x.pop();
    }
    walkSync(x) {
      x[l] = !0;
      let b = [{ eventIndex: 0, events: m(x), iterator: 0, node: x }];
      for (; b.length > 0; ) {
        let y = b[b.length - 1], w = y.node;
        if (y.iterator !== 0) {
          let R = y.iterator;
          y.descending && (y.descending = !1, w.indexes[R] += 1);
          let I, F = !1;
          for (; I = w.nodes[w.indexes[R]]; ) {
            if (!I[l]) {
              I[l] = !0, y.descending = !0, b.push({
                eventIndex: 0,
                events: m(I),
                iterator: 0,
                node: I
              }), F = !0;
              break;
            }
            w.indexes[R] += 1;
          }
          if (F) continue;
          y.iterator = 0, delete w.indexes[R];
        }
        if (y.eventIndex < y.events.length) {
          let R = y.events[y.eventIndex];
          if (y.eventIndex += 1, R === o)
            w.nodes && w.nodes.length && (y.iterator = w.getIterator());
          else {
            let I = this.listeners[R];
            I && this.visitSync(I, w.toProxy()) && b.pop();
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
    v = C;
  }, Rr = _, _.default = _, s.registerLazyResult(_), t.registerLazyResult(_), Rr;
}
var Ar, yi;
function ju() {
  if (yi) return Ar;
  yi = 1;
  let e = eo(), t = Qr(), r = en(), n = Ot(), i = ro();
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
        let [o, h] = p.generate();
        o && (this.result.css = o), h && (this.result.map = h);
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
  return Ar = s, s.default = s, Ar;
}
var Er, vi;
function $u() {
  if (vi) return Er;
  vi = 1;
  let e = Xr(), t = no(), r = ju(), n = ht();
  class i {
    constructor(a = []) {
      this.version = "8.5.33", this.plugins = this.normalize(a);
    }
    normalize(a) {
      let l = [];
      for (let f of a)
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
    process(a, l = {}) {
      return !this.plugins.length && !l.parser && !l.stringifier && !l.syntax ? new r(this, a, l) : new t(this, a, l);
    }
    use(a) {
      return this.plugins = this.plugins.concat(this.normalize([a])), this;
    }
  }
  return Er = i, i.default = i, n.registerProcessor(i), e.registerProcessor(i), Er;
}
var Sr, _i;
function Uu() {
  if (_i) return Sr;
  _i = 1;
  let e = Zr(), t = Pt(), r = Le(), n = Gr(), i = Lt(), s = Xr(), a = Lu(), l = zt(), f = no(), c = Qs(), d = Bt(), u = Qr(), p = $u(), o = en(), h = ht(), m = Kr(), g = Ot(), k = to();
  function v(..._) {
    return _.length === 1 && Array.isArray(_[0]) && (_ = _[0]), new p(_);
  }
  return v.plugin = function(C, x) {
    let b = !1;
    function y(...R) {
      console && console.warn && !b && (b = !0, console.warn(
        C + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
      ), process.env.LANG && process.env.LANG.startsWith("zh") && console.warn(
        C + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
      ));
      let I = x(...R);
      return I.postcssPlugin = C, I.postcssVersion = new p().version, I;
    }
    let w;
    return Object.defineProperty(y, "postcss", {
      get() {
        return w || (w = y()), w;
      }
    }), y.process = function(R, I, F) {
      return v([y(F)]).process(R, I);
    }, y;
  }, v.stringify = g, v.parse = u, v.fromJSON = a, v.list = c, v.comment = (_) => new t(_), v.atRule = (_) => new e(_), v.decl = (_) => new i(_), v.rule = (_) => new m(_), v.root = (_) => new h(_), v.document = (_) => new s(_), v.CssSyntaxError = n, v.Declaration = i, v.Container = r, v.Processor = p, v.Document = s, v.Comment = t, v.Warning = k, v.AtRule = e, v.Result = o, v.Input = l, v.Rule = m, v.Root = h, v.Node = d, f.registerPostcss(v), Sr = v, v.default = v, Sr;
}
var vt = { exports: {} }, Rt = { exports: {} }, Ju = Rt.exports, ki;
function Wu() {
  return ki || (ki = 1, (function(e, t) {
    (function(r, n) {
      e.exports = n();
    })(Ju, (function() {
      var r = 1e3, n = 6e4, i = 36e5, s = "millisecond", a = "second", l = "minute", f = "hour", c = "day", d = "week", u = "month", p = "quarter", o = "year", h = "date", m = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, k = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, v = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(P) {
        var B = ["th", "st", "nd", "rd"], M = P % 100;
        return "[" + P + (B[(M - 20) % 10] || B[M] || B[0]) + "]";
      } }, _ = function(P, B, M) {
        var D = String(P);
        return !D || D.length >= B ? P : "" + Array(B + 1 - D.length).join(M) + P;
      }, C = { s: _, z: function(P) {
        var B = -P.utcOffset(), M = Math.abs(B), D = Math.floor(M / 60), O = M % 60;
        return (B <= 0 ? "+" : "-") + _(D, 2, "0") + ":" + _(O, 2, "0");
      }, m: function P(B, M) {
        if (B.date() < M.date()) return -P(M, B);
        var D = 12 * (M.year() - B.year()) + (M.month() - B.month()), O = B.clone().add(D, u), j = M - O < 0, U = B.clone().add(D + (j ? -1 : 1), u);
        return +(-(D + (M - O) / (j ? O - U : U - O)) || 0);
      }, a: function(P) {
        return P < 0 ? Math.ceil(P) || 0 : Math.floor(P);
      }, p: function(P) {
        return { M: u, y: o, w: d, d: c, D: h, h: f, m: l, s: a, ms: s, Q: p }[P] || String(P || "").toLowerCase().replace(/s$/, "");
      }, u: function(P) {
        return P === void 0;
      } }, x = "en", b = {};
      b[x] = v;
      var y = "$isDayjsObject", w = function(P) {
        return P instanceof S || !(!P || !P[y]);
      }, R = function P(B, M, D) {
        var O;
        if (!B) return x;
        if (typeof B == "string") {
          var j = B.toLowerCase();
          b[j] && (O = j), M && (b[j] = M, O = j);
          var U = B.split("-");
          if (!O && U.length > 1) return P(U[0]);
        } else {
          var V = B.name;
          b[V] = B, O = V;
        }
        return !D && O && (x = O), O || !D && x;
      }, I = function(P, B) {
        if (w(P)) return P.clone();
        var M = typeof B == "object" ? B : {};
        return M.date = P, M.args = arguments, new S(M);
      }, F = C;
      F.l = R, F.i = w, F.w = function(P, B) {
        return I(P, { locale: B.$L, utc: B.$u, x: B.$x, $offset: B.$offset });
      };
      var S = (function() {
        function P(M) {
          this.$L = R(M.locale, null, !0), this.parse(M), this.$x = this.$x || M.x || {}, this[y] = !0;
        }
        var B = P.prototype;
        return B.parse = function(M) {
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
          })(M), this.init();
        }, B.init = function() {
          var M = this.$d;
          this.$y = M.getFullYear(), this.$M = M.getMonth(), this.$D = M.getDate(), this.$W = M.getDay(), this.$H = M.getHours(), this.$m = M.getMinutes(), this.$s = M.getSeconds(), this.$ms = M.getMilliseconds();
        }, B.$utils = function() {
          return F;
        }, B.isValid = function() {
          return this.$d.toString() !== m;
        }, B.isSame = function(M, D) {
          var O = I(M);
          return this.startOf(D) <= O && O <= this.endOf(D);
        }, B.isAfter = function(M, D) {
          return I(M) < this.startOf(D);
        }, B.isBefore = function(M, D) {
          return this.endOf(D) < I(M);
        }, B.$g = function(M, D, O) {
          return F.u(M) ? this[D] : this.set(O, M);
        }, B.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, B.valueOf = function() {
          return this.$d.getTime();
        }, B.startOf = function(M, D) {
          var O = this, j = !!F.u(D) || D, U = F.p(M), V = function(fe, ae) {
            var le = F.w(O.$u ? Date.UTC(O.$y, ae, fe) : new Date(O.$y, ae, fe), O);
            return j ? le : le.endOf(c);
          }, X = function(fe, ae) {
            return F.w(O.toDate()[fe].apply(O.toDate("s"), (j ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ae)), O);
          }, z = this.$W, ie = this.$M, K = this.$D, re = "set" + (this.$u ? "UTC" : "");
          switch (U) {
            case o:
              return j ? V(1, 0) : V(31, 11);
            case u:
              return j ? V(1, ie) : V(0, ie + 1);
            case d:
              var he = this.$locale().weekStart || 0, me = (z < he ? z + 7 : z) - he;
              return V(j ? K - me : K + (6 - me), ie);
            case c:
            case h:
              return X(re + "Hours", 0);
            case f:
              return X(re + "Minutes", 1);
            case l:
              return X(re + "Seconds", 2);
            case a:
              return X(re + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, B.endOf = function(M) {
          return this.startOf(M, !1);
        }, B.$set = function(M, D) {
          var O, j = F.p(M), U = "set" + (this.$u ? "UTC" : ""), V = (O = {}, O[c] = U + "Date", O[h] = U + "Date", O[u] = U + "Month", O[o] = U + "FullYear", O[f] = U + "Hours", O[l] = U + "Minutes", O[a] = U + "Seconds", O[s] = U + "Milliseconds", O)[j], X = j === c ? this.$D + (D - this.$W) : D;
          if (j === u || j === o) {
            var z = this.clone().set(h, 1);
            z.$d[V](X), z.init(), this.$d = z.set(h, Math.min(this.$D, z.daysInMonth())).$d;
          } else V && this.$d[V](X);
          return this.init(), this;
        }, B.set = function(M, D) {
          return this.clone().$set(M, D);
        }, B.get = function(M) {
          return this[F.p(M)]();
        }, B.add = function(M, D) {
          var O, j = this;
          M = Number(M);
          var U = F.p(D), V = function(ie) {
            var K = I(j);
            return F.w(K.date(K.date() + Math.round(ie * M)), j);
          };
          if (U === u) return this.set(u, this.$M + M);
          if (U === o) return this.set(o, this.$y + M);
          if (U === c) return V(1);
          if (U === d) return V(7);
          var X = (O = {}, O[l] = n, O[f] = i, O[a] = r, O)[U] || 1, z = this.$d.getTime() + M * X;
          return F.w(z, this);
        }, B.subtract = function(M, D) {
          return this.add(-1 * M, D);
        }, B.format = function(M) {
          var D = this, O = this.$locale();
          if (!this.isValid()) return O.invalidDate || m;
          var j = M || "YYYY-MM-DDTHH:mm:ssZ", U = F.z(this), V = this.$H, X = this.$m, z = this.$M, ie = O.weekdays, K = O.months, re = O.meridiem, he = function(ae, le, pe, be) {
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
                  return z + 1;
                case "MM":
                  return F.s(z + 1, 2, "0");
                case "MMM":
                  return he(O.monthsShort, z, K, 3);
                case "MMMM":
                  return he(K, z);
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
        }, B.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, B.diff = function(M, D, O) {
          var j, U = this, V = F.p(D), X = I(M), z = (X.utcOffset() - this.utcOffset()) * n, ie = this - X, K = function() {
            return F.m(U, X);
          };
          switch (V) {
            case o:
              j = K() / 12;
              break;
            case u:
              j = K();
              break;
            case p:
              j = K() / 3;
              break;
            case d:
              j = (ie - z) / 6048e5;
              break;
            case c:
              j = (ie - z) / 864e5;
              break;
            case f:
              j = ie / i;
              break;
            case l:
              j = ie / n;
              break;
            case a:
              j = ie / r;
              break;
            default:
              j = ie;
          }
          return O ? j : F.a(j);
        }, B.daysInMonth = function() {
          return this.endOf(u).$D;
        }, B.$locale = function() {
          return b[this.$L];
        }, B.locale = function(M, D) {
          if (!M) return this.$L;
          var O = this.clone(), j = R(M, D, !0);
          return j && (O.$L = j), O;
        }, B.clone = function() {
          return F.w(this.$d, this);
        }, B.toDate = function() {
          return new Date(this.valueOf());
        }, B.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, B.toISOString = function() {
          return this.$d.toISOString();
        }, B.toString = function() {
          return this.$d.toUTCString();
        }, P;
      })(), Y = S.prototype;
      return I.prototype = Y, [["$ms", s], ["$s", a], ["$m", l], ["$H", f], ["$W", c], ["$M", u], ["$y", o], ["$D", h]].forEach((function(P) {
        Y[P[1]] = function(B) {
          return this.$g(B, P[0], P[1]);
        };
      })), I.extend = function(P, B) {
        return P.$i || (P(B, S, I), P.$i = !0), I;
      }, I.locale = R, I.isDayjs = w, I.unix = function(P) {
        return I(1e3 * P);
      }, I.en = b[x], I.Ls = b, I.p = {}, I;
    }));
  })(Rt)), Rt.exports;
}
var Ci;
function Vu() {
  if (Ci) return vt.exports;
  Ci = 1;
  const e = Wu();
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
    const s = i.allowedSchemes || ["http", "https", "ftp", "mailto", "tel", "sms"], a = i.allowProtocolRelative !== !1;
    if (typeof n != "string")
      return !1;
    n = t(n);
    const l = n.match(/^([a-zA-Z][a-zA-Z0-9.\-+]*):/);
    if (!l)
      return n.match(/^[/\\]{2}/) ? !a : !1;
    const f = l[1].toLowerCase();
    return s.indexOf(f) === -1;
  }
  return vt.exports = function(n) {
    const i = {};
    return i.options = n || {}, i.filterTag = i.options.filterTag || function(s) {
      return s = s.trim(), s.toLowerCase();
    }, i.string = function(s, a) {
      return typeof s != "string" && (typeof s == "number" || typeof s == "boolean" ? s += "" : s = ""), s = s.trim(), a !== void 0 && s === "" && (s = a), s;
    }, i.strings = function(s) {
      return Array.isArray(s) ? s.map(function(a) {
        return i.string(a);
      }) : [];
    }, i.integer = function(s, a, l, f) {
      if (a === void 0 && (a = 0), typeof s == "number")
        s = Math.floor(s);
      else
        try {
          s = parseInt(s, 10), isNaN(s) && (s = a);
        } catch {
          s = a;
        }
      return typeof l == "number" && s < l && (s = l), typeof f == "number" && s > f && (s = f), s;
    }, i.padInteger = function(s, a) {
      let l = s + "";
      for (; l.length < a; )
        l = "0" + l;
      return l;
    }, i.float = function(s, a, l, f) {
      if (a === void 0 && (a = 0), typeof s != "number")
        try {
          s = parseFloat(s, 10), isNaN(s) && (s = a);
        } catch {
          s = a;
        }
      return typeof l == "number" && s < l && (s = l), typeof f == "number" && s > f && (s = f), s;
    }, i.naughtyHref = r, i.url = function(s, a, l) {
      if (s = i.string(s, a), s === a)
        return s;
      if (s = t(s), r(s) || (s = f(s), s === null))
        return a;
      return s;
      function f(c) {
        return c.match(/^(((https?|ftp):\/\/)|((mailto|tel|sms):)|#|([^/.]+)?\/|[^/.]+$)/) ? c : c.match(/^[^/.]+\.[^/.]+/) ? (l ? "https://" : "http://") + c : null;
      }
    }, i.select = function(s, a, l) {
      if (s = i.string(s), !a || !a.length)
        return l;
      let f;
      return typeof a[0] == "object" ? (f = a.find(function(c) {
        return c.value === null || c.value === void 0 ? !1 : c.value.toString() === s;
      }), f != null ? f.value : l) : (f = a.find(function(c) {
        return c == null ? !1 : c.toString() === s;
      }), f !== void 0 ? f : l);
    }, i.boolean = function(s, a) {
      return s === !0 ? !0 : s === !1 ? !1 : (s = i.string(s, a), s === a ? s === void 0 ? !1 : s : (s = s.toLowerCase().charAt(0), s === "" || s === "n" || s === "0" || s === "f" ? !1 : s === "t" || s === "y" || s === "1"));
    }, i.addBooleanFilterToCriteria = function(s, a, l, f) {
      f === void 0 && (f = null);
      let c = typeof s == "object" && s !== null ? s[a] : s;
      c = c === void 0 ? f : c, c = i.booleanOrNull(c), c === null || (c ? l[a] = !0 : l[a] = { $ne: !0 });
    }, i.booleanOrNull = function(s, a) {
      return s === !0 || s === !1 || s === null ? s : (s = i.string(s, a), s === a ? a === void 0 ? null : s : s === "null" ? null : (s = s.toLowerCase().charAt(0), s === "" || s === "n" || s === "0" || s === "f" ? !1 : s === "t" || s === "y" || s === "1" ? !0 : s === "a" ? null : a));
    }, i.date = function(s, a, l) {
      let f;
      function c() {
        return a === void 0 && (a = e().format("YYYY-MM-DD")), a;
      }
      if (typeof s == "string") {
        if (s.match(/\//)) {
          if (f = s.split("/"), f.length === 2)
            return (l || /* @__PURE__ */ new Date()).getFullYear() + "-" + i.padInteger(f[0], 2) + "-" + i.padInteger(f[1], 2);
          if (f.length === 3) {
            if (f[2] < 100) {
              const d = l || /* @__PURE__ */ new Date(), u = d.getFullYear() % 100, p = d.getFullYear() - u;
              let o = parseInt(f[2]) + p;
              o - d.getFullYear() > 50 && (o -= 100), f[2] = o;
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
    }, i.time = function(s, a) {
      s = i.string(s).toLowerCase(), s = s.trim();
      const l = s.match(/^(\d+)([:|.](\d+))?([:|.](\d+))?\s*(am|pm|AM|PM|a|p|A|M)?$/);
      if (l) {
        let f = parseInt(l[1], 10);
        const c = l[3] !== void 0 ? parseInt(l[3], 10) : 0, d = l[5] !== void 0 ? parseInt(l[5], 10) : 0;
        let u = l[6] ? l[6].toLowerCase() : l[6];
        return u = u && u.charAt(0), f === 12 && u === "a" ? f -= 12 : f === 12 && u === "p" || u === "p" && (f += 12), (f === 24 || f === "24") && (f = 0), i.padInteger(f, 2) + ":" + i.padInteger(c, 2) + ":" + i.padInteger(d, 2);
      } else
        return a !== void 0 ? a : e().format("HH:mm");
    }, i.formatTime = function(s) {
      return e(s).format("HH:mm:ss");
    }, i.tags = function(s, a) {
      return typeof s == "string" && (s = s.split(/,\s*/)), Array.isArray(s) ? s.map((d) => i.string(d)).map(a || i.filterTag).filter((d) => d.length > 0) : [];
    }, i.idRegExp = i.options.idRegExp || /^[A-Za-z0-9_]+$/, i.id = function(s, a) {
      const l = i.string(s, a);
      return l === a || l.match(i.idRegExp) ? l : a;
    }, i.ids = function(s) {
      return Array.isArray(s) ? s.filter(function(l) {
        return i.id(l) !== void 0;
      }) : [];
    }, i;
  }, vt.exports.naughtyHref = r, vt.exports;
}
var Dr, Ri;
function Hu() {
  if (Ri) return Dr;
  Ri = 1;
  const e = Du, t = Iu(), { isPlainObject: r } = Tu(), n = Nu(), { parse: i } = Uu(), { naughtyHref: s } = Vu(), a = [
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
  function u(y) {
    const w = y && y.logger || console, R = {};
    for (const I of d)
      R[I] = typeof w[I] == "function" ? (...F) => w[I](...F) : (...F) => console[I](...F);
    return R;
  }
  function p(y, w) {
    y && Object.keys(y).forEach(function(R) {
      w(y[R], R);
    });
  }
  function o(y, w) {
    return {}.hasOwnProperty.call(y, w);
  }
  function h(y, w) {
    return !Array.isArray(y) || !Array.isArray(w) ? w : y.concat(w);
  }
  function m(y, w) {
    const R = /* @__PURE__ */ Object.create(null);
    for (const I of [y, w])
      for (const F of Object.keys(I))
        R[F] = o(R, F) ? R[F].concat(I[F]) : I[F];
    return R;
  }
  function g(y, w) {
    const R = [];
    return p(y, function(I) {
      w(I) && R.push(I);
    }), R;
  }
  function k(y) {
    for (const w in y)
      if (o(y, w))
        return !1;
    return !0;
  }
  function v(y) {
    return y.map(function(w) {
      if (!w.url)
        throw new Error("URL missing");
      return w.url + (w.w ? ` ${w.w}w` : "") + (w.h ? ` ${w.h}h` : "") + (w.d ? ` ${w.d}x` : "");
    }).join(", ");
  }
  Dr = x;
  const _ = /^[^\0\t\n\f\r /<=>]+$/, C = 8;
  function x(y, w, R) {
    if (y == null)
      return "";
    const I = R && R.depth || 0, F = R && R.iframeFallbackDepth || 0;
    typeof y == "number" && (y = y.toString());
    let S = "", Y = "";
    function P(A, N) {
      const T = this;
      this.tag = A, this.attribs = N || {}, this.tagPosition = S.length, this.text = "", this.openingTagLength = 0, this.mediaChildren = [], this.updateParentNodeText = function() {
        if (re.length) {
          const L = re[re.length - 1];
          L.text += T.text;
        }
      }, this.updateParentNodeMediaChildren = function() {
        re.length && a.includes(this.tag) && re[re.length - 1].mediaChildren.push(this.tag);
      };
    }
    w = Object.assign({}, x.defaults, w), w.parser = Object.assign({}, b, w.parser), typeof y == "string" && !w.parser.xmlMode && (y = y.replaceAll("<![CDATA[", "<!&#91;CDATA["));
    const B = u(w), M = function(A) {
      return w.allowedTags === !1 || (w.allowedTags || []).indexOf(A) > -1;
    };
    l.forEach(function(A) {
      M(A) && !w.allowVulnerableTags && B.warn(
        `Your \`allowedTags\` option includes \`${A}\`, which is inherently vulnerable to XSS attacks. Please remove it from \`allowedTags\`, or, to disable this warning, add the \`allowVulnerableTags\` option and ensure you are accounting for this risk.`
      );
    });
    const D = w.nonTextTags || [
      "script",
      "style",
      "textarea",
      "option",
      "xmp"
    ];
    let O, j;
    w.allowedAttributes && (O = {}, j = {}, p(w.allowedAttributes, function(A, N) {
      O[N] = [];
      const T = [];
      A.forEach(function(L) {
        typeof L == "string" && L.indexOf("*") >= 0 ? T.push(t(L).replace(/\\\*/g, ".*")) : O[N].push(L);
      }), T.length && (j[N] = new RegExp("^(" + T.join("|") + ")$"));
    }));
    const U = {}, V = {}, X = {};
    p(w.allowedClasses, function(A, N) {
      if (O && (o(O, N) || (O[N] = []), O[N].push("class")), U[N] = A, Array.isArray(A)) {
        const T = [];
        U[N] = [], X[N] = [], A.forEach(function(L) {
          typeof L == "string" && L.indexOf("*") >= 0 ? T.push(t(L).replace(/\\\*/g, ".*")) : L instanceof RegExp ? X[N].push(L) : U[N].push(L);
        }), T.length && (V[N] = new RegExp("^(" + T.join("|") + ")$"));
      }
    });
    const z = {};
    let ie;
    p(w.transformTags, function(A, N) {
      let T;
      typeof A == "function" ? T = A : typeof A == "string" && (T = x.simpleTransform(A)), N === "*" ? ie = T : z[N] = T;
    });
    let K, re, he, me, fe, ae, le, pe, be = !1;
    tn();
    const et = new e.Parser({
      onopentag: function(A, N) {
        if (w.onOpenTag && w.onOpenTag(A, N), qt(), w.enforceHtmlBoundary && A === "html" && tn(), pe)
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
        if (o(z, A) && (ue = z[A](A, N), T.attribs = N = ue.attribs, ue.text !== void 0 && (T.innerText = ue.text), A !== ue.tagName && (T.name = A = ue.tagName, me[K] = ue.tagName)), ie && (ue = ie(A, N), T.attribs = N = ue.attribs, A !== ue.tagName && (T.name = A = ue.tagName, me[K] = ue.tagName)), (!M(A) || ao(A, N) || w.disallowedTagsMode === "recursiveEscape" && !k(he) || w.nestingLimit != null && K >= w.nestingLimit) && (L = !0, he[K] = !0, (w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") && D.indexOf(A) !== -1 && (fe = !0, ae = 1, T.tag.toLowerCase() === "noscript" && (le = io("noscript", et.endIndex + 1)))), K++, L) {
          if (w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") {
            if (T.innerText && !te) {
              const H = Ce(T.innerText);
              w.textFilter ? S += w.textFilter(H, A) : S += H, be = !0;
            }
            return;
          }
          Y = S, S = "";
        }
        if (S += "<" + A, A === "script" && (w.allowedScriptHostnames || w.allowedScriptDomains) && (T.innerText = ""), L && (w.disallowedTagsMode === "escape" || w.disallowedTagsMode === "recursiveEscape") && w.preserveEscapedAttributes ? p(N, function(H, J) {
          S += " " + J + '="' + Ce(H || "", !0) + '"';
        }) : (!O || o(O, A) || O["*"]) && p(N, function(H, J) {
          if (!_.test(J)) {
            delete T.attribs[J];
            return;
          }
          if (H === "" && !w.allowedEmptyAttributes.includes(J) && (w.nonBooleanAttributes.includes(J) || w.nonBooleanAttributes.includes("*"))) {
            delete T.attribs[J];
            return;
          }
          let Je = !1;
          if (!O || o(O, A) && O[A].indexOf(J) !== -1 || O["*"] && O["*"].indexOf(J) !== -1 || o(j, A) && j[A].test(J) || j["*"] && j["*"].test(J))
            Je = !0;
          else if (O && O[A]) {
            for (const Q of O[A])
              if (r(Q) && Q.name && Q.name === J) {
                Je = !0;
                let ee = "";
                if (Q.multiple === !0) {
                  const ze = H.split(" ");
                  for (const Te of ze)
                    Q.values.indexOf(Te) !== -1 && (ee === "" ? ee = Te : ee += " " + Te);
                } else Q.values.indexOf(H) >= 0 && (ee = H);
                H = ee;
              }
          }
          if (Je) {
            if (w.allowedSchemesAppliedToAttributes.indexOf(J) !== -1 && jt(A, H)) {
              delete T.attribs[J];
              return;
            }
            if (A === "meta" && J.toLowerCase() === "content" && so(N) && oo(H)) {
              delete T.attribs[J];
              return;
            }
            if (A === "script" && J === "src") {
              let Q = !0;
              try {
                const ee = rn(H);
                if (w.allowedScriptHostnames || w.allowedScriptDomains) {
                  const ze = (w.allowedScriptHostnames || []).find(function(ye) {
                    return ye === ee.url.hostname;
                  }), Te = (w.allowedScriptDomains || []).find(function(ye) {
                    return ee.url.hostname === ye || ee.url.hostname.endsWith(`.${ye}`);
                  });
                  Q = ze || Te;
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
                const ee = rn(H);
                if (ee.isRelativeUrl)
                  Q = o(w, "allowIframeRelativeUrls") ? w.allowIframeRelativeUrls : !w.allowedIframeHostnames && !w.allowedIframeDomains;
                else if (w.allowedIframeHostnames || w.allowedIframeDomains) {
                  const ze = (w.allowedIframeHostnames || []).find(function(ye) {
                    return ye === ee.url.hostname;
                  }), Te = (w.allowedIframeDomains || []).find(function(ye) {
                    return ee.url.hostname === ye || ee.url.hostname.endsWith(`.${ye}`);
                  });
                  Q = ze || Te;
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
                  jt(A, ee.url) && (ee.evil = !0);
                }), Q = g(Q, function(ee) {
                  return !ee.evil;
                }), Q.length)
                  H = v(g(Q, function(ee) {
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
              const Q = U[A], ee = U["*"], ze = V[A], Te = X[A], ye = X["*"], ho = V["*"], on = [
                ze,
                ho
              ].concat(Te, ye).filter(function(fo) {
                return fo;
              });
              if (Q && ee ? H = nn(
                H,
                h(Q, ee),
                on
              ) : H = nn(
                H,
                Q || ee,
                on
              ), !H.length) {
                delete T.attribs[J];
                return;
              }
            }
            if (J === "style") {
              if (w.parseStyleAttributes)
                try {
                  const Q = i(A + " {" + H + "}", { map: !1 }), ee = lo(
                    Q,
                    w.allowedStyles
                  );
                  if (H = co(ee), H.length === 0) {
                    delete T.attribs[J];
                    return;
                  }
                } catch {
                  typeof window < "u" && B.warn(
                    `Failed to parse "${A} {${H}}". If you are running this in a browser, we recommend disabling style parsing with the parseStyleAttributes option, since it only works in a node environment due to a postcss dependency. More info: https://github.com/apostrophecms/sanitize-html/issues/547`
                  ), delete T.attribs[J];
                  return;
                }
              else if (w.allowedStyles)
                throw new Error("allowedStyles option cannot be used together with parseStyleAttributes: false.");
            }
            S += " " + J, H && H.length ? S += '="' + Ce(H, !0) + '"' : w.allowedEmptyAttributes.includes(J) && (S += '=""');
          } else
            delete T.attribs[J];
        }), w.selfClosing.indexOf(A) !== -1)
          S += " />";
        else if (S += ">", T.innerText && !te) {
          const H = Ce(T.innerText);
          w.textFilter ? S += w.textFilter(H, A) : S += H, be = !0;
        }
        L && (S = Y + Ce(S), Y = ""), T.openingTagLength = S.length - T.tagPosition;
      },
      ontext: function(A) {
        if (qt(), fe || pe)
          return;
        const N = re[re.length - 1];
        let T;
        if (N && (T = N.tag, A = N.innerText !== void 0 ? N.innerText : A), w.disallowedTagsMode === "completelyDiscard" && !M(T))
          A = "";
        else if (T && M(T) && (w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") && T === "script")
          S += A;
        else if (T && M(T) && (w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") && T === "style")
          S += re.some((L) => [L.tag, L.name].some(
            (te) => te === "svg" || te === "math"
          )) ? A.replace(/</g, "\\3c ") : A;
        else if (T && M(T) && (w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") && (T === "textarea" || T === "xmp"))
          T === "xmp" ? S += A.replace(/</g, "&lt;").replace(/>/g, "&gt;") : S += Ce(A, !1);
        else if (
          // htmlparser2 treats <iframe> as a raw-text element, so markup inside
          // (including after an unclosed <iframe>) arrives as a single text node.
          // When the iframe is discarded, re-sanitize that fallback markup as HTML
          // instead of escaping it as plain text (issue #5550).
          // The nested call continues from the current depth so that
          // `nestingLimit` applies to the whole output.
          T === "iframe" && !M(T) && w.disallowedTagsMode === "discard" && F < C
        )
          S += x(A, w, {
            depth: K,
            iframeFallbackDepth: F + 1
          });
        else if (!be) {
          const L = Ce(A, !1);
          w.textFilter ? S += w.textFilter(L, T) : S += L;
        }
        if (re.length) {
          const L = re[re.length - 1];
          L.text += A;
        }
      },
      onclosetag: function(A, N) {
        if (w.onCloseTag && w.onCloseTag(A, N), qt(), pe) {
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
        fe = w.enforceHtmlBoundary ? A === "html" : !1, K--;
        const L = he[K];
        if (L) {
          if (delete he[K], w.disallowedTagsMode === "discard" || w.disallowedTagsMode === "completelyDiscard") {
            T.updateParentNodeText();
            return;
          }
          Y = S, S = "";
        }
        if (me[K] && (A = me[K], delete me[K]), w.exclusiveFilter) {
          const te = w.exclusiveFilter(T);
          if (te === "excludeTag") {
            L && (S = Y, Y = ""), S = S.substring(0, T.tagPosition) + S.substring(T.tagPosition + T.openingTagLength);
            return;
          } else if (te) {
            S = S.substring(0, T.tagPosition);
            return;
          }
        }
        if (T.updateParentNodeMediaChildren(), T.updateParentNodeText(), // Already output />
        w.selfClosing.indexOf(A) !== -1 || // Escaped tag, closing tag is implied
        N && !M(A) && ["escape", "recursiveEscape"].indexOf(w.disallowedTagsMode) >= 0) {
          L && (S = Y, Y = "");
          return;
        }
        S += "</" + A + ">", L && (S = Y + Ce(S), Y = ""), be = !1;
      }
    }, w.parser);
    if (et.write(y), et.end(), w.disallowedTagsMode === "escape" || w.disallowedTagsMode === "recursiveEscape") {
      const A = et.endIndex;
      if (A != null && A >= 0 && A < y.length) {
        const N = y.substring(A);
        S += Ce(N);
      } else (A == null || A < 0) && y.length > 0 && S === "" && (S = Ce(y));
    }
    return S;
    function tn() {
      S = "", K = I, re = [], he = {}, me = {}, fe = !1, ae = 0, le = null, pe = !1;
    }
    function qt() {
      le !== null && et.startIndex >= le && (le = null, pe = !1);
    }
    function io(A, N) {
      const T = new RegExp("</" + A + "[\\t\\n\\f\\r />]", "ig");
      T.lastIndex = N;
      const L = T.exec(y);
      return L ? L.index : 1 / 0;
    }
    function Ce(A, N) {
      return typeof A != "string" && (A = A + ""), w.parser.decodeEntities && (A = A.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), N && (A = A.replace(/"/g, "&quot;"))), A = A.replace(/&(?![a-zA-Z0-9#]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), N && (A = A.replace(/"/g, "&quot;")), A;
    }
    function jt(A, N) {
      const T = o(w.allowedSchemesByTag, A) ? w.allowedSchemesByTag[A] : w.allowedSchemes || [];
      return s(N, {
        allowedSchemes: T,
        allowProtocolRelative: w.allowProtocolRelative
      });
    }
    function so(A) {
      return Object.keys(A).some(function(N) {
        return N.toLowerCase() === "http-equiv" && String(A[N]).trim().toLowerCase() === "refresh";
      });
    }
    function oo(A) {
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
      const sn = L;
      for (; L < N.length && /[0-9.]/.test(N[L]); )
        L++;
      if (L === sn)
        return !0;
      if (L < N.length) {
        const J = N[L];
        if (J !== ";" && J !== "," && !T(J))
          return !0;
        te(), (N[L] === ";" || N[L] === ",") && L++, te();
      }
      if (L >= N.length)
        return !1;
      let Ue = N.slice(L), H = !0;
      if (ue(L) === "u" && (H = !1, ue(L + 1) === "r" && ue(L + 2) === "l" && (L += 3, te(), N[L] === "=" && (L++, te(), H = !0))), H) {
        const J = N[L];
        if ((J === '"' || J === "'") && L++, Ue = N.slice(L), J === '"' || J === "'") {
          const Je = Ue.indexOf(J);
          Je !== -1 && (Ue = Ue.slice(0, Je));
        }
      }
      return jt("meta", Ue);
    }
    function ao(A, N) {
      if (!$t(A).some((L) => f.includes(L)))
        return !1;
      const T = w.allowedSchemesAppliedToAttributes || [];
      return Object.keys(N || {}).some(function(L) {
        if (!$t(L).includes("attributename"))
          return !1;
        const te = (N[L] || "").trim().toLowerCase();
        return T.includes(te) || $t(te).some((ue) => c.includes(ue) || T.includes(ue));
      });
    }
    function $t(A) {
      return A.toLowerCase().split(":").map((N) => N.trim());
    }
    function rn(A) {
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
    function lo(A, N) {
      if (!N)
        return A;
      const T = A.nodes[0];
      let L;
      return N[T.selector] && N["*"] ? L = m(
        N[T.selector],
        N["*"]
      ) : L = N[T.selector] || N["*"], L && (A.nodes[0].nodes = T.nodes.reduce(uo(L), [])), A;
    }
    function co(A) {
      return A.nodes[0].nodes.reduce(function(N, T) {
        return N.push(
          `${T.prop}:${T.value}${T.important ? " !important" : ""}`
        ), N;
      }, []).join(";");
    }
    function uo(A) {
      return function(N, T) {
        return o(A, T.prop) && A[T.prop].some(function(te) {
          return te.test(T.value);
        }) && N.push(T), N;
      };
    }
    function nn(A, N, T) {
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
  return x.defaults = {
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
  }, x.simpleTransform = function(y, w, R) {
    return R = R === void 0 ? !0 : R, w = w || {}, function(I, F) {
      let S;
      if (R)
        for (S in w)
          F[S] = w[S];
      else
        F = w;
      return {
        tagName: y,
        attribs: F
      };
    };
  }, Dr;
}
var Yu = /* @__PURE__ */ Hu();
const Ai = /* @__PURE__ */ Tc(Yu), Gu = () => ea(), Zu = [
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
], Xu = {
  a: ["href", "name", "target"],
  span: ["class"],
  pre: ["class"],
  code: ["class"],
  img: ["src", "alt", "title", "width", "height", "loading"]
}, Ku = ["innerHTML"], Qu = {
  key: 1,
  class: "markdown-empty"
}, eh = /* @__PURE__ */ mo({
  __name: "markdown-view",
  setup(e) {
    const t = Gu(), r = ta(), n = go(At.allowAdditionalTags ?? {});
    bo(Si("@config", () => {
      n.value = { ...At.allowAdditionalTags };
    }));
    const i = new Ic({
      html: !0,
      breaks: !0,
      linkify: !0,
      typographer: !1
    }), s = pt(
      () => t.value.content || r.value || ""
    ), a = pt(() => {
      const c = t.value.allowedTags;
      return c && c.length > 0 ? c : [...Zu, ...Object.keys(n.value)];
    }), l = pt(() => {
      const c = t.value.allowedAttributes;
      if (c)
        try {
          return JSON.parse(c);
        } catch {
        }
      const d = { ...Xu };
      for (const [u, p] of Object.entries(n.value))
        d[u] = [.../* @__PURE__ */ new Set([...d[u] ?? [], ...p])];
      return d;
    }), f = pt(() => {
      if (!s.value) return "";
      const c = i.render(s.value);
      return Ai(c, {
        // Preserve case-sensitive SVG names such as viewBox and linearGradient.
        parser: { lowerCaseTags: !1, lowerCaseAttributeNames: !1 },
        allowedTags: a.value,
        allowedAttributes: l.value,
        allowedClasses: {
          code: ["language-*"],
          pre: ["language-*"],
          span: ["language-*"]
        },
        transformTags: {
          a: Ai.simpleTransform("a", { rel: "noopener noreferrer" })
        }
      });
    });
    return (c, d) => f.value ? (an(), ln("article", {
      key: 0,
      class: "data-body markdown-container",
      innerHTML: f.value
    }, null, 8, Ku)) : (an(), ln("div", Qu, " No markdown content provided. "));
  }
}), th = ":root{--p-form-field-padding-x: .75rem;--p-form-field-padding-y: .5rem;--p-form-field-sm-padding-x: .625rem;--p-form-field-sm-padding-y: .375rem;--p-form-field-lg-padding-x: .875rem;--p-form-field-lg-padding-y: .625rem;--p-form-field-border-radius: .375rem;--p-form-field-transition-duration: .2s;--p-form-field-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgba(18, 18, 23, .05);--p-focus-ring-width: 1px;--p-focus-ring-style: solid;--p-focus-ring-color: color-mix(in srgb, var(--p-primary-color) 100%, transparent);--p-focus-ring-offset: 2px;--p-toggleswitch-width: 2.5rem;--p-toggleswitch-height: 1.5rem;--p-toggleswitch-border-radius: 30px;--p-toggleswitch-gap: .25rem;--p-toggleswitch-border-width: 1px;--p-toggleswitch-transition-duration: .2s;--p-toggleswitch-slide-duration: .2s;--p-toggleswitch-handle-size: 1rem;--p-toggleswitch-handle-border-radius: 9999px}:root{color-scheme:light dark;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-secondary: #6f7385;--p-secondary-50: color-mix(in srgb, var(--p-secondary) 5%, white);--p-secondary-100: color-mix(in srgb, var(--p-secondary) 10%, white);--p-secondary-200: color-mix(in srgb, var(--p-secondary) 20%, white);--p-secondary-300: color-mix(in srgb, var(--p-secondary) 35%, white);--p-secondary-400: color-mix(in srgb, var(--p-secondary) 65%, white);--p-secondary-500: var(--p-secondary);--p-secondary-600: color-mix(in srgb, var(--p-secondary) 80%, black);--p-secondary-700: color-mix(in srgb, var(--p-secondary) 65%, black);--p-secondary-800: color-mix(in srgb, var(--p-secondary) 55%, black);--p-secondary-900: color-mix(in srgb, var(--p-secondary) 50%, black);--p-secondary-950: color-mix(in srgb, var(--p-secondary) 30%, black);--p-danger: rgb(239, 68, 68);--p-danger-50: color-mix(in srgb, var(--p-danger) 5%, white);--p-danger-100: color-mix(in srgb, var(--p-danger) 10%, white);--p-danger-200: color-mix(in srgb, var(--p-danger) 20%, white);--p-danger-300: color-mix(in srgb, var(--p-danger) 30%, white);--p-danger-400: color-mix(in srgb, var(--p-danger) 40%, white);--p-danger-500: var(--p-danger);--p-danger-600: color-mix(in srgb, var(--p-danger) 80%, black);--p-danger-700: color-mix(in srgb, var(--p-danger) 70%, black);--p-danger-800: color-mix(in srgb, var(--p-danger) 60%, black);--p-danger-900: color-mix(in srgb, var(--p-danger) 50%, black);--p-danger-950: color-mix(in srgb, var(--p-danger) 40%, black);--p-success: rgb(34, 197, 94);--p-success-50: color-mix(in srgb, var(--p-success) 5%, white);--p-success-100: color-mix(in srgb, var(--p-success) 10%, white);--p-success-200: color-mix(in srgb, var(--p-success) 20%, white);--p-success-300: color-mix(in srgb, var(--p-success) 30%, white);--p-success-400: color-mix(in srgb, var(--p-success) 40%, white);--p-success-500: var(--p-success);--p-success-600: color-mix(in srgb, var(--p-success) 80%, black);--p-success-700: color-mix(in srgb, var(--p-success) 70%, black);--p-success-800: color-mix(in srgb, var(--p-success) 60%, black);--p-success-900: color-mix(in srgb, var(--p-success) 50%, black);--p-success-950: color-mix(in srgb, var(--p-success) 40%, black);--p-warn: rgb(249, 115, 22);--p-warn-50: color-mix(in srgb, var(--p-warn) 5%, white);--p-warn-100: color-mix(in srgb, var(--p-warn) 10%, white);--p-warn-200: color-mix(in srgb, var(--p-warn) 20%, white);--p-warn-300: color-mix(in srgb, var(--p-warn) 30%, white);--p-warn-400: color-mix(in srgb, var(--p-warn) 40%, white);--p-warn-500: var(--p-warn);--p-warn-600: color-mix(in srgb, var(--p-warn) 80%, black);--p-warn-700: color-mix(in srgb, var(--p-warn) 70%, black);--p-warn-800: color-mix(in srgb, var(--p-warn) 60%, black);--p-warn-900: color-mix(in srgb, var(--p-warn) 50%, black);--p-warn-950: color-mix(in srgb, var(--p-warn) 40%, black);--p-info: rgb(14, 165, 233);--p-info-50: color-mix(in srgb, var(--p-info) 5%, white);--p-info-100: color-mix(in srgb, var(--p-info) 10%, white);--p-info-200: color-mix(in srgb, var(--p-info) 20%, white);--p-info-300: color-mix(in srgb, var(--p-info) 30%, white);--p-info-400: color-mix(in srgb, var(--p-info) 40%, white);--p-info-500: var(--p-info);--p-info-600: color-mix(in srgb, var(--p-info) 80%, black);--p-info-700: color-mix(in srgb, var(--p-info) 70%, black);--p-info-800: color-mix(in srgb, var(--p-info) 60%, black);--p-info-900: color-mix(in srgb, var(--p-info) 50%, black);--p-info-950: color-mix(in srgb, var(--p-info) 40%, black);--p-help: rgb(168, 85, 247);--p-help-50: color-mix(in srgb, var(--p-help) 5%, white);--p-help-100: color-mix(in srgb, var(--p-help) 10%, white);--p-help-200: color-mix(in srgb, var(--p-help) 20%, white);--p-help-300: color-mix(in srgb, var(--p-help) 30%, white);--p-help-400: color-mix(in srgb, var(--p-help) 40%, white);--p-help-500: var(--p-help);--p-help-600: color-mix(in srgb, var(--p-help) 80%, black);--p-help-700: color-mix(in srgb, var(--p-help) 70%, black);--p-help-800: color-mix(in srgb, var(--p-help) 60%, black);--p-help-900: color-mix(in srgb, var(--p-help) 50%, black);--p-help-950: color-mix(in srgb, var(--p-help) 40%, black);--p-accent: rgb(20, 184, 166);--p-accent-50: color-mix(in srgb, var(--p-accent) 5%, white);--p-accent-100: color-mix(in srgb, var(--p-accent) 10%, white);--p-accent-200: color-mix(in srgb, var(--p-accent) 20%, white);--p-accent-300: color-mix(in srgb, var(--p-accent) 30%, white);--p-accent-400: color-mix(in srgb, var(--p-accent) 40%, white);--p-accent-500: var(--p-accent);--p-accent-600: color-mix(in srgb, var(--p-accent) 80%, black);--p-accent-700: color-mix(in srgb, var(--p-accent) 70%, black);--p-accent-800: color-mix(in srgb, var(--p-accent) 60%, black);--p-accent-900: color-mix(in srgb, var(--p-accent) 50%, black);--p-accent-950: color-mix(in srgb, var(--p-accent) 40%, black);--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-content-border-radius: 6px;--p-font-heading-family: var(--v-font-family-head, Arial);--p-font-heading-scale: 1;--p-font-heading-line-height: 1.5;--p-font-heading-letter-spacing: normal;--p-font-heading-stretch: normal;--p-font-heading-variation-settings: normal;--p-font-body-scale: 1;--p-font-body-line-height: 1.5;--p-font-body-letter-spacing: normal;--p-font-body-stretch: normal;--p-font-body-variation-settings: normal;--p-font-mono-family: ui-monospace}:root{--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}@media(prefers-color-scheme:dark){:root:not(.w-theme-light){--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}}:root.w-theme-dark,.w-theme-dark{color-scheme:dark;--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}:root.w-theme-light,.w-theme-light{color-scheme:light;--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}.markdown-container{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:var(--p-text-color, #333);line-height:1.6;width:100%;box-sizing:border-box;overflow-wrap:break-word;word-break:break-word}.markdown-empty{color:var(--p-text-muted-color, #999);font-style:italic;text-align:center}", rh = { props: { type: "object", properties: { content: { type: "string", default: "", description: "Markdown source text to render (GFM)" }, "allowed-tags": { type: "array", items: { type: "string" }, default: [], description: "Override sanitizer tag whitelist (empty = built-in defaults). WARNING: widening this is a security decision — only do it for trusted input." }, "allowed-attributes": { type: "string", default: "", description: "JSON-stringified `{tag: [attr,...]}` map for sanitize-html (empty = defaults)" } } } }, nh = {
  wippy: rh
};
class ih extends ra {
  static get wippyConfig() {
    return {
      propsSchema: nh.wippy.props,
      hostCssKeys: ["themeConfigUrl", "markdownCssUrl"],
      inlineCss: th,
      contentTemplate: "text/markdown"
    };
  }
  static get vueConfig() {
    return {
      rootComponent: eh
    };
  }
}
ko(import.meta.url, ih);
