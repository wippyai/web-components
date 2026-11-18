import { ref as C, inject as D, createApp as K, defineComponent as Y, useTemplateRef as q, computed as J, watchEffect as G, openBlock as S, createElementBlock as E, toDisplayString as Q, normalizeClass as X, unref as Z, createCommentVNode as rr } from "vue";
import { addCollection as er } from "@iconify/vue";
import { config as O, addIcons as tr, on as or, applyThemeMode as V, host as ar, hostCss as ir, loadCss as sr, define as nr } from "@wippy-fe/proxy";
import { getActivePinia as cr, createPinia as pr, setActivePinia as lr } from "pinia";
var L = "data-wippy-visible";
function z(r) {
  const e = r.getAttribute(L);
  return e === "true" ? !0 : e === "false" ? !1 : null;
}
var hr = Object.defineProperty, M = (r) => {
  throw TypeError(r);
}, ur = (r, e, t) => e in r ? hr(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, u = (r, e, t) => ur(r, typeof e != "symbol" ? e + "" : e, t), $ = (r, e, t) => e.has(r) || M("Cannot " + t), mr = (r, e, t) => ($(r, e, "read from private field"), t ? t.call(r) : e.get(r)), fr = (r, e, t) => e.has(r) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), vr = (r, e, t, o) => ($(r, e, "write to private field"), e.set(r, t), t), dr = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], gr = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function H(r) {
  const e = r.startsWith("--") ? r : `--${r}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(e) ? e : null;
}
function br(...r) {
  const e = /* @__PURE__ */ new Set();
  for (const t of r)
    if (t)
      for (const [o, a] of Object.entries(t)) {
        if ((o === "@light" || o === "@dark") && a && typeof a == "object") {
          for (const [c, s] of Object.entries(a)) {
            const p = typeof s == "string" ? H(c) : null;
            p && e.add(p);
          }
          continue;
        }
        const i = typeof a == "string" ? H(o) : null;
        i && e.add(i);
      }
  return [...e].sort();
}
function yr(r) {
  if (r.length === 0)
    return "";
  const e = r.map((t) => `  ${t}: inherit;`).join(`
`);
  return `${gr} {
${e}
}`;
}
function _r(r, e) {
  const t = yr(e);
  t && B(r, t, "@wippy-fe/css-variables-bridge");
}
function wr(r, e) {
  const o = (e ?? dr).map(async (a) => {
    const i = ir[a];
    if (!i)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${a}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await sr(i);
    } catch (c) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${a}" (${i}):`, c), null;
    }
  });
  return Promise.all(o).then((a) => {
    for (const i of a) {
      if (!i)
        continue;
      const c = document.createElement("style");
      c.textContent = i, c.setAttribute("role", "@wippy-fe/host-css"), r.appendChild(c);
    }
  });
}
function xr(r, e) {
  const t = document.createElement("style");
  t.textContent = e, r.appendChild(t);
}
function B(r, e, t) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const a = new CSSStyleSheet();
    a.replaceSync(e), r.adoptedStyleSheets = [...r.adoptedStyleSheets, a];
    return;
  }
  const o = document.createElement("style");
  o.setAttribute("role", t), o.textContent = e, r.appendChild(o);
}
function Cr(r, e) {
  B(r, e, "@wippy-fe/custom-css");
}
function W(r) {
  return r.__wippyHost ?? null;
}
function kr(r) {
  return r.replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function Sr(r, e, t) {
  switch (t.type) {
    case "string":
      return { value: e };
    case "number": {
      const o = Number.parseFloat(e);
      return Number.isNaN(o) ? { value: void 0, error: `Invalid ${r}: expected a number` } : { value: o };
    }
    case "integer": {
      const o = Number.parseInt(e, 10);
      return Number.isNaN(o) ? { value: void 0, error: `Invalid ${r}: expected an integer` } : { value: o };
    }
    case "boolean":
      return { value: e !== "false" };
    case "array":
    case "object":
      try {
        const o = JSON.parse(e);
        return t.type === "array" && !Array.isArray(o) ? { value: void 0, error: `Invalid ${r}: expected a JSON array` } : { value: o };
      } catch {
        return { value: void 0, error: `Invalid ${r}: must be valid JSON` };
      }
    default:
      return { value: e };
  }
}
function T(r, e) {
  const t = {}, o = [];
  for (const [a, i] of Object.entries(e.properties)) {
    const c = r.getAttribute(a), s = kr(a);
    if (c === null) {
      i.default !== void 0 && (t[s] = i.default);
      continue;
    }
    const p = Sr(a, c, i);
    p.error ? o.push(p.error) : t[s] = p.value;
  }
  return { props: t, errors: o };
}
var Er = class {
  constructor(r, e) {
    u(this, "_props"), u(this, "_errors"), u(this, "_content"), u(this, "_hostVisibility"), u(this, "_propsListeners", /* @__PURE__ */ new Set()), u(this, "_contentListeners", /* @__PURE__ */ new Set()), u(this, "_hostVisibilityListeners", /* @__PURE__ */ new Set()), u(this, "_disposed", !1), u(this, "_emitToDom"), u(this, "props"), u(this, "events"), u(this, "content"), u(this, "hostVisibility"), this._props = r.props, this._errors = r.errors, this._content = r.content, this._hostVisibility = r.hostVisibility, this._emitToDom = e;
    const t = this;
    this.props = {
      get value() {
        return t._props;
      },
      get errors() {
        return t._errors;
      },
      subscribe(o, a) {
        return t._subscribeProps(o, a);
      }
    }, this.events = {
      emit(o, a) {
        t._disposed || t._emitToDom(o, a);
      }
    }, this.content = r.hasContent ? {
      get value() {
        return t._content;
      },
      subscribe(o, a) {
        return t._subscribeContent(o, a);
      }
    } : null, this.hostVisibility = {
      get value() {
        return t._hostVisibility;
      },
      subscribe(o, a) {
        return t._subscribeHostVisibility(o, a);
      }
    };
  }
  /** @internal */
  notifyProps(r, e) {
    if (!this._disposed) {
      this._props = r, this._errors = e;
      for (const t of this._propsListeners)
        t(r, e);
    }
  }
  /** @internal */
  notifyContent(r) {
    if (!this._disposed) {
      this._content = r;
      for (const e of this._contentListeners)
        e(r);
    }
  }
  /** @internal */
  notifyHostVisibility(r, e) {
    if (!(this._disposed || r === e)) {
      this._hostVisibility = r;
      for (const t of this._hostVisibilityListeners)
        t(r, e);
    }
  }
  /** @internal */
  dispose() {
    this._disposed || (this._disposed = !0, this._propsListeners.clear(), this._contentListeners.clear(), this._hostVisibilityListeners.clear());
  }
  _subscribeProps(r, e) {
    if (this._disposed || e?.signal?.aborted)
      return () => {
      };
    this._propsListeners.add(r), e?.immediate && r(this._props, this._errors);
    const t = () => {
      this._propsListeners.delete(r), e?.signal?.removeEventListener("abort", t);
    };
    return e?.signal?.addEventListener("abort", t, { once: !0 }), t;
  }
  _subscribeContent(r, e) {
    if (this._disposed || e?.signal?.aborted)
      return () => {
      };
    this._contentListeners.add(r), e?.immediate && r(this._content);
    const t = () => {
      this._contentListeners.delete(r), e?.signal?.removeEventListener("abort", t);
    };
    return e?.signal?.addEventListener("abort", t, { once: !0 }), t;
  }
  _subscribeHostVisibility(r, e) {
    if (this._disposed || e?.signal?.aborted)
      return () => {
      };
    this._hostVisibilityListeners.add(r), e?.immediate && r(this._hostVisibility, this._hostVisibility);
    const t = () => {
      this._hostVisibilityListeners.delete(r), e?.signal?.removeEventListener("abort", t);
    };
    return e?.signal?.addEventListener("abort", t, { once: !0 }), t;
  }
}, R, Vr = class extends HTMLElement {
  constructor() {
    super(), u(this, "_internals"), u(this, "_contentObserver", null), u(this, "_initialized", !1), u(this, "_container", null), fr(this, R, null), u(this, "_attachment", 0), u(this, "_reactive", null), u(this, "_lastProps", null), u(this, "_lastErrors", []), u(this, "_lastContent", null), u(this, "_themeUnsub", null), u(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = z(this);
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
    const r = this.wippyConfig, e = Object.keys(r.propsSchema.properties), t = r.extraObservedAttributes ?? [];
    return [.../* @__PURE__ */ new Set([...e, ...t, L])];
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
    return W(this);
  }
  /**
   * Emit a CustomEvent that bubbles and crosses shadow DOM boundaries.
   */
  emitEvent(r, e) {
    this.dispatchEvent(new CustomEvent(r, {
      bubbles: !0,
      composed: !0,
      detail: e
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
      const r = this.constructor.wippyConfig, e = !!r.contentTemplate;
      let t, o;
      if (this._lastProps !== null)
        t = this._lastProps, o = this._lastErrors;
      else {
        const i = T(this, r.propsSchema);
        r.validateProps && i.errors.push(...r.validateProps(i.props)), t = i.props, o = i.errors, this._lastProps = t, this._lastErrors = o;
      }
      const a = e ? this._lastContent ?? this._extractContent(r.contentTemplate) : null;
      e && this._lastContent === null && (this._lastContent = a), this._reactive = new Er(
        { props: t, errors: o, content: a, hasContent: e, hostVisibility: this._hostVisible },
        this.emitEvent.bind(this)
      );
    }
    return this._reactive;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    const r = ++this._attachment;
    this._internals.states.add("loading");
    try {
      const e = this.constructor.wippyConfig, t = this._initialized, o = mr(this, R) ?? vr(this, R, this.shadowRoot ?? this.attachShadow({ mode: e.shadowMode ?? "open" }));
      let a;
      if (this._container)
        a = this._container;
      else {
        if (this.onInit(o), r !== this._attachment)
          return;
        e.inlineCss && xr(o, e.inlineCss);
        try {
          const v = O?.theming, n = br(
            v?.global?.cssVariables,
            v?.children?.cssVariables
          );
          _r(o, n);
        } catch {
        }
        if (e.customCss !== !1)
          try {
            const v = O?.theming, n = [v?.global?.customCSS, v?.children?.customCSS].filter(Boolean).join(`
`);
            n && Cr(o, n);
          } catch {
          }
        (e.hostCssKeys === void 0 || e.hostCssKeys.length > 0) && wr(o, e.hostCssKeys), a = document.createElement("div"), a.setAttribute("data-wippy-theme-root", "");
        const l = e.containerClasses ?? [];
        l.length > 0 && a.classList.add(...l), o.appendChild(a), this._container = a, tr(er);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = or("@theme", (l) => this._applyTheme(l)));
      const { props: i, errors: c } = T(this, e.propsSchema);
      e.validateProps && c.push(...e.validateProps(i));
      const s = i;
      this._lastProps = s, this._lastErrors = c;
      let p = null;
      if (e.contentTemplate && (p = this._extractContent(e.contentTemplate), this._lastContent = p, this._contentObserver = new MutationObserver(() => {
        const l = this._extractContent(e.contentTemplate);
        this._lastContent = l, this._reactive?.notifyContent(l), this.onContentChanged(l);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(o, a, s, c, p, t), r !== this._attachment)
        return;
      this._internals.states.delete("loading"), this._internals.states.add("ready"), t || (this._initialized = !0), this.onReady(), r === this._attachment && this.emitEvent("load");
    } catch (e) {
      if (r !== this._attachment || (this.onError(e), r !== this._attachment))
        return;
      this._internals.states.delete("loading"), this._internals.states.add("error"), this.emitEvent("error", {
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
  _applyTheme(r = ar.getThemeMode?.()) {
    V(r, this), this._container && V(r, this._container);
  }
  disconnectedCallback() {
    const r = ++this._attachment;
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), V("auto", this), this._container && V("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), r === this._attachment && (this.emitEvent("unload"), r === this._attachment && (this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus));
  }
  attributeChangedCallback(r, e, t) {
    if (e === t)
      return;
    if (r === L) {
      const s = this._hostVisible, p = z(this);
      if (p === s)
        return;
      this._hostVisible = p, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(p, s), this.onHostVisibilityChanged(p, s));
      return;
    }
    const o = this.constructor.wippyConfig, { props: a, errors: i } = T(this, o.propsSchema);
    o.validateProps && i.push(...o.validateProps(a));
    const c = a;
    this._lastProps = c, this._lastErrors = i, this._reactive?.notifyProps(c, i), this.onPropsChanged(c, i);
  }
  // ── Hooks ──────────────────────────────────────────────────
  /** Called right after shadow DOM is attached, before CSS or container. */
  onInit(r) {
  }
  /** Called after internals state is set to ready, before the `load` event. */
  onReady() {
  }
  /** Called when connectedCallback throws. Default logs to console. */
  onError(r) {
    console.error(`${this.constructor.name} initialization failed:`, r);
  }
  /** Called when observed attributes change. Override to update framework state. */
  onPropsChanged(r, e) {
  }
  /**
   * Called when the host changes logical activity. `null` means unmanaged.
   * This does not imply a DOM remount or a CSS/viewport visibility change.
   */
  onHostVisibilityChanged(r, e) {
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
  _extractContent(r) {
    const e = this.querySelector(`template[data-type="${r}"]`);
    return e ? e.content.textContent?.trim() || e.textContent?.trim() || "" : null;
  }
  /** Called when child `<template>` content changes. Override to update framework state. */
  onContentChanged(r) {
  }
};
R = /* @__PURE__ */ new WeakMap();
function Pr(r) {
  return r.__wippyHostBus ?? null;
}
function Rr(r) {
  return r.dataset.wippyPanelId ?? null;
}
var Ar = Object.defineProperty, Tr = (r, e, t) => e in r ? Ar(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, g = (r, e, t) => Tr(r, typeof e != "symbol" ? e + "" : e, t);
function N(r, e, t) {
  const o = r.createElement("div"), a = t ? e.failed : e.loading;
  o.dataset.lazyState = t ? "failed" : "loading", o.setAttribute("role", t ? "alert" : "status"), o.setAttribute("aria-label", a), o.style.cssText = "display:grid;place-items:center;text-align:center;";
  const i = e.surface === "page";
  if (o.style.cssText += i ? "block-size:100%;min-block-size:0;" : "min-block-size:2rem;font-size:.875rem;", t)
    o.style.color = "var(--p-danger-500, currentColor)", o.textContent = !i && e.iconOnly ? "⚠" : a, !i && e.iconOnly && (o.title = a);
  else {
    const c = r.createElement("style");
    c.textContent = '@media (prefers-reduced-motion: no-preference) { [data-lazy-state="loading"] > [data-wippy-spinner] { animation: wippy-lazy-spin 1s linear infinite; } } @keyframes wippy-lazy-spin { to { transform: rotate(1turn); } }';
    const s = r.createElement("span");
    s.dataset.wippySpinner = "", s.setAttribute("aria-hidden", "true"), s.style.cssText = "display:block;box-sizing:border-box;inline-size:1em;block-size:1em;border:2px solid var(--p-surface-300, currentColor);border-top-color:var(--p-primary-color, currentColor);border-radius:50%;", s.style.fontSize = i ? "2rem" : "1em", o.append(c, s);
  }
  return o;
}
var Lr = /* @__PURE__ */ Symbol("wippy:emit"), F = /* @__PURE__ */ Symbol("wippy:props"), Ir = /* @__PURE__ */ Symbol("wippy:props_error"), j = /* @__PURE__ */ Symbol("wippy:content"), Or = /* @__PURE__ */ Symbol("wippy:panel-id"), zr = /* @__PURE__ */ Symbol("wippy:layout-bus"), Hr = /* @__PURE__ */ Symbol("wippy:host"), Nr = /* @__PURE__ */ Symbol("wippy:host-visibility");
function Ur() {
  const r = D(F);
  if (!r)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return r;
}
function Dr() {
  const r = D(j);
  if (!r)
    throw new Error("useContent() must be called inside a WippyVueElement with contentTemplate configured");
  return r;
}
var P = /* @__PURE__ */ new WeakMap();
function U(r, e) {
  const t = P.get(r);
  if (t)
    return t;
  const o = Promise.resolve().then(e);
  return P.set(r, o), o.catch(() => {
    P.get(r) === o && P.delete(r);
  }), o;
}
var Mr = class extends Vr {
  constructor() {
    super(...arguments), g(this, "_vueApp", null), g(this, "_mountingApp", !1), g(this, "_mountState", "idle"), g(this, "_feedback", null), g(this, "_propsRef", C({})), g(this, "_errorsRef", C([])), g(this, "_contentRef", C(null)), g(this, "_hostVisibilityRef", C(null)), g(this, "_bridgeAbort", null);
  }
  /**
   * Override to provide Vue-specific configuration.
   */
  static get vueConfig() {
    throw new Error("WippyVueElement subclass must override static get vueConfig()");
  }
  /** Prepare the implementation without creating a Vue or Pinia instance. */
  static async preloadImplementation() {
    const r = this.vueConfig;
    r.mountLifecycle && !r.rootComponent && r.lazyConfig && await U(this, r.lazyConfig);
  }
  /** Undefined on configurations that use only the legacy load event. */
  get wippyMountState() {
    return this.constructor.vueConfig.mountLifecycle ? this._mountState : void 0;
  }
  onMount(r, e, t, o, a, i) {
    const c = this.constructor, s = c.vueConfig, p = new AbortController();
    this._bridgeAbort = p;
    const l = () => !p.signal.aborted && this._bridgeAbort === p;
    this._mountState = "mounting", this._propsRef.value = t, this._errorsRef.value = o, this._contentRef.value = a ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const n of o)
      if (this.emitEvent("invalid", { message: n }), !l())
        return;
    this.reactive.props.subscribe((n, m) => {
      this._propsRef.value = n, this._errorsRef.value = [...m];
      for (const h of m)
        this.emitEvent("invalid", { message: h });
    }, { signal: p.signal }), this.reactive.content && this.reactive.content.subscribe((n) => {
      this._contentRef.value = n;
    }, { signal: p.signal }), this.reactive.hostVisibility.subscribe((n) => {
      this._hostVisibilityRef.value = n;
    }, { signal: p.signal });
    const v = (n) => {
      if (!l())
        return;
      const m = cr(), h = K(n.rootComponent);
      let y = !1, b = !1, _, w;
      this._mountingApp = !0;
      try {
        const x = pr();
        if (n.piniaPlugins)
          for (const d of n.piniaPlugins)
            x.use(d);
        h.use(x);
        for (const d of n.plugins ?? [])
          h.use(d);
        if (h.provide(F, this._propsRef), h.provide(Ir, this._errorsRef), h.provide(Lr, this.emitEvent.bind(this)), h.provide(j, this._contentRef), h.provide(Nr, this._hostVisibilityRef), h.provide(Or, Rr(this)), h.provide(zr, Pr(this)), h.provide(Hr, W(this)), n.providers?.(h, this), !l())
          return;
        if (w = h.config.errorHandler, s.mountLifecycle && (h.config.errorHandler = (d, I, f) => {
          b || (_ = d), b = !0, w?.(d, I, f);
        }), h.mount(e), y = !0, b)
          throw _;
        l() && (this._vueApp = h);
      } finally {
        s.mountLifecycle && y && (h.config.errorHandler = w);
        try {
          y && (b || !l()) && h.unmount();
        } finally {
          lr(m), this._mountingApp = !1;
        }
      }
      s.mountLifecycle && queueMicrotask(() => {
        l() && this.isConnected && (this._mountState = "mounted", this.dispatchEvent(new Event("wippy-mounted")));
      });
    };
    if (s.rootComponent) {
      if (this._mountingApp && s.mountLifecycle) {
        queueMicrotask(() => {
          try {
            v(s);
          } catch (n) {
            l() && (this._mountState = "failed", this.emitEvent("error", { message: n instanceof Error ? n.message : String(n), error: n }));
          }
        });
        return;
      }
      try {
        v(s);
      } catch (n) {
        if (l())
          throw this._mountState = "failed", n;
      }
    } else if (s.lazyConfig) {
      const n = e.ownerDocument, m = s.lazyUi;
      m?.surface === "page" && (e.style.blockSize = "100%", e.style.minBlockSize = "0");
      let h = !1, y, b;
      const _ = () => {
        clearTimeout(y), clearTimeout(b), this._feedback?.remove(), this._feedback = null;
      };
      p.signal.addEventListener("abort", _, { once: !0 });
      const w = () => {
        if (!l() || h)
          return;
        const f = m ? N(n, m, !1) : n.createElement("wippy-loading");
        f.setAttribute("no-bg", ""), this._feedback = f, e.appendChild(f);
      }, x = (f) => {
        if (!l())
          return;
        h = !0, _(), this._mountState = "failed";
        const A = m?.failed ?? (f instanceof Error ? f.message : String(f)), k = m ? N(n, m, !0) : n.createElement("wippy-error");
        m || (k.setAttribute("title", "Failed to load"), k.setAttribute("message", A)), this._feedback = k, e.appendChild(k), this.emitEvent("error", m ? { message: A, error: f } : { message: A });
      }, d = m?.delay ?? (m?.surface === "compact" ? 200 : 0);
      d > 0 ? y = setTimeout(w, d) : w(), m && (b = setTimeout(() => x(new Error("The component did not load in time.")), m.timeout ?? 3e4)), (s.mountLifecycle ? U(c, s.lazyConfig) : s.lazyConfig()).then((f) => {
        !l() || h || (h = !0, _(), v(f));
      }, (f) => {
        h || x(f);
      }).catch(x);
    } else
      throw this._mountState = "failed", new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._mountState = "idle", this._feedback?.remove(), this._feedback = null;
    const r = this._vueApp;
    this._vueApp = null, r?.unmount();
  }
};
const $r = () => Ur(), Br = {
  key: 0,
  class: "mermaid-loading",
  role: "status"
}, Wr = {
  key: 1,
  class: "mermaid-error",
  role: "alert"
}, Fr = ["innerHTML"], jr = /* @__PURE__ */ Y({
  __name: "mermaid-diagram",
  setup(r) {
    const e = $r(), t = Dr(), o = q("rootEl"), a = J(
      () => (e.value.definition || t.value || "").trim()
    ), i = C({ kind: "empty" });
    return G(async (c) => {
      const s = a.value;
      if (!s) {
        i.value = { kind: "empty" };
        return;
      }
      let p = !1;
      c(() => {
        p = !0;
      }), i.value = { kind: "loading" };
      try {
        const { render: l } = await import("./pele-DrWTzQmp.js");
        if (p)
          return;
        const v = o.value ?? document.documentElement, { svg: n } = l(s, {
          fontFamily: getComputedStyle(v).fontFamily,
          idPrefix: `pele-${Math.random().toString(36).slice(2)}`,
          links: !1,
          images: !1
        });
        i.value = { kind: "svg", svg: n };
      } catch (l) {
        if (!p) {
          const v = l instanceof Error ? l.message : String(l);
          i.value = { kind: "error", message: v };
        }
      }
    }), (c, s) => (S(), E("div", {
      ref_key: "rootEl",
      ref: o
    }, [
      i.value.kind === "loading" ? (S(), E("div", Br, " Rendering diagram… ")) : i.value.kind === "error" ? (S(), E("div", Wr, Q(i.value.message), 1)) : i.value.kind === "svg" ? (S(), E("div", {
        key: 2,
        class: X(["mermaid-container", { "mermaid-card": Z(e).transparent === !1 }]),
        role: "img",
        "aria-label": "Mermaid diagram",
        innerHTML: i.value.svg
      }, null, 10, Fr)) : rr("", !0)
    ], 512));
  }
}), Kr = ":root{--p-form-field-padding-x: .75rem;--p-form-field-padding-y: .5rem;--p-form-field-sm-padding-x: .625rem;--p-form-field-sm-padding-y: .375rem;--p-form-field-lg-padding-x: .875rem;--p-form-field-lg-padding-y: .625rem;--p-form-field-border-radius: .375rem;--p-form-field-transition-duration: .2s;--p-form-field-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgba(18, 18, 23, .05);--p-focus-ring-width: 1px;--p-focus-ring-style: solid;--p-focus-ring-color: color-mix(in srgb, var(--p-primary-color) 100%, transparent);--p-focus-ring-offset: 2px;--p-toggleswitch-width: 2.5rem;--p-toggleswitch-height: 1.5rem;--p-toggleswitch-border-radius: 30px;--p-toggleswitch-gap: .25rem;--p-toggleswitch-border-width: 1px;--p-toggleswitch-transition-duration: .2s;--p-toggleswitch-slide-duration: .2s;--p-toggleswitch-handle-size: 1rem;--p-toggleswitch-handle-border-radius: 9999px}:root{color-scheme:light dark;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-secondary: #6f7385;--p-secondary-50: color-mix(in srgb, var(--p-secondary) 5%, white);--p-secondary-100: color-mix(in srgb, var(--p-secondary) 10%, white);--p-secondary-200: color-mix(in srgb, var(--p-secondary) 20%, white);--p-secondary-300: color-mix(in srgb, var(--p-secondary) 35%, white);--p-secondary-400: color-mix(in srgb, var(--p-secondary) 65%, white);--p-secondary-500: var(--p-secondary);--p-secondary-600: color-mix(in srgb, var(--p-secondary) 80%, black);--p-secondary-700: color-mix(in srgb, var(--p-secondary) 65%, black);--p-secondary-800: color-mix(in srgb, var(--p-secondary) 55%, black);--p-secondary-900: color-mix(in srgb, var(--p-secondary) 50%, black);--p-secondary-950: color-mix(in srgb, var(--p-secondary) 30%, black);--p-danger: rgb(239, 68, 68);--p-danger-50: color-mix(in srgb, var(--p-danger) 5%, white);--p-danger-100: color-mix(in srgb, var(--p-danger) 10%, white);--p-danger-200: color-mix(in srgb, var(--p-danger) 20%, white);--p-danger-300: color-mix(in srgb, var(--p-danger) 30%, white);--p-danger-400: color-mix(in srgb, var(--p-danger) 40%, white);--p-danger-500: var(--p-danger);--p-danger-600: color-mix(in srgb, var(--p-danger) 80%, black);--p-danger-700: color-mix(in srgb, var(--p-danger) 70%, black);--p-danger-800: color-mix(in srgb, var(--p-danger) 60%, black);--p-danger-900: color-mix(in srgb, var(--p-danger) 50%, black);--p-danger-950: color-mix(in srgb, var(--p-danger) 40%, black);--p-success: rgb(34, 197, 94);--p-success-50: color-mix(in srgb, var(--p-success) 5%, white);--p-success-100: color-mix(in srgb, var(--p-success) 10%, white);--p-success-200: color-mix(in srgb, var(--p-success) 20%, white);--p-success-300: color-mix(in srgb, var(--p-success) 30%, white);--p-success-400: color-mix(in srgb, var(--p-success) 40%, white);--p-success-500: var(--p-success);--p-success-600: color-mix(in srgb, var(--p-success) 80%, black);--p-success-700: color-mix(in srgb, var(--p-success) 70%, black);--p-success-800: color-mix(in srgb, var(--p-success) 60%, black);--p-success-900: color-mix(in srgb, var(--p-success) 50%, black);--p-success-950: color-mix(in srgb, var(--p-success) 40%, black);--p-warn: rgb(249, 115, 22);--p-warn-50: color-mix(in srgb, var(--p-warn) 5%, white);--p-warn-100: color-mix(in srgb, var(--p-warn) 10%, white);--p-warn-200: color-mix(in srgb, var(--p-warn) 20%, white);--p-warn-300: color-mix(in srgb, var(--p-warn) 30%, white);--p-warn-400: color-mix(in srgb, var(--p-warn) 40%, white);--p-warn-500: var(--p-warn);--p-warn-600: color-mix(in srgb, var(--p-warn) 80%, black);--p-warn-700: color-mix(in srgb, var(--p-warn) 70%, black);--p-warn-800: color-mix(in srgb, var(--p-warn) 60%, black);--p-warn-900: color-mix(in srgb, var(--p-warn) 50%, black);--p-warn-950: color-mix(in srgb, var(--p-warn) 40%, black);--p-info: rgb(14, 165, 233);--p-info-50: color-mix(in srgb, var(--p-info) 5%, white);--p-info-100: color-mix(in srgb, var(--p-info) 10%, white);--p-info-200: color-mix(in srgb, var(--p-info) 20%, white);--p-info-300: color-mix(in srgb, var(--p-info) 30%, white);--p-info-400: color-mix(in srgb, var(--p-info) 40%, white);--p-info-500: var(--p-info);--p-info-600: color-mix(in srgb, var(--p-info) 80%, black);--p-info-700: color-mix(in srgb, var(--p-info) 70%, black);--p-info-800: color-mix(in srgb, var(--p-info) 60%, black);--p-info-900: color-mix(in srgb, var(--p-info) 50%, black);--p-info-950: color-mix(in srgb, var(--p-info) 40%, black);--p-help: rgb(168, 85, 247);--p-help-50: color-mix(in srgb, var(--p-help) 5%, white);--p-help-100: color-mix(in srgb, var(--p-help) 10%, white);--p-help-200: color-mix(in srgb, var(--p-help) 20%, white);--p-help-300: color-mix(in srgb, var(--p-help) 30%, white);--p-help-400: color-mix(in srgb, var(--p-help) 40%, white);--p-help-500: var(--p-help);--p-help-600: color-mix(in srgb, var(--p-help) 80%, black);--p-help-700: color-mix(in srgb, var(--p-help) 70%, black);--p-help-800: color-mix(in srgb, var(--p-help) 60%, black);--p-help-900: color-mix(in srgb, var(--p-help) 50%, black);--p-help-950: color-mix(in srgb, var(--p-help) 40%, black);--p-accent: rgb(20, 184, 166);--p-accent-50: color-mix(in srgb, var(--p-accent) 5%, white);--p-accent-100: color-mix(in srgb, var(--p-accent) 10%, white);--p-accent-200: color-mix(in srgb, var(--p-accent) 20%, white);--p-accent-300: color-mix(in srgb, var(--p-accent) 30%, white);--p-accent-400: color-mix(in srgb, var(--p-accent) 40%, white);--p-accent-500: var(--p-accent);--p-accent-600: color-mix(in srgb, var(--p-accent) 80%, black);--p-accent-700: color-mix(in srgb, var(--p-accent) 70%, black);--p-accent-800: color-mix(in srgb, var(--p-accent) 60%, black);--p-accent-900: color-mix(in srgb, var(--p-accent) 50%, black);--p-accent-950: color-mix(in srgb, var(--p-accent) 40%, black);--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-content-border-radius: 6px;--p-font-heading-family: var(--v-font-family-head, Arial);--p-font-heading-scale: 1;--p-font-heading-line-height: 1.5;--p-font-heading-letter-spacing: normal;--p-font-heading-stretch: normal;--p-font-heading-variation-settings: normal;--p-font-body-scale: 1;--p-font-body-line-height: 1.5;--p-font-body-letter-spacing: normal;--p-font-body-stretch: normal;--p-font-body-variation-settings: normal;--p-font-mono-family: ui-monospace}:root{--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}@media(prefers-color-scheme:dark){:root:not(.w-theme-light){--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}}:root.w-theme-dark,.w-theme-dark{color-scheme:dark;--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}:root.w-theme-light,.w-theme-light{color-scheme:light;--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}.mermaid-container{display:flex;align-items:center;justify-content:center;width:100%;height:100%;box-sizing:border-box;overflow:auto}.mermaid-container svg{max-width:100%;height:auto}.mermaid-container>svg.pele{--pele-bg: var(--p-content-background, #fff);--pele-fg: var(--p-text-color, #1f1f1f);--pele-muted: var(--p-text-muted-color, #6e6e6e);--pele-line: var(--p-surface-400, #8a8a8a);--pele-surface: var(--p-content-background, #f3f3f3);--pele-surface-alt: var(--p-surface-100, #e6e6e6);--pele-border: var(--p-content-border-color, #8a8a8a);--pele-accent: var(--p-primary-500, #5b7bd5)}.mermaid-card>svg.pele{background-color:var(--pele-bg)}.mermaid-error{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:var(--p-danger-500, #ef4444);text-align:center;font-size:14px}", Yr = { props: { type: "object", properties: { definition: { type: "string", default: "", description: "Mermaid diagram source supported by Pele. Use real newlines in the attribute value." }, transparent: { type: "boolean", default: !0, description: "Whether the diagram background is transparent (set false to render on a solid card)" } } } }, qr = {
  wippy: Yr
};
class Jr extends Mr {
  static get wippyConfig() {
    return {
      propsSchema: qr.wippy.props,
      hostCssKeys: ["themeConfigUrl"],
      inlineCss: Kr,
      contentTemplate: "text/vnd.mermaid"
    };
  }
  static get vueConfig() {
    return {
      rootComponent: jr
    };
  }
}
nr(import.meta.url, Jr);
