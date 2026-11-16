import { p as I } from "./chunk-JWPE2WC7-DTR2VKWy.js";
import { bc as F, a1 as _, a5 as E, bf as D, a2 as P, bd as z, b as c, bb as G, u as B, t as b, a3 as w, S as W, aJ as C, ad as V, F as H } from "./mermaid.core-CnOyqc27.js";
import { p as j } from "./cynefin-EF2NZ3EQ-QM7qr0zk.js";
var m = {
  showLegend: !0,
  ticks: 5,
  max: null,
  min: 0,
  graticule: "circle"
}, y = 32, A = {
  axes: [],
  curves: [],
  options: m
}, x = structuredClone(A), U = W.radar, X = /* @__PURE__ */ c(() => b({
  ...U,
  ...w().radar
}), "getConfig"), M = /* @__PURE__ */ c(() => x.axes, "getAxes"), J = /* @__PURE__ */ c(() => x.curves, "getCurves"), K = /* @__PURE__ */ c(() => x.options, "getOptions"), N = /* @__PURE__ */ c((a) => {
  x.axes = a.map((t) => ({
    name: t.name,
    label: t.label ?? t.name
  }));
}, "setAxes"), Y = /* @__PURE__ */ c((a) => {
  x.curves = a.map((t) => ({
    name: t.name,
    label: t.label ?? t.name,
    entries: Z(t.entries)
  }));
}, "setCurves"), Z = /* @__PURE__ */ c((a) => {
  if (a[0].axis == null)
    return a.map((e) => e.value);
  const t = M();
  if (t.length === 0)
    throw new Error("Axes must be populated before curves for reference entries");
  return t.map((e) => {
    const r = a.find((s) => s.axis?.$refText === e.name);
    if (r === void 0)
      throw new Error("Missing entry for axis " + e.label);
    return r.value;
  });
}, "computeCurveEntries"), q = /* @__PURE__ */ c((a) => {
  const t = a.reduce(
    (e, r) => (e[r.name] = r, e),
    {}
  );
  x.options = {
    showLegend: t.showLegend?.value ?? m.showLegend,
    ticks: t.ticks?.value ?? m.ticks,
    max: t.max?.value ?? m.max,
    min: t.min?.value ?? m.min,
    graticule: t.graticule?.value ?? m.graticule
  }, x.options.ticks > y && (C.warn(
    `Radar diagram ticks (${x.options.ticks}) exceeds maximum allowed (${y}). Using ${y} instead.`
  ), x.options.ticks = y);
}, "setOptions"), Q = /* @__PURE__ */ c(() => {
  B(), x = structuredClone(A);
}, "clear"), $ = {
  getAxes: M,
  getCurves: J,
  getOptions: K,
  setAxes: N,
  setCurves: Y,
  setOptions: q,
  getConfig: X,
  clear: Q,
  setAccTitle: z,
  getAccTitle: P,
  setDiagramTitle: D,
  getDiagramTitle: E,
  getAccDescription: _,
  setAccDescription: F
}, tt = /* @__PURE__ */ c((a) => {
  I(a, $);
  const { axes: t, curves: e, options: r } = a;
  $.setAxes(t), $.setCurves(e), $.setOptions(r);
}, "populate"), et = {
  parse: /* @__PURE__ */ c(async (a) => {
    const t = await j("radar", a);
    C.debug(t), tt(t);
  }, "parse")
}, at = /* @__PURE__ */ c((a, t, e, r) => {
  const s = r.db, i = s.getAxes(), l = s.getCurves(), n = s.getOptions(), o = s.getConfig(), d = s.getDiagramTitle(), p = G(t), u = rt(p, o), g = n.max ?? Math.max(...l.map((f) => Math.max(...f.entries))), h = n.min, v = Math.min(o.width, o.height) / 2;
  st(u, i, v, n.ticks, n.graticule), nt(u, i, v, o), L(u, i, l, h, g, n.graticule, o), k(u, l, n.showLegend, o), u.append("text").attr("class", "radarTitle").text(d).attr("x", 0).attr("y", -o.height / 2 - o.marginTop);
}, "draw"), rt = /* @__PURE__ */ c((a, t) => {
  const e = t.width + t.marginLeft + t.marginRight, r = t.height + t.marginTop + t.marginBottom, s = {
    x: t.marginLeft + t.width / 2,
    y: t.marginTop + t.height / 2
  };
  return H(a, r, e, t.useMaxWidth ?? !0), a.attr("viewBox", `0 0 ${e} ${r}`).attr("overflow", "visible"), a.append("g").attr("transform", `translate(${s.x}, ${s.y})`);
}, "drawFrame"), st = /* @__PURE__ */ c((a, t, e, r, s) => {
  if (s === "circle")
    for (let i = 0; i < r; i++) {
      const l = e * (i + 1) / r;
      a.append("circle").attr("r", l).attr("class", "radarGraticule");
    }
  else if (s === "polygon") {
    const i = t.length;
    for (let l = 0; l < r; l++) {
      const n = e * (l + 1) / r, o = t.map((d, p) => {
        const u = 2 * p * Math.PI / i - Math.PI / 2, g = n * Math.cos(u), h = n * Math.sin(u);
        return `${g},${h}`;
      }).join(" ");
      a.append("polygon").attr("points", o).attr("class", "radarGraticule");
    }
  }
}, "drawGraticule"), nt = /* @__PURE__ */ c((a, t, e, r) => {
  const s = t.length;
  for (let i = 0; i < s; i++) {
    const l = t[i].label, n = 2 * i * Math.PI / s - Math.PI / 2, o = Math.cos(n), d = Math.sin(n);
    a.append("line").attr("x1", 0).attr("y1", 0).attr("x2", e * r.axisScaleFactor * o).attr("y2", e * r.axisScaleFactor * d).attr("class", "radarAxisLine");
    const p = o > 0.01 ? "start" : o < -0.01 ? "end" : "middle", u = d > 0.01 ? "hanging" : d < -0.01 ? "auto" : "central", g = 4;
    a.append("text").text(l).attr("x", e * r.axisLabelFactor * o + g * o).attr("y", e * r.axisLabelFactor * d + g * d).attr("text-anchor", p).attr("dominant-baseline", u).attr("class", "radarAxisLabel");
  }
}, "drawAxes");
function L(a, t, e, r, s, i, l) {
  const n = t.length, o = Math.min(l.width, l.height) / 2;
  e.forEach((d, p) => {
    if (d.entries.length !== n)
      return;
    const u = d.entries.map((g, h) => {
      const v = 2 * Math.PI * h / n - Math.PI / 2, f = T(g, r, s, o), O = f * Math.cos(v), R = f * Math.sin(v);
      return { x: O, y: R };
    });
    i === "circle" ? a.append("path").attr("d", S(u, l.curveTension)).attr("class", `radarCurve-${p}`) : i === "polygon" && a.append("polygon").attr("points", u.map((g) => `${g.x},${g.y}`).join(" ")).attr("class", `radarCurve-${p}`);
  });
}
c(L, "drawCurves");
function T(a, t, e, r) {
  const s = Math.min(Math.max(a, t), e);
  return r * (s - t) / (e - t);
}
c(T, "relativeRadius");
function S(a, t) {
  const e = a.length;
  let r = `M${a[0].x},${a[0].y}`;
  for (let s = 0; s < e; s++) {
    const i = a[(s - 1 + e) % e], l = a[s], n = a[(s + 1) % e], o = a[(s + 2) % e], d = {
      x: l.x + (n.x - i.x) * t,
      y: l.y + (n.y - i.y) * t
    }, p = {
      x: n.x - (o.x - l.x) * t,
      y: n.y - (o.y - l.y) * t
    };
    r += ` C${d.x},${d.y} ${p.x},${p.y} ${n.x},${n.y}`;
  }
  return `${r} Z`;
}
c(S, "closedRoundCurve");
function k(a, t, e, r) {
  if (!e)
    return;
  const s = (r.width / 2 + r.marginRight) * 3 / 4, i = -(r.height / 2 + r.marginTop) * 3 / 4, l = 20;
  t.forEach((n, o) => {
    const d = a.append("g").attr("transform", `translate(${s}, ${i + o * l})`);
    d.append("rect").attr("width", 12).attr("height", 12).attr("class", `radarLegendBox-${o}`), d.append("text").attr("x", 16).attr("y", 0).attr("class", "radarLegendText").text(n.label);
  });
}
c(k, "drawLegend");
var ot = { draw: at }, it = /* @__PURE__ */ c((a, t) => {
  let e = "";
  for (let r = 0; r < a.THEME_COLOR_LIMIT; r++) {
    const s = a[`cScale${r}`];
    e += `
		.radarCurve-${r} {
			color: ${s};
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${s};
			fill-opacity: ${t.curveOpacity};
			stroke: ${s};
		}
		`;
  }
  return e;
}, "genIndexStyles"), lt = /* @__PURE__ */ c((a) => {
  const t = V(), e = w(), r = b(t, e.themeVariables), s = b(r.radar, a);
  return { themeVariables: r, radarOptions: s };
}, "buildRadarStyleOptions"), ct = /* @__PURE__ */ c(({ radar: a } = {}) => {
  const { themeVariables: t, radarOptions: e } = lt(a);
  return `
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${it(t, e)}
	`;
}, "styles"), gt = {
  parser: et,
  db: $,
  renderer: ot,
  styles: ct
};
export {
  gt as diagram
};
