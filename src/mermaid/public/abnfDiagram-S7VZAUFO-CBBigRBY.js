import { g as p, r as u, d as n } from "./chunk-OY52VR5R-Dx1_Tma-.js";
import { p as f } from "./chunk-JWPE2WC7-DTR2VKWy.js";
import { b as a, aJ as o } from "./mermaid.core-CnOyqc27.js";
import { M as c, c as d } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
var v = d().RailroadAbnf.parser.LangiumParser, i = /* @__PURE__ */ a((e) => {
  const r = e.alternatives.map(g);
  return r.length === 1 ? r[0] : {
    type: "choice",
    alternatives: r
  };
}, "transformAlternation"), g = /* @__PURE__ */ a((e) => {
  const r = e.elements.map(y);
  return r.length === 1 ? r[0] : {
    type: "sequence",
    elements: r
  };
}, "transformConcatenation"), b = /* @__PURE__ */ a((e) => {
  if (e.includes("*")) {
    const [t, s] = e.split("*"), l = t ? parseInt(t, 10) : 0, m = s ? parseInt(s, 10) : 1 / 0;
    return { min: l, max: m };
  }
  const r = parseInt(e, 10);
  return { min: r, max: r };
}, "parseRepeat"), y = /* @__PURE__ */ a((e) => {
  const r = A(e.primary);
  if (!e.repeat)
    return r;
  const { min: t, max: s } = b(e.repeat);
  return t === 0 && s === 1 ? { type: "optional", element: r } : {
    type: "repetition",
    element: r,
    min: t,
    max: s
  };
}, "transformElement"), A = /* @__PURE__ */ a((e) => {
  switch (e.$type) {
    case "AbnfStringLiteral":
      return {
        type: "terminal",
        value: e.value
      };
    case "AbnfNumVal":
      return {
        type: "terminal",
        value: e.value
      };
    case "AbnfRuleName":
      return {
        type: "nonterminal",
        name: e.name
      };
    case "AbnfGroup":
      return i(e.element);
    case "AbnfOptionalGroup":
      return {
        type: "optional",
        element: i(e.element)
      };
    default:
      throw new Error(`Unsupported ABNF primary node: ${e.$type}`);
  }
}, "transformPrimary"), P = /* @__PURE__ */ a((e) => ({
  name: e.name,
  definition: i(e.definition)
}), "transformRule"), h = /* @__PURE__ */ a((e) => {
  f(e, n), e.title && n.setTitle(e.title), e.rules.map((r) => n.addRule(P(r)));
}, "populateDb"), R = {
  parse: /* @__PURE__ */ a((e) => {
    n.clear(), o.debug("[ABNF Parser] Starting Langium parse");
    const r = v.parse(e);
    if (r.lexerErrors.length > 0 || r.parserErrors.length > 0)
      throw new c(r);
    const t = r.value;
    o.debug("[ABNF Parser] Parsed rules:", t.rules.length), h(t), o.debug("[ABNF Parser] Parse complete");
  }, "parse"),
  parser: {
    yy: n
  }
}, w = {
  parser: R,
  db: n,
  renderer: u,
  styles: p
};
export {
  w as diagram
};
