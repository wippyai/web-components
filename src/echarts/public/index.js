import { ref as A, createApp as ie, inject as K, defineComponent as re, computed as ne, onMounted as se, watch as oe, onUnmounted as ae, openBlock as U, createElementBlock as F, unref as le, toDisplayString as ce, createCommentVNode as ue, createElementVNode as de } from "vue";
import { addCollection as he } from "@iconify/vue";
import { config as H, addIcons as pe, on as k, applyThemeMode as V, host as Y, hostCss as fe, loadCss as me, define as be } from "@wippy-fe/proxy";
import { getActivePinia as ye, createPinia as ge, setActivePinia as _e } from "pinia";
var N = "data-wippy-visible";
function $(e) {
  const t = e.getAttribute(N);
  return t === "true" ? !0 : t === "false" ? !1 : null;
}
var ve = Object.defineProperty, q = (e) => {
  throw TypeError(e);
}, Ce = (e, t, i) => t in e ? ve(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, m = (e, t, i) => Ce(e, typeof t != "symbol" ? t + "" : t, i), G = (e, t, i) => t.has(e) || q("Cannot " + i), we = (e, t, i) => (G(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Se = (e, t, i) => t.has(e) ? q("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Ee = (e, t, i, r) => (G(e, t, "write to private field"), t.set(e, i), i), xe = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], Ae = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function B(e) {
  const t = e.startsWith("--") ? e : `--${e}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(t) ? t : null;
}
function Oe(...e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e)
    if (i)
      for (const [r, n] of Object.entries(i)) {
        if ((r === "@light" || r === "@dark") && n && typeof n == "object") {
          for (const [s, a] of Object.entries(n)) {
            const u = typeof a == "string" ? B(s) : null;
            u && t.add(u);
          }
          continue;
        }
        const o = typeof n == "string" ? B(r) : null;
        o && t.add(o);
      }
  return [...t].sort();
}
function ze(e) {
  if (e.length === 0)
    return "";
  const t = e.map((i) => `  ${i}: inherit;`).join(`
`);
  return `${Ae} {
${t}
}`;
}
function Pe(e, t) {
  const i = ze(t);
  i && Q(e, i, "@wippy-fe/css-variables-bridge");
}
function Ve(e, t) {
  const r = (t ?? xe).map(async (n) => {
    const o = fe[n];
    if (!o)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${n}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await me(o);
    } catch (s) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${n}" (${o}):`, s), null;
    }
  });
  return Promise.all(r).then((n) => {
    for (const o of n) {
      if (!o)
        continue;
      const s = document.createElement("style");
      s.textContent = o, s.setAttribute("role", "@wippy-fe/host-css"), e.appendChild(s);
    }
  });
}
function Ie(e, t) {
  const i = document.createElement("style");
  i.textContent = t, e.appendChild(i);
}
function Q(e, t, i) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const n = new CSSStyleSheet();
    n.replaceSync(t), e.adoptedStyleSheets = [...e.adoptedStyleSheets, n];
    return;
  }
  const r = document.createElement("style");
  r.setAttribute("role", i), r.textContent = t, e.appendChild(r);
}
function Le(e, t) {
  Q(e, t, "@wippy-fe/custom-css");
}
function X(e) {
  return e.__wippyHost ?? null;
}
function Te(e) {
  return e.replace(/-([a-z])/g, (t, i) => i.toUpperCase());
}
function Re(e, t, i) {
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
function R(e, t) {
  const i = {}, r = [];
  for (const [n, o] of Object.entries(t.properties)) {
    const s = e.getAttribute(n), a = Te(n);
    if (s === null) {
      o.default !== void 0 && (i[a] = o.default);
      continue;
    }
    const u = Re(n, s, o);
    u.error ? r.push(u.error) : i[a] = u.value;
  }
  return { props: i, errors: r };
}
var ke = class {
  constructor(e, t) {
    m(this, "_props"), m(this, "_errors"), m(this, "_content"), m(this, "_hostVisibility"), m(this, "_propsListeners", /* @__PURE__ */ new Set()), m(this, "_contentListeners", /* @__PURE__ */ new Set()), m(this, "_hostVisibilityListeners", /* @__PURE__ */ new Set()), m(this, "_disposed", !1), m(this, "_emitToDom"), m(this, "props"), m(this, "events"), m(this, "content"), m(this, "hostVisibility"), this._props = e.props, this._errors = e.errors, this._content = e.content, this._hostVisibility = e.hostVisibility, this._emitToDom = t;
    const i = this;
    this.props = {
      get value() {
        return i._props;
      },
      get errors() {
        return i._errors;
      },
      subscribe(r, n) {
        return i._subscribeProps(r, n);
      }
    }, this.events = {
      emit(r, n) {
        i._disposed || i._emitToDom(r, n);
      }
    }, this.content = e.hasContent ? {
      get value() {
        return i._content;
      },
      subscribe(r, n) {
        return i._subscribeContent(r, n);
      }
    } : null, this.hostVisibility = {
      get value() {
        return i._hostVisibility;
      },
      subscribe(r, n) {
        return i._subscribeHostVisibility(r, n);
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
}, L, Ne = class extends HTMLElement {
  constructor() {
    super(), m(this, "_internals"), m(this, "_contentObserver", null), m(this, "_initialized", !1), m(this, "_container", null), Se(this, L, null), m(this, "_attachment", 0), m(this, "_reactive", null), m(this, "_lastProps", null), m(this, "_lastErrors", []), m(this, "_lastContent", null), m(this, "_themeUnsub", null), m(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = $(this);
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
    return [.../* @__PURE__ */ new Set([...t, ...i, N])];
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
    return X(this);
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
        const o = R(this, e.propsSchema);
        e.validateProps && o.errors.push(...e.validateProps(o.props)), i = o.props, r = o.errors, this._lastProps = i, this._lastErrors = r;
      }
      const n = t ? this._lastContent ?? this._extractContent(e.contentTemplate) : null;
      t && this._lastContent === null && (this._lastContent = n), this._reactive = new ke(
        { props: i, errors: r, content: n, hasContent: t, hostVisibility: this._hostVisible },
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
      const t = this.constructor.wippyConfig, i = this._initialized, r = we(this, L) ?? Ee(this, L, this.shadowRoot ?? this.attachShadow({ mode: t.shadowMode ?? "open" }));
      let n;
      if (this._container)
        n = this._container;
      else {
        if (this.onInit(r), e !== this._attachment)
          return;
        t.inlineCss && Ie(r, t.inlineCss);
        try {
          const y = H?.theming, l = Oe(
            y?.global?.cssVariables,
            y?.children?.cssVariables
          );
          Pe(r, l);
        } catch {
        }
        if (t.customCss !== !1)
          try {
            const y = H?.theming, l = [y?.global?.customCSS, y?.children?.customCSS].filter(Boolean).join(`
`);
            l && Le(r, l);
          } catch {
          }
        (t.hostCssKeys === void 0 || t.hostCssKeys.length > 0) && Ve(r, t.hostCssKeys), n = document.createElement("div"), n.setAttribute("data-wippy-theme-root", "");
        const d = t.containerClasses ?? [];
        d.length > 0 && n.classList.add(...d), r.appendChild(n), this._container = n, pe(he);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = k("@theme", (d) => this._applyTheme(d)));
      const { props: o, errors: s } = R(this, t.propsSchema);
      t.validateProps && s.push(...t.validateProps(o));
      const a = o;
      this._lastProps = a, this._lastErrors = s;
      let u = null;
      if (t.contentTemplate && (u = this._extractContent(t.contentTemplate), this._lastContent = u, this._contentObserver = new MutationObserver(() => {
        const d = this._extractContent(t.contentTemplate);
        this._lastContent = d, this._reactive?.notifyContent(d), this.onContentChanged(d);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(r, n, a, s, u, i), e !== this._attachment)
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
  _applyTheme(e = Y.getThemeMode?.()) {
    V(e, this), this._container && V(e, this._container);
  }
  disconnectedCallback() {
    const e = ++this._attachment;
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), V("auto", this), this._container && V("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), e === this._attachment && (this.emitEvent("unload"), e === this._attachment && (this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus));
  }
  attributeChangedCallback(e, t, i) {
    if (t === i)
      return;
    if (e === N) {
      const a = this._hostVisible, u = $(this);
      if (u === a)
        return;
      this._hostVisible = u, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(u, a), this.onHostVisibilityChanged(u, a));
      return;
    }
    const r = this.constructor.wippyConfig, { props: n, errors: o } = R(this, r.propsSchema);
    r.validateProps && o.push(...r.validateProps(n));
    const s = n;
    this._lastProps = s, this._lastErrors = o, this._reactive?.notifyProps(s, o), this.onPropsChanged(s, o);
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
L = /* @__PURE__ */ new WeakMap();
function Me(e) {
  return e.__wippyHostBus ?? null;
}
function De(e) {
  return e.dataset.wippyPanelId ?? null;
}
var Ue = Object.defineProperty, Fe = (e, t, i) => t in e ? Ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, x = (e, t, i) => Fe(e, typeof t != "symbol" ? t + "" : t, i);
function W(e, t, i) {
  const r = e.createElement("div"), n = i ? t.failed : t.loading;
  r.dataset.lazyState = i ? "failed" : "loading", r.setAttribute("role", i ? "alert" : "status"), r.setAttribute("aria-label", n), r.style.cssText = "display:grid;place-items:center;text-align:center;";
  const o = t.surface === "page";
  if (r.style.cssText += o ? "block-size:100%;min-block-size:0;" : "min-block-size:2rem;font-size:.875rem;", i)
    r.style.color = "var(--p-danger-500, currentColor)", r.textContent = !o && t.iconOnly ? "⚠" : n, !o && t.iconOnly && (r.title = n);
  else {
    const s = e.createElement("style");
    s.textContent = '@media (prefers-reduced-motion: no-preference) { [data-lazy-state="loading"] > [data-wippy-spinner] { animation: wippy-lazy-spin 1s linear infinite; } } @keyframes wippy-lazy-spin { to { transform: rotate(1turn); } }';
    const a = e.createElement("span");
    a.dataset.wippySpinner = "", a.setAttribute("aria-hidden", "true"), a.style.cssText = "display:block;box-sizing:border-box;inline-size:1em;block-size:1em;border:2px solid var(--p-surface-300, currentColor);border-top-color:var(--p-primary-color, currentColor);border-radius:50%;", a.style.fontSize = o ? "2rem" : "1em", r.append(s, a);
  }
  return r;
}
var Z = /* @__PURE__ */ Symbol("wippy:emit"), ee = /* @__PURE__ */ Symbol("wippy:props"), He = /* @__PURE__ */ Symbol("wippy:props_error"), $e = /* @__PURE__ */ Symbol("wippy:content"), Be = /* @__PURE__ */ Symbol("wippy:panel-id"), We = /* @__PURE__ */ Symbol("wippy:layout-bus"), je = /* @__PURE__ */ Symbol("wippy:host"), Je = /* @__PURE__ */ Symbol("wippy:host-visibility");
function Ke() {
  const e = K(ee);
  if (!e)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return e;
}
function Ye() {
  const e = K(Z);
  if (!e)
    throw new Error("useEvents() must be called inside a WippyVueElement");
  return e;
}
var I = /* @__PURE__ */ new WeakMap();
function j(e, t) {
  const i = I.get(e);
  if (i)
    return i;
  const r = Promise.resolve().then(t);
  return I.set(e, r), r.catch(() => {
    I.get(e) === r && I.delete(e);
  }), r;
}
var qe = class extends Ne {
  constructor() {
    super(...arguments), x(this, "_vueApp", null), x(this, "_mountingApp", !1), x(this, "_mountState", "idle"), x(this, "_feedback", null), x(this, "_propsRef", A({})), x(this, "_errorsRef", A([])), x(this, "_contentRef", A(null)), x(this, "_hostVisibilityRef", A(null)), x(this, "_bridgeAbort", null);
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
    e.mountLifecycle && !e.rootComponent && e.lazyConfig && await j(this, e.lazyConfig);
  }
  /** Undefined on configurations that use only the legacy load event. */
  get wippyMountState() {
    return this.constructor.vueConfig.mountLifecycle ? this._mountState : void 0;
  }
  onMount(e, t, i, r, n, o) {
    const s = this.constructor, a = s.vueConfig, u = new AbortController();
    this._bridgeAbort = u;
    const d = () => !u.signal.aborted && this._bridgeAbort === u;
    this._mountState = "mounting", this._propsRef.value = i, this._errorsRef.value = r, this._contentRef.value = n ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const l of r)
      if (this.emitEvent("invalid", { message: l }), !d())
        return;
    this.reactive.props.subscribe((l, f) => {
      this._propsRef.value = l, this._errorsRef.value = [...f];
      for (const h of f)
        this.emitEvent("invalid", { message: h });
    }, { signal: u.signal }), this.reactive.content && this.reactive.content.subscribe((l) => {
      this._contentRef.value = l;
    }, { signal: u.signal }), this.reactive.hostVisibility.subscribe((l) => {
      this._hostVisibilityRef.value = l;
    }, { signal: u.signal });
    const y = (l) => {
      if (!d())
        return;
      const f = ye(), h = ie(l.rootComponent);
      let p = !1, g = !1, w, C;
      this._mountingApp = !0;
      try {
        const _ = ge();
        if (l.piniaPlugins)
          for (const b of l.piniaPlugins)
            _.use(b);
        h.use(_);
        for (const b of l.plugins ?? [])
          h.use(b);
        if (h.provide(ee, this._propsRef), h.provide(He, this._errorsRef), h.provide(Z, this.emitEvent.bind(this)), h.provide($e, this._contentRef), h.provide(Je, this._hostVisibilityRef), h.provide(Be, De(this)), h.provide(We, Me(this)), h.provide(je, X(this)), l.providers?.(h, this), !d())
          return;
        if (C = h.config.errorHandler, a.mountLifecycle && (h.config.errorHandler = (b, v, c) => {
          g || (w = b), g = !0, C?.(b, v, c);
        }), h.mount(t), p = !0, g)
          throw w;
        d() && (this._vueApp = h);
      } finally {
        a.mountLifecycle && p && (h.config.errorHandler = C);
        try {
          p && (g || !d()) && h.unmount();
        } finally {
          _e(f), this._mountingApp = !1;
        }
      }
      a.mountLifecycle && queueMicrotask(() => {
        d() && this.isConnected && (this._mountState = "mounted", this.dispatchEvent(new Event("wippy-mounted")));
      });
    };
    if (a.rootComponent) {
      if (this._mountingApp && a.mountLifecycle) {
        queueMicrotask(() => {
          try {
            y(a);
          } catch (l) {
            d() && (this._mountState = "failed", this.emitEvent("error", { message: l instanceof Error ? l.message : String(l), error: l }));
          }
        });
        return;
      }
      try {
        y(a);
      } catch (l) {
        if (d())
          throw this._mountState = "failed", l;
      }
    } else if (a.lazyConfig) {
      const l = t.ownerDocument, f = a.lazyUi;
      f?.surface === "page" && (t.style.blockSize = "100%", t.style.minBlockSize = "0");
      let h = !1, p, g;
      const w = () => {
        clearTimeout(p), clearTimeout(g), this._feedback?.remove(), this._feedback = null;
      };
      u.signal.addEventListener("abort", w, { once: !0 });
      const C = () => {
        if (!d() || h)
          return;
        const c = f ? W(l, f, !1) : l.createElement("wippy-loading");
        c.setAttribute("no-bg", ""), this._feedback = c, t.appendChild(c);
      }, _ = (c) => {
        if (!d())
          return;
        h = !0, w(), this._mountState = "failed";
        const S = f?.failed ?? (c instanceof Error ? c.message : String(c)), E = f ? W(l, f, !0) : l.createElement("wippy-error");
        f || (E.setAttribute("title", "Failed to load"), E.setAttribute("message", S)), this._feedback = E, t.appendChild(E), this.emitEvent("error", f ? { message: S, error: c } : { message: S });
      }, b = f?.delay ?? (f?.surface === "compact" ? 200 : 0);
      b > 0 ? p = setTimeout(C, b) : C(), f && (g = setTimeout(() => _(new Error("The component did not load in time.")), f.timeout ?? 3e4)), (a.mountLifecycle ? j(s, a.lazyConfig) : a.lazyConfig()).then((c) => {
        !d() || h || (h = !0, w(), y(c));
      }, (c) => {
        h || _(c);
      }).catch(_);
    } else
      throw this._mountState = "failed", new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._mountState = "idle", this._feedback?.remove(), this._feedback = null;
    const e = this._vueApp;
    this._vueApp = null, e?.unmount();
  }
};
const Ge = () => Ke(), Qe = () => Ye();
let J;
function Xe() {
  return J ??= import("./echarts-BMfa0m9z.js").catch((e) => {
    throw J = void 0, e;
  });
}
function Ze(e) {
  if (e.componentType !== "series" || !Number.isInteger(e.seriesIndex) || !Number.isInteger(e.dataIndex) || (e.seriesIndex ?? -1) < 0 || (e.dataIndex ?? -1) < 0)
    return null;
  const t = e.data, i = t !== null && typeof t == "object" && !Array.isArray(t) ? t : void 0, r = i?.value ?? e.value ?? t, n = e.encode?.x?.[0], o = n === void 0 ? void 0 : e.dimensionNames?.[n], a = i?.x ?? (Array.isArray(r) && (n !== void 0 || !e.name) ? r[n ?? 0] : void 0) ?? (o ? i?.[o] : void 0) ?? e.name;
  return {
    label: a == null ? "" : String(a),
    datasetLabel: e.seriesName ?? "",
    datasetIndex: e.seriesIndex,
    dataIndex: e.dataIndex,
    value: t
  };
}
function T(e) {
  return e !== null && typeof e == "object" ? e : {};
}
function et(e) {
  const t = T(T(e).selected);
  return { selected: Object.fromEntries(Object.entries(t).filter((i) => typeof i[1] == "boolean")) };
}
function tt(e) {
  const t = T(e), i = Array.isArray(t.batch) ? T(t.batch[0]) : t;
  return { start: typeof i.start == "number" ? i.start : null, end: typeof i.end == "number" ? i.end : null };
}
function z(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function it(e) {
  if (typeof e != "string")
    return !1;
  try {
    return ["http:", "https:", "mailto:"].includes(new URL(e, "https://wippy.invalid/").protocol);
  } catch {
    return !1;
  }
}
function rt(e) {
  function t(i, r = "") {
    if (Array.isArray(i))
      return i.map((s) => t(s, r));
    if (!z(i))
      return i;
    const n = Object.entries(i).flatMap(([s, a]) => (s === "link" || s === "sublink") && !it(a) ? (console.warn(`[wippy-echarts] Ignored unsafe ${s} URL.`), [[s, null]]) : [[s, t(a, s)]]), o = Object.fromEntries(n);
    return r === "tooltip" ? { ...o, renderMode: "richText" } : o;
  }
  return t(e);
}
function nt(e = "") {
  try {
    const t = e.trim() ? JSON.parse(e) : {};
    if (!z(t))
      throw new Error("Expected an ECharts option object");
    return { option: t, error: null };
  } catch (t) {
    return { option: null, error: `Invalid options JSON: ${t.message}` };
  }
}
function te(e) {
  if (z(e.baseOption))
    return { ...e, baseOption: te(e.baseOption) };
  const t = (i) => {
    const r = z(i) ? i : {}, { appendTo: n, appendToBody: o, ...s } = r;
    return { confine: !0, ...s };
  };
  return {
    ...e,
    tooltip: Array.isArray(e.tooltip) ? e.tooltip.map(t) : t(e.tooltip),
    aria: { enabled: !0, ...z(e.aria) ? e.aria : {} }
  };
}
const st = [
  "#2563EB",
  "#0D9488",
  "#7C3AED",
  "#DB2777",
  "#0891B2",
  "#65A30D",
  "#9333EA",
  "#D55E00"
];
function ot(e, t, i = !1) {
  const r = (u, d) => e.getPropertyValue(u).trim() || d, n = r("--p-text-color", e.color), o = r("--p-text-muted-color", n), s = r("--p-content-border-color", o), a = {
    nameTextStyle: { color: o },
    axisLabel: { color: o },
    axisLine: { lineStyle: { color: s } },
    axisTick: { lineStyle: { color: s } },
    splitLine: { lineStyle: { color: s } }
  };
  return {
    darkMode: i,
    backgroundColor: "transparent",
    color: t ?? st.map((u, d) => r(`--wippy-chart-${d + 1}`, u)),
    textStyle: { color: n, fontFamily: r("--p-font-family", e.fontFamily) },
    title: { textStyle: { color: n }, subtextStyle: { color: o } },
    tooltip: {
      backgroundColor: r("--p-content-background", "transparent"),
      borderColor: s,
      textStyle: { color: n }
    },
    legend: { textStyle: { color: n }, inactiveColor: o },
    categoryAxis: a,
    valueAxis: a,
    timeAxis: a,
    logAxis: a,
    line: { label: { color: n } },
    bar: { label: { color: n } },
    pie: { label: { color: n }, labelLine: { lineStyle: { color: s } } },
    radar: { axisName: { color: o }, axisLine: { lineStyle: { color: s } }, splitLine: { lineStyle: { color: s } } },
    calendar: { itemStyle: { color: r("--p-content-background", "transparent"), borderColor: s }, dayLabel: { color: o }, monthLabel: { color: n }, yearLabel: { color: n } }
  };
}
function at(e, t) {
  return {
    text: t,
    color: e.color[0],
    textColor: e.textStyle.color,
    maskColor: e.tooltip.backgroundColor,
    fontFamily: e.textStyle.fontFamily
  };
}
function lt(e, t, i) {
  let r, n, o = !1, s = 0, a = "", u = "", d, y, l = !1;
  function f() {
    r?.dispose(), r = void 0;
  }
  function h(p) {
    s++, l = !1, f();
    const g = p instanceof Error ? p.message : String(p);
    i(g), t("chart-error", { message: g });
  }
  return {
    async render(p, g, w) {
      const C = ++s;
      if (o) return;
      l = !0;
      const _ = nt(p.options);
      if (!_.option) {
        h(new Error(_.error));
        return;
      }
      i(null);
      try {
        if (p.lazyInit && !w || !e.clientWidth || !e.clientHeight || (n ??= await Xe(), o || C !== s))
          return;
        const b = JSON.stringify(g);
        r && (a !== p.renderer || u !== b) && f();
        let v = !1;
        if (!r) {
          r = n.init(e, g, { renderer: p.renderer }), a = p.renderer, u = b, v = !0;
          for (const [c, S] of [
            ["click", "chart-click"],
            ["dblclick", "chart-dblclick"],
            ["mouseover", "chart-hover"]
          ])
            r.on(c, (E) => {
              const P = Ze(E);
              P && t(S, P);
            });
          r.on("legendselectchanged", (c) => t("legend-change", et(c))), r.on("datazoom", (c) => t("datazoom", tt(c))), r.on("finished", () => t("chart-rendered", {}));
        }
        r.group = p.group, p.group && n.connect(p.group), (v || d !== p.options || y !== p.notMerge) && (r.setOption(n.withFormatters(rt(te(_.option))), {
          notMerge: p.notMerge,
          lazyUpdate: p.lazyUpdate
        }), d = p.options, y = p.notMerge), p.loading ? r.showLoading("default", at(g, p.loadingText)) : r.hideLoading(), l = !1;
      } catch (b) {
        !o && C === s && h(b);
      }
    },
    fail: h,
    initialized: () => !!r,
    pending: () => l,
    resize() {
      r?.resize();
    },
    stop() {
      o = !0, s++, l = !1, f(), d = void 0, y = void 0;
    }
  };
}
function O(e, t) {
  return e == null ? t : e === !0 || e === "" || e === "true";
}
function ct(e = "") {
  if (!e.trim())
    return;
  const t = JSON.parse(e);
  if (!Array.isArray(t) || !t.length || !t.every((i) => typeof i == "string" && i.trim()))
    throw new Error("Palette must be a non-empty JSON array of colors");
  return t.map((i) => i.trim());
}
function ut(e) {
  return {
    options: e.options ?? "",
    themeMode: e.themeMode ?? "auto",
    palette: ct(e.palette),
    renderer: e.renderer ?? "canvas",
    autoresize: O(e.autoresize, !0),
    loading: O(e.loading, !1),
    loadingText: e.loadingText ?? "Loading…",
    notMerge: O(e.notMerge, !0),
    lazyUpdate: O(e.lazyUpdate, !1),
    group: e.group ?? "",
    label: e.label ?? "Chart",
    lazyInit: O(e.lazyInit, !1)
  };
}
const dt = ["aria-label", "aria-busy"], ht = {
  key: 0,
  class: "echarts-error",
  role: "alert"
}, pt = /* @__PURE__ */ re({
  __name: "echarts-canvas",
  setup(e) {
    const t = Ge(), i = Qe(), r = A(null), n = A(null), o = ne(() => t.value.label ?? "Chart");
    let s, a, u, d, y, l, f, h, p = "", g = 0, w = !1, C = "auto";
    function _(v = !1) {
      if (!(!s || !r.value))
        try {
          const c = ut(t.value), S = c.themeMode === "auto" ? C : c.themeMode, E = r.value.getRootNode(), P = E instanceof ShadowRoot ? E.host : r.value, M = ot(
            getComputedStyle(P),
            c.palette,
            S === "dark" || S === "auto" && !!y?.matches
          ), D = JSON.stringify(M);
          if (v && D === p)
            return;
          p = D, s.render(c, M, w);
        } catch (c) {
          s.fail(c);
        }
    }
    function b() {
      cancelAnimationFrame(g), g = requestAnimationFrame(() => _(!0));
    }
    return se(() => {
      if (!r.value)
        return;
      s = lt(r.value, i, (c) => n.value = c), C = Y.getThemeMode(), y = matchMedia("(prefers-color-scheme: dark)"), y.addEventListener("change", b), l = k("@theme", (c) => {
        C = c, b();
      }), f = k("@config", b), a = new ResizeObserver(() => {
        t.value.autoresize !== !1 && s?.resize(), (!s?.initialized() || s.pending()) && _();
      }), a.observe(r.value), typeof IntersectionObserver < "u" ? (d = new IntersectionObserver((c) => {
        c.some((S) => S.isIntersecting) && (w = !0, d?.disconnect(), _());
      }, { rootMargin: "200px" }), d.observe(r.value)) : w = !0, u = new MutationObserver(b);
      let v = r.value;
      for (; v; ) {
        u.observe(v, { attributes: !0 });
        const c = v.getRootNode();
        c instanceof ShadowRoot && u.observe(c, { childList: !0, characterData: !0, subtree: !0 }), v = v.parentElement ?? (c instanceof ShadowRoot ? c.host : null);
      }
      h = setInterval(() => _(!0), 1e3), _();
    }), oe(t, () => _(), { deep: !0, flush: "post" }), ae(() => {
      cancelAnimationFrame(g), clearInterval(h), a?.disconnect(), u?.disconnect(), d?.disconnect(), y?.removeEventListener("change", b), l?.(), f?.(), s?.stop();
    }), (v, c) => (U(), F("div", {
      class: "echarts-container",
      role: "figure",
      "aria-label": o.value,
      "aria-busy": le(t).loading === !0
    }, [
      n.value ? (U(), F("div", ht, ce(n.value), 1)) : ue("", !0),
      de("div", {
        ref_key: "container",
        ref: r,
        class: "echarts-canvas-wrapper"
      }, null, 512)
    ], 8, dt));
  }
}), ft = ":host{display:block;width:100%;height:100%;box-sizing:border-box}:host>div{width:100%;height:100%}.echarts-container{position:relative;width:100%;height:100%;min-height:200px;box-sizing:border-box}.echarts-canvas-wrapper{position:relative;width:100%;height:100%}.echarts-error{padding:12px 16px;border-radius:6px;background:var(--p-content-background);color:var(--p-danger-color);border:1px solid var(--p-danger-color);font-family:inherit;font-size:13px;line-height:1.4}", mt = { props: { type: "object", properties: { options: { type: "string", default: "", description: 'Complete desired ECharts option as a JSON string, always a full option and never a patch, including with not-merge=false. Empty means {}. Include all settings needed to initialize a fresh chart. Formatter callbacks accept {$format: spec}, for example {"tooltip":{"trigger":"axis","axisPointer":{"label":{"formatter":{"$format":"date"}}}}}. Specs: number, number:0..20, compact, percent, integer, date, datetime, month, time:<ECharts template>. Uses document language, then browser locale. Unknown specs warn and use defaults. JSON strings never execute.' }, "theme-mode": { type: "string", default: "auto", description: "Auto follows the host theme mode; light/dark override ECharts contrast mode locally. Resolved host tokens remain authoritative.", enum: ["auto", "light", "dark"] }, palette: { type: "string", default: "", description: "JSON array of color strings. Overrides --wippy-chart-1..8 and the documented fallback palette. Empty uses CSS colors." }, renderer: { type: "string", default: "canvas", description: "ECharts rendering backend. Changing it disposes and recreates from the current full option, resetting zoom, legend selection and other interaction state.", enum: ["canvas", "svg"] }, autoresize: { type: "boolean", default: !0, description: "Resize with the container using ResizeObserver." }, loading: { type: "boolean", default: !1, description: "Show the ECharts loading state using theme colors." }, "loading-text": { type: "string", default: "Loading…", description: "Text in the ECharts loading state." }, "not-merge": { type: "boolean", default: !0, description: "Controls how a new full option is applied to the live chart. True replaces (default); false uses native ECharts merge for data animation and retained zoom/legend state unless explicitly overridden. Never enables patch input." }, "lazy-update": { type: "boolean", default: !1, description: "Defer the ECharts option update until the next animation frame." }, group: { type: "string", default: "", description: "ECharts connect group id. Empty disables group membership." }, label: { type: "string", default: "Chart", description: "Accessible name of the chart figure." }, "lazy-init": { type: "boolean", default: !1, description: "Wait until within 200px of the viewport before loading ECharts and initializing. Falls back to immediate initialization without IntersectionObserver." } } } }, bt = {
  wippy: mt
};
class yt extends qe {
  static get wippyConfig() {
    return {
      propsSchema: bt.wippy.props,
      hostCssKeys: ["themeConfigUrl"],
      inlineCss: ft
    };
  }
  static get vueConfig() {
    return { rootComponent: pt };
  }
}
be(import.meta.url, yt);
