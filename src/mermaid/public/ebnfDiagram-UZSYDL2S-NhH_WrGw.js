import { g as l, r as m, d as n } from "./chunk-OY52VR5R-Dx1_Tma-.js";
import { p } from "./chunk-JWPE2WC7-DTR2VKWy.js";
import { b as t, aJ as o } from "./mermaid.core-CnOyqc27.js";
import { M as u, a as f } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
var c = f().RailroadEbnf.parser.LangiumParser, s = /* @__PURE__ */ t((e) => {
  const r = e.alternatives.map(E);
  return r.length === 1 ? r[0] : {
    type: "choice",
    alternatives: r
  };
}, "transformChoice"), E = /* @__PURE__ */ t((e) => {
  const r = e.elements.map(d);
  return r.length === 1 ? r[0] : {
    type: "sequence",
    elements: r
  };
}, "transformSequence"), i = /* @__PURE__ */ t((e) => {
  switch (e.$type) {
    case "EbnfTerminal":
      return {
        type: "terminal",
        value: e.value
      };
    case "EbnfNonTerminal":
      return {
        type: "nonterminal",
        name: e.name
      };
    case "EbnfSpecial":
      return {
        type: "special",
        text: e.text
      };
    case "EbnfGroup":
      return s(e.element);
    case "EbnfOptional":
      return {
        type: "optional",
        element: s(e.element)
      };
    case "EbnfRepetition":
      return {
        type: "repetition",
        element: s(e.element),
        min: 0,
        max: 1 / 0
      };
    default:
      throw new Error(`Unsupported EBNF primary node: ${e.$type}`);
  }
}, "transformPrimary"), b = /* @__PURE__ */ t((e, r) => {
  switch (r.$type) {
    case "EbnfOptionalPostfix":
      return {
        type: "optional",
        element: e
      };
    case "EbnfZeroOrMorePostfix":
      return {
        type: "repetition",
        element: e,
        min: 0,
        max: 1 / 0
      };
    case "EbnfOneOrMorePostfix":
      return {
        type: "repetition",
        element: e,
        min: 1,
        max: 1 / 0
      };
    case "EbnfExceptionPostfix":
      return {
        type: "sequence",
        elements: [
          e,
          { type: "terminal", value: "-" },
          i(r.except)
        ]
      };
    default:
      throw new Error(`Unsupported EBNF postfix node: ${r.$type}`);
  }
}, "transformPostfix"), d = /* @__PURE__ */ t((e) => e.postfixes.reduce((r, a) => b(r, a), i(e.base)), "transformTerm"), y = /* @__PURE__ */ t((e) => ({
  name: e.name,
  definition: s(e.definition)
}), "transformRule"), v = /* @__PURE__ */ t((e) => {
  p(e, n), e.title && n.setTitle(e.title), e.rules.map((r) => n.addRule(y(r)));
}, "populateDb"), g = {
  parse: /* @__PURE__ */ t((e) => {
    n.clear(), o.debug("[EBNF Parser] Starting Langium parse");
    const r = c.parse(e);
    if (r.lexerErrors.length > 0 || r.parserErrors.length > 0)
      throw new u(r);
    const a = r.value;
    o.debug("[EBNF Parser] Parsed rules:", a.rules.length), v(a), o.debug("[EBNF Parser] Parse complete");
  }, "parse"),
  parser: {
    yy: n
  }
}, N = {
  parser: g,
  db: n,
  renderer: m,
  styles: l
};
export {
  N as diagram
};
