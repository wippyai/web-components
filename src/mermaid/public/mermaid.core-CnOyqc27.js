import { g as W0 } from "./index.js";
var Ld = Object.defineProperty, d = (e, t) => Ld(e, "name", { value: t, configurable: !0 }), z0 = (e, t) => {
  for (var r in t)
    Ld(e, r, { get: t[r], enumerable: !0 });
};
function Fd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
d(Fd, "getDefaultExportFromCjs");
var fe = {}, zs = {}, $r = {}, Qh;
function Di() {
  if (Qh) return $r;
  Qh = 1;
  function e(a) {
    return typeof a > "u" || a === null;
  }
  d(e, "isNothing");
  function t(a) {
    return typeof a == "object" && a !== null;
  }
  d(t, "isObject");
  function r(a) {
    return Array.isArray(a) ? a : e(a) ? [] : [a];
  }
  d(r, "toArray");
  function i(a, n) {
    if (n) {
      const l = Object.keys(n);
      for (let c = 0, h = l.length; c < h; c += 1) {
        const u = l[c];
        a[u] = n[u];
      }
    }
    return a;
  }
  d(i, "extend");
  function s(a, n) {
    let l = "";
    for (let c = 0; c < n; c += 1)
      l += a;
    return l;
  }
  d(s, "repeat");
  function o(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return d(o, "isNegativeZero"), $r.isNothing = e, $r.isObject = t, $r.toArray = r, $r.repeat = s, $r.isNegativeZero = o, $r.extend = i, $r;
}
d(Di, "requireCommon");
var Ea, Jh;
function Ii() {
  if (Jh) return Ea;
  Jh = 1;
  function e(r, i) {
    let s = "";
    const o = r.reason || "(unknown reason)";
    return r.mark ? (r.mark.name && (s += 'in "' + r.mark.name + '" '), s += "(" + (r.mark.line + 1) + ":" + (r.mark.column + 1) + ")", !i && r.mark.snippet && (s += `

` + r.mark.snippet), o + " " + s) : o;
  }
  d(e, "formatError");
  function t(r, i) {
    Error.call(this), this.name = "YAMLException", this.reason = r, this.mark = i, this.message = e(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return d(t, "YAMLException2"), t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t.prototype.toString = /* @__PURE__ */ d(function(i) {
    return this.name + ": " + e(this, i);
  }, "toString"), Ea = t, Ea;
}
d(Ii, "requireException");
var $a, tc;
function Ad() {
  if (tc) return $a;
  tc = 1;
  const e = Di();
  function t(s, o, a, n, l) {
    let c = "", h = "";
    const u = Math.floor(l / 2) - 1;
    return n - o > u && (c = " ... ", o = n - u + c.length), a - n > u && (h = " ...", a = n + u - h.length), {
      str: c + s.slice(o, a).replace(/\t/g, "→") + h,
      pos: n - o + c.length
      // relative position
    };
  }
  d(t, "getLine");
  function r(s, o) {
    return e.repeat(" ", o - s.length) + s;
  }
  d(r, "padStart");
  function i(s, o) {
    if (o = Object.create(o || null), !s.buffer) return null;
    o.maxLength || (o.maxLength = 79), typeof o.indent != "number" && (o.indent = 1), typeof o.linesBefore != "number" && (o.linesBefore = 3), typeof o.linesAfter != "number" && (o.linesAfter = 2);
    const a = /\r?\n|\r|\0/g, n = [0], l = [];
    let c, h = -1;
    for (; c = a.exec(s.buffer); )
      l.push(c.index), n.push(c.index + c[0].length), s.position <= c.index && h < 0 && (h = n.length - 2);
    h < 0 && (h = n.length - 1);
    let u = "";
    const f = Math.min(s.line + o.linesAfter, l.length).toString().length, p = o.maxLength - (o.indent + f + 3);
    for (let y = 1; y <= o.linesBefore && !(h - y < 0); y++) {
      const x = t(
        s.buffer,
        n[h - y],
        l[h - y],
        s.position - (n[h] - n[h - y]),
        p
      );
      u = e.repeat(" ", o.indent) + r((s.line - y + 1).toString(), f) + " | " + x.str + `
` + u;
    }
    const m = t(s.buffer, n[h], l[h], s.position, p);
    u += e.repeat(" ", o.indent) + r((s.line + 1).toString(), f) + " | " + m.str + `
`, u += e.repeat("-", o.indent + f + 3 + m.pos) + `^
`;
    for (let y = 1; y <= o.linesAfter && !(h + y >= l.length); y++) {
      const x = t(
        s.buffer,
        n[h + y],
        l[h + y],
        s.position - (n[h] - n[h + y]),
        p
      );
      u += e.repeat(" ", o.indent) + r((s.line + y + 1).toString(), f) + " | " + x.str + `
`;
    }
    return u.replace(/\n$/, "");
  }
  return d(i, "makeSnippet"), $a = i, $a;
}
d(Ad, "requireSnippet");
var Oa, ec;
function me() {
  if (ec) return Oa;
  ec = 1;
  const e = Ii(), t = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], r = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function i(o) {
    const a = {};
    return o !== null && Object.keys(o).forEach(function(n) {
      o[n].forEach(function(l) {
        a[String(l)] = n;
      });
    }), a;
  }
  d(i, "compileStyleAliases");
  function s(o, a) {
    if (a = a || {}, Object.keys(a).forEach(function(n) {
      if (t.indexOf(n) === -1)
        throw new e('Unknown option "' + n + '" is met in definition of "' + o + '" YAML type.');
    }), this.options = a, this.tag = o, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(n) {
      return n;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = i(a.styleAliases || null), r.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + o + '" YAML type.');
  }
  return d(s, "Type2"), Oa = s, Oa;
}
d(me, "requireType");
var Da, rc;
function yl() {
  if (rc) return Da;
  rc = 1;
  const e = Ii(), t = me();
  function r(o, a) {
    const n = [];
    return o[a].forEach(function(l) {
      let c = n.length;
      n.forEach(function(h, u) {
        h.tag === l.tag && h.kind === l.kind && h.multi === l.multi && (c = u);
      }), n[c] = l;
    }), n;
  }
  d(r, "compileList");
  function i() {
    const o = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    };
    function a(n) {
      n.multi ? (o.multi[n.kind].push(n), o.multi.fallback.push(n)) : o[n.kind][n.tag] = o.fallback[n.tag] = n;
    }
    d(a, "collectType");
    for (let n = 0, l = arguments.length; n < l; n += 1)
      arguments[n].forEach(a);
    return o;
  }
  d(i, "compileMap");
  function s(o) {
    return this.extend(o);
  }
  return d(s, "Schema2"), s.prototype.extend = /* @__PURE__ */ d(function(a) {
    let n = [], l = [];
    if (a instanceof t)
      l.push(a);
    else if (Array.isArray(a))
      l = l.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (n = n.concat(a.implicit)), a.explicit && (l = l.concat(a.explicit));
    else
      throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    n.forEach(function(h) {
      if (!(h instanceof t))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (h.loadKind && h.loadKind !== "scalar")
        throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (h.multi)
        throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), l.forEach(function(h) {
      if (!(h instanceof t))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    const c = Object.create(s.prototype);
    return c.implicit = (this.implicit || []).concat(n), c.explicit = (this.explicit || []).concat(l), c.compiledImplicit = r(c, "implicit"), c.compiledExplicit = r(c, "explicit"), c.compiledTypeMap = i(c.compiledImplicit, c.compiledExplicit), c;
  }, "extend"), Da = s, Da;
}
d(yl, "requireSchema");
var Ia, ic;
function xl() {
  if (ic) return Ia;
  ic = 1;
  const e = me();
  return Ia = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: /* @__PURE__ */ d(function(t) {
      return t !== null ? t : "";
    }, "construct")
  }), Ia;
}
d(xl, "requireStr");
var Pa, sc;
function Cl() {
  if (sc) return Pa;
  sc = 1;
  const e = me();
  return Pa = new e("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: /* @__PURE__ */ d(function(t) {
      return t !== null ? t : [];
    }, "construct")
  }), Pa;
}
d(Cl, "requireSeq");
var Ra, oc;
function bl() {
  if (oc) return Ra;
  oc = 1;
  const e = me();
  return Ra = new e("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: /* @__PURE__ */ d(function(t) {
      return t !== null ? t : {};
    }, "construct")
  }), Ra;
}
d(bl, "requireMap");
var Na, ac;
function kl() {
  if (ac) return Na;
  ac = 1;
  const e = yl();
  return Na = new e({
    explicit: [
      xl(),
      Cl(),
      bl()
    ]
  }), Na;
}
d(kl, "requireFailsafe");
var qa, nc;
function wl() {
  if (nc) return qa;
  nc = 1;
  const e = me();
  function t(s) {
    if (s === null) return !0;
    const o = s.length;
    return o === 1 && s === "~" || o === 4 && (s === "null" || s === "Null" || s === "NULL");
  }
  d(t, "resolveYamlNull");
  function r() {
    return null;
  }
  d(r, "constructYamlNull");
  function i(s) {
    return s === null;
  }
  return d(i, "isNull"), qa = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: t,
    construct: r,
    predicate: i,
    represent: {
      canonical: /* @__PURE__ */ d(function() {
        return "~";
      }, "canonical"),
      lowercase: /* @__PURE__ */ d(function() {
        return "null";
      }, "lowercase"),
      uppercase: /* @__PURE__ */ d(function() {
        return "NULL";
      }, "uppercase"),
      camelcase: /* @__PURE__ */ d(function() {
        return "Null";
      }, "camelcase"),
      empty: /* @__PURE__ */ d(function() {
        return "";
      }, "empty")
    },
    defaultStyle: "lowercase"
  }), qa;
}
d(wl, "require_null");
var Wa, lc;
function Sl() {
  if (lc) return Wa;
  lc = 1;
  const e = me();
  function t(s) {
    if (s === null) return !1;
    const o = s.length;
    return o === 4 && (s === "true" || s === "True" || s === "TRUE") || o === 5 && (s === "false" || s === "False" || s === "FALSE");
  }
  d(t, "resolveYamlBoolean");
  function r(s) {
    return s === "true" || s === "True" || s === "TRUE";
  }
  d(r, "constructYamlBoolean");
  function i(s) {
    return Object.prototype.toString.call(s) === "[object Boolean]";
  }
  return d(i, "isBoolean"), Wa = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: t,
    construct: r,
    predicate: i,
    represent: {
      lowercase: /* @__PURE__ */ d(function(s) {
        return s ? "true" : "false";
      }, "lowercase"),
      uppercase: /* @__PURE__ */ d(function(s) {
        return s ? "TRUE" : "FALSE";
      }, "uppercase"),
      camelcase: /* @__PURE__ */ d(function(s) {
        return s ? "True" : "False";
      }, "camelcase")
    },
    defaultStyle: "lowercase"
  }), Wa;
}
d(Sl, "requireBool");
var za, hc;
function Tl() {
  if (hc) return za;
  hc = 1;
  const e = Di(), t = me();
  function r(c) {
    return c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102;
  }
  d(r, "isHexCode");
  function i(c) {
    return c >= 48 && c <= 55;
  }
  d(i, "isOctCode");
  function s(c) {
    return c >= 48 && c <= 57;
  }
  d(s, "isDecCode");
  function o(c) {
    if (c === null) return !1;
    const h = c.length;
    let u = 0, f = !1;
    if (!h) return !1;
    let p = c[u];
    if ((p === "-" || p === "+") && (p = c[++u]), p === "0") {
      if (u + 1 === h) return !0;
      if (p = c[++u], p === "b") {
        for (u++; u < h; u++) {
          if (p = c[u], p !== "0" && p !== "1") return !1;
          f = !0;
        }
        return f && isFinite(a(c));
      }
      if (p === "x") {
        for (u++; u < h; u++) {
          if (!r(c.charCodeAt(u))) return !1;
          f = !0;
        }
        return f && isFinite(a(c));
      }
      if (p === "o") {
        for (u++; u < h; u++) {
          if (!i(c.charCodeAt(u))) return !1;
          f = !0;
        }
        return f && isFinite(a(c));
      }
    }
    for (; u < h; u++) {
      if (!s(c.charCodeAt(u)))
        return !1;
      f = !0;
    }
    return f ? isFinite(a(c)) : !1;
  }
  d(o, "resolveYamlInteger");
  function a(c) {
    let h = c, u = 1, f = h[0];
    if ((f === "-" || f === "+") && (f === "-" && (u = -1), h = h.slice(1), f = h[0]), h === "0") return 0;
    if (f === "0") {
      if (h[1] === "b") return u * parseInt(h.slice(2), 2);
      if (h[1] === "x") return u * parseInt(h.slice(2), 16);
      if (h[1] === "o") return u * parseInt(h.slice(2), 8);
    }
    return u * parseInt(h, 10);
  }
  d(a, "parseYamlInteger");
  function n(c) {
    return a(c);
  }
  d(n, "constructYamlInteger");
  function l(c) {
    return Object.prototype.toString.call(c) === "[object Number]" && c % 1 === 0 && !e.isNegativeZero(c);
  }
  return d(l, "isInteger"), za = new t("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: o,
    construct: n,
    predicate: l,
    represent: {
      binary: /* @__PURE__ */ d(function(c) {
        return c >= 0 ? "0b" + c.toString(2) : "-0b" + c.toString(2).slice(1);
      }, "binary"),
      octal: /* @__PURE__ */ d(function(c) {
        return c >= 0 ? "0o" + c.toString(8) : "-0o" + c.toString(8).slice(1);
      }, "octal"),
      decimal: /* @__PURE__ */ d(function(c) {
        return c.toString(10);
      }, "decimal"),
      hexadecimal: /* @__PURE__ */ d(function(c) {
        return c >= 0 ? "0x" + c.toString(16).toUpperCase() : "-0x" + c.toString(16).toUpperCase().slice(1);
      }, "hexadecimal")
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), za;
}
d(Tl, "requireInt");
var Ha, cc;
function _l() {
  if (cc) return Ha;
  cc = 1;
  const e = Di(), t = me(), r = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  ), i = new RegExp(
    "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function s(c) {
    return c === null || !r.test(c) ? !1 : isFinite(parseFloat(c, 10)) ? !0 : i.test(c);
  }
  d(s, "resolveYamlFloat");
  function o(c) {
    let h = c.toLowerCase();
    const u = h[0] === "-" ? -1 : 1;
    return "+-".indexOf(h[0]) >= 0 && (h = h.slice(1)), h === ".inf" ? u === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : h === ".nan" ? NaN : u * parseFloat(h, 10);
  }
  d(o, "constructYamlFloat");
  const a = /^[-+]?[0-9]+e/;
  function n(c, h) {
    if (isNaN(c))
      switch (h) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === c)
      switch (h) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === c)
      switch (h) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (e.isNegativeZero(c))
      return "-0.0";
    const u = c.toString(10);
    return a.test(u) ? u.replace("e", ".e") : u;
  }
  d(n, "representYamlFloat");
  function l(c) {
    return Object.prototype.toString.call(c) === "[object Number]" && (c % 1 !== 0 || e.isNegativeZero(c));
  }
  return d(l, "isFloat"), Ha = new t("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: s,
    construct: o,
    predicate: l,
    represent: n,
    defaultStyle: "lowercase"
  }), Ha;
}
d(_l, "requireFloat");
var Ya, uc;
function Bl() {
  return uc || (uc = 1, Ya = kl().extend({
    implicit: [
      wl(),
      Sl(),
      Tl(),
      _l()
    ]
  })), Ya;
}
d(Bl, "requireJson");
var Ua, dc;
function vl() {
  return dc || (dc = 1, Ua = Bl()), Ua;
}
d(vl, "requireCore");
var ja, fc;
function Ll() {
  if (fc) return ja;
  fc = 1;
  const e = me(), t = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), r = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function i(a) {
    return a === null ? !1 : t.exec(a) !== null || r.exec(a) !== null;
  }
  d(i, "resolveYamlTimestamp");
  function s(a) {
    let n = 0, l = null, c = t.exec(a);
    if (c === null && (c = r.exec(a)), c === null) throw new Error("Date resolve error");
    const h = +c[1], u = +c[2] - 1, f = +c[3];
    if (!c[4])
      return new Date(Date.UTC(h, u, f));
    const p = +c[4], m = +c[5], y = +c[6];
    if (c[7]) {
      for (n = c[7].slice(0, 3); n.length < 3; )
        n += "0";
      n = +n;
    }
    if (c[9]) {
      const C = +c[10], b = +(c[11] || 0);
      l = (C * 60 + b) * 6e4, c[9] === "-" && (l = -l);
    }
    const x = new Date(Date.UTC(h, u, f, p, m, y, n));
    return l && x.setTime(x.getTime() - l), x;
  }
  d(s, "constructYamlTimestamp");
  function o(a) {
    return a.toISOString();
  }
  return d(o, "representYamlTimestamp"), ja = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: i,
    construct: s,
    instanceOf: Date,
    represent: o
  }), ja;
}
d(Ll, "requireTimestamp");
var Ga, pc;
function Fl() {
  if (pc) return Ga;
  pc = 1;
  const e = me();
  function t(r) {
    return r === "<<" || r === null;
  }
  return d(t, "resolveYamlMerge"), Ga = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: t
  }), Ga;
}
d(Fl, "requireMerge");
var Xa, gc;
function Al() {
  if (gc) return Xa;
  gc = 1;
  const e = me(), t = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function r(a) {
    if (a === null) return !1;
    let n = 0;
    const l = a.length, c = t;
    for (let h = 0; h < l; h++) {
      const u = c.indexOf(a.charAt(h));
      if (!(u > 64)) {
        if (u < 0) return !1;
        n += 6;
      }
    }
    return n % 8 === 0;
  }
  d(r, "resolveYamlBinary");
  function i(a) {
    const n = a.replace(/[\r\n=]/g, ""), l = n.length, c = t;
    let h = 0;
    const u = [];
    for (let p = 0; p < l; p++)
      p % 4 === 0 && p && (u.push(h >> 16 & 255), u.push(h >> 8 & 255), u.push(h & 255)), h = h << 6 | c.indexOf(n.charAt(p));
    const f = l % 4 * 6;
    return f === 0 ? (u.push(h >> 16 & 255), u.push(h >> 8 & 255), u.push(h & 255)) : f === 18 ? (u.push(h >> 10 & 255), u.push(h >> 2 & 255)) : f === 12 && u.push(h >> 4 & 255), new Uint8Array(u);
  }
  d(i, "constructYamlBinary");
  function s(a) {
    let n = "", l = 0;
    const c = a.length, h = t;
    for (let f = 0; f < c; f++)
      f % 3 === 0 && f && (n += h[l >> 18 & 63], n += h[l >> 12 & 63], n += h[l >> 6 & 63], n += h[l & 63]), l = (l << 8) + a[f];
    const u = c % 3;
    return u === 0 ? (n += h[l >> 18 & 63], n += h[l >> 12 & 63], n += h[l >> 6 & 63], n += h[l & 63]) : u === 2 ? (n += h[l >> 10 & 63], n += h[l >> 4 & 63], n += h[l << 2 & 63], n += h[64]) : u === 1 && (n += h[l >> 2 & 63], n += h[l << 4 & 63], n += h[64], n += h[64]), n;
  }
  d(s, "representYamlBinary");
  function o(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return d(o, "isBinary"), Xa = new e("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: r,
    construct: i,
    predicate: o,
    represent: s
  }), Xa;
}
d(Al, "requireBinary");
var Va, mc;
function Ml() {
  if (mc) return Va;
  mc = 1;
  const e = me(), t = Object.prototype.hasOwnProperty, r = Object.prototype.toString;
  function i(o) {
    if (o === null) return !0;
    const a = {}, n = o;
    for (let l = 0, c = n.length; l < c; l += 1) {
      const h = n[l];
      let u = !1;
      if (r.call(h) !== "[object Object]") return !1;
      let f;
      for (f in h)
        if (t.call(h, f))
          if (!u) u = !0;
          else return !1;
      if (!u || t.call(a, f)) return !1;
      Object.defineProperty(a, f, { value: !0 });
    }
    return !0;
  }
  d(i, "resolveYamlOmap");
  function s(o) {
    return o !== null ? o : [];
  }
  return d(s, "constructYamlOmap"), Va = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: i,
    construct: s
  }), Va;
}
d(Ml, "requireOmap");
var Za, yc;
function El() {
  if (yc) return Za;
  yc = 1;
  const e = me(), t = Object.prototype.toString;
  function r(s) {
    if (s === null) return !0;
    const o = s, a = new Array(o.length);
    for (let n = 0, l = o.length; n < l; n += 1) {
      const c = o[n];
      if (t.call(c) !== "[object Object]") return !1;
      const h = Object.keys(c);
      if (h.length !== 1) return !1;
      a[n] = [h[0], c[h[0]]];
    }
    return !0;
  }
  d(r, "resolveYamlPairs");
  function i(s) {
    if (s === null) return [];
    const o = s, a = new Array(o.length);
    for (let n = 0, l = o.length; n < l; n += 1) {
      const c = o[n], h = Object.keys(c);
      a[n] = [h[0], c[h[0]]];
    }
    return a;
  }
  return d(i, "constructYamlPairs"), Za = new e("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: r,
    construct: i
  }), Za;
}
d(El, "requirePairs");
var Ka, xc;
function $l() {
  if (xc) return Ka;
  xc = 1;
  const e = me(), t = Object.prototype.hasOwnProperty;
  function r(s) {
    if (s === null) return !0;
    const o = s;
    for (const a in o)
      if (t.call(o, a) && o[a] !== null)
        return !1;
    return !0;
  }
  d(r, "resolveYamlSet");
  function i(s) {
    return s !== null ? s : {};
  }
  return d(i, "constructYamlSet"), Ka = new e("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: r,
    construct: i
  }), Ka;
}
d($l, "requireSet");
var Qa, Cc;
function Qo() {
  return Cc || (Cc = 1, Qa = vl().extend({
    implicit: [
      Ll(),
      Fl()
    ],
    explicit: [
      Al(),
      Ml(),
      El(),
      $l()
    ]
  })), Qa;
}
d(Qo, "require_default");
var bc;
function Md() {
  if (bc) return zs;
  bc = 1;
  const e = Di(), t = Ii(), r = Ad(), i = Qo(), s = Object.prototype.hasOwnProperty, o = 1, a = 2, n = 3, l = 4, c = 1, h = 2, u = 3, f = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, m = /[,\[\]{}]/, y = /^(?:!|!!|![0-9A-Za-z-]+!)$/, x = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
  function C(g) {
    return Object.prototype.toString.call(g);
  }
  d(C, "_class");
  function b(g) {
    return g === 10 || g === 13;
  }
  d(b, "isEol");
  function S(g) {
    return g === 9 || g === 32;
  }
  d(S, "isWhiteSpace");
  function _(g) {
    return g === 9 || g === 32 || g === 10 || g === 13;
  }
  d(_, "isWsOrEol");
  function B(g) {
    return g === 44 || g === 91 || g === 93 || g === 123 || g === 125;
  }
  d(B, "isFlowIndicator");
  function F(g) {
    if (g >= 48 && g <= 57)
      return g - 48;
    const $ = g | 32;
    return $ >= 97 && $ <= 102 ? $ - 97 + 10 : -1;
  }
  d(F, "fromHexCode");
  function A(g) {
    return g === 120 ? 2 : g === 117 ? 4 : g === 85 ? 8 : 0;
  }
  d(A, "escapedHexLen");
  function L(g) {
    return g >= 48 && g <= 57 ? g - 48 : -1;
  }
  d(L, "fromDecimalCode");
  function H(g) {
    switch (g) {
      case 48:
        return "\0";
      case 97:
        return "\x07";
      case 98:
        return "\b";
      case 116:
        return "	";
      case 9:
        return "	";
      case 110:
        return `
`;
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 114:
        return "\r";
      case 101:
        return "\x1B";
      case 32:
        return " ";
      case 34:
        return '"';
      case 47:
        return "/";
      case 92:
        return "\\";
      case 78:
        return "";
      case 95:
        return " ";
      case 76:
        return "\u2028";
      case 80:
        return "\u2029";
      default:
        return "";
    }
  }
  d(H, "simpleEscapeSequence");
  function N(g) {
    return g <= 65535 ? String.fromCharCode(g) : String.fromCharCode(
      (g - 65536 >> 10) + 55296,
      (g - 65536 & 1023) + 56320
    );
  }
  d(N, "charFromCodepoint");
  function O(g, $, G) {
    $ === "__proto__" ? Object.defineProperty(g, $, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: G
    }) : g[$] = G;
  }
  d(O, "setProperty");
  const Q = new Array(256), R = new Array(256);
  for (let g = 0; g < 256; g++)
    Q[g] = H(g) ? 1 : 0, R[g] = H(g);
  function E(g, $) {
    this.input = g, this.filename = $.filename || null, this.schema = $.schema || i, this.onWarning = $.onWarning || null, this.legacy = $.legacy || !1, this.json = $.json || !1, this.listener = $.listener || null, this.maxDepth = typeof $.maxDepth == "number" ? $.maxDepth : 100, this.maxTotalMergeKeys = typeof $.maxTotalMergeKeys == "number" ? $.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = g.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
  }
  d(E, "State");
  function I(g, $) {
    const G = {
      name: g.filename,
      buffer: g.input.slice(0, -1),
      // omit trailing \0
      position: g.position,
      line: g.line,
      column: g.position - g.lineStart
    };
    return G.snippet = r(G), new t($, G);
  }
  d(I, "generateError");
  function v(g, $) {
    throw I(g, $);
  }
  d(v, "throwError");
  function W(g, $) {
    g.onWarning && g.onWarning.call(null, I(g, $));
  }
  d(W, "throwWarning");
  function q(g, $, G) {
    const Z = g.anchorMapTransactions;
    if (Z.length !== 0) {
      const j = Z[Z.length - 1];
      s.call(j, $) || (j[$] = {
        existed: s.call(g.anchorMap, $),
        value: g.anchorMap[$]
      });
    }
    g.anchorMap[$] = G;
  }
  d(q, "storeAnchor");
  function rt(g) {
    g.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
  }
  d(rt, "beginAnchorTransaction");
  function V(g) {
    const $ = g.anchorMapTransactions.pop(), G = g.anchorMapTransactions;
    if (G.length === 0) return;
    const Z = G[G.length - 1], j = Object.keys($);
    for (let k = 0, P = j.length; k < P; k += 1) {
      const Y = j[k];
      s.call(Z, Y) || (Z[Y] = $[Y]);
    }
  }
  d(V, "commitAnchorTransaction");
  function ut(g) {
    const $ = g.anchorMapTransactions.pop(), G = Object.keys($);
    for (let Z = G.length - 1; Z >= 0; Z -= 1) {
      const j = $[G[Z]];
      j.existed ? g.anchorMap[G[Z]] = j.value : delete g.anchorMap[G[Z]];
    }
  }
  d(ut, "rollbackAnchorTransaction");
  function xt(g) {
    return {
      position: g.position,
      line: g.line,
      lineStart: g.lineStart,
      lineIndent: g.lineIndent,
      firstTabInLine: g.firstTabInLine,
      tag: g.tag,
      anchor: g.anchor,
      kind: g.kind,
      result: g.result
    };
  }
  d(xt, "snapshotState");
  function wt(g, $) {
    g.position = $.position, g.line = $.line, g.lineStart = $.lineStart, g.lineIndent = $.lineIndent, g.firstTabInLine = $.firstTabInLine, g.tag = $.tag, g.anchor = $.anchor, g.kind = $.kind, g.result = $.result;
  }
  d(wt, "restoreState");
  const Bt = {
    YAML: /* @__PURE__ */ d(function($, G, Z) {
      $.version !== null && v($, "duplication of %YAML directive"), Z.length !== 1 && v($, "YAML directive accepts exactly one argument");
      const j = /^([0-9]+)\.([0-9]+)$/.exec(Z[0]);
      j === null && v($, "ill-formed argument of the YAML directive");
      const k = parseInt(j[1], 10), P = parseInt(j[2], 10);
      k !== 1 && v($, "unacceptable YAML version of the document"), $.version = Z[0], $.checkLineBreaks = P < 2, P !== 1 && P !== 2 && W($, "unsupported YAML version of the document");
    }, "handleYamlDirective"),
    TAG: /* @__PURE__ */ d(function($, G, Z) {
      let j;
      Z.length !== 2 && v($, "TAG directive accepts exactly two arguments");
      const k = Z[0];
      j = Z[1], y.test(k) || v($, "ill-formed tag handle (first argument) of the TAG directive"), s.call($.tagMap, k) && v($, 'there is a previously declared suffix for "' + k + '" tag handle'), x.test(j) || v($, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        j = decodeURIComponent(j);
      } catch {
        v($, "tag prefix is malformed: " + j);
      }
      $.tagMap[k] = j;
    }, "handleTagDirective")
  };
  function Ct(g, $, G, Z) {
    if ($ < G) {
      const j = g.input.slice($, G);
      if (Z)
        for (let k = 0, P = j.length; k < P; k += 1) {
          const Y = j.charCodeAt(k);
          Y === 9 || Y >= 32 && Y <= 1114111 || v(g, "expected valid JSON character");
        }
      else f.test(j) && v(g, "the stream contains non-printable characters");
      g.result += j;
    }
  }
  d(Ct, "captureSegment");
  function pt(g) {
    g.totalMergeKeys++, g.maxTotalMergeKeys !== -1 && g.totalMergeKeys > g.maxTotalMergeKeys && v(g, "merge keys exceeded maxTotalMergeKeys (" + g.maxTotalMergeKeys + ")");
  }
  d(pt, "chargeMergeWork");
  function dt(g, $, G, Z) {
    e.isObject(G) || v(g, "cannot merge mappings; the provided source object is unacceptable"), pt(g);
    const j = Object.keys(G);
    for (let k = 0, P = j.length; k < P; k += 1) {
      const Y = j[k];
      pt(g), s.call($, Y) || (O($, Y, G[Y]), Z[Y] = !0);
    }
  }
  d(dt, "mergeMappings");
  function _t(g, $, G, Z, j, k, P, Y, tt) {
    if (Array.isArray(j)) {
      j = Array.prototype.slice.call(j);
      for (let it = 0, st = j.length; it < st; it += 1)
        Array.isArray(j[it]) && v(g, "nested arrays are not supported inside keys"), typeof j == "object" && C(j[it]) === "[object Object]" && (j[it] = "[object Object]");
    }
    if (typeof j == "object" && C(j) === "[object Object]" && (j = "[object Object]"), j = String(j), $ === null && ($ = {}), Z === "tag:yaml.org,2002:merge")
      if (Array.isArray(k)) {
        k.length > 100 && v(g, "abnormal merge sequence size");
        for (let it = 0, st = k.length; it < st; it += 1)
          dt(g, $, k[it], G);
      } else
        dt(g, $, k, G);
    else
      !g.json && !s.call(G, j) && s.call($, j) && (g.line = P || g.line, g.lineStart = Y || g.lineStart, g.position = tt || g.position, v(g, "duplicated mapping key")), O($, j, k), delete G[j];
    return $;
  }
  d(_t, "storeMappingPair");
  function It(g) {
    const $ = g.input.charCodeAt(g.position);
    $ === 10 ? g.position++ : $ === 13 ? (g.position++, g.input.charCodeAt(g.position) === 10 && g.position++) : v(g, "a line break is expected"), g.line += 1, g.lineStart = g.position, g.firstTabInLine = -1;
  }
  d(It, "readLineBreak");
  function St(g, $, G) {
    let Z = 0, j = g.input.charCodeAt(g.position);
    for (; j !== 0; ) {
      for (; S(j); )
        j === 9 && g.firstTabInLine === -1 && (g.firstTabInLine = g.position), j = g.input.charCodeAt(++g.position);
      if ($ && j === 35)
        do
          j = g.input.charCodeAt(++g.position);
        while (j !== 10 && j !== 13 && j !== 0);
      if (b(j))
        for (It(g), j = g.input.charCodeAt(g.position), Z++, g.lineIndent = 0; j === 32; )
          g.lineIndent++, j = g.input.charCodeAt(++g.position);
      else
        break;
    }
    return G !== -1 && Z !== 0 && g.lineIndent < G && W(g, "deficient indentation"), Z;
  }
  d(St, "skipSeparationSpace");
  function Pt(g) {
    let $ = g.position, G = g.input.charCodeAt($);
    return !!((G === 45 || G === 46) && G === g.input.charCodeAt($ + 1) && G === g.input.charCodeAt($ + 2) && ($ += 3, G = g.input.charCodeAt($), G === 0 || _(G)));
  }
  d(Pt, "testDocumentSeparator");
  function Xt(g, $) {
    $ === 1 ? g.result += " " : $ > 1 && (g.result += e.repeat(`
`, $ - 1));
  }
  d(Xt, "writeFoldedLines");
  function we(g, $, G) {
    let Z, j, k, P, Y, tt;
    const it = g.kind, st = g.result;
    let X = g.input.charCodeAt(g.position);
    if (_(X) || B(X) || X === 35 || X === 38 || X === 42 || X === 33 || X === 124 || X === 62 || X === 39 || X === 34 || X === 37 || X === 64 || X === 96)
      return !1;
    if (X === 63 || X === 45) {
      const at = g.input.charCodeAt(g.position + 1);
      if (_(at) || G && B(at))
        return !1;
    }
    for (g.kind = "scalar", g.result = "", Z = j = g.position, k = !1; X !== 0; ) {
      if (X === 58) {
        const at = g.input.charCodeAt(g.position + 1);
        if (_(at) || G && B(at))
          break;
      } else if (X === 35) {
        const at = g.input.charCodeAt(g.position - 1);
        if (_(at))
          break;
      } else {
        if (g.position === g.lineStart && Pt(g) || G && B(X))
          break;
        if (b(X))
          if (P = g.line, Y = g.lineStart, tt = g.lineIndent, St(g, !1, -1), g.lineIndent >= $) {
            k = !0, X = g.input.charCodeAt(g.position);
            continue;
          } else {
            g.position = j, g.line = P, g.lineStart = Y, g.lineIndent = tt;
            break;
          }
      }
      k && (Ct(g, Z, j, !1), Xt(g, g.line - P), Z = j = g.position, k = !1), S(X) || (j = g.position + 1), X = g.input.charCodeAt(++g.position);
    }
    return Ct(g, Z, j, !1), g.result ? !0 : (g.kind = it, g.result = st, !1);
  }
  d(we, "readPlainScalar");
  function Fe(g, $) {
    let G, Z, j = g.input.charCodeAt(g.position);
    if (j !== 39)
      return !1;
    for (g.kind = "scalar", g.result = "", g.position++, G = Z = g.position; (j = g.input.charCodeAt(g.position)) !== 0; )
      if (j === 39)
        if (Ct(g, G, g.position, !0), j = g.input.charCodeAt(++g.position), j === 39)
          G = g.position, g.position++, Z = g.position;
        else
          return !0;
      else b(j) ? (Ct(g, G, Z, !0), Xt(g, St(g, !1, $)), G = Z = g.position) : g.position === g.lineStart && Pt(g) ? v(g, "unexpected end of the document within a single quoted scalar") : (g.position++, S(j) || (Z = g.position));
    v(g, "unexpected end of the stream within a single quoted scalar");
  }
  d(Fe, "readSingleQuotedScalar");
  function Gr(g, $) {
    let G, Z, j, k = g.input.charCodeAt(g.position);
    if (k !== 34)
      return !1;
    for (g.kind = "scalar", g.result = "", g.position++, G = Z = g.position; (k = g.input.charCodeAt(g.position)) !== 0; ) {
      if (k === 34)
        return Ct(g, G, g.position, !0), g.position++, !0;
      if (k === 92) {
        if (Ct(g, G, g.position, !0), k = g.input.charCodeAt(++g.position), b(k))
          St(g, !1, $);
        else if (k < 256 && Q[k])
          g.result += R[k], g.position++;
        else if ((j = A(k)) > 0) {
          let P = j, Y = 0;
          for (; P > 0; P--)
            k = g.input.charCodeAt(++g.position), (j = F(k)) >= 0 ? Y = (Y << 4) + j : v(g, "expected hexadecimal character");
          g.result += N(Y), g.position++;
        } else
          v(g, "unknown escape sequence");
        G = Z = g.position;
      } else b(k) ? (Ct(g, G, Z, !0), Xt(g, St(g, !1, $)), G = Z = g.position) : g.position === g.lineStart && Pt(g) ? v(g, "unexpected end of the document within a double quoted scalar") : (g.position++, S(k) || (Z = g.position));
    }
    v(g, "unexpected end of the stream within a double quoted scalar");
  }
  d(Gr, "readDoubleQuotedScalar");
  function vr(g, $) {
    let G = !0, Z, j, k;
    const P = g.tag;
    let Y;
    const tt = g.anchor;
    let it, st, X, at;
    const mt = /* @__PURE__ */ Object.create(null);
    let Tt, bt, vt, Et = g.input.charCodeAt(g.position);
    if (Et === 91)
      it = 93, at = !1, Y = [];
    else if (Et === 123)
      it = 125, at = !0, Y = {};
    else
      return !1;
    for (g.anchor !== null && q(g, g.anchor, Y), Et = g.input.charCodeAt(++g.position); Et !== 0; ) {
      if (St(g, !0, $), Et = g.input.charCodeAt(g.position), Et === it)
        return g.position++, g.tag = P, g.anchor = tt, g.kind = at ? "mapping" : "sequence", g.result = Y, !0;
      if (G ? Et === 44 && v(g, "expected the node content, but found ','") : v(g, "missed comma between flow collection entries"), bt = Tt = vt = null, st = X = !1, Et === 63) {
        const Pe = g.input.charCodeAt(g.position + 1);
        _(Pe) && (st = X = !0, g.position++, St(g, !0, $));
      }
      Z = g.line, j = g.lineStart, k = g.position, re(g, $, o, !1, !0), bt = g.tag, Tt = g.result, St(g, !0, $), Et = g.input.charCodeAt(g.position), (X || g.line === Z) && Et === 58 && (st = !0, Et = g.input.charCodeAt(++g.position), St(g, !0, $), re(g, $, o, !1, !0), vt = g.result), at ? _t(g, Y, mt, bt, Tt, vt, Z, j, k) : st ? Y.push(_t(g, null, mt, bt, Tt, vt, Z, j, k)) : Y.push(Tt), St(g, !0, $), Et = g.input.charCodeAt(g.position), Et === 44 ? (G = !0, Et = g.input.charCodeAt(++g.position)) : G = !1;
    }
    v(g, "unexpected end of the stream within a flow collection");
  }
  d(vr, "readFlowCollection");
  function Nt(g, $) {
    let G, Z = c, j = !1, k = !1, P = $, Y = 0, tt = !1, it, st = g.input.charCodeAt(g.position);
    if (st === 124)
      G = !1;
    else if (st === 62)
      G = !0;
    else
      return !1;
    for (g.kind = "scalar", g.result = ""; st !== 0; )
      if (st = g.input.charCodeAt(++g.position), st === 43 || st === 45)
        c === Z ? Z = st === 43 ? u : h : v(g, "repeat of a chomping mode identifier");
      else if ((it = L(st)) >= 0)
        it === 0 ? v(g, "bad explicit indentation width of a block scalar; it cannot be less than one") : k ? v(g, "repeat of an indentation width identifier") : (P = $ + it - 1, k = !0);
      else
        break;
    if (S(st)) {
      do
        st = g.input.charCodeAt(++g.position);
      while (S(st));
      if (st === 35)
        do
          st = g.input.charCodeAt(++g.position);
        while (!b(st) && st !== 0);
    }
    for (; st !== 0; ) {
      for (It(g), g.lineIndent = 0, st = g.input.charCodeAt(g.position); (!k || g.lineIndent < P) && st === 32; )
        g.lineIndent++, st = g.input.charCodeAt(++g.position);
      if (!k && g.lineIndent > P && (P = g.lineIndent), b(st)) {
        Y++;
        continue;
      }
      if (!k && P === 0 && v(g, "missing indentation for block scalar"), g.lineIndent < P) {
        Z === u ? g.result += e.repeat(`
`, j ? 1 + Y : Y) : Z === c && j && (g.result += `
`);
        break;
      }
      G ? S(st) ? (tt = !0, g.result += e.repeat(`
`, j ? 1 + Y : Y)) : tt ? (tt = !1, g.result += e.repeat(`
`, Y + 1)) : Y === 0 ? j && (g.result += " ") : g.result += e.repeat(`
`, Y) : g.result += e.repeat(`
`, j ? 1 + Y : Y), j = !0, k = !0, Y = 0;
      const X = g.position;
      for (; !b(st) && st !== 0; )
        st = g.input.charCodeAt(++g.position);
      Ct(g, X, g.position, !1);
    }
    return !0;
  }
  d(Nt, "readBlockScalar");
  function Xe(g, $) {
    const G = g.tag, Z = g.anchor, j = [];
    let k = !1;
    if (g.firstTabInLine !== -1) return !1;
    g.anchor !== null && q(g, g.anchor, j);
    let P = g.input.charCodeAt(g.position);
    for (; P !== 0 && (g.firstTabInLine !== -1 && (g.position = g.firstTabInLine, v(g, "tab characters must not be used in indentation")), P === 45); ) {
      const Y = g.input.charCodeAt(g.position + 1);
      if (!_(Y))
        break;
      if (k = !0, g.position++, St(g, !0, -1) && g.lineIndent <= $) {
        j.push(null), P = g.input.charCodeAt(g.position);
        continue;
      }
      const tt = g.line;
      if (re(g, $, n, !1, !0), j.push(g.result), St(g, !0, -1), P = g.input.charCodeAt(g.position), (g.line === tt || g.lineIndent > $) && P !== 0)
        v(g, "bad indentation of a sequence entry");
      else if (g.lineIndent < $)
        break;
    }
    return k ? (g.tag = G, g.anchor = Z, g.kind = "sequence", g.result = j, !0) : !1;
  }
  d(Xe, "readBlockSequence");
  function Ht(g, $, G) {
    let Z, j, k, P;
    const Y = g.tag, tt = g.anchor, it = {}, st = /* @__PURE__ */ Object.create(null);
    let X = null, at = null, mt = null, Tt = !1, bt = !1;
    if (g.firstTabInLine !== -1) return !1;
    g.anchor !== null && q(g, g.anchor, it);
    let vt = g.input.charCodeAt(g.position);
    for (; vt !== 0; ) {
      !Tt && g.firstTabInLine !== -1 && (g.position = g.firstTabInLine, v(g, "tab characters must not be used in indentation"));
      const Et = g.input.charCodeAt(g.position + 1), Pe = g.line;
      if ((vt === 63 || vt === 58) && _(Et))
        vt === 63 ? (Tt && (_t(g, it, st, X, at, null, j, k, P), X = at = mt = null), bt = !0, Tt = !0, Z = !0) : Tt ? (Tt = !1, Z = !0) : v(g, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), g.position += 1, vt = Et;
      else {
        if (j = g.line, k = g.lineStart, P = g.position, !re(g, G, a, !1, !0))
          break;
        if (g.line === Pe) {
          for (vt = g.input.charCodeAt(g.position); S(vt); )
            vt = g.input.charCodeAt(++g.position);
          if (vt === 58)
            vt = g.input.charCodeAt(++g.position), _(vt) || v(g, "a whitespace character is expected after the key-value separator within a block mapping"), Tt && (_t(g, it, st, X, at, null, j, k, P), X = at = mt = null), bt = !0, Tt = !1, Z = !1, X = g.tag, at = g.result;
          else if (bt)
            v(g, "can not read an implicit mapping pair; a colon is missed");
          else
            return g.tag = Y, g.anchor = tt, !0;
        } else if (bt)
          v(g, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return g.tag = Y, g.anchor = tt, !0;
      }
      if ((g.line === Pe || g.lineIndent > $) && (Tt && (j = g.line, k = g.lineStart, P = g.position), re(g, $, l, !0, Z) && (Tt ? at = g.result : mt = g.result), Tt || (_t(g, it, st, X, at, mt, j, k, P), X = at = mt = null), St(g, !0, -1), vt = g.input.charCodeAt(g.position)), (g.line === Pe || g.lineIndent > $) && vt !== 0)
        v(g, "bad indentation of a mapping entry");
      else if (g.lineIndent < $)
        break;
    }
    return Tt && _t(g, it, st, X, at, null, j, k, P), bt && (g.tag = Y, g.anchor = tt, g.kind = "mapping", g.result = it), bt;
  }
  d(Ht, "readBlockMapping");
  function Ve(g) {
    let $ = !1, G = !1, Z, j, k = g.input.charCodeAt(g.position);
    if (k !== 33) return !1;
    g.tag !== null && v(g, "duplication of a tag property"), k = g.input.charCodeAt(++g.position), k === 60 ? ($ = !0, k = g.input.charCodeAt(++g.position)) : k === 33 ? (G = !0, Z = "!!", k = g.input.charCodeAt(++g.position)) : Z = "!";
    let P = g.position;
    if ($) {
      do
        k = g.input.charCodeAt(++g.position);
      while (k !== 0 && k !== 62);
      g.position < g.length ? (j = g.input.slice(P, g.position), k = g.input.charCodeAt(++g.position)) : v(g, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; k !== 0 && !_(k); )
        k === 33 && (G ? v(g, "tag suffix cannot contain exclamation marks") : (Z = g.input.slice(P - 1, g.position + 1), y.test(Z) || v(g, "named tag handle cannot contain such characters"), G = !0, P = g.position + 1)), k = g.input.charCodeAt(++g.position);
      j = g.input.slice(P, g.position), m.test(j) && v(g, "tag suffix cannot contain flow indicator characters");
    }
    j && !x.test(j) && v(g, "tag name cannot contain such characters: " + j);
    try {
      j = decodeURIComponent(j);
    } catch {
      v(g, "tag name is malformed: " + j);
    }
    return $ ? g.tag = j : s.call(g.tagMap, Z) ? g.tag = g.tagMap[Z] + j : Z === "!" ? g.tag = "!" + j : Z === "!!" ? g.tag = "tag:yaml.org,2002:" + j : v(g, 'undeclared tag handle "' + Z + '"'), !0;
  }
  d(Ve, "readTagProperty");
  function he(g) {
    let $ = g.input.charCodeAt(g.position);
    if ($ !== 38) return !1;
    g.anchor !== null && v(g, "duplication of an anchor property"), $ = g.input.charCodeAt(++g.position);
    const G = g.position;
    for (; $ !== 0 && !_($) && !B($); )
      $ = g.input.charCodeAt(++g.position);
    return g.position === G && v(g, "name of an anchor node must contain at least one character"), g.anchor = g.input.slice(G, g.position), !0;
  }
  d(he, "readAnchorProperty");
  function De(g) {
    let $ = g.input.charCodeAt(g.position);
    if ($ !== 42) return !1;
    $ = g.input.charCodeAt(++g.position);
    const G = g.position;
    for (; $ !== 0 && !_($) && !B($); )
      $ = g.input.charCodeAt(++g.position);
    g.position === G && v(g, "name of an alias node must contain at least one character");
    const Z = g.input.slice(G, g.position);
    return s.call(g.anchorMap, Z) || v(g, 'unidentified alias "' + Z + '"'), g.result = g.anchorMap[Z], St(g, !0, -1), !0;
  }
  d(De, "readAlias");
  function hr(g, $, G, Z) {
    const j = xt(g);
    return rt(g), wt(g, $), g.tag = null, g.anchor = null, g.kind = null, g.result = null, Ht(g, G, Z) && g.kind === "mapping" ? (V(g), !0) : (ut(g), wt(g, j), !1);
  }
  d(hr, "tryReadBlockMappingFromProperty");
  function re(g, $, G, Z, j) {
    let k, P, Y = 1, tt = !1, it = !1, st = null, X, at, mt;
    g.depth >= g.maxDepth && v(g, "nesting exceeded maxDepth (" + g.maxDepth + ")"), g.depth += 1, g.listener !== null && g.listener("open", g), g.tag = null, g.anchor = null, g.kind = null, g.result = null;
    const Tt = k = P = l === G || n === G;
    if (Z && St(g, !0, -1) && (tt = !0, g.lineIndent > $ ? Y = 1 : g.lineIndent === $ ? Y = 0 : g.lineIndent < $ && (Y = -1)), Y === 1)
      for (; ; ) {
        const bt = g.input.charCodeAt(g.position), vt = xt(g);
        if (tt && (bt === 33 && g.tag !== null || bt === 38 && g.anchor !== null) || !Ve(g) && !he(g))
          break;
        st === null && (st = vt), St(g, !0, -1) ? (tt = !0, P = Tt, g.lineIndent > $ ? Y = 1 : g.lineIndent === $ ? Y = 0 : g.lineIndent < $ && (Y = -1)) : P = !1;
      }
    if (P && (P = tt || j), Y === 1 || l === G)
      if (o === G || a === G ? at = $ : at = $ + 1, mt = g.position - g.lineStart, Y === 1)
        if (P && (Xe(g, mt) || Ht(g, mt, at)) || vr(g, at))
          it = !0;
        else {
          const bt = g.input.charCodeAt(g.position);
          st !== null && Tt && !P && bt !== 124 && bt !== 62 && hr(
            g,
            st,
            st.position - st.lineStart,
            at
          ) || k && Nt(g, at) || Fe(g, at) || Gr(g, at) ? it = !0 : De(g) ? (it = !0, (g.tag !== null || g.anchor !== null) && v(g, "alias node should not have any properties")) : we(g, at, o === G) && (it = !0, g.tag === null && (g.tag = "?")), g.anchor !== null && q(g, g.anchor, g.result);
        }
      else Y === 0 && (it = P && Xe(g, mt));
    if (g.tag === null)
      g.anchor !== null && q(g, g.anchor, g.result);
    else if (g.tag === "?") {
      g.result !== null && g.kind !== "scalar" && v(g, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + g.kind + '"');
      for (let bt = 0, vt = g.implicitTypes.length; bt < vt; bt += 1)
        if (X = g.implicitTypes[bt], X.resolve(g.result)) {
          g.result = X.construct(g.result), g.tag = X.tag, g.anchor !== null && q(g, g.anchor, g.result);
          break;
        }
    } else if (g.tag !== "!") {
      if (s.call(g.typeMap[g.kind || "fallback"], g.tag))
        X = g.typeMap[g.kind || "fallback"][g.tag];
      else {
        X = null;
        const bt = g.typeMap.multi[g.kind || "fallback"];
        for (let vt = 0, Et = bt.length; vt < Et; vt += 1)
          if (g.tag.slice(0, bt[vt].tag.length) === bt[vt].tag) {
            X = bt[vt];
            break;
          }
      }
      X || v(g, "unknown tag !<" + g.tag + ">"), g.result !== null && X.kind !== g.kind && v(g, "unacceptable node kind for !<" + g.tag + '> tag; it should be "' + X.kind + '", not "' + g.kind + '"'), X.resolve(g.result, g.tag) ? (g.result = X.construct(g.result, g.tag), g.anchor !== null && q(g, g.anchor, g.result)) : v(g, "cannot resolve a node with !<" + g.tag + "> explicit tag");
    }
    return g.listener !== null && g.listener("close", g), g.depth -= 1, g.tag !== null || g.anchor !== null || it;
  }
  d(re, "composeNode");
  function Lr(g) {
    const $ = g.position;
    let G = !1, Z;
    for (g.version = null, g.checkLineBreaks = g.legacy, g.tagMap = /* @__PURE__ */ Object.create(null), g.anchorMap = /* @__PURE__ */ Object.create(null); (Z = g.input.charCodeAt(g.position)) !== 0 && (St(g, !0, -1), Z = g.input.charCodeAt(g.position), !(g.lineIndent > 0 || Z !== 37)); ) {
      G = !0, Z = g.input.charCodeAt(++g.position);
      let j = g.position;
      for (; Z !== 0 && !_(Z); )
        Z = g.input.charCodeAt(++g.position);
      const k = g.input.slice(j, g.position), P = [];
      for (k.length < 1 && v(g, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; S(Z); )
          Z = g.input.charCodeAt(++g.position);
        if (Z === 35) {
          do
            Z = g.input.charCodeAt(++g.position);
          while (Z !== 0 && !b(Z));
          break;
        }
        if (b(Z)) break;
        for (j = g.position; Z !== 0 && !_(Z); )
          Z = g.input.charCodeAt(++g.position);
        P.push(g.input.slice(j, g.position));
      }
      Z !== 0 && It(g), s.call(Bt, k) ? Bt[k](g, k, P) : W(g, 'unknown document directive "' + k + '"');
    }
    if (St(g, !0, -1), g.lineIndent === 0 && g.input.charCodeAt(g.position) === 45 && g.input.charCodeAt(g.position + 1) === 45 && g.input.charCodeAt(g.position + 2) === 45 ? (g.position += 3, St(g, !0, -1)) : G && v(g, "directives end mark is expected"), re(g, g.lineIndent - 1, l, !1, !0), St(g, !0, -1), g.checkLineBreaks && p.test(g.input.slice($, g.position)) && W(g, "non-ASCII line breaks are interpreted as content"), g.documents.push(g.result), g.position === g.lineStart && Pt(g)) {
      g.input.charCodeAt(g.position) === 46 && (g.position += 3, St(g, !0, -1));
      return;
    }
    g.position < g.length - 1 && v(g, "end of the stream or a document separator is expected");
  }
  d(Lr, "readDocument");
  function Ie(g, $) {
    g = String(g), $ = $ || {}, g.length !== 0 && (g.charCodeAt(g.length - 1) !== 10 && g.charCodeAt(g.length - 1) !== 13 && (g += `
`), g.charCodeAt(0) === 65279 && (g = g.slice(1)));
    const G = new E(g, $), Z = g.indexOf("\0");
    for (Z !== -1 && (G.position = Z, v(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Lr(G);
    return G.documents;
  }
  d(Ie, "loadDocuments");
  function Fr(g, $, G) {
    $ !== null && typeof $ == "object" && typeof G > "u" && (G = $, $ = null);
    const Z = Ie(g, G);
    if (typeof $ != "function")
      return Z;
    for (let j = 0, k = Z.length; j < k; j += 1)
      $(Z[j]);
  }
  d(Fr, "loadAll2");
  function cr(g, $) {
    const G = Ie(g, $);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new t("expected a single document in the stream, but found more");
    }
  }
  return d(cr, "load2"), zs.loadAll = Fr, zs.load = cr, zs;
}
d(Md, "requireLoader");
var Ja = {}, kc;
function Ed() {
  if (kc) return Ja;
  kc = 1;
  const e = Di(), t = Ii(), r = Qo(), i = Object.prototype.toString, s = Object.prototype.hasOwnProperty, o = 65279, a = 9, n = 10, l = 13, c = 32, h = 33, u = 34, f = 35, p = 37, m = 38, y = 39, x = 42, C = 44, b = 45, S = 58, _ = 61, B = 62, F = 63, A = 64, L = 91, H = 93, N = 96, O = 123, Q = 124, R = 125, E = {};
  E[0] = "\\0", E[7] = "\\a", E[8] = "\\b", E[9] = "\\t", E[10] = "\\n", E[11] = "\\v", E[12] = "\\f", E[13] = "\\r", E[27] = "\\e", E[34] = '\\"', E[92] = "\\\\", E[133] = "\\N", E[160] = "\\_", E[8232] = "\\L", E[8233] = "\\P";
  const I = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], v = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function W(k, P) {
    if (P === null) return {};
    const Y = {}, tt = Object.keys(P);
    for (let it = 0, st = tt.length; it < st; it += 1) {
      let X = tt[it], at = String(P[X]);
      X.slice(0, 2) === "!!" && (X = "tag:yaml.org,2002:" + X.slice(2));
      const mt = k.compiledTypeMap.fallback[X];
      mt && s.call(mt.styleAliases, at) && (at = mt.styleAliases[at]), Y[X] = at;
    }
    return Y;
  }
  d(W, "compileStyleMap");
  function q(k) {
    let P, Y;
    const tt = k.toString(16).toUpperCase();
    if (k <= 255)
      P = "x", Y = 2;
    else if (k <= 65535)
      P = "u", Y = 4;
    else if (k <= 4294967295)
      P = "U", Y = 8;
    else
      throw new t("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + P + e.repeat("0", Y - tt.length) + tt;
  }
  d(q, "encodeHex");
  const rt = 1, V = 2;
  function ut(k) {
    this.schema = k.schema || r, this.indent = Math.max(1, k.indent || 2), this.noArrayIndent = k.noArrayIndent || !1, this.skipInvalid = k.skipInvalid || !1, this.flowLevel = e.isNothing(k.flowLevel) ? -1 : k.flowLevel, this.styleMap = W(this.schema, k.styles || null), this.sortKeys = k.sortKeys || !1, this.lineWidth = k.lineWidth || 80, this.noRefs = k.noRefs || !1, this.noCompatMode = k.noCompatMode || !1, this.condenseFlow = k.condenseFlow || !1, this.quotingType = k.quotingType === '"' ? V : rt, this.forceQuotes = k.forceQuotes || !1, this.replacer = typeof k.replacer == "function" ? k.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  d(ut, "State");
  function xt(k, P) {
    const Y = e.repeat(" ", P);
    let tt = 0, it = "";
    const st = k.length;
    for (; tt < st; ) {
      let X;
      const at = k.indexOf(`
`, tt);
      at === -1 ? (X = k.slice(tt), tt = st) : (X = k.slice(tt, at + 1), tt = at + 1), X.length && X !== `
` && (it += Y), it += X;
    }
    return it;
  }
  d(xt, "indentString");
  function wt(k, P) {
    return `
` + e.repeat(" ", k.indent * P);
  }
  d(wt, "generateNextLine");
  function Bt(k, P) {
    for (let Y = 0, tt = k.implicitTypes.length; Y < tt; Y += 1)
      if (k.implicitTypes[Y].resolve(P))
        return !0;
    return !1;
  }
  d(Bt, "testImplicitResolving");
  function Ct(k) {
    return k === c || k === a;
  }
  d(Ct, "isWhitespace");
  function pt(k) {
    return k >= 32 && k <= 126 || k >= 161 && k <= 55295 && k !== 8232 && k !== 8233 || k >= 57344 && k <= 65533 && k !== o || k >= 65536 && k <= 1114111;
  }
  d(pt, "isPrintable");
  function dt(k) {
    return pt(k) && k !== o && // - b-char
    k !== l && k !== n;
  }
  d(dt, "isNsCharOrWhitespace");
  function _t(k, P, Y) {
    const tt = dt(k), it = tt && !Ct(k);
    return (
      // ns-plain-safe
      (Y ? tt : tt && // - c-flow-indicator
      k !== C && k !== L && k !== H && k !== O && k !== R) && // ns-plain-char
      k !== f && // false on '#'
      !(P === S && !it) || // false on ': '
      dt(P) && !Ct(P) && k === f || // change to true on '[^ ]#'
      P === S && it
    );
  }
  d(_t, "isPlainSafe");
  function It(k) {
    return pt(k) && k !== o && !Ct(k) && // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    k !== b && k !== F && k !== S && k !== C && k !== L && k !== H && k !== O && k !== R && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    k !== f && k !== m && k !== x && k !== h && k !== Q && k !== _ && k !== B && k !== y && k !== u && // | “%” | “@” | “`”)
    k !== p && k !== A && k !== N;
  }
  d(It, "isPlainSafeFirst");
  function St(k) {
    return !Ct(k) && k !== S;
  }
  d(St, "isPlainSafeLast");
  function Pt(k, P) {
    const Y = k.charCodeAt(P);
    let tt;
    return Y >= 55296 && Y <= 56319 && P + 1 < k.length && (tt = k.charCodeAt(P + 1), tt >= 56320 && tt <= 57343) ? (Y - 55296) * 1024 + tt - 56320 + 65536 : Y;
  }
  d(Pt, "codePointAt");
  function Xt(k) {
    return /^\n* /.test(k);
  }
  d(Xt, "needIndentIndicator");
  const we = 1, Fe = 2, Gr = 3, vr = 4, Nt = 5;
  function Xe(k, P, Y, tt, it, st, X, at) {
    let mt, Tt = 0, bt = null, vt = !1, Et = !1;
    const Pe = tt !== -1;
    let Ar = -1, Mr = It(Pt(k, 0)) && St(Pt(k, k.length - 1));
    if (P || X)
      for (mt = 0; mt < k.length; Tt >= 65536 ? mt += 2 : mt++) {
        if (Tt = Pt(k, mt), !pt(Tt))
          return Nt;
        Mr = Mr && _t(Tt, bt, at), bt = Tt;
      }
    else {
      for (mt = 0; mt < k.length; Tt >= 65536 ? mt += 2 : mt++) {
        if (Tt = Pt(k, mt), Tt === n)
          vt = !0, Pe && (Et = Et || // Foldable line = too long, and not more-indented.
          mt - Ar - 1 > tt && k[Ar + 1] !== " ", Ar = mt);
        else if (!pt(Tt))
          return Nt;
        Mr = Mr && _t(Tt, bt, at), bt = Tt;
      }
      Et = Et || Pe && mt - Ar - 1 > tt && k[Ar + 1] !== " ";
    }
    return !vt && !Et ? Mr && !X && !it(k) ? we : st === V ? Nt : Fe : Y > 9 && Xt(k) ? Nt : X ? st === V ? Nt : Fe : Et ? vr : Gr;
  }
  d(Xe, "chooseScalarStyle");
  function Ht(k, P, Y, tt, it) {
    k.dump = (function() {
      if (P.length === 0)
        return k.quotingType === V ? '""' : "''";
      if (!k.noCompatMode && (I.indexOf(P) !== -1 || v.test(P)))
        return k.quotingType === V ? '"' + P + '"' : "'" + P + "'";
      const st = k.indent * Math.max(1, Y), X = k.lineWidth === -1 ? -1 : Math.max(Math.min(k.lineWidth, 40), k.lineWidth - st), at = tt || // No block styles in flow mode.
      k.flowLevel > -1 && Y >= k.flowLevel;
      function mt(Tt) {
        return Bt(k, Tt);
      }
      switch (d(mt, "testAmbiguity"), Xe(
        P,
        at,
        k.indent,
        X,
        mt,
        k.quotingType,
        k.forceQuotes && !tt,
        it
      )) {
        case we:
          return P;
        case Fe:
          return "'" + P.replace(/'/g, "''") + "'";
        case Gr:
          return "|" + Ve(P, k.indent) + he(xt(P, st));
        case vr:
          return ">" + Ve(P, k.indent) + he(xt(De(P, X), st));
        case Nt:
          return '"' + re(P) + '"';
        default:
          throw new t("impossible error: invalid scalar style");
      }
    })();
  }
  d(Ht, "writeScalar");
  function Ve(k, P) {
    const Y = Xt(k) ? String(P) : "", tt = k[k.length - 1] === `
`, st = tt && (k[k.length - 2] === `
` || k === `
`) ? "+" : tt ? "" : "-";
    return Y + st + `
`;
  }
  d(Ve, "blockHeader");
  function he(k) {
    return k[k.length - 1] === `
` ? k.slice(0, -1) : k;
  }
  d(he, "dropEndingNewline");
  function De(k, P) {
    const Y = /(\n+)([^\n]*)/g;
    let tt = (function() {
      let at = k.indexOf(`
`);
      return at = at !== -1 ? at : k.length, Y.lastIndex = at, hr(k.slice(0, at), P);
    })(), it = k[0] === `
` || k[0] === " ", st, X;
    for (; X = Y.exec(k); ) {
      const at = X[1], mt = X[2];
      st = mt[0] === " ", tt += at + (!it && !st && mt !== "" ? `
` : "") + hr(mt, P), it = st;
    }
    return tt;
  }
  d(De, "foldString");
  function hr(k, P) {
    if (k === "" || k[0] === " ") return k;
    const Y = / [^ ]/g;
    let tt, it = 0, st, X = 0, at = 0, mt = "";
    for (; tt = Y.exec(k); )
      at = tt.index, at - it > P && (st = X > it ? X : at, mt += `
` + k.slice(it, st), it = st + 1), X = at;
    return mt += `
`, k.length - it > P && X > it ? mt += k.slice(it, X) + `
` + k.slice(X + 1) : mt += k.slice(it), mt.slice(1);
  }
  d(hr, "foldLine");
  function re(k) {
    let P = "", Y = 0;
    for (let tt = 0; tt < k.length; Y >= 65536 ? tt += 2 : tt++) {
      Y = Pt(k, tt);
      const it = E[Y];
      !it && pt(Y) ? (P += k[tt], Y >= 65536 && (P += k[tt + 1])) : P += it || q(Y);
    }
    return P;
  }
  d(re, "escapeString");
  function Lr(k, P, Y) {
    let tt = "";
    const it = k.tag;
    for (let st = 0, X = Y.length; st < X; st += 1) {
      let at = Y[st];
      k.replacer && (at = k.replacer.call(Y, String(st), at)), ($(k, P, at, !1, !1) || typeof at > "u" && $(k, P, null, !1, !1)) && (tt !== "" && (tt += "," + (k.condenseFlow ? "" : " ")), tt += k.dump);
    }
    k.tag = it, k.dump = "[" + tt + "]";
  }
  d(Lr, "writeFlowSequence");
  function Ie(k, P, Y, tt) {
    let it = "";
    const st = k.tag;
    for (let X = 0, at = Y.length; X < at; X += 1) {
      let mt = Y[X];
      k.replacer && (mt = k.replacer.call(Y, String(X), mt)), ($(k, P + 1, mt, !0, !0, !1, !0) || typeof mt > "u" && $(k, P + 1, null, !0, !0, !1, !0)) && ((!tt || it !== "") && (it += wt(k, P)), k.dump && n === k.dump.charCodeAt(0) ? it += "-" : it += "- ", it += k.dump);
    }
    k.tag = st, k.dump = it || "[]";
  }
  d(Ie, "writeBlockSequence");
  function Fr(k, P, Y) {
    let tt = "";
    const it = k.tag, st = Object.keys(Y);
    for (let X = 0, at = st.length; X < at; X += 1) {
      let mt = "";
      tt !== "" && (mt += ", "), k.condenseFlow && (mt += '"');
      const Tt = st[X];
      let bt = Y[Tt];
      k.replacer && (bt = k.replacer.call(Y, Tt, bt)), $(k, P, Tt, !1, !1) && (k.dump.length > 1024 && (mt += "? "), mt += k.dump + (k.condenseFlow ? '"' : "") + ":" + (k.condenseFlow ? "" : " "), $(k, P, bt, !1, !1) && (mt += k.dump, tt += mt));
    }
    k.tag = it, k.dump = "{" + tt + "}";
  }
  d(Fr, "writeFlowMapping");
  function cr(k, P, Y, tt) {
    let it = "";
    const st = k.tag, X = Object.keys(Y);
    if (k.sortKeys === !0)
      X.sort();
    else if (typeof k.sortKeys == "function")
      X.sort(k.sortKeys);
    else if (k.sortKeys)
      throw new t("sortKeys must be a boolean or a function");
    for (let at = 0, mt = X.length; at < mt; at += 1) {
      let Tt = "";
      (!tt || it !== "") && (Tt += wt(k, P));
      const bt = X[at];
      let vt = Y[bt];
      if (k.replacer && (vt = k.replacer.call(Y, bt, vt)), !$(k, P + 1, bt, !0, !0, !0))
        continue;
      const Et = k.tag !== null && k.tag !== "?" || k.dump && k.dump.length > 1024;
      Et && (k.dump && n === k.dump.charCodeAt(0) ? Tt += "?" : Tt += "? "), Tt += k.dump, Et && (Tt += wt(k, P)), $(k, P + 1, vt, !0, Et) && (k.dump && n === k.dump.charCodeAt(0) ? Tt += ":" : Tt += ": ", Tt += k.dump, it += Tt);
    }
    k.tag = st, k.dump = it || "{}";
  }
  d(cr, "writeBlockMapping");
  function g(k, P, Y) {
    const tt = Y ? k.explicitTypes : k.implicitTypes;
    for (let it = 0, st = tt.length; it < st; it += 1) {
      const X = tt[it];
      if ((X.instanceOf || X.predicate) && (!X.instanceOf || typeof P == "object" && P instanceof X.instanceOf) && (!X.predicate || X.predicate(P))) {
        if (Y ? X.multi && X.representName ? k.tag = X.representName(P) : k.tag = X.tag : k.tag = "?", X.represent) {
          const at = k.styleMap[X.tag] || X.defaultStyle;
          let mt;
          if (i.call(X.represent) === "[object Function]")
            mt = X.represent(P, at);
          else if (s.call(X.represent, at))
            mt = X.represent[at](P, at);
          else
            throw new t("!<" + X.tag + '> tag resolver accepts not "' + at + '" style');
          k.dump = mt;
        }
        return !0;
      }
    }
    return !1;
  }
  d(g, "detectType");
  function $(k, P, Y, tt, it, st, X) {
    k.tag = null, k.dump = Y, g(k, Y, !1) || g(k, Y, !0);
    const at = i.call(k.dump), mt = tt;
    tt && (tt = k.flowLevel < 0 || k.flowLevel > P);
    const Tt = at === "[object Object]" || at === "[object Array]";
    let bt, vt;
    if (Tt && (bt = k.duplicates.indexOf(Y), vt = bt !== -1), (k.tag !== null && k.tag !== "?" || vt || k.indent !== 2 && P > 0) && (it = !1), vt && k.usedDuplicates[bt])
      k.dump = "*ref_" + bt;
    else {
      if (Tt && vt && !k.usedDuplicates[bt] && (k.usedDuplicates[bt] = !0), at === "[object Object]")
        tt && Object.keys(k.dump).length !== 0 ? (cr(k, P, k.dump, it), vt && (k.dump = "&ref_" + bt + k.dump)) : (Fr(k, P, k.dump), vt && (k.dump = "&ref_" + bt + " " + k.dump));
      else if (at === "[object Array]")
        tt && k.dump.length !== 0 ? (k.noArrayIndent && !X && P > 0 ? Ie(k, P - 1, k.dump, it) : Ie(k, P, k.dump, it), vt && (k.dump = "&ref_" + bt + k.dump)) : (Lr(k, P, k.dump), vt && (k.dump = "&ref_" + bt + " " + k.dump));
      else if (at === "[object String]")
        k.tag !== "?" && Ht(k, k.dump, P, st, mt);
      else {
        if (at === "[object Undefined]")
          return !1;
        if (k.skipInvalid) return !1;
        throw new t("unacceptable kind of an object to dump " + at);
      }
      if (k.tag !== null && k.tag !== "?") {
        let Et = encodeURI(
          k.tag[0] === "!" ? k.tag.slice(1) : k.tag
        ).replace(/!/g, "%21");
        k.tag[0] === "!" ? Et = "!" + Et : Et.slice(0, 18) === "tag:yaml.org,2002:" ? Et = "!!" + Et.slice(18) : Et = "!<" + Et + ">", k.dump = Et + " " + k.dump;
      }
    }
    return !0;
  }
  d($, "writeNode");
  function G(k, P) {
    const Y = [], tt = [];
    Z(k, Y, tt);
    const it = tt.length;
    for (let st = 0; st < it; st += 1)
      P.duplicates.push(Y[tt[st]]);
    P.usedDuplicates = new Array(it);
  }
  d(G, "getDuplicateReferences");
  function Z(k, P, Y) {
    if (k !== null && typeof k == "object") {
      const tt = P.indexOf(k);
      if (tt !== -1)
        Y.indexOf(tt) === -1 && Y.push(tt);
      else if (P.push(k), Array.isArray(k))
        for (let it = 0, st = k.length; it < st; it += 1)
          Z(k[it], P, Y);
      else {
        const it = Object.keys(k);
        for (let st = 0, X = it.length; st < X; st += 1)
          Z(k[it[st]], P, Y);
      }
    }
  }
  d(Z, "inspectNode");
  function j(k, P) {
    P = P || {};
    const Y = new ut(P);
    Y.noRefs || G(k, Y);
    let tt = k;
    return Y.replacer && (tt = Y.replacer.call({ "": tt }, "", tt)), $(Y, 0, tt, !0, !0) ? Y.dump + `
` : "";
  }
  return d(j, "dump2"), Ja.dump = j, Ja;
}
d(Ed, "requireDumper");
var wc;
function $d() {
  if (wc) return fe;
  wc = 1;
  const e = Md(), t = Ed();
  function r(i, s) {
    return function() {
      throw new Error("Function yaml." + i + " is removed in js-yaml 4. Use yaml." + s + " instead, which is now safe by default.");
    };
  }
  return d(r, "renamed"), fe.Type = me(), fe.Schema = yl(), fe.FAILSAFE_SCHEMA = kl(), fe.JSON_SCHEMA = Bl(), fe.CORE_SCHEMA = vl(), fe.DEFAULT_SCHEMA = Qo(), fe.load = e.load, fe.loadAll = e.loadAll, fe.dump = t.dump, fe.YAMLException = Ii(), fe.types = {
    binary: Al(),
    float: _l(),
    map: bl(),
    null: wl(),
    pairs: El(),
    set: $l(),
    timestamp: Ll(),
    bool: Sl(),
    int: Tl(),
    merge: Fl(),
    omap: Ml(),
    seq: Cl(),
    str: xl()
  }, fe.safeLoad = r("safeLoad", "load"), fe.safeLoadAll = r("safeLoadAll", "loadAll"), fe.safeDump = r("safeDump", "dump"), fe;
}
d($d, "requireJsYaml");
var H0 = $d(), Y0 = /* @__PURE__ */ Fd(H0), {
  Type: DA,
  Schema: IA,
  FAILSAFE_SCHEMA: PA,
  JSON_SCHEMA: U0,
  CORE_SCHEMA: RA,
  DEFAULT_SCHEMA: NA,
  load: j0,
  loadAll: qA,
  dump: WA,
  YAMLException: zA,
  types: HA,
  safeLoad: YA,
  safeLoadAll: UA,
  safeDump: jA
} = Y0, G0 = /* @__PURE__ */ d((e, t) => {
  const { theme: r, themeVariables: i } = t, { useGradient: s, gradientStart: o, gradientStop: a } = i ?? {}, n = e.attr("id"), l = r?.includes("dark") ? "#FFFFFF" : "#000000", c = /* @__PURE__ */ d((u, f, p) => e.append("defs").append("filter").attr("id", u).attr("height", f).attr("width", f).append("feDropShadow").attr("dx", p).attr("dy", p).attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", l), "dropShadow");
  if (c(`${n}-drop-shadow`, "130%", "4"), c(`${n}-drop-shadow-small`, "150%", "2"), !s)
    return;
  const h = e.append("linearGradient").attr("id", `${n}-gradient`).attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
  h.append("svg:stop").attr("offset", "0%").attr("stop-color", o).attr("stop-opacity", 1), h.append("svg:stop").attr("offset", "100%").attr("stop-color", a).attr("stop-opacity", 1);
}, "insertLookDefs"), so = { exports: {} }, X0 = so.exports, Sc;
function V0() {
  return Sc || (Sc = 1, (function(e, t) {
    (function(r, i) {
      e.exports = i();
    })(X0, (function() {
      var r = 1e3, i = 6e4, s = 36e5, o = "millisecond", a = "second", n = "minute", l = "hour", c = "day", h = "week", u = "month", f = "quarter", p = "year", m = "date", y = "Invalid Date", x = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, C = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
        var I = ["th", "st", "nd", "rd"], v = E % 100;
        return "[" + E + (I[(v - 20) % 10] || I[v] || I[0]) + "]";
      } }, S = function(E, I, v) {
        var W = String(E);
        return !W || W.length >= I ? E : "" + Array(I + 1 - W.length).join(v) + E;
      }, _ = { s: S, z: function(E) {
        var I = -E.utcOffset(), v = Math.abs(I), W = Math.floor(v / 60), q = v % 60;
        return (I <= 0 ? "+" : "-") + S(W, 2, "0") + ":" + S(q, 2, "0");
      }, m: function E(I, v) {
        if (I.date() < v.date()) return -E(v, I);
        var W = 12 * (v.year() - I.year()) + (v.month() - I.month()), q = I.clone().add(W, u), rt = v - q < 0, V = I.clone().add(W + (rt ? -1 : 1), u);
        return +(-(W + (v - q) / (rt ? q - V : V - q)) || 0);
      }, a: function(E) {
        return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
      }, p: function(E) {
        return { M: u, y: p, w: h, d: c, D: m, h: l, m: n, s: a, ms: o, Q: f }[E] || String(E || "").toLowerCase().replace(/s$/, "");
      }, u: function(E) {
        return E === void 0;
      } }, B = "en", F = {};
      F[B] = b;
      var A = "$isDayjsObject", L = function(E) {
        return E instanceof Q || !(!E || !E[A]);
      }, H = function E(I, v, W) {
        var q;
        if (!I) return B;
        if (typeof I == "string") {
          var rt = I.toLowerCase();
          F[rt] && (q = rt), v && (F[rt] = v, q = rt);
          var V = I.split("-");
          if (!q && V.length > 1) return E(V[0]);
        } else {
          var ut = I.name;
          F[ut] = I, q = ut;
        }
        return !W && q && (B = q), q || !W && B;
      }, N = function(E, I) {
        if (L(E)) return E.clone();
        var v = typeof I == "object" ? I : {};
        return v.date = E, v.args = arguments, new Q(v);
      }, O = _;
      O.l = H, O.i = L, O.w = function(E, I) {
        return N(E, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      };
      var Q = (function() {
        function E(v) {
          this.$L = H(v.locale, null, !0), this.parse(v), this.$x = this.$x || v.x || {}, this[A] = !0;
        }
        var I = E.prototype;
        return I.parse = function(v) {
          this.$d = (function(W) {
            var q = W.date, rt = W.utc;
            if (q === null) return /* @__PURE__ */ new Date(NaN);
            if (O.u(q)) return /* @__PURE__ */ new Date();
            if (q instanceof Date) return new Date(q);
            if (typeof q == "string" && !/Z$/i.test(q)) {
              var V = q.match(x);
              if (V) {
                var ut = V[2] - 1 || 0, xt = (V[7] || "0").substring(0, 3);
                return rt ? new Date(Date.UTC(V[1], ut, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, xt)) : new Date(V[1], ut, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, xt);
              }
            }
            return new Date(q);
          })(v), this.init();
        }, I.init = function() {
          var v = this.$d;
          this.$y = v.getFullYear(), this.$M = v.getMonth(), this.$D = v.getDate(), this.$W = v.getDay(), this.$H = v.getHours(), this.$m = v.getMinutes(), this.$s = v.getSeconds(), this.$ms = v.getMilliseconds();
        }, I.$utils = function() {
          return O;
        }, I.isValid = function() {
          return this.$d.toString() !== y;
        }, I.isSame = function(v, W) {
          var q = N(v);
          return this.startOf(W) <= q && q <= this.endOf(W);
        }, I.isAfter = function(v, W) {
          return N(v) < this.startOf(W);
        }, I.isBefore = function(v, W) {
          return this.endOf(W) < N(v);
        }, I.$g = function(v, W, q) {
          return O.u(v) ? this[W] : this.set(q, v);
        }, I.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, I.valueOf = function() {
          return this.$d.getTime();
        }, I.startOf = function(v, W) {
          var q = this, rt = !!O.u(W) || W, V = O.p(v), ut = function(It, St) {
            var Pt = O.w(q.$u ? Date.UTC(q.$y, St, It) : new Date(q.$y, St, It), q);
            return rt ? Pt : Pt.endOf(c);
          }, xt = function(It, St) {
            return O.w(q.toDate()[It].apply(q.toDate("s"), (rt ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(St)), q);
          }, wt = this.$W, Bt = this.$M, Ct = this.$D, pt = "set" + (this.$u ? "UTC" : "");
          switch (V) {
            case p:
              return rt ? ut(1, 0) : ut(31, 11);
            case u:
              return rt ? ut(1, Bt) : ut(0, Bt + 1);
            case h:
              var dt = this.$locale().weekStart || 0, _t = (wt < dt ? wt + 7 : wt) - dt;
              return ut(rt ? Ct - _t : Ct + (6 - _t), Bt);
            case c:
            case m:
              return xt(pt + "Hours", 0);
            case l:
              return xt(pt + "Minutes", 1);
            case n:
              return xt(pt + "Seconds", 2);
            case a:
              return xt(pt + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, I.endOf = function(v) {
          return this.startOf(v, !1);
        }, I.$set = function(v, W) {
          var q, rt = O.p(v), V = "set" + (this.$u ? "UTC" : ""), ut = (q = {}, q[c] = V + "Date", q[m] = V + "Date", q[u] = V + "Month", q[p] = V + "FullYear", q[l] = V + "Hours", q[n] = V + "Minutes", q[a] = V + "Seconds", q[o] = V + "Milliseconds", q)[rt], xt = rt === c ? this.$D + (W - this.$W) : W;
          if (rt === u || rt === p) {
            var wt = this.clone().set(m, 1);
            wt.$d[ut](xt), wt.init(), this.$d = wt.set(m, Math.min(this.$D, wt.daysInMonth())).$d;
          } else ut && this.$d[ut](xt);
          return this.init(), this;
        }, I.set = function(v, W) {
          return this.clone().$set(v, W);
        }, I.get = function(v) {
          return this[O.p(v)]();
        }, I.add = function(v, W) {
          var q, rt = this;
          v = Number(v);
          var V = O.p(W), ut = function(Bt) {
            var Ct = N(rt);
            return O.w(Ct.date(Ct.date() + Math.round(Bt * v)), rt);
          };
          if (V === u) return this.set(u, this.$M + v);
          if (V === p) return this.set(p, this.$y + v);
          if (V === c) return ut(1);
          if (V === h) return ut(7);
          var xt = (q = {}, q[n] = i, q[l] = s, q[a] = r, q)[V] || 1, wt = this.$d.getTime() + v * xt;
          return O.w(wt, this);
        }, I.subtract = function(v, W) {
          return this.add(-1 * v, W);
        }, I.format = function(v) {
          var W = this, q = this.$locale();
          if (!this.isValid()) return q.invalidDate || y;
          var rt = v || "YYYY-MM-DDTHH:mm:ssZ", V = O.z(this), ut = this.$H, xt = this.$m, wt = this.$M, Bt = q.weekdays, Ct = q.months, pt = q.meridiem, dt = function(St, Pt, Xt, we) {
            return St && (St[Pt] || St(W, rt)) || Xt[Pt].slice(0, we);
          }, _t = function(St) {
            return O.s(ut % 12 || 12, St, "0");
          }, It = pt || function(St, Pt, Xt) {
            var we = St < 12 ? "AM" : "PM";
            return Xt ? we.toLowerCase() : we;
          };
          return rt.replace(C, (function(St, Pt) {
            return Pt || (function(Xt) {
              switch (Xt) {
                case "YY":
                  return String(W.$y).slice(-2);
                case "YYYY":
                  return O.s(W.$y, 4, "0");
                case "M":
                  return wt + 1;
                case "MM":
                  return O.s(wt + 1, 2, "0");
                case "MMM":
                  return dt(q.monthsShort, wt, Ct, 3);
                case "MMMM":
                  return dt(Ct, wt);
                case "D":
                  return W.$D;
                case "DD":
                  return O.s(W.$D, 2, "0");
                case "d":
                  return String(W.$W);
                case "dd":
                  return dt(q.weekdaysMin, W.$W, Bt, 2);
                case "ddd":
                  return dt(q.weekdaysShort, W.$W, Bt, 3);
                case "dddd":
                  return Bt[W.$W];
                case "H":
                  return String(ut);
                case "HH":
                  return O.s(ut, 2, "0");
                case "h":
                  return _t(1);
                case "hh":
                  return _t(2);
                case "a":
                  return It(ut, xt, !0);
                case "A":
                  return It(ut, xt, !1);
                case "m":
                  return String(xt);
                case "mm":
                  return O.s(xt, 2, "0");
                case "s":
                  return String(W.$s);
                case "ss":
                  return O.s(W.$s, 2, "0");
                case "SSS":
                  return O.s(W.$ms, 3, "0");
                case "Z":
                  return V;
              }
              return null;
            })(St) || V.replace(":", "");
          }));
        }, I.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, I.diff = function(v, W, q) {
          var rt, V = this, ut = O.p(W), xt = N(v), wt = (xt.utcOffset() - this.utcOffset()) * i, Bt = this - xt, Ct = function() {
            return O.m(V, xt);
          };
          switch (ut) {
            case p:
              rt = Ct() / 12;
              break;
            case u:
              rt = Ct();
              break;
            case f:
              rt = Ct() / 3;
              break;
            case h:
              rt = (Bt - wt) / 6048e5;
              break;
            case c:
              rt = (Bt - wt) / 864e5;
              break;
            case l:
              rt = Bt / s;
              break;
            case n:
              rt = Bt / i;
              break;
            case a:
              rt = Bt / r;
              break;
            default:
              rt = Bt;
          }
          return q ? rt : O.a(rt);
        }, I.daysInMonth = function() {
          return this.endOf(u).$D;
        }, I.$locale = function() {
          return F[this.$L];
        }, I.locale = function(v, W) {
          if (!v) return this.$L;
          var q = this.clone(), rt = H(v, W, !0);
          return rt && (q.$L = rt), q;
        }, I.clone = function() {
          return O.w(this.$d, this);
        }, I.toDate = function() {
          return new Date(this.valueOf());
        }, I.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, I.toISOString = function() {
          return this.$d.toISOString();
        }, I.toString = function() {
          return this.$d.toUTCString();
        }, E;
      })(), R = Q.prototype;
      return N.prototype = R, [["$ms", o], ["$s", a], ["$m", n], ["$H", l], ["$W", c], ["$M", u], ["$y", p], ["$D", m]].forEach((function(E) {
        R[E[1]] = function(I) {
          return this.$g(I, E[0], E[1]);
        };
      })), N.extend = function(E, I) {
        return E.$i || (E(I, Q, N), E.$i = !0), N;
      }, N.locale = H, N.isDayjs = L, N.unix = function(E) {
        return N(1e3 * E);
      }, N.en = F[B], N.Ls = F, N.p = {}, N;
    }));
  })(so)), so.exports;
}
var Z0 = V0();
const K0 = /* @__PURE__ */ W0(Z0);
var dr = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, J = {
  trace: /* @__PURE__ */ d((...e) => {
  }, "trace"),
  debug: /* @__PURE__ */ d((...e) => {
  }, "debug"),
  info: /* @__PURE__ */ d((...e) => {
  }, "info"),
  warn: /* @__PURE__ */ d((...e) => {
  }, "warn"),
  error: /* @__PURE__ */ d((...e) => {
  }, "error"),
  fatal: /* @__PURE__ */ d((...e) => {
  }, "fatal")
}, Ol = /* @__PURE__ */ d(function(e = "fatal") {
  let t = dr.fatal;
  typeof e == "string" ? e.toLowerCase() in dr && (t = dr[e]) : typeof e == "number" && (t = e), J.trace = () => {
  }, J.debug = () => {
  }, J.info = () => {
  }, J.warn = () => {
  }, J.error = () => {
  }, J.fatal = () => {
  }, t <= dr.fatal && (J.fatal = console.error ? console.error.bind(console, Ae("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", Ae("FATAL"))), t <= dr.error && (J.error = console.error ? console.error.bind(console, Ae("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", Ae("ERROR"))), t <= dr.warn && (J.warn = console.warn ? console.warn.bind(console, Ae("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", Ae("WARN"))), t <= dr.info && (J.info = console.info ? console.info.bind(console, Ae("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", Ae("INFO"))), t <= dr.debug && (J.debug = console.debug ? console.debug.bind(console, Ae("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Ae("DEBUG"))), t <= dr.trace && (J.trace = console.debug ? console.debug.bind(console, Ae("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", Ae("TRACE")));
}, "setLogLevel"), Ae = /* @__PURE__ */ d((e) => `%c${K0().format("ss.SSS")} : ${e} : `, "format");
const oo = {
  /* CLAMP */
  min: {
    r: 0,
    g: 0,
    b: 0,
    s: 0,
    l: 0,
    a: 0
  },
  max: {
    r: 255,
    g: 255,
    b: 255,
    h: 360,
    s: 100,
    l: 100,
    a: 1
  },
  clamp: {
    r: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    g: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    b: (e) => e >= 255 ? 255 : e < 0 ? 0 : e,
    h: (e) => e % 360,
    s: (e) => e >= 100 ? 100 : e < 0 ? 0 : e,
    l: (e) => e >= 100 ? 100 : e < 0 ? 0 : e,
    a: (e) => e >= 1 ? 1 : e < 0 ? 0 : e
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (e) => {
    const t = e / 255;
    return e > 0.03928 ? Math.pow((t + 0.055) / 1.055, 2.4) : t / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (e, t, r) => (r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * 6 * r : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e),
  hsl2rgb: ({ h: e, s: t, l: r }, i) => {
    if (!t)
      return r * 2.55;
    e /= 360, t /= 100, r /= 100;
    const s = r < 0.5 ? r * (1 + t) : r + t - r * t, o = 2 * r - s;
    switch (i) {
      case "r":
        return oo.hue2rgb(o, s, e + 1 / 3) * 255;
      case "g":
        return oo.hue2rgb(o, s, e) * 255;
      case "b":
        return oo.hue2rgb(o, s, e - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: e, g: t, b: r }, i) => {
    e /= 255, t /= 255, r /= 255;
    const s = Math.max(e, t, r), o = Math.min(e, t, r), a = (s + o) / 2;
    if (i === "l")
      return a * 100;
    if (s === o)
      return 0;
    const n = s - o, l = a > 0.5 ? n / (2 - s - o) : n / (s + o);
    if (i === "s")
      return l * 100;
    switch (s) {
      case e:
        return ((t - r) / n + (t < r ? 6 : 0)) * 60;
      case t:
        return ((r - e) / n + 2) * 60;
      case r:
        return ((e - t) / n + 4) * 60;
      default:
        return -1;
    }
  }
}, Q0 = {
  /* API */
  clamp: (e, t, r) => t > r ? Math.min(t, Math.max(r, e)) : Math.min(r, Math.max(t, e)),
  round: (e) => Math.round(e * 1e10) / 1e10
}, J0 = {
  /* API */
  dec2hex: (e) => {
    const t = Math.round(e).toString(16);
    return t.length > 1 ? t : `0${t}`;
  }
}, Mt = {
  channel: oo,
  lang: Q0,
  unit: J0
}, Dr = {};
for (let e = 0; e <= 255; e++)
  Dr[e] = Mt.unit.dec2hex(e);
const pe = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class tx {
  constructor() {
    this.type = pe.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(t) {
    if (this.type && this.type !== t)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = t;
  }
  reset() {
    this.type = pe.ALL;
  }
  is(t) {
    return this.type === t;
  }
}
class ex {
  /* CONSTRUCTOR */
  constructor(t, r) {
    this.color = r, this.changed = !1, this.data = t, this.type = new tx();
  }
  /* API */
  set(t, r) {
    return this.color = r, this.changed = !1, this.data = t, this.type.type = pe.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const t = this.data, { h: r, s: i, l: s } = t;
    r === void 0 && (t.h = Mt.channel.rgb2hsl(t, "h")), i === void 0 && (t.s = Mt.channel.rgb2hsl(t, "s")), s === void 0 && (t.l = Mt.channel.rgb2hsl(t, "l"));
  }
  _ensureRGB() {
    const t = this.data, { r, g: i, b: s } = t;
    r === void 0 && (t.r = Mt.channel.hsl2rgb(t, "r")), i === void 0 && (t.g = Mt.channel.hsl2rgb(t, "g")), s === void 0 && (t.b = Mt.channel.hsl2rgb(t, "b"));
  }
  /* GETTERS */
  get r() {
    const t = this.data, r = t.r;
    return !this.type.is(pe.HSL) && r !== void 0 ? r : (this._ensureHSL(), Mt.channel.hsl2rgb(t, "r"));
  }
  get g() {
    const t = this.data, r = t.g;
    return !this.type.is(pe.HSL) && r !== void 0 ? r : (this._ensureHSL(), Mt.channel.hsl2rgb(t, "g"));
  }
  get b() {
    const t = this.data, r = t.b;
    return !this.type.is(pe.HSL) && r !== void 0 ? r : (this._ensureHSL(), Mt.channel.hsl2rgb(t, "b"));
  }
  get h() {
    const t = this.data, r = t.h;
    return !this.type.is(pe.RGB) && r !== void 0 ? r : (this._ensureRGB(), Mt.channel.rgb2hsl(t, "h"));
  }
  get s() {
    const t = this.data, r = t.s;
    return !this.type.is(pe.RGB) && r !== void 0 ? r : (this._ensureRGB(), Mt.channel.rgb2hsl(t, "s"));
  }
  get l() {
    const t = this.data, r = t.l;
    return !this.type.is(pe.RGB) && r !== void 0 ? r : (this._ensureRGB(), Mt.channel.rgb2hsl(t, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(t) {
    this.type.set(pe.RGB), this.changed = !0, this.data.r = t;
  }
  set g(t) {
    this.type.set(pe.RGB), this.changed = !0, this.data.g = t;
  }
  set b(t) {
    this.type.set(pe.RGB), this.changed = !0, this.data.b = t;
  }
  set h(t) {
    this.type.set(pe.HSL), this.changed = !0, this.data.h = t;
  }
  set s(t) {
    this.type.set(pe.HSL), this.changed = !0, this.data.s = t;
  }
  set l(t) {
    this.type.set(pe.HSL), this.changed = !0, this.data.l = t;
  }
  set a(t) {
    this.changed = !0, this.data.a = t;
  }
}
const Jo = new ex({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), _i = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (e) => {
    if (e.charCodeAt(0) !== 35)
      return;
    const t = e.match(_i.re);
    if (!t)
      return;
    const r = t[1], i = parseInt(r, 16), s = r.length, o = s % 4 === 0, a = s > 4, n = a ? 1 : 17, l = a ? 8 : 4, c = o ? 0 : -1, h = a ? 255 : 15;
    return Jo.set({
      r: (i >> l * (c + 3) & h) * n,
      g: (i >> l * (c + 2) & h) * n,
      b: (i >> l * (c + 1) & h) * n,
      a: o ? (i & h) * n / 255 : 1
    }, e);
  },
  stringify: (e) => {
    const { r: t, g: r, b: i, a: s } = e;
    return s < 1 ? `#${Dr[Math.round(t)]}${Dr[Math.round(r)]}${Dr[Math.round(i)]}${Dr[Math.round(s * 255)]}` : `#${Dr[Math.round(t)]}${Dr[Math.round(r)]}${Dr[Math.round(i)]}`;
  }
}, Jr = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (e) => {
    const t = e.match(Jr.hueRe);
    if (t) {
      const [, r, i] = t;
      switch (i) {
        case "grad":
          return Mt.channel.clamp.h(parseFloat(r) * 0.9);
        case "rad":
          return Mt.channel.clamp.h(parseFloat(r) * 180 / Math.PI);
        case "turn":
          return Mt.channel.clamp.h(parseFloat(r) * 360);
      }
    }
    return Mt.channel.clamp.h(parseFloat(e));
  },
  /* API */
  parse: (e) => {
    const t = e.charCodeAt(0);
    if (t !== 104 && t !== 72)
      return;
    const r = e.match(Jr.re);
    if (!r)
      return;
    const [, i, s, o, a, n] = r;
    return Jo.set({
      h: Jr._hue2deg(i),
      s: Mt.channel.clamp.s(parseFloat(s)),
      l: Mt.channel.clamp.l(parseFloat(o)),
      a: a ? Mt.channel.clamp.a(n ? parseFloat(a) / 100 : parseFloat(a)) : 1
    }, e);
  },
  stringify: (e) => {
    const { h: t, s: r, l: i, a: s } = e;
    return s < 1 ? `hsla(${Mt.lang.round(t)}, ${Mt.lang.round(r)}%, ${Mt.lang.round(i)}%, ${s})` : `hsl(${Mt.lang.round(t)}, ${Mt.lang.round(r)}%, ${Mt.lang.round(i)}%)`;
  }
}, cs = {
  /* VARIABLES */
  colors: {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyanaqua: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    transparent: "#00000000",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  },
  /* API */
  parse: (e) => {
    e = e.toLowerCase();
    const t = cs.colors[e];
    if (t)
      return _i.parse(t);
  },
  stringify: (e) => {
    const t = _i.stringify(e);
    for (const r in cs.colors)
      if (cs.colors[r] === t)
        return r;
  }
}, ts = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (e) => {
    const t = e.charCodeAt(0);
    if (t !== 114 && t !== 82)
      return;
    const r = e.match(ts.re);
    if (!r)
      return;
    const [, i, s, o, a, n, l, c, h] = r;
    return Jo.set({
      r: Mt.channel.clamp.r(s ? parseFloat(i) * 2.55 : parseFloat(i)),
      g: Mt.channel.clamp.g(a ? parseFloat(o) * 2.55 : parseFloat(o)),
      b: Mt.channel.clamp.b(l ? parseFloat(n) * 2.55 : parseFloat(n)),
      a: c ? Mt.channel.clamp.a(h ? parseFloat(c) / 100 : parseFloat(c)) : 1
    }, e);
  },
  stringify: (e) => {
    const { r: t, g: r, b: i, a: s } = e;
    return s < 1 ? `rgba(${Mt.lang.round(t)}, ${Mt.lang.round(r)}, ${Mt.lang.round(i)}, ${Mt.lang.round(s)})` : `rgb(${Mt.lang.round(t)}, ${Mt.lang.round(r)}, ${Mt.lang.round(i)})`;
  }
}, Ue = {
  /* VARIABLES */
  format: {
    keyword: cs,
    hex: _i,
    rgb: ts,
    rgba: ts,
    hsl: Jr,
    hsla: Jr
  },
  /* API */
  parse: (e) => {
    if (typeof e != "string")
      return e;
    const t = _i.parse(e) || ts.parse(e) || Jr.parse(e) || cs.parse(e);
    if (t)
      return t;
    throw new Error(`Unsupported color format: "${e}"`);
  },
  stringify: (e) => !e.changed && e.color ? e.color : e.type.is(pe.HSL) || e.data.r === void 0 ? Jr.stringify(e) : e.a < 1 || !Number.isInteger(e.r) || !Number.isInteger(e.g) || !Number.isInteger(e.b) ? ts.stringify(e) : _i.stringify(e)
}, Od = (e, t) => {
  const r = Ue.parse(e);
  for (const i in t)
    r[i] = Mt.channel.clamp[i](t[i]);
  return Ue.stringify(r);
}, Nr = (e, t, r = 0, i = 1) => {
  if (typeof e != "number")
    return Od(e, { a: t });
  const s = Jo.set({
    r: Mt.channel.clamp.r(e),
    g: Mt.channel.clamp.g(t),
    b: Mt.channel.clamp.b(r),
    a: Mt.channel.clamp.a(i)
  });
  return Ue.stringify(s);
}, rx = (e, t) => Mt.lang.round(Ue.parse(e)[t]), ix = (e) => {
  const { r: t, g: r, b: i } = Ue.parse(e), s = 0.2126 * Mt.channel.toLinear(t) + 0.7152 * Mt.channel.toLinear(r) + 0.0722 * Mt.channel.toLinear(i);
  return Mt.lang.round(s);
}, sx = (e) => ix(e) >= 0.5, ke = (e) => !sx(e), Dd = (e, t, r) => {
  const i = Ue.parse(e), s = i[t], o = Mt.channel.clamp[t](s + r);
  return s !== o && (i[t] = o), Ue.stringify(i);
}, z = (e, t) => Dd(e, "l", t), U = (e, t) => Dd(e, "l", -t), w = (e, t) => {
  const r = Ue.parse(e), i = {};
  for (const s in t)
    t[s] && (i[s] = r[s] + t[s]);
  return Od(e, i);
}, ox = (e, t, r = 50) => {
  const { r: i, g: s, b: o, a } = Ue.parse(e), { r: n, g: l, b: c, a: h } = Ue.parse(t), u = r / 100, f = u * 2 - 1, p = a - h, y = ((f * p === -1 ? f : (f + p) / (1 + f * p)) + 1) / 2, x = 1 - y, C = i * y + n * x, b = s * y + l * x, S = o * y + c * x, _ = a * u + h * (1 - u);
  return Nr(C, b, S, _);
}, D = (e, t = 100) => {
  const r = Ue.parse(e);
  return r.r = 255 - r.r, r.g = 255 - r.g, r.b = 255 - r.b, ox(r, e, t);
};
function Tc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, i = Array(t); r < t; r++) i[r] = e[r];
  return i;
}
function ax(e) {
  if (Array.isArray(e)) return e;
}
function nx(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var i, s, o, a, n = [], l = !0, c = !1;
    try {
      if (o = (r = r.call(e)).next, t !== 0) for (; !(l = (i = o.call(r)).done) && (n.push(i.value), n.length !== t); l = !0) ;
    } catch (h) {
      c = !0, s = h;
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return;
      } finally {
        if (c) throw s;
      }
    }
    return n;
  }
}
function lx() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hx(e, t) {
  return ax(e) || nx(e, t) || cx(e, t) || lx();
}
function cx(e, t) {
  if (e) {
    if (typeof e == "string") return Tc(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Tc(e, t) : void 0;
  }
}
const Id = Object.entries, ux = Object.keys, _c = Object.setPrototypeOf, dx = Object.isFrozen, Pd = Object.getPrototypeOf, Rd = Object.getOwnPropertyDescriptor;
let ne = Object.freeze, ee = Object.seal, Ir = Object.create, Nd = typeof Reflect < "u" && Reflect, xo = Nd.apply, Mn = Nd.construct;
ne || (ne = function(t) {
  return t;
});
ee || (ee = function(t) {
  return t;
});
xo || (xo = function(t, r) {
  for (var i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) s[o - 2] = arguments[o];
  return t.apply(r, s);
});
Mn || (Mn = function(t) {
  for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) i[s - 1] = arguments[s];
  return new t(...i);
});
const fr = jt(Array.prototype.forEach), fx = jt(Array.prototype.lastIndexOf), Bc = jt(Array.prototype.pop), zi = jt(Array.prototype.push), px = jt(Array.prototype.slice), gx = jt(Array.prototype.splice), Bi = Array.isArray, tn = qd(Set), en = jt(Set.prototype.add), Hi = jt(Set.prototype.has), Zr = jt(String.prototype.toLowerCase), rn = jt(String.prototype.toString), mx = jt(String.prototype.match), Hs = jt(String.prototype.replace), sn = jt(String.prototype.indexOf), yx = jt(String.prototype.trim), xx = jt(Number.prototype.toString), Cx = jt(Boolean.prototype.toString), vc = typeof BigInt > "u" ? null : jt(BigInt.prototype.toString), Lc = typeof Symbol > "u" ? null : jt(Symbol.prototype.toString), ge = jt(Object.prototype.hasOwnProperty), Yi = jt(Object.prototype.toString), bx = RegExp.prototype.test, oe = function(t, r) {
  return t instanceof RegExp && (t.lastIndex = 0), xo(bx, t, [r]);
}, pr = qd(TypeError);
function jt(e) {
  return function(t) {
    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) i[s - 1] = arguments[s];
    return xo(e, t, i);
  };
}
function qd(e) {
  return function() {
    for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
    return Mn(e, r);
  };
}
function Wt(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Zr;
  if (_c && _c(e, null), !Bi(t)) return e;
  let i = t.length;
  for (; i--; ) {
    let s = t[i];
    if (typeof s == "string") {
      const o = r(s);
      o !== s && (dx(t) || (t[i] = o), s = o);
    }
    e[s] = !0;
  }
  return e;
}
function kx(e) {
  for (let t = 0; t < e.length; t++) ge(e, t) || (e[t] = null);
  return e;
}
function Co(e) {
  const t = Ir(null);
  for (const i of Id(e)) {
    var r = hx(i, 2);
    const s = r[0], o = r[1];
    ge(e, s) && (Bi(o) ? t[s] = kx(o) : o && typeof o == "object" && o.constructor === Object ? t[s] = Co(o) : t[s] = o);
  }
  return t;
}
function es(e) {
  const t = Ir(null), r = ux(e);
  let i = r.length;
  for (; i--; ) t[r[i]] = e[r[i]];
  return t;
}
function wx(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return xx(e);
    case "boolean":
      return Cx(e);
    case "bigint":
      return vc ? vc(e) : "0";
    case "symbol":
      return Lc ? Lc(e) : "Symbol()";
    case "undefined":
      return Yi(e);
    case "function":
    case "object": {
      if (e === null) return Yi(e);
      const t = e, r = Me(t, "toString");
      if (typeof r == "function") {
        const i = r(t);
        return typeof i == "string" ? i : Yi(i);
      }
      return Yi(e);
    }
    default:
      return Yi(e);
  }
}
function Me(e, t) {
  for (; e !== null; ) {
    const i = Rd(e, t);
    if (i) {
      if (i.get) return jt(i.get);
      if (typeof i.value == "function") return jt(i.value);
    }
    e = Pd(e);
  }
  function r() {
    return null;
  }
  return r;
}
function Sx(e, t) {
  for (; e !== null; ) {
    const r = Rd(e, t);
    if (r) return r.get ? jt(r.get) : null;
    e = Pd(e);
  }
  return null;
}
function Tx(e) {
  if (!e) return !1;
  try {
    return oe(e, ""), !0;
  } catch {
    return !1;
  }
}
const Fc = ne([
  "a",
  "abbr",
  "acronym",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "content",
  "data",
  "datalist",
  "dd",
  "decorator",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meter",
  "nav",
  "nobr",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "search",
  "section",
  "select",
  "shadow",
  "slot",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]), on = ne([
  "svg",
  "a",
  "altglyph",
  "altglyphdef",
  "altglyphitem",
  "animatecolor",
  "animatemotion",
  "animatetransform",
  "circle",
  "clippath",
  "defs",
  "desc",
  "ellipse",
  "filter",
  "font",
  "g",
  "glyph",
  "glyphref",
  "hkern",
  "image",
  "line",
  "lineargradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialgradient",
  "rect",
  "stop",
  "style",
  "switch",
  "symbol",
  "text",
  "textpath",
  "title",
  "tref",
  "tspan",
  "view",
  "vkern"
]), an = ne([
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence"
]), _x = ne([
  "animate",
  "color-profile",
  "cursor",
  "discard",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignobject",
  "hatch",
  "hatchpath",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  "missing-glyph",
  "script",
  "set",
  "solidcolor",
  "unknown",
  "use"
]), nn = ne([
  "math",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mglyph",
  "mi",
  "mlabeledtr",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mspace",
  "msqrt",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "mprescripts"
]), Bx = ne([
  "maction",
  "maligngroup",
  "malignmark",
  "mlongdiv",
  "mscarries",
  "mscarry",
  "msgroup",
  "mstack",
  "msline",
  "msrow",
  "semantics",
  "annotation",
  "annotation-xml",
  "mprescripts",
  "none"
]), Ac = ne(["#text"]), Mc = ne([
  "accept",
  "action",
  "align",
  "alt",
  "autocapitalize",
  "autocomplete",
  "autopictureinpicture",
  "autoplay",
  "background",
  "bgcolor",
  "border",
  "capture",
  "cellpadding",
  "cellspacing",
  "checked",
  "cite",
  "class",
  "clear",
  "color",
  "cols",
  "colspan",
  "command",
  "commandfor",
  "controls",
  "controlslist",
  "coords",
  "crossorigin",
  "datetime",
  "decoding",
  "default",
  "dir",
  "disabled",
  "disablepictureinpicture",
  "disableremoteplayback",
  "download",
  "draggable",
  "enctype",
  "enterkeyhint",
  "exportparts",
  "face",
  "for",
  "headers",
  "height",
  "hidden",
  "high",
  "href",
  "hreflang",
  "id",
  "inert",
  "inputmode",
  "integrity",
  "ismap",
  "kind",
  "label",
  "lang",
  "list",
  "loading",
  "loop",
  "low",
  "max",
  "maxlength",
  "media",
  "method",
  "min",
  "minlength",
  "multiple",
  "muted",
  "name",
  "nonce",
  "noshade",
  "novalidate",
  "nowrap",
  "open",
  "optimum",
  "part",
  "pattern",
  "placeholder",
  "playsinline",
  "popover",
  "popovertarget",
  "popovertargetaction",
  "poster",
  "preload",
  "pubdate",
  "radiogroup",
  "readonly",
  "rel",
  "required",
  "rev",
  "reversed",
  "role",
  "rows",
  "rowspan",
  "spellcheck",
  "scope",
  "selected",
  "shape",
  "size",
  "sizes",
  "slot",
  "span",
  "srclang",
  "start",
  "src",
  "srcset",
  "step",
  "style",
  "summary",
  "tabindex",
  "title",
  "translate",
  "type",
  "usemap",
  "valign",
  "value",
  "width",
  "wrap",
  "xmlns"
]), ln = ne([
  "accent-height",
  "accumulate",
  "additive",
  "alignment-baseline",
  "amplitude",
  "ascent",
  "attributename",
  "attributetype",
  "azimuth",
  "basefrequency",
  "baseline-shift",
  "begin",
  "bias",
  "by",
  "class",
  "clip",
  "clippathunits",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "cx",
  "cy",
  "d",
  "dx",
  "dy",
  "diffuseconstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  "edgemode",
  "elevation",
  "end",
  "exponent",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterunits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyph-name",
  "glyphref",
  "gradientunits",
  "gradienttransform",
  "height",
  "href",
  "id",
  "image-rendering",
  "in",
  "in2",
  "intercept",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kerning",
  "keypoints",
  "keysplines",
  "keytimes",
  "lang",
  "lengthadjust",
  "letter-spacing",
  "kernelmatrix",
  "kernelunitlength",
  "lighting-color",
  "local",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerheight",
  "markerunits",
  "markerwidth",
  "maskcontentunits",
  "maskunits",
  "max",
  "mask",
  "mask-type",
  "media",
  "method",
  "mode",
  "min",
  "name",
  "numoctaves",
  "offset",
  "operator",
  "opacity",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "paint-order",
  "path",
  "pathlength",
  "patterncontentunits",
  "patterntransform",
  "patternunits",
  "pointer-events",
  "points",
  "preservealpha",
  "preserveaspectratio",
  "primitiveunits",
  "r",
  "rx",
  "ry",
  "radius",
  "refx",
  "refy",
  "repeatcount",
  "repeatdur",
  "restart",
  "result",
  "rotate",
  "scale",
  "seed",
  "shape-rendering",
  "slope",
  "specularconstant",
  "specularexponent",
  "spreadmethod",
  "startoffset",
  "stddeviation",
  "stitchtiles",
  "stop-color",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke",
  "stroke-width",
  "style",
  "surfacescale",
  "systemlanguage",
  "tabindex",
  "tablevalues",
  "targetx",
  "targety",
  "transform",
  "transform-origin",
  "text-anchor",
  "text-decoration",
  "text-orientation",
  "text-rendering",
  "textlength",
  "type",
  "u1",
  "u2",
  "unicode",
  "values",
  "vector-effect",
  "viewbox",
  "visibility",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "width",
  "word-spacing",
  "wrap",
  "writing-mode",
  "xchannelselector",
  "ychannelselector",
  "x",
  "x1",
  "x2",
  "xmlns",
  "y",
  "y1",
  "y2",
  "z",
  "zoomandpan"
]), Ec = ne([
  "accent",
  "accentunder",
  "align",
  "bevelled",
  "close",
  "columnalign",
  "columnlines",
  "columnspacing",
  "columnspan",
  "denomalign",
  "depth",
  "dir",
  "display",
  "displaystyle",
  "encoding",
  "fence",
  "frame",
  "height",
  "href",
  "id",
  "largeop",
  "length",
  "linethickness",
  "lquote",
  "lspace",
  "mathbackground",
  "mathcolor",
  "mathsize",
  "mathvariant",
  "maxsize",
  "minsize",
  "movablelimits",
  "notation",
  "numalign",
  "open",
  "rowalign",
  "rowlines",
  "rowspacing",
  "rowspan",
  "rspace",
  "rquote",
  "scriptlevel",
  "scriptminsize",
  "scriptsizemultiplier",
  "selection",
  "separator",
  "separators",
  "stretchy",
  "subscriptshift",
  "supscriptshift",
  "symmetric",
  "voffset",
  "width",
  "xmlns"
]), Ys = ne([
  "xlink:href",
  "xml:id",
  "xlink:title",
  "xml:space",
  "xmlns:xlink"
]), vx = ee(/{{[\w\W]*|^[\w\W]*}}/g), Lx = ee(/<%[\w\W]*|^[\w\W]*%>/g), Fx = ee(/\${[\w\W]*/g), Ax = ee(/{{|}}|\${|<%|%>|&lt;%|%&gt;/), Mx = ee(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ex = ee(/^aria-[\-\w]+$/), $c = ee(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), $x = ee(/^(?:\w+script|data):/i), Ox = ee(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Dx = ee(/^html$/i), Ix = ee(/^[a-z][.\w]*(-[.\w]+)+$/i), hn = ee(/<[/\w!]/g), Oc = ee(/<[/\w]/g), Px = ee(/<\/no(script|embed|frames)/i), Dc = ee(/\/>/i), Rx = ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i), Nx = ee(/^[\r\n\t ]+/), Zt = {
  element: 1,
  text: 3,
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentFragment: 11
}, qx = ne(Wt({}, [
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
])), Wx = function() {
  return typeof window > "u" ? null : window;
}, zx = function(t, r) {
  if (typeof t != "object" || typeof t.createPolicy != "function") return null;
  let i = null;
  const s = "data-tt-policy-suffix";
  r && r.hasAttribute(s) && (i = r.getAttribute(s));
  const o = "dompurify" + (i ? "#" + i : "");
  try {
    return t.createPolicy(o, {
      createHTML(a) {
        return a;
      },
      createScriptURL(a) {
        return a;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, Ic = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, Or = function(t, r, i, s) {
  return ge(t, r) && Bi(t[r]) ? Wt(s.base ? es(s.base) : {}, t[r], s.transform) : i;
}, cn = function(t, r, i) {
  const s = ge(t, r) ? t[r] : void 0;
  return s && typeof s == "object" ? Co(s) : i;
};
function Wd() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Wx();
  const t = (et) => Wd(et);
  if (t.version = "3.4.18", t.removed = [], !e || !e.document || e.document.nodeType !== Zt.document || !e.Element)
    return t.isSupported = !1, t;
  let r = e.document;
  const i = r, s = i.currentScript, o = e.HTMLTemplateElement, a = e.Node, n = e.Element, l = e.NodeFilter, c = e.DOMParser, h = e.trustedTypes, u = n.prototype, f = Me(u, "cloneNode"), p = Me(u, "remove"), m = Me(u, "removeAttributeNode"), y = Me(u, "nextSibling"), x = Me(u, "childNodes"), C = Me(u, "parentNode"), b = Me(u, "shadowRoot"), S = Me(u, "attributes"), _ = a && a.prototype ? Me(a.prototype, "nodeType") : null, B = a && a.prototype ? Me(a.prototype, "nodeName") : null, F = a && a.prototype ? Me(a.prototype, "ownerDocument") : null, A = function(T) {
    return _ ? _(T) : T.nodeType;
  }, L = function(T) {
    return B ? B(T) : T.nodeName;
  }, H = Sx(u, "namespaceURI"), N = function(T) {
    return H ? H(T) : T.namespaceURI;
  };
  if (typeof o == "function") {
    const et = r.createElement("template");
    et.content && et.content.ownerDocument && (r = et.content.ownerDocument);
  }
  let O, Q = "", R, E = !1, I = 0;
  const v = function() {
    if (I > 0) throw pr('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, W = function(T) {
    v(), I++;
    try {
      return O.createHTML(T);
    } finally {
      I--;
    }
  }, q = function(T) {
    return O && it ? W(T) : T;
  }, rt = function(T) {
    v(), I++;
    try {
      return O.createScriptURL(T);
    } finally {
      I--;
    }
  }, V = function() {
    return E || (R = zx(h, s), E = !0), R;
  }, ut = r, xt = ut.implementation, wt = ut.createNodeIterator, Bt = ut.createDocumentFragment, Ct = ut.getElementsByTagName, pt = i.importNode;
  let dt = Ic();
  t.isSupported = typeof Id == "function" && typeof C == "function" && xt && xt.createHTMLDocument !== void 0;
  const _t = vx, It = Lx, St = Fx, Pt = Mx, Xt = Ex, we = $x, Fe = Ox, Gr = Ix;
  let vr = $c, Nt = null;
  const Xe = Wt({}, [
    ...Fc,
    ...on,
    ...an,
    ...nn,
    ...Ac
  ]);
  let Ht = null;
  const Ve = Wt({}, [
    ...Mc,
    ...ln,
    ...Ec,
    ...Ys
  ]);
  let he = null, De = null, hr = null;
  const re = Object.seal(Ir(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Lr = !0, Ie = !0, Fr = !1, cr = !0, g = !1, $ = !0, G = !1, Z = !1, j = null, k = null, P = !1, Y = !1, tt = !1, it = !1, st = !0, X = !1;
  const at = "user-content-";
  let mt = !0, Tt = !1, bt = null, vt = !1, Et = null;
  const Pe = Wt({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let Ar = null;
  const Mr = Wt({}, [
    "audio",
    "video",
    "img",
    "source",
    "image",
    "track"
  ]);
  let Ih = null;
  const Ph = Wt({}, [
    "alt",
    "class",
    "for",
    "id",
    "label",
    "name",
    "pattern",
    "placeholder",
    "role",
    "summary",
    "title",
    "value",
    "style",
    "xmlns"
  ]), Is = "http://www.w3.org/1998/Math/MathML", Ps = "http://www.w3.org/2000/svg", Ze = "http://www.w3.org/1999/xhtml";
  let ci = Ze, ya = !1, Rh = null;
  const m0 = Wt({}, [
    Is,
    Ps,
    Ze
  ], rn), y0 = ne(Wt({}, [
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext"
  ]));
  let xa = null;
  const x0 = ne(Wt({}, ["annotation-xml"]));
  let Ca = null;
  const C0 = ne(Ir(null)), b0 = Wt({}, [
    "title",
    "style",
    "font",
    "a",
    "script"
  ]);
  let qi = null;
  const k0 = ["application/xhtml+xml", "text/html"], w0 = "text/html";
  let Vt = null, Rs = null;
  const S0 = r.createElement("form"), Nh = function(T) {
    return T instanceof RegExp || T instanceof Function;
  }, ba = function() {
    let T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (!T || typeof T != "object") && (T = {}), T = Co(T), qi = k0.indexOf(T.PARSER_MEDIA_TYPE) === -1 ? w0 : T.PARSER_MEDIA_TYPE, Vt = qi === "application/xhtml+xml" ? rn : Zr, Nt = Or(T, "ALLOWED_TAGS", Xe, { transform: Vt }), Ht = Or(T, "ALLOWED_ATTR", Ve, { transform: Vt }), Rh = Or(T, "ALLOWED_NAMESPACES", m0, { transform: rn }), Ih = Or(T, "ADD_URI_SAFE_ATTR", Ph, {
      transform: Vt,
      base: Ph
    }), Ar = Or(T, "ADD_DATA_URI_TAGS", Mr, {
      transform: Vt,
      base: Mr
    }), Et = Or(T, "FORBID_CONTENTS", Pe, { transform: Vt }), De = Or(T, "FORBID_TAGS", Ir(null), { transform: Vt }), hr = Or(T, "FORBID_ATTR", Ir(null), { transform: Vt }), vt = ge(T, "USE_PROFILES") ? T.USE_PROFILES && typeof T.USE_PROFILES == "object" ? Co(T.USE_PROFILES) : T.USE_PROFILES : !1, Lr = T.ALLOW_ARIA_ATTR !== !1, Ie = T.ALLOW_DATA_ATTR !== !1, Fr = T.ALLOW_UNKNOWN_PROTOCOLS || !1, cr = T.ALLOW_SELF_CLOSE_IN_ATTR !== !1, g = T.SAFE_FOR_TEMPLATES || !1, $ = T.SAFE_FOR_XML !== !1, G = T.WHOLE_DOCUMENT || !1, Y = T.RETURN_DOM || !1, tt = T.RETURN_DOM_FRAGMENT || !1, it = T.RETURN_TRUSTED_TYPE || !1, P = T.FORCE_BODY || !1, st = T.SANITIZE_DOM !== !1, X = T.SANITIZE_NAMED_PROPS || !1, mt = T.KEEP_CONTENT !== !1, Tt = T.IN_PLACE || !1, vr = Tx(T.ALLOWED_URI_REGEXP) ? T.ALLOWED_URI_REGEXP : $c, ci = typeof T.NAMESPACE == "string" ? T.NAMESPACE : Ze, xa = cn(T, "MATHML_TEXT_INTEGRATION_POINTS", y0), Ca = cn(T, "HTML_INTEGRATION_POINTS", x0);
    const M = cn(T, "CUSTOM_ELEMENT_HANDLING", C0);
    if (he = Ir(null), ge(M, "tagNameCheck") && Nh(M.tagNameCheck) && (he.tagNameCheck = M.tagNameCheck), ge(M, "attributeNameCheck") && Nh(M.attributeNameCheck) && (he.attributeNameCheck = M.attributeNameCheck), ge(M, "allowCustomizedBuiltInElements") && typeof M.allowCustomizedBuiltInElements == "boolean" && (he.allowCustomizedBuiltInElements = M.allowCustomizedBuiltInElements), ee(he), g && (Ie = !1), tt && (Y = !0), vt && ((ge(T, "ALLOWED_TAGS") || ge(T, "ALLOWED_ATTR")) && typeof console < "u" && typeof console.warn == "function" && console.warn("DOMPurify: USE_PROFILES overrides ALLOWED_TAGS and ALLOWED_ATTR. Do not use these options together."), Nt = Wt({}, Ac), Ht = Ir(null), vt.html === !0 && (Wt(Nt, Fc), Wt(Ht, Mc)), vt.svg === !0 && (Wt(Nt, on), Wt(Ht, ln), Wt(Ht, Ys)), vt.svgFilters === !0 && (Wt(Nt, an), Wt(Ht, ln), Wt(Ht, Ys)), vt.mathMl === !0 && (Wt(Nt, nn), Wt(Ht, Ec), Wt(Ht, Ys))), re.tagCheck = null, re.attributeCheck = null, ge(T, "ADD_TAGS") && (typeof T.ADD_TAGS == "function" ? re.tagCheck = T.ADD_TAGS : Bi(T.ADD_TAGS) && (Nt === Xe && (Nt = es(Nt)), Wt(Nt, T.ADD_TAGS, Vt))), ge(T, "ADD_ATTR") && (typeof T.ADD_ATTR == "function" ? re.attributeCheck = T.ADD_ATTR : Bi(T.ADD_ATTR) && (Ht === Ve && (Ht = es(Ht)), Wt(Ht, T.ADD_ATTR, Vt))), ge(T, "ADD_FORBID_CONTENTS") && Bi(T.ADD_FORBID_CONTENTS) && (Et === Pe && (Et = es(Et)), Wt(Et, T.ADD_FORBID_CONTENTS, Vt)), mt && (Nt["#text"] = !0), G && Wt(Nt, [
      "html",
      "head",
      "body"
    ]), Nt.table && (Nt.tbody = !0, delete De.tbody), T.TRUSTED_TYPES_POLICY) {
      if (typeof T.TRUSTED_TYPES_POLICY.createHTML != "function") throw pr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof T.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw pr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const K = O;
      O = T.TRUSTED_TYPES_POLICY;
      try {
        Q = W("");
      } catch (ot) {
        throw O = K, ot;
      }
    } else T.TRUSTED_TYPES_POLICY === null ? (O = void 0, Q = "") : (O === void 0 && (O = V()), O && typeof Q == "string" && (Q = W("")));
    Rs = ne(T);
  }, qh = Wt({}, [
    ...on,
    ...an,
    ..._x
  ]), Wh = Wt({}, [...nn, ...Bx]), T0 = function(T, M, K) {
    return M === Ze ? T === "svg" : M === Is ? T === "svg" && (K === "annotation-xml" || xa[K]) : !!qh[T];
  }, _0 = function(T, M, K) {
    return M === Ze ? T === "math" : M === Ps ? T === "math" && Ca[K] : !!Wh[T];
  }, B0 = function(T, M, K) {
    return M === Ps && !Ca[K] || M === Is && !xa[K] ? !1 : !Wh[T] && (b0[T] || !qh[T]);
  }, v0 = function(T) {
    const M = N(T), K = Zr(L(T)), ot = C(T);
    let kt = ci, At = "template";
    return ot && A(ot) === Zt.element && (kt = N(ot), At = Zr(L(ot))), Rh[M] ? M === Ps ? T0(K, kt, At) : M === Is ? _0(K, kt, At) : M === Ze ? B0(K, kt, At) : qi === "application/xhtml+xml" : !1;
  }, Er = function(T) {
    zi(t.removed, { element: T });
    try {
      C(T).removeChild(T);
    } catch {
      if (p(T), !C(T)) throw pr("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, zh = function(T, M, K) {
    try {
      m(T, M);
    } catch {
      try {
        T.removeAttribute(K);
      } catch {
      }
    }
  }, ka = function(T) {
    Ta(T);
    const M = x(T);
    M && fr(px(M), (K) => {
      try {
        p(K);
      } catch {
      }
    }), A(T) === Zt.element && wa(T, !1);
  }, ui = function(T, M, K) {
    if (!K) try {
      K = M.getAttributeNode(T);
    } catch {
      K = null;
    }
    if (zi(t.removed, {
      attribute: K || null,
      from: M
    }), K) zh(M, K, T);
    else try {
      M.removeAttribute(T);
    } catch {
    }
    if (T === "is")
      if (Y || tt) try {
        Er(M);
      } catch {
      }
      else try {
        M.setAttribute(T, "");
      } catch {
      }
  }, wa = function(T, M) {
    const K = S(T);
    if (K)
      for (let ot = K.length - 1; ot >= 0; --ot) {
        const kt = K[ot], At = kt && kt.name;
        typeof At == "string" && !(M && Ht[Vt(At)]) && zh(T, kt, At);
      }
  }, Sa = function(T, M) {
    let K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    const ot = [T];
    for (; ot.length > 0; ) {
      const kt = ot.pop();
      if (M(kt) === !1) continue;
      if (K && A(kt) === Zt.element) {
        const Dt = b(kt);
        di(Dt) && ot.push(Dt);
      }
      const At = x(kt);
      if (At) for (let Dt = At.length - 1; Dt >= 0; --Dt) ot.push(At[Dt]);
    }
  }, Ta = function(T) {
    Sa(T, (M) => {
      A(M) === Zt.element && wa(M, !0);
    });
  }, _a = function(T) {
    const M = [];
    return Sa(T, (K) => {
      M.push(K);
    }, !0), M;
  }, L0 = function(T, M) {
    const K = tn();
    fr(_a(T), (ot) => {
      A(ot) === Zt.element && en(K, ot);
    }), fr(M, (ot) => {
      A(ot) === Zt.element && !Hi(K, ot) && wa(ot, !0);
    });
  }, Hh = function(T, M) {
    let K = !1;
    return fr(t.removed, (ot) => {
      ot.element && (K = K || ot.element === T, Ta(ot.element));
    }), L0(T, M), K;
  }, F0 = 8, A0 = function(T, M) {
    const K = bt;
    let ot = null;
    const kt = () => (ot || (ot = tn(), fr(M, (At) => {
      en(ot, At);
    })), ot);
    for (let At = 0; ; At++) {
      const Dt = _a(T), ie = [T];
      let ur = !1;
      if (fr(Dt, (Ne) => {
        A(Ne) === Zt.documentFragment ? zi(ie, Ne) : !ur && !Hi(K, Ne) && (ur = Hi(kt(), Ne));
      }), !ur) return;
      if (At >= F0) throw pr("the tree kept changing during in-place sanitization; refusing to return it");
      fr(ie, (Ne, Se) => {
        M0(Ne, Se > 0, T, kt());
      });
    }
  }, M0 = function(T, M, K, ot) {
    const kt = Ns(T);
    let At;
    for (; At = kt.nextNode(); )
      !Hi(ot, At) || Hi(bt, At) || (M && Re(dt.uponSanitizeShadowNode, At, null), Fa(At, K));
  }, E0 = function(T) {
    bt && en(bt, T);
  }, Yh = function(T, M) {
    return $ ? T === "patchsrc" ? !0 : T === "for" && M !== "label" && M !== "output" : !1;
  }, $0 = function(T) {
    $ && Sa(T, (M) => {
      const K = A(M);
      if (K === Zt.processingInstruction || K === Zt.comment && oe(Oc, M.data)) {
        try {
          p(M);
        } catch {
        }
        return !1;
      }
      if (K === Zt.element) {
        const ot = M, kt = Vt(L(M));
        try {
          ot.hasAttribute && ot.hasAttribute("patchsrc") && ot.removeAttribute("patchsrc"), ot.hasAttribute && ot.hasAttribute("for") && Yh("for", kt) && ot.removeAttribute("for");
        } catch {
        }
      }
      return !0;
    });
  }, Uh = function(T) {
    let M = null, K = null;
    if (P) T = "<remove></remove>" + T;
    else {
      const At = mx(T, Nx);
      K = At && At[0];
    }
    qi === "application/xhtml+xml" && ci === Ze && (T = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + T + "</body></html>");
    const ot = O ? W(T) : T;
    if (ci === Ze) try {
      M = new c().parseFromString(ot, qi);
    } catch {
    }
    if (!M || !M.documentElement) {
      M = xt.createDocument(ci, "template", null);
      try {
        M.documentElement.innerHTML = ya ? Q : ot;
      } catch {
      }
    }
    const kt = M.body || M.documentElement;
    return T && K && kt.insertBefore(r.createTextNode(K), kt.childNodes[0] || null), ci === Ze ? Ct.call(M, G ? "html" : "body")[0] : G ? M.documentElement : kt;
  }, Ns = function(T) {
    let M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const K = F ? F(T) : T.ownerDocument;
    return wt.call(K || T, T, (M ? 0 : l.SHOW_ELEMENT) | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION, null);
  }, Ba = function(T) {
    return T = Hs(T, _t, " "), T = Hs(T, It, " "), T = Hs(T, St, " "), T;
  }, va = function(T) {
    var M;
    La(T);
    const K = (M = T.querySelectorAll) === null || M === void 0 ? void 0 : M.call(T, "template");
    K && fr(K, (ot) => {
      di(ot.content) && va(ot.content);
    });
  }, La = function(T) {
    T.normalize();
    const M = Ns(T, !0);
    let K = M.nextNode();
    for (; K; )
      K.data = Ba(K.data), K = M.nextNode();
  }, qs = function(T) {
    const M = B ? B(T) : null;
    return typeof M != "string" || Vt(M) !== "form" ? !1 : typeof T.nodeName != "string" || typeof T.textContent != "string" || typeof T.removeChild != "function" || T.attributes !== S(T) || typeof T.removeAttribute != "function" || typeof T.removeAttributeNode != "function" || typeof T.getAttributeNode != "function" || typeof T.setAttribute != "function" || typeof T.namespaceURI != "string" || typeof T.insertBefore != "function" || typeof T.hasChildNodes != "function" || T.nodeType !== _(T) || T.childNodes !== x(T);
  }, jh = function(T) {
    if (!_ || typeof T != "object" || T === null) return null;
    try {
      const M = _(T);
      return typeof M == "number" ? M : null;
    } catch {
      return null;
    }
  }, di = function(T) {
    return jh(T) === Zt.documentFragment;
  }, Wi = function(T) {
    return jh(T) !== null;
  };
  function Re(et, T, M) {
    et.length !== 0 && fr(et, (K) => {
      K.call(t, T, M, Rs);
    });
  }
  const O0 = function(T, M, K) {
    return !!($ && K === Zt.element && T.hasChildNodes() && !Wi(T.firstElementChild) && oe(hn, T.textContent) && oe(hn, T.innerHTML) || $ && qx[M] && K === Zt.element && N(T) === Ze && (Wi(T.firstElementChild) || typeof T.textContent == "string" && oe(hn, T.textContent)) || K === Zt.processingInstruction || $ && K === Zt.comment && oe(Oc, T.data));
  }, Ws = function(T, M) {
    if (T instanceof RegExp) return oe(T, M);
    if (T instanceof Function) {
      for (var K = arguments.length, ot = new Array(K > 2 ? K - 2 : 0), kt = 2; kt < K; kt++) ot[kt - 2] = arguments[kt];
      return !!T(M, ...ot);
    }
    return !1;
  }, D0 = function(T, M, K) {
    if (!De[M] && Vh(M) && Ws(he.tagNameCheck, M)) return !1;
    if (mt && !Et[M] && !Et[Zr(M)]) {
      const ot = C(T), kt = x(T);
      if (kt && ot) {
        const At = kt.length;
        for (let Dt = At - 1; Dt >= 0; --Dt) {
          const ie = T === K ? f(kt[Dt], !0) : kt[Dt];
          ot.insertBefore(ie, y(T));
        }
      }
    }
    return Er(T), !0;
  }, Gh = function(T, M, K, ot) {
    return T.length === 0 ? M : M === K || M === ot ? es(M) : M;
  }, fi = function(T, M) {
    return T === M || C(T) !== null ? !1 : (Tt && Ta(T), !0);
  }, I0 = function(T, M) {
    if (E0(T), Re(dt.beforeSanitizeElements, T, null), fi(T, M)) return !0;
    if (qs(T))
      return Er(T), !0;
    const K = Vt(L(T)), ot = A(T);
    if (Nt = Gh(dt.uponSanitizeElement, Nt, Xe, j), Re(dt.uponSanitizeElement, T, {
      tagName: K,
      allowedTags: Nt
    }), fi(T, M)) return !0;
    if (O0(T, K, ot))
      return Er(T), !0;
    if (De[K] || !(re.tagCheck instanceof Function && re.tagCheck(K)) && !Nt[K]) {
      const kt = D0(T, K, M);
      return kt === !1 && (Re(dt.afterSanitizeElements, T, null), fi(T, M)) ? !0 : kt;
    }
    if (ot === Zt.element && !v0(T) || (K === "noscript" || K === "noembed" || K === "noframes") && oe(Px, T.innerHTML))
      return Er(T), !0;
    if (g && ot === Zt.text) {
      const kt = T.textContent, At = Ba(kt);
      kt !== At && (zi(t.removed, { element: T.cloneNode() }), T.textContent = At);
    }
    return Re(dt.afterSanitizeElements, T, null), fi(T, M);
  }, Xh = function(T, M, K) {
    if (hr[M] || Yh(M, T) || st && (M === "id" || M === "name") && (K in r || K in S0)) return !1;
    const ot = Ht[M] || re.attributeCheck instanceof Function && re.attributeCheck(M, T);
    if (Ie && oe(Pt, M) || Lr && oe(Xt, M)) return !0;
    if (!ot) return Vh(T) && Ws(he.tagNameCheck, T) && Ws(he.attributeNameCheck, M, T) || M === "is" && he.allowCustomizedBuiltInElements && Ws(he.tagNameCheck, K);
    if (Ih[M]) return !0;
    const kt = Hs(K, Fe, "");
    return oe(vr, kt) || (M === "src" || M === "xlink:href" || M === "href") && T !== "script" && sn(K, "data:") === 0 && Ar[T] || Fr && !oe(we, kt) ? !0 : !K;
  }, P0 = Wt({}, [
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "missing-glyph"
  ]), Vh = function(T) {
    return !P0[Zr(T)] && oe(Gr, T);
  }, R0 = function(T, M, K, ot) {
    if (O && typeof h == "object" && typeof h.getAttributeType == "function" && !K) switch (h.getAttributeType(T, M)) {
      case "TrustedHTML":
        return W(ot);
      case "TrustedScriptURL":
        return rt(ot);
    }
    return ot;
  }, N0 = function(T, M, K, ot) {
    try {
      return K ? T.setAttributeNS(K, M, ot) : T.setAttribute(M, ot), qs(T) ? (Er(T), !1) : !0;
    } catch {
      return ui(M, T), !1;
    }
  }, Zh = function(T, M) {
    return $ && oe(Rx, M) ? !0 : Zr(T) === "attributename" && sn(M, "href") !== -1;
  }, q0 = function(T, M) {
    if (Re(dt.beforeSanitizeAttributes, T, null), fi(T, M)) return;
    const K = T.attributes;
    if (!K || qs(T)) return;
    Ht = Gh(dt.uponSanitizeAttribute, Ht, Ve, k);
    const ot = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: Ht,
      forceKeepAttr: void 0
    };
    let kt = K.length;
    const At = Vt(L(T));
    for (; kt--; ) {
      const Dt = K[kt], ie = Dt.name, ur = Dt.namespaceURI, Ne = Dt.value, Se = Vt(ie), Ke = Ne;
      let ce = ie === "value" ? Ke : yx(Ke), Kh = !1;
      if (ot.attrName = Se, ot.attrValue = ce, ot.keepAttr = !0, ot.forceKeepAttr = void 0, Re(dt.uponSanitizeAttribute, T, ot), ce = ot.attrValue, X && (Se === "id" || Se === "name") && sn(ce, at) !== 0 && (ui(ie, T, Dt), ce = at + ce, Kh = !0), Zh(ie, ce)) {
        ui(ie, T, Dt);
        continue;
      }
      if (!ot.forceKeepAttr) {
        if (!ot.keepAttr) {
          ui(ie, T, Dt);
          continue;
        }
        if (!cr && oe(Dc, ce)) {
          ui(ie, T, Dt);
          continue;
        }
        if (g && (ce = Ba(ce)), !Xh(At, Se, ce)) {
          ui(ie, T, Dt);
          continue;
        }
        ce = R0(At, Se, ur, ce), ce !== Ke && N0(T, ie, ur, ce) && Kh && Bc(t.removed);
      }
    }
    Re(dt.afterSanitizeAttributes, T, null), fi(T, M);
  }, Fa = function(T, M) {
    I0(T, M), q0(T, M), di(T.content) && Aa(T.content);
  }, Aa = function(T) {
    let M = null;
    const K = Ns(T);
    for (Re(dt.beforeSanitizeShadowDOM, T, null); M = K.nextNode(); )
      if (Re(dt.uponSanitizeShadowNode, M, null), Fa(M, T), A(M) === Zt.element) {
        const ot = b(M);
        di(ot) && (Ma(ot), Aa(ot));
      }
    g && La(T), Re(dt.afterSanitizeShadowDOM, T, null);
  }, Ma = function(T) {
    const M = [{
      node: T,
      shadow: null
    }];
    for (; M.length > 0; ) {
      const K = M.pop();
      if (K.shadow) {
        Aa(K.shadow);
        continue;
      }
      const ot = K.node, kt = A(ot) === Zt.element, At = x(ot);
      if (At) for (let Dt = At.length - 1; Dt >= 0; --Dt) M.push({
        node: At[Dt],
        shadow: null
      });
      if (kt) {
        const Dt = B ? B(ot) : null;
        if (typeof Dt == "string" && Vt(Dt) === "template") {
          const ie = ot.content;
          di(ie) && M.push({
            node: ie,
            shadow: null
          });
        }
      }
      if (kt) {
        const Dt = b(ot);
        di(Dt) && M.push({
          node: null,
          shadow: Dt
        }, {
          node: Dt,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(et) {
    let T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, M = null, K = null, ot = null, kt = null;
    if (ya = !et, ya && (et = "<!-->"), typeof et != "string" && !Wi(et) && (et = wx(et), typeof et != "string"))
      throw pr("dirty is not a string, aborting");
    if (!t.isSupported) return et;
    Z ? (Nt = j, Ht = k) : ba(T), t.removed = [];
    const At = Tt && typeof et != "string" && Wi(et);
    let Dt = [];
    const ie = bt;
    if (At) {
      $0(et);
      const Ke = L(et);
      if (typeof Ke == "string") {
        const ce = Vt(Ke);
        if (!Nt[ce] || De[ce])
          throw ka(et), pr("root node is forbidden and cannot be sanitized in-place");
      }
      if (qs(et))
        throw ka(et), pr("root node is clobbered and cannot be sanitized in-place");
      Dt = _a(et), bt = tn();
    } else if (Wi(et))
      M = Uh("<!---->"), K = M.ownerDocument.importNode(et, !0), K.nodeType === Zt.element && K.nodeName === "BODY" || K.nodeName === "HTML" ? M = K : M.appendChild(K), Ma(M);
    else {
      if (!Y && !g && !G && et.indexOf("<") === -1) return q(et);
      if (M = Uh(et), !M) return Y ? null : it ? Q : "";
    }
    M && P && Er(M.firstChild);
    const ur = At ? et : M;
    try {
      At && Ma(et);
      const Ke = Ns(ur);
      for (; ot = Ke.nextNode(); ) Fa(ot, ur);
      At && A0(et, Dt);
    } catch (Ke) {
      throw At && (ka(et), Hh(et, Dt)), Ke;
    } finally {
      bt = ie;
    }
    if (At) {
      if (Hh(et, Dt)) throw pr("a node selected for removal could not be safely returned; refusing to sanitize in place");
      return g && va(et), et;
    }
    if (Y) {
      if (g && va(M), tt)
        for (kt = Bt.call(M.ownerDocument); M.firstChild; ) kt.appendChild(M.firstChild);
      else kt = M;
      return (Ht.shadowroot || Ht.shadowrootmode) && (kt = pt.call(i, kt, !0)), kt;
    }
    const Ne = () => G ? M.outerHTML : M.innerHTML;
    let Se = Ne();
    return g && oe(Ax, Se) && (La(M), Se = Ne()), G && Nt["!doctype"] && M.ownerDocument && M.ownerDocument.doctype && M.ownerDocument.doctype.name && oe(Dx, M.ownerDocument.doctype.name) && (Se = "<!DOCTYPE " + M.ownerDocument.doctype.name + `>
` + Se), q(Se);
  }, t.setConfig = function() {
    let et = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ba(et), Z = !0, j = Nt, k = Ht;
  }, t.clearConfig = function() {
    Rs = null, Z = !1, j = null, k = null, O = R, Q = "";
  }, t.isValidAttribute = function(et, T, M) {
    Rs || ba({});
    const K = Vt(et), ot = Vt(T);
    return typeof M == "string" && (Zh(T, M) || !cr && oe(Dc, M)) ? !1 : Xh(K, ot, M);
  }, t.addHook = function(et, T) {
    typeof T == "function" && ge(dt, et) && zi(dt[et], T);
  }, t.removeHook = function(et, T) {
    if (ge(dt, et)) {
      if (T !== void 0) {
        const M = fx(dt[et], T);
        return M === -1 ? void 0 : gx(dt[et], M, 1)[0];
      }
      return Bc(dt[et]);
    }
  }, t.removeHooks = function(et) {
    ge(dt, et) && (dt[et] = []);
  }, t.removeAllHooks = function() {
    dt = Ic();
  }, t;
}
var Fi = Wd(), us = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, bo = /\s/, Hx = /* @__PURE__ */ d((e) => {
  let t = "", r = 0, i = 0;
  for (; i < e.length; ) {
    const s = e.indexOf("%%", i);
    if (s === -1)
      break;
    const o = e.indexOf(`
`, s);
    if (o === -1)
      break;
    let a = s;
    for (; a > r && bo.test(e[a - 1]); )
      a--;
    t += e.slice(r, a) + `
`, r = o + 1, i = r;
  }
  return t + e.slice(r);
}, "stripAnyComments"), ao = /* @__PURE__ */ d((e) => e === `
` || e === "\r", "isLineBreak"), Yx = /* @__PURE__ */ d((e, t) => {
  let r = -1;
  for (let i = t; i < e.length && bo.test(e[i]); i++)
    ao(e[i]) && (r = i);
  return r;
}, "lastLineBreakInWhitespaceRun"), zd = /* @__PURE__ */ d((e) => {
  let t = 0;
  for (; t < e.length && bo.test(e[t]) && !ao(e[t]); )
    t++;
  const r = e.slice(0, t);
  if (!e.startsWith("---", t))
    return;
  const i = [];
  for (let h = t + 3; h < e.length && bo.test(e[h]); h++)
    ao(e[h]) && i.push(h);
  if (i.length === 0)
    return;
  const s = `${r}---`, o = /* @__PURE__ */ d((h) => ao(e[h]) && e.startsWith(s, h + 1) ? Yx(e, h + 1 + s.length) : -1, "closingEnd"), a = i[0] + 1;
  let n = -1;
  for (let h = a; h < e.length; h++)
    o(h) !== -1 && (n = h);
  if (n === -1)
    return;
  let l = i[0];
  for (const h of i)
    h < n && (l = h);
  const c = l + 1;
  for (let h = c; h <= n; h++) {
    const u = o(h);
    if (u !== -1)
      return { indent: r, body: e.slice(c, h), length: u + 1 };
  }
}, "matchFrontMatter"), Hd = class extends Error {
  static {
    d(this, "UnknownDiagramError");
  }
  constructor(e) {
    super(e), this.name = "UnknownDiagramError";
  }
}, ii = {}, ta = /* @__PURE__ */ d(function(e, t) {
  const r = zd(e);
  e = Hx(
    (r ? e.slice(r.length) : e).replace(us, "")
  );
  for (const [i, { detector: s }] of Object.entries(ii))
    if (s(e, t))
      return i;
  throw new Hd(
    `No diagram type detected matching given configuration for text: ${e}`
  );
}, "detectType"), En = /* @__PURE__ */ d((...e) => {
  for (const { id: t, detector: r, loader: i } of e)
    Yd(t, r, i);
}, "registerLazyLoadedDiagrams"), Yd = /* @__PURE__ */ d((e, t, r) => {
  ii[e] && J.warn(`Detector with key ${e} already exists. Overwriting.`), ii[e] = { detector: t, loader: r }, J.debug(`Detector with key ${e} added${r ? " with loader" : ""}`);
}, "addDetector"), Ux = /* @__PURE__ */ d((e) => ii[e].loader, "getDiagramLoader"), $n = /* @__PURE__ */ d((e, t, { depth: r = 2 } = {}) => {
  const i = { depth: r };
  if (Array.isArray(t) && !Array.isArray(e))
    return t.forEach((s) => $n(e, s, i)), e;
  if (Array.isArray(t) && Array.isArray(e))
    return t.forEach((s) => {
      e.includes(s) || e.push(s);
    }), e;
  if (e == null || r <= 0)
    return e != null && typeof e == "object" && typeof t == "object" ? Object.assign(e, t) : t;
  if (t != null && typeof e == "object" && typeof t == "object") {
    const s = e;
    Object.entries(t).forEach(([o, a]) => {
      if (typeof a == "object") {
        if (a === null)
          return;
        Object.hasOwn(e, o) || Object.defineProperty(e, o, {
          value: void 0,
          writable: !0,
          enumerable: !0,
          configurable: !0
        }), s[o] === void 0 && (s[o] = Array.isArray(a) ? [] : {}), typeof s[o] == "object" && (s[o] = $n(s[o], a, { depth: r - 1 }));
      } else typeof s[o] != "object" && (Object.hasOwn(e, o) ? s[o] = a : Object.defineProperty(e, o, {
        value: a,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }));
    });
  }
  return e;
}, "assignWithDepth"), Jt = $n, sr = "#ffffff", or = "#f2f2f2", Ft = /* @__PURE__ */ d((e, t) => t ? w(e, { s: -40, l: 10 }) : w(e, { s: -40, l: -10 }), "mkBorder"), Pc = /* @__PURE__ */ d((e) => typeof e == "object" && e !== null && !Array.isArray(e), "isPlainObject"), je = /* @__PURE__ */ d((e, t) => Pc(e) && Pc(t) ? { ...e, ...t } : t, "applyOverride"), jx = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.useGradient = !0, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || z(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.vertLineColor = this.vertLineColor || "navy", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.darkMode ? (this.rowOdd = this.rowOdd || U(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || U(this.mainBkg, 10)) : (this.rowOdd = this.rowOdd || z(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || z(this.mainBkg, 5)), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 }), this.darkMode)
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 75);
    else
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 25);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleInv" + t] = this["cScaleInv" + t] || D(this["cScale" + t]);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this.darkMode ? this["cScalePeer" + t] = this["cScalePeer" + t] || z(this["cScale" + t], 10) : this["cScalePeer" + t] = this["cScalePeer" + t] || U(this["cScale" + t], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let t = 0; t < 5; t++)
      this["surface" + t] = this["surface" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (5 + t * 3) }), this["surfacePeer" + t] = this["surfacePeer" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (8 + t * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || w(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || w(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || w(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || w(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || w(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || w(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || w(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || w(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || w(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || w(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || w(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || w(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? w(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? w(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? w(this.tertiaryColor, { l: -30 }), this.venn4 = this.venn4 ?? w(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? w(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? w(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? w(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? w(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.cynefin = {
      domainFontSize: this.cynefin?.domainFontSize || 16,
      itemFontSize: this.cynefin?.itemFontSize || 12,
      boundaryColor: this.cynefin?.boundaryColor || this.lineColor,
      boundaryWidth: this.cynefin?.boundaryWidth || 2,
      cliffColor: this.cynefin?.cliffColor || "#8B0000",
      cliffWidth: this.cynefin?.cliffWidth || 4,
      arrowColor: this.cynefin?.arrowColor || this.lineColor,
      arrowWidth: this.cynefin?.arrowWidth || 2,
      complexBg: this.cynefin?.complexBg || "#E8F5E9",
      complicatedBg: this.cynefin?.complicatedBg || "#E3F2FD",
      chaoticBg: this.cynefin?.chaoticBg || "#FBE9E7",
      clearBg: this.cynefin?.clearBg || "#FFF8E1",
      confusionBg: this.cynefin?.confusionBg || "#F3E5F5",
      textColor: this.cynefin?.textColor || this.textColor,
      labelColor: this.cynefin?.labelColor || this.primaryTextColor
    }, this.radar = {
      axisColor: this.radar?.axisColor || this.lineColor,
      axisStrokeWidth: this.radar?.axisStrokeWidth || 2,
      axisLabelFontSize: this.radar?.axisLabelFontSize || 12,
      curveOpacity: this.radar?.curveOpacity || 0.5,
      curveStrokeWidth: this.radar?.curveStrokeWidth || 2,
      graticuleColor: this.radar?.graticuleColor || "#DEDEDE",
      graticuleStrokeWidth: this.radar?.graticuleStrokeWidth || 1,
      graticuleOpacity: this.radar?.graticuleOpacity || 0.3,
      legendBoxSize: this.radar?.legendBoxSize || 12,
      legendFontSize: this.radar?.legendFontSize || 12
    }, this.wardleyEvolutionColor = this.wardleyEvolutionColor || "#dc3545", this.wardley = {
      backgroundColor: this.wardley?.backgroundColor || this.background,
      axisColor: this.wardley?.axisColor || this.lineColor,
      axisTextColor: this.wardley?.axisTextColor || this.primaryTextColor,
      gridColor: this.wardley?.gridColor || this.gridColor,
      componentFill: this.wardley?.componentFill || this.background,
      componentStroke: this.wardley?.componentStroke || this.lineColor,
      componentLabelColor: this.wardley?.componentLabelColor || this.primaryTextColor,
      linkStroke: this.wardley?.linkStroke || this.lineColor,
      evolutionStroke: this.wardley?.evolutionStroke || this.wardleyEvolutionColor,
      annotationStroke: this.wardley?.annotationStroke || this.lineColor,
      annotationTextColor: this.wardley?.annotationTextColor || this.primaryTextColor,
      annotationFill: this.wardley?.annotationFill || this.background
    }, this.archEdgeColor = this.archEdgeColor || "#777", this.archEdgeArrowColor = this.archEdgeArrowColor || "#777", this.archEdgeWidth = this.archEdgeWidth || "3", this.archGroupBorderColor = this.archGroupBorderColor || "#000", this.archGroupBorderWidth = this.archGroupBorderWidth || "2px", this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      dataLabelColor: this.xyChart?.dataLabelColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || w(this.primaryColor, { h: -30 }), this.git4 = this.git4 || w(this.primaryColor, { h: -60 }), this.git5 = this.git5 || w(this.primaryColor, { h: -90 }), this.git6 = this.git6 || w(this.primaryColor, { h: 60 }), this.git7 = this.git7 || w(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.emUiFill = this.emUiFill || "white", this.emUiStroke = this.emUiStroke || "#dbdada", this.emProcessorFill = this.emProcessorFill || "#edb3f6", this.emProcessorStroke = this.emProcessorStroke || "#b88cbf", this.emReadModelFill = this.emReadModelFill || "#d3f1a2", this.emReadModelStroke = this.emReadModelStroke || "#a3b732", this.emCommandFill = this.emCommandFill || "#bcd6fe", this.emCommandStroke = this.emCommandStroke || "#679ac3", this.emEventFill = this.emEventFill || "#ffb778", this.emEventStroke = this.emEventStroke || "#c19a0f", this.emSwimlaneBackgroundOdd = this.emSwimlaneBackgroundOdd || "rgb(250,250,250)", this.emSwimlaneBackgroundStroke = this.emSwimlaneBackgroundStroke || "rgb(240,240,240)", this.emArrowhead = this.emArrowhead || this.lineColor, this.emRelationStroke = this.emRelationStroke || this.lineColor, this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    }), Object.hasOwn(e, "nodeBorder") && !Object.hasOwn(e, "useGradient") && (this.useGradient = !1);
  }
}, Gx = /* @__PURE__ */ d((e) => {
  const t = new jx();
  return t.calculate(e), t;
}, "getThemeVariables"), Xx = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = z(this.primaryColor, 16), this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = D(this.background), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.lineColor = D(this.background), this.textColor = D(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = z(D("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#ccc", this.border2 = Nr(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.clusterBkg = "#302F3D", this.sectionBkgColor = U("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = U(this.sectionBkgColor, 10), this.taskBorderColor = Nr(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = Nr(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = this.rowOdd || z(this.mainBkg, 5) || "#ffffff", this.rowEven = this.rowEven || U(this.mainBkg, 10), this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd", this.useGradient = !0, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal";
  }
  updateColors() {
    this.secondBkg = z(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = z(this.labelBackground, 25), this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.actorBorder, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.background, this.taskBkgColor = z(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = D(this.doneTaskBkgColor), this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = w(this.primaryColor, { h: 64 }), this.fillType3 = w(this.secondaryColor, { h: 64 }), this.fillType4 = w(this.primaryColor, { h: -64 }), this.fillType5 = w(this.secondaryColor, { h: -64 }), this.fillType6 = w(this.primaryColor, { h: 128 }), this.fillType7 = w(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || D(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || z(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || w(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || w(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.mainContrastColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.mainContrastColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let e = 0; e < 8; e++)
      this["venn" + (e + 1)] = this["venn" + (e + 1)] ?? z(this["cScale" + e], 30);
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.cynefin = {
      domainFontSize: this.cynefin?.domainFontSize || 16,
      itemFontSize: this.cynefin?.itemFontSize || 12,
      boundaryColor: this.cynefin?.boundaryColor || this.lineColor,
      boundaryWidth: this.cynefin?.boundaryWidth || 2,
      cliffColor: this.cynefin?.cliffColor || "#FF6B6B",
      cliffWidth: this.cynefin?.cliffWidth || 4,
      arrowColor: this.cynefin?.arrowColor || this.lineColor,
      arrowWidth: this.cynefin?.arrowWidth || 2,
      complexBg: this.cynefin?.complexBg || "#1B5E20",
      complicatedBg: this.cynefin?.complicatedBg || "#0D47A1",
      chaoticBg: this.cynefin?.chaoticBg || "#BF360C",
      clearBg: this.cynefin?.clearBg || "#F57F17",
      confusionBg: this.cynefin?.confusionBg || "#4A148C",
      textColor: this.cynefin?.textColor || this.textColor,
      labelColor: this.cynefin?.labelColor || this.primaryTextColor
    }, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      dataLabelColor: this.xyChart?.dataLabelColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22"
    }, this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.background
    }, this.radar = {
      axisColor: this.radar?.axisColor || this.lineColor,
      axisStrokeWidth: this.radar?.axisStrokeWidth || 2,
      axisLabelFontSize: this.radar?.axisLabelFontSize || 12,
      curveOpacity: this.radar?.curveOpacity || 0.5,
      curveStrokeWidth: this.radar?.curveStrokeWidth || 2,
      graticuleColor: this.radar?.graticuleColor || "#DEDEDE",
      graticuleStrokeWidth: this.radar?.graticuleStrokeWidth || 1,
      graticuleOpacity: this.radar?.graticuleOpacity || 0.3,
      legendBoxSize: this.radar?.legendBoxSize || 12,
      legendFontSize: this.radar?.legendFontSize || 12
    }, this.wardleyEvolutionColor = this.wardleyEvolutionColor || "#ff6b6b", this.wardley = {
      backgroundColor: this.wardley?.backgroundColor || this.background,
      axisColor: this.wardley?.axisColor || this.lineColor,
      axisTextColor: this.wardley?.axisTextColor || this.primaryTextColor,
      gridColor: this.wardley?.gridColor || this.gridColor,
      componentFill: this.wardley?.componentFill || this.mainBkg,
      componentStroke: this.wardley?.componentStroke || this.lineColor,
      componentLabelColor: this.wardley?.componentLabelColor || this.primaryTextColor,
      linkStroke: this.wardley?.linkStroke || this.lineColor,
      evolutionStroke: this.wardley?.evolutionStroke || this.wardleyEvolutionColor,
      annotationStroke: this.wardley?.annotationStroke || this.lineColor,
      annotationTextColor: this.wardley?.annotationTextColor || this.primaryTextColor,
      annotationFill: this.wardley?.annotationFill || this.mainBkg
    }, this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = z(this.secondaryColor, 20), this.git1 = z(this.pie2 || this.secondaryColor, 20), this.git2 = z(this.pie3 || this.tertiaryColor, 20), this.git3 = z(this.pie4 || w(this.primaryColor, { h: -30 }), 20), this.git4 = z(this.pie5 || w(this.primaryColor, { h: -60 }), 20), this.git5 = z(this.pie6 || w(this.primaryColor, { h: -90 }), 10), this.git6 = z(this.pie7 || w(this.primaryColor, { h: 60 }), 10), this.git7 = z(this.pie8 || w(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || D(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || D(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.emUiFill = this.emUiFill || "#2d2d2d", this.emUiStroke = this.emUiStroke || "#555", this.emProcessorFill = this.emProcessorFill || z("#5a3d5c", 10), this.emProcessorStroke = this.emProcessorStroke || "#8a6d8c", this.emReadModelFill = this.emReadModelFill || z("#3d5a2d", 10), this.emReadModelStroke = this.emReadModelStroke || "#6d8c5c", this.emCommandFill = this.emCommandFill || z("#2d3d5a", 10), this.emCommandStroke = this.emCommandStroke || "#5c6d8c", this.emEventFill = this.emEventFill || z("#5a452d", 10), this.emEventStroke = this.emEventStroke || "#8c755c", this.emSwimlaneBackgroundOdd = this.emSwimlaneBackgroundOdd || z(this.background, 5), this.emSwimlaneBackgroundStroke = this.emSwimlaneBackgroundStroke || z(this.background, 12), this.emArrowhead = this.emArrowhead || this.lineColor, this.emRelationStroke = this.emRelationStroke || this.lineColor, this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || z(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || z(this.background, 2), this.nodeBorder = this.nodeBorder || "#999";
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, Vx = /* @__PURE__ */ d((e) => {
  const t = new Xx();
  return t.calculate(e), t;
}, "getThemeVariables"), Zx = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = w(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.lineColor = D(this.background), this.textColor = D(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.primaryBorderColor = Ft(this.primaryColor, this.darkMode), this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "rgba(232,232,232, 0.8)", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.clusterBkg = "#FBFBFF", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.sectionBkgColor = Nr(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "navy", this.noteFontWeight = this.noteFontWeight || "normal", this.fontWeight = this.fontWeight || "normal", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.rowOdd = "calculated", this.rowEven = "calculated", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = !1, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow(1px 2px 2px rgba(185, 185, 185, 1))", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || U(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || U(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = U(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || U(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || w(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || w(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || w(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || D(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || D(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || z(this.primaryColor, 75) || "#ffffff", this.rowEven = this.rowEven || z(this.primaryColor, 1), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = w(this.primaryColor, { h: 64 }), this.fillType3 = w(this.secondaryColor, { h: 64 }), this.fillType4 = w(this.primaryColor, { h: -64 }), this.fillType5 = w(this.secondaryColor, { h: -64 }), this.fillType6 = w(this.primaryColor, { h: 128 }), this.fillType7 = w(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || w(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || w(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || w(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || w(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || w(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || w(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || w(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || w(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || w(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || w(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? w(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? w(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? w(this.tertiaryColor, { l: -40 }), this.venn4 = this.venn4 ?? w(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? w(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? w(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? w(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? w(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.cynefin = {
      domainFontSize: this.cynefin?.domainFontSize || 16,
      itemFontSize: this.cynefin?.itemFontSize || 12,
      boundaryColor: this.cynefin?.boundaryColor || this.lineColor,
      boundaryWidth: this.cynefin?.boundaryWidth || 2,
      cliffColor: this.cynefin?.cliffColor || "#8B0000",
      cliffWidth: this.cynefin?.cliffWidth || 4,
      arrowColor: this.cynefin?.arrowColor || this.lineColor,
      arrowWidth: this.cynefin?.arrowWidth || 2,
      complexBg: this.cynefin?.complexBg || "#E8F5E9",
      complicatedBg: this.cynefin?.complicatedBg || "#E3F2FD",
      chaoticBg: this.cynefin?.chaoticBg || "#FBE9E7",
      clearBg: this.cynefin?.clearBg || "#FFF8E1",
      confusionBg: this.cynefin?.confusionBg || "#F3E5F5",
      textColor: this.cynefin?.textColor || this.textColor,
      labelColor: this.cynefin?.labelColor || this.primaryTextColor
    }, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.radar = {
      axisColor: this.radar?.axisColor || this.lineColor,
      axisStrokeWidth: this.radar?.axisStrokeWidth || 2,
      axisLabelFontSize: this.radar?.axisLabelFontSize || 12,
      curveOpacity: this.radar?.curveOpacity || 0.5,
      curveStrokeWidth: this.radar?.curveStrokeWidth || 2,
      graticuleColor: this.radar?.graticuleColor || "#DEDEDE",
      graticuleStrokeWidth: this.radar?.graticuleStrokeWidth || 1,
      graticuleOpacity: this.radar?.graticuleOpacity || 0.3,
      legendBoxSize: this.radar?.legendBoxSize || 12,
      legendFontSize: this.radar?.legendFontSize || 12
    }, this.wardleyEvolutionColor = this.wardleyEvolutionColor || "#dc3545", this.wardley = {
      backgroundColor: this.wardley?.backgroundColor || this.background,
      axisColor: this.wardley?.axisColor || this.lineColor,
      axisTextColor: this.wardley?.axisTextColor || this.primaryTextColor,
      gridColor: this.wardley?.gridColor || this.gridColor,
      componentFill: this.wardley?.componentFill || this.background,
      componentStroke: this.wardley?.componentStroke || this.lineColor,
      componentLabelColor: this.wardley?.componentLabelColor || this.primaryTextColor,
      linkStroke: this.wardley?.linkStroke || this.lineColor,
      evolutionStroke: this.wardley?.evolutionStroke || this.wardleyEvolutionColor,
      annotationStroke: this.wardley?.annotationStroke || this.lineColor,
      annotationTextColor: this.wardley?.annotationTextColor || this.primaryTextColor,
      annotationFill: this.wardley?.annotationFill || this.background
    }, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      dataLabelColor: this.xyChart?.dataLabelColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || w(this.primaryColor, { h: -30 }), this.git4 = this.git4 || w(this.primaryColor, { h: -60 }), this.git5 = this.git5 || w(this.primaryColor, { h: -90 }), this.git6 = this.git6 || w(this.primaryColor, { h: 60 }), this.git7 = this.git7 || w(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || U(D(this.git0), 25), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || D(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || D(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.emUiFill = this.emUiFill || "white", this.emUiStroke = this.emUiStroke || "#dbdada", this.emProcessorFill = this.emProcessorFill || "#edb3f6", this.emProcessorStroke = this.emProcessorStroke || "#b88cbf", this.emReadModelFill = this.emReadModelFill || "#d3f1a2", this.emReadModelStroke = this.emReadModelStroke || "#a3b732", this.emCommandFill = this.emCommandFill || "#bcd6fe", this.emCommandStroke = this.emCommandStroke || "#679ac3", this.emEventFill = this.emEventFill || "#ffb778", this.emEventStroke = this.emEventStroke || "#c19a0f", this.emSwimlaneBackgroundOdd = this.emSwimlaneBackgroundOdd || "rgb(250,250,250)", this.emSwimlaneBackgroundStroke = this.emSwimlaneBackgroundStroke || "rgb(240,240,240)", this.emArrowhead = this.emArrowhead || this.lineColor, this.emRelationStroke = this.emRelationStroke || this.lineColor, this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (Object.keys(this).forEach((r) => {
      this[r] === "calculated" && (this[r] = void 0);
    }), typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, Kx = /* @__PURE__ */ d((e) => {
  const t = new Zx();
  return t.calculate(e), t;
}, "getThemeVariables"), Qx = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = z("#cde498", 10), this.primaryBorderColor = Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.primaryColor), this.lineColor = D(this.background), this.textColor = D(this.background), this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "calculated", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.vertLineColor = "#00BFFF", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = !0, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,0.5))";
  }
  updateColors() {
    this.actorBorder = U(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.actorLineColor = this.actorBorder, this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 }), this.cScalePeer1 = this.cScalePeer1 || U(this.secondaryColor, 45), this.cScalePeer2 = this.cScalePeer2 || U(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = U(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || U(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || w(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || w(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || w(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.rowOdd = this.rowOdd || z(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || z(this.mainBkg, 20), this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = w(this.primaryColor, { h: 64 }), this.fillType3 = w(this.secondaryColor, { h: 64 }), this.fillType4 = w(this.primaryColor, { h: -64 }), this.fillType5 = w(this.secondaryColor, { h: -64 }), this.fillType6 = w(this.primaryColor, { h: 128 }), this.fillType7 = w(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || w(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || w(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || w(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || w(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || w(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || w(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.venn1 = this.venn1 ?? w(this.primaryColor, { l: -30 }), this.venn2 = this.venn2 ?? w(this.secondaryColor, { l: -30 }), this.venn3 = this.venn3 ?? w(this.tertiaryColor, { l: -30 }), this.venn4 = this.venn4 ?? w(this.primaryColor, { h: 60, l: -30 }), this.venn5 = this.venn5 ?? w(this.primaryColor, { h: -60, l: -30 }), this.venn6 = this.venn6 ?? w(this.secondaryColor, { h: 60, l: -30 }), this.venn7 = this.venn7 ?? w(this.primaryColor, { h: 120, l: -30 }), this.venn8 = this.venn8 ?? w(this.secondaryColor, { h: 120, l: -30 }), this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.cynefin = {
      domainFontSize: this.cynefin?.domainFontSize || 16,
      itemFontSize: this.cynefin?.itemFontSize || 12,
      boundaryColor: this.cynefin?.boundaryColor || this.lineColor,
      boundaryWidth: this.cynefin?.boundaryWidth || 2,
      cliffColor: this.cynefin?.cliffColor || "#8B4513",
      cliffWidth: this.cynefin?.cliffWidth || 4,
      arrowColor: this.cynefin?.arrowColor || this.lineColor,
      arrowWidth: this.cynefin?.arrowWidth || 2,
      complexBg: this.cynefin?.complexBg || "#C8E6C9",
      complicatedBg: this.cynefin?.complicatedBg || "#DCEDC8",
      chaoticBg: this.cynefin?.chaoticBg || "#FFE0B2",
      clearBg: this.cynefin?.clearBg || "#FFF9C4",
      confusionBg: this.cynefin?.confusionBg || "#D7CCC8",
      textColor: this.cynefin?.textColor || this.textColor,
      labelColor: this.cynefin?.labelColor || this.primaryTextColor
    }, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.packet = {
      startByteColor: this.primaryTextColor,
      endByteColor: this.primaryTextColor,
      labelColor: this.primaryTextColor,
      titleColor: this.primaryTextColor,
      blockStrokeColor: this.primaryTextColor,
      blockFillColor: this.mainBkg
    }, this.radar = {
      axisColor: this.radar?.axisColor || this.lineColor,
      axisStrokeWidth: this.radar?.axisStrokeWidth || 2,
      axisLabelFontSize: this.radar?.axisLabelFontSize || 12,
      curveOpacity: this.radar?.curveOpacity || 0.5,
      curveStrokeWidth: this.radar?.curveStrokeWidth || 2,
      graticuleColor: this.radar?.graticuleColor || "#DEDEDE",
      graticuleStrokeWidth: this.radar?.graticuleStrokeWidth || 1,
      graticuleOpacity: this.radar?.graticuleOpacity || 0.3,
      legendBoxSize: this.radar?.legendBoxSize || 12,
      legendFontSize: this.radar?.legendFontSize || 12
    }, this.wardleyEvolutionColor = this.wardleyEvolutionColor || "#dc3545", this.wardley = {
      backgroundColor: this.wardley?.backgroundColor || this.background,
      axisColor: this.wardley?.axisColor || this.lineColor,
      axisTextColor: this.wardley?.axisTextColor || this.primaryTextColor,
      gridColor: this.wardley?.gridColor || this.gridColor,
      componentFill: this.wardley?.componentFill || this.background,
      componentStroke: this.wardley?.componentStroke || this.lineColor,
      componentLabelColor: this.wardley?.componentLabelColor || this.primaryTextColor,
      linkStroke: this.wardley?.linkStroke || this.lineColor,
      evolutionStroke: this.wardley?.evolutionStroke || this.wardleyEvolutionColor,
      annotationStroke: this.wardley?.annotationStroke || this.lineColor,
      annotationTextColor: this.wardley?.annotationTextColor || this.primaryTextColor,
      annotationFill: this.wardley?.annotationFill || this.background
    }, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      dataLabelColor: this.xyChart?.dataLabelColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || w(this.primaryColor, { h: -30 }), this.git4 = this.git4 || w(this.primaryColor, { h: -60 }), this.git5 = this.git5 || w(this.primaryColor, { h: -90 }), this.git6 = this.git6 || w(this.primaryColor, { h: 60 }), this.git7 = this.git7 || w(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || D(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || D(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.emUiFill = this.emUiFill || "white", this.emUiStroke = this.emUiStroke || "#dbdada", this.emProcessorFill = this.emProcessorFill || "#edb3f6", this.emProcessorStroke = this.emProcessorStroke || "#b88cbf", this.emReadModelFill = this.emReadModelFill || "#d3f1a2", this.emReadModelStroke = this.emReadModelStroke || "#a3b732", this.emCommandFill = this.emCommandFill || "#bcd6fe", this.emCommandStroke = this.emCommandStroke || "#679ac3", this.emEventFill = this.emEventFill || "#ffb778", this.emEventStroke = this.emEventStroke || "#c19a0f", this.emSwimlaneBackgroundOdd = this.emSwimlaneBackgroundOdd || "rgb(250,250,250)", this.emSwimlaneBackgroundStroke = this.emSwimlaneBackgroundStroke || "rgb(240,240,240)", this.emArrowhead = this.emArrowhead || this.lineColor, this.emRelationStroke = this.emRelationStroke || this.lineColor, this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, Jx = /* @__PURE__ */ d((e) => {
  const t = new Qx();
  return t.calculate(e), t;
}, "getThemeVariables"), tC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = z(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.lineColor = D(this.background), this.textColor = D(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.radius = 5, this.strokeWidth = 1, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = this.actorBorder, this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.vertLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal", this.rowOdd = this.rowOdd || z(this.mainBkg, 75) || "#ffffff", this.rowEven = this.rowEven || "#f4f4f4", this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.useGradient = !0, this.gradientStart = this.primaryBorderColor, this.gradientStop = this.secondaryBorderColor, this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,1))";
  }
  updateColors() {
    this.secondBkg = z(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = z(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.actorBorder, this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || D(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || z(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || U(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || w(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || w(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.sectionBkgColor = z(this.contrast, 30), this.sectionBkgColor2 = z(this.contrast, 30), this.taskBorderColor = U(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = z(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = U(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.vertLineColor = this.critBkgColor, this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = w(this.primaryColor, { h: 64 }), this.fillType3 = w(this.secondaryColor, { h: 64 }), this.fillType4 = w(this.primaryColor, { h: -64 }), this.fillType5 = w(this.secondaryColor, { h: -64 }), this.fillType6 = w(this.primaryColor, { h: 128 }), this.fillType7 = w(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let e = 0; e < 8; e++)
      this["venn" + (e + 1)] = this["venn" + (e + 1)] ?? this["cScale" + e];
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.cynefin = {
      domainFontSize: this.cynefin?.domainFontSize || 16,
      itemFontSize: this.cynefin?.itemFontSize || 12,
      boundaryColor: this.cynefin?.boundaryColor || this.lineColor,
      boundaryWidth: this.cynefin?.boundaryWidth || 2,
      cliffColor: this.cynefin?.cliffColor || "#8B0000",
      cliffWidth: this.cynefin?.cliffWidth || 4,
      arrowColor: this.cynefin?.arrowColor || this.lineColor,
      arrowWidth: this.cynefin?.arrowWidth || 2,
      complexBg: this.cynefin?.complexBg || "#E8F5E9",
      complicatedBg: this.cynefin?.complicatedBg || "#E3F2FD",
      chaoticBg: this.cynefin?.chaoticBg || "#FBE9E7",
      clearBg: this.cynefin?.clearBg || "#FFF8E1",
      confusionBg: this.cynefin?.confusionBg || "#F3E5F5",
      textColor: this.cynefin?.textColor || this.textColor,
      labelColor: this.cynefin?.labelColor || this.primaryTextColor
    }, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      dataLabelColor: this.xyChart?.dataLabelColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0"
    }, this.radar = {
      axisColor: this.radar?.axisColor || this.lineColor,
      axisStrokeWidth: this.radar?.axisStrokeWidth || 2,
      axisLabelFontSize: this.radar?.axisLabelFontSize || 12,
      curveOpacity: this.radar?.curveOpacity || 0.5,
      curveStrokeWidth: this.radar?.curveStrokeWidth || 2,
      graticuleColor: this.radar?.graticuleColor || "#DEDEDE",
      graticuleStrokeWidth: this.radar?.graticuleStrokeWidth || 1,
      graticuleOpacity: this.radar?.graticuleOpacity || 0.3,
      legendBoxSize: this.radar?.legendBoxSize || 12,
      legendFontSize: this.radar?.legendFontSize || 12
    }, this.wardleyEvolutionColor = this.wardleyEvolutionColor || "#dc3545", this.wardley = {
      backgroundColor: this.wardley?.backgroundColor || this.background,
      axisColor: this.wardley?.axisColor || this.lineColor,
      axisTextColor: this.wardley?.axisTextColor || this.primaryTextColor,
      gridColor: this.wardley?.gridColor || this.gridColor,
      componentFill: this.wardley?.componentFill || this.background,
      componentStroke: this.wardley?.componentStroke || this.lineColor,
      componentLabelColor: this.wardley?.componentLabelColor || this.primaryTextColor,
      linkStroke: this.wardley?.linkStroke || this.lineColor,
      evolutionStroke: this.wardley?.evolutionStroke || this.wardleyEvolutionColor,
      annotationStroke: this.wardley?.annotationStroke || this.lineColor,
      annotationTextColor: this.wardley?.annotationTextColor || this.primaryTextColor,
      annotationFill: this.wardley?.annotationFill || this.background
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = U(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || w(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || w(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || w(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || w(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || w(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.emUiFill = this.emUiFill || "white", this.emUiStroke = this.emUiStroke || "#dbdada", this.emProcessorFill = this.emProcessorFill || "#edb3f6", this.emProcessorStroke = this.emProcessorStroke || "#b88cbf", this.emReadModelFill = this.emReadModelFill || "#d3f1a2", this.emReadModelStroke = this.emReadModelStroke || "#a3b732", this.emCommandFill = this.emCommandFill || "#bcd6fe", this.emCommandStroke = this.emCommandStroke || "#679ac3", this.emEventFill = this.emEventFill || "#ffb778", this.emEventStroke = this.emEventStroke || "#c19a0f", this.emSwimlaneBackgroundOdd = this.emSwimlaneBackgroundOdd || "rgb(250,250,250)", this.emSwimlaneBackgroundStroke = this.emSwimlaneBackgroundStroke || "rgb(240,240,240)", this.emArrowhead = this.emArrowhead || this.lineColor, this.emRelationStroke = this.emRelationStroke || this.lineColor, this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, eC = /* @__PURE__ */ d((e) => {
  const t = new tC();
  return t.calculate(e), t;
}, "getThemeVariables"), rC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.radius = 3, this.strokeWidth = 2, this.primaryBorderColor = Ft(this.primaryColor, this.darkMode), this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.nodeBorder = "#000000", this.stateBorder = "#000000", this.useGradient = !0, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "drop-shadow( 0px 1px 2px rgba(0, 0, 0, 0.25));", this.tertiaryColor = "#ffffff", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal";
  }
  updateColors() {
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || (ke(this.background) ? z(this.background, 4) : U(this.background, 4));
    const e = "#ECECFE", t = "#E9E9F1", r = w(e, { h: 180, l: 5 });
    if (this.sectionBkgColor = this.sectionBkgColor || r, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || t, this.sectionBkgColor2 = this.sectionBkgColor2 || e, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || e, this.activeTaskBorderColor = this.activeTaskBorderColor || e, this.activeTaskBkgColor = this.activeTaskBkgColor || z(e, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || e, this.cScale1 = this.cScale1 || t, this.cScale2 = this.cScale2 || r, this.cScale3 = this.cScale3 || w(e, { h: 30 }), this.cScale4 = this.cScale4 || w(e, { h: 60 }), this.cScale5 = this.cScale5 || w(e, { h: 90 }), this.cScale6 = this.cScale6 || w(e, { h: 120 }), this.cScale7 = this.cScale7 || w(e, { h: 150 }), this.cScale8 = this.cScale8 || w(e, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || w(e, { h: 270 }), this.cScale10 = this.cScale10 || w(e, { h: 300 }), this.cScale11 = this.cScale11 || w(e, { h: 330 }), this.darkMode)
      for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
        this["cScale" + s] = U(this["cScale" + s], 75);
    else
      for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
        this["cScale" + s] = U(this["cScale" + s], 25);
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleInv" + s] = this["cScaleInv" + s] || D(this["cScale" + s]);
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this.darkMode ? this["cScalePeer" + s] = this["cScalePeer" + s] || z(this["cScale" + s], 10) : this["cScalePeer" + s] = this["cScalePeer" + s] || U(this["cScale" + s], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleLabel" + s] = this["cScaleLabel" + s] || this.scaleLabelColor;
    const i = this.darkMode ? -4 : -1;
    for (let s = 0; s < 5; s++)
      this["surface" + s] = this["surface" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (5 + s * 3) }), this["surfacePeer" + s] = this["surfacePeer" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (8 + s * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || e, this.fillType1 = this.fillType1 || t, this.fillType2 = this.fillType2 || w(e, { h: 64 }), this.fillType3 = this.fillType3 || w(t, { h: 64 }), this.fillType4 = this.fillType4 || w(e, { h: -64 }), this.fillType5 = this.fillType5 || w(t, { h: -64 }), this.fillType6 = this.fillType6 || w(e, { h: 128 }), this.fillType7 = this.fillType7 || w(t, { h: 128 }), this.pie1 = this.pie1 || e, this.pie2 = this.pie2 || t, this.pie3 = this.pie3 || r, this.pie4 = this.pie4 || w(e, { l: -10 }), this.pie5 = this.pie5 || w(t, { l: -10 }), this.pie6 = this.pie6 || w(r, { l: -10 }), this.pie7 = this.pie7 || w(e, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(e, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(e, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(e, { h: 60, l: -20 }), this.pie11 = this.pie11 || w(e, { h: -60, l: -20 }), this.pie12 = this.pie12 || w(e, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || e, this.quadrant2Fill = this.quadrant2Fill || w(e, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(e, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(e, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || e, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || e, this.git1 = this.git1 || t, this.git2 = this.git2 || r, this.git3 = this.git3 || w(e, { h: -30 }), this.git4 = this.git4 || w(e, { h: -60 }), this.git5 = this.git5 || w(e, { h: -90 }), this.git6 = this.git6 || w(e, { h: 60 }), this.git7 = this.git7 || w(e, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, iC = /* @__PURE__ */ d((e) => {
  const t = new rC();
  return t.calculate(e), t;
}, "getThemeVariables"), sC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = z(this.primaryColor, 16), this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = D(this.background), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.mainBkg = "#2a2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = z(D("#323D47"), 10), this.border1 = "#ccc", this.border2 = Nr(255, 255, 255, 0.25), this.arrowheadColor = D(this.background), this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 3, this.strokeWidth = 1, this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = "arial, sans-serif", this.fontSize = "14px", this.useGradient = !0, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "drop-shadow( 1px 2px 2px rgba(185,185,185,0.2))", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.noteFontWeight = "normal", this.fontWeight = "normal";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.secondBkg = this.secondBkg === "calculated" ? z(this.mainBkg, 16) : this.secondBkg, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || z(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || this.secondBkg, this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 }), this.darkMode)
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 75);
    else
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 25);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleInv" + t] = this["cScaleInv" + t] || D(this["cScale" + t]);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this.darkMode ? this["cScalePeer" + t] = this["cScalePeer" + t] || z(this["cScale" + t], 10) : this["cScalePeer" + t] = this["cScalePeer" + t] || U(this["cScale" + t], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let t = 0; t < 5; t++)
      this["surface" + t] = this["surface" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (5 + t * 3) }), this["surfacePeer" + t] = this["surfacePeer" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (8 + t * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || w(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || w(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || w(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || w(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || w(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || w(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || w(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || w(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || w(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || w(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || w(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || w(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || "#0b0000", this.git1 = this.git1 || "#4d1037", this.git2 = this.git2 || "#3f5258", this.git3 = this.git3 || "#4f2f1b", this.git4 = this.git4 || "#6e0a0a", this.git5 = this.git5 || "#3b0048", this.git6 = this.git6 || "#995a01", this.git7 = this.git7 || "#154706", this.gitDarkMode = !0, this.gitDarkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, oC = /* @__PURE__ */ d((e) => {
  const t = new sC();
  return t.calculate(e), t;
}, "getThemeVariables"), aC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#28253D", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.primaryBorderColor = Ft("#28253D", this.darkMode), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#28253D", this.stateBorder = "#28253D", this.useGradient = !1, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = !0, this.tertiaryColor = "#ffffff", this.clusterBkg = "#F9F9FB", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.actorBorder = "#28253D", this.filterColor = "#000000";
  }
  updateColors() {
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#28253D"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#FEF9C3", this.noteTextColor = this.noteTextColor || "#28253D", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.noteFontWeight = 600, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || (ke(this.background) ? z(this.background, 4) : U(this.background, 4));
    const e = "#ECECFE", t = "#E9E9F1", r = w(e, { h: 180, l: 5 });
    this.sectionBkgColor = this.sectionBkgColor || r, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || t, this.sectionBkgColor2 = this.sectionBkgColor2 || e, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || e, this.activeTaskBorderColor = this.activeTaskBorderColor || e, this.activeTaskBkgColor = this.activeTaskBkgColor || z(e, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.compositeTitleBackground = "#F9F9FB", this.altBackground = "#F9F9FB", this.stateEdgeLabelBackground = "#FFFFFF", this.fontWeight = 600, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor;
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScale" + s] = this.mainBkg;
    if (this.darkMode)
      for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
        this["cScale" + s] = U(this["cScale" + s], 75);
    else
      for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
        this["cScale" + s] = U(this["cScale" + s], 25);
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleInv" + s] = this["cScaleInv" + s] || D(this["cScale" + s]);
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this.darkMode ? this["cScalePeer" + s] = this["cScalePeer" + s] || z(this["cScale" + s], 10) : this["cScalePeer" + s] = this["cScalePeer" + s] || U(this["cScale" + s], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleLabel" + s] = this["cScaleLabel" + s] || this.scaleLabelColor;
    const i = this.darkMode ? -4 : -1;
    for (let s = 0; s < 5; s++)
      this["surface" + s] = this["surface" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (5 + s * 3) }), this["surfacePeer" + s] = this["surfacePeer" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (8 + s * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || e, this.fillType1 = this.fillType1 || t, this.fillType2 = this.fillType2 || w(e, { h: 64 }), this.fillType3 = this.fillType3 || w(t, { h: 64 }), this.fillType4 = this.fillType4 || w(e, { h: -64 }), this.fillType5 = this.fillType5 || w(t, { h: -64 }), this.fillType6 = this.fillType6 || w(e, { h: 128 }), this.fillType7 = this.fillType7 || w(t, { h: 128 }), this.pie1 = this.pie1 || e, this.pie2 = this.pie2 || t, this.pie3 = this.pie3 || r, this.pie4 = this.pie4 || w(e, { l: -10 }), this.pie5 = this.pie5 || w(t, { l: -10 }), this.pie6 = this.pie6 || w(r, { l: -10 }), this.pie7 = this.pie7 || w(e, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(e, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(e, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(e, { h: 60, l: -20 }), this.pie11 = this.pie11 || w(e, { h: -60, l: -20 }), this.pie12 = this.pie12 || w(e, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || e, this.quadrant2Fill = this.quadrant2Fill || w(e, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(e, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(e, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || e, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#FFFFFF", this.git0 = this.git0 || e, this.git1 = this.git1 || t, this.git2 = this.git2 || r, this.git3 = this.git3 || w(e, { h: -30 }), this.git4 = this.git4 || w(e, { h: -60 }), this.git5 = this.git5 || w(e, { h: -90 }), this.git6 = this.git6 || w(e, { h: 60 }), this.git7 = this.git7 || w(e, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.erEdgeLabelBackground = "#FFFFFF", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, nC = /* @__PURE__ */ d((e) => {
  const t = new aC();
  return t.calculate(e), t;
}, "getThemeVariables"), lC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = z(this.primaryColor, 16), this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = D(this.background), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.mainBkg = "#111113", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = z(D("#323D47"), 10), this.border1 = "#ccc", this.border2 = Nr(255, 255, 255, 0.25), this.arrowheadColor = D(this.background), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.labelBackground = "#111113", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.noteBkgColor = this.noteBkgColor ?? "#FEF9C3", this.noteTextColor = this.noteTextColor ?? "#28253D", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#FFFFFF", this.stateBorder = "#FFFFFF", this.useGradient = !1, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = !0, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.clusterBkg = "#1E1A2E", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.filterColor = "#FFFFFF";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#FFFFFF"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#FFFFFF", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.secondBkg = this.secondBkg === "calculated" ? z(this.mainBkg, 16) : this.secondBkg, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = "#FFFFFF", this.signalColor = "#FFFFFF", this.labelBoxBorderColor = "#BDBCCC", this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || z(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || this.secondBkg, this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.compositeBackground = "#16141F", this.altBackground = "#16141F", this.compositeTitleBackground = "#16141F", this.stateEdgeLabelBackground = "#16141F", this.fontWeight = 600, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || w(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || w(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || w(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || w(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || w(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || w(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || w(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || w(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || w(this.primaryColor, { h: 330 }), this.darkMode)
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 75);
    else
      for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
        this["cScale" + t] = U(this["cScale" + t], 25);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleInv" + t] = this["cScaleInv" + t] || D(this["cScale" + t]);
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this.darkMode ? this["cScalePeer" + t] = this["cScalePeer" + t] || z(this["cScale" + t], 10) : this["cScalePeer" + t] = this["cScalePeer" + t] || U(this["cScale" + t], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let t = 0; t < this.THEME_COLOR_LIMIT; t++)
      this["cScaleLabel" + t] = this["cScaleLabel" + t] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let t = 0; t < 5; t++)
      this["surface" + t] = this["surface" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (5 + t * 3) }), this["surfacePeer" + t] = this["surfacePeer" + t] || w(this.mainBkg, { h: 180, s: -15, l: e * (8 + t * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || w(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || w(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || w(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || w(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || w(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || w(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || w(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || w(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || w(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || w(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || w(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || w(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || w(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || w(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || w(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#16141F", this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || w(this.primaryColor, { h: -30 }), this.git4 = this.git4 || w(this.primaryColor, { h: -60 }), this.git5 = this.git5 || w(this.primaryColor, { h: -90 }), this.git6 = this.git6 || w(this.primaryColor, { h: 60 }), this.git7 = this.git7 || w(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.erEdgeLabelBackground = "#16141F", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, hC = /* @__PURE__ */ d((e) => {
  const t = new lC();
  return t.calculate(e), t;
}, "getThemeVariables"), cC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#ffffff", this.primaryColor = "#cccccc", this.mainBkg = "#ffffff", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#28253D", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.primaryBorderColor = Ft("#28253D", this.darkMode), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#28253D", this.stateBorder = "#28253D", this.useGradient = !1, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = !0, this.tertiaryColor = "#ffffff", this.clusterBkg = "#F9F9FB", this.clusterBorder = "#BDBCCC", this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.actorBorder = "#28253D", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.borderColorArray = [
      "#E879F9",
      //Fuchsia-400
      "#2DD4BF",
      //Teal-400
      "#FB923C",
      //Orange-400
      "#22D3EE",
      // Cyan-400
      "#4ADE80",
      // Green-400
      "#A78BFA",
      //Violet-400
      "#F87171",
      //red-400
      "#FACC15",
      //yellow-400
      "#818CF8",
      //indigo-400
      "#A3E635 ",
      //Lime-400
      "#38BDF8",
      //Sky-400
      "#FB7185"
      //Rose-400
    ], this.bkgColorArray = [
      "#FDF4FF",
      //Fuchsia-50
      "#F0FDFA",
      //Teal-50
      "#FFF7ED",
      //Orange-50
      "#ECFEFF",
      // Cyan-50
      "#F0FDF4",
      // Green-50
      "#F5F3FF",
      //Violet-50
      "#FEF2F2",
      //red-50
      "#FEFCE8",
      //yellow-50
      "#EEF2FF",
      //indigo-50
      "#F7FEE7",
      //Lime-50
      "#F0F9FF",
      //Sky-50
      "#FFF1F2"
      //Rose-50
    ], this.usecaseActorBorder = "#A78BFA", this.usecaseActorBkg = "#F5F3FF", this.usecaseBorder = "#2DD4BF", this.usecaseBkg = "#F0FDFA", this.usecaseBoundaryBorder = "#BDBCCC", this.usecaseBoundaryBkg = "#FAFAFC", this.usecaseIncludeLine = "#38BDF8", this.usecaseExtendLine = "#FB923C", this.filterColor = "#000000";
  }
  updateColors() {
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#28253D"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#28253D", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || (ke(this.background) ? z(this.background, 4) : U(this.background, 4));
    const e = "#ECECFE", t = "#E9E9F1", r = w(e, { h: 180, l: 5 });
    this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || e, this.activeTaskBorderColor = this.activeTaskBorderColor || e, this.activeTaskBkgColor = this.activeTaskBkgColor || z(e, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateEdgeLabelBackground = this.stateEdgeLabelBackground || "#FFFFFF", this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#F9F9FB", this.compositeTitleBackground = this.compositeTitleBackground || "#F9F9FB", this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || "#f4a8ff", this.cScale1 = this.cScale1 || "#46ecd5", this.cScale2 = this.cScale2 || "#ffb86a", this.cScale3 = this.cScale3 || "#dab2ff", this.cScale4 = this.cScale4 || "#7bf1a8", this.cScale5 = this.cScale5 || "#c4b4ff", this.cScale6 = this.cScale6 || "#ffa2a2", this.cScale7 = this.cScale7 || "#ffdf20", this.cScale8 = this.cScale8 || "#a3b3ff", this.cScale9 = this.cScale9 || "#bbf451", this.cScale10 = this.cScale10 || "#74d4ff", this.cScale11 = this.cScale11 || "#ffa1ad", this.sectionBkgColor = this.sectionBkgColor || this.cScale0, this.sectionBkgColor2 = this.sectionBkgColor2 || this.cScale1, this.altSectionBkgColor = this.altSectionBkgColor || "white";
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleInv" + s] = this["cScaleInv" + s] || D(this["cScale" + s]);
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this.darkMode ? this["cScalePeer" + s] = this["cScalePeer" + s] || z(this["cScale" + s], 10) : this["cScalePeer" + s] = this["cScalePeer" + s] || U(this["cScale" + s], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["cScaleLabel" + s] = this["cScaleLabel" + s] || this.scaleLabelColor;
    const i = this.darkMode ? -4 : -1;
    for (let s = 0; s < 5; s++)
      this["surface" + s] = this["surface" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (5 + s * 3) }), this["surfacePeer" + s] = this["surfacePeer" + s] || w(this.mainBkg, { h: 180, s: -15, l: i * (8 + s * 3) });
    this.classText = this.classText || this.textColor;
    for (let s = 0; s < 8; s++)
      this["fillType" + s] = this["fillType" + s] || this.bkgColorArray[s];
    for (let s = 0; s < this.THEME_COLOR_LIMIT; s++)
      this["pie" + (s + 1)] = this["pie" + (s + 1)] || this["cScale" + s];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let s = 0; s < 8; s++)
      this["venn" + (s + 1)] = this["venn" + (s + 1)] ?? this.borderColorArray[s % this.borderColorArray.length];
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || e, this.quadrant2Fill = this.quadrant2Fill || w(e, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(e, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(e, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || e, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#FFFFFF", this.git0 = this.git0 || e, this.git1 = this.git1 || t, this.git2 = this.git2 || r, this.git3 = this.git3 || w(e, { h: -30 }), this.git4 = this.git4 || w(e, { h: -60 }), this.git5 = this.git5 || w(e, { h: -90 }), this.git6 = this.git6 || w(e, { h: 60 }), this.git7 = this.git7 || w(e, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.fontWeight = 600, this.erEdgeLabelBackground = "#FFFFFF", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, uC = /* @__PURE__ */ d((e) => {
  const t = new cC();
  return t.calculate(e), t;
}, "getThemeVariables"), dC = class {
  static {
    d(this, "Theme");
  }
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = z(this.primaryColor, 16), this.tertiaryColor = w(this.primaryColor, { h: -160 }), this.primaryBorderColor = D(this.background), this.secondaryBorderColor = Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = Ft(this.tertiaryColor, this.darkMode), this.primaryTextColor = D(this.primaryColor), this.secondaryTextColor = D(this.secondaryColor), this.tertiaryTextColor = D(this.tertiaryColor), this.mainBkg = "#111113", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = z(D("#323D47"), 10), this.border1 = "#ccc", this.border2 = Nr(255, 255, 255, 0.25), this.arrowheadColor = D(this.background), this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.labelBackground = "#111113", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.radius = 12, this.strokeWidth = 2, this.noteBkgColor = this.noteBkgColor ?? "#FEF9C3", this.noteTextColor = this.noteTextColor ?? "#28253D", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"Recursive Variable", arial, sans-serif', this.fontSize = "14px", this.nodeBorder = "#FFFFFF", this.stateBorder = "#FFFFFF", this.useGradient = !1, this.gradientStart = "#0042eb", this.gradientStop = "#eb0042", this.dropShadow = "url(#drop-shadow)", this.nodeShadow = !0, this.archEdgeColor = "calculated", this.archEdgeArrowColor = "calculated", this.archEdgeWidth = "3", this.archGroupBorderColor = this.primaryBorderColor, this.archGroupBorderWidth = "2px", this.clusterBkg = "#1E1A2E", this.clusterBorder = "#BDBCCC", this.noteBorderColor = "#FACC15", this.noteFontWeight = 600, this.borderColorArray = [
      "#E879F9",
      //Fuchsia-400
      "#2DD4BF",
      //Teal-400
      "#FB923C",
      //Orange-400
      "#22D3EE",
      // Cyan-400
      "#4ADE80",
      // Green-400
      "#A78BFA",
      //Violet-400
      "#F87171",
      //red-400
      "#FACC15",
      //yellow-400
      "#818CF8",
      //indigo-400
      "#A3E635 ",
      //Lime-400
      "#38BDF8",
      //Sky-400
      "#FB7185"
      //Rose-400
    ], this.bkgColorArray = [], this.usecaseActorBorder = "#A78BFA", this.usecaseBorder = "#2DD4BF", this.usecaseBoundaryBorder = "#BDBCCC", this.usecaseIncludeLine = "#38BDF8", this.usecaseExtendLine = "#FB923C", this.filterColor = "#FFFFFF";
  }
  updateColors() {
    this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#FFFFFF"), this.secondaryColor = this.secondaryColor || w(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || w(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || Ft(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || Ft(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || Ft(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || Ft(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#FFFFFF", this.secondaryTextColor = this.secondaryTextColor || D(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || D(this.tertiaryColor), this.lineColor = this.lineColor || D(this.background), this.arrowheadColor = this.arrowheadColor || D(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.secondBkg = this.secondBkg === "calculated" ? z(this.mainBkg, 16) : this.secondBkg, this.nodeBorder = this.nodeBorder || this.border1, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.flowContainerStroke = this.flowContainerStroke || this.secondaryBorderColor, this.actorBorder = "#FFFFFF", this.signalColor = "#FFFFFF", this.labelBoxBorderColor = "#BDBCCC", this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || this.actorBorder, this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || U(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || D(this.lineColor), this.rectBkgColor = this.rectBkgColor || this.tertiaryColor, this.rootLabelColor = "#FFFFFF", this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || z(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || this.secondBkg, this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.vertLineColor = this.vertLineColor || this.primaryBorderColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.archEdgeColor = this.lineColor, this.archEdgeArrowColor = this.lineColor, this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateEdgeLabelBackground = this.stateEdgeLabelBackground || "#16141F", this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || "#16141F", this.altBackground = this.altBackground || "#16141F", this.compositeTitleBackground = this.compositeTitleBackground || "#16141F", this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || "#f4a8ff", this.cScale1 = this.cScale1 || "#46ecd5", this.cScale2 = this.cScale2 || "#ffb86a", this.cScale3 = this.cScale3 || "#dab2ff", this.cScale4 = this.cScale4 || "#7bf1a8", this.cScale5 = this.cScale5 || "#c4b4ff", this.cScale6 = this.cScale6 || "#ffa2a2", this.cScale7 = this.cScale7 || "#ffdf20", this.cScale8 = this.cScale8 || "#a3b3ff", this.cScale9 = this.cScale9 || "#bbf451", this.cScale10 = this.cScale10 || "#74d4ff", this.cScale11 = this.cScale11 || "#ffa1ad", this.sectionBkgColor = this.sectionBkgColor || this.cScale0, this.sectionBkgColor2 = this.sectionBkgColor2 || this.cScale1, this.altSectionBkgColor = this.altSectionBkgColor || this.background;
    for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
      this["cScaleInv" + r] = this["cScaleInv" + r] || D(this["cScale" + r]);
    for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
      this.darkMode ? this["cScalePeer" + r] = this["cScalePeer" + r] || z(this["cScale" + r], 10) : this["cScalePeer" + r] = this["cScalePeer" + r] || U(this["cScale" + r], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
      this["cScaleLabel" + r] = U(this["cScale" + r], 75);
    const e = this.darkMode ? -4 : -1;
    for (let r = 0; r < 5; r++)
      this["surface" + r] = this["surface" + r] || w(this.mainBkg, { h: 180, s: -15, l: e * (5 + r * 3) }), this["surfacePeer" + r] = this["surfacePeer" + r] || w(this.mainBkg, { h: 180, s: -15, l: e * (8 + r * 3) });
    this.classText = this.classText || this.textColor, [
      "#701a75",
      // Fuchsia-900
      "#134e4a",
      // Teal-900
      "#7c2d12",
      // Orange-900
      "#581c87",
      // Purple-900
      "#14532d",
      // Green-900
      "#4c1d95",
      // Violet-900
      "#7f1d1d",
      // Red-900
      "#713f12"
      // Yellow-900
    ].forEach((r, i) => {
      this["fillType" + i] = this["fillType" + i] || r;
    });
    for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
      this["pie" + (r + 1)] = this["pie" + (r + 1)] || this["cScale" + r];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || "#28253D", this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7";
    for (let r = 0; r < 8; r++)
      this["venn" + (r + 1)] = this["venn" + (r + 1)] ?? this.borderColorArray[r % this.borderColorArray.length];
    this.vennTitleTextColor = this.vennTitleTextColor ?? this.titleColor, this.vennSetTextColor = this.vennSetTextColor ?? this.textColor, this.quadrant1Fill = this.quadrant1Fill || this.primaryColor, this.quadrant2Fill = this.quadrant2Fill || w(this.primaryColor, { r: 5, g: 5, b: 5 }), this.quadrant3Fill = this.quadrant3Fill || w(this.primaryColor, { r: 10, g: 10, b: 10 }), this.quadrant4Fill = this.quadrant4Fill || w(this.primaryColor, { r: 15, g: 15, b: 15 }), this.quadrant1TextFill = this.quadrant1TextFill || this.primaryTextColor, this.quadrant2TextFill = this.quadrant2TextFill || w(this.primaryTextColor, { r: -5, g: -5, b: -5 }), this.quadrant3TextFill = this.quadrant3TextFill || w(this.primaryTextColor, { r: -10, g: -10, b: -10 }), this.quadrant4TextFill = this.quadrant4TextFill || w(this.primaryTextColor, { r: -15, g: -15, b: -15 }), this.quadrantPointFill = this.quadrantPointFill || ke(this.quadrant1Fill) ? z(this.quadrant1Fill) : U(this.quadrant1Fill), this.quadrantPointTextFill = this.quadrantPointTextFill || this.primaryTextColor, this.quadrantXAxisTextFill = this.quadrantXAxisTextFill || this.primaryTextColor, this.quadrantYAxisTextFill = this.quadrantYAxisTextFill || this.primaryTextColor, this.quadrantInternalBorderStrokeFill = this.quadrantInternalBorderStrokeFill || this.primaryBorderColor, this.quadrantExternalBorderStrokeFill = this.quadrantExternalBorderStrokeFill || this.primaryBorderColor, this.quadrantTitleFill = this.quadrantTitleFill || this.primaryTextColor, this.xyChart = {
      backgroundColor: this.xyChart?.backgroundColor || this.background,
      titleColor: this.xyChart?.titleColor || this.primaryTextColor,
      legendTextColor: this.xyChart?.legendTextColor || this.primaryTextColor,
      xAxisTitleColor: this.xyChart?.xAxisTitleColor || this.primaryTextColor,
      xAxisLabelColor: this.xyChart?.xAxisLabelColor || this.primaryTextColor,
      xAxisTickColor: this.xyChart?.xAxisTickColor || this.primaryTextColor,
      xAxisLineColor: this.xyChart?.xAxisLineColor || this.primaryTextColor,
      yAxisTitleColor: this.xyChart?.yAxisTitleColor || this.primaryTextColor,
      yAxisLabelColor: this.xyChart?.yAxisLabelColor || this.primaryTextColor,
      yAxisTickColor: this.xyChart?.yAxisTickColor || this.primaryTextColor,
      yAxisLineColor: this.xyChart?.yAxisLineColor || this.primaryTextColor,
      plotColorPalette: this.xyChart?.plotColorPalette || "#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"
    }, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? U(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.requirementEdgeLabelBackground = "#16141F", this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || w(this.primaryColor, { h: -30 }), this.git4 = this.git4 || w(this.primaryColor, { h: -60 }), this.git5 = this.git5 || w(this.primaryColor, { h: -90 }), this.git6 = this.git6 || w(this.primaryColor, { h: 60 }), this.git7 = this.git7 || w(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = z(this.git0, 25), this.git1 = z(this.git1, 25), this.git2 = z(this.git2, 25), this.git3 = z(this.git3, 25), this.git4 = z(this.git4, 25), this.git5 = z(this.git5, 25), this.git6 = z(this.git6, 25), this.git7 = z(this.git7, 25)) : (this.git0 = U(this.git0, 25), this.git1 = U(this.git1, 25), this.git2 = U(this.git2, 25), this.git3 = U(this.git3, 25), this.git4 = U(this.git4, 25), this.git5 = U(this.git5, 25), this.git6 = U(this.git6, 25), this.git7 = U(this.git7, 25)), this.gitInv0 = this.gitInv0 || D(this.git0), this.gitInv1 = this.gitInv1 || D(this.git1), this.gitInv2 = this.gitInv2 || D(this.git2), this.gitInv3 = this.gitInv3 || D(this.git3), this.gitInv4 = this.gitInv4 || D(this.git4), this.gitInv5 = this.gitInv5 || D(this.git5), this.gitInv6 = this.gitInv6 || D(this.git6), this.gitInv7 = this.gitInv7 || D(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.commitLineColor = this.commitLineColor ?? "#BDBCCC", this.fontWeight = 600, this.erEdgeLabelBackground = "#16141F", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || sr, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || or;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const t = Object.keys(e);
    t.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), t.forEach((r) => {
      this[r] = je(this[r], e[r]);
    });
  }
}, fC = /* @__PURE__ */ d((e) => {
  const t = new dC();
  return t.calculate(e), t;
}, "getThemeVariables"), kr = {
  base: {
    getThemeVariables: Gx
  },
  dark: {
    getThemeVariables: Vx
  },
  default: {
    getThemeVariables: Kx
  },
  forest: {
    getThemeVariables: Jx
  },
  neutral: {
    getThemeVariables: eC
  },
  neo: {
    getThemeVariables: iC
  },
  "neo-dark": {
    getThemeVariables: oC
  },
  redux: {
    getThemeVariables: nC
  },
  "redux-dark": {
    getThemeVariables: hC
  },
  "redux-color": {
    getThemeVariables: uC
  },
  "redux-dark-color": {
    getThemeVariables: fC
  }
}, Kt = {
  flowchart: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    titleTopMargin: 25,
    subGraphTitleMargin: {
      top: 0,
      bottom: 0
    },
    diagramPadding: 8,
    htmlLabels: null,
    nodeSpacing: 50,
    rankSpacing: 50,
    curve: "basis",
    padding: 15,
    wrappingWidth: 120,
    minNodeWidth: 120,
    stepDuration: 1,
    stepNumbers: !1,
    inheritDir: !1
  },
  swimlane: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    layout: "swimlane",
    lineHops: "arc",
    ignoreCrossLaneEdges: !0,
    optimizeRanksByCrossings: !0,
    automaticLaneOrdering: !1
  },
  agentflow: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    titleTopMargin: 25,
    diagramPadding: 8,
    nodeSpacing: 50,
    rankSpacing: 50,
    wrappingWidth: 120,
    minNodeWidth: 120
  },
  sequence: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    hideUnusedParticipants: !1,
    activationWidth: 10,
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    mirrorActors: !0,
    forceMenus: !1,
    bottomMarginAdj: 1,
    rightAngles: !1,
    showSequenceNumbers: !1,
    actorFontSize: 14,
    actorFontFamily: '"Open Sans", sans-serif',
    actorFontWeight: 400,
    noteFontSize: 14,
    noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    noteFontWeight: 400,
    noteAlign: "center",
    messageFontSize: 16,
    messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    messageFontWeight: 400,
    wrap: !1,
    wrapPadding: 10,
    labelBoxWidth: 50,
    labelBoxHeight: 20
  },
  gantt: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    rightPadding: 75,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    sectionFontSize: 11,
    numberSectionStyles: 4,
    axisFormat: "%Y-%m-%d",
    topAxis: !1,
    displayMode: "",
    weekday: "sunday"
  },
  journey: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    maxLabelWidth: 360,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ],
    titleColor: "",
    titleFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    titleFontSize: "4ex"
  },
  class: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    titleTopMargin: 25,
    arrowMarkerAbsolute: !1,
    dividerMargin: 10,
    padding: 5,
    textHeight: 10,
    htmlLabels: !1,
    hideEmptyMembersBox: !1,
    hierarchicalNamespaces: !0
  },
  state: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    layout: "elk",
    wrappingWidth: 120,
    minNodeWidth: 120,
    titleTopMargin: 25,
    dividerMargin: 10,
    sizeUnit: 5,
    padding: 8,
    textHeight: 10,
    titleShift: -15,
    noteMargin: 10,
    forkWidth: 70,
    forkHeight: 7,
    miniPadding: 2,
    fontSizeFactor: 5.02,
    fontSize: 24,
    labelHeight: 16,
    edgeLengthFactor: "20",
    compositTitleSize: 35,
    radius: 5
  },
  er: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    titleTopMargin: 25,
    diagramPadding: 20,
    layoutDirection: "TB",
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    nodeSpacing: 140,
    rankSpacing: 80,
    stroke: "gray",
    fill: "honeydew",
    fontSize: 12
  },
  pie: {
    useMaxWidth: !0,
    textPosition: 0.75,
    donutHole: 0,
    legendPosition: "right",
    highlightSlice: ""
  },
  quadrantChart: {
    useMaxWidth: !0,
    chartWidth: 500,
    chartHeight: 500,
    titleFontSize: 20,
    titlePadding: 10,
    quadrantPadding: 5,
    xAxisLabelPadding: 5,
    yAxisLabelPadding: 5,
    xAxisLabelFontSize: 16,
    yAxisLabelFontSize: 16,
    quadrantLabelFontSize: 16,
    quadrantTextTopPadding: 5,
    pointTextPadding: 5,
    pointLabelFontSize: 12,
    pointRadius: 5,
    xAxisPosition: "top",
    yAxisPosition: "left",
    quadrantInternalBorderStrokeWidth: 1,
    quadrantExternalBorderStrokeWidth: 2
  },
  xyChart: {
    useMaxWidth: !0,
    width: 700,
    height: 500,
    titleFontSize: 20,
    titlePadding: 10,
    showDataLabel: !1,
    showDataLabelOutsideBar: !1,
    showTitle: !0,
    showLegend: !0,
    legendFontSize: 14,
    legendPadding: 10,
    xAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2,
      labelRotation: 0
    },
    yAxis: {
      $ref: "#/$defs/XYChartAxisConfig",
      showLabel: !0,
      labelFontSize: 14,
      labelPadding: 5,
      showTitle: !0,
      titleFontSize: 16,
      titlePadding: 5,
      showTick: !0,
      tickLength: 5,
      tickWidth: 2,
      showAxisLine: !0,
      axisLineWidth: 2,
      labelRotation: 0
    },
    chartOrientation: "vertical",
    plotReservedSpacePercent: 50
  },
  requirement: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    rect_fill: "#f9f9f9",
    text_color: "#333",
    rect_border_size: "0.5px",
    rect_border_color: "#bbb",
    rect_min_width: 200,
    rect_min_height: 200,
    fontSize: 14,
    rect_padding: 10,
    line_height: 20
  },
  mindmap: {
    useMaxWidth: !0,
    colorBy: "branch",
    padding: 10,
    maxNodeWidth: 200,
    layoutAlgorithm: "cose-bilkent"
  },
  ishikawa: {
    useMaxWidth: !0,
    diagramPadding: 20
  },
  kanban: {
    useMaxWidth: !0,
    padding: 8,
    sectionWidth: 200,
    ticketBaseUrl: ""
  },
  timeline: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    leftMargin: 150,
    width: 150,
    height: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    messageAlign: "center",
    bottomMarginAdj: 1,
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    activationWidth: 10,
    textPlacement: "fo",
    actorColours: [
      "#8FBC8F",
      "#7CFC00",
      "#00FFFF",
      "#20B2AA",
      "#B0E0E6",
      "#FFFFE0"
    ],
    sectionFills: [
      "#191970",
      "#8B008B",
      "#4B0082",
      "#2F4F4F",
      "#800000",
      "#8B4513",
      "#00008B"
    ],
    sectionColours: [
      "#fff"
    ],
    disableMulticolor: !1
  },
  gitGraph: {
    useMaxWidth: !0,
    titleTopMargin: 25,
    diagramPadding: 8,
    nodeLabel: {
      width: 75,
      height: 100,
      x: -25,
      y: 0
    },
    mainBranchName: "main",
    mainBranchOrder: 0,
    showCommitLabel: !0,
    showBranches: !0,
    rotateCommitLabel: !0,
    parallelCommits: !1,
    arrowMarkerAbsolute: !1
  },
  c4: {
    useMaxWidth: !0,
    diagramMarginX: 50,
    diagramMarginY: 10,
    c4ShapeMargin: 50,
    c4ShapePadding: 20,
    width: 216,
    height: 60,
    boxMargin: 10,
    c4ShapeInRow: 4,
    nextLinePaddingX: 0,
    c4BoundaryInRow: 2,
    personFontSize: 14,
    personFontFamily: '"Open Sans", sans-serif',
    personFontWeight: "normal",
    external_personFontSize: 14,
    external_personFontFamily: '"Open Sans", sans-serif',
    external_personFontWeight: "normal",
    systemFontSize: 14,
    systemFontFamily: '"Open Sans", sans-serif',
    systemFontWeight: "normal",
    external_systemFontSize: 14,
    external_systemFontFamily: '"Open Sans", sans-serif',
    external_systemFontWeight: "normal",
    system_dbFontSize: 14,
    system_dbFontFamily: '"Open Sans", sans-serif',
    system_dbFontWeight: "normal",
    external_system_dbFontSize: 14,
    external_system_dbFontFamily: '"Open Sans", sans-serif',
    external_system_dbFontWeight: "normal",
    system_queueFontSize: 14,
    system_queueFontFamily: '"Open Sans", sans-serif',
    system_queueFontWeight: "normal",
    external_system_queueFontSize: 14,
    external_system_queueFontFamily: '"Open Sans", sans-serif',
    external_system_queueFontWeight: "normal",
    boundaryFontSize: 14,
    boundaryFontFamily: '"Open Sans", sans-serif',
    boundaryFontWeight: "normal",
    messageFontSize: 12,
    messageFontFamily: '"Open Sans", sans-serif',
    messageFontWeight: "normal",
    containerFontSize: 14,
    containerFontFamily: '"Open Sans", sans-serif',
    containerFontWeight: "normal",
    external_containerFontSize: 14,
    external_containerFontFamily: '"Open Sans", sans-serif',
    external_containerFontWeight: "normal",
    container_dbFontSize: 14,
    container_dbFontFamily: '"Open Sans", sans-serif',
    container_dbFontWeight: "normal",
    external_container_dbFontSize: 14,
    external_container_dbFontFamily: '"Open Sans", sans-serif',
    external_container_dbFontWeight: "normal",
    container_queueFontSize: 14,
    container_queueFontFamily: '"Open Sans", sans-serif',
    container_queueFontWeight: "normal",
    external_container_queueFontSize: 14,
    external_container_queueFontFamily: '"Open Sans", sans-serif',
    external_container_queueFontWeight: "normal",
    componentFontSize: 14,
    componentFontFamily: '"Open Sans", sans-serif',
    componentFontWeight: "normal",
    external_componentFontSize: 14,
    external_componentFontFamily: '"Open Sans", sans-serif',
    external_componentFontWeight: "normal",
    component_dbFontSize: 14,
    component_dbFontFamily: '"Open Sans", sans-serif',
    component_dbFontWeight: "normal",
    external_component_dbFontSize: 14,
    external_component_dbFontFamily: '"Open Sans", sans-serif',
    external_component_dbFontWeight: "normal",
    component_queueFontSize: 14,
    component_queueFontFamily: '"Open Sans", sans-serif',
    component_queueFontWeight: "normal",
    external_component_queueFontSize: 14,
    external_component_queueFontFamily: '"Open Sans", sans-serif',
    external_component_queueFontWeight: "normal",
    wrap: !0,
    wrapPadding: 10,
    person_bg_color: "#08427B",
    person_border_color: "#073B6F",
    external_person_bg_color: "#686868",
    external_person_border_color: "#8A8A8A",
    system_bg_color: "#1168BD",
    system_border_color: "#3C7FC0",
    system_db_bg_color: "#1168BD",
    system_db_border_color: "#3C7FC0",
    system_queue_bg_color: "#1168BD",
    system_queue_border_color: "#3C7FC0",
    external_system_bg_color: "#999999",
    external_system_border_color: "#8A8A8A",
    external_system_db_bg_color: "#999999",
    external_system_db_border_color: "#8A8A8A",
    external_system_queue_bg_color: "#999999",
    external_system_queue_border_color: "#8A8A8A",
    container_bg_color: "#438DD5",
    container_border_color: "#3C7FC0",
    container_db_bg_color: "#438DD5",
    container_db_border_color: "#3C7FC0",
    container_queue_bg_color: "#438DD5",
    container_queue_border_color: "#3C7FC0",
    external_container_bg_color: "#B3B3B3",
    external_container_border_color: "#A6A6A6",
    external_container_db_bg_color: "#B3B3B3",
    external_container_db_border_color: "#A6A6A6",
    external_container_queue_bg_color: "#B3B3B3",
    external_container_queue_border_color: "#A6A6A6",
    component_bg_color: "#85BBF0",
    component_border_color: "#78A8D8",
    component_db_bg_color: "#85BBF0",
    component_db_border_color: "#78A8D8",
    component_queue_bg_color: "#85BBF0",
    component_queue_border_color: "#78A8D8",
    external_component_bg_color: "#CCCCCC",
    external_component_border_color: "#BFBFBF",
    external_component_db_bg_color: "#CCCCCC",
    external_component_db_border_color: "#BFBFBF",
    external_component_queue_bg_color: "#CCCCCC",
    external_component_queue_border_color: "#BFBFBF"
  },
  sankey: {
    useMaxWidth: !0,
    width: 600,
    height: 400,
    linkColor: "gradient",
    nodeAlignment: "justify",
    showValues: !0,
    prefix: "",
    suffix: "",
    nodeWidth: 10,
    nodePadding: 12,
    labelStyle: "legacy"
  },
  block: {
    useMaxWidth: !0,
    padding: 8
  },
  packet: {
    useMaxWidth: !0,
    rowHeight: 32,
    bitWidth: 32,
    bitsPerRow: 32,
    showBits: !0,
    bitOrder: "ascending",
    paddingX: 5,
    paddingY: 5
  },
  treeView: {
    useMaxWidth: !0,
    rowIndent: 10,
    paddingX: 5,
    paddingY: 5,
    lineThickness: 1,
    showIcons: !1,
    defaultIconPack: "",
    filenameIcons: {},
    extensionIcons: {}
  },
  architecture: {
    useMaxWidth: !0,
    padding: 40,
    iconSize: 80,
    fontSize: 16,
    randomize: !1,
    nodeSeparation: 75,
    idealEdgeLengthMultiplier: 1.5,
    edgeElasticity: 0.45,
    numIter: 2500,
    seed: 1
  },
  eventmodeling: {
    useMaxWidth: !0,
    padding: 30,
    rowHeight: 32
  },
  radar: {
    useMaxWidth: !0,
    width: 600,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
    axisScaleFactor: 1,
    axisLabelFactor: 1.05,
    curveTension: 0.17
  },
  usecase: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    wrappingWidth: 120,
    minNodeWidth: 120,
    actorFontSize: 14,
    actorFontFamily: '"Open Sans", sans-serif',
    actorFontWeight: "normal",
    usecaseFontSize: 12,
    usecaseFontFamily: '"Open Sans", sans-serif',
    usecaseFontWeight: "normal",
    nodeSpacing: 50,
    rankSpacing: 50,
    diagramPadding: 20,
    colorScheme: "role"
  },
  venn: {
    useMaxWidth: !0,
    theme: "redux-color",
    look: "neo",
    width: 800,
    height: 450,
    padding: 8,
    useDebugLayout: !1
  },
  cynefin: {
    useMaxWidth: !0,
    width: 800,
    height: 600,
    padding: 40,
    showDomainDescriptions: !0,
    boundaryAmplitude: 8,
    seed: 0
  },
  theme: "default",
  look: "classic",
  handDrawnSeed: 0,
  layout: "elk",
  maxTextSize: 5e4,
  maxEdges: 500,
  darkMode: !1,
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
  logLevel: 5,
  securityLevel: "strict",
  startOnLoad: !0,
  arrowMarkerAbsolute: !1,
  secure: [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "suppressErrorRendering",
    "maxEdges"
  ],
  legacyMathML: !1,
  forceLegacyMathML: !1,
  deterministicIds: !1,
  fontSize: 16,
  markdownAutoWrap: !0,
  suppressErrorRendering: !1
}, Ud = {
  ...Kt,
  // Set, even though they're `undefined` so that `configKeys` finds these keys
  // TODO: Should we replace these with `null` so that they can go in the JSON Schema?
  deterministicIDSeed: void 0,
  elk: {
    // mergeEdges is needed here to be considered
    mergeEdges: !1,
    straightenEdges: !0,
    lineHops: !0,
    preset: "default",
    // Left undefined so `??` can tell "the user chose this" from "nobody did",
    // which is what lets `elk.preset` supply a value while an explicit setting
    // still wins. Listed rather than omitted so `configKeys` still finds them.
    nodePlacementStrategy: void 0,
    layeringStrategy: void 0,
    cycleBreakingStrategy: void 0,
    layeringLayerBound: 4,
    nodePlacementAlignment: void 0,
    forceNodeModelOrder: !1,
    considerModelOrder: "NODES_AND_EDGES",
    keepEntryNodeOnTop: !1,
    orientFeedbackEdges: !0
  },
  themeCSS: void 0,
  // add non-JSON default config values
  themeVariables: kr.default.getThemeVariables(),
  sequence: {
    ...Kt.sequence,
    messageFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont"),
    noteFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.noteFontFamily,
        fontSize: this.noteFontSize,
        fontWeight: this.noteFontWeight
      };
    }, "noteFont"),
    actorFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.actorFontFamily,
        fontSize: this.actorFontSize,
        fontWeight: this.actorFontWeight
      };
    }, "actorFont")
  },
  class: {
    // Built from scratch rather than spread from the schema, so the appearance defaults
    // have to be carried across by hand; the rest stay off, `padding` above all — the
    // schema default of 5 would change class node dimensions on the unified renderer.
    // Optional chaining: the docs scripts short-circuit `.schema.yaml` to `{}`.
    theme: Kt.class?.theme,
    look: Kt.class?.look,
    layout: Kt.class?.layout,
    hideEmptyMembersBox: !1,
    hierarchicalNamespaces: !0
  },
  gantt: {
    ...Kt.gantt,
    tickInterval: void 0,
    useWidth: void 0
    // can probably be removed since `configKeys` already includes this
  },
  c4: {
    ...Kt.c4,
    useWidth: void 0,
    personFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.personFontFamily,
        fontSize: this.personFontSize,
        fontWeight: this.personFontWeight
      };
    }, "personFont"),
    flowchart: {
      ...Kt.flowchart,
      inheritDir: !1
      // default to legacy behavior
    },
    external_personFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_personFontFamily,
        fontSize: this.external_personFontSize,
        fontWeight: this.external_personFontWeight
      };
    }, "external_personFont"),
    systemFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.systemFontFamily,
        fontSize: this.systemFontSize,
        fontWeight: this.systemFontWeight
      };
    }, "systemFont"),
    external_systemFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_systemFontFamily,
        fontSize: this.external_systemFontSize,
        fontWeight: this.external_systemFontWeight
      };
    }, "external_systemFont"),
    system_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.system_dbFontFamily,
        fontSize: this.system_dbFontSize,
        fontWeight: this.system_dbFontWeight
      };
    }, "system_dbFont"),
    external_system_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_system_dbFontFamily,
        fontSize: this.external_system_dbFontSize,
        fontWeight: this.external_system_dbFontWeight
      };
    }, "external_system_dbFont"),
    system_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.system_queueFontFamily,
        fontSize: this.system_queueFontSize,
        fontWeight: this.system_queueFontWeight
      };
    }, "system_queueFont"),
    external_system_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_system_queueFontFamily,
        fontSize: this.external_system_queueFontSize,
        fontWeight: this.external_system_queueFontWeight
      };
    }, "external_system_queueFont"),
    containerFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.containerFontFamily,
        fontSize: this.containerFontSize,
        fontWeight: this.containerFontWeight
      };
    }, "containerFont"),
    external_containerFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_containerFontFamily,
        fontSize: this.external_containerFontSize,
        fontWeight: this.external_containerFontWeight
      };
    }, "external_containerFont"),
    container_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.container_dbFontFamily,
        fontSize: this.container_dbFontSize,
        fontWeight: this.container_dbFontWeight
      };
    }, "container_dbFont"),
    external_container_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_container_dbFontFamily,
        fontSize: this.external_container_dbFontSize,
        fontWeight: this.external_container_dbFontWeight
      };
    }, "external_container_dbFont"),
    container_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.container_queueFontFamily,
        fontSize: this.container_queueFontSize,
        fontWeight: this.container_queueFontWeight
      };
    }, "container_queueFont"),
    external_container_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_container_queueFontFamily,
        fontSize: this.external_container_queueFontSize,
        fontWeight: this.external_container_queueFontWeight
      };
    }, "external_container_queueFont"),
    componentFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.componentFontFamily,
        fontSize: this.componentFontSize,
        fontWeight: this.componentFontWeight
      };
    }, "componentFont"),
    external_componentFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_componentFontFamily,
        fontSize: this.external_componentFontSize,
        fontWeight: this.external_componentFontWeight
      };
    }, "external_componentFont"),
    component_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.component_dbFontFamily,
        fontSize: this.component_dbFontSize,
        fontWeight: this.component_dbFontWeight
      };
    }, "component_dbFont"),
    external_component_dbFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_component_dbFontFamily,
        fontSize: this.external_component_dbFontSize,
        fontWeight: this.external_component_dbFontWeight
      };
    }, "external_component_dbFont"),
    component_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.component_queueFontFamily,
        fontSize: this.component_queueFontSize,
        fontWeight: this.component_queueFontWeight
      };
    }, "component_queueFont"),
    external_component_queueFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.external_component_queueFontFamily,
        fontSize: this.external_component_queueFontSize,
        fontWeight: this.external_component_queueFontWeight
      };
    }, "external_component_queueFont"),
    boundaryFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.boundaryFontFamily,
        fontSize: this.boundaryFontSize,
        fontWeight: this.boundaryFontWeight
      };
    }, "boundaryFont"),
    messageFont: /* @__PURE__ */ d(function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    }, "messageFont")
  },
  pie: {
    ...Kt.pie,
    useWidth: 984
  },
  xyChart: {
    ...Kt.xyChart,
    useWidth: void 0
  },
  requirement: {
    ...Kt.requirement,
    useWidth: void 0
  },
  packet: {
    ...Kt.packet
  },
  eventmodeling: {
    ...Kt.eventmodeling
  },
  treeView: {
    ...Kt.treeView,
    useWidth: void 0
  },
  radar: {
    ...Kt.radar
  },
  usecase: {
    ...Kt.usecase
  },
  railroad: {
    ...Kt.railroad,
    // Railroad colors and typography derive from the active theme unless explicitly overridden.
    fontSize: void 0,
    fontFamily: void 0,
    terminalFill: void 0,
    terminalStroke: void 0,
    terminalTextColor: void 0,
    nonTerminalFill: void 0,
    nonTerminalStroke: void 0,
    nonTerminalTextColor: void 0,
    lineColor: void 0,
    markerFill: void 0,
    commentFill: void 0,
    commentStroke: void 0,
    commentTextColor: void 0,
    specialFill: void 0,
    specialStroke: void 0,
    ruleNameColor: void 0
  },
  ishikawa: {
    ...Kt.ishikawa
  },
  sankey: {
    ...Kt.sankey,
    // Set so that `configKeys` includes this key for sanitizeDirective
    nodeColors: void 0
  },
  treemap: {
    useMaxWidth: !0,
    padding: 10,
    diagramPadding: 8,
    showValues: !0,
    nodeWidth: 100,
    nodeHeight: 40,
    borderWidth: 1,
    valueFontSize: 12,
    labelFontSize: 14,
    valueFormat: ","
  },
  venn: {
    ...Kt.venn
  },
  cynefin: {
    ...Kt.cynefin
  }
}, jd = /* @__PURE__ */ d((e, t = "") => Object.keys(e).reduce((r, i) => Array.isArray(e[i]) ? r : typeof e[i] == "object" && e[i] !== null ? [...r, t + i, ...jd(e[i], "")] : [...r, t + i], []), "keyify"), pC = new Set(jd(Ud, "")), Dl = Ud, gC = {
  "flowchart-v2": "flowchart",
  "flowchart-elk": "flowchart",
  classDiagram: "class",
  stateDiagram: "state",
  xychart: "xyChart",
  railroadAbnf: "railroad",
  railroadEbnf: "railroad",
  railroadPeg: "railroad"
}, mC = /* @__PURE__ */ d((e) => gC[e] ?? e, "getDiagramConfigKey"), yC = {
  // CSS colors (sankey)
  nodeColors: /^#[\da-f]{3,8}$|^rgb\([\d\s%,.]+\)$|^hsl\([\d\s%,.]+\)$|^[a-z]+$/i,
  // iconify icon references (treeView filenameIcons/extensionIcons)
  filenameIcons: /^[\w-]+(?::[\w-]+)?$/,
  extensionIcons: /^[\w-]+(?::[\w-]+)?$/
}, xC = /* @__PURE__ */ d((e, t) => {
  for (const r of Object.keys(e)) {
    const i = e[r];
    (r.startsWith("__") || r.includes("proto") || r.includes("constr") || typeof i != "string" || !t.test(i)) && (J.debug("sanitize deleting dictionary entry:", r, i), delete e[r]);
  }
}, "sanitizeDictionaryConfig"), ko = /* @__PURE__ */ d((e) => {
  if (J.debug("sanitizeDirective called with", e), !(typeof e != "object" || e == null)) {
    if (Array.isArray(e)) {
      e.forEach((t) => ko(t));
      return;
    }
    for (const t of Object.keys(e)) {
      if (J.debug("Checking key", t), t.startsWith("__") || t.includes("proto") || t.includes("constr") || !pC.has(t) || e[t] == null) {
        J.debug("sanitize deleting key: ", t), delete e[t];
        continue;
      }
      if (typeof e[t] == "object") {
        const i = yC[t];
        i ? xC(e[t], i) : (J.debug("sanitizing object", t), ko(e[t]));
        continue;
      }
      const r = ["themeCSS", "fontFamily", "altFontFamily"];
      for (const i of r)
        t.includes(i) && (J.debug("sanitizing css option", t), e[t] = Gd(e[t]));
    }
    if (e.themeVariables)
      for (const t of Object.keys(e.themeVariables)) {
        const r = e.themeVariables[t];
        r?.match && !r.match(/^[\d "#%(),.;A-Za-z]+$/) && (e.themeVariables[t] = "");
      }
    J.debug("After sanitization", e);
  }
}, "sanitizeDirective"), Gd = /* @__PURE__ */ d((e) => {
  let t = 0, r = 0;
  for (const i of e) {
    if (t < r)
      return "{ /* ERROR: Unbalanced CSS */ }";
    i === "{" ? t++ : i === "}" && r++;
  }
  return t !== r ? "{ /* ERROR: Unbalanced CSS */ }" : e;
}, "sanitizeCss"), qr = Object.freeze(Dl), CC = ["theme", "look", "layout"], bC = /* @__PURE__ */ new Set(["classic", "handDrawn", "neo"]), kC = /* @__PURE__ */ d((e, t) => e === "theme" ? t === "null" || Object.hasOwn(kr, t) : e !== "look" || bC.has(t), "isUsableAppearance"), wC = /* @__PURE__ */ d((e, t, r) => e ? [e[t]?.[r], e[r]].find(
  (s) => s !== void 0 && kC(r, s)
) : void 0, "readAppearance"), ar = /* @__PURE__ */ d((e) => !(e === !1 || ["false", "null", "0"].includes(String(e).trim().toLowerCase())), "evaluate"), ye = Jt({}, qr), wo, So = {}, wr = [], ds = Jt({}, qr), fs, SC = /* @__PURE__ */ d((e, t) => {
  if (!fs)
    return;
  const r = [
    t,
    // `setConfig` passes only its own object as the directive list, so consult the real
    // directives too, or a diagram default wins back over frontmatter. Later ones win.
    ...[...wr].reverse(),
    So,
    qr
  ], i = e[fs];
  for (const s of CC)
    for (const o of r) {
      const a = wC(o, fs, s);
      if (a !== void 0) {
        e[s] = a, i?.[s] !== void 0 && (i[s] = a);
        break;
      }
    }
}, "resolveAppearance"), Pi = /* @__PURE__ */ d((e, t) => {
  let r = Jt({}, e), i = {};
  for (const o of t)
    Zd(o), i = Jt(i, o);
  if (r = Jt(r, i), SC(r, i), (!!i.theme || r.theme !== e.theme) && r.theme && Object.hasOwn(kr, r.theme)) {
    const o = Jt({}, wo), a = Jt(
      o.themeVariables || {},
      i.themeVariables
    );
    r.themeVariables = kr[r.theme].getThemeVariables(a);
  }
  return ds = r, FC(ds), ds;
}, "updateCurrentConfig"), Il = /* @__PURE__ */ d((e) => {
  fs = e === void 0 ? void 0 : mC(e), Pi(ye, wr);
}, "setDiagramConfigScope"), TC = /* @__PURE__ */ d((e) => (ye = Jt({}, qr), ye = Jt(ye, e), So = Jt({}, e), e.theme && Object.hasOwn(kr, e.theme) && (ye.themeVariables = kr[e.theme].getThemeVariables(
  e.themeVariables
)), Pi(ye, wr), ye), "setSiteConfig"), _C = /* @__PURE__ */ d((e) => {
  wo = Jt({}, e);
}, "saveConfigFromInitialize"), BC = /* @__PURE__ */ d((e) => (ye = Jt(ye, e), So = Jt(So, e), Pi(ye, wr), ye), "updateSiteConfig"), Xd = /* @__PURE__ */ d(() => Jt({}, ye), "getSiteConfig"), Vd = /* @__PURE__ */ d((e) => (Pi(ds, [e]), Ut()), "setConfig"), Ut = /* @__PURE__ */ d(() => Jt({}, ds), "getConfig"), Zd = /* @__PURE__ */ d((e) => {
  e && (["secure", ...ye.secure ?? []].forEach((t) => {
    Object.hasOwn(e, t) && (J.debug(`Denied attempt to modify a secure key ${t}`, e[t]), delete e[t]);
  }), Object.keys(e).forEach((t) => {
    t.startsWith("__") && delete e[t];
  }), Object.keys(e).forEach((t) => {
    typeof e[t] == "string" && (e[t].includes("<") || e[t].includes(">") || e[t].includes("url(data:")) && delete e[t], typeof e[t] == "object" && Zd(e[t]);
  }));
}, "sanitize"), vC = /* @__PURE__ */ d((e) => {
  ko(e), e.fontFamily && !e.themeVariables?.fontFamily && (e.themeVariables = {
    ...e.themeVariables,
    fontFamily: e.fontFamily
  }), wr.push(e), Pi(ye, wr);
}, "addDirective"), To = /* @__PURE__ */ d((e = ye) => {
  wr = [], fs = void 0, Pi(e, wr);
}, "reset"), LC = {
  LAZY_LOAD_DEPRECATED: "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.",
  FLOWCHART_HTML_LABELS_DEPRECATED: "flowchart.htmlLabels is deprecated. Please use global htmlLabels instead."
}, Rc = {}, Kd = /* @__PURE__ */ d((e) => {
  Rc[e] || (J.warn(LC[e]), Rc[e] = !0);
}, "issueWarning"), FC = /* @__PURE__ */ d((e) => {
  e && (e.lazyLoadedDiagrams || e.loadExternalDiagramsAtStartup) && Kd("LAZY_LOAD_DEPRECATED");
}, "checkConfig"), GA = /* @__PURE__ */ d(() => {
  let e = {};
  wo && (e = Jt(e, wo));
  for (const t of wr)
    e = Jt(e, t);
  return e;
}, "getUserDefinedConfig"), le = /* @__PURE__ */ d((e) => (e.flowchart?.htmlLabels != null && Kd("FLOWCHART_HTML_LABELS_DEPRECATED"), ar(e.htmlLabels ?? e.flowchart?.htmlLabels ?? !0)), "getEffectiveHtmlLabels"), Ts = /<\/?br\s*\/?>/gi, AC = new RegExp(Ts.source, "i"), MC = /* @__PURE__ */ d((e) => e ? tf(e).replace(/\\n/g, "#br#").split("#br#") : [""], "getRows"), EC = /* @__PURE__ */ (() => {
  let e = !1;
  return () => {
    e || (Qd(), e = !0);
  };
})();
function Qd() {
  const e = "data-temp-href-target";
  Fi.addHook("beforeSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute("target") && t.setAttribute(e, t.getAttribute("target") ?? "");
  }), Fi.addHook("afterSanitizeAttributes", (t) => {
    t.tagName === "A" && t.hasAttribute(e) && (t.setAttribute("target", t.getAttribute(e) ?? ""), t.removeAttribute(e), t.getAttribute("target") === "_blank" && t.setAttribute("rel", "noopener"));
  });
}
d(Qd, "setupDompurifyHooks");
var Jd = /* @__PURE__ */ d((e) => (EC(), Fi.sanitize(e)), "removeScript"), Nc = /* @__PURE__ */ d((e, t) => {
  if (le(t)) {
    const r = t.securityLevel;
    r === "antiscript" || r === "strict" || r === "sandbox" ? e = Jd(e) : r !== "loose" && (e = tf(e), e = e.replace(/</g, "&lt;").replace(/>/g, "&gt;"), e = e.replace(/=/g, "&equals;"), e = IC(e));
  }
  return e;
}, "sanitizeMore"), Ee = /* @__PURE__ */ d((e, t) => e && (t.dompurifyConfig ? e = Fi.sanitize(Nc(e, t), t.dompurifyConfig).toString() : e = Fi.sanitize(Nc(e, t), {
  FORBID_TAGS: ["style"]
}).toString(), e), "sanitizeText"), $C = /* @__PURE__ */ d((e, t) => typeof e == "string" ? Ee(e, t) : e.flat().map((r) => Ee(r, t)), "sanitizeTextOrArray"), OC = /* @__PURE__ */ d((e) => AC.test(e), "hasBreaks"), DC = /* @__PURE__ */ d((e) => e.split(Ts), "splitBreaks"), IC = /* @__PURE__ */ d((e) => e.replace(/#br#/g, "<br/>"), "placeholderToBreak"), tf = /* @__PURE__ */ d((e) => e.replace(Ts, "#br#"), "breakToPlaceholder"), PC = /* @__PURE__ */ d((e) => {
  let t = "";
  return e && (t = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, t = CSS.escape(t)), t;
}, "getUrl"), RC = /* @__PURE__ */ d(function(...e) {
  const t = e.filter((r) => !isNaN(r));
  return Math.max(...t);
}, "getMax"), NC = /* @__PURE__ */ d(function(...e) {
  const t = e.filter((r) => !isNaN(r));
  return Math.min(...t);
}, "getMin"), qc = /* @__PURE__ */ d(function(e) {
  const t = e.split(/(,)/), r = [];
  for (let i = 0; i < t.length; i++) {
    let s = t[i];
    if (s === "," && i > 0 && i + 1 < t.length) {
      const o = t[i - 1], a = t[i + 1];
      qC(o, a) && (s = o + "," + a, i++, r.pop());
    }
    r.push(WC(s));
  }
  return r.join("");
}, "parseGenericTypes"), On = /* @__PURE__ */ d((e, t) => Math.max(0, e.split(t).length - 1), "countOccurrence"), qC = /* @__PURE__ */ d((e, t) => {
  const r = On(e, "~"), i = On(t, "~");
  return r === 1 && i === 1;
}, "shouldCombineSets"), WC = /* @__PURE__ */ d((e) => {
  const t = On(e, "~");
  let r = !1;
  if (t <= 1)
    return e;
  t % 2 !== 0 && e.startsWith("~") && (e = e.substring(1), r = !0);
  const i = [...e];
  let s = i.indexOf("~"), o = i.lastIndexOf("~");
  for (; s !== -1 && o !== -1 && s !== o; )
    i[s] = "<", i[o] = ">", s = i.indexOf("~"), o = i.lastIndexOf("~");
  return r && i.unshift("~"), i.join("");
}, "processSet"), Wc = /* @__PURE__ */ d(() => window.MathMLElement !== void 0, "isMathMLSupported"), Dn = /\$\$(.*?)\$\$/g, ys = /* @__PURE__ */ d((e) => (e.match(Dn)?.length ?? 0) > 0, "hasKatex"), XA = /* @__PURE__ */ d(async (e, t) => {
  const r = document.createElement("div");
  r.innerHTML = await ef(e, t), r.id = "katex-temp", r.style.visibility = "hidden", r.style.position = "absolute", r.style.top = "0", document.querySelector("body")?.insertAdjacentElement("beforeend", r);
  const s = { width: r.clientWidth, height: r.clientHeight };
  return r.remove(), s;
}, "calculateMathMLDimensions"), zC = /* @__PURE__ */ d(async (e, t) => {
  if (!ys(e))
    return e;
  if (!(Wc() || t.legacyMathML || t.forceLegacyMathML))
    return e.replace(Dn, "MathML is unsupported in this environment.");
  {
    const { default: r } = await import("./katex-BsrBVQKd.js"), i = t.forceLegacyMathML || !Wc() && t.legacyMathML ? "htmlAndMathml" : "mathml";
    return e.split(Ts).map(
      (s) => ys(s) ? `<div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">${s}</div>` : `<div>${s}</div>`
    ).join("").replace(
      Dn,
      (s, o) => r.renderToString(o, {
        throwOnError: !0,
        displayMode: !0,
        output: i
      }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
    );
  }
}, "renderKatexUnsanitized"), ef = /* @__PURE__ */ d(async (e, t) => Ee(await zC(e, t), t), "renderKatexSanitized"), _s = {
  getRows: MC,
  sanitizeText: Ee,
  sanitizeTextOrArray: $C,
  hasBreaks: OC,
  splitBreaks: DC,
  lineBreakRegex: Ts,
  removeScript: Jd,
  getUrl: PC,
  evaluate: ar,
  getMax: RC,
  getMin: NC
}, HC = /* @__PURE__ */ d(function(e, t) {
  for (let r of t)
    e.attr(r[0], r[1]);
}, "d3Attrs"), YC = /* @__PURE__ */ d(function(e, t, r) {
  let i = /* @__PURE__ */ new Map();
  return r ? (i.set("width", "100%"), i.set("style", `max-width: ${t}px;`)) : (i.set("height", e), i.set("width", t)), i;
}, "calculateSvgSizeAttrs"), rf = /* @__PURE__ */ d(function(e, t, r, i) {
  const s = YC(t, r, i);
  HC(e, s);
}, "configureSvgSize"), UC = /* @__PURE__ */ d(function(e, t, r, i) {
  const s = t.node().getBBox(), o = s.width, a = s.height;
  J.info(`SVG bounds: ${o}x${a}`, s);
  let n = 0, l = 0;
  J.info(`Graph bounds: ${n}x${l}`, e), n = o + r * 2, l = a + r * 2, J.info(`Calculated bounds: ${n}x${l}`), rf(t, l, n, i);
  const c = `${s.x - r} ${s.y - r} ${s.width + 2 * r} ${s.height + 2 * r}`;
  t.attr("viewBox", c);
}, "setupGraphViewbox"), no = {};
function In(e) {
  return [...e.cssRules].map((t) => t.cssText).join(`
`);
}
d(In, "cssStyleSheetToString");
var jC = /* @__PURE__ */ d((e, t, r, i) => {
  let s = "";
  return e in no && no[e] ? s = no[e]({ ...r, svgId: i }) : J.warn(`No theme found for ${e}`), `& {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
    fill: ${r.textColor}
  }
  @keyframes edge-animation-frame {
    from {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
  & .edge-animation-slow {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 50s linear infinite;
    stroke-linecap: round;
  }
  & .edge-animation-fast {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 20s linear infinite;
    stroke-linecap: round;
  }
  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${r.errorBkgColor};
  }
  & .error-text {
    fill: ${r.errorTextColor};
    stroke: ${r.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: ${r.strokeWidth ?? 1}px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }
  & .edge-thickness-invisible {
    stroke-width: 0;
    fill: none;
  }
  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${r.lineColor};
    stroke: ${r.lineColor};
  }
  & .marker.cross {
    stroke: ${r.lineColor};
  }

  & svg {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
  }
   & p {
    margin: 0
   }

  ${s}
  .node .neo-node {
    stroke: ${r.nodeBorder};
  }

  [data-look="neo"].node rect, [data-look="neo"].cluster rect, [data-look="neo"].node polygon {
    stroke: ${r.useGradient ? "url(" + i + "-gradient)" : r.nodeBorder};
    filter: ${r.dropShadow ? r.dropShadow.replace("url(#drop-shadow)", `url(${i}-drop-shadow)`) : "none"};
  }
  [data-look="neo"].swimlane.cluster rect {
    filter: none;
  }


  [data-look="neo"].node path {
    stroke: ${r.useGradient ? "url(" + i + "-gradient)" : r.nodeBorder};
    stroke-width: ${r.strokeWidth ?? 1}px;
  }

  [data-look="neo"].node .outer-path {
    filter: ${r.dropShadow ? r.dropShadow.replace("url(#drop-shadow)", `url(${i}-drop-shadow)`) : "none"};
  }

  [data-look="neo"].node .neo-line path {
    stroke: ${r.nodeBorder};
    filter: none;
  }

  [data-look="neo"].node circle{
    stroke: ${r.useGradient ? "url(" + i + "-gradient)" : r.nodeBorder};
    filter: ${r.dropShadow ? r.dropShadow.replace("url(#drop-shadow)", `url(${i}-drop-shadow)`) : "none"};
  }

  [data-look="neo"].node circle .state-start{
    fill: #000000;
  }

  [data-look="neo"].icon-shape .icon {
    fill: ${r.useGradient ? "url(" + i + "-gradient)" : r.nodeBorder};
    filter: ${r.dropShadow ? r.dropShadow.replace("url(#drop-shadow)", `url(${i}-drop-shadow)`) : "none"};
  }

    [data-look="neo"].icon-shape .icon-neo path {
    stroke: ${r.useGradient ? "url(" + i + "-gradient)" : r.nodeBorder};
    filter: ${r.dropShadow ? r.dropShadow.replace("url(#drop-shadow)", `url(${i}-drop-shadow)`) : "none"};
  }

  ${t}
`;
}, "getStyles"), GC = /* @__PURE__ */ d((e, t) => {
  t !== void 0 && (no[e] = t);
}, "addStylesForDiagram"), XC = jC, sf = {};
z0(sf, {
  clear: () => VC,
  getAccDescription: () => JC,
  getAccTitle: () => KC,
  getDiagramTitle: () => eb,
  setAccDescription: () => QC,
  setAccTitle: () => ZC,
  setDiagramTitle: () => tb
});
var Pl = "", Rl = "", Nl = "", ql = /* @__PURE__ */ d((e) => Ee(e, Ut()), "sanitizeText"), VC = /* @__PURE__ */ d(() => {
  Pl = "", Nl = "", Rl = "";
}, "clear"), ZC = /* @__PURE__ */ d((e) => {
  Pl = ql(e).replace(/^\s+/g, "");
}, "setAccTitle"), KC = /* @__PURE__ */ d(() => Pl, "getAccTitle"), QC = /* @__PURE__ */ d((e) => {
  Nl = ql(e).replace(/\n\s+/g, `
`);
}, "setAccDescription"), JC = /* @__PURE__ */ d(() => Nl, "getAccDescription"), tb = /* @__PURE__ */ d((e) => {
  Rl = ql(e);
}, "setDiagramTitle"), eb = /* @__PURE__ */ d(() => Rl, "getDiagramTitle"), zc = J, rb = Ol, Ot = Ut, VA = Vd, ZA = qr, Wl = /* @__PURE__ */ d((e) => Ee(e, Ot()), "sanitizeText"), ib = UC, sb = /* @__PURE__ */ d(() => sf, "getCommonDb"), _o = {}, Bo = /* @__PURE__ */ d((e, t, r) => {
  _o[e] && zc.warn(`Diagram with id ${e} already registered. Overwriting.`), _o[e] = t, r && Yd(e, r), GC(e, t.styles), t.injectUtils?.(
    zc,
    rb,
    Ot,
    Wl,
    ib,
    sb(),
    () => {
    }
  );
}, "registerDiagram"), Pn = /* @__PURE__ */ d((e) => {
  if (e in _o)
    return _o[e];
  throw new ob(e);
}, "getDiagram"), ob = class extends Error {
  static {
    d(this, "DiagramNotFoundError");
  }
  constructor(e) {
    super(`Diagram ${e} not found.`);
  }
}, ab = /* @__PURE__ */ d((e) => {
  const { handDrawnSeed: t } = Ot();
  return {
    fill: e,
    hachureAngle: 120,
    // angle of hachure,
    hachureGap: 1.5,
    fillWeight: 1.5,
    roughness: 0.7,
    stroke: e,
    seed: t
  };
}, "solidStateFill"), nb = /* @__PURE__ */ d((e) => Array.isArray(e) ? e : e ? e.split(";").map((t) => t.trim()).filter(Boolean) : [], "normalizeStyleList"), jr = /* @__PURE__ */ d((e) => {
  const t = lb([
    ...e.cssCompiledStyles || [],
    ...e.cssStyles || [],
    ...nb(e.labelStyle)
  ]);
  return { stylesMap: t, stylesArray: [...t] };
}, "compileStyles"), lb = /* @__PURE__ */ d((e) => {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    const [i, s] = r.split(":");
    t.set(i.trim(), s?.trim());
  }), t;
}, "styles2Map"), of = /* @__PURE__ */ d((e) => e === "color" || e === "font-size" || e === "font-family" || e === "font-weight" || e === "font-style" || e === "text-decoration" || e === "text-align" || e === "text-transform" || e === "line-height" || e === "letter-spacing" || e === "word-spacing" || e === "text-shadow" || e === "text-overflow" || e === "white-space" || e === "word-wrap" || e === "word-break" || e === "overflow-wrap" || e === "hyphens", "isLabelStyle"), ht = /* @__PURE__ */ d((e) => {
  const { stylesArray: t } = jr(e), r = [], i = [], s = [], o = [];
  return t.forEach((a) => {
    const n = a[0];
    of(n) ? r.push(a.join(":") + " !important") : (i.push(a.join(":") + " !important"), n.includes("stroke") && s.push(a.join(":") + " !important"), n === "fill" && o.push(a.join(":") + " !important"));
  }), {
    labelStyles: r.join(";"),
    nodeStyles: i.join(";"),
    stylesArray: t,
    borderStyles: s,
    backgroundStyles: o
  };
}, "styles2String"), lt = /* @__PURE__ */ d((e, t) => {
  const { themeVariables: r, handDrawnSeed: i } = Ot(), { nodeBorder: s, mainBkg: o } = r, { stylesMap: a } = jr(e);
  return Object.assign(
    {
      roughness: 0.7,
      fill: a.get("fill") || o,
      fillStyle: "hachure",
      // solid fill
      fillWeight: 1.5,
      hachureGap: 1.5,
      stroke: a.get("stroke") || s,
      seed: i,
      strokeWidth: a.get("stroke-width")?.replace("px", "") || 1.3,
      fillLineDash: [0, 0],
      strokeLineDash: hb(a.get("stroke-dasharray"))
    },
    t
  );
}, "userNodeOverrides"), hb = /* @__PURE__ */ d((e) => {
  if (!e)
    return [0, 0];
  const t = e.trim().split(/\s+/).map(Number);
  if (t.length === 1) {
    const s = isNaN(t[0]) ? 0 : t[0];
    return [s, s];
  }
  const r = isNaN(t[0]) ? 0 : t[0], i = isNaN(t[1]) ? 0 : t[1];
  return [r, i];
}, "getStrokeDashArray");
const cb = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
}), vo = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), af = Object.freeze({
  ...cb,
  ...vo
}), ub = Object.freeze({
  ...af,
  body: "",
  hidden: !1
}), db = Object.freeze({
  width: null,
  height: null
}), fb = Object.freeze({
  ...db,
  ...vo
}), pb = (e, t, r, i = "") => {
  const s = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (s.length < 2 || s.length > 3) return null;
    i = s.shift().slice(1);
  }
  if (s.length > 3 || !s.length) return null;
  if (s.length > 1) {
    const n = s.pop(), l = s.pop(), c = {
      provider: s.length > 0 ? s[0] : i,
      prefix: l,
      name: n
    };
    return un(c) ? c : null;
  }
  const o = s[0], a = o.split("-");
  if (a.length > 1) {
    const n = {
      provider: i,
      prefix: a.shift(),
      name: a.join("-")
    };
    return un(n) ? n : null;
  }
  if (r && i === "") {
    const n = {
      provider: i,
      prefix: "",
      name: o
    };
    return un(n, r) ? n : null;
  }
  return null;
}, un = (e, t) => e ? !!((t && e.prefix === "" || e.prefix) && e.name) : !1;
function gb(e, t) {
  const r = {};
  !e.hFlip != !t.hFlip && (r.hFlip = !0), !e.vFlip != !t.vFlip && (r.vFlip = !0);
  const i = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return i && (r.rotate = i), r;
}
function Hc(e, t) {
  const r = gb(e, t);
  for (const i in ub) i in vo ? i in e && !(i in r) && (r[i] = vo[i]) : i in t ? r[i] = t[i] : i in e && (r[i] = e[i]);
  return r;
}
function mb(e, t) {
  const r = e.icons, i = e.aliases || /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  function o(a) {
    if (r[a]) return s[a] = [];
    if (!(a in s)) {
      s[a] = null;
      const n = i[a] && i[a].parent, l = n && o(n);
      l && (s[a] = [n].concat(l));
    }
    return s[a];
  }
  return (t || Object.keys(r).concat(Object.keys(i))).forEach(o), s;
}
function Yc(e, t, r) {
  const i = e.icons, s = e.aliases || /* @__PURE__ */ Object.create(null);
  let o = {};
  function a(n) {
    o = Hc(i[n] || s[n], o);
  }
  return a(t), r.forEach(a), Hc(e, o);
}
function yb(e, t) {
  if (e.icons[t]) return Yc(e, t, []);
  const r = mb(e, [t])[t];
  return r ? Yc(e, t, r) : null;
}
const xb = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Cb = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Uc(e, t, r) {
  if (t === 1) return e;
  if (r = r || 100, typeof e == "number") return Math.ceil(e * t * r) / r;
  if (typeof e != "string") return e;
  const i = e.split(xb);
  if (i === null || !i.length) return e;
  const s = [];
  let o = i.shift(), a = Cb.test(o);
  for (; ; ) {
    if (a) {
      const n = parseFloat(o);
      isNaN(n) ? s.push(o) : s.push(Math.ceil(n * t * r) / r);
    } else s.push(o);
    if (o = i.shift(), o === void 0) return s.join("");
    a = !a;
  }
}
function bb(e, t = "defs") {
  let r = "";
  const i = e.indexOf("<" + t);
  for (; i >= 0; ) {
    const s = e.indexOf(">", i), o = e.indexOf("</" + t);
    if (s === -1 || o === -1) break;
    const a = e.indexOf(">", o);
    if (a === -1) break;
    r += e.slice(s + 1, o).trim(), e = e.slice(0, i).trim() + e.slice(a + 1);
  }
  return {
    defs: r,
    content: e
  };
}
function kb(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function wb(e, t, r) {
  const i = bb(e);
  return kb(i.defs, t + i.content + r);
}
const Sb = (e) => e === "unset" || e === "undefined" || e === "none";
function Tb(e, t) {
  const r = {
    ...af,
    ...e
  }, i = {
    ...fb,
    ...t
  }, s = {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height
  };
  let o = r.body;
  [r, i].forEach((y) => {
    const x = [], C = y.hFlip, b = y.vFlip;
    let S = y.rotate;
    C ? b ? S += 2 : (x.push("translate(" + (s.width + s.left).toString() + " " + (0 - s.top).toString() + ")"), x.push("scale(-1 1)"), s.top = s.left = 0) : b && (x.push("translate(" + (0 - s.left).toString() + " " + (s.height + s.top).toString() + ")"), x.push("scale(1 -1)"), s.top = s.left = 0);
    let _;
    switch (S < 0 && (S -= Math.floor(S / 4) * 4), S = S % 4, S) {
      case 1:
        _ = s.height / 2 + s.top, x.unshift("rotate(90 " + _.toString() + " " + _.toString() + ")");
        break;
      case 2:
        x.unshift("rotate(180 " + (s.width / 2 + s.left).toString() + " " + (s.height / 2 + s.top).toString() + ")");
        break;
      case 3:
        _ = s.width / 2 + s.left, x.unshift("rotate(-90 " + _.toString() + " " + _.toString() + ")");
        break;
    }
    S % 2 === 1 && (s.left !== s.top && (_ = s.left, s.left = s.top, s.top = _), s.width !== s.height && (_ = s.width, s.width = s.height, s.height = _)), x.length && (o = wb(o, '<g transform="' + x.join(" ") + '">', "</g>"));
  });
  const a = i.width, n = i.height, l = s.width, c = s.height;
  let h, u;
  a === null ? (u = n === null ? "1em" : n === "auto" ? c : n, h = Uc(u, l / c)) : (h = a === "auto" ? l : a, u = n === null ? Uc(h, c / l) : n === "auto" ? c : n);
  const f = {}, p = (y, x) => {
    Sb(x) || (f[y] = x.toString());
  };
  p("width", h), p("height", u);
  const m = [
    s.left,
    s.top,
    l,
    c
  ];
  return f.viewBox = m.join(" "), {
    attributes: f,
    viewBox: m,
    body: o
  };
}
const _b = /\sid="(\S+)"/g, jc = /* @__PURE__ */ new Map();
function Bb(e) {
  e = e.replace(/[0-9]+$/, "") || "a";
  const t = jc.get(e) || 0;
  return jc.set(e, t + 1), t ? `${e}${t}` : e;
}
function vb(e) {
  const t = [];
  let r;
  for (; r = _b.exec(e); ) t.push(r[1]);
  if (!t.length) return e;
  const i = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return t.forEach((s) => {
    const o = Bb(s), a = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(new RegExp('([#;"])(' + a + ')([")]|\\.[a-z])', "g"), "$1" + o + i + "$3");
  }), e = e.replace(new RegExp(i, "g"), ""), e;
}
function Lb(e, t) {
  let r = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const i in t) r += " " + i + '="' + t[i] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + r + ">" + e + "</svg>";
}
var Fb = {
  body: '<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/><text transform="translate(21.16 64.67)" style="fill: #fff; font-family: ArialMT, Arial; font-size: 67.75px;"><tspan x="0" y="0">?</tspan></text></g>',
  height: 80,
  width: 80
}, Lo = /* @__PURE__ */ new Map(), zl = /* @__PURE__ */ new Map(), nf = /* @__PURE__ */ d((e) => {
  for (const t of e) {
    if (!t.name)
      throw new Error(
        'Invalid icon loader. Must have a "name" property with non-empty string value.'
      );
    if (J.debug("Registering icon pack:", t.name), "loader" in t)
      zl.set(t.name, t.loader);
    else if ("icons" in t)
      Lo.set(t.name, t.icons);
    else
      throw J.error("Invalid icon loader:", t), new Error('Invalid icon loader. Must have either "icons" or "loader" property.');
  }
}, "registerIconPacks"), Ab = /* @__PURE__ */ d((e) => Lo.has(e) || zl.has(e), "isIconPackRegistered"), lf = /* @__PURE__ */ d(async (e, t) => {
  const r = pb(e, !0, t !== void 0);
  if (!r)
    throw new Error(`Invalid icon name: ${e}`);
  const i = r.prefix || t;
  if (!i)
    throw new Error(`Icon name must contain a prefix: ${e}`);
  let s = Lo.get(i);
  if (!s) {
    const a = zl.get(i);
    if (!a)
      throw new Error(`Icon set not found: ${r.prefix}`);
    try {
      s = { ...await a(), prefix: i }, Lo.set(i, s);
    } catch (n) {
      throw J.error(n), new Error(`Failed to load icon set: ${r.prefix}`);
    }
  }
  const o = yb(s, r.name);
  if (!o)
    throw new Error(`Icon not found: ${e}`);
  return o;
}, "getRegisteredIconData"), hf = /* @__PURE__ */ d(async (e) => {
  try {
    return await lf(e), !0;
  } catch {
    return !1;
  }
}, "isIconAvailable"), li = /* @__PURE__ */ d(async (e, t, r) => {
  let i;
  try {
    i = await lf(e, t?.fallbackPrefix);
  } catch (a) {
    J.error(a), i = Fb;
  }
  const s = Tb(i, t), o = Lb(vb(s.body), {
    ...s.attributes,
    ...r
  });
  return Ee(o, Ut());
}, "getIconSVG"), Us = {}, se = {}, Gc;
function Mb() {
  return Gc || (Gc = 1, Object.defineProperty(se, "__esModule", { value: !0 }), se.BLANK_URL = se.relativeFirstCharacters = se.whitespaceEscapeCharsRegex = se.urlSchemeRegex = se.ctrlCharactersRegex = se.htmlCtrlEntityRegex = se.htmlEntitiesRegex = se.invalidProtocolRegex = void 0, se.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im, se.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g, se.htmlCtrlEntityRegex = /&(newline|tab);/gi, se.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, se.urlSchemeRegex = /^.+(:|&colon;)/gim, se.whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g, se.relativeFirstCharacters = [".", "/"], se.BLANK_URL = "about:blank"), se;
}
var Xc;
function Eb() {
  if (Xc) return Us;
  Xc = 1, Object.defineProperty(Us, "__esModule", { value: !0 }), Us.sanitizeUrl = o;
  var e = Mb();
  function t(a) {
    return e.relativeFirstCharacters.indexOf(a[0]) > -1;
  }
  function r(a) {
    var n = a.replace(e.ctrlCharactersRegex, "");
    return n.replace(e.htmlEntitiesRegex, function(l, c) {
      return String.fromCharCode(c);
    });
  }
  function i(a) {
    return URL.canParse(a);
  }
  function s(a) {
    try {
      return decodeURIComponent(a);
    } catch {
      return a;
    }
  }
  function o(a) {
    if (!a)
      return e.BLANK_URL;
    var n, l = s(a.trim());
    do
      l = r(l).replace(e.htmlCtrlEntityRegex, "").replace(e.ctrlCharactersRegex, "").replace(e.whitespaceEscapeCharsRegex, "").trim(), l = s(l), n = l.match(e.ctrlCharactersRegex) || l.match(e.htmlEntitiesRegex) || l.match(e.htmlCtrlEntityRegex) || l.match(e.whitespaceEscapeCharsRegex);
    while (n && n.length > 0);
    var c = l;
    if (!c)
      return e.BLANK_URL;
    if (t(c))
      return c;
    var h = c.trimStart(), u = h.match(e.urlSchemeRegex);
    if (!u)
      return c;
    var f = u[0].toLowerCase().trim();
    if (e.invalidProtocolRegex.test(f))
      return e.BLANK_URL;
    var p = h.replace(/\\/g, "/");
    if (f === "mailto:" || f.includes("://"))
      return p;
    if (f === "http:" || f === "https:") {
      if (!i(p))
        return e.BLANK_URL;
      var m = new URL(p);
      return m.protocol = m.protocol.toLowerCase(), m.hostname = m.hostname.toLowerCase(), m.toString();
    }
    return p;
  }
  return Us;
}
var $b = Eb(), Ob = { value: () => {
} };
function cf() {
  for (var e = 0, t = arguments.length, r = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in r || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    r[i] = [];
  }
  return new lo(r);
}
function lo(e) {
  this._ = e;
}
function Db(e, t) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var i = "", s = r.indexOf(".");
    if (s >= 0 && (i = r.slice(s + 1), r = r.slice(0, s)), r && !t.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: i };
  });
}
lo.prototype = cf.prototype = {
  constructor: lo,
  on: function(e, t) {
    var r = this._, i = Db(e + "", r), s, o = -1, a = i.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((s = (e = i[o]).type) && (s = Ib(r[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (s = (e = i[o]).type) r[s] = Vc(r[s], e.name, t);
      else if (t == null) for (s in r) r[s] = Vc(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var r in t) e[r] = t[r].slice();
    return new lo(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var r = new Array(s), i = 0, s, o; i < s; ++i) r[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], i = 0, s = o.length; i < s; ++i) o[i].value.apply(t, r);
  },
  apply: function(e, t, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], s = 0, o = i.length; s < o; ++s) i[s].value.apply(t, r);
  }
};
function Ib(e, t) {
  for (var r = 0, i = e.length, s; r < i; ++r)
    if ((s = e[r]).name === t)
      return s.value;
}
function Vc(e, t, r) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = Ob, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var Rn = "http://www.w3.org/1999/xhtml";
const Zc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ea(e) {
  var t = e += "", r = t.indexOf(":");
  return r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Zc.hasOwnProperty(t) ? { space: Zc[t], local: e } : e;
}
function Pb(e) {
  return function() {
    var t = this.ownerDocument, r = this.namespaceURI;
    return r === Rn && t.documentElement.namespaceURI === Rn ? t.createElement(e) : t.createElementNS(r, e);
  };
}
function Rb(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function uf(e) {
  var t = ea(e);
  return (t.local ? Rb : Pb)(t);
}
function Nb() {
}
function Hl(e) {
  return e == null ? Nb : function() {
    return this.querySelector(e);
  };
}
function qb(e) {
  typeof e != "function" && (e = Hl(e));
  for (var t = this._groups, r = t.length, i = new Array(r), s = 0; s < r; ++s)
    for (var o = t[s], a = o.length, n = i[s] = new Array(a), l, c, h = 0; h < a; ++h)
      (l = o[h]) && (c = e.call(l, l.__data__, h, o)) && ("__data__" in l && (c.__data__ = l.__data__), n[h] = c);
  return new Be(i, this._parents);
}
function Wb(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function zb() {
  return [];
}
function df(e) {
  return e == null ? zb : function() {
    return this.querySelectorAll(e);
  };
}
function Hb(e) {
  return function() {
    return Wb(e.apply(this, arguments));
  };
}
function Yb(e) {
  typeof e == "function" ? e = Hb(e) : e = df(e);
  for (var t = this._groups, r = t.length, i = [], s = [], o = 0; o < r; ++o)
    for (var a = t[o], n = a.length, l, c = 0; c < n; ++c)
      (l = a[c]) && (i.push(e.call(l, l.__data__, c, a)), s.push(l));
  return new Be(i, s);
}
function ff(e) {
  return function() {
    return this.matches(e);
  };
}
function pf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ub = Array.prototype.find;
function jb(e) {
  return function() {
    return Ub.call(this.children, e);
  };
}
function Gb() {
  return this.firstElementChild;
}
function Xb(e) {
  return this.select(e == null ? Gb : jb(typeof e == "function" ? e : pf(e)));
}
var Vb = Array.prototype.filter;
function Zb() {
  return Array.from(this.children);
}
function Kb(e) {
  return function() {
    return Vb.call(this.children, e);
  };
}
function Qb(e) {
  return this.selectAll(e == null ? Zb : Kb(typeof e == "function" ? e : pf(e)));
}
function Jb(e) {
  typeof e != "function" && (e = ff(e));
  for (var t = this._groups, r = t.length, i = new Array(r), s = 0; s < r; ++s)
    for (var o = t[s], a = o.length, n = i[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && n.push(l);
  return new Be(i, this._parents);
}
function gf(e) {
  return new Array(e.length);
}
function tk() {
  return new Be(this._enter || this._groups.map(gf), this._parents);
}
function Fo(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Fo.prototype = {
  constructor: Fo,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function ek(e) {
  return function() {
    return e;
  };
}
function rk(e, t, r, i, s, o) {
  for (var a = 0, n, l = t.length, c = o.length; a < c; ++a)
    (n = t[a]) ? (n.__data__ = o[a], i[a] = n) : r[a] = new Fo(e, o[a]);
  for (; a < l; ++a)
    (n = t[a]) && (s[a] = n);
}
function ik(e, t, r, i, s, o, a) {
  var n, l, c = /* @__PURE__ */ new Map(), h = t.length, u = o.length, f = new Array(h), p;
  for (n = 0; n < h; ++n)
    (l = t[n]) && (f[n] = p = a.call(l, l.__data__, n, t) + "", c.has(p) ? s[n] = l : c.set(p, l));
  for (n = 0; n < u; ++n)
    p = a.call(e, o[n], n, o) + "", (l = c.get(p)) ? (i[n] = l, l.__data__ = o[n], c.delete(p)) : r[n] = new Fo(e, o[n]);
  for (n = 0; n < h; ++n)
    (l = t[n]) && c.get(f[n]) === l && (s[n] = l);
}
function sk(e) {
  return e.__data__;
}
function ok(e, t) {
  if (!arguments.length) return Array.from(this, sk);
  var r = t ? ik : rk, i = this._parents, s = this._groups;
  typeof e != "function" && (e = ek(e));
  for (var o = s.length, a = new Array(o), n = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var h = i[c], u = s[c], f = u.length, p = ak(e.call(h, h && h.__data__, c, i)), m = p.length, y = n[c] = new Array(m), x = a[c] = new Array(m), C = l[c] = new Array(f);
    r(h, u, y, x, C, p, t);
    for (var b = 0, S = 0, _, B; b < m; ++b)
      if (_ = y[b]) {
        for (b >= S && (S = b + 1); !(B = x[S]) && ++S < m; ) ;
        _._next = B || null;
      }
  }
  return a = new Be(a, i), a._enter = n, a._exit = l, a;
}
function ak(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function nk() {
  return new Be(this._exit || this._groups.map(gf), this._parents);
}
function lk(e, t, r) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), r == null ? o.remove() : r(o), i && s ? i.merge(s).order() : s;
}
function hk(e) {
  for (var t = e.selection ? e.selection() : e, r = this._groups, i = t._groups, s = r.length, o = i.length, a = Math.min(s, o), n = new Array(s), l = 0; l < a; ++l)
    for (var c = r[l], h = i[l], u = c.length, f = n[l] = new Array(u), p, m = 0; m < u; ++m)
      (p = c[m] || h[m]) && (f[m] = p);
  for (; l < s; ++l)
    n[l] = r[l];
  return new Be(n, this._parents);
}
function ck() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var i = e[t], s = i.length - 1, o = i[s], a; --s >= 0; )
      (a = i[s]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function uk(e) {
  e || (e = dk);
  function t(u, f) {
    return u && f ? e(u.__data__, f.__data__) : !u - !f;
  }
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var a = r[o], n = a.length, l = s[o] = new Array(n), c, h = 0; h < n; ++h)
      (c = a[h]) && (l[h] = c);
    l.sort(t);
  }
  return new Be(s, this._parents).order();
}
function dk(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function fk() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function pk() {
  return Array.from(this);
}
function gk() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var i = e[t], s = 0, o = i.length; s < o; ++s) {
      var a = i[s];
      if (a) return a;
    }
  return null;
}
function mk() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function yk() {
  return !this.node();
}
function xk(e) {
  for (var t = this._groups, r = 0, i = t.length; r < i; ++r)
    for (var s = t[r], o = 0, a = s.length, n; o < a; ++o)
      (n = s[o]) && e.call(n, n.__data__, o, s);
  return this;
}
function Ck(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function bk(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function kk(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function wk(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Sk(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function Tk(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function _k(e, t) {
  var r = ea(e);
  if (arguments.length < 2) {
    var i = this.node();
    return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
  }
  return this.each((t == null ? r.local ? bk : Ck : typeof t == "function" ? r.local ? Tk : Sk : r.local ? wk : kk)(r, t));
}
function mf(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Bk(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function vk(e, t, r) {
  return function() {
    this.style.setProperty(e, t, r);
  };
}
function Lk(e, t, r) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, r);
  };
}
function Fk(e, t, r) {
  return arguments.length > 1 ? this.each((t == null ? Bk : typeof t == "function" ? Lk : vk)(e, t, r ?? "")) : Ai(this.node(), e);
}
function Ai(e, t) {
  return e.style.getPropertyValue(t) || mf(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ak(e) {
  return function() {
    delete this[e];
  };
}
function Mk(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ek(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function $k(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ak : typeof t == "function" ? Ek : Mk)(e, t)) : this.node()[e];
}
function yf(e) {
  return e.trim().split(/^|\s+/);
}
function Yl(e) {
  return e.classList || new xf(e);
}
function xf(e) {
  this._node = e, this._names = yf(e.getAttribute("class") || "");
}
xf.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Cf(e, t) {
  for (var r = Yl(e), i = -1, s = t.length; ++i < s; ) r.add(t[i]);
}
function bf(e, t) {
  for (var r = Yl(e), i = -1, s = t.length; ++i < s; ) r.remove(t[i]);
}
function Ok(e) {
  return function() {
    Cf(this, e);
  };
}
function Dk(e) {
  return function() {
    bf(this, e);
  };
}
function Ik(e, t) {
  return function() {
    (t.apply(this, arguments) ? Cf : bf)(this, e);
  };
}
function Pk(e, t) {
  var r = yf(e + "");
  if (arguments.length < 2) {
    for (var i = Yl(this.node()), s = -1, o = r.length; ++s < o; ) if (!i.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ik : t ? Ok : Dk)(r, t));
}
function Rk() {
  this.textContent = "";
}
function Nk(e) {
  return function() {
    this.textContent = e;
  };
}
function qk(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Wk(e) {
  return arguments.length ? this.each(e == null ? Rk : (typeof e == "function" ? qk : Nk)(e)) : this.node().textContent;
}
function zk() {
  this.innerHTML = "";
}
function Hk(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Yk(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Uk(e) {
  return arguments.length ? this.each(e == null ? zk : (typeof e == "function" ? Yk : Hk)(e)) : this.node().innerHTML;
}
function jk() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Gk() {
  return this.each(jk);
}
function Xk() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Vk() {
  return this.each(Xk);
}
function Zk(e) {
  var t = typeof e == "function" ? e : uf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Kk() {
  return null;
}
function Qk(e, t) {
  var r = typeof e == "function" ? e : uf(e), i = t == null ? Kk : typeof t == "function" ? t : Hl(t);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Jk() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function t1() {
  return this.each(Jk);
}
function e1() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function r1() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function i1(e) {
  return this.select(e ? r1 : e1);
}
function s1(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function o1(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function a1(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var r = "", i = t.indexOf(".");
    return i >= 0 && (r = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: r };
  });
}
function n1(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var r = 0, i = -1, s = t.length, o; r < s; ++r)
        o = t[r], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function l1(e, t, r) {
  return function() {
    var i = this.__on, s, o = o1(t);
    if (i) {
      for (var a = 0, n = i.length; a < n; ++a)
        if ((s = i[a]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = r), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, r), s = { type: e.type, name: e.name, value: t, listener: o, options: r }, i ? i.push(s) : this.__on = [s];
  };
}
function h1(e, t, r) {
  var i = a1(e + ""), s, o = i.length, a;
  if (arguments.length < 2) {
    var n = this.node().__on;
    if (n) {
      for (var l = 0, c = n.length, h; l < c; ++l)
        for (s = 0, h = n[l]; s < o; ++s)
          if ((a = i[s]).type === h.type && a.name === h.name)
            return h.value;
    }
    return;
  }
  for (n = t ? l1 : n1, s = 0; s < o; ++s) this.each(n(i[s], t, r));
  return this;
}
function kf(e, t, r) {
  var i = mf(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, r) : (s = i.document.createEvent("Event"), r ? (s.initEvent(t, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function c1(e, t) {
  return function() {
    return kf(this, e, t);
  };
}
function u1(e, t) {
  return function() {
    return kf(this, e, t.apply(this, arguments));
  };
}
function d1(e, t) {
  return this.each((typeof t == "function" ? u1 : c1)(e, t));
}
function* f1() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var i = e[t], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && (yield a);
}
var wf = [null];
function Be(e, t) {
  this._groups = e, this._parents = t;
}
function Bs() {
  return new Be([[document.documentElement]], wf);
}
function p1() {
  return this;
}
Be.prototype = Bs.prototype = {
  constructor: Be,
  select: qb,
  selectAll: Yb,
  selectChild: Xb,
  selectChildren: Qb,
  filter: Jb,
  data: ok,
  enter: tk,
  exit: nk,
  join: lk,
  merge: hk,
  selection: p1,
  order: ck,
  sort: uk,
  call: fk,
  nodes: pk,
  node: gk,
  size: mk,
  empty: yk,
  each: xk,
  attr: _k,
  style: Fk,
  property: $k,
  classed: Pk,
  text: Wk,
  html: Uk,
  raise: Gk,
  lower: Vk,
  append: Zk,
  insert: Qk,
  remove: t1,
  clone: i1,
  datum: s1,
  on: h1,
  dispatch: d1,
  [Symbol.iterator]: f1
};
function $t(e) {
  return typeof e == "string" ? new Be([[document.querySelector(e)]], [document.documentElement]) : new Be([[e]], wf);
}
function Ul(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function Sf(e, t) {
  var r = Object.create(e.prototype);
  for (var i in t) r[i] = t[i];
  return r;
}
function vs() {
}
var xs = 0.7, Ao = 1 / xs, vi = "\\s*([+-]?\\d+)\\s*", Cs = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ir = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", g1 = /^#([0-9a-f]{3,8})$/, m1 = new RegExp(`^rgb\\(${vi},${vi},${vi}\\)$`), y1 = new RegExp(`^rgb\\(${ir},${ir},${ir}\\)$`), x1 = new RegExp(`^rgba\\(${vi},${vi},${vi},${Cs}\\)$`), C1 = new RegExp(`^rgba\\(${ir},${ir},${ir},${Cs}\\)$`), b1 = new RegExp(`^hsl\\(${Cs},${ir},${ir}\\)$`), k1 = new RegExp(`^hsla\\(${Cs},${ir},${ir},${Cs}\\)$`), Kc = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ul(vs, bs, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qc,
  // Deprecated! Use color.formatHex.
  formatHex: Qc,
  formatHex8: w1,
  formatHsl: S1,
  formatRgb: Jc,
  toString: Jc
});
function Qc() {
  return this.rgb().formatHex();
}
function w1() {
  return this.rgb().formatHex8();
}
function S1() {
  return Tf(this).formatHsl();
}
function Jc() {
  return this.rgb().formatRgb();
}
function bs(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = g1.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? tu(t) : r === 3 ? new be(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? js(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? js(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = m1.exec(e)) ? new be(t[1], t[2], t[3], 1) : (t = y1.exec(e)) ? new be(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = x1.exec(e)) ? js(t[1], t[2], t[3], t[4]) : (t = C1.exec(e)) ? js(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = b1.exec(e)) ? iu(t[1], t[2] / 100, t[3] / 100, 1) : (t = k1.exec(e)) ? iu(t[1], t[2] / 100, t[3] / 100, t[4]) : Kc.hasOwnProperty(e) ? tu(Kc[e]) : e === "transparent" ? new be(NaN, NaN, NaN, 0) : null;
}
function tu(e) {
  return new be(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function js(e, t, r, i) {
  return i <= 0 && (e = t = r = NaN), new be(e, t, r, i);
}
function T1(e) {
  return e instanceof vs || (e = bs(e)), e ? (e = e.rgb(), new be(e.r, e.g, e.b, e.opacity)) : new be();
}
function Nn(e, t, r, i) {
  return arguments.length === 1 ? T1(e) : new be(e, t, r, i ?? 1);
}
function be(e, t, r, i) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +i;
}
Ul(be, Nn, Sf(vs, {
  brighter(e) {
    return e = e == null ? Ao : Math.pow(Ao, e), new be(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xs : Math.pow(xs, e), new be(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new be(ei(this.r), ei(this.g), ei(this.b), Mo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: eu,
  // Deprecated! Use color.formatHex.
  formatHex: eu,
  formatHex8: _1,
  formatRgb: ru,
  toString: ru
}));
function eu() {
  return `#${ti(this.r)}${ti(this.g)}${ti(this.b)}`;
}
function _1() {
  return `#${ti(this.r)}${ti(this.g)}${ti(this.b)}${ti((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ru() {
  const e = Mo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ei(this.r)}, ${ei(this.g)}, ${ei(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Mo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ei(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ti(e) {
  return e = ei(e), (e < 16 ? "0" : "") + e.toString(16);
}
function iu(e, t, r, i) {
  return i <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, r, i);
}
function Tf(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof vs || (e = bs(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, i = e.b / 255, s = Math.min(t, r, i), o = Math.max(t, r, i), a = NaN, n = o - s, l = (o + s) / 2;
  return n ? (t === o ? a = (r - i) / n + (r < i) * 6 : r === o ? a = (i - t) / n + 2 : a = (t - r) / n + 4, n /= l < 0.5 ? o + s : 2 - o - s, a *= 60) : n = l > 0 && l < 1 ? 0 : a, new He(a, n, l, e.opacity);
}
function B1(e, t, r, i) {
  return arguments.length === 1 ? Tf(e) : new He(e, t, r, i ?? 1);
}
function He(e, t, r, i) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +i;
}
Ul(He, B1, Sf(vs, {
  brighter(e) {
    return e = e == null ? Ao : Math.pow(Ao, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xs : Math.pow(xs, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, i = r + (r < 0.5 ? r : 1 - r) * t, s = 2 * r - i;
    return new be(
      dn(e >= 240 ? e - 240 : e + 120, s, i),
      dn(e, s, i),
      dn(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new He(su(this.h), Gs(this.s), Gs(this.l), Mo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Mo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${su(this.h)}, ${Gs(this.s) * 100}%, ${Gs(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function su(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Gs(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function dn(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const jl = (e) => () => e;
function _f(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function v1(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(i) {
    return Math.pow(e + i * t, r);
  };
}
function KA(e, t) {
  var r = t - e;
  return r ? _f(e, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r) : jl(isNaN(e) ? t : e);
}
function L1(e) {
  return (e = +e) == 1 ? Bf : function(t, r) {
    return r - t ? v1(t, r, e) : jl(isNaN(t) ? r : t);
  };
}
function Bf(e, t) {
  var r = t - e;
  return r ? _f(e, r) : jl(isNaN(e) ? t : e);
}
const ou = (function e(t) {
  var r = L1(t);
  function i(s, o) {
    var a = r((s = Nn(s)).r, (o = Nn(o)).r), n = r(s.g, o.g), l = r(s.b, o.b), c = Bf(s.opacity, o.opacity);
    return function(h) {
      return s.r = a(h), s.g = n(h), s.b = l(h), s.opacity = c(h), s + "";
    };
  }
  return i.gamma = e, i;
})(1);
function Pr(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
var qn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, fn = new RegExp(qn.source, "g");
function F1(e) {
  return function() {
    return e;
  };
}
function A1(e) {
  return function(t) {
    return e(t) + "";
  };
}
function M1(e, t) {
  var r = qn.lastIndex = fn.lastIndex = 0, i, s, o, a = -1, n = [], l = [];
  for (e = e + "", t = t + ""; (i = qn.exec(e)) && (s = fn.exec(t)); )
    (o = s.index) > r && (o = t.slice(r, o), n[a] ? n[a] += o : n[++a] = o), (i = i[0]) === (s = s[0]) ? n[a] ? n[a] += s : n[++a] = s : (n[++a] = null, l.push({ i: a, x: Pr(i, s) })), r = fn.lastIndex;
  return r < t.length && (o = t.slice(r), n[a] ? n[a] += o : n[++a] = o), n.length < 2 ? l[0] ? A1(l[0].x) : F1(t) : (t = l.length, function(c) {
    for (var h = 0, u; h < t; ++h) n[(u = l[h]).i] = u.x(c);
    return n.join("");
  });
}
var au = 180 / Math.PI, Wn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function vf(e, t, r, i, s, o) {
  var a, n, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * r + t * i) && (r -= e * l, i -= t * l), (n = Math.sqrt(r * r + i * i)) && (r /= n, i /= n, l /= n), e * i < t * r && (e = -e, t = -t, l = -l, a = -a), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * au,
    skewX: Math.atan(l) * au,
    scaleX: a,
    scaleY: n
  };
}
var Xs;
function E1(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Wn : vf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function $1(e) {
  return e == null || (Xs || (Xs = document.createElementNS("http://www.w3.org/2000/svg", "g")), Xs.setAttribute("transform", e), !(e = Xs.transform.baseVal.consolidate())) ? Wn : (e = e.matrix, vf(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Lf(e, t, r, i) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, u, f, p, m) {
    if (c !== u || h !== f) {
      var y = p.push("translate(", null, t, null, r);
      m.push({ i: y - 4, x: Pr(c, u) }, { i: y - 2, x: Pr(h, f) });
    } else (u || f) && p.push("translate(" + u + t + f + r);
  }
  function a(c, h, u, f) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), f.push({ i: u.push(s(u) + "rotate(", null, i) - 2, x: Pr(c, h) })) : h && u.push(s(u) + "rotate(" + h + i);
  }
  function n(c, h, u, f) {
    c !== h ? f.push({ i: u.push(s(u) + "skewX(", null, i) - 2, x: Pr(c, h) }) : h && u.push(s(u) + "skewX(" + h + i);
  }
  function l(c, h, u, f, p, m) {
    if (c !== u || h !== f) {
      var y = p.push(s(p) + "scale(", null, ",", null, ")");
      m.push({ i: y - 4, x: Pr(c, u) }, { i: y - 2, x: Pr(h, f) });
    } else (u !== 1 || f !== 1) && p.push(s(p) + "scale(" + u + "," + f + ")");
  }
  return function(c, h) {
    var u = [], f = [];
    return c = e(c), h = e(h), o(c.translateX, c.translateY, h.translateX, h.translateY, u, f), a(c.rotate, h.rotate, u, f), n(c.skewX, h.skewX, u, f), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, u, f), c = h = null, function(p) {
      for (var m = -1, y = f.length, x; ++m < y; ) u[(x = f[m]).i] = x.x(p);
      return u.join("");
    };
  };
}
var O1 = Lf(E1, "px, ", "px)", "deg)"), D1 = Lf($1, ", ", ")", ")"), Mi = 0, rs = 0, Ui = 0, Ff = 1e3, Eo, is, $o = 0, si = 0, ra = 0, ks = typeof performance == "object" && performance.now ? performance : Date, Af = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Gl() {
  return si || (Af(I1), si = ks.now() + ra);
}
function I1() {
  si = 0;
}
function Oo() {
  this._call = this._time = this._next = null;
}
Oo.prototype = Mf.prototype = {
  constructor: Oo,
  restart: function(e, t, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Gl() : +r) + (t == null ? 0 : +t), !this._next && is !== this && (is ? is._next = this : Eo = this, is = this), this._call = e, this._time = r, zn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, zn());
  }
};
function Mf(e, t, r) {
  var i = new Oo();
  return i.restart(e, t, r), i;
}
function P1() {
  Gl(), ++Mi;
  for (var e = Eo, t; e; )
    (t = si - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Mi;
}
function nu() {
  si = ($o = ks.now()) + ra, Mi = rs = 0;
  try {
    P1();
  } finally {
    Mi = 0, N1(), si = 0;
  }
}
function R1() {
  var e = ks.now(), t = e - $o;
  t > Ff && (ra -= t, $o = e);
}
function N1() {
  for (var e, t = Eo, r, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (r = t._next, t._next = null, t = e ? e._next = r : Eo = r);
  is = e, zn(i);
}
function zn(e) {
  if (!Mi) {
    rs && (rs = clearTimeout(rs));
    var t = e - si;
    t > 24 ? (e < 1 / 0 && (rs = setTimeout(nu, e - ks.now() - ra)), Ui && (Ui = clearInterval(Ui))) : (Ui || ($o = ks.now(), Ui = setInterval(R1, Ff)), Mi = 1, Af(nu));
  }
}
function lu(e, t, r) {
  var i = new Oo();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, r), i;
}
var q1 = cf("start", "end", "cancel", "interrupt"), W1 = [], Ef = 0, hu = 1, Hn = 2, ho = 3, cu = 4, Yn = 5, co = 6;
function ia(e, t, r, i, s, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (r in a) return;
  z1(e, r, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: q1,
    tween: W1,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Ef
  });
}
function Xl(e, t) {
  var r = Ge(e, t);
  if (r.state > Ef) throw new Error("too late; already scheduled");
  return r;
}
function nr(e, t) {
  var r = Ge(e, t);
  if (r.state > ho) throw new Error("too late; already running");
  return r;
}
function Ge(e, t) {
  var r = e.__transition;
  if (!r || !(r = r[t])) throw new Error("transition not found");
  return r;
}
function z1(e, t, r) {
  var i = e.__transition, s;
  i[t] = r, r.timer = Mf(o, 0, r.time);
  function o(c) {
    r.state = hu, r.timer.restart(a, r.delay, r.time), r.delay <= c && a(c - r.delay);
  }
  function a(c) {
    var h, u, f, p;
    if (r.state !== hu) return l();
    for (h in i)
      if (p = i[h], p.name === r.name) {
        if (p.state === ho) return lu(a);
        p.state === cu ? (p.state = co, p.timer.stop(), p.on.call("interrupt", e, e.__data__, p.index, p.group), delete i[h]) : +h < t && (p.state = co, p.timer.stop(), p.on.call("cancel", e, e.__data__, p.index, p.group), delete i[h]);
      }
    if (lu(function() {
      r.state === ho && (r.state = cu, r.timer.restart(n, r.delay, r.time), n(c));
    }), r.state = Hn, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Hn) {
      for (r.state = ho, s = new Array(f = r.tween.length), h = 0, u = -1; h < f; ++h)
        (p = r.tween[h].value.call(e, e.__data__, r.index, r.group)) && (s[++u] = p);
      s.length = u + 1;
    }
  }
  function n(c) {
    for (var h = c < r.duration ? r.ease.call(null, c / r.duration) : (r.timer.restart(l), r.state = Yn, 1), u = -1, f = s.length; ++u < f; )
      s[u].call(e, h);
    r.state === Yn && (r.on.call("end", e, e.__data__, r.index, r.group), l());
  }
  function l() {
    r.state = co, r.timer.stop(), delete i[t];
    for (var c in i) return;
    delete e.__transition;
  }
}
function H1(e, t) {
  var r = e.__transition, i, s, o = !0, a;
  if (r) {
    t = t == null ? null : t + "";
    for (a in r) {
      if ((i = r[a]).name !== t) {
        o = !1;
        continue;
      }
      s = i.state > Hn && i.state < Yn, i.state = co, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete r[a];
    }
    o && delete e.__transition;
  }
}
function Y1(e) {
  return this.each(function() {
    H1(this, e);
  });
}
function U1(e, t) {
  var r, i;
  return function() {
    var s = nr(this, e), o = s.tween;
    if (o !== r) {
      i = r = o;
      for (var a = 0, n = i.length; a < n; ++a)
        if (i[a].name === t) {
          i = i.slice(), i.splice(a, 1);
          break;
        }
    }
    s.tween = i;
  };
}
function j1(e, t, r) {
  var i, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var o = nr(this, e), a = o.tween;
    if (a !== i) {
      s = (i = a).slice();
      for (var n = { name: t, value: r }, l = 0, c = s.length; l < c; ++l)
        if (s[l].name === t) {
          s[l] = n;
          break;
        }
      l === c && s.push(n);
    }
    o.tween = s;
  };
}
function G1(e, t) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Ge(this.node(), r).tween, s = 0, o = i.length, a; s < o; ++s)
      if ((a = i[s]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? U1 : j1)(r, e, t));
}
function Vl(e, t, r) {
  var i = e._id;
  return e.each(function() {
    var s = nr(this, i);
    (s.value || (s.value = {}))[t] = r.apply(this, arguments);
  }), function(s) {
    return Ge(s, i).value[t];
  };
}
function $f(e, t) {
  var r;
  return (typeof t == "number" ? Pr : t instanceof bs ? ou : (r = bs(t)) ? (t = r, ou) : M1)(e, t);
}
function X1(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function V1(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Z1(e, t, r) {
  var i, s = r + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === s ? null : a === i ? o : o = t(i = a, r);
  };
}
function K1(e, t, r) {
  var i, s = r + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === s ? null : a === i ? o : o = t(i = a, r);
  };
}
function Q1(e, t, r) {
  var i, s, o;
  return function() {
    var a, n = r(this), l;
    return n == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = n + "", a === l ? null : a === i && l === s ? o : (s = l, o = t(i = a, n)));
  };
}
function J1(e, t, r) {
  var i, s, o;
  return function() {
    var a, n = r(this), l;
    return n == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = n + "", a === l ? null : a === i && l === s ? o : (s = l, o = t(i = a, n)));
  };
}
function t2(e, t) {
  var r = ea(e), i = r === "transform" ? D1 : $f;
  return this.attrTween(e, typeof t == "function" ? (r.local ? J1 : Q1)(r, i, Vl(this, "attr." + e, t)) : t == null ? (r.local ? V1 : X1)(r) : (r.local ? K1 : Z1)(r, i, t));
}
function e2(e, t) {
  return function(r) {
    this.setAttribute(e, t.call(this, r));
  };
}
function r2(e, t) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, t.call(this, r));
  };
}
function i2(e, t) {
  var r, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (r = (i = o) && r2(e, o)), r;
  }
  return s._value = t, s;
}
function s2(e, t) {
  var r, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (r = (i = o) && e2(e, o)), r;
  }
  return s._value = t, s;
}
function o2(e, t) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  var i = ea(e);
  return this.tween(r, (i.local ? i2 : s2)(i, t));
}
function a2(e, t) {
  return function() {
    Xl(this, e).delay = +t.apply(this, arguments);
  };
}
function n2(e, t) {
  return t = +t, function() {
    Xl(this, e).delay = t;
  };
}
function l2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? a2 : n2)(t, e)) : Ge(this.node(), t).delay;
}
function h2(e, t) {
  return function() {
    nr(this, e).duration = +t.apply(this, arguments);
  };
}
function c2(e, t) {
  return t = +t, function() {
    nr(this, e).duration = t;
  };
}
function u2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? h2 : c2)(t, e)) : Ge(this.node(), t).duration;
}
function d2(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    nr(this, e).ease = t;
  };
}
function f2(e) {
  var t = this._id;
  return arguments.length ? this.each(d2(t, e)) : Ge(this.node(), t).ease;
}
function p2(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    nr(this, e).ease = r;
  };
}
function g2(e) {
  if (typeof e != "function") throw new Error();
  return this.each(p2(this._id, e));
}
function m2(e) {
  typeof e != "function" && (e = ff(e));
  for (var t = this._groups, r = t.length, i = new Array(r), s = 0; s < r; ++s)
    for (var o = t[s], a = o.length, n = i[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && n.push(l);
  return new Sr(i, this._parents, this._name, this._id);
}
function y2(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, r = e._groups, i = t.length, s = r.length, o = Math.min(i, s), a = new Array(i), n = 0; n < o; ++n)
    for (var l = t[n], c = r[n], h = l.length, u = a[n] = new Array(h), f, p = 0; p < h; ++p)
      (f = l[p] || c[p]) && (u[p] = f);
  for (; n < i; ++n)
    a[n] = t[n];
  return new Sr(a, this._parents, this._name, this._id);
}
function x2(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var r = t.indexOf(".");
    return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
  });
}
function C2(e, t, r) {
  var i, s, o = x2(t) ? Xl : nr;
  return function() {
    var a = o(this, e), n = a.on;
    n !== i && (s = (i = n).copy()).on(t, r), a.on = s;
  };
}
function b2(e, t) {
  var r = this._id;
  return arguments.length < 2 ? Ge(this.node(), r).on.on(e) : this.each(C2(r, e, t));
}
function k2(e) {
  return function() {
    var t = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    t && t.removeChild(this);
  };
}
function w2() {
  return this.on("end.remove", k2(this._id));
}
function S2(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = Hl(e));
  for (var i = this._groups, s = i.length, o = new Array(s), a = 0; a < s; ++a)
    for (var n = i[a], l = n.length, c = o[a] = new Array(l), h, u, f = 0; f < l; ++f)
      (h = n[f]) && (u = e.call(h, h.__data__, f, n)) && ("__data__" in h && (u.__data__ = h.__data__), c[f] = u, ia(c[f], t, r, f, c, Ge(h, r)));
  return new Sr(o, this._parents, t, r);
}
function T2(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = df(e));
  for (var i = this._groups, s = i.length, o = [], a = [], n = 0; n < s; ++n)
    for (var l = i[n], c = l.length, h, u = 0; u < c; ++u)
      if (h = l[u]) {
        for (var f = e.call(h, h.__data__, u, l), p, m = Ge(h, r), y = 0, x = f.length; y < x; ++y)
          (p = f[y]) && ia(p, t, r, y, f, m);
        o.push(f), a.push(h);
      }
  return new Sr(o, a, t, r);
}
var _2 = Bs.prototype.constructor;
function B2() {
  return new _2(this._groups, this._parents);
}
function v2(e, t) {
  var r, i, s;
  return function() {
    var o = Ai(this, e), a = (this.style.removeProperty(e), Ai(this, e));
    return o === a ? null : o === r && a === i ? s : s = t(r = o, i = a);
  };
}
function Of(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function L2(e, t, r) {
  var i, s = r + "", o;
  return function() {
    var a = Ai(this, e);
    return a === s ? null : a === i ? o : o = t(i = a, r);
  };
}
function F2(e, t, r) {
  var i, s, o;
  return function() {
    var a = Ai(this, e), n = r(this), l = n + "";
    return n == null && (l = n = (this.style.removeProperty(e), Ai(this, e))), a === l ? null : a === i && l === s ? o : (s = l, o = t(i = a, n));
  };
}
function A2(e, t) {
  var r, i, s, o = "style." + t, a = "end." + o, n;
  return function() {
    var l = nr(this, e), c = l.on, h = l.value[o] == null ? n || (n = Of(t)) : void 0;
    (c !== r || s !== h) && (i = (r = c).copy()).on(a, s = h), l.on = i;
  };
}
function M2(e, t, r) {
  var i = (e += "") == "transform" ? O1 : $f;
  return t == null ? this.styleTween(e, v2(e, i)).on("end.style." + e, Of(e)) : typeof t == "function" ? this.styleTween(e, F2(e, i, Vl(this, "style." + e, t))).each(A2(this._id, e)) : this.styleTween(e, L2(e, i, t), r).on("end.style." + e, null);
}
function E2(e, t, r) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), r);
  };
}
function $2(e, t, r) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && E2(e, a, r)), i;
  }
  return o._value = t, o;
}
function O2(e, t, r) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, $2(e, t, r ?? ""));
}
function D2(e) {
  return function() {
    this.textContent = e;
  };
}
function I2(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function P2(e) {
  return this.tween("text", typeof e == "function" ? I2(Vl(this, "text", e)) : D2(e == null ? "" : e + ""));
}
function R2(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function N2(e) {
  var t, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (t = (r = s) && R2(s)), t;
  }
  return i._value = e, i;
}
function q2(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, N2(e));
}
function W2() {
  for (var e = this._name, t = this._id, r = Df(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var a = i[o], n = a.length, l, c = 0; c < n; ++c)
      if (l = a[c]) {
        var h = Ge(l, t);
        ia(l, e, r, c, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Sr(i, this._parents, e, r);
}
function z2() {
  var e, t, r = this, i = r._id, s = r.size();
  return new Promise(function(o, a) {
    var n = { value: a }, l = { value: function() {
      --s === 0 && o();
    } };
    r.each(function() {
      var c = nr(this, i), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(n), t._.interrupt.push(n), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var H2 = 0;
function Sr(e, t, r, i) {
  this._groups = e, this._parents = t, this._name = r, this._id = i;
}
function Df() {
  return ++H2;
}
var gr = Bs.prototype;
Sr.prototype = {
  constructor: Sr,
  select: S2,
  selectAll: T2,
  selectChild: gr.selectChild,
  selectChildren: gr.selectChildren,
  filter: m2,
  merge: y2,
  selection: B2,
  transition: W2,
  call: gr.call,
  nodes: gr.nodes,
  node: gr.node,
  size: gr.size,
  empty: gr.empty,
  each: gr.each,
  on: b2,
  attr: t2,
  attrTween: o2,
  style: M2,
  styleTween: O2,
  text: P2,
  textTween: q2,
  remove: w2,
  tween: G1,
  delay: l2,
  duration: u2,
  ease: f2,
  easeVarying: g2,
  end: z2,
  [Symbol.iterator]: gr[Symbol.iterator]
};
function Y2(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var U2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Y2
};
function j2(e, t) {
  for (var r; !(r = e.__transition) || !(r = r[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return r;
}
function G2(e) {
  var t, r;
  e instanceof Sr ? (t = e._id, e = e._name) : (t = Df(), (r = U2).time = Gl(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var a = i[o], n = a.length, l, c = 0; c < n; ++c)
      (l = a[c]) && ia(l, e, t, c, a, r || j2(l, t));
  return new Sr(i, this._parents, e, t);
}
Bs.prototype.interrupt = Y1;
Bs.prototype.transition = G2;
const Un = Math.PI, jn = 2 * Un, Kr = 1e-6, X2 = jn - Kr;
function If(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function V2(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return If;
  const r = 10 ** t;
  return function(i) {
    this._ += i[0];
    for (let s = 1, o = i.length; s < o; ++s)
      this._ += Math.round(arguments[s] * r) / r + i[s];
  };
}
class Z2 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? If : V2(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, i, s) {
    this._append`Q${+t},${+r},${this._x1 = +i},${this._y1 = +s}`;
  }
  bezierCurveTo(t, r, i, s, o, a) {
    this._append`C${+t},${+r},${+i},${+s},${this._x1 = +o},${this._y1 = +a}`;
  }
  arcTo(t, r, i, s, o) {
    if (t = +t, r = +r, i = +i, s = +s, o = +o, o < 0) throw new Error(`negative radius: ${o}`);
    let a = this._x1, n = this._y1, l = i - t, c = s - r, h = a - t, u = n - r, f = h * h + u * u;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (f > Kr) if (!(Math.abs(u * l - c * h) > Kr) || !o)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let p = i - a, m = s - n, y = l * l + c * c, x = p * p + m * m, C = Math.sqrt(y), b = Math.sqrt(f), S = o * Math.tan((Un - Math.acos((y + f - x) / (2 * C * b))) / 2), _ = S / b, B = S / C;
      Math.abs(_ - 1) > Kr && this._append`L${t + _ * h},${r + _ * u}`, this._append`A${o},${o},0,0,${+(u * p > h * m)},${this._x1 = t + B * l},${this._y1 = r + B * c}`;
    }
  }
  arc(t, r, i, s, o, a) {
    if (t = +t, r = +r, i = +i, a = !!a, i < 0) throw new Error(`negative radius: ${i}`);
    let n = i * Math.cos(s), l = i * Math.sin(s), c = t + n, h = r + l, u = 1 ^ a, f = a ? s - o : o - s;
    this._x1 === null ? this._append`M${c},${h}` : (Math.abs(this._x1 - c) > Kr || Math.abs(this._y1 - h) > Kr) && this._append`L${c},${h}`, i && (f < 0 && (f = f % jn + jn), f > X2 ? this._append`A${i},${i},0,1,${u},${t - n},${r - l}A${i},${i},0,1,${u},${this._x1 = c},${this._y1 = h}` : f > Kr && this._append`A${i},${i},0,${+(f >= Un)},${u},${this._x1 = t + i * Math.cos(o)},${this._y1 = r + i * Math.sin(o)}`);
  }
  rect(t, r, i, s) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${i = +i}v${+s}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function pi(e) {
  return function() {
    return e;
  };
}
const QA = Math.abs, JA = Math.atan2, tM = Math.cos, eM = Math.max, rM = Math.min, iM = Math.sin, sM = Math.sqrt, uu = 1e-12, Zl = Math.PI, du = Zl / 2, oM = 2 * Zl;
function aM(e) {
  return e > 1 ? 0 : e < -1 ? Zl : Math.acos(e);
}
function nM(e) {
  return e >= 1 ? du : e <= -1 ? -du : Math.asin(e);
}
function K2(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const i = Math.floor(r);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = i;
    }
    return e;
  }, () => new Z2(t);
}
function Q2(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Pf(e) {
  this._context = e;
}
Pf.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function ps(e) {
  return new Pf(e);
}
function J2(e) {
  return e[0];
}
function tw(e) {
  return e[1];
}
function ew(e, t) {
  var r = pi(!0), i = null, s = ps, o = null, a = K2(n);
  e = typeof e == "function" ? e : e === void 0 ? J2 : pi(e), t = typeof t == "function" ? t : t === void 0 ? tw : pi(t);
  function n(l) {
    var c, h = (l = Q2(l)).length, u, f = !1, p;
    for (i == null && (o = s(p = a())), c = 0; c <= h; ++c)
      !(c < h && r(u = l[c], c, l)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+e(u, c, l), +t(u, c, l));
    if (p) return o = null, p + "" || null;
  }
  return n.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : pi(+l), n) : e;
  }, n.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : pi(+l), n) : t;
  }, n.defined = function(l) {
    return arguments.length ? (r = typeof l == "function" ? l : pi(!!l), n) : r;
  }, n.curve = function(l) {
    return arguments.length ? (s = l, i != null && (o = s(i)), n) : s;
  }, n.context = function(l) {
    return arguments.length ? (l == null ? i = o = null : o = s(i = l), n) : i;
  }, n;
}
class Rf {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function Nf(e) {
  return new Rf(e, !0);
}
function qf(e) {
  return new Rf(e, !1);
}
function Wr() {
}
function Do(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function sa(e) {
  this._context = e;
}
sa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Do(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        Do(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function Gn(e) {
  return new sa(e);
}
function Wf(e) {
  this._context = e;
}
Wf.prototype = {
  areaStart: Wr,
  areaEnd: Wr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        Do(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function rw(e) {
  return new Wf(e);
}
function zf(e) {
  this._context = e;
}
zf.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, i = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, i) : this._context.moveTo(r, i);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        Do(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function iw(e) {
  return new zf(e);
}
function Hf(e, t) {
  this._basis = new sa(e), this._beta = t;
}
Hf.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length - 1;
    if (r > 0)
      for (var i = e[0], s = t[0], o = e[r] - i, a = t[r] - s, n = -1, l; ++n <= r; )
        l = n / r, this._basis.point(
          this._beta * e[n] + (1 - this._beta) * (i + l * o),
          this._beta * t[n] + (1 - this._beta) * (s + l * a)
        );
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
const sw = (function e(t) {
  function r(i) {
    return t === 1 ? new sa(i) : new Hf(i, t);
  }
  return r.beta = function(i) {
    return e(+i);
  }, r;
})(0.85);
function Io(e, t, r) {
  e._context.bezierCurveTo(
    e._x1 + e._k * (e._x2 - e._x0),
    e._y1 + e._k * (e._y2 - e._y0),
    e._x2 + e._k * (e._x1 - t),
    e._y2 + e._k * (e._y1 - r),
    e._x2,
    e._y2
  );
}
function Kl(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Kl.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        Io(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2, this._x1 = e, this._y1 = t;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        Io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const Yf = (function e(t) {
  function r(i) {
    return new Kl(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
})(0);
function Ql(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Ql.prototype = {
  areaStart: Wr,
  areaEnd: Wr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        Io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const ow = (function e(t) {
  function r(i) {
    return new Ql(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
})(0);
function Jl(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Jl.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        Io(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const aw = (function e(t) {
  function r(i) {
    return new Jl(i, t);
  }
  return r.tension = function(i) {
    return e(+i);
  }, r;
})(0);
function th(e, t, r) {
  var i = e._x1, s = e._y1, o = e._x2, a = e._y2;
  if (e._l01_a > uu) {
    var n = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a, l = 3 * e._l01_a * (e._l01_a + e._l12_a);
    i = (i * n - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / l, s = (s * n - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / l;
  }
  if (e._l23_a > uu) {
    var c = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a, h = 3 * e._l23_a * (e._l23_a + e._l12_a);
    o = (o * c + e._x1 * e._l23_2a - t * e._l12_2a) / h, a = (a * c + e._y1 * e._l23_2a - r * e._l12_2a) / h;
  }
  e._context.bezierCurveTo(i, s, o, a, e._x2, e._y2);
}
function Uf(e, t) {
  this._context = e, this._alpha = t;
}
Uf.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        th(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const jf = (function e(t) {
  function r(i) {
    return t ? new Uf(i, t) : new Kl(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
})(0.5);
function Gf(e, t) {
  this._context = e, this._alpha = t;
}
Gf.prototype = {
  areaStart: Wr,
  areaEnd: Wr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        th(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const nw = (function e(t) {
  function r(i) {
    return t ? new Gf(i, t) : new Ql(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
})(0.5);
function Xf(e, t) {
  this._context = e, this._alpha = t;
}
Xf.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, i = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + i * i, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        th(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const lw = (function e(t) {
  function r(i) {
    return t ? new Xf(i, t) : new Jl(i, 0);
  }
  return r.alpha = function(i) {
    return e(+i);
  }, r;
})(0.5);
function Vf(e) {
  this._context = e;
}
Vf.prototype = {
  areaStart: Wr,
  areaEnd: Wr,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function hw(e) {
  return new Vf(e);
}
function fu(e) {
  return e < 0 ? -1 : 1;
}
function pu(e, t, r) {
  var i = e._x1 - e._x0, s = t - e._x1, o = (e._y1 - e._y0) / (i || s < 0 && -0), a = (r - e._y1) / (s || i < 0 && -0), n = (o * s + a * i) / (i + s);
  return (fu(o) + fu(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(n)) || 0;
}
function gu(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function pn(e, t, r) {
  var i = e._x0, s = e._y0, o = e._x1, a = e._y1, n = (o - i) / 3;
  e._context.bezierCurveTo(i + n, s + n * t, o - n, a - n * r, o, a);
}
function Po(e) {
  this._context = e;
}
Po.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        pn(this, this._t0, gu(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, pn(this, gu(this, r = pu(this, e, t)), r);
          break;
        default:
          pn(this, this._t0, r = pu(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function Zf(e) {
  this._context = new Kf(e);
}
(Zf.prototype = Object.create(Po.prototype)).point = function(e, t) {
  Po.prototype.point.call(this, t, e);
};
function Kf(e) {
  this._context = e;
}
Kf.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, i, s, o) {
    this._context.bezierCurveTo(t, e, i, r, o, s);
  }
};
function Qf(e) {
  return new Po(e);
}
function Jf(e) {
  return new Zf(e);
}
function tp(e) {
  this._context = e;
}
tp.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var i = mu(e), s = mu(t), o = 0, a = 1; a < r; ++o, ++a)
          this._context.bezierCurveTo(i[0][o], s[0][o], i[1][o], s[1][o], e[a], t[a]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function mu(e) {
  var t, r = e.length - 1, i, s = new Array(r), o = new Array(r), a = new Array(r);
  for (s[0] = 0, o[0] = 2, a[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) s[t] = 1, o[t] = 4, a[t] = 4 * e[t] + 2 * e[t + 1];
  for (s[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) i = s[t] / o[t - 1], o[t] -= i, a[t] -= i * a[t - 1];
  for (s[r - 1] = a[r - 1] / o[r - 1], t = r - 2; t >= 0; --t) s[t] = (a[t] - s[t + 1]) / o[t];
  for (o[r - 1] = (e[r] + s[r - 1]) / 2, t = 0; t < r - 1; ++t) o[t] = 2 * e[t + 1] - s[t + 1];
  return [s, o];
}
function ep(e) {
  return new tp(e);
}
function oa(e, t) {
  this._context = e, this._t = t;
}
oa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function rp(e) {
  return new oa(e, 0.5);
}
function ip(e) {
  return new oa(e, 0);
}
function sp(e) {
  return new oa(e, 1);
}
function ss(e, t, r) {
  this.k = e, this.x = t, this.y = r;
}
ss.prototype = {
  constructor: ss,
  scale: function(e) {
    return e === 1 ? this : new ss(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ss(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
ss.prototype;
function gn(e) {
  if (typeof e != "object" || e == null) return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  if (Object.prototype.toString.call(e) !== "[object Object]") {
    const r = e[Symbol.toStringTag];
    return r == null || !Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)?.writable ? !1 : e.toString() === `[object ${r}]`;
  }
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function cw() {
}
function op(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function eh(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const uw = "[object RegExp]", ap = "[object String]", np = "[object Number]", lp = "[object Boolean]", hp = "[object Arguments]", dw = "[object Symbol]", fw = "[object Date]", pw = "[object Map]", gw = "[object Set]", mw = "[object Array]", yw = "[object ArrayBuffer]", xw = "[object Object]", Cw = "[object DataView]", bw = "[object Uint8Array]", kw = "[object Uint8ClampedArray]", ww = "[object Uint16Array]", Sw = "[object Uint32Array]", Tw = "[object Int8Array]", _w = "[object Int16Array]", Bw = "[object Int32Array]", vw = "[object Float32Array]", Lw = "[object Float64Array]", yu = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})() || Function("return this")();
function rh(e) {
  return typeof yu.Buffer < "u" && yu.Buffer.isBuffer(e);
}
function Fw(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function cp(e) {
  return e != null && typeof e != "function" && Fw(e.length);
}
function Aw(e) {
  return e === "__proto__";
}
function ih(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function sh(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Mw(e, t) {
  return Si(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Si(e, t, r, i = /* @__PURE__ */ new Map(), s = void 0) {
  const o = s?.(e, t, r, i);
  if (o !== void 0) return o;
  if (ih(e)) return e;
  if (i.has(e)) return i.get(e);
  if (Array.isArray(e)) {
    const a = new Array(e.length);
    i.set(e, a);
    for (let n = 0; n < e.length; n++) a[n] = Si(e[n], n, r, i, s);
    return Object.hasOwn(e, "index") && (a.index = e.index), Object.hasOwn(e, "input") && (a.input = e.input), a;
  }
  if (e instanceof Date) return new Date(e.getTime());
  if (e instanceof RegExp) {
    const a = new RegExp(e.source, e.flags);
    return a.lastIndex = e.lastIndex, a;
  }
  if (e instanceof Map) {
    const a = /* @__PURE__ */ new Map();
    i.set(e, a);
    for (const [n, l] of e) a.set(n, Si(l, n, r, i, s));
    return a;
  }
  if (e instanceof Set) {
    const a = /* @__PURE__ */ new Set();
    i.set(e, a);
    for (const n of e) a.add(Si(n, void 0, r, i, s));
    return a;
  }
  if (rh(e)) return e.subarray();
  if (sh(e)) {
    const a = new (Object.getPrototypeOf(e)).constructor(e.length);
    i.set(e, a);
    for (let n = 0; n < e.length; n++) a[n] = Si(e[n], n, r, i, s);
    return a;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const a = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (typeof File < "u" && e instanceof File) {
    const a = new File([e], e.name, { type: e.type });
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const a = new Blob([e], { type: e.type });
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (e instanceof Error) {
    const a = structuredClone(e);
    return i.set(e, a), a.message = e.message, a.name = e.name, a.stack = e.stack, a.cause = e.cause, a.constructor = e.constructor, qe(a, e, r, i, s), a;
  }
  if (e instanceof Boolean) {
    const a = new Boolean(e.valueOf());
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (e instanceof Number) {
    const a = new Number(e.valueOf());
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (e instanceof String) {
    const a = new String(e.valueOf());
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  if (typeof e == "object" && Ew(e)) {
    const a = Object.create(Object.getPrototypeOf(e));
    return i.set(e, a), qe(a, e, r, i, s), a;
  }
  return e;
}
function qe(e, t, r = e, i, s) {
  const o = [...Object.keys(t), ...op(t)];
  for (let a = 0; a < o.length; a++) {
    const n = o[a], l = Object.getOwnPropertyDescriptor(e, n);
    (l == null || l.writable) && (e[n] = Si(t[n], n, r, i, s));
  }
}
function Ew(e) {
  switch (eh(e)) {
    case hp:
    case mw:
    case yw:
    case Cw:
    case lp:
    case fw:
    case vw:
    case Lw:
    case Tw:
    case _w:
    case Bw:
    case pw:
    case np:
    case xw:
    case uw:
    case gw:
    case ap:
    case dw:
    case bw:
    case kw:
    case ww:
    case Sw:
      return !0;
    default:
      return !1;
  }
}
function $w(e, t) {
  return Mw(e, (r, i, s, o) => {
    if (typeof e == "object") {
      if (eh(e) === "[object Object]" && typeof e.constructor != "function") {
        const a = {};
        return o.set(e, a), qe(a, e, s, o), a;
      }
      switch (Object.prototype.toString.call(e)) {
        case np:
        case ap:
        case lp: {
          const a = new e.constructor(e?.valueOf());
          return qe(a, e), a;
        }
        case hp: {
          const a = {};
          return qe(a, e), a.length = e.length, a[Symbol.iterator] = e[Symbol.iterator], a;
        }
        default:
          return;
      }
    }
  });
}
function xu(e) {
  return $w(e);
}
function Xn(e) {
  return e !== null && typeof e == "object" && eh(e) === "[object Arguments]";
}
function Vn(e) {
  return typeof e == "object" && e !== null;
}
function Ow(e) {
  return Vn(e) && cp(e);
}
function Ls(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError("Expected a function");
  const r = function(...i) {
    const s = t ? t.apply(this, i) : i[0], o = r.cache;
    if (o.has(s)) return o.get(s);
    const a = e.apply(this, i);
    return r.cache = o.set(s, a) || o, a;
  };
  return r.cache = new (Ls.Cache || Map)(), r;
}
Ls.Cache = Map;
function uo(e) {
  return sh(e);
}
function Dw(e) {
  const t = e?.constructor;
  return e === (typeof t == "function" ? t.prototype : Object.prototype);
}
function Iw(e) {
  if (ih(e)) return e;
  if (Array.isArray(e) || sh(e) || e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  const t = Object.getPrototypeOf(e);
  if (t == null) return Object.assign(Object.create(t), e);
  const r = t.constructor;
  if (e instanceof Date || e instanceof Map || e instanceof Set) return new r(e);
  if (e instanceof RegExp) {
    const i = new r(e);
    return i.lastIndex = e.lastIndex, i;
  }
  if (e instanceof DataView) return new r(e.buffer.slice(0));
  if (e instanceof Error) {
    let i;
    return e instanceof AggregateError ? i = new r(e.errors, e.message, { cause: e.cause }) : i = new r(e.message, { cause: e.cause }), i.stack = e.stack, Object.assign(i, e), i;
  }
  return typeof File < "u" && e instanceof File ? new r([e], e.name, {
    type: e.type,
    lastModified: e.lastModified
  }) : typeof e == "object" ? Object.assign(Object.create(t), e) : e;
}
function Pw(e, ...t) {
  const r = t.slice(0, -1), i = t[t.length - 1];
  let s = e;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    s = fo(s, a, i, /* @__PURE__ */ new Map());
  }
  return s;
}
function fo(e, t, r, i) {
  if (ih(e) && (e = Object(e)), t == null || typeof t != "object") return e;
  if (i.has(t)) return Iw(i.get(t));
  if (i.set(t, e), Array.isArray(t)) {
    t = t.slice();
    for (let o = 0; o < t.length; o++) t[o] = t[o] ?? void 0;
  }
  const s = [...Object.keys(t), ...op(t)];
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    if (Aw(a)) continue;
    let n = t[a], l = e[a];
    if (Xn(n) && (n = { ...n }), Xn(l) && (l = { ...l }), rh(n) && (n = xu(n)), Array.isArray(n)) if (Array.isArray(l)) {
      const h = [], u = Reflect.ownKeys(l);
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        h[p] = l[p];
      }
      l = h;
    } else if (Ow(l)) {
      const h = [];
      for (let u = 0; u < l.length; u++) h[u] = l[u];
      l = h;
    } else l = [];
    const c = r(l, n, a, e, t, i);
    c !== void 0 ? e[a] = c : Array.isArray(n) || Vn(l) && Vn(n) && (gn(l) || gn(n) || uo(l) || uo(n)) ? e[a] = fo(l, n, r, i) : l == null && gn(n) ? e[a] = fo({}, n, r, i) : l == null && uo(n) ? e[a] = xu(n) : (l === void 0 || n !== void 0) && (e[a] = n);
  }
  return e;
}
function Rw(e, ...t) {
  return Pw(e, ...t, cw);
}
function Cu(e) {
  if (e == null) return !0;
  if (cp(e))
    return typeof e.splice != "function" && typeof e != "string" && !rh(e) && !uo(e) && !Xn(e) ? !1 : e.length === 0;
  if (typeof e == "object") {
    if (e instanceof Map || e instanceof Set) return e.size === 0;
    const t = Object.keys(e);
    return Dw(e) ? t.filter((r) => r !== "constructor").length === 0 : t.length === 0;
  }
  return !0;
}
var Nw = "​", qw = {
  curveBasis: Gn,
  curveBasisClosed: rw,
  curveBasisOpen: iw,
  curveBumpX: Nf,
  curveBumpY: qf,
  curveBundle: sw,
  curveCardinalClosed: ow,
  curveCardinalOpen: aw,
  curveCardinal: Yf,
  curveCatmullRomClosed: nw,
  curveCatmullRomOpen: lw,
  curveCatmullRom: jf,
  curveLinear: ps,
  curveLinearClosed: hw,
  curveMonotoneX: Qf,
  curveMonotoneY: Jf,
  curveNatural: ep,
  curveStep: rp,
  curveStepAfter: sp,
  curveStepBefore: ip
}, Ww = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, zw = /* @__PURE__ */ d(function(e, t) {
  const r = up(e, /(?:init\b)|(?:initialize\b)/);
  let i = {};
  if (Array.isArray(r)) {
    const a = r.map((n) => n.args);
    ko(a), i = Jt(i, [...a]);
  } else
    i = r.args;
  if (!i)
    return;
  let s = ta(e, t);
  const o = "config";
  return i[o] !== void 0 && (s === "flowchart-v2" && (s = "flowchart"), i[s] = i[o], delete i[o]), i;
}, "detectInit"), up = /* @__PURE__ */ d(function(e, t = null) {
  try {
    const r = new RegExp(
      `[%]{2}(?![{]${Ww.source})(?=[}][%]{2}).*
`,
      "ig"
    );
    e = e.trim().replace(r, "").replace(/'/gm, '"'), J.debug(
      `Detecting diagram directive${t !== null ? " type:" + t : ""} based on the text:${e}`
    );
    let i;
    const s = [];
    for (; (i = us.exec(e)) !== null; )
      if (i.index === us.lastIndex && us.lastIndex++, i && !t || t && i[1]?.match(t) || t && i[2]?.match(t)) {
        const o = i[1] ? i[1] : i[2], a = i[3] ? i[3].trim() : i[4] ? JSON.parse(i[4].trim()) : null;
        s.push({ type: o, args: a });
      }
    return s.length === 0 ? { type: e, args: null } : s.length === 1 ? s[0] : s;
  } catch (r) {
    return J.error(
      `ERROR: ${r.message} - Unable to parse directive type: '${t}' based on the text: '${e}'`
    ), { type: void 0, args: null };
  }
}, "detectDirective"), Hw = /* @__PURE__ */ d(function(e) {
  return e.replace(us, "");
}, "removeDirectives"), Yw = /* @__PURE__ */ d(function(e, t) {
  for (const [r, i] of t.entries())
    if (i.match(e))
      return r;
  return -1;
}, "isSubstringInArray");
function oh(e, t) {
  if (!e)
    return t;
  const r = `curve${e.charAt(0).toUpperCase() + e.slice(1)}`;
  return qw[r] ?? t;
}
d(oh, "interpolateToCurve");
function dp(e, t) {
  const r = e.trim();
  if (r)
    return t.securityLevel !== "loose" ? $b.sanitizeUrl(r) : r;
}
d(dp, "formatUrl");
var Uw = /* @__PURE__ */ d((e, ...t) => {
  const r = e.split("."), i = r.length - 1, s = r[i];
  let o = window;
  for (let a = 0; a < i; a++)
    if (o = o[r[a]], !o) {
      J.error(`Function name: ${e} not found in window`);
      return;
    }
  o[s](...t);
}, "runFunc");
function ah(e, t) {
  return !e || !t ? 0 : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
d(ah, "distance");
function fp(e) {
  let t, r = 0;
  e.forEach((s) => {
    r += ah(s, t), t = s;
  });
  const i = r / 2;
  return nh(e, i);
}
d(fp, "traverseEdge");
function pp(e) {
  return e.length === 1 ? e[0] : fp(e);
}
d(pp, "calcLabelPosition");
var bu = /* @__PURE__ */ d((e, t = 2) => {
  const r = Math.pow(10, t);
  return Math.round(e * r) / r;
}, "roundNumber"), nh = /* @__PURE__ */ d((e, t) => {
  let r, i = t;
  for (const s of e) {
    if (r) {
      const o = ah(s, r);
      if (o === 0)
        return r;
      if (o < i)
        i -= o;
      else {
        const a = i / o;
        if (a <= 0)
          return r;
        if (a >= 1)
          return { x: s.x, y: s.y };
        if (a > 0 && a < 1)
          return {
            x: bu((1 - a) * r.x + a * s.x, 5),
            y: bu((1 - a) * r.y + a * s.y, 5)
          };
      }
    }
    r = s;
  }
  throw new Error("Could not find a suitable point for the given distance");
}, "calculatePoint"), jw = /* @__PURE__ */ d((e, t, r) => {
  J.info(`our points ${JSON.stringify(t)}`), t[0] !== r && (t = t.reverse());
  const s = nh(t, 25), o = e ? 10 : 5, a = Math.atan2(t[0].y - s.y, t[0].x - s.x), n = { x: 0, y: 0 };
  return n.x = Math.sin(a) * o + (t[0].x + s.x) / 2, n.y = -Math.cos(a) * o + (t[0].y + s.y) / 2, n;
}, "calcCardinalityPosition");
function gp(e, t, r) {
  const i = structuredClone(r);
  J.info("our points", i), t !== "start_left" && t !== "start_right" && i.reverse();
  const s = 25 + e, o = nh(i, s), a = 10 + e * 0.5, n = Math.atan2(i[0].y - o.y, i[0].x - o.x), l = { x: 0, y: 0 };
  return t === "start_left" ? (l.x = Math.sin(n + Math.PI) * a + (i[0].x + o.x) / 2, l.y = -Math.cos(n + Math.PI) * a + (i[0].y + o.y) / 2) : t === "end_right" ? (l.x = Math.sin(n - Math.PI) * a + (i[0].x + o.x) / 2, l.y = -Math.cos(n - Math.PI) * a + (i[0].y + o.y) / 2) : (l.x = Math.sin(n) * a + (i[0].x + o.x) / 2, l.y = -Math.cos(n) * a + (i[0].y + o.y) / 2), l;
}
d(gp, "calcTerminalLabelPosition");
function mp(e) {
  let t = "", r = "";
  for (const i of e)
    i !== void 0 && (i.startsWith("color:") || i.startsWith("text-align:") ? r = r + i + ";" : t = t + i + ";");
  return { style: t, labelStyle: r };
}
d(mp, "getStylesFromArray");
var ku = 0, Gw = /* @__PURE__ */ d(() => (ku++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + ku), "generateId");
function yp(e) {
  let t = "";
  const r = "0123456789abcdef", i = r.length;
  for (let s = 0; s < e; s++)
    t += r.charAt(Math.floor(Math.random() * i));
  return t;
}
d(yp, "makeRandomHex");
var Xw = /* @__PURE__ */ d((e) => yp(e.length), "random"), Vw = /* @__PURE__ */ d(function() {
  return {
    x: 0,
    y: 0,
    fill: void 0,
    anchor: "start",
    style: "#666",
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0,
    valign: void 0,
    text: ""
  };
}, "getTextObj"), Zw = /* @__PURE__ */ d(function(e, t) {
  const r = t.text.replace(_s.lineBreakRegex, " "), [, i] = aa(t.fontSize), s = e.append("text");
  s.attr("x", t.x), s.attr("y", t.y), s.style("text-anchor", t.anchor), s.style("font-family", t.fontFamily), s.style("font-size", i), s.style("font-weight", t.fontWeight), s.attr("fill", t.fill), t.class !== void 0 && s.attr("class", t.class);
  const o = s.append("tspan");
  return o.attr("x", t.x + t.textMargin * 2), o.attr("fill", t.fill), o.text(r), s;
}, "drawSimpleText"), Kw = Ls(
  (e, t, r) => {
    if (!e || (r = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", joinWith: "<br/>" },
      r
    ), _s.hasBreaks(e)))
      return e;
    const i = e.split(" ").filter(Boolean), s = [];
    let o = "";
    return i.forEach((a, n) => {
      const l = Tr(`${a} `, r), c = Tr(o, r);
      if (l > t) {
        const { hyphenatedStrings: f, remainingWord: p } = Qw(a, t, "-", r);
        s.push(o, ...f), o = p;
      } else c + l >= t ? (s.push(o), o = a) : o = [o, a].filter(Boolean).join(" ");
      n + 1 === i.length && s.push(o);
    }), s.filter((a) => a !== "").join(r.joinWith);
  },
  (e, t, r) => `${e}${t}${r.fontSize}${r.fontWeight}${r.fontFamily}${r.joinWith}`
), Qw = Ls(
  (e, t, r = "-", i) => {
    i = Object.assign(
      { fontSize: 12, fontWeight: 400, fontFamily: "Arial", margin: 0 },
      i
    );
    const s = [...e], o = [];
    let a = "";
    return s.forEach((n, l) => {
      const c = `${a}${n}`;
      if (Tr(c, i) >= t) {
        const u = l + 1, f = s.length === u, p = `${c}${r}`;
        o.push(f ? c : p), a = "";
      } else
        a = c;
    }), { hyphenatedStrings: o, remainingWord: a };
  },
  (e, t, r = "-", i) => `${e}${t}${r}${i.fontSize}${i.fontWeight}${i.fontFamily}`
);
function xp(e, t) {
  return lh(e, t).height;
}
d(xp, "calculateTextHeight");
function Tr(e, t) {
  return lh(e, t).width;
}
d(Tr, "calculateTextWidth");
var lh = Ls(
  (e, t) => {
    const { fontSize: r = 12, fontFamily: i = "Arial", fontWeight: s = 400 } = t;
    if (!e)
      return { width: 0, height: 0 };
    const [, o] = aa(r), a = ["sans-serif", i], n = e.split(_s.lineBreakRegex), l = [], c = $t("body");
    if (!c.remove)
      return { width: 0, height: 0, lineHeight: 0 };
    const h = c.append("svg");
    for (const f of a) {
      let p = 0;
      const m = { width: 0, height: 0, lineHeight: 0 };
      for (const y of n) {
        const x = Vw();
        x.text = y || Nw;
        const C = Zw(h, x).style("font-size", o).style("font-weight", s).style("font-family", f), b = (C._groups || C)[0][0].getBBox();
        if (b.width === 0 && b.height === 0)
          throw new Error("svg element not in render tree");
        m.width = Math.round(Math.max(m.width, b.width)), p = Math.round(b.height), m.height += p, m.lineHeight = Math.round(Math.max(m.lineHeight, p));
      }
      l.push(m);
    }
    h.remove();
    const u = isNaN(l[1].height) || isNaN(l[1].width) || isNaN(l[1].lineHeight) || l[0].height > l[1].height && l[0].width > l[1].width && l[0].lineHeight > l[1].lineHeight ? 0 : 1;
    return l[u];
  },
  (e, t) => `${e}${t.fontSize}${t.fontWeight}${t.fontFamily}`
), Jw = class {
  constructor(e = !1, t) {
    this.count = 0, this.count = t ? t.length : 0, this.next = e ? () => this.count++ : () => Date.now();
  }
  static {
    d(this, "InitIDGenerator");
  }
}, Vs, tS = /* @__PURE__ */ d(function(e) {
  return Vs = Vs || document.createElement("div"), e = escape(e).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Vs.innerHTML = e, unescape(Vs.textContent);
}, "entityDecode");
function hh(e) {
  return "str" in e;
}
d(hh, "isDetailedError");
function Cp(e) {
  return e instanceof Error ? e.message : String(e);
}
d(Cp, "getErrorMessage");
var eS = /* @__PURE__ */ d((e, t, r, i) => {
  if (!i)
    return;
  const s = e.node()?.getBBox();
  s && e.append("text").text(i).attr("text-anchor", "middle").attr("x", s.x + s.width / 2).attr("y", -r).attr("class", t);
}, "insertTitle"), aa = /* @__PURE__ */ d((e) => {
  if (typeof e == "number")
    return [e, e + "px"];
  const t = parseInt(e ?? "", 10);
  return Number.isNaN(t) ? [void 0, void 0] : e === String(t) ? [t, e + "px"] : [t, e];
}, "parseFontSize");
function ch(e, t) {
  return Rw({}, e, t);
}
d(ch, "cleanAndMerge");
var _e = {
  assignWithDepth: Jt,
  wrapLabel: Kw,
  calculateTextHeight: xp,
  calculateTextWidth: Tr,
  calculateTextDimensions: lh,
  cleanAndMerge: ch,
  detectInit: zw,
  detectDirective: up,
  isSubstringInArray: Yw,
  interpolateToCurve: oh,
  calcLabelPosition: pp,
  calcCardinalityPosition: jw,
  calcTerminalLabelPosition: gp,
  formatUrl: dp,
  getStylesFromArray: mp,
  generateId: Gw,
  random: Xw,
  runFunc: Uw,
  entityDecode: tS,
  insertTitle: eS,
  isLabelCoordinateInPath: bp,
  parseFontSize: aa,
  InitIDGenerator: Jw
}, rS = /* @__PURE__ */ d(function(e) {
  let t = e;
  return t = t.replace(/style.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/classDef.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/#\w+;/g, function(r) {
    const i = r.substring(1, r.length - 1);
    return /^\+?\d+$/.test(i) ? "ﬂ°°" + i + "¶ß" : "ﬂ°" + i + "¶ß";
  }), t;
}, "encodeEntities"), zr = /* @__PURE__ */ d(function(e) {
  return e.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities"), lM = /* @__PURE__ */ d((e, t, {
  counter: r = 0,
  prefix: i,
  suffix: s
}, o) => o || `${i ? `${i}_` : ""}${e}_${t}_${r}${s ? `_${s}` : ""}`, "getEdgeId");
function te(e) {
  return e ?? null;
}
d(te, "handleUndefinedAttr");
function bp(e, t) {
  const r = Math.round(e.x), i = Math.round(e.y), s = t.replace(
    /(\d+\.\d+)/g,
    (o) => Math.round(parseFloat(o)).toString()
  );
  return s.includes(r.toString()) || s.includes(i.toString());
}
d(bp, "isLabelCoordinateInPath");
function uh() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var hi = uh();
function kp(e) {
  hi = e;
}
var gs = { exec: () => null };
function qt(e, t = "") {
  let r = typeof e == "string" ? e : e.source, i = { replace: (s, o) => {
    let a = typeof o == "string" ? o : o.source;
    return a = a.replace(xe.caret, "$1"), r = r.replace(s, a), i;
  }, getRegex: () => new RegExp(r, t) };
  return i;
}
var iS = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), xe = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") }, sS = /^(?:[ \t]*(?:\n|$))+/, oS = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, aS = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Fs = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, nS = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, dh = /(?:[*+-]|\d{1,9}[.)])/, wp = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Sp = qt(wp).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), lS = qt(wp).replace(/bull/g, dh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), fh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, hS = /^[^\n]+/, ph = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, cS = qt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ph).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), uS = qt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, dh).getRegex(), na = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", gh = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, dS = qt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", gh).replace("tag", na).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Tp = qt(fh).replace("hr", Fs).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", na).getRegex(), fS = qt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Tp).getRegex(), mh = { blockquote: fS, code: oS, def: cS, fences: aS, heading: nS, hr: Fs, html: dS, lheading: Sp, list: uS, newline: sS, paragraph: Tp, table: gs, text: hS }, wu = qt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Fs).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", na).getRegex(), pS = { ...mh, lheading: lS, table: wu, paragraph: qt(fh).replace("hr", Fs).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", wu).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", na).getRegex() }, gS = { ...mh, html: qt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", gh).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: gs, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: qt(fh).replace("hr", Fs).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Sp).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, mS = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, yS = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _p = /^( {2,}|\\)\n(?!\s*$)/, xS = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, la = /[\p{P}\p{S}]/u, yh = /[\s\p{P}\p{S}]/u, Bp = /[^\s\p{P}\p{S}]/u, CS = qt(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, yh).getRegex(), vp = /(?!~)[\p{P}\p{S}]/u, bS = /(?!~)[\s\p{P}\p{S}]/u, kS = /(?:[^\s\p{P}\p{S}]|~)/u, wS = qt(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", iS ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Lp = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, SS = qt(Lp, "u").replace(/punct/g, la).getRegex(), TS = qt(Lp, "u").replace(/punct/g, vp).getRegex(), Fp = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", _S = qt(Fp, "gu").replace(/notPunctSpace/g, Bp).replace(/punctSpace/g, yh).replace(/punct/g, la).getRegex(), BS = qt(Fp, "gu").replace(/notPunctSpace/g, kS).replace(/punctSpace/g, bS).replace(/punct/g, vp).getRegex(), vS = qt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Bp).replace(/punctSpace/g, yh).replace(/punct/g, la).getRegex(), LS = qt(/\\(punct)/, "gu").replace(/punct/g, la).getRegex(), FS = qt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), AS = qt(gh).replace("(?:-->|$)", "-->").getRegex(), MS = qt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", AS).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ro = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, ES = qt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ro).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ap = qt(/^!?\[(label)\]\[(ref)\]/).replace("label", Ro).replace("ref", ph).getRegex(), Mp = qt(/^!?\[(ref)\](?:\[\])?/).replace("ref", ph).getRegex(), $S = qt("reflink|nolink(?!\\()", "g").replace("reflink", Ap).replace("nolink", Mp).getRegex(), Su = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, xh = { _backpedal: gs, anyPunctuation: LS, autolink: FS, blockSkip: wS, br: _p, code: yS, del: gs, emStrongLDelim: SS, emStrongRDelimAst: _S, emStrongRDelimUnd: vS, escape: mS, link: ES, nolink: Mp, punctuation: CS, reflink: Ap, reflinkSearch: $S, tag: MS, text: xS, url: gs }, OS = { ...xh, link: qt(/^!?\[(label)\]\((.*?)\)/).replace("label", Ro).getRegex(), reflink: qt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ro).getRegex() }, Zn = { ...xh, emStrongRDelimAst: BS, emStrongLDelim: TS, url: qt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Su).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: qt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Su).getRegex() }, DS = { ...Zn, br: qt(_p).replace("{2,}", "*").getRegex(), text: qt(Zn.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Zs = { normal: mh, gfm: pS, pedantic: gS }, ji = { normal: xh, gfm: Zn, breaks: DS, pedantic: OS }, IS = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Tu = (e) => IS[e];
function Je(e, t) {
  if (t) {
    if (xe.escapeTest.test(e)) return e.replace(xe.escapeReplace, Tu);
  } else if (xe.escapeTestNoEncode.test(e)) return e.replace(xe.escapeReplaceNoEncode, Tu);
  return e;
}
function _u(e) {
  try {
    e = encodeURI(e).replace(xe.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Bu(e, t) {
  let r = e.replace(xe.findPipe, (o, a, n) => {
    let l = !1, c = a;
    for (; --c >= 0 && n[c] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), i = r.split(xe.splitPipe), s = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i.at(-1)?.trim() && i.pop(), t) if (i.length > t) i.splice(t);
  else for (; i.length < t; ) i.push("");
  for (; s < i.length; s++) i[s] = i[s].trim().replace(xe.slashPipe, "|");
  return i;
}
function Gi(e, t, r) {
  let i = e.length;
  if (i === 0) return "";
  let s = 0;
  for (; s < i && e.charAt(i - s - 1) === t; )
    s++;
  return e.slice(0, i - s);
}
function PS(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let r = 0;
  for (let i = 0; i < e.length; i++) if (e[i] === "\\") i++;
  else if (e[i] === t[0]) r++;
  else if (e[i] === t[1] && (r--, r < 0)) return i;
  return r > 0 ? -2 : -1;
}
function vu(e, t, r, i, s) {
  let o = t.href, a = t.title || null, n = e[1].replace(s.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let l = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: r, href: o, title: a, text: n, tokens: i.inlineTokens(n) };
  return i.state.inLink = !1, l;
}
function RS(e, t, r) {
  let i = e.match(r.other.indentCodeCompensation);
  if (i === null) return t;
  let s = i[1];
  return t.split(`
`).map((o) => {
    let a = o.match(r.other.beginningSpace);
    if (a === null) return o;
    let [n] = a;
    return n.length >= s.length ? o.slice(s.length) : o;
  }).join(`
`);
}
var No = class {
  options;
  rules;
  lexer;
  constructor(t) {
    this.options = t || hi;
  }
  space(t) {
    let r = this.rules.block.newline.exec(t);
    if (r && r[0].length > 0) return { type: "space", raw: r[0] };
  }
  code(t) {
    let r = this.rules.block.code.exec(t);
    if (r) {
      let i = r[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: r[0], codeBlockStyle: "indented", text: this.options.pedantic ? i : Gi(i, `
`) };
    }
  }
  fences(t) {
    let r = this.rules.block.fences.exec(t);
    if (r) {
      let i = r[0], s = RS(i, r[3] || "", this.rules);
      return { type: "code", raw: i, lang: r[2] ? r[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : r[2], text: s };
    }
  }
  heading(t) {
    let r = this.rules.block.heading.exec(t);
    if (r) {
      let i = r[2].trim();
      if (this.rules.other.endingHash.test(i)) {
        let s = Gi(i, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (i = s.trim());
      }
      return { type: "heading", raw: r[0], depth: r[1].length, text: i, tokens: this.lexer.inline(i) };
    }
  }
  hr(t) {
    let r = this.rules.block.hr.exec(t);
    if (r) return { type: "hr", raw: Gi(r[0], `
`) };
  }
  blockquote(t) {
    let r = this.rules.block.blockquote.exec(t);
    if (r) {
      let i = Gi(r[0], `
`).split(`
`), s = "", o = "", a = [];
      for (; i.length > 0; ) {
        let n = !1, l = [], c;
        for (c = 0; c < i.length; c++) if (this.rules.other.blockquoteStart.test(i[c])) l.push(i[c]), n = !0;
        else if (!n) l.push(i[c]);
        else break;
        i = i.slice(c);
        let h = l.join(`
`), u = h.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${h}` : h, o = o ? `${o}
${u}` : u;
        let f = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, a, !0), this.lexer.state.top = f, i.length === 0) break;
        let p = a.at(-1);
        if (p?.type === "code") break;
        if (p?.type === "blockquote") {
          let m = p, y = m.raw + `
` + i.join(`
`), x = this.blockquote(y);
          a[a.length - 1] = x, s = s.substring(0, s.length - m.raw.length) + x.raw, o = o.substring(0, o.length - m.text.length) + x.text;
          break;
        } else if (p?.type === "list") {
          let m = p, y = m.raw + `
` + i.join(`
`), x = this.list(y);
          a[a.length - 1] = x, s = s.substring(0, s.length - p.raw.length) + x.raw, o = o.substring(0, o.length - m.raw.length) + x.raw, i = y.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: a, text: o };
    }
  }
  list(t) {
    let r = this.rules.block.list.exec(t);
    if (r) {
      let i = r[1].trim(), s = i.length > 1, o = { type: "list", raw: "", ordered: s, start: s ? +i.slice(0, -1) : "", loose: !1, items: [] };
      i = s ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = s ? i : "[*+-]");
      let a = this.rules.other.listItemRegex(i), n = !1;
      for (; t; ) {
        let c = !1, h = "", u = "";
        if (!(r = a.exec(t)) || this.rules.block.hr.test(t)) break;
        h = r[0], t = t.substring(h.length);
        let f = r[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (b) => " ".repeat(3 * b.length)), p = t.split(`
`, 1)[0], m = !f.trim(), y = 0;
        if (this.options.pedantic ? (y = 2, u = f.trimStart()) : m ? y = r[1].length + 1 : (y = r[2].search(this.rules.other.nonSpaceChar), y = y > 4 ? 1 : y, u = f.slice(y), y += r[1].length), m && this.rules.other.blankLine.test(p) && (h += p + `
`, t = t.substring(p.length + 1), c = !0), !c) {
          let b = this.rules.other.nextBulletRegex(y), S = this.rules.other.hrRegex(y), _ = this.rules.other.fencesBeginRegex(y), B = this.rules.other.headingBeginRegex(y), F = this.rules.other.htmlBeginRegex(y);
          for (; t; ) {
            let A = t.split(`
`, 1)[0], L;
            if (p = A, this.options.pedantic ? (p = p.replace(this.rules.other.listReplaceNesting, "  "), L = p) : L = p.replace(this.rules.other.tabCharGlobal, "    "), _.test(p) || B.test(p) || F.test(p) || b.test(p) || S.test(p)) break;
            if (L.search(this.rules.other.nonSpaceChar) >= y || !p.trim()) u += `
` + L.slice(y);
            else {
              if (m || f.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || _.test(f) || B.test(f) || S.test(f)) break;
              u += `
` + p;
            }
            !m && !p.trim() && (m = !0), h += A + `
`, t = t.substring(A.length + 1), f = L.slice(y);
          }
        }
        o.loose || (n ? o.loose = !0 : this.rules.other.doubleBlankLine.test(h) && (n = !0));
        let x = null, C;
        this.options.gfm && (x = this.rules.other.listIsTask.exec(u), x && (C = x[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), o.items.push({ type: "list_item", raw: h, task: !!x, checked: C, loose: !1, text: u, tokens: [] }), o.raw += h;
      }
      let l = o.items.at(-1);
      if (l) l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
      else return;
      o.raw = o.raw.trimEnd();
      for (let c = 0; c < o.items.length; c++) if (this.lexer.state.top = !1, o.items[c].tokens = this.lexer.blockTokens(o.items[c].text, []), !o.loose) {
        let h = o.items[c].tokens.filter((f) => f.type === "space"), u = h.length > 0 && h.some((f) => this.rules.other.anyLine.test(f.raw));
        o.loose = u;
      }
      if (o.loose) for (let c = 0; c < o.items.length; c++) o.items[c].loose = !0;
      return o;
    }
  }
  html(t) {
    let r = this.rules.block.html.exec(t);
    if (r) return { type: "html", block: !0, raw: r[0], pre: r[1] === "pre" || r[1] === "script" || r[1] === "style", text: r[0] };
  }
  def(t) {
    let r = this.rules.block.def.exec(t);
    if (r) {
      let i = r[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = r[2] ? r[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", o = r[3] ? r[3].substring(1, r[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : r[3];
      return { type: "def", tag: i, raw: r[0], href: s, title: o };
    }
  }
  table(t) {
    let r = this.rules.block.table.exec(t);
    if (!r || !this.rules.other.tableDelimiter.test(r[2])) return;
    let i = Bu(r[1]), s = r[2].replace(this.rules.other.tableAlignChars, "").split("|"), o = r[3]?.trim() ? r[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: r[0], header: [], align: [], rows: [] };
    if (i.length === s.length) {
      for (let n of s) this.rules.other.tableAlignRight.test(n) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(n) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(n) ? a.align.push("left") : a.align.push(null);
      for (let n = 0; n < i.length; n++) a.header.push({ text: i[n], tokens: this.lexer.inline(i[n]), header: !0, align: a.align[n] });
      for (let n of o) a.rows.push(Bu(n, a.header.length).map((l, c) => ({ text: l, tokens: this.lexer.inline(l), header: !1, align: a.align[c] })));
      return a;
    }
  }
  lheading(t) {
    let r = this.rules.block.lheading.exec(t);
    if (r) return { type: "heading", raw: r[0], depth: r[2].charAt(0) === "=" ? 1 : 2, text: r[1], tokens: this.lexer.inline(r[1]) };
  }
  paragraph(t) {
    let r = this.rules.block.paragraph.exec(t);
    if (r) {
      let i = r[1].charAt(r[1].length - 1) === `
` ? r[1].slice(0, -1) : r[1];
      return { type: "paragraph", raw: r[0], text: i, tokens: this.lexer.inline(i) };
    }
  }
  text(t) {
    let r = this.rules.block.text.exec(t);
    if (r) return { type: "text", raw: r[0], text: r[0], tokens: this.lexer.inline(r[0]) };
  }
  escape(t) {
    let r = this.rules.inline.escape.exec(t);
    if (r) return { type: "escape", raw: r[0], text: r[1] };
  }
  tag(t) {
    let r = this.rules.inline.tag.exec(t);
    if (r) return !this.lexer.state.inLink && this.rules.other.startATag.test(r[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(r[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(r[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(r[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: r[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: r[0] };
  }
  link(t) {
    let r = this.rules.inline.link.exec(t);
    if (r) {
      let i = r[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
        if (!this.rules.other.endAngleBracket.test(i)) return;
        let a = Gi(i.slice(0, -1), "\\");
        if ((i.length - a.length) % 2 === 0) return;
      } else {
        let a = PS(r[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let n = (r[0].indexOf("!") === 0 ? 5 : 4) + r[1].length + a;
          r[2] = r[2].substring(0, a), r[0] = r[0].substring(0, n).trim(), r[3] = "";
        }
      }
      let s = r[2], o = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(s);
        a && (s = a[1], o = a[3]);
      } else o = r[3] ? r[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? s = s.slice(1) : s = s.slice(1, -1)), vu(r, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, r[0], this.lexer, this.rules);
    }
  }
  reflink(t, r) {
    let i;
    if ((i = this.rules.inline.reflink.exec(t)) || (i = this.rules.inline.nolink.exec(t))) {
      let s = (i[2] || i[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = r[s.toLowerCase()];
      if (!o) {
        let a = i[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return vu(i, o, i[0], this.lexer, this.rules);
    }
  }
  emStrong(t, r, i = "") {
    let s = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!s || s[3] && i.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !i || this.rules.inline.punctuation.exec(i))) {
      let o = [...s[0]].length - 1, a, n, l = o, c = 0, h = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (h.lastIndex = 0, r = r.slice(-1 * t.length + o); (s = h.exec(r)) != null; ) {
        if (a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !a) continue;
        if (n = [...a].length, s[3] || s[4]) {
          l += n;
          continue;
        } else if ((s[5] || s[6]) && o % 3 && !((o + n) % 3)) {
          c += n;
          continue;
        }
        if (l -= n, l > 0) continue;
        n = Math.min(n, n + l + c);
        let u = [...s[0]][0].length, f = t.slice(0, o + s.index + u + n);
        if (Math.min(o, n) % 2) {
          let m = f.slice(1, -1);
          return { type: "em", raw: f, text: m, tokens: this.lexer.inlineTokens(m) };
        }
        let p = f.slice(2, -2);
        return { type: "strong", raw: f, text: p, tokens: this.lexer.inlineTokens(p) };
      }
    }
  }
  codespan(t) {
    let r = this.rules.inline.code.exec(t);
    if (r) {
      let i = r[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(i), o = this.rules.other.startingSpaceChar.test(i) && this.rules.other.endingSpaceChar.test(i);
      return s && o && (i = i.substring(1, i.length - 1)), { type: "codespan", raw: r[0], text: i };
    }
  }
  br(t) {
    let r = this.rules.inline.br.exec(t);
    if (r) return { type: "br", raw: r[0] };
  }
  del(t) {
    let r = this.rules.inline.del.exec(t);
    if (r) return { type: "del", raw: r[0], text: r[2], tokens: this.lexer.inlineTokens(r[2]) };
  }
  autolink(t) {
    let r = this.rules.inline.autolink.exec(t);
    if (r) {
      let i, s;
      return r[2] === "@" ? (i = r[1], s = "mailto:" + i) : (i = r[1], s = i), { type: "link", raw: r[0], text: i, href: s, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  url(t) {
    let r;
    if (r = this.rules.inline.url.exec(t)) {
      let i, s;
      if (r[2] === "@") i = r[0], s = "mailto:" + i;
      else {
        let o;
        do
          o = r[0], r[0] = this.rules.inline._backpedal.exec(r[0])?.[0] ?? "";
        while (o !== r[0]);
        i = r[0], r[1] === "www." ? s = "http://" + r[0] : s = r[0];
      }
      return { type: "link", raw: r[0], text: i, href: s, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  inlineText(t) {
    let r = this.rules.inline.text.exec(t);
    if (r) {
      let i = this.lexer.state.inRawBlock;
      return { type: "text", raw: r[0], text: r[0], escaped: i };
    }
  }
}, We = class Kn {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || hi, this.options.tokenizer = this.options.tokenizer || new No(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let r = { other: xe, block: Zs.normal, inline: ji.normal };
    this.options.pedantic ? (r.block = Zs.pedantic, r.inline = ji.pedantic) : this.options.gfm && (r.block = Zs.gfm, this.options.breaks ? r.inline = ji.breaks : r.inline = ji.gfm), this.tokenizer.rules = r;
  }
  static get rules() {
    return { block: Zs, inline: ji };
  }
  static lex(t, r) {
    return new Kn(r).lex(t);
  }
  static lexInline(t, r) {
    return new Kn(r).inlineTokens(t);
  }
  lex(t) {
    t = t.replace(xe.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let r = 0; r < this.inlineQueue.length; r++) {
      let i = this.inlineQueue[r];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, r = [], i = !1) {
    for (this.options.pedantic && (t = t.replace(xe.tabCharGlobal, "    ").replace(xe.spaceLine, "")); t; ) {
      let s;
      if (this.options.extensions?.block?.some((a) => (s = a.call({ lexer: this }, t, r)) ? (t = t.substring(s.raw.length), r.push(s), !0) : !1)) continue;
      if (s = this.tokenizer.space(t)) {
        t = t.substring(s.raw.length);
        let a = r.at(-1);
        s.raw.length === 1 && a !== void 0 ? a.raw += `
` : r.push(s);
        continue;
      }
      if (s = this.tokenizer.code(t)) {
        t = t.substring(s.raw.length);
        let a = r.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.at(-1).src = a.text) : r.push(s);
        continue;
      }
      if (s = this.tokenizer.fences(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.heading(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.hr(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.blockquote(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.list(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.html(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.def(t)) {
        t = t.substring(s.raw.length);
        let a = r.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.raw, this.inlineQueue.at(-1).src = a.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = { href: s.href, title: s.title }, r.push(s));
        continue;
      }
      if (s = this.tokenizer.table(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      if (s = this.tokenizer.lheading(t)) {
        t = t.substring(s.raw.length), r.push(s);
        continue;
      }
      let o = t;
      if (this.options.extensions?.startBlock) {
        let a = 1 / 0, n = t.slice(1), l;
        this.options.extensions.startBlock.forEach((c) => {
          l = c.call({ lexer: this }, n), typeof l == "number" && l >= 0 && (a = Math.min(a, l));
        }), a < 1 / 0 && a >= 0 && (o = t.substring(0, a + 1));
      }
      if (this.state.top && (s = this.tokenizer.paragraph(o))) {
        let a = r.at(-1);
        i && a?.type === "paragraph" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : r.push(s), i = o.length !== t.length, t = t.substring(s.raw.length);
        continue;
      }
      if (s = this.tokenizer.text(t)) {
        t = t.substring(s.raw.length);
        let a = r.at(-1);
        a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : r.push(s);
        continue;
      }
      if (t) {
        let a = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(a);
          break;
        } else throw new Error(a);
      }
    }
    return this.state.top = !0, r;
  }
  inline(t, r = []) {
    return this.inlineQueue.push({ src: t, tokens: r }), r;
  }
  inlineTokens(t, r = []) {
    let i = t, s = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; ) l.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; ) i = i.slice(0, s.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let o;
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; ) o = s[2] ? s[2].length : 0, i = i.slice(0, s.index + o) + "[" + "a".repeat(s[0].length - o - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    i = this.options.hooks?.emStrongMask?.call({ lexer: this }, i) ?? i;
    let a = !1, n = "";
    for (; t; ) {
      a || (n = ""), a = !1;
      let l;
      if (this.options.extensions?.inline?.some((h) => (l = h.call({ lexer: this }, t, r)) ? (t = t.substring(l.raw.length), r.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.escape(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.link(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(l.raw.length);
        let h = r.at(-1);
        l.type === "text" && h?.type === "text" ? (h.raw += l.raw, h.text += l.text) : r.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(t, i, n)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.br(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.del(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(t)) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(t))) {
        t = t.substring(l.raw.length), r.push(l);
        continue;
      }
      let c = t;
      if (this.options.extensions?.startInline) {
        let h = 1 / 0, u = t.slice(1), f;
        this.options.extensions.startInline.forEach((p) => {
          f = p.call({ lexer: this }, u), typeof f == "number" && f >= 0 && (h = Math.min(h, f));
        }), h < 1 / 0 && h >= 0 && (c = t.substring(0, h + 1));
      }
      if (l = this.tokenizer.inlineText(c)) {
        t = t.substring(l.raw.length), l.raw.slice(-1) !== "_" && (n = l.raw.slice(-1)), a = !0;
        let h = r.at(-1);
        h?.type === "text" ? (h.raw += l.raw, h.text += l.text) : r.push(l);
        continue;
      }
      if (t) {
        let h = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(h);
          break;
        } else throw new Error(h);
      }
    }
    return r;
  }
}, qo = class {
  options;
  parser;
  constructor(t) {
    this.options = t || hi;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: r, escaped: i }) {
    let s = (r || "").match(xe.notSpaceStart)?.[0], o = t.replace(xe.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + Je(s) + '">' + (i ? o : Je(o, !0)) + `</code></pre>
` : "<pre><code>" + (i ? o : Je(o, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  def(t) {
    return "";
  }
  heading({ tokens: t, depth: r }) {
    return `<h${r}>${this.parser.parseInline(t)}</h${r}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    let r = t.ordered, i = t.start, s = "";
    for (let n = 0; n < t.items.length; n++) {
      let l = t.items[n];
      s += this.listitem(l);
    }
    let o = r ? "ol" : "ul", a = r && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + o + a + `>
` + s + "</" + o + `>
`;
  }
  listitem(t) {
    let r = "";
    if (t.task) {
      let i = this.checkbox({ checked: !!t.checked });
      t.loose ? t.tokens[0]?.type === "paragraph" ? (t.tokens[0].text = i + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = i + " " + Je(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({ type: "text", raw: i + " ", text: i + " ", escaped: !0 }) : r += i + " ";
    }
    return r += this.parser.parse(t.tokens, !!t.loose), `<li>${r}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let r = "", i = "";
    for (let o = 0; o < t.header.length; o++) i += this.tablecell(t.header[o]);
    r += this.tablerow({ text: i });
    let s = "";
    for (let o = 0; o < t.rows.length; o++) {
      let a = t.rows[o];
      i = "";
      for (let n = 0; n < a.length; n++) i += this.tablecell(a[n]);
      s += this.tablerow({ text: i });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + r + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    let r = this.parser.parseInline(t.tokens), i = t.header ? "th" : "td";
    return (t.align ? `<${i} align="${t.align}">` : `<${i}>`) + r + `</${i}>
`;
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${Je(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: r, tokens: i }) {
    let s = this.parser.parseInline(i), o = _u(t);
    if (o === null) return s;
    t = o;
    let a = '<a href="' + t + '"';
    return r && (a += ' title="' + Je(r) + '"'), a += ">" + s + "</a>", a;
  }
  image({ href: t, title: r, text: i, tokens: s }) {
    s && (i = this.parser.parseInline(s, this.parser.textRenderer));
    let o = _u(t);
    if (o === null) return Je(i);
    t = o;
    let a = `<img src="${t}" alt="${i}"`;
    return r && (a += ` title="${Je(r)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Je(t.text);
  }
}, Ch = class {
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
}, ze = class Qn {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || hi, this.options.renderer = this.options.renderer || new qo(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ch();
  }
  static parse(t, r) {
    return new Qn(r).parse(t);
  }
  static parseInline(t, r) {
    return new Qn(r).parseInline(t);
  }
  parse(t, r = !0) {
    let i = "";
    for (let s = 0; s < t.length; s++) {
      let o = t[s];
      if (this.options.extensions?.renderers?.[o.type]) {
        let n = o, l = this.options.extensions.renderers[n.type].call({ parser: this }, n);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(n.type)) {
          i += l || "";
          continue;
        }
      }
      let a = o;
      switch (a.type) {
        case "space": {
          i += this.renderer.space(a);
          continue;
        }
        case "hr": {
          i += this.renderer.hr(a);
          continue;
        }
        case "heading": {
          i += this.renderer.heading(a);
          continue;
        }
        case "code": {
          i += this.renderer.code(a);
          continue;
        }
        case "table": {
          i += this.renderer.table(a);
          continue;
        }
        case "blockquote": {
          i += this.renderer.blockquote(a);
          continue;
        }
        case "list": {
          i += this.renderer.list(a);
          continue;
        }
        case "html": {
          i += this.renderer.html(a);
          continue;
        }
        case "def": {
          i += this.renderer.def(a);
          continue;
        }
        case "paragraph": {
          i += this.renderer.paragraph(a);
          continue;
        }
        case "text": {
          let n = a, l = this.renderer.text(n);
          for (; s + 1 < t.length && t[s + 1].type === "text"; ) n = t[++s], l += `
` + this.renderer.text(n);
          r ? i += this.renderer.paragraph({ type: "paragraph", raw: l, text: l, tokens: [{ type: "text", raw: l, text: l, escaped: !0 }] }) : i += l;
          continue;
        }
        default: {
          let n = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(n), "";
          throw new Error(n);
        }
      }
    }
    return i;
  }
  parseInline(t, r = this.renderer) {
    let i = "";
    for (let s = 0; s < t.length; s++) {
      let o = t[s];
      if (this.options.extensions?.renderers?.[o.type]) {
        let n = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (n !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
          i += n || "";
          continue;
        }
      }
      let a = o;
      switch (a.type) {
        case "escape": {
          i += r.text(a);
          break;
        }
        case "html": {
          i += r.html(a);
          break;
        }
        case "link": {
          i += r.link(a);
          break;
        }
        case "image": {
          i += r.image(a);
          break;
        }
        case "strong": {
          i += r.strong(a);
          break;
        }
        case "em": {
          i += r.em(a);
          break;
        }
        case "codespan": {
          i += r.codespan(a);
          break;
        }
        case "br": {
          i += r.br(a);
          break;
        }
        case "del": {
          i += r.del(a);
          break;
        }
        case "text": {
          i += r.text(a);
          break;
        }
        default: {
          let n = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(n), "";
          throw new Error(n);
        }
      }
    }
    return i;
  }
}, os = class {
  options;
  block;
  constructor(t) {
    this.options = t || hi;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  emStrongMask(t) {
    return t;
  }
  provideLexer() {
    return this.block ? We.lex : We.lexInline;
  }
  provideParser() {
    return this.block ? ze.parse : ze.parseInline;
  }
}, NS = class {
  defaults = uh();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = ze;
  Renderer = qo;
  TextRenderer = Ch;
  Lexer = We;
  Tokenizer = No;
  Hooks = os;
  constructor(...t) {
    this.use(...t);
  }
  walkTokens(t, r) {
    let i = [];
    for (let s of t) switch (i = i.concat(r.call(this, s)), s.type) {
      case "table": {
        let o = s;
        for (let a of o.header) i = i.concat(this.walkTokens(a.tokens, r));
        for (let a of o.rows) for (let n of a) i = i.concat(this.walkTokens(n.tokens, r));
        break;
      }
      case "list": {
        let o = s;
        i = i.concat(this.walkTokens(o.items, r));
        break;
      }
      default: {
        let o = s;
        this.defaults.extensions?.childTokens?.[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
          let n = o[a].flat(1 / 0);
          i = i.concat(this.walkTokens(n, r));
        }) : o.tokens && (i = i.concat(this.walkTokens(o.tokens, r)));
      }
    }
    return i;
  }
  use(...t) {
    let r = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((i) => {
      let s = { ...i };
      if (s.async = this.defaults.async || s.async || !1, i.extensions && (i.extensions.forEach((o) => {
        if (!o.name) throw new Error("extension name required");
        if ("renderer" in o) {
          let a = r.renderers[o.name];
          a ? r.renderers[o.name] = function(...n) {
            let l = o.renderer.apply(this, n);
            return l === !1 && (l = a.apply(this, n)), l;
          } : r.renderers[o.name] = o.renderer;
        }
        if ("tokenizer" in o) {
          if (!o.level || o.level !== "block" && o.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = r[o.level];
          a ? a.unshift(o.tokenizer) : r[o.level] = [o.tokenizer], o.start && (o.level === "block" ? r.startBlock ? r.startBlock.push(o.start) : r.startBlock = [o.start] : o.level === "inline" && (r.startInline ? r.startInline.push(o.start) : r.startInline = [o.start]));
        }
        "childTokens" in o && o.childTokens && (r.childTokens[o.name] = o.childTokens);
      }), s.extensions = r), i.renderer) {
        let o = this.defaults.renderer || new qo(this.defaults);
        for (let a in i.renderer) {
          if (!(a in o)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let n = a, l = i.renderer[n], c = o[n];
          o[n] = (...h) => {
            let u = l.apply(o, h);
            return u === !1 && (u = c.apply(o, h)), u || "";
          };
        }
        s.renderer = o;
      }
      if (i.tokenizer) {
        let o = this.defaults.tokenizer || new No(this.defaults);
        for (let a in i.tokenizer) {
          if (!(a in o)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let n = a, l = i.tokenizer[n], c = o[n];
          o[n] = (...h) => {
            let u = l.apply(o, h);
            return u === !1 && (u = c.apply(o, h)), u;
          };
        }
        s.tokenizer = o;
      }
      if (i.hooks) {
        let o = this.defaults.hooks || new os();
        for (let a in i.hooks) {
          if (!(a in o)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let n = a, l = i.hooks[n], c = o[n];
          os.passThroughHooks.has(a) ? o[n] = (h) => {
            if (this.defaults.async && os.passThroughHooksRespectAsync.has(a)) return (async () => {
              let f = await l.call(o, h);
              return c.call(o, f);
            })();
            let u = l.call(o, h);
            return c.call(o, u);
          } : o[n] = (...h) => {
            if (this.defaults.async) return (async () => {
              let f = await l.apply(o, h);
              return f === !1 && (f = await c.apply(o, h)), f;
            })();
            let u = l.apply(o, h);
            return u === !1 && (u = c.apply(o, h)), u;
          };
        }
        s.hooks = o;
      }
      if (i.walkTokens) {
        let o = this.defaults.walkTokens, a = i.walkTokens;
        s.walkTokens = function(n) {
          let l = [];
          return l.push(a.call(this, n)), o && (l = l.concat(o.call(this, n))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, r) {
    return We.lex(t, r ?? this.defaults);
  }
  parser(t, r) {
    return ze.parse(t, r ?? this.defaults);
  }
  parseMarkdown(t) {
    return (r, i) => {
      let s = { ...i }, o = { ...this.defaults, ...s }, a = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && s.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof r > "u" || r === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof r != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = t), o.async) return (async () => {
        let n = o.hooks ? await o.hooks.preprocess(r) : r, l = await (o.hooks ? await o.hooks.provideLexer() : t ? We.lex : We.lexInline)(n, o), c = o.hooks ? await o.hooks.processAllTokens(l) : l;
        o.walkTokens && await Promise.all(this.walkTokens(c, o.walkTokens));
        let h = await (o.hooks ? await o.hooks.provideParser() : t ? ze.parse : ze.parseInline)(c, o);
        return o.hooks ? await o.hooks.postprocess(h) : h;
      })().catch(a);
      try {
        o.hooks && (r = o.hooks.preprocess(r));
        let n = (o.hooks ? o.hooks.provideLexer() : t ? We.lex : We.lexInline)(r, o);
        o.hooks && (n = o.hooks.processAllTokens(n)), o.walkTokens && this.walkTokens(n, o.walkTokens);
        let l = (o.hooks ? o.hooks.provideParser() : t ? ze.parse : ze.parseInline)(n, o);
        return o.hooks && (l = o.hooks.postprocess(l)), l;
      } catch (n) {
        return a(n);
      }
    };
  }
  onError(t, r) {
    return (i) => {
      if (i.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let s = "<p>An error occurred:</p><pre>" + Je(i.message + "", !0) + "</pre>";
        return r ? Promise.resolve(s) : s;
      }
      if (r) return Promise.reject(i);
      throw i;
    };
  }
}, oi = new NS();
function zt(e, t) {
  return oi.parse(e, t);
}
zt.options = zt.setOptions = function(e) {
  return oi.setOptions(e), zt.defaults = oi.defaults, kp(zt.defaults), zt;
};
zt.getDefaults = uh;
zt.defaults = hi;
zt.use = function(...e) {
  return oi.use(...e), zt.defaults = oi.defaults, kp(zt.defaults), zt;
};
zt.walkTokens = function(e, t) {
  return oi.walkTokens(e, t);
};
zt.parseInline = oi.parseInline;
zt.Parser = ze;
zt.parser = ze.parse;
zt.Renderer = qo;
zt.TextRenderer = Ch;
zt.Lexer = We;
zt.lexer = We.lex;
zt.Tokenizer = No;
zt.Hooks = os;
zt.parse = zt;
zt.options;
zt.setOptions;
zt.use;
zt.walkTokens;
zt.parseInline;
ze.parse;
We.lex;
function Ep(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var i = Array.from(typeof e == "string" ? [e] : e);
  i[i.length - 1] = i[i.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var s = i.reduce(function(n, l) {
    var c = l.match(/\n([\t ]+|(?!\s).)/g);
    return c ? n.concat(c.map(function(h) {
      var u, f;
      return (f = (u = h.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && f !== void 0 ? f : 0;
    })) : n;
  }, []);
  if (s.length) {
    var o = new RegExp(`
[	 ]{` + Math.min.apply(Math, s) + "}", "g");
    i = i.map(function(n) {
      return n.replace(o, `
`);
    });
  }
  i[0] = i[0].replace(/^\r?\n/, "");
  var a = i[0];
  return t.forEach(function(n, l) {
    var c = a.match(/(?:^|\n)( *)$/), h = c ? c[1] : "", u = n;
    typeof n == "string" && n.includes(`
`) && (u = String(n).split(`
`).map(function(f, p) {
      return p === 0 ? f : "" + h + f;
    }).join(`
`)), a += u + i[l + 1];
  }), a;
}
var Jn = typeof performance < "u" && typeof performance.now == "function", gi = /* @__PURE__ */ d(() => Jn ? performance.now() : 0, "now"), mn = "🧜 ", qS = "Mermaid render", WS = "Mermaid", zS = {
  parse: "tertiary",
  prepare: "secondary",
  measure: "primary",
  layout: "primary-dark",
  layoutCore: "error",
  draw: "primary-light",
  paint: "secondary-dark",
  serialize: "tertiary-dark",
  render: "primary-light"
};
(class {
  constructor() {
    this.enabled = !1, this.autoPrint = !0, this.records = [], this.maxRecords = 200, this.roots = [], this.stack = [], this.buckets = {};
  }
  static {
    d(this, "Profiler");
  }
  enable() {
    return this.enabled = !0, this;
  }
  disable() {
    return this.enabled = !1, this;
  }
  /** Begin a new top-level measurement (one per diagram render). */
  start(e) {
    this.enabled && (this.roots = [], this.stack = [], this.buckets = {}, this.begin(e));
  }
  /**
   * Accumulate the wall-clock of a synchronous sub-operation into a named bucket,
   * summed over every call within the render — for hot operations that run too
   * often to be individual tree spans (e.g. per-node `getBBox`). Returns the
   * function's result. No-op (just calls `fn`) unless enabled.
   */
  tickSync(e, t) {
    if (!this.enabled)
      return t();
    const r = gi();
    try {
      return t();
    } finally {
      this.buckets[e] = (this.buckets[e] ?? 0) + (gi() - r);
    }
  }
  /**
   * Async variant of {@link tickSync}. WARNING: only meaningful for operations
   * that run one-at-a-time. Do NOT use it for calls awaited concurrently (e.g.
   * `Promise.all(nodes.map(...))`) — their wall-clocks overlap and the summed
   * bucket balloons far past the real elapsed time. For concurrent CPU
   * attribution use a DevTools CPU profile instead.
   */
  async tick(e, t) {
    if (!this.enabled)
      return t();
    const r = gi();
    try {
      return await t();
    } finally {
      this.buckets[e] = (this.buckets[e] ?? 0) + (gi() - r);
    }
  }
  /** End the current top-level measurement and optionally print a summary. */
  stop() {
    if (!this.enabled)
      return;
    for (; this.stack.length > 0; )
      this.end();
    const e = this.roots.at(-1), t = this.runLabel ?? e?.name;
    return e && (this.records.push({ label: t ?? e.name, tree: e, buckets: { ...this.buckets } }), this.records.length > this.maxRecords && this.records.splice(0, this.records.length - this.maxRecords), this.autoPrint && this.printSummary(e, t)), this.runLabel = void 0, e;
  }
  /** Open a child span. Pair with {@link end}. No-op unless enabled. */
  begin(e) {
    if (!this.enabled)
      return;
    const t = { name: e, start: gi(), duration: -1, children: [] }, r = this.stack.at(-1);
    if (r ? r.children.push(t) : this.roots.push(t), this.stack.push(t), Jn && typeof performance.mark == "function")
      try {
        performance.mark(`${mn}${e} ▶`);
      } catch {
      }
  }
  /** Close the most recently opened span. No-op unless enabled. */
  end() {
    if (!this.enabled)
      return;
    const e = this.stack.pop();
    if (!e)
      return;
    const t = gi();
    if (e.duration = t - e.start, Jn && typeof performance.measure == "function")
      try {
        performance.measure(`${mn}${e.name}`, {
          start: e.start,
          end: t,
          detail: {
            devtools: {
              dataType: "track-entry",
              track: qS,
              trackGroup: WS,
              color: zS[e.name] ?? "primary",
              tooltipText: `${e.name} — ${e.duration.toFixed(1)} ms`
            }
          }
        });
      } catch {
      }
  }
  /**
   * Measure an async phase. Returns the wrapped function's result and rethrows
   * any error after closing the span, so instrumentation never swallows
   * failures or leaks an open span. No measurement overhead unless enabled.
   */
  async span(e, t) {
    if (!this.enabled)
      return t();
    this.begin(e);
    try {
      return await t();
    } finally {
      this.end();
    }
  }
  /** The most recent completed render tree, or `undefined`. */
  report() {
    return this.records.at(-1)?.tree ?? this.roots.at(-1);
  }
  /** Drop all collected records and any in-progress spans. */
  clear() {
    this.records.length = 0, this.roots = [], this.stack = [], this.runLabel = void 0;
  }
  reset() {
    this.roots = [], this.stack = [];
  }
  printSummary(e = this.report(), t) {
    if (!e)
      return;
    const r = e.duration, i = t && t !== e.name ? `${e.name} [${t}]` : e.name, s = ["ms        %    phase"], o = /* @__PURE__ */ d((n, l) => {
      const c = "  ".repeat(l), h = n.duration.toFixed(1).padStart(8), u = r > 0 ? `${(n.duration / r * 100).toFixed(0).padStart(3)}%` : "   -";
      s.push(`${h}  ${u}  ${c}${n.name}`);
      for (const f of n.children)
        o(f, l + 1);
      if (n.children.length > 0) {
        const f = n.children.reduce((m, y) => m + y.duration, 0), p = n.duration - f;
        if (p > 0.5) {
          const m = p.toFixed(1).padStart(8);
          s.push(`${m}       ${c}  (self)`);
        }
      }
    }, "walk");
    o(e, 0);
    const a = Object.keys(this.buckets);
    if (a.length > 0) {
      s.push("—— buckets (summed) ——");
      for (const n of a)
        s.push(`${this.buckets[n].toFixed(1).padStart(8)}       ${n}`);
    }
    console.log(`${mn}mermaid render profile · ${i}
${s.join(`
`)}`);
  }
});
globalThis.injected ??= {
  includeLargeFeatures: !0,
  profiling: !1,
  version: "0.0.0"
};
function $p(e, { markdownAutoWrap: t }) {
  const i = e.replace(/<br\/>/g, `
`).replace(/\n{2,}/g, `
`);
  return Ep(i);
}
d($p, "preprocessMarkdown");
function Op(e) {
  return e.split(/\\n|\n|<br\s*\/?>/gi).map(
    (t) => t.trim().match(/<[^>]+>|[^\s<>]+/g)?.map((r) => ({ content: r, type: "normal" })) ?? []
  );
}
d(Op, "nonMarkdownToLines");
function Dp(e, t = {}) {
  const r = $p(e, t), i = zt.lexer(r), s = [[]];
  let o = 0;
  function a(n, l = "normal") {
    n.type === "text" ? n.text.split(`
`).forEach((h, u) => {
      u !== 0 && (o++, s.push([])), h.split(" ").forEach((f) => {
        f = f.replace(/&#39;/g, "'"), f && s[o].push({ content: f, type: l });
      });
    }) : n.type === "strong" || n.type === "em" ? n.tokens.forEach((c) => {
      a(c, n.type);
    }) : n.type === "html" && s[o].push({ content: n.text, type: "normal" });
  }
  return d(a, "processNode"), i.forEach((n) => {
    n.type === "paragraph" ? n.tokens?.forEach((l) => {
      a(l);
    }) : n.type === "html" ? s[o].push({ content: n.text, type: "normal" }) : s[o].push({ content: n.raw, type: "normal" });
  }), s;
}
d(Dp, "markdownToLines");
function Ip(e) {
  return e ? `<p>${/**
  * Replace new lines with <br /> tags.
  *
  * Unlike in markdown text, `\n` sequences are treated as line breaks here.
  */
  e.replace(/\\n|\n/g, "<br />")}</p>` : "";
}
d(Ip, "nonMarkdownToHTML");
function Pp(e, { markdownAutoWrap: t } = {}) {
  const r = zt.lexer(e);
  function i(s) {
    return s.type === "text" ? t === !1 ? s.text.replace(/\n */g, "<br/>").replace(/ /g, "&nbsp;") : s.text.replace(/\n */g, "<br/>") : s.type === "strong" ? `<strong>${s.tokens?.map(i).join("")}</strong>` : s.type === "em" ? `<em>${s.tokens?.map(i).join("")}</em>` : s.type === "paragraph" ? `<p>${s.tokens?.map(i).join("")}</p>` : s.type === "space" ? "" : s.type === "html" ? `${s.text}` : s.type === "escape" ? s.text : (J.warn(`Unsupported markdown: ${s.type}`), s.raw);
  }
  return d(i, "output"), r.map(i).join("");
}
d(Pp, "markdownToHTML");
var HS = (function(e) {
  var t = function() {
  }, r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || function(c) {
    return setTimeout(c, 16);
  };
  function i() {
    var c = this;
    c.reads = [], c.writes = [], c.raf = r.bind(e);
  }
  d(i, "FastDom"), i.prototype = {
    constructor: i,
    /**
     * We run this inside a try catch
     * so that if any jobs error, we
     * are able to recover and continue
     * to flush the batch until it's empty.
     *
     * @param {Array} tasks
     */
    runTasks: /* @__PURE__ */ d(function(c) {
      for (var h; h = c.shift(); ) h();
    }, "runTasks"),
    /**
     * Adds a job to the read batch and
     * schedules a new frame if need be.
     *
     * @param  {Function} fn
     * @param  {Object} ctx the context to be bound to `fn` (optional).
     * @public
     */
    measure: /* @__PURE__ */ d(function(c, h) {
      var u = h ? c.bind(h) : c;
      return this.reads.push(u), s(this), u;
    }, "measure"),
    /**
     * Adds a job to the
     * write batch and schedules
     * a new frame if need be.
     *
     * @param  {Function} fn
     * @param  {Object} ctx the context to be bound to `fn` (optional).
     * @public
     */
    mutate: /* @__PURE__ */ d(function(c, h) {
      var u = h ? c.bind(h) : c;
      return this.writes.push(u), s(this), u;
    }, "mutate"),
    /**
     * Clears a scheduled 'read' or 'write' task.
     *
     * @param {Object} task
     * @return {Boolean} success
     * @public
     */
    clear: /* @__PURE__ */ d(function(c) {
      return a(this.reads, c) || a(this.writes, c);
    }, "clear"),
    /**
     * Extend this FastDom with some
     * custom functionality.
     *
     * Because fastdom must *always* be a
     * singleton, we're actually extending
     * the fastdom instance. This means tasks
     * scheduled by an extension still enter
     * fastdom's global task queue.
     *
     * The 'super' instance can be accessed
     * from `this.fastdom`.
     *
     * @example
     *
     * var myFastdom = fastdom.extend({
     *   initialize: function() {
     *     // runs on creation
     *   },
     *
     *   // override a method
     *   measure: function(fn) {
     *     // do extra stuff ...
     *
     *     // then call the original
     *     return this.fastdom.measure(fn);
     *   },
     *
     *   ...
     * });
     *
     * @param  {Object} props  properties to mixin
     * @return {FastDom}
     */
    extend: /* @__PURE__ */ d(function(c) {
      if (typeof c != "object") throw new Error("expected object");
      var h = Object.create(this);
      return n(h, c), h.fastdom = this, h.initialize && h.initialize(), h;
    }, "extend"),
    // override this with a function
    // to prevent Errors in console
    // when tasks throw
    catch: null
  };
  function s(c) {
    c.scheduled || (c.scheduled = !0, c.raf(o.bind(null, c)));
  }
  d(s, "scheduleFlush");
  function o(c) {
    var h = c.writes, u = c.reads, f;
    try {
      t("flushing reads", u.length), c.runTasks(u), t("flushing writes", h.length), c.runTasks(h);
    } catch (p) {
      f = p;
    }
    if (c.scheduled = !1, (u.length || h.length) && s(c), f)
      if (t("task errored", f.message), c.catch) c.catch(f);
      else throw f;
  }
  d(o, "flush");
  function a(c, h) {
    var u = c.indexOf(h);
    return !!~u && !!c.splice(u, 1);
  }
  d(a, "remove");
  function n(c, h) {
    for (var u in h)
      h.hasOwnProperty(u) && (c[u] = h[u]);
  }
  d(n, "mixin");
  var l = e.fastdom = e.fastdom || new i();
  return l;
})(typeof window < "u" ? window : globalThis), Rp = {
  initialize: /* @__PURE__ */ d(function() {
    this._tasks = /* @__PURE__ */ new Map();
  }, "initialize"),
  mutate: /* @__PURE__ */ d(function(e, t) {
    return tl(this, "mutate", e, t);
  }, "mutate"),
  measure: /* @__PURE__ */ d(function(e, t) {
    return tl(this, "measure", e, t);
  }, "measure"),
  clear: /* @__PURE__ */ d(function(e) {
    var t = this._tasks, r = t.get(e);
    this.fastdom.clear(r), t.delete(e);
  }, "clear")
};
function tl(e, t, r, i) {
  var s = e._tasks, o = e.fastdom, a, n = new Promise(function(l, c) {
    a = o[t](function() {
      s.delete(n);
      try {
        l(i ? r.call(i) : r());
      } catch (h) {
        c(h);
      }
    }, i);
  });
  return s.set(n, a), n;
}
d(tl, "create");
var { initialize: pM, mutate: gM, measure: mM, clear: yM } = Rp, YS = Rp, US = HS.extend({
  /**
   * `requestAnimationFrame` is too slow compared to `queueMicrotask`.
   */
  raf(e) {
    typeof queueMicrotask == "function" ? queueMicrotask(e) : setTimeout(e, 0);
  }
}).extend(YS), ai = US;
function Np(e) {
  return Intl.Segmenter ? [...new Intl.Segmenter().segment(e)].map((t) => t.segment) : [...e];
}
d(Np, "splitTextToChars");
function qp(e, t) {
  const r = Np(t.content);
  return bh(e, [], r, t.type);
}
d(qp, "splitWordToFitWidth");
function bh(e, t, r, i) {
  if (r.length === 0)
    return [
      { content: t.join(""), type: i },
      { content: "", type: i }
    ];
  const [s, ...o] = r, a = [...t, s];
  return e([{ content: a.join(""), type: i }]) ? bh(e, a, o, i) : (t.length === 0 && s && (t.push(s), r.shift()), [
    { content: t.join(""), type: i },
    { content: r.join(""), type: i }
  ]);
}
d(bh, "splitWordToFitWidthRecursion");
function Wp(e, t) {
  if (e.some(({ content: r }) => r.includes(`
`)))
    throw new Error("splitLineToFitWidth does not support newlines in the line");
  return Wo(e, t);
}
d(Wp, "splitLineToFitWidth");
function Wo(e, t, r = [], i = []) {
  if (e.length === 0)
    return i.length > 0 && r.push(i), r.length > 0 ? r : [];
  let s = "";
  e[0].content === " " && (s = " ", e.shift());
  const o = e.shift() ?? { content: " ", type: "normal" }, a = [...i];
  if (s !== "" && a.push({ content: s, type: "normal" }), a.push(o), t(a))
    return Wo(e, t, r, a);
  if (i.length > 0)
    r.push(i), e.unshift(o);
  else if (o.content) {
    const [n, l] = qp(t, o);
    r.push([n]), l.content && e.unshift(l);
  }
  return Wo(e, t, r);
}
d(Wo, "splitLineToFitWidthRecursion");
function el(e, t) {
  t && e.attr("style", t);
}
d(el, "applyStyle");
var Lu = 16384;
async function zp(e, t, r, i, s = !1, o = Ut(), a = 0) {
  const n = e.append("foreignObject");
  n.attr("width", `${Math.min(10 * r, Lu)}px`), n.attr("height", `${Math.min(10 * r, Lu)}px`);
  const l = n.append("xhtml:div"), c = ys(t.label) ? await ef(t.label.replace(_s.lineBreakRegex, `
`), o) : Ee(t.label, o), h = t.isNode ? "nodeLabel" : "edgeLabel", u = l.append("span");
  u.html(c), el(u, t.labelStyle), u.attr("class", `${h} ${i}`), el(l, t.labelStyle), l.style("display", "table-cell"), l.style("white-space", "nowrap"), l.style("line-height", "1.5"), r !== Number.POSITIVE_INFINITY && (l.style("max-width", r + "px"), l.style("text-align", "center")), l.attr("xmlns", "http://www.w3.org/1999/xhtml"), s && l.attr("class", "labelBkg");
  const f = await ai.measure(() => l.node().getBoundingClientRect());
  return f.width === r ? (l.style("display", "table"), l.style("white-space", "break-spaces"), l.style("width", r + "px")) : f.width < a && (l.style("display", "table"), l.style("width", a + "px"), l.style("text-align", "center")), n.node();
}
d(zp, "addHtmlSpan");
function ha(e, t, r, i = !1) {
  const s = e.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", t * r - 0.1 + "em").attr("dy", r + "em");
  return i && s.attr("text-anchor", "middle"), s;
}
d(ha, "createTspan");
function Hp(e, t, r) {
  const i = e.append("text"), s = ha(i, 1, t);
  ca(s, r);
  const o = s.node().getComputedTextLength();
  return i.remove(), o;
}
d(Hp, "computeWidthOfText");
function jS(e, t, r) {
  const i = e.append("text"), s = ha(i, 1, t);
  ca(s, [{ content: r, type: "normal" }]);
  const o = s.node()?.getBoundingClientRect();
  return o && i.remove(), o;
}
d(jS, "computeDimensionOfText");
function Yp(e, t, r, i = !1, s = !1) {
  const a = t.append("g"), n = a.insert("rect").attr("class", "background").attr("style", "stroke: none"), l = a.append("text").attr("y", "-10.1");
  s && l.attr("text-anchor", "middle");
  let c = 0;
  for (const h of r) {
    const u = /* @__PURE__ */ d((p) => Hp(a, 1.1, p) <= e, "checkWidth"), f = u(h) ? [h] : Wp(h, u);
    for (const p of f) {
      const m = ha(l, c, 1.1, s);
      ca(m, p), c++;
    }
  }
  if (i) {
    const h = l.node().getBBox(), u = 2;
    return n.attr("x", h.x - u).attr("y", h.y - u).attr("width", h.width + 2 * u).attr("height", h.height + 2 * u), a.node();
  } else
    return l.node();
}
d(Yp, "createFormattedText");
function rl(e) {
  const t = /&(amp|lt|gt);/g;
  return e.replace(t, (r, i) => {
    switch (i) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      default:
        return r;
    }
  });
}
d(rl, "decodeHTMLEntities");
function ca(e, t) {
  e.text(""), t.forEach((r, i) => {
    const s = e.append("tspan").attr("font-style", r.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", r.type === "strong" ? "bold" : "normal");
    i === 0 ? s.text(rl(r.content)) : s.text(" " + rl(r.content));
  });
}
d(ca, "updateTextContentAndStyles");
async function Up(e, t = {}) {
  const r = [];
  e.replace(/(fa[bklrs]?):fa-([\w-]+)/g, (s, o, a) => (r.push(
    (async () => {
      const n = `${o}:${a}`;
      return await hf(n) ? await li(n, void 0, { class: "label-icon" }) : `<i class='${Ee(s, t).replace(":", " ")}'></i>`;
    })()
  ), s));
  const i = await Promise.all(r);
  return e.replace(/(fa[bklrs]?):fa-([\w-]+)/g, () => i.shift() ?? "");
}
d(Up, "replaceIconSubstring");
var ve = /* @__PURE__ */ d(async (e, t = "", {
  style: r = "",
  isTitle: i = !1,
  classes: s = "",
  useHtmlLabels: o = !0,
  markdown: a = !0,
  isNode: n = !0,
  /**
   * The width to wrap the text within. Set to `Number.POSITIVE_INFINITY` for no wrapping.
   */
  width: l = 200,
  /**
   * The minimum width of the label; narrower text is widened to it. `0` disables it.
   * Only applies to HTML labels — SVG text has no box to size.
   */
  minWidth: c = 0,
  addSvgBackground: h = !1
} = {}, u) => {
  if (J.debug(
    "XYZ createText",
    t,
    r,
    i,
    s,
    o,
    n,
    "addSvgBackground: ",
    h
  ), o) {
    const f = a ? Pp(t, u) : Ip(t), p = await Up(zr(f), u), m = t.replace(/\\\\/g, "\\"), y = {
      isNode: n,
      label: ys(t) ? m : p,
      labelStyle: r.replace("fill:", "color:")
    };
    return await zp(
      e,
      y,
      l,
      s,
      h,
      u,
      c
    );
  } else {
    const f = zr(t.replace(/<br\s*\/?>/g, "<br/>")), p = a ? Dp(f.replace("<br>", "<br/>"), u) : Op(f), m = Yp(
      l,
      e,
      p,
      t ? h : !1,
      !n
    );
    if (n) {
      /stroke:/.exec(r) && (r = r.replace("stroke:", "lineColor:"));
      const y = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      $t(m).attr("style", y);
    } else {
      const y = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/background:/g, "fill:");
      $t(m).select("rect").attr("style", y.replace(/background:/g, "fill:"));
      const x = r.replace(/stroke:[^;]+;?/g, "").replace(/stroke-width:[^;]+;?/g, "").replace(/fill:[^;]+;?/g, "").replace(/color:/g, "fill:");
      $t(m).select("text").attr("style", x);
    }
    return i ? $t(m).selectAll("tspan.text-outer-tspan").classed("title-row", !0) : $t(m).selectAll("tspan.text-outer-tspan").classed("row", !0), m;
  }
}, "createText"), GS = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]), XS = 12, VS = 64, kh = /* @__PURE__ */ d((e) => Array.isArray(e) && e.length > 0, "hasPalette"), ZS = /* @__PURE__ */ d((e, t) => e != null && GS.has(e) && kh(t), "isColorTheme"), KS = /^[\w-]+$/, xM = /* @__PURE__ */ d((e) => {
  const t = typeof e == "string" || typeof e == "number" ? String(e) : "";
  return KS.test(t) ? t : "classic";
}, "safeLook"), jp = /* @__PURE__ */ d((e) => kh(e) ? e.length : 0, "paletteSlotCount"), CM = /* @__PURE__ */ d((e, t) => kh(t) ? jp(t) : typeof e == "number" && Number.isInteger(e) && e > 0 && e <= VS ? e : XS, "colorSlotCount"), Oe = /* @__PURE__ */ d((e, t, r, i) => {
  if (t === void 0 || !ZS(r, i))
    return;
  const s = t % jp(i);
  e.attr("data-color-id", `color-${s}`);
}, "stampColorSlot");
function yn(e, t, r) {
  if (e && e.length) {
    const [i, s] = t, o = Math.PI / 180 * r, a = Math.cos(o), n = Math.sin(o);
    for (const l of e) {
      const [c, h] = l;
      l[0] = (c - i) * a - (h - s) * n + i, l[1] = (c - i) * n + (h - s) * a + s;
    }
  }
}
function QS(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function JS(e, t, r, i = 1) {
  const s = r, o = Math.max(t, 0.1), a = e[0] && e[0][0] && typeof e[0][0] == "number" ? [e] : e, n = [0, 0];
  if (s) for (const c of a) yn(c, n, s);
  const l = (function(c, h, u) {
    const f = [];
    for (const b of c) {
      const S = [...b];
      QS(S[0], S[S.length - 1]) || S.push([S[0][0], S[0][1]]), S.length > 2 && f.push(S);
    }
    const p = [];
    h = Math.max(h, 0.1);
    const m = [];
    for (const b of f) for (let S = 0; S < b.length - 1; S++) {
      const _ = b[S], B = b[S + 1];
      if (_[1] !== B[1]) {
        const F = Math.min(_[1], B[1]);
        m.push({ ymin: F, ymax: Math.max(_[1], B[1]), x: F === _[1] ? _[0] : B[0], islope: (B[0] - _[0]) / (B[1] - _[1]) });
      }
    }
    if (m.sort(((b, S) => b.ymin < S.ymin ? -1 : b.ymin > S.ymin ? 1 : b.x < S.x ? -1 : b.x > S.x ? 1 : b.ymax === S.ymax ? 0 : (b.ymax - S.ymax) / Math.abs(b.ymax - S.ymax))), !m.length) return p;
    let y = [], x = m[0].ymin, C = 0;
    for (; y.length || m.length; ) {
      if (m.length) {
        let b = -1;
        for (let S = 0; S < m.length && !(m[S].ymin > x); S++) b = S;
        m.splice(0, b + 1).forEach(((S) => {
          y.push({ s: x, edge: S });
        }));
      }
      if (y = y.filter(((b) => !(b.edge.ymax <= x))), y.sort(((b, S) => b.edge.x === S.edge.x ? 0 : (b.edge.x - S.edge.x) / Math.abs(b.edge.x - S.edge.x))), (u !== 1 || C % h == 0) && y.length > 1) for (let b = 0; b < y.length; b += 2) {
        const S = b + 1;
        if (S >= y.length) break;
        const _ = y[b].edge, B = y[S].edge;
        p.push([[Math.round(_.x), x], [Math.round(B.x), x]]);
      }
      x += u, y.forEach(((b) => {
        b.edge.x = b.edge.x + u * b.edge.islope;
      })), C++;
    }
    return p;
  })(a, o, i);
  if (s) {
    for (const c of a) yn(c, n, -s);
    (function(c, h, u) {
      const f = [];
      c.forEach(((p) => f.push(...p))), yn(f, h, u);
    })(l, n, -s);
  }
  return l;
}
function As(e, t) {
  var r;
  const i = t.hachureAngle + 90;
  let s = t.hachureGap;
  s < 0 && (s = 4 * t.strokeWidth), s = Math.round(Math.max(s, 0.1));
  let o = 1;
  return t.roughness >= 1 && (((r = t.randomizer) === null || r === void 0 ? void 0 : r.next()) || Math.random()) > 0.7 && (o = s), JS(e, s, i, o || 1);
}
class wh {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    return this._fillPolygons(t, r);
  }
  _fillPolygons(t, r) {
    const i = As(t, r);
    return { type: "fillSketch", ops: this.renderLines(i, r) };
  }
  renderLines(t, r) {
    const i = [];
    for (const s of t) i.push(...this.helper.doubleLineOps(s[0][0], s[0][1], s[1][0], s[1][1], r));
    return i;
  }
}
function ua(e) {
  const t = e[0], r = e[1];
  return Math.sqrt(Math.pow(t[0] - r[0], 2) + Math.pow(t[1] - r[1], 2));
}
class tT extends wh {
  fillPolygons(t, r) {
    let i = r.hachureGap;
    i < 0 && (i = 4 * r.strokeWidth), i = Math.max(i, 0.1);
    const s = As(t, Object.assign({}, r, { hachureGap: i })), o = Math.PI / 180 * r.hachureAngle, a = [], n = 0.5 * i * Math.cos(o), l = 0.5 * i * Math.sin(o);
    for (const [c, h] of s) ua([c, h]) && a.push([[c[0] - n, c[1] + l], [...h]], [[c[0] + n, c[1] - l], [...h]]);
    return { type: "fillSketch", ops: this.renderLines(a, r) };
  }
}
class eT extends wh {
  fillPolygons(t, r) {
    const i = this._fillPolygons(t, r), s = Object.assign({}, r, { hachureAngle: r.hachureAngle + 90 }), o = this._fillPolygons(t, s);
    return i.ops = i.ops.concat(o.ops), i;
  }
}
class rT {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = As(t, r = Object.assign({}, r, { hachureAngle: 0 }));
    return this.dotsOnLines(i, r);
  }
  dotsOnLines(t, r) {
    const i = [];
    let s = r.hachureGap;
    s < 0 && (s = 4 * r.strokeWidth), s = Math.max(s, 0.1);
    let o = r.fillWeight;
    o < 0 && (o = r.strokeWidth / 2);
    const a = s / 4;
    for (const n of t) {
      const l = ua(n), c = l / s, h = Math.ceil(c) - 1, u = l - h * s, f = (n[0][0] + n[1][0]) / 2 - s / 4, p = Math.min(n[0][1], n[1][1]);
      for (let m = 0; m < h; m++) {
        const y = p + u + m * s, x = f - a + 2 * Math.random() * a, C = y - a + 2 * Math.random() * a, b = this.helper.ellipse(x, C, o, o, r);
        i.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: i };
  }
}
class iT {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = As(t, r);
    return { type: "fillSketch", ops: this.dashedLine(i, r) };
  }
  dashedLine(t, r) {
    const i = r.dashOffset < 0 ? r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap : r.dashOffset, s = r.dashGap < 0 ? r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap : r.dashGap, o = [];
    return t.forEach(((a) => {
      const n = ua(a), l = Math.floor(n / (i + s)), c = (n + s - l * (i + s)) / 2;
      let h = a[0], u = a[1];
      h[0] > u[0] && (h = a[1], u = a[0]);
      const f = Math.atan((u[1] - h[1]) / (u[0] - h[0]));
      for (let p = 0; p < l; p++) {
        const m = p * (i + s), y = m + i, x = [h[0] + m * Math.cos(f) + c * Math.cos(f), h[1] + m * Math.sin(f) + c * Math.sin(f)], C = [h[0] + y * Math.cos(f) + c * Math.cos(f), h[1] + y * Math.sin(f) + c * Math.sin(f)];
        o.push(...this.helper.doubleLineOps(x[0], x[1], C[0], C[1], r));
      }
    })), o;
  }
}
class sT {
  constructor(t) {
    this.helper = t;
  }
  fillPolygons(t, r) {
    const i = r.hachureGap < 0 ? 4 * r.strokeWidth : r.hachureGap, s = r.zigzagOffset < 0 ? i : r.zigzagOffset, o = As(t, r = Object.assign({}, r, { hachureGap: i + s }));
    return { type: "fillSketch", ops: this.zigzagLines(o, s, r) };
  }
  zigzagLines(t, r, i) {
    const s = [];
    return t.forEach(((o) => {
      const a = ua(o), n = Math.round(a / (2 * r));
      let l = o[0], c = o[1];
      l[0] > c[0] && (l = o[1], c = o[0]);
      const h = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let u = 0; u < n; u++) {
        const f = 2 * u * r, p = 2 * (u + 1) * r, m = Math.sqrt(2 * Math.pow(r, 2)), y = [l[0] + f * Math.cos(h), l[1] + f * Math.sin(h)], x = [l[0] + p * Math.cos(h), l[1] + p * Math.sin(h)], C = [y[0] + m * Math.cos(h + Math.PI / 4), y[1] + m * Math.sin(h + Math.PI / 4)];
        s.push(...this.helper.doubleLineOps(y[0], y[1], C[0], C[1], i), ...this.helper.doubleLineOps(C[0], C[1], x[0], x[1], i));
      }
    })), s;
  }
}
const Ce = {};
class oT {
  constructor(t) {
    this.seed = t;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const aT = 0, xn = 1, Fu = 2, Ks = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Cn(e, t) {
  return e.type === t;
}
function Sh(e) {
  const t = [], r = (function(a) {
    const n = new Array();
    for (; a !== ""; ) if (a.match(/^([ \t\r\n,]+)/)) a = a.substr(RegExp.$1.length);
    else if (a.match(/^([aAcChHlLmMqQsStTvVzZ])/)) n[n.length] = { type: aT, text: RegExp.$1 }, a = a.substr(RegExp.$1.length);
    else {
      if (!a.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      n[n.length] = { type: xn, text: `${parseFloat(RegExp.$1)}` }, a = a.substr(RegExp.$1.length);
    }
    return n[n.length] = { type: Fu, text: "" }, n;
  })(e);
  let i = "BOD", s = 0, o = r[s];
  for (; !Cn(o, Fu); ) {
    let a = 0;
    const n = [];
    if (i === "BOD") {
      if (o.text !== "M" && o.text !== "m") return Sh("M0,0" + e);
      s++, a = Ks[o.text], i = o.text;
    } else Cn(o, xn) ? a = Ks[i] : (s++, a = Ks[o.text], i = o.text);
    if (!(s + a < r.length)) throw new Error("Path data ended short");
    for (let l = s; l < s + a; l++) {
      const c = r[l];
      if (!Cn(c, xn)) throw new Error("Param not a number: " + i + "," + c.text);
      n[n.length] = +c.text;
    }
    if (typeof Ks[i] != "number") throw new Error("Bad segment: " + i);
    {
      const l = { key: i, data: n };
      t.push(l), s += a, o = r[s], i === "M" && (i = "L"), i === "m" && (i = "l");
    }
  }
  return t;
}
function Gp(e) {
  let t = 0, r = 0, i = 0, s = 0;
  const o = [];
  for (const { key: a, data: n } of e) switch (a) {
    case "M":
      o.push({ key: "M", data: [...n] }), [t, r] = n, [i, s] = n;
      break;
    case "m":
      t += n[0], r += n[1], o.push({ key: "M", data: [t, r] }), i = t, s = r;
      break;
    case "L":
      o.push({ key: "L", data: [...n] }), [t, r] = n;
      break;
    case "l":
      t += n[0], r += n[1], o.push({ key: "L", data: [t, r] });
      break;
    case "C":
      o.push({ key: "C", data: [...n] }), t = n[4], r = n[5];
      break;
    case "c": {
      const l = n.map(((c, h) => h % 2 ? c + r : c + t));
      o.push({ key: "C", data: l }), t = l[4], r = l[5];
      break;
    }
    case "Q":
      o.push({ key: "Q", data: [...n] }), t = n[2], r = n[3];
      break;
    case "q": {
      const l = n.map(((c, h) => h % 2 ? c + r : c + t));
      o.push({ key: "Q", data: l }), t = l[2], r = l[3];
      break;
    }
    case "A":
      o.push({ key: "A", data: [...n] }), t = n[5], r = n[6];
      break;
    case "a":
      t += n[5], r += n[6], o.push({ key: "A", data: [n[0], n[1], n[2], n[3], n[4], t, r] });
      break;
    case "H":
      o.push({ key: "H", data: [...n] }), t = n[0];
      break;
    case "h":
      t += n[0], o.push({ key: "H", data: [t] });
      break;
    case "V":
      o.push({ key: "V", data: [...n] }), r = n[0];
      break;
    case "v":
      r += n[0], o.push({ key: "V", data: [r] });
      break;
    case "S":
      o.push({ key: "S", data: [...n] }), t = n[2], r = n[3];
      break;
    case "s": {
      const l = n.map(((c, h) => h % 2 ? c + r : c + t));
      o.push({ key: "S", data: l }), t = l[2], r = l[3];
      break;
    }
    case "T":
      o.push({ key: "T", data: [...n] }), t = n[0], r = n[1];
      break;
    case "t":
      t += n[0], r += n[1], o.push({ key: "T", data: [t, r] });
      break;
    case "Z":
    case "z":
      o.push({ key: "Z", data: [] }), t = i, r = s;
  }
  return o;
}
function Xp(e) {
  const t = [];
  let r = "", i = 0, s = 0, o = 0, a = 0, n = 0, l = 0;
  for (const { key: c, data: h } of e) {
    switch (c) {
      case "M":
        t.push({ key: "M", data: [...h] }), [i, s] = h, [o, a] = h;
        break;
      case "C":
        t.push({ key: "C", data: [...h] }), i = h[4], s = h[5], n = h[2], l = h[3];
        break;
      case "L":
        t.push({ key: "L", data: [...h] }), [i, s] = h;
        break;
      case "H":
        i = h[0], t.push({ key: "L", data: [i, s] });
        break;
      case "V":
        s = h[0], t.push({ key: "L", data: [i, s] });
        break;
      case "S": {
        let u = 0, f = 0;
        r === "C" || r === "S" ? (u = i + (i - n), f = s + (s - l)) : (u = i, f = s), t.push({ key: "C", data: [u, f, ...h] }), n = h[0], l = h[1], i = h[2], s = h[3];
        break;
      }
      case "T": {
        const [u, f] = h;
        let p = 0, m = 0;
        r === "Q" || r === "T" ? (p = i + (i - n), m = s + (s - l)) : (p = i, m = s);
        const y = i + 2 * (p - i) / 3, x = s + 2 * (m - s) / 3, C = u + 2 * (p - u) / 3, b = f + 2 * (m - f) / 3;
        t.push({ key: "C", data: [y, x, C, b, u, f] }), n = p, l = m, i = u, s = f;
        break;
      }
      case "Q": {
        const [u, f, p, m] = h, y = i + 2 * (u - i) / 3, x = s + 2 * (f - s) / 3, C = p + 2 * (u - p) / 3, b = m + 2 * (f - m) / 3;
        t.push({ key: "C", data: [y, x, C, b, p, m] }), n = u, l = f, i = p, s = m;
        break;
      }
      case "A": {
        const u = Math.abs(h[0]), f = Math.abs(h[1]), p = h[2], m = h[3], y = h[4], x = h[5], C = h[6];
        u === 0 || f === 0 ? (t.push({ key: "C", data: [i, s, x, C, x, C] }), i = x, s = C) : (i !== x || s !== C) && (Vp(i, s, x, C, u, f, p, m, y).forEach((function(b) {
          t.push({ key: "C", data: b });
        })), i = x, s = C);
        break;
      }
      case "Z":
        t.push({ key: "Z", data: [] }), i = o, s = a;
    }
    r = c;
  }
  return t;
}
function Xi(e, t, r) {
  return [e * Math.cos(r) - t * Math.sin(r), e * Math.sin(r) + t * Math.cos(r)];
}
function Vp(e, t, r, i, s, o, a, n, l, c) {
  const h = (u = a, Math.PI * u / 180);
  var u;
  let f = [], p = 0, m = 0, y = 0, x = 0;
  if (c) [p, m, y, x] = c;
  else {
    [e, t] = Xi(e, t, -h), [r, i] = Xi(r, i, -h);
    const R = (e - r) / 2, E = (t - i) / 2;
    let I = R * R / (s * s) + E * E / (o * o);
    I > 1 && (I = Math.sqrt(I), s *= I, o *= I);
    const v = s * s, W = o * o, q = v * W - v * E * E - W * R * R, rt = v * E * E + W * R * R, V = (n === l ? -1 : 1) * Math.sqrt(Math.abs(q / rt));
    y = V * s * E / o + (e + r) / 2, x = V * -o * R / s + (t + i) / 2, p = Math.asin(parseFloat(((t - x) / o).toFixed(9))), m = Math.asin(parseFloat(((i - x) / o).toFixed(9))), e < y && (p = Math.PI - p), r < y && (m = Math.PI - m), p < 0 && (p = 2 * Math.PI + p), m < 0 && (m = 2 * Math.PI + m), l && p > m && (p -= 2 * Math.PI), !l && m > p && (m -= 2 * Math.PI);
  }
  let C = m - p;
  if (Math.abs(C) > 120 * Math.PI / 180) {
    const R = m, E = r, I = i;
    m = l && m > p ? p + 120 * Math.PI / 180 * 1 : p + 120 * Math.PI / 180 * -1, f = Vp(r = y + s * Math.cos(m), i = x + o * Math.sin(m), E, I, s, o, a, 0, l, [m, R, y, x]);
  }
  C = m - p;
  const b = Math.cos(p), S = Math.sin(p), _ = Math.cos(m), B = Math.sin(m), F = Math.tan(C / 4), A = 4 / 3 * s * F, L = 4 / 3 * o * F, H = [e, t], N = [e + A * S, t - L * b], O = [r + A * B, i - L * _], Q = [r, i];
  if (N[0] = 2 * H[0] - N[0], N[1] = 2 * H[1] - N[1], c) return [N, O, Q].concat(f);
  {
    f = [N, O, Q].concat(f);
    const R = [];
    for (let E = 0; E < f.length; E += 3) {
      const I = Xi(f[E][0], f[E][1], h), v = Xi(f[E + 1][0], f[E + 1][1], h), W = Xi(f[E + 2][0], f[E + 2][1], h);
      R.push([I[0], I[1], v[0], v[1], W[0], W[1]]);
    }
    return R;
  }
}
const nT = { randOffset: function(e, t) {
  return Lt(e, t);
}, randOffsetWithRange: function(e, t, r) {
  return zo(e, t, r);
}, ellipse: function(e, t, r, i, s) {
  const o = Kp(r, i, s);
  return il(e, t, s, o).opset;
}, doubleLineOps: function(e, t, r, i, s) {
  return Hr(e, t, r, i, s, !0);
} };
function Zp(e, t, r, i, s) {
  return { type: "path", ops: Hr(e, t, r, i, s) };
}
function po(e, t, r) {
  const i = (e || []).length;
  if (i > 2) {
    const s = [];
    for (let o = 0; o < i - 1; o++) s.push(...Hr(e[o][0], e[o][1], e[o + 1][0], e[o + 1][1], r));
    return t && s.push(...Hr(e[i - 1][0], e[i - 1][1], e[0][0], e[0][1], r)), { type: "path", ops: s };
  }
  return i === 2 ? Zp(e[0][0], e[0][1], e[1][0], e[1][1], r) : { type: "path", ops: [] };
}
function lT(e, t, r, i, s) {
  return (function(o, a) {
    return po(o, !0, a);
  })([[e, t], [e + r, t], [e + r, t + i], [e, t + i]], s);
}
function Au(e, t) {
  if (e.length) {
    const r = typeof e[0][0] == "number" ? [e] : e, i = Qs(r[0], 1 * (1 + 0.2 * t.roughness), t), s = t.disableMultiStroke ? [] : Qs(r[0], 1.5 * (1 + 0.22 * t.roughness), $u(t));
    for (let o = 1; o < r.length; o++) {
      const a = r[o];
      if (a.length) {
        const n = Qs(a, 1 * (1 + 0.2 * t.roughness), t), l = t.disableMultiStroke ? [] : Qs(a, 1.5 * (1 + 0.22 * t.roughness), $u(t));
        for (const c of n) c.op !== "move" && i.push(c);
        for (const c of l) c.op !== "move" && s.push(c);
      }
    }
    return { type: "path", ops: i.concat(s) };
  }
  return { type: "path", ops: [] };
}
function Kp(e, t, r) {
  const i = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(e / 2, 2) + Math.pow(t / 2, 2)) / 2)), s = Math.ceil(Math.max(r.curveStepCount, r.curveStepCount / Math.sqrt(200) * i)), o = 2 * Math.PI / s;
  let a = Math.abs(e / 2), n = Math.abs(t / 2);
  const l = 1 - r.curveFitting;
  return a += Lt(a * l, r), n += Lt(n * l, r), { increment: o, rx: a, ry: n };
}
function il(e, t, r, i) {
  const [s, o] = Ou(i.increment, e, t, i.rx, i.ry, 1, i.increment * zo(0.1, zo(0.4, 1, r), r), r);
  let a = Ho(s, null, r);
  if (!r.disableMultiStroke && r.roughness !== 0) {
    const [n] = Ou(i.increment, e, t, i.rx, i.ry, 1.5, 0, r), l = Ho(n, null, r);
    a = a.concat(l);
  }
  return { estimatedPoints: o, opset: { type: "path", ops: a } };
}
function Mu(e, t, r, i, s, o, a, n, l) {
  const c = e, h = t;
  let u = Math.abs(r / 2), f = Math.abs(i / 2);
  u += Lt(0.01 * u, l), f += Lt(0.01 * f, l);
  let p = s, m = o;
  for (; p < 0; ) p += 2 * Math.PI, m += 2 * Math.PI;
  m - p > 2 * Math.PI && (p = 0, m = 2 * Math.PI);
  const y = 2 * Math.PI / l.curveStepCount, x = Math.min(y / 2, (m - p) / 2), C = Du(x, c, h, u, f, p, m, 1, l);
  if (!l.disableMultiStroke) {
    const b = Du(x, c, h, u, f, p, m, 1.5, l);
    C.push(...b);
  }
  return a && (n ? C.push(...Hr(c, h, c + u * Math.cos(p), h + f * Math.sin(p), l), ...Hr(c, h, c + u * Math.cos(m), h + f * Math.sin(m), l)) : C.push({ op: "lineTo", data: [c, h] }, { op: "lineTo", data: [c + u * Math.cos(p), h + f * Math.sin(p)] })), { type: "path", ops: C };
}
function Eu(e, t) {
  const r = Xp(Gp(Sh(e))), i = [];
  let s = [0, 0], o = [0, 0];
  for (const { key: a, data: n } of r) switch (a) {
    case "M":
      o = [n[0], n[1]], s = [n[0], n[1]];
      break;
    case "L":
      i.push(...Hr(o[0], o[1], n[0], n[1], t)), o = [n[0], n[1]];
      break;
    case "C": {
      const [l, c, h, u, f, p] = n;
      i.push(...hT(l, c, h, u, f, p, o, t)), o = [f, p];
      break;
    }
    case "Z":
      i.push(...Hr(o[0], o[1], s[0], s[1], t)), o = [s[0], s[1]];
  }
  return { type: "path", ops: i };
}
function bn(e, t) {
  const r = [];
  for (const i of e) if (i.length) {
    const s = t.maxRandomnessOffset || 0, o = i.length;
    if (o > 2) {
      r.push({ op: "move", data: [i[0][0] + Lt(s, t), i[0][1] + Lt(s, t)] });
      for (let a = 1; a < o; a++) r.push({ op: "lineTo", data: [i[a][0] + Lt(s, t), i[a][1] + Lt(s, t)] });
    }
  }
  return { type: "fillPath", ops: r };
}
function mi(e, t) {
  return (function(r, i) {
    let s = r.fillStyle || "hachure";
    if (!Ce[s]) switch (s) {
      case "zigzag":
        Ce[s] || (Ce[s] = new tT(i));
        break;
      case "cross-hatch":
        Ce[s] || (Ce[s] = new eT(i));
        break;
      case "dots":
        Ce[s] || (Ce[s] = new rT(i));
        break;
      case "dashed":
        Ce[s] || (Ce[s] = new iT(i));
        break;
      case "zigzag-line":
        Ce[s] || (Ce[s] = new sT(i));
        break;
      default:
        s = "hachure", Ce[s] || (Ce[s] = new wh(i));
    }
    return Ce[s];
  })(t, nT).fillPolygons(e, t);
}
function $u(e) {
  const t = Object.assign({}, e);
  return t.randomizer = void 0, e.seed && (t.seed = e.seed + 1), t;
}
function Qp(e) {
  return e.randomizer || (e.randomizer = new oT(e.seed || 0)), e.randomizer.next();
}
function zo(e, t, r, i = 1) {
  return r.roughness * i * (Qp(r) * (t - e) + e);
}
function Lt(e, t, r = 1) {
  return zo(-e, e, t, r);
}
function Hr(e, t, r, i, s, o = !1) {
  const a = o ? s.disableMultiStrokeFill : s.disableMultiStroke, n = sl(e, t, r, i, s, !0, !1);
  if (a) return n;
  const l = sl(e, t, r, i, s, !0, !0);
  return n.concat(l);
}
function sl(e, t, r, i, s, o, a) {
  const n = Math.pow(e - r, 2) + Math.pow(t - i, 2), l = Math.sqrt(n);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let h = s.maxRandomnessOffset || 0;
  h * h * 100 > n && (h = l / 10);
  const u = h / 2, f = 0.2 + 0.2 * Qp(s);
  let p = s.bowing * s.maxRandomnessOffset * (i - t) / 200, m = s.bowing * s.maxRandomnessOffset * (e - r) / 200;
  p = Lt(p, s, c), m = Lt(m, s, c);
  const y = [], x = () => Lt(u, s, c), C = () => Lt(h, s, c), b = s.preserveVertices;
  return a ? y.push({ op: "move", data: [e + (b ? 0 : x()), t + (b ? 0 : x())] }) : y.push({ op: "move", data: [e + (b ? 0 : Lt(h, s, c)), t + (b ? 0 : Lt(h, s, c))] }), a ? y.push({ op: "bcurveTo", data: [p + e + (r - e) * f + x(), m + t + (i - t) * f + x(), p + e + 2 * (r - e) * f + x(), m + t + 2 * (i - t) * f + x(), r + (b ? 0 : x()), i + (b ? 0 : x())] }) : y.push({ op: "bcurveTo", data: [p + e + (r - e) * f + C(), m + t + (i - t) * f + C(), p + e + 2 * (r - e) * f + C(), m + t + 2 * (i - t) * f + C(), r + (b ? 0 : C()), i + (b ? 0 : C())] }), y;
}
function Qs(e, t, r) {
  if (!e.length) return [];
  const i = [];
  i.push([e[0][0] + Lt(t, r), e[0][1] + Lt(t, r)]), i.push([e[0][0] + Lt(t, r), e[0][1] + Lt(t, r)]);
  for (let s = 1; s < e.length; s++) i.push([e[s][0] + Lt(t, r), e[s][1] + Lt(t, r)]), s === e.length - 1 && i.push([e[s][0] + Lt(t, r), e[s][1] + Lt(t, r)]);
  return Ho(i, null, r);
}
function Ho(e, t, r) {
  const i = e.length, s = [];
  if (i > 3) {
    const o = [], a = 1 - r.curveTightness;
    s.push({ op: "move", data: [e[1][0], e[1][1]] });
    for (let n = 1; n + 2 < i; n++) {
      const l = e[n];
      o[0] = [l[0], l[1]], o[1] = [l[0] + (a * e[n + 1][0] - a * e[n - 1][0]) / 6, l[1] + (a * e[n + 1][1] - a * e[n - 1][1]) / 6], o[2] = [e[n + 1][0] + (a * e[n][0] - a * e[n + 2][0]) / 6, e[n + 1][1] + (a * e[n][1] - a * e[n + 2][1]) / 6], o[3] = [e[n + 1][0], e[n + 1][1]], s.push({ op: "bcurveTo", data: [o[1][0], o[1][1], o[2][0], o[2][1], o[3][0], o[3][1]] });
    }
  } else i === 3 ? (s.push({ op: "move", data: [e[1][0], e[1][1]] }), s.push({ op: "bcurveTo", data: [e[1][0], e[1][1], e[2][0], e[2][1], e[2][0], e[2][1]] })) : i === 2 && s.push(...sl(e[0][0], e[0][1], e[1][0], e[1][1], r, !0, !0));
  return s;
}
function Ou(e, t, r, i, s, o, a, n) {
  const l = [], c = [];
  if (n.roughness === 0) {
    e /= 4, c.push([t + i * Math.cos(-e), r + s * Math.sin(-e)]);
    for (let h = 0; h <= 2 * Math.PI; h += e) {
      const u = [t + i * Math.cos(h), r + s * Math.sin(h)];
      l.push(u), c.push(u);
    }
    c.push([t + i * Math.cos(0), r + s * Math.sin(0)]), c.push([t + i * Math.cos(e), r + s * Math.sin(e)]);
  } else {
    const h = Lt(0.5, n) - Math.PI / 2;
    c.push([Lt(o, n) + t + 0.9 * i * Math.cos(h - e), Lt(o, n) + r + 0.9 * s * Math.sin(h - e)]);
    const u = 2 * Math.PI + h - 0.01;
    for (let f = h; f < u; f += e) {
      const p = [Lt(o, n) + t + i * Math.cos(f), Lt(o, n) + r + s * Math.sin(f)];
      l.push(p), c.push(p);
    }
    c.push([Lt(o, n) + t + i * Math.cos(h + 2 * Math.PI + 0.5 * a), Lt(o, n) + r + s * Math.sin(h + 2 * Math.PI + 0.5 * a)]), c.push([Lt(o, n) + t + 0.98 * i * Math.cos(h + a), Lt(o, n) + r + 0.98 * s * Math.sin(h + a)]), c.push([Lt(o, n) + t + 0.9 * i * Math.cos(h + 0.5 * a), Lt(o, n) + r + 0.9 * s * Math.sin(h + 0.5 * a)]);
  }
  return [c, l];
}
function Du(e, t, r, i, s, o, a, n, l) {
  const c = o + Lt(0.1, l), h = [];
  h.push([Lt(n, l) + t + 0.9 * i * Math.cos(c - e), Lt(n, l) + r + 0.9 * s * Math.sin(c - e)]);
  for (let u = c; u <= a; u += e) h.push([Lt(n, l) + t + i * Math.cos(u), Lt(n, l) + r + s * Math.sin(u)]);
  return h.push([t + i * Math.cos(a), r + s * Math.sin(a)]), h.push([t + i * Math.cos(a), r + s * Math.sin(a)]), Ho(h, null, l);
}
function hT(e, t, r, i, s, o, a, n) {
  const l = [], c = [n.maxRandomnessOffset || 1, (n.maxRandomnessOffset || 1) + 0.3];
  let h = [0, 0];
  const u = n.disableMultiStroke ? 1 : 2, f = n.preserveVertices;
  for (let p = 0; p < u; p++) p === 0 ? l.push({ op: "move", data: [a[0], a[1]] }) : l.push({ op: "move", data: [a[0] + (f ? 0 : Lt(c[0], n)), a[1] + (f ? 0 : Lt(c[0], n))] }), h = f ? [s, o] : [s + Lt(c[p], n), o + Lt(c[p], n)], l.push({ op: "bcurveTo", data: [e + Lt(c[p], n), t + Lt(c[p], n), r + Lt(c[p], n), i + Lt(c[p], n), h[0], h[1]] });
  return l;
}
function Vi(e) {
  return [...e];
}
function Iu(e, t = 0) {
  const r = e.length;
  if (r < 3) throw new Error("A curve must have at least three points.");
  const i = [];
  if (r === 3) i.push(Vi(e[0]), Vi(e[1]), Vi(e[2]), Vi(e[2]));
  else {
    const s = [];
    s.push(e[0], e[0]);
    for (let n = 1; n < e.length; n++) s.push(e[n]), n === e.length - 1 && s.push(e[n]);
    const o = [], a = 1 - t;
    i.push(Vi(s[0]));
    for (let n = 1; n + 2 < s.length; n++) {
      const l = s[n];
      o[0] = [l[0], l[1]], o[1] = [l[0] + (a * s[n + 1][0] - a * s[n - 1][0]) / 6, l[1] + (a * s[n + 1][1] - a * s[n - 1][1]) / 6], o[2] = [s[n + 1][0] + (a * s[n][0] - a * s[n + 2][0]) / 6, s[n + 1][1] + (a * s[n][1] - a * s[n + 2][1]) / 6], o[3] = [s[n + 1][0], s[n + 1][1]], i.push(o[1], o[2], o[3]);
    }
  }
  return i;
}
function go(e, t) {
  return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
}
function cT(e, t, r) {
  const i = go(t, r);
  if (i === 0) return go(e, t);
  let s = ((e[0] - t[0]) * (r[0] - t[0]) + (e[1] - t[1]) * (r[1] - t[1])) / i;
  return s = Math.max(0, Math.min(1, s)), go(e, Qr(t, r, s));
}
function Qr(e, t, r) {
  return [e[0] + (t[0] - e[0]) * r, e[1] + (t[1] - e[1]) * r];
}
function ol(e, t, r, i) {
  const s = i || [];
  if ((function(n, l) {
    const c = n[l + 0], h = n[l + 1], u = n[l + 2], f = n[l + 3];
    let p = 3 * h[0] - 2 * c[0] - f[0];
    p *= p;
    let m = 3 * h[1] - 2 * c[1] - f[1];
    m *= m;
    let y = 3 * u[0] - 2 * f[0] - c[0];
    y *= y;
    let x = 3 * u[1] - 2 * f[1] - c[1];
    return x *= x, p < y && (p = y), m < x && (m = x), p + m;
  })(e, t) < r) {
    const n = e[t + 0];
    s.length ? (o = s[s.length - 1], a = n, Math.sqrt(go(o, a)) > 1 && s.push(n)) : s.push(n), s.push(e[t + 3]);
  } else {
    const l = e[t + 0], c = e[t + 1], h = e[t + 2], u = e[t + 3], f = Qr(l, c, 0.5), p = Qr(c, h, 0.5), m = Qr(h, u, 0.5), y = Qr(f, p, 0.5), x = Qr(p, m, 0.5), C = Qr(y, x, 0.5);
    ol([l, f, y, C], 0, r, s), ol([C, x, m, u], 0, r, s);
  }
  var o, a;
  return s;
}
function uT(e, t) {
  return Yo(e, 0, e.length, t);
}
function Yo(e, t, r, i, s) {
  const o = s || [], a = e[t], n = e[r - 1];
  let l = 0, c = 1;
  for (let h = t + 1; h < r - 1; ++h) {
    const u = cT(e[h], a, n);
    u > l && (l = u, c = h);
  }
  return Math.sqrt(l) > i ? (Yo(e, t, c + 1, i, o), Yo(e, c, r, i, o)) : (o.length || o.push(a), o.push(n)), o;
}
function kn(e, t = 0.15, r) {
  const i = [], s = (e.length - 1) / 3;
  for (let o = 0; o < s; o++)
    ol(e, 3 * o, t, i);
  return r && r > 0 ? Yo(i, 0, i.length, r) : i;
}
const Te = "none";
class Uo {
  constructor(t) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: !1, disableMultiStrokeFill: !1, preserveVertices: !1, fillShapeRoughnessGain: 0.8 }, this.config = t || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(t) {
    return t ? Object.assign({}, this.defaultOptions, t) : this.defaultOptions;
  }
  _d(t, r, i) {
    return { shape: t, sets: r || [], options: i || this.defaultOptions };
  }
  line(t, r, i, s, o) {
    const a = this._o(o);
    return this._d("line", [Zp(t, r, i, s, a)], a);
  }
  rectangle(t, r, i, s, o) {
    const a = this._o(o), n = [], l = lT(t, r, i, s, a);
    if (a.fill) {
      const c = [[t, r], [t + i, r], [t + i, r + s], [t, r + s]];
      a.fillStyle === "solid" ? n.push(bn([c], a)) : n.push(mi([c], a));
    }
    return a.stroke !== Te && n.push(l), this._d("rectangle", n, a);
  }
  ellipse(t, r, i, s, o) {
    const a = this._o(o), n = [], l = Kp(i, s, a), c = il(t, r, a, l);
    if (a.fill) if (a.fillStyle === "solid") {
      const h = il(t, r, a, l).opset;
      h.type = "fillPath", n.push(h);
    } else n.push(mi([c.estimatedPoints], a));
    return a.stroke !== Te && n.push(c.opset), this._d("ellipse", n, a);
  }
  circle(t, r, i, s) {
    const o = this.ellipse(t, r, i, i, s);
    return o.shape = "circle", o;
  }
  linearPath(t, r) {
    const i = this._o(r);
    return this._d("linearPath", [po(t, !1, i)], i);
  }
  arc(t, r, i, s, o, a, n = !1, l) {
    const c = this._o(l), h = [], u = Mu(t, r, i, s, o, a, n, !0, c);
    if (n && c.fill) if (c.fillStyle === "solid") {
      const f = Object.assign({}, c);
      f.disableMultiStroke = !0;
      const p = Mu(t, r, i, s, o, a, !0, !1, f);
      p.type = "fillPath", h.push(p);
    } else h.push((function(f, p, m, y, x, C, b) {
      const S = f, _ = p;
      let B = Math.abs(m / 2), F = Math.abs(y / 2);
      B += Lt(0.01 * B, b), F += Lt(0.01 * F, b);
      let A = x, L = C;
      for (; A < 0; ) A += 2 * Math.PI, L += 2 * Math.PI;
      L - A > 2 * Math.PI && (A = 0, L = 2 * Math.PI);
      const H = (L - A) / b.curveStepCount, N = [];
      for (let O = A; O <= L; O += H) N.push([S + B * Math.cos(O), _ + F * Math.sin(O)]);
      return N.push([S + B * Math.cos(L), _ + F * Math.sin(L)]), N.push([S, _]), mi([N], b);
    })(t, r, i, s, o, a, c));
    return c.stroke !== Te && h.push(u), this._d("arc", h, c);
  }
  curve(t, r) {
    const i = this._o(r), s = [], o = Au(t, i);
    if (i.fill && i.fill !== Te) if (i.fillStyle === "solid") {
      const a = Au(t, Object.assign(Object.assign({}, i), { disableMultiStroke: !0, roughness: i.roughness ? i.roughness + i.fillShapeRoughnessGain : 0 }));
      s.push({ type: "fillPath", ops: this._mergedShape(a.ops) });
    } else {
      const a = [], n = t;
      if (n.length) {
        const l = typeof n[0][0] == "number" ? [n] : n;
        for (const c of l) c.length < 3 ? a.push(...c) : c.length === 3 ? a.push(...kn(Iu([c[0], c[0], c[1], c[2]]), 10, (1 + i.roughness) / 2)) : a.push(...kn(Iu(c), 10, (1 + i.roughness) / 2));
      }
      a.length && s.push(mi([a], i));
    }
    return i.stroke !== Te && s.push(o), this._d("curve", s, i);
  }
  polygon(t, r) {
    const i = this._o(r), s = [], o = po(t, !0, i);
    return i.fill && (i.fillStyle === "solid" ? s.push(bn([t], i)) : s.push(mi([t], i))), i.stroke !== Te && s.push(o), this._d("polygon", s, i);
  }
  path(t, r) {
    const i = this._o(r), s = [];
    if (!t) return this._d("path", s, i);
    t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const o = i.fill && i.fill !== "transparent" && i.fill !== Te, a = i.stroke !== Te, n = !!(i.simplification && i.simplification < 1), l = (function(h, u, f) {
      const p = Xp(Gp(Sh(h))), m = [];
      let y = [], x = [0, 0], C = [];
      const b = () => {
        C.length >= 4 && y.push(...kn(C, u)), C = [];
      }, S = () => {
        b(), y.length && (m.push(y), y = []);
      };
      for (const { key: B, data: F } of p) switch (B) {
        case "M":
          S(), x = [F[0], F[1]], y.push(x);
          break;
        case "L":
          b(), y.push([F[0], F[1]]);
          break;
        case "C":
          if (!C.length) {
            const A = y.length ? y[y.length - 1] : x;
            C.push([A[0], A[1]]);
          }
          C.push([F[0], F[1]]), C.push([F[2], F[3]]), C.push([F[4], F[5]]);
          break;
        case "Z":
          b(), y.push([x[0], x[1]]);
      }
      if (S(), !f) return m;
      const _ = [];
      for (const B of m) {
        const F = uT(B, f);
        F.length && _.push(F);
      }
      return _;
    })(t, 1, n ? 4 - 4 * (i.simplification || 1) : (1 + i.roughness) / 2), c = Eu(t, i);
    if (o) if (i.fillStyle === "solid") if (l.length === 1) {
      const h = Eu(t, Object.assign(Object.assign({}, i), { disableMultiStroke: !0, roughness: i.roughness ? i.roughness + i.fillShapeRoughnessGain : 0 }));
      s.push({ type: "fillPath", ops: this._mergedShape(h.ops) });
    } else s.push(bn(l, i));
    else s.push(mi(l, i));
    return a && (n ? l.forEach(((h) => {
      s.push(po(h, !1, i));
    })) : s.push(c)), this._d("path", s, i);
  }
  opsToPath(t, r) {
    let i = "";
    for (const s of t.ops) {
      const o = typeof r == "number" && r >= 0 ? s.data.map(((a) => +a.toFixed(r))) : s.data;
      switch (s.op) {
        case "move":
          i += `M${o[0]} ${o[1]} `;
          break;
        case "bcurveTo":
          i += `C${o[0]} ${o[1]}, ${o[2]} ${o[3]}, ${o[4]} ${o[5]} `;
          break;
        case "lineTo":
          i += `L${o[0]} ${o[1]} `;
      }
    }
    return i.trim();
  }
  toPaths(t) {
    const r = t.sets || [], i = t.options || this.defaultOptions, s = [];
    for (const o of r) {
      let a = null;
      switch (o.type) {
        case "path":
          a = { d: this.opsToPath(o), stroke: i.stroke, strokeWidth: i.strokeWidth, fill: Te };
          break;
        case "fillPath":
          a = { d: this.opsToPath(o), stroke: Te, strokeWidth: 0, fill: i.fill || Te };
          break;
        case "fillSketch":
          a = this.fillSketch(o, i);
      }
      a && s.push(a);
    }
    return s;
  }
  fillSketch(t, r) {
    let i = r.fillWeight;
    return i < 0 && (i = r.strokeWidth / 2), { d: this.opsToPath(t), stroke: r.fill || Te, strokeWidth: i, fill: Te };
  }
  _mergedShape(t) {
    return t.filter(((r, i) => i === 0 || r.op !== "move"));
  }
}
class dT {
  constructor(t, r) {
    this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.gen = new Uo(r);
  }
  draw(t) {
    const r = t.sets || [], i = t.options || this.getDefaultOptions(), s = this.ctx, o = t.options.fixedDecimalPlaceDigits;
    for (const a of r) switch (a.type) {
      case "path":
        s.save(), s.strokeStyle = i.stroke === "none" ? "transparent" : i.stroke, s.lineWidth = i.strokeWidth, i.strokeLineDash && s.setLineDash(i.strokeLineDash), i.strokeLineDashOffset && (s.lineDashOffset = i.strokeLineDashOffset), this._drawToContext(s, a, o), s.restore();
        break;
      case "fillPath": {
        s.save(), s.fillStyle = i.fill || "";
        const n = t.shape === "curve" || t.shape === "polygon" || t.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(s, a, o, n), s.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(s, a, i);
    }
  }
  fillSketch(t, r, i) {
    let s = i.fillWeight;
    s < 0 && (s = i.strokeWidth / 2), t.save(), i.fillLineDash && t.setLineDash(i.fillLineDash), i.fillLineDashOffset && (t.lineDashOffset = i.fillLineDashOffset), t.strokeStyle = i.fill || "", t.lineWidth = s, this._drawToContext(t, r, i.fixedDecimalPlaceDigits), t.restore();
  }
  _drawToContext(t, r, i, s = "nonzero") {
    t.beginPath();
    for (const o of r.ops) {
      const a = typeof i == "number" && i >= 0 ? o.data.map(((n) => +n.toFixed(i))) : o.data;
      switch (o.op) {
        case "move":
          t.moveTo(a[0], a[1]);
          break;
        case "bcurveTo":
          t.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
          break;
        case "lineTo":
          t.lineTo(a[0], a[1]);
      }
    }
    r.type === "fillPath" ? t.fill(s) : t.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(t, r, i, s, o) {
    const a = this.gen.line(t, r, i, s, o);
    return this.draw(a), a;
  }
  rectangle(t, r, i, s, o) {
    const a = this.gen.rectangle(t, r, i, s, o);
    return this.draw(a), a;
  }
  ellipse(t, r, i, s, o) {
    const a = this.gen.ellipse(t, r, i, s, o);
    return this.draw(a), a;
  }
  circle(t, r, i, s) {
    const o = this.gen.circle(t, r, i, s);
    return this.draw(o), o;
  }
  linearPath(t, r) {
    const i = this.gen.linearPath(t, r);
    return this.draw(i), i;
  }
  polygon(t, r) {
    const i = this.gen.polygon(t, r);
    return this.draw(i), i;
  }
  arc(t, r, i, s, o, a, n = !1, l) {
    const c = this.gen.arc(t, r, i, s, o, a, n, l);
    return this.draw(c), c;
  }
  curve(t, r) {
    const i = this.gen.curve(t, r);
    return this.draw(i), i;
  }
  path(t, r) {
    const i = this.gen.path(t, r);
    return this.draw(i), i;
  }
}
const Js = "http://www.w3.org/2000/svg";
class fT {
  constructor(t, r) {
    this.svg = t, this.gen = new Uo(r);
  }
  draw(t) {
    const r = t.sets || [], i = t.options || this.getDefaultOptions(), s = this.svg.ownerDocument || window.document, o = s.createElementNS(Js, "g"), a = t.options.fixedDecimalPlaceDigits;
    for (const n of r) {
      let l = null;
      switch (n.type) {
        case "path":
          l = s.createElementNS(Js, "path"), l.setAttribute("d", this.opsToPath(n, a)), l.setAttribute("stroke", i.stroke), l.setAttribute("stroke-width", i.strokeWidth + ""), l.setAttribute("fill", "none"), i.strokeLineDash && l.setAttribute("stroke-dasharray", i.strokeLineDash.join(" ").trim()), i.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${i.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = s.createElementNS(Js, "path"), l.setAttribute("d", this.opsToPath(n, a)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", i.fill || ""), t.shape !== "curve" && t.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          l = this.fillSketch(s, n, i);
      }
      l && o.appendChild(l);
    }
    return o;
  }
  fillSketch(t, r, i) {
    let s = i.fillWeight;
    s < 0 && (s = i.strokeWidth / 2);
    const o = t.createElementNS(Js, "path");
    return o.setAttribute("d", this.opsToPath(r, i.fixedDecimalPlaceDigits)), o.setAttribute("stroke", i.fill || ""), o.setAttribute("stroke-width", s + ""), o.setAttribute("fill", "none"), i.fillLineDash && o.setAttribute("stroke-dasharray", i.fillLineDash.join(" ").trim()), i.fillLineDashOffset && o.setAttribute("stroke-dashoffset", `${i.fillLineDashOffset}`), o;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(t, r) {
    return this.gen.opsToPath(t, r);
  }
  line(t, r, i, s, o) {
    const a = this.gen.line(t, r, i, s, o);
    return this.draw(a);
  }
  rectangle(t, r, i, s, o) {
    const a = this.gen.rectangle(t, r, i, s, o);
    return this.draw(a);
  }
  ellipse(t, r, i, s, o) {
    const a = this.gen.ellipse(t, r, i, s, o);
    return this.draw(a);
  }
  circle(t, r, i, s) {
    const o = this.gen.circle(t, r, i, s);
    return this.draw(o);
  }
  linearPath(t, r) {
    const i = this.gen.linearPath(t, r);
    return this.draw(i);
  }
  polygon(t, r) {
    const i = this.gen.polygon(t, r);
    return this.draw(i);
  }
  arc(t, r, i, s, o, a, n = !1, l) {
    const c = this.gen.arc(t, r, i, s, o, a, n, l);
    return this.draw(c);
  }
  curve(t, r) {
    const i = this.gen.curve(t, r);
    return this.draw(i);
  }
  path(t, r) {
    const i = this.gen.path(t, r);
    return this.draw(i);
  }
}
var ct = { canvas: (e, t) => new dT(e, t), svg: (e, t) => new fT(e, t), generator: (e) => new Uo(e), newSeed: () => Uo.newSeed() }, pT = 1, gT = 3;
async function Th(e) {
  const t = e.getElementsByTagName("img");
  if (!t || t.length === 0)
    return;
  const r = !_h(e);
  await Promise.all(
    [...t].map(
      (i) => new Promise((s) => {
        function o() {
          if (i.style.display = "flex", i.style.flexDirection = "column", r) {
            const a = Ot().fontSize ? Ot().fontSize : window.getComputedStyle(document.body).fontSize, n = 5, [l = Dl.fontSize] = aa(a), c = l * n + "px";
            i.style.minWidth = c, i.style.maxWidth = c;
          } else
            i.style.width = "100%";
          s(i);
        }
        d(o, "setupImage"), setTimeout(() => {
          i.complete && o();
        }), i.addEventListener("error", o), i.addEventListener("load", o);
      })
    )
  );
}
d(Th, "configureLabelImages");
function _h(e) {
  return e.nodeType === gT ? e.textContent?.trim() !== "" : e.nodeType !== pT || e.tagName.toLowerCase() === "img" ? !1 : [...e.childNodes].some(_h);
}
d(_h, "hasTextBesidesImages");
var Pu = 3, mT = 32, yT = /* @__PURE__ */ d(async (e, t, r) => {
  const i = Ot(), s = e.insert("g").attr("class", r ?? "node default").attr("id", t.domId || t.id), o = s.insert("g").attr("class", "label").attr("style", te(t.labelStyle)), n = [
    { text: typeof t.label == "string" ? t.label : t.label?.[0] ?? "", cssClass: "c4-name" },
    { text: t.stereotype, cssClass: "c4-type" },
    ...(t.description ?? []).map((C) => ({ text: C, cssClass: "c4-descr" }))
  ].filter((C) => C.text), l = t.width ? Math.max(t.width - 2 * (t.padding ?? 0), mT) : Ot().flowchart?.wrappingWidth ?? 200, h = i.c4?.wrap ?? !0 ? l : Number.POSITIVE_INFINITY, u = await Promise.all(
    n.map(async (C) => {
      const b = o.append("g").attr("class", C.cssClass), S = await ve(
        b,
        Ee(zr(C.text ?? ""), i),
        {
          useHtmlLabels: !1,
          markdown: !1,
          isNode: !0,
          width: h,
          style: t.labelStyle
        },
        i
      );
      return $t(S).selectAll("tspan.text-outer-tspan").attr("text-anchor", "middle"), $t(S).selectAll("tspan.text-inner-tspan").attr("font-weight", null).attr("font-style", null), { el: b, box: b.node().getBBox() };
    })
  ), f = Math.max(...u.map(({ box: C }) => C.width), 0);
  let p = 0;
  for (const { el: C, box: b } of u)
    C.attr("transform", `translate(${f / 2 - b.x - b.width / 2}, ${p - b.y})`), p += b.height + Pu;
  const m = u.length > 0 ? p - Pu : 0;
  o.insert("rect", ":first-child"), o.attr("transform", `translate(${-f / 2}, ${-m / 2})`);
  const y = o.node().getBBox(), x = (t.padding ?? 0) / 2;
  return { shapeSvg: s, bbox: y, halfPadding: x, label: o };
}, "c4LabelHelper"), Ru = /* @__PURE__ */ d((e, t) => {
  const { x: r, y: i, width: s, height: o } = e;
  return s >= t ? e : "left" in e ? {
    x: r,
    y: i,
    width: t,
    height: o,
    top: i,
    left: r,
    bottom: i + o,
    right: r + t,
    toJSON: /* @__PURE__ */ d(() => ({}), "toJSON")
  } : { x: r - (t - s) / 2, y: i, width: t, height: o };
}, "withMinWidth"), yt = /* @__PURE__ */ d(async (e, t, r, { ignoreMinWidth: i = !1 } = {}) => {
  if (t.stereotype !== void 0)
    return yT(e, t, r);
  let s;
  const o = t.useHtmlLabels || ar(Ot()?.htmlLabels);
  r ? s = r : s = "node default";
  const a = e.insert("g").attr("class", s).attr("id", t.domId || t.id), n = a.insert("g").attr("class", "label").attr("style", te(t.labelStyle));
  let l;
  t.label === void 0 ? l = "" : l = typeof t.label == "string" ? t.label : t.label[0];
  const c = !!t.icon || !!t.img, h = t.labelType === "markdown", u = l && !t.width && !i ? t.minWidth ?? 0 : 0, f = await ve(
    n,
    Ee(zr(l), Ot()),
    {
      useHtmlLabels: o,
      width: t.width || t.wrappingWidth || Ot().flowchart?.wrappingWidth,
      minWidth: u,
      classes: h ? "markdown-node-label" : "",
      style: t.labelStyle,
      addSvgBackground: c,
      markdown: h
    },
    Ot()
  ), p = (t?.padding ?? 0) / 2;
  let m;
  if (o) {
    const y = f.children[0], x = $t(f);
    await Th(y), m = await ai.measure(
      () => y.getBoundingClientRect()
    ), m = Ru(m, u), x.attr("width", m.width), x.attr("height", m.height);
  } else
    m = await ai.measure(
      () => f.getBBox()
    ), m = Ru(m, u);
  return o ? n.attr("transform", "translate(" + -m.width / 2 + ", " + -m.height / 2 + ")") : n.attr("transform", "translate(0, " + -m.height / 2 + ")"), t.centerLabel && n.attr("transform", "translate(" + -m.width / 2 + ", " + -m.height / 2 + ")"), n.insert("rect", ":first-child"), { shapeSvg: a, bbox: m, halfPadding: p, label: n };
}, "labelHelper"), ri = /* @__PURE__ */ d(async (e, t, r) => {
  const i = r.useHtmlLabels ?? le(Ot()), s = e.insert("g").attr("class", "label").attr("style", r.labelStyle || ""), o = await ve(s, Ee(zr(t), Ot()), {
    useHtmlLabels: i,
    width: r.width || Ot()?.flowchart?.wrappingWidth,
    style: r.labelStyle,
    addSvgBackground: !!r.icon || !!r.img
  }), a = r.padding / 2;
  let n;
  if (le(Ot())) {
    const l = o.children[0], c = $t(o);
    n = await ai.measure(
      () => l.getBoundingClientRect()
    ), c.attr("width", n.width), c.attr("height", n.height);
  } else
    n = await ai.measure(
      () => o.getBBox()
    );
  return i ? s.attr("transform", "translate(" + -n.width / 2 + ", " + -n.height / 2 + ")") : s.attr("transform", "translate(0, " + -n.height / 2 + ")"), r.centerLabel && s.attr("transform", "translate(" + -n.width / 2 + ", " + -n.height / 2 + ")"), s.insert("rect", ":first-child"), { shapeSvg: e, bbox: n, halfPadding: a, label: s };
}, "insertLabel"), ft = /* @__PURE__ */ d((e, t, r) => {
  if (r) {
    e.width = r.width, e.height = r.height;
    return;
  }
  const i = t.node().getBBox();
  e.width = i.width, e.height = i.height;
}, "updateNodeBounds"), gt = /* @__PURE__ */ d((e, t) => (e.look === "handDrawn" ? "rough-node" : "node") + " " + e.cssClasses + " " + (t || ""), "getNodeClasses");
function Rt(e) {
  const t = e.map((r, i) => `${i === 0 ? "M" : "L"}${r.x},${r.y}`);
  return t.push("Z"), t.join(" ");
}
d(Rt, "createPathFromPoints");
function Yr(e, t, r, i, s, o) {
  const a = [], l = r - e, c = i - t, h = l / o, u = 2 * Math.PI / h, f = t + c / 2;
  for (let p = 0; p <= 50; p++) {
    const m = p / 50, y = e + m * l, x = f + s * Math.sin(u * (y - e));
    a.push({ x: y, y: x });
  }
  return a;
}
d(Yr, "generateFullSineWavePoints");
function rr(e, t, r, i, s, o) {
  const a = [], n = s * Math.PI / 180, h = (o * Math.PI / 180 - n) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = n + u * h, p = e + r * Math.cos(f), m = t + r * Math.sin(f);
    a.push({ x: -p, y: -m });
  }
  return a;
}
d(rr, "generateCirclePoints");
function al(e) {
  const t = Array.from(e.childNodes).filter(
    (l) => l.tagName === "path"
  ), r = document.createElementNS("http://www.w3.org/2000/svg", "path"), i = t.map((l) => l.getAttribute("d")).filter((l) => l !== null).join(" ");
  r.setAttribute("d", i);
  const s = t.find((l) => l.getAttribute("fill") !== "none"), o = t.find((l) => l.getAttribute("stroke") !== "none"), a = /* @__PURE__ */ d((l, c) => l?.getAttribute(c) ?? void 0, "getAttr");
  if (s) {
    const l = {
      fill: a(s, "fill"),
      "fill-opacity": a(s, "fill-opacity") ?? "1"
    };
    Object.entries(l).forEach(([c, h]) => {
      h && r.setAttribute(c, h);
    });
  }
  if (o) {
    const l = {
      stroke: a(o, "stroke"),
      "stroke-width": a(o, "stroke-width") ?? "1",
      "stroke-opacity": a(o, "stroke-opacity") ?? "1"
    };
    Object.entries(l).forEach(([c, h]) => {
      h && r.setAttribute(c, h);
    });
  }
  const n = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return n.appendChild(r), n;
}
d(al, "mergePaths");
var xT = /* @__PURE__ */ d((e, t) => {
  var r = e.x, i = e.y, s = t.x - r, o = t.y - i, a = e.width / 2, n = e.height / 2, l, c;
  return Math.abs(o) * a > Math.abs(s) * n ? (o < 0 && (n = -n), l = o === 0 ? 0 : n * s / o, c = n) : (s < 0 && (a = -a), l = a, c = s === 0 ? 0 : a * o / s), { x: r + l, y: i + c };
}, "intersectRect"), Br = xT;
function Jp(e, t) {
  return e.intersect(t);
}
d(Jp, "intersectNode");
var CT = Jp;
function tg(e, t, r, i) {
  var s = e.x, o = e.y, a = s - i.x, n = o - i.y, l = Math.sqrt(t * t * n * n + r * r * a * a), c = Math.abs(t * r * a / l);
  i.x < s && (c = -c);
  var h = Math.abs(t * r * n / l);
  return i.y < o && (h = -h), { x: s + c, y: o + h };
}
d(tg, "intersectEllipse");
var eg = tg;
function rg(e, t, r) {
  return eg(e, t, t, r);
}
d(rg, "intersectCircle");
var bT = rg;
function ig(e, t, r, i) {
  {
    const s = t.y - e.y, o = e.x - t.x, a = t.x * e.y - e.x * t.y, n = s * r.x + o * r.y + a, l = s * i.x + o * i.y + a, c = 1e-6;
    if (n !== 0 && l !== 0 && nl(n, l))
      return;
    const h = i.y - r.y, u = r.x - i.x, f = i.x * r.y - r.x * i.y, p = h * e.x + u * e.y + f, m = h * t.x + u * t.y + f;
    if (Math.abs(p) < c && Math.abs(m) < c && nl(p, m))
      return;
    const y = s * u - h * o;
    if (y === 0)
      return;
    const x = (o * f - u * a) / y, C = (h * a - s * f) / y;
    return { x, y: C };
  }
}
d(ig, "intersectLine");
function nl(e, t) {
  return e * t > 0;
}
d(nl, "sameSign");
var kT = ig;
function sg(e, t, r) {
  let i = e.x, s = e.y, o = [], a = Number.POSITIVE_INFINITY, n = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(h) {
    a = Math.min(a, h.x), n = Math.min(n, h.y);
  }) : (a = Math.min(a, t.x), n = Math.min(n, t.y));
  let l = i - e.width / 2 - a, c = s - e.height / 2 - n;
  for (let h = 0; h < t.length; h++) {
    let u = t[h], f = t[h < t.length - 1 ? h + 1 : 0], p = kT(
      e,
      r,
      { x: l + u.x, y: c + u.y },
      { x: l + f.x, y: c + f.y }
    );
    p && o.push(p);
  }
  return o.length ? (o.length > 1 && o.sort(function(h, u) {
    let f = h.x - r.x, p = h.y - r.y, m = Math.sqrt(f * f + p * p), y = u.x - r.x, x = u.y - r.y, C = Math.sqrt(y * y + x * x);
    return m < C ? -1 : m === C ? 0 : 1;
  }), o[0]) : e;
}
d(sg, "intersectPolygon");
var wT = sg, nt = {
  node: CT,
  circle: bT,
  ellipse: eg,
  polygon: wT,
  rect: Br
}, Le = /* @__PURE__ */ d((e, t, r, i, s) => [
  "M",
  e + s,
  t,
  // Move to the first point
  "H",
  e + r - s,
  // Draw horizontal line to the beginning of the right corner
  "A",
  s,
  s,
  0,
  0,
  1,
  e + r,
  t + s,
  // Draw arc to the right top corner
  "V",
  t + i - s,
  // Draw vertical line down to the beginning of the right bottom corner
  "A",
  s,
  s,
  0,
  0,
  1,
  e + r - s,
  t + i,
  // Draw arc to the right bottom corner
  "H",
  e + s,
  // Draw horizontal line to the beginning of the left bottom corner
  "A",
  s,
  s,
  0,
  0,
  1,
  e,
  t + i - s,
  // Draw arc to the left bottom corner
  "V",
  t + s,
  // Draw vertical line up to the beginning of the left top corner
  "A",
  s,
  s,
  0,
  0,
  1,
  e + s,
  t,
  // Draw arc to the left top corner
  "Z"
  // Close the path
].join(" "), "createRoundedRectPathD"), ST = /* @__PURE__ */ d(async (e, t, r, i = !1, s = !1) => {
  let o = t || "";
  typeof o == "object" && (o = o[0]);
  const a = Ot(), n = le(a);
  return await ve(
    e,
    o,
    {
      style: r,
      isTitle: i,
      useHtmlLabels: n,
      markdown: !1,
      isNode: s,
      width: Number.POSITIVE_INFINITY
    },
    a
  );
}, "createLabel"), xr = ST;
function og(e, t) {
  const { labelStyles: r } = ht(t);
  t.labelStyle = r;
  const i = gt(t);
  let s = i;
  i || (s = "anchor");
  const o = e.insert("g").attr("class", s).attr("id", t.domId || t.id), a = 1, { cssStyles: n } = t, l = ct.svg(o), c = lt(t, { fill: "black", stroke: "none", fillStyle: "solid" });
  t.look !== "handDrawn" && (c.roughness = 0);
  const h = l.circle(0, 0, a * 2, c), u = o.insert(() => h, ":first-child");
  return u.attr("class", "anchor").attr("style", te(n)), ft(t, u), t.intersect = function(f) {
    return J.info("Circle intersect", t, a, f), nt.circle(t, a, f);
  }, o;
}
d(og, "anchor");
function ll(e, t, r, i, s, o, a) {
  const l = (e + r) / 2, c = (t + i) / 2, h = Math.atan2(i - t, r - e), u = (r - e) / 2, f = (i - t) / 2, p = u / s, m = f / o, y = Math.sqrt(p ** 2 + m ** 2);
  if (y > 1)
    throw new Error("The given radii are too small to create an arc between the points.");
  const x = Math.sqrt(1 - y ** 2), C = l + x * o * Math.sin(h) * (a ? -1 : 1), b = c - x * s * Math.cos(h) * (a ? -1 : 1), S = Math.atan2((t - b) / o, (e - C) / s);
  let B = Math.atan2((i - b) / o, (r - C) / s) - S;
  a && B < 0 && (B += 2 * Math.PI), !a && B > 0 && (B -= 2 * Math.PI);
  const F = [];
  for (let A = 0; A < 20; A++) {
    const L = A / 19, H = S + L * B, N = C + s * Math.cos(H), O = b + o * Math.sin(H);
    F.push({ x: N, y: O });
  }
  return F;
}
d(ll, "generateArcPoints");
function ag(e, t, r) {
  const [i, s] = [t, r].sort((o, a) => a - o);
  return s * (1 - Math.sqrt(1 - (e / i / 2) ** 2));
}
d(ag, "calculateArcSagitta");
async function ng(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s, n = /* @__PURE__ */ d((H) => H + a, "calcTotalHeight"), l = /* @__PURE__ */ d((H) => {
    const N = H / 2;
    return [N / (2.5 + H / 50), N];
  }, "calcEllipseRadius"), { shapeSvg: c, bbox: h } = await yt(e, t, gt(t)), u = n(t?.height ? t?.height : h.height), [f, p] = l(u), m = ag(u, f, p), x = (t?.width ? t?.width : h.width) + o * 2 + m - m, C = u, { cssStyles: b } = t, S = [
    { x: x / 2, y: -C / 2 },
    { x: -x / 2, y: -C / 2 },
    ...ll(-x / 2, -C / 2, -x / 2, C / 2, f, p, !1),
    { x: x / 2, y: C / 2 },
    ...ll(x / 2, C / 2, x / 2, -C / 2, f, p, !0)
  ], _ = ct.svg(c), B = lt(t, {});
  t.look !== "handDrawn" && (B.roughness = 0, B.fillStyle = "solid");
  const F = Rt(S), A = _.path(F, B), L = c.insert(() => A, ":first-child");
  return L.attr("class", "basic label-container outer-path"), b && t.look !== "handDrawn" && L.selectAll("path").attr("style", b), i && t.look !== "handDrawn" && L.selectAll("path").attr("style", i), L.attr("transform", `translate(${f / 2}, 0)`), ft(t, L), t.intersect = function(H) {
    return nt.polygon(t, S, H);
  }, c;
}
d(ng, "bowTieRect");
async function lg(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a, label: n } = await yt(e, t, gt(t)), l = r?.nodeBorder ?? r?.lineColor ?? "currentColor", c = t.padding ?? 12, h = Math.max(a.width + c * 2, t.width ?? 0, 80), u = Math.max(Math.min(h * 0.08, 12), 5), f = Math.max(a.height + c * 2 + u, t.height ?? 0), p = -f / 2 + u, m = f / 2, y = h * 0.72, x = [
    `M${-h / 2},${p}`,
    `L${-y / 2},${m}`,
    `A${y / 2},${u} 0 0 0 ${y / 2},${m}`,
    `L${h / 2},${p}`,
    `A${h / 2},${u} 0 0 0 ${-h / 2},${p}`,
    "Z"
  ].join(" "), { cssStyles: C } = t, b = o.insert("g", ":first-child").attr("class", "basic label-container");
  if (t.look === "handDrawn") {
    const L = ct.svg(o).path(x, lt(t, {}));
    b.node()?.appendChild(L), C && b.attr("style", C);
  } else
    b.append("path").attr("d", x).attr("style", s);
  b.append("ellipse").attr("cx", 0).attr("cy", p).attr("rx", h / 2).attr("ry", u).attr("style", `fill:none;stroke:${l};stroke-width:1px`), ft(t, b);
  const S = p + (m - p) / 2;
  n.attr(
    "transform",
    `translate(${-(a.width / 2) - (a.x - (a.left ?? 0))}, ${S - a.height / 2 - (a.y - (a.top ?? 0))})`
  );
  const _ = 12, B = /* @__PURE__ */ d((A, L, H) => Array.from({ length: _ + 1 }, (N, O) => {
    const Q = Math.PI - O * Math.PI / _;
    return { x: A * Math.cos(Q), y: L + H * u * Math.sin(Q) };
  }), "arc"), F = [...B(h / 2, p, -1), ...B(y / 2, m, 1).reverse()];
  return t.intersect = function(A) {
    return nt.polygon(t, F, A);
  }, o;
}
d(lg, "bucket");
var Nu = 20, qu = 8, TT = 80, _T = 8;
function hg(e) {
  const { themeVariables: t } = Ot(), r = t.clusterBkg, i = t.clusterBorder;
  return e === "flow" ? {
    rx: 10,
    fill: "none",
    stroke: t.flowContainerStroke || t.secondaryBorderColor,
    strokeWidth: 0.75,
    cssClass: "flow-collapsed"
  } : {
    rx: _T,
    fill: r,
    stroke: i,
    cssClass: "collapsed-group"
  };
}
d(hg, "getCollapsedStyle");
async function cg(e, t) {
  const r = hg(t.metadata?.containerType), { fill: i, stroke: s } = r, { nodeStyles: o } = ht(t), { shapeSvg: a, bbox: n } = await yt(e, t, gt(t)), { theme: l, themeVariables: c } = Ot();
  Oe(a, t.colorIndex, l, c.borderColorArray);
  const h = t.padding ?? 8, u = n.height, f = Math.max(n.width + h * 2, TT, t?.width ?? 0), p = Math.max(
    u + qu + Nu + h * 2,
    t?.height ?? 0
  ), m = -f / 2, y = -p / 2, x = -28 / 2, C = a.select(".label");
  C && (t.useHtmlLabels ?? le(Ot()) ? C.attr("transform", `translate(${-n.width / 2}, ${-n.height / 2 + x})`) : C.attr("transform", `translate(0, ${-n.height / 2 + x})`));
  let b;
  if (t.look === "handDrawn") {
    const A = ct.svg(a), L = lt(t, {
      fill: i,
      stroke: s,
      ...r.strokeWidth === void 0 ? {} : { strokeWidth: r.strokeWidth },
      ...i === "none" ? { fillWeight: 0 } : { fillStyle: "solid" }
    }), H = A.path(
      Le(m, y, f, p, r.rx),
      L
    );
    b = a.insert(() => H, ":first-child"), b.attr("class", "basic label-container " + r.cssClass).attr("style", te(t.cssStyles));
  } else
    b = a.insert("rect", ":first-child"), b.attr("class", "basic label-container " + r.cssClass).attr("style", o).attr("rx", r.rx).attr("ry", r.rx).attr("x", m).attr("y", y).attr("width", f).attr("height", p).attr("fill", i).attr("stroke", s), r.strokeWidth !== void 0 && b.attr("stroke-width", r.strokeWidth + "px");
  const S = y + h + u + qu;
  a.append("line").attr("class", "collapsed-separator").attr("x1", m + 8).attr("y1", S).attr("x2", m + f - 8).attr("y2", S).attr("stroke", s).attr("stroke-dasharray", "3, 3");
  const _ = S + Nu / 2, B = 2.5, F = 10;
  for (let A = -1; A <= 1; A++)
    a.append("circle").attr("class", "collapsed-indicator").attr("cx", A * F).attr("cy", _).attr("r", B).attr("fill", s);
  return ft(t, b), t.calcIntersect = function(A, L) {
    return nt.rect(A, L);
  }, t.intersect = function(A) {
    return nt.rect(t, A);
  }, a;
}
d(cg, "collapsedGroup");
function lr(e, t, r, i) {
  return e.insert("polygon", ":first-child").attr(
    "points",
    i.map(function(s) {
      return s.x + "," + s.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + r / 2 + ")");
}
d(lr, "insertPolygonShape");
var BT = ["right", "left", "up", "down"], Bh = "point", vT = /* @__PURE__ */ d((e) => {
  const t = /* @__PURE__ */ new Set();
  for (const r of e)
    switch (r) {
      case "x":
        t.add("right"), t.add("left");
        break;
      case "y":
        t.add("up"), t.add("down");
        break;
      default:
        t.add(r);
        break;
    }
  return t;
}, "expandAndDeduplicateDirections"), LT = /* @__PURE__ */ d((e) => BT.filter((t) => e.has(t)).join("|") || Bh, "getDirectionKey"), Wu = {
  "right|left|up|down": /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: 0, y: 0 },
    { x: t, y: 0 },
    { x: i / 2, y: 2 * r },
    { x: i - t, y: 0 },
    { x: i, y: 0 },
    { x: i, y: -e / 3 },
    { x: i + 2 * r, y: -e / 2 },
    { x: i, y: -2 * e / 3 },
    { x: i, y: -e },
    { x: i - t, y: -e },
    { x: i / 2, y: -e - 2 * r },
    { x: t, y: -e },
    { x: 0, y: -e },
    { x: 0, y: -2 * e / 3 },
    { x: -2 * r, y: -e / 2 },
    { x: 0, y: -e / 3 }
  ], "right|left|up|down"),
  "right|left|up": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: t, y: 0 },
    { x: r - t, y: 0 },
    { x: r, y: -e / 2 },
    { x: r - t, y: -e },
    { x: t, y: -e },
    { x: 0, y: -e / 2 }
  ], "right|left|up"),
  "right|left|down": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: 0, y: 0 },
    { x: t, y: -e },
    { x: r - t, y: -e },
    { x: r, y: 0 }
  ], "right|left|down"),
  "right|up|down": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: 0, y: 0 },
    { x: r, y: -t },
    { x: r, y: -e + t },
    { x: 0, y: -e }
  ], "right|up|down"),
  "left|up|down": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: r, y: 0 },
    { x: 0, y: -t },
    { x: 0, y: -e + t },
    { x: r, y: -e }
  ], "left|up|down"),
  "right|left": /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: t, y: 0 },
    { x: t, y: -r },
    { x: i - t, y: -r },
    { x: i - t, y: 0 },
    { x: i, y: -e / 2 },
    { x: i - t, y: -e },
    { x: i - t, y: -e + r },
    { x: t, y: -e + r },
    { x: t, y: -e },
    { x: 0, y: -e / 2 }
  ], "right|left"),
  "up|down": /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: i / 2, y: 0 },
    { x: 0, y: -r },
    { x: t, y: -r },
    { x: t, y: -e + r },
    { x: 0, y: -e + r },
    { x: i / 2, y: -e },
    { x: i, y: -e + r },
    { x: i - t, y: -e + r },
    { x: i - t, y: -r },
    { x: i, y: -r }
  ], "up|down"),
  "right|up": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: 0, y: 0 },
    { x: r, y: -t },
    { x: 0, y: -e }
  ], "right|up"),
  "right|down": /* @__PURE__ */ d(({ height: e, width: t }) => [
    { x: 0, y: 0 },
    { x: t, y: 0 },
    { x: 0, y: -e }
  ], "right|down"),
  "left|up": /* @__PURE__ */ d(({ height: e, midpoint: t, width: r }) => [
    { x: r, y: 0 },
    { x: 0, y: -t },
    { x: r, y: -e }
  ], "left|up"),
  "left|down": /* @__PURE__ */ d(({ height: e, width: t }) => [
    { x: t, y: 0 },
    { x: 0, y: 0 },
    { x: t, y: -e }
  ], "left|down"),
  right: /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: t, y: -r },
    { x: t, y: -r },
    { x: i - t, y: -r },
    { x: i - t, y: 0 },
    { x: i, y: -e / 2 },
    { x: i - t, y: -e },
    { x: i - t, y: -e + r },
    { x: t, y: -e + r },
    { x: t, y: -e + r }
  ], "right"),
  left: /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: t, y: 0 },
    { x: t, y: -r },
    { x: i - t, y: -r },
    { x: i - t, y: -e + r },
    { x: t, y: -e + r },
    { x: t, y: -e },
    { x: 0, y: -e / 2 }
  ], "left"),
  up: /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: t, y: -r },
    { x: t, y: -e + r },
    { x: 0, y: -e + r },
    { x: i / 2, y: -e },
    { x: i, y: -e + r },
    { x: i - t, y: -e + r },
    { x: i - t, y: -r }
  ], "up"),
  down: /* @__PURE__ */ d(({ height: e, midpoint: t, padding: r, width: i }) => [
    { x: i / 2, y: 0 },
    { x: 0, y: -r },
    { x: t, y: -r },
    { x: t, y: -e + r },
    { x: i - t, y: -e + r },
    { x: i - t, y: -r },
    { x: i, y: -r }
  ], "down"),
  [Bh]: () => [{ x: 0, y: 0 }]
}, FT = /* @__PURE__ */ d((e, t, r, i) => {
  const s = vT(e), o = (r.padding ?? 0) / 2, a = t.height + 4 * o, n = a / 2, l = i ?? t.width + 2 * n + 2 * o, c = LT(s);
  return (Wu[c] ?? Wu[Bh])({ height: a, midpoint: n, padding: o, width: l });
}, "getArrowPoints");
async function ug(e, t) {
  const r = t, { shapeSvg: i, bbox: s } = await yt(e, r, gt(r)), o = r.padding ?? 0, a = s.height + 2 * o, n = a / 2, l = s.width + 2 * n + o, c = r.width ?? 0, u = r.positioned && (r.widthInColumns ?? 1) > 1 && c > l ? c : l, f = FT(r.directions ?? [], s, r, u), p = lr(i, u, a, f);
  return p.attr("style", r.style ?? null), ft(r, p), r.intersect = function(m) {
    return nt.polygon(r, f, m);
  }, i;
}
d(ug, "block_arrow");
async function dg(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a, label: n } = await yt(e, t, gt(t)), l = r?.nodeBorder ?? r?.lineColor ?? "currentColor", c = t.padding ?? 12, h = 18, u = 12, f = Math.max(a.width + c * 2, t.width ?? 0, 90), p = Math.max(a.height + c * 2 + h, t.height ?? 0), m = -p / 2, { cssStyles: y } = t, x = o.insert("g", ":first-child").attr("class", "basic label-container");
  if (t.look === "handDrawn") {
    const S = ct.svg(o).path(
      Le(-f / 2, m, f, p, u),
      lt(t, {})
    );
    x.node()?.appendChild(S), y && x.attr("style", y);
  } else
    x.append("rect").attr("x", -f / 2).attr("y", m).attr("width", f).attr("height", p).attr("rx", u).attr("ry", u).attr("style", s);
  x.append("line").attr("x1", -f / 2).attr("y1", m + h).attr("x2", f / 2).attr("y2", m + h).attr("style", `stroke:${l};stroke-width:1px`);
  for (let b = 0; b < 3; b++)
    x.append("circle").attr("cx", -f / 2 + 12 + b * 9).attr("cy", m + h / 2).attr("r", 2.5).attr("style", `fill:${l};stroke:none`);
  x.append("rect").attr("class", "browser-address-bar").attr("x", -f / 2 + 44).attr("y", m + 4).attr("width", Math.max(f - 56, 10)).attr("height", h - 8).attr("rx", 3).attr("ry", 3).attr("style", `fill:none;stroke:${l};stroke-width:1px;opacity:0.6`), ft(t, x);
  const C = m + h + (p - h) / 2;
  return n.attr(
    "transform",
    `translate(${-(a.width / 2) - (a.x - (a.left ?? 0))}, ${C - a.height / 2 - (a.y - (a.top ?? 0))})`
  ), t.intersect = function(b) {
    return nt.rect(t, b);
  }, o;
}
d(dg, "browser");
var to = 12;
async function fg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 28 : s, a = t.look === "neo" ? 24 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = (t?.width ?? l.width) + (t.look === "neo" ? o * 2 : o + to), h = (t?.height ?? l.height) + (t.look === "neo" ? a * 2 : a), u = 0, f = c, p = -h, m = 0, y = [
    { x: u + to, y: p },
    { x: f, y: p },
    { x: f, y: m },
    { x: u, y: m },
    { x: u, y: p + to },
    { x: u + to, y: p }
  ];
  let x;
  const { cssStyles: C } = t;
  if (t.look === "handDrawn") {
    const b = ct.svg(n), S = lt(t, {}), _ = Rt(y), B = b.path(_, S);
    x = n.insert(() => B, ":first-child").attr("transform", `translate(${-c / 2}, ${h / 2})`), C && x.attr("style", C);
  } else
    x = lr(n, c, h, y);
  return i && x.attr("style", i), ft(t, x), t.intersect = function(b) {
    return nt.polygon(t, y, b);
  }, n;
}
d(fg, "card");
function pg(e, t) {
  const { nodeStyles: r } = ht(t);
  t.label = "";
  const i = e.insert("g").attr("class", gt(t)).attr("id", t.domId ?? t.id), { cssStyles: s } = t, o = Math.max(28, t.width ?? 0), a = [
    { x: 0, y: o / 2 },
    { x: o / 2, y: 0 },
    { x: 0, y: -o / 2 },
    { x: -o / 2, y: 0 }
  ], n = ct.svg(i), l = lt(t, {});
  t.look !== "handDrawn" && (l.roughness = 0, l.fillStyle = "solid");
  const c = Rt(a), h = n.path(c, l), u = i.insert(() => h, ":first-child");
  return s && t.look !== "handDrawn" && u.selectAll("path").attr("style", s), r && t.look !== "handDrawn" && u.selectAll("path").attr("style", r), t.width = 28, t.height = 28, t.intersect = function(f) {
    return nt.polygon(t, a, f);
  }, i;
}
d(pg, "choice");
async function vh(e, t, r) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a, halfPadding: n } = await yt(e, t, gt(t), {
    ignoreMinWidth: !0
  }), l = 16, c = r?.padding ?? n, h = Math.sqrt(a.width ** 2 + a.height ** 2) / 2, u = t.look === "neo" ? h + l : h + c;
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(o), y = lt(t, {}), x = m.circle(0, 0, u * 2, y);
    f = o.insert(() => x, ":first-child"), f.attr("class", "basic label-container").attr("style", te(p));
  } else
    f = o.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", s).attr("r", u).attr("cx", 0).attr("cy", 0);
  return ft(t, f), t.calcIntersect = function(m, y) {
    const x = m.width / 2;
    return nt.circle(m, x, y);
  }, t.intersect = function(m) {
    return J.info("Circle intersect", t, u, m), nt.circle(t, u, m);
  }, o;
}
d(vh, "circle");
async function gg(e, t) {
  const r = t, i = ["node", r.cssClasses, r.class].filter(Boolean).join(" "), { shapeSvg: s, bbox: o, halfPadding: a } = await yt(e, r, i), n = s.insert("rect", ":first-child"), l = r.padding ?? 0, c = r.positioned ? r.width ?? 0 : o.width + l, h = r.positioned ? r.height ?? 0 : o.height + l, u = r.positioned ? -c / 2 : -o.width / 2 - a, f = r.positioned ? -h / 2 : -o.height / 2 - a;
  return n.attr("class", "basic cluster composite label-container").attr("style", r.style ?? null).attr("rx", r.rx ?? null).attr("ry", r.ry ?? null).attr("x", u).attr("y", f).attr("width", c).attr("height", h), ft(r, n), r.intersect = function(p) {
    return nt.rect(r, p);
  }, s;
}
d(gg, "composite");
async function mg(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a, label: n } = await yt(e, t, gt(t)), l = r?.nodeBorder ?? r?.lineColor ?? "currentColor", c = t.padding ?? 12, h = 20, u = 12, f = Math.max(a.width + c * 2, t.width ?? 0, 90), p = Math.max(a.height + c * 2 + h, t.height ?? 0), m = -p / 2, { cssStyles: y } = t, x = o.insert("g", ":first-child").attr("class", "basic label-container");
  if (t.look === "handDrawn") {
    const S = ct.svg(o).path(
      Le(-f / 2, m, f, p, u),
      lt(t, {})
    );
    x.node()?.appendChild(S), y && x.attr("style", y);
  } else
    x.append("rect").attr("x", -f / 2).attr("y", m).attr("width", f).attr("height", p).attr("rx", u).attr("ry", u).attr("style", s);
  x.append("text").attr("x", -f / 2 + 12).attr("y", m + 16).attr("class", "console-glyph").attr("style", `font-family:monospace;font-weight:bold;font-size:14px;fill:${l}`).text(">_"), ft(t, x);
  const C = m + h + (p - h) / 2;
  return n.attr(
    "transform",
    `translate(${-(a.width / 2) - (a.x - (a.left ?? 0))}, ${C - a.height / 2 - (a.y - (a.top ?? 0))})`
  ), t.intersect = function(b) {
    return nt.rect(t, b);
  }, o;
}
d(mg, "consoleWindow");
function yg(e) {
  const t = Math.cos(Math.PI / 4), r = Math.sin(Math.PI / 4), i = e * 2, s = { x: i / 2 * t, y: i / 2 * r }, o = { x: -(i / 2) * t, y: i / 2 * r }, a = { x: -(i / 2) * t, y: -(i / 2) * r }, n = { x: i / 2 * t, y: -(i / 2) * r };
  return `M ${o.x},${o.y} L ${n.x},${n.y}
                   M ${s.x},${s.y} L ${a.x},${a.y}`;
}
d(yg, "createLine");
function xg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r, t.label = "";
  const s = e.insert("g").attr("class", gt(t)).attr("id", t.domId ?? t.id), o = Math.max(30, t?.width ?? 0), { cssStyles: a } = t, n = ct.svg(s), l = lt(t, {});
  t.look !== "handDrawn" && (l.roughness = 0, l.fillStyle = "solid");
  const c = n.circle(0, 0, o * 2, l), h = yg(o), u = n.path(h, l), f = s.insert(() => c, ":first-child");
  return f.insert(() => u), f.attr("class", "outer-path"), a && t.look !== "handDrawn" && f.selectAll("path").attr("style", a), i && t.look !== "handDrawn" && f.selectAll("path").attr("style", i), ft(t, f), t.intersect = function(p) {
    return J.info("crossedCircle intersect", t, { radius: o, point: p }), nt.circle(t, o, p);
  }, s;
}
d(xg, "crossedCircle");
function mr(e, t, r, i = 100, s = 0, o = 180) {
  const a = [], n = s * Math.PI / 180, h = (o * Math.PI / 180 - n) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = n + u * h, p = e + r * Math.cos(f), m = t + r * Math.sin(f);
    a.push({ x: -p, y: -m });
  }
  return a;
}
d(mr, "generateCirclePoints");
async function Cg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.look === "neo" ? 18 : t.padding ?? 0, l = t.look === "neo" ? 12 : t.padding ?? 0, c = o.width + n, h = o.height + l, u = Math.max(5, h * 0.1), { cssStyles: f } = t, p = [
    ...mr(c / 2, -h / 2, u, 30, -90, 0),
    { x: -c / 2 - u, y: u },
    ...mr(c / 2 + u * 2, -u, u, 20, -180, -270),
    ...mr(c / 2 + u * 2, u, u, 20, -90, -180),
    { x: -c / 2 - u, y: -h / 2 },
    ...mr(c / 2, h / 2, u, 20, 0, 90)
  ], m = [
    { x: c / 2, y: -h / 2 - u },
    { x: -c / 2, y: -h / 2 - u },
    ...mr(c / 2, -h / 2, u, 20, -90, 0),
    { x: -c / 2 - u, y: -u },
    ...mr(c / 2 + c * 0.1, -u, u, 20, -180, -270),
    ...mr(c / 2 + c * 0.1, u, u, 20, -90, -180),
    { x: -c / 2 - u, y: h / 2 },
    ...mr(c / 2, h / 2, u, 20, 0, 90),
    { x: -c / 2, y: h / 2 + u },
    { x: c / 2, y: h / 2 + u }
  ], y = ct.svg(s), x = lt(t, { fill: "none" });
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const b = Rt(p).replace("Z", ""), S = y.path(b, x), _ = Rt(m), B = y.path(_, { ...x }), F = s.insert("g", ":first-child");
  return F.insert(() => B, ":first-child").attr("stroke-opacity", 0), F.insert(() => S, ":first-child"), F.attr("class", "text"), f && t.look !== "handDrawn" && F.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && F.selectAll("path").attr("style", i), F.attr("transform", `translate(${u}, 0)`), a.attr(
    "transform",
    `translate(${-c / 2 + u - (o.x - (o.left ?? 0))},${-h / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`
  ), ft(t, F), t.intersect = function(A) {
    return nt.polygon(t, m, A);
  }, s;
}
d(Cg, "curlyBraceLeft");
function yr(e, t, r, i = 100, s = 0, o = 180) {
  const a = [], n = s * Math.PI / 180, h = (o * Math.PI / 180 - n) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = n + u * h, p = e + r * Math.cos(f), m = t + r * Math.sin(f);
    a.push({ x: p, y: m });
  }
  return a;
}
d(yr, "generateCirclePoints");
async function bg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.look === "neo" ? 18 : t.padding ?? 0, l = t.look === "neo" ? 12 : t.padding ?? 0, c = o.width + (t.look === "neo" ? n * 2 : n), h = o.height + (t.look === "neo" ? l * 2 : l), u = Math.max(5, h * 0.1), { cssStyles: f } = t, p = [
    ...yr(c / 2, -h / 2, u, 20, -90, 0),
    { x: c / 2 + u, y: -u },
    ...yr(c / 2 + u * 2, -u, u, 20, -180, -270),
    ...yr(c / 2 + u * 2, u, u, 20, -90, -180),
    { x: c / 2 + u, y: h / 2 },
    ...yr(c / 2, h / 2, u, 20, 0, 90)
  ], m = [
    { x: -c / 2, y: -h / 2 - u },
    { x: c / 2, y: -h / 2 - u },
    ...yr(c / 2, -h / 2, u, 20, -90, 0),
    { x: c / 2 + u, y: -u },
    ...yr(c / 2 + u * 2, -u, u, 20, -180, -270),
    ...yr(c / 2 + u * 2, u, u, 20, -90, -180),
    { x: c / 2 + u, y: h / 2 },
    ...yr(c / 2, h / 2, u, 20, 0, 90),
    { x: c / 2, y: h / 2 + u },
    { x: -c / 2, y: h / 2 + u }
  ], y = ct.svg(s), x = lt(t, { fill: "none" });
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const b = Rt(p).replace("Z", ""), S = y.path(b, x), _ = Rt(m), B = y.path(_, { ...x }), F = s.insert("g", ":first-child");
  return F.insert(() => B, ":first-child").attr("stroke-opacity", 0), F.insert(() => S, ":first-child"), F.attr("class", "text"), f && t.look !== "handDrawn" && F.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && F.selectAll("path").attr("style", i), F.attr("transform", `translate(${-u}, 0)`), a.attr(
    "transform",
    `translate(${-c / 2 + (t.padding ?? 0) / 2 - (o.x - (o.left ?? 0))},${-h / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`
  ), ft(t, F), t.intersect = function(A) {
    return nt.polygon(t, m, A);
  }, s;
}
d(bg, "curlyBraceRight");
function ue(e, t, r, i = 100, s = 0, o = 180) {
  const a = [], n = s * Math.PI / 180, h = (o * Math.PI / 180 - n) / (i - 1);
  for (let u = 0; u < i; u++) {
    const f = n + u * h, p = e + r * Math.cos(f), m = t + r * Math.sin(f);
    a.push({ x: -p, y: -m });
  }
  return a;
}
d(ue, "generateCirclePoints");
async function kg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.look === "neo" ? 18 : t.padding ?? 0, l = t.look === "neo" ? 12 : t.padding ?? 0, c = o.width + (t.look === "neo" ? n * 2 : n), h = o.height + (t.look === "neo" ? l * 2 : l), u = Math.max(5, h * 0.1), { cssStyles: f } = t, p = [
    ...ue(c / 2, -h / 2, u, 30, -90, 0),
    { x: -c / 2 - u, y: u },
    ...ue(c / 2 + u * 2, -u, u, 20, -180, -270),
    ...ue(c / 2 + u * 2, u, u, 20, -90, -180),
    { x: -c / 2 - u, y: -h / 2 },
    ...ue(c / 2, h / 2, u, 20, 0, 90)
  ], m = [
    ...ue(-c / 2 + u + u / 2, -h / 2, u, 20, -90, -180),
    { x: c / 2 - u / 2, y: u },
    ...ue(-c / 2 - u / 2, -u, u, 20, 0, 90),
    ...ue(-c / 2 - u / 2, u, u, 20, -90, 0),
    { x: c / 2 - u / 2, y: -u },
    ...ue(-c / 2 + u + u / 2, h / 2, u, 30, -180, -270)
  ], y = [
    { x: c / 2, y: -h / 2 - u },
    { x: -c / 2, y: -h / 2 - u },
    ...ue(c / 2, -h / 2, u, 20, -90, 0),
    { x: -c / 2 - u, y: -u },
    ...ue(c / 2 + u * 2, -u, u, 20, -180, -270),
    ...ue(c / 2 + u * 2, u, u, 20, -90, -180),
    { x: -c / 2 - u, y: h / 2 },
    ...ue(c / 2, h / 2, u, 20, 0, 90),
    { x: -c / 2, y: h / 2 + u },
    { x: c / 2 - u - u / 2, y: h / 2 + u },
    ...ue(-c / 2 + u + u / 2, -h / 2, u, 20, -90, -180),
    { x: c / 2 - u / 2, y: u },
    ...ue(-c / 2 - u / 2, -u, u, 20, 0, 90),
    ...ue(-c / 2 - u / 2, u, u, 20, -90, 0),
    { x: c / 2 - u / 2, y: -u },
    ...ue(-c / 2 + u + u / 2, h / 2, u, 30, -180, -270)
  ], x = ct.svg(s), C = lt(t, { fill: "none" });
  t.look !== "handDrawn" && (C.roughness = 0, C.fillStyle = "solid");
  const S = Rt(p).replace("Z", ""), _ = x.path(S, C), F = Rt(m).replace("Z", ""), A = x.path(F, C), L = Rt(y), H = x.path(L, { ...C }), N = s.insert("g", ":first-child");
  return N.insert(() => H, ":first-child").attr("stroke-opacity", 0), N.insert(() => _, ":first-child"), N.insert(() => A, ":first-child"), N.attr("class", "text"), f && t.look !== "handDrawn" && N.selectAll("path").attr("style", f), i && t.look !== "handDrawn" && N.selectAll("path").attr("style", i), N.attr("transform", `translate(${u - u / 4}, 0)`), a.attr(
    "transform",
    `translate(${-c / 2 + (t.padding ?? 0) / 2 - (o.x - (o.left ?? 0))},${-h / 2 + (t.padding ?? 0) / 2 - (o.y - (o.top ?? 0))})`
  ), ft(t, N), t.intersect = function(O) {
    return nt.polygon(t, y, O);
  }, s;
}
d(kg, "curlyBraces");
async function wg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s, n = 20, l = 5, { shapeSvg: c, bbox: h } = await yt(e, t, gt(t)), u = Math.max(l, h.height + a * 2, t?.height ?? 0), f = u / 2, p = f - Math.sqrt(Math.max(0, f ** 2 - (h.height / 2) ** 2)), m = Math.max(u / 4, p), y = Math.max(
    n,
    h.width + o * 2 + m * 2,
    (h.width + o * 2) * 1.25,
    t?.width ?? 0
  ), { cssStyles: x } = t, C = ct.svg(c), b = lt(t, {});
  t.look !== "handDrawn" && (b.roughness = 0, b.fillStyle = "solid");
  const S = y, _ = u, B = S - f, F = _ / 4, A = [
    { x: B, y: 0 },
    { x: F, y: 0 },
    { x: 0, y: _ / 2 },
    { x: F, y: _ },
    { x: B, y: _ },
    ...rr(-B, -_ / 2, f, 50, 270, 90)
  ], L = Rt(A), H = C.path(L, b), N = c.insert(() => H, ":first-child");
  return N.attr("class", "basic label-container outer-path"), x && t.look !== "handDrawn" && N.selectChildren("path").attr("style", x), i && t.look !== "handDrawn" && N.selectChildren("path").attr("style", i), N.attr("transform", `translate(${-y / 2}, ${-u / 2})`), ft(t, N), t.intersect = function(O) {
    return nt.polygon(t, A, O);
  }, c;
}
d(wg, "curvedTrapezoid");
async function Sg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.padding ?? 20, l = Math.max(o.width + n * 2, t.width ?? 0, 100), c = Math.min(Math.max(l * 0.23, 16), 56), h = c * 0.27, u = Math.max(
    o.height + n * 2,
    t.height ? t.height - (2 * c - h) : 0
  ), f = Math.min(l * 0.177, u * 0.45), p = u + 2 * c - h, m = -p / 2, y = m + 2 * c - h, x = s.insert("g", ":first-child").attr("class", "basic label-container"), { cssStyles: C } = t;
  if (t.look === "handDrawn") {
    const L = ct.svg(s), H = lt(t, {}), N = L.path(
      Le(-l / 2, y, l, u, f),
      H
    ), O = L.circle(0, m + c, c * 2, H);
    x.insert(() => O, ":first-child"), x.insert(() => N, ":first-child"), C && x.attr("style", C);
  } else
    x.append("rect").attr("x", -l / 2).attr("y", y).attr("width", l).attr("height", u).attr("rx", f).attr("ry", f).attr("style", i), x.append("circle").attr("cx", 0).attr("cy", m + c).attr("r", c).attr("style", i);
  ft(t, x);
  const b = y + u / 2;
  a.attr(
    "transform",
    `translate(${-(o.width / 2) - (o.x - (o.left ?? 0))}, ${b - o.height / 2 - (o.y - (o.top ?? 0))})`
  );
  const S = m + c, _ = Math.asin(Math.min(1, (y - S) / c)) * 180 / Math.PI, A = [
    ...rr(
      0,
      -S,
      c,
      24,
      180 + _,
      -_
    ),
    ...rr(-(-l / 2 + f), -(y + f), f, 12, 90, 0),
    ...rr(
      -(-l / 2 + f),
      -(p / 2 - f),
      f,
      12,
      360,
      270
    ),
    ...rr(
      -(l / 2 - f),
      -(p / 2 - f),
      f,
      12,
      270,
      180
    ),
    ...rr(
      -(l / 2 - f),
      -(y + f),
      f,
      12,
      180,
      90
    )
  ];
  return t.intersect = function(L) {
    return nt.polygon(t, A, L);
  }, s;
}
d(Sg, "person");
var AT = /* @__PURE__ */ d((e, t, r, i, s, o) => [
  `M${e},${t + o}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `a${s},${o} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `l0,${-i}`
].join(" "), "createCylinderPathD"), MT = /* @__PURE__ */ d((e, t, r, i, s, o) => [
  `M${e},${t + o}`,
  `M${e + r},${t + o}`,
  `a${s},${o} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `l0,${-i}`
].join(" "), "createOuterCylinderPathD"), ET = /* @__PURE__ */ d((e, t, r, i, s, o) => [`M${e - r / 2},${-i / 2}`, `a${s},${o} 0,0,0 ${r},0`].join(" "), "createInnerCylinderPathD"), zu = 8, Hu = 8;
async function Tg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 24 : s, a = t.look === "neo" ? 24 : s, n = t.width ?? 0;
  if (t.width && (t.width = t.width - a, t.width < Hu && (t.width = Hu)), t.height) {
    const b = n / 2 / (2.5 + n / 50);
    t.height = t.height - o - b * 3, t.height < zu && (t.height = zu);
  }
  const { shapeSvg: l, bbox: c, label: h } = await yt(e, t, gt(t)), u = Math.max(t.width ?? 0, c.width) + a, f = u / 2, p = f / (2.5 + u / 50), m = Math.max(t.height ?? 0, c.height) + o + p;
  let y;
  const { cssStyles: x } = t;
  if (t.look === "handDrawn") {
    const C = ct.svg(l), b = MT(0, 0, u, m, f, p), S = ET(0, p, u, m, f, p), _ = lt(t, {}), B = C.path(b, _), F = C.path(S, lt(t, { fill: "none" }));
    y = l.insert(() => F, ":first-child"), y = l.insert(() => B, ":first-child"), y.attr("class", "basic label-container"), x && y.attr("style", x);
  } else {
    const C = AT(0, 0, u, m, f, p);
    y = l.insert("path", ":first-child").attr("d", C).attr("class", "basic label-container outer-path").attr("style", te(x)).attr("style", i);
  }
  return y.attr("label-offset-y", p), y.attr("transform", `translate(${-u / 2}, ${-(m / 2 + p)})`), ft(t, y), h.attr(
    "transform",
    `translate(${-(c.width / 2) - (c.x - (c.left ?? 0))}, ${-(c.height / 2) + (t.padding ?? 0) / 1.5 - (c.y - (c.top ?? 0))})`
  ), t.intersect = function(C) {
    const b = nt.rect(t, C), S = b.x - (t.x ?? 0);
    if (f != 0 && (Math.abs(S) < (t.width ?? 0) / 2 || Math.abs(S) == (t.width ?? 0) / 2 && Math.abs(b.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - p)) {
      let _ = p * p * (1 - S * S / (f * f));
      _ > 0 && (_ = Math.sqrt(_)), _ = p - _, C.y - (t.y ?? 0) > 0 && (_ = -_), b.y += _;
    }
    return b;
  }, l;
}
d(Tg, "cylinder");
async function Ri(e, t, r) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a } = await yt(e, t, gt(t)), n = Math.max(a.width + r.labelPaddingX * 2, t?.width || 0), l = Math.max(a.height + r.labelPaddingY * 2, t?.height || 0), c = -n / 2, h = -l / 2;
  let u, { rx: f, ry: p } = t;
  const { cssStyles: m } = t;
  if (r?.rx && r.ry && (f = r.rx, p = r.ry), t.look === "handDrawn") {
    const y = ct.svg(o), x = lt(t, {}), C = f || p ? y.path(Le(c, h, n, l, f || 0), x) : y.rectangle(c, h, n, l, x);
    u = o.insert(() => C, ":first-child"), u.attr("class", "basic label-container").attr("style", te(m));
  } else
    u = o.insert("rect", ":first-child"), u.attr("class", "basic label-container").attr("style", s).attr("rx", te(f)).attr("ry", te(p)).attr("x", c).attr("y", h).attr("width", n).attr("height", l);
  return ft(
    t,
    u,
    t.look === "handDrawn" ? void 0 : { width: n, height: l }
  ), t.calcIntersect = function(y, x) {
    return nt.rect(y, x);
  }, t.intersect = function(y) {
    return nt.rect(t, y);
  }, o;
}
d(Ri, "drawRect");
async function _g(e, t) {
  const { cssClasses: r, labelPaddingX: i, labelPaddingY: s, padding: o, width: a, height: n } = t, l = {
    rx: 0,
    ry: 0,
    labelPaddingX: i ?? (o ?? 0) * 2,
    labelPaddingY: s ?? o ?? 0
  }, c = await Ri(e, t, l);
  if (t.look === "handDrawn") {
    const p = ct.svg(c), m = lt(t, {}), y = c.select(".basic.label-container > path:nth-child(2)"), x = y.node();
    if (!x)
      return c;
    let C = null;
    if (x instanceof SVGGraphicsElement)
      C = x.getBBox();
    else
      return c;
    return c.insert(
      () => p.line(C.x, C.y, C.x + C.width, C.y, m),
      ".basic.label-container g.label"
    ), c.insert(
      () => p.line(
        C.x,
        C.y + C.height,
        C.x + C.width,
        C.y + C.height,
        m
      ),
      ".basic.label-container g.label"
    ), y.remove(), c;
  }
  const h = c.select(".basic.label-container"), u = (Number(h.attr("width")) || a) ?? 0, f = (Number(h.attr("height")) || n) ?? 0;
  return u > 0 && f > 0 && h.attr("stroke-dasharray", `${u} ${f}`), c;
}
d(_g, "datastore");
async function Bg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 16 : t.padding ?? 0, { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = n.width + s, h = n.height + o, u = h * 0.2, f = -c / 2, p = -h / 2 - u / 2, { cssStyles: m } = t, y = ct.svg(a), x = lt(t, {});
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const C = [
    { x: f, y: p + u },
    { x: -f, y: p + u },
    { x: -f, y: -p },
    { x: f, y: -p },
    { x: f, y: p },
    { x: -f, y: p },
    { x: -f, y: p + u }
  ], b = y.polygon(
    C.map((_) => [_.x, _.y]),
    x
  ), S = a.insert(() => b, ":first-child");
  return S.attr("class", "basic label-container outer-path"), m && t.look !== "handDrawn" && S.selectAll("path").attr("style", m), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), l.attr(
    "transform",
    `translate(${f + (t.padding ?? 0) / 2 - (n.x - (n.left ?? 0))}, ${p + u + (t.padding ?? 0) / 2 - (n.y - (n.top ?? 0))})`
  ), ft(t, S), t.intersect = function(_) {
    return nt.rect(t, _);
  }, a;
}
d(Bg, "dividedRectangle");
async function vg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t), s = t.look === "neo" ? 12 : 5;
  t.labelStyle = r;
  const o = t.padding ?? 0, a = t.look === "neo" ? 16 : o, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t), {
    ignoreMinWidth: !0
  }), c = Math.sqrt(l.width ** 2 + l.height ** 2) / 2, h = (t?.width ? t?.width / 2 : c) + (a ?? 0), u = h + s;
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(n), y = lt(t, { roughness: 0.2, strokeWidth: 2.5 }), x = lt(t, { roughness: 0.2, strokeWidth: 1.5 }), C = m.circle(0, 0, u * 2, y), b = m.circle(0, 0, h * 2, x);
    f = n.insert("g", ":first-child"), f.attr("class", te(t.cssClasses)).attr("style", te(p)), f.node()?.appendChild(C), f.node()?.appendChild(b);
  } else {
    f = n.insert("g", ":first-child");
    const m = f.insert("circle", ":first-child"), y = f.insert("circle");
    f.attr("class", "basic label-container").attr("style", i), m.attr("class", "outer-circle").attr("style", i).attr("r", u).attr("cx", 0).attr("cy", 0), y.attr("class", "inner-circle").attr("style", i).attr("r", h).attr("cx", 0).attr("cy", 0);
  }
  return ft(t, f), t.intersect = function(m) {
    return J.info("DoubleCircle intersect", t, u, m), nt.circle(t, u, m);
  }, n;
}
d(vg, "doublecircle");
async function Lg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, halfPadding: a } = await yt(e, t, gt(t)), { theme: n, themeVariables: l } = Ot();
  Oe(s, t.colorIndex, n, l.borderColorArray);
  const c = a ?? 10, h = o.width / 2 + c * 2, u = o.height / 2 + c * 2;
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(s), y = lt(t, {}), x = m.ellipse(0, 0, h * 2, u * 2, y);
    f = s.insert(() => x, ":first-child"), f.attr("class", "basic label-container"), p && f.attr("style", p);
  } else
    f = s.insert("ellipse", ":first-child").attr("class", "basic label-container").attr("style", i).attr("rx", h).attr("ry", u).attr("cx", 0).attr("cy", 0);
  return t.width = h * 2, t.height = u * 2, ft(t, f), t.calcIntersect = function(m, y) {
    const x = m.width / 2, C = m.height / 2;
    return nt.ellipse(m, x, C, y);
  }, t.intersect = function(m) {
    return nt.ellipse(t, h, u, m);
  }, s;
}
d(Lg, "usecaseEllipse");
function Fg(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.label = "", t.labelStyle = i;
  const o = e.insert("g").attr("class", gt(t)).attr("id", t.domId ?? t.id), a = 7, { cssStyles: n } = t, l = ct.svg(o), { nodeBorder: c } = r, h = lt(t, { fillStyle: "solid" });
  t.look !== "handDrawn" && (h.roughness = 0);
  const u = l.circle(0, 0, a * 2, h), f = o.insert(() => u, ":first-child");
  return f.selectAll("path").attr("style", `fill: ${c} !important;`), n && n.length > 0 && t.look !== "handDrawn" && f.selectAll("path").attr("style", n), s && t.look !== "handDrawn" && f.selectAll("path").attr("style", s), ft(t, f), t.intersect = function(p) {
    return J.info("filledCircle intersect", t, { radius: a, point: p }), nt.circle(t, a, p);
  }, o;
}
d(Fg, "filledCircle");
var Yu = 10, Uu = 10;
async function Ag(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? s * 2 : s;
  (t.width || t.height) && (t.height = t?.height ?? 0, t.height < Yu && (t.height = Yu), t.width = (t?.width ?? 0) - o - o / 2, t.width < Uu && (t.width = Uu));
  const { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = (t?.width ? t?.width : n.width) + (o ?? 0), h = t?.height ? t?.height : c + n.height, u = h, f = [
    { x: 0, y: -h },
    { x: u, y: -h },
    { x: u / 2, y: 0 }
  ], { cssStyles: p } = t, m = ct.svg(a), y = lt(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = Rt(f), C = m.path(x, y), b = a.insert(() => C, ":first-child").attr("transform", `translate(${-h / 2}, ${h / 2})`).attr("class", "outer-path");
  return p && t.look !== "handDrawn" && b.selectChildren("path").attr("style", p), i && t.look !== "handDrawn" && b.selectChildren("path").attr("style", i), t.width = c, t.height = h, ft(t, b), l.attr(
    "transform",
    `translate(${-n.width / 2 - (n.x - (n.left ?? 0))}, ${-h / 2 + (t.padding ?? 0) / 2 + (n.y - (n.top ?? 0))})`
  ), t.intersect = function(S) {
    return J.info("Triangle intersect", t, f, S), nt.polygon(t, f, S);
  }, a;
}
d(Ag, "flippedTriangle");
async function Mg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.padding ?? 12, l = Math.max(o.width + n * 2, t.width ?? 0, 90), c = o.height + n * 2, h = Math.max(Math.min(c * 0.16, 14), 8), u = Math.max(c + h, t.height ?? 0), f = u - h, p = Math.max(l * 0.38, 28), m = -u / 2, y = [
    { x: -l / 2, y: m },
    { x: -l / 2 + p, y: m },
    { x: -l / 2 + p, y: m + h },
    { x: l / 2, y: m + h },
    { x: l / 2, y: u / 2 },
    { x: -l / 2, y: u / 2 }
  ], x = [
    `M${y[0].x},${y[0].y}`,
    ...y.slice(1).map((_) => `L${_.x},${_.y}`),
    "Z"
  ].join(" "), { cssStyles: C } = t;
  let b;
  if (t.look === "handDrawn") {
    const B = ct.svg(s).path(x, lt(t, {}));
    b = s.insert(() => B, ":first-child").attr("class", "basic label-container"), C && b.attr("style", C);
  } else
    b = s.insert("path", ":first-child").attr("d", x).attr("class", "basic label-container").attr("style", i);
  t.look === "handDrawn" ? ft(t, b) : ft(t, b, { width: l, height: u });
  const S = m + h + f / 2;
  return a.attr(
    "transform",
    `translate(${-(o.width / 2) - (o.x - (o.left ?? 0))}, ${S - o.height / 2 - (o.y - (o.top ?? 0))})`
  ), t.intersect = function(_) {
    return nt.polygon(t, y, _);
  }, s;
}
d(Mg, "folder");
function Eg(e, t, { dir: r, config: { state: i, themeVariables: s } }) {
  const { nodeStyles: o } = ht(t);
  t.label = "";
  const a = e.insert("g").attr("class", gt(t)).attr("id", t.domId ?? t.id), { cssStyles: n } = t;
  let l = Math.max(70, t?.width ?? 0), c = Math.max(10, t?.height ?? 0);
  (r === "LR" || r === "RL") && (l = Math.max(10, t?.width ?? 0), c = Math.max(70, t?.height ?? 0));
  const h = -1 * l / 2, u = -1 * c / 2, f = ct.svg(a), p = lt(t, {
    stroke: s.lineColor,
    fill: s.lineColor
  });
  t.look !== "handDrawn" && (p.roughness = 0, p.fillStyle = "solid");
  const m = f.rectangle(h, u, l, c, p), y = a.insert(() => m, ":first-child");
  n && t.look !== "handDrawn" && y.selectAll("path").attr("style", n), o && t.look !== "handDrawn" && y.selectAll("path").attr("style", o), ft(t, y);
  const x = i?.padding ?? 0;
  return t.width && t.height && (t.width += x / 2 || 0, t.height += x / 2 || 0), t.intersect = function(C) {
    return nt.rect(t, C);
  }, a;
}
d(Eg, "forkJoin");
async function $g(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = 15, o = 10, a = t.look === "neo" ? 16 : t.padding ?? 0, n = t.look === "neo" ? 12 : t.padding ?? 0;
  (t.width || t.height) && (t.height = (t?.height ?? 0) - n * 2, t.height < o && (t.height = o), t.width = (t?.width ?? 0) - a * 2, t.width < s && (t.width = s));
  const { shapeSvg: l, bbox: c } = await yt(e, t, gt(t)), h = (t?.height ? t?.height : Math.max(o, c.height)) + n * 2, u = h / 2, f = u - Math.sqrt(Math.max(0, u ** 2 - (c.height / 2) ** 2)), p = (t?.width ? t?.width : Math.max(s, c.width) + f * 2) + a * 2, { cssStyles: m } = t, y = ct.svg(l), x = lt(t, {});
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const C = [
    { x: -p / 2, y: -h / 2 },
    { x: p / 2 - u, y: -h / 2 },
    ...rr(-p / 2 + u, 0, u, 50, 90, 270),
    { x: p / 2 - u, y: h / 2 },
    { x: -p / 2, y: h / 2 }
  ], b = Rt(C), S = y.path(b, x), _ = l.insert(() => S, ":first-child");
  return _.attr("class", "basic label-container outer-path"), m && t.look !== "handDrawn" && _.selectChildren("path").attr("style", m), i && t.look !== "handDrawn" && _.selectChildren("path").attr("style", i), ft(t, _), t.intersect = function(B) {
    return J.info("Pill intersect", t, { radius: u, point: B }), nt.polygon(t, C, B);
  }, l;
}
d($g, "halfRoundedRectangle");
var $T = /* @__PURE__ */ d((e, t, r, i, s) => [
  `M${e + s},${t}`,
  `L${e + r - s},${t}`,
  `L${e + r},${t - i / 2}`,
  `L${e + r - s},${t - i}`,
  `L${e + s},${t - i}`,
  `L${e},${t - i / 2}`,
  "Z"
].join(" "), "createHexagonPathD");
async function Og(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t), s = t.look === "neo" ? 3.5 : 4;
  t.labelStyle = r;
  const o = t.padding ?? 0, a = 70, n = 32, l = t.look === "neo" ? a : o, c = t.look === "neo" ? n : o;
  if (t.width || t.height) {
    const S = (t.height ?? 0) / s;
    t.width = (t?.width ?? 0) - 2 * S - c, t.height = (t.height ?? 0) - l;
  }
  const { shapeSvg: h, bbox: u } = await yt(e, t, gt(t)), f = (t?.height ? t?.height : u.height) + l, p = f / s, m = (t?.width ? t?.width : u.width) + 2 * p + c, y = [
    { x: p, y: 0 },
    { x: m - p, y: 0 },
    { x: m, y: -f / 2 },
    { x: m - p, y: -f },
    { x: p, y: -f },
    { x: 0, y: -f / 2 }
  ];
  let x;
  const { cssStyles: C } = t;
  if (t.look === "handDrawn") {
    const b = ct.svg(h), S = lt(t, {}), _ = $T(0, 0, m, f, p), B = b.path(_, S);
    x = h.insert(() => B, ":first-child").attr("transform", `translate(${-m / 2}, ${f / 2})`), C && x.attr("style", C);
  } else
    x = lr(h, m, f, y);
  return i && x.attr("style", i), t.width = m, t.height = f, ft(t, x), t.intersect = function(b) {
    return nt.polygon(t, y, b);
  }, h;
}
d(Og, "hexagon");
async function Dg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.label = "", t.labelStyle = r;
  const { shapeSvg: s } = await yt(e, t, gt(t)), o = Math.max(30, t?.width ?? 0), a = Math.max(30, t?.height ?? 0), { cssStyles: n } = t, l = ct.svg(s), c = lt(t, {});
  t.look !== "handDrawn" && (c.roughness = 0, c.fillStyle = "solid");
  const h = [
    { x: 0, y: 0 },
    { x: o, y: 0 },
    { x: 0, y: a },
    { x: o, y: a }
  ], u = Rt(h), f = l.path(u, c), p = s.insert(() => f, ":first-child");
  return p.attr("class", "basic label-container outer-path"), n && t.look !== "handDrawn" && p.selectChildren("path").attr("style", n), i && t.look !== "handDrawn" && p.selectChildren("path").attr("style", i), p.attr("transform", `translate(${-o / 2}, ${-a / 2})`), ft(t, p), t.intersect = function(m) {
    return J.info("Pill intersect", t, { points: h }), nt.polygon(t, h, m);
  }, s;
}
d(Dg, "hourglass");
async function Ig(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: s } = ht(t);
  t.labelStyle = s;
  const o = t.assetHeight ?? 48, a = t.assetWidth ?? 48, n = Math.max(o, a), l = i?.wrappingWidth;
  t.width = Math.max(n, l ?? 0);
  const { shapeSvg: c, bbox: h, label: u } = await yt(e, t, "icon-shape default"), f = t.pos === "t", p = n, m = n, { nodeBorder: y } = r, { stylesMap: x } = jr(t), C = -m / 2, b = -p / 2, S = t.label ? 8 : 0, _ = ct.svg(c), B = lt(t, { stroke: "none", fill: "none" });
  t.look !== "handDrawn" && (B.roughness = 0, B.fillStyle = "solid");
  const F = _.rectangle(C, b, m, p, B), A = Math.max(m, h.width), L = p + h.height + S, H = _.rectangle(-A / 2, -L / 2, A, L, {
    ...B,
    fill: "transparent",
    stroke: "none"
  }), N = c.insert(() => F, ":first-child"), O = c.insert(() => H);
  if (t.icon) {
    const Q = c.append("g");
    Q.html(
      `<g>${await li(t.icon, {
        height: n,
        width: n,
        fallbackPrefix: ""
      })}</g>`
    );
    const R = Q.node().getBBox(), E = R.width, I = R.height, v = R.x, W = R.y;
    Q.attr(
      "transform",
      `translate(${-E / 2 - v},${f ? h.height / 2 + S / 2 - I / 2 - W : -h.height / 2 - S / 2 - I / 2 - W})`
    ), Q.attr("style", `color: ${x.get("stroke") ?? y};`);
  }
  return u.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${f ? -L / 2 : L / 2 - h.height})`
  ), N.attr(
    "transform",
    `translate(0,${f ? h.height / 2 + S / 2 : -h.height / 2 - S / 2})`
  ), ft(t, O), t.intersect = function(Q) {
    if (J.info("iconSquare intersect", t, Q), !t.label)
      return nt.rect(t, Q);
    const R = t.x ?? 0, E = t.y ?? 0, I = t.height ?? 0;
    let v = [];
    return f ? v = [
      { x: R - h.width / 2, y: E - I / 2 },
      { x: R + h.width / 2, y: E - I / 2 },
      { x: R + h.width / 2, y: E - I / 2 + h.height + S },
      { x: R + m / 2, y: E - I / 2 + h.height + S },
      { x: R + m / 2, y: E + I / 2 },
      { x: R - m / 2, y: E + I / 2 },
      { x: R - m / 2, y: E - I / 2 + h.height + S },
      { x: R - h.width / 2, y: E - I / 2 + h.height + S }
    ] : v = [
      { x: R - m / 2, y: E - I / 2 },
      { x: R + m / 2, y: E - I / 2 },
      { x: R + m / 2, y: E - I / 2 + p },
      { x: R + h.width / 2, y: E - I / 2 + p },
      { x: R + h.width / 2 / 2, y: E + I / 2 },
      { x: R - h.width / 2, y: E + I / 2 },
      { x: R - h.width / 2, y: E - I / 2 + p },
      { x: R - m / 2, y: E - I / 2 + p }
    ], nt.polygon(t, v, Q);
  }, c;
}
d(Ig, "icon");
async function Pg(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: s } = ht(t);
  t.labelStyle = s;
  const o = t.assetHeight ?? 48, a = t.assetWidth ?? 48, n = Math.max(o, a), l = i?.wrappingWidth;
  t.width = Math.max(n, l ?? 0);
  const { shapeSvg: c, bbox: h, label: u } = await yt(e, t, "icon-shape default"), f = 20, p = t.label ? 8 : 0, m = t.pos === "t", { nodeBorder: y, mainBkg: x } = r, { stylesMap: C } = jr(t), b = ct.svg(c), S = lt(t, {});
  t.look !== "handDrawn" && (S.roughness = 0, S.fillStyle = "solid");
  const _ = C.get("fill");
  S.stroke = _ ?? x;
  const B = c.append("g");
  t.icon && B.html(
    `<g>${await li(t.icon, {
      height: n,
      width: n,
      fallbackPrefix: ""
    })}</g>`
  );
  const F = B.node().getBBox(), A = F.width, L = F.height, H = F.x, N = F.y, O = Math.max(A, L) * Math.SQRT2 + f * 2, Q = b.circle(0, 0, O, S), R = Math.max(O, h.width), E = O + h.height + p, I = b.rectangle(-R / 2, -E / 2, R, E, {
    ...S,
    fill: "transparent",
    stroke: "none"
  }), v = c.insert(() => Q, ":first-child"), W = c.insert(() => I);
  return B.attr(
    "transform",
    `translate(${-A / 2 - H},${m ? h.height / 2 + p / 2 - L / 2 - N : -h.height / 2 - p / 2 - L / 2 - N})`
  ), B.attr("style", `color: ${C.get("stroke") ?? y};`), u.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${m ? -E / 2 : E / 2 - h.height})`
  ), v.attr(
    "transform",
    `translate(0,${m ? h.height / 2 + p / 2 : -h.height / 2 - p / 2})`
  ), ft(t, W), t.intersect = function(q) {
    return J.info("iconSquare intersect", t, q), nt.rect(t, q);
  }, c;
}
d(Pg, "iconCircle");
async function Rg(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: s } = ht(t);
  t.labelStyle = s;
  const o = t.assetHeight ?? 48, a = t.assetWidth ?? 48, n = Math.max(o, a), l = i?.wrappingWidth;
  t.width = Math.max(n, l ?? 0);
  const { shapeSvg: c, bbox: h, halfPadding: u, label: f } = await yt(
    e,
    t,
    "icon-shape default"
  ), p = t.pos === "t", m = n + u * 2, y = n + u * 2, { nodeBorder: x, mainBkg: C } = r, { stylesMap: b } = jr(t), S = -y / 2, _ = -m / 2, B = t.label ? 8 : 0, F = ct.svg(c), A = lt(t, {});
  t.look !== "handDrawn" && (A.roughness = 0, A.fillStyle = "solid");
  const L = b.get("fill");
  A.stroke = L ?? C;
  const H = F.path(Le(S, _, y, m, 5), A), N = Math.max(y, h.width), O = m + h.height + B, Q = F.rectangle(-N / 2, -O / 2, N, O, {
    ...A,
    fill: "transparent",
    stroke: "none"
  }), R = c.insert(() => H, ":first-child").attr("class", "icon-shape2"), E = c.insert(() => Q);
  if (t.icon) {
    const I = c.append("g");
    I.html(
      `<g>${await li(t.icon, {
        height: n,
        width: n,
        fallbackPrefix: ""
      })}</g>`
    );
    const v = I.node().getBBox(), W = v.width, q = v.height, rt = v.x, V = v.y;
    I.attr(
      "transform",
      `translate(${-W / 2 - rt},${p ? h.height / 2 + B / 2 - q / 2 - V : -h.height / 2 - B / 2 - q / 2 - V})`
    ), I.attr("style", `color: ${b.get("stroke") ?? x};`);
  }
  return f.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${p ? -O / 2 : O / 2 - h.height})`
  ), R.attr(
    "transform",
    `translate(0,${p ? h.height / 2 + B / 2 : -h.height / 2 - B / 2})`
  ), ft(t, E), t.intersect = function(I) {
    if (J.info("iconSquare intersect", t, I), !t.label)
      return nt.rect(t, I);
    const v = t.x ?? 0, W = t.y ?? 0, q = t.height ?? 0;
    let rt = [];
    return p ? rt = [
      { x: v - h.width / 2, y: W - q / 2 },
      { x: v + h.width / 2, y: W - q / 2 },
      { x: v + h.width / 2, y: W - q / 2 + h.height + B },
      { x: v + y / 2, y: W - q / 2 + h.height + B },
      { x: v + y / 2, y: W + q / 2 },
      { x: v - y / 2, y: W + q / 2 },
      { x: v - y / 2, y: W - q / 2 + h.height + B },
      { x: v - h.width / 2, y: W - q / 2 + h.height + B }
    ] : rt = [
      { x: v - y / 2, y: W - q / 2 },
      { x: v + y / 2, y: W - q / 2 },
      { x: v + y / 2, y: W - q / 2 + m },
      { x: v + h.width / 2, y: W - q / 2 + m },
      { x: v + h.width / 2 / 2, y: W + q / 2 },
      { x: v - h.width / 2, y: W + q / 2 },
      { x: v - h.width / 2, y: W - q / 2 + m },
      { x: v - y / 2, y: W - q / 2 + m }
    ], nt.polygon(t, rt, I);
  }, c;
}
d(Rg, "iconRounded");
async function Ng(e, t, { config: { themeVariables: r, flowchart: i } }) {
  const { labelStyles: s } = ht(t);
  t.labelStyle = s;
  const o = t.assetHeight ?? 48, a = t.assetWidth ?? 48, n = Math.max(o, a), l = i?.wrappingWidth;
  t.width = Math.max(n, l ?? 0);
  const { shapeSvg: c, bbox: h, halfPadding: u, label: f } = await yt(
    e,
    t,
    "icon-shape default"
  ), p = t.pos === "t", m = n + u * 2, y = n + u * 2, { nodeBorder: x, mainBkg: C } = r, { stylesMap: b } = jr(t), S = -y / 2, _ = -m / 2, B = t.label ? 8 : 0, F = ct.svg(c), A = lt(t, {});
  t.look !== "handDrawn" && (A.roughness = 0, A.fillStyle = "solid");
  const L = b.get("fill");
  A.stroke = L ?? C;
  const H = F.path(Le(S, _, y, m, 0.1), A), N = Math.max(y, h.width), O = m + h.height + B, Q = F.rectangle(-N / 2, -O / 2, N, O, {
    ...A,
    fill: "transparent",
    stroke: "none"
  }), R = c.insert(() => H, ":first-child"), E = c.insert(() => Q);
  if (t.icon) {
    const I = c.append("g");
    I.html(
      `<g>${await li(t.icon, {
        height: n,
        width: n,
        fallbackPrefix: ""
      })}</g>`
    );
    const v = I.node().getBBox(), W = v.width, q = v.height, rt = v.x, V = v.y;
    I.attr(
      "transform",
      `translate(${-W / 2 - rt},${p ? h.height / 2 + B / 2 - q / 2 - V : -h.height / 2 - B / 2 - q / 2 - V})`
    ), I.attr("style", `color: ${b.get("stroke") ?? x};`);
  }
  return f.attr(
    "transform",
    `translate(${-h.width / 2 - (h.x - (h.left ?? 0))},${p ? -O / 2 : O / 2 - h.height})`
  ), R.attr(
    "transform",
    `translate(0,${p ? h.height / 2 + B / 2 : -h.height / 2 - B / 2})`
  ), ft(t, E), t.intersect = function(I) {
    if (J.info("iconSquare intersect", t, I), !t.label)
      return nt.rect(t, I);
    const v = t.x ?? 0, W = t.y ?? 0, q = t.height ?? 0;
    let rt = [];
    return p ? rt = [
      { x: v - h.width / 2, y: W - q / 2 },
      { x: v + h.width / 2, y: W - q / 2 },
      { x: v + h.width / 2, y: W - q / 2 + h.height + B },
      { x: v + y / 2, y: W - q / 2 + h.height + B },
      { x: v + y / 2, y: W + q / 2 },
      { x: v - y / 2, y: W + q / 2 },
      { x: v - y / 2, y: W - q / 2 + h.height + B },
      { x: v - h.width / 2, y: W - q / 2 + h.height + B }
    ] : rt = [
      { x: v - y / 2, y: W - q / 2 },
      { x: v + y / 2, y: W - q / 2 },
      { x: v + y / 2, y: W - q / 2 + m },
      { x: v + h.width / 2, y: W - q / 2 + m },
      { x: v + h.width / 2 / 2, y: W + q / 2 },
      { x: v - h.width / 2, y: W + q / 2 },
      { x: v - h.width / 2, y: W - q / 2 + m },
      { x: v - y / 2, y: W - q / 2 + m }
    ], nt.polygon(t, rt, I);
  }, c;
}
d(Ng, "iconSquare");
async function qg(e, t, { config: { flowchart: r } }) {
  const i = new Image();
  i.src = t?.img ?? "", await i.decode();
  const s = Number(i.naturalWidth.toString().replace("px", "")), o = Number(i.naturalHeight.toString().replace("px", ""));
  t.imageAspectRatio = s / o;
  const { labelStyles: a } = ht(t);
  t.labelStyle = a;
  const n = r?.wrappingWidth;
  t.defaultWidth = r?.wrappingWidth;
  const l = Math.max(
    t.label ? n ?? 0 : 0,
    t?.assetWidth ?? s
  ), c = t.constraint === "on" && t?.assetHeight ? t.assetHeight * t.imageAspectRatio : l, h = t.constraint === "on" ? c / t.imageAspectRatio : t?.assetHeight ?? o;
  t.width = Math.max(c, n ?? 0);
  const { shapeSvg: u, bbox: f, label: p } = await yt(e, t, "image-shape default"), m = t.pos === "t", y = -c / 2, x = -h / 2, C = t.label ? 8 : 0, b = ct.svg(u), S = lt(t, {});
  t.look !== "handDrawn" && (S.roughness = 0, S.fillStyle = "solid");
  const _ = b.rectangle(y, x, c, h, S), B = Math.max(c, f.width), F = h + f.height + C, A = b.rectangle(-B / 2, -F / 2, B, F, {
    ...S,
    fill: "none",
    stroke: "none"
  }), L = u.insert(() => _, ":first-child"), H = u.insert(() => A);
  if (t.img) {
    const N = u.append("image");
    N.attr("href", t.img), N.attr("width", c), N.attr("height", h), N.attr("preserveAspectRatio", "none"), N.attr(
      "transform",
      `translate(${-c / 2},${m ? F / 2 - h : -F / 2})`
    );
  }
  return p.attr(
    "transform",
    `translate(${-f.width / 2 - (f.x - (f.left ?? 0))},${m ? -h / 2 - f.height / 2 - C / 2 : h / 2 - f.height / 2 + C / 2})`
  ), L.attr(
    "transform",
    `translate(0,${m ? f.height / 2 + C / 2 : -f.height / 2 - C / 2})`
  ), ft(t, H), t.intersect = function(N) {
    if (J.info("iconSquare intersect", t, N), !t.label)
      return nt.rect(t, N);
    const O = t.x ?? 0, Q = t.y ?? 0, R = t.height ?? 0;
    let E = [];
    return m ? E = [
      { x: O - f.width / 2, y: Q - R / 2 },
      { x: O + f.width / 2, y: Q - R / 2 },
      { x: O + f.width / 2, y: Q - R / 2 + f.height + C },
      { x: O + c / 2, y: Q - R / 2 + f.height + C },
      { x: O + c / 2, y: Q + R / 2 },
      { x: O - c / 2, y: Q + R / 2 },
      { x: O - c / 2, y: Q - R / 2 + f.height + C },
      { x: O - f.width / 2, y: Q - R / 2 + f.height + C }
    ] : E = [
      { x: O - c / 2, y: Q - R / 2 },
      { x: O + c / 2, y: Q - R / 2 },
      { x: O + c / 2, y: Q - R / 2 + h },
      { x: O + f.width / 2, y: Q - R / 2 + h },
      { x: O + f.width / 2 / 2, y: Q + R / 2 },
      { x: O - f.width / 2, y: Q + R / 2 },
      { x: O - f.width / 2, y: Q - R / 2 + h },
      { x: O - c / 2, y: Q - R / 2 + h }
    ], nt.polygon(t, E, N);
  }, u;
}
d(qg, "imageSquare");
async function Wg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = s, a = t.look === "neo" ? s * 2 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = Math.max(l.height + o * 2, t.height ?? 0), h = Math.max(l.width + a * 2, (t.width ?? 0) - c), u = [
    { x: 0, y: 0 },
    { x: h, y: 0 },
    { x: h + 3 * c / 6, y: -c },
    { x: -3 * c / 6, y: -c }
  ];
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(n), y = lt(t, {}), x = Rt(u), C = m.path(x, y);
    f = n.insert(() => C, ":first-child").attr("transform", `translate(${-h / 2}, ${c / 2})`), p && f.attr("style", p);
  } else
    f = lr(n, h, c, u);
  return i && f.attr("style", i), t.width = h, t.height = c, ft(t, f), t.intersect = function(m) {
    return nt.polygon(t, u, m);
  }, n;
}
d(Wg, "inv_trapezoid");
async function zg(e, t) {
  const { shapeSvg: r, bbox: i, label: s } = await yt(e, t, "label"), o = r.insert("rect", ":first-child");
  return o.attr("width", 0.1).attr("height", 0.1), r.attr("class", "label edgeLabel"), s.attr(
    "transform",
    `translate(${-(i.width / 2) - (i.x - (i.left ?? 0))}, ${-(i.height / 2) - (i.y - (i.top ?? 0))})`
  ), ft(t, o), t.intersect = function(l) {
    return nt.rect(t, l);
  }, r;
}
d(zg, "labelRect");
async function Hg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = s, a = t.look === "neo" ? s * 2 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = Math.max(l.height + o, t.height ?? 0), h = Math.max(l.width + a, (t.width ?? 0) - c), u = [
    { x: 0, y: 0 },
    { x: h + 3 * c / 6, y: 0 },
    { x: h, y: -c },
    { x: -(3 * c) / 6, y: -c }
  ];
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(n), y = lt(t, {}), x = Rt(u), C = m.path(x, y);
    f = n.insert(() => C, ":first-child").attr("transform", `translate(${-h / 2}, ${c / 2})`), p && f.attr("style", p);
  } else
    f = lr(n, h, c, u);
  return i && f.attr("style", i), t.width = h, t.height = c, ft(t, f), t.intersect = function(m) {
    return nt.polygon(t, u, m);
  }, n;
}
d(Hg, "lean_left");
async function Yg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = s, a = t.look === "neo" ? s * 2 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = Math.max(l.height + o, t.height ?? 0), h = Math.max(l.width + a, (t.width ?? 0) - c), u = [
    { x: -3 * c / 6, y: 0 },
    { x: h, y: 0 },
    { x: h + 3 * c / 6, y: -c },
    { x: 0, y: -c }
  ];
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(n), y = lt(t, {}), x = Rt(u), C = m.path(x, y);
    f = n.insert(() => C, ":first-child").attr("transform", `translate(${-h / 2}, ${c / 2})`), p && f.attr("style", p);
  } else
    f = lr(n, h, c, u);
  return i && f.attr("style", i), t.width = h, t.height = c, ft(t, f), t.intersect = function(m) {
    return nt.polygon(t, u, m);
  }, n;
}
d(Yg, "lean_right");
function Ug(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.label = "", t.labelStyle = r;
  const s = e.insert("g").attr("class", gt(t)).attr("id", t.domId ?? t.id), { cssStyles: o } = t, a = Math.max(35, t?.width ?? 0), n = Math.max(35, t?.height ?? 0), l = 7, c = [
    { x: a, y: 0 },
    { x: 0, y: n + l / 2 },
    { x: a - 2 * l, y: n + l / 2 },
    { x: 0, y: 2 * n },
    { x: a, y: n - l / 2 },
    { x: 2 * l, y: n - l / 2 }
  ], h = ct.svg(s), u = lt(t, {});
  t.look !== "handDrawn" && (u.roughness = 0, u.fillStyle = "solid");
  const f = Rt(c), p = h.path(f, u), m = s.insert(() => p, ":first-child");
  return m.attr("class", "outer-path"), o && t.look !== "handDrawn" && m.selectAll("path").attr("style", o), i && t.look !== "handDrawn" && m.selectAll("path").attr("style", i), m.attr("transform", `translate(-${a / 2},${-n})`), ft(t, m), t.intersect = function(y) {
    return J.info("lightningBolt intersect", t, y), nt.polygon(t, c, y);
  }, s;
}
d(Ug, "lightningBolt");
var OT = /* @__PURE__ */ d((e, t, r, i, s, o, a) => [
  `M${e},${t + o}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `a${s},${o} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `l0,${-i}`,
  `M${e},${t + o + a}`,
  `a${s},${o} 0,0,0 ${r},0`
].join(" "), "createCylinderPathD"), DT = /* @__PURE__ */ d((e, t, r, i, s, o, a) => [
  `M${e},${t + o}`,
  `M${e + r},${t + o}`,
  `a${s},${o} 0,0,0 ${-r},0`,
  `l0,${i}`,
  `a${s},${o} 0,0,0 ${r},0`,
  `l0,${-i}`,
  `M${e},${t + o + a}`,
  `a${s},${o} 0,0,0 ${r},0`
].join(" "), "createOuterCylinderPathD"), IT = /* @__PURE__ */ d((e, t, r, i, s, o) => [`M${e - r / 2},${-i / 2}`, `a${s},${o} 0,0,0 ${r},0`].join(" "), "createInnerCylinderPathD"), ju = 10, Gu = 10;
async function jg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 24 : s;
  if (t.width || t.height) {
    const C = t.width ?? 0;
    t.width = (t.width ?? 0) - o, t.width < Gu && (t.width = Gu);
    const S = C / 2 / (2.5 + C / 50);
    t.height = (t.height ?? 0) - a - S * 3, t.height < ju && (t.height = ju);
  }
  const { shapeSvg: n, bbox: l, label: c } = await yt(e, t, gt(t)), h = (t?.width ? t?.width : l.width) + o * 2, u = h / 2, f = u / (2.5 + h / 50), p = (t?.height ? t?.height : l.height) + f + a * 2, m = p * 0.1;
  let y;
  const { cssStyles: x } = t;
  if (t.look === "handDrawn") {
    const C = ct.svg(n), b = DT(0, 0, h, p, u, f, m), S = IT(0, f, h, p, u, f), _ = lt(t, {}), B = C.path(b, _), F = C.path(S, _);
    n.insert(() => F, ":first-child").attr("class", "line"), y = n.insert(() => B, ":first-child"), y.attr("class", "basic label-container"), x && y.attr("style", x);
  } else {
    const C = OT(0, 0, h, p, u, f, m);
    y = n.insert("path", ":first-child").attr("d", C).attr("class", "basic label-container outer-path").attr("style", te(x)).attr("style", i);
  }
  return y.attr("label-offset-y", f), y.attr("transform", `translate(${-h / 2}, ${-(p / 2 + f)})`), ft(t, y), c.attr(
    "transform",
    `translate(${-(l.width / 2) - (l.x - (l.left ?? 0))}, ${-(l.height / 2) + f - (l.y - (l.top ?? 0))})`
  ), t.intersect = function(C) {
    const b = nt.rect(t, C), S = b.x - (t.x ?? 0);
    if (u != 0 && (Math.abs(S) < (t.width ?? 0) / 2 || Math.abs(S) == (t.width ?? 0) / 2 && Math.abs(b.y - (t.y ?? 0)) > (t.height ?? 0) / 2 - f)) {
      let _ = f * f * (1 - S * S / (u * u));
      _ > 0 && (_ = Math.sqrt(_)), _ = f - _, C.y - (t.y ?? 0) > 0 && (_ = -_), b.y += _;
    }
    return b;
  }, n;
}
d(jg, "linedCylinder");
async function Gg(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s;
  if (t.width || t.height) {
    const _ = t.width;
    t.width = (_ ?? 0) * 10 / 11 - o * 2, t.width < 10 && (t.width = 10), t.height = (t?.height ?? 0) - a * 2, t.height < 10 && (t.height = 10);
  }
  const { shapeSvg: n, bbox: l, label: c } = await yt(e, t, gt(t)), h = (t?.width ? t?.width : l.width) + (o ?? 0) * 2, u = (t?.height ? t?.height : l.height) + (a ?? 0) * 2, f = t.look === "neo" ? u / 4 : u / 8, p = u + f, { cssStyles: m } = t, y = ct.svg(n), x = lt(t, {});
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const C = [
    { x: -h / 2 - h / 2 * 0.1, y: -p / 2 },
    { x: -h / 2 - h / 2 * 0.1, y: p / 2 },
    ...Yr(
      -h / 2 - h / 2 * 0.1,
      p / 2,
      h / 2 + h / 2 * 0.1,
      p / 2,
      f,
      0.8
    ),
    { x: h / 2 + h / 2 * 0.1, y: -p / 2 },
    { x: -h / 2 - h / 2 * 0.1, y: -p / 2 },
    { x: -h / 2, y: -p / 2 },
    { x: -h / 2, y: p / 2 * 1.1 },
    { x: -h / 2, y: -p / 2 }
  ], b = y.polygon(
    C.map((_) => [_.x, _.y]),
    x
  ), S = n.insert(() => b, ":first-child");
  return S.attr("class", "basic label-container outer-path"), m && t.look !== "handDrawn" && S.selectAll("path").attr("style", m), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), S.attr("transform", `translate(0,${-f / 2})`), c.attr(
    "transform",
    `translate(${-h / 2 + (t.padding ?? 0) + h / 2 * 0.1 / 2 - (l.x - (l.left ?? 0))},${-u / 2 + (t.padding ?? 0) - f - (l.y - (l.top ?? 0))})`
  ), ft(t, S), t.intersect = function(_) {
    return nt.polygon(t, C, _);
  }, n;
}
d(Gg, "linedWaveEdgedRect");
var PT = 56, wn = 72, Xu = 8, Vu = 2, RT = 8, NT = {
  normal: "usecase-actor-shape usecase-actor-normal",
  hollow: "usecase-actor-hollow",
  awesome: "usecase-actor-awesome",
  icon: "usecase-actor-icon"
}, Zu = Math.PI / 3, Ku = 0.6, Sn = /* @__PURE__ */ d((e, t) => {
  const r = t * Ku, i = t * Math.sqrt(1 - Ku ** 2), s = Math.cos(Zu), o = -Math.sin(Zu), a = r * -o, n = e + r * s, l = i * s, c = i * o;
  return `M ${a - l} ${n - c} L ${a + l} ${n + c}`;
}, "businessMarkerPathForCircle"), qT = {
  normal: Sn(-24, 12),
  hollow: Sn(-23, 9),
  awesome: Sn(-21, 13),
  icon: "M 12 -8 L 26 -26"
}, Qu = /* @__PURE__ */ d((e, t, r) => {
  const i = (t.x ?? 0) - (t.left ?? 0), s = (t.y ?? 0) - (t.top ?? 0);
  e.attr(
    "transform",
    `translate(${-t.width / 2 - i},${r - t.height / 2 - s})`
  );
}, "positionLabel"), Lh = /* @__PURE__ */ d((e, t, r, i, s = !1) => {
  if (t.look === "handDrawn") {
    const n = ct.svg(e).path(r, lt(t, s ? { fill: "none" } : {}));
    return e.insert(() => n, ":first-child").attr("class", i);
  }
  const o = e.append("path").attr("class", i).attr("d", r);
  return s && o.attr("fill", "none"), o;
}, "appendActorPath"), WT = /* @__PURE__ */ d((e, t, r, i, s, o, a = !1) => {
  if (t.look === "handDrawn") {
    const c = ct.svg(e).circle(
      r,
      i,
      s * 2,
      lt(t, a ? { fill: "none" } : {})
    );
    return e.insert(() => c, ":first-child").attr("class", o);
  }
  const n = e.append("circle").attr("class", o).attr("cx", r).attr("cy", i).attr("r", s);
  return a && n.attr("fill", "none"), n;
}, "appendActorCircle"), zT = /* @__PURE__ */ d((e, t, r) => {
  t.business && e.append("path").attr("class", "usecase-business-marker usecase-actor-business-marker").attr("d", qT[r]).attr("fill", "none").attr("style", "stroke: inherit !important; stroke-width: inherit !important");
}, "appendBusinessActorMarker");
async function Ms(e, t, r, i) {
  const { labelStyles: s, nodeStyles: o } = ht(t);
  t.labelStyle = s;
  const a = r === "icon" || t.stereotype !== void 0 ? {
    ...t,
    icon: r === "icon" ? void 0 : t.icon,
    stereotype: void 0
  } : t, {
    shapeSvg: n,
    bbox: l,
    label: c
  } = await yt(
    e,
    a,
    gt(t, `usecase-actor-variant usecase-actor-${r}`)
  ), h = t.accessibleName ?? t.label;
  h && n.attr("role", "img").attr("aria-label", h), c.attr("class", "label actor-label usecase-actor-label");
  const { theme: u, themeVariables: f } = Ot();
  Oe(n, t.colorIndex, u, f.borderColorArray);
  let p, m;
  if (t.stereotype) {
    const L = await ri(n, `«${t.stereotype}»`, {
      labelStyle: s,
      useHtmlLabels: t.useHtmlLabels,
      padding: 0,
      centerLabel: !0,
      width: t.wrappingWidth
    });
    p = L.label.attr("class", "label usecase-stereotype"), m = L.bbox;
  }
  const y = n.append("g").attr("class", `usecase-actor-glyph ${NT[r]}`).attr("style", o || null);
  await i(y, t), zT(y, t, r);
  const x = t.padding ?? RT, C = m?.height ?? 0, b = wn + Xu + l.height + (m ? C + Vu : 0), S = Math.max(PT, l.width, m?.width ?? 0) + x * 2, _ = b + x * 2, B = -b / 2;
  y.attr("transform", `translate(0,${B + wn / 2})`);
  let F = B + wn + Xu;
  p && m && (F += C / 2, Qu(p, m, F), F += C / 2 + Vu), Qu(c, l, F + l.height / 2);
  const A = n.insert("rect", ":first-child").attr("class", "usecase-actor-outline").attr("x", -S / 2).attr("y", -_ / 2).attr("width", S).attr("height", _).attr("opacity", 0).attr("aria-hidden", "true");
  return ft(t, A), t.intersect = (L) => nt.rect(t, L), n;
}
d(Ms, "renderUsecaseActor");
var HT = [
  "M 0 -12",
  "C 6.627 -12 12 -17.373 12 -24",
  "C 12 -30.627 6.627 -36 0 -36",
  "C -6.627 -36 -12 -30.627 -12 -24",
  "C -12 -17.373 -6.627 -12 0 -12 Z",
  "M 0 -12 V 8",
  "M -17 -5 H 17",
  "M 0 8 L -15 28",
  "M 0 8 L 15 28"
].join(" ");
async function Xg(e, t) {
  return Ms(e, t, "normal", (r, i) => {
    Lh(r, i, HT, "usecase-actor-stick");
  });
}
d(Xg, "usecaseActor");
var YT = [
  "M 0 -34",
  "C 7.18 -34 13 -28.18 13 -21",
  "C 13 -13.82 7.18 -8 0 -8",
  "C -7.18 -8 -13 -13.82 -13 -21",
  "C -13 -28.18 -7.18 -34 0 -34 Z",
  "M -24 25",
  "C -24 7 -14 -3 0 -3",
  "C 14 -3 24 7 24 25",
  "C 24 28 21 30 18 30",
  "H -18",
  "C -21 30 -24 28 -24 25 Z"
].join(" ");
async function Vg(e, t) {
  return Ms(e, t, "awesome", (r, i) => {
    Lh(r, i, YT, "usecase-actor-awesome-silhouette");
  });
}
d(Vg, "usecaseActorAwesome");
var UT = [
  "M -22 -10",
  "H 22",
  "V 0",
  "H 6",
  "L 22 17",
  "L 13 28",
  "L 0 13",
  "L -13 28",
  "L -22 17",
  "L -6 0",
  "H -22",
  "Z"
].join(" ");
async function Zg(e, t) {
  return Ms(e, t, "hollow", (r, i) => {
    WT(r, i, 0, -23, 9, "usecase-actor-hollow-head", !0), Lh(r, i, UT, "usecase-actor-hollow-body", !0);
  });
}
d(Zg, "usecaseActorHollow");
var yi = 52, Ju = 42, td = -2, jT = /* @__PURE__ */ d(async (e, t) => {
  const r = -yi / 2, i = td - yi / 2;
  if (t.look === "handDrawn") {
    const h = ct.svg(e).rectangle(
      r,
      i,
      yi,
      yi,
      lt(t, {})
    );
    e.insert(() => h, ":first-child").attr("class", "usecase-actor-icon-frame");
  } else
    e.append("rect").attr("class", "usecase-actor-icon-frame").attr("x", r).attr("y", i).attr("width", yi).attr("height", yi).attr("rx", 4).attr("ry", 4);
  const s = t.icon ?? "", o = await hf(s.includes(":") ? s : `fa:${s}`), a = await li(s, {
    height: Ju,
    width: Ju,
    fallbackPrefix: "fa"
  }), n = e.append("g").attr("class", `usecase-actor-icon-symbol${o ? "" : " usecase-actor-icon-fallback"}`).attr("aria-hidden", "true").html(`<g>${a}</g>`), l = n.node()?.getBBox();
  l && n.attr(
    "transform",
    `translate(${-l.width / 2 - l.x},${td - l.height / 2 - l.y})`
  );
}, "drawIconActor");
async function Kg(e, t) {
  return Ms(e, t, "icon", jT);
}
d(Kg, "usecaseActorIcon");
var ed = /* @__PURE__ */ d((e, t, r) => {
  const i = (t.x ?? 0) - (t.left ?? 0), s = (t.y ?? 0) - (t.top ?? 0);
  e.attr(
    "transform",
    `translate(${-t.width / 2 - i},${r - t.height / 2 - s})`
  );
}, "positionLabel");
async function Qg(e, t) {
  const r = t, { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const o = r.stereotype ? { ...t, stereotype: void 0 } : t, {
    shapeSvg: a,
    bbox: n,
    halfPadding: l,
    label: c
  } = await yt(e, o, gt(t, "usecase-business-shape"));
  c.attr("class", "label usecase-label");
  const { theme: h, themeVariables: u } = Ot();
  Oe(a, t.colorIndex, h, u.borderColorArray);
  let f, p;
  if (r.stereotype) {
    const R = await ri(a, `«${r.stereotype}»`, {
      labelStyle: i,
      useHtmlLabels: t.useHtmlLabels,
      padding: 0,
      centerLabel: !0,
      width: t.wrappingWidth
    });
    f = R.label.attr("class", "label usecase-stereotype"), p = R.bbox;
  }
  const m = p ? 2 : 0, y = n.height + (p?.height ?? 0) + m, x = Math.max(n.width, p?.width ?? 0), C = l ?? 10, b = x / 2 + C * 2, S = y / 2 + C * 2, _ = Math.min(Math.max(C / 5, 1), C / 2), B = x / 2 + _, F = b - _, A = B / b, L = F / b, H = S * Math.sqrt(Math.max(0, 1 - A * A)), N = -S * Math.sqrt(Math.max(0, 1 - L * L));
  f && p && ed(f, p, -y / 2 + p.height / 2), ed(c, n, y / 2 - n.height / 2);
  let O;
  if (t.look === "handDrawn") {
    const E = ct.svg(a).ellipse(0, 0, b * 2, S * 2, lt(t, {}));
    O = a.insert(() => E, ":first-child").attr("class", "basic label-container usecase-business-ellipse");
  } else
    O = a.insert("ellipse", ":first-child").attr("class", "basic label-container usecase-business-ellipse").attr("style", s).attr("rx", b).attr("ry", S).attr("cx", 0).attr("cy", 0);
  a.append("path").attr("class", "usecase-business-marker").attr("d", `M ${B} ${H} L ${F} ${N}`).attr("fill", "none").attr("style", s || null);
  const Q = r.accessibleName ?? r.label;
  return Q && a.attr("role", "img").attr("aria-label", Q), ft(t, O), t.calcIntersect = (R, E) => nt.ellipse(R, R.width / 2, R.height / 2, E), t.intersect = (R) => nt.ellipse(t, b, S, R), a;
}
d(Qg, "usecaseBusiness");
var Tn = 8, rd = 4, GT = 1, _n = /* @__PURE__ */ d((e, t, r, i) => {
  const s = (t.x ?? 0) - (t.left ?? 0), o = (t.y ?? 0) - (t.top ?? 0);
  e.attr(
    "transform",
    `translate(${r - t.width / 2 - s},${i - t.height / 2 - o})`
  );
}, "positionLabel"), XT = /* @__PURE__ */ d((e) => {
  const t = Number.parseFloat(e ?? "");
  return Number.isFinite(t) && t >= 0 ? t : GT;
}, "numericStrokeWidth");
async function Jg(e, t) {
  const r = t, { labelStyles: i, nodeStyles: s } = ht(t), { stylesMap: o } = jr(t);
  t.labelStyle = i;
  const {
    shapeSvg: a,
    bbox: n,
    label: l
  } = await yt(e, t, gt(t, "usecase-json-table"));
  a.attr("role", "img"), r.accessibleName && a.attr("aria-label", r.accessibleName), l.attr("class", "label usecase-json-title");
  const c = a.append("g").attr("class", "usecase-json-table-grid"), h = [];
  for (const R of r.jsonRows ?? []) {
    const E = await ri(c, R.key, {
      labelStyle: i,
      useHtmlLabels: t.useHtmlLabels,
      padding: 0,
      centerLabel: !0
    }), I = await ri(c, R.value, {
      labelStyle: i,
      useHtmlLabels: t.useHtmlLabels,
      padding: 0,
      centerLabel: !0
    });
    h.push({
      key: {
        label: E.label.attr("class", "label usecase-json-key"),
        bbox: E.bbox
      },
      value: {
        label: I.label.attr("class", "label usecase-json-value"),
        bbox: I.bbox
      }
    });
  }
  const u = Math.max(0, ...h.map(({ key: R }) => R.bbox.width)) + Tn * 2, f = Math.max(0, ...h.map(({ value: R }) => R.bbox.width)) + Tn * 2, p = n.width + Tn * 2, m = Math.max(p, u + f), y = f + Math.max(0, m - u - f), x = n.height + rd * 2, C = h.map(
    ({ key: R, value: E }) => Math.max(R.bbox.height, E.bbox.height) + rd * 2
  ), b = x + C.reduce((R, E) => R + E, 0), S = XT(o.get("stroke-width")), _ = m + S * 2, B = b + S * 2, F = -m / 2, A = -b / 2, L = t.look === "handDrawn" ? ct.svg(a) : void 0, H = L ? lt(t, {}) : void 0, N = /* @__PURE__ */ d((R, E, I, v, W, q) => {
    if (L && H) {
      const rt = L.rectangle(I, v, W, q, H);
      return R.insert(() => rt, ":first-child").attr("class", E);
    }
    return R.insert("rect", ":first-child").attr("class", E).attr("x", I).attr("y", v).attr("width", W).attr("height", q).attr("style", s);
  }, "insertCell"), O = N(
    a,
    "label-container usecase-json-border",
    -_ / 2,
    -B / 2,
    _,
    B
  );
  N(
    c,
    "usecase-json-cell usecase-json-title-cell",
    F,
    A,
    m,
    x
  ), c.node()?.append(l.node()), _n(l, n, 0, A + x / 2);
  let Q = A + x;
  return h.forEach(({ key: R, value: E }, I) => {
    const v = C[I], W = c.append("g").attr("class", "usecase-json-row").attr("data-row-index", I).attr("transform", `translate(0,${Q})`);
    N(W, "usecase-json-cell usecase-json-key-cell", F, 0, u, v), N(
      W,
      "usecase-json-cell usecase-json-value-cell",
      F + u,
      0,
      y,
      v
    ), W.node()?.append(R.label.node(), E.label.node()), _n(R.label, R.bbox, F + u / 2, v / 2), _n(E.label, E.bbox, F + u + y / 2, v / 2), Q += v;
  }), ft(t, O), t.intersect = (R) => nt.rect(t, R), a;
}
d(Jg, "usecaseJsonTable");
async function tm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s, n = t.look === "neo" ? 10 : 5;
  (t.width || t.height) && (t.width = Math.max((t?.width ?? 0) - o * 2 - 2 * n, 10), t.height = Math.max((t?.height ?? 0) - a * 2 - 2 * n, 10));
  const { shapeSvg: l, bbox: c, label: h } = await yt(e, t, gt(t)), u = (t?.width ? t?.width : c.width) + o * 2 + 2 * n, f = (t?.height ? t?.height : c.height) + a * 2 + 2 * n, p = u - 2 * n, m = f - 2 * n, y = -p / 2, x = -m / 2, { cssStyles: C } = t, b = ct.svg(l), S = lt(t, {}), _ = [
    { x: y - n, y: x + n },
    { x: y - n, y: x + m + n },
    { x: y + p - n, y: x + m + n },
    { x: y + p - n, y: x + m },
    { x: y + p, y: x + m },
    { x: y + p, y: x + m - n },
    { x: y + p + n, y: x + m - n },
    { x: y + p + n, y: x - n },
    { x: y + n, y: x - n },
    { x: y + n, y: x },
    { x: y, y: x },
    { x: y, y: x + n }
  ], B = [
    { x: y, y: x + n },
    { x: y + p - n, y: x + n },
    { x: y + p - n, y: x + m },
    { x: y + p, y: x + m },
    { x: y + p, y: x },
    { x: y, y: x }
  ];
  t.look !== "handDrawn" && (S.roughness = 0, S.fillStyle = "solid");
  const F = Rt(_);
  let A = b.path(F, S);
  const L = Rt(B);
  let H = b.path(L, S);
  t.look !== "handDrawn" && (A = al(A), H = al(H));
  const N = l.insert("g", ":first-child");
  return N.insert(() => A), N.insert(() => H), N.attr("class", "basic label-container outer-path"), C && t.look !== "handDrawn" && N.selectAll("path").attr("style", C), i && t.look !== "handDrawn" && N.selectAll("path").attr("style", i), h.attr(
    "transform",
    `translate(${-(c.width / 2) - n - (c.x - (c.left ?? 0))}, ${-(c.height / 2) + n - (c.y - (c.top ?? 0))})`
  ), ft(t, N), t.intersect = function(O) {
    return nt.polygon(t, _, O);
  }, l;
}
d(tm, "multiRect");
async function em(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = t.padding ?? 0, l = t.look === "neo" ? 16 : n, c = t.look === "neo" ? 12 : n;
  let h = !0;
  (t.width || t.height) && (h = !1, t.width = (t?.width ?? 0) - l * 2, t.height = (t?.height ?? 0) - c * 3);
  const u = Math.max(o.width, t?.width ?? 0) + l * 2, f = Math.max(o.height, t?.height ?? 0) + c * 3, p = t.look === "neo" ? f / 4 : f / 8, m = f + (h ? p / 2 : -p / 2), y = -u / 2, x = -m / 2, C = 10, { cssStyles: b } = t, S = Yr(
    y - C,
    x + m + C,
    y + u - C,
    x + m + C,
    p,
    0.8
  ), _ = S?.[S.length - 1], B = [
    { x: y - C, y: x + C },
    { x: y - C, y: x + m + C },
    ...S,
    { x: y + u - C, y: _.y - C },
    { x: y + u, y: _.y - C },
    { x: y + u, y: _.y - 2 * C },
    { x: y + u + C, y: _.y - 2 * C },
    { x: y + u + C, y: x - C },
    { x: y + C, y: x - C },
    { x: y + C, y: x },
    { x: y, y: x },
    { x: y, y: x + C }
  ], F = [
    { x: y, y: x + C },
    { x: y + u - C, y: x + C },
    { x: y + u - C, y: _.y - C },
    { x: y + u, y: _.y - C },
    { x: y + u, y: x },
    { x: y, y: x }
  ], A = ct.svg(s), L = lt(t, {});
  t.look !== "handDrawn" && (L.roughness = 0, L.fillStyle = "solid");
  const H = Rt(B), N = A.path(H, L), O = Rt(F), Q = A.path(O, L), R = s.insert(() => N, ":first-child");
  return R.insert(() => Q), R.attr("class", "basic label-container outer-path"), b && t.look !== "handDrawn" && R.selectAll("path").attr("style", b), i && t.look !== "handDrawn" && R.selectAll("path").attr("style", i), R.attr("transform", `translate(0,${-p / 2})`), a.attr(
    "transform",
    `translate(${-(o.width / 2) - C - (o.x - (o.left ?? 0))}, ${-(o.height / 2) + C - p - (o.y - (o.top ?? 0))})`
  ), ft(t, R), t.intersect = function(E) {
    return nt.polygon(t, B, E);
  }, s;
}
d(em, "multiWaveEdgedRectangle");
async function rm(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i, t.useHtmlLabels || le(Ut()) || (t.centerLabel = !0);
  const { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = Math.max(n.width + (t.padding ?? 0) * 2, t?.width ?? 0), h = Math.max(n.height + (t.padding ?? 0) * 2, t?.height ?? 0), u = -c / 2, f = -h / 2, { cssStyles: p } = t, m = ct.svg(a), y = lt(t, {
    fill: r.noteBkgColor,
    stroke: r.noteBorderColor
  });
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = m.rectangle(u, f, c, h, y), C = a.insert(() => x, ":first-child");
  return C.attr("class", "basic label-container outer-path"), l.attr("class", "label noteLabel"), p && t.look !== "handDrawn" && C.selectAll("path").attr("style", p), s && t.look !== "handDrawn" && C.selectAll("path").attr("style", s), l.attr(
    "transform",
    `translate(${-n.width / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) - (n.y - (n.top ?? 0))})`
  ), ft(t, C), t.intersect = function(b) {
    return nt.rect(t, b);
  }, a;
}
d(rm, "note");
var VT = /* @__PURE__ */ d((e, t, r) => [
  `M${e + r / 2},${t}`,
  `L${e + r},${t - r / 2}`,
  `L${e + r / 2},${t - r}`,
  `L${e},${t - r / 2}`,
  "Z"
].join(" "), "createDecisionBoxPathD");
async function im(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o } = await yt(e, t, gt(t)), a = o.width + (t.padding ?? 0), n = o.height + (t.padding ?? 0), l = a + n, c = 0.5, h = [
    { x: l / 2, y: 0 },
    { x: l, y: -l / 2 },
    { x: l / 2, y: -l },
    { x: 0, y: -l / 2 }
  ];
  let u;
  const { cssStyles: f } = t;
  if (t.look === "handDrawn") {
    const p = ct.svg(s), m = lt(t, {}), y = VT(0, 0, l), x = p.path(y, m);
    u = s.insert(() => x, ":first-child").attr("transform", `translate(${-l / 2 + c}, ${l / 2})`), f && u.attr("style", f);
  } else
    u = lr(s, l, l, h), u.attr("transform", `translate(${-l / 2 + c}, ${l / 2})`);
  return i && u.attr("style", i), ft(t, u), t.calcIntersect = function(p, m) {
    const y = p.width, x = [
      { x: y / 2, y: 0 },
      { x: y, y: -y / 2 },
      { x: y / 2, y: -y },
      { x: 0, y: -y / 2 }
    ];
    return nt.polygon(p, x, m);
  }, t.intersect = function(p) {
    return this.calcIntersect(t, p);
  }, s;
}
d(im, "question");
async function sm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 21 : s ?? 0, a = t.look === "neo" ? 12 : s ?? 0, { shapeSvg: n, bbox: l, label: c } = await yt(e, t, gt(t)), h = l.width + (t.look === "neo" ? o * 2 : o), u = Math.max(
    l.height + (t.look === "neo" ? a * 2 : a),
    t.height ?? 0
  ), f = u / 4, m = -Math.max(h, (t.width ?? 0) - f) / 2, y = -u / 2, x = y / 2, C = [
    { x: m + x, y },
    { x: m, y: 0 },
    { x: m + x, y: -y },
    { x: -m, y: -y },
    { x: -m, y }
  ], { cssStyles: b } = t, S = ct.svg(n), _ = lt(t, {});
  t.look !== "handDrawn" && (_.roughness = 0, _.fillStyle = "solid");
  const B = Rt(C), F = S.path(B, _), A = n.insert(() => F, ":first-child");
  return A.attr("class", "basic label-container outer-path"), b && t.look !== "handDrawn" && A.selectAll("path").attr("style", b), i && t.look !== "handDrawn" && A.selectAll("path").attr("style", i), A.attr("transform", `translate(${-x / 2},0)`), c.attr(
    "transform",
    `translate(${-x / 2 - l.width / 2 - (l.x - (l.left ?? 0))}, ${-(l.height / 2) - (l.y - (l.top ?? 0))})`
  ), ft(t, A), t.intersect = function(L) {
    return nt.polygon(t, C, L);
  }, n;
}
d(sm, "rect_left_inv_arrow");
async function om(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  let s;
  t.cssClasses ? s = "node " + t.cssClasses : s = "node default";
  const o = e.insert("g").attr("class", s).attr("id", t.domId || t.id), a = o.insert("g"), n = o.insert("g").attr("class", "label").attr("style", i), l = t.description, c = t.label, h = await xr(n, c, t.labelStyle, !0, !0);
  let u = { width: 0, height: 0 };
  if (le(Ot())) {
    const L = h.children[0], H = $t(h);
    u = L.getBoundingClientRect(), H.attr("width", u.width), H.attr("height", u.height);
  }
  J.info("Text 2", l);
  const f = l || [], p = h.getBBox(), m = await xr(
    n,
    Array.isArray(f) ? f.join("<br/>") : f,
    t.labelStyle,
    !0,
    !0
  ), y = m.children[0], x = $t(m);
  u = y.getBoundingClientRect(), x.attr("width", u.width), x.attr("height", u.height);
  const C = (t.padding || 0) / 2;
  $t(m).attr(
    "transform",
    "translate( " + (u.width > p.width ? 0 : (p.width - u.width) / 2) + ", " + (p.height + C + 5) + ")"
  ), $t(h).attr(
    "transform",
    "translate( " + (u.width < p.width ? 0 : -(p.width - u.width) / 2) + ", 0)"
  ), u = n.node().getBBox(), n.attr(
    "transform",
    "translate(" + -u.width / 2 + ", " + (-u.height / 2 - C + 3) + ")"
  );
  const b = u.width + (t.padding || 0), S = u.height + (t.padding || 0), _ = -u.width / 2 - C, B = -u.height / 2 - C;
  let F, A;
  if (t.look === "handDrawn") {
    const L = ct.svg(o), H = lt(t, {}), N = L.path(
      Le(_, B, b, S, t.rx || 0),
      H
    ), O = L.line(
      -u.width / 2 - C,
      -u.height / 2 - C + p.height + C,
      u.width / 2 + C,
      -u.height / 2 - C + p.height + C,
      H
    );
    A = o.insert(() => (J.debug("Rough node insert CXC", N), O), ":first-child"), F = o.insert(() => (J.debug("Rough node insert CXC", N), N), ":first-child");
  } else
    F = a.insert("rect", ":first-child"), A = a.insert("line"), F.attr("class", "outer title-state").attr("style", i).attr("x", -u.width / 2 - C).attr("y", -u.height / 2 - C).attr("width", u.width + (t.padding || 0)).attr("height", u.height + (t.padding || 0)), A.attr("class", "divider").attr("x1", -u.width / 2 - C).attr("x2", u.width / 2 + C).attr("y1", -u.height / 2 - C + p.height + C).attr("y2", -u.height / 2 - C + p.height + C);
  return ft(t, F), t.intersect = function(L) {
    return nt.rect(t, L);
  }, o;
}
d(om, "rectWithTitle");
async function am(e, t, { config: { themeVariables: r } }) {
  const i = r?.radius ?? 5, s = {
    rx: i,
    ry: i,
    labelPaddingX: (t?.padding ?? 0) * 1,
    labelPaddingY: (t?.padding ?? 0) * 1
  };
  return Ri(e, t, s);
}
d(am, "roundedRect");
var Xr = 8;
async function nm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 12 : t.padding ?? 0, { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = (t?.width ?? n.width) + s * 2 + (t.look === "neo" ? Xr : Xr * 2), h = (t?.height ?? n.height) + o * 2, u = c - Xr, f = h, p = Xr - c / 2, m = -h / 2, { cssStyles: y } = t, x = ct.svg(a), C = lt(t, {});
  t.look !== "handDrawn" && (C.roughness = 0, C.fillStyle = "solid");
  const b = [
    { x: p, y: m },
    { x: p + u, y: m },
    { x: p + u, y: m + f },
    { x: p - Xr, y: m + f },
    { x: p - Xr, y: m },
    { x: p, y: m },
    { x: p, y: m + f }
  ], S = x.polygon(
    b.map((B) => [B.x, B.y]),
    C
  ), _ = a.insert(() => S, ":first-child");
  return _.attr("class", "basic label-container outer-path").attr("style", te(y)), i && t.look !== "handDrawn" && _.selectAll("path").attr("style", i), y && t.look !== "handDrawn" && _.selectAll("path").attr("style", i), l.attr(
    "transform",
    `translate(${Xr / 2 - n.width / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) - (n.y - (n.top ?? 0))})`
  ), ft(t, _), t.intersect = function(B) {
    return nt.rect(t, B);
  }, a;
}
d(nm, "shadedProcess");
async function lm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s;
  (t.width || t.height) && (t.width = Math.max((t?.width ?? 0) - o * 2, 10), t.height = Math.max((t?.height ?? 0) / 1.5 - a * 2, 10));
  const { shapeSvg: n, bbox: l, label: c } = await yt(e, t, gt(t)), h = (t?.width ? t?.width : l.width) + o * 2, u = ((t?.height ? t?.height : l.height) + a * 2) * 1.5, f = h, p = u / 1.5, m = -f / 2, y = -p / 2, { cssStyles: x } = t, C = ct.svg(n), b = lt(t, {});
  t.look !== "handDrawn" && (b.roughness = 0, b.fillStyle = "solid");
  const S = [
    { x: m, y },
    { x: m, y: y + p },
    { x: m + f, y: y + p },
    { x: m + f, y: y - p / 2 }
  ], _ = Rt(S), B = C.path(_, b), F = n.insert(() => B, ":first-child");
  return F.attr("class", "basic label-container  outer-path"), x && t.look !== "handDrawn" && F.selectChildren("path").attr("style", x), i && t.look !== "handDrawn" && F.selectChildren("path").attr("style", i), F.attr("transform", `translate(0, ${p / 4})`), c.attr(
    "transform",
    `translate(${-f / 2 + (t.padding ?? 0) - (l.x - (l.left ?? 0))}, ${-p / 4 + (t.padding ?? 0) - (l.y - (l.top ?? 0))})`
  ), ft(t, F), t.intersect = function(A) {
    return nt.polygon(t, S, A);
  }, n;
}
d(lm, "slopedRect");
async function hm(e, t) {
  const r = t.padding ?? 0, i = t.look === "neo" ? 16 : r * 2, s = t.look === "neo" ? 12 : r, o = {
    rx: 0,
    ry: 0,
    labelPaddingX: t.labelPaddingX ?? i,
    labelPaddingY: s
  }, a = await Ri(e, t, o);
  if (t.colorIndex !== void 0) {
    const { theme: n, themeVariables: l } = Ot();
    Oe(a, t.colorIndex, n, l.borderColorArray);
  }
  return a;
}
d(hm, "squareRect");
var hl = 50, ZT = /* @__PURE__ */ d((e, t, r) => {
  const i = e.height + r, s = i * Math.cos(Math.PI / (2 * (hl - 1))), o = Math.sqrt(Math.max(0, s ** 2 - e.height ** 2));
  return { w: Math.max(
    e.width + i / 4 + t,
    1.5 * i + (i - s),
    e.width + t + i - o
  ), h: i };
}, "stadiumDimensions");
async function cm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 40 : s, a = t.look === "neo" ? 24 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), { w: c, h } = ZT(l, o, a), u = h / 2, { cssStyles: f } = t, p = ct.svg(n), m = lt(t, {});
  t.look !== "handDrawn" && (m.roughness = 0, m.fillStyle = "solid");
  const y = [
    { x: -c / 2 + u, y: -h / 2 },
    { x: c / 2 - u, y: -h / 2 },
    ...rr(-c / 2 + u, 0, u, hl, 90, 270),
    { x: c / 2 - u, y: h / 2 },
    ...rr(c / 2 - u, 0, u, hl, 270, 450)
  ], x = Rt(y), C = p.path(x, m), b = n.insert(() => C, ":first-child");
  return b.attr("class", "basic label-container outer-path"), f && t.look !== "handDrawn" && b.selectChildren("path").attr("style", f), i && t.look !== "handDrawn" && b.selectChildren("path").attr("style", i), ft(t, b), t.intersect = function(S) {
    return nt.polygon(t, y, S);
  }, n;
}
d(cm, "stadium");
async function um(e, t) {
  const r = {
    rx: t.look === "neo" ? 3 : 5,
    ry: t.look === "neo" ? 3 : 5
  };
  return Ri(e, t, r);
}
d(um, "state");
function dm(e, t, { config: { themeVariables: r } }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { cssStyles: o } = t, { lineColor: a, stateBorder: n, nodeBorder: l, nodeShadow: c } = r;
  (t.width || t.height) && ((t.width ?? 0) < 14 && (t.width = 14), (t.height ?? 0) < 14 && (t.height = 14)), t.width || (t.width = 14), t.height || (t.height = 14);
  const h = e.insert("g").attr("class", "node default").attr("id", t.domId ?? t.id), u = ct.svg(h), f = lt(t, {});
  t.look !== "handDrawn" && (f.roughness = 0, f.fillStyle = "solid");
  const p = u.circle(0, 0, t.width, {
    ...f,
    stroke: a,
    strokeWidth: 2
  }), m = n ?? l, y = (t.width ?? 0) * 5 / 14, x = u.circle(0, 0, y, {
    ...f,
    fill: m,
    stroke: m,
    strokeWidth: 2,
    fillStyle: "solid"
  }), C = h.insert(() => p, ":first-child");
  if (C.insert(() => x), t.look !== "handDrawn" && C.attr("class", "outer-path"), o && C.selectAll("path").attr("style", o), s && C.selectAll("path").attr("style", s), t.width < 25 && c && t.look !== "handDrawn") {
    const b = e.node()?.ownerSVGElement?.id ?? "", S = b ? `${b}-drop-shadow-small` : "drop-shadow-small";
    C.attr("style", `filter:url(#${S})`);
  }
  return ft(t, C), t.intersect = function(b) {
    return nt.circle(t, (t.width ?? 0) / 2, b);
  }, h;
}
d(dm, "stateEnd");
function fm(e, t, { config: { themeVariables: r } }) {
  const { lineColor: i, nodeShadow: s } = r;
  (t.width || t.height) && ((t.width ?? 0) < 14 && (t.width = 14), (t.height ?? 0) < 14 && (t.height = 14)), t.width || (t.width = 14), t.height || (t.height = 14);
  const o = e.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let a;
  if (t.look === "handDrawn") {
    const l = ct.svg(o).circle(0, 0, t.width, ab(i));
    a = o.insert(() => l), a.attr("class", "state-start").attr("r", (t.width ?? 7) / 2).attr("width", t.width ?? 14).attr("height", t.height ?? 14);
  } else
    a = o.insert("circle", ":first-child"), a.attr("class", "state-start").attr("r", (t.width ?? 7) / 2).attr("width", t.width ?? 14).attr("height", t.height ?? 14);
  if (t.width < 25 && s && t.look !== "handDrawn") {
    const n = e.node()?.ownerSVGElement?.id ?? "", l = n ? `${n}-drop-shadow-small` : "drop-shadow-small";
    a.attr("style", `filter:url(#${l})`);
  }
  return ft(t, a), t.intersect = function(n) {
    return nt.circle(t, (t.width ?? 7) / 2, n);
  }, o;
}
d(fm, "stateStart");
var xi = 8;
async function pm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t?.padding ?? 8, o = t.look === "neo" ? 28 : s, a = t.look === "neo" ? 12 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = Math.max(l.width + 2 * xi + o, t.width ?? 0), h = Math.max(l.height + a, t.height ?? 0), u = c - 2 * xi, f = h, p = -c / 2, m = -h / 2, y = [
    { x: 0, y: 0 },
    { x: u, y: 0 },
    { x: u, y: -f },
    { x: 0, y: -f },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: u + 8, y: 0 },
    { x: u + 8, y: -f },
    { x: -8, y: -f },
    { x: -8, y: 0 }
  ];
  if (t.look === "handDrawn") {
    const x = ct.svg(n), C = lt(t, {}), b = x.rectangle(p, m, u + 16, f, C), S = x.line(p + xi, m, p + xi, m + f, C), _ = x.line(p + xi + u, m, p + xi + u, m + f, C);
    n.insert(() => S, ":first-child"), n.insert(() => _, ":first-child");
    const B = n.insert(() => b, ":first-child"), { cssStyles: F } = t;
    B.attr("class", "basic label-container").attr("style", te(F)), ft(t, B);
  } else {
    const x = lr(n, u, f, y);
    i && x.attr("style", i), ft(t, x);
  }
  return t.intersect = function(x) {
    return nt.polygon(t, y, x);
  }, n;
}
d(pm, "subroutine");
var Bn = 0.2;
async function gm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s;
  (t.width || t.height) && (t.height = Math.max((t?.height ?? 0) - a * 2, 10), t.width = Math.max(
    (t?.width ?? 0) - o * 2 - Bn * (t.height + a * 2),
    10
  ));
  const { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = (t?.height ? t?.height : l.height) + a * 2, h = Bn * c, u = Bn * c, p = (t?.width ? t?.width : l.width) + o * 2 + h - h, m = c, y = -p / 2, x = -m / 2, { cssStyles: C } = t, b = ct.svg(n), S = lt(t, {}), _ = [
    { x: y - h / 2, y: x },
    { x: y + p + h / 2, y: x },
    { x: y + p + h / 2, y: x + m },
    { x: y - h / 2, y: x + m }
  ], B = [
    { x: y + p - h / 2, y: x + m },
    { x: y + p + h / 2, y: x + m },
    { x: y + p + h / 2, y: x + m - u }
  ];
  t.look !== "handDrawn" && (S.roughness = 0, S.fillStyle = "solid");
  const F = Rt(_), A = b.path(F, S), L = Rt(B), H = b.path(L, { ...S, fillStyle: "solid" }), N = n.insert(() => H, ":first-child");
  return N.insert(() => A, ":first-child"), N.attr("class", "basic label-container outer-path"), C && t.look !== "handDrawn" && N.selectAll("path").attr("style", C), i && t.look !== "handDrawn" && N.selectAll("path").attr("style", i), ft(t, N), t.intersect = function(O) {
    return nt.polygon(t, _, O);
  }, n;
}
d(gm, "taggedRect");
async function mm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(e, t, gt(t)), n = Math.max(o.width + (t.padding ?? 0) * 2, t?.width ?? 0), l = Math.max(o.height + (t.padding ?? 0) * 2, t?.height ?? 0), c = l / 8, h = 0.2 * n, u = 0.2 * l, f = l + c, { cssStyles: p } = t, m = ct.svg(s), y = lt(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = [
    { x: -n / 2 - n / 2 * 0.1, y: f / 2 },
    ...Yr(
      -n / 2 - n / 2 * 0.1,
      f / 2,
      n / 2 + n / 2 * 0.1,
      f / 2,
      c,
      0.8
    ),
    { x: n / 2 + n / 2 * 0.1, y: -f / 2 },
    { x: -n / 2 - n / 2 * 0.1, y: -f / 2 }
  ], C = -n / 2 + n / 2 * 0.1, b = -f / 2 - u * 0.4, S = [
    { x: C + n - h, y: (b + l) * 1.3 },
    { x: C + n, y: b + l - u },
    { x: C + n, y: (b + l) * 0.9 },
    ...Yr(
      C + n,
      (b + l) * 1.25,
      C + n - h,
      (b + l) * 1.3,
      -l * 0.02,
      0.5
    )
  ], _ = Rt(x), B = m.path(_, y), F = Rt(S), A = m.path(F, {
    ...y,
    fillStyle: "solid"
  }), L = s.insert(() => A, ":first-child");
  return L.insert(() => B, ":first-child"), L.attr("class", "basic label-container outer-path"), p && t.look !== "handDrawn" && L.selectAll("path").attr("style", p), i && t.look !== "handDrawn" && L.selectAll("path").attr("style", i), L.attr("transform", `translate(0,${-c / 2})`), a.attr(
    "transform",
    `translate(${-n / 2 + (t.padding ?? 0) - (o.x - (o.left ?? 0))},${-l / 2 + (t.padding ?? 0) - c / 2 - (o.y - (o.top ?? 0))})`
  ), ft(t, L), t.intersect = function(H) {
    return nt.polygon(t, x, H);
  }, s;
}
d(mm, "taggedWaveEdgedRectangle");
async function ym(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o } = await yt(e, t, gt(t)), a = Math.max(o.width + (t.padding ?? 0), t?.width || 0), n = Math.max(o.height + (t.padding ?? 0), t?.height || 0), l = -a / 2, c = -n / 2, h = s.insert("rect", ":first-child");
  return h.attr("class", "text").attr("style", i).attr("rx", 0).attr("ry", 0).attr("x", l).attr("y", c).attr("width", a).attr("height", n), ft(t, h), t.intersect = function(u) {
    return nt.rect(t, u);
  }, s;
}
d(ym, "text");
var KT = /* @__PURE__ */ d((e, t, r, i, s, o) => `M${e},${t}
    a${s},${o} 0,0,1 0,${-i}
    l${r},0
    a${s},${o} 0,0,1 0,${i}
    M${r},${-i}
    a${s},${o} 0,0,0 0,${i}
    l${-r},0`, "createCylinderPathD"), QT = /* @__PURE__ */ d((e, t, r, i, s, o) => [
  `M${e},${t}`,
  `M${e + r},${t}`,
  `a${s},${o} 0,0,0 0,${-i}`,
  `l${-r},0`,
  `a${s},${o} 0,0,0 0,${i}`,
  `l${r},0`
].join(" "), "createOuterCylinderPathD"), JT = /* @__PURE__ */ d((e, t, r, i, s, o) => [`M${e + r / 2},${-i / 2}`, `a${s},${o} 0,0,0 0,${i}`].join(" "), "createInnerCylinderPathD"), id = 5, sd = 10;
async function xm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 12 : s / 2, a = t.height ?? 0;
  if (t.height && (t.height = t.height - o, t.height < id && (t.height = id)), t.width) {
    const C = a / 2 / (2.5 + a / 50);
    t.width = t.width - o - C * 3, t.width < sd && (t.width = sd);
  }
  const { shapeSvg: n, bbox: l, label: c } = await yt(e, t, gt(t)), h = Math.max(t.height ?? 0, l.height) + o, u = h / 2, f = u / (2.5 + h / 50), p = Math.max(t.width ?? 0, l.width) + f + o, { cssStyles: m } = t;
  let y;
  if (t.look === "handDrawn") {
    const x = ct.svg(n), C = QT(0, 0, p, h, f, u), b = JT(0, 0, p, h, f, u), S = x.path(C, lt(t, {})), _ = x.path(b, lt(t, { fill: "none" }));
    y = n.insert(() => _, ":first-child"), y = n.insert(() => S, ":first-child"), y.attr("class", "basic label-container"), m && y.attr("style", m);
  } else {
    const x = KT(0, 0, p, h, f, u);
    y = n.insert("path", ":first-child").attr("d", x).attr("class", "basic label-container").attr("style", te(m)).attr("style", i), y.attr("class", "basic label-container outer-path"), m && y.selectAll("path").attr("style", m), i && y.selectAll("path").attr("style", i);
  }
  return y.attr("label-offset-x", f), y.attr("transform", `translate(${-p / 2}, ${h / 2} )`), c.attr(
    "transform",
    `translate(${-(l.width / 2) - f - (l.x - (l.left ?? 0))}, ${-(l.height / 2) - (l.y - (l.top ?? 0))})`
  ), ft(t, y), t.intersect = function(x) {
    const C = nt.rect(t, x), b = C.y - (t.y ?? 0);
    if (u != 0 && (Math.abs(b) < (t.height ?? 0) / 2 || Math.abs(b) == (t.height ?? 0) / 2 && Math.abs(C.x - (t.x ?? 0)) > (t.width ?? 0) / 2 - f)) {
      let S = f * f * (1 - b * b / (u * u));
      S != 0 && (S = Math.sqrt(Math.abs(S))), S = f - S, x.x - (t.x ?? 0) > 0 && (S = -S), C.x += S;
    }
    return C;
  }, n;
}
d(xm, "tiltedCylinder");
async function Cm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = (t.look === "neo", s), a = t.look === "neo" ? s * 2 : s, { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = Math.max(l.height + o, t.height ?? 0), h = Math.max(l.width + a, (t.width ?? 0) - c), u = [
    { x: -3 * c / 6, y: 0 },
    { x: h + 3 * c / 6, y: 0 },
    { x: h, y: -c },
    { x: 0, y: -c }
  ];
  let f;
  const { cssStyles: p } = t;
  if (t.look === "handDrawn") {
    const m = ct.svg(n), y = lt(t, {}), x = Rt(u), C = m.path(x, y);
    f = n.insert(() => C, ":first-child").attr("transform", `translate(${-h / 2}, ${c / 2})`), p && f.attr("style", p);
  } else
    f = lr(n, h, c, u);
  return i && f.attr("style", i), t.width = h, t.height = c, ft(t, f), t.intersect = function(m) {
    return nt.polygon(t, u, m);
  }, n;
}
d(Cm, "trapezoid");
async function bm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s, n = 15, l = 5;
  (t.width || t.height) && (t.height = (t.height ?? 0) - a * 2, t.height < l && (t.height = l), t.width = (t.width ?? 0) - o * 2, t.width < n && (t.width = n));
  const { shapeSvg: c, bbox: h } = await yt(e, t, gt(t)), u = (t?.width ? t?.width : h.width) + o * 2, f = (t?.height ? t?.height : h.height) + a * 2, { cssStyles: p } = t, m = ct.svg(c), y = lt(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = [
    { x: -u / 2 * 0.8, y: -f / 2 },
    { x: u / 2 * 0.8, y: -f / 2 },
    { x: u / 2, y: -f / 2 * 0.6 },
    { x: u / 2, y: f / 2 },
    { x: -u / 2, y: f / 2 },
    { x: -u / 2, y: -f / 2 * 0.6 }
  ], C = Rt(x), b = m.path(C, y), S = c.insert(() => b, ":first-child");
  return S.attr("class", "basic label-container outer-path"), p && t.look !== "handDrawn" && S.selectChildren("path").attr("style", p), i && t.look !== "handDrawn" && S.selectChildren("path").attr("style", i), ft(t, S), t.intersect = function(_) {
    return nt.polygon(t, x, _);
  }, c;
}
d(bm, "trapezoidalPentagon");
var od = 10, ad = 10;
async function km(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? s * 2 : s;
  (t.width || t.height) && (t.width = ((t?.width ?? 0) - o) / 2, t.width < ad && (t.width = ad), t.height = t?.height ?? 0, t.height < od && (t.height = od));
  const { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = ar(Ot().flowchart?.htmlLabels), h = (t?.width ? t?.width : n.width) + o, u = t?.height ? t?.height : h + n.height, f = u, p = [
    { x: 0, y: 0 },
    { x: f, y: 0 },
    { x: f / 2, y: -u }
  ], { cssStyles: m } = t, y = ct.svg(a), x = lt(t, {});
  t.look !== "handDrawn" && (x.roughness = 0, x.fillStyle = "solid");
  const C = Rt(p), b = y.path(C, x), S = a.insert(() => b, ":first-child").attr("transform", `translate(${-u / 2}, ${u / 2})`).attr("class", "outer-path");
  return m && t.look !== "handDrawn" && S.selectChildren("path").attr("style", m), i && t.look !== "handDrawn" && S.selectChildren("path").attr("style", i), t.width = h, t.height = u, ft(t, S), l.attr(
    "transform",
    `translate(${-n.width / 2 - (n.x - (n.left ?? 0))}, ${u / 2 - (n.height + (t.padding ?? 0) / (c ? 2 : 1) - (n.y - (n.top ?? 0)))})`
  ), t.intersect = function(_) {
    return J.info("Triangle intersect", t, p, _), nt.polygon(t, p, _);
  }, a;
}
d(km, "triangle");
async function wm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 12 : s;
  let n = !0;
  (t.width || t.height) && (n = !1, t.width = (t?.width ?? 0) - o * 2, t.width < 10 && (t.width = 10), t.height = (t?.height ?? 0) - a * 2, t.height < 10 && (t.height = 10));
  const { shapeSvg: l, bbox: c, label: h } = await yt(e, t, gt(t)), u = (t?.width ? t?.width : c.width) + (o ?? 0) * 2, f = (t?.height ? t?.height : c.height) + (a ?? 0) * 2, p = t.look === "neo" ? f / 4 : f / 8, m = f + (n ? p : -p), { cssStyles: y } = t, C = 14 - u, b = C > 0 ? C / 2 : 0, S = ct.svg(l), _ = lt(t, {});
  t.look !== "handDrawn" && (_.roughness = 0, _.fillStyle = "solid");
  const B = [
    { x: -u / 2 - b, y: m / 2 },
    ...Yr(
      -u / 2 - b,
      m / 2,
      u / 2 + b,
      m / 2,
      p,
      0.8
    ),
    { x: u / 2 + b, y: -m / 2 },
    { x: -u / 2 - b, y: -m / 2 }
  ], F = Rt(B), A = S.path(F, _), L = l.insert(() => A, ":first-child");
  return L.attr("class", "basic label-container outer-path"), y && t.look !== "handDrawn" && L.selectAll("path").attr("style", y), i && t.look !== "handDrawn" && L.selectAll("path").attr("style", i), L.attr("transform", `translate(0,${-p / 2})`), h.attr(
    "transform",
    `translate(${-u / 2 + (t.padding ?? 0) - (c.x - (c.left ?? 0))},${-f / 2 + (t.padding ?? 0) - p - (c.y - (c.top ?? 0))})`
  ), ft(t, L), t.intersect = function(H) {
    return nt.polygon(t, B, H);
  }, l;
}
d(wm, "waveEdgedRectangle");
async function Sm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.padding ?? 0, o = t.look === "neo" ? 16 : s, a = t.look === "neo" ? 20 : s;
  if (t.width || t.height) {
    t.width = t?.width ?? 0, t.width < 20 && (t.width = 20), t.height = t?.height ?? 0, t.height < 10 && (t.height = 10);
    const _ = Math.min(t.height * 0.2, t.height / 4);
    t.height = Math.ceil(t.height - a - _ * (20 / 9)), t.width = t.width - o * 2;
  }
  const { shapeSvg: n, bbox: l } = await yt(e, t, gt(t)), c = (t?.width ? t?.width : l.width) + o * 2, h = (t?.height ? t?.height : l.height) + a, u = h / 8, f = h + u * 2, { cssStyles: p } = t, m = ct.svg(n), y = lt(t, {});
  t.look !== "handDrawn" && (y.roughness = 0, y.fillStyle = "solid");
  const x = [
    { x: -c / 2, y: f / 2 },
    ...Yr(-c / 2, f / 2, c / 2, f / 2, u, 1),
    { x: c / 2, y: -f / 2 },
    ...Yr(c / 2, -f / 2, -c / 2, -f / 2, u, -1)
  ], C = Rt(x), b = m.path(C, y), S = n.insert(() => b, ":first-child");
  return S.attr("class", "basic label-container"), p && t.look !== "handDrawn" && S.selectAll("path").attr("style", p), i && t.look !== "handDrawn" && S.selectAll("path").attr("style", i), ft(t, S), t.intersect = function(_) {
    return nt.polygon(t, x, _);
  }, n;
}
d(Sm, "waveRectangle");
var Gt = 10;
async function Tm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t.look === "neo" ? 16 : t.padding ?? 0, o = t.look === "neo" ? 12 : t.padding ?? 0;
  (t.width || t.height) && (t.width = Math.max((t?.width ?? 0) - s * 2 - Gt, 10), t.height = Math.max((t?.height ?? 0) - o * 2 - Gt, 10));
  const { shapeSvg: a, bbox: n, label: l } = await yt(e, t, gt(t)), c = (t?.width ? t?.width : n.width) + s * 2 + Gt, h = (t?.height ? t?.height : n.height) + o * 2 + Gt, u = c - Gt, f = h - Gt, p = -u / 2, m = -f / 2, { cssStyles: y } = t, x = ct.svg(a), C = lt(t, {}), b = [
    { x: p - Gt, y: m - Gt },
    { x: p - Gt, y: m + f },
    { x: p + u, y: m + f },
    { x: p + u, y: m - Gt }
  ], S = `M${p - Gt},${m - Gt} L${p + u},${m - Gt} L${p + u},${m + f} L${p - Gt},${m + f} L${p - Gt},${m - Gt}
                M${p - Gt},${m} L${p + u},${m}
                M${p},${m - Gt} L${p},${m + f}`;
  t.look !== "handDrawn" && (C.roughness = 0, C.fillStyle = "solid");
  const _ = x.path(S, C), B = a.insert(() => _, ":first-child");
  return B.attr("transform", `translate(${Gt / 2}, ${Gt / 2})`), B.attr("class", "basic label-container outer-path"), y && t.look !== "handDrawn" && B.selectAll("path").attr("style", y), i && t.look !== "handDrawn" && B.selectAll("path").attr("style", i), l.attr(
    "transform",
    `translate(${-(n.width / 2) + Gt / 2 - (n.x - (n.left ?? 0))}, ${-(n.height / 2) + Gt / 2 - (n.y - (n.top ?? 0))})`
  ), ft(t, B), t.intersect = function(F) {
    return nt.polygon(t, b, F);
  }, a;
}
d(Tm, "windowPane");
var nd = /* @__PURE__ */ new Set(["redux-color", "redux-dark-color"]), t_ = /* @__PURE__ */ new Set(["redux", "redux-dark", "redux-color", "redux-dark-color"]);
async function Fh(e, t) {
  const r = t;
  r.alias && (t.label = r.alias);
  const { theme: i, themeVariables: s } = Ut(), { rowEven: o, rowOdd: a, nodeBorder: n, borderColorArray: l } = s;
  if (t.look === "handDrawn") {
    const { themeVariables: pt } = Ut(), { background: dt } = pt, _t = {
      ...t,
      id: t.id + "-background",
      domId: (t.domId || t.id) + "-background",
      look: "default",
      cssStyles: ["stroke: none", `fill: ${dt}`]
    };
    await Fh(e, _t);
  }
  const c = Ut();
  t.useHtmlLabels = c.htmlLabels;
  let h = c.er?.diagramPadding ?? 10, u = c.er?.entityPadding ?? 6;
  const { cssStyles: f } = t, { labelStyles: p, nodeStyles: m } = ht(t);
  if (r.attributes.length === 0 && t.label) {
    const pt = {
      rx: 0,
      ry: 0,
      labelPaddingX: h,
      labelPaddingY: h * 1.5
    };
    Tr(t.label, c) + pt.labelPaddingX * 2 < c.er.minEntityWidth && (t.width = c.er.minEntityWidth);
    const dt = await Ri(e, t, pt);
    if (i != null && nd.has(i)) {
      const _t = r.colorIndex ?? 0;
      dt.attr("data-color-id", `color-${_t % l.length}`);
    }
    if (!ar(c.htmlLabels)) {
      const _t = dt.select("text"), It = _t.node()?.getBBox();
      _t.attr("transform", `translate(${-It.width / 2}, 0)`);
    }
    return dt;
  }
  c.htmlLabels || (h *= 1.25, u *= 1.25);
  let y = gt(t);
  y || (y = "node default");
  const x = e.insert("g").attr("class", y).attr("id", t.domId || t.id), C = await ki(x, t.label ?? "", c, 0, 0, ["name"], p);
  C.height += u;
  let b = 0;
  const S = [], _ = [];
  let B = 0, F = 0, A = 0, L = 0, H = !0, N = !0;
  for (const pt of r.attributes) {
    const dt = await ki(
      x,
      pt.type,
      c,
      0,
      b,
      ["attribute-type"],
      p
    );
    B = Math.max(B, dt.width + h);
    const _t = await ki(
      x,
      pt.name,
      c,
      0,
      b,
      ["attribute-name"],
      p
    );
    F = Math.max(F, _t.width + h);
    const It = await ki(
      x,
      pt.keys.join(),
      c,
      0,
      b,
      ["attribute-keys"],
      p
    );
    A = Math.max(A, It.width + h);
    const St = await ki(
      x,
      pt.comment,
      c,
      0,
      b,
      ["attribute-comment"],
      p
    );
    L = Math.max(L, St.width + h);
    const Pt = Math.max(dt.height, _t.height, It.height, St.height) + u;
    _.push({ yOffset: b, rowHeight: Pt }), b += Pt;
  }
  let O = 4;
  A <= h && (H = !1, A = 0, O--), L <= h && (N = !1, L = 0, O--);
  const Q = x.node().getBBox();
  if (C.width + h * 2 - (B + F + A + L) > 0) {
    const pt = C.width + h * 2 - (B + F + A + L);
    B += pt / O, F += pt / O, A > 0 && (A += pt / O), L > 0 && (L += pt / O);
  }
  const R = B + F + A + L, E = ct.svg(x), I = lt(t, {});
  t.look !== "handDrawn" && (I.roughness = 0, I.fillStyle = "solid");
  let v = 0;
  _.length > 0 && (v = _.reduce((pt, dt) => pt + (dt?.rowHeight ?? 0), 0));
  const W = Math.max(Q.width + h * 2, t?.width || 0, R), q = Math.max((v ?? 0) + C.height, t?.height || 0), rt = -W / 2, V = -q / 2;
  if (x.selectAll("g:not(:first-child)").each((pt, dt, _t) => {
    const It = $t(_t[dt]), St = It.attr("transform");
    let Pt = 0, Xt = 0;
    if (St) {
      const Fe = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(St);
      Fe && (Pt = parseFloat(Fe[1]), Xt = parseFloat(Fe[2]), It.attr("class").includes("attribute-name") ? Pt += B : It.attr("class").includes("attribute-keys") ? Pt += B + F : It.attr("class").includes("attribute-comment") && (Pt += B + F + A));
    }
    It.attr(
      "transform",
      `translate(${rt + h / 2 + Pt}, ${Xt + V + C.height + u / 2})`
    );
  }), x.select(".name").attr("transform", "translate(" + -C.width / 2 + ", " + (V + u / 2) + ")"), i != null && nd.has(i)) {
    const pt = r.colorIndex ?? 0;
    x.attr("data-color-id", `color-${pt % l.length}`);
  }
  const ut = E.rectangle(rt, V, W, q, I), xt = x.insert(() => ut, ":first-child").attr("class", "outer-path").attr("style", f.join(""));
  S.push(0);
  for (const [pt, dt] of _.entries()) {
    const It = (pt + 1) % 2 === 0 && dt.yOffset !== 0, St = E.rectangle(rt, C.height + V + dt?.yOffset, W, dt?.rowHeight, {
      ...I,
      fill: It ? o : a,
      stroke: n
    });
    x.insert(() => St, "g.label").attr("style", f.join("")).attr("class", `row-rect-${It ? "even" : "odd"}`);
  }
  const wt = 1e-4;
  let Bt = wi(rt, C.height + V, W + rt, C.height + V, wt), Ct = E.polygon(
    Bt.map((pt) => [pt.x, pt.y]),
    I
  );
  if (x.insert(() => Ct).attr("class", "divider"), Bt = wi(B + rt, C.height + V, B + rt, q + V, wt), Ct = E.polygon(
    Bt.map((pt) => [pt.x, pt.y]),
    I
  ), x.insert(() => Ct).attr("class", "divider"), H) {
    const pt = B + F + rt;
    Bt = wi(pt, C.height + V, pt, q + V, wt), Ct = E.polygon(
      Bt.map((dt) => [dt.x, dt.y]),
      I
    ), x.insert(() => Ct).attr("class", "divider");
  }
  if (N) {
    const pt = B + F + A + rt;
    Bt = wi(pt, C.height + V, pt, q + V, wt), Ct = E.polygon(
      Bt.map((dt) => [dt.x, dt.y]),
      I
    ), x.insert(() => Ct).attr("class", "divider");
  }
  for (const pt of S) {
    const dt = C.height + V + pt;
    Bt = wi(rt, dt, W + rt, dt, wt), Ct = E.polygon(
      Bt.map((_t) => [_t.x, _t.y]),
      I
    ), x.insert(() => Ct).attr("class", "divider");
  }
  if (ft(t, xt), m && t.look !== "handDrawn")
    if (i != null && t_.has(i))
      x.selectAll("path").attr("style", m);
    else {
      const dt = m.split(";")?.filter((_t) => _t.includes("stroke"))?.map((_t) => `${_t}`).join("; ");
      x.selectAll("path").attr("style", dt ?? ""), x.selectAll(".row-rect-even path").attr("style", m);
    }
  return t.intersect = function(pt) {
    return nt.rect(t, pt);
  }, x;
}
d(Fh, "erBox");
async function ki(e, t, r, i = 0, s = 0, o = [], a = "") {
  const n = e.insert("g").attr("class", `label ${o.join(" ")}`).attr("transform", `translate(${i}, ${s})`).attr("style", a);
  t !== qc(t) && (t = qc(t), t = t.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
  const l = n.node().appendChild(
    await ve(
      n,
      t,
      {
        width: Tr(t, r) + 100,
        style: a,
        useHtmlLabels: r.htmlLabels
      },
      r
    )
  );
  if (t.includes("&lt;") || t.includes("&gt;")) {
    let h = l.children[0];
    for (h.textContent = h.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">"); h.childNodes[0]; )
      h = h.childNodes[0], h.textContent = h.textContent.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  }
  let c = l.getBBox();
  if (ar(r.htmlLabels)) {
    const h = l.children[0];
    h.style.textAlign = "start";
    const u = $t(l);
    c = h.getBoundingClientRect(), u.attr("width", c.width), u.attr("height", c.height);
  }
  return c;
}
d(ki, "addText");
function wi(e, t, r, i, s) {
  return e === r ? [
    { x: e - s / 2, y: t },
    { x: e + s / 2, y: t },
    { x: r + s / 2, y: i },
    { x: r - s / 2, y: i }
  ] : [
    { x: e, y: t - s / 2 },
    { x: e, y: t + s / 2 },
    { x: r, y: i + s / 2 },
    { x: r, y: i - s / 2 }
  ];
}
d(wi, "lineToPolygon");
async function _m(e, t, r, i, s = r.class.padding ?? 12) {
  const o = i ? 0 : 3, a = e.insert("g").attr("class", gt(t)).attr("id", t.domId || t.id);
  let n = null, l = null, c = null, h = null, u = 0, f = 0, p = 0;
  if (n = a.insert("g").attr("class", "annotation-group text"), t.annotations.length > 0) {
    const b = t.annotations[0];
    await as(n, { text: `«${b}»` }, 0), u = n.node().getBBox().height;
  }
  l = a.insert("g").attr("class", "label-group text"), await as(l, t, 0, ["font-weight: bolder"]);
  const m = l.node().getBBox();
  f = m.height, c = a.insert("g").attr("class", "members-group text");
  let y = 0;
  for (const b of t.members) {
    const S = await as(c, b, y, [b.parseClassifier()]);
    y += S + o;
  }
  p = c.node().getBBox().height, p <= 0 && (p = s / 2), h = a.insert("g").attr("class", "methods-group text");
  let x = 0;
  for (const b of t.methods) {
    const S = await as(h, b, x, [b.parseClassifier()]);
    x += S + o;
  }
  let C = a.node().getBBox();
  if (n !== null) {
    const b = n.node().getBBox();
    n.attr("transform", `translate(${-b.width / 2})`);
  }
  return l.attr("transform", `translate(${-m.width / 2}, ${u})`), C = a.node().getBBox(), c.attr(
    "transform",
    `translate(0, ${u + f + s * 2})`
  ), C = a.node().getBBox(), h.attr(
    "transform",
    `translate(0, ${u + f + (p ? p + s * 4 : s * 2)})`
  ), C = a.node().getBBox(), { shapeSvg: a, bbox: C };
}
d(_m, "textHelper");
async function as(e, t, r, i = []) {
  const s = e.insert("g").attr("class", "label").attr("style", i.join("; ")), o = Ut();
  let a = "useHtmlLabels" in t ? t.useHtmlLabels : ar(o.htmlLabels) ?? !0, n = "";
  "text" in t ? n = t.text : n = t.label, !a && n.startsWith("\\") && (n = n.substring(1)), ys(n) && (a = !0);
  const l = await ve(
    s,
    Wl(zr(n)),
    {
      width: Tr(n, o) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels: a
    },
    o
  );
  let c, h = 1;
  if (a) {
    const u = l.children[0], f = $t(l);
    h = u.innerHTML.split("<br>").length, u.innerHTML.includes("</math>") && (h += u.innerHTML.split("<mrow>").length - 1), await Th(u), c = u.getBoundingClientRect(), f.attr("width", c.width), f.attr("height", c.height);
  } else {
    i.includes("font-weight: bolder") && $t(l).selectAll("tspan").attr("font-weight", ""), h = l.children.length;
    const u = l.children[0];
    (l.textContent === "" || l.textContent.includes("&gt")) && (u.textContent = n[0] + n.substring(1).replaceAll("&gt;", ">").replaceAll("&lt;", "<").trim(), n[1] === " " && (u.textContent = u.textContent[0] + " " + u.textContent.substring(1))), u.textContent === "undefined" && (u.textContent = ""), c = l.getBBox();
  }
  return s.attr("transform", "translate(0," + (-c.height / (2 * h) + r) + ")"), c.height;
}
d(as, "addText");
async function Bm(e, t) {
  const r = Ot(), { theme: i, themeVariables: s } = r, { useGradient: o, borderColorArray: a } = s, n = r.class.padding ?? 12, l = n, c = t.useHtmlLabels ?? ar(r.htmlLabels) ?? !0, h = t;
  h.annotations = h.annotations ?? [], h.members = h.members ?? [], h.methods = h.methods ?? [];
  const { shapeSvg: u, bbox: f } = await _m(e, t, r, c, l);
  Oe(u, t.colorIndex, i, a);
  const { labelStyles: p, nodeStyles: m } = ht(t);
  t.labelStyle = p, t.cssStyles = h.styles || "";
  const y = h.styles?.join(";") || m || "";
  t.cssStyles || (t.cssStyles = y.replaceAll("!important", "").split(";"));
  const x = h.members.length === 0 && h.methods.length === 0 && !r.class?.hideEmptyMembersBox, C = ct.svg(u), b = lt(t, {});
  t.look !== "handDrawn" && (b.roughness = 0, b.fillStyle = "solid");
  const S = Math.max(t.width ?? 0, f.width);
  let _ = Math.max(t.height ?? 0, f.height);
  const B = (t.height ?? 0) > f.height;
  h.members.length === 0 && h.methods.length === 0 ? _ += l : h.members.length > 0 && h.methods.length === 0 && (_ += l * 2);
  const F = -S / 2, A = -_ / 2;
  let L = x ? n * 2 : h.members.length === 0 && h.methods.length === 0 ? -n : 0;
  B && (L = n * 2);
  const H = C.rectangle(
    F - n,
    A - n - (x ? n : h.members.length === 0 && h.methods.length === 0 ? -n / 2 : 0),
    S + 2 * n,
    _ + 2 * n + L,
    b
  ), N = u.insert(() => H, ":first-child");
  N.attr("class", "basic label-container outer-path");
  const O = N.node().getBBox(), Q = u.select(".annotation-group").node().getBBox().height - (x ? n / 2 : 0) || 0, R = u.select(".label-group").node().getBBox().height - (x ? n / 2 : 0) || 0, E = u.select(".members-group").node().getBBox().height - (x ? n / 2 : 0) || 0, I = (Q + R + A + n - (A - n - (x ? n : h.members.length === 0 && h.methods.length === 0 ? -n / 2 : 0))) / 2;
  if (u.selectAll(".text").each((v, W, q) => {
    const rt = $t(q[W]), V = rt.attr("transform");
    let ut = 0;
    if (V) {
      const Ct = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(V);
      Ct && (ut = parseFloat(Ct[2]));
    }
    let xt = ut + A + n - (x ? n : h.members.length === 0 && h.methods.length === 0 ? -n / 2 : 0);
    if (rt.attr("class").includes("methods-group")) {
      const Bt = Math.max(E, l / 2);
      B ? xt = Math.max(
        I,
        Q + R + Bt + A + l * 2 + n
      ) + l * 2 : xt = Q + R + Bt + A + l * 4 + n;
    }
    h.members.length === 0 && h.methods.length === 0 && r.class?.hideEmptyMembersBox && (h.annotations.length > 0 ? xt = ut - l : xt = ut), c || (xt -= 4);
    let wt = F;
    (rt.attr("class").includes("label-group") || rt.attr("class").includes("annotation-group")) && (wt = -rt.node()?.getBBox().width / 2 || 0, u.selectAll("text").each(function(Bt, Ct, pt) {
      window.getComputedStyle(pt[Ct]).textAnchor === "middle" && (wt = 0);
    })), rt.attr("transform", `translate(${wt}, ${xt})`);
  }), h.members.length > 0 || h.methods.length > 0 || x) {
    const v = Q + R + A + n, W = C.line(
      O.x,
      v,
      O.x + O.width,
      v + 1e-3,
      b
    );
    u.insert(() => W).attr("class", `divider${t.look === "neo" && !o ? " neo-line" : ""}`).attr("style", y);
  }
  if (x || h.members.length > 0 || h.methods.length > 0) {
    const v = Q + R + E + A + l * 2 + n, W = C.line(
      O.x,
      B ? Math.max(I, v) : v,
      O.x + O.width,
      (B ? Math.max(I, v) : v) + 1e-3,
      b
    );
    u.insert(() => W).attr("class", `divider${t.look === "neo" && !o ? " neo-line" : ""}`).attr("style", y);
  }
  if (h.look !== "handDrawn" && u.selectAll("path").attr("style", y), N.select(":nth-child(2)").attr("style", y), u.selectAll(".divider").select("path").attr("style", y), t.labelStyle ? u.selectAll("span").attr("style", t.labelStyle) : u.selectAll("span").attr("style", y), !c) {
    const v = RegExp(/color\s*:\s*([^;]*)/), W = v.exec(y);
    if (W) {
      const q = W[0].replace("color", "fill");
      u.selectAll("tspan").attr("style", q);
    } else if (p) {
      const q = v.exec(p);
      if (q) {
        const rt = q[0].replace("color", "fill");
        u.selectAll("tspan").attr("style", rt);
      }
    }
  }
  return ft(t, N), t.intersect = function(v) {
    return nt.rect(t, v);
  }, u;
}
d(Bm, "classBox");
async function vm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const s = t, o = t, a = 20, n = 20, l = "verifyMethod" in t, c = gt(t), h = Ot(), { themeVariables: u } = h, { borderColorArray: f, requirementEdgeLabelBackground: p } = u, m = h.layout === "elk" ? "start" : "center", y = e.insert("g").attr("class", c).attr("id", t.domId ?? t.id);
  let x;
  l ? x = await tr(
    y,
    `&lt;&lt;${s.type}&gt;&gt;`,
    0,
    t.labelStyle
  ) : x = await tr(y, "&lt;&lt;Element&gt;&gt;", 0, t.labelStyle);
  let C = x;
  const b = await tr(
    y,
    s.name,
    C,
    t.labelStyle + "; font-weight: bold;"
  );
  if (C += b + n, l) {
    const O = await tr(
      y,
      `${s.requirementId ? `ID: ${s.requirementId}` : ""}`,
      C,
      t.labelStyle,
      m
    );
    C += O;
    const Q = await tr(
      y,
      `${s.text ? `Text: ${s.text}` : ""}`,
      C,
      t.labelStyle,
      m
    );
    C += Q;
    const R = await tr(
      y,
      `${s.risk ? `Risk: ${s.risk}` : ""}`,
      C,
      t.labelStyle,
      m
    );
    C += R, await tr(
      y,
      `${s.verifyMethod ? `Verification: ${s.verifyMethod}` : ""}`,
      C,
      t.labelStyle,
      m
    );
  } else {
    const O = await tr(
      y,
      `${o.type ? `Type: ${o.type}` : ""}`,
      C,
      t.labelStyle,
      m
    );
    C += O, await tr(
      y,
      `${o.docRef ? `Doc Ref: ${o.docRef}` : ""}`,
      C,
      t.labelStyle,
      m
    );
  }
  const S = (y.node()?.getBBox().width ?? 200) + a, _ = (y.node()?.getBBox().height ?? 200) + a, B = -S / 2, F = -_ / 2, A = ct.svg(y), L = lt(t, {});
  t.look !== "handDrawn" && (L.roughness = 0, L.fillStyle = "solid");
  const H = A.rectangle(B, F, S, _, L), N = y.insert(() => H, ":first-child");
  if (N.attr("class", "basic label-container outer-path").attr("style", i), f?.length) {
    const O = t.colorIndex ?? 0;
    y.attr("data-color-id", `color-${O % f.length}`);
  }
  if (y.selectAll(".label").each((O, Q, R) => {
    const E = $t(R[Q]), I = E.attr("transform");
    let v = 0, W = 0;
    if (I) {
      const ut = RegExp(/translate\(([^,]+),([^)]+)\)/).exec(I);
      ut && (v = parseFloat(ut[1]), W = parseFloat(ut[2]));
    }
    const q = W - _ / 2;
    let rt = B + a / 2;
    (Q === 0 || Q === 1) && (rt = v), E.attr("transform", `translate(${rt}, ${q + a})`);
  }), C > x + b + n) {
    const O = F + x + b + n;
    let Q;
    if (t.look === "neo") {
      const I = [
        [B, O],
        [B + S, O],
        [B + S, O + 1e-3],
        [B, O + 1e-3]
      ];
      Q = A.polygon(I, L);
    } else
      Q = A.line(B, O, B + S, O, L);
    y.insert(() => Q).attr("class", "divider");
  }
  return ft(t, N), t.intersect = function(O) {
    return nt.rect(t, O);
  }, i && t.look !== "handDrawn" && (p || f?.length) && y.selectAll("path").attr("style", i), y;
}
d(vm, "requirementBox");
async function tr(e, t, r, i = "", s = "center") {
  if (t === "")
    return 0;
  const o = e.insert("g").attr("class", "label").attr("style", i), a = Ot(), n = a.htmlLabels ?? !0, l = await ve(
    o,
    Wl(zr(t)),
    {
      width: Tr(t, a) + 50,
      // Add room for error when splitting text into multiple lines
      classes: "markdown-node-label",
      useHtmlLabels: n,
      style: i
    },
    a
  );
  let c;
  if (n) {
    const h = l.children[0], u = $t(l);
    s === "start" && $t(h).style("text-align", "left"), c = h.getBoundingClientRect(), u.attr("width", c.width), u.attr("height", c.height);
  } else {
    const h = l.children[0];
    for (const u of h.children)
      i && u.setAttribute("style", i);
    if (s === "start") {
      h.setAttribute("text-anchor", "start");
      for (const u of h.children)
        u.setAttribute("text-anchor", "start");
    }
    c = l.getBBox(), c.height += 6;
  }
  return o.attr("transform", `translate(${-c.width / 2},${-c.height / 2 + r})`), c.height;
}
d(tr, "addText");
var e_ = /* @__PURE__ */ d((e) => {
  switch (e) {
    case "Very High":
      return "red";
    case "High":
      return "orange";
    case "Medium":
      return null;
    // no stroke
    case "Low":
      return "blue";
    case "Very Low":
      return "lightblue";
  }
}, "colorFromPriority");
async function Lm(e, t, { config: r }) {
  const { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i || "";
  const o = 10, a = t.width;
  t.width = (t.width ?? 200) - 10;
  const {
    shapeSvg: n,
    bbox: l,
    label: c
  } = await yt(e, t, gt(t)), h = t.padding || 10;
  let u = "", f;
  "ticket" in t && t.ticket && r?.kanban?.ticketBaseUrl && (u = r?.kanban?.ticketBaseUrl.replace("#TICKET#", t.ticket), f = n.insert("svg:a", ":first-child").attr("class", "kanban-ticket-link").attr("xlink:href", u).attr("target", "_blank"));
  const p = {
    useHtmlLabels: t.useHtmlLabels,
    labelStyle: t.labelStyle || "",
    width: t.width,
    img: t.img,
    padding: t.padding || 8,
    centerLabel: !1
  };
  let m, y;
  f ? { label: m, bbox: y } = await ri(
    f,
    "ticket" in t && t.ticket || "",
    p
  ) : { label: m, bbox: y } = await ri(
    n,
    "ticket" in t && t.ticket || "",
    p
  );
  const { label: x, bbox: C } = await ri(
    n,
    "assigned" in t && t.assigned || "",
    p
  );
  t.width = a;
  const b = 10, S = t?.width || 0, _ = Math.max(y.height, C.height) / 2, B = Math.max(l.height + b * 2, t?.height || 0) + _, F = -S / 2, A = -B / 2;
  c.attr(
    "transform",
    "translate(" + (h - S / 2) + ", " + (-_ - l.height / 2) + ")"
  ), m.attr(
    "transform",
    "translate(" + (h - S / 2) + ", " + (-_ + l.height / 2) + ")"
  ), x.attr(
    "transform",
    "translate(" + (h + S / 2 - C.width - 2 * o) + ", " + (-_ + l.height / 2) + ")"
  );
  let L;
  const { rx: H, ry: N } = t, { cssStyles: O } = t;
  if (t.look === "handDrawn") {
    const Q = ct.svg(n), R = lt(t, {}), E = H || N ? Q.path(Le(F, A, S, B, H || 0), R) : Q.rectangle(F, A, S, B, R);
    L = n.insert(() => E, ":first-child"), L.attr("class", "basic label-container").attr("style", O || null);
  } else {
    L = n.insert("rect", ":first-child"), L.attr("class", "basic label-container __APA__").attr("style", s).attr("rx", H ?? 5).attr("ry", N ?? 5).attr("x", F).attr("y", A).attr("width", S).attr("height", B);
    const Q = "priority" in t && t.priority;
    if (Q) {
      const R = n.append("line"), E = F + 2, I = A + Math.floor((H ?? 0) / 2), v = A + B - Math.floor((H ?? 0) / 2);
      R.attr("x1", E).attr("y1", I).attr("x2", E).attr("y2", v).attr("stroke-width", "4").attr("stroke", e_(Q));
    }
  }
  return ft(t, L), t.height = B, t.intersect = function(Q) {
    return nt.rect(t, Q);
  }, n;
}
d(Lm, "kanbanItem");
async function Fm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, halfPadding: a, label: n } = await yt(
    e,
    t,
    gt(t)
  ), l = o.width + 10 * a, c = o.height + 8 * a, h = 0.15 * l, { cssStyles: u } = t, f = o.width + 20, p = o.height + 20, m = Math.max(l, f), y = Math.max(c, p);
  n.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`);
  let x;
  const C = `M0 0 
    a${h},${h} 1 0,0 ${m * 0.25},${-1 * y * 0.1}
    a${h},${h} 1 0,0 ${m * 0.25},0
    a${h},${h} 1 0,0 ${m * 0.25},0
    a${h},${h} 1 0,0 ${m * 0.25},${y * 0.1}

    a${h},${h} 1 0,0 ${m * 0.15},${y * 0.33}
    a${h * 0.8},${h * 0.8} 1 0,0 0,${y * 0.34}
    a${h},${h} 1 0,0 ${-1 * m * 0.15},${y * 0.33}

    a${h},${h} 1 0,0 ${-1 * m * 0.25},${y * 0.15}
    a${h},${h} 1 0,0 ${-1 * m * 0.25},0
    a${h},${h} 1 0,0 ${-1 * m * 0.25},0
    a${h},${h} 1 0,0 ${-1 * m * 0.25},${-1 * y * 0.15}

    a${h},${h} 1 0,0 ${-1 * m * 0.1},${-1 * y * 0.33}
    a${h * 0.8},${h * 0.8} 1 0,0 0,${-1 * y * 0.34}
    a${h},${h} 1 0,0 ${m * 0.1},${-1 * y * 0.33}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    const b = ct.svg(s), S = lt(t, {}), _ = b.path(C, S);
    x = s.insert(() => _, ":first-child"), x.attr("class", "basic label-container").attr("style", te(u));
  } else
    x = s.insert("path", ":first-child").attr("class", "basic label-container").attr("style", i).attr("d", C);
  return x.attr("transform", `translate(${-m / 2}, ${-y / 2})`), ft(t, x), t.calcIntersect = function(b, S) {
    return nt.rect(b, S);
  }, t.intersect = function(b) {
    return J.info("Bang intersect", t, b), nt.rect(t, b);
  }, s;
}
d(Fm, "bang");
async function Am(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, halfPadding: a, label: n } = await yt(
    e,
    t,
    gt(t)
  ), l = o.width + 2 * a, c = o.height + 2 * a, h = 0.15 * l, u = 0.25 * l, f = 0.35 * l, p = 0.2 * l, { cssStyles: m } = t;
  let y;
  const x = `M0 0 
    a${h},${h} 0 0,1 ${l * 0.25},${-1 * l * 0.1}
    a${f},${f} 1 0,1 ${l * 0.4},${-1 * l * 0.1}
    a${u},${u} 1 0,1 ${l * 0.35},${l * 0.2}

    a${h},${h} 1 0,1 ${l * 0.15},${c * 0.35}
    a${p},${p} 1 0,1 ${-1 * l * 0.15},${c * 0.65}

    a${u},${h} 1 0,1 ${-1 * l * 0.25},${l * 0.15}
    a${f},${f} 1 0,1 ${-1 * l * 0.5},0
    a${h},${h} 1 0,1 ${-1 * l * 0.25},${-1 * l * 0.15}

    a${h},${h} 1 0,1 ${-1 * l * 0.1},${-1 * c * 0.35}
    a${p},${p} 1 0,1 ${l * 0.1},${-1 * c * 0.65}
  H0 V0 Z`;
  if (t.look === "handDrawn") {
    const C = ct.svg(s), b = lt(t, {}), S = C.path(x, b);
    y = s.insert(() => S, ":first-child"), y.attr("class", "basic label-container").attr("style", te(m));
  } else
    y = s.insert("path", ":first-child").attr("class", "basic label-container").attr("style", i).attr("d", x);
  return n.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`), y.attr("transform", `translate(${-l / 2}, ${-c / 2})`), ft(t, y), t.calcIntersect = function(C, b) {
    return nt.rect(C, b);
  }, t.intersect = function(C) {
    return J.info("Cloud intersect", t, C), nt.rect(t, C);
  }, s;
}
d(Am, "cloud");
async function Mm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, halfPadding: a, label: n } = await yt(
    e,
    t,
    gt(t)
  ), l = o.width + 8 * a, c = o.height + 2 * a, h = 5, u = t.look === "neo" ? `
    M${-l / 2} ${c / 2 - h}
    v${-c + 2 * h}
    q0,-${h} ${h},-${h}
    h${l - 2 * h}
    q${h},0 ${h},${h}
    v${c - h}
    H${-l / 2}
    Z
  ` : `
    M${-l / 2} ${c / 2 - h}
    v${-c + 2 * h}
    q0,-${h} ${h},-${h}
    h${l - 2 * h}
    q${h},0 ${h},${h}
    v${c - 2 * h}
    q0,${h} ${-h},${h}
    h${-(l - 2 * h)}
    q${-h},0 ${-h},${-h}
    Z
  `;
  if (!t.domId)
    throw new Error(
      `defaultMindmapNode: node "${t.id}" is missing a domId — was render.ts domId prefixing skipped?`
    );
  const f = s.append("path").attr("id", t.domId).attr("class", "node-bkg node-" + t.type).attr("style", i).attr("d", u);
  return s.append("line").attr("class", "node-line-").attr("x1", -l / 2).attr("y1", c / 2).attr("x2", l / 2).attr("y2", c / 2), n.attr("transform", `translate(${-o.width / 2}, ${-o.height / 2})`), s.append(() => n.node()), ft(t, f), t.calcIntersect = function(p, m) {
    return nt.rect(p, m);
  }, t.intersect = function(p) {
    return nt.rect(t, p);
  }, s;
}
d(Mm, "defaultMindmapNode");
async function Em(e, t) {
  const r = {
    padding: t.padding ?? 0
  };
  return vh(e, t, r);
}
d(Em, "mindmapCircle");
var Ci = 36, Vr = 50, r_ = 100, i_ = 80, Ur = 6, Ti = 16, s_ = "bpmn", o_ = {
  start: { rings: 1, strokeWidth: 1.6 },
  intermediate: { rings: 2, strokeWidth: 1.4 },
  boundary: { rings: 2, strokeWidth: 1.4 },
  end: { rings: 1, strokeWidth: 3.4 }
}, ld;
async function $m() {
  return ld ??= import("./bpmnIcons-APHXDYXF-cmPCdhGR.js").then(({ bpmnIcons: e }) => {
    Ab(e.prefix) || nf([{ name: e.prefix, icons: e }]);
  }), ld;
}
d($m, "ensureBpmnIcons");
function Om(e) {
  const t = e.metadata?.dataDirection;
  return t === "input" || t === "output" ? t : void 0;
}
d(Om, "dataDirectionOf");
function Dm(e) {
  return e.metadata?.isCollection === !0;
}
d(Dm, "isCollectionData");
async function jo(e, t) {
  return await $m(), li(e, { height: t, width: t, fallbackPrefix: s_ });
}
d(jo, "glyphSvg");
var Es = /* @__PURE__ */ d((e, t, r) => {
  const i = (t.x ?? 0) - (t.left ?? 0), s = (t.y ?? 0) - (t.top ?? 0);
  e.attr(
    "transform",
    `translate(${-t.width / 2 - i},${r - t.height / 2 - s})`
  );
}, "positionLabelBelow"), Im = /* @__PURE__ */ d(async (e, t, r) => {
  if (!t)
    return;
  const i = e.append("g").attr("class", "bpmn-glyph");
  i.html(`<g>${await jo(t, r)}</g>`), i.attr("transform", `translate(${-r / 2}, ${-r / 2})`);
}, "appendGlyph"), $s = /* @__PURE__ */ d((e, t, r, i, s) => {
  s && (t.metadata = { ...t.metadata ?? {}, drawnExtent: s });
  const o = e.insert("rect", ":first-child").attr("class", "bpmn-bounds").attr("x", -r / 2).attr("y", -i / 2).attr("width", r).attr("height", i).attr("opacity", 0).attr("aria-hidden", "true");
  return ft(t, o), o;
}, "reserveBounds"), a_ = 8, Go = /* @__PURE__ */ d((e, t, r) => Math.min(Math.max(e, t), r), "clamp"), da = /* @__PURE__ */ d((e, t, r, i, s) => {
  const o = e.x ?? 0, a = e.y ?? 0, n = t / 2, l = r / 2, c = i.x - o, h = i.y - a, u = s ?? (Math.abs(c) * l > Math.abs(h) * n ? c >= 0 ? "right" : "left" : h >= 0 ? "bottom" : "top"), f = /* @__PURE__ */ d((p) => Math.max(0, p - Math.min(a_, p / 2)), "reach");
  return u === "left" || u === "right" ? {
    x: o + (u === "right" ? n : -n),
    y: Go(i.y, a - f(l), a + f(l))
  } : {
    x: Go(i.x, o - f(n), o + f(n)),
    y: a + (u === "bottom" ? l : -l)
  };
}, "faceProjectIntersect"), n_ = /* @__PURE__ */ d((e, t, r) => {
  const i = e.x ?? 0, s = e.y ?? 0, o = t / 2, a = r.x - i, n = r.y - s, l = o * 0.85;
  if (Math.abs(n) >= Math.abs(a)) {
    const h = Go(a, -l, l);
    return {
      x: i + h,
      y: s + Math.sign(n || 1) * Math.sqrt(o * o - h * h)
    };
  }
  const c = Go(n, -l, l);
  return { x: i + Math.sign(a || 1) * Math.sqrt(o * o - c * c), y: s + c };
}, "ringIntersect"), l_ = /* @__PURE__ */ d((e, t, r, i) => {
  const s = e.x ?? 0, o = e.y ?? 0, a = t / 2, n = r / 2, l = i.x - s, c = i.y - o;
  return Math.abs(l) * n > Math.abs(c) * a ? { x: s + Math.sign(l) * a, y: o } : { x: s, y: o + Math.sign(c || 1) * n };
}, "faceCentreIntersect");
async function Os(e, t, r) {
  const i = t, { labelStyles: s, nodeStyles: o } = ht(t);
  t.labelStyle = s;
  const { rings: a, strokeWidth: n } = o_[r], l = Ci / 2, { shapeSvg: c, bbox: h, label: u } = await yt(
    e,
    t,
    gt(t, `bpmn-event bpmn-event-${r}`)
  ), f = c.insert("g", ":first-child").attr("class", "bpmn-event-body");
  f.attr("style", o);
  for (let C = 0; C < a; C++)
    f.append("circle").attr("class", C === 0 ? "bpmn-event-ring" : "bpmn-event-ring bpmn-event-ring-inner").attr("r", l - C * 3).style("stroke-width", `${n}px`);
  await Im(f, i.icon, Ti);
  const p = h.height > 0 && !!t.label, m = p ? Ur + h.height : 0, y = Ci + 2 * m, x = Math.max(Ci, p ? h.width : 0);
  return p && Es(u, h, l + Ur + h.height / 2), $s(c, t, x, y, {
    width: Ci,
    height: Ci
  }), t.intersect = function(C) {
    return n_(t, Ci, C);
  }, c;
}
d(Os, "renderBpmnEvent");
async function Pm(e, t) {
  return Os(e, t, "start");
}
d(Pm, "bpmnStart");
async function Rm(e, t) {
  return Os(e, t, "intermediate");
}
d(Rm, "bpmnIntermediate");
async function Nm(e, t) {
  return Os(e, t, "boundary");
}
d(Nm, "bpmnBoundary");
async function qm(e, t) {
  return Os(e, t, "end");
}
d(qm, "bpmnEnd");
async function Wm(e, t) {
  const r = t, { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const o = Vr / 2, { shapeSvg: a, bbox: n, label: l } = await yt(
    e,
    t,
    gt(t, "bpmn-gateway")
  ), c = a.insert("g", ":first-child").attr("class", "bpmn-gateway-body");
  c.append("polygon").attr("class", "bpmn-gateway-diamond").attr("points", `0,${-o} ${o},0 0,${o} ${-o},0`).attr("style", s), await Im(c, r.icon, Ti + 2);
  const h = n.height > 0 && !!t.label, u = h ? Ur + n.height : 0, f = Vr + 2 * u, p = Math.max(Vr, h ? n.width : 0);
  return h && Es(l, n, o + Ur + n.height / 2), $s(a, t, p, f, {
    width: Vr,
    height: Vr
  }), t.intersect = function(m) {
    return l_(t, Vr, Vr, m);
  }, a;
}
d(Wm, "bpmnGateway");
async function zm(e, t) {
  const r = t, { labelStyles: i, nodeStyles: s } = ht(t);
  t.labelStyle = i;
  const { shapeSvg: o, bbox: a, label: n } = await yt(
    e,
    t,
    gt(t, "bpmn-activity")
  ), l = r.markers ?? [], c = r.icon, h = c ? Ti + 6 : 10, u = l.length > 0 ? Ti + 4 : 10, f = Math.max(r_, a.width + 16), p = Math.max(i_, a.height + h + u), m = o.insert("g", ":first-child").attr("class", "bpmn-activity-body");
  if (m.append("rect").attr("class", "bpmn-activity-rect").attr("x", -f / 2).attr("y", -p / 2).attr("width", f).attr("height", p).attr("rx", 10).attr("ry", 10).attr("style", s), c) {
    const y = m.append("g").attr("class", "bpmn-activity-icon");
    y.html(`<g>${await jo(c, Ti)}</g>`), y.attr("transform", `translate(${-f / 2 + 6}, ${-p / 2 + 6})`);
  }
  if (l.length > 0) {
    const y = m.append("g").attr("class", "bpmn-activity-markers"), x = Ti - 2, C = l.length * x;
    for (const [b, S] of l.entries()) {
      const _ = y.append("g");
      _.html(`<g>${await jo(S, x)}</g>`), _.attr("transform", `translate(${-C / 2 + b * x}, 0)`);
    }
    y.attr("transform", `translate(0, ${p / 2 - x - 3})`);
  }
  if (a.height > 0) {
    const y = -p / 2 + h, x = p / 2 - u;
    Es(n, a, (y + x) / 2);
  }
  return ft(t, m), t.intersect = function(y) {
    return da(t, f, p, y);
  }, o;
}
d(zm, "bpmnActivity");
var Zi = 36, bi = 50, eo = 10;
async function Hm(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(
    e,
    t,
    gt(t, "bpmn-data-object")
  ), n = s.insert("g", ":first-child").attr("class", "bpmn-data-body"), l = -Zi / 2, c = -bi / 2, h = Zi / 2, u = bi / 2;
  n.append("path").attr("class", "bpmn-data-page").attr("d", `M${l},${c} H${h - eo} L${h},${c + eo} V${u} H${l} Z`).attr("style", i), n.append("path").attr("class", "bpmn-data-fold").attr("d", `M${h - eo},${c} V${c + eo} H${h}`);
  const f = Om(t);
  f && n.append("path").attr("class", `bpmn-data-arrow bpmn-data-arrow-${f}`).attr("d", `M${l + 4},${c + 9} h7 v-3 l5,4.5 -5,4.5 v-3 h-7 Z`), Dm(t) && n.append("path").attr("class", "bpmn-data-collection").attr("d", `M-4,${u - 11} v9 M0,${u - 11} v9 M4,${u - 11} v9`);
  const p = o.height > 0 && !!t.label, m = p ? Ur + o.height : 0, y = bi + 2 * m, x = Math.max(Zi, p ? o.width : 0);
  return p && Es(a, o, bi / 2 + Ur + o.height / 2), $s(s, t, x, y, {
    width: Zi,
    height: bi
  }), t.intersect = function(C) {
    return da(t, Zi, bi, C);
  }, s;
}
d(Hm, "bpmnDataObject");
var Qe = 50;
async function Ym(e, t) {
  const { labelStyles: r, nodeStyles: i } = ht(t);
  t.labelStyle = r;
  const { shapeSvg: s, bbox: o, label: a } = await yt(
    e,
    t,
    gt(t, "bpmn-data-store")
  ), n = s.insert("g", ":first-child").attr("class", "bpmn-data-body"), l = Qe / 2, c = 6;
  n.append("path").attr("class", "bpmn-store-body").attr(
    "d",
    `M${-l},${-l + c} a${l},${c} 0 0 1 ${Qe},0 V${l - c} a${l},${c} 0 0 1 ${-Qe},0 Z`
  ).attr("style", i);
  for (const m of [0, 5, 10])
    n.append("path").attr("class", "bpmn-store-rings").attr("d", `M${-l},${-l + c + m} a${l},${c} 0 0 0 ${Qe},0`);
  const h = o.height > 0 && !!t.label, u = h ? Ur + o.height : 0, f = Qe + 2 * u, p = Math.max(Qe, h ? o.width : 0);
  return h && Es(a, o, l + Ur + o.height / 2), $s(s, t, p, f, {
    width: Qe,
    height: Qe
  }), t.intersect = function(m) {
    return da(t, Qe, Qe, m);
  }, s;
}
d(Ym, "bpmnDataStore");
async function Um(e, t) {
  const { labelStyles: r } = ht(t);
  t.labelStyle = r, t.wrappingWidth = 160;
  const { shapeSvg: i, bbox: s, label: o } = await yt(
    e,
    t,
    gt(t, "bpmn-annotation")
  ), a = 8, n = Math.max(28, s.height + a * 2), l = s.width + a * 2 + 6, c = t.metadata?.attachFace === "right" ? "right" : "left";
  i.insert("g", ":first-child").attr("class", "bpmn-annotation-body").append("path").attr("class", "bpmn-annotation-bracket").attr(
    "d",
    c === "right" ? `M${l / 2 - 6},${-n / 2} h6 V${n / 2} h-6` : `M${-l / 2 + 6},${-n / 2} h-6 V${n / 2} h6`
  );
  const u = c === "right" ? -l / 2 + a : -l / 2 + a + 6;
  return o.attr(
    "transform",
    `translate(${u - (s.x ?? 0) + (s.left ?? 0)},${-s.height / 2 - ((s.y ?? 0) - (s.top ?? 0))})`
  ), $s(i, t, l, n), t.intersect = function(f) {
    return da(t, l, n, f, c);
  }, i;
}
d(Um, "bpmnAnnotation");
var h_ = [
  {
    semanticName: "Process",
    name: "Rectangle",
    shortName: "rect",
    description: "Standard process shape",
    aliases: ["proc", "process", "rectangle"],
    internalAliases: ["squareRect"],
    handler: hm
  },
  {
    semanticName: "Event",
    name: "Rounded Rectangle",
    shortName: "rounded",
    description: "Represents an event",
    aliases: ["event"],
    internalAliases: ["roundedRect"],
    handler: am
  },
  {
    semanticName: "Terminal Point",
    name: "Stadium",
    shortName: "stadium",
    description: "Terminal point",
    aliases: ["terminal", "pill"],
    handler: cm
  },
  {
    semanticName: "Subprocess",
    name: "Framed Rectangle",
    shortName: "fr-rect",
    description: "Subprocess",
    aliases: ["subprocess", "subproc", "framed-rectangle", "subroutine"],
    handler: pm
  },
  {
    semanticName: "Database",
    name: "Cylinder",
    shortName: "cyl",
    description: "Database storage",
    aliases: ["db", "database", "cylinder"],
    handler: Tg
  },
  {
    semanticName: "Data Store",
    name: "Data Store",
    shortName: "datastore",
    description: "Data flow diagram data store",
    aliases: ["data-store"],
    handler: _g
  },
  {
    semanticName: "Folder",
    name: "Folder",
    shortName: "folder",
    description: "Folder or directory",
    aliases: ["directory"],
    handler: Mg
  },
  {
    semanticName: "Bucket",
    name: "Bucket",
    shortName: "bucket",
    description: "Object storage bucket",
    handler: lg
  },
  {
    semanticName: "Console",
    name: "Console (terminal window)",
    shortName: "console",
    description: "Terminal or console window",
    handler: mg
  },
  {
    semanticName: "Browser",
    name: "Browser",
    shortName: "browser",
    description: "Browser window",
    handler: dg
  },
  {
    semanticName: "Person",
    name: "Person",
    shortName: "person",
    description: "Person (circular head above a rounded body)",
    handler: Sg
  },
  {
    semanticName: "Start",
    name: "Circle",
    shortName: "circle",
    description: "Starting point",
    aliases: ["circ"],
    handler: vh
  },
  {
    semanticName: "Bang",
    name: "Bang",
    shortName: "bang",
    description: "Bang",
    aliases: ["bang"],
    handler: Fm
  },
  {
    semanticName: "Cloud",
    name: "Cloud",
    shortName: "cloud",
    description: "cloud",
    aliases: ["cloud"],
    handler: Am
  },
  {
    semanticName: "Decision",
    name: "Diamond",
    shortName: "diam",
    description: "Decision-making step",
    aliases: ["decision", "diamond", "question"],
    handler: im
  },
  {
    semanticName: "Prepare Conditional",
    name: "Hexagon",
    shortName: "hex",
    description: "Preparation or condition step",
    aliases: ["hexagon", "prepare"],
    handler: Og
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Right",
    shortName: "lean-r",
    description: "Represents input or output",
    aliases: ["lean-right", "in-out"],
    internalAliases: ["lean_right"],
    handler: Yg
  },
  {
    semanticName: "Data Input/Output",
    name: "Lean Left",
    shortName: "lean-l",
    description: "Represents output or input",
    aliases: ["lean-left", "out-in"],
    internalAliases: ["lean_left"],
    handler: Hg
  },
  {
    semanticName: "Priority Action",
    name: "Trapezoid Base Bottom",
    shortName: "trap-b",
    description: "Priority action",
    aliases: ["priority", "trapezoid-bottom", "trapezoid"],
    handler: Cm
  },
  {
    semanticName: "Manual Operation",
    name: "Trapezoid Base Top",
    shortName: "trap-t",
    description: "Represents a manual task",
    aliases: ["manual", "trapezoid-top", "inv-trapezoid"],
    internalAliases: ["inv_trapezoid"],
    handler: Wg
  },
  {
    semanticName: "Stop",
    name: "Double Circle",
    shortName: "dbl-circ",
    description: "Represents a stop point",
    aliases: ["double-circle"],
    internalAliases: ["doublecircle"],
    handler: vg
  },
  {
    semanticName: "Text Block",
    name: "Text Block",
    shortName: "text",
    description: "Text block",
    handler: ym
  },
  {
    semanticName: "Card",
    name: "Notched Rectangle",
    shortName: "notch-rect",
    description: "Represents a card",
    aliases: ["card", "notched-rectangle"],
    handler: fg
  },
  {
    semanticName: "Lined/Shaded Process",
    name: "Lined Rectangle",
    shortName: "lin-rect",
    description: "Lined process shape",
    aliases: ["lined-rectangle", "lined-process", "lin-proc", "shaded-process"],
    handler: nm
  },
  {
    semanticName: "Start",
    name: "Small Circle",
    shortName: "sm-circ",
    description: "Small starting point",
    aliases: ["start", "small-circle"],
    internalAliases: ["stateStart"],
    handler: fm
  },
  {
    semanticName: "Stop",
    name: "Framed Circle",
    shortName: "fr-circ",
    description: "Stop point",
    aliases: ["stop", "framed-circle"],
    internalAliases: ["stateEnd"],
    handler: dm
  },
  {
    semanticName: "Fork/Join",
    name: "Filled Rectangle",
    shortName: "fork",
    description: "Fork or join in process flow",
    aliases: ["join"],
    internalAliases: ["forkJoin"],
    handler: Eg
  },
  {
    semanticName: "Collate",
    name: "Hourglass",
    shortName: "hourglass",
    description: "Represents a collate operation",
    aliases: ["hourglass", "collate"],
    handler: Dg
  },
  {
    semanticName: "Comment",
    name: "Curly Brace",
    shortName: "brace",
    description: "Adds a comment",
    aliases: ["comment", "brace-l"],
    handler: Cg
  },
  {
    semanticName: "Comment Right",
    name: "Curly Brace",
    shortName: "brace-r",
    description: "Adds a comment",
    handler: bg
  },
  {
    semanticName: "Comment with braces on both sides",
    name: "Curly Braces",
    shortName: "braces",
    description: "Adds a comment",
    handler: kg
  },
  {
    semanticName: "Com Link",
    name: "Lightning Bolt",
    shortName: "bolt",
    description: "Communication link",
    aliases: ["com-link", "lightning-bolt"],
    handler: Ug
  },
  {
    semanticName: "Document",
    name: "Document",
    shortName: "doc",
    description: "Represents a document",
    aliases: ["doc", "document"],
    handler: wm
  },
  {
    semanticName: "Delay",
    name: "Half-Rounded Rectangle",
    shortName: "delay",
    description: "Represents a delay",
    aliases: ["half-rounded-rectangle"],
    handler: $g
  },
  {
    semanticName: "Direct Access Storage",
    name: "Horizontal Cylinder",
    shortName: "h-cyl",
    description: "Direct access storage",
    aliases: ["das", "horizontal-cylinder"],
    handler: xm
  },
  {
    semanticName: "Disk Storage",
    name: "Lined Cylinder",
    shortName: "lin-cyl",
    description: "Disk storage",
    aliases: ["disk", "lined-cylinder"],
    handler: jg
  },
  {
    semanticName: "Display",
    name: "Curved Trapezoid",
    shortName: "curv-trap",
    description: "Represents a display",
    aliases: ["curved-trapezoid", "display"],
    handler: wg
  },
  {
    semanticName: "Divided Process",
    name: "Divided Rectangle",
    shortName: "div-rect",
    description: "Divided process shape",
    aliases: ["div-proc", "divided-rectangle", "divided-process"],
    handler: Bg
  },
  {
    semanticName: "Extract",
    name: "Triangle",
    shortName: "tri",
    description: "Extraction process",
    aliases: ["extract", "triangle"],
    handler: km
  },
  {
    semanticName: "Internal Storage",
    name: "Window Pane",
    shortName: "win-pane",
    description: "Internal storage",
    aliases: ["internal-storage", "window-pane"],
    handler: Tm
  },
  {
    semanticName: "Junction",
    name: "Filled Circle",
    shortName: "f-circ",
    description: "Junction point",
    aliases: ["junction", "filled-circle"],
    handler: Fg
  },
  {
    semanticName: "Loop Limit",
    name: "Trapezoidal Pentagon",
    shortName: "notch-pent",
    description: "Loop limit step",
    aliases: ["loop-limit", "notched-pentagon"],
    handler: bm
  },
  {
    semanticName: "Manual File",
    name: "Flipped Triangle",
    shortName: "flip-tri",
    description: "Manual file operation",
    aliases: ["manual-file", "flipped-triangle"],
    handler: Ag
  },
  {
    semanticName: "Manual Input",
    name: "Sloped Rectangle",
    shortName: "sl-rect",
    description: "Manual input step",
    aliases: ["manual-input", "sloped-rectangle"],
    handler: lm
  },
  {
    semanticName: "Multi-Document",
    name: "Stacked Document",
    shortName: "docs",
    description: "Multiple documents",
    aliases: ["documents", "st-doc", "stacked-document"],
    handler: em
  },
  {
    semanticName: "Multi-Process",
    name: "Stacked Rectangle",
    shortName: "st-rect",
    description: "Multiple processes",
    aliases: ["procs", "processes", "stacked-rectangle"],
    handler: tm
  },
  {
    semanticName: "Stored Data",
    name: "Bow Tie Rectangle",
    shortName: "bow-rect",
    description: "Stored data",
    aliases: ["stored-data", "bow-tie-rectangle"],
    handler: ng
  },
  {
    semanticName: "Summary",
    name: "Crossed Circle",
    shortName: "cross-circ",
    description: "Summary",
    aliases: ["summary", "crossed-circle"],
    handler: xg
  },
  {
    semanticName: "Tagged Document",
    name: "Tagged Document",
    shortName: "tag-doc",
    description: "Tagged document",
    aliases: ["tag-doc", "tagged-document"],
    handler: mm
  },
  {
    semanticName: "Tagged Process",
    name: "Tagged Rectangle",
    shortName: "tag-rect",
    description: "Tagged process",
    aliases: ["tagged-rectangle", "tag-proc", "tagged-process"],
    handler: gm
  },
  {
    semanticName: "Paper Tape",
    name: "Flag",
    shortName: "flag",
    description: "Paper tape",
    aliases: ["paper-tape"],
    handler: Sm
  },
  {
    semanticName: "Odd",
    name: "Odd",
    shortName: "odd",
    description: "Odd shape",
    internalAliases: ["rect_left_inv_arrow"],
    handler: sm
  },
  {
    semanticName: "Lined Document",
    name: "Lined Document",
    shortName: "lin-doc",
    description: "Lined document",
    aliases: ["lined-document"],
    handler: Gg
  }
], c_ = /* @__PURE__ */ d(() => {
  const t = [
    ...Object.entries({
      // States
      state: um,
      choice: pg,
      note: rm,
      // Rectangles
      composite: gg,
      rectWithTitle: om,
      labelRect: zg,
      block_arrow: ug,
      // Collapsed subgraph (flowchart `@{ view: collapsed }`)
      collapsedGroup: cg,
      // Icons
      iconSquare: Ng,
      iconCircle: Pg,
      icon: Ig,
      iconRounded: Rg,
      imageSquare: qg,
      anchor: og,
      // Kanban diagram
      kanbanItem: Lm,
      //Mindmap diagram
      mindmapCircle: Em,
      defaultMindmapNode: Mm,
      // class diagram
      classBox: Bm,
      // er diagram
      erBox: Fh,
      // Requirement diagram
      requirementBox: vm,
      // Usecase diagram
      usecaseActor: Xg,
      usecaseActorHollow: Zg,
      usecaseActorAwesome: Vg,
      usecaseActorIcon: Kg,
      usecaseBusiness: Qg,
      usecaseEllipse: Lg,
      usecaseJsonTable: Jg,
      "bpmn-start": Pm,
      "bpmn-intermediate": Rm,
      "bpmn-boundary": Nm,
      "bpmn-end": qm,
      "bpmn-gateway": Wm,
      "bpmn-activity": zm,
      "bpmn-data": Hm,
      "bpmn-data-store": Ym,
      "bpmn-annotation": Um
    }),
    ...h_.flatMap((r) => [
      r.shortName,
      ..."aliases" in r ? r.aliases : [],
      ..."internalAliases" in r ? r.internalAliases : []
    ].map((s) => [s, r.handler]))
  ];
  return Object.fromEntries(t);
}, "generateShapeMap"), jm = c_();
function u_(e) {
  return e in jm;
}
d(u_, "isValidShape");
var Ds = /* @__PURE__ */ d(({
  flowchart: e
}) => {
  const t = e?.subGraphTitleMargin?.top ?? 0, r = e?.subGraphTitleMargin?.bottom ?? 0, i = t + r;
  return {
    subGraphTitleTopMargin: t,
    subGraphTitleBottomMargin: r,
    subGraphTitleTotalMargin: i
  };
}, "getSubGraphTitleMargins"), fa = /* @__PURE__ */ new Map();
async function Gm(e, t, r) {
  let i, s;
  t.shape === "rect" && (t.rx && t.ry ? t.shape = "roundedRect" : t.shape = "squareRect");
  const o = t.shape ? jm[t.shape] : void 0;
  if (!o)
    throw new Error(`No such shape: ${t.shape}. Please check your syntax.`);
  if (t.link) {
    let a;
    r.config.securityLevel === "sandbox" ? a = "_top" : t.linkTarget && (a = t.linkTarget || "_blank"), i = e.insert("svg:a").attr("xlink:href", t.link).attr("target", a ?? null), s = await o(i, t, r);
  } else
    s = await o(e, t, r), i = s;
  return i.attr("data-look", te(t.look)), t.tooltip && s.attr("title", t.tooltip), fa.set(t.id, i), t.haveCallback && i.attr("class", i.attr("class") + " clickable"), i;
}
d(Gm, "insertNode");
var bM = /* @__PURE__ */ d((e, t) => {
  fa.set(t.id, e);
}, "setNodeElem"), kM = /* @__PURE__ */ d(() => {
  fa.clear();
}, "clear"), wM = /* @__PURE__ */ d((e) => {
  const t = fa.get(e.id);
  J.trace(
    "Transforming node",
    e.diff,
    e,
    "translate(" + (e.x - e.width / 2 - 5) + ", " + e.width / 2 + ")"
  );
  const r = 8, i = e.diff || 0;
  return e.clusterNode ? t.attr(
    "transform",
    "translate(" + (e.x + i - e.width / 2) + ", " + (e.y - e.height / 2 - r) + ")"
  ) : t.attr("transform", "translate(" + e.x + ", " + e.y + ")"), i;
}, "positionNode"), Xm = /* @__PURE__ */ d(async (e, t, { variant: r = "swimlane" } = {}) => {
  const i = r === "pool", s = i ? "pool swimlane" : "swimlane", o = i ? "pool-label swimlane-label" : "swimlane-label", a = i ? "pool-title swimlane-title" : "swimlane-title", n = i ? "pool-body swimlane-body" : "swimlane-body", l = Ot(), { theme: c, themeVariables: h, handDrawnSeed: u } = l, { clusterBkg: f, clusterBorder: p, borderColorArray: m } = h, y = p, { labelStyles: x, nodeStyles: C, borderStyles: b, backgroundStyles: S } = ht(t), _ = e.insert("g").attr("class", "cluster " + s + " " + (t.cssClasses || "")).attr("id", t.domId ?? t.id).attr("data-id", t.id).attr("data-et", "cluster").attr("data-look", t.look);
  Oe(_, t.colorIndex, c, m);
  const B = ar(l.flowchart.htmlLabels), F = t.direction === "LR", A = _.insert("g").attr("class", "cluster-label " + o), L = await ve(A, t.label, {
    style: t.labelStyle,
    useHtmlLabels: B,
    isNode: !0,
    width: t.width
  });
  let H = L.getBBox();
  if (B) {
    const ut = L.children[0], xt = $t(L);
    H = ut.getBoundingClientRect(), xt.attr("width", H.width), xt.attr("height", H.height);
  }
  const N = t.padding ?? 0, O = t.width <= H.width + N ? H.width + N : t.width;
  t.width <= H.width + N ? t.diff = (O - t.width) / 2 - N : t.diff = -N;
  const Q = t.height, R = t.y - Q / 2, E = t.y + Q / 2, I = t.x - O / 2, v = t.swimlaneContentTop !== void 0 ? t.swimlaneContentTop : R + Q / 3, W = F ? 4 : 0, q = H.height + 2 * W;
  let rt, V;
  if (F) {
    const ut = Math.max(q, H.height + 2 * W), xt = I + ut, wt = Math.max(0, O - ut);
    if (t.look === "handDrawn") {
      const pt = ct.svg(_), dt = lt(t, {
        roughness: 0.7,
        fill: f,
        stroke: y,
        // fillWeight: 3,
        seed: u
      }), _t = lt(t, {
        roughness: 0.7,
        fill: "none",
        stroke: y,
        seed: u
      }), It = pt.rectangle(I, R, ut, Q, dt);
      rt = _.insert(() => It, ":first-child").attr("class", a);
      const St = pt.rectangle(xt, R, wt, Q, _t);
      V = _.insert(() => St, ":first-child").attr("class", n), rt.select("path:nth-child(2)").attr("style", b.join(";")), rt.select("path").attr("style", S.join(";").replace("fill", "stroke"));
    } else
      rt = _.insert("rect", ":first-child"), V = _.insert("rect", ":first-child"), rt.attr("class", a).attr("style", C).attr("x", I).attr("y", R).attr("width", ut).attr("height", Q).attr("fill", f).attr("stroke", y), V.attr("class", n).attr("style", C).attr("x", xt).attr("y", R).attr("width", wt).attr("height", Q).attr("fill", "none").attr("stroke", y);
    const Bt = I + ut / 2, Ct = t.y;
    A.attr(
      "transform",
      `translate(${Bt}, ${Ct}) rotate(-90) translate(${-H.width / 2}, ${-H.height / 2})`
    );
  } else {
    const ut = Math.max(0, v - R), xt = Math.min(q, ut), wt = R + xt, Bt = Math.max(0, E - wt), Ct = t.x - O / 2;
    if (t.look === "handDrawn") {
      const _t = ct.svg(_), It = lt(t, {
        roughness: 0.7,
        fill: f,
        stroke: y,
        fillWeight: 3,
        seed: u
      }), St = lt(t, {
        roughness: 0.7,
        fill: "none",
        stroke: y,
        seed: u
      }), Pt = _t.rectangle(Ct, R, O, xt, It);
      rt = _.insert(() => Pt, ":first-child").attr("class", a);
      const Xt = _t.rectangle(Ct, wt, O, Bt, St);
      V = _.insert(() => Xt, ":first-child").attr("class", n), rt.select("path:nth-child(2)").attr("style", b.join(";")), rt.select("path").attr("style", S.join(";").replace("fill", "stroke"));
    } else
      rt = _.insert("rect", ":first-child"), V = _.insert("rect", ":first-child"), rt.attr("class", a).attr("style", C).attr("x", Ct).attr("y", R).attr("width", O).attr("height", xt).attr("fill", f).attr("stroke", y), V.attr("class", n).attr("style", C).attr("x", Ct).attr("y", wt).attr("width", O).attr("height", Bt).attr("fill", "none").attr("stroke", y);
    const pt = t.x - H.width / 2, dt = R + (xt - H.height) / 2;
    A.attr("transform", `translate(${pt}, ${dt})`);
  }
  if (J.trace("Swimlane data ", t, JSON.stringify(t)), x) {
    const ut = A.select("span");
    ut && ut.attr("style", x);
  }
  return t.offsetX = 0, t.width = O, t.height = Q, t.offsetY = H.height - N / 2, t.intersect = function(ut) {
    return Br(t, ut);
  }, { cluster: _, labelBBox: H };
}, "swimlane"), Vm = /* @__PURE__ */ d(async (e, t) => {
  J.info("Creating subgraph rect for ", t.id, t);
  const r = Ot(), { theme: i, themeVariables: s, handDrawnSeed: o } = r, { clusterBkg: a, clusterBorder: n, borderColorArray: l } = s, { labelStyles: c, nodeStyles: h, borderStyles: u, backgroundStyles: f } = ht(t), p = e.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.domId).attr("data-look", t.look);
  Oe(p, t.colorIndex, i, l);
  const m = le(r), y = p.insert("g").attr("class", "cluster-label ");
  let x;
  t.labelType === "markdown" ? x = await ve(y, t.label, {
    style: t.labelStyle,
    useHtmlLabels: m,
    isNode: !0,
    width: t.width
  }) : x = await xr(y, t.label, t.labelStyle || "", !1, !0);
  let C = x.getBBox();
  if (le(r)) {
    const H = x.children[0], N = $t(x);
    C = H.getBoundingClientRect(), N.attr("width", C.width), N.attr("height", C.height);
  }
  const b = t.width <= C.width + t.padding ? C.width + t.padding : t.width;
  t.width <= C.width + t.padding ? t.diff = (b - t.width) / 2 - t.padding : t.diff = -t.padding;
  const S = t.height, _ = t.x - b / 2, B = t.y - S / 2;
  J.trace("Data ", t, JSON.stringify(t));
  let F;
  if (t.look === "handDrawn") {
    const H = ct.svg(p), N = lt(t, {
      roughness: 0.7,
      fill: a,
      // fill: 'red',
      stroke: n,
      fillWeight: 3,
      seed: o
    }), O = H.path(Le(_, B, b, S, 0), N);
    F = p.insert(() => (J.debug("Rough node insert CXC", O), O), ":first-child"), F.select("path:nth-child(2)").attr("style", u.join(";")), F.select("path").attr("style", f.join(";").replace("fill", "stroke"));
  } else
    F = p.insert("rect", ":first-child"), F.attr("style", h).attr("rx", t.rx).attr("ry", t.ry).attr("x", _).attr("y", B).attr("width", b).attr("height", S);
  const { subGraphTitleTopMargin: A } = Ds(r);
  if (y.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${t.x - C.width / 2}, ${t.y - t.height / 2 + A})`
  ), c) {
    const H = y.select("span");
    H && H.attr("style", c);
  }
  const L = F.node().getBBox();
  return t.offsetX = 0, t.width = L.width, t.height = L.height, t.offsetY = C.height - t.padding / 2, t.intersect = function(H) {
    return Br(t, H);
  }, { cluster: p, labelBBox: C };
}, "rect"), d_ = /* @__PURE__ */ d((e, t) => {
  const r = e.insert("g").attr("class", "note-cluster").attr("id", t.domId), i = r.insert("rect", ":first-child"), s = 0 * t.padding, o = s / 2;
  i.attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - t.width / 2 - o).attr("y", t.y - t.height / 2 - o).attr("width", t.width + s).attr("height", t.height + s).attr("fill", "none");
  const a = i.node().getBBox();
  return t.width = a.width, t.height = a.height, t.intersect = function(n) {
    return Br(t, n);
  }, { cluster: r, labelBBox: { width: 0, height: 0 } };
}, "noteGroup"), f_ = /* @__PURE__ */ d(async (e, t) => {
  const r = Ot(), { theme: i, themeVariables: s, handDrawnSeed: o } = r, {
    altBackground: a,
    borderColorArray: n,
    compositeBackground: l,
    compositeTitleBackground: c,
    nodeBorder: h
  } = s, u = e.insert("g").attr("class", t.cssClasses).attr("id", t.domId).attr("data-id", t.id).attr("data-look", t.look);
  Oe(u, t.colorIndex, i, n);
  const f = u.insert("g", ":first-child"), p = u.insert("g").attr("class", "cluster-label");
  let m = u.append("rect");
  const y = await xr(p, t.label, t.labelStyle, void 0, !0);
  let x = y.getBBox();
  if (le(r)) {
    const O = y.children[0], Q = $t(y);
    x = O.getBoundingClientRect(), Q.attr("width", x.width), Q.attr("height", x.height);
  }
  const C = 0 * t.padding, b = C / 2, S = (t.width <= x.width + t.padding ? x.width + t.padding : t.width) + C;
  t.width <= x.width + t.padding ? t.diff = (S - t.width) / 2 - t.padding : t.diff = -t.padding;
  const _ = t.height + C, B = t.height + C - x.height - 6, F = t.x - S / 2, A = t.y - _ / 2;
  t.width = S;
  const L = t.y - t.height / 2 - b + x.height + 2;
  let H;
  if (t.look === "handDrawn") {
    const O = t.cssClasses.includes("statediagram-cluster-alt"), Q = ct.svg(u), R = t.rx || t.ry ? Q.path(Le(F, A, S, _, 10), {
      roughness: 0.7,
      fill: c,
      fillStyle: "solid",
      stroke: h,
      seed: o
    }) : Q.rectangle(F, A, S, _, { seed: o });
    H = u.insert(() => R, ":first-child");
    const E = Q.rectangle(F, L, S, B, {
      fill: O ? a : l,
      fillStyle: O ? "hachure" : "solid",
      stroke: h,
      seed: o
    });
    H = u.insert(() => R, ":first-child"), m = u.insert(() => E), H.attr("class", "outer"), m.attr("class", "inner");
  } else
    H = f.insert("rect", ":first-child"), H.attr("class", "outer").attr("x", F).attr("y", A).attr("width", S).attr("height", _).attr("data-look", t.look), m.attr("class", "inner").attr("x", F).attr("y", L).attr("width", S).attr("height", B);
  p.attr(
    "transform",
    `translate(${t.x - x.width / 2}, ${A + 1 - (le(r) ? 0 : 3)})`
  );
  const N = H.node().getBBox();
  return t.height = N.height, t.offsetX = 0, t.offsetY = x.height - t.padding / 2, t.labelBBox = x, t.intersect = function(O) {
    return Br(t, O);
  }, { cluster: u, labelBBox: x };
}, "roundedWithTitle"), p_ = /* @__PURE__ */ d(async (e, t) => {
  J.info("Creating subgraph rect for ", t.id, t);
  const r = Ot(), { themeVariables: i, handDrawnSeed: s } = r, { clusterBkg: o, clusterBorder: a } = i, { labelStyles: n, nodeStyles: l, borderStyles: c, backgroundStyles: h } = ht(t), u = e.insert("g").attr("class", "cluster " + t.cssClasses).attr("id", t.domId).attr("data-look", t.look), f = le(r), p = u.insert("g").attr("class", "cluster-label "), m = await ve(p, t.label, {
    style: t.labelStyle,
    useHtmlLabels: f,
    isNode: !0,
    width: t.width
  });
  let y = m.getBBox();
  if (le(r)) {
    const A = m.children[0], L = $t(m);
    y = A.getBoundingClientRect(), L.attr("width", y.width), L.attr("height", y.height);
  }
  const x = t.width <= y.width + t.padding ? y.width + t.padding : t.width;
  t.width <= y.width + t.padding ? t.diff = (x - t.width) / 2 - t.padding : t.diff = -t.padding;
  const C = t.height, b = t.x - x / 2, S = t.y - C / 2;
  J.trace("Data ", t, JSON.stringify(t));
  let _;
  if (t.look === "handDrawn") {
    const A = ct.svg(u), L = lt(t, {
      roughness: 0.7,
      fill: o,
      // fill: 'red',
      stroke: a,
      fillWeight: 4,
      seed: s
    }), H = A.path(Le(b, S, x, C, t.rx), L);
    _ = u.insert(() => (J.debug("Rough node insert CXC", H), H), ":first-child"), _.select("path:nth-child(2)").attr("style", c.join(";")), _.select("path").attr("style", h.join(";").replace("fill", "stroke"));
  } else
    _ = u.insert("rect", ":first-child"), _.attr("style", l).attr("rx", t.rx).attr("ry", t.ry).attr("x", b).attr("y", S).attr("width", x).attr("height", C);
  const { subGraphTitleTopMargin: B } = Ds(r);
  if (p.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${t.x - y.width / 2}, ${t.y - t.height / 2 + B})`
  ), n) {
    const A = p.select("span");
    A && A.attr("style", n);
  }
  const F = _.node().getBBox();
  return t.offsetX = 0, t.width = F.width, t.height = F.height, t.offsetY = y.height - t.padding / 2, t.intersect = function(A) {
    return Br(t, A);
  }, { cluster: u, labelBBox: y };
}, "kanbanSection"), g_ = /* @__PURE__ */ d((e, t) => {
  const r = Ot(), { theme: i, themeVariables: s, handDrawnSeed: o } = r, { altBackground: a, nodeBorder: n, borderColorArray: l } = s, c = e.insert("g").attr("class", t.cssClasses).attr("id", t.domId).attr("data-look", t.look);
  Oe(c, t.colorIndex, i, l);
  const h = c.insert("g", ":first-child"), u = 0 * t.padding, f = t.width + u;
  t.diff = -t.padding;
  const p = t.height + u, m = t.x - f / 2, y = t.y - p / 2;
  t.width = f;
  let x;
  if (t.look === "handDrawn") {
    const S = ct.svg(c).rectangle(m, y, f, p, {
      // The theme's own value, matching what `rect.divider` gets from CSS under the other
      // looks -- and the same fallback. It was hardcoded `lightgrey`, which no dark theme
      // ever asked for; that stayed tolerable only while the fill was sparse hatching, and
      // turns into a bright block on a dark canvas once it is solid.
      fill: a ?? "#efefef",
      // Solid rather than roughjs's default hachure. A hachure fill is drawn as *stroked*
      // lines, so both of the group's paths come out with `fill="none"` and a stylesheet
      // cannot tell the fill from the outline -- which is the same trap documented on
      // `roundedWithTitle`'s inner shape in `state/styles.js`. Solid splits them the way
      // the composite's outer shape already does, so a region can take the palette's tint
      // and border without its hatching being repainted. `roundedWithTitle` fills solid
      // too, except for its deliberately hatched alt variant.
      fillStyle: "solid",
      roughness: 0.5,
      strokeLineDash: [5],
      stroke: n,
      seed: o
    });
    x = c.insert(() => S, ":first-child").attr("class", "divider");
  } else {
    x = h.insert("rect", ":first-child");
    let b = "outer";
    t.look, b = "divider", x.attr("class", b).attr("x", m).attr("y", y).attr("width", f).attr("height", p).attr("data-look", t.look);
  }
  const C = x.node().getBBox();
  return t.height = C.height, t.offsetX = 0, t.offsetY = 0, t.intersect = function(b) {
    return Br(t, b);
  }, { cluster: c, labelBBox: {} };
}, "divider"), m_ = /* @__PURE__ */ d(async (e, t, r) => {
  J.info(`Creating ${r.cssClass} for `, t.id, t);
  const i = Ot(), { theme: s, themeVariables: o, handDrawnSeed: a } = i, { borderColorArray: n } = o, { labelStyles: l, borderStyles: c } = ht(t), h = e.insert("g").attr("class", "cluster " + r.cssClass + " " + t.cssClasses).attr("id", t.domId ?? t.id).attr("data-look", t.look);
  Oe(h, t.colorIndex, s, n);
  const u = le(i), f = h.insert("g").attr("class", "cluster-label");
  let p = { width: 0, height: 0 };
  const m = t.label?.trim();
  if (m) {
    let B;
    if (t.labelType === "markdown" ? B = await ve(f, t.label, {
      style: t.labelStyle,
      useHtmlLabels: u,
      isNode: !0,
      width: t.width
    }) : B = await xr(f, t.label, t.labelStyle || "", !1, !0), p = B.getBBox(), u) {
      const F = B.children[0], A = $t(B);
      p = F.getBoundingClientRect(), A.attr("width", p.width), A.attr("height", p.height);
    }
  }
  const y = t.width <= p.width + t.padding ? p.width + t.padding : t.width;
  t.width <= p.width + t.padding ? t.diff = (y - t.width) / 2 - t.padding : t.diff = -t.padding;
  const x = t.height, C = t.x - y / 2, b = t.y - x / 2;
  let S;
  if (t.look === "handDrawn") {
    const B = ct.svg(h), F = lt(t, {
      roughness: r.roughness,
      fill: r.fill,
      stroke: r.stroke,
      strokeWidth: r.strokeWidth,
      seed: a,
      ...r.fill === "none" ? { fillWeight: 0 } : { fillStyle: "solid" },
      ...r.strokeDash ? { strokeLineDash: r.strokeDash } : {}
    }), A = B.path(Le(C, b, y, x, r.rx), F);
    S = h.insert(() => A, ":first-child"), S.select("path:nth-child(2)").attr("style", c.join(";"));
  } else
    S = h.insert("rect", ":first-child"), S.attr("rx", r.rx).attr("ry", r.rx).attr("x", C).attr("y", b).attr("width", y).attr("height", x).attr("fill", r.fill).attr("stroke", r.stroke).attr("stroke-width", r.strokeWidth + "px"), r.strokeDash && S.attr("stroke-dasharray", r.strokeDash.join(", "));
  if (m) {
    const { subGraphTitleTopMargin: B } = Ds(i);
    if (f.attr(
      "transform",
      `translate(${t.x - p.width / 2}, ${t.y - t.height / 2 + B})`
    ), l) {
      const F = f.select("span");
      F && F.attr("style", l);
    }
  }
  const _ = S.node().getBBox();
  return t.offsetX = 0, t.width = _.width, t.height = _.height, t.offsetY = p.height - t.padding / 2, t.intersect = function(B) {
    return Br(t, B);
  }, { cluster: h, labelBBox: p };
}, "createContainerGroup"), y_ = /* @__PURE__ */ d(async (e, t) => {
  const { themeVariables: r } = Ot(), i = r.flowContainerStroke || r.secondaryBorderColor;
  return m_(e, t, {
    cssClass: "flow-cluster",
    rx: 10,
    fill: "none",
    stroke: i,
    strokeWidth: 0.75,
    roughness: 0.7
  });
}, "flowGroup"), x_ = /* @__PURE__ */ d((e, t) => {
  const r = e.boundaryType || "rect", i = r === "package" ? 20 : e.padding, s = r === "package" ? t.height + 10 : 0, o = Math.max(e.width, t.width + i), a = r === "package" ? Math.max(e.height, s + e.padding * 2) : e.height, n = e.x - o / 2, l = e.y - a / 2;
  return {
    boundaryType: r,
    width: o,
    height: a,
    x: n,
    y: l,
    bodyY: l + s,
    bodyHeight: a - s,
    tabHeight: s,
    tabWidth: r === "package" ? Math.min(o, Math.max(80, t.width + 20)) : 0
  };
}, "getUsecaseSystemBoundaryGeometry"), C_ = /* @__PURE__ */ d(async (e, t) => {
  J.info("Creating usecase system boundary for ", t.id, t);
  const r = Ot(), { theme: i, themeVariables: s, handDrawnSeed: o } = r, { clusterBkg: a, clusterBorder: n, borderColorArray: l } = s, { labelStyles: c, nodeStyles: h } = ht(t), { stylesMap: u } = jr(t), f = t.boundaryType || "rect", p = e.insert("g").attr(
    "class",
    `cluster usecase-system-boundary usecase-system-boundary-${f} ${t.cssClasses}`
  ).attr("id", typeof t.domId == "string" ? t.domId : t.id).attr("data-boundary-type", f).attr("data-look", t.look);
  Oe(p, t.colorIndex, i, l);
  const m = le(r), y = p.insert("g").attr("class", "cluster-label system-boundary-title"), x = await ve(y, t.label, {
    style: c,
    useHtmlLabels: m,
    isNode: !0
  });
  let C = x.getBBox();
  if (m) {
    const R = x.children[0], E = $t(x);
    C = R.getBoundingClientRect(), E.attr("width", C.width), E.attr("height", C.height);
  }
  const b = x_(t, C), { width: S, height: _, x: B, y: F, bodyY: A, bodyHeight: L, tabHeight: H, tabWidth: N } = b;
  t.diff = t.width <= C.width + t.padding ? (S - t.width) / 2 - t.padding : -t.padding;
  const O = lt(t, {
    fill: u.get("fill") || a,
    stroke: u.get("stroke") || n,
    strokeWidth: u.get("stroke-width")?.replace("px", "") || 1,
    seed: o
  });
  if (t.look === "handDrawn") {
    const R = ct.svg(p), E = R.rectangle(B, A, S, L, O);
    if (p.insert(() => E, ":first-child").attr("class", "boundary-body label-container"), f === "package") {
      const I = R.rectangle(B, F, N, H, O);
      p.insert(() => I, ":first-child").attr("class", "boundary-tab system-boundary-package-tab label-container");
    }
  } else
    p.insert("rect", ":first-child").attr("class", "boundary-body label-container").attr("style", h).attr("x", B).attr("y", A).attr("width", S).attr("height", L), f === "package" && p.insert("rect", ":first-child").attr("class", "boundary-tab system-boundary-package-tab label-container").attr("style", h).attr("x", B).attr("y", F).attr("width", N).attr("height", H);
  const { subGraphTitleTopMargin: Q } = Ds(r);
  return f === "package" ? y.attr(
    "transform",
    `translate(${B + (N - C.width) / 2}, ${F + (H - C.height) / 2})`
  ) : y.attr(
    "transform",
    `translate(${t.x - C.width / 2}, ${F + Q})`
  ), c && (y.attr("style", c), y.select("span").attr("style", c)), t.offsetX = 0, t.width = S, t.height = _, t.offsetY = C.height - t.padding / 2, t.labelBBox = C, t.intersect = function(R) {
    return Br(t, R);
  }, { cluster: p, labelBBox: C };
}, "usecaseSystemBoundary"), b_ = Vm, k_ = /* @__PURE__ */ d((e, t) => Xm(e, t, { variant: "pool" }), "pool"), w_ = {
  rect: Vm,
  squareRect: b_,
  roundedWithTitle: f_,
  noteGroup: d_,
  divider: g_,
  kanbanSection: p_,
  flowGroup: y_,
  usecaseSystemBoundary: C_,
  swimlane: Xm,
  pool: k_
}, S_ = /* @__PURE__ */ new Set(["noteGroup", "divider"]), SM = /* @__PURE__ */ d((e) => !S_.has(e ?? "rect"), "clusterPaintsTitle"), Zm = /* @__PURE__ */ new Map(), T_ = /* @__PURE__ */ d(async (e, t) => {
  const r = t.shape || "rect", i = await w_[r](e, t);
  return Zm.set(t.id, i), i;
}, "insertCluster"), TM = /* @__PURE__ */ d(() => {
  Zm = /* @__PURE__ */ new Map();
}, "clear"), Ki = /* @__PURE__ */ d((e, t) => {
  if (t)
    return "translate(" + -e.width / 2 + ", " + -e.height / 2 + ")";
  const r = e.x ?? 0, i = e.y ?? 0;
  return "translate(" + -(r + e.width / 2) + ", " + -(i + e.height / 2) + ")";
}, "computeLabelTransform"), ae = {
  aggregation: 17.25,
  extension: 17.25,
  composition: 17.25,
  dependency: 6,
  lollipop: 13.5,
  arrow_point: 4,
  arrow_barb: 0,
  arrow_barb_neo: 5.5
  //arrow_cross: 24,
}, hd = {
  arrow_point: 4,
  arrow_cross: 12.5,
  arrow_circle: 12.5,
  arrow_open_head: 4,
  arrow_hollow_circle: 8
};
function ns(e, t) {
  if (e === void 0 || t === void 0)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  e = Yt(e), t = Yt(t);
  const [r, i] = [e.x, e.y], [s, o] = [t.x, t.y], a = s - r, n = o - i;
  return { angle: Math.atan(n / a), deltaX: a, deltaY: n };
}
d(ns, "calculateDeltaAndAngle");
var Yt = /* @__PURE__ */ d((e) => Array.isArray(e) ? { x: e[0], y: e[1] } : e, "pointTransformer"), __ = /* @__PURE__ */ d((e) => ({
  x: /* @__PURE__ */ d(function(t, r, i) {
    let s = 0;
    const o = Yt(i[0]).x < Yt(i[i.length - 1]).x ? "left" : "right";
    if (r === 0 && Object.hasOwn(ae, e.arrowTypeStart)) {
      const { angle: p, deltaX: m } = ns(i[0], i[1]);
      s = ae[e.arrowTypeStart] * Math.cos(p) * (m >= 0 ? 1 : -1);
    } else if (r === i.length - 1 && Object.hasOwn(ae, e.arrowTypeEnd)) {
      const { angle: p, deltaX: m } = ns(
        i[i.length - 1],
        i[i.length - 2]
      );
      s = ae[e.arrowTypeEnd] * Math.cos(p) * (m >= 0 ? 1 : -1);
    }
    const a = Math.abs(
      Yt(t).x - Yt(i[i.length - 1]).x
    ), n = Math.abs(
      Yt(t).y - Yt(i[i.length - 1]).y
    ), l = Math.abs(Yt(t).x - Yt(i[0]).x), c = Math.abs(Yt(t).y - Yt(i[0]).y), h = ae[e.arrowTypeStart], u = ae[e.arrowTypeEnd], f = 1;
    if (a < u && a > 0 && n < u) {
      let p = u + f - a;
      p *= o === "right" ? -1 : 1, s -= p;
    }
    if (l < h && l > 0 && c < h) {
      let p = h + f - l;
      p *= o === "right" ? -1 : 1, s += p;
    }
    return Yt(t).x + s;
  }, "x"),
  y: /* @__PURE__ */ d(function(t, r, i) {
    let s = 0;
    const o = Yt(i[0]).y < Yt(i[i.length - 1]).y ? "down" : "up";
    if (r === 0 && Object.hasOwn(ae, e.arrowTypeStart)) {
      const { angle: p, deltaY: m } = ns(i[0], i[1]);
      s = ae[e.arrowTypeStart] * Math.abs(Math.sin(p)) * (m >= 0 ? 1 : -1);
    } else if (r === i.length - 1 && Object.hasOwn(ae, e.arrowTypeEnd)) {
      const { angle: p, deltaY: m } = ns(
        i[i.length - 1],
        i[i.length - 2]
      );
      s = ae[e.arrowTypeEnd] * Math.abs(Math.sin(p)) * (m >= 0 ? 1 : -1);
    }
    const a = Math.abs(
      Yt(t).y - Yt(i[i.length - 1]).y
    ), n = Math.abs(
      Yt(t).x - Yt(i[i.length - 1]).x
    ), l = Math.abs(Yt(t).y - Yt(i[0]).y), c = Math.abs(Yt(t).x - Yt(i[0]).x), h = ae[e.arrowTypeStart], u = ae[e.arrowTypeEnd], f = 1;
    if (a < u && a > 0 && n < u) {
      let p = u + f - a;
      p *= o === "up" ? -1 : 1, s -= p;
    }
    if (l < h && l > 0 && c < h) {
      let p = h + f - l;
      p *= o === "up" ? -1 : 1, s += p;
    }
    return Yt(t).y + s;
  }, "y")
}), "getLineFunctionsWithOffset"), Km = 1, B_ = /* @__PURE__ */ d((e) => typeof e == "number" && Number.isFinite(e) && e > 0 ? e : Km, "getStepDuration"), Ah = /* @__PURE__ */ d((e) => typeof e.step == "number" && Number.isInteger(e.step) && e.step > 0, "isStepEdge"), cd = [0.25, 0.35, 0.15, 0.65, 0.75, 0.5, 0.85, 0.1, 0.9], cl = 9, v_ = 11, L_ = 2, F_ = "#333333", ud = 12, dd = 6, fd = 14, pd = 0.01, A_ = 4.5, Qm = /translate\(\s*(-?[\d.e]+)[\s,]+(-?[\d.e]+)/i, M_ = 4, E_ = 0.6, $_ = 4, O_ = /* @__PURE__ */ d((e, t, r = Km) => {
  const i = Math.max(t, e);
  return {
    begin: (e - 1) * r,
    dur: r,
    gap: (i - 1) * r
  };
}, "getEdgeStepTiming"), D_ = /* @__PURE__ */ d((e) => `step_${Array.from(
  e,
  (t) => /[\dA-Za-z]/.test(t) ? t : `_${(t.codePointAt(0) ?? 0).toString(16)}_`
).join("")}`, "toAnimationId"), I_ = /* @__PURE__ */ d((e) => {
  const t = /^m\s*(-?[\d.e]+)[\s,]+(-?[\d.e]+)/i.exec(e.trim());
  return t ? `translate(${t[1]},${t[2]}) ` : "";
}, "pathStartTranslate"), P_ = /* @__PURE__ */ d((e) => Array.from(e, (t, r) => {
  const i = t.codePointAt(0) ?? 0;
  if (i === 0)
    return "�";
  const s = i <= 31 || i === 127, o = /\d/.test(t) && (r === 0 || r === 1 && e.startsWith("-"));
  return s || o ? `\\${i.toString(16)} ` : e === "-" ? "\\-" : i >= 128 || /[\w-]/.test(t) ? t : `\\${t}`;
}).join(""), "escapeCssIdentifierFallback"), R_ = /* @__PURE__ */ d((e) => typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : P_(e), "escapeCssIdentifier"), N_ = /* @__PURE__ */ d((e, t) => {
  const r = e.node(), i = r?.ownerSVGElement ?? r?.closest?.("svg") ?? r, s = t || i?.getAttribute("id");
  if (!i || !s || i.querySelector("style.edge-step-style"))
    return;
  const o = `#${R_(s)} `, a = i.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "style");
  a.setAttribute("class", "edge-step-style"), a.textContent = `@media (prefers-reduced-motion: reduce) { ${o}.edge-step-dot, ${o}.edge-step-highlight { display: none; } }`, i.appendChild(a);
}, "ensureReducedMotionStyle"), q_ = /* @__PURE__ */ d((e, t) => {
  const r = e.filter((o) => Number.isFinite(o.x) && Number.isFinite(o.y));
  if (r.length === 0)
    return;
  const i = r.slice(1).map((o, a) => Math.hypot(o.x - r[a].x, o.y - r[a].y));
  let s = i.reduce((o, a) => o + a, 0) * t;
  for (const [o, a] of i.entries()) {
    if (s <= a && a > 0) {
      const n = s / a, l = r[o], c = r[o + 1];
      return { x: l.x + (c.x - l.x) * n, y: l.y + (c.y - l.y) * n };
    }
    s -= a;
  }
  return r[r.length - 1];
}, "pointAlongPolyline"), W_ = /* @__PURE__ */ d((e, t) => {
  const r = typeof t?.getTotalLength == "function" ? t.getTotalLength() : 0, i = t?.getPointAtLength?.bind(t);
  return r > 0 && i ? (s) => {
    const { x: o, y: a } = i(r * s);
    return { x: o, y: a };
  } : (s) => q_(e, s);
}, "createPathSampler"), z_ = /* @__PURE__ */ d((e, t) => Math.min(
  Number.POSITIVE_INFINITY,
  ...t.map((r) => {
    const i = Math.max(Math.abs(e.x - r.x) - r.halfWidth, 0), s = Math.max(Math.abs(e.y - r.y) - r.halfHeight, 0);
    return Math.hypot(i, s) - cl;
  })
), "roomAround"), H_ = /* @__PURE__ */ d((e, t) => {
  const r = e(t), i = e(Math.max(t - pd, 0)), s = e(Math.min(t + pd, 1));
  if (!r || !i || !s)
    return [];
  const o = Math.hypot(s.x - i.x, s.y - i.y);
  if (o === 0)
    return [];
  const a = { x: -(s.y - i.y) / o, y: (s.x - i.x) / o };
  return [1, -1].map((n) => ({
    x: r.x + a.x * fd * n,
    y: r.y + a.y * fd * n
  }));
}, "besideThePath"), Y_ = /* @__PURE__ */ d((e, t) => {
  const r = [
    ...cd.map(e),
    ...cd.flatMap((o) => H_(e, o))
  ];
  let i, s = Number.NEGATIVE_INFINITY;
  for (const o of r) {
    if (!o || !Number.isFinite(o.x) || !Number.isFinite(o.y))
      continue;
    const a = z_(o, t);
    if (a >= L_)
      return o;
    a > s && (i = o, s = a);
  }
  return i;
}, "chooseBadgePosition"), Jm = /* @__PURE__ */ d((e, t) => ({
  ...e,
  halfWidth: t,
  halfHeight: t
}), "square"), U_ = /* @__PURE__ */ d((e) => {
  const t = Qm.exec(e.getAttribute("transform") ?? "");
  return t ? { x: Number(t[1]), y: Number(t[2]) } : { x: 0, y: 0 };
}, "translationOf"), Mh = /* @__PURE__ */ d((e) => {
  const t = { x: 0, y: 0 };
  for (let r = e; r && r.localName !== "svg"; r = r.parentElement) {
    const { x: i, y: s } = U_(r);
    t.x += i, t.y += s;
  }
  return t;
}, "offsetInSvg"), j_ = /* @__PURE__ */ d((e, t) => {
  if (!Qm.test(e.getAttribute("transform") ?? ""))
    return;
  const r = Mh(e), i = r.x - t.x, s = r.y - t.y, o = e.getBBox?.();
  if (o)
    return {
      x: i + o.x + o.width / 2,
      y: s + o.y + o.height / 2,
      halfWidth: o.width / 2,
      halfHeight: o.height / 2
    };
}, "boxedObstacle"), G_ = /* @__PURE__ */ d((e) => {
  try {
    const t = JSON.parse(atob(e.getAttribute("data-points") ?? ""));
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}, "readPoints"), gd = /* @__PURE__ */ d((e, t) => {
  const r = Math.hypot(e.x - t.x, e.y - t.y);
  if (r === 0)
    return Jm(e, ud);
  const i = { x: (e.x - t.x) / r, y: (e.y - t.y) / r }, s = ud / 2;
  return {
    x: e.x - i.x * s,
    y: e.y - i.y * s,
    halfWidth: Math.abs(i.x) * s + Math.abs(i.y) * dd,
    halfHeight: Math.abs(i.y) * s + Math.abs(i.x) * dd
  };
}, "arrowheadObstacle"), md = /* @__PURE__ */ d((e, t) => {
  const r = e.getAttribute(t);
  return !!r && r !== "none";
}, "hasMarker"), X_ = /* @__PURE__ */ d((e, t) => {
  const r = G_(e).filter(
    (n) => Number.isFinite(n?.x) && Number.isFinite(n?.y)
  );
  if (r.length === 0)
    return [];
  const i = Mh(e), s = /* @__PURE__ */ d((n) => ({
    x: n.x + i.x - t.x,
    y: n.y + i.y - t.y
  }), "toSvg"), o = r.length - 1, a = [];
  return md(e, "marker-start") && a.push(gd(s(r[0]), s(r[Math.min(1, o)]))), md(e, "marker-end") && a.push(gd(s(r[o]), s(r[Math.max(o - 1, 0)]))), a;
}, "arrowheadObstacles"), ty = /* @__PURE__ */ d((e) => {
  const t = { x: 0, y: 0 }, r = [...e?.querySelectorAll(".edgeLabel, .node") ?? []].map((s) => j_(s, t)).filter((s) => s !== void 0), i = [...e?.querySelectorAll('path[data-edge="true"]') ?? []].flatMap(
    (s) => X_(s, t)
  );
  return [...r, ...i];
}, "collectBadgeObstacles"), V_ = /* @__PURE__ */ d((e, t) => {
  if (!e.label || t.length === 0)
    return [];
  const { x: r, y: i } = _e.calcLabelPosition(t);
  return [{ x: r, y: i, halfWidth: (e.width ?? 0) / 2, halfHeight: (e.height ?? 0) / 2 }];
}, "edgeLabelObstacles"), Z_ = /* @__PURE__ */ d((e) => {
  const t = e / 255;
  return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
}, "linearChannel"), yd = /* @__PURE__ */ d((e) => {
  try {
    const [t, r, i] = ["r", "g", "b"].map((s) => Z_(rx(e, s)));
    return 0.2126 * t + 0.7152 * r + 0.0722 * i;
  } catch {
    return;
  }
}, "relativeLuminance"), K_ = /* @__PURE__ */ d((e, t) => {
  const r = yd(e), i = yd(t);
  return r === void 0 || i === void 0 ? 0 : (Math.max(r, i) + 0.05) / (Math.min(r, i) + 0.05);
}, "contrastRatio"), Q_ = /* @__PURE__ */ d((e, t) => {
  const i = [...t.filter((o) => !!o), "#ffffff", "#000000"].map((o) => ({ color: o, ratio: K_(e, o) }));
  return (i.find(({ ratio: o }) => o >= A_) ?? i.reduce((o, a) => a.ratio > o.ratio ? a : o)).color;
}, "pickBadgeTextColor"), J_ = /* @__PURE__ */ d((e) => {
  const t = e?.replace(/^stroke:\s*/, "").trim();
  return t === "" ? void 0 : t;
}, "bareColor"), tB = /* @__PURE__ */ d((e, t, r, i = ty(e.node()?.closest("svg"))) => {
  if (!Ah(t) || !t.showStepNumber)
    return;
  const s = Mh(e.node()), o = i.map((c) => ({
    ...c,
    x: c.x - s.x,
    y: c.y - s.y
  })), a = Y_(W_(r.points, r.pathNode), [
    ...o,
    ...V_(t, r.points)
  ]);
  if (!a)
    return;
  const n = J_(r.color) ?? F_, l = e.append("g").attr("class", "edge-step-badge").attr("transform", `translate(${a.x},${a.y})`).attr("pointer-events", "none").attr("data-step", t.step);
  return l.append("circle").attr("r", cl).attr("fill", n), l.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", v_).attr("fill", Q_(n, r.textColors ?? [])).text(String(t.step)), Jm({ x: a.x + s.x, y: a.y + s.y }, cl);
}, "insertEdgeStepBadge"), xd = /* @__PURE__ */ d((e, t, r) => {
  e.append("animateTransform").attr("attributeName", "transform").attr("type", "scale").attr("values", "1;1").attr("dur", `${r}s`).attr("begin", `${t}.begin`).attr("fill", "remove");
}, "showWhileStepPlays"), eB = /* @__PURE__ */ d((e, t, r, i, s) => {
  if (!Ah(t) || !r)
    return;
  const { begin: o, dur: a, gap: n } = O_(
    t.step,
    t.stepCount ?? t.step,
    B_(t.stepDuration)
  ), l = D_(`${i}-${t.id}-step`), c = `${I_(r)}scale(0)`, h = s?.replace(/^stroke:\s*/, ""), u = e.append("path").attr("class", "edge-step-highlight").attr("aria-hidden", "true").attr("d", r).attr("fill", "none").attr("stroke", h ?? "currentColor").attr("stroke-width", M_).attr("stroke-linecap", "round").attr("stroke-opacity", E_).attr("pointer-events", "none").attr("transform", c).attr("data-step", t.step);
  xd(u, l, a);
  const f = e.append("circle").attr("class", "edge-step-dot").attr("r", $_).attr("aria-hidden", "true").attr("transform", c).attr("data-step", t.step);
  h && f.attr("fill", h).attr("stroke", "none"), f.append("animateMotion").attr("id", l).attr("path", r).attr("dur", `${a}s`).attr("begin", `${o}s;${l}.end+${n}s`).attr("fill", "remove"), xd(f, l, a), N_(e, i);
}, "insertEdgeStepDot"), Xo = /* @__PURE__ */ new WeakMap(), rB = /* @__PURE__ */ d((e) => {
  const t = e.querySelector(":scope > g.edge-step-badges");
  if (t)
    return t;
  const r = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
  return r.setAttribute("class", "edge-step-badges"), e.appendChild(r);
}, "badgeLayer"), iB = /* @__PURE__ */ d((e) => {
  const t = e ? Xo.get(e) : void 0;
  if (!e || !t)
    return;
  Xo.delete(e);
  const r = ty(e);
  for (const { elem: i, edge: s, options: o } of t) {
    const a = i.node()?.parentElement;
    if (!a)
      continue;
    const n = $t(rB(a)), l = tB(n, s, o, r);
    l && r.push(l);
  }
}, "placeQueuedStepBadges"), sB = /* @__PURE__ */ d((e, t, r, i, s) => {
  eB(e, t, r, i, s.color);
  const o = e.node(), a = o?.ownerSVGElement ?? o;
  !a || !Ah(t) || !t.showStepNumber || Xo.set(a, [...Xo.get(a) ?? [], { elem: e, edge: t, options: s }]);
}, "insertEdgeStepMarks"), oB = /* @__PURE__ */ d((e, t, r, i, s, o = !1, a) => {
  t.arrowTypeStart && Cd(
    e,
    "start",
    t.arrowTypeStart,
    r,
    i,
    s,
    o,
    a
  ), t.arrowTypeEnd && Cd(e, "end", t.arrowTypeEnd, r, i, s, o, a);
}, "addEdgeMarkers"), aB = {
  arrow_cross: { type: "cross", fill: !1 },
  arrow_point: { type: "point", fill: !0 },
  arrow_barb: { type: "barb", fill: !0 },
  arrow_barb_neo: { type: "barb", fill: !0 },
  arrow_circle: { type: "circle", fill: !1 },
  arrow_open_head: { type: "openArrow", fill: !1 },
  arrow_hollow_circle: { type: "hollowCircle", fill: !1 },
  arrow_hierarchy: { type: "hierarchy", fill: !1 },
  aggregation: { type: "aggregation", fill: !1 },
  extension: { type: "extension", fill: !1 },
  composition: { type: "composition", fill: !0 },
  dependency: { type: "dependency", fill: !0 },
  lollipop: { type: "lollipop", fill: !1 },
  only_one: { type: "onlyOne", fill: !1 },
  zero_or_one: { type: "zeroOrOne", fill: !1 },
  one_or_more: { type: "oneOrMore", fill: !1 },
  zero_or_more: { type: "zeroOrMore", fill: !1 },
  requirement_arrow: { type: "requirement_arrow", fill: !1 },
  requirement_contains: { type: "requirement_contains", fill: !1 }
}, nB = [
  "cross",
  "point",
  "circle",
  "lollipop",
  "aggregation",
  "extension",
  "composition",
  "dependency",
  "barb"
], Cd = /* @__PURE__ */ d((e, t, r, i, s, o, a = !1, n) => {
  if (!r || r === "none")
    return;
  const l = aB[r], c = l && nB.includes(l.type);
  if (!l) {
    J.warn(`Unknown arrow type: ${r}`);
    return;
  }
  const h = l.type, p = `${s}_${o}-${h}${t === "start" ? "Start" : "End"}${a && c ? "-margin" : ""}`;
  if (n && n.trim() !== "") {
    const m = n.replace(/[^\dA-Za-z]/g, "_"), y = `${p}_${m}`;
    if (!document.getElementById(y)) {
      const x = document.getElementById(p);
      if (x) {
        const C = x.cloneNode(!0);
        C.id = y, C.querySelectorAll("path, circle, line").forEach((S) => {
          S.setAttribute("stroke", n), l.fill && S.setAttribute("fill", n);
        }), x.parentNode?.appendChild(C);
      }
    }
    e.attr(`marker-${t}`, `url(${i}#${y})`);
  } else
    e.attr(`marker-${t}`, `url(${i}#${p})`);
}, "addEdgeMarker"), lB = /* @__PURE__ */ d((e) => typeof e == "string" ? e : Ot()?.flowchart?.curve, "resolveEdgeCurveType"), Vo = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map(), _M = /* @__PURE__ */ d(() => {
  Vo.clear(), de.clear();
}, "clear"), BM = /* @__PURE__ */ d((e) => !!(e.label || e.startLabelLeft || e.startLabelRight || e.endLabelLeft || e.endLabelRight), "hasEdgeLabel"), Qi = /* @__PURE__ */ d((e) => e ? typeof e == "string" ? e : e.reduce((t, r) => t + ";" + r, "") : "", "getLabelStyles"), hB = /* @__PURE__ */ d(async (e, t) => {
  const r = Ot();
  let i = le(r);
  const { labelStyles: s } = ht(t);
  t.labelStyle = s;
  const o = e.insert("g").attr("class", "edgeLabel"), a = o.insert("g").attr("class", "label").attr("data-id", t.id), n = t.labelType === "markdown", c = await ve(
    e,
    t.label,
    {
      style: Qi(t.labelStyle),
      useHtmlLabels: i,
      addSvgBackground: !0,
      isNode: !1,
      markdown: n,
      // Plain text edge labels should auto-wrap, markdown edge labels respect markdownAutoWrap config
      width: n ? void 0 : void 0
    },
    r
  );
  a.node().appendChild(c), J.info("abc82", t, t.labelType);
  let h, u;
  if (i) {
    const p = c.children[0], m = $t(c);
    h = await ai.measure(() => p.getBoundingClientRect()), u = h, m.attr("width", h.width), m.attr("height", h.height);
  } else {
    const p = $t(c).select("text").node();
    await ai.measure(() => {
      h = c.getBBox(), p && typeof p.getBBox == "function" ? u = p.getBBox() : u = h;
    });
  }
  a.attr("transform", Ki(u, i)), Vo.set(t.id, o), t.width = h.width, t.height = h.height;
  let f;
  if (t.startLabelLeft) {
    const p = e.insert("g").attr("class", "edgeTerminals"), m = p.insert("g").attr("class", "inner"), y = await xr(
      m,
      t.startLabelLeft,
      Qi(t.labelStyle) || "",
      !1,
      !1
    );
    f = y;
    let x = y.getBBox();
    if (i) {
      const C = y.children[0], b = $t(y);
      x = C.getBoundingClientRect(), b.attr("width", x.width), b.attr("height", x.height);
    }
    m.attr("transform", Ki(x, i)), de.get(t.id) || de.set(t.id, {}), de.get(t.id).startLeft = p, hs(f, t.startLabelLeft, x), ls(t, "startLeft", x);
  }
  if (t.startLabelRight) {
    const p = e.insert("g").attr("class", "edgeTerminals"), m = p.insert("g").attr("class", "inner"), y = await xr(
      m,
      t.startLabelRight,
      Qi(t.labelStyle) || "",
      !1,
      !1
    );
    f = y;
    let x = y.getBBox();
    if (i) {
      const C = y.children[0], b = $t(y);
      x = C.getBoundingClientRect(), b.attr("width", x.width), b.attr("height", x.height);
    }
    m.attr("transform", Ki(x, i)), de.get(t.id) || de.set(t.id, {}), de.get(t.id).startRight = p, hs(f, t.startLabelRight, x), ls(t, "startRight", x);
  }
  if (t.endLabelLeft) {
    const p = e.insert("g").attr("class", "edgeTerminals"), m = p.insert("g").attr("class", "inner"), y = await xr(
      m,
      t.endLabelLeft,
      Qi(t.labelStyle) || "",
      !1,
      !1
    );
    f = y;
    let x = y.getBBox();
    if (i) {
      const C = y.children[0], b = $t(y);
      x = C.getBoundingClientRect(), b.attr("width", x.width), b.attr("height", x.height);
    }
    m.attr("transform", Ki(x, i)), de.get(t.id) || de.set(t.id, {}), de.get(t.id).endLeft = p, hs(f, t.endLabelLeft, x), ls(t, "endLeft", x);
  }
  if (t.endLabelRight) {
    const p = e.insert("g").attr("class", "edgeTerminals"), m = p.insert("g").attr("class", "inner"), y = await xr(
      m,
      t.endLabelRight,
      Qi(t.labelStyle) || "",
      !1,
      !1
    );
    f = y;
    let x = y.getBBox();
    if (i) {
      const C = y.children[0], b = $t(y);
      x = C.getBoundingClientRect(), b.attr("width", x.width), b.attr("height", x.height);
    }
    m.attr("transform", Ki(x, i)), de.get(t.id) || de.set(t.id, {}), de.get(t.id).endRight = p, hs(f, t.endLabelRight, x), ls(t, "endRight", x);
  }
  return c;
}, "insertEdgeLabel");
function ls(e, t, r) {
  e.terminalLabelSizes ??= {}, e.terminalLabelSizes[t] = { width: r.width, height: r.height };
}
d(ls, "recordTerminalLabelSize");
function hs(e, t, r) {
  le(Ot()) && e && (e.style.width = Math.max(t.length * 9, r.width) + "px", e.style.height = r.height + "px");
}
d(hs, "setTerminalWidth");
var cB = /* @__PURE__ */ d((e, t) => {
  let r = e.x, i = e.y;
  if (t?.updatedPath) {
    const s = _e.calcLabelPosition(t.updatedPath);
    if (t.originalPath) {
      const o = _e.calcLabelPosition(t.originalPath);
      r = e.x + (s.x - o.x), i = e.y + (s.y - o.y);
    } else
      r = s.x, i = s.y;
  }
  return { x: r, y: i };
}, "resolveEdgeLabelPosition"), uB = /* @__PURE__ */ d((e, t) => {
  J.debug("Moving label abc88 ", e.id, e.label, Vo.get(e.id), t);
  const r = Ot(), { subGraphTitleTotalMargin: i } = Ds(r);
  if (e.label) {
    const o = Vo.get(e.id), { x: a, y: n } = cB(e, t);
    J.debug(
      "Moving label " + e.label + " from (",
      e.x,
      ",",
      e.y,
      ") to (",
      a,
      ",",
      n,
      ") abc88"
    ), o.attr("transform", `translate(${a}, ${n + i / 2})`);
  }
  const s = t.updatedPath ? t.updatedPath : t.originalPath;
  if (e.startLabelLeft) {
    const o = de.get(e.id).startLeft;
    let a = e.x, n = e.y;
    if (s) {
      const l = _e.calcTerminalLabelPosition(e.arrowTypeStart ? 10 : 0, "start_left", s);
      a = l.x, n = l.y;
    }
    o.attr("transform", `translate(${a}, ${n})`);
  }
  if (e.startLabelRight) {
    const o = de.get(e.id).startRight;
    let a = e.x, n = e.y;
    if (s) {
      const l = _e.calcTerminalLabelPosition(
        e.arrowTypeStart ? 10 : 0,
        "start_right",
        s
      );
      a = l.x, n = l.y;
    }
    o.attr("transform", `translate(${a}, ${n})`);
  }
  if (e.endLabelLeft) {
    const o = de.get(e.id).endLeft;
    let a = e.x, n = e.y;
    if (s) {
      const l = _e.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_left", s);
      a = l.x, n = l.y;
    }
    o.attr("transform", `translate(${a}, ${n})`);
  }
  if (e.endLabelRight) {
    const o = de.get(e.id).endRight;
    let a = e.x, n = e.y;
    if (s) {
      const l = _e.calcTerminalLabelPosition(e.arrowTypeEnd ? 10 : 0, "end_right", s);
      a = l.x, n = l.y;
    }
    o.attr("transform", `translate(${a}, ${n})`);
  }
}, "positionEdgeLabel"), Ei = 0.5, Cr = /* @__PURE__ */ d((e, t) => Math.abs(e.x - t.x) < Ei, "sharesColumn"), br = /* @__PURE__ */ d((e, t) => Math.abs(e.y - t.y) < Ei, "sharesRow"), ey = /* @__PURE__ */ d((e, t) => Cr(e, t) && br(e, t), "coincides");
function ry(e, t, r) {
  return Cr(e, t) && !br(e, t) ? Cr(r, t) : br(e, t) && !Cr(e, t) ? br(r, t) : Cr(r, t) || br(r, t);
}
d(ry, "keepsArrivalAxis");
function iy(e, t, r) {
  return ey(e, t) ? { heading: t, from: r } : { heading: e, from: t };
}
d(iy, "arrivalSegment");
function sy({ heading: e, from: t }, r, i) {
  return (e.x - t.x) * (i.x - r.x) + (e.y - t.y) * (i.y - r.y) < 0;
}
d(sy, "runsAgainstHeading");
function oy({ heading: e, from: t }, r, i) {
  return br(e, t) && !Cr(e, t) ? { x: i.x, y: r.y } : Cr(e, t) && !br(e, t) ? { x: r.x, y: i.y } : i;
}
d(oy, "snapToArrivalAxis");
function ay(e, t, r, i) {
  if ((Cr(e, t) || br(e, t)) && !ry(e, t, i))
    return e;
  const o = iy(e, t, r);
  return sy(o, t, i) ? t : oy(o, t, i);
}
d(ay, "dockFinalPoint");
function ny(e) {
  const t = Object.hasOwn(ae, e) ? ae[e] : 0;
  return Number.isFinite(t) ? t : 0;
}
d(ny, "markerPullBack");
function ly({ originalLast: e, lastInner: t, newLast: r, minLength: i }) {
  const s = !ey(e, t), o = Math.hypot(r.x - t.x, r.y - t.y);
  return o >= Math.max(Ei, i) ? r : s && o >= Ei ? e : void 0;
}
d(ly, "finalDockPoint");
var dB = /* @__PURE__ */ d((e, t) => {
  if (!e?.isLabelEdge || !e?.id?.endsWith("-to-label") || !Array.isArray(t) || t.length !== 2)
    return t;
  const [r, i] = t, s = Math.abs(i.x - r.x), o = Math.abs(i.y - r.y);
  return s < 1e-3 || o < 1e-3 ? t : o >= s ? [r, { x: r.x, y: i.y }, i] : [r, { x: i.x, y: r.y }, i];
}, "orthogonalizeToLabelClippedPoints"), fB = /* @__PURE__ */ d((e, t) => {
  const r = e.x, i = e.y, s = Math.abs(t.x - r), o = Math.abs(t.y - i), a = e.width / 2, n = e.height / 2;
  return s >= a || o >= n;
}, "outsideNode"), pB = /* @__PURE__ */ d((e, t, r) => {
  J.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(r)}
  node        : x:${e.x} y:${e.y} w:${e.width} h:${e.height}`);
  const i = e.x, s = e.y, o = Math.abs(i - r.x), a = e.width / 2;
  let n = r.x < t.x ? a - o : a + o;
  const l = e.height / 2, c = Math.abs(t.y - r.y), h = Math.abs(t.x - r.x);
  if (Math.abs(s - t.y) * a > Math.abs(i - t.x) * l) {
    let u = r.y < t.y ? t.y - l - s : s - l - t.y;
    n = h * u / c;
    const f = {
      x: r.x < t.x ? r.x + n : r.x - h + n,
      y: r.y < t.y ? r.y + c - u : r.y - c + u
    };
    return n === 0 && (f.x = t.x, f.y = t.y), h === 0 && (f.x = t.x), c === 0 && (f.y = t.y), J.debug(`abc89 top/bottom calc, Q ${c}, q ${u}, R ${h}, r ${n}`, f), f;
  } else {
    r.x < t.x ? n = t.x - a - i : n = i - a - t.x;
    let u = c * n / h, f = r.x < t.x ? r.x + h - n : r.x - h + n, p = r.y < t.y ? r.y + u : r.y - u;
    return J.debug(`sides calc abc89, Q ${c}, q ${u}, R ${h}, r ${n}`, { _x: f, _y: p }), n === 0 && (f = t.x, p = t.y), h === 0 && (f = t.x), c === 0 && (p = t.y), { x: f, y: p };
  }
}, "intersection"), bd = /* @__PURE__ */ d((e, t) => {
  J.warn("abc88 cutPathAtIntersect", e, t);
  let r = [], i = e[0], s = !1;
  return e.forEach((o) => {
    if (J.info("abc88 checking point", o, t), !fB(t, o) && !s) {
      const a = pB(t, i, o);
      J.debug("abc88 inside", o, i, a), J.debug("abc88 intersection", a, t);
      let n = !1;
      r.forEach((l) => {
        n = n || l.x === a.x && l.y === a.y;
      }), r.some((l) => l.x === a.x && l.y === a.y) ? J.warn("abc88 no intersect", a, r) : r.push(a), s = !0;
    } else
      J.warn("abc88 outside", o, i), i = o, s || r.push(o);
  }), J.debug("returning points", r), r;
}, "cutPathAtIntersect");
function hy(e) {
  const t = [], r = [];
  for (let i = 1; i < e.length - 1; i++) {
    const s = e[i - 1], o = e[i], a = e[i + 1];
    (s.x === o.x && o.y === a.y && Math.abs(o.x - a.x) > 5 && Math.abs(o.y - s.y) > 5 || s.y === o.y && o.x === a.x && Math.abs(o.x - s.x) > 5 && Math.abs(o.y - a.y) > 5) && (t.push(o), r.push(i));
  }
  return { cornerPoints: t, cornerPointPositions: r };
}
d(hy, "extractCornerPoints");
var kd = /* @__PURE__ */ d(function(e, t, r) {
  const i = t.x - e.x, s = t.y - e.y, o = Math.sqrt(i * i + s * s), a = r / o;
  return { x: t.x - a * i, y: t.y - a * s };
}, "findAdjacentPoint"), gB = /* @__PURE__ */ d(function(e) {
  const { cornerPointPositions: t } = hy(e), r = [];
  for (let i = 0; i < e.length; i++)
    if (t.includes(i)) {
      const s = e[i - 1], o = e[i + 1], a = e[i], n = kd(s, a, 5), l = kd(o, a, 5), c = l.x - n.x, h = l.y - n.y;
      r.push(n);
      const u = Math.sqrt(2) * 2;
      let f = { x: a.x, y: a.y };
      if (Math.abs(o.x - s.x) > 10 && Math.abs(o.y - s.y) >= 10) {
        J.debug(
          "Corner point fixing",
          Math.abs(o.x - s.x),
          Math.abs(o.y - s.y)
        );
        const p = 5;
        a.x === n.x ? f = {
          x: c < 0 ? n.x - p + u : n.x + p - u,
          y: h < 0 ? n.y - u : n.y + u
        } : f = {
          x: c < 0 ? n.x - u : n.x + u,
          y: h < 0 ? n.y - p + u : n.y + p - u
        };
      } else
        J.debug(
          "Corner point skipping fixing",
          Math.abs(o.x - s.x),
          Math.abs(o.y - s.y)
        );
      r.push(f, l);
    } else
      r.push(e[i]);
  return r;
}, "fixCorners"), mB = /* @__PURE__ */ d((e, t, r) => {
  const i = e - t - r, s = 2, o = 2, a = s + o, n = Math.floor(i / a), l = Number.isFinite(n) ? Math.max(0, n) : 0, c = Array(l).fill(`${s} ${o}`).join(" ");
  return `0 ${t} ${c} ${r}`;
}, "generateDashArray"), yB = /* @__PURE__ */ d(function(e, t, r, i, s, o, a, n = !1, l = void 0) {
  if (!a)
    throw new Error(
      `insertEdge: missing diagramId for edge "${t.id}" — edge IDs require a diagram prefix for uniqueness`
    );
  const { handDrawnSeed: c, layout: h } = Ot(), u = l ?? h;
  let f = t.points, p = !1;
  const m = s;
  var y = o;
  const x = [];
  for (const V in t.cssCompiledStyles)
    of(V) || x.push(t.cssCompiledStyles[V]);
  if (u === "swimlane") {
    if (!n && y.intersect && m.intersect && Array.isArray(f) && f.length >= 2)
      if (f.length === 2) {
        const [V, ut] = f;
        f = Cr(V, ut) || br(V, ut) ? [m.intersect(V), y.intersect(ut)] : [m.intersect(ut), y.intersect(V)];
      } else {
        const V = f.slice(1, -1), ut = V[0], xt = V[V.length - 1], wt = m.intersect(ut), Bt = f[f.length - 1], Ct = y.intersect(xt), pt = V.at(-2) ?? f[0], dt = ay(Bt, xt, pt, Ct), _t = ly({
          originalLast: Bt,
          lastInner: xt,
          newLast: dt,
          minLength: ny(t.arrowTypeEnd)
        }), St = Math.abs(wt.x - ut.x) < Ei && Math.abs(wt.y - ut.y) < Ei ? [] : [wt], Pt = _t ? [_t] : [];
        f = [...St, ...V, ...Pt];
      }
    f = dB(t, f);
  } else y.intersect && m.intersect && !n && (f = f.slice(1, t.points.length - 1), f.unshift(m.intersect(f[0])), f.push(y.intersect(f[f.length - 1])));
  const C = btoa(JSON.stringify(f));
  t.toCluster && (J.info("to cluster abc88", r.get(t.toCluster)), f = bd(t.points, r.get(t.toCluster).node), p = !0), t.fromCluster && (J.debug(
    "from cluster abc88",
    r.get(t.fromCluster),
    JSON.stringify(f, null, 2)
  ), f = bd(f.reverse(), r.get(t.fromCluster).node).reverse(), p = !0);
  let b = f.filter((V) => !Number.isNaN(V.y));
  const S = lB(t.curve);
  S !== "rounded" && (b = gB(b));
  let _ = ps;
  switch (S) {
    case "linear":
      _ = ps;
      break;
    case "basis":
      _ = Gn;
      break;
    case "cardinal":
      _ = Yf;
      break;
    case "bumpX":
      _ = Nf;
      break;
    case "bumpY":
      _ = qf;
      break;
    case "catmullRom":
      _ = jf;
      break;
    case "monotoneX":
      _ = Qf;
      break;
    case "monotoneY":
      _ = Jf;
      break;
    case "natural":
      _ = ep;
      break;
    case "step":
      _ = rp;
      break;
    case "stepAfter":
      _ = sp;
      break;
    case "stepBefore":
      _ = ip;
      break;
    case "rounded":
      _ = ps;
      break;
    default:
      _ = Gn;
  }
  const { x: B, y: F } = __(t), A = ew().x(B).y(F).curve(_);
  let L;
  switch (t.thickness) {
    case "normal":
      L = "edge-thickness-normal";
      break;
    case "thick":
      L = "edge-thickness-thick";
      break;
    case "invisible":
      L = "edge-thickness-invisible";
      break;
    default:
      L = "edge-thickness-normal";
  }
  switch (t.pattern) {
    case "solid":
      L += " edge-pattern-solid";
      break;
    case "dotted":
      L += " edge-pattern-dotted";
      break;
    case "dashed":
      L += " edge-pattern-dashed";
      break;
    default:
      L += " edge-pattern-solid";
  }
  let H, N = S === "rounded" ? cy(uy(b, t), 5) : A(b);
  const O = Array.isArray(t.style) ? t.style : [t.style];
  let Q = O.find((V) => V?.startsWith("stroke:")), R = "";
  t.animate && (R = "edge-animation-fast"), t.animation && (R = "edge-animation-" + t.animation);
  let E = !1;
  if (t.look === "handDrawn") {
    const V = ct.svg(e);
    Object.assign([], b);
    const ut = V.path(N, {
      roughness: 0.3,
      seed: c
    });
    L += " transition", H = $t(ut).select("path").attr("id", `${a}-${t.id}`).attr(
      "class",
      " " + L + (t.classes ? " " + t.classes : "") + (R ? " " + R : "")
    ).attr("style", O ? O.reduce((wt, Bt) => wt + ";" + Bt, "") : "");
    let xt = H.attr("d");
    H.attr("d", xt), e.node().appendChild(H.node());
  } else {
    const V = x.join(";"), ut = O ? O.reduce((dt, _t) => dt + _t + ";", "") : "", xt = (V ? V + ";" + ut + ";" : ut) + ";" + (O ? O.reduce((dt, _t) => dt + ";" + _t, "") : "");
    H = e.append("path").attr("d", N).attr("id", `${a}-${t.id}`).attr(
      "class",
      " " + L + (t.classes ? " " + t.classes : "") + (R ? " " + R : "")
    ).attr("style", xt), Q = xt.match(/stroke:([^;]+)/)?.[1], E = t.animate === !0 || !!t.animation || V.includes("animation");
    const wt = H.node(), Bt = typeof wt.getTotalLength == "function" ? wt.getTotalLength() : 0, Ct = hd[t.arrowTypeStart] || 0, pt = hd[t.arrowTypeEnd] || 0;
    if (t.look === "neo" && !E) {
      const _t = `stroke-dasharray: ${t.pattern === "dotted" || t.pattern === "dashed" ? mB(Bt, Ct, pt) : `0 ${Ct} ${Bt - Ct - pt} ${pt}`}; stroke-dashoffset: 0;`;
      H.attr("style", _t + H.attr("style"));
    }
  }
  if (H.attr("data-edge", !0), H.attr("data-et", "edge"), H.attr("data-id", t.id), H.attr("data-points", C), H.attr("data-look", te(t.look)), t.step !== void 0) {
    const { themeVariables: V } = Ot(), ut = Q ?? V?.lineColor;
    sB(e, t, N, a, {
      points: b,
      pathNode: H.node(),
      color: ut,
      textColors: [V?.background, V?.primaryTextColor]
    });
  }
  t.showPoints && b.forEach((V) => {
    e.append("circle").style("stroke", "red").style("fill", "red").attr("r", 1).attr("cx", V.x).attr("cy", V.y);
  });
  let I = "";
  (Ot().flowchart.arrowMarkerAbsolute || Ot().state.arrowMarkerAbsolute) && (I = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, I = I.replace(/\(/g, "\\(").replace(/\)/g, "\\)")), J.info("arrowTypeStart", t.arrowTypeStart), J.info("arrowTypeEnd", t.arrowTypeEnd);
  const v = !E && t?.look === "neo";
  oB(H, t, I, a, i, v, Q);
  const W = Math.floor(f.length / 2), q = f[W];
  _e.isLabelCoordinateInPath(q, H.attr("d")) || (p = !0);
  let rt = {};
  return p && (rt.updatedPath = f), rt.originalPath = t.points, rt;
}, "insertEdge");
function cy(e, t) {
  if (e.length < 2)
    return "";
  let r = "";
  const i = e.length, s = 1e-5;
  for (let o = 0; o < i; o++) {
    const a = e[o], n = e[o - 1], l = e[o + 1];
    if (o === 0)
      r += `M${a.x},${a.y}`;
    else if (o === i - 1)
      r += `L${a.x},${a.y}`;
    else {
      const c = a.x - n.x, h = a.y - n.y, u = l.x - a.x, f = l.y - a.y, p = Math.hypot(c, h), m = Math.hypot(u, f);
      if (p < s || m < s) {
        r += `L${a.x},${a.y}`;
        continue;
      }
      const y = c / p, x = h / p, C = u / m, b = f / m, S = y * C + x * b, _ = Math.max(-1, Math.min(1, S)), B = Math.acos(_);
      if (B < s || Math.abs(Math.PI - B) < s) {
        r += `L${a.x},${a.y}`;
        continue;
      }
      const F = Math.min(t / Math.sin(B / 2), p / 2, m / 2), A = a.x - y * F, L = a.y - x * F, H = a.x + C * F, N = a.y + b * F;
      r += `L${A},${L}`, r += `Q${a.x},${a.y} ${H},${N}`;
    }
  }
  return r;
}
d(cy, "generateRoundedPath");
function ul(e, t) {
  if (!e || !t)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  const r = t.x - e.x, i = t.y - e.y;
  return { angle: Math.atan2(i, r), deltaX: r, deltaY: i };
}
d(ul, "calculateDeltaAndAngle");
function uy(e, t) {
  const r = e.map((s) => ({ ...s }));
  if (e.length >= 2 && ae[t.arrowTypeStart]) {
    const s = ae[t.arrowTypeStart], o = e[0], a = e[1], { angle: n } = ul(o, a), l = s * Math.cos(n), c = s * Math.sin(n);
    r[0].x = o.x + l, r[0].y = o.y + c;
  }
  const i = e.length;
  if (i >= 2 && ae[t.arrowTypeEnd]) {
    const s = ae[t.arrowTypeEnd], o = e[i - 1], a = e[i - 2], { angle: n } = ul(a, o), l = s * Math.cos(n), c = s * Math.sin(n);
    r[i - 1].x = o.x - l, r[i - 1].y = o.y - c;
  }
  return r;
}
d(uy, "applyMarkerOffsetsToPoints");
var xB = /* @__PURE__ */ d((e, t, r, i) => {
  t.forEach((s) => {
    YB[s](e, r, i);
  });
}, "insertMarkers"), CB = /* @__PURE__ */ d((e, t, r) => {
  J.trace("Making markers for ", r), e.append("defs").append("marker").attr("id", r + "_" + t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 1,1 V 13 L18,7 Z"), e.append("marker").attr("id", r + "_" + t + "-extensionStart-margin").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("viewBox", "0 0 20 14").append("polygon").attr("points", "10,7 18,13 18,1").style("stroke-width", 2).style("stroke-dasharray", "0"), e.append("defs").append("marker").attr("id", r + "_" + t + "-extensionEnd-margin").attr("class", "marker extension " + t).attr("refX", 9).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("viewBox", "0 0 20 14").append("polygon").attr("points", "10,1 10,13 18,7").style("stroke-width", 2).style("stroke-dasharray", "0");
}, "extension"), bB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionStart-margin").attr("class", "marker composition " + t).attr("refX", 15).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("viewBox", "0 0 15 15").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-compositionEnd-margin").attr("class", "marker composition " + t).attr("refX", 3.5).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "composition"), kB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationStart-margin").attr("class", "marker aggregation " + t).attr("refX", 15).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 2).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-aggregationEnd-margin").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 2).attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "aggregation"), wB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyStart-margin").attr("class", "marker dependency " + t).attr("refX", 4).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-dependencyEnd-margin").attr("class", "marker dependency " + t).attr("refX", 16).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").style("stroke-width", 0).attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "dependency"), SB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopStart-margin").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6).attr("stroke-width", 2), e.append("defs").append("marker").attr("id", r + "_" + t + "-lollipopEnd-margin").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("circle").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6).attr("stroke-width", 2);
}, "lollipop"), TB = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-pointEnd-margin").attr("class", "marker " + t).attr("viewBox", "0 0 11.5 14").attr("refX", 11.5).attr("refY", 7).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 10.5).attr("markerHeight", 14).attr("orient", "auto").append("path").attr("d", "M 0 0 L 11.5 7 L 0 14 z").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-pointStart-margin").attr("class", "marker " + t).attr("viewBox", "0 0 11.5 14").attr("refX", 1).attr("refY", 7).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11.5).attr("markerHeight", 14).attr("orient", "auto").append("polygon").attr("points", "0,7 11.5,14 11.5,0").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0");
}, "point"), _B = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-circleEnd-margin").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refY", 5).attr("refX", 12.25).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 14).attr("markerHeight", 14).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-circleStart-margin").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -2).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 14).attr("markerHeight", 14).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 0).style("stroke-dasharray", "1,0");
}, "circle"), BB = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), e.append("marker").attr("id", r + "_" + t + "-crossEnd-margin").attr("class", "marker cross " + t).attr("viewBox", "0 0 15 15").attr("refX", 17.7).attr("refY", 7.5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 1,1 L 14,14 M 1,14 L 14,1").attr("class", "arrowMarkerPath").style("stroke-width", 2.5), e.append("marker").attr("id", r + "_" + t + "-crossStart-margin").attr("class", "marker cross " + t).attr("viewBox", "0 0 15 15").attr("refX", -3.5).attr("refY", 7.5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 1,1 L 14,14 M 1,14 L 14,1").attr("class", "arrowMarkerPath").style("stroke-width", 2.5).style("stroke-dasharray", "1,0");
}, "cross"), vB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "barb"), LB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { transitionColor: o } = s;
  e.append("defs").append("marker").attr("id", r + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L11,14 L13,7 L11,0 Z"), e.append("defs").append("marker").attr("id", r + "_" + t + "-barbEnd-margin").attr("refX", 17).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L11,14 L13,7 L11,0 Z").attr("fill", `${o}`);
}, "barbNeo"), FB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneStart").attr("class", "marker onlyOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18"), e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneEnd").attr("class", "marker onlyOne " + t).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18");
}, "only_one"), AB = /* @__PURE__ */ d((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  i.append("circle").attr("fill", "white").attr("cx", 21).attr("cy", 9).attr("r", 6), i.append("path").attr("d", "M9,0 L9,18");
  const s = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + t).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto");
  s.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 9).attr("r", 6), s.append("path").attr("d", "M21,0 L21,18");
}, "zero_or_one"), MB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreStart").attr("class", "marker oneOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"), e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + t).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18");
}, "one_or_more"), EB = /* @__PURE__ */ d((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  i.append("circle").attr("fill", "white").attr("cx", 48).attr("cy", 18).attr("r", 6), i.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18");
  const s = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + t).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto");
  s.append("circle").attr("fill", "white").attr("cx", 9).attr("cy", 18).attr("r", 6), s.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18");
}, "zero_or_more"), $B = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o } = s;
  e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneStart").attr("class", "marker onlyOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M9,0 L9,18 M15,0 L15,18").attr("stroke-width", `${o}`), e.append("defs").append("marker").attr("id", r + "_" + t + "-onlyOneEnd").attr("class", "marker onlyOne " + t).attr("refX", 18).attr("refY", 9).attr("markerWidth", 18).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M3,0 L3,18 M9,0 L9,18").attr("stroke-width", `${o}`);
}, "only_one_neo"), OB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o, mainBkg: a } = s, n = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneStart").attr("class", "marker zeroOrOne " + t).attr("refX", 0).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse");
  n.append("circle").attr("fill", a ?? "white").attr("cx", 21).attr("cy", 9).attr("stroke-width", `${o}`).attr("r", 6), n.append("path").attr("d", "M9,0 L9,18").attr("stroke-width", `${o}`);
  const l = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrOneEnd").attr("class", "marker zeroOrOne " + t).attr("refX", 30).attr("refY", 9).attr("markerWidth", 30).attr("markerHeight", 18).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto");
  l.append("circle").attr("fill", a ?? "white").attr("cx", 9).attr("cy", 9).attr("stroke-width", `${o}`).attr("r", 6), l.append("path").attr("d", "M21,0 L21,18").attr("stroke-width", `${o}`);
}, "zero_or_one_neo"), DB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o } = s;
  e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreStart").attr("class", "marker oneOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("path").attr("d", "M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27").attr("stroke-width", `${o}`), e.append("defs").append("marker").attr("id", r + "_" + t + "-oneOrMoreEnd").attr("class", "marker oneOrMore " + t).attr("refX", 27).attr("refY", 18).attr("markerWidth", 45).attr("markerHeight", 36).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18").attr("stroke-width", `${o}`);
}, "one_or_more_neo"), IB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o, mainBkg: a } = s, n = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreStart").attr("class", "marker zeroOrMore " + t).attr("refX", 18).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto");
  n.append("circle").attr("fill", a ?? "white").attr("cx", 45.5).attr("cy", 18).attr("r", 6).attr("stroke-width", `${o}`), n.append("path").attr("d", "M0,18 Q18,0 36,18 Q18,36 0,18").attr("stroke-width", `${o}`);
  const l = e.append("defs").append("marker").attr("id", r + "_" + t + "-zeroOrMoreEnd").attr("class", "marker zeroOrMore " + t).attr("refX", 39).attr("refY", 18).attr("markerWidth", 57).attr("markerHeight", 36).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse");
  l.append("circle").attr("fill", a ?? "white").attr("cx", 11).attr("cy", 18).attr("r", 6).attr("stroke-width", `${o}`), l.append("path").attr("d", "M21,18 Q39,0 57,18 Q39,36 21,18").attr("stroke-width", `${o}`);
}, "zero_or_more_neo"), PB = /* @__PURE__ */ d((e, t, r) => {
  e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("path").attr(
    "d",
    `M0,0
      L20,10
      M20,10
      L0,20`
  );
}, "requirement_arrow"), RB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o } = s;
  e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_arrowEnd").attr("refX", 20).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").attr("stroke-width", `${o}`).attr("viewBox", "0 0 25 20").append("path").attr(
    "d",
    `M0,0
      L20,10
      M20,10
      L0,20`
  ).attr("stroke-linejoin", "miter");
}, "requirement_arrow_neo"), NB = /* @__PURE__ */ d((e, t, r) => {
  const i = e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").append("g");
  i.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none"), i.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10), i.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10);
}, "requirement_contains"), qB = /* @__PURE__ */ d((e, t, r) => {
  const i = Ut(), { themeVariables: s } = i, { strokeWidth: o } = s, a = e.append("defs").append("marker").attr("id", r + "_" + t + "-requirement_containsStart").attr("refX", 0).attr("refY", 10).attr("markerWidth", 20).attr("markerHeight", 20).attr("orient", "auto").attr("markerUnits", "userSpaceOnUse").append("g");
  a.append("circle").attr("cx", 10).attr("cy", 10).attr("r", 9).attr("fill", "none"), a.append("line").attr("x1", 1).attr("x2", 19).attr("y1", 10).attr("y2", 10), a.append("line").attr("y1", 1).attr("y2", 19).attr("x1", 10).attr("x2", 10), a.selectAll("*").attr("stroke-width", `${o}`);
}, "requirement_contains_neo"), WB = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-hierarchyEnd").attr("class", "marker hierarchy " + t).attr("viewBox", "0 0 12 10").attr("refX", 10).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 10).attr("orient", "auto").append("path").attr("d", "M 0 0 L 6 5 L 0 10 M 4 0 L 10 5 L 4 10").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0").style("fill", "none"), e.append("marker").attr("id", r + "_" + t + "-hierarchyStart").attr("class", "marker hierarchy " + t).attr("viewBox", "0 0 12 10").attr("refX", 2).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 10).attr("orient", "auto").append("path").attr("d", "M 12 0 L 6 5 L 12 10 M 8 0 L 2 5 L 8 10").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0").style("fill", "none");
}, "hierarchy"), zB = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-openArrowEnd").attr("class", "marker openArrow " + t).attr("viewBox", "0 0 12 12").attr("refX", 11).attr("refY", 6).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 1 1 L 11 6 L 1 11").attr("class", "arrowMarkerPath").style("stroke-width", 1.4).style("stroke-linecap", "round").style("stroke-linejoin", "round").style("stroke-dasharray", "1,0").style("fill", "none"), e.append("marker").attr("id", r + "_" + t + "-openArrowStart").attr("class", "marker openArrow " + t).attr("viewBox", "0 0 12 12").attr("refX", 1).attr("refY", 6).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 11 1 L 1 6 L 11 11").attr("class", "arrowMarkerPath").style("stroke-width", 1.4).style("stroke-linecap", "round").style("stroke-linejoin", "round").style("stroke-dasharray", "1,0").style("fill", "none");
}, "openArrow"), HB = /* @__PURE__ */ d((e, t, r) => {
  e.append("marker").attr("id", r + "_" + t + "-hollowCircleStart").attr("class", "marker hollowCircle " + t).attr("viewBox", "0 0 10 10").attr("refX", 0).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("circle").attr("cx", 5).attr("cy", 5).attr("r", 3.6).attr("class", "arrowMarkerPath").style("stroke-width", 1.4).style("stroke-dasharray", "1,0").style("fill", "none"), e.append("marker").attr("id", r + "_" + t + "-hollowCircleEnd").attr("class", "marker hollowCircle " + t).attr("viewBox", "0 0 10 10").attr("refX", 10).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("circle").attr("cx", 5).attr("cy", 5).attr("r", 3.6).attr("class", "arrowMarkerPath").style("stroke-width", 1.4).style("stroke-dasharray", "1,0").style("fill", "none");
}, "hollowCircle"), YB = {
  extension: CB,
  composition: bB,
  aggregation: kB,
  dependency: wB,
  lollipop: SB,
  point: TB,
  circle: _B,
  cross: BB,
  barb: vB,
  barbNeo: LB,
  hierarchy: WB,
  only_one: FB,
  zero_or_one: AB,
  one_or_more: MB,
  zero_or_more: EB,
  only_one_neo: $B,
  zero_or_one_neo: OB,
  one_or_more_neo: DB,
  zero_or_more_neo: IB,
  requirement_arrow: PB,
  requirement_contains: NB,
  requirement_arrow_neo: RB,
  requirement_contains_neo: qB,
  openArrow: zB,
  hollowCircle: HB
}, UB = xB, jB = {
  common: _s,
  getConfig: Ut,
  insertCluster: T_,
  insertEdge: yB,
  insertEdgeLabel: hB,
  insertMarkers: UB,
  insertNode: Gm,
  interpolateToCurve: oh,
  labelHelper: yt,
  log: J,
  positionEdgeLabel: uB
}, GB = [
  "elk.stress",
  "elk.force",
  "elk.mrtree",
  "elk.sporeOverlap",
  "elk.box",
  "elk.rectpacking"
], ws = /* @__PURE__ */ Object.create(null), dy = /* @__PURE__ */ d((e) => {
  for (const t of e)
    ws[t.name] = t;
}, "registerLayoutLoaders"), XB = /* @__PURE__ */ d(() => {
  const e = /* @__PURE__ */ d(async () => await import("./elk-XV6XMXQE-CIFfyhWf.js"), "loader");
  return [
    { name: "elk", loader: e, algorithm: "elk.layered" },
    ...GB.map((t) => ({ name: t, loader: e, algorithm: t }))
  ];
}, "elkLayoutLoaders"), VB = /* @__PURE__ */ d(() => {
  dy([
    {
      name: "dagre",
      loader: /* @__PURE__ */ d(async () => await import("./dagre-SPEB5RXH-B0AyWitV.js"), "loader")
    },
    {
      name: "swimlane",
      loader: /* @__PURE__ */ d(async () => await import("./swimlanes-UMQ2AFYF-iGsZgVFV.js"), "loader")
    },
    {
      name: "cose-bilkent",
      loader: /* @__PURE__ */ d(async () => await import("./cose-bilkent-JH36ORCC-jqZroN8L.js"), "loader")
    },
    ...XB()
  ]);
}, "registerDefaultLayoutLoaders");
VB();
var vM = /* @__PURE__ */ d(async (e, t) => {
  if (!Object.hasOwn(ws, e.layoutAlgorithm))
    throw new Error(`Unknown layout algorithm: ${e.layoutAlgorithm}`);
  if (e.diagramId)
    for (const o of e.nodes) {
      const a = o.domId || o.id;
      o.domId = `${e.diagramId}-${a}`;
    }
  const r = ws[e.layoutAlgorithm], i = await r.loader();
  G0(t, e.config);
  const s = await i.render(e, t, jB, {
    algorithm: r.algorithm
  });
  return iB(t.node()), s;
}, "render"), vn = "dagre", LM = /* @__PURE__ */ d((e = "", { fallback: t = vn } = {}) => {
  if (Object.hasOwn(ws, e))
    return e;
  for (const r of [t, vn])
    if (Object.hasOwn(ws, r))
      return J.warn(`Layout algorithm ${e} is not registered. Using ${r} as fallback.`), r;
  throw new Error(
    `Neither layout algorithm ${e}, ${t}, nor ${vn} is registered.`
  );
}, "getRegisteredLayoutAlgorithm"), ZB = /* @__PURE__ */ d((e) => {
  const { securityLevel: t } = Ot();
  let r = $t("body");
  if (t === "sandbox") {
    const o = $t(`#i${e}`).node()?.contentDocument ?? document;
    r = $t(o.body);
  }
  return r.select(`#${e}`);
}, "selectSvgElement"), Eh = "comm", fy = "rule", py = "decl", KB = "@media", QB = "@import", JB = "@supports", tv = "@namespace", dl = "@keyframes", gy = "@layer", ev = "@scope", rv = Math.abs, ms = String.fromCharCode;
function my(e) {
  return e.trim();
}
function fl(e, t, r) {
  return e.replace(t, r);
}
function Li(e, t) {
  return e.charCodeAt(t) | 0;
}
function $i(e, t, r) {
  return e.slice(t, r);
}
function er(e) {
  return e.length;
}
function yy(e) {
  return e.length;
}
function ro(e, t) {
  return t.push(e), e;
}
var pa = 1, Oi = 1, xy = 0, $e = 0, Qt = 0, Ni = "";
function $h(e, t, r, i, s, o, a, n) {
  return { value: e, root: t, parent: r, type: i, props: s, children: o, line: pa, column: Oi, length: a, return: "", siblings: n };
}
function iv() {
  return Qt;
}
function sv() {
  return Qt = $e > 0 ? Li(Ni, --$e) : 0, Oi--, Qt === 10 && (Oi = 1, pa--), Qt;
}
function Ye() {
  return Qt = $e < xy ? Li(Ni, $e++) : 0, Oi++, Qt === 10 && (Oi = 1, pa++), Qt;
}
function Rr() {
  return Li(Ni, $e);
}
function mo() {
  return $e;
}
function ga(e, t) {
  return $i(Ni, e, t);
}
function Ss(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function ov(e) {
  return pa = Oi = 1, xy = er(Ni = e), $e = 0, [];
}
function av(e) {
  return Ni = "", e;
}
function Ln(e) {
  return my(ga($e - 1, pl(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function nv(e) {
  for (; (Qt = Rr()) && Qt < 33; )
    Ye();
  return Ss(e) > 2 || Ss(Qt) > 3 ? "" : " ";
}
function lv(e, t) {
  for (; --t && Ye() && !(Qt < 48 || Qt > 102 || Qt > 57 && Qt < 65 || Qt > 70 && Qt < 97); )
    ;
  return ga(e, mo() + (t < 6 && Rr() == 32 && Ye() == 32));
}
function pl(e) {
  for (; Ye(); )
    switch (Qt) {
      // ] ) " '
      case e:
        return $e;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && pl(Qt);
        break;
      // (
      case 40:
        e === 41 && pl(e);
        break;
      // \
      case 92:
        Ye();
        break;
    }
  return $e;
}
function hv(e, t) {
  for (; Ye() && e + Qt !== 57; )
    if (e + Qt === 84 && Rr() === 47)
      break;
  return "/*" + ga(t, $e - 1) + "*" + ms(e === 47 ? e : Ye());
}
function cv(e) {
  for (; !Ss(Rr()); )
    Ye();
  return ga(e, $e);
}
function uv(e) {
  return av(yo("", null, null, null, [""], e = ov(e), 0, [0], e));
}
function yo(e, t, r, i, s, o, a, n, l) {
  for (var c = 0, h = 0, u = a, f = 0, p = 0, m = 0, y = 1, x = 1, C = 1, b = 0, S = 0, _ = "", B = s, F = o, A = i, L = _; x; )
    switch (m = S, S = Ye()) {
      // (
      case 40:
        m != 108 && Li(L, u - 1) == 58 ? (b++, L += "(") : L += Ln(S);
        break;
      // )
      case 41:
        b--, L += ")";
        break;
      // " ' [
      case 34:
      case 39:
      case 91:
        L += Ln(S);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        if (b > 0) {
          L += ms(S);
          break;
        }
        L += nv(m);
        break;
      // \
      case 92:
        L += lv(mo() - 1, 7);
        continue;
      // /
      case 47:
        switch (Rr()) {
          case 42:
          case 47:
            ro(dv(hv(Ye(), mo()), t, r, l), l), (Ss(m || 1) == 5 || Ss(Rr() || 1) == 5) && er(L) && $i(L, -1, void 0) !== " " && (L += " ");
            break;
          default:
            L += "/";
        }
        break;
      // {
      case 123 * y:
        n[c++] = er(L) * C;
      // } ; \0
      case 125 * y:
      case 59:
      case 0:
        if (b > 0 && S) {
          L += ms(S);
          break;
        }
        switch (S) {
          // \0 }
          case 0:
          case 125:
            x = 0;
          // ;
          case 59 + h:
            C == -1 && (L = fl(L, /\f/g, "")), p > 0 && (er(L) - u || y === 0) && ro(p > 32 ? Sd(L + ";", i, r, u - 1, l) : Sd(fl(L, " ", "") + ";", i, r, u - 2, l), l);
            break;
          // @ ;
          case 59:
            L += ";";
          // { rule/at-rule
          default:
            if (ro(A = wd(L, t, r, c, h, s, n, _, B = [], F = [], u, o), o), S === 123)
              if (h === 0)
                yo(L, t, A, A, B, o, u, n, F);
              else {
                switch (f) {
                  // c(ontainer)
                  case 99:
                    if (Li(L, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (Li(L, 2) === 97) break;
                  default:
                    h = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                h ? yo(e, A, A, i && ro(wd(e, A, A, 0, 0, s, n, _, s, B = [], u, F), F), s, F, u, n, i ? B : F) : yo(L, A, A, A, [""], F, 0, n, F);
              }
        }
        c = h = p = 0, y = C = 1, _ = L = "", u = a;
        break;
      // :
      case 58:
        u = 1 + er(L), p = m;
      default:
        if (y < 1) {
          if (S == 123)
            --y;
          else if (S == 125 && y++ == 0 && sv() == 125)
            continue;
        }
        switch (L += ms(S), S * y) {
          // &
          case 38:
            C = h > 0 ? 1 : (L += "\f", -1);
            break;
          // ,
          case 44:
            if (b > 0) break;
            n[c++] = (er(L) - 1) * C, C = 1;
            break;
          // @
          case 64:
            Rr() === 45 && (L += Ln(Ye())), f = Rr(), h = u = er(_ = L += cv(mo())), S++;
            break;
          // -
          case 45:
            m === 45 && er(L) == 2 && (y = 0);
        }
    }
  return o;
}
function wd(e, t, r, i, s, o, a, n, l, c, h, u) {
  for (var f = s - 1, p = s === 0 ? o : [""], m = yy(p), y = 0, x = 0, C = 0; y < i; ++y)
    for (var b = 0, S = $i(e, f + 1, f = rv(x = a[y])), _ = e; b < m; ++b)
      (_ = my(x > 0 ? p[b] + " " + S : fl(S, /&\f/g, p[b]))) && (l[C++] = _);
  return $h(e, t, r, s === 0 ? fy : n, l, c, h, u);
}
function dv(e, t, r, i) {
  return $h(e, t, r, Eh, ms(iv()), $i(e, 2, -2), 0, i);
}
function Sd(e, t, r, i, s) {
  return $h(e, t, r, py, $i(e, 0, i), $i(e, i + 1, -1), i, s);
}
function gl(e, t) {
  for (var r = "", i = 0; i < e.length; i++)
    r += t(e[i], i, e, t) || "";
  return r;
}
function fv(e, t, r, i) {
  switch (e.type) {
    case gy:
      if (e.children.length) break;
    case QB:
    case tv:
    case py:
      return e.return = e.return || e.value;
    case Eh:
      return "";
    case dl:
      return e.return = e.value + "{" + gl(e.children, i) + "}";
    case fy:
      if (!er(e.value = e.props.join(","))) return "";
  }
  return er(r = gl(e.children, i)) ? e.return = e.value + "{" + r + "}" : "";
}
function pv(e) {
  var t = yy(e);
  return function(r, i, s, o) {
    for (var a = "", n = 0; n < t; n++)
      a += e[n](r, i, s, o) || "";
    return a;
  };
}
var Cy = "c4", gv = /* @__PURE__ */ d((e) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(e), "detector"), mv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./c4Diagram-KJ2TOQU5-DpdSYY1X.js");
  return { id: Cy, diagram: e };
}, "loader"), yv = {
  id: Cy,
  detector: gv,
  loader: mv
}, xv = yv, by = "flowchart-v2", Cv = /* @__PURE__ */ d((e) => /^\s*(graph|flowchart)/.test(e), "detector"), bv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./flowDiagram-MALGAFMO-DvlhdWVs.js");
  return { id: by, diagram: e };
}, "loader"), kv = {
  id: by,
  detector: Cv,
  loader: bv
}, wv = kv, ky = "agentflow", Sv = /* @__PURE__ */ d((e) => /^\s*agentflow-beta\b/.test(e), "detector"), Tv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-3B7GL73J-DDXiIHA8.js");
  return { id: ky, diagram: e };
}, "loader"), _v = {
  id: ky,
  detector: Sv,
  loader: Tv
}, Bv = _v, wy = "swimlane", vv = /* @__PURE__ */ d((e) => /^\s*swimlane-beta\b/.test(e), "detector"), Lv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./swimlanesDiagram-OMPLPG4O-DNVKxYbV.js");
  return { id: wy, diagram: e };
}, "loader"), Fv = {
  id: wy,
  detector: vv,
  loader: Lv
}, Av = Fv, Sy = "er", Mv = /* @__PURE__ */ d((e) => /^\s*erDiagram/.test(e), "detector"), Ev = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./erDiagram-EYBAPDEH-C7JUJunp.js");
  return { id: Sy, diagram: e };
}, "loader"), $v = {
  id: Sy,
  detector: Mv,
  loader: Ev
}, Ov = $v, Ty = "gitGraph", Dv = /* @__PURE__ */ d((e) => /^\s*gitGraph/.test(e), "detector"), Iv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./gitGraphDiagram-STJD7YCW-D9EsfC26.js");
  return { id: Ty, diagram: e };
}, "loader"), Pv = {
  id: Ty,
  detector: Dv,
  loader: Iv
}, Rv = Pv, _y = "gantt", Nv = /* @__PURE__ */ d((e) => /^\s*gantt/.test(e), "detector"), qv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./ganttDiagram-23REXITY-DA3BMk3k.js");
  return { id: _y, diagram: e };
}, "loader"), Wv = {
  id: _y,
  detector: Nv,
  loader: qv
}, zv = Wv, By = "info", Hv = /* @__PURE__ */ d((e) => /^\s*info/.test(e), "detector"), Yv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./infoDiagram-KBXO4MBG-Cf70NbcL.js");
  return { id: By, diagram: e };
}, "loader"), Uv = {
  id: By,
  detector: Hv,
  loader: Yv
}, vy = "pie", jv = /* @__PURE__ */ d((e) => /^\s*pie/.test(e), "detector"), Gv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./pieDiagram-J4AKIIQI-DpyHcBKm.js");
  return { id: vy, diagram: e };
}, "loader"), Xv = {
  id: vy,
  detector: jv,
  loader: Gv
}, Ly = "quadrantChart", Vv = /* @__PURE__ */ d((e) => /^\s*quadrantChart/.test(e), "detector"), Zv = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./quadrantDiagram-XTYBLID2-k_WajSXe.js");
  return { id: Ly, diagram: e };
}, "loader"), Kv = {
  id: Ly,
  detector: Vv,
  loader: Zv
}, Qv = Kv, Fy = "xychart", Jv = /* @__PURE__ */ d((e) => /^\s*xychart(-beta)?/.test(e), "detector"), tL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./xychartDiagram-GGNKY7IX-CPLKwV9J.js");
  return { id: Fy, diagram: e };
}, "loader"), eL = {
  id: Fy,
  detector: Jv,
  loader: tL
}, rL = eL, Ay = "requirement", iL = /* @__PURE__ */ d((e) => /^\s*requirement(Diagram)?/.test(e), "detector"), sL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./requirementDiagram-Y7LWUY3S-Bf0F8qTz.js");
  return { id: Ay, diagram: e };
}, "loader"), oL = {
  id: Ay,
  detector: iL,
  loader: sL
}, aL = oL, My = "sequence", nL = /* @__PURE__ */ d((e) => /^\s*sequenceDiagram/.test(e), "detector"), lL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./sequenceDiagram-5NDRBG5M-BS2cM36T.js");
  return { id: My, diagram: e };
}, "loader"), hL = {
  id: My,
  detector: nL,
  loader: lL
}, cL = hL, Ey = "classDiagram", uL = /* @__PURE__ */ d((e) => /^\s*classDiagram/.test(e), "detector"), dL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./classDiagram-v2-L25IHNXF-Djbj1F-M.js");
  return { id: Ey, diagram: e };
}, "loader"), fL = {
  id: Ey,
  detector: uL,
  loader: dL
}, pL = fL, $y = "stateDiagram", gL = /* @__PURE__ */ d((e) => /^\s*stateDiagram/.test(e), "detector"), mL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./stateDiagram-v2-FJ4FJNEA-DzoGMM8F.js");
  return { id: $y, diagram: e };
}, "loader"), yL = {
  id: $y,
  detector: gL,
  loader: mL
}, xL = yL, Oy = "journey", CL = /* @__PURE__ */ d((e) => /^\s*journey/.test(e), "detector"), bL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./journeyDiagram-OPLOXDXO-DafmWkjp.js");
  return { id: Oy, diagram: e };
}, "loader"), kL = {
  id: Oy,
  detector: CL,
  loader: bL
}, wL = kL, io = 4, Ji = 75, SL = /* @__PURE__ */ d((e) => {
  const t = [];
  for (const s of e.split(/\s+/)) {
    let o = [...s];
    for (; o.length > Ji; )
      t.push(o.slice(0, Ji).join("")), o = o.slice(Ji);
    o.length > 0 && t.push(o.join(""));
  }
  const r = [];
  let i = "";
  for (const s of t) {
    const o = i ? `${i} ${s}` : s;
    [...o].length > Ji ? (r.push(i), i = s) : i = o;
  }
  if (i && r.push(i), r.length > io) {
    r.length = io;
    const s = r[io - 1] ?? "";
    r[io - 1] = `${[...s].slice(0, Ji - 3).join("")}...`;
  }
  return r;
}, "wrapErrorMessage"), TL = /* @__PURE__ */ d((e, t, r, i) => {
  J.debug(`rendering svg for syntax error
`);
  const s = ZB(t), o = s.append("g"), a = SL(i?.db.getErrorMessage?.() ?? ""), n = a.length > 0 ? 500 + a.length * 56 : 512;
  s.attr("viewBox", `0 0 2412 ${n}`), rf(s, 100, n, !0), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
  ), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
  ), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
  ), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
  ), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
  ), o.append("path").attr("class", "error-icon").attr(
    "d",
    "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
  ), o.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), o.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${r}`), a.forEach((l, c) => {
    o.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 510 + c * 56).attr("font-size", "42px").style("text-anchor", "middle").text(l);
  });
}, "draw"), Dy = { draw: TL }, _L = Dy, Fn, BL = {
  clear() {
    Fn = void 0;
  },
  setErrorMessage(e) {
    Fn = e;
  },
  getErrorMessage() {
    return Fn;
  }
}, vL = {
  db: BL,
  renderer: Dy,
  parser: {
    parse: /* @__PURE__ */ d(() => {
    }, "parse")
  }
}, LL = vL, Iy = "flowchart-elk", FL = /* @__PURE__ */ d((e, t = {}) => /^\s*flowchart-elk/.test(e) ? (t.layout = "elk", !0) : !1, "detector"), AL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./flowDiagram-MALGAFMO-DvlhdWVs.js");
  return { id: Iy, diagram: e };
}, "loader"), ML = {
  id: Iy,
  detector: FL,
  loader: AL
}, EL = ML, Py = "timeline", $L = /* @__PURE__ */ d((e) => /^\s*timeline/.test(e), "detector"), OL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./timeline-definition-SEUHKTQE-BZwC1xsd.js");
  return { id: Py, diagram: e };
}, "loader"), DL = {
  id: Py,
  detector: $L,
  loader: OL
}, IL = DL, Ry = "mindmap", PL = /* @__PURE__ */ d((e) => /^\s*mindmap/.test(e), "detector"), RL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./mindmap-definition-I2QAS2VK-B8i5017D.js");
  return { id: Ry, diagram: e };
}, "loader"), NL = {
  id: Ry,
  detector: PL,
  loader: RL
}, qL = NL, Ny = "kanban", WL = /* @__PURE__ */ d((e) => /^\s*kanban/.test(e), "detector"), zL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./kanban-definition-BZKZHSQY-PrBnK0b_.js");
  return { id: Ny, diagram: e };
}, "loader"), HL = {
  id: Ny,
  detector: WL,
  loader: zL
}, YL = HL, qy = "sankey", UL = /* @__PURE__ */ d((e) => /^\s*sankey(-beta)?/.test(e), "detector"), jL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./sankeyDiagram-WGJFYUXA-C4AeCCgV.js");
  return { id: qy, diagram: e };
}, "loader"), GL = {
  id: qy,
  detector: UL,
  loader: jL
}, XL = GL, Wy = "packet", VL = /* @__PURE__ */ d((e) => /^\s*packet(-beta)?/.test(e), "detector"), ZL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-DNEMPZML-BFAKQmYA.js");
  return { id: Wy, diagram: e };
}, "loader"), KL = {
  id: Wy,
  detector: VL,
  loader: ZL
}, zy = "radar", QL = /* @__PURE__ */ d((e) => /^\s*radar-beta/.test(e), "detector"), JL = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-L3MUGCDN-BMDuIEQm.js");
  return { id: zy, diagram: e };
}, "loader"), tF = {
  id: zy,
  detector: QL,
  loader: JL
}, Hy = "block", eF = /* @__PURE__ */ d((e) => /^\s*block(-beta)?/.test(e), "detector"), rF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./blockDiagram-APKKGZFW-DyUffsjM.js");
  return { id: Hy, diagram: e };
}, "loader"), iF = {
  id: Hy,
  detector: eF,
  loader: rF
}, sF = iF, Yy = "treeView", oF = /* @__PURE__ */ d((e) => /^\s*treeView-beta/.test(e), "detector"), aF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-XPFHEONP-5vXTcYTK.js");
  return { id: Yy, diagram: e };
}, "loader"), nF = {
  id: Yy,
  detector: oF,
  loader: aF
}, lF = nF, Uy = "architecture", hF = /* @__PURE__ */ d((e) => /^\s*architecture/.test(e), "detector"), cF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./architectureDiagram-YGSQEFNW-D_fZIotl.js");
  return { id: Uy, diagram: e };
}, "loader"), uF = {
  id: Uy,
  detector: hF,
  loader: cF
}, dF = uF, jy = "eventmodeling", fF = /* @__PURE__ */ d((e) => /^\s*eventmodeling/.test(e), "detector"), pF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-MHCOC4E2-D-LV4vGJ.js");
  return { id: jy, diagram: e };
}, "loader"), gF = {
  id: jy,
  detector: fF,
  loader: pF
}, mF = gF, Gy = "ishikawa", yF = /* @__PURE__ */ d((e) => /^\s*ishikawa(-beta)?\b/i.test(e), "detector"), xF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./ishikawaDiagram-M35NCXHK-DLUB-y_m.js");
  return { id: Gy, diagram: e };
}, "loader"), CF = {
  id: Gy,
  detector: yF,
  loader: xF
}, Xy = "venn", bF = /* @__PURE__ */ d((e) => /^\s*venn-beta/.test(e), "detector"), kF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./vennDiagram-NNMJR3RB-CDqWKNA-.js");
  return { id: Xy, diagram: e };
}, "loader"), wF = {
  id: Xy,
  detector: bF,
  loader: kF
}, SF = wF, Vy = "treemap", TF = /* @__PURE__ */ d((e) => /^\s*treemap/.test(e), "detector"), _F = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./diagram-LA4NIPWU-njWTGzKD.js");
  return { id: Vy, diagram: e };
}, "loader"), BF = {
  id: Vy,
  detector: TF,
  loader: _F
}, Zy = "usecase", vF = /* @__PURE__ */ d((e) => /^\s*usecase-beta(?:\s|$)/.test(e), "detector"), LF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./usecaseDiagram-AFA6YXN4-DSR7tNdh.js");
  return { id: Zy, diagram: e };
}, "loader"), FF = {
  id: Zy,
  detector: vF,
  loader: LF
}, Ky = "wardley", AF = /* @__PURE__ */ d((e) => /^\s*wardley-beta/i.test(e), "detector"), MF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./wardleyDiagram-S7YFUSEH-DpN7TDhk.js");
  return { id: Ky, diagram: e };
}, "loader"), EF = {
  id: Ky,
  detector: AF,
  loader: MF
}, $F = EF, Qy = "cynefin", OF = /* @__PURE__ */ d((e) => /^\s*cynefin-beta(?:[\s:]|$)/.test(e), "detector"), DF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./cynefinDiagram-L36ESFBY-C1lOtyXb.js");
  return { id: Qy, diagram: e };
}, "loader"), IF = {
  id: Qy,
  detector: OF,
  loader: DF
}, Jy = "railroad", PF = /* @__PURE__ */ d((e) => /^\s*railroad-beta/i.test(e), "detector"), RF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./railroadDiagram-MRQ6NCDL-CsAroJ2e.js");
  return { id: Jy, diagram: e };
}, "loader"), NF = {
  id: Jy,
  detector: PF,
  loader: RF
}, t0 = "railroadEbnf", qF = /* @__PURE__ */ d((e) => /^\s*railroad-ebnf-beta/i.test(e), "detector"), WF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./ebnfDiagram-UZSYDL2S-NhH_WrGw.js");
  return { id: t0, diagram: e };
}, "loader"), zF = {
  id: t0,
  detector: qF,
  loader: WF
}, e0 = "railroadAbnf", HF = /* @__PURE__ */ d((e) => /^\s*railroad-abnf-beta/i.test(e), "detector"), YF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./abnfDiagram-S7VZAUFO-CBBigRBY.js");
  return { id: e0, diagram: e };
}, "loader"), UF = {
  id: e0,
  detector: HF,
  loader: YF
}, r0 = "railroadPeg", jF = /* @__PURE__ */ d((e) => /^\s*railroad-peg-beta/i.test(e), "detector"), GF = /* @__PURE__ */ d(async () => {
  const { diagram: e } = await import("./pegDiagram-FD4XPPHP-ZEmt3wi-.js");
  return { id: r0, diagram: e };
}, "loader"), XF = {
  id: r0,
  detector: jF,
  loader: GF
}, Td = !1, ma = /* @__PURE__ */ d(() => {
  Td || (Td = !0, Bo("error", LL, (e) => e.toLowerCase().trim() === "error"), Bo(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: /* @__PURE__ */ d(() => {
        }, "clear")
      },
      styles: {},
      // should never be used
      renderer: {
        draw: /* @__PURE__ */ d(() => {
        }, "draw")
      },
      parser: {
        parse: /* @__PURE__ */ d(() => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }, "parse")
      },
      init: /* @__PURE__ */ d(() => null, "init")
      // no op
    },
    (e) => e.toLowerCase().trimStart().startsWith("---")
  ), En(EL, qL, dF), En(
    Bv,
    xv,
    YL,
    pL,
    Ov,
    zv,
    Uv,
    Xv,
    aL,
    cL,
    Av,
    wv,
    IL,
    Rv,
    xL,
    wL,
    Qv,
    XL,
    KL,
    rL,
    sF,
    mF,
    lF,
    tF,
    CF,
    BF,
    NF,
    zF,
    UF,
    XF,
    SF,
    $F,
    IF,
    FF
  ));
}, "addDiagrams"), VF = /* @__PURE__ */ d(async () => {
  J.debug("Loading registered diagrams");
  const t = (await Promise.allSettled(
    Object.entries(ii).map(async ([r, { detector: i, loader: s }]) => {
      if (s)
        try {
          Pn(r);
        } catch {
          try {
            const { diagram: o, id: a } = await s();
            Bo(a, o, i);
          } catch (o) {
            throw J.error(`Failed to load external diagram with key ${r}. Removing from detectors.`), delete ii[r], o;
          }
        }
    })
  )).filter((r) => r.status === "rejected");
  if (t.length > 0) {
    J.error(`Failed to load ${t.length} external diagrams`);
    for (const r of t)
      J.error(r);
    throw new Error(`Failed to load ${t.length} external diagrams`);
  }
}, "loadRegisteredDiagrams"), ZF = "graphics-document document";
function i0(e, t) {
  e.attr("role", ZF), t !== "" && e.attr("aria-roledescription", t);
}
d(i0, "setA11yDiagramInfo");
function s0(e, t, r, i) {
  if (e.insert !== void 0) {
    if (r) {
      const s = `chart-desc-${i}`;
      e.attr("aria-describedby", s), e.insert("desc", ":first-child").attr("id", s).text(r);
    }
    if (t) {
      const s = `chart-title-${i}`;
      e.attr("aria-labelledby", s), e.insert("title", ":first-child").attr("id", s).text(t);
    }
  }
}
d(s0, "addSVGa11yTitleDescription");
var Zo = class o0 {
  constructor(t, r, i, s, o) {
    this.type = t, this.text = r, this.db = i, this.parser = s, this.renderer = o;
  }
  static {
    d(this, "Diagram");
  }
  static async fromText(t, r = {}) {
    const i = typeof t == "string" ? { cleaned: t } : t, s = Ut(), o = ta(i.cleaned, s);
    try {
      Pn(o);
    } catch {
      const f = Ux(o);
      if (!f)
        throw new Hd(`Diagram ${o} not found.`);
      const { id: p, diagram: m } = await f();
      Bo(p, m);
    }
    const { db: a, parser: n, renderer: l, init: c } = Pn(o);
    n.parser && (n.parser.yy = a), a.clear?.(), c?.(s), r.title && a.setDiagramTitle?.(r.title);
    let h = i.cleaned;
    if (a.preserveCommentsWhenParsing && i.withComments) {
      const f = s.maxTextSize ?? Dl.maxTextSize;
      i.withComments.length > f ? J.warn(
        `Comment-preserving source exceeds maxTextSize (${i.withComments.length} > ${f}); parsing the comment-stripped text instead. Reported source positions will not account for comment lines.`
      ) : h = i.withComments;
    }
    const u = rS(h) + `
`;
    return i.frontmatterLineOffset && a.setFrontmatterLineOffset?.(i.frontmatterLineOffset), await n.parse(u), new o0(o, u, a, n, l);
  }
  async render(t, r) {
    await this.renderer.draw(this.text, t, r, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}, _d = [], KF = /* @__PURE__ */ d(() => {
  _d.forEach((e) => {
    e();
  }), _d = [];
}, "attachFunctions"), QF = /* @__PURE__ */ d((e) => e.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function a0(e) {
  const t = zd(e);
  if (!t)
    return {
      text: e,
      metadata: {}
    };
  const r = t.indent, i = r ? t.body.split(`
`).map((a) => a.startsWith(r) ? a.slice(r.length) : a).join(`
`) : t.body;
  let s = j0(i, {
    // To support config, we need JSON schema.
    // https://www.yaml.org/spec/1.2/spec.html#id2803231
    schema: U0
  }) ?? {};
  s = typeof s == "object" && !Array.isArray(s) ? s : {};
  const o = {};
  return s.displayMode && (o.displayMode = s.displayMode.toString()), s.title && (o.title = s.title.toString()), s.config && (o.config = s.config), {
    text: e.slice(t.length),
    metadata: o
  };
}
d(a0, "extractFrontMatter");
var JF = /* @__PURE__ */ d((e) => e.replace(/\r\n?/g, `
`).replace(
  /<(\w+)([^>]*)>/g,
  (t, r, i) => "<" + r + i.replace(/="([^"]*)"/g, "='$1'") + ">"
), "cleanupText"), tA = /* @__PURE__ */ d((e) => {
  const { text: t, metadata: r } = a0(e), { displayMode: i, title: s, config: o = {} } = r;
  return i && (o.gantt || (o.gantt = {}), o.gantt.displayMode = i), { title: s, config: o, text: t };
}, "processFrontmatter"), eA = /* @__PURE__ */ d((e) => {
  const t = _e.detectInit(e) ?? {}, r = _e.detectDirective(e, "wrap");
  return Array.isArray(r) ? t.wrap = r.some(({ type: i }) => i === "wrap") : r?.type === "wrap" && (t.wrap = !0), {
    text: Hw(e),
    directive: t
  };
}, "processDirectives");
function Oh(e) {
  const t = e, r = JF(e), i = tA(r), s = eA(i.text), o = ch(i.config, s.directive), a = s.text, n = QF(a), l = r.length > i.text.length ? (r.substring(0, r.length - i.text.length).match(/\n/g) ?? []).length : 0;
  return {
    code: {
      raw: t,
      cleaned: n,
      withComments: a,
      frontmatterLineOffset: l
    },
    title: i.title,
    config: o
  };
}
d(Oh, "preprocessDiagram");
function n0(e) {
  const t = new TextEncoder().encode(e), r = Array.from(t, (i) => String.fromCodePoint(i)).join("");
  return btoa(r);
}
d(n0, "toBase64");
var rA = 5e4, iA = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", sA = "sandbox", oA = "loose", aA = "http://www.w3.org/2000/svg", nA = "http://www.w3.org/1999/xlink", lA = "http://www.w3.org/1999/xhtml", hA = "100%", cA = "100%", uA = "border:0;margin:0;", dA = "margin:0", fA = "allow-top-navigation-by-user-activation allow-popups", pA = 'The "iframe" tag is not supported by your browser.', gA = ["foreignobject"], mA = ["dominant-baseline"];
function Dh(e) {
  const t = Oh(e);
  To();
  let r;
  try {
    r = ta(t.code.cleaned, Ut());
  } catch {
    r = void 0;
  }
  return Il(r), vC(t.config ?? {}), t;
}
d(Dh, "processAndSetConfigs");
async function l0(e, t) {
  ma();
  try {
    const { code: r, config: i } = Dh(e);
    return { diagramType: (await Zo.fromText(r)).type, config: i };
  } catch (r) {
    if (t?.suppressErrors)
      return !1;
    throw r;
  } finally {
    Il(void 0);
  }
}
d(l0, "parse");
var Bd = /* @__PURE__ */ d((e, t, r = []) => {
  const i = Gd(`{ ${r.join(" !important; ")} !important; }`);
  return `.${e} ${t} ${i}`;
}, "cssImportantStyles"), yA = /* @__PURE__ */ d((e, t = /* @__PURE__ */ new Map()) => {
  const r = new CSSStyleSheet();
  if (e.fontFamily !== void 0 && r.insertRule(
    `:root { --mermaid-font-family: ${e.fontFamily}}`,
    r.cssRules.length
  ), e.altFontFamily !== void 0 && r.insertRule(
    `:root { --mermaid-alt-font-family: ${e.altFontFamily}}`,
    r.cssRules.length
  ), t instanceof Map) {
    const n = le(e) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    t.forEach((l) => {
      Cu(l.styles) || n.forEach((c) => {
        r.insertRule(
          Bd(l.id, c, l.styles),
          r.cssRules.length
        );
      }), Cu(l.textStyles) || r.insertRule(
        Bd(
          l.id,
          "tspan",
          (l?.textStyles || []).map((c) => c.replace("color", "fill"))
        ),
        r.cssRules.length
      );
    });
  }
  let i = "";
  if (e.themeCSS !== void 0)
    if (typeof r.replaceSync == "function") {
      const s = new CSSStyleSheet();
      s.replaceSync(e.themeCSS), i = In(s) + `
`;
    } else
      i += `${e.themeCSS}
`;
  return i + In(r);
}, "createCssStyles"), xA = /* @__PURE__ */ d((e, t) => gl(
  uv(`${e}{${t}}`),
  pv([
    /* @__PURE__ */ d(function(i, s, o, a) {
      if (i.type === "rule" && Array.isArray(i.props)) {
        if (i.parent && i.parent.type === dl)
          return;
        i.props = i.props.map((n) => n === e && Array.isArray(i.children) && i.children.every((c) => c.type !== "decl" ? !1 : (/* @__PURE__ */ new Set([
          "font-family",
          "font-size",
          "fill"
        ])).has(c.props)) || // If the prop already starts with the namespace followed by a space or >, then it's already namespaced.
        (n.startsWith(`${e} `) || n.startsWith(`${e}>`)) && // Column combinators are not yet widely supported, it's not yet compressed to `${namespace}||`,
        // so we need to add an extra check for that
        !n.startsWith(`${e} ||`) ? n : `${e} ${n}`);
      } else i.type.startsWith("@") && ([
        ...[
          KB,
          JB,
          gy,
          ev,
          "@container",
          "@starting-style"
        ],
        dl
        // needed for Mermaid's animation feature
      ].includes(i.type) || (J.warn(`Removing unsupported at-rule ${i.type} from CSS`), i.type = Eh));
    }, "addNamespace"),
    fv
  ])
), "compileCSS"), CA = /* @__PURE__ */ d((e, t, r, i) => {
  const s = yA(e, r), o = XC(
    t,
    s,
    { ...e.themeVariables, theme: e.theme, look: e.look },
    i
  );
  return xA(i, o);
}, "createUserStyles"), bA = /* @__PURE__ */ d((e = "", t, r) => {
  let i = e;
  return !r && !t && (i = i.replace(
    /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
    'marker-end="url(#'
  )), i = zr(i), i = i.replace(/<br>/g, "<br/>"), i;
}, "cleanUpSvgCode"), kA = /* @__PURE__ */ d((e = "", t) => {
  const r = t?.viewBox?.baseVal?.height ? t.viewBox.baseVal.height + "px" : cA, i = n0(`<body style="${dA}">${e}</body>`);
  return `<iframe style="width:${hA};height:${r};${uA}" src="data:text/html;charset=UTF-8;base64,${i}" sandbox="${fA}">
  ${pA}
</iframe>`;
}, "putIntoIFrame"), vd = /* @__PURE__ */ d((e, t, r, i, s) => {
  const o = e.append("div");
  o.attr("id", r), i && o.attr("style", i);
  const a = o.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", aA);
  return s && a.attr("xmlns:xlink", s), a.append("g"), e;
}, "appendDivSvgG");
function ml(e, t) {
  return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
d(ml, "sandboxedIframe");
var wA = /* @__PURE__ */ d((e, t, r, i) => {
  e.getElementById(t)?.remove(), e.getElementById(r)?.remove(), e.getElementById(i)?.remove();
}, "removeExistingElements"), SA = /* @__PURE__ */ d(async function(e, t, r) {
  ma();
  const i = Dh(t);
  let s = i.code;
  t = s.cleaned;
  const o = Ut();
  J.debug(o), t.length > (o?.maxTextSize ?? rA) && (t = iA, s = { raw: t, cleaned: t });
  const a = `#${e}`, n = "i" + e, l = "#" + n, c = "d" + e, h = "#" + c, u = /* @__PURE__ */ d(() => {
    const I = $t(p ? l : h).node();
    I && "remove" in I && I.remove();
  }, "removeTempElements");
  let f = $t(document.body);
  const p = o.securityLevel === sA, m = o.securityLevel === oA, y = o.fontFamily;
  if (r !== void 0) {
    if (r && (r.innerHTML = ""), p) {
      const E = ml($t(r), n);
      f = $t(E.nodes()[0].contentDocument.body), f.node().style.margin = "0";
    } else
      f = $t(r);
    vd(f, e, c, `font-family: ${y}`, nA);
  } else {
    if (wA(document, e, c, n), p) {
      const E = ml($t(document.body), n);
      f = $t(E.nodes()[0].contentDocument.body), f.node().style.margin = "0";
    } else
      f = $t("body");
    vd(f, e, c);
  }
  let x, C;
  try {
    x = await Zo.fromText(s, { title: i.title });
  } catch (E) {
    if (o.suppressErrorRendering)
      throw u(), E;
    x = await Zo.fromText("error"), C = E, x.db.setErrorMessage?.(Cp(E));
  }
  const b = f.select(h).node(), S = x.type, _ = b.firstChild, B = _.firstChild, F = x.renderer.getClasses?.(t, x), A = CA(o, S, F, a), L = document.createElement("style");
  L.innerHTML = A, _.insertBefore(L, B);
  try {
    await x.renderer.draw(t, e, "12.3.0", x);
  } catch (E) {
    throw o.suppressErrorRendering ? u() : _L.draw(t, e, "12.3.0"), E;
  }
  const H = f.select(`${h} svg`), N = x.db.getAccTitle?.(), O = x.db.getAccDescription?.();
  c0(S, H, N, O);
  const R = (/* @__PURE__ */ d(() => {
    f.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", lA);
    let E = f.select(h).node().innerHTML;
    if (J.debug("config.arrowMarkerAbsolute", o.arrowMarkerAbsolute), E = bA(E, p, ar(o.arrowMarkerAbsolute)), p) {
      const I = f.select(h + " svg").node();
      E = kA(E, I);
    } else m || (E = Fi.sanitize(E, {
      ADD_TAGS: gA,
      ADD_ATTR: mA,
      HTML_INTEGRATION_POINTS: { foreignobject: !0 }
    }));
    return KF(), E;
  }, "serializeSvg"))();
  if (C)
    throw C;
  return u(), {
    diagramType: S,
    svg: R,
    bindFunctions: x.db.bindFunctions
  };
}, "renderDiagram"), TA = /* @__PURE__ */ d(async function(e, t, r) {
  try {
    return await SA(e, t, r);
  } finally {
    Il(void 0);
  }
}, "render");
function h0(e = {}) {
  const t = Jt({}, e);
  t?.fontFamily && !t.themeVariables?.fontFamily && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), _C(t);
  const r = qr.theme;
  t?.theme && Object.hasOwn(kr, t.theme) ? t.themeVariables = kr[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.theme != null && t.theme !== "null" && (t.theme = r), t.themeVariables = kr[r].getThemeVariables(t.themeVariables));
  const i = typeof t == "object" ? TC(t) : Xd();
  Ol(i.logLevel), ma();
}
d(h0, "initialize");
var _A = /* @__PURE__ */ d((e, t = {}) => {
  const { code: r } = Oh(e);
  return Zo.fromText(r, t);
}, "getDiagramFromText");
function c0(e, t, r, i) {
  i0(t, e), s0(t, r, i, t.attr("id"));
}
d(c0, "addA11yInfo");
var ni = Object.freeze({
  render: TA,
  parse: l0,
  getDiagramFromText: _A,
  initialize: h0,
  getConfig: Ut,
  /**
   * @deprecated This function does nothing. It will be overwritten by the next
   *             call to {@link render} or {@link parse}.
   */
  setConfig: Vd,
  getSiteConfig: Xd,
  updateSiteConfig: BC,
  reset: /* @__PURE__ */ d(() => {
    To();
  }, "reset"),
  globalReset: /* @__PURE__ */ d(() => {
    To(qr);
  }, "globalReset"),
  defaultConfig: qr
});
Ol(Ut().logLevel);
To(Ut());
var BA = /* @__PURE__ */ d((e, t, r) => {
  J.warn(e), hh(e) ? (r && r(e.str, e.hash), t.push({ ...e, message: e.str, error: e })) : (r && r(e), e instanceof Error && t.push({
    str: e.message,
    message: e.message,
    hash: e.name,
    error: e
  }));
}, "handleError"), u0 = /* @__PURE__ */ d(async function(e = {
  querySelector: ".mermaid"
}) {
  try {
    await vA(e);
  } catch (t) {
    if (hh(t) && J.error(t.str), _r.parseError && _r.parseError(t), !e.suppressErrors)
      throw J.error("Use the suppressErrors option to suppress these errors"), t;
  }
}, "run"), vA = /* @__PURE__ */ d(async function({ postRenderCallback: e, querySelector: t, nodes: r } = {
  querySelector: ".mermaid"
}) {
  const i = ni.getConfig();
  J.debug(`${e ? "" : "No "}Callback function found`);
  let s;
  if (r)
    s = r;
  else if (t)
    s = document.querySelectorAll(t);
  else
    throw new Error("Nodes and querySelector are both undefined");
  J.debug(`Found ${s.length} diagrams`), i?.startOnLoad !== void 0 && (J.debug("Start On Load: " + i?.startOnLoad), ni.updateSiteConfig({ startOnLoad: i?.startOnLoad }));
  const o = new _e.InitIDGenerator(i.deterministicIds, i.deterministicIDSeed);
  let a;
  const n = [];
  for (const l of Array.from(s)) {
    if (J.info("Rendering diagram: " + l.id), l.getAttribute("data-processed"))
      continue;
    l.setAttribute("data-processed", "true");
    const c = `mermaid-${o.next()}`;
    a = l.innerHTML, a = Ep(_e.entityDecode(a)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const h = _e.detectInit(a);
    h && J.debug("Detected early reinit: ", h);
    try {
      const { svg: u, bindFunctions: f } = await g0(c, a, l);
      l.innerHTML = u, e && await e(c), f && f(l);
    } catch (u) {
      BA(u, n, _r.parseError);
    }
  }
  if (n.length > 0)
    throw n[0];
}, "runThrowsErrors"), d0 = /* @__PURE__ */ d(function(e) {
  ni.initialize(e);
}, "initialize"), LA = /* @__PURE__ */ d(async function(e, t, r) {
  J.warn("mermaid.init is deprecated. Please use run instead."), e && d0(e);
  const i = { postRenderCallback: r, querySelector: ".mermaid" };
  typeof t == "string" ? i.querySelector = t : t && (t instanceof HTMLElement ? i.nodes = [t] : i.nodes = t), await u0(i);
}, "init"), FA = /* @__PURE__ */ d(async (e, {
  lazyLoad: t = !0
} = {}) => {
  ma(), En(...e), t === !1 && await VF();
}, "registerExternalDiagrams"), f0 = /* @__PURE__ */ d(function() {
  if (_r.startOnLoad) {
    const { startOnLoad: e } = ni.getConfig();
    e && _r.run().catch((t) => J.error("Mermaid failed to initialize", t));
  }
}, "contentLoaded");
typeof document < "u" && window.addEventListener("load", f0, !1);
var AA = /* @__PURE__ */ d(function(e) {
  _r.parseError = e;
}, "setParseErrorHandler"), Ko = [], An = !1, p0 = /* @__PURE__ */ d(async () => {
  if (!An) {
    for (An = !0; Ko.length > 0; ) {
      const e = Ko.shift();
      if (e)
        try {
          await e();
        } catch (t) {
          J.error("Error executing queue", t);
        }
    }
    An = !1;
  }
}, "executeQueue"), MA = /* @__PURE__ */ d(async (e, t) => new Promise((r, i) => {
  const s = /* @__PURE__ */ d(() => new Promise((o, a) => {
    ni.parse(e, t).then(
      (n) => {
        o(n), r(n);
      },
      (n) => {
        J.error("Error parsing", n), _r.parseError?.(n), a(n), i(n);
      }
    );
  }), "performCall");
  Ko.push(s), p0().catch(i);
}), "parse"), g0 = /* @__PURE__ */ d((e, t, r) => new Promise((i, s) => {
  const o = /* @__PURE__ */ d(() => new Promise((a, n) => {
    ni.render(e, t, r).then(
      (l) => {
        a(l), i(l);
      },
      (l) => {
        J.error("Error parsing", l), _r.parseError?.(l), n(l), s(l);
      }
    );
  }), "performCall");
  Ko.push(o), p0().catch(s);
}), "render"), EA = /* @__PURE__ */ d(() => Object.keys(ii).map((e) => ({
  id: e
})), "getRegisteredDiagramsMetadata"), _r = {
  startOnLoad: !0,
  mermaidAPI: ni,
  parse: MA,
  render: g0,
  init: LA,
  run: u0,
  registerExternalDiagrams: FA,
  registerLayoutLoaders: dy,
  initialize: d0,
  parseError: void 0,
  contentLoaded: f0,
  setParseErrorHandler: AA,
  detectType: ta,
  registerIconPacks: nf,
  getRegisteredDiagramsMetadata: EA
}, $A = _r;
const FM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $A
}, Symbol.toStringTag, { value: "Module" }));
export {
  Lw as $,
  CM as A,
  sf as B,
  GS as C,
  _s as D,
  jS as E,
  rf as F,
  pi as G,
  jl as H,
  tM as I,
  U0 as J,
  ve as K,
  ps as L,
  U as M,
  Cw as N,
  fw as O,
  K0 as P,
  ZA as Q,
  be as R,
  Dl as S,
  Ul as T,
  $b as U,
  Vo as V,
  uu as W,
  Sf as X,
  vw as Y,
  Nw as Z,
  z0 as _,
  vs as a,
  Fi as a$,
  Gw as a0,
  JC as a1,
  KC as a2,
  Ut as a3,
  Ot as a4,
  eb as a5,
  lM as a6,
  li as a7,
  LM as a8,
  B_ as a9,
  ih as aA,
  Ah as aB,
  uo as aC,
  u_ as aD,
  yt as aE,
  z as aF,
  ew as aG,
  Ts as aH,
  j0 as aI,
  J as aJ,
  pw as aK,
  Dp as aL,
  ae as aM,
  hd as aN,
  UB as aO,
  eM as aP,
  FM as aQ,
  rM as aR,
  Bf as aS,
  np as aT,
  xw as aU,
  jp as aV,
  aa as aW,
  qc as aX,
  Zl as aY,
  uB as aZ,
  wM as a_,
  mp as aa,
  Ds as ab,
  eh as ac,
  Kx as ad,
  PC as ae,
  GA as af,
  du as ag,
  BM as ah,
  ys as ai,
  kh as aj,
  KA as ak,
  T_ as al,
  yB as am,
  hB as an,
  G0 as ao,
  Gm as ap,
  _w as aq,
  Bw as ar,
  Tw as as,
  Pr as at,
  ou as au,
  M1 as av,
  nt as aw,
  ZS as ax,
  ke as ay,
  of as az,
  d as b,
  Xw as b0,
  uw as b1,
  nf as b2,
  vM as b3,
  ef as b4,
  cB as b5,
  T1 as b6,
  Nr as b7,
  xM as b8,
  Ee as b9,
  K2 as bA,
  Kw as bB,
  $t as ba,
  ZB as bb,
  QC as bc,
  ZC as bd,
  VA as be,
  tb as bf,
  bM as bg,
  gw as bh,
  UC as bi,
  ib as bj,
  jm as bk,
  iM as bl,
  sM as bm,
  Oe as bn,
  ap as bo,
  ht as bp,
  dw as bq,
  oM as br,
  de as bs,
  ww as bt,
  Sw as bu,
  bw as bv,
  kw as bw,
  Fb as bx,
  ft as by,
  _e as bz,
  QA as c,
  aM as d,
  Dd as e,
  hp as f,
  Q2 as g,
  yw as h,
  mw as i,
  nM as j,
  Jt as k,
  ct as l,
  JA as m,
  lp as n,
  XA as o,
  lh as p,
  xp as q,
  Tr as r,
  rx as s,
  ch as t,
  VC as u,
  kM as v,
  _M as w,
  TM as x,
  SM as y,
  bs as z
};
