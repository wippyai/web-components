import { b as e, aJ as s, bb as o, F as i } from "./mermaid.core-CnOyqc27.js";
import { p as g } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
var p = {
  parse: /* @__PURE__ */ e(async (r) => {
    const a = await g("info", r);
    s.debug(a);
  }, "parse")
}, v = {
  version: "12.3.0"
}, d = /* @__PURE__ */ e(() => v.version, "getVersion"), m = {
  getVersion: d
}, c = /* @__PURE__ */ e((r, a, n) => {
  s.debug(`rendering info diagram
` + r);
  const t = o(a);
  i(t, 100, 400, !0), t.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${n}`);
}, "draw"), b = { draw: c }, x = {
  parser: p,
  db: m,
  renderer: b
};
export {
  x as diagram
};
