import { g as l, r as m, d as a } from "./chunk-OY52VR5R-Dx1_Tma-.js";
import { p } from "./chunk-JWPE2WC7-DTR2VKWy.js";
import { b as t, aJ as o } from "./mermaid.core-CnOyqc27.js";
import { M as u, b as c } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
var f = c().RailroadPeg.parser.LangiumParser, i = /* @__PURE__ */ t((e) => {
  const r = e.alternatives.map(d);
  return r.length === 1 ? r[0] : {
    type: "choice",
    alternatives: r
  };
}, "transformOrderedChoice"), d = /* @__PURE__ */ t((e) => {
  const r = e.elements.map(P);
  return r.length === 1 ? r[0] : {
    type: "sequence",
    elements: r
  };
}, "transformSequence"), P = /* @__PURE__ */ t((e) => {
  const r = g(e.suffix);
  return e.operator ? {
    type: "special",
    text: e.operator === "&" ? `&${s(r)}` : `!${s(r)}`
  } : r;
}, "transformPrefix"), s = /* @__PURE__ */ t((e) => {
  switch (e.type) {
    case "terminal":
      return `"${e.value}"`;
    case "nonterminal":
      return e.name;
    case "special":
      return e.text;
    default:
      return "(...)";
  }
}, "nodeToLabel"), g = /* @__PURE__ */ t((e) => {
  const r = v(e.primary);
  if (!e.operator)
    return r;
  switch (e.operator) {
    case "?":
      return { type: "optional", element: r };
    case "*":
      return { type: "repetition", element: r, min: 0, max: 1 / 0 };
    case "+":
      return { type: "repetition", element: r, min: 1, max: 1 / 0 };
    default:
      throw new Error(`Unsupported PEG suffix operator: ${e.operator}`);
  }
}, "transformSuffix"), v = /* @__PURE__ */ t((e) => {
  switch (e.$type) {
    case "PegLiteral":
      return {
        type: "terminal",
        value: e.value
      };
    case "PegIdentifier":
      return {
        type: "nonterminal",
        name: e.name
      };
    case "PegGroup":
      return i(e.element);
    case "PegAny":
      return {
        type: "special",
        text: e.dot
      };
    default:
      throw new Error(`Unsupported PEG primary node: ${e.$type}`);
  }
}, "transformPrimary"), y = /* @__PURE__ */ t((e) => ({
  name: e.name,
  definition: i(e.definition)
}), "transformRule"), h = /* @__PURE__ */ t((e) => {
  p(e, a), e.title && a.setTitle(e.title), e.rules.map((r) => a.addRule(y(r)));
}, "populateDb"), b = {
  parse: /* @__PURE__ */ t((e) => {
    a.clear(), o.debug("[PEG Parser] Starting Langium parse");
    const r = f.parse(e);
    if (r.lexerErrors.length > 0 || r.parserErrors.length > 0)
      throw new u(r);
    const n = r.value;
    o.debug("[PEG Parser] Parsed rules:", n.rules.length), h(n), o.debug("[PEG Parser] Parse complete");
  }, "parse"),
  parser: {
    yy: a
  }
}, $ = {
  parser: b,
  db: a,
  renderer: m,
  styles: l
};
export {
  $ as diagram
};
