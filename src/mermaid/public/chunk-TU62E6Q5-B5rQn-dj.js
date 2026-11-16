import { b as a, F as w, aJ as x } from "./mermaid.core-CnOyqc27.js";
var g = /* @__PURE__ */ a((e, t, i, r) => {
  e.attr("class", i);
  const { width: o, height: h, x: n, y: c } = u(e, t);
  w(e, h, o, r);
  const s = B(n, c, o, h, t);
  e.attr("viewBox", s), x.debug(`viewBox configured: ${s} with padding: ${t}`);
}, "setupViewPortForSVG"), u = /* @__PURE__ */ a((e, t) => {
  const i = e.node()?.getBBox() || { width: 0, height: 0, x: 0, y: 0 };
  return {
    width: i.width + t * 2,
    height: i.height + t * 2,
    x: i.x,
    y: i.y
  };
}, "calculateDimensionsWithPadding"), B = /* @__PURE__ */ a((e, t, i, r, o) => `${e - o} ${t - o} ${i} ${r}`, "createViewBox");
export {
  g as s
};
