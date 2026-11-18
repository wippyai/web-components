import { ref as Ut, createApp as Lo, inject as Sn, defineComponent as Eo, computed as Ki, onMounted as Ro, onUnmounted as Io, watch as Fo, openBlock as ei, createElementBlock as ii, toDisplayString as zo, createElementVNode as Vo } from "vue";
import { addCollection as Bo } from "@iconify/vue";
import { config as qi, addIcons as No, on as Wo, applyThemeMode as xe, host as Ho, hostCss as jo, loadCss as $o, define as Yo } from "@wippy-fe/proxy";
import { getActivePinia as Uo, createPinia as Xo, setActivePinia as Ko } from "pinia";
var _i = "data-wippy-visible";
function Gi(i) {
  const t = i.getAttribute(_i);
  return t === "true" ? !0 : t === "false" ? !1 : null;
}
var qo = Object.defineProperty, Mn = (i) => {
  throw TypeError(i);
}, Go = (i, t, e) => t in i ? qo(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, z = (i, t, e) => Go(i, typeof t != "symbol" ? t + "" : t, e), Cn = (i, t, e) => t.has(i) || Mn("Cannot " + e), Jo = (i, t, e) => (Cn(i, t, "read from private field"), e ? e.call(i) : t.get(i)), Zo = (i, t, e) => t.has(i) ? Mn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), Qo = (i, t, e, s) => (Cn(i, t, "write to private field"), t.set(i, e), e), tr = [
  "themeConfigUrl",
  "primeVueCssUrl",
  "markdownCssUrl",
  "iframeCssUrl"
], er = [
  ":where([data-wippy-theme-root]).w-theme-light",
  ":where([data-wippy-theme-root]).w-theme-dark"
].join(`,
`);
function Ji(i) {
  const t = i.startsWith("--") ? i : `--${i}`;
  return /^--[-\w\u0080-\uFFFF]+$/.test(t) ? t : null;
}
function ir(...i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    if (e)
      for (const [s, n] of Object.entries(e)) {
        if ((s === "@light" || s === "@dark") && n && typeof n == "object") {
          for (const [r, a] of Object.entries(n)) {
            const l = typeof a == "string" ? Ji(r) : null;
            l && t.add(l);
          }
          continue;
        }
        const o = typeof n == "string" ? Ji(s) : null;
        o && t.add(o);
      }
  return [...t].sort();
}
function sr(i) {
  if (i.length === 0)
    return "";
  const t = i.map((e) => `  ${e}: inherit;`).join(`
`);
  return `${er} {
${t}
}`;
}
function nr(i, t) {
  const e = sr(t);
  e && Pn(i, e, "@wippy-fe/css-variables-bridge");
}
function or(i, t) {
  const s = (t ?? tr).map(async (n) => {
    const o = jo[n];
    if (!o)
      return console.warn(`[wippy-fe/webcomponent-core] hostCss key "${n}" is undefined — skipping. Remove it from hostCssKeys if the CSS was removed.`), null;
    try {
      return await $o(o);
    } catch (r) {
      return console.warn(`[wippy-fe/webcomponent-core] Failed to load hostCss "${n}" (${o}):`, r), null;
    }
  });
  return Promise.all(s).then((n) => {
    for (const o of n) {
      if (!o)
        continue;
      const r = document.createElement("style");
      r.textContent = o, r.setAttribute("role", "@wippy-fe/host-css"), i.appendChild(r);
    }
  });
}
function rr(i, t) {
  const e = document.createElement("style");
  e.textContent = t, i.appendChild(e);
}
function Pn(i, t, e) {
  if (typeof CSSStyleSheet < "u" && "replaceSync" in CSSStyleSheet.prototype) {
    const n = new CSSStyleSheet();
    n.replaceSync(t), i.adoptedStyleSheets = [...i.adoptedStyleSheets, n];
    return;
  }
  const s = document.createElement("style");
  s.setAttribute("role", e), s.textContent = t, i.appendChild(s);
}
function ar(i, t) {
  Pn(i, t, "@wippy-fe/custom-css");
}
function Dn(i) {
  return i.__wippyHost ?? null;
}
function lr(i) {
  return i.replace(/-([a-z])/g, (t, e) => e.toUpperCase());
}
function cr(i, t, e) {
  switch (e.type) {
    case "string":
      return { value: t };
    case "number": {
      const s = Number.parseFloat(t);
      return Number.isNaN(s) ? { value: void 0, error: `Invalid ${i}: expected a number` } : { value: s };
    }
    case "integer": {
      const s = Number.parseInt(t, 10);
      return Number.isNaN(s) ? { value: void 0, error: `Invalid ${i}: expected an integer` } : { value: s };
    }
    case "boolean":
      return { value: t !== "false" };
    case "array":
    case "object":
      try {
        const s = JSON.parse(t);
        return e.type === "array" && !Array.isArray(s) ? { value: void 0, error: `Invalid ${i}: expected a JSON array` } : { value: s };
      } catch {
        return { value: void 0, error: `Invalid ${i}: must be valid JSON` };
      }
    default:
      return { value: t };
  }
}
function si(i, t) {
  const e = {}, s = [];
  for (const [n, o] of Object.entries(t.properties)) {
    const r = i.getAttribute(n), a = lr(n);
    if (r === null) {
      o.default !== void 0 && (e[a] = o.default);
      continue;
    }
    const l = cr(n, r, o);
    l.error ? s.push(l.error) : e[a] = l.value;
  }
  return { props: e, errors: s };
}
var hr = class {
  constructor(i, t) {
    z(this, "_props"), z(this, "_errors"), z(this, "_content"), z(this, "_hostVisibility"), z(this, "_propsListeners", /* @__PURE__ */ new Set()), z(this, "_contentListeners", /* @__PURE__ */ new Set()), z(this, "_hostVisibilityListeners", /* @__PURE__ */ new Set()), z(this, "_disposed", !1), z(this, "_emitToDom"), z(this, "props"), z(this, "events"), z(this, "content"), z(this, "hostVisibility"), this._props = i.props, this._errors = i.errors, this._content = i.content, this._hostVisibility = i.hostVisibility, this._emitToDom = t;
    const e = this;
    this.props = {
      get value() {
        return e._props;
      },
      get errors() {
        return e._errors;
      },
      subscribe(s, n) {
        return e._subscribeProps(s, n);
      }
    }, this.events = {
      emit(s, n) {
        e._disposed || e._emitToDom(s, n);
      }
    }, this.content = i.hasContent ? {
      get value() {
        return e._content;
      },
      subscribe(s, n) {
        return e._subscribeContent(s, n);
      }
    } : null, this.hostVisibility = {
      get value() {
        return e._hostVisibility;
      },
      subscribe(s, n) {
        return e._subscribeHostVisibility(s, n);
      }
    };
  }
  /** @internal */
  notifyProps(i, t) {
    if (!this._disposed) {
      this._props = i, this._errors = t;
      for (const e of this._propsListeners)
        e(i, t);
    }
  }
  /** @internal */
  notifyContent(i) {
    if (!this._disposed) {
      this._content = i;
      for (const t of this._contentListeners)
        t(i);
    }
  }
  /** @internal */
  notifyHostVisibility(i, t) {
    if (!(this._disposed || i === t)) {
      this._hostVisibility = i;
      for (const e of this._hostVisibilityListeners)
        e(i, t);
    }
  }
  /** @internal */
  dispose() {
    this._disposed || (this._disposed = !0, this._propsListeners.clear(), this._contentListeners.clear(), this._hostVisibilityListeners.clear());
  }
  _subscribeProps(i, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._propsListeners.add(i), t?.immediate && i(this._props, this._errors);
    const e = () => {
      this._propsListeners.delete(i), t?.signal?.removeEventListener("abort", e);
    };
    return t?.signal?.addEventListener("abort", e, { once: !0 }), e;
  }
  _subscribeContent(i, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._contentListeners.add(i), t?.immediate && i(this._content);
    const e = () => {
      this._contentListeners.delete(i), t?.signal?.removeEventListener("abort", e);
    };
    return t?.signal?.addEventListener("abort", e, { once: !0 }), e;
  }
  _subscribeHostVisibility(i, t) {
    if (this._disposed || t?.signal?.aborted)
      return () => {
      };
    this._hostVisibilityListeners.add(i), t?.immediate && i(this._hostVisibility, this._hostVisibility);
    const e = () => {
      this._hostVisibilityListeners.delete(i), t?.signal?.removeEventListener("abort", e);
    };
    return t?.signal?.addEventListener("abort", e, { once: !0 }), e;
  }
}, Re, dr = class extends HTMLElement {
  constructor() {
    super(), z(this, "_internals"), z(this, "_contentObserver", null), z(this, "_initialized", !1), z(this, "_container", null), Zo(this, Re, null), z(this, "_attachment", 0), z(this, "_reactive", null), z(this, "_lastProps", null), z(this, "_lastErrors", []), z(this, "_lastContent", null), z(this, "_themeUnsub", null), z(this, "_hostVisible", null), this._internals = this.attachInternals(), this._hostVisible = Gi(this);
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
    const i = this.wippyConfig, t = Object.keys(i.propsSchema.properties), e = i.extraObservedAttributes ?? [];
    return [.../* @__PURE__ */ new Set([...t, ...e, _i])];
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
    return Dn(this);
  }
  /**
   * Emit a CustomEvent that bubbles and crosses shadow DOM boundaries.
   */
  emitEvent(i, t) {
    this.dispatchEvent(new CustomEvent(i, {
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
      const i = this.constructor.wippyConfig, t = !!i.contentTemplate;
      let e, s;
      if (this._lastProps !== null)
        e = this._lastProps, s = this._lastErrors;
      else {
        const o = si(this, i.propsSchema);
        i.validateProps && o.errors.push(...i.validateProps(o.props)), e = o.props, s = o.errors, this._lastProps = e, this._lastErrors = s;
      }
      const n = t ? this._lastContent ?? this._extractContent(i.contentTemplate) : null;
      t && this._lastContent === null && (this._lastContent = n), this._reactive = new hr(
        { props: e, errors: s, content: n, hasContent: t, hostVisibility: this._hostVisible },
        this.emitEvent.bind(this)
      );
    }
    return this._reactive;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    const i = ++this._attachment;
    this._internals.states.add("loading");
    try {
      const t = this.constructor.wippyConfig, e = this._initialized, s = Jo(this, Re) ?? Qo(this, Re, this.shadowRoot ?? this.attachShadow({ mode: t.shadowMode ?? "open" }));
      let n;
      if (this._container)
        n = this._container;
      else {
        if (this.onInit(s), i !== this._attachment)
          return;
        t.inlineCss && rr(s, t.inlineCss);
        try {
          const h = qi?.theming, d = ir(
            h?.global?.cssVariables,
            h?.children?.cssVariables
          );
          nr(s, d);
        } catch {
        }
        if (t.customCss !== !1)
          try {
            const h = qi?.theming, d = [h?.global?.customCSS, h?.children?.customCSS].filter(Boolean).join(`
`);
            d && ar(s, d);
          } catch {
          }
        (t.hostCssKeys === void 0 || t.hostCssKeys.length > 0) && or(s, t.hostCssKeys), n = document.createElement("div"), n.setAttribute("data-wippy-theme-root", "");
        const c = t.containerClasses ?? [];
        c.length > 0 && n.classList.add(...c), s.appendChild(n), this._container = n, No(Bo);
      }
      this._applyTheme(), this._themeUnsub || (this._themeUnsub = Wo("@theme", (c) => this._applyTheme(c)));
      const { props: o, errors: r } = si(this, t.propsSchema);
      t.validateProps && r.push(...t.validateProps(o));
      const a = o;
      this._lastProps = a, this._lastErrors = r;
      let l = null;
      if (t.contentTemplate && (l = this._extractContent(t.contentTemplate), this._lastContent = l, this._contentObserver = new MutationObserver(() => {
        const c = this._extractContent(t.contentTemplate);
        this._lastContent = c, this._reactive?.notifyContent(c), this.onContentChanged(c);
      }), this._contentObserver.observe(this, {
        childList: !0,
        characterData: !0,
        subtree: !0
      })), this.onMount(s, n, a, r, l, e), i !== this._attachment)
        return;
      this._internals.states.delete("loading"), this._internals.states.add("ready"), e || (this._initialized = !0), this.onReady(), i === this._attachment && this.emitEvent("load");
    } catch (t) {
      if (i !== this._attachment || (this.onError(t), i !== this._attachment))
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
  _applyTheme(i = Ho.getThemeMode?.()) {
    xe(i, this), this._container && xe(i, this._container);
  }
  disconnectedCallback() {
    const i = ++this._attachment;
    this._themeUnsub && (this._themeUnsub(), this._themeUnsub = null), xe("auto", this), this._container && xe("auto", this._container), this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null), this.onUnmount(), i === this._attachment && (this.emitEvent("unload"), i === this._attachment && (this._internals.states.clear(), this._reactive?.dispose(), this._reactive = null, this._lastProps = null, this._lastErrors = [], this._lastContent = null, delete this.__wippyHost, delete this.__wippyHostBus));
  }
  attributeChangedCallback(i, t, e) {
    if (t === e)
      return;
    if (i === _i) {
      const a = this._hostVisible, l = Gi(this);
      if (l === a)
        return;
      this._hostVisible = l, this.isConnected && this._initialized && (this._reactive?.notifyHostVisibility(l, a), this.onHostVisibilityChanged(l, a));
      return;
    }
    const s = this.constructor.wippyConfig, { props: n, errors: o } = si(this, s.propsSchema);
    s.validateProps && o.push(...s.validateProps(n));
    const r = n;
    this._lastProps = r, this._lastErrors = o, this._reactive?.notifyProps(r, o), this.onPropsChanged(r, o);
  }
  // ── Hooks ──────────────────────────────────────────────────
  /** Called right after shadow DOM is attached, before CSS or container. */
  onInit(i) {
  }
  /** Called after internals state is set to ready, before the `load` event. */
  onReady() {
  }
  /** Called when connectedCallback throws. Default logs to console. */
  onError(i) {
    console.error(`${this.constructor.name} initialization failed:`, i);
  }
  /** Called when observed attributes change. Override to update framework state. */
  onPropsChanged(i, t) {
  }
  /**
   * Called when the host changes logical activity. `null` means unmanaged.
   * This does not imply a DOM remount or a CSS/viewport visibility change.
   */
  onHostVisibilityChanged(i, t) {
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
  _extractContent(i) {
    const t = this.querySelector(`template[data-type="${i}"]`);
    return t ? t.content.textContent?.trim() || t.textContent?.trim() || "" : null;
  }
  /** Called when child `<template>` content changes. Override to update framework state. */
  onContentChanged(i) {
  }
};
Re = /* @__PURE__ */ new WeakMap();
function ur(i) {
  return i.__wippyHostBus ?? null;
}
function fr(i) {
  return i.dataset.wippyPanelId ?? null;
}
var pr = Object.defineProperty, gr = (i, t, e) => t in i ? pr(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, ft = (i, t, e) => gr(i, typeof t != "symbol" ? t + "" : t, e);
function Zi(i, t, e) {
  const s = i.createElement("div"), n = e ? t.failed : t.loading;
  s.dataset.lazyState = e ? "failed" : "loading", s.setAttribute("role", e ? "alert" : "status"), s.setAttribute("aria-label", n), s.style.cssText = "display:grid;place-items:center;text-align:center;";
  const o = t.surface === "page";
  if (s.style.cssText += o ? "block-size:100%;min-block-size:0;" : "min-block-size:2rem;font-size:.875rem;", e)
    s.style.color = "var(--p-danger-500, currentColor)", s.textContent = !o && t.iconOnly ? "⚠" : n, !o && t.iconOnly && (s.title = n);
  else {
    const r = i.createElement("style");
    r.textContent = '@media (prefers-reduced-motion: no-preference) { [data-lazy-state="loading"] > [data-wippy-spinner] { animation: wippy-lazy-spin 1s linear infinite; } } @keyframes wippy-lazy-spin { to { transform: rotate(1turn); } }';
    const a = i.createElement("span");
    a.dataset.wippySpinner = "", a.setAttribute("aria-hidden", "true"), a.style.cssText = "display:block;box-sizing:border-box;inline-size:1em;block-size:1em;border:2px solid var(--p-surface-300, currentColor);border-top-color:var(--p-primary-color, currentColor);border-radius:50%;", a.style.fontSize = o ? "2rem" : "1em", s.append(r, a);
  }
  return s;
}
var An = /* @__PURE__ */ Symbol("wippy:emit"), On = /* @__PURE__ */ Symbol("wippy:props"), mr = /* @__PURE__ */ Symbol("wippy:props_error"), br = /* @__PURE__ */ Symbol("wippy:content"), _r = /* @__PURE__ */ Symbol("wippy:panel-id"), xr = /* @__PURE__ */ Symbol("wippy:layout-bus"), yr = /* @__PURE__ */ Symbol("wippy:host"), vr = /* @__PURE__ */ Symbol("wippy:host-visibility");
function wr() {
  const i = Sn(On);
  if (!i)
    throw new Error("useProps() must be called inside a WippyVueElement");
  return i;
}
function kr() {
  const i = Sn(An);
  if (!i)
    throw new Error("useEvents() must be called inside a WippyVueElement");
  return i;
}
var ye = /* @__PURE__ */ new WeakMap();
function Qi(i, t) {
  const e = ye.get(i);
  if (e)
    return e;
  const s = Promise.resolve().then(t);
  return ye.set(i, s), s.catch(() => {
    ye.get(i) === s && ye.delete(i);
  }), s;
}
var Sr = class extends dr {
  constructor() {
    super(...arguments), ft(this, "_vueApp", null), ft(this, "_mountingApp", !1), ft(this, "_mountState", "idle"), ft(this, "_feedback", null), ft(this, "_propsRef", Ut({})), ft(this, "_errorsRef", Ut([])), ft(this, "_contentRef", Ut(null)), ft(this, "_hostVisibilityRef", Ut(null)), ft(this, "_bridgeAbort", null);
  }
  /**
   * Override to provide Vue-specific configuration.
   */
  static get vueConfig() {
    throw new Error("WippyVueElement subclass must override static get vueConfig()");
  }
  /** Prepare the implementation without creating a Vue or Pinia instance. */
  static async preloadImplementation() {
    const i = this.vueConfig;
    i.mountLifecycle && !i.rootComponent && i.lazyConfig && await Qi(this, i.lazyConfig);
  }
  /** Undefined on configurations that use only the legacy load event. */
  get wippyMountState() {
    return this.constructor.vueConfig.mountLifecycle ? this._mountState : void 0;
  }
  onMount(i, t, e, s, n, o) {
    const r = this.constructor, a = r.vueConfig, l = new AbortController();
    this._bridgeAbort = l;
    const c = () => !l.signal.aborted && this._bridgeAbort === l;
    this._mountState = "mounting", this._propsRef.value = e, this._errorsRef.value = s, this._contentRef.value = n ?? null, this._hostVisibilityRef.value = this.hostVisible;
    for (const d of s)
      if (this.emitEvent("invalid", { message: d }), !c())
        return;
    this.reactive.props.subscribe((d, u) => {
      this._propsRef.value = d, this._errorsRef.value = [...u];
      for (const f of u)
        this.emitEvent("invalid", { message: f });
    }, { signal: l.signal }), this.reactive.content && this.reactive.content.subscribe((d) => {
      this._contentRef.value = d;
    }, { signal: l.signal }), this.reactive.hostVisibility.subscribe((d) => {
      this._hostVisibilityRef.value = d;
    }, { signal: l.signal });
    const h = (d) => {
      if (!c())
        return;
      const u = Uo(), f = Lo(d.rootComponent);
      let p = !1, g = !1, m, b;
      this._mountingApp = !0;
      try {
        const _ = Xo();
        if (d.piniaPlugins)
          for (const y of d.piniaPlugins)
            _.use(y);
        f.use(_);
        for (const y of d.plugins ?? [])
          f.use(y);
        if (f.provide(On, this._propsRef), f.provide(mr, this._errorsRef), f.provide(An, this.emitEvent.bind(this)), f.provide(br, this._contentRef), f.provide(vr, this._hostVisibilityRef), f.provide(_r, fr(this)), f.provide(xr, ur(this)), f.provide(yr, Dn(this)), d.providers?.(f, this), !c())
          return;
        if (b = f.config.errorHandler, a.mountLifecycle && (f.config.errorHandler = (y, v, x) => {
          g || (m = y), g = !0, b?.(y, v, x);
        }), f.mount(t), p = !0, g)
          throw m;
        c() && (this._vueApp = f);
      } finally {
        a.mountLifecycle && p && (f.config.errorHandler = b);
        try {
          p && (g || !c()) && f.unmount();
        } finally {
          Ko(u), this._mountingApp = !1;
        }
      }
      a.mountLifecycle && queueMicrotask(() => {
        c() && this.isConnected && (this._mountState = "mounted", this.dispatchEvent(new Event("wippy-mounted")));
      });
    };
    if (a.rootComponent) {
      if (this._mountingApp && a.mountLifecycle) {
        queueMicrotask(() => {
          try {
            h(a);
          } catch (d) {
            c() && (this._mountState = "failed", this.emitEvent("error", { message: d instanceof Error ? d.message : String(d), error: d }));
          }
        });
        return;
      }
      try {
        h(a);
      } catch (d) {
        if (c())
          throw this._mountState = "failed", d;
      }
    } else if (a.lazyConfig) {
      const d = t.ownerDocument, u = a.lazyUi;
      u?.surface === "page" && (t.style.blockSize = "100%", t.style.minBlockSize = "0");
      let f = !1, p, g;
      const m = () => {
        clearTimeout(p), clearTimeout(g), this._feedback?.remove(), this._feedback = null;
      };
      l.signal.addEventListener("abort", m, { once: !0 });
      const b = () => {
        if (!c() || f)
          return;
        const x = u ? Zi(d, u, !1) : d.createElement("wippy-loading");
        x.setAttribute("no-bg", ""), this._feedback = x, t.appendChild(x);
      }, _ = (x) => {
        if (!c())
          return;
        f = !0, m(), this._mountState = "failed";
        const w = u?.failed ?? (x instanceof Error ? x.message : String(x)), k = u ? Zi(d, u, !0) : d.createElement("wippy-error");
        u || (k.setAttribute("title", "Failed to load"), k.setAttribute("message", w)), this._feedback = k, t.appendChild(k), this.emitEvent("error", u ? { message: w, error: x } : { message: w });
      }, y = u?.delay ?? (u?.surface === "compact" ? 200 : 0);
      y > 0 ? p = setTimeout(b, y) : b(), u && (g = setTimeout(() => _(new Error("The component did not load in time.")), u.timeout ?? 3e4)), (a.mountLifecycle ? Qi(r, a.lazyConfig) : a.lazyConfig()).then((x) => {
        !c() || f || (f = !0, m(), h(x));
      }, (x) => {
        f || _(x);
      }).catch(_);
    } else
      throw this._mountState = "failed", new Error("WippyVueElement vueConfig must provide rootComponent or lazyConfig");
  }
  onUnmount() {
    this._bridgeAbort?.abort(), this._bridgeAbort = null, this._mountState = "idle", this._feedback?.remove(), this._feedback = null;
    const i = this._vueApp;
    this._vueApp = null, i?.unmount();
  }
};
function be(i) {
  return i + 0.5 | 0;
}
const wt = (i, t, e) => Math.max(Math.min(i, e), t);
function ie(i) {
  return wt(be(i * 2.55), 0, 255);
}
function Ct(i) {
  return wt(be(i * 255), 0, 255);
}
function bt(i) {
  return wt(be(i / 2.55) / 100, 0, 1);
}
function ts(i) {
  return wt(be(i * 100), 0, 100);
}
const at = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, xi = [..."0123456789ABCDEF"], Mr = (i) => xi[i & 15], Cr = (i) => xi[(i & 240) >> 4] + xi[i & 15], ve = (i) => (i & 240) >> 4 === (i & 15), Pr = (i) => ve(i.r) && ve(i.g) && ve(i.b) && ve(i.a);
function Dr(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & at[i[1]] * 17,
    g: 255 & at[i[2]] * 17,
    b: 255 & at[i[3]] * 17,
    a: t === 5 ? at[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: at[i[1]] << 4 | at[i[2]],
    g: at[i[3]] << 4 | at[i[4]],
    b: at[i[5]] << 4 | at[i[6]],
    a: t === 9 ? at[i[7]] << 4 | at[i[8]] : 255
  })), e;
}
const Ar = (i, t) => i < 255 ? t(i) : "";
function Or(i) {
  var t = Pr(i) ? Mr : Cr;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + Ar(i.a, t) : void 0;
}
const Tr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Tn(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function Lr(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Er(i, t, e) {
  const s = Tn(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function Rr(i, t, e, s, n) {
  return i === n ? (t - e) / s + (t < e ? 6 : 0) : t === n ? (e - i) / s + 2 : (i - t) / s + 4;
}
function Oi(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = Rr(e, s, n, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function Ti(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(Ct);
}
function Li(i, t, e) {
  return Ti(Tn, i, t, e);
}
function Ir(i, t, e) {
  return Ti(Er, i, t, e);
}
function Fr(i, t, e) {
  return Ti(Lr, i, t, e);
}
function Ln(i) {
  return (i % 360 + 360) % 360;
}
function zr(i) {
  const t = Tr.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? ie(+t[5]) : Ct(+t[5]));
  const n = Ln(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = Ir(n, o, r) : t[1] === "hsv" ? s = Fr(n, o, r) : s = Li(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Vr(i, t) {
  var e = Oi(i);
  e[0] = Ln(e[0] + t), e = Li(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function Br(i) {
  if (!i)
    return;
  const t = Oi(i), e = t[0], s = ts(t[1]), n = ts(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${bt(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const es = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, is = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Nr() {
  const i = {}, t = Object.keys(is), e = Object.keys(es);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, es[o]);
    o = parseInt(is[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let we;
function Wr(i) {
  we || (we = Nr(), we.transparent = [0, 0, 0, 0]);
  const t = we[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Hr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function jr(i) {
  const t = Hr.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = t[8] ? ie(r) : wt(r * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? ie(s) : wt(s, 0, 255)), n = 255 & (t[4] ? ie(n) : wt(n, 0, 255)), o = 255 & (t[6] ? ie(o) : wt(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function $r(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${bt(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const ni = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, $t = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function Yr(i, t, e) {
  const s = $t(bt(i.r)), n = $t(bt(i.g)), o = $t(bt(i.b));
  return {
    r: Ct(ni(s + e * ($t(bt(t.r)) - s))),
    g: Ct(ni(n + e * ($t(bt(t.g)) - n))),
    b: Ct(ni(o + e * ($t(bt(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function ke(i, t, e) {
  if (i) {
    let s = Oi(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Li(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function En(i, t) {
  return i && Object.assign(t || {}, i);
}
function ss(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = Ct(i[3]))) : (t = En(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ct(t.a)), t;
}
function Ur(i) {
  return i.charAt(0) === "r" ? jr(i) : zr(i);
}
class he {
  constructor(t) {
    if (t instanceof he)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = ss(t) : e === "string" && (s = Dr(t) || Wr(t) || Ur(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = En(this._rgb);
    return t && (t.a = bt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ss(t);
  }
  rgbString() {
    return this._valid ? $r(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Or(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Br(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = s.a - n.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, s.r = 255 & c * s.r + o * n.r + 0.5, s.g = 255 & c * s.g + o * n.g + 0.5, s.b = 255 & c * s.b + o * n.b + 0.5, s.a = r * s.a + (1 - r) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = Yr(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new he(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ct(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = be(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ke(this._rgb, 2, t), this;
  }
  darken(t) {
    return ke(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ke(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ke(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Vr(this._rgb, t), this;
  }
}
function pt() {
}
const Xr = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function A(i) {
  return i == null;
}
function V(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function O(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function W(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function nt(i, t) {
  return W(i) ? i : t;
}
function C(i, t) {
  return typeof i > "u" ? t : i;
}
const Kr = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t, Rn = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function F(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function E(i, t, e, s) {
  let n, o, r;
  if (V(i))
    for (o = i.length, n = 0; n < o; n++)
      t.call(e, i[n], n);
  else if (O(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function Ve(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Be(i) {
  if (V(i))
    return i.map(Be);
  if (O(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = Be(i[e[n]]);
    return t;
  }
  return i;
}
function In(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function qr(i, t, e, s) {
  if (!In(i))
    return;
  const n = t[i], o = e[i];
  O(n) && O(o) ? de(n, o, s) : t[i] = Be(o);
}
function de(i, t, e) {
  const s = V(t) ? t : [
    t
  ], n = s.length;
  if (!O(i))
    return i;
  e = e || {};
  const o = e.merger || qr;
  let r;
  for (let a = 0; a < n; ++a) {
    if (r = s[a], !O(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function re(i, t) {
  return de(i, t, {
    merger: Gr
  });
}
function Gr(i, t, e) {
  if (!In(i))
    return;
  const s = t[i], n = e[i];
  O(s) && O(n) ? re(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Be(n));
}
const ns = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function Jr(i) {
  const t = i.split("."), e = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function Zr(i) {
  const t = Jr(i);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function Pt(i, t) {
  return (ns[t] || (ns[t] = Zr(t)))(i);
}
function Ei(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const ue = (i) => typeof i < "u", Dt = (i) => typeof i == "function", os = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Qr(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const L = Math.PI, R = 2 * L, ta = R + L, Ne = Number.POSITIVE_INFINITY, ea = L / 180, H = L / 2, Et = L / 4, rs = L * 2 / 3, kt = Math.log10, ut = Math.sign;
function ae(i, t, e) {
  return Math.abs(i - t) < e;
}
function as(i) {
  const t = Math.round(i);
  i = ae(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(kt(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function ia(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function sa(i) {
  return typeof i == "symbol" || typeof i == "object" && i !== null && !(Symbol.toPrimitive in i || "toString" in i || "valueOf" in i);
}
function Kt(i) {
  return !sa(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function na(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function Fn(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ct(i) {
  return i * (L / 180);
}
function Ri(i) {
  return i * (180 / L);
}
function ls(i) {
  if (!W(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function zn(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * L && (o += R), {
    angle: o,
    distance: n
  };
}
function yi(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function oa(i, t) {
  return (i - t + ta) % R - L;
}
function J(i) {
  return (i % R + R) % R;
}
function fe(i, t, e, s) {
  const n = J(i), o = J(t), r = J(e), a = J(o - n), l = J(r - n), c = J(n - o), h = J(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function Y(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function ra(i) {
  return Y(i, -32768, 32767);
}
function _t(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function Ii(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const xt = (i, t, e, s) => Ii(i, e, s ? (n) => {
  const o = i[n][t];
  return o < e || o === e && i[n + 1][t] === e;
} : (n) => i[n][t] < e), aa = (i, t, e) => Ii(i, e, (s) => i[s][t] >= e);
function la(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const Vn = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function ca(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Vn.forEach((e) => {
    const s = "_onData" + Ei(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function cs(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Vn.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function Bn(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Nn = (function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
})();
function Wn(i, t) {
  let e = [], s = !1;
  return function(...n) {
    e = n, s || (s = !0, Nn.call(window, () => {
      s = !1, i.apply(t, e);
    }));
  };
}
function ha(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const Fi = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", G = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, da = (i, t, e, s) => i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function Hn(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, vScale: a, _parsed: l } = i, c = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null, h = r.axis, { min: d, max: u, minDefined: f, maxDefined: p } = r.getUserBounds();
    if (f) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        xt(l, h, d).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? s : xt(t, h, r.getPixelForValue(d)).lo
      ), c) {
        const g = l.slice(0, n + 1).reverse().findIndex((m) => !A(m[a.axis]));
        n -= Math.max(0, g);
      }
      n = Y(n, 0, s - 1);
    }
    if (p) {
      let g = Math.max(
        // @ts-expect-error Need to type _parsed
        xt(l, r.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? 0 : xt(t, h, r.getPixelForValue(u), !0).hi + 1
      );
      if (c) {
        const m = l.slice(g - 1).findIndex((b) => !A(b[a.axis]));
        g += Math.max(0, m);
      }
      o = Y(g, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function jn(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
const Se = (i) => i === 0 || i === 1, hs = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * R / e)), ds = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * R / e) + 1, le = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * H) + 1,
  easeOutSine: (i) => Math.sin(i * H),
  easeInOutSine: (i) => -0.5 * (Math.cos(L * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => Se(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => Se(i) ? i : hs(i, 0.075, 0.3),
  easeOutElastic: (i) => Se(i) ? i : ds(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return Se(i) ? i : i < 0.5 ? 0.5 * hs(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * ds(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - le.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? le.easeInBounce(i * 2) * 0.5 : le.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function zi(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function us(i) {
  return zi(i) ? i : new he(i);
}
function oi(i) {
  return zi(i) ? i : new he(i).saturate(0.5).darken(0.1).hexString();
}
const ua = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], fa = [
  "color",
  "borderColor",
  "backgroundColor"
];
function pa(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: fa
    },
    numbers: {
      type: "number",
      properties: ua
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function ga(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const fs = /* @__PURE__ */ new Map();
function ma(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = fs.get(e);
  return s || (s = new Intl.NumberFormat(i, t), fs.set(e, s)), s;
}
function _e(i, t, e) {
  return ma(t, e).format(i);
}
const $n = {
  values(i) {
    return V(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = ba(i, e);
    }
    const r = kt(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), _e(i, s, l);
  },
  logarithmic(i, t, e) {
    if (i === 0)
      return "0";
    const s = e[t].significand || i / Math.pow(10, Math.floor(kt(i)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || t > 0.8 * e.length ? $n.numeric.call(this, i, t, e) : "";
  }
};
function ba(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Ue = {
  formatters: $n
};
function _a(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ue.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Wt = /* @__PURE__ */ Object.create(null), vi = /* @__PURE__ */ Object.create(null);
function ce(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function ri(i, t, e) {
  return typeof t == "string" ? de(ce(i, t), e) : de(ce(i, ""), t);
}
class xa {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => oi(n.backgroundColor), this.hoverBorderColor = (s, n) => oi(n.borderColor), this.hoverColor = (s, n) => oi(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return ri(this, t, e);
  }
  get(t) {
    return ce(this, t);
  }
  describe(t, e) {
    return ri(vi, t, e);
  }
  override(t, e) {
    return ri(Wt, t, e);
  }
  route(t, e, s, n) {
    const o = ce(this, t), r = ce(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return O(l) ? Object.assign({}, c, l) : C(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var B = /* @__PURE__ */ new xa({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  pa,
  ga,
  _a
]);
function ya(i) {
  return !i || A(i.size) || A(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function We(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function va(i, t, e, s) {
  s = s || {};
  let n = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (n = s.data = {}, o = s.garbageCollect = [], s.font = t), i.save(), i.font = t;
  let r = 0;
  const a = e.length;
  let l, c, h, d, u;
  for (l = 0; l < a; l++)
    if (d = e[l], d != null && !V(d))
      r = We(i, n, o, r, d);
    else if (V(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !V(u) && (r = We(i, n, o, r, u));
  i.restore();
  const f = o.length / 2;
  if (f > e.length) {
    for (l = 0; l < f; l++)
      delete n[o[l]];
    o.splice(0, f);
  }
  return r;
}
function Rt(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function ps(i, t) {
  !t && !i || (t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore());
}
function wi(i, t, e, s) {
  Yn(i, t, e, s, null);
}
function Yn(i, t, e, s, n) {
  let o, r, a, l, c, h, d, u;
  const f = t.pointStyle, p = t.rotation, g = t.radius;
  let m = (p || 0) * ea;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(m), i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), i.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch (i.beginPath(), f) {
      // Default includes circle
      default:
        n ? i.ellipse(e, s, n / 2, g, 0, 0, R) : i.arc(e, s, g, 0, R), i.closePath();
        break;
      case "triangle":
        h = n ? n / 2 : g, i.moveTo(e + Math.sin(m) * h, s - Math.cos(m) * g), m += rs, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g), m += rs, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * g), i.closePath();
        break;
      case "rectRounded":
        c = g * 0.516, l = g - c, r = Math.cos(m + Et) * l, d = Math.cos(m + Et) * (n ? n / 2 - c : l), a = Math.sin(m + Et) * l, u = Math.sin(m + Et) * (n ? n / 2 - c : l), i.arc(e - d, s - a, c, m - L, m - H), i.arc(e + u, s - r, c, m - H, m), i.arc(e + d, s + a, c, m, m + H), i.arc(e - u, s + r, c, m + H, m + L), i.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * g, h = n ? n / 2 : l, i.rect(e - h, s - l, 2 * h, 2 * l);
          break;
        }
        m += Et;
      /* falls through */
      case "rectRot":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, u = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + u, s - r), i.lineTo(e + d, s + a), i.lineTo(e - u, s + r), i.closePath();
        break;
      case "crossRot":
        m += Et;
      /* falls through */
      case "cross":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, u = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "star":
        d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, u = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r), m += Et, d = Math.cos(m) * (n ? n / 2 : g), r = Math.cos(m) * g, a = Math.sin(m) * g, u = Math.sin(m) * (n ? n / 2 : g), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "line":
        r = n ? n / 2 : Math.cos(m) * g, a = Math.sin(m) * g, i.moveTo(e - r, s - a), i.lineTo(e + r, s + a);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(m) * (n ? n / 2 : g), s + Math.sin(m) * g);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function yt(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function Xe(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function Ke(i) {
  i.restore();
}
function wa(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function ka(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function Sa(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), A(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function Ma(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Ca(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function Ht(i, t, e, s, n, o = {}) {
  const r = V(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, Sa(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && Ca(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), A(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), Ma(i, e, s, c, o), s += Number(n.lineHeight);
  i.restore();
}
function pe(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, 1.5 * L, L, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, L, H, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, H, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -H, !0), i.lineTo(e + r.topLeft, s);
}
const Pa = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Da = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Aa(i, t) {
  const e = ("" + i).match(Pa);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const Oa = (i) => +i || 0;
function Vi(i, t) {
  const e = {}, s = O(t), n = s ? Object.keys(t) : t, o = O(i) ? s ? (r) => C(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = Oa(o(r));
  return e;
}
function Un(i) {
  return Vi(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Bt(i) {
  return Vi(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Q(i) {
  const t = Un(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function $(i, t) {
  i = i || {}, t = t || B.font;
  let e = C(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = C(i.style, t.style);
  s && !("" + s).match(Da) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: C(i.family, t.family),
    lineHeight: Aa(C(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: C(i.weight, t.weight),
    string: ""
  };
  return n.string = ya(n), n;
}
function se(i, t, e, s) {
  let n, o, r;
  for (n = 0, o = i.length; n < o; ++n)
    if (r = i[n], r !== void 0 && r !== void 0)
      return r;
}
function Ta(i, t, e) {
  const { min: s, max: n } = i, o = Rn(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function At(i, t) {
  return Object.assign(Object.create(i), t);
}
function Bi(i, t = [
  ""
], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > "u" && (s = Gn("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (a) => Bi([
      a,
      ...i
    ], t, o, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return Kn(a, l, () => Ba(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return ms(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return ms(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = n());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function qt(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Xn(i, s),
    setContext: (o) => qt(i, o, e, s),
    override: (o) => qt(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return Kn(o, r, () => Ea(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function Xn(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: Dt(e) ? e : () => e,
    isIndexable: Dt(s) ? s : () => s
  };
}
const La = (i, t) => i ? i + Ei(t) : t, Ni = (i, t) => O(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Kn(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === "constructor")
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function Ea(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return Dt(a) && r.isScriptable(t) && (a = Ra(t, a, i, e)), V(a) && a.length && (a = Ia(t, a, i, r.isIndexable)), Ni(t, a) && (a = qt(a, n, o && o[t], r)), a;
}
function Ra(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || s);
  return a.delete(i), Ni(i, l) && (l = Wi(n._scopes, n, i, l)), l;
}
function Ia(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && s(i))
    return t[o.index % t.length];
  if (O(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Wi(c, n, i, h);
      t.push(qt(d, o, r && r[i], a));
    }
  }
  return t;
}
function qn(i, t, e) {
  return Dt(i) ? i(t, e) : i;
}
const Fa = (i, t) => i === !0 ? t : typeof i == "string" ? Pt(t, i) : void 0;
function za(i, t, e, s, n) {
  for (const o of t) {
    const r = Fa(e, o);
    if (r) {
      i.add(r);
      const a = qn(r._fallback, e, n);
      if (typeof a < "u" && a !== e && a !== s)
        return a;
    } else if (r === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function Wi(i, t, e, s) {
  const n = t._rootScopes, o = qn(t._fallback, e, s), r = [
    ...i,
    ...n
  ], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = gs(a, r, e, o || e, s);
  return l === null || typeof o < "u" && o !== e && (l = gs(a, r, o, l, s), l === null) ? !1 : Bi(Array.from(a), [
    ""
  ], n, o, () => Va(t, e, s));
}
function gs(i, t, e, s, n) {
  for (; e; )
    e = za(i, t, e, s, n);
  return e;
}
function Va(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return V(n) && O(e) ? e : n || {};
}
function Ba(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = Gn(La(o, i), e), typeof n < "u")
      return Ni(i, n) ? Wi(e, s, i, n) : n;
}
function Gn(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (typeof s < "u")
      return s;
  }
}
function ms(i) {
  let t = i._keys;
  return t || (t = i._keys = Na(i._scopes)), t;
}
function Na(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function Jn(i, t, e, s) {
  const { iScale: n } = i, { key: o = "r" } = this._parsing, r = new Array(s);
  let a, l, c, h;
  for (a = 0, l = s; a < l; ++a)
    c = a + e, h = t[c], r[a] = {
      r: n.parse(Pt(h, o), c)
    };
  return r;
}
const Wa = Number.EPSILON || 1e-14, Gt = (i, t) => t < i.length && !i[t].skip && i[t], Zn = (i) => i === "x" ? "y" : "x";
function Ha(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = yi(o, n), l = yi(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, u = s * h;
  return {
    previous: {
      x: o.x - d * (r.x - n.x),
      y: o.y - d * (r.y - n.y)
    },
    next: {
      x: o.x + u * (r.x - n.x),
      y: o.y + u * (r.y - n.y)
    }
  };
}
function ja(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Gt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Gt(i, h + 1), !(!l || !c)) {
      if (ae(t[h], 0, Wa)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function $a(i, t, e = "x") {
  const s = Zn(e), n = i.length;
  let o, r, a, l = Gt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Gt(i, c + 1), !a)
      continue;
    const h = a[e], d = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = d + o * t[c]);
  }
}
function Ya(i, t = "x") {
  const e = Zn(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Gt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Gt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? ut(n[r - 1]) !== ut(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  ja(i, n, o), $a(i, o, t);
}
function Me(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function Ua(i, t) {
  let e, s, n, o, r, a = yt(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && yt(i[e + 1], t), o && (n = i[e], r && (n.cp1x = Me(n.cp1x, t.left, t.right), n.cp1y = Me(n.cp1y, t.top, t.bottom)), a && (n.cp2x = Me(n.cp2x, t.left, t.right), n.cp2y = Me(n.cp2y, t.top, t.bottom)));
}
function Xa(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Ya(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = Ha(c, a, i[Math.min(o + 1, r - (s ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && Ua(i, e);
}
function Hi() {
  return typeof window < "u" && typeof document < "u";
}
function ji(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function He(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const qe = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function Ka(i, t) {
  return qe(i).getPropertyValue(t);
}
const qa = [
  "top",
  "right",
  "bottom",
  "left"
];
function Nt(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = qa[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Ga = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Ja(i, t) {
  const e = i.touches, s = e && e.length ? e[0] : i, { offsetX: n, offsetY: o } = s;
  let r = !1, a, l;
  if (Ga(n, o, i.target))
    a = n, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = s.clientX - c.left, l = s.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function zt(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: s } = t, n = qe(e), o = n.boxSizing === "border-box", r = Nt(n, "padding"), a = Nt(n, "border", "width"), { x: l, y: c, box: h } = Ja(i, e), d = r.left + (h && a.left), u = r.top + (h && a.top);
  let { width: f, height: p } = t;
  return o && (f -= r.width + a.width, p -= r.height + a.height), {
    x: Math.round((l - d) / f * e.width / s),
    y: Math.round((c - u) / p * e.height / s)
  };
}
function Za(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = i && ji(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = qe(o), l = Nt(a, "border", "width"), c = Nt(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = He(a.maxWidth, o, "clientWidth"), n = He(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || Ne,
    maxHeight: n || Ne
  };
}
const St = (i) => Math.round(i * 10) / 10;
function Qa(i, t, e, s) {
  const n = qe(i), o = Nt(n, "margin"), r = He(n.maxWidth, i, "clientWidth") || Ne, a = He(n.maxHeight, i, "clientHeight") || Ne, l = Za(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const u = Nt(n, "border", "width"), f = Nt(n, "padding");
    c -= f.width + u.width, h -= f.height + u.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? c / s : h - o.height), c = St(Math.min(c, r, l.maxWidth)), h = St(Math.min(h, a, l.maxHeight)), c && !h && (h = St(c / 2)), (t !== void 0 || e !== void 0) && s && l.height && h > l.height && (h = l.height, c = St(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function bs(i, t, e) {
  const s = t || 1, n = St(i.height * s), o = St(i.width * s);
  i.height = St(i.height), i.width = St(i.width);
  const r = i.canvas;
  r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`);
  const a = Math.floor(n), l = Math.floor(o);
  return i.currentDevicePixelRatio !== s || r.height !== a || r.width !== l ? (i.currentDevicePixelRatio = s, r.height = a, r.width = l, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const tl = (function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    Hi() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
})();
function _s(i, t) {
  const e = Ka(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Vt(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function el(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function il(i, t, e, s) {
  const n = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = Vt(i, n, e), a = Vt(n, o, e), l = Vt(o, t, e), c = Vt(r, a, e), h = Vt(a, l, e);
  return Vt(c, h, e);
}
const sl = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, nl = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Xt(i, t, e) {
  return i ? sl(t, e) : nl();
}
function Qn(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function to(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function eo(i) {
  return i === "angle" ? {
    between: fe,
    compare: oa,
    normalize: J
  } : {
    between: _t,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function xs({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function ol(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = eo(s), l = t.length;
  let { start: c, end: h, loop: d } = i, u, f;
  if (d) {
    for (c += l, h += l, u = 0, f = l; u < f && r(a(t[c % l][s]), n, o); ++u)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: i.style
  };
}
function io(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = eo(s), { start: h, end: d, loop: u, style: f } = ol(i, t, e), p = [];
  let g = !1, m = null, b, _, y;
  const v = () => l(n, y, b) && a(n, y) !== 0, x = () => a(o, b) === 0 || l(o, y, b), w = () => g || v(), k = () => !g || x();
  for (let S = h, M = h; S <= d; ++S)
    _ = t[S % r], !_.skip && (b = c(_[s]), b !== y && (g = l(b, n, o), m === null && w() && (m = a(b, n) === 0 ? S : M), m !== null && k() && (p.push(xs({
      start: m,
      end: S,
      loop: u,
      count: r,
      style: f
    })), m = null), M = S, y = b));
  return m !== null && p.push(xs({
    start: m,
    end: d,
    loop: u,
    count: r,
    style: f
  })), p;
}
function so(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = io(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function rl(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function al(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % n,
    end: r % n,
    loop: s
  }), o;
}
function ll(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = rl(e, n, o, s);
  if (s === !0)
    return ys(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return ys(i, al(e, r, l, c), e, t);
}
function ys(i, t, e, s) {
  return !s || !s.setContext || !e ? t : cl(i, t, e, s);
}
function cl(i, t, e, s) {
  const n = i._chart.getContext(), o = vs(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, u = d;
  function f(p, g, m, b) {
    const _ = a ? -1 : 1;
    if (p !== g) {
      for (p += l; e[p % l].skip; )
        p -= _;
      for (; e[g % l].skip; )
        g += _;
      p % l !== g % l && (c.push({
        start: p % l,
        end: g % l,
        loop: m,
        style: b
      }), h = b, d = g % l);
    }
  }
  for (const p of t) {
    d = a ? d : p.start;
    let g = e[d % l], m;
    for (u = d + 1; u <= p.end; u++) {
      const b = e[u % l];
      m = vs(s.setContext(At(n, {
        type: "segment",
        p0: g,
        p1: b,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: r
      }))), hl(m, h) && f(d, u - 1, p.loop, h), g = b, h = m;
    }
    d < u - 1 && f(d, u - 1, p.loop, h);
  }
  return c;
}
function vs(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function hl(i, t) {
  if (!t)
    return !1;
  const e = [], s = function(n, o) {
    return zi(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, s) !== JSON.stringify(t, s);
}
function Ce(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function dl(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s ? {
    left: Ce(e, t, "left"),
    right: Ce(e, t, "right"),
    top: Ce(s, t, "top"),
    bottom: Ce(s, t, "bottom")
  } : t;
}
function no(i, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const s = dl(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : s.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : s.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : s.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? i.height : s.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
class ul {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Nn.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var gt = /* @__PURE__ */ new ul();
const ws = "transparent", fl = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = us(i || ws), n = s.valid && us(t || ws);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class pl {
  constructor(t, e, s, n) {
    const o = e[s];
    n = se([
      t.to,
      n,
      o,
      t.from
    ]);
    const r = se([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || fl[t.type || typeof r], this._easing = le[t.easing] || le.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = se([
        t.to,
        e,
        n,
        t.from
      ]), this._from = se([
        t.from,
        n,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
class oo {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!O(t))
      return;
    const e = Object.keys(B.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!O(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      (V(o.properties) && o.properties || [
        n
      ]).forEach((a) => {
        (a === n || !s.has(a)) && s.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = ml(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && gl(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const u = s.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, a);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new pl(u, t, c, h), n.push(d);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return gt.add(this._chart, s), !0;
  }
}
function gl(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function ml(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function ks(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function bl(i, t, e) {
  if (e === !1)
    return !1;
  const s = ks(i, e), n = ks(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function _l(i) {
  let t, e, s, n;
  return O(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function ro(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function Ss(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t === null)
    return;
  let h = !1;
  for (r = 0, a = n.length; r < a; ++r) {
    if (l = +n[r], l === e) {
      if (h = !0, s.all)
        continue;
      break;
    }
    c = i.values[l], W(c) && (o || t === 0 || ut(t) === ut(c)) && (t += c);
  }
  return !h && !s.all ? 0 : t;
}
function xl(i, t) {
  const { iScale: e, vScale: s } = t, n = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", r = Object.keys(i), a = new Array(r.length);
  let l, c, h;
  for (l = 0, c = r.length; l < c; ++l)
    h = r[l], a[l] = {
      [n]: h,
      [o]: i[h]
    };
  return a;
}
function ai(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function yl(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function vl(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function wl(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function Ms(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function Cs(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = yl(o, r, s), d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const p = t[f], { [l]: g, [c]: m } = p, b = p._stacks || (p._stacks = {});
    u = b[c] = wl(n, h, g), u[a] = m, u._top = Ms(u, r, !0, s.type), u._bottom = Ms(u, r, !1, s.type);
    const _ = u._visualValues || (u._visualValues = {});
    _[a] = m;
  }
}
function li(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function kl(i, t) {
  return At(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Sl(i, t, e) {
  return At(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Jt(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      !o || o[s] === void 0 || o[s][e] === void 0 || (delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e]);
    }
  }
}
const ci = (i) => i === "reset" || i === "none", Ps = (i, t) => t ? i : Object.assign({}, i), Ml = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: ro(e, !0),
  values: null
};
class Ot {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ai(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Jt(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (d, u, f, p) => d === "x" ? u : d === "r" ? p : f, o = e.xAxisID = C(s.xAxisID, li(t, "x")), r = e.yAxisID = C(s.yAxisID, li(t, "y")), a = e.rAxisID = C(s.rAxisID, li(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && cs(this._data, this), t._stacked && Jt(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (O(e)) {
      const n = this._cachedMeta;
      this._data = xl(e, n);
    } else if (s !== e) {
      if (s) {
        cs(s, this);
        const n = this._cachedMeta;
        Jt(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && ca(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = ai(e.vScale, e), e.stack !== s.stack && (n = !0, Jt(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && (Cs(this, e._parsed), e._stacked = ai(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, u = n;
    else {
      V(n[t]) ? u = this.parseArrayData(s, n, t, e) : O(n[t]) ? u = this.parseObjectData(s, n, t, e) : u = this.parsePrimitiveData(s, n, t, e);
      const f = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = d = u[h], l && (f() && (l = !1), c = d);
      s._sorted = l;
    }
    r && Cs(this, u);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(n);
    let u, f, p;
    for (u = 0, f = n; u < f; ++u)
      p = u + s, d[u] = {
        [a]: h || o.parse(c[p], p),
        [l]: r.parse(e[p], p)
      };
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, d, u, f;
    for (h = 0, d = n; h < d; ++h)
      u = h + s, f = e[u], c[h] = {
        x: o.parse(Pt(f, a), u),
        y: r.parse(Pt(f, l), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: ro(n, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return Ss(a, r, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = Ss(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = Ml(e, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = vl(a);
    let u, f;
    function p() {
      f = n[u];
      const g = f[a.axis];
      return !W(f[t.axis]) || h > g || d < g;
    }
    for (u = 0; u < r && !(!p() && (this.updateRangeFromParsed(c, t, f, l), o)); ++u)
      ;
    if (o) {
      for (u = r - 1; u >= 0; --u)
        if (!p()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], W(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = _l(C(this.options.clip, bl(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = Sl(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = kl(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && ue(s);
    if (a)
      return Ps(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), f = Object.keys(B.elements[t]), p = () => this.getContext(s, n, e), g = c.resolveNamedOptions(u, f, p, d);
    return g.$shared && (g.$shared = l, o[r] = Object.freeze(Ps(g, l))), g;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, s, e));
    }
    const c = new oo(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || ci(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), n = this._sharedOptions, o = this.getSharedOptions(s), r = this.includeOptions(e, o) || o !== n;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, s, n) {
    ci(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !ci(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && Jt(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
function Cl(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = e.length; n < o; n++)
      s = s.concat(e[n].controller.getAllParsedValues(i));
    i._cache.$bar = Bn(s.sort((n, o) => n - o));
  }
  return i._cache.$bar;
}
function Pl(i) {
  const t = i.iScale, e = Cl(t, i.type);
  let s = t._length, n, o, r, a;
  const l = () => {
    r === 32767 || r === -32768 || (ue(a) && (s = Math.min(s, Math.abs(r - a) || s)), a = r);
  };
  for (n = 0, o = e.length; n < o; ++n)
    r = t.getPixelForValue(e[n]), l();
  for (a = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    r = t.getPixelForTick(n), l();
  return s;
}
function Dl(i, t, e, s) {
  const n = e.barThickness;
  let o, r;
  return A(n) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = n * s, r = 1), {
    chunk: o / s,
    ratio: r,
    start: t.pixels[i] - o / 2
  };
}
function Al(i, t, e, s) {
  const n = t.pixels, o = n[i];
  let r = i > 0 ? n[i - 1] : null, a = i < n.length - 1 ? n[i + 1] : null;
  const l = e.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
  const c = o - (o - Math.min(r, a)) / 2 * l;
  return {
    chunk: Math.abs(a - r) / 2 * l / s,
    ratio: e.barPercentage,
    start: c
  };
}
function Ol(i, t, e, s) {
  const n = e.parse(i[0], s), o = e.parse(i[1], s), r = Math.min(n, o), a = Math.max(n, o);
  let l = r, c = a;
  Math.abs(r) > Math.abs(a) && (l = a, c = r), t[e.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: n,
    end: o,
    min: r,
    max: a
  };
}
function ao(i, t, e, s) {
  return V(i) ? Ol(i, t, e, s) : t[e.axis] = e.parse(i, s), t;
}
function Ds(i, t, e, s) {
  const n = i.iScale, o = i.vScale, r = n.getLabels(), a = n === o, l = [];
  let c, h, d, u;
  for (c = e, h = e + s; c < h; ++c)
    u = t[c], d = {}, d[n.axis] = a || n.parse(r[c], c), l.push(ao(u, d, o, c));
  return l;
}
function hi(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function Tl(i, t, e) {
  return i !== 0 ? ut(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function Ll(i) {
  let t, e, s, n, o;
  return i.horizontal ? (t = i.base > i.x, e = "left", s = "right") : (t = i.base < i.y, e = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: e,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function El(i, t, e, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    i.borderSkipped = o;
    return;
  }
  if (n === !0) {
    i.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: r, end: a, reverse: l, top: c, bottom: h } = Ll(i);
  n === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === s ? n = c : (e._bottom || 0) === s ? n = h : (o[As(h, r, a, l)] = !0, n = c)), o[As(n, r, a, l)] = !0, i.borderSkipped = o;
}
function As(i, t, e, s) {
  return s ? (i = Rl(i, t, e), i = Os(i, e, t)) : i = Os(i, t, e), i;
}
function Rl(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Os(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function Il(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class Fl extends Ot {
  static id = "bar";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "base",
          "width",
          "height"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category",
        offset: !0,
        grid: {
          offset: !0
        }
      },
      _value_: {
        type: "linear",
        beginAtZero: !0
      }
    }
  };
  parsePrimitiveData(t, e, s, n) {
    return Ds(t, e, s, n);
  }
  parseArrayData(t, e, s, n) {
    return Ds(t, e, s, n);
  }
  parseObjectData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, d = [];
    let u, f, p, g;
    for (u = s, f = s + n; u < f; ++u)
      g = e[u], p = {}, p[o.axis] = o.parse(Pt(g, c), u), d.push(ao(Pt(g, h), p, r, u));
    return d;
  }
  updateRangeFromParsed(t, e, s, n) {
    super.updateRangeFromParsed(t, e, s, n);
    const o = s._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: s, vScale: n } = e, o = this.getParsed(t), r = o._custom, a = hi(r) ? "[" + r.start + ", " + r.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { index: r, _cachedMeta: { vScale: a } } = this, l = a.getBasePixel(), c = a.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, n);
    for (let f = e; f < e + s; f++) {
      const p = this.getParsed(f), g = o || A(p[a.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), m = this._calculateBarIndexPixels(f, h), b = (p._stacks || {})[a.axis], _ = {
        horizontal: c,
        base: g.base,
        enableBorderRadius: !b || hi(p._custom) || r === b._top || r === b._bottom,
        x: c ? g.head : m.center,
        y: c ? m.center : g.head,
        height: c ? m.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : m.size
      };
      u && (_.options = d || this.resolveDataElementOptions(f, t[f].active ? "active" : n));
      const y = _.options || t[f].options;
      El(_, y, b, r), Il(_, y, h.ratio), this.updateElement(t[f], f, _, n);
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), o = s.options.stacked, r = [], a = this._cachedMeta.controller.getParsed(e), l = a && a[s.axis], c = (h) => {
      const d = h._parsed.find((f) => f[s.axis] === l), u = d && d[h.vScale.axis];
      if (A(u) || isNaN(u))
        return !0;
    };
    for (const h of n)
      if (!(e !== void 0 && c(h)) && ((o === !1 || r.indexOf(h.stack) === -1 || o === void 0 && h.stack === void 0) && r.push(h.stack), h.index === t))
        break;
    return r.length || r.push(void 0), r;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, e = this.chart.options.indexAxis;
    return Object.keys(t).filter((s) => t[s].axis === e).shift();
  }
  _getAxis() {
    const t = {}, e = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[C(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, e)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, e, s) {
    const n = this._getStacks(t, s), o = e !== void 0 ? n.indexOf(e) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, s = e.iScale, n = [];
    let o, r;
    for (o = 0, r = e.data.length; o < r; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const a = t.barThickness;
    return {
      min: a || Pl(e),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: s, index: n }, options: { base: o, minBarLength: r } } = this, a = o || 0, l = this.getParsed(t), c = l._custom, h = hi(c);
    let d = l[e.axis], u = 0, f = s ? this.applyStack(e, l, s) : d, p, g;
    f !== d && (u = f - d, f = d), h && (d = c.barStart, f = c.barEnd - c.barStart, d !== 0 && ut(d) !== ut(c.barEnd) && (u = 0), u += d);
    const m = !A(o) && !h ? o : u;
    let b = e.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? p = e.getPixelForValue(u + f) : p = b, g = p - b, Math.abs(g) < r) {
      g = Tl(g, e, a) * r, d === a && (b -= g / 2);
      const _ = e.getPixelForDecimal(0), y = e.getPixelForDecimal(1), v = Math.min(_, y), x = Math.max(_, y);
      b = Math.max(Math.min(b, x), v), p = b + g, s && !h && (l._stacks[e.axis]._visualValues[n] = e.getValueForPixel(p) - e.getValueForPixel(b));
    }
    if (b === e.getPixelForValue(a)) {
      const _ = ut(g) * e.getLineWidthForValue(a) / 2;
      b += _, g -= _;
    }
    return {
      size: g,
      base: b,
      head: p,
      center: p + g / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, n = this.options, o = n.skipNull, r = C(n.maxBarThickness, 1 / 0);
    let a, l;
    const c = this._getAxisCount();
    if (e.grouped) {
      const h = o ? this._getStackCount(t) : e.stackCount, d = n.barThickness === "flex" ? Al(t, e, n, h * c) : Dl(t, e, n, h * c), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, f = this._getAxis().indexOf(C(u, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + f;
      a = d.start + d.chunk * p + d.chunk / 2, l = Math.min(r, d.chunk * d.ratio);
    } else
      a = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(r, e.min * e.ratio);
    return {
      base: a - l / 2,
      head: a + l / 2,
      center: a,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[e.axis] !== null && !s[o].hidden && s[o].draw(this._ctx);
  }
}
class zl extends Ot {
  static id = "bubble";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "borderWidth",
          "radius"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, n) {
    const o = super.parsePrimitiveData(t, e, s, n);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + s).radius;
    return o;
  }
  parseArrayData(t, e, s, n) {
    const o = super.parseArrayData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = C(a[2], this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, n) {
    const o = super.parseObjectData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = C(a && a.r && +a.r, this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let s = t.length - 1; s >= 0; --s)
      e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y), c = r._custom;
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(e, n), h = r.axis, d = a.axis;
    for (let u = e; u < e + s; u++) {
      const f = t[u], p = !o && this.getParsed(u), g = {}, m = g[h] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(p[h]), b = g[d] = o ? a.getBasePixel() : a.getPixelForValue(p[d]);
      g.skip = isNaN(m) || isNaN(b), c && (g.options = l || this.resolveDataElementOptions(u, f.active ? "active" : n), o && (g.options.radius = 0)), this.updateElement(f, u, g, n);
    }
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let n = super.resolveDataElementOptions(t, e);
    n.$shared && (n = Object.assign({}, n, {
      $shared: !1
    }));
    const o = n.radius;
    return e !== "active" && (n.radius = 0), n.radius += C(s && s._custom, o), n;
  }
}
function Vl(i, t, e) {
  let s = 1, n = 1, o = 0, r = 0;
  if (t < R) {
    const a = i, l = a + t, c = Math.cos(a), h = Math.sin(a), d = Math.cos(l), u = Math.sin(l), f = (y, v, x) => fe(y, a, l, !0) ? 1 : Math.max(v, v * e, x, x * e), p = (y, v, x) => fe(y, a, l, !0) ? -1 : Math.min(v, v * e, x, x * e), g = f(0, c, d), m = f(H, h, u), b = p(L, c, d), _ = p(L + H, h, u);
    s = (g - b) / 2, n = (m - _) / 2, o = -(g + b) / 2, r = -(m + _) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: r
  };
}
class $i extends Ot {
  static id = "doughnut";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !1
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing"
        ]
      }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    spacingMode: "angular",
    indexAxis: "r"
  };
  static descriptors = {
    _scriptable: (t) => t !== "spacing" && t !== "spacingMode",
    _indexable: (t) => t !== "spacing" && t !== "spacingMode" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data, { labels: { pointStyle: s, textAlign: n, color: o, useBorderRadius: r, borderRadius: a } } = t.legend.options;
            return e.labels.length && e.datasets.length ? e.labels.map((l, c) => {
              const d = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: d.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(c),
                lineDash: d.borderDash,
                lineDashOffset: d.borderDashOffset,
                lineJoin: d.borderJoinStyle,
                lineWidth: d.borderWidth,
                strokeStyle: d.borderColor,
                textAlign: n,
                pointStyle: s,
                borderRadius: r && (a || d.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, e, s) {
          s.chart.toggleDataVisibility(e.index), s.chart.update();
        }
      }
    }
  };
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (O(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +Pt(s[c], l);
      }
      let r, a;
      for (r = t, a = t + e; r < a; ++r)
        n._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return ct(this.options.rotation - 90);
  }
  _getCircumference() {
    return ct(this.options.circumference);
  }
  _getRotationExtents() {
    let t = R, e = -R;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), r = n._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + r);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, n = this._cachedMeta, o = n.data, r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, a = Math.max((Math.min(s.width, s.height) - r) / 2, 0), l = Math.min(Kr(this.options.cutout, a), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: f, offsetX: p, offsetY: g } = Vl(d, h, l), m = (s.width - r) / u, b = (s.height - r) / f, _ = Math.max(Math.min(m, b) / 2, 0), y = Rn(this.options.radius, _), v = Math.max(y * l, 0), x = (y - v) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * y, this.offsetY = g * y, n.total = this.calculateTotal(), this.outerRadius = y - x * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - x * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / R);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, a = r.chartArea, c = r.options.animation, h = (a.left + a.right) / 2, d = (a.top + a.bottom) / 2, u = o && c.animateScale, f = u ? 0 : this.innerRadius, p = u ? 0 : this.outerRadius, { sharedOptions: g, includeOptions: m } = this._getSharedOptions(e, n);
    let b = this._getRotation(), _;
    for (_ = 0; _ < e; ++_)
      b += this._circumference(_, o);
    for (_ = e; _ < e + s; ++_) {
      const y = this._circumference(_, o), v = t[_], x = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: b,
        endAngle: b + y,
        circumference: y,
        outerRadius: p,
        innerRadius: f
      };
      m && (x.options = g || this.resolveDataElementOptions(_, v.active ? "active" : n)), b += y, this.updateElement(v, _, x, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let s = 0, n;
    for (n = 0; n < e.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !e[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? R * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = _e(e._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let n, o, r, a, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          r = s.getDatasetMeta(n), t = r.data, a = r.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = a.resolveDataElementOptions(n), l.borderAlign !== "inner" && (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(C(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Bl extends Ot {
  static id = "line";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = Hn(e, n, r);
    this._drawStart = a, this._drawCount = l, jn(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, n), u = r.axis, f = a.axis, { spanGaps: p, segment: g } = this.options, m = Kt(p) ? p : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || n === "none", _ = e + s, y = t.length;
    let v = e > 0 && this.getParsed(e - 1);
    for (let x = 0; x < y; ++x) {
      const w = t[x], k = b ? w : {};
      if (x < e || x >= _) {
        k.skip = !0;
        continue;
      }
      const S = this.getParsed(x), M = A(S[f]), D = k[u] = r.getPixelForValue(S[u], x), P = k[f] = o || M ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, S, l) : S[f], x);
      k.skip = isNaN(D) || isNaN(P) || M, k.stop = x > 0 && Math.abs(S[u] - v[u]) > m, g && (k.parsed = S, k.raw = c.data[x]), d && (k.options = h || this.resolveDataElementOptions(x, w.active ? "active" : n)), b || this.updateElement(w, x, k, n), v = S;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class lo extends Ot {
  static id = "polarArea";
  static defaults = {
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !0
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius"
        ]
      }
    },
    indexAxis: "r",
    startAngle: 0,
    spacing: 0,
    spacingMode: "proportional"
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data;
            if (e.labels.length && e.datasets.length) {
              const { labels: { pointStyle: s, color: n } } = t.legend.options;
              return e.labels.map((o, r) => {
                const l = t.getDatasetMeta(0).controller.getStyle(r);
                return {
                  text: o,
                  fillStyle: l.backgroundColor,
                  strokeStyle: l.borderColor,
                  fontColor: n,
                  lineWidth: l.borderWidth,
                  pointStyle: s,
                  hidden: !t.getDataVisibility(r),
                  index: r
                };
              });
            }
            return [];
          }
        },
        onClick(t, e, s) {
          s.chart.toggleDataVisibility(e.index), s.chart.update();
        }
      }
    },
    scales: {
      r: {
        type: "radialLinear",
        angleLines: {
          display: !1
        },
        beginAtZero: !0,
        grid: {
          circular: !0
        },
        pointLabels: {
          display: !1
        },
        startAngle: 0
      }
    }
  };
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = _e(e._parsed[t].r, s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, s, n) {
    return Jn.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((s, n) => {
      const o = this.getParsed(n).r;
      !isNaN(o) && this.chart.getDataVisibility(n) && (o < e.min && (e.min = o), o > e.max && (e.max = o));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, s = t.options, n = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(n / 2, 0), r = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), a = (o - r) / t.getVisibleDatasetCount();
    this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, l = r.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, d = c.yCenter, u = c.getIndexAngle(0) - 0.5 * L;
    let f = u, p;
    const g = 360 / this.countVisibleElements();
    for (p = 0; p < e; ++p)
      f += this._computeAngle(p, n, g);
    for (p = e; p < e + s; p++) {
      const m = t[p];
      let b = f, _ = f + this._computeAngle(p, n, g), y = r.getDataVisibility(p) ? c.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      f = _, o && (l.animateScale && (y = 0), l.animateRotate && (b = _ = u));
      const v = {
        x: h,
        y: d,
        innerRadius: 0,
        outerRadius: y,
        startAngle: b,
        endAngle: _,
        options: this.resolveDataElementOptions(p, m.active ? "active" : n)
      };
      v.options.spacing === 0 && (v.options.spacing = this.options.spacing), v.options.spacingMode === "angular" && (v.options.spacingMode = this.options.spacingMode), this.updateElement(m, p, v, n);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((s, n) => {
      !isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && e++;
    }), e;
  }
  _computeAngle(t, e, s) {
    return this.chart.getDataVisibility(t) ? ct(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
class Nl extends $i {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
class Wl extends Ot {
  static id = "radar";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    indexAxis: "r",
    showLine: !0,
    elements: {
      line: {
        fill: "start"
      }
    }
  };
  static overrides = {
    aspectRatio: 1,
    scales: {
      r: {
        type: "radialLinear"
      }
    }
  };
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  parseObjectData(t, e, s, n) {
    return Jn.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, n = e.data || [], o = e.iScale.getLabels();
    if (s.points = n, t !== "resize") {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: o.length === n.length,
        options: r
      };
      this.updateElement(s, void 0, a, t);
    }
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, e, s, n) {
    const o = this._cachedMeta.rScale, r = n === "reset";
    for (let a = e; a < e + s; a++) {
      const l = t[a], c = this.resolveDataElementOptions(a, l.active ? "active" : n), h = o.getPointPositionForValue(a, this.getParsed(a).r), d = r ? o.xCenter : h.x, u = r ? o.yCenter : h.y, f = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(l, a, f, n);
    }
  }
}
class Hl extends Ot {
  static id = "scatter";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    showLine: !1,
    fill: !1
  };
  static overrides = {
    interaction: {
      mode: "point"
    },
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y);
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: s = [] } = e, n = this.chart._animationsDisabled;
    let { start: o, count: r } = Hn(e, s, n);
    if (this._drawStart = o, this._drawCount = r, jn(e) && (o = 0, r = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: a, _dataset: l } = e;
      a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!l._decimated, a.points = s;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(a, void 0, {
        animated: !n,
        options: c
      }, t);
    } else this.datasetElementType && (delete e.dataset, this.datasetElementType = !1);
    this.updateElements(s, o, r, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(e, n), d = this.getSharedOptions(h), u = this.includeOptions(n, d), f = r.axis, p = a.axis, { spanGaps: g, segment: m } = this.options, b = Kt(g) ? g : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || n === "none";
    let y = e > 0 && this.getParsed(e - 1);
    for (let v = e; v < e + s; ++v) {
      const x = t[v], w = this.getParsed(v), k = _ ? x : {}, S = A(w[p]), M = k[f] = r.getPixelForValue(w[f], v), D = k[p] = o || S ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, w, l) : w[p], v);
      k.skip = isNaN(M) || isNaN(D) || S, k.stop = v > 0 && Math.abs(w[f] - y[f]) > b, m && (k.parsed = w, k.raw = c.data[v]), u && (k.options = d || this.resolveDataElementOptions(v, x.active ? "active" : n)), _ || this.updateElement(x, v, k, n), y = w;
    }
    this.updateSharedOptions(d, n, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.data || [];
    if (!this.options.showLine) {
      let a = 0;
      for (let l = e.length - 1; l >= 0; --l)
        a = Math.max(a, e[l].size(this.resolveDataElementOptions(l)) / 2);
      return a > 0 && a;
    }
    const s = t.dataset, n = s.options && s.options.borderWidth || 0;
    if (!e.length)
      return n;
    const o = e[0].size(this.resolveDataElementOptions(0)), r = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(n, o, r) / 2;
  }
}
var jl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: Fl,
  BubbleController: zl,
  DoughnutController: $i,
  LineController: Bl,
  PieController: Nl,
  PolarAreaController: lo,
  RadarController: Wl,
  ScatterController: Hl
});
function It() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Yi {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Yi.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return It();
  }
  parse() {
    return It();
  }
  format() {
    return It();
  }
  add() {
    return It();
  }
  diff() {
    return It();
  }
  startOf() {
    return It();
  }
  endOf() {
    return It();
  }
}
var $l = {
  _date: Yi
};
function Yl(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale, l = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? aa : xt;
    if (s) {
      if (n._sharedOptions) {
        const h = o[0], d = typeof h.getRange == "function" && h.getRange(t);
        if (d) {
          const u = c(o, t, e - d), f = c(o, t, e + d);
          return {
            lo: u.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = c(o, t, e);
      if (l) {
        const { vScale: d } = n._cachedMeta, { _parsed: u } = i, f = u.slice(0, h.lo + 1).reverse().findIndex((g) => !A(g[d.axis]));
        h.lo -= Math.max(0, f);
        const p = u.slice(h.hi).findIndex((g) => !A(g[d.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Ge(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: u } = Yl(o[a], t, r, n);
    for (let f = d; f <= u; ++f) {
      const p = h[f];
      p.skip || s(p, c, f);
    }
  }
}
function Ul(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function di(i, t, e, s, n) {
  const o = [];
  return !n && !i.isPointInArea(t) || Ge(i, e, t, function(a, l, c) {
    !n && !yt(a, i.chartArea, 0) || a.inRange(t.x, t.y, s) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function Xl(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: d } = zn(r, {
      x: t.x,
      y: t.y
    });
    fe(d, c, h) && n.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return Ge(i, e, t, o), n;
}
function Kl(i, t, e, s, n, o) {
  let r = [];
  const a = Ul(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, n);
    if (s && !f)
      return;
    const p = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(p)) && !f)
      return;
    const m = a(t, p);
    m < l ? (r = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], l = m) : m === l && r.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return Ge(i, e, t, c), r;
}
function ui(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !s ? Xl(i, t, e, n) : Kl(i, t, e, s, n, o);
}
function Ts(i, t, e, s, n) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return Ge(i, e, t, (l, c, h) => {
    l[r] && l[r](t[e], n) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, n));
  }), s && !a ? [] : o;
}
var ql = {
  modes: {
    index(i, t, e, s) {
      const n = zt(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? di(i, n, o, s, r) : ui(i, n, o, !1, s, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, s) {
      const n = zt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? di(i, n, o, s, r) : ui(i, n, o, !1, s, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, s) {
      const n = zt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return di(i, n, o, s, r);
    },
    nearest(i, t, e, s) {
      const n = zt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return ui(i, n, o, e.intersect, s, r);
    },
    x(i, t, e, s) {
      const n = zt(t, i);
      return Ts(i, n, "x", e.intersect, s);
    },
    y(i, t, e, s) {
      const n = zt(t, i);
      return Ts(i, n, "y", e.intersect, s);
    }
  }
};
const co = [
  "left",
  "top",
  "right",
  "bottom"
];
function Zt(i, t) {
  return i.filter((e) => e.pos === t);
}
function Ls(i, t) {
  return i.filter((e) => co.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Qt(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Gl(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function Jl(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !co.includes(n))
      continue;
    const r = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function Zl(i, t) {
  const e = Jl(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function Ql(i) {
  const t = Gl(i), e = Qt(t.filter((c) => c.box.fullSize), !0), s = Qt(Zt(t, "left"), !0), n = Qt(Zt(t, "right")), o = Qt(Zt(t, "top"), !0), r = Qt(Zt(t, "bottom")), a = Ls(t, "x"), l = Ls(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: Zt(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function Es(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function ho(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function tc(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!O(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[n] += e.size;
  }
  o.getPadding && ho(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - Es(r, i, "left", "right")), l = Math.max(0, t.outerHeight - Es(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function ec(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function ic(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ne(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, ic(a.horizontal, t));
    const { same: d, other: u } = tc(t, e, a, s);
    c |= d && n.length, h = h || u, l.fullSize || n.push(a);
  }
  return c && ne(n, t, e, s) || h;
}
function Pe(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function Rs(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, u = c.size || l.height;
      ue(c.start) && (r = c.start), l.fullSize ? Pe(l, n.left, r, e.outerWidth - n.right - n.left, u) : Pe(l, t.left + c.placed, r, d, u), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, u = c.size || l.width;
      ue(c.start) && (o = c.start), l.fullSize ? Pe(l, o, n.top, u, e.outerHeight - n.bottom - n.top) : Pe(l, o, t.top + c.placed, u, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var Z = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = Q(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = Ql(i.boxes), l = a.vertical, c = a.horizontal;
    E(i.boxes, (g) => {
      typeof g.beforeLayout == "function" && g.beforeLayout();
    });
    const h = l.reduce((g, m) => m.box.options && m.box.options.display === !1 ? g : g + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), u = Object.assign({}, n);
    ho(u, Q(s));
    const f = Object.assign({
      maxPadding: u,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), p = Zl(l.concat(c), d);
    ne(a.fullSize, f, d, p), ne(l, f, d, p), ne(c, f, d, p) && ne(l, f, d, p), ec(f), Rs(a.leftAndTop, f, d, p), f.x += f.w, f.y += f.h, Rs(a.rightAndBottom, f, d, p), i.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, E(a.chartArea, (g) => {
      const m = g.box;
      Object.assign(m, i.chartArea), m.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class uo {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class sc extends uo {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ie = "$chartjs", nc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Is = (i) => i === null || i === "";
function oc(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[Ie] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Is(n)) {
    const o = _s(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Is(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = _s(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const fo = tl ? {
  passive: !0
} : !1;
function rc(i, t, e) {
  i && i.addEventListener(t, e, fo);
}
function ac(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, fo);
}
function lc(i, t) {
  const e = nc[i.type] || i.type, { x: s, y: n } = zt(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function je(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function cc(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || je(a.addedNodes, s), r = r && !je(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function hc(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || je(a.removedNodes, s), r = r && !je(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const ge = /* @__PURE__ */ new Map();
let Fs = 0;
function po() {
  const i = window.devicePixelRatio;
  i !== Fs && (Fs = i, ge.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function dc(i, t) {
  ge.size || window.addEventListener("resize", po), ge.set(i, t);
}
function uc(i) {
  ge.delete(i), ge.size || window.removeEventListener("resize", po);
}
function fc(i, t, e) {
  const s = i.canvas, n = s && ji(s);
  if (!n)
    return;
  const o = Wn((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), dc(i, o), r;
}
function fi(i, t, e) {
  e && e.disconnect(), t === "resize" && uc(i);
}
function pc(i, t, e) {
  const s = i.canvas, n = Wn((o) => {
    i.ctx !== null && e(lc(o, i));
  }, i);
  return rc(s, t, n), n;
}
class gc extends uo {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (oc(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[Ie])
      return !1;
    const s = e[Ie].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = s[o];
      A(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[Ie], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: cc,
      detach: hc,
      resize: fc
    }[e] || pc;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: fi,
      detach: fi,
      resize: fi
    }[e] || ac)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return Qa(t, e, s, n);
  }
  isAttached(t) {
    const e = t && ji(t);
    return !!(e && e.isConnected);
  }
}
function mc(i) {
  return !Hi() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? sc : gc;
}
class vt {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return Kt(this.x) && Kt(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
function bc(i, t) {
  const e = i.options.ticks, s = _c(i), n = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? yc(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > n)
    return vc(t, c, o, r / n), c;
  const h = xc(o, t, n);
  if (r > 0) {
    let d, u;
    const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (De(t, c, h, A(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++)
      De(t, c, h, o[d], o[d + 1]);
    return De(t, c, h, l, A(f) ? t.length : l + f), c;
  }
  return De(t, c, h), c;
}
function _c(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function xc(i, t, e) {
  const s = wc(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = ia(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function yc(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function vc(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function De(i, t, e, s, n) {
  const o = C(s, 0), r = Math.min(C(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function wc(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const kc = (i) => i === "left" ? "right" : i === "right" ? "left" : i, zs = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, Vs = (i, t) => Math.min(t || i, i);
function Bs(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function Sc(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function Mc(i, t) {
  E(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function te(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Ns(i, t) {
  if (!i.display)
    return 0;
  const e = $(i.font, t), s = Q(i.padding);
  return (V(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function Cc(i, t) {
  return At(i, {
    scale: t,
    type: "scale"
  });
}
function Pc(i, t, e) {
  return At(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Dc(i, t, e) {
  let s = Fi(i);
  return (e && t !== "right" || !e && t === "right") && (s = kc(s)), s;
}
function Ac(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, u, f, p;
  const g = r - n, m = a - o;
  if (i.isHorizontal()) {
    if (f = G(s, o, a), O(e)) {
      const b = Object.keys(e)[0], _ = e[b];
      p = h[b].getPixelForValue(_) + g - t;
    } else e === "center" ? p = (c.bottom + c.top) / 2 + g - t : p = zs(i, e, t);
    u = a - o;
  } else {
    if (O(e)) {
      const b = Object.keys(e)[0], _ = e[b];
      f = h[b].getPixelForValue(_) - m + t;
    } else e === "center" ? f = (c.left + c.right) / 2 - m + t : f = zs(i, e, t);
    p = G(s, r, n), d = e === "left" ? -H : H;
  }
  return {
    titleX: f,
    titleY: p,
    maxWidth: u,
    rotation: d
  };
}
class jt extends vt {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = nt(t, Number.POSITIVE_INFINITY), e = nt(e, Number.NEGATIVE_INFINITY), s = nt(s, Number.POSITIVE_INFINITY), n = nt(n, Number.NEGATIVE_INFINITY), {
      min: nt(t, s),
      max: nt(e, n),
      minDefined: W(t),
      maxDefined: W(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return {
        min: e,
        max: s
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: nt(e, nt(s, e)),
      max: nt(s, nt(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    F(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ta(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? Bs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = bc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    F(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    F(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    F(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), F(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    F(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = F(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    F(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    F(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = Vs(this.ticks.length, t.ticks.maxTicksLimit), n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, f = Y(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : f / (s - 1), d + 6 > a && (a = f / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - te(t.grid) - e.padding - Ns(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), r = Ri(Math.min(Math.asin(Y((h.highest.height + 6) / a, -1, 1)), Math.asin(Y(l / c, -1, 1)) - Math.asin(Y(u / c, -1, 1)))), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    F(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    F(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = Ns(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = te(o) + l) : (t.height = this.maxHeight, t.width = te(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), f = s.padding * 2, p = ct(this.labelRotation), g = Math.cos(p), m = Math.sin(p);
        if (a) {
          const b = s.mirror ? 0 : m * d.width + g * u.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = s.mirror ? 0 : g * d.width + m * u.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, m, g);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, f = 0;
      l ? c ? (u = n * t.width, f = s * e.height) : (u = s * t.height, f = n * e.width) : o === "start" ? f = e.width : o === "end" ? u = t.width : o !== "inner" && (u = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((u - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    F(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      A(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Bs(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / Vs(e, s));
    let c = 0, h = 0, d, u, f, p, g, m, b, _, y, v, x;
    for (d = 0; d < e; d += l) {
      if (p = t[d].label, g = this._resolveTickFontOptions(d), n.font = m = g.string, b = o[m] = o[m] || {
        data: {},
        gc: []
      }, _ = g.lineHeight, y = v = 0, !A(p) && !V(p))
        y = We(n, b.data, b.gc, y, p), v = _;
      else if (V(p))
        for (u = 0, f = p.length; u < f; ++u)
          x = p[u], !A(x) && !V(x) && (y = We(n, b.data, b.gc, y, x), v += _);
      r.push(y), a.push(v), c = Math.max(y, c), h = Math.max(v, h);
    }
    Mc(o, e);
    const w = r.indexOf(c), k = a.indexOf(h), S = (M) => ({
      width: r[M] || 0,
      height: a[M] || 0
    });
    return {
      first: S(0),
      last: S(e - 1),
      widest: S(w),
      highest: S(k),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return ra(this._alignToPixels ? Rt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = Pc(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Cc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = ct(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r, border: a } = n, l = o.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), u = te(o), f = [], p = a.setContext(this.getContext()), g = p.display ? p.width : 0, m = g / 2, b = function(j) {
      return Rt(s, j, g);
    };
    let _, y, v, x, w, k, S, M, D, P, T, U;
    if (r === "top")
      _ = b(this.bottom), k = this.bottom - u, M = _ - m, P = b(t.top) + m, U = t.bottom;
    else if (r === "bottom")
      _ = b(this.top), P = t.top, U = b(t.bottom) - m, k = _ + m, M = this.top + u;
    else if (r === "left")
      _ = b(this.right), w = this.right - u, S = _ - m, D = b(t.left) + m, T = t.right;
    else if (r === "right")
      _ = b(this.left), D = t.left, T = b(t.right) - m, w = _ + m, S = this.left + u;
    else if (e === "x") {
      if (r === "center")
        _ = b((t.top + t.bottom) / 2 + 0.5);
      else if (O(r)) {
        const j = Object.keys(r)[0], q = r[j];
        _ = b(this.chart.scales[j].getPixelForValue(q));
      }
      P = t.top, U = t.bottom, k = _ + m, M = k + u;
    } else if (e === "y") {
      if (r === "center")
        _ = b((t.left + t.right) / 2);
      else if (O(r)) {
        const j = Object.keys(r)[0], q = r[j];
        _ = b(this.chart.scales[j].getPixelForValue(q));
      }
      w = _ - m, S = w - u, D = t.left, T = t.right;
    }
    const X = C(n.ticks.maxTicksLimit, d), I = Math.max(1, Math.ceil(d / X));
    for (y = 0; y < d; y += I) {
      const j = this.getContext(y), q = o.setContext(j), Tt = a.setContext(j), Lt = q.lineWidth, it = q.color, lt = Tt.dash || [], K = Tt.dashOffset, st = q.tickWidth, N = q.tickColor, ot = q.tickBorderDash || [], rt = q.tickBorderDashOffset;
      v = Sc(this, y, l), v !== void 0 && (x = Rt(s, v, Lt), c ? w = S = D = T = x : k = M = P = U = x, f.push({
        tx1: w,
        ty1: k,
        tx2: S,
        ty2: M,
        x1: D,
        y1: P,
        x2: T,
        y2: U,
        width: Lt,
        color: it,
        borderDash: lt,
        borderDashOffset: K,
        tickWidth: st,
        tickColor: N,
        tickBorderDash: ot,
        tickBorderDashOffset: rt
      }));
    }
    return this._ticksLength = d, this._borderValue = _, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, u = te(s.grid), f = u + h, p = d ? -h : f, g = -ct(this.labelRotation), m = [];
    let b, _, y, v, x, w, k, S, M, D, P, T, U = "middle";
    if (n === "top")
      w = this.bottom - p, k = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      w = this.top + p, k = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const I = this._getYAxisLabelAlignment(u);
      k = I.textAlign, x = I.x;
    } else if (n === "right") {
      const I = this._getYAxisLabelAlignment(u);
      k = I.textAlign, x = I.x;
    } else if (e === "x") {
      if (n === "center")
        w = (t.top + t.bottom) / 2 + f;
      else if (O(n)) {
        const I = Object.keys(n)[0], j = n[I];
        w = this.chart.scales[I].getPixelForValue(j) + f;
      }
      k = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        x = (t.left + t.right) / 2 - f;
      else if (O(n)) {
        const I = Object.keys(n)[0], j = n[I];
        x = this.chart.scales[I].getPixelForValue(j);
      }
      k = this._getYAxisLabelAlignment(u).textAlign;
    }
    e === "y" && (l === "start" ? U = "top" : l === "end" && (U = "bottom"));
    const X = this._getLabelSizes();
    for (b = 0, _ = a.length; b < _; ++b) {
      y = a[b], v = y.label;
      const I = o.setContext(this.getContext(b));
      S = this.getPixelForTick(b) + o.labelOffset, M = this._resolveTickFontOptions(b), D = M.lineHeight, P = V(v) ? v.length : 1;
      const j = P / 2, q = I.color, Tt = I.textStrokeColor, Lt = I.textStrokeWidth;
      let it = k;
      r ? (x = S, k === "inner" && (b === _ - 1 ? it = this.options.reverse ? "left" : "right" : b === 0 ? it = this.options.reverse ? "right" : "left" : it = "center"), n === "top" ? c === "near" || g !== 0 ? T = -P * D + D / 2 : c === "center" ? T = -X.highest.height / 2 - j * D + D : T = -X.highest.height + D / 2 : c === "near" || g !== 0 ? T = D / 2 : c === "center" ? T = X.highest.height / 2 - j * D : T = X.highest.height - P * D, d && (T *= -1), g !== 0 && !I.showLabelBackdrop && (x += D / 2 * Math.sin(g))) : (w = S, T = (1 - P) * D / 2);
      let lt;
      if (I.showLabelBackdrop) {
        const K = Q(I.backdropPadding), st = X.heights[b], N = X.widths[b];
        let ot = T - K.top, rt = 0 - K.left;
        switch (U) {
          case "middle":
            ot -= st / 2;
            break;
          case "bottom":
            ot -= st;
            break;
        }
        switch (k) {
          case "center":
            rt -= N / 2;
            break;
          case "right":
            rt -= N;
            break;
          case "inner":
            b === _ - 1 ? rt -= N : b > 0 && (rt -= N / 2);
            break;
        }
        lt = {
          left: rt,
          top: ot,
          width: N + K.width,
          height: st + K.height,
          color: I.backdropColor
        };
      }
      m.push({
        label: v,
        font: M,
        textOffset: T,
        options: {
          rotation: g,
          color: q,
          strokeColor: Tt,
          strokeWidth: Lt,
          textAlign: it,
          textBaseline: U,
          translation: [
            x,
            w
          ],
          backdrop: lt
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-ct(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" ? n = "right" : e.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), r = s.display ? o.width : 0;
    if (!r)
      return;
    const a = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = Rt(t, this.left, r) - r / 2, h = Rt(t, this.right, a) + a / 2, d = u = l) : (d = Rt(t, this.top, r) - r / 2, u = Rt(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, d), e.lineTo(h, u), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && Xe(s, n);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      Ht(s, c, 0, h, l, a);
    }
    n && Ke(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = $(s.font), r = Q(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || O(e) ? (l += r.bottom, V(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = Ac(this, l, e, a);
    Ht(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: u,
      textAlign: Dc(a, e, n),
      textBaseline: "middle",
      translation: [
        c,
        h
      ],
      strokeColor: s.strokeColor,
      strokeWidth: s.strokeWidth
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = C(t.grid && t.grid.z, -1), n = C(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== jt.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return $(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Ae {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Lc(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Oc(t, r, s), this.override && B.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in B[n] && (delete B[n][s], this.override && delete Wt[s]);
  }
}
function Oc(i, t, e) {
  const s = de(/* @__PURE__ */ Object.create(null), [
    e ? B.get(e) : {},
    B.get(t),
    i.defaults
  ]);
  B.set(t, s), i.defaultRoutes && Tc(t, i.defaultRoutes), i.descriptors && B.describe(t, i.descriptors);
}
function Tc(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [
      i
    ].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    B.route(o, n, l, a);
  });
}
function Lc(i) {
  return "id" in i && "defaults" in i;
}
class Ec {
  constructor() {
    this.controllers = new Ae(Ot, "datasets", !0), this.elements = new Ae(vt, "elements"), this.plugins = new Ae(Object, "plugins"), this.scales = new Ae(jt, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : E(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = Ei(t);
    F(s["before" + n], [], s), e[t](s), F(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var dt = /* @__PURE__ */ new Ec();
class Rc {
  constructor() {
    this._init = void 0;
  }
  notify(t, e, s, n) {
    if (e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [
        e,
        n,
        o.options
      ];
      if (F(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    A(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = C(s.options && s.options.plugins, {}), o = Ic(s);
    return n === !1 && !e ? [] : zc(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function Ic(i) {
  const t = {}, e = [], s = Object.keys(dt.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(dt.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function Fc(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function zc(i, { plugins: t, localIds: e }, s, n) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = Fc(s[l], n);
    c !== null && o.push({
      plugin: a,
      options: Vc(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function Vc(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(s, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ki(i, t) {
  const e = B.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function Bc(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Nc(i, t) {
  return i === t ? "_index_" : "_value_";
}
function Ws(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function Wc(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function Si(i, ...t) {
  if (Ws(i))
    return i;
  for (const e of t) {
    const s = e.axis || Wc(e.position) || i.length > 1 && Ws(i[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function Hs(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function Hc(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length)
      return Hs(i, "x", e[0]) || Hs(i, "y", e[0]);
  }
  return {};
}
function jc(i, t) {
  const e = Wt[i.type] || {
    scales: {}
  }, s = t.scales || {}, n = ki(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((r) => {
    const a = s[r];
    if (!O(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = Si(r, a, Hc(r, i), B.scales[a.type]), c = Nc(l, n), h = e.scales || {};
    o[r] = re(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || ki(a, t), h = (Wt[a] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = Bc(d, l), f = r[u + "AxisID"] || u;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), re(o[f], [
        {
          axis: u
        },
        s[f],
        h[d]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    re(a, [
      B.scales[a.type],
      B.scale
    ]);
  }), o;
}
function go(i) {
  const t = i.options || (i.options = {});
  t.plugins = C(t.plugins, {}), t.scales = jc(i, t);
}
function mo(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function $c(i) {
  return i = i || {}, i.data = mo(i.data), go(i), i;
}
const js = /* @__PURE__ */ new Map(), bo = /* @__PURE__ */ new Set();
function Oe(i, t) {
  let e = js.get(i);
  return e || (e = t(), js.set(i, e), bo.add(e)), e;
}
const ee = (i, t, e) => {
  const s = Pt(t, e);
  s !== void 0 && i.add(s);
};
class Yc {
  constructor(t) {
    this._config = $c(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = mo(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), go(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Oe(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return Oe(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return Oe(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return Oe(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => ee(l, t, d))), h.forEach((d) => ee(l, n, d)), h.forEach((d) => ee(l, Wt[o] || {}, d)), h.forEach((d) => ee(l, B, d)), h.forEach((d) => ee(l, vi, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), bo.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      Wt[e] || {},
      B.datasets[e] || {},
      {
        type: e
      },
      B,
      vi
    ];
  }
  resolveNamedOptions(t, e, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = $s(this._resolverCache, t, n);
    let l = r;
    if (Xc(r, e)) {
      o.$shared = !1, s = Dt(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = qt(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], n) {
    const { resolver: o } = $s(this._resolverCache, t, s);
    return O(e) ? qt(o, e, void 0, n) : o;
  }
}
function $s(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: Bi(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const Uc = (i) => O(i) && Object.getOwnPropertyNames(i).some((t) => Dt(i[t]));
function Xc(i, t) {
  const { isScriptable: e, isIndexable: s } = Xn(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (Dt(a) || Uc(a)) || r && V(a))
      return !0;
  }
  return !1;
}
var Kc = "4.6.1";
const qc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Ys(i, t) {
  return i === "top" || i === "bottom" || qc.indexOf(i) === -1 && t === "x";
}
function Us(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function Xs(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), F(e && e.onComplete, [
    i
  ], t);
}
function Gc(i) {
  const t = i.chart, e = t.options.animation;
  F(e && e.onProgress, [
    i
  ], t);
}
function _o(i) {
  return Hi() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const Fe = {}, Ks = (i) => {
  const t = _o(i);
  return Object.values(Fe).filter((e) => e.canvas === t).pop();
};
function Jc(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function Zc(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
class ze {
  static defaults = B;
  static instances = Fe;
  static overrides = Wt;
  static registry = dt;
  static version = Kc;
  static getChart = Ks;
  static register(...t) {
    dt.add(...t), qs();
  }
  static unregister(...t) {
    dt.remove(...t), qs();
  }
  constructor(t, e) {
    const s = this.config = new Yc(e), n = _o(t), o = Ks(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || mc(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = Xr(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Rc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ha((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], Fe[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    gt.listen(this, "complete", Xs), gt.listen(this, "progress", Gc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return A(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return dt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : bs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ps(this.canvas, this.ctx), this;
  }
  stop() {
    return gt.stop(this), this;
  }
  resize(t, e) {
    gt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, bs(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), F(s.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    E(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = Si(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), E(o, (r) => {
      const a = r.options, l = a.id, c = Si(l, a), h = C(a.type, r.dtype);
      (a.position === void 0 || Ys(a.position, c) !== Ys(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const u = dt.getScale(h);
        d = new u({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(a, t);
    }), E(n, (r, a) => {
      r || delete s[a];
    }), E(s, (r) => {
      Z.configure(this, r, r.options), Z.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(Us("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || ki(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = dt.getController(a), { datasetElementType: c, dataElementType: h } = B.datasets[a];
        Object.assign(l, {
          dataElementType: dt.getElement(h),
          datasetElementType: c && dt.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    E(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !n && o.indexOf(d) === -1;
      d.buildOrUpdateElements(u), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || E(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Us("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    E(this.scales, (t) => {
      Z.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!os(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      Jc(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), n = s(0);
    for (let o = 1; o < e; o++)
      if (!os(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Z.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], E(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, Dt(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (gt.has(this) ? this.attached && !gt.running(this) && gt.start(this) : (this.draw(), Xs({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = no(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && Xe(e, n), t.controller.draw(), n && Ke(e), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return yt(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = ql.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = At(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    ue(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, {
      visible: s
    }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), gt.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ps(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete Fe[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    E(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    E(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, E(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !Ve(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = Qr(t), c = Zc(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, F(o.onHover, [
      t,
      a,
      this
    ], this), l && F(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !Ve(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
function qs() {
  return E(ze.instances, (i) => i._plugins.invalidate());
}
function Qc(i, t, e) {
  const { startAngle: s, x: n, y: o, outerRadius: r, innerRadius: a, options: l } = t, { borderWidth: c, borderJoinStyle: h } = l, d = Math.min(c / r, J(s - e));
  if (i.beginPath(), i.arc(n, o, r - c / 2, s + d / 2, e - d / 2), a > 0) {
    const u = Math.min(c / a, J(s - e));
    i.arc(n, o, a + c / 2, e - u / 2, s + u / 2, !0);
  } else {
    const u = Math.min(c / 2, r * J(s - e));
    if (h === "round")
      i.arc(n, o, u, e - L / 2, s + L / 2, !0);
    else if (h === "bevel") {
      const f = 2 * u * u, p = -f * Math.cos(e + L / 2) + n, g = -f * Math.sin(e + L / 2) + o, m = f * Math.cos(s + L / 2) + n, b = f * Math.sin(s + L / 2) + o;
      i.lineTo(p, g), i.lineTo(m, b);
    }
  }
  i.closePath(), i.moveTo(0, 0), i.rect(0, 0, i.canvas.width, i.canvas.height), i.clip("evenodd");
}
function th(i, t, e) {
  const { startAngle: s, pixelMargin: n, x: o, y: r, outerRadius: a, innerRadius: l } = t;
  let c = n / a;
  i.beginPath(), i.arc(o, r, a, s - c, e + c), l > n ? (c = n / l, i.arc(o, r, l, e + c, s - c, !0)) : i.arc(o, r, n, e + H, s - H), i.closePath(), i.clip();
}
function eh(i) {
  return Vi(i, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function ih(i, t, e, s) {
  const n = eh(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, s * t / 2), a = (l) => {
    const c = (e - Math.min(o, l)) * s / 2;
    return Y(l, 0, Math.min(o, c));
  };
  return {
    outerStart: a(n.outerStart),
    outerEnd: a(n.outerEnd),
    innerStart: Y(n.innerStart, 0, r),
    innerEnd: Y(n.innerEnd, 0, r)
  };
}
function Yt(i, t, e, s) {
  return {
    x: e + i * Math.cos(t),
    y: s + i * Math.sin(t)
  };
}
function sh(i, t, e, s) {
  const { x: n, y: o, startAngle: r, pixelMargin: a, innerRadius: l } = t, c = Math.max(t.outerRadius + s + e - a, 0), h = l > 0 ? l + s + e + a : 0;
  i.beginPath(), i.arc(n, o, c, r, r + R), h > 0 && (i.moveTo(n + Math.cos(r) * h, o + Math.sin(r) * h), i.arc(n, o, h, r + R, r, !0)), i.closePath();
}
function $e(i, t, e, s, n, o) {
  const { x: r, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t, { spacingMode: d = "angular" } = t.options, u = n - l;
  if (o && t.options.selfJoin && Math.abs(u) >= R - 1e-4) {
    sh(i, t, e, s);
    return;
  }
  const f = Math.max(t.outerRadius + s + e - c, 0);
  let p = h > 0 ? h + s + e + c : 0, g = 0, m = 0;
  const b = f > 0 ? Math.max(1e-3, u * f - e / L) / f : 1e-3, _ = (u - b) / 2;
  if (s) {
    const it = h > 0 ? h - s : 0, lt = f > 0 ? f - s : 0, K = (it + lt) / 2, st = (() => {
      const ti = K !== 0 ? u * K / (K + s) : u;
      return (u - ti) / 2;
    })(), N = K > 0 ? Math.asin(Math.min(1, s / K)) : 0, ot = Math.max(0, b / 2 - 1e-3), rt = Math.sin(ot);
    if (d === "parallel") {
      if (p === 0 && rt > 0) {
        const Oo = s / rt, To = Math.max(0, f - 1e-3);
        p = Math.min(Oo, To);
      }
      const ti = Math.min(f > 0 ? f * rt : Number.POSITIVE_INFINITY, p > 0 ? p * rt : Number.POSITIVE_INFINITY), Xi = Math.min(s, ti);
      g = f > 0 ? Math.asin(Math.min(1, Xi / f)) : Math.min(ot, N), m = p > 0 ? Math.asin(Math.min(1, Xi / p)) : g;
    } else d === "proportional" ? (g = Math.min(ot, st), m = Math.min(ot, st)) : (g = Math.min(ot, N), m = Math.min(ot, N));
  }
  const y = l + _ + g, v = n - _ - g, x = l + _ + m, w = n - _ - m, k = Math.min(v - y, w - x), { outerStart: S, outerEnd: M, innerStart: D, innerEnd: P } = ih(t, p, f, k), T = f - S, U = f - M, X = y + S / T, I = v - M / U, j = p + D, q = p + P, Tt = x + D / j, Lt = w - P / q;
  if (i.beginPath(), o) {
    const it = (X + I) / 2;
    if (i.arc(r, a, f, X, it), i.arc(r, a, f, it, I), M > 0) {
      const N = Yt(U, I, r, a);
      i.arc(N.x, N.y, M, I, v + H);
    }
    const lt = Yt(q, w, r, a);
    if (i.lineTo(lt.x, lt.y), P > 0) {
      const N = Yt(q, Lt, r, a);
      i.arc(N.x, N.y, P, w + H, Lt + Math.PI);
    }
    const K = (w - P / p + (x + D / p)) / 2;
    if (i.arc(r, a, p, w - P / p, K, !0), i.arc(r, a, p, K, x + D / p, !0), D > 0) {
      const N = Yt(j, Tt, r, a);
      i.arc(N.x, N.y, D, Tt + Math.PI, x - H);
    }
    const st = Yt(T, y, r, a);
    if (i.lineTo(st.x, st.y), S > 0) {
      const N = Yt(T, X, r, a);
      i.arc(N.x, N.y, S, y - H, X);
    }
  } else {
    i.moveTo(r, a);
    const it = Math.cos(X) * f + r, lt = Math.sin(X) * f + a;
    i.lineTo(it, lt);
    const K = Math.cos(I) * f + r, st = Math.sin(I) * f + a;
    i.lineTo(K, st);
  }
  i.closePath();
}
function nh(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a } = t;
  let l = t.endAngle;
  if (o) {
    $e(i, t, e, s, l, n);
    for (let c = 0; c < o; ++c)
      i.fill();
    isNaN(a) || (l = r + (a % R || R));
  }
  return $e(i, t, e, s, l, n), i.fill(), l;
}
function oh(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u, borderRadius: f } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  i.setLineDash(d || []), i.lineDashOffset = u, p ? (i.lineWidth = c * 2, i.lineJoin = h || "round") : (i.lineWidth = c, i.lineJoin = h || "bevel");
  let g = t.endAngle;
  const m = Math.abs(g - r) >= R - 1e-4;
  if (o) {
    $e(i, t, e, s, g, n);
    for (let _ = 0; _ < o; ++_)
      i.stroke();
    isNaN(a) || (g = r + (a % R || R));
  }
  p && th(i, t, g), !(m && t.innerRadius > 0) && l.selfJoin && g - r >= L && f === 0 && h !== "miter" && Qc(i, t, g), o || ($e(i, t, e, s, g, n), i.stroke());
}
class rh extends vt {
  static id = "arc";
  static defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    spacingMode: "angular",
    angle: void 0,
    circular: !0,
    selfJoin: !1
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash"
  };
  circumference;
  endAngle;
  fullCircles;
  innerRadius;
  outerRadius;
  pixelMargin;
  startAngle;
  circular;
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, this.circular = !1, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: r } = zn(n, {
      x: t,
      y: e
    }), { startAngle: a, endAngle: l, innerRadius: c, outerRadius: h, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), u = (this.options.spacing + this.options.borderWidth) / 2, f = C(d, l - a), p = fe(o, a, l) && a !== l, g = f >= R || p, m = _t(r, c + u, h + u);
    return g && m;
  }
  getCenterPoint(t) {
    const { x: e, y: s, startAngle: n, endAngle: o, innerRadius: r, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, h = (n + o) / 2, d = (r + a + c + l) / 2;
    return {
      x: e + Math.cos(h) * d,
      y: s + Math.sin(h) * d
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: e, circumference: s } = this, n = (e.offset || 0) / 4, o = (e.spacing || 0) / 2, r = e.circular;
    if (this.pixelMargin = e.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > R ? Math.floor(s / R) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const a = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(a) * n, Math.sin(a) * n);
    const l = 1 - Math.sin(Math.min(L, s || 0)), c = n * l;
    t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor, nh(t, this, c, o, r), oh(t, this, c, o, r), t.restore();
  }
}
function xo(i, t, e = t) {
  i.lineCap = C(e.borderCapStyle, t.borderCapStyle), i.setLineDash(C(e.borderDash, t.borderDash)), i.lineDashOffset = C(e.borderDashOffset, t.borderDashOffset), i.lineJoin = C(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = C(e.borderWidth, t.borderWidth), i.strokeStyle = C(e.borderColor, t.borderColor);
}
function ah(i, t, e) {
  i.lineTo(e.x, e.y);
}
function lh(i) {
  return i.stepped ? wa : i.tension || i.cubicInterpolationMode === "monotone" ? ka : ah;
}
function yo(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function ch(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = yo(n, e, s), h = lh(o);
  let { move: d = !0, reverse: u } = s || {}, f, p, g;
  for (f = 0; f <= c; ++f)
    p = n[(a + (u ? c - f : f)) % r], !p.skip && (d ? (i.moveTo(p.x, p.y), d = !1) : h(i, g, p, u, o.stepped), g = p);
  return l && (p = n[(a + (u ? c : 0)) % r], h(i, g, p, u, o.stepped)), !!l;
}
function hh(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = yo(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, u, f, p, g, m, b;
  const _ = (v) => (r + (c ? a - v : v)) % o, y = () => {
    g !== m && (i.lineTo(h, m), i.lineTo(h, g), i.lineTo(h, b));
  };
  for (l && (f = n[_(0)], i.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
    if (f = n[_(u)], f.skip)
      continue;
    const v = f.x, x = f.y, w = v | 0;
    w === p ? (x < g ? g = x : x > m && (m = x), h = (d * h + v) / ++d) : (y(), i.lineTo(v, x), p = w, d = 0, g = m = x), b = x;
  }
  y();
}
function Mi(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? hh : ch;
}
function dh(i) {
  return i.stepped ? el : i.tension || i.cubicInterpolationMode === "monotone" ? il : Vt;
}
function uh(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), xo(i, t.options), i.stroke(n);
}
function fh(i, t, e, s) {
  const { segments: n, options: o } = t, r = Mi(t);
  for (const a of n)
    xo(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + s - 1
    }) && i.closePath(), i.stroke();
}
const ph = typeof Path2D == "function";
function gh(i, t, e, s) {
  ph && !t.options.segment ? uh(i, t, e, s) : fh(i, t, e, s);
}
class Je extends vt {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash" && t !== "fill"
  };
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      Xa(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ll(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = so(this, {
      property: e,
      start: n,
      end: n
    });
    if (!r.length)
      return;
    const a = [], l = dh(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: u } = r[c], f = o[d], p = o[u];
      if (f === p) {
        a.push(f);
        continue;
      }
      const g = Math.abs((n - f[e]) / (p[e] - f[e])), m = l(f, p, g, s.stepped);
      m[e] = t[e], a.push(m);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return Mi(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = Mi(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, {
        start: e,
        end: e + s - 1
      });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), gh(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Gs(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([
    e
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class mh extends vt {
  static id = "point";
  parsed;
  skip;
  stop;
  /**
  * @type {any}
  */
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  };
  /**
  * @type {any}
  */
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.options, { x: o, y: r } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(t - o, 2) + Math.pow(e - r, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, e) {
    return Gs(this, t, "x", e);
  }
  inYRange(t, e) {
    return Gs(this, t, "y", e);
  }
  getCenterPoint(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  size(t) {
    t = t || this.options || {};
    let e = t.radius || 0;
    e = Math.max(e, e && t.hoverRadius || 0);
    const s = e && t.borderWidth || 0;
    return (e + s) * 2;
  }
  draw(t, e) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !yt(this, e, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, wi(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function vo(i, t) {
  const { x: e, y: s, base: n, width: o, height: r } = i.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let a, l, c, h, d;
  return i.horizontal ? (d = r / 2, a = Math.min(e, n), l = Math.max(e, n), c = s - d, h = s + d) : (d = o / 2, a = e - d, l = e + d, c = Math.min(s, n), h = Math.max(s, n)), {
    left: a,
    top: c,
    right: l,
    bottom: h
  };
}
function Mt(i, t, e, s) {
  return i ? 0 : Y(t, e, s);
}
function bh(i, t, e) {
  const s = i.options.borderWidth, n = i.borderSkipped, o = Un(s);
  return {
    t: Mt(n.top, o.top, 0, e),
    r: Mt(n.right, o.right, 0, t),
    b: Mt(n.bottom, o.bottom, 0, e),
    l: Mt(n.left, o.left, 0, t)
  };
}
function _h(i, t, e) {
  const { enableBorderRadius: s } = i.getProps([
    "enableBorderRadius"
  ]), n = i.options.borderRadius, o = Bt(n), r = Math.min(t, e), a = i.borderSkipped, l = s || O(n);
  return {
    topLeft: Mt(!l || a.top || a.left, o.topLeft, 0, r),
    topRight: Mt(!l || a.top || a.right, o.topRight, 0, r),
    bottomLeft: Mt(!l || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: Mt(!l || a.bottom || a.right, o.bottomRight, 0, r)
  };
}
function xh(i) {
  const t = vo(i), e = t.right - t.left, s = t.bottom - t.top, n = bh(i, e / 2, s / 2), o = _h(i, e / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function pi(i, t, e, s) {
  const n = t === null, o = e === null, a = i && !(n && o) && vo(i, s);
  return a && (n || _t(t, a.left, a.right)) && (o || _t(e, a.top, a.bottom));
}
function yh(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function vh(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function gi(i, t, e = {}) {
  const s = i.x !== e.x ? -t : 0, n = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - s, r = (i.y + i.h !== e.y + e.h ? t : 0) - n;
  return {
    x: i.x + s,
    y: i.y + n,
    w: i.w + o,
    h: i.h + r,
    radius: i.radius
  };
}
class wh extends vt {
  static id = "bar";
  static defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: r } = xh(this), a = yh(r.radius) ? pe : vh;
    t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, gi(r, e, o)), t.clip(), a(t, gi(o, -e, r)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), a(t, gi(o, e)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return pi(this, t, e, s);
  }
  inXRange(t, e) {
    return pi(this, t, null, e);
  }
  inYRange(t, e) {
    return pi(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: s, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (e + n) / 2 : e,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
var kh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: rh,
  BarElement: wh,
  LineElement: Je,
  PointElement: mh
});
const Ci = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Js = /* @__PURE__ */ Ci.map((i) => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function wo(i) {
  return Ci[i % Ci.length];
}
function ko(i) {
  return Js[i % Js.length];
}
function Sh(i, t) {
  return i.borderColor = wo(t), i.backgroundColor = ko(t), ++t;
}
function Mh(i, t) {
  return i.backgroundColor = i.data.map(() => wo(t++)), t;
}
function Ch(i, t) {
  return i.backgroundColor = i.data.map(() => ko(t++)), t;
}
function Ph(i) {
  let t = 0;
  return (e, s) => {
    const n = i.getDatasetMeta(s).controller;
    n instanceof $i ? t = Mh(e, t) : n instanceof lo ? t = Ch(e, t) : n && (t = Sh(e, t));
  };
}
function Zs(i) {
  let t;
  for (t in i)
    if (i[t].borderColor || i[t].backgroundColor)
      return !0;
  return !1;
}
function Dh(i) {
  return i && (i.borderColor || i.backgroundColor);
}
function Ah() {
  return B.borderColor !== "rgba(0,0,0,0.1)" || B.backgroundColor !== "rgba(0,0,0,0.1)";
}
var Oh = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(i, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: s }, options: n } = i.config, { elements: o } = n, r = Zs(s) || Dh(n) || o && Zs(o) || Ah();
    if (!e.forceOverride && r)
      return;
    const a = Ph(i);
    s.forEach(a);
  }
};
function Th(i, t, e, s, n) {
  const o = n.samples || s;
  if (o >= e)
    return i.slice(t, t + e);
  const r = [], a = (e - 2) / (o - 2);
  let l = 0;
  const c = t + e - 1;
  let h = t, d, u, f, p, g;
  for (r[l++] = i[h], d = 0; d < o - 2; d++) {
    let m = 0, b = 0, _;
    const y = Math.floor((d + 1) * a) + 1 + t, v = Math.min(Math.floor((d + 2) * a) + 1, e) + t, x = v - y;
    for (_ = y; _ < v; _++)
      m += i[_].x, b += i[_].y;
    m /= x, b /= x;
    const w = Math.floor(d * a) + 1 + t, k = Math.min(Math.floor((d + 1) * a) + 1, e) + t, { x: S, y: M } = i[h];
    for (f = p = -1, _ = w; _ < k; _++)
      p = 0.5 * Math.abs((S - m) * (i[_].y - M) - (S - i[_].x) * (b - M)), p > f && (f = p, u = i[_], g = _);
    r[l++] = u, h = g;
  }
  return r[l++] = i[c], r;
}
function Lh(i, t, e, s) {
  let n = 0, o = 0, r, a, l, c, h, d, u, f, p, g;
  const m = [], b = t + e - 1, _ = i[t].x, v = i[b].x - _;
  for (r = t; r < t + e; ++r) {
    a = i[r], l = (a.x - _) / v * s, c = a.y;
    const x = l | 0;
    if (x === h)
      c < p ? (p = c, d = r) : c > g && (g = c, u = r), n = (o * n + a.x) / ++o;
    else {
      const w = r - 1;
      if (!A(d) && !A(u)) {
        const k = Math.min(d, u), S = Math.max(d, u);
        k !== f && k !== w && m.push({
          ...i[k],
          x: n
        }), S !== f && S !== w && m.push({
          ...i[S],
          x: n
        });
      }
      r > 0 && w !== f && m.push(i[w]), m.push(a), h = x, o = 0, p = g = c, d = u = f = r;
    }
  }
  return m;
}
function So(i) {
  if (i._decimated) {
    const t = i._data;
    delete i._decimated, delete i._data, Object.defineProperty(i, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function Qs(i) {
  i.data.datasets.forEach((t) => {
    So(t);
  });
}
function Eh(i, t) {
  const e = t.length;
  let s = 0, n;
  const { iScale: o } = i, { min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (s = Y(xt(t, o.axis, r).lo, 0, e - 1)), c ? n = Y(xt(t, o.axis, a).hi + 1, s, e) - s : n = e - s, {
    start: s,
    count: n
  };
}
var Rh = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (i, t, e) => {
    if (!e.enabled) {
      Qs(i);
      return;
    }
    const s = i.width;
    i.data.datasets.forEach((n, o) => {
      const { _data: r, indexAxis: a } = n, l = i.getDatasetMeta(o), c = r || n.data;
      if (se([
        a,
        i.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = i.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || i.options.parsing)
        return;
      let { start: d, count: u } = Eh(l, c);
      const f = e.threshold || 4 * s;
      if (u <= f) {
        So(n);
        return;
      }
      A(r) && (n._data = c, delete n.data, Object.defineProperty(n, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(g) {
          this._data = g;
        }
      }));
      let p;
      switch (e.algorithm) {
        case "lttb":
          p = Th(c, d, u, s, e);
          break;
        case "min-max":
          p = Lh(c, d, u, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      n._decimated = p;
    });
  },
  destroy(i) {
    Qs(i);
  }
};
function Ih(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = Ze(l, c, n);
    const h = Pi(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const d = so(t, h);
    for (const u of d) {
      const f = Pi(e, o[u.start], o[u.end], u.loop), p = io(a, n, f);
      for (const g of p)
        r.push({
          source: g,
          target: u,
          start: {
            [e]: tn(h, f, "start", Math.max)
          },
          end: {
            [e]: tn(h, f, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Pi(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = J(n), o = J(o)), {
    property: i,
    start: n,
    end: o
  };
}
function Fh(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Ze(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: c.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function Ze(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function tn(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function Mo(i, t) {
  let e = [], s = !1;
  return V(i) ? (s = !0, e = i) : e = Fh(i, t), e.length ? new Je({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function en(i) {
  return i && i.fill !== !1;
}
function zh(i, t, e) {
  let n = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!W(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Vh(i, t, e) {
  const s = Hh(i);
  if (O(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return W(n) && Math.floor(n) === n ? Bh(s[0], t, n, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Bh(i, t, e, s) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Nh(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : O(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Wh(i, t, e) {
  let s;
  return i === "start" ? s = e : i === "end" ? s = t.options.reverse ? t.min : t.max : O(i) ? s = i.value : s = t.getBaseValue(), s;
}
function Hh(i) {
  const t = i.options, e = t.fill;
  let s = C(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function jh(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = $h(t, e);
  a.push(Mo({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      Yh(n, r[h], a);
  }
  return new Je({
    points: n,
    options: {}
  });
}
function $h(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function Yh(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = Uh(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function Uh(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], u = r[h.end][e];
    if (_t(n, d, u)) {
      a = n === d, l = n === u;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: s
  };
}
class Co {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: R
    }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function Xh(i) {
  const { chart: t, fill: e, line: s } = i;
  if (W(e))
    return Kh(t, e);
  if (e === "stack")
    return jh(i);
  if (e === "shape")
    return !0;
  const n = qh(i);
  return n instanceof Co ? n : Mo(n, s);
}
function Kh(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function qh(i) {
  return (i.scale || {}).getPointPositionForValue ? Jh(i) : Gh(i);
}
function Gh(i) {
  const { scale: t = {}, fill: e } = i, s = Nh(e, t);
  if (W(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function Jh(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, r = Wh(e, t, o), a = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Co({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < n; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function mi(i, t, e) {
  const s = Xh(t), { chart: n, index: o, line: r, scale: a, axis: l } = t, c = r.options, h = c.fill, d = c.backgroundColor, { above: u = d, below: f = d } = h || {}, p = n.getDatasetMeta(o), g = no(n, p);
  s && r.points.length && (Xe(i, Zh(e, p.iScale)), Qh(i, {
    line: r,
    target: s,
    above: u,
    below: f,
    area: e,
    scale: a,
    axis: l,
    clip: g
  }), Ke(i));
}
function Zh(i, t) {
  if (!t || t.getPointPositionForValue)
    return i;
  const e = t.getPixelForValue(t.min), s = t.getPixelForValue(t.max), n = Math.min(e, s), o = Math.max(e, s);
  return t.isHorizontal() ? {
    ...i,
    left: Math.max(i.left, n),
    right: Math.min(i.right, o)
  } : {
    ...i,
    top: Math.max(i.top, n),
    bottom: Math.min(i.bottom, o)
  };
}
function Qh(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a, clip: l } = t, c = e._loop ? "angle" : t.axis;
  i.save();
  let h = o;
  o !== n && (c === "x" ? (sn(i, s, r.top), bi(i, {
    line: e,
    target: s,
    color: n,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), sn(i, s, r.bottom)) : c === "y" && (nn(i, s, r.left), bi(i, {
    line: e,
    target: s,
    color: o,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), nn(i, s, r.right), h = n)), bi(i, {
    line: e,
    target: s,
    color: h,
    scale: a,
    property: c,
    clip: l
  }), i.restore();
}
function sn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[Ze(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function nn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[Ze(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(e, h.y), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(e, d.y);
  }
  i.lineTo(e, t.first().y), i.closePath(), i.clip();
}
function bi(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r, clip: a } = t, l = Ih(e, s, n);
  for (const { source: c, target: h, start: d, end: u } of l) {
    const { style: { backgroundColor: f = o } = {} } = c, p = s !== !0;
    i.save(), i.fillStyle = f, td(i, r, a, p && Pi(n, d, u)), i.beginPath();
    const g = !!e.pathSegment(i, c);
    let m;
    if (p) {
      g ? i.closePath() : on(i, s, u, n);
      const b = !!s.pathSegment(i, h, {
        move: g,
        reverse: !0
      });
      m = g && b, m || on(i, s, d, n);
    }
    i.closePath(), i.fill(m ? "evenodd" : "nonzero"), i.restore();
  }
}
function td(i, t, e, s) {
  const n = t.chart.chartArea, { property: o, start: r, end: a } = s || {};
  if (o === "x" || o === "y") {
    let l, c, h, d;
    o === "x" ? (l = r, c = n.top, h = a, d = n.bottom) : (l = n.left, c = r, h = n.right, d = a), i.beginPath(), e && (l = Math.max(l, e.left), h = Math.min(h, e.right), c = Math.max(c, e.top), d = Math.min(d, e.bottom)), i.rect(l, c, h - l, d - c), i.clip();
  }
}
function on(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
var ed = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof Je && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Vh(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = zh(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && a.fill && mi(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      en(o) && mi(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !en(s) || e.drawTime !== "beforeDatasetDraw" || mi(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const rn = (i, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), s = i.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, id = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class an extends vt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = F(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = $(s.font), o = n.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = rn(s, o);
    let c, h;
    e.font = n.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, n, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, n) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = n + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let u = -1, f = -h;
    return this.legendItems.forEach((p, g) => {
      const m = s + e / 2 + o.measureText(p.text).width;
      (g === 0 || c[c.length - 1] + m + 2 * a > r) && (d += h, c[c.length - (g > 0 ? 0 : 1)] = 0, f += h, u++), l[g] = {
        left: 0,
        top: f,
        row: u,
        width: m,
        height: n
      }, c[c.length - 1] += m + a;
    }), d;
  }
  _fitCols(t, e, s, n) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, u = 0, f = 0, p = 0, g = 0;
    return this.legendItems.forEach((m, b) => {
      const { itemWidth: _, itemHeight: y } = sd(s, e, o, m, n);
      b > 0 && f + y + 2 * a > h && (d += u + a, c.push({
        width: u,
        height: f
      }), p += u + a, g++, u = f = 0), l[b] = {
        left: p,
        top: f,
        col: g,
        width: _,
        height: y
      }, u = Math.max(u, _), f += y + a;
    }), d += u, c.push({
      width: u,
      height: f
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: n }, rtl: o } } = this, r = Xt(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = G(s, this.left + n, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = G(s, this.left + n, this.right - this.lineWidths[a])), c.top += this.top + t + n, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + n;
    } else {
      let a = 0, l = G(s, this.top + t + n, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = G(s, this.top + t + n, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + n, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Xe(t, this), this._draw(), Ke(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this, { align: o, labels: r } = t, a = B.color, l = Xt(t.rtl, this.left, this.width), c = $(r.font), { padding: h } = r, d = c.size, u = d / 2;
    let f;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = c.string;
    const { boxWidth: p, boxHeight: g, itemHeight: m } = rn(r, d), b = function(w, k, S) {
      if (isNaN(p) || p <= 0 || isNaN(g) || g < 0)
        return;
      n.save();
      const M = C(S.lineWidth, 1);
      if (n.fillStyle = C(S.fillStyle, a), n.lineCap = C(S.lineCap, "butt"), n.lineDashOffset = C(S.lineDashOffset, 0), n.lineJoin = C(S.lineJoin, "miter"), n.lineWidth = M, n.strokeStyle = C(S.strokeStyle, a), n.setLineDash(C(S.lineDash, [])), r.usePointStyle) {
        const D = {
          radius: g * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: M
        }, P = l.xPlus(w, p / 2), T = k + u;
        Yn(n, D, P, T, r.pointStyleWidth && p);
      } else {
        const D = k + Math.max((d - g) / 2, 0), P = l.leftForLtr(w, p), T = Bt(S.borderRadius);
        n.beginPath(), Object.values(T).some((U) => U !== 0) ? pe(n, {
          x: P,
          y: D,
          w: p,
          h: g,
          radius: T
        }) : n.rect(P, D, p, g), n.fill(), M !== 0 && n.stroke();
      }
      n.restore();
    }, _ = function(w, k, S) {
      Ht(n, S.text, w, k + m / 2, c, {
        strikethrough: S.hidden,
        textAlign: l.textAlign(S.textAlign)
      });
    }, y = this.isHorizontal(), v = this._computeTitleHeight();
    y ? f = {
      x: G(o, this.left + h, this.right - s[0]),
      y: this.top + h + v,
      line: 0
    } : f = {
      x: this.left + h,
      y: G(o, this.top + v + h, this.bottom - e[0].height),
      line: 0
    }, Qn(this.ctx, t.textDirection);
    const x = m + h;
    this.legendItems.forEach((w, k) => {
      n.strokeStyle = w.fontColor, n.fillStyle = w.fontColor;
      const S = n.measureText(w.text).width, M = l.textAlign(w.textAlign || (w.textAlign = r.textAlign)), D = p + u + S;
      let P = f.x, T = f.y;
      l.setWidth(this.width), y ? k > 0 && P + D + h > this.right && (T = f.y += x, f.line++, P = f.x = G(o, this.left + h, this.right - s[f.line])) : k > 0 && T + x > this.bottom && (P = f.x = P + e[f.line].width + h, f.line++, T = f.y = G(o, this.top + v + h, this.bottom - e[f.line].height));
      const U = l.x(P);
      if (b(U, T, w), P = da(M, P + p + u, y ? P + D : this.right, t.rtl), _(l.x(P), T, w), y)
        f.x += D + h;
      else if (typeof w.text != "string") {
        const X = c.lineHeight;
        f.y += Po(w, X) + h;
      } else
        f.y += x;
    }), to(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = $(e.font), n = Q(e.padding);
    if (!e.display)
      return;
    const o = Xt(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = s.size / 2, c = n.top + l;
    let h, d = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), h = this.top + c, d = G(t.align, d, this.right - u);
    else {
      const p = this.columnSizes.reduce((g, m) => Math.max(g, m.height), 0);
      h = c + G(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const f = G(a, d, d + u);
    r.textAlign = o.textAlign(Fi(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = s.string, Ht(r, e.text, f, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = $(t.font), s = Q(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (_t(t, this.left, this.right) && _t(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], _t(t, n.left, n.left + n.width) && _t(e, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!rd(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = id(n, s);
      n && !o && F(e.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && F(e.onHover, [
        t,
        s,
        this
      ], this);
    } else s && F(e.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function sd(i, t, e, s, n) {
  const o = nd(s, i, t, e), r = od(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: r
  };
}
function nd(i, t, e, s) {
  let n = i.text;
  return n && typeof n != "string" && (n = n.reduce((o, r) => o.length > r.length ? o : r)), t + e.size / 2 + s.measureText(n).width;
}
function od(i, t, e) {
  let s = i;
  return typeof t.text != "string" && (s = Po(t, e)), s;
}
function Po(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function rd(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var ad = {
  id: "legend",
  _element: an,
  start(i, t, e) {
    const s = i.legend = new an({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    Z.configure(i, s, e), Z.addBox(i, s);
  },
  stop(i) {
    Z.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    Z.configure(i, s, e), s.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex, n = e.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: n, color: o, useBorderRadius: r, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0), h = Q(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: n || c.textAlign,
            borderRadius: r && (a || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
class Ui extends vt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const n = V(s.text) ? s.text.length : 1;
    this._padding = Q(s.padding);
    const o = n * $(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: n, right: o, options: r } = this, a = r.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = G(a, s, o), d = e + t, c = o - s) : (r.position === "left" ? (h = s + t, d = G(a, n, e), l = L * -0.5) : (h = o - t, d = G(a, e, n), l = L * 0.5), c = n - e), {
      titleX: h,
      titleY: d,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = $(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
    Ht(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: Fi(e.align),
      textBaseline: "middle",
      translation: [
        r,
        a
      ]
    });
  }
}
function ld(i, t) {
  const e = new Ui({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  Z.configure(i, e, t), Z.addBox(i, e), i.titleBlock = e;
}
var cd = {
  id: "title",
  _element: Ui,
  start(i, t, e) {
    ld(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    Z.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const s = i.titleBlock;
    Z.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Te = /* @__PURE__ */ new WeakMap();
var hd = {
  id: "subtitle",
  start(i, t, e) {
    const s = new Ui({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    Z.configure(i, s, e), Z.addBox(i, s), Te.set(i, s);
  },
  stop(i) {
    Z.removeBox(i, Te.get(i)), Te.delete(i);
  },
  beforeUpdate(i, t, e) {
    const s = Te.get(i);
    Z.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const oe = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const l = a.tooltipPosition();
        s.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((a, l) => a + l) / s.size,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = yi(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function ht(i, t) {
  return t && (V(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function mt(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function dd(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function ln(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = $(t.bodyFont), c = $(t.titleFont), h = $(t.footerFont), d = o.length, u = n.length, f = s.length, p = Q(t.padding);
  let g = p.height, m = 0, b = s.reduce((v, x) => v + x.before.length + x.lines.length + x.after.length, 0);
  if (b += i.beforeBody.length + i.afterBody.length, d && (g += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const v = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    g += f * v + (b - f) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  u && (g += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let _ = 0;
  const y = function(v) {
    m = Math.max(m, e.measureText(v).width + _);
  };
  return e.save(), e.font = c.string, E(i.title, y), e.font = l.string, E(i.beforeBody.concat(i.afterBody), y), _ = t.displayColors ? r + 2 + t.boxPadding : 0, E(s, (v) => {
    E(v.before, y), E(v.lines, y), E(v.after, y);
  }), _ = 0, e.font = h.string, E(i.footer, y), e.restore(), m += p.width, {
    width: m,
    height: g
  };
}
function ud(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function fd(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function pd(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), fd(c, i, t, e) && (c = "center"), c;
}
function cn(i, t, e) {
  const s = e.yAlign || t.yAlign || ud(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || pd(i, t, e, s),
    yAlign: s
  };
}
function gd(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function md(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function hn(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = Bt(r);
  let p = gd(t, a);
  const g = md(t, l, c);
  return l === "center" ? a === "left" ? p += c : a === "right" && (p -= c) : a === "left" ? p -= Math.max(h, u) + n : a === "right" && (p += Math.max(d, f) + n), {
    x: Y(p, 0, s.width - t.width),
    y: Y(g, 0, s.height - t.height)
  };
}
function Le(i, t, e) {
  const s = Q(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function dn(i) {
  return ht([], mt(i));
}
function bd(i, t, e) {
  return At(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function un(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const Do = {
  beforeTitle: pt,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: pt,
  beforeBody: pt,
  beforeLabel: pt,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return A(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: pt,
  afterBody: pt,
  beforeFooter: pt,
  footer: pt,
  afterFooter: pt
};
function tt(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > "u" ? Do[t].call(e, s) : n;
}
class fn extends vt {
  static positioners = oe;
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new oo(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = bd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = tt(s, "beforeTitle", this, t), o = tt(s, "title", this, t), r = tt(s, "afterTitle", this, t);
    let a = [];
    return a = ht(a, mt(n)), a = ht(a, mt(o)), a = ht(a, mt(r)), a;
  }
  getBeforeBody(t, e) {
    return dn(tt(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return E(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = un(s, o);
      ht(r.before, mt(tt(a, "beforeLabel", this, o))), ht(r.lines, tt(a, "label", this, o)), ht(r.after, mt(tt(a, "afterLabel", this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return dn(tt(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = tt(s, "beforeFooter", this, t), o = tt(s, "footer", this, t), r = tt(s, "afterFooter", this, t);
    let a = [];
    return a = ht(a, mt(n)), a = ht(a, mt(o)), a = ht(a, mt(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(dd(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, u) => t.filter(h, d, u, s))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, s))), E(a, (h) => {
      const d = un(t.callbacks, h);
      n.push(tt(d, "labelColor", this, h)), o.push(tt(d, "labelPointStyle", this, h)), r.push(tt(d, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = oe[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = ln(this, s), c = Object.assign({}, a, l), h = cn(this.chart, s, c), d = hn(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = Bt(a), { x: u, y: f } = t, { width: p, height: g } = e;
    let m, b, _, y, v, x;
    return o === "center" ? (v = f + g / 2, n === "left" ? (m = u, b = m - r, y = v + r, x = v - r) : (m = u + p, b = m + r, y = v - r, x = v + r), _ = m) : (n === "left" ? b = u + Math.max(l, h) + r : n === "right" ? b = u + p - Math.max(c, d) - r : b = this.caretX, o === "top" ? (y = f, v = y - r, m = b - r, _ = b + r) : (y = f + g, v = y + r, m = b + r, _ = b - r), x = y), {
      x1: m,
      x2: b,
      x3: _,
      y1: y,
      y2: v,
      y3: x
    };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = Xt(s.rtl, this.x, this.width);
      for (t.x = Le(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = $(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = o, h = $(o.bodyFont), d = Le(this, "left", o), u = n.x(d), f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = e.y + f;
    if (o.usePointStyle) {
      const g = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(u, c) + c / 2, b = p + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, wi(t, g, m, b), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, wi(t, g, m, b);
    } else {
      t.lineWidth = O(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const g = n.leftForLtr(u, c), m = n.leftForLtr(n.xPlus(u, 1), c - 2), b = Bt(r.borderRadius);
      Object.values(b).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, pe(t, {
        x: g,
        y: p,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), pe(t, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(g, p, c, l), t.strokeRect(g, p, c, l), t.fillStyle = r.backgroundColor, t.fillRect(m, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = $(s.bodyFont);
    let u = d.lineHeight, f = 0;
    const p = Xt(s.rtl, this.x, this.width), g = function(S) {
      e.fillText(S, p.x(t.x + f), t.y + u / 2), t.y += u + o;
    }, m = p.textAlign(r);
    let b, _, y, v, x, w, k;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = Le(this, m, s), e.fillStyle = s.bodyColor, E(this.beforeBody, g), f = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, v = 0, w = n.length; v < w; ++v) {
      for (b = n[v], _ = this.labelTextColors[v], e.fillStyle = _, E(b.before, g), y = b.lines, a && y.length && (this._drawColorBox(e, t, v, p, s), u = Math.max(d.lineHeight, l)), x = 0, k = y.length; x < k; ++x)
        g(y[x]), u = d.lineHeight;
      E(b.after, g);
    }
    f = 0, u = d.lineHeight, E(this.afterBody, g), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = Xt(s.rtl, this.x, this.width);
      for (t.x = Le(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = $(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: p } = Bt(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - u, l), e.quadraticCurveTo(a + c, l, a + c, l + u), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - p), e.quadraticCurveTo(a + c, l + h, a + c - p, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + f, l + h), e.quadraticCurveTo(a, l + h, a, l + h - f), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = oe[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = ln(this, t), l = Object.assign({}, r, this._size), c = cn(e, t, l), h = hn(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = Q(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), Qn(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), to(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !Ve(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !Ve(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = oe[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
var _d = {
  id: "tooltip",
  _element: fn,
  positioners: oe,
  afterInit(i, t, e) {
    e && (i.tooltip = new fn({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Do
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, xd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: Oh,
  Decimation: Rh,
  Filler: ed,
  Legend: ad,
  SubTitle: hd,
  Title: cd,
  Tooltip: _d
});
const yd = (i, t, e, s) => (typeof t == "string" ? (e = i.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function vd(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1)
    return yd(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const wd = (i, t) => i === null ? null : Y(Math.round(i), 0, t);
function pn(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class kd extends jt {
  static id = "category";
  static defaults = {
    ticks: {
      callback: pn
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (A(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : vd(s, t, C(e, t), this._addedLabels), wd(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      n.push({
        value: r
      });
    return n;
  }
  getLabelForValue(t) {
    return pn.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Sd(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = i, f = o || 1, p = h - 1, { min: g, max: m } = t, b = !A(r), _ = !A(a), y = !A(c), v = (m - g) / (d + 1);
  let x = as((m - g) / p / f) * f, w, k, S, M;
  if (x < 1e-14 && !b && !_)
    return [
      {
        value: g
      },
      {
        value: m
      }
    ];
  M = Math.ceil(m / x) - Math.floor(g / x), M > p && (x = as(M * x / p / f) * f), A(l) || (w = Math.pow(10, l), x = Math.ceil(x * w) / w), n === "ticks" ? (k = Math.floor(g / x) * x, S = Math.ceil(m / x) * x) : (k = g, S = m), b && _ && o && na((a - r) / o, x / 1e3) ? (M = Math.round(Math.min((a - r) / x, h)), x = (a - r) / M, k = r, S = a) : y ? (k = b ? r : k, S = _ ? a : S, M = c - 1, x = (S - k) / M) : (M = (S - k) / x, ae(M, Math.round(M), x / 1e3) ? M = Math.round(M) : M = Math.ceil(M));
  const D = Math.max(ls(x), ls(k));
  w = Math.pow(10, A(l) ? D : l), k = Math.round(k * w) / w, S = Math.round(S * w) / w;
  let P = 0;
  for (b && (u && k !== r ? (e.push({
    value: r
  }), k < r && P++, ae(Math.round((k + P * x) * w) / w, r, gn(r, v, i)) && P++) : k < r && P++); P < M; ++P) {
    const T = Math.round((k + P * x) * w) / w;
    if (_ && T > a)
      break;
    e.push({
      value: T
    });
  }
  return _ && u && S !== a ? e.length && ae(e[e.length - 1].value, a, gn(a, v, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!_ || S === a) && e.push({
    value: S
  }), e;
}
function gn(i, t, { horizontal: e, minRotation: s }) {
  const n = ct(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class Ye extends jt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return A(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = ut(n), c = ut(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = Sd(n, o);
    return t.bounds === "ticks" && Fn(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return _e(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Md extends Ye {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ue.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = W(t) ? t : 0, this.max = W(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = ct(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const me = (i) => Math.floor(kt(i)), Ft = (i, t) => Math.pow(10, me(i) + t);
function mn(i) {
  return i / Math.pow(10, me(i)) === 1;
}
function bn(i, t, e) {
  const s = Math.pow(10, e), n = Math.floor(i / s);
  return Math.ceil(t / s) - n;
}
function Cd(i, t) {
  const e = t - i;
  let s = me(e);
  for (; bn(i, t, s) > 10; )
    s++;
  for (; bn(i, t, s) < 10; )
    s--;
  return Math.min(s, me(i));
}
function Pd(i, { min: t, max: e }) {
  t = nt(i.min, t);
  const s = [], n = me(t);
  let o = Cd(t, e), r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const a = Math.pow(10, o), l = n > o ? Math.pow(10, n) : 0, c = Math.round((t - l) * r) / r, h = Math.floor((t - l) / a / 10) * a * 10;
  let d = Math.floor((c - h) / Math.pow(10, o)), u = nt(i.min, Math.round((l + h + d * Math.pow(10, o)) * r) / r);
  for (; u < e; )
    s.push({
      value: u,
      major: mn(u),
      significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (o++, d = 2, r = o >= 0 ? 1 : r), u = Math.round((l + h + d * Math.pow(10, o)) * r) / r;
  const f = nt(i.max, u);
  return s.push({
    value: f,
    major: mn(f),
    significand: d
  }), s;
}
class Dd extends jt {
  static id = "logarithmic";
  static defaults = {
    ticks: {
      callback: Ue.formatters.logarithmic,
      major: {
        enabled: !0
      }
    }
  };
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = Ye.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return W(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = W(t) ? Math.max(0, t) : null, this.max = W(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !W(this._userMin) && (this.min = t === Ft(this.min, 0) ? Ft(this.min, -1) : Ft(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, n = this.max;
    const o = (a) => s = t ? s : a, r = (a) => n = e ? n : a;
    s === n && (s <= 0 ? (o(1), r(10)) : (o(Ft(s, -1)), r(Ft(n, 1)))), s <= 0 && o(Ft(n, -1)), n <= 0 && r(Ft(s, 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = Pd(e, this);
    return t.bounds === "ticks" && Fn(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : _e(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = kt(t), this._valueRange = kt(this.max) - kt(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (kt(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
function Di(i) {
  const t = i.ticks;
  if (t.display && i.display) {
    const e = Q(t.backdropPadding);
    return C(t.font && t.font.size, B.font.size) + e.height;
  }
  return 0;
}
function Ad(i, t, e) {
  return e = V(e) ? e : [
    e
  ], {
    w: va(i, t.string, e),
    h: e.length * t.lineHeight
  };
}
function _n(i, t, e, s, n) {
  return i === s || i === n ? {
    start: t - e / 2,
    end: t + e / 2
  } : i < s || i > n ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function Od(i) {
  const t = {
    l: i.left + i._padding.left,
    r: i.right - i._padding.right,
    t: i.top + i._padding.top,
    b: i.bottom - i._padding.bottom
  }, e = Object.assign({}, t), s = [], n = [], o = i._pointLabels.length, r = i.options.pointLabels, a = r.centerPointLabels ? L / o : 0;
  for (let l = 0; l < o; l++) {
    const c = r.setContext(i.getPointLabelContext(l));
    n[l] = c.padding;
    const h = i.getPointPosition(l, i.drawingArea + n[l], a), d = $(c.font), u = Ad(i.ctx, d, i._pointLabels[l]);
    s[l] = u;
    const f = J(i.getIndexAngle(l) + a), p = Math.round(Ri(f)), g = _n(p, h.x, u.w, 0, 180), m = _n(p, h.y, u.h, 90, 270);
    Td(e, t, f, g, m);
  }
  i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), i._pointLabelItems = Rd(i, s, n);
}
function Td(i, t, e, s, n) {
  const o = Math.abs(Math.sin(e)), r = Math.abs(Math.cos(e));
  let a = 0, l = 0;
  s.start < t.l ? (a = (t.l - s.start) / o, i.l = Math.min(i.l, t.l - a)) : s.end > t.r && (a = (s.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), n.start < t.t ? (l = (t.t - n.start) / r, i.t = Math.min(i.t, t.t - l)) : n.end > t.b && (l = (n.end - t.b) / r, i.b = Math.max(i.b, t.b + l));
}
function Ld(i, t, e) {
  const s = i.drawingArea, { extra: n, additionalAngle: o, padding: r, size: a } = e, l = i.getPointPosition(t, s + n + r, o), c = Math.round(Ri(J(l.angle + H))), h = zd(l.y, a.h, c), d = Id(c), u = Fd(l.x, a.w, d);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + a.w,
    bottom: h + a.h
  };
}
function Ed(i, t) {
  if (!t)
    return !0;
  const { left: e, top: s, right: n, bottom: o } = i;
  return !(yt({
    x: e,
    y: s
  }, t) || yt({
    x: e,
    y: o
  }, t) || yt({
    x: n,
    y: s
  }, t) || yt({
    x: n,
    y: o
  }, t));
}
function Rd(i, t, e) {
  const s = [], n = i._pointLabels.length, o = i.options, { centerPointLabels: r, display: a } = o.pointLabels, l = {
    extra: Di(o) / 2,
    additionalAngle: r ? L / n : 0
  };
  let c;
  for (let h = 0; h < n; h++) {
    l.padding = e[h], l.size = t[h];
    const d = Ld(i, h, l);
    s.push(d), a === "auto" && (d.visible = Ed(d, c), d.visible && (c = d));
  }
  return s;
}
function Id(i) {
  return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function Fd(i, t, e) {
  return e === "right" ? i -= t : e === "center" && (i -= t / 2), i;
}
function zd(i, t, e) {
  return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}
function Vd(i, t, e) {
  const { left: s, top: n, right: o, bottom: r } = e, { backdropColor: a } = t;
  if (!A(a)) {
    const l = Bt(t.borderRadius), c = Q(t.backdropPadding);
    i.fillStyle = a;
    const h = s - c.left, d = n - c.top, u = o - s + c.width, f = r - n + c.height;
    Object.values(l).some((p) => p !== 0) ? (i.beginPath(), pe(i, {
      x: h,
      y: d,
      w: u,
      h: f,
      radius: l
    }), i.fill()) : i.fillRect(h, d, u, f);
  }
}
function Bd(i, t) {
  const { ctx: e, options: { pointLabels: s } } = i;
  for (let n = t - 1; n >= 0; n--) {
    const o = i._pointLabelItems[n];
    if (!o.visible)
      continue;
    const r = s.setContext(i.getPointLabelContext(n));
    Vd(e, r, o);
    const a = $(r.font), { x: l, y: c, textAlign: h } = o;
    Ht(e, i._pointLabels[n], l, c + a.lineHeight / 2, a, {
      color: r.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Ao(i, t, e, s) {
  const { ctx: n } = i;
  if (e)
    n.arc(i.xCenter, i.yCenter, t, 0, R);
  else {
    let o = i.getPointPosition(0, t);
    n.moveTo(o.x, o.y);
    for (let r = 1; r < s; r++)
      o = i.getPointPosition(r, t), n.lineTo(o.x, o.y);
  }
}
function Nd(i, t, e, s, n) {
  const o = i.ctx, r = t.circular, { color: a, lineWidth: l } = t;
  !r && !s || !a || !l || e < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = l, o.setLineDash(n.dash || []), o.lineDashOffset = n.dashOffset, o.beginPath(), Ao(i, e, r, s), o.closePath(), o.stroke(), o.restore());
}
function Wd(i, t, e) {
  return At(i, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class Hd extends Ye {
  static id = "radialLinear";
  static defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
      display: !0,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0
    },
    grid: {
      circular: !1
    },
    startAngle: 0,
    ticks: {
      showLabelBackdrop: !0,
      callback: Ue.formatters.numeric
    },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: {
        size: 10
      },
      callback(t) {
        return t;
      },
      padding: 5,
      centerPointLabels: !1
    }
  };
  static defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color"
  };
  static descriptors = {
    angleLines: {
      _fallback: "grid"
    }
  };
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = Q(Di(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = W(t) && !isNaN(t) ? t : 0, this.max = W(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Di(this.options));
  }
  generateTickLabels(t) {
    Ye.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const n = F(this.options.pointLabels.callback, [
        e,
        s
      ], this);
      return n || n === 0 ? n : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? Od(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, n) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - n) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, n));
  }
  getIndexAngle(t) {
    const e = R / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return J(t * e + ct(s));
  }
  getDistanceFromCenterForValue(t) {
    if (A(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (A(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return Wd(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const n = this.getIndexAngle(t) - H + s;
    return {
      x: Math.cos(n) * e + this.xCenter,
      y: Math.sin(n) * e + this.yCenter,
      angle: n
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: s, right: n, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: s,
      right: n,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), Ao(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: n, border: o } = e, r = this._pointLabels.length;
    let a, l, c;
    if (e.pointLabels.display && Bd(this, r), n.display && this.ticks.forEach((h, d) => {
      if (d !== 0 || d === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), f = n.setContext(u), p = o.setContext(u);
        Nd(this, f, l, r, p);
      }
    }), s.display) {
      for (t.save(), a = r - 1; a >= 0; a--) {
        const h = s.setContext(this.getPointLabelContext(a)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(e.reverse ? this.min : this.max), c = this.getPointPosition(a, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, s = e.ticks;
    if (!s.display)
      return;
    const n = this.getIndexAngle(0);
    let o, r;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(n), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
      if (l === 0 && this.min >= 0 && !e.reverse)
        return;
      const c = s.setContext(this.getContext(l)), h = $(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
        const d = Q(c.backdropPadding);
        t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height);
      }
      Ht(t, a.label, 0, -o, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
const Qe = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, et = /* @__PURE__ */ Object.keys(Qe);
function xn(i, t) {
  return i - t;
}
function yn(i, t) {
  if (A(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), W(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (Kt(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function vn(i, t, e, s) {
  const n = et.length;
  for (let o = et.indexOf(i); o < n - 1; ++o) {
    const r = Qe[et[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return et[o];
  }
  return et[n - 1];
}
function jd(i, t, e, s, n) {
  for (let o = et.length - 1; o >= et.indexOf(e); o--) {
    const r = et[o];
    if (Qe[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return et[e ? et.indexOf(e) : 0];
}
function $d(i) {
  for (let t = et.indexOf(i) + 1, e = et.length; t < e; ++t)
    if (Qe[et[t]].common)
      return et[t];
}
function wn(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = Ii(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function Yd(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function kn(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : Yd(i, s, n, e);
}
class Ai extends jt {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      callback: !1,
      major: {
        enabled: !1
      }
    }
  };
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new $l._date(t.adapters.date);
    n.init(e), re(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : yn(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = W(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = W(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = la(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? vn(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : jd(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : $d(this._unit), this.initOffsets(n), t.reverse && a.reverse(), kn(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = Y(e, 0, r), s = Y(s, 0, r), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || vn(o.minUnit, e, s, this._getLabelCapacity(e)), a = C(n.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = Kt(l) || l === !0, h = {};
    let d = e, u, f;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const p = n.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, f = 0; u < s; u = +t.add(u, a, r), f++)
      wn(h, u, p);
    return (u === s || n.bounds === "ticks" || f === 1) && wn(h, u, p), Object.keys(h).sort(xn).map((g) => +g);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats, o = this._unit, r = e || n[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return F(r, [
        t,
        e,
        s
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], d = c && a[c], u = s[e], f = c && d && u && u.major;
    return this._adapter.format(t, n || (f ? d : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = ct(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, kn(this, [
      t
    ], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(yn(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Bn(t.sort(xn));
  }
}
function Ee(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = xt(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = xt(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class Ud extends Ai {
  static id = "timeseries";
  static defaults = Ai.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = Ee(e, this.min), this._tableRange = Ee(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ee(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return Ee(this._table, s * this._tableRange + this._minPos, !0);
  }
}
var Xd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: kd,
  LinearScale: Md,
  LogarithmicScale: Dd,
  RadialLinearScale: Hd,
  TimeScale: Ai,
  TimeSeriesScale: Ud
});
const Kd = [
  jl,
  kh,
  xd,
  Xd
], qd = () => wr(), Gd = () => kr(), Jd = "doughnut", Zd = JSON.stringify({
  labels: ["Red", "Blue", "Yellow"],
  datasets: [{ data: [300, 50, 100] }]
});
function Qd(i, t, e) {
  const s = i.datasets?.[t], n = s?.data?.[e], o = i.labels?.[e], a = (n !== null && typeof n == "object" ? n.x : void 0) ?? o;
  return {
    label: a == null ? "" : String(a),
    datasetLabel: s?.label ?? "",
    datasetIndex: t,
    dataIndex: e,
    value: n
  };
}
const tu = { class: "chartjs-container" }, eu = {
  key: 0,
  class: "chartjs-error",
  role: "alert"
}, iu = {
  key: 1,
  class: "chartjs-canvas-wrapper"
}, su = /* @__PURE__ */ Eo({
  __name: "chartjs-canvas",
  setup(i) {
    ze.registry.controllers.get("bar") || ze.register(...Kd);
    const t = qd(), e = Gd(), s = Ut(null), n = Ut(null);
    let o = null;
    const r = /* @__PURE__ */ new Set(["pie", "doughnut", "polarArea"]);
    function a() {
      const p = s.value?.getRootNode(), g = p instanceof ShadowRoot ? p.host : p instanceof Document ? p.documentElement : document.documentElement, m = getComputedStyle(g), b = (_, y) => m.getPropertyValue(_).trim() || y;
      return [
        b("--p-primary-500", "#6366f1"),
        b("--p-danger-500", "#ef4444"),
        b("--p-warn-500", "#eab308"),
        b("--p-secondary-500", "#64748b"),
        b("--p-accent-500", "#a855f7"),
        b("--p-primary-300", "#a5b4fc"),
        b("--p-danger-300", "#fca5a5"),
        b("--p-warn-300", "#fde047"),
        b("--p-secondary-300", "#cbd5e1"),
        b("--p-accent-300", "#d8b4fe")
      ];
    }
    function l(p, g) {
      const m = p.data?.datasets ?? [], b = r.has(String(p.type));
      for (let _ = 0; _ < m.length; _++) {
        const y = m[_];
        if (b) {
          if (y.backgroundColor === void 0) {
            const v = Array.isArray(y.data) ? y.data.length : 0;
            y.backgroundColor = Array.from({ length: v }, (x, w) => g[w % g.length]);
          }
        } else {
          const v = g[_ % g.length];
          y.backgroundColor === void 0 && (y.backgroundColor = v), y.borderColor === void 0 && (y.borderColor = v);
        }
      }
    }
    const c = Ki(() => {
      const p = t.value.type ?? Jd, g = t.value.data ?? Zd;
      let m, b = {}, _ = [];
      try {
        m = JSON.parse(g);
      } catch (y) {
        return { cfg: null, error: `Invalid data JSON: ${y.message}` };
      }
      if (t.value.options)
        try {
          b = JSON.parse(t.value.options);
        } catch (y) {
          return { cfg: null, error: `Invalid options JSON: ${y.message}` };
        }
      if (t.value.plugins)
        try {
          _ = JSON.parse(t.value.plugins);
        } catch (y) {
          return { cfg: null, error: `Invalid plugins JSON: ${y.message}` };
        }
      return { cfg: { type: p, data: m, options: b, plugins: _ }, error: null };
    }), h = Ki(() => n.value ?? c.value.error);
    function d() {
      n.value = null;
      const p = c.value.cfg;
      if (!s.value || !p)
        return;
      const g = {
        ...p,
        data: JSON.parse(JSON.stringify(p.data)),
        options: {
          responsive: !0,
          maintainAspectRatio: !1,
          ...p.options ?? {}
        }
      };
      l(g, a());
      try {
        o = new ze(s.value, g);
      } catch (m) {
        n.value = `Chart.js error: ${m.message}`;
      }
    }
    function u(p) {
      if (!o)
        return;
      const g = o.getElementsAtEventForMode(p, "nearest", { intersect: !0 }, !0);
      if (g.length === 0)
        return;
      const { datasetIndex: m, index: b } = g[0];
      e("chart-click", Qd(o.data, m, b));
    }
    function f() {
      o?.destroy(), o = null;
    }
    return Ro(d), Io(f), Fo(c, () => {
      f(), d();
    }), (p, g) => (ei(), ii("div", tu, [
      h.value ? (ei(), ii("div", eu, zo(h.value), 1)) : (ei(), ii("div", iu, [
        Vo("canvas", {
          ref_key: "canvasRef",
          ref: s,
          role: "img",
          onClick: u
        }, null, 512)
      ]))
    ]));
  }
}), nu = ":root{--p-form-field-padding-x: .75rem;--p-form-field-padding-y: .5rem;--p-form-field-sm-padding-x: .625rem;--p-form-field-sm-padding-y: .375rem;--p-form-field-lg-padding-x: .875rem;--p-form-field-lg-padding-y: .625rem;--p-form-field-border-radius: .375rem;--p-form-field-transition-duration: .2s;--p-form-field-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgba(18, 18, 23, .05);--p-focus-ring-width: 1px;--p-focus-ring-style: solid;--p-focus-ring-color: color-mix(in srgb, var(--p-primary-color) 100%, transparent);--p-focus-ring-offset: 2px;--p-toggleswitch-width: 2.5rem;--p-toggleswitch-height: 1.5rem;--p-toggleswitch-border-radius: 30px;--p-toggleswitch-gap: .25rem;--p-toggleswitch-border-width: 1px;--p-toggleswitch-transition-duration: .2s;--p-toggleswitch-slide-duration: .2s;--p-toggleswitch-handle-size: 1rem;--p-toggleswitch-handle-border-radius: 9999px}:root{color-scheme:light dark;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-secondary: #6f7385;--p-secondary-50: color-mix(in srgb, var(--p-secondary) 5%, white);--p-secondary-100: color-mix(in srgb, var(--p-secondary) 10%, white);--p-secondary-200: color-mix(in srgb, var(--p-secondary) 20%, white);--p-secondary-300: color-mix(in srgb, var(--p-secondary) 35%, white);--p-secondary-400: color-mix(in srgb, var(--p-secondary) 65%, white);--p-secondary-500: var(--p-secondary);--p-secondary-600: color-mix(in srgb, var(--p-secondary) 80%, black);--p-secondary-700: color-mix(in srgb, var(--p-secondary) 65%, black);--p-secondary-800: color-mix(in srgb, var(--p-secondary) 55%, black);--p-secondary-900: color-mix(in srgb, var(--p-secondary) 50%, black);--p-secondary-950: color-mix(in srgb, var(--p-secondary) 30%, black);--p-danger: rgb(239, 68, 68);--p-danger-50: color-mix(in srgb, var(--p-danger) 5%, white);--p-danger-100: color-mix(in srgb, var(--p-danger) 10%, white);--p-danger-200: color-mix(in srgb, var(--p-danger) 20%, white);--p-danger-300: color-mix(in srgb, var(--p-danger) 30%, white);--p-danger-400: color-mix(in srgb, var(--p-danger) 40%, white);--p-danger-500: var(--p-danger);--p-danger-600: color-mix(in srgb, var(--p-danger) 80%, black);--p-danger-700: color-mix(in srgb, var(--p-danger) 70%, black);--p-danger-800: color-mix(in srgb, var(--p-danger) 60%, black);--p-danger-900: color-mix(in srgb, var(--p-danger) 50%, black);--p-danger-950: color-mix(in srgb, var(--p-danger) 40%, black);--p-success: rgb(34, 197, 94);--p-success-50: color-mix(in srgb, var(--p-success) 5%, white);--p-success-100: color-mix(in srgb, var(--p-success) 10%, white);--p-success-200: color-mix(in srgb, var(--p-success) 20%, white);--p-success-300: color-mix(in srgb, var(--p-success) 30%, white);--p-success-400: color-mix(in srgb, var(--p-success) 40%, white);--p-success-500: var(--p-success);--p-success-600: color-mix(in srgb, var(--p-success) 80%, black);--p-success-700: color-mix(in srgb, var(--p-success) 70%, black);--p-success-800: color-mix(in srgb, var(--p-success) 60%, black);--p-success-900: color-mix(in srgb, var(--p-success) 50%, black);--p-success-950: color-mix(in srgb, var(--p-success) 40%, black);--p-warn: rgb(249, 115, 22);--p-warn-50: color-mix(in srgb, var(--p-warn) 5%, white);--p-warn-100: color-mix(in srgb, var(--p-warn) 10%, white);--p-warn-200: color-mix(in srgb, var(--p-warn) 20%, white);--p-warn-300: color-mix(in srgb, var(--p-warn) 30%, white);--p-warn-400: color-mix(in srgb, var(--p-warn) 40%, white);--p-warn-500: var(--p-warn);--p-warn-600: color-mix(in srgb, var(--p-warn) 80%, black);--p-warn-700: color-mix(in srgb, var(--p-warn) 70%, black);--p-warn-800: color-mix(in srgb, var(--p-warn) 60%, black);--p-warn-900: color-mix(in srgb, var(--p-warn) 50%, black);--p-warn-950: color-mix(in srgb, var(--p-warn) 40%, black);--p-info: rgb(14, 165, 233);--p-info-50: color-mix(in srgb, var(--p-info) 5%, white);--p-info-100: color-mix(in srgb, var(--p-info) 10%, white);--p-info-200: color-mix(in srgb, var(--p-info) 20%, white);--p-info-300: color-mix(in srgb, var(--p-info) 30%, white);--p-info-400: color-mix(in srgb, var(--p-info) 40%, white);--p-info-500: var(--p-info);--p-info-600: color-mix(in srgb, var(--p-info) 80%, black);--p-info-700: color-mix(in srgb, var(--p-info) 70%, black);--p-info-800: color-mix(in srgb, var(--p-info) 60%, black);--p-info-900: color-mix(in srgb, var(--p-info) 50%, black);--p-info-950: color-mix(in srgb, var(--p-info) 40%, black);--p-help: rgb(168, 85, 247);--p-help-50: color-mix(in srgb, var(--p-help) 5%, white);--p-help-100: color-mix(in srgb, var(--p-help) 10%, white);--p-help-200: color-mix(in srgb, var(--p-help) 20%, white);--p-help-300: color-mix(in srgb, var(--p-help) 30%, white);--p-help-400: color-mix(in srgb, var(--p-help) 40%, white);--p-help-500: var(--p-help);--p-help-600: color-mix(in srgb, var(--p-help) 80%, black);--p-help-700: color-mix(in srgb, var(--p-help) 70%, black);--p-help-800: color-mix(in srgb, var(--p-help) 60%, black);--p-help-900: color-mix(in srgb, var(--p-help) 50%, black);--p-help-950: color-mix(in srgb, var(--p-help) 40%, black);--p-accent: rgb(20, 184, 166);--p-accent-50: color-mix(in srgb, var(--p-accent) 5%, white);--p-accent-100: color-mix(in srgb, var(--p-accent) 10%, white);--p-accent-200: color-mix(in srgb, var(--p-accent) 20%, white);--p-accent-300: color-mix(in srgb, var(--p-accent) 30%, white);--p-accent-400: color-mix(in srgb, var(--p-accent) 40%, white);--p-accent-500: var(--p-accent);--p-accent-600: color-mix(in srgb, var(--p-accent) 80%, black);--p-accent-700: color-mix(in srgb, var(--p-accent) 70%, black);--p-accent-800: color-mix(in srgb, var(--p-accent) 60%, black);--p-accent-900: color-mix(in srgb, var(--p-accent) 50%, black);--p-accent-950: color-mix(in srgb, var(--p-accent) 40%, black);--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-content-border-radius: 6px;--p-font-heading-family: var(--v-font-family-head, Arial);--p-font-heading-scale: 1;--p-font-heading-line-height: 1.5;--p-font-heading-letter-spacing: normal;--p-font-heading-stretch: normal;--p-font-heading-variation-settings: normal;--p-font-body-scale: 1;--p-font-body-line-height: 1.5;--p-font-body-letter-spacing: normal;--p-font-body-stretch: normal;--p-font-body-variation-settings: normal;--p-font-mono-family: ui-monospace}:root{--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}@media(prefers-color-scheme:dark){:root:not(.w-theme-light){--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}}:root.w-theme-dark,.w-theme-dark{color-scheme:dark;--p-surface-D: #fff;--p-surface-0: #fff;--p-surface-50: #fafafa;--p-surface-100: #f4f4f5;--p-surface-200: #e4e4e7;--p-surface-300: #d4d4d8;--p-surface-400: #a1a1aa;--p-surface-500: #71717a;--p-surface-600: #545250;--p-surface-700: #403e3c;--p-surface-800: #2b2927;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #1c1a19;--p-surface-950: #0f0e0d;--p-primary: rgb(0, 125, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-400);--p-primary-contrast-color: var(--p-surface-900);--p-primary-hover-color: var(--p-primary-300);--p-primary-active-color: var(--p-primary-200);--p-secondary-color: var(--p-secondary-400);--p-secondary-contrast-color: var(--p-surface-900);--p-secondary-hover-color: var(--p-secondary-300);--p-secondary-active-color: var(--p-secondary-200);--p-danger-color: var(--p-danger-400);--p-danger-contrast-color: var(--p-surface-900);--p-danger-hover-color: var(--p-danger-300);--p-danger-active-color: var(--p-danger-200);--p-success-color: var(--p-success-400);--p-success-contrast-color: var(--p-surface-900);--p-success-hover-color: var(--p-success-300);--p-success-active-color: var(--p-success-200);--p-warn-color: var(--p-warn-400);--p-warn-contrast-color: var(--p-surface-900);--p-warn-hover-color: var(--p-warn-300);--p-warn-active-color: var(--p-warn-200);--p-info-color: var(--p-info-400);--p-info-contrast-color: var(--p-surface-900);--p-info-hover-color: var(--p-info-300);--p-info-active-color: var(--p-info-200);--p-help-color: var(--p-help-400);--p-help-contrast-color: var(--p-surface-900);--p-help-hover-color: var(--p-help-300);--p-help-active-color: var(--p-help-200);--p-accent-color: var(--p-accent-400);--p-accent-contrast-color: var(--p-surface-900);--p-accent-hover-color: var(--p-accent-300);--p-accent-active-color: var(--p-accent-200);--p-content-border-color: var(--p-surface-700);--p-content-hover-background: var(--p-surface-800);--p-content-hover-color: var(--p-surface-0);--p-highlight-background: color-mix(in srgb, var(--p-primary-400), transparent 84%);--p-highlight-color: rgba(255, 255, 255, 87%);--p-highlight-focus-background: color-mix(in srgb, var(--p-primary-400), transparent 76%);--p-highlight-focus-color: rgba(255, 255, 255, 87%);--p-content-background: var(--p-surface-900);--p-text-color: var(--p-surface-0);--p-text-hover-color: var(--p-surface-0);--p-text-muted-color: var(--p-surface-400);--p-text-hover-muted-color: var(--p-surface-300)}:root.w-theme-light,.w-theme-light{color-scheme:light;--p-surface-0: #ffffff;--p-surface-50: #fafafa;--p-surface-100: #f5f5f5;--p-surface-200: #e5e5e5;--p-surface-300: #d4d4d4;--p-surface-400: #a3a3a3;--p-surface-500: #737373;--p-surface-600: #525252;--p-surface-700: #404040;--p-surface-800: #262626;--p-surface-850: color-mix(in srgb, var(--p-surface-800) 50%, var(--p-surface-900));--p-surface-900: #171717;--p-surface-950: #0a0a0a;--p-primary: rgb(0, 95, 178);--p-primary-50: color-mix(in srgb, var(--p-primary) 5%, white);--p-primary-100: color-mix(in srgb, var(--p-primary) 10%, white);--p-primary-200: color-mix(in srgb, var(--p-primary) 20%, white);--p-primary-300: color-mix(in srgb, var(--p-primary) 30%, white);--p-primary-400: color-mix(in srgb, var(--p-primary) 40%, white);--p-primary-500: var(--p-primary);--p-primary-600: color-mix(in srgb, var(--p-primary) 80%, black);--p-primary-700: color-mix(in srgb, var(--p-primary) 70%, black);--p-primary-800: color-mix(in srgb, var(--p-primary) 60%, black);--p-primary-900: color-mix(in srgb, var(--p-primary) 50%, black);--p-primary-950: color-mix(in srgb, var(--p-primary) 40%, black);--p-primary-color: var(--p-primary-500);--p-primary-contrast-color: var(--p-surface-0);--p-primary-hover-color: var(--p-primary-600);--p-primary-active-color: var(--p-primary-700);--p-secondary-color: var(--p-secondary-500);--p-secondary-contrast-color: var(--p-surface-0);--p-secondary-hover-color: var(--p-secondary-600);--p-secondary-active-color: var(--p-secondary-700);--p-danger-color: var(--p-danger-500);--p-danger-contrast-color: var(--p-surface-0);--p-danger-hover-color: var(--p-danger-600);--p-danger-active-color: var(--p-danger-700);--p-success-color: var(--p-success-500);--p-success-contrast-color: var(--p-surface-0);--p-success-hover-color: var(--p-success-600);--p-success-active-color: var(--p-success-700);--p-warn-color: var(--p-warn-500);--p-warn-contrast-color: var(--p-surface-0);--p-warn-hover-color: var(--p-warn-600);--p-warn-active-color: var(--p-warn-700);--p-info-color: var(--p-info-500);--p-info-contrast-color: var(--p-surface-0);--p-info-hover-color: var(--p-info-600);--p-info-active-color: var(--p-info-700);--p-help-color: var(--p-help-500);--p-help-contrast-color: var(--p-surface-0);--p-help-hover-color: var(--p-help-600);--p-help-active-color: var(--p-help-700);--p-accent-color: var(--p-accent-500);--p-accent-contrast-color: var(--p-surface-0);--p-accent-hover-color: var(--p-accent-600);--p-accent-active-color: var(--p-accent-700);--p-content-border-color: var(--p-surface-200);--p-content-hover-background: var(--p-surface-100);--p-content-hover-color: var(--p-surface-800);--p-highlight-background: var(--p-primary-50);--p-highlight-color: var(--p-primary-700);--p-highlight-focus-background: var(--p-primary-100);--p-highlight-focus-color: var(--p-primary-800);--p-content-background: var(--p-surface-0);--p-text-color: var(--p-surface-700);--p-text-hover-color: var(--p-surface-800);--p-text-muted-color: var(--p-surface-500);--p-text-hover-muted-color: var(--p-surface-600)}:host{display:block}:host>div{width:100%;height:100%}.chartjs-container{position:relative;width:100%;height:100%;min-height:200px;box-sizing:border-box}.chartjs-canvas-wrapper{position:relative;width:100%;height:100%}.chartjs-error{padding:12px 16px;border-radius:6px;background:var(--p-danger-50, #fef2f2);color:var(--p-danger-700, #b91c1c);border:1px solid var(--p-danger-200, #fecaca);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:13px;line-height:1.4}", ou = { props: { type: "object", properties: { type: { type: "string", enum: ["line", "bar", "doughnut", "pie", "radar", "polarArea", "scatter", "bubble"], default: "doughnut", description: "Chart.js chart type" }, data: { type: "string", default: "", description: "JSON-stringified Chart.js Data object: { labels?, datasets: [{label?, data, ...}] }" }, options: { type: "string", default: "", description: "JSON-stringified Chart.js Options object (optional)" }, plugins: { type: "string", default: "", description: "JSON-stringified array of Chart.js plugin definitions (optional)" } } } }, ru = {
  wippy: ou
};
class au extends Sr {
  static get wippyConfig() {
    return {
      propsSchema: ru.wippy.props,
      hostCssKeys: ["themeConfigUrl"],
      inlineCss: nu
    };
  }
  static get vueConfig() {
    return {
      rootComponent: su
    };
  }
}
Yo(import.meta.url, au);
