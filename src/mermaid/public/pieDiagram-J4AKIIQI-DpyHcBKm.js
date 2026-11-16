import { p as at } from "./chunk-JWPE2WC7-DTR2VKWy.js";
import { G as D, br as _, g as rt, a1 as nt, bc as it, a2 as ot, bd as st, a5 as lt, bf as ct, b as g, aJ as B, a4 as ut, t as dt, bb as gt, aW as pt, F as ht, u as ft, S as mt } from "./mermaid.core-CnOyqc27.js";
import { p as vt } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
import { d as Z } from "./arc-4tE13yiJ.js";
import { o as xt } from "./ordinal-B6-f3MAq.js";
function St(t, n) {
  return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
}
function yt(t) {
  return t;
}
function wt() {
  var t = yt, n = St, y = null, T = D(0), l = D(_), p = D(0);
  function i(e) {
    var r, s = (e = rt(e)).length, h, w, $ = 0, f = new Array(s), o = new Array(s), b = +T.apply(this, arguments), E = Math.min(_, Math.max(-_, l.apply(this, arguments) - b)), k, W = Math.min(Math.abs(E) / s, p.apply(this, arguments)), u = W * (E < 0 ? -1 : 1), A;
    for (r = 0; r < s; ++r)
      (A = o[f[r] = r] = +t(e[r], r, e)) > 0 && ($ += A);
    for (n != null ? f.sort(function(M, m) {
      return n(o[M], o[m]);
    }) : y != null && f.sort(function(M, m) {
      return y(e[M], e[m]);
    }), r = 0, w = $ ? (E - s * u) / $ : 0; r < s; ++r, b = k)
      h = f[r], A = o[h], k = b + (A > 0 ? A * w : 0) + u, o[h] = {
        data: e[h],
        index: r,
        value: A,
        startAngle: b,
        endAngle: k,
        padAngle: W
      };
    return o;
  }
  return i.value = function(e) {
    return arguments.length ? (t = typeof e == "function" ? e : D(+e), i) : t;
  }, i.sortValues = function(e) {
    return arguments.length ? (n = e, y = null, i) : n;
  }, i.sort = function(e) {
    return arguments.length ? (y = e, n = null, i) : y;
  }, i.startAngle = function(e) {
    return arguments.length ? (T = typeof e == "function" ? e : D(+e), i) : T;
  }, i.endAngle = function(e) {
    return arguments.length ? (l = typeof e == "function" ? e : D(+e), i) : l;
  }, i.padAngle = function(e) {
    return arguments.length ? (p = typeof e == "function" ? e : D(+e), i) : p;
  }, i;
}
var At = mt.pie, I = {
  sections: /* @__PURE__ */ new Map(),
  showData: !1
}, G = I.sections, V = I.showData, Ct = structuredClone(At), $t = /* @__PURE__ */ g(() => structuredClone(Ct), "getConfig"), bt = /* @__PURE__ */ g(() => {
  G = /* @__PURE__ */ new Map(), V = I.showData, ft();
}, "clear"), Dt = /* @__PURE__ */ g(({ label: t, value: n }) => {
  if (n < 0)
    throw new Error(
      `"${t}" has invalid value: ${n}. Negative values are not allowed in pie charts. All slice values must be >= 0.`
    );
  G.has(t) || (G.set(t, n), B.debug(`added new section: ${t}, with value: ${n}`));
}, "addSection"), Tt = /* @__PURE__ */ g(() => G, "getSections"), kt = /* @__PURE__ */ g((t) => {
  V = t;
}, "setShowData"), zt = /* @__PURE__ */ g(() => V, "getShowData"), q = {
  getConfig: $t,
  clear: bt,
  setDiagramTitle: ct,
  getDiagramTitle: lt,
  setAccTitle: st,
  getAccTitle: ot,
  setAccDescription: it,
  getAccDescription: nt,
  addSection: Dt,
  getSections: Tt,
  setShowData: kt,
  getShowData: zt
}, Et = /* @__PURE__ */ g((t, n) => {
  at(t, n), n.setShowData(t.showData), t.sections.map(n.addSection);
}, "populateDb"), Mt = {
  parse: /* @__PURE__ */ g(async (t) => {
    const n = await vt("pie", t);
    B.debug(n), Et(n, q);
  }, "parse")
}, Rt = /* @__PURE__ */ g((t) => `
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`, "getStyles"), Wt = Rt, Ft = /* @__PURE__ */ g((t) => {
  const n = [...t.values()].reduce((l, p) => l + p, 0), y = [...t.entries()].map(([l, p]) => ({ label: l, value: p })).filter((l) => l.value / n * 100 >= 1);
  return wt().value((l) => l.value).sort(null)(y);
}, "createPieArcs"), Lt = /* @__PURE__ */ g((t, n, y, T) => {
  B.debug(`rendering pie chart
` + t);
  const l = T.db, p = ut(), i = dt(l.getConfig(), p.pie), e = 40, r = 18, s = 4, h = 450, w = h, $ = gt(n), f = $.append("g");
  f.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
  const { themeVariables: o } = p;
  let [b] = pt(o.pieOuterStrokeWidth);
  b ??= 2;
  const E = i.legendPosition, k = i.textPosition, W = i.donutHole > 0 && i.donutHole <= 0.9 ? i.donutHole : 0, u = Math.min(w, h) / 2 - e, A = Z().innerRadius(W * u).outerRadius(u), M = Z().innerRadius(u * k).outerRadius(u * k), m = f.append("g");
  m.append("circle").attr("cx", 0).attr("cy", 0).attr("r", u + b / 2).attr("class", "pieOuterCircle");
  const F = l.getSections(), K = Ft(F), Q = [
    o.pie1,
    o.pie2,
    o.pie3,
    o.pie4,
    o.pie5,
    o.pie6,
    o.pie7,
    o.pie8,
    o.pie9,
    o.pie10,
    o.pie11,
    o.pie12
  ];
  let H = 0;
  F.forEach((a) => {
    H += a;
  });
  const U = K.filter((a) => (a.data.value / H * 100).toFixed(0) !== "0"), N = xt(Q).domain([
    ...F.keys()
  ]);
  m.selectAll("mySlices").data(U).enter().append("path").attr("d", A).attr("fill", (a) => N(a.data.label)).attr("class", (a) => {
    let c = "pieCircle";
    return i.highlightSlice === "hover" ? c += " highlightedOnHover" : i.highlightSlice === a.data.label && (c += " highlighted"), c;
  }), m.selectAll("mySlices").data(U).enter().append("text").text((a) => (a.data.value / H * 100).toFixed(0) + "%").attr("transform", (a) => "translate(" + M.centroid(a) + ")").style("text-anchor", "middle").attr("class", "slice");
  const Y = f.append("text").text(l.getDiagramTitle()).attr("x", 0).attr("y", -400 / 2).attr("class", "pieTitleText"), R = [...F.entries()].map(([a, c]) => ({
    label: a,
    value: c
  })), C = f.selectAll(".legend").data(R).enter().append("g").attr("class", "legend");
  C.append("rect").attr("width", r).attr("height", r).style("fill", (a) => N(a.label)).style("stroke", (a) => N(a.label)), C.append("text").attr("x", r + s).attr("y", r - s).text((a) => l.getShowData() ? `${a.label} [${a.value}]` : a.label);
  const z = Math.max(
    ...C.selectAll("text").nodes().map((a) => a?.getBoundingClientRect().width ?? 0)
  );
  let L = h, O = w + e;
  const d = r + s, P = R.length * d;
  switch (E) {
    case "center":
      C.attr("transform", (a, c) => {
        const v = d * R.length / 2, x = -z / 2 - (r + s), S = c * d - v;
        return "translate(" + x + "," + S + ")";
      });
      break;
    case "top":
      L += P, C.attr("transform", (a, c) => {
        const v = u, x = -z / 2 - (r + s), S = c * d - v;
        return `translate(${x}, ${S})`;
      }), m.attr("transform", () => `translate(0, ${P + d})`);
      break;
    case "bottom":
      L += P, C.attr("transform", (a, c) => {
        const v = -u - d, x = -z / 2 - (r + s), S = c * d - v;
        return "translate(" + x + "," + S + ")";
      });
      break;
    case "left":
      O += r + s + z, C.attr("transform", (a, c) => {
        const v = d * R.length / 2, x = -u - (r + s), S = c * d - v;
        return "translate(" + x + "," + S + ")";
      }), m.attr("transform", () => `translate(${z + r + s}, 0)`);
      break;
    default:
      O += r + s + z, C.attr("transform", (a, c) => {
        const v = d * R.length / 2, x = 12 * r, S = c * d - v;
        return "translate(" + x + "," + S + ")";
      });
      break;
  }
  const j = Y.node()?.getBoundingClientRect().width ?? 0, tt = w / 2 - j / 2, et = w / 2 + j / 2, J = Math.min(0, tt), X = Math.max(O, et) - J;
  $.attr("viewBox", `${J} 0 ${X} ${L}`), ht($, L, X, i.useMaxWidth);
}, "draw"), Gt = { draw: Lt }, It = {
  parser: Mt,
  db: q,
  renderer: Gt,
  styles: Wt
};
export {
  It as diagram
};
