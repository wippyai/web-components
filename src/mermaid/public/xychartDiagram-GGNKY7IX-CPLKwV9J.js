import { bc as ai, a1 as oi, a5 as It, bf as hi, a2 as ri, bd as li, b as a, aJ as zt, bb as ci, F as gi, u as ui, a3 as mt, b9 as di, t as Bt, S as xi, ad as fi, E as pi, aG as vt } from "./mermaid.core-CnOyqc27.js";
import { i as mi } from "./init-DjUOC4st.js";
import { o as yi } from "./ordinal-B6-f3MAq.js";
import { l as Lt } from "./linear-Br4lXEIt.js";
function bi(t, i, e) {
  t = +t, i = +i, e = (n = arguments.length) < 2 ? (i = t, t = 0, 1) : n < 3 ? 1 : +e;
  for (var s = -1, n = Math.max(0, Math.ceil((i - t) / e)) | 0, c = new Array(n); ++s < n; )
    c[s] = t + s * e;
  return c;
}
function ut() {
  var t = yi().unknown(void 0), i = t.domain, e = t.range, s = 0, n = 1, c, r, x = !1, g = 0, m = 0, _ = 0.5;
  delete t.unknown;
  function S() {
    var w = i().length, E = n < s, v = E ? n : s, L = E ? s : n;
    c = (L - v) / Math.max(1, w - g + m * 2), x && (c = Math.floor(c)), v += (L - v - c * (w - g)) * _, r = c * (1 - g), x && (v = Math.round(v), r = Math.round(r));
    var M = bi(w).map(function(y) {
      return v + c * y;
    });
    return e(E ? M.reverse() : M);
  }
  return t.domain = function(w) {
    return arguments.length ? (i(w), S()) : i();
  }, t.range = function(w) {
    return arguments.length ? ([s, n] = w, s = +s, n = +n, S()) : [s, n];
  }, t.rangeRound = function(w) {
    return [s, n] = w, s = +s, n = +n, x = !0, S();
  }, t.bandwidth = function() {
    return r;
  }, t.step = function() {
    return c;
  }, t.round = function(w) {
    return arguments.length ? (x = !!w, S()) : x;
  }, t.padding = function(w) {
    return arguments.length ? (g = Math.min(1, m = +w), S()) : g;
  }, t.paddingInner = function(w) {
    return arguments.length ? (g = Math.min(1, w), S()) : g;
  }, t.paddingOuter = function(w) {
    return arguments.length ? (m = +w, S()) : m;
  }, t.align = function(w) {
    return arguments.length ? (_ = Math.max(0, Math.min(1, w)), S()) : _;
  }, t.copy = function() {
    return ut(i(), [s, n]).round(x).paddingInner(g).paddingOuter(m).align(_);
  }, mi.apply(S(), arguments);
}
var dt = (function() {
  var t = /* @__PURE__ */ a(function(F, h, u, d) {
    for (u = u || {}, d = F.length; d--; u[F[d]] = h) ;
    return u;
  }, "o"), i = [1, 10, 12, 14, 16, 18, 19, 21, 23], e = [2, 6], s = [1, 3], n = [1, 5], c = [1, 6], r = [1, 7], x = [1, 5, 10, 12, 14, 16, 18, 19, 21, 23, 36, 37, 38], g = [1, 25], m = [1, 26], _ = [1, 28], S = [1, 29], w = [1, 30], E = [1, 31], v = [1, 32], L = [1, 33], M = [1, 34], y = [1, 35], D = [1, 36], l = [1, 37], B = [1, 43], W = [1, 42], X = [1, 47], Y = [1, 50], k = [1, 10, 12, 14, 16, 18, 19, 21, 23, 36, 37, 38], H = [1, 10, 12, 14, 16, 18, 19, 21, 23, 24, 26, 28, 29, 36, 37, 38], A = [1, 10, 12, 14, 16, 18, 19, 21, 23, 24, 26, 28, 29, 36, 37, 38, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51], C = [1, 65], O = [26, 28], T = {
    trace: /* @__PURE__ */ a(function() {
    }, "trace"),
    yy: {},
    symbols_: { error: 2, start: 3, eol: 4, XYCHART: 5, chartConfig: 6, document: 7, CHART_ORIENTATION: 8, statement: 9, title: 10, text: 11, X_AXIS: 12, parseXAxis: 13, Y_AXIS: 14, parseYAxis: 15, LINE: 16, plotData: 17, BAR: 18, acc_title: 19, acc_title_value: 20, acc_descr: 21, acc_descr_value: 22, acc_descr_multiline_value: 23, SQUARE_BRACES_START: 24, dataPoints: 25, SQUARE_BRACES_END: 26, dataPoint: 27, COMMA: 28, NUMBER_WITH_DECIMAL: 29, STR: 30, xAxisData: 31, bandData: 32, ARROW_DELIMITER: 33, commaSeparatedTexts: 34, yAxisData: 35, NEWLINE: 36, SEMI: 37, EOF: 38, alphaNum: 39, MD_STR: 40, alphaNumToken: 41, AMP: 42, NUM: 43, ALPHA: 44, PLUS: 45, EQUALS: 46, MULT: 47, DOT: 48, BRKT: 49, MINUS: 50, UNDERSCORE: 51, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "XYCHART", 8: "CHART_ORIENTATION", 10: "title", 12: "X_AXIS", 14: "Y_AXIS", 16: "LINE", 18: "BAR", 19: "acc_title", 20: "acc_title_value", 21: "acc_descr", 22: "acc_descr_value", 23: "acc_descr_multiline_value", 24: "SQUARE_BRACES_START", 26: "SQUARE_BRACES_END", 28: "COMMA", 29: "NUMBER_WITH_DECIMAL", 30: "STR", 33: "ARROW_DELIMITER", 36: "NEWLINE", 37: "SEMI", 38: "EOF", 40: "MD_STR", 42: "AMP", 43: "NUM", 44: "ALPHA", 45: "PLUS", 46: "EQUALS", 47: "MULT", 48: "DOT", 49: "BRKT", 50: "MINUS", 51: "UNDERSCORE" },
    productions_: [0, [3, 2], [3, 3], [3, 2], [3, 1], [6, 1], [7, 0], [7, 2], [9, 2], [9, 2], [9, 2], [9, 2], [9, 2], [9, 3], [9, 2], [9, 3], [9, 2], [9, 2], [9, 1], [17, 3], [25, 3], [25, 1], [27, 2], [27, 1], [13, 1], [13, 2], [13, 1], [31, 1], [31, 3], [32, 3], [34, 3], [34, 1], [15, 1], [15, 2], [15, 1], [35, 3], [4, 1], [4, 1], [4, 1], [11, 1], [11, 1], [11, 1], [39, 1], [39, 2], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1], [41, 1]],
    performAction: /* @__PURE__ */ a(function(h, u, d, f, R, o, J) {
      var p = o.length - 1;
      switch (R) {
        case 5:
          f.setOrientation(o[p]);
          break;
        case 9:
          f.setDiagramTitle(o[p].text.trim());
          break;
        case 12:
          f.setLineData({ text: "", type: "text" }, o[p]);
          break;
        case 13:
          f.setLineData(o[p - 1], o[p]);
          break;
        case 14:
          f.setBarData({ text: "", type: "text" }, o[p]);
          break;
        case 15:
          f.setBarData(o[p - 1], o[p]);
          break;
        case 16:
          this.$ = o[p].trim(), f.setAccTitle(this.$);
          break;
        case 17:
        case 18:
          this.$ = o[p].trim(), f.setAccDescription(this.$);
          break;
        case 19:
          this.$ = o[p - 1];
          break;
        case 20:
        case 30:
          this.$ = [o[p - 2], ...o[p]];
          break;
        case 21:
        case 31:
          this.$ = [o[p]];
          break;
        case 22:
          this.$ = { value: Number(o[p - 1]), label: o[p] };
          break;
        case 23:
          this.$ = { value: Number(o[p]), label: "" };
          break;
        case 24:
          f.setXAxisTitle(o[p]);
          break;
        case 25:
          f.setXAxisTitle(o[p - 1]);
          break;
        case 26:
          f.setXAxisTitle({ type: "text", text: "" });
          break;
        case 27:
          f.setXAxisBand(o[p]);
          break;
        case 28:
          f.setXAxisRangeData(Number(o[p - 2]), Number(o[p]));
          break;
        case 29:
          this.$ = o[p - 1];
          break;
        case 32:
          f.setYAxisTitle(o[p]);
          break;
        case 33:
          f.setYAxisTitle(o[p - 1]);
          break;
        case 34:
          f.setYAxisTitle({ type: "text", text: "" });
          break;
        case 35:
          f.setYAxisRangeData(Number(o[p - 2]), Number(o[p]));
          break;
        case 39:
          this.$ = { text: o[p], type: "text" };
          break;
        case 40:
          this.$ = { text: o[p], type: "text" };
          break;
        case 41:
          this.$ = { text: o[p], type: "markdown" };
          break;
        case 42:
          this.$ = o[p];
          break;
        case 43:
          this.$ = o[p - 1] + "" + o[p];
          break;
      }
    }, "anonymous"),
    table: [t(i, e, { 3: 1, 4: 2, 7: 4, 5: s, 36: n, 37: c, 38: r }), { 1: [3] }, t(i, e, { 4: 2, 7: 4, 3: 8, 5: s, 36: n, 37: c, 38: r }), t(i, e, { 4: 2, 7: 4, 6: 9, 3: 10, 5: s, 8: [1, 11], 36: n, 37: c, 38: r }), { 1: [2, 4], 9: 12, 10: [1, 13], 12: [1, 14], 14: [1, 15], 16: [1, 16], 18: [1, 17], 19: [1, 18], 21: [1, 19], 23: [1, 20] }, t(x, [2, 36]), t(x, [2, 37]), t(x, [2, 38]), { 1: [2, 1] }, t(i, e, { 4: 2, 7: 4, 3: 21, 5: s, 36: n, 37: c, 38: r }), { 1: [2, 3] }, t(x, [2, 5]), t(i, [2, 7], { 4: 22, 36: n, 37: c, 38: r }), { 11: 23, 30: g, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, { 11: 39, 13: 38, 24: B, 29: W, 30: g, 31: 40, 32: 41, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, { 11: 45, 15: 44, 29: X, 30: g, 35: 46, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, { 11: 49, 17: 48, 24: Y, 30: g, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, { 11: 52, 17: 51, 24: Y, 30: g, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, { 20: [1, 53] }, { 22: [1, 54] }, t(k, [2, 18]), { 1: [2, 2] }, t(k, [2, 8]), t(k, [2, 9]), t(H, [2, 39], { 41: 55, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }), t(H, [2, 40]), t(H, [2, 41]), t(A, [2, 42]), t(A, [2, 44]), t(A, [2, 45]), t(A, [2, 46]), t(A, [2, 47]), t(A, [2, 48]), t(A, [2, 49]), t(A, [2, 50]), t(A, [2, 51]), t(A, [2, 52]), t(A, [2, 53]), t(k, [2, 10]), t(k, [2, 24], { 32: 41, 31: 56, 24: B, 29: W }), t(k, [2, 26]), t(k, [2, 27]), { 33: [1, 57] }, { 11: 59, 30: g, 34: 58, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, t(k, [2, 11]), t(k, [2, 32], { 35: 60, 29: X }), t(k, [2, 34]), { 33: [1, 61] }, t(k, [2, 12]), { 17: 62, 24: Y }, { 25: 63, 27: 64, 29: C }, t(k, [2, 14]), { 17: 66, 24: Y }, t(k, [2, 16]), t(k, [2, 17]), t(A, [2, 43]), t(k, [2, 25]), { 29: [1, 67] }, { 26: [1, 68] }, { 26: [2, 31], 28: [1, 69] }, t(k, [2, 33]), { 29: [1, 70] }, t(k, [2, 13]), { 26: [1, 71] }, { 26: [2, 21], 28: [1, 72] }, t(O, [2, 23], { 30: [1, 73] }), t(k, [2, 15]), t(k, [2, 28]), t(k, [2, 29]), { 11: 59, 30: g, 34: 74, 39: 24, 40: m, 41: 27, 42: _, 43: S, 44: w, 45: E, 46: v, 47: L, 48: M, 49: y, 50: D, 51: l }, t(k, [2, 35]), t(k, [2, 19]), { 25: 75, 27: 64, 29: C }, t(O, [2, 22]), { 26: [2, 30] }, { 26: [2, 20] }],
    defaultActions: { 8: [2, 1], 10: [2, 3], 21: [2, 2], 74: [2, 30], 75: [2, 20] },
    parseError: /* @__PURE__ */ a(function(h, u) {
      if (u.recoverable)
        this.trace(h);
      else {
        var d = new Error(h);
        throw d.hash = u, d;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ a(function(h) {
      var u = this, d = [0], f = [], R = [null], o = [], J = this.table, p = "", et = 0, kt = 0, ii = 2, Tt = 1, ei = o.slice.call(arguments, 1), P = Object.create(this.lexer), $ = { yy: {} };
      for (var rt in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, rt) && ($.yy[rt] = this.yy[rt]);
      P.setInput(h, $.yy), $.yy.lexer = P, $.yy.parser = this, typeof P.yylloc > "u" && (P.yylloc = {});
      var lt = P.yylloc;
      o.push(lt);
      var si = P.options && P.options.ranges;
      typeof $.yy.parseError == "function" ? this.parseError = $.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function ni(z) {
        d.length = d.length - 2 * z, R.length = R.length - z, o.length = o.length - z;
      }
      a(ni, "popStack");
      function Dt() {
        var z;
        return z = f.pop() || P.lex() || Tt, typeof z != "number" && (z instanceof Array && (f = z, z = f.pop()), z = u.symbols_[z] || z), z;
      }
      a(Dt, "lex");
      for (var I, U, V, ct, j = {}, st, N, Pt, nt; ; ) {
        if (U = d[d.length - 1], this.defaultActions[U] ? V = this.defaultActions[U] : ((I === null || typeof I > "u") && (I = Dt()), V = J[U] && J[U][I]), typeof V > "u" || !V.length || !V[0]) {
          var gt = "";
          nt = [];
          for (st in J[U])
            this.terminals_[st] && st > ii && nt.push("'" + this.terminals_[st] + "'");
          P.showPosition ? gt = "Parse error on line " + (et + 1) + `:
` + P.showPosition() + `
Expecting ` + nt.join(", ") + ", got '" + (this.terminals_[I] || I) + "'" : gt = "Parse error on line " + (et + 1) + ": Unexpected " + (I == Tt ? "end of input" : "'" + (this.terminals_[I] || I) + "'"), this.parseError(gt, {
            text: P.match,
            token: this.terminals_[I] || I,
            line: P.yylineno,
            loc: lt,
            expected: nt
          });
        }
        if (V[0] instanceof Array && V.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + U + ", token: " + I);
        switch (V[0]) {
          case 1:
            d.push(I), R.push(P.yytext), o.push(P.yylloc), d.push(V[1]), I = null, kt = P.yyleng, p = P.yytext, et = P.yylineno, lt = P.yylloc;
            break;
          case 2:
            if (N = this.productions_[V[1]][1], j.$ = R[R.length - N], j._$ = {
              first_line: o[o.length - (N || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (N || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, si && (j._$.range = [
              o[o.length - (N || 1)].range[0],
              o[o.length - 1].range[1]
            ]), ct = this.performAction.apply(j, [
              p,
              kt,
              et,
              $.yy,
              V[1],
              R,
              o
            ].concat(ei)), typeof ct < "u")
              return ct;
            N && (d = d.slice(0, -1 * N * 2), R = R.slice(0, -1 * N), o = o.slice(0, -1 * N)), d.push(this.productions_[V[1]][0]), R.push(j.$), o.push(j._$), Pt = J[d[d.length - 2]][d[d.length - 1]], d.push(Pt);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }, "parse")
  }, K = /* @__PURE__ */ (function() {
    var F = {
      EOF: 1,
      parseError: /* @__PURE__ */ a(function(u, d) {
        if (this.yy.parser)
          this.yy.parser.parseError(u, d);
        else
          throw new Error(u);
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ a(function(h, u) {
        return this.yy = u || this.yy || {}, this._input = h, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ a(function() {
        var h = this._input[0];
        this.yytext += h, this.yyleng++, this.offset++, this.match += h, this.matched += h;
        var u = h.match(/(?:\r\n?|\n).*/g);
        return u ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), h;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ a(function(h) {
        var u = h.length, d = h.split(/(?:\r\n?|\n)/g);
        this._input = h + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - u), this.offset -= u;
        var f = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), d.length - 1 && (this.yylineno -= d.length - 1);
        var R = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: d ? (d.length === f.length ? this.yylloc.first_column : 0) + f[f.length - d.length].length - d[0].length : this.yylloc.first_column - u
        }, this.options.ranges && (this.yylloc.range = [R[0], R[0] + this.yyleng - u]), this.yyleng = this.yytext.length, this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ a(function() {
        return this._more = !0, this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ a(function() {
        if (this.options.backtrack_lexer)
          this._backtrack = !0;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: /* @__PURE__ */ a(function(h) {
        this.unput(this.match.slice(h));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ a(function() {
        var h = this.matched.substr(0, this.matched.length - this.match.length);
        return (h.length > 20 ? "..." : "") + h.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ a(function() {
        var h = this.match;
        return h.length < 20 && (h += this._input.substr(0, 20 - h.length)), (h.substr(0, 20) + (h.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ a(function() {
        var h = this.pastInput(), u = new Array(h.length + 1).join("-");
        return h + this.upcomingInput() + `
` + u + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ a(function(h, u) {
        var d, f, R;
        if (this.options.backtrack_lexer && (R = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (R.yylloc.range = this.yylloc.range.slice(0))), f = h[0].match(/(?:\r\n?|\n).*/g), f && (this.yylineno += f.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: f ? f[f.length - 1].length - f[f.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + h[0].length
        }, this.yytext += h[0], this.match += h[0], this.matches = h, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(h[0].length), this.matched += h[0], d = this.performAction.call(this, this.yy, this, u, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), d)
          return d;
        if (this._backtrack) {
          for (var o in R)
            this[o] = R[o];
          return !1;
        }
        return !1;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ a(function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var h, u, d, f;
        this._more || (this.yytext = "", this.match = "");
        for (var R = this._currentRules(), o = 0; o < R.length; o++)
          if (d = this._input.match(this.rules[R[o]]), d && (!u || d[0].length > u[0].length)) {
            if (u = d, f = o, this.options.backtrack_lexer) {
              if (h = this.test_match(d, R[o]), h !== !1)
                return h;
              if (this._backtrack) {
                u = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return u ? (h = this.test_match(u, R[f]), h !== !1 ? h : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ a(function() {
        var u = this.next();
        return u || this.lex();
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ a(function(u) {
        this.conditionStack.push(u);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ a(function() {
        var u = this.conditionStack.length - 1;
        return u > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ a(function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ a(function(u) {
        return u = this.conditionStack.length - 1 - Math.abs(u || 0), u >= 0 ? this.conditionStack[u] : "INITIAL";
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ a(function(u) {
        this.begin(u);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ a(function() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": !0 },
      performAction: /* @__PURE__ */ a(function(u, d, f, R) {
        switch (f) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            return this.popState(), 36;
          case 3:
            return this.popState(), 36;
          case 4:
            return 36;
          case 5:
            break;
          case 6:
            return 10;
          case 7:
            return this.pushState("acc_title"), 19;
          case 8:
            return this.popState(), "acc_title_value";
          case 9:
            return this.pushState("acc_descr"), 21;
          case 10:
            return this.popState(), "acc_descr_value";
          case 11:
            this.pushState("acc_descr_multiline");
            break;
          case 12:
            this.popState();
            break;
          case 13:
            return "acc_descr_multiline_value";
          case 14:
            return 5;
          case 15:
            return 5;
          case 16:
            return 8;
          case 17:
            return this.pushState("axis_data"), "X_AXIS";
          case 18:
            return this.pushState("axis_data"), "Y_AXIS";
          case 19:
            return this.pushState("axis_band_data"), 24;
          case 20:
            return 33;
          case 21:
            return this.pushState("data"), 16;
          case 22:
            return this.pushState("data"), 18;
          case 23:
            return this.pushState("data_inner"), 24;
          case 24:
            return 29;
          case 25:
            return this.popState(), 26;
          case 26:
            this.popState();
            break;
          case 27:
            this.pushState("string");
            break;
          case 28:
            this.popState();
            break;
          case 29:
            return "STR";
          case 30:
            return 24;
          case 31:
            return 26;
          case 32:
            return 44;
          case 33:
            return "COLON";
          case 34:
            return 45;
          case 35:
            return 28;
          case 36:
            return 46;
          case 37:
            return 47;
          case 38:
            return 49;
          case 39:
            return 51;
          case 40:
            return 48;
          case 41:
            return 42;
          case 42:
            return 50;
          case 43:
            return 43;
          case 44:
            break;
          case 45:
            return 37;
          case 46:
            return 38;
        }
      }, "anonymous"),
      rules: [/^(?:%%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:(\r?\n))/i, /^(?:(\r?\n))/i, /^(?:[\n\r]+)/i, /^(?:%%[^\n]*)/i, /^(?:title\b)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:\})/i, /^(?:[^\}]*)/i, /^(?:xychart-beta\b)/i, /^(?:xychart\b)/i, /^(?:(?:vertical|horizontal))/i, /^(?:x-axis\b)/i, /^(?:y-axis\b)/i, /^(?:\[)/i, /^(?:-->)/i, /^(?:line\b)/i, /^(?:bar\b)/i, /^(?:\[)/i, /^(?:[+-]?(?:\d+(?:\.\d+)?|\.\d+))/i, /^(?:\])/i, /^(?:(?:`\)                                    \{ this\.pushState\(md_string\); \}\n<md_string>\(\?:\(\?!`"\)\.\)\+                  \{ return MD_STR; \}\n<md_string>\(\?:`))/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:\[)/i, /^(?:\])/i, /^(?:[A-Za-z]+)/i, /^(?::)/i, /^(?:\+)/i, /^(?:,)/i, /^(?:=)/i, /^(?:\*)/i, /^(?:#)/i, /^(?:[\_])/i, /^(?:\.)/i, /^(?:&)/i, /^(?:-)/i, /^(?:[0-9]+)/i, /^(?:\s+)/i, /^(?:;)/i, /^(?:$)/i],
      conditions: { data_inner: { rules: [0, 1, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 21, 22, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], inclusive: !0 }, data: { rules: [0, 1, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 21, 22, 23, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], inclusive: !0 }, axis_band_data: { rules: [0, 1, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 21, 22, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], inclusive: !0 }, axis_data: { rules: [0, 1, 2, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], inclusive: !0 }, acc_descr_multiline: { rules: [12, 13], inclusive: !1 }, acc_descr: { rules: [10], inclusive: !1 }, acc_title: { rules: [8], inclusive: !1 }, title: { rules: [], inclusive: !1 }, md_string: { rules: [], inclusive: !1 }, string: { rules: [28, 29], inclusive: !1 }, INITIAL: { rules: [0, 1, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 18, 21, 22, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], inclusive: !0 } }
    };
    return F;
  })();
  T.lexer = K;
  function q() {
    this.yy = {};
  }
  return a(q, "Parser"), q.prototype = T, T.Parser = q, new q();
})();
dt.parser = dt;
var wi = dt;
function at(t) {
  return t.type === "bar";
}
a(at, "isBarPlot");
function ot(t) {
  return t.type === "band";
}
a(ot, "isBandAxisData");
function Q(t) {
  return t.type === "linear";
}
a(Q, "isLinearAxisData");
var yt = class {
  constructor(t) {
    this.parentGroup = t;
  }
  static {
    a(this, "TextDimensionCalculatorWithFont");
  }
  getMaxDimension(t, i) {
    if (!this.parentGroup)
      return {
        width: t.reduce((g, m) => Math.max(m.length, g), 0) * i,
        height: i
      };
    const e = {
      width: 0,
      height: 0
    }, s = this.parentGroup.append("g").attr("visibility", "hidden").attr("font-size", i), n = s.node()?.getScreenCTM?.(), c = /* @__PURE__ */ a((g) => g && g > 0 ? g : 1, "toScale"), r = c(n?.a), x = c(n?.d);
    for (const g of t) {
      const m = pi(s, 1, g), _ = m ? m.width / r : g.length * i, S = m ? m.height / x : i;
      e.width = Math.max(e.width, _), e.height = Math.max(e.height, S);
    }
    return s.remove(), e;
  }
}, Et = 0.7, Mt = 0.2, Ot = class {
  constructor(t, i, e, s) {
    this.axisConfig = t, this.title = i, this.textDimensionCalculator = e, this.axisThemeConfig = s, this.boundingRect = { x: 0, y: 0, width: 0, height: 0 }, this.axisPosition = "left", this.showTitle = !1, this.showLabel = !1, this.showTick = !1, this.showAxisLine = !1, this.outerPadding = 0, this.titleTextHeight = 0, this.labelTextHeight = 0, this.normalizedLabelRotationInRad = 0, this.range = [0, 10], this.boundingRect = { x: 0, y: 0, width: 0, height: 0 }, this.axisPosition = "left", this.normalizedLabelRotationInRad = this.axisConfig.labelRotation >= -90 && this.axisConfig.labelRotation <= 90 ? this.axisConfig.labelRotation * Math.PI / 180 : 0;
  }
  static {
    a(this, "BaseAxis");
  }
  setRange(t) {
    this.range = t, this.axisPosition === "left" || this.axisPosition === "right" ? this.boundingRect.height = t[1] - t[0] : this.boundingRect.width = t[1] - t[0], this.recalculateScale();
  }
  getRange() {
    return [this.range[0] + this.outerPadding, this.range[1] - this.outerPadding];
  }
  setAxisPosition(t) {
    this.axisPosition = t, this.setRange(this.range);
  }
  getTickDistance() {
    const t = this.getRange();
    return Math.abs(t[0] - t[1]) / this.getTickValues().length;
  }
  getAxisOuterPadding() {
    return this.outerPadding;
  }
  getLabelDimension() {
    return this.textDimensionCalculator.getMaxDimension(
      this.getTickValues().map((t) => t.toString()),
      this.axisConfig.labelFontSize
    );
  }
  recalculateOuterPaddingToDrawBar() {
    Et * this.getTickDistance() > this.outerPadding * 2 && (this.outerPadding = Math.floor(Et * this.getTickDistance() / 2)), this.recalculateScale();
  }
  calculateSpaceIfDrawnHorizontally(t) {
    let i = t.height;
    if (this.axisConfig.showAxisLine && i > this.axisConfig.axisLineWidth && (i -= this.axisConfig.axisLineWidth, this.showAxisLine = !0), this.axisConfig.showLabel) {
      const e = this.getLabelDimension(), s = Mt * t.width;
      this.outerPadding = Math.min(e.width / 2, s);
      let n = e.height;
      this.axisPosition === "bottom" && this.normalizedLabelRotationInRad !== 0 && (n = Math.max(
        n,
        Math.abs(Math.sin(this.normalizedLabelRotationInRad) * e.width) + Math.abs(Math.cos(this.normalizedLabelRotationInRad) * e.height)
      )), n += this.axisConfig.labelPadding * 2, this.labelTextHeight = e.height, n <= i && (i -= n, this.showLabel = !0);
    }
    if (this.axisConfig.showTick && i >= this.axisConfig.tickLength && (this.showTick = !0, i -= this.axisConfig.tickLength), this.axisConfig.showTitle && this.title) {
      const e = this.textDimensionCalculator.getMaxDimension(
        [this.title],
        this.axisConfig.titleFontSize
      ), s = e.height + this.axisConfig.titlePadding * 2;
      this.titleTextHeight = e.height, s <= i && (i -= s, this.showTitle = !0);
    }
    this.boundingRect.width = t.width, this.boundingRect.height = t.height - i;
  }
  calculateSpaceIfDrawnVertical(t) {
    let i = t.width;
    if (this.axisConfig.showAxisLine && i > this.axisConfig.axisLineWidth && (i -= this.axisConfig.axisLineWidth, this.showAxisLine = !0), this.axisConfig.showLabel) {
      const e = this.getLabelDimension(), s = Mt * t.height;
      this.outerPadding = Math.min(e.height / 2, s);
      const n = e.width + this.axisConfig.labelPadding * 2;
      n <= i && (i -= n, this.showLabel = !0);
    }
    if (this.axisConfig.showTick && i >= this.axisConfig.tickLength && (this.showTick = !0, i -= this.axisConfig.tickLength), this.axisConfig.showTitle && this.title) {
      const e = this.textDimensionCalculator.getMaxDimension(
        [this.title],
        this.axisConfig.titleFontSize
      ), s = e.height + this.axisConfig.titlePadding * 2;
      this.titleTextHeight = e.height, s <= i && (i -= s, this.showTitle = !0);
    }
    this.boundingRect.width = t.width - i, this.boundingRect.height = t.height;
  }
  calculateSpace(t) {
    return this.axisPosition === "left" || this.axisPosition === "right" ? this.calculateSpaceIfDrawnVertical(t) : this.calculateSpaceIfDrawnHorizontally(t), this.recalculateScale(), {
      width: this.boundingRect.width,
      height: this.boundingRect.height
    };
  }
  setBoundingBoxXY(t) {
    this.boundingRect.x = t.x, this.boundingRect.y = t.y;
  }
  calculateOffsetByRotation(t) {
    const i = this.normalizedLabelRotationInRad;
    return i === 0 ? 0 : Math.sin(i) * this.getLabelDimension()[t] / 2;
  }
  getDrawableElementsForLeftAxis() {
    const t = [];
    if (this.showAxisLine) {
      const i = this.boundingRect.x + this.boundingRect.width - this.axisConfig.axisLineWidth / 2;
      t.push({
        type: "path",
        groupTexts: ["left-axis", "axisl-line"],
        data: [
          {
            path: `M ${i},${this.boundingRect.y} L ${i},${this.boundingRect.y + this.boundingRect.height} `,
            strokeFill: this.axisThemeConfig.axisLineColor,
            strokeWidth: this.axisConfig.axisLineWidth
          }
        ]
      });
    }
    if (this.showLabel && t.push({
      type: "text",
      groupTexts: ["left-axis", "label"],
      data: this.getTickValues().map((i) => ({
        text: i.toString(),
        x: this.boundingRect.x + this.boundingRect.width - (this.showLabel ? this.axisConfig.labelPadding : 0) - (this.showTick ? this.axisConfig.tickLength : 0) - (this.showAxisLine ? this.axisConfig.axisLineWidth : 0),
        y: this.getScaleValue(i),
        fill: this.axisThemeConfig.labelColor,
        fontSize: this.axisConfig.labelFontSize,
        rotation: 0,
        verticalPos: "middle",
        horizontalPos: "right"
      }))
    }), this.showTick) {
      const i = this.boundingRect.x + this.boundingRect.width - (this.showAxisLine ? this.axisConfig.axisLineWidth : 0);
      t.push({
        type: "path",
        groupTexts: ["left-axis", "ticks"],
        data: this.getTickValues().map((e) => ({
          path: `M ${i},${this.getScaleValue(e)} L ${i - this.axisConfig.tickLength},${this.getScaleValue(e)}`,
          strokeFill: this.axisThemeConfig.tickColor,
          strokeWidth: this.axisConfig.tickWidth
        }))
      });
    }
    return this.showTitle && t.push({
      type: "text",
      groupTexts: ["left-axis", "title"],
      data: [
        {
          text: this.title,
          x: this.boundingRect.x + this.axisConfig.titlePadding,
          y: this.boundingRect.y + this.boundingRect.height / 2,
          fill: this.axisThemeConfig.titleColor,
          fontSize: this.axisConfig.titleFontSize,
          rotation: 270,
          verticalPos: "top",
          horizontalPos: "center"
        }
      ]
    }), t;
  }
  getDrawableElementsForBottomAxis() {
    const t = [];
    if (this.showAxisLine) {
      const i = this.boundingRect.y + this.axisConfig.axisLineWidth / 2;
      t.push({
        type: "path",
        groupTexts: ["bottom-axis", "axis-line"],
        data: [
          {
            path: `M ${this.boundingRect.x},${i} L ${this.boundingRect.x + this.boundingRect.width},${i}`,
            strokeFill: this.axisThemeConfig.axisLineColor,
            strokeWidth: this.axisConfig.axisLineWidth
          }
        ]
      });
    }
    if (this.showLabel && t.push({
      type: "text",
      groupTexts: ["bottom-axis", "label"],
      data: this.getTickValues().map((i) => ({
        text: i.toString(),
        x: this.getScaleValue(i) + this.calculateOffsetByRotation("height"),
        y: this.boundingRect.y + this.axisConfig.labelPadding + (this.showTick ? this.axisConfig.tickLength : 0) + (this.showAxisLine ? this.axisConfig.axisLineWidth : 0) + Math.abs(this.calculateOffsetByRotation("width")),
        fill: this.axisThemeConfig.labelColor,
        fontSize: this.axisConfig.labelFontSize,
        rotation: this.normalizedLabelRotationInRad * 180 / Math.PI,
        verticalPos: "top",
        horizontalPos: "center"
      }))
    }), this.showTick) {
      const i = this.boundingRect.y + (this.showAxisLine ? this.axisConfig.axisLineWidth : 0);
      t.push({
        type: "path",
        groupTexts: ["bottom-axis", "ticks"],
        data: this.getTickValues().map((e) => ({
          path: `M ${this.getScaleValue(e)},${i} L ${this.getScaleValue(e)},${i + this.axisConfig.tickLength}`,
          strokeFill: this.axisThemeConfig.tickColor,
          strokeWidth: this.axisConfig.tickWidth
        }))
      });
    }
    return this.showTitle && t.push({
      type: "text",
      groupTexts: ["bottom-axis", "title"],
      data: [
        {
          text: this.title,
          x: this.range[0] + (this.range[1] - this.range[0]) / 2,
          y: this.boundingRect.y + this.boundingRect.height - this.axisConfig.titlePadding - this.titleTextHeight,
          fill: this.axisThemeConfig.titleColor,
          fontSize: this.axisConfig.titleFontSize,
          rotation: 0,
          verticalPos: "top",
          horizontalPos: "center"
        }
      ]
    }), t;
  }
  getDrawableElementsForTopAxis() {
    const t = [];
    if (this.showAxisLine) {
      const i = this.boundingRect.y + this.boundingRect.height - this.axisConfig.axisLineWidth / 2;
      t.push({
        type: "path",
        groupTexts: ["top-axis", "axis-line"],
        data: [
          {
            path: `M ${this.boundingRect.x},${i} L ${this.boundingRect.x + this.boundingRect.width},${i}`,
            strokeFill: this.axisThemeConfig.axisLineColor,
            strokeWidth: this.axisConfig.axisLineWidth
          }
        ]
      });
    }
    if (this.showLabel && t.push({
      type: "text",
      groupTexts: ["top-axis", "label"],
      data: this.getTickValues().map((i) => ({
        text: i.toString(),
        x: this.getScaleValue(i),
        y: this.boundingRect.y + (this.showTitle ? this.titleTextHeight + this.axisConfig.titlePadding * 2 : 0) + this.axisConfig.labelPadding,
        fill: this.axisThemeConfig.labelColor,
        fontSize: this.axisConfig.labelFontSize,
        rotation: 0,
        verticalPos: "top",
        horizontalPos: "center"
      }))
    }), this.showTick) {
      const i = this.boundingRect.y;
      t.push({
        type: "path",
        groupTexts: ["top-axis", "ticks"],
        data: this.getTickValues().map((e) => ({
          path: `M ${this.getScaleValue(e)},${i + this.boundingRect.height - (this.showAxisLine ? this.axisConfig.axisLineWidth : 0)} L ${this.getScaleValue(e)},${i + this.boundingRect.height - this.axisConfig.tickLength - (this.showAxisLine ? this.axisConfig.axisLineWidth : 0)}`,
          strokeFill: this.axisThemeConfig.tickColor,
          strokeWidth: this.axisConfig.tickWidth
        }))
      });
    }
    return this.showTitle && t.push({
      type: "text",
      groupTexts: ["top-axis", "title"],
      data: [
        {
          text: this.title,
          x: this.boundingRect.x + this.boundingRect.width / 2,
          y: this.boundingRect.y + this.axisConfig.titlePadding,
          fill: this.axisThemeConfig.titleColor,
          fontSize: this.axisConfig.titleFontSize,
          rotation: 0,
          verticalPos: "top",
          horizontalPos: "center"
        }
      ]
    }), t;
  }
  getDrawableElements() {
    if (this.axisPosition === "left")
      return this.getDrawableElementsForLeftAxis();
    if (this.axisPosition === "right")
      throw Error("Drawing of right axis is not implemented");
    return this.axisPosition === "bottom" ? this.getDrawableElementsForBottomAxis() : this.axisPosition === "top" ? this.getDrawableElementsForTopAxis() : [];
  }
}, Ai = class extends Ot {
  static {
    a(this, "BandAxis");
  }
  constructor(t, i, e, s, n) {
    super(t, s, n, i), this.categories = e, this.scale = ut().domain(this.categories).range(this.getRange());
  }
  setRange(t) {
    super.setRange(t);
  }
  recalculateScale() {
    this.scale = ut().domain(this.categories).range(this.getRange()).paddingInner(1).paddingOuter(0).align(0.5), zt.trace("BandAxis axis final categories, range: ", this.categories, this.getRange());
  }
  getTickValues() {
    return this.categories;
  }
  getScaleValue(t) {
    return this.scale(t) ?? this.getRange()[0];
  }
}, Ci = class extends Ot {
  static {
    a(this, "LinearAxis");
  }
  constructor(t, i, e, s, n) {
    super(t, s, n, i), this.domain = e, this.scale = Lt().domain(this.domain).range(this.getRange());
  }
  getTickValues() {
    return this.scale.ticks();
  }
  recalculateScale() {
    const t = [...this.domain];
    this.axisPosition === "left" && t.reverse(), this.scale = Lt().domain(t).range(this.getRange());
  }
  getScaleValue(t) {
    return this.scale(t);
  }
};
function xt(t, i, e, s) {
  const n = new yt(s);
  return ot(t) ? new Ai(
    i,
    e,
    t.categories,
    t.title,
    n
  ) : new Ci(
    i,
    e,
    [t.min, t.max],
    t.title,
    n
  );
}
a(xt, "getAxis");
var Si = class {
  constructor(t, i, e, s) {
    this.textDimensionCalculator = t, this.chartConfig = i, this.chartData = e, this.chartThemeConfig = s, this.titleWidth = 0, this.boundingRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, this.showChartTitle = !1;
  }
  static {
    a(this, "ChartTitle");
  }
  setBoundingBoxXY(t) {
    this.boundingRect.x = t.x, this.boundingRect.y = t.y;
  }
  calculateSpace(t) {
    const i = this.textDimensionCalculator.getMaxDimension(
      [this.chartData.title],
      this.chartConfig.titleFontSize
    ), e = Math.max(i.width, t.width), s = i.height + 2 * this.chartConfig.titlePadding;
    return s <= t.height && this.chartConfig.showTitle && this.chartData.title && (this.boundingRect.width = e, this.boundingRect.height = s, this.titleWidth = i.width, this.showChartTitle = !0), {
      width: this.boundingRect.width,
      height: this.boundingRect.height
    };
  }
  /**
   * Centre the title over [start, end], shifted as needed to keep it inside the chart.
   * The title has its own row above the plot and legend, so it may use the full chart width.
   */
  alignTo(t, i) {
    const e = Math.min(this.titleWidth, this.chartConfig.width) / 2, s = Math.min(
      Math.max((t + i) / 2, e),
      this.chartConfig.width - e
    );
    this.boundingRect.x = s - e, this.boundingRect.width = e * 2;
  }
  getDrawableElements() {
    const t = [];
    return this.showChartTitle && t.push({
      groupTexts: ["chart-title"],
      type: "text",
      data: [
        {
          fontSize: this.chartConfig.titleFontSize,
          text: this.chartData.title,
          verticalPos: "middle",
          horizontalPos: "center",
          x: this.boundingRect.x + this.boundingRect.width / 2,
          y: this.boundingRect.y + this.boundingRect.height / 2,
          fill: this.chartThemeConfig.titleColor,
          rotation: 0
        }
      ]
    }), t;
  }
};
function Vt(t, i, e, s) {
  const n = new yt(s);
  return new Si(n, t, i, e);
}
a(Vt, "getChartTitleComponent");
var Ri = 0.75, _i = 0.5, ki = 0.35;
function ft(t) {
  return {
    fontSize: t,
    markerSize: t * Ri,
    markerSpacing: t * ki,
    itemSpacing: t * _i
  };
}
a(ft, "getLegendLayout");
var Ti = class {
  constructor(t, i, e, s) {
    this.textDimensionCalculator = t, this.chartConfig = i, this.chartData = e, this.chartThemeConfig = s, this.boundingRect = { x: 0, y: 0, width: 0, height: 0 }, this.visiblePlots = [];
  }
  static {
    a(this, "ChartLegend");
  }
  setBoundingBoxXY(t) {
    this.boundingRect.x = t.x, this.boundingRect.y = t.y;
  }
  calculateSpace(t) {
    if (this.visiblePlots = this.chartConfig.showLegend ? this.chartData.plots.filter((g) => g.title) : [], this.visiblePlots.length === 0)
      return this.boundingRect.width = 0, this.boundingRect.height = 0, { width: 0, height: 0 };
    const { fontSize: i, markerSize: e, markerSpacing: s, itemSpacing: n } = ft(
      this.chartConfig.legendFontSize
    ), c = this.textDimensionCalculator.getMaxDimension(
      this.visiblePlots.map((g) => g.title),
      i
    ), r = this.chartConfig.legendPadding * 2 + e + s + c.width, x = this.chartConfig.legendPadding * 2 + this.visiblePlots.length * i + (this.visiblePlots.length - 1) * n;
    return r <= t.width && x <= t.height ? (this.boundingRect.width = r, this.boundingRect.height = x) : (this.visiblePlots = [], this.boundingRect.width = 0, this.boundingRect.height = 0), {
      width: this.boundingRect.width,
      height: this.boundingRect.height
    };
  }
  getDrawableElements() {
    if (this.visiblePlots.length === 0)
      return [];
    const { fontSize: t, markerSize: i, markerSpacing: e, itemSpacing: s } = ft(
      this.chartConfig.legendFontSize
    ), n = t + s, c = this.boundingRect.x + this.chartConfig.legendPadding, r = this.boundingRect.y + this.chartConfig.legendPadding, x = [], g = [];
    for (const [m, _] of this.visiblePlots.entries())
      if (at(_))
        x.push({
          x: c,
          y: r + m * n,
          width: i,
          height: i,
          fill: _.fill,
          strokeFill: _.fill,
          strokeWidth: 0
        });
      else {
        const S = r + m * n + i / 2;
        g.push({
          path: `M ${c},${S} L ${c + i},${S}`,
          strokeFill: _.strokeFill,
          strokeWidth: _.strokeWidth
        });
      }
    return [
      {
        groupTexts: ["legend", "markers"],
        type: "rect",
        data: x
      },
      {
        groupTexts: ["legend", "markers"],
        type: "path",
        data: g
      },
      {
        groupTexts: ["legend", "label"],
        type: "text",
        data: this.visiblePlots.map((m, _) => ({
          text: m.title,
          x: c + i + e,
          y: r + _ * n + i / 2,
          fill: this.chartThemeConfig.legendTextColor,
          fontSize: t,
          rotation: 0,
          verticalPos: "middle",
          horizontalPos: "left"
        }))
      }
    ];
  }
};
function Wt(t, i, e, s) {
  const n = new yt(s);
  return new Ti(n, t, i, e);
}
a(Wt, "getChartLegendComponent");
var Di = class {
  constructor(t, i, e, s, n) {
    this.plotData = t, this.xAxis = i, this.yAxis = e, this.orientation = s, this.plotIndex = n;
  }
  static {
    a(this, "LinePlot");
  }
  getDrawableElement() {
    const t = this.plotData.data.map((s) => [
      this.xAxis.getScaleValue(s[0]),
      this.yAxis.getScaleValue(s[1])
    ]);
    let i;
    if (this.orientation === "horizontal" ? i = vt().y((s) => s[0]).x((s) => s[1])(t) : i = vt().x((s) => s[0]).y((s) => s[1])(t), !i)
      return [];
    const e = [
      {
        groupTexts: ["plot", `line-plot-${this.plotIndex}`],
        type: "path",
        data: [
          {
            path: i,
            strokeFill: this.plotData.strokeFill,
            strokeWidth: this.plotData.strokeWidth
          }
        ]
      }
    ];
    if (this.plotData.pointLabels && this.plotData.pointLabels.length > 0) {
      const c = [];
      for (const [r, [x, g]] of t.entries()) {
        const m = this.plotData.pointLabels[r];
        m && (this.orientation === "horizontal" ? c.push({
          x: g + 10,
          y: x,
          text: m,
          fill: this.plotData.strokeFill,
          verticalPos: "middle",
          horizontalPos: "left",
          fontSize: 12,
          rotation: 0
        }) : c.push({
          x,
          y: g - 10,
          text: m,
          fill: this.plotData.strokeFill,
          verticalPos: "middle",
          horizontalPos: "center",
          fontSize: 12,
          rotation: 0
        }));
      }
      c.length > 0 && e.push({
        groupTexts: ["plot", `line-plot-${this.plotIndex}`, "labels"],
        type: "text",
        data: c
      });
    }
    return e;
  }
}, Pi = class {
  constructor(t, i, e, s, n, c) {
    this.barData = t, this.boundingRect = i, this.xAxis = e, this.yAxis = s, this.orientation = n, this.plotIndex = c;
  }
  static {
    a(this, "BarPlot");
  }
  getDrawableElement() {
    const t = this.barData.data.map((n) => [
      this.xAxis.getScaleValue(n[0]),
      this.yAxis.getScaleValue(n[1])
    ]), e = Math.min(this.xAxis.getAxisOuterPadding() * 2, this.xAxis.getTickDistance()) * (1 - 0.05), s = e / 2;
    return this.orientation === "horizontal" ? [
      {
        groupTexts: ["plot", `bar-plot-${this.plotIndex}`],
        type: "rect",
        data: t.map((n) => ({
          x: this.boundingRect.x,
          y: n[0] - s,
          height: e,
          width: n[1] - this.boundingRect.x,
          fill: this.barData.fill,
          strokeWidth: 0,
          strokeFill: this.barData.fill
        }))
      }
    ] : [
      {
        groupTexts: ["plot", `bar-plot-${this.plotIndex}`],
        type: "rect",
        data: t.map((n) => ({
          x: n[0] - s,
          y: n[1],
          width: e,
          height: this.boundingRect.y + this.boundingRect.height - n[1],
          fill: this.barData.fill,
          strokeWidth: 0,
          strokeFill: this.barData.fill
        }))
      }
    ];
  }
}, vi = class {
  constructor(t, i, e) {
    this.chartConfig = t, this.chartData = i, this.chartThemeConfig = e, this.boundingRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
  static {
    a(this, "BasePlot");
  }
  setAxes(t, i) {
    this.xAxis = t, this.yAxis = i;
  }
  setBoundingBoxXY(t) {
    this.boundingRect.x = t.x, this.boundingRect.y = t.y;
  }
  calculateSpace(t) {
    return this.boundingRect.width = t.width, this.boundingRect.height = t.height, {
      width: this.boundingRect.width,
      height: this.boundingRect.height
    };
  }
  getDrawableElements() {
    if (!(this.xAxis && this.yAxis))
      throw Error("Axes must be passed to render Plots");
    const t = [];
    for (const [i, e] of this.chartData.plots.entries())
      switch (e.type) {
        case "line":
          {
            const s = new Di(
              e,
              this.xAxis,
              this.yAxis,
              this.chartConfig.chartOrientation,
              i
            );
            t.push(...s.getDrawableElement());
          }
          break;
        case "bar":
          {
            const s = new Pi(
              e,
              this.boundingRect,
              this.xAxis,
              this.yAxis,
              this.chartConfig.chartOrientation,
              i
            );
            t.push(...s.getDrawableElement());
          }
          break;
      }
    return t;
  }
};
function Ft(t, i, e) {
  return new vi(t, i, e);
}
a(Ft, "getPlotComponent");
var Li = class {
  constructor(t, i, e, s) {
    this.chartConfig = t, this.chartData = i, this.componentStore = {
      title: Vt(t, i, e, s),
      plot: Ft(t, i, e),
      legend: Wt(t, i, e, s),
      xAxis: xt(
        i.xAxis,
        t.xAxis,
        {
          titleColor: e.xAxisTitleColor,
          labelColor: e.xAxisLabelColor,
          tickColor: e.xAxisTickColor,
          axisLineColor: e.xAxisLineColor
        },
        s
      ),
      yAxis: xt(
        i.yAxis,
        t.yAxis,
        {
          titleColor: e.yAxisTitleColor,
          labelColor: e.yAxisLabelColor,
          tickColor: e.yAxisTickColor,
          axisLineColor: e.yAxisLineColor
        },
        s
      )
    };
  }
  static {
    a(this, "Orchestrator");
  }
  calculateVerticalSpace() {
    let t = this.chartConfig.width, i = this.chartConfig.height, e = 0, s = 0, n = { width: 0, height: 0 }, c = Math.floor(t * this.chartConfig.plotReservedSpacePercent / 100), r = Math.floor(
      i * this.chartConfig.plotReservedSpacePercent / 100
    ), x = this.componentStore.plot.calculateSpace({
      width: c,
      height: r
    });
    t -= x.width, i -= x.height, x = this.componentStore.title.calculateSpace({
      width: this.chartConfig.width,
      height: i
    }), s = x.height, i -= x.height, this.componentStore.xAxis.setAxisPosition("bottom"), x = this.componentStore.xAxis.calculateSpace({
      width: t,
      height: i
    }), i -= x.height, this.componentStore.yAxis.setAxisPosition("left"), x = this.componentStore.yAxis.calculateSpace({
      width: t,
      height: i
    }), e = x.width, t -= x.width, n = this.componentStore.legend.calculateSpace({
      width: t,
      height: r
    }), t -= n.width, t > 0 && (c += t, t = 0), i > 0 && (r += i, i = 0), this.componentStore.plot.calculateSpace({
      width: c,
      height: r
    }), this.componentStore.plot.setBoundingBoxXY({ x: e, y: s }), this.componentStore.title.alignTo(e, e + c), this.componentStore.legend.setBoundingBoxXY({
      x: e + c,
      y: s + Math.max((r - n.height) / 2, 0)
    }), this.componentStore.xAxis.setRange([e, e + c]), this.componentStore.xAxis.setBoundingBoxXY({ x: e, y: s + r }), this.componentStore.yAxis.setRange([s, s + r]), this.componentStore.yAxis.setBoundingBoxXY({ x: 0, y: s }), this.chartData.plots.some((g) => at(g)) && this.componentStore.xAxis.recalculateOuterPaddingToDrawBar();
  }
  calculateHorizontalSpace() {
    let t = this.chartConfig.width, i = this.chartConfig.height, e = 0, s = 0, n = 0, c = { width: 0, height: 0 }, r = Math.floor(t * this.chartConfig.plotReservedSpacePercent / 100), x = Math.floor(
      i * this.chartConfig.plotReservedSpacePercent / 100
    ), g = this.componentStore.plot.calculateSpace({
      width: r,
      height: x
    });
    t -= g.width, i -= g.height, g = this.componentStore.title.calculateSpace({
      width: this.chartConfig.width,
      height: i
    }), e = g.height, i -= g.height, this.componentStore.xAxis.setAxisPosition("left"), g = this.componentStore.xAxis.calculateSpace({
      width: t,
      height: i
    }), t -= g.width, s = g.width, this.componentStore.yAxis.setAxisPosition("top"), g = this.componentStore.yAxis.calculateSpace({
      width: t,
      height: i
    }), i -= g.height, n = e + g.height, c = this.componentStore.legend.calculateSpace({
      width: t,
      height: x
    }), t -= c.width, t > 0 && (r += t, t = 0), i > 0 && (x += i, i = 0), this.componentStore.plot.calculateSpace({
      width: r,
      height: x
    }), this.componentStore.plot.setBoundingBoxXY({ x: s, y: n }), this.componentStore.title.alignTo(s, s + r), this.componentStore.legend.setBoundingBoxXY({
      x: s + r,
      y: n + Math.max((x - c.height) / 2, 0)
    }), this.componentStore.yAxis.setRange([s, s + r]), this.componentStore.yAxis.setBoundingBoxXY({ x: s, y: e }), this.componentStore.xAxis.setRange([n, n + x]), this.componentStore.xAxis.setBoundingBoxXY({ x: 0, y: n }), this.chartData.plots.some((m) => at(m)) && this.componentStore.xAxis.recalculateOuterPaddingToDrawBar();
  }
  calculateSpace() {
    this.chartConfig.chartOrientation === "horizontal" ? this.calculateHorizontalSpace() : this.calculateVerticalSpace();
  }
  getDrawableElement() {
    this.calculateSpace();
    const t = [];
    this.componentStore.plot.setAxes(this.componentStore.xAxis, this.componentStore.yAxis);
    for (const i of Object.values(this.componentStore))
      t.push(...i.getDrawableElements());
    return t;
  }
}, Ei = class {
  static {
    a(this, "XYChartBuilder");
  }
  static build(t, i, e, s) {
    return new Li(t, i, e, s).getDrawableElement();
  }
}, Z = 0, Xt, tt = At(), it = wt(), b = Ct(), pt = it.plotColorPalette.split(",").map((t) => t.trim()), ht = !1, bt = !1;
function wt() {
  const t = fi(), i = mt();
  return Bt(t.xyChart, i.themeVariables.xyChart);
}
a(wt, "getChartDefaultThemeConfig");
function At() {
  const t = mt();
  return Bt(
    xi.xyChart,
    t.xyChart
  );
}
a(At, "getChartDefaultConfig");
function Ct() {
  return {
    yAxis: {
      type: "linear",
      title: "",
      min: 1 / 0,
      max: -1 / 0
    },
    xAxis: {
      type: "band",
      title: "",
      categories: []
    },
    title: "",
    plots: []
  };
}
a(Ct, "getChartDefaultData");
function G(t) {
  const i = mt();
  return di(t.trim(), i);
}
a(G, "textSanitizer");
function Yt(t) {
  Xt = t;
}
a(Yt, "setTmpSVGG");
function Nt(t) {
  t === "horizontal" ? tt.chartOrientation = "horizontal" : tt.chartOrientation = "vertical";
}
a(Nt, "setOrientation");
function Ht(t) {
  b.xAxis.title = G(t.text);
}
a(Ht, "setXAxisTitle");
function St(t, i) {
  b.xAxis = { type: "linear", title: b.xAxis.title, min: t, max: i }, ht = !0;
}
a(St, "setXAxisRangeData");
function $t(t) {
  b.xAxis = {
    type: "band",
    title: b.xAxis.title,
    categories: t.map((i) => G(i.text))
  }, ht = !0;
}
a($t, "setXAxisBand");
function Ut(t) {
  b.yAxis.title = G(t.text);
}
a(Ut, "setYAxisTitle");
function Gt(t, i) {
  b.yAxis = { type: "linear", title: b.yAxis.title, min: t, max: i }, bt = !0;
}
a(Gt, "setYAxisRangeData");
function qt(t) {
  const i = Math.min(...t), e = Math.max(...t), s = Q(b.yAxis) ? b.yAxis.min : 1 / 0, n = Q(b.yAxis) ? b.yAxis.max : -1 / 0;
  b.yAxis = {
    type: "linear",
    title: b.yAxis.title,
    min: Math.min(s, i),
    max: Math.max(n, e)
  };
}
a(qt, "setYAxisRangeFromPlotData");
function Rt(t) {
  let i = [];
  if (t.length === 0)
    return i;
  if (!ht) {
    const e = Q(b.xAxis) ? b.xAxis.min : 1 / 0, s = Q(b.xAxis) ? b.xAxis.max : -1 / 0;
    St(Math.min(e, 1), Math.max(s, t.length));
  }
  if (ot(b.xAxis) && t.length > b.xAxis.categories.length && (t = t.slice(0, b.xAxis.categories.length)), bt || qt(t), ot(b.xAxis) && (i = b.xAxis.categories.map((e, s) => [e, t[s]])), Q(b.xAxis)) {
    const e = b.xAxis.min, s = b.xAxis.max;
    if (t.length === 1)
      i = [[`${e}`, t[0]]];
    else {
      const n = (s - e) / (t.length - 1);
      i = t.map((c, r) => [`${e + r * n}`, c]);
    }
  }
  return i;
}
a(Rt, "transformDataWithoutCategory");
function _t(t) {
  return pt[t === 0 ? 0 : t % pt.length];
}
a(_t, "getPlotColorFromPalette");
function jt(t, i) {
  const e = i.map((r) => r.value), s = i.map((r) => r.label ? G(r.label) : ""), n = Rt(e), c = s.some((r) => r !== "");
  b.plots.push({
    type: "line",
    title: G(t.text),
    strokeFill: _t(Z),
    strokeWidth: 2,
    data: n,
    ...c ? { pointLabels: s } : {}
  }), Z++;
}
a(jt, "setLineData");
function Qt(t, i) {
  const e = i.map((n) => n.value), s = Rt(e);
  b.plots.push({
    type: "bar",
    title: G(t.text),
    fill: _t(Z),
    data: s
  }), Z++;
}
a(Qt, "setBarData");
function Kt() {
  if (b.plots.length === 0)
    throw Error("No Plot to render, please provide a plot with some data");
  return b.title = It(), Ei.build(tt, b, it, Xt);
}
a(Kt, "getDrawableElem");
function Jt() {
  return it;
}
a(Jt, "getChartThemeConfig");
function Zt() {
  return tt;
}
a(Zt, "getChartConfig");
function ti() {
  return b;
}
a(ti, "getXYChartData");
var Mi = /* @__PURE__ */ a(function() {
  ui(), Z = 0, tt = At(), b = Ct(), it = wt(), pt = it.plotColorPalette.split(",").map((t) => t.trim()), ht = !1, bt = !1;
}, "clear"), Ii = {
  getDrawableElem: Kt,
  clear: Mi,
  setAccTitle: li,
  getAccTitle: ri,
  setDiagramTitle: hi,
  getDiagramTitle: It,
  getAccDescription: oi,
  setAccDescription: ai,
  setOrientation: Nt,
  setXAxisTitle: Ht,
  setXAxisRangeData: St,
  setXAxisBand: $t,
  setYAxisTitle: Ut,
  setYAxisRangeData: Gt,
  setLineData: jt,
  setBarData: Qt,
  setTmpSVGG: Yt,
  getChartThemeConfig: Jt,
  getChartConfig: Zt,
  getXYChartData: ti
}, zi = /* @__PURE__ */ a((t, i, e, s) => {
  const n = s.db, c = n.getChartThemeConfig(), r = n.getChartConfig(), x = n.getXYChartData().plots[0].data.map((y) => y[1]);
  function g(y) {
    return y === "top" ? "text-before-edge" : "middle";
  }
  a(g, "getDominantBaseLine");
  function m(y) {
    return y === "left" ? "start" : y === "right" ? "end" : "middle";
  }
  a(m, "getTextAnchor");
  function _(y) {
    return `translate(${y.x}, ${y.y}) rotate(${y.rotation || 0})`;
  }
  a(_, "getTextTransformation"), zt.debug(`Rendering xychart chart
` + t);
  const S = ci(i), w = S.append("g").attr("class", "main"), E = w.append("rect").attr("width", r.width).attr("height", r.height).attr("class", "background");
  gi(S, r.height, r.width, !0), S.attr("viewBox", `0 0 ${r.width} ${r.height}`), E.attr("fill", c.backgroundColor), n.setTmpSVGG(S.append("g").attr("class", "mermaid-tmp-group"));
  const v = n.getDrawableElem(), L = {};
  function M(y) {
    let D = w, l = "";
    for (const [B] of y.entries()) {
      let W = w;
      B > 0 && L[l] && (W = L[l]), l += y[B], D = L[l], D || (D = L[l] = W.append("g").attr("class", y[B]));
    }
    return D;
  }
  a(M, "getGroup");
  for (const y of v) {
    if (y.data.length === 0)
      continue;
    const D = M(y.groupTexts);
    switch (y.type) {
      case "rect":
        if (D.selectAll("rect").data(y.data).enter().append("rect").attr("x", (l) => l.x).attr("y", (l) => l.y).attr("width", (l) => l.width).attr("height", (l) => l.height).attr("fill", (l) => l.fill).attr("stroke", (l) => l.strokeFill).attr("stroke-width", (l) => l.strokeWidth), r.showDataLabel) {
          const l = r.showDataLabelOutsideBar;
          if (r.chartOrientation === "horizontal") {
            let B = function(C, O) {
              const { data: T, label: K } = C;
              return O * K.length * W <= T.width - X;
            };
            a(B, "fitsHorizontally");
            const W = 0.7, X = 10, Y = y.data.map((C, O) => ({ data: C, label: x[O].toString() })).filter((C) => C.data.width > 0 && C.data.height > 0), k = Y.map((C) => {
              const { data: O } = C;
              let T = O.height * 0.7;
              for (; !B(C, T) && T > 0; )
                T -= 1;
              return T;
            }), H = Math.floor(Math.min(...k)), A = /* @__PURE__ */ a((C) => l ? C.data.x + C.data.width + X : C.data.x + C.data.width - X, "determineLabelXPosition");
            D.selectAll("text").data(Y).enter().append("text").attr("x", A).attr("y", (C) => C.data.y + C.data.height / 2).attr("text-anchor", l ? "start" : "end").attr("dominant-baseline", "middle").attr("fill", c.dataLabelColor).attr("font-size", `${H}px`).text((C) => C.label);
          } else {
            let B = function(A, C, O) {
              const { data: T, label: K } = A, F = C * K.length * 0.7, h = T.x + T.width / 2, u = h - F / 2, d = h + F / 2, f = u >= T.x && d <= T.x + T.width, R = T.y + O + C <= T.y + T.height;
              return f && R;
            };
            a(B, "fitsInBar");
            const W = 10, X = y.data.map((A, C) => ({ data: A, label: x[C].toString() })).filter((A) => A.data.width > 0 && A.data.height > 0), Y = X.map((A) => {
              const { data: C, label: O } = A;
              let T = C.width / (O.length * 0.7);
              for (; !B(A, T, W) && T > 0; )
                T -= 1;
              return T;
            }), k = Math.floor(Math.min(...Y)), H = /* @__PURE__ */ a((A) => l ? A.data.y - W : A.data.y + W, "determineLabelYPosition");
            D.selectAll("text").data(X).enter().append("text").attr("x", (A) => A.data.x + A.data.width / 2).attr("y", H).attr("text-anchor", "middle").attr("dominant-baseline", l ? "auto" : "hanging").attr("fill", c.dataLabelColor).attr("font-size", `${k}px`).text((A) => A.label);
          }
        }
        break;
      case "text":
        D.selectAll("text").data(y.data).enter().append("text").attr("x", 0).attr("y", 0).attr("fill", (l) => l.fill).attr("font-size", (l) => l.fontSize).attr("dominant-baseline", (l) => g(l.verticalPos)).attr("text-anchor", (l) => m(l.horizontalPos)).attr("transform", (l) => _(l)).text((l) => l.text);
        break;
      case "path":
        D.selectAll("path").data(y.data).enter().append("path").attr("d", (l) => l.path).attr("fill", (l) => l.fill ? l.fill : "none").attr("stroke", (l) => l.strokeFill).attr("stroke-width", (l) => l.strokeWidth);
        break;
    }
  }
}, "draw"), Bi = {
  draw: zi
}, Xi = {
  parser: wi,
  db: Ii,
  renderer: Bi
};
export {
  Xi as diagram
};
