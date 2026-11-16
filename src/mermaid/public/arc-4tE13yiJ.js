import { bA as ln, aY as an, I as B, bl as w, G as S, ag as rn, W as g, br as tn, bm as H, aR as _, c as un, m as o, aP as on, j as sn, d as fn } from "./mermaid.core-CnOyqc27.js";
function cn(l) {
  return l.innerRadius;
}
function gn(l) {
  return l.outerRadius;
}
function yn(l) {
  return l.startAngle;
}
function mn(l) {
  return l.endAngle;
}
function dn(l) {
  return l && l.padAngle;
}
function pn(l, h, q, I, v, A, W, a) {
  var D = q - l, i = I - h, n = W - v, m = a - A, r = m * D - n * i;
  if (!(r * r < g))
    return r = (n * (h - A) - m * (l - v)) / r, [l + r * D, h + r * i];
}
function Q(l, h, q, I, v, A, W) {
  var a = l - q, D = h - I, i = (W ? A : -A) / H(a * a + D * D), n = i * D, m = -i * a, r = l + n, s = h + m, f = q + n, c = I + m, Y = (r + f) / 2, t = (s + c) / 2, d = f - r, y = c - s, R = d * d + y * y, T = v - A, P = r * c - f * s, E = (y < 0 ? -1 : 1) * H(on(0, T * T * R - P * P)), G = (P * y - d * E) / R, O = (-P * d - y * E) / R, b = (P * y + d * E) / R, p = (-P * d + y * E) / R, x = G - Y, e = O - t, u = b - Y, z = p - t;
  return x * x + e * e > u * u + z * z && (G = b, O = p), {
    cx: G,
    cy: O,
    x01: -n,
    y01: -m,
    x11: G * (v / T - 1),
    y11: O * (v / T - 1)
  };
}
function hn() {
  var l = cn, h = gn, q = S(0), I = null, v = yn, A = mn, W = dn, a = null, D = ln(i);
  function i() {
    var n, m, r = +l.apply(this, arguments), s = +h.apply(this, arguments), f = v.apply(this, arguments) - rn, c = A.apply(this, arguments) - rn, Y = un(c - f), t = c > f;
    if (a || (a = n = D()), s < r && (m = s, s = r, r = m), !(s > g)) a.moveTo(0, 0);
    else if (Y > tn - g)
      a.moveTo(s * B(f), s * w(f)), a.arc(0, 0, s, f, c, !t), r > g && (a.moveTo(r * B(c), r * w(c)), a.arc(0, 0, r, c, f, t));
    else {
      var d = f, y = c, R = f, T = c, P = Y, E = Y, G = W.apply(this, arguments) / 2, O = G > g && (I ? +I.apply(this, arguments) : H(r * r + s * s)), b = _(un(s - r) / 2, +q.apply(this, arguments)), p = b, x = b, e, u;
      if (O > g) {
        var z = sn(O / r * w(G)), J = sn(O / s * w(G));
        (P -= z * 2) > g ? (z *= t ? 1 : -1, R += z, T -= z) : (P = 0, R = T = (f + c) / 2), (E -= J * 2) > g ? (J *= t ? 1 : -1, d += J, y -= J) : (E = 0, d = y = (f + c) / 2);
      }
      var C = s * B(d), F = s * w(d), K = r * B(T), L = r * w(T);
      if (b > g) {
        var M = s * B(y), N = s * w(y), U = r * B(R), V = r * w(R), j;
        if (Y < an)
          if (j = pn(C, F, U, V, M, N, K, L)) {
            var X = C - j[0], Z = F - j[1], $ = M - j[0], k = N - j[1], nn = 1 / w(fn((X * $ + Z * k) / (H(X * X + Z * Z) * H($ * $ + k * k))) / 2), en = H(j[0] * j[0] + j[1] * j[1]);
            p = _(b, (r - en) / (nn - 1)), x = _(b, (s - en) / (nn + 1));
          } else
            p = x = 0;
      }
      E > g ? x > g ? (e = Q(U, V, C, F, s, x, t), u = Q(M, N, K, L, s, x, t), a.moveTo(e.cx + e.x01, e.cy + e.y01), x < b ? a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(u.y01, u.x01), !t) : (a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(e.y11, e.x11), !t), a.arc(0, 0, s, o(e.cy + e.y11, e.cx + e.x11), o(u.cy + u.y11, u.cx + u.x11), !t), a.arc(u.cx, u.cy, x, o(u.y11, u.x11), o(u.y01, u.x01), !t))) : (a.moveTo(C, F), a.arc(0, 0, s, d, y, !t)) : a.moveTo(C, F), !(r > g) || !(P > g) ? a.lineTo(K, L) : p > g ? (e = Q(K, L, M, N, r, -p, t), u = Q(C, F, U, V, r, -p, t), a.lineTo(e.cx + e.x01, e.cy + e.y01), p < b ? a.arc(e.cx, e.cy, p, o(e.y01, e.x01), o(u.y01, u.x01), !t) : (a.arc(e.cx, e.cy, p, o(e.y01, e.x01), o(e.y11, e.x11), !t), a.arc(0, 0, r, o(e.cy + e.y11, e.cx + e.x11), o(u.cy + u.y11, u.cx + u.x11), t), a.arc(u.cx, u.cy, p, o(u.y11, u.x11), o(u.y01, u.x01), !t))) : a.arc(0, 0, r, T, R, t);
    }
    if (a.closePath(), n) return a = null, n + "" || null;
  }
  return i.centroid = function() {
    var n = (+l.apply(this, arguments) + +h.apply(this, arguments)) / 2, m = (+v.apply(this, arguments) + +A.apply(this, arguments)) / 2 - an / 2;
    return [B(m) * n, w(m) * n];
  }, i.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : S(+n), i) : l;
  }, i.outerRadius = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : S(+n), i) : h;
  }, i.cornerRadius = function(n) {
    return arguments.length ? (q = typeof n == "function" ? n : S(+n), i) : q;
  }, i.padRadius = function(n) {
    return arguments.length ? (I = n == null ? null : typeof n == "function" ? n : S(+n), i) : I;
  }, i.startAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : S(+n), i) : v;
  }, i.endAngle = function(n) {
    return arguments.length ? (A = typeof n == "function" ? n : S(+n), i) : A;
  }, i.padAngle = function(n) {
    return arguments.length ? (W = typeof n == "function" ? n : S(+n), i) : W;
  }, i.context = function(n) {
    return arguments.length ? (a = n ?? null, i) : a;
  }, i;
}
export {
  hn as d
};
