import { ref as O, createApp as ne, inject as Y, defineComponent as oe, computed as U, onMounted as ae, watch as le, onUnmounted as ce, openBlock as k, createElementBlock as N, toDisplayString as ue, createCommentVNode as H, createElementVNode as pe, unref as de } from "vue";
import { addCollection as he } from "@iconify/vue";
import { config as B, addIcons as fe, on as D, applyThemeMode as L, host as G, hostCss as me, loadCss as be, define as ye } from "@wippy-fe/proxy";
import { getActivePinia as _e, createPinia as ge, setActivePinia as ve } from "pinia";
var $ = "data-wippy-visible";
function F(e) {
  const t = e.getAttribute($);
  return t === "true" ? !0 : t === "false" ? !1 : null;
}
var Ce = Object.defineProperty, K = (e) => {
  throw TypeError(e);
}, we = (e, t, i) => t in e ? Ce(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, f = (e, t, i) => we(e, typeof t != "symbol" ? t + "" : t, i), Q = (e, t, i) => t.has(e) || K("Cannot " + i), Se = (e, t, i) => (Q(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Ee = (e, t, i) => t.has(e) ? K("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), xe = (e, t, i, r) => (Q(e, t, "write to private field"), t.set(e, i), i), Ae = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], Oe = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function W(e) {
  const t = e.startsWith("--") ? e : `--${e}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(t) ? t : null;
}
function Pe(...e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e)
    if (i)
      for (const [r, s] of Object.entries(i)) {
        if ((r === "@light" || r === "@dark") && s && typeof s == "object") {
          for (const [o, a] of Object.entries(s)) {
            const l = typeof a == "string" ? W(o) : null;
            l && t.add(l);
          }
          continue;
        }
        const n = typeof s == "string" ? W(r) : null;
        n && t.add(n);
      }
  return [...t].sort();
}
function Ve(e) {
  if (e.length === 0)
    return "";
  const t = e.map((i) => `  ${i}: inherit;`).join(`
`);
  return `${Oe} {
${t}
}`;
}
function ze(e, t) {
  const i = Ve(t);
  i && X(e, i, "@wippy-fe/css-variables-bridge");
}
function Le(e, t) {
  const r = (t ?? Ae).map(async (s) => {
    const n = me[s];
    if (!n)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${s}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await be(n);
    } catch (o) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${s}" (${n}):`, o), null;
    }
  });
  return Promise.all(r).then((s) => {
    for (const n of s) {
      if (!n)
        continue;
      const o = document.createElement("style");
      o.textContent = n, o.setAttribute("role", "@wippy-fe/host-css"), e.appendChild(o);
    }
  });
}
function Te(e, t) {
  const i = document.createElement("style");
  i.textContent = t, e.appendChild(i);
}
function X(e, t, i) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const s = new CSSStyleSheet();
    s.replaceSync(t), e.adoptedStyleSheets = [...e.adoptedStyleSheets, s];
    return;
  }
  const r = document.createElement("style");
  r.setAttribute("role", i), r.textContent = t, e.appendChild(r);
}
function Ie(e, t) {
  X(e, t, "@wippy-fe/custom-css");
}
function Z(e) {
  return e.__wippyHost ?? null;
}
function Re(e) {
  return e.replace(/-([a-z])/g, (t, i) => i.toUpperCase());
}
function ke(e, t, i) {
  switch (i.type) {
    case "string":
      return { value: t };
    case "number": {
      const r = Number.parseFloat(t);
      return Number.isNaN(r) ? { value: void 0, error: `Invalid ${e}: expected a number` } : { value: r };
    }
    case "integer": {
      const r = Number.parseInt(t, 10);
      return Number.isNaN(r) ? { value: void 0, error: `Invalid ${e}: expected an integer` } : { value: r };
    }
    case "boolean":
      return { value: t !== "false" };
    case "array":
    case "object":
      try {
        const r = JSON.parse(t);
        return i.type === "array" && !Array.isArray(r) ? { value: void 0, error: `Invalid ${e}: expected a JSON array` } : { value: r };
      } catch {
        return { value: void 0, error: `Invalid ${e}: must be valid JSON` };
      }
    default:
      return { value: t };
  }
}
function M(e, t) {
  const i = {}, r = [];
  for (const [s, n] of Object.entries(t.properties)) {
    const o = e.getAttribute(s), a = Re(s);
    if (o === null) {
      n.default !== void 0 && (i[a] = n.default);
      continue;
    }
    const l = ke(s, o, n);
    l.error ? r.push(l.error) : i[a] = l.value;
  }
  return { props: i, errors: r };
}
var Ne = class {
  constructor(e, t) {
    f(this, "_props"), f(this, "_errors"), f(this, "_content"), f(this, "_hostVisibility"), f(this, "_propsListeners", /* @__PURE__ */ new Set()), f(this, "_contentListeners", /* @__PURE__ */ new Set()), f(this, "_hostVisibilityListeners", /* @__PURE__ */ new Set()), f(this, "_disposed", !1), f(this, "_emitToDom"), f(this, "props"), f(this, "events"), f(this, "content"), f(this, "hostVisibility"), this._props = e.props, this._errors = e.errors, this._content = e.content, this._hostVisibility = e.hostVisibility, this._emitToDom = t;
    const i = this;
    this.props = {
      get value() {
        return i._props;
      },
      get errors() {
        return i._errors;
      },
      subscribe(r, s) {
        return i._subscribeProps(r, s);
      }
    }, this.events = {
      emit(r, s) {
        i._disposed || i._emitToDom(r, s);
      }
    }, this.content = e.hasContent ? {
      get value() {
        return i._content;
      },
      subscribe(r, s) {
        return i._subscribeContent(r, s);
      }
    } : null, this.hostVisibility = {
      get value() {
        return i._hostVisibility;
      },
      subscribe(r, s) {
        return i._subscribeHostVisibility(r, s);
      }
    };
  }
  /** @internal */
  notifyProps(e, t) {
    if (!this._disposed) {
      this._props = e, this._errors = t;
      for (const i of this._propsListeners)
        i(e, t);
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
      for (const i of this._hostVisibilityListeners)
        i(e, t);
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
    const i = () => {
      this._propsListeners.delete(e), t?.signal?.removeEventListener("abort", i);
    };
    return t?.signal?.addEventListener("abort", i, { once: !0 }), i;
  }
  _subscribeContent(e, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._contentListeners.add(e), t?.immediate && e(this._content);
    const i = () => {
      this._contentListeners.delete(e), t?.signal?.removeEventListener("abort", i);
    };
    return t?.signal?.addEventListener("abort", i, { once: !0 }), i;
  }
  _subscribeHostVisibility(e, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._hostVisibilityListeners.add(e), t?.immediate && e(this._hostVisibility, this._hostVisibility);
    const i = () => {
      this._hostVisibilityListeners.delete(e), t?.signal?.removeEventListener("abort", i);
    };
    return t?.signal?.addEventListener("abort", i, { once: !0 }), i;
  }
}, I, Me = class extends HTMLElement {
  constructor() {
    super(), f(this, "_internals"), f(this, "_contentObserver", null), f(this, "_initialized", !1), f(this, "_container", null), Ee(this, I, null), f(this, "_attachment", 0), f(this, "_reactive", null), f(this, "_lastProps", null), f(this, "_lastErrors", []), f(this, "_lastContent", null), f(this, "_themeUnsub", null), f(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = F(this);
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
    const e = this.wippyConfig, t = Object.keys(e.propsSchema.properties), i = e.extraObservedAttributes ?? [];
    return [.../* @__PURE__ */ new Set([...t, ...i, $])];
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
    return Z(this);
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
      let i, r;
      if (this._lastProps !== null)
        i = this._lastProps, r = this._lastErrors;
      else {
        const n = M(this, e.propsSchema);
        e.validateProps && n.errors.push(...e.validateProps(n.props)), i = n.props, r = n.errors, this._lastProps = i, this._lastErrors = r;
      }
      const s = t ? this._lastContent ?? this._extractContent(e.contentTemplate) : null;
      t && this._lastContent === null && (this._lastContent = s), this._reactive = new Ne(
        { props: i, errors: r, content: s, hasContent: t, hostVisibility: this._hostVisible },
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
      const t = this.constructor.wippyConfig, i = this._initialized, r = Se(this, I) ?? xe(this, I, this.shadowRoot ?? this.attachShadow({ mode: t.shadowMode ?? "open" }));
      let s;
      if (this._container)
        s = this._container;
      else {
        if (this.onInit(r), e !== this._attachment)
          return;
        t.inlineCss && Te(r, t.inlineCss);
        try {
          const b = B?.theming, c = Pe(
            b?.global?.cssVariables,
            b?.children?.cssVariables
          );
          ze(r, c);
        } catch {
        }
        if (t.customCss !== !1)
          try {
            const b = B?.theming, c = [b?.global?.customCSS, b?.children?.customCSS].filter(Boolean).join(`
`);
            c && Ie(r, c);
          } catch {
          }
        (t.hostCssKeys === void 0 || t.hostCssKeys.length > 0) && Le(r, t.hostCssKeys), s = document.createElement("div"), s.setAttribute("data-wippy-theme-root", "");
        const p = t.containerClasses ?? [];
        p.length > 0 && s.classList.add(...p), r.appendChild(s), this._container = s, fe(he);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = D("@theme", (p) => this._applyTheme(p)));
      const { props: n, errors: o } = M(this, t.propsSchema);
      t.validateProps && o.push(...t.validateProps(n));
      const a = n;
      this._lastProps = a, this._lastErrors = o;
      let l = null;
      if (t.contentTemplate && (l = this._extractContent(t.contentTemplate), this._lastContent = l, this._contentObserver = new MutationObserver(() => {
        const p = this._extractContent(t.contentTemplate);
        this._lastContent = p, this._reactive?.notifyContent(p), this.onContentChanged(p);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(r, s, a, o, l, i), e !== this._attachment)
        return;
      this._internals.states.delete("loading"), this._internals.states.add("ready"), i || (this._initialized = !0), this.onReady(), e === this._attachment && this.emitEvent("load");
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
  _applyTheme(e = G.getThemeMode?.()) {
    L(e, this), this._container && L(e, this._container);
  }
  disconnectedCallback() {
    const e = ++this._attachment;
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), L("auto", this), this._container && L("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), e === this._attachment && (this.emitEvent("unload"), e === this._attachment && (this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus));
  }
  attributeChangedCallback(e, t, i) {
    if (t === i)
      return;
    if (e === $) {
      const a = this._hostVisible, l = F(this);
      if (l === a)
        return;
      this._hostVisible = l, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(l, a), this.onHostVisibilityChanged(l, a));
      return;
    }
    const r = this.constructor.wippyConfig, { props: s, errors: n } = M(this, r.propsSchema);
    r.validateProps && n.push(...r.validateProps(s));
    const o = s;
    this._lastProps = o, this._lastErrors = n, this._reactive?.notifyProps(o, n), this.onPropsChanged(o, n);
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
I = /* @__PURE__ */ new WeakMap();
function De(e) {
  return e.__wippyHostBus ?? null;
}
function $e(e) {
  return e.dataset.wippyPanelId ?? null;
}
var Ue = Object.defineProperty, He = (e, t, i) => t in e ? Ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, A = (e, t, i) => He(e, typeof t != "symbol" ? t + "" : t, i);
function j(e, t, i) {
  const r = e.createElement("div"), s = i ? t.failed : t.loading;
  r.dataset.lazyState = i ? "failed" : "loading", r.setAttribute("role", i ? "alert" : "status"), r.setAttribute("aria-label", s), r.style.cssText = "display:grid;place-items:center;text-align:center;";
  const n = t.surface === "page";
  if (r.style.cssText += n ? "block-size:100%;min-block-size:0;" : "min-block-size:2rem;font-size:.875rem;", i)
    r.style.color = "var(--p-danger-500, currentColor)", r.textContent = !n && t.iconOnly ? "⚠" : s, !n && t.iconOnly && (r.title = s);
  else {
    const o = e.createElement("style");
    o.textContent = '@media (prefers-reduced-motion: no-preference) { [data-lazy-state="loading"] > [data-wippy-spinner] { animation: wippy-lazy-spin 1s linear infinite; } } @keyframes wippy-lazy-spin { to { transform: rotate(1turn); } }';
    const a = e.createElement("span");
    a.dataset.wippySpinner = "", a.setAttribute("aria-hidden", "true"), a.style.cssText = "display:block;box-sizing:border-box;inline-size:1em;block-size:1em;border:2px solid var(--p-surface-300, currentColor);border-top-color:var(--p-primary-color, currentColor);border-radius:50%;", a.style.fontSize = n ? "2rem" : "1em", r.append(o, a);
  }
  return r;
}
var ee = /* @__PURE__ */ Symbol("wippy:emit"), te = /* @__PURE__ */ Symbol("wippy:props"), Be = /* @__PURE__ */ Symbol("wippy:props_error"), Fe = /* @__PURE__ */ Symbol("wippy:content"), We = /* @__PURE__ */ Symbol("wippy:panel-id"), je = /* @__PURE__ */ Symbol("wippy:layout-bus"), Je = /* @__PURE__ */ Symbol("wippy:host"), qe = /* @__PURE__ */ Symbol("wippy:host-visibility");
function Ye() {
  const e = Y(te);
  if (!e)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return e;
}
function Ge() {
  const e = Y(ee);
  if (!e)
    throw new Error("useEvents() must be called inside a WippyVueElement");
  return e;
}
var T = /* @__PURE__ */ new WeakMap();
function J(e, t) {
  const i = T.get(e);
  if (i)
    return i;
  const r = Promise.resolve().then(t);
  return T.set(e, r), r.catch(() => {
    T.get(e) === r && T.delete(e);
  }), r;
}
var Ke = class extends Me {
  constructor() {
    super(...arguments), A(this, "_vueApp", null), A(this, "_mountingApp", !1), A(this, "_mountState", "idle"), A(this, "_feedback", null), A(this, "_propsRef", O({})), A(this, "_errorsRef", O([])), A(this, "_contentRef", O(null)), A(this, "_hostVisibilityRef", O(null)), A(this, "_bridgeAbort", null);
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
    e.mountLifecycle && !e.rootComponent && e.lazyConfig && await J(this, e.lazyConfig);
  }
  /** Undefined on configurations that use only the legacy load event. */
  get wippyMountState() {
    return this.constructor.vueConfig.mountLifecycle ? this._mountState : void 0;
  }
  onMount(e, t, i, r, s, n) {
    const o = this.constructor, a = o.vueConfig, l = new AbortController();
    this._bridgeAbort = l;
    const p = () => !l.signal.aborted && this._bridgeAbort === l;
    this._mountState = "mounting", this._propsRef.value = i, this._errorsRef.value = r, this._contentRef.value = s ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const c of r)
      if (this.emitEvent("invalid", { message: c }), !p())
        return;
    this.reactive.props.subscribe((c, h) => {
      this._propsRef.value = c, this._errorsRef.value = [...h];
      for (const u of h)
        this.emitEvent("invalid", { message: u });
    }, { signal: l.signal }), this.reactive.content && this.reactive.content.subscribe((c) => {
      this._contentRef.value = c;
    }, { signal: l.signal }), this.reactive.hostVisibility.subscribe((c) => {
      this._hostVisibilityRef.value = c;
    }, { signal: l.signal });
    const b = (c) => {
      if (!p())
        return;
      const h = _e(), u = ne(c.rootComponent);
      let v = !1, C = !1, d, _;
      this._mountingApp = !0;
      try {
        const S = ge();
        if (c.piniaPlugins)
          for (const g of c.piniaPlugins)
            S.use(g);
        u.use(S);
        for (const g of c.plugins ?? [])
          u.use(g);
        if (u.provide(te, this._propsRef), u.provide(Be, this._errorsRef), u.provide(ee, this.emitEvent.bind(this)), u.provide(Fe, this._contentRef), u.provide(qe, this._hostVisibilityRef), u.provide(We, $e(this)), u.provide(je, De(this)), u.provide(Je, Z(this)), c.providers?.(u, this), !p())
          return;
        if (_ = u.config.errorHandler, a.mountLifecycle && (u.config.errorHandler = (g, E, m) => {
          C || (d = g), C = !0, _?.(g, E, m);
        }), u.mount(t), v = !0, C)
          throw d;
        p() && (this._vueApp = u);
      } finally {
        a.mountLifecycle && v && (u.config.errorHandler = _);
        try {
          v && (C || !p()) && u.unmount();
        } finally {
          ve(h), this._mountingApp = !1;
        }
      }
      a.mountLifecycle && queueMicrotask(() => {
        p() && this.isConnected && (this._mountState = "mounted", this.dispatchEvent(new Event("wippy-mounted")));
      });
    };
    if (a.rootComponent) {
      if (this._mountingApp && a.mountLifecycle) {
        queueMicrotask(() => {
          try {
            b(a);
          } catch (c) {
            p() && (this._mountState = "failed", this.emitEvent("error", { message: c instanceof Error ? c.message : String(c), error: c }));
          }
        });
        return;
      }
      try {
        b(a);
      } catch (c) {
        if (p())
          throw this._mountState = "failed", c;
      }
    } else if (a.lazyConfig) {
      const c = t.ownerDocument, h = a.lazyUi;
      h?.surface === "page" && (t.style.blockSize = "100%", t.style.minBlockSize = "0");
      let u = !1, v, C;
      const d = () => {
        clearTimeout(v), clearTimeout(C), this._feedback?.remove(), this._feedback = null;
      };
      l.signal.addEventListener("abort", d, { once: !0 });
      const _ = () => {
        if (!p() || u)
          return;
        const m = h ? j(c, h, !1) : c.createElement("wippy-loading");
        m.setAttribute("no-bg", ""), this._feedback = m, t.appendChild(m);
      }, S = (m) => {
        if (!p())
          return;
        u = !0, d(), this._mountState = "failed";
        const x = h?.failed ?? (m instanceof Error ? m.message : String(m)), y = h ? j(c, h, !0) : c.createElement("wippy-error");
        h || (y.setAttribute("title", "Failed to load"), y.setAttribute("message", x)), this._feedback = y, t.appendChild(y), this.emitEvent("error", h ? { message: x, error: m } : { message: x });
      }, g = h?.delay ?? (h?.surface === "compact" ? 200 : 0);
      g > 0 ? v = setTimeout(_, g) : _(), h && (C = setTimeout(() => S(new Error("The component did not load in time.")), h.timeout ?? 3e4)), (a.mountLifecycle ? J(o, a.lazyConfig) : a.lazyConfig()).then((m) => {
        !p() || u || (u = !0, d(), b(m));
      }, (m) => {
        u || S(m);
      }).catch(S);
    } else
      throw this._mountState = "failed", new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._mountState = "idle", this._feedback?.remove(), this._feedback = null;
    const e = this._vueApp;
    this._vueApp = null, e?.unmount();
  }
};
const Qe = () => Ye(), Xe = () => Ge();
let q;
function Ze() {
  return q ??= import("./echarts-CycbxEBO.js").catch((e) => {
    throw q = void 0, e;
  });
}
function et(e) {
  if (e.componentType !== "series" || !Number.isInteger(e.seriesIndex) || !Number.isInteger(e.dataIndex) || (e.seriesIndex ?? -1) < 0 || (e.dataIndex ?? -1) < 0)
    return null;
  const t = e.data, i = t !== null && typeof t == "object" && !Array.isArray(t) ? t : void 0, r = i?.value ?? e.value ?? t, s = e.encode?.x?.[0], n = s === void 0 ? void 0 : e.dimensionNames?.[s], a = i?.x ?? (Array.isArray(r) && (s !== void 0 || !e.name) ? r[s ?? 0] : void 0) ?? (n ? i?.[n] : void 0) ?? e.name;
  return {
    label: a == null ? "" : String(a),
    datasetLabel: e.seriesName ?? "",
    datasetIndex: e.seriesIndex,
    dataIndex: e.dataIndex,
    value: t
  };
}
function R(e) {
  return e !== null && typeof e == "object" ? e : {};
}
function tt(e) {
  const t = R(R(e).selected);
  return { selected: Object.fromEntries(Object.entries(t).filter((i) => typeof i[1] == "boolean")) };
}
function it(e) {
  const t = R(e), i = Array.isArray(t.batch) ? R(t.batch[0]) : t;
  return { start: typeof i.start == "number" ? i.start : null, end: typeof i.end == "number" ? i.end : null };
}
function P(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function rt(e, t) {
  if (e.trim())
    return e.trim();
  const { option: i } = ie(t), r = i?.title ?? (P(i?.baseOption) ? i.baseOption.title : void 0);
  for (const s of Array.isArray(r) ? r : [r])
    if (P(s) && typeof s.text == "string" && s.text.trim())
      return s.text.trim();
  return "Chart";
}
function st(e) {
  if (typeof e != "string")
    return !1;
  try {
    return ["http:", "https:", "mailto:"].includes(new URL(e, "https://wippy.invalid/").protocol);
  } catch {
    return !1;
  }
}
function nt(e) {
  function t(i, r = "") {
    if (Array.isArray(i))
      return i.map((o) => t(o, r));
    if (!P(i))
      return i;
    const s = Object.entries(i).flatMap(([o, a]) => (o === "link" || o === "sublink") && !st(a) ? (console.warn(`[wippy-echarts] Ignored unsafe ${o} URL.`), [[o, null]]) : [[o, t(a, o)]]), n = Object.fromEntries(s);
    return r === "tooltip" ? { ...n, renderMode: "richText" } : n;
  }
  return t(e);
}
function ie(e = "") {
  try {
    const t = e.trim() ? JSON.parse(e) : {};
    if (!P(t))
      throw new Error("Expected an ECharts option object");
    return { option: t, error: null };
  } catch (t) {
    return { option: null, error: `Invalid options JSON: ${t.message}` };
  }
}
function re(e) {
  if (P(e.baseOption))
    return { ...e, baseOption: re(e.baseOption) };
  const t = (i) => {
    const r = P(i) ? i : {}, { appendTo: s, appendToBody: n, ...o } = r;
    return { confine: !0, ...o };
  };
  return {
    ...e,
    tooltip: Array.isArray(e.tooltip) ? e.tooltip.map(t) : t(e.tooltip),
    aria: { enabled: !0, ...P(e.aria) ? e.aria : {} }
  };
}
function ot(e, t, i, r = () => {
}) {
  let s, n, o = !1, a = 0, l = "", p = "", b, c, h = !1, u = !1;
  function v() {
    u = !1, s?.dispose(), s = void 0;
  }
  function C(d) {
    a++, h = !1, r(!1), v();
    const _ = d instanceof Error ? d.message : String(d);
    i(_), t("chart-error", { message: _ });
  }
  return {
    async render(d, _, S) {
      const g = ++a;
      if (o) return;
      h = !0;
      const E = ie(d.options);
      if (!E.option) {
        C(new Error(E.error));
        return;
      }
      i(null), s || r(!0);
      try {
        if (!e.clientWidth || !e.clientHeight || d.lazyInit && !S || (n ??= await Ze(), o || g !== a))
          return;
        const m = JSON.stringify(_);
        s && (l !== d.renderer || p !== m) && v();
        let x = !1;
        if (!s) {
          s = n.init(e, _, { renderer: d.renderer }), l = d.renderer, p = m, x = !0;
          for (const [y, w] of [
            ["click", "chart-click"],
            ["dblclick", "chart-dblclick"],
            ["mouseover", "chart-hover"]
          ])
            s.on(y, (z) => {
              const V = et(z);
              V && t(w, V);
            });
          s.on("legendselectchanged", (y) => t("legend-change", tt(y))), s.on("datazoom", (y) => t("datazoom", it(y))), s.on("finished", () => {
            u && (u = !1, t("chart-rendered", {}));
          });
        }
        s.group = d.group, d.group && n.connect(d.group), (x || b !== d.options || c !== d.notMerge) && (u = !0, s.setOption(n.withFormatters(nt(re(E.option)), void 0, _), {
          notMerge: d.notMerge,
          lazyUpdate: d.lazyUpdate
        }), b = d.options, c = d.notMerge), r(!1), h = !1;
      } catch (m) {
        !o && g === a && C(m);
      }
    },
    fail: C,
    initialized: () => !!s,
    pending: () => h,
    resize() {
      s?.resize();
    },
    stop() {
      o = !0, a++, h = !1, r(!1), v(), b = void 0, c = void 0;
    }
  };
}
function at(e = "") {
  if (!e.trim())
    return;
  const t = JSON.parse(e);
  if (!Array.isArray(t) || !t.length || !t.every((i) => typeof i == "string" && i.trim()))
    throw new Error("Palette must be a non-empty JSON array of colors");
  return t.map((i) => i.trim());
}
function lt(e) {
  return {
    ...e,
    palette: at(e.palette)
  };
}
const ct = [
  "#2563EB",
  "#0D9488",
  "#7C3AED",
  "#DB2777",
  "#0891B2",
  "#65A30D",
  "#9333EA",
  "#D55E00"
];
function ut(e, t, i = !1) {
  const r = (p, b) => e.getPropertyValue(p).trim() || b, s = r("--p-text-color", e.color), n = r("--p-text-muted-color", s), o = r("--p-content-border-color", n), a = r("--p-content-background", "transparent"), l = {
    nameTextStyle: { color: n },
    axisLabel: { color: n },
    axisLine: { lineStyle: { color: o } },
    axisTick: { lineStyle: { color: o } },
    splitLine: { lineStyle: { color: o } }
  };
  return {
    darkMode: i,
    backgroundColor: "transparent",
    color: t ?? ct.map((p, b) => r(`--wippy-chart-${b + 1}`, p)),
    textStyle: { color: s, fontFamily: e.fontFamily },
    title: { textStyle: { color: s }, subtextStyle: { color: n } },
    tooltip: {
      backgroundColor: a,
      borderColor: o,
      textStyle: { color: s }
    },
    legend: { textStyle: { color: s }, inactiveColor: n },
    categoryAxis: l,
    valueAxis: l,
    timeAxis: l,
    logAxis: l,
    line: { label: { color: s } },
    bar: { label: { color: s } },
    pie: { label: { color: s }, labelLine: { lineStyle: { color: o } } },
    radar: { axisName: { color: n }, axisLine: { lineStyle: { color: o } }, splitLine: { lineStyle: { color: o } } },
    calendar: { itemStyle: { color: a, borderColor: o }, dayLabel: { color: n }, monthLabel: { color: s }, yearLabel: { color: s } }
  };
}
const pt = ["aria-label", "aria-busy"], dt = {
  key: 0,
  class: "echarts-error",
  role: "alert"
}, ht = ["title"], ft = /* @__PURE__ */ oe({
  __name: "echarts-canvas",
  setup(e) {
    const t = Qe(), i = Xe(), r = O(null), s = O(null), n = O(!0), o = U(() => !s.value && (n.value || t.value.loading)), a = U(() => rt(t.value.label, t.value.options));
    let l, p, b, c, h, u, v, C, d, _ = 0, S = !1, g = "auto";
    function E(y = !1) {
      if (!(!l || !r.value))
        try {
          const w = lt(t.value);
          if (!v || y || C !== t.value.palette || d !== w.themeMode) {
            const z = w.themeMode === "auto" ? g : w.themeMode, V = r.value.getRootNode(), se = V instanceof ShadowRoot ? V.host : r.value;
            v = ut(
              getComputedStyle(se),
              w.palette,
              z === "dark" || z === "auto" && !!c?.matches
            ), C = t.value.palette, d = w.themeMode;
          }
          l.render(w, v, S);
        } catch (w) {
          l.fail(w);
        }
    }
    function m() {
      cancelAnimationFrame(_), _ = requestAnimationFrame(() => E(!0));
    }
    function x() {
      t.value.themeMode === "auto" && g === "auto" && m();
    }
    return ae(() => {
      r.value && (l = ot(
        r.value,
        i,
        (y) => s.value = y,
        (y) => n.value = y
      ), g = G.getThemeMode(), c = matchMedia("(prefers-color-scheme: dark)"), c.addEventListener("change", x), h = D("@theme", (y) => {
        g = y, m();
      }), u = D("@config", m), p = new ResizeObserver(() => {
        t.value.autoresize && l?.resize(), (!l?.initialized() || l.pending()) && E();
      }), p.observe(r.value), typeof IntersectionObserver < "u" ? (b = new IntersectionObserver((y) => {
        y.some((w) => w.isIntersecting) && (S = !0, b?.disconnect(), E());
      }, { rootMargin: "200px" }), b.observe(r.value)) : S = !0, E());
    }), le(t, () => E(), { deep: !0, flush: "post" }), ce(() => {
      cancelAnimationFrame(_), p?.disconnect(), b?.disconnect(), c?.removeEventListener("change", x), h?.(), u?.(), l?.stop();
    }), (y, w) => (k(), N("div", {
      class: "echarts-container",
      role: "figure",
      "aria-label": a.value,
      "aria-busy": o.value
    }, [
      s.value ? (k(), N("div", dt, ue(s.value), 1)) : H("", !0),
      pe("div", {
        ref_key: "container",
        ref: r,
        class: "echarts-canvas-wrapper"
      }, null, 512),
      o.value ? (k(), N("wippy-loading", {
        key: 1,
        class: "echarts-loading",
        "no-bg": "",
        title: de(t).loadingText
      }, null, 8, ht)) : H("", !0)
    ], 8, pt));
  }
}), mt = ":host{display:block;width:100%;height:100%;aspect-ratio:2 / 1;box-sizing:border-box}:host>div{width:100%;height:100%}.echarts-container{position:relative;width:100%;height:100%;box-sizing:border-box}.echarts-canvas-wrapper{position:relative;width:100%;height:100%}.echarts-error{position:absolute;inset:0;z-index:1;box-sizing:border-box;overflow:auto;padding:12px 16px;border-radius:6px;background:var(--p-content-background);color:var(--p-danger-color);border:1px solid var(--p-danger-color);font-family:inherit;font-size:13px;line-height:1.4}.echarts-loading{position:absolute;inset:0;z-index:1}", bt = { props: { type: "object", properties: { options: { type: "string", default: "", description: 'Complete desired ECharts option as JSON, including with not-merge=false. Empty means {}. Formatter callbacks accept {$format: spec}: number, number:0..20, compact, percent, integer, date, datetime, month or time:<template>. Colours accept $seriesColor with alpha, $seriesGradient with from/to/direction, or $themeColor with text/muted/border/surface and optional alpha. Example: {"series":[{"type":"line","data":[1,2],"areaStyle":{"color":{"$seriesGradient":{"from":0.35,"to":0}}}}]}. Alpha must be 0 to 1. Colours resolve again on theme or palette changes. Invalid markers warn and use defaults. JSON never executes.' }, "theme-mode": { type: "string", default: "auto", description: "Auto follows the host theme mode; light/dark override ECharts contrast mode locally. Resolved host tokens remain authoritative.", enum: ["auto", "light", "dark"] }, palette: { type: "string", default: "", description: "JSON array of color strings. Overrides --wippy-chart-1..8 and the documented fallback palette. Empty uses CSS colors." }, renderer: { type: "string", default: "canvas", description: "ECharts rendering backend. Changing it disposes and recreates from the current full option, resetting zoom, legend selection and other interaction state.", enum: ["canvas", "svg"] }, autoresize: { type: "boolean", default: !0, description: "Resize with the container using ResizeObserver." }, loading: { type: "boolean", default: !1, description: "Show the platform wippy-loading overlay inside the reserved chart box." }, "loading-text": { type: "string", default: "Loading…", description: "Title of the platform loading overlay, including during the first engine load." }, "not-merge": { type: "boolean", default: !0, description: "Controls how a new full option is applied to the live chart. True replaces (default); false uses native ECharts merge for data animation and retained zoom/legend state unless explicitly overridden. Never enables patch input." }, "lazy-update": { type: "boolean", default: !1, description: "Defer the ECharts option update until the next animation frame." }, group: { type: "string", default: "", description: "ECharts connect group id. Empty disables group membership." }, label: { type: "string", default: "", description: "Accessible figure name. Empty uses the first non-empty option title text, then Chart." }, "lazy-init": { type: "boolean", default: !1, description: "Wait until within 200px of the viewport before loading ECharts and initializing. Falls back to immediate initialization without IntersectionObserver." } } } }, yt = {
  wippy: bt
};
class _t extends Ke {
  static get wippyConfig() {
    return {
      propsSchema: yt.wippy.props,
      hostCssKeys: ["themeConfigUrl"],
      inlineCss: mt
    };
  }
  static get vueConfig() {
    return { rootComponent: ft };
  }
}
ye(import.meta.url, _t);
