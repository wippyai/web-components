var Sy = [["flowchart", "flowchart-elk", /^\s*flowchart-elk/], ["mindmap", "mindmap", /^\s*mindmap/], ["architecture", "architecture", /^\s*architecture/], ["agentflow", "agentflow", /^\s*agentflow-beta\b/], ["c4", "c4", /^\s*(?:C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)/], ["kanban", "kanban", /^\s*kanban/], ["class", "classDiagram", /^\s*classDiagram/], ["er", "er", /^\s*erDiagram/], ["gantt", "gantt", /^\s*gantt/], ["info", "info", /^\s*info/], ["pie", "pie", /^\s*pie/], ["requirement", "requirement", /^\s*requirement(Diagram)?/], ["sequence", "sequence", /^\s*sequenceDiagram/], ["swimlane", "swimlane", /^\s*swimlane-beta\b/], ["flowchart", "flowchart-v2", /^\s*(graph|flowchart)/], ["timeline", "timeline", /^\s*timeline/], ["gitGraph", "gitGraph", /^\s*gitGraph/], ["state", "stateDiagram", /^\s*stateDiagram/], ["journey", "journey", /^\s*journey/], ["quadrantChart", "quadrantChart", /^\s*quadrantChart/], ["sankey", "sankey", /^\s*sankey(-beta)?/], ["packet", "packet", /^\s*packet(-beta)?/], ["xychart", "xychart", /^\s*xychart(-beta)?/], ["block", "block", /^\s*block(-beta)?/], ["eventmodeling", "eventmodeling", /^\s*eventmodeling/], ["treeView", "treeView", /^\s*treeView-beta/], ["radar", "radar", /^\s*radar-beta/], ["ishikawa", "ishikawa", /^\s*ishikawa(-beta)?\b/i], ["treemap", "treemap", /^\s*treemap/], ["railroad", "railroad", /^\s*railroad-beta/i], ["railroad", "railroadEbnf", /^\s*railroad-ebnf-beta/i], ["railroad", "railroadAbnf", /^\s*railroad-abnf-beta/i], ["railroad", "railroadPeg", /^\s*railroad-peg-beta/i], ["venn", "venn", /^\s*venn-beta/], ["wardley", "wardley", /^\s*wardley-beta/i], ["cynefin", "cynefin", /^\s*cynefin-beta(?:[\s:]|$)/], ["usecase", "usecase", /^\s*usecase-beta(?:\s|$)/]];
function d2(e) {
  for (let [t, r, a] of Sy) if (a.test(e)) return { type: t, mermaidType: r };
  return null;
}
var at = class extends Error {
  code;
  type;
  mermaidType;
  line;
  column;
  snippet;
  constructor(e, t = "syntax", r = {}) {
    super(e), this.name = "PeleError", this.code = t, this.type = r.type ?? null, this.mermaidType = r.mermaidType ?? null, this.line = r.line ?? 0, this.column = r.column ?? 0, this.snippet = r.snippet ?? "";
  }
};
function Jo(e, t, r) {
  return Array.from(e.matchAll(t), (a) => [a.index, a.index + a[0].length, r]);
}
function _y(e, t) {
  let r = 0;
  for (let [a, s, l] of e) {
    let n = a - r;
    if (t < n) break;
    if (t < n + l) return a + Math.min(t - n, s - a - 1);
    r += s - a - l;
  }
  return t + r;
}
function bs(e, t) {
  for (let r = e.length - 1; r >= 0; r--) t = _y(e[r], t);
  return t;
}
var jl;
function Iy(e, t) {
  let r = jl;
  jl = e;
  try {
    return t();
  } finally {
    jl = r;
  }
}
function il(e, t) {
  return jl !== void 0 && e === jl.parsed ? jl.find(t) : [e, t];
}
function ii(e, t) {
  let r = e.trimEnd().length;
  r > 0 && t >= r ? ([e, t] = il(e, r - 1), t++) : [e, t] = il(e, t);
  let a = 1, s = 0;
  for (let o = e.indexOf(`
`); o !== -1 && o < t; o = e.indexOf(`
`, o + 1)) a++, s = o + 1;
  let l = e.indexOf(`
`, t);
  l === -1 && (l = e.length);
  let n = t - s + 1, i = e.slice(s, l);
  return { line: a, column: n, snippet: i + `
` + "-".repeat(n - 1) + "^" };
}
function bt(e, t, r, a, s = !1) {
  let l = ii(t, r), n = s ? `Lexical error on line ${l.line}. Unrecognized text.` : `Parse error on line ${l.line}:`, i = s ? `${n}
${l.snippet}` : `${n}
${l.snippet}
${a}`;
  return new at(i, "syntax", { type: e, ...l });
}
var Ny = "amp:38,lt:60,gt:62,quot:34,apos:39,nbsp:160,shy:173,iexcl:161,cent:162,pound:163,curren:164,yen:165,sect:167,copy:169,laquo:171,not:172,reg:174,deg:176,plusmn:177,sup2:178,sup3:179,micro:181,para:182,middot:183,sup1:185,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,euro:8364,trade:8482,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,radic:8730,infin:8734,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830,check:10003,cross:10007,AMP:38,LT:60,GT:62,QUOT:34,lsqb:91,rsqb:93,lcub:123,rcub:125,verbar:124,VerticalLine:124,midast:42,DiacriticalGrave:96,Hat:94,UnderBar:95,equals:61,colon:58,semi:59,num:35,percnt:37,lpar:40,rpar:41,lbrack:91,rbrack:93,lbrace:123,rbrace:125,vert:124,sol:47,bsol:92,quest:63,excl:33,ast:42,plus:43,comma:44,period:46,dollar:36,commat:64,grave:96,hat:94,lowbar:95,tilde:126,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969", Ws;
function Ry(e) {
  if (!Ws) {
    Ws = /* @__PURE__ */ new Map();
    for (let t of Ny.split(",")) {
      let r = t.indexOf(":");
      Ws.set(t.slice(0, r), String.fromCodePoint(Number(t.slice(r + 1))));
    }
  }
  return Ws.get(e);
}
function pu(e, t) {
  return e > 0 && e <= 1114111 && (e < 55296 || e > 57343) ? String.fromCodePoint(e) : t;
}
var Dy = /&(?:#(\d+)|#[xX]([0-9a-fA-F]+)|(\w+));/g, gu = "ﬂ°", f2 = "¶ß";
function Ly(e) {
  let t = "", r = 0, a = e.indexOf(gu);
  for (; a !== -1; ) {
    let s = e.indexOf("¶", a + 2);
    if (s === -1) break;
    if (e[s + 1] === "ß") {
      let l = e[a + 2] === "°";
      t += e.slice(r, a) + (l ? "&#" : "&") + e.slice(a + (l ? 3 : 2), s) + ";", r = s + 2;
    }
    a = e.indexOf(gu, s + 1);
  }
  return r === 0 ? e : t + e.slice(r);
}
var Oy = /ﬂ°°?(\w+)¶ß/g;
function Od(e) {
  return e.includes(f2) ? e.replace(Oy, "#$1;") : e;
}
function Tt(e) {
  return e.includes(f2) && (e = Ly(e)), e.includes("&") && (e = e.replace(Dy, (t, r, a, s) => r ? pu(Number(r), t) : a ? pu(parseInt(a, 16), t) : Ry(s) ?? t)), e;
}
var ts, rs = /* @__PURE__ */ new Map();
function Fy(e, t) {
  let r = ts, a = rs;
  ts = e, rs = /* @__PURE__ */ new Map();
  try {
    return t();
  } finally {
    ts = r, rs = a;
  }
}
function Ff(e) {
  if (ts === void 0) return "";
  let t = rs.get(e);
  return t === void 0 && (t = ts(e) ?? "", rs.set(e, t)), t;
}
var Qr, ql = /* @__PURE__ */ new Map();
function zy(e, t) {
  let r = Qr, a = ql;
  Qr = e, ql = /* @__PURE__ */ new Map();
  try {
    return t();
  } finally {
    Qr = r, ql = a;
  }
}
function Py() {
  return Qr !== void 0;
}
function mu(e) {
  return Number.isFinite(e) && e > 0;
}
function Wy(e, t) {
  if (Qr === void 0) return;
  let r = t + `
` + e;
  if (ql.has(r)) return ql.get(r);
  let a = Qr(e, t) ?? void 0, s = a && mu(a.width) && mu(a.height) && typeof ("svg" in a ? a.svg : a.html) == "string" ? a : void 0;
  return ql.set(r, s), s;
}
function By(e) {
  if (Qr === void 0) return e();
  let t = Qr;
  Qr = void 0;
  try {
    return e();
  } finally {
    Qr = t;
  }
}
var Pl = class {
  constructor(e) {
    this.message = e;
  }
  message;
}, u2 = 64;
function eo(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, { value: r, enumerable: !0, writable: !0, configurable: !0 }) : e[t] = r;
}
var Gy = class {
  lines;
  i = 0;
  constructor(e) {
    this.lines = (e.includes("\r") ? e.replace(/\r\n?/g, `
`) : e).split(`
`);
  }
  skipBlank() {
    for (; this.i < this.lines.length; ) {
      let e = this.lines[this.i].trim();
      if (e !== "" && e[0] !== "#" && e !== "---") break;
      this.i++;
    }
  }
  indent() {
    let e = this.lines[this.i], t = 0;
    for (; t < e.length && e[t] === " "; ) t++;
    if (e[t] === "	") throw new Error("YAML: tabs are not allowed for indentation");
    return t;
  }
}, Hy = /^[-+]?(?:0|[1-9][0-9]*)$/, Uy = /^[-+]?0x[0-9a-fA-F]+$/, Yy = /^[-+]?0o[0-7]+$/, jy = /^[-+]?0b[01]+$/, qy = /^[-+]?(?:[0-9][0-9]*(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][-+]?[0-9]+)?$/, Vy = /[\s#:,[\]{}&*!|>'"%@`]/;
function pi(e) {
  return e === " " || e === "	" || e === `
` || e === "\r";
}
function Ch(e) {
  let t = e[0], r, a;
  if (t === '"' || t === "'") {
    let l = 1;
    for (; ; ) {
      if (l >= e.length) return null;
      let n = e[l];
      if (t === '"' && n === "\\") l += 2;
      else if (n === t) {
        if (t === '"' || e[l + 1] !== "'") break;
        l += 2;
      } else l++;
    }
    for (r = l + 1, a = r; pi(e[a]); ) a++;
    if (e[a] !== ":") return null;
  } else {
    if (t === void 0 || Vy.test(t) || t === "-" && (e.length < 2 || pi(e[1]) || e[1] === ":" || e[1] === "#")) return null;
    for (a = 1; a < e.length && e[a] !== ":" && e[a] !== "#"; ) a++;
    if (e[a] !== ":") return null;
    for (r = a; pi(e[r - 1]); ) r--;
  }
  let s = a + 1;
  if (s < e.length && !pi(e[s])) return null;
  for (; pi(e[s]); ) s++;
  return { key: e.slice(0, r), length: s };
}
function Fd(e) {
  let t = e.trim();
  if (t === "" || t === "~" || t === "null" || t === "Null" || t === "NULL") return null;
  if (t === "true" || t === "True" || t === "TRUE") return !0;
  if (t === "false" || t === "False" || t === "FALSE") return !1;
  let r = t[0];
  if (r !== "-" && r !== "+" && r !== "." && (r < "0" || r > "9")) return t;
  if (Hy.test(t) || qy.test(t)) return Number(t);
  if (Uy.test(t) || Yy.test(t) || jy.test(t)) {
    let a = t[0] === "-", s = Number(a || t[0] === "+" ? t.slice(1) : t);
    return a ? -s : s;
  }
  return /^[-+]?\.(?:inf|Inf|INF)$/.test(t) ? t[0] === "-" ? -1 / 0 : 1 / 0 : /^\.(?:nan|NaN|NAN)$/.test(t) ? NaN : t;
}
var yu = { 0: "\0", a: "\x07", b: "\b", t: "	", n: `
`, v: "\v", f: "\f", r: "\r", e: "\x1B", " ": " ", '"': '"', "/": "/", "\\": "\\", N: "", _: " ", L: "\u2028", P: "\u2029" };
function as(e) {
  if (!e.includes(`
`)) return e;
  let t = e.split(`
`), r = t.length - 1;
  for (let a = 0; a <= r; a++) {
    let s = t[a], l = 0, n = s.length;
    if (a > 0) for (; l < n && (s.charCodeAt(l) === 32 || s.charCodeAt(l) === 9); ) l++;
    if (a < r) for (; n > l && (s.charCodeAt(n - 1) === 32 || s.charCodeAt(n - 1) === 9); ) n--;
    t[a] = s.slice(l, n);
  }
  return t.join(`
`).replace(/\n+/g, (a) => a.length === 1 ? " " : `
`.repeat(a.length - 1));
}
function Ky(e) {
  if (!e.includes("\\")) return as(e);
  let t = "", r = as(e.replace(/\\\n[ \t]*/g, ""));
  for (let a = 0; a < r.length; a++) {
    let s = r[a];
    if (s !== "\\") {
      t += s;
      continue;
    }
    let l = r[++a];
    if (l === "x" || l === "u" || l === "U") {
      let n = l === "x" ? 2 : l === "u" ? 4 : 8;
      t += String.fromCodePoint(parseInt(r.slice(a + 1, a + 1 + n), 16)), a += n;
    } else if (l in yu) t += yu[l];
    else throw new Error("YAML: unknown escape sequence");
  }
  return t;
}
function Xa(e, t, r) {
  for (; t < e.length; ) {
    let a = e[t];
    if (a === " " || a === `
` || a === "	" || a === "\r" || r) t++;
    else if (a === "#" && (t === 0 || /\s/.test(e[t - 1]))) {
      let s = e.indexOf(`
`, t);
      t = s === -1 ? e.length : s;
    } else break;
  }
  return t;
}
function xu(e, t) {
  if (!t) throw new Error("YAML: missed comma between flow collection entries");
  if (e === ",") throw new Error("YAML: expected the node content, but found ','");
}
function Vl(e, t, r, a = 0) {
  if (a > u2) throw new Error("YAML: nesting is too deep");
  t = Xa(e, t, !1);
  let s = e[t];
  if (s === "{") {
    let n = {};
    t++;
    let i = !0;
    for (; ; ) {
      if (t = Xa(e, t, !1), t >= e.length) throw new Pl("YAML: unexpected end of the stream within a flow collection");
      if (e[t] === "}") return [n, t + 1];
      xu(e[t], i);
      let o;
      [o, t] = Vl(e, t, ":,}", a + 1), t = Xa(e, t, !1);
      let h = null;
      e[t] === ":" && ([h, t] = Vl(e, t + 1, ",}", a + 1)), eo(n, String(o), h), t = Xa(e, t, !1), i = e[t] === ",", i && t++;
    }
  }
  if (s === "[") {
    let n = [];
    t++;
    let i = !0;
    for (; ; ) {
      if (t = Xa(e, t, !1), t >= e.length) throw new Pl("YAML: unexpected end of the stream within a flow collection");
      if (e[t] === "]") return [n, t + 1];
      xu(e[t], i);
      let o;
      [o, t] = Vl(e, t, ",]", a + 1), n.push(o), t = Xa(e, t, !1), i = e[t] === ",", i && t++;
    }
  }
  if (s === '"') {
    let n = t + 1;
    for (; n < e.length && e[n] !== '"'; ) n += e[n] === "\\" ? 2 : 1;
    if (n >= e.length) throw new Pl("YAML: unexpected end of the stream within a double quoted scalar");
    return [Ky(e.slice(t + 1, n)), n + 1];
  }
  if (s === "'") {
    let n = t + 1;
    for (; n < e.length; ) {
      if (e[n] === "'") {
        if (e[n + 1] !== "'") break;
        n++;
      }
      n++;
    }
    if (n >= e.length) throw new Pl("YAML: unexpected end of the stream within a single quoted scalar");
    return [as(e.slice(t + 1, n)).replace(/''/g, "'"), n + 1];
  }
  let l = t;
  for (; l < e.length; ) {
    let n = e[l];
    if (r.includes(n) && (n !== ":" || l + 1 >= e.length || /[\s,[\]{}]/.test(e[l + 1]))) break;
    if (n === "#" && l > t && /\s/.test(e[l - 1])) {
      let i = e.indexOf(`
`, l);
      return [Fd(as(e.slice(t, l).trim())), i === -1 ? e.length : i];
    }
    l++;
  }
  return [Fd(as(e.slice(t, l).trim())), l];
}
function ls(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let a = e[r];
    if (t) a === "\\" && t === '"' ? r++ : a === t && (t = "");
    else if (a === '"' || a === "'") t = a;
    else if (a === "#" && (r === 0 || e[r - 1] === " " || e[r - 1] === "	")) return e.slice(0, r);
  }
  return e;
}
function Xy(e, t, r) {
  let a = t[0] === ">", s = t.includes("-") ? "-" : t.includes("+") ? "+" : "", l = /[1-9]/.exec(t), n = l ? r + Number(l[0]) : -1, i = [];
  for (; e.i < e.lines.length; ) {
    let c = e.lines[e.i];
    if (c.trim() === "") {
      i.push(""), e.i++;
      continue;
    }
    let u = c.length - c.trimStart().length;
    if (n === -1) {
      if (u <= r) break;
      n = u;
    }
    if (u < n) break;
    i.push(c.slice(n)), e.i++;
  }
  let o = 0;
  for (; i.length > 0 && i[i.length - 1] === ""; ) i.pop(), o++;
  let h;
  if (a) {
    h = "";
    for (let c = 0; c < i.length; c++) {
      let u = i[c];
      if (c > 0) {
        let d = i[c - 1];
        u === "" ? h += `
` : d !== "" && (h += /^[ \t]/.test(d) || /^[ \t]/.test(u) ? `
` : " ");
      }
      h += u;
    }
  } else h = i.join(`
`);
  return i.length === 0 ? s === "+" ? `
`.repeat(o) : "" : s === "-" ? h : s === "+" ? h + `
`.repeat(o + 1) : h + `
`;
}
function Sh(e, t, r) {
  let a = t[0];
  if ((a === "|" || a === ">") && /^[|>][-+0-9]*\s*(?:#.*)?$/.test(t)) return Xy(e, t, r);
  if (a === "{" || a === "[" || a === '"' || a === "'") {
    let l = e.i, n = t, i = 0, o = 1;
    for (; ; ) try {
      let [h, c] = Vl(n, 0, ""), u = 0;
      for (let p = n.indexOf(`
`); p !== -1 && p < c; p = n.indexOf(`
`, p + 1)) u++;
      let d = n.indexOf(`
`, c);
      if (ls(n.slice(c, d === -1 ? n.length : d)).trim() !== "") throw new Error("YAML: unexpected content after a value");
      return e.i = l + u, h;
    } catch (h) {
      if (!(h instanceof Pl)) throw h;
      if (l + i >= e.lines.length) throw new Error(h.message);
      let c = e.lines.slice(l + i, l + i + o);
      n += `
` + c.join(`
`), i += c.length, o *= 2;
    }
  }
  let s = ls(t).trim();
  for (; e.i < e.lines.length; ) {
    let l = e.lines[e.i];
    if (l.trim() === "") {
      let i = e.i;
      for (; i < e.lines.length && e.lines[i].trim() === ""; ) i++;
      if (i >= e.lines.length || e.lines[i].length - e.lines[i].trimStart().length <= r) break;
      s += `
`.repeat(i - e.i), e.i = i;
      continue;
    }
    if (l.length - l.trimStart().length <= r) break;
    let n = ls(l).trim();
    s += (s.endsWith(`
`) ? "" : " ") + n, e.i++;
  }
  return Fd(s);
}
function to(e, t, r = 0) {
  if (r > u2) throw new Error("YAML: nesting is too deep");
  if (e.skipBlank(), e.i >= e.lines.length) return null;
  let a = e.indent();
  if (a < t) return null;
  let s = e.lines[e.i].slice(a);
  if (s === "-" || s.startsWith("- ")) {
    let n = [];
    for (; e.i < e.lines.length && (e.skipBlank(), !(e.i >= e.lines.length || e.indent() !== a)); ) {
      let i = e.lines[e.i].slice(a);
      if (i !== "-" && !i.startsWith("- ")) break;
      let o = i.slice(1), h = o.length - o.trimStart().length + 1, c = ls(o).trim();
      c === "" ? (e.i++, n.push(to(e, a + 1, r + 1))) : Ch(c) !== null ? (e.lines[e.i] = " ".repeat(a + h) + o.trimStart(), n.push(to(e, a + h, r + 1))) : (e.i++, n.push(Sh(e, o.trim(), a)));
    }
    return n;
  }
  if (Ch(s) === null) return e.i++, Sh(e, s.trim(), a - 1);
  let l = {};
  for (; e.i < e.lines.length && (e.skipBlank(), !(e.i >= e.lines.length)); ) {
    let n = e.indent();
    if (n < a) break;
    if (n > a) throw new Error("YAML: bad indentation of a mapping entry");
    let i = e.lines[e.i].slice(a), o = Ch(i);
    if (!o) throw new Error("YAML: can not read a block mapping entry");
    let h = String(Vl(o.key, 0, "")[0]), c = i.slice(o.length);
    if (e.i++, ls(c).trim() === "") if (e.skipBlank(), e.i < e.lines.length) {
      let u = e.indent(), d = e.lines[e.i].slice(u), p = d === "-" || d.startsWith("- ");
      eo(l, h, u > a || p && u === a ? to(e, p ? a : a + 1, r + 1) : null);
    } else eo(l, h, null);
    else eo(l, h, Sh(e, c.trim(), a));
  }
  return l;
}
function Zl(e) {
  let t = e.trim();
  if (t[0] === "{" || t[0] === "[") try {
    let [s, l] = Vl(t, 0, "");
    if (Xa(t, l, !1) === t.length) return s;
  } catch (s) {
    throw s instanceof Pl ? new Error(s.message) : s;
  }
  let r = new Gy(e), a = to(r, 0);
  if (r.skipBlank(), r.i < r.lines.length && r.lines[r.i].trim() !== "...") throw new Error("YAML: end of the stream or a document separator is expected");
  return a;
}
function Ke(e) {
  return e < 128 ? e === 32 || e >= 9 && e <= 13 : e === 160 || e === 5760 || e >= 8192 && e <= 8202 || e === 8232 || e === 8233 || e === 8239 || e === 8287 || e === 12288 || e === 65279;
}
function Xr(e) {
  return e === 32 || e === 9;
}
function vo(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function yt(e) {
  return e >= 48 && e <= 57;
}
function Ql(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
function p2(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function nt(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e === 95;
}
var Zy = /^\s*%%(?!{)[^\n]+\n?/gm, ml = /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, Qy = /<(\w+)([^>]*)>/g, Jy = /="([^"]*)"/g, ex = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function g2(e, t, r) {
  return r?.push(Jo(e, t, 0)), e.replace(t, "");
}
function m2(e, t) {
  e.includes("%%") && (e = g2(e, Zy, t));
  let r = e.trimStart();
  return t?.push([[0, e.length - r.length, 0]]), r;
}
function y2(e) {
  return e.includes("\r") ? e.replace(/\r\n?/g, `
`) : e;
}
function Bs(e) {
  return e === `
` || e === "\r";
}
function _h(e) {
  return e !== void 0 && /\s/.test(e);
}
function tx(e) {
  let t = 0;
  for (; t < e.length && _h(e[t]) && !Bs(e[t]); ) t++;
  let r = e.slice(0, t);
  if (!e.startsWith("---", t)) return;
  let a = [];
  for (let u = t + 3; u < e.length && _h(e[u]); u++) Bs(e[u]) && a.push(u);
  if (a.length === 0) return;
  let s = r + "---", l = (u) => {
    if (!Bs(e[u]) || !e.startsWith(s, u + 1)) return -1;
    let d = -1;
    for (let p = u + 1 + s.length; p < e.length && _h(e[p]); p++) Bs(e[p]) && (d = p);
    return d;
  }, n = `
` + s, i = -1;
  for (let u = e.lastIndexOf(n); u > a[0]; u = e.lastIndexOf(n, u - 1)) if (l(u) !== -1) {
    i = u;
    break;
  }
  if (i === -1) return;
  let o = a[0];
  for (let u of a) u < i && (o = u);
  let h = o + 1, c = h > 0 ? h - 1 : 0;
  for (let u = e.indexOf(n, c); u !== -1 && u <= i; u = e.indexOf(n, u + 1)) {
    if (u < h) continue;
    let d = l(u);
    if (d !== -1) return { indent: r, body: e.slice(h, u), length: d + 1 };
  }
}
function Ca(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ko(e, t) {
  for (let r of Object.keys(t)) {
    if (ex.has(r)) continue;
    let a = t[r], s = e[r];
    Ca(a) && Ca(s) ? ko(s, a) : Ca(a) ? e[r] = ko({}, a) : e[r] = a;
  }
  return e;
}
function rx(e, t, r) {
  if (!e.includes("%%{")) return e;
  let a = e.trim().replace(/'/g, '"');
  ml.lastIndex = 0;
  let s;
  for (; (s = ml.exec(a)) !== null; ) {
    s.index === ml.lastIndex && ml.lastIndex++;
    let l = s[1] ?? s[2];
    if (l === "wrap") t.wrap = !0;
    else if ((l === "init" || l === "initialize") && s[4]) try {
      let n = JSON.parse(s[4].trim());
      Ca(n) && ko(t, n);
    } catch {
    }
  }
  return ml.lastIndex = 0, g2(e, ml, r);
}
function zf(e, t) {
  let r = y2(e), a = r.includes("<") ? r.lastIndexOf(">") : -1;
  a > 0 && (r = r.slice(0, a + 1).replace(Qy, (o, h, c) => "<" + h + c.replace(Jy, "='$1'") + ">") + r.slice(a + 1));
  let s = {}, l, n = 0, i = r.includes("---") ? tx(r) : void 0;
  if (i) {
    let o = i.indent ? i.body.split(`
`).map((c) => c.startsWith(i.indent) ? c.slice(i.indent.length) : c).join(`
`) : i.body, h;
    try {
      h = Zl(o);
    } catch (c) {
      throw new at(`Front matter is not valid YAML. ${c.message}`, "syntax");
    }
    if (Ca(h) && (h.title && (l = String(h.title)), Ca(h.config) && ko(s, h.config), h.displayMode)) {
      let c = Ca(s.gantt) ? s.gantt : s.gantt = {};
      c.displayMode = String(h.displayMode);
    }
    for (let c = r.indexOf(`
`); c !== -1 && c < i.length; c = r.indexOf(`
`, c + 1)) n++;
    r = r.slice(i.length), t?.push([[0, i.length, 0]]);
  }
  return r = rx(r, s, t), { text: m2(r), title: l, config: s, withComments: r, lineOffset: n };
}
var ax = /#\w+;/g, lx = /^\+?\d+$/, Ih = new RegExp("[\\n\\r\u2028\u2029]", "g");
function x2(e) {
  if (e === void 0) return;
  let t = [];
  return e.push(t), t;
}
function wu(e, t, r) {
  let a = x2(r), s = e.indexOf(t);
  if (s === -1) return e;
  let l = "", n = 0;
  for (; s !== -1; ) {
    Ih.lastIndex = s;
    let i = Ih.test(e) ? Ih.lastIndex - 1 : e.length, o = !1, h = -1;
    for (let c = s + t.length; c < i; c++) {
      let u = e.charCodeAt(c);
      if (u === 58) o = !0;
      else if (u === 35) {
        if (o) {
          h = c;
          break;
        }
      } else Ke(u) && (o = !1);
    }
    if (h !== -1) {
      let c = e.lastIndexOf(";", i - 1);
      c > h && (a?.push([c, c + 1, 0]), l += e.slice(n, c), n = c + 1);
    }
    s = i >= e.length ? -1 : e.indexOf(t, i + 1);
  }
  return n === 0 ? e : l + e.slice(n);
}
function w2(e, t) {
  if (!e.includes("#")) return e;
  e = wu(wu(e, "style", t), "classDef", t);
  let r = x2(t);
  return e.replace(ax, (a, s) => {
    let l = a.substring(1, a.length - 1), n = (lx.test(l) ? "ﬂ°°" : "ﬂ°") + l + "¶ß";
    return r?.push([s, s + a.length, n.length]), n;
  });
}
var ix = "7q7q9vfgfgopij5b9999atg87q997q7qfgfgfgfgfgfgfgfgfgfg7q7qg8g8g8fgs7ijijk2k2ijgzlmk27qdwijfgn5k2lmijlmk2ijgzk2ijq8ijijgz7q7q7qd1fg99fgfgdwfgfg7qfgfg6666dw66n5fgfgfgfg99dw7qfgdwk2dwdwdw9a789ag8", sx = "7q99d6fgfgopk26m9999atg87q997q7qfgfgfgfgfgfgfgfgfgfg9999g8g8g8gzr3k2k2k2k2ijgzlmk27qfgk2gzn5k2lmijlmk2ijgzk2ijq8ijijgz997q99g8fg99fggzfggzfg99gzgz7q7qfg7qopgzgzgzgzatfg99gzfglmfgfgdwat7satg8", $2 = 1.2;
function $u(e) {
  let t = new Uint16Array(95);
  for (let r = 0; r < 95; r++) t[r] = parseInt(e.substr(r * 2, 2), 36);
  return t;
}
var nx, ox;
function hx(e) {
  return e >= 4352 && e <= 4447 || e >= 11904 && e <= 42191 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65072 && e <= 65103 || e >= 65280 && e <= 65376 || e >= 65504 && e <= 65510 || e >= 55296 && e <= 56319;
}
function cx(e) {
  return e === 173 || e >= 768 && e <= 879 || e >= 8203 && e <= 8207 || e >= 56320 && e <= 57343 || e >= 65024 && e <= 65039 || e === 65279;
}
var dx = { width(e, t, r) {
  let a = (r & 4) !== 0, s = r & 24 ? t / $2 : t, l = r & 1 ? ox ??= $u(sx) : nx ??= $u(ix), n = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e.charCodeAt(i);
    if (!(o < 32)) if (o < 127) n += a ? 600 : l[o - 32];
    else {
      if (cx(o)) continue;
      hx(o) ? n += a ? 1200 : 1e3 : n += a ? 600 : 580;
    }
  }
  return n * s / 1e3;
} };
function fx() {
  let e = globalThis;
  try {
    if (e.OffscreenCanvas) return new e.OffscreenCanvas(1, 1).getContext("2d");
    if (e.document) return e.document.createElement("canvas").getContext("2d");
  } catch {
    return null;
  }
  return null;
}
var ux = 2e4;
function bu() {
  let e = globalThis;
  return e.document?.fonts ?? e.fonts;
}
function px(e, t, r) {
  try {
    return e?.check(t, r) ?? !0;
  } catch {
    return !0;
  }
}
function gx(e, t = "monospace") {
  let r = fx();
  if (!r) return null;
  let a = /* @__PURE__ */ new Map(), s = "", l = bu()?.size;
  return { width(n, i, o) {
    let h = bu();
    h?.size !== l && (l = h?.size, a.clear());
    let c = o & 24 ? i / $2 : i, u = (o & 2 ? "italic " : "") + (o & 1 ? "bold " : "") + c + "px " + (o & 4 ? t : e), d = a.get(u);
    d || a.set(u, d = /* @__PURE__ */ new Map());
    let p = d.get(n);
    return p === void 0 && (u !== s && (r.font = s = u), p = r.measureText(n).width, px(h, u, n) && (d.size >= ux && d.clear(), d.set(n, p))), p;
  } };
}
var zd = /* @__PURE__ */ new Map();
function $t(e = "sans-serif", t = "monospace") {
  let r = e + `
` + t, a = zd.get(r);
  return a || (a = gx(e, t) ?? dx, zd.set(r, a)), a;
}
function mx() {
  zd.clear();
}
var yx = /[&<>"\x00-\x08\x0b\x0c\x0e-\x1f\x7f\ud800-\udfff\ufffe\uffff]/u, xx = /[&<>"]|[\x00-\x08\x0b\x0c\x0e-\x1f\x7f\ud800-\udfff\ufffe\uffff]+/gu, wx = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }, b2 = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f\ud800-\udfff\ufffe\uffff]/u;
function it(e) {
  return yx.test(e) ? e.replace(xx, (t) => wx[t] ?? "") : e;
}
function Ye(e) {
  return it(Tt(e));
}
var Pd = [];
for (let e = 0; e < 100; e++) Pd.push(e === 0 ? "" : e % 10 === 0 ? "." + e / 10 : "." + (e < 10 ? "0" + e : e));
function f(e) {
  let t = Math.round(e * 100);
  if (t === 0) return "0";
  if (t > 0) {
    if (t < 1e11) {
      let r = Math.floor(t / 100);
      return r + Pd[t - r * 100];
    }
  } else if (t > -1e11) {
    let r = -t, a = Math.floor(r / 100);
    return "-" + a + Pd[r - a * 100];
  }
  return String(t / 100);
}
function Pe(e, t, r, a, s) {
  let l = e.lines;
  if (l.length === 0) return "";
  let n = e.lineHeight, i = e.heights, o = e.size * 0.35, h = r - e.height / 2, c = l.length === 1 && l[0].length === 1 ? l[0][0] : void 0;
  if (c && c.icon === void 0 && c.math === void 0 && c.style === 0) return `<text${a} x="${f(t)}" y="${f(h + n / 2 + o)}" text-anchor="middle">${it(c.text)}</text>`;
  let u = Cs(e), d = a, p;
  a = sl(a, u);
  let g = "", y = "";
  for (let b = 0; b < l.length; b++) {
    let x = l[b], v = i ? i[b] : n, $ = h + v / 2, S = $ + o, R = !1;
    for (let D of x) (D.icon !== void 0 || D.math) && (R = !0);
    if (R) {
      let D = t - e.widths[b] / 2;
      for (let O of x) {
        if (O.math) {
          let U = `x="${f(D)}" y="${f($ - O.math.height / 2)}" width="${f(O.math.width)}" height="${f(O.math.height)}"`;
          p ??= Ax(d), y += p.halo === void 0 ? Ex(O.math, U, e.size, p.attrs) : `<rect ${U} rx="2" fill="${p.halo}"/>`;
        } else if (O.icon !== void 0) {
          let U = e.size * 1.1, q = s?.(O.icon) ?? "";
          y += `<svg class="pele-icon" data-icon="${Ye(O.icon)}" x="${f(D)}" y="${f($ - U / 2)}" width="${f(U)}" height="${f(U)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${q}</svg>`;
        } else O.text !== "" && (g += `<tspan x="${f(D)}" y="${f(S)}" text-anchor="start"${Jl(O.style & ~u)}>${it(O.text)}</tspan>`);
        D += O.width;
      }
    } else {
      for (let D = 0; D < x.length; D++) {
        let O = x[D], U = D === 0 ? ` x="${f(t)}" y="${f(S)}"` : "";
        g += `<tspan${U}${Jl(O.style & ~u)}>${it(O.text)}</tspan>`;
      }
      x.length === 0 && (g += `<tspan x="${f(t)}" y="${f(S)}"> </tspan>`);
    }
    h += v;
  }
  return `<text${a} text-anchor="middle" xml:space="preserve">${g}</text>${y}`;
}
var $x = / fill="([^"]*)"/, bx = / stroke="([^"]*)"/, Mx = / style="([^"]*)"/, vx = /(?:^|;)\s*fill:([^;]*)/, kx = /(?:^|;)\s*opacity:([^;]*)/;
function Ax(e) {
  let t = Mx.exec(e)?.[1] ?? "", r = (vx.exec(t)?.[1] ?? $x.exec(e)?.[1] ?? "").trim();
  if (r === "none") return { attrs: "", halo: bx.exec(e)?.[1] ?? "none" };
  let a = kx.exec(t)?.[1].trim();
  return { attrs: (r === "" ? "" : ` color="${r}"`) + (a ? ` opacity="${a}"` : "") };
}
function Ex(e, t, r, a) {
  return "svg" in e ? `<svg class="pele-math" ${t} overflow="visible"${a}>${e.svg}</svg>` : `<foreignObject class="pele-math" ${t} overflow="visible"${a}><div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:${f(r)}px;line-height:normal;white-space:nowrap">${e.html}</div></foreignObject>`;
}
var M2 = ' font-weight="var(--_w)"', v2 = ' font-style="italic"', Tx = ' text-decoration="underline"', k2 = ' font-family="var(--_fm)"', Cx = ' baseline-shift="sub" font-size="smaller"', Sx = ' baseline-shift="super" font-size="smaller"';
function Jl(e) {
  return (e & 1 ? M2 : "") + (e & 2 ? v2 : "") + (e & 4 ? k2 : "") + (e & 32 ? Tx : "") + (e & 8 ? Cx : e & 16 ? Sx : "");
}
function Cs(e) {
  let t = 7, r = !1;
  for (let a of e.lines) for (let s of a) s.icon !== void 0 || s.text === "" || (t &= s.style, r = !0);
  return r ? t : 0;
}
function sl(e, t) {
  return e + (t & 1 && !e.includes(' font-weight="') ? M2 : "") + (t & 2 && !e.includes(' font-style="') ? v2 : "") + (t & 4 && !e.includes(' font-family="') ? k2 : "");
}
var A2 = new Set("black blue blueviolet brown crimson darkblue darkcyan darkgreen darkmagenta darkolivegreen darkorchid darkred darkslateblue darkslategray darkviolet dimgray firebrick forestgreen green indigo maroon mediumblue mediumslateblue mediumvioletred midnightblue navy olive purple rebeccapurple royalblue saddlebrown seagreen sienna slateblue steelblue teal".split(" ")), E2 = new Set("aliceblue antiquewhite aqua aquamarine azure beige bisque blanchedalmond burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk cyan darkgoldenrod darkgray darkkhaki darkorange darksalmon darkseagreen darkturquoise deeppink deepskyblue dodgerblue floralwhite fuchsia gainsboro ghostwhite gold goldenrod gray greenyellow honeydew hotpink indianred ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightpink lightsalmon lightseagreen lightskyblue lightslategray lightsteelblue lightyellow lime limegreen linen magenta mediumaquamarine mediumorchid mediumpurple mediumseagreen mediumspringgreen mediumturquoise mintcream mistyrose moccasin navajowhite oldlace olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue red rosybrown salmon sandybrown seashell silver skyblue slategray snow springgreen tan thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen".split(" ")), Wd = "var(--pele-fg-on-light,#1f1f1f)", Bd = "var(--pele-fg-on-dark,#fff)", Gd = /[";]fill:([^;"]*)/, _x = /[";](?:fill-)?opacity:([^;"]*)/g, T2 = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i, Ix = /^(rgba?|hsla?)\(([^()]*)\)$/i, C2 = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?(%|deg|grad|rad|turn)?$/i, Nh = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4, Hd = (e, t, r) => 0.2126 * Nh(e) + 0.7152 * Nh(t) + 0.0722 * Nh(r), Nx = (e) => Math.min(Math.max(e, 0), 1), Rx = Math.sqrt(1.05 * (Hd(31 / 255, 31 / 255, 31 / 255) + 0.05)) - 0.05;
function qi(e, t) {
  let r = C2.exec(e);
  return !r || r[1] && r[1] !== "%" ? NaN : Nx(parseFloat(e) / (r[1] ? 100 : t));
}
function Dx(e) {
  let t = C2.exec(e);
  if (!t || t[1] === "%") return NaN;
  let r = t[1]?.toLowerCase(), a = parseFloat(e);
  return r === "turn" ? a * 360 : r === "rad" ? a * 180 / Math.PI : r === "grad" ? a * 0.9 : a;
}
function Lx(e, t) {
  let r = e.includes(","), [a, s, l] = r ? [e] : e.split("/");
  if (l !== void 0) return;
  let n = a.trim().split(r ? /\s*,\s*/ : /\s+/);
  if (r ? n.length < 3 || n.length > 4 : n.length !== 3) return;
  if (s !== void 0 && n.push(s.trim()), !r) return n.map((o) => o === "none" ? "0" : o);
  let i = n.slice(t ? 1 : 0, 3).filter((o) => o.endsWith("%")).length;
  return i === (t ? 2 : 3) || !t && i === 0 ? n : void 0;
}
function Ox(e) {
  let t = e.trim().toLowerCase(), r = t.replace("grey", "gray");
  return T2.test(t) || A2.has(r) || E2.has(r) || t === "transparent" || t === "currentcolor";
}
function S2(e) {
  let t = e.trim().toLowerCase(), r = t.replace("grey", "gray");
  if (A2.has(r)) return [0, 1];
  if (E2.has(r)) return [1, 1];
  if (T2.test(t)) {
    let h = t.length < 6 ? t.slice(1).replace(/./g, "$&$&") : t.slice(1), c = (u) => parseInt(h.slice(2 * u, 2 * u + 2), 16) / 255;
    return [Hd(c(0), c(1), c(2)), h.length === 8 ? c(3) : 1];
  }
  let a = Ix.exec(t), s = a?.[1].startsWith("hsl") ?? !1, l = a && Lx(a[2], s);
  if (!l) return;
  let n = l.length === 4 ? qi(l[3], 1) : 1, i;
  if (!s) i = l.slice(0, 3).map((h) => qi(h, 255));
  else {
    let h = (Dx(l[0]) % 360 + 360) % 360 / 30, c = qi(l[1], 100), u = qi(l[2], 100), d = c * Math.min(u, 1 - u);
    i = [0, 8, 4].map((p) => {
      let g = (p + h) % 12;
      return u - d * Math.max(-1, Math.min(g - 3, 9 - g, 1));
    });
  }
  let o = Hd(i[0], i[1], i[2]);
  return Number.isNaN(o + n) ? void 0 : [o, n];
}
function _2(e) {
  let t = 1;
  for (let [, r] of e.matchAll(_x)) t *= qi(r.trim(), 1);
  return t;
}
var gi = /* @__PURE__ */ new Map();
function si(e, t = "") {
  let r = `${e}\0${t}`;
  if (gi.has(r)) return gi.get(r);
  gi.size > 1e3 && gi.clear();
  let a = Fx(e, t);
  return gi.set(r, a), a;
}
function Fx(e, t) {
  let r = Gd.exec(e), a = r && !Gd.test(t) ? S2(r[1]) : void 0;
  if (a && a[1] * _2(e) >= 0.5) return a[0] > Rx ? Wd : Bd;
}
function Ia(e) {
  let t = Gd.exec(e)?.[1].trim().toLowerCase();
  if (!t || t === "none" || t === "transparent") return !1;
  let r = _2(e);
  return (S2(t)?.[1] ?? 1) * (Number.isNaN(r) ? 1 : r) > 0;
}
function Xt(e, t) {
  let r = si(e.shape, e.text) ?? t;
  return r ? ` fill="${r}"` : "";
}
var zx = { pie: { prefix: "pie", first: 1 }, gitGraph: { prefix: "git", first: 0 }, timeline: { prefix: "cScale", first: 0 }, radar: { prefix: "cScale", first: 0 }, treemap: { prefix: "cScale", first: 0 }, mindmap: { prefix: "cScale", first: 1 }, venn: { prefix: "venn", first: 1, repeat: !0 } }, is = 8, Px = /^[\w\s#%.,+\-/()]{1,200}$/, Wx = /([\w-]*)\s*\(/g, Bx = /var\(\s*([\w-]*)/gi, Gx = /* @__PURE__ */ new Set(["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color", "color-mix", "light-dark", "var"]), I2 = (e) => Ca(e) ? e : {};
function Hx(e) {
  if (typeof e != "string") return;
  let t = e.trim();
  if (!Px.test(t)) return;
  if (!t.includes("(")) return Ox(t) ? t : void 0;
  let r = 0;
  for (let a of t) if (a === "(") r++;
  else if (a === ")" && --r < 0) return;
  if (r === 0) {
    for (let [, a] of t.matchAll(Wx)) if (!Gx.has(a.toLowerCase())) return;
    for (let [, a] of t.matchAll(Bx)) if (!a.startsWith("--pele-")) return;
    return t;
  }
}
function Ux(e) {
  let t = [], r = 0, a = 0;
  for (let s = 0; s < e.length; s++) {
    let l = e[s];
    l === "(" ? r++ : l === ")" ? r-- : l === "," && r === 0 && (t.push(e.slice(a, s)), a = s + 1);
  }
  return t.push(e.slice(a)), t.map((s) => s.trim());
}
function Yx(e, t) {
  if (e === "xychart") {
    let s = I2(t.xyChart).plotColorPalette;
    return typeof s == "string" ? { list: Ux(s), repeat: !0 } : void 0;
  }
  let r = zx[e];
  if (r === void 0) return;
  let a = [];
  for (let s = 0; s < is; s++) a.push(t[r.prefix + (r.first + s)]);
  return r.repeat && (a = a.filter((s) => s != null && s !== "")), { list: a, repeat: r.repeat === !0 };
}
var Ud = { style: "", inks: [] };
function jx(e, t) {
  let r = Yx(e, I2(t.themeVariables));
  if (r === void 0 || r.list.length === 0) return Ud;
  let { list: a, repeat: s } = r, l = "", n = [];
  for (let i = 0; i < is && !(!s && i >= a.length); i++) {
    let o = Hx(a[i % a.length]);
    o !== void 0 && (l += `;--pele-series-${i + 1}:${o}`, n[i] = si(`;fill:${o}`));
  }
  return l === "" ? Ud : { style: it(l), inks: n };
}
var ss = Ud;
function qx(e, t) {
  let r = ss;
  ss = e;
  try {
    return t();
  } finally {
    ss = r;
  }
}
var Vx = () => ss.style;
function eh(e) {
  let t = ss.inks[(e % is + is) % is];
  return t ? ` fill="${t}"` : "";
}
function ns(e) {
  return e.ownerDocument?.defaultView ?? globalThis;
}
function Mu(e, t) {
  let r = e.clientWidth - (parseFloat(t.paddingLeft) || 0) - (parseFloat(t.paddingRight) || 0);
  return r > 0 ? r : 0;
}
function Kx(e, t, r, a, s) {
  let l = t.width / r, n = t.height / r, i = (o, h, c) => h >= c ? Math.min(Math.max(o, c - h), 0) : Math.min(Math.max(o, 0), c - h);
  return { x: i(a, l, e.width), y: i(s, n, e.height), width: l, height: n };
}
var yl = 1.25, Gs = 48, Xx = 4, Zx = "--_bg:var(--pele-bg,#fff);--_fg:var(--pele-fg,#1f1f1f);--_b:var(--pele-border,#8a8a8a);position:absolute;top:var(--pele-zoom-top,8px);right:var(--pele-zoom-right,8px);bottom:var(--pele-zoom-bottom,auto);left:var(--pele-zoom-left,auto);display:flex;flex-direction:column;gap:2px;padding:2px;width:auto;max-width:none;border:1px solid var(--_b);border-radius:var(--pele-radius,4px);background:var(--_bg);color:var(--_fg);line-height:0", Qx = "appearance:none;display:grid;place-items:center;width:24px;height:24px;margin:0;padding:0;border:0;border-radius:calc(var(--pele-radius,4px) - 1px);background:transparent;color:inherit;font:inherit;cursor:var(--pele-zoom-cursor,pointer)", Jx = { zoomIn: "M5 12h14M12 5v14", zoomOut: "M5 12h14", reset: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" }, ew = { zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset zoom" };
function g5(e, t = {}) {
  return N2(e, t, !0);
}
function N2(e, t, r) {
  let a = null, s = { width: 0, height: 0 }, l = { width: 0, height: 0 }, n = { width: 0, height: 0 }, i = !1, o = "", h = { width: "", height: "", maxWidth: "", margin: "", display: "" }, c = null, u = 0, d = 0, p = 0, g = 0, y = () => ns(e), b = () => s.width > 0 && l.width > 0 ? l.width / s.width : 1, x = () => Math.max(b(), t.maxScale ?? 3), v = () => a !== null && s.width > 0 && (t.always === !0 || b() < 0.999), $ = () => {
    if (!a || u !== 0) return;
    let he = a.getBoundingClientRect();
    l = { width: he.width, height: he.height }, n = { width: Math.max(l.width, e.clientWidth), height: Math.max(l.height, e.clientHeight) }, i = n.width > l.width + 1 || n.height > l.height + 1, i || (n = l);
    let re = y().getComputedStyle(e);
    o = ["Top", "Right", "Bottom", "Left"].map((P) => `${-(parseFloat(re.getPropertyValue(`padding-${P.toLowerCase()}`)) || 0)}px`).join(" ");
  }, S, R = {}, D = !1, O = () => {
    if (t.controls === !1) return;
    let he = v();
    if (!S) {
      if (!he) return;
      let P = e.ownerDocument;
      S = P.createElement("div"), S.className = "pele pele-zoom", S.setAttribute("style", Zx);
      let ne = { zoomIn: () => G((u || b()) * yl * yl), zoomOut: () => G((u || b()) / (yl * yl)), reset: () => C() };
      for (let ce of ["zoomIn", "zoomOut", "reset"]) {
        let pe = P.createElement("button"), Me = t.labels?.[ce] ?? ew[ce];
        pe.type = "button", pe.className = `pele-zoom-${ce === "zoomIn" ? "in" : ce === "zoomOut" ? "out" : "reset"}`, pe.setAttribute("style", Qx), pe.setAttribute("aria-label", Me), pe.title = Me, pe.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${Jx[ce]}"/></svg>`, pe.addEventListener("click", ne[ce]), R[ce] = pe, S.append(pe);
      }
    }
    he && !D && y().getComputedStyle(e).position === "static" && (e.style.position = "relative", D = !0), he && S.parentNode !== e && e.append(S), S.hidden = !he, S.style.display = he ? "flex" : "none";
    let re = (P, ne) => {
      P && (P.disabled = ne, P.style.opacity = ne ? "0.35" : "", P.style.cursor = ne ? "default" : "var(--pele-zoom-cursor,pointer)");
    };
    re(R.zoomIn, (u || b()) >= x() * 0.999), re(R.zoomOut, u === 0), R.reset && (R.reset.style.display = u === 0 ? "none" : "grid");
  }, U = (he) => S !== void 0 && he.target instanceof y().Node && S.contains(he.target), q = () => {
    a && (ie(), a.style.width = h.width, a.style.height = h.height, a.style.maxWidth = h.maxWidth, a.style.margin = h.margin, a.style.display = h.display);
  }, C = () => {
    a && (q(), u = 0, a.setAttribute("viewBox", `0 0 ${s.width} ${s.height}`), a.style.cursor = "", a.style.userSelect = "", $(), a.style.touchAction = v() ? "pan-y" : "", v() ? a.setAttribute("tabindex", "0") : a.removeAttribute("tabindex"), ue(v()), O(), ee());
  }, ee = () => {
    if (!a || !S || S.hidden) return;
    let he = S.getBoundingClientRect(), re = [...a.querySelectorAll("text")].some((Ae) => {
      let Ee = Ae.getBoundingClientRect();
      return Ee.right > he.left && Ee.left < he.right && Ee.bottom > he.top && Ee.top < he.bottom;
    }), P = a.getBoundingClientRect(), ne = he.left - Xx;
    if (!re || P.right - ne >= P.width / 2) return;
    let ce = e.getBoundingClientRect(), pe = e.offsetWidth > 0 ? ce.width / e.offsetWidth : 1, Me = parseFloat(y().getComputedStyle(e).paddingRight) || 0, xe = ce.left + (e.clientLeft + e.clientWidth - Me) * pe, ve = [a.style.maxWidth, a.style.marginRight];
    a.style.maxWidth = `${(ne - P.left) / pe}px`, a.style.marginRight = `${Math.max(xe - ne, 0) / pe}px`, c = { before: ve, after: [a.style.maxWidth, a.style.marginRight] }, a.getBoundingClientRect().right > ne + 1 && ie(), $();
  }, ie = () => {
    !a || !c || (a.style.maxWidth === c.after[0] && (a.style.maxWidth = c.before[0]), a.style.marginRight === c.after[1] && (a.style.marginRight = c.before[1]), c = null);
  }, G = (he, re, P) => {
    if (!a || (u === 0 && $(), !v())) return;
    let ne = u || b(), ce = Math.min(Math.max(he, b()), x());
    if (ce <= b() * 1.001) {
      C();
      return;
    }
    let pe = a.getBoundingClientRect(), Me = re ?? pe.left + pe.width / 2, xe = P ?? pe.top + pe.height / 2, ve = (u ? d : 0) + (Me - pe.left) / ne, Ae = (u ? p : 0) + (xe - pe.top) / ne;
    u = ce;
    let Ee = pe;
    i && (a.style.maxWidth = "none", a.style.margin = o, a.style.display = "block", a.style.width = `${n.width}px`, a.style.height = `${n.height}px`, Ee = a.getBoundingClientRect()), z(ve - (Me - Ee.left) / u, Ae - (xe - Ee.top) / u), a.style.cursor = "grab", a.style.userSelect = "none", a.style.touchAction = "none", O();
  }, z = (he, re) => {
    if (!a) return;
    let P = Kx(s, n, u, he, re);
    d = P.x, p = P.y, a.setAttribute("viewBox", `${d} ${p} ${P.width} ${P.height}`);
  }, _ = (he, re) => {
    u !== 0 && z(d - he / u, p - re / u);
  }, T = () => {
    A();
    let he = e.clientWidth + e.clientHeight;
    he !== g && (g = he, C());
  }, E, M, A = () => {
    if (!r) return;
    let he = y();
    he !== M && (E?.disconnect(), M = he, E = he.ResizeObserver ? new he.ResizeObserver(T) : void 0, E?.observe(e));
  }, m = () => {
    A(), u !== 0 ? q() : ie();
    let he = e.firstElementChild;
    if (a = he && he.localName === "svg" ? he : null, u = 0, !a) {
      S?.remove(), ue(!1);
      return;
    }
    s = { width: Number(a.getAttribute("width")) || 0, height: Number(a.getAttribute("height")) || 0 }, h = { width: a.style.width, height: a.style.height, maxWidth: a.style.maxWidth, margin: a.style.margin, display: a.style.display }, C();
  }, I = /* @__PURE__ */ new Map(), k = !1, w = 0, B = 0, N = () => {
    let [he, re] = [...I.values()];
    return { distance: Math.hypot(he.x - re.x, he.y - re.y), x: (he.x + re.x) / 2, y: (he.y + re.y) / 2 };
  }, j = () => {
    k = !1;
  }, F = (he) => {
    !v() || U(he) || he.pointerType === "mouse" && he.button !== 0 || (I.set(he.pointerId, { x: he.clientX, y: he.clientY }), w = 0, I.size === 2 && (B = N().distance), (I.size === 2 || u !== 0) && (e.setPointerCapture?.(he.pointerId), a && (a.style.cursor = "grabbing")));
  }, Y = (he) => {
    let re = I.get(he.pointerId);
    if (re) {
      if (I.size === 2) {
        let P = N();
        I.set(he.pointerId, { x: he.clientX, y: he.clientY });
        let ne = N();
        B > 0 && ne.distance > 0 && G((u || b()) * (ne.distance / P.distance), ne.x, ne.y), _(ne.x - P.x, ne.y - P.y), k = !0;
        return;
      }
      I.set(he.pointerId, { x: he.clientX, y: he.clientY }), u !== 0 && (w += Math.abs(he.clientX - re.x) + Math.abs(he.clientY - re.y), w > 4 && (k = !0), _(he.clientX - re.x, he.clientY - re.y));
    }
  }, W = (he) => {
    I.delete(he.pointerId) && (B = 0, I.size === 0 && a && u !== 0 && (a.style.cursor = "grab"));
  }, K = (he) => {
    !k || he.detail === 0 || (k = !1, he.preventDefault(), he.stopPropagation());
  }, H = (he) => {
    if (!(he.ctrlKey || he.metaKey) || !v()) return;
    he.preventDefault(), u === 0 && $();
    let re = Math.min(Math.max(-he.deltaY, -24), 24);
    G((u || b()) * 2 ** (re * 0.02), he.clientX, he.clientY);
  }, te = (he) => {
    !v() || U(he) || (he.preventDefault(), u !== 0 ? C() : G(Math.max(1, b() * 2), he.clientX, he.clientY));
  }, Q = (he) => {
    if (!v() || U(he) || he.ctrlKey || he.metaKey || he.altKey) return;
    let re = he.key;
    if (re === "+" || re === "=") G((u || b()) * yl);
    else if (re === "-") G((u || b()) / yl);
    else {
      if (u === 0) return;
      if (re === "0" || re === "Escape") C();
      else if (re === "ArrowLeft") _(Gs, 0);
      else if (re === "ArrowRight") _(-Gs, 0);
      else if (re === "ArrowUp") _(0, Gs);
      else if (re === "ArrowDown") _(0, -Gs);
      else return;
    }
    he.preventDefault();
  }, L = (he) => {
    if (!a || he.target !== a) return;
    let re = !0;
    try {
      re = a.matches(":focus-visible");
    } catch {
    }
    a.style.outline = re ? "" : "none";
  }, X = 0, le = (he) => {
    v() && (he.preventDefault(), u === 0 && $(), X = u || b());
  }, J = (he) => {
    if (X === 0) return;
    he.preventDefault();
    let { scale: re, clientX: P, clientY: ne } = he;
    G(X * re, P, ne);
  }, V = () => {
    X = 0;
  }, Z = [["pointerdown", j, { capture: !0 }], ["pointerdown", F], ["pointermove", Y], ["pointerup", W], ["pointercancel", W], ["click", K, { capture: !0 }], ["dblclick", te], ["keydown", Q], ["focusin", L]];
  for (let [he, re, P] of Z) e.addEventListener(he, re, P);
  let ae = [["wheel", H, { passive: !1 }], ["gesturestart", le, { passive: !1 }], ["gesturechange", J, { passive: !1 }], ["gestureend", V, { passive: !1 }]], oe = !1;
  function ue(he) {
    if (he !== oe) {
      oe = he;
      for (let [re, P, ne] of ae) he ? e.addEventListener(re, P, ne) : e.removeEventListener(re, P, ne);
      he || (X = 0);
    }
  }
  return g = e.clientWidth + e.clientHeight, m(), { get scale() {
    return u || b();
  }, get fit() {
    return b();
  }, zoomBy(he) {
    G((u || b()) * he);
  }, zoomTo(he) {
    G(he);
  }, reset: C, refresh: m, resized: T, destroy() {
    C(), ie(), a && (a.style.touchAction = "", a.removeAttribute("tabindex")), S?.remove(), D && (e.style.position = ""), E?.disconnect(), ue(!1);
    for (let [he, re, P] of Z) e.removeEventListener(he, re, P);
  } };
}
function Rh(e, t) {
  let r = t ? ns(t).getComputedStyle(t) : e;
  return { family: r.getPropertyValue("--pele-font").trim() || e.fontFamily || void 0, mono: r.getPropertyValue("--pele-font-mono").trim() || void 0 };
}
function tw(e) {
  return [.../* @__PURE__ */ new Set([e.ownerDocument?.fonts, globalThis.document?.fonts])].filter((t) => t !== void 0);
}
var Dh = /* @__PURE__ */ new WeakMap();
function rw(e) {
  let t = Dh.get(e);
  return t || (t = e.ready.then(() => {
    Dh.delete(e), mx();
  }), Dh.set(e, t)), t;
}
var Yd = /* @__PURE__ */ new WeakMap();
function aw(e, t) {
  Promise.all(e.map(rw)).then(() => {
    let r = t.deref();
    r && Yd.get(r)?.();
  });
}
var Hs = /* @__PURE__ */ new WeakMap(), lw = 0, iw = Math.random().toString(36).slice(2, 7), sw = "position:relative;height:1.3em;margin-top:-1.3em;line-height:1.3;font-size:0.8em;color:var(--pele-error,#e45756);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;", nw = "margin:0;font-size:0.8em;font-family:var(--pele-font-mono,monospace);color:var(--pele-error,#e45756);white-space:pre-wrap;";
function ow(e) {
  return e instanceof Error ? e.message : String(e);
}
function hw(e) {
  let t = e.split(`
`).filter((r) => r.trim() !== "");
  return t.length > 1 ? `${t[0]} ${t[t.length - 1]}` : t[0] ?? "";
}
function cw(e, t, r, a = {}) {
  Hs.get(t)?.destroy();
  let s = r, l = a, n, i, o = !1, h, c, u, d = `pele-${iw}-${++lw}`, p = {}, g, y = -1, b = !1, x = !1, v = !1, $ = (w, B) => {
    let { onRender: N, onError: j, sanitize: F, ...Y } = l, W = { ...Y, idPrefix: Y.idPrefix ?? d, fontFamily: Y.fontFamily ?? p.family, fontFamilyMono: Y.fontFamilyMono ?? p.mono, maxWidth: void 0 };
    B && (c = e.render(n, W), g = void 0);
    let K = l.maxWidth ?? Mu(t, w);
    return y = K, K > 0 && K < c.width && (g ??= e.render(n, { ...W, maxWidth: 1 }).svg !== c.svg, g) ? e.render(n, { ...W, maxWidth: K }) : c;
  }, S = (w) => {
    l.sanitize ? t.replaceChildren(l.sanitize(w)) : t.innerHTML = w;
  }, R, D = () => {
    let w = u ? t.firstElementChild : null;
    if (w?.style && (w.style.opacity = h === void 0 ? "" : "0.4"), h === void 0) {
      R?.remove(), R = void 0;
      return;
    }
    let B = t.ownerDocument;
    if (!B) return;
    R ??= B.createElement("div"), R.className = "pele pele-error";
    let N = ow(h);
    w ? (R.textContent = hw(N), R.title = N, R.setAttribute("style", sw), R.parentNode !== t && t.append(R)) : (R.textContent = N, R.removeAttribute("title"), R.setAttribute("style", nw), t.replaceChildren(R));
  }, O = (w) => {
    h = w, D(), l.onError?.(w);
  }, U = () => {
    if (x || v) return;
    let w = tw(t).filter((B) => B.status === "loading");
    w.length !== 0 && (x = !0, aw(w, new WeakRef(k)));
  }, q = () => {
    x = !1, b = !0, T();
  }, C = (w, B = !w) => {
    let N = ns(t).getComputedStyle(t), j = t.firstElementChild ?? null, F = { fonts: p, natural: c, adapts: g, drawnFor: y, stale: b }, Y;
    try {
      if (w && (p = Rh(N, j), b = t.isConnected === !1), Y = $(N, w), B && Y.svg === u?.svg) {
        w && (i = n), o && h !== void 0 && (h = void 0, D());
        return;
      }
      S(Y.svg);
    } catch (W) {
      throw { fonts: p, natural: c, adapts: g, drawnFor: y, stale: b } = F, W;
    }
    if (w && (i = n), w && !j && t.firstElementChild) {
      let W = Rh(N, t.firstElementChild);
      if (W.family !== p.family || W.mono !== p.mono) {
        let K = { fonts: p, natural: c, adapts: g, drawnFor: y };
        p = W;
        try {
          let H = $(N, !0);
          S(H.svg), Y = H;
        } catch {
          ({ fonts: p, natural: c, adapts: g, drawnFor: y } = K);
        }
      }
    }
    u = Y, o && (h = void 0), D(), ee?.refresh(), U(), l.onRender?.(Y);
  }, ee, ie = !1, G = () => {
    let w = l.zoom ?? "auto";
    w !== ie && (ee?.destroy(), ie = w, ee = w === !1 ? void 0 : N2(t, typeof w == "object" ? w : { always: w === !0 }, !1));
  }, z = () => t.isConnected === !1 || !(t.clientWidth > 0), _ = () => t.isConnected !== !1 && !(t.clientWidth > 0), T = () => {
    if (v || (I(), !n || z())) return;
    let w = ns(t).getComputedStyle(t), B = Rh(w, t.firstElementChild ?? null);
    try {
      if (b || B.family !== p.family || B.mono !== p.mono) C(!0, !0);
      else if (g !== !1 && l.maxWidth === void 0) {
        let N = Mu(t, w);
        N !== y && N !== u?.width && C(!1);
      }
    } catch (N) {
      b = !1, o && (h = N), n !== i && (n = i, o = !1), D(), l.onError?.(N);
    }
    ee?.resized(), U();
  }, E, M, A, m = () => {
    A !== void 0 && E?.cancelAnimationFrame(A), A = void 0;
  }, I = () => {
    let w = ns(t);
    w !== E && (M?.disconnect(), m(), E = w, M = w.ResizeObserver ? new w.ResizeObserver(() => {
      if (A === void 0) {
        if (!w.requestAnimationFrame) return T();
        A = w.requestAnimationFrame(() => {
          A = void 0, T();
        });
      }
    }) : void 0, M?.observe(t));
  }, k = { get result() {
    return u;
  }, get source() {
    return s;
  }, get error() {
    return h;
  }, get zoom() {
    return ee;
  }, update(w, B = l) {
    let N = !o || w !== s || B.limit !== l.limit || B.maxEdges !== l.maxEdges || B.config !== l.config;
    s = w, l = B;
    let j = n;
    if (N) try {
      j = e.parse(w, B);
    } catch (Y) {
      o = !1, O(Y), G();
      return;
    }
    let F = u;
    if (n = j, o = !0, _()) {
      b = !0, G();
      return;
    }
    try {
      C(!0);
    } catch (Y) {
      if (u !== F) throw G(), Y;
      n = i, o = !1, O(Y);
    }
    G();
  }, refresh: T, destroy() {
    v = !0, M?.disconnect(), M = void 0, m(), E = void 0, ee?.destroy(), Yd.delete(k), Hs.get(t) === k && Hs.delete(t);
  } };
  Yd.set(k, q);
  try {
    n = e.parse(r, a), o = !0, C(!0);
  } catch (w) {
    if (u) throw w;
    n = i, o = !1, O(w);
  }
  return G(), I(), Hs.set(t, k), k;
}
var th = /* @__PURE__ */ new Map();
function dw(...e) {
  for (let t of e) th.set(t.type, t);
}
function m5(e) {
  return th.has(e);
}
var fw = 5e4, uw = 4e6, pw = 5e3;
function R2(e) {
  try {
    return e();
  } catch (t) {
    throw t instanceof RangeError ? new at("Diagram is nested too deeply.", "limit") : t;
  }
}
function D2(e, t) {
  try {
    return t();
  } catch (r) {
    if (r instanceof RangeError) throw new at("Diagram is nested too deeply.", "limit", e);
    if (r instanceof at) {
      r.type ??= e.type, r.mermaidType ??= e.mermaidType;
      let a = Od(r.message);
      a !== r.message && (r.stack = r.stack?.replace(r.message, () => a), r.message = a), r.snippet = Od(r.snippet);
    }
    throw r;
  }
}
var L2 = /* @__PURE__ */ new WeakMap();
function O2(e, t = fw, r = pw, a) {
  if (e.length > t) throw new at(`Diagram source is longer than the limit of ${t} characters.`, "limit");
  let s = zf(e), l = d2(s.text);
  if (l === null) throw new at("No diagram type detected for the given text.", "unsupported-diagram");
  let n = th.get(l.type);
  if (n === void 0) throw new at(`Diagram type "${l.type}" is not supported yet.`, "unsupported-diagram", l);
  let i = a ? { ...a, ...s.config } : s.config, o = n.keepComments === !0, h = w2(o ? s.withComments : s.text) + `
`, c = D2(l, () => Iy({ parsed: h, find: gw(e, o) }, () => n.parse(h, i, s.title, s.lineOffset, { maxEdges: r })));
  return { ...l, diagram: n, model: c, config: i };
}
function gw(e, t) {
  let r, a = "";
  return (s) => {
    if (r === void 0) {
      r = [];
      let l = zf(e, r);
      w2(t ? l.withComments : m2(l.withComments, r), r), a = y2(e) + `
`;
    }
    return [a, bs(r, s)];
  };
}
function mw(e, t) {
  if (typeof e == "string") return O2(e, t.limit, t.maxEdges, t.config);
  let r = L2.get(e);
  if (r === void 0) throw new TypeError("render() takes diagram text or a model that parse() returned.");
  return r;
}
function yw(e) {
  return d2(zf(e).text)?.type ?? null;
}
function y5(e) {
  try {
    let t = yw(e);
    return t !== null && th.has(t);
  } catch {
    return !1;
  }
}
function xw(e, t = {}) {
  return R2(() => {
    let r = O2(e, t.limit, t.maxEdges, t.config), a = r.model;
    return Object.defineProperty(a, "mermaidType", { value: r.mermaidType, enumerable: !0 }), L2.set(a, r), a;
  });
}
function ww(e, t = {}) {
  return R2(() => {
    let { type: r, mermaidType: a, diagram: s, model: l, config: n } = mw(e, t), i = n[s.section ?? r], o = typeof i == "object" && i !== null && !Array.isArray(i) && i.useMaxWidth === !1, h = t.responsive ?? !o, c = t.icons, u = c && ((g) => c(Tt(g))), d = D2({ type: r, mermaidType: a }, () => qx(jx(r, n), () => zy(s.math ? t.math : void 0, () => Fy(u, () => s.render(l, n, { ...t, responsive: h, icons: u }))))), p = t.outputLimit ?? uw;
    if (d.svg.length > p) throw new at(`Diagram output is longer than the limit of ${p} characters.`, "limit", { type: r, mermaidType: a });
    for (let g of d.links) g.id = Tt(g.id);
    return { type: r, mermaidType: a, ...d };
  });
}
function x5(e, t, r = {}) {
  return cw({ parse: xw, render: ww }, e, t, r);
}
var Vi = "about:blank", $w = /^([^\w]*)(javascript|data|vbscript)/im, vu = /&#(\w+)(^\w|;)?/g, ku = /&(newline|tab);/gi, Lh = /[\u0000-\u001F\u007F-\u009F -‍﻿\uD800-\uDFFF\uFFFE\uFFFF]/gimu, bw = /^.+(:|&colon;)/gim, Au = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
function Eu(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function jd(e, t) {
  let r = t ? Eu(e.trim()) : e.trim(), a, s = 0;
  do {
    if (++s > 32) return;
    r = r.replace(Lh, "").replace(vu, (l, n) => String.fromCharCode(n)).replace(ku, "").replace(Lh, "").replace(Au, "").trim(), t && (r = Eu(r)), a = r.match(Lh) || r.match(vu) || r.match(ku) || r.match(Au);
  } while (a && a.length > 0);
  return r;
}
function rh(e) {
  if (!e) return Vi;
  let t = jd(e, !0), r = jd(e, !1);
  if (!t || !r) return Vi;
  if (t[0] === "." || t[0] === "/") return r;
  let a = t.trimStart().match(bw);
  if (!a) return r;
  let s = a[0].toLowerCase().trim();
  if ($w.test(s)) return Vi;
  let l = r.trimStart().replace(/\\/g, "/");
  if (s === "mailto:" || s.includes("://")) return l;
  if (s === "http:" || s === "https:") {
    let n;
    try {
      n = new URL(l);
    } catch {
      return Vi;
    }
    return n.protocol = n.protocol.toLowerCase(), n.hostname = n.hostname.toLowerCase(), n.toString();
  }
  return l;
}
function ni(e) {
  return rh(Tt(e));
}
var Mw = ["http", "https", "mailto", "tel"], vw = ["http", "https"], kw = /^([a-z][a-z0-9+.-]*):/i, Aw = /^[\\/]{2}/;
function Tu(e, t) {
  if (Aw.test(e)) return !1;
  let r = kw.exec(e);
  return !r || t.includes(r[1].toLowerCase());
}
function F2(e, t) {
  let r = jd(e, !0);
  return r !== void 0 && Tu(e, t) && Tu(r, t) ? e : void 0;
}
function Ao(e, t) {
  return t.links === !1 ? void 0 : F2(e, t.linkSchemes ?? Mw);
}
function Ew(e, t) {
  return t.images === !1 ? void 0 : F2(e, t.imageSchemes ?? vw);
}
var Tw = new RegExp(b2.source, "gu");
function Pf(e, t) {
  let r = rh(e);
  if (r === Vi || Ao(r, t) === void 0) return !1;
  let a = e.replace(Tw, "").replace(/[\t\n\r]/g, "").replace(/^[\x00-\x20]+/, "");
  return Ao(a, t) !== void 0;
}
function oi(e, t, r, a, s, l = "") {
  let n = Ao(t, s);
  return n === void 0 ? e : (a.push({ id: r, href: n, internal: !1 }), `<a href="${it(n)}"${l}${Ss(s)}>${e}</a>`);
}
function Ss(e) {
  let t = e.linkRel ?? "noopener";
  return t ? ` rel="${it(t)}"` : "";
}
var Cw = [["rect", "proc", "process", "rectangle", "squareRect"], ["rounded", "event", "roundedRect"], ["stadium", "terminal", "pill"], ["fr-rect", "subprocess", "subproc", "framed-rectangle", "subroutine"], ["cyl", "db", "database", "cylinder"], ["datastore", "data-store"], ["folder", "directory"], ["bucket"], ["console"], ["browser"], ["person"], ["circle", "circ"], ["bang"], ["cloud"], ["diam", "decision", "diamond", "question"], ["hex", "hexagon", "prepare"], ["lean-r", "lean-right", "in-out", "lean_right"], ["lean-l", "lean-left", "out-in", "lean_left"], ["trap-b", "priority", "trapezoid-bottom", "trapezoid"], ["trap-t", "manual", "trapezoid-top", "inv-trapezoid", "inv_trapezoid"], ["dbl-circ", "double-circle", "doublecircle"], ["text"], ["notch-rect", "card", "notched-rectangle"], ["lin-rect", "lined-rectangle", "lined-process", "lin-proc", "shaded-process"], ["sm-circ", "start", "small-circle", "stateStart"], ["fr-circ", "stop", "framed-circle", "stateEnd"], ["fork", "join", "forkJoin"], ["hourglass", "collate"], ["brace", "comment", "brace-l"], ["brace-r"], ["braces"], ["bolt", "com-link", "lightning-bolt"], ["doc", "document"], ["delay", "half-rounded-rectangle"], ["h-cyl", "das", "horizontal-cylinder"], ["lin-cyl", "disk", "lined-cylinder"], ["curv-trap", "curved-trapezoid", "display"], ["div-rect", "div-proc", "divided-rectangle", "divided-process"], ["tri", "extract", "triangle"], ["win-pane", "internal-storage", "window-pane"], ["f-circ", "junction", "filled-circle"], ["notch-pent", "loop-limit", "notched-pentagon"], ["flip-tri", "manual-file", "flipped-triangle"], ["sl-rect", "manual-input", "sloped-rectangle"], ["docs", "documents", "st-doc", "stacked-document"], ["st-rect", "procs", "processes", "stacked-rectangle"], ["bow-rect", "stored-data", "bow-tie-rectangle"], ["cross-circ", "summary", "crossed-circle"], ["tag-doc", "tagged-document"], ["tag-rect", "tagged-rectangle", "tag-proc", "tagged-process"], ["flag", "paper-tape"], ["odd", "rect_left_inv_arrow"], ["lin-doc", "lined-document"]], Sw = ["state", "choice", "note", "composite", "rectWithTitle", "labelRect", "block_arrow", "collapsedGroup", "iconSquare", "iconCircle", "icon", "iconRounded", "imageSquare", "anchor", "kanbanItem", "mindmapCircle", "defaultMindmapNode", "classBox", "erBox", "requirementBox", "usecaseActor", "usecaseActorHollow", "usecaseActorAwesome", "usecaseActorIcon", "usecaseBusiness", "usecaseEllipse", "usecaseJsonTable"], _w = /* @__PURE__ */ new Map([["square", "rect"], ["round", "rounded"], ["ellipse", "ellipse"], ["hexagon", "hex"], ["diamond", "diam"]]), ah = /* @__PURE__ */ new Map();
for (let e of Cw) for (let t of e) ah.set(t, e[0]);
for (let e of Sw) ah.set(e, e);
function z2(e) {
  return ah.has(e);
}
function P2(e) {
  return e === void 0 ? "rect" : _w.get(e) ?? ah.get(e) ?? "rect";
}
var Iw = /* @__PURE__ */ new Map([["task", "roundedRect"], ["tool", "subroutine"], ["input", "lean-right"], ["decision", "diamond"], ["refdoc", "lin-doc"], ["action", "hexagon"], ["round", "rect"]]), Nw = /* @__PURE__ */ new Set(["doc", "stadium", "terminal", "circle", "trapezoid", "inv_trapezoid", "inv-trapezoid", "doublecircle", "double-circle", "typeDeclaration", "procs", "lean_left", "lean-left", "in-out", "cylinder", "ellipse", "odd", "tag-rect", "tagged-rectangle", "delay", "half-rounded-rectangle", "lin-rect", "lined-rectangle", "win-pane", "window-pane", "curv-trap", "curved-trapezoid"]), Rw = /* @__PURE__ */ new Set(["roundedRect", "subroutine", "subprocess", "subproc", "framed-rectangle", "lean-right", "diamond", "lin-doc", "lined-document", "hexagon", "hex", "connector", "collapsedGroup"]), mi = "roundedRect";
function ro(e) {
  return e && (Iw.get(e) ?? e);
}
function Dw(e) {
  return z2(e) || e === "constructor";
}
function Lw(e, t) {
  for (let r of e) r.isGroup || ((!r.shape || r.shape === "squareRect" || r.shape === "rect") && (r.shape = mi), Nw.has(r.shape) ? (t.emitError("SHAPE_REMOVED", `shape "${r.shape}" was removed in v0.8.1, using "${mi}"`, { nodeId: r.id }), r.shape = mi) : Rw.has(r.shape) || (t.emitWarning("SHAPE_UNSUPPORTED", `shape "${r.shape}" is not supported, using "${mi}"`, { nodeId: r.id }), r.shape = mi));
}
var Ow = /* @__PURE__ */ new Set(["shape", "view", "icon", "img", "form", "pos", "w", "h", "class", "style", "labelType"]), Fw = /* @__PURE__ */ new Set(["subroutine", "subprocess", "subproc", "framed-rectangle", "tool"]);
function zw(e) {
  return Fw.has(e.type);
}
function Oh(e) {
  return e === "markdown" || e === "string" || e === "text" ? e : "markdown";
}
function Cu(e) {
  return e.startsWith('"') && e.endsWith('"') ? e.substring(1, e.length - 1) : e;
}
function qd(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Pw(e) {
  let t = (s) => Array.isArray(s) ? [] : qd(s) ? {} : s, r = t(e), a = [[e, r]];
  for (; a.length > 0; ) {
    let [s, l] = a.pop();
    if (Array.isArray(s)) for (let n of s) {
      let i = t(n);
      l.push(i), typeof n == "object" && n !== null && a.push([n, i]);
    }
    else if (qd(s)) for (let n of Object.keys(s)) {
      if (n === "__proto__" || n === "constructor" || n === "prototype") continue;
      let i = s[n], o = t(i);
      l[n] = o, typeof i == "object" && i !== null && a.push([i, o]);
    }
  }
  return r;
}
function Us(e, t) {
  return Object.assign(e ?? {}, t);
}
var Ww = /:\s*[>|][\d+-]*\s*$/, Bw = /,([\t ]*)$/;
function Gw(e) {
  let t = !1, r = !1, a = 0, s, l = [];
  for (let n of e.split(`
`)) {
    if (s !== void 0) {
      let c = n.length - n.trimStart().length;
      if (n.trim() === "" || c > s) {
        l.push(n);
        continue;
      }
      s = void 0;
    }
    let i = -1;
    for (let c = 0; c < n.length; c++) {
      let u = n[c];
      if (r) u === "\\" ? c++ : u === '"' && (r = !1);
      else if (t) u === "'" && (t = !1);
      else if (u === '"') r = !0;
      else if (u === "'") t = !0;
      else if (u === "#" && (c === 0 || n[c - 1] === " " || n[c - 1] === "	")) {
        i = c;
        break;
      } else u === "[" || u === "{" ? a++ : (u === "]" || u === "}") && (a = Math.max(0, a - 1));
    }
    if (t || r || a > 0) {
      l.push(n);
      continue;
    }
    let o = i >= 0 ? n.slice(0, i) : n, h = i >= 0 ? n.slice(i) : "";
    if (Ww.test(o)) {
      s = n.length - n.trimStart().length, l.push(n);
      continue;
    }
    l.push(o.replace(Bw, "$1") + h);
  }
  return l.join(`
`);
}
function Hw(e, t) {
  if (e === "arrow_point" && t === "normal") return "sequence";
  if (e === "arrow_cross" && t === "normal") return "failure";
  if (e === "arrow_open" && t === "dotted") return "reference";
}
function Uw(e) {
  let t = e.trim(), r = t.slice(0, -1), a = "arrow_open";
  switch (t.slice(-1)) {
    case "x":
      a = "arrow_cross";
      break;
    case ">":
      a = "arrow_point";
      break;
    case "-":
    case ".":
      r = t;
      break;
  }
  let s = "normal", l = r.length - 1, n = 0;
  for (let i = 0; i < r.length; i++) r[i] === "." && n++;
  return n > 0 && (s = "dotted", l = n), { type: a, stroke: s, length: l };
}
function Su(e) {
  if (!e) return;
  let t = {}, r = !1;
  for (let a of Object.keys(e)) Ow.has(a) || (t[a] = e[a], r = !0);
  return r ? t : void 0;
}
var Yw = class {
  type = "agentflow";
  direction;
  nodes = /* @__PURE__ */ new Map();
  edges = [];
  subgraphs = [];
  connectors = /* @__PURE__ */ new Map();
  classes = /* @__PURE__ */ new Map();
  tooltips = /* @__PURE__ */ new Map();
  defaultEdgeStyle;
  defaultInterpolate;
  mappings = [];
  diagnostics = [];
  title;
  accTitle;
  accDescr;
  lineOffset;
  subgraphLookup = /* @__PURE__ */ new Map();
  globalNodes = /* @__PURE__ */ new Set();
  members = /* @__PURE__ */ new Set();
  edgeById = /* @__PURE__ */ new Map();
  pairCount = /* @__PURE__ */ new Map();
  subCount = 0;
  bareMappings = /* @__PURE__ */ new Set();
  firstMapping = /* @__PURE__ */ new Map();
  reported = /* @__PURE__ */ new Map();
  options;
  constructor(e = {}) {
    this.options = e, this.lineOffset = e.lineOffset ?? 0;
  }
  metadata(e, t, r) {
    let a = t.includes(`
`), s;
    try {
      s = Zl(a ? t + `
` : `{
` + t + `
}`);
    } catch (l) {
      let n = a ? Gw(t) : t, i;
      if (n !== t) try {
        i = Zl(n + `
`);
      } catch {
        i = void 0;
      }
      if (i === void 0) {
        let { line: o, column: h } = this.errorAt(r), c = r ? ` (${o}:${h})` : "";
        throw new at(`Metadata of "${e}" is not valid YAML. ${l.message}${c}`, "syntax", { type: "agentflow", line: o, column: h });
      }
      s = i;
    }
    return Pw(s ?? {});
  }
  errorAt(e) {
    if (e === void 0) return { line: 0, column: 0 };
    let t = this.options.source;
    if (t === void 0) return { line: e.first_line + this.lineOffset, column: e.first_column + 1 };
    let r = 0;
    for (let l = 1; l < e.first_line; l++) r = t.indexOf(`
`, r) + 1;
    let { line: a, column: s } = ii(t, r + e.first_column);
    return { line: a, column: s };
  }
  shapeError(e, t) {
    return new at(e, "semantic", { type: "agentflow", ...this.errorAt(t) });
  }
  addVertex(e, t, r, a, s, l, n = {}, i, o) {
    if (!e || e.trim().length === 0) return;
    let h, c, u;
    i !== void 0 && (h = this.metadata(e, i, o), qd(h) && (c = h, typeof h.shape == "string" && (u = h.shape, h.shape = ro(h.shape))));
    let d = this.subgraphLookup.get(e);
    if (d && h) {
      d.metadata = Us(d.metadata, h);
      return;
    }
    let p = this.connectors.get(e);
    if (p && h) {
      p.metadata = Us(p.metadata, h);
      return;
    }
    if (e === "connectors") return;
    let g = this.edgeById.get(e);
    if (g) {
      c?.animate !== void 0 && (g.animate = c.animate), c?.animation !== void 0 && (g.animation = c.animation), c?.curve !== void 0 && (g.interpolate = c.curve), h && (g.metadata = Us(g.metadata, h));
      return;
    }
    let y = this.nodes.get(e);
    if (y === void 0 && (y = { id: e, labelType: "text", styles: [], classes: [] }, this.nodes.set(e, y)), t !== void 0 ? (y.labelType = t.type, y.text = Cu(t.text.trim())) : y.text === void 0 && (y.text = e), r !== void 0 && (y.type = r), a != null) for (let b of a) y.styles.push(b);
    if (s != null) for (let b of s) y.classes.push(b);
    if (l !== void 0 && (y.dir = l), y.props === void 0 ? y.props = n : n !== void 0 && Object.assign(y.props, n), !!h && (y.metadata = Us(y.metadata, h), c !== void 0)) {
      if (c.shape) {
        let b = u ?? c.shape;
        if (typeof b != "string") throw this.shapeError(`No such shape: ${JSON.stringify(b)}.`, o);
        if (b !== b.toLowerCase() || b.includes("_")) throw this.shapeError(`No such shape: ${b}. Shape names should be lowercase.`, o);
        let x = c.shape;
        if (!Dw(x)) throw this.shapeError(`No such shape: ${x}.`, o);
        y.type = x;
      }
      c.label && (y.text = String(c.label), y.labelType = Oh(c.labelType));
    }
  }
  addSingleLink(e, t, r, a) {
    let s = { start: e, end: t, type: void 0, text: "", labelType: "text", classes: [], isUserDefinedId: !1, interpolate: this.defaultInterpolate }, l = r?.text;
    l !== void 0 && (s.text = Cu(l.text.trim()), s.labelType = Oh(l.type)), r !== void 0 && (s.type = r.type, s.stroke = r.stroke, s.length = r.length > 10 ? 10 : r.length, r.edgeSemantic && (s.edgeSemantic = r.edgeSemantic));
    let n = e + "\0" + t, i = this.pairCount.get(n) ?? 0;
    a && !this.edgeById.has(a) ? (s.id = a, s.isUserDefinedId = !0) : s.id = `L_${e}_${t}_${i === 0 ? 0 : i + 1}`;
    let o = this.options.maxEdges;
    if (o !== void 0 && this.edges.length >= o) throw new at(`Edge limit exceeded. The limit is ${o}.`, "limit", { type: "agentflow" });
    this.edges.push(s), this.pairCount.set(n, i + 1), this.edgeById.has(s.id) || this.edgeById.set(s.id, s);
  }
  addLink(e, t, r) {
    let a = typeof r?.id == "string" ? r.id.replace("@", "") : void 0, s = e[e.length - 1], l = t[0];
    for (let n of e) for (let i of t) this.addSingleLink(n, i, r, n === s && i === l ? a : void 0);
  }
  updateLinkInterpolate(e, t) {
    for (let r of e) r === "default" ? this.defaultInterpolate = t : this.edgeAt(r).interpolate = t;
  }
  updateLink(e, t) {
    for (let r of e) {
      if (r === "default") {
        this.defaultEdgeStyle = t;
        continue;
      }
      let a = this.edgeAt(r);
      a.style = t, t.length > 0 && !t.some((s) => s?.startsWith("fill")) && t.push("fill:none");
    }
  }
  edgeAt(e) {
    let t = this.edges[Number(e)];
    if (t === void 0) throw new at(`The index ${e} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${this.edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`, "semantic", { type: "agentflow" });
    return t;
  }
  addClass(e, t) {
    let r = t.join().replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    for (let a of e.split(",")) {
      let s = this.classes.get(a);
      s === void 0 && (s = { id: a, styles: [], textStyles: [] }, this.classes.set(a, s));
      for (let l of r) l.includes("color") && s.textStyles.push(l.replace("fill", "bgFill")), s.styles.push(l);
    }
  }
  setDirection(e) {
    let t = e.trim();
    t.includes("<") && (t = "RL"), t.includes("^") && (t = "BT"), t.includes(">") && (t = "LR"), t.includes("v") && (t = "TB"), t === "TD" && (t = "TB"), this.direction = t;
  }
  setClass(e, t) {
    for (let r of e.split(",")) this.nodes.get(r)?.classes.push(t), this.edgeById.get(r)?.classes.push(t), this.subgraphLookup.get(r)?.classes.push(t);
  }
  setTooltip(e, t) {
    if (t !== void 0) for (let r of e.split(",")) this.tooltips.set(r, t);
  }
  setLink(e, t, r) {
    let a = t.trim();
    for (let s of e.split(",")) {
      let l = this.nodes.get(s);
      l !== void 0 && (l.link = a ? ni(a) : void 0, l.linkTarget = r);
    }
    this.setClass(e, "clickable");
  }
  setClickEvent(e, t, r) {
    this.setClass(e, "clickable");
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addSubGraph(e, t, r, a) {
    let s = e?.text?.trim(), l = r?.text || "";
    e !== void 0 && e === r && /\s/.test(l) && (s = void 0);
    let n = /* @__PURE__ */ new Set(), i = [], o;
    for (let p of t) if (typeof p == "string") p.trim() !== "" && !n.has(p) && (n.add(p), i.push(p));
    else if (Array.isArray(p)) for (let g of p) g.trim() !== "" && !n.has(g) && (n.add(g), i.push(g));
    else o = p.value;
    o ??= this.options.inheritDir ? this.direction ?? this.options.direction : void 0, s ??= "subGraph" + this.subCount, this.subCount++;
    let h = this.members, c = i.filter((p) => p !== s && !this.globalNodes.has(p) && !h.has(p));
    for (let p of c) h.add(p);
    let u = this.subgraphLookup.get(s);
    if (u) {
      for (let p of c) u.nodes.push(p);
      return l.trim() && (u.title = l.trim()), o && (u.dir = o), s;
    }
    let d = { id: s, nodes: c, title: l.trim(), classes: [], dir: o, labelType: Oh(r?.type), type: "flow" };
    return this.subgraphs.push(d), this.subgraphLookup.set(s, d), s;
  }
  addGlobal(e) {
    let t = !1, r = (a) => {
      let s = a.trim();
      s !== "" && (this.globalNodes.add(s), this.members.delete(s) && (t = !0));
    };
    for (let a of e) if (typeof a == "string") r(a);
    else if (Array.isArray(a)) for (let s of a) r(s);
    if (t) for (let a of this.subgraphs) a.nodes = a.nodes.filter((s) => !this.globalNodes.has(s));
  }
  addConnector(e, t) {
    let r = e?.text?.trim();
    if (!r) return "";
    let a = t?.text?.trim() ?? "", s = this.connectors.get(r);
    if (s) a.length > 0 && (s.text = a);
    else {
      let l = { id: r, labelType: "text", styles: [], classes: [], isConnector: !0, text: a.length > 0 ? a : r };
      this.connectors.set(r, l), this.nodes.set(r, l);
    }
    return r;
  }
  destructLink(e, t) {
    let r = Uw(e);
    return t && (t.includes(".") ? "dotted" : "normal") !== r.stroke ? { type: "INVALID", stroke: "INVALID" } : { ...r, edgeSemantic: Hw(r.type, r.stroke) };
  }
  subgraph(e) {
    return this.subgraphLookup.get(e);
  }
  vertexKind(e) {
    if (zw(e)) return "tool";
    let t = ro(e.type);
    return t === "hexagon" || t === "hex" ? "action" : t === "lean-right" || t === "lean_right" ? "input" : t === "lin-doc" || t === "lined-document" ? "refdoc" : t === "diamond" ? "decision" : "task";
  }
  semanticModel() {
    let e = [], t = [];
    for (let [l, n] of this.nodes) {
      if (this.subgraphLookup.has(l)) continue;
      let i = Su(n.metadata);
      if (n.isConnector) {
        let c = { id: l };
        n.text !== void 0 && n.text !== l && (c.title = n.text), i && (c.metadata = i), t.push(c);
        continue;
      }
      let o = { id: l };
      n.text !== void 0 && (o.label = n.text);
      let h = ro(n.type);
      h !== void 0 && (o.shape = h), o.vertexKind = this.vertexKind(n), i && (o.metadata = i), e.push(o);
    }
    let r = this.edges.map((l) => {
      let n = { start: l.start, end: l.end };
      return l.id !== void 0 && (n.id = l.id), l.text.length > 0 && (n.label = l.text), l.type !== void 0 && (n.type = l.type), l.stroke !== void 0 && (n.stroke = l.stroke), l.edgeSemantic !== void 0 && (n.edgeSemantic = l.edgeSemantic), l.length !== void 0 && (n.length = l.length), l.metadata && Object.keys(l.metadata).length > 0 && (n.metadata = { ...l.metadata }), n;
    }), a = this.subgraphs.map((l) => {
      let n = { id: l.id, nodes: [...l.nodes], type: l.type, title: l.title };
      l.dir !== void 0 && (n.direction = l.dir);
      let i = Su(l.metadata);
      return i && (n.metadata = i), n;
    }), s = { vertices: e, edges: r, subGraphs: a, connectors: t, diagnostics: this.diagnostics };
    return this.direction !== void 0 && (s.direction = this.direction), s;
  }
  position(e) {
    let t = e?.first_line ?? 0, r = e?.first_column ?? 0;
    return { startLine: t + this.lineOffset, startColumn: r, endLine: (e?.last_line ?? t) + this.lineOffset, endColumn: e?.last_column ?? r, startIndex: 0, endIndex: 0 };
  }
  pushMapping(e, t, r) {
    let a = { id: e, type: t, position: r };
    return this.mappings.push(a), this.firstMapping.has(e) || this.firstMapping.set(e, a), a;
  }
  addVertexMapping(e, t, r, a) {
    if (!e) return;
    let s = this.pushMapping(e, "vertex", this.position(a));
    r == null && this.bareMappings.add(s);
  }
  extendVertexMapping(e, t) {
    if (!e || !t) return;
    let r = this.position(t);
    for (let a = this.mappings.length - 1; a >= 0; a--) {
      let s = this.mappings[a];
      if (s.type !== "vertex" || s.id !== e) continue;
      this.bareMappings.delete(s) && (s.type = "attachment");
      let l = s.position;
      (r.endLine > l.endLine || r.endLine === l.endLine && r.endColumn > l.endColumn) && (l.endLine = r.endLine, l.endColumn = r.endColumn);
      return;
    }
    this.pushMapping(e, "attachment", r);
  }
  addEdgeMapping(e, t, r, a) {
    let s = Array.isArray(t) ? t.filter((l) => typeof l == "string" && l !== "") : [];
    this.pushMapping(s.length > 0 ? s.join(">") : "edge", "edge", this.position(a));
  }
  blockMapping(e, t, r, a) {
    if (!e) return;
    let s = this.position(r), l = a ? this.position(a) : s;
    this.pushMapping(e, t, { startLine: s.startLine, startColumn: s.startColumn, endLine: l.endLine, endColumn: l.endColumn, startIndex: 0, endIndex: 0 });
  }
  addSubgraphMapping(e, t, r, a) {
    let s = typeof e == "string" ? e : e?.text;
    this.blockMapping(s ?? "", "subgraph", r, a);
  }
  addConnectorMapping(e, t, r, a) {
    this.blockMapping(e?.text?.trim() ?? "", "connector", r, a);
  }
  emit(e, t, r, a) {
    let s = a?.nodeId ?? a?.edgeId, l = { id: e, severity: t, message: r };
    a?.nodeId ? l.nodeId = a.nodeId : a?.edgeId && (l.edgeId = a.edgeId);
    let n = s ? this.firstMapping.get(s) : void 0;
    n && (l.position = n.position);
    let i = s ?? "", o = this.reported.get(i);
    if (o === void 0) this.reported.set(i, [l]);
    else {
      for (let h of o) if (h.id === e && h.severity === t && h.message === r && h.nodeId === l.nodeId && h.edgeId === l.edgeId) return;
      o.push(l);
    }
    this.diagnostics.push(l), this.options.log?.(t, `agentflow[${e}]: ${r}`);
  }
  emitWarning(e, t, r) {
    this.emit(e, "warning", t, r);
  }
  emitError(e, t, r) {
    this.emit(e, "error", t, r);
  }
}, jw = "4q 0 b 0 5 0 6 m 2 u 2 cp 5 b f 4 8 0 2 0 3m 4 2 1 3 3 9 0 2 2 2 0 2 j 2 2a 2 3u 9 4d a 11 3 0 8 12 21 q 6 2 1a 16 10 1 2 2q 2 0 g 1 8 1 b 2 3 0 h 0 2 t u 2g c 0 p w a 1 5 0 6 l 5 0 a 0 4 0 o o 20 0 2 a 2g 1h 4 0 j 0 8 9 g 6 2 6 6 7 3 1 3 l 2 6 2 0 4 3 4 0 h 0 e 1 2 2 f 1 k 5 5 1 3 l 2 6 2 1 2 1 2 1 w 3 2 0 k 2 h 8 2 2 2 l 2 6 2 1 2 4 4 0 j 0 g 1 10 7 3 1 3 l 2 6 2 1 2 4 4 0 v 1 2 2 g 0 i 0 2 5 4 2 2 3 4 1 2 0 2 1 4 1 4 2 4 b n 0 1h 7 2 2 2 m 2 9 2 4 4 0 r 1 7 1 10 7 2 2 2 m 2 9 2 4 4 0 x 0 2 1 g 1 j 7 2 2 2 14 3 0 h 0 i 1 p 5 6 h 4 n 2 8 2 0 3 6 1n 1b 2 1 d 6 1n 1 2 0 3 1 2 0 3 0 7 3 2 6 2 2 2 0 2 0 3 1 2 3 2 1 a 0 3 4 2 0 m 3 x 0 1s 7 2 z s 4 38 16 l 0 h 5 5 3 4 0 4 1 8 2 5 c d 0 i 11 2 0 6 0 3 16 2 98 2 3 3 6 2 0 2 3 3 14 2 3 3 w 2 3 3 6 2 0 2 3 3 e 2 1k 2 3 3 1u 12 f h 2c d h7 3 g 2 p 6 22 m c 2 3 f h f h f c 2 2 g 1f 10 0 5 0 1w 2f 9 14 2 0 6 1x b s 1g t 3 4 c 17 m 6 1l m a 1g 2b 0 2m 1a i 6 1k t e 1 b 17 r z 16 2 b z 30 3 2 3 4 1 a 5b 1t 7p 3 5 3 11 3 5 3 7 2 0 2 0 2 0 2 u 3 1g 2 6 2 0 4 2 2 6 4 3 3 5 5 c 6 2 2 6 39 0 e 0 h c 2u 0 5 0 3 9 2 0 4 4 7 0 2 0 2 0 2 3 2 a 3 3 6 4 5 0 1h 1 22k 1a 2 1a 2 3o 7 3 4 1 d 11 2 0 6 0 3 1j 8 0 h m a 6 2 6 2 6 2 6 2 6 2 6 2 6 2 6 29 0 d2 1 17 4 6 1 5 2d 7 2 2 2h 2 3 6 14 4 2l i q 1i f e9 52t 23 g5o 1g wc 1w 19 3 7g 4 f b 1 l 1a h o 9 1x 1e 8 3 2u 3 3 2 3 d a 26 9 2 2 2 3 2 m u 1f f 1d 1r 5 4 0 f r b m q s 8 1a t 0 1d 14 o 2 2 7 l m 4 0 6 1b 2 0 4 1 3 4 3 0 2 0 p 2 3 a 8 2 d 5 3 5 3 5 a 6 2 6 42 y u 8mb d m 5 1c 6it a5 3 2x 13 6 d 4 6 0 2 9 2 c 2 4 2 0 2 1 2 1 2 2z y a2 j 1r 3 1h 15 b 39 4 2 3q 11 p 7 p c 2g 4 5 3 5 3 5 3 2", qw;
function Vw() {
  let e = jw.split(" "), t = new Uint16Array(e.length), r = 0;
  for (let a = 0; a < e.length; a += 2) {
    let s = r + parseInt(e[a], 36);
    r = s + parseInt(e[a + 1], 36), t[a] = s, t[a + 1] = r;
  }
  return t;
}
function Wf(e) {
  if (e < 170 || e > 65500) return !1;
  let t = qw ??= Vw(), r = 0, a = (t.length >> 1) - 1;
  for (; r <= a; ) {
    let s = r + a >> 1;
    if (e < t[s * 2]) a = s - 1;
    else if (e > t[s * 2 + 1]) r = s + 1;
    else return !0;
  }
  return !1;
}
var _u = ["$end", "INVALID", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "SHAPE_DATA", "CALLBACKNAME", "CALLBACKARGS", "MD_STR", "STR", "STYLE", "DEFAULT", "LINKSTYLE", "INTERPOLATE", "CLASSDEF", "CLASS", "HREF", "CLICK", "GRAPH", "flow", "connector", "global", "end", "LINK_TARGET", "NODIR", "DIR", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "direction_td", "LINK_ID", "NUM", "BRKT", "STYLE_SEPARATOR", "COLON", "AMP", "SEMI", "COMMA", "MULT", "LINK", "START_LINK", "EDGE_TEXT", "-)", "TEXT", "(-", "STADIUMEND", "STADIUMSTART", "SUBROUTINEEND", "SUBROUTINESTART", "VERTEX_WITH_PROPS_START", "TAGEND", "CYLINDEREND", "CYLINDERSTART", "DOUBLECIRCLEEND", "DOUBLECIRCLESTART", "TRAPEND", "INVTRAPEND", "TRAPSTART", "INVTRAPSTART", "TAGSTART", "UP", "SEP", "DOWN", "COMMENT", "NODE_STRING", "MINUS", "UNICODE_TEXT", "PIPE", "PE", "PS", "SQE", "SQS", "DIAMOND_STOP", "DIAMOND_START", "NEWLINE", "SPACE", "EOF"], W2 = new Uint8Array(128);
for (let e of "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'*+.`?\\_/") W2[e.charCodeAt(0)] = 1;
var Kw = /accTitle\s*:\s*/y, Xw = /accDescr\s*:\s*/y, Zw = /accDescr\s*\{\s*/y, Qw = /call\s+/y, Jw = /click\s+/y, e$ = /(?:\r?\n)*\s*\n/y, t$ = /\s*(?:LR|RL|TB|BT|TD|BR)\b/y, r$ = /\s*[<>^]/y, a$ = /\s*v\b/y, l$ = [/.*direction\s+TB[^\n]*/y, /.*direction\s+BT[^\n]*/y, /.*direction\s+RL[^\n]*/y, /.*direction\s+LR[^\n]*/y, /.*direction\s+TD[^\n]*/y], Fh = /[\n\r\u2028\u2029]/g, i$ = /\(\s*\)/y, s$ = /\n\s*/g;
function n$(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = [], i = 0, o = 0, h = 1, c = 0, u = !0, d = e.indexOf("direction"), p = e.indexOf("@"), g = -1, y = 0, b = 0, x = -1, v = -1, $ = -1, S = -1, R = -1, D = -1, O = -1, U = (F) => {
    let Y = -1;
    for (let W = o; W < F; W++) {
      let K = e.charCodeAt(W);
      K === 10 ? (h++, Y = W) : K === 13 && (W + 1 < F && e.charCodeAt(W + 1) === 10 && W++, h++, Y = W);
    }
    if (Y < 0) c += F - o;
    else {
      let W = Y + 1;
      for (; W < F; ) {
        let K = e.charCodeAt(W);
        if (K === 8232 || K === 8233) break;
        W++;
      }
      c = W - Y - 1;
    }
    o = F;
  }, q = (F, Y) => {
    r.push(F), a.push(e.slice(o, Y)), s.push(o), l.push(h, c), U(Y), l.push(h, c);
  }, C = (F, Y) => {
    r.push(F), a.push(e.slice(o, Y)), s.push(o), l.push(h, c), c += Y - o, o = Y, l.push(h, c);
  }, ee = (F, Y) => {
    r.push(F), a.push(e.slice(o, Y)), s.push(o), l.push(h, c);
    for (let W = o; W < Y; W++) {
      let K = e.charCodeAt(W);
      K === 10 || K === 13 ? (h++, c = 0) : c++;
    }
    o = Y, l.push(h, c);
  }, ie = (F, Y, W) => {
    r.push(F), a.push(Y), s.push(o), l.push(h, c), U(W), l.push(h, c);
  }, G = (F) => {
    n.push(i), i = F;
  }, z = () => {
    n.length > 0 && (i = n.pop());
  }, _ = (F, Y) => (F.lastIndex = Y, F.test(e) ? F.lastIndex : -1), T = (F) => e.startsWith(F, o) && !nt(e.charCodeAt(o + F.length)), E = (F) => {
    if (F >= v && F <= $) return $;
    let Y = F;
    for (; Y < t && Ke(e.charCodeAt(Y)); ) Y++;
    return v = F, $ = Y, Y;
  }, M = (F) => {
    if (F >= S && F <= R) return R;
    let Y = F;
    for (; Y < t; ) {
      let W = e.charCodeAt(Y);
      if (W !== 32 && W !== 9) break;
      Y++;
    }
    return S = F, R = Y, Y;
  }, A = (F) => {
    let Y = E(F);
    if (Y === O || e.charCodeAt(Y) !== 45 || e.charCodeAt(Y + 1) !== 45) return -1;
    let W = Y + 2;
    for (; e.charCodeAt(W) === 45; ) W++;
    let K = e.charCodeAt(W);
    return K === 120 || K === 62 ? E(W + 1) : (O = Y, -1);
  }, m = () => {
    let F = E(o);
    if (F === D || e.charCodeAt(F) !== 45) return !1;
    let Y = e.charCodeAt(F + 1), W = F + 2;
    if (Y === 45) {
      for (; e.charCodeAt(W) === 45; ) W++;
      let K = e.charCodeAt(W);
      return K === 120 || K === 62 ? q(42, E(W + 1)) : (G(10), q(43, E(F + 2))), !0;
    }
    if (Y === 46) {
      for (; e.charCodeAt(W) === 46; ) W++;
      if (e.charCodeAt(W) === 45) return q(42, E(W + 1)), !0;
    }
    return D = F, !1;
  }, I = (F) => {
    if (e.charCodeAt(F) !== 37 || e.charCodeAt(F + 1) !== 37 || e.charCodeAt(F + 2) === 123) return -1;
    let Y = e.indexOf(`
`, F + 2);
    return Y === -1 ? t : Y;
  }, k = () => {
    e.charCodeAt(o + 1) === 96 ? (G(2), U(o + 2)) : (G(1), U(o + 1));
  }, w = (F) => {
    let Y = e.charCodeAt(o + 1);
    return F === 40 ? (Y === 45 ? (G(8), C(47, o + 2)) : Y === 91 ? (G(7), C(49, o + 2)) : Y === 40 && e.charCodeAt(o + 2) === 40 ? (G(7), C(57, o + 3)) : (G(7), C(72, o + 1)), !0) : F === 91 ? (Y === 91 ? (G(7), C(51, o + 2)) : Y === 40 ? (G(7), C(55, o + 2)) : Y === 47 ? (G(9), C(60, o + 2)) : Y === 92 ? (G(9), C(61, o + 2)) : (G(7), C(74, o + 1)), !0) : F === 124 ? (G(7), C(70, o + 1), !0) : F === 123 ? (G(7), C(76, o + 1), !0) : !1;
  }, B = () => {
    let F = o;
    for (; F < t; ) {
      let Y = e.charCodeAt(F);
      if (Y < 128 && W2[Y] === 1) F++;
      else if (Y === 45 && F + 1 < t) {
        let W = e.charCodeAt(F + 1);
        if (W === 62 || W === 45 || W === 46) break;
        F++;
      } else break;
    }
    return F === o ? !1 : (C(67, F), !0);
  }, N = (F) => {
    let Y = F;
    for (; Y < t; ) {
      let W = e.charCodeAt(Y);
      if (W !== 32 && W !== 9) break;
      Y++;
    }
    return Y;
  }, j = (F) => {
    let Y;
    switch (F) {
      case 97:
        if (e.startsWith("acc", o)) {
          if ((Y = _(Kw, o)) >= 0) return G(3), q(2, Y), !0;
          if ((Y = _(Xw, o)) >= 0) return G(4), q(4, Y), !0;
          if ((Y = _(Zw, o)) >= 0) return G(5), U(Y), !0;
        }
        if (T("agentflow-beta")) return u && (u = !1, G(6)), C(20, o + 14), !0;
        break;
      case 64:
        if (e.charCodeAt(o + 1) === 123) return G(14), ie(7, "", o + 2), !0;
        break;
      case 99:
        if ((Y = _(Qw, o)) >= 0) return G(12), U(Y), !0;
        if (T("classDef")) return C(16, o + 8), !0;
        if (T("class")) return C(17, o + 5), !0;
        if ((Y = _(Jw, o)) >= 0) return G(11), U(Y), !0;
        if (T("connector")) return C(22, o + 9), !0;
        break;
      case 34:
        return k(), !0;
      case 115:
        if (T("style")) return C(12, o + 5), !0;
        break;
      case 100:
        if (T("default")) return C(13, o + 7), !0;
        break;
      case 108:
        if (T("linkStyle")) return C(14, o + 9), !0;
        break;
      case 105:
        if (T("interpolate")) return C(15, o + 11), !0;
        break;
      case 104:
        if (e.startsWith("href", o) && Ke(e.charCodeAt(o + 4))) return q(18, o + 5), !0;
        break;
      case 102:
        if (T("flow")) return C(21, o + 4), !0;
        break;
      case 103:
        if (T("global")) return C(23, N(o + 6)), !0;
        break;
      case 101:
        if (T("end")) return C(24, N(o + 3)), !0;
        break;
      case 95:
        if (T("_self")) return C(25, o + 5), !0;
        if (T("_blank")) return C(25, o + 6), !0;
        if (T("_parent")) return C(25, o + 7), !0;
        if (T("_top")) return C(25, o + 4), !0;
        break;
    }
    if (d !== -1 && o >= y && (d < o && (d = e.indexOf("direction", o)), d !== -1 && (g < o && (Fh.lastIndex = o, g = Fh.test(e) ? Fh.lastIndex - 1 : t), d < g))) {
      for (let W = 0; W < 5; W++) if ((Y = _(l$[W], o)) >= 0) return q(28 + W, Y), !0;
      y = g;
    }
    if (p !== -1 && F !== 34 && !Ke(F)) {
      if (o >= b) {
        p < o && (p = e.indexOf("@", o));
        let W = o;
        for (; W < t; ) {
          let K = e.charCodeAt(W);
          if (K === 34 || Ke(K)) break;
          W++;
        }
        if (b = W, x = -1, p !== -1 && p < W) for (let K = Math.min(W, t - 1) - 1; K >= p; K--) {
          if (e.charCodeAt(K) !== 64) continue;
          let H = e.charCodeAt(K + 1);
          if (H !== 123 && H !== 34) {
            x = K;
            break;
          }
        }
      }
      if (x > o) return C(33, x + 1), !0;
    }
    if (F >= 48 && F <= 57) {
      let W = o + 1;
      for (; W < t; ) {
        let K = e.charCodeAt(W);
        if (K < 48 || K > 57) break;
        W++;
      }
      return C(34, W), !0;
    }
    switch (F) {
      case 35:
        return C(35, o + 1), !0;
      case 58:
        return e.charCodeAt(o + 1) === 58 && e.charCodeAt(o + 2) === 58 ? C(36, o + 3) : C(37, o + 1), !0;
      case 38:
        return C(38, o + 1), !0;
      case 59:
        return C(39, o + 1), !0;
      case 44:
        return C(40, o + 1), !0;
      case 42:
        return C(41, o + 1), !0;
      case 60:
        return C(62, o + 1), !0;
      case 45:
        return m() || B() || C(68, o + 1), !0;
      case 40:
        return w(F);
      case 91:
        return e.charCodeAt(o + 1) === 124 ? (C(52, o + 2), !0) : w(F);
      case 124:
      case 123:
        return w(F);
      case 62:
        return G(7), C(53, o + 1), !0;
      case 94:
        return C(63, o + 1), !0;
      case 92:
        return e.charCodeAt(o + 1) === 124 ? (C(64, o + 2), !0) : B();
      case 118:
        return nt(e.charCodeAt(o + 1)) ? B() : (C(65, o + 1), !0);
      case 37:
        return (Y = I(o)) >= 0 ? (q(66, Y), !0) : B();
    }
    if (Ke(F)) {
      if (m()) return !0;
      if ((F === 32 || F === 9) && (Y = I(M(o))) >= 0) return q(66, Y), !0;
      for (Y = o; ; ) {
        let W = e.charCodeAt(Y);
        if (W === 10) Y++;
        else if (W === 13 && e.charCodeAt(Y + 1) === 10) Y += 2;
        else break;
      }
      return Y > o ? q(77, Y) : q(78, o + 1), !0;
    }
    return F < 128 ? B() : Wf(F) ? (C(69, o + 1), !0) : !1;
  };
  e: for (; ; ) {
    if (o >= t) {
      let W = -1;
      switch (i) {
        case 0:
          W = 79;
          break;
        case 3:
          W = 3;
          break;
        case 4:
          W = 5;
          break;
        case 5:
          W = 6;
          break;
        case 11:
          W = 19;
          break;
        case 12:
          W = 8;
          break;
        case 13:
          W = 9;
          break;
      }
      W !== -1 && C(W, t);
      break;
    }
    let F = e.charCodeAt(o), Y = !0;
    switch (i) {
      case 0:
        Y = j(F);
        break;
      case 1:
        if (F === 34) e.charCodeAt(o + 1) === 96 ? (G(2), U(o + 2)) : (z(), U(o + 1));
        else {
          let W = e.indexOf('"', o);
          q(11, W === -1 ? t : W);
        }
        break;
      case 2:
        if (F === 96) e.charCodeAt(o + 1) === 34 ? (z(), U(o + 2)) : Y = !1;
        else if (F === 34) k();
        else {
          let W = o + 1;
          for (; W < t; ) {
            let K = e.charCodeAt(W);
            if (K === 96 || K === 34) break;
            W++;
          }
          q(10, W);
        }
        break;
      case 3:
      case 4: {
        let W = e.indexOf(`
`, o);
        W === -1 && (W = t);
        let K = i === 3 ? 3 : 5;
        z(), q(K, W);
        break;
      }
      case 5:
        if (F === 125) z(), U(o + 1);
        else {
          let W = e.indexOf("}", o);
          W === -1 && (W = t), q(6, W);
        }
        break;
      case 6: {
        let W;
        F === 34 ? k() : (W = _(e$, o)) >= 0 ? (z(), q(26, W)) : (W = _(t$, o)) >= 0 || (W = _(r$, o)) >= 0 || (W = _(a$, o)) >= 0 ? (z(), q(27, W)) : Y = w(F);
        break;
      }
      case 7: {
        let W = e.charCodeAt(o + 1);
        switch (F) {
          case 34:
            k();
            break;
          case 40:
          case 91:
          case 123:
            w(F);
            break;
          case 93:
            z(), W === 41 ? C(48, o + 2) : W === 93 ? C(50, o + 2) : C(73, o + 1);
            break;
          case 41:
            z(), W === 93 ? C(54, o + 2) : W === 41 && e.charCodeAt(o + 2) === 41 ? C(56, o + 3) : C(71, o + 1);
            break;
          case 124:
            z(), C(70, o + 1);
            break;
          case 125:
            z(), C(75, o + 1);
            break;
          case 37: {
            let K = I(o);
            K >= 0 ? U(K) : Y = !1;
            break;
          }
          default: {
            let K = o + 1;
            for (; K < t; ) {
              let H = e.charCodeAt(K);
              if (H === 91 || H === 93 || H === 40 || H === 41 || H === 123 || H === 125 || H === 124 || H === 34 || H === 37) break;
              K++;
            }
            q(46, K);
          }
        }
        break;
      }
      case 8: {
        let W = e.charCodeAt(o + 1), K;
        if (F === 34) k();
        else if (F === 37 && (K = I(o)) >= 0) U(K);
        else if ((F === 45 || F === 47 || F === 41) && W === 41) z(), C(45, o + 2);
        else if (F === 40 || F === 91 || F === 123) w(F);
        else if (F === 41 || F === 93 || F === 125) Y = !1;
        else {
          let H = o + 1;
          for (; H < t; ) {
            let te = e.charCodeAt(H);
            if (te === 34 || te === 40 || te === 41 || te === 91 || te === 93 || te === 123 || te === 125 || (te === 45 || te === 47) && e.charCodeAt(H + 1) === 41 || te === 37 && e.charCodeAt(H + 1) === 37 && e.charCodeAt(H + 2) !== 123) break;
            H++;
          }
          ee(46, H);
        }
        break;
      }
      case 9: {
        let W = e.charCodeAt(o + 1);
        if (F === 34) {
          k();
          break;
        }
        switch (F) {
          case 40:
            W === 45 || W === 91 || W === 40 && e.charCodeAt(o + 2) === 40 ? w(F) : W === 93 ? (z(), C(58, o + 2)) : w(F);
            break;
          case 91:
          case 123:
            w(F);
            break;
          case 92:
            W === 93 ? (z(), C(58, o + 2)) : C(46, o + 1);
            break;
          case 47:
            W === 93 ? (z(), C(59, o + 2)) : C(46, o + 1);
            break;
          case 93:
          case 41:
            W === 93 ? (z(), C(58, o + 2)) : Y = !1;
            break;
          case 125:
            Y = !1;
            break;
          case 37: {
            let K = I(o);
            K >= 0 ? U(K) : Y = !1;
            break;
          }
          default: {
            if ((F === 63 || F === 61) && W === 93) {
              z(), C(58, o + 2);
              break;
            }
            let K = o + 1;
            for (; K < t; ) {
              let H = e.charCodeAt(K);
              if (H === 92 || H === 91 || H === 93 || H === 40 || H === 41 || H === 123 || H === 125 || H === 47 || H === 37) break;
              K++;
            }
            q(46, K);
          }
        }
        break;
      }
      case 10: {
        if (F === 34) {
          k();
          break;
        }
        let W = A(o);
        if (W >= 0) {
          z(), q(42, W);
          break;
        }
        if (F === 45 && e.charCodeAt(o + 1) === 45) {
          Y = !1;
          break;
        }
        let K = o + 1;
        for (; K < t; ) {
          let H = e.charCodeAt(K);
          if (H === 34) break;
          if (H === 45) {
            if (e.charCodeAt(K + 1) === 45) break;
          } else if (Ke(H) && A(K) >= 0) break;
          K++;
        }
        ee(44, K);
        break;
      }
      case 11:
        if (F === 34) k();
        else if (Ke(F)) z(), U(o + 1);
        else {
          let W = o + 1;
          for (; W < t && !Ke(e.charCodeAt(W)); ) W++;
          C(19, W);
        }
        break;
      case 12:
        if (F === 40) {
          let W = _(i$, o);
          z(), W >= 0 ? U(W) : (G(13), U(o + 1));
        } else {
          let W = e.indexOf("(", o);
          W === -1 && (W = t), q(8, W);
        }
        break;
      case 13:
        if (F === 41) z(), U(o + 1);
        else {
          let W = e.indexOf(")", o);
          W === -1 && (W = t), q(9, W);
        }
        break;
      case 14:
        if (F === 34) G(15), C(7, o + 1);
        else if (F === 125) z(), U(o + 1);
        else if (F === 94) Y = !1;
        else {
          let W = o + 1;
          for (; W < t; ) {
            let K = e.charCodeAt(W);
            if (K === 125 || K === 94 || K === 34) break;
            W++;
          }
          q(7, W);
        }
        break;
      case 15:
        if (F === 34) z(), C(7, o + 1);
        else {
          let W = e.indexOf('"', o);
          W === -1 && (W = t), ie(7, e.slice(o, W).replace(s$, "<br/>"), W);
        }
        break;
    }
    if (!Y) return r.push(1), a.push(""), s.push(o), l.push(h, c, h, c), { types: r, texts: a, starts: s, locs: l };
    continue e;
  }
  return r.push(0), a.push(""), s.push(t), l.push(h, c, h, c), { types: r, texts: a, starts: s, locs: l };
}
var ao = new Uint8Array(80);
for (let e of [34, 67, 65, 68, 13, 40, 37, 38, 35, 41, 69]) ao[e] = 1;
var Vd = new Uint8Array(80);
for (let e of [34, 69, 67, 27, 65, 68, 40, 37, 38, 35, 41]) Vd[e] = 1;
var Kd = new Uint8Array(80);
for (let e of [34, 67, 78, 68, 38, 69, 37, 41, 35, 12, 14, 16, 17, 19, 20, 27, 21, 22, 23, 24, 65, 63, 43]) Kd[e] = 1;
var Xd = new Uint8Array(80);
for (let e of [34, 67, 37, 78, 35, 12]) Xd[e] = 1;
var lo = new Uint8Array(80);
for (let e of [77, 39, 79, 66]) lo[e] = 1;
var Iu = "'UNICODE_TEXT', 'TEXT', 'TAGSTART'", zh = "'COMMENT', 'SEMI', 'NEWLINE', 'EOF'", B2 = new Uint8Array(80);
for (let e of [66, 77, 78, 79]) B2[e] = 1;
var yi = [], Nu = /}[^\S\n]*\n/g;
function o$(e, t, r = !1) {
  let a = !r && e.includes("}") ? e.replace(Nu, `}
`) : e, { types: s, texts: l, starts: n, locs: i } = n$(a), o = 0, h, c = 0, u = 0, d = (k) => {
    let w = s[o], B = n[o];
    if (w === 79 || w === 0) {
      let j = o;
      for (; j > 0 && B2[s[j - 1]]; ) j--;
      B = a.slice(0, n[j]).trimEnd().length;
    }
    let N = a === e ? B : bs([Jo(e, Nu, 2)], B);
    throw w === 1 ? bt("agentflow", e, N, "", !0) : bt("agentflow", e, N, `Expecting ${k}, got '${_u[w]}'`);
  }, p = (k, w) => ({ first_line: i[4 * k], first_column: i[4 * k + 1], last_line: i[4 * w + 2], last_column: i[4 * w + 3] }), g = (k, w = "") => (s[o] !== k && d(`'${_u[k]}'${w ? ", " + w : ""}`), l[o++]), y = () => {
    lo[s[o]] === 0 && d(zh), o++;
  }, b = () => {
    ao[s[o]] === 0 && d("'NODE_STRING'");
    let k = l[o++];
    for (; ao[s[o]] === 1; ) k += l[o++];
    return k;
  }, x = () => {
    Vd[s[o]] === 0 && d("'NODE_STRING'");
    let k = l[o++];
    for (; Vd[s[o]] === 1; ) k += l[o++];
    return k;
  }, v = () => {
    let k = s[o], w;
    if (k === 11) w = "string";
    else if (k === 10) w = "markdown";
    else if (k === 46 || k === 62 || k === 53 || k === 69) w = "text";
    else return d(`${Iu}, 'TAGEND', 'STR', 'MD_STR'`);
    let B = l[o++];
    for (; ; ) {
      let N = s[o];
      if (N !== 46 && N !== 62 && N !== 53 && N !== 69) break;
      B += l[o++];
    }
    return { text: B, type: w };
  }, $ = (k) => {
    g(k, Iu);
  }, S = () => {
    let k = s[o], w;
    if (k === 11) w = "string";
    else if (k === 10) w = "markdown";
    else if (k === 44 || k === 69) w = "text";
    else return d("'EDGE_TEXT', 'STR', 'MD_STR'");
    let B = l[o++];
    for (; s[o] === 44 || s[o] === 69; ) B += l[o++];
    return { text: B, type: w };
  }, R = () => {
    let k = s[o], w;
    if (k === 11) w = "text";
    else if (k === 10) w = "markdown";
    else if (Kd[k] === 1) w = "text";
    else return d("'NODE_STRING', 'STR', 'MD_STR'");
    let B = l[o++];
    for (; Kd[s[o]] === 1; ) B += l[o++];
    return { text: B, type: w };
  }, D = () => {
    c = o;
    let k = l[o++];
    for (; s[o] === 7; ) k += l[o++];
    return u = o - 1, k;
  }, O = (k, w, B, N) => {
    let j = p(B, N);
    t.addVertex(k, void 0, void 0, void 0, void 0, void 0, void 0, w, j), t.extendVertexMapping(k, j);
  }, U = (k, w) => {
    w.data !== void 0 && t.addVertex(k, void 0, void 0, void 0, void 0, void 0, void 0, w.data, p(w.dataFrom, w.dataTo));
  }, q = () => {
    let k = o, w = b(), B, N, j;
    switch (s[o]) {
      case 74:
        o++, B = v(), $(73), N = "square";
        break;
      case 57:
        o++, B = v(), $(56), N = "doublecircle";
        break;
      case 72:
        o++, s[o] === 72 ? (o++, B = v(), $(71), g(71), N = "circle") : (B = v(), $(71), N = "round");
        break;
      case 47:
        o++, B = v(), $(45), N = "ellipse";
        break;
      case 49:
        o++, B = v(), $(48), N = "stadium";
        break;
      case 51:
        o++, B = v(), $(50), N = "subroutine";
        break;
      case 52: {
        o++;
        let F = g(67);
        g(37);
        let Y = g(67);
        g(70), B = v(), $(73), N = "rect", j = { [F]: Y };
        break;
      }
      case 55:
        o++, B = v(), $(54), N = "cylinder";
        break;
      case 76:
        o++, s[o] === 76 ? (o++, B = v(), $(75), g(75), N = "hexagon") : (B = v(), $(75), N = "diamond");
        break;
      case 53:
        o++, B = v(), $(73), N = "odd";
        break;
      case 60:
        o++, B = v(), s[o] === 59 ? (o++, N = "lean_right") : ($(58), N = "trapezoid");
        break;
      case 61:
        o++, B = v(), s[o] === 58 ? (o++, N = "lean_left") : ($(59), N = "inv_trapezoid");
        break;
    }
    return j !== void 0 ? t.addVertex(w, B, N, void 0, void 0, void 0, j) : N !== void 0 ? t.addVertex(w, B, N) : t.addVertex(w), t.addVertexMapping(w, B, N, p(k, o - 1)), w;
  }, C = () => {
    let k = q();
    return s[o] === 36 && (o++, t.setClass(k, b())), k;
  }, ee = () => {
    let k = [C()];
    for (h = void 0; ; ) {
      let w = s[o] === 7 ? D() : void 0, B = c, N = u;
      if (s[o] !== 78) return h = w, k;
      do
        o++;
      while (s[o] === 78);
      if (s[o] !== 38) return w !== void 0 && d("'AMP'"), k;
      o++, s[o] !== 78 && d("'SPACE'");
      do
        o++;
      while (s[o] === 78);
      let j = C();
      w !== void 0 && O(k[k.length - 1], w, B, N), k.push(j);
    }
  }, ie = () => {
    let k;
    if (s[o] === 33 && (k = l[o++]), s[o] === 42) {
      let w = t.destructLink(l[o++]);
      return k !== void 0 && (w.id = k), s[o] === 70 && (o++, w.text = v(), $(70), s[o] === 78 && o++), w;
    }
    if (s[o] === 43) {
      let w = l[o++], B = S(), N = g(42, "'EDGE_TEXT'"), j = t.destructLink(N, w);
      return j.text = B, k !== void 0 && (j.id = k), j;
    }
    return d("'LINK', 'START_LINK'");
  }, G = () => {
    let k = o, w = ee();
    h !== void 0 && O(w[w.length - 1], h, c, u);
    let B = w;
    for (; ; ) {
      let N = s[o];
      if (N !== 42 && N !== 43 && N !== 33) return B;
      let j = ie(), F = ee();
      h !== void 0 && O(F[F.length - 1], h, c, u), t.addLink(w, F, j), t.addEdgeMapping(w, F, j, p(k, o - 1)), B = F.concat(B), w = F;
    }
  }, z = () => {
    Xd[s[o]] === 0 && d("'NODE_STRING', 'NUM', 'COLON', 'BRKT'");
    let k = l[o++];
    for (; Xd[s[o]] === 1; ) k += l[o++];
    return k;
  }, _ = () => {
    let k = [z()];
    for (; s[o] === 40; ) o++, k.push(z());
    return k;
  }, T = () => {
    o++, g(78);
    let k;
    if (s[o] === 13) k = [l[o++]];
    else for (k = [g(34, "'DEFAULT'")]; s[o] === 40; ) o++, k.push(g(34));
    if (g(78), s[o] !== 15) {
      t.updateLink(k, _());
      return;
    }
    o++, g(78);
    let w = x();
    if (s[o] === 78) {
      o++;
      let B = _();
      t.updateLinkInterpolate(k, w), t.updateLink(k, B);
    } else t.updateLinkInterpolate(k, w);
  }, E = (k, w) => {
    if (s[o] !== 78) {
      t.setLink(k, w);
      return;
    }
    if (o++, s[o] === 25) {
      t.setLink(k, w, l[o++]);
      return;
    }
    let B = g(11, "'LINK_TARGET'");
    s[o] === 78 ? (o++, t.setLink(k, w, g(25))) : t.setLink(k, w), t.setTooltip(k, B);
  }, M = () => {
    let k = l[o++];
    switch (s[o]) {
      case 8: {
        let w = l[o++], B = s[o] === 9, N = B ? l[o++] : void 0, j;
        s[o] === 78 && (o++, j = g(11)), B ? t.setClickEvent(k, w, N) : t.setClickEvent(k, w), j !== void 0 && t.setTooltip(k, j);
        return;
      }
      case 18:
        o++, E(k, g(11));
        return;
      case 11:
        E(k, l[o++]);
        return;
      default: {
        let w = x();
        if (s[o] === 78) {
          o++;
          let B = g(11);
          t.setClickEvent(k, w), t.setTooltip(k, B);
        } else t.setClickEvent(k, w);
      }
    }
  }, A = (k) => {
    g(78, zh);
    let w = R(), B = { text: "", type: "text" };
    s[o] === 74 && (o++, B = v(), $(73));
    let N = s[o] === 7 ? D() : void 0;
    return lo[s[o]] === 0 && d(`${zh}, 'SHAPE_DATA'`), { global: !1, at: k, id: w, title: B, data: N, dataFrom: c, dataTo: u, list: [], collect: !1 };
  }, m = () => {
    let k = s[o];
    switch (k) {
      case 12: {
        o++, g(78);
        let w = b();
        return g(78), t.addVertex(w, void 0, void 0, _()), y(), yi;
      }
      case 14:
        return T(), y(), yi;
      case 16: {
        o++, g(78);
        let w = b();
        return g(78), t.addClass(w, _()), y(), yi;
      }
      case 17: {
        o++, g(78);
        let w = b();
        return g(78), t.setClass(w, b()), y(), yi;
      }
      case 19:
        return M(), y(), yi;
      case 22: {
        let w = A(o++), B = o++, N = t.addConnector(w.id, w.title);
        return U(N, w), t.addConnectorMapping(w.id, w.title, p(w.at, w.at), p(B, B)), N;
      }
      case 28:
      case 29:
      case 30:
      case 31:
      case 32:
        return o++, { stmt: "dir", value: h$[k - 28] };
      case 2: {
        o++;
        let w = g(3).trim();
        return t.setAccTitle(w), w;
      }
      case 4: {
        o++;
        let w = g(5).trim();
        return t.setAccDescription(w), w;
      }
      case 6: {
        let w = l[o++].trim();
        return t.setAccDescription(w), w;
      }
      default: {
        ao[k] === 0 && d(Ru);
        let w = G();
        return y(), w;
      }
    }
  }, I = () => {
    let k = [], w = [], B = !1;
    for (; ; ) {
      let N = s[o];
      if (N === 0) break;
      if (N === 24) {
        let j = k.pop();
        if (j === void 0) break;
        let F = o++;
        if (j.global) {
          t.addGlobal(w), w = j.list, B = j.collect;
          continue;
        }
        let Y = t.addSubGraph(j.id, w, j.title, "flow");
        U(Y, j), t.addSubgraphMapping(j.id, j.title, p(j.at, j.at), p(F, F)), w = j.list, B = j.collect, B && w.push(Y);
      } else if (N === 39 || N === 77 || N === 78 || N === 79) B && w.push(l[o]), o++;
      else if (N === 66) o++;
      else if (N === 21 || N === 23) {
        let j = o++, F;
        N === 23 || lo[s[o]] === 1 ? (F = { global: N === 23, at: j, id: void 0, title: void 0, data: void 0, dataFrom: 0, dataTo: 0, list: w, collect: B }, y()) : (F = A(j), F.list = w, F.collect = B, o++), k.push(F), w = [], B = !0;
      } else {
        let j = m();
        B && (!Array.isArray(j) || j.length > 0) && w.push(j);
      }
    }
    k.length > 0 && d("'end'");
  };
  for (; s[o] === 78 || s[o] === 77 || s[o] === 66; ) o++;
  if (g(20, "'SPACE', 'NEWLINE', 'COMMENT'"), s[o] === 26) o++, t.setDirection("TB");
  else {
    let k = g(27, "'NODIR'"), w = s[o];
    if (w === 78) {
      do
        o++;
      while (s[o] === 78);
      w = s[o], w !== 77 && d("'NEWLINE', 'SPACE'");
    } else w !== 39 && w !== 77 && w !== 66 && d("'COMMENT', 'SEMI', 'NEWLINE', 'SPACE'");
    o++, t.setDirection(k);
  }
  I(), s[o] !== 0 && d(Ru);
}
var h$ = ["TB", "BT", "RL", "LR", "TD"], Ru = "'COMMENT', 'SEMI', 'NEWLINE', 'SPACE', 'EOF', 'flow', 'global', 'connector', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'STYLE', 'LINKSTYLE', 'CLASSDEF', 'CLASS', 'CLICK', 'NODE_STRING'";
function Ki(e, t, r = 0) {
  return { w: e, h: t, kind: r, pin: 0, hint: NaN, key: NaN, span: 0, x: 0, y: 0, rank: 0 };
}
function Xi(e, t, r = 1, a = 0, s = 0) {
  return { tail: e, head: t, minlen: r, labelW: a, labelH: s, tailDx: 0, headDx: 0, tailFixed: !1, headFixed: !1, reversed: !1, points: [], labelX: 0, labelY: 0 };
}
var c$ = 24, Du = 2e4, Zd = 16, Lu = 8, d$ = 0.125, Ou = 3, f$ = 18, u$ = 10, p$ = 14, g$ = 2, m$ = 28, Fu = 12, y$ = 12, x$ = 8, w$ = 4, zu = 0.5, Kr = 0.5, Qd = 1, $$ = 12, Pu = 24, b$ = 40, Wu = 400, Wl = 16, Ph = new Float64Array(2 * Wl + 2), Wh = new Float64Array(2 * Wl + 2);
function Bl(e) {
  return e === 1 || e === 2;
}
function Bu(e, t, r, a) {
  for (let s = t + 1; s < r; s++) {
    let l = e[s], n = a[l], i = s - 1;
    for (; i >= t && (a[e[i]] > n || a[e[i]] === n && e[i] > l); ) e[i + 1] = e[i], i--;
    e[i + 1] = l;
  }
}
function M$(e, t, r, a, s, l) {
  let n = (h, c) => r[h] < r[c] || r[h] === r[c] && (s ? a[h] > a[c] : a[h] < a[c]);
  for (let h = 0; h < t; h += 8) for (let c = h + 1, u = Math.min(t, h + 8); c < u; c++) {
    let d = e[c], p = c - 1;
    for (; p >= h && n(d, e[p]); ) e[p + 1] = e[p], p--;
    e[p + 1] = d;
  }
  let i = e, o = l;
  for (let h = 8; h < t; h *= 2) {
    for (let u = 0; u < t; u += 2 * h) {
      let d = Math.min(t, u + h), p = Math.min(t, u + 2 * h), g = u, y = d, b = u;
      for (; g < d && y < p; ) o[b++] = n(i[y], i[g]) ? i[y++] : i[g++];
      for (; g < d; ) o[b++] = i[g++];
      for (; y < p; ) o[b++] = i[y++];
    }
    let c = i;
    i = o, o = c;
  }
  if (i !== e) for (let h = 0; h < t; h++) e[h] = i[h];
}
function Bh(e, t, r) {
  let a = e.length;
  if (a === 0) return { width: 0, height: 0 };
  let s = t.length;
  if (a === 1 && s === 0 && e[0].kind === 0) {
    let se = e[0];
    return se.rank = 0, se.x = se.w / 2, se.y = se.h / 2, { width: se.w, height: se.h };
  }
  let l = 1;
  if (s > 0) {
    let se = /* @__PURE__ */ new Set();
    for (let ye of t) {
      let ke = Math.min(ye.tail, ye.head), $e = Math.max(ye.tail, ye.head), be = ke * a + $e;
      if (ye.labelW > 0 || se.has(be)) {
        l = 2;
        break;
      }
      se.add(be);
    }
  }
  Bf(e, t), Gf(e, t, l);
  let n = new Int32Array(s), i = 0;
  for (let se = 0; se < s; se++) {
    let ye = t[se];
    n[se] = Math.abs(e[ye.head].rank - e[ye.tail].rank), n[se] > 1 && (i += n[se] - 1);
  }
  let o = new Uint8Array(s);
  if (i > Du) {
    let se = [];
    for (let ye = 0; ye < s; ye++) n[ye] > 1 && se.push(ye);
    se.sort((ye, ke) => n[ke] - n[ye] || ye - ke);
    for (let ye of se) {
      if (i <= Du) break;
      o[ye] = 1, i -= n[ye] - 1;
    }
  }
  let h = a + i, c = new Float64Array(h), u = new Float64Array(h), d = new Uint8Array(h), p = new Int32Array(h), g = 0;
  for (let se = 0; se < a; se++) {
    let ye = e[se];
    c[se] = ye.w, u[se] = ye.h, d[se] = ye.kind, p[se] = ye.rank, ye.rank > g && (g = ye.rank);
  }
  let y = 0;
  for (let se = 0; se < s; se++) o[se] || (y += n[se]);
  let b = new Int32Array(y), x = new Int32Array(y), v = new Float64Array(y), $ = new Float64Array(y), S = new Int32Array(s).fill(-1), R = new Uint8Array(g + 1), D = new Int32Array(s).fill(-1), O = !1;
  for (let se = 0; se < a; se++) e[se].span > 0 && e[se].kind === 0 && (O = !0);
  let U = O ? new Uint8Array(y) : void 0, q = O ? new Uint8Array(y) : void 0, C = new Int32Array(s).fill(-1), ee = new Int32Array(s).fill(-1), ie = new Float64Array(h).fill(NaN);
  for (let se = 0; se < a; se++) ie[se] = e[se].key;
  let G = !1;
  {
    let se = a, ye = 0;
    for (let ke = 0; ke < s; ke++) {
      if (o[ke]) continue;
      let $e = t[ke], be = $e.reversed ? $e.head : $e.tail, Ie = $e.reversed ? $e.tail : $e.head, ze = $e.reversed ? $e.headDx : $e.tailDx, Oe = $e.reversed ? $e.tailDx : $e.headDx;
      (ze !== 0 || Oe !== 0) && (G = !0);
      let de = p[be], Te = p[Ie], fe = -1;
      $e.labelW > 0 && (fe = de + (Te - de >> 1), l === 2 && Te - de >= 4 ? (fe & 1) === 1 && (fe += $e.reversed ? 1 : -1) : l === 2 && (fe & 1) === 0 && (fe += $e.reversed ? 1 : -1));
      let Ce = be;
      Te - de > 1 && (S[ke] = se), C[ke] = ye, U && !($e.reversed ? $e.headFixed : $e.tailFixed) && (U[ye] = $e.reversed ? 2 : 1);
      for (let Fe = de + 1; Fe < Te; Fe++) {
        let He = se++;
        p[He] = Fe, ie[He] = ie[be] + (ie[Ie] - ie[be]) * (Fe - de) / (Te - de), Fe === fe ? (c[He] = $e.labelW, u[He] = $e.labelH, d[He] = 2, D[ke] = He, R[Fe] |= $e.reversed ? 2 : 1) : d[He] = 1, b[ye] = Ce, x[ye] = He, v[ye] = Ce === be ? ze : 0, ye++, Ce = He;
      }
      b[ye] = Ce, x[ye] = Ie, v[ye] = Ce === be ? ze : 0, $[ye] = Oe, q && !($e.reversed ? $e.tailFixed : $e.headFixed) && (q[ye] = $e.reversed ? 1 : 2), ee[ke] = ye, ye++;
    }
  }
  let z;
  if (r.groups) {
    let { of: se, parent: ye } = r.groups;
    z = new Int32Array(h);
    for (let be = 0; be < a; be++) z[be] = se[be];
    let ke = (be) => {
      let Ie = 0;
      for (; be >= 0; be = ye[be]) Ie++;
      return Ie;
    }, $e = (be, Ie) => {
      let ze = ke(be), Oe = ke(Ie);
      for (; ze > Oe; ze--) be = ye[be];
      for (; Oe > ze; Oe--) Ie = ye[Ie];
      for (; be !== Ie; ) be = ye[be], Ie = ye[Ie];
      return be;
    };
    for (let be = 0; be < s; be++) {
      if (S[be] < 0) continue;
      let Ie = t[be], ze = $e(se[Ie.tail], se[Ie.head]);
      for (let Oe = S[be], de = Oe + n[be] - 1; Oe < de; Oe++) z[Oe] = ze;
    }
  }
  let _ = new Int32Array(h + 1), T = new Int32Array(h + 1);
  for (let se = 0; se < y; se++) _[b[se] + 1]++, T[x[se] + 1]++;
  for (let se = 0; se < h; se++) _[se + 1] += _[se], T[se + 1] += T[se];
  let E = new Int32Array(y), M = new Int32Array(y);
  {
    let se = _.slice(0, h), ye = T.slice(0, h);
    for (let ke = 0; ke < y; ke++) E[se[b[ke]]++] = ke, M[ye[x[ke]]++] = ke;
  }
  let A = new Int32Array(g + 2);
  for (let se = 0; se < h; se++) A[p[se] + 1]++;
  for (let se = 0; se <= g; se++) A[se + 1] += A[se];
  let m = new Int32Array(h), I = new Int32Array(h);
  {
    let se = new Int32Array(h), ye = A.slice(0, g + 1);
    for (let be = 0; be < h; be++) se[ye[p[be]]++] = be;
    for (let be = 0; be <= g; be++) ye[be] = A[be];
    let ke = new Uint8Array(h), $e = [];
    for (let be = 0; be < h; be++) if (!ke[se[be]]) for ($e.push(se[be]); $e.length > 0; ) {
      let Ie = $e.pop();
      if (!ke[Ie]) {
        ke[Ie] = 1, m[ye[p[Ie]]++] = Ie;
        for (let ze = _[Ie + 1] - 1; ze >= _[Ie]; ze--) {
          let Oe = x[E[ze]];
          ke[Oe] || $e.push(Oe);
        }
      }
    }
  }
  let k = (se, ye) => {
    let ke = A[se], $e = A[se + 1];
    if ($e - ke < 2) return !1;
    for (let ze = ke; ze < $e; ze++) if (Number.isNaN(ye(m[ze]))) return !1;
    let be = Array.from(m.subarray(ke, $e)), Ie = /* @__PURE__ */ new Map();
    return be.forEach((ze, Oe) => Ie.set(ze, Oe)), be.sort((ze, Oe) => ye(ze) - ye(Oe) || Ie.get(ze) - Ie.get(Oe)), m.set(be, ke), !0;
  };
  for (let se = 0; se <= g; se++) k(se, (ye) => ie[ye]);
  let w = !1;
  for (let se = 0; se < a; se++) e[se].pin !== 0 && (w = !0);
  if (w) for (let se = 0; se <= g; se++) {
    let ye = Array.from(m.subarray(A[se], A[se + 1])), ke = /* @__PURE__ */ new Map();
    ye.forEach((be, Ie) => ke.set(be, Ie));
    let $e = (be) => be < a ? e[be].pin : 0;
    ye.sort((be, Ie) => $e(be) - $e(Ie) || ke.get(be) - ke.get(Ie)), m.set(ye, A[se]);
  }
  let B = new Uint8Array(g + 1), N = (se) => se < a && (e[se].kind === 3 || e[se].kind === 4) ? e[se].hint : NaN;
  for (let se of [0, g]) k(se, N) && (B[se] = 1);
  let j = () => {
    for (let se = 0; se <= g; se++) {
      let ye = A[se];
      for (let ke = ye, $e = A[se + 1]; ke < $e; ke++) I[m[ke]] = ke - ye;
    }
  };
  j();
  let F = { n: h, real: a, maxRank: g, W: c, KIND: d, RANK: p, EF: b, ET: x, EFD: v, ETD: $, succStart: _, succE: E, predStart: T, predE: M, layerStart: A, order: m, pos: I, offsets: G, fixed: B, GRP: z, groupParent: r.groups?.parent }, Y = 0, W = 0;
  if (y > 0 && g > 0 && ([Y, W] = R$(F, e), j()), r.orderOnly) {
    let se = Gu(F, r);
    for (let ye = 0; ye < a; ye++) e[ye].x = se[ye];
    for (let ye = 0; ye < s; ye++) {
      let ke = t[ye], $e = ke.reversed ? ke.head : ke.tail, be = ke.reversed ? ke.tail : ke.head, Ie = [p[$e], se[$e]];
      if (!o[ye] && S[ye] >= 0) for (let ze = S[ye], Oe = ze + n[ye] - 1; ze < Oe; ze++) Ie.push(p[ze], se[ze]);
      Ie.push(p[be], se[be]), ke.points = Ie;
    }
    return { width: 0, height: 0, crossings: Y, declared: W };
  }
  U && q && v$(F, e, U, q);
  let K = Gu(F, r), H = S$(F);
  if (U && q) {
    let se = A$(F, U, q);
    E$(F, e, K, se, r, H), T$(F, e, K, U, q, se, H), C$(F, K, H, r);
    for (let ye = 0; ye < s; ye++) {
      if (o[ye]) continue;
      let ke = t[ye], $e = v[C[ye]], be = $[ee[ye]];
      ke.tailDx = ke.reversed ? be : $e, ke.headDx = ke.reversed ? $e : be;
    }
  }
  k$(F, K, H);
  let te = new Uint8Array(h);
  H && !r.tracks && I$(F, K, H, S, n, r.apart ? 0 : r.edgeSep, te), r.tracks || N$(F, K, S, n, r.edgeSep, te);
  let Q = new Int32Array(s + 1), L = r.tracks || U && !r.straight ? { from: [], to: [], rank: [], lower: [], track: [], levels: [], wide: [] } : void 0, X = new Int32Array(g + 1);
  if (L) {
    for (let se = 0; se < s; se++) {
      if (Q[se] = L.from.length, o[se]) continue;
      let ye = S[se], ke = !1;
      for (let Ie = ye, ze = ye < 0 ? ye : ye + n[se] - 1; Ie < ze; Ie++) {
        let Oe = H !== void 0 && H[p[Ie]] === 1;
        !r.tracks && Oe !== (te[Ie] === 1) && (ke = !0);
      }
      if (ke) continue;
      let $e = K[b[C[se]]] + v[C[se]], be = p[b[C[se]]];
      for (let Ie = ye, ze = ye < 0 ? ye : ye + n[se] - 1; Ie < ze; Ie++) H && H[p[Ie]] || (L.from.push($e), L.to.push(K[Ie]), L.rank.push(be), L.lower.push(Ie), $e = K[Ie], be = p[Ie]);
      L.from.push($e), L.to.push(K[x[ee[se]]] + $[ee[se]]), L.rank.push(be), L.lower.push(-1);
    }
    Q[s] = L.from.length;
  }
  let le = (se, ye) => {
    let ke = !1;
    for (let $e = A[se]; $e < A[se + 1]; $e++) {
      let be = d[m[$e]];
      if (be === ye) ke = !0;
      else if (be !== 1) return !1;
    }
    return ke;
  }, J = le(0, 3) ? l : 0, V = le(g, 4) ? l : 0, Z = new Float64Array(g + 1);
  for (let se = 0; se < y; se++) {
    let ye = Math.abs(K[b[se]] + v[se] - K[x[se]] - $[se]);
    ye > Z[p[b[se]]] && (Z[p[b[se]]] = ye);
  }
  let ae = new Float64Array(g + 1), oe = new Float64Array(g + 1), ue = (se) => (se < J || se >= g - V ? r.portSep : r.rankSep) / l, he = new Float64Array(g + 1);
  for (let se = 0; se < g; se++) he[se] = L ? ue(se) : Math.max(ue(se), Math.min(Ou * r.rankSep / l, Z[se] * d$));
  let re = new Uint8Array(g + 1).fill(1);
  for (let se = 0; se < a; se++) re[p[se]] = 0;
  for (let se = 1; se < g; se++) {
    if (r.tracks || !re[se] || R[se] !== 1 && R[se] !== 2) continue;
    let ye = Math.min((r.headRoom ?? 0) / 2, he[R[se] === 1 ? se - 1 : se] / 2);
    he[se - 1] += R[se] === 1 ? -ye : ye, he[se] += R[se] === 1 ? ye : -ye;
  }
  let P = (se) => d[se] === 1 && re[p[se]] && !r.tracks ? (oe[p[se]] - ae[p[se]]) / 4 : 0, ne = r.tracks ? f$ : m$, ce = r.tracks ? u$ : Fu, pe = r.tracks ? p$ : Fu, Me = new Int32Array(g + 1);
  if (L) {
    let se = new Float64Array(g + 1);
    for (let ke = 0; ke < g; ke++) {
      if (H && H[ke]) continue;
      let $e = ke + 1;
      for (se[ke] = he[ke]; $e < g && H && H[$e]; ) se[ke] += he[$e++];
      Me[ke] = $e;
    }
    for (let ke = 0; ke < L.from.length; ke++) L.wide.push(Math.abs(L.from[ke] - L.to[ke]) > g$ * se[L.rank[ke]] ? 1 : 0);
    let ye = new Float64Array(g + 1);
    _$(L, X, !r.tracks, se, ye);
    for (let ke = 0; ke < g; ke++) X[ke] > 0 ? he[ke] += Math.max(0, 2 * ne + (X[ke] - 1) * ce - se[ke]) : ye[ke] > 0 && (he[ke] += Math.max(0, Math.min(Ou * r.rankSep, ye[ke]) - se[ke]));
  }
  let xe = 0;
  for (let se = 0; se <= g; se++) {
    let ye = 0;
    for (let ke = A[se]; ke < A[se + 1]; ke++) u[m[ke]] > ye && (ye = u[m[ke]]);
    ae[se] = xe, oe[se] = xe + ye, xe += ye + he[se];
  }
  let ve = xe, Ae = (se, ye = L.track[se]) => {
    let ke = L.rank[se], $e = oe[ke], be = ae[Me[ke]], Ie = r.tracks ? X[ke] : L.levels[se], ze = Ie > 1 ? Math.min(pe, (be - $e - 2 * ne) / (Ie - 1)) : 0;
    return ($e + be) / 2 + (ye - (Ie - 1) / 2) * ze;
  }, Ee = 1 / 0, me = -1 / 0;
  for (let se = 0; se < h; se++) {
    let ye = c[se] / 2;
    K[se] - ye < Ee && (Ee = K[se] - ye), K[se] + ye > me && (me = K[se] + ye);
  }
  let we = new Uint8Array(g + 1), Se = new Uint8Array(g + 1);
  for (let se = 0; se < a; se++) d[se] !== 0 || !U || (T[se + 1] > T[se] && (we[p[se]] = 1), _[se + 1] > _[se] && (Se[p[se]] = 1));
  for (let se = 0; se < a; se++) {
    let ye = e[se], ke = ye.rank;
    ye.x = K[se] - Ee, d[se] === 0 && Se[ke] && !we[ke] ? ye.y = oe[ke] - ye.h / 2 : d[se] === 0 && we[ke] && !Se[ke] ? ye.y = ae[ke] + ye.h / 2 : ye.y = (ae[ke] + oe[ke]) / 2;
  }
  for (let se = 0; se < s; se++) {
    let ye = t[se], ke = e[ye.reversed ? ye.head : ye.tail], $e = e[ye.reversed ? ye.tail : ye.head], be = [ke.x + (ye.reversed ? ye.headDx : ye.tailDx), ke.y + ke.h / 2], Ie = S[se];
    if (L && Q[se + 1] > Q[se]) for (let Oe = Q[se]; Oe < Q[se + 1]; Oe++) {
      if (L.track[Oe] >= 0 && (r.tracks || L.wide[Oe] === 1)) {
        let Te = Ae(Oe);
        be.push(L.from[Oe] - Ee, Te, L.to[Oe] - Ee, Te);
      } else L.track[Oe] > 0 && be.push(L.from[Oe] - Ee, Ae(Oe, L.track[Oe] - 1));
      let de = L.lower[Oe];
      de < 0 || (be.push(K[de] - Ee, ae[p[de]] + P(de)), oe[p[de]] > ae[p[de]] && be.push(K[de] - Ee, oe[p[de]] - P(de)));
    }
    else if (Ie >= 0) for (let Oe = Ie, de = Ie + n[se] - 1; Oe < de; Oe++) {
      if (te[Oe]) continue;
      let Te = K[Oe] - Ee, fe = ae[p[Oe]], Ce = oe[p[Oe]];
      be.push(Te, fe + P(Oe)), Ce > fe && be.push(Te, Ce - P(Oe));
    }
    if (be.push($e.x + (ye.reversed ? ye.tailDx : ye.headDx), $e.y - $e.h / 2), ye.reversed) for (let Oe = 0, de = be.length - 2; Oe < de; Oe += 2, de -= 2) {
      let Te = be[Oe], fe = be[Oe + 1];
      be[Oe] = be[de], be[Oe + 1] = be[de + 1], be[de] = Te, be[de + 1] = fe;
    }
    ye.points = be;
    let ze = D[se];
    ze >= 0 ? (ye.labelX = K[ze] - Ee, ye.labelY = (ae[p[ze]] + oe[p[ze]]) / 2) : ye.labelW > 0 && (ye.labelX = (be[0] + be[be.length - 2]) / 2, ye.labelY = (be[1] + be[be.length - 1]) / 2);
  }
  return { width: me - Ee, height: ve };
}
function Bf(e, t) {
  let r = e.length, a = t.length, s = new Int32Array(r + 1);
  for (let h = 0; h < a; h++) {
    let c = t[h];
    c.reversed = e[c.head].kind === 3 || e[c.tail].kind === 4, c.reversed || s[c.tail + 1]++;
  }
  for (let h = 0; h < r; h++) s[h + 1] += s[h];
  let l = new Int32Array(s[r]);
  {
    let h = s.slice(0, r);
    for (let c = 0; c < a; c++) t[c].reversed || (l[h[t[c].tail]++] = c);
  }
  let n = new Uint8Array(r), i = s.slice(0, r), o = [];
  for (let h = 0; h < r; h++) if (n[h] === 0) for (o.push(h), n[h] = 1; o.length > 0; ) {
    let c = o[o.length - 1];
    if (i[c] < s[c + 1]) {
      let u = t[l[i[c]++]], d = u.head;
      n[d] === 1 ? u.reversed = !0 : n[d] === 0 && (n[d] = 1, o.push(d));
    } else n[c] = 2, o.pop();
  }
}
function Gf(e, t, r) {
  let a = e.length, s = t.length, l = new Int32Array(s), n = new Int32Array(s), i = new Int32Array(s), o = new Int32Array(a + 1), h = new Int32Array(a + 1);
  for (let $ = 0; $ < s; $++) {
    let S = t[$], R = S.reversed ? S.head : S.tail, D = S.reversed ? S.tail : S.head;
    l[$] = R, n[$] = D, i[$] = Math.max(1, S.minlen) * r, o[R + 1]++, h[D + 1]++;
  }
  for (let $ = 0; $ < a; $++) o[$ + 1] += o[$], h[$ + 1] += h[$];
  let c = new Int32Array(s), u = new Int32Array(s);
  {
    let $ = o.slice(0, a), S = h.slice(0, a);
    for (let R = 0; R < s; R++) c[$[l[R]]++] = R, u[S[n[R]]++] = R;
  }
  let d = new Int32Array(a);
  for (let $ = 0; $ < a; $++) e[$].kind === 3 && (d[$] = -r);
  let p = new Int32Array(a);
  for (let $ = 0; $ < a; $++) p[$] = h[$ + 1] - h[$];
  let g = new Int32Array(a), y = 0;
  for (let $ = 0; $ < a; $++) p[$] === 0 && (g[y++] = $);
  for (let $ = 0; $ < y; $++) {
    let S = g[$];
    for (let R = o[S]; R < o[S + 1]; R++) {
      let D = c[R], O = n[D];
      d[S] + i[D] > d[O] && (d[O] = d[S] + i[D]), --p[O] === 0 && (g[y++] = O);
    }
  }
  for (let $ = 0; $ < 8; $++) {
    let S = !1;
    for (let R = y - 1; R >= 0; R--) {
      let D = g[R], O = h[D + 1] - h[D], U = o[D + 1] - o[D];
      if (O === 0 && U === 0) continue;
      let q = -1 / 0, C = 1 / 0;
      for (let ie = h[D]; ie < h[D + 1]; ie++) {
        let G = u[ie];
        q = Math.max(q, d[l[G]] + i[G]);
      }
      for (let ie = o[D]; ie < o[D + 1]; ie++) {
        let G = c[ie];
        C = Math.min(C, d[n[G]] - i[G]);
      }
      let ee = d[D];
      U > O && C !== 1 / 0 ? ee = C : O > U && q !== -1 / 0 && (ee = q), ee !== d[D] && (d[D] = ee, S = !0);
    }
    if (!S) break;
  }
  let b = 1 / 0, x = -1 / 0, v = !1;
  for (let $ = 0; $ < a; $++) {
    let S = e[$].kind;
    S === 3 && (v = !0), !(S === 3 || S === 4) && (d[$] < b && (b = d[$]), d[$] > x && (x = d[$]));
  }
  b === 1 / 0 && (b = 0, x = 0);
  for (let $ = 0; $ < a; $++) e[$].kind === 3 ? d[$] = b - r : e[$].kind === 4 && (d[$] = x + r);
  v && (b -= r);
  for (let $ = 0; $ < a; $++) e[$].rank = d[$] - b;
}
function G2(e, t, r, a, s, l, n) {
  let i = r === 0 ? e.predStart : e.succStart, o = r === 0 ? e.predE : e.succE, h = r === 0 ? e.EF : e.ET, c = e.pos;
  for (let g = i[t]; g < i[t + 1]; g++) s[o[g]] !== 0 && l.push(o[g]);
  if (l.length < 2) return 0;
  l.sort((g, y) => c[h[g]] - c[h[y]] || g - y);
  let u = (g) => {
    let y = 0;
    n[0] = 0;
    for (let b = 1; b < l.length; b++) {
      let x = s[l[b]] === s[l[b - 1]];
      n[b] = g(x && s[l[b]] === 1, x), y += n[b];
    }
    return y;
  }, d = u(() => 1);
  if (a / d < Lu && (d = u((g) => g ? 0.5 : 1)), a / d < Lu && (d = u((g, y) => y ? 0 : 1)), d === 0) return 0;
  let p = Math.min(Zd, a / d);
  for (let g = 1; g < l.length; g++) n[g] *= p;
  return d * p;
}
function v$(e, t, r, a) {
  let { real: s, W: l, EFD: n, ETD: i } = e;
  for (let o = 0; o < s; o++) {
    let h = Math.min(t[o].span, l[o]);
    if (!(h <= 0 || t[o].kind !== 0)) for (let c = 0; c < 2; c++) {
      let u = [], d = [], p = G2(e, o, c, h, c === 0 ? a : r, u, d);
      if (p === 0) continue;
      let g = c === 0 ? i : n, y = -p / 2;
      for (let b = 0; b < u.length; b++) y += d[b], g[u[b]] = y;
    }
  }
}
function Ms(e, t, r, a) {
  if (!t) return r;
  let { KIND: s, RANK: l, EF: n, ET: i, succStart: o, succE: h, predStart: c, predE: u } = e;
  for (let d = 0; d < 1e5; d++) {
    let p = a === 0 ? n[r] : i[r];
    if (s[p] !== 1 || !t[l[p]]) break;
    r = a === 0 ? u[c[p]] : h[o[p]];
  }
  return r;
}
function k$(e, t, r) {
  let { maxRank: a, KIND: s, EF: l, ET: n, EFD: i, ETD: o, succStart: h, succE: c, predStart: u, predE: d, layerStart: p, order: g } = e;
  for (let [y, b] of [[0, 3], [a, 4]]) {
    let x = p[y], v = p[y + 1], $ = [];
    for (let S = x; S < v; S++) {
      let R = g[S], D = b === 3;
      if (s[R] !== b || (D ? h[R + 1] - h[R] : u[R + 1] - u[R]) !== 1) break;
      let O = Ms(e, r, D ? c[h[R]] : d[u[R]], D ? 1 : 0), U = D ? t[n[O]] + o[O] : t[l[O]] + i[O];
      if ($.length > 0 && U < $[$.length - 1] + Qd) break;
      $.push(U);
    }
    if (!($.length === 0 || $.length !== v - x)) for (let S = x; S < v; S++) t[g[S]] = $[S - x];
  }
}
function A$(e, t, r) {
  let a = [new Int32Array(e.n), new Int32Array(e.n)];
  for (let s = 0; s < e.EF.length; s++) r[s] !== 0 && a[0][e.ET[s]]++, t[s] !== 0 && a[1][e.EF[s]]++;
  return a;
}
function Eo(e, t) {
  return Math.max(0.25, Math.min(0.5, 4 * Math.abs(t) / (Math.abs(e) || 1)));
}
function E$(e, t, r, a, s, l) {
  let n = s.edgeSep, { n: i, real: o, maxRank: h, KIND: c, RANK: u, W: d, EF: p, ET: g, EFD: y, ETD: b, succStart: x, succE: v, predStart: $, predE: S, layerStart: R, order: D, pos: O } = e, U = (z) => c[z] === 2 || c[z] === 1 && !(l !== void 0 && l[u[z]] === 1), q = (z, _) => {
    let T = _ === 0 ? p[z] : g[z];
    return [_ === 0 ? r[T] + y[z] : r[T] + b[z], T < o && t[T].kind === 0 ? a[1 - _][T] : 0];
  }, C = (z) => {
    let _ = R[u[z]], T = _ + O[z], E = (M) => d[M] / 2 + d[z] / 2 + (c[M] === 0 ? s.nodeSep / 2 + n / 2 : c[M] === c[z] ? n : n / 2);
    return [T > _ ? r[D[T - 1]] + E(D[T - 1]) : -1 / 0, T + 1 < R[u[z] + 1] ? r[D[T + 1]] - E(D[T + 1]) : 1 / 0];
  }, ee = (z, _, T, E, M) => {
    let A = (_[1] !== T[1] ? _[1] < T[1] : Math.abs(_[0] - z) <= Math.abs(T[0] - z)) ? [_[0], T[0]] : [T[0], _[0]];
    return A.find((m) => m >= E && m <= M) ?? Math.max(E, Math.min(M, A[0]));
  }, ie = new Uint8Array(i), G = [];
  for (let z = 1; z < h; z++) for (let _ = R[z]; _ < R[z + 1]; _++) {
    if (!U(D[_]) || ie[D[_]]) continue;
    let T = D[_];
    for (; Bl(c[p[S[$[T]]]]); ) T = p[S[$[T]]];
    let E = T, M = -1 / 0, A = 1 / 0;
    G.length = 0;
    for (let m = T; Bl(c[m]); m = g[v[x[m]]]) {
      if (E = m, !U(m)) continue;
      ie[m] = 1, G.push(m);
      let [I, k] = C(m);
      I > M && (M = I), k < A && (A = k);
    }
    if (M <= A) {
      let m = ee(r[G[0]], q(S[$[T]], 0), q(v[x[E]], 1), M, A);
      for (let I of G) r[I] = m;
      continue;
    }
    for (let m of G) {
      let [I, k] = C(m);
      I > k || (r[m] = ee(r[m], q(Ms(e, l, S[$[m]], 0), 0), q(Ms(e, l, v[x[m]], 1), 1), I, k));
    }
  }
}
function T$(e, t, r, a, s, l, n) {
  let { real: i, W: o, EF: h, ET: c, EFD: u, ETD: d, succStart: p, succE: g, predStart: y, predE: b, pos: x } = e, v = (S, R, D, O, U) => {
    if (l[R][D] < 2) return 0;
    S = Ms(e, n, S, R);
    let q = R === 0 ? h[S] : c[S], C = R === 0 ? r[q] + u[S] : r[q] + d[S];
    if (U && Math.abs(C - r[D]) <= O / 2 + Kr) return Math.max(-O / 2, Math.min(O / 2, C - r[D]));
    let ee = C, ie = 0;
    q < i && t[q].kind === 0 && (R === 0 ? a : s)[S] !== 0 && l[1 - R][q] >= 2 && (ie = Math.max(0, Math.min(t[q].span, o[q])), ie > 0 && (ee = r[q]));
    let G = Math.max(r[D] - O / 2, ee - ie / 2), z = Math.min(r[D] + O / 2, ee + ie / 2);
    if (G > z + Kr) {
      let T = Math.max(0, O / 2 - b$);
      return Math.max(-T, Math.min(T, C - r[D]));
    }
    let _ = (r[D] * ie + ee * O) / (ie + O);
    return Math.max(G, Math.min(z, _)) - r[D];
  }, $ = [];
  for (let S = 0; S < i; S++) {
    let R = Math.min(t[S].span, o[S]);
    if (!(R <= 0 || t[S].kind !== 0)) for (let D = 0; D < 2; D++) {
      let O = D === 0 ? h : c, U = D === 0 ? y : p, q = D === 0 ? b : g, C = [], ee = [];
      if (G2(e, S, D, R, D === 0 ? s : a, C, ee), C.length === 0) continue;
      C.length === 1 && (ee[0] = 0);
      let ie = [];
      for (let G = U[S]; G < U[S + 1]; G++) ie.push(q[G]);
      ie.sort((G, z) => x[O[G]] - x[O[z]] || G - z), $.push({ v: S, side: D, span: R, ids: C, room: ee, all: ie });
    }
  }
  for (let S = 0, R = !0; R && S < 6; S++) {
    R = !1;
    for (let { v: D, side: O, span: U, ids: q, room: C, all: ee } of $) {
      let ie = O === 0 ? s : a, G = O === 0 ? d : u, z = 0, _ = -U / 2;
      for (let T = 0; T <= ee.length; T++) {
        let E = T < ee.length && ie[ee[T]] === 0;
        if (T < ee.length && !E) continue;
        let M = 0;
        for (let m = T - 1; m >= 0 && ie[ee[m]] !== 0; m--) M++;
        let A = E ? G[ee[T]] - Zd : U / 2;
        if (M > 0) {
          let m = [], I = [], k = 0;
          for (let N = 0; N < M; N++) {
            N > 0 && (k += C[z + N]), m.push(v(q[z + N], O, D, U, S > 0) - k), I.push(1);
            let j = N > 0 && C[z + N] === 0;
            for (; m.length > 1 && (j || m[m.length - 2] / I[I.length - 2] > m[m.length - 1] / I[I.length - 1]); ) {
              j = !1;
              let F = m.pop(), Y = I.pop();
              m[m.length - 1] += F, I[I.length - 1] += Y;
            }
          }
          let w = k, B = 0;
          k = 0;
          for (let N = 0; N < m.length; N++) {
            let j = A - w < _ ? (_ + A - w) / 2 : Math.max(_, Math.min(A - w, m[N] / I[N]));
            for (let F = 0; F < I[N]; F++, B++) B > 0 && (k += C[z + B]), Math.abs(G[q[z + B]] - j - k) > 0.01 && (R = !0), G[q[z + B]] = j + k;
          }
          z += M;
        }
        E && (_ = G[ee[T]] + Zd);
      }
    }
  }
}
function C$(e, t, r, a) {
  let { n: s, KIND: l, RANK: n, EF: i, ET: o, EFD: h, ETD: c, layerStart: u, order: d, pos: p } = e, g = (C) => r !== void 0 && l[C] === 1 && r[n[C]] === 1, y = [], b = [], x = [], v = [];
  for (let C = 0; C < i.length; C++) {
    if (g(i[C])) continue;
    let ee = Ms(e, r, C, 1);
    y.push(i[C]), b.push(o[ee]), x.push(h[C]), v.push(c[ee]);
  }
  let $ = (C) => t[b[C]] + v[C] - t[y[C]] - x[C], S = new Int32Array(s), R = [];
  for (let C = 0; C < s; C++) S[C] = C, R.push([C]);
  let D = (C, ee) => {
    let ie = S[C], G = S[ee];
    if (ie !== G) {
      R[ie].length < R[G].length && ([ie, G] = [G, ie]);
      for (let z of R[G]) S[z] = ie, R[ie].push(z);
      R[G] = [];
    }
  }, O = [];
  for (let C = 0; C < y.length; C++) {
    let ee = Math.abs($(C));
    ee < 0.01 ? D(y[C], b[C]) : ee <= Pu && O.push(C);
  }
  if (O.length === 0) return;
  O.sort((C, ee) => Math.abs($(C)) - Math.abs($(ee)) || C - ee);
  let U = (C) => H2(e, a, C), q = (C, ee) => {
    for (let ie of R[C]) {
      let G = u[n[ie]], z = u[n[ie] + 1], _ = G + p[ie];
      if (_ > G && S[d[_ - 1]] !== C && t[ie] + ee - t[d[_ - 1]] < U(ie) + U(d[_ - 1]) - 0.01 || _ + 1 < z && S[d[_ + 1]] !== C && t[d[_ + 1]] - t[ie] - ee < U(ie) + U(d[_ + 1]) - 0.01) return !1;
    }
    return !0;
  };
  for (let C of O) {
    let ee = $(C);
    if (Math.abs(ee) < 0.01) {
      D(y[C], b[C]);
      continue;
    }
    if (Math.abs(ee) > Pu || S[y[C]] === S[b[C]]) continue;
    let ie = S[y[C]], G = S[b[C]], z = R[ie].length <= R[G].length ? ie : G;
    for (let _ of [z, z === ie ? G : ie]) {
      let T = _ === ie ? ee : -ee;
      if (!(Math.abs(ee) > $$ && !R[_].every((E) => l[E] === 1)) && q(_, T)) {
        for (let E of R[_]) t[E] += T;
        D(y[C], b[C]);
        break;
      }
    }
  }
}
function S$(e) {
  let { maxRank: t, KIND: r, layerStart: a, order: s } = e, l = new Uint8Array(t + 1), n = !1;
  for (let i = 1; i < t; i++) {
    let o = a[i + 1] > a[i];
    for (let h = a[i]; o && h < a[i + 1]; h++) r[s[h]] !== 1 && (o = !1);
    o && (l[i] = 1, n = !0);
  }
  return n ? l : void 0;
}
function _$(e, t, r, a, s) {
  let { from: l, to: n, rank: i, track: o, levels: h, wide: c } = e, u = l.length, d = /* @__PURE__ */ new Map();
  for (let C = 0; C < u; C++) {
    if (o.push(-1), h.push(0), Math.abs(l[C] - n[C]) < Kr) continue;
    let ee = d.get(i[C]);
    ee ? ee.push(C) : d.set(i[C], [C]);
  }
  if (d.size === 0) return;
  let p = new Float64Array(u), g = new Float64Array(u);
  for (let C = 0; C < u; C++) p[C] = Math.min(l[C], n[C]), g[C] = Math.max(l[C], n[C]);
  let y = (C, ee) => C >= p[ee] - Kr && C <= g[ee] + Kr ? 1 : 0, b = (C, ee) => Math.abs(l[C] - l[ee]) < Kr || Math.abs(n[C] - n[ee]) < Kr, x = (C, ee) => p[C] < g[ee] - Kr && p[ee] < g[C] - Kr, v = (C, ee) => x(C, ee) && !b(C, ee), $ = (C, ee) => x(C, ee) || y(n[C], ee) + y(l[ee], C) + y(n[ee], C) + y(l[C], ee) > 0, S = (C, ee) => y(n[C], ee) + y(l[ee], C), R = (C) => {
    let ee = C.map((G, z) => z).sort((G, z) => p[C[G]] - p[C[z]]), ie = [];
    for (let G = 0; G < ee.length; G++) {
      let z = ee[G], _ = g[C[z]] + 4 * Kr;
      for (let T = G + 1; T < ee.length && p[C[ee[T]]] <= _; T++) {
        let E = ee[T];
        ie.push(Math.min(z, E), Math.max(z, E));
      }
    }
    return ie;
  }, D = (C) => {
    C.sort((B, N) => g[N] - p[N] - (g[B] - p[B]) || p[B] - p[N] || B - N);
    let ee = C.length, ie = [], G = C.map((B, N) => N), z = (B) => {
      for (; G[B] !== B; ) B = G[B] = G[G[B]];
      return B;
    }, _ = ee <= Wu, T = _ ? R(C) : [], E = _ ? C.map(() => []) : [];
    for (let B = 0; B < T.length; B += 2) {
      let N = T[B], j = T[B + 1];
      v(C[N], C[j]) && (E[N].push(j), E[j].push(N));
    }
    let M = C.map((B, N) => N);
    if (_) {
      let B = new Int32Array(ee), N = [];
      for (let F = 0; F < ee; F++) ie.push([]), N.push([]);
      for (let F = 0; F < T.length; F += 2) {
        let Y = T[F], W = T[F + 1], K = C[Y], H = C[W];
        if (!$(K, H)) continue;
        G[z(Y)] = z(W);
        let te = S(K, H), Q = S(H, K);
        if (te === Q) continue;
        let L = te < Q ? Y : W, X = te < Q ? W : Y;
        ie[X].push(L), N[L].push(X), B[X]++;
      }
      let j = new Uint8Array(ee);
      M = [];
      for (let F = 0; F < ee; F++) {
        let Y = -1;
        for (let W = 0; W < ee && !(!j[W] && ((Y < 0 || B[W] < B[Y]) && (Y = W), B[W] === 0)); W++) ;
        j[Y] = 1, M.push(Y);
        for (let W of N[Y]) B[W]--;
      }
    }
    let A = /* @__PURE__ */ new Set(), m = [], I = 0;
    for (let B of M) {
      let N = C[B], j = 0;
      for (let F of ie[B] ?? []) o[C[F]] >= j && (j = o[C[F]] + 1);
      if (_) {
        A.clear();
        for (let F of E[B]) A.add(o[C[F]]);
        for (; A.has(j); ) j++;
      } else {
        for (; m[j]?.some((F) => v(N, F)); ) j++;
        (m[j] ??= []).push(N);
      }
      o[N] = j, j >= I && (I = j + 1);
    }
    let k = new Int32Array(ee).fill(I), w = new Int32Array(ee).fill(-1);
    for (let B = 0; B < ee; B++) {
      let N = z(B);
      k[N] = Math.min(k[N], o[C[B]]), w[N] = Math.max(w[N], o[C[B]]);
    }
    for (let B = 0; B < ee; B++) {
      let N = z(B);
      h[C[B]] = w[N] - k[N] + 1, r && (o[C[B]] -= k[N]);
    }
    return I;
  }, O = (C, ee, ie) => {
    let G = Eo(n[C] - l[C], ee);
    for (let z = 0; z <= Wl; z++) {
      let _ = z / Wl, T = 1 - _;
      ie[2 * z] = l[C] + (n[C] - l[C]) * _ * _ * (3 - 2 * _), ie[2 * z + 1] = ee * (3 * G * _ * T * T + 3 * (1 - G) * _ * _ * T + _ * _ * _);
    }
  }, U = (C, ee, ie) => {
    let G = ie * ie * 1.000000001;
    for (let z = 0; z <= Wl; z++) {
      let _ = C[2 * z], T = C[2 * z + 1];
      for (let E = 0; E < Wl; E++) {
        let M = ee[2 * E + 2] - ee[2 * E], A = ee[2 * E + 3] - ee[2 * E + 1], m = Math.max(0, Math.min(1, ((_ - ee[2 * E]) * M + (T - ee[2 * E + 1]) * A) / (M * M + A * A || 1))), I = _ - ee[2 * E] - m * M, k = T - ee[2 * E + 1] - m * A;
        if (I * I + k * k < G && Math.hypot(I, k) < ie) return !0;
      }
    }
    return !1;
  }, q = (C, ee, ie, G) => {
    let z = Math.max(ie / 2, ie - 2 * y$);
    return O(C, z, Ph), O(ee, z, Wh), U(Ph, Wh, G) || U(Wh, Ph, G);
  };
  for (let [C, ee] of d) {
    if (!r) {
      t[C] = D(ee);
      continue;
    }
    if (ee.length > Wu) continue;
    let ie = ee.filter((m) => c[m] === 1);
    D(ie);
    let G = new Set(ie.filter((m) => h[m] > 1)), z = R(ee);
    for (let m = 0; m < z.length; m += 2) {
      let I = ee[z[m]], k = ee[z[m + 1]];
      G.has(I) && G.has(k) || !v(I, k) || l[I] < n[I] != l[k] < n[k] || q(I, k, a[C], c[I] === 1 || c[k] === 1 ? x$ : w$) && G.add(I).add(k);
    }
    for (let m of ie) o[m] = -1, h[m] = 0;
    if (G.size === 0) continue;
    let _ = 0, T = 0, E = /* @__PURE__ */ new Set();
    for (let m = 0; m < z.length; m += 2) {
      let I = ee[z[m]], k = ee[z[m + 1]];
      if (G.has(I) && G.has(k)) {
        if (!x(I, k)) continue;
        l[I] < n[I] != l[k] < n[k] ? _++ : b(I, k) || T++;
      } else (G.has(I) || G.has(k)) && $(I, k) && E.add(I).add(k);
    }
    if (_ > T) {
      for (let m of ee) (g[m] - p[m]) * zu > s[C] && (s[C] = (g[m] - p[m]) * zu);
      continue;
    }
    let M = ee.filter((m) => G.has(m) || c[m] !== 1 && E.has(m));
    D(M);
    let A = 0;
    for (let m of M) h[m] > A && (A = h[m]);
    t[C] = A;
  }
}
function I$(e, t, r, a, s, l, n) {
  let { maxRank: i, EF: o, ET: h, EFD: c, ETD: u, succStart: d, succE: p, predStart: g, predE: y, layerStart: b, order: x } = e, v = new Float64Array(t.length), $ = new Float64Array(t.length), S = new Float64Array(t.length);
  for (let D = 0; D < a.length; D++) {
    let O = a[D];
    if (O < 0) continue;
    let U = O + s[D] - 1, q = e.RANK[O];
    for (let C = O; C < U; C++) {
      if (!r[q + C - O]) continue;
      let ee = C;
      for (; ee + 1 < U && r[q + ee + 1 - O]; ) ee++;
      let ie = y[g[C]], G = p[d[ee]], z = t[o[ie]] + c[ie], _ = t[h[G]] + u[G], T = ee - C + 2;
      for (let E = C; E <= ee; E++) v[E] = z + (_ - z) * (E - C + 1) / T, $[E] = z, S[E] = _;
      C = ee;
    }
  }
  let R = [];
  for (let D = 1; D < i; D++) {
    if (!r[D]) continue;
    let O = b[D], U = b[D + 1], q = Array.from(x.subarray(O, U)).sort((C, ee) => $[C] - $[ee] || S[C] - S[ee] || C - ee);
    for (let C = 0; C < q.length; ) {
      R.length = 0;
      let ee = C;
      for (; ee < q.length && Math.abs($[q[ee]] - $[q[C]]) < Qd && Math.abs(S[q[ee]] - S[q[C]]) < Qd; ee++) R.push(q[ee]);
      R.sort((ie, G) => e.pos[ie] - e.pos[G]);
      for (let ie = 0; ie < R.length; ie++) {
        let G = R[ie];
        t[G] = v[G] + (ie - (R.length - 1) / 2) * l, (R.length === 1 || l === 0) && (n[G] = 1);
      }
      C = ee;
    }
  }
}
function N$(e, t, r, a, s, l) {
  let { maxRank: n, W: i, KIND: o, RANK: h, EF: c, ET: u, EFD: d, ETD: p, succStart: g, succE: y, predStart: b, predE: x, layerStart: v, order: $ } = e, S = new Uint8Array(n + 1), R = !1;
  for (let D = 1; D < n; D++) {
    let O = !1, U = !1;
    for (let q = v[D]; q < v[D + 1]; q++) {
      let C = o[$[q]];
      C === 2 ? O = !0 : C !== 1 && (U = !0);
    }
    O && !U && (S[D] = 1, R = !0);
  }
  if (R) for (let D = 0; D < r.length; D++) {
    let O = r[D];
    if (!(O < 0)) for (let U = O, q = O + a[D] - 1; U < q; U++) {
      if (o[U] !== 1 || !S[h[U]]) continue;
      let C = U, ee = U;
      for (; C > O && l[C - 1]; ) C--;
      for (; ee + 1 < q && l[ee + 1]; ) ee++;
      let ie = x[b[C]], G = y[g[ee]], z = t[c[ie]] + d[ie], _ = t[u[G]] + p[G], T = Math.min(z, _) - s, E = Math.max(z, _) + s, M = !0, A = h[U];
      for (let I = v[A]; M && I < v[A + 1]; I++) {
        let k = $[I];
        o[k] === 2 && t[k] + i[k] / 2 > T && t[k] - i[k] / 2 < E && (M = !1);
      }
      if (!M) continue;
      l[U] = 1;
      let m = ee - C + 2;
      for (let I = C; I <= ee; I++) t[I] = z + (_ - z) * (I - C + 1) / m;
    }
  }
}
function R$(e, t) {
  let { n: r, real: a, maxRank: s, W: l, EF: n, ET: i, EFD: o, ETD: h, succStart: c, succE: u, predStart: d, predE: p, layerStart: g, order: y, pos: b, offsets: x, fixed: v, GRP: $, groupParent: S } = e, R = 0;
  for (let Z = 0; Z <= s; Z++) R = Math.max(R, g[Z + 1] - g[Z]);
  if (R < 2) return [0, 0];
  let D = x ? new Int32Array(n.length) : void 0, O = new Int32Array(D ? n.length : 0), U = new Int32Array(D ? r : 0), q = D ? u.slice() : u, C = new Uint8Array(D ? r : 0);
  if (D) {
    let Z = p.slice(), ae = (oe, ue, he, re) => {
      for (let P = ue + 1; P < he; P++) if (re[oe[P]] !== re[oe[ue]]) return oe.subarray(ue, he).sort((ne, ce) => re[ne] - re[ce]), !0;
      return !1;
    };
    for (let oe = 0; oe < r; oe++) {
      if (U[oe] = 1, ae(Z, d[oe], d[oe + 1], h)) for (let ue = d[oe] + 1; ue < d[oe + 1]; ue++) h[Z[ue]] !== h[Z[ue - 1]] && U[oe]++, O[Z[ue]] = U[oe] - 1;
      ae(q, c[oe], c[oe + 1], o) && (C[oe] = 1);
    }
  }
  let ee = 1;
  for (; ee < (D ? R + n.length : R); ) ee <<= 1;
  let ie = new Int32Array(2 * ee), G = new Int32Array(n.length), z = () => {
    let Z = 0;
    for (let ae = 0; ae < s; ae++) {
      let oe = g[ae + 2] - g[ae + 1];
      if (D) {
        let re = 0;
        for (let P = g[ae + 1]; P < g[ae + 2]; P++) {
          let ne = y[P];
          for (let ce = d[ne]; ce < d[ne + 1]; ce++) D[p[ce]] = re + O[p[ce]];
          re += U[ne];
        }
        oe = re;
      }
      if (oe < 2) continue;
      let ue = 0;
      for (let re = g[ae]; re < g[ae + 1]; re++) {
        let P = y[re], ne = c[P], ce = c[P + 1], pe = ue;
        for (let xe = ne; xe < ce; xe++) G[ue++] = D ? D[q[xe]] : b[i[u[xe]]];
        let Me = ue - pe;
        if (!(Me < 2)) if (D && C[P]) for (let xe = pe + 1; xe < ue; xe++) {
          let ve = G[xe], Ae = o[q[ne + xe - pe]], Ee = xe - 1;
          for (; Ee >= pe && o[q[ne + Ee - pe]] === Ae && G[Ee] > ve; ) G[Ee + 1] = G[Ee], Ee--;
          G[Ee + 1] = ve;
        }
        else if (Me <= 12) for (let xe = pe + 1; xe < ue; xe++) {
          let ve = G[xe], Ae = xe - 1;
          for (; Ae >= pe && G[Ae] > ve; ) G[Ae + 1] = G[Ae], Ae--;
          G[Ae + 1] = ve;
        }
        else G.subarray(pe, ue).sort();
      }
      if (ue < 2) continue;
      let he = 1;
      for (; he < oe; ) he <<= 1;
      ie.fill(0, 0, 2 * he);
      for (let re = 0; re < ue; re++) {
        let P = G[re] + he;
        for (ie[P]++; P > 1; ) (P & 1) === 0 && (Z += ie[P + 1]), P >>= 1, ie[P]++;
      }
    }
    return Z;
  }, _ = z(), T = new Float64Array(r), E = new Int32Array(R), M = new Int32Array(R), A = S ? S.length : 0, m = new Int32Array(A);
  for (let Z = 0; Z < A; Z++) for (let ae = Z; ae >= 0; ae = S[ae]) m[Z]++;
  let I = new Float64Array(A), k = new Int32Array(A), w = new Int32Array(A), B = (Z, ae) => {
    let oe = g[Z], ue = g[Z + 1];
    for (let ce = oe; ce < ue; ce++) for (let pe = $[y[ce]]; pe >= 0; pe = S[pe]) I[pe] = 0, k[pe] = 0;
    for (let ce = oe; ce < ue; ce++) {
      let pe = y[ce];
      for (let Me = $[pe]; Me >= 0; Me = S[Me]) k[Me] === 0 && (w[Me] = ce), I[Me] += ae[pe], k[Me]++;
    }
    let he = (ce) => ce >= r ? I[ce - r] / k[ce - r] : ae[ce], re = (ce) => ce >= r ? w[ce - r] : oe + b[ce], P = (ce, pe) => {
      let Me = ce, xe = pe, ve = $[ce], Ae = $[pe], Ee = ve < 0 ? 0 : m[ve], me = Ae < 0 ? 0 : m[Ae];
      for (; Ee > me; Ee--) Me = r + ve, ve = S[ve];
      for (; me > Ee; me--) xe = r + Ae, Ae = S[Ae];
      for (; ve !== Ae; ) Me = r + ve, ve = S[ve], xe = r + Ae, Ae = S[Ae];
      return he(Me) - he(xe) || re(Me) - re(xe);
    }, ne = Array.from(y.subarray(oe, ue)).sort(P);
    y.set(ne, oe);
    for (let ce = oe; ce < ue; ce++) b[y[ce]] = ce - oe;
  };
  if ($) {
    let Z = new Float64Array(r);
    for (let ae = 0; ae <= s; ae++) {
      for (let oe = g[ae]; oe < g[ae + 1]; oe++) Z[y[oe]] = oe - g[ae];
      B(ae, Z);
    }
  }
  let N = $ ? z() : _;
  if (N === 0) return [0, _];
  let j = y.slice(), F = Math.min(N, _), Y = (Z, ae) => {
    let oe = Z ? d : c, ue = Z ? p : u, he = Z ? n : i, re = Z ? o : h;
    for (let P = 1; P <= s; P++) {
      let ne = Z ? P : s - P;
      if (v[ne]) continue;
      let ce = g[ne], pe = g[ne + 1], Me = 0;
      for (let ve = ce; ve < pe; ve++) {
        let Ae = y[ve], Ee = Ae < a ? t[Ae].pin : 0;
        if (Ee !== 0) {
          T[Ae] = Ee * 1e9, E[Me++] = Ae;
          continue;
        }
        let me = oe[Ae], we = oe[Ae + 1];
        if (me === we) {
          if ($) {
            let se = Z ? g[ne] - g[ne - 1] : g[ne + 2] - g[ne + 1];
            T[Ae] = (ve - ce) * se / (pe - ce);
            continue;
          }
          T[Ae] = -1;
          continue;
        }
        let Se = 0;
        for (let se = me; se < we; se++) {
          let ye = he[ue[se]];
          Se += b[ye], x && l[ye] > 0 && (Se += re[ue[se]] / l[ye]);
        }
        T[Ae] = Se / (we - me), E[Me++] = Ae;
      }
      if ($) {
        B(ne, T);
        continue;
      }
      if (Me < 2) continue;
      M$(E, Me, T, b, ae, M);
      let xe = 0;
      for (let ve = ce; ve < pe; ve++) T[y[ve]] !== -1 && (y[ve] = E[xe++]);
      for (let ve = ce; ve < pe; ve++) b[y[ve]] = ve - ce;
    }
  }, W = () => {
    let Z = 0;
    for (let ae = 0; ae <= s; ae++) for (let oe = g[ae]; oe < g[ae + 1]; oe++) if (!(y[oe] >= a)) for (let ue = oe + 1; ue < g[ae + 1]; ue++) y[ue] < y[oe] && Z++;
    return Z;
  }, K = () => {
    for (let Z = 0; Z <= s; Z++) for (let ae = g[Z]; ae < g[Z + 1]; ae++) b[y[ae]] = ae - g[Z];
  }, H = (Z) => Z < a ? t[Z].pin : 0, te = (Z, ae) => {
    let oe = ae ? n[Z] : i[Z];
    return x && l[oe] > 0 ? b[oe] + (ae ? o[Z] : h[Z]) / l[oe] : b[oe];
  }, Q = (Z, ae) => {
    let oe = 0;
    for (let ue = d[Z]; ue < d[Z + 1]; ue++) {
      let he = te(p[ue], !0);
      for (let re = d[ae]; re < d[ae + 1]; re++) he > te(p[re], !0) && oe++;
    }
    for (let ue = c[Z]; ue < c[Z + 1]; ue++) {
      let he = te(u[ue], !1);
      for (let re = c[ae]; re < c[ae + 1]; re++) he > te(u[re], !1) && oe++;
    }
    return oe;
  }, L = () => {
    for (let Z = 0; Z < 8; Z++) {
      let ae = !1;
      for (let oe = 0; oe <= s; oe++) {
        if (v[oe]) continue;
        let ue = g[oe];
        for (let he = ue; he + 1 < g[oe + 1]; he++) {
          let re = y[he], P = y[he + 1];
          H(re) !== H(P) || $ && $[re] !== $[P] || Q(P, re) >= Q(re, P) || (y[he] = P, y[he + 1] = re, b[P] = he - ue, b[re] = he + 1 - ue, ae = !0);
        }
      }
      if (!ae) break;
    }
  }, X = y.slice(), le = r <= 600, J = j, V = 1 / 0;
  for (let Z = 0; Z < (le ? 2 : 1); Z++) {
    Z > 0 && (y.set(X), K());
    let ae = F, oe = X.slice();
    for (let he = 0, re = 0; re < 4 && he < c$; he++, re++) {
      Y((he + Z) % 2 === 0, he % 4 >= 2);
      let P = z();
      if (P < ae && (ae = P, oe.set(y), re = 0, P === 0)) break;
    }
    if (y.set(oe), le && ae > 0) {
      K(), L();
      let he = z();
      he < ae && (ae = he, oe.set(y));
    }
    let ue = le ? W() : 0;
    (Z === 0 || ae < N || ae === N && ue < V) && (N = ae, J = oe, V = ue);
  }
  if (y.set(J), K(), j.set(J), $ && (N = z()), !le) return [N, _];
  for (let Z = 0; Z < a; Z++) if (t[Z].pin !== 0) return [N, _];
  if (V === 0 || v[0] || v[s]) return [N, _];
  for (let Z = 0; Z <= s; Z++) y.subarray(g[Z], g[Z + 1]).reverse();
  return K(), (z() > N || W() >= V) && y.set(j), [N, _];
}
function H2(e, t, r) {
  return e.W[r] / 2 + (e.KIND[r] === 0 ? t.nodeSep : t.edgeSep) / 2;
}
function Gu(e, t) {
  let { n: r, maxRank: a, W: s, KIND: l, EF: n, ET: i, EFD: o, ETD: h, succStart: c, succE: u, predStart: d, predE: p, layerStart: g, order: y, pos: b } = e, x = n.length, v = new Float64Array(r);
  for (let w = 0; w < r; w++) v[w] = H2(e, t, w);
  let $ = new Int32Array(x);
  for (let w = 0; w < x; w++) $[w] = b[i[w]];
  for (let w = 0; w < r; w++) c[w + 1] - c[w] > 1 && Bu(u, c[w], c[w + 1], $);
  for (let w = 0; w < x; w++) $[w] = b[n[w]];
  for (let w = 0; w < r; w++) d[w + 1] - d[w] > 1 && Bu(p, d[w], d[w + 1], $);
  let S = new Uint8Array(x);
  for (let w = 1; w <= a; w++) {
    let B = g[w] - g[w - 1], N = g[w], j = g[w + 1], F = 0, Y = N;
    for (let W = N; W < j; W++) {
      let K = y[W], H = -1;
      if (Bl(l[K])) {
        let Q = n[p[d[K]]];
        Bl(l[Q]) && (H = Q);
      }
      let te = H >= 0 ? b[H] : B;
      if (H >= 0 || W === j - 1) {
        for (let Q = Y; Q <= W; Q++) {
          let L = y[Q], X = Bl(l[L]);
          for (let le = d[L]; le < d[L + 1]; le++) {
            let J = p[le], V = b[n[J]];
            (V < F || te < V) && !(X && Bl(l[n[J]])) && (S[J] = 1);
          }
        }
        Y = W + 1, F = te;
      }
    }
  }
  let R = [], D = new Int32Array(r), O = new Int32Array(r), U = new Float64Array(r), q = new Int32Array(r), C = new Int32Array(r), ee = new Float64Array(r), ie = new Int32Array(r), G = new Int32Array(r + 1), z = new Int32Array(r), _ = new Int32Array(r), T = new Int32Array(r), E = new Float64Array(r);
  for (let w = 0; w < 4; w++) {
    let B = w < 2, N = (w & 1) === 1, j = B ? d : c, F = B ? p : u, Y = B ? n : i, W = B ? h : o, K = B ? o : h;
    for (let L = 0; L < r; L++) D[L] = L, O[L] = L, U[L] = 0, ie[L] = 0, G[L + 1] = 0, E[L] = 0;
    for (let L = 0; L <= a; L++) {
      let X = B ? L : a - L, le = g[X], J = g[X + 1], V = B ? X - 1 : X + 1, Z = V >= 0 && V <= a ? g[V + 1] - g[V] - 1 : 0, ae = -1;
      for (let oe = N ? J - 1 : le; N ? oe >= le : oe < J; N ? oe-- : oe++) {
        let ue = y[oe], he = j[ue], re = j[ue + 1] - he;
        if (re === 0) continue;
        let P = he + (re - 1 >> 1), ne = he + (re >> 1);
        for (let ce = 0; ce < 2 && !(ce === 1 && P === ne); ce++) {
          let pe = F[ce === 0 !== N ? P : ne], Me = Y[pe], xe = N ? Z - b[Me] : b[Me];
          O[ue] === ue && ae < xe && S[pe] === 0 && (O[Me] = ue, O[ue] = D[ue] = D[Me], U[ue] = U[Me] + K[pe] - W[pe], ae = xe);
        }
      }
    }
    let H = 0;
    for (let L = 0; L <= a; L++) {
      let X = g[L], le = g[L + 1];
      for (let J = X + 1; J < le; J++) {
        let V = N ? y[J] : y[J - 1], Z = N ? y[J - 1] : y[J], ae = v[V] + v[Z];
        q[H] = D[V], C[H] = D[Z], ee[H] = N ? ae - U[V] + U[Z] : ae + U[V] - U[Z], ie[D[Z]]++, G[D[V] + 1]++, H++;
      }
    }
    for (let L = 0; L < r; L++) G[L + 1] += G[L];
    for (let L = 0; L < r; L++) _[L] = G[L];
    for (let L = 0; L < H; L++) z[_[q[L]]++] = L;
    let te = 0;
    for (let L = 0; L < r; L++) D[L] === L && ie[L] === 0 && (T[te++] = L);
    for (let L = 0; L < te; L++) {
      let X = T[L];
      for (let le = G[X]; le < G[X + 1]; le++) {
        let J = z[le], V = C[J];
        E[X] + ee[J] > E[V] && (E[V] = E[X] + ee[J]), --ie[V] === 0 && (T[te++] = V);
      }
    }
    for (let L = te - 1; L >= 0; L--) {
      let X = T[L], le = 1 / 0;
      for (let J = G[X]; J < G[X + 1]; J++) {
        let V = z[J], Z = E[C[V]] - ee[V];
        Z < le && (le = Z);
      }
      le !== 1 / 0 && le > E[X] && (E[X] = le);
    }
    let Q = new Float64Array(r);
    for (let L = 0; L < r; L++) Q[L] = (N ? -E[D[L]] : E[D[L]]) + U[L];
    R.push(Q);
  }
  let M = 0, A = 1 / 0, m = [], I = [];
  for (let w = 0; w < 4; w++) {
    let B = 1 / 0, N = -1 / 0, j = R[w];
    for (let F = 0; F < r; F++) {
      let Y = s[F] / 2;
      j[F] - Y < B && (B = j[F] - Y), j[F] + Y > N && (N = j[F] + Y);
    }
    m.push(B), I.push(N), N - B < A && (A = N - B, M = w);
  }
  for (let w = 0; w < 4; w++) {
    let B = (w & 1) === 0 ? m[M] - m[w] : I[M] - I[w];
    if (B !== 0) {
      let N = R[w];
      for (let j = 0; j < r; j++) N[j] += B;
    }
  }
  let k = new Float64Array(r);
  for (let w = 0; w < r; w++) {
    let B = R[0][w], N = R[1][w], j = R[2][w], F = R[3][w], Y;
    B > N && (Y = B, B = N, N = Y), j > F && (Y = j, j = F, F = Y), B > j && (Y = B, B = j, j = Y), N > F && (Y = N, N = F, F = Y), N > j && (Y = N, N = j, j = Y), k[w] = (N + j) / 2;
  }
  return k;
}
function zr(e) {
  return e === "BT" || e === "LR" || e === "RL" ? e : "TB";
}
var D$ = 4e4, L$ = 400, O$ = 500, F$ = 1.5, z$ = 4;
function Hu(e, t, r, a) {
  let s = [];
  for (let i of e) s.push(i.x, i.y, i.w, i.h);
  let l = [];
  for (let i of t) l.push(i.labelX, i.labelY);
  let n = [];
  for (let i of r) {
    n.push(i.x, i.y);
    for (let o of i.ports) n.push(o.px, o.py);
  }
  return { nodes: s, routes: t.map((i) => i.route), labels: l, levels: n, total: a };
}
function Uu(e, t, r, a) {
  t.forEach((l, n) => {
    l.x = e.nodes[4 * n], l.y = e.nodes[4 * n + 1], l.w = e.nodes[4 * n + 2], l.h = e.nodes[4 * n + 3];
  }), r.forEach((l, n) => {
    l.route = e.routes[n], l.labelX = e.labels[2 * n], l.labelY = e.labels[2 * n + 1];
  });
  let s = 0;
  for (let l of a) {
    l.x = e.levels[s++], l.y = e.levels[s++];
    for (let n of l.ports) n.px = e.levels[s++], n.py = e.levels[s++];
  }
  return e.total;
}
var Yu = 24, Ol = 0.5, Jd = 3, ef = 2, P$ = Math.max(3, Jd, ef + 1), Ys = 0.62, W$ = 128;
function B$(e) {
  return e.tracks ? 1 : e.straight ? 2 : 0;
}
function js(e, t, r = 0) {
  let a = 0;
  for (let _ of t) _.src !== _.dst && _.route.length > 3 && (a += (_.route.length / 3 - 1) * P$);
  let s = new Float64Array(a), l = new Float64Array(a), n = new Float64Array(a), i = new Float64Array(a), o = new Float64Array(a), h = new Float64Array(a), c = new Int32Array(a), u = new Uint8Array(a), d = 0, p = 1 / 0, g = -1 / 0, y = NaN, b = NaN, x = NaN, v = NaN, $ = (_, T, E, M, A, m) => {
    let I = d - 1;
    E === x && M === v && (m === M && b === M || A === E && y === E) && c[I] === _ && u[I] === T && (E - y) * (A - E) + (M - b) * (m - M) > 0 && (d--, E = y, M = b), y = E, b = M, x = A, v = m, u[d] = T, s[d] = Math.min(E, A), n[d] = Math.max(E, A), l[d] = E <= A ? M : m, i[d] = E <= A ? m : M, o[d] = Math.min(M, m), h[d] = Math.max(M, m), o[d] < p && (p = o[d]), h[d] > g && (g = h[d]), c[d++] = _;
  };
  for (let _ = 0; _ < t.length; _++) {
    let T = t[_];
    if (T.src === T.dst) continue;
    let E = T.route, M = (w) => Math.abs(E[w] - E[w - 3]) < 0.01 || Math.abs(E[w + 1] - E[w - 2]) < 0.01, A = (w) => Math.abs(E[w] - E[w - 3]) + Math.abs(E[w + 1] - E[w - 2]), m = (w) => r === 0 && w > 0 && w < E.length - 3 && M(w) && M(w + 3) && A(w) >= 0.01 && A(w + 3) >= 0.01 && Math.abs(E[w] - E[w - 3]) < 0.01 != Math.abs(E[w + 3] - E[w]) < 0.01, I = E[0], k = E[1];
    for (let w = 3; w < E.length; w += 3) {
      let B = (w === 3 ? 1 : 0) | (w === E.length - 3 ? 2 : 0), N = I, j = k, F = E[w], Y = E[w + 1];
      if (I = F, k = Y, M(w) || r === 2) {
        if (!m(w)) {
          $(_, B, N, j, F, Y);
          continue;
        }
        let Q = m(w - 3) ? A(w) / 2 : A(w), L = m(w + 3) ? A(w + 3) / 2 : A(w + 3), X = (F - E[w - 3]) / A(w), le = (Y - E[w - 2]) / A(w), J = (E[w + 3] - F) / A(w + 3), V = (E[w + 4] - Y) / A(w + 3), Z = F - X * Q, ae = Y - le * Q;
        $(_, B, N, j, Z, ae);
        let oe = F - X * Q * (1 - Ys), ue = Y - le * Q * (1 - Ys), he = F + J * L * (1 - Ys), re = Y + V * L * (1 - Ys);
        I = F + J * L, k = Y + V * L;
        let P = B | (w + 3 === E.length - 3 ? 2 : 0), ne = Z, ce = ae;
        for (let pe = 1; pe <= ef; pe++) {
          let Me = pe / ef, xe = 1 - Me, ve = xe * xe * xe * Z + 3 * xe * xe * Me * oe + 3 * xe * Me * Me * he + Me * Me * Me * I, Ae = xe * xe * xe * ae + 3 * xe * xe * Me * ue + 3 * xe * Me * Me * re + Me * Me * Me * k;
          $(_, P, ne, ce, ve, Ae), ne = ve, ce = Ae;
        }
        continue;
      }
      if (r === 1) {
        let Q = E[w + 2] === 0, L = Q ? N : (N + F) / 2, X = Q ? (j + Y) / 2 : j;
        $(_, B, N, j, L, X), $(_, B, L, X, Q ? F : L, Q ? X : Y), $(_, B, Q ? F : L, Q ? X : Y, F, Y);
        continue;
      }
      let W = E[w + 2] === 0, K = W ? Eo(F - N, Y - j) : Eo(Y - j, F - N), H = N, te = j;
      for (let Q = 1; Q <= Jd; Q++) {
        let L = Q / Jd, X = 1 - L, le = L * L * (3 - 2 * L), J = 3 * K * L * X * X + 3 * (1 - K) * L * L * X + L * L * L, V = N + (F - N) * (W ? le : J), Z = j + (Y - j) * (W ? J : le);
        $(_, B, H, te, V, Z), H = V, te = Z;
      }
    }
  }
  let S = g > p ? Math.round(Math.sqrt(d)) : 1, R = g > p ? S / (g - p) : 0, D = (_) => Math.min(S - 1, Math.floor((_ - p) * R)), O = new Int32Array(d), U = new Int32Array(S + 1);
  for (let _ = 0; _ < d; _++) {
    O[_] = D(o[_]);
    for (let T = O[_], E = D(h[_]); T <= E; T++) U[T + 1]++;
  }
  for (let _ = 0; _ < S; _++) U[_ + 1] += U[_];
  let q = U.slice(0, S), C = new Int32Array(U[S]);
  for (let _ = 0; _ < d; _++) for (let T = O[_], E = D(h[_]); T <= E; T++) C[q[T]++] = _;
  let ee = new Float64Array(t.length * 8), ie = (_, T, E, M) => Math.abs(_[T] - _[E]) < Ol && Math.abs(_[T] - _[M]) < Ol || Math.abs(_[T + 1] - _[E + 1]) < Ol && Math.abs(_[T + 1] - _[M + 1]) < Ol;
  for (let _ = 0; _ < t.length; _++) {
    let T = t[_].route;
    if (T.length < 6) continue;
    let E = 3;
    for (; E + 3 < T.length && ie(T, 0, E, E + 3); ) E += 3;
    let M = T.length - 3, A = M - 3;
    for (; A >= 3 && ie(T, M, A, A - 3); ) A -= 3;
    ee.set([T[0], T[1], T[E], T[E + 1], T[A], T[A + 1], T[M], T[M + 1]], _ * 8);
  }
  let G = (_, T, E, M) => {
    let A = _ * 8 + (T === 1 ? 0 : 4), m = ee[A], I = ee[A + 1], k = ee[A + 2] - m, w = ee[A + 3] - I, B = k * k + w * w, N = B > 0 ? Math.max(0, Math.min(1, ((E - m) * k + (M - I) * w) / B)) : 0;
    return Math.hypot(E - m - N * k, M - I - N * w) < Ol;
  }, z = 0;
  for (let _ = 0; _ < S; _++) {
    let T = U[_ + 1];
    if (T - U[_] > W$) C.subarray(U[_], T).sort((E, M) => s[E] - s[M] || E - M);
    else for (let E = U[_] + 1; E < T; E++) {
      let M = C[E], A = E;
      for (; A > U[_] && s[C[A - 1]] > s[M]; A--) C[A] = C[A - 1];
      C[A] = M;
    }
    for (let E = U[_]; E < T; E++) {
      let M = C[E], A = n[M] - s[M], m = i[M] - l[M], I = O[M] === _;
      for (let k = E + 1; k < T; k++) {
        let w = C[k];
        if (s[w] > n[M]) break;
        if (h[w] < o[M] || o[w] > h[M] || c[M] === c[w] || !I && O[w] !== _) continue;
        let B = A * (l[w] - l[M]) - m * (s[w] - s[M]), N = A * (i[w] - l[M]) - m * (n[w] - s[M]);
        if (B > 0 == N > 0) continue;
        let j = n[w] - s[w], F = i[w] - l[w], Y = j * (l[M] - l[w]) - F * (s[M] - s[w]), W = j * (i[M] - l[w]) - F * (n[M] - s[w]);
        if (Y > 0 == W > 0) continue;
        let K = t[c[M]], H = t[c[w]], te = Y / (Y - W), Q = s[M] + te * A, L = l[M] + te * m, X = (le, J, V) => (u[M] & J) !== 0 && (u[w] & V) !== 0 || Math.abs(Q - e[le].x) < e[le].w / 2 + Yu && Math.abs(L - e[le].y) < e[le].h / 2 + Yu || G(c[M], J, Q, L) && G(c[w], V, Q, L);
        K.src === H.src && X(K.src, 1, 1) || K.src === H.dst && X(K.src, 1, 2) || K.dst === H.src && X(K.dst, 2, 1) || K.dst === H.dst && X(K.dst, 2, 2) || z++;
      }
    }
  }
  return z;
}
function U2(e, t) {
  let r = (a) => {
    let s = /* @__PURE__ */ new Set();
    for (let l = e[a].parent; l >= 0 && !s.has(l); l = e[l].parent) s.add(l);
    return s;
  };
  for (let [a, s] of t) {
    if (a < 0 || s < 0 || a === s) continue;
    let l = r(a), n = r(s);
    for (let i of l) n.has(i) || (e[i].dir = void 0);
    for (let i of n) l.has(i) || (e[i].dir = void 0);
  }
}
function _s(e, t, r, a) {
  for (let s of e) s.x += r, s.y += a;
  for (let s of t) {
    for (let l = 0; l < s.route.length; l += 3) s.route[l] += r, s.route[l + 1] += a;
    s.labelX += r, s.labelY += a;
  }
}
function Wt(e, t, r = -1) {
  return { w: e, h: t, parent: r, isGroup: !1, dir: void 0, padX: 0, padTop: 0, padBottom: 0, minW: 0, seq: 0, span: 0, x: 0, y: 0 };
}
function qs(e) {
  return e === "TB" ? 0 : e === "BT" ? 2 : e === "LR" ? 3 : 1;
}
function xi(e) {
  return e + 2 & 3;
}
function cl(e, t, r, a) {
  let s = e.length, l = /* @__PURE__ */ new Map(), n = [], i = (T, E) => {
    let M = { id: T, dir: E, items: [], edges: [], ports: [], portOf: /* @__PURE__ */ new Map(), routes: /* @__PURE__ */ new Map(), x: 0, y: 0 };
    return l.set(T, M), M;
  }, o = i(-1, r), h = [];
  for (let T = 0; T < s; T++) h.push([]);
  let c = [];
  for (let T = 0; T < s; T++) {
    let E = e[T].parent;
    E >= 0 && E < s && E !== T && e[E].isGroup ? h[E].push(T) : (e[T].parent = -1, c.push(T));
  }
  o.items = c, n.push(o);
  let u = new Int32Array(s), d = new Uint8Array(s), p = (T) => {
    for (let E = T; E < n.length; E++) {
      let M = n[E];
      for (let A of M.items) if (d[A] = 1, u[A] = M.id < 0 ? 0 : u[M.id] + 1, e[A].isGroup) {
        let m = i(A, e[A].dir ?? M.dir);
        m.items = h[A], n.push(m);
      }
    }
  };
  p(0);
  for (let T = 0; T < s; T++) {
    if (d[T]) continue;
    let E = e[T].parent;
    if (h[E] = h[E].filter((M) => M !== T), e[T].parent = -1, o.items.push(T), d[T] = 1, u[T] = 0, e[T].isGroup) {
      let M = n.length, A = i(T, e[T].dir ?? r);
      A.items = h[T], n.push(A), p(M);
    }
  }
  for (let T = n.length - 1; T > 0; T--) {
    let E = n[T], M = 1 / 0;
    for (let A of E.items) e[A].seq < M && (M = e[A].seq);
    M !== 1 / 0 && (e[E.id].seq = M);
  }
  for (let T of n) T.items.sort((E, M) => e[E].seq - e[M].seq || E - M);
  let g = 0;
  for (let T of t) {
    let E = T.src, M = T.dst, A = 0;
    for (; u[E] > u[M]; A++) E = e[E].parent;
    for (; u[M] > u[E]; A++) M = e[M].parent;
    for (; E !== M && e[E].parent !== e[M].parent; A += 2) E = e[E].parent, M = e[M].parent;
    E !== M && (g + A > D$ ? (T.src = E, T.dst = M) : g += A);
  }
  let y = [], b = [];
  for (let T = 0; T < t.length; T++) {
    let E = t[T];
    if (E.route = [], E.src === E.dst) {
      y.push(T);
      continue;
    }
    let M = E.src, A = E.dst, m = [], I = [];
    for (; u[M] > u[A]; ) m.push(M), M = e[M].parent;
    for (; u[A] > u[M]; ) I.push(A), A = e[A].parent;
    if (M === A) {
      b.push(T);
      continue;
    }
    for (; e[M].parent !== e[A].parent; ) m.push(M), I.push(A), M = e[M].parent, A = e[A].parent;
    l.get(e[M].parent).edges.push({ e: T, a: M, b: A });
    for (let [k, w] of [[m, !0], [I, !1]]) for (let B of k) {
      let N = l.get(e[B].parent), j = { e: T, inner: B, out: w, side: 0, hint: NaN, px: 0, py: 0, route: [] };
      N.ports.push(j), N.portOf.set(T * 2 + (w ? 0 : 1), j);
    }
  }
  let x = new Int32Array(s), v = (T, E, M) => (M ? E.src : E.dst) !== T, $ = (T, E) => {
    let M = T.dir === "TB" || T.dir === "BT", A = qs(T.dir), m = [], I = [];
    T.items.forEach((N, j) => {
      x[N] = j;
      let F = e[N], Y = E ? Ki(M ? F.w : F.h, M ? F.h : F.w) : Ki(0, 0);
      Y.span = F.isGroup ? Math.min(F.span, Y.w - 2 * F.padX) : F.span, Y.key = D ? R[N] : NaN, m.push(Y);
    });
    let k = (N, j, F) => e[N].isGroup && v(N, t[j], F), w = (N, j, F) => {
      if (!E || !e[N].isGroup || !v(N, t[j], F)) return 0;
      let Y = l.get(N).portOf.get(j * 2 + (F ? 0 : 1));
      return M ? Y.px - e[N].w / 2 : Y.py - e[N].h / 2;
    };
    for (let N of T.edges) {
      let j = t[N.e], F = Xi(x[N.a], x[N.b], j.minlen);
      E && (F.labelW = M ? j.labelW : j.labelH, F.labelH = M ? j.labelH : j.labelW, F.tailDx = w(N.a, N.e, !0), F.headDx = w(N.b, N.e, !1), F.tailFixed = k(N.a, N.e, !0), F.headFixed = k(N.b, N.e, !1)), I.push(F);
    }
    let B = new Int32Array(T.ports.length).fill(-1);
    return T.ports.forEach((N, j) => {
      if (N.side === A || N.side === xi(A)) {
        let F = m.length, Y = Ki(0, 0, N.side === A ? 3 : 4);
        Y.key = D ? R[N.out ? t[N.e].dst : t[N.e].src] : NaN, Y.hint = Number.isNaN(N.hint) && D && U ? U(T, N) : N.hint, m.push(Y), B[j] = F;
        let W = N.out ? Xi(x[N.inner], F) : Xi(F, x[N.inner]);
        N.out ? (W.tailDx = w(N.inner, N.e, !0), W.tailFixed = k(N.inner, N.e, !0)) : (W.headDx = w(N.inner, N.e, !1), W.headFixed = k(N.inner, N.e, !1)), I.push(W);
      } else m[x[N.inner]].pin = N.side === 0 || N.side === 3 ? -1 : 1;
    }), { lnodes: m, ledges: I, dummies: B };
  }, S = g > 1 && g <= L$ && t.length <= O$, R = new Float64Array(s).fill(NaN), D = !1, O = 0, U, q = n.length > 1 && S;
  for (let T of n) T.dir !== r && (q = !1);
  if (q) {
    let T = r === "TB" || r === "BT", E = new Int32Array(s).fill(-1), M = new Int32Array(s).fill(-1), A = [], m = [], I = [];
    for (let Y = 0; Y < s; Y++) e[Y].isGroup && (M[Y] = I.length, I.push(-1));
    for (let Y = 0; Y < s; Y++) {
      let W = e[Y].parent;
      e[Y].isGroup ? I[M[Y]] = W >= 0 ? M[W] : -1 : (E[Y] = A.length, A.push(Ki(T ? e[Y].w : e[Y].h, T ? e[Y].h : e[Y].w)), m.push(W >= 0 ? M[W] : -1));
    }
    let k = [], w = new Int32Array(t.length).fill(-1);
    t.forEach((Y, W) => {
      Y.src === Y.dst || E[Y.src] < 0 || E[Y.dst] < 0 || (w[W] = k.length, k.push(Xi(E[Y.src], E[Y.dst], Y.minlen, T ? Y.labelW : Y.labelH, T ? Y.labelH : Y.labelW)));
    });
    let B = Bh(A, k, { ...a, groups: { of: Int32Array.from(m), parent: Int32Array.from(I) }, orderOnly: !0 });
    O = Math.min(B.crossings ?? 0, B.declared ?? 0);
    let N = new Float64Array(s), j = new Int32Array(s), F = new Int32Array(s).fill(-1);
    for (let Y = 0; Y < s; Y++) if (!(E[Y] < 0)) {
      R[Y] = A[E[Y]].x;
      for (let W = e[Y].parent; W >= 0; W = e[W].parent) N[W] += R[Y], j[W]++, F[W] = Math.max(F[W], A[E[Y]].rank);
    }
    for (let Y = 0; Y < s; Y++) j[Y] > 0 && (R[Y] = N[Y] / j[Y]);
    U = (Y, W) => {
      let K = w[W.e];
      if (K < 0 || Y.id < 0 || !W.out || W.side !== xi(qs(Y.dir))) return NaN;
      let H = k[K].points, te = R[t[W.e].src], Q = 0;
      for (let L = 0; L < H.length; L += 2) H[L] === F[Y.id] && (te = H[L + 1]), H[L] === F[Y.id] + 1 && (Q = H[L + 1]);
      return te + Q * 1e-6;
    };
  }
  let C = /* @__PURE__ */ new Map(), ee = (T, E, M) => {
    if (!S) return { lnodes: E, ledges: M, size: Bh(E, M, a) };
    let A = [];
    for (let k of E) A.push(k.w, k.h, k.kind, k.pin, k.hint, k.key, k.span);
    for (let k of M) A.push(k.tail, k.head, k.minlen, k.labelW, k.labelH, k.tailDx, k.headDx, +k.tailFixed, +k.headFixed);
    let m = C.get(T.id);
    m || C.set(T.id, m = []);
    for (let k of m) {
      let w = k.given.length === A.length;
      for (let B = 0; w && B < A.length; B++) w = Object.is(k.given[B], A[B]);
      if (w) return k;
    }
    let I = { given: A, lnodes: E, ledges: M, size: Bh(E, M, a) };
    return m.push(I), I;
  }, ie = { width: 0, height: 0 }, G = () => {
    for (let E of n) {
      for (let k of E.ports) e[k.inner].isGroup && v(k.inner, t[k.e], k.out) && (l.get(k.inner).portOf.get(k.e * 2 + (k.out ? 0 : 1)).side = k.side);
      if (E.edges.length === 0) continue;
      let M = !1;
      for (let k of E.edges) {
        let w = t[k.e];
        (e[k.a].isGroup && w.src !== k.a || e[k.b].isGroup && w.dst !== k.b) && (M = !0);
      }
      if (!M) continue;
      let { lnodes: A, ledges: m } = $(E, !1);
      Bf(A, m), Gf(A, m, 1);
      let I = qs(E.dir);
      E.edges.forEach((k, w) => {
        let B = t[k.e], N = !m[w].reversed;
        e[k.a].isGroup && B.src !== k.a && (l.get(k.a).portOf.get(k.e * 2).side = N ? xi(I) : I), e[k.b].isGroup && B.dst !== k.b && (l.get(k.b).portOf.get(k.e * 2 + 1).side = N ? I : xi(I));
      });
    }
    for (let E = n.length - 1; E >= 0; E--) {
      let M = n[E], A = M.id >= 0 ? e[M.id] : void 0, m = M.dir === "TB" || M.dir === "BT", I = M.dir === "BT" || M.dir === "RL", k = $(M, !0), { lnodes: w, ledges: B, size: N } = ee(M, k.lnodes, k.ledges), j = k.dummies, F = m ? N.width : N.height, Y = m ? N.height : N.width, W = A ? A.padX : 0, K = A ? A.padTop : 0, H = Math.max(F + 2 * W, A ? A.minW : 0), te = Y + K + (A ? A.padBottom : 0), Q = (H - F) / 2, L = K, X = (ae, oe) => Q + (m ? ae : I ? N.height - oe : oe), le = (ae, oe) => L + (m ? I ? N.height - oe : oe : ae), J = m ? 0 : 1, V = (ae) => {
        let oe = [];
        for (let ue = 0; ue < ae.length; ue += 2) oe.push(X(ae[ue], ae[ue + 1]), le(ae[ue], ae[ue + 1]), J);
        return oe;
      };
      M.items.forEach((ae, oe) => {
        e[ae].x = X(w[oe].x, w[oe].y), e[ae].y = le(w[oe].x, w[oe].y);
      }), M.edges.forEach((ae, oe) => {
        let ue = B[oe];
        M.routes.set(ae.e, V(ue.points));
        let he = t[ae.e];
        he.labelW > 0 && (he.labelX = X(ue.labelX, ue.labelY), he.labelY = le(ue.labelX, ue.labelY));
      });
      let Z = M.edges.length;
      M.ports.forEach((ae, oe) => {
        let ue = e[ae.inner];
        if (j[oe] >= 0) {
          let pe = V(B[Z++].points), Me = ae.out ? pe.length - 3 : 0, xe = pe[Me], ve = pe[Me + 1];
          ae.side === 0 ? ve = 0 : ae.side === 2 ? ve = te : ae.side === 3 ? xe = 0 : xe = H, ae.out ? pe.push(xe, ve, J) : pe.unshift(xe, ve, J), ae.px = xe, ae.py = ve, ae.route = pe;
          return;
        }
        let he = ue.x, re = ue.y;
        if (ue.isGroup && v(ae.inner, t[ae.e], ae.out)) {
          let pe = l.get(ae.inner).portOf.get(ae.e * 2 + (ae.out ? 0 : 1));
          he += pe.px - ue.w / 2, re += pe.py - ue.h / 2;
        } else ae.side === 0 ? re -= ue.h / 2 : ae.side === 2 ? re += ue.h / 2 : ae.side === 3 ? he -= ue.w / 2 : he += ue.w / 2;
        let P = he, ne = re;
        ae.side === 0 ? ne = 0 : ae.side === 2 ? ne = te : ae.side === 3 ? P = 0 : P = H;
        let ce = ae.side === 0 || ae.side === 2 ? 0 : 1;
        ae.px = P, ae.py = ne, ae.route = ae.out ? [he, re, ce, P, ne, ce] : [P, ne, ce, he, re, ce];
      }), A ? (A.w = H, A.h = te) : ie = { width: H, height: te };
    }
    for (let E of n) {
      let M = E.x, A = E.y;
      for (let m of E.items) {
        let I = e[m];
        if (I.x += M, I.y += A, I.isGroup) {
          let k = l.get(m);
          k.x = I.x - I.w / 2, k.y = I.y - I.h / 2;
        }
      }
    }
    let T = (E, M, A, m) => {
      for (let I = 0; I < M.length; I += 3) {
        let k = M[I] + A, w = M[I + 1] + m, B = E.length;
        B >= 3 && Math.abs(E[B - 3] - k) < 0.01 && Math.abs(E[B - 2] - w) < 0.01 || E.push(k, w, M[I + 2]);
      }
    };
    for (let E of n) for (let M of E.edges) {
      let A = t[M.e], m = [], I = [];
      for (let w = A.src; e[w].parent !== E.id; w = e[w].parent) I.push(l.get(e[w].parent));
      for (let w of I) T(m, w.portOf.get(M.e * 2).route, w.x, w.y);
      T(m, E.routes.get(M.e), E.x, E.y);
      let k = [];
      for (let w = A.dst; e[w].parent !== E.id; w = e[w].parent) k.push(l.get(e[w].parent));
      for (let w = k.length - 1; w >= 0; w--) T(m, k[w].portOf.get(M.e * 2 + 1).route, k[w].x, k[w].y);
      A.route = m, A.labelW > 0 && (A.labelX += E.x, A.labelY += E.y);
    }
  }, z = B$(a);
  D = q, G();
  let _ = -1;
  if (q && (_ = js(e, t, z), _ > O * F$ + z$)) {
    let T = Hu(e, t, n, ie);
    D = !1, G();
    let E = js(e, t, z);
    E >= _ ? (D = !0, ie = Uu(T, e, t, n)) : _ = E;
  }
  if (D === q && S) {
    let T = !1;
    for (let E of n) {
      if (E.id < 0) continue;
      let M = e[E.id], A = E.dir === "TB" || E.dir === "BT", m = xi(qs(E.dir)), I = [];
      for (let k of E.ports) {
        if (k.side !== m) continue;
        let w = t[k.e].route, B = E.x + k.px, N = E.y + k.py, j = -1;
        for (let W = 0; W < w.length && (j < 0 || k.out); W += 3) Math.abs(w[W] - B) < 0.01 && Math.abs(w[W + 1] - N) < 0.01 && (j = W);
        if (j < 0) continue;
        let F = A ? 0 : 1, Y = k.out ? j + 3 : j - 3;
        for (; Y >= 0 && Y < w.length && Math.abs(w[Y + F] - w[j + F]) < Ol; ) Y += k.out ? 3 : -3;
        Y < 0 || Y >= w.length || (k.hint = w[Y + F] - (A ? M.x - M.w / 2 : M.y - M.h / 2), I.push([A ? k.px : k.py, k.hint]));
      }
      I.sort((k, w) => k[0] - w[0]);
      for (let k = 1; k < I.length; k++) I[k - 1][1] > I[k][1] && (T = !0);
    }
    if (T) {
      let E = _ >= 0 ? _ : js(e, t, z), M = E > 0 ? Hu(e, t, n, ie) : void 0;
      M && (G(), js(e, t, z) >= E && (ie = Uu(M, e, t, n)));
    }
  }
  for (let T of b) {
    let E = t[T], M = e[E.src], A = e[E.dst];
    E.route = [M.x, M.y, 0, A.x, A.y, 0], E.labelX = (M.x + A.x) / 2, E.labelY = (M.y + A.y) / 2;
  }
  for (let T of y) {
    let E = t[T], M = e[E.src];
    E.labelX = M.x + M.w / 2 + 28 + E.labelW / 2, E.labelY = M.y;
  }
  return ie;
}
function ei(e, t) {
  for (let r = 0; r < t.length; r += 3) {
    let a = Math.round(t[r + 1]), s = e.get(a);
    s ? s.push(t[r]) : e.set(a, [t[r]]);
  }
}
function lh(e, t, r, a) {
  if (t === 0) return e.x;
  let s = e.y - e.h / 2, l = e.x - e.w / 2, n = t / 2, i = [l + a - 6 + n, e.x, l + e.w - a + 6 - n], o = r.get(Math.round(s));
  if (o === void 0) return i[0];
  let h = i[0], c = -1;
  for (let u of i) {
    let d = 1 / 0;
    for (let p of o) p > l && p < l + e.w && (d = Math.min(d, Math.abs(p - u) - n));
    if (d >= 6) return u;
    d > c + 0.5 && (c = d, h = u);
  }
  return h;
}
function Y2(e, t, r, a) {
  let s = t > 0 ? a.get(Math.round(e.y - e.h / 2)) : void 0;
  if (s === void 0) return !1;
  let l = e.x - e.w / 2;
  for (let n of s) if (n > l && n < l + e.w && Math.abs(n - r) < t / 2 + 4) return !0;
  return !1;
}
function j2(e, t, r, a, s, l, n, i) {
  let o = 1;
  for (let c = l[n].parent; c >= 0 && o < 8; c = l[c].parent) o++;
  let h = `color-mix(in srgb,var(--_a) ${f(100 * (1 - 0.5 ** o))}%,var(--_bg))`;
  return `<g class="pele-cluster-title" data-id="${s}">` + Pe(e, t, r, ` fill="none" stroke="${h}" stroke-width="5" stroke-linejoin="round"`, i) + Pe(e, t, r, a, i) + "</g>";
}
var Nt = 8, G$ = 12, Vs = 0.62, os = 6;
function q2() {
  let e = /* @__PURE__ */ new Map();
  return { add(t, r, a) {
    let s = Ct(a);
    r >= 0 && s > 0 && s + os > (e.get(t * 4 + r) ?? 0) && e.set(t * 4 + r, s + os);
  }, of: (t, r) => r >= 0 ? e.get(t * 4 + r) ?? 0 : 0 };
}
function Na(e, t, r, a, s = r > 0 ? r + os : 0, l = a > 0 ? a + os : 0) {
  let n = t === "linear", i = t === "step" || t === "stepBefore" || t === "stepAfter", o = [], h = [], c = [], u = (m, I, k, w) => Math.abs(m - k) < 0.01 && Math.abs(I - w) < 0.01;
  for (let m = 0; m < e.length; m += 3) {
    let I = e[m], k = e[m + 1], w = e[m + 2], B = o.length - 1;
    if (i && B >= 0 && Math.abs(I - o[B]) >= 0.01 && Math.abs(k - h[B]) >= 0.01) {
      let N = o[B], j = h[B], F = t === "stepBefore" ? j : t === "stepAfter" ? k : (j + k) / 2, Y = t === "stepBefore" ? N : t === "stepAfter" ? I : (N + I) / 2, W = w === 0 ? [N, F, I, F] : [Y, j, Y, k];
      for (let K = 0; K < 4; K += 2) u(W[K], W[K + 1], N, j) || u(W[K], W[K + 1], I, k) || (o.push(W[K]), h.push(W[K + 1]), c.push(w));
    }
    o.push(I), h.push(k), c.push(w);
  }
  let d = o.length - 1, p = (m) => Math.abs(o[m] - o[m - 1]) < 0.01 || Math.abs(h[m] - h[m - 1]) < 0.01, g = (m) => n || p(m), y = (m, I, k) => {
    if (!g(Math.max(m, I))) return k === 0 ? [0, Math.sign(h[I] - h[m]) || 1] : [Math.sign(o[I] - o[m]) || 1, 0];
    let w = o[I] - o[m], B = h[I] - h[m], N = Math.hypot(w, B) || 1;
    return [w / N, B / N];
  }, [b, x] = y(0, 1, c[1]), [v, $] = y(d - 1, d, c[d]), S = o[0], R = h[0], D = o[d], O = h[d];
  o[0] += b * r, h[0] += x * r, o[d] -= v * a, h[d] -= $ * a;
  let U = (m) => Math.abs(o[m] - o[m - 1]) + Math.abs(h[m] - h[m - 1]), q = (m) => !n && m > 0 && m < d && p(m) && p(m + 1) && U(m) >= 0.01 && U(m + 1) >= 0.01 && Math.abs(o[m] - o[m - 1]) < 0.01 != Math.abs(o[m + 1] - o[m]) < 0.01, C = (m, I, k) => Math.abs(o[m] - o[m - 1]) * Math.abs(I) + Math.abs(h[m] - h[m - 1]) * Math.abs(k), ee = (m, I, k) => {
    let w = Math.min(Math.max(0, m - os - I), k / 4);
    return w + Math.min(m - I - w, (k - w) / 4);
  }, ie = l > a && (!g(d) || q(d - 1)) ? ee(l, a, C(d, v, $)) : 0, G = s > r && (!g(1) || q(1)) ? ee(s, r, C(1, b, x)) : 0;
  ie >= 1 && (o.splice(d, 0, o[d] - v * ie), h.splice(d, 0, h[d] - $ * ie), c.splice(d, 0, c[d]), d++), G >= 1 && (o.splice(1, 0, o[0] + b * G), h.splice(1, 0, h[0] + x * G), c.splice(1, 0, c[1]), d++);
  let z = [], _ = (m) => (z.push(j$(m)), f(m));
  z.push(77, 2);
  let T = `M${_(o[0])},${_(h[0])}`, E = o[0], M = h[0], A = (m, I) => {
    u(m, I, E, M) || (z.push(76, 2), T += `L${_(m)},${_(I)}`, E = m, M = I);
  };
  for (let m = 1; m <= d; m++) {
    let I = o[m], k = h[m];
    if (!g(m)) {
      let W = c[m] === 0, K = W ? k - M : I - E, H = Math.abs(K) * Eo(W ? I - E : k - M, K), te = W ? 0 : Math.sign(K) * H, Q = W ? Math.sign(K) * H : 0;
      z.push(67, 6), T += `C${_(E + te)},${_(M + Q)} ${_(I - te)},${_(k - Q)} ${_(I)},${_(k)}`, E = I, M = k;
      continue;
    }
    if (!q(m)) {
      if (m < d && p(m) && p(m + 1) && (I - o[m - 1]) * (o[m + 1] - I) + (k - h[m - 1]) * (h[m + 1] - k) > 0) continue;
      A(I, k);
      continue;
    }
    let w = q(m - 1) ? U(m) / 2 : U(m), B = q(m + 1) ? U(m + 1) / 2 : U(m + 1);
    i && (w = B = Math.min(G$, w, B));
    let [N, j] = y(m - 1, m, c[m]), [F, Y] = y(m, m + 1, c[m + 1]);
    A(I - N * w, k - j * w), E = I + F * B, M = k + Y * B, i ? (z.push(81, 4), T += `Q${_(I)},${_(k)} ${_(E)},${_(M)}`) : (z.push(67, 6), T += `C${_(I - N * w * (1 - Vs))},${_(k - j * w * (1 - Vs))} ${_(I + F * B * (1 - Vs))},${_(k + Y * B * (1 - Vs))} ${_(E)},${_(M)}`);
  }
  return { d: T, tokens: z, sx: S, sy: R, sdx: -b, sdy: -x, ex: D, ey: O, edx: v, edy: $ };
}
function Ct(e) {
  return e === "arrow_point" ? Nt - 1 : e === "arrow_circle" ? Nt : e === "arrow_cross" ? 4 : 0;
}
function St(e, t, r, a, s, l, n = "none") {
  let i = -s, o = a;
  if (e === "arrow_point") {
    let h = t - a * Nt, c = r - s * Nt, u = Nt * 0.42;
    return `<path class="pele-marker" d="M${f(t)},${f(r)}L${f(h + i * u)},${f(c + o * u)}L${f(h - i * u)},${f(c - o * u)}Z" fill="${l}" stroke="${n}"/>`;
  }
  if (e === "arrow_circle") return `<circle class="pele-marker" cx="${f(t - a * 4)}" cy="${f(r - s * 4)}" r="3.5" fill="${l}" stroke="${n}"/>`;
  if (e === "arrow_cross") {
    let h = t - a * 4, c = r - s * 4, u = 3.5, d = (a + i) * u, p = (s + o) * u, g = (a - i) * u, y = (s - o) * u;
    return `<path class="pele-marker" d="M${f(h - d)},${f(c - p)}L${f(h + d)},${f(c + p)}M${f(h - g)},${f(c - y)}L${f(h + g)},${f(c + y)}"/>`;
  }
  return "";
}
var H$ = Array.from({ length: 23 }, (e, t) => +`1e${t}`);
function U$(e) {
  return V2(Y$(e));
}
function Y$(e) {
  let t = [], r = -1;
  for (let a = 0; a < e.length; ) {
    let s = e.charCodeAt(a);
    if (s >= 65 && s <= 90 && s !== 69) r = t.length + 1, t.push(s, 0), a++;
    else if (s === 45 || s === 46 || s >= 48 && s <= 57) {
      let l = s === 45 ? a + 1 : a, n = 0, i = -1;
      for (let h = e.charCodeAt(l); h >= 48 && h <= 57 || h === 46 && i < 0; h = e.charCodeAt(++l)) h === 46 ? i = 0 : (n = n * 10 + h - 48, i >= 0 && i++);
      let o;
      if ((e.charCodeAt(l) | 32) === 101 || n > Number.MAX_SAFE_INTEGER || i > 22) {
        for (let h = e.charCodeAt(l); h === 46 || h === 101 || h === 69 || h >= 48 && h <= 57 || (h === 45 || h === 43) && (e.charCodeAt(l - 1) | 32) === 101; h = e.charCodeAt(++l)) ;
        o = Number(e.slice(a, l));
      } else o = i > 0 ? n / H$[i] : n, s === 45 && (o = -o);
      r >= 0 && (t.push(o), t[r]++), a = l;
    } else a++;
  }
  return t;
}
function j$(e) {
  let t = Math.round(e * 100);
  return t === 0 ? 0 : t / 100;
}
function V2(e) {
  let t = [], r = 0, a = 0;
  for (let s = 0; s < e.length; ) {
    let l = e[s], n = e[s + 1], i = s + 2, o = i + n;
    if (s = o, l === 72 || l === 86) for (let h = i; h < o; h++) l === 72 ? r = e[h] : a = e[h], t.push(r, a);
    else if (l === 67 || l === 81) {
      let h = l === 67, c = h ? 6 : 4;
      for (let u = i; u + c <= o; u += c) {
        let d = e[u], p = e[u + 1], g = e[u + 2], y = e[u + 3], b = h ? e[u + 4] : g, x = h ? e[u + 5] : y;
        for (let v = 0.125; v <= 1; v += 0.125) {
          let $ = r + (d - r) * v, S = a + (p - a) * v, R = d + (g - d) * v, D = p + (y - p) * v;
          if (h) {
            let O = g + (b - g) * v, U = y + (x - y) * v;
            $ += (R - $) * v, S += (D - S) * v, R += (O - R) * v, D += (U - D) * v;
          }
          t.push($ + (R - $) * v, S + (D - S) * v);
        }
        r = b, a = x;
      }
    } else if (l === 65) for (let h = i; h + 7 <= o; h += 7) q$(t, r, a, e[h], e[h + 1], e[h + 3], e[h + 4], e[h + 5], e[h + 6]), r = e[h + 5], a = e[h + 6];
    else for (let h = i; h + 2 <= o; h += 2) l === 77 && h === i && t.length > 0 && t.push(NaN, NaN), r = e[h], a = e[h + 1], t.push(r, a);
  }
  return t;
}
function q$(e, t, r, a, s, l, n, i, o) {
  let h = (t - i) / 2, c = (r - o) / 2;
  if (a === 0 || s === 0 || h === 0 && c === 0) {
    e.push(i, o);
    return;
  }
  let u = Math.max(1, Math.sqrt(h * h / (a * a) + c * c / (s * s)));
  a *= u, s *= u;
  let d = (l === n ? -1 : 1) * Math.sqrt(Math.max(0, (a * a * s * s - a * a * c * c - s * s * h * h) / (a * a * c * c + s * s * h * h))), p = d * a * c / s + (t + i) / 2, g = -d * s * h / a + (r + o) / 2, y = Math.atan2((r - g) / s, (t - p) / a), b = Math.atan2((o - g) / s, (i - p) / a) - y;
  n && b < 0 ? b += 2 * Math.PI : !n && b > 0 && (b -= 2 * Math.PI);
  for (let x = 1; x <= 8; x++) e.push(p + a * Math.cos(y + b * x / 8), g + s * Math.sin(y + b * x / 8));
}
function V$(e, t, r, a, s, l, n, i) {
  let o = 0, h = 1;
  for (let c = 0; c < 4; c++) {
    let u = c === 0 ? -r : c === 1 ? r : c === 2 ? -a : a, d = c === 0 ? e - s : c === 1 ? n - e : c === 2 ? t - l : i - t;
    u === 0 ? d < 0 && (h = -1) : u < 0 ? o = Math.max(o, d / u) : h = Math.min(h, d / u);
  }
  return o < h;
}
function K$(e, t, r, a, s) {
  for (let l = 0; l + 2 < e.length; l += 2) {
    let n = e[l], i = e[l + 1], o = e[l + 2], h = e[l + 3];
    if (!(n < t && o < t || n > a && o > a || i < r && h < r || i > s && h > s) && V$(n, i, o - n, h - i, t, r, a, s)) return !0;
  }
  return !1;
}
function Hf(e, t, r, a) {
  if (r.length === 0) return;
  let s = a ? V2(a) : U$(e), l = 1 / 0, n = 1 / 0, i = -1 / 0, o = -1 / 0;
  for (let u = 0; u < s.length + t.length; u += 2) {
    let d = u < s.length ? s[u] : t[u - s.length], p = u < s.length ? s[u + 1] : t[u + 1 - s.length];
    d < l && (l = d), d > i && (i = d), p < n && (n = p), p > o && (o = p);
  }
  let h, c = 1 / 0;
  for (let u of r) {
    let [d, p, g, y] = u.box;
    if (i < d + 0.5 || l > g - 0.5 || o < p + 0.5 || n > y - 0.5) continue;
    let b = K$(s, d + 0.5, p + 0.5, g - 0.5, y - 0.5);
    for (let v = 0; v < t.length && !b; v += 2) b = t[v] > d + 0.5 && t[v] < g - 0.5 && t[v + 1] > p + 0.5 && t[v + 1] < y - 0.5;
    if (!b) continue;
    if (l < d || i > g || n < p || o > y) return "";
    let x = (g - d) * (y - p);
    x < c && (c = x, h = u);
  }
  return h;
}
function Uf(e, t = "") {
  return (/[";]stroke:/.test(t) ? void 0 : si(e.shape)) ?? "";
}
function tf(e, t) {
  let r = /[";]fill:([^;"]*)/.exec(t.shape)?.[1].trim();
  return r ? e.replace(/ fill="var\(--_bg\)"/g, ` fill="${r}"`) : e;
}
function Is(e, t, r, a = "", s) {
  let l = Hf(e, t, r, s);
  return l && Uf(l, a);
}
var rf = 4;
function Yf(e, t, r = "", a = !1) {
  let s = (c) => r.includes(c) ? new RegExp(`[";]${c}:([^;"]+);`).exec(r)?.[1].trim() : void 0, l = s("stroke");
  if (l === "none" || l === "transparent") return "";
  let n = a ? "2.5" : s("stroke-width"), i = "", o = "";
  n !== void 0 && /^[\d.]+(?:px)?$/.test(n) ? parseFloat(n) !== 1 && (i = ` stroke-width="${f(parseFloat(n) + rf)}"`) : n !== void 0 && (o += `stroke-width:calc(${n} + ${rf}px);`);
  for (let c of ["opacity", "stroke-opacity"]) {
    let u = s(c);
    u !== void 0 && (o += `${c}:${u};`);
  }
  let h = `<path d="${e}"/>` + t.replace(/ class="pele-marker"/g, "");
  return i || o ? `<g${i}${o ? ` style="${o}"` : ""}>${h}</g>` : h;
}
function Ns(e, t, r, a = "", s = !1) {
  return Yf(e.d, St(t, e.sx, e.sy, e.sdx, e.sdy, "var(--_bg)", "var(--_bg)") + St(r, e.ex, e.ey, e.edx, e.edy, "var(--_bg)", "var(--_bg)"), a, s);
}
function dl(e) {
  return e ? `<g class="pele-casings" fill="none" stroke="var(--_bg)" stroke-width="${1 + rf}" stroke-linecap="round" stroke-linejoin="round" pointer-events="none">${e}</g>` : "";
}
function ga(e, t, r, a, s, l) {
  let n = t.width + 8, i = t.height;
  return `<g class="pele-edge-label" data-id="${Ye(e)}"><rect x="${f(r - n / 2)}" y="${f(a - i / 2)}" width="${f(n)}" height="${f(i)}" rx="3" fill="var(--_bg)"/>` + Pe(t, r, a, s, l) + "</g>";
}
function K2(e, t, r, a, s, l, n, i) {
  let o = (s ? t : r) / 2, h = Math.min(o - 4, 8 + a * 6), c = l + a * 8, u = Math.hypot(c, h) || 1, d = (y, b) => s ? `${f(e.x + b)},${f(e.y + r / 2 + y)}` : `${f(e.x + t / 2 + y)},${f(e.y + b)}`, p = c / u * n, g = h / u * n;
  return s ? (i.labelX = e.x, i.labelY = e.y + r / 2 + c + 4 + i.labelH / 2) : (i.labelX = e.x + t / 2 + c + 4 + i.labelW / 2, i.labelY = e.y), { d: `M${d(0, -h)}C${d(c, -h * 2)} ${d(c, h * 2)} ${d(p, h + g)}`, sx: s ? e.x - h : e.x + t / 2, sy: s ? e.y + r / 2 : e.y - h, sdx: s ? 0 : -1, sdy: s ? -1 : 0, ex: s ? e.x + h : e.x + t / 2, ey: s ? e.y + r / 2 : e.y + h, edx: s ? -h / u : -c / u, edy: s ? -c / u : -h / u };
}
var X$ = "--_bg:var(--pele-bg,#fff);--_fg:var(--pele-fg,#1f1f1f);--_m:var(--pele-muted,#6e6e6e);--_l:var(--pele-line,#1f1f1f);--_s:var(--pele-surface,#f3f3f3);--_a:var(--pele-surface-alt,#e6e6e6);--_b:var(--pele-border,#8a8a8a);--_c:var(--pele-accent,#5b7bd5);color:var(--_fg)", hi = "var(--_fm)", Z$ = "var(--pele-radius,4px)", wt = ' style="rx:var(--_r)"', Q$ = /[";]fill:/, fl = (e) => Q$.test(e);
function Et(e) {
  let t = e.indexOf(' style="');
  return t < 0 ? e + wt : `${e.slice(0, t + 8)}rx:var(--_r);${e.slice(t + 8)}`;
}
var af = "var(--pele-critical,#e45756)", ju = String.raw`(?:"[^"'\\\n<>{}();:@]*"|'[^"'\\\n<>{}();:@]*'|[\p{L}\p{N}_-][\p{L}\p{N}_ .-]*)`, J$ = new RegExp(String.raw`^\s*${ju}(?:\s*,\s*${ju})*\s*$`, "u");
function qu(e, t) {
  return e && J$.test(e) ? e : t;
}
function eb(e, t, r) {
  return `;--_fm:var(--pele-font-mono,${qu(r, "monospace")});font:${e}px sans-serif;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;font-family:var(--pele-font,${qu(t, "sans-serif")})`;
}
var tb = /* @__PURE__ */ new Set(["fill", "fill-opacity", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-opacity", "opacity", "rx", "ry"]), rb = /* @__PURE__ */ new Set(["color", "font-size", "font-family", "font-weight", "font-style", "text-decoration", "letter-spacing", "word-spacing", "opacity"]), ab = /url\s*\(|expression\s*\(|javascript:|[<>{};\\]|@import|image-set|\/\*/i, Vu = { shape: "", line: "", text: "", stroke: void 0, bold: !1, italic: !1, fontSize: void 0 };
function Dt(e) {
  if (e.length === 0) return Vu;
  let t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (let h of e) {
    let c = h.indexOf(":");
    if (c <= 0) continue;
    let u = h.slice(0, c).trim().toLowerCase(), d = h.slice(c + 1).replace(/!important/gi, "").trim();
    d === "" || ab.test(d) || b2.test(d) || (tb.has(u) && t.set(u, d), rb.has(u) && r.set(u === "color" ? "fill" : u, d));
  }
  if (t.size === 0 && r.size === 0) return Vu;
  let a = "", s = "";
  for (let [h, c] of t) a += `${h}:${c};`, h !== "fill" && h !== "fill-opacity" && (s += `${h}:${c};`);
  let l = "";
  for (let [h, c] of r) l += `${h}:${c};`;
  let n = r.get("font-weight"), i = r.get("font-size"), o = i && /^[\d.]+(px)?$/.test(i) ? parseFloat(i) : void 0;
  return { shape: a ? ` style="${it(a)}"` : "", line: s ? ` style="${it(s)}"` : "", text: l ? ` style="${it(l)}"` : "", stroke: t.get("stroke"), bold: n === "bold" || n === "bolder" || Number(n) >= 600, italic: r.get("font-style") === "italic", fontSize: o !== void 0 && o > 0 && o <= 200 ? o : void 0 };
}
var lb = /[^\w-]+/g;
function Ht(e) {
  let t = e.replace(lb, " ").trim();
  return t === "" ? "" : " " + t;
}
var ib = ["#4c78a8", "#f58518", "#54a24b", "#e45756", "#72b7b2", "#eeca3b", "#b279a2", "#9d755d"];
function vt(e) {
  let t = (e % 8 + 8) % 8;
  return `var(--pele-series-${t + 1},${ib[t]})`;
}
var sb = [["tw", "title"], ["hw", "heading"], ["w", "bold"]], nb = /var\(--_(r|tw|hw|w)\)/g;
function xt(e, t, r, a, s, l, n) {
  let i = it(s.idPrefix ?? "pele"), o = "", h = "";
  l.accTitle && (o += `<title id="${i}-title">${Ye(l.accTitle)}</title>`, h += ` aria-labelledby="${i}-title"`), l.accDescr && (o += `<desc id="${i}-desc">${Ye(l.accDescr)}</desc>`, h += ` aria-describedby="${i}-desc"`);
  let c = s.responsive === !1 ? "" : "max-width:100%;height:auto;", u = /* @__PURE__ */ new Set();
  for (let [, p] of n.matchAll(nb)) if (u.add(p), u.size === 4) break;
  let d = u.has("r") ? `;--_r:${Z$}` : "";
  for (let [p, g] of sb) u.has(p) && (d += `;--_${p}:var(--pele-${g}-weight,bold)`);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="pele pele-${e}" viewBox="0 0 ${t} ${r}" width="${t}" height="${r}" style="${c}${X$}${d}${it(eb(a, s.fontFamily, s.fontFamilyMono))}${Vx()}" fill="var(--_fg)" role="graphics-document document" aria-roledescription="${e}"${h}>` + o + n + "</svg>";
}
var ut = 18, gt = 12, Gl = 12, pr = (e, t, r) => (r ? t : e) - 2 * Gl, wi = (e) => (t, r, a) => a ? 0 : t - 2 * e(r) - 2 * Gl;
function To(e, t, r) {
  let a = Math.min(1, Math.abs(e) / t);
  return r * (1 - Math.sqrt(1 - a * a));
}
var Fa = (e, t, r, a) => r & 1 ? To(a, t / 2, e / 2) : To(a, e / 2, t / 2), za = (e, t, r) => (r ? t : e) * 0.6, Ku = (e, t, r, a) => r & 1 ? 0 : To(a, e / 2, Math.min(12, Math.max(6, e / 14))), Pa = (e, t) => () => ({ w: e, h: t, dy: 0 });
function Xu(e, t, r) {
  let a = Math.max(1.6 * e + 40, 80), s = (t + 10) / (1 - (e + 8) / a), l = s / 2 - 10 - t / 2;
  return { w: a, h: s, dy: r ? -l : l };
}
function xl(e, t) {
  return `<path d="${e}"${t}/>`;
}
var Ks = (e, t, r) => r & 1 ? t / 8 : 0, $i = (e, t) => ({ w: Math.max(e + 2 * ut, 2 * ut + 12), h: t + 2 * gt, dy: 0 });
function lr(e, t) {
  let r = "";
  for (let a = 0; a < e.length; a += 2) r += (a ? " " : "") + f(e[a]) + "," + f(e[a + 1]);
  return `<polygon points="${r}"${t}/>`;
}
function er(e, t, r, a = "") {
  return `<rect x="${f(-e / 2)}" y="${f(-t / 2)}" width="${f(e)}" height="${f(t)}"${a}${r}/>`;
}
var X2 = { rect: { size: $i, span: pr, draw: (e, t, r) => er(e, t, Et(r)) }, rounded: { size: $i, span: pr, draw: (e, t, r) => er(e, t, r, ` rx="${f(Math.min(12, t / 2))}"`) }, stadium: { inset: (e, t, r, a) => r & 1 ? To(a, t / 2, t / 2) : 0, span: (e, t, r) => r ? t * 0.6 : e - t, size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + r * 0.5 + 2 * ut - 8, h: r, dy: 0 };
}, draw: (e, t, r) => er(e, t, r, ` rx="${f(t / 2)}"`) }, "fr-rect": { span: pr, size: (e, t) => ({ w: e + 2 * ut + 16, h: t + 2 * gt, dy: 0 }), draw: (e, t, r, a) => {
  let s = e / 2 - 8;
  return er(e, t, Et(r)) + `<path d="M${f(-s)},${f(-t / 2)}V${f(t / 2)}M${f(s)},${f(-t / 2)}V${f(t / 2)}" fill="none"${a}/>`;
} }, cyl: { inset: Ku, span: (e, t, r) => r ? t - 2 * Gl - 12 : e * 0.6, size: (e, t) => {
  let r = Math.max(e + 2 * ut, 56), a = Math.min(12, Math.max(6, r / 14));
  return { w: r, h: t + 2 * gt + 2 * a, dy: a / 2 };
}, draw: (e, t, r, a) => {
  let s = e / 2, l = Math.min(12, Math.max(6, e / 14)), n = -t / 2 + l, i = t / 2 - l;
  return `<path d="M${f(-s)},${f(n)}A${f(s)},${f(l)} 0 0 1 ${f(s)},${f(n)}V${f(i)}A${f(s)},${f(l)} 0 0 1 ${f(-s)},${f(i)}Z"${r}/><path d="M${f(-s)},${f(n)}A${f(s)},${f(l)} 0 0 0 ${f(s)},${f(n)}" fill="none"${a}/>`;
} }, circle: { inset: Fa, span: za, size: (e, t) => {
  let r = Math.max(Math.sqrt(e * e + t * t) + 16, 44);
  return { w: r, h: r, dy: 0 };
}, draw: (e, t, r) => `<circle r="${f(e / 2)}"${r}/>` }, "dbl-circ": { inset: Fa, span: za, size: (e, t) => {
  let r = Math.max(Math.sqrt(e * e + t * t) + 26, 54);
  return { w: r, h: r, dy: 0 };
}, draw: (e, t, r, a) => `<circle r="${f(e / 2)}"${r}/><circle r="${f(e / 2 - 5)}" fill="none"${a}/>` }, ellipse: { inset: Fa, span: za, size: (e, t) => ({ w: e * 1.3 + 2 * ut, h: t * 1.2 + 2 * gt, dy: 0 }), draw: (e, t, r) => `<ellipse rx="${f(e / 2)}" ry="${f(t / 2)}"${r}/>` }, diam: { inset: (e, t, r, a) => r & 1 ? Math.abs(a) * e / t : Math.abs(a) * t / e, span: (e, t, r) => (r ? t : e) * 0.6, size: (e, t) => {
  let r = e + 16, a = t + 8;
  return { w: r + 1.6 * a, h: r / 1.6 + a, dy: 0 };
}, draw: (e, t, r) => lr([0, -t / 2, e / 2, 0, 0, t / 2, -e / 2, 0], r) }, hex: { inset: (e, t, r, a) => r & 1 ? Math.abs(a) / 2 : 0, span: (e, t, r) => r ? t * 0.5 : e - t / 2 - Gl, size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 2, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2 + a, -t / 2, e / 2 - a, -t / 2, e / 2, 0, e / 2 - a, t / 2, -e / 2 + a, t / 2, -e / 2, 0], r);
} }, odd: { inset: (e, t, r) => r === 3 ? t / 4 : 0, span: wi(() => 0), size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 4, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2, -t / 2, e / 2, -t / 2, e / 2, t / 2, -e / 2, t / 2, -e / 2 + a, 0], r);
} }, "lean-r": { inset: Ks, span: wi((e) => e / 4), size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 2, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2 + a, -t / 2, e / 2, -t / 2, e / 2 - a, t / 2, -e / 2, t / 2], r);
} }, "lean-l": { inset: Ks, span: wi((e) => e / 4), size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 2, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2, -t / 2, e / 2 - a, -t / 2, e / 2, t / 2, -e / 2 + a, t / 2], r);
} }, "trap-b": { inset: Ks, span: wi((e) => e / 4), size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 2, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2 + a, -t / 2, e / 2 - a, -t / 2, e / 2, t / 2, -e / 2, t / 2], r);
} }, "trap-t": { inset: Ks, span: wi((e) => e / 4), size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 2, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 4;
  return lr([-e / 2, -t / 2, e / 2, -t / 2, e / 2 - a, t / 2, -e / 2 + a, t / 2], r);
} }, text: { bare: !0, span: pr, size: (e, t) => ({ w: e + 8, h: t + 8, dy: 0 }), draw: (e, t) => er(e, t, ' fill="none" stroke="none"') }, "sm-circ": { noLabel: !0, inset: Fa, span: za, size: Pa(14, 14), draw: (e, t, r) => `<circle r="${f(e / 2)}"${r}/>` }, "f-circ": { noLabel: !0, inset: Fa, span: za, size: Pa(14, 14), draw: (e, t, r, a) => `<circle r="${f(e / 2)}" fill="var(--_l)"${a}/>` }, "fr-circ": { noLabel: !0, inset: Fa, span: za, size: Pa(18, 18), draw: (e, t, r, a) => `<circle r="${f(e / 2)}"${r}/><circle r="${f(e / 2 - 4)}" fill="var(--_l)"${a}/>` }, fork: { noLabel: !0, span: (e, t, r) => (r ? t : e) - 8, size: Pa(72, 8), draw: (e, t, r, a) => er(e, t, ` fill="var(--_l)"${a}`, ' rx="2"') }, "notch-rect": { size: $i, span: pr, draw: (e, t, r) => lr([-e / 2 + 10, -t / 2, e / 2, -t / 2, e / 2, t / 2, -e / 2, t / 2, -e / 2, -t / 2 + 10], r) }, "lin-rect": { span: pr, size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt, dy: 0 }), draw: (e, t, r, a) => er(e, t, Et(r)) + `<path d="M${f(-e / 2 + 8)},${f(-t / 2)}V${f(t / 2)}" fill="none"${a}/>` }, "div-rect": { span: pr, size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt + 8, dy: 4 }), draw: (e, t, r, a) => er(e, t, Et(r)) + `<path d="M${f(-e / 2)},${f(-t / 2 + 8)}H${f(e / 2)}" fill="none"${a}/>` }, "win-pane": { span: pr, size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt + 8, dy: 4 }), draw: (e, t, r, a) => er(e, t, Et(r)) + `<path d="M${f(-e / 2 + 8)},${f(-t / 2)}V${f(t / 2)}M${f(-e / 2)},${f(-t / 2 + 8)}H${f(e / 2)}" fill="none"${a}/>` }, tri: { inset: (e, t, r) => r & 1 ? e / 4 : 0, size: (e, t) => Xu(e, t, !1), draw: (e, t, r) => lr([0, -t / 2, e / 2, t / 2, -e / 2, t / 2], r) }, "flip-tri": { inset: (e, t, r) => r & 1 ? e / 4 : 0, size: (e, t) => Xu(e, t, !0), draw: (e, t, r) => lr([-e / 2, -t / 2, e / 2, -t / 2, 0, t / 2], r) }, "sl-rect": { inset: (e, t, r) => r === 0 ? 5 : 0, size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt + 10, dy: 5 }), draw: (e, t, r) => lr([-e / 2, -t / 2 + 10, e / 2, -t / 2, e / 2, t / 2, -e / 2, t / 2], r) }, "notch-pent": { span: pr, size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt, dy: 0 }), draw: (e, t, r) => lr([-e / 2 + 10, -t / 2, e / 2 - 10, -t / 2, e / 2, -t / 2 + 10, e / 2, t / 2, -e / 2, t / 2, -e / 2, -t / 2 + 10], r) }, hourglass: { noLabel: !0, inset: (e, t, r) => r & 1 ? e / 2 : 0, size: Pa(32, 40), draw: (e, t, r) => lr([-e / 2, -t / 2, e / 2, -t / 2, -e / 2, t / 2, e / 2, t / 2], r) }, delay: { size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r / 4, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = t / 2;
  return `<path d="M${f(-e / 2)},${f(-a)}H${f(e / 2 - a)}A${f(a)},${f(a)} 0 0 1 ${f(e / 2 - a)},${f(a)}H${f(-e / 2)}Z"${r}/>`;
} }, "h-cyl": { size: (e, t) => {
  let r = t + 2 * gt, a = Math.min(12, r / 4);
  return { w: e + 2 * ut + 2 * a, h: r, dy: 0 };
}, draw: (e, t, r, a) => {
  let s = t / 2, l = Math.min(12, t / 4), n = -e / 2 + l, i = e / 2 - l;
  return `<path d="M${f(n)},${f(-s)}H${f(i)}A${f(l)},${f(s)} 0 0 1 ${f(i)},${f(s)}H${f(n)}A${f(l)},${f(s)} 0 0 1 ${f(n)},${f(-s)}Z"${r}/><path d="M${f(i)},${f(-s)}A${f(l)},${f(s)} 0 0 0 ${f(i)},${f(s)}" fill="none"${a}/>`;
} }, "cross-circ": { noLabel: !0, inset: Fa, span: za, size: Pa(44, 44), draw: (e, t, r, a) => {
  let s = e / 2, l = s * Math.SQRT1_2;
  return `<circle r="${f(s)}"${r}/><path d="M${f(-l)},${f(-l)}L${f(l)},${f(l)}M${f(l)},${f(-l)}L${f(-l)},${f(l)}" fill="none"${a}/>`;
} }, "st-rect": { span: (e, t, r) => (r ? t : e) - 2 * Gl - 8, size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt + 8, dy: 4 }), draw: (e, t, r) => {
  let a = e - 8, s = t - 8, l = "";
  for (let n = 0; n < 3; n++) {
    let i = -e / 2 + (2 - n) * 4, o = -t / 2 + n * 4;
    l += `<rect x="${f(i)}" y="${f(o)}" width="${f(a)}" height="${f(s)}"${Et(r)}/>`;
  }
  return l;
} }, doc: { inset: (e, t, r) => r === 2 ? 10 : 0, size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt + 10, dy: -5 }), draw: (e, t, r) => Zs(e, t, r) }, flag: { inset: (e, t, r) => r & 1 ? 0 : 8, size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt + 16, dy: 0 }), draw: (e, t, r) => {
  let a = e / 2, s = t / 2 - 8, l = e / 4;
  return `<path d="M${f(-a)},${f(-s)}q${f(l)},-10 ${f(2 * l)},0t${f(2 * l)},0V${f(s)}q${f(-l)},10 ${f(-2 * l)},0t${f(-2 * l)},0Z"${r}/>`;
} }, datastore: { size: $i, span: pr, draw: (e, t, r, a) => er(e, t, r.replace('stroke="var(--_b)"', 'stroke="none"')) + `<path d="M${f(-e / 2)},${f(-t / 2)}H${f(e / 2)}M${f(-e / 2)},${f(t / 2)}H${f(e / 2)}" fill="none"${a}/>` }, folder: { size: (e, t) => ({ w: Math.max(e + 2 * ut, 64), h: t + 2 * gt + 8, dy: 4 }), draw: (e, t, r) => {
  let a = e / 2, s = t / 2, l = Math.min(e * 0.4, 48);
  return xl(`M${f(-a)},${f(-s)}H${f(-a + l)}L${f(-a + l + 8)},${f(-s + 8)}H${f(a)}V${f(s)}H${f(-a)}Z`, r);
} }, bucket: { size: (e, t) => ({ w: e + 2 * ut + 20, h: t + 2 * gt + 10, dy: 3 }), inset: (e, t, r) => r & 1 ? t / 12 : 0, draw: (e, t, r, a) => {
  let s = e / 2, l = t / 2, n = 5, i = t / 6;
  return xl(`M${f(-s)},${f(-l + n)}A${f(s)},${f(n)} 0 0 1 ${f(s)},${f(-l + n)}L${f(s - i)},${f(l - n)}A${f(s - i)},${f(n)} 0 0 1 ${f(-s + i)},${f(l - n)}Z`, r) + `<path d="M${f(-s)},${f(-l + n)}A${f(s)},${f(n)} 0 0 0 ${f(s)},${f(-l + n)}" fill="none"${a}/>`;
} }, console: { span: pr, size: (e, t) => ({ w: Math.max(e + 2 * ut, 72), h: t + 2 * gt + 12, dy: 6 }), draw: (e, t, r, a) => er(e, t, Et(r)) + `<path d="M${f(-e / 2)},${f(-t / 2 + 12)}H${f(e / 2)}M${f(-e / 2 + 7)},${f(-t / 2 + 4)}l3,2.5l-3,2.5M${f(-e / 2 + 13)},${f(-t / 2 + 9)}h4" fill="none"${a}/>` }, browser: { span: pr, size: (e, t) => ({ w: Math.max(e + 2 * ut, 72), h: t + 2 * gt + 12, dy: 6 }), draw: (e, t, r, a) => {
  let s = "";
  for (let l = 0; l < 3; l++) s += `<circle cx="${f(-e / 2 + 8 + l * 7)}" cy="${f(-t / 2 + 6)}" r="1.5" fill="none"${a}/>`;
  return er(e, t, Et(r)) + `<path d="M${f(-e / 2)},${f(-t / 2 + 12)}H${f(e / 2)}" fill="none"${a}/>` + s;
} }, person: { size: (e, t) => ({ w: Math.max(e + 2 * ut, 56), h: t + 2 * gt + 26, dy: 13 }), draw: (e, t, r) => {
  let a = -t / 2;
  return `<rect x="${f(-e / 2)}" y="${f(a + 26)}" width="${f(e)}" height="${f(t - 26)}" rx="12"${r}/><circle cy="${f(a + 14)}" r="13"${r}/>`;
} }, bang: { size: (e, t) => ({ w: e + 2 * ut + 28, h: t + 2 * gt + 24, dy: 0 }), inset: () => 3, draw: (e, t, r) => {
  let a = [];
  for (let s = 0; s < 28; s++) {
    let l = Math.PI * s / 14 - Math.PI / 2, n = s % 2 === 0 ? 1 : 0.82;
    a.push(Math.cos(l) * (e / 2) * n, Math.sin(l) * (t / 2) * n);
  }
  return lr(a, r);
} }, cloud: { size: (e, t) => ({ w: e + 2 * ut + 32, h: t + 2 * gt + 24, dy: 0 }), inset: (e, t, r) => r & 1 ? 2 : 1, draw: (e, t, r) => {
  let a = e / 2, s = t / 2, l = s * 0.55;
  return xl(`M${f(-a + l)},${f(s)}A${f(l)},${f(l)} 0 0 1 ${f(-a + l * 0.6)},${f(-s * 0.1)}A${f(a * 0.42)},${f(s * 0.7)} 0 0 1 ${f(-a * 0.1)},${f(-s * 0.72)}A${f(a * 0.4)},${f(s * 0.62)} 0 0 1 ${f(a * 0.62)},${f(-s * 0.42)}A${f(l * 1.05)},${f(l * 1.05)} 0 0 1 ${f(a - l)},${f(s)}Z`, r);
} }, brace: { bare: !0, size: (e, t) => ({ w: e + 2 * ut + 12, h: t + 2 * gt, dy: 0 }), draw: (e, t, r, a) => er(e, t, ' fill="none" stroke="none"') + Xs(-e / 2 + 12, t, -1, a) }, "brace-r": { bare: !0, size: (e, t) => ({ w: e + 2 * ut + 12, h: t + 2 * gt, dy: 0 }), draw: (e, t, r, a) => er(e, t, ' fill="none" stroke="none"') + Xs(e / 2 - 12, t, 1, a) }, braces: { bare: !0, size: (e, t) => ({ w: e + 2 * ut + 24, h: t + 2 * gt, dy: 0 }), draw: (e, t, r, a) => er(e, t, ' fill="none" stroke="none"') + Xs(-e / 2 + 12, t, -1, a) + Xs(e / 2 - 12, t, 1, a) }, bolt: { noLabel: !0, size: Pa(36, 56), inset: (e, t, r) => r & 1 ? e / 4 : 0, draw: (e, t, r) => lr([e * 0.15, -t / 2, -e / 2, t * 0.08, -e * 0.05, t * 0.08, -e * 0.15, t / 2, e / 2, -t * 0.08, e * 0.05, -t * 0.08], r) }, "lin-cyl": { inset: Ku, span: (e, t, r) => r ? t - 2 * Gl - 20 : e * 0.6, size: (e, t) => {
  let r = Math.max(e + 2 * ut, 56), a = Math.min(12, Math.max(6, r / 14));
  return { w: r, h: t + 2 * gt + 2 * a + 8, dy: a / 2 + 4 };
}, draw: (e, t, r, a) => {
  let s = e / 2, l = Math.min(12, Math.max(6, e / 14)), n = -t / 2 + l, i = t / 2 - l, o = (h) => `M${f(-s)},${f(h)}A${f(s)},${f(l)} 0 0 0 ${f(s)},${f(h)}`;
  return xl(`M${f(-s)},${f(n)}A${f(s)},${f(l)} 0 0 1 ${f(s)},${f(n)}V${f(i)}A${f(s)},${f(l)} 0 0 1 ${f(-s)},${f(i)}Z`, r) + `<path d="${o(n)}${o(n + 8)}" fill="none"${a}/>`;
} }, "curv-trap": { size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r * 0.6, h: r, dy: 0 };
}, draw: (e, t, r) => {
  let a = e / 2, s = t / 2, l = t * 0.3;
  return xl(`M${f(-a + l)},${f(-s)}H${f(a - l)}A${f(l)},${f(s)} 0 0 1 ${f(a - l)},${f(s)}H${f(-a + l)}L${f(-a)},0Z`, r);
} }, docs: { size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt + 18, dy: -1 }), inset: (e, t, r) => r === 2 ? 10 : 0, draw: (e, t, r) => {
  let a = "";
  for (let s = 0; s < 3; s++) a += `<g transform="translate(${(1 - s) * 4},${(s - 1) * 4})">${Zs(e - 8, t - 8, r)}</g>`;
  return a;
} }, "bow-rect": { size: (e, t) => {
  let r = t + 2 * gt;
  return { w: e + 2 * ut + r * 0.4, h: r, dy: 0 };
}, inset: (e, t, r) => r === 1 ? t * 0.2 : 0, draw: (e, t, r) => {
  let a = e / 2, s = t / 2, l = t * 0.2;
  return xl(`M${f(-a + l)},${f(-s)}H${f(a)}A${f(l)},${f(s)} 0 0 0 ${f(a)},${f(s)}H${f(-a + l)}A${f(l)},${f(s)} 0 0 1 ${f(-a + l)},${f(-s)}Z`, r);
} }, "tag-rect": { size: $i, span: pr, draw: (e, t, r, a) => er(e, t, Et(r)) + `<path d="M${f(e / 2 - 12)},${f(t / 2)}L${f(e / 2)},${f(t / 2 - 12)}" fill="none"${a}/>` }, "tag-doc": { size: (e, t) => ({ w: e + 2 * ut, h: t + 2 * gt + 10, dy: -5 }), inset: (e, t, r) => r === 2 ? 10 : 0, draw: (e, t, r, a) => Zs(e, t, r) + `<path d="M${f(e / 2 - 12)},${f(t / 2 - 14)}L${f(e / 2)},${f(t / 2 - 26)}" fill="none"${a}/>` }, "lin-doc": { size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt + 10, dy: -5 }), inset: (e, t, r) => r === 2 ? 10 : 0, draw: (e, t, r, a) => Zs(e, t, r) + `<path d="M${f(-e / 2 + 8)},${f(-t / 2)}V${f(t / 2 - 6)}" fill="none"${a}/>` }, collapsedGroup: { size: (e, t) => ({ w: e + 2 * ut + 8, h: t + 2 * gt + 8, dy: -2 }), draw: (e, t, r) => `<rect x="${f(-e / 2 + 6)}" y="${f(-t / 2 + 8)}" width="${f(e - 12)}" height="${f(t - 8)}"${Et(r)}/><rect x="${f(-e / 2)}" y="${f(-t / 2)}" width="${f(e)}" height="${f(t - 4)}"${Et(r)}/>` } };
function Xs(e, t, r, a) {
  let s = t / 2, l = 6 * r;
  return `<path d="M${f(e)},${f(-s)}q${f(l)},0 ${f(l)},6V-6q0,6 ${f(l)},6q${f(-l)},0 ${f(-l)},6V${f(s - 6)}q0,6 ${f(-l)},6" fill="none"${a}/>`;
}
function Zs(e, t, r) {
  let a = e / 2, s = -t / 2, l = t / 2 - 10, n = e / 4;
  return `<path d="M${f(-a)},${f(s)}H${f(a)}V${f(l)}q${f(-n)},-12 ${f(-2 * n)},0t${f(-2 * n)},0Z"${r}/>`;
}
var jf = X2.rect, ci = new Map(Object.entries(X2));
function ih(e, t, r) {
  return (ci.get(e) ?? jf).size(t, r);
}
function ti(e, t, r, a, s) {
  return (ci.get(e) ?? jf).draw(t, r, a, s);
}
function al(e, t, r, a, s = 0) {
  return ci.get(e)?.inset?.(t, r, a, s) ?? 0;
}
function ob(e, t, r, a) {
  return Math.max(0, ci.get(e)?.span?.(t, r, a) ?? 0);
}
function hb(e) {
  return ci.get(e)?.noLabel !== !0;
}
function qf(e) {
  return (ci.get(e) ?? jf).bare !== !0;
}
function fa(e, t, r) {
  let a = e[t] - r.x, s = e[t + 1] - r.y;
  return Math.abs(Math.abs(s) - r.h / 2) < 0.5 ? s < 0 ? 0 : 2 : Math.abs(Math.abs(a) - r.w / 2) < 0.5 ? a < 0 ? 3 : 1 : -1;
}
function hs(e, t, r, a) {
  if (a.isGroup) return;
  let s = fa(e, t, a);
  if (s === 0 || s === 2) {
    let l = al(r.shape, r.w, r.h, s, e[t] - a.x) + (a.h - r.h) / 2;
    e[t + 1] += s === 0 ? l : -l;
  } else if (s >= 0) {
    let l = al(r.shape, r.w, r.h, s, e[t + 1] - a.y) + (a.w - r.w) / 2;
    e[t] += s === 3 ? l : -l;
  }
}
var cb = 1.5, Z2 = 1.3, db = /<br\s*\/?>|\\n|\n/gi, Zu = /<\/?([a-zA-Z][\w-]*)(?:\s[^<>]*)?\/?>/y, Qu = /(fa[bklrs]?):fa-([\w-]+)/g, fb = /[<\\\n*_]|fa[bklrs]?:fa-/, ub = /* @__PURE__ */ new Map([["b", 1], ["strong", 1], ["i", 2], ["em", 2], ["cite", 2], ["dfn", 2], ["var", 2], ["code", 4], ["kbd", 4], ["samp", 4], ["tt", 4], ["sub", 8], ["sup", 16], ["u", 32], ["ins", 32]]), pb = 24, gb = new Set("a abbr address article aside audio b bdi bdo big blockquote body br button caption center cite code col colgroup data dd del details dfn dialog div dl dt em embed fieldset figcaption figure font footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd label legend li link main map mark meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track tt u ul var video wbr".split(" ")), lf = "\\u2e80-\\u9fff\\uf900-\\ufaff\\uff00-\\uff60", Ju = "、。，．：；！？）］｝」』】〕〉》〙〗ー…‥・ゝゞぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ,.:;!?)\\]}", mb = "（［｛「『【〔〈《〘〖([{", yb = new RegExp(`[${lf}]`), io = "\\u200b\\u00ad", xb = new RegExp(`[${io}]`), wb = new RegExp(`\\s*(?:[${mb}]*[${lf}][${Ju}]*|[^\\s${lf}${io}]+[${io}]*[${Ju}]*|[${io}]+)\\s*|\\s+`, "g"), Q2 = 57344, $b = 6400, bb = /\$\$(.+?)\$\$/g, J2 = /[\ue000-\uf8ff]/, Mb = /([\ue000-\uf8ff])/, cs, vb = { lines: [], widths: [], width: 0, height: 0, size: 0, lineHeight: 0 };
function kb(e) {
  let t = e.split(`
`), r = 1 / 0;
  for (let a of t) {
    if (a.trim() === "") continue;
    let s = a.length - a.trimStart().length;
    s < r && (r = s);
  }
  return r === 1 / 0 || r === 0 ? e : t.map((a) => a.slice(Math.min(r, a.length - a.trimStart().length))).join(`
`);
}
function Co(e) {
  return e !== void 0 && e.icon === void 0 && e.math === void 0;
}
function Gh(e, t, r) {
  if (t !== "") {
    if (cs !== void 0 && J2.test(t)) {
      let a = cs, s = t.split(Mb);
      for (let l = 0; l < s.length; l++) {
        if (l % 2 === 0) {
          s[l] !== "" && Hh(e, s[l], r);
          continue;
        }
        let n = s[l].charCodeAt(0) - Q2, i = a.math[n];
        i ? e.push({ text: "", style: r, math: i, width: i.width }) : Hh(e, `$$${a.tex[n]}$$`, r);
      }
      return;
    }
    Hh(e, t, r);
  }
}
function Hh(e, t, r) {
  let a = Tt(t), s = e[e.length - 1];
  Co(s) && s.style === r ? s.text += a : e.push({ text: a, style: r, width: 0 });
}
function Ab(e, t, r) {
  if (!t.includes(":fa-")) {
    Gh(e, t, r);
    return;
  }
  let a = 0;
  Qu.lastIndex = 0;
  let s;
  for (; (s = Qu.exec(t)) !== null; ) {
    let l = `${s[1]}:fa-${s[2]}`;
    if (Gh(e, t.slice(a, s.index), r), a = s.index + s[0].length, Ff(l) !== "") e.push({ text: "", style: r, icon: l, width: 0 });
    else if (t[a] === " ") a++;
    else if (a === t.length) {
      let n = e[e.length - 1];
      Co(n) && (n.text = n.text.trimEnd());
    }
  }
  Gh(e, t.slice(a), r);
}
function Eb(e, t, r, a, s) {
  let l = s.style, n = 0, i = "", o = 0, h = t.length, c = () => {
    Ab(e, i, l | (s.shifts[s.shifts.length - 1] ?? 0)), i = "";
  };
  for (; o < h; ) {
    let u = t[o];
    if (u === "<") {
      Zu.lastIndex = o;
      let d = Zu.exec(t);
      if (d && d.index === o) {
        let p = d[1].toLowerCase(), g = t[o + 1] === "/", y = ub.get(p) ?? 0;
        if (y & pb) {
          c();
          let b = s.shifts.lastIndexOf(y);
          g ? b !== -1 && s.shifts.splice(b, 1) : s.shifts.push(y);
        } else y && (c(), s.style = g ? s.style & ~y | a & y : s.style | y, l = g ? l & ~y | a & y : l | y);
        if (y || gb.has(p)) {
          o += d[0].length;
          continue;
        }
      }
    } else if (r && (u === "*" || u === "_")) {
      let d = t[o + 1] === u, p = d ? 1 : 2, g = d ? 2 : 1, y = (n & p) === 0, b = o > 0 ? t[o - 1] : " ", x = o + g < h ? t[o + g] : " ", v = y && x.trim() !== "" && t.indexOf(d ? u + u : u, o + g) !== -1, $ = !y && b.trim() !== "", S = u === "_" && /\w/.test(b) && /\w/.test(x);
      if ((v || $) && !S) {
        c(), n = v ? n | p : n & ~p, l = v ? l | p : l & ~p | a & p, o += g;
        continue;
      }
    }
    i += u, o++;
  }
  c();
}
function Tb(e, t, r) {
  let a = 0;
  for (let s of e) s.width = s.icon !== void 0 ? r * 1.25 : s.math ? s.math.width : t.width(s.text, r, s.style), a += s.width;
  return a;
}
function em(e, t, r, a, s, l) {
  let n = [], i = 0, o = (h = !1) => {
    let c = n[n.length - 1];
    if (Co(c)) {
      let u = c.text.trimEnd();
      if (h && c.text.endsWith("­") && (u = u.slice(0, -1) + "-"), u !== c.text) {
        c.text = u;
        let d = t.width(u, r, c.style);
        i += d - c.width, c.width = d;
      }
    }
    s.push(n), l.push(i), n = [], i = 0;
  };
  for (let h of e) {
    if (h.icon !== void 0 || h.math) {
      let y = h.math ? h.math.width : r * 1.25;
      i > 0 && i + y > a && o(), n.push({ ...h, width: y }), i += y;
      continue;
    }
    let c = h.text.match(wb) ?? [], u = h.text.includes("­"), d = u ? c.length : 0, p = new Float64Array(d), g = new Float64Array(d + 1);
    for (let y = d - 1; y >= 0; y--) {
      let b = c[y].endsWith("­"), x = c[y].trimEnd();
      p[y] = t.width(b ? x.slice(0, -1) : x, r, h.style), g[y] = b ? y === d - 1 ? h === e[e.length - 1] ? p[y] : 1 / 0 : p[y] + g[y + 1] : p[y];
    }
    for (let y = 0; y < c.length; y++) {
      let b = c[y], x = u ? p[y] : t.width(b.trimEnd(), r, h.style), v = !u || !b.endsWith("­") ? i + x <= a : i + t.width(b.slice(0, -1) + "-", r, h.style) <= a || i + g[y] <= a;
      i > 0 && !v && (o(b.trimStart() === b), b = b.trimStart());
      let $ = n[n.length - 1];
      if (Co($) && $.style === h.style) {
        if ($.text += b, x > 0 || b.trimEnd() !== b) {
          let S = $.width;
          $.width = t.width($.text, r, $.style), i += $.width - S;
        }
      } else {
        let S = t.width(b, r, h.style);
        n.push({ text: b, style: h.style, width: S }), i += S;
      }
    }
  }
  (n.length > 0 || s.length === 0) && o();
}
function je(e, t, r, a, s, l = 0) {
  if (e === void 0 || e === "") return vb;
  let n = Math.round(a * cb);
  if (Py() && e.includes("$$") && !J2.test(e)) {
    let i = { tex: [], math: [] }, o = e.replace(bb, (h, c) => i.tex.length === $b ? h : (i.tex.push(c), String.fromCharCode(Q2 + i.tex.length - 1)));
    if (i.tex.length > 0) {
      for (let h of i.tex) i.math.push(Wy(Tt(h), a));
      return ep(o, t, r, a, s, l, n, i);
    }
  }
  if (!fb.test(e) && !e.includes("&") && !e.includes("ﬂ")) {
    let i = e.trim(), o = r.width(i, a, l);
    if (o <= s || !(i.includes(" ") || yb.test(i) || xb.test(i))) return { lines: [[{ text: i, style: l, width: o }]], widths: [o], width: o, height: n, size: a, lineHeight: n };
    let h = [], c = [];
    em([{ text: i, style: l, width: o }], r, a, s, h, c);
    let u = 0;
    for (let p of c) p > u && (u = p);
    let d = h.length > 1 ? Math.round(a * Z2) : n;
    return { lines: h, widths: c, width: u, height: h.length * d, size: a, lineHeight: d };
  }
  return ep(e, t, r, a, s, l, n);
}
function ep(e, t, r, a, s, l, n, i) {
  let o = cs;
  cs = i;
  try {
    let h = Cb(e, t, r, a, s, l, n);
    return i ? Vf(h) : h;
  } finally {
    cs = o;
  }
}
function Cb(e, t, r, a, s, l, n) {
  let i = t ? kb(e.replace(/\r\n?/g, `
`)).trim() : e.trim(), o = [], h = [], c = 0, u = { style: l, shifts: [] };
  for (let p of i.split(db)) {
    let g = [];
    Eb(g, p.trim(), t, l, u);
    let y = Tb(g, r, a);
    y > s ? em(g, r, a, s, o, h) : (o.push(g), h.push(y));
  }
  for (let p of h) p > c && (c = p);
  let d = o.length > 1 ? Math.round(a * Z2) : n;
  return { lines: o, widths: h, width: c, height: o.length * d, size: a, lineHeight: d };
}
function Vf(e) {
  let t;
  for (let a = 0; a < e.lines.length; a++) {
    let s = e.lineHeight;
    for (let l of e.lines[a]) l.math && (s = Math.max(s, Math.ceil(l.math.height + e.size / 4)));
    s !== e.lineHeight && t === void 0 && (t = e.lines.map(() => e.lineHeight)), t && (t[a] = s);
  }
  if (t === void 0) return e.heights === void 0 ? e : { ...e, heights: void 0, height: e.lines.length * e.lineHeight };
  let r = 0;
  for (let a of t) r += a;
  return { ...e, heights: t, height: r };
}
function Kf(e) {
  for (let t of e) if (t.math) return !0;
  return !1;
}
function Rs(e, t) {
  let r = e.heights;
  if (!r) return (t + 0.5) * e.lineHeight;
  let a = 0;
  for (let s = 0; s < t; s++) a += r[s];
  return a + r[t] / 2;
}
function Ds(e, t) {
  let r = e.widths[t], a = e.heights ? e.heights[t] : e.lineHeight, s = { lines: [e.lines[t]], widths: [r], width: r, height: a, size: e.size, lineHeight: e.lineHeight };
  return a !== e.lineHeight && (s.heights = [a]), s;
}
function sh(e, t, r, a) {
  let s = a(t, !1), l = e.maxWidth;
  if (l === void 0 || !(l > 0) || s.width <= l) return s;
  let n = Math.min(r, t), i = t;
  s = a(i, !0);
  for (let o = 0; o < 3 && s.width > l && i > n; o++) i = Math.max(n, i - (s.width - l)), s = a(i, !0);
  return s;
}
function Qt(e) {
  let t = e.maxWidth;
  return t !== void 0 && t > 0 ? Math.max(80, t - 2 * (e.padding ?? 8)) : 4e3;
}
function nh(e, t, r, a = 0) {
  let s = e.maxWidth;
  return s === void 0 || !(s > 0) ? t : Math.max(Math.min(r, t), Math.min(t, s - a));
}
var Sb = 640;
function ur(e, t) {
  let r = t(!1), a = e.maxWidth;
  if (e.autoDirection === !1 || a === void 0 || !(a > 0) || r.width <= a) return r;
  let s = e.directionBreakpoint;
  if (a >= (s !== void 0 && s > 0 ? s : Sb)) return r;
  let l = t(!0);
  return l.width < r.width ? l : r;
}
function ul(e) {
  return e === "LR" || e === "RL";
}
function Da(e, t) {
  let r = t(!1), a = e.maxWidth;
  if (a === void 0 || !(a > 0) || r.width <= a) return r;
  let s = t(!0);
  return s.width < r.width ? s : r;
}
var Hl = /* @__PURE__ */ new Map([["tool", 0], ["task", 1], ["decision", 2], ["input", 3], ["refdoc", 4], ["connector", 5], ["action", 6]]), tm = Hl.size, _b = (e) => Math.max(1, e - tm), Ib = (e, t) => {
  let r = tm + e % _b(t);
  return t > 0 ? r % t : r;
};
function Nb(e, t, r, a) {
  let s = r.size;
  for (let l of e) {
    if (l.isGroup || l.shape === "collapsedGroup") {
      l.colorIndex = Ib(r.get(l.id) ?? s++, a);
      continue;
    }
    let n = t(l.id);
    n && Hl.has(n) && (l.kind = n);
  }
}
function Rb(e, t, r) {
  let a = [], s = [], l = e.subgraphs, n = (x) => {
    let v = [];
    for (let $ of x) {
      let S = e.classes.get($);
      S?.styles && (v = [...v, ...S.styles].map((R) => R.trim())), S?.textStyles && (v = [...v, ...S.textStyles].map((R) => R.trim()));
    }
    return v;
  }, i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
  for (let x of l) {
    if (x.metadata?.view !== "collapsed" || i.has(x.id)) continue;
    let v = [x.id];
    for (; v.length > 0; ) {
      let $ = e.subgraph(v.pop())?.nodes;
      if ($ !== void 0) for (let S of $) S === x.id || i.has(S) || (i.add(S), o.set(S, x.id), h.has(S) || v.push(S));
    }
    h.add(x.id);
  }
  let c = /* @__PURE__ */ new Map();
  for (let x of i) {
    let v = [x], $ = o.get(x);
    for (; ; ) {
      let S = c.get($), R = S ?? o.get($);
      if (R === void 0 || (S === void 0 && v.push($), $ = R, S !== void 0)) break;
    }
    for (let S of v) c.set(S, $);
  }
  let u = /* @__PURE__ */ new Map();
  l.forEach((x, v) => u.set(x.id, v));
  let d = /* @__PURE__ */ new Map(), p = (x, v, $) => {
    let S = u.get(x);
    if (S === void 0 || S < $) return !1;
    let R = v;
    for (let D = 0; R !== void 0 && D <= l.length; D++) {
      if (R === x) return !0;
      R = d.get(R);
    }
    return !1;
  };
  for (let x = l.length - 1; x >= 0; x--) {
    let v = l[x];
    if (!i.has(v.id)) for (let $ of v.nodes) {
      if (p($, v.id, x)) {
        e.emitWarning("CONTAINMENT_VIOLATION", `Container "${v.id}" cannot contain "${$}" because "${$}" already contains it. The nesting that would close the loop is dropped.`, { nodeId: $ });
        continue;
      }
      d.set($, v.id);
    }
  }
  let g = /* @__PURE__ */ new Map();
  for (let x = l.length - 1; x >= 0; x--) {
    let v = l[x];
    if (i.has(v.id)) continue;
    let $ = v.metadata?.view === "collapsed", S = { id: v.id, label: v.title, labelType: v.labelType, parentId: d.get(v.id), cssStyles: [], cssCompiledStyles: n(v.classes), cssClasses: v.classes.join(" "), shape: $ ? "collapsedGroup" : "flowGroup", dir: v.dir, isGroup: !$, metadata: $ ? { ...v.metadata, containerType: v.type } : v.metadata };
    a.push(S), g.set(v.id, S);
  }
  for (let x of e.nodes.values()) {
    if (i.has(x.id)) continue;
    let v = g.get(x.id);
    if (v) {
      v.cssStyles = x.styles, v.cssCompiledStyles = n(x.classes), v.cssClasses = x.classes.join(" ");
      continue;
    }
    let $ = ro(x.type), S = { id: x.id, label: x.text, labelType: x.labelType, parentId: d.get(x.id), cssStyles: x.styles, cssCompiledStyles: n(["default", "node", ...x.classes]), cssClasses: "default " + x.classes.join(" "), dir: x.dir, link: x.link, linkTarget: x.linkTarget, tooltip: e.tooltips.get(x.id), metadata: x.metadata, isGroup: !1, shape: $ === "square" || $ === void 0 ? "squareRect" : $ };
    a.push(S), g.set(x.id, S);
  }
  e.edges.forEach((x, v) => {
    let $ = c.get(x.start) ?? x.start, S = c.get(x.end) ?? x.end;
    if ($ === S && x.start !== x.end) return;
    let R = [...e.defaultEdgeStyle ?? []];
    x.style && R.push(...x.style);
    let D = x.type === "arrow_open" ? "none" : x.type === "arrow_cross" || x.type === "arrow_point" ? x.type : "arrow_point";
    s.push({ id: x.id || `L_${$}_${S}_${v}`, isUserDefinedId: x.isUserDefinedId, start: $, end: S, type: x.type ?? "normal", label: x.text, labelType: x.labelType, thickness: x.stroke, pattern: x.stroke, minlen: x.length, classes: "edge-thickness-normal edge-pattern-solid flowchart-link", arrowTypeStart: "none", arrowTypeEnd: D, cssCompiledStyles: n(x.classes), style: R, animate: x.animate, animation: x.animation, curve: x.interpolate || e.defaultInterpolate || r, metadata: x.metadata });
  }), Lw(a, e);
  let y = /* @__PURE__ */ new Map();
  for (let x of l) {
    let v = d.get(x.id);
    if (v === void 0) continue;
    let $ = y.get(v);
    $ ? $.push(x.id) : y.set(v, [x.id]);
  }
  let b = /* @__PURE__ */ new Map();
  for (let x of l) {
    if (d.get(x.id) !== void 0) continue;
    let v = [x.id];
    for (; v.length > 0; ) {
      let $ = v.pop();
      if (b.has($)) continue;
      b.set($, b.size);
      let S = y.get($);
      if (S) for (let R = S.length - 1; R >= 0; R--) v.push(S[R]);
    }
  }
  return Nb(a, (x) => {
    if (e.connectors.has(x)) return "connector";
    let v = e.nodes.get(x);
    return v ? e.vertexKind(v) : void 0;
  }, b, t), { nodes: a, edges: s };
}
var Db = 8, Lb = 40, Ob = 16, Fb = 48, bi = 20, Uh = 26, Qs = 14, Yh = "collapsed", zb = { TB: 2, RL: 3, BT: 0, LR: 1 }, tp = /* @__PURE__ */ new WeakMap();
function rm(e, t) {
  let r = tp.get(e);
  if (r === void 0) {
    let a = t.flowchart?.curve;
    r = Rb(e, Db, typeof a == "string" ? a : void 0), tp.set(e, r);
  }
  return r;
}
function Js(e, t, r) {
  let a = e.agentflow?.[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
function jh(e, t, r) {
  let a = vt(e);
  return ` fill="${a}"${fl(r.shape) ? "" : ` fill-opacity="${t}"`} stroke="${a}"`;
}
function Pb(e, t, r) {
  return ul(e.direction) ? ur(r, (a) => rp(e, t, r, a)) : rp(e, t, r, !1);
}
function rp(e, t, r, a) {
  let s = rm(e, t), l = r.fontSize ?? 16, n = Math.round(l * 0.875), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = Js(t, "wrappingWidth", 120), h = Js(t, "minNodeWidth", 120), c = r.padding ?? 8, u = r.icons, d = /* @__PURE__ */ new Map(), p = [], g = [];
  s.nodes.forEach((H, te) => d.set(H.id, te));
  for (let H of s.nodes) {
    let te = H.cssStyles.length > 0 ? H.cssCompiledStyles.concat(H.cssStyles) : H.cssCompiledStyles, Q = Dt(te), L = (Q.bold ? 1 : 0) | (Q.italic ? 2 : 0), X = H.labelType === "markdown", le = Q.fontSize ?? l, J, V;
    if (H.isGroup) {
      let Z = je(H.label, X, i, le, 4e3, L);
      J = { node: H, style: Q, label: Z, shape: "group", w: 0, h: 0, dy: 0, loops: 0 }, V = Wt(0, 0), V.isGroup = !0, V.dir = H.dir ? zr(H.dir) : void 0, V.padX = bi, V.padTop = Z.height > 0 ? Z.height + 16 : bi, V.padBottom = bi, V.minW = Z.width + 2 * bi - 12;
    } else if (H.shape === "collapsedGroup") {
      let Z = je(H.label, X, i, le, o, L), ae = Math.max(Z.width, h) + 2 * ut, oe = Z.height + 2 * gt + Qs;
      J = { node: H, style: Q, label: Z, shape: Yh, w: ae, h: oe, dy: -Qs / 2, loops: 0 }, V = Wt(ae, oe);
    } else {
      let Z = P2(H.shape), ae = je(H.label, X, i, le, o, L), oe = ih(Z, Z === "diam" ? ae.width : Math.max(ae.width, h), ae.height);
      J = { node: H, style: Q, label: ae, shape: Z, w: oe.w, h: oe.h, dy: oe.dy, loops: 0 }, V = Wt(oe.w, oe.h);
    }
    V.seq = p.length, p.push(J), g.push(V);
  }
  s.nodes.forEach((H, te) => {
    g[te].parent = H.parentId !== void 0 ? d.get(H.parentId) ?? -1 : -1;
  }), U2(g, s.edges.map((H) => [d.get(H.start) ?? -1, d.get(H.end) ?? -1]));
  let y = a ? "TB" : zr(e.direction), b = (H) => {
    let te;
    for (let Q = g[H].parent, L = 0; Q >= 0 && te === void 0 && L < 1e4; Q = g[Q].parent, L++) te = g[Q].dir;
    return te ?? y;
  }, x = (H) => {
    let te = b(H);
    return te === "LR" || te === "RL";
  }, v = new Int32Array(g.length).fill(-1);
  for (let H = 0; H < g.length; H++) {
    let te = [], Q = H;
    for (; Q >= 0 && v[Q] < 0 && te.length <= g.length; ) te.push(Q), Q = g[Q].parent;
    let L = Q >= 0 ? v[Q] + 1 : 0;
    for (let X = te.length - 1; X >= 0; X--) v[te[X]] = L++;
  }
  let $ = (H, te) => {
    let Q = te;
    for (let L = v[te]; L > v[H]; L--) Q = g[Q].parent;
    return Q === H && te !== H;
  }, S = [], R = [], D = [], O = [];
  for (let H of s.edges) {
    let te = d.get(H.start), Q = d.get(H.end);
    if (te === void 0 || Q === void 0) continue;
    let L = je(H.label, H.labelType === "markdown", i, n, o);
    if ($(te, Q) || $(Q, te)) {
      O.push({ edge: H, label: L, src: te, dst: Q });
      continue;
    }
    te === Q && (p[te].loops++, x(te) ? g[te].h += 2 * (Uh + (L.height > 0 ? L.height + 8 : 0)) : g[te].w += 2 * (Uh + (L.width > 0 ? L.width + 12 : 0))), D.push(H), R.push(L), S.push({ src: te, dst: Q, minlen: H.minlen ?? 1, labelW: L.width > 0 ? L.width + 12 : 0, labelH: L.height > 0 ? L.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  let U = cl(g, S, y, { nodeSep: Js(t, "nodeSpacing", Lb), edgeSep: Ob, rankSep: Js(t, "rankSpacing", Fb), portSep: 20 }), q = je(e.title, !1, i, l, 4e3, 1), C = q.height > 0 ? q.height + 12 : 0, ee = Math.max(U.width, q.width), ie = c + (ee - U.width) / 2, G = c + C;
  _s(g, S, ie, G);
  let z = Math.ceil(ee + 2 * c), _ = Math.ceil(U.height + C + 2 * c), T = [], E = [], M = [], A = [], m = O.length * g.length < 2e6;
  for (let { edge: H, src: te, dst: Q } of O) {
    let L = $(Q, te), X = L ? Q : te, le = L ? te : Q, J = g[X], V = g[le], Z = zb[J.dir ?? b(X)], ae = L ? Z : Z + 2 & 3, oe = (P) => {
      let ne = (P & 1) === 0, ce = P === 0 || P === 3 ? -1 : 1, pe = ne ? V.x : V.x + ce * V.w / 2, Me = ne ? V.y + ce * V.h / 2 : V.y, xe = ne ? V.x : J.x + ce * J.w / 2, ve = ne ? J.y + ce * J.h / 2 : V.y, Ae = ne ? 0 : 1;
      return L ? [pe, Me, Ae, xe, ve, Ae] : [xe, ve, Ae, pe, Me, Ae];
    }, ue = (P) => {
      for (let ne = 0; ne < g.length; ne++) {
        let ce = g[ne];
        if (ne !== le && !ce.isGroup && ce.x + ce.w / 2 > Math.min(P[0], P[3]) - 1 && ce.x - ce.w / 2 < Math.max(P[0], P[3]) + 1 && ce.y + ce.h / 2 > Math.min(P[1], P[4]) - 1 && ce.y - ce.h / 2 < Math.max(P[1], P[4]) + 1) return !0;
      }
      return !1;
    }, he = oe(ae);
    if (m && ue(he)) for (let P of [ae + 1 & 3, ae + 3 & 3, ae + 2 & 3]) {
      let ne = oe(P);
      if (!ue(ne)) {
        he = ne;
        break;
      }
    }
    A.push(he), M.push((he[0] + he[3]) / 2, (he[1] + he[4]) / 2);
    let re = he.slice();
    hs(re, L ? 0 : 3, p[le], V), E.push(Na(re, "linear", 0, Ct(H.arrowTypeEnd)));
  }
  let I = /* @__PURE__ */ new Map(), k = !1;
  for (let H of g) H.isGroup && (k = !0);
  if (k) {
    for (let H of S) ei(I, H.route);
    for (let H of A) ei(I, H);
  }
  let w = "", B = "", N = [];
  for (let H = 0; H < p.length; H++) {
    let te = p[H], Q = g[H], L = te.node, X = Q.x, le = Q.y, J = Ht(L.cssClasses.replace(/^default\s?/, "")), V = Ye(L.id);
    if (Q.isGroup) {
      Ia(te.style.shape) && N.push({ box: [X - Q.w / 2, le - Q.h / 2, X + Q.w / 2, le + Q.h / 2], shape: te.style.shape });
      let ne = lh(Q, te.label.width, I, bi);
      w += `<g class="pele-cluster pele-flow${J}" data-id="${V}"><rect x="${f(X - Q.w / 2)}" y="${f(le - Q.h / 2)}" width="${f(Q.w)}" height="${f(Q.h)}"${Et(jh(L.colorIndex ?? Hl.size, "0.06", te.style) + te.style.shape)}/>` + Pe(te.label, ne, le - Q.h / 2 + 8 + te.label.height / 2, ` class="pele-cluster-label"${Xt(te.style, "var(--_m)")}${te.style.text}`, u) + "</g>";
      continue;
    }
    let Z = te.w, ae = te.h, oe = "", ue;
    if (te.shape === Yh) {
      let ne = vt(L.colorIndex ?? Hl.size), ce = ae / 2 - Qs - 2, pe = ce + (Qs + 2) / 2;
      ue = `<rect x="${f(-Z / 2)}" y="${f(-ae / 2)}" width="${f(Z)}" height="${f(ae)}"${Et(jh(L.colorIndex ?? Hl.size, "0.06", te.style) + te.style.shape)}/><path d="M${f(-Z / 2 + 10)},${f(ce)}H${f(Z / 2 - 10)}" fill="none" stroke="${ne}" stroke-dasharray="3 3"${te.style.line}/><path class="pele-collapsed-mark" d="${qh(-9, pe)}${qh(0, pe)}${qh(9, pe)}" fill="${ne}" stroke="none"/>`;
    } else {
      let ne = Hl.get(L.kind ?? "task") ?? 1;
      oe = ` pele-kind-${L.kind ?? "task"}`, ue = ti(te.shape, Z, ae, jh(ne, "0.14", te.style) + te.style.shape, ` stroke="${vt(ne)}"` + te.style.line);
    }
    let he = te.shape === Yh || qf(te.shape) ? Xt(te.style) : "", re = Pe(te.label, 0, te.dy, ` class="pele-label"${he}${te.style.text}`, u);
    if (/ internal-link(?: |$)/.test(J + " ") && L.label && r.links !== !1) {
      let ne = Tt(L.label), ce = Pf(ne, r), pe = it(ne);
      re = `<a class="internal-link"${ce ? ` href="${pe}"${Ss(r)}` : ""} data-href="${pe}">${re}</a>`, T.push({ id: L.id, href: ne, internal: !0 });
    }
    let P = ue + re;
    L.tooltip && (P = `<title>${Ye(L.tooltip)}</title>` + P), L.link && (P = oi(P, L.link, L.id, T, r, L.linkTarget ? ` target="${it(L.linkTarget)}"` : "")), B += `<g class="pele-node pele-shape-${te.shape}${oe}${J}" data-id="${V}" transform="translate(${f(X)},${f(le)})">${P}</g>`;
  }
  let j = "", F = "", Y = "", W = (H, te, Q, L, X) => {
    let le = H.style.length > 0 || H.cssCompiledStyles.length > 0 ? Dt(H.cssCompiledStyles.concat(H.style)) : void 0, J = H.arrowTypeEnd, V = Is(Q.d, [Q.ex, Q.ey], N, le?.line, Q.tokens), Z = V || (le?.stroke ? it(le.stroke) : "var(--_l)"), ae = H.thickness === "dotted" ? "reference" : J === "arrow_cross" ? "failure" : "sequence", oe = Ht(H.classes.replace(/edge-thickness-normal|edge-pattern-solid|flowchart-link/g, ""));
    V === "" && (j += Ns(Q, "none", J, le?.line)), F += `<g class="pele-edge pele-edge-${ae}${oe}" data-id="${Ye(H.id)}"${V ? ` stroke="${V}"` : ""}${le?.line ?? ""}><path d="${Q.d}"${H.thickness === "dotted" ? ' stroke-dasharray="3 4"' : ""}/>` + St(J, Q.ex, Q.ey, Q.edx, Q.edy, Z) + "</g>", te.width > 0 && (Y += ga(H.id, te, L, X, le?.text ?? "", u));
  }, K = /* @__PURE__ */ new Map();
  for (let H = 0; H < S.length; H++) {
    let te = S[H], Q = D[H], L = R[H], X = Q.arrowTypeEnd, le;
    if (te.src === te.dst) {
      let J = p[te.src], V = K.get(te.src) ?? 0;
      K.set(te.src, V + 1), le = K2(g[te.src], J.w, J.h, V, x(te.src), Uh, Ct(X), te);
    } else {
      let J = te.route.slice();
      hs(J, 0, p[te.src], g[te.src]), hs(J, J.length - 3, p[te.dst], g[te.dst]), le = Na(J, Q.curve, 0, Ct(X));
    }
    W(Q, L, le, te.labelX, te.labelY);
  }
  return O.forEach((H, te) => W(H.edge, H.label, E[te], M[2 * te], M[2 * te + 1])), { svg: xt("agentflow", z, _, l, r, e, Pe(q, z / 2, c + q.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (w ? `<g class="pele-clusters">${w}</g>` : "") + dl(j) + (F ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${F}</g>` : "") + (Y ? `<g class="pele-edge-labels" font-size="${n}">${Y}</g>` : "") + `<g class="pele-nodes">${B}</g>`), width: z, height: _, links: T };
}
function qh(e, t) {
  return `M${f(e - 1.75)},${f(t)}a1.75,1.75 0 1 0 3.5,0a1.75,1.75 0 1 0 -3.5,0Z`;
}
var Wb = { type: "agentflow", keepComments: !0, parse(e, t, r, a, s) {
  let l = t.flowchart ?? {}, n = new Yw({ inheritDir: l.inheritDir === !0, direction: typeof t.direction == "string" ? t.direction : void 0, lineOffset: a, source: e, maxEdges: s.maxEdges });
  return r && (n.title = r), o$(e, n), rm(n, t), n;
}, render: Pb };
function Hr(e) {
  throw new at(e, "semantic", { type: "architecture" });
}
var Bb = class {
  type = "architecture";
  title;
  accTitle;
  accDescr;
  nodes = /* @__PURE__ */ new Map();
  groups = /* @__PURE__ */ new Map();
  edges = [];
  layoutHints = [];
  registered = /* @__PURE__ */ new Map();
  register(e, t, r) {
    this.registered.has(t) && Hr(`The ${e} id [${t}] is already in use by another ${this.registered.get(t)}`), r !== void 0 && (t === r && Hr(`The ${e} [${t}] cannot be placed within itself`), this.registered.has(r) || Hr(`The ${e} [${t}]'s parent does not exist. Please make sure the parent is created before this ${e}`), this.registered.get(r) === "node" && Hr(`The ${e} [${t}]'s parent is not a group`)), this.registered.set(t, e === "group" ? "group" : "node");
  }
  addService({ id: e, icon: t, iconText: r, title: a, in: s }) {
    this.register("service", e, s), this.nodes.set(e, { id: e, type: "service", icon: t, iconText: r, title: a, in: s });
  }
  addJunction({ id: e, in: t }) {
    this.register("junction", e, t), this.nodes.set(e, { id: e, type: "junction", in: t });
  }
  addGroup({ id: e, icon: t, title: r, in: a }) {
    this.register("group", e, a), this.groups.set(e, { id: e, icon: t, title: r, in: a });
  }
  addEdge({ lhsId: e, rhsId: t, lhsDir: r, rhsDir: a, lhsInto: s, rhsInto: l, lhsGroup: n, rhsGroup: i, title: o }) {
    let h = [["left", e, n], ["right", t, i]];
    for (let [u, d] of h) this.registered.has(d) || Hr(`The ${u}-hand id [${d}] does not yet exist. Please create the service/group before declaring an edge to it.`);
    for (let [u, d] of h) this.nodes.has(d) || Hr(`The ${u}-hand id [${d}] is a group. Add {group} to a service inside it instead.`);
    let c = this.nodes.get(e).in;
    if (c !== void 0 && c === this.nodes.get(t).in) for (let [u, d, p] of h) p && Hr(`The ${u}-hand id [${d}] is modified to traverse the group boundary, but the edge does not pass through two groups.`);
    this.edges.push({ lhsId: e, lhsDir: r, lhsInto: s, lhsGroup: n, rhsId: t, rhsDir: a, rhsInto: l, rhsGroup: i, title: o });
  }
  addLayoutHint(e) {
    e.members.length < 2 && Hr(`An align directive requires at least two members; got ${e.members.length}`);
    let t = /* @__PURE__ */ new Set();
    for (let r of e.members) this.registered.get(r) !== "node" && Hr(`align ${e.direction} references [${r}], which is not a service or junction`), t.has(r) && Hr(`align ${e.direction} lists [${r}] more than once`), t.add(r);
    this.layoutHints.push(e);
  }
};
function Gb(e, t) {
  e.accDescr && (t.accDescr = e.accDescr.replace(/\n\s+/g, `
`)), e.accTitle && (t.accTitle = e.accTitle.replace(/^\s+/g, "")), e.title && (t.title = e.title);
  for (let r of e.groups) t.addGroup(r);
  for (let r of e.services) t.addService(r);
  for (let r of e.junctions) t.addJunction(r);
  for (let r of e.edges) t.addEdge(r);
  for (let r of e.alignments) t.addLayoutHint({ direction: r.direction, members: [...r.members] });
}
var am = /* @__PURE__ */ new WeakMap();
function Hb(e) {
  let t = e.map((s, l) => l), r = [];
  for (let s = 0; s < 128; s++) {
    let l = String.fromCharCode(s);
    r.push(t.filter((n) => {
      let { pattern: i, first: o } = e[n];
      return typeof i == "string" ? i[0] === l : o === void 0 || o.includes(l);
    }));
  }
  let a = { starting: r, every: t, longer: e.map((s) => s.longer?.map((l) => e.indexOf(l))) };
  return am.set(e, a), a;
}
function Ar(e, t, r) {
  let a = [], s = [], l = [], n = new Uint8Array(t.length), { starting: i, every: o, longer: h } = am.get(t) ?? Hb(t), c = [], u = e.length, d = (g, y) => {
    if (n[g]) return -1;
    let b = t[g];
    if (b.match !== void 0) return b.match(e, y, a[a.length - 1] ?? -1);
    if (b.scanner !== void 0) return (c[g] ??= b.scanner())(e, y, a[a.length - 1] ?? -1);
    let x = b.pattern;
    return typeof x == "string" ? e.startsWith(x, y) ? y + x.length : -1 : (x.lastIndex = y, x.test(e) ? x.lastIndex : (b.opener !== void 0 && (b.opener.lastIndex = y, b.opener.test(e) && (n[g] = 1)), -1));
  }, p = 0;
  e: for (; p < u; ) {
    let g = e.charCodeAt(p);
    for (let y of g < 128 ? i[g] : o) {
      let b = d(y, p);
      if (b <= p) continue;
      let x = y, v = h[y];
      if (v !== void 0) for (let $ of v) {
        let S = d($, p);
        if (S > b) {
          x = $, b = S;
          break;
        }
      }
      t[x].hidden || (a.push(x), s.push(p), l.push(b)), p = b;
      continue e;
    }
    throw bt(r, e, p, "", !0);
  }
  return a.push(-1), s.push(u), l.push(u), { kinds: a, starts: s, ends: l, src: e };
}
var aa = { name: "ACC_DESCR", pattern: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/y, first: "	 a" }, Br = { name: "ACC_TITLE", pattern: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/y, first: "	 a" }, di = { name: "TITLE", pattern: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/y, first: "	 t" };
function fi(e) {
  return { ...di, pattern: new RegExp(String.raw`[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|(?!${e}))`, "y") };
}
var pl = { name: "STRING", pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/y, first: `"'` }, La = { name: "NEWLINE", pattern: /\r?\n/y, first: `\r
` }, Oa = { name: "WHITESPACE", pattern: /[\t ]+/y, hidden: !0, first: "	 " }, fr = { name: "YAML", pattern: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/y, hidden: !0, opener: /---[\t ]*\r?\n/y, first: "-" }, la = { name: "DIRECTIVE", pattern: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/y, hidden: !0, opener: /[\t ]*%%{/y, first: "	 %" }, ia = { name: "SINGLE_LINE_COMMENT", pattern: /[\t ]*%%[^\n\r]*/y, first: "	 %", hidden: !0 };
function Pr(e) {
  return { name: e, pattern: new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?:(?=%%)|(?!\\S))", "y"), first: e[0] };
}
var Ub = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/, Yb = /accTitle[\t ]*:([^\n\r]*)/, jb = /title([\t ][^\n\r]*|)/;
function Xf(e) {
  return e.trim().replace(/[\t ]{2,}/gm, " ");
}
function Er(e) {
  return Xf(jb.exec(e)[1]);
}
function Tr(e) {
  return Xf(Yb.exec(e)[1]);
}
function Cr(e) {
  let t = Ub.exec(e);
  return t[1] !== void 0 ? Xf(t[1]) : t[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, `
`);
}
var qb = /* @__PURE__ */ new Map([["b", "\b"], ["f", "\f"], ["n", `
`], ["r", "\r"], ["t", "	"], ["v", "\v"], ["0", "\0"]]);
function Fr(e) {
  if (!e.includes("\\")) return e.slice(1, -1);
  let t = "";
  for (let r = 1; r < e.length - 1; r++) {
    let a = e[r];
    if (a === "\\") {
      let s = e[++r];
      t += qb.get(s) ?? s;
    } else t += a;
  }
  return t;
}
var Sr = class {
  constructor(e, t, r) {
    this.tokens = e, this.types = t, this.diagram = r, this.kinds = e.kinds;
  }
  tokens;
  types;
  diagram;
  i = 0;
  kinds;
  get kind() {
    return this.kinds[this.i];
  }
  text(e = this.i) {
    return this.tokens.src.slice(this.tokens.starts[e], this.tokens.ends[e]);
  }
  take() {
    return this.text(this.i++);
  }
  accept(e) {
    return this.kinds[this.i] !== e ? !1 : (this.i++, !0);
  }
  expect(e) {
    return this.kinds[this.i] !== e && this.fail(`token of type '${this.types[e].name}'`), this.take();
  }
  fail(e) {
    let t = this.kind === -1 ? "end of input" : `\`${this.text()}\``, { src: r, starts: a, ends: s } = this.tokens, l = a[this.i];
    if (this.kind === -1) {
      let n = this.i;
      for (; n > 0 && r.slice(a[n - 1], s[n - 1]).trim() === ""; ) n--;
      n > 0 && (l = s[n - 1]);
    }
    throw bt(this.diagram, r, l, `Expecting ${e} but found ${t}.`);
  }
}, lm = { name: "ID", pattern: /[\w]([-\w]*\w)?/y };
function ya(e) {
  return { name: e, pattern: e, longer: [lm] };
}
var ap = [ya("architecture-beta"), ya("junction"), ya("service"), ya("column"), ya("group"), ya("align"), ya("row"), { name: "--", pattern: "--", longer: [fr] }, ya("in"), { name: ":", pattern: ":" }, { name: "-", pattern: "-", longer: [fr] }, { name: "ARROW_DIRECTION", pattern: /L|R|T|B/y }, { name: "ARROW_GROUP", pattern: /\{group\}/y }, { name: "ARROW_INTO", pattern: /<|>/y }, aa, Br, fi(String.raw`[-\w]*\w`), pl, lm, La, Oa, fr, la, ia, { name: "ARCH_ICON", pattern: /\([\w-:]+\)/y }, { name: "ARCH_TITLE", pattern: /\[(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[^\[\]\r\n]+)\]/y }];
function Vh(e) {
  let t = e.slice(1, -1).trim();
  return (t.startsWith('"') && t.endsWith('"') || t.startsWith("'") && t.endsWith("'")) && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'")), t.trim();
}
function Vb(e) {
  let t = new Sr(Ar(e, ap, "architecture"), ap, "architecture"), r = { $type: "Architecture", groups: [], services: [], junctions: [], edges: [], alignments: [] }, a = (l) => t.kinds[t.i] === l, s = () => {
    if (t.kind !== -1) for (t.kind !== 19 && t.fail("a line break or the end of input"); t.kind === 19; ) t.i++;
  };
  for (; t.kind === 19; ) t.i++;
  for (t.expect(0); t.kind !== -1; ) {
    switch (t.kind) {
      case 19:
        t.i++;
        continue;
      case 14:
        r.accDescr = Cr(t.take());
        break;
      case 15:
        r.accTitle = Tr(t.take());
        break;
      case 16:
        r.title = Er(t.take());
        break;
      case 4: {
        t.i++;
        let l = { $type: "Group", id: t.expect(18) };
        a(24) && (l.icon = t.take().slice(1, -1)), a(25) && (l.title = Vh(t.take())), t.accept(8) && (l.in = t.expect(18)), r.groups.push(l);
        break;
      }
      case 2: {
        t.i++;
        let l = { $type: "Service", id: t.expect(18) };
        a(17) ? l.iconText = Fr(t.take()) : a(24) && (l.icon = t.take().slice(1, -1)), a(25) && (l.title = Vh(t.take())), t.accept(8) && (l.in = t.expect(18)), r.services.push(l);
        break;
      }
      case 1: {
        t.i++;
        let l = { $type: "Junction", id: t.expect(18) };
        t.accept(8) && (l.in = t.expect(18)), r.junctions.push(l);
        break;
      }
      case 18: {
        let l = t.take(), n = t.accept(12);
        t.expect(9);
        let i = t.expect(11), o = t.accept(13), h;
        t.accept(7) || (a(10) || t.fail("'--' or '-'"), t.i++, h = Vh(t.expect(25)), t.expect(10));
        let c = t.accept(13), u = t.expect(11);
        t.expect(9);
        let d = t.expect(18), p = t.accept(12);
        r.edges.push({ $type: "Edge", lhsId: l, lhsGroup: n, lhsDir: i, lhsInto: o, title: h, rhsInto: c, rhsDir: u, rhsId: d, rhsGroup: p });
        break;
      }
      case 5: {
        t.i++, !a(6) && !a(3) && t.fail("'row' or 'column'");
        let l = t.take(), n = [t.expect(18), t.expect(18)];
        for (; a(18); ) n.push(t.take());
        r.alignments.push({ $type: "Alignment", direction: l, members: n });
        break;
      }
      default:
        t.fail("a group, a service, a junction, an edge, an alignment, a title, or a line break");
    }
    s();
  }
  return r;
}
var Kb = /* @__PURE__ */ new Map([["database", "M4 6a8 3 0 1 0 16 0a8 3 0 1 0-16 0M4 6v12a8 3 0 0 0 16 0V6M4 12a8 3 0 0 0 16 0"], ["server", "M3 4h18v7H3zM3 13h18v7H3zM7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6"], ["disk", "M5 3h14v18H5zM12 6.5a4 4 0 1 0 0 8a4 4 0 1 0 0-8M12 10.5h.01M8 18h3"], ["internet", "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 12h18M12 3a13 13 0 0 0 0 18M12 3a13 13 0 0 1 0 18"], ["cloud", "M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5z"]]);
function Xb(e) {
  let t = Kb.get(e);
  return t === void 0 ? "" : `<path d="${t}" stroke="var(--_fg)" stroke-width="1.5"/>`;
}
var Mi = [-1, 1, 0, 0], en = [0, 0, -1, 1];
function So(e) {
  return e === "L" ? 0 : e === "R" ? 1 : e === "T" ? 2 : 3;
}
var lp = 64, tn = 2 ** 25, ip = 2 ** 26;
function Zb(e, t, r, a) {
  let s = e.length, l = t.length, n = l, i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), h = new Int32Array(s + l).fill(n), c = new Int32Array(l + 1), u = [];
  for (let H = 0; H <= l; H++) u.push([]);
  t.forEach((H, te) => {
    o.set(H.id, te);
    let Q = H.in === void 0 ? void 0 : o.get(H.in);
    Q !== void 0 && Q !== te ? (h[s + te] = Q, c[te] = c[Q] + 1) : c[te] = 1;
  }), e.forEach((H, te) => {
    i.set(H.id, te);
    let Q = H.in === void 0 ? void 0 : o.get(H.in);
    Q !== void 0 && (h[te] = Q), u[h[te]].push(te);
  });
  for (let H = 0; H < l; H++) u[h[s + H]].push(s + H);
  let d = [], p = [], g = [], y = [], b = [], x = [], v = new Array(s + l), $ = new Array(s + l), S = (H, te, Q, L, X) => {
    if (H === te) return;
    let le = H, J = te, V = h[H], Z = h[te];
    for (; V !== Z; ) c[V] >= c[Z] ? (le = s + V, V = h[le]) : (J = s + Z, Z = h[J]);
    let ae = d.length;
    d.push(H), p.push(te), g.push(Q), y.push(L), b.push(le), x.push(J), (X[le] ??= []).push(ae), (X[J] ??= []).push(ae);
  };
  for (let H of a) {
    let te = H.direction === "row";
    for (let Q = 1; Q < H.members.length; Q++) {
      let L = i.get(H.members[Q - 1]), X = i.get(H.members[Q]);
      L !== void 0 && X !== void 0 && S(L, X, te ? 1 : 3, te ? 0 : 2, v);
    }
  }
  for (let H of [!1, !0]) for (let te of r) {
    if (te.lhsDir === te.rhsDir !== H) continue;
    let Q = i.get(te.lhsId), L = i.get(te.rhsId);
    Q !== void 0 && L !== void 0 && S(Q, L, So(te.lhsDir), So(te.rhsDir), $);
  }
  let R = new Int32Array(s + l), D = new Int32Array(s + l), O = new Int32Array(s + l).fill(1), U = new Int32Array(s + l).fill(1), q = new Uint8Array(s + l), C = [], ee = /* @__PURE__ */ new Map(), ie = [], G = /* @__PURE__ */ new Map(), z = 0, _ = 0, T = 0, E = (H, te) => {
    _ = 0, T = 0;
    for (let Q = H; Q !== te; Q = s + h[Q]) _ += R[Q], T += D[Q];
  }, M = (H, te, Q) => {
    if (R[H] = te, D[H] = Q, q[H] = 1, C.push(H), O[H] * U[H] > lp) {
      ie.push(H);
      return;
    }
    for (let L = Q; L < Q + U[H]; L++) for (let X = te; X < te + O[H]; X++) ee.set((X + tn) * ip + L + tn, H);
  }, A = (H, te, Q, L, X) => R[H] < te + L && te < R[H] + O[H] && D[H] < Q + X && Q < D[H] + U[H], m = (H, te, Q, L) => {
    if (Q * L > lp) {
      for (let X = z; X < C.length; X++) if (A(C[X], H, te, Q, L)) return C[X];
      return -1;
    }
    for (let X = te; X < te + L; X++) for (let le = H; le < H + Q; le++) {
      let J = ee.get((le + tn) * ip + X + tn);
      if (J !== void 0) return J;
    }
    for (let X of ie) if (A(X, H, te, Q, L)) return X;
    return -1;
  }, I = (H, te, Q, L, X, le) => {
    let J = `${H},${te},${Q},${L},${X},${le}`, V = G.get(J) ?? 0;
    for (; ; ) {
      let Z = m(H + V * X, te + V * le, Q, L);
      if (Z < 0) break;
      V = X > 0 ? R[Z] + O[Z] - H : X < 0 ? H + Q - R[Z] : le > 0 ? D[Z] + U[Z] - te : te + L - D[Z];
    }
    return G.set(J, V), V;
  }, k = (H, te) => {
    let Q = b[te] === H, L = Q ? x[te] : b[te];
    if (q[L]) return;
    let X = Q ? g[te] : y[te], le = Q ? y[te] : g[te];
    E(Q ? d[te] : p[te], H);
    let J = _, V = T;
    E(Q ? p[te] : d[te], L);
    let Z = Mi[X], ae = en[X], oe = 0, ue = 0, he = Mi[X] + Mi[le] === 0 && en[X] + en[le] === 0;
    X === le ? (Z = Mi[X] === 0 ? 1 : 0, ae = 1 - Z) : he || (oe = -Mi[le], ue = -en[le]);
    let re, P;
    if (Z !== 0 ? (re = Z > 0 ? R[H] + O[H] : R[H] - O[L], P = D[H] + V + ue - T) : (P = ae > 0 ? D[H] + U[H] : D[H] - U[L], re = R[H] + J + oe - _), he) {
      let ne = $[L];
      if (ne !== void 0 && ne.length > 1) {
        let Ae = [];
        for (let Ee of ne) {
          let me = x[Ee] === L, we = me ? b[Ee] : x[Ee];
          if (!q[we] || (me ? g[Ee] : y[Ee]) !== X || (me ? y[Ee] : g[Ee]) !== le) continue;
          E(me ? d[Ee] : p[Ee], we);
          let Se = Z !== 0 ? D[we] + T : R[we] + _;
          E(me ? p[Ee] : d[Ee], L), Ae.push(Se - (Z !== 0 ? T : _));
        }
        Ae.length > 1 && (Ae.sort((Ee, me) => Ee - me), Z !== 0 ? P = Ae[Ae.length - 1 >> 1] : re = Ae[Ae.length - 1 >> 1]);
      }
      let ce = Z === 0 ? 1 : 0, pe = 1 - ce, Me = I(re, P, O[L], U[L], ce, pe), xe = Me === 0 ? 0 : I(re, P, O[L], U[L], -ce, -pe), ve = Me <= xe ? Me : -xe;
      re += ce * ve, P += pe * ve;
    } else {
      let ne = I(re, P, O[L], U[L], Z, ae);
      re += Z * ne, P += ae * ne;
    }
    M(L, re, P);
  }, w = (H) => {
    let te = u[H];
    if (te.length === 0) return;
    C.length = 0;
    let Q = [];
    for (let ne of te) {
      if (q[ne]) continue;
      z = C.length, Q.push(z), ee.clear(), ie.length = 0, G.clear(), M(ne, 0, 0);
      let ce = z, pe = z, Me = 0;
      for (; ; ) {
        if (ce < C.length) {
          let ve = C[ce++], Ae = v[ve];
          if (Ae !== void 0) for (let Ee of Ae) k(ve, Ee);
          continue;
        }
        if (pe >= C.length) break;
        let xe = $[C[pe]];
        if (xe === void 0 || Me >= xe.length) {
          pe++, Me = 0;
          continue;
        }
        k(C[pe], xe[Me++]);
      }
    }
    Q.push(C.length);
    let L = Q.length - 1, X = new Array(L), le = new Array(L), J = new Array(L), V = new Array(L), Z = 0, ae = 0;
    for (let ne = 0; ne < L; ne++) {
      let ce = 1 / 0, pe = 1 / 0, Me = -1 / 0, xe = -1 / 0;
      for (let ve = Q[ne]; ve < Q[ne + 1]; ve++) {
        let Ae = C[ve];
        ce = Math.min(ce, R[Ae]), pe = Math.min(pe, D[Ae]), Me = Math.max(Me, R[Ae] + O[Ae]), xe = Math.max(xe, D[Ae] + U[Ae]);
      }
      X[ne] = ce, le[ne] = pe, J[ne] = Me - ce, V[ne] = xe - pe, Z += J[ne] * V[ne], ae = Math.max(ae, J[ne]);
    }
    let oe = Math.max(ae, Math.ceil(Math.sqrt(Z * 2))), ue = 0, he = 0, re = 0, P = 0;
    for (let ne = 0; ne < L; ne++) {
      ue > 0 && ue + J[ne] > oe && (he += re, ue = 0, re = 0);
      for (let ce = Q[ne]; ce < Q[ne + 1]; ce++) R[C[ce]] += ue - X[ne], D[C[ce]] += he - le[ne];
      ue += J[ne], re = Math.max(re, V[ne]), P = Math.max(P, ue);
    }
    H < l && (O[s + H] = P, U[s + H] = he + re);
  };
  for (let H = l - 1; H >= 0; H--) w(H);
  w(n);
  let B = new Int32Array(l), N = new Int32Array(l), j = new Int32Array(l), F = new Uint8Array(l);
  for (let H = 0; H < l; H++) {
    let te = h[s + H];
    j[H] = te === n ? -1 : te, B[H] = R[s + H] + (te === n ? 0 : B[te]), N[H] = D[s + H] + (te === n ? 0 : N[te]), u[H].length === 0 && (F[H] = 1);
  }
  let Y = new Int32Array(s), W = new Int32Array(s), K = new Int32Array(s);
  for (let H = 0; H < s; H++) {
    let te = h[H];
    K[H] = te === n ? -1 : te, Y[H] = R[H] + (te === n ? 0 : B[te]), W[H] = D[H] + (te === n ? 0 : N[te]);
  }
  return { col: Y, row: W, groupCol: B, groupRow: N, groupCols: O.slice(s), groupRows: U.slice(s), groupParent: j, groupEmpty: F, nodeParent: K };
}
var ir = 12, Qb = 6, sp = 4, np = 3, Jb = [-1, 1, 0, 0], eM = [0, 0, -1, 1];
function Kh(e, t, r, a, s) {
  let l = e.architecture, n = l !== null && typeof l == "object" && !Array.isArray(l) ? l[t] : void 0;
  return typeof n == "number" && Number.isFinite(n) ? Math.min(s, Math.max(a, n)) : r;
}
function op(e) {
  let t = /* @__PURE__ */ new Map();
  for (let r of e.sort((a, s) => a - s)) t.has(r) || t.set(r, t.size);
  return t;
}
function hp(e, t, r, a, s) {
  return `<svg class="pele-icon" data-icon="${Ye(e)}" x="${f(t)}" y="${f(r)}" width="${f(a)}" height="${f(a)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s?.(e) ?? Xb(e)}</svg>`;
}
function tM(e, t, r, a) {
  let s = e.lines.length > r;
  if (!s && e.width <= t) return e;
  let l = a.width("…", e.size, 0), n = [], i = [], o = 0;
  for (let h = 0; h < Math.min(r, e.lines.length); h++) {
    let c = e.lines[h].map((d) => ({ ...d })), u = e.widths[h];
    if (u > t || s && h === r - 1) for (; ; ) {
      let d = c[c.length - 1];
      if (d === void 0) {
        c.push({ text: "…", style: 0, width: l }), u = l;
        break;
      }
      let p = u - d.width;
      if (d.icon === void 0 && p + l < t) {
        let g = 0, y = d.text.length;
        for (; g < y; ) {
          let x = g + y + 1 >> 1;
          p + a.width(d.text.slice(0, x), e.size, d.style) + l <= t ? g = x : y = x - 1;
        }
        let b = g > 0 ? d.text.charCodeAt(g - 1) : 0;
        b >= 55296 && b <= 56319 && g--, d.text = d.text.slice(0, g).trimEnd() + "…", d.width = a.width(d.text, e.size, d.style), u = p + d.width;
        break;
      }
      c.pop(), u = p;
    }
    n.push(c), i.push(u), o = Math.max(o, u);
  }
  return { ...e, lines: n, widths: i, width: o, height: n.length * e.lineHeight };
}
function rM(e, t) {
  let { x: r, y: a, dx: s, dy: l } = e, { x: n, y: i, dx: o, dy: h } = t, c = r + s * ir, u = a + l * ir, d = n + o * ir, p = i + h * ir;
  if (s * o + l * h === 0) {
    let x = s !== 0 ? n : r, v = s !== 0 ? a : i;
    return (x - r) * s + (v - a) * l > 0 && (x - n) * o + (v - i) * h > 0 ? [r, a, x, v, n, i] : s !== 0 ? [r, a, c, u, c, p, d, p, n, i] : [r, a, c, u, d, u, d, p, n, i];
  }
  let g = s !== 0, y = g ? i - a : n - r;
  if (s === -o && l === -h) {
    if ((n - r) * s + (i - a) * l > 0) {
      if (Math.abs(y) < 0.5) return [r, a, n, i];
      if (g) {
        let S = s > 0 ? e.x1 : t.x1, R = s > 0 ? t.x0 : e.x0, D = S < R ? (S + R) / 2 : (r + n) / 2;
        return [r, a, D, a, D, i, n, i];
      }
      let x = l > 0 ? e.y1 : t.y1, v = l > 0 ? t.y0 : e.y0, $ = x < v ? (x + v) / 2 : (a + i) / 2;
      return [r, a, r, $, n, $, n, i];
    }
  } else if (Math.abs(y) >= 1) {
    if (g) {
      let v = s > 0 ? Math.max(r, n) + ir : Math.min(r, n) - ir;
      return [r, a, v, a, v, i, n, i];
    }
    let x = l > 0 ? Math.max(a, i) + ir : Math.min(a, i) - ir;
    return [r, a, r, x, n, x, n, i];
  }
  if (g) {
    let x = e.y1 + ir <= t.y0 ? (e.y1 + t.y0) / 2 : t.y1 + ir <= e.y0 ? (t.y1 + e.y0) / 2 : Math.max(e.y1, t.y1) + ir;
    return [r, a, c, a, c, x, d, x, d, i, n, i];
  }
  let b = e.x1 + ir <= t.x0 ? (e.x1 + t.x0) / 2 : t.x1 + ir <= e.x0 ? (t.x1 + e.x0) / 2 : Math.max(e.x1, t.x1) + ir;
  return [r, a, r, u, b, u, b, p, n, p, n, i];
}
function aM(e) {
  let t = [e[0], e[1]];
  for (let r = 2; r < e.length; r += 2) {
    let a = e[r], s = e[r + 1], l = t.length, n = Math.abs(a - t[l - 2]) < 0.01, i = Math.abs(s - t[l - 1]) < 0.01;
    n && i || (l >= 4 && (n && Math.abs(t[l - 4] - t[l - 2]) < 0.01 || i && Math.abs(t[l - 3] - t[l - 1]) < 0.01) ? (t[l - 2] = a, t[l - 1] = s) : t.push(a, s));
  }
  return t;
}
function lM(e, t, r) {
  let a = e.length / 2, s = new Array(a), l = new Array(a);
  for (let o = 0; o < a; o++) s[o] = e[o * 2], l[o] = e[o * 2 + 1];
  let n = (o, h, c) => {
    let u = Math.hypot(s[h] - s[o], l[h] - l[o]), d = Math.min(c, Math.max(0, u - 1));
    u > 0 && d > 0 && (s[o] += (s[h] - s[o]) / u * d, l[o] += (l[h] - l[o]) / u * d);
  };
  n(0, 1, t), n(a - 1, a - 2, r);
  let i = `M${f(s[0])},${f(l[0])}`;
  for (let o = 1; o < a - 1; o++) {
    let h = Math.hypot(s[o] - s[o - 1], l[o] - l[o - 1]), c = Math.hypot(s[o + 1] - s[o], l[o + 1] - l[o]), u = Math.min(Qb, h / 2, c / 2);
    if (u < 0.5) {
      i += `L${f(s[o])},${f(l[o])}`;
      continue;
    }
    let d = s[o] - (s[o] - s[o - 1]) / h * u, p = l[o] - (l[o] - l[o - 1]) / h * u, g = s[o] + (s[o + 1] - s[o]) / c * u, y = l[o] + (l[o + 1] - l[o]) / c * u;
    i += `L${f(d)},${f(p)}Q${f(s[o])},${f(l[o])} ${f(g)},${f(y)}`;
  }
  return i + `L${f(s[a - 1])},${f(l[a - 1])}`;
}
function iM(e, t, r) {
  return Da(r, (a) => sM(e, t, r, a));
}
function sM(e, t, r, a) {
  let s = Kh(t, "iconSize", 48, 8, 512), l = Kh(t, "fontSize", r.fontSize ?? 16, 4, 128), n = Math.min(Kh(t, "padding", 20, 0, 256), a ? 12 : 1 / 0), i = Math.round(l * 0.875), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = r.padding ?? 8, c = r.icons, u = s / 2, d = [...e.nodes.values()], p = [...e.groups.values()], g = d.length, y = p.length, b = Zb(d, p, e.edges, e.layoutHints), x = /* @__PURE__ */ new Map();
  d.forEach((fe, Ce) => x.set(fe.id, Ce));
  let v = new Array(g), $ = new Float64Array(g), S = new Float64Array(g), R = a ? Math.max(s, 64) : Math.max(s * 2.25, 96);
  for (let fe = 0; fe < g; fe++) {
    let Ce = d[fe], Fe = je(Ce.type === "service" ? Ce.title : void 0, !0, o, l, R);
    v[fe] = Fe, $[fe] = Math.max(s, 2 * Math.ceil(Fe.width / 2)), S[fe] = s + (Fe.height > 0 ? sp + Fe.height : 0);
  }
  let D = [], O = [];
  for (let fe = 0; fe < g; fe++) D.push(b.col[fe]), O.push(b.row[fe]);
  for (let fe = 0; fe < y; fe++) b.groupEmpty[fe] && (D.push(b.groupCol[fe]), O.push(b.groupRow[fe]));
  let U = op(D), q = op(O), C = U.size, ee = q.size, ie = new Float64Array(C), G = new Float64Array(ee), z = a ? Math.max(24, 2 * ir) : Math.max(40, Math.round(s * 0.75)), _ = new Float64Array(C).fill(z), T = new Float64Array(ee).fill(z), E = new Int32Array(g), M = new Int32Array(g);
  for (let fe = 0; fe < g; fe++) {
    let Ce = E[fe] = U.get(b.col[fe]), Fe = M[fe] = q.get(b.row[fe]);
    ie[Ce] = Math.max(ie[Ce], $[fe]), G[Fe] = Math.max(G[Fe], S[fe]);
  }
  for (let fe = 0; fe < y; fe++) {
    if (!b.groupEmpty[fe]) continue;
    let Ce = U.get(b.groupCol[fe]), Fe = q.get(b.groupRow[fe]);
    ie[Ce] = Math.max(ie[Ce], s), G[Fe] = Math.max(G[Fe], u);
  }
  let A = e.edges.length, m = new Array(A), I = new Int32Array(A * 2);
  for (let fe = 0; fe < A; fe++) {
    let Ce = e.edges[fe], Fe = I[fe * 2] = x.get(Ce.lhsId) ?? -1, He = I[fe * 2 + 1] = x.get(Ce.rhsId) ?? -1, We = je(Ce.title, !0, o, i, 160);
    if (m[fe] = We, !(We.width === 0 || Fe < 0 || He < 0)) {
      if (E[Fe] !== E[He]) {
        let Le = Math.min(E[Fe], E[He]);
        _[Le] = Math.max(_[Le], Math.ceil(We.width) + 28);
      } else if (ie[E[Fe]] = Math.max(ie[E[Fe]], 2 * Math.ceil(We.width / 2) + 8), M[Fe] !== M[He]) {
        let Le = Math.min(M[Fe], M[He]);
        T[Le] = Math.max(T[Le], Math.ceil(We.height) + 24);
      }
    }
  }
  let k = new Array(y), w = new Int32Array(y), B = new Int32Array(y), N = new Int32Array(y), j = new Int32Array(y), F = new Float64Array(y), Y = new Float64Array(y), W = new Float64Array(y), K = new Float64Array(y), H = new Float64Array(y), te = new Float64Array(y), Q = new Float64Array(C), L = new Float64Array(C), X = new Float64Array(ee), le = new Float64Array(ee), J = Math.round(l * 1.25);
  for (let fe = 0; fe < y; fe++) {
    w[fe] = U.get(b.groupCol[fe]), B[fe] = U.get(b.groupCol[fe] + b.groupCols[fe] - 1), N[fe] = q.get(b.groupRow[fe]), j[fe] = q.get(b.groupRow[fe] + b.groupRows[fe] - 1);
    let Ce = je(p[fe].title, !0, o, l, a ? Math.max(80, Qt(r) / 2) : 320);
    k[fe] = Ce;
    let Fe = p[fe].icon ? J : 0;
    H[fe] = Ce.width + Fe + (Ce.width > 0 && Fe > 0 ? 6 : 0), te[fe] = Math.max(Ce.height, Fe);
  }
  for (let fe = y - 1; fe >= 0; fe--) {
    let Ce = n + F[fe], Fe = n + Y[fe], He = (te[fe] > 0 ? Math.max(n, te[fe] + 12) : n) + W[fe], We = n + K[fe];
    if (H[fe] > 0) {
      let et = Ce + Fe;
      for (let _e = w[fe]; _e <= B[fe]; _e++) et += ie[_e] + (_e < B[fe] ? L[_e] + _[_e] + Q[_e + 1] : 0);
      H[fe] + 20 > et && (Fe += Math.ceil(H[fe] + 20 - et));
    }
    F[fe] = Ce, Y[fe] = Fe, W[fe] = He, K[fe] = We, Q[w[fe]] = Math.max(Q[w[fe]], Ce), L[B[fe]] = Math.max(L[B[fe]], Fe), X[N[fe]] = Math.max(X[N[fe]], He), le[j[fe]] = Math.max(le[j[fe]], We);
    let Le = b.groupParent[fe];
    Le < 0 || (w[Le] === w[fe] && (F[Le] = Math.max(F[Le], Ce)), B[Le] === B[fe] && (Y[Le] = Math.max(Y[Le], Fe)), N[Le] === N[fe] && (W[Le] = Math.max(W[Le], He)), j[Le] === j[fe] && (K[Le] = Math.max(K[Le], We)));
  }
  let V = new Float64Array(C), Z = new Float64Array(ee), ae = 0;
  for (let fe = 0; fe < C; fe++) V[fe] = ae + Q[fe], ae = V[fe] + ie[fe] + L[fe] + (fe < C - 1 ? _[fe] : 0);
  let oe = 0;
  for (let fe = 0; fe < ee; fe++) Z[fe] = oe + X[fe], oe = Z[fe] + G[fe] + le[fe] + (fe < ee - 1 ? T[fe] : 0);
  let ue = 0, he = 0, re = ae, P = oe, ne = (fe) => V[w[fe]] - F[fe], ce = (fe) => V[B[fe]] + ie[B[fe]] + Y[fe], pe = (fe) => Z[N[fe]] - W[fe], Me = (fe) => Z[j[fe]] + G[j[fe]] + K[fe], xe = (fe) => V[E[fe]] + ie[E[fe]] / 2, ve = (fe, Ce, Fe) => {
    let He = Jb[Ce], We = eM[Ce], Le = xe(fe), et = Z[M[fe]], _e = { x: Le, y: et + u, dx: He, dy: We, x0: Le - $[fe] / 2, y0: et, x1: Le + $[fe] / 2, y1: et + S[fe], gap: 0, wire: !1 };
    d[fe].type === "junction" ? (_e.x0 = _e.x1 = Le, _e.y0 = _e.y1 = _e.y, _e.gap = np) : He !== 0 ? _e.x = Le + He * u : _e.y = We < 0 ? et : et + S[fe] + (v[fe].height > 0 ? 2 : 0);
    let Ve = Fe ? b.nodeParent[fe] : -1;
    return Ve >= 0 && (_e.x0 = ne(Ve), _e.x1 = ce(Ve), _e.y0 = pe(Ve), _e.y1 = Me(Ve), _e.gap = 0, _e.wire = d[fe].type === "junction", He !== 0 ? _e.x = He < 0 ? _e.x0 : _e.x1 : _e.y = We < 0 ? _e.y0 : _e.y1), _e;
  }, Ae = "", Ee = "", me = [], we = Ct("arrow_point");
  for (let fe = 0; fe < A; fe++) {
    let Ce = e.edges[fe], Fe = I[fe * 2], He = I[fe * 2 + 1];
    if (Fe < 0 || He < 0) continue;
    let We = ve(Fe, So(Ce.lhsDir), Ce.lhsGroup), Le = ve(He, So(Ce.rhsDir), Ce.rhsGroup);
    We.x === Le.x && We.y === Le.y && We.dx === Le.dx && (We.x -= 8 * Math.abs(We.dy), We.y -= 8 * Math.abs(We.dx), Le.x += 8 * Math.abs(We.dy), Le.y += 8 * Math.abs(We.dx));
    let et = rM(We, Le);
    We.wire && et.unshift(xe(Fe), Z[M[Fe]] + u), Le.wire && et.push(xe(He), Z[M[He]] + u);
    let _e = aM(et);
    if (_e.length < 4) continue;
    let Ve = Ye(`${Ce.lhsId}-${Ce.rhsId}`);
    Ae += `<g class="pele-edge" data-id="${Ve}"><path d="${lM(_e, Ce.lhsInto && !We.wire ? we + We.gap : 0, Ce.rhsInto && !Le.wire ? we + Le.gap : 0)}"/>` + (Ce.lhsInto ? St("arrow_point", We.x + We.dx * We.gap, We.y + We.dy * We.gap, -We.dx, -We.dy, "var(--_l)") : "") + (Ce.rhsInto ? St("arrow_point", Le.x + Le.dx * Le.gap, Le.y + Le.dy * Le.gap, -Le.dx, -Le.dy, "var(--_l)") : "") + "</g>";
    let Ze = -1, tt = -1, ct = -1, ge = -1, De = m[fe];
    for (let Re = 0; Re < _e.length; Re += 2) ue = Math.min(ue, _e[Re] - 4), re = Math.max(re, _e[Re] + 4), he = Math.min(he, _e[Re + 1] - 4), P = Math.max(P, _e[Re + 1] + 4);
    for (let Re = 0; Re + 3 < _e.length; Re += 2) {
      let Ue = Math.abs(_e[Re + 1] - _e[Re + 3]) < 0.01, Ge = Math.abs(_e[Re] - _e[Re + 2]) + Math.abs(_e[Re + 1] - _e[Re + 3]);
      Ue || me.push(_e[Re], Math.min(_e[Re + 1], _e[Re + 3]), Math.max(_e[Re + 1], _e[Re + 3])), Ge > tt && (Ze = Re, tt = Ge), Ue && Ge > ge && (ct = Re, ge = Ge);
    }
    if (De.width > 0) {
      let Re = ge >= De.width + 8 ? ct : Ze, Ue = (_e[Re] + _e[Re + 2]) / 2, Ge = (_e[Re + 1] + _e[Re + 3]) / 2, qe = De.width + 8, Je = Math.abs(_e[Re] - _e[Re + 2]) < 0.01;
      for (let Ne of [We, Le]) Ue + qe / 2 <= Ne.x0 || Ue - qe / 2 >= Ne.x1 || Ge + De.height / 2 <= Ne.y0 || Ge - De.height / 2 >= Ne.y1 || (Je ? Ue = Ue >= (Ne.x0 + Ne.x1) / 2 ? Ne.x1 + qe / 2 + 4 : Ne.x0 - qe / 2 - 4 : Ge = Ge >= (Ne.y0 + Ne.y1) / 2 ? Ne.y1 + De.height / 2 + 4 : Ne.y0 - De.height / 2 - 4);
      ue = Math.min(ue, Ue - qe / 2), re = Math.max(re, Ue + qe / 2), he = Math.min(he, Ge - De.height / 2), P = Math.max(P, Ge + De.height / 2), Ee += ga(`${Ce.lhsId}-${Ce.rhsId}`, De, Ue, Ge, "", c);
    }
  }
  let Se = "";
  for (let fe = 0; fe < y; fe++) {
    let Ce = p[fe], Fe = ne(fe), He = pe(fe), We = ce(fe) - Fe, Le = k[fe], et = "";
    if (H[fe] > 0) {
      let _e = He + te[fe] + 12, Ve = [];
      for (let ge = 0; ge < me.length; ge += 3) me[ge + 1] < _e && me[ge + 2] > He && me[ge] > Fe && me[ge] < Fe + We && Ve.push(me[ge]);
      Ve.sort((ge, De) => ge - De), Ve.push(Fe + We - 4);
      let Ze = Fe + 10;
      for (let ge of Ve) {
        if (ge - 6 - Ze >= H[fe]) break;
        Ze = Math.max(Ze, ge + 6);
      }
      Ze + H[fe] > Fe + We - 4 && (Ze = Fe + 10);
      let tt = He + 6 + te[fe] / 2, ct = Ze;
      Ce.icon && (et += hp(Ce.icon, Ze, tt - J / 2, J, c), ct += J + 6), et += Pe(Le, ct + Le.width / 2, tt, ' class="pele-cluster-label" fill="var(--_m)"', c);
    }
    Se += `<g class="pele-cluster" data-id="${Ye(Ce.id)}"><rect x="${f(Fe)}" y="${f(He)}" width="${f(We)}" height="${f(Me(fe) - He)}" fill="var(--_a)" fill-opacity="0.5" stroke="var(--_b)"${wt}/>` + et + "</g>";
  }
  let se = "", ye = s * 0.5, ke = Math.max(6, Math.round(l * 0.75));
  for (let fe = 0; fe < g; fe++) {
    let Ce = d[fe], Fe = `data-id="${Ye(Ce.id)}" transform="translate(${f(xe(fe))},${f(Z[M[fe]])})"`;
    if (Ce.type === "junction") {
      se += `<g class="pele-node pele-junction" ${Fe}><circle cy="${f(u)}" r="${np}" fill="var(--_l)"/></g>`;
      continue;
    }
    let He = "";
    if (Ce.icon) He = hp(Ce.icon, -ye / 2, (s - ye) / 2, ye, c);
    else if (Ce.iconText) {
      let We = je(Ce.iconText, !1, o, ke, s - 8), Le = Math.max(1, Math.floor((s - 4) / (We.lineHeight || 1)));
      He = Pe(tM(We, s - 8, Le, o), 0, u, ` class="pele-icon-text" font-size="${ke}"`, c);
    }
    se += `<g class="pele-node pele-service" ${Fe}><rect x="${f(-u)}" width="${f(s)}" height="${f(s)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>` + He + Pe(v[fe], 0, s + sp + v[fe].height / 2, ' class="pele-label"', c) + "</g>";
  }
  let $e = je(e.title, !1, o, l, a ? Qt(r) : 4e3, 1), be = $e.height > 0 ? $e.height + 12 : 0, Ie = Math.ceil(Math.max(re - ue, $e.width) + 2 * h), ze = Math.ceil(P - he + be + 2 * h), Oe = Math.round((Ie - (re - ue)) / 2 - ue), de = Math.round(h + be - he), Te = (Se ? `<g class="pele-clusters">${Se}</g>` : "") + (Ae ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round" stroke-linejoin="round">${Ae}</g>` : "") + (Ee ? `<g class="pele-edge-labels" font-size="${i}">${Ee}</g>` : "") + (se ? `<g class="pele-nodes">${se}</g>` : "");
  return { svg: xt("architecture", Ie, ze, l, r, e, Pe($e, Ie / 2, h + $e.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (Te ? `<g transform="translate(${Oe},${de})">${Te}</g>` : "")), width: Ie, height: ze, links: [] };
}
var nM = { type: "architecture", parse(e, t, r) {
  let a = new Bb();
  return r && (a.title = r), Gb(Vb(e), a), a;
}, render: iM }, cp = 1e5;
function oM(e) {
  switch (e) {
    case "[]":
      return "square";
    case "()":
      return "round";
    case "(())":
      return "circle";
    case ">]":
      return "rect_left_inv_arrow";
    case "{}":
      return "diamond";
    case "{{}}":
      return "hexagon";
    case "([])":
      return "stadium";
    case "[[]]":
      return "subroutine";
    case "[()]":
      return "cylinder";
    case "((()))":
      return "doublecircle";
    case "[//]":
      return "lean_right";
    case "[\\\\]":
      return "lean_left";
    case "[/\\]":
      return "trapezoid";
    case "[\\/]":
      return "inv_trapezoid";
    case "<[]>":
      return "block_arrow";
    default:
      return "na";
  }
}
function hM(e) {
  switch (e.trim().slice(-1)) {
    case "x":
      return "arrow_cross";
    case "o":
      return "arrow_circle";
    case ">":
      return "arrow_point";
    default:
      return "";
  }
}
function cM(e) {
  switch (e.trim().charAt(0)) {
    case "x":
      return "arrow_cross";
    case "o":
      return "arrow_circle";
    case "<":
      return "arrow_point";
    default:
      return "arrow_open";
  }
}
function dM(e) {
  return e.includes("==") ? "thick" : "normal";
}
function fM(e) {
  return e.includes(".-") ? "dotted" : "solid";
}
function dp(e, t) {
  let r = e.flat(), a = -1;
  for (let s of r) if (s.type === "column-setting") {
    a = s.columns ?? -1;
    break;
  }
  return { list: r, at: 0, parent: t, children: [], columns: a };
}
var uM = class {
  type = "block";
  title;
  root = { id: "root", type: "composite", children: [], columns: -1 };
  blocks = [];
  edges = [];
  classes = /* @__PURE__ */ new Map();
  byId = /* @__PURE__ */ new Map();
  typeStr2Type = oM;
  edgeStrToEdgeData = hM;
  edgeStrToEdgeStartData = cM;
  edgeStrToThickness = dM;
  edgeStrToPattern = fM;
  warn;
  pending = /* @__PURE__ */ new Set();
  edgeCount = /* @__PURE__ */ new Map();
  ids = 0;
  colors = 0;
  spaces = 0;
  constructor(e = {}) {
    this.warn = e.warn;
  }
  generateId() {
    return "id-" + ++this.ids;
  }
  addStyleClass(e, t = "") {
    let r = this.classes.get(e);
    r || (r = { id: e, styles: [], textStyles: [] }, this.classes.set(e, r));
    for (let a of t.split(",")) {
      let s = a.indexOf(";"), l = (s === -1 ? a : a.slice(0, s) + a.slice(s + 1)).trim();
      a.includes("color") && r.textStyles.push(l.replace("fill", "bgFill").replace("color", "fill")), r.styles.push(l);
    }
  }
  addStyle2Node(e, t = "") {
    this.named(e).styles = t.split(",");
  }
  setCssClass(e, t) {
    for (let r of e.split(",")) (this.named(r.trim()).classes ??= []).push(t);
  }
  named(e) {
    let t = this.byId.get(e);
    return t === void 0 && (t = { id: e, type: "na", children: [] }, this.byId.set(e, t), this.pending.add(e)), t;
  }
  setHierarchy(e) {
    let t = [dp(e, this.root)];
    for (; t.length > 0; ) {
      let r = t[t.length - 1];
      if (r.at === r.list.length) {
        r.parent.children = r.children, t.pop();
        continue;
      }
      let a = r.list[r.at++];
      switch (r.columns > 0 && a.type !== "column-setting" && typeof a.widthInColumns == "number" && a.widthInColumns > r.columns && this.warn?.(`Block ${a.id} width ${a.widthInColumns} exceeds configured column width ${r.columns}`), a.type) {
        case "classDef":
          this.addStyleClass(a.id, a.css);
          continue;
        case "applyClass":
          this.setCssClass(a.id, a.styleClass ?? "");
          continue;
        case "applyStyles":
          a.stylesStr && this.addStyle2Node(a.id, a.stylesStr);
          continue;
        case "column-setting":
          r.parent.columns = a.columns ?? -1;
          continue;
        case "edge": {
          let i = (this.edgeCount.get(a.id) ?? 0) + 1;
          this.edgeCount.set(a.id, i), a.id = i + "-" + a.id, this.edges.push(a);
          continue;
        }
      }
      a.id ??= this.generateId(), a.label || (a.label = a.type === "composite" ? "" : a.id);
      let s = this.byId.get(a.id), l = s === void 0 || this.pending.delete(a.id);
      l ? (s && (a.classes = s.classes, a.styles = s.styles), a.type === "composite" && (a.colorIndex = this.colors++), this.byId.set(a.id, a)) : (a.type !== "na" && (s.type = a.type), a.label !== a.id && (s.label = a.label));
      let n = a.children;
      if (a.children = [], a.type === "space") {
        let i = a.width ?? 1;
        if (!(i <= cp - this.spaces)) throw new at(`A block diagram can hold at most ${cp} space blocks.`, "limit", { type: "block" });
        this.spaces += Math.max(i, 0);
        for (let o = 0; o < i; o++) {
          let h = { ...a, id: a.id + "-" + o, children: [] };
          this.byId.set(h.id, h), r.children.push(h);
        }
      } else l && r.children.push(a);
      n && n.length > 0 && t.push(dp(n, a));
    }
    this.blocks = this.root.children ?? [];
  }
}, fp = ["$end", "INVALID", "BLOCK_DIAGRAM_KEY", "id-block", "COLUMNS", "MD_STR", "STR", "SPACE_BLOCK", "DEFAULT", "LINKSTYLE", "INTERPOLATE", "classDef", "DEFAULT_CLASSDEF_ID", "CLASSDEF_ID", "CLASSDEF_STYLEOPTS", "class", "CLASSENTITY_IDS", "STYLECLASS", "style", "STYLE_ENTITY_IDS", "STYLE_DEFINITION_DATA", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "end", "NODE_DSTART", "NODE_DEND", "BLOCK_ARROW_START", "BLOCK_ARROW_END", "DIR", "NODE_ID", "LINK", "START_LINK", "LINK_LABEL", "SIZE", "EOF"], pM = ["right", "left", "x", "y", "up", "down"], im = new Uint8Array(128);
for (let e of [9, 10, 11, 12, 13, 32, 40, 41, 45, 58, 60, 61, 62, 91, 123, 125]) im[e] = 1;
function gM(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = (q, C, ee) => (r.push(q), a.push(C), s.push(i), i = ee, !0), h = (q, C) => o(q, e.slice(i, C), C), c = (q) => {
    l.push(n), n = q;
  }, u = () => {
    l.length > 0 && (n = l.pop());
  }, d = (q) => {
    for (; q < t && Ke(e.charCodeAt(q)); ) q++;
    return q;
  }, p = (q) => {
    for (; q < t; ) {
      let C = e.charCodeAt(q);
      if (C < 48 || C > 57) break;
      q++;
    }
    return q;
  }, g = (q) => {
    for (; q < t && nt(e.charCodeAt(q)); ) q++;
    return q;
  }, y = (q) => e.startsWith(q, i) && !nt(e.charCodeAt(i + q.length)), b = () => (e.charCodeAt(i + 1) === 96 ? (c(2), i += 2) : (c(1), i++), !0), x = (q) => {
    if (e.charCodeAt(q) !== 46) return -1;
    do
      q++;
    while (e.charCodeAt(q) === 46);
    if (e.charCodeAt(q) !== 45) return -1;
    let C = e.charCodeAt(q + 1);
    return C === 120 || C === 111 || C === 62 ? q + 2 : q + 1;
  }, v = (q) => {
    let C = e.charCodeAt(q);
    (C === 120 || C === 111 || C === 60) && q++;
    let ee = e.charCodeAt(q);
    if (ee === 46) return x(q);
    if (ee !== 45 && ee !== 61) return -1;
    let ie = q + 1;
    for (; e.charCodeAt(ie) === ee; ) ie++;
    if (ie - q === 1) return ee === 45 ? x(ie) : -1;
    let G = e.charCodeAt(ie);
    return G === 120 || G === 111 || G === 62 ? ie + 1 : ie - q >= 3 ? ie : -1;
  }, $ = () => {
    let q = v(i);
    if (q >= 0) return h(33, d(q));
    let C = e.charCodeAt(i) === 60 ? i + 1 : i, ee = e.charCodeAt(C), ie = e.charCodeAt(C + 1);
    return ee === 45 && (ie === 45 || ie === 46) || ee === 61 && ie === 61 ? (c(6), h(34, d(C + 2))) : !1;
  }, S = (q) => {
    let C = e.indexOf(`
`, i);
    return C === -1 && (C = t), u(), h(q, C);
  }, R = (q, C) => {
    let ee = g(i);
    if (ee === i) return !1;
    for (; e.charCodeAt(ee) === 44; ) {
      let ie = d(ee + 1), G = g(ie);
      if (G === ie) break;
      ee = G;
    }
    return n = C, h(q, ee);
  }, D = (q) => {
    if (Ke(q)) return i = d(i + 1), !0;
    let C;
    switch (q) {
      case 98:
        if (e.startsWith("block", i)) {
          if (y("block-beta")) return h(2, i + 10);
          if (e.charCodeAt(i + 5) === 58) return h(3, i + 6);
          if (!nt(e.charCodeAt(i + 5))) return h(2, i + 5);
        }
        break;
      case 99:
        if (e.startsWith("columns", i)) {
          if (C = d(i + 7), C > i + 7) {
            if (e.startsWith("auto", C) && !nt(e.charCodeAt(C + 4))) return o(4, "-1", C + 4);
            let ee = p(C);
            if (ee > C) return o(4, e.slice(C, ee), ee);
          }
        } else if (e.startsWith("class", i)) {
          let ee = e.startsWith("Def", i + 5), ie = ee ? i + 8 : i + 5;
          if (C = d(ie), C > ie) return c(ee ? 7 : 9), h(ee ? 11 : 15, C);
        }
        break;
      case 34:
        return b();
      case 115:
        if (e.startsWith("space", i)) {
          if (e.charCodeAt(i + 5) === 58) {
            let ee = p(i + 6);
            if (ee > i + 6) return o(7, e.slice(i + 6, ee), ee);
          }
          if (!nt(e.charCodeAt(i + 5))) return o(7, "1", i + 5);
        } else if (e.startsWith("style", i) && (C = d(i + 5), C > i + 5)) return c(11), h(18, C);
        break;
      case 100:
        if (y("default")) return h(8, i + 7);
        break;
      case 108:
        if (y("linkStyle")) return h(9, i + 9);
        break;
      case 105:
        if (y("interpolate")) return h(10, i + 11);
        break;
      case 97:
        if (e.startsWith("accTitle", i)) {
          if (C = d(i + 8), e.charCodeAt(C) === 58) return c(13), h(21, d(C + 1));
        } else if (e.startsWith("accDescr", i)) {
          C = d(i + 8);
          let ee = e.charCodeAt(C);
          if (ee === 58) return c(14), h(23, d(C + 1));
          if (ee === 123) return c(15), i = d(C + 1), !0;
        }
        break;
      case 101:
        if (y("end")) return h(26, d(i + 3));
        break;
      case 45:
        return e.charCodeAt(i + 1) === 41 ? (c(3), h(27, i + 2)) : $();
      case 61:
        return $();
      case 60:
        return e.charCodeAt(i + 1) === 91 ? (c(4), h(29, i + 2)) : $();
      case 40: {
        let ee = e.charCodeAt(i + 1), ie = ee === 45 || ee === 91 ? 2 : ee === 40 ? e.charCodeAt(i + 2) === 40 ? 3 : 2 : 1;
        return c(3), h(27, i + ie);
      }
      case 41:
      case 123:
        return c(3), h(27, e.charCodeAt(i + 1) === q ? i + 2 : i + 1);
      case 62:
        return c(3), h(27, i + 1);
      case 91: {
        let ee = e.charCodeAt(i + 1);
        return c(3), h(27, ee === 91 || ee === 124 || ee === 40 || ee === 92 || ee === 47 ? i + 2 : i + 1);
      }
      case 58: {
        let ee = p(i + 1);
        return ee > i + 1 ? o(36, e.slice(i + 1, ee), ee) : !1;
      }
    }
    for (C = i; C < t; ) {
      let ee = e.charCodeAt(C);
      if (ee < 128 ? im[ee] === 1 : Ke(ee)) break;
      C++;
    }
    return C > i && h(32, C);
  }, O = (q) => {
    let C = e.charCodeAt(i + 1), ee = 0;
    switch (q) {
      case 34:
        return b();
      case 40:
        ee = C === 45 ? 2 : C === 40 ? e.charCodeAt(i + 2) === 40 ? 3 : 2 : 1;
        break;
      case 41:
        ee = C === 41 ? e.charCodeAt(i + 2) === 41 ? 3 : 2 : C === 93 ? 2 : 1;
        break;
      case 125:
        ee = C === 125 ? 2 : 1;
        break;
      case 45:
        ee = C === 41 ? 2 : 0;
        break;
      case 93:
        ee = C === 93 || C === 41 || C === 62 ? 2 : 1;
        break;
      case 92:
      case 47:
        ee = C === 93 ? 2 : 0;
        break;
    }
    return ee === 0 ? !1 : (u(), h(28, i + ee));
  }, U = (q) => {
    if (q === 41) return u(), u(), o(30, "]>", d(i + 1));
    let C = d(q === 44 ? i + 1 : i);
    for (let ee of pM) if (e.startsWith(ee, C)) {
      let ie = d(C + ee.length);
      return o(31, e.slice(q === 44 ? C : i, ie), ie);
    }
    return !1;
  };
  for (; ; ) {
    if (i >= t) {
      let ee = -1;
      switch (n) {
        case 0:
          ee = 37;
          break;
        case 1:
          ee = 6;
          break;
        case 8:
          ee = 14;
          break;
        case 10:
          ee = 17;
          break;
        case 12:
          ee = 20;
          break;
        case 13:
          ee = 22;
          break;
        case 14:
          ee = 24;
          break;
        case 15:
          ee = 25;
          break;
      }
      i = t, ee !== -1 && o(ee, "", t);
      break;
    }
    let q = e.charCodeAt(i), C = !0;
    switch (n) {
      case 0:
        C = D(q);
        break;
      case 1:
        if (q === 34) u(), i++;
        else {
          let ee = e.indexOf('"', i);
          h(6, ee === -1 ? t : ee);
        }
        break;
      case 2:
        if (q === 96) C = e.charCodeAt(i + 1) === 34, C && (u(), i += 2);
        else if (q === 34) C = !1;
        else {
          let ee = i + 1;
          for (; ee < t; ) {
            let ie = e.charCodeAt(ee);
            if (ie === 96 || ie === 34) break;
            ee++;
          }
          h(5, ee);
        }
        break;
      case 3:
        C = O(q);
        break;
      case 4:
        if (q === 34) b();
        else if (q === 93 && e.charCodeAt(i + 1) === 62) {
          let ee = d(i + 2);
          C = e.charCodeAt(ee) === 40, C && (c(5), i = ee + 1);
        } else C = !1;
        break;
      case 5:
        C = U(q);
        break;
      case 6:
        if (q === 34) e.charCodeAt(i + 1) === 96 ? b() : (h(35, i + 1), c(1));
        else {
          let ee = v(d(i));
          C = ee >= 0, C && (u(), h(33, d(ee)));
        }
        break;
      case 7: {
        let ee = 12, ie = e.startsWith("DEFAULT", i) ? i + 7 : i, G = d(ie);
        (ie === i || G === ie) && (ee = 13, ie = g(i), G = d(ie)), C = ie > i && G > ie, C && (n = 8, h(ee, G));
        break;
      }
      case 8:
        S(14);
        break;
      case 9:
        C = R(16, 10);
        break;
      case 10:
        S(17);
        break;
      case 11:
        C = R(19, 12);
        break;
      case 12:
        S(20);
        break;
      case 13:
        S(22);
        break;
      case 14:
        S(24);
        break;
      case 15:
        if (q === 125) u(), i++;
        else {
          let ee = e.indexOf("}", i);
          h(25, ee === -1 ? t : ee);
        }
        break;
    }
    if (!C) return r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s };
  }
  return r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var vi = "'NODE_ID', 'COLUMNS', 'SPACE_BLOCK', 'BLOCK_DIAGRAM_KEY', 'id-block', 'classDef', 'class', 'style'";
function up(e) {
  let t = e[e.length - 1];
  return Array.isArray(t) ? (e.pop(), e.concat(t)) : e;
}
function mM(e, t) {
  let { types: r, texts: a, starts: s } = gM(e), l = 0, n = (d) => {
    let p = r[l];
    throw p === 1 ? bt("block", e, s[l], "", !0) : bt("block", e, s[l], `Expecting ${d}, got '${fp[p]}'`);
  }, i = (d) => (r[l] !== d && n(`'${fp[d]}'`), a[l++]), o = () => {
    let d = i(32);
    if (r[l] === 27) {
      let p = a[l++], g = i(6);
      return { id: d, label: g, typeStr: p + i(28) };
    }
    if (r[l] === 29) {
      let p = a[l++], g = i(6), y = [i(31)];
      for (; r[l] === 31; ) y.push(a[l++]);
      return { id: d, label: g, typeStr: p + i(30), directions: y };
    }
    return { id: d };
  }, h = () => {
    let d = o(), p = r[l] === 36 ? parseInt(a[l++], 10) : 1, g = { id: d.id, label: d.label, type: t.typeStr2Type(d.typeStr), directions: d.directions, widthInColumns: p }, y;
    for (; r[l] === 33 || r[l] === 34; ) {
      let b = "";
      r[l++] === 34 && (i(35), b = i(6), i(33));
      let x = a[l - 1], v = o(), $ = t.edgeStrToEdgeData(x), S = t.edgeStrToEdgeStartData(x), R = t.edgeStrToThickness(x), D = t.edgeStrToPattern(x);
      y ??= [{ id: g.id, label: g.label, type: g.type, directions: g.directions }], g = { id: v.id, label: v.label, type: t.typeStr2Type(v.typeStr), directions: v.directions }, y.push({ id: y[y.length - 1].id + "-" + v.id, start: y[y.length - 1].id, end: v.id, label: b, type: "edge", thickness: R, pattern: D, directions: v.directions, arrowTypeEnd: $, arrowTypeStart: S }, g);
    }
    return y ?? g;
  };
  i(2);
  let c = [], u = [];
  for (; ; ) switch (r[l]) {
    case 32:
      u.push(h());
      break;
    case 4:
      u.push({ type: "column-setting", columns: parseInt(a[l++], 10) });
      break;
    case 7: {
      let d = parseInt(a[l++], 10);
      u.push({ id: t.generateId(), type: "space", label: "", width: d, children: [] });
      break;
    }
    case 2:
      l++, c.push({ list: u, header: void 0 }), u = [];
      break;
    case 3:
      l++, r[l] !== 32 && n("'NODE_ID'"), c.push({ list: u, header: h() }), u = [];
      break;
    case 26: {
      let d = c.pop();
      if (d === void 0 || u.length === 0) return n(vi);
      l++;
      let p = t.generateId(), g = up(u);
      u = d.list, u.push(d.header === void 0 ? { id: p, type: "composite", label: "", children: g } : { ...d.header, type: "composite", children: g });
      break;
    }
    case 11: {
      l++;
      let d = i(13).trim();
      u.push({ type: "classDef", id: d, css: i(14).trim() });
      break;
    }
    case 15: {
      l++;
      let d = i(16).trim();
      u.push({ type: "applyClass", id: d, styleClass: i(17).trim() });
      break;
    }
    case 18: {
      l++;
      let d = i(19).trim();
      u.push({ type: "applyStyles", id: d, stylesStr: i(20).trim() });
      break;
    }
    case 37:
      c.length > 0 && n(vi + ", 'end'"), u.length === 0 && n(vi), t.setHierarchy(up(u));
      return;
    default:
      n(u.length === 0 ? vi : vi + (c.length > 0 ? ", 'end'" : ", 'EOF'"));
  }
}
function ma(e, t, r, a) {
  return By(() => je(e, !1, t, r, a, 1));
}
function sm(e, t, r, a, s, l, n) {
  let i = ma(e, t, r, 4e3);
  if (i.height === 0) return { width: s, height: l, content: n };
  let o = i.height + 12, h = Math.max(s, Math.ceil(i.width + 2 * a));
  return { width: h, height: Math.ceil(l + o), content: Pe(i, h / 2, a + i.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f((h - s) / 2)},${f(o)})">${n}</g>` };
}
var Jr = 1, ea = 2, ta = 4, ra = 8, ri = 7, _o = 20, Ea = 12;
function yM(e) {
  let t = 0;
  if (e) for (let r of e) switch (r.trim()) {
    case "right":
      t |= Jr;
      break;
    case "left":
      t |= ea;
      break;
    case "up":
      t |= ta;
      break;
    case "down":
      t |= ra;
      break;
    case "x":
      t |= Jr | ea;
      break;
    case "y":
      t |= ta | ra;
      break;
  }
  return t;
}
var xa = (e, t) => e & t ? 1 : 0;
function oh(e) {
  return e !== 0 && (e & (ta | ra)) === 0 ? "x" : e !== 0 && (e & (Jr | ea)) === 0 ? "y" : "";
}
function pp(e, t, r) {
  let a = oh(e), s = xa(e, ea) - xa(e, Jr), l = xa(e, ta) - xa(e, ra);
  if (a === "x") {
    let n = Math.max(r + 8, 14) + 2 * ri, i = Math.min(n / 2, _o);
    return { w: Math.max(t + 12, 16) + i * (e === (Jr | ea) ? 2 : 1), h: n, dx: s * i / 2, dy: 0 };
  }
  if (a === "y") {
    let n = Math.max(t + 16, 14) + 2 * ri, i = Math.min(n / 2, _o);
    return { w: n, h: Math.max(r + 8, 16) + i * (e === (ta | ra) ? 2 : 1), dx: 0, dy: l * i / 2 };
  }
  return { w: Math.max(t + 16, 24) + Ea * (xa(e, ea) + xa(e, Jr)), h: Math.max(r + 8, 24) + Ea * (xa(e, ta) + xa(e, ra)), dx: s * Ea / 2, dy: l * Ea / 2 };
}
function xM(e, t, r, a) {
  let s = oh(e), l = t / 2, n = r / 2, i;
  if (s === "x") {
    let h = Math.min(n, _o), c = n - ri, u = e & ea ? -l + h : -l, d = e & Jr ? l - h : l;
    i = [u, -c, d, -c], e & Jr && i.push(d, -n, l, 0, d, n), i.push(d, c, u, c), e & ea && i.push(u, n, -l, 0, u, -n);
  } else if (s === "y") {
    let h = Math.min(l, _o), c = l - ri, u = e & ta ? -n + h : -n, d = e & ra ? n - h : n;
    i = [c, u, c, d], e & ra && i.push(l, d, 0, n, -l, d), i.push(-c, d, -c, u), e & ta && i.push(-l, u, 0, -n, l, u);
  } else {
    let h = e & ea ? -l + Ea : -l, c = e & Jr ? l - Ea : l, u = e & ta ? -n + Ea : -n, d = e & ra ? n - Ea : n, p = (h + c) / 2, g = (u + d) / 2, y = Math.min(10, (c - h) / 2), b = Math.min(10, (d - u) / 2);
    i = [h, u], e & ta && i.push(p - y, u, p, -n, p + y, u), i.push(c, u), e & Jr && i.push(c, g - b, l, g, c, g + b), i.push(c, d), e & ra && i.push(p + y, d, p, n, p - y, d), i.push(h, d), e & ea && i.push(h, g + b, -l, g, h, g - b);
  }
  let o = "";
  for (let h = 0; h < i.length; h += 2) o += (h ? " " : "") + f(i[h]) + "," + f(i[h + 1]);
  return `<polygon points="${o}" stroke-linejoin="round"${a}/>`;
}
var wM = 1e3;
function $M(e, t) {
  if (e === 0 || !Number.isInteger(e)) throw new at("Columns must be an integer !== 0.", "semantic", { type: "block" });
  if (t < 0 || !Number.isInteger(t)) throw new at("Position must be a non-negative integer." + t, "semantic", { type: "block" });
  return e < 0 ? { px: t, py: 0 } : { px: t % e, py: Math.floor(t / e) };
}
function bM(e, t, r) {
  let a = e.columns, s = [], l = 0, n = 0, i = 0, o = 0;
  for (let c of e.children) {
    let { px: u, py: d } = $M(a, l), p = c.span >= 1 ? Math.min(c.span, wM) : 1;
    if (a > 0 && p > a - u && (p = a - u), c.span = p, c.col = u, c.row = d, l += p, u + p > n && (n = u + p), d === s.length && s.push(0), c.children.length === 0 ? s[d] = -1 : s[d] >= 0 && c.nh > s[d] && (s[d] = c.nh), c.space) continue;
    let g = (c.nw - t * (p - 1)) / p;
    g > i && (i = g), c.nh > o && (o = c.nh);
  }
  let h = (s.length - 1) * t + Io(e.rowGaps);
  for (let c = 0; c < s.length; c++) s[c] < 0 && (s[c] = o), h += s[c];
  e.cols = n, e.heights = s, e.nw = Math.max(e.nw, n * i + (n - 1) * t + Io(e.colGaps) + 2 * r), e.nh = h + 2 * r + e.head;
}
function MM(e, t, r) {
  let { cols: a, heights: s, rowGaps: l, colGaps: n } = e, i = s.length, o = (e.w - 2 * r - (a - 1) * t - Io(n)) / a, h = e.h - 2 * r - e.head - (i - 1) * t - Io(l), c = [];
  if (n.length > 0) {
    let x = 0;
    for (let v = 0; v < a; v++) c.push(x), x += n[v] ?? 0;
  }
  let u = 0;
  for (let x of s) u += x;
  let d = u > 0 ? h / u : 0, p = u > 0 ? 0 : h / i, g = e.x - e.w / 2 + r, y = e.y - e.h / 2 + r + e.head, b = 0;
  for (let x of e.children) {
    for (; b < x.row; b++) y += s[b] * d + p + t + (l[b] ?? 0);
    let v = c[x.col] ?? 0;
    x.w = o * x.span + t * (x.span - 1) + (c[x.col + x.span - 1] ?? 0) - v, x.h = s[b] * d + p, x.x = g + x.col * (o + t) + v + x.w / 2, x.y = y + x.h / 2;
  }
}
function Io(e) {
  let t = 0;
  for (let r of e) t += r ?? 0;
  return t;
}
function vM(e, t) {
  let r = [e];
  for (let a = 0; a < r.length; a++) for (let s of r[a].children) r.push(s);
  for (let a = r.length - 1; a >= 0; a--) {
    let s = r[a];
    s.children.length > 0 && bM(s, t, a === 0 ? 0 : t);
  }
  e.w = e.nw, e.h = e.nh, e.x = e.w / 2, e.y = e.h / 2;
  for (let a = 0; a < r.length; a++) {
    let s = r[a];
    s.children.length > 0 && MM(s, t, a === 0 ? 0 : t);
  }
  return { width: e.w, height: e.h };
}
var kM = 12, gp = 200, AM = 8, mp = ' fill="var(--_s)" stroke="var(--_b)"', EM = ' stroke="var(--_b)"', yp = [], TM = [], CM = [], Ul = [], SM = ["default"], xp = 2e6, Xh = 4, _M = /* @__PURE__ */ new Map([["square", "rect"], ["round", "rounded"], ["circle", "circle"], ["doublecircle", "dbl-circ"], ["diamond", "diam"], ["hexagon", "hex"], ["stadium", "stadium"], ["subroutine", "fr-rect"], ["cylinder", "cyl"], ["rect_left_inv_arrow", "odd"], ["lean_right", "lean-r"], ["lean_left", "lean-l"], ["trapezoid", "trap-b"], ["inv_trapezoid", "trap-t"]]), wp = /* @__PURE__ */ new Set(["circle", "dbl-circ", "diam"]), IM = /* @__PURE__ */ new Set(["stadium", "hex", "odd", "lean-r", "lean-l", "trap-b", "trap-t"]);
function hh(e) {
  return e.kind === 0 && (e.shape === "circle" || e.shape === "dbl-circ");
}
function wl(e, t, r) {
  let a = e.bw / 2, s = e.bh / 2, l = Math.abs(t - e.x), n = s;
  return hh(e) ? n = Math.sqrt(Math.max(a * a - l * l, 0)) : e.kind === 0 && e.shape === "diam" ? n = s * Math.max(1 - l / a, 0) : e.kind === 0 ? n = s - al(e.shape, e.bw, e.bh, r > 0 ? 2 : 0) : e.kind === 1 && oh(e.mask) === "x" && (n = s - ri), e.y + r * n;
}
function $l(e, t, r) {
  let a = e.bw / 2, s = e.bh / 2, l = Math.abs(t - e.y), n = a;
  return hh(e) ? n = Math.sqrt(Math.max(s * s - l * l, 0)) : e.kind === 0 && e.shape === "diam" ? n = a * Math.max(1 - l / s, 0) : e.kind === 0 ? n = a - al(e.shape, e.bw, e.bh, r > 0 ? 1 : 3) : e.kind === 1 && oh(e.mask) === "y" && (n = a - ri), e.x + r * n;
}
function $p(e, t, r, a) {
  let s = t - e.x, l = r - e.y, n = e.bw / 2, i = e.bh / 2, o;
  hh(e) ? o = n / (Math.hypot(s, l) || 1) : e.kind === 0 && e.shape === "diam" ? o = 1 / (Math.abs(s) / n + Math.abs(l) / i || 1) : o = Math.min(s === 0 ? 1 / 0 : n / Math.abs(s), l === 0 ? 1 / 0 : i / Math.abs(l)), o === 1 / 0 && (o = 0), a.push(e.x + s * o, e.y + l * o);
}
function NM(e, t, r, a, s) {
  let l = s.x - s.bw / 2 + 1, n = s.x + s.bw / 2 - 1, i = s.y - s.bh / 2 + 1, o = s.y + s.bh / 2 - 1;
  if (e < l && r < l || e > n && r > n || t < i && a < i || t > o && a > o) return !1;
  if (e === r || t === a) return !0;
  let h = r - e, c = a - t, u = (p, g) => Math.sign(h * (g - t) - c * (p - e)), d = u(l, i);
  return d === 0 || u(n, i) !== d || u(n, o) !== d || u(l, o) !== d;
}
function Zh(e, t, r, a) {
  let s = 0;
  for (let l of a) if (!(l === t || l === r)) {
    for (let n = 0; n + 3 < e.length; n += 2) if (NM(e[n], e[n + 1], e[n + 2], e[n + 3], l)) {
      s++;
      break;
    }
  }
  return s;
}
function RM(e, t, r, a) {
  let s = e.x - e.bw / 2, l = e.x + e.bw / 2, n = e.y - e.bh / 2, i = e.y + e.bh / 2, o = t.x - t.bw / 2, h = t.x + t.bw / 2, c = t.y - t.bh / 2, u = t.y + t.bh / 2, d = Math.max(s, o), p = Math.min(l, h), g = Math.max(n, c), y = Math.min(i, u), b = p - d > 6, x = y - g > 6;
  if (b && x) {
    let ie = e.bw * e.bh <= t.bw * t.bh ? e : t, G = ie === e ? t : e, z = ie.y - ie.bh / 2 - (G.y - G.bh / 2), _ = G.y + G.bh / 2 - (ie.y + ie.bh / 2), T = ie.x - ie.bw / 2 - (G.x - G.bw / 2), E = G.x + G.bw / 2 - (ie.x + ie.bw / 2), M = Math.min(z, _, T, E), A;
    return M === _ ? A = [ie.x, wl(ie, ie.x, 1), ie.x, G.y + G.bh / 2] : M === z ? A = [ie.x, wl(ie, ie.x, -1), ie.x, G.y - G.bh / 2] : M === E ? A = [$l(ie, ie.y, 1), ie.y, G.x + G.bw / 2, ie.y] : A = [$l(ie, ie.y, -1), ie.y, G.x - G.bw / 2, ie.y], ie === e ? A : [A[2], A[3], A[0], A[1]];
  }
  if (b) {
    let ie = Math.min(6, (p - d) / 2), G = Math.min(Math.max((d + p) / 2 + r, d + ie), p - ie), z = t.y > e.y ? 1 : -1;
    return [G, wl(e, G, z), G, wl(t, G, -z)];
  }
  if (x) {
    let ie = Math.min(6, (y - g) / 2), G = Math.min(Math.max((g + y) / 2 + r, g + ie), y - ie), z = t.x > e.x ? 1 : -1;
    return [$l(e, G, z), G, $l(t, G, -z), G];
  }
  let v = t.x > e.x ? 1 : -1, $ = t.y > e.y ? 1 : -1, S = [$l(e, e.y, v), e.y, t.x, e.y, t.x, wl(t, t.x, -$)], R = [e.x, wl(e, e.x, $), e.x, t.y, $l(t, t.y, -v), t.y], D = Math.abs(t.x - e.x) >= Math.abs(t.y - e.y), O = D ? S : R;
  if (a === void 0) return O;
  let U = Zh(O, e, t, a);
  if (U === 0) return O;
  let q = D ? R : S, C = Zh(q, e, t, a);
  if (C < U && (O = q, U = C), U === 0) return O;
  let ee = [];
  return $p(e, t.x, t.y, ee), $p(t, e.x, e.y, ee), Zh(ee, e, t, a) < U ? ee : O;
}
function DM(e, t, r) {
  let a = e.length, s = e[0], l = e[1], n = e[a - 2], i = e[a - 1], o = e[2] - s, h = e[3] - l, c = Math.hypot(o, h);
  o /= c || 1, h /= c || 1;
  let u = n - e[a - 4], d = i - e[a - 3], p = Math.hypot(u, d);
  if (u /= p || 1, d /= p || 1, a === 4 && t + r > c) {
    let y = c / (t + r);
    t *= y, r *= y;
  }
  t = Math.min(t, c), r = Math.min(r, p);
  let g = `M${f(s + o * t)},${f(l + h * t)}`;
  if (a === 6) {
    let y = Math.max(0, Math.min(AM, c - t, p - r));
    g += `L${f(e[2] - o * y)},${f(e[3] - h * y)}Q${f(e[2])},${f(e[3])} ${f(e[2] + u * y)},${f(e[3] + d * y)}`;
  }
  return g += `L${f(n - u * r)},${f(i - d * r)}`, { d: g, sx: s, sy: l, sdx: -o, sdy: -h, ex: n, ey: i, edx: u, edy: d };
}
function sf(e, t) {
  let r = e.bw / 2, a = e.bh / 2, s = Math.max(1, Math.min(10 + 5 * (t - 1), r, a));
  if (hh(e)) {
    let l = e.x + r * Math.SQRT1_2, n = e.y - r * Math.SQRT1_2, i = 2 * Math.asin(Math.min(1, s / (2 * r))), o = (h) => Math.atan2(e.y - r * Math.sin(h) - n, e.x + r * Math.cos(h) - l);
    return [l, n, s, o(Math.PI / 4 + i), o(Math.PI / 4 - i)];
  }
  if (e.kind === 0 && e.shape === "diam") {
    let l = Math.atan2(a, r);
    return [e.x + r / 2, e.y - a / 2, s, l + Math.PI, l];
  }
  return [e.x + r, e.y - a, s, Math.PI, Math.PI / 2];
}
function LM(e, t, r, a) {
  let [s, l, n, i, o] = sf(e, t), h = i + r / n, c = o - a / n, u = (c - h) % (2 * Math.PI);
  u <= 0 && (u += 2 * Math.PI);
  let d = s + n * Math.cos(h), p = l + n * Math.sin(h), g = s + n * Math.cos(c), y = l + n * Math.sin(c), b = s + n * Math.cos(i), x = l + n * Math.sin(i), v = s + n * Math.cos(o), $ = l + n * Math.sin(o), S = Math.hypot(b - d, x - p), R = Math.hypot(v - g, $ - y);
  return { d: `M${f(d)},${f(p)}A${f(n)},${f(n)} 0 ${u > Math.PI ? 1 : 0} 1 ${f(g)},${f(y)}`, sx: b, sy: x, sdx: S > 0 ? (b - d) / S : Math.sin(i), sdy: S > 0 ? (x - p) / S : -Math.cos(i), ex: v, ey: $, edx: R > 0 ? (v - g) / R : -Math.sin(o), edy: R > 0 ? ($ - y) / R : Math.cos(o) };
}
var OM = [0.5, 0.3, 0.7, 0.15, 0.85];
function nm(e, t, r, a, s, l, n) {
  if (n === void 0) return !1;
  for (let i of n) if (i !== s && i !== l && Math.abs(e - i.x) < (r + i.bw) / 2 && Math.abs(t - i.y) < (a + i.bh) / 2) return !0;
  return !1;
}
function FM(e, t, r, a, s, l, n) {
  if (n === void 0) return 0.5;
  for (let i of OM) {
    let o = e[t] + (e[t + 2] - e[t]) * i, h = e[t + 1] + (e[t + 3] - e[t + 1]) * i;
    if (!nm(o, h, r, a, s, l, n)) return i;
  }
  return 0.5;
}
function zM(e, t, r, a, s, l) {
  let n = r[e[0]][0] === r[e[0]][2], i = -1 / 0, o = 1 / 0, h = -Xh, c = !1;
  for (let p = 0; p < e.length; p++) {
    let g = r[e[p]];
    if (n ? g[0] !== g[2] : g[1] !== g[3]) return 0;
    i = Math.max(i, n ? Math.min(g[1], g[3]) : Math.min(g[0], g[2])), o = Math.min(o, n ? Math.max(g[1], g[3]) : Math.max(g[0], g[2]));
    let y = t[e[p]];
    h += (n ? y.label.height : y.label.width + 8) + Xh;
    for (let b = 0; b < p; b++) {
      let x = t[e[b]];
      Math.abs(y.lx - x.lx) < (y.label.width + x.label.width) / 2 + 8 && Math.abs(y.ly - x.ly) < (y.label.height + x.label.height) / 2 && (c = !0);
    }
  }
  if (!c) return 0;
  if (h > o - i - 2 * Nt) return h - (o - i - 2 * Nt);
  let u = [], d = (i + o - h) / 2;
  for (let p of e) {
    let { label: g, lx: y, ly: b } = t[p], x = n ? g.height : g.width + 8, v = d + x / 2;
    if (nm(n ? y : v, n ? v : b, g.width + 8, g.height, a, s, l)) return 0;
    u.push(v), d += x + Xh;
  }
  return e.forEach((p, g) => {
    n ? t[p].ly = u[g] : t[p].lx = u[g];
  }), 0;
}
function PM(e, t, r, a, s, l) {
  let n = /* @__PURE__ */ new Set();
  for (let d = t; d !== void 0; d = e[d.index]) n.add(d);
  let i, o = r;
  for (; o !== void 0 && !n.has(o); ) i = o, o = e[o.index];
  if (o === void 0 || i === void 0 || o === t) return !1;
  let h = t;
  for (; e[h.index] !== o; ) h = e[h.index];
  let c;
  if (a) {
    if (h.row === i.row) return !1;
    c = Math.max(h.row, i.row) - 1, o.rowGaps === Ul && (o.rowGaps = []);
  } else {
    let [d, p] = h.col < i.col ? [h, i] : [i, h];
    if (p.col < d.col + d.span) return !1;
    c = p.col - 1, o.colGaps === Ul && (o.colGaps = []);
  }
  let u = a ? o.rowGaps : o.colGaps;
  return l.has(u) || l.set(u, u.slice()), u[c] = Math.max(u[c] ?? 0, (l.get(u)[c] ?? 0) + s), !0;
}
function WM(e, t, r) {
  return Da(r, (a) => BM(e, t, r, a));
}
function BM(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8, o = r.icons, h = t.block?.padding, c = Math.min(typeof h == "number" && h >= 0 ? Math.min(h, 200) : kM, a ? 6 : 1 / 0), u = a ? 80 : gp, d = (J) => {
    let V = [], Z = (ae) => {
      for (let oe of ae) for (let ue of oe.split(";")) V.push(ue);
    };
    for (let ae of J.classes && J.classes.length > 0 ? J.classes : SM) {
      let oe = e.classes.get(ae);
      oe && Z(oe.styles);
    }
    return J.styles && Z(J.styles), Dt(V);
  }, p = (J, V) => {
    let Z = J.type, ae = Z === "space" ? Dt(yp) : d(J), oe = (ae.bold ? 1 : 0) | (ae.italic ? 2 : 0), ue = ae.fontSize ?? s, he = 0, re = "", P, ne = 0, ce = 0, pe = 0, Me = 0, xe = 0, ve = 0;
    if (Z === "space") he = 3, P = je(void 0, !1, n, ue, u);
    else if (Z === "composite") he = 2, P = je(J.label, !1, n, ue, a ? Qt(r) : 4e3, oe), pe = P.height > 0 ? P.height + 4 : 0, ne = P.width + 2 * c, ce = pe + 2 * c;
    else if (Z === "block_arrow") {
      he = 1, P = je(J.label, !1, n, ue, u, oe);
      let Ae = !0;
      for (let me of P.lines) for (let we of me) (we.icon !== void 0 || we.text.trim() !== "") && (Ae = !1);
      Me = yM(J.directions);
      let Ee = Ae ? pp(Me, 0, 0) : pp(Me, P.width, P.height);
      ne = Ee.w, ce = Ee.h, xe = Ee.dx, ve = Ee.dy;
    } else {
      re = _M.get(Z ?? "") ?? "rect", P = je(J.label, !1, n, ue, u, oe);
      let Ae = ih(re, P.width, P.height);
      ne = Ae.w, ce = re === "cyl" ? Math.max(Ae.h, P.height + 40) : Ae.h, ve = Ae.dy;
    }
    return { children: [], columns: he === 2 ? J.columns ?? -1 : -1, span: he === 3 ? 1 : J.widthInColumns ?? 1, space: he === 3, head: pe, nw: ne, nh: ce, col: 0, row: 0, cols: 0, heights: CM, rowGaps: Ul, colGaps: Ul, x: 0, y: 0, w: 0, h: 0, block: J, kind: he, index: V, shape: re, label: P, style: ae, mask: Me, dx: xe, dy: ve, bw: 0, bh: 0 };
  }, g = p(e.root, 0);
  g.nw = 0, g.nh = 0;
  let y = [g], b = [], x = /* @__PURE__ */ new Map();
  for (let J = 0; J < y.length; J++) {
    let V = y[J];
    if (V.kind === 2) for (let Z of V.block.children ?? TM) {
      let ae = p(Z, y.length);
      V.children.push(ae), b[ae.index] = V, y.push(ae), ae.kind !== 3 && x.set(Z.id, ae);
    }
  }
  let v = [], $ = [], S = y.map((J) => J.nw), R = () => {
    for (let V of y) V.nw = S[V.index];
    let J = vM(g, c);
    v.length = 0, $.length = 0;
    for (let V of y) V.kind === 0 && wp.has(V.shape) ? (V.bw = V.nw, V.bh = V.nh) : V.kind === 1 ? (V.bw = V.span > 1 ? V.w : V.nw, V.bh = V.nh) : (V.bw = V.w, V.bh = V.kind === 0 && IM.has(V.shape) ? V.nh : V.h), V.kind === 0 && V.shape === "cyl" && (V.dy = Math.min(12, Math.max(6, V.bw / 14)) / 2), V.kind === 0 || V.kind === 1 ? v.push(V) : V.head > 0 && $.push({ x: V.x, y: V.y - V.h / 2 + (V.head + c) / 2 + 2, bw: V.label.width, bh: V.label.height });
    return J;
  }, D = R(), O = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Set(), q = [], C = [];
  for (let J of e.edges) {
    let V = x.get(J.start ?? ""), Z = x.get(J.end ?? "");
    if (V === void 0 || Z === void 0) continue;
    let ae = Math.min(V.index, Z.index) * y.length + Math.max(V.index, Z.index);
    O.set(ae, (O.get(ae) ?? 0) + 1), J.label && U.add(ae), q.push([V, Z]), C.push(J);
  }
  let ee = C.length * v.length <= xp ? v : void 0, ie = [], G = /* @__PURE__ */ new Map(), z = [], _ = () => {
    let J = /* @__PURE__ */ new Map();
    ie.length = 0, G.clear();
    for (let V = 0; V < C.length; V++) {
      let [Z, ae] = q[V], oe = Math.min(Z.index, ae.index) * y.length + Math.max(Z.index, ae.index), ue = O.get(oe) ?? 1, he = J.get(oe) ?? 0;
      J.set(oe, he + 1);
      let re = je(C[V].label, !1, n, l, gp), P, ne, ce;
      if (Z === ae) {
        let [pe, Me, xe] = sf(Z, he + 1);
        P = [], ne = pe + xe + 6 + re.width / 2, ce = Me - xe / 2;
      } else {
        let pe = U.has(oe) ? Math.round(l * 1.5) + 2 : 14;
        P = RM(Z, ae, (he - (ue - 1) / 2) * pe, ee);
        let Me = P.length, xe = Math.abs(P[2] - P[0]) + Math.abs(P[3] - P[1]), ve = Math.abs(P[Me - 2] - P[Me - 4]) + Math.abs(P[Me - 1] - P[Me - 3]), Ae = Me === 6 && ve > xe ? 2 : 0, Ee = re.width > 0 ? FM(P, Ae, re.width + 8, re.height, Z, ae, ee) : 0.5;
        if (ne = P[Ae] + (P[Ae + 2] - P[Ae]) * Ee, ce = P[Ae + 1] + (P[Ae + 3] - P[Ae + 1]) * Ee, re.width > 0 && ue > 1) {
          z[V] = P.slice(Ae, Ae + 4);
          let me = G.get(oe);
          me ? me.push(V) : G.set(oe, [V]);
        }
      }
      ie.push({ edge: C[V], points: P, loop: Z === ae ? he + 1 : 0, label: re, lx: ne, ly: ce });
    }
  }, T = (J) => {
    _();
    let V = ee && [...ee, ...$], Z = /* @__PURE__ */ new Map(), ae = !1;
    for (let oe of G.values()) {
      if (oe.length < 2) continue;
      let [ue, he] = q[oe[0]], re = zM(oe, ie, z, ue, he, V), P = z[oe[0]][0] === z[oe[0]][2];
      J && re > 0 && (P || !a) && PM(b, ue, he, P, Math.ceil(re), Z) && (ae = !0);
    }
    return ae;
  }, E = () => {
    let J = 0;
    for (let V = 0; V < ie.length; V++) {
      let Z = ie[V];
      for (let ae = V + 1; ae < ie.length; ae++) {
        let oe = ie[ae], ue = (Z.label.width + 8) / 2, he = (oe.label.width + 8) / 2, re = Math.min(Z.lx + ue, oe.lx + he) - Math.max(Z.lx - ue, oe.lx - he), P = Math.min(Z.ly + Z.label.height / 2, oe.ly + oe.label.height / 2) - Math.max(Z.ly - Z.label.height / 2, oe.ly - oe.label.height / 2);
        Z.label.width > 0 && oe.label.width > 0 && re > 0 && P > 0 && (J += re * P);
      }
    }
    return J;
  }, M = 0, A = 0, m = 0, I = 0, k = (J, V, Z, ae) => {
    J - Z / 2 < M && (M = J - Z / 2), J + Z / 2 > m && (m = J + Z / 2), V - ae / 2 < A && (A = V - ae / 2), V + ae / 2 > I && (I = V + ae / 2);
  }, w = () => {
    M = 0, A = 0, m = D.width, I = D.height;
    for (let J = 0; J < ie.length; J++) {
      let V = ie[J];
      if (V.loop > 0) {
        let [Z, ae, oe] = sf(q[J][0], V.loop);
        k(Z, ae, 2 * oe + 2, 2 * oe + 2);
      }
      V.label.width > 0 && k(V.lx, V.ly, V.label.width + 8, V.label.height);
    }
    return m - M;
  };
  if (T(C.length * C.length <= xp)) {
    let J = E(), V = w(), Z = !0;
    for (let ue = 0; ue < 3 && Z; ue++) D = R(), Z = T(ue < 2);
    let ae = w(), oe = r.maxWidth !== void 0 && r.maxWidth > 0 ? r.maxWidth : 1 / 0;
    if (E() > J - 1 || ae > V && Math.ceil(ae + 2 * i) > oe) {
      for (let ue of y) ue.rowGaps = Ul, ue.colGaps = Ul;
      D = R(), T(!1);
    }
  }
  w();
  let B = ma(e.title, n, s, a ? Qt(r) : 4e3), N = B.height > 0 ? B.height + 12 : 0, j = Math.max(m - M, B.width), F = i - M + (j - (m - M)) / 2, Y = i + N - A;
  for (let J of y) J.x += F, J.y += Y;
  let W = Math.ceil(j + 2 * i), K = Math.ceil(I - A + N + 2 * i), H = "", te = "", Q = [];
  for (let J = 1; J < y.length; J++) {
    let V = y[J];
    if (V.kind === 3) continue;
    let Z = Ht((V.block.classes ?? yp).join(" ")), ae = Ye(V.block.id);
    if (V.kind === 2) {
      let he = V.y - V.h / 2;
      Ia(V.style.shape) && Q.push({ box: [V.x - V.w / 2, he, V.x + V.w / 2, he + V.h], shape: V.style.shape }), H += `<g class="pele-cluster${Z}" data-id="${ae}"><rect x="${f(V.x - V.w / 2)}" y="${f(he)}" width="${f(V.w)}" height="${f(V.h)}" fill="var(--_a)"${fl(V.style.shape) ? "" : ' fill-opacity="0.5"'} stroke="var(--_b)"${Et(V.style.shape)}/>` + Pe(V.label, V.x, he + (V.head + c) / 2 + 2, ` class="pele-cluster-label"${Xt(V.style, "var(--_m)")}${V.style.text}`, o) + "</g>";
      continue;
    }
    let oe = V.kind === 1, ue = V.label;
    if (V.span > 1 && V.label.width > 0 && V.label.lines.length > 1 && V.bw > V.nw && (oe || !wp.has(V.shape))) {
      let he = (V.style.bold ? 1 : 0) | (V.style.italic ? 2 : 0), re = V.label.width + (V.bw - V.nw);
      ue = je(V.block.label, !1, n, V.label.size, re, he);
    }
    te += `<g class="pele-node pele-shape-${oe ? "block-arrow" : V.shape}${Z}" data-id="${ae}" transform="translate(${f(V.x)},${f(V.y)})">` + (oe ? xM(V.mask, V.bw, V.bh, mp + V.style.shape) : ti(V.shape, V.bw, V.bh, mp + V.style.shape, EM + V.style.line)) + Pe(ue, V.dx, V.dy, ` class="pele-label"${oe || qf(V.shape) ? Xt(V.style) : ""}${V.style.text}`, o) + "</g>";
  }
  let L = "", X = "", le = "";
  for (let J = 0; J < ie.length; J++) {
    let { edge: V, points: Z, loop: ae, label: oe } = ie[J], ue = V.arrowTypeStart ?? "", he = V.arrowTypeEnd ?? "", re;
    if (ae > 0) re = LM(q[J][0], ae, Ct(ue), Ct(he));
    else {
      for (let ce = 0; ce < Z.length; ce += 2) Z[ce] += F, Z[ce + 1] += Y;
      re = DM(Z, Ct(ue), Ct(he));
    }
    let P = Is(re.d, [re.sx, re.sy, re.ex, re.ey], Q);
    P === "" && (L += Ns(re, ue, he, "", V.thickness === "thick"));
    let ne = Ye(V.id);
    if (X += `<g class="pele-edge" data-id="${ne}"${P ? ` stroke="${P}"` : ""}><path d="${re.d}"${V.thickness === "thick" ? ' stroke-width="2.5"' : ""}${V.pattern === "dotted" ? ' stroke-dasharray="3 4"' : ""}/>` + St(ue, re.sx, re.sy, re.sdx, re.sdy, P || "var(--_l)") + St(he, re.ex, re.ey, re.edx, re.edy, P || "var(--_l)") + "</g>", oe.width > 0) {
      let ce = ie[J].lx + F, pe = ie[J].ly + Y;
      le += ga(V.id, oe, ce, pe, "", o);
    }
  }
  return { svg: xt("block", W, K, s, r, e, Pe(B, W / 2, i + B.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (H ? `<g class="pele-clusters">${H}</g>` : "") + dl(L) + (X ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${X}</g>` : "") + `<g class="pele-nodes">${te}</g>` + (le ? `<g class="pele-edge-labels" font-size="${l}">${le}</g>` : "")), width: W, height: K, links: [] };
}
var GM = { type: "block", math: !0, parse(e, t, r) {
  let a = new uM();
  return a.title = r, mM(e, a), a;
}, render: WM }, HM = /* @__PURE__ */ new Set(["label", "type", "descr", "techn", "sprite", "tags", "link", "bgColor", "fontColor", "borderColor", "shadowing", "shape", "legendText", "legendSprite"]), UM = /* @__PURE__ */ new Set(["label", "descr", "techn", "sprite", "tags", "link", "textColor", "lineColor"]);
function ds(e, t) {
  let { key: r, value: a } = t;
  "from" in e && (r === "offsetX" || r === "offsetY") ? e[r] = parseInt(a) : ("from" in e ? UM : HM).has(r) ? e[r] = a : (e.extra ??= /* @__PURE__ */ new Map()).set(r, a);
}
function Rt(e, t, r) {
  r !== void 0 && (typeof r == "string" ? e[t] = r : ds(e, r));
}
function bl(e, t, r) {
  r === void 0 ? e[t] ??= "" : Rt(e, t, r);
}
function bp(e, t) {
  e.labelAttr = void 0, typeof t == "object" ? (e.label = "", e.labelAttr = t, ds(e, t)) : e.label = t ?? "";
}
var YM = class {
  type = "c4";
  c4Type;
  title;
  accTitle;
  accDescr;
  shapes = [];
  boundaries = [{ alias: "global", label: "global", type: "global", parent: void 0 }];
  rels = [];
  shapeInRow = 4;
  boundaryInRow = 2;
  shapeIndex = /* @__PURE__ */ new Map();
  boundaryIndex = /* @__PURE__ */ new Map();
  relIndex = /* @__PURE__ */ new Map();
  current = this.boundaries[0];
  stack = [];
  setC4Type(e) {
    this.c4Type = e;
  }
  setTitle(e) {
    this.title = e;
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  element(e, t, r, a) {
    let s = typeof r == "string" ? t.get(r) : void 0;
    return s === void 0 && (s = { alias: "", label: "", parent: void 0 }, e.push(s), typeof r == "string" ? (s.alias = r, t.set(r, s)) : (s.aliasAttr = r, ds(s, r))), bp(s, a), s;
  }
  addPersonOrSystem(e, t) {
    let r = this.element(this.shapes, this.shapeIndex, t[0], t[1]);
    bl(r, "descr", t[2]), this.finishShape(r, e, t, 3);
  }
  addContainer(e, t) {
    let r = this.element(this.shapes, this.shapeIndex, t[0], t[1]);
    bl(r, "techn", t[2]), bl(r, "descr", t[3]), this.finishShape(r, e, t, 4);
  }
  addComponent(e, t) {
    this.addContainer(e, t);
  }
  finishShape(e, t, r, a) {
    Rt(e, "sprite", r[a]), Rt(e, "tags", r[a + 1]), Rt(e, "link", r[a + 2]), e.kind = t, e.parent = this.current;
  }
  boundary(e, t) {
    let r = this.element(this.boundaries, this.boundaryIndex, e[0], e[1]);
    return e[2] === void 0 ? r.type = t : Rt(r, "type", e[2]), r;
  }
  open(e) {
    e.parent = this.current, this.stack.push(this.current), this.current = e;
  }
  addPersonOrSystemBoundary(e, t = "system") {
    let r = this.boundary(e, t);
    Rt(r, "tags", e[3]), Rt(r, "link", e[4]), this.open(r);
  }
  addContainerBoundary(e) {
    this.addPersonOrSystemBoundary(e, "container");
  }
  addDeploymentNode(e, t) {
    let r = this.boundary(t, "node");
    bl(r, "descr", t[3]), Rt(r, "sprite", t[4]), Rt(r, "tags", t[5]), Rt(r, "link", t[6]), r.nodeType = e, this.open(r);
  }
  popBoundaryParseStack() {
    this.current = this.stack.pop() ?? this.boundaries[0];
  }
  addRel(e, t) {
    let r = t[0], a = t[1];
    if (r === void 0 || a === void 0 || t[2] === void 0) return;
    let s = typeof r == "string" && typeof a == "string", l = s ? this.relIndex.get(r)?.get(a) : void 0;
    if (l === void 0) {
      if (l = { type: e, from: "", to: "", label: "" }, this.rels.push(l), s) {
        let n = this.relIndex.get(r);
        n === void 0 && this.relIndex.set(r, n = /* @__PURE__ */ new Map()), n.set(a, l);
      }
      typeof r == "string" ? l.from = r : l.fromAttr = r, typeof a == "string" ? l.to = a : l.toAttr = a;
    }
    l.type = e, bp(l, t[2]), bl(l, "techn", t[3]), bl(l, "descr", t[4]), Rt(l, "sprite", t[5]), Rt(l, "tags", t[6]), Rt(l, "link", t[7]);
  }
  getC4Shape(e) {
    return this.shapeIndex.get(e) ?? this.boundaryIndex.get(e);
  }
  updateElStyle(e, t) {
    let r = typeof t[0] == "string" ? this.getC4Shape(t[0]) : void 0;
    r !== void 0 && (Rt(r, "bgColor", t[1]), Rt(r, "fontColor", t[2]), Rt(r, "borderColor", t[3]), Rt(r, "shadowing", t[4]), Rt(r, "shape", t[5]), Rt(r, "sprite", t[6]), Rt(r, "techn", t[7]), Rt(r, "legendText", t[8]), Rt(r, "legendSprite", t[9]));
  }
  updateRelStyle(e, t) {
    let r = t[0], a = t[1], s = typeof r == "string" && typeof a == "string" ? this.relIndex.get(r)?.get(a) : void 0;
    if (s === void 0) return;
    Rt(s, "textColor", t[2]), Rt(s, "lineColor", t[3]);
    let l = t[4], n = t[5];
    typeof l == "string" ? s.offsetX = parseInt(l) : l !== void 0 && ds(s, l), typeof n == "string" ? s.offsetY = parseInt(n) : n !== void 0 && ds(s, n);
  }
  updateLayoutConfig(e, t) {
    let r = (l) => l === void 0 ? NaN : parseInt(typeof l == "string" ? l : l.value), a = r(t[0]), s = r(t[1]);
    a >= 1 && (this.shapeInRow = a), s >= 1 && (this.boundaryInRow = s);
  }
}, Mp = ["$end", "INVALID", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "title", "accDescription", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "NEWLINE", "C4_CONTEXT", "C4_CONTAINER", "C4_COMPONENT", "C4_DYNAMIC", "C4_DEPLOYMENT", "PERSON", "PERSON_EXT", "SYSTEM", "SYSTEM_DB", "SYSTEM_QUEUE", "SYSTEM_EXT", "SYSTEM_EXT_DB", "SYSTEM_EXT_QUEUE", "CONTAINER", "CONTAINER_DB", "CONTAINER_QUEUE", "CONTAINER_EXT", "CONTAINER_EXT_DB", "CONTAINER_EXT_QUEUE", "COMPONENT", "COMPONENT_DB", "COMPONENT_QUEUE", "COMPONENT_EXT", "COMPONENT_EXT_DB", "COMPONENT_EXT_QUEUE", "ENTERPRISE_BOUNDARY", "SYSTEM_BOUNDARY", "BOUNDARY", "CONTAINER_BOUNDARY", "NODE", "NODE_L", "NODE_R", "REL", "BIREL", "REL_U", "REL_D", "REL_L", "REL_R", "REL_B", "REL_INDEX", "UPDATE_EL_STYLE", "UPDATE_REL_STYLE", "UPDATE_LAYOUT_CONFIG", "EOF_IN_STRUCT", "ATTRIBUTE_EMPTY", "STR", "STR_KEY", "STR_VALUE", "LBRACE", "RBRACE", "EOF"], jM = /* @__PURE__ */ new Map([["C4Context", 14], ["C4Container", 15], ["C4Component", 16], ["C4Dynamic", 17], ["C4Deployment", 18], ["Person", 19], ["Person_Ext", 20], ["System", 21], ["SystemDb", 22], ["SystemQueue", 23], ["System_Ext", 24], ["SystemDb_Ext", 25], ["SystemQueue_Ext", 26], ["Container", 27], ["ContainerDb", 28], ["ContainerQueue", 29], ["Container_Ext", 30], ["ContainerDb_Ext", 31], ["ContainerQueue_Ext", 32], ["Component", 33], ["ComponentDb", 34], ["ComponentQueue", 35], ["Component_Ext", 36], ["ComponentDb_Ext", 37], ["ComponentQueue_Ext", 38], ["Enterprise_Boundary", 39], ["System_Boundary", 40], ["Boundary", 41], ["Container_Boundary", 42], ["Deployment_Node", 43], ["Node", 43], ["Node_L", 44], ["Node_R", 45], ["Rel", 46], ["BiRel", 47], ["Rel_Up", 48], ["Rel_U", 48], ["Rel_Down", 49], ["Rel_D", 49], ["Rel_Left", 50], ["Rel_L", 50], ["Rel_Right", 51], ["Rel_R", 51], ["Rel_Back", 52], ["RelIndex", 53], ["UpdateElementStyle", 54], ["UpdateRelStyle", 55], ["UpdateLayoutConfig", 56]]), Qh = [/.*direction\s+TB[^\n]*/y, /.*direction\s+BT[^\n]*/y, /.*direction\s+RL[^\n]*/y, /.*direction\s+LR[^\n]*/y], Jh = /[\n\r\u2028\u2029]/g, ec = /title[^\S\r\n]*(?=[\r\n]|$)\s*/y;
function qM(e) {
  let t = e.length, r = [], a = [], s = [], l = 0, n = 9, i = 0, o = !1, h = -2, c = -1, u = 0, d = (b, x, v) => {
    r.push(b), a.push(x), s.push(v), i = v;
  }, p = (b) => {
    for (; b < t && Ke(e.charCodeAt(b)); ) b++;
    return b;
  }, g = (b, x) => {
    let v = e.indexOf(b, x);
    return v === -1 ? t : v;
  }, y = (b, x) => {
    let v = i + b.length;
    if (!e.startsWith(b, i) || !Ke(e.charCodeAt(v))) return !1;
    let $ = ++v;
    for (; v < t; ) {
      let S = e.charCodeAt(v);
      if (S === 35 || S === 10 || S === 59) break;
      v++;
    }
    return v === $ ? !1 : (d(x, i, v), !0);
  };
  for (; ; ) {
    if (o) {
      d(0, t, t);
      break;
    }
    i >= t && (o = !0);
    let b = e.charCodeAt(i);
    if (l === 0) {
      if (i >= t) {
        d(64, t, t);
        continue;
      }
      if (h !== -1 && i >= u && (h < i && (h = e.indexOf("direction", i)), h !== -1 && (c < i && (Jh.lastIndex = i, c = Jh.test(e) ? Jh.lastIndex - 1 : t), h < c))) {
        let x = !1;
        for (let v = 0; v < 4 && !x; v++) Qh[v].lastIndex = i, Qh[v].test(e) && (d(2 + v, i, Qh[v].lastIndex), x = !0);
        if (x) continue;
        u = c;
      }
      if (b === 116) {
        if (ec.lastIndex = i, ec.test(e)) {
          i = ec.lastIndex;
          continue;
        }
        if (y("title", 6)) continue;
      }
      if (b === 97) {
        if (y("accDescription", 7)) continue;
        let x = e.startsWith("accTitle", i);
        if (x || e.startsWith("accDescr", i)) {
          let v = p(i + 8), $ = e.charCodeAt(v);
          if ($ === 58) {
            d(x ? 8 : 10, i, p(v + 1)), n = x ? 9 : 11, l = 7;
            continue;
          }
          if ($ === 123 && !x) {
            i = p(v + 1), l = 8;
            continue;
          }
        }
      }
      if (b === 37 && e.charCodeAt(i + 1) === 37) {
        let x = g(`
`, i + 2);
        for (; x < t && (e.charCodeAt(x) === 10 || e.charCodeAt(x) === 13); ) x++;
        i = x;
        continue;
      }
      if (Ke(b)) {
        let x = i, v = -1;
        for (; x < t; ) {
          let $ = e.charCodeAt(x);
          if (!Ke($)) break;
          $ === 10 && (v = x), x++;
        }
        v !== -1 ? d(13, i, v + 1) : i = x;
        continue;
      }
      if (b === 123) {
        d(62, i, i + 1);
        continue;
      }
      if (b === 125) {
        d(63, i, i + 1);
        continue;
      }
      if (nt(b)) {
        let x = i + 1;
        for (; x < t && nt(e.charCodeAt(x)); ) x++;
        let v = x - i <= 19 ? jM.get(e.slice(i, x)) : void 0;
        if (v !== void 0) {
          v > 18 && (l = 1), d(v, i, x);
          continue;
        }
      }
      d(1, i, i);
      break;
    }
    if (l === 1) {
      if (i >= t) d(57, t, t);
      else if (b === 40) {
        let x = i + 1;
        for (; e.charCodeAt(x) === 32; ) x++;
        e.charCodeAt(x) === 44 ? d(58, i, x + 1) : i++, l = 2;
      } else if (b === 41) i++, l = 0;
      else {
        d(1, i, i);
        break;
      }
      continue;
    }
    if (l === 2) {
      if (i >= t) continue;
      if (b === 41) i++, l = 0;
      else if (b === 44) e.charCodeAt(i + 1) === 44 ? d(58, i, i + 2) : i++;
      else {
        let x = i;
        for (; e.charCodeAt(x) === 32; ) x++;
        let v = e.charCodeAt(x);
        v === 34 ? e.charCodeAt(x + 1) === 34 ? d(58, i, x + 2) : (i = x + 1, l = 3) : v === 36 ? (i = x + 1, l = 4) : d(59, i, g(",", i));
      }
      continue;
    }
    if (l === 3) {
      b === 34 ? (i++, l = 2) : d(59, i, g('"', i));
      continue;
    }
    if (l === 4) {
      d(60, i, g("=", i)), l = 5;
      continue;
    }
    if (l === 5) {
      if (i >= t) continue;
      let x = i + 1;
      if (b === 61) for (; e.charCodeAt(x) === 32; ) x++;
      if (b !== 61 || e.charCodeAt(x) !== 34) {
        d(1, i, i);
        break;
      }
      i = x + 1, l = 6;
      continue;
    }
    if (l === 6) {
      if (i >= t) continue;
      b === 34 ? (i++, l = 2) : d(61, i, g('"', i));
      continue;
    }
    if (l === 7) {
      d(n, i, g(`
`, i)), l = 0;
      continue;
    }
    b === 125 ? (i++, l = 0) : d(12, i, g("}", i));
  }
  return { types: r, starts: a, ends: s };
}
var tc = ["person", "external_person", "system", "system_db", "system_queue", "external_system", "external_system_db", "external_system_queue", "container", "container_db", "container_queue", "external_container", "external_container_db", "external_container_queue", "component", "component_db", "component_queue", "external_component", "external_component_db", "external_component_queue"], VM = ["rel", "birel", "rel_u", "rel_d", "rel_l", "rel_r", "rel_b", "rel"], KM = ["node", "nodeL", "nodeR"], XM = "'direction_tb', 'direction_bt', 'direction_rl', 'direction_lr', 'C4_CONTEXT', 'C4_CONTAINER', 'C4_COMPONENT', 'C4_DYNAMIC', 'C4_DEPLOYMENT'", ZM = "'STR', 'STR_KEY', 'ATTRIBUTE', 'ATTRIBUTE_EMPTY'";
function QM(e) {
  return e === 6 || e === 7 || e === 8 || e === 10 || e === 12;
}
function vp(e) {
  return e >= 19 && e <= 56;
}
function JM(e, t) {
  let { types: r, starts: a, ends: s } = qM(e), l = 0, n = (y) => e.slice(a[y], s[y]), i = (y) => {
    let b = r[l];
    throw b === 1 ? bt("c4", e, a[l], "", !0) : bt("c4", e, a[l], `Expecting ${y}, got '${Mp[b]}'`);
  }, o = (y) => {
    r[l] !== y && i(`'${Mp[y]}'`), l++;
  }, h = () => {
    let y = [];
    for (; ; ) {
      let b = r[l];
      if (b === 59) y.push(n(l++).trim());
      else if (b === 58) y.push(""), l++;
      else if (b === 60) l++, r[l] !== 61 && i("'STR_VALUE'"), y.push({ key: n(l - 1).trim(), value: n(l).trim() }), l++;
      else break;
    }
    return y.length === 0 && i(ZM), y;
  }, c = (y) => {
    y === 6 ? t.setTitle(n(l++).substring(6)) : y === 7 ? t.setAccDescription(n(l++).substring(15)) : y === 12 ? t.setAccDescription(n(l++).trim()) : (l++, y === 8 ? (r[l] !== 9 && i("'acc_title_value'"), t.setTitle(n(l++).trim())) : (r[l] !== 11 && i("'acc_descr_value'"), t.setAccDescription(n(l++).trim())));
  }, u = (y) => {
    l++;
    let b = h();
    if (y <= 26) t.addPersonOrSystem(tc[y - 19], b);
    else if (y <= 32) t.addContainer(tc[y - 19], b);
    else if (y <= 38) t.addComponent(tc[y - 19], b);
    else {
      if (y <= 45) return y === 39 ? b.splice(2, 0, "ENTERPRISE") : y === 40 ? b.splice(2, 0, "SYSTEM") : y === 42 && b.splice(2, 0, "CONTAINER"), y >= 43 ? t.addDeploymentNode(KM[y - 43], b) : y === 42 ? t.addContainerBoundary(b) : t.addPersonOrSystemBoundary(b), r[l] === 62 ? (l++, o(13)) : r[l] === 13 ? (l++, o(62), r[l] === 13 && l++) : i("'NEWLINE', 'LBRACE'"), !0;
      y <= 53 ? (y === 53 && b.splice(0, 1), t.addRel(VM[y - 46], b)) : y === 54 ? t.updateElStyle("update_el_style", b) : y === 55 ? t.updateRelStyle("update_rel_style", b) : t.updateLayoutConfig("update_layout_config", b);
    }
    return !1;
  }, d = r[l];
  (d < 14 || d > 18) && i(XM), l++, o(13);
  let p = 0, g = 0;
  for (; ; ) {
    let y = r[l];
    if (g === 3 || g === 4) {
      if (y === 13) {
        l++, g = 2;
        continue;
      }
      if (g === 3 && vp(y)) {
        g = 1;
        continue;
      }
    } else if (vp(y)) {
      u(y) ? (p++, g = 1) : g = 4;
      continue;
    } else if (QM(y) && g !== 1) {
      c(y), g = 3;
      continue;
    } else g !== 2 && i("'title', 'accDescription', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'PERSON', 'REL'");
    if (p > 0) y !== 63 && i("'NEWLINE', 'RBRACE'"), l++, t.popBoundaryParseStack(), p--, g = 4;
    else {
      y !== 64 && i("'NEWLINE', 'EOF'"), l++, o(0), t.setC4Type(n(0));
      return;
    }
  }
}
var rc = /\s/;
function No(e, t, r, a, s = 0) {
  let l = [];
  for (let h of e.split(`
`)) {
    let c = Array.from(h);
    c.length === 0 && l.push("");
    let u = 0;
    for (; u < c.length; ) {
      let d = (v) => t.width(c.slice(u, u + v).join(""), r, s) <= a, p = 1;
      for (; p < c.length - u && d(p); ) p = Math.min(c.length - u, p * 2);
      let g = 1;
      for (; g < p; ) {
        let v = Math.ceil((g + p) / 2);
        d(v) ? g = v : p = v - 1;
      }
      let y = g, b = u + y < c.length;
      if (b && !rc.test(c[u + y])) {
        for (let v = y - 1; v > 0; v--) if (rc.test(c[u + v])) {
          y = v + 1;
          break;
        }
      }
      let x = c.slice(u, u + y).join("");
      for (l.push(b && x.trimEnd() || x), u += y; b && u < c.length && rc.test(c[u]); ) u++;
    }
  }
  e === "" && (l.length = 0);
  let n = l.map((h) => t.width(h, r, s)), i = 0;
  for (let h of n) i = Math.max(i, h);
  let o = Math.round(r * 1.5);
  return { lines: l.map((h, c) => [{ text: h, style: s, width: n[c] }]), widths: n, width: i, height: l.length * o, size: r, lineHeight: o };
}
function Ro(e, t, r) {
  if (e.width <= r) return e;
  let a = [], s = [];
  for (let i = 0; i < e.lines.length; i++) {
    if (e.widths[i] <= r) {
      a.push(e.lines[i]), s.push(e.widths[i]);
      continue;
    }
    let o = [], h = 0, c = () => {
      a.push(o), s.push(h), o = [], h = 0;
    };
    for (let u of e.lines[i]) {
      if (u.icon !== void 0 || u.math) {
        o.length && h + u.width > r && c(), o.push(u), h += u.width;
        continue;
      }
      for (let d of Array.from(u.text)) {
        let p = o[o.length - 1], g = p && p.icon === void 0 && p.math === void 0 && p.style === u.style, y = t.width(g ? p.text + d : d, e.size, u.style) - (g ? p.width : 0);
        o.length && h + y > r && (c(), p = void 0, y = t.width(d, e.size, u.style)), p && p.icon === void 0 && p.math === void 0 && p.style === u.style ? (p.text += d, p.width += y) : o.push({ text: d, style: u.style, width: y }), h += y;
      }
    }
    (o.length || !e.lines[i].length) && c();
  }
  let l = 0;
  for (let i of s) l = Math.max(l, i);
  let n = { ...e, lines: a, widths: s, width: l, height: a.length * e.lineHeight };
  return e.heights ? Vf(n) : n;
}
function Kl(e, t, r, a) {
  let s = Cs(e), l = "<text" + sl(a, s), n = "";
  for (let i = 0; i < e.lines.length; i++) {
    let o = e.lines[i], h = r + (i + 0.5) * e.lineHeight;
    if (o.some((u) => u.icon !== void 0)) {
      let u = e.widths[i];
      n += Pe({ ...e, lines: [o], widths: [u], height: e.lineHeight }, t + u / 2, h, a);
      continue;
    }
    let c = "";
    for (let u of o) {
      let d = Jl(u.style & ~s);
      c += d ? `<tspan${d}>${it(u.text)}</tspan>` : it(u.text);
    }
    c !== "" && (n += `${l} x="${f(t)}" y="${f(h + e.size * 0.35)}" text-anchor="start" xml:space="preserve">${c}</text>`);
  }
  return n;
}
var Ml = 28, vs = 20, om = 7, ev = 8, tv = 30, Do = 88, Lo = 160, hm = 8, Zf = 26, cm = (e) => Math.min(12, Math.max(6, e / 14)), dm = (e) => Math.min(12, e / 4);
function el(e, t, r, a, s, l, n, i) {
  let o = 0, h = 1;
  if (n === 0) {
    if (s < e || s > r) return 1 / 0;
  } else {
    let c = (e - s) / n, u = (r - s) / n;
    o = Math.max(o, Math.min(c, u)), h = Math.min(h, Math.max(c, u));
  }
  if (i === 0) {
    if (l < t || l > a) return 1 / 0;
  } else {
    let c = (t - l) / i, u = (a - l) / i;
    o = Math.max(o, Math.min(c, u)), h = Math.min(h, Math.max(c, u));
  }
  return o <= h ? o : 1 / 0;
}
function ki(e, t, r, a, s, l, n, i) {
  let o = n / r, h = i / a, c = (s - e) / r, u = (l - t) / a, d = o * o + h * h, p = 2 * (o * c + h * u), g = c * c + u * u - 1, y = p * p - 4 * d * g;
  if (d === 0 || y < 0) return 1 / 0;
  let b = (-p - Math.sqrt(y)) / (2 * d);
  return b >= 0 && b <= 1 ? b : g <= 0 ? 0 : 1 / 0;
}
function xr(e, t, r, a, s) {
  let { x: l, y: n, w: i, h: o } = e, h = a - t, c = s - r;
  if (e.form === "person") return Math.min(el(l, n + Zf, l + i, n + o, t, r, h, c), ki(l + i / 2, n + 14, 13, 13, t, r, h, c));
  if (e.form === "cyl") {
    let u = cm(i);
    return Math.min(el(l, n + u, l + i, n + o - u, t, r, h, c), ki(l + i / 2, n + u, i / 2, u, t, r, h, c), ki(l + i / 2, n + o - u, i / 2, u, t, r, h, c));
  }
  if (e.form === "h-cyl") {
    let u = dm(o);
    return Math.min(el(l + u, n, l + i - u, n + o, t, r, h, c), ki(l + u, n + o / 2, u, o / 2, t, r, h, c), ki(l + i - u, n + o / 2, u, o / 2, t, r, h, c));
  }
  return el(l, n, l + i, n + o, t, r, h, c);
}
function fm(e, t, r, a, s) {
  for (let l = 2; l < e.length; l += 2) {
    let n = e[l - 2], i = e[l - 1];
    if (el(t, r, a, s, n, i, e[l] - n, e[l + 1] - i) <= 1) return !0;
  }
  return !1;
}
function Oo(e, t) {
  return e.x <= t.x && e.y <= t.y && e.x + e.w >= t.x + t.w && e.y + e.h >= t.y + t.h;
}
function rv(e, t, r) {
  let a = e.x + e.w / 2, s = e.y + e.h / 2, l = t.x + t.w / 2, n = t.y + t.h / 2, i = Oo(e, t);
  if (i || Oo(t, e)) {
    let R = i ? e : t, D = i ? t : e, O = D.x + D.w / 2, U = D.y + D.h / 2, q = D.x - R.x, C = R.x + R.w - D.x - D.w, ee = D.y - R.y, ie = R.y + R.h - D.y - D.h, G = Math.min(q, C, ee, ie), z = G === q ? R.x : G === C ? R.x + R.w : O, _ = G === q || G === C ? U : G === ie ? R.y + R.h : R.y, T = Math.min(xr(D, z, _, O, U), 1), E = z + (O - z) * T, M = _ + (U - _) * T;
    return i ? [z, _, E, M] : [E, M, z, _];
  }
  let o = a, h = s, c = l, u = n, d = Math.max(e.x, t.x), p = Math.min(e.x + e.w, t.x + t.w), g = Math.max(e.y, t.y), y = Math.min(e.y + e.h, t.y + t.h);
  d < p ? o = c = (d + p) / 2 : g < y && (h = u = (g + y) / 2);
  let b = Math.hypot(c - o, u - h) || 1, x = -(u - h) / b * r, v = (c - o) / b * r, $ = xr(e, c + x, u + v, o + x, h + v), S = xr(t, o + x, h + v, c + x, u + v);
  return $ <= 1 && S <= 1 ? (o += x, h += v, c += x, u += v) : (o = a, h = s, c = l, u = n, $ = Math.min(xr(e, c, u, o, h), 1), S = Math.min(xr(t, o, h, c, u), 1)), [c + (o - c) * $, u + (h - u) * $, o + (c - o) * S, h + (u - h) * S];
}
var nf = 6, av = 3, kp = 12, lv = class {
  upright = [];
  level = [];
  frames = [[], []];
  taken = /* @__PURE__ */ new Map();
  squeezed = 0;
  free(e, t, r, a) {
    let s = Math.min(r, a), l = Math.max(r, a), n = (i, o) => {
      for (let h = 0; h < i.length; h += 3) if (Math.abs(i[h] - t) < o && i[h + 1] < l && i[h + 2] > s) return !0;
      return !1;
    };
    return !n(e ? this.upright : this.level, nf) && !n(this.frames[e ? 0 : 1], av);
  }
  crossings(e) {
    let t = 0;
    for (let r = 2; r < e.length; r += 2) {
      let a = e[r] === e[r - 2], s = a ? e[r] : e[r + 1], l = Math.min(a ? e[r - 1] : e[r - 2], a ? e[r + 1] : e[r]), n = Math.max(a ? e[r - 1] : e[r - 2], a ? e[r + 1] : e[r]), i = a ? this.level : this.upright;
      for (let o = 0; o < i.length; o += 3) i[o] > l && i[o] < n && i[o + 1] < s && i[o + 2] > s && t++;
    }
    return t;
  }
  frame(e) {
    this.frames[0].push(e.x, e.y, e.y + e.h, e.x + e.w, e.y, e.y + e.h), this.frames[1].push(e.y, e.x, e.x + e.w, e.y + e.h, e.x, e.x + e.w);
  }
  take(e) {
    for (let t = 2; t < e.length; t += 2) e[t] === e[t - 2] ? this.upright.push(e[t], Math.min(e[t - 1], e[t + 1]), Math.max(e[t - 1], e[t + 1])) : e[t + 1] === e[t - 1] && this.level.push(e[t + 1], Math.min(e[t - 2], e[t]), Math.max(e[t - 2], e[t]));
  }
  ports(e, t, r, a, s) {
    let l = this.taken.get(e) ?? [], n = [];
    for (let i = 0; i < 9 && n.length < 4; i++) {
      let o = r + (i & 1 ? 1 : -1) * Math.ceil(i / 2) * kp;
      if (o < a || o > s) continue;
      let h = !0;
      for (let c = 0; c < l.length; c += 2) l[c] === t && Math.abs(l[c + 1] - o) < kp && (h = !1);
      h && n.push(o);
    }
    return n.length ? n : [r];
  }
  claim(e, t, r) {
    let a = this.taken.get(e);
    a ? a.push(t, r) : this.taken.set(e, [t, r]);
  }
};
function iv(e, t, r) {
  let a = e.length, s = Math.sign(e[2] - e[0]), l = Math.sign(e[3] - e[1]), n = `M${f(e[0] + s * t)},${f(e[1] + l * t)}`;
  for (let h = 2; h < a - 2; h += 2) {
    let c = e[h], u = e[h + 1], d = Math.sign(c - e[h - 2]), p = Math.sign(u - e[h - 1]), g = Math.sign(e[h + 2] - c), y = Math.sign(e[h + 3] - u), b = Math.min(ev, Math.abs(c - e[h - 2] + u - e[h - 1]) / 2, Math.abs(e[h + 2] - c + e[h + 3] - u) / 2);
    n += `${d ? "H" + f(c - d * b) : "V" + f(u - p * b)}Q${f(c)},${f(u)} ${f(c + g * b)},${f(u + y * b)}`;
  }
  let i = Math.sign(e[a - 2] - e[a - 4]), o = Math.sign(e[a - 1] - e[a - 3]);
  return n + (i ? "H" + f(e[a - 2] - i * r) : "V" + f(e[a - 1] - o * r));
}
function um(e, t, r, a) {
  for (let s of t) if (s !== r && s !== a && fm(e, s.x, s.y, s.x + s.w, s.y + s.h)) return !1;
  return !0;
}
function pm(e, t, r, a, s) {
  let l = e.length;
  return { d: iv(e, r, a), sx: e[0], sy: e[1], sdx: -Math.sign(e[2] - e[0]), sdy: -Math.sign(e[3] - e[1]), ex: e[l - 2], ey: e[l - 1], edx: Math.sign(e[l - 2] - e[l - 4]), edy: Math.sign(e[l - 1] - e[l - 3]), x0: e[t], y0: e[t + 1], x1: e[t + 2], y1: e[t + 3], nx: 0, ny: 0, lean: 0, room: Lo, ...s, points: e };
}
function Ap(e, t) {
  let r = [], a = (e + t) / 2, s = Math.max(om, (t - e) / 4);
  for (let l = 0; l < 9; l++) {
    let n = a + (l & 1 ? 1 : -1) * Math.ceil(l / 2) * s;
    n >= e + nf && n <= t - nf && r.push(n);
  }
  return r;
}
function sv(e, t, r, a, s, l) {
  let n = e.x + e.w / 2, i = e.y + e.h / 2, o = t.x + t.w / 2, h = t.y + t.h / 2, c, u = (y, b, x) => {
    if (!um(y, r, e, t)) return;
    for (let $ = 2; $ < y.length; $ += 2) {
      let S = y[$] === y[$ - 2];
      if (!a.free(S, S ? y[$] : y[$ + 1], S ? y[$ - 1] : y[$ - 2], S ? y[$ + 1] : y[$])) return;
    }
    let v = a.crossings(y) * 1e6;
    for (let $ = 2; $ < y.length; $ += 2) v += Math.abs(y[$] - y[$ - 2]) + Math.abs(y[$ + 1] - y[$ - 1]);
    (!c || v < c.cost) && (c = { points: y, cost: v, upright: b, sides: x });
  };
  if (e.x + e.w <= t.x || t.x + t.w <= e.x) {
    let y = o > n, b = Math.sign(h - i), x = y ? [1, 0] : [0, 1], v = Ap(y ? e.x + e.w : t.x + t.w, y ? t.x : e.x);
    e: for (let $ of a.ports(e, x[0], i + b * e.h / 4, e.y + 8, e.y + e.h - 8)) for (let S of a.ports(t, x[1], h - b * t.h / 4, t.y + 8, t.y + t.h - 8)) for (let R of v) {
      let D = R + (n - R) * Math.min(xr(e, R, $, n, $), 1), O = R + (o - R) * Math.min(xr(t, R, S, o, S), 1), U = c;
      if (u([D, $, R, $, R, S, O, S], !0, x), c !== U) break e;
    }
  }
  if (e.y + e.h <= t.y || t.y + t.h <= e.y) {
    let y = h > i, b = Math.sign(o - n), x = y ? [3, 2] : [2, 3], v = Ap(y ? e.y + e.h : t.y + t.h, y ? t.y : e.y);
    e: for (let $ of a.ports(e, x[0], n + b * e.w / 4, e.x + 8, e.x + e.w - 8)) for (let S of a.ports(t, x[1], o - b * t.w / 4, t.x + 8, t.x + t.w - 8)) for (let R of v) {
      let D = R + (i - R) * Math.min(xr(e, $, R, $, i), 1), O = R + (h - R) * Math.min(xr(t, S, R, S, h), 1), U = c;
      if (u([$, D, $, R, S, R, S, O], !1, x), c !== U) break e;
    }
  }
  if (!c) return;
  let { points: d, upright: p, sides: g } = c;
  return a.take(d), a.claim(e, g[0], p ? d[1] : d[0]), a.claim(t, g[1], p ? d[7] : d[6]), pm(d, 2, s, l, { room: p ? Do : Lo });
}
function nv(e, t, r, a, s, l, n) {
  if (e === t) {
    let b = Math.min(e.h / 2 - 4, 10), x = Math.hypot(Ml, b), v = e.x + e.w, $ = e.y + e.h / 2, S = Ml / x, R = b / x;
    return { d: `M${f(v + S * l)},${f($ - b - R * l)}C${f(v + Ml)},${f($ - b * 2)} ${f(v + Ml)},${f($ + b * 2)} ${f(v + S * n)},${f($ + b + R * n)}`, sx: v, sy: $ - b, sdx: -S, sdy: R, ex: v, ey: $ + b, edx: -S, edy: -R, x0: v + Ml + 4, y0: $, x1: v + Ml + 4, y1: $, nx: 1, ny: 0, lean: 0, room: 64, points: [] };
  }
  let [i, o, h, c] = rv(e, t, r), u = i === h, d = !1;
  if (a && !Oo(e, t) && !Oo(t, e)) for (let b of a) b !== e && b !== t && el(b.x, b.y, b.x + b.w, b.y + b.h, i, o, h - i, c - o) <= 1 && (d = !0);
  if (a && d && !u && o !== c) {
    let b = sv(e, t, a, s, l, n);
    if (b) return b;
    s.squeezed++;
  }
  if (a && d && (u || o === c)) {
    let b = (w) => {
      let B = w ? -1 / 0 : 1 / 0, N = (j) => {
        let F = u ? j.x : j.y;
        B = w ? Math.max(B, F + (u ? j.w : j.h)) : Math.min(B, F);
      };
      N(e), N(t);
      for (let j of a) j !== e && j !== t && el(j.x, j.y, j.x + j.w, j.y + j.h, i, o, h - i, c - o) <= 1 && N(j);
      return B;
    }, x = u ? Math.min(e.y, t.y) : Math.min(e.x, t.x), v = u ? Math.max(e.y + e.h, t.y + t.h) : Math.max(e.x + e.w, t.x + t.w), $ = (w, B) => {
      for (let N of a) {
        if (N === e || N === t) continue;
        let j = u ? N.y < v && N.y + N.h > x : N.x < v && N.x + N.w > x, F = u ? N.x : N.y, Y = F + (u ? N.w : N.h);
        if (j && (w ? Y > B : F < B)) return !1;
      }
      return !0;
    }, S = e.x + e.w / 2, R = e.y + e.h / 2, D = t.x + t.w / 2, O = t.y + t.h / 2, U = Math.sign(u ? O - R : D - S), q = (w) => {
      let B = b(w), N = w ? 1 : -1, j = u ? w ? 1 : 0 : w ? 3 : 2, F = u ? s.ports(e, j, R + U * e.h / 4, e.y + 8, e.y + e.h - 8)[0] : s.ports(e, j, S + U * e.w / 4, e.x + 8, e.x + e.w - 8)[0], Y = u ? s.ports(t, j, O - U * t.h / 4, t.y + 8, t.y + t.h - 8)[0] : s.ports(t, j, D - U * t.w / 4, t.x + 8, t.x + t.w - 8)[0], W = (H) => {
        if (u) {
          let L = H + (S - H) * Math.min(xr(e, H, F, S, F), 1), X = H + (D - H) * Math.min(xr(t, H, Y, D, Y), 1);
          return [L, F, H, F, H, Y, X, Y];
        }
        let te = H + (R - H) * Math.min(xr(e, F, H, F, R), 1), Q = H + (O - H) * Math.min(xr(t, Y, H, Y, O), 1);
        return [F, te, F, H, Y, H, Y, Q];
      }, K = W(B + N * vs);
      for (let H = 0; H <= 4; H++) {
        let te = B + N * (vs + H * om), Q = W(te);
        if (um(Q, a, e, t) && (K = Q, s.free(u, te, F, Y))) return { points: K, side: j, p0: F, p1: Y, step: H };
      }
      return { points: K, side: j, p0: F, p1: Y, step: 5 };
    }, C = u ? c > o : h < i, ee = $(C, b(C)), ie = $(!C, b(!C)), G = q(C), z = ee === ie ? q(!C) : void 0, _ = (w) => s.crossings(w.points) * 8 + w.step, T = ie && !ee || z && _(z) < _(G) ? !C : C, { points: E, side: M, p0: A, p1: m, step: I } = T === C ? G : z ?? q(!C), k = T ? 1 : -1;
    return I > 4 && s.squeezed++, s.take(E), s.claim(e, M, A), s.claim(t, M, m), pm(E, 2, l, n, u ? { nx: k, lean: tv, room: Do } : { room: Lo });
  }
  let p = Math.hypot(h - i, c - o) || 1, g = (h - i) / p, y = (c - o) / p;
  return (u || o === c) && s.take([i, o, h, c]), { d: `M${f(i + g * l)},${f(o + y * l)}L${f(h - g * n)},${f(c - y * n)}`, sx: i, sy: o, sdx: -g, sdy: -y, ex: h, ey: c, edx: g, edy: y, x0: i, y0: o, x1: h, y1: c, nx: r ? -y : 0, ny: r ? g : 0, lean: 0, room: Math.abs(g) > Math.abs(y) ? Do : Lo, points: [i, o, h, c] };
}
var of = 216, ov = 64, Ep = 14, hv = 12, cv = Do + hm + 3 * Nt, dv = 88, Tp = vs + 8, rn = 48, fs = 16, hf = 10, ac = /* @__PURE__ */ new Map([["person", "person"], ["box", "rect"], ["rounded", "rect"], ["component", "rect"], ["cylinder", "cyl"], ["database", "cyl"], ["db", "cyl"], ["queue", "h-cyl"], ["pipe", "h-cyl"]]);
function fv(e) {
  let t = ac.get((e.shape ?? "").toLowerCase()) ?? ac.get((e.sprite ?? "").toLowerCase());
  if (t) return t;
  if (e.tags) for (let a of e.tags.split(",")) {
    let s = ac.get(a.trim().toLowerCase());
    if (s) return s;
  }
  let r = e.kind;
  return r.endsWith("person") ? "person" : r.endsWith("_db") ? "cyl" : r.endsWith("_queue") ? "h-cyl" : "rect";
}
function uv(e, t, r, a, s = of) {
  let l = fv(e), n = l === "h-cyl" ? 36 : 0, i = l === "person" ? Zf : l === "cyl" ? 24 : 0, o = s - 2 * Ep - n, h = [je("«" + e.kind.replace(/_/g, " ") + "»", !1, t, a - 1, o), je(e.label, !1, t, r, o, 1), je(e.techn ? `[${e.techn}]` : void 0, !1, t, a, o), je(e.descr, !1, t, a, o)], c = 0, u = h[3].height > 0 ? 4 : 0;
  for (let d of h) c = Math.max(c, d.width), u += d.height;
  return { shape: e, form: l, labels: h, textH: u, x: 0, y: 0, w: Math.max(s, c + 2 * Ep + n), h: Math.max(ov, u + 2 * hv + i) };
}
function Cp(e, t, r, a, s) {
  let l = 0, n = 0;
  for (let i = 0; i < e.length; i += t) {
    let o = Math.min(e.length, i + t), h = 0, c = 0;
    for (let u = i; u < o; u++) c = Math.max(c, e[u].h);
    for (let u = i; u < o; u++) {
      let d = e[u];
      d.x = h, d.y = n, s && (d.h = c), h += d.w + r;
    }
    l = Math.max(l, h - r), n += c + a;
  }
  return [l, e.length > 0 ? n - a : 0];
}
function pv(e, t, r, a, s, l) {
  let n = s === void 0 ? Tp : 12, i = /* @__PURE__ */ new Map();
  for (let y of e.boundaries) {
    let b = s === void 0 ? 4e3 : Math.max(80, s - 2 * fs - 2 * Tp * 2), x = y.parent ? [je(y.label, !1, t, r, b, 1), je(y.type ? `[${y.type}]` : void 0, !1, t, a, b), je(y.descr, !1, t, a, b)] : [], v = 0, $ = 0;
    for (let S of x) v += S.height, $ = Math.max($, S.width);
    i.set(y, { boundary: y, kids: [], nodes: [], labels: x, head: v > 0 ? v + hf + 6 + vs : n, headW: $, headX: fs, x: 0, y: 0, w: 0, h: 0, form: "rect" });
  }
  let o = i.get(e.boundaries[0]);
  for (let y of i.values()) {
    let b = y.boundary.parent;
    b && i.get(b)?.kids.push(y);
  }
  let h = [o], c = /* @__PURE__ */ new Map([[o.boundary, 0]]);
  for (let y = 0; y < h.length; y++) for (let b of h[y].kids) c.set(b.boundary, c.get(h[y].boundary) + 1), h.push(b);
  for (let y of e.shapes) if (y.parent) {
    let b = c.get(y.parent) ?? 0, x = s === void 0 ? of : Math.max(100, Math.min(of, s - 2 * b * n - 32));
    i.get(y.parent)?.nodes.push(uv(y, t, r, a, x));
  }
  let u = Math.max(1, e.shapeInRow), d = Math.max(1, e.boundaryInRow), p = /* @__PURE__ */ new Map();
  for (let y = h.length - 1; y >= 0; y--) {
    let b = h[y], x = s === void 0 ? cv : l, v = (q, C, ee) => {
      if (s === void 0) return C;
      let ie = 1;
      for (let G of q) ie = Math.max(ie, G.w);
      return Math.max(1, Math.min(C, Math.floor((s + ee - 2 * n) / (ie + ee))));
    }, [$, S] = Cp(b.nodes, v(b.nodes, u, x), x, dv, !0), [R, D] = Cp(b.kids, v(b.kids, d, rn), rn, rn, !1), O = S > 0 && D > 0 ? rn : 0, U = b === o ? 0 : n;
    p.set(b, S + O), b.w = Math.max($, R, b.headW + 2 * fs - 2 * U) + 2 * U, b.h = (U && b.head) + S + O + D + U;
  }
  let g = /* @__PURE__ */ new Map();
  for (let y of h) {
    let b = y.x + (y === o ? 0 : n), x = y.y + (y === o ? 0 : y.head);
    for (let v of y.nodes) v.x += b, v.y += x, g.set(v.shape, v);
    for (let v of y.kids) v.x += b, v.y += x + p.get(y);
    y !== o && g.set(y.boundary, y);
  }
  return { order: h, boxes: g };
}
var gv = 7, so = 36, lc = 24, Sp = 2e3, an = 8, mv = [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8], yv = 2e6;
function Ai(e, t, r) {
  let a = [];
  return e && a.push("fill:" + e), t && a.push("stroke:" + t), r && a.push("color:" + r), Dt(a);
}
function ic(e, t, r, a, s) {
  return t ? oi(e, rh(t.includes("¶ß") ? t.replace(/\ufb02\u00b0\u00b0?/g, "#").replace(/\u00b6\u00df/g, ";") : t), r, a, s) : e;
}
function xv(e, t, r) {
  return Da(r, (a) => {
    if (!a) return sc(e, t, r, !1)[0];
    let [s, l] = sc(e, t, r, !0, so);
    for (let n = so + lc; l > 0 && n <= so + 3 * lc; n += lc) {
      let [i, o] = sc(e, t, r, !0, n);
      o < l && ([s, l] = [i, o]);
    }
    return s;
  });
}
function sc(e, t, r, a, s = so) {
  let l = r.fontSize ?? 16, n = Math.round(l * 0.8125), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = [], { order: c, boxes: u } = pv(e, i, l, n, a ? Math.max(80, (r.maxWidth ?? 320) - 2 * o) : void 0, s), d = c[0], p = 0, g = 0, y = d.w, b = d.h, x = (N, j, F, Y) => {
    p = Math.min(p, N), g = Math.min(g, j), y = Math.max(y, F), b = Math.max(b, Y);
  }, v = [], $ = /* @__PURE__ */ new Map();
  for (let N of e.rels) {
    let j = N.fromAttr ? void 0 : e.getC4Shape(N.from), F = N.toAttr ? void 0 : e.getC4Shape(N.to), Y = j && u.get(j), W = F && u.get(F);
    if (!Y || !W) throw new at(`C4 rel "${N.from}" -> "${N.to}" references an unknown shape or boundary`, "semantic", { type: "c4" });
    v.push(Y, W);
    let K = $.get(Y);
    K || $.set(Y, K = /* @__PURE__ */ new Set()), K.add(W);
  }
  let S = [], R = [];
  for (let N of c) for (let j of N.nodes) S.push(j), R.push(j.x + an, j.y + an, j.x + j.w - an, j.y + j.h - an);
  let D = e.rels.length * (S.length + c.length + 3 * e.rels.length) <= yv, O = (N, j, F, Y) => {
    let W = 0;
    for (let K = 0; K < R.length; K += 4) {
      let H = Math.min(F, R[K + 2]) - Math.max(N, R[K]);
      if (H <= 0) continue;
      let te = Math.min(Y, R[K + 3]) - Math.max(j, R[K + 1]);
      te > 0 && (W += H * te);
    }
    return W;
  }, U = (N) => N ? Math.max(-Sp, Math.min(Sp, N)) : 0, q = "", C = "", ee = Ct("arrow_point"), ie = [];
  for (let N of c) {
    if (N === d) continue;
    let j = Ai(N.boundary.bgColor, void 0, void 0).shape;
    Ia(j) && ie.push({ box: [N.x, N.y, N.x + N.w, N.y + N.h], shape: j });
  }
  let G = new lv();
  for (let N of c) N !== d && G.frame(N);
  let z = e.rels.map((N, j) => {
    let F = v[j * 2], Y = v[j * 2 + 1], W = Ai(void 0, N.lineColor, void 0), K = N.type === "birel" || N.type === "rel_b", H = N.type !== "rel_b", te = F !== Y && $.get(Y)?.has(F) === !0, Q = nv(F, Y, te ? gv : 0, D ? S : void 0, G, K ? ee : 0, H ? ee : 0);
    x(Math.min(Q.x0, Q.x1), Math.min(Q.y0, Q.y1), Math.max(Q.x0, Q.x1), Math.max(Q.y0, Q.y1)), K && D && R.push(Q.sx - Nt, Q.sy - Nt, Q.sx + Nt, Q.sy + Nt), H && D && R.push(Q.ex - Nt, Q.ey - Nt, Q.ex + Nt, Q.ey + Nt);
    let L = Is(Q.d, [Q.sx, Q.sy, Q.ex, Q.ey], ie, W.line), X = L || (W.stroke ? it(W.stroke) : "var(--_l)");
    return L === "" && (q += Ns(Q, K ? "arrow_point" : "none", H ? "arrow_point" : "none", W.line)), C += `<g class="pele-edge" data-id="${Ye(N.from + "-" + N.to)}"${L ? ` stroke="${L}"` : ""}${W.line}><path d="${Q.d}"/>` + (K ? St("arrow_point", Q.sx, Q.sy, Q.sdx, Q.sdy, X) : "") + (H ? St("arrow_point", Q.ex, Q.ey, Q.edx, Q.edy, X) : "") + "</g>", Q;
  });
  for (let N of c) {
    if (!D || N.headW === 0) continue;
    let j = N.y + hf, F = N.y + N.head - vs, Y = 1 / 0;
    for (let W of [fs, (N.w - N.headW) / 2, N.w - fs - N.headW]) {
      let K = 0;
      for (let H of z) fm(H.points, N.x + W - 4, j, N.x + W + N.headW + 4, F) && K++;
      if (K < Y && (Y = K, N.headX = W), K === 0) break;
    }
    R.push(N.x + N.headX - 4, j, N.x + N.headX + N.headW + 4, F);
  }
  let _ = "";
  e.rels.forEach((N, j) => {
    let F = z[j], Y = N.from + "-" + N.to, W = Ai(void 0, void 0, N.textColor), K = (e.c4Type === "C4Dynamic" ? j + 1 + ": " : "") + N.label, H = je(K, !1, i, n, F.room), te = je(N.techn ? `[${N.techn}]` : void 0, !1, i, n, F.room, 2), Q = Math.max(H.width, te.width) + hm, L = H.height + te.height;
    if (L === 0) return;
    let X = Math.abs(F.nx) * (Q / 2) + Math.abs(F.ny) * (L / 2) + 2, le = F.lean ? Math.max(0, Math.min(F.lean, X - 14)) : X, J = F.nx * le + (a ? 0 : U(N.offsetX)), V = F.ny * le + (a ? 0 : U(N.offsetY)), Z = 0.5;
    if (D) {
      let ue = 1 / 0, he = J !== F.nx * le || V !== F.ny * le;
      for (let re = 0; re < (he ? 2 : 1) && ue > 0; re++) {
        let P = re ? F.nx * le : J, ne = re ? F.ny * le : V;
        for (let ce of mv) {
          let pe = F.x0 + (F.x1 - F.x0) * ce + P, Me = F.y0 + (F.y1 - F.y0) * ce + ne, xe = O(pe - Q / 2, Me - L / 2, pe + Q / 2, Me + L / 2);
          if (xe < ue && (ue = xe, Z = ce, J = P, V = ne), xe === 0) break;
        }
      }
    }
    let ae = F.x0 + (F.x1 - F.x0) * Z + J, oe = F.y0 + (F.y1 - F.y0) * Z + V - L / 2;
    D && R.push(ae - Q / 2, oe, ae + Q / 2, oe + L), x(ae - Q / 2, oe, ae + Q / 2, oe + L), _ += `<g class="pele-edge-label" data-id="${Ye(Y)}">` + (N.descr ? `<title>${Ye(N.descr)}</title>` : "") + `<rect x="${f(ae - Q / 2)}" y="${f(oe)}" width="${f(Q)}" height="${f(L)}" rx="3" fill="var(--_bg)"/>` + ic(Pe(H, ae, oe + H.height / 2, W.text) + Pe(te, ae, oe + H.height + te.height / 2, ` class="pele-c4-techn" fill="var(--_m)"${W.text}`), N.link, Y, h, r) + "</g>";
  });
  let T = "", E = "";
  for (let N of c) {
    if (N !== d) {
      let j = N.boundary, F = Ai(j.bgColor, j.borderColor, j.fontColor), Y = N.x + N.headX, W = N.y + hf, K = Xt(F) + F.text, H = Xt(F, "var(--_m)") + F.text, te = Kl(N.labels[0], Y, W, ` class="pele-cluster-label" font-weight="var(--_hw)"${K}`);
      W += N.labels[0].height, te += Kl(N.labels[1], Y, W, ` class="pele-c4-type" font-size="${n}"${H}`), W += N.labels[1].height, te += Kl(N.labels[2], Y, W, ` class="pele-c4-descr" font-size="${n}"${H}`), T += `<g class="pele-cluster pele-c4-${j.nodeType ? "node" : "boundary"}" data-id="${Ye(j.alias)}"><rect x="${f(N.x)}" y="${f(N.y)}" width="${f(N.w)}" height="${f(N.h)}" fill="none" stroke="var(--_b)"${j.nodeType ? "" : ' stroke-dasharray="6 4"'}${Et(F.shape)}/>` + ic(te, j.link, j.alias, h, r) + "</g>";
    }
    for (let j of N.nodes) {
      let F = j.shape, Y = F.kind.startsWith("external"), W = Ai(F.bgColor, F.borderColor, F.fontColor), K = ' stroke="var(--_b)"' + (Y ? ' stroke-dasharray="4 3"' : ""), { w: H, h: te, form: Q, labels: L } = j, X = Q === "h-cyl" ? -dm(te) / 2 : 0, le = Q === "person" ? Zf / 2 : Q === "cyl" ? cm(H) / 2 : 0, J = Xt(W) + W.text, V = Xt(W, "var(--_m)") + W.text, Z = le - j.textH / 2, ae = Pe(L[0], X, Z + L[0].height / 2, ` class="pele-c4-type" font-size="${n - 1}"${V}`);
      Z += L[0].height, ae += Pe(L[1], X, Z + L[1].height / 2, ` class="pele-label" font-weight="var(--_hw)"${J}`), Z += L[1].height, ae += Pe(L[2], X, Z + L[2].height / 2, ` class="pele-c4-techn" font-size="${n}"${V}`), Z += L[2].height + 4, ae += Pe(L[3], X, Z + L[3].height / 2, ` class="pele-c4-descr" font-size="${n}"${J}`), E += `<g class="pele-node pele-shape-${Q} pele-c4-${F.kind}${Y ? " pele-c4-external" : ""}" data-id="${Ye(F.alias)}" transform="translate(${f(j.x + H / 2)},${f(j.y + te / 2)})">` + ic(ti(Q, H, te, ` fill="var(${Y ? "--_bg" : "--_s"})"${K}${W.shape}`, K + W.line) + ae, F.link, F.alias, h, r) + "</g>";
    }
  }
  let M = je(e.title, !1, i, l, a ? Qt(r) : 4e3, 1), A = M.height > 0 ? M.height + 12 : 0, m = Math.max(y - p, M.width), I = Math.ceil(m + 2 * o), k = Math.ceil(b - g + A + 2 * o), w = o - p + (m - (y - p)) / 2, B = o + A - g;
  return [{ svg: xt("c4", I, k, l, r, e, Pe(M, I / 2, o + M.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f(w)},${f(B)})">` + (T ? `<g class="pele-clusters">${T}</g>` : "") + dl(q) + (C ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${C}</g>` : "") + (E ? `<g class="pele-nodes">${E}</g>` : "") + (_ ? `<g class="pele-edge-labels" font-size="${n}">${_}</g>` : "") + "</g>"), width: I, height: k, links: h }, G.squeezed];
}
var wv = { type: "c4", parse(e, t, r) {
  let a = new YM();
  return r && (a.title = r), JM(e, a), a;
}, render: xv };
function cf(e) {
  let t = 0;
  for (let r = e.indexOf("~"); r !== -1; r = e.indexOf("~", r + 1)) t++;
  return t;
}
function $v(e) {
  let t = cf(e);
  if (t <= 1) return e;
  let r = t % 2 !== 0 && e.startsWith("~"), a = e.split(""), s = [];
  for (let l = r ? 1 : 0; l < a.length; l++) a[l] === "~" && s.push(l);
  for (let l = 0, n = s.length - 1; l < n; l++, n--) a[s[l]] = "<", a[s[n]] = ">";
  return a.join("");
}
function us(e) {
  if (!e.includes("~")) return e;
  let t = e.split(/(,)/), r = [];
  for (let a = 0; a < t.length; a++) {
    let s = t[a];
    s === "," && a > 0 && a + 1 < t.length && cf(t[a - 1]) === 1 && cf(t[a + 1]) === 1 && (s = t[a - 1] + "," + t[a + 1], a++, r.pop()), r.push($v(s));
  }
  return r.join("");
}
function _p(e) {
  return e === "#" || e === "+" || e === "~" || e === "-";
}
var Ip = class {
  id = "";
  memberType;
  visibility = "";
  classifier = "";
  parameters = "";
  returnType = "";
  constructor(e, t) {
    this.memberType = t, (t !== "method" || !this.parseMethod(e)) && this.parseAttribute(e), this.id = this.id.startsWith(" ") ? " " + this.id.trim() : this.id.trim();
  }
  parseMethod(e) {
    let t = e.length;
    for (let r = 0; r < t; ) {
      let a = r;
      for (; a < t && !vo(e.charCodeAt(a)); ) a++;
      let s = a - 1;
      for (; s > r && e.charCodeAt(s) !== 41; ) s--;
      let l = s - 1;
      for (; l > r && e.charCodeAt(l) !== 40; ) l--;
      if (l > r) {
        let n = e[r], i = _p(n) && l > r + 1;
        i && (this.visibility = n), this.id = e.slice(i ? r + 1 : r, l), this.parameters = e.slice(l + 1, s).trim();
        let o = s + 1, h = "";
        if (o < t) {
          let u = e[o];
          (u === "$" || u === "*" || u.trim() === "") && (h = u.trim(), o++);
        }
        let c = o;
        for (; c < t && !vo(e.charCodeAt(c)); ) c++;
        if (this.returnType = e.slice(o, c).trim(), h === "") {
          let u = this.returnType.slice(-1);
          (u === "$" || u === "*") && (h = u, this.returnType = this.returnType.slice(0, -1));
        }
        return this.classifier = h, !0;
      }
      r = a + 1;
    }
    return this.memberType = "attribute", !1;
  }
  parseAttribute(e) {
    let t = e.slice(0, 1), r = e.slice(-1);
    _p(t) && (this.visibility = t), (r === "$" || r === "*") && (this.classifier = r), this.id = e.substring(this.visibility === "" ? 0 : 1, this.classifier === "" ? e.length : e.length - 1);
  }
  getDisplayDetails() {
    let e = this.visibility + us(this.id);
    return this.memberType === "method" && (e += `(${us(this.parameters.trim())})`, this.returnType && (e += " : " + us(this.returnType))), { displayText: e.trim(), cssStyle: this.parseClassifier() };
  }
  parseClassifier() {
    return this.classifier === "*" ? "font-style:italic;" : this.classifier === "$" ? "text-decoration:underline;" : "";
  }
}, bv = { LINE: 0, DOTTED_LINE: 1 }, ps = { AGGREGATION: 0, EXTENSION: 1, COMPOSITION: 2, DEPENDENCY: 3, LOLLIPOP: 4 }, Mv = "classId-";
function va(e) {
  let t = e.indexOf("~");
  if (t <= 0) return { className: e, type: "" };
  let r = e.indexOf("~", t + 1);
  return { className: e.slice(0, t), type: e.slice(t + 1, r === -1 ? e.length : r) };
}
function Np(e) {
  let t = e.charCodeAt(0);
  return va(t >= 48 && t <= 57 ? Mv + e : e).className;
}
var vv = class {
  type = "class";
  lineType = bv;
  relationType = ps;
  direction = "TB";
  classes = /* @__PURE__ */ new Map();
  relations = [];
  notes = /* @__PURE__ */ new Map();
  namespaces = /* @__PURE__ */ new Map();
  interfaces = [];
  styleClasses = /* @__PURE__ */ new Map();
  title;
  accTitle;
  accDescr;
  namespaceStack = [];
  withCssClass = /* @__PURE__ */ new Map();
  addClass(e) {
    let { className: t, type: r } = va(e);
    if (this.classes.has(t)) return;
    let a = { id: t, type: r, label: t, cssClasses: "default", methods: [], members: [], annotations: [], styles: [] };
    this.classes.set(t, a), this.tag(a, "default");
  }
  tag(e, t) {
    let r = this.withCssClass.get(t);
    r ? r.add(e) : this.withCssClass.set(t, /* @__PURE__ */ new Set([e]));
  }
  ensure(e) {
    return this.addClass(e), this.classes.get(va(e).className);
  }
  setClassLabel(e, t) {
    this.ensure(e).label = t;
  }
  addRelation(e) {
    let { type1: t, type2: r } = e.relation;
    t === ps.LOLLIPOP && r === "none" ? (this.addClass(e.id2), e.id1 = this.addInterface(e.id1, e.id2)) : r === ps.LOLLIPOP && t === "none" ? (this.addClass(e.id1), e.id2 = this.addInterface(e.id2, e.id1)) : (this.addClass(e.id1), this.addClass(e.id2)), e.id1 = va(e.id1).className, e.id2 = va(e.id2).className, e.relationTitle1 = e.relationTitle1.trim(), e.relationTitle2 = e.relationTitle2.trim(), this.relations.push(e);
  }
  addInterface(e, t) {
    let r = `interface${this.interfaces.length}`;
    return this.interfaces.push({ id: r, label: e, classId: t }), r;
  }
  addAnnotation(e, t) {
    this.ensure(e).annotations.push(t);
  }
  addMember(e, t) {
    let r = this.ensure(e);
    if (typeof t != "string") return;
    let a = t.trim();
    if (a.startsWith("<<") && a.endsWith(">>")) r.annotations.push(a.substring(2, a.length - 2));
    else if (a.indexOf(")") > 0) {
      let s = new Ip(a, "method");
      (s.memberType === "method" ? r.methods : r.members).push(s);
    } else a && r.members.push(new Ip(a, "attribute"));
  }
  addMembers(e, t) {
    if (Array.isArray(t)) {
      t.reverse();
      for (let r of t) this.addMember(e, r);
    }
  }
  addNote(e, t) {
    let r = this.notes.size, a = `note${r}`;
    return this.notes.set(a, { id: a, class: t, text: e, index: r }), a;
  }
  cleanupLabel(e) {
    return (e.startsWith(":") ? e.substring(1) : e).trim();
  }
  setCssClass(e, t) {
    for (let r of e.split(",")) {
      let a = this.classes.get(Np(r));
      if (a !== void 0) {
        a.cssClasses += " " + t;
        for (let s of t.split(" ")) this.tag(a, s);
      }
    }
  }
  defineClass(e, t) {
    for (let r of e) {
      let a = this.styleClasses.get(r);
      if (a === void 0 && (a = { id: r, styles: [], textStyles: [] }, this.styleClasses.set(r, a)), !t) continue;
      for (let n of t) n.includes("color") && a.textStyles.push(n.replace("fill", "bgFill")), a.styles.push(n);
      let s = this.withCssClass.get(r);
      if (s === void 0) continue;
      let l = t.flatMap((n) => n.split(","));
      for (let n of s) for (let i of l) n.styles.push(i);
    }
  }
  setTooltip(e, t) {
    if (t !== void 0) for (let r of e.split(",")) {
      let a = this.classes.get(va(r).className);
      a && (a.tooltip = t);
    }
  }
  setLink(e, t, r) {
    let a = Tt(t).trim();
    for (let s of e.split(",")) {
      let l = this.classes.get(Np(s));
      l && (l.link = a ? rh(a) : void 0, l.linkTarget = typeof r == "string" ? r : "_blank");
    }
    this.setCssClass(e, "clickable");
  }
  setClickEvent(e, t, r) {
    for (let a of e.split(",")) {
      let s = this.classes.get(va(a).className);
      s && (s.haveCallback = !0);
    }
    this.setCssClass(e, "clickable");
  }
  setDirection(e) {
    this.direction = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addNamespace(e, t) {
    let r = this.namespaceStack[this.namespaceStack.length - 1], a = r ? `${r}.${e}` : e;
    this.namespaceStack.push(a);
    let s = this.namespaces.get(a);
    if (s) return s.explicit = !0, t && (s.label = t), a;
    let l = r || void 0, n = r ? r.length + 1 : 0;
    for (; ; ) {
      let i = a.indexOf(".", n), o = i === -1, h = o ? a : a.slice(0, i), c = this.namespaces.get(h);
      if (c === void 0) {
        let d = a.slice(n, o ? a.length : i);
        c = { id: h, label: o && t ? t : d, classes: /* @__PURE__ */ new Map(), notes: /* @__PURE__ */ new Map(), children: /* @__PURE__ */ new Map(), parent: l, explicit: o }, this.namespaces.set(h, c);
      } else o && (c.explicit = !0);
      let u = l ? this.namespaces.get(l) : void 0;
      if (u && (u.children.has(h) || u.children.set(h, c), c.parent ??= l), o) return a;
      l = h, n = i + 1;
    }
  }
  popNamespace() {
    this.namespaceStack.pop();
  }
  addClassesToNamespace(e, t, r) {
    let a = this.namespaces.get(e);
    if (a !== void 0) {
      for (let s of t) {
        let { className: l } = va(s), n = this.classes.get(l);
        n !== void 0 && (n.parent = e, a.classes.set(l, n));
      }
      for (let s of r) {
        let l = this.notes.get(s);
        l !== void 0 && (l.parent = e, a.notes.set(s, l));
      }
    }
  }
  setCssStyle(e, t) {
    let r = this.classes.get(e);
    if (!(!t || !r)) for (let a of t) for (let s of a.split(",")) r.styles.push(s);
  }
}, Rp = ["$end", "INVALID", "CLASS_DIAGRAM", "NEWLINE", "EOF", "SQS", "STR", "SQE", "DOT", "GENERICTYPE", "LABEL", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "STRUCT_START", "STRUCT_STOP", "NAMESPACE", "STYLE_SEPARATOR", "ANNOTATION_START", "ANNOTATION_END", "CLASS", "MEMBER", "NOTE_FOR", "NOTE", "CLASSDEF", "ALPHA", "COMMA", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "AGGREGATION", "EXTENSION", "COMPOSITION", "DEPENDENCY", "LOLLIPOP", "LINE", "DOTTED_LINE", "CALLBACK", "LINK", "LINK_TARGET", "CLICK", "CALLBACK_NAME", "CALLBACK_ARGS", "HREF", "STYLE", "CSSCLASS", "COLON", "BRKT", "PCT", "MINUS", "UNICODE_TEXT", "BQUOTE_STR", "EDGE_STATE", "EOF_IN_STRUCT", "OPEN_IN_STRUCT", "PLUS", "EQUALS", "PUNCTUATION"], kv = [4, 6, 4, 9, 44, 45, 12, 14, 15, 4, 56, 4, 56], Av = [/.*direction\s+TB[^\n]*/y, /.*direction\s+BT[^\n]*/y, /.*direction\s+RL[^\n]*/y, /.*direction\s+LR[^\n]*/y], nc = /[\n\r\u2028\u2029]/g;
function Ev(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = e.indexOf("direction"), h = -1, c = 0, u = (D, O, U) => (r.push(D), a.push(e.slice(O, U)), s.push(O), i = U, !0), d = (D) => {
    l.push(n), n = D;
  }, p = () => {
    l.length > 0 && (n = l.pop());
  }, g = (D) => e.startsWith(D, i) && !nt(e.charCodeAt(i + D.length)), y = (D) => {
    for (; D < t && Ke(e.charCodeAt(D)); ) D++;
    return D;
  }, b = (D) => {
    let O = e.indexOf(D, i);
    return O === -1 ? t : O;
  }, x = (D) => {
    let O = i, U = -1;
    for (let q = e.charCodeAt(O); O < t && Ke(q); q = e.charCodeAt(++O)) q === 10 && (U = O);
    if (U < 0) {
      i = O;
      return;
    }
    D && p(), u(3, i, U + 1);
  }, v = (D) => {
    switch (D) {
      case 99:
        if (g("cssClass")) return u(48, i, i + 8);
        if (g("callback")) return u(40, i, i + 8);
        if (g("click")) return u(43, i, i + 5);
        break;
      case 108:
        if (g("link")) return u(41, i, i + 4);
        break;
      case 110:
        if (g("note for")) return u(24, i, i + 8);
        if (g("note")) return u(25, i, i + 4);
        break;
      case 60:
        if (e.charCodeAt(i + 1) === 60) return u(20, i, i + 2);
        break;
      case 62:
        if (e.charCodeAt(i + 1) === 62) return u(21, i, i + 2);
        break;
      case 104:
        if (g("href")) return u(46, i, i + 4);
        break;
    }
    return !1;
  }, $ = (D) => {
    if (v(D)) return !0;
    let O = e.charCodeAt(i + 1);
    switch (D) {
      case 34:
        return d(1), i++, !0;
      case 126:
        return d(3), i++, !0;
      case 96:
        return d(2), i++, !0;
      case 95:
        if (g("_self")) return u(42, i, i + 5);
        if (g("_blank")) return u(42, i, i + 6);
        if (g("_parent")) return u(42, i, i + 7);
        if (g("_top")) return u(42, i, i + 4);
        break;
      case 60:
        return O === 124 ? u(34, i, i + 2) : u(36, i, i + 1);
      case 124:
        return O === 62 && u(34, i, i + 2);
      case 62:
        return u(36, i, i + 1);
      case 42:
        return u(35, i, i + 1);
      case 111:
        if (!nt(O)) return u(33, i, i + 1);
        break;
      case 40:
        return O === 41 && u(37, i, i + 2);
      case 45:
        return O === 45 ? u(38, i, i + 2) : u(52, i, i + 1);
      case 46:
        return O === 46 ? u(39, i, i + 2) : u(8, i, i + 1);
      case 58: {
        let U = i + 1;
        for (; U < t; ) {
          let q = e.charCodeAt(U);
          if (q === 58 || q === 10 || q === 59) break;
          U++;
        }
        return U > i + 1 ? u(10, i, U) : O === 58 && e.charCodeAt(i + 2) === 58 && u(19, i, i + 3);
      }
      case 43:
        return u(58, i, i + 1);
      case 37:
        return u(51, i, i + 1);
      case 61:
        return u(59, i, i + 1);
      case 91:
        return u(5, i, i + 1);
      case 93:
        return u(7, i, i + 1);
      case 33:
      case 35:
      case 36:
      case 38:
      case 39:
      case 44:
      case 63:
      case 92:
      case 47:
        return u(60, i, i + 1);
    }
    if (nt(D)) {
      let U = i + 1;
      for (; nt(e.charCodeAt(U)); ) U++;
      return u(27, i, U);
    }
    return Wf(D) && u(53, i, i + 1);
  }, S = () => {
    if (o === -1 || i < c || (o < i && (o = e.indexOf("direction", i)), o === -1) || (h < i && (nc.lastIndex = i, h = nc.test(e) ? nc.lastIndex - 1 : t), o >= h)) return !1;
    for (let D = 0; D < 4; D++) {
      let O = Av[D];
      if (O.lastIndex = i, O.test(e)) return u(29 + D, i, O.lastIndex);
    }
    return c = h, !1;
  }, R = (D) => {
    if (S()) return !0;
    if (Ke(D)) return x(!1), !0;
    switch (D) {
      case 37:
        if (e.charCodeAt(i + 1) === 37) {
          let O = b(`
`);
          for (; O < t && (e.charCodeAt(O) === 10 || e.charCodeAt(O) === 13); ) O++;
          return i = O, !0;
        }
        break;
      case 97: {
        let O = e.startsWith("accTitle", i);
        if (!O && !e.startsWith("accDescr", i)) break;
        let U = y(i + 8), q = e.charCodeAt(U);
        if (q === 58) return u(O ? 11 : 13, i, y(U + 1)), d(O ? 6 : 7), !0;
        if (q === 123 && !O) return i = y(U + 1), d(8), !0;
        break;
      }
      case 99:
        if (g("classDiagram-v2")) return u(2, i, i + 15);
        if (g("classDiagram")) return u(2, i, i + 12);
        if (e.startsWith("call", i) && Ke(e.charCodeAt(i + 4))) return i = y(i + 4), d(4), !0;
        if (g("classDef")) return u(26, i, i + 8);
        if (g("class")) return d(9), u(22, i, i + 5);
        break;
      case 91:
        if (e.startsWith("*]", i + 1)) return u(55, i, i + 3);
        break;
      case 115:
        if (g("style")) return u(47, i, i + 5);
        break;
      case 110:
        if (g("namespace")) return d(11), u(18, i, i + 9);
        break;
      case 44:
        return u(28, i, i + 1);
      case 35:
        return u(50, i, i + 1);
    }
    return $(D) || D === 58 && u(49, i, i + 1);
  };
  for (; ; ) {
    if (i >= t) {
      r.push(kv[n]), a.push(""), s.push(t);
      break;
    }
    let D = e.charCodeAt(i), O = !0;
    switch (n) {
      case 0:
        O = R(D);
        break;
      case 9:
        Ke(D) ? x(!0) : D === 125 ? (p(), p(), u(17, i, i + 1)) : D === 123 ? (d(10), u(16, i, i + 1)) : O = $(D);
        break;
      case 10:
        if (D === 34) d(1), i++;
        else if (D === 125) p(), u(17, i, i + 1);
        else if (D === 91 && e.startsWith("*]", i + 1)) u(55, i, i + 3);
        else if (D === 123) u(57, i, i + 1);
        else if (D === 10) i++;
        else {
          let U = i + 1;
          for (; U < t; ) {
            let q = e.charCodeAt(U);
            if (q === 123 || q === 125 || q === 10) break;
            U++;
          }
          u(23, i, U);
        }
        break;
      case 11:
        Ke(D) ? x(!0) : D === 123 ? (d(12), u(16, i, i + 1)) : D === 125 ? p() : D === 110 && g("namespace") ? (d(11), u(18, i, i + 9)) : O = $(D);
        break;
      case 12:
        Ke(D) ? x(!1) : D === 125 ? (p(), u(17, i, i + 1)) : D === 110 && g("namespace") ? (d(11), u(18, i, i + 9)) : D === 91 && e.startsWith("*]", i + 1) ? u(55, i, i + 3) : D === 99 && g("class") ? (d(9), u(22, i, i + 5)) : O = $(D);
        break;
      case 1:
        D === 34 ? (p(), i++) : u(6, i, b('"'));
        break;
      case 3:
        if (D === 34) d(1), i++;
        else {
          if (v(D)) break;
          D === 126 ? (p(), i++) : u(9, i, b("~"));
        }
        break;
      case 2:
        if (D === 34) d(1), i++;
        else {
          if (v(D)) break;
          D === 126 ? (d(3), i++) : D === 96 ? (p(), i++) : u(54, i, b("`"));
        }
        break;
      case 4:
        if (D === 40) {
          let U = y(i + 1);
          p(), e.charCodeAt(U) === 41 ? i = U + 1 : (d(5), i++);
        } else u(44, i, b("("));
        break;
      case 5:
        D === 41 ? (p(), i++) : u(45, i, b(")"));
        break;
      case 6:
      case 7:
        u(n === 6 ? 12 : 14, i, b(`
`)), p();
        break;
      case 8:
        D === 125 ? (p(), i++) : u(15, i, b("}"));
        break;
    }
    if (!O) return r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s };
  }
  return r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var Qf = 61, no = new Uint8Array(Qf);
for (let e of [53, 27, 52]) no[e] = 1;
var df = new Uint8Array(Qf);
for (let e of [27, 49, 50, 47, 51, 10]) df[e] = 1;
var nl = new Uint8Array(Qf);
nl[33] = 1;
nl[34] = 2;
nl[35] = 3;
nl[36] = 4;
nl[37] = 5;
var Tv = "'UNICODE_TEXT', 'NUM', 'ALPHA', 'MINUS', 'BQUOTE_STR'";
function Cv(e, t) {
  let { types: r, texts: a, starts: s } = Ev(e), l = 0, n = (D) => {
    let O = r[l];
    throw O === 1 ? bt("class", e, s[l], "", !0) : bt("class", e, s[l], `Expecting ${D}, got '${Rp[O]}'`);
  }, i = (D) => (r[l] !== D && n(`'${Rp[D]}'`), a[l++]), o = () => (no[r[l]] === 0 && n("'UNICODE_TEXT', 'NUM', 'ALPHA', 'MINUS'"), a[l++]), h = (D) => {
    let O = "";
    for (; ; ) {
      if (r[l] === 54) {
        O += a[l++];
        break;
      }
      no[r[l]] === 0 && n(Tv), O += a[l++];
      let U = r[l];
      if (U === 8) O += ".", l++;
      else if (no[U] === 0 && U !== 54) break;
    }
    return D && r[l] === 9 && (O += "~" + a[l++] + "~"), O;
  }, c = () => {
    l++;
    let D = i(6);
    return i(7), D;
  }, u = () => {
    r[l] !== 23 && n("'STRUCT_STOP', 'MEMBER'");
    let D = [];
    for (; r[l] === 23; ) D.push(a[l++]);
    return i(17), D.reverse();
  }, d = () => {
    l++;
    let D = h(!0);
    switch (t.addClass(D), r[l] === 5 && t.setClassLabel(D, c()), r[l]) {
      case 19: {
        l++;
        let O = o();
        t.setCssClass(D, O), r[l] === 16 && (l++, t.addMembers(D, u()));
        break;
      }
      case 16:
        l++, r[l] === 17 ? l++ : t.addMembers(D, u());
        break;
      case 20: {
        l++;
        let O = o();
        i(21), t.addAnnotation(D, O), r[l] === 16 && (l++, r[l] === 17 ? l++ : t.addMembers(D, u()));
        break;
      }
    }
    return D;
  }, p = () => {
    if (r[l++] === 25) return t.addNote(i(6));
    let D = h(!0);
    return t.addNote(i(6), D);
  }, g = () => {
    let D = [];
    for (; ; ) {
      l++;
      let O = h(!1), U = r[l] === 5 ? t.addNamespace(O, c()) : t.addNamespace(O);
      i(16), r[l] === 3 && l++, D.push({ id: U, classes: [], notes: [] });
      let q = !0;
      for (; q; ) {
        let C = D[D.length - 1], ee = r[l];
        if (ee === 18) break;
        for (ee === 22 ? C.classes.push(d()) : ee === 25 || ee === 24 ? C.notes.push(p()) : n("'NAMESPACE', 'CLASS', 'NOTE_FOR', 'NOTE'"); ; ) {
          if (r[l] === 3) {
            let G = r[l + 1];
            if (G === 18 || G === 22 || G === 25 || G === 24) {
              l++;
              break;
            }
            l++;
          }
          i(17);
          let ie = D.pop();
          if (t.addClassesToNamespace(ie.id, ie.classes, ie.notes), t.popNamespace(), D.length === 0) {
            q = !1;
            break;
          }
        }
      }
      if (D.length === 0) return;
    }
  }, y = () => {
    let D = nl[r[l]];
    return D === 0 ? "none" : (l++, D - 1);
  }, b = () => {
    let D = h(!0), O = r[l];
    if (O === 10) {
      t.addMember(D, t.cleanupLabel(a[l++]));
      return;
    }
    let U = "none";
    if (O === 6) U = a[l++], O = r[l];
    else if (nl[O] === 0 && O !== 38 && O !== 39) return;
    let q = y();
    O = r[l], O !== 38 && O !== 39 && n("'AGGREGATION', 'EXTENSION', 'COMPOSITION', 'DEPENDENCY', 'LOLLIPOP', 'LINE', 'DOTTED_LINE'"), l++;
    let C = y(), ee = r[l] === 6 ? a[l++] : "none", ie = h(!0), G = { id1: D, id2: ie, relation: { type1: q, type2: C, lineType: O === 38 ? 0 : 1 }, relationTitle1: U, relationTitle2: ee };
    r[l] === 10 && (G.title = t.cleanupLabel(a[l++])), t.addRelation(G);
  }, x = () => {
    let D = [];
    for (; ; ) {
      df[r[l]] === 0 && n("'ALPHA', 'NUM', 'COLON', 'UNIT', 'SPACE', 'BRKT', 'STYLE', 'PCT', 'LABEL'");
      let O = a[l++];
      for (; df[r[l]] === 1; ) O += a[l++];
      if (D.push(O), r[l] !== 28) return D;
      l++;
    }
  }, v = (D) => {
    r[l] === 6 && t.setTooltip(D, a[l++]);
  }, $ = (D) => {
    let O = i(6), U = r[l] === 6 ? a[l++] : void 0;
    r[l] === 42 ? t.setLink(D, O, a[l++]) : t.setLink(D, O), U !== void 0 && t.setTooltip(D, U);
  }, S = () => {
    let D = r[l];
    switch (D) {
      case 53:
      case 27:
      case 52:
      case 54:
        b();
        return;
      case 18:
        g();
        return;
      case 22:
        d();
        return;
      case 23:
        l++;
        return;
      case 20: {
        l++;
        let O = o();
        i(21), t.addAnnotation(h(!0), O);
        return;
      }
      case 40: {
        l++;
        let O = h(!0);
        t.setClickEvent(O, i(6)), v(O);
        return;
      }
      case 41:
        l++, $(h(!0));
        return;
      case 43: {
        l++;
        let O = h(!0);
        if (r[l] === 46) {
          l++, $(O);
          return;
        }
        let U = i(44);
        r[l] === 45 ? t.setClickEvent(O, U, a[l++]) : t.setClickEvent(O, U), v(O);
        return;
      }
      case 47: {
        l++;
        let O = i(27);
        t.setCssStyle(O, x());
        return;
      }
      case 48: {
        l++;
        let O = i(6);
        t.setCssClass(O, i(27));
        return;
      }
      case 25:
      case 24:
        p();
        return;
      case 26: {
        l++;
        let O = [i(27)];
        for (; r[l] === 28; ) l++, O.push(i(27));
        t.defineClass(O, x());
        return;
      }
      case 29:
      case 30:
      case 31:
      case 32:
        l++, t.setDirection(D === 29 ? "TB" : D === 30 ? "BT" : D === 31 ? "RL" : "LR");
        return;
      case 11:
        l++, t.setAccTitle(i(12).trim());
        return;
      case 13:
        l++, t.setAccDescription(i(14).trim());
        return;
      case 15:
        t.setAccDescription(a[l++].trim());
        return;
    }
    n("'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'NAMESPACE', 'ANNOTATION_START', 'CLASS', 'MEMBER', 'NOTE_FOR', 'NOTE', 'CLASSDEF', 'direction_tb', 'CALLBACK', 'LINK', 'CLICK', 'STYLE', 'CSSCLASS', 'ALPHA', 'MINUS', 'BQUOTE_STR'");
  }, R = r[l] === 2;
  for (R && (l++, i(3)); S(), !(r[l] !== 3 || (l++, r[l] === 4 || r[l] === 0)); ) ;
  R && i(4), i(0);
}
function Sv(e, t, r, a) {
  let s = Int32Array.from(e, (x, v) => v), l = (x) => {
    for (; s[x] !== x; ) s[x] = s[s[x]], x = s[x];
    return x;
  }, n = (x, v) => {
    s[l(x)] = l(v);
  };
  for (let x = 0; x < e.length; x++) e[x].parent >= 0 && n(x, e[x].parent);
  for (let x of t) n(x.src, x.dst);
  let i = /* @__PURE__ */ new Map(), o = (x, v, $, S = 0, R = 0) => {
    x.left = Math.min(x.left, v - S / 2), x.top = Math.min(x.top, $ - R / 2), x.right = Math.max(x.right, v + S / 2), x.bottom = Math.max(x.bottom, $ + R / 2);
  };
  for (let x = 0; x < e.length; x++) {
    let v = l(x), $ = i.get(v);
    $ || ($ = { nodes: [], edges: [], left: 1 / 0, top: 1 / 0, right: -1 / 0, bottom: -1 / 0 }, i.set(v, $));
    let S = e[x];
    $.nodes.push(S), o($, S.x, S.y, S.w, S.h);
  }
  if (i.size < 2) return;
  for (let x of t) {
    let v = i.get(l(x.src));
    v.edges.push(x);
    for (let $ = 0; $ < x.route.length; $ += 3) o(v, x.route[$], x.route[$ + 1]);
    x.labelW > 0 && o(v, x.labelX, x.labelY, x.labelW, x.labelH);
  }
  let h = 0, c = 0, u = 0, d = 0, p = 1 / 0, g = -1 / 0, y = [];
  for (let x of i.values()) {
    let v = x.right - x.left, $ = x.bottom - x.top;
    h > 0 && h + v > r && (c += u + a, h = 0, u = 0), y.push(h - x.left, c - x.top), p = Math.min(p, x.left), g = Math.max(g, x.right), d = Math.max(d, h + v), u = Math.max(u, $), h += v + a;
  }
  if (d >= g - p) return;
  let b = 0;
  for (let x of i.values()) _s(x.nodes, x.edges, y[b++], y[b++]);
  return { width: d, height: c + u };
}
var _v = ["aggregation", "extension", "composition", "dependency", "lollipop"];
function Dp(e) {
  return typeof e == "number" && _v[e] || "none";
}
function Iv(e, t = !0) {
  let r = [], a = [], s = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = (d) => {
    if (t || d === void 0) return d;
    let p = [], g = d, y;
    for (; g; ) {
      if (i.has(g)) {
        y = i.get(g);
        break;
      }
      let b = e.namespaces.get(g);
      if (b === void 0) break;
      if (b.explicit) {
        y = g;
        break;
      }
      p.push(g), g = b.parent;
    }
    for (let b of p) i.set(b, y);
    return y;
  }, h = (d) => d === void 0 ? -1 : s.get(d) ?? -1;
  for (let d of e.namespaces.values()) !t && !d.explicit || (s.set(d.id, r.length), r.push({ id: d.id, label: t ? d.label : d.id, isGroup: !0, shape: "rect", parentId: t ? d.parent : void 0, parent: -1 }));
  for (let d of r) d.parent = h(d.parentId);
  let c = 0;
  for (let d of e.classes.values()) {
    let p = o(d.parent);
    l.set(d.id, r.length), r.push({ id: d.id, label: d.label, isGroup: !1, shape: "classBox", parentId: p, parent: h(p), classNode: d, colorIndex: c++ });
  }
  for (let d of e.notes.values()) {
    let p = o(d.parent), g = d.class === void 0 ? void 0 : l.get(d.class);
    g !== void 0 && a.push({ id: `edgeNote${d.index}`, start: d.id, end: r[g].id, source: r.length, target: g, label: void 0, arrowTypeStart: "none", arrowTypeEnd: "none", startLabelRight: "", endLabelLeft: "", pattern: "dotted", classes: "relation" }), r.push({ id: d.id, label: d.text, isGroup: !1, shape: "note", parentId: p, parent: h(p) });
  }
  for (let d of e.interfaces) {
    let p = l.get(d.classId);
    n.set(d.id, r.length), r.push({ id: d.id, label: d.label, isGroup: !1, shape: "interface", parentId: void 0, parent: p === void 0 ? -1 : r[p].parent });
  }
  let u = 0;
  for (let d of e.relations) {
    u++;
    let { type1: p, type2: g } = d.relation, y = p === ps.LOLLIPOP && g === "none" ? n : l, b = y === l && g === ps.LOLLIPOP && p === "none" ? n : l;
    a.push({ id: `id_${d.id1}_${d.id2}_${u}`, start: d.id1, end: d.id2, source: y.get(d.id1) ?? -1, target: b.get(d.id2) ?? -1, label: d.title, arrowTypeStart: Dp(p), arrowTypeEnd: Dp(g), startLabelRight: d.relationTitle1 === "none" ? "" : d.relationTitle1, endLabelLeft: d.relationTitle2 === "none" ? "" : d.relationTitle2, pattern: d.relation.lineType === 1 ? "dashed" : "solid", classes: "relation" });
  }
  return { nodes: r, edges: a };
}
var ff = 12, Zi = 16, Ei = 6, oo = 5;
function Lp(e) {
  switch (e) {
    case "extension":
      return ff;
    case "composition":
    case "aggregation":
      return Zi;
    case "lollipop":
      return 2 * oo;
    case "dependency":
      return Ct("arrow_point");
  }
  return 0;
}
function Op(e, t, r, a, s, l) {
  let n = -s, i = a;
  switch (e) {
    case "extension": {
      let o = t - a * ff, h = r - s * ff;
      return `<path class="pele-marker" d="M${f(t)},${f(r)}L${f(o + n * Ei)},${f(h + i * Ei)}L${f(o - n * Ei)},${f(h - i * Ei)}Z" stroke-linejoin="round"/>`;
    }
    case "composition":
    case "aggregation": {
      let o = t - a * Zi / 2, h = r - s * Zi / 2, c = Ei - 1;
      return `<path class="pele-marker" d="M${f(t)},${f(r)}L${f(o + n * c)},${f(h + i * c)}L${f(t - a * Zi)},${f(r - s * Zi)}L${f(o - n * c)},${f(h - i * c)}Z" stroke-linejoin="round"${e === "composition" ? ` fill="${l}"` : ""}/>`;
    }
    case "lollipop":
      return `<circle class="pele-marker" cx="${f(t - a * oo)}" cy="${f(r - s * oo)}" r="${oo}"/>`;
    case "dependency":
      return St("arrow_point", t, r, a, s, l);
  }
  return "";
}
var Fp = 40, Nv = 16, zp = 56, Wa = 20, oc = 26, hc = 12, ln = 8, Pp = 6, Rv = 10, Dv = 64, sn = 8, cc = "var(--_l)", Lv = /* @__PURE__ */ new Set(["_self", "_blank", "_parent", "_top"]);
function dc(e, t, r) {
  let a = e[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
var nn = [], on = [];
function Wp(e, t, r, a) {
  let s = Tt(e.getDisplayDetails().displayText).trim(), l = (e.classifier === "*" ? 2 : 0) | (a ? 4 : 0);
  return { text: s, width: t.width(s, r, l), classifier: e.classifier };
}
function Ov(e, t, r) {
  let a = (s) => Da(r, (l) => Fv(e, t, r, s, l));
  return ul(e.direction) ? ur(r, a) : a(!1);
}
function Fv(e, t, r, a, s) {
  let l = t.class ?? {}, n = Iv(e, l.hierarchicalNamespaces !== !1), i = l.hideEmptyMembersBox === !0, o = Array.isArray(r.monospace) && r.monospace.includes("members"), h = (me) => o && !/[";]font-family:/.test(me.text), c = r.fontSize ?? 16, u = Math.round(c * 0.875), d = Math.round(c * 0.8), p = Math.round(d * 1.4), g = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), y = r.padding ?? 8, b = (me, we) => {
    if (!me.includes("$$")) return;
    let Se = je(me, !1, g, we, 4e3);
    return Se.lines.some(Kf) ? Se : void 0;
  }, x = (me) => me ? b(me, d)?.width ?? g.width(Tt(me), d, 0) : 0, v = a ? "TB" : zr(e.direction), $ = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), D = (me) => {
    let we = $.get(me);
    if (we === void 0) {
      let Se = Dt([me]);
      we = Se.shape === "" && Se.text === "" ? "" : me.slice(0, me.indexOf(":")).trim().toLowerCase(), $.set(me, we);
    }
    we !== "" && R.set(we, me);
  }, O = (me) => {
    R.clear();
    let we = S.get(me.cssClasses);
    if (we === void 0) {
      for (let Se of me.cssClasses.split(" ")) {
        let se = e.styleClasses.get(Se);
        if (se) for (let ye of se.styles) for (let ke of ye.split(",")) D(ke);
      }
      we = [...R], S.set(me.cssClasses, we);
    } else for (let [Se, se] of we) R.set(Se, se);
    for (let Se of me.styles) D(Se);
    return Dt(R.size === 0 ? on : [...R.values()]);
  }, U = new Int32Array(n.nodes.length);
  for (let me of n.nodes) me.parent >= 0 && U[me.parent]++;
  let q = new Uint8Array(n.nodes.length);
  for (let me of n.edges) {
    if (me.source < 0 || me.target < 0) continue;
    let we = n.nodes[me.source].parent, Se = n.nodes[me.target].parent;
    if (we !== Se) {
      for (let se = we; se >= 0 && q[se] === 0; se = n.nodes[se].parent) q[se] = 1;
      for (let se = Se; se >= 0 && q[se] === 0; se = n.nodes[se].parent) q[se] = 1;
    }
  }
  let C = [], ee = [];
  n.nodes.forEach((me, we) => {
    let Se, se;
    if (me.isGroup) {
      let ye = je(me.label, !1, g, c, 4e3);
      Se = ie(me, ye, 0, 0, c), U[we] > 0 ? (se = Wt(0, 0), se.isGroup = !0, se.padX = Wa, se.padTop = ye.height > 0 ? ye.height + 16 : Wa, se.padBottom = Wa, se.minW = ye.width + 2 * Wa - 12 + (q[we] === 1 && !s ? Math.min(ye.width + 24, 240) : 0)) : (Se.w = Math.max(ye.width + 2 * Wa, 80), Se.h = ye.height + 2 * Wa, se = Wt(Se.w, Se.h));
    } else if (me.classNode) Se = G(me, me.classNode), se = Wt(Se.w, Se.h);
    else if (me.shape === "note") {
      let ye = je(me.label, !0, g, u, 260);
      Se = ie(me, ye, Math.max(ye.width + 2 * hc, 40), ye.height + 2 * ln, u), se = Wt(Se.w, Se.h);
    } else {
      let ye = je(me.label, !1, g, u, 200);
      Se = ie(me, ye, Math.max(ye.width, 12) + 4, Math.max(ye.height, 12), u), se = Wt(Se.w, Se.h);
    }
    se.parent = me.parent, se.seq = we, C.push(Se), ee.push(se);
  });
  function ie(me, we, Se, se, ye) {
    return { node: me, style: Dt(on), label: we, w: Se, h: se, loops: 0, annotations: on, attributes: nn, methods: nn, titleH: 0, attributesH: 0, fontSize: ye };
  }
  function G(me, we) {
    let Se = O(we), se = Se.fontSize ?? c, ye = Math.round(se * 0.875), ke = Math.round(ye * 1.5), $e = we.type ? "&lt;" + us(we.type).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "&gt;" : "", be = je(we.label + $e, !1, g, se, 4e3, 1 | (Se.italic ? 2 : 0)), Ie = we.annotations.length > 0 ? we.annotations.map((We) => b(`«${We.trim()}»`, d) ?? `«${Tt(We).trim()}»`) : on, ze = we.members.length > 0 ? we.members.map((We) => Wp(We, g, ye, h(Se))) : nn, Oe = we.methods.length > 0 ? we.methods.map((We) => Wp(We, g, ye, h(Se))) : nn, de = be.width, Te = 0;
    for (let We of Ie) de = Math.max(de, typeof We == "string" ? g.width(We, d, 0) : We.width), Te += typeof We == "string" ? p : Math.max(p, We.height);
    for (let We of ze) de = Math.max(de, We.width);
    for (let We of Oe) de = Math.max(de, We.width);
    let fe = !(i && ze.length === 0 && Oe.length === 0), Ce = (We) => fe ? We > 0 ? 2 * Pp + We * ke : Rv : 0, Fe = 2 * ln + Te + Math.max(be.height, Math.round(se * 1.5)), He = Ce(ze.length);
    return { node: me, style: Se, label: be, w: Math.max(de + 2 * hc, Dv), h: Fe + He + Ce(Oe.length), loops: 0, annotations: Ie, attributes: ze, methods: Oe, titleH: Fe, attributesH: He, fontSize: se };
  }
  let z = [], _ = [], T = [], E = [], M = [], A = new Float64Array(C.length * 4), m = (me, we, Se) => {
    A[me * 4 + we]++, Se > A[me * 4 + we + 1] && (A[me * 4 + we + 1] = Se);
  };
  for (let me of n.edges) {
    if (me.source < 0 || me.target < 0) continue;
    let we = je(me.label, !0, g, u, 200), Se = x(me.startLabelRight), se = x(me.endLabelLeft);
    me.source === me.target ? (C[me.source].loops++, ee[me.source].w += 2 * (oc + (we.width > 0 ? we.width + 12 : 0))) : (m(me.source, 0, Se), m(me.target, 2, se)), E.push(Se), M.push(se), _.push(me), T.push(we), z.push({ src: me.source, dst: me.target, minlen: 1, labelW: we.width > 0 ? we.width + 12 : 0, labelH: we.height > 0 ? we.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  if (v === "TB" || v === "BT") for (let me = 0; me < C.length; me++) {
    if (!C[me].node.classNode) continue;
    let we = 0;
    for (let Se = 0; Se < 4; Se += 2) {
      let se = A[me * 4 + Se], ye = A[me * 4 + Se + 1];
      se > 1 && (we = Math.max(we, (se - 1) * (ye > 0 ? ye + 24 : 14) + 24));
    }
    we = Math.min(we, 480), we > C[me].w && (ee[me].w += we - C[me].w, C[me].w = we);
  }
  let I = !1;
  for (let me = 0; me < _.length && !I; me++) I = E[me] > 0 || M[me] > 0;
  let k = 0;
  if (v === "TB" || v === "BT") {
    let me = (we) => we ? Math.max(p, b(we, d)?.height ?? 0) : 0;
    for (let we of _) k = Math.max(k, me(we.startLabelRight) + me(we.endLabelLeft) - 2 * p);
  }
  let w = cl(ee, z, v, { nodeSep: dc(l, "nodeSpacing", Fp), edgeSep: Nv, rankSep: dc(l, "rankSpacing", I ? zp + 16 : zp) + k, portSep: 20, apart: !0 }), B = /* @__PURE__ */ new Map(), N = [], j = (me, we, Se, se, ye) => {
    let ke = me.route, $e = ee[Se], be = fa(ke, we, $e);
    if (be < 0) return;
    let Ie = ($e.w - C[Se].w) / 2;
    be === 1 ? ke[we] -= Ie : be === 3 && (ke[we] += Ie);
    let ze = be & 1, Oe = ke[(we === 0 ? 3 : we - 3) + ze], de = Oe - ke[we + ze], Te = { route: ke, at: we, toward: Oe, order: ye, room: se, side: be, after: ze ? de > 0 : de >= 0 }, fe = Se * 4 + be, Ce = B.get(fe);
    return Ce ? Ce.push(Te) : B.set(fe, [Te]), Te;
  }, F = [], Y = [];
  for (let me = 0; me < z.length; me++) {
    let we = z[me], Se = we.src !== we.dst && we.route.length >= 6;
    F.push(Se ? j(we, 0, we.src, E[me], me) : void 0), Y.push(Se ? j(we, we.route.length - 3, we.dst, M[me], me) : void 0);
  }
  let W = (me, we, Se) => {
    for (let se = ee[me].parent, ye = 0; se >= 0 && ye < 1e4; se = ee[se].parent, ye++) {
      let ke = ee[se], $e = Math.abs(we - ke.x), be = Math.abs(Se - ke.y);
      if (Math.abs(be - ke.h / 2) < 0.5 && $e <= ke.w / 2 + 0.5 || Math.abs($e - ke.w / 2) < 0.5 && be <= ke.h / 2 + 0.5) return !0;
    }
    return !1;
  }, K = [];
  for (let [me, we] of B) {
    if (we.length < 2) continue;
    let Se = me >> 2, se = me & 1, ye = se ? C[Se].h : C[Se].w;
    we.sort((Ie, ze) => Ie.toward - ze.toward || Ie.order - ze.order);
    let ke = 0;
    for (let Ie = 0; Ie + 1 < we.length; Ie++) {
      let ze = we[Ie], Oe = we[Ie + 1], de = se ? 20 : 24;
      ze.room > 0 && ze.after && (de += se ? p + 6 : ze.room), Oe.room > 0 && !Oe.after && (de += se ? p + 6 : Oe.room), K[Ie] = de, ke += de;
    }
    let $e = Math.min(1, (ye - 24) / ke);
    if ($e <= 0) continue;
    let be = (se ? ee[Se].y : ee[Se].x) - ke * $e / 2;
    for (let Ie = 0; Ie < we.length; Ie++) {
      let { route: ze, at: Oe } = we[Ie], de = Oe === 0 ? 3 : -3, Te = Oe + de, fe = -1;
      for (let Ce = Te; Ce >= 0 && Ce < ze.length && Math.abs(ze[Ce + se] - ze[Te + se]) < 0.5; Ce += de) if (W(Se, ze[Ce], ze[Ce + 1])) {
        fe = Ce;
        break;
      }
      if (fe >= 0 && Math.abs(ze[Te + se] - be) <= 24) for (let Ce = Te; Ce !== fe + de; Ce += de) ze[Ce + se] = be;
      ze[Oe + se] = be, be += K[Ie] * $e;
    }
  }
  let H = (me, we, Se, se) => {
    if (we === void 0 || Se <= 0) return;
    let ye = we.side & 1, ke = se ? 0 : me.length - 3, $e = ke + 1 - ye, be = Math.abs(me[(se ? 3 : ke - 3) + 1 - ye] - me[$e]), Ie = Math.min(ye ? Se + 10 : p + 6, be * 0.35);
    if (Ie < 4) return;
    let ze = [me[ke], me[ke + 1], me[ke + 2]];
    ze[1 - ye] += (we.side === 0 || we.side === 3 ? -1 : 1) * Ie, me.splice(se ? 3 : ke, 0, ze[0], ze[1], ze[2]);
  };
  for (let me = 0; me < z.length; me++) H(z[me].route, F[me], E[me], !0), H(z[me].route, Y[me], M[me], !1);
  let te = 0, Q = 0, L = w.width, X = w.height, le = (me, we, Se, se, ye, ke, $e) => {
    if (!we) return;
    let be = b(we, d), Ie = be ? Math.max(p, be.height) : p, ze = se, Oe = ye;
    ke & 1 ? (ze += (ke === 3 ? -1 : 1) * (5 + Se / 2), Oe += ($e ? 1 : -1) * (7 + Ie / 2)) : (ze += ($e ? 1 : -1) * (9 + Se / 2), Oe += (ke === 0 ? -1 : 1) * (3 + Ie / 2)), N.push({ text: Tt(we), math: be, x: ze, y: Oe, w: Se, h: Ie, parent: me }), te = Math.min(te, ze - Se / 2), L = Math.max(L, ze + Se / 2), Q = Math.min(Q, Oe - Ie / 2), X = Math.max(X, Oe + Ie / 2);
  }, J = /* @__PURE__ */ new Map(), V = new Int32Array(z.length);
  for (let me = 0; me < z.length; me++) {
    let we = z[me], Se = _[me], se = we.route;
    if (we.src === we.dst) {
      let ye = J.get(we.src) ?? 0;
      J.set(we.src, ye + 1), V[me] = ye;
      let ke = ee[we.src], $e = C[we.src], be = ke.x + $e.w / 2, Ie = Math.min($e.h / 2 - 4, 8 + ye * 6);
      le(we.src, Se.startLabelRight, E[me], be, ke.y - Ie, 1, !1), le(we.dst, Se.endLabelLeft, M[me], be, ke.y + Ie, 1, !0), we.labelX = ke.x + $e.w / 2 + oc + ye * 8 + 4 + we.labelW / 2, we.labelY = ke.y;
    } else if (se.length >= 6) {
      let ye = se.length - 3, ke = F[me], $e = Y[me];
      le(we.src, Se.startLabelRight, E[me], se[0], se[1], ke ? ke.side : 2, ke ? ke.after : !0), le(we.dst, Se.endLabelLeft, M[me], se[ye], se[ye + 1], $e ? $e.side : 0, $e ? $e.after : !0);
    }
  }
  let Z = r.maxWidth;
  if (Z !== void 0 && Z > 0 && L - te + 2 * y > Z) {
    let me = N.map((Se) => ({ ...Wt(Se.w, Se.h, Se.parent), x: Se.x, y: Se.y })), we = Sv(ee.concat(me), z, Math.max(1, Z - 2 * y), dc(l, "nodeSpacing", Fp));
    we && (N.forEach((Se, se) => {
      Se.x = me[se].x, Se.y = me[se].y;
    }), te = Q = 0, L = we.width, X = we.height);
  }
  let ae = y - te, oe = y - Q, ue = Math.ceil(L - te + 2 * y), he = Math.ceil(X - Q + 2 * y), re = [], P = /* @__PURE__ */ new Map();
  if (n.nodes.length > 0 && n.nodes[0].isGroup) for (let me of z) ei(P, me.route);
  let ne = "", ce = "", pe = "";
  for (let me = 0; me < C.length; me++) {
    let we = C[me], Se = ee[me], se = we.node, ye = Se.x + ae, ke = Se.y + oe, $e = Ye(se.id), be = Se.isGroup ? Se.w : we.w, Ie = Se.isGroup ? Se.h : we.h;
    if (se.isGroup) {
      let Oe = Se.isGroup ? lh(Se, we.label.width, P, Wa) : Se.x, de = ke - Ie / 2 + 8 + we.label.height / 2, Te = ' class="pele-cluster-label" fill="var(--_m)"', fe = Se.isGroup && Y2(Se, we.label.width, Oe, P);
      fe && (ce += j2(we.label, Oe + ae, de, Te, $e, n.nodes, me)), ne += `<g class="pele-cluster pele-namespace" data-id="${$e}"><rect x="${f(ye - be / 2)}" y="${f(ke - Ie / 2)}" width="${f(be)}" height="${f(Ie)}" fill="var(--_a)" fill-opacity="0.5" stroke="var(--_b)"${wt}/>` + (fe ? "" : Pe(we.label, Oe + ae, de, Te)) + "</g>";
      continue;
    }
    let ze = ` transform="translate(${f(ye)},${f(ke)})"`;
    if (se.classNode) pe += Me(we, se.classNode, $e, ze);
    else if (se.shape === "note") {
      let Oe = be / 2, de = -Ie / 2;
      pe += `<g class="pele-node pele-note" data-id="${$e}"${ze}><path d="M${f(-Oe)},${f(de)}H${f(Oe - sn)}L${f(Oe)},${f(de + sn)}V${f(-de)}H${f(-Oe)}Z" fill="var(--_a)" stroke="var(--_b)" stroke-linejoin="round"/><path d="M${f(Oe - sn)},${f(de)}V${f(de + sn)}H${f(Oe)}" fill="none" stroke="var(--_b)" stroke-linejoin="round"/>` + Pe(we.label, 0, 0, ` class="pele-label" font-size="${u}"`, r.icons) + "</g>";
    } else pe += `<g class="pele-node pele-interface" data-id="${$e}"${ze}>` + Pe(we.label, 0, 0, ` class="pele-label" font-size="${u}"`, r.icons) + "</g>";
  }
  function Me(me, we, Se, se) {
    let { w: ye, h: ke, style: $e } = me, be = -ye / 2, Ie = -ke / 2, ze = Math.round(me.fontSize * 0.875), Oe = Math.round(ze * 1.5), de = `<rect x="${f(be)}" y="${f(Ie)}" width="${f(ye)}" height="${f(ke)}" fill="var(--_s)" stroke="var(--_b)"${Et($e.shape)}/>`, Te = Xt($e), fe = Ie + me.titleH, Ce = fe + me.attributesH;
    if (ke > me.titleH) {
      let Le = $e.stroke ? ` style="stroke:${it($e.stroke)}"` : "";
      de += `<path class="pele-divider" d="M${f(be)},${f(fe)}H${f(-be)}M${f(be)},${f(Ce)}H${f(-be)}" fill="none" stroke="var(--_b)"${Le}/>`;
    }
    let Fe = Ie + ln;
    for (let Le of me.annotations) if (typeof Le == "string") de += `<text class="pele-annotation" x="0" y="${f(Fe + p / 2 + d * 0.35)}" text-anchor="middle" font-size="${d}"${Te || ' fill="var(--_m)"'}>${it(Le)}</text>`, Fe += p;
    else {
      let et = Math.max(p, Le.height);
      de += Pe(Le, 0, Fe + et / 2, ` class="pele-annotation" font-size="${d}"${Te || ' fill="var(--_m)"'}`, r.icons), Fe += et;
    }
    let He = me.fontSize === c ? "" : ` font-size="${f(me.fontSize)}"`;
    de += Pe(me.label, 0, (Fe + fe - ln) / 2, ` class="pele-label"${He} font-weight="var(--_hw)"${Te}${$e.text}`, r.icons);
    let We = (Le, et, _e) => {
      let Ve = "", Ze = _e + Pp + Oe / 2 + ze * 0.35;
      for (let tt of Le) {
        let ct = tt.classifier === "$" ? ` pele-static"${$e.text ? $e.text.slice(0, -1) + 'text-decoration:underline"' : ' style="text-decoration:underline"'}` : tt.classifier === "*" ? ` pele-abstract" font-style="italic"${$e.text}` : `"${$e.text}`;
        Ve += `<text class="pele-member pele-${et}${ct} x="${f(be + hc)}" y="${f(Ze)}">${it(tt.text)}</text>`, Ze += Oe;
      }
      return Ve;
    };
    return (me.attributes.length > 0 || me.methods.length > 0) && (de += `<g class="pele-members" font-size="${ze}"${Te}${h($e) ? ` font-family="${hi}"` : ""}>${We(me.attributes, "attribute", fe)}${We(me.methods, "method", Ce)}</g>`), we.tooltip && (de = `<title>${Ye(we.tooltip)}</title>` + de), we.link && (de = oi(de, we.link, we.id, re, r, we.linkTarget && Lv.has(we.linkTarget) ? ` target="${we.linkTarget}"` : "")), `<g class="pele-node pele-class${Ht(we.cssClasses.replace(/^default\s?/, ""))}" data-id="${Se}"${se}>${de}</g>`;
  }
  let xe = "", ve = "";
  for (let me = 0; me < z.length; me++) {
    let we = z[me], Se = _[me], se = T[me], ye = Se.arrowTypeStart, ke = Se.arrowTypeEnd, $e = Lp(ye), be = Lp(ke), Ie;
    if (we.src === we.dst) {
      let Oe = ee[we.src], de = C[we.src], Te = V[me], fe = Oe.x + ae + de.w / 2, Ce = Oe.y + oe, Fe = Math.min(de.h / 2 - 4, 8 + Te * 6), He = oc + Te * 8;
      Ie = { d: `M${f(fe + $e)},${f(Ce - Fe)}C${f(fe + He + $e)},${f(Ce - Fe)} ${f(fe + He + be)},${f(Ce + Fe)} ${f(fe + be)},${f(Ce + Fe)}`, sx: fe, sy: Ce - Fe, sdx: -1, sdy: 0, ex: fe, ey: Ce + Fe, edx: -1, edy: 0 };
    } else {
      let Oe = we.route;
      for (let de = 0; de < Oe.length; de += 3) Oe[de] += ae, Oe[de + 1] += oe;
      Ie = Na(Oe, void 0, $e, be);
    }
    let ze = Se.pattern === "dashed" ? ' stroke-dasharray="6 4"' : Se.pattern === "dotted" ? ' stroke-dasharray="2 4"' : "";
    if (xe += `<g class="pele-edge${Se.pattern === "dotted" ? " pele-note-edge" : " pele-relation"}" data-id="${Ye(Se.id)}"><path d="${Ie.d}"${ze}/>` + Op(ye, Ie.sx, Ie.sy, Ie.sdx, Ie.sdy, cc) + Op(ke, Ie.ex, Ie.ey, Ie.edx, Ie.edy, cc) + "</g>", se.width > 0) {
      let Oe = we.labelX + ae, de = we.labelY + oe;
      ve += ga(Se.id, se, Oe, de, "", r.icons);
    }
  }
  let Ae = "";
  for (let me of N) Ae += me.math ? Pe(me.math, me.x + ae, me.y + oe, ' class="pele-cardinality"', r.icons) : `<text class="pele-cardinality" x="${f(me.x + ae)}" y="${f(me.y + oe + d * 0.35)}" text-anchor="middle">${it(me.text)}</text>`;
  let Ee = sm(e.title, g, c, y, ue, he, (ne ? `<g class="pele-clusters">${ne}</g>` : "") + (xe ? `<g class="pele-edges" fill="none" stroke="${cc}" stroke-linecap="round">${xe}</g>` : "") + (ce ? `<g class="pele-cluster-titles">${ce}</g>` : "") + (ve ? `<g class="pele-edge-labels" font-size="${u}">${ve}</g>` : "") + (Ae ? `<g class="pele-cardinalities" font-size="${d}" fill="var(--_m)">${Ae}</g>` : "") + `<g class="pele-nodes">${pe}</g>`);
  return { svg: xt("class", Ee.width, Ee.height, c, r, e, Ee.content), width: Ee.width, height: Ee.height, links: re };
}
var zv = { type: "class", math: !0, parse(e, t, r) {
  let a = new vv();
  return r && (a.title = r), Cv(e, a), a;
}, render: Ov }, Pv = class {
  domains = /* @__PURE__ */ new Map();
  transitions = [];
  setDomains(e) {
    if (e) for (let t of e) {
      let r = t.domain;
      this.domains.set(r, { name: r, items: (t.items ?? []).map((a) => ({ label: a.label })) });
    }
  }
  setTransitions(e) {
    e && (this.transitions = e.filter((t) => t.from !== t.to).map((t) => ({ from: t.from, to: t.to, label: t.label || void 0 })));
  }
};
function Wv(e, t) {
  let r = new Pv();
  return r.setDomains(e.domains), r.setTransitions(e.transitions), { type: "cynefin", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, domains: r.domains, transitions: r.transitions };
}
var Bp = [{ name: "cynefin-beta:", pattern: "cynefin-beta:" }, Pr("cynefin-beta"), { name: "-->", pattern: "-->" }, { name: ":", pattern: ":" }, { name: "DOMAIN_NAME", pattern: /complex|complicated|clear|chaotic|confusion/y }, aa, Br, di, pl, La, Oa, fr, la, ia];
function Bv(e) {
  let t = new Sr(Ar(e, Bp, "cynefin"), Bp, "cynefin"), r = { $type: "Cynefin", domains: [], transitions: [] }, a = () => {
    for (; t.kinds[t.i] === 9; ) t.i++;
  }, s = () => {
    t.kind !== -1 && (t.kind !== 9 && t.fail("a line break or the end of input"), a());
  };
  for (a(), t.kind !== 1 && t.kind !== 0 && t.fail("'cynefin-beta'"), t.i++; t.kind !== -1; ) switch (t.kind) {
    case 9:
      t.i++;
      break;
    case 5:
      r.accDescr = Cr(t.take()), s();
      break;
    case 6:
      r.accTitle = Tr(t.take()), s();
      break;
    case 7:
      r.title = Er(t.take()), s();
      break;
    case 4: {
      let l = t.take();
      if (t.accept(2)) {
        let i = { $type: "Transition", from: l, to: t.expect(4) };
        t.accept(3) && (i.label = Fr(t.expect(8))), s(), r.transitions.push(i);
        break;
      }
      let n = { $type: "DomainBlock", domain: l, items: [] };
      for (a(); t.kinds[t.i] === 8; ) n.items.push({ $type: "DomainItem", label: Fr(t.take()) }), a();
      r.domains.push(n);
      break;
    }
    default:
      t.fail("a domain, a transition, a title, or a line break");
  }
  return r;
}
function Gp(e) {
  let t = e + 1831565813 | 0;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Gv(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
  return t;
}
function Hv(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e !== 0 ? e : Gv(t);
}
var Uv = { segments: 7, vertical: !0, pointStep: 17, controlStep: 31, controlShift: 7 }, Hp = { segments: 7, vertical: !1, pointStep: 23, controlStep: 37, controlShift: 11 };
function fc(e, t, r, a, s, l) {
  let n = (t - e) / l.segments, i = [], o = [];
  for (let c = 0; c <= l.segments; c++) {
    let u = c === 0 && l.pinStart || c === l.segments && l.pinEnd;
    i.push(e + c * n), o.push(u ? r : r + Gp(a + c * l.pointStep) * s * 2 - s);
  }
  let h = l.vertical ? [o[0], i[0]] : [i[0], o[0]];
  for (let c = 0; c < l.segments; c++) {
    let u = (i[c] + i[c + 1]) / 2, d = s * 1.5 * (c % 2 === 0 ? 1 : -1) * Gp(a + c * l.controlStep + l.controlShift);
    l.vertical ? h.push(o[c] + d, u, o[c + 1] - d, u, o[c + 1], i[c + 1]) : h.push(u, o[c] + d, u, o[c + 1] - d, i[c + 1], o[c + 1]);
  }
  return h;
}
function Yv(e, t, r, a) {
  let s = r - t;
  return [e, t, e + a, t + s * 0.2, e - a * 1.5, t + s * 0.55, e + a * 0.5, t + s * 0.75, e - a, t + s * 0.85, e + a * 0.3, t + s * 0.95, e, r];
}
function Qi(e) {
  let t = "";
  for (let r = 2; r < e.length; r += 6) t += `C${f(e[r])},${f(e[r + 1])} ${f(e[r + 2])},${f(e[r + 3])} ${f(e[r + 4])},${f(e[r + 5])}`;
  return t;
}
function hn(e) {
  let t = "";
  for (let r = e.length - 6; r >= 2; r -= 6) t += `C${f(e[r + 2])},${f(e[r + 3])} ${f(e[r])},${f(e[r + 1])} ${f(e[r - 2])},${f(e[r - 1])}`;
  return t;
}
function cn(e) {
  return `M${f(e[0])},${f(e[1])}${Qi(e)}`;
}
function jv(e, t, r, a) {
  let s = `${f(r)},${f(a)}`;
  return `M${f(e - r)},${f(t)}A${s} 0 1,1 ${f(e + r)},${f(t)}A${s} 0 1,1 ${f(e - r)},${f(t)}Z`;
}
var uc = [["complex", 0, 0, 0], ["complicated", 1, 0, 1], ["chaotic", 0, 1, 3], ["clear", 1, 1, 2]], qv = 4, Vv = /* @__PURE__ */ new Map([["complex", ["Complex", "Probe → Sense → Respond", "Emergent Practices"]], ["complicated", ["Complicated", "Sense → Analyse → Respond", "Good Practices"]], ["clear", ["Clear", "Sense → Categorise → Respond", "Best Practices"]], ["chaotic", ["Chaotic", "Act → Sense → Respond", "Novel Practices"]], ["confusion", ["Confusion", "", "Disorder"]]]), Up = 3, Yp = 200, Kv = 10, Xv = 4, dn = 6, jp = 10, qp = 20, fn = 10;
function un(e, t, r, a, s) {
  let l = e.cynefin?.[t];
  return typeof l == "number" && l >= a && l <= s ? l : r;
}
function Zv(e, t, r) {
  let a = r.fontSize ?? 16, s = Math.round(a * 0.8125), l = Math.round(a * 0.875), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8, o = r.icons, h = t.cynefin?.showDomainDescriptions !== !1, c = un(t, "boundaryAmplitude", 8, 0, 50), u = Hv(un(t, "seed", 0, -1e15, 1e15), r.idPrefix ?? "pele"), d = Math.round(l * 1.5), p = (L, X) => {
    let le = je(L, !1, n, l, Yp);
    return { text: L, label: le, w: le.width + 2 * Kv, h: Math.max(le.height, d) + 2 * Xv, overflow: X };
  }, g = (L) => {
    let X = Vv.get(L), le = je(X[0], !1, n, a, 4e3, 1), J = [];
    if (h) for (let he of [X[1], X[2]]) he && J.push(je(he, !1, n, s, 4e3, 2));
    let V = e.domains.get(L)?.items ?? [], Z = L === "confusion" && V.length > Up ? Up : V.length, ae = [];
    for (let he = 0; he < Z; he++) ae.push(p(V[he].label, !1));
    Z < V.length && ae.push(p(`+${V.length - Z} more`, !0));
    let oe = le.width, ue = le.height;
    for (let he of J) oe = Math.max(oe, he.width), ue += he.height;
    ae.length > 0 && (ue += jp - dn);
    for (let he of ae) oe = Math.max(oe, he.w), ue += dn + he.h;
    return { name: L, title: le, subtitles: J, badges: ae, w: oe, h: ue, cx: 0, cy: 0 };
  }, y = uc.map(([L]) => g(L)), b = g("confusion"), x = Math.max(88, b.w * 0.71 + 8), v = Math.max(64, b.h * 0.71 + 6), $ = un(t, "width", 640, 100, 1e4) / 2, S = un(t, "height", 440, 100, 1e4) / 2;
  for (let L of y) $ = Math.max($, L.w + 2 * qp), S = Math.max(S, L.h + 2 * qp);
  for (let L of y) {
    let X = ($ - L.w) / 2, le = (S - L.h) / 2;
    if ((X / (x + fn)) ** 2 + (le / (v + fn)) ** 2 >= 1) continue;
    let J = L.w + 2 * (x + fn), V = L.h + 2 * (v + fn);
    J * S <= $ * V ? $ = Math.max($, J) : S = Math.max(S, V);
  }
  let R = je(e.title, !1, n, a, 4e3, 1), D = R.height > 0 ? R.height + 12 : 0, O = 2 * $, U = 2 * S, q = i, C = i + D, ee = q + $, ie = C + S, G = q + O, z = C + U, _ = fc(C, ie, ee, u, c, { ...Uv, segments: 4, pinEnd: !0 }), T = fc(q, ee, ie, u + 100, c, { ...Hp, segments: 4, pinEnd: !0 }), E = fc(ee, G, ie, u + 200, c, { ...Hp, segments: 4, pinStart: !0 }), M = Yv(ee, ie, z, O * 0.03), A = (L, X) => X ? `${f(L[L.length - 2])},${f(L[L.length - 1])}` : `${f(L[0])},${f(L[1])}`, m = /* @__PURE__ */ new Map([["complex", `M${f(q)},${f(C)}L${A(_, !1)}${Qi(_)}${hn(T)}Z`], ["complicated", `M${A(_, !1)}L${f(G)},${f(C)}L${A(E, !0)}${hn(E)}${hn(_)}Z`], ["chaotic", `M${A(T, !1)}${Qi(T)}${Qi(M)}L${f(q)},${f(z)}Z`], ["clear", `M${A(E, !1)}${Qi(E)}L${f(G)},${f(z)}L${A(M, !0)}${hn(M)}Z`]]), I = "";
  for (let [L, , , X] of uc) I += `<path class="pele-cynefin-region" data-id="${L}" d="${m.get(L)}" fill="${vt(X)}" fill-opacity="0.14"/>`;
  let k = `<g class="pele-cynefin-boundaries" fill="none" stroke="var(--_b)" stroke-dasharray="6 3"><path d="${cn(_)}"/><path d="${cn(T)}"/><path d="${cn(E)}"/><path class="pele-cynefin-cliff" d="${cn(M)}" stroke="var(--_l)" stroke-width="2" stroke-dasharray="none" stroke-linecap="round"/></g>`, w = jv(ee, ie, x, v), B = `<path d="${w}" fill="var(--_bg)"/><path class="pele-cynefin-region" data-id="confusion" d="${w}" fill="${vt(qv)}" fill-opacity="0.18" stroke="var(--_b)" stroke-dasharray="4 2"/>`, N = (L) => {
    let X = L.cy - L.h / 2, le = Pe(L.title, L.cx, X + L.title.height / 2, ' class="pele-label" font-weight="var(--_hw)"');
    X += L.title.height;
    for (let J of L.subtitles) le += Pe(J, L.cx, X + J.height / 2, ` class="pele-cynefin-subtitle" font-size="${s}" font-style="italic" fill="var(--_m)"`), X += J.height;
    X += jp - dn;
    for (let J of L.badges) X += dn, le += `<g class="pele-node${J.overflow ? " pele-cynefin-overflow" : ""}"${J.overflow ? "" : ` data-id="${Ye(J.text)}"`}><rect x="${f(L.cx - J.w / 2)}" y="${f(X)}" width="${f(J.w)}" height="${f(J.h)}" fill="var(--_bg)" stroke="var(--_b)"${J.overflow ? ' stroke-dasharray="3 2"' : ""}${wt}/>` + Pe(J.label, L.cx, X + J.h / 2, ` class="pele-label" font-size="${l}"${J.overflow ? ' fill="var(--_m)"' : ""}`, o) + "</g>", X += J.h;
    return `<g class="pele-cynefin-domain" data-id="${L.name}">${le}</g>`;
  }, j = /* @__PURE__ */ new Map(), F = "";
  uc.forEach(([L, X, le], J) => {
    let V = y[J];
    V.cx = q + $ * (X + 0.5), V.cy = C + S * (le + 0.5), j.set(L, V), F += N(V);
  }), b.cx = ee, b.cy = ie, j.set("confusion", b), F += N(b);
  let Y = (L, X, le) => L === b ? ((X - ee) / (x + 4)) ** 2 + ((le - ie) / (v + 4)) ** 2 <= 1 : Math.abs(X - L.cx) <= L.w / 2 + 8 && Math.abs(le - L.cy) <= L.h / 2 + 8, W = "", K = /* @__PURE__ */ new Map();
  for (let L of e.transitions) {
    let X = j.get(L.from), le = j.get(L.to);
    if (!X || !le || X === le) continue;
    let J = L.from < L.to ? `${L.from} ${L.to}` : `${L.to} ${L.from}`, V = K.get(J) ?? 0;
    K.set(J, V + 1);
    let Z = le.cx - X.cx, ae = le.cy - X.cy, oe = Math.hypot(Z, ae) || 1, ue = (X.cx + le.cx) / 2, he = (X.cy + le.cy) / 2, re = -ae * (ue - ee) + Z * (he - ie) >= 0 ? 1 : -1, P = -ae / oe * re, ne = Z / oe * re, ce = (X !== b && le !== b && Math.abs(Z) > 1 && Math.abs(ae) > 1 ? 2 * (Math.hypot(x * P, v * ne) + 16) : oe * 0.15) + V * 56, pe = ue + P * ce, Me = he + ne * ce, xe = (Ce) => {
      let Fe = 1 - Ce;
      return [Fe * Fe * X.cx + 2 * Fe * Ce * pe + Ce * Ce * le.cx, Fe * Fe * X.cy + 2 * Fe * Ce * Me + Ce * Ce * le.cy];
    }, ve = (Ce, Fe, He, We) => {
      for (let Le = 0; Le < 16; Le++) {
        let et = (Fe + He) / 2;
        Y(Ce, ...xe(et)) === We ? Fe = et : He = et;
      }
      return (Fe + He) / 2;
    }, Ae = 48, Ee = 1;
    for (; Ee <= Ae && Y(X, ...xe(Ee / Ae)); ) Ee++;
    if (Ee > Ae) continue;
    let me = ve(X, (Ee - 1) / Ae, Ee / Ae, !0);
    for (; Ee <= Ae && !Y(le, ...xe(Ee / Ae)); ) Ee++;
    let we = Ee > Ae ? 1 : ve(le, (Ee - 1) / Ae, Ee / Ae, !1), [Se, se] = xe(me), [ye, ke] = xe(we), $e = (Ce, Fe, He) => (1 - me) * (1 - we) * Ce + ((1 - me) * we + me * (1 - we)) * Fe + me * we * He, be = $e(X.cx, pe, le.cx), Ie = $e(X.cy, Me, le.cy), ze = Math.hypot(ye - be, ke - Ie) || 1, Oe = (ye - be) / ze, de = (ke - Ie) / ze, Te = St("arrow_point", ye, ke, Oe, de, "var(--_l)");
    ye -= Oe * Ct("arrow_point"), ke -= de * Ct("arrow_point");
    let fe = "";
    if (L.label) {
      let Ce = je(L.label, !1, n, s, Yp), [Fe, He] = xe((me + we) / 2), We = Math.abs(P) * Ce.width / 2 + Math.abs(ne) * Ce.height / 2 + 6, Le = Ce.width / 2 + 4, et = Math.min(Math.max(Fe + P * We, q + Le), Math.max(G - Le, q + Le));
      fe = Pe(Ce, et, He + ne * We, ` class="pele-edge-label" font-size="${s}"`, o);
    }
    W += `<g class="pele-edge" data-id="${L.from}-${L.to}"><path d="M${f(Se)},${f(se)}Q${f(be)},${f(Ie)} ${f(ye)},${f(ke)}" fill="none" stroke="var(--_l)"/>` + Te + fe + "</g>";
  }
  let H = Math.ceil(Math.max(O, R.width) + 2 * i), te = Math.ceil(U + D + 2 * i), Q = Pe(R, q + O / 2, i + R.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g class="pele-cynefin-regions">${I}</g>` + k + B + F + (W ? `<g class="pele-edges">${W}</g>` : "");
  return { svg: xt("cynefin", H, te, a, r, e, Q), width: H, height: te, links: [] };
}
var Qv = { type: "cynefin", parse: (e, t, r) => Wv(Bv(e), r), render: Zv };
function Jv(e) {
  return e === "markdown" || e === "string" || e === "text" ? e : "markdown";
}
var ek = class {
  type = "er";
  direction = "TB";
  entities = /* @__PURE__ */ new Map();
  relationships = [];
  classes = /* @__PURE__ */ new Map();
  subgraphs = [];
  title;
  accTitle;
  accDescr;
  subgraphLookup = /* @__PURE__ */ new Map();
  claimed = /* @__PURE__ */ new Set();
  addEntity(e, t = "") {
    let r = this.entities.get(e);
    return r === void 0 ? (r = { id: `entity-${e}-${this.entities.size}`, label: e, alias: t, attributes: [], cssClasses: "default", cssStyles: [] }, this.entities.set(e, r)) : !r.alias && t && (r.alias = t), r;
  }
  addAttributes(e, t) {
    let r = this.addEntity(e);
    for (let a = t.length - 1; a >= 0; a--) {
      let s = t[a];
      s.keys ??= [], s.comment ??= "", r.attributes.push(s);
    }
  }
  addRelationship(e, t, r, a) {
    let s = this.subgraphLookup.has(e) ? e : this.addEntity(e).id, l = this.subgraphLookup.has(r) ? r : this.addEntity(r).id;
    this.relationships.push({ entityA: s, roleA: t, entityB: l, relSpec: a });
  }
  setDirection(e) {
    this.direction = e;
  }
  addCssStyles(e, t) {
    if (t) for (let r of e) {
      let a = this.entities.get(r);
      if (a) for (let l of t) a.cssStyles.push(l);
      let s = this.subgraphLookup.get(r);
      if (s) for (let l of t) s.cssStyles.push(l);
    }
  }
  addClass(e, t) {
    for (let r of e) {
      let a = this.classes.get(r);
      if (a === void 0 && (a = { id: r, styles: [], textStyles: [] }, this.classes.set(r, a)), !!t) for (let s of t) s.includes("color") && a.textStyles.push(s.replace("fill", "bgFill")), a.styles.push(s);
    }
  }
  setClass(e, t) {
    for (let r of e) {
      let a = this.entities.get(r);
      if (a) for (let l of t) a.cssClasses += " " + l;
      let s = this.subgraphLookup.get(r);
      if (s) for (let l of t) s.classes.push(l);
    }
  }
  addSubGraph(e, t, r) {
    let a = e.text.trim(), s = /* @__PURE__ */ new Set(), l = [], n;
    for (let o of t.flat()) {
      if (typeof o != "string") {
        o?.stmt === "dir" && (n = o.value);
        continue;
      }
      let h = o.trim();
      h === "" || s.has(h) || (s.add(h), this.claimed.has(o) || l.push(o));
    }
    for (let o of l) this.claimed.add(o);
    let i = { id: a, nodes: l, title: (r.text || "").trim(), classes: [], cssStyles: [], dir: n, labelType: Jv(r.type) };
    return this.subgraphs.push(i), this.subgraphLookup.set(a, i), a;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
}, Vp = ["$end", "INVALID", "ER_DIAGRAM", "EOF", "NEWLINE", "COLON", "STYLE_SEPARATOR", "BLOCK_START", "BLOCK_STOP", "SQS", "SQE", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "END", "SUBGRAPH", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "CLASSDEF", "UNICODE_TEXT", "STYLE_TEXT", "COMMA", "CLASS", "STYLE", "SEMI", "NUM", "BRKT", "ENTITY_NAME", "DECIMAL_NUM", "ENTITY_ONE", "ATTRIBUTE_WORD", "ATTRIBUTE_KEY", "COMMENT", "ZERO_OR_ONE", "ZERO_OR_MORE", "ONE_OR_MORE", "ONLY_ONE", "MD_PARENT", "NON_IDENTIFYING", "IDENTIFYING", "WORD", "CHAR"], ks = 1, Fo = 2, Jf = 4, Ls = 8, Or = new Uint8Array(128);
for (let e = 0; e < 128; e++) {
  let t = e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e === 95, r = t && (e < 48 || e > 57);
  t && (Or[e] |= ks | Fo | Ls), r && (Or[e] |= Jf);
}
for (let e of "-*") Or[e.charCodeAt(0)] |= ks | Fo | Ls;
Or[46] |= ks | Ls;
Or[42] |= Jf;
for (let e of "[](),") Or[e.charCodeAt(0)] |= Ls;
var tk = /accTitle\s*:\s*/iy, rk = /accDescr\s*:\s*/iy, ak = /accDescr\s*\{\s*/iy, lk = [/.*direction\s+TB[^\n]*/iy, /.*direction\s+BT[^\n]*/iy, /.*direction\s+RL[^\n]*/iy, /.*direction\s+LR[^\n]*/iy], pc = /direction/gi, gc = /[\n\r\u2028\u2029]/g;
function Kp(e, t) {
  return e < 128 ? (Or[e] & t) !== 0 : e >= 192 || e === 181;
}
function ik(e) {
  let t = e.length, r = [], a = [], s = [], l = 0, n = 0, i = -2, o = 0, h = -1, c = -2, u = -1, d = -1, p = -1, g = (G, z, _) => {
    r.push(G), a.push(e.slice(z, _)), s.push(z), n = _;
  }, y = (G, z) => (G.lastIndex = z, G.test(e) ? G.lastIndex : -1), b = (G) => {
    for (let z = 0; z < G.length; z++) {
      let _ = G.charCodeAt(z), T = e.charCodeAt(n + z);
      if (T !== _ && (_ < 97 || _ > 122 || (T | 32) !== _)) return !1;
    }
    return !0;
  }, x = (G) => b(G) && !nt(e.charCodeAt(n + G.length)), v = (G) => {
    let z = e.charCodeAt(G);
    return z >= 65 && z <= 90 ? z + 32 : z;
  }, $ = (G) => (gc.lastIndex = G, gc.test(e) ? gc.lastIndex - 1 : t), S = (G) => {
    for (; yt(e.charCodeAt(G)); ) G++;
    return G;
  }, R = () => {
    if (i === -1 || i < n && (pc.lastIndex = n, i = pc.test(e) ? pc.lastIndex - 9 : -1, i === -1) || n < o || (h < n && (h = $(n)), i >= h)) return !1;
    for (let G = 0; G < 4; G++) {
      let z = y(lk[G], n);
      if (z >= 0) return g(18 + G, n, z), !0;
    }
    return o = h, !1;
  }, D = () => {
    let G = e.indexOf('"', n + 1);
    if (G === -1) {
      g(45, n, n + 1);
      return;
    }
    let z = G > n + 1;
    for (let _ = n + 1; z && _ < G; _++) {
      let T = e.charCodeAt(_);
      (T === 37 || T === 92 || T === 13 || T === 10 || T === 11 || T === 8) && (z = !1);
    }
    g(z ? 31 : 44, n, G + 1);
  }, O = (G) => {
    let z = e.charCodeAt(n + 1);
    if (z === 43 && (G === 49 || G === 48)) {
      g(G === 49 ? 39 : 38, n, n + 2);
      return;
    }
    let _ = S(n + 1);
    if (e.charCodeAt(_) === 46 && yt(e.charCodeAt(_ + 1))) {
      g(32, n, S(_ + 2));
      return;
    }
    if (G === 49) {
      if (Ke(z)) {
        let T = n + 2;
        for (; Ke(e.charCodeAt(T)); ) T++;
        let E = e.charCodeAt(T);
        if (nt(E) || E === 34 || E === 39) {
          g(40, n, n + 1);
          return;
        }
      } else if (z === 45 || z === 46) {
        let T = e.charCodeAt(n + 2);
        if (T === 45 || T === 46) {
          g(40, n, n + 1);
          return;
        }
      }
      if (!nt(z)) {
        g(33, n, n + 1);
        return;
      }
    }
    g(29, n, _);
  }, U = (G) => {
    let z = e.charCodeAt(n + 1);
    switch (G) {
      case 101:
        if (x("erdiagram")) g(2, n, n + 9);
        else if (x("end")) {
          let _ = n + 3;
          for (; Ke(e.charCodeAt(_)); ) _++;
          g(16, n, _);
        } else return !1;
        return !0;
      case 115:
        if (x("style")) l = 6, g(27, n, n + 5);
        else if (x("subgraph")) g(17, n, n + 8);
        else return !1;
        return !0;
      case 99:
        if (x("classdef")) l = 6, g(22, n, n + 8);
        else if (x("class")) g(26, n, n + 5);
        else return !1;
        return !0;
      case 111:
        if (x("one or zero")) g(37, n, n + 11);
        else if (x("one or more") || x("one or many")) g(39, n, n + 11);
        else if (x("one")) g(40, n, n + 3);
        else if (x("only one")) g(40, n, n + 8);
        else if (z === 124) g(37, n, n + 2);
        else if (z === 123) g(38, n, n + 2);
        else if (x("optionally to")) g(42, n, n + 13);
        else return !1;
        return !0;
      case 122:
        if (x("zero or one")) g(37, n, n + 11);
        else if (x("zero or more") || x("zero or many")) g(38, n, n + 12);
        else return !1;
        return !0;
      case 109:
        if (b("many(0)")) g(38, n, n + 7);
        else if (b("many(1)")) g(39, n, n + 7);
        else if (x("many")) g(38, n, n + 4);
        else return !1;
        return !0;
      case 116:
        return x("to") ? (g(43, n, n + 2), !0) : !1;
      case 117:
        return z !== 46 && z !== 45 && z !== 124 ? !1 : (g(41, n, n + 1), !0);
      case 124:
        if (v(n + 1) === 111 && !nt(e.charCodeAt(n + 2))) g(37, n, n + 2);
        else if (z === 124) g(40, n, n + 2);
        else if (z === 123) g(39, n, n + 2);
        else return !1;
        return !0;
      case 125:
        if (v(n + 1) === 111 && !nt(e.charCodeAt(n + 2))) g(38, n, n + 2);
        else if (z === 124) g(39, n, n + 2);
        else return !1;
        return !0;
      case 46:
        return z !== 46 && z !== 45 ? !1 : (g(42, n, n + 2), !0);
      case 45:
        if (z === 45) g(43, n, n + 2);
        else if (z === 46) g(42, n, n + 2);
        else return !1;
        return !0;
    }
    return !1;
  }, q = (G) => {
    let z;
    if ((G === 97 || G === 65) && b("acc")) {
      if ((z = y(tk, n)) >= 0) {
        l = 3, g(11, n, z);
        return;
      }
      if ((z = y(rk, n)) >= 0) {
        l = 4, g(13, n, z);
        return;
      }
      if ((z = y(ak, n)) >= 0) {
        l = 5, n = z;
        return;
      }
    }
    if (!R()) {
      switch (G) {
        case 32:
        case 9:
        case 13:
          z = n + 1;
          for (let _ = e.charCodeAt(z); _ === 32 || _ === 9 || _ === 13; _ = e.charCodeAt(z)) z++;
          n = z;
          return;
        case 10:
          for (z = n + 1; e.charCodeAt(z) === 10; ) z++;
          g(4, n, z);
          return;
        case 34:
          D();
          return;
        case 123:
          l = 1, g(7, n, n + 1);
          return;
        case 35:
          g(30, n, n + 1);
          return;
        case 44:
          g(25, n, n + 1);
          return;
        case 58:
          e.charCodeAt(n + 1) === 58 && e.charCodeAt(n + 2) === 58 ? g(6, n, n + 3) : g(5, n, n + 1);
          return;
        case 91:
          g(9, n, n + 1);
          return;
        case 93:
          g(10, n, n + 1);
          return;
      }
      if (yt(G)) {
        O(G);
        return;
      }
      if (!U(G >= 65 && G <= 90 ? G + 32 : G)) {
        if (G >= 128 || (Or[G] & ks) !== 0) {
          z = n + 1;
          for (let _ = e.charCodeAt(z); _ >= 128 || (Or[_] & ks) !== 0; _ = e.charCodeAt(z)) z++;
          g(23, n, z);
          return;
        }
        g(45, n, n + 1);
      }
    }
  }, C = () => {
    if (c === -1 || c < n && (c = e.indexOf("~", n), c === -1)) return !1;
    if (p < n) {
      let z = n;
      for (; z < t && !Ke(e.charCodeAt(z)); ) z++;
      p = z;
    }
    if (c >= p || (u < n && (u = $(n), d = e.lastIndexOf("~", u - 1)), d <= c)) return !1;
    let G = d + 1;
    for (; G < t && !Ke(e.charCodeAt(G)); ) G++;
    return g(34, n, G), !0;
  }, ee = (G) => {
    if (Ke(G)) {
      for (n++; Ke(e.charCodeAt(n)); ) n++;
      return;
    }
    let z = G | 32;
    if ((z === 112 || z === 102 || z === 117) && (e.charCodeAt(n + 1) | 32) === 107 && !nt(e.charCodeAt(n + 2))) {
      g(35, n, n + 2);
      return;
    }
    if (!C()) {
      if (Kp(G, Jf)) {
        let _ = n + 1;
        for (; _ < t && Kp(e.charCodeAt(_), Ls); ) _++;
        g(34, n, _);
        return;
      }
      if (G === 96) {
        l = 2, n++;
        return;
      }
      if (G === 34) {
        let _ = e.indexOf('"', n + 1);
        if (_ !== -1) {
          g(36, n, _ + 1);
          return;
        }
      } else if (G === 125) {
        l = 0, g(8, n, n + 1);
        return;
      }
      g(45, n, n + 1);
    }
  };
  for (; n < t; ) {
    let G = e.charCodeAt(n), z;
    switch (l) {
      case 0:
        q(G);
        break;
      case 1:
        ee(G);
        break;
      case 2:
        G === 96 ? (l = 1, n++) : (z = e.indexOf("`", n), g(34, n, z === -1 ? t : z));
        break;
      case 3:
      case 4:
        z = e.indexOf(`
`, n), g(l === 3 ? 12 : 14, n, z === -1 ? t : z), l = 0;
        break;
      case 5:
        G === 125 ? (l = 0, n++) : (z = e.indexOf("}", n), g(15, n, z === -1 ? t : z));
        break;
      case 6:
        if (G === 10) {
          for (z = n + 1; e.charCodeAt(z) === 10; ) z++;
          l = 0, g(4, n, z);
        } else if (Ke(G)) for (n++; Ke(e.charCodeAt(n)); ) n++;
        else if (G === 58) g(5, n, n + 1);
        else if (G === 44) g(25, n, n + 1);
        else if (G === 35) g(30, n, n + 1);
        else if (G === 59) g(28, n, n + 1);
        else if (G >= 128 || (Or[G] & Fo) !== 0) {
          z = n + 1;
          for (let _ = e.charCodeAt(z); _ >= 128 || (Or[_] & Fo) !== 0; _ = e.charCodeAt(z)) z++;
          g(24, n, z);
        } else return r.push(1), a.push(""), s.push(n), { types: r, texts: a, starts: s };
        break;
    }
  }
  let ie = l === 0 ? 3 : l === 3 ? 12 : l === 4 ? 14 : l === 5 ? 15 : -1;
  return ie !== -1 && (r.push(ie), a.push(""), s.push(t)), r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var mc = /* @__PURE__ */ new Map([[37, "ZERO_OR_ONE"], [38, "ZERO_OR_MORE"], [39, "ONE_OR_MORE"], [40, "ONLY_ONE"], [41, "MD_PARENT"]]), sk = ["TB", "BT", "RL", "LR"], gm = "'UNICODE_TEXT', 'NUM', 'ENTITY_NAME', 'DECIMAL_NUM', 'ENTITY_ONE'", nk = "'ZERO_OR_ONE', 'ZERO_OR_MORE', 'ONE_OR_MORE', 'ONLY_ONE', 'MD_PARENT'", pn = "'EOF', 'NEWLINE', 'title', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'SUBGRAPH', 'direction_tb', 'direction_bt', 'direction_rl', 'direction_lr', 'CLASSDEF', 'CLASS', 'STYLE', " + gm;
function ok(e, t) {
  let { types: r, texts: a, starts: s } = ik(e), l = 0, n = (O) => {
    let U = r[l];
    throw U === 1 ? bt("er", e, s[l], "", !0) : bt("er", e, s[l], `Expecting ${O}, got '${U === 45 ? a[l] : Vp[U]}'`);
  }, i = (O) => (r[l] !== O && n(`'${Vp[O]}'`), a[l++]), o = () => {
    let O = r[l];
    O !== 4 && O !== 28 && O !== 3 && n("'EOF', 'NEWLINE', 'SEMI'"), l++;
  }, h = (O) => O === 23 || O === 31 || O === 29 || O === 32 || O === 33, c = () => {
    let O = r[l];
    h(O) || n(gm);
    let U = a[l++];
    return O === 31 ? U.slice(1, -1) : U;
  }, u = () => {
    let O = [];
    for (; ; ) {
      let U = r[l];
      if (U !== 23 && U !== 24 && n("'UNICODE_TEXT', 'STYLE_TEXT'"), O.push(a[l++]), r[l] !== 25) return O;
      l++;
    }
  }, d = (O) => O === 24 || O === 29 || O === 5 || O === 30, p = () => {
    let O = [];
    for (; ; ) {
      d(r[l]) || n("'STYLE_TEXT', 'COLON', 'NUM', 'BRKT'");
      let U = a[l++];
      for (; d(r[l]); ) U += a[l++];
      if (O.push(U), r[l] !== 25) return O;
      l++;
    }
  }, g = () => {
    let O = mc.get(r[l++]), U = r[l];
    U !== 43 && U !== 42 && n("'NON_IDENTIFYING', 'IDENTIFYING'");
    let q = U === 43 ? "IDENTIFYING" : "NON_IDENTIFYING";
    l++;
    let C = mc.get(r[l]);
    return C === void 0 ? n(nk) : (l++, { cardA: C, relType: q, cardB: O });
  }, y = () => {
    let O = r[l];
    O !== 44 && O !== 31 && O !== 23 && n("'UNICODE_TEXT', 'ENTITY_NAME', 'WORD'");
    let U = a[l++];
    return O === 23 ? U : U.slice(1, -1);
  }, b = (O) => r[l] === 45 && a[l] === O, x = () => {
    let O = [];
    do {
      let U = i(34);
      b("?") && (U += a[l++]), r[l] !== 34 && n(U.endsWith("?") ? "'ATTRIBUTE_WORD'" : "'ATTRIBUTE_WORD', '?'");
      let q = { type: U, name: a[l++] };
      if (r[l] === 35) {
        let C = [a[l++]];
        for (; b(","); ) l++, C.push(i(35));
        q.keys = C;
      }
      r[l] === 36 && (q.comment = a[l++].slice(1, -1)), O.push(q);
    } while (r[l] !== 8);
    return O.reverse();
  }, v = () => {
    if (r[l] !== 7) return;
    if (l++, r[l] === 8) {
      l++;
      return;
    }
    let O = x();
    return l++, O;
  }, $ = () => {
    let O = c(), U = r[l];
    if (U === 9) {
      l++;
      let ee = c();
      i(10);
      let ie;
      r[l] === 6 && (l++, ie = u());
      let G = v();
      return t.addEntity(O, ee), G && t.addAttributes(O, G), ie && t.setClass([O], ie), [O];
    }
    let q;
    if (U === 6 && (l++, q = u(), U = r[l]), mc.has(U)) {
      let ee = g(), ie = c(), G;
      r[l] === 6 && (l++, G = u()), i(5);
      let z = y();
      return t.addEntity(O), t.addEntity(ie), t.addRelationship(O, z, ie, ee), q && t.setClass([O], q), G && t.setClass([ie], G), [O, ie];
    }
    let C = v();
    return t.addEntity(O), C && t.addAttributes(O, C), q && t.setClass([O], q), [O];
  };
  i(2);
  let S = [{ id: "", title: "", list: [] }], R = S[0], D = !1;
  for (; ; ) {
    let O = r[l];
    switch (O) {
      case 4:
        l++;
        break;
      case 3:
        l++, D && n(`'END', ${pn}`);
        return;
      case 16: {
        D || n(pn), l++;
        let U = t.addSubGraph({ text: R.id }, R.list, { text: R.title });
        S.pop(), R = S[S.length - 1], D = S.length > 1, D && R.list.push(U);
        break;
      }
      case 17: {
        l++;
        let U = c(), q = U;
        if (r[l] === 9) {
          for (l++, q = c(); h(r[l]); ) q += " " + c();
          i(10);
        }
        o(), R = { id: U, title: q, list: [] }, S.push(R), D = !0;
        break;
      }
      case 11: {
        l++;
        let U = i(12).trim();
        t.setAccTitle(U), D && R.list.push(U);
        break;
      }
      case 13: {
        l++;
        let U = i(14).trim();
        t.setAccDescription(U), D && R.list.push(U);
        break;
      }
      case 15: {
        let U = a[l++].trim();
        t.setAccDescription(U), D && R.list.push(U);
        break;
      }
      case 18:
      case 19:
      case 20:
      case 21: {
        l++;
        let U = sk[O - 18];
        D ? R.list.push({ stmt: "dir", value: U }) : t.setDirection(U);
        break;
      }
      case 22: {
        let U = a[l++], q = u(), C = p();
        o(), t.addClass(q, C), D && R.list.push(U);
        break;
      }
      case 26: {
        let U = a[l++], q = u();
        t.setClass(q, u()), D && R.list.push(U);
        break;
      }
      case 27: {
        let U = a[l++], q = u(), C = p();
        o(), t.addCssStyles(q, C), D && R.list.push(U);
        break;
      }
      default: {
        h(O) || n(D ? `'END', ${pn}` : pn);
        let U = $();
        if (D) for (let q of U) R.list.push(q);
      }
    }
  }
}
var hk = [];
function ck(e) {
  let t = [], r = [], a = e.subgraphs, s = (o) => {
    let h = [];
    for (let c of o) {
      let u = e.classes.get(c);
      if (u !== void 0) {
        for (let d of u.styles) h.push(d.trim());
        for (let d of u.textStyles) h.push(d.trim());
      }
    }
    return h;
  }, l = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
  for (let o = a.length - 1; o >= 0; o--) {
    let h = a[o];
    n.add(h.id);
    for (let c of h.nodes) l.set(c, h.id);
  }
  for (let o = a.length - 1; o >= 0; o--) {
    let h = a[o];
    t.push({ id: h.id, label: h.title, alias: "", attributes: hk, isGroup: !0, parentId: l.get(h.id), cssStyles: h.cssStyles, cssCompiledStyles: s(h.classes), cssClasses: h.classes.join(" "), dir: h.dir, labelType: h.labelType });
  }
  let i = /* @__PURE__ */ new Map();
  for (let [o, h] of e.entities) {
    if (n.has(o)) {
      i.set(h.id, o);
      continue;
    }
    t.push({ id: h.id, label: h.label, alias: h.alias, attributes: h.attributes, isGroup: !1, parentId: l.get(o), cssStyles: h.cssStyles, cssCompiledStyles: s(h.cssClasses.split(" ")), cssClasses: h.cssClasses, dir: void 0, labelType: "markdown" });
  }
  return e.relationships.forEach((o, h) => {
    r.push({ id: `id_${o.entityA}_${o.entityB}_${h}`, start: i.get(o.entityA) ?? o.entityA, end: i.get(o.entityB) ?? o.entityB, label: o.roleA, arrowTypeStart: o.relSpec.cardB.toLowerCase(), arrowTypeEnd: o.relSpec.cardA.toLowerCase(), pattern: o.relSpec.relType === "IDENTIFYING" ? "solid" : "dashed" });
  }), { nodes: t, edges: r };
}
var na = 18, Xp = 5, Zp = 6, yc = 10, Qp = 3.5;
function vl(e, t, r, a, s) {
  let l = (c, u) => f(t - a * c - s * u) + "," + f(r - s * c + a * u), n = (c) => `M${l(c, -Xp)}L${l(c, Xp)}`, i = `M${l(0, -Zp)}L${l(yc, 0)}L${l(0, Zp)}`, o = (c) => `<circle class="pele-marker" cx="${f(t - a * c)}" cy="${f(r - s * c)}" r="${Qp}" fill="var(--_bg)"/>`, h = (c) => `<path class="pele-marker" d="${c}"/>`;
  switch (e) {
    case "only_one":
      return h(n(6) + n(10));
    case "zero_or_one":
      return h(n(6)) + o(13.5);
    case "one_or_more":
      return h(i + n(yc + 3.5));
    case "zero_or_more":
      return h(i) + o(yc + Qp + 0.5);
    case "md_parent":
      return `<path class="pele-marker" d="M${l(0, 0)}L${l(6, 4)}L${l(12, 0)}L${l(6, -4)}Z" fill="var(--_bg)"/>`;
  }
  return "";
}
var dk = 48, fk = 20, uk = 64, Ti = 20, Ci = 28, pk = 38, Jp = 96, e0 = 18, gk = 12, mk = 9, xc = 12, t0 = 16, wc = 9, yk = 260, $c = 1e6, xk = [], wk = 18, $k = 14, r0 = ' fill="var(--_s)" stroke="var(--_b)"';
function a0(e, t, r) {
  let a = e.er?.[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
function gn(e, t, r, a, s, l = 0) {
  let n = e.lines;
  if (n.length === 0) return "";
  let i = n.length === 1 && n[0].length === 1 ? n[0][0] : void 0;
  if (i && i.icon === void 0 && i.math === void 0 && i.style === l && !(l && i.text.includes("  "))) return `<text${sl(a, l)} x="${f(t)}" y="${f(r)}">${it(i.text)}</text>`;
  let o = Cs(e), h = e.size * 0.35, c = r - h - e.lineHeight / 2, u = "", d = "";
  for (let p = 0; p < n.length; p++) {
    let g = n[p], y = c + Rs(e, p);
    if (Kf(g)) {
      d += Pe(Ds(e, p), t + e.widths[p] / 2, y, a, s);
      continue;
    }
    r = y + h;
    let b = !1;
    for (let $ of g) $.icon !== void 0 && (b = !0);
    let x = t, v = !1;
    for (let $ of g) {
      if ($.icon !== void 0) {
        let S = e.size * 1.1;
        d += `<svg class="pele-icon" data-icon="${Ye($.icon)}" x="${f(x)}" y="${f(r - e.size * 0.35 - S / 2)}" width="${f(S)}" height="${f(S)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s?.($.icon) ?? ""}</svg>`;
      } else if ($.text !== "") {
        let S = b || !v ? ` x="${f(x)}" y="${f(r)}"` : "";
        u += `<tspan${S}${Jl($.style & ~o)}>${it($.text)}</tspan>`, v = !0;
      }
      x += $.width;
    }
  }
  return `<text${sl(a, o)} xml:space="preserve">${u}</text>${d}`;
}
function bc(e) {
  let t = us(e);
  return t === e ? e : t.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function bk(e, t, r) {
  return ul(e.direction) ? ur(r, (a) => l0(e, t, r, a)) : l0(e, t, r, !1);
}
function l0(e, t, r, a) {
  let s = ck(e), l = Array.isArray(r.monospace) && r.monospace.includes("attributes"), n = r.fontSize ?? 16, i = Math.round(n * 0.875), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = r.padding ?? 8, c = r.icons, u = /* @__PURE__ */ new Map(), d = [], p = [];
  s.nodes.forEach((k, w) => u.set(k.id, w));
  let g = [], y = [], b = [], x = /* @__PURE__ */ new Map(), v = [];
  for (let k of s.edges) {
    let w = u.get(k.start), B = u.get(k.end);
    if (w === void 0 || B === void 0) continue;
    let N = je(k.label, !0, o, i, 200), j;
    if (w === B) {
      j = { label: N, band: 0, at: 0 };
      let F = x.get(w);
      F ? F.push(j) : x.set(w, [j]);
    }
    v.push(j), b.push(k), y.push(N), g.push({ src: w, dst: B, minlen: 1, labelW: N.width > 0 ? N.width + 12 : 0, labelH: N.height > 0 ? N.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  let $ = (k) => {
    let w = k;
    for (let B = 0; B < s.nodes.length; B++) {
      let N = s.nodes[w].parentId, j = N === void 0 ? void 0 : u.get(N);
      if (j === void 0) break;
      let F = s.nodes[j].dir;
      if (F) return F === "LR" || F === "RL";
      w = j;
    }
    return e.direction === "LR" || e.direction === "RL";
  };
  for (let k = 0; k < s.nodes.length; k++) {
    let w = s.nodes[k], B = Dt(w.cssStyles.length > 0 ? w.cssCompiledStyles.concat(w.cssStyles) : w.cssCompiledStyles), N = (B.bold ? 1 : 0) | (B.italic ? 2 : 0), j = l && !/[";]font-family:/.test(B.text) ? 4 : 0, F = B.fontSize ?? n, Y = B.fontSize ?? i, W = B.fontSize ?? Math.round(n * 0.75), K = w.isGroup ? je(w.label, !0, o, F, 4e3, N) : je(w.alias || w.label, !0, o, F, 240, N), H = x.get(k) ?? xk, te = H.length > 0 && !w.isGroup && $(k), Q = { node: w, style: B, label: K, w: 0, h: 0, headH: 0, rows: [], cols: [], rowSize: Y, keySize: W, mono: j, below: te }, L = 0, X = 0;
    for (let V of H) V.band = Math.max(pk, te ? V.label.width + 12 : V.label.height + 6), X += V.band, L = Math.max(L, te ? V.label.height : V.label.width);
    let le = Math.max(Jp, te ? X + 8 : 0), J;
    if (w.isGroup) J = Wt(0, 0), J.isGroup = !0, J.dir = w.dir ? zr(w.dir) : void 0, J.padX = Ti, J.padTop = Q.label.height > 0 ? Q.label.height + 16 : Ti, J.padBottom = Ti, J.minW = Math.max(Q.label.width + 2 * Ti - 12, Jp);
    else {
      let V = Math.max(K.height, Math.round(F * 1.5));
      if (w.attributes.length === 0) Q.w = Math.max(K.width + 2 * e0, le), Q.h = Math.max(V + 2 * gk, te ? 0 : X + 8);
      else {
        let ae = Math.round(Y * 1.5), oe = [0, 0, 0, 0];
        for (let ne of w.attributes) {
          let ce = [je(bc(ne.type), !0, o, Y, $c, N | j), je(bc(ne.name), !0, o, Y, $c, N | j), je(ne.keys.join(", "), !1, o, W, $c, N | j), je(bc(ne.comment), !0, o, Y, yk, N)], pe = ae;
          for (let Me = 0; Me < 4; Me++) ce[Me].width > oe[Me] && (oe[Me] = ce[Me].width), ce[Me].height > pe && (pe = ce[Me].height);
          Q.rows.push({ cells: ce, h: pe + wc }), Q.h += pe + wc;
        }
        let ue = 0, he = 0;
        for (let ne of oe) ne !== 0 && (he += ne + (ue > 0 ? t0 : 0), ue++);
        Q.w = Math.max(he + 2 * xc, K.width + 2 * e0, le);
        let re = ue > 0 ? (Q.w - he - 2 * xc) / ue : 0, P = xc;
        for (let ne of oe) Q.cols.push(P), ne > 0 && (P += ne + re + t0);
        Q.headH = V + 2 * mk, Q.h += Q.headH;
      }
      let Z = H.length > 0 ? 2 * (na + Ci * 0.75 + 10 + L) : 0;
      J = te ? Wt(Q.w, Q.h + Z) : Wt(Q.w + Z, Q.h);
    }
    J.seq = d.length, d.push(Q), p.push(J);
  }
  s.nodes.forEach((k, w) => {
    p[w].parent = k.parentId !== void 0 ? u.get(k.parentId) ?? -1 : -1;
  });
  let S = cl(p, g, a ? "TB" : zr(e.direction), { nodeSep: a0(t, "nodeSpacing", dk), edgeSep: fk, rankSep: a0(t, "rankSpacing", uk), portSep: 24 });
  vk(g, p, d);
  let R = S.width;
  for (let [k, w] of x) {
    let B = p[k];
    if (!B.isGroup) continue;
    let N = 0;
    for (let j of w) N = Math.max(N, j.label.width);
    R = Math.max(R, B.x + B.w / 2 + na + Ci * 0.75 + 10 + N);
  }
  let D = ma(e.title, o, n, 4e3), O = D.height > 0 ? D.height + 12 : 0, U = Math.max(R, D.width), q = h + (U - R) / 2, C = h + O;
  _s(p, g, q, C);
  let ee = Math.ceil(U + 2 * h), ie = Math.ceil(S.height + O + 2 * h), G = [], z = /* @__PURE__ */ new Map(), _ = !1;
  for (let k of p) k.isGroup && (_ = !0);
  if (_) for (let k of g) ei(z, k.route);
  let T = "", E = [], M = "";
  for (let k = 0; k < d.length; k++) {
    let w = d[k], B = p[k], N = w.node, j = Ht(N.cssClasses.replace(/^default\s?/, ""));
    if (B.isGroup) {
      w.w = B.w, w.h = B.h;
      let V = B.x - B.w / 2, Z = B.y - B.h / 2, ae = lh(B, w.label.width, z, Ti);
      Ia(w.style.shape) && E.push({ box: [V, Z, V + B.w, Z + B.h], shape: w.style.shape }), T += `<g class="pele-cluster${j}" data-id="${Ye(N.id)}"><rect x="${f(V)}" y="${f(Z)}" width="${f(B.w)}" height="${f(B.h)}" fill="var(--_a)"${fl(w.style.shape) ? "" : ' fill-opacity="0.5"'} stroke="var(--_b)"${Et(w.style.shape)}/>` + Pe(w.label, ae, Z + 8 + w.label.height / 2, ` class="pele-cluster-label"${Xt(w.style, "var(--_m)")}${w.style.text}`, c) + "</g>";
      continue;
    }
    let F = w.w, Y = w.h, W = -F / 2, K = -Y / 2, H = w.style.text, te = Xt(w.style), Q = te || ' fill="var(--_m)"', L = `x="${f(W)}" y="${f(K)}" width="${f(F)}" height="${f(Y)}"`, X = Pe(w.label, 0, w.rows.length > 0 ? K + w.headH / 2 : 0, ` class="pele-label"${te}${H}`, c), le = Tt(N.alias || N.label);
    if (/ internal-link(?: |$)/.test(j + " ") && X !== "" && r.links !== !1) {
      let V = Pf(le, r), Z = it(le);
      X = `<a class="internal-link"${V ? ` href="${Z}"${Ss(r)}` : ""} data-href="${Z}">${X}</a>`, G.push({ id: N.label, href: le, internal: !0 });
    }
    let J;
    if (w.rows.length === 0) J = `<rect ${L}${Et(r0 + w.style.shape)}/>` + X;
    else {
      let V = Math.round(w.rowSize * 1.5), Z = w.style.stroke ? it(w.style.stroke) : "var(--_b)", ae = "", oe = "", ue = K + w.headH;
      for (let ne = 0; ne < w.rows.length; ne++) {
        let ce = w.rows[ne];
        if (ne % 2 === 0) {
          let Ee = `x="${f(W)}" width="${f(F)}"`;
          ne === w.rows.length - 1 ? ae += `<rect ${Ee} y="${f(ue)}" height="${f(ce.h)}"${wt}/><rect ${Ee} y="${f(ue)}" height="${f(ce.h / 2)}"/>` : ae += `<rect ${Ee} y="${f(ue)}" height="${f(ce.h)}"/>`;
        }
        let pe = ue + wc / 2 + V / 2 + w.rowSize * 0.35, [Me, xe, ve, Ae] = ce.cells;
        oe += gn(Me, W + w.cols[0], pe, ` class="pele-er-type"${Q}${H}`, c, w.mono) + gn(xe, W + w.cols[1], pe, ` class="pele-er-name"${te}${H}`, c, w.mono) + gn(ve, W + w.cols[2], pe, ` class="pele-er-keys" font-size="${w.keySize}"${Q}${H}`, c, w.mono) + gn(Ae, W + w.cols[3], pe, ` class="pele-er-comment"${Q}${H}`, c), ue += ce.h;
      }
      let he = f(K + w.headH), re = si(w.style.shape), P = re === Wd ? Bd : re === Bd ? Wd : "var(--_bg)";
      J = `<rect ${L}${Et(r0 + w.style.shape)}/><g class="pele-er-stripes" fill="${P}"${w.style.shape.includes("fill:") ? ' opacity="0.6"' : ""}>${ae}</g><path class="pele-er-divider" d="M${f(W)},${he}H${f(W + F)}" stroke="${Z}"/><rect ${L} fill="none" stroke="var(--_b)"${Et(w.style.line)}/>` + X + `<g class="pele-er-attributes" font-size="${w.rowSize}">${oe}</g>`;
    }
    M += `<g class="pele-node pele-entity${j}" data-id="${Ye(N.label)}" transform="translate(${f(B.x)},${f(B.y)})">${J}</g>`;
  }
  for (let [k, w] of x) {
    let B = d[k], N = 0;
    for (let Y of w) N += Y.band;
    let j = Math.min(1, Math.max((B.below ? B.w : B.h) - 8, 0) / N), F = -N * j / 2;
    for (let Y of w) Y.band *= j, Y.at = F + Y.band / 2, F += Y.band;
  }
  let A = "", m = "", I = "";
  for (let k = 0; k < g.length; k++) {
    let w = g[k], B = b[k], N = y[k], j, F, Y, W = v[k];
    if (W) {
      let Q = p[w.src], L = d[w.src], X = Math.max(Math.min(W.band / 2 - 6, 13), 1), le = na + Ci * 0.75 + 6;
      if (L.below) {
        let J = Q.x + W.at, V = Q.y + L.h / 2, Z = f(V + na), ae = f(V + na + Ci);
        j = `M${f(J - X)},${f(V)}V${Z}C${f(J - X)},${ae} ${f(J + X)},${ae} ${f(J + X)},${Z}V${f(V)}`, F = vl(B.arrowTypeStart, J - X, V, 0, -1), Y = vl(B.arrowTypeEnd, J + X, V, 0, -1), w.labelX = J, w.labelY = V + le + N.height / 2;
      } else {
        let J = Q.x + L.w / 2, V = Q.y + W.at, Z = f(J + na), ae = f(J + na + Ci);
        j = `M${f(J)},${f(V - X)}H${Z}C${ae},${f(V - X)} ${ae},${f(V + X)} ${Z},${f(V + X)}H${f(J)}`, F = vl(B.arrowTypeStart, J, V - X, -1, 0), Y = vl(B.arrowTypeEnd, J, V + X, -1, 0), w.labelX = J + le + N.width / 2, w.labelY = V;
      }
    } else {
      let Q = Mk(w.route);
      if (Q.length < 6) continue;
      i0(Q, 0, d[w.src], p[w.src]), i0(Q, Q.length - 3, d[w.dst], p[w.dst]);
      let L = Math.abs(Q[Q.length - 3] - Q[0]), X = Math.abs(Q[Q.length - 2] - Q[1]), le = Q.length === 6 && (L < 0.01 || X < 0.01 || Math.hypot(L, X) <= 3 * na) ? 0 : na, J = Na(Q, void 0, le, le);
      j = le > 0 ? `M${f(J.sx)},${f(J.sy)}L${J.d.slice(1)}L${f(J.ex)},${f(J.ey)}` : J.d, F = vl(B.arrowTypeStart, J.sx, J.sy, J.sdx, J.sdy), Y = vl(B.arrowTypeEnd, J.ex, J.ey, J.edx, J.edy);
    }
    let K = Hf(j, [], E), H = K && Uf(K);
    H === "" && (m += Yf(j, F + Y)), K && H && (F = tf(F, K), Y = tf(Y, K));
    let te = B.pattern === "dashed";
    if (A += `<g class="pele-edge pele-er-${te ? "non-identifying" : "identifying"}" data-id="${Ye(B.id)}"${H ? ` stroke="${H}"` : ""}><path d="${j}"${te ? ' stroke-dasharray="4 3"' : ""}/>` + F + Y + "</g>", N.width > 0) {
      let Q = w.labelX, L = w.labelY;
      I += ga(B.id, N, Q, L, "", c);
    }
  }
  return { svg: xt("er", ee, ie, n, r, e, Pe(D, ee / 2, h + D.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (T ? `<g class="pele-clusters">${T}</g>` : "") + dl(m) + (A ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${A}</g>` : "") + (I ? `<g class="pele-edge-labels" font-size="${i}">${I}</g>` : "") + `<g class="pele-nodes">${M}</g>`), width: ee, height: ie, links: G };
}
function Mk(e) {
  let t = e.slice(0, 3);
  for (let r = 3; r < e.length; r += 3) {
    let a = t.length - 3, s = (l) => Math.abs(t[a + l] - e[r + l]) < 0.01 && Math.abs(e[r + l] - e[r + 3 + l]) < 0.01;
    r + 3 < e.length && (s(0) || s(1)) || t.push(e[r], e[r + 1], e[r + 2]);
  }
  return t;
}
function vk(e, t, r) {
  let a = /* @__PURE__ */ new Map(), s = (l, n, i, o) => {
    let h = t[l], c = n[i] - h.x, u = n[i + 1] - h.y, d;
    if (Math.abs(Math.abs(u) - h.h / 2) < 0.5) d = u < 0 ? 0 : 2;
    else if (Math.abs(Math.abs(c) - h.w / 2) < 0.5) d = c < 0 ? 3 : 1;
    else return;
    let p = l * 4 + d, g = { route: n, at: i, toward: n[o + (d & 1 ? 1 : 0)] }, y = a.get(p);
    y ? y.push(g) : a.set(p, [g]);
  };
  for (let l of e) {
    let n = l.route.length - 3;
    l.src === l.dst || n < 3 || (s(l.src, l.route, 0, 3), s(l.dst, l.route, n, n - 3));
  }
  for (let [l, n] of a) {
    if (n.length < 2) continue;
    let i = l >> 2, o = (l & 1) === 1, h = t[i].isGroup ? t[i] : r[i], c = o ? h.h : h.w, u = Math.max(Math.min(wk, (c - 2 * $k) / (n.length - 1)), 0), d = o ? t[i].y : t[i].x;
    n.sort((p, g) => p.toward - g.toward);
    for (let p = 0; p < n.length; p++) n[p].route[n[p].at + (o ? 1 : 0)] = d + (p - (n.length - 1) / 2) * u;
  }
}
function i0(e, t, r, a) {
  if (a.isGroup) return;
  let s = e[t] - a.x, l = e[t + 1] - a.y;
  a.w !== r.w && Math.abs(Math.abs(s) - a.w / 2) < 0.5 && (e[t] -= Math.sign(s) * (a.w - r.w) / 2), a.h !== r.h && Math.abs(Math.abs(l) - a.h / 2) < 0.5 && (e[t + 1] -= Math.sign(l) * (a.h - r.h) / 2);
}
var kk = { type: "er", math: !0, parse(e, t, r) {
  let a = new ek();
  return r && (a.title = r), ok(e, a), a;
}, render: bk }, Ak = /* @__PURE__ */ new Map([["ui", "ui"], ["pcr", "processor"], ["processor", "processor"], ["rmo", "readmodel"], ["readmodel", "readmodel"], ["cmd", "command"], ["command", "command"], ["evt", "event"], ["event", "event"]]), Ek = /* @__PURE__ */ new Map([["trigger", [0, "UI/Automation", "UI/A: "]], ["state", [100, "Command/Read Model", "C/RM: "]], ["stream", [200, "Events", "Stream: "]]]);
function Tk(e) {
  return e === "ui" || e === "processor" ? "trigger" : e === "event" ? "stream" : "state";
}
function Mc(e) {
  let t = e.indexOf("{"), r = e.lastIndexOf("}"), a = (t !== -1 && r > t ? e.slice(t + 1, r) : t === -1 && e.length >= 2 ? e.slice(1, -1) : "").replace(/\r/g, "").split(`
`);
  for (; a.length > 0 && a[0].trim() === ""; ) a.shift();
  for (; a.length > 0 && a[a.length - 1].trim() === ""; ) a.pop();
  let s = 1 / 0;
  for (let l of a) l.trim() !== "" && (s = Math.min(s, l.length - l.trimStart().length));
  return a.map((l) => l.slice(Math.min(s, l.length)).trimEnd()).join(`
`);
}
function Ck(e, t) {
  let r = /* @__PURE__ */ new Set();
  for (let u of e.frames) {
    if (r.has(u.name)) {
      let d = ii(e.$source, u.$offset).line;
      throw new at(`Duplicate event modeling frame ID "${u.name}" on line ${d}`, "semantic", { type: "eventmodeling", line: d });
    }
    r.add(u.name);
  }
  let a = /* @__PURE__ */ new Map();
  for (let u of e.dataEntities) a.has(u.name) || a.set(u.name, u.dataBlockValue);
  let s = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), n = (u, d) => {
    let p = Tk(u), g = d === void 0 ? p : `${p} ${d}`, y = s.get(g);
    if (!y) {
      let [b, x, v] = Ek.get(p), $ = b;
      d !== void 0 && ($ = l.get(p) ?? b + 1, l.set(p, $ + 1)), y = { index: $, label: d === void 0 ? x : v + d, group: p, namespace: d }, s.set(g, y);
    }
    return y;
  }, i = [], o = /* @__PURE__ */ new Map(), h = [];
  e.frames.forEach((u, d) => {
    let p = u.entityIdentifier.split("."), g = p.length === 2 ? p[0] : void 0, y = Ak.get(u.modelEntityType) ?? "event", b = u.dataInlineValue === void 0 ? void 0 : Mc(u.dataInlineValue);
    if (u.dataReference) {
      let v = a.get(u.dataReference.$refText);
      v !== void 0 && (b = Mc(v));
    }
    let x = { id: u.name, kind: y, entity: u.entityIdentifier, name: p.length === 2 ? p[1] : u.entityIdentifier, namespace: g, reset: u.$type === "EmResetFrame", lane: n(y, g), data: b, dataType: u.dataType };
    if (i.push(x), o.set(x.id, x), u.sourceFrames.length > 0) {
      let v = new Set(u.sourceFrames.map(($) => $.$refText));
      for (let $ of i) v.has($.id) && h.push({ source: $, target: x });
    } else if (d > 0 && !x.reset) {
      for (let v = d - 1; v >= 0; v--) if (i[v].lane !== x.lane) {
        h.push({ source: i[v], target: x });
        break;
      }
    }
  });
  let c = (u) => u.map((d) => d.entityIdentifier.$refText);
  return { type: "eventmodeling", title: e.title && Er(e.title) || t, accTitle: e.accTitle ? Tr(e.accTitle).replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? Cr(e.accDescr).replace(/\n\s+/g, `
`) : void 0, boxes: i, lanes: [...s.values()].sort((u, d) => u.index - d.index), relations: h, notes: e.noteEntities.map((u) => ({ frame: u.sourceFrame.$refText, text: Mc(u.dataBlockValue), dataType: u.dataType })), specifications: e.gwtEntities.map((u) => ({ frame: u.sourceFrame.$refText, given: c(u.givenStatements), when: c(u.whenStatements), then: c(u.thenStatements) })), entities: e.modelEntities.map((u) => u.name) };
}
var vc = /[\t ]*accDescr(?:[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)|\s*({))/y;
function Sk() {
  let e = !1;
  return (t, r) => {
    vc.lastIndex = r;
    let a = vc.exec(t);
    if (a === null) return -1;
    let s = vc.lastIndex;
    if (a[1] === void 0) return s;
    if (e) return -1;
    let l = t.indexOf("}", s);
    return e = l === -1, l + 1 || -1;
  };
}
function eu(e = "ACC_DESCR") {
  return { ...aa, name: e, scanner: Sk };
}
var uf = { name: "EM_ID", pattern: /[_a-zA-Z][\w_]*/y }, kl = (e) => ({ name: e, pattern: e, longer: [uf] }), Si = (e) => ({ name: e, pattern: e }), _k = ["resetframe", "readmodel", "processor", "timeframe", "command", "entity", "event", "jsobj", "figma", "given", "json", "salt", "html", "text", "data", "note", "when", "then", "rmo", "cmd", "evt", "pcr", "uri"], pf = [{ ...Pr("eventmodeling"), longer: [uf] }, ..._k.map(kl), Si("->>"), kl("gwt"), kl("ui"), kl("md"), kl("tf"), Si("[["), Si("]]"), kl("rf"), Si("`"), Si("."), uf, { name: "EM_FID", pattern: /\d{1,3}/y }, { name: "EM_DATA_INLINE", pattern: /\{(.*)\}|"(.*)"|'(.*)'/y }, { name: "EM_DATA_BLOCK", pattern: /\{[\t ]*\r?\n(?:[\S\s]*?\r?\n)?\}(?:\r?\n|(?!\S))/y }, eu("EM_ACC_DESCR"), { ...Br, name: "EM_ACC_TITLE" }, { ...fi(String.raw`\w`), name: "EM_TITLE" }, { name: "EM_WS", pattern: /\s+/y, hidden: !0 }, { ...fr, name: "EM_YAML" }, { ...la, name: "EM_DIRECTIVE" }, { ...ia, name: "EM_SINGLE_LINE_COMMENT" }, { name: "EM_ML_COMMENT", pattern: /\/\*[\s\S]*?\*\//y, hidden: !0 }, { name: "EM_SL_COMMENT", pattern: /\/\/[^\n\r]*/y, hidden: !0 }], Ft = (e) => pf.findIndex((t) => t.name === e), ch = (e) => new Set(e.map(Ft)), At = { keyword: 0, arrow: Ft("->>"), open: Ft("[["), close: Ft("]]"), tick: Ft("`"), dot: Ft("."), id: Ft("EM_ID"), frameId: Ft("EM_FID"), inline: Ft("EM_DATA_INLINE"), block: Ft("EM_DATA_BLOCK"), accDescr: Ft("EM_ACC_DESCR"), accTitle: Ft("EM_ACC_TITLE"), title: Ft("EM_TITLE"), entity: Ft("entity"), data: Ft("data"), note: Ft("note"), gwt: Ft("gwt"), given: Ft("given"), when: Ft("when"), then: Ft("then") }, s0 = ch(["tf", "timeframe"]), Ik = ch(["rf", "resetframe"]), kc = ch(["rmo", "readmodel", "ui", "cmd", "command", "evt", "event", "pcr", "processor"]), Nk = ch(["json", "jsobj", "figma", "salt", "uri", "md", "html", "text"]);
function Rk(e) {
  let t = new Sr(Ar(e, pf, "eventmodeling"), pf, "eventmodeling"), r = { $type: "EventModel", modelEntities: [], frames: [], dataEntities: [], noteEntities: [], gwtEntities: [], $source: e }, a = (o) => t.kinds[t.i] === o, s = (o, h) => o.has(t.kinds[t.i]) ? t.take() : t.fail(h), l = () => {
    let o = t.expect(At.id);
    for (; t.accept(At.dot); ) o += "." + t.expect(At.id);
    return o;
  }, n = () => {
    if (!t.accept(At.tick)) return;
    let o = s(Nk, "a data type");
    return t.expect(At.tick), o;
  }, i = () => {
    let o = [];
    do
      s(kc, "an entity type"), o.push({ $type: "EmGwtStatement", entityIdentifier: { $refText: t.expect(At.id) } });
    while (kc.has(t.kinds[t.i]));
    return o;
  };
  for (t.expect(At.keyword); !a(-1); ) {
    let o = t.kinds[t.i];
    if (o === At.accDescr) r.accDescr = t.take();
    else if (o === At.accTitle) r.accTitle = t.take();
    else if (o === At.title) r.title = t.take();
    else if (o === At.entity) t.i++, r.modelEntities.push({ $type: "EmModelEntity", name: l() });
    else if (s0.has(o) || Ik.has(o)) {
      let h = { $type: s0.has(o) ? "EmTimeFrame" : "EmResetFrame", name: "", modelEntityType: "", entityIdentifier: "", sourceFrames: [], $offset: t.tokens.starts[t.i] };
      for (t.i++, h.name = t.expect(At.frameId), h.modelEntityType = s(kc, "an entity type"), h.entityIdentifier = l(); t.accept(At.arrow); ) h.sourceFrames.push({ $refText: t.expect(At.frameId) });
      if (t.accept(At.open) && (h.dataReference = { $refText: t.expect(At.id) }, t.expect(At.close)), a(At.tick) || a(At.inline)) {
        let c = n();
        c !== void 0 && (h.dataType = c), h.dataInlineValue = t.expect(At.inline);
      }
      r.frames.push(h);
    } else if (o === At.data) {
      t.i++;
      let h = { $type: "EmDataEntity", name: t.expect(At.id), dataBlockValue: "" }, c = n();
      c !== void 0 && (h.dataType = c), h.dataBlockValue = t.expect(At.block), r.dataEntities.push(h);
    } else if (o === At.note) {
      t.i++;
      let h = { $type: "EmNoteEntity", sourceFrame: { $refText: t.expect(At.frameId) }, dataBlockValue: "" }, c = n();
      c !== void 0 && (h.dataType = c), h.dataBlockValue = t.expect(At.block), r.noteEntities.push(h);
    } else if (o === At.gwt) {
      t.i++;
      let h = { $type: "EmGwt", sourceFrame: { $refText: t.expect(At.frameId) }, givenStatements: [], whenStatements: [], thenStatements: [] };
      t.expect(At.given), h.givenStatements = i(), t.accept(At.when) && (h.whenStatements = i()), t.expect(At.then), h.thenStatements = i(), r.gwtEntities.push(h);
    } else t.fail("a frame, an entity, a data block, a note, or a specification");
  }
  return r;
}
var mm = /* @__PURE__ */ new Map([["command", 0], ["event", 1], ["readmodel", 2], ["processor", 6]]), qt = 12, yr = 10, Dk = 96, n0 = 16, Lk = 80, mn = 12, o0 = 8, Ok = 48, h0 = 80, ym = 8;
function Ac(e, t) {
  let r = [];
  for (let a of Tt(e).split(`
`)) {
    let s = a.length <= t ? void 0 : Array.from(a);
    if (s === void 0 || s.length <= t) {
      r.push(a);
      continue;
    }
    for (let l = 0; l < s.length; l += t) r.push(s.slice(l, l + t).join(""));
  }
  return r;
}
function zo(e, t, r, a, s) {
  let l = "";
  for (let n = 0; n < e.length; n++) e[n] !== "" && (l += `<tspan x="${f(t)}" y="${f(r + n * a)}">${it(e[n])}</tspan>`);
  return l === "" ? "" : `<text${s} xml:space="preserve">${l}</text>`;
}
function Fk(e, t, r) {
  return ur(r, (a) => zk(e, t, r, a));
}
function zk(e, t, r, a) {
  if (a) return Bk(e, r);
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = Math.round(s * 0.8125), i = Math.round(s * 0.75), o = Math.round(i * 1.4), h = Math.round(n * 1.5), c = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), u = r.padding ?? 8, d = (k, w, B) => {
    let N = 0;
    for (let j of k) N = Math.max(N, c.width(j, w, B));
    return N;
  }, p = /* @__PURE__ */ new Map(), g = 0;
  for (let k of e.lanes) {
    let w = je(k.label, !1, c, n, 4e3, 1);
    g = Math.max(g, w.width), p.set(k, { lane: k, label: w, right: -1 / 0, y: 0, h: 0 });
  }
  g += 2 * mn;
  let y = [], b = /* @__PURE__ */ new Map(), x;
  for (let k of e.boxes) {
    let w = p.get(k.lane), B = je(k.name, !1, c, l, 4e3, 1), N = k.data ? Ac(k.data, Ok) : [], j = Math.max(Dk, Math.max(B.width, d(N, i, 4)) + 2 * qt), F = 2 * yr + B.height + (N.length > 0 ? 6 + N.length * o : 0), Y = 0;
    if (x) {
      let K = x.x + Math.max(x.w / 2, x.w - Lk);
      Y = x.box.lane === k.lane ? w.right + n0 : Math.max(K, w.right + n0);
    }
    let W = { box: k, name: B, data: N, x: Y, y: 0, w: j, h: F };
    w.right = Y + j, w.h = Math.max(w.h, F), y.push(W), b.set(k, W), x = W;
  }
  let v = 0;
  for (let k of y) v = Math.max(v, k.x + k.w);
  let $ = g + v + mn, S = je(e.title, !1, c, s, 4e3, 1), R = S.height > 0 ? S.height + 12 : 0, D = u, O = u + R, U = O, q = "";
  for (let k of p.values()) k.y = U, k.h += 2 * mn, q += `<g class="pele-cluster pele-em-lane" data-id="${Ye(k.lane.label)}"><rect x="${f(D)}" y="${f(U)}" width="${f($)}" height="${f(k.h)}" fill="var(--_s)"${wt}/>` + Pe(k.label, D + mn + k.label.width / 2, U + k.h / 2, ` class="pele-cluster-label" font-size="${n}" font-weight="var(--_hw)" fill="var(--_m)"`) + "</g>", U += k.h + o0;
  let C = p.size > 0 ? U - o0 : O, ee = "";
  for (let k of y) {
    let w = p.get(k.box.lane);
    k.x += D + g, k.y = w.y + (w.h - k.h) / 2;
    let B = mm.get(k.box.kind), N = `x="${f(k.x)}" y="${f(k.y)}" width="${f(k.w)}" height="${f(k.h)}"`, j = B === void 0 ? `<rect ${N} fill="var(--_bg)" stroke="var(--_b)"${wt}/>` : `<rect ${N} fill="var(--_bg)"${wt}/><rect ${N} fill="${vt(B)}" fill-opacity="0.22" stroke="${vt(B)}"${wt}/>`, F = k.y + yr + k.name.height / 2, Y = Pe(k.name, k.x + k.w / 2, F, ` class="pele-label" font-size="${l}" font-weight="var(--_hw)"`) + zo(k.data, k.x + qt, k.y + yr + k.name.height + 6 + o / 2 + i * 0.35, o, ` class="pele-em-data" font-family="${hi}" font-size="${i}"`);
    ee += `<g class="pele-node pele-em-${k.box.kind}${k.box.reset ? " pele-em-reset" : ""}" data-id="${Ye(k.box.id)}">${j}${Y}</g>`;
  }
  let ie = "", G = Ct("arrow_point");
  for (let k of e.relations) {
    let w = b.get(k.source), B = b.get(k.target);
    if (!w || !B || w === B) continue;
    let N, j;
    if (w.box.lane === B.box.lane) {
      let F = B.x >= w.x, Y = F ? w.x + w.w : w.x, W = F ? B.x : B.x + B.w, K = w.y + w.h / 2, H = B.y + B.h / 2, te = W >= Y ? 1 : -1;
      N = `M${f(Y)},${f(K)}L${f(W - te * G)},${f(H)}`, j = St("arrow_point", W, H, te, 0, "var(--_l)");
    } else {
      let F = B.y > w.y, Y = Math.max(w.x, B.x), W = Math.min(w.x + w.w, B.x + B.w), K = (V) => Math.min(24, V / 4), H = W - Y >= 16 ? (Y + W) / 2 : B.x > w.x ? w.x + w.w - K(w.w) : w.x + K(w.w), te = W - Y >= 16 ? H : B.x > w.x ? B.x + K(B.w) : B.x + B.w - K(B.w), Q = F ? w.y + w.h : w.y, L = F ? B.y : B.y + B.h, X = F ? 1 : -1, le = L - X * G, J = (Q + le) / 2;
      N = H === te ? `M${f(H)},${f(Q)}V${f(le)}` : `M${f(H)},${f(Q)}C${f(H)},${f(J)} ${f(te)},${f(J)} ${f(te)},${f(le)}`, j = St("arrow_point", te, L, 0, X, "var(--_l)");
    }
    ie += `<g class="pele-edge" data-id="${Ye(k.source.id)}-${Ye(k.target.id)}"><path d="${N}" fill="none" stroke="var(--_l)"/>${j}</g>`;
  }
  let z = /* @__PURE__ */ new Map();
  for (let k of e.boxes) z.set(k.id, k.name);
  let _ = "", T = 0, E = (k, w, B, N) => {
    let j = je(`${w} · ${B}${z.has(B) ? " " + z.get(B) : ""}`, !1, c, n, 4e3, 1), F = Math.max(j.width, d(N, n, 0)) + 2 * qt, Y = 2 * yr + j.height + N.length * h, W = C + (_ === "" && p.size === 0 ? 0 : ym);
    _ += `<g class="pele-em-${k}" data-id="${Ye(B)}"><rect x="${f(D)}" y="${f(W)}" width="${f(F)}" height="${f(Y)}" fill="var(--_bg)" stroke="var(--_b)"${wt}/>` + Pe(j, D + qt + j.width / 2, W + yr + j.height / 2, ` font-size="${n}" font-weight="var(--_hw)"`) + zo(N, D + qt, W + yr + j.height + h / 2 + n * 0.35, h, ` font-size="${n}"`) + "</g>", C = W + Y, T = Math.max(T, F);
  };
  for (let k of e.notes) E("note", "Note", k.frame, Ac(k.text, h0));
  for (let k of e.specifications) {
    let w = [`Given  ${k.given.join(", ")}`];
    k.when.length > 0 && w.push(`When  ${k.when.join(", ")}`), w.push(`Then  ${k.then.join(", ")}`), E("specification", "Given / When / Then", k.frame, w.flatMap((B) => Ac(B, h0)));
  }
  let M = Math.max(p.size > 0 ? $ : 0, T, S.width), A = Math.ceil(M + 2 * u), m = Math.ceil(C + u), I = Pe(S, A / 2, u + S.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + q + ie + ee + _;
  return { svg: xt("eventmodeling", A, m, s, r, e, I), width: A, height: m, links: [] };
}
var c0 = 8, Pk = 120, Wk = 20;
function Bk(e, t) {
  let r = t.fontSize ?? 16, a = Math.round(r * 0.875), s = Math.round(r * 0.75), l = t.padding ?? 8, n = t.measurer ?? $t(t.fontFamily, t.fontFamilyMono), i = Math.max(160, (t.maxWidth ?? 320) - 2 * l), o = new Map(e.boxes.map((z, _) => [z, _])), h = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
  for (let z of e.relations) {
    let _ = o.get(z.source), T = o.get(z.target);
    if (_ === void 0 || T === void 0 || _ === T) continue;
    if (Math.abs(_ - T) < 2) {
      c.add(e.boxes[Math.max(_, T)]);
      continue;
    }
    let E = h.get(z.target);
    E ? (E[0] = Math.min(E[0], _), E[1] = Math.max(E[1], _)) : h.set(z.target, [Math.min(_, T), Math.max(_, T)]);
  }
  let u = /* @__PURE__ */ new Map(), d = [];
  for (let [z, [_, T]] of [...h].sort((E, M) => E[1][0] - M[1][0])) {
    let E = d.findIndex((M) => M < _);
    E < 0 && (E = d.length), d[E] = T, u.set(z, E);
  }
  let p = 24 + c0 * Math.max(0, d.length - 1), g = Math.max(Pk, i - p), y = g - 2 * qt, b = je(e.title, !1, n, r, i, 1), x = l + (b.height ? b.height + 12 : 0), v = l + b.height, $ = Math.max(b.width, g + p), S = "", R = "", D = "", O = /* @__PURE__ */ new Map(), U = (z, _, T = 0) => No(Tt(z), n, _, y, T);
  e.boxes.forEach((z, _) => {
    let T = c.has(z) ? y - Wk : y, E = Ro(je(z.lane.label, !1, n, a, T, 1), n, T), M = je(z.name, !1, n, a, y - 36, 1), A = z.data ? U(z.data, s, 4) : void 0, m = Math.max(g, E.width + 2 * qt, M.width + 2 * qt + 36, (A?.width ?? 0) + 2 * qt), I = E.height + 12, k = 2 * yr + M.height + (A ? A.height + 6 : 0), w = mm.get(z.kind), B = x + I, N = `x="${f(l)}" y="${f(B)}" width="${f(m)}" height="${f(k)}"`;
    S += `<g class="pele-cluster pele-em-lane" data-id="${Ye(z.lane.label)}">` + Kl(E, l + qt, x, ` class="pele-cluster-label" font-size="${a}" font-weight="var(--_hw)" fill="var(--_m)"`) + `<g class="pele-node pele-em-${z.kind}${z.reset ? " pele-em-reset" : ""}" data-id="${Ye(z.id)}"><rect ${N} fill="var(--_bg)" stroke="var(--_b)"${wt}/>` + (w === void 0 ? "" : `<rect ${N} fill="${vt(w)}" fill-opacity="0.22" stroke="${vt(w)}"${wt}/>`) + Pe(M, l + qt + M.width / 2, B + yr + M.height / 2, ` class="pele-label" font-size="${a}" font-weight="var(--_hw)"`) + `<text class="pele-em-frame" x="${f(l + m - qt)}" y="${f(B + yr + a)}" text-anchor="end" font-size="${s}" fill="var(--_m)">${it(z.id)}</text>` + (A ? zo(A.lines.map((j) => j.map((F) => F.text).join("")), l + qt, B + yr + M.height + 6 + A.lineHeight / 2 + s * 0.35, A.lineHeight, ` class="pele-em-data" font-family="${hi}" font-size="${s}"`) : "") + "</g></g>", O.set(z, { y: B, h: k, w: m, index: _, lane: E.width }), $ = Math.max($, m + p), v = B + k, x = v + 28;
  });
  for (let z of e.relations) {
    let _ = O.get(z.source), T = O.get(z.target);
    if (!_ || !T || _ === T) continue;
    let E = T.y > _.y, M = E ? 1 : -1, A = E ? _.y + _.h : _.y, m = E ? T.y : T.y + T.h, I, k;
    if (Math.abs(_.index - T.index) === 1) {
      let w = l + Math.max(Math.min(_.w, T.w) / 2, qt + (E ? T : _).lane + 16);
      I = `M${f(w)},${f(A)}V${f(m - M * Ct("arrow_point"))}`, k = St("arrow_point", w, m, 0, M, "var(--_l)");
    } else {
      let w = l + $ - p + 12 + c0 * (u.get(z.target) ?? 0), B = _.y + _.h / 2 - 5, N = T.y + T.h / 2 + 5;
      I = `M${f(l + _.w)},${f(B)}H${f(w)}V${f(N)}H${f(l + T.w + Ct("arrow_point"))}`, k = St("arrow_point", l + T.w, N, -1, 0, "var(--_l)");
    }
    R += `<g class="pele-edge" data-id="${Ye(z.source.id)}-${Ye(z.target.id)}"><path d="${I}" fill="none" stroke="var(--_l)"/>${k}</g>`;
  }
  let q = new Map(e.boxes.map((z) => [z.id, z.name])), C = (z, _, T, E) => {
    let M = je(`${_} · ${T}${q.has(T) ? " " + q.get(T) : ""}`, !1, n, a, y, 1), A = U(E, a), m = Math.max(g, M.width + 2 * qt, A.width + 2 * qt), I = 2 * yr + M.height + A.height;
    D += `<g class="pele-em-${z}" data-id="${Ye(T)}"><rect x="${f(l)}" y="${f(x)}" width="${f(m)}" height="${f(I)}" fill="var(--_bg)" stroke="var(--_b)"${wt}/>` + Pe(M, l + qt + M.width / 2, x + yr + M.height / 2, ` font-size="${a}" font-weight="var(--_hw)"`) + zo(A.lines.map((k) => k.map((w) => w.text).join("")), l + qt, x + yr + M.height + A.lineHeight / 2 + a * 0.35, A.lineHeight, ` font-size="${a}"`) + "</g>", v = x + I, x = v + ym, $ = Math.max($, m);
  };
  for (let z of e.notes) C("note", "Note", z.frame, z.text);
  for (let z of e.specifications) {
    let _ = [`Given  ${z.given.join(", ")}`];
    z.when.length && _.push(`When  ${z.when.join(", ")}`), _.push(`Then  ${z.then.join(", ")}`), C("specification", "Given / When / Then", z.frame, _.join(`
`));
  }
  let ee = Math.ceil($ + 2 * l), ie = Math.ceil(v + l), G = Pe(b, ee / 2, l + b.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + R + S + D;
  return { svg: xt("eventmodeling", ee, ie, r, t, e, G), width: ee, height: ie, links: [] };
}
var Gk = { type: "eventmodeling", keepComments: !0, parse: (e, t, r) => Ck(Rk(e), r), render: Fk };
function Ec(e) {
  return e === "markdown" || e === "string" || e === "text" ? e : "markdown";
}
function d0(e) {
  return e.startsWith('"') && e.endsWith('"') ? e.substring(1, e.length - 1) : e;
}
function Hk(e, t) {
  let r = 0;
  for (let a = 0; a < t.length; a++) t[a] === e && r++;
  return r;
}
function Uk(e) {
  let t = e.trim(), r = "arrow_open";
  switch (t[0]) {
    case "<":
      r = "arrow_point", t = t.slice(1);
      break;
    case "x":
      r = "arrow_cross", t = t.slice(1);
      break;
    case "o":
      r = "arrow_circle", t = t.slice(1);
      break;
  }
  let a = "normal";
  return t.includes("=") && (a = "thick"), t.includes(".") && (a = "dotted"), { type: r, stroke: a };
}
function Yk(e) {
  let t = e.trim(), r = t.slice(0, -1), a = "arrow_open";
  switch (t.slice(-1)) {
    case "x":
      a = "arrow_cross", t.startsWith("x") && (a = "double_" + a, r = r.slice(1));
      break;
    case ">":
      a = "arrow_point", t.startsWith("<") && (a = "double_" + a, r = r.slice(1));
      break;
    case "o":
      a = "arrow_circle", t.startsWith("o") && (a = "double_" + a, r = r.slice(1));
      break;
  }
  let s = "normal", l = r.length - 1;
  r.startsWith("=") && (s = "thick"), r.startsWith("~") && (s = "invisible");
  let n = Hk(".", r);
  return n && (s = "dotted", l = n), { type: a, stroke: s, length: l };
}
var jk = class {
  type = "flowchart";
  direction;
  nodes = /* @__PURE__ */ new Map();
  edges = [];
  subgraphs = [];
  classes = /* @__PURE__ */ new Map();
  tooltips = /* @__PURE__ */ new Map();
  defaultEdgeStyle;
  defaultInterpolate;
  title;
  accTitle;
  accDescr;
  subgraphLookup = /* @__PURE__ */ new Map();
  members = /* @__PURE__ */ new Set();
  edgeById = /* @__PURE__ */ new Map();
  pairCount = /* @__PURE__ */ new Map();
  subCount = 0;
  options;
  constructor(e = {}) {
    this.options = e;
  }
  addVertex(e, t, r, a, s, l, n, i) {
    if (!e || e.trim().length === 0) return;
    let o;
    if (i !== void 0) {
      let p = i.includes(`
`) ? i + `
` : `{
` + i + `
}`, g;
      try {
        g = Zl(p);
      } catch (y) {
        throw new at(`Metadata of "${e}" is not valid YAML. ${y.message}`, "syntax", { type: "flowchart" });
      }
      o = g !== null && typeof g == "object" && !Array.isArray(g) ? g : void 0;
    }
    let h = this.subgraphLookup.get(e);
    if (h && o) {
      h.metadata = { ...h.metadata, ...o };
      return;
    }
    let c = this.edgeById.get(e);
    if (c) {
      o?.animate !== void 0 && (c.animate = o.animate), o?.animation !== void 0 && (c.animation = o.animation), o?.curve !== void 0 && (c.interpolate = o.curve);
      return;
    }
    let u = this.nodes.get(e);
    if (u === void 0 && (t === void 0 && r === void 0 && a !== void 0 && a !== null && this.options.warn?.(`Style applied to unknown node "${e}". This may indicate a typo. The node will be created automatically.`), u = { id: e, labelType: "text", styles: [], classes: [] }, this.nodes.set(e, u)), t !== void 0 ? (u.labelType = t.type, u.text = d0(t.text.trim())) : u.text === void 0 && (u.text = e), r !== void 0 && (u.type = r), a != null) for (let p of a) u.styles.push(p);
    if (s != null) for (let p of s) u.classes.push(p);
    if (l !== void 0 && (u.dir = l), u.props === void 0 ? u.props = n ?? {} : n !== void 0 && Object.assign(u.props, n), o === void 0) return;
    if (o.shape) {
      let p = String(o.shape);
      if (p !== p.toLowerCase() || p.includes("_")) throw new at(`No such shape: ${p}. Shape names should be lowercase.`, "semantic", { type: "flowchart" });
      if (!z2(p)) throw new at(`No such shape: ${p}.`, "semantic", { type: "flowchart" });
      u.type = p;
    }
    let d = typeof o.label == "string" ? o.label : void 0;
    o.label && (u.text = String(o.label), u.labelType = Ec(o.labelType)), o.icon && (u.icon = String(o.icon), !d?.trim() && u.text === e && (u.text = "")), o.form && (u.form = String(o.form)), o.pos && (u.pos = String(o.pos)), o.img && (u.img = String(o.img), !d?.trim() && u.text === e && (u.text = "")), o.constraint && (u.constraint = String(o.constraint)), o.w && (u.assetWidth = Number(o.w)), o.h && (u.assetHeight = Number(o.h));
  }
  addSingleLink(e, t, r, a) {
    let s = { start: e, end: t, type: void 0, text: "", labelType: "text", classes: [], isUserDefinedId: !1, interpolate: this.defaultInterpolate }, l = r?.text;
    l !== void 0 && (s.text = d0(l.text.trim()), s.labelType = Ec(l.type)), r !== void 0 && (s.type = r.type, s.stroke = r.stroke, s.length = r.length > 10 ? 10 : r.length);
    let n = e + "\0" + t, i = this.pairCount.get(n) ?? 0;
    a && !this.edgeById.has(a) ? (s.id = a, s.isUserDefinedId = !0) : s.id = `L_${e}_${t}_${i === 0 ? 0 : i + 1}`;
    let o = this.options.maxEdges;
    if (o !== void 0 && this.edges.length >= o) throw new at(`Edge limit exceeded. The limit is ${o}.`, "limit", { type: "flowchart" });
    this.edges.push(s), this.pairCount.set(n, i + 1), this.edgeById.has(s.id) || this.edgeById.set(s.id, s);
  }
  addLink(e, t, r) {
    let a = typeof r?.id == "string" ? r.id.replace("@", "") : void 0, s = e[e.length - 1], l = t[0];
    for (let n of e) for (let i of t) this.addSingleLink(n, i, r, n === s && i === l ? a : void 0);
  }
  updateLinkInterpolate(e, t) {
    for (let r of e) r === "default" ? this.defaultInterpolate = t : this.edgeAt(r).interpolate = t;
  }
  updateLink(e, t) {
    for (let r of e) {
      if (r === "default") {
        this.defaultEdgeStyle = t;
        continue;
      }
      let a = this.edgeAt(r);
      a.style = t, t.length > 0 && !t.some((s) => s?.startsWith("fill")) && t.push("fill:none");
    }
  }
  edgeAt(e) {
    let t = this.edges[Number(e)];
    if (t === void 0) throw new at(`The index ${e} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${this.edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`, "semantic", { type: "flowchart" });
    return t;
  }
  addClass(e, t) {
    let r = t.join().replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    for (let a of e.split(",")) {
      let s = this.classes.get(a);
      s === void 0 && (s = { id: a, styles: [], textStyles: [] }, this.classes.set(a, s));
      for (let l of r) l.includes("color") && s.textStyles.push(l.replace("fill", "bgFill")), s.styles.push(l);
    }
  }
  setDirection(e) {
    let t = e.trim();
    t.includes("<") && (t = "RL"), t.includes("^") && (t = "BT"), t.includes(">") && (t = "LR"), t.includes("v") && (t = "TB"), t === "TD" && (t = "TB"), this.direction = t;
  }
  setClass(e, t) {
    for (let r of e.split(",")) this.nodes.get(r)?.classes.push(t), this.edgeById.get(r)?.classes.push(t), this.subgraphLookup.get(r)?.classes.push(t);
  }
  setTooltip(e, t) {
    if (t !== void 0) for (let r of e.split(",")) this.tooltips.set(r, t);
  }
  setLink(e, t, r) {
    let a = t.trim();
    for (let s of e.split(",")) {
      let l = this.nodes.get(s);
      l !== void 0 && (l.link = a ? ni(a) : void 0, l.linkTarget = r);
    }
    this.setClass(e, "clickable");
  }
  setClickEvent(e, t, r) {
    this.setClass(e, "clickable");
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addSubGraph(e, t, r) {
    let a = e?.text.trim(), s = r?.text ?? "";
    e !== void 0 && e === r && /\s/.test(s) && (a = void 0);
    let l = /* @__PURE__ */ new Set(), n = [], i;
    for (let u of t) if (typeof u == "string") u.trim() !== "" && !l.has(u) && (l.add(u), n.push(u));
    else if (Array.isArray(u)) for (let d of u) d.trim() !== "" && !l.has(d) && (l.add(d), n.push(d));
    else i = u.value;
    i ??= this.options.inheritDir ? this.direction ?? this.options.direction : void 0, a ??= "subGraph" + this.subCount, s = s || "", this.subCount++;
    let o = { id: a, nodes: n, title: s.trim(), classes: [], dir: i, labelType: Ec(r?.type) }, h = this.members;
    o.nodes = n.filter((u) => !h.has(u) && u !== a);
    for (let u of o.nodes) h.add(u);
    let c = this.subgraphLookup.get(a);
    if (c) for (let u of o.nodes) c.nodes.push(u);
    else this.subgraphs.push(o);
    return this.subgraphLookup.set(a, c ?? o), a;
  }
  exists(e, t) {
    for (let r of e) if (r.nodes.includes(t)) return !0;
    return !1;
  }
  makeUniq(e, t) {
    let r = /* @__PURE__ */ new Set();
    for (let a of t) for (let s of a.nodes) r.add(s);
    return { nodes: e.nodes.filter((a) => !r.has(a)) };
  }
  destructLink(e, t) {
    let r = Yk(e);
    if (!t) return r;
    let a = Uk(t);
    if (a.stroke !== r.stroke) return { type: "INVALID", stroke: "INVALID" };
    if (a.type === "arrow_open") a.type = r.type;
    else {
      if (a.type !== r.type) return { type: "INVALID", stroke: "INVALID" };
      a.type = "double_" + a.type;
    }
    return a.type === "double_arrow" && (a.type = "double_arrow_point"), a.length = r.length, a;
  }
  subgraph(e) {
    return this.subgraphLookup.get(e);
  }
}, f0 = ["$end", "INVALID", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "SHAPE_DATA", "CALLBACKNAME", "CALLBACKARGS", "MD_STR", "STR", "STYLE", "DEFAULT", "LINKSTYLE", "INTERPOLATE", "CLASSDEF", "CLASS", "HREF", "CLICK", "GRAPH", "subgraph", "end", "LINK_TARGET", "NODIR", "DIR", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "direction_td", "LINK_ID", "NUM", "BRKT", "STYLE_SEPARATOR", "COLON", "AMP", "SEMI", "COMMA", "MULT", "LINK", "START_LINK", "EDGE_TEXT", "-)", "TEXT", "(-", "STADIUMEND", "STADIUMSTART", "SUBROUTINEEND", "SUBROUTINESTART", "VERTEX_WITH_PROPS_START", "TAGEND", "CYLINDEREND", "CYLINDERSTART", "DOUBLECIRCLEEND", "DOUBLECIRCLESTART", "TRAPEND", "INVTRAPEND", "TRAPSTART", "INVTRAPSTART", "TAGSTART", "UP", "SEP", "DOWN", "NODE_STRING", "MINUS", "UNICODE_TEXT", "PIPE", "PE", "PS", "SQE", "SQS", "DIAMOND_STOP", "DIAMOND_START", "NEWLINE", "SPACE", "EOF"], xm = new Uint8Array(128);
for (let e of "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'*+.`?\\_/") xm[e.charCodeAt(0)] = 1;
var qk = /accTitle\s*:\s*/y, Vk = /accDescr\s*:\s*/y, Kk = /accDescr\s*\{\s*/y, Xk = /call\s+/y, Zk = /click\s+/y, Qk = /(?:\r?\n)*\s*\n/y, Jk = /\s*(?:LR|RL|TB|BT|TD|BR)\b/y, eA = /\s*[<>^]/y, tA = /\s*v\b/y, rA = [/.*direction\s+TB[^\n]*/y, /.*direction\s+BT[^\n]*/y, /.*direction\s+RL[^\n]*/y, /.*direction\s+LR[^\n]*/y, /.*direction\s+TD[^\n]*/y], Tc = /[\n\r\u2028\u2029]/g, u0 = /\s*[xo<]?--+[-xo>]\s*/y, aA = /\s*[xo<]?--\s*/y, p0 = /\s*[xo<]?==+[=xo>]\s*/y, lA = /\s*[xo<]?==\s*/y, Cc = /\s*[xo<]?-?\.+-[xo>]?\s*/y, iA = /\s*[xo<]?-\.\s*/y, g0 = /\s*~~~+\s*/y, sA = /(?:\r?\n)+/y, nA = /[^\S\n\r]+/y, oA = /\(\s*\)/y, hA = /\n\s*/g;
function cA(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = !0, h = e.indexOf("direction"), c = e.indexOf("@"), u = -1, d = 0, p = 0, g = -1, y = -1, b = -1, x = (T, E, M) => {
    r.push(T), a.push(e.slice(E, M)), s.push(E), i = M;
  }, v = (T) => {
    l.push(n), n = T;
  }, $ = () => {
    l.length > 0 && (n = l.pop());
  }, S = (T, E) => (T.lastIndex = E, T.test(e) ? T.lastIndex : -1), R = (T) => e.startsWith(T, i) && !nt(e.charCodeAt(i + T.length)), D = (T) => {
    let E = T;
    if (T >= y && T <= b) E = b;
    else if (Ke(e.charCodeAt(T))) {
      for (; E < t && Ke(e.charCodeAt(E)); ) E++;
      y = T, b = E;
    }
    let M = e.charCodeAt(E);
    return M === 120 || M === 111 || M === 60 ? e.charCodeAt(E + 1) : M;
  }, O = (T) => {
    let E = T;
    if (T >= y && T <= b) E = b;
    else if (Ke(e.charCodeAt(T))) {
      for (; E < t && Ke(e.charCodeAt(E)); ) E++;
      y = T, b = E;
    }
    return e.charCodeAt(E) === 126;
  }, U = () => {
    e.charCodeAt(i + 1) === 96 ? (v(2), i += 2) : (v(1), i++);
  }, q = () => {
    if (!O(i)) return !1;
    let T = S(g0, i);
    return T < 0 ? !1 : (x(40, i, T), !0);
  }, C = (T) => {
    let E = e.charCodeAt(i + 1);
    return T === 40 ? (E === 45 ? (v(8), x(45, i, i + 2)) : E === 91 ? (v(7), x(47, i, i + 2)) : E === 40 && e.charCodeAt(i + 2) === 40 ? (v(7), x(55, i, i + 3)) : (v(7), x(69, i, i + 1)), !0) : T === 91 ? (E === 91 ? (v(7), x(49, i, i + 2)) : E === 40 ? (v(7), x(53, i, i + 2)) : E === 47 ? (v(9), x(58, i, i + 2)) : E === 92 ? (v(9), x(59, i, i + 2)) : (v(7), x(71, i, i + 1)), !0) : T === 124 ? (v(7), x(67, i, i + 1), !0) : T === 123 ? (v(7), x(73, i, i + 1), !0) : !1;
  }, ee = (T) => {
    o && (o = !1, v(6)), x(20, i, i + T);
  }, ie = () => {
    let T = i;
    for (; T < t; ) {
      let E = e.charCodeAt(T);
      if (E < 128 && xm[E] === 1) T++;
      else if (E === 45 && T + 1 < t) {
        let M = e.charCodeAt(T + 1);
        if (M === 62 || M === 45 || M === 46) break;
        T++;
      } else break;
    }
    return T === i ? !1 : (x(64, i, T), !0);
  }, G = (T) => {
    let E = D(i), M;
    if (E === 45) {
      if ((M = S(u0, i)) >= 0) return x(40, i, M), !0;
      if ((M = S(aA, i)) >= 0) return v(10), x(41, i, M), !0;
      if ((M = S(Cc, i)) >= 0) return x(40, i, M), !0;
      if ((M = S(iA, i)) >= 0) return v(12), x(41, i, M), !0;
    } else if (E === 61) {
      if ((M = S(p0, i)) >= 0) return x(40, i, M), !0;
      if ((M = S(lA, i)) >= 0) return v(11), x(41, i, M), !0;
    } else if (E === 46 && (M = S(Cc, i)) >= 0) return x(40, i, M), !0;
    return T !== 45 && T !== 61 && T !== 46 && q();
  }, z = (T) => {
    let E;
    switch (T) {
      case 97:
        if (e.startsWith("acc", i)) {
          if ((E = S(qk, i)) >= 0) return v(3), x(2, i, E), !0;
          if ((E = S(Vk, i)) >= 0) return v(4), x(4, i, E), !0;
          if ((E = S(Kk, i)) >= 0) return v(5), i = E, !0;
        }
        break;
      case 64:
        if (e.charCodeAt(i + 1) === 123) return v(16), r.push(7), a.push(""), s.push(i), i += 2, !0;
        break;
      case 99:
        if ((E = S(Xk, i)) >= 0) return v(14), i = E, !0;
        if (R("classDef")) return x(16, i, i + 8), !0;
        if (R("class")) return x(17, i, i + 5), !0;
        if ((E = S(Zk, i)) >= 0) return v(13), i = E, !0;
        break;
      case 34:
        return U(), !0;
      case 115:
        if (R("style")) return x(12, i, i + 5), !0;
        if (R("swimlane-beta")) return ee(13), !0;
        if (R("subgraph")) return x(21, i, i + 8), !0;
        break;
      case 100:
        if (R("default")) return x(13, i, i + 7), !0;
        break;
      case 108:
        if (R("linkStyle")) return x(14, i, i + 9), !0;
        break;
      case 105:
        if (R("interpolate")) return x(15, i, i + 11), !0;
        break;
      case 104:
        if (e.startsWith("href", i) && Ke(e.charCodeAt(i + 4))) return x(18, i, i + 5), !0;
        break;
      case 102:
        if (R("flowchart-elk")) return ee(13), !0;
        if (R("flowchart")) return ee(9), !0;
        break;
      case 103:
        if (R("graph")) return ee(5), !0;
        break;
      case 101:
        if (R("end")) {
          for (E = i + 3; E < t && Ke(e.charCodeAt(E)); ) E++;
          return x(22, i, E), !0;
        }
        break;
      case 95:
        if (R("_self")) return x(23, i, i + 5), !0;
        if (R("_blank")) return x(23, i, i + 6), !0;
        if (R("_parent")) return x(23, i, i + 7), !0;
        if (R("_top")) return x(23, i, i + 4), !0;
        break;
    }
    if (h !== -1 && i >= d && (h < i && (h = e.indexOf("direction", i)), h !== -1 && (u < i && (Tc.lastIndex = i, u = Tc.test(e) ? Tc.lastIndex - 1 : t), h < u))) {
      for (let M = 0; M < 5; M++) if ((E = S(rA[M], i)) >= 0) return x(26 + M, i, E), !0;
      d = u;
    }
    if (c !== -1 && T !== 34 && !Ke(T)) {
      if (i >= p) {
        c < i && (c = e.indexOf("@", i));
        let M = i;
        for (; M < t; ) {
          let A = e.charCodeAt(M);
          if (A === 34 || Ke(A)) break;
          M++;
        }
        if (p = M, g = -1, c !== -1 && c < M) for (let A = Math.min(M, t - 1) - 1; A >= c; A--) {
          if (e.charCodeAt(A) !== 64) continue;
          let m = e.charCodeAt(A + 1);
          if (m !== 123 && m !== 34) {
            g = A;
            break;
          }
        }
      }
      if (g > i) return x(31, i, g + 1), !0;
    }
    if (T >= 48 && T <= 57) {
      let M = i + 1;
      for (; M < t; ) {
        let A = e.charCodeAt(M);
        if (A < 48 || A > 57) break;
        M++;
      }
      return x(32, i, M), !0;
    }
    switch (T) {
      case 35:
        return x(33, i, i + 1), !0;
      case 58:
        return e.charCodeAt(i + 1) === 58 && e.charCodeAt(i + 2) === 58 ? x(34, i, i + 3) : x(35, i, i + 1), !0;
      case 38:
        return x(36, i, i + 1), !0;
      case 59:
        return x(37, i, i + 1), !0;
      case 44:
        return x(38, i, i + 1), !0;
      case 42:
        return x(39, i, i + 1), !0;
      case 120:
      case 111:
        return G(T) || ie();
      case 60:
        return G(T) || x(60, i, i + 1), !0;
      case 45:
        return G(T) || ie() || x(65, i, i + 1), !0;
      case 61:
        return G(T);
      case 46:
        return G(T) || ie();
      case 126:
        return q();
      case 40:
        return C(T);
      case 91:
        return e.charCodeAt(i + 1) === 124 ? (x(50, i, i + 2), !0) : C(T);
      case 124:
      case 123:
        return C(T);
      case 62:
        return v(7), x(51, i, i + 1), !0;
      case 94:
        return x(61, i, i + 1), !0;
      case 92:
        return e.charCodeAt(i + 1) === 124 ? (x(62, i, i + 2), !0) : ie();
      case 118:
        return nt(e.charCodeAt(i + 1)) ? ie() : (x(63, i, i + 1), !0);
    }
    return Ke(T) ? G(T) ? !0 : (E = S(sA, i)) >= 0 ? (x(74, i, E), !0) : (E = S(nA, i)) >= 0 ? (x(75, i, E), !0) : !1 : T < 128 ? ie() : Wf(T) ? (x(66, i, i + 1), !0) : !1;
  }, _ = (T, E, M, A) => {
    if (T === 34) return U(), !0;
    let m = D(i);
    if (m === M || m === A) {
      let k = S(E, i);
      if (k >= 0) return $(), x(40, i, k), !0;
    }
    if (T === M && (M !== 45 || e.charCodeAt(i + 1) === 45)) return !1;
    let I = i + 1;
    for (; I < t; ) {
      let k = e.charCodeAt(I);
      if (k === 34) break;
      if (k === M) {
        if (M !== 45 || e.charCodeAt(I + 1) === 45) break;
      } else if (k === 120 || k === 111 || k === 60 || k === A || Ke(k)) {
        let w = D(I);
        if ((w === M || w === A) && S(E, I) >= 0) break;
      }
      I++;
    }
    return x(42, i, I), !0;
  };
  e: for (; ; ) {
    if (i >= t) {
      let M = -1;
      switch (n) {
        case 0:
          M = 76;
          break;
        case 3:
          M = 3;
          break;
        case 4:
          M = 5;
          break;
        case 5:
          M = 6;
          break;
        case 13:
          M = 19;
          break;
        case 14:
          M = 8;
          break;
        case 15:
          M = 9;
          break;
      }
      M !== -1 && x(M, t, t);
      break;
    }
    let T = e.charCodeAt(i), E = !0;
    switch (n) {
      case 0:
        E = z(T);
        break;
      case 1:
        if (T === 34) e.charCodeAt(i + 1) === 96 ? (v(2), i += 2) : ($(), i++);
        else {
          let M = e.indexOf('"', i);
          x(11, i, M === -1 ? t : M);
        }
        break;
      case 2:
        if (T === 96) e.charCodeAt(i + 1) === 34 ? ($(), i += 2) : E = !1;
        else if (T === 34) U();
        else {
          let M = i + 1;
          for (; M < t; ) {
            let A = e.charCodeAt(M);
            if (A === 96 || A === 34) break;
            M++;
          }
          x(10, i, M);
        }
        break;
      case 3:
      case 4: {
        let M = e.indexOf(`
`, i);
        M === -1 && (M = t);
        let A = n === 3 ? 3 : 5;
        $(), x(A, i, M);
        break;
      }
      case 5:
        if (T === 125) $(), i++;
        else {
          let M = e.indexOf("}", i);
          M === -1 && (M = t), x(6, i, M);
        }
        break;
      case 6: {
        let M;
        T === 34 ? U() : (M = S(Qk, i)) >= 0 ? ($(), x(24, i, M)) : (M = S(Jk, i)) >= 0 || (M = S(eA, i)) >= 0 || (M = S(tA, i)) >= 0 ? ($(), x(25, i, M)) : E = q() || C(T);
        break;
      }
      case 7: {
        let M = e.charCodeAt(i + 1);
        switch (T) {
          case 34:
            U();
            break;
          case 40:
          case 91:
          case 123:
            C(T);
            break;
          case 93:
            $(), M === 41 ? x(46, i, i + 2) : M === 93 ? x(48, i, i + 2) : x(70, i, i + 1);
            break;
          case 41:
            $(), M === 93 ? x(52, i, i + 2) : M === 41 && e.charCodeAt(i + 2) === 41 ? x(54, i, i + 3) : x(68, i, i + 1);
            break;
          case 124:
            $(), x(67, i, i + 1);
            break;
          case 125:
            $(), x(72, i, i + 1);
            break;
          default: {
            if ((T === 126 || Ke(T)) && q()) break;
            let A = i + 1;
            for (; A < t; ) {
              let m = e.charCodeAt(A);
              if (m === 91 || m === 93 || m === 40 || m === 41 || m === 123 || m === 125 || m === 124 || m === 34) break;
              A++;
            }
            x(44, i, A);
          }
        }
        break;
      }
      case 8: {
        let M = e.charCodeAt(i + 1);
        if (T === 34) U();
        else {
          if ((T === 126 || Ke(T)) && q()) break;
          if ((T === 45 || T === 47 || T === 41) && M === 41) $(), x(43, i, i + 2);
          else if (T === 40 || T === 91 || T === 123) C(T);
          else if (T === 41 || T === 93 || T === 125) E = !1;
          else {
            let A = i + 1;
            for (; A < t; ) {
              let m = e.charCodeAt(A);
              if (m === 34 || m === 40 || m === 41 || m === 91 || m === 93 || m === 123 || m === 125 || (m === 45 || m === 47) && e.charCodeAt(A + 1) === 41 || (m === 126 || Ke(m)) && O(A) && S(g0, A) >= 0) break;
              A++;
            }
            x(44, i, A);
          }
        }
        break;
      }
      case 9: {
        let M = e.charCodeAt(i + 1);
        if (T === 34) {
          U();
          break;
        }
        if ((T === 126 || Ke(T)) && q()) break;
        switch (T) {
          case 40:
            M === 45 || M === 91 || M === 40 && e.charCodeAt(i + 2) === 40 ? C(T) : M === 93 ? ($(), x(56, i, i + 2)) : C(T);
            break;
          case 91:
          case 123:
            C(T);
            break;
          case 92:
            M === 93 ? ($(), x(56, i, i + 2)) : x(44, i, i + 1);
            break;
          case 47:
            M === 93 ? ($(), x(57, i, i + 2)) : x(44, i, i + 1);
            break;
          case 93:
          case 41:
            M === 93 ? ($(), x(56, i, i + 2)) : E = !1;
            break;
          case 125:
            E = !1;
            break;
          default: {
            if ((T === 63 || T === 61) && M === 93) {
              $(), x(56, i, i + 2);
              break;
            }
            let A = i + 1;
            for (; A < t; ) {
              let m = e.charCodeAt(A);
              if (m === 92 || m === 91 || m === 93 || m === 40 || m === 41 || m === 123 || m === 125 || m === 47) break;
              A++;
            }
            x(44, i, A);
          }
        }
        break;
      }
      case 10:
        E = _(T, u0, 45, -1);
        break;
      case 11:
        E = _(T, p0, 61, -1);
        break;
      case 12:
        E = _(T, Cc, 46, 45);
        break;
      case 13:
        if (T === 34) U();
        else if (Ke(T)) $(), i++;
        else {
          let M = i + 1;
          for (; M < t && !Ke(e.charCodeAt(M)); ) M++;
          x(19, i, M);
        }
        break;
      case 14:
        if (T === 40) {
          let M = S(oA, i);
          $(), M >= 0 ? i = M : (v(15), i++);
        } else {
          let M = e.indexOf("(", i);
          M === -1 && (M = t), x(8, i, M);
        }
        break;
      case 15:
        if (T === 41) $(), i++;
        else {
          let M = e.indexOf(")", i);
          M === -1 && (M = t), x(9, i, M);
        }
        break;
      case 16:
        if (T === 34) v(17), x(7, i, i + 1);
        else if (T === 125) $(), i++;
        else if (T === 94) E = !1;
        else {
          let M = i + 1;
          for (; M < t; ) {
            let A = e.charCodeAt(M);
            if (A === 125 || A === 94 || A === 34) break;
            M++;
          }
          x(7, i, M);
        }
        break;
      case 17:
        if (T === 34) $(), x(7, i, i + 1);
        else {
          let M = e.indexOf('"', i);
          M === -1 && (M = t), r.push(7), a.push(e.slice(i, M).replace(hA, "<br/>")), s.push(i), i = M;
        }
        break;
    }
    if (!E) return r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s };
    continue e;
  }
  return r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var ho = new Uint8Array(77);
for (let e of [32, 64, 63, 65, 13, 38, 35, 36, 33, 39, 66]) ho[e] = 1;
var gf = new Uint8Array(77);
for (let e of [32, 66, 64, 25, 63, 65, 38, 35, 36, 33, 39]) gf[e] = 1;
var mf = new Uint8Array(77);
for (let e of [32, 64, 75, 65, 36, 66, 35, 39, 33, 12, 14, 16, 17, 19, 20, 25, 21, 22, 63, 61, 41]) mf[e] = 1;
var yf = new Uint8Array(77);
for (let e of [32, 64, 35, 75, 33, 12]) yf[e] = 1;
var m0 = "'UNICODE_TEXT', 'TEXT', 'TAGSTART'", _i = [], y0 = /}\s*\n/g;
function dA(e, t) {
  let r = e.includes("}") ? e.replace(y0, `}
`) : e, { types: a, texts: s, starts: l } = cA(r), n = 0, i, o = (_) => {
    let T = a[n], E = r === e ? l[n] : bs([Jo(e, y0, 2)], l[n]);
    throw T === 1 ? bt("flowchart", e, E, "", !0) : bt("flowchart", e, E, `Expecting ${_}, got '${f0[T]}'`);
  }, h = (_, T = "") => (a[n] !== _ && o(`'${f0[_]}'${T ? ", " + T : ""}`), s[n++]), c = () => {
    let _ = a[n];
    _ !== 74 && _ !== 37 && _ !== 76 && o("'SEMI', 'NEWLINE', 'EOF'"), n++;
  }, u = () => {
    ho[a[n]] === 0 && o("'NODE_STRING'");
    let _ = s[n++];
    for (; ho[a[n]] === 1; ) _ += s[n++];
    return _;
  }, d = () => {
    gf[a[n]] === 0 && o("'NODE_STRING'");
    let _ = s[n++];
    for (; gf[a[n]] === 1; ) _ += s[n++];
    return _;
  }, p = () => {
    let _ = a[n], T;
    if (_ === 11) T = "string";
    else if (_ === 10) T = "markdown";
    else if (_ === 44 || _ === 60 || _ === 51 || _ === 66) T = "text";
    else return o(`${m0}, 'TAGEND', 'STR', 'MD_STR'`);
    let E = s[n++];
    for (; ; ) {
      let M = a[n];
      if (M !== 44 && M !== 60 && M !== 51 && M !== 66) break;
      E += s[n++];
    }
    return { text: E, type: T };
  }, g = (_) => {
    h(_, m0);
  }, y = () => {
    let _ = a[n], T;
    if (_ === 11) T = "string";
    else if (_ === 10) T = "markdown";
    else if (_ === 42 || _ === 66) T = "text";
    else return o("'EDGE_TEXT', 'STR', 'MD_STR'");
    let E = s[n++];
    for (; a[n] === 42 || a[n] === 66; ) E += s[n++];
    return { text: E, type: T };
  }, b = () => {
    let _ = a[n], T;
    if (_ === 11) T = "text";
    else if (_ === 10) T = "markdown";
    else if (mf[_] === 1) T = "text";
    else return o("'NODE_STRING', 'STR', 'MD_STR'");
    let E = s[n++];
    for (; mf[a[n]] === 1; ) E += s[n++];
    return { text: E, type: T };
  }, x = () => {
    let _ = s[n++];
    for (; a[n] === 7; ) _ += s[n++];
    return _;
  }, v = () => {
    let _ = u(), T;
    switch (a[n]) {
      case 71:
        n++, T = p(), g(70), t.addVertex(_, T, "square");
        break;
      case 55:
        n++, T = p(), g(54), t.addVertex(_, T, "doublecircle");
        break;
      case 69:
        n++, a[n] === 69 ? (n++, T = p(), g(68), h(68), t.addVertex(_, T, "circle")) : (T = p(), g(68), t.addVertex(_, T, "round"));
        break;
      case 45:
        n++, T = p(), g(43), t.addVertex(_, T, "ellipse");
        break;
      case 47:
        n++, T = p(), g(46), t.addVertex(_, T, "stadium");
        break;
      case 49:
        n++, T = p(), g(48), t.addVertex(_, T, "subroutine");
        break;
      case 50: {
        n++;
        let E = h(64);
        h(35);
        let M = h(64);
        h(67), T = p(), g(70), t.addVertex(_, T, "rect", void 0, void 0, void 0, { [E]: M });
        break;
      }
      case 53:
        n++, T = p(), g(52), t.addVertex(_, T, "cylinder");
        break;
      case 73:
        n++, a[n] === 73 ? (n++, T = p(), g(72), h(72), t.addVertex(_, T, "hexagon")) : (T = p(), g(72), t.addVertex(_, T, "diamond"));
        break;
      case 51:
        n++, T = p(), g(70), t.addVertex(_, T, "odd");
        break;
      case 58:
        n++, T = p(), a[n] === 57 ? (n++, t.addVertex(_, T, "lean_right")) : (g(56), t.addVertex(_, T, "trapezoid"));
        break;
      case 59:
        n++, T = p(), a[n] === 56 ? (n++, t.addVertex(_, T, "lean_left")) : (g(57), t.addVertex(_, T, "inv_trapezoid"));
        break;
      default:
        t.addVertex(_);
    }
    return _;
  }, $ = () => {
    let _ = v();
    return a[n] === 34 && (n++, t.setClass(_, u())), _;
  }, S = () => {
    let _ = [$()];
    for (i = void 0; ; ) {
      let T = a[n] === 7 ? x() : void 0;
      if (a[n] !== 75) return i = T, _;
      do
        n++;
      while (a[n] === 75);
      if (a[n] !== 36) return T !== void 0 && o("'AMP'"), _;
      n++, a[n] !== 75 && o("'SPACE'");
      do
        n++;
      while (a[n] === 75);
      let E = $();
      T !== void 0 && t.addVertex(_[_.length - 1], void 0, void 0, void 0, void 0, void 0, void 0, T), _.push(E);
    }
  }, R = () => {
    let _;
    if (a[n] === 31 && (_ = s[n++]), a[n] === 40) {
      let T = t.destructLink(s[n++]);
      return _ !== void 0 && (T.id = _), a[n] === 67 && (n++, T.text = p(), g(67), a[n] === 75 && n++), T;
    }
    if (a[n] === 41) {
      let T = s[n++], E = y(), M = h(40, "'EDGE_TEXT'"), A = t.destructLink(M, T);
      return A.text = E, _ !== void 0 && (A.id = _), A;
    }
    return o("'LINK', 'START_LINK'");
  }, D = (_) => {
    let T = S();
    i !== void 0 && t.addVertex(T[T.length - 1], void 0, void 0, void 0, void 0, void 0, void 0, i);
    let E = T;
    for (; ; ) {
      let M = a[n];
      if (M !== 40 && M !== 41 && M !== 31) return E;
      let A = R(), m = S();
      i !== void 0 && t.addVertex(m[m.length - 1], void 0, void 0, void 0, void 0, void 0, void 0, i), t.addLink(T, m, A), _ && (E = m.concat(E)), T = m;
    }
  }, O = () => {
    yf[a[n]] === 0 && o("'NODE_STRING', 'NUM', 'COLON', 'BRKT'");
    let _ = s[n++];
    for (; yf[a[n]] === 1; ) _ += s[n++];
    return _;
  }, U = () => {
    let _ = [O()];
    for (; a[n] === 38; ) n++, _.push(O());
    return _;
  }, q = () => {
    n++, h(75);
    let _;
    if (a[n] === 13) _ = [s[n++]];
    else for (_ = [h(32, "'DEFAULT'")]; a[n] === 38; ) n++, _.push(h(32));
    if (h(75), a[n] !== 15) {
      t.updateLink(_, U());
      return;
    }
    n++, h(75);
    let T = d();
    if (a[n] === 75) {
      n++;
      let E = U();
      t.updateLinkInterpolate(_, T), t.updateLink(_, E);
    } else t.updateLinkInterpolate(_, T);
  }, C = (_, T) => {
    if (a[n] !== 75) {
      t.setLink(_, T);
      return;
    }
    if (n++, a[n] === 23) {
      t.setLink(_, T, s[n++]);
      return;
    }
    let E = h(11, "'LINK_TARGET'");
    a[n] === 75 ? (n++, t.setLink(_, T, h(23))) : t.setLink(_, T), t.setTooltip(_, E);
  }, ee = () => {
    let _ = s[n++];
    switch (a[n]) {
      case 8: {
        let T = s[n++], E = a[n] === 9, M = E ? s[n++] : void 0, A;
        a[n] === 75 && (n++, A = h(11)), E ? t.setClickEvent(_, T, M) : t.setClickEvent(_, T), A !== void 0 && t.setTooltip(_, A);
        return;
      }
      case 18:
        n++, C(_, h(11));
        return;
      case 11:
        C(_, s[n++]);
        return;
      default: {
        let T = d();
        if (a[n] === 75) {
          n++;
          let E = h(11);
          t.setClickEvent(_, T), t.setTooltip(_, E);
        } else t.setClickEvent(_, T);
      }
    }
  }, ie = () => {
    n++;
    let _ = a[n];
    if (_ === 74 || _ === 37 || _ === 76) return n++, { id: void 0, title: void 0, list: [], collect: !1 };
    h(75, "'SEMI', 'NEWLINE', 'EOF'");
    let T = b(), E = T;
    return a[n] === 71 && (n++, E = p(), g(70)), _ = a[n], _ !== 74 && _ !== 37 && _ !== 76 && o("'SEMI', 'NEWLINE', 'EOF', 'SQS'"), n++, { id: T, title: E, list: [], collect: !1 };
  }, G = (_) => {
    let T = a[n];
    switch (T) {
      case 12: {
        n++, h(75);
        let E = u();
        return h(75), t.addVertex(E, void 0, void 0, U()), c(), _i;
      }
      case 14:
        return q(), c(), _i;
      case 16: {
        n++, h(75);
        let E = u();
        return h(75), t.addClass(E, U()), c(), _i;
      }
      case 17: {
        n++, h(75);
        let E = u();
        return h(75), t.setClass(E, u()), c(), _i;
      }
      case 19:
        return ee(), c(), _i;
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
        return n++, { stmt: "dir", value: fA[T - 26] };
      case 2: {
        n++;
        let E = h(3).trim();
        return t.setAccTitle(E), E;
      }
      case 4: {
        n++;
        let E = h(5).trim();
        return t.setAccDescription(E), E;
      }
      case 6: {
        let E = s[n++].trim();
        return t.setAccDescription(E), E;
      }
      default: {
        ho[T] === 0 && o(x0);
        let E = D(_);
        return c(), E;
      }
    }
  }, z = () => {
    let _ = [], T = [], E = !1;
    for (; ; ) {
      let M = a[n];
      if (M === 0) break;
      if (M === 22) {
        let A = _.pop();
        if (A === void 0) break;
        n++;
        let m = t.addSubGraph(A.id, T, A.title);
        T = A.list, E = A.collect, E && T.push(m);
      } else if (M === 37 || M === 74 || M === 75 || M === 76) E && T.push(s[n]), n++;
      else if (M === 21) {
        let A = ie();
        A.list = T, A.collect = E, _.push(A), T = [], E = !0;
      } else {
        let A = G(E);
        E && (!Array.isArray(A) || A.length > 0) && T.push(A);
      }
    }
    _.length > 0 && o("'end'");
  };
  for (; a[n] === 75 || a[n] === 74; ) n++;
  if (h(20, "'SPACE', 'NEWLINE'"), a[n] === 24) n++, t.setDirection("TB");
  else {
    let _ = h(25, "'NODIR'"), T = a[n];
    if (T === 75) {
      do
        n++;
      while (a[n] === 75);
      T = a[n], T !== 74 && o("'NEWLINE', 'SPACE'");
    } else T !== 37 && T !== 74 && o("'SEMI', 'NEWLINE', 'SPACE'");
    n++, t.setDirection(_);
  }
  z(), a[n] !== 0 && o(x0);
}
var fA = ["TB", "BT", "RL", "LR", "TD"], x0 = "'SEMI', 'NEWLINE', 'SPACE', 'EOF', 'subgraph', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'STYLE', 'LINKSTYLE', 'CLASSDEF', 'CLASS', 'CLICK', 'NODE_STRING'";
function uA(e) {
  if (e.img) return "imageSquare";
  if (e.icon) return e.form === "circle" ? "iconCircle" : e.form === "square" ? "iconSquare" : e.form === "rounded" ? "iconRounded" : "icon";
  switch (e.type) {
    case "square":
    case void 0:
      return "squareRect";
    case "round":
      return "roundedRect";
    default:
      return e.type;
  }
}
function pA(e) {
  switch (e) {
    case "arrow_point":
    case "arrow_circle":
    case "arrow_cross":
      return ["none", e];
    case "double_arrow_point":
    case "double_arrow_circle":
    case "double_arrow_cross": {
      let t = e.replace("double_", "");
      return [t, t];
    }
  }
  return ["none", "arrow_point"];
}
function gA(e, t) {
  let r = [], a = [], s = e.subgraphs, l = ($) => {
    let S = [];
    for (let R of $) {
      let D = e.classes.get(R);
      if (D !== void 0) {
        for (let O of D.styles) S.push(O.trim());
        for (let O of D.textStyles) S.push(O.trim());
      }
    }
    return S;
  }, n = /* @__PURE__ */ new Map();
  for (let $ of s) for (let S of $.nodes) e.subgraph(S) && n.set(S, $.id);
  let i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (let $ of s) {
    let S = n.get($.id);
    if (S === void 0) continue;
    let R = o.get(S);
    R ? R.push($.id) : o.set(S, [$.id]);
  }
  let h = 0;
  for (let $ of s) {
    if (n.has($.id)) continue;
    let S = [$.id];
    for (; S.length > 0; ) {
      let R = S.pop();
      if (i.has(R)) continue;
      i.set(R, h++);
      let D = o.get(R);
      if (D) for (let O = D.length - 1; O >= 0; O--) S.push(D[O]);
    }
  }
  let c = ($) => e.subgraph($)?.metadata?.view === "collapsed", u = !1;
  for (let $ of s) $.metadata?.view === "collapsed" && (u = !0);
  let d = /* @__PURE__ */ new Map(), p = ($) => {
    let S = [], R = /* @__PURE__ */ new Set(), D = $;
    for (; D !== void 0 && !d.has(D) && !R.has(D); ) R.add(D), S.push(D), D = n.get(D);
    let O = D !== void 0 ? d.get(D) : void 0;
    for (let U = S.length - 1; U >= 0; U--) O === void 0 && c(S[U]) && (O = S[U]), d.set(S[U], O);
    return O;
  }, g = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map();
  for (let $ of u ? s : []) {
    let S = p($.id);
    if (S !== void 0) {
      $.id !== S && (g.add($.id), y.set($.id, S));
      for (let R of $.nodes) R !== S && (g.add(R), y.set(R, S));
    }
  }
  let b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set();
  for (let $ = s.length - 1; $ >= 0; $--) {
    let S = s[$];
    if (!g.has(S.id)) {
      S.nodes.length > 0 && x.add(S.id);
      for (let R of S.nodes) b.set(R, S.id);
    }
  }
  let v = /* @__PURE__ */ new Map();
  for (let $ = s.length - 1; $ >= 0; $--) {
    let S = s[$];
    if (g.has(S.id)) continue;
    let R = S.metadata?.view === "collapsed", D = { id: S.id, label: S.title, labelType: S.labelType, parentId: b.get(S.id), cssStyles: [], cssCompiledStyles: l(S.classes), cssClasses: S.classes.join(" "), shape: R ? "collapsedGroup" : "rect", dir: S.dir, isGroup: !R, colorIndex: i.get(S.id) };
    R || (D.metadata = S.metadata), r.push(D), v.set(S.id, D);
  }
  for (let $ of e.nodes.values()) {
    if (g.has($.id)) continue;
    let S = v.get($.id);
    if (S) {
      S.cssStyles = $.styles, S.cssCompiledStyles = l($.classes), S.cssClasses = $.classes.join(" ");
      continue;
    }
    let R = x.has($.id), D = { id: $.id, label: $.text, labelType: $.labelType, parentId: b.get($.id), cssStyles: $.styles, cssCompiledStyles: l(["default", "node", ...$.classes]), cssClasses: "default " + $.classes.join(" "), dir: $.dir, link: $.link, linkTarget: $.linkTarget, tooltip: e.tooltips.get($.id), icon: $.icon, pos: $.pos, img: $.img, assetWidth: $.assetWidth, assetHeight: $.assetHeight, constraint: $.constraint, isGroup: R, shape: R ? "rect" : uA($) };
    r.push(D);
  }
  return e.edges.forEach(($, S) => {
    let R = y.get($.start) ?? $.start, D = y.get($.end) ?? $.end;
    if (R === D && (y.has($.start) || y.has($.end))) return;
    let [O, U] = pA($.type), q = [...e.defaultEdgeStyle ?? []];
    $.style && q.push(...$.style);
    let C = $.stroke === "invisible" || $.type === "arrow_open";
    a.push({ id: $.id || `L_${R}_${D}_${S}`, isUserDefinedId: $.isUserDefinedId, start: R, end: D, type: $.type ?? "normal", label: $.text, labelType: $.labelType, thickness: $.stroke, pattern: $.stroke, minlen: $.length, classes: $.stroke === "invisible" ? "" : "edge-thickness-normal edge-pattern-solid flowchart-link", arrowTypeStart: C ? "none" : O, arrowTypeEnd: C ? "none" : U, cssCompiledStyles: l($.classes), style: q, animate: $.animate, animation: $.animation, curve: $.interpolate || e.defaultInterpolate || t });
  }), { nodes: r, edges: a };
}
var mA = 40, yA = 16, xA = 48, w0 = 20, Sc = 26, _c = ' fill="var(--_s)" stroke="var(--_b)"', wA = ' stroke="var(--_b)"';
function Ic(e, t, r) {
  let a = e[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
function Ii(e, t) {
  return e !== void 0 && e > 0 && e <= 4e3 ? e : t;
}
function wm(e, t, r, a) {
  let s = (l) => Da(r, (n) => $A(e, t, r, a, l, n));
  return ul(e.direction) ? ur(r, s) : s(!1);
}
function $A(e, t, r, a, s, l) {
  let n = l ? 12 : w0, i = a ? t[a.type] : void 0, o = typeof i == "object" && i !== null && !Array.isArray(i) ? i : t.flowchart ?? {}, h = gA(e, typeof o.curve == "string" ? o.curve : void 0);
  a?.prepare(h);
  let c = r.fontSize ?? 16, u = Math.round(c * 0.875), d = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), p = Math.min(Ic(o, "wrappingWidth", 200), a && l ? 100 : 1 / 0), g = r.padding ?? 8, y = r.icons, b = /* @__PURE__ */ new Map(), x = [], v = [];
  h.nodes.forEach((W, K) => b.set(W.id, K));
  for (let W of h.nodes) {
    let K = Dt(W.cssStyles.length > 0 ? W.cssCompiledStyles.concat(W.cssStyles) : W.cssCompiledStyles), H = (K.bold ? 1 : 0) | (K.italic ? 2 : 0), te = W.labelType === "markdown", Q = K.fontSize ?? c, L, X;
    if (W.isGroup) {
      let le = je(W.label, te, d, Q, a && l ? Math.max(80, Qt(r) / 2) : 4e3, H);
      L = { node: W, style: K, label: le, shape: "group", w: 0, h: 0, dy: 0, loops: 0 }, X = Wt(0, 0), X.isGroup = !0, X.dir = W.dir ? zr(W.dir) : void 0, X.padX = n, X.padTop = le.height > 0 ? le.height + 16 : w0, X.padBottom = n, X.minW = le.width + 2 * n - 12;
    } else {
      let le = P2(W.shape), J = W.img || W.icon || hb(le) ? W.label : void 0, V = je(J, te, d, Q, p, H), Z, ae, oe = 0;
      if (W.img || W.icon) {
        let ue = W.img ? 80 : 48, he = Ii(W.assetWidth, ue), re = Ii(W.assetHeight, ue);
        Z = Math.max(he, V.width + 8), ae = re + (V.height > 0 ? V.height + 6 : 0), oe = W.pos === "t" ? -re / 2 : re / 2, V.height === 0 && (oe = 0);
      } else {
        let ue = ih(le, V.width, V.height);
        Z = ue.w, ae = ue.h, oe = ue.dy;
      }
      L = { node: W, style: K, label: V, shape: le, w: Z, h: ae, dy: oe, loops: 0 }, X = Wt(Z, ae);
    }
    X.seq = x.length, x.push(L), v.push(X);
  }
  h.nodes.forEach((W, K) => {
    v[K].parent = W.parentId !== void 0 ? b.get(W.parentId) ?? -1 : -1;
  }), U2(v, h.edges.map((W) => [b.get(W.start) ?? -1, b.get(W.end) ?? -1]));
  let $ = s ? "TB" : zr(e.direction), S = (W) => {
    let K;
    for (let H = v[W].parent, te = 0; H >= 0 && K === void 0 && te < 1e4; H = v[H].parent, te++) K = v[H].dir;
    return K ??= $, K === "LR" || K === "RL";
  };
  x.forEach((W, K) => {
    W.node.isGroup ? v[K].span = 1 / 0 : !W.node.img && !W.node.icon && (v[K].span = ob(W.shape, W.w, W.h, S(K)));
  });
  let R = [], D = [], O = [];
  for (let W of h.edges) {
    let K = b.get(W.start), H = b.get(W.end);
    if (K === void 0 || H === void 0) continue;
    let te = je(W.label, W.labelType === "markdown", d, u, p);
    K === H && (x[K].loops++, S(K) ? v[K].h += 2 * (Sc + (te.height > 0 ? te.height + 8 : 0)) : v[K].w += 2 * (Sc + (te.width > 0 ? te.width + 12 : 0))), O.push(W), D.push(te), R.push({ src: K, dst: H, minlen: W.minlen ?? 1, labelW: te.width > 0 ? te.width + 12 : 0, labelH: te.height > 0 ? te.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  let U = { nodeSep: Ic(o, "nodeSpacing", mA) * (l ? 0.5 : 1), edgeSep: yA, rankSep: Ic(o, "rankSpacing", xA) * (l ? 0.75 : 1), portSep: 20, tracks: typeof o.curve == "string" && /^step/.test(o.curve), straight: o.curve === "linear", headRoom: Ct("arrow_point") }, q = a ? a.layout(v, R, $, U, l) : cl(v, R, $, U), C = ma(e.title, d, c, l ? Qt(r) : 4e3), ee = C.height > 0 ? C.height + 12 : 0, ie = Math.max(q.width, C.width), G = g + (ie - q.width) / 2, z = g + ee;
  _s(v, R, G, z);
  let _ = Math.ceil(ie + 2 * g), T = Math.ceil(q.height + ee + 2 * g), E = [], M = /* @__PURE__ */ new Map(), A = !1;
  for (let W of v) W.isGroup && (A = !0);
  if (A) for (let W of R) ei(M, W.route);
  let m = "", I = "", k = "", w = [];
  for (let W = 0; W < x.length; W++) {
    let K = x[W], H = v[W], te = K.node, Q = H.x, L = H.y, X = Ht(te.cssClasses.replace(/^default\s?/, "")), le = Ye(te.id);
    if (H.isGroup && a?.drawGroup && H.parent < 0) {
      Ia(K.style.shape) && a.filledBox && w.push({ box: a.filledBox(H, $), shape: K.style.shape }), m += a.drawGroup(H, K.label, K.style, X, le, $, y);
      continue;
    }
    if (H.isGroup) {
      Ia(K.style.shape) && w.push({ box: [Q - H.w / 2, L - H.h / 2, Q + H.w / 2, L + H.h / 2], shape: K.style.shape });
      let he = lh(H, K.label.width, M, n), re = L - H.h / 2 + 8 + K.label.height / 2, P = Y2(H, K.label.width, he, M), ne = ` class="pele-cluster-label"${P ? ' fill="var(--_m)"' : Xt(K.style, "var(--_m)")}${K.style.text}`;
      P && (I += j2(K.label, he, re, ne, le, v, W, y)), m += `<g class="pele-cluster${X}" data-id="${le}"><rect x="${f(Q - H.w / 2)}" y="${f(L - H.h / 2)}" width="${f(H.w)}" height="${f(H.h)}" fill="var(--_a)"${fl(K.style.shape) ? "" : ' fill-opacity="0.5"'} stroke="var(--_b)"${Et(K.style.shape)}/>` + (P ? "" : Pe(K.label, he, re, ne, y)) + "</g>";
      continue;
    }
    let J = K.w, V = K.h, Z, ae = "";
    if (te.img) {
      let he = Ii(te.assetWidth, 80), re = Ii(te.assetHeight, 80), P = K.label.height > 0 ? te.pos === "t" ? V / 2 - re : -V / 2 : -re / 2, ne = Ew(ni(te.img), r);
      Z = ne === void 0 ? "" : `<image href="${it(ne)}" x="${f(-he / 2)}" y="${f(P)}" width="${f(he)}" height="${f(re)}" preserveAspectRatio="${te.constraint === "on" ? "xMidYMid meet" : "none"}"/>`;
    } else if (te.icon) {
      let he = Ii(te.assetHeight, 48), re = K.label.height > 0 ? te.pos === "t" ? V / 2 - he : -V / 2 : -he / 2, P = te.shape === "icon" ? "" : te.shape === "iconCircle" ? `<circle cy="${f(re + he / 2)}" r="${f(he / 2)}"${_c}${K.style.shape}/>` : `<rect x="${f(-he / 2)}" y="${f(re)}" width="${f(he)}" height="${f(he)}" rx="${te.shape === "iconRounded" ? 8 : 0}"${_c}${K.style.shape}/>`, ne = he * 0.6;
      Z = P + `<svg class="pele-icon" data-icon="${Ye(te.icon)}" x="${f(-ne / 2)}" y="${f(re + (he - ne) / 2)}" width="${f(ne)}" height="${f(ne)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${y?.(te.icon) ?? ""}</svg>`;
    } else Z = ti(K.shape, J, V, _c + K.style.shape, wA + K.style.line), qf(K.shape) && (ae = Xt(K.style));
    let oe = Pe(K.label, 0, K.dy, ` class="pele-label"${ae}${K.style.text}`, y);
    if (/ internal-link(?: |$)/.test(X + " ") && te.label && r.links !== !1) {
      let he = Tt(te.label), re = Pf(he, r), P = it(he);
      oe = `<a class="internal-link"${re ? ` href="${P}"${Ss(r)}` : ""} data-href="${P}">${oe}</a>`, E.push({ id: te.id, href: he, internal: !0 });
    }
    let ue = Z + oe;
    te.tooltip && (ue = `<title>${Ye(te.tooltip)}</title>` + ue), te.link && (ue = oi(ue, te.link, te.id, E, r, te.linkTarget ? ` target="${it(te.linkTarget)}"` : "")), k += `<g class="pele-node pele-shape-${K.shape}${X}" data-id="${le}" transform="translate(${f(Q)},${f(L)})">${ue}</g>`;
  }
  let B = q2();
  for (let W = 0; W < R.length; W++) {
    let K = R[W];
    K.src === K.dst || O[W].thickness === "invisible" || K.route.length < 6 || (B.add(K.src, fa(K.route, 0, v[K.src]), O[W].arrowTypeStart), B.add(K.dst, fa(K.route, K.route.length - 3, v[K.dst]), O[W].arrowTypeEnd));
  }
  let N = "", j = "", F = "", Y = /* @__PURE__ */ new Map();
  for (let W = 0; W < R.length; W++) {
    let K = R[W], H = O[W], te = D[W], Q = H.style.length > 0 || H.cssCompiledStyles.length > 0 ? Dt(H.cssCompiledStyles.concat(H.style)) : void 0;
    if (H.thickness !== "invisible") {
      let L = H.arrowTypeStart, X = H.arrowTypeEnd, le;
      if (K.src === K.dst) {
        let oe = x[K.src], ue = Y.get(K.src) ?? 0;
        Y.set(K.src, ue + 1), le = K2(v[K.src], oe.w, oe.h, ue, S(K.src), Sc, Ct(X), K);
      } else {
        let oe = K.route.slice(), ue = B.of(K.src, fa(oe, 0, v[K.src])), he = B.of(K.dst, fa(oe, oe.length - 3, v[K.dst]));
        hs(oe, 0, x[K.src], v[K.src]), hs(oe, oe.length - 3, x[K.dst], v[K.dst]), le = Na(oe, H.curve, Ct(L), Ct(X), ue, he);
      }
      let J = Is(le.d, [le.sx, le.sy, le.ex, le.ey], w, Q?.line, le.tokens), V = J || (Q?.stroke && H.thickness !== "invisible" ? it(Q.stroke) : "var(--_l)"), Z = "";
      H.thickness === "thick" ? Z += ' stroke-width="2.5"' : H.thickness === "dotted" && (Z += ' stroke-dasharray="3 4"');
      let ae = Ht(H.classes.replace(/edge-thickness-normal|edge-pattern-solid|flowchart-link/g, ""));
      J === "" && (N += Ns(le, L, X, Q?.line, H.thickness === "thick")), j += `<g class="pele-edge${ae}" data-id="${Ye(H.id)}"${J ? ` stroke="${J}"` : ""}${Q?.line ?? ""}><path d="${le.d}"${Z}/>` + St(L, le.sx, le.sy, le.sdx, le.sdy, V) + St(X, le.ex, le.ey, le.edx, le.edy, V) + "</g>";
    }
    if (te.width > 0) {
      let L = K.labelX, X = K.labelY;
      F += ga(H.id, te, L, X, Q?.text ?? "", y);
    }
  }
  return { svg: xt(a?.type ?? "flowchart", _, T, c, r, e, Pe(C, _ / 2, g + C.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (m ? `<g class="pele-clusters">${m}</g>` : "") + dl(N) + (j ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${j}</g>` : "") + (I ? `<g class="pele-cluster-titles">${I}</g>` : "") + (F ? `<g class="pele-edge-labels" font-size="${u}">${F}</g>` : "") + `<g class="pele-nodes">${k}</g>`), width: _, height: T, links: E };
}
var $m = { type: "flowchart", math: !0, parse(e, t, r, a, s) {
  let l = t.flowchart ?? {}, n = new jk({ inheritDir: l.inheritDir === !0, maxEdges: s.maxEdges });
  return r && (n.title = r), dA(e, n), n;
}, render: wm }, ai = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ll = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function gs(e) {
  return !Number.isNaN(e.getTime());
}
function mr(e, t) {
  let r = String(e);
  return r.length >= t ? r : "0".repeat(t - r.length) + r;
}
function bm(e) {
  let t = ["th", "st", "nd", "rd"], r = e % 100;
  return e + (t[(r - 20) % 10] || t[r] || t[0]);
}
function xf(e) {
  let t = -Math.round(e.getTimezoneOffset() / 15) * 15;
  return t === 0 ? 0 : t;
}
function $0(e) {
  let t = xf(e), r = Math.abs(t);
  return (t >= 0 ? "+" : "-") + mr(Math.floor(r / 60), 2) + ":" + mr(r % 60, 2);
}
function Mm(e) {
  return e.getDay() || 7;
}
function Sa(e, t) {
  let r = new Date(e);
  return r.setDate(r.getDate() + t), r;
}
function bA(e) {
  let t = new Date(e.getFullYear(), e.getMonth() + 1, 0);
  return t.setHours(23, 59, 59, 999), t.getDate();
}
function b0(e, t) {
  let r = new Date(e);
  return r.setDate(1), t(r), r.setDate(Math.min(e.getDate(), bA(r))), r;
}
function vm(e, t, r) {
  switch (r) {
    case "M":
      return b0(e, (a) => a.setMonth(e.getMonth() + t));
    case "y":
      return b0(e, (a) => a.setFullYear(e.getFullYear() + t));
    case "d":
      return Sa(e, Math.round(t));
    case "w":
      return Sa(e, Math.round(7 * t));
    case "h":
      return new Date(e.getTime() + t * 36e5);
    case "m":
      return new Date(e.getTime() + t * 6e4);
    case "s":
      return new Date(e.getTime() + t * 1e3);
    default:
      return new Date(e.getTime() + t);
  }
}
function km(e) {
  return Sa(e, 4 - Mm(e));
}
function M0(e) {
  let t = km(e), r = new Date(t.getFullYear(), 0, 1), a = Mm(r), s = Sa(r, 4 - a + (a > 4 ? 7 : 0)), l = (xf(s) - xf(t)) * 6e4, n = (t.getTime() - s.getTime() - l) / 6048e5;
  return (n < 0 ? Math.ceil(n) || 0 : Math.floor(n)) + 1;
}
var MA = /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, vA = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, kA = "YYYY-MM-DDTHH:mm:ssZ";
function Am(e, t) {
  if (!gs(e)) return "Invalid Date";
  let r = t || kA;
  if (r === "YYYY-MM-DD") return Em(e);
  let a = !1, s = r.replace(MA, (n) => {
    switch (n) {
      case "Q":
        return String(Math.ceil((e.getMonth() + 1) / 3));
      case "Do":
        return "[" + bm(e.getDate()) + "]";
      case "GGGG":
        return String(km(e).getFullYear());
      case "W":
        return String(M0(e));
      case "WW":
        return mr(M0(e), 2);
      case "k":
        return String(e.getHours() || 24);
      case "kk":
        return mr(e.getHours() || 24, 2);
      case "X":
        return String(Math.floor(e.getTime() / 1e3));
      case "x":
        return String(e.getTime());
      case "gggg":
      case "wo":
      case "w":
      case "ww":
      case "z":
      case "zzz":
        return a = !0, n;
      default:
        return n;
    }
  });
  if (a) return;
  let l = e.getHours();
  return s.replace(vA, (n, i) => {
    if (i) return i;
    switch (n) {
      case "YY":
        return String(e.getFullYear()).slice(-2);
      case "YYYY":
        return mr(e.getFullYear(), 4);
      case "M":
        return String(e.getMonth() + 1);
      case "MM":
        return mr(e.getMonth() + 1, 2);
      case "MMM":
        return ai[e.getMonth()].slice(0, 3);
      case "MMMM":
        return ai[e.getMonth()];
      case "D":
        return String(e.getDate());
      case "DD":
        return mr(e.getDate(), 2);
      case "d":
        return String(e.getDay());
      case "dd":
        return ll[e.getDay()].slice(0, 2);
      case "ddd":
        return ll[e.getDay()].slice(0, 3);
      case "dddd":
        return ll[e.getDay()];
      case "H":
        return String(l);
      case "HH":
        return mr(l, 2);
      case "h":
        return String(l % 12 || 12);
      case "hh":
        return mr(l % 12 || 12, 2);
      case "a":
        return l < 12 ? "am" : "pm";
      case "A":
        return l < 12 ? "AM" : "PM";
      case "m":
        return String(e.getMinutes());
      case "mm":
        return mr(e.getMinutes(), 2);
      case "s":
        return String(e.getSeconds());
      case "ss":
        return mr(e.getSeconds(), 2);
      case "SSS":
        return mr(e.getMilliseconds(), 3);
      case "Z":
        return $0(e);
      default:
        return $0(e).replace(":", "");
    }
  });
}
function Em(e) {
  let t = e.getFullYear(), r = e.getMonth() + 1, a = e.getDate();
  return (t >= 1e3 && t <= 9999 ? t : mr(t, 4)) + (r < 10 ? "-0" : "-") + r + (a < 10 ? "-0" : "-") + a;
}
var AA = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, EA = /\[[^\]]+]/g, v0 = /\d/, Ni = /\d\d/, TA = /\d{3}/, CA = /\d{4}/, Nr = /\d\d?/, SA = /[+-]?\d+/, k0 = /[+-]\d\d:?(\d\d)?|Z/, Ri = /\d*[^-_:/,()\s\d]+/;
function tr(e) {
  return (t, r) => (t[e] = +r, !0);
}
var A0 = (e, t) => {
  if (t === "Z") return e.offset = 0, !0;
  let r = t.match(/([+-]|\d\d)/g), a = +r[1] * 60 + (+r[2] || 0);
  return e.offset = a === 0 ? 0 : r[0] === "+" ? -a : a, !0;
};
function E0(e) {
  return (t, r) => {
    let a = e.indexOf(r) + 1;
    return a < 1 ? !1 : (t.month = a % 12 || a, !0);
  };
}
var _A = /* @__PURE__ */ new Map([["A", { re: Ri, read: (e, t) => (e.afternoon = t === "PM", !0) }], ["a", { re: Ri, read: (e, t) => (e.afternoon = t === "pm", !0) }], ["Q", { re: v0, read: (e, t) => (e.month = (+t - 1) * 3 + 1, !0) }], ["S", { re: v0, read: (e, t) => (e.milliseconds = +t * 100, !0) }], ["SS", { re: Ni, read: (e, t) => (e.milliseconds = +t * 10, !0) }], ["SSS", { re: TA, read: (e, t) => (e.milliseconds = +t, !0) }], ["s", { re: Nr, read: tr("seconds") }], ["ss", { re: Nr, read: tr("seconds") }], ["m", { re: Nr, read: tr("minutes") }], ["mm", { re: Nr, read: tr("minutes") }], ["H", { re: Nr, read: tr("hours") }], ["h", { re: Nr, read: tr("hours") }], ["HH", { re: Nr, read: tr("hours") }], ["hh", { re: Nr, read: tr("hours") }], ["D", { re: Nr, read: tr("day") }], ["DD", { re: Ni, read: tr("day") }], ["Do", { re: Ri, read: (e, t) => {
  let r = t.match(/\d+/);
  if (!r) return !1;
  e.day = +r[0], e.dayGiven = !0;
  for (let a = 1; a <= 31; a++) bm(a) === t && (e.day = a);
  return !0;
} }], ["w", { re: Nr, read: tr("week") }], ["ww", { re: Ni, read: tr("week") }], ["M", { re: Nr, read: tr("month") }], ["MM", { re: Ni, read: tr("month") }], ["MMM", { re: Ri, read: E0(ai.map((e) => e.slice(0, 3))) }], ["MMMM", { re: Ri, read: E0(ai) }], ["Y", { re: SA, read: tr("year") }], ["YY", { re: Ni, read: (e, t) => (e.year = +t + (+t > 68 ? 1900 : 2e3), !0) }], ["YYYY", { re: CA, read: tr("year") }], ["Z", { re: k0, read: A0 }], ["ZZ", { re: k0, read: A0 }]]), T0, yn = null;
function IA(e) {
  if (e === T0) return yn;
  if (T0 = e, yn = null, /[Ll]/.test(e.replace(EA, ""))) return null;
  let t = e.match(AA);
  return t ? (yn = t.map((r) => _A.get(r) ?? r.replace(/^\[|\]$/g, "")), yn) : null;
}
function NA(e, t, r) {
  if (t === "x" || t === "X") return new Date((t === "X" ? 1e3 : 1) * Number(e));
  let a = IA(t);
  if (!a) return;
  let s = {}, l = e, n = 0;
  for (let g of a) {
    if (typeof g == "string") {
      n += g.length;
      continue;
    }
    let y = g.re.exec(l.slice(n));
    if (!y || !g.read(s, y[0])) return;
    l = l.replace(y[0], "");
  }
  s.afternoon !== void 0 && s.hours !== void 0 && (s.afternoon ? s.hours < 12 && (s.hours += 12) : s.hours === 12 && (s.hours = 0));
  let i = s.dayGiven || s.day ? s.day : !s.year && !s.month ? r.getDate() : 1, o = s.year || r.getFullYear(), h = 0;
  s.year && !s.month || (h = s.month > 0 ? s.month - 1 : r.getMonth());
  let c = s.hours || 0, u = s.minutes || 0, d = s.seconds || 0, p = s.milliseconds || 0;
  if (s.offset !== void 0) return new Date(Date.UTC(o, h, i, c, u, d, p + s.offset * 6e4));
  if (!s.week) return new Date(o, h, i, c, u, d, p);
}
function RA(e, t, r) {
  let a = NA(e, t, r);
  return a && gs(a) && Am(a, t) === e ? a : void 0;
}
var DA = /^[YMDHhmsSZXx\-/.:, T]*$/, LA = /^\s*(active|done|crit|milestone|vert)\s*$/, OA = /^after\s+([\d\w- ]+)/, FA = /^until\s+([\d\w- ]+)/, zA = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/, PA = /[\s,]+/, WA = /^\d+$/, BA = new Set(ll.map((e) => e.toLowerCase())), GA = 4e8, HA = 400, UA = 200, YA = 400;
function Tm(e) {
  let t = e === void 0 ? NaN : +e;
  return Number.isFinite(t) ? t : Date.now();
}
function jA(e) {
  let t = zA.exec(e.trim());
  return t ? [Number.parseFloat(t[1]), t[2]] : [NaN, "ms"];
}
function C0(e, t) {
  let r = new Set(e);
  for (let a of t.toLowerCase().split(PA)) a !== "" && r.add(a);
  return [...r];
}
var qA = class {
  type = "gantt";
  title;
  accTitle;
  accDescr;
  dateFormat = "";
  axisFormat = "";
  tickInterval;
  todayMarker = "";
  includes = [];
  excludes = [];
  inclusiveEndDates = !1;
  topAxis = !1;
  displayMode = "";
  weekday;
  weekend = "saturday";
  sections = [];
  links = /* @__PURE__ */ new Map();
  tasks = [];
  byId = /* @__PURE__ */ new Map();
  currentSection = "";
  taskCount = 0;
  lastOrder = 0;
  lastTaskId;
  options;
  now = 0;
  work = 0;
  includeSet = /* @__PURE__ */ new Set();
  excludeSet = /* @__PURE__ */ new Set();
  excludedDays = [];
  datedTokens = !1;
  constructor(e = {}) {
    this.options = e;
  }
  setDateFormat(e) {
    this.dateFormat = e;
  }
  enableInclusiveEndDates() {
    this.inclusiveEndDates = !0;
  }
  TopAxis() {
    this.topAxis = !0;
  }
  setAxisFormat(e) {
    this.axisFormat = e;
  }
  setTickInterval(e) {
    this.tickInterval = e;
  }
  setTodayMarker(e) {
    this.todayMarker = e;
  }
  setIncludes(e) {
    this.includes = C0(this.includes, e);
  }
  setExcludes(e) {
    this.excludes = C0(this.excludes, e);
  }
  setWeekday(e) {
    this.weekday = e;
  }
  setWeekend(e) {
    this.weekend = e;
  }
  setDiagramTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addSection(e) {
    this.currentSection = e, this.sections.push(e);
  }
  addTask(e, t) {
    let r = (t.startsWith(":") ? t.slice(1) : t).split(","), a = { id: "", task: e, section: this.currentSection, startTime: void 0, endTime: void 0, renderEndTime: null, manualEndTime: !1, processed: !1, active: !1, done: !1, crit: !1, milestone: !1, vert: !1, order: -1, classes: [], prevTaskId: this.lastTaskId, raw: { data: t, start: void 0, end: "" } }, s;
    for (; r.length > 0 && (s = LA.exec(r[0])) !== null; ) a[s[1]] = !0, r.shift();
    if (r.length === 0) throw new at(`Task "${e.trim()}" needs a duration or an end date.`, "semantic", { type: "gantt" });
    if (r.length > 3) throw new at(`Task "${e.trim()}" has too many fields. A task takes an id, a start, and an end or duration.`, "semantic", { type: "gantt" });
    for (let l = 0; l < r.length; l++) r[l] = r[l].trim();
    r.length === 3 ? a.id = r[0] : (this.taskCount++, a.id = "task" + this.taskCount), r.length > 1 && (a.raw.start = r[r.length - 2]), a.raw.end = r[r.length - 1], a.vert || (a.order = this.lastOrder++), this.tasks.push(a), this.lastTaskId = a.id, this.byId.set(a.id, a);
  }
  setLink(e, t) {
    let r = ni(t);
    for (let a of e.split(",")) this.byId.has(a) && this.links.set(a, r);
    this.setClass(e, "clickable");
  }
  setClickEvent(e, t, r) {
    this.setClass(e, "clickable");
  }
  setClass(e, t) {
    for (let r of e.split(",")) this.byId.get(r)?.classes.push(t);
  }
  getTasks(e) {
    this.now = Tm(e), this.work = 0, this.includeSet = new Set(this.includes), this.excludeSet = new Set(this.excludes);
    let t = this.weekend === "friday" ? 5 : this.weekend === "saturday" ? 6 : NaN, r = this.excludeSet.has("weekends");
    this.excludedDays = ll.map((s, l) => {
      let n = l || 7;
      return r && (n === t || n === t + 1) || this.excludeSet.has(s.toLowerCase());
    }), this.datedTokens = this.includes.length > 0 || !DA.test(this.dateFormat.trim());
    for (let s of this.excludes) s !== "weekends" && !BA.has(s) && (this.datedTokens = !0);
    for (let s of this.tasks) s.startTime = s.endTime = void 0, s.renderEndTime = null, s.processed = s.manualEndTime = !1;
    let a = this.compileTasks();
    for (let s = 0; !a && s < 10; s++) a = this.compileTasks();
    return this.tasks;
  }
  isInvalidDate(e) {
    let t = this.excludedDays[e.getDay()];
    if (!this.datedTokens) return t;
    let r = this.dateFormat.trim(), a = Em(e), s = a;
    this.spend(UA), r !== "YYYY-MM-DD" && (this.spend(YA + r.length * 8), s = Am(e, r));
    let l = (n) => n.has(a) || s !== void 0 && n.has(s);
    return l(this.includeSet) ? !1 : t || l(this.excludeSet);
  }
  spend(e) {
    if (this.work += e, this.work > GA) throw new at("The gantt chart takes too much work to schedule.", "limit", { type: "gantt" });
  }
  parse(e, t) {
    return this.spend((t.length + 1) * (e.length + 1)), RA(e, t, new Date(this.now));
  }
  today() {
    let e = new Date(this.now);
    return e.setHours(0, 0, 0, 0), e;
  }
  warn(e) {
    this.options.warn && this.options.warn(e());
  }
  compileTasks() {
    let e = !0;
    for (let t of this.tasks) this.compileTask(t), e = e && t.processed;
    return e;
  }
  compileTask(e) {
    let t = e.raw.start;
    if (t === void 0) {
      let r = e.prevTaskId === void 0 ? void 0 : this.byId.get(e.prevTaskId);
      e.startTime = r ? r.endTime : this.today();
    } else {
      let r = this.getStartDate(t);
      r && (e.startTime = r);
    }
    e.startTime && (e.endTime = this.getEndDate(e.startTime, e.raw.end), e.endTime && (e.processed = !0, e.manualEndTime = this.parse(e.raw.end, "YYYY-MM-DD") !== void 0, this.checkTaskDates(e)));
  }
  references(e, t) {
    let r = [], a;
    for (let s of t.split(" ")) {
      if (s === "") continue;
      let l = this.byId.get(s);
      l ? r.push(l) : (a ??= []).push(s);
    }
    if (a) {
      let s = a;
      this.warn(() => `Gantt: "${e}" refers to task ids that do not exist: ${s.join(", ")}.`);
    }
    return r;
  }
  getStartDate(e) {
    let t = e.trim(), r = this.dateFormat.trim();
    if ((r === "x" || r === "X") && WA.test(t)) return this.checked(new Date(Number(t)), t);
    let a = OA.exec(t);
    if (a !== null) {
      let n = this.references("after", a[1]), i;
      for (let o of n) (!i || o.endTime > i.endTime) && (i = o);
      return i ? i.endTime : this.today();
    }
    let s = this.parse(t, r);
    if (s) return s;
    let l = new Date(t);
    if (!gs(l) || l.getFullYear() < -1e4 || l.getFullYear() > 1e4) throw new at("Invalid date:" + t, "semantic", { type: "gantt" });
    return l;
  }
  checked(e, t) {
    if (!gs(e)) throw new at("Invalid date:" + t, "semantic", { type: "gantt" });
    return e;
  }
  getEndDate(e, t) {
    let r = t.trim(), a = FA.exec(r);
    if (a !== null) {
      let h = this.references("until", a[1]), c;
      for (let u of h) (!c || u.startTime < c.startTime) && (c = u);
      return c ? c.startTime : this.today();
    }
    let s = this.dateFormat.trim(), l = this.parse(r, s);
    if (l) return this.inclusiveEndDates ? Sa(l, 1) : l;
    let [n, i] = jA(r);
    if (Number.isNaN(n)) return this.warn(() => `Gantt: "${r}" is neither a date in the "${s}" format nor a duration such as "3d", so the task gets no duration.`), new Date(e);
    let o = vm(e, n, i);
    return gs(o) ? o : new Date(e);
  }
  checkTaskDates(e) {
    if (this.excludes.length === 0 || e.manualEndTime) return;
    let t = Sa(e.startTime, 1), r = new Date(e.endTime), a = +Sa(r, 1e4), s = !1, l = null;
    for (; +t <= +r; ) {
      if (this.spend(HA), s || (l = +r), s = this.isInvalidDate(t), s && (r.setDate(r.getDate() + 1), +r > a)) throw new at("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.", "semantic", { type: "gantt" });
      t.setDate(t.getDate() + 1);
    }
    e.endTime = r, e.renderEndTime = l === null ? null : new Date(l);
  }
}, VA = ["$end", "INVALID", "open_directive", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "NL", "href", "callbackname", "callbackargs", "click", "gantt", "dateFormat", "inclusiveEndDates", "topAxis", "axisFormat", "tickInterval", "includes", "excludes", "todayMarker", "weekday_monday", "weekday_tuesday", "weekday_wednesday", "weekday_thursday", "weekday_friday", "weekday_saturday", "weekday_sunday", "weekend_friday", "weekend_saturday", "date", "title", "accDescription", "section", "taskTxt", "taskData", ":", "EOF"], KA = /accTitle\s*:\s*/iy, XA = /accDescr\s*:\s*/iy, ZA = /accDescr\s*\{\s*/iy, QA = /href\s+"/iy, JA = /call\s+/iy, e4 = /click\s+/iy, t4 = /\(\s*\)/y, Nc = /weekday\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/iy, r4 = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], Rc = /weekend\s+(?:(friday)|saturday)\b/iy, a4 = /\d\d\d\d-\d\d-\d\d\b/y, l4 = /title[^\S\r\n]*(?=[\r\n]|$)/iy, i4 = /* @__PURE__ */ new Map([[97, [[/axisFormat\s[^#\n;]+/iy, 17], [/accDescription\s[^#\n;]+/iy, 33]]], [103, [[/gantt\b/iy, 13]]], [100, [[/dateFormat\s[^#\n;]+/iy, 14]]], [105, [[/inclusiveEndDates\b/iy, 15], [/includes\s[^#\n;]+/iy, 19]]], [116, [[/topAxis\b/iy, 16], [/tickInterval\s[^#\n;]+/iy, 18], [/todayMarker\s[^\n;]+/iy, 21], [/title[^\S\r\n][^\n]+/iy, 32]]], [101, [[/excludes\s[^#\n;]+/iy, 20]]], [115, [[/section\s[^\n]+/iy, 34]]]]);
function s4(e) {
  let t = e.length, r = [], a = [], s = [], l = 0, n = 0, i = (u, d, p) => {
    r.push(u), a.push(e.slice(d, p)), s.push(d), n = p;
  }, o = (u) => (u.lastIndex = n, u.test(e) ? u.lastIndex : -1), h = (u, d) => {
    let p = e.indexOf(u, d);
    return p === -1 ? t : p;
  }, c = (u) => {
    let d;
    switch (u | 32) {
      case 97:
        if ((d = o(KA)) >= 0) return l = 1, i(3, n, d), !0;
        if ((d = o(XA)) >= 0) return l = 2, i(5, n, d), !0;
        if ((d = o(ZA)) >= 0) return l = 3, n = d, !0;
        break;
      case 104:
        if ((d = o(QA)) >= 0) return l = 4, n = d, !0;
        break;
      case 99:
        if ((d = o(JA)) >= 0) return l = 5, n = d, !0;
        if ((d = o(e4)) >= 0) return l = 7, n = d, !0;
        break;
      case 116:
        if ((d = o(l4)) >= 0) return n = d, !0;
        break;
      case 119: {
        Nc.lastIndex = n;
        let g = Nc.exec(e);
        if (g) return i(22 + r4.indexOf(g[1].toLowerCase()), n, Nc.lastIndex), !0;
        if (Rc.lastIndex = n, g = Rc.exec(e), g) return i(g[1] !== void 0 ? 29 : 30, n, Rc.lastIndex), !0;
        break;
      }
    }
    let p = i4.get(u | 32);
    if (p) {
      for (let [g, y] of p) if ((d = o(g)) >= 0) return i(y, n, d), !0;
    }
    return !1;
  };
  for (; ; ) {
    if (n >= t) {
      let d = 38;
      switch (l) {
        case 1:
          d = 4;
          break;
        case 2:
          d = 6;
          break;
        case 3:
          d = 7;
          break;
        case 4:
          d = 9;
          break;
        case 5:
          d = 10;
          break;
        case 6:
          d = 11;
          break;
        case 7:
          d = 12;
          break;
      }
      i(d, t, t);
      break;
    }
    let u = e.charCodeAt(n);
    switch (l) {
      case 0: {
        let d = e.charCodeAt(n + 1);
        if (u === 37) if (d !== 37) {
          let p = h(`
`, n + 1);
          for (; e.charCodeAt(p) === 10; ) p++;
          n = p;
        } else {
          if (e.charCodeAt(n + 2) === 123) return i(2, n, n + 3), i(1, n, n), { types: r, texts: a, starts: s };
          n = h(`
`, n + 2);
        }
        else if (u === 10) {
          let p = n + 1;
          for (; e.charCodeAt(p) === 10; ) p++;
          i(8, n, p);
        } else if (Ke(u)) for (n++; n < t && Ke(e.charCodeAt(n)); ) n++;
        else {
          if (c(u)) break;
          if (u >= 48 && u <= 57 && o(a4) >= 0) i(31, n, n + 10);
          else if (u !== 58) {
            let p = n + 1;
            for (; p < t; ) {
              let g = e.charCodeAt(p);
              if (g === 58 || g === 10) break;
              p++;
            }
            i(35, n, p);
          } else {
            let p = n + 1;
            for (; p < t; ) {
              let g = e.charCodeAt(p);
              if (g === 35 || g === 10 || g === 59) break;
              p++;
            }
            i(p > n + 1 ? 36 : 37, n, p);
          }
        }
        break;
      }
      case 1:
      case 2: {
        let d = l === 1 ? 4 : 6;
        l = 0, i(d, n, h(`
`, n));
        break;
      }
      case 3:
        u === 125 ? (l = 0, n++) : i(7, n, h("}", n));
        break;
      case 4:
        u === 34 ? (l = 0, n++) : i(9, n, h('"', n));
        break;
      case 5:
        if (u === 40) {
          let d = o(t4);
          d >= 0 ? (l = 0, n = d) : (l = 6, n++);
        } else i(10, n, h("(", n));
        break;
      case 6:
        u === 41 ? (l = 0, n++) : i(11, n, h(")", n));
        break;
      case 7:
        if (Ke(u)) l = 0, n++;
        else {
          let d = n + 1;
          for (; d < t && !Ke(e.charCodeAt(d)); ) d++;
          i(12, n, d);
        }
        break;
    }
  }
  return r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var n4 = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], S0 = "'EOF', 'SPACE', 'NL', 'weekday_monday', 'weekday_tuesday', 'weekday_wednesday', 'weekday_thursday', 'weekday_friday', 'weekday_saturday', 'weekday_sunday', 'weekend_friday', 'weekend_saturday', 'dateFormat', 'inclusiveEndDates', 'topAxis', 'axisFormat', 'tickInterval', 'excludes', 'includes', 'todayMarker', 'title', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'section', 'taskTxt', 'click'", Po = new Uint8Array(39);
for (let e = 22; e <= 30; e++) Po[e] = 1;
for (let e of [38, 8, 14, 15, 16, 17, 18, 20, 19, 21, 32, 3, 5, 7, 34, 35, 12]) Po[e] = 1;
function o4(e, t) {
  let { types: r, texts: a, starts: s } = s4(e), l = 0, n = (o) => {
    let h = r[l];
    throw bt("gantt", e, s[l], `Expecting ${o}, got '${h === 0 ? "1" : VA[h]}'`);
  }, i = (o = "") => {
    Po[r[l]] !== 1 && n(S0 + o);
  };
  for (r[l] !== 13 && n("'gantt'"), l++; ; ) {
    let o = r[l], h = a[l];
    switch (Po[o] !== 1 && n(S0), l++, o) {
      case 38:
        if (r[l] === 0) return;
        i();
        break;
      case 8:
        break;
      case 14:
        i(), t.setDateFormat(h.slice(11));
        break;
      case 15:
        i(), t.enableInclusiveEndDates();
        break;
      case 16:
        i(), t.TopAxis();
        break;
      case 17:
        i(), t.setAxisFormat(h.slice(11));
        break;
      case 18:
        i(), t.setTickInterval(h.slice(13));
        break;
      case 20:
        i(), t.setExcludes(h.slice(9));
        break;
      case 19:
        i(), t.setIncludes(h.slice(9));
        break;
      case 21:
        i(), t.setTodayMarker(h.slice(12));
        break;
      case 29:
        i(), t.setWeekend("friday");
        break;
      case 30:
        i(), t.setWeekend("saturday");
        break;
      case 32:
        i(), t.setDiagramTitle(h.slice(6));
        break;
      case 3: {
        r[l] !== 4 && n("'acc_title_value'");
        let c = a[l++];
        i(), t.setAccTitle(c.trim());
        break;
      }
      case 5: {
        r[l] !== 6 && n("'acc_descr_value'");
        let c = a[l++];
        i(), t.setAccDescription(c.trim());
        break;
      }
      case 7:
        i(), t.setAccDescription(h.trim());
        break;
      case 34:
        i(), t.addSection(h.slice(8));
        break;
      case 35: {
        r[l] !== 36 && n("'taskData'");
        let c = a[l++];
        i(), t.addTask(h, c);
        break;
      }
      case 12: {
        let c, u = null, d;
        r[l] === 10 ? (c = a[l++], r[l] === 11 && (u = a[l++]), r[l] === 9 ? (d = a[l++], i()) : i(u === null ? ", 'callbackargs', 'href'" : ", 'href'")) : r[l] === 9 ? (d = a[l++], r[l] === 10 ? (c = a[l++], r[l] === 11 ? (u = a[l++], i()) : i(", 'callbackargs'")) : i(", 'callbackname'")) : n("'callbackname', 'href'"), c !== void 0 && t.setClickEvent(h, c, u), d !== void 0 && t.setLink(h, d);
        break;
      }
      default:
        i(), t.setWeekday(n4[o - 22]);
    }
  }
}
var ua = 1e3, pa = 60 * ua, tl = 60 * pa, ol = 24 * tl, Os = 7 * ol, wf = 30 * ol, Wo = 365 * ol;
function co(e) {
  e.setHours(0, 0, 0, 0);
}
function dh(e) {
  return { floor(t) {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), co(t);
  }, offset: (t, r) => t.setDate(t.getDate() + r * 7), cycle: 1 / 0, ms: Os };
}
var ms = { millisecond: { floor: () => {
}, offset: (e, t) => e.setTime(+e + t), cycle: 1 / 0, ms: 1 }, second: { floor: (e) => e.setTime(+e - e.getMilliseconds()), offset: (e, t) => e.setTime(+e + t * ua), field: (e) => e.getUTCSeconds(), cycle: 60, ms: ua }, minute: { floor: (e) => e.setTime(+e - e.getMilliseconds() - e.getSeconds() * ua), offset: (e, t) => e.setTime(+e + t * pa), field: (e) => e.getMinutes(), cycle: 60, ms: pa }, hour: { floor: (e) => e.setTime(+e - e.getMilliseconds() - e.getSeconds() * ua - e.getMinutes() * pa), offset: (e, t) => e.setTime(+e + t * tl), field: (e) => e.getHours(), cycle: 24, ms: tl }, day: { floor: co, offset: (e, t) => e.setDate(e.getDate() + t), field: (e) => e.getDate() - 1, cycle: 31, ms: ol }, month: { floor(e) {
  e.setDate(1), co(e);
}, offset: (e, t) => e.setMonth(e.getMonth() + t), field: (e) => e.getMonth(), cycle: 12, ms: wf }, year: { floor(e) {
  e.setMonth(0, 1), co(e);
}, offset: (e, t) => e.setFullYear(e.getFullYear() + t), cycle: 1 / 0, ms: Wo } };
function Bo(e, t, r) {
  return Math.floor((+t - +e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * pa) / r);
}
function h4(e, t) {
  return (e % t + t) % t;
}
function fo(e, t, r) {
  let a = e === "week" ? dh(r) : ms[e];
  if (t <= 1) return a;
  if (e === "millisecond") return { ...a, floor: (n) => n.setTime(Math.floor(+n / t) * t), offset: (n, i) => n.setTime(+n + i * t) };
  if (e === "year") return { ...a, floor(n) {
    n.setFullYear(Math.floor(n.getFullYear() / t) * t), a.floor(n);
  }, offset: (n, i) => n.setFullYear(n.getFullYear() + i * t) };
  if (e === "week") {
    let n = /* @__PURE__ */ new Date(0);
    return a.floor(n), { ...a, floor(i) {
      a.floor(i), a.offset(i, -h4(Bo(n, i, Os), t));
    }, offset: (i, o) => a.offset(i, o * t) };
  }
  let s = a.field, l = (n) => s(n) % t === 0;
  return { ...a, floor(n) {
    for (a.floor(n); Number.isFinite(+n) && !l(n); a.floor(n)) n.setTime(+n - 1);
  }, offset(n, i) {
    for (let o = 0; o < i && Number.isFinite(+n); o++) do
      a.offset(n, 1);
    while (Number.isFinite(+n) && !l(n));
  } };
}
function Cm(e, t, r, a) {
  let s = new Date(t - 1);
  e.floor(s), e.offset(s, 1), e.floor(s);
  let l = [], n = -1 / 0;
  for (; +s <= r && +s > n; ) {
    if (l.length >= a) return;
    n = +s, l.push(n), e.offset(s, 1), e.floor(s);
  }
  return l;
}
function _0(e, t, r) {
  let a = (t - e) / Math.max(0, r), s = Math.floor(Math.log10(a)), l = a / Math.pow(10, s), n = l >= Math.sqrt(50) ? 10 : l >= Math.sqrt(10) ? 5 : l >= Math.SQRT2 ? 2 : 1;
  return Math.pow(10, s) * n;
}
var Al = [["second", 1, ua], ["second", 5, 5 * ua], ["second", 15, 15 * ua], ["second", 30, 30 * ua], ["minute", 1, pa], ["minute", 5, 5 * pa], ["minute", 15, 15 * pa], ["minute", 30, 30 * pa], ["hour", 1, tl], ["hour", 3, 3 * tl], ["hour", 6, 6 * tl], ["hour", 12, 12 * tl], ["day", 1, ol], ["day", 2, 2 * ol], ["week", 1, Os], ["month", 1, wf], ["month", 3, 3 * wf], ["year", 1, Wo]];
function c4(e, t, r) {
  let a = (t - e) / r, s = 0;
  for (; s < Al.length && Al[s][2] <= a; ) s++;
  let l;
  if (s === Al.length) l = fo("year", Math.max(1, _0(e / Wo, t / Wo, r)), 0);
  else if (s === 0) l = fo("millisecond", Math.max(_0(e, t, r), 1), 0);
  else {
    let [n, i] = Al[a / Al[s - 1][2] < Al[s][2] / a ? s - 1 : s];
    l = fo(n, i, 0);
  }
  return Cm(l, e, t, 4 * r + 8) ?? [];
}
var d4 = /^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/, f4 = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function u4(e, t, r, a, s) {
  let l = d4.exec(e);
  if (!l) return;
  let n = parseInt(l[1], 10), i = l[2], o = fo(i, n, Math.max(0, f4.indexOf(t)));
  if (!((a - r) / (Math.min(n, o.cycle) * o.ms) > s)) return Cm(o, r, a, s);
}
function jt(e, t, r) {
  let a = e < 0 ? "-" : "", s = String(a ? -e : e);
  return a + (s.length < r ? t.repeat(r - s.length) + s : s);
}
function Ta(e, t) {
  let r = /* @__PURE__ */ new Date(+e);
  return t.floor(r), r;
}
function I0(e, t) {
  let r = dh(t), a = Ta(e, ms.year);
  return Bo(Ta(new Date(+a - 1), r), Ta(e, r), Os);
}
function Dc(e) {
  let t = dh(4), r = e.getDay(), a = Ta(r >= 4 || r === 0 ? e : new Date(+e - 1), t);
  return r >= 4 || r === 0 || (t.offset(a, 1), t.floor(a)), a;
}
var p4 = /* @__PURE__ */ new Map([["-", ""], ["_", " "], ["0", "0"]]);
function uo(e, t) {
  let r = "", a = 0, s = e.length;
  for (let l = 0; l < s; l++) {
    if (e.charCodeAt(l) !== 37) continue;
    r += e.slice(a, l);
    let n = e.charAt(++l), i = p4.get(n);
    i !== void 0 ? n = e.charAt(++l) : i = n === "e" ? " " : "0", r += g4(n, t, i), a = l + 1;
  }
  return r + e.slice(a);
}
function g4(e, t, r) {
  switch (e) {
    case "a":
      return ll[t.getDay()].slice(0, 3);
    case "A":
      return ll[t.getDay()];
    case "b":
      return ai[t.getMonth()].slice(0, 3);
    case "B":
      return ai[t.getMonth()];
    case "c":
      return uo("%x, %X", t);
    case "d":
    case "e":
      return jt(t.getDate(), r, 2);
    case "f":
      return jt(t.getMilliseconds(), r, 3) + "000";
    case "g":
      return jt(Dc(t).getFullYear() % 100, r, 2);
    case "G":
      return jt(Dc(t).getFullYear() % 1e4, r, 4);
    case "H":
      return jt(t.getHours(), r, 2);
    case "I":
      return jt(t.getHours() % 12 || 12, r, 2);
    case "j":
      return jt(1 + Bo(Ta(t, ms.year), Ta(t, ms.day), ol), r, 3);
    case "L":
      return jt(t.getMilliseconds(), r, 3);
    case "m":
      return jt(t.getMonth() + 1, r, 2);
    case "M":
      return jt(t.getMinutes(), r, 2);
    case "p":
      return t.getHours() >= 12 ? "PM" : "AM";
    case "q":
      return String(1 + Math.floor(t.getMonth() / 3));
    case "Q":
      return String(+t);
    case "s":
      return String(Math.floor(+t / 1e3));
    case "S":
      return jt(t.getSeconds(), r, 2);
    case "u":
      return String(t.getDay() || 7);
    case "U":
      return jt(I0(t, 0), r, 2);
    case "V": {
      let a = Dc(t), s = Ta(a, ms.year), l = Ta(s, dh(4));
      return jt(Bo(l, a, Os) + (s.getDay() === 4 ? 1 : 0), r, 2);
    }
    case "w":
      return String(t.getDay());
    case "W":
      return jt(I0(t, 1), r, 2);
    case "x":
      return uo("%-m/%-d/%Y", t);
    case "X":
      return uo("%-I:%M:%S %p", t);
    case "y":
      return jt(t.getFullYear() % 100, r, 2);
    case "Y":
      return jt(t.getFullYear() % 1e4, r, 4);
    case "Z": {
      let a = t.getTimezoneOffset(), s = Math.abs(a);
      return (a > 0 ? "-" : "+") + jt(Math.floor(s / 60), "0", 2) + jt(s % 60, "0", 2);
    }
    case "%":
      return "%";
    default:
      return e;
  }
}
var m4 = 800, y4 = 240, El = 8, x4 = /<br\s*\/?>/gi;
function Ur(e, t, r, a) {
  let s = e.gantt?.[t];
  return typeof s == "number" && Number.isFinite(s) ? Math.min(a, Math.max(r, s)) : void 0;
}
function Lc(e, t) {
  let r = e.gantt?.[t];
  return typeof r == "string" ? r : void 0;
}
function w4(e, t) {
  return e.gantt?.[t] === !0;
}
function N0(e, t, r) {
  let a = je(e.replace(x4, " "), !1, t, r, 4e3);
  return a.lines.length <= 1 ? a : { ...a, lines: [a.lines[0]], widths: [a.widths[0]], width: a.widths[0], height: a.lineHeight };
}
function po(e) {
  return Number.isFinite(+e.startTime) && Number.isFinite(+e.endTime);
}
function $4(e, t, r) {
  let a = e.filter(po).sort((n, i) => +n.startTime - +i.startTime || n.order - i.order), s = [];
  for (let n of a) {
    let i = +n.startTime, o = 0;
    for (; o < s.length && i < s[o]; ) o++;
    s[o] = +n.endTime, r.set(n, t + o);
  }
  let l = s.length;
  for (let n of e) r.has(n) || r.set(n, t + l++);
  return Math.max(l, 1);
}
function b4(e, t, r) {
  let a = r.fontSize ?? 16, s = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), l = r.padding ?? 8, n = Tm(r.now), i = Ur(t, "fontSize", 4, 72) ?? Math.round(a * 0.8125), o = Ur(t, "sectionFontSize", 4, 72) ?? i, h = Math.round(a * 0.75), c = Ur(t, "barHeight", 4, 400) ?? Math.round(i * 1.85), u = Ur(t, "barGap", 0, 400) ?? Math.round(c / 4), d = c + u, p = Math.round(Ur(t, "numberSectionStyles", 1, 1e3) ?? 4), g = e.displayMode === "compact", y = e.topAxis || w4(t, "topAxis"), b = e.getTasks(n), x = b.filter(($e) => !$e.vert), v = b.filter(($e) => $e.vert && po($e)), $ = /* @__PURE__ */ new Map();
  for (let $e of x) $.has($e.section) || $.set($e.section, $.size);
  let S = /* @__PURE__ */ new Map(), R = [];
  if (g) {
    let $e = /* @__PURE__ */ new Map();
    for (let be of x) {
      let Ie = $e.get(be.section);
      Ie ? Ie.push(be) : $e.set(be.section, [be]);
    }
    for (let [be, Ie] of $e) {
      let ze = $4(Ie, R.length, S);
      for (let Oe = 0; Oe < ze; Oe++) R.push(be);
    }
  } else for (let $e of x) S.set($e, R.length), R.push($e.section);
  let D = R.length, O = 1 / 0, U = -1 / 0;
  for (let $e of b) po($e) && (O = Math.min(O, +$e.startTime), U = Math.max(U, +$e.endTime));
  let q = O <= U, C = je(e.title, !1, s, a, 4e3, 1), ee = C.height > 0 ? C.height + 16 : 0;
  if (!q) {
    let $e = Math.ceil(Math.max(C.width, 1) + 2 * l), be = Math.ceil(Math.max(C.height, 1) + 2 * l), Ie = Pe(C, $e / 2, l + C.height / 2, ' class="pele-title" font-weight="var(--_tw)"');
    return { svg: xt("gantt", $e, be, a, r, e, Ie), width: $e, height: be, links: [] };
  }
  let ie = /* @__PURE__ */ new Map(), G = 0;
  for (let $e of $.keys()) {
    let be = je($e, !1, s, o, 180);
    ie.set($e, be), G = Math.max(G, be.width);
  }
  let z = e.axisFormat || (e.dateFormat === "D" ? "%d" : Lc(t, "axisFormat") ?? "%Y-%m-%d"), _ = ($e) => uo(z, new Date($e)), T = Math.max(s.width(_(O), h, 0), s.width(_(U), h, 0)), E = l + (Ur(t, "leftPadding", 0, 2e3) ?? Math.max(G > 0 ? G + 24 : 0, T / 2)), M = Ur(t, "rightPadding", 0, 2e3) ?? Math.max(16, T / 2), A = nh(r, Ur(t, "useWidth", 100, 2e4) ?? m4, 280), m = Math.max(y4, A - E - M - l), I = E + m, k = U > O ? m / (U - O) : 0, w = ($e) => k === 0 ? E + m / 2 : E + ($e - O) * k, B = Math.round(h * 1.75), N = Ur(t, "topPadding", 0, 2e3), j = Ur(t, "gridLineStartPadding", 0, 2e3), F = l + ee + (y ? B : 0), Y = Math.max(F, N ?? 0), W = N !== void 0 && j !== void 0 ? Math.max(0, Math.min(N - j, Y - F)) : 0, K = Math.max(D, 1) * d, H = Y + K, te = [], Q = I + M;
  for (let $e of x) {
    let be = N0($e.task, s, i), Ie = S.get($e);
    if (!po($e)) {
      let fe = E + El + be.width / 2;
      Q = Math.max(Q, fe + be.width / 2), te.push({ task: $e, label: be, row: Ie, x0: NaN, x1: NaN, labelX: fe, inside: !1 });
      continue;
    }
    let ze = w(+$e.startTime), Oe = Math.max(w(+($e.renderEndTime ?? $e.endTime)), ze + ($e.milestone ? 0 : 2));
    if ($e.milestone) {
      let fe = ze + (w(+$e.endTime) - ze) / 2;
      ze = fe - c / 2, Oe = fe + c / 2;
    }
    let de = !$e.milestone && be.width + 2 * El <= Oe - ze, Te = (ze + Oe) / 2;
    if (!de) {
      let fe = Oe + El + be.width <= I + M, Ce = ze - El - be.width >= E;
      Te = fe || !Ce ? Oe + El + be.width / 2 : ze - El - be.width / 2, Q = Math.max(Q, Te + be.width / 2);
    }
    te.push({ task: $e, label: be, row: Ie, x0: ze, x1: Oe, labelX: Te, inside: de });
  }
  let L = e.tickInterval || Lc(t, "tickInterval") || "", X = e.weekday ?? Lc(t, "weekday") ?? "sunday", le = Math.max(2, Math.min(10, Math.floor(m / (T + 24)))), J = u4(L, X, O, U, Math.ceil(m / 3)) ?? c4(O, U, le), V = "", Z = "", ae = "", oe = -1 / 0, ue = "", he = H + B / 2 + 2, re = Y - W - B / 2 - 2;
  for (let $e of J) {
    let be = w($e);
    V += `M${f(be)},${f(Y - W)}V${f(H)}`;
    let Ie = _($e), ze = s.width(Ie, h, 0);
    if (be - ze / 2 < oe + 8 || Ie === ue) continue;
    oe = be + ze / 2, ue = Ie, Q = Math.max(Q, oe);
    let Oe = `text-anchor="middle">${it(Ie)}</text>`;
    Z += `<text x="${f(be)}" y="${f(he + h * 0.35)}" ${Oe}`, y && (ae += `<text x="${f(be)}" y="${f(re + h * 0.35)}" ${Oe}`);
  }
  let P = "", ne = "", ce = [], pe = H + B + 4, Me = Math.round(i * 1.5);
  for (let $e of [...v].sort((be, Ie) => +be.startTime - +Ie.startTime)) {
    let be = w(+$e.startTime), Ie = N0($e.task, s, i), ze = Math.max(l + Ie.width / 2, be), Oe = 0;
    for (; Oe < ce.length && ze - Ie.width / 2 < ce[Oe] + 8; ) Oe++;
    ce[Oe] = ze + Ie.width / 2, Q = Math.max(Q, ce[Oe]), P += `<path class="pele-vert" data-id="${Ye($e.id)}" d="M${f(be)},${f(Y - W)}V${f(H)}"/>`, ne += Pe(Ie, ze, pe + Oe * Me + Me / 2, ` class="pele-vert-label" data-id="${Ye($e.id)}"`);
  }
  let xe = Math.ceil(Math.max(Q, l + C.width) + l), ve = Math.ceil(H + B + (ce.length > 0 ? 4 + ce.length * Me : 0) + l), Ae = "", Ee = "";
  for (let $e = 0; $e < D; ) {
    let be = R[$e], Ie = $e + 1;
    for (; Ie < D && R[Ie] === be; ) Ie++;
    let ze = $.get(be) % p, Oe = Y + $e * d, de = (Ie - $e) * d;
    ($.size > 1 || be !== "") && (Ae += `<rect class="pele-section pele-section-${ze}" x="0" y="${f(Oe)}" width="${xe}" height="${f(de)}" fill="${ze % 2 === 0 ? "var(--_s)" : "none"}"/>`);
    let Te = ie.get(be);
    Ee += Pe(Te, l + 8 + Te.width / 2, Oe + de / 2, ` class="pele-section-label" data-id="${Ye(be)}"`, r.icons), $e = Ie;
  }
  let me = "";
  if ((e.excludes.length > 0 || e.includes.length > 0) && +vm(new Date(O), 6, "y") > U) {
    let $e, be, Ie = () => {
      if (!$e || !be) return;
      let ze = new Date($e);
      ze.setHours(0, 0, 0, 0);
      let Oe = new Date(be);
      Oe.setHours(23, 59, 59, 999);
      let de = Math.max(E, w(+ze)), Te = Math.min(I, w(+Oe));
      Te > de && (me += `<rect x="${f(de)}" y="${f(Y)}" width="${f(Te - de)}" height="${f(K)}"/>`), $e = be = void 0;
    };
    for (let ze = new Date(O); +ze <= U; ze = Sa(ze, 1)) e.isInvalidDate(ze) ? ($e ??= ze, be = ze) : Ie();
    Ie();
  }
  let we = [], Se = "";
  for (let $e of te) {
    let be = $e.task, Ie = Y + $e.row * d + d / 2, ze = be.active ? "active" : be.done ? "done" : "", Oe = "pele-task";
    ze && (Oe += " pele-" + ze), be.crit && (Oe += " pele-crit"), be.milestone && (Oe += " pele-milestone"), be.classes.includes("clickable") && (Oe += " pele-clickable");
    let de = "", Te = "";
    if (Number.isNaN($e.x0)) Oe += " pele-unscheduled", Te = ' fill="var(--_m)"';
    else {
      let Fe = be.crit ? af : "var(--_c)", He = ze === "done" ? 'fill="var(--_a)"' : ze === "active" ? `fill="${Fe}" fill-opacity="0.25"` : `fill="${Fe}"`, We = `stroke="${ze === "done" && !be.crit ? "var(--_b)" : Fe}"`;
      if (be.milestone) {
        let Le = ($e.x0 + $e.x1) / 2, et = c / 2;
        de = `<path d="M${f(Le)},${f(Ie - et)}L${f(Le + et)},${f(Ie)}L${f(Le)},${f(Ie + et)}L${f(Le - et)},${f(Ie)}Z" ${He} ${We} stroke-linejoin="round"/>`;
      } else de = `<rect x="${f($e.x0)}" y="${f(Ie - c / 2)}" width="${f($e.x1 - $e.x0)}" height="${f(c)}" ${He} ${We}${wt}/>`;
      $e.inside ? Te = ze === "" ? ' fill="var(--_bg)"' : "" : ze === "done" && (Te = ' fill="var(--_m)"');
    }
    let fe = de + Pe($e.label, $e.labelX, Ie, ` class="pele-label"${Te}`), Ce = e.links.get(be.id);
    Ce !== void 0 && (fe = oi(fe, Ce, be.id, we, r)), Se += `<g class="${Oe}" data-id="${Ye(be.id)}">${fe}</g>`;
  }
  let se = "";
  if (e.todayMarker !== "off" && n >= O && n <= U && U > O) {
    let $e = w(n), be = Y - W, Ie = e.todayMarker ? Dt(e.todayMarker.split(",")).line : "";
    se = `<g class="pele-today"><path d="M${f($e)},${f(be)}V${f(H)}" fill="none" stroke="var(--_c)" stroke-width="2"${Ie}/>` + (Ie ? "" : `<path d="M${f($e - 4)},${f(be - 5)}H${f($e + 4)}L${f($e)},${f(be + 1)}Z" fill="var(--_c)"/>`) + "</g>";
  }
  let ye = `M${f(E)},${f(H)}H${f(I)}` + (y ? `M${f(E)},${f(Y - W)}H${f(I)}` : ""), ke = Pe(C, xe / 2, l + C.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (Ae ? `<g class="pele-sections">${Ae}</g>` : "") + (me ? `<g class="pele-excluded" fill="var(--_a)">${me}</g>` : "") + `<g class="pele-grid" fill="none"><path d="${V}" stroke="var(--_b)" stroke-dasharray="1 3"/><path d="${ye}" stroke="var(--_b)"/></g>` + (P ? `<g class="pele-verts" fill="none" stroke="var(--_l)" stroke-width="1.5" stroke-dasharray="4 3">${P}</g>` : "") + se + `<g class="pele-tasks" font-size="${f(i)}">${Se}</g><g class="pele-section-labels" font-size="${f(o)}">${Ee}</g><g class="pele-axis" font-size="${h}" fill="var(--_m)">${Z}${ae}</g>` + (ne ? `<g class="pele-vert-labels" font-size="${f(i)}">${ne}</g>` : "");
  return { svg: xt("gantt", xe, ve, a, r, e, ke), width: xe, height: ve, links: we };
}
var M4 = { type: "gantt", parse(e, t, r) {
  let a = new qA();
  r && (a.title = r);
  let s = t.gantt?.displayMode;
  return typeof s == "string" && (a.displayMode = s), o4(e, a), a;
}, render: b4 }, Bt = { NORMAL: 0, REVERSE: 1, HIGHLIGHT: 2, MERGE: 3, CHERRY_PICK: 4 };
function hr(e) {
  throw new at(e, "semantic", { type: "gitGraph" });
}
function R0(e) {
  return e === "REVERSE" ? Bt.REVERSE : e === "HIGHLIGHT" ? Bt.HIGHLIGHT : Bt.NORMAL;
}
function v4(e, t) {
  e.dir && t.setDirection(e.dir);
  for (let r of e.statements) k4(r, t);
}
function k4(e, t) {
  switch (e.$type) {
    case "Commit":
      t.commit({ id: e.id, msg: e.message ?? "", type: e.type !== void 0 ? R0(e.type) : Bt.NORMAL, tags: e.tags ?? void 0 });
      break;
    case "Branch":
      t.branch({ name: e.name, order: e.order ?? 0 });
      break;
    case "Merge":
      t.merge({ branch: e.branch, id: e.id ?? "", type: e.type !== void 0 ? R0(e.type) : void 0, tags: e.tags ?? void 0 });
      break;
    case "Checkout":
      t.checkout(e.branch);
      break;
    case "CherryPicking":
      t.cherryPick({ id: e.id, targetId: "", tags: e.tags?.length === 0 ? void 0 : e.tags, parent: e.parent });
      break;
  }
}
function A4(e, t, r) {
  let a = t.gitGraph, s = typeof a?.mainBranchName == "string" ? a.mainBranchName : "main", l = typeof a?.mainBranchOrder == "number" ? a.mainBranchOrder : 0, n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map([[s, null]]), o = /* @__PURE__ */ new Map([[s, l]]), h = [], c = null, u = s, d = "LR", p = 0, g = () => {
    for (let v = p + 1; ; v += 2654435761) {
      let $ = `${p}-${(Math.imul(v, 2654435761) >>> 0).toString(16).padStart(8, "0").slice(0, 7)}`;
      if (!n.has($)) return $;
    }
  }, y = (v) => {
    c = v, n.set(v.id, v), i.set(u, v.id);
  }, b = (v) => {
    i.has(v) || hr(`Trying to checkout branch which is not yet created. (Help try using "branch ${v}")`), u = v;
    let $ = i.get(v);
    c = $ ? n.get($) ?? null : null;
  };
  v4(e, { setDirection(v) {
    d = v;
  }, commit({ msg: v, id: $, type: S, tags: R }) {
    let D = { id: $ || g(), message: v, seq: p++, type: S ?? Bt.NORMAL, tags: R ? [...R] : [], parents: c === null ? [] : [c.id], branch: u };
    n.has(D.id) && h.push(`Commit ID ${D.id} already exists`), y(D);
  }, branch({ name: v, order: $ }) {
    i.has(v) && hr(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${v}")`), i.set(v, c !== null ? c.id : null), o.set(v, $), b(v);
  }, merge({ branch: v, id: $, type: S, tags: R }) {
    let D = i.get(u), O = i.get(v), U = D ? n.get(D) : void 0, q = O ? n.get(O) : void 0;
    U && q && U.branch === v && hr(`Cannot merge branch '${v}' into itself.`), u === v && hr('Incorrect usage of "merge". Cannot merge a branch to itself'), U === void 0 && hr(`Incorrect usage of "merge". Current branch (${u})has no commits`), i.has(v) || hr(`Incorrect usage of "merge". Branch to be merged (${v}) does not exist`), q === void 0 && hr(`Incorrect usage of "merge". Branch to be merged (${v}) has no commits`), U === q && hr('Incorrect usage of "merge". Both branches have same head'), $ && n.has($) && hr(`Incorrect usage of "merge". Commit with id:${$} already exists, use different custom id`), y({ id: $ || g(), message: `merged branch ${v} into ${u}`, seq: p++, parents: c === null ? [] : [c.id, O || ""], branch: u, type: Bt.MERGE, customType: S, customId: !!$, tags: R ? [...R] : [] });
  }, cherryPick({ id: v, targetId: $, tags: S, parent: R }) {
    let D = v ? n.get(v) : void 0;
    if (D === void 0 && hr('Incorrect usage of "cherryPick". Source commit id should exist and provided'), R && !D.parents.includes(R) && hr("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit."), D.type === Bt.MERGE && !R && hr("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified."), $ && n.has($)) return;
    D.branch === u && hr('Incorrect usage of "cherryPick". Source commit is already on current branch');
    let O = i.get(u);
    (!O || !n.has(O)) && hr(`Incorrect usage of "cherry-pick". Current branch (${u})has no commits`), y({ id: g(), message: `cherry-picked ${D.message} into ${u}`, seq: p++, parents: c === null ? [] : [c.id, D.id], branch: u, type: Bt.CHERRY_PICK, tags: S ? S.filter(Boolean) : [`cherry-pick:${D.id}${D.type === Bt.MERGE ? `|parent:${R}` : ""}`] });
  }, checkout: b });
  let x = [...o].map(([v, $], S) => ({ name: v, order: $ ?? parseFloat(`0.${S}`) })).sort((v, $) => v.order - $.order).map((v) => v.name);
  return { type: "gitGraph", title: e.title || r, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, direction: d, commits: n, branches: i, lanes: x, currentBranch: u, head: c, warnings: h };
}
var Sm = { name: "REFERENCE", pattern: /\w([-\./\w]*[-\w])?/y }, _m = [Sm];
function $r(e) {
  return { name: e, pattern: e, longer: _m };
}
var D0 = [$r("cherry-pick"), { name: "gitGraph:", pattern: "gitGraph:" }, $r("HIGHLIGHT"), { ...Pr("gitGraph"), longer: _m }, $r("checkout"), $r("REVERSE"), { name: "parent:", pattern: "parent:" }, $r("commit"), $r("NORMAL"), $r("branch"), { name: "order:", pattern: "order:" }, $r("switch"), { name: "type:", pattern: "type:" }, $r("merge"), { name: "msg:", pattern: "msg:" }, { name: "tag:", pattern: "tag:" }, { name: "id:", pattern: "id:" }, $r("LR"), $r("TB"), $r("BT"), { name: ":", pattern: ":" }, { ...aa, opener: /[\t ]*accDescr\s*{/y }, Br, fi(String.raw`[-./\w]*[-\w]`), { name: "INT", pattern: /0|[1-9][0-9]*(?!\.)/y }, pl, La, Oa, fr, la, ia, Sm];
function E4(e) {
  let t = new Sr(Ar(e, D0, "gitGraph"), D0, "gitGraph"), r = { $type: "GitGraph", statements: [] }, a = () => {
    if (t.kind !== -1) for (t.kind !== 26 && t.fail("a line break or the end of input"); t.kind === 26; ) t.i++;
  }, s = () => t.kind === 31 ? t.take() : t.kind === 25 ? Fr(t.take()) : t.fail("a branch name"), l = () => Fr(t.expect(25)), n = () => (t.kind !== 8 && t.kind !== 5 && t.kind !== 2 && t.fail("NORMAL, REVERSE, or HIGHLIGHT"), t.take());
  for (; t.kind === 26; ) t.i++;
  if (!t.accept(1)) {
    t.expect(3);
    let i = t.kinds[t.i + 1];
    (t.kind === 17 || t.kind === 18 || t.kind === 19) && i === 20 ? (r.$type = "Direction", r.dir = t.take(), t.i++) : t.accept(20);
  }
  for (; t.kind !== -1; ) switch (t.kind) {
    case 26:
      t.i++;
      break;
    case 21:
      r.accDescr = Cr(t.take()), a();
      break;
    case 22:
      r.accTitle = Tr(t.take()), a();
      break;
    case 23:
      r.title = Er(t.take()), a();
      break;
    case 7: {
      t.i++;
      let i = { $type: "Commit", tags: [] };
      for (; ; ) if (t.accept(16)) i.id = l();
      else if (t.accept(15)) i.tags.push(l());
      else if (t.accept(12)) i.type = n();
      else if (t.accept(14) || t.kinds[t.i] === 25) i.message = l();
      else break;
      a(), r.statements.push(i);
      break;
    }
    case 9: {
      t.i++;
      let i = { $type: "Branch", name: s() };
      t.accept(10) && (i.order = parseInt(t.expect(24))), a(), r.statements.push(i);
      break;
    }
    case 13: {
      t.i++;
      let i = { $type: "Merge", branch: s(), tags: [] };
      for (; ; ) if (t.accept(16)) i.id = l();
      else if (t.accept(15)) i.tags.push(l());
      else if (t.accept(12)) i.type = n();
      else break;
      a(), r.statements.push(i);
      break;
    }
    case 4:
    case 11: {
      t.i++;
      let i = { $type: "Checkout", branch: s() };
      a(), r.statements.push(i);
      break;
    }
    case 0: {
      t.i++;
      let i = { $type: "CherryPicking", tags: [] };
      for (; ; ) if (t.accept(16)) i.id = l();
      else if (t.accept(15)) i.tags.push(l());
      else if (t.accept(6)) i.parent = l();
      else break;
      a(), r.statements.push(i);
      break;
    }
    default:
      t.fail("a statement, a title, or a line break");
  }
  return r;
}
var T4 = /<(?!br\s*\/?>)/gi, C4 = /:fa-/g, S4 = /<br\s*\/?>|ﬂ°°?\w+¶ß|&#?\w+;|[\ud800-\udbff][\udc00-\udfff]|[\s\S]/gi;
function _a(e, t, r, a, s = 0) {
  let l = e;
  return l !== void 0 && (l.includes("<") && (l = l.replace(T4, "&lt;")), l.includes(":fa-") && (l = l.replace(C4, "&colon;fa-"))), je(l, !1, t, r, a, s);
}
function vr(e, t, r, a, s = 0) {
  let l = _a(e, t, r, a, s);
  if (e === void 0 || l.width <= a) return l;
  let n = "", i = 0;
  for (let o of e.match(S4) ?? []) {
    if (o.trim() === "" || o.length > 2 && o[0] === "<") i = 0;
    else {
      let h = t.width(o.length > 2 ? "x" : o, r, s);
      i > 0 && i + h > a && (n += `
`, i = 0), i += h;
    }
    n += o;
  }
  return _a(n, t, r, a, s);
}
var zt = 7, _4 = 44, I4 = 44, xn = 36, wn = 8, Di = 20, Ji = 7, L0 = 6, Oc = Math.SQRT1_2, O0 = ["normal", "reverse", "highlight", "merge", "cherry-pick"];
function $n(e, t, r) {
  let a = e.gitGraph?.[t];
  return typeof a == "boolean" ? a : r;
}
function F0(e) {
  return Ji + 4 + e.width + 6;
}
function N4(e, t, r, a) {
  let s = `cx="${f(t)}" cy="${f(r)}"`;
  if (e === Bt.HIGHLIGHT) return `<rect x="${f(t - zt - 1)}" y="${f(r - zt - 1)}" width="${2 * zt + 2}" height="${2 * zt + 2}" rx="2" fill="${a}"/>`;
  if (e === Bt.MERGE) return `<circle ${s} r="${zt - 1}" fill="var(--_bg)" stroke="${a}" stroke-width="2"/><circle ${s} r="2.5" fill="${a}"/>`;
  let l = `<circle ${s} r="${zt}" fill="${a}"/>`;
  return e === Bt.REVERSE ? l + `<path d="M${f(t - 3)},${f(r - 3)}l6,6M${f(t - 3)},${f(r + 3)}l6,-6" fill="none" stroke="var(--_bg)" stroke-width="1.5" stroke-linecap="round"/>` : e === Bt.CHERRY_PICK ? l + `<path d="M${f(t - 2.6)},${f(r + 1)}L${f(t + 0.8)},${f(r - 4.2)}L${f(t + 2.6)},${f(r + 1)}" fill="none" stroke="var(--_bg)" stroke-linejoin="round"/><circle cx="${f(t - 2.6)}" cy="${f(r + 2.2)}" r="1.8" fill="var(--_bg)"/><circle cx="${f(t + 2.6)}" cy="${f(r + 2.2)}" r="1.8" fill="var(--_bg)"/>` : l;
}
function R4(e, t, r) {
  return e.direction !== "LR" ? z0(e, t, r, e.direction) : ur(r, (a) => z0(e, t, r, a ? "TB" : "LR"));
}
function z0(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.75), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8, o = $n(t, "showBranches", !0), h = $n(t, "showCommitLabel", !0), c = $n(t, "rotateCommitLabel", !0), u = $n(t, "parallelCommits", !1), d = a !== "LR", p = a === "BT", g = /* @__PURE__ */ new Map();
  e.lanes.forEach((L, X) => g.set(L, X));
  let y = e.lanes.length, b = Math.round(s * 0.875), x = e.lanes.map((L) => _a(o ? L : "", n, b, 4e3)), v = [], $ = /* @__PURE__ */ new Map();
  for (let L of [...e.commits.values()].sort((X, le) => X.seq - le.seq)) {
    let X = h && L.type !== Bt.CHERRY_PICK && (L.type !== Bt.MERGE || L.customId === !0), le = [];
    for (let V of L.tags) {
      let Z = _a(V, n, l, 4e3);
      Z.lines.length > 0 && le.push(Z);
    }
    let J = { commit: L, index: v.length, lane: g.get(L.branch) ?? 0, m: 0, label: X ? _a(L.id, n, l, 4e3) : void 0, tags: le };
    v.push(J), $.set(L.id, J);
  }
  let S = new Float64Array(v.length), R = new Float64Array(v.length), D = new Float64Array(y).fill(zt), O = new Float64Array(y).fill(zt);
  v.forEach((L, X) => {
    let { label: le, tags: J } = L, V = 0, Z = 0;
    for (let P of J) {
      let ne = F0(P);
      d ? (V = Math.max(V, P.height), Z += ne + 4) : (V = Math.max(V, ne), Z += P.height + 3);
    }
    let ae = 0, oe = 0;
    le !== void 0 && le.lines.length > 0 && (c ? oe = 3 + Oc * (le.width + le.height) : (ae = d ? le.height : le.width, oe = 6 + (d ? le.width : le.height))), S[X] = Math.max(zt, V / 2, ae / 2), R[X] = V / 2;
    let ue = zt + (J.length > 0 ? L0 + Z : 0), he = zt + oe, re = L.lane;
    D[re] = Math.max(D[re], d ? he : ue), O[re] = Math.max(O[re], d ? ue : he);
  });
  let U = new Float64Array(v.length);
  d || v.forEach((L, X) => {
    if (R[X] !== 0) for (let le of L.commit.parents) {
      let J = $.get(le);
      J !== void 0 && J.lane < L.lane && (U[X] = R[X] + 4);
    }
  });
  let q = (L, X) => Math.max(_4, S[L] + S[X] + wn, U[X] > 0 ? S[L] + xn + U[X] : 0);
  v.forEach((L, X) => {
    if (!u) {
      L.m = X === 0 ? 0 : v[X - 1].m + q(X - 1, X);
      return;
    }
    let le = 0;
    for (let J of L.commit.parents) {
      let V = $.get(J);
      V === void 0 || V.index >= X || (le = Math.max(le, V.m + q(V.index, X)));
    }
    L.m = le;
  });
  let C = 0;
  for (let L of v) C = Math.max(C, L.m);
  let ee = new Float64Array(y);
  for (let L = 0; L < y; L++) {
    let X = x[L], le = X.lines.length === 0 ? 0 : d ? X.width / 2 + 8 : X.height / 2 + 2;
    D[L] = Math.max(D[L], le), O[L] = Math.max(O[L], le), L > 0 && (ee[L] = ee[L - 1] + Math.max(I4, O[L - 1] + D[L] + wn));
  }
  let ie = (L, X) => d ? X : L, G = (L, X) => d ? p ? -L : L : X, z = (L, X) => `${f(ie(L, X))},${f(G(L, X))}`, _ = 1 / 0, T = 1 / 0, E = -1 / 0, M = -1 / 0, A = (L, X, le, J) => {
    L < _ && (_ = L), X < T && (T = X), le > E && (E = le), J > M && (M = J);
  }, m = "";
  if (o) for (let L = 0; L < y; L++) {
    let X = x[L], le = vt(L), J = ee[L], V = X.width + 16, Z = X.height + 4, ae = X.lines.length === 0 ? -20 : -20 - (d ? Z : V), oe = ie(ae + (d ? Z : V) / 2, J), ue = G(ae + (d ? Z : V) / 2, J);
    A(ie(-20, J), G(-20, J), ie(-20, J), G(-20, J)), A(ie(C + Di, J), G(C + Di, J), ie(C + Di, J), G(C + Di, J)), m += `<g class="pele-branch" data-id="${Ye(e.lanes[L])}"><path class="pele-lane" d="M${z(-20, J)}L${z(C + Di, J)}" stroke="${le}" stroke-dasharray="2 4"/>`, X.lines.length > 0 && (A(oe - V / 2, ue - Z / 2, oe + V / 2, ue + Z / 2), m += `<rect x="${f(oe - V / 2)}" y="${f(ue - Z / 2)}" width="${f(V)}" height="${f(Z)}" fill="${le}"${wt}/>` + Pe(X, oe, ue, ' class="pele-label"' + (eh(L) || ' fill="var(--_bg)"'))), m += "</g>";
  }
  let I = Array.from({ length: y }, () => []);
  for (let L of v) I[L.lane].push(L.m);
  if (u) for (let L of I) L.sort((X, le) => X - le);
  let k = (L, X, le) => {
    let J = I[L], V = 0, Z = J.length;
    for (; V < Z; ) {
      let ae = V + Z >> 1;
      J[ae] <= X ? V = ae + 1 : Z = ae;
    }
    return V < J.length && J[V] < le;
  }, w = "", B = "";
  for (let L of v) {
    let { commit: X } = L, le = ee[L.lane], J = L.m;
    for (let V = 0; V < X.parents.length; V++) {
      let Z = $.get(X.parents[V]);
      if (Z === void 0 || Z === L) continue;
      let ae = ee[Z.lane], oe = Z.m;
      if (Z.lane === L.lane) {
        B += `<path class="pele-edge" d="M${z(oe, ae)}L${z(J, le)}" stroke="${vt(L.lane)}"/>`;
        continue;
      }
      let ue = V > 0 && X.type === Bt.MERGE, he = V > 0 && !ue, re = `M${z(oe, ae)}`;
      if (J <= oe) {
        let P = (oe + J) / 2;
        re += `C${z(P, ae)} ${z(P, le)} ${z(J, le)}`;
      } else if (!ue && !k(L.lane, oe, J)) {
        let P = Math.min(xn, J - oe);
        re += `C${z(oe + P / 2, ae)} ${z(oe + P / 2, le)} ${z(oe + P, le)}L${z(J, le)}`;
      } else {
        let P = Z.lane < L.lane && J - U[L.index] > oe ? J - U[L.index] : J, ne = Math.min(xn, P - oe), ce = ae;
        (!ue || k(Z.lane, oe, J)) && (ce = ae > le ? le + O[L.lane] + wn / 2 : le - D[L.lane] - wn / 2, ne = Math.min(xn, (P - oe) / 2), re += `C${z(oe + ne / 2, ae)} ${z(oe + ne / 2, ce)} ${z(oe + ne, ce)}`), re += `L${z(P - ne, ce)}C${z(P - ne / 2, ce)} ${z(P - ne / 2, le)} ${z(P, le)}`, P < J && (re += `L${z(J, le)}`);
      }
      w += `<path class="pele-edge${ue ? " pele-edge-merge" : he ? " pele-edge-cherry-pick" : ""}" d="${re}" stroke="${vt(ue ? Z.lane : L.lane)}"${he ? ' stroke-dasharray="4 3"' : ""}/>`;
    }
  }
  let N = "";
  for (let L of v) {
    let { commit: X, label: le, tags: J } = L, V = ie(L.m, ee[L.lane]), Z = G(L.m, ee[L.lane]), ae = X.customType ?? X.type;
    A(V - zt - 1, Z - zt - 1, V + zt + 1, Z + zt + 1);
    let oe = X.type < Bt.MERGE && X.message !== "" ? `<title>${Ye(X.message)}</title>` : "";
    if (oe += N4(ae, V, Z, vt(L.lane)), le !== void 0 && le.lines.length > 0) {
      let re = le.width, P = le.height, ne = (ce, pe) => `<rect x="${f(ce - re / 2 - 2)}" y="${f(pe - P / 2 + 2)}" width="${f(re + 4)}" height="${f(P - 4)}" rx="3" fill="var(--_bg)"/>`;
      if (c) {
        let ce = Oc * P / 2, pe = d ? V - zt - 3 - ce : V + 3, Me = d ? Z : Z + zt + 3 + ce, xe = Oc * re + ce;
        A(pe - xe, p ? Me - xe : Me - ce, pe + ce, p ? Me + ce : Me + xe), oe += `<g class="pele-commit-label" transform="rotate(${p ? 45 : -45} ${f(pe)} ${f(Me)})">` + ne(pe - re / 2, Me) + Pe(le, pe - re / 2, Me, "") + "</g>";
      } else {
        let ce = d ? V - zt - 6 - re / 2 : V, pe = d ? Z : Z + zt + 6 + P / 2;
        A(ce - re / 2, pe - P / 2, ce + re / 2, pe + P / 2), oe += `<g class="pele-commit-label">${ne(ce, pe)}${Pe(le, ce, pe, "")}</g>`;
      }
    }
    let ue = zt + L0;
    for (let re = d ? 0 : J.length - 1; re >= 0 && re < J.length; re += d ? 1 : -1) {
      let P = J[re], ne = F0(P), ce = P.height, pe = d ? V + ue : V - ne / 2, Me = d ? Z : Z - ue - ce / 2;
      ue += d ? ne + 4 : ce + 3, A(pe, Me - ce / 2, pe + ne, Me + ce / 2), oe += `<g class="pele-tag"><path d="M${f(pe)},${f(Me)}L${f(pe + Ji)},${f(Me - ce / 2)}H${f(pe + ne)}V${f(Me + ce / 2)}H${f(pe + Ji)}Z" fill="var(--_s)" stroke="var(--_b)" stroke-linejoin="round"/><circle cx="${f(pe + Ji)}" cy="${f(Me)}" r="1.5" fill="var(--_b)"/>` + Pe(P, pe + Ji + 4 + P.width / 2, Me, ' fill="var(--_fg)"') + "</g>";
    }
    let he = X.type === Bt.MERGE && ae !== Bt.MERGE ? " pele-commit-merge" : "";
    N += `<g class="pele-commit pele-commit-${O0[ae] ?? O0[0]}${he}" data-id="${Ye(X.id)}">${oe}</g>`;
  }
  _ > E && A(0, 0, 0, 0);
  let j = je(e.title, !1, n, s, 4e3, 1), F = j.height > 0 ? j.height + 16 : 0, Y = Math.max(E - _, j.width), W = Math.ceil(Y + 2 * i), K = Math.ceil(M - T + F + 2 * i), H = i - _ + (Y - (E - _)) / 2, te = i + F - T, Q = Pe(j, W / 2, i + j.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f(H)},${f(te)})">` + (m ? `<g class="pele-branches" fill="none" font-size="${b}">${m}</g>` : "") + (w || B ? `<g class="pele-edges" fill="none" stroke-width="2" stroke-linecap="round">${w}${B}</g>` : "") + (N ? `<g class="pele-commits" font-size="${l}" fill="var(--_m)">${N}</g>` : "") + "</g>";
  return { svg: xt("gitGraph", W, K, s, r, e, Q), width: W, height: K, links: [] };
}
var D4 = { type: "gitGraph", parse: (e, t, r) => A4(E4(e), t, r), render: R4 };
function L4(e, t) {
  return { type: "info", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0 };
}
var P0 = [Pr("showInfo"), Pr("info"), aa, Br, di, La, Oa, fr, la, ia];
function O4(e) {
  let t = new Sr(Ar(e, P0, "info"), P0, "info"), r = { $type: "Info" };
  for (; t.kind === 5; ) t.i++;
  for (t.expect(1); t.kind === 5; ) t.i++;
  if (t.accept(0)) for (; t.kind === 5; ) t.i++;
  for (; t.kind !== -1; ) {
    let a = t.kind;
    if (a === 2 ? r.accDescr = Cr(t.take()) : a === 3 ? r.accTitle = Tr(t.take()) : a === 4 ? r.title = Er(t.take()) : t.fail("a title or the end of input"), t.kind === -1) break;
    for (t.kind !== 5 && t.fail("a line break or the end of input"); t.kind === 5; ) t.i++;
  }
  return r;
}
var F4 = "1.13.0";
function z4(e, t, r) {
  let a = r.fontSize ?? 16, s = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), l = r.padding ?? 8, n = je(e.title, !1, s, a, 4e3, 1), i = n.height > 0 ? n.height + 8 : 0, o = je(`Pele v${F4}`, !1, s, a, 4e3), h = Math.ceil(Math.max(n.width, o.width) + 2 * l), c = Math.ceil(i + o.height + 2 * l), u = Pe(n, h / 2, l + n.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + Pe(o, h / 2, l + i + o.height / 2, ' class="pele-version" fill="var(--_m)"');
  return { svg: xt("info", h, c, a, r, e, u), width: h, height: c, links: [] };
}
var P4 = { type: "info", parse: (e, t, r) => L4(O4(e), r), render: z4 }, W4 = class {
  type = "ishikawa";
  title;
  root;
  stack = [];
  baseLevel;
  addNode(e, t) {
    let r = { text: t, children: [] };
    if (!this.root) {
      this.root = r, this.stack = [{ level: 0, node: r }];
      return;
    }
    this.baseLevel ??= e;
    let a = Math.max(e - this.baseLevel + 1, 1), s = this.stack;
    for (; s.length > 1 && s[s.length - 1].level >= a; ) s.pop();
    s[s.length - 1].node.children.push(r), s.push({ level: a, node: r });
  }
}, B4 = ["$end", "EOF", "SPACELINE", "NL", "ISHIKAWA", "SPACELIST", "TEXT"];
function G4(e, t) {
  let r = "ishikawa-beta", a = 0;
  for (; a < 13; ) {
    let s = e.charCodeAt(t + a), l = r.charCodeAt(a);
    if (s !== l && (s + 32 !== l || s < 65 || s > 90)) break;
    a++;
  }
  return a === 13 && !nt(e.charCodeAt(t + 13)) ? 13 : a >= 8 && !nt(e.charCodeAt(t + 8)) ? 8 : 0;
}
function H4(e) {
  let t = [], r = [], a = [], s = e.length, l = 0;
  for (; l < s; ) {
    let n = l, i = -1;
    for (; n < s && Ke(e.charCodeAt(n)); ) e.charCodeAt(n) === 10 && (i = n), n++;
    let o, h;
    if (e.charCodeAt(n) === 37 && e.charCodeAt(n + 1) === 37) for (o = 2, h = n + 2; h < s; ) {
      let c = e.charCodeAt(h);
      if (c === 10 || c === 13 || c === 8232 || c === 8233) break;
      h++;
    }
    else if (n === l) {
      let c = G4(e, l);
      c > 0 ? (o = 4, h = l + c) : (o = 6, h = e.indexOf(`
`, l), h === -1 && (h = s));
    } else i > l ? (o = 2, h = i + 1) : i === l ? (o = 3, h = l + 1) : (o = 5, h = n);
    t.push(o), r.push(l), a.push(h), l = h;
  }
  return t.push(1, 0), r.push(s, s), a.push(s, s), { types: t, starts: r, ends: a };
}
var Fc = "'SPACELINE', 'NL', 'EOF'";
function U4(e, t) {
  let { types: r, starts: a, ends: s } = H4(e), l = 0, n = (i) => {
    throw bt("ishikawa", e, a[l], `Expecting ${i}, got '${B4[r[l]]}'`);
  };
  if (r[l] === 2) {
    for (l++; r[l] === 2 || r[l] === 3; ) l++;
    r[l] !== 4 && n("'SPACELINE', 'NL', 'ISHIKAWA'");
  } else r[l] !== 4 && n("'SPACELINE', 'ISHIKAWA'");
  for (l++, r[l] === 3 && l++; ; ) {
    let i = r[l];
    if (i === 6 || i === 5 && r[l + 1] === 6) {
      let o = i === 6 ? l : l + 1;
      l = o + 1, r[l] !== 2 && r[l] !== 3 && r[l] !== 1 && n(Fc), t.addNode(i === 6 ? 0 : s[o - 1] - a[o - 1], e.slice(a[o], s[o]).trim());
    } else i === 2 || i === 5 ? (l++, r[l] !== 2 && r[l] !== 3 && r[l] !== 1 && n(i === 5 ? `${Fc}, 'TEXT'` : Fc)) : n("'SPACELINE', 'SPACELIST', 'TEXT'");
    for (l++; r[l] === 3 || r[l] === 1; ) l++;
    if (r[l] === 0) return;
  }
}
var go = 0.5, bn = Math.hypot(go, 1), Y4 = 14, j4 = 6, q4 = 8, W0 = 22, V4 = 18, $f = 5, K4 = 26, X4 = 28, Z4 = 10, Q4 = 5;
function J4(e, t, r, a, s) {
  let l = je(e.text, !1, r, a, 180), n = Math.round(s * 1.5), i = [], o = [], h = [], c = (g, y, b) => {
    let x = g.length;
    for (let v = x - 1; v >= 0; v--) h.push({ node: g[t ? x - 1 - v : v], depth: y, parent: b, slot: v, bone: -1 });
  };
  for (c(e.children, 2, -1); h.length > 0; ) {
    let g = h.pop();
    if (g.bone !== -1) {
      o.push(g.bone);
      continue;
    }
    let y = i.length;
    i.push({ label: je(g.node.text, !1, r, s, 200), depth: g.depth, parent: g.parent, slot: g.slot, kids: g.node.children.length, rise: 0, at: 0, textEnd: 0 }), g.depth % 2 === 0 ? o.push(y) : (g.bone = y, h.push(g)), c(g.node.children, g.depth + 1, y);
  }
  let u = Y4;
  for (let g of o) {
    let y = Math.max(i[g].label.height, n) + j4;
    i[g].rise = u + y / 2, u += y;
  }
  let d = l.width + 2 * Z4, p = d / 2;
  for (let g of i) {
    let y = g.parent === -1 ? void 0 : i[g.parent];
    g.depth % 2 === 0 ? (g.at = y ? y.at : 0, g.textEnd = g.at - (g.kids > 0 ? (g.kids + 1) * W0 : V4) - $f) : (g.at = y.at - (y.kids - g.slot) * W0, g.textEnd = g.at - $f), p = Math.max(p, g.label.width - g.textEnd);
  }
  return { node: e, label: l, boxW: d, boxH: l.height + 2 * Q4, bones: i, rise: u + q4, reach: p };
}
function e3(e, t, r) {
  return ur(r, (a) => t3(e, t, r, a));
}
function t3(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8;
  if (a) return r3(e, r);
  let o = e.root, h = je(e.title, !1, n, s, 4e3, 1), c = h.height > 0 ? h.height + 12 : 0, u = "", d = 0, p = 0, g = 0, y = 0;
  if (o) {
    let R = je(o.text, !1, n, s, 200, 1), D = Math.max(R.height + 24, 48), O = R.width + 24 + D / 2, U = o.children.map((z, _) => J4(z, _ % 2 === 0, n, s, l));
    for (let z of U) z.rise = Math.max(z.rise, D / 2 + 14);
    let q = [], C = -34;
    for (let z = 0; z < U.length; z += 2) {
      if (z > 0) {
        let _ = 0;
        for (let T = 0; T < 2; T++) {
          let E = U[z - 2 + T], M = U[z + T];
          E && (_ = Math.max(_, E.reach + (M ? M.boxW / 2 : 0)));
        }
        C -= _ + K4;
      }
      q.push(C, C);
    }
    let ee = U.length > 0 ? C - X4 : -34;
    p = O, d = ee, g = -D / 2, y = D / 2;
    let ie = "";
    U.forEach((z, _) => {
      let T = _ % 2 === 0 ? -1 : 1, E = q[_], M = (N, j) => E + N - j * go, A = M(0, z.rise), m = T * z.rise, I = Nt - 1, k = `M${f(E - go / bn * I)},${f(T * I / bn)}L${f(A)},${f(m)}`, w = "";
      for (let N of z.bones) {
        let j = T * N.rise;
        if (N.depth % 2 === 0) k += `M${f(M(N.at, N.rise))},${f(j)}H${f(M(N.textEnd + $f, N.rise))}`;
        else {
          let Y = z.bones[N.parent].rise;
          k += `M${f(M(N.at, Y))},${f(T * Y)}L${f(M(N.at, N.rise))},${f(j)}`;
        }
        let F = M(N.textEnd, N.rise);
        w += Pe(N.label, F - N.label.width / 2, j, N.depth > 2 ? ' fill="var(--_m)"' : ""), d = Math.min(d, F - N.label.width);
      }
      let B = m + T * (z.boxH / 2);
      d = Math.min(d, A - z.boxW / 2), p = Math.max(p, A + z.boxW / 2), g = Math.min(g, B - z.boxH / 2), y = Math.max(y, B + z.boxH / 2), ie += `<g class="pele-ishikawa-category" data-id="${Ye(z.node.text)}"><path class="pele-ishikawa-bones" d="${k}" fill="none" stroke="var(--_l)"/>` + St("arrow_point", E, 0, go / bn, -T / bn, "var(--_l)") + `<rect x="${f(A - z.boxW / 2)}" y="${f(B - z.boxH / 2)}" width="${f(z.boxW)}" height="${f(z.boxH)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>` + Pe(z.label, A, B, ' class="pele-label"') + (w ? `<g class="pele-ishikawa-causes" font-size="${l}">${w}</g>` : "") + "</g>";
    });
    let G = D / 2;
    u = `<path class="pele-ishikawa-spine" d="M${f(ee)},0H${f(-7)}" fill="none" stroke="var(--_l)"/>` + St("arrow_point", 0, 0, 1, 0, "var(--_l)") + ie + `<g class="pele-ishikawa-head" data-id="${Ye(o.text)}"><path d="M0,${f(-G)}H${f(O - G)}A${f(G)},${f(G)} 0 0 1 ${f(O - G)},${f(G)}H0Z" fill="var(--_s)" stroke="var(--_b)" stroke-linejoin="round"/>` + Pe(R, 12 + R.width / 2, 0, ' class="pele-label" font-weight="var(--_hw)"') + "</g>";
  }
  let b = Math.max(p - d, h.width), x = Math.ceil(b + 2 * i), v = Math.ceil(y - g + c + 2 * i), $ = i + (b - (p - d)) / 2 - d, S = i + c - g;
  return { svg: xt("ishikawa", x, v, s, r, {}, Pe(h, x / 2, i + h.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (u ? `<g transform="translate(${f($)},${f(S)})">${u}</g>` : "")), width: x, height: v, links: [] };
}
function r3(e, t) {
  let r = t.fontSize ?? 16, a = Math.round(r * 0.875), s = t.measurer ?? $t(t.fontFamily, t.fontFamilyMono), l = t.padding ?? 8, n = Math.max(140, (t.maxWidth ?? 320) - 2 * l), i = je(e.title, !1, s, r, Qt(t), 1), o = [], h = e.root ? [{ node: e.root, depth: 0, parent: -1 }] : [], c = 0;
  for (; h.length; ) {
    let $ = h.pop(), S = o.length;
    o.push({ ...$, x: 0, y: 0, w: 0, h: 0 }), c = Math.max(c, $.depth);
    for (let R = $.node.children.length - 1; R >= 0; R--) h.push({ node: $.node.children[R], depth: $.depth + 1, parent: S });
  }
  let u = Math.min(20, Math.max(2, (n - 120) / Math.max(1, c))), d = l + (i.height ? i.height + 12 : 0), p = i.width, g = "", y = "";
  for (let $ of o) {
    $.x = l + $.depth * u;
    let S = Math.max(60, n - $.depth * u - 20);
    $.label = Ro(je($.node.text, !1, s, $.depth < 2 ? r : a, S, $.depth < 2 ? 1 : 0), s, S), $.w = $.label.width + 20, $.h = $.label.height + 12, $.y = d, d += $.h + 12, p = Math.max(p, $.x - l + $.w);
    let R = $.depth < 2;
    if (g += `<g class="pele-node ${$.depth === 0 ? "pele-ishikawa-head" : $.depth === 1 ? "pele-ishikawa-category" : "pele-ishikawa-cause"}" data-id="${Ye($.node.text)}">` + (R ? `<rect x="${f($.x)}" y="${f($.y)}" width="${f($.w)}" height="${f($.h)}" rx="${$.depth === 0 ? 12 : 4}" fill="var(--_s)" stroke="var(--_b)"/>` : "") + Pe($.label, $.x + $.w / 2, $.y + $.h / 2, ` class="pele-label"${$.depth < 2 ? ' font-weight="var(--_hw)"' : ""}${$.depth > 1 ? ` font-size="${a}"` : ""}`) + "</g>", $.parent >= 0) {
      let D = o[$.parent], O = D.x + u / 2;
      y += `<path class="pele-edge" d="M${f(O)},${f(D.y + D.h)}V${f($.y + $.h / 2)}H${f($.x)}" fill="none" stroke="var(--_b)"/>`;
    }
  }
  let b = Math.ceil(p + 2 * l), x = Math.ceil(Math.max(l + i.height, d - 12) + l), v = Pe(i, b / 2, l + i.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + y + g;
  return { svg: xt("ishikawa", b, x, r, t, {}, v), width: b, height: x, links: [] };
}
var a3 = { type: "ishikawa", parse(e, t, r) {
  let a = new W4();
  return a.title = r, U4(e, a), a;
}, render: e3 };
function tu(e) {
  let t = /* @__PURE__ */ new Set();
  for (let r of e) for (let a of r.people) t.add(a);
  return [...t].sort();
}
var l3 = class {
  type = "journey";
  title;
  accTitle;
  accDescr;
  sections = [];
  tasks = [];
  currentSection = "";
  setDiagramTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addSection(e) {
    this.currentSection = e, this.sections.push(e);
  }
  addTask(e, t) {
    let r = t.substring(1).split(":"), a = r.length === 1 ? [] : r[1].split(",").map((s) => s.trim());
    this.tasks.push({ task: e, score: Number(r[0]), people: a, section: this.currentSection });
  }
  getActors() {
    return tu(this.tasks);
  }
};
function Go(e, t) {
  let r = e.indexOf(`
`, t);
  return r === -1 ? e.length : r;
}
function Zr(e, t, r) {
  for (let a = 0; a < r.length; a++) if ((e.charCodeAt(t + a) | 32) !== r.charCodeAt(a)) return !1;
  return !0;
}
function Im(e, t) {
  let r = e.length, a = t;
  for (; a < r; ) {
    let s = e.charCodeAt(a);
    if (s === 37 && e.charCodeAt(a + 1) !== 123) a = Go(e, a);
    else {
      if (s === 10) return a;
      if (Ke(s)) do
        a++;
      while (a < r && Ke(e.charCodeAt(a)));
      else if (s === 35) a = Go(e, a);
      else return a;
    }
  }
  return a;
}
function zc(e, t) {
  let r = t;
  for (; Ke(e.charCodeAt(r)); ) r++;
  return r;
}
function Nm(e, t, r, a) {
  let s = Zr(e, t, "accdescr");
  if (!s && !Zr(e, t, "acctitle")) return t;
  let l = e.length, n = zc(e, t + 8), i = e.charCodeAt(n), o = (h, c, u) => {
    r.types.push(h), r.texts.push(e.slice(c, u)), r.starts.push(c);
  };
  if (i === 58) {
    n = zc(e, n + 1);
    let h = Go(e, n);
    return o(s ? a + 2 : a, t, n), o(s ? a + 3 : a + 1, n, h), h;
  }
  if (!s || i !== 123) return t;
  for (n = zc(e, n + 1); e.charCodeAt(n) !== 125; ) {
    let h = e.indexOf("}", n);
    if (h === -1 && (h = l), o(a + 4, n, h), n === l) return l;
    n = h;
  }
  return n + 1;
}
var i3 = ["$end", "EOF", "INVALID", "NEWLINE", "journey", "title", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "section", "taskName", "taskData", ":"];
function Mn(e, t, r) {
  let a = e.length, s = t;
  for (; s < a; s++) {
    let l = e.charCodeAt(s);
    if (l === 35 || l === 10 || l === 59 || r && l === 58) break;
  }
  return s;
}
function s3(e) {
  let t = e.length, r = [], a = [], s = [], l = { types: r, texts: a, starts: s }, n = 0, i = (o, h) => {
    r.push(o), a.push(e.slice(n, h)), s.push(n), n = h;
  };
  for (; n = Im(e, n), !(n >= t); ) {
    let o = e.charCodeAt(n), h = n + 1;
    if (o === 10) {
      for (; e.charCodeAt(h) === 10; ) h++;
      i(3, h);
      continue;
    }
    if (Zr(e, n, "journey") && !nt(e.charCodeAt(n + 7))) {
      i(4, n + 7);
      continue;
    }
    if (Zr(e, n, "title")) {
      for (h = n + 5; e.charCodeAt(h) !== 10 && Ke(e.charCodeAt(h)); ) h++;
      if (h === t || e.charCodeAt(h) === 10) {
        n = h;
        continue;
      }
      let c = e.charCodeAt(n + 5);
      if (c !== 13 && Ke(c) && (h = Mn(e, n + 6, !1), h > n + 6)) {
        i(5, h);
        continue;
      }
    }
    if (h = Nm(e, n, l, 6), h !== n) {
      n = h;
      continue;
    }
    if (Zr(e, n, "section") && Ke(e.charCodeAt(n + 7)) && (h = Mn(e, n + 8, !0), h > n + 8)) {
      i(11, h);
      continue;
    }
    o === 58 ? (h = Mn(e, n + 1, !1), i(h > n + 1 ? 13 : 14, h > n + 1 ? h : n + 1)) : o === 59 ? i(2, n + 1) : i(12, Mn(e, n + 1, !0));
  }
  return (s.length === 0 || s[s.length - 1] < t) && i(1, t), i(0, t), l;
}
var n3 = "'EOF', 'SPACE', 'NEWLINE', 'title', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'section', 'taskName'";
function o3(e, t) {
  let { types: r, texts: a, starts: s } = s3(e), l = (n, i) => {
    let o = r[n] === 0 ? "1" : i3[r[n]];
    throw bt("journey", e, s[n], `Expecting ${i}, got '${o}'`);
  };
  r[0] !== 4 && l(0, "'journey'");
  for (let n = 1; ; n++) {
    let i = a[n];
    switch (r[n]) {
      case 3:
        break;
      case 5:
        t.setDiagramTitle(i.substring(6));
        break;
      case 6:
        t.setAccTitle(a[++n].trim());
        break;
      case 8:
        t.setAccDescription(a[++n].trim());
        break;
      case 10:
        t.setAccDescription(i.trim());
        break;
      case 11:
        t.addSection(i.substring(8));
        break;
      case 12:
        r[++n] !== 13 && l(n, "'taskData'"), t.addTask(i, a[n]);
        break;
      case 1:
        return;
      default:
        l(n, n3);
    }
  }
}
var mo = 10, Aa = 8, h3 = 124, c3 = 200, vn = 12, B0 = 6, Pc = 24, Wc = 26, Xl = 11, Vr = 5, d3 = 13, f3 = 20, u3 = '<circle cx="-3.6" cy="-2.8" r="1.3"/><circle cx="3.6" cy="-2.8" r="1.3"/>', p3 = { happy: "M-5,2A6,6 0 0 0 5,2", neutral: "M-4.5,4.5H4.5", sad: "M-5,6.5A6,6 0 0 1 5,6.5" };
function Rm(e, t, r) {
  return `<g class="pele-face pele-face-${r}" transform="translate(${f(e)},${f(t)})"><circle r="${Xl}" fill="var(--_bg)" stroke="var(--_l)"/><g fill="var(--_l)">${u3}</g><path d="${p3[r]}" fill="none" stroke="var(--_l)" stroke-linecap="round"/></g>`;
}
function g3(e, t, r) {
  return ur(r, (a) => m3(e, t, r, a));
}
function m3(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = Math.round(s * 0.75), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8;
  if (a) return y3(e, r);
  let h = e.tasks, c = h.length, u = tu(h).filter((W) => W !== ""), d = /* @__PURE__ */ new Map();
  u.forEach((W, K) => d.set(W, K));
  let p = h3, g = h.map((W) => _a(W.task, i, l, p)), y = 0;
  for (let W of g) y = Math.max(y, W.width);
  y > p && (p = Math.min(Math.ceil(y), c3), g = h.map((W) => vr(W.task, i, l, p)));
  let b = p + 2 * mo, x = b + vn, v = c > 0 ? c * x - vn : 0, $ = Math.round(l * 1.5), S = Math.max(v, 240), R = [], D = 0, O = 0, U = 0;
  for (let W of u) {
    let K = vr(W, i, l, S - 2 * Vr - 6), H = 2 * Vr + 6 + K.width;
    U > 0 && U + H > S && (U = 0, O += 4);
    let te = U > 0 ? R[R.length - 1].y : O, Q = Math.max(K.height, $);
    R.push({ name: W, label: K, x: U, y: te, h: Q }), U += H, D = Math.max(D, U), O = Math.max(O, te + Q), U += f3;
  }
  let q = c > 0 ? Pc + v : 0, C = vr(e.title, i, s, Math.max(q, 320), 1), ee = C.height > 0 ? C.height + 16 : 0, ie = Math.max(q, C.width, c > 0 ? Pc + D : 0), G = o + (ie - q) / 2 + Pc, z = o + ee, _ = [], T = 0;
  for (let W = 0; W < c; ) {
    let K = W + 1;
    for (; K < c && h[K].section === h[W].section; ) K++;
    let H;
    h[W].section !== "" && (H = vr(h[W].section, i, l, (K - W) * x - vn - 2 * mo, 1), T = Math.max(T, Math.max(H.height, $) + 2 * B0)), _.push({ start: W, count: K - W, label: H }), W = K;
  }
  let E = $;
  for (let W of g) E = Math.max(E, W.height);
  let M = u.length > 0 ? 2 * Vr + 6 : 0, A = E + M + 2 * Aa, m = z + (T > 0 ? T + B0 : 0), I = m + A + Xl + 16, k = I + 4 * Wc, w = G + v, B = "", N = z;
  if (c > 0) {
    let W = "", K = "";
    for (let X = 5; X >= 1; X--) {
      let le = I + (5 - X) * Wc;
      W += `M${f(G - 6)},${f(le)}H${f(w)}`, K += `<text x="${f(G - 12)}" y="${f(le + n * 0.35)}">${X}</text>`;
    }
    B += `<path class="pele-grid" d="${W}" fill="none" stroke="var(--_a)"/><g class="pele-scale" font-size="${n}" text-anchor="end" fill="var(--_m)">${K}</g>`;
    let H = "", te = "", Q = "", L = [];
    h.forEach((X, le) => {
      let J = G + le * x, V = J + b / 2, Z = X.score, ae = Number.isNaN(Z) ? 3 : Math.min(5, Math.max(1, Z)), oe = I + (5 - ae) * Wc;
      H += `${le === 0 ? "M" : "L"}${f(V)},${f(oe)}`, te += `M${f(V)},${f(m + A)}V${f(oe - Xl)}`, Q += Rm(V, oe, Z > 3 ? "happy" : Z < 3 ? "sad" : "neutral");
      let ue = "", he = X.people.filter((P) => P !== ""), re = Math.min(d3, (b - 2 * mo - 2 * Vr) / Math.max(he.length - 1, 1));
      he.forEach((P, ne) => {
        ue += `<circle class="pele-actor" cx="${f(V + (ne - (he.length - 1) / 2) * re)}" cy="${f(m + A - Aa - Vr)}" r="${Vr}" fill="${vt(d.get(P) ?? 0)}" stroke="var(--_s)"><title>${Ye(P)}</title></circle>`;
      }), L.push(`<g class="pele-node pele-task" data-id="${Ye(X.task.trim())}"><rect x="${f(J)}" y="${f(m)}" width="${f(b)}" height="${f(A)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>` + Pe(g[le], V, m + Aa + E / 2, ` font-size="${l}"`) + ue + "</g>");
    }), B += `<path class="pele-stems" d="${te}" fill="none" stroke="var(--_b)" stroke-dasharray="2 3"/>` + (c > 1 ? `<path class="pele-edge" d="${H}" fill="none" stroke="var(--_l)" stroke-linejoin="round"/>` : "") + Q;
    for (let X of _) {
      let le = L.slice(X.start, X.start + X.count).join("");
      if (!X.label) {
        B += le;
        continue;
      }
      let J = G + X.start * x, V = X.count * x - vn;
      B += `<g class="pele-cluster pele-section" data-id="${Ye(h[X.start].section.trim())}"><rect x="${f(J)}" y="${f(z)}" width="${f(V)}" height="${f(T)}" fill="var(--_a)"${wt}/>` + Pe(X.label, J + V / 2, z + T / 2, ` font-size="${l}" font-weight="var(--_hw)"`) + le + "</g>";
    }
    if (N = k + Xl, R.length > 0) {
      let X = G + (v - D) / 2, le = N + 16, J = "";
      for (let V of R) {
        let Z = le + V.y + V.h / 2;
        J += `<g class="pele-legend-item" data-id="${Ye(V.name)}"><circle cx="${f(X + V.x + Vr)}" cy="${f(Z)}" r="${Vr}" fill="${vt(d.get(V.name) ?? 0)}"/>` + Pe(V.label, X + V.x + 2 * Vr + 6 + V.label.width / 2, Z, "") + "</g>";
      }
      B += `<g class="pele-legend" font-size="${l}">${J}</g>`, N = le + O;
    }
  }
  let j = Math.ceil(ie + 2 * o), F = Math.ceil(Math.max(N, o) + o), Y = Pe(C, o + ie / 2, o + C.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + B;
  return { svg: xt("journey", j, F, s, r, e, Y), width: j, height: F, links: [] };
}
function y3(e, t) {
  let r = t.fontSize ?? 16, a = Math.round(r * 0.875), s = t.measurer ?? $t(t.fontFamily, t.fontFamilyMono), l = t.padding ?? 8, n = Math.max(140, (t.maxWidth ?? 320) - 2 * l), i = vr(e.title, s, r, n, 1), o = tu(e.tasks).filter((x) => x !== ""), h = new Map(o.map((x, v) => [x, v])), c = l + (i.height ? i.height + 16 : 0), u, d = "", p = i.width;
  e.tasks.forEach((x, v) => {
    if (x.section !== u) {
      u = x.section;
      let C = vr(u, s, r, n - 16, 1);
      C.height && (d += Pe(C, l + 8 + C.width / 2, c + C.height / 2, ' class="pele-cluster-label" font-weight="var(--_hw)"'), p = Math.max(p, C.width + 16), c += C.height + 8);
    }
    let $ = vr(x.task, s, a, n - 72), S = x.people.filter((C) => C !== "").map((C) => ({ name: C, label: vr(C, s, a, n - 44) })), R = Math.max($.height, 42), D = 2 * Aa + R;
    for (let C of S) D += Math.max(16, C.label.height) + 4;
    let O = Math.max(n, $.width + 72);
    d += `<g class="pele-node pele-journey-step" data-id="${v}"><rect x="${f(l)}" y="${f(c)}" width="${f(O)}" height="${f(D)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>`, d += Pe($, l + mo + $.width / 2, c + Aa + $.height / 2, ' class="pele-label"');
    let U = l + O - 28;
    d += Rm(U, c + Aa + Xl, x.score > 3 ? "happy" : x.score < 3 ? "sad" : "neutral"), Number.isNaN(x.score) || (d += `<text class="pele-journey-score" x="${f(U)}" y="${f(c + Aa + 2 * Xl + a)}" font-size="${a}" text-anchor="middle">${f(Math.min(5, Math.max(1, x.score)))}</text>`);
    let q = c + Aa + R + 4;
    for (let C of S) {
      let ee = Math.max(16, C.label.height);
      d += `<circle class="pele-actor" cx="${f(l + 16)}" cy="${f(q + ee / 2)}" r="${Vr}" fill="${vt(h.get(C.name))}"/>` + Pe(C.label, l + 28 + C.label.width / 2, q + ee / 2, ` class="pele-journey-actor" font-size="${a}"`), q += ee + 4;
    }
    d += "</g>", c += D, v + 1 < e.tasks.length && (d += `<path class="pele-edge" d="M${f(l + O / 2)},${f(c)}v16" fill="none" stroke="var(--_l)"/>`), c += 16, p = Math.max(p, O);
  });
  let g = Math.ceil(p + 2 * l), y = Math.ceil(Math.max(l + i.height, c - (e.tasks.length ? 16 : 0)) + l), b = Pe(i, g / 2, l + i.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + d;
  return { svg: xt("journey", g, y, r, t, e, b), width: g, height: y, links: [] };
}
var x3 = { type: "journey", parse(e, t, r) {
  let a = new l3();
  return a.title = r, o3(e, a), a;
}, render: g3 }, w3 = ["1", "INVALID", "SPACELINE", "NL", "EOF", "", "SPACELIST", "ICON", "CLASS", "NODE_DSTART", "NODE_ID", "NODE_DESCR", "NODE_DEND", "SHAPE_DATA"];
function G0(e, t) {
  return e === 5 ? t ? "KANBAN" : "MINDMAP" : w3[e];
}
var wa = { DEFAULT: 0, ROUNDED_RECT: 1, RECT: 2, CIRCLE: 3, CLOUD: 4, BANG: 5, HEXAGON: 6 };
function Dm(e, t) {
  switch (e) {
    case "[":
      return wa.RECT;
    case "(":
      return t === ")" ? wa.ROUNDED_RECT : wa.CLOUD;
    case "((":
      return wa.CIRCLE;
    case ")":
      return wa.CLOUD;
    case "))":
      return wa.BANG;
    case "{{":
      return wa.HEXAGON;
    default:
      return wa.DEFAULT;
  }
}
var $3 = /\s+/y, Bc = /.+/y, b3 = /[^([\n){}]+/y, M3 = /[^([\n){}@]+/y, v3 = /[^)\](}]+/y, k3 = /[^`"]+/y, A3 = /[^}^"]+/y, E3 = /\n\s*/g;
function H0(e, t, r) {
  for (let a = 0; a < r.length; a++) if ((e.charCodeAt(t + a) | 32) !== r.charCodeAt(a)) return !1;
  return !0;
}
function T3(e, t) {
  let r = e.length, a = [], s = [], l = [], n = t ? "kanban" : "mindmap", i = t ? M3 : b3, o = 0, h = 0, c = -1, u = (y, b, x) => {
    a.push(y), s.push(b), l.push(h), h = x;
  }, d = (y, b, x) => {
    u(y, e.slice(h, b), b), o = x;
  }, p = (y, b) => (y.lastIndex = b, y.test(e) ? y.lastIndex : -1), g = (y) => {
    let b = e.indexOf(y, h);
    return b === -1 ? r : b;
  };
  for (; h < r; ) {
    let y = e.charCodeAt(h), b = e.charCodeAt(h + 1), x;
    if (o === 0) {
      let v = y <= 32 || y >= 160 ? Math.max(p($3, h), h) : h;
      if (t && y === 64 && b === 123) u(13, "", h + 2), o = 6;
      else if (e.charCodeAt(v) === 37 && e.charCodeAt(v + 1) === 37) d(2, p(Bc, v), 0);
      else if (v > h) c < h && (c = g(`
`)), c >= v ? d(6, v, 0) : (x = e.lastIndexOf(`
`, v - 1)) > h ? d(2, x + 1, 0) : d(3, h + 1, 0);
      else if (H0(e, h, n) && !nt(e.charCodeAt(h + n.length))) d(5, h + n.length, 0);
      else if (y === 58 && b === 58 && e.charCodeAt(h + 2) === 58) h += 3, o = 1;
      else if (y === 58 && b === 58 && H0(e, h + 2, "icon") && e.charCodeAt(h + 6) === 40) h += 7, o = 2;
      else if (y === 45 && b === 41 || y === 40 && (b === 45 || b === 40) || (y === 41 || y === 123) && b === y) d(9, h + 2, 3);
      else if (y === 41 || y === 40 || y === 91) d(9, h + 1, 3);
      else if ((x = p(i, h)) !== -1) d(10, x, 0);
      else break;
    } else if (o === 3) y === 34 ? (o = b === 96 ? 5 : 4, h += b === 96 ? 2 : 1) : y === 41 || y === 40 ? d(12, b === y || y === 40 && b === 45 ? h + 2 : h + 1, 0) : y === 93 ? d(12, h + 1, 0) : y === 125 && b === 125 || y === 45 && b === 41 ? d(12, h + 2, 0) : d(11, p(y === 125 ? Bc : v3, h), 3);
    else if (o === 4) y === 34 ? (h++, o = 3) : d(11, g('"'), 4);
    else if (o === 5) if (y === 96 && b === 34) h += 2, o = 3;
    else if ((x = p(k3, h)) !== -1) d(11, x, 5);
    else break;
    else if (o === 1) if ((x = p(Bc, h)) !== -1) d(8, x, 0);
    else if (y === 10) h++, o = 0;
    else break;
    else if (o === 2) y === 41 ? (h++, o = 0) : d(7, g(")"), 2);
    else if (o === 6) if (y === 34) d(13, h + 1, 7);
    else if (y === 125) h++, o = 0;
    else if ((x = p(A3, h)) !== -1) d(13, x, 6);
    else break;
    else y === 34 ? d(13, h + 1, 6) : (x = g('"'), u(13, e.slice(h, x).replace(E3, "<br/>"), x));
  }
  return h < r ? u(1, "", h) : (o === 0 && u(4, "", r), u(0, "", r)), { types: a, texts: s, starts: l };
}
var Ba = "'SPACELINE', 'NL', 'EOF'", Lm = new Uint8Array(14);
for (let e of [2, 6, 7, 8, 9, 10]) Lm[e] = 1;
function Tl(e) {
  return e === 2 || e === 3 || e === 4;
}
function Om(e, t, r) {
  let a = r ? "kanban" : "mindmap", { types: s, texts: l, starts: n } = T3(e, r), i = r ? ", 'SHAPE_DATA'" : "", o = 0, h = (d) => {
    let p = s[o];
    throw p === 1 ? bt(a, e, n[o], "", !0) : bt(a, e, n[o], `Expecting ${d}, got '${G0(p, r)}'`);
  }, c = `'${G0(5, r)}'`;
  if (s[o] === 2) {
    for (o++; s[o] === 2 || s[o] === 3; ) o++;
    s[o] !== 5 && h(`'SPACELINE', 'NL', ${c}`);
  } else s[o] !== 5 && h(`'SPACELINE', ${c}`);
  o++;
  let u = "'SPACELINE', 'NL', 'SPACELIST', 'ICON', 'CLASS', 'NODE_DSTART', 'NODE_ID'";
  for (s[o] === 3 && (o++, u = "'SPACELINE', 'SPACELIST', 'ICON', 'CLASS', 'NODE_DSTART', 'NODE_ID'"); ; ) {
    let d = s[o], p = 0, g = d === 6;
    if (g && (p = l[o++].length, d = s[o]), d === 10 || d === 9) {
      let y, b, x = 0;
      if (d === 10 && (y = l[o++]), s[o] === 9) {
        let v = l[o++];
        s[o] !== 11 && h("'NODE_DESCR'"), b = l[o++], s[o] !== 12 && h("'NODE_DEND'");
        let $ = l[o++];
        !Tl(s[o]) && s[o] !== 13 && h(Ba + i), x = t.getType(v, $);
      } else !Tl(s[o]) && s[o] !== 13 && h(Ba + ", 'NODE_DSTART'" + i), b = y;
      if (s[o] === 13) {
        let v = l[o++];
        for (; s[o] === 13; ) v += l[o++];
        Tl(s[o]) || h(Ba + i), t.addNode(p, y ?? b, b, x, v);
      } else t.addNode(p, y ?? b, b, x);
    } else if (d === 7 || d === 8) {
      let y = l[o++];
      Tl(s[o]) || h(Ba), t.decorateNode(d === 7 ? { icon: y } : { class: y });
    } else g ? Tl(d) || h(Ba + ", 'ICON', 'CLASS', 'NODE_DSTART', 'NODE_ID'") : d === 2 ? Tl(s[++o]) || h(Ba) : h(u);
    for (o++; s[o] === 3 || s[o] === 4; ) o++;
    if (s[o] === 0) return;
    Lm[s[o]] === 0 && h(Ba + ", 'SPACELIST', 'ICON', 'CLASS', 'NODE_DSTART', 'NODE_ID'");
  }
}
var C3 = class {
  type = "kanban";
  title;
  sections = [];
  getType = Dm;
  last;
  sectionLevel = 0;
  misplaced;
  addNode(e, t, r, a, s) {
    let l = { id: t, level: e, label: r };
    if (s !== void 0) {
      let i = s.includes(`
`) ? s + `
` : `{
` + s + `
}`, o;
      try {
        o = Zl(i);
      } catch (h) {
        throw new at(`Metadata of "${l.id}" is not valid YAML. ${h.message}`, "syntax", { type: "kanban" });
      }
      if (o !== null && typeof o == "object" && !Array.isArray(o)) {
        let h = o.shape ? String(o.shape) : "";
        if (h !== h.toLowerCase() || h.includes("_")) throw new at(`No such shape: ${h}. Shape names should be lowercase.`, "semantic", { type: "kanban" });
        o.label && (l.label = String(o.label)), o.icon && (l.icon = String(o.icon)), o.assigned && (l.assigned = String(o.assigned)), o.ticket && (l.ticket = String(o.ticket)), o.priority && (l.priority = String(o.priority));
      }
    }
    if (this.misplaced) throw new at(`Items without section detected, found section ("${this.misplaced.label}")`, "semantic", { type: "kanban" });
    let n = this.sections;
    if (n.length === 0 && (this.sectionLevel = e), this.last = l, e === this.sectionLevel) {
      let i = l;
      i.items = [], n.push(i);
    } else n[n.length - 1].items.push(l), e < this.sectionLevel && (this.misplaced = l);
  }
  decorateNode(e) {
    let t = this.last;
    !e || !t || (e.icon && (t.icon = e.icon), e.class && (t.cssClasses = e.class));
  }
};
function S3(e, t) {
  Om(e, t, !0);
}
function bf(e, t, r, a, s) {
  return `<svg class="pele-icon" data-icon="${Ye(e)}" x="${f(t)}" y="${f(r)}" width="${f(a)}" height="${f(a)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s?.(e) ?? ""}</svg>`;
}
var Yr = 12, jr = 8, Rr = 10, Gc = 8, _3 = 4, Li = 6, I3 = /* @__PURE__ */ new Map([["very high", `stroke="${af}"`], ["high", `stroke="${af}" opacity="0.5"`], ["low", 'stroke="var(--_m)" opacity="0.5"'], ["very low", 'stroke="var(--_m)"']]);
function kn(e, t, r, a, s, l = 0) {
  let n = je(e, t, r, a, s, l);
  if (n.width <= s) return n;
  let i = [], o = [], h = 0, c = [], u = 0, d = () => {
    i.push(c), o.push(u), h = Math.max(h, u), c = [], u = 0;
  };
  for (let g = 0; g < n.lines.length; g++) {
    if (n.widths[g] <= s) {
      c = n.lines[g], u = n.widths[g], d();
      continue;
    }
    for (let y of n.lines[g]) {
      if (y.icon !== void 0 || y.math) {
        u > 0 && u + y.width > s && d(), c.push(y), u += y.width;
        continue;
      }
      let b = "", x = u;
      for (let v of y.text) {
        let $ = r.width(v, a, y.style);
        u > 0 && u + $ > s && (b && c.push({ text: b, style: y.style, width: u - x }), d(), b = "", x = 0), b += v, u += $;
      }
      b && c.push({ text: b, style: y.style, width: u - x });
    }
    d();
  }
  let p = { ...n, lines: i, widths: o, width: h, height: i.length * n.lineHeight };
  return n.heights ? Vf(p) : p;
}
function Oi(e, t, r, a, s, l = !1) {
  let n = "";
  for (let i = 0; i < e.lines.length; i++) {
    let o = e.lines[i], h = r + Rs(e, i);
    if (o.length === 1 && o[0].icon === void 0 && o[0].math === void 0 && (o[0].style & 56) === 0) n += `<text${sl(a, o[0].style)} x="${f(t)}" y="${f(h + e.size * 0.35)}"${l ? ' text-anchor="end"' : ""}>${it(o[0].text)}</text>`;
    else {
      let c = e.widths[i];
      n += Pe(Ds(e, i), t + (l ? -c : c) / 2, h, a, s);
    }
  }
  return n;
}
var Cl = (e) => !!e && Ff(e) !== "";
function N3(e, t, r) {
  let a = r.fontSize ?? 16, s = Math.round(a * 0.875), l = Math.round(a * 1.5), n = Math.round(s * 1.5), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = r.icons, c = t.kanban ?? {}, u = c.sectionWidth, d = s * 1.25, p = 0, g = (Y, W, K) => {
    if (!(!Y || !Y.includes("$$"))) for (let H of je(Y, !0, i, W, 1 / 0).lines) for (let te of H) te.math && (p = Math.max(p, te.math.width + K));
  };
  for (let Y of e.sections) {
    let W = i.width(String(Y.items.length), s, 0);
    g(Y.label, a, 2 * jr + 8 + W + 12 + (Cl(Y.icon) ? d + Li : 0));
    for (let K of Y.items) {
      let H = 2 * (jr + Rr);
      g(K.label, s, H + (Cl(K.icon) ? d + Li : 0)), g(K.ticket, s, H), g(K.assigned, s, H);
    }
  }
  let y = Math.max(typeof u == "number" && u > 0 ? Math.min(Math.max(u, 80), 2e3) : 200, Math.ceil(p)), b = r.maxWidth !== void 0 && r.maxWidth > 0 ? r.maxWidth - 2 * o : 1 / 0, x = e.sections.length, v = x * (y + Yr) - Yr <= b, $ = v ? Math.max(x, 1) : Math.max(1, Math.floor((b + Yr) / (y + Yr))), S = v ? y : Math.max(Math.min(y, b), Math.min(Math.floor((b + Yr) / $) - Yr, y * 2), Math.ceil(p)), R = typeof c.ticketBaseUrl == "string" ? c.ticketBaseUrl : "", D = S - 2 * jr, O = D - 2 * Rr, U = [], q = e.sections, C = [], ee = [], ie = [], G = l, z = [];
  for (let Y of q) {
    let W = i.width(String(Y.items.length), s, 0), K = W + 12 + (Cl(Y.icon) ? d + Li : 0), H = kn(Y.label, !0, i, a, D - 8 - K, 1);
    G = Math.max(G, H.height), ee.push(W), C.push(H);
    let te = [], Q = 0;
    for (let L of Y.items) {
      let X = kn(L.label, !0, i, s, O - (Cl(L.icon) ? d + Li : 0)), le = kn(L.ticket, !1, i, s, O), J = kn(L.assigned, !1, i, s, O), V = le.width + J.width + 8 > O ? le.height + J.height : Math.max(le.height, J.height), Z = 2 * Rr + Math.max(X.height, n) + (V ? _3 + V : 0);
      te.push({ item: L, label: X, ticket: le, assigned: J, meta: V, height: Z }), Q += Z + Gc;
    }
    ie.push(te), z.push(Q);
  }
  G += 2 * jr;
  let _ = [], T = [];
  for (let Y = 0, W = 0; Y < q.length; Y += $) {
    let K = Gc;
    for (let H = Y; H < Math.min(Y + $, q.length); H++) K = Math.max(K, z[H]);
    T.push(W), _.push(G + K), W += G + K + Yr;
  }
  let E = _.length > 0 ? T[T.length - 1] + _[_.length - 1] : 0, M = ma(e.title, i, a, Qt(r)), A = M.height > 0 ? M.height + 16 : 0, m = Math.max(Math.min(q.length, $) * (S + Yr) - Yr, 0), I = Math.max(m, M.width), k = o + (I - m) / 2, w = S - jr - 4, B = "";
  for (let Y = 0; Y < q.length; Y++) {
    let W = q[Y], K = Math.floor(Y / $), H = `<rect width="${S}" height="${f(_[K])}" fill="var(--_s)"${wt}/>` + Oi(C[Y], jr + 4, jr, ' class="pele-cluster-label" font-weight="var(--_hw)"', h) + `<text class="pele-count" x="${w}" y="${f(jr + l / 2 + s * 0.35)}" text-anchor="end" font-size="${s}" fill="var(--_m)">${W.items.length}</text>`;
    Cl(W.icon) && (H += bf(W.icon, w - ee[Y] - Li - d, jr + (l - d) / 2, d, h));
    let te = G;
    for (let Q of ie[Y]) {
      let L = Q.item, X = (L.priority ?? "").trim().toLowerCase(), le = I3.get(X), J = `<rect width="${D}" height="${f(Q.height)}" fill="var(--_bg)" stroke="var(--_b)"${wt}/>`;
      le !== void 0 && (J += `<path class="pele-priority" d="M2.5,5V${f(Q.height - 5)}" fill="none" ${le} stroke-width="3" stroke-linecap="round"/>`), J += Oi(Q.label, Rr, Rr, ' class="pele-label"', h), Cl(L.icon) && (J += bf(L.icon, D - Rr - d, Rr + (n - d) / 2, d, h));
      let V = Q.height - Rr;
      if (L.ticket) {
        let Z = V - Q.meta, ae = R ? Ao(ni(R.replace("#TICKET#", () => L.ticket)), r) : void 0;
        ae === void 0 ? J += Oi(Q.ticket, Rr, Z, ' class="pele-ticket" fill="var(--_m)"', h) : (J += `<a href="${it(ae)}" target="_blank"${Ss(r)}>` + Oi(Q.ticket, Rr, Z, ' class="pele-ticket" fill="var(--_c)"', h) + "</a>", U.push({ id: L.id, href: ae, internal: !1 }));
      }
      L.assigned && (J += Oi(Q.assigned, D - Rr, V - Q.assigned.height, ' class="pele-assigned" fill="var(--_m)"', h, !0)), H += `<g class="pele-node pele-card${le === void 0 ? "" : " pele-priority-" + X.replace(" ", "-")}${Ht(L.cssClasses ?? "")}" data-id="${Ye(L.id)}" transform="translate(${jr},${f(te)})" font-size="${s}">${J}</g>`, te += Q.height + Gc;
    }
    B += `<g class="pele-cluster pele-column${Ht(W.cssClasses ?? "")}" data-id="${Ye(W.id)}" transform="translate(${f(k + Y % $ * (S + Yr))},${f(o + A + T[K])})">${H}</g>`;
  }
  let N = Math.ceil(I + 2 * o), j = Math.ceil(E + A + 2 * o), F = Pe(M, N / 2, o + M.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + B;
  return { svg: xt("kanban", N, j, a, r, {}, F), width: N, height: j, links: U };
}
var R3 = { type: "kanban", math: !0, parse(e, t, r) {
  let a = new C3();
  return a.title = r, S3(e, a), a;
}, render: N3 }, D3 = 11, L3 = class {
  type = "mindmap";
  title;
  nodes = [];
  getType = Dm;
  baseLevel = 0;
  open = [];
  addNode(e, t, r, a) {
    let s = this.nodes.length === 0;
    s && (this.baseLevel = e), e -= this.baseLevel;
    let l = this.open, n = l.length;
    for (; n > 0 && l[n - 1].level >= e; ) n--;
    let i = l[n - 1];
    if (!i && !s) throw new at(`There can be only one root. No parent could be found for ("${r}")`, "semantic", { type: "mindmap" });
    let o = { id: this.nodes.length, nodeId: t, level: e, descr: r, type: a, children: [], isRoot: s };
    i && (o.section = i.isRoot ? i.children.length % D3 : i.section, i.children.push(o)), l.length = n, l.push(o), this.nodes.push(o);
  }
  decorateNode(e) {
    let t = this.nodes[this.nodes.length - 1];
    !e || !t || (e.icon && (t.icon = e.icon), e.class && (t.class = e.class));
  }
};
function O3(e, t) {
  Om(e, t, !1);
}
var F3 = ["", "rounded", "rect", "circle", "cloud", "bang", "hex"], U0 = "stadium", z3 = 36, P3 = 8, W3 = 18, B3 = 52, Y0 = 28, j0 = 6, G3 = 12, H3 = 0.22, Hc = 6, Uc = 28, q0 = 12, V0 = 8, K0 = 10;
function U3(e, t, r, a) {
  if (e.lines.length < 2) return Pe(e, t + e.width / 2, r, ' class="pele-label"', a);
  let s = "", l = r - e.height / 2;
  for (let n = 0; n < e.lines.length; n++) s += Pe(Ds(e, n), t + e.widths[n] / 2, l + Rs(e, n), ' class="pele-label"', a);
  return s;
}
function Y3(e, t, r) {
  return ur(r, (a) => j3(e, t, r, a));
}
function j3(e, t, r, a) {
  let s = r.fontSize ?? 16, l = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), n = r.padding ?? 8, i = r.icons, o = t.mindmap?.maxNodeWidth, h = typeof o == "number" && o > 0 ? Math.min(o, 2e3) : 200, c = s * 1.25, u = e.nodes, d = u.length, p = new Int32Array(d), g = new Int32Array(d);
  for (let Q = 0; Q < d; Q++) for (let L of u[Q].children) p[L.id] = Q, g[L.id] = g[Q] + 1;
  let y = a && r.maxWidth !== void 0 && r.maxWidth > 0 ? r.maxWidth - 2 * n : 1 / 0, b = new Array(d), x = new Array(d), v = new Float64Array(d), $ = new Float64Array(d), S = new Float64Array(d), R = new Float64Array(d), D = new Uint8Array(d);
  for (let Q = 0; Q < d; Q++) {
    let L = u[Q];
    D[Q] = L.icon !== void 0 && Ff(L.icon) !== "" ? 1 : 0;
    let X = Math.min(h, Math.max(72, y - g[Q] * Uc - 2 * j0 - (D[Q] ? c + Hc : 0))), le = b[Q] = je(L.descr, !0, l, s, X), J = le.width + (D[Q] ? c + (le.width > 0 ? Hc : 0) : 0), V = Math.max(le.height, Math.round(s * 1.5)), Z = F3[L.type] || (Q === 0 ? U0 : "");
    if (a && Q === 0 && Z !== "rect" && Z !== "rounded" && (Z = U0), x[Q] = Z, Z === "") {
      let ae = L.children.length > 0;
      v[Q] = J + 2 * (ae ? G3 : j0), $[Q] = V + (ae ? 6 : 0), R[Q] = $[Q] / 2;
    } else {
      let ae = ih(Z, J, V);
      v[Q] = ae.w, $[Q] = ae.h, S[Q] = ae.dy, R[Q] = ae.h / 2;
    }
  }
  let O = new Float64Array(d), U = new Float64Array(d), q = new Float64Array(d), C = new Float64Array(d), ee = 0, ie = (Q, L, X, le) => {
    let J = 0, V = 0;
    for (let oe = L; oe < X; oe++) {
      let ue = Q[oe].id;
      U[ue] = J, V = Q[oe].children.length > 0 || oe + 1 < X && Q[oe + 1].children.length > 0 ? Math.max(le, W3) : le, J += O[ue] + V;
    }
    ee = J - V;
    let Z = Q[L].id, ae = Q[X - 1].id;
    return (U[Z] + q[Z] + R[Z] + U[ae] + q[ae] + R[ae]) / 2;
  };
  for (let Q = d - 1; Q > 0; Q--) {
    let L = u[Q].children;
    if (L.length === 0) {
      O[Q] = $[Q];
      continue;
    }
    let X = ie(L, 0, L.length, P3) - R[Q], le = Math.min(0, X);
    O[Q] = Math.max(ee, X + $[Q]) - le, q[Q] = X - le, C[Q] = -le;
  }
  let G = new Float64Array(d), z = new Float64Array(d), _ = new Float64Array(d), T = new Int8Array(d), E = new Float64Array(d);
  if (a) {
    let Q = 0;
    for (let L = 0; L < d; L++) L > 0 && p[L] === 0 && (Q += K0), G[L] = g[L] * Uc + v[L] / 2, z[L] = Q, Q += $[L] + K0;
  } else if (d > 0) {
    let Q = u[0].children, L = Q.length, X = 0;
    for (let Z of Q) X += O[Z.id];
    let le = L, J = 1 / 0, V = 0;
    for (let Z = 1; Z < L; Z++) {
      V += O[Q[Z - 1].id];
      let ae = Math.abs(2 * V - X + (2 * Z - L) * Y0);
      ae < J && (J = ae, le = Z);
    }
    for (let Z = 0, ae = le, oe = 1; Z < L; Z = ae, ae = L, oe = -1) {
      let ue = ie(Q, Z, ae, Y0);
      for (let he = Z; he < ae; he++) {
        let re = Q[he].id;
        _[re] = U[re] - ue, T[re] = oe;
      }
    }
    z[0] = -$[0] / 2;
    for (let Z = 0; Z < d; Z++) {
      Z > 0 && (z[Z] = _[Z] + q[Z]);
      for (let ae of u[Z].children) {
        let oe = ae.id;
        Z > 0 && (T[oe] = T[Z], _[oe] = _[Z] + C[Z] + U[oe]), G[oe] = G[Z] + T[oe] * (v[Z] / 2 + (Z > 0 ? z3 : B3) + v[oe] / 2);
      }
    }
  }
  let M = 0, A = 0, m = 0, I = 0, k = "", w = "", B = "", N = "", j = (Q) => {
    B !== "" && (k += `<g class="pele-branch pele-section-${Q ?? 0}"><g class="pele-edges" fill="none" stroke="${N}" stroke-width="1.5">${w}</g>${B}</g>`, w = B = "");
  };
  for (let Q = 1; Q <= d; Q++) {
    let L = Q % d, X = u[L], le = x[L], J = b[L], V = G[L], Z = z[L];
    if (M = Math.min(M, V - v[L] / 2), A = Math.max(A, V + v[L] / 2), m = Math.min(m, Z), I = Math.max(I, Z + $[L]), (L === 0 || p[L] === 0) && j(u[Q - 1].section), L > 0 && a) {
      p[L] === 0 && (N = vt(X.section ?? 0));
      let P = p[L], ne = P === 0 ? Math.min(Math.max(q0, $[0] / 2), Uc - V0) : q0, ce = G[P] - v[P] / 2 + Math.min(ne, v[P] / 2), pe = E[P] || z[P] + $[P], Me = V - v[L] / 2 + (le ? al(le, v[L], $[L], 3) : 0), xe = Z + R[L], ve = Math.max(0, Math.min(V0, Me - ce, xe - pe));
      E[P] = xe - ve, w += `<path class="pele-edge" d="M${f(ce)},${f(pe)}V${f(xe - ve)}Q${f(ce)},${f(xe)} ${f(ce + ve)},${f(xe)}H${f(Me)}"/>`;
    } else if (L > 0) {
      p[L] === 0 && (N = vt(X.section ?? 0));
      let P = p[L], ne = T[L], ce = ne > 0 ? 1 : 3, pe = G[P] + ne * (v[P] / 2 - (x[P] ? al(x[P], v[P], $[P], ce) : 0)), Me = z[P] + R[P], xe = V - ne * v[L] / 2 + (le ? ne * al(le, v[L], $[L], 4 - ce) : 0), ve = Z + R[L], Ae = f((pe + xe) / 2);
      w += `<path class="pele-edge" d="M${f(pe)},${f(Me)}C${Ae},${f(Me)} ${Ae},${f(ve)} ${f(xe)},${f(ve)}"/>`;
    }
    let ae = !le && X.children.length > 0, oe = ` fill="${N}" fill-opacity="${H3}" stroke="${N}"`, ue = "";
    le ? ue = L > 0 ? ti(le, v[L], $[L], oe, ` stroke="${N}"`) : ti(le, v[L], $[L], ' fill="var(--_s)" stroke="var(--_b)"', ' stroke="var(--_b)"') : ae && (ue = `<rect x="${f(-v[L] / 2)}" y="${f(-$[L] / 2)}" width="${f(v[L])}" height="${f($[L])}" rx="${f($[L] / 2)}"${oe}/>`);
    let he = 0;
    X.icon && D[L] && (he = (c + (J.width > 0 ? Hc : 0)) / 2, ue += bf(X.icon, -he - J.width / 2, S[L] - c / 2, c, i));
    let re = `<g class="pele-node pele-shape-${le || (ae ? "branch" : "text")}${L > 0 ? "" : " pele-root"}${Ht(X.class ?? "")}" data-id="${Ye(X.nodeId)}" transform="translate(${f(V)},${f(Z + $[L] / 2)})">` + ue + (a && !le ? U3(J, he - J.width / 2, S[L], i) : Pe(J, he, S[L], ' class="pele-label"', i)) + "</g>";
    L > 0 ? B += re : k += re;
  }
  let F = ma(e.title, l, s, Qt(r)), Y = F.height > 0 ? F.height + 16 : 0, W = Math.max(A - M, F.width), K = Math.ceil(W + 2 * n), H = Math.ceil(I - m + Y + 2 * n), te = Pe(F, K / 2, n + F.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f(n - M + (W - A + M) / 2)},${f(n + Y - m)})">${k}</g>`;
  return { svg: xt("mindmap", K, H, s, r, {}, te), width: K, height: H, links: [] };
}
var q3 = { type: "mindmap", math: !0, parse(e, t, r) {
  let a = new L3();
  return a.title = r, O3(e, a), a;
}, render: Y3 }, V3 = 1e4;
function es(e, t, r, a, s) {
  let l = e.packet?.[t];
  return typeof l == "number" && l >= a ? Math.min(l, s) : r;
}
function Yc(e) {
  return new at(e, "semantic", { type: "packet" });
}
function K3(e, t, r) {
  let a = Math.floor(es(t, "bitsPerRow", 32, 1, 4096)), s = [], l = -1, n = [], i = 1;
  for (let o of e.blocks) {
    let { start: h, end: c, bits: u } = o;
    if (h !== void 0 && c !== void 0 && c < h) throw Yc(`Packet block ${h} - ${c} is invalid. End must be greater than start.`);
    if (h ??= l + 1, h !== l + 1) throw Yc(`Packet block ${h} - ${c ?? h} is not contiguous. It should start from ${l + 1}.`);
    if (u === 0) throw Yc(`Packet block ${h} is invalid. Cannot have a zero bit field.`);
    for (c ??= h + (u ?? 1) - 1, u ??= c - h + 1, l = c; n.length <= a + 1 && s.length < V3; ) {
      let d = i * a - 1;
      if (c <= d) {
        n.push({ start: h, end: c, bits: u, label: o.label }), c === d && (s.push(n), n = [], i++);
        break;
      }
      n.push({ start: h, end: d, bits: d - h, label: o.label }), s.push(n), n = [], i++, h = d + 1, u = c - h;
    }
  }
  return n.length > 0 && s.push(n), { type: "packet", title: e.title || r, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, bitsPerRow: a, rows: s };
}
var X0 = [{ name: "packet-beta", pattern: "packet-beta" }, Pr("packet"), { name: "-", pattern: "-", longer: [fr] }, { name: "+", pattern: "+" }, { name: ":", pattern: ":" }, aa, Br, di, { name: "INT", pattern: /0|[1-9][0-9]*(?!\.)/y }, pl, La, Oa, fr, la, ia];
function X3(e) {
  let t = new Sr(Ar(e, X0, "packet"), X0, "packet"), r = { $type: "Packet", blocks: [] }, a = () => {
    if (t.kind !== -1) for (t.kind !== 10 && t.fail("a line break or the end of input"); t.kind === 10; ) t.i++;
  };
  for (; t.kind === 10; ) t.i++;
  for (t.accept(0) || t.expect(1); t.kind !== -1; ) switch (t.kind) {
    case 10:
      t.i++;
      break;
    case 5:
      r.accDescr = Cr(t.take()), a();
      break;
    case 6:
      r.accTitle = Tr(t.take()), a();
      break;
    case 7:
      r.title = Er(t.take()), a();
      break;
    case 8:
    case 3: {
      let s = { $type: "PacketBlock", label: "" };
      t.accept(3) ? s.bits = Number(t.expect(8)) : (s.start = Number(t.take()), t.accept(2) && (s.end = Number(t.expect(8)))), t.expect(4), s.label = Fr(t.expect(9)), r.blocks.push(s), a();
      break;
    }
    default:
      t.fail("a field, a title, or a line break");
  }
  return r;
}
function Mf(e, t, r, a, s, l = 0) {
  if (e === "" || t <= 0) return;
  let n = s.width(e, r, l);
  if (n <= t) return { text: e, size: r, width: n };
  let i = Math.max(a, Math.floor(r * t / n));
  for (; i >= a; ) {
    if (n = s.width(e, i, l), n <= t) return { text: e, size: i, width: n };
    i--;
  }
  let o = Array.from(e), h = 0, c = o.length - 1;
  for (; h < c; ) {
    let d = h + c + 1 >> 1;
    s.width(o.slice(0, d).join("").trimEnd() + "…", a, l) <= t ? h = d : c = d - 1;
  }
  if (h === 0) return;
  let u = o.slice(0, h).join("").trimEnd() + "…";
  return n = s.width(u, a, l), n <= t ? { text: u, size: a, width: n } : void 0;
}
function Z3(e, t, r) {
  return ur(r, (a) => Q3(e, t, r, a));
}
function Q3(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = Math.round(s * 0.625), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = t.packet ?? {}, c = es(t, "rowHeight", 32, 1, 400), u = es(t, "bitWidth", 32, 1, 400), d = es(t, "paddingX", 5, 0, 400), p = es(t, "paddingY", 5, 0, 400), g = h.showBits !== !1, y = h.bitOrder === "descending", b = e.bitsPerRow, x = e.rows;
  if (a) {
    let A = Math.max(1, Math.floor(((r.maxWidth ?? 320) - 2 * o) / Math.min(u, 18)));
    b = Math.min(b, Math.max(8, 2 ** Math.floor(Math.log2(A))));
    let m = e.rows[e.rows.length - 1], I = m?.[m.length - 1]?.end ?? 0;
    Math.ceil((I + 1) / b) > 1e4 && (b = e.bitsPerRow), u = Math.min(u, Math.max(18, ((r.maxWidth ?? 320) - 2 * o) / b));
    let k = (B) => B.bits === B.end - B.start, w = [];
    for (let B of e.rows) for (let N of B) {
      let j = w[w.length - 1];
      j && k(j) && k(N) && j.label === N.label && N.start === j.end + 1 && N.start % e.bitsPerRow === 0 ? (j.end = N.end, j.bits = j.end - j.start) : w.push({ ...N });
    }
    x = [];
    for (let B of w) for (let N = B.start; N <= B.end; ) {
      let j = Math.min(B.end, (Math.floor(N / b) + 1) * b - 1), F = Math.floor(N / b);
      (x[F] ?? (x[F] = [])).push({ ...B, start: N, end: j }), N = j + 1;
    }
  }
  let v = /* @__PURE__ */ new Map();
  if (a) for (let A of x) for (let m of A) {
    let I = Math.max(1, (m.end - m.start + 1) * u - Math.min(d, u - 1) - 6), k = No(Tt(m.label).trim(), i, l, I);
    v.set(m, k);
  }
  let $ = g ? n + 4 : 0, S = x.map((A) => {
    let m = c;
    if (a) for (let I of A) m = Math.max(m, v.get(I).height + 10);
    return m;
  }), R = [], D = 0;
  for (let A of S) R.push(D), D += $ + A + p;
  x.length && (D -= p);
  let O = Math.min(d, u - 1), U = x.length > 0 ? b * u - O : 0, q = je(e.title, !1, i, s, a ? Qt(r) : 4e3, 1), C = q.height > 0 ? q.height + (D > 0 ? 12 : 0) : 0, ee = /* @__PURE__ */ new Map(), ie = (A, m) => {
    let I = ee.get(A);
    return I || ee.set(A, I = /* @__PURE__ */ new Map()), I.has(m) || I.set(m, Mf(Tt(A).trim(), m, l, Math.round(s * 0.5), i)), I.get(m);
  }, G = o + Math.max(0, (q.width - U) / 2), z = "", _ = "";
  x.forEach((A, m) => {
    let I = o + R[m] + $, k = S[m];
    for (let w of A) {
      let B = w.end - w.start + 1, N = w.start % b, j = G + (y ? b - N - B : N) * u, F = B * u - O, Y = a ? void 0 : ie(w.label, F - 6);
      if (z += `<g class="pele-node" data-id="${w.start}-${w.end}"><rect x="${f(j)}" y="${f(I)}" width="${f(F)}" height="${f(k)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>` + (a ? Pe(v.get(w), j + F / 2, I + k / 2, "") : Y && Y.size <= k ? `<text x="${f(j + F / 2)}" y="${f(I + k / 2 + Y.size * 0.35)}"${Y.size === l ? "" : ` font-size="${f(Y.size)}"`}>${it(Y.text)}</text>` : "") + "</g>", !g) continue;
      let W = y ? w.end : w.start, K = y ? w.start : w.end;
      B === 1 ? _ += `<text x="${f(j + F / 2)}" y="${f(I - 4)}" text-anchor="middle">${W}</text>` : _ += `<text x="${f(j)}" y="${f(I - 4)}">${W}</text><text x="${f(j + F)}" y="${f(I - 4)}" text-anchor="end">${K}</text>`;
    }
  });
  let T = Math.ceil(Math.max(U, q.width) + 2 * o), E = Math.ceil(D + C + 2 * o), M = (z ? `<g class="pele-packet-fields" font-size="${l}" text-anchor="middle">${z}</g>` : "") + (_ ? `<g class="pele-packet-bits" font-size="${n}" fill="var(--_m)">${_}</g>` : "") + Pe(q, T / 2, E - o - q.height / 2, ' class="pele-title" font-weight="var(--_tw)"');
  return { svg: xt("packet", T, E, s, r, e, M), width: T, height: E, links: [] };
}
var J3 = { type: "packet", parse: (e, t, r) => K3(X3(e), t, r), render: Z3 };
function eE(e, t) {
  let r = /* @__PURE__ */ new Map();
  for (let { label: a, value: s } of e.sections) {
    if (s < 0) throw new at(`"${a}" has invalid value: ${s}. Negative values are not allowed in pie charts. All slice values must be >= 0.`, "semantic", { type: "pie" });
    r.has(a) || r.set(a, s);
  }
  return { type: "pie", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, showData: e.showData, sections: r };
}
function Z0(e, t) {
  let r = t;
  for (let a = e.charCodeAt(r); a >= 48 && a <= 57; a = e.charCodeAt(r)) r++;
  return r;
}
function tE() {
  let e = 0, t = 0, r = -1;
  return (a, s) => {
    let l = a.charCodeAt(s) === 45 ? s + 1 : s;
    if ((l < e || l >= t) && (e = l, t = Z0(a, l), r = -1, t > l && a.charCodeAt(t) === 46)) {
      let n = Z0(a, t + 1), i = n - t - 1;
      i > 0 && a.charCodeAt(n) !== 46 ? r = n : i > 1 && (r = n - 1);
    }
    return t === l ? -1 : r >= 0 ? r : a.charCodeAt(l) === 48 ? a.charCodeAt(l + 1) === 46 ? -1 : l + 1 : a.charCodeAt(t) !== 46 ? t : t - 1 > l ? t - 1 : -1;
  };
}
var Q0 = [Pr("showData"), Pr("pie"), { name: ":", pattern: ":" }, { name: "NUMBER_PIE", pattern: /(?:-?[0-9]+\.[0-9]+(?!\.))|(?:-?(0|[1-9][0-9]*)(?!\.))/y, scanner: tE, first: "-0123456789" }, aa, Br, di, pl, La, Oa, fr, la, ia];
function rE(e) {
  let t = new Sr(Ar(e, Q0, "pie"), Q0, "pie"), r = { $type: "Pie", showData: !1, sections: [] }, a = () => {
    if (t.kind !== -1) for (t.kind !== 8 && t.fail("a line break or the end of input"); t.kind === 8; ) t.i++;
  };
  for (; t.kind === 8; ) t.i++;
  for (t.expect(1), r.showData = t.accept(0); t.kind !== -1; ) switch (t.kind) {
    case 8:
      t.i++;
      break;
    case 4:
      r.accDescr = Cr(t.take()), a();
      break;
    case 5:
      r.accTitle = Tr(t.take()), a();
      break;
    case 6:
      r.title = Er(t.take()), a();
      break;
    case 7: {
      let s = Fr(t.take());
      t.expect(2);
      let l = Number(t.expect(3));
      r.sections.push({ $type: "PieSection", label: s, value: l }), a();
      break;
    }
    default:
      t.fail("a section, a title, or a line break");
  }
  return r;
}
var aE = 120, Fi = 12, jc = 26, qc = 32, J0 = 28;
function Vc(e, t) {
  return e.pie?.[t];
}
function Sl(e, t) {
  return `${f(Math.sin(e) * t)},${f(-Math.cos(e) * t)}`;
}
function lE(e, t, r, a) {
  if (t - e >= Math.PI * 2 - 1e-9) {
    let l = (n, i) => `M0,${f(-n)}A${f(n)},${f(n)} 0 1 ${i} 0,${f(n)}A${f(n)},${f(n)} 0 1 ${i} 0,${f(-n)}Z`;
    return l(r, 1) + (a > 0 ? l(a, 0) : "");
  }
  let s = t - e > Math.PI ? 1 : 0;
  return a <= 0 ? `M0,0L${Sl(e, r)}A${f(r)},${f(r)} 0 ${s} 1 ${Sl(t, r)}Z` : `M${Sl(e, r)}A${f(r)},${f(r)} 0 ${s} 1 ${Sl(t, r)}L${Sl(t, a)}A${f(a)},${f(a)} 0 ${s} 0 ${Sl(e, a)}Z`;
}
function iE(e, t, r) {
  return sh(r, aE * 2, 140, (a, s) => sE(e, t, r, a / 2, s));
}
function sE(e, t, r, a, s) {
  let l = r.fontSize ?? 16, n = Math.round(l * 0.875), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = Vc(t, "textPosition"), c = typeof h == "number" && h >= 0 && h <= 1 ? h : 0.75, u = Vc(t, "donutHole"), d = typeof u == "number" && u > 0 && u <= 0.9 ? u * a : 0, p = String(Vc(t, "legendPosition") ?? "right"), g = s && (p === "left" || p === "right") ? "bottom" : p, y = [...e.sections], b = 0;
  for (let [, K] of y) b += K;
  let x = y.map(([K, H]) => je(e.showData ? `${K} [${H}]` : K, !1, i, n, 4e3)), v = 0;
  for (let K of x) v = Math.max(v, K.width);
  v += x.length > 0 ? Fi + 8 : 0;
  let $ = x.length * jc, S = je(e.title, !1, i, l, Qt(r), 1), R = S.height > 0 ? S.height + 16 : 0, D = y.map(([, K]) => {
    let H = b > 0 ? K / b : 0;
    return H * 100 >= 1 && (H * 100).toFixed(0) !== "0" ? H : 0;
  }), O = D.map((K) => K === 0 || K >= 0.5 ? !1 : 2 * a * c * Math.sin(K * Math.PI) < i.width((K * 100).toFixed(0) + "%", n, 0) + 6), U = O.includes(!0) ? J0 : 0, q = g === "left" || g === "right" || g === "center" ? g : "", C = g === "top" || g === "bottom", ee = (a + U) * 2, ie = ee, G = ee;
  q === "left" || q === "right" ? (ie += v > 0 ? qc + v : 0, G = Math.max(G, $)) : C && (ie = Math.max(ie, v), G += $ > 0 ? 20 + $ : 0), ie = Math.max(ie, S.width);
  let z = o + (q === "left" ? v + qc + ee / 2 : q === "right" ? ee / 2 : ie / 2), _ = o + R, T = _ + (g === "top" ? $ + 20 + ee / 2 : C ? ee / 2 : G / 2), E = "", M = "", A = "", m = 0, I = a + J0 / 2, k = [], w = (K, H, te) => k.every((Q) => Math.abs(K - Q.x) >= (te + Q.width) / 2 + 2 || Math.abs(H - Q.y) >= n + 2);
  y.forEach(([K], H) => {
    let te = D[H];
    if (te === 0) return;
    let Q = m + te * Math.PI * 2;
    E += `<path class="pele-slice" data-id="${Ye(K)}" d="${lE(m, Q, a, d)}" fill="${vt(H)}"/>`;
    let L = (m + Q) / 2, X = (te * 100).toFixed(0) + "%";
    if (O[H]) {
      let le = i.width(X, n, 0), J = L;
      for (let ae = 0; ae < 360 && !w(Math.sin(J) * I, -Math.cos(J) * I, le); ae++) J += 2 / I;
      let V = Math.sin(J) * I, Z = -Math.cos(J) * I;
      k.push({ x: V, y: Z, width: le }), A += `<text x="${f(V)}" y="${f(Z + n * 0.35)}">${X}</text>`;
    } else {
      let le = a * c;
      M += `<text x="${f(Math.sin(L) * le)}" y="${f(-Math.cos(L) * le + n * 0.35)}"${eh(H)}>${X}</text>`;
    }
    m = Q;
  }), E === "" && (E = `<circle class="pele-slice" r="${a}" fill="none" stroke="var(--_b)"/>`);
  let B = "", N, j;
  q === "right" ? (N = z + ee / 2 + qc, j = _ + (G - $) / 2) : q === "left" ? (N = o, j = _ + (G - $) / 2) : q === "center" ? (N = z - v / 2, j = T - $ / 2) : (N = o + (ie - v) / 2, j = g === "top" ? _ : _ + ee + 20), x.forEach((K, H) => {
    let te = j + H * jc + jc / 2;
    B += `<g class="pele-legend-item" data-id="${Ye(y[H][0])}"><rect x="${f(N)}" y="${f(te - Fi / 2)}" width="${Fi}" height="${Fi}" rx="2" fill="${vt(H)}"/>` + Pe(K, N + Fi + 8 + K.width / 2, te, "") + "</g>";
  });
  let F = Math.ceil(ie + 2 * o), Y = Math.ceil(G + R + 2 * o), W = Pe(S, F / 2, o + S.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g class="pele-slices" transform="translate(${f(z)},${f(T)})" stroke="var(--_bg)" stroke-width="1" stroke-linejoin="round">${E}</g>` + (M ? `<g class="pele-slice-labels" transform="translate(${f(z)},${f(T)})" font-size="${n}" text-anchor="middle" fill="var(--_bg)">${M}</g>` : "") + (A ? `<g class="pele-slice-labels" transform="translate(${f(z)},${f(T)})" font-size="${n}" text-anchor="middle">${A}</g>` : "") + (B ? `<g class="pele-legend" font-size="${n}">${B}</g>` : "");
  return { svg: xt("pie", F, Y, l, r, e, W), width: F, height: Y, links: [] };
}
var nE = { type: "pie", parse: (e, t, r) => eE(rE(e), r), render: iE }, oE = /^\d+$/, e1 = /^#?([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/, hE = /^\d+px$/;
function An(e, t, r) {
  return new at(`value for ${e} ${t} is invalid, please use a valid ${r}`, "semantic", { type: "quadrantChart" });
}
function cE(e) {
  let t = e.trim(), r = t.indexOf(":");
  if (r === -1) return [t, "undefined"];
  let a = t.slice(r + 1).trimStart(), s = a.indexOf(":");
  return [t.slice(0, r).trimEnd(), s === -1 ? a : a.slice(0, s).trimEnd()];
}
function t1(e) {
  let t = {};
  for (let r of e) {
    let [a, s] = cE(r);
    if (a === "radius") {
      if (!oE.test(s)) throw An(a, s, "number");
      t.radius = parseInt(s);
    } else if (a === "color") {
      if (!e1.test(s)) throw An(a, s, "hex code");
      t.color = s;
    } else if (a === "stroke-color") {
      if (!e1.test(s)) throw An(a, s, "hex code");
      t.strokeColor = s;
    } else if (a === "stroke-width") {
      if (!hE.test(s)) throw An(a, s, "number of pixels (eg. 10px)");
      t.strokeWidth = s;
    } else throw new at(`style named ${a} is not supported.`, "semantic", { type: "quadrantChart" });
  }
  return t;
}
function oa(e) {
  return { text: e.text.trim(), type: e.type };
}
var dE = class {
  type = "quadrantChart";
  title;
  accTitle;
  accDescr;
  quadrants = [void 0, void 0, void 0, void 0];
  xAxisLeft;
  xAxisRight;
  yAxisBottom;
  yAxisTop;
  points = [];
  classes = /* @__PURE__ */ new Map();
  setQuadrant1Text(e) {
    this.quadrants[0] = oa(e);
  }
  setQuadrant2Text(e) {
    this.quadrants[1] = oa(e);
  }
  setQuadrant3Text(e) {
    this.quadrants[2] = oa(e);
  }
  setQuadrant4Text(e) {
    this.quadrants[3] = oa(e);
  }
  setXAxisLeftText(e) {
    this.xAxisLeft = oa(e);
  }
  setXAxisRightText(e) {
    this.xAxisRight = oa(e);
  }
  setYAxisBottomText(e) {
    this.yAxisBottom = oa(e);
  }
  setYAxisTopText(e) {
    this.yAxisTop = oa(e);
  }
  addPoint(e, t, r, a, s) {
    this.points.push({ x: Number(r), y: Number(a), text: oa(e), className: t, ...t1(s) });
  }
  addClass(e, t) {
    this.classes.set(e, t1(t));
  }
  setDiagramTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
};
function rr(e, t, r) {
  for (let a = 0; a < r.length; a++) {
    let s = e.charCodeAt(t + a), l = r.charCodeAt(a);
    if (s !== l && !(l >= 97 && l <= 122 && s === l - 32)) return !1;
  }
  return !0;
}
var r1 = ["$end", "INVALID", "NEWLINE", "title", "title_value", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "X-AXIS", "Y-AXIS", "AXIS-TEXT-DELIMITER", "QUADRANT_1", "QUADRANT_2", "QUADRANT_3", "QUADRANT_4", "CLASSDEF", "MD_STR", "STR", "class_name", "point_start", "point_x", "point_y", "QUADRANT", "ALPHA", "UNICODE_TEXT", "COLON", "PLUS", "COMMA", "EQUALS", "MULT", "BRKT", "UNDERSCORE", "DOT", "AMP", "MINUS", "NUM", "SPACE", "SEMI", "PUNCTUATION", "EOF"], Kc = [41, 4, 6, 8, 9, 19], vf = new Uint8Array(128);
for (let [e, t] of [[":", 27], ["+", 28], [",", 29], ["=", 30], ["*", 31], ["#", 32], ["_", 33], [".", 34], ["&", 35], ["-", 36], [" 	\v\f", 38], [";", 39], ["!$%'`?\\/", 40]]) for (let r = 0; r < e.length; r++) vf[e.charCodeAt(r)] = t;
function fE(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = 0, h = 0, c = 0, u = 0, d = 0, p = 0, g = 0, y = 0, b = (O, U, q) => {
    r.push(O), a.push(e.slice(U, q)), s.push(U), i = q;
  }, x = (O) => {
    l.push(n), n = O;
  }, v = () => {
    l.length > 0 && (n = l.pop());
  }, $ = (O) => {
    let U = e.indexOf(`
`, O);
    return U === -1 ? t : U;
  }, S = (O) => {
    for (; e.charCodeAt(O) === 32; ) O++;
    return O;
  }, R = (O) => {
    for (; O < t && Ke(e.charCodeAt(O)); ) O++;
    return O;
  }, D = (O) => {
    let U = e.charCodeAt(O);
    if (U === 49) return O + 1;
    if (U !== 48) return -1;
    let q = O + 1;
    if (q < t && !vo(e.charCodeAt(q)) && yt(e.charCodeAt(q + 1))) for (q += 2; yt(e.charCodeAt(q)); ) q++;
    return q;
  };
  e: for (; i < t; ) {
    let O = e.charCodeAt(i), U = e.charCodeAt(i + 1);
    switch (n) {
      case 0:
        break;
      case 1:
      case 2:
      case 3:
        b(Kc[n], i, $(i)), v();
        continue;
      case 4:
        if (O === 125) i++, v();
        else {
          let _ = e.indexOf("}", i);
          b(9, i, _ === -1 ? t : _);
        }
        continue;
      case 5:
        if (O === 34) i++, v();
        else {
          let _ = e.indexOf('"', i);
          b(19, i, _ === -1 ? t : _);
        }
        continue;
      case 6:
        if (O === 96 && U === 34) {
          i += 2, v();
          continue;
        }
        if (O !== 96 && O !== 34) {
          let _ = i + 1;
          for (let T = e.charCodeAt(_); _ < t && T !== 96 && T !== 34; T = e.charCodeAt(++_)) ;
          b(18, i, _);
          continue;
        }
        break e;
      case 7:
        if (nt(O)) {
          let _ = i + 1;
          for (; nt(e.charCodeAt(_)); ) _++;
          b(20, i, _), v();
          continue;
        }
        break e;
      case 8: {
        let _ = D(i);
        if (_ !== -1) {
          b(22, i, _), x(9);
          continue;
        }
        let T = R(i);
        if (e.charCodeAt(T) === 93) {
          i = S(T + 1), v();
          continue;
        }
        break e;
      }
      case 9: {
        let _ = R(i);
        if (e.charCodeAt(_) === 44) {
          i = R(_ + 1), n = 10;
          continue;
        }
        break e;
      }
      case 10: {
        let _ = D(i);
        if (_ !== -1) {
          b(23, i, _), v();
          continue;
        }
        break e;
      }
    }
    if (O === 37 && U === 37) {
      i = $(i + 2);
      continue;
    }
    if (O === 10 || O === 13) {
      let _ = i + 1;
      for (let T = e.charCodeAt(_); T === 10 || T === 13; T = e.charCodeAt(++_)) ;
      b(2, i, _);
      continue;
    }
    let q = O | 32;
    if (q === 116 && rr(e, i, "title") && !nt(e.charCodeAt(i + 5))) {
      b(3, i, i + 5), x(1);
      continue;
    }
    if (q === 97 && rr(e, i, "acc")) {
      let _ = rr(e, i + 3, "descr");
      if (_ || rr(e, i + 3, "title")) {
        let T = R(i + 8), E = e.charCodeAt(T);
        if (E === 58) {
          b(_ ? 7 : 5, i, R(T + 1)), x(_ ? 3 : 2);
          continue;
        }
        if (E === 123 && _) {
          i = R(T + 1), x(4);
          continue;
        }
      }
    }
    let C = i;
    O === 32 && ((i < o || i >= h) && (o = i, h = S(i)), C = h);
    let ee = e.charCodeAt(C), ie = ee | 32, G = 0, z = 0;
    if (ie === 120 && rr(e, C, "x-axis")) G = 10, z = C + 6;
    else if (ie === 121 && rr(e, C, "y-axis")) G = 11, z = C + 6;
    else if (ee === 45) {
      if (C < c || C >= u) for (c = C, u = C; e.charCodeAt(u) === 45; ) u++;
      u - C >= 2 && e.charCodeAt(u) === 62 && (G = 12, z = u + 1);
    } else if (ie === 113 && rr(e, C, "quadrant")) {
      let _ = e.charCodeAt(C + 9);
      e.charCodeAt(C + 8) === 45 && _ >= 49 && _ <= 52 ? (G = 13 + _ - 49, z = C + 10) : rr(e, C + 8, "chart") && (G = 24, z = C + 13);
    }
    if (G !== 0) {
      b(G, i, S(z));
      continue;
    }
    if (q === 99 && rr(e, i, "classdef") && !nt(e.charCodeAt(i + 8))) {
      b(17, i, i + 8);
      continue;
    }
    if (O === 34) {
      U === 96 ? (i += 2, x(6)) : (i++, x(5));
      continue;
    }
    if (O === 58 && U === 58 && e.charCodeAt(i + 2) === 58) {
      i += 3, x(7);
      continue;
    }
    if (O === 58 || Ke(O)) {
      let _ = i;
      if (O !== 58 && ((i < d || i >= p) && (d = i, p = R(i)), _ = p), e.charCodeAt(_) === 58 && ((_ + 1 < g || _ + 1 >= y) && (g = _ + 1, y = R(_ + 1)), e.charCodeAt(y) === 91)) {
        b(21, i, R(y + 1)), x(8);
        continue;
      }
    }
    if (Ql(O)) {
      let _ = i + 1;
      for (; Ql(e.charCodeAt(_)); ) _++;
      b(25, i, _);
      continue;
    }
    if (O >= 128) {
      let _ = i + 1;
      for (; e.charCodeAt(_) >= 128; ) _++;
      b(26, i, _);
      continue;
    }
    if (yt(O)) {
      let _ = i + 1;
      for (; yt(e.charCodeAt(_)); ) _++;
      b(37, i, _);
      continue;
    }
    if (vf[O] !== 0) {
      b(vf[O], i, i + 1);
      continue;
    }
    break;
  }
  return i < t ? (r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s }) : (n < Kc.length && (r.push(Kc[n]), a.push(""), s.push(t)), r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s });
}
function fh(...e) {
  let t = new Uint8Array(42);
  for (let r of e) t[r] = 1;
  return t;
}
var a1 = fh(40, 35, 37, 25, 29, 28, 30, 31, 34, 32, 33, 26), l1 = fh(25, 37, 36, 29, 27, 35, 32, 31, 26), Xc = fh(25, 37, 27, 38, 32, 36), i1 = fh(2, 39, 41), uE = ["setQuadrant1Text", "setQuadrant2Text", "setQuadrant3Text", "setQuadrant4Text"], pE = "'STR', 'MD_STR', 'ALPHA', 'NUM', 'UNICODE_TEXT', 'PUNCTUATION'";
function gE(e, t) {
  let { types: r, texts: a, starts: s } = fE(e), l = 0, n = (u) => {
    let d = r[l];
    throw d === 1 ? bt("quadrantChart", e, s[l], "", !0) : bt("quadrantChart", e, s[l], `Expecting ${u}, got '${r1[d]}'`);
  }, i = (u) => (r[l] !== u && n(`'${r1[u]}'`), a[l++]), o = (u) => u === 19 || u === 18 || a1[u] === 1, h = () => {
    let u = r[l];
    o(u) || n(pE);
    let d = a[l++];
    for (; a1[r[l]] === 1 || r[l] === 38 || r[l] === 36; ) d += a[l++];
    return { text: d, type: u === 18 ? "markdown" : "text" };
  }, c = () => {
    let u = [];
    for (; ; ) {
      Xc[r[l]] === 0 && n("'ALPHA', 'NUM', 'COLON', 'SPACE', 'BRKT', 'MINUS'");
      let d = a[l++];
      for (; Xc[r[l]] === 1; ) d += a[l++];
      if (u.push(d.trim()), r[l] !== 29) return u;
      l++;
    }
  };
  for (; i1[r[l]] === 1 || r[l] === 38; ) l++;
  for (i(24); r[l] !== 0; ) {
    for (; r[l] === 38; ) l++;
    let u = r[l];
    switch (u) {
      case 17: {
        l++, i(38), l1[r[l]] === 0 && n("'ALPHA', 'NUM', 'UNICODE_TEXT'");
        let d = a[l++];
        for (; l1[r[l]] === 1; ) d += a[l++];
        i(38), t.addClass(d, c());
        break;
      }
      case 10:
      case 11: {
        l++;
        let d = h(), p;
        r[l] === 12 && (l++, o(r[l]) ? p = h() : d.text += " ⟶ "), u === 10 ? (t.setXAxisLeftText(d), p && t.setXAxisRightText(p)) : (t.setYAxisBottomText(d), p && t.setYAxisTopText(p));
        break;
      }
      case 13:
      case 14:
      case 15:
      case 16:
        l++, t[uE[u - 13]](h());
        break;
      case 3:
        l++, t.setDiagramTitle(i(4).trim());
        break;
      case 5:
        l++, t.setAccTitle(i(6).trim());
        break;
      case 7:
        l++, t.setAccDescription(i(8).trim());
        break;
      case 9:
        t.setAccDescription(a[l++].trim());
        break;
      default:
        if (o(u)) {
          let d = h(), p = r[l] === 20 ? a[l++] : "";
          i(21);
          let g = i(22), y = i(23);
          t.addPoint(d, p, g, y, Xc[r[l]] === 1 ? c() : []);
        }
    }
    i1[r[l]] === 0 && n("'NEWLINE', 'SEMI', 'EOF'"), l++;
  }
}
var s1 = 4, mE = 300;
function Ho(e, t) {
  return e.quadrantChart?.[t];
}
function ha(e, t, r, a) {
  let s = Ho(e, t);
  return typeof s == "number" && s >= 0 ? Math.min(s, a) : r;
}
function zi(e, t, r) {
  let a = Ho(e, t);
  return typeof a == "number" && Number.isFinite(a) ? Math.min(72, Math.max(4, a)) : r;
}
function n1(e) {
  return e.startsWith("#") ? e : "#" + e;
}
function yE(e, t, r) {
  let a = r.fontSize ?? 16, s = zi(t, "titleFontSize", a), l = zi(t, "quadrantLabelFontSize", a), n = zi(t, "xAxisLabelFontSize", Math.round(a * 0.875)), i = zi(t, "yAxisLabelFontSize", Math.round(a * 0.875)), o = zi(t, "pointLabelFontSize", Math.round(a * 0.75)), h = (Z, ae) => Z === ae ? "" : ` font-size="${Z}"`, c = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), u = Math.round(Math.max(100, ha(t, "chartWidth", 500, 4e3))), d = Math.round(nh(r, u, 280)), p = Math.round(Math.max(100, ha(t, "chartHeight", 500, 4e3)) * d / u), g = ha(t, "quadrantPadding", r.padding ?? 8, 200), y = ha(t, "xAxisLabelPadding", 5, 200), b = ha(t, "yAxisLabelPadding", 5, 200), x = e.points.length > 0, v = (Z, ae, oe) => je(Z?.text, Z?.type === "markdown", c, ae, Math.max(oe, 40)), $ = je(e.title, !1, c, s, Math.max(d - 2 * g, 40), 1), S = ha(t, "titlePadding", 10, 200), R = $.height > 0 ? $.height + S : 0, D = !!(e.xAxisLeft?.text || e.xAxisRight?.text), O = !!(e.yAxisBottom?.text || e.yAxisTop?.text), U = x || Ho(t, "xAxisPosition") === "bottom", q = Ho(t, "yAxisPosition") === "right", C = d - 2 * g, ee = v(e.xAxisLeft, n, e.xAxisRight ? C / 2 - 16 : C), ie = v(e.xAxisRight, n, C / 2 - 16), G = Math.max(ee.height, ie.height), z = D ? G + y : 0, _ = p - 2 * g - R - z, T = v(e.yAxisBottom, i, e.yAxisTop ? _ / 2 - 16 : _), E = v(e.yAxisTop, i, _ / 2 - 16), M = Math.max(T.height, E.height), A = O ? M + b : 0, m = g + (q ? 0 : A), I = g + R + (U ? 0 : z), k = Math.max(0, C - A), w = Math.max(0, _), B = Math.max(0, (k - s1) / 2), N = Math.max(0, (w - s1) / 2), j = [m + B, I, m + k - B, I + w, m, I + N, m + k, I + w - N], F = (Z, ae, oe, ue, he) => {
    for (let re = Z; re < j.length; re += 4) if (!(j[re] >= j[re + 2] || j[re + 1] >= j[re + 3]) && ae < j[re + 2] && ue > j[re] && oe < j[re + 3] && he > j[re + 1]) return !1;
    return !0;
  }, Y = ha(t, "quadrantTextTopPadding", 5, 200), W = "";
  for (let Z = 0; Z < 4; Z++) {
    let ae = Z === 0 || Z === 3 ? m + k - B : m, oe = Z < 2 ? I : I + w - N, ue = v(e.quadrants[Z], l, B - 16), he = ae + B / 2, re = x ? oe + Y + ue.height / 2 : oe + N / 2;
    j.push(he - ue.width / 2, re - ue.height / 2, he + ue.width / 2, re + ue.height / 2), W += `<g class="pele-quadrant" data-id="${Z + 1}"><rect x="${f(ae)}" y="${f(oe)}" width="${f(B)}" height="${f(N)}"${wt}/>` + Pe(ue, he, re, ` class="pele-label"${h(l, a)} fill="var(--_fg)" stroke="none"`) + "</g>";
  }
  let K = "";
  if (D) {
    let Z = U ? I + w + y + G / 2 : I - y - G / 2;
    K += Pe(ee, ie.height > 0 ? m + k / 4 : m + ee.width / 2, Z, "") + Pe(ie, m + k * 3 / 4, Z, "");
  }
  if (O) {
    let Z = q ? m + k + b + M / 2 : m - b - M / 2, ae = (oe, ue) => oe.height > 0 ? `<g transform="translate(${f(Z)},${f(ue)}) rotate(-90)"${h(i, n)}>${Pe(oe, 0, 0, "")}</g>` : "";
    K += ae(T, E.height > 0 ? I + w * 3 / 4 : I + w - T.width / 2) + ae(E, I + w / 4);
  }
  let H = ha(t, "pointRadius", 5, 200), te = ha(t, "pointTextPadding", 5, 200), Q = vt(0), L = [], X = [];
  for (let Z of e.points) {
    if (!(Z.x >= 0 && Z.x <= 1 && Z.y >= 0 && Z.y <= 1)) continue;
    let ae = e.classes.get(Z.className), oe = Math.min(Z.radius ?? ae?.radius ?? H, 2e3), ue = Z.color ?? ae?.color, he = Z.strokeColor ?? ae?.strokeColor, re = Z.strokeWidth ?? ae?.strokeWidth, P = [];
    ue && P.push("fill:" + n1(ue)), re && (he && P.push("stroke:" + n1(he)), P.push("stroke-width:" + re));
    let ne = m + Z.x * k, ce = I + (1 - Z.y) * w;
    L.push({ cx: ne, cy: ce, reach: oe + (re ? Math.min(parseInt(re), 400) / 2 : 0), text: v(Z.text, o, k) }), X.push(`<circle class="pele-point${Ht(Z.className)}" data-id="${Ye(Z.text.text)}" cx="${f(ne)}" cy="${f(ce)}" r="${f(oe)}"${re && !he ? ` stroke="${Q}"` : ""}${Dt(P).shape}/>`);
  }
  let le = L.length <= mE;
  if (le) for (let { cx: Z, cy: ae, reach: oe } of L) j.push(Z - oe, ae - oe, Z + oe, ae + oe);
  let J = "";
  for (let { cx: Z, cy: ae, reach: oe, text: ue } of L) {
    let he = ue.width / 2, re = ue.size * 0.6 + (ue.height - ue.lineHeight) / 2, P = oe + te, ne = Math.min(P, Math.max(0, (B - ue.width) / 2)), ce = 8 + 4 * (Z < m + k / 2 ? ae < I + w / 2 ? 1 : 2 : ae < I + w / 2 ? 0 : 3), pe = Math.max(ae + P, j[ce + 3] + te) + re, Me = [Z, ae + P + re, Z, ae - P - re, Z + P + he, ae, Z - P - he, ae, Z, pe], xe = Z, ve = Me[1], Ae = !1;
    for (let Ee = 0; Ee < 20; Ee += 2) {
      let me = Ee % 10, we = me === 8 ? ne : 0, Se = (me < 4 || me === 8) && ue.width < k ? Math.min(Math.max(Me[me], m + he + we), m + k - he - we) : Me[me], se = Me[me + 1];
      if (Se - he < m || Se + he > m + k || se - re < I || se + re > I + w) continue;
      let ye = !le || F(Ee < 10 ? 0 : 8, Se - he, se - re, Se + he, se + re);
      if ((!Ae || ye) && (xe = Se, ve = se, Ae = !0), ye) break;
    }
    le && j.push(xe - he, ve - re, xe + he, ve + re), J += Pe(ue, xe, ve, ' class="pele-label"');
  }
  let V = Pe($, d / 2, S / 2 + $.height / 2, ` class="pele-title"${h(s, a)} font-weight="var(--_tw)"`) + `<g class="pele-quadrants" fill="var(--_s)" stroke="var(--_b)">${W}</g>` + (K ? `<g class="pele-axis-labels" font-size="${n}" fill="var(--_m)">${K}</g>` : "") + (L.length > 0 ? `<g class="pele-points" fill="${Q}">${X.reverse().join("")}</g><g class="pele-point-labels" font-size="${o}">${J}</g>` : "");
  return { svg: xt("quadrantChart", d, p, a, r, e, V), width: d, height: p, links: [] };
}
var xE = { type: "quadrantChart", parse(e, t, r) {
  let a = new dE();
  return a.title = r, gE(e, a), a;
}, render: yE }, o1 = 32;
function h1(e) {
  return new at(e, "semantic", { type: "radar" });
}
function wE(e, t) {
  let r = e.axes.map((l) => ({ name: l.name, label: l.label ?? l.name })), a = e.curves.map((l) => {
    let n;
    if (l.entries[0].axis === void 0) n = l.entries.map((i) => i.value);
    else {
      if (r.length === 0) throw h1("Axes must be populated before curves for reference entries");
      let i = /* @__PURE__ */ new Map();
      for (let o of l.entries) o.axis !== void 0 && !i.has(o.axis.$refText) && i.set(o.axis.$refText, o.value);
      n = r.map((o) => {
        let h = i.get(o.name);
        if (h === void 0) throw h1("Missing entry for axis " + o.label);
        return h;
      });
    }
    return { name: l.name, label: l.label ?? l.name, entries: n };
  }), s = { showLegend: !0, ticks: 5, max: null, min: 0, graticule: "circle" };
  for (let l of e.options) l.name === "showLegend" ? s.showLegend = l.value : l.name === "graticule" ? s.graticule = l.value : s[l.name] = l.value;
  return s.ticks > o1 && (s.ticks = o1), { type: "radar", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, axes: r, curves: a, options: s };
}
var kf = 0, yo = 0;
function c1(e, t) {
  let r = t;
  for (let a = e.charCodeAt(r); a >= 48 && a <= 57; a = e.charCodeAt(r)) r++;
  return r;
}
function $E(e, t) {
  (t < kf || t >= yo) && (kf = t, yo = c1(e, t));
  let r = yo;
  if (r === t) return -1;
  let a = e.charCodeAt(r) === 46;
  if (a) {
    let s = c1(e, r + 1), l = s - r - 1;
    if (l > 0 && e.charCodeAt(s) !== 46) return s;
    if (l > 1) return s - 1;
  }
  return e.charCodeAt(t) === 48 ? t + 1 : a ? r - 1 > t ? r - 1 : -1 : r;
}
var Zc = aa.pattern, Qc = /[\t ]*accDescr\s*{/y, xo = -2;
function bE(e, t) {
  return Qc.lastIndex = t, Qc.test(e) && (xo === -2 && (xo = e.lastIndexOf("}")), Qc.lastIndex > xo) ? -1 : (Zc.lastIndex = t, Zc.test(e) ? Zc.lastIndex : -1);
}
var Af = { name: "ID", pattern: /[\w]([-\w]*\w)?/y }, d1 = /[-\w]*\w/y;
function f1(e, t) {
  return (r, a, s) => {
    if (e.lastIndex = a, !e.test(r)) return -1;
    let l = e.lastIndex;
    return s === t ? l : (d1.lastIndex = l, d1.test(r) ? -1 : l);
  };
}
var Ga = (e) => ({ name: e, pattern: e, longer: [Af] }), Ha = (e) => ({ name: e, pattern: e }), Fm = [Ha("radar-beta:"), { ...Pr("radar-beta"), longer: [Af] }, Ga("showLegend"), Ga("graticule"), Ga("curve"), Ga("ticks"), Ga("axis"), Ga("max"), Ga("min"), Ha(":"), Ha(","), Ha("["), Ha("]"), Ha("{"), Ha("}"), { name: "GRATICULE", pattern: /circle|polygon/y, match: f1(/circle|polygon/y, 3) }, { name: "BOOLEAN", pattern: /true|false/y, match: f1(/true|false/y, 2) }, { ...aa, match: bE }, Br, fi(String.raw`[-\w]*\w`), { name: "NUMBER", pattern: /(?:[0-9]+\.[0-9]+(?!\.))|(?:0|[1-9][0-9]*(?!\.))/y, match: $E }, pl, Af, La, Oa, fr, la, ia];
function ME(e) {
  return kf = yo = 0, xo = -2, Ar(e, Fm, "radar");
}
function vE(e) {
  let t = new Sr(ME(e), Fm, "radar"), r = { $type: "Radar", axes: [], curves: [], options: [] }, a = () => {
    for (; t.kind === 23; ) t.i++;
  }, s = () => {
    t.kind !== -1 && (t.kind !== 23 && t.fail("a line break or the end of input"), a());
  }, l = () => {
    if (!t.accept(11)) return;
    let u = Fr(t.expect(21));
    return t.expect(12), u;
  }, n = (u) => {
    if (!u) return { $type: "Entry", value: Number(t.expect(20)) };
    let d = { $refText: t.expect(22) };
    return t.accept(9), { $type: "Entry", axis: d, value: Number(t.expect(20)) };
  }, i = () => {
    let u = t.expect(22), d = l(), p = { $type: "Curve", name: u, entries: [] };
    d !== void 0 && (p.label = d), t.expect(13), a(), t.kind !== 20 && t.kind !== 22 && t.fail("a number or an axis name");
    let g = t.kind === 22;
    for (p.entries.push(n(g)); t.accept(10); ) a(), p.entries.push(n(g));
    return a(), t.expect(14), p;
  }, o = () => {
    let u = { $type: "Axis", name: t.expect(22) }, d = l();
    return d !== void 0 && (u.label = d), u;
  }, h = () => {
    let u = t.kind, d = t.take(), p;
    return u === 2 ? p = t.expect(16) === "true" : u === 3 ? p = t.expect(15) : p = Number(t.expect(20)), { $type: "Option", name: d, value: p };
  }, c = () => t.kind === 2 || t.kind === 5 || t.kind === 7 || t.kind === 8 || t.kind === 3;
  for (a(), t.accept(0) || (t.expect(1), t.accept(9)), a(); t.kind !== -1; ) switch (t.kind) {
    case 23:
      t.i++;
      break;
    case 17:
      r.accDescr = Cr(t.take()), s();
      break;
    case 18:
      r.accTitle = Tr(t.take()), s();
      break;
    case 19:
      r.title = Er(t.take()), s();
      break;
    case 6:
      t.i++;
      do
        r.axes.push(o());
      while (t.accept(10));
      break;
    case 4:
      t.i++;
      do
        r.curves.push(i());
      while (t.accept(10));
      break;
    default:
      for (c() || t.fail("an axis, a curve, an option, a title, or a line break"), r.options.push(h()); t.accept(10); ) c() || t.fail("an option"), r.options.push(h());
  }
  return r;
}
var _l = 12, Jc = 26, u1 = 24;
function ca(e, t, r, a, s) {
  let l = e.radar?.[t];
  return typeof l == "number" && l >= a ? Math.min(l, s) : r;
}
function kE(e, t, r, a) {
  let s = Math.min(Math.max(e, t), r), l = a * (s - t);
  return Number.isFinite(l) ? l / (r - t) : a * ((s - t) / (r - t));
}
function AE(e, t) {
  let r = e.length, a = `M${f(e[0].x)},${f(e[0].y)}`;
  for (let s = 0; s < r; s++) {
    let l = e[(s - 1 + r) % r], n = e[s], i = e[(s + 1) % r], o = e[(s + 2) % r];
    a += ` C${f(n.x + (i.x - l.x) * t)},${f(n.y + (i.y - l.y) * t)} ${f(i.x - (o.x - n.x) * t)},${f(i.y - (o.y - n.y) * t)} ${f(i.x)},${f(i.y)}`;
  }
  return a + " Z";
}
function p1(e) {
  let t = "";
  for (let r of e) t += (t ? " " : "") + f(r.x) + "," + f(r.y);
  return t;
}
function EE(e, t, r) {
  let a = ca(t, "width", 320, 1, 4e3);
  return sh(r, a, 160, (s, l) => TE(e, t, r, s, ca(t, "height", 320, 1, 4e3) * s / a, l));
}
function TE(e, t, r, a, s, l) {
  let n = r.fontSize ?? 16, i = Math.round(n * 0.875), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = r.padding ?? 8, c = ca(t, "axisScaleFactor", 1, 0, 10), u = ca(t, "axisLabelFactor", 1.05, 0, 10), d = ca(t, "curveTension", 0.17, 0, 1), p = Math.min(a, s) / 2, { axes: g, curves: y } = e, { ticks: b, graticule: x, min: v } = e.options, $ = g.length, S = g.map((F, Y) => {
    let W = 2 * Math.PI * Y / $ - Math.PI / 2;
    return { x: Math.cos(W), y: Math.sin(W) };
  }), R = e.options.max;
  if (R === null) {
    R = -1 / 0;
    for (let F of y) for (let Y of F.entries) Y > R && (R = Y);
  }
  let D = -a / 2 - ca(t, "marginLeft", 16, 0, 2e3), O = a / 2 + ca(t, "marginRight", 16, 0, 2e3), U = -s / 2 - ca(t, "marginTop", 16, 0, 2e3), q = s / 2 + ca(t, "marginBottom", 16, 0, 2e3), C = "";
  for (let F = 0; F < b; F++) {
    let Y = Math.min(p, p * (F + 1) / b);
    x === "circle" ? C += `<circle r="${f(Y)}"/>` : C += `<polygon points="${p1(S.map((W) => ({ x: W.x * Y, y: W.y * Y })))}"/>`;
  }
  let ee = "", ie = "";
  S.forEach((F, Y) => {
    let W = p * c;
    ee += `M0,0L${f(F.x * W)},${f(F.y * W)}`;
    let K = je(g[Y].label, !1, o, i, 4e3), H = p * u + 6, te = F.x * H + (F.x > 0.01 ? K.width / 2 : F.x < -0.01 ? -K.width / 2 : 0), Q = F.y * H + (F.y > 0.01 ? K.height / 2 : F.y < -0.01 ? -K.height / 2 : 0);
    ie += `<g class="pele-axis-label" data-id="${Ye(g[Y].name)}">${Pe(K, te, Q, "")}</g>`, D = Math.min(D, te - K.width / 2), O = Math.max(O, te + K.width / 2), U = Math.min(U, Q - K.height / 2), q = Math.max(q, Q + K.height / 2);
  });
  let G = "";
  y.forEach((F, Y) => {
    if (F.entries.length !== $) return;
    let W = F.entries.map((te, Q) => {
      let L = kE(te, v, R, p), X = Number.isFinite(L) ? L : 0;
      return { x: S[Q].x * X, y: S[Q].y * X };
    }), K = vt(Y), H = ` class="pele-curve" data-id="${Ye(F.name)}" fill="${K}" stroke="${K}"`;
    G += x === "circle" ? `<path${H} d="${AE(W, d)}"/>` : `<polygon${H} points="${p1(W)}"/>`;
  });
  let z = e.options.showLegend ? y.map((F) => je(F.label, !1, o, i, 4e3)) : [], _ = 0;
  for (let F of z) _ = Math.max(_, F.width);
  let T = z.length * Jc, E = l ? -(_l + 8 + _) / 2 : O + u1, M = l ? q + u1 / 2 : -T / 2;
  z.length > 0 && l ? (D = Math.min(D, E), O = Math.max(O, -E), q = M + T) : z.length > 0 && (O = E + _l + 8 + _, U = Math.min(U, -T / 2), q = Math.max(q, T / 2));
  let A = "";
  z.forEach((F, Y) => {
    let W = M + Y * Jc + Jc / 2, K = vt(Y);
    A += `<g class="pele-legend-item" data-id="${Ye(y[Y].name)}"><rect x="${f(E)}" y="${f(W - _l / 2)}" width="${_l}" height="${_l}" rx="2" fill="${K}" fill-opacity="0.4" stroke="${K}"/>` + Pe(F, E + _l + 8 + F.width / 2, W, "") + "</g>";
  });
  let m = je(e.title, !1, o, n, Qt(r), 1), I = m.height > 0 ? m.height + 8 : 0, k = Math.max(O - D, m.width), w = Math.ceil(k + 2 * h), B = Math.ceil(q - U + I + 2 * h), N = `translate(${f(h + (k - (O - D)) / 2 - D)},${f(h + I - U)})`, j = Pe(m, w / 2, h + m.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="${N}">` + (C ? `<g class="pele-graticule" fill="none" stroke="var(--_a)">${C}</g>` : "") + (ee ? `<path class="pele-axes" d="${ee}" fill="none" stroke="var(--_b)"/>` : "") + (G ? `<g class="pele-curves" fill-opacity="0.2" stroke-width="1.5" stroke-linejoin="round">${G}</g>` : "") + (ie ? `<g class="pele-axis-labels" font-size="${i}">${ie}</g>` : "") + (A ? `<g class="pele-legend" font-size="${i}">${A}</g>` : "") + "</g>";
  return { svg: xt("radar", w, B, n, r, e, j), width: w, height: B, links: [] };
}
var CE = { type: "radar", parse: (e, t, r) => wE(vE(e), r), render: EE };
function zm(e) {
  return e === 32 || e >= 9 && e <= 13 || e > 127 && /\s/.test(String.fromCharCode(e));
}
function SE() {
  let e = 1 / 0;
  return (t, r) => {
    if (!t.startsWith("accDescr", r)) return -1;
    let a = t.length, s = r + 8;
    for (; s < a && (t.charCodeAt(s) === 32 || t.charCodeAt(s) === 9); ) s++;
    if (t.charCodeAt(s) === 58) {
      for (s++; s < a; s++) {
        let n = t.charCodeAt(s);
        if (n === 10 || n === 13 || n === 37 && t.charCodeAt(s + 1) === 37) break;
      }
      return s;
    }
    for (; s < a && zm(t.charCodeAt(s)); ) s++;
    if (t.charCodeAt(s) !== 123 || s >= e) return -1;
    let l = t.indexOf("}", s + 1);
    return l === -1 && (e = s), l + 1 || -1;
  };
}
var Pm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function uh(e) {
  return { name: "TITLE", pattern: new RegExp(String.raw`title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|(?!${e}))`, "y"), first: "t" };
}
var ph = { name: "ACC_TITLE", pattern: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/y, first: "a" }, gh = { name: "ACC_DESCR", pattern: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/y, first: "a", scanner: SE };
function mt(e, t) {
  return { name: e, pattern: e, longer: t };
}
function mh(e, t) {
  return { ...Pr(e), longer: [t] };
}
function ru(e) {
  return { name: e, pattern: /[A-Z_a-z][\w-]*/y, first: Pm + "_" };
}
function au(e) {
  return { name: e, pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/y, first: `"'` };
}
function yh(e) {
  return [{ name: e + "_WHITESPACE", pattern: /[\t \r\n]+/y, hidden: !0, first: `	 \r
` }, { ...fr, name: e + "_YAML", first: "-" }, { ...la, name: e + "_DIRECTIVE", first: "	 %" }, { ...ia, name: e + "_SINGLE_LINE_COMMENT", first: "	 %" }];
}
function ui(e) {
  if (!e.includes("\\")) return e.slice(1, -1);
  let t = e.length - 1, r = "";
  for (let a = 1; a < t; a++) {
    let s = e[a];
    s === "\\" && a + 1 < t ? (s = e[++a], r += s === "n" ? `
` : s === "r" ? "\r" : s === "t" ? "	" : s) : r += s;
  }
  return r;
}
function xh(e, t, r, a, s, l) {
  let n = new Sr(Ar(e, t, "railroad"), t, "railroad"), i = { $type: r, rules: [] };
  for (n.expect(0); ; ) {
    let o = n.kind;
    if (o === a) {
      let h = Er(n.take()), c = h[0];
      i.title = (c === '"' || c === "'") && h.endsWith(c) ? s(h) : h;
    } else if (o === a + 1) i.accTitle = Tr(n.take());
    else if (o === a + 2) i.accDescr = Cr(n.take());
    else break;
  }
  for (; n.kind !== -1; ) i.rules.push(l(n));
  return i;
}
var Wm = [];
function Ef(e) {
  let t = e, r = t.element ?? t.primary ?? t.suffix, a = t.alternatives ?? t.elements ?? (r ? [r] : Wm);
  if (t.base) {
    a = [t.base];
    for (let s of t.postfixes) s.except && a.push(s.except);
  }
  return a;
}
var As = (e) => ({ type: "terminal", value: e }), wh = (e) => ({ type: "nonterminal", name: e }), Uo = (e) => ({ type: "special", text: e }), li = (e) => ({ type: "optional", element: e }), Es = (e, t, r = 1 / 0) => ({ type: "repetition", element: e, min: t, max: r });
function $h(e) {
  return e.length === 1 ? e[0] : { type: "sequence", elements: e };
}
function bh(e) {
  return e.length === 1 ? e[0] : { type: "choice", alternatives: e };
}
function Mh(e, t) {
  return e.rules.map((r) => ({ name: r.name, definition: Bm(r.definition, Ef, t) }));
}
function Bm(e, t, r) {
  let a = [e], s = [t(e)], l = [[]];
  for (; ; ) {
    let n = a.length - 1, i = l[n];
    if (i.length < s[n].length) {
      let o = s[n][i.length];
      a.push(o), s.push(t(o)), l.push([]);
    } else {
      let o = r(a[n], i);
      if (n === 0) return o;
      a.pop(), s.pop(), l.pop(), l[n - 1].push(o);
    }
  }
}
var g1 = "0123456789", m1 = { name: "ABNF_RULENAME", pattern: /[A-Za-z][A-Za-z0-9-]*/y, first: Pm }, y1 = { name: "ABNF_COMMENT", pattern: /;[^\n\r]*/y, hidden: !0, first: ";" }, Gm = [mh("railroad-abnf-beta", m1), mt("="), mt(";", [y1]), mt("/"), mt("("), mt(")"), mt("["), mt("]"), uh(String.raw`[A-Za-z0-9-]`), ph, gh, m1, { name: "ABNF_STRING", pattern: /"[^"]*"/y, first: '"' }, { name: "ABNF_NUMVAL", pattern: /%[xXdDbB][0-9A-Fa-f]+(?:-[0-9A-Fa-f]+|\.[0-9A-Fa-f]+)*/y, first: "%" }, { name: "ABNF_REPEAT", pattern: /[0-9]*\*[0-9]*/y, first: g1 + "*" }, { name: "ABNF_EXACT_REPEAT", pattern: /[0-9]+/y, first: g1 }, ...yh("ABNF"), y1];
function x1(e, t, r, a) {
  let s = { $type: "AbnfConcatenation", elements: [] };
  return t.alternatives.push(s), { alternation: t, concatenation: s, node: e, close: r, repeat: a };
}
function _E(e) {
  let t = [], r = x1(void 0, { $type: "AbnfAlternation", alternatives: [] }, -2, void 0);
  for (; ; ) {
    let a = e.kind === 14 || e.kind === 15 ? e.take() : void 0, s, l = e.kind;
    switch (l) {
      case 12:
        s = { $type: "AbnfStringLiteral", value: e.take().slice(1, -1) };
        break;
      case 13:
        s = { $type: "AbnfNumVal", value: e.take() };
        break;
      case 11:
        s = { $type: "AbnfRuleName", name: e.take() };
        break;
      case 4:
      case 6: {
        e.i++;
        let n = { $type: "AbnfAlternation", alternatives: [] };
        t.push(r), r = x1({ $type: l === 4 ? "AbnfGroup" : "AbnfOptionalGroup", element: n }, n, l + 1, a);
        continue;
      }
      default:
        e.fail("a string, a number, a name, or an opening bracket");
    }
    for (; ; ) {
      r.concatenation.elements.push(a === void 0 ? { $type: "AbnfElement", primary: s } : { $type: "AbnfElement", repeat: a, primary: s });
      let n = e.kind;
      if (n === r.close) {
        e.i++, s = r.node, a = r.repeat, r = t.pop();
        continue;
      }
      if (n === 3) e.i++, r.concatenation = { $type: "AbnfConcatenation", elements: [] }, r.alternation.alternatives.push(r.concatenation);
      else if (n !== 12 && n !== 13 && n !== 11 && n !== 4 && n !== 6 && n !== 14 && n !== 15) {
        if (t.length === 0) return r.alternation;
        e.fail(`token of type '${Gm[r.close].name}'`);
      }
      break;
    }
  }
}
function IE(e) {
  return xh(e, Gm, "RailroadAbnf", 8, (t) => t.slice(1, -1), (t) => {
    let r = t.expect(11);
    t.expect(1);
    let a = _E(t);
    return t.expect(2), { $type: "AbnfRule", name: r, definition: a };
  });
}
function NE(e, t) {
  switch (e.$type) {
    case "AbnfAlternation":
      return bh(t);
    case "AbnfConcatenation":
      return $h(t);
    case "AbnfElement": {
      let r = e.repeat;
      if (!r) return t[0];
      let a = r.indexOf("*"), s = a === -1, l = a > 0 || s ? parseInt(r, 10) : 0, n = s ? l : a < r.length - 1 ? parseInt(r.slice(a + 1), 10) : 1 / 0;
      return l === 0 && n === 1 ? li(t[0]) : Es(t[0], l, n);
    }
    case "AbnfStringLiteral":
    case "AbnfNumVal":
      return As(e.value);
    case "AbnfRuleName":
      return wh(e.name);
    case "AbnfGroup":
      return t[0];
    case "AbnfOptionalGroup":
      return li(t[0]);
  }
}
var RE = (e) => Mh(e, NE);
function DE(e, t) {
  if (e.charCodeAt(t) !== 63) return -1;
  let r = !1;
  for (let a = t + 1; a < e.length; a++) {
    let s = e.charCodeAt(a);
    if (s === 63) return r ? a + 1 : -1;
    if (s === 59) return -1;
    r ||= !zm(s);
  }
  return -1;
}
var w1 = ru("EBNF_ID"), $1 = { name: "EBNF_SPECIAL_SEQUENCE", pattern: /\?(?=[^?;]*[^?\s;][^?;]*\?)[^?;]*\?/y, first: "?", scanner: () => DE }, b1 = yh("EBNF"), M1 = { name: "EBNF_ISO_COMMENT", pattern: /\(\*[\s\S]*?\*\)/y, hidden: !0, first: "(", opener: /\(\*/y }, Hm = [mh("railroad-ebnf-beta", w1), mt("::="), mt("="), mt(";"), mt("|"), mt(","), mt("(", [M1]), mt(")"), mt("["), mt("]"), mt("{"), mt("}"), mt("?", [$1]), mt("*"), mt("+"), mt("-", [b1[1]]), uh(String.raw`[\w-]`), ph, gh, w1, au("EBNF_STRING"), $1, ...b1, { name: "EBNF_BLOCK_COMMENT", pattern: /\/\*[\s\S]*?\*\//y, hidden: !0, first: "/", opener: /\/\*/y }, M1];
function v1(e, t, r, a) {
  let s = { $type: "EbnfSequence", elements: [] };
  return t.alternatives.push(s), { choice: t, sequence: s, term: void 0, node: e, close: r, except: a };
}
var LE = ["EbnfGroup", "EbnfOptional", "EbnfRepetition"];
function OE(e) {
  let t = [], r = v1(void 0, { $type: "EbnfChoice", alternatives: [] }, -2, !1), a = !1;
  for (; ; ) {
    let s, l = e.kind;
    switch (l) {
      case 20:
        s = { $type: "EbnfTerminal", value: ui(e.take()) };
        break;
      case 19:
        s = { $type: "EbnfNonTerminal", name: e.take() };
        break;
      case 21:
        s = { $type: "EbnfSpecial", text: e.take().slice(1, -1).trim() };
        break;
      case 6:
      case 8:
      case 10: {
        e.i++;
        let n = { $type: "EbnfChoice", alternatives: [] };
        t.push(r), r = v1({ $type: LE[l - 6 >> 1], element: n }, n, l + 1, a), a = !1;
        continue;
      }
      default:
        e.fail("a terminal, a name, or an opening bracket");
    }
    for (; ; ) {
      a ? (r.term.postfixes.push({ $type: "EbnfExceptionPostfix", except: s }), a = !1) : (r.term = { $type: "EbnfTerm", base: s, postfixes: [] }, r.sequence.elements.push(r.term));
      let n = r.term.postfixes;
      for (; ; ) {
        let o = e.kind;
        if (o === 12) n.push({ $type: "EbnfOptionalPostfix", operator: e.take() });
        else if (o === 13) n.push({ $type: "EbnfZeroOrMorePostfix", operator: e.take() });
        else if (o === 14) n.push({ $type: "EbnfOneOrMorePostfix", operator: e.take() });
        else break;
      }
      let i = e.kind;
      if (i === r.close) {
        e.i++, s = r.node, a = r.except, r = t.pop();
        continue;
      }
      if (i === 15) e.i++, a = !0;
      else if (i === 5) e.i++;
      else if (i === 4) e.i++, r.sequence = { $type: "EbnfSequence", elements: [] }, r.choice.alternatives.push(r.sequence);
      else if (i !== 20 && i !== 19 && i !== 21 && i !== 6 && i !== 8 && i !== 10) {
        if (t.length === 0) return r.choice;
        e.fail(`token of type '${Hm[r.close].name}'`);
      }
      break;
    }
  }
}
function FE(e) {
  return xh(e, Hm, "RailroadEbnf", 16, ui, (t) => {
    let r = t.expect(19);
    t.accept(2) || t.expect(1);
    let a = { $type: "EbnfRule", name: r, definition: OE(t) };
    return t.expect(3), a;
  });
}
function zE(e, t) {
  switch (e.$type) {
    case "EbnfChoice":
      return bh(t);
    case "EbnfSequence":
      return $h(t);
    case "EbnfTerm": {
      let r = t[0], a = 1;
      for (let s of e.postfixes) s.$type === "EbnfOptionalPostfix" ? r = li(r) : s.$type === "EbnfExceptionPostfix" ? r = { type: "sequence", elements: [r, As("-"), t[a++]] } : r = Es(r, s.$type === "EbnfOneOrMorePostfix" ? 1 : 0);
      return r;
    }
    case "EbnfTerminal":
      return As(e.value);
    case "EbnfNonTerminal":
      return wh(e.name);
    case "EbnfSpecial":
      return Uo(e.text);
    case "EbnfGroup":
      return t[0];
    case "EbnfOptional":
      return li(t[0]);
    case "EbnfRepetition":
      return Es(t[0], 0);
  }
}
var PE = (e) => Mh(e, zE), Tf = ru("RR_ID"), $a = (e) => mt(e, [Tf]), WE = [mh("railroad-beta", Tf), $a("nonterminal"), $a("zeroOrMore"), $a("oneOrMore"), $a("sequence"), $a("optional"), $a("terminal"), $a("special"), $a("choice"), mt("="), mt(";"), mt("("), mt(","), mt(")"), uh(String.raw`[\w-]`), ph, gh, Tf, au("RR_STRING"), ...yh("RR"), { name: "RR_BLOCK_COMMENT", pattern: /\/\*[\s\S]*?\*\//y, hidden: !0, first: "/", opener: /\/\*/y }];
function ed(e) {
  e.i++, e.expect(11);
  let t = ui(e.expect(18));
  return e.expect(13), t;
}
function td(e) {
  return { $type: e, element: void 0 };
}
function BE(e) {
  let t = [];
  for (; ; ) {
    let r;
    switch (e.kind) {
      case 6:
        r = { $type: "RailroadTerminalExpr", value: ed(e) };
        break;
      case 1:
        r = { $type: "RailroadNonTerminalExpr", name: ed(e) };
        break;
      case 7:
        r = { $type: "RailroadSpecialExpr", text: ed(e) };
        break;
      case 4:
        r = { $type: "RailroadSequenceExpr", elements: [] };
        break;
      case 8:
        r = { $type: "RailroadChoiceExpr", alternatives: [] };
        break;
      case 5:
        r = td("RailroadOptionalExpr");
        break;
      case 3:
        r = td("RailroadOneOrMoreExpr");
        break;
      case 2:
        r = td("RailroadZeroOrMoreExpr");
        break;
      default:
        e.fail("an expression");
    }
    if ("elements" in r || "alternatives" in r || "element" in r) {
      e.i++, e.expect(11), t.push(r);
      continue;
    }
    for (; ; ) {
      let a = t[t.length - 1];
      if (a === void 0) return r;
      if ("element" in a) a.element = r;
      else if (("elements" in a ? a.elements : a.alternatives).push(r), e.accept(12)) break;
      e.expect(13), t.pop(), r = a;
    }
  }
}
function GE(e) {
  return xh(e, WE, "Railroad", 14, ui, (t) => {
    let r = t.expect(17);
    t.expect(9);
    let a = BE(t);
    return t.expect(10), { $type: "RailroadRule", name: r, definition: a };
  });
}
function HE(e, t) {
  switch (e.$type) {
    case "RailroadTerminalExpr":
      return As(e.value);
    case "RailroadNonTerminalExpr":
      return wh(e.name);
    case "RailroadSpecialExpr":
      return Uo(e.text);
    case "RailroadSequenceExpr":
      return $h(t);
    case "RailroadChoiceExpr":
      return bh(t);
    case "RailroadOptionalExpr":
      return li(t[0]);
    default:
      return Es(t[0], e.$type === "RailroadOneOrMoreExpr" ? 1 : 0);
  }
}
var UE = (e) => Mh(e, HE), k1 = ru("PEG_ID"), YE = [mh("railroad-peg-beta", k1), mt("<-"), mt(";"), mt("/"), mt("&"), mt("!"), mt("?"), mt("*"), mt("+"), mt("("), mt(")"), mt("."), uh(String.raw`[\w-]`), ph, gh, k1, au("PEG_STRING"), ...yh("PEG"), { name: "PEG_LINE_COMMENT", pattern: /#[^\n\r]*/y, hidden: !0, first: "#" }];
function A1(e, t, r) {
  let a = { $type: "PegSequence", elements: [] };
  return t.alternatives.push(a), { choice: t, sequence: a, node: e, operator: r };
}
function jE(e) {
  let t = [], r = A1(void 0, { $type: "PegOrderedChoice", alternatives: [] }, void 0);
  for (; ; ) {
    let a = e.kind === 4 || e.kind === 5 ? e.take() : void 0, s;
    switch (e.kind) {
      case 16:
        s = { $type: "PegLiteral", value: ui(e.take()) };
        break;
      case 15:
        s = { $type: "PegIdentifier", name: e.take() };
        break;
      case 11:
        s = { $type: "PegAny", dot: e.take() };
        break;
      case 9: {
        e.i++;
        let l = { $type: "PegOrderedChoice", alternatives: [] };
        t.push(r), r = A1({ $type: "PegGroup", element: l }, l, a);
        continue;
      }
      default:
        e.fail("a literal, a name, a dot, or an opening parenthesis");
    }
    for (; ; ) {
      let l = { $type: "PegSuffix", primary: s };
      (e.kind === 6 || e.kind === 7 || e.kind === 8) && (l.operator = e.take()), r.sequence.elements.push(a === void 0 ? { $type: "PegPrefix", suffix: l } : { $type: "PegPrefix", operator: a, suffix: l });
      let n = e.kind;
      if (n === 10 && t.length > 0) {
        e.i++, s = r.node, a = r.operator, r = t.pop();
        continue;
      }
      if (n === 3) e.i++, r.sequence = { $type: "PegSequence", elements: [] }, r.choice.alternatives.push(r.sequence);
      else if (n !== 4 && n !== 5 && n !== 16 && n !== 15 && n !== 11 && n !== 9) {
        if (t.length === 0) return r.choice;
        e.fail("token of type ')'");
      }
      break;
    }
  }
}
function qE(e) {
  return xh(e, YE, "RailroadPeg", 12, ui, (t) => {
    let r = t.expect(15);
    t.expect(1);
    let a = { $type: "PegRule", name: r, definition: jE(t) };
    return t.expect(2), a;
  });
}
function VE(e) {
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
}
function KE(e, t) {
  let r = t[0];
  switch (e.$type) {
    case "PegOrderedChoice":
      return bh(t);
    case "PegSequence":
      return $h(t);
    case "PegPrefix":
      return e.operator ? Uo(e.operator + VE(r)) : r;
    case "PegSuffix":
      return e.operator ? e.operator === "?" ? li(r) : Es(r, e.operator === "+" ? 1 : 0) : r;
    case "PegLiteral":
      return As(e.value);
    case "PegIdentifier":
      return wh(e.name);
    case "PegAny":
      return Uo(e.dot);
    case "PegGroup":
      return r;
  }
}
var XE = (e) => Mh(e, KE), ZE = class {
  type = "railroad";
  notation = "railroad";
  title;
  accTitle;
  accDescr;
  rules = [];
  byName = /* @__PURE__ */ new Map();
  setTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  addRule(e) {
    this.rules.push(e), this.byName.set(e.name, e);
  }
  getRule(e) {
    return this.byName.get(e);
  }
}, QE = /^\s*railroad-(ebnf-|abnf-|peg-)?beta/i;
function JE(e) {
  let t = QE.exec(e);
  if (t === null) return;
  let r = t[1]?.toLowerCase();
  return r === "ebnf-" ? "ebnf" : r === "abnf-" ? "abnf" : r === "peg-" ? "peg" : "railroad";
}
function eT(e, t) {
  switch (t) {
    case "ebnf": {
      let r = FE(e);
      return [r, PE(r)];
    }
    case "abnf": {
      let r = IE(e);
      return [r, RE(r)];
    }
    case "peg": {
      let r = qE(e);
      return [r, XE(r)];
    }
    default: {
      let r = GE(e);
      return [r, UE(r)];
    }
  }
}
function tT(e, t, r) {
  let [a, s] = eT(t, r);
  e.notation = r, a.accDescr && e.setAccDescription(a.accDescr), a.accTitle && e.setAccTitle(a.accTitle), a.title && e.setTitle(a.title);
  for (let l of s) e.addRule(l);
}
function rT(e, t) {
  let r = JE(e);
  if (r === void 0) throw new at("No railroad diagram keyword found.", "syntax", { type: "railroad" });
  let a = new ZE();
  return t && (a.title = t), tT(a, e, r), a;
}
var rd = 12, aT = 6, lT = 18, Yo = 12, Dr = 7;
function Ua(e, t, r, a) {
  let s = e.railroad?.[t];
  return typeof s == "number" && s >= 0 ? Math.min(s, a) : r;
}
var iT = /[\n\r\t]/g;
function wo(e) {
  return (e.includes("¶ß") ? Tt(e.replace(/&/g, "&amp;")) : e).replace(iT, (t) => t === `
` ? "\\n" : t === "\r" ? "\\r" : "\\t");
}
function En(e, t) {
  for (let r = t, a = e.length - 1; r < a; r++, a--) {
    let s = e[r];
    e[r] = e[a], e[a] = s;
  }
}
function lu(e) {
  return Math.ceil(e / 2) * 2;
}
function ad(e, t, r, a, s) {
  let l = s.height / 2, n = Math.max(lu(s.measurer.width(t, s.size, a) + 2 * s.padding), s.height);
  return { kind: e, width: n, up: l, down: l, kids: Wm, text: t, id: r, reach: 0 };
}
function sT(e, t) {
  if (t === 1 / 0 && e <= 1) return "";
  let r = (a) => Number.isFinite(a) ? String(a) : "∞";
  return e === t ? r(e) + "×" : t === 1 / 0 ? "≥" + r(e) + "×" : e === 0 ? "≤" + r(t) + "×" : r(e) + "–" + r(t) + "×";
}
function Um(e, t, r, a) {
  return Math.max(e + t.down + a.sep + r.up, 2 * a.arc);
}
function E1(e, t) {
  let r = Math.max(e.up + t.sep, 2 * t.arc);
  return { kind: 5, width: e.width + 4 * t.arc, up: r, down: e.down, kids: [e], text: "", id: "", reach: r };
}
function nT(e, t, r = 1 / 0) {
  let a = /* @__PURE__ */ new Map(), s = [[e, r]];
  for (let l = 0; r !== 1 / 0 && l < s.length; l++) {
    let [n, i] = s[l];
    a.set(n, i);
    let o = n.type === "choice" || n.type === "optional" ? 4 * t.arc : n.type === "repetition" ? (n.min === 0 ? 6 : 2) * t.arc : n.type === "sequence" ? 6 * t.arc : 0;
    for (let h of Ef(n)) s.push([h, Math.max(40, i - o)]);
  }
  return Bm(e, Ef, (l, n) => {
    let i = a.get(l) ?? 1 / 0;
    switch (l.type) {
      case "terminal": {
        let o = wo(l.value);
        return ad(0, /^ +$/.test(o) ? "␣".repeat(o.length) : o, "", 4, t);
      }
      case "nonterminal":
        return ad(1, wo(l.name), l.name, 0, t);
      case "special":
        return ad(2, "? " + wo(l.text) + " ?", "", 2, t);
      case "sequence": {
        let o = Math.max(0, n.length - 1) * t.gap, h = 0, c = 0;
        for (let v of n) o += v.width, h = Math.max(h, v.up), c = Math.max(c, v.down);
        let u = { kind: 3, width: o, up: h, down: c, kids: n, text: "", id: "", reach: 0 };
        if (o <= i || n.length < 2) return u;
        let d = [], p = [], g = 0, y = () => {
          let v = 0, $ = 0;
          for (let S of p) v = Math.max(v, S.up), $ = Math.max($, S.down);
          d.push({ kind: 3, width: g, up: v, down: $, kids: p, text: "", id: "", reach: 0 }), p = [], g = 0;
        };
        for (let v of n) p.length && g + t.gap + v.width > Math.max(40, i - 6 * t.arc) && y(), g += (p.length ? t.gap : 0) + v.width, p.push(v);
        if (y(), d.length < 2) return u;
        let b = 0, x = 0;
        for (let v = 0; v < d.length; v++) b = Math.max(b, d[v].width), v && (x += d[v - 1].down + Math.max(t.sep, 2 * t.arc) + d[v].up);
        return { kind: 7, width: b + 6 * t.arc, up: d[0].up, down: x + d[d.length - 1].down, kids: d, text: "", id: "", reach: 0 };
      }
      case "choice": {
        let o = 0, h = 0;
        for (let u = 0; u < n.length; u++) o = Math.max(o, n[u].width), u > 0 && (h = Um(h, n[u - 1], n[u], t));
        let c = n[n.length - 1];
        return { kind: 4, width: o + 4 * t.arc, up: n.length > 0 ? n[0].up : 0, down: c ? h + c.down : 0, kids: n, text: "", id: "", reach: 0 };
      }
      case "optional":
        return E1(n[0], t);
      case "repetition": {
        let { min: o, max: h } = l, c = n[0];
        if (o === 1 && h === 1) return c;
        let u = sT(o, h), d = Math.max(c.down + t.sep, 2 * t.arc), p = u === "" ? 0 : lu(t.measurer.width(u, Yo, 0)), g = { kind: 6, width: Math.max(c.width, p) + 2 * t.arc, up: c.up, down: d + (u === "" ? Dr / 2 + 1 : Yo + 6), kids: [c], text: u, id: "", reach: d };
        return o === 0 ? E1(g, t) : g;
      }
    }
  });
}
function oT(e, t, r) {
  return Da(r, (a) => hT(e, t, r, a));
}
function hT(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Ua(t, "fontSize", 0, 200), n = l || Math.round(s * 0.875), i = l || s, o = Ua(t, "padding", -1, 200), h = Math.round(n * 1.5), c = { measurer: r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), size: n, padding: o < 0 ? 12 : o, height: lu(h + (o < 0 ? 9 : 2 * o)), gap: Math.min(Ua(t, "horizontalSeparation", 16, 500), a ? 12 : 1 / 0), sep: Ua(t, "verticalSeparation", 10, 500), arc: Math.min(Ua(t, "arcRadius", 10, 200), a ? 6 : 1 / 0) }, u = t.railroad?.showMarkers === !1 ? 0 : Ua(t, "markerRadius", 4, 50), d = Ua(t, "strokeWidth", 0, 20), p = d > 0 ? ` stroke-width="${f(d)}"` : "", g = r.padding ?? 8, { arc: y } = c, b = f(y), x = (N, j, F) => `a${b},${b} 0 0 ${N} ${j}${b},${F}${b}`, v = x(1, "", ""), $ = x(0, "", ""), S = x(0, "", "-"), R = x(1, "", "-"), D = x(0, "-", ""), O = x(0, "-", "-"), U = je(e.title, !1, c.measurer, s, a ? Qt(r) : 4e3, 1), q = U.height > 0 ? U.height + 16 : 0, C = Math.round(i * 1.5), ee = n * 0.35, ie = c.height / 2, G = "", z = "", _ = "", T = (N, j, F) => {
    F > N && (G += `M${f(N)},${f(j)}H${f(F)}`);
  }, E = (N, j, F) => {
    let Y = [N], W = [j, F];
    for (; Y.length > 0; ) {
      let K = Y.pop(), H = W.pop(), te = W.pop(), Q = K.kids, L = te + K.width;
      switch (K.kind) {
        case 3: {
          let X = L;
          for (let le = Q.length - 1; le >= 0; le--) X -= Q[le].width, Y.push(Q[le]), W.push(X, H), le > 0 && T(X - c.gap, H, X), X -= c.gap;
          break;
        }
        case 7: {
          let X = te + 2 * y, le = Y.length, J = 0;
          T(te, H, X);
          for (let V = 0; V < Q.length; V++) {
            let Z = Q[V], ae = H + J;
            if (Y.push(Z), W.push(ae, X), V + 1 < Q.length) {
              let oe = Q[V + 1], ue = J + Z.down + Math.max(c.sep, 2 * y) + oe.up, he = H + J + Z.down + Math.max(c.sep, 2 * y) / 2;
              G += `M${f(X + Z.width)},${f(ae)}H${f(L - 2 * y)}V${f(he)}H${f(te + y)}V${f(H + ue)}H${f(X)}`, z += `M${f(X - Dr)},${f(H + ue - Dr / 2)}l${Dr},${Dr / 2}l${-Dr},${Dr / 2}z`, J = ue;
            } else G += `M${f(X + Z.width)},${f(ae)}H${f(L - y)}V${f(H)}H${f(L)}`;
          }
          En(Y, le), En(W, 2 * le);
          break;
        }
        case 4: {
          let X = K.width - 4 * y, le = te + y, J = L - y, V = Y.length, Z = 0;
          for (let ae = 0; ae < Q.length; ae++) {
            let oe = Q[ae];
            ae > 0 && (Z = Um(Z, Q[ae - 1], oe, c));
            let ue = H + Z, he = te + 2 * y + (X - oe.width) / 2, re = ae === Q.length - 1;
            ae === 0 ? (T(te, H, he), T(he + oe.width, H, L)) : G += (re ? `M${f(te)},${f(H)}${v}V${f(ue - y)}` : `M${f(le)},${f(ue - y)}`) + $ + (he > le + y ? `H${f(he)}` : "") + `M${f(he + oe.width)},${f(ue)}` + (he > le + y ? `H${f(J - y)}` : "") + S + (re ? `V${f(H + y)}${R}` : ""), Y.push(oe), W.push(ue, he);
          }
          En(Y, V), En(W, 2 * V);
          break;
        }
        case 5: {
          let X = Q[0], le = te + 2 * y;
          T(te, H, le), T(le + X.width, H, L), G += `M${f(te)},${f(H)}${S}V${f(H - K.reach + y)}${R}H${f(L - 2 * y)}${v}V${f(H - y)}${$}`, Y.push(X), W.push(le, H);
          break;
        }
        case 6: {
          let X = Q[0], le = te + (K.width - X.width) / 2, J = H + K.reach, V = te + K.width / 2;
          T(te, H, le), T(le + X.width, H, L), G += `M${f(te + y)},${f(H)}${D}V${f(J - y)}${$}H${f(L - y)}${S}V${f(H + y)}${O}`, z += `M${f(V - Dr / 2)},${f(J)}l${Dr},${-Dr / 2}v${Dr}z`, K.text !== "" && (_ += `<text class="pele-edge-label pele-count" x="${f(V)}" y="${f(J + Yo + 3)}" font-size="${Yo}" fill="var(--_m)">${it(K.text)}</text>`), Y.push(X), W.push(le, H);
          break;
        }
        default: {
          let X = K.text, le = X.startsWith(" ") || X.endsWith(" ") || X.includes("  ") ? ' xml:space="preserve"' : "", J = `<rect x="${f(te)}" y="${f(H - ie)}" width="${f(K.width)}" height="${f(c.height)}"`, V = `<text x="${f(te + K.width / 2)}" y="${f(H + ee)}"${le}`;
          K.kind === 0 ? _ += `<g class="pele-node pele-terminal">${J} rx="${f(ie)}" fill="var(--_s)" stroke="var(--_b)"${p}/>${V} font-family="${hi}">${it(X)}</text></g>` : K.kind === 1 ? _ += `<g class="pele-node pele-nonterminal" data-id="${Ye(K.id)}">${J} fill="var(--_bg)" stroke="var(--_b)"${p}${wt}/>${V}>${it(X)}</text></g>` : _ += `<g class="pele-node pele-special">${J} fill="var(--_bg)" stroke="var(--_b)" stroke-dasharray="4 3"${p}${wt}/>${V} font-style="italic"><tspan fill="var(--_m)">? </tspan>${it(X.slice(2, -2))}<tspan fill="var(--_m)"> ?</tspan></text></g>`;
        }
      }
    }
  }, M = "", A = U.width, m = g + q, I = g + U.height;
  for (let N of e.rules) {
    let j = nT(N.definition, c, a ? Math.max(80, (r.maxWidth ?? 320) - 2 * g - 4 * u - 2 * rd - 1) : 1 / 0), F = wo(N.name), Y = m + C + aT + j.up, W = g + 2 * u, K = W + rd, H = K + j.width + rd;
    G = "", z = "", _ = "", T(W, Y, K), T(K + j.width, Y, H), E(j, K, Y);
    let te = u > 0 ? `<circle class="pele-marker pele-start" cx="${f(g + u)}" cy="${f(Y)}" r="${f(u)}" fill="var(--_l)"/><circle class="pele-marker pele-end" cx="${f(H + u)}" cy="${f(Y)}" r="${f(u)}" fill="var(--_l)"/>` : "";
    M += `<g class="pele-rule" data-id="${Ye(N.name)}"><text class="pele-rule-name" x="${f(g)}" y="${f(m + C / 2 + i * 0.35)}" font-size="${f(i)}" font-weight="var(--_hw)" text-anchor="start">${it(F)}</text><path class="pele-edge pele-track" d="${G}" fill="none" stroke="var(--_l)"${p}/>` + (z ? `<path class="pele-marker" d="${z}" fill="var(--_l)"/>` : "") + te + _ + "</g>", A = Math.max(A, H + 2 * u - g, c.measurer.width(F, i, 1)), I = Y + j.down, m = I + c.sep + lT;
  }
  let k = Math.ceil(A + 2 * g), w = Math.ceil(I + g), B = Pe(U, k / 2, g + U.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (M ? `<g class="pele-rules" transform="translate(0.5,0.5)" font-size="${f(n)}" text-anchor="middle">${M}</g>` : "");
  return { svg: xt("railroad", k, w, s, r, e, B), width: k, height: w, links: [] };
}
var cT = { type: "railroad", parse: (e, t, r) => rT(e, r), render: oT }, Il = { REQUIREMENT: "Requirement", FUNCTIONAL_REQUIREMENT: "Functional Requirement", INTERFACE_REQUIREMENT: "Interface Requirement", PERFORMANCE_REQUIREMENT: "Performance Requirement", PHYSICAL_REQUIREMENT: "Physical Requirement", DESIGN_CONSTRAINT: "Design Constraint" }, ld = { LOW_RISK: "Low", MED_RISK: "Medium", HIGH_RISK: "High" }, Tn = { VERIFY_ANALYSIS: "Analysis", VERIFY_DEMONSTRATION: "Demonstration", VERIFY_INSPECTION: "Inspection", VERIFY_TEST: "Test" }, ka = { CONTAINS: "contains", COPIES: "copies", DERIVES: "derives", SATISFIES: "satisfies", VERIFIES: "verifies", REFINES: "refines", TRACES: "traces" }, dT = 1e6, fT = class {
  type = "requirement";
  direction = "TB";
  requirements = /* @__PURE__ */ new Map();
  elements = /* @__PURE__ */ new Map();
  relations = [];
  classes = /* @__PURE__ */ new Map();
  title;
  accTitle;
  accDescr;
  newId = "";
  newText = "";
  newRisk = "";
  newVerifyMethod = "";
  newElementType = "";
  newDocRef = "";
  styleCopies = 0;
  copy(e, t) {
    if (this.styleCopies += t.length, this.styleCopies > dT) throw new at("Requirement diagram applies too many style declarations.", "limit", { type: "requirement" });
    for (let r of t) e.push(r);
  }
  setDirection(e) {
    this.direction = e;
  }
  addRequirement(e, t) {
    let r = this.requirements.get(e);
    return r === void 0 && (r = { name: e, type: t, requirementId: this.newId, text: this.newText, risk: this.newRisk, verifyMethod: this.newVerifyMethod, cssStyles: [], classes: ["default"] }, this.requirements.set(e, r)), this.newId = this.newText = this.newRisk = this.newVerifyMethod = "", r;
  }
  setNewReqId(e) {
    this.newId = e;
  }
  setNewReqText(e) {
    this.newText = e;
  }
  setNewReqRisk(e) {
    this.newRisk = e;
  }
  setNewReqVerifyMethod(e) {
    this.newVerifyMethod = e;
  }
  addElement(e) {
    let t = this.elements.get(e);
    return t === void 0 && (t = { name: e, type: this.newElementType, docRef: this.newDocRef, cssStyles: [], classes: ["default"] }, this.elements.set(e, t)), this.newElementType = this.newDocRef = "", t;
  }
  setNewElementType(e) {
    this.newElementType = e;
  }
  setNewElementDocRef(e) {
    this.newDocRef = e;
  }
  addRelationship(e, t, r) {
    this.relations.push({ type: e, src: t, dst: r });
  }
  node(e) {
    return this.requirements.get(e) ?? this.elements.get(e);
  }
  setCssStyle(e, t) {
    for (let r of e) {
      let a = this.node(r);
      if (!t || !a) return;
      for (let s of t) this.copy(a.cssStyles, s.includes(",") ? s.split(",") : [s]);
    }
  }
  setClass(e, t) {
    for (let r of e) {
      let a = this.node(r);
      if (a) for (let s of t) {
        a.classes.push(s);
        let l = this.classes.get(s)?.styles;
        l && this.copy(a.cssStyles, l);
      }
    }
  }
  defineClass(e, t) {
    for (let r of e) {
      let a = this.classes.get(r);
      a === void 0 && (a = { id: r, styles: [], textStyles: [] }, this.classes.set(r, a));
      for (let l of t) l.includes("color") && a.textStyles.push(l.replace("fill", "bgFill")), a.styles.push(l);
      let s = t.flatMap((l) => l.split(","));
      for (let l of this.requirements.values()) l.classes.includes(r) && this.copy(l.cssStyles, s);
      for (let l of this.elements.values()) l.classes.includes(r) && this.copy(l.cssStyles, s);
    }
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
}, T1 = ["$end", "INVALID", "title", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "NEWLINE", "EOF", "RD", "STRUCT_START", "STRUCT_STOP", "STYLE_SEPARATOR", "COLONSEP", "ID", "TEXT", "RISK", "VERIFYMTHD", "REQUIREMENT", "FUNCTIONAL_REQUIREMENT", "INTERFACE_REQUIREMENT", "PERFORMANCE_REQUIREMENT", "PHYSICAL_REQUIREMENT", "DESIGN_CONSTRAINT", "LOW_RISK", "MED_RISK", "HIGH_RISK", "VERIFY_ANALYSIS", "VERIFY_DEMONSTRATION", "VERIFY_INSPECTION", "VERIFY_TEST", "ELEMENT", "CONTAINS", "COPIES", "DERIVES", "SATISFIES", "VERIFIES", "REFINES", "TRACES", "TYPE", "DOCREF", "STYLE", "CLASSDEF", "CLASS", "ALPHA", "COLON", "SEMICOLON", "PERCENT", "MINUS", "BRKT", "END_ARROW_L", "END_ARROW_R", "LINE", "qString", "unqString", "COMMA"], uT = /* @__PURE__ */ new Map([["requirementdiagram", 14], ["id", 19], ["text", 20], ["risk", 21], ["verifymethod", 22], ["requirement", 23], ["functionalrequirement", 24], ["interfacerequirement", 25], ["performancerequirement", 26], ["physicalrequirement", 27], ["designconstraint", 28], ["low", 29], ["medium", 30], ["high", 31], ["analysis", 32], ["demonstration", 33], ["inspection", 34], ["test", 35], ["element", 36], ["contains", 37], ["copies", 38], ["derives", 39], ["satisfies", 40], ["verifies", 41], ["refines", 42], ["traces", 43], ["type", 44], ["docref", 45], ["style", 46], ["classdef", 47], ["class", 48]]), pT = /accTitle\s*:\s*/iy, gT = /accDescr\s*:\s*/iy, mT = /accDescr\s*\{\s*/iy, Cn = /direction\s+(?:(TB)|(BT)|(RL)|LR)/gi, id = /[\n\r\u2028\u2029]/g, yT = 22, Ym = new Uint8Array(128);
for (let e of `:,\r
{<>-=`) Ym[e.charCodeAt(0)] = 1;
function xT(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = [[], [], [], []], h = [[], [], [], []], c = [0, 0, 0, 0], u = !1, d = -1;
  Cn.lastIndex = 0;
  for (let D = Cn.exec(e); D !== null; D = Cn.exec(e)) {
    let O = D[1] !== void 0 ? 0 : D[2] !== void 0 ? 1 : D[3] !== void 0 ? 2 : 3;
    o[O].push(D.index), h[O].push(Cn.lastIndex), u = !0;
  }
  let p = (D, O, U) => {
    r.push(D), a.push(e.slice(O, U)), s.push(O), i = U;
  }, g = (D) => {
    l.push(n), n = D;
  }, y = () => {
    l.length > 0 && (n = l.pop());
  }, b = (D, O) => (D.lastIndex = O, D.test(e) ? D.lastIndex : -1), x = (D) => {
    let O = e.indexOf(`
`, D);
    return O === -1 ? t : O;
  }, v = () => {
    if (d < i) {
      id.lastIndex = i, d = id.test(e) ? id.lastIndex - 1 : t;
      for (let D = 0; D < 4; D++) {
        let O = o[D], U = c[D];
        for (; U < O.length && O[U] <= d; ) U++;
        c[D] = U;
      }
    }
    for (let D = 0; D < 4; D++) {
      let O = c[D] - 1;
      if (O >= 0 && o[D][O] >= i) return p(8 + D, i, x(h[D][O])), !0;
    }
    return !1;
  }, $ = (D) => {
    let O = D | 32;
    if (O === 116 && e.slice(i + 1, i + 5).toLowerCase() === "itle" && Ke(e.charCodeAt(i + 5))) {
      let U = i + 6;
      for (; U < t; ) {
        let q = e.charCodeAt(U);
        if (q === 35 || q === 10 || q === 59) break;
        U++;
      }
      if (U > i + 6) return p(2, i, U), !0;
    }
    if (O === 97 && (e.charCodeAt(i + 1) | 32) === 99 && (e.charCodeAt(i + 2) | 32) === 99) {
      let U;
      if ((U = b(pT, i)) >= 0) return g(3), p(3, i, U), !0;
      if ((U = b(gT, i)) >= 0) return g(4), p(5, i, U), !0;
      if ((U = b(mT, i)) >= 0) return g(5), i = U, !0;
    }
    if (u && !vo(D) && v()) return !0;
    if (D === 10 || D === 13 && e.charCodeAt(i + 1) === 10) {
      let U = i;
      for (; U < t; ) {
        let q = e.charCodeAt(U);
        if (q === 10) U++;
        else if (q === 13 && e.charCodeAt(U + 1) === 10) U += 2;
        else break;
      }
      return p(12, i, U), !0;
    }
    if (Ke(D)) {
      for (i++; i < t && Ke(e.charCodeAt(i)); ) i++;
      return !0;
    }
    if (D === 35 || D === 37) return i = x(i), !0;
    if (nt(D)) {
      let U = i + 1;
      for (; U < t && nt(e.charCodeAt(U)); ) U++;
      if (U - i <= yT) {
        let q = uT.get(e.slice(i, U).toLowerCase());
        if (q !== void 0) return (q === 46 || q === 47 || q === 48) && g(2), p(q, i, U), !0;
      }
      for (; U < t; ) {
        let q = e.charCodeAt(U);
        if (q < 128 && Ym[q] === 1) break;
        U++;
      }
      return r.push(59), a.push(e.slice(i, U).trim()), s.push(i), i = U, !0;
    }
    switch (D) {
      case 123:
        return p(15, i, i + 1), !0;
      case 125:
        return p(16, i, i + 1), !0;
      case 58:
        return e.charCodeAt(i + 1) === 58 && e.charCodeAt(i + 2) === 58 ? p(17, i, i + 3) : p(18, i, i + 1), !0;
      case 60:
        return e.charCodeAt(i + 1) !== 45 ? !1 : (p(55, i, i + 2), !0);
      case 45:
        return e.charCodeAt(i + 1) === 62 ? p(56, i, i + 2) : p(57, i, i + 1), !0;
      case 34:
        return g(1), i++, !0;
      case 44:
        return p(60, i, i + 1), !0;
    }
    return !1;
  }, S = (D) => {
    if (nt(D)) {
      let O = i + 1;
      for (; O < t && nt(e.charCodeAt(O)); ) O++;
      return p(49, i, O), !0;
    }
    switch (D) {
      case 58:
        return p(50, i, i + 1), !0;
      case 59:
        return p(51, i, i + 1), !0;
      case 37:
        return p(52, i, i + 1), !0;
      case 45:
        return p(53, i, i + 1), !0;
      case 35:
        return p(54, i, i + 1), !0;
      case 32:
        return i++, !0;
      case 34:
        return g(1), i++, !0;
      case 10:
        return y(), i++, !0;
      case 44:
        return p(60, i, i + 1), !0;
    }
    return !1;
  };
  for (; i < t; ) {
    let D = e.charCodeAt(i), O = !0;
    switch (n) {
      case 0:
        O = $(D);
        break;
      case 2:
        O = S(D);
        break;
      case 1:
        if (D === 34) y(), i++;
        else {
          let U = e.indexOf('"', i);
          p(58, i, U === -1 ? t : U);
        }
        break;
      case 3:
        y(), p(4, i, x(i));
        break;
      case 4:
        y(), p(6, i, x(i));
        break;
      case 5:
        if (D === 125) y(), i++;
        else {
          let U = e.indexOf("}", i);
          p(7, i, U === -1 ? t : U);
        }
        break;
    }
    if (!O) return r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s };
  }
  let R = n === 0 ? 13 : n === 1 ? 58 : n === 3 ? 4 : n === 4 ? 6 : n === 5 ? 7 : -1;
  return R !== -1 && p(R, t, t), p(0, t, t), { types: r, texts: a, starts: s };
}
var wT = [Il.REQUIREMENT, Il.FUNCTIONAL_REQUIREMENT, Il.INTERFACE_REQUIREMENT, Il.PERFORMANCE_REQUIREMENT, Il.PHYSICAL_REQUIREMENT, Il.DESIGN_CONSTRAINT, ld.LOW_RISK, ld.MED_RISK, ld.HIGH_RISK, Tn.VERIFY_ANALYSIS, Tn.VERIFY_DEMONSTRATION, Tn.VERIFY_INSPECTION, Tn.VERIFY_TEST, "", ka.CONTAINS, ka.COPIES, ka.DERIVES, ka.SATISFIES, ka.VERIFIES, ka.REFINES, ka.TRACES];
function C1(e) {
  return e === 49 || e === 50 || e === 54 || e === 53 || e === 51;
}
function $T(e, t) {
  let { types: r, texts: a, starts: s } = xT(e), l = 0, n = [], i = [], o = (x, v = x, ...$) => {
    let S = r[l];
    if (S === 1) throw bt("requirement", e, s[l], "", !0);
    for (let D = v; D >= x; D--) $.unshift(D);
    let R = $.map((D) => `'${T1[D]}'`).join(", ");
    throw bt("requirement", e, s[l], `Expecting ${R}, got '${T1[S]}'`);
  }, h = (x) => (r[l] !== x && o(x), a[l++]), c = (x, v) => {
    let $ = r[l];
    return ($ < x || $ > v) && o(x, v), l++, wT[$ - 23];
  }, u = () => {
    let x = r[l];
    return x !== 59 && x !== 58 && o(58, 59), a[l++];
  }, d = () => {
    let x = r[l];
    if (x === 3) l++, t.setAccTitle(h(4).trim());
    else if (x === 5) l++, t.setAccDescription(h(6).trim());
    else if (x === 7) t.setAccDescription(a[l++].trim());
    else return !1;
    return !0;
  }, p = () => {
    let x = [];
    for (; ; ) {
      let v = r[l];
      if (v !== 49 && v !== 59 && v !== 58 && o(58, 59, 49), x.push(a[l++]), r[l] !== 60) return x;
      l++;
    }
  }, g = () => {
    let x = [];
    for (; ; ) {
      C1(r[l]) || o(49, 51, 53, 54);
      let v = a[l++];
      for (; C1(r[l]); ) v += a[l++];
      if (x.push(v), r[l] !== 60) return x;
      l++;
    }
  }, y = () => {
    let x;
    return r[l] === 17 ? (l++, x = p(), h(15)) : r[l] === 15 ? l++ : o(15, 15, 17), h(12), x;
  }, b = (x) => {
    for (n.length = 0, i.length = 0; ; ) {
      let v = r[l];
      if (v === 16) {
        l++;
        break;
      }
      if (v === 12) {
        l++;
        continue;
      }
      (x ? v < 19 || v > 22 : v !== 44 && v !== 45) && (x && o(19, 22, 12, 16), o(44, 45, 12, 16)), l++, h(18), i.push(v === 21 ? c(29, 31) : v === 22 ? c(32, 35) : u()), n.push(v), h(12);
    }
    for (let v = n.length - 1; v >= 0; v--) {
      let $ = i[v];
      switch (n[v]) {
        case 19:
          t.setNewReqId($);
          break;
        case 20:
          t.setNewReqText($);
          break;
        case 21:
          t.setNewReqRisk($);
          break;
        case 22:
          t.setNewReqVerifyMethod($);
          break;
        case 44:
          t.setNewElementType($);
          break;
        default:
          t.setNewElementDocRef($);
      }
    }
  };
  for (; d(); ) r[l] === 12 && l++;
  for (r[l] !== 14 && o(14, 14, 3, 5, 7), l++, h(12); ; ) {
    let x = r[l];
    if (x === 13) return;
    if (x === 12) l++;
    else {
      if (d()) continue;
      if (x >= 8 && x <= 11) l++, t.setDirection(x === 8 ? "TB" : x === 9 ? "BT" : x === 10 ? "RL" : "LR");
      else if (x >= 23 && x <= 28) {
        let v = c(23, 28), $ = u(), S = y();
        b(!0), t.addRequirement($, v), S && t.setClass([$], S);
      } else if (x === 36) {
        l++;
        let v = u(), $ = y();
        b(!1), t.addElement(v), $ && t.setClass([v], $);
      } else if (x === 46) {
        l++;
        let v = p();
        t.setCssStyle(v, g());
      } else if (x === 47) {
        l++;
        let v = p();
        t.defineClass(v, g());
      } else if (x === 48) {
        l++;
        let v = p();
        t.setClass(v, p());
      } else if (x === 59 || x === 58) {
        let v = a[l++], $ = r[l];
        if ($ === 17) l++, t.setClass([v], p());
        else if ($ === 55 || $ === 57) {
          l++;
          let S = c(37, 43);
          h($ === 57 ? 56 : 57);
          let R = u();
          $ === 57 ? t.addRelationship(S, v, R) : t.addRelationship(S, R, v);
        } else o(17, 17, 55, 57);
      } else o(12, 13, 3, 5, 7, 8, 9, 10, 11, 23, 24, 25, 26, 27, 28, 36, 47, 48, 46, 59, 58);
    }
  }
}
function bT(e) {
  let t = [];
  for (let s of e.requirements.values()) t.push({ id: s.name, requirement: s, element: void 0, cssStyles: s.cssStyles, cssClasses: s.classes.join(" ") });
  for (let s of e.elements.values()) t.push({ id: s.name, requirement: void 0, element: s, cssStyles: s.cssStyles, cssClasses: s.classes.join(" ") });
  let r = (s) => e.requirements.has(s) || e.elements.has(s) ? s : void 0, a = e.relations.map((s, l) => ({ id: `${s.src}-${s.dst}-${l}`, start: r(s.src), end: r(s.dst), type: s.type, contains: s.type === ka.CONTAINS }));
  return { nodes: t, edges: a, direction: e.direction };
}
var MT = 40, vT = 16, kT = 56, Sn = 14, Pi = 10, sd = 2, S1 = 12, AT = 120, ET = 280, TT = 240, nd = 26, jm = 6, _1 = 9, _n = 4.5, CT = 28, ST = 14;
function In(e, t, r) {
  if (t === 0 || e.lines.length === 0) return e;
  let a = 0, s = [], l = e.lines.map((n) => {
    let i = 0, o = n.map((h) => {
      let c = h.style | t, u = h.icon !== void 0 || h.math ? h.width : r.width(h.text, e.size, c);
      return i += u, { ...h, style: c, width: u };
    });
    return s.push(i), i > a && (a = i), o;
  });
  return { ...e, lines: l, widths: s, width: a };
}
function I1(e, t, r, a) {
  let s = Cs(e), l = "", n = "";
  for (let i = 0; i < e.lines.length; i++) {
    let o = e.lines[i], h = r + Rs(e, i);
    if (Kf(o)) {
      n += Pe(Ds(e, i), t + e.widths[i] / 2, h, a);
      continue;
    }
    let c = h + e.size * 0.35, u = !0;
    for (let d of o) d.icon !== void 0 || d.text === "" || (l += `<tspan${u ? ` x="${f(t)}" y="${f(c)}"` : ""}${Jl(d.style & ~s)}>${it(d.text)}</tspan>`, u = !1);
  }
  return (l === "" ? "" : `<text${sl(a, s)} text-anchor="start" xml:space="preserve">${l}</text>`) + n;
}
function _T(e, t, r, a) {
  let s = jm, l = e - r * s, n = t - a * s;
  return `<circle class="pele-marker" cx="${f(l)}" cy="${f(n)}" r="${s}"/><path class="pele-marker" d="M${f(l - r * s)},${f(n - a * s)}L${f(l + r * s)},${f(n + a * s)}M${f(l + a * s)},${f(n - r * s)}L${f(l - a * s)},${f(n + r * s)}"/>`;
}
function IT(e, t, r, a) {
  let s = e - r * _1, l = t - a * _1;
  return `<path class="pele-marker" d="M${f(s - a * _n)},${f(l + r * _n)}L${f(e)},${f(t)}L${f(s + a * _n)},${f(l - r * _n)}" stroke-linejoin="round"/>`;
}
function NT(e, t, r) {
  let a = /* @__PURE__ */ new Map();
  for (let s of t) {
    let l = s.route;
    if (!(s.src === s.dst || l.length < 6)) for (let n of [0, l.length - 3]) {
      let i = n === 0 ? s.src : s.dst, o = e[i], h = l[n] - o.x, c = l[n + 1] - o.y, u = n === 0 ? 3 : n - 3, d;
      if (Math.abs(Math.abs(c) - o.h / 2) < 0.5) d = c < 0 ? 0 : 2;
      else if (Math.abs(Math.abs(h) - o.w / 2) < 0.5) d = h < 0 ? 3 : 1;
      else continue;
      let p = i * 4 + d, g = { route: l, at: n, toward: l[d % 2 === 0 ? u : u + 1] }, y = a.get(p);
      y ? y.push(g) : a.set(p, [g]);
    }
  }
  for (let [s, l] of a) {
    if (l.length < 2) continue;
    let n = s >> 2, i = s % 2 === 1, o = (i ? r[n].h : r[n].w) - 2 * ST, h = Math.max(0, Math.min(CT, o / (l.length - 1)));
    l.sort((c, u) => c.toward - u.toward);
    for (let c = 0; c < l.length; c++) {
      let u = (c - (l.length - 1) / 2) * h;
      i ? l[c].route[l[c].at + 1] = e[n].y + u : l[c].route[l[c].at] = e[n].x + u;
    }
  }
}
function RT(e, t, r) {
  return ul(e.direction) ? ur(r, (a) => N1(e, t, r, a)) : N1(e, t, r, !1);
}
function N1(e, t, r, a) {
  let s = bT(e), l = r.fontSize ?? 16, n = Math.round(l * 0.875), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = /* @__PURE__ */ new Map(), c = [], u = [];
  for (let G of s.nodes) {
    let z = Dt(G.cssStyles), _ = (z.bold ? 1 : 0) | (z.italic ? 2 : 0), T = z.fontSize ?? l, E = z.fontSize ?? n, M = G.requirement, A = G.element, m = In(je(`«${M ? M.type : "Element"}»`, !1, i, E, 4e3), _, i), I = In(je(G.id, !0, i, T, ET), _ | 1, i), k = M ? [["ID", M.requirementId], ["Text", M.text], ["Risk", M.risk], ["Verification", M.verifyMethod]] : [["Type", A.type], ["Doc Ref", A.docRef]], w = [], B = 0, N = 0, j = 0;
    for (let [K, H] of k) {
      if (!H) continue;
      let te = In(je(K, !1, i, E, 4e3), _, i), Q = In(je(H, !0, i, E, TT), _, i), L = Math.max(te.height, Q.height);
      w.push({ key: te, value: Q, height: L }), B = Math.max(B, te.width), N = Math.max(N, Q.width), j += L + sd;
    }
    w.length > 0 && (j += 2 * Pi - sd);
    let F = 2 * Pi + m.height + I.height, Y = Math.max(AT, Math.max(m.width, I.width) + 2 * Sn, w.length > 0 ? B + S1 + N + 2 * Sn : 0);
    h.has(G.id) || h.set(G.id, c.length);
    let W = Wt(Y, F + j);
    W.seq = c.length, c.push({ node: G, style: z, kind: m, name: I, rows: w, keyWidth: B, headHeight: F, w: Y, h: F + j }), u.push(W);
  }
  let d = a ? "TB" : zr(s.direction), p = d === "LR" || d === "RL", g = [], y = [], b = [];
  for (let G of s.edges) {
    let z = G.start === void 0 ? void 0 : h.get(G.start), _ = G.end === void 0 ? void 0 : h.get(G.end);
    if (z === void 0 || _ === void 0) continue;
    let T = je(`«${G.type}»`, !1, i, n, 4e3);
    z === _ && (p ? u[z].h += 2 * (nd + T.height + 8) : u[z].w += 2 * (nd + T.width + 12)), b.push(G), y.push(T), g.push({ src: z, dst: _, minlen: 1, labelW: T.width + 12, labelH: T.height + 4, route: [], labelX: 0, labelY: 0 });
  }
  let x = cl(u, g, d, { nodeSep: MT, edgeSep: vT, rankSep: kT, portSep: 20 });
  NT(u, g, c);
  let v = ma(e.title, i, l, 4e3), $ = v.height > 0 ? v.height + 12 : 0, S = Math.max(x.width, v.width), R = o + (S - x.width) / 2, D = o + $, O = Math.ceil(S + 2 * o), U = Math.ceil(x.height + $ + 2 * o), q = "";
  for (let G = 0; G < c.length; G++) {
    let z = c[G], { w: _, h: T, style: E } = z, M = Xt(E), A = M || ' fill="var(--_m)"', m = -_ / 2, I = -T / 2, k = `<rect x="${f(m)}" y="${f(I)}" width="${f(_)}" height="${f(T)}" fill="var(--_s)" stroke="var(--_b)"${Et(E.shape)}/>` + Pe(z.kind, 0, I + Pi + z.kind.height / 2, ` class="pele-stereotype" font-size="${z.kind.size}"${A}${E.text}`) + Pe(z.name, 0, I + Pi + z.kind.height + z.name.height / 2, ` class="pele-label" font-size="${z.name.size}" font-weight="var(--_hw)"${M}${E.text}`);
    if (z.rows.length > 0) {
      let w = I + z.headHeight;
      k += `<path class="pele-divider" d="M${f(m)},${f(w)}H${f(-m)}" stroke="var(--_b)"${E.line}/>`;
      let B = w + Pi, N = "";
      for (let j of z.rows) N += I1(j.key, m + Sn, B, ` class="pele-field"${A}${E.text}`) + I1(j.value, m + Sn + z.keyWidth + S1, B, ` class="pele-value"${M}${E.text}`), B += j.height + sd;
      k += `<g class="pele-fields" font-size="${z.rows[0].key.size}">${N}</g>`;
    }
    q += `<g class="pele-node ${z.node.requirement ? "pele-requirement" : "pele-element"}${Ht(z.node.cssClasses.replace(/^default\s?/, ""))}" data-id="${Ye(z.node.id)}" transform="translate(${f(u[G].x + R)},${f(u[G].y + D)})">${k}</g>`;
  }
  let C = "", ee = "", ie = /* @__PURE__ */ new Map();
  for (let G = 0; G < g.length; G++) {
    let z = g[G], _ = b[G], T = y[G], E = _.contains ? 2 * jm : 0, M, A = z.labelX + R, m = z.labelY + D;
    if (z.src === z.dst) {
      let I = c[z.src], k = u[z.src].x + R, w = u[z.src].y + D, B = ie.get(z.src) ?? 0;
      ie.set(z.src, B + 1);
      let N = (p ? I.w : I.h) / 2, j = Math.min(N - 4, 12 + B * 6), F = nd + B * 8, Y = (K, H) => p ? `${f(k + H)},${f(w + I.h / 2 + K)}` : `${f(k + I.w / 2 + K)},${f(w + H)}`, W = F / 0.75;
      M = { d: `M${Y(E, -j)}C${Y(W, -j)} ${Y(W, j)} ${Y(0, j)}`, sx: p ? k - j : k + I.w / 2, sy: p ? w + I.h / 2 : w - j, sdx: p ? 0 : -1, sdy: p ? -1 : 0, ex: p ? k + j : k + I.w / 2, ey: p ? w + I.h / 2 : w + j, edx: p ? 0 : -1, edy: p ? -1 : 0 }, p ? (A = k, m = w + I.h / 2 + F + 4 + z.labelH / 2) : (A = k + I.w / 2 + F + 4 + z.labelW / 2, m = w);
    } else {
      let I = z.route.slice();
      for (let k = 0; k < I.length; k += 3) I[k] += R, I[k + 1] += D;
      M = Na(I, void 0, E, 0);
    }
    C += `<g class="pele-edge pele-relationship-${_.contains ? "contains" : "arrow"}" data-id="${Ye(_.id)}"><path d="${M.d}"${_.contains ? "" : ' stroke-dasharray="5 4"'}/>` + (_.contains ? _T(M.sx, M.sy, M.sdx, M.sdy) : IT(M.ex, M.ey, M.edx, M.edy)) + "</g>", ee += ga(_.id, T, A, m, "");
  }
  return { svg: xt("requirement", O, U, l, r, e, Pe(v, O / 2, o + v.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (C ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${C}</g>` : "") + (ee ? `<g class="pele-edge-labels" font-size="${n}" fill="var(--_m)">${ee}</g>` : "") + `<g class="pele-nodes">${q}</g>`), width: O, height: U, links: [] };
}
var DT = { type: "requirement", math: !0, parse(e, t, r) {
  let a = new fT();
  return r && (a.title = r), $T(e, a), a;
}, render: RT }, LT = class {
  type = "sankey";
  nodes = [];
  links = [];
  title;
  accTitle;
  accDescr;
  lookup = /* @__PURE__ */ new Map();
  findOrCreateNode(e) {
    let t = this.lookup.get(e);
    return t === void 0 && (t = { id: e, index: this.nodes.length }, this.lookup.set(e, t), this.nodes.push(t)), t;
  }
  addLink(e, t, r) {
    this.links.push({ source: e, target: t, value: r });
  }
}, od = ["$end", "STUCK", "SANKEY", "NEWLINE", "COMMA", "DQUOTE", "NON_ESCAPED_TEXT", "ESCAPED_TEXT", "EOF"];
function R1(e) {
  return e >= 32 && e <= 126 && e !== 34 && e !== 44 || e >= 160 && e <= 55295 || e >= 57344 && e <= 65533 || e >= 65536 && e <= 1114111;
}
function OT(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = (c, u, d) => {
    r.push(c), a.push(e.slice(u, d)), s.push(u), i = d;
  }, h = (c) => e.slice(i, i + c.length).toLowerCase() === c && !nt(e.charCodeAt(i + c.length));
  for (; i < t; ) {
    let c = e.charCodeAt(i), u = i, d = i;
    if (n === 2) {
      if (c === 34 && e.charCodeAt(i + 1) !== 34) {
        l.length > 0 && (n = l.pop()), o(5, i, i + 1);
        continue;
      }
      for (; d < t; ) {
        let p = e.codePointAt(d);
        if (R1(p) || p === 44 || p === 13 || p === 10) d += p > 65535 ? 2 : 1;
        else if (p === 34 && e.charCodeAt(d + 1) === 34) d += 2;
        else break;
      }
      o(7, i, d);
    } else {
      if (n === 0 && (c | 32) === 115) {
        let p = h("sankey-beta") ? 11 : h("sankey") ? 6 : 0;
        if (p > 0) {
          l.push(n), n = 1, o(2, i, i + p);
          continue;
        }
      }
      if (c === 10 || c === 13 && e.charCodeAt(i + 1) === 10) {
        o(3, i, c === 10 ? i + 1 : i + 2);
        continue;
      }
      if (c === 44) {
        o(4, i, i + 1);
        continue;
      }
      if (c === 34) {
        l.push(n), n = 2, o(5, i, i + 1);
        continue;
      }
      for (; d < t; ) {
        let p = e.codePointAt(d);
        if (!R1(p)) break;
        d += p > 65535 ? 2 : 1;
      }
      o(6, i, d);
    }
    if (d === u) return o(1, i, i), { types: r, texts: a, starts: s };
  }
  return o(n === 2 ? 7 : 8, t, t), o(0, t, t), { types: r, texts: a, starts: s };
}
var D1 = /[\n\r]+/g, FT = /[\x00-\x08\x0b\x0c\x0e-\x1f\ud800-\udfff\ufffe\uffff]/u;
function hd(e) {
  return e === 10 || e === 13 ? !1 : e < 128 ? e === 32 || e === 9 || e === 11 || e === 12 : e === 160 || e === 5760 || e >= 8192 && e <= 8202 || e === 8232 || e === 8233 || e === 8239 || e === 8287 || e === 12288 || e === 65279;
}
function zT(e, t) {
  let r = e.length;
  for (; r > 0 && hd(e.charCodeAt(r - 1)); ) r--;
  let a = "", s = 0, l = !1;
  for (let n = 0; n < r; ) {
    let i = e.charCodeAt(n);
    if (l) i === 34 && (e.charCodeAt(n + 1) === 34 ? n++ : l = !1), n++;
    else if (i === 34) l = !0, n++;
    else if (hd(i)) {
      let o = n + 1;
      for (; hd(e.charCodeAt(o)); ) o++;
      let h = e.charCodeAt(n - 1), c = e.charCodeAt(o);
      (n === 0 || c === 10 || c === 13 || (h === 10 || h === 13) && c !== 44) && (a += e.slice(s, n), t.push([n, o, 0]), s = o), n = o;
    } else n++;
  }
  return r < e.length && t.push([r, e.length, 0]), a + e.slice(s, r);
}
function qm(e, t) {
  let r = [], a = zT(e, r), s = a.replace(D1, `
`), l = s.trim();
  if (t !== void 0) {
    let n = s.length - s.trimStart().length;
    t.push(r, Jo(a, D1, 1), [[0, n, 0], [n + l.length, s.length, 0]]);
  }
  return l;
}
function PT(e, t, r = e) {
  let { types: a, texts: s, starts: l } = OT(e), n = 0, i = (d, p) => {
    let g = [];
    r !== e && qm(r, g);
    let y = d > 0 && d >= e.length ? bs(g, e.length - 1) + 1 : bs(g, d);
    return bt("sankey", r, y, p);
  }, o = (d) => {
    let p = a[n], g = p === 1 ? od[a[n - 1]] : od[p];
    throw i(l[n], `Expecting ${d}, got '${g}'`);
  }, h = (d, p = "") => {
    a[n] !== d && o(`'${od[d]}'${p}`), n++;
  }, c = () => {
    if (a[n] === 6) return s[n++];
    a[n] !== 5 && o("'DQUOTE', 'NON_ESCAPED_TEXT'"), n++, a[n] !== 7 && o("'ESCAPED_TEXT'");
    let d = s[n++];
    return h(5), d;
  }, u = () => {
    let d = l[n], p = c().trim().replaceAll('""', '"');
    if (FT.test(Tt(p))) throw i(d, "Invalid XML character in node name");
    return p;
  };
  for (h(2), h(3); ; ) {
    let d = u();
    h(4, ", 'NEWLINE', 'EOF'");
    let p = u();
    h(4, ", 'NEWLINE', 'EOF'");
    let g = l[n], y = parseFloat(c());
    if (!Number.isFinite(y)) throw i(g, "Expecting a number");
    let b = t.findOrCreateNode(d), x = t.findOrCreateNode(p);
    if (t.addLink(b, x, y), a[n] !== 3) break;
    n++;
  }
  a[n] === 8 && n++, a[n] !== 0 && o("'NEWLINE', 'EOF'");
}
var WT = 6;
function cd(e, t) {
  if (e.length > 8) {
    e.sort(t);
    return;
  }
  for (let r = 1; r < e.length; r++) {
    let a = e[r], s = r - 1;
    for (; s >= 0 && t(e[s], a) > 0; ) e[s + 1] = e[s], s--;
    e[s + 1] = a;
  }
}
function BT(e, t) {
  let r = e.nodes.length, a = e.links.map((E) => ({ source: E.source.index, target: E.target.index, value: Number.isFinite(E.value) && E.value > 0 ? E.value : 0, thickness: 0, sourceY: 0, targetY: 0 })), s = [], l = [];
  for (let E = 0; E < r; E++) s.push([]), l.push([]);
  a.forEach((E, M) => {
    s[E.source].push(M), l[E.target].push(M);
  });
  let n = new Int32Array(r), i = new Int32Array(r), o = [];
  for (let E = 0; E < r; E++) i[E] = l[E].length, i[E] === 0 && o.push(E);
  for (let E = 0; E < o.length; E++) {
    let M = o[E];
    for (let A of s[M]) {
      let m = a[A].target;
      n[m] < n[M] + 1 && (n[m] = n[M] + 1), --i[m] === 0 && o.push(m);
    }
  }
  if (o.length < r) {
    let E = 0;
    for (; i[E] === 0; ) E++;
    let M = new Uint8Array(r);
    for (; M[E] === 0; ) {
      M[E] = 1;
      for (let A of l[E]) if (i[a[A].source] > 0) {
        E = a[A].source;
        break;
      }
    }
    throw new at(`Sankey diagrams cannot have circular links, and "${e.nodes[E].id}" is part of one.`, "semantic", { type: "sankey" });
  }
  let h = 1;
  for (let E = 0; E < r; E++) n[E] + 1 > h && (h = n[E] + 1);
  let c = new Int32Array(r);
  for (let E = r - 1; E >= 0; E--) {
    let M = o[E];
    for (let A of s[M]) c[M] < c[a[A].target] + 1 && (c[M] = c[a[A].target] + 1);
  }
  let u = 0;
  for (let E of a) E.value > u && (u = E.value);
  let d = u > 0 ? 1 / u : 0, p = [], g = new Float64Array(r), y = [];
  for (let E = 0; E < h; E++) y.push([]);
  let b = h > 1 ? (t.width - t.nodeWidth) / (h - 1) : 0;
  for (let E = 0; E < r; E++) {
    let M;
    if (t.alignment === "left") M = n[E];
    else if (t.alignment === "right") M = h - 1 - c[E];
    else if (t.alignment === "center") {
      if (M = n[E], l[E].length === 0 && s[E].length > 0) {
        M = h;
        for (let w of s[E]) n[a[w].target] - 1 < M && (M = n[a[w].target] - 1);
      }
    } else M = s[E].length > 0 ? n[E] : h - 1;
    let A = 0, m = 0, I = 0, k = 0;
    for (let w of l[E]) A += a[w].value * d, I += a[w].value;
    for (let w of s[E]) m += a[w].value * d, k += a[w].value;
    g[E] = Math.max(A, m), p.push({ layer: M, value: Math.max(I, k), x: M * b, y: 0, height: 0 }), y[M].push(E);
  }
  let x = 1;
  for (let E of y) E.length > x && (x = E.length);
  let v = x > 1 ? Math.min(t.nodePadding, t.height / (x - 1)) : t.nodePadding, $ = 1 / 0;
  for (let E of y) {
    let M = 0;
    for (let A of E) M += g[A];
    M > 0 && ($ = Math.min($, (t.height - (E.length - 1) * v) / M));
  }
  (!Number.isFinite($) || $ < 0) && ($ = 0);
  let S = Math.max(0, t.labelHeight - v), R = (E) => {
    for (let M of y) {
      let A = (M.length - 1) * v;
      for (let m of M) A += Math.max(g[m] * E, S);
      if (A > t.height + 1e-6) return !1;
    }
    return !0;
  };
  if (S > 0 && !R($)) if (R(0)) {
    let E = 0;
    for (let M = 0; M < 40; M++) {
      let A = (E + $) / 2;
      R(A) ? E = A : $ = A;
    }
    $ = E;
  } else S = 0;
  let D = new Float64Array(r);
  for (let E of a) E.thickness = E.value * d * $;
  for (let E of y) {
    let M = 0;
    for (let m of E) p[m].height = g[m] * $, D[m] = Math.max(0, S - p[m].height) / 2, p[m].y = M + D[m], M += p[m].height + 2 * D[m] + v;
    let A = (t.height - M + v) / (E.length + 1);
    E.forEach((m, I) => p[m].y += A * (I + 1));
  }
  let O = (E) => p[E].y + p[E].height / 2, U = new Float64Array(a.length), q = new Float64Array(a.length), C = (E, M) => O(a[E].target) - O(a[M].target) || E - M, ee = (E, M) => O(a[E].source) - O(a[M].source) || E - M, ie = (E, M) => O(E) - O(M) || E - M, G = (E) => {
    let M = 0;
    cd(s[E], C);
    for (let A of s[E]) U[A] = M + a[A].thickness / 2, M += a[A].thickness;
  }, z = (E) => {
    let M = 0;
    cd(l[E], ee);
    for (let A of l[E]) q[A] = M + a[A].thickness / 2, M += a[A].thickness;
  }, _ = () => {
    for (let E = 0; E < r; E++) G(E), z(E);
  }, T = (E, M, A) => {
    for (let I of E) {
      let k = A ? l[I] : s[I];
      if (k.length === 0) continue;
      A ? z(I) : G(I);
      let w = 0, B = 0, N = 0;
      for (let F of k) {
        let Y = A ? p[a[F].source].y + U[F] - q[F] : p[a[F].target].y + q[F] - U[F];
        w += Y * a[F].thickness, B += a[F].thickness, N += O(A ? a[F].source : a[F].target) - p[I].height / 2;
      }
      let j = B > 0 ? w / B : N / k.length;
      p[I].y += (j - p[I].y) * M;
    }
    cd(E, ie);
    let m = 0;
    for (let I of E) p[I].y - D[I] < m && (p[I].y = m + D[I]), m = p[I].y + p[I].height + D[I] + v;
    m = t.height;
    for (let I = E.length - 1; I >= 0; I--) {
      let k = E[I];
      p[k].y + p[k].height + D[k] > m && (p[k].y = m - p[k].height - D[k]), m = p[k].y - D[k] - v;
    }
  };
  _();
  for (let E = 0; E < WT; E++) {
    let M = Math.pow(0.99, E);
    for (let A = h - 2; A >= 0; A--) T(y[A], M, !1);
    _();
    for (let A = 1; A < h; A++) T(y[A], M, !0);
    _();
  }
  for (let E = 0; E < a.length; E++) a[E].sourceY = p[a[E].source].y + U[E], a[E].targetY = p[a[E].target].y + q[E];
  return { nodes: p, links: a };
}
var qr = 6, GT = 15, HT = 1.8, L1 = 300;
function UT(e) {
  let t = 2166136261, r = 5381;
  for (let a = 0; a < e.length; a++) {
    let s = e.charCodeAt(a);
    t = Math.imul(t ^ s, 16777619), r = Math.imul(r, 33) + s | 0;
  }
  return (t >>> 0).toString(36) + (r >>> 0).toString(36);
}
function Vm(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function $o(e, t, r, a, s) {
  let l = e[t];
  return typeof l == "number" && l >= a ? Math.min(l, s) : r;
}
function O1(e, t) {
  let r = e[t];
  return typeof r == "string" || typeof r == "number" && Number.isFinite(r) ? String(r) : "";
}
function F1(e) {
  return Math.abs(e) < 1e15 ? Math.round(e * 100) / 100 : e;
}
function z1(e) {
  return typeof e == "string" ? Dt([`fill:${e}`]).shape : "";
}
function YT(e, t, r) {
  let a = Vm(t.sankey) ? t.sankey : {}, s = $o(a, "width", 600, 1, 1e4);
  return sh(r, s, 160, (l) => jT(e, a, r, l, s));
}
function jT(e, t, r, a, s) {
  let l = r.fontSize ?? 16, n = Math.round(l * 0.625), i = Math.max(n, Math.round(l * 0.875 * Math.min(1, a / s))), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = r.padding ?? 8, c = $o(t, "height", 400, 1, 1e4), u = Math.min($o(t, "nodeWidth", 10, 1, 200), a), d = t.showValues !== !1, p = Tt(O1(t, "prefix")), g = Tt(O1(t, "suffix")), y = t.labelStyle === "outlined", b = t.nodeAlignment === "left" || t.nodeAlignment === "right" || t.nodeAlignment === "center" ? t.nodeAlignment : "justify", x = typeof t.linkColor == "string" ? t.linkColor : "gradient", v = (X) => BT(e, { width: a, height: c, nodeWidth: u, nodePadding: $o(t, "nodePadding", 12, 0, 200) + (d ? GT : 0), labelHeight: X * 1.15, alignment: b }), $ = v(i), S = /* @__PURE__ */ new Map(), R = 1;
  for (let X of $.nodes) {
    let le = (S.get(X.layer) ?? 0) + 1;
    S.set(X.layer, le), le > R && (R = le);
  }
  let D = Math.max(n, Math.round(c / R / HT));
  D < i && (i = D, $ = v(i));
  let { nodes: O, links: U } = $, q = i * 1.5, C = /* @__PURE__ */ new Map();
  if (Vm(t.nodeColors)) for (let [X, le] of Object.entries(t.nodeColors)) {
    let J = z1(le);
    J && C.set(X, J);
  }
  let ee = (X) => C.get(e.nodes[X].id) ?? "", ie = (X) => /^ style="fill:(.*);"$/.exec(ee(X))?.[1] ?? vt(X), G = 0, z = 0;
  O.forEach((X) => {
    X.value > z && (z = X.value, G = X.layer);
  });
  let _ = 0, T = a, E = 0, M = c, A = O.map((X, le) => {
    let J = Tt(e.nodes[le].id), V = d ? `${p}${F1(X.value)}${g}` : "", Z = o.width(V ? `${J} ${V}` : J, i, 0), ae = y ? X.layer >= G : X.x < a / 2, oe = ae ? X.x + u + qr : X.x - qr, ue = X.y + X.height / 2;
    return _ = Math.min(_, ae ? oe : oe - Z), T = Math.max(T, ae ? oe + Z : oe), E = Math.min(E, ue - i * 0.75), M = Math.max(M, ue + i * 0.75), { value: V, width: Z, after: ae, left: ae ? oe : oe - Z, y: ue };
  }), m = /* @__PURE__ */ new Map();
  if (O.length <= L1) for (let X of A) {
    let le = Math.floor(X.y / q);
    for (let J of [le - 2, le - 1, le, le + 1, le + 2]) {
      let V = m.get(J);
      V ? V.push(X) : m.set(J, [X]);
    }
  }
  let I = "", k = "";
  O.forEach((X, le) => {
    let J = e.nodes[le].id, V = Tt(J), Z = Math.max(X.height, 1);
    k += `<rect class="pele-sankey-node" data-id="${Ye(J)}" x="${f(X.x)}" y="${f(X.y)}" width="${f(u)}" height="${f(Z)}" rx="${f(Math.min(2, Z / 2))}" fill="${vt(le)}"${ee(le)}/>`;
    let ae = A[le], oe = (pe, Me) => (m.get(Math.floor(Me / q)) ?? []).some((xe) => xe !== ae && Math.abs(xe.y - Me) < q && pe < xe.left + xe.width + qr && pe + ae.width > xe.left - qr);
    if (O.length <= L1 && oe(ae.left, ae.y)) e: for (let pe of [0, -q, q]) for (let Me of [ae.after, !ae.after]) {
      let xe = Me ? X.x + u + qr : X.x - qr - ae.width, ve = ae.y + pe;
      if (oe(xe, ve) || xe < _ || xe + ae.width > T || ve - i * 0.75 < E || ve + i * 0.75 > M || O.some((Ee, me) => me !== le && xe < Ee.x + u + qr && xe + ae.width > Ee.x - qr && ve - i * 0.75 < Ee.y + Ee.height && ve + i * 0.75 > Ee.y)) continue;
      let Ae = Math.max(0, X.y - ve, ve - X.y - X.height);
      if (!O.some((Ee, me) => me !== le && Ee.x === X.x && Math.max(0, Ee.y - ve, ve - Ee.y - Ee.height) <= Ae)) {
        ae.left = xe, ae.y = ve, ae.after = Me;
        break e;
      }
    }
    let { value: ue, after: he, y: re } = ae, P = he ? X.x + u + qr : X.x - qr, ne = ` x="${f(P)}" y="${f(re + i * 0.35)}" text-anchor="${he ? "start" : "end"}"`, ce = it(V) + (ue ? ` <tspan class="pele-sankey-value" fill="var(--_m)">${it(ue)}</tspan>` : "");
    I += `<g class="pele-label" data-id="${Ye(J)}">` + (y ? `<text${ne} fill="none" stroke="var(--_bg)" stroke-width="3" stroke-linejoin="round">${it(V)}${ue ? " " + it(ue) : ""}</text>` : "") + `<text${ne}>${ce}</text></g>`;
  });
  let w = x === "gradient" || x === "source" || x === "target" ? "" : z1(x), B = r.idPrefix ?? "", N = x === "gradient" && /^[\w-]+$/.test(B), j = /* @__PURE__ */ new Map(), F = "";
  for (let X of U) {
    let le = x === "target" ? X.target : X.source, J = Math.max(X.thickness, 1) / 2, V = O[X.source].x + u, Z = O[X.target].x, ae = `fill="${vt(le)}"${w || ee(le)}`;
    if (N) {
      let re = `x1="${f(V)}" x2="${f(Z)}"><stop offset="0" stop-color="${ie(X.source)}"/><stop offset="1" stop-color="${ie(X.target)}"/>`, P = `${B}-sankey-${UT(re)}`;
      j.set(P, `<linearGradient id="${P}" gradientUnits="userSpaceOnUse" ${re}</linearGradient>`), ae = `fill="url(#${P}) ${ie(X.source)}"`;
    }
    let oe = f((V + Z) / 2), ue = Ye(e.nodes[X.source].id), he = Ye(e.nodes[X.target].id);
    F += `<path class="pele-sankey-link" data-id="${ue}-&gt;${he}" d="M${f(V)},${f(X.sourceY - J)}C${oe},${f(X.sourceY - J)} ${oe},${f(X.targetY - J)} ${f(Z)},${f(X.targetY - J)}L${f(Z)},${f(X.targetY + J)}C${oe},${f(X.targetY + J)} ${oe},${f(X.sourceY + J)} ${f(V)},${f(X.sourceY + J)}Z" ${ae}><title>${ue} → ${he}: ${it(p)}${F1(X.value)}${it(g)}</title></path>`;
  }
  let Y = je(e.title, !1, o, l, Qt(r), 1), W = Y.height > 0 ? Y.height + 12 : 0, K = Math.max(T - _, Y.width), H = h - _ + (K - (T - _)) / 2, te = h + W - E, Q = Math.ceil(K + 2 * h), L = Math.ceil(M - E + W + 2 * h);
  return { svg: xt("sankey", Q, L, l, r, e, Pe(Y, Q / 2, h + Y.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f(H)},${f(te)})">` + (j.size > 0 ? `<defs>${[...j.values()].join("")}</defs>` : "") + `<g class="pele-sankey-links" fill-opacity="0.4">${F}</g><g class="pele-sankey-nodes">${k}</g><g class="pele-labels" font-size="${i}">${I}</g></g>`), width: Q, height: L, links: [] };
}
var qT = { type: "sankey", parse(e, t, r) {
  let a = new LT();
  return r && (a.title = r), PT(qm(e), a, e), a;
}, render: YT }, VT = "aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen transparent currentcolor inherit initial unset revert accentcolor accentcolortext activetext buttonborder buttonface buttontext canvas canvastext field fieldtext graytext highlight highlighttext linktext mark marktext selecteditem selecteditemtext visitedtext activeborder activecaption appworkspace background buttonhighlight buttonshadow captiontext inactiveborder inactivecaption inactivecaptiontext infobackground infotext menu menutext scrollbar threeddarkshadow threedface threedhighlight threedlightshadow threedshadow window windowframe windowtext", P1, KT = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?(%|deg|grad|rad|turn)?$/i;
function Km(e) {
  if (e.toLowerCase() === "none") return 4;
  let t = KT.exec(e);
  return t ? t[1] === void 0 ? 1 : t[1] === "%" ? 2 : 3 : 0;
}
function XT(e, t) {
  let r = Km(e);
  return r === 1 || r === 2 || t && r === 4;
}
function ZT(e) {
  let t = e.startsWith("hsl"), r = e.indexOf("("), a = e.slice(0, r);
  if (a !== "rgb" && a !== "rgba" && a !== "hsl" && a !== "hsla" || e.length > 120 || e.indexOf(")") !== e.length - 1) return !1;
  let s = e.slice(r + 1, -1).trim(), l, n, i = s.includes(",");
  if (i) l = s.split(",").map((h) => h.trim()), l.length === 4 && (n = l.pop());
  else {
    let h = s.split("/");
    if (h.length > 2) return !1;
    l = h[0].trim().split(/\s+/), h.length === 2 && (n = h[1].trim());
  }
  if (l.length !== 3 || n !== void 0 && !XT(n, !i)) return !1;
  let o = l.map(Km);
  if (i) return t ? (o[0] === 1 || o[0] === 3) && o[1] === 2 && o[2] === 2 : (o[0] === 1 || o[0] === 2) && o[1] === o[0] && o[2] === o[0];
  for (let h = 0; h < 3; h++) {
    let c = o[h];
    if (!(c === 1 || c === 4 || (t && h === 0 ? c === 3 : c === 2))) return !1;
  }
  return !0;
}
function QT(e) {
  return e.includes("(") ? ZT(e) : (P1 ??= new Set(VT.split(" ")), P1.has(e.toLowerCase()));
}
var JT = /^:?wrap:/, eC = /^:?nowrap:/, tC = /^:?(?:no)?wrap:/, rC = /^(?:rgba?|hsla?)\s*\(/, W1 = /[\r\u2028\u2029]/, aC = /^\w*/;
function Wi(e) {
  throw new at(e, "semantic", { type: "sequence" });
}
function B1(e) {
  let t = e.trim(), r = JT.test(t) ? !0 : eC.test(t) ? !1 : void 0;
  return { text: (r === void 0 ? t : t.replace(tC, "")).trim(), wrap: r };
}
function lC(e) {
  let t = rC.exec(e);
  if (t) {
    let a = e.lastIndexOf(")");
    if (a >= t[0].length) return W1.test(e.slice(t[0].length)) ? void 0 : [e.slice(0, a + 1), e.slice(a + 1)];
  }
  if (W1.test(e)) return;
  let r = aC.exec(e)[0];
  return [r, e.slice(r.length)];
}
function G1(e) {
  return typeof e == "string" ? [...e].map((t, r) => [String(r), t]) : e !== null && typeof e == "object" ? Object.entries(e) : [];
}
var iC = class {
  type = "sequence";
  actors = /* @__PURE__ */ new Map();
  createdActors = /* @__PURE__ */ new Map();
  destroyedActors = /* @__PURE__ */ new Map();
  boxes = [];
  messages = [];
  notes = [];
  title;
  accTitle;
  accDescr;
  prevActor;
  currentBox;
  lastCreated;
  lastDestroyed;
  wrapEnabled;
  sequenceWrap;
  active = /* @__PURE__ */ new Map();
  constructor(e = {}) {
    this.wrapEnabled = e.wrap, this.sequenceWrap = e.sequenceWrap ?? !1;
  }
  autoWrap() {
    return this.wrapEnabled ?? this.sequenceWrap;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  setDiagramTitle(e) {
    this.title = e;
  }
  parseMessage(e) {
    return B1(e);
  }
  parseBoxData(e) {
    let t = lC(e), r = t?.[0] ? t[0].trim() : "transparent", a = t?.[1] ? t[1].trim() : void 0;
    if (QT(r) || (r = "transparent", a = e.trim()), a === void 0) return { text: void 0, color: r, wrap: void 0 };
    let { text: s, wrap: l } = B1(a);
    return { text: s || void 0, color: r, wrap: l };
  }
  addBox(e) {
    this.currentBox = { name: e.text, wrap: e.wrap ?? this.autoWrap(), fill: e.color, actorKeys: [] }, this.boxes.push(this.currentBox);
  }
  addActor(e, t, r, a, s) {
    let l = this.currentBox, n;
    if (s !== void 0) {
      let c;
      try {
        c = Zl(s.includes(`
`) ? s + `
` : `{
` + s + `
}`);
      } catch (u) {
        throw new at(`Config of participant "${e}" is not valid YAML. ${u.message}`, "syntax", { type: "sequence" });
      }
      c !== null && typeof c == "object" && !Array.isArray(c) && (n = c);
    }
    let i = n && Object.prototype.hasOwnProperty.call(n, "type") ? n.type : void 0, o = n && Object.prototype.hasOwnProperty.call(n, "alias") ? n.alias : void 0;
    i != null && (a = String(i)), o && (!r || r.text === t) && (r = { text: String(o), wrap: r?.wrap, type: a });
    let h = this.actors.get(e);
    if (!(h && (this.currentBox && h.box && this.currentBox !== h.box && Wi(`A same participant should only be defined in one Box: ${h.name} can't be in '${h.box.name}' and in '${this.currentBox.name}' at the same time.`), l = h.box ? h.box : this.currentBox, h.box = l, t === h.name && r == null))) {
      if ((r?.text == null || a == null) && (r = { text: t, type: a }), this.actors.set(e, { box: l, name: t, description: r.text, wrap: r.wrap ?? this.autoWrap(), prevActor: this.prevActor, links: /* @__PURE__ */ new Map(), properties: /* @__PURE__ */ new Map(), type: a ?? "participant" }), this.prevActor) {
        let c = this.actors.get(this.prevActor);
        c && (c.nextActor = e);
      }
      this.currentBox && this.currentBox.actorKeys.push(e), this.prevActor = e;
    }
  }
  addMessage(e, t, r, a) {
    this.messages.push({ id: String(this.messages.length), from: e, to: t, message: r.text, wrap: r.wrap ?? this.autoWrap(), answer: a });
  }
  addSignal(e, t, r, a, s = !1, l) {
    if (a === 18) {
      let n = e ? this.active.get(e) ?? 0 : 0;
      n < 1 && Wi(`Trying to inactivate an inactive participant (${e})`), this.active.set(e, n - 1);
    } else a === 17 && e && this.active.set(e, (this.active.get(e) ?? 0) + 1);
    return this.messages.push({ id: String(this.messages.length), from: e, to: t, message: r?.text ?? "", wrap: r?.wrap ?? this.autoWrap(), type: a, activate: s, centralConnection: l ?? 0 }), !0;
  }
  addNote(e, t, r) {
    let a = r.wrap ?? this.autoWrap(), s = { actor: e, placement: t, message: r.text, wrap: a }, l = typeof e == "string" ? [e, e] : e;
    this.notes.push(s), this.messages.push({ id: String(this.messages.length), from: l[0], to: l[1], message: r.text, wrap: a, type: 2, placement: t });
  }
  addLinks(e, t) {
    let r = this.actors.get(e);
    if (r) try {
      let a = JSON.parse(t.text);
      for (let [s, l] of G1(a)) r.links.set(s, l);
    } catch {
      return;
    }
  }
  addALink(e, t) {
    let r = this.actors.get(e);
    if (!r) return;
    let a = t.text.indexOf("@");
    r.links.set(t.text.slice(0, a - 1).trim(), t.text.slice(a + 1).trim());
  }
  addProperties(e, t) {
    let r = this.actors.get(e);
    if (r) try {
      let a = JSON.parse(t.text);
      for (let [s, l] of G1(a)) r.properties.set(s, l);
    } catch {
      return;
    }
  }
  addDetails(e, t) {
    let r = this.actors.get(e);
    r && (r.details = t.text);
  }
  apply(e) {
    let t = [], r = [], a = e;
    for (; ; ) {
      a !== void 0 && (Array.isArray(a) ? (t.push(a), r.push(0)) : typeof a != "string" && this.applyOne(a));
      let s = t.length - 1;
      if (s < 0) return;
      let l = t[s];
      r[s] < l.length ? a = l[r[s]++] : (t.pop(), r.pop(), a = void 0);
    }
  }
  applyOne(e) {
    let t = e.actor;
    switch (e.type) {
      case "sequenceIndex":
        this.messages.push({ id: String(this.messages.length), from: void 0, to: void 0, message: { start: e.sequenceIndex, step: e.sequenceIndexStep, visible: e.sequenceVisible === !0 }, wrap: !1, type: e.signalType });
        break;
      case "addParticipant":
        this.addActor(t, t, e.description, e.draw, e.config);
        break;
      case "createParticipant":
        this.actors.has(t) && Wi("It is not possible to have actors with the same id, even if one is destroyed before the next is created. Use 'AS' aliases to simulate the behavior"), this.lastCreated = t, this.addActor(t, t, e.description, e.draw, e.config), this.createdActors.set(t, this.messages.length);
        break;
      case "destroyParticipant":
        this.lastDestroyed = t, this.destroyedActors.set(t, this.messages.length);
        break;
      case "activeStart":
      case "activeEnd":
      case "centralConnection":
      case "centralConnectionReverse":
        this.addSignal(t, void 0, void 0, e.signalType);
        break;
      case "addNote":
        this.addNote(e.actor, e.placement, e.text);
        break;
      case "addLinks":
        this.addLinks(t, e.text);
        break;
      case "addALink":
        this.addALink(t, e.text);
        break;
      case "addProperties":
        this.addProperties(t, e.text);
        break;
      case "addDetails":
        this.addDetails(t, e.text);
        break;
      case "addMessage":
        this.lastCreated ? (e.to !== this.lastCreated && Wi(`The created participant ${this.lastCreated} does not have an associated creating message after its declaration. Please check the sequence diagram.`), this.lastCreated = void 0) : this.lastDestroyed && (e.to !== this.lastDestroyed && e.from !== this.lastDestroyed && Wi(`The destroyed participant ${this.lastDestroyed} does not have an associated destroying message after its declaration. Please check the sequence diagram.`), this.lastDestroyed = void 0), this.addSignal(e.from, e.to, e.msg, e.signalType, e.activate, e.centralConnection);
        break;
      case "boxStart":
        this.addBox(e.boxData);
        break;
      case "boxEnd":
        this.currentBox = void 0;
        break;
      case "loopStart":
        this.addSignal(void 0, void 0, e.loopText, e.signalType);
        break;
      case "rectStart":
        this.addSignal(void 0, void 0, e.color, e.signalType);
        break;
      case "optStart":
        this.addSignal(void 0, void 0, e.optText, e.signalType);
        break;
      case "altStart":
      case "else":
        this.addSignal(void 0, void 0, e.altText, e.signalType);
        break;
      case "parStart":
      case "and":
        this.addSignal(void 0, void 0, e.parText, e.signalType);
        break;
      case "criticalStart":
        this.addSignal(void 0, void 0, e.criticalText, e.signalType);
        break;
      case "option":
        this.addSignal(void 0, void 0, e.optionText, e.signalType);
        break;
      case "breakStart":
        this.addSignal(void 0, void 0, e.breakText, e.signalType);
        break;
      case "loopEnd":
      case "rectEnd":
      case "optEnd":
      case "altEnd":
      case "parEnd":
      case "criticalEnd":
      case "breakEnd":
        this.addSignal(void 0, void 0, void 0, e.signalType);
        break;
    }
  }
}, H1 = ["$end", "INVALID", "INVALID", "NEWLINE", "SD", "create", "box", "restOfLine", "end", "autonumber", "NUM", "off", "activate", "deactivate", "title", "legacy_title", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "loop", "rect", "opt", "alt", "par", "par_over", "critical", "break", "option", "and", "else", "participant", "AS", "participant_actor", "destroy", "note", "over", "links", "link", "properties", "details", ",", "left_of", "right_of", "+", "-", "()", "ACTOR", "CONFIG_START", "CONFIG_CONTENT", "CONFIG_END", "TXT", "SOLID_OPEN_ARROW", "DOTTED_OPEN_ARROW", "SOLID_ARROW", "BIDIRECTIONAL_SOLID_ARROW", "DOTTED_ARROW", "BIDIRECTIONAL_DOTTED_ARROW", "SOLID_CROSS", "DOTTED_CROSS", "SOLID_POINT", "DOTTED_POINT", "SOLID_ARROW_TOP", "SOLID_ARROW_BOTTOM", "STICK_ARROW_TOP", "STICK_ARROW_BOTTOM", "SOLID_ARROW_TOP_DOTTED", "SOLID_ARROW_BOTTOM_DOTTED", "STICK_ARROW_TOP_DOTTED", "STICK_ARROW_BOTTOM_DOTTED", "SOLID_ARROW_TOP_REVERSE", "SOLID_ARROW_BOTTOM_REVERSE", "STICK_ARROW_TOP_REVERSE", "STICK_ARROW_BOTTOM_REVERSE", "SOLID_ARROW_TOP_REVERSE_DOTTED", "SOLID_ARROW_BOTTOM_REVERSE_DOTTED", "STICK_ARROW_TOP_REVERSE_DOTTED", "STICK_ARROW_BOTTOM_REVERSE_DOTTED"], Xm = new Uint8Array(128);
for (let e = 0; e < 128; e++) {
  let t = String.fromCharCode(e), r = e === 32 || e >= 9 && e <= 13, a = 0;
  `/\\+()<->:
,;`.includes(t) || (a |= 1), `+<->:
,;`.includes(t) || (a |= 2), `<>:
,;@`.includes(t) || (a |= 8 | (r ? 0 : 4)), `#
;`.includes(t) || (a |= 16), !`/\\+()<>:
,;-`.includes(t) && !r && (a |= 32), Xm[e] = a;
}
function sC(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = -1, h = (M, A, m) => {
    r.push(M), a.push(e.slice(A, m)), s.push(A), i = m;
  }, c = (M, A, m, I) => {
    r.push(M), a.push(I), s.push(A), i = m;
  }, u = (M) => {
    l.push(n), n = M;
  }, d = () => {
    l.length > 0 && (n = l.pop());
  }, p = (M) => (o < M && (o = e.indexOf(`
`, M), o === -1 && (o = t)), o), g = (M, A) => {
    let m = e.charCodeAt(M);
    return m < 128 ? (Xm[m] & A) !== 0 : A === 4 || A === 32 ? !Ke(m) : !0;
  }, y = (M, A) => {
    for (let m = 0; m < A.length; m++) {
      let I = A.charCodeAt(m), k = e.charCodeAt(M + m);
      if (I >= 97 && I <= 122 ? (k | 32) !== I : k !== I) return !1;
    }
    return !0;
  }, b = (M) => y(i, M) && !nt(e.charCodeAt(i + M.length)), x = (M) => {
    for (; M < t && Ke(e.charCodeAt(M)); ) M++;
    return M;
  }, v = () => {
    let M = i;
    for (; M < t; ) {
      let A = e.charCodeAt(M);
      if (A === 10 || !Ke(A)) break;
      M++;
    }
    return M === i ? !1 : (i = M, !0);
  }, $ = (M) => {
    for (; M < t && g(M, 16); ) M++;
    return M;
  }, S = (M, A, m) => {
    h(M, i, i + A), u(m);
  }, R = (M, A, m = -1) => b(M) ? (h(A, i, i + M.length), m >= 0 && u(m), !0) : !1, D = (M, A) => {
    if (!y(i, M)) return !1;
    let m = i + M.length, I = e.charCodeAt(m);
    if (I !== 32 && I !== 9) return !1;
    for (; I === 32 || I === 9; ) I = e.charCodeAt(++m);
    return m >= t || !g(m, 32) ? !1 : (h(A, i, i + M.length), !0);
  }, O = (M) => {
    let A = e.charCodeAt(M), m = e.charCodeAt(M + 1);
    if (A === 45) {
      if (m === 120 || m === 88 || m === 41 || m === 92 || m === 47 || m === 45) return !0;
      let I = e.charCodeAt(M + 2);
      return m === 124 && (I === 92 || I === 47);
    }
    return A === 47 || A === 92 ? (m === 124 || m === A) && e.charCodeAt(M + 2) === 45 : A === 40 && m === 41;
  }, U = () => {
    let M = i + 1;
    for (; M < t && g(M, 1); ) M++;
    for (; M < t && !O(M); ) {
      let A = M;
      for (; e.charCodeAt(A) === 45; ) A++;
      if (A >= t || !g(A, 2)) break;
      for (A++; A < t && g(A, 2); ) A++;
      M = A;
    }
    c(48, i, M, e.slice(i, M).trim());
  }, q = () => {
    let M = i;
    for (; yt(e.charCodeAt(M)); ) M++;
    let A = M > i;
    if (e.charCodeAt(M) === 46 && yt(e.charCodeAt(M + 1))) {
      let I = yt(e.charCodeAt(M + 2)) ? M + 3 : M + 2, k = e.charCodeAt(I);
      if (k === 32 || k === 10) return h(10, i, I), !0;
    }
    let m = e.charCodeAt(M);
    return A && (m === 32 || m === 10) ? (h(10, i, M), !0) : !1;
  }, C = () => {
    let M = e.charCodeAt(i + 1), A = e.charCodeAt(i + 2);
    if (M === 62) h(A === 62 ? 55 : 53, i, i + (A === 62 ? 3 : 2));
    else if (M === 120 || M === 88) h(59, i, i + 2);
    else if (M === 41) h(61, i, i + 2);
    else if (M === 124 && A === 92) h(63, i, i + 3);
    else if (M === 124 && A === 47) h(64, i, i + 3);
    else if (M === 92 && A === 92) h(65, i, i + 3);
    else if (M === 47 && A === 47) h(66, i, i + 3);
    else if (M === 45) {
      let m = e.charCodeAt(i + 3);
      A === 62 ? h(m === 62 ? 57 : 54, i, i + (m === 62 ? 4 : 3)) : A === 120 || A === 88 ? h(60, i, i + 3) : A === 41 ? h(62, i, i + 3) : A === 124 && m === 92 ? h(67, i, i + 4) : A === 124 && m === 47 ? h(68, i, i + 4) : A === 92 && m === 92 ? h(69, i, i + 4) : A === 47 && m === 47 ? h(70, i, i + 4) : h(46, i, i + 1);
    } else h(46, i, i + 1);
  }, ee = (M) => {
    let A = e.charCodeAt(i + 1);
    if (A !== 124 && A !== M || e.charCodeAt(i + 2) !== 45) return !1;
    let m = e.charCodeAt(i + 3) === 45, I = M === 47, k;
    return A === 124 ? m ? k = I ? 75 : 76 : k = I ? 71 : 72 : m ? k = I ? 77 : 78 : k = I ? 73 : 74, h(k, i, i + (m ? 4 : 3)), !0;
  }, ie = () => {
    if (!y(i, "title")) return !1;
    let M = i + 5, A = e.charCodeAt(M) === 58;
    A && M++;
    let m = M;
    for (; m < t && e.charCodeAt(m) !== 10 && Ke(e.charCodeAt(m)); ) m++;
    if (m === t || e.charCodeAt(m) === 10) return i = m, !0;
    let I = e.charCodeAt(M);
    return !Ke(I) || I === 13 || !g(M + 1, 16) ? !1 : (h(A ? 15 : 14, i, $(M + 1)), !0);
  }, G = () => {
    let M = y(i, "accdescr");
    if (!M && !y(i, "acctitle")) return !1;
    let A = x(i + 8), m = e.charCodeAt(A);
    return m === 58 ? (h(M ? 18 : 16, i, x(A + 1)), u(M ? 6 : 5), !0) : M && m === 123 ? (i = x(A + 1), u(7), !0) : !1;
  }, z = (M) => {
    switch (M | 32) {
      case 97:
        return R("actor", 34, 1) || R("alt", 24, 3) || R("and", 30, 3) || R("activate", 12, 1) || G() || R("autonumber", 9);
      case 98:
        return R("box", 6, 3) || R("break", 28, 3);
      case 99:
        return R("create", 5) || R("critical", 27, 3);
      case 100:
        return R("destroy", 35, 1) || D("details", 41) || R("deactivate", 13, 1);
      case 101:
        return R("else", 31, 3) || R("end", 8);
      case 108:
        return R("loop", 21, 3) || R("left of", 43) || D("links", 38) || D("link", 39);
      case 110:
        return R("note", 36);
      case 111:
        return R("opt", 23, 3) || R("option", 29, 3) || R("over", 37) || R("off", 11);
      case 112:
        return R("participant", 32, 1) || R("par", 25, 3) || R("par_over", 26, 3) || D("properties", 40);
      case 114:
        return R("rect", 22, 3) || R("right of", 44);
      case 115:
        return R("sequencediagram", 4);
      case 116:
        return ie();
      default:
        return !1;
    }
  }, _ = () => {
    let M = e.charCodeAt(i);
    if (M === 10) {
      let A = i + 1;
      for (; e.charCodeAt(A) === 10; ) A++;
      h(3, i, A);
      return;
    }
    if (Ke(M)) {
      i = x(i + 1);
      return;
    }
    if (M === 35 || M === 37 && e.charCodeAt(i + 1) !== 123) {
      i = p(i);
      return;
    }
    if (!((yt(M) || M === 46) && q()) && !(M < 128 && (M | 32) >= 97 && (M | 32) <= 122 && z(M))) if (M === 44) h(42, i, i + 1);
    else if (M === 59) h(3, i, i + 1);
    else if (g(i, 1)) U();
    else if (M === 45) C();
    else if (M === 60 && e.startsWith("<<->>", i)) h(56, i, i + 5);
    else if (M === 60 && e.startsWith("<<-->>", i)) h(58, i, i + 6);
    else {
      if ((M === 47 || M === 92) && ee(M)) return;
      M === 58 ? h(52, i, $(i + 1)) : M === 43 ? h(45, i, i + 1) : M === 40 && e.charCodeAt(i + 1) === 41 ? h(47, i, i + 2) : h(2, i, i + 1);
    }
  }, T = () => {
    if (v()) return !0;
    let M = e.charCodeAt(i);
    if (M === 35) return i = p(i), !0;
    if (M === 64 && e.charCodeAt(i + 1) === 123) return S(49, 2, 4), !0;
    let A = i;
    for (; A < t && g(A, 4); ) A++;
    if (A > i) {
      let I = x(A);
      if (e.charCodeAt(I) === 64 && e.charCodeAt(I + 1) === 123) return h(48, i, A), !0;
      if (I > A && y(I, "as") && Ke(e.charCodeAt(I + 2))) return h(48, i, A), u(2), !0;
    }
    let m = A;
    for (; m < t && g(m, 8); ) m++;
    if (m > i) {
      let I = e.charCodeAt(m), k = m;
      if (m < t && I !== 10 && I !== 59) for (k--; k > i && e.charCodeAt(k) !== 35; ) k--;
      if (k > i) return c(48, i, k, e.slice(i, k).trim()), d(), !0;
    }
    if (e.charCodeAt(m) === 60) return h(2, i, p(i)), d(), !0;
    if (M !== 10) {
      let I = p(i);
      return c(2, i, I, e.slice(i, I).trim()), d(), !0;
    }
    return !1;
  }, E = () => {
    switch (n) {
      case 0:
        return _(), !0;
      case 1:
        return T();
      case 2:
        return v() ? !0 : e.charCodeAt(i) === 35 ? (i = p(i), !0) : (d(), d(), b("as") ? S(33, 2, 3) : h(3, i, i), !0);
      case 3:
        return v() ? !0 : e.charCodeAt(i) === 35 ? (i = p(i), !0) : (h(7, i, $(i)), d(), !0);
      case 4:
        if (e.charCodeAt(i) !== 125) {
          let M = e.indexOf("}", i);
          return M === -1 && (M = t), h(50, i, M), !0;
        } else {
          let M = x(i + 1), A = M > i + 1 && y(M, "as") && Ke(e.charCodeAt(M + 2));
          return h(51, i, i + 1), d(), A ? u(2) : d(), !0;
        }
      case 5:
      case 6:
        return h(n === 5 ? 17 : 19, i, p(i)), d(), !0;
      default:
        if (e.charCodeAt(i) === 125) i++, d();
        else {
          let M = e.indexOf("}", i);
          M === -1 && (M = t), h(20, i, M);
        }
        return !0;
    }
  };
  for (; i < t; ) if (!E()) return r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s };
  return n === 0 || n === 2 ? h(3, t, t) : n === 3 ? h(7, t, t) : n === 5 ? h(17, t, t) : n === 6 ? h(19, t, t) : n === 7 && h(20, t, t), r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s };
}
var _t = new Int8Array(79).fill(-1);
_t[53] = 5;
_t[54] = 6;
_t[55] = 0;
_t[57] = 1;
_t[56] = 33;
_t[58] = 34;
_t[59] = 3;
_t[60] = 4;
_t[61] = 24;
_t[62] = 25;
_t[63] = 41;
_t[64] = 42;
_t[65] = 43;
_t[66] = 44;
_t[67] = 51;
_t[68] = 52;
_t[69] = 53;
_t[70] = 54;
_t[71] = 45;
_t[72] = 46;
_t[73] = 47;
_t[74] = 48;
_t[75] = 55;
_t[76] = 56;
_t[77] = 57;
_t[78] = 58;
var sa = new Int8Array(79).fill(-1);
sa[21] = 2;
sa[22] = 3;
sa[23] = 4;
sa[28] = 5;
sa[24] = 6;
sa[25] = 7;
sa[26] = 7;
sa[27] = 8;
sa[6] = 1;
var nC = "'SOLID_OPEN_ARROW', 'DOTTED_OPEN_ARROW', 'SOLID_ARROW', 'DOTTED_ARROW', 'SOLID_CROSS', 'DOTTED_CROSS', 'SOLID_POINT', 'DOTTED_POINT'";
function oC(e, t) {
  let { types: r, texts: a, starts: s } = sC(e), l = 0, n = ($) => {
    let S = r[l];
    throw S === 1 ? bt("sequence", e, s[l], "", !0) : bt("sequence", e, s[l], `Expecting ${$}, got '${H1[S]}'`);
  }, i = ($) => (r[l] !== $ && n(`'${H1[$]}'`), a[l++]), o = () => {
    let $ = r[l];
    return $ !== 48 && $ !== 39 && n("'ACTOR'"), { type: "addParticipant", actor: a[l++] };
  }, h = () => t.parseMessage(i(52).trim().substring(1)), c = () => {
    let $ = r[l++];
    if ($ === 35) {
      let R = o();
      return i(3), R.type = "destroyParticipant", R;
    }
    let S = o();
    if (r[l] === 49 && r[l - 1] === 48) {
      l++;
      let R = i(50);
      i(51), S.config = R.trim();
    }
    if (S.draw = $ === 32 ? "participant" : "actor", r[l] === 33) {
      l++;
      let R = i(7);
      i(3), S.description = t.parseMessage(R);
    } else r[l] === 3 ? l++ : n("'AS', 'NEWLINE'");
    return S;
  }, u = ($) => {
    let S = !1;
    r[l] === 47 && (S = !0, l++);
    let R = _t[r[l]];
    R < 0 && n(nC), l++;
    let D = r[l];
    (D === 47 || !S && (D === 45 || D === 46)) && l++;
    let O = o(), U = h(), q = { type: "addMessage", from: $.actor, to: O.actor, signalType: R, msg: U }, C = [$, O, q];
    if (S) {
      let ee = D === 47;
      q.activate = ee, q.centralConnection = ee ? 61 : 60, ee && C.push({ type: "centralConnection", signalType: 59, actor: O.actor }), C.push({ type: "centralConnectionReverse", signalType: 60, actor: $.actor });
    } else D === 45 ? (q.activate = !0, C.push({ type: "activeStart", signalType: 17, actor: O.actor })) : D === 46 ? C.push({ type: "activeEnd", signalType: 18, actor: $.actor }) : D === 47 && (q.activate = !0, q.centralConnection = 59, C.push({ type: "centralConnection", signalType: 59, actor: O.actor }));
    return C;
  }, d = ($) => {
    l++;
    let S = o();
    return [S, { type: $, actor: S.actor, text: h() }];
  }, p = () => {
    l++;
    let $ = r[l];
    if ($ === 37) {
      l++;
      let D = o(), O = D, U = [D.actor, D.actor];
      if (r[l] === 42) {
        l++;
        let q = o();
        O = [D, q], U = [D.actor, q.actor];
      }
      return [O, { type: "addNote", placement: 2, actor: U, text: h() }];
    }
    $ !== 43 && $ !== 44 && n("'over', 'left_of', 'right_of'"), l++;
    let S = o();
    return [S, { type: "addNote", placement: $ === 43 ? 0 : 1, actor: S.actor, text: h() }];
  }, g = () => {
    l++;
    let $ = { type: "sequenceIndex", sequenceVisible: !0, signalType: 26 };
    return r[l] === 10 ? ($.sequenceIndex = Number(a[l++]), $.sequenceIndexStep = r[l] === 10 ? Number(a[l++]) : 1) : r[l] === 11 && (l++, $.sequenceVisible = !1), r[l] !== 3 && n("'NEWLINE', 'NUM', 'off'"), l++, $;
  }, y = ($, S, R, D) => {
    let O = $.list, U = $.sections;
    if (U) for (let q = U.length - 2; q >= 0; q -= 2) {
      let C = { type: S, signalType: D };
      C[R] = t.parseMessage(U[q + 1]), O = U[q].concat([C, O]);
    }
    return O;
  }, b = ($) => {
    let S = $.text, R = $.list;
    switch ($.kind) {
      case 1:
        R[0] = { type: "boxStart", boxData: t.parseBoxData(S) }, R.push({ type: "boxEnd", boxText: S });
        break;
      case 2:
        R[0] = { type: "loopStart", loopText: t.parseMessage(S), signalType: 10 }, R.push({ type: "loopEnd", loopText: S, signalType: 11 });
        break;
      case 3:
        R[0] = { type: "rectStart", color: t.parseMessage(S), signalType: 22 }, R.push({ type: "rectEnd", color: t.parseMessage(S), signalType: 23 });
        break;
      case 4:
        R[0] = { type: "optStart", optText: t.parseMessage(S), signalType: 15 }, R.push({ type: "optEnd", optText: t.parseMessage(S), signalType: 16 });
        break;
      case 5:
        R[0] = { type: "breakStart", breakText: t.parseMessage(S), signalType: 30 }, R.push({ type: "breakEnd", optText: t.parseMessage(S), signalType: 31 });
        break;
      case 6:
        R = y($, "else", "altText", 13), R[0] = { type: "altStart", altText: t.parseMessage(S), signalType: 12 }, R.push({ type: "altEnd", signalType: 14 });
        break;
      case 7:
        R = y($, "and", "parText", 20), R[0] = { type: "parStart", parText: t.parseMessage(S), signalType: $.startType }, R.push({ type: "parEnd", signalType: 21 });
        break;
      default:
        R = y($, "option", "optionText", 28), R[0] = { type: "criticalStart", criticalText: t.parseMessage(S), signalType: 27 }, R.push({ type: "criticalEnd", signalType: 29 });
    }
    return R;
  };
  for (; r[l] === 3; ) l++;
  i(4);
  let x = [], v = { kind: 0, text: "", startType: 0, list: [], sections: void 0 };
  for (; ; ) {
    let $ = r[l], S = v.list;
    if (v.kind === 1) {
      if ($ === 32 || $ === 34 || $ === 35) S.push(c());
      else if ($ === 3) S.push([]), l++;
      else if ($ === 8) {
        l++;
        let R = b(v);
        v = x.pop(), v.list.push(R);
      } else n("'end', 'NEWLINE', 'participant', 'participant_actor', 'destroy'");
      continue;
    }
    switch ($) {
      case 3:
      case 2:
        S.push([]), l++;
        break;
      case 32:
      case 34:
      case 35:
        S.push(c());
        break;
      case 5: {
        l++;
        let R = r[l];
        R !== 32 && R !== 34 && R !== 35 && n("'participant', 'participant_actor', 'destroy'");
        let D = c();
        D.type = "createParticipant", S.push(D);
        break;
      }
      case 48:
        S.push(u(o())), i(3);
        break;
      case 39: {
        let R = r[l + 1];
        S.push(R === 48 || R === 39 ? d("addALink") : u(o())), i(3);
        break;
      }
      case 38:
        S.push(d("addLinks")), i(3);
        break;
      case 40:
        S.push(d("addProperties")), i(3);
        break;
      case 41:
        S.push(d("addDetails")), i(3);
        break;
      case 36:
        S.push(p()), i(3);
        break;
      case 9:
        S.push(g());
        break;
      case 12:
      case 13: {
        l++;
        let R = o();
        i(3), S.push($ === 12 ? { type: "activeStart", signalType: 17, actor: R.actor } : { type: "activeEnd", signalType: 18, actor: R.actor });
        break;
      }
      case 14:
      case 15: {
        let R = a[l++].substring($ === 14 ? 6 : 7);
        t.setDiagramTitle(R), S.push(R);
        break;
      }
      case 16: {
        l++;
        let R = i(17).trim();
        t.setAccTitle(R), S.push(R);
        break;
      }
      case 18: {
        l++;
        let R = i(19).trim();
        t.setAccDescription(R), S.push(R);
        break;
      }
      case 20: {
        let R = a[l++].trim();
        t.setAccDescription(R), S.push(R);
        break;
      }
      case 21:
      case 22:
      case 23:
      case 28:
      case 24:
      case 25:
      case 26:
      case 27:
      case 6: {
        l++;
        let R = i(7);
        x.push(v), v = { kind: sa[$], text: R, startType: $ === 26 ? 32 : 19, list: [[]], sections: void 0 };
        break;
      }
      case 31:
      case 30:
      case 29: {
        v.kind !== ($ === 31 ? 6 : $ === 30 ? 7 : 8) && n("'end'"), l++;
        let R = i(7);
        (v.sections ??= []).push(S, R), v.list = [];
        break;
      }
      case 8: {
        v.kind === 0 && n("'NEWLINE', 'EOF'"), l++;
        let R = b(v);
        v = x.pop(), v.list.push(R);
        break;
      }
      case 0:
        v.kind !== 0 && n("'end'"), t.apply(S);
        return;
      default:
        n("'NEWLINE', 'ACTOR', 'participant', 'note', 'end'");
    }
  }
}
var hC = 16, cC = 10, Zm = 34, Qm = 4, Qa = 5, Za = 6, da = ' fill="var(--_s)" stroke="var(--_b)"', Fl = ' fill="none" stroke="var(--_b)"', dC = /* @__PURE__ */ new Set(["participant", "actor", "boundary", "control", "entity", "database", "collections", "queue"]), fC = /* @__PURE__ */ new Set(["actor", "boundary", "control", "entity", "database"]);
function uC(e) {
  return dC.has(e) ? e : "participant";
}
function jo(e) {
  return fC.has(e);
}
function pC(e, t, r, a, s = hC) {
  if (jo(e)) return { w: Math.max(40, t.width + 8), h: Zm + (t.height > 0 ? Qm + t.height : 0) };
  let l = e === "collections" ? Qa : e === "queue" ? 2 * Za : 0;
  return { w: Math.max(r, t.width + 2 * s) + l, h: Math.max(a, t.height + 2 * cC) + (e === "collections" ? Qa : 0) };
}
function gC(e, t, r) {
  let a = f(t), s = (l) => f(r + l);
  switch (e) {
    case "actor":
      return `<circle cx="${a}" cy="${s(7)}" r="6"${da}/><path d="M${a},${s(13)}V${s(24)}M${f(t - 10)},${s(17)}H${f(t + 10)}M${f(t - 8)},${s(34)}L${a},${s(24)}L${f(t + 8)},${s(34)}"${Fl}/>`;
    case "boundary":
      return `<path d="M${f(t - 19)},${s(6)}V${s(28)}M${f(t - 19)},${s(17)}H${f(t - 8)}"${Fl}/><circle cx="${f(t + 3)}" cy="${s(17)}" r="11"${da}/>`;
    case "control":
      return `<circle cx="${a}" cy="${s(21)}" r="11"${da}/><path d="M${f(t + 5)},${s(5)}L${f(t - 1)},${s(10)}L${f(t + 5)},${s(15)}"${Fl}/>`;
    case "entity":
      return `<circle cx="${a}" cy="${s(15)}" r="11"${da}/><path d="M${f(t - 11)},${s(30)}H${f(t + 11)}"${Fl}/>`;
    default: {
      let l = f(t - 14), n = f(t + 14);
      return `<path d="M${l},${s(7)}V${s(27)}A14,5 0 0 0 ${n},${s(27)}V${s(7)}A14,5 0 0 0 ${l},${s(7)}Z"${da}/><path d="M${l},${s(7)}A14,5 0 0 0 ${n},${s(7)}"${Fl}/>`;
    }
  }
}
function mC(e, t, r, a, s, l, n = "") {
  let { w: i, h: o } = a, h = ' class="pele-label"';
  if (jo(e)) return gC(e, t, r) + Pe(s, t, r + Zm + Qm + s.height / 2, h + n, l);
  let c = t - i / 2;
  if (e === "collections") {
    let u = i - Qa, d = o - Qa, p = `<rect x="${f(c + Qa)}" y="${f(r)}" width="${f(u)}" height="${f(d)}"${da}${wt}/>`, g = `<rect x="${f(c)}" y="${f(r + Qa)}" width="${f(u)}" height="${f(d)}"${da}${wt}/>`;
    return p + g + Pe(s, c + u / 2, r + Qa + d / 2, h, l);
  }
  if (e === "queue") {
    let u = f(c + Za), d = f(c + i - Za), p = f(r + o), g = f(o / 2);
    return `<path d="M${u},${f(r)}H${d}A${Za},${g} 0 0 1 ${d},${p}H${u}A${Za},${g} 0 0 1 ${u},${f(r)}Z"${da}/><path d="M${d},${f(r)}A${Za},${g} 0 0 0 ${d},${p}"${Fl}/>` + Pe(s, t - Za / 2, r + o / 2, h, l);
  }
  return `<rect x="${f(c)}" y="${f(r)}" width="${f(i)}" height="${f(o)}"${da}${wt}/>` + Pe(s, t, r + o / 2, h, l);
}
var iu = [];
function Kt(e, t, r, a = 1, s = !1) {
  iu[e] = { dotted: t, head: r, atStart: a !== 1, atEnd: a !== 0, bottom: s };
}
Kt(0, !1, 1);
Kt(1, !0, 1);
Kt(3, !1, 2);
Kt(4, !0, 2);
Kt(5, !1, 0);
Kt(6, !0, 0);
Kt(24, !1, 3);
Kt(25, !0, 3);
Kt(33, !1, 1, 2);
Kt(34, !0, 1, 2);
for (let e of [!1, !0]) {
  let t = e ? 10 : 0;
  Kt(41 + t, e, 4), Kt(42 + t, e, 4, 1, !0), Kt(43 + t, e, 5), Kt(44 + t, e, 5, 1, !0), Kt(45 + t, e, 4, 0), Kt(46 + t, e, 4, 0, !0), Kt(47 + t, e, 5, 0), Kt(48 + t, e, 5, 0, !0);
}
var yC = /* @__PURE__ */ new Map([[10, "loop"], [12, "alt"], [15, "opt"], [19, "par"], [32, "par"], [27, "critical"], [30, "break"], [22, "rect"]]), xC = 12, dd = 28, U1 = 22, br = 10, Y1 = 4, wC = 14, Nl = 10, $C = 16, bC = 20, MC = 10, Nn = 20, j1 = 240, Rn = 16, Rl = 4, q1 = ' stroke-dasharray="4 4"';
function Cf(e) {
  return e !== void 0 && iu[e] !== void 0;
}
function vC(e, t) {
  let r = new Array(e.length), a = new Array(e.length), s = 1, l = 1, n = !1;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    if (r[i] = NaN, a[i] = !1, o.type === 26) {
      let h = o.message;
      s = h.start || s, l = h.step || l, n = h.visible;
    } else Cf(o.type) && (r[i] = s, a[i] = n || t, s = Math.round((s + l) * 100) / 100);
  }
  return { index: r, shown: a, visible: n };
}
var V1 = { lines: [], widths: [], width: 0, height: 0, size: 0, lineHeight: 0 };
function Ya(e, t, r) {
  let a = e[t];
  return typeof a == "number" && a >= 0 && a <= 2e3 ? a : r;
}
function K1(e, t, r, a, s, l) {
  let n = f(e - r * Nt);
  return s ? `<path class="pele-marker" d="M${f(e)},${f(t)}L${n},${f(t + a * 5)}"/>` : `<path class="pele-marker" d="M${f(e)},${f(t)}L${n},${f(t + a * 4.5)}V${f(t)}Z" fill="${l}" stroke="none"/>`;
}
function Dn(e, t, r, a, s, l) {
  switch (e) {
    case 1:
      return St("arrow_point", t, r, a, 0, l);
    case 2:
      return St("arrow_cross", t, r, a, 0, l);
    case 3:
      return `<path class="pele-marker" d="M${f(t - a * Nt)},${f(r - 4.5)}L${f(t)},${f(r)}L${f(t - a * Nt)},${f(r + 4.5)}" stroke-linejoin="round"/>`;
    case 4:
      return K1(t, r, a, s, !1, l);
    case 5:
      return K1(t, r, a, s, !0, l);
    default:
      return "";
  }
}
function kC(e) {
  return e === 1 ? Nt - 1 : e === 2 ? 4 : 0;
}
function AC(e, t, r) {
  return Da(r, (a) => Jm(e, t, r, a));
}
function Jm(e, t, r, a, s = 0, l = !0) {
  let n = t.sequence ?? {}, i = r.fontSize ?? 16, o = Math.round(i * 0.875), h = Math.round(i * 0.75), c = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), u = Array.isArray(r.monospace) && r.monospace.includes("messages"), d = u ? { width: (ge, De, Re) => c.width(ge, De, Re | 4) } : c, p = r.icons, g = r.padding ?? 8, y = n.mirrorActors !== !1, b = n.rightAngles === !0, x = Math.min(Ya(n, "actorMargin", 40), a ? 8 : 1 / 0), v = Math.min(Ya(n, "width", 64), a ? 48 : 1 / 0), $ = Ya(n, "height", Math.round(i * 1.5) + 20), S = Math.min(Ya(n, "width", 160), a ? Math.max(32, ((r.maxWidth ?? 320) - 2 * g) / Math.max(1, e.actors.size) - x - 24) : 1 / 0), R = Math.max(4, 14 + Ya(n, "messageMargin", 35) - 35), D = Math.min(Ya(n, "noteMargin", 10), a ? 6 : 1 / 0), O = Math.min(Ya(n, "boxMargin", 10), a ? 6 : 1 / 0), U = n.messageAlign === "left" ? -1 : n.messageAlign === "right" ? 1 : 0, q = a ? 6 : xC, C = a ? 8 : $C, ee = a ? 12 : bC, ie = a ? 6 : MC, G = e.messages, z = G.length, _ = vC(G, n.showSequenceNumbers === !0), T = (ge, De, Re, Ue = S, Ge = c) => {
    let qe = je(ge, !1, Ge, De, a || Re ? Ue : 1 / 0);
    return a ? Ro(qe, Ge, Math.max(120, Ue)) : qe;
  }, E = (ge, De, Re = S) => T(ge, o, De, Re, d), M;
  if (n.hideUnusedParticipants === !0) {
    M = /* @__PURE__ */ new Set();
    for (let ge of G) M.add(ge.from).add(ge.to);
  }
  let A = new Int32Array(z + 1);
  A[z] = -1;
  for (let ge = z - 1; ge >= 0; ge--) A[ge] = Cf(G[ge].type) ? ge : A[ge + 1];
  let m = [], I = /* @__PURE__ */ new Map();
  for (let [ge, De] of e.actors) {
    if (M && !M.has(ge)) continue;
    let Re = uC(De.type), Ue = T(De.description, i, De.wrap), Ge = e.createdActors.get(ge), qe = e.destroyedActors.get(ge), Je = Ge === void 0 ? -1 : A[Math.min(Ge, z)];
    Je >= 0 && G[Je].to !== ge && (Je = -1);
    let Ne = qe === void 0 ? -1 : A[Math.min(qe, z)];
    Ne >= 0 && G[Ne].to !== ge && G[Ne].from !== ge && (Ne = -1), I.set(ge, m.length), m.push({ id: ge, actor: De, kind: Re, label: Ue, size: pC(Re, Ue, v, $, a ? 8 : void 0), x: 0, createAt: Je, destroyAt: Ne, top: 0, lifeStart: 0, lifeEnd: -1, activations: [] });
  }
  let k = m.length - 1, w = /* @__PURE__ */ new Map(), B = (ge, De, Re) => {
    if (ge < 0 || De > k) return;
    let Ue = ge * m.length + De;
    (w.get(Ue) ?? 0) < Re && w.set(Ue, Re);
  }, N = (ge) => _.shown[ge] ? Math.max(Rn, c.width(String(_.index[ge]), h, 0) + 8) : 0, j = new Array(z), F = new Array(z), Y = (ge, De) => {
    let Re = F[ge];
    if (!Re) {
      if (De === S) return j[ge].label;
      F[ge] = Re = /* @__PURE__ */ new Map([[S, j[ge].label]]);
    }
    let Ue = Re.get(De);
    return Ue || Re.set(De, Ue = E(G[ge].message, !0, De)), Ue;
  };
  for (let ge = 0; ge < z; ge++) {
    let De = G[ge], Re = De.from === void 0 ? void 0 : I.get(De.from), Ue = De.to === void 0 ? void 0 : I.get(De.to);
    if (!(Re === void 0 || Ue === void 0 || typeof De.message != "string")) {
      if (De.type === 2) {
        let Ge = T(De.message, o, De.wrap), qe = Ge.width + 2 * D;
        De.placement === 0 ? B(Re - 1, Re, qe + 2 * Nl + br) : De.placement === 1 ? B(Re, Re + 1, qe + 2 * Nl + br) : Re === Ue ? (B(Re - 1, Re, qe / 2 + Nl), B(Re, Re + 1, qe / 2 + Nl)) : B(Math.min(Re, Ue), Math.max(Re, Ue), qe - 2 * C), j[ge] = { kind: 2, a: Re, b: Ue, label: Ge, x: 0, w: qe };
      } else if (Cf(De.type)) {
        let Ge = E(De.message, De.wrap), qe = N(ge);
        if (Re === Ue) B(Re, Re + 1, dd + 8 + Ge.width + 16 + br + qe), j[ge] = { kind: 1, a: Re, b: Ue, label: Ge, x: 0, w: 0 };
        else {
          let Je = m[Ue].createAt === ge ? m[Ue].size.w / 2 : 0, Ne = De.centralConnection ? 4 * Rl : 0;
          B(Math.min(Re, Ue), Math.max(Re, Ue), (a ? Math.min(Ge.width, Math.max(16, S - 16)) : Ge.width) + 2 * q + br + qe + Je + Ne), j[ge] = { kind: 0, a: Re, b: Ue, label: Ge, x: 0, w: 0 };
        }
      }
    }
  }
  let W = [];
  for (let ge = 0; ge <= k; ge++) {
    let De = m[ge].actor.box, Re = W[W.length - 1];
    De && Re && Re.box === De && Re.last === ge - 1 ? Re.last = ge : De && W.push({ box: De, first: ge, last: ge, title: T(De.name, o, De.wrap), grow: 0 });
  }
  let K = new Array(Math.max(k, 0));
  for (let ge = 0; ge < k; ge++) {
    let De = m[ge], Re = m[ge + 1], Ue = De.actor.box !== Re.actor.box ? (De.actor.box ? O : 0) + (Re.actor.box ? O : 0) : 0;
    K[ge] = Math.max(De.size.w / 2 + Re.size.w / 2 + x + Ue, w.get(ge * m.length + ge + 1) ?? 0);
  }
  let H = [];
  for (let [ge, De] of w) {
    let Re = Math.floor(ge / m.length), Ue = ge % m.length;
    Ue - Re > 1 && H.push([Re, Ue, De]);
  }
  H.sort((ge, De) => ge[1] - ge[0] - (De[1] - De[0]) || ge[0] - De[0]);
  for (let [ge, De, Re] of H) {
    let Ue = 0;
    for (let qe = ge; qe < De; qe++) Ue += K[qe];
    if (Ue >= Re) continue;
    let Ge = (Re - Ue) / (De - ge);
    for (let qe = ge; qe < De; qe++) K[qe] += Ge;
  }
  let te = () => {
    for (let ge = 1; ge <= k; ge++) m[ge].x = m[ge - 1].x + K[ge - 1];
  };
  te();
  for (let ge of W) {
    let De = m[ge.last].x + m[ge.last].size.w / 2 - (m[ge.first].x - m[ge.first].size.w / 2);
    ge.grow = Math.max(0, (ge.title.width - De) / 2), ge.grow !== 0 && (ge.first > 0 && (K[ge.first - 1] += ge.grow), ge.last < k && (K[ge.last] += ge.grow));
  }
  let Q = 1 / 0, L = -1 / 0, X = (ge, De) => {
    ge < Q && (Q = ge), De > L && (L = De);
  }, le = (ge) => [m[ge.first].x - m[ge.first].size.w / 2 - O - ge.grow, m[ge.last].x + m[ge.last].size.w / 2 + O + ge.grow], J = new Array(z), V = () => {
    te(), Q = 1 / 0, L = -1 / 0;
    for (let Re of m) X(Re.x - Re.size.w / 2, Re.x + Re.size.w / 2);
    for (let Re of W) X(...le(Re));
    let ge = [], De = () => k < 0 ? [0, 120] : [m[0].x - ee, m[k].x + ee];
    for (let Re = 0; Re < z; Re++) {
      let Ue = G[Re], Ge = Ue.type, qe = Ge === void 0 ? void 0 : yC.get(Ge), Je = j[Re];
      if (qe !== void 0) {
        let Ne = { kind: qe, x0: 1 / 0, x1: -1 / 0, top: 0, title: V1, tabW: 0, fill: qe === "rect" && typeof Ue.message == "string" ? Ue.message : "", dividers: [Re], dividerY: [], dividerLabels: [] };
        J[Re] = Ne, ge.push(Ne);
      } else if (Ge === 13 || Ge === 20 || Ge === 28) ge[ge.length - 1]?.dividers.push(Re);
      else if (Ge === 11 || Ge === 14 || Ge === 16 || Ge === 21 || Ge === 29 || Ge === 31 || Ge === 23) {
        let Ne = ge.pop();
        if (!Ne) continue;
        if (J[Re] = Ne, Ne.x0 > Ne.x1 && ([Ne.x0, Ne.x1] = De()), Ne.kind !== "rect") {
          Ne.tabW = c.width(Ne.kind, h, 1) + 14;
          for (let rt = 0; rt < Ne.dividers.length; rt++) {
            let st = G[Ne.dividers[rt]].message, ft = rt === 0 ? Ne.tabW + 8 : 0, ot = Ne.x1 - Ne.x0 - 16 - ft, Xe = st ? T(`[${st}]`, o, !0, Math.max(ot, a ? Math.min(j1, S) : j1)) : V1;
            Xe.width > ot && (Ne.x1 += Xe.width - ot), rt === 0 ? Ne.title = Xe : Ne.dividerLabels.push(Xe);
          }
        }
        X(Ne.x0, Ne.x1);
        let Qe = ge[ge.length - 1];
        Qe && (Qe.x0 = Math.min(Qe.x0, Ne.x0 - ie), Qe.x1 = Math.max(Qe.x1, Ne.x1 + ie));
      } else if (Je) {
        let Ne = m[Je.a], Qe = m[Je.b], rt, st;
        if (Je.kind === 2) {
          if (Ue.placement === 0) Je.x = Ne.x - Nl - Je.w;
          else if (Ue.placement === 1) Je.x = Ne.x + Nl;
          else if (Je.a === Je.b) Je.x = Ne.x - Je.w / 2;
          else {
            let ot = Math.min(Ne.x, Qe.x) - C, Xe = Math.max(Ne.x, Qe.x) + C;
            (a || Ue.wrap) && (Je.label = T(Ue.message, o, !0, Math.max(S, Xe - ot - 2 * D))), Je.w = Math.max(Xe - ot, Je.label.width + 2 * D), Je.x = (ot + Xe - Je.w) / 2;
          }
          rt = Je.x, st = Je.x + Je.w;
        } else Je.kind === 1 ? (rt = Ne.x, st = Ne.x + br + dd + 8 + Je.label.width + N(Re)) : (rt = Math.min(Ne.x, Qe.x), st = Math.max(Ne.x, Qe.x), (a || Ue.wrap) && (Je.label = Y(Re, Math.max(S, st - rt - 2 * q - br))), Qe.createAt === Re && (Qe.x > Ne.x ? st += Qe.size.w / 2 : rt -= Qe.size.w / 2));
        X(rt, st);
        let ft = ge[ge.length - 1];
        ft && (ft.x0 = Math.min(ft.x0, rt - ee), ft.x1 = Math.max(ft.x1, st + ee));
      }
    }
  };
  V();
  let Z = !1, ae = !1;
  if (a && r.maxWidth !== void 0) {
    let ge = Math.floor(r.maxWidth) - Math.ceil(L - Q + 2 * g) - s, De = new Int32Array(m.length), Re = new Array(K.length).fill(0), Ue = [], Ge = 0;
    for (let Ne = 0; ge > 0 && Ne < j.length; Ne++) {
      let Qe = j[Ne];
      if (Qe?.kind !== 0) continue;
      let rt = E(G[Ne].message, !1, 1 / 0);
      if (Qe.label.lines.length <= rt.lines.length) continue;
      Ue.push(Ne), Ge += Qe.label.lines.length;
      let st = Math.min(Qe.a, Qe.b), ft = Math.max(Qe.a, Qe.b);
      De[st]++, De[ft]--;
      let ot = (rt.width - (m[ft].x - m[st].x - 2 * q - br)) / (ft - st);
      for (let Xe = st; Xe < ft; Xe++) Re[Xe] = Math.max(Re[Xe], ot);
    }
    let qe = 0, Je = 0;
    for (let Ne = 0; Ne < K.length; Ne++) qe += De[Ne], De[Ne] = qe > 0 ? 1 : 0, Je += De[Ne];
    if (Je > 0) {
      let Ne = K.slice(), Qe = (dt) => {
        for (let ht = 0; ht < K.length; ht++) K[ht] = Ne[ht] + dt(ht);
        return V(), Ue.map((ht) => j[ht].label.lines.length);
      }, rt = (dt) => dt.reduce((ht, pt) => ht + pt, 0), st = (dt) => De[dt] * ge / Je, ft = Qe(st), ot = rt(Re), Xe = (dt) => Re[dt] * (ge - 0.01) / ot;
      if (l && Je > 1 && ot > 0 && K.some((dt, ht) => Xe(ht) > st(ht))) {
        let dt = ft;
        ft = Qe(Xe), ae = rt(ft) < rt(dt) && ft.every((ht, pt) => ht <= dt[pt]), ae || (ft = Qe(st));
      }
      Z = rt(ft) < Ge, Z || (K.splice(0, K.length, ...Ne), V());
    }
  }
  let oe = 0;
  for (let ge of W) oe = Math.max(oe, ge.title.height);
  let ue = W.length > 0 ? O + (oe > 0 ? oe + 4 : 0) : 0, he = 0;
  for (let ge of m) ge.createAt < 0 && (he = Math.max(he, ge.size.h));
  let re = ue + he;
  for (let ge of m) ge.top = re - ge.size.h, ge.lifeStart = re;
  let P = m.map((ge) => ge.x), ne = (ge, De) => {
    let Re = 0, Ue = P.length;
    for (; Re < Ue; ) {
      let Ge = Re + Ue >> 1;
      P[Ge] <= ge ? Re = Ge + 1 : Ue = Ge;
    }
    return Re < P.length && P[Re] < De;
  }, ce = [], pe = /* @__PURE__ */ new Map(), Me = (ge) => {
    if (ge) return pe.has(ge) || pe.set(ge, si(Dt([`fill:${ge}`]).shape)), pe.get(ge);
  }, xe = (ge) => {
    let De = Me(ge);
    return De ? ` fill="${De}"` : "";
  }, ve = (ge, De) => {
    for (let Re = ce.length - 1; Re >= 0; Re--) if (ce[Re].kind === "rect") return ce[Re].fill;
    for (let Re of W) {
      let [Ue, Ge] = le(Re);
      if (ge >= Ue && De <= Ge) return Re.box.fill;
    }
  }, Ae = (ge, De) => xe(ve(ge, De)), Ee = (ge, De, Re, Ue = !1) => {
    if (ge.width === 0) return "";
    let Ge = De - ge.width / 2, qe = ne(Ge, Ge + ge.width), Je = qe ? `<rect x="${f(Ge - 3)}" y="${f(Re - ge.height / 2 + 2)}" width="${f(ge.width + 6)}" height="${f(ge.height - 4)}" rx="3" fill="var(--_bg)" stroke="none"/>` : "", Ne = qe ? "" : Ae(Ge, Ge + ge.width);
    return Je + Pe(ge, De, Re, Ue ? ` class="pele-frame-label"${Ne || ' fill="var(--_m)"'} stroke="none"` : Ne, p);
  }, me = (ge, De = 0) => ge.activations.length + De > 0 ? ge.x - br / 2 : ge.x, we = (ge, De = 0) => {
    let Re = ge.activations.length + De;
    return Re > 0 ? ge.x + br / 2 + (Re - 1) * Y1 : ge.x;
  }, Se = [], se = [], ye = "", ke = "", $e = "", be = "", Ie = "", ze = "", Oe = (ge, De) => {
    let Re = ge.activations.pop(), Ue = Math.max(De, Re + wC), Ge = ge.x - br / 2 + ge.activations.length * Y1;
    return X(Ge, Ge + br), se.push(`<rect class="pele-activation" data-id="${Ye(ge.id)}" x="${f(Ge)}" y="${f(Re)}" width="${br}" height="${f(Ue - Re)}" rx="2"/>`), Ue;
  }, de = (ge, De) => {
    let Re = ge.x, Ue = De + 16;
    return ge.lifeEnd = Ue, ze += `<path class="pele-destroy" data-id="${Ye(ge.id)}" d="M${f(Re - 6)},${f(Ue - 6)}L${f(Re + 6)},${f(Ue + 6)}M${f(Re + 6)},${f(Ue - 6)}L${f(Re - 6)},${f(Ue + 6)}"/>`, Ue + 6;
  }, Te = (ge, De, Re) => {
    let Ue = ge.actor.properties.get("class");
    return `<g class="pele-node pele-actor pele-actor-${ge.kind}${Re ? " pele-actor-footer" : ""}${typeof Ue == "string" ? Ht(Ue) : ""}" data-id="${Ye(ge.id)}">` + mC(ge.kind, ge.x, De, ge.size, ge.label, p, jo(ge.kind) ? xe(ge.actor.box?.fill) : "") + "</g>";
  }, fe = (ge, De, Re, Ue) => `<g class="pele-sequence-number"><rect x="${f(De - Ue / 2)}" y="${f(Re - Rn / 2)}" width="${f(Ue)}" height="${Rn}" rx="${Rn / 2}" fill="var(--_l)" stroke="none"/><text x="${f(De)}" y="${f(Re + h * 0.35)}" text-anchor="middle" font-size="${h}" fill="var(--_bg)" stroke="none">${it(String(_.index[ge]))}</text></g>`, Ce = re + 6;
  for (let ge = 0; ge < z; ge++) {
    let De = G[ge], Re = De.type, Ue = j[ge], Ge = J[ge];
    if (Re === 17) {
      let qe = De.from === void 0 ? void 0 : I.get(De.from);
      qe !== void 0 && m[qe].activations.push(Ce);
    } else if (Re === 18) {
      let qe = De.from === void 0 ? void 0 : I.get(De.from);
      qe !== void 0 && m[qe].activations.length > 0 && (Ce = Math.max(Ce, Oe(m[qe], Ce)));
    } else if (Ge && Ge.dividers[0] === ge) ce.push(Ge), Ge.kind === "rect" ? (Ge.top = Ce + 8, Ce = Ge.top) : (Ge.top = Ce + 12, Ce = Ge.top + Math.max(Nn, Ge.title.height + 2));
    else if (Ge) {
      ce.pop();
      let qe = Ce + 12, Je = f(Ge.x0), Ne = f(Ge.x1 - Ge.x0);
      if (Ge.kind === "rect") {
        let Qe = Ge.fill ? Dt([`fill:${Ge.fill}`]).shape : "";
        Se.push(`<rect class="pele-rect" x="${Je}" y="${f(Ge.top)}" width="${Ne}" height="${f(qe - Ge.top)}"${Et((Qe ? "" : ' fill-opacity="0.5"') + Qe)}/>`);
      } else {
        let Qe = `<rect x="${Je}" y="${f(Ge.top)}" width="${Ne}" height="${f(qe - Ge.top)}" fill="none"${wt}/>`;
        for (let rt = 0; rt < Ge.dividerY.length; rt++) {
          let st = Ge.dividerY[rt], ft = Ge.dividerLabels[rt];
          Qe += `<path d="M${Je},${f(st)}H${f(Ge.x1)}"${q1}/>` + Ee(ft, Ge.x0 + 8 + ft.width / 2, st + 2 + ft.height / 2, !0);
        }
        Qe += `<rect x="${Je}" y="${f(Ge.top)}" width="${f(Ge.tabW)}" height="${Nn}" fill="var(--_s)"${wt}/><text class="pele-frame-kind" x="${f(Ge.x0 + Ge.tabW / 2)}" y="${f(Ge.top + Nn / 2 + h * 0.35)}" text-anchor="middle" font-size="${h}" font-weight="var(--_hw)" fill="var(--_m)" stroke="none">${Ge.kind}</text>` + Ee(Ge.title, Ge.x0 + Ge.tabW + 8 + Ge.title.width / 2, Ge.top + Math.max(Nn, Ge.title.height) / 2, !0), ye += `<g class="pele-frame pele-frame-${Ge.kind}">${Qe}</g>`;
      }
      Ce = qe;
    } else if (Re === 13 || Re === 20 || Re === 28) {
      let qe = ce[ce.length - 1];
      if (qe) {
        let Je = qe.dividerLabels[qe.dividerY.length];
        qe.dividerY.push(Ce + 12), Ce += 12 + (Je.height > 0 ? Je.height : 0);
      }
    } else if (Ue && Ue.kind === 2) {
      let qe = m[Ue.a], Je = Ue.label.height + 2 * Math.max(4, D - 4), Ne = Ce + 10, Qe = Ue.x;
      De.placement === 1 ? Qe += we(qe) - qe.x : De.placement === 0 && (Qe += me(qe) - qe.x), X(Qe, Qe + Ue.w), be += `<g class="pele-note" data-id="i${Ye(De.id)}"><rect x="${f(Qe)}" y="${f(Ne)}" width="${f(Ue.w)}" height="${f(Je)}"${wt}/>` + Pe(Ue.label, Qe + Ue.w / 2, Ne + Je / 2, ' class="pele-label" stroke="none" fill="var(--_fg)"', p) + "</g>", Ce = Ne + Je;
    } else if (Ue) {
      let qe = iu[Re], Je = m[Ue.a], Ne = m[Ue.b], Qe = Ue.label, rt = N(ge), st = 0;
      for (let Mt = ge + 1; Mt < z; Mt++) {
        let Ot = G[Mt].type;
        if (Ot === 17) G[Mt].from === De.to && st++;
        else if (Ot !== 18 && Ot !== 59 && Ot !== 60) break;
      }
      let ft = qe.bottom ? 1 : -1, ot = qe.dotted ? q1 : "", Xe = De.centralConnection, dt = Xe === 59 || Xe === 61, ht = Xe === 60 || Xe === 61, pt, kt = "var(--_l)", Ut = (Mt, Ot) => `<circle class="pele-central" cx="${f(Mt)}" cy="${f(Ot)}" r="${Rl}" fill="${kt}" stroke="none"/>`, Jt = qe.atStart && !qe.atEnd, Gr = kC(qe.head), Yt = "", Lt;
      if (Ue.kind === 1) {
        let Mt = Ce + R + Math.max(0, (Qe.height - U1) / 2), Ot = Mt + U1, or = ht ? Je.x + Rl : we(Je), ar = dt ? Je.x + Rl : we(Je, st), _r = Math.max(or, ar) + dd + rt / 2;
        pt = Me(ve(Je.x, _r)), kt = pt ?? kt, ht && (Yt += Ut(Je.x, Mt)), dt && (Yt += Ut(Je.x, Ot)), rt > 0 && (Yt += fe(ge, Jt ? ar : or, Jt ? Ot : Mt, rt), Jt ? ar += rt / 2 : or += rt / 2);
        let Eh = (qe.atStart ? Dn(qe.head, or, Mt, -1, ft, kt) : "") + (qe.atEnd ? Dn(qe.head, ar, Ot, -1, -ft, kt) : ""), Ps = f(or + (qe.atStart ? Gr : 0)), Ir = f(ar + (qe.atEnd ? Gr : 0));
        Yt = `<path d="${b ? `M${Ps},${f(Mt)}H${f(_r)}V${f(Ot)}H${Ir}` : `M${Ps},${f(Mt)}H${f(_r - 6)}A6,6 0 0 1 ${f(_r)},${f(Mt + 6)}V${f(Ot - 6)}A6,6 0 0 1 ${f(_r - 6)},${f(Ot)}H${Ir}`}"${ot}/>` + Eh + Yt, X(Je.x, _r + 8 + Qe.width), Qe.width > 0 && ($e += `<g class="pele-edge-label" data-id="i${Ye(De.id)}">${Pe(Qe, _r + 8 + Qe.width / 2, (Mt + Ot) / 2, Ae(_r + 8, _r + 8 + Qe.width), p)}</g>`), Lt = Math.max(Ot, (Mt + Ot) / 2 + Qe.height / 2);
      } else {
        let Mt = Ne.x > Je.x ? 1 : -1, Ot = Ne.createAt === ge;
        pt = Me(ve(Math.min(Je.x, Ne.x), Math.max(Je.x, Ne.x))), kt = pt ?? kt, Lt = Ce + R + Math.max(Qe.height > 0 ? Qe.height + 2 : 6, Ot ? Ne.size.h / 2 - R + 6 : 0);
        let or = Mt > 0 ? we(Je) : me(Je), ar = Mt > 0 ? me(Ne, st) : we(Ne, st);
        if (Ot && (Ne.top = Lt - Ne.size.h / 2, Ne.lifeStart = Ne.top + Ne.size.h, ar = Ne.x - Mt * (jo(Ne.kind) ? 18 : Ne.size.w / 2 + 1)), ht && (Yt += Ut(Je.x, Lt), or = Je.x + Mt * Rl), dt && (Yt += Ut(Ne.x, Lt), ar = Ne.x - Mt * Rl), rt > 0) if (Jt) {
          let Ir = dt ? ar - Mt * (rt / 2 + 2) : ar;
          Yt += fe(ge, Ir, Lt, rt), ar = Ir - Mt * rt / 2;
        } else {
          let Ir = ht ? or + Mt * (rt / 2 + 2) : or;
          Yt += fe(ge, Ir, Lt, rt), or = Ir + Mt * rt / 2;
        }
        let _r = (qe.atStart ? Dn(qe.head, or, Lt, -Mt, ft * Mt, kt) : "") + (qe.atEnd ? Dn(qe.head, ar, Lt, Mt, ft * Mt, kt) : ""), Eh = or + (qe.atStart ? Mt * Gr : 0), Ps = ar - (qe.atEnd ? Mt * Gr : 0);
        if (Yt = `<path d="M${f(Eh)},${f(Lt)}H${f(Ps)}"${ot}/>` + _r + Yt, Qe.width > 0) {
          let Ir = Math.min(or, ar), uu = Math.max(or, ar), Th = U < 0 ? Ir + q + Qe.width / 2 : U > 0 ? uu - q - Qe.width / 2 : (Ir + uu) / 2;
          X(Th - Qe.width / 2, Th + Qe.width / 2), $e += `<g class="pele-edge-label" data-id="i${Ye(De.id)}">${Ee(Qe, Th, Lt - 4 - Qe.height / 2)}</g>`;
        }
        Ot && (Ce = Lt + Ne.size.h / 2 - 6);
      }
      ke += `<g class="pele-edge pele-message" data-id="i${Ye(De.id)}"${pt ? ` stroke="${pt}"` : ""}>${Yt}</g>`, Ce = Math.max(Ce, Lt), Je.destroyAt === ge && (Ce = Math.max(Ce, de(Je, Lt))), Ne.destroyAt === ge && Ne !== Je && (Ce = Math.max(Ce, de(Ne, Lt)));
    }
  }
  Ce += 20;
  for (let ge of m) for (; ge.activations.length > 0; ) Oe(ge, Ce);
  let Fe = Ce;
  if (y) {
    let ge = 0;
    for (let De of m) De.lifeEnd >= 0 || (ge = Math.max(ge, De.size.h), Ie += Te(De, Ce, !0));
    Fe = Ce + ge;
  }
  let He = "";
  for (let ge of m) {
    Ie += Te(ge, ge.top, !1);
    let De = ge.lifeEnd >= 0 ? ge.lifeEnd : Ce;
    De > ge.lifeStart && (He += `<path class="pele-lifeline" data-id="${Ye(ge.id)}" d="M${f(ge.x)},${f(ge.lifeStart)}V${f(De)}"/>`);
  }
  let We = "";
  for (let ge of W) {
    let [De, Re] = le(ge), Ue = ge.box.fill === "transparent" ? "" : Dt([`fill:${ge.box.fill}`]).shape;
    We += `<g class="pele-cluster pele-box"${ge.box.name ? ` data-id="${Ye(ge.box.name)}"` : ""}><rect x="${f(De)}" y="0" width="${f(Re - De)}" height="${f(Fe + O)}" fill="var(--_a)" stroke="var(--_b)"${Et((Ue ? "" : ' fill-opacity="0.5"') + Ue)}/>` + Pe(ge.title, (De + Re) / 2, O / 2 + 2 + ge.title.height / 2, ` class="pele-cluster-label"${xe(ge.box.fill) || ' fill="var(--_m)"'}`, p) + "</g>";
  }
  W.length > 0 && (Fe += O);
  let Le = 0, et = "", _e = Qt(r), Ve = ma(e.title, c, i, a ? _e : 1 / 0), Ze = a ? Ro(Ve, c, Math.max(120, _e)) : Ve;
  if (Q > L && X(0, Math.max(Ze.width, 40)), Ze.width > 0) {
    let ge = (Q + L) / 2;
    X(ge - Ze.width / 2, ge + Ze.width / 2), Le = -Ze.height - 12, et = Pe(Ze, ge, Le + Ze.height / 2, ' class="pele-title" font-weight="var(--_tw)"', p);
  }
  let tt = Math.ceil(L - Q + 2 * g);
  if (Z && tt > r.maxWidth) return Jm(e, t, r, a, ae ? s : s > 0 ? 1 / 0 : tt - Math.floor(r.maxWidth), !1);
  let ct = Math.ceil(Fe - Le + 2 * g);
  return { svg: xt("sequence", tt, ct, i, r, e, `<g transform="translate(${f(g - Q)},${f(g - Le)})">` + et + (We ? `<g class="pele-boxes" font-size="${o}">${We}</g>` : "") + (Se.length > 0 ? `<g class="pele-rects" fill="var(--_a)">${Se.reverse().join("")}</g>` : "") + (He ? `<g class="pele-lifelines" fill="none" stroke="var(--_b)">${He}</g>` : "") + (se.length > 0 ? `<g class="pele-activations" fill="var(--_s)" stroke="var(--_b)">${se.reverse().join("")}</g>` : "") + (ye ? `<g class="pele-frames" font-size="${o}" stroke="var(--_b)">${ye}</g>` : "") + (ke ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${ke}</g>` : "") + (ze ? `<g class="pele-destroys" fill="none" stroke="var(--_l)" stroke-width="1.5" stroke-linecap="round">${ze}</g>` : "") + ($e ? `<g class="pele-edge-labels" font-size="${o}"${u ? ` font-family="${hi}"` : ""}>${$e}</g>` : "") + (be ? `<g class="pele-notes" font-size="${o}" fill="var(--_a)" stroke="var(--_b)">${be}</g>` : "") + (Ie ? `<g class="pele-nodes">${Ie}</g>` : "") + "</g>"), width: tt, height: ct, links: [] };
}
var EC = { type: "sequence", math: !0, parse(e, t, r) {
  let a = t.sequence ?? {}, s = new iC({ wrap: typeof t.wrap == "boolean" ? t.wrap : void 0, sequenceWrap: a.wrap === !0 });
  return r && s.setDiagramTitle(r), oC(e, s), s;
}, render: AC };
function TC(e) {
  let t = "TB";
  for (let r of e) typeof r != "string" && r.stmt === "dir" && (t = r.value);
  return t;
}
function CC(e, t, r) {
  let a = [], s = [], l = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = 0, h = 0, c = (p) => {
    if (!p.id || p.id === "</join></fork>" || p.id === "</choice>") return;
    if (p.cssClasses) {
      let y;
      for (let b of p.cssClasses.split(" ")) {
        let x = r.get(b);
        if (x) {
          y ??= p.cssCompiledStyles.slice();
          for (let v of x.styles) y.push(v);
        }
      }
      y && (p.cssCompiledStyles = y);
    }
    let g = l.get(p.id);
    if (g) {
      let y = p.parentId ?? g.parentId;
      Object.assign(g, p), y !== void 0 && (g.parentId = y);
    } else l.set(p.id, p), a.push(p);
  }, u = (p, g, y) => {
    let b = g.id;
    if (b === "root") return;
    let x = t.get(b), v = x?.classes?.join(" ") ?? "", $ = x?.styles ?? [], S = n.get(b);
    if (!S) {
      let G = "rect";
      g.start === !0 ? G = "stateStart" : g.start === !1 && (G = "stateEnd"), g.type !== "default" && (G = g.type), S = { shape: G, description: b, cssClasses: `${v} statediagram-state`, cssStyles: $, type: void 0, dir: void 0, colorIndex: void 0 }, n.set(b, S);
    }
    if (g.description && (Array.isArray(S.description) ? (S.shape = "rectWithTitle", S.description = S.description.concat(g.description)) : S.description.length > 0 ? (S.shape = "rectWithTitle", S.description = S.description === b ? [g.description].flat() : [S.description, g.description].flat()) : (S.shape = "rect", S.description = Array.isArray(g.description) ? g.description.slice() : g.description)), S.description.length === 1 && S.shape === "rectWithTitle" && (S.shape = S.type === "group" ? "roundedWithTitle" : "rect"), !S.type && g.doc) {
      if (S.type = "group", S.dir = TC(g.doc), S.shape = g.type === "divider" ? "divider" : "roundedWithTitle", S.shape === "divider" && p?.id !== void 0 && i.has(p.id)) S.colorIndex = i.get(p.id);
      else {
        let G = h++;
        S.colorIndex = v.trim() !== "" || $.length > 0 ? void 0 : G;
      }
      i.set(b, S.colorIndex), S.cssClasses = `${S.cssClasses} statediagram-cluster ${y ? "statediagram-cluster-alt" : ""}`;
    }
    let R = S.description, D = { id: b, shape: S.shape, label: Array.isArray(R) ? R[0] : R, description: Array.isArray(R) ? R.slice(1) : [], cssClasses: S.cssClasses, cssCompiledStyles: [], cssStyles: S.cssStyles, type: S.type, isGroup: S.type === "group", dir: S.dir, colorIndex: S.colorIndex };
    D.shape === "divider" && (D.label = ""), p && p.id !== "root" && (D.parentId = p.id);
    let O = g.note;
    if (!O) {
      c(D);
      return;
    }
    let U = (G, z, _, T) => ({ id: G, shape: z, label: O.text, description: [], cssClasses: _, cssCompiledStyles: [], cssStyles: [], type: T ? "group" : "node", isGroup: T, dir: void 0, position: O.position }), q = U(`${b}----note-${o++}`, "note", "statediagram-note", !1);
    q.parentId = `${b}----parent`, q.noteFor = b, c(U(q.parentId, "noteGroup", S.cssClasses, !0)), c(q), c(D);
    let C = O.position === "left of", ee = C ? q.id : b, ie = C ? b : q.id;
    s.push({ id: `${ee}-${ie}`, start: ee, end: ie, label: "", classes: "transition note-edge", pattern: "dashed" });
  }, d = [{ item: void 0, doc: e, at: 0, alt: !0 }];
  for (; d.length > 0; ) {
    let p = d[d.length - 1];
    if (p.at >= p.doc.length) {
      d.pop();
      continue;
    }
    let g = p.doc[p.at++];
    typeof g != "string" && (g.stmt === "state" ? (u(p.item, g, p.alt), g.doc && d.push({ item: g, doc: g.doc, at: 0, alt: !p.alt })) : g.stmt === "relation" && (u(p.item, g.state1, p.alt), u(p.item, g.state2, p.alt), s.push({ id: `edge${o++}`, start: g.state1.id, end: g.state2.id, label: g.description ?? "", classes: "transition" })));
  }
  for (let p of a) if (p.isGroup && p.description.length > 0) throw new at(`Group nodes can only have label. Remove the additional description for node [${p.id}]`, "semantic", { type: "state" });
  return { nodes: a, edges: s };
}
var SC = class {
  type = "state";
  rootDoc = [];
  states = /* @__PURE__ */ new Map();
  relations = [];
  classes = /* @__PURE__ */ new Map();
  links = /* @__PURE__ */ new Map();
  graph = { nodes: [], edges: [] };
  title;
  accTitle;
  accDescr;
  dividerCount = 0;
  get direction() {
    let e = "TB";
    for (let t of this.rootDoc) typeof t != "string" && t.stmt === "dir" && (e = t.value);
    return e;
  }
  setRootDoc(e) {
    this.rootDoc = e, this.translate(), this.extract(e);
  }
  extract(e) {
    this.states = /* @__PURE__ */ new Map(), this.relations = [], this.classes = /* @__PURE__ */ new Map();
    let t = Array.isArray(e) ? e : e.doc;
    for (let r of t) if (typeof r != "string") switch (r.stmt) {
      case "state":
        this.addState(r.id.trim(), r.type, r.doc, r.description, r.note);
        break;
      case "relation":
        this.addRelation(r.state1, r.state2, r.description);
        break;
      case "classDef":
        this.addStyleClass(r.id.trim(), r.classes);
        break;
      case "style": {
        let a = r.styleClass.split(",").map((s) => s.replace(/;/g, "").trim());
        for (let s of this.named(r.id.trim())) s.styles = a.slice();
        break;
      }
      case "applyClass":
        this.setCssClass(r.id.trim(), r.styleClass);
        break;
      case "click":
        this.addLink(typeof r.id == "string" ? r.id : r.id.id, r.url, r.tooltip);
        break;
    }
    this.graph = CC(t, this.states, this.classes);
  }
  translate() {
    let e = [["root", { stmt: "root", id: "root", doc: this.rootDoc }, !0]];
    for (; e.length > 0; ) {
      let [t, r, a] = e.pop();
      if (typeof r == "string") continue;
      if (r.stmt === "relation") {
        e.push([t, r.state2, !1], [t, r.state1, !0]);
        continue;
      }
      if (r.stmt === "state") r.id === "[*]" ? (r.id = t + (a ? "_start" : "_end"), r.start = a) : r.id = r.id.trim();
      else if (r.stmt !== "root") continue;
      if (!r.doc) continue;
      let s = [], l = [];
      for (let n of r.doc) typeof n != "string" && n.stmt === "state" && n.type === "divider" && !n.doc ? (s.push({ ...n, doc: l }), l = []) : l.push(n);
      s.length > 0 && (l.length > 0 && s.push({ stmt: "state", id: this.getDividerId(), type: "divider", doc: l }), r.doc = s);
      for (let n = r.doc.length - 1; n >= 0; n--) e.push([r.id, r.doc[n], !0]);
    }
  }
  addState(e, t = "default", r, a, s, l) {
    let n = e.trim(), i = this.states.get(n);
    if (i ? (i.doc || (i.doc = r), i.type || (i.type = t)) : (i = { stmt: "state", id: n, descriptions: [], type: t, doc: r, note: s, classes: [], styles: [], textStyles: [] }, this.states.set(n, i)), a) for (let o of Array.isArray(a) ? a : [a]) this.addDescription(n, o.trim());
    if (s && (i.note = s), l) for (let o of l) this.setCssClass(n, o.trim());
  }
  getState(e) {
    return this.states.get(e);
  }
  addLink(e, t, r) {
    this.links.set(e, { url: t, tooltip: r });
  }
  addRelation(e, t, r = "") {
    for (let a of [e, t]) this.addState(a.id, a.type, a.doc, a.description, a.note, a.classes);
    this.relations.push({ id1: e.id.trim(), id2: t.id.trim(), relationTitle: r });
  }
  addDescription(e, t) {
    this.states.get(e)?.descriptions?.push(t.startsWith(":") ? t.replace(":", "").trim() : t);
  }
  getDividerId() {
    return `divider-id-${++this.dividerCount}`;
  }
  addStyleClass(e, t = "") {
    let r = this.classes.get(e);
    if (r || (r = { id: e, styles: [], textStyles: [] }, this.classes.set(e, r)), !!t) for (let a of t.split(",")) {
      let s = a.replace(";", "").trim();
      a.includes("color") && r.textStyles.push(s.replace("fill", "bgFill").replace("color", "fill")), r.styles.push(s);
    }
  }
  setCssClass(e, t) {
    for (let r of this.named(e)) r.classes?.push(t);
  }
  getDirection() {
    for (let e of this.rootDoc) if (typeof e != "string" && e.stmt === "dir") return e.value;
    return "TB";
  }
  setDirection(e) {
    for (let t of this.rootDoc) if (typeof t != "string" && t.stmt === "dir") {
      t.value = e;
      return;
    }
    this.rootDoc.unshift({ stmt: "dir", value: e });
  }
  trimColon(e) {
    return e.startsWith(":") ? e.slice(1).trim() : e.trim();
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  named(e) {
    let t = [];
    for (let r of e.split(",")) {
      let a = this.states.get(r);
      a || (this.addState(r), a = this.states.get(r.trim())), a && t.push(a);
    }
    return t;
  }
}, X1 = ["$end", "INVALID", "NL", "SD", "DESCR", "-->", "HIDE_EMPTY", "scale", "WIDTH", "COMPOSIT_STATE", "STRUCT_START", "STRUCT_STOP", "STATE_DESCR", "AS", "ID", "FORK", "JOIN", "CHOICE", "CONCURRENT", "note", "NOTE_TEXT", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "CLICK", "STRING", "HREF", "classDef", "CLASSDEF_ID", "DEFAULT_CLASSDEF_ID", "CLASSDEF_STYLEOPTS", "DEFAULT", "style", "STYLE_IDS", "STYLEDEF_STYLEOPTS", "class", "CLASSENTITY_IDS", "STYLECLASS", "direction_tb", "direction_bt", "direction_rl", "direction_lr", "EDGE_STATE", "STYLE_SEPARATOR", "left_of", "right_of", "INVALID"], _C = /direction/gi, IC = /<<(?:fork|join|choice)>>|\[\[(?:fork|join|choice)\]\]/gi, NC = /[\n\r\u2028\u2029]/g, RC = /%%/g, DC = /\{/g;
function Bi(e, t) {
  let r = 0, a = -2;
  return (s) => {
    if (a === -2 || s < r || a !== -1 && s > a) {
      e.lastIndex = s;
      let l = e.exec(t);
      a = l ? l.index : -1, r = s;
    }
    return a;
  };
}
function LC(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o, h = Bi(_C, e), c = Bi(IC, e), u = Bi(NC, e), d = Bi(RC, e), p = Bi(DC, e), g = -1, y = -1, b = [-1, -1, -1, -1], x = [0, 0, 0, 0], v = -1, $ = -1, S = [-1, -1, -1, -1, -1, -1], R = (M, A, m) => {
    r.push(M), a.push(e.slice(A, m)), s.push(A), i = m;
  }, D = (M, A, m, I) => {
    r.push(M), a.push(A), s.push(m), i = I;
  }, O = (M) => {
    l.push(n), n = M;
  }, U = () => {
    l.length > 0 && (n = l.pop());
  }, q = (M, A) => {
    for (let m = 0; m < M.length; m++) {
      let I = M.charCodeAt(m), k = e.charCodeAt(A + m);
      if (k !== I && !(I >= 97 && I <= 122 && k === I - 32)) return !1;
    }
    return !0;
  }, C = (M) => {
    let A = M;
    for (; A < t && Ke(e.charCodeAt(A)); ) A++;
    return A;
  }, ee = (M) => {
    let A = M;
    for (; A < t && nt(e.charCodeAt(A)); ) A++;
    return A;
  }, ie = (M) => {
    let A = e.indexOf(`
`, M);
    return A === -1 ? t : A;
  }, G = (M) => {
    let A = u(M);
    return A === -1 ? t : A;
  }, z = (M) => {
    if (M < g || M > y) {
      let A = h(M), m = A === -1 ? t : G(M);
      g = M, y = m, b[0] = b[1] = b[2] = b[3] = -1;
      for (let I = A; I !== -1 && I < m; I = h(I + 1)) {
        let k = C(I + 9);
        if (k === I + 9) continue;
        let w = q("tb", k) ? 0 : q("bt", k) ? 1 : q("rl", k) ? 2 : q("lr", k) ? 3 : -1;
        w !== -1 && (b[w] = I, x[w] = k + 2);
      }
    }
    for (let A = 0; A < 4; A++) if (b[A] >= M) return A;
    return -1;
  }, _ = (M) => {
    if (M < v || M > $) {
      let A = c(M), m = A === -1 ? t : G(M);
      v = M, $ = m, S.fill(-1);
      for (let I = A; I !== -1 && I < m; I = c(I + 1)) {
        let k = e.charCodeAt(I + 2) | 32;
        S[(e.charCodeAt(I) === 60 ? 0 : 3) + (k === 102 ? 0 : k === 106 ? 1 : 2)] = I;
      }
    }
    for (let A = 0; A < 6; A++) if (S[A] >= M) return A;
    return -1;
  }, T = (M, A) => {
    let m = d(M);
    return m === -1 || m + 2 > A ? (R(14, M, A), !0) : m === M ? (i = A, !1) : (R(14, M, m), !0);
  }, E = (M) => (r.push(M), a.push(""), s.push(i), { types: r, texts: a, starts: s, error: o });
  for (; ; ) {
    if (i >= t) {
      switch (n) {
        case 0:
          R(2, t, t);
          break;
        case 6:
          R(22, t, t);
          break;
        case 7:
          R(24, t, t);
          break;
        case 8:
          R(25, t, t);
          break;
        case 10:
          R(32, t, t);
          break;
        case 12:
          R(39, t, t);
          break;
        case 14:
          R(36, t, t);
          break;
        case 3:
          R(12, t, t);
          break;
        case 18:
          R(20, t, t);
          break;
        case 4:
        case 19:
          R(14, t, t);
          break;
      }
      return E(0);
    }
    let M = e.charCodeAt(i);
    switch (n) {
      case 0:
      case 1: {
        let A = n === 0, m = M | 32;
        if (A) {
          if (m === 99 && q("click", i) && !nt(e.charCodeAt(i + 5))) {
            R(26, i, i + 5);
            continue;
          }
          if (m === 104 && q("href", i) && !nt(e.charCodeAt(i + 4))) {
            R(28, i, i + 4);
            continue;
          }
          if (M === 34) {
            let w = e.indexOf('"', i + 1);
            if (w !== -1) {
              R(27, i, w + 1);
              continue;
            }
          }
          if (m === 100 && q("default", i) && !nt(e.charCodeAt(i + 7))) {
            R(33, i, i + 7);
            continue;
          }
          let k = z(i);
          if (k !== -1) {
            R(40 + k, i, ie(x[k]));
            continue;
          }
          if (M === 10) {
            let w = i + 1;
            for (; e.charCodeAt(w) === 10; ) w++;
            R(2, i, w);
            continue;
          }
          if (Ke(M)) {
            i = C(i);
            continue;
          }
        } else if (M !== 10 && Ke(M)) {
          let k = i + 1;
          for (; k < t && e.charCodeAt(k) !== 10 && Ke(e.charCodeAt(k)); ) k++;
          i = k;
          continue;
        }
        if (M === 35 || M === 37 && e.charCodeAt(i + 1) === 37 && e.charCodeAt(i + 2) !== 123) {
          i = ie(i);
          continue;
        }
        if (m === 115) {
          if (A && q("scale", i)) {
            let k = C(i + 5);
            if (k > i + 5) {
              R(7, i, k), O(5);
              continue;
            }
          }
          if (q("style", i)) {
            let k = C(i + 5);
            if (k > i + 5) {
              R(34, i, k), O(13);
              continue;
            }
          }
          if (q("state", i)) {
            let k = C(i + 5);
            if (k > i + 5) {
              i = k, O(2);
              continue;
            }
            if (A && q("diagram", i + 5)) {
              let w = q("-v2", i + 12) ? i + 15 : i + 12;
              if (k = C(w), k > w) {
                R(3, i, k);
                continue;
              }
            }
          }
        } else if (m === 99) {
          if (q("class", i)) {
            let k = q("def", i + 5), w = k ? i + 8 : i + 5, B = C(w);
            if (B > w) {
              R(k ? 29 : 37, i, B), O(k ? 9 : 11);
              continue;
            }
          }
        } else if (m === 97 && A && (q("acctitle", i) || q("accdescr", i))) {
          let k = (e.charCodeAt(i + 3) | 32) === 116, w = C(i + 8), B = e.charCodeAt(w);
          if (B === 58) {
            R(k ? 21 : 23, i, C(w + 1)), O(k ? 6 : 7);
            continue;
          }
          if (B === 123 && !k) {
            i = C(w + 1), O(8);
            continue;
          }
        }
        if (A) {
          if (M === 123) {
            R(10, i, i + 1), O(1);
            continue;
          }
        } else {
          let k = z(i);
          if (k !== -1) {
            R(40 + k, i, ie(x[k]));
            continue;
          }
          if (M === 125) {
            R(11, i, i + 1), U();
            continue;
          }
          if (M === 10) {
            i++;
            continue;
          }
        }
        if (m === 110 && q("note", i)) {
          let k = C(i + 4);
          if (k > i + 4) {
            R(19, i, k), O(15);
            continue;
          }
        }
        if (A && m === 104 && q("hide empty description", i) && !nt(e.charCodeAt(i + 22))) {
          R(6, i, i + 22);
          continue;
        }
        if (M === 91 && e.charCodeAt(i + 1) === 42 && e.charCodeAt(i + 2) === 93) {
          R(44, i, i + 3);
          continue;
        }
        let I = i;
        for (; I < t; ) {
          let k = e.charCodeAt(I);
          if (k === 58 || k === 45 || k === 123 || Ke(k)) break;
          I++;
        }
        if (I > i) {
          T(i, I);
          continue;
        }
        if (M === 58) {
          for (I = i + 1; I < t; ) {
            let k = e.charCodeAt(I);
            if (k === 10 || k === 59) break;
            if (k === 58) {
              let w = e.charCodeAt(I + 1);
              if (I + 1 >= t || w === 58 || w === 10 || w === 59) break;
              I++;
            }
            I++;
          }
          if (I > i + 1) {
            D(4, e.slice(i, I).trim(), i, I);
            continue;
          }
          if (e.charCodeAt(i + 1) === 58 && e.charCodeAt(i + 2) === 58) {
            R(45, i, i + 3);
            continue;
          }
        } else if (M === 45 && e.charCodeAt(i + 1) === 45) {
          if (e.charCodeAt(i + 2) === 62) {
            R(5, i, i + 3);
            continue;
          }
          if (!A) {
            R(18, i, i + 2);
            continue;
          }
        }
        if (!A) return E(1);
        R(48, i, i + 1);
        continue;
      }
      case 2: {
        if (M !== 10 && Ke(M)) {
          let k = i + 1;
          for (; k < t && e.charCodeAt(k) !== 10 && Ke(e.charCodeAt(k)); ) k++;
          i = k;
          continue;
        }
        if (M === 35 || M === 37 && e.charCodeAt(i + 1) === 37 && e.charCodeAt(i + 2) !== 123) {
          i = ie(i);
          continue;
        }
        let A = _(i);
        if (A !== -1) {
          let k = S[A], w = A === 2 || A === 5;
          D(w ? 17 : A % 3 === 0 ? 15 : 16, e.slice(i, k).trim(), i, k + (w ? 10 : 8)), U();
          continue;
        }
        if (M === 34) {
          i++, O(3);
          continue;
        }
        let m = M === 10 ? C(i) : i;
        if (q("as", m)) {
          let k = C(m + 2);
          if (k > m + 2) {
            R(13, i, k), O(4);
            continue;
          }
        }
        if (M === 10) {
          i++, U();
          continue;
        }
        if (M === 123) {
          R(10, i, i + 1), U(), O(1);
          continue;
        }
        if (nt(M)) {
          let k = ee(i), w = C(k);
          if (w > k && nt(e.charCodeAt(w))) {
            let B = p(w + 1);
            if (B !== -1 && B < G(w)) return o = `Error: State name must be a single word. Found: "${e.slice(i, B + 1).trim()}"`, E(1);
          }
        }
        let I = i + 1;
        for (; I < t; ) {
          let k = e.charCodeAt(I);
          if (k === 123 || Ke(k)) break;
          I++;
        }
        R(9, i, I);
        continue;
      }
      case 3: {
        if (M === 34) {
          i++, U();
          continue;
        }
        let A = e.indexOf('"', i);
        R(12, i, A === -1 ? t : A);
        continue;
      }
      case 4: {
        let A = i;
        for (; A < t; ) {
          let m = e.charCodeAt(A);
          if (m === 10 || m === 123) break;
          A++;
        }
        T(i, A) && U();
        continue;
      }
      case 5: {
        if (M >= 48 && M <= 57) {
          let m = i + 1;
          for (; m < t && e.charCodeAt(m) >= 48 && e.charCodeAt(m) <= 57; ) m++;
          R(8, i, m);
          continue;
        }
        let A = C(i);
        if (A > i && q("width", A) && !nt(e.charCodeAt(A + 5))) {
          i = A + 5, U();
          continue;
        }
        return E(1);
      }
      case 6:
        R(22, i, ie(i)), U();
        continue;
      case 7:
        R(24, i, ie(i)), U();
        continue;
      case 8: {
        if (M === 125) {
          i++, U();
          continue;
        }
        let A = e.indexOf("}", i);
        R(25, i, A === -1 ? t : A);
        continue;
      }
      case 9: {
        let A = q("default", i) && C(i + 7) > i + 7, m = A ? i + 7 : ee(i), I = C(m);
        if (m === i || I === m) return E(1);
        R(A ? 31 : 30, i, I), U(), O(10);
        continue;
      }
      case 10:
        R(32, i, ie(i)), U();
        continue;
      case 11: {
        let A = ee(i);
        if (A === i) return E(1);
        for (; e.charCodeAt(A) === 44; ) {
          let m = C(A + 1), I = ee(m);
          if (I === m) break;
          A = I;
        }
        R(38, i, A), U(), O(12);
        continue;
      }
      case 12:
        R(39, i, ie(i)), U();
        continue;
      case 13: {
        let A = i;
        for (; A < t && (nt(e.charCodeAt(A)) || e.charCodeAt(A) === 44); ) A++;
        let m = C(A);
        if (A === i || m === A) return E(1);
        R(35, i, m), U(), O(14);
        continue;
      }
      case 14:
        R(36, i, ie(i)), U();
        continue;
      case 15: {
        if (q("left of", i) && !nt(e.charCodeAt(i + 7))) {
          R(46, i, i + 7), U(), O(16);
          continue;
        }
        if (q("right of", i) && !nt(e.charCodeAt(i + 8))) {
          R(47, i, i + 8), U(), O(16);
          continue;
        }
        if (M === 34) {
          i++, U(), O(18);
          continue;
        }
        return E(1);
      }
      case 16: {
        let A = C(i), m = A;
        for (; m < t; ) {
          let I = e.charCodeAt(m);
          if (I === 58 || I === 45 || Ke(I)) break;
          m++;
        }
        if (m === A) return E(1);
        T(i, m) && (U(), O(17));
        continue;
      }
      case 17: {
        let A = C(i);
        if (e.charCodeAt(A) === 58) {
          let k = A + 1;
          for (; k < t; ) {
            let w = e.charCodeAt(k);
            if (w === 58 || w === 10 || w === 59) break;
            k++;
          }
          if (k > A + 1) {
            D(20, e.slice(i + 2, k).trim(), i, k), U();
            continue;
          }
        }
        let m = e.indexOf(`
`, i), I = -1;
        for (; m !== -1 && (I = C(m), !(q("end note", I) && !nt(e.charCodeAt(I + 8)))); ) m = e.indexOf(`
`, I);
        if (m === -1) return E(1);
        D(20, e.slice(i, I).trim(), i, I + 8), U();
        continue;
      }
      case 18: {
        let A = C(i);
        if (q("as", A)) {
          R(13, i, C(A + 2)), U(), O(19);
          continue;
        }
        if (M === 34) {
          i++;
          continue;
        }
        let m = e.indexOf('"', i);
        R(20, i, m === -1 ? t : m);
        continue;
      }
      case 19:
        T(i, ie(i)) && U();
        continue;
    }
  }
}
var OC = ["TB", "BT", "RL", "LR"], Ln = "'NL', 'ID', 'HIDE_EMPTY', 'scale', 'COMPOSIT_STATE', 'STATE_DESCR', 'FORK', 'JOIN', 'CHOICE', 'CONCURRENT', 'note', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'CLICK', 'classDef', 'style', 'class', 'direction_tb', 'direction_bt', 'direction_rl', 'direction_lr', 'EDGE_STATE'";
function FC(e, t) {
  let { types: r, texts: a, starts: s, error: l } = LC(e), n = 0, i = (g) => {
    let y = r[n];
    throw y === 1 ? l !== void 0 ? new at(l, "syntax", { type: "state", ...ii(e, s[n]) }) : bt("state", e, s[n], "", !0) : bt("state", e, s[n], `Expecting ${g}, got '${X1[y]}'`);
  }, o = (g) => (r[n] !== g && i(`'${X1[g]}'`), a[n++]), h = () => {
    let g = r[n];
    g !== 14 && g !== 44 && i("'ID', 'EDGE_STATE'");
    let y = a[n++].trim();
    return r[n] !== 45 ? { stmt: "state", id: y, type: "default", description: "" } : (n++, { stmt: "state", id: y, classes: [o(14).trim()], type: "default", description: "" });
  };
  for (; r[n] === 2; ) n++;
  r[n] !== 3 && i("'NL', 'SD'"), n++;
  let c = [], u = [], d = (g) => {
    g !== "nl" && c.push(g);
  }, p = (g, y) => {
    n++;
    let b = [];
    c.push({ stmt: "state", id: g, type: "default", description: y, doc: b }), u.push(c), c = b;
  };
  for (; ; ) {
    let g = r[n];
    switch (g) {
      case 2:
        n++;
        break;
      case 14:
      case 44: {
        let y = h();
        if (r[n] === 4) y.description = t.trimColon(a[n++]), d(y);
        else if (r[n] === 5) {
          n++;
          let b = h();
          r[n] === 4 ? d({ stmt: "relation", state1: y, state2: b, description: t.trimColon(a[n++]) }) : d({ stmt: "relation", state1: y, state2: b });
        } else d(y);
        break;
      }
      case 6:
        d(a[n++]);
        break;
      case 7:
        n++, o(8), d(a[n - 2]);
        break;
      case 9:
        r[n + 1] === 10 ? p(a[n++], "") : d(a[n++]);
        break;
      case 12: {
        let y = a[n++];
        o(13);
        let b = o(14);
        if (r[n] === 10) p(b, y);
        else if (b.includes(":")) {
          let x = b.split(":");
          d({ stmt: "state", id: x[0], type: "default", description: [y.trim(), x[1]] });
        } else d({ stmt: "state", id: b, type: "default", description: y.trim() });
        break;
      }
      case 15:
        d({ stmt: "state", id: a[n++], type: "fork" });
        break;
      case 16:
        d({ stmt: "state", id: a[n++], type: "join" });
        break;
      case 17:
        d({ stmt: "state", id: a[n++], type: "choice" });
        break;
      case 18:
        n++, d({ stmt: "state", id: t.getDividerId(), type: "divider" });
        break;
      case 19: {
        let y = a[n++];
        if (r[n] === 46 || r[n] === 47) {
          let b = a[n++].trim(), x = o(14).trim();
          d({ stmt: "state", id: x, note: { position: b, text: o(20).trim() } });
        } else r[n] !== 20 && i("'NOTE_TEXT', 'left_of', 'right_of'"), n++, o(13), o(14), d(y);
        break;
      }
      case 40:
      case 41:
      case 42:
      case 43: {
        let y = OC[g - 40];
        n++, t.setDirection(y), d({ stmt: "dir", value: y });
        break;
      }
      case 21: {
        n++;
        let y = o(22).trim();
        t.setAccTitle(y), d(y);
        break;
      }
      case 23: {
        n++;
        let y = o(24).trim();
        t.setAccDescription(y), d(y);
        break;
      }
      case 25: {
        let y = a[n++].trim();
        t.setAccDescription(y), d(y);
        break;
      }
      case 26: {
        n++;
        let y = h(), b, x = "";
        r[n] === 28 ? (n++, b = o(27)) : (r[n] !== 27 && i("'STRING', 'HREF'"), b = a[n++], x = o(27)), o(2), d({ stmt: "click", id: y, url: b, tooltip: x });
        break;
      }
      case 29: {
        n++;
        let y = o(30).trim();
        d({ stmt: "classDef", id: y, classes: o(32).trim() });
        break;
      }
      case 34: {
        n++;
        let y = o(35).trim();
        d({ stmt: "style", id: y, styleClass: o(36).trim() });
        break;
      }
      case 37: {
        n++;
        let y = o(38).trim();
        d({ stmt: "applyClass", id: y, styleClass: o(39).trim() });
        break;
      }
      case 11:
        u.length === 0 && i(`'$end', ${Ln}`), n++, c = u.pop();
        break;
      case 0:
        return u.length > 0 && i(`'STRUCT_STOP', ${Ln}`), t.setRootDoc(c), c;
      default:
        i(u.length > 0 ? `'STRUCT_STOP', ${Ln}` : `'$end', ${Ln}`);
    }
  }
}
var zC = 40, PC = 16, WC = 44, Yl = 16, fd = 10, BC = 16, Z1 = 10, ud = 26, Q1 = 8, GC = 320, pd = 10, J1 = 8, eg = ' fill="var(--_s)" stroke="var(--_b)"', On = ' fill="none" stroke="var(--_b)"', HC = /(?:^| )statediagram-(?:state|cluster-alt|cluster|note)(?= |$)/g, UC = /* @__PURE__ */ new Map([["rectWithTitle", 1], ["stateStart", 2], ["stateEnd", 3], ["choice", 4], ["fork", 5], ["join", 6], ["note", 7], ["divider", 10]]), YC = ["pele-node pele-state", "pele-node pele-state", "pele-node pele-state-start", "pele-node pele-state-end", "pele-node pele-state-choice", "pele-node pele-state-fork", "pele-node pele-state-join", "pele-note", "pele-cluster pele-state-composite"];
function tg(e) {
  return e === "TB" || e === "BT";
}
function gd(e, t, r) {
  let a = e.state?.[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
function rg(e) {
  let t = 0, r = e.length;
  for (; t < r && e.charCodeAt(t) === 34; ) t++;
  for (; r > t && e.charCodeAt(r - 1) === 34; ) r--;
  return e.slice(t, r);
}
function ag(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
function Fn(e, t, r, a, s) {
  return `<rect x="${f(e)}" y="${f(t)}" width="${f(r)}" height="${f(a)}"${s}/>`;
}
function zn(e, t, r, a) {
  let s = Wt(0, 0);
  return s.isGroup = !0, s.dir = e, s.padX = t, s.padTop = r, s.padBottom = a, s;
}
function jC(e, t, r) {
  return ul(e.direction) ? ur(r, (a) => lg(e, t, r, a)) : lg(e, t, r, !1);
}
function lg(e, t, r, a) {
  let s = e.graph, l = t.flowchart?.curve, n = r.fontSize ?? 16, i = Math.round(n * 0.875), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = gd(t, "wrappingWidth", 200), c = r.padding ?? 8, u = r.icons, d = a ? "TB" : zr(e.direction), p = je(void 0, !1, o, n, 0), g = (re, P, ne, ce = 0) => je(re, !0, o, P, ne, ce), y = /* @__PURE__ */ new Map(), b = [], x = [], v = (re, P, ne) => (b.push({ node: re, kind: P, style: void 0, label: p, lines: [], w: 0, h: 0, titleH: 0 }), ne && x.push(ne), b.length - 1);
  for (let re of s.nodes) {
    if (re.shape === "noteGroup") continue;
    let P = re.isGroup ? re.shape === "divider" ? 9 : 8 : UC.get(re.shape) ?? 0;
    y.set(re.id, v(re, P, void 0));
  }
  let $ = b.length, S = [];
  for (let re = 0; re < $; re++) {
    let P = b[re].node.parentId, ne = P === void 0 ? void 0 : y.get(P);
    S.push(ne !== void 0 && ne !== re && b[ne].node.isGroup ? ne : -1);
  }
  {
    let re = [];
    for (let xe = 0; xe < $; xe++) re.push([]);
    let P = [], ne = new Uint8Array($);
    for (let xe = 0; xe < $; xe++) S[xe] === -1 ? (ne[xe] = 1, P.push(xe)) : re[S[xe]].push(xe);
    let ce = 0, pe = () => {
      for (; ce < P.length; ce++) for (let xe of re[P[ce]]) ne[xe] || (ne[xe] = 1, P.push(xe));
    };
    pe();
    let Me = new Int32Array($).fill(-1);
    for (let xe = 0; xe < $; xe++) {
      if (ne[xe]) continue;
      let ve = xe;
      for (; Me[ve] !== xe; ) Me[ve] = xe, ve = S[ve];
      S[ve] = -1, ne[ve] = 1, P.push(ve), pe();
    }
  }
  let R = new Int32Array($).fill(-1);
  for (let re = 0; re < $; re++) {
    let P = b[re].node.noteFor, ne = P === void 0 ? void 0 : y.get(P);
    ne !== void 0 && (R[re] = ne, S[re] = S[ne]);
  }
  let D = (re) => zr(b[re].node.dir), O = (re) => tg(S[re] === -1 ? d : D(S[re])), U = new Int32Array($), q = new Uint8Array($), C = new Array($).fill(1 / 0), ee = 0, ie = new Int32Array(2 * $);
  for (let re of s.edges) {
    let P = y.get(re.start), ne = y.get(re.end);
    if (!(P === void 0 || ne === void 0)) {
      if (re.pattern === "dashed") {
        q[b[P].kind === 7 ? ne : P] = 1;
        continue;
      }
      U[P] = Math.max(U[P], ++ie[2 * P]), U[ne] = Math.max(U[ne], ++ie[2 * ne + 1]), C[P] === 1 / 0 && (C[P] = ee++), C[ne] === 1 / 0 && (C[ne] = ee++);
    }
  }
  for (let re = 0; re < $; re++) {
    let P = b[re], ne = P.node, ce = Dt(ne.cssStyles.length > 0 ? ne.cssCompiledStyles.concat(ne.cssStyles) : ne.cssCompiledStyles), pe = (ce.bold ? 1 : 0) | (ce.italic ? 2 : 0), Me = ce.fontSize ?? n;
    P.style = ce;
    let xe;
    switch (P.kind) {
      case 8:
        P.label = g(ne.label, Me, 4e3, pe), P.titleH = P.label.height > 0 ? P.label.height + 12 : 0, xe = zn(D(re), Yl, P.titleH + Yl, Yl), xe.minW = P.label.width + 2 * Yl;
        break;
      case 9:
        xe = zn(D(re), fd, fd, fd);
        break;
      case 2:
        P.w = P.h = 14;
        break;
      case 3:
        P.w = P.h = 18;
        break;
      case 4:
        P.w = P.h = 30;
        break;
      case 5:
      case 6: {
        let ve = ag(40 * U[re] + 16, 72, 320);
        P.w = O(re) ? ve : J1, P.h = O(re) ? J1 : ve;
        break;
      }
      case 10:
        break;
      case 7:
        P.label = g(ne.label, i, Math.max(h, GC)), P.w = P.label.width + 24, P.h = P.label.height + 16;
        break;
      default: {
        P.label = g(ne.label, Me, h, pe);
        let ve = P.label.width, Ae = P.label.height + 2 * Z1;
        if (P.kind === 1) {
          Ae += 14;
          for (let Ee of ne.description) {
            let me = g(Ee === "" ? " " : Ee, i, h, pe);
            P.lines.push(me), me.width > ve && (ve = me.width), Ae += me.height;
          }
        }
        P.w = Math.max(ve + 2 * BC, 56), P.h = Ae;
      }
    }
    xe ??= Wt(P.w, P.h), (P.kind === 0 || P.kind === 1) && (xe.span = (O(re) ? P.w : P.h) - 24), x.push(xe);
  }
  let G = [], z = [], _ = [], T = new Int32Array($), E = new Float64Array($), M = new Float64Array($), A = /* @__PURE__ */ new Map(), m = (re, P) => {
    if (!x[re].isGroup) return !1;
    for (let ne = S[P]; ne !== -1; ne = S[ne]) if (ne === re) return !0;
    return !1;
  }, I = (re, P) => (A.set(G.length, re), C.push(P ? -1 : 1 / 0), v(void 0, 10, Wt(0, 0, re)));
  for (let re of s.edges) {
    let P = y.get(re.start), ne = y.get(re.end);
    if (P === void 0 || ne === void 0) continue;
    let ce = g(re.label, i, h), pe = ce.width > 0 ? ce.width + 12 : 0;
    P === ne ? (T[P]++, E[P] = Math.max(E[P], pe), M[P] += ce.height) : m(P, ne) ? P = I(P, !0) : m(ne, P) && (ne = I(ne, !1)), _.push(re), z.push(ce), G.push({ src: P, dst: ne, minlen: 1, labelW: pe, labelH: ce.height > 0 ? ce.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  for (let re = 0; re < $; re++) {
    if (R[re] !== -1) continue;
    let P = x[re], ne = 0;
    if (T[re] > 0) {
      let pe = ud + (T[re] - 1) * 8;
      ne = O(re) ? pe + E[re] : pe * 0.75 + 4 + M[re], P.isGroup || (O(re) ? (P.w += 2 * ne, P.h = Math.max(P.h, M[re])) : (P.h += 2 * ne, P.w = Math.max(P.w, E[re])), ne = 0);
    }
    if (!q[re] && ne === 0) {
      P.parent = S[re];
      continue;
    }
    let ce = O(re) ? zn("LR", ne, 0, 0) : zn("TB", 0, ne, ne);
    ce.parent = S[re], C.push(C[re]), x[re].parent = v(void 0, 10, ce);
  }
  for (let re = 0; re < $; re++) R[re] !== -1 && (x[re].parent = x[R[re]].parent);
  {
    let re = [];
    for (let xe = 0; xe < x.length; xe++) re.push([]);
    let P = [];
    for (let xe = 0; xe < x.length; xe++) {
      let ve = x[xe].parent;
      ve >= 0 ? re[ve].push(xe) : P.push(xe);
    }
    let ne = (xe) => b[xe].kind === 2 ? 0 : 1, ce = (xe, ve) => ne(xe) - ne(ve) || (C[xe] === C[ve] ? 0 : C[xe] < C[ve] ? -1 : 1) || xe - ve, pe = 0, Me = P.sort(ce).reverse();
    for (; Me.length > 0; ) {
      let xe = Me.pop();
      x[xe].seq = pe++;
      let ve = re[xe].sort(ce);
      for (let Ae = ve.length - 1; Ae >= 0; Ae--) Me.push(ve[Ae]);
    }
  }
  let k = cl(x, G, d, { nodeSep: gd(t, "nodeSpacing", zC), edgeSep: PC, rankSep: gd(t, "rankSpacing", WC), portSep: 20, tracks: l === "step" || l === "stepBefore" || l === "stepAfter", straight: l === "linear", headRoom: Ct("arrow_point") }), w = Math.ceil(k.width + 2 * c), B = Math.ceil(k.height + 2 * c), N = [], j = /* @__PURE__ */ new Map();
  for (let re of G) {
    let P = re.route;
    for (let ne = 3; ne < P.length - 3; ne += 3) {
      let ce = Math.round(P[ne + 1]), pe = j.get(ce);
      pe ? pe.push(P[ne]) : j.set(ce, [P[ne]]);
    }
  }
  let F = [];
  for (let re = 0; re < x.length; re++) F.push([]);
  let Y = [];
  for (let re = 0; re < x.length; re++) {
    let P = x[re].parent;
    P >= 0 ? F[P].push(re) : Y.push(re);
  }
  let W = Y.slice();
  for (let re = 0; re < Y.length; re++) for (let P of F[Y[re]]) Y.push(P);
  let K = "", H = [], te = "", Q = "", L = "", X = (re, P, ne, ce, pe) => {
    let Me = re.filter((Ae) => b[Ae].kind === 9);
    if (Me.length < 2) return;
    let xe = (Ae, Ee) => Ee ? x[Ae].x - x[Ae].w / 2 : x[Ae].y - x[Ae].h / 2, ve = (Ae, Ee) => Ee ? x[Ae].x + x[Ae].w / 2 : x[Ae].y + x[Ae].h / 2;
    for (let Ae of [!0, !1]) {
      let Ee = Me.slice().sort((we, Se) => xe(we, Ae) - xe(Se, Ae) || we - Se), me = !0;
      for (let we = 1; we < Ee.length; we++) ve(Ee[we - 1], Ae) > xe(Ee[we], Ae) + 0.5 && (me = !1);
      if (me) {
        for (let we = 1; we < Ee.length; we++) {
          let Se = f((ve(Ee[we - 1], Ae) + xe(Ee[we], Ae)) / 2 + c);
          te += `<path class="pele-divider" d="M${Ae ? `${Se},${f(ne)}V${f(pe)}` : `${f(P)},${Se}H${f(ce)}`}"/>`;
        }
        return;
      }
    }
    for (let Ae of Me) {
      let Ee = x[Ae];
      te += Fn(Ee.x - Ee.w / 2 + c, Ee.y - Ee.h / 2 + c, Ee.w, Ee.h, ` class="pele-divider" rx="${pd}"`);
    }
  };
  X(W, c / 2, c / 2, w - c / 2, B - c / 2);
  for (let re of Y) {
    let P = b[re], ne = P.node, ce = P.style;
    if (ne === void 0 || ce === void 0 || P.kind >= 9) continue;
    let pe = x[re], Me = pe.x + c, xe = pe.y + c, ve = P.w, Ae = P.h, Ee = Xt(ce), me = ` class="pele-label"${Ee}${ce.text}`, we;
    switch (P.kind) {
      case 8: {
        let ye = Me - pe.w / 2, ke = xe - pe.h / 2;
        Ia(ce.shape) && H.push({ box: [ye, ke, ye + pe.w, ke + pe.h], shape: ce.shape }), we = Fn(ye, ke, pe.w, pe.h, ` rx="${pd}" fill="var(--_a)"${fl(ce.shape) ? "" : ' fill-opacity="0.5"'} stroke="var(--_b)"${ce.shape}`), P.titleH > 0 && (we += `<path d="M${f(ye)},${f(ke + P.titleH)}H${f(ye + pe.w)}"${On}${ce.line}/>` + Pe(P.label, qC(pe, P.label.width, j) + c, ke + P.titleH / 2, ` class="pele-cluster-label"${Ee}${ce.text}`, u)), X(F[re], ye, ke + P.titleH, ye + pe.w, ke + pe.h);
        break;
      }
      case 2:
        we = `<circle r="7" fill="var(--_l)"${ce.shape}/>`;
        break;
      case 3:
        we = `<circle r="8.5" fill="var(--_bg)" stroke="var(--_l)"${ce.line}/><circle r="5" fill="var(--_l)"${ce.shape}/>`;
        break;
      case 4:
        we = `<polygon points="0,${f(-Ae / 2)} ${f(ve / 2)},0 0,${f(Ae / 2)} ${f(-ve / 2)},0"${eg}${ce.shape}/>`;
        break;
      case 5:
      case 6:
        we = Fn(-ve / 2, -Ae / 2, ve, Ae, ` rx="2" fill="var(--_l)"${ce.shape}`);
        break;
      case 7: {
        let ye = f(ve / 2), ke = f(Ae / 2), $e = f(ve / 2 - Q1), be = f(Q1 - Ae / 2);
        we = `<path d="M-${ye},-${ke}H${$e}L${ye},${be}V${ke}H-${ye}Z" fill="var(--_bg)" stroke="var(--_b)"/><path d="M${$e},-${ke}V${be}H${ye}"${On}/>` + Pe(P.label, 0, 0, ` class="pele-label" font-size="${i}" fill="var(--_m)"`, u);
        break;
      }
      default: {
        if (we = Fn(-ve / 2, -Ae / 2, ve, Ae, ` rx="${f(Math.min(pd, Ae / 2))}"${eg}${ce.shape}`), P.kind === 0) {
          we += Pe(P.label, 0, 0, me, u);
          break;
        }
        let ye = Z1 - Ae / 2 + P.label.height;
        we += `<path d="M${f(-ve / 2)},${f(ye + 6)}H${f(ve / 2)}"${On}${ce.line}/>` + Pe(P.label, 0, ye - P.label.height / 2, me, u), ye += 14;
        for (let ke of P.lines) we += Pe(ke, 0, ye + ke.height / 2, ` class="pele-state-description" font-size="${i}"${Ee}${ce.text}`, u), ye += ke.height;
      }
    }
    let Se = e.links.get(ne.id);
    if (Se) {
      let ye = Tt(rg(Se.tooltip));
      ye && (we = `<title>${it(ye)}</title>` + we), we = oi(we, ni(rg(Se.url)), ne.id, N, r, ' target="_blank"');
    }
    let se = `<g class="${YC[P.kind]}${Ht(ne.cssClasses.replace(HC, ""))}" data-id="${Ye(ne.id)}"`;
    P.kind === 8 ? K += `${se}>${we}</g>` : P.kind === 7 ? L += `${se} transform="translate(${f(Me)},${f(xe)})">${we}</g>` : Q += `${se} transform="translate(${f(Me)},${f(xe)})">${we}</g>`;
  }
  let le = (re, P, ne) => {
    let ce = x[ne];
    if (ce.isGroup) return;
    let pe = b[ne], Me = pe.kind === 5 || pe.kind === 6, xe = P === 0 ? 3 : P - 3;
    for (let ve of [1, 0]) {
      let Ae = ve ? ce.h : ce.w, Ee = ve ? pe.h : pe.w, me = ve ? pe.w : pe.h, we = (ve ? ce.y : ce.x) + c, Se = (ve ? ce.x : ce.y) + c, se = re[P + ve] - we;
      if (!(Math.abs(Math.abs(se) - Ae / 2) >= 0.5)) {
        re[P + ve] -= Math.sign(se) * (Ae - Ee) / 2, Me && me > Ee && (re[P + 1 - ve] = ag(re[xe + 1 - ve], Se - me / 2 + 6, Se + me / 2 - 6));
        return;
      }
    }
  }, J = q2();
  for (let re = 0; re < G.length; re++) {
    let P = G[re];
    P.src === P.dst || P.route.length < 6 || _[re].pattern === "dashed" || J.add(P.dst, fa(P.route, P.route.length - 3, x[P.dst]), "arrow_point");
  }
  let V = "", Z = "", ae = "", oe = new Int32Array($), ue = new Float64Array($);
  for (let re = 0; re < G.length; re++) {
    let P = G[re], ne = _[re], ce = z[re], pe = ne.pattern === "dashed", Me = pe ? "none" : "arrow_point", xe;
    if (P.src === P.dst) {
      let Ee = x[P.src], me = b[P.src], we = oe[P.src]++, Se = O(P.src), se = Ee.isGroup ? Ee.w : me.w, ye = Ee.isGroup ? Ee.h : me.h, ke = (Se ? se : ye) / 2, $e = Math.max(Math.min((Se ? ye : se) / 2 - 4, 8 + we * 6), 2), be = ud + we * 8, Ie = Ct(Me) / (Math.hypot(be, $e) || 1), ze = (Fe, He) => Ee.x + c + (Se ? ke + Fe : -He), Oe = (Fe, He) => Ee.y + c + (Se ? He : ke + Fe), de = (Fe, He) => `${f(ze(Fe, He))},${f(Oe(Fe, He))}`;
      xe = { d: `M${de(0, -$e)}C${de(be, -2 * $e)} ${de(be, 2 * $e)} ${de(be * Ie, $e + $e * Ie)}`, sx: 0, sy: 0, sdx: 0, sdy: 0, ex: ze(0, $e), ey: Oe(0, $e), edx: ze(-be, -$e) - ze(0, 0), edy: Oe(-be, -$e) - Oe(0, 0) };
      let Te = Math.hypot(xe.edx, xe.edy) || 1;
      xe.edx /= Te, xe.edy /= Te;
      let fe = ud + (T[P.src] - 1) * 8, Ce = ue[P.src] + ce.height / 2;
      ue[P.src] += ce.height, P.labelX = Se ? Ee.x + ke + fe + 4 + P.labelW / 2 : Ee.x, P.labelY = Se ? Ee.y - M[P.src] / 2 + Ce : Ee.y + ke + fe * 0.75 + 4 + Ce;
    } else {
      let Ee = P.route.slice(), me = J.of(P.src, fa(Ee, 0, x[P.src])), we = J.of(P.dst, fa(Ee, Ee.length - 3, x[P.dst]));
      for (let se = 0; se < Ee.length; se += 3) Ee[se] += c, Ee[se + 1] += c;
      le(Ee, 0, P.src), le(Ee, Ee.length - 3, P.dst);
      let Se = A.get(re);
      if (Se !== void 0 && Ee.length >= 6) {
        let se = x[Se], ye = b[P.src].kind === 10, ke = ye ? 0 : Ee.length - 3, $e = (se.dir === "TB" || se.dir === "LR") === ye, be = tg(se.dir) ? [Ee[ke], se.y + c + ($e ? b[Se].titleH - se.h / 2 : se.h / 2), 0] : [se.x + c + ($e ? -se.w / 2 : se.w / 2), Ee[ke + 1], 1];
        Ee = ye ? be.concat(Ee) : Ee.concat(be);
      }
      xe = Na(Ee, typeof l == "string" ? l : void 0, 0, Ct(Me), me, we);
    }
    let ve = Is(xe.d, [xe.ex, xe.ey], H, "", xe.tokens);
    ve === "" && (V += Ns(xe, "none", Me));
    let Ae = pe ? `pele-note-edge" stroke="${ve || "var(--_b)"}" stroke-dasharray="3 4` : ve ? `pele-transition" stroke="${ve}` : "pele-transition";
    if (Z += `<g class="pele-edge ${Ae}" data-id="${Ye(ne.id)}"><path d="${xe.d}"/>` + St(Me, xe.ex, xe.ey, xe.edx, xe.edy, ve || "var(--_l)") + "</g>", ce.width > 0) {
      let Ee = P.labelX + c, me = P.labelY + c;
      ae += ga(ne.id, ce, Ee, me, "", u);
    }
  }
  let he = sm(e.title, o, n, c, w, B, (K ? `<g class="pele-clusters">${K}</g>` : "") + (te ? `<g class="pele-dividers" stroke-dasharray="4 4"${On}>${te}</g>` : "") + dl(V) + (Z ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${Z}</g>` : "") + (ae ? `<g class="pele-edge-labels" font-size="${i}">${ae}</g>` : "") + `<g class="pele-nodes">${Q}${L}</g>`);
  return { svg: xt("state", he.width, he.height, n, r, e, he.content), width: he.width, height: he.height, links: N };
}
function qC(e, t, r) {
  let a = r.get(Math.round(e.y - e.h / 2));
  if (a === void 0 || t === 0) return e.x;
  let s = e.x - e.w / 2, l = t / 2, n = e.x, i = -1;
  for (let o of [e.x, s + Yl + l, s + e.w - Yl - l]) {
    let h = 1 / 0;
    for (let c of a) c > s && c < s + e.w && (h = Math.min(h, Math.abs(c - o) - l));
    if (h >= 6) return o;
    h > i + 0.5 && (i = h, n = o);
  }
  return n;
}
var VC = { type: "state", math: !0, parse(e, t, r) {
  let a = new SC();
  return r && (a.title = r), FC(e, a), a;
}, render: jC }, KC = 34, XC = 24, ZC = 8, QC = 2e4, ig = 1e4, md = 2e6, sg = 4, JC = 3, ng = 8, yd = 20, og = 20, hg = 14, eS = 3;
function tS(e, t, r, a, s = XC) {
  let l = e.length;
  if (l === 0) return { width: 0, height: 0 };
  let n = r === "LR" || r === "RL", i = r === "BT" || r === "RL", o = [];
  for (let G = l - 1; G >= 0; G--) e[G].parent < 0 && e[G].isGroup && o.push(G);
  let h = Math.max(1, o.length), c = new Int32Array(l).fill(-1);
  o.forEach((G, z) => c[G] = z);
  let u = new Uint8Array(l);
  for (let G = 0; G < l; G++) e[G].parent >= 0 && (u[e[G].parent] = 1);
  let d = new Float64Array(h).fill(s), p = s, g = (G) => {
    let z = G, _ = s;
    for (let E = 0; e[z].parent >= 0 && E < ig; E++) z = e[z].parent, c[z] < 0 && (_ += Math.max(e[z].padX, e[z].padTop, e[z].padBottom));
    let T = Math.max(0, c[z]);
    return _ > d[T] && (d[T] = _), _ > p && (p = _), T;
  }, y = new Int32Array(l).fill(-1), b = [];
  for (let G = 0; G < l; G++) c[G] >= 0 || (!e[G].isGroup || !u[G]) && (y[G] = b.length, b.push(G));
  let x = (G) => n ? G.w : G.h, v = (G) => n ? G.h : G.w, $ = b.map((G) => Ki(v(e[G]), x(e[G]))), S = [], R = [], D = 1;
  {
    let G = /* @__PURE__ */ new Set();
    for (let z = 0; z < t.length; z++) {
      let _ = t[z], T = y[_.src], E = y[_.dst];
      if (T < 0 || E < 0 || T === E) continue;
      let M = Math.min(T, E) * b.length + Math.max(T, E);
      (_.labelW > 0 || G.has(M)) && (D = 2), G.add(M), S.push(Xi(T, E, _.minlen, n ? _.labelH : _.labelW, n ? _.labelW : _.labelH)), R.push(z);
    }
  }
  Bf($, S), Gf($, S, D);
  let O = S.length, U = Int32Array.from(b, g), q = (G, z) => {
    let _ = d.map((de, Te) => z[Te] ? Math.max(de, og) : de), T = new Uint8Array(h), E = 0, M = new Int32Array(O);
    for (let de = 0; de < O; de++) M[de] = Math.abs($[S[de].head].rank - $[S[de].tail].rank), G[de] || (E += M[de] - 1);
    let A = E > QC, m = b.length + (A ? 0 : E), I = new Int32Array(m), k = new Int32Array(m), w = new Float64Array(m), B = new Float64Array(m), N = new Uint8Array(m), j = 0;
    for (let de = 0; de < b.length; de++) I[de] = $[de].rank, k[de] = U[de], w[de] = $[de].w, B[de] = $[de].h, I[de] > j && (j = I[de]);
    let F = new Int32Array(O).fill(-1), Y = new Int32Array(O).fill(-1), W = [];
    {
      let de = b.length;
      for (let Te = 0; Te < O; Te++) {
        let fe = S[Te], Ce = fe.reversed ? fe.head : fe.tail, Fe = fe.reversed ? fe.tail : fe.head;
        if (A || M[Te] < 2 || G[Te]) {
          W.push(Ce, Fe);
          continue;
        }
        let He = I[Ce], We = I[Fe], Le = -1;
        fe.labelW > 0 && (Le = He + (We - He >> 1), D === 2 && (Le & 1) === 0 && Le--), F[Te] = de;
        let et = Ce;
        for (let _e = He + 1; _e < We; _e++) {
          let Ve = de++;
          I[Ve] = _e, k[Ve] = k[Ce] + Math.round((k[Fe] - k[Ce]) * (_e - He) / (We - He)), N[Ve] = 1, _e === Le && (w[Ve] = fe.labelW, B[Ve] = fe.labelH, Y[Te] = Ve), W.push(et, Ve), et = Ve;
        }
        W.push(et, Fe);
      }
    }
    let K = new Int32Array(m + 1), H = new Int32Array(m + 1);
    for (let de = 0; de < W.length; de += 2) H[W[de] + 1]++, K[W[de + 1] + 1]++;
    for (let de = 0; de < m; de++) K[de + 1] += K[de], H[de + 1] += H[de];
    let te = new Int32Array(W.length / 2), Q = new Int32Array(W.length / 2);
    {
      let de = K.slice(0, m), Te = H.slice(0, m);
      for (let fe = 0; fe < W.length; fe += 2) Q[Te[W[fe]]++] = W[fe + 1], te[de[W[fe + 1]]++] = W[fe];
    }
    let L = [];
    for (let de = 0; de <= j; de++) L.push([]);
    for (let de = 0; de < m; de++) L[I[de]].push(de);
    let X = new Float64Array(m), le = new Float64Array(m), J = (de) => {
      de.sort((Te, fe) => k[Te] - k[fe] || le[Te] - le[fe] || Te - fe);
      for (let Te = 0; Te < de.length; Te++) X[de[Te]] = Te;
    };
    for (let de of L) {
      for (let Te = 0; Te < de.length; Te++) le[de[Te]] = Te;
      J(de);
    }
    for (let de = 0; de < ZC && j > 0; de++) {
      let Te = (de & 1) === 0;
      for (let fe = 1; fe <= j; fe++) {
        let Ce = L[Te ? fe : j - fe], Fe = Te ? K : H, He = Te ? te : Q;
        for (let We of Ce) {
          let Le = 0, et = Fe[We + 1] - Fe[We];
          for (let _e = Fe[We]; _e < Fe[We + 1]; _e++) Le += X[He[_e]];
          le[We] = et > 0 ? Le / et : X[We];
        }
        J(Ce);
      }
    }
    let V = (de, Te) => N[de] || N[Te] ? a.edgeSep : a.nodeSep, Z = (de, Te) => {
      let fe = 0;
      for (; fe < de.length; ) {
        let Ce = fe;
        for (; Ce + 1 < de.length && k[de[Ce + 1]] === k[de[fe]]; ) Ce++;
        Te(de, fe, Ce), fe = Ce + 1;
      }
    }, ae = (de, Te, fe) => {
      let Ce = w[de[Te]];
      for (let Fe = Te; Fe < fe; Fe++) Ce += V(de[Fe], de[Fe + 1]) + w[de[Fe + 1]];
      return Ce;
    }, oe = new Float64Array(h), ue = o.length > 0 ? KC : 0;
    for (let de = 0; de < o.length; de++) {
      let Te = e[o[de]];
      oe[de] = Math.max(0, Te.minW - 2 * _[de]), Te.padTop > ue && (ue = Te.padTop);
    }
    for (let de of L) Z(de, (Te, fe, Ce) => {
      let Fe = ae(de, fe, Ce);
      Fe > oe[k[de[fe]]] && (oe[k[de[fe]]] = Fe);
    });
    let he = new Float64Array(h + 1);
    for (let de = 0; de < h; de++) he[de + 1] = he[de] + oe[de] + 2 * _[de];
    let re = new Float64Array(m), P = new Float64Array(m), ne = (de, Te, fe) => {
      let Ce = k[de[Te]], Fe = (he[Ce] + _[Ce] + (he[Ce + 1] - _[Ce]) - ae(de, Te, fe)) / 2;
      for (let He = Te; He <= fe; He++) re[de[He]] = Fe + w[de[He]] / 2, He < fe && (Fe += w[de[He]] + V(de[He], de[He + 1]));
    }, ce = (de, Te, fe) => {
      let Ce = k[de[Te]], Fe = he[Ce] + _[Ce];
      for (let We = Te; We <= fe; We++) {
        let Le = de[We];
        re[Le] = Math.max(P[Le], Fe + w[Le] / 2), We < fe && (Fe = re[Le] + w[Le] / 2 + V(Le, de[We + 1]));
      }
      let He = he[Ce + 1] - _[Ce];
      for (let We = fe; We >= Te; We--) {
        let Le = de[We];
        re[Le] = Math.min(re[Le], He - w[Le] / 2), We > Te && (He = re[Le] - w[Le] / 2 - V(de[We - 1], Le));
      }
    };
    for (let de of L) Z(de, ne);
    for (let de = 0; de < 4 && j > 0; de++) {
      let Te = (de & 1) === 0;
      for (let fe = 1; fe <= j; fe++) {
        let Ce = L[Te ? fe : j - fe], Fe = Te ? K : H, He = Te ? te : Q;
        for (let We of Ce) {
          let Le = 0, et = 0;
          for (let _e = Fe[We]; _e < Fe[We + 1]; _e++) k[He[_e]] === k[We] && (Le += re[He[_e]], et++);
          P[We] = et > 0 ? Le / et : re[We];
        }
        Z(Ce, ce);
      }
    }
    let pe = new Float64Array(j + 1), Me = new Float64Array(j + 1), xe = new Float64Array(j + 1).fill(a.rankSep / D);
    if (G.some((de) => de === 1)) {
      let de = a.rankSep / D;
      xe.fill(de / eS);
      for (let Te = 0; Te < O; Te++) {
        let fe = S[Te], Ce = fe.reversed ? fe.head : fe.tail, Fe = fe.reversed ? fe.tail : fe.head;
        if (G[Te]) {
          if (fe.labelH <= 0 || M[Te] > D) continue;
          let We = Math.min(de, (fe.labelH + 2 * yd - Math.min(B[Ce], B[Fe]) / 2) / M[Te]);
          for (let Le = I[Ce]; Le < I[Fe]; Le++) We > xe[Le] && (xe[Le] = We);
          continue;
        }
        let He = F[Te];
        if (He < 0 || M[Te] <= D * fe.minlen) {
          for (let We = I[Ce]; We < I[Fe]; We++) xe[We] = de;
          continue;
        }
        for (let We = He - 1; We < He + M[Te] - 1; We++) {
          let Le = We < He ? Ce : We, et = We + 1 < He + M[Te] - 1 ? We + 1 : Fe;
          (k[Le] !== k[et] || Math.abs(re[Le] - re[et]) >= 0.5) && (xe[I[Le]] = de);
        }
      }
    }
    let ve = ue + p;
    for (let de = 0; de <= j; de++) {
      let Te = 0;
      for (let fe of L[de]) B[fe] > Te && (Te = B[fe]);
      pe[de] = ve, Me[de] = ve + Te, ve += Te + (de === j ? 0 : xe[de]);
    }
    let Ae = ve + p, Ee = he[h], me = (de) => i ? ue + Ae - de : de, we = (de, Te) => n ? me(Te) : de, Se = (de, Te) => n ? de : me(Te), se = n ? 1 : 0;
    for (let de = 0; de < b.length; de++) {
      let Te = e[b[de]], fe = (pe[I[de]] + Me[I[de]]) / 2;
      Te.x = we(re[de], fe), Te.y = Se(re[de], fe);
    }
    for (let de = 0; de < o.length; de++) {
      let Te = e[o[de]], fe = (he[de] + he[de + 1]) / 2, Ce = he[de + 1] - he[de];
      Te.x = n ? Ae / 2 : fe, Te.y = n ? fe : Ae / 2, Te.w = n ? Ae : Ce, Te.h = n ? Ce : Ae, Te.padTop = ue;
    }
    let ye = new Int32Array(l), ke = [];
    for (let de = 0; de < l; de++) {
      if (!e[de].isGroup || c[de] >= 0 || y[de] >= 0) continue;
      let Te = 0;
      for (let fe = e[de].parent; fe >= 0 && Te < ig; fe = e[fe].parent) Te++;
      ye[de] = Te, ke.push(de);
    }
    ke.sort((de, Te) => ye[Te] - ye[de] || de - Te);
    let $e = new Float64Array(l * 4);
    for (let de = 0; de < l; de++) $e[de * 4] = 1 / 0, $e[de * 4 + 1] = 1 / 0, $e[de * 4 + 2] = -1 / 0, $e[de * 4 + 3] = -1 / 0;
    let be = (de, Te) => {
      Te.x - Te.w / 2 < $e[de * 4] && ($e[de * 4] = Te.x - Te.w / 2), Te.y - Te.h / 2 < $e[de * 4 + 1] && ($e[de * 4 + 1] = Te.y - Te.h / 2), Te.x + Te.w / 2 > $e[de * 4 + 2] && ($e[de * 4 + 2] = Te.x + Te.w / 2), Te.y + Te.h / 2 > $e[de * 4 + 3] && ($e[de * 4 + 3] = Te.y + Te.h / 2);
    };
    for (let de of b) e[de].parent >= 0 && c[e[de].parent] < 0 && be(e[de].parent, e[de]);
    for (let de of ke) {
      let Te = e[de];
      if ($e[de * 4] === 1 / 0) continue;
      let fe = Math.max($e[de * 4 + 2] - $e[de * 4] + 2 * Te.padX, Te.minW);
      Te.x = ($e[de * 4] + $e[de * 4 + 2]) / 2, Te.w = fe, Te.y = ($e[de * 4 + 1] - Te.padTop + $e[de * 4 + 3] + Te.padBottom) / 2, Te.h = $e[de * 4 + 3] - $e[de * 4 + 1] + Te.padTop + Te.padBottom, Te.parent >= 0 && c[Te.parent] < 0 && be(Te.parent, Te);
    }
    for (let de of t) de.route = [];
    for (let de = 0; de < O; de++) {
      let Te = S[de], fe = t[R[de]], Ce = Te.reversed ? Te.head : Te.tail, Fe = Te.reversed ? Te.tail : Te.head, He = [re[Ce], Me[I[Ce]] - (Me[I[Ce]] - pe[I[Ce]] - B[Ce]) / 2], We = F[de];
      if (We >= 0) for (let _e = We; _e < We + M[de] - 1; _e++) He.push(re[_e], pe[I[_e]]), Me[I[_e]] > pe[I[_e]] && He.push(re[_e], Me[I[_e]]);
      He.push(re[Fe], pe[I[Fe]] + (Me[I[Fe]] - pe[I[Fe]] - B[Fe]) / 2);
      let Le = [];
      for (let _e = 0; _e < He.length; _e += 2) Le.push(we(He[_e], He[_e + 1]), Se(He[_e], He[_e + 1]), se);
      if (Te.reversed) for (let _e = 0, Ve = Le.length - 3; _e < Ve; _e += 3, Ve -= 3) for (let Ze = 0; Ze < 2; Ze++) {
        let tt = Le[_e + Ze];
        Le[_e + Ze] = Le[Ve + Ze], Le[Ve + Ze] = tt;
      }
      fe.route = Le;
      let et = Y[de];
      if (et >= 0) {
        let _e = (pe[I[et]] + Me[I[et]]) / 2;
        fe.labelX = we(re[et], _e), fe.labelY = Se(re[et], _e);
      } else fe.labelX = (Le[0] + Le[Le.length - 3]) / 2, fe.labelY = (Le[1] + Le[Le.length - 2]) / 2;
    }
    for (let de of t) {
      if (de.route.length > 0 || de.src === de.dst) continue;
      let Te = e[de.src], fe = e[de.dst], [Ce, Fe] = cg(Te, fe), [He, We] = cg(fe, Te), Le = Math.abs(He - Ce) > Math.abs(We - Fe) ? 1 : 0;
      de.route = [Ce, Fe, Le, He, We, Le], de.labelX = (Ce + He) / 2, de.labelY = (Fe + We) / 2;
    }
    let Ie = new Uint8Array(O), ze = t.reduce((de, Te) => de + Te.route.length / 3, 0), Oe = O * (b.length + t.length + ze);
    if (Oe <= md) {
      let de = (Le) => (pe[I[Le]] + Me[I[Le]]) / 2, Te = t.map((Le) => [n ? Le.labelY : Le.labelX, me(n ? Le.labelX : Le.labelY)]), fe = (Le, et, _e, Ve, Ze, tt, ct, ge) => _e > Ze - ct / 2 && Le < Ze + ct / 2 && Ve > tt - ge / 2 && et < tt + ge / 2, Ce = (Le, et, _e, Ve, Ze, tt, ct) => {
        for (let ge = 0; ge < b.length; ge++) if (ge !== Ze && ge !== tt && fe(Le, et, _e, Ve, re[ge], de(ge), w[ge] + 8, B[ge] + 8)) return !1;
        for (let ge = 0; ge < t.length; ge++) {
          let De = t[ge];
          if (ge !== ct && De.labelW > 0 && De.src !== De.dst && fe(Le, et, _e, Ve, Te[ge][0], Te[ge][1], n ? De.labelH : De.labelW, n ? De.labelW : De.labelH)) return !1;
        }
        return !0;
      }, Fe = (Le, et, _e, Ve, Ze) => {
        let tt = 0;
        for (let ct = 0; ct < t.length; ct++) {
          if (ct === Ze) continue;
          let ge = t[ct].route;
          for (let De = 3; De < ge.length; De += 3) if (Math.max(ge[De - 3], ge[De]) > Le && Math.min(ge[De - 3], ge[De]) < _e && Math.max(ge[De - 2], ge[De + 1]) > et && Math.min(ge[De - 2], ge[De + 1]) < Ve) {
            tt++;
            break;
          }
        }
        return tt;
      }, He = (Le, et, _e) => {
        let Ve = 0;
        for (let Ze = 0; Ze < t.length; Ze++) {
          let tt = t[Ze].route;
          if (Ze === _e || tt.length === 0) continue;
          let ct = tt.length - 3;
          (Math.abs(tt[0] - Le) < 1 && Math.abs(tt[1] - et) < 1 || Math.abs(tt[ct] - Le) < 1 && Math.abs(tt[ct + 1] - et) < 1) && Ve++;
        }
        return Ve;
      }, We = (Le, et, _e, Ve, Ze) => {
        let tt = Math.abs(_e - Le) < 0.5, ct = tt ? Math.min(et, Ve) : Math.min(Le, _e), ge = tt ? Math.max(et, Ve) : Math.max(Le, _e), De = tt ? Le : et;
        for (let Re = 0; Re < t.length; Re++) {
          let Ue = t[Re];
          if (Re === Ze || Ue.src === t[Ze].src || Ue.dst === t[Ze].dst) continue;
          let Ge = Ue.route;
          for (let qe = 3; qe < Ge.length; qe += 3) {
            let Je = Ge[qe - 3 + (tt ? 0 : 1)], Ne = Ge[qe + (tt ? 0 : 1)];
            if (Math.abs(Je - De) >= sg || Math.abs(Ne - De) >= sg) continue;
            let Qe = Ge[qe - 3 + (tt ? 1 : 0)], rt = Ge[qe + (tt ? 1 : 0)];
            if (Math.min(ge, Math.max(Qe, rt)) - Math.max(ct, Math.min(Qe, rt)) > 1) return !0;
          }
        }
        return !1;
      };
      for (let Le = 0; Le < O; Le++) {
        let et = S[Le], _e = R[Le], Ve = t[_e], Ze = et.tail, tt = et.head;
        if (k[Ze] === k[tt] || Math.abs(re[tt] - re[Ze]) < 1) continue;
        let ct = re[Ze], ge = re[tt], De = de(Ze), Re = de(tt), Ue = Math.sign(ge - ct), Ge = Math.sign(Re - De), qe = (Ne, Qe) => {
          for (let Xe = 2; Xe < Ne.length; Xe += 2) if (!Ce(Math.min(Ne[Xe - 2], Ne[Xe]) - Qe, Math.min(Ne[Xe - 1], Ne[Xe + 1]) - Qe, Math.max(Ne[Xe - 2], Ne[Xe]) + Qe, Math.max(Ne[Xe - 1], Ne[Xe + 1]) + Qe, Ze, tt, _e) || We(we(Ne[Xe - 2], Ne[Xe - 1]), Se(Ne[Xe - 2], Ne[Xe - 1]), we(Ne[Xe], Ne[Xe + 1]), Se(Ne[Xe], Ne[Xe + 1]), _e)) return !1;
          let rt = 0, st = 0, ft = -1;
          if (Ve.labelW > 0) {
            let Xe = et.labelW, dt = et.labelH;
            for (let ht = 2; ht < Ne.length; ht += 2) {
              let pt = (Ne[ht - 2] + Ne[ht]) / 2, kt = (Ne[ht - 1] + Ne[ht + 1]) / 2, Ut = Math.abs(Ne[ht] - Ne[ht - 2]), Jt = Math.abs(Ne[ht + 1] - Ne[ht - 1]), Gr = Ut + Jt;
              if (Gr <= ft || (Ut > 0 ? Ut < Xe + 8 : Jt < dt + 8) || pt - Xe / 2 < 0 || pt + Xe / 2 > Ee || kt - dt / 2 < 0 || kt + dt / 2 > Ae || !Ce(pt - Xe / 2, kt - dt / 2, pt + Xe / 2, kt + dt / 2, -1, -1, _e)) continue;
              let Yt = we(pt, kt), Lt = Se(pt, kt);
              Fe(Yt - Ve.labelW / 2, Lt - Ve.labelH / 2, Yt + Ve.labelW / 2, Lt + Ve.labelH / 2, _e) > 0 || (rt = pt, st = kt, ft = Gr);
            }
            if (ft < 0) return !1;
          }
          let ot = [Ne[0], Ne[1]];
          for (let Xe = 2; Xe < Ne.length; Xe += 2) {
            let dt = Ne[Xe] - Ne[Xe - 2], ht = Ne[Xe + 1] - Ne[Xe - 1], pt = Math.abs(dt) + Math.abs(ht), kt = Xe > 2 ? yd : 0, Ut = Xe + 2 < Ne.length ? yd : 0;
            pt > kt + Ut + 1 && (kt && ot.push(Ne[Xe - 2] + dt / pt * kt, Ne[Xe - 1] + ht / pt * kt), Ut && ot.push(Ne[Xe] - dt / pt * Ut, Ne[Xe + 1] - ht / pt * Ut)), ot.push(Ne[Xe], Ne[Xe + 1]);
          }
          Ve.route = [];
          for (let Xe = 0; Xe < ot.length; Xe += 2) {
            let dt = Xe === 0 ? ot[0] !== ot[2] : ot[Xe] !== ot[Xe - 2];
            Ve.route.push(we(ot[Xe], ot[Xe + 1]), Se(ot[Xe], ot[Xe + 1]), dt ? 1 - se : se);
          }
          return Ve.labelW > 0 && (Ve.labelX = we(rt, st), Ve.labelY = Se(rt, st), Te[_e] = [rt, st]), Ie[Le] = 1, !0;
        };
        if (qe([ct + Ue * w[Ze] / 2, De, ge, De, ge, Re - Ge * B[tt] / 2], 2) || qe([ct, De + Ge * B[Ze] / 2, ct, Re, ge - Ue * w[tt] / 2, Re], 2) || Oe > md / ng) continue;
        let Je = [];
        for (let Ne of k[Ze] < k[tt] ? [k[tt], k[Ze]] : [k[Ze], k[tt]]) {
          let Qe = Math.max(_[Ne] - hg, Math.min(_[Ne] / 2, og - hg));
          for (let rt of [he[Ne] + Qe, he[Ne + 1] - Qe]) {
            if (Math.abs(rt - ct) < w[Ze] / 2 + 4 || Math.abs(rt - ge) < w[tt] / 2 + 4) continue;
            let st = [ct + Math.sign(rt - ct) * w[Ze] / 2, De, rt, De, rt, Re, ge + Math.sign(rt - ge) * w[tt] / 2, Re], ft = (He(we(st[0], st[1]), Se(st[0], st[1]), _e) + He(we(st[6], st[7]), Se(st[6], st[7]), _e)) * 1e6;
            for (let ot = 2; ot < st.length; ot += 2) {
              let Xe = we(st[ot - 2], st[ot - 1]), dt = Se(st[ot - 2], st[ot - 1]), ht = we(st[ot], st[ot + 1]), pt = Se(st[ot], st[ot + 1]);
              ft += Fe(Math.min(Xe, ht), Math.min(dt, pt), Math.max(Xe, ht), Math.max(dt, pt), _e) * 1e6 + Math.abs(ht - Xe) + Math.abs(pt - dt);
            }
            Je.push({ pts: st, cost: ft, lane: Ne });
          }
        }
        Je.sort((Ne, Qe) => Ne.cost - Qe.cost);
        for (let Ne of Je) if (qe(Ne.pts, 1)) {
          T[Ne.lane] = 1;
          break;
        }
      }
    }
    return { width: n ? Ae : Ee, height: n ? Ee : Ae, routed: Ie, margins: T, work: Oe };
  }, C = new Uint8Array(O), ee = new Uint8Array(h), ie = q(C, ee);
  for (let G = 0; G < JC && ie.work <= md / ng; G++) {
    let z = G === 0 ? ie.routed : C.map((_, T) => _ & ie.routed[T]);
    if (z.every((_, T) => _ === C[T]) && ie.margins.every((_, T) => _ === ee[T])) break;
    C = z, ee = ie.margins, ie = q(C, ee);
  }
  return C.some((G, z) => G && !ie.routed[z]) && (ie = q(new Uint8Array(O), new Uint8Array(h))), { width: ie.width, height: ie.height };
}
function cg(e, t) {
  let r = t.x - e.x, a = t.y - e.y, s = Math.max(e.w / 2, 0.5), l = Math.max(e.h / 2, 0.5);
  if (Math.abs(r) < s && Math.abs(a) < l) {
    let i = s - Math.abs(r), o = l - Math.abs(a);
    return i < o ? [e.x + (r < 0 ? -s : s), t.y] : [t.x, e.y + (a < 0 ? -l : l)];
  }
  let n = Math.min(r !== 0 ? s / Math.abs(r) : 1 / 0, a !== 0 ? l / Math.abs(a) : 1 / 0);
  return [e.x + r * n, e.y + a * n];
}
var dg = "__swimlane_default__";
function rS(e) {
  let t = !1;
  for (let r of e.nodes) r.isGroup ? r.dir = void 0 : r.parentId === void 0 && (t = !0);
  if (t) {
    for (let r of e.nodes) !r.isGroup && r.parentId === void 0 && (r.parentId = dg);
    e.nodes.push({ id: dg, label: void 0, labelType: "text", shape: "rect", isGroup: !0, parentId: void 0, cssStyles: [], cssCompiledStyles: [], cssClasses: "", dir: void 0 });
  }
}
function aS(e, t, r, a, s, l, n) {
  let i = e.x - e.w / 2, o = e.y - e.h / 2, h = l === "LR" || l === "RL", c = h ? i + e.padTop / 2 : e.x, u = h ? e.y : o + e.padTop / 2, d = Pe(t, c, u, ` class="pele-cluster-label"${Xt(r, "var(--_m)")}${r.text}`, n);
  return `<g class="pele-cluster pele-lane${a}" data-id="${s}"><rect x="${f(i)}" y="${f(o)}" width="${f(e.w)}" height="${f(e.h)}" fill="none" stroke="var(--_b)"/><rect x="${f(i)}" y="${f(o)}" width="${f(h ? e.padTop : e.w)}" height="${f(h ? e.h : e.padTop)}" fill="var(--_a)" stroke="var(--_b)"${r.shape}/>` + (h && d ? `<g transform="rotate(-90 ${f(c)} ${f(u)})">${d}</g>` : d) + "</g>";
}
function lS(e, t) {
  let r = e.x - e.w / 2, a = e.y - e.h / 2;
  return t === "LR" || t === "RL" ? [r, a, r + e.padTop, a + e.h] : [r, a, r + e.w, a + e.padTop];
}
var iS = { type: "swimlane", prepare: rS, layout: (e, t, r, a, s) => tS(e, t, r, a, s ? 12 : void 0), drawGroup: aS, filledBox: lS }, sS = { type: "swimlane", math: !0, parse: $m.parse, render: (e, t, r) => wm(e, t, r, iS) }, nS = class {
  type = "timeline";
  title;
  accTitle;
  accDescr;
  direction = "LR";
  sections = [];
  periods = [];
  currentSection = "";
  getCommonDb() {
    return this;
  }
  setDiagramTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
  setDirection(e) {
    this.direction = e;
  }
  addSection(e) {
    this.currentSection = e, this.sections.push(e);
  }
  addTask(e, t, r) {
    this.periods.push({ text: e, events: r ? [r] : [], section: this.currentSection, sectionIndex: this.sections.length - 1 });
  }
  addEvent(e) {
    let t = this.periods[this.periods.length - 1];
    if (!t) throw new at("An event needs a time period before it.", "semantic", { type: "timeline" });
    t.events.push(e);
  }
}, oS = ["$end", "EOF", "INVALID", "NEWLINE", "timeline", "timeline_lr", "timeline_td", "title", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "section", "period", "event"];
function hS(e) {
  let t = e.length, r = [], a = [], s = [], l = { types: r, texts: a, starts: s }, n = 0, i = (o, h) => {
    r.push(o), a.push(e.slice(n, h)), s.push(n), n = h;
  };
  for (; n = Im(e, n), !(n >= t); ) {
    let o = e.charCodeAt(n), h = n + 1;
    if (o === 10) {
      for (; e.charCodeAt(h) === 10; ) h++;
      i(3, h);
      continue;
    }
    if (Zr(e, n, "timeline")) {
      for (h = n + 8; e.charCodeAt(h) === 32 || e.charCodeAt(h) === 9; ) h++;
      let c = Zr(e, h, "lr");
      if (h > n + 8 && (c || Zr(e, h, "td")) && !nt(e.charCodeAt(h + 2))) {
        i(c ? 5 : 6, h + 2);
        continue;
      }
      if (!nt(e.charCodeAt(n + 8))) {
        i(4, n + 8);
        continue;
      }
    }
    if (Zr(e, n, "title")) {
      for (h = n + 5; e.charCodeAt(h) !== 10 && Ke(e.charCodeAt(h)); ) h++;
      if (h === t || e.charCodeAt(h) === 10) {
        n = h;
        continue;
      }
      let c = e.charCodeAt(n + 5);
      if (c !== 13 && Ke(c)) {
        i(7, Go(e, n + 6));
        continue;
      }
    }
    if (h = Nm(e, n, l, 8), h !== n) {
      n = h;
      continue;
    }
    if (Zr(e, n, "section") && Ke(e.charCodeAt(n + 7))) {
      for (h = n + 8; h < t && e.charCodeAt(h) !== 58 && e.charCodeAt(h) !== 10; ) h++;
      if (h > n + 8) {
        i(13, h);
        continue;
      }
    }
    if (o !== 58) {
      h = n + 1;
      for (let c = e.charCodeAt(h); h < t && c !== 35 && c !== 58 && c !== 10; c = e.charCodeAt(++h)) ;
      i(14, h);
      continue;
    }
    if (Ke(e.charCodeAt(n + 1))) {
      for (h = n + 2; h < t; h++) {
        let c = e.charCodeAt(h);
        if (c === 10 || c === 58 && Ke(e.charCodeAt(h + 1))) break;
      }
      if (h > n + 2) {
        i(15, h);
        continue;
      }
    }
    i(2, n + 1);
  }
  return (s.length === 0 || s[s.length - 1] < t) && i(1, t), i(0, t), l;
}
var cS = "'EOF', 'SPACE', 'NEWLINE', 'title', 'acc_title', 'acc_descr', 'acc_descr_multiline_value', 'section', 'period', 'event'";
function dS(e, t) {
  let { types: r, texts: a, starts: s } = hS(e), l = (i, o) => {
    let h = r[i] === 0 ? "1" : oS[r[i]];
    throw bt("timeline", e, s[i], `Expecting ${o}, got '${h}'`);
  }, n = r[0];
  n !== 4 && n !== 5 && n !== 6 && l(0, "'timeline', 'timeline_lr', 'timeline_td'"), n !== 4 && t.setDirection(n === 5 ? "LR" : "TD");
  for (let i = 1; ; i++) {
    let o = a[i];
    switch (r[i]) {
      case 3:
        break;
      case 7:
        t.getCommonDb().setDiagramTitle(o.substring(6));
        break;
      case 8:
        t.getCommonDb().setAccTitle(a[++i].trim());
        break;
      case 10:
        t.getCommonDb().setAccDescription(a[++i].trim());
        break;
      case 12:
        t.getCommonDb().setAccDescription(o.trim());
        break;
      case 13:
        t.addSection(o.substring(8));
        break;
      case 14:
        t.addTask(o, 0, "");
        break;
      case 15:
        t.addEvent(o.substring(2));
        break;
      case 1:
        return;
      default:
        l(i, cS);
    }
  }
}
var Pn = 12, fg = 8, fS = 152, uS = 216, pS = 264, ja = 20, Dl = 20, Wn = 14, Gi = 8, xd = 8, Bn = 12, gS = ' fill="var(--_bg)"', ug = ' fill="none" stroke="var(--_b)"';
function wd(e, t, r, a, s) {
  return `<rect x="${f(e)}" y="${f(t)}" width="${f(r)}" height="${f(a)}"${Et(s)}/>`;
}
function mS(e, t, r) {
  return e.direction === "TD" ? pg(e, t, r, !0) : ur(r, (a) => pg(e, t, r, a));
}
function pg(e, t, r, a) {
  let s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8, o = t.timeline?.disableMulticolor !== !0, h = e.periods, c = e.sections.length > 0, u = e.sections.map((J, V) => ({ section: V, periods: [] })), d = { section: -1, periods: [] };
  h.forEach((J, V) => (u[J.sectionIndex] ?? d).periods.push(V)), d.periods.length > 0 && u.unshift(d);
  let p = a && r.maxWidth !== void 0 && r.maxWidth > 0 ? r.maxWidth - 2 * i : 1 / 0, g = Dl + Wn * 2 + 4 * Pn, y = Math.min(fS, Math.max(80, Math.round((p - g) * 0.38))), b = Math.min(pS, Math.max(110, p - g - y)), x = y, v = () => a ? b : x, $ = h.map((J) => _a(J.text, n, s, x)), S = h.map((J) => J.events.map((V) => _a(V, n, l, v()))), R = 0;
  for (let J of $) R = Math.max(R, J.width);
  if (!a) for (let J of S) for (let V of J) R = Math.max(R, V.width);
  let D = R > x;
  if (a) for (let J of S) for (let V of J) D ||= V.width > b;
  D && (x = Math.min(Math.max(Math.ceil(R), y), p === 1 / 0 ? uS : y), $ = h.map((J) => vr(J.text, n, s, x)), S = h.map((J) => J.events.map((V) => vr(V, n, l, v()))));
  let O = Math.round(s * 1.5), U = x + 2 * Pn, q = v() + 2 * Pn, C = (J) => Math.max(J.height, O) + 2 * fg, ee = (J) => Math.max(J.height, Math.round(l * 1.5)) + 2 * fg, ie = (J, V) => J.section >= 0 ? J.section : c ? void 0 : o ? V : 0, G = (J, V) => {
    let Z = ie(J, V);
    return Z === void 0 ? "var(--_m)" : vt(Z);
  }, z = (J) => (J === void 0 ? "" : eh(J)) || gS, _ = !1;
  for (let J of S) J.length > 0 && (_ = !0);
  let T = 0;
  for (let J of u) T += Math.max(J.periods.length, 1);
  let E = U + ja, M = h.length > 0, A = a ? U + (_ ? Dl + Wn * 2 + q : M ? Dl + Bn : 0) : T > 0 ? T * E - ja + (M ? Bn + Nt : 0) : 0, m = vr(e.title, n, s, Math.max(A, 320), 1), I = m.height > 0 ? m.height + 16 : 0, k = Math.max(A, m.width), w = i + (k - A) / 2, B = i + I, N = (J, V) => vr(e.sections[J.section], n, s, V - 2 * Pn, 1), j = (J, V, Z, ae, oe, ue) => wd(Z, ae, oe, ue, ` fill="${vt(J.section)}"`) + Pe(V, Z + oe / 2, ae + ue / 2, ' font-weight="var(--_hw)"' + z(J.section)), F = (J, V, Z, ae, oe, ue) => wd(ae, oe, U, ue, ` fill="${Z}"`) + Pe($[J], ae + U / 2, oe + ue / 2, z(ie(V, J))), Y = (J, V, Z, ae, oe) => '<g class="pele-node pele-event">' + wd(Z, ae, q, oe, ` fill="${V}" fill-opacity="0.16"`) + Pe(J, Z + q / 2, ae + oe / 2, ` font-size="${l}"`) + "</g>", W = (J, V, Z) => `<circle class="pele-dot" cx="${f(J)}" cy="${f(V)}" r="4" fill="${Z}" stroke="var(--_bg)" stroke-width="2"/>`, K = (J) => J.section >= 0 ? `<g class="pele-cluster pele-section" data-id="${Ye(e.sections[J.section].trim())}">` : "", H = (J) => `<g class="pele-node pele-period" data-id="${Ye(h[J].text.trim())}">`, te = "", Q;
  if (a) {
    let J = w + U + Dl, V = J + Wn, Z = V + Wn, ae = B;
    for (let oe of u) {
      if (te += K(oe), oe.section >= 0) {
        let ue = N(oe, A), he = C(ue);
        te += j(oe, ue, w, ae, A, he), ae += he + xd + 4;
      }
      for (let ue of oe.periods) {
        let he = G(oe, ue), re = C($[ue]), P = S[ue].length > 0 ? ee(S[ue][0]) : re, ne = ae + Math.max(re, P) / 2, ce = `M${f(w + U)},${f(ne)}H${f(J)}`, pe = "", Me = ne - P / 2, xe = ne;
        for (let ve of S[ue]) {
          let Ae = ee(ve);
          xe = Me + Ae / 2, ce += `M${f(V)},${f(xe)}H${f(Z)}`, pe += Y(ve, he, Z, Me, Ae), Me += Ae + Gi;
        }
        pe && (ce += `M${f(J)},${f(ne)}H${f(V)}V${f(xe)}`), te += H(ue) + F(ue, oe, he, w, ne - re / 2, re) + `<path class="pele-edge" d="${ce}"${ug}/>` + W(J, ne, he) + pe + "</g>", ae = Math.max(ne + re / 2, Me - Gi) + ja;
      }
      oe.periods.length === 0 && (ae += ja - xd - 4), oe.section >= 0 && (te += "</g>");
    }
    if (u.length > 0 && (ae -= ja), M) {
      let oe = ae + Bn + Nt;
      te = `<path class="pele-axis" d="M${f(J)},${f(B)}V${f(oe - Nt + 1)}" fill="none" stroke="var(--_l)"/>` + St("arrow_point", J, oe, 0, 1, "var(--_l)") + te, ae = oe;
    }
    Q = ae + i;
  } else {
    let J = 0, V = u.map((P) => {
      if (P.section < 0) return;
      let ne = N(P, Math.max(P.periods.length, 1) * E - ja);
      return J = Math.max(J, C(ne)), ne;
    }), Z = 0;
    for (let P of $) Z = Math.max(Z, C(P));
    let ae = B + (c ? J + xd : 0), oe = ae + Z + (Z > 0 ? Dl : 0), ue = oe + Dl, he = M ? oe + Bn : B + J, re = 0;
    if (u.forEach((P, ne) => {
      let ce = Math.max(P.periods.length, 1), pe = w + re * E;
      te += K(P);
      let Me = V[ne];
      Me && (te += j(P, Me, pe, B, ce * E - ja, J)), P.periods.forEach((xe, ve) => {
        let Ae = G(P, xe), Ee = pe + ve * E, me = Ee + U / 2, we = `M${f(me)},${f(ae + Z)}V${f(S[xe].length > 0 ? ue : oe)}`, Se = "", se = ue;
        for (let ye of S[xe]) {
          let ke = ee(ye);
          se > ue && (we += `M${f(me)},${f(se - Gi)}V${f(se)}`), Se += Y(ye, Ae, Ee, se, ke), se += ke + Gi;
        }
        he = Math.max(he, se - Gi), te += H(xe) + F(xe, P, Ae, Ee, ae, Z) + `<path class="pele-edge" d="${we}"${ug}/>` + W(me, oe, Ae) + Se + "</g>";
      }), P.section >= 0 && (te += "</g>"), re += ce;
    }), M) {
      let P = w + A;
      te = `<path class="pele-axis" d="M${f(w)},${f(oe)}H${f(P - Nt + 1)}" fill="none" stroke="var(--_l)"/>` + St("arrow_point", P, oe, 1, 0, "var(--_l)") + te;
    }
    Q = he + i;
  }
  let L = Math.ceil(k + 2 * i), X = Math.ceil(Math.max(Q, i * 2)), le = Pe(m, L / 2, i + m.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + te;
  return { svg: xt("timeline", L, X, s, r, e, le), width: L, height: X, links: [] };
}
var yS = { type: "timeline", parse(e, t, r) {
  let a = new nS();
  return a.title = r, dS(e, a), a;
}, render: mS }, Sf = /[─━│┃└┗├┣]/, ey = /[└┗├┣]/, xS = /[─━]/, gg = /^[\s│┃]+$/, wS = /^[\s─━│┃└┗├┣]+$/, $S = /^\s*(title[\t ]|accTitle[\t ]*:|accDescr[\t ]*[:{])/, bS = /^\s*%%/, MS = "    ";
function vS(e) {
  return e.some((t) => Sf.test(t));
}
function kS(e) {
  for (let t of e) {
    let r = ey.exec(t);
    if (r?.index && r.index > 0) return r.index;
  }
  return 4;
}
function AS(e, t) {
  return e.replace(/\bline\s+(\d+)\b/gi, (r, a) => {
    let s = t.get(parseInt(a, 10));
    return s ? `line ${s}` : r;
  });
}
function ty(e, t) {
  let r = 0;
  for (let a = 1; a < t; a++) r = e.indexOf(`
`, r) + 1;
  return r;
}
function mg(e, t, r) {
  let { line: a } = ii(e, ty(e, t + 1));
  throw new at(`Line ${a}: ${r}`, "syntax", { type: "treeView", line: a });
}
function ES(e, t) {
  let r = 0;
  for (let a = 0; r < e.length && a < t; r++) a += e[r] === "	" ? 4 : 1;
  return r;
}
function TS(e) {
  let t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  if (!Sf.test(e)) return { text: e, lineMap: t, columns: r };
  let a = e.split(`
`), s = -1;
  for (let c = 0; c < a.length; c++) if (a[c].trim() === "treeView-beta") {
    s = c;
    break;
  }
  if (s === -1) return { text: e, lineMap: t, columns: r };
  let l = (c) => c.trim() === "" || bS.test(c) || $S.test(c), n = [];
  for (let c = s + 1; c < a.length; c++) {
    let u = a[c];
    l(u) || gg.test(u) || n.push(u.replace(/\t/g, "    "));
  }
  if (!vS(n)) return { text: e, lineMap: t, columns: r };
  let i = kS(n), o = [], h = (c, u, d) => {
    o.push(c), t.set(o.length, u + 1), d && r.set(o.length, d);
  };
  for (let c = 0; c <= s; c++) h(a[c], c);
  for (let c = s + 1; c < a.length; c++) {
    let u = a[c];
    if (l(u)) {
      h(u, c);
      continue;
    }
    if (gg.test(u)) continue;
    let d = u.replace(/\t/g, "    "), p = ey.exec(d);
    if (p) {
      let g = Math.round(p.index / i) + 1, y = p.index + 1;
      for (; y < d.length && xS.test(d[y]); ) y++;
      for (; y < d.length && d[y] === " "; ) y++;
      let b = d.slice(y).trimEnd();
      b || mg(e, c, "Empty node — expected a filename or directory name after the box-drawing prefix");
      let x = MS.repeat(g);
      h(x + b, c, (v) => ES(u, y + Math.max(v - x.length, 0)));
    } else {
      if (wS.test(d)) continue;
      Sf.test(d) ? h(u, c) : /^\s+/.test(d) ? mg(e, c, "Unexpected indentation without box-drawing characters. In box-drawing format, use ├── or └── prefixes for indented nodes.") : h(u, c);
    }
  }
  return { text: o.join(`
`), lineMap: t, columns: r };
}
function CS(e, t) {
  if (e.startsWith("##", t) || e.startsWith("icon(", t)) return !0;
  if (!e.startsWith(":::", t)) return !1;
  let r = t + 3;
  for (; Xr(e.charCodeAt(r)); ) r++;
  let a = e.charCodeAt(r);
  return a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 95;
}
function SS(e, t) {
  let r = e.charCodeAt(t);
  if (Xr(r) || r === 10 || r === 13 || r === 34 || r === 39 || e.startsWith(":::", t) || e.startsWith("icon(", t) || e.startsWith("##", t)) return -1;
  let a = e.length, s = t + 1;
  for (; s < a; ) {
    let l = e.charCodeAt(s);
    if (l === 10 || l === 13) break;
    if (Xr(l)) {
      let n = s + 1;
      for (; Xr(e.charCodeAt(n)); ) n++;
      if (CS(e, n)) break;
      s = n;
    } else s++;
  }
  return s;
}
var yg = { name: "BARE_NAME", pattern: /(?!:::|icon\(|##)[^ \t\n\r"'](?:(?![ \t]+:::[ \t]*[A-Za-z_]|[ \t]+icon\(|[ \t]+##)[^\n\r])*/y, match: SS }, xg = [{ ...Pr("treeView-beta"), longer: [yg] }, eu(), Br, fi(String.raw`(?!%%)[^\n\r]`), { name: "CLASS_ANNOTATION", pattern: /[ \t]+:::[ \t]*[A-Za-z_][\w-]*/y }, { name: "ICON_ANNOTATION", pattern: /[ \t]+icon\([\w-]*(?::[\w-]+)?\)/y }, { name: "DESC_ANNOTATION", pattern: /[ \t]+##[^\n\r]*/y }, { name: "INDENTATION", pattern: /[ \t]{1,}/y }, { name: "QUOTED_NAME", pattern: /"[^"]*"|'[^']*'/y }, { name: "WS", pattern: /[ \t]+/y, hidden: !0 }, { name: "ML_COMMENT", pattern: /\%\%[^\n]*/y, hidden: !0 }, { name: "NL", pattern: /\r?\n/y, hidden: !0 }, yg];
function ry(e) {
  let t = e.length;
  for (; t > 0 && Xr(e.charCodeAt(t - 1)); ) t--;
  return t === e.length ? e : e.slice(0, t);
}
function $d(e, t) {
  switch (e) {
    case "INDENTATION":
      return t?.length || 0;
    case "QUOTED_NAME":
      return t.substring(1, t.length - 1);
    case "BARE_NAME":
      return ry(t);
    case "CLASS_ANNOTATION":
      return t.trim().substring(3).trim();
    case "ICON_ANNOTATION": {
      let r = t.trim();
      return r.substring(5, r.length - 1);
    }
    case "DESC_ANNOTATION":
      return t.trim().substring(2).trim();
    default:
      return;
  }
}
function _S(e) {
  let t = new Sr(Ar(e, xg, "treeView"), xg, "treeView"), r = { $type: "TreeView", nodes: [] };
  for (t.expect(0); ; ) if (t.kind === 1) r.accDescr = Cr(t.take());
  else if (t.kind === 2) r.accTitle = Tr(t.take());
  else if (t.kind === 3) r.title = Er(t.take());
  else break;
  for (; t.kind !== -1; ) {
    let a = { $type: "TreeNode", name: "" };
    if (t.kind === 7 && (a.indent = t.take().length), t.kind === 8) {
      let s = t.take();
      a.name = s.substring(1, s.length - 1);
    } else t.kind === 12 ? a.name = ry(t.take()) : t.fail("a name");
    for (; ; ) if (t.kind === 4) a.classAnnotation = $d("CLASS_ANNOTATION", t.take());
    else if (t.kind === 5) a.iconAnnotation = $d("ICON_ANNOTATION", t.take());
    else if (t.kind === 6) a.descAnnotation = $d("DESC_ANNOTATION", t.take());
    else break;
    r.nodes.push(a);
  }
  return r;
}
var IS = class {
  count = 1;
  root = { id: 0, level: -1, name: "/", nodeType: "directory", children: [] };
  stack = [this.root];
  addNode(e, t, r, a, s, l) {
    let n = this.stack;
    for (; e <= n[n.length - 1].level; ) n.pop();
    let i = { id: this.count++, level: e, name: t, nodeType: r, icon: s, cssClass: a, description: l, children: [] };
    n[n.length - 1].children.push(i), n.push(i);
  }
};
function NS(e, t) {
  for (let r of e.nodes) {
    let a = typeof r.indent == "number" ? r.indent : 0, s = r.name, l = s.endsWith("/");
    l && (s = s.slice(0, -1));
    let n = r.iconAnnotation;
    t.addNode(a, s, l ? "directory" : "file", r.classAnnotation || void 0, n !== void 0 ? n || "none" : void 0, r.descAnnotation || void 0);
  }
}
function RS(e) {
  let { text: t, lineMap: r, columns: a } = TS(e);
  try {
    return _S(t);
  } catch (s) {
    if (!(s instanceof at) || t === e) throw s;
    let l = r.get(s.line);
    if (l === void 0) throw s;
    let n = s.column > 0 ? a.get(s.line)?.(s.column - 1) ?? s.column - 1 : 0, i = ii(e, ty(e, l) + n), o = s.message.includes(`
`) ? s.message.indexOf(`
`) : s.message.length, h = s.message.slice(o), c = AS(s.message.slice(0, o), /* @__PURE__ */ new Map([[s.line, i.line]])) + (s.snippet ? h.replace(s.snippet, () => i.snippet) : h);
    throw new at(c, s.code, { type: s.type, line: i.line, column: s.column > 0 ? i.column : 0, snippet: s.snippet ? i.snippet : "" });
  }
}
function DS(e, t) {
  let r = new IS();
  return NS(e, r), { type: "treeView", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, root: r.root, count: r.count };
}
var qo = "mermaid-treeview", _f = /* @__PURE__ */ new Map([["folder", "M3 6.5A1.5 1.5 0 0 1 4.5 5h4.6l2.4 2.5h8A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z"], ["file", "M6.5 3h7L19 8.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3zM13.5 3v5.5H19"]]);
function bd(e, t) {
  if (e === void 0 || !Object.prototype.hasOwnProperty.call(e, t)) return;
  let r = e[t];
  return typeof r == "string" ? r : void 0;
}
function LS(e, t) {
  let r = bd(t?.filenameIcons, e);
  if (r) return r;
  let a = e.lastIndexOf(".");
  if (a > 0) {
    let s = e.substring(a).toLowerCase();
    return bd(t?.extensionIcons, s) ?? bd(t?.extensionIcons, s.slice(1));
  }
}
function wg(e, t) {
  return e.includes(":") ? e : _f.has(e) || !t ? `${qo}:${e}` : `${t}:${e}`;
}
function $g(e, t) {
  if (e.icon !== "none") {
    if (e.icon) return wg(e.icon, t.defaultIconPack);
    if (t.showIcons) {
      if (e.nodeType === "file") {
        let r = LS(e.name, t);
        if (r === "none") return;
        if (r) return wg(r, t.defaultIconPack);
      }
      return `${qo}:${e.nodeType === "directory" ? "folder" : "file"}`;
    }
  }
}
function OS(e) {
  let t = (a) => typeof a == "object" && a !== null && !Array.isArray(a) ? a : void 0, r = t(e.treeView) ?? {};
  return { showIcons: !!r.showIcons, defaultIconPack: typeof r.defaultIconPack == "string" ? r.defaultIconPack : "", filenameIcons: t(r.filenameIcons), extensionIcons: t(r.extensionIcons) };
}
var FS = 6, zS = 16, PS = 7, WS = 4, Gn = 4;
function Hn(e, t, r, a, s) {
  let l = e.treeView?.[t];
  return typeof l == "number" && l >= a && l <= s ? l : r;
}
function BS(e) {
  return { paddingX: Hn(e, "paddingX", 5, 0, 100), paddingY: Hn(e, "paddingY", 2, 0, 100), rowIndent: Hn(e, "rowIndent", 15, 0, 400), lineThickness: Hn(e, "lineThickness", 1, 0.25, 12) };
}
function GS(e, t, r) {
  return Da(r, (a) => HS(e, t, r, a));
}
function HS(e, t, r, a) {
  let s = r.fontSize ?? 16, l = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), n = r.padding ?? 8, i = OS(t), o = Array.isArray(r.monospace) && r.monospace.includes("files"), h = o ? ` font-family="${hi}"` : "", { paddingX: c, paddingY: u, rowIndent: d, lineThickness: p } = BS(t), g = 0, y = e.root.children.map((w) => [w, 0]);
  for (let w = 0; a && w < y.length; w++) {
    let [B, N] = y[w];
    g = Math.max(g, N);
    for (let j of B.children) y.push([j, N + 1]);
  }
  let b = a ? Math.min(d + c, Math.max(2, ((r.maxWidth ?? 320) - 120) / Math.max(1, g))) : d + c, x = Math.round(s * 1.5) + 2 * u, v = s, $ = je(e.title, !1, l, s, a ? Qt(r) : 4e3, 1), S = $.height > 0 ? $.height + 12 : 0, R = (w) => w.some((B) => $g(B, i) !== void 0), D = [], O = /* @__PURE__ */ new Map(), U = [], q = (w, B) => {
    let N = R(w);
    for (let j = w.length - 1; j >= 0; j--) U.push([w[j], B, N]);
  };
  q(e.root.children, 0);
  let C = 0, ee = !1, ie = 0;
  for (; U.length > 0; ) {
    let [w, B, N] = U.pop(), j = B * b, F = Tt(w.name), Y = j + (N ? v + FS : 0), W = Math.max(40, (r.maxWidth ?? 320) - 2 * n - 2 * Gn - Y), K = (w.nodeType === "directory" ? 1 : 0) | (o ? 4 : 0), H = a ? No(F, l, s, W, K) : void 0, te = a && w.description ? No(Tt(w.description), l, s, W, 2) : void 0, Q = H ? H.width : l.width(F, s, K);
    Y + Q > C && (C = Y + Q);
    let L = w.cssClass !== void 0 && w.cssClass.split(/\s+/).includes("highlight");
    L && (ee = !0);
    let X = a ? Math.max(x, (H?.height ?? 0) + (te?.height ?? 0) + 2 * u) : x, le = ie + (a ? u + Math.max(v, H?.height ?? 0) / 2 : X / 2), J = { node: w, x: j, cy: le, icon: $g(w, i), text: F, labelX: Y, highlighted: L, label: H, description: te, top: ie, height: X };
    ie += X, D.push(J), O.set(w, J), q(w.children, B + 1);
  }
  let G = C + zS, z = C;
  for (let w of D) {
    let B = w.node.description;
    if (!B) continue;
    let N = w.description ? w.description.width : l.width(Tt(B), s, 2);
    z = Math.max(z, (a ? w.labelX : G) + N);
  }
  z = Math.max(z, $.width);
  let _ = n + (ee ? Gn : 0), T = n + S, E = Math.ceil(z + 2 * _), M = Math.ceil(T + ie + n), A = "";
  for (let w of D) {
    let B = w.node.children;
    if (B.length === 0) continue;
    let N = _ + w.x + PS, j = Math.max(N, _ + w.x + b - c), F = T + O.get(B[B.length - 1]).cy, Y = Math.min(WS, j - N), W = `M${f(N)},${f(T + w.top + w.height - 2)}V${f(F - Y)}`;
    Y > 0 && (W += `Q${f(N)},${f(F)} ${f(N + Y)},${f(F)}H${f(j)}`);
    for (let K = 0; K < B.length - 1 && j > N; K++) W += `M${f(N)},${f(T + O.get(B[K]).cy)}H${f(j)}`;
    A += `<path d="${W}"/>`;
  }
  let m = s * 0.35, I = "";
  for (let w of D) {
    let B = w.node, N = T + w.cy, j = B.nodeType === "directory", F = "";
    if (w.highlighted) {
      let Y = _ + w.x - Gn;
      F += `<rect class="pele-tree-highlight" x="${f(Y)}" y="${f(T + w.top + 1)}" width="${f(E - _ + Gn - Y)}" height="${f(w.height - 2)}" fill="var(--_c)" fill-opacity="0.14"${wt}/>`;
    }
    if (w.icon !== void 0) {
      let Y = w.icon.startsWith(qo + ":") ? w.icon.slice(qo.length + 1) : "", W = _f.get(Y) ?? _f.get(j ? "folder" : "file"), K = r.icons?.(w.icon) ?? `<path d="${W}" stroke="var(--_m)" stroke-width="1.5"/>`;
      F += `<svg class="pele-icon" data-icon="${Ye(w.icon)}" x="${f(_ + w.x)}" y="${f(N - v / 2)}" width="${f(v)}" height="${f(v)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${K}</svg>`;
    }
    w.label ? F += Kl(w.label, _ + w.labelX, T + w.top + u, ` class="pele-label"${j ? ' font-weight="var(--_hw)"' : ""}${h}`) : w.text !== "" && (F += `<text class="pele-label" x="${f(_ + w.labelX)}" y="${f(N + m)}"${j ? ' font-weight="var(--_hw)"' : ""}${h} xml:space="preserve">${it(w.text)}</text>`), w.description ? F += Kl(w.description, _ + w.labelX, T + w.top + u + (w.label?.height ?? 0), ' class="pele-tree-description" font-style="italic" fill="var(--_m)"') : B.description && (F += `<text class="pele-tree-description" x="${f(_ + G)}" y="${f(N + m)}" font-style="italic" fill="var(--_m)" xml:space="preserve">${it(Tt(B.description))}</text>`), I += `<g class="pele-node pele-tree-${j ? "dir" : "file"}${Ht(B.cssClass ?? "")}" data-id="${Ye(B.name)}">${F}</g>`;
  }
  let k = Pe($, E / 2, n + $.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (A ? `<g class="pele-tree-guides" fill="none" stroke="var(--_b)" stroke-width="${f(p)}">${A}</g>` : "") + I;
  return { svg: xt("treeView", E, M, s, r, e, k), width: E, height: M, links: [] };
}
var US = { type: "treeView", parse: (e, t, r) => DS(RS(e), r), render: GS };
function YS(e) {
  let t = [], r = [];
  for (let a of e) {
    let s = a.type === "Leaf", l = { name: a.name, children: s ? void 0 : [] };
    for (l.classSelector = a.classSelector, a.cssCompiledStyles && (l.cssCompiledStyles = a.cssCompiledStyles), s && a.value !== void 0 && (l.value = a.value); r.length > 0 && r[r.length - 1].level >= a.level; ) r.pop();
    r.length === 0 ? t.push(l) : r[r.length - 1].node.children.push(l), s || r.push({ node: l, level: a.level });
  }
  return t;
}
function jS(e, t) {
  let r = /* @__PURE__ */ new Map();
  for (let s of e.TreemapRows) {
    if (s.$type !== "ClassDefStatement") continue;
    let l = r.get(s.className);
    l || r.set(s.className, l = []);
    let n = (s.styleText ?? "").replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",");
    for (let i of n.split(";")) l.push(i);
  }
  let a = [];
  for (let s of e.TreemapRows) {
    if (s.$type !== "TreemapRow") continue;
    let l = s.item, n = l.classSelector ? r.get(l.classSelector) : void 0;
    a.push({ level: s.indent ?? 0, name: l.name, type: l.$type, value: l.$type === "Leaf" ? l.value : void 0, classSelector: l.classSelector, cssCompiledStyles: n && n.length > 0 ? n : void 0 });
  }
  return { type: "treemap", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, roots: YS(a), classes: r };
}
var bg = [aa, Br, fi(String.raw`\w`), { name: "TREEMAP_KEYWORD", pattern: /treemap-beta|treemap/y }, { name: "CLASS_DEF", pattern: /classDef\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\s+([^;\r\n]*))?(?:;)?/y }, { name: "STYLE_SEPARATOR", pattern: /:::/y }, { name: "SEPARATOR", pattern: /:/y }, { name: "COMMA", pattern: /,/y }, { name: "INDENTATION", pattern: /[ \t]{1,}/y }, { name: "WS", pattern: /[ \t]+/y, hidden: !0 }, { name: "ML_COMMENT", pattern: /\%\%[^\n]*/y, hidden: !0 }, { name: "NL", pattern: /\r?\n/y, hidden: !0 }, { name: "ID2", pattern: /[a-zA-Z_][a-zA-Z0-9_]*/y }, { name: "NUMBER2", pattern: /[0-9_\.\,]+/y }, { name: "STRING2", pattern: /"[^"]*"|'[^']*'/y }], qS = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/;
function VS(e) {
  let t = new Sr(Ar(e, bg, "treemap"), bg, "treemap"), r = t.kinds, a = { $type: "Treemap", TreemapRows: [] }, s = () => t.accept(5) ? t.expect(12) : void 0;
  for (t.expect(3); t.kind !== -1; ) {
    let l = t.kind;
    if (l === 0) {
      a.accDescr = Cr(t.take());
      continue;
    }
    if (l === 1) {
      a.accTitle = Tr(t.take());
      continue;
    }
    if (l === 2) {
      a.title = Er(t.take());
      continue;
    }
    l !== 8 && l !== 14 && l !== 4 && t.fail("a node, a class definition, or a title");
    let n = l === 8 ? t.take().length : void 0;
    if (t.kind === 4) {
      let d = qS.exec(t.take()), p = { $type: "ClassDefStatement", className: d[1] };
      d[2] && (p.styleText = d[2]), n !== void 0 && (p.indent = n), a.TreemapRows.push(p);
      continue;
    }
    let i = t.expect(14).slice(1, -1), o = r[t.i] === 8 ? t.i + 1 : t.i, h;
    r[o] === 6 || r[o] === 7 ? (t.i = o + 1, t.accept(8), h = { $type: "Leaf", name: i, value: parseFloat(t.expect(13).replace(/,/g, "")) }) : h = { $type: "Section", name: i };
    let c = s();
    c !== void 0 && (h.classSelector = c);
    let u = { $type: "TreemapRow", item: h };
    n !== void 0 && (u.indent = n), a.TreemapRows.push(u);
  }
  return a;
}
var Mg = /^(?:.?[<>=^])?([-+( ])?(\$)?0?\d*(,)?(?:\.(\d+))?(~)?([a-zA-Z%])?$/;
function vg(e) {
  let t = "";
  for (let r = e.length; r > 0; r -= 3) t = e.slice(Math.max(0, r - 3), r) + (t ? "," + t : "");
  return t;
}
function KS(e) {
  let t = Mg.exec(e === "$0,0" ? "$," : e) ?? Mg.exec(","), r = t[1] === "+", a = t[3] !== void 0, s = t[4] === void 0 ? void 0 : Math.min(Number(t[4]), 20), l = t[6] ?? "";
  return (n) => {
    let i = Math.abs(n), o, h = "";
    if (l === "f" ? o = i.toFixed(s ?? 6) : l === "%" ? (o = (i * 100).toFixed(s ?? 6), h = "%") : l === "d" ? o = Math.round(i).toFixed(0) : l === "e" ? o = i.toExponential(s ?? 6) : o = String(Number(i.toPrecision(Math.max(1, s ?? 12)))), t[5] && o.includes(".") && !o.includes("e") && (o = o.replace(/\.?0+$/, "")), a && !o.includes("e")) {
      let c = o.indexOf(".");
      o = c === -1 ? vg(o) : vg(o.slice(0, c)) + o.slice(c);
    }
    return (n < 0 ? "-" : r ? "+" : "") + (t[2] ?? "") + o + h;
  };
}
function kg(e, t, r) {
  let a = e.children === void 0 && Number.isFinite(e.value) && e.value > 0 ? e.value : 0;
  return { node: e, parent: t, series: r, value: a, children: [], headed: !1, header: 0, x: 0, y: 0, w: 0, h: 0 };
}
var Un = (e, t, r) => e >= t ? Math.min(e, r) : t;
function XS(e, t, r, a, s, l, n) {
  let i = t, o = 0;
  for (; o < e.length; ) {
    let h = s * l / i, c = Math.min(s, l), u = e[o].value * h, d = u, p = Math.max(c * c * d / (u * u), u * u / (c * c * d)), g = o + 1;
    for (; g < e.length; ) {
      let x = e[g].value * h, v = u + x, $ = Math.max(c * c * d / (v * v), v * v / (c * c * x));
      if ($ > p) break;
      p = $, u = v, g++;
    }
    let y = u / c, b = 0;
    for (let x = o; x < g; x++) {
      let v = e[x], $ = x === g - 1 ? c - b : v.value * h / y, S = s >= l ? r : r + b, R = s >= l ? a + b : a, D = s >= l ? y : $, O = s >= l ? $ : y, U = Math.round(S + D - n / 2) > Math.round(S + n / 2) ? n / 2 : 0, q = Math.round(R + O - n / 2) > Math.round(R + n / 2) ? n / 2 : 0;
      v.x = Math.round(S + U), v.y = Math.round(R + q), v.w = Math.round(S + D - U) - v.x, v.h = Math.round(R + O - q) - v.y, b += $, i -= v.value;
    }
    s >= l ? (r += y, s -= y) : (a += y, l -= y), o = g;
  }
}
function ZS(e, t, r, a) {
  let s = e.map((d, p) => kg(d, void 0, p)), l = s.slice();
  for (let d = 0; d < l.length; d++) {
    let p = l[d];
    for (let g of p.node.children ?? []) {
      let y = kg(g, p, p.series);
      p.children.push(y), l.push(y);
    }
  }
  for (let d = l.length - 1; d >= 0; d--) {
    let p = l[d];
    p.parent && (p.parent.value += p.value);
  }
  let { gap: n, header: i, short: o, side: h } = a, c = [], u = (d, p, g, y, b) => {
    let x = d.filter(($) => $.value > 0).sort(($, S) => S.value - $.value), v = 0;
    for (let $ of x) v += $.value;
    if (!(x.length === 0 || !Number.isFinite(v))) {
      y = Math.max(0, y), b = Math.max(0, b), y > 0 && b > 0 && XS(x, v, p - n / 2, g - n / 2, y + n, b + n, n);
      for (let $ of x) {
        let S = Un($.x, p, p + y), R = Un($.y, g, g + b);
        $.w = Un($.x + $.w, S, p + y) - S, $.h = Un($.y + $.h, R, g + b) - R, $.x = S, $.y = R, c.push($);
      }
    }
  };
  u(s, 0, 0, t, r);
  for (let d = 0; d < c.length; d++) {
    let p = c[d];
    if (p.children.length === 0) continue;
    let g = p.h - i - h >= 12 ? i : o;
    p.headed = p.w > Math.max(24, 2 * h) && p.h - g - h >= 8, p.header = p.headed ? g : 0, p.headed ? u(p.children, p.x + h, p.y + g, p.w - 2 * h, p.h - g - h) : u(p.children, p.x, p.y, p.w, p.h);
  }
  return c;
}
var Md = 28, QS = 18, vd = 6, qa = 1.25, Ag = (e) => it(Tt(e).trim()).trim();
function JS(e) {
  let t = 0, r = e.slice();
  for (; r.length > 0; ) {
    let a = r.pop();
    a.children !== void 0 ? r.push(...a.children) : Number.isFinite(a.value) && a.value > 0 && t++;
  }
  return t;
}
function Eg(e, t) {
  let r = Math.min(t.w, t.h) / 4;
  return r < 4 ? Et(e).replace("rx:var(--_r)", `rx:min(var(--_r),${f(r)}px)`) : Et(e);
}
function Yn(e, t, r, a, s) {
  let l = e.treemap?.[t];
  return typeof l == "number" && l >= a ? Math.min(l, s) : r;
}
function e_(e, t, r) {
  let a = r.fontSize ?? 16, s = Math.round(a * 0.875), l = Math.round(a * 0.75), n = Math.round(a * 0.5625), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = t.treemap ?? {}, h = r.padding ?? Yn(t, "diagramPadding", 8, 0, 2e3), c = Math.round(nh(r, Yn(t, "nodeWidth", 64, 1, 400) * 10, 200, 2 * h)), u = Math.round(Yn(t, "nodeHeight", 40, 1, 400) * 10), d = o.showValues !== !1, p = KS(typeof o.valueFormat == "string" ? o.valueFormat : ","), g = Math.min(1, Math.max(0, Math.log10(c * u / Math.max(1, JS(e.roots)) / 800))), y = ZS(e.roots, c, u, { gap: Yn(t, "padding", Math.round(2 + 2 * g), 0, 200), header: Md, short: QS, side: Math.round(3 + 3 * g) }), b = je(e.title, !1, i, a, Qt(r), 1), x = b.height > 0 ? b.height + 8 : 0, v = h + Math.max(0, (b.width - c) / 2), $ = h + x, S = "", R = "";
  for (let q of y) {
    let C = q.node, ee = Dt(C.cssCompiledStyles ?? []), ie = vt(q.series), G = v + q.x, z = $ + q.y, _ = Tt(C.name).trim(), T = d ? p(q.value) : "", E = `data-id="${Ye(C.name)}">`, M = Ag(C.name), A = M === "" ? [] : [M];
    for (let H = q.parent; H !== void 0 && !H.headed; H = H.parent) {
      let te = Ag(H.node.name);
      te !== "" && A.unshift(te);
    }
    let m = A.join(" › "), I = (H) => m === "" || H === _ && m === M ? "" : `<title>${m}</title>`, k = `<rect x="${f(G)}" y="${f(z)}" width="${f(q.w)}" height="${f(q.h)}" fill="${ie}"`, w = ee.fontSize, B = (ee.bold ? 1 : 0) | (ee.italic ? 2 : 0), N = fl(ee.shape) ? Xt(ee) : eh(q.series);
    if (C.children !== void 0) {
      let H = "", te;
      if (q.headed) {
        let X = q.header < Md, le = w ?? (X ? l : s), J = w ?? l, V = q.w - 2 * vd - 4, Z = T ? i.width(T, J, B) : 0, ae = !X && Z > 0 && V - Z - 12 >= 3 * le, oe = le * qa < q.header ? Mf(_, ae ? V - Z - 12 : V, le, le, i, B | 1) : void 0, ue = z + q.header / 2 + 1;
        te = oe?.text, oe && (H += `<text x="${f(G + vd + 2)}" y="${f(ue + le * 0.35)}" font-weight="var(--_hw)"${X ? ` font-size="${le}"` : ""}${N}${ee.text}>${it(oe.text)}</text>`), ae && J * qa <= Md && (H += `<text class="pele-value" x="${f(G + q.w - vd - 2)}" y="${f(ue + J * 0.35)}" font-size="${l}" text-anchor="end"${N || ' fill="var(--_m)"'}${ee.text}>${it(T)}</text>`);
      }
      let Q = /[";]fill:/.test(ee.shape) ? "" : ' fill-opacity="0.12"', L = q.headed ? `${k}${Eg(`${Q} stroke="${ie}"${ee.shape}`, q)}/>` : `<rect x="${f(G)}" y="${f(z)}" width="${f(q.w)}" height="${f(q.h)}" fill="none"/>`;
      S += `<g class="pele-node pele-section${Ht(C.classSelector ?? "")}" ${E}${I(te)}${L}${H}</g>`;
      continue;
    }
    let j = "", F = q.w - 8, Y = w ?? n, W = w === void 0 ? Math.min(a, Math.floor((q.h - 4) / qa)) : w * qa <= q.h - 4 ? w : 0, K = W >= Y ? Mf(_, F, W, Y, i, B) : void 0;
    if (K) {
      let H = f(G + q.w / 2), te = z + q.h / 2, Q = w ?? Math.max(n, Math.round(K.size * 0.8)), L = (K.size + Q) * qa;
      if (T && L <= q.h - 4 && i.width(T, Q, B) <= F) {
        let X = te - L / 2 + K.size * qa / 2, le = te + L / 2 - Q * qa / 2;
        j = `<text x="${H}" y="${f(X + K.size * 0.35)}" font-size="${f(K.size)}"${N}${ee.text}>${it(K.text)}</text><text class="pele-value" x="${H}" y="${f(le + Q * 0.35)}" font-size="${f(Q)}"${N}${ee.text}>${it(T)}</text>`;
      } else j = `<text x="${H}" y="${f(te + K.size * 0.35)}" font-size="${f(K.size)}"${N}${ee.text}>${it(K.text)}</text>`;
    }
    R += `<g class="pele-node pele-leaf${Ht(C.classSelector ?? "")}" ${E}${I(K?.text)}${k}${Eg(ee.shape, q)}/>${j}</g>`;
  }
  let D = Math.ceil(Math.max(c, b.width) + 2 * h), O = Math.ceil(u + x + 2 * h), U = Pe(b, D / 2, h + b.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (S ? `<g class="pele-sections" font-size="${s}">${S}</g>` : "") + (R ? `<g class="pele-leaves" text-anchor="middle" fill="var(--_bg)">${R}</g>` : "");
  return { svg: xt("treemap", D, O, a, r, e, U), width: D, height: O, links: [] };
}
var t_ = { type: "treemap", parse: (e, t, r) => jS(VS(e), r), render: e_ }, ay = "EOF USECASE ACTOR SYSTEM_BOUNDARY END DIRECTION TD TB BT LR RL NOTE FOR JSON CLASS_DEF CLASS STYLE INCLUDE EXTEND TRUE FALSE IDENTIFIER NUMBER AT COMMA COLON HASH_COLOR CSS_IDENTIFIER CSS_ESCAPED_COMMA DASH DOT PERCENT CSS_PUNCTUATION LABEL_PUNCTUATION LABEL_SYMBOL PLAIN_STRING MARKDOWN_STRING UNCLOSED_MARKDOWN_STRING COMMENT NEWLINE ACC_DESCR_BLOCK ACC_TITLE_LINE ACC_DESCR_LINE JSON_DECLARATION_START JSON_OBJECT_LITERAL UNCLOSED_JSON_OBJECT_LITERAL GENERALIZATION DEPENDENCY_ARROW STEREOTYPE_START STEREOTYPE_END STEREOTYPE_TEXT UNCLOSED_STEREOTYPE_TEXT CLASS_SEPARATOR FORWARD_SOLID BACKWARD_SOLID FORWARD_CIRCLE BACKWARD_CIRCLE FORWARD_CROSS BACKWARD_CROSS MARKERLESS_SOLID METADATA_START LBRACE RBRACE LBRACKET RBRACKET LPAREN RPAREN".split(" "), Fs = 1, ly = 2, Ra = new Uint8Array(128);
for (let e = 48; e <= 57; e++) Ra[e] = Fs;
for (let e = 65; e <= 90; e++) Ra[e] = Ra[e + 32] = Fs;
Ra[95] = Fs;
for (let e of "!#$&*+/=?^|~") Ra[e.charCodeAt(0)] = ly;
var Tg = [0, 12, 5, 14, 3, 9, 2, 2, 2, 2, 2, 4, 3, 4, 8, 5, 5, 7, 6, 4, 5];
function jn(e) {
  return e < 128 && (Ra[e] & Fs) !== 0;
}
function kd(e, t, r) {
  for (let a = 0; a < r.length; a++) if ((e.charCodeAt(t + a) | 32) !== r.charCodeAt(a)) return !1;
  return !0;
}
function r_(e, t, r) {
  switch (r) {
    case 97:
      return e.startsWith("actor", t) ? 2 : 0;
    case 115:
      return e.startsWith("systemBoundary", t) ? 3 : e.startsWith("style", t) ? 16 : 0;
    case 101:
      return e.startsWith("end", t) ? 4 : kd(e, t, "extend") ? 18 : 0;
    case 69:
      return kd(e, t, "extend") ? 18 : 0;
    case 100:
      return e.startsWith("direction", t) ? 5 : 0;
    case 84:
      return e.startsWith("TD", t) ? 6 : e.startsWith("TB", t) ? 7 : 0;
    case 66:
      return e.startsWith("BT", t) ? 8 : 0;
    case 76:
      return e.startsWith("LR", t) ? 9 : 0;
    case 82:
      return e.startsWith("RL", t) ? 10 : 0;
    case 110:
      return e.startsWith("note", t) ? 11 : 0;
    case 102:
      return e.startsWith("for", t) ? 12 : e.startsWith("false", t) ? 20 : 0;
    case 106:
      return e.startsWith("json", t) ? 13 : 0;
    case 99:
      return e.startsWith("classDef", t) ? 14 : e.startsWith("class", t) ? 15 : 0;
    case 105:
    case 73:
      return kd(e, t, "include") ? 17 : 0;
    case 116:
      return e.startsWith("true", t) ? 19 : 0;
    case 117:
      return e.startsWith("usecase-beta", t) ? 1 : 0;
    default:
      return 0;
  }
}
function zs(e, t) {
  [e, t] = il(e, t);
  let r = 1, a = 0;
  for (let s = 0; s < t; s++) {
    let l = e.charCodeAt(s);
    l !== 10 && l !== 13 || (l === 13 && s + 1 < t && e.charCodeAt(s + 1) === 10 && s++, r++, a = s + 1);
  }
  return [r, t - a + 1];
}
function iy(e, t, r) {
  let [a, s] = zs(e, t);
  return `line ${a}, column ${s} [${il(e, t)[1]},${il(e, r)[1]})`;
}
function sy(e, t, r) {
  for (let a = t + 1; a < e.length; a++) {
    let s = e.charCodeAt(a);
    if (s === r) return a + 1;
    if (s === 10 || s === 13) return -1;
  }
  return -1;
}
function a_(e, t) {
  let r = e.charCodeAt(t);
  return r !== 34 && r !== 39 ? !0 : r === 34 && e.charCodeAt(t + 1) === 96 || sy(e, t, r) !== -1;
}
function Cg(e, t, r) {
  let [a, s] = zs(e, t), [l, n] = [il(e, t)[1], il(e, t + r)[1]];
  return new at(`Error lexing usecase diagram: unexpected character: ->${e.charAt(t)}<- at offset: ${l}, skipped ${n - l} characters. at line ${a}, column ${s} [${l},${n})`, "syntax", { type: "usecase", line: a, column: s });
}
function l_(e) {
  let t = [], r = [], a = [], s = e.length, l = 0, n = !0, i = !1;
  for (; l < s; ) {
    let o = e.charCodeAt(l);
    if (o === 32 || o === 9) {
      l++;
      continue;
    }
    let h, c = l + 1, u = !1;
    if (o < 128 && (Ra[o] & Fs) !== 0) {
      if (h = 0, o === 97 && n && e.startsWith("acc", l)) {
        let d = e.startsWith("Descr", l + 3);
        if (d || e.startsWith("Title", l + 3)) {
          let p = l + 8;
          for (; Xr(e.charCodeAt(p)); ) p++;
          let g = e.charCodeAt(p);
          if (g === 58) for (h = d ? 42 : 41, c = p + 1; c < s && e.charCodeAt(c) !== 10 && e.charCodeAt(c) !== 13; ) c++;
          else if (g === 123 && d && !i) {
            let y = e.indexOf("}", p + 1);
            y === -1 ? i = !0 : (h = 40, c = y + 1);
          }
        }
      } else if (o === 106 && e.startsWith("json", l) && Xr(e.charCodeAt(l + 4))) {
        let d = l + 5;
        for (; Xr(e.charCodeAt(d)); ) d++;
        let p = d;
        for (; jn(e.charCodeAt(d)); ) d++;
        if (d > p) {
          for (; Xr(e.charCodeAt(d)); ) d++;
          if (e.charCodeAt(d) === 64) {
            for (d++; Xr(e.charCodeAt(d)); ) d++;
            if (e.charCodeAt(d) === 123) {
              t.push(43), r.push(l), a.push(d), l = d;
              let g = 0, y = !1, b = !1, x = d;
              for (; x < s; x++) {
                let v = e.charCodeAt(x);
                if (y) b ? b = !1 : v === 92 ? b = !0 : v === 34 && (y = !1);
                else if (v === 34) y = !0;
                else if (v === 123) g++;
                else if (v === 125 && --g === 0) break;
              }
              t.push(x < s ? 44 : 45), r.push(d), l = x < s ? x + 1 : s, a.push(l), n = !1;
              continue;
            }
          }
        }
      }
      if (h === 0) {
        for (; c < s && jn(e.charCodeAt(c)); ) c++;
        let d = r_(e, l, o);
        if (d !== 0) d === 1 || c - l === Tg[d] ? (h = d, c = l + Tg[d]) : h = 21;
        else if ((o === 111 || o === 120) && e.charCodeAt(l + 1) === 45 && e.charCodeAt(l + 2) === 45) h = o === 111 ? 56 : 58, c = l + 3;
        else if (yt(o)) {
          let p = l + 1;
          for (; yt(e.charCodeAt(p)); ) p++;
          if (e.charCodeAt(p) === 46 && yt(e.charCodeAt(p + 1))) {
            for (h = 22, c = p + 2; yt(e.charCodeAt(c)); ) c++;
            for (; Ql(e.charCodeAt(c)); ) c++;
          } else h = 21;
        } else for (h = 21; e.charCodeAt(c) === 45 && jn(e.charCodeAt(c + 1)); ) for (h = 27, c += 2; jn(e.charCodeAt(c)); ) c++;
      }
    } else if (o === 10) h = 39, u = !0;
    else if (o === 13) h = 39, u = !0, e.charCodeAt(c) === 10 && c++;
    else if (o === 34 || o === 39) {
      if (o === 34 && e.charCodeAt(l + 1) === 96) {
        let d = e.indexOf('`"', l + 2);
        h = d === -1 ? 37 : 36, c = d === -1 ? s : d + 2;
      } else if (h = 35, c = sy(e, l, o), c === -1) {
        let d = l + 1;
        for (; d < s && !a_(e, d); ) d++;
        throw Cg(e, l, d - l);
      }
    } else if (o === 37) if (n && e.charCodeAt(c) === 37) for (h = 38; c < s && e.charCodeAt(c) !== 10 && e.charCodeAt(c) !== 13; ) c++;
    else h = 31;
    else if (o === 45) if (e.charCodeAt(c) !== 45) h = 29;
    else {
      for (; e.charCodeAt(c) === 45; ) c++;
      let d = e.charCodeAt(c), p = c - l === 2;
      p && d === 124 && e.charCodeAt(c + 1) === 62 ? (h = 46, c += 2) : d === 62 ? (h = 53, c++) : p && (d === 111 || d === 120) ? (h = d === 111 ? 55 : 57, c++) : h = 59;
    }
    else if (o === 46) {
      let d = e.charCodeAt(c);
      if (d === 46 && e.charCodeAt(c + 1) === 62) h = 47, c += 2;
      else if (yt(d)) {
        for (h = 22; yt(e.charCodeAt(c)); ) c++;
        for (; Ql(e.charCodeAt(c)); ) c++;
      } else h = 30;
    } else if (o === 60) if (e.charCodeAt(c) === 60) {
      if (t.push(48), r.push(l), a.push(l + 2), n = !1, l += 2, l >= s) break;
      if (e.charCodeAt(l) === 62 && e.charCodeAt(l + 1) === 62) h = 49, c = l + 2;
      else {
        let d = l, p = !1;
        for (; d < s; d++) {
          let g = e.charCodeAt(d);
          if (g === 10 || g === 13) break;
          if (g === 62 && e.charCodeAt(d + 1) === 62) {
            p = !0;
            break;
          }
        }
        if (p && e.slice(l, d).trim() !== "") t.push(50), r.push(l), a.push(d), h = 49, l = d, c = d + 2;
        else {
          for (; d < s && e.charCodeAt(d) !== 10 && e.charCodeAt(d) !== 13; ) d++;
          if (d === l) {
            for (; d < s && (e.charCodeAt(d) === 10 || e.charCodeAt(d) === 13); ) d++;
            throw Cg(e, l, d - l);
          }
          h = 51, c = d;
        }
      }
    } else if (e.charCodeAt(c) === 45 && e.charCodeAt(c + 1) === 45) for (h = 54, c += 2; e.charCodeAt(c) === 45; ) c++;
    else h = 33;
    else if (o === 58) e.charCodeAt(c) === 58 && e.charCodeAt(c + 1) === 58 ? (h = 52, c += 2) : h = 25;
    else if (o === 64) e.charCodeAt(c) === 123 ? (h = 60, c++) : h = 23;
    else if (o === 123) h = 61;
    else if (o === 125) h = 62;
    else if (o === 91) h = 63;
    else if (o === 93) h = 64;
    else if (o === 40) h = 65;
    else if (o === 41) h = 66;
    else if (o === 44) h = 24;
    else if (o === 35) {
      for (; p2(e.charCodeAt(c)); ) c++;
      h = c > l + 1 ? 26 : 32;
    } else if (o === 92) e.charCodeAt(c) === 44 ? (h = 28, c++) : h = 33;
    else if (o < 127 && o > 32) h = (Ra[o] & ly) !== 0 ? 32 : 33;
    else for (h = 34; c < s; ) {
      let d = e.charCodeAt(c);
      if (d >= 32 && d < 127 || d === 9 || d === 10 || d === 13) break;
      c++;
    }
    t.push(h), r.push(l), a.push(c), l = c, n = u;
  }
  for (let o = 0; o < 3; o++) t.push(0), r.push(s), a.push(s);
  return { types: t, starts: r, ends: a };
}
function i_() {
  return { type: "usecase", actors: /* @__PURE__ */ new Map(), useCases: /* @__PURE__ */ new Map(), systemBoundaries: /* @__PURE__ */ new Map(), relationships: [], notes: /* @__PURE__ */ new Map(), jsonNodes: /* @__PURE__ */ new Map(), classDefs: /* @__PURE__ */ new Map(), direction: "LR", title: void 0, accTitle: "", accDescr: "", accDescription: "", source: "", headerSpan: [0, 0], statements: [] };
}
function s_() {
  return { elements: [], boundaries: [], jsons: [], relationships: [], notes: [], metadata: [], classes: [], styles: [], classDefs: [], direction: void 0, accTitle: "", accDescription: "" };
}
function Ad(e, t) {
  if (t.length === 0) return;
  let r = new Set(e);
  for (let a of t) r.has(a) || (r.add(a), e.push(a));
}
function n_(e) {
  let t = /* @__PURE__ */ new Set(["actor", "usecase", "boundary", "edge"]);
  for (let { key: r, value: a } of e) if (r === "icon") t.clear(), t.add("actor");
  else if (r === "animate" || r === "animation") t.clear(), t.add("edge");
  else if (r === "type") t.clear(), a === "rect" || a === "package" ? t.add("boundary") : (a === "normal" || a === "hollow" || a === "awesome") && t.add("actor");
  else if (r === "business") t.delete("boundary"), t.delete("edge");
  else return;
  return t.size === 1 ? [...t][0] : void 0;
}
function o_(e, t, r, a, s) {
  let l = i_(), { actors: n, useCases: i, systemBoundaries: o } = l, h = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), g = (m) => iy(e, m[0], m[1]), y = (m, I) => {
    let [k, w] = zs(e, I[0]);
    return new at(m, "semantic", { type: "usecase", line: k, column: w });
  }, b = (m, I) => {
    throw y(`${m} at ${g(I)}`, I);
  }, x = (m, I, k, w, B) => {
    let N = (j) => j === void 0 ? "" : ` (label "${j}")`;
    throw y(`${m} at ${g(I)}${N(w)}; previous declaration at ${g(k)}${N(B)}`, I);
  }, v = (m, I, k) => b(`Metadata property '${k.key}' is invalid for ${I} '${m}'`, k.keySpan), $ = (m, I) => {
    let k = p.get(m);
    (k === void 0 || I < k) && p.set(m, I);
  }, S = (m) => [...m].sort((I, k) => (p.get(I.id) ?? 0) - (p.get(k.id) ?? 0)), R = (m, I) => {
    h.set(m.id, { kind: I, span: m.span, generated: m.generated, label: m.label.text });
  }, D = (m, I) => {
    let k = h.get(m.id);
    if (!k) return;
    let w = m.generated ? m.label.text : void 0, B = k.generated ? k.label : void 0;
    k.kind !== I && x(`ID '${m.id}' is declared as both ${k.kind} and ${I}`, m.span, k.span, w, B), (k.generated || m.generated) && x(`Generated ID '${m.id}' collides with another declaration`, m.span, k.span, w, B);
  }, O = (m, I, k) => {
    let w = h.get(m);
    w && x(`ID '${m}' is declared more than once (${w.kind} and ${I})`, k, w.span, void 0, w.generated ? w.label : void 0), h.set(m, { kind: I, span: k, generated: !1 });
  }, U = (m, I, k) => {
    let { key: w, value: B } = I, N = (j) => {
      !k && j !== void 0 && j !== B && x(`Actor '${m.id}' has conflicting ${w} metadata`, I.keySpan, m.span);
    };
    w === "type" && (B === "normal" || B === "hollow" || B === "awesome") ? (N(m.actorType), m.actorType = B) : w === "icon" && typeof B == "string" ? (N(m.icon), m.icon = B) : w === "business" && typeof B == "boolean" ? (N(m.business), m.business = B) : v(m.id, "actor", I);
  }, q = (m, I, k) => {
    for (let w of I ?? []) m.kind === "actor" ? U(m, w, k) : w.key === "business" && typeof w.value == "boolean" ? (!k && m.business !== void 0 && m.business !== w.value && x(`Use case '${m.id}' has conflicting business metadata`, w.keySpan, m.span), m.business = w.value) : v(m.id, "usecase", w);
  }, C = (m) => {
    let I;
    if (m.kind === "actor") {
      i.delete(m.id);
      let k = { id: m.id, label: m.label.text, labelType: m.label.type, business: m.business ?? !1, classes: [...m.classes], type: m.icon ? "icon" : m.actorType ?? "normal", styles: n.get(m.id)?.styles ?? [] };
      m.icon && (k.icon = m.icon), n.set(m.id, k), I = k;
    } else n.delete(m.id), I = { id: m.id, label: m.label.text, labelType: m.label.type, business: m.business ?? !1, classes: [...m.classes], shape: m.shape ?? "ellipse", styles: i.get(m.id)?.styles ?? [] }, i.set(m.id, I);
    m.stereotype && (I.stereotype = m.stereotype), m.parent?.id && (I.parentId = m.parent.id);
  }, ee = (m) => {
    D(m, m.kind);
    let I = m.parent?.id ? m.parent : void 0, k = c.get(m.id);
    if (!k) {
      let w = { kind: m.kind, id: m.id, label: m.label, span: m.span, generated: m.generated, classes: [...m.classes], parent: I, shape: m.shape, stereotype: m.stereotype, stereotypeSpan: m.stereotype ? m.span : void 0 };
      q(w, m.metadata, !1), c.set(m.id, w), R(m, m.kind);
      return;
    }
    (k.label.text !== m.label.text || k.label.type !== m.label.type) && x(`ID '${m.id}' has conflicting labels`, m.span, k.span), m.shape && k.shape && m.shape !== k.shape && x(`Use case '${m.id}' has conflicting shapes`, m.span, k.span), I && k.parent?.id && I.id !== k.parent.id && x(`Element '${m.id}' belongs to more than one system boundary`, I.span, k.parent.span), m.stereotype && k.stereotype && m.stereotype !== k.stereotype && x(`Element '${m.id}' has conflicting stereotypes`, m.span, k.stereotypeSpan ?? k.span), k.shape ??= m.shape, k.parent ??= m.parent, k.stereotype ??= m.stereotype, k.stereotypeSpan ??= m.stereotype ? m.span : void 0, Ad(k.classes, m.classes), q(k, m.metadata, !1);
  }, ie = (m) => {
    D(m, "boundary");
    let I = u.get(m.id);
    if (I) {
      (I.label.text !== m.label.text || I.label.type !== m.label.type) && x(`Boundary '${m.id}' has conflicting titles`, m.span, I.span), Ad(I.classes, m.classes);
      return;
    }
    u.set(m.id, { ...m, classes: [...m.classes], members: [] }), R(m, "boundary");
  }, G = (m) => {
    m.classed && !m.declares && b(`Relationship endpoint '${m.id}' uses ::: without declaring the node`, m.span);
    let I = h.get(m.id);
    return I ? I.kind : (c.set(m.id, { ...m, kind: "usecase", shape: "ellipse", classes: [] }), R(m, "usecase"), $(m.id, m.span[0]), "usecase");
  }, z = (m, I) => {
    let k = h.get(m)?.kind;
    return (k === "actor" ? n.get(m) : k === "usecase" ? i.get(m) : k === "boundary" ? o.get(m) : k === "json" ? l.jsonNodes.get(m) : d.get(m)) ?? b(`Class/style target '${m}' is unresolved or anonymous`, I);
  }, _ = [];
  for (let { source: m, target: I } of t.relationships) $(m.id, m.span[0]), $(I.id, I.span[0]);
  for (let m of t.elements) $(m.id, m.span[0]), _.push({ offset: m.span[0], run: () => ee(m) });
  for (let m of t.boundaries) $(m.id, m.span[0]), _.push({ offset: m.span[0], run: () => ie(m) });
  for (let m of t.jsons) $(m.id, m.span[0]), _.push({ offset: m.span[0], run: () => O(m.id, "json", m.span) });
  for (let { id: m, idSpan: I } of t.relationships) m && I && _.push({ offset: I[0], run: () => O(m, "edge", I) });
  _.sort((m, I) => m.offset - I.offset);
  for (let m of _) m.run();
  for (let m of S(c.values())) C(m);
  for (let m of S(u.values())) o.set(m.id, { id: m.id, label: m.label.text, labelType: m.label.type, type: "rect", members: [], classes: [], styles: [] });
  for (let m of S(t.jsons)) l.jsonNodes.set(m.id, { id: m.id, value: m.value, propertyOrder: m.propertyOrder, classes: [...m.classes], styles: [] });
  let T = 0;
  for (let m of t.relationships) {
    let { source: I, target: k, type: w } = m, B = G(I), N = G(k), j = (W) => W === "actor" || W === "usecase" || W === "json";
    j(B) || x(`Relationship source '${I.id}' cannot be ${B}`, I.span, h.get(I.id).span), j(N) || x(`Relationship target '${k.id}' cannot be ${N}`, k.span, h.get(k.id).span), (w === "include" || w === "extend") && (B !== "usecase" || N !== "usecase") && b(`${w} relationship requires use-case endpoints`, m.span), w === "generalization" && (B === "json" || B !== N) && b("Generalization requires actor-to-actor or use-case-to-use-case endpoints", m.span), w === "association" && (B === "json" || N === "json") && m.arrowType > 2 && b(`JSON relationship '${I.id}' to '${k.id}' permits only point, reversed-point, or markerless solid association`, m.span);
    let F = m.id ?? `edge-${T++}`, Y = { id: F, explicitId: !!m.id, source: I.id, target: k.id, type: w, arrowType: m.arrowType, minlen: m.minlen, classes: [], styles: [], animate: !1 };
    m.label && (Y.label = m.label.text, Y.labelType = m.label.type), l.relationships.push(Y), d.set(F, Y);
  }
  let E = new Map(n), M = new Map(i);
  n.clear(), i.clear();
  for (let m of S(c.values())) {
    let I = E.get(m.id), k = M.get(m.id);
    I ? n.set(m.id, I) : k ? i.set(m.id, k) : C(m);
  }
  for (let { target: m, span: I, properties: k, statement: w } of t.metadata) {
    let B = h.get(m);
    if (!B) {
      let Y = n_(k);
      return b(`Metadata target '${m}' is unresolved${Y ? ` (metadata implies ${Y})` : ""}`, I);
    }
    let N = B.kind;
    N === "actor" || N === "usecase" ? q(c.get(m), k, !0) : N === "edge" && (w.kind = "edgeMetadata", w.edges = [{ id: m, span: w.span, idSpan: I, metadata: w.metadata }], delete w.nodes);
    let j = u.get(m), F = d.get(m);
    for (let Y of N === "actor" || N === "usecase" ? [] : k) {
      let { key: W, value: K } = Y;
      N === "boundary" && j && W === "type" && (K === "rect" || K === "package") ? j.type = K : N === "edge" && F && W === "animate" && typeof K == "boolean" ? F.animate = K : N === "edge" && F && W === "animation" && (K === "fast" || K === "slow") ? (F.animation = K, F.animate = !0) : v(m, N, Y);
    }
  }
  for (let m of l.relationships) m.animation && (m.animate = !0);
  for (let m of c.values()) m.kind === "actor" ? (m.icon && m.actorType && m.actorType !== "normal" && b(`Actor '${m.id}' cannot combine icon with type '${m.actorType}'`, m.span), m.business && (m.icon || m.actorType === "awesome") && b(`Business actor '${m.id}' must use normal or hollow geometry`, m.span)) : m.shape === "rect" && m.business && b(`Rectangular use case '${m.id}' cannot be a business use case`, m.span), C(m);
  for (let m of [...t.elements].sort((I, k) => I.span[0] - k.span[0])) {
    if (!m.parent?.id) continue;
    let I = u.get(m.parent.id).members;
    I.includes(m.id) || I.push(m.id);
  }
  for (let m of u.values()) {
    let I = o.get(m.id);
    I.type = m.type ?? "rect", I.members = m.members, I.classes = [...m.classes];
  }
  let A = 0;
  for (let m of t.notes) {
    let I = h.get(m.target);
    if (!I) return b(`Note target '${m.target}' is unresolved`, m.span);
    I.kind !== "actor" && I.kind !== "usecase" && x(`Note target '${m.target}' must be an actor or use case, not ${I.kind}`, m.span, I.span);
    let k = `note-${A++}`;
    l.notes.set(k, { id: k, target: m.target, label: m.label.text, labelType: m.label.type });
  }
  for (let m of t.classDefs) for (let I of m.ids) l.classDefs.set(I, { id: I, styles: [...m.styles] });
  for (let m of t.classes) for (let I of m.targets) Ad(z(I.id, I.span).classes, m.classes);
  for (let m of t.styles) z(m.target, m.span).styles.push(...m.styles);
  return l.direction = t.direction ?? l.direction, l.title = s, l.accTitle = t.accTitle, l.accDescription = t.accDescription, l.accDescr = t.accDescription.replace(/\n\s+/g, `
`), l.source = e, l.headerSpan = r, l.statements = a, l;
}
var dr = class extends Error {
  constructor(e) {
    super("Invalid JSON token"), this.offset = e;
  }
  offset;
};
function Sg(e) {
  let t = /* @__PURE__ */ new Map(), r = [], a = [], s = e.length, l = 0, n = "", i = 0, o = () => {
    for (; l < s; ) {
      let d = e.charCodeAt(l);
      if (d !== 32 && d !== 9 && d !== 10 && d !== 13) return;
      l++;
    }
  }, h = (d) => {
    l++;
    let p = "";
    for (; l < s; ) {
      let g = l, y = e[l++];
      if (y === '"') return p;
      if (y.charCodeAt(0) < 32) throw new dr(g);
      if (y !== "\\") {
        d && (p += y);
        continue;
      }
      let b = l, x = e[l++], v;
      if (x === '"' || x === "\\" || x === "/") v = x;
      else if (x === "b") v = "\b";
      else if (x === "f") v = "\f";
      else if (x === "n") v = `
`;
      else if (x === "r") v = "\r";
      else if (x === "t") v = "	";
      else if (x === "u") {
        let $ = e.slice(l, l + 4);
        if (!/^[\dA-Fa-f]{4}$/.test($)) throw new dr(l);
        v = String.fromCharCode(parseInt($, 16)), l += 4;
      } else throw new dr(b);
      d && (p += v);
    }
    throw new dr(l);
  }, c = (d) => {
    for (let p = 0; p < d.length; p++) if (e[l + p] !== d[p]) throw new dr(l + p);
    l += d.length;
  }, u = () => {
    if (e.charCodeAt(l) === 45 && l++, e.charCodeAt(l) === 48) l++;
    else if (yt(e.charCodeAt(l))) for (; yt(e.charCodeAt(l)); ) l++;
    else throw new dr(l);
    if (e.charCodeAt(l) === 46) {
      if (l++, !yt(e.charCodeAt(l))) throw new dr(l);
      for (; yt(e.charCodeAt(l)); ) l++;
    }
    if ((e.charCodeAt(l) | 32) === 101) {
      if (l++, (e.charCodeAt(l) === 43 || e.charCodeAt(l) === 45) && l++, !yt(e.charCodeAt(l))) throw new dr(l);
      for (; yt(e.charCodeAt(l)); ) l++;
    }
  };
  for (o(); ; ) if (i === 0) {
    o();
    let d = e.charCodeAt(l);
    if (i = 2, d === 123) {
      l++;
      let p = [];
      t.set(n, p), r.push(n), o(), e.charCodeAt(l) === 125 ? l++ : (a.push({ object: !0, pointer: n, keys: p, ranges: /* @__PURE__ */ new Map(), key: "", from: 0, index: 0 }), i = 1);
    } else if (d === 91) l++, o(), e.charCodeAt(l) === 93 ? l++ : (a.push({ object: !1, pointer: n, keys: [], ranges: /* @__PURE__ */ new Map(), key: "", from: 0, index: 0 }), n += "/0", i = 0);
    else if (d === 34) h(!1);
    else if (d === 116) c("true");
    else if (d === 102) c("false");
    else if (d === 110) c("null");
    else if (d === 45 || yt(d)) u();
    else throw new dr(l);
  } else if (i === 1) {
    let d = a[a.length - 1];
    if (e.charCodeAt(l) !== 34) throw new dr(l);
    let p = h(!0), g = d.ranges.get(p);
    if (g === void 0) d.keys.push(p);
    else for (let y = g[0]; y < g[1]; y++) t.delete(r[y]);
    if (d.key = p, d.from = r.length, o(), e.charCodeAt(l) !== 58) throw new dr(l);
    l++, n = `${d.pointer}/${p.replaceAll("~", "~0").replaceAll("/", "~1")}`, i = 0;
  } else {
    let d = a[a.length - 1];
    if (d === void 0) break;
    d.object ? d.ranges.set(d.key, [d.from, r.length]) : d.index++, o();
    let p = e.charCodeAt(l);
    if (p === (d.object ? 125 : 93)) l++, a.pop();
    else {
      if (p !== 44) throw new dr(l);
      l++, o(), n = `${d.pointer}/${d.index}`, i = d.object ? 1 : 0;
    }
  }
  if (o(), l !== s) throw new dr(l);
  return t;
}
function If(e, t, r, a) {
  let s = Math.min(Math.max(t, 0), e.length);
  for (let l = 0; l < s; l++) {
    let n = e.charCodeAt(l);
    n === 13 ? (r++, a = 1) : n === 10 ? (l === 0 || e.charCodeAt(l - 1) !== 13) && (r++, a = 1) : a++;
  }
  return [r, a];
}
function h_(e, t, r, a) {
  let s = /\bposition (\d+)\b/.exec(e);
  if (s) return If(t, parseInt(s[1], 10), r, a);
  let l = /\bline (\d+) column (\d+)\b/.exec(e);
  if (l) {
    let n = parseInt(l[1], 10), i = parseInt(l[2], 10);
    return [r + n - 1, n === 1 ? a + i - 1 : i];
  }
  if (/unexpected end|end of json input/i.test(e)) return If(t, t.length, r, a);
}
function _g(e, t, r) {
  return new at(`${e} (line ${t}, column ${r})`, "syntax", { type: "usecase", line: t, column: r });
}
function c_(e, t) {
  let r;
  try {
    r = JSON.parse(e);
  } catch (a) {
    let s = a instanceof Error ? a.message : String(a), l = Od(e);
    if (l !== e) try {
      JSON.parse(l);
    } catch (h) {
      h instanceof Error && (s = h.message);
    }
    let [n, i] = t(), o = h_(s, l, n, i);
    if (!o) {
      let h = 0;
      try {
        Sg(l);
      } catch (c) {
        c instanceof dr && (h = c.offset);
      }
      o = If(l, h, n, i);
    }
    throw _g(`Invalid JSON: ${s}`, o[0], o[1]);
  }
  if (typeof r != "object" || r === null || Array.isArray(r)) {
    let [a, s] = t();
    throw _g("JSON value must have an object root", a, s);
  }
  return { value: r, propertyOrder: Sg(e) };
}
var ny = 1, su = 2, Nf = 4, oy = 8, hy = 16, cy = 32, dy = 64, vh = "DEPENDENCY_ARROW|GENERALIZATION|FORWARD_SOLID|BACKWARD_SOLID|MARKERLESS_SOLID|FORWARD_CIRCLE|BACKWARD_CIRCLE|FORWARD_CROSS|BACKWARD_CROSS", kh = "IDENTIFIER|PLAIN_STRING|MARKDOWN_STRING", d_ = "PLAIN_STRING|MARKDOWN_STRING|LABEL_TEXT", fy = "ACC_TITLE_LINE|ACC_DESCR_LINE|ACC_DESCR_BLOCK|DIRECTION|ACTOR|SYSTEM_BOUNDARY|NOTE|JSON_DECLARATION_START|CLASS_DEF|CLASS|STYLE", uy = "WORD|PLAIN_STRING|NUMBER|HASH_COLOR|CSS_IDENTIFIER|CSS_ESCAPED_COMMA|DASH|DOT|PERCENT|CSS_PUNCTUATION|COLON|LPAREN|RPAREN|LBRACKET|RBRACKET|LBRACE|RBRACE|AT|MARKERLESS_SOLID", Wr = new Uint8Array(67);
function gl(e, t) {
  for (let r of e.split("|")) if (r === "WORD") for (let a = 1; a <= 21; a++) Wr[a] |= t;
  else Wr[ay.indexOf(r)] |= t;
}
gl(`NEWLINE|COMMENT|${fy}|${kh}`, ny);
gl(`IDENTIFIER|${vh}`, su);
gl(uy, Nf);
gl(`STEREOTYPE_START|CLASS_SEPARATOR|IDENTIFIER|${vh}|NEWLINE|EOF`, oy);
gl(`NEWLINE|COMMENT|ACTOR|${kh}`, hy);
gl("FORWARD_SOLID|MARKERLESS_SOLID|FORWARD_CIRCLE|FORWARD_CROSS", cy);
gl("NEWLINE|IDENTIFIER|PLAIN_STRING|RBRACE", dy);
var f_ = /* @__PURE__ */ new Set(["allowmixing", "newpage", "package", "rectangle", "skinparam"]), sr = "", lt = [], Zt = [], nr = [], Be = 0, py = 0, Vt, Vo, bo = [], gy = 0, my = 0;
function Pt(e) {
  return sr.slice(Zt[e], nr[e]);
}
function wr(e) {
  return [Zt[e], nr[e]];
}
function Ah(e) {
  let [t, r] = zs(sr, Zt[Be]);
  throw new at(`Error parsing usecase diagram: ${e} at ${iy(sr, Zt[Be], nr[Be])}`, "syntax", { type: "usecase", line: t, column: r });
}
function yy(e) {
  Ah(`Expecting token of type --> ${e} <-- but found --> '${Pt(Be)}' <--`);
}
function Gt(e) {
  return lt[Be] !== e && yy(ay[e]), Be++;
}
function kr(e) {
  let t = e.split("|").map((r, a) => `  ${a + 1}. [${r}]`);
  Ah(`Expecting: one of these possible Token sequences:
${t.join(`
`)}
but found: '${Pt(Be)}'`);
}
function Ig() {
  let e = kh.split("|"), t = e.flatMap((s) => ["NEWLINE", "IDENTIFIER", "PLAIN_STRING", "RBRACE"].map((l) => `${s}, METADATA_START, ${l}`)), r = `STEREOTYPE_START|CLASS_SEPARATOR|IDENTIFIER|${vh}|NEWLINE|EOF`.split("|"), a = e.flatMap((s, l) => (l === 0 ? ["LPAREN", "LBRACKET", ...r] : r).map((n) => `${s}, ${n}`));
  return [fy, ...t, ...a, ...t].join("|");
}
function Ng(e) {
  return e >= 1 && e <= 21;
}
function Rg(e) {
  return e >= 1 && e <= 34;
}
function hl() {
  py = nr[Be - 1], lt[Be] === 39 ? Be++ : lt[Be] !== 0 && kr("NEWLINE|EOF");
}
function Ts(e) {
  let t = lt[e] === 36 ? 2 : lt[e] === 35 ? 1 : 0;
  return [Zt[e] + t, nr[e] - t];
}
function Rf(e) {
  let t = Ts(e);
  return { text: sr.slice(t[0], t[1]), type: lt[e] === 36 ? "markdown" : "text", span: t };
}
function xy(e) {
  return e.replace(/\W/g, "_");
}
function ys() {
  let e = lt[Be];
  if (e === 35 || e === 36) return Rf(Be++);
  Rg(e) || kr(d_);
  let t = Be;
  for (; Rg(lt[Be]); ) Be++;
  let r = [Zt[t], nr[Be - 1]];
  return { text: sr.slice(r[0], r[1]), type: "text", span: r };
}
function rl(e) {
  return e === 21 || e === 35;
}
function Dg() {
  let e = Be;
  rl(lt[Be]) || kr("IDENTIFIER|PLAIN_STRING"), Be++, Gt(25);
  let t = Be, r = lt[Be];
  !rl(r) && r !== 19 && r !== 20 && kr("IDENTIFIER|PLAIN_STRING|TRUE|FALSE"), Be++;
  let a = Ts(e), s = Ts(t);
  return { key: sr.slice(a[0], a[1]), value: r === 19 ? !0 : r === 20 ? !1 : sr.slice(s[0], s[1]), span: [Zt[e], nr[t]], keySpan: a, valueSpan: s };
}
function u_() {
  let e = lt[Be], t = lt[Be + 1], r = lt[Be + 2];
  return e === 24 ? rl(t) || t === 39 && (r === 39 || rl(r)) : e !== 39 ? !1 : t === 24 || rl(t) || t === 39 && (r === 39 || r === 24 || rl(r));
}
function nu() {
  Gt(60);
  let e = [];
  for (; lt[Be] === 39; ) Be++;
  if (rl(lt[Be])) {
    for (e.push(Dg()); u_(); ) {
      if (lt[Be] === 24) Be++;
      else {
        for (; lt[Be] === 39; ) Be++;
        lt[Be] === 24 && Be++;
      }
      for (; lt[Be] === 39; ) Be++;
      e.push(Dg());
    }
    for (lt[Be] === 24 && Be++; lt[Be] === 39; ) Be++;
  }
  return Gt(62), e;
}
function ou(e) {
  return e.map(({ key: t, span: r, keySpan: a, valueSpan: s }) => ({ key: t, span: r, keySpan: a, valueSpan: s }));
}
function hu(e, t) {
  do {
    Be++;
    let r = Gt(21);
    e.push(Pt(r)), t.push(wr(r));
  } while (lt[Be] === 24);
}
function wy(e) {
  let t = Be, r = lt[Be], a = { id: "", label: void 0, span: Ts(t), generated: r !== 21, classes: [], classSpans: [], explicit: !1, nodeSpan: [0, 0] };
  if (r === 21) {
    Be++, a.id = Pt(t);
    let s = lt[Be];
    s === 65 || e && s === 63 ? (Be++, a.label = ys(), Gt(s === 65 ? 66 : 64), a.shape = s === 65 ? "ellipse" : "rect") : a.label = Rf(t);
  } else r === 35 || r === 36 ? (Be++, a.label = Rf(t), a.id = xy(a.label.text)) : kr(kh);
  return a;
}
function Ko(e) {
  let t = Be, r = wy(!e);
  if (e && (r.shape = void 0), lt[Be] === 60 && (r.metadata = nu()), lt[Be] === 48) {
    Be++;
    let a = Gt(50);
    Gt(49), r.stereotype = Pt(a).trim(), r.stereotypeSpan = wr(a);
  }
  return lt[Be] === 52 && hu(r.classes, r.classSpans), r.explicit = !!(r.shape || r.metadata || r.stereotype), r.nodeSpan = [Zt[t], nr[Be - 1]], r;
}
function cu(e, t) {
  return { id: e.id, kind: t, label: e.label, span: e.span, generated: e.generated, parent: Vo, shape: e.shape, metadata: e.metadata, stereotype: e.stereotype, classes: e.classes };
}
function Lg(e, t) {
  return { id: e.id, label: e.label, span: e.span, generated: e.generated, declares: t, classed: e.classes.length > 0 };
}
function du(e, t) {
  let r = { id: e.id, span: e.nodeSpan, idSpan: e.span, labelSpan: e.label.span };
  return t && (r.defines = !0), e.stereotypeSpan && (r.stereotypeSpan = e.stereotypeSpan), e.metadata && (r.metadata = ou(e.metadata)), e.classSpans.length > 0 && (r.classSpans = e.classSpans), r;
}
function Ed(e) {
  if (lt[Be] < 1 || lt[Be] > 36) return !1;
  for (let t = Be + 1; ; t++) {
    let r = lt[t];
    if (r === 59 || (Wr[r] & e) !== 0) return !0;
    if (r < 1 || r > 36) return !1;
  }
}
function Hi(e) {
  let t = nr[e] - Zt[e] - (lt[e] === 59 ? 0 : 1);
  return Math.max(1, t - 1);
}
function $y() {
  let e = Be, t = { type: "association", arrowType: 0, minlen: 1, target: void 0, span: [0, 0] };
  lt[Be] === 21 && lt[Be + 1] === 23 && (t.explicitId = Pt(Be), t.explicitIdSpan = wr(Be), Be += 2);
  let r = Be, a = lt[Be++];
  if (a === 47) Gt(25), lt[Be] !== 17 && lt[Be] !== 18 && kr("INCLUDE|EXTEND"), t.type = lt[Be] === 17 ? "include" : "extend", t.label = { text: t.type, type: "text", span: wr(Be) }, Be++;
  else if (a === 46) t.type = "generalization";
  else if (a === 53) t.minlen = Hi(r);
  else if (a === 54) t.arrowType = 1, nr[r] - Zt[r] === 3 && Ed(0) ? (t.label = ys(), t.minlen = Hi(Gt(59))) : t.minlen = Hi(r);
  else if (a === 59) if (t.arrowType = 2, nr[r] - Zt[r] === 2 && Ed(cy)) {
    t.label = ys();
    let s = lt[Be];
    s === 53 ? t.arrowType = 0 : s === 55 ? t.arrowType = 3 : s === 57 ? t.arrowType = 4 : s !== 59 && kr("FORWARD_SOLID|MARKERLESS_SOLID|FORWARD_CIRCLE|FORWARD_CROSS"), (t.arrowType === 0 || t.arrowType === 2) && (t.minlen = Hi(Be)), Be++;
  } else t.minlen = Hi(r);
  else a === 55 ? t.arrowType = 3 : a === 57 ? t.arrowType = 4 : a === 56 || a === 58 ? (t.arrowType = a === 56 ? 5 : 6, Ed(0) && (t.label = ys(), Gt(59))) : (Be--, kr(vh));
  return t.target = Ko(!1), t.span = [Zt[e], nr[Be - 1]], t;
}
function Lr(e) {
  return { kind: e, span: [0, 0] };
}
function by(e, t, r, a) {
  let s = r.target;
  s.explicit && Vt.elements.push(cu(s, "usecase")), Vt.relationships.push({ source: Lg(e, t), target: Lg(s, s.explicit), span: r.span, id: r.explicitId, idSpan: r.explicitIdSpan, type: r.type, arrowType: r.arrowType, label: r.label, minlen: r.minlen }), a.push(du(s, s.explicit));
  let l = Lr("edge");
  return l.nodes = a, l.edges = [{ id: r.explicitId ?? `edge-${gy++}`, span: l.span }], r.explicitIdSpan && (l.edges[0].idSpan = r.explicitIdSpan), r.label && (l.edges[0].labelSpan = r.label.span), l;
}
function My(e) {
  let t = Lr("node");
  return t.nodes = e, t;
}
function vy(e) {
  Be++;
  let t = [Ko(!0)], r;
  if (lt[Be] === 24) do
    Be++, t.push(Ko(!0));
  while (lt[Be] === 24);
  else e && (Wr[lt[Be]] & su) !== 0 && (r = $y());
  hl();
  for (let s of t) Vt.elements.push(cu(s, "actor"));
  let a = t.map((s) => du(s, !0));
  return r ? by(t[0], !0, r, a) : My(a);
}
function ky(e) {
  let t = Ko(!1), r = e && (Wr[lt[Be]] & su) !== 0 ? $y() : void 0;
  hl(), r || (t.explicit = !0, t.shape ??= "ellipse"), t.explicit && Vt.elements.push(cu(t, "usecase"));
  let a = [du(t, t.explicit)];
  return r ? by(t, t.explicit, r, a) : My(a);
}
function p_() {
  Be++;
  let e = wy(!0), t = { id: e.id, label: e.label, span: e.span, generated: e.generated, classes: e.classes }, r = lt[Be] === 60 ? nu() : void 0;
  lt[Be] === 52 && hu(e.classes, e.classSpans), hl(), Vt.boundaries.push(t), Vo = t;
  let a = [];
  for (; (Wr[lt[Be]] & hy) !== 0; ) a.push(Ay(!1));
  Vo = void 0;
  let s = Gt(4);
  hl();
  let l = Lr("group");
  return l.group = t.id, l.idSpan = t.span, l.titleSpan = t.label.span, l.endSpan = wr(s), l.classSpans = e.classSpans, a.length > 0 && (l.children = a), r && (l.metadata = ou(r), Vt.metadata.push({ target: t.id, span: t.span, properties: r, statement: l })), l;
}
function Og() {
  let e = Be, t = lt[Be];
  for (Ng(t) || t === 27 ? Be++ : t === 59 ? (Be++, Ng(lt[Be]) || yy("WORD"), Be++) : kr("WORD|CSS_IDENTIFIER|MARKERLESS_SOLID"), Gt(25), (Wr[lt[Be]] & Nf) === 0 && Ah(`Expecting: expecting at least one iteration which starts with one of these possible Token sequences::
  <[${uy.replaceAll("|", "] ,[")}]>
but found: '${Pt(Be)}'`); (Wr[lt[Be]] & Nf) !== 0; ) Be++;
  return sr.slice(Zt[e], nr[Be - 1]).replaceAll("\\,", ",");
}
function Fg() {
  let e = [Og()];
  for (; lt[Be] === 24; ) Be++, e.push(Og());
  return e;
}
function Td() {
  let e = [Gt(21)];
  for (; lt[Be] === 24; ) Be++, e.push(Gt(21));
  return e;
}
function qn(e) {
  let t = Ts(e);
  return { id: Pt(e), span: t, idSpan: t };
}
function g_() {
  let e = Be, t = lt[Be], r;
  if (t === 41 || t === 42 || t === 40) {
    Be++;
    let a = Pt(e);
    t === 40 ? Vt.accDescription = a.slice(a.indexOf("{") + 1, a.lastIndexOf("}")).trim() : t === 42 ? Vt.accDescription = a.slice(a.indexOf(":") + 1).trim() : Vt.accTitle = a.slice(a.indexOf(":") + 1).trim(), r = Lr(t === 41 ? "accTitle" : "accDescr");
  } else if (t === 5) {
    Be++;
    let a = lt[Be];
    (a < 6 || a > 10) && kr("TD|TB|BT|LR|RL"), Vt.direction = a === 6 ? "TB" : Pt(Be), Be++, r = Lr("direction");
  } else {
    if (t === 2) return vy(!0);
    if (t === 3) return p_();
    if (t === 11) {
      Be++, Gt(12);
      let a = Gt(21), s = ys();
      Vt.notes.push({ target: Pt(a), span: wr(a), label: s }), r = Lr("note"), r.ref = `note-${my++}`, r.refSpan = s.span, r.nodes = [qn(a)];
    } else if (t === 43) {
      Be++;
      let a = Gt(44), s = [], l = [];
      lt[Be] === 52 && hu(s, l);
      let n = Zt[e] + 4;
      for (; sr.charCodeAt(n) === 32 || sr.charCodeAt(n) === 9; ) n++;
      let i = n;
      for (; /\w/.test(sr.charAt(i)); ) i++;
      let o = { id: sr.slice(n, i), value: {}, propertyOrder: /* @__PURE__ */ new Map(), span: [n, i], classes: s };
      Vt.jsons.push(o), bo.push([o, a]), r = Lr("json"), r.nodes = [{ id: o.id, span: o.span, idSpan: o.span, defines: !0, classSpans: l }], r.classSpans = l;
    } else if (t === 14) {
      Be++;
      let a = Td();
      Vt.classDefs.push({ ids: a.map(Pt), styles: Fg() }), r = Lr("classDef"), r.ref = Pt(a[0]), r.refSpan = wr(a[0]);
    } else if (t === 15) {
      Be++;
      let a = Td(), s = Td();
      Vt.classes.push({ targets: a.map((l) => ({ id: Pt(l), span: wr(l) })), classes: s.map(Pt) }), r = Lr("classAssign"), r.ref = Pt(s[0]), r.refSpan = wr(s[0]), r.nodes = a.map(qn);
    } else if (t === 16) {
      Be++;
      let a = Gt(21);
      Vt.styles.push({ target: Pt(a), span: wr(a), styles: Fg() }), r = Lr("style"), r.nodes = [qn(a)];
    } else {
      let a = lt[Be + 1];
      if (a === 60) {
        (Wr[lt[Be + 2]] & dy) === 0 && kr(Ig()), Be++;
        let s = qn(e);
        t !== 21 && (s.id = xy(sr.slice(s.span[0], s.span[1])));
        let l = nu();
        r = Lr("metadata"), r.nodes = [s], r.metadata = ou(l), Vt.metadata.push({ target: s.id, span: s.span, properties: l, statement: r });
      } else return (!((Wr[a] & oy) !== 0 || t === 21 && (a === 65 || a === 63)) || t === 21 && f_.has(Pt(e).toLowerCase())) && kr(Ig()), ky(!0);
    }
  }
  return hl(), r;
}
function Ay(e) {
  let t = Be, r = lt[Be];
  if (r === 39) return Be++, { kind: "blank", span: wr(t) };
  if (r === 38) return Be++, hl(), { kind: "comment", span: wr(t) };
  let a = e ? g_() : r === 2 ? vy(!1) : ky(!1);
  if (a.span = [Zt[t], py], a.edges) for (let s of a.edges) s.span = a.span;
  return a;
}
function m_(e, t) {
  sr = e, { types: lt, starts: Zt, ends: nr } = l_(e), Be = 0, Vt = s_(), Vo = void 0, bo = [], gy = 0, my = 0;
  try {
    let r = Gt(1);
    hl();
    let a = [];
    for (; (Wr[lt[Be]] & ny) !== 0; ) a.push(Ay(!0));
    lt[Be] !== 0 && Ah(`Redundant input, expecting EOF but found: ${Pt(Be)}`);
    for (let [s, l] of bo) {
      let n = c_(Pt(l), () => zs(e, Zt[l]));
      s.value = n.value, s.propertyOrder = n.propertyOrder;
    }
    return o_(e, Vt, wr(r), a, t);
  } finally {
    sr = "", lt = Zt = nr = bo = [];
  }
}
var y_ = { normal: "usecaseActor", hollow: "usecaseActorHollow", awesome: "usecaseActorAwesome", icon: "usecaseActorIcon" }, Cd = [["none", "arrow_point"], ["arrow_point", "none"], ["none", "none"], ["none", "arrow_circle"], ["none", "arrow_cross"], ["arrow_circle", "none"], ["arrow_cross", "none"]];
function zg(e) {
  return typeof e == "string" ? e : e === null ? "null" : String(e);
}
function x_(e) {
  let t = [], r = [[e.value, "", ""]], a = [];
  for (; r.length > 0; ) {
    let [s, l, n] = r.pop();
    if (a.length = 0, Array.isArray(s)) s.length === 0 ? t.push({ key: l, accessibleKey: l, value: "[]" }) : s.every((i) => i === null || typeof i != "object") ? s.forEach((i, o) => t.push({ key: o === 0 ? l : "", accessibleKey: l, value: zg(i) })) : s.forEach((i, o) => a.push([i, `${l}[${o}]`, `${n}/${o}`]));
    else if (s !== null && typeof s == "object") {
      let i = s, o = e.propertyOrder.get(n) ?? Object.keys(i);
      o.length === 0 && t.push({ key: l, accessibleKey: l, value: "{}" });
      for (let h of o) a.push([Object.prototype.hasOwnProperty.call(i, h) ? i[h] : void 0, l ? `${l}.${h}` : h, `${n}/${h.replaceAll("~", "~0").replaceAll("/", "~1")}`]);
    } else t.push({ key: l, accessibleKey: l, value: zg(s) });
    for (let i = a.length - 1; i >= 0; i--) r.push(a[i]);
  }
  return t;
}
function Ui(...e) {
  return e.filter(Boolean).join(" ");
}
function w_(e) {
  return e.type === "generalization" ? ["none", "extension"] : e.type !== "association" ? Cd[0] : Cd[e.arrowType] ?? Cd[2];
}
function $_(e) {
  let t = [], r = [], a = (s) => {
    let l = /* @__PURE__ */ new Map();
    for (let n of ["default", ...s]) {
      let i = e.classDefs.get(n);
      if (i) for (let o of i.styles) {
        let h = o.trim(), c = h.indexOf(":"), u = (c === -1 ? h : h.slice(0, c)).trim();
        u && l.set(u, h);
      }
    }
    return [...l.values()];
  };
  for (let s of e.actors.values()) t.push({ id: s.id, label: s.label, labelType: s.labelType, shape: y_[s.type], isGroup: !1, padding: 10, cssClasses: Ui("default", "usecase-actor", `usecase-actor-${s.type}`, s.business && "usecase-business", ...s.classes), cssStyles: [...s.styles], cssCompiledStyles: a(s.classes), actorType: s.type, business: s.business, icon: s.icon || void 0, stereotype: s.stereotype || void 0, parentId: s.parentId || void 0 });
  for (let s of e.useCases.values()) {
    let l = s.shape === "ellipse";
    t.push({ id: s.id, label: s.label, labelType: s.labelType, shape: l ? s.business ? "usecaseBusiness" : "usecaseEllipse" : "rect", isGroup: !1, padding: l ? 20 : 10, cssClasses: Ui("default", "usecase-element", `usecase-${s.shape}`, s.business && "usecase-business", ...s.classes), cssStyles: [...s.styles], cssCompiledStyles: a(s.classes), business: s.business, stereotype: s.stereotype || void 0, parentId: s.parentId || void 0 });
  }
  for (let s of e.notes.values()) t.push({ id: s.id, label: s.label, labelType: s.labelType, shape: "note", isGroup: !1, padding: 10, cssClasses: "default usecase-note", cssStyles: [], cssCompiledStyles: a([]), noteTarget: s.target });
  for (let s of e.jsonNodes.values()) t.push({ id: s.id, label: s.id, labelType: "text", shape: "usecaseJsonTable", isGroup: !1, padding: 10, cssClasses: Ui("default", "usecase-json-table", ...s.classes), cssStyles: [...s.styles], cssCompiledStyles: a(s.classes), jsonRows: x_(s) });
  for (let s of e.systemBoundaries.values()) t.push({ id: s.id, label: s.label, labelType: s.labelType, shape: "usecaseSystemBoundary", isGroup: !0, padding: 20, cssClasses: Ui("default", "system-boundary", `system-boundary-${s.type}`, ...s.classes), cssStyles: [...s.styles], cssCompiledStyles: a(s.classes), boundaryType: s.type });
  for (let s of e.relationships) {
    let l = s.type === "include" || s.type === "extend", [n, i] = w_(s), o = s.animate || s.animation !== void 0, h = { id: s.id, start: s.source, end: s.target, relationshipType: s.type, pattern: l ? "dotted" : "solid", arrowTypeStart: n, arrowTypeEnd: i, classes: Ui("default", "relationship", `relationship-${s.type}`, ...s.classes, o && `edge-animation-${s.animation ?? "fast"}`), style: [...s.styles], cssCompiledStyles: a(s.classes), animate: s.animate, animation: s.animation, minlen: s.minlen, explicitId: s.explicitId, internal: !1 };
    l ? (h.label = s.type, h.labelType = "text") : s.type === "association" && (s.label && (h.label = s.label), s.labelType && (h.labelType = s.labelType)), r.push(h);
  }
  for (let s of e.notes.values()) r.push({ id: `${s.id}-edge`, start: s.id, end: s.target, relationshipType: "note", pattern: "dotted", arrowTypeStart: "none", arrowTypeEnd: "none", classes: "default relationship relationship-note", style: [], cssCompiledStyles: a([]), animate: !1, minlen: 1, explicitId: !1, internal: !0 });
  return { nodes: t, edges: r };
}
var b_ = 32, M_ = 16, v_ = 72, Vn = 20, Sd = 26, fu = 40, xs = 60, Pg = 6, _d = 6, Yi = 10, Id = 8, Kn = 9, Mo = 12, k_ = 14, ws = ' fill="var(--_s)" stroke="var(--_b)"';
function Wg(e, t, r) {
  let a = e.usecase?.[t];
  return typeof a == "number" && a > 0 ? Math.min(a, 2e3) : r;
}
function A_(e) {
  return e.replace(/[&<>\\]/g, (t) => `&#${t.charCodeAt(0)};`);
}
function ba(e, t, r, a, s, l = 0) {
  return je(e && !t ? A_(e) : e, t, r, a, s, l);
}
function Df(e, t, r, a) {
  let s = r === 1 || r === 2 ? 1 : -1, l = r === 1 || r === 3, n = (l ? e.w : e.h) / 2, i = 0;
  if (e.kind === 0) l ? (n = fu / 2 + 3, i = (xs - e.h) / 2) : n += 2;
  else if (e.kind === 1) {
    let o = (l ? e.h : e.w) / 2;
    n *= Math.sqrt(Math.max(1 - (a / o) ** 2, 0));
  }
  return l ? [t.x + s * n, t.y + i + a] : [t.x + a, t.y + s * n];
}
function Ey(e, t) {
  let r = t === 1 || t === 3;
  if (e.kind === 0) return r ? xs * 0.5 : fu * 0.6;
  let a = r ? e.h : e.w;
  return e.kind === 1 ? a * 0.6 : a - 16;
}
function E_(e, t, r) {
  let a = /* @__PURE__ */ new Map(), s = (l, n, i, o) => {
    let h = t[l];
    if (h.isGroup) return;
    let c = n[i] - h.x, u = n[i + 1] - h.y, d;
    if (Math.abs(Math.abs(u) - h.h / 2) < 0.5) d = u < 0 ? 0 : 2;
    else if (Math.abs(Math.abs(c) - h.w / 2) < 0.5) d = c < 0 ? 3 : 1;
    else return;
    let p = l * 4 + d, g = { route: n, at: i, toward: n[o + (d & 1 ? 1 : 0)] }, y = a.get(p);
    y ? y.push(g) : a.set(p, [g]);
  };
  for (let l of e) {
    let n = l.route.length - 3;
    l.src === l.dst || n < 3 || (s(l.src, l.route, 0, 3), s(l.dst, l.route, n, n - 3));
  }
  for (let [l, n] of a) {
    let i = l >> 2, o = l & 3, h = r[i], c = n.length > 1 ? Math.min(k_, Ey(h, o) / (n.length - 1)) : 0;
    n.sort((u, d) => u.toward - d.toward);
    for (let u = 0; u < n.length; u++) {
      let [d, p] = Df(h, t[i], o, (u - (n.length - 1) / 2) * c);
      n[u].route[n[u].at] = d, n[u].route[n[u].at + 1] = p;
    }
  }
}
function T_(e, t, r, a, s) {
  let l = e - r * Mo, n = t - a * Mo, i = Mo * 0.5;
  return `<path class="pele-marker" d="M${f(e)},${f(t)}L${f(l - a * i)},${f(n + r * i)}L${f(l + a * i)},${f(n - r * i)}Z" fill="var(--_bg)" stroke="${s}" stroke-linejoin="round"/>`;
}
function Xn(e) {
  return e === "extension" ? Mo : Ct(e);
}
function Zn(e, t, r, a, s, l, n) {
  return e === "extension" ? T_(t, r, a, s, l) : St(e, t, r, a, s, l, n);
}
function C_(e, t) {
  let r = e.node, a = e.style.shape, s = ` fill="none" stroke="var(--_b)"${e.style.line}`, l = -21, n = 9, i;
  return r.actorType === "hollow" ? (n = 8, i = `<circle cy="-21" r="8" fill="var(--_bg)" stroke="var(--_b)"${a}/><path d="M-20,-9H20V0H5.5L20,15.5L12,25.5L0,12L-12,25.5L-20,15.5L-5.5,0H-20Z" fill="var(--_bg)" stroke="var(--_b)" stroke-linejoin="round"${a}/>`) : r.actorType === "awesome" ? i = `<path d="M0,-30A11,11 0 1 1 0,-8A11,11 0 1 1 0,-30ZM-20,25C-20,9 -12,-3 0,-3C12,-3 20,9 20,25C20,28 18,30 15,30H-15C-18,30 -20,28 -20,25Z" fill="var(--_b)"${a}/>` : r.actorType === "icon" ? (l = -14, n = 12, i = `<rect x="-22" y="-26" width="44" height="44"${Et(ws + a)}/><svg class="pele-icon" data-icon="${Ye(r.icon ?? "")}" x="-14" y="-18" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t?.(r.icon ?? "") ?? ""}</svg>`) : i = `<circle cy="-21" r="9"${ws}${a}/><path d="M0,-12V10M-14,-3H14M0,10L-12,30M0,10L12,30"${s}/>`, r.business && (i += `<path class="pele-business" d="M${f(0.12 * n)},${f(l + 0.99 * n)}L${f(0.92 * n)},${f(l - 0.39 * n)}"${s}/>`), i;
}
function S_(e, t, r) {
  return ul(e.direction) ? ur(r, (a) => Bg(e, t, r, a)) : Bg(e, t, r, !1);
}
function Bg(e, t, r, a) {
  let s = $_(e), l = r.fontSize ?? 16, n = Math.round(l * 0.875), i = Math.round(l * 0.8125), o = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), h = r.padding ?? 8, c = r.icons, u = a ? "TB" : zr(e.direction), d = u === "LR" || u === "RL", p = /* @__PURE__ */ new Map(), g = [], y = [];
  s.nodes.forEach((A, m) => p.set(A.id, m));
  for (let A of s.nodes) {
    let m = Dt(A.cssStyles.length > 0 ? A.cssCompiledStyles.concat(A.cssStyles) : A.cssCompiledStyles), I = (m.bold ? 1 : 0) | (m.italic ? 2 : 0), k = m.fontSize ?? l, w = A.labelType === "markdown", B = ba(A.stereotype && `«${A.stereotype}»`, !1, o, i, 200, I), N = { node: A, kind: 2, style: m, label: B, stereotype: B, w: 0, h: 0, rows: [], keyW: 0, headH: 0, loops: 0 }, j;
    if (A.isGroup) {
      N.kind = 4, N.label = ba(A.label, w, o, k, 4e3, I);
      let F = N.label.height;
      j = Wt(0, 0), j.isGroup = !0, j.padX = Vn, j.padBottom = Vn, j.padTop = A.boundaryType === "package" ? F + 2 * _d + 16 : F > 0 ? F + 16 : Vn, j.minW = N.label.width + 2 * Vn;
    } else {
      if (A.jsonRows) {
        N.kind = 3, N.label = ba(A.label, !1, o, k, 4e3, I | 1);
        let F = 0;
        for (let Y of A.jsonRows) {
          let W = ba(Y.key, !1, o, n, 4e3, I), K = ba(Y.value, !1, o, n, 260, I);
          N.rows.push([W, K]), N.keyW = Math.max(N.keyW, W.width), F = Math.max(F, K.width), N.h += Math.max(W.height, K.height, Math.round(n * 1.5)) + Id;
        }
        N.keyW > 0 && (N.keyW += 2 * Yi), N.headH = Math.max(N.label.height, Math.round(k * 1.5)) + Id, N.w = Math.max(N.label.width + 2 * Yi, N.rows.length > 0 ? N.keyW + F + 2 * Yi : 0, 72), N.h += N.headH;
      } else if (A.actorType) N.kind = 0, N.label = ba(A.label, w, o, k, 140, I), N.w = Math.max(fu, N.label.width, B.width), N.h = xs + Pg + B.height + N.label.height;
      else {
        N.label = ba(A.label, w, o, A.shape === "note" ? n : k, 180, I);
        let F = Math.max(N.label.width, B.width), Y = N.label.height + B.height;
        A.shape === "usecaseEllipse" || A.shape === "usecaseBusiness" ? (N.kind = 1, N.w = Math.max(F + 2 * A.padding + (A.business ? 16 : 4), 88), N.h = Math.max(Y + 28, 48)) : A.shape === "note" ? (N.w = F + 2 * A.padding + 6, N.h = Y + 18) : (N.w = Math.max(F + 2 * A.padding + 12, 80), N.h = Math.max(Y + 24, 44));
      }
      j = Wt(N.w, N.h);
    }
    j.seq = g.length, g.push(N), y.push(j);
  }
  s.nodes.forEach((A, m) => {
    y[m].parent = A.parentId !== void 0 ? p.get(A.parentId) ?? -1 : -1;
  });
  let b = [], x = [], v = [];
  for (let A of s.edges) {
    let m = p.get(A.start), I = p.get(A.end);
    if (m === void 0 || I === void 0) continue;
    let k = A.relationshipType === "include" || A.relationshipType === "extend", w = ba(k ? `«${A.label}»` : A.label, A.labelType === "markdown", o, n, 200);
    m === I && (g[m].loops++, d ? y[m].h += 2 * (Sd + (w.height > 0 ? w.height + 8 : 0)) : y[m].w += 2 * (Sd + (w.width > 0 ? w.width + 12 : 0))), v.push(A), x.push(w), b.push({ src: m, dst: I, minlen: A.minlen, labelW: w.width > 0 ? w.width + 12 : 0, labelH: w.height > 0 ? w.height + 4 : 0, route: [], labelX: 0, labelY: 0 });
  }
  let $ = cl(y, b, u, { nodeSep: Wg(t, "nodeSpacing", b_), edgeSep: M_, rankSep: Wg(t, "rankSpacing", v_), portSep: 20 }), S = ma(e.title, o, l, 4e3), R = S.height > 0 ? S.height + 12 : 0, D = Math.max($.width, S.width), O = h + (D - $.width) / 2, U = h + R;
  _s(y, b, O, U);
  let q = Math.ceil(D + 2 * h), C = Math.ceil($.height + R + 2 * h), ee = /* @__PURE__ */ new Map();
  for (let A of b) ei(ee, A.route);
  E_(b, y, g);
  let ie = "", G = [], z = "";
  for (let A = 0; A < g.length; A++) {
    let m = g[A], I = y[A], k = m.node, w = Ht(k.cssClasses.replace(/^default\s?/, "")), B = Ye(k.id), N = m.style.text, j = m.style.shape, F = Xt(m.style), Y = F || ' fill="var(--_m)"', W = m.w, K = m.h;
    if (m.kind === 4) {
      let Q = I.x - I.w / 2, L = I.y - I.h / 2;
      Ia(j) && G.push({ box: [Q, L, Q + I.w, L + I.h], shape: j });
      let X = ` fill="var(--_a)"${fl(j) ? "" : ' fill-opacity="0.5"'} stroke="var(--_b)"${j}`, le = ` class="pele-cluster-label"${Y}${N}`, J;
      if (k.boundaryType === "package") {
        let V = Math.min(m.label.width + 2 * _d + 8, I.w), Z = m.label.height + 2 * _d;
        J = `<rect class="pele-boundary-tab" x="${f(Q)}" y="${f(L)}" width="${f(V)}" height="${f(Z)}"${X}/><rect x="${f(Q)}" y="${f(L + Z)}" width="${f(I.w)}" height="${f(I.h - Z)}"${X}/>` + Pe(m.label, Q + V / 2, L + Z / 2, le, c);
      } else J = `<rect x="${f(Q)}" y="${f(L)}" width="${f(I.w)}" height="${f(I.h)}"${Et(X)}/>` + Pe(m.label, __(I, m.label.width, ee), L + 8 + m.label.height / 2, le, c);
      ie += `<g class="pele-cluster pele-boundary${w}" data-id="${B}">${J}</g>`;
      continue;
    }
    let H, te;
    if (m.kind === 0) {
      te = "pele-actor";
      let Q = -K / 2, L = Q + xs + Pg + m.stereotype.height / 2;
      H = `<g class="pele-actor-figure" transform="translate(0,${f(Q + xs / 2)})">${C_(m, c)}</g>` + Pe(m.stereotype, 0, L, ` class="pele-stereotype" font-size="${i}" fill="var(--_m)"`, c) + Pe(m.label, 0, K / 2 - m.label.height / 2, ` class="pele-label"${N}`, c);
    } else if (m.kind === 3) {
      te = "pele-json";
      let Q = -W / 2, L = -K / 2 + m.headH, X = "", le = `M${f(Q)},${f(L)}H${f(Q + W)}`;
      m.keyW > 0 && (le += `M${f(Q + m.keyW)},${f(L)}V${f(K / 2)}`);
      for (let [J, V] of m.rows) {
        let Z = Math.max(J.height, V.height, Math.round(n * 1.5)) + Id;
        X += Pe(J, Q + Yi + J.width / 2, L + Z / 2, ` class="pele-json-key"${Y}`, c) + I_(V, Q + m.keyW + Yi, L + Z / 2, ` class="pele-json-value"${F}${N}`, c), L += Z;
      }
      H = `<rect x="${f(Q)}" y="${f(-K / 2)}" width="${f(W)}" height="${f(K)}"${Et(ws + j)}/><path class="pele-json-lines" d="${le}" fill="none" stroke="var(--_b)"${m.style.line}/>` + Pe(m.label, 0, -K / 2 + m.headH / 2, ` class="pele-label" font-weight="var(--_hw)"${F}${N}`, c) + `<g font-size="${n}">${X}</g>`;
    } else {
      let Q = m.stereotype.height / 2, L;
      if (m.kind === 1) {
        if (te = "pele-usecase", L = `<ellipse rx="${f(W / 2)}" ry="${f(K / 2)}"${ws}${j}/>`, k.business) {
          let X = W / 2 - 15, le = W / 2 - 5, J = (V) => K / 2 * Math.sqrt(1 - (V / (W / 2)) ** 2);
          L += `<path class="pele-business" d="M${f(X)},${f(J(X))}L${f(le)},${f(-J(le))}" fill="none" stroke="var(--_b)"${m.style.line}/>`;
        }
      } else if (k.shape === "note") {
        te = "pele-note";
        let X = W / 2, le = K / 2;
        L = `<path d="M${f(-X)},${f(-le)}H${f(X - Kn)}L${f(X)},${f(Kn - le)}V${f(le)}H${f(-X)}Z" fill="var(--_a)" stroke="var(--_b)" stroke-linejoin="round"${j}/><path d="M${f(X - Kn)},${f(-le)}V${f(Kn - le)}H${f(X)}" fill="none" stroke="var(--_b)" stroke-linejoin="round"${m.style.line}/>`;
      } else te = "pele-usecase", L = `<rect x="${f(-W / 2)}" y="${f(-K / 2)}" width="${f(W)}" height="${f(K)}"${Et(ws + j)}/>`;
      H = L + Pe(m.stereotype, 0, -m.label.height / 2, ` class="pele-stereotype" font-size="${i}"${Y}`, c) + Pe(m.label, 0, Q, ` class="pele-label"${k.shape === "note" ? ` font-size="${n}"` : ""}${F}${N}`, c);
    }
    z += `<g class="pele-node ${te}${w}" data-id="${B}" transform="translate(${f(I.x)},${f(I.y)})">${H}</g>`;
  }
  let _ = "", T = "", E = "", M = /* @__PURE__ */ new Map();
  for (let A = 0; A < b.length; A++) {
    let m = b[A], I = v[A], k = x[A], w = I.style.length > 0 || I.cssCompiledStyles.length > 0 ? Dt(I.cssCompiledStyles.concat(I.style)) : void 0, B = I.arrowTypeStart, N = I.arrowTypeEnd, j;
    if (m.src === m.dst) {
      let te = y[m.src], Q = g[m.src], L = M.get(m.src) ?? 0;
      M.set(m.src, L + 1);
      let X = d ? 2 : 1, le = Math.min(Ey(Q, X) / 2, 8 + L * 6), J = Sd + L * 8, [V, Z] = Df(Q, te, X, -le), [ae, oe] = Df(Q, te, X, le), ue = Math.hypot(J, le) || 1, he = d ? le / ue : J / ue, re = d ? J / ue : le / ue, P = Xn(B), ne = Xn(N), ce = (Ae, Ee, me, we) => d ? `${f(Ae + me * le * (we ? 1 : 0))},${f(Ee + we)}` : `${f(Ae + we)},${f(Ee + me * le * (we ? 1 : 0))}`, pe = d ? V - he * P : V + he * P, Me = d ? Z + re * P : Z - re * P, xe = ae + he * ne, ve = oe + re * ne;
      j = { d: `M${f(pe)},${f(Me)}C${ce(V, Z, -1, J)} ${ce(ae, oe, 1, J)} ${f(xe)},${f(ve)}`, sx: V, sy: Z, sdx: d ? he : -he, sdy: d ? -re : re, ex: ae, ey: oe, edx: -he, edy: -re }, d ? (m.labelX = te.x, m.labelY = Math.max(Z, oe) + J * 0.75 + 6 + k.height / 2) : (m.labelX = Math.max(V, ae) + J * 0.75 + 8 + k.width / 2, m.labelY = te.y);
    } else {
      if (m.route.length < 6) continue;
      j = Na(m.route, void 0, Xn(B), Xn(N));
    }
    let F = Hf(j.d, [j.sx, j.sy, j.ex, j.ey], G, j.tokens), Y = F && Uf(F, w?.line), W = Y || (w?.stroke ? it(w.stroke) : "var(--_l)");
    if (Y === "") {
      let te = "var(--_bg)";
      _ += Yf(j.d, Zn(B, j.sx, j.sy, j.sdx, j.sdy, te, te) + Zn(N, j.ex, j.ey, j.edx, j.edy, te, te), w?.line);
    }
    let K = I.internal ? "2 3" : I.pattern === "dotted" ? "5 4" : I.animate ? "9 5" : "", H = Zn(B, j.sx, j.sy, j.sdx, j.sdy, W) + Zn(N, j.ex, j.ey, j.edx, j.edy, W);
    if (T += `<g class="pele-edge pele-${I.relationshipType}${Ht(I.classes.replace(/^default relationship relationship-\S+\s?/, ""))}" data-id="${Ye(I.id)}"${Y ? ` stroke="${Y}"` : ""}${w?.line ?? ""}><path d="${j.d}"${K ? ` stroke-dasharray="${K}"` : ""}/>` + (F && Y ? tf(H, F) : H) + "</g>", k.width > 0) {
      let te = m.labelX, Q = m.labelY, L = I.relationshipType === "include" || I.relationshipType === "extend";
      E += ga(I.id, k, te, Q, (L ? ' fill="var(--_m)"' : "") + (w?.text ?? ""), c);
    }
  }
  return { svg: xt("usecase", q, C, l, r, e, Pe(S, q / 2, h + S.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (ie ? `<g class="pele-clusters">${ie}</g>` : "") + dl(_) + (T ? `<g class="pele-edges" fill="none" stroke="var(--_l)" stroke-linecap="round">${T}</g>` : "") + (E ? `<g class="pele-edge-labels" font-size="${n}">${E}</g>` : "") + `<g class="pele-nodes">${z}</g>`), width: q, height: C, links: [] };
}
function __(e, t, r) {
  let a = r.get(Math.round(e.y - e.h / 2));
  if (t === 0 || a === void 0) return e.x;
  let s = e.x - e.w / 2 + 6, l = e.x + e.w / 2 - 6, n = a.filter((d) => d > s && d < l).sort((d, p) => d - p);
  n.push(l);
  let i = t / 2 + 6, o = e.x, h = 1 / 0, c = 0, u = s;
  for (let d of n) {
    if (d - u >= 2 * i) {
      let p = Math.min(Math.max(e.x, u + i), d - i);
      Math.abs(p - e.x) < h && (h = Math.abs(p - e.x), o = p);
    } else h === 1 / 0 && d - u > c && (c = d - u, o = (u + d) / 2);
    u = d;
  }
  return o;
}
function I_(e, t, r, a, s) {
  if (e.lines.length < 2) return Pe(e, t + e.width / 2, r, a, s);
  let l = "";
  for (let n = 0; n < e.lines.length; n++) l += Pe(Ds(e, n), t + e.widths[n] / 2, r - e.height / 2 + Rs(e, n), a, s);
  return l;
}
var N_ = { type: "usecase", math: !0, parse: (e, t, r) => m_(e, r), render: S_ };
function Ja(e) {
  let t = e.trim();
  return t.length >= 2 && t.startsWith('"') && t.endsWith('"') ? t.slice(1, -1) : t;
}
function Nd(e) {
  return e.map(Ja).sort();
}
var R_ = class {
  type = "venn";
  title;
  subsets = [];
  textNodes = [];
  styles = [];
  known = /* @__PURE__ */ new Set();
  current;
  indent = !1;
  setDiagramTitle(e) {
    this.title = e;
  }
  addSubsetData(e, t, r) {
    let a = Nd(e);
    this.current = a, a.length === 1 && this.known.add(a[0]), this.subsets.push({ sets: a, size: r ?? 10 / e.length ** 2, label: t ? Ja(t) : void 0 });
  }
  addTextData(e, t, r) {
    this.textNodes.push({ sets: Nd(e), id: Ja(t), label: r ? Ja(r) : void 0 });
  }
  addStyleData(e, t) {
    let r = /* @__PURE__ */ new Map();
    for (let [a, s] of t) r.set(a, s && Ja(s));
    this.styles.push({ targets: Nd(e), styles: r });
  }
  validateUnionIdentifiers(e) {
    let t = e.map(Ja).filter((r) => !this.known.has(r));
    if (t.length > 0) throw new at(`unknown set identifier: ${t.join(", ")}`, "semantic", { type: "venn" });
  }
  getCurrentSets() {
    return this.current;
  }
  getIndentMode() {
    return this.indent;
  }
  setIndentMode(e) {
    this.indent = e;
  }
}, Gg = ["$end", "INVALID", "EOF", "NEWLINE", "VENN", "TITLE", "SET", "UNION", "TEXT", "INDENT_TEXT", "STYLE", "BRACKET_LABEL", "NUMERIC", "HEXCOLOR", "RGBCOLOR", "RGBACOLOR", "IDENTIFIER", "STRING", "COMMA", "COLON"], D_ = [["venn-beta", 4], ["set", 6], ["union", 7], ["text", 8], ["style", 10]], L_ = class {
  constructor(e, t) {
    this.src = e, this.host = t;
  }
  src;
  host;
  text = "";
  start = 0;
  at = 0;
  lineStart = !1;
  ended = !1;
  word(e, t) {
    let r = this.src;
    for (let a = 0; a < t.length; a++) {
      let s = r.charCodeAt(e + a), l = t.charCodeAt(a);
      if (s !== l && (s + 32 !== l || s < 65 || s > 90)) return !1;
    }
    return !0;
  }
  keyword(e, t) {
    return this.word(e, t) && !nt(this.src.charCodeAt(e + t.length));
  }
  color(e, t) {
    let r = this.src, a = e + 1;
    for (let s = 0; s < t; s++) {
      for (; Ke(r.charCodeAt(a)); ) a++;
      let l = a;
      for (; yt(r.charCodeAt(a)) || r.charCodeAt(a) === 46; ) a++;
      if (a === l) return -1;
      for (; Ke(r.charCodeAt(a)); ) a++;
      if (r.charCodeAt(a) !== (s === t - 1 ? 41 : 44)) return -1;
      a++;
    }
    return a;
  }
  afterLineFeed(e) {
    let t = e - 1;
    for (; this.src.charCodeAt(t) === 32 || this.src.charCodeAt(t) === 9; ) t--;
    return this.src.charCodeAt(t) === 10;
  }
  lineEnd(e) {
    let t = this.src.indexOf(`
`, e);
    return t === -1 ? this.src.length : t;
  }
  next() {
    let e = this.src, t = e.length;
    for (; ; ) {
      let r = this.at;
      if (this.start = r, this.text = "", r >= t) return this.ended ? 0 : (this.ended = !0, 2);
      let a = e.charCodeAt(r);
      if (a === 37 && e.charCodeAt(r + 1) === 37 && e.charCodeAt(r + 2) !== 123) {
        this.at = this.lineEnd(r + 2);
        continue;
      }
      if (this.lineStart && this.word(r, "title") && this.afterLineFeed(r) && e.slice(r + 5, this.lineEnd(r + 5)).trim() === "") {
        let s = this.lineEnd(r + 5);
        for (; e.charCodeAt(s) === 10 || e.charCodeAt(s) === 13; ) s++;
        this.at = s;
        continue;
      }
      if (this.lineStart) {
        if (a === 32 || a === 9) {
          let s = r + 1;
          for (; e.charCodeAt(s) === 32 || e.charCodeAt(s) === 9; ) s++;
          if (this.at = s, this.keyword(s, "text") && this.host.getIndentMode()) return this.at = s + 4, this.lineStart = !1, this.text = e.slice(r, s), 9;
          continue;
        }
        a !== 10 && a !== 13 && (this.host.setIndentMode(!1), this.lineStart = !1);
      }
      if (a === 10 || a === 13) {
        for (r++; e.charCodeAt(r) === 10 || e.charCodeAt(r) === 13; ) r++;
        return this.lineStart = !0, this.token(3, r);
      }
      if (a === 37 && e.charCodeAt(r + 1) === 37) {
        this.at = this.lineEnd(r);
        continue;
      }
      if (a === 32 || a === 9) {
        for (r++; e.charCodeAt(r) === 32 || e.charCodeAt(r) === 9; ) r++;
        this.at = r;
        continue;
      }
      if ((a | 32) >= 97 && (a | 32) <= 122 || a === 95) {
        let s = e.charCodeAt(r + 5);
        if (this.word(r, "title") && Ke(s) && s !== 10 && s !== 13) {
          let l = r + 6;
          for (; l < t; ) {
            let n = e.charCodeAt(l);
            if (n === 35 || n === 10 || n === 59) break;
            l++;
          }
          if (l > r + 6) return this.token(5, l);
        }
        for (let [l, n] of D_) if (this.keyword(r, l) && e.charCodeAt(r + l.length) !== 45) return this.token(n, r + l.length);
        if (this.word(r, "rgb")) {
          let l = (e.charCodeAt(r + 3) | 32) === 97, n = r + (l ? 4 : 3), i = e.charCodeAt(n) === 40 ? this.color(n, l ? 4 : 3) : -1;
          if (i !== -1) return this.token(l ? 15 : 14, i);
        }
        for (r++; nt(e.charCodeAt(r)) || e.charCodeAt(r) === 45; ) r++;
        return this.token(16, r);
      }
      if (a === 91) {
        if (e.charCodeAt(r + 1) === 34) {
          let l = e.indexOf('"', r + 2);
          return l === -1 || e.charCodeAt(l + 1) !== 93 ? 1 : (this.at = l + 2, this.text = e.slice(r + 2, l), 11);
        }
        let s = r + 1;
        for (; s < t && e.charCodeAt(s) !== 93 && e.charCodeAt(s) !== 34; ) s++;
        return s === r + 1 || e.charCodeAt(s) !== 93 ? 1 : (this.at = s + 1, this.text = e.slice(r + 1, s).trim(), 11);
      }
      if (yt(a) || a === 46 || a === 43 || a === 45) {
        (a === 43 || a === 45) && r++;
        let s = r;
        for (; yt(e.charCodeAt(r)); ) r++;
        if (r > s) {
          if (e.charCodeAt(r) === 46 && yt(e.charCodeAt(r + 1))) for (r += 2; yt(e.charCodeAt(r)); ) r++;
        } else if (e.charCodeAt(r) === 46 && yt(e.charCodeAt(r + 1))) for (r += 2; yt(e.charCodeAt(r)); ) r++;
        else return 1;
        return this.token(12, r);
      }
      if (a === 35) {
        let s = r + 1;
        for (; s < r + 9 && p2(e.charCodeAt(s)); ) s++;
        return s >= r + 4 ? this.token(13, s) : 1;
      }
      if (a === 34) {
        let s = e.indexOf('"', r + 1);
        return s === -1 ? 1 : this.token(17, s + 1);
      }
      return a === 44 ? this.token(18, r + 1) : a === 58 ? this.token(19, r + 1) : 1;
    }
  }
  token(e, t) {
    return this.text = this.src.slice(this.at, t), this.at = t, e;
  }
}, O_ = "'EOF', 'NEWLINE', 'TITLE', 'SET', 'UNION', 'TEXT', 'INDENT_TEXT', 'STYLE'", F_ = "'NUMERIC', 'IDENTIFIER', 'STRING', 'HEXCOLOR', 'RGBCOLOR', 'RGBACOLOR'";
function z_(e, t) {
  let r = new L_(e, t), a = -1, s = () => a === -1 ? a = r.next() : a, l = (p) => {
    throw s() === 1 ? bt("venn", e, r.start, "", !0) : bt("venn", e, r.start, `Expecting ${p}, got '${Gg[a]}'`);
  }, n = () => (a = -1, r.text), i = (p) => (s() !== p && l(`'${Gg[p]}'`), n()), o = () => (s() !== 16 && a !== 17 && l("'IDENTIFIER', 'STRING'"), n()), h = () => {
    let p = [o()];
    for (; s() === 18; ) n(), p.push(o());
    return p;
  }, c = (p, g) => {
    let y = s() === 11 ? n() : void 0, b;
    if (s() === 19 && (n(), b = parseFloat(i(12))), g) {
      if (p.length < 2) throw new at("union requires multiple identifiers", "semantic", { type: "venn" });
      t.validateUnionIdentifiers(p);
    }
    t.addSubsetData(p, y, b), t.setIndentMode(!0);
  }, u = (p) => {
    let g = s();
    g !== 16 && g !== 17 && g !== 12 && l("'NUMERIC', 'IDENTIFIER', 'STRING'");
    let y = n(), b = g !== 12 && s() === 11 ? n() : void 0;
    t.addTextData(p(), y, b);
  }, d = () => {
    let p = h(), g = [];
    for (; ; ) {
      let y = i(16);
      i(19);
      let b;
      if (s() === 17) b = n();
      else {
        let x = [];
        for (; s() === 16 || a >= 12 && a <= 15; ) x.push(n());
        x.length === 0 && l(F_), b = x.join(" ");
      }
      if (g.push([y, b]), s() !== 18) break;
      n();
    }
    t.addStyleData(p, g);
  };
  for (; s() === 3; ) n();
  for (i(4); ; ) {
    let p = s();
    if (p === 2) return;
    if ((p < 3 || p > 10 || p === 4) && l(O_), n(), p === 5) t.setDiagramTitle(r.text.slice(6));
    else if (p === 6) c([o()], !1);
    else if (p === 7) c(h(), !0);
    else if (p === 8) {
      let g = h();
      u(() => g);
    } else p === 9 ? u(() => {
      let g = t.getCurrentSets();
      if (!g) throw new at("text requires set", "semantic", { type: "venn" });
      return g;
    }) : p === 10 && d();
  }
}
var Xo = Math.PI * 2;
function P_(e) {
  let t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
  for (let s of e) t.add(JSON.stringify([...s.sets].sort())), s.sets.length === 1 && r.set(s.sets[0], s.size);
  let a = [];
  for (let s of e) {
    if (s.sets.length < 3) continue;
    let l = [...s.sets].sort();
    for (let n = 0; n < l.length - 1; n++) for (let i = n + 1; i < l.length; i++) {
      let o = [l[n], l[i]], h = JSON.stringify(o);
      if (t.has(h)) continue;
      t.add(h);
      let c = r.get(o[0]), u = r.get(o[1]);
      a.push({ sets: o, size: c !== void 0 && u !== void 0 ? Math.min(c, u) / 4 : 2.5, label: "" });
    }
  }
  return a.length > 0 ? [...e, ...a] : e;
}
function W_(e, t, r) {
  if (r >= e + t) return 0;
  let a = Math.min(e, t);
  if (r <= Math.abs(e - t)) return Math.PI * a * a;
  let s = e * e * Math.acos((r * r + e * e - t * t) / (2 * r * e)), l = t * t * Math.acos((r * r + t * t - e * e) / (2 * r * t)), n = 0.5 * Math.sqrt(Math.max((-r + e + t) * (r + e - t) * (r - e + t) * (r + e + t), 0));
  return s + l - n;
}
function B_(e, t, r) {
  let a = Math.abs(e - t), s = e + t;
  if (!(r > 0)) return s;
  if (r >= Math.PI * Math.min(e, t) ** 2) return a;
  for (let l = 0; l < 48; l++) {
    let n = (a + s) / 2;
    W_(e, t, n) > r ? a = n : s = n;
  }
  return (a + s) / 2;
}
function Hg(e, t, r, a, s, l) {
  let n = 1 / 0;
  for (let i of t) {
    let o = e[i], h = a - o.x, c = s - o.y, u = o.r - Math.sqrt(h * h + c * c);
    if (u < n) {
      if (u < l) return u;
      n = u;
    }
  }
  for (let i of r) {
    let o = e[i], h = a - o.x, c = s - o.y, u = Math.sqrt(h * h + c * c) - o.r;
    if (u < n) {
      if (u < l) return u;
      n = u;
    }
  }
  return n;
}
function Lf(e, t, r) {
  let a = 0, s = 0, l = e[t[0]];
  for (let g of t) {
    let y = e[g];
    a += y.x / t.length, s += y.y / t.length, y.r < l.r && (l = y);
  }
  let n = l.r, i = a, o = s, h = Hg(e, t, r, i, o, -1 / 0), c = 0, u = (g, y) => {
    let b = Hg(e, t, r, g, y, h - n * 1e-9);
    if (!(b > h - n * 1e-9)) return !1;
    let x = Math.hypot(g - a, y - s);
    return b > h + n * 1e-9 || x < c - n * 1e-9 ? (h = b, c = x, i = g, o = y, !0) : !1;
  }, d = 10;
  for (let g = -d; g <= d; g++) for (let y = -d; y <= d; y++) y * y + g * g <= d * d && u(l.x + y * n / d, l.y + g * n / d);
  let p = n / d;
  for (let g = 0; g < 40 && p > n * 1e-6; g++) {
    let y = !1;
    for (let b = 0; b < 8; b++) {
      let x = b * Xo / 8;
      u(i + Math.cos(x) * p, o + Math.sin(x) * p) && (y = !0);
    }
    y || (p /= 2);
  }
  return { x: i, y: o, margin: h };
}
function G_(e) {
  let t = /* @__PURE__ */ new Map();
  for (let b of e) for (let x of b.sets) t.has(x) || t.set(x, 10);
  for (let b of e) b.sets.length === 1 && t.set(b.sets[0], b.size);
  let r = /* @__PURE__ */ new Map(), a = [], s = 0;
  for (let b of t.values()) Number.isFinite(b) && b > s && (s = b);
  s === 0 && (s = 10);
  let l = Math.sqrt(s / Math.PI);
  for (let [b, x] of t) {
    r.set(b, a.length);
    let v = Number.isFinite(x) && x > 0 ? Math.sqrt(x / Math.PI) : 0;
    a.push({ id: b, x: 0, y: 0, r: Math.max(v, l * 0.3) });
  }
  let n = a.length;
  if (n < 2) return a;
  let i = /* @__PURE__ */ new Map();
  for (let b of P_(e)) {
    if (b.sets.length !== 2) continue;
    let x = r.get(b.sets[0]), v = r.get(b.sets[1]);
    x !== v && i.set(Math.min(x, v) * n + Math.max(x, v), b.size);
  }
  let o = /* @__PURE__ */ new Map();
  for (let [b, x] of i) o.set(b, B_(a[Math.floor(b / n)].r, a[b % n].r, x));
  let h = l * 0.15, c = (b, x) => o.get(b * n + x) ?? a[b].r + a[x].r + h;
  if (n === 2) return a[1].x = c(0, 1), a;
  if (n === 3) {
    let b = c(0, 1), x = c(0, 2), v = c(1, 2), $ = e.some((S) => new Set(S.sets).size === 3);
    for (let S = 0; S < 40; S++) {
      let R = b > 0 ? (b * b + x * x - v * v) / (2 * b) : 0;
      if (a[1].x = b, a[2].x = Math.max(-x, Math.min(x, R)), a[2].y = Math.sqrt(Math.max(x * x - R * R, 0)), !$ || Lf(a, [0, 1, 2], []).margin > l * 0.12) break;
      b *= 0.94, x *= 0.94, v *= 0.94;
    }
    return a;
  }
  let u = 0;
  for (let b of a) u += 2 * b.r + h;
  let d = Math.min(300, Math.floor(3e6 / (n * n)));
  if (n <= 64) {
    let b = u / Xo;
    a.forEach((x, v) => {
      let $ = v * Xo / n - Math.PI / 2;
      x.x = Math.cos($) * b, x.y = Math.sin($) * b;
    });
  } else {
    let b = Math.ceil(Math.sqrt(n)), x = 2 * l + h;
    a.forEach((v, $) => {
      v.x = $ % b * x, v.y = Math.floor($ / b) * x;
    });
  }
  let p = new Float64Array(n), g = new Float64Array(n), y = new Int32Array(n);
  for (let b = 0; b < d; b++) {
    p.fill(0), g.fill(0), y.fill(0);
    for (let x = 0; x < n; x++) for (let v = x + 1; v < n; v++) {
      let $ = o.get(x * n + v), S = a[x].r + a[v].r + h, R = a[v].x - a[x].x, D = a[v].y - a[x].y, O = Math.hypot(R, D);
      if ($ === void 0 && O >= S) continue;
      O < 1e-9 && (R = Math.cos(x + v), D = Math.sin(x + v), O = 1);
      let U = (O - ($ ?? S)) / 2 / O;
      p[x] += R * U, g[x] += D * U, p[v] -= R * U, g[v] -= D * U, y[x]++, y[v]++;
    }
    for (let x = 0; x < n; x++) y[x] !== 0 && (a[x].x += p[x] / y[x], a[x].y += g[x] / y[x]);
  }
  return a;
}
function H_(e, t) {
  let r = (o) => `M${t(o.x - o.r)},${t(o.y)}A${t(o.r)},${t(o.r)} 0 1 1 ${t(o.x + o.r)},${t(o.y)}A${t(o.r)},${t(o.r)} 0 1 1 ${t(o.x - o.r)},${t(o.y)}Z`;
  if (e.length === 1) return r(e[0]);
  let a = (o, h, c, u) => {
    for (let d of e) if (d !== c && d !== u && Math.hypot(o - d.x, h - d.y) > d.r * (1 + 1e-9)) return !1;
    return !0;
  }, s = [];
  for (let o = 0; o < e.length; o++) for (let h = o + 1; h < e.length; h++) {
    let c = e[o], u = e[h], d = Math.hypot(u.x - c.x, u.y - c.y);
    if (d >= c.r + u.r || d <= Math.abs(c.r - u.r) || d === 0) continue;
    let p = (c.r * c.r - u.r * u.r + d * d) / (2 * d), g = Math.sqrt(Math.max(c.r * c.r - p * p, 0)), y = c.x + (u.x - c.x) * p / d, b = c.y + (u.y - c.y) * p / d;
    for (let x of [1, -1]) {
      let v = y + x * g * (u.y - c.y) / d, $ = b - x * g * (u.x - c.x) / d;
      a(v, $, c, u) && s.push({ x: v, y: $, a: c, b: u });
    }
  }
  if (s.length < 2) {
    let o = e[0];
    for (let h of e) h.r < o.r && (o = h);
    for (let h of e) if (h !== o && Math.hypot(h.x - o.x, h.y - o.y) + o.r > h.r * (1 + 1e-9)) return "";
    return r(o);
  }
  let l = 0, n = 0;
  for (let o of s) l += o.x / s.length, n += o.y / s.length;
  s.sort((o, h) => Math.atan2(o.y - n, o.x - l) - Math.atan2(h.y - n, h.x - l));
  let i = "";
  for (let o = 0; o < s.length; o++) {
    let h = s[o], c = s[(o + 1) % s.length];
    o === 0 && (i = `M${t(h.x)},${t(h.y)}`);
    let u, d = 0, p = 1 / 0;
    for (let g of [h.a, h.b]) {
      if (g !== c.a && g !== c.b) continue;
      let y = Math.atan2(h.y - g.y, h.x - g.x), b = Math.atan2(c.y - g.y, c.x - g.x) - y;
      b <= 0 && (b += Xo);
      let x = g.x + g.r * Math.cos(y + b / 2), v = g.y + g.r * Math.sin(y + b / 2), $ = Math.hypot(x - (h.x + c.x) / 2, v - (h.y + c.y) / 2);
      $ < p && (p = $, u = g, d = b > Math.PI ? 1 : 0);
    }
    u === void 0 ? i += `L${t(c.x)},${t(c.y)}` : i += `A${t(u.r)},${t(u.r)} 0 ${d} 1 ${t(c.x)},${t(c.y)}`;
  }
  return i + "Z";
}
var U_ = 100, Y_ = 1.6, Ug = Dt([]);
function Rd(e) {
  return e.length === 1 ? e[0] : JSON.stringify(e);
}
function j_(e, t, r) {
  let a = r.fontSize ?? 16, s = Math.round(a * 0.875), l = Math.round(a * 0.8125), n = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), i = r.padding ?? 8, o = G_(e.subsets), h = /* @__PURE__ */ new Map();
  o.forEach((A, m) => h.set(A.id, m));
  let c = /* @__PURE__ */ new Map();
  for (let { targets: A, styles: m } of e.styles) {
    let I = Rd(A), k = c.get(I);
    k || c.set(I, k = /* @__PURE__ */ new Map());
    for (let [w, B] of m) k.set(w, B);
  }
  let u = (A) => {
    let m = c.get(A);
    if (!m) return Ug;
    let I = [];
    for (let [k, w] of m) I.push(`${k}:${w}`);
    return Dt(I);
  }, d = o.map(() => []);
  for (let A = 0; A < o.length; A++) for (let m = A + 1; m < o.length; m++) Math.hypot(o[A].x - o[m].x, o[A].y - o[m].y) < o[A].r + o[m].r && (d[A].push(m), d[m].push(A));
  let p = /* @__PURE__ */ new Map();
  for (let A of e.subsets) p.set(Rd(A.sets), A);
  let g = /* @__PURE__ */ new Map();
  for (let [A, m] of p) {
    let I = [...new Set(m.sets)], k = I.map((te) => h.get(te)), w = new Set(k), B = k[0];
    for (let te of k) o[te].r < o[B].r && (B = te);
    let N = u(A), j = m.label ?? (m.sets.length === 1 ? m.sets[0] : void 0), F = (N.bold ? 1 : 0) | (N.italic ? 2 : 0), Y = d[B].filter((te) => !w.has(te)), W = Lf(o, k, Y), K = Y.length > 0 && W.margin < o[B].r * 0.2;
    K && (W = Lf(o, k, []));
    let H = { sets: I, inside: k, spot: W, lines: [], style: N, across: K };
    if (j) {
      let te = I.length === 1 ? a : s;
      H.lines.push({ id: void 0, raw: j, size: te, base: F, label: je(j, !1, n, te, 4e3, F) });
    }
    g.set(A, H);
  }
  for (let A of e.textNodes) {
    let m = A.label ?? A.id;
    g.get(Rd(A.sets))?.lines.push({ id: A.id, raw: m, size: l, base: 0, label: je(m, !1, n, l, 4e3) });
  }
  let y = 0;
  for (let A of o) A.r > y && (y = A.r);
  let b = y > 0 ? U_ / y : 1, x = 1;
  for (let A of g.values()) {
    if (A.spot.margin <= 0) continue;
    let m = 0, I = 0;
    for (let w of A.lines) m = Math.max(m, w.label.width), I += w.label.height;
    let k = Math.hypot(m, I) / 2 + 4;
    x = Math.max(x, Math.min(k / (A.spot.margin * b), Y_));
  }
  b *= x;
  for (let A of g.values()) {
    let m = Math.max(A.spot.margin * b * 1.8, 72);
    for (let I of A.lines) I.label.width > m && (I.label = je(I.raw, !1, n, I.size, m, I.base));
  }
  let v = 1 / 0, $ = 1 / 0, S = -1 / 0, R = -1 / 0;
  for (let A of o) v = Math.min(v, (A.x - A.r) * b), $ = Math.min($, (A.y - A.r) * b), S = Math.max(S, (A.x + A.r) * b), R = Math.max(R, (A.y + A.r) * b);
  for (let A of g.values()) {
    let m = 0, I = 0;
    for (let k of A.lines) m = Math.max(m, k.label.width), I += k.label.height;
    v = Math.min(v, A.spot.x * b - m / 2), S = Math.max(S, A.spot.x * b + m / 2), $ = Math.min($, A.spot.y * b - I / 2), R = Math.max(R, A.spot.y * b + I / 2);
  }
  o.length === 0 && (v = $ = S = R = 0);
  let D = je(e.title && Ja(e.title), !1, n, a, 4e3, 1), O = D.height > 0 ? D.height + 12 : 0, U = Math.max(S - v, D.width), q = i + (U - (S - v)) / 2 - v, C = i + O - $, ee = Math.ceil(U + 2 * i), ie = Math.ceil(R - $ + O + 2 * i), G = o.map((A) => ({ id: A.id, x: A.x * b + q, y: A.y * b + C, r: A.r * b })), z = "";
  G.forEach((A, m) => {
    let I = vt(m), k = g.get(A.id)?.style ?? Ug;
    z += `<circle class="pele-venn-set" data-id="${Ye(A.id)}" cx="${f(A.x)}" cy="${f(A.y)}" r="${f(A.r)}" fill="${I}" fill-opacity="0.2" stroke="${I}"${k.shape}/>`;
  });
  let _ = [...g.values()].filter((A) => A.sets.length > 1 && A.style.shape !== ""), T = (A) => {
    if (A.across) return "";
    let m = A.sets.length === 1 && /[";]fill-opacity:/.test(A.style.shape) ? A.style.shape : "";
    for (let I of _) I.sets.every((k) => A.sets.includes(k)) && (m = I.style.shape);
    return m;
  }, E = "", M = "";
  for (let A of g.values()) {
    let m = Ye(A.sets.join("|"));
    if (A.sets.length > 1 && A.style.shape !== "") {
      let j = H_(A.inside.map((F) => G[F]), f);
      j !== "" && (E += `<path class="pele-venn-overlap" data-id="${m}" d="${j}" fill="none"${A.style.shape}/>`);
    }
    let I = 0;
    for (let j of A.lines) I += j.label.height;
    if (I === 0) continue;
    let k = A.spot.x * b + q, w = A.spot.y * b + C - I / 2, B = T(A), N = "";
    for (let j of A.lines) {
      let F = j.id === void 0 ? A.style.text : u(j.id).text, Y = si(B, F), W = j.id === void 0 ? ` class="pele-label"${j.size === a ? "" : ` font-size="${j.size}"`}${Y ? ` fill="${Y}"` : ""}${F}` : ` class="pele-venn-text" data-id="${Ye(j.id)}" font-size="${l}" fill="${Y ?? "var(--_m)"}"${F}`;
      N += Pe(j.label, k, w + j.label.height / 2, W), w += j.label.height;
    }
    M += `<g class="pele-venn-region" data-id="${m}">${N}</g>`;
  }
  return { svg: xt("venn", ee, ie, a, r, {}, Pe(D, ee / 2, i + D.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g class="pele-venn-sets">${z}</g>` + (E ? `<g class="pele-venn-overlaps">${E}</g>` : "") + (M ? `<g class="pele-venn-labels">${M}</g>` : "")), width: ee, height: ie, links: [] };
}
var q_ = { type: "venn", parse(e, t, r) {
  let a = new R_();
  return r && (a.title = r), z_(e, a), a;
}, render: j_ }, V_ = class {
  nodes = /* @__PURE__ */ new Map();
  labels;
  links = [];
  trends = /* @__PURE__ */ new Map();
  pipelines = /* @__PURE__ */ new Map();
  annotations = [];
  notes = [];
  accelerators = [];
  deaccelerators = [];
  annotationsBox;
  axes = {};
  size;
  addNode(e) {
    let t = this.nodes.get(e.id) ?? { id: e.id, label: e.label };
    this.nodes.set(e.id, { ...t, ...e, className: e.className ?? t.className, labelOffsetX: e.labelOffsetX ?? t.labelOffsetX, labelOffsetY: e.labelOffsetY ?? t.labelOffsetY }), this.labels = void 0;
  }
  addLink(e) {
    this.links.push(e);
  }
  addTrend(e) {
    this.trends.set(e.nodeId, e);
  }
  startPipeline(e) {
    this.pipelines.set(e, { nodeId: e, componentIds: [] });
    let t = this.nodes.get(e);
    t && (t.isPipelineParent = !0);
  }
  addPipelineComponent(e, t) {
    this.pipelines.get(e)?.componentIds.push(t);
    let r = this.nodes.get(t);
    r && (r.inPipeline = !0);
  }
  addAnnotation(e) {
    this.annotations.push(e);
  }
  addNote(e) {
    this.notes.push(e);
  }
  addAccelerator(e) {
    this.accelerators.push(e);
  }
  addDeaccelerator(e) {
    this.deaccelerators.push(e);
  }
  setAnnotationsBox(e, t) {
    this.annotationsBox = { x: e, y: t };
  }
  setAxes(e) {
    this.axes = { ...this.axes, ...e };
  }
  setSize(e, t) {
    this.size = { width: e, height: t };
  }
  getNode(e) {
    return this.nodes.get(e);
  }
  resolveNodeId(e) {
    if (this.nodes.has(e)) return e;
    if (!this.labels) {
      this.labels = /* @__PURE__ */ new Map();
      for (let [t, r] of this.nodes) this.labels.has(r.label) || this.labels.set(r.label, t);
    }
    return this.labels.get(e) ?? e;
  }
  build() {
    let e = [];
    for (let t of this.nodes.values()) {
      if (typeof t.x != "number" || typeof t.y != "number") throw new at(`Node "${t.label}" is missing coordinates`, "semantic", { type: "wardley" });
      e.push(t);
    }
    return { nodes: e, links: [...this.links], trends: [...this.trends.values()], pipelines: [...this.pipelines.values()], annotations: [...this.annotations], notes: [...this.notes], accelerators: [...this.accelerators], deaccelerators: [...this.deaccelerators], annotationsBox: this.annotationsBox, axes: { ...this.axes }, size: this.size };
  }
};
function Zo(e, t) {
  let r = e <= 1 ? e * 100 : e;
  if (r < 0 || r > 100) throw new at(`${t} must be between 0-1 (decimal) or 0-100 (percentage). Received: ${e}`, "semantic", { type: "wardley" });
  return r;
}
function Va(e, t, r) {
  return { x: Zo(t, `${r} evolution`), y: Zo(e, `${r} visibility`) };
}
function Yg(e) {
  return e === "+<>" ? "bidirectional" : e === "+<" ? "backward" : e === "+>" ? "forward" : void 0;
}
function K_(e) {
  if (!e?.startsWith("+")) return {};
  let t = e.indexOf("'", 2), r = e[1] === "'" && t !== -1 ? e.slice(2, t) : void 0;
  return e.includes("<>") ? { flow: "bidirectional", label: r } : e.includes("<") ? { flow: "backward", label: r } : e.includes(">") ? { flow: "forward", label: r } : { label: r };
}
function jg(e) {
  return e ? [(e.negX ? -1 : 1) * e.offsetX, (e.negY ? -1 : 1) * e.offsetY] : [void 0, void 0];
}
function X_(e, t) {
  e.size && t.setSize(e.size.width, e.size.height), e.evolution && t.setAxes({ stages: e.evolution.stages.map((r) => r.secondName ? `${r.name.trim()} / ${r.secondName.trim()}` : r.name.trim()), stageBoundaries: e.evolution.stages.filter((r) => r.boundary !== void 0).map((r) => r.boundary) });
  for (let r of e.anchors) {
    let a = Va(r.visibility, r.evolution, `Anchor "${r.name}"`);
    t.addNode({ id: r.name, label: r.name, x: a.x, y: a.y, className: "anchor" });
  }
  for (let r of e.components) {
    let a = Va(r.visibility, r.evolution, `Component "${r.name}"`), [s, l] = jg(r.label);
    t.addNode({ id: r.name, label: r.name, x: a.x, y: a.y, className: "component", labelOffsetX: s, labelOffsetY: l, inertia: r.inertia, sourceStrategy: r.decorator?.strategy });
  }
  for (let r of e.notes) {
    let a = Va(r.visibility, r.evolution, `Note "${r.text}"`);
    t.addNote({ text: r.text, x: a.x, y: a.y });
  }
  for (let r of e.pipelines) {
    let a = t.getNode(r.parent);
    if (!a || typeof a.y != "number") throw new at(`Pipeline "${r.parent}" must reference an existing component with coordinates.`, "semantic", { type: "wardley" });
    let s = a.y;
    t.startPipeline(r.parent);
    for (let l of r.components) {
      let n = `${r.parent}_${l.name}`, [i, o] = jg(l.label), h = Zo(l.evolution, `Pipeline component "${l.name}" evolution`);
      t.addNode({ id: n, label: l.name, x: h, y: s, className: "pipeline-component", labelOffsetX: i, labelOffsetY: o, inertia: void 0, sourceStrategy: void 0 }), t.addPipelineComponent(r.parent, n);
    }
  }
  for (let r of e.links) {
    let a = !!r.arrow && (r.arrow.includes("-.->") || r.arrow.includes(".-.")), s = K_(r.arrow), l = Yg(r.fromPort) ?? Yg(r.toPort) ?? s.flow;
    t.addLink({ source: t.resolveNodeId(r.from), target: t.resolveNodeId(r.to), dashed: a, label: s.label ?? r.linkLabel, flow: l });
  }
  for (let r of e.evolves) {
    let a = t.getNode(r.component);
    a?.y !== void 0 && t.addTrend({ nodeId: r.component, targetX: Zo(r.target, `Evolve target for "${r.component}"`), targetY: a.y });
  }
  if (e.annotations.length > 0) {
    let r = Va(e.annotations[0].x, e.annotations[0].y, "Annotations box");
    t.setAnnotationsBox(r.x, r.y);
  }
  for (let r of e.annotation) {
    let a = Va(r.x, r.y, `Annotation ${r.number}`);
    t.addAnnotation({ number: r.number, coordinates: [{ x: a.x, y: a.y }], text: r.text });
  }
  for (let r of e.accelerators) {
    let a = Va(r.x, r.y, `Accelerator "${r.name}"`);
    t.addAccelerator({ name: r.name, x: a.x, y: a.y });
  }
  for (let r of e.deaccelerators) {
    let a = Va(r.x, r.y, `Deaccelerator "${r.name}"`);
    t.addDeaccelerator({ name: r.name, x: a.x, y: a.y });
  }
}
function Z_(e, t) {
  let r = new V_();
  return X_(e, r), { type: "wardley", title: e.title || t, accTitle: e.accTitle ? e.accTitle.replace(/^\s+/g, "") : void 0, accDescr: e.accDescr ? e.accDescr.replace(/\n\s+/g, `
`) : void 0, ...r.build() };
}
function qg(e, t) {
  let r = t;
  for (let a = e.charCodeAt(r); a >= 48 && a <= 57; a = e.charCodeAt(r)) r++;
  return r;
}
function Q_() {
  let e = 0, t = 0;
  return (r, a) => {
    if ((a < e || a >= t) && (e = a, t = qg(r, a)), t === a || r.charCodeAt(t) !== 46) return -1;
    let s = qg(r, t + 1);
    return s > t + 1 ? s : -1;
  };
}
var Vg = { name: "ARROW", pattern: /->/y, first: "-" }, Kg = { name: "LINK_ARROW", pattern: /-->|-\.->|>|\+'[^']*'<>|\+'[^']*'<|\+'[^']*'>/y, first: "->+" }, cr = (e, t) => ({ name: e, pattern: new RegExp(t, "y"), first: t[0] }), Xg = [{ name: "[", pattern: "[" }, { name: ",", pattern: "," }, { name: "]", pattern: "]" }, { name: "@", pattern: "@" }, { name: "/", pattern: "/" }, { name: "(", pattern: "(" }, { name: ")", pattern: ")" }, { name: "-", pattern: "-", longer: [Vg, Kg, fr] }, { name: "{", pattern: "{" }, { name: "}", pattern: "}" }, { name: "WARDLEY_NUMBER", pattern: /[0-9]+\.[0-9]+/y, first: "0123456789", scanner: Q_ }, Vg, { name: "LINK_PORT", pattern: /\+<>|\+>|\+</y, first: "+" }, Kg, { name: "LINK_LABEL", pattern: /;[^\n\r]+/y, first: ";" }, { name: "STRATEGY", pattern: /build|buy|outsource|market/y, first: "bom" }, cr("KW_WARDLEY", "wardley-beta"), cr("KW_SIZE", "size"), cr("KW_EVOLUTION", "evolution"), cr("KW_ANCHOR", "anchor"), cr("KW_COMPONENT", "component"), cr("KW_LABEL", "label"), cr("KW_INERTIA", "inertia"), cr("KW_EVOLVE", "evolve"), cr("KW_PIPELINE", "pipeline"), cr("KW_NOTE", "note"), cr("KW_ANNOTATIONS", "annotations"), cr("KW_ANNOTATION", "annotation"), cr("KW_ACCELERATOR", "accelerator"), cr("KW_DEACCELERATOR", "deaccelerator"), { name: "NAME_WITH_SPACES", pattern: /(?!title\s|accTitle|accDescr)[A-Za-z](?:[A-Za-z0-9_()&]|-(?!>))*(?:[ \t]+[A-Za-z(](?:[A-Za-z0-9_()&]|-(?!>))*)*/y, first: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" }, { name: "WS", pattern: /[ \t]+/y, hidden: !0, first: "	 " }, eu(), Br, di, { name: "INT", pattern: /0|[1-9][0-9]*(?!\.)/y, first: "0123456789" }, pl, { name: "ID", pattern: /[\w]([-\w]*\w)?/y, first: "_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" }, La, Oa, fr, la, ia];
function J_(e) {
  let t = new Sr(Ar(e, Xg, "wardley"), Xg, "wardley"), r = { $type: "Wardley", anchors: [], components: [], links: [], evolves: [], pipelines: [], notes: [], annotations: [], annotation: [], accelerators: [], deaccelerators: [] }, a = (p) => t.kinds[t.i] === p, s = () => a(36) || a(37) || a(30), l = () => a(36) ? Fr(t.take()) : a(37) || a(30) ? t.take() : t.fail("a name"), n = () => Number(t.expect(10)), i = () => parseInt(t.expect(35)), o = () => a(10) ? Number(t.take()) : parseInt(t.expect(35)), h = () => {
    if (!a(-1)) for (a(38) || t.fail("a line break or the end of input"); a(38); ) t.i++;
  }, c = (p) => {
    t.expect(0);
    let g = p();
    t.expect(1);
    let y = p();
    return t.expect(2), [g, y];
  }, u = () => {
    t.expect(21), t.expect(0);
    let p = t.accept(7), g = i();
    t.expect(1);
    let y = t.accept(7), b = i();
    return t.expect(2), { $type: "Label", negX: p, offsetX: g, negY: y, offsetY: b };
  }, d = () => {
    let p = { $type: "EvolutionStage", name: l() };
    return t.accept(3) && (p.boundary = n()), t.accept(4) && (p.secondName = l()), p;
  };
  for (; a(38); ) t.i++;
  for (t.expect(16); !a(-1); ) switch (t.kind) {
    case 38:
      t.i++;
      break;
    case 32:
      r.accDescr = Cr(t.take()), h();
      break;
    case 33:
      r.accTitle = Tr(t.take()), h();
      break;
    case 34:
      r.title = Er(t.take()), h();
      break;
    case 17: {
      t.i++;
      let [p, g] = c(i);
      h(), r.size = { $type: "Size", width: p, height: g };
      break;
    }
    case 18: {
      t.i++;
      let p = [d()];
      for (t.expect(11), p.push(d()); t.accept(11); ) p.push(d());
      h(), r.evolution = { $type: "Evolution", stages: p };
      break;
    }
    case 19: {
      t.i++;
      let p = l(), [g, y] = c(n);
      h(), r.anchors.push({ $type: "Anchor", name: p, visibility: g, evolution: y });
      break;
    }
    case 20: {
      t.i++;
      let p = { $type: "Component", name: l(), visibility: 0, evolution: 0, inertia: !1 };
      [p.visibility, p.evolution] = c(n), a(21) && (p.label = u()), a(5) && t.kinds[t.i + 1] === 15 && (t.i++, p.decorator = { $type: "Decorator", strategy: t.take() }, t.expect(6)), t.accept(22) ? p.inertia = !0 : t.accept(5) && (t.expect(22), t.expect(6), p.inertia = !0), h(), r.components.push(p);
      break;
    }
    case 23: {
      t.i++;
      let p = l(), g = n();
      h(), r.evolves.push({ $type: "Evolve", component: p, target: g });
      break;
    }
    case 24: {
      t.i++;
      let p = l();
      for (t.expect(8), t.expect(38); a(38); ) t.i++;
      let g = [];
      do {
        t.expect(20);
        let y = { $type: "PipelineComponent", name: l(), evolution: 0 };
        t.expect(0), y.evolution = n(), t.expect(2), a(21) && (y.label = u()), h(), g.push(y);
      } while (a(20));
      t.expect(9), h(), r.pipelines.push({ $type: "Pipeline", parent: p, components: g });
      break;
    }
    case 25: {
      t.i++;
      let p = Fr(t.expect(36)), [g, y] = c(n);
      h(), r.notes.push({ $type: "Note", text: p, visibility: g, evolution: y });
      break;
    }
    case 26: {
      t.i++;
      let [p, g] = c(o);
      h(), r.annotations.push({ $type: "Annotations", x: p, y: g });
      break;
    }
    case 27: {
      t.i++;
      let p = i();
      t.expect(1);
      let [g, y] = c(o), b = Fr(t.expect(36));
      h(), r.annotation.push({ $type: "Annotation", number: p, x: g, y, text: b });
      break;
    }
    case 28:
    case 29: {
      let p = t.kind === 29;
      t.i++;
      let g = l(), [y, b] = c(n);
      h(), p ? r.deaccelerators.push({ $type: "Deaccelerator", name: g, x: y, y: b }) : r.accelerators.push({ $type: "Accelerator", name: g, x: y, y: b });
      break;
    }
    default: {
      s() || t.fail("a statement");
      let p = { $type: "Link", from: l(), to: "" };
      a(12) && (p.fromPort = t.take()), (a(13) || a(11)) && (p.arrow = t.take()), p.to = l(), a(12) && (p.toPort = t.take()), a(14) && (p.linkLabel = t.take().substring(1).trim()), h(), r.links.push(p);
    }
  }
  return r;
}
var e5 = ["Genesis", "Custom Built", "Product", "Commodity"], t5 = 48, It = 6, Ka = 10, r5 = 8, Qn = 15, ji = 60, a5 = 30, Zg = 20, Dd = "var(--_c)", gr = "var(--_l)";
function l5(e, t, r, a, s) {
  let l = e["wardley-beta"]?.[t];
  return typeof l == "number" && l >= a && l <= s ? l : r;
}
function zl(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
function Qg(e, t, r, a) {
  let s = Cs(e), l = "", n = r;
  for (let i of e.lines) {
    let o = !0;
    for (let h of i) {
      if (h.icon !== void 0) continue;
      let c = Jl(h.style & ~s);
      l += `<tspan${o ? ` x="${f(t)}" y="${f(n)}"` : ""}${c}>${it(h.text)}</tspan>`, o = !1;
    }
    n += e.lineHeight;
  }
  return l === "" ? "" : `<text${sl(a, s)} xml:space="preserve">${l}</text>`;
}
function Ty(e, t, r, a) {
  let s = typeof t == "number" && Number.isFinite(t) ? t : l5(e, r, a, 1, 1e6);
  return zl(s, 200, 1e4) - 2 * t5;
}
function i5(e, t, r) {
  let a = Ty(t, e.size?.width, "width", 900);
  return sh(r, a, 160, (s, l) => s5(e, t, r, s, a, l));
}
function s5(e, t, r, a, s, l) {
  let n = r.fontSize ?? 16, i = Math.round(n * 0.8125), o = Math.round(n * 0.6875), h = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), c = r.padding ?? 8, u = Ty(t, e.size?.height, "height", 600) * Math.max(0.75, a / s), d = t["wardley-beta"]?.showGrid === !0, p = 0, g = 0, y = a, b = u, x = (P, ne, ce, pe) => {
    P < p && (p = P), ne < g && (g = ne), ce > y && (y = ce), pe > b && (b = pe);
  }, v = (P, ne, ce, pe) => (x(ne - P.width / 2, ce - P.height / 2, ne + P.width / 2, ce + P.height / 2), Pe(P, ne, ce, pe, r.icons)), $ = (P, ne, ce, pe) => (x(ne, ce - P.size, ne + P.width, ce - P.size + P.height + 4), Qg(P, ne, ce, pe)), S = (P, ne, ce = l ? Math.max(64, Math.min(120, a / 2)) : 4e3, pe = 0) => je(P, !1, h, ne, ce, pe), R = (P) => P / 100 * a, D = (P) => u - P / 100 * u, O = e.axes.stages && e.axes.stages.length > 0 ? e.axes.stages : e5, U = e.axes.stageBoundaries, q = U !== void 0 && U.length === O.length, C = "", ee = "", ie = u, G = 0;
  if (O.forEach((P, ne) => {
    let ce = q ? G : ne / O.length, pe = q ? zl(U[ne], 0, 1) : (ne + 1) / O.length;
    G = pe, ne > 0 && (C += `<path class="pele-wardley-stage" d="M${f(ce * a)},0V${f(u)}" stroke="var(--_b)" stroke-dasharray="4 4"/>`);
    let Me = S(P, i, Math.max(48, Math.abs(pe - ce) * a - 12));
    ee += v(Me, (ce + pe) / 2 * a, u + 8 + Me.height / 2, ` class="pele-wardley-stage-label" font-size="${i}" fill="var(--_m)"`), ie = Math.max(ie, u + 8 + Me.height);
  }), d) for (let P = 1; P < 4; P++) C += `<path class="pele-wardley-grid" d="M${f(a * P / 4)},0V${f(u)}M0,${f(u * P / 4)}H${f(a)}" stroke="var(--_b)" stroke-dasharray="2 6"/>`;
  C += `<path class="pele-wardley-axis" d="M0,0V${f(u)}H${f(a)}" stroke="${gr}"/>`;
  let z = S(e.axes.xLabel ?? "Evolution", i), _ = S(e.axes.yLabel ?? "Visibility", i), T = ` class="pele-wardley-axis-label" font-size="${i}" font-weight="var(--_hw)"`, E = v(z, a / 2, ie + 6 + z.height / 2, T) + Pe(_, -16, u / 2, `${T} transform="rotate(-90 -16 ${f(u / 2)})"`);
  x(-16 - _.height / 2, 0, 0, 0);
  let M = ie + 6 + z.height + 10, A = /* @__PURE__ */ new Map();
  for (let P of e.nodes) A.set(P.id, { x: R(P.x), y: D(P.y), node: P });
  let m = "", I = /* @__PURE__ */ new Map();
  for (let P of e.pipelines) {
    I.set(P.nodeId, new Set(P.componentIds));
    let ne = [];
    for (let Ae of P.componentIds) {
      let Ee = A.get(Ae);
      Ee && ne.push(Ee);
    }
    if (ne.length === 0) continue;
    ne.sort((Ae, Ee) => Ae.x - Ee.x);
    let ce = ne[0].x, pe = ne[ne.length - 1].x, Me = ne[0].y, xe = Me - 2 * It, ve = A.get(P.nodeId);
    ve && (ve.x = (ce + pe) / 2, ve.y = xe - Ka / 6), x(ce - Qn, xe, pe + Qn, xe + 4 * It), m += `<g class="pele-wardley-pipeline" data-id="${Ye(P.nodeId)}"><rect x="${f(ce - Qn)}" y="${f(xe)}" width="${f(pe - ce + 2 * Qn)}" height="${f(4 * It)}" fill="var(--_s)" stroke="var(--_b)"${wt}/>` + (ne.length > 1 ? `<path d="M${f(ce)},${f(Me)}H${f(pe)}" stroke="${gr}" stroke-dasharray="4 4"/>` : "") + "</g>";
  }
  let k = /* @__PURE__ */ new Map(), w = (P, ne, ce) => {
    let pe = P.node;
    if (pe.className === "anchor") {
      let Me = k.get(pe);
      return Me || k.set(pe, Me = S(pe.label, i, l ? Math.max(64, a / 2) : 4e3, 1)), 1 / Math.hypot(ne / (Me.width / 2 + 5), ce / (i * 0.8));
    }
    return pe.isPipelineParent ? Ka / Math.SQRT2 : pe.sourceStrategy ? 2 * It : It;
  }, B = /* @__PURE__ */ new Map(), N = (P, ne, ce) => {
    Math.abs(ne) < 0.25 || Math.abs(ce) < 0.25 || B.set(P, (B.get(P) ?? 0) | (ne > 0 ? ce < 0 ? 1 : 2 : ce < 0 ? 4 : 8));
  }, j = "";
  for (let P of e.links) {
    let ne = A.get(P.source), ce = A.get(P.target);
    if (!ne || !ce || ne === ce || I.get(P.target)?.has(P.source)) continue;
    let pe = ce.x - ne.x, Me = ce.y - ne.y, xe = Math.hypot(pe, Me);
    if (xe < 0.01) continue;
    let ve = pe / xe, Ae = Me / xe, Ee = w(ne, ve, Ae), me = w(ce, ve, Ae);
    if (Ee + me >= xe) continue;
    N(ne, ve, Ae), N(ce, -ve, -Ae);
    let we = ne.x + ve * Ee, Se = ne.y + Ae * Ee, se = ce.x - ve * me, ye = ce.y - Ae * me, ke = "";
    (P.flow === "forward" || P.flow === "bidirectional") && (ke += St("arrow_point", se, ye, ve, Ae, gr), se -= ve * Ct("arrow_point"), ye -= Ae * Ct("arrow_point")), (P.flow === "backward" || P.flow === "bidirectional") && (ke += St("arrow_point", we, Se, -ve, -Ae, gr), we += ve * Ct("arrow_point"), Se += Ae * Ct("arrow_point"));
    let $e = "";
    if (P.label) {
      let be = S(P.label, o + 1, 200), Ie = ve >= 0 ? 1 : -1, ze = Ae * Ie, Oe = -ve * Ie, de = 5 + Math.abs(ze) * be.width / 2 + Math.abs(Oe) * be.height / 2;
      $e = v(be, (ne.x + ce.x) / 2 + ze * de, (ne.y + ce.y) / 2 + Oe * de, ` class="pele-edge-label" font-size="${o + 1}" fill="var(--_m)"`);
    }
    j += `<g class="pele-edge${P.dashed ? " pele-wardley-dashed" : ""}" data-id="${Ye(P.source)}-${Ye(P.target)}"><path d="M${f(we)},${f(Se)}L${f(se)},${f(ye)}" stroke="${gr}"${P.dashed ? ' stroke-dasharray="6 6"' : ""}/>` + ke + $e + "</g>";
  }
  let F = "";
  for (let P of e.trends) {
    let ne = A.get(P.nodeId);
    if (!ne) continue;
    let ce = R(P.targetX), pe = D(P.targetY), Me = ce - ne.x, xe = pe - ne.y, ve = Math.hypot(Me, xe), Ae = "", Ee = ve > 0 ? w(ne, Me / ve, xe / ve) : 0;
    if (ve > Ee + It + 4) {
      let me = Me / ve, we = xe / ve, Se = ce - me * (It + 2), se = pe - we * (It + 2);
      Ae = `<path d="M${f(ne.x + me * Ee)},${f(ne.y + we * Ee)}L${f(Se - me * Ct("arrow_point"))},${f(se - we * Ct("arrow_point"))}" stroke="${Dd}" stroke-dasharray="4 4"/>` + St("arrow_point", Se, se, me, we, Dd);
    }
    x(ce - It, pe - It, ce + It, pe + It), F += `<g class="pele-wardley-trend" data-id="${Ye(P.nodeId)}">${Ae}<circle cx="${f(ce)}" cy="${f(pe)}" r="${It}" fill="var(--_bg)" stroke="${Dd}"/></g>`;
  }
  let Y = "", W = 1.2 * It, K = 0.7 * It;
  for (let P of A.values()) {
    let ne = P.node, { x: ce, y: pe } = P, Me = ne.className === "anchor", xe = ne.sourceStrategy, ve = "";
    if (xe) {
      let we = xe === "outsource" ? "var(--_m)" : xe === "buy" ? "var(--_a)" : xe === "build" ? "var(--_s)" : "var(--_bg)";
      ve += `<circle class="pele-wardley-${xe}" cx="${f(ce)}" cy="${f(pe)}" r="${2 * It}" fill="${we}" stroke="${gr}"/>`;
    }
    if (xe === "market") {
      let we = W * Math.cos(Math.PI / 6), Se = pe + W * Math.sin(Math.PI / 6);
      ve += `<path d="M${f(ce)},${f(pe - W)}L${f(ce - we)},${f(Se)}H${f(ce + we)}Z" fill="none" stroke="${gr}"/>`;
      for (let [se, ye] of [[ce, pe - W], [ce - we, Se], [ce + we, Se]]) ve += `<circle cx="${f(se)}" cy="${f(ye)}" r="${f(K)}" fill="var(--_bg)" stroke="${gr}"/>`;
    } else ne.isPipelineParent ? ve += `<rect x="${f(ce - Ka / 2)}" y="${f(pe - Ka / 2)}" width="${Ka}" height="${Ka}" fill="var(--_bg)" stroke="${gr}"/>` : Me || (ve += `<circle cx="${f(ce)}" cy="${f(pe)}" r="${It}" fill="var(--_bg)" stroke="${gr}"/>`);
    if (ne.inertia === !0) {
      let we = (ne.isPipelineParent ? Ka / 2 : It) + 10 + (xe ? It + 4 : 0);
      ve += `<rect class="pele-wardley-inertia" x="${f(ce + we)}" y="${f(pe - It)}" width="4" height="${2 * It}" fill="${gr}"/>`;
    }
    let Ae = ne.labelOffsetX === void 0 ? void 0 : zl(ne.labelOffsetX, -5e3, 5e3), Ee = ne.labelOffsetY === void 0 ? void 0 : zl(ne.labelOffsetY, -5e3, 5e3), me;
    if (Me) {
      let we = k.get(ne) ?? S(ne.label, i, l ? Math.max(64, a / 2) : 4e3, 1);
      me = v(we, ce + (Ae ?? 0), pe + (Ee ?? -3), ` class="pele-label" font-size="${i}" font-weight="var(--_hw)"`);
    } else {
      let we = S(ne.label, i), Se = ` class="pele-label" font-size="${i}"`, se = r5 + (xe ? 10 : 0);
      if (Ae !== void 0 || Ee !== void 0) me = $(we, ce + (Ae ?? se), pe + (Ee ?? -se), Se);
      else if (ne.inPipeline) me = v(we, ce, pe + 2 * It + 4 + we.height / 2, Se);
      else {
        let ye = B.get(P) ?? 0, ke = (ye & 1) === 0 ? 1 : (ye & 2) === 0 ? 2 : (ye & 4) === 0 ? 4 : (ye & 8) === 0 ? 8 : 1, $e = ke === 1 || ke === 2, be = ke === 1 || ke === 4;
        me = $(we, $e ? ce + se : ce - se - we.width, be ? pe - se : pe + se + i * 0.75, Se);
      }
    }
    x(ce - 2 * It, pe - 2 * It, ce + 2 * It + 20, pe + 2 * It), Y += `<g class="pele-node pele-wardley-${Me ? "anchor" : ne.isPipelineParent ? "pipeline-parent" : ne.inPipeline ? "pipeline-component" : "component"}" data-id="${Ye(ne.id)}">${ve}${me}</g>`;
  }
  let H = "";
  for (let P of e.annotations) {
    let ne = S(String(P.number), o, 4e3, 1), ce = "";
    for (let pe of P.coordinates) {
      let Me = R(pe.x), xe = D(pe.y), ve = Math.max(10, ne.width / 2 + 4);
      x(Me - ve, xe - ve, Me + ve, xe + ve), ce += `<circle cx="${f(Me)}" cy="${f(xe)}" r="${f(ve)}" fill="var(--_bg)" stroke="${gr}"/>` + Pe(ne, Me, xe, ` font-size="${o}" font-weight="var(--_hw)"`);
    }
    H += `<g class="pele-wardley-annotation" data-id="${Ye(String(P.number))}">${ce}</g>`;
  }
  let te = e.annotations.filter((P) => P.text).sort((P, ne) => P.number - ne.number);
  if (te.length > 0) {
    let P = te.map((Ee) => S(`${Ee.number}. ${Ee.text}`, i, l ? Math.max(80, a - 20) : 320)), ne = 0, ce = 0;
    for (let Ee of P) ne = Math.max(ne, Ee.width), ce += Ee.height;
    ne += 20, ce += 14;
    let pe = e.annotationsBox, Me = pe ? zl(R(pe.x), 0, Math.max(0, a - ne)) : 0, xe = pe ? zl(D(pe.y), 0, Math.max(0, u - ce)) : M;
    x(Me, xe, Me + ne, xe + ce);
    let ve = "", Ae = xe + 7;
    for (let Ee of P) ve += Qg(Ee, Me + 10, Ae + Ee.lineHeight / 2 + i * 0.35, ` font-size="${i}"`), Ae += Ee.height;
    H += `<g class="pele-wardley-annotations"><rect x="${f(Me)}" y="${f(xe)}" width="${f(ne)}" height="${f(ce)}" fill="var(--_bg)" stroke="var(--_b)"${wt}/>${ve}</g>`;
  }
  let Q = "";
  for (let P of e.notes) Q += $(S(P.text, i, Math.min(360, a * 0.6), 1), R(P.x), D(P.y), ` class="pele-wardley-note" font-size="${i}" font-weight="var(--_hw)"`);
  let L = "", X = (P, ne, ce, pe) => {
    let Me = R(ne), xe = D(ce), ve = a5 / 2, Ae = pe ? Me + ji : Me, Ee = pe ? Me : Me + ji, me = pe ? Me + ji - Zg : Me + Zg, we = `M${f(Ee)},${f(xe - ve)}H${f(me)}V${f(xe - ve - 8)}L${f(Ae)},${f(xe)}L${f(me)},${f(xe + ve + 8)}V${f(xe + ve)}H${f(Ee)}Z`;
    x(Me, xe - ve - 8, Me + ji, xe + ve + 8), L += `<g class="pele-wardley-${pe ? "accelerator" : "deaccelerator"}" data-id="${Ye(P)}"><path d="${we}" fill="var(--_s)" stroke="${gr}"/>` + v(S(P, o + 1, 160, 1), Me + ji / 2, xe + ve + 8 + 12, ` font-size="${o + 1}" font-weight="var(--_hw)"`) + "</g>";
  };
  for (let P of e.accelerators) X(P.name, P.x, P.y, !0);
  for (let P of e.deaccelerators) X(P.name, P.x, P.y, !1);
  let le = je(e.title, !1, h, n, l ? Math.max(80, a) : 4e3, 1), J = le.height > 0 ? le.height + 12 : 0, V = Math.min(p, a / 2 - le.width / 2), Z = Math.max(y, a / 2 + le.width / 2), ae = c - V, oe = c + J - g, ue = Math.ceil(Z - V + 2 * c), he = Math.ceil(b - g + J + 2 * c), re = Pe(le, ae + a / 2, c + le.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + `<g transform="translate(${f(ae)},${f(oe)})"><g class="pele-wardley-frame" fill="none">${C}</g>` + ee + E + m + (j ? `<g class="pele-edges" fill="none">${j}</g>` : "") + (F ? `<g class="pele-wardley-trends" fill="none">${F}</g>` : "") + Y + H + Q + L + "</g>";
  return { svg: xt("wardley", ue, he, n, r, e, re), width: ue, height: he, links: [] };
}
var n5 = { type: "wardley", section: "wardley-beta", parse: (e, t, r) => Z_(J_(e), r), render: i5 }, o5 = class {
  type = "xychart";
  title;
  accTitle;
  accDescr;
  orientation;
  xAxis = { type: "band", title: "", categories: [] };
  yAxis = { type: "linear", title: "", min: 1 / 0, max: -1 / 0 };
  hasSetXAxis = !1;
  hasSetYAxis = !1;
  plots = [];
  setOrientation(e) {
    this.orientation = e === "horizontal" ? "horizontal" : "vertical";
  }
  setXAxisTitle(e) {
    this.xAxis.title = e.text.trim();
  }
  setXAxisRangeData(e, t) {
    this.xAxis = { type: "linear", title: this.xAxis.title, min: e, max: t }, this.hasSetXAxis = !0;
  }
  setXAxisBand(e) {
    this.xAxis = { type: "band", title: this.xAxis.title, categories: e.map((t) => t.text.trim()) }, this.hasSetXAxis = !0;
  }
  setYAxisTitle(e) {
    this.yAxis.title = e.text.trim();
  }
  setYAxisRangeData(e, t) {
    this.yAxis = { type: "linear", title: this.yAxis.title, min: e, max: t }, this.hasSetYAxis = !0;
  }
  plotData(e) {
    if (e.length === 0) return [];
    this.hasSetXAxis || this.setXAxisRangeData(1, e.length);
    let t = this.xAxis;
    if (t.type === "band" && e.length > t.categories.length && (e = e.slice(0, t.categories.length)), !this.hasSetYAxis) {
      let { min: a, max: s } = this.yAxis;
      for (let l of e) l < a && (a = l), l > s && (s = l);
      this.yAxis = { type: "linear", title: this.yAxis.title, min: a, max: s };
    }
    if (t.type === "band") return t.categories.map((a, s) => [a, e[s]]);
    if (e.length === 1) return [[`${t.min}`, e[0]]];
    let r = (t.max - t.min) / (e.length - 1);
    return e.map((a, s) => [`${t.min + s * r}`, a]);
  }
  addPlot(e, t, r) {
    let a = { type: e, title: t.text.trim(), data: this.plotData(r.map((s) => s.value)) };
    e === "line" && r.some((s) => s.label.trim() !== "") && (a.pointLabels = r.map((s) => s.label.trim())), this.plots.push(a);
  }
  setLineData(e, t) {
    this.addPlot("line", e, t);
  }
  setBarData(e, t) {
    this.addPlot("bar", e, t);
  }
  setDiagramTitle(e) {
    this.title = e;
  }
  setAccTitle(e) {
    this.accTitle = e.replace(/^\s+/g, "");
  }
  setAccDescription(e) {
    this.accDescr = e.replace(/\n\s+/g, `
`);
  }
}, Jg = ["$end", "INVALID", "NEWLINE", "title", "acc_title", "acc_title_value", "acc_descr", "acc_descr_value", "acc_descr_multiline_value", "XYCHART", "CHART_ORIENTATION", "X_AXIS", "Y_AXIS", "ARROW_DELIMITER", "LINE", "BAR", "NUMBER_WITH_DECIMAL", "SQUARE_BRACES_START", "SQUARE_BRACES_END", "STR", "ALPHA", "COLON", "PLUS", "COMMA", "EQUALS", "MULT", "BRKT", "UNDERSCORE", "DOT", "AMP", "MINUS", "NUM", "SEMI", "EOF"], e2 = [33, 33, 33, 33, 33, 19, 5, 7, 8], t2 = "`)" + " ".repeat(36) + '{ this.pushstate(md_string); }\n<md_string>(?:(?!`").)+' + " ".repeat(18) + "{ return md_str; }\n<md_string>(?:`", Of = new Uint8Array(128);
for (let [e, t] of [[":", 21], ["+", 22], [",", 23], ["=", 24], ["*", 25], ["#", 26], ["_", 27], [".", 28], ["&", 29], ["-", 30], [";", 32]]) Of[e.charCodeAt(0)] = t;
function h5(e) {
  let t = e.length, r = [], a = [], s = [], l = [], n = 0, i = 0, o = (y, b, x) => {
    r.push(y), a.push(e.slice(b, x)), s.push(b), i = x;
  }, h = (y) => {
    l.push(n), n = y;
  }, c = () => {
    l.length > 0 && (n = l.pop());
  }, u = (y) => {
    let b = e.indexOf(`
`, y);
    return b === -1 ? t : b;
  }, d = (y) => {
    for (; y < t && Ke(e.charCodeAt(y)); ) y++;
    return y;
  }, p = (y) => {
    for (; yt(e.charCodeAt(y)); ) y++;
    return y;
  }, g = (y) => rr(e, i, y) && !nt(e.charCodeAt(i + y.length));
  for (; i < t; ) {
    let y = e.charCodeAt(i);
    if (n === 5) {
      if (y === 34) i++, c();
      else {
        let x = e.indexOf('"', i);
        o(19, i, x === -1 ? t : x);
      }
      continue;
    }
    if (n === 6 || n === 7) {
      o(e2[n], i, u(i)), c();
      continue;
    }
    if (n === 8) {
      if (y === 125) i++, c();
      else {
        let x = e.indexOf("}", i);
        o(8, i, x === -1 ? t : x);
      }
      continue;
    }
    let b = e.charCodeAt(i + 1);
    if (y === 37 && b === 37) {
      i = u(i + 2);
      continue;
    }
    if (y === 10 || y === 13) {
      if ((n === 1 || n === 3) && (y === 10 || b === 10)) {
        o(2, i, y === 10 ? i + 1 : i + 2), c();
        continue;
      }
      let x = i + 1;
      for (let v = e.charCodeAt(x); v === 10 || v === 13; v = e.charCodeAt(++x)) ;
      o(2, i, x);
      continue;
    }
    switch (y | 32) {
      case 116:
        if (g("title")) {
          o(3, i, i + 5);
          continue;
        }
        break;
      case 97:
        if (rr(e, i, "acc")) {
          let x = rr(e, i + 3, "descr");
          if (x || rr(e, i + 3, "title")) {
            let v = d(i + 8), $ = e.charCodeAt(v);
            if ($ === 58) {
              o(x ? 6 : 4, i, d(v + 1)), h(x ? 7 : 6);
              continue;
            }
            if ($ === 123 && x) {
              i = d(v + 1), h(8);
              continue;
            }
          }
        }
        break;
      case 120:
        if (g("xychart-beta")) {
          o(9, i, i + 12);
          continue;
        }
        if (g("xychart")) {
          o(9, i, i + 7);
          continue;
        }
        if (g("x-axis")) {
          o(11, i, i + 6), h(1);
          continue;
        }
        break;
      case 121:
        if (g("y-axis")) {
          o(12, i, i + 6), h(1);
          continue;
        }
        break;
      case 118:
        if (rr(e, i, "vertical")) {
          o(10, i, i + 8);
          continue;
        }
        break;
      case 104:
        if (rr(e, i, "horizontal")) {
          o(10, i, i + 10);
          continue;
        }
        break;
      case 108:
        if (g("line")) {
          o(14, i, i + 4), h(3);
          continue;
        }
        break;
      case 98:
        if (g("bar")) {
          o(15, i, i + 3), h(3);
          continue;
        }
        break;
    }
    if (y === 91) {
      n === 1 ? h(2) : n === 3 && h(4), o(17, i, i + 1);
      continue;
    }
    if (y === 93) {
      (n === 4 || n === 2) && c(), o(18, i, i + 1);
      continue;
    }
    if (n === 1 && y === 45 && b === 45 && e.charCodeAt(i + 2) === 62) {
      o(13, i, i + 3);
      continue;
    }
    if (n === 1 || n === 4) {
      let x = y === 43 || y === 45 ? i + 1 : i, v = e.charCodeAt(x), $ = -1;
      if (yt(v) ? ($ = p(x + 1), e.charCodeAt($) === 46 && yt(e.charCodeAt($ + 1)) && ($ = p($ + 2))) : v === 46 && yt(e.charCodeAt(x + 1)) && ($ = p(x + 2)), $ !== -1) {
        o(16, i, $);
        continue;
      }
    }
    if (y === 96 && rr(e, i, t2)) {
      i += t2.length, c();
      continue;
    }
    if (y === 34) {
      i++, h(5);
      continue;
    }
    if (Ql(y)) {
      let x = i + 1;
      for (; Ql(e.charCodeAt(x)); ) x++;
      o(20, i, x);
      continue;
    }
    if (yt(y)) {
      o(31, i, p(i + 1));
      continue;
    }
    if (Ke(y)) {
      i = d(i + 1);
      continue;
    }
    if (y < 128 && Of[y] !== 0) {
      o(Of[y], i, i + 1);
      continue;
    }
    break;
  }
  return i < t ? (r.push(1), a.push(""), s.push(i), { types: r, texts: a, starts: s }) : (r.push(e2[n]), a.push(""), s.push(t), r.push(0), a.push(""), s.push(t), { types: r, texts: a, starts: s });
}
function Cy(...e) {
  let t = new Uint8Array(34);
  for (let r of e) t[r] = 1;
  return t;
}
var r2 = Cy(29, 31, 20, 22, 24, 25, 28, 26, 30, 27), a2 = Cy(2, 32, 33);
function c5(e, t) {
  let { types: r, texts: a, starts: s } = h5(e), l = 0, n = (d) => {
    let p = r[l];
    throw p === 1 ? bt("xychart", e, s[l], "", !0) : bt("xychart", e, s[l], `Expecting ${d}, got '${Jg[p]}'`);
  }, i = (d) => (r[l] !== d && n(`'${Jg[d]}'`), a[l++]), o = (d) => d === 19 || r2[d] === 1, h = () => {
    o(r[l]) || n("'STR', 'ALPHA', 'NUM'");
    let d = a[l++];
    if (r[l - 1] !== 19) for (; r2[r[l]] === 1; ) d += a[l++];
    return { text: d, type: "text" };
  }, c = () => {
    let d = Number(i(16));
    return i(13), [d, Number(i(16))];
  }, u = () => {
    let d = [];
    for (i(17); ; ) {
      let p = Number(i(16));
      if (d.push({ value: p, label: r[l] === 19 ? a[l++] : "" }), r[l] !== 23) break;
      l++;
    }
    return i(18), d;
  };
  for (; ; ) if (a2[r[l]] === 1) l++;
  else {
    if (r[l] !== 9) break;
    r[++l] === 10 && t.setOrientation(a[l++]);
  }
  for (; r[l] !== 0; ) {
    let d = r[l++];
    switch (d) {
      case 3:
        t.setDiagramTitle(h().text.trim());
        break;
      case 11:
      case 12: {
        let p = o(r[l]) ? h() : void 0;
        if (d === 11 && r[l] === 17) {
          let g = [];
          do
            l++, g.push(h());
          while (r[l] === 23);
          i(18), t.setXAxisBand(g);
        } else if (r[l] === 16 || p === void 0) {
          let [g, y] = c();
          d === 11 ? t.setXAxisRangeData(g, y) : t.setYAxisRangeData(g, y);
        }
        d === 11 ? t.setXAxisTitle(p ?? { type: "text", text: "" }) : t.setYAxisTitle(p ?? { type: "text", text: "" });
        break;
      }
      case 14:
      case 15: {
        let p = r[l] === 17 ? { text: "", type: "text" } : h(), g = u();
        d === 14 ? t.setLineData(p, g) : t.setBarData(p, g);
        break;
      }
      case 4:
        t.setAccTitle(i(5).trim());
        break;
      case 6:
        t.setAccDescription(i(7).trim());
        break;
      case 8:
        t.setAccDescription(a[l - 1].trim());
        break;
      default:
        l--, n("'title', 'X_AXIS', 'Y_AXIS', 'LINE', 'BAR', 'acc_title', 'acc_descr', 'acc_descr_multiline_value'");
    }
    for (; a2[r[l]] === 1; ) l++;
  }
}
function l2(e, t) {
  let r = e / Math.max(t, 1), a = Math.floor(Math.log10(r)), s = r / 10 ** a, l = s >= 7.07 ? 10 : s >= 3.16 ? 5 : s >= 1.41 ? 2 : 1;
  return a < 0 ? -(10 ** -a) / l : l * 10 ** a;
}
function Qo(e, t) {
  return e > 0 ? t / e : t * -e;
}
function $s(e, t) {
  return e > 0 ? t * e : t / -e;
}
function i2(e, t, r) {
  let a = Math.round(Qo(r, e));
  $s(r, a) < e && a++;
  let s = Math.round(Qo(r, t));
  $s(r, s) > t && s--;
  let l = [];
  for (let n = a; n <= s && l.length < 100; n++) l.push($s(r, n));
  return l;
}
var s2 = 4, Ll = 12, n2 = 26, o2 = 24, h2 = 1e300;
function Ld(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e) ? e : {};
}
function Mr(e, t, r = !0) {
  let a = e[t];
  return typeof a == "boolean" ? a : r;
}
function c2(e, t) {
  return typeof e == "number" && e > 0 ? Math.round(Math.min(Math.max(e, 100), 4e3)) : t;
}
function Ma(e) {
  return typeof e == "number" && isFinite(e) ? Math.min(Math.max(e, -h2), h2) : void 0;
}
function d5(e) {
  let t = 0;
  for (let r of e) t = Math.max(t, r.label.width);
  return t;
}
function Jn(e, t, r, a) {
  let s = e.lines.length === 1 ? e.lines[0] : void 0;
  return s && s.length === 1 && s[0].icon === void 0 && s[0].style === 0 ? `<text x="${f(t)}" y="${f(r + e.size * 0.35)}" text-anchor="${a}">${it(s[0].text)}</text>` : Pe(e, t + (a === "start" ? e.width / 2 : a === "end" ? -e.width / 2 : 0), r, "");
}
function f5(e, t, r) {
  if (e.plots.length === 0) throw new at("No Plot to render, please provide a plot with some data", "semantic", { type: "xychart" });
  let a = Ld(t.xyChart), s = r.fontSize ?? 16, l = Math.round(s * 0.875), n = Math.round(s * 0.75), i = r.measurer ?? $t(r.fontFamily, r.fontFamilyMono), o = r.padding ?? 8, h = c2(a.width, 700), c = nh(r, h, 240), u = Math.round(c2(a.height, 500) * Math.max(0.6, c / h)), d = (e.orientation ?? a.chartOrientation) === "horizontal", p = Mr(a, "showDataLabel", !1), g = e.xAxis, y = e.plots, b = (_e, Ve, Ze) => je(_e, !1, i, Ve, Ze), x = b("0", l, 4e3).height, v = b("0", n, 4e3).height, $ = je(Mr(a, "showTitle") ? e.title : void 0, !1, i, s, c - 2 * o, 1), S = $.height > 0 ? $.height + 12 : 0, R = [], D = 0;
  Mr(a, "showLegend") && y.forEach((_e, Ve) => {
    if (_e.title === "") return;
    let Ze = b(_e.title, l, c * 0.3);
    R.push({ index: Ve, label: Ze }), D = Math.max(D, Ze.width + Ll + 8);
  });
  let O = R.length > 0 ? D + o2 : 0, U = y.filter((_e) => _e.type === "bar").length, q = Ma(e.yAxis.min) ?? 1 / 0, C = Ma(e.yAxis.max) ?? -1 / 0, ee = e.hasSetYAxis && isFinite(q) && isFinite(C) && q !== C;
  if (!ee) {
    q = 1 / 0, C = -1 / 0;
    for (let _e of y) for (let [, Ve] of _e.data) {
      let Ze = Ma(Ve);
      Ze !== void 0 && (Ze < q && (q = Ze), Ze > C && (C = Ze));
    }
    q > C && (q = C = 0), U > 0 && (q = Math.min(q, 0), C = Math.max(C, 0)), q === C && (q === 0 ? C = 1 : (q -= Math.abs(q) / 2, C += Math.abs(C) / 2));
  }
  let ie = (_e, Ve) => {
    let Ze = l2(Math.abs(C - q), Math.max(2, Math.min(10, Math.floor(_e / Ve))));
    return ee || (q = $s(Ze, Math.floor(Qo(Ze, q) + 1e-9)), C = $s(Ze, Math.ceil(Qo(Ze, C) - 1e-9))), i2(Math.min(q, C), Math.max(q, C), Ze).map((tt) => ({ at: (tt - q) / (C - q), label: b(String(tt), l, 4e3) }));
  }, G = 1;
  if (g.type === "band") G = Math.max(g.categories.length, 1);
  else for (let _e of y) G = Math.max(G, _e.data.length);
  let z = 1 / G, _ = g.type === "band" || U > 0 ? z / 2 : 0, T = Ma(g.type === "linear" ? g.min : void 0), E = Ma(g.type === "linear" ? g.max : void 0), M = T !== void 0 && E !== void 0 && T !== E, A = (_e, Ve) => g.type === "band" ? (_e + 0.5) * z : _ + (Ve > 1 ? _e / (Ve - 1) : M ? 0 : 0.5) * (1 - 2 * _), m = Ld(a.xAxis), I = Ld(a.yAxis), k = d ? m : I, w = d ? I : m, B = b(Mr(k, "showTitle") ? d ? g.title : e.yAxis.title : void 0, l, u * 0.8), N = b(Mr(w, "showTitle") ? d ? e.yAxis.title : g.title : void 0, l, c * 0.8), j = Mr(k, "showTick") ? s2 : 0, F = Mr(w, "showTick") ? s2 : 0, Y = Mr(k, "showLabel"), W = Mr(w, "showLabel"), K = d ? c * 0.3 : Math.max(48, (c - 2 * o - 64 - O) * z - 8), H = g.type === "band" && Mr(m, "showLabel") ? g.categories.map((_e) => b(_e, l, K)) : [], te = 0, Q = 0;
  for (let _e of H) te = Math.max(te, _e.width), Q = Math.max(Q, _e.height);
  let L = (_e) => {
    let Ve = [];
    if (g.type === "band") {
      let Ze = H.length === 0 ? 8 : d ? Q : te + 12, tt = Math.max(1, Math.ceil(Ze / (_e * z)));
      for (let ct = 0; ct < g.categories.length; ct += tt) Ve.push({ at: (ct + 0.5) * z, label: H[ct] ?? b(void 0, l, 0) });
    } else if (M) {
      let Ze = l2(Math.abs(E - T), Math.max(2, Math.min(10, Math.floor(_e / (d ? 32 : 80)))));
      for (let tt of i2(Math.min(T, E), Math.max(T, E), Ze)) Ve.push({ at: _ + (tt - T) / (E - T) * (1 - 2 * _), label: b(String(tt), l, 4e3) });
    } else T !== void 0 && Ve.push({ at: 0.5, label: b(String(T), l, 4e3) });
    return Ve;
  }, X = 0, le = 0;
  for (let _e of y) {
    for (let Ve of _e.pointLabels ?? []) X = Math.max(X, i.width(Ve, n, 0));
    if (p && d && _e.type === "bar") for (let [, Ve] of _e.data) le = Math.max(le, i.width(String(Ma(Ve) ?? ""), n, 0));
  }
  let J = W ? d || g.type !== "band" ? x : Q : 0, V = F + (J > 0 ? J + 4 : 0) + (N.height > 0 ? N.height + 4 : 0), Z = d ? 0 : X > 0 || p ? v + 4 : Y ? x / 2 : 0, ae = o + S + Z, oe = Math.max(1, u - o - V - ae), ue = ae + oe, he = d ? L(oe) : ie(oe, 56), re = Y ? d5(he) : 0, P = o + (B.height > 0 ? B.height + 6 : 0) + (re > 0 ? re + 6 : 0) + j, ne = Math.max(X > 0 ? X + 12 : 0, le > 0 ? le + 8 : 0), ce = d ? Math.min(c * 0.25, ne) : 0, pe = Math.max(1, c - o - P - O - ce), Me = d ? ie(pe, 80) : L(pe);
  if (W && O + ce === 0) {
    let _e = 0;
    for (let Ve of Me) _e = Math.max(_e, Ve.at * pe + Ve.label.width / 2 - pe);
    pe = Math.max(1, pe - _e);
  }
  let xe = P + pe, ve = (_e, Ve) => d ? P + Ve * pe : P + _e * pe, Ae = (_e, Ve) => d ? ae + _e * oe : ue - Ve * oe, Ee = (_e) => (_e - q) / (C - q), me = (_e) => Math.min(Math.max(_e, 0), 1), we = (_e) => d ? `M${f(ve(0, _e))},${f(ae)}V${f(ue)}` : `M${f(P)},${f(Ae(0, _e))}H${f(xe)}`, Se = "";
  for (let _e of d ? Me : he) Se += we(_e.at);
  let se = "", ye = "";
  Mr(k, "showAxisLine") && (se += `M${f(P)},${f(ae)}V${f(ue)}`), Mr(w, "showAxisLine") && (se += `M${f(P)},${f(ue)}H${f(xe)}`);
  for (let _e of he) {
    let Ve = d ? ae + _e.at * oe : ue - _e.at * oe;
    j && (se += `M${f(P)},${f(Ve)}h${-j}`), Y && (ye += Jn(_e.label, P - j - 6, Ve, "end"));
  }
  for (let _e of Me) {
    let Ve = P + _e.at * pe;
    F && (se += `M${f(Ve)},${f(ue)}v${F}`), W && (ye += Jn(_e.label, Ve, ue + F + 4 + _e.label.height / 2, "middle"));
  }
  let ke = (d ? oe : pe) * z, $e = ke * 0.7 / Math.max(U, 1), be = U > 1 ? Math.min(2, $e * 0.2) : 0, Ie = me(Ee(0));
  U > 0 && Ie > 0 && Ie < 1 && (se += we(Ie));
  let ze = "", Oe = "", de = "", Te = "", fe = 0;
  y.forEach((_e, Ve) => {
    let Ze = vt(Ve), tt = _e.title ? ` data-id="${Ye(_e.title)}"` : "", ct = g.type === "band" ? Math.min(_e.data.length, G) : _e.data.length;
    if (_e.type === "bar") {
      let qe = (fe++ - (U - 1) / 2) * $e - ($e - be) / 2, Je = "";
      for (let Ne = 0; Ne < ct; Ne++) {
        let Qe = Ma(_e.data[Ne][1]);
        if (Qe === void 0) continue;
        let rt = A(Ne, ct), st = me(Ee(Qe)), ft = Math.min(Ie, st), ot = Math.max(Ie, st), Xe = d ? ve(rt, ft) : ve(rt, 0) + qe, dt = d ? Ae(rt, 0) + qe : Ae(rt, ot), ht = d ? (ot - ft) * pe : $e - be, pt = d ? $e - be : (ot - ft) * oe;
        if (Je += `<rect x="${f(Xe)}" y="${f(dt)}" width="${f(ht)}" height="${f(pt)}"/>`, !p) continue;
        let kt = String(Qe), Ut = i.width(kt, n, 0), Jt = st >= Ie ? 1 : -1, Gr = Xe + ht / 2, Yt = dt + pt / 2, Lt = "middle";
        if (d) {
          if (pt < n) continue;
          Gr = (Jt > 0 ? Xe + ht : Xe) + Jt * 6, Lt = Jt > 0 ? "start" : "end";
        } else {
          if (Ut + 2 > ke / U) continue;
          Yt = (Jt > 0 ? dt : dt + pt) - Jt * (v / 2 + 2);
        }
        de += `<text x="${f(Gr)}" y="${f(Yt + n * 0.35)}" text-anchor="${Lt}">${kt}</text>`;
      }
      ze += `<g class="pele-series pele-bars"${tt} fill="${Ze}">${Je}</g>`;
      return;
    }
    let ge = "", De = "", Re = !1, Ue = 0, Ge = NaN;
    for (let qe = 0; qe < ct; qe++) {
      let Je = Ma(_e.data[qe][1]);
      if (Je === void 0) {
        Ge = NaN;
        continue;
      }
      let Ne = A(qe, ct), Qe = Ee(Je), rt = Qe >= 0 && Qe <= 1;
      if (Ge !== Ge) rt && (ge += `M${f(ve(Ne, Qe))},${f(Ae(Ne, Qe))}`), Re = rt;
      else {
        let Xe = Qe - Ge, dt = 0, ht = 1;
        if (Xe !== 0) {
          let pt = -Ge / Xe, kt = (1 - Ge) / Xe;
          dt = Math.max(dt, Math.min(pt, kt)), ht = Math.min(ht, Math.max(pt, kt));
        } else rt || (dt = 2);
        if (dt <= ht) {
          let pt = Ue + (Ne - Ue) * dt, kt = Ge + Xe * dt, Ut = Ue + (Ne - Ue) * ht, Jt = Ge + Xe * ht;
          (!Re || dt > 0) && (ge += `M${f(ve(pt, kt))},${f(Ae(pt, kt))}`), ge += `L${f(ve(Ut, Jt))},${f(Ae(Ut, Jt))}`;
        }
        Re = rt;
      }
      if (Ue = Ne, Ge = Qe, !rt) continue;
      let st = ve(Ne, Qe), ft = Ae(Ne, Qe);
      ke >= 12 && (De += `<circle cx="${f(st)}" cy="${f(ft)}" r="3"/>`);
      let ot = b(_e.pointLabels?.[qe], n, 4e3);
      if (ot.height > 0) {
        let Xe = ot.width / 2;
        Te += d ? Jn(ot, st + 10, ft, "start") : Jn(ot, Math.max(Math.min(st, xe - Xe), P + Xe), ft - 6 - ot.height / 2, "middle");
      }
    }
    Oe += `<g class="pele-series pele-line"${tt} fill="${Ze}">` + (ge ? `<path d="${ge}" fill="none" stroke="${Ze}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` : "") + De + "</g>";
  });
  let Ce = "";
  B.height > 0 && (Ce += `<g transform="translate(${f(o + B.height / 2)},${f(ae + oe / 2)}) rotate(-90)">${Pe(B, 0, 0, "")}</g>`), Ce += Pe(N, P + pe / 2, u - o - N.height / 2, "");
  let Fe = "", He = 0;
  for (let _e of R) He += Math.max(n2, _e.label.height + 6);
  let We = ae + Math.max(0, (oe - He) / 2), Le = xe + ce + o2;
  for (let { index: _e, label: Ve } of R) {
    let Ze = Math.max(n2, Ve.height + 6);
    if (We + Ze > u) break;
    let tt = We + Ze / 2, ct = vt(_e);
    Fe += `<g class="pele-legend-item" data-id="${Ye(y[_e].title)}">` + (y[_e].type === "bar" ? `<rect x="${f(Le)}" y="${f(tt - Ll / 2)}" width="${Ll}" height="${Ll}" rx="2" fill="${ct}"/>` : `<path d="M${f(Le)},${f(tt)}h${Ll}" stroke="${ct}" stroke-width="2" stroke-linecap="round"/>`) + Pe(Ve, Le + Ll + 8 + Ve.width / 2, tt, "") + "</g>", We += Ze;
  }
  let et = Pe($, c / 2, o + $.height / 2, ' class="pele-title" font-weight="var(--_tw)"') + (Se ? `<path class="pele-grid" d="${Se}" stroke="var(--_a)"/>` : "") + `<g class="pele-plot">${ze}${Oe}</g>` + (se ? `<path class="pele-axis" d="${se}" fill="none" stroke="var(--_b)"/>` : "") + (ye ? `<g class="pele-axis-labels" font-size="${l}" fill="var(--_m)">${ye}</g>` : "") + (Ce ? `<g class="pele-axis-titles" font-size="${l}">${Ce}</g>` : "") + (de ? `<g class="pele-data-labels" font-size="${n}">${de}</g>` : "") + (Te ? `<g class="pele-point-labels" font-size="${n}">${Te}</g>` : "") + (Fe ? `<g class="pele-legend" font-size="${l}">${Fe}</g>` : "");
  return { svg: xt("xychart", c, u, s, r, e, et), width: c, height: u, links: [] };
}
var u5 = { type: "xychart", section: "xyChart", parse(e, t, r) {
  let a = new o5();
  return a.title = r, c5(e, a), a;
}, render: f5 }, p5 = [$m, nE, kk, q3, R3, yS, x3, zv, xE, u5, VC, M4, nM, DT, qT, J3, CE, t_, P4, EC, D4, wv, GM, cT, Wb, US, Qv, n5, Gk, N_, q_, a3, sS];
dw(...p5);
export {
  at as PeleError,
  yw as detectType,
  g5 as enableZoom,
  mx as forgetTextWidths,
  x5 as mount,
  xw as parse,
  dw as register,
  m5 as registered,
  ww as render,
  y5 as supports
};
