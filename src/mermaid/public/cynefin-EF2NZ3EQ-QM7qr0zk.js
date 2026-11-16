var vR = Object.create, hi = Object.defineProperty, TR = Object.getOwnPropertyDescriptor, pc = Object.getOwnPropertyNames, $R = Object.getPrototypeOf, RR = Object.prototype.hasOwnProperty, i = (e, t) => hi(e, "name", { value: t, configurable: !0 }), AR = (e, t) => function() {
  return e && (t = (0, e[pc(e)[0]])(e = 0)), t;
}, H = (e, t) => function() {
  return t || (0, e[pc(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, ER = (e, t) => {
  for (var r in t)
    hi(e, r, { get: t[r], enumerable: !0 });
}, Dd = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let a of pc(t))
      !RR.call(e, a) && a !== r && hi(e, a, { get: () => t[a], enumerable: !(n = TR(t, a)) || n.enumerable });
  return e;
}, dc = (e, t, r) => (r = e != null ? vR($R(e)) : {}, Dd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  hi(r, "default", { value: e, enumerable: !0 }),
  e
)), mc = (e) => Dd(hi({}, "__esModule", { value: !0 }), e), yi = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/is.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.boolean = t, e.string = r, e.number = n, e.error = a, e.func = s, e.array = o, e.stringArray = l;
    function t(u) {
      return u === !0 || u === !1;
    }
    i(t, "boolean");
    function r(u) {
      return typeof u == "string" || u instanceof String;
    }
    i(r, "string");
    function n(u) {
      return typeof u == "number" || u instanceof Number;
    }
    i(n, "number");
    function a(u) {
      return u instanceof Error;
    }
    i(a, "error");
    function s(u) {
      return typeof u == "function";
    }
    i(s, "func");
    function o(u) {
      return Array.isArray(u);
    }
    i(o, "array");
    function l(u) {
      return o(u) && u.every((c) => r(c));
    }
    i(l, "stringArray");
  }
}), xd = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messages.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(R, g, b, I) {
      I === void 0 && (I = b);
      var _ = Object.getOwnPropertyDescriptor(g, b);
      (!_ || ("get" in _ ? !g.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return g[b];
      }, "get") }), Object.defineProperty(R, I, _);
    }) : (function(R, g, b, I) {
      I === void 0 && (I = b), R[I] = g[b];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(R, g) {
      Object.defineProperty(R, "default", { enumerable: !0, value: g });
    }) : function(R, g) {
      R.default = g;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var R = /* @__PURE__ */ i(function(g) {
        return R = Object.getOwnPropertyNames || function(b) {
          var I = [];
          for (var _ in b) Object.prototype.hasOwnProperty.call(b, _) && (I[I.length] = _);
          return I;
        }, R(g);
      }, "ownKeys");
      return function(g) {
        if (g && g.__esModule) return g;
        var b = {};
        if (g != null)
          for (var I = R(g), _ = 0; _ < I.length; _++) I[_] !== "default" && t(b, g, I[_]);
        return r(b, g), b;
      };
    })();
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Message = e.NotificationType9 = e.NotificationType8 = e.NotificationType7 = e.NotificationType6 = e.NotificationType5 = e.NotificationType4 = e.NotificationType3 = e.NotificationType2 = e.NotificationType1 = e.NotificationType0 = e.NotificationType = e.RequestType9 = e.RequestType8 = e.RequestType7 = e.RequestType6 = e.RequestType5 = e.RequestType4 = e.RequestType3 = e.RequestType2 = e.RequestType1 = e.RequestType = e.RequestType0 = e.AbstractMessageSignature = e.ParameterStructures = e.ResponseError = e.ErrorCodes = void 0;
    var a = n(yi()), s;
    (function(R) {
      R.ParseError = -32700, R.InvalidRequest = -32600, R.MethodNotFound = -32601, R.InvalidParams = -32602, R.InternalError = -32603, R.jsonrpcReservedErrorRangeStart = -32099, R.serverErrorStart = -32099, R.MessageWriteError = -32099, R.MessageReadError = -32098, R.PendingResponseRejected = -32097, R.ConnectionInactive = -32096, R.ServerNotInitialized = -32002, R.UnknownErrorCode = -32001, R.jsonrpcReservedErrorRangeEnd = -32e3, R.serverErrorEnd = -32e3;
    })(s || (e.ErrorCodes = s = {}));
    var o = class Gd extends Error {
      static {
        i(this, "ResponseError");
      }
      code;
      data;
      constructor(g, b, I) {
        super(b), this.code = a.number(g) ? g : s.UnknownErrorCode, this.data = I, Object.setPrototypeOf(this, Gd.prototype);
      }
      toJson() {
        const g = {
          code: this.code,
          message: this.message
        };
        return this.data !== void 0 && (g.data = this.data), g;
      }
    };
    e.ResponseError = o;
    var l = class Tr {
      static {
        i(this, "ParameterStructures");
      }
      kind;
      /**
       * The parameter structure is automatically inferred on the number of parameters
       * and the parameter type in case of a single param.
       */
      static auto = new Tr("auto");
      /**
       * Forces `byPosition` parameter structure. This is useful if you have a single
       * parameter which has a literal type.
       */
      static byPosition = new Tr("byPosition");
      /**
       * Forces `byName` parameter structure. This is only useful when having a single
       * parameter. The library will report errors if used with a different number of
       * parameters.
       */
      static byName = new Tr("byName");
      constructor(g) {
        this.kind = g;
      }
      static is(g) {
        return g === Tr.auto || g === Tr.byName || g === Tr.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    e.ParameterStructures = l;
    var u = class {
      static {
        i(this, "AbstractMessageSignature");
      }
      method;
      numberOfParams;
      constructor(R, g) {
        this.method = R, this.numberOfParams = g;
      }
      get parameterStructures() {
        return l.auto;
      }
    };
    e.AbstractMessageSignature = u;
    var c = class extends u {
      static {
        i(this, "RequestType0");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 0);
      }
    };
    e.RequestType0 = c;
    var p = class extends u {
      static {
        i(this, "RequestType");
      }
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R, g = l.auto) {
        super(R, 1), this._parameterStructures = g;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    e.RequestType = p;
    var h = class extends u {
      static {
        i(this, "RequestType1");
      }
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R, g = l.auto) {
        super(R, 1), this._parameterStructures = g;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    e.RequestType1 = h;
    var y = class extends u {
      static {
        i(this, "RequestType2");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 2);
      }
    };
    e.RequestType2 = y;
    var d = class extends u {
      static {
        i(this, "RequestType3");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 3);
      }
    };
    e.RequestType3 = d;
    var A = class extends u {
      static {
        i(this, "RequestType4");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 4);
      }
    };
    e.RequestType4 = A;
    var T = class extends u {
      static {
        i(this, "RequestType5");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 5);
      }
    };
    e.RequestType5 = T;
    var v = class extends u {
      static {
        i(this, "RequestType6");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 6);
      }
    };
    e.RequestType6 = v;
    var $ = class extends u {
      static {
        i(this, "RequestType7");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 7);
      }
    };
    e.RequestType7 = $;
    var S = class extends u {
      static {
        i(this, "RequestType8");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 8);
      }
    };
    e.RequestType8 = S;
    var E = class extends u {
      static {
        i(this, "RequestType9");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 9);
      }
    };
    e.RequestType9 = E;
    var O = class extends u {
      static {
        i(this, "NotificationType");
      }
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R, g = l.auto) {
        super(R, 1), this._parameterStructures = g;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    e.NotificationType = O;
    var M = class extends u {
      static {
        i(this, "NotificationType0");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 0);
      }
    };
    e.NotificationType0 = M;
    var F = class extends u {
      static {
        i(this, "NotificationType1");
      }
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R, g = l.auto) {
        super(R, 1), this._parameterStructures = g;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    e.NotificationType1 = F;
    var U = class extends u {
      static {
        i(this, "NotificationType2");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 2);
      }
    };
    e.NotificationType2 = U;
    var J = class extends u {
      static {
        i(this, "NotificationType3");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 3);
      }
    };
    e.NotificationType3 = J;
    var ne = class extends u {
      static {
        i(this, "NotificationType4");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 4);
      }
    };
    e.NotificationType4 = ne;
    var Y = class extends u {
      static {
        i(this, "NotificationType5");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 5);
      }
    };
    e.NotificationType5 = Y;
    var L = class extends u {
      static {
        i(this, "NotificationType6");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 6);
      }
    };
    e.NotificationType6 = L;
    var k = class extends u {
      static {
        i(this, "NotificationType7");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 7);
      }
    };
    e.NotificationType7 = k;
    var x = class extends u {
      static {
        i(this, "NotificationType8");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 8);
      }
    };
    e.NotificationType8 = x;
    var G = class extends u {
      static {
        i(this, "NotificationType9");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(R) {
        super(R, 9);
      }
    };
    e.NotificationType9 = G;
    var P;
    (function(R) {
      function g(_) {
        const N = _;
        return N && a.string(N.method) && (a.string(N.id) || a.number(N.id));
      }
      i(g, "isRequest"), R.isRequest = g;
      function b(_) {
        const N = _;
        return N && a.string(N.method) && _.id === void 0;
      }
      i(b, "isNotification"), R.isNotification = b;
      function I(_) {
        const N = _;
        return N && (N.result !== void 0 || !!N.error) && (a.string(N.id) || a.number(N.id) || N.id === null);
      }
      i(I, "isResponse"), R.isResponse = I;
    })(P || (e.Message = P = {}));
  }
}), Fd = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.LRUCache = e.LinkedMap = e.Touch = void 0;
    var t;
    (function(a) {
      a.None = 0, a.First = 1, a.AsOld = a.First, a.Last = 2, a.AsNew = a.Last;
    })(t || (e.Touch = t = {}));
    var r = class {
      static {
        i(this, "LinkedMap");
      }
      [Symbol.toStringTag] = "LinkedMap";
      _map;
      _head;
      _tail;
      _size;
      _state;
      constructor() {
        this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
      }
      clear() {
        this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        return this._head?.value;
      }
      get last() {
        return this._tail?.value;
      }
      before(a) {
        const s = this._map.get(a);
        return s ? s.previous?.value : void 0;
      }
      after(a) {
        const s = this._map.get(a);
        return s ? s.next?.value : void 0;
      }
      has(a) {
        return this._map.has(a);
      }
      get(a, s = t.None) {
        const o = this._map.get(a);
        if (o)
          return s !== t.None && this.touch(o, s), o.value;
      }
      set(a, s, o = t.None) {
        let l = this._map.get(a);
        if (l)
          l.value = s, o !== t.None && this.touch(l, o);
        else {
          switch (l = { key: a, value: s, next: void 0, previous: void 0 }, o) {
            case t.None:
              this.addItemLast(l);
              break;
            case t.First:
              this.addItemFirst(l);
              break;
            case t.Last:
              this.addItemLast(l);
              break;
            default:
              this.addItemLast(l);
              break;
          }
          this._map.set(a, l), this._size++;
        }
        return this;
      }
      delete(a) {
        return !!this.remove(a);
      }
      remove(a) {
        const s = this._map.get(a);
        if (s)
          return this._map.delete(a), this.removeItem(s), this._size--, s.value;
      }
      shift() {
        if (!this._head && !this._tail)
          return;
        if (!this._head || !this._tail)
          throw new Error("Invalid list");
        const a = this._head;
        return this._map.delete(a.key), this.removeItem(a), this._size--, a.value;
      }
      forEach(a, s) {
        const o = this._state;
        let l = this._head;
        for (; l; ) {
          if (s ? a.bind(s)(l.value, l.key, this) : a(l.value, l.key, this), this._state !== o)
            throw new Error("LinkedMap got modified during iteration.");
          l = l.next;
        }
      }
      keys() {
        const a = this._state;
        let s = this._head;
        const o = {
          [Symbol.iterator]: () => o,
          next: /* @__PURE__ */ i(() => {
            if (this._state !== a)
              throw new Error("LinkedMap got modified during iteration.");
            if (s) {
              const l = { value: s.key, done: !1 };
              return s = s.next, l;
            } else
              return { value: void 0, done: !0 };
          }, "next")
        };
        return o;
      }
      values() {
        const a = this._state;
        let s = this._head;
        const o = {
          [Symbol.iterator]: () => o,
          next: /* @__PURE__ */ i(() => {
            if (this._state !== a)
              throw new Error("LinkedMap got modified during iteration.");
            if (s) {
              const l = { value: s.value, done: !1 };
              return s = s.next, l;
            } else
              return { value: void 0, done: !0 };
          }, "next")
        };
        return o;
      }
      entries() {
        const a = this._state;
        let s = this._head;
        const o = {
          [Symbol.iterator]: () => o,
          next: /* @__PURE__ */ i(() => {
            if (this._state !== a)
              throw new Error("LinkedMap got modified during iteration.");
            if (s) {
              const l = { value: [s.key, s.value], done: !1 };
              return s = s.next, l;
            } else
              return { value: void 0, done: !0 };
          }, "next")
        };
        return o;
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      trimOld(a) {
        if (a >= this.size)
          return;
        if (a === 0) {
          this.clear();
          return;
        }
        let s = this._head, o = this.size;
        for (; s && o > a; )
          this._map.delete(s.key), s = s.next, o--;
        this._head = s, this._size = o, s && (s.previous = void 0), this._state++;
      }
      addItemFirst(a) {
        if (!this._head && !this._tail)
          this._tail = a;
        else if (this._head)
          a.next = this._head, this._head.previous = a;
        else
          throw new Error("Invalid list");
        this._head = a, this._state++;
      }
      addItemLast(a) {
        if (!this._head && !this._tail)
          this._head = a;
        else if (this._tail)
          a.previous = this._tail, this._tail.next = a;
        else
          throw new Error("Invalid list");
        this._tail = a, this._state++;
      }
      removeItem(a) {
        if (a === this._head && a === this._tail)
          this._head = void 0, this._tail = void 0;
        else if (a === this._head) {
          if (!a.next)
            throw new Error("Invalid list");
          a.next.previous = void 0, this._head = a.next;
        } else if (a === this._tail) {
          if (!a.previous)
            throw new Error("Invalid list");
          a.previous.next = void 0, this._tail = a.previous;
        } else {
          const s = a.next, o = a.previous;
          if (!s || !o)
            throw new Error("Invalid list");
          s.previous = o, o.next = s;
        }
        a.next = void 0, a.previous = void 0, this._state++;
      }
      touch(a, s) {
        if (!this._head || !this._tail)
          throw new Error("Invalid list");
        if (!(s !== t.First && s !== t.Last)) {
          if (s === t.First) {
            if (a === this._head)
              return;
            const o = a.next, l = a.previous;
            a === this._tail ? (l.next = void 0, this._tail = l) : (o.previous = l, l.next = o), a.previous = void 0, a.next = this._head, this._head.previous = a, this._head = a, this._state++;
          } else if (s === t.Last) {
            if (a === this._tail)
              return;
            const o = a.next, l = a.previous;
            a === this._head ? (o.previous = void 0, this._head = o) : (o.previous = l, l.next = o), a.next = void 0, a.previous = this._tail, this._tail.next = a, this._tail = a, this._state++;
          }
        }
      }
      toJSON() {
        const a = [];
        return this.forEach((s, o) => {
          a.push([o, s]);
        }), a;
      }
      fromJSON(a) {
        this.clear();
        for (const [s, o] of a)
          this.set(s, o);
      }
    };
    e.LinkedMap = r;
    var n = class extends r {
      static {
        i(this, "LRUCache");
      }
      _limit;
      _ratio;
      constructor(a, s = 1) {
        super(), this._limit = a, this._ratio = Math.min(Math.max(0, s), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(a) {
        this._limit = a, this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(a) {
        this._ratio = Math.min(Math.max(0, a), 1), this.checkTrim();
      }
      get(a, s = t.AsNew) {
        return super.get(a, s);
      }
      peek(a) {
        return super.get(a, t.None);
      }
      set(a, s) {
        return super.set(a, s, t.Last), this.checkTrim(), this;
      }
      checkTrim() {
        this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio));
      }
    };
    e.LRUCache = n;
  }
}), CR = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/disposable.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Disposable = void 0;
    var t;
    (function(r) {
      function n(a) {
        return {
          dispose: a
        };
      }
      i(n, "create"), r.create = n;
    })(t || (e.Disposable = t = {}));
  }
}), Lr = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/ral.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
    var t;
    function r() {
      if (t === void 0)
        throw new Error("No runtime abstraction layer installed");
      return t;
    }
    i(r, "RAL"), (function(n) {
      function a(s) {
        if (s === void 0)
          throw new Error("No runtime abstraction layer provided");
        t = s;
      }
      i(a, "install"), n.install = a;
    })(r || (r = {})), e.default = r;
  }
}), gi = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/events.js"(e) {
    var t = e && e.__importDefault || function(o) {
      return o && o.__esModule ? o : { default: o };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Emitter = e.Event = void 0;
    var r = t(Lr()), n;
    (function(o) {
      const l = { dispose() {
      } };
      o.None = function() {
        return l;
      };
    })(n || (e.Event = n = {}));
    var a = class {
      static {
        i(this, "CallbackList");
      }
      _callbacks;
      _contexts;
      add(o, l = null, u) {
        this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(o), this._contexts.push(l), Array.isArray(u) && u.push({ dispose: /* @__PURE__ */ i(() => this.remove(o, l), "dispose") });
      }
      remove(o, l = null) {
        if (!this._callbacks)
          return;
        let u = !1;
        for (let c = 0, p = this._callbacks.length; c < p; c++)
          if (this._callbacks[c] === o)
            if (this._contexts[c] === l) {
              this._callbacks.splice(c, 1), this._contexts.splice(c, 1);
              return;
            } else
              u = !0;
        if (u)
          throw new Error("When adding a listener with a context, you should remove it with the same context");
      }
      invoke(...o) {
        if (!this._callbacks)
          return [];
        const l = [], u = this._callbacks.slice(0), c = this._contexts.slice(0);
        for (let p = 0, h = u.length; p < h; p++)
          try {
            l.push(u[p].apply(c[p], o));
          } catch (y) {
            (0, r.default)().console.error(y);
          }
        return l;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0, this._contexts = void 0;
      }
    }, s = class jd {
      static {
        i(this, "Emitter");
      }
      _options;
      static _noop = /* @__PURE__ */ i(function() {
      }, "_noop");
      _event;
      _callbacks;
      constructor(l) {
        this._options = l;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        return this._event || (this._event = (l, u, c) => {
          this._callbacks || (this._callbacks = new a()), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(l, u);
          const p = {
            dispose: /* @__PURE__ */ i(() => {
              this._callbacks && (this._callbacks.remove(l, u), p.dispose = jd._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this));
            }, "dispose")
          };
          return Array.isArray(c) && c.push(p), p;
        }), this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(l) {
        this._callbacks && this._callbacks.invoke.call(this._callbacks, l);
      }
      dispose() {
        this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0);
      }
    };
    e.Emitter = s;
  }
}), hc = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/cancellation.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(y, d, A, T) {
      T === void 0 && (T = A);
      var v = Object.getOwnPropertyDescriptor(d, A);
      (!v || ("get" in v ? !d.__esModule : v.writable || v.configurable)) && (v = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return d[A];
      }, "get") }), Object.defineProperty(y, T, v);
    }) : (function(y, d, A, T) {
      T === void 0 && (T = A), y[T] = d[A];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(y, d) {
      Object.defineProperty(y, "default", { enumerable: !0, value: d });
    }) : function(y, d) {
      y.default = d;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var y = /* @__PURE__ */ i(function(d) {
        return y = Object.getOwnPropertyNames || function(A) {
          var T = [];
          for (var v in A) Object.prototype.hasOwnProperty.call(A, v) && (T[T.length] = v);
          return T;
        }, y(d);
      }, "ownKeys");
      return function(d) {
        if (d && d.__esModule) return d;
        var A = {};
        if (d != null)
          for (var T = y(d), v = 0; v < T.length; v++) T[v] !== "default" && t(A, d, T[v]);
        return r(A, d), A;
      };
    })(), a = e && e.__importDefault || function(y) {
      return y && y.__esModule ? y : { default: y };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CancellationTokenSource = e.CancellationToken = void 0;
    var s = a(Lr()), o = n(yi()), l = gi(), u;
    (function(y) {
      y.None = Object.freeze({
        isCancellationRequested: !1,
        onCancellationRequested: l.Event.None
      }), y.Cancelled = Object.freeze({
        isCancellationRequested: !0,
        onCancellationRequested: l.Event.None
      });
      function d(A) {
        const T = A;
        return T && (T === y.None || T === y.Cancelled || o.boolean(T.isCancellationRequested) && !!T.onCancellationRequested);
      }
      i(d, "is"), y.is = d;
    })(u || (e.CancellationToken = u = {}));
    var c = Object.freeze(function(y, d) {
      const A = (0, s.default)().timer.setTimeout(y.bind(d), 0);
      return { dispose() {
        A.dispose();
      } };
    }), p = class {
      static {
        i(this, "MutableToken");
      }
      _isCancelled = !1;
      _emitter;
      cancel() {
        this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        return this._isCancelled ? c : (this._emitter || (this._emitter = new l.Emitter()), this._emitter.event);
      }
      dispose() {
        this._emitter && (this._emitter.dispose(), this._emitter = void 0);
      }
    }, h = class {
      static {
        i(this, "CancellationTokenSource");
      }
      _token;
      get token() {
        return this._token || (this._token = new p()), this._token;
      }
      cancel() {
        this._token ? this._token.cancel() : this._token = u.Cancelled;
      }
      dispose() {
        this._token ? this._token instanceof p && this._token.dispose() : this._token = u.None;
      }
    };
    e.CancellationTokenSource = h;
  }
}), bR = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SharedArrayReceiverStrategy = e.SharedArraySenderStrategy = void 0;
    var t = hc(), r;
    (function(l) {
      l.Continue = 0, l.Cancelled = 1;
    })(r || (r = {}));
    var n = class {
      static {
        i(this, "SharedArraySenderStrategy");
      }
      buffers;
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
      }
      enableCancellation(l) {
        if (l.id === null)
          return;
        const u = new SharedArrayBuffer(4), c = new Int32Array(u, 0, 1);
        c[0] = r.Continue, this.buffers.set(l.id, u), l.$cancellationData = u;
      }
      async sendCancellation(l, u) {
        const c = this.buffers.get(u);
        if (c === void 0)
          return;
        const p = new Int32Array(c, 0, 1);
        Atomics.store(p, 0, r.Cancelled);
      }
      cleanup(l) {
        this.buffers.delete(l);
      }
      dispose() {
        this.buffers.clear();
      }
    };
    e.SharedArraySenderStrategy = n;
    var a = class {
      static {
        i(this, "SharedArrayBufferCancellationToken");
      }
      data;
      constructor(l) {
        this.data = new Int32Array(l, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === r.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
      }
    }, s = class {
      static {
        i(this, "SharedArrayBufferCancellationTokenSource");
      }
      token;
      constructor(l) {
        this.token = new a(l);
      }
      cancel() {
      }
      dispose() {
      }
    }, o = class {
      static {
        i(this, "SharedArrayReceiverStrategy");
      }
      kind = "request";
      createCancellationTokenSource(l) {
        const u = l.$cancellationData;
        return u === void 0 ? new t.CancellationTokenSource() : new s(u);
      }
    };
    e.SharedArrayReceiverStrategy = o;
  }
}), zd = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/semaphore.js"(e) {
    var t = e && e.__importDefault || function(a) {
      return a && a.__esModule ? a : { default: a };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Semaphore = void 0;
    var r = t(Lr()), n = class {
      static {
        i(this, "Semaphore");
      }
      _capacity;
      _active;
      _waiting;
      constructor(a = 1) {
        if (a <= 0)
          throw new Error("Capacity must be greater than 0");
        this._capacity = a, this._active = 0, this._waiting = [];
      }
      lock(a) {
        return new Promise((s, o) => {
          this._waiting.push({ thunk: a, resolve: s, reject: o }), this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        this._waiting.length === 0 || this._active === this._capacity || (0, r.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity)
          return;
        const a = this._waiting.shift();
        if (this._active++, this._active > this._capacity)
          throw new Error("Too many thunks active");
        try {
          const s = a.thunk();
          s instanceof Promise ? s.then((o) => {
            this._active--, a.resolve(o), this.runNext();
          }, (o) => {
            this._active--, a.reject(o), this.runNext();
          }) : (this._active--, a.resolve(s), this.runNext());
        } catch (s) {
          this._active--, a.reject(s), this.runNext();
        }
      }
    };
    e.Semaphore = n;
  }
}), _R = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageReader.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(d, A, T, v) {
      v === void 0 && (v = T);
      var $ = Object.getOwnPropertyDescriptor(A, T);
      (!$ || ("get" in $ ? !A.__esModule : $.writable || $.configurable)) && ($ = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return A[T];
      }, "get") }), Object.defineProperty(d, v, $);
    }) : (function(d, A, T, v) {
      v === void 0 && (v = T), d[v] = A[T];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(d, A) {
      Object.defineProperty(d, "default", { enumerable: !0, value: A });
    }) : function(d, A) {
      d.default = A;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var d = /* @__PURE__ */ i(function(A) {
        return d = Object.getOwnPropertyNames || function(T) {
          var v = [];
          for (var $ in T) Object.prototype.hasOwnProperty.call(T, $) && (v[v.length] = $);
          return v;
        }, d(A);
      }, "ownKeys");
      return function(A) {
        if (A && A.__esModule) return A;
        var T = {};
        if (A != null)
          for (var v = d(A), $ = 0; $ < v.length; $++) v[$] !== "default" && t(T, A, v[$]);
        return r(T, A), T;
      };
    })(), a = e && e.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ReadableStreamMessageReader = e.AbstractMessageReader = e.MessageReader = void 0;
    var s = a(Lr()), o = n(yi()), l = gi(), u = zd(), c;
    (function(d) {
      function A(T) {
        const v = T;
        return v && o.func(v.listen) && o.func(v.dispose) && o.func(v.onError) && o.func(v.onClose) && o.func(v.onPartialMessage);
      }
      i(A, "is"), d.is = A;
    })(c || (e.MessageReader = c = {}));
    var p = class {
      static {
        i(this, "AbstractMessageReader");
      }
      errorEmitter;
      closeEmitter;
      partialMessageEmitter;
      constructor() {
        this.errorEmitter = new l.Emitter(), this.closeEmitter = new l.Emitter(), this.partialMessageEmitter = new l.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose(), this.closeEmitter.dispose(), this.partialMessageEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(d) {
        this.errorEmitter.fire(this.asError(d));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(d) {
        this.partialMessageEmitter.fire(d);
      }
      asError(d) {
        return d instanceof Error ? d : new Error(`Reader received error. Reason: ${o.string(d.message) ? d.message : "unknown"}`);
      }
    };
    e.AbstractMessageReader = p;
    var h;
    (function(d) {
      function A(T) {
        let v, $;
        const S = /* @__PURE__ */ new Map();
        let E;
        const O = /* @__PURE__ */ new Map();
        if (T === void 0 || typeof T == "string")
          v = T ?? "utf-8";
        else {
          if (v = T.charset ?? "utf-8", T.contentDecoder !== void 0 && ($ = T.contentDecoder, S.set($.name, $)), T.contentDecoders !== void 0)
            for (const M of T.contentDecoders)
              S.set(M.name, M);
          if (T.contentTypeDecoder !== void 0 && (E = T.contentTypeDecoder, O.set(E.name, E)), T.contentTypeDecoders !== void 0)
            for (const M of T.contentTypeDecoders)
              O.set(M.name, M);
        }
        return E === void 0 && (E = (0, s.default)().applicationJson.decoder, O.set(E.name, E)), { charset: v, contentDecoder: $, contentDecoders: S, contentTypeDecoder: E, contentTypeDecoders: O };
      }
      i(A, "fromOptions"), d.fromOptions = A;
    })(h || (h = {}));
    var y = class extends p {
      static {
        i(this, "ReadableStreamMessageReader");
      }
      readable;
      options;
      callback;
      nextMessageLength;
      messageToken;
      buffer;
      partialMessageTimer;
      _partialMessageTimeout;
      readSemaphore;
      constructor(d, A) {
        super(), this.readable = d, this.options = h.fromOptions(A), this.buffer = (0, s.default)().messageBuffer.create(this.options.charset), this._partialMessageTimeout = 1e4, this.nextMessageLength = -1, this.messageToken = 0, this.readSemaphore = new u.Semaphore(1);
      }
      set partialMessageTimeout(d) {
        this._partialMessageTimeout = d;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(d) {
        this.nextMessageLength = -1, this.messageToken = 0, this.partialMessageTimer = void 0, this.callback = d;
        const A = this.readable.onData((T) => {
          this.onData(T);
        });
        return this.readable.onError((T) => this.fireError(T)), this.readable.onClose(() => this.fireClose()), A;
      }
      onData(d) {
        try {
          for (this.buffer.append(d); ; ) {
            if (this.nextMessageLength === -1) {
              const T = this.buffer.tryReadHeaders(!0);
              if (!T)
                return;
              const v = T.get("content-length");
              if (!v) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(T))}`));
                return;
              }
              const $ = parseInt(v);
              if (isNaN($)) {
                this.fireError(new Error(`Content-Length value must be a number. Got ${v}`));
                return;
              }
              this.nextMessageLength = $;
            }
            const A = this.buffer.tryReadBody(this.nextMessageLength);
            if (A === void 0) {
              this.setPartialMessageTimer();
              return;
            }
            this.clearPartialMessageTimer(), this.nextMessageLength = -1, this.readSemaphore.lock(async () => {
              const T = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(A) : A, v = await this.options.contentTypeDecoder.decode(T, this.options);
              this.callback(v);
            }).catch((T) => {
              this.fireError(T);
            });
          }
        } catch (A) {
          this.fireError(A);
        }
      }
      clearPartialMessageTimer() {
        this.partialMessageTimer && (this.partialMessageTimer.dispose(), this.partialMessageTimer = void 0);
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer(), !(this._partialMessageTimeout <= 0) && (this.partialMessageTimer = (0, s.default)().timer.setTimeout((d, A) => {
          this.partialMessageTimer = void 0, d === this.messageToken && (this.firePartialMessage({ messageToken: d, waitingTime: A }), this.setPartialMessageTimer());
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout));
      }
    };
    e.ReadableStreamMessageReader = y;
  }
}), SR = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(T, v, $, S) {
      S === void 0 && (S = $);
      var E = Object.getOwnPropertyDescriptor(v, $);
      (!E || ("get" in E ? !v.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return v[$];
      }, "get") }), Object.defineProperty(T, S, E);
    }) : (function(T, v, $, S) {
      S === void 0 && (S = $), T[S] = v[$];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(T, v) {
      Object.defineProperty(T, "default", { enumerable: !0, value: v });
    }) : function(T, v) {
      T.default = v;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var T = /* @__PURE__ */ i(function(v) {
        return T = Object.getOwnPropertyNames || function($) {
          var S = [];
          for (var E in $) Object.prototype.hasOwnProperty.call($, E) && (S[S.length] = E);
          return S;
        }, T(v);
      }, "ownKeys");
      return function(v) {
        if (v && v.__esModule) return v;
        var $ = {};
        if (v != null)
          for (var S = T(v), E = 0; E < S.length; E++) S[E] !== "default" && t($, v, S[E]);
        return r($, v), $;
      };
    })(), a = e && e.__importDefault || function(T) {
      return T && T.__esModule ? T : { default: T };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.WriteableStreamMessageWriter = e.AbstractMessageWriter = e.MessageWriter = void 0;
    var s = a(Lr()), o = n(yi()), l = zd(), u = gi(), c = "Content-Length: ", p = `\r
`, h;
    (function(T) {
      function v($) {
        const S = $;
        return S && o.func(S.dispose) && o.func(S.onClose) && o.func(S.onError) && o.func(S.write);
      }
      i(v, "is"), T.is = v;
    })(h || (e.MessageWriter = h = {}));
    var y = class {
      static {
        i(this, "AbstractMessageWriter");
      }
      errorEmitter;
      closeEmitter;
      constructor() {
        this.errorEmitter = new u.Emitter(), this.closeEmitter = new u.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose(), this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(T, v, $) {
        this.errorEmitter.fire([this.asError(T), v, $]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(T) {
        return T instanceof Error ? T : new Error(`Writer received error. Reason: ${o.string(T.message) ? T.message : "unknown"}`);
      }
    };
    e.AbstractMessageWriter = y;
    var d;
    (function(T) {
      function v($) {
        return $ === void 0 || typeof $ == "string" ? { charset: $ ?? "utf-8", contentTypeEncoder: (0, s.default)().applicationJson.encoder } : { charset: $.charset ?? "utf-8", contentEncoder: $.contentEncoder, contentTypeEncoder: $.contentTypeEncoder ?? (0, s.default)().applicationJson.encoder };
      }
      i(v, "fromOptions"), T.fromOptions = v;
    })(d || (d = {}));
    var A = class extends y {
      static {
        i(this, "WriteableStreamMessageWriter");
      }
      writable;
      options;
      errorCount;
      writeSemaphore;
      constructor(T, v) {
        super(), this.writable = T, this.options = d.fromOptions(v), this.errorCount = 0, this.writeSemaphore = new l.Semaphore(1), this.writable.onError(($) => this.fireError($)), this.writable.onClose(() => this.fireClose());
      }
      async write(T) {
        return this.writeSemaphore.lock(async () => this.options.contentTypeEncoder.encode(T, this.options).then(($) => this.options.contentEncoder !== void 0 ? this.options.contentEncoder.encode($) : $).then(($) => {
          const S = [];
          return S.push(c, $.byteLength.toString(), p), S.push(p), this.doWrite(T, S, $);
        }, ($) => {
          throw this.fireError($), $;
        }));
      }
      async doWrite(T, v, $) {
        try {
          return await this.writable.write(v.join(""), "ascii"), this.writable.write($);
        } catch (S) {
          return this.handleError(S, T), Promise.reject(S);
        }
      }
      handleError(T, v) {
        this.errorCount++, this.fireError(T, v, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    e.WriteableStreamMessageWriter = A;
  }
}), wR = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AbstractMessageBuffer = void 0;
    var t = 13, r = 10, n = `\r
`, a = class {
      static {
        i(this, "AbstractMessageBuffer");
      }
      _encoding;
      _chunks;
      _totalLength;
      constructor(s = "utf-8") {
        this._encoding = s, this._chunks = [], this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(s) {
        const o = typeof s == "string" ? this.fromString(s, this._encoding) : s;
        this._chunks.push(o), this._totalLength += o.byteLength;
      }
      tryReadHeaders(s = !1) {
        if (this._chunks.length === 0)
          return;
        let o = 0, l = 0, u = 0, c = 0;
        e: for (; l < this._chunks.length; ) {
          const d = this._chunks[l];
          for (u = 0; u < d.length; ) {
            switch (d[u]) {
              case t:
                switch (o) {
                  case 0:
                    o = 1;
                    break;
                  case 2:
                    o = 3;
                    break;
                  default:
                    o = 0;
                }
                break;
              case r:
                switch (o) {
                  case 1:
                    o = 2;
                    break;
                  case 3:
                    o = 4, u++;
                    break e;
                  default:
                    o = 0;
                }
                break;
              default:
                o = 0;
            }
            u++;
          }
          c += d.byteLength, l++;
        }
        if (o !== 4)
          return;
        const p = this._read(c + u), h = /* @__PURE__ */ new Map(), y = this.toString(p, "ascii").split(n);
        if (y.length < 2)
          return h;
        for (let d = 0; d < y.length - 2; d++) {
          const A = y[d], T = A.indexOf(":");
          if (T === -1)
            throw new Error(`Message header must separate key and value using ':'
${A}`);
          const v = A.substr(0, T), $ = A.substr(T + 1).trim();
          h.set(s ? v.toLowerCase() : v, $);
        }
        return h;
      }
      tryReadBody(s) {
        if (!(this._totalLength < s))
          return this._read(s);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(s) {
        if (s === 0)
          return this.emptyBuffer();
        if (s > this._totalLength)
          throw new Error("Cannot read so many bytes!");
        if (this._chunks[0].byteLength === s) {
          const c = this._chunks[0];
          return this._chunks.shift(), this._totalLength -= s, this.asNative(c);
        }
        if (this._chunks[0].byteLength > s) {
          const c = this._chunks[0], p = this.asNative(c, s);
          return this._chunks[0] = c.slice(s), this._totalLength -= s, p;
        }
        const o = this.allocNative(s);
        let l = 0;
        const u = 0;
        for (; s > 0; ) {
          const c = this._chunks[u];
          if (c.byteLength > s) {
            const p = c.slice(0, s);
            o.set(p, l), l += s, this._chunks[u] = c.slice(s), this._totalLength -= s, s -= s;
          } else
            o.set(c, l), l += c.byteLength, this._chunks.shift(), this._totalLength -= c.byteLength, s -= c.byteLength;
        }
        return o;
      }
    };
    e.AbstractMessageBuffer = a;
  }
}), PR = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/connection.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(g, b, I, _) {
      _ === void 0 && (_ = I);
      var N = Object.getOwnPropertyDescriptor(b, I);
      (!N || ("get" in N ? !b.__esModule : N.writable || N.configurable)) && (N = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return b[I];
      }, "get") }), Object.defineProperty(g, _, N);
    }) : (function(g, b, I, _) {
      _ === void 0 && (_ = I), g[_] = b[I];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(g, b) {
      Object.defineProperty(g, "default", { enumerable: !0, value: b });
    }) : function(g, b) {
      g.default = b;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var g = /* @__PURE__ */ i(function(b) {
        return g = Object.getOwnPropertyNames || function(I) {
          var _ = [];
          for (var N in I) Object.prototype.hasOwnProperty.call(I, N) && (_[_.length] = N);
          return _;
        }, g(b);
      }, "ownKeys");
      return function(b) {
        if (b && b.__esModule) return b;
        var I = {};
        if (b != null)
          for (var _ = g(b), N = 0; N < _.length; N++) _[N] !== "default" && t(I, b, _[N]);
        return r(I, b), I;
      };
    })(), a = e && e.__importDefault || function(g) {
      return g && g.__esModule ? g : { default: g };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ConnectionOptions = e.MessageStrategy = e.CancellationStrategy = e.CancellationSenderStrategy = e.CancellationReceiverStrategy = e.RequestCancellationReceiverStrategy = e.IdCancellationReceiverStrategy = e.ConnectionStrategy = e.ConnectionError = e.ConnectionErrors = e.LogTraceNotification = e.SetTraceNotification = e.TraceFormat = e.TraceValues = e.TraceValue = e.Trace = e.NullLogger = e.ProgressType = e.ProgressToken = void 0, e.createMessageConnection = R;
    var s = a(Lr()), o = n(yi()), l = xd(), u = Fd(), c = gi(), p = hc(), h;
    (function(g) {
      g.type = new l.NotificationType("$/cancelRequest");
    })(h || (h = {}));
    var y;
    (function(g) {
      function b(I) {
        return typeof I == "string" || typeof I == "number";
      }
      i(b, "is"), g.is = b;
    })(y || (e.ProgressToken = y = {}));
    var d;
    (function(g) {
      g.type = new l.NotificationType("$/progress");
    })(d || (d = {}));
    var A = class {
      static {
        i(this, "ProgressType");
      }
      /**
       * Clients must not use these properties. They are here to ensure correct typing.
       * in TypeScript
       */
      __;
      _pr;
      constructor() {
      }
    };
    e.ProgressType = A;
    var T;
    (function(g) {
      function b(I) {
        return o.func(I);
      }
      i(b, "is"), g.is = b;
    })(T || (T = {})), e.NullLogger = Object.freeze({
      error: /* @__PURE__ */ i(() => {
      }, "error"),
      warn: /* @__PURE__ */ i(() => {
      }, "warn"),
      info: /* @__PURE__ */ i(() => {
      }, "info"),
      log: /* @__PURE__ */ i(() => {
      }, "log")
    });
    var v;
    (function(g) {
      g[g.Off = 0] = "Off", g[g.Messages = 1] = "Messages", g[g.Compact = 2] = "Compact", g[g.Verbose = 3] = "Verbose";
    })(v || (e.Trace = v = {}));
    var $;
    (function(g) {
      g.Off = "off", g.Messages = "messages", g.Compact = "compact", g.Verbose = "verbose";
    })($ || (e.TraceValue = $ = {})), e.TraceValues = $, (function(g) {
      function b(_) {
        if (!o.string(_))
          return g.Off;
        switch (_ = _.toLowerCase(), _) {
          case "off":
            return g.Off;
          case "messages":
            return g.Messages;
          case "compact":
            return g.Compact;
          case "verbose":
            return g.Verbose;
          default:
            return g.Off;
        }
      }
      i(b, "fromString"), g.fromString = b;
      function I(_) {
        switch (_) {
          case g.Off:
            return "off";
          case g.Messages:
            return "messages";
          case g.Compact:
            return "compact";
          case g.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      i(I, "toString"), g.toString = I;
    })(v || (e.Trace = v = {}));
    var S;
    (function(g) {
      g.Text = "text", g.JSON = "json";
    })(S || (e.TraceFormat = S = {})), (function(g) {
      function b(I) {
        return o.string(I) ? (I = I.toLowerCase(), I === "json" ? g.JSON : g.Text) : g.Text;
      }
      i(b, "fromString"), g.fromString = b;
    })(S || (e.TraceFormat = S = {}));
    var E;
    (function(g) {
      g.type = new l.NotificationType("$/setTrace");
    })(E || (e.SetTraceNotification = E = {}));
    var O;
    (function(g) {
      g.type = new l.NotificationType("$/logTrace");
    })(O || (e.LogTraceNotification = O = {}));
    var M;
    (function(g) {
      g[g.Closed = 1] = "Closed", g[g.Disposed = 2] = "Disposed", g[g.AlreadyListening = 3] = "AlreadyListening";
    })(M || (e.ConnectionErrors = M = {}));
    var F = class Ud extends Error {
      static {
        i(this, "ConnectionError");
      }
      code;
      constructor(b, I) {
        super(I), this.code = b, Object.setPrototypeOf(this, Ud.prototype);
      }
    };
    e.ConnectionError = F;
    var U;
    (function(g) {
      function b(I) {
        const _ = I;
        return _ && o.func(_.cancelUndispatched);
      }
      i(b, "is"), g.is = b;
    })(U || (e.ConnectionStrategy = U = {}));
    var J;
    (function(g) {
      function b(I) {
        const _ = I;
        return _ && (_.kind === void 0 || _.kind === "id") && o.func(_.createCancellationTokenSource) && (_.dispose === void 0 || o.func(_.dispose));
      }
      i(b, "is"), g.is = b;
    })(J || (e.IdCancellationReceiverStrategy = J = {}));
    var ne;
    (function(g) {
      function b(I) {
        const _ = I;
        return _ && _.kind === "request" && o.func(_.createCancellationTokenSource) && (_.dispose === void 0 || o.func(_.dispose));
      }
      i(b, "is"), g.is = b;
    })(ne || (e.RequestCancellationReceiverStrategy = ne = {}));
    var Y;
    (function(g) {
      g.Message = Object.freeze({
        createCancellationTokenSource(I) {
          return new p.CancellationTokenSource();
        }
      });
      function b(I) {
        return J.is(I) || ne.is(I);
      }
      i(b, "is"), g.is = b;
    })(Y || (e.CancellationReceiverStrategy = Y = {}));
    var L;
    (function(g) {
      g.Message = Object.freeze({
        sendCancellation(I, _) {
          return I.sendNotification(h.type, { id: _ });
        },
        cleanup(I) {
        }
      });
      function b(I) {
        const _ = I;
        return _ && o.func(_.sendCancellation) && o.func(_.cleanup);
      }
      i(b, "is"), g.is = b;
    })(L || (e.CancellationSenderStrategy = L = {}));
    var k;
    (function(g) {
      g.Message = Object.freeze({
        receiver: Y.Message,
        sender: L.Message
      });
      function b(I) {
        const _ = I;
        return _ && Y.is(_.receiver) && L.is(_.sender);
      }
      i(b, "is"), g.is = b;
    })(k || (e.CancellationStrategy = k = {}));
    var x;
    (function(g) {
      function b(I) {
        const _ = I;
        return _ && o.func(_.handleMessage);
      }
      i(b, "is"), g.is = b;
    })(x || (e.MessageStrategy = x = {}));
    var G;
    (function(g) {
      function b(I) {
        const _ = I;
        return _ && (k.is(_.cancellationStrategy) || U.is(_.connectionStrategy) || x.is(_.messageStrategy) || o.number(_.maxParallelism));
      }
      i(b, "is"), g.is = b;
    })(G || (e.ConnectionOptions = G = {}));
    var P;
    (function(g) {
      g[g.New = 1] = "New", g[g.Listening = 2] = "Listening", g[g.Closed = 3] = "Closed", g[g.Disposed = 4] = "Disposed";
    })(P || (P = {}));
    function R(g, b, I, _) {
      const N = I !== void 0 ? I : e.NullLogger;
      let V = 0, q = 0, W = 0;
      const Ee = "2.0", te = _?.maxParallelism ?? -1;
      let pe = 0, oe;
      const be = /* @__PURE__ */ new Map();
      let qe;
      const Qe = /* @__PURE__ */ new Map(), Ht = /* @__PURE__ */ new Map();
      let Vr, dt = new u.LinkedMap(), at = /* @__PURE__ */ new Map(), or = /* @__PURE__ */ new Set(), Yt = /* @__PURE__ */ new Map(), ie = v.Off, mt = S.Text, ye, it = P.New;
      const Kr = new c.Emitter(), ea = new c.Emitter(), ta = new c.Emitter(), ra = new c.Emitter(), na = new c.Emitter(), st = _ && _.cancellationStrategy ? _.cancellationStrategy : k.Message;
      function Wr(m) {
      }
      i(Wr, "cancelUndispatched");
      function lr() {
        return it === P.Listening;
      }
      i(lr, "isListening");
      function qr() {
        return it === P.Closed;
      }
      i(qr, "isClosed");
      function ht() {
        return it === P.Disposed;
      }
      i(ht, "isDisposed");
      function Hr() {
        (it === P.New || it === P.Listening) && (it = P.Closed, ea.fire(void 0));
      }
      i(Hr, "closeHandler");
      function aa(m) {
        Kr.fire([m, void 0, void 0]);
      }
      i(aa, "readErrorHandler");
      function ia(m) {
        Kr.fire(m);
      }
      i(ia, "writeErrorHandler"), g.onClose(Hr), g.onError(aa), b.onClose(Hr), b.onError(ia);
      function Yr(m) {
        if (m === null)
          throw new Error("Can't send requests with id null since the response can't be correlated.");
        return "req-" + m.toString();
      }
      i(Yr, "createRequestQueueKey");
      function sa(m) {
        return m === null ? "res-unknown-" + (++W).toString() : "res-" + m.toString();
      }
      i(sa, "createResponseQueueKey");
      function oa() {
        return "not-" + (++q).toString();
      }
      i(oa, "createNotificationQueueKey");
      function la(m, w) {
        l.Message.isRequest(w) ? m.set(Yr(w.id), w) : l.Message.isResponse(w) ? te === -1 ? m.set(sa(w.id), w) : Jr(w) : m.set(oa(), w);
      }
      i(la, "addMessageToQueue");
      function ur() {
        Vr || dt.size === 0 || te !== -1 && pe >= te || (Vr = (0, s.default)().timer.setImmediate(async () => {
          if (Vr = void 0, dt.size === 0 || te !== -1 && pe >= te)
            return;
          const m = dt.shift();
          let w;
          try {
            pe++;
            const D = _?.messageStrategy;
            x.is(D) ? w = D.handleMessage(m, Xr) : w = Xr(m);
          } catch (D) {
            N.error(`Processing message queue failed: ${D.toString()}`);
          } finally {
            w instanceof Promise ? w.then(() => {
              pe--, ur();
            }).catch((D) => {
              N.error(`Processing message queue failed: ${D.toString()}`);
            }) : pe--, ur();
          }
        }));
      }
      i(ur, "triggerMessageQueue");
      async function Xr(m) {
        return l.Message.isRequest(m) ? ua(m) : l.Message.isNotification(m) ? ca(m) : l.Message.isResponse(m) ? Jr(m) : fa(m);
      }
      i(Xr, "handleMessage");
      const _i = /* @__PURE__ */ i((m) => {
        try {
          if (l.Message.isNotification(m) && m.method === h.type.method) {
            const w = m.params.id, D = Yr(w), j = dt.get(D);
            if (l.Message.isRequest(j)) {
              const de = _?.connectionStrategy, se = de && de.cancelUndispatched ? de.cancelUndispatched(j, Wr) : void 0;
              if (se && (se.error !== void 0 || se.result !== void 0)) {
                dt.delete(D), Yt.delete(w), se.id = j.id, cr(se, m.method, Date.now()), b.write(se).catch(() => N.error("Sending response for canceled message failed."));
                return;
              }
            }
            const Q = Yt.get(w);
            if (Q !== void 0) {
              Q.cancel(), fr(m);
              return;
            } else
              or.add(w);
          }
          la(dt, m);
        } finally {
          ur();
        }
      }, "callback");
      async function ua(m) {
        if (ht())
          return Promise.resolve();
        function w(_e, Me, ge) {
          const ve = {
            jsonrpc: Ee,
            id: m.id
          };
          return _e instanceof l.ResponseError ? ve.error = _e.toJson() : ve.result = _e === void 0 ? null : _e, cr(ve, Me, ge), b.write(ve);
        }
        i(w, "reply");
        function D(_e, Me, ge) {
          const ve = {
            jsonrpc: Ee,
            id: m.id,
            error: _e.toJson()
          };
          return cr(ve, Me, ge), b.write(ve);
        }
        i(D, "replyError"), ma(m);
        const j = be.get(m.method);
        let Q, de;
        j && (Q = j.type, de = j.handler);
        const se = Date.now();
        if (de || oe) {
          const _e = m.id ?? String(Date.now()), Me = J.is(st.receiver) ? st.receiver.createCancellationTokenSource(_e) : st.receiver.createCancellationTokenSource(m);
          m.id !== null && or.has(m.id) && Me.cancel(), m.id !== null && Yt.set(_e, Me);
          try {
            let ge;
            if (de)
              if (m.params === void 0) {
                if (Q !== void 0 && Q.numberOfParams !== 0)
                  return D(new l.ResponseError(l.ErrorCodes.InvalidParams, `Request ${m.method} defines ${Q.numberOfParams} params but received none.`), m.method, se);
                ge = de(Me.token);
              } else if (Array.isArray(m.params)) {
                if (Q !== void 0 && Q.parameterStructures === l.ParameterStructures.byName)
                  return D(new l.ResponseError(l.ErrorCodes.InvalidParams, `Request ${m.method} defines parameters by name but received parameters by position`), m.method, se);
                ge = de(...m.params, Me.token);
              } else {
                if (Q !== void 0 && Q.parameterStructures === l.ParameterStructures.byPosition)
                  return D(new l.ResponseError(l.ErrorCodes.InvalidParams, `Request ${m.method} defines parameters by position but received parameters by name`), m.method, se);
                ge = de(m.params, Me.token);
              }
            else oe && (ge = oe(m.method, m.params, Me.token));
            const ve = await ge;
            await w(ve, m.method, se);
          } catch (ge) {
            ge instanceof l.ResponseError ? await w(ge, m.method, se) : ge && o.string(ge.message) ? await D(new l.ResponseError(l.ErrorCodes.InternalError, `Request ${m.method} failed with message: ${ge.message}`), m.method, se) : await D(new l.ResponseError(l.ErrorCodes.InternalError, `Request ${m.method} failed unexpectedly without providing any details.`), m.method, se);
          } finally {
            Yt.delete(_e);
          }
        } else
          await D(new l.ResponseError(l.ErrorCodes.MethodNotFound, `Unhandled method ${m.method}`), m.method, se);
      }
      i(ua, "handleRequest");
      function Jr(m) {
        if (!ht())
          if (m.id === null)
            m.error ? N.error(`Received response message without id: Error is: 
${JSON.stringify(m.error, void 0, 4)}`) : N.error("Received response message without id. No further error information provided.");
          else {
            const w = m.id, D = at.get(w);
            if (ha(m, D), D !== void 0) {
              at.delete(w);
              try {
                if (m.error) {
                  const j = m.error;
                  D.reject(new l.ResponseError(j.code, j.message, j.data));
                } else if (m.result !== void 0)
                  D.resolve(m.result);
                else
                  throw new Error("Should never happen.");
              } catch (j) {
                j.message ? N.error(`Response handler '${D.method}' failed with message: ${j.message}`) : N.error(`Response handler '${D.method}' failed unexpectedly.`);
              }
            }
          }
      }
      i(Jr, "handleResponse");
      async function ca(m) {
        if (ht())
          return;
        let w, D;
        if (m.method === h.type.method) {
          const j = m.params.id;
          or.delete(j), fr(m);
          return;
        } else {
          const j = Qe.get(m.method);
          j && (D = j.handler, w = j.type);
        }
        if (D || qe)
          try {
            if (fr(m), D)
              if (m.params === void 0)
                w !== void 0 && w.numberOfParams !== 0 && w.parameterStructures !== l.ParameterStructures.byName && N.error(`Notification ${m.method} defines ${w.numberOfParams} params but received none.`), await D();
              else if (Array.isArray(m.params)) {
                const j = m.params;
                m.method === d.type.method && j.length === 2 && y.is(j[0]) ? await D({ token: j[0], value: j[1] }) : (w !== void 0 && (w.parameterStructures === l.ParameterStructures.byName && N.error(`Notification ${m.method} defines parameters by name but received parameters by position`), w.numberOfParams !== m.params.length && N.error(`Notification ${m.method} defines ${w.numberOfParams} params but received ${j.length} arguments`)), await D(...j));
              } else
                w !== void 0 && w.parameterStructures === l.ParameterStructures.byPosition && N.error(`Notification ${m.method} defines parameters by position but received parameters by name`), await D(m.params);
            else qe && await qe(m.method, m.params);
          } catch (j) {
            j.message ? N.error(`Notification handler '${m.method}' failed with message: ${j.message}`) : N.error(`Notification handler '${m.method}' failed unexpectedly.`);
          }
        else
          ta.fire(m);
      }
      i(ca, "handleNotification");
      function fa(m) {
        if (!m) {
          N.error("Received empty message.");
          return;
        }
        N.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(m, null, 4)}`);
        const w = m;
        if (o.string(w.id) || o.number(w.id)) {
          const D = w.id, j = at.get(D);
          j && j.reject(new Error("The received response has neither a result nor an error property."));
        }
      }
      i(fa, "handleInvalidMessage");
      function et(m) {
        if (m != null)
          switch (ie) {
            case v.Verbose:
              return JSON.stringify(m, null, 4);
            case v.Compact:
              return JSON.stringify(m);
            default:
              return;
          }
      }
      i(et, "stringifyTrace");
      function pa(m) {
        if (!(ie === v.Off || !ye))
          if (mt === S.Text) {
            let w;
            (ie === v.Verbose || ie === v.Compact) && m.params && (w = `Params: ${et(m.params)}`), ye.log(`Sending request '${m.method} - (${m.id})'.`, w);
          } else
            yt("send-request", m);
      }
      i(pa, "traceSendingRequest");
      function da(m) {
        if (!(ie === v.Off || !ye))
          if (mt === S.Text) {
            let w;
            (ie === v.Verbose || ie === v.Compact) && (m.params ? w = `Params: ${et(m.params)}` : w = "No parameters provided."), ye.log(`Sending notification '${m.method}'.`, w);
          } else
            yt("send-notification", m);
      }
      i(da, "traceSendingNotification");
      function cr(m, w, D) {
        if (!(ie === v.Off || !ye))
          if (mt === S.Text) {
            let j;
            (ie === v.Verbose || ie === v.Compact) && (m.error && m.error.data ? j = `Error data: ${et(m.error.data)}` : m.result ? j = `Result: ${et(m.result)}` : m.error === void 0 && (j = "No result returned."));
            const Q = m.error ? ` Request failed: ${m.error.message} (${m.error.code}).` : "";
            ye.log(`Sending response '${w} - (${m.id})'. Processing request took ${Date.now() - D}ms.${Q}`, j);
          } else
            yt("send-response", m);
      }
      i(cr, "traceSendingResponse");
      function ma(m) {
        if (!(ie === v.Off || !ye))
          if (mt === S.Text) {
            let w;
            (ie === v.Verbose || ie === v.Compact) && m.params && (w = `Params: ${et(m.params)}`), ye.log(`Received request '${m.method} - (${m.id})'.`, w);
          } else
            yt("receive-request", m);
      }
      i(ma, "traceReceivedRequest");
      function fr(m) {
        if (!(ie === v.Off || !ye || m.method === O.type.method))
          if (mt === S.Text) {
            let w;
            (ie === v.Verbose || ie === v.Compact) && (m.params ? w = `Params: ${et(m.params)}` : w = "No parameters provided."), ye.log(`Received notification '${m.method}'.`, w);
          } else
            yt("receive-notification", m);
      }
      i(fr, "traceReceivedNotification");
      function ha(m, w) {
        if (!(ie === v.Off || !ye))
          if (mt === S.Text) {
            let D;
            if ((ie === v.Verbose || ie === v.Compact) && (m.error && m.error.data ? D = `Error data: ${et(m.error.data)}` : m.result ? D = `Result: ${et(m.result)}` : m.error === void 0 && (D = "No result returned.")), w) {
              const j = m.error ? ` Request failed: ${m.error.message} (${m.error.code}).` : "";
              ye.log(`Received response '${w.method} - (${m.id})' in ${Date.now() - w.timerStart}ms.${j}`, D);
            } else
              ye.log(`Received response ${m.id} without active response promise.`, D);
          } else
            yt("receive-response", m);
      }
      i(ha, "traceReceivedResponse");
      function yt(m, w) {
        if (!ye || ie === v.Off)
          return;
        const D = {
          isLSPMessage: !0,
          type: m,
          message: w,
          timestamp: Date.now()
        };
        ye.log(D);
      }
      i(yt, "logLSPMessage");
      function Pt() {
        if (qr())
          throw new F(M.Closed, "Connection is closed.");
        if (ht())
          throw new F(M.Disposed, "Connection is disposed.");
      }
      i(Pt, "throwIfClosedOrDisposed");
      function ya() {
        if (lr())
          throw new F(M.AlreadyListening, "Connection is already listening");
      }
      i(ya, "throwIfListening");
      function ga() {
        if (!lr())
          throw new Error("Call listen() first.");
      }
      i(ga, "throwIfNotListening");
      function kt(m) {
        return m === void 0 ? null : m;
      }
      i(kt, "undefinedToNull");
      function Zr(m) {
        if (m !== null)
          return m;
      }
      i(Zr, "nullToUndefined");
      function Qr(m) {
        return m != null && !Array.isArray(m) && typeof m == "object";
      }
      i(Qr, "isNamedParam");
      function f(m, w) {
        switch (m) {
          case l.ParameterStructures.auto:
            return Qr(w) ? Zr(w) : [kt(w)];
          case l.ParameterStructures.byName:
            if (!Qr(w))
              throw new Error("Received parameters by name but param is not an object literal.");
            return Zr(w);
          case l.ParameterStructures.byPosition:
            return [kt(w)];
          default:
            throw new Error(`Unknown parameter structure ${m.toString()}`);
        }
      }
      i(f, "computeSingleParam");
      function z(m, w) {
        let D;
        const j = m.numberOfParams;
        switch (j) {
          case 0:
            D = void 0;
            break;
          case 1:
            D = f(m.parameterStructures, w[0]);
            break;
          default:
            D = [];
            for (let Q = 0; Q < w.length && Q < j; Q++)
              D.push(kt(w[Q]));
            if (w.length < j)
              for (let Q = w.length; Q < j; Q++)
                D.push(null);
            break;
        }
        return D;
      }
      i(z, "computeMessageParams");
      const K = {
        sendNotification: /* @__PURE__ */ i((m, ...w) => {
          Pt();
          let D, j;
          if (o.string(m)) {
            D = m;
            const de = w[0];
            let se = 0, _e = l.ParameterStructures.auto;
            l.ParameterStructures.is(de) && (se = 1, _e = de);
            const Me = w.length, ge = Me - se;
            switch (ge) {
              case 0:
                j = void 0;
                break;
              case 1:
                j = f(_e, w[se]);
                break;
              default:
                if (_e === l.ParameterStructures.byName)
                  throw new Error(`Received ${ge} parameters for 'by Name' notification parameter structure.`);
                j = w.slice(se, Me).map((ve) => kt(ve));
                break;
            }
          } else {
            const de = w;
            D = m.method, j = z(m, de);
          }
          const Q = {
            jsonrpc: Ee,
            method: D,
            params: j
          };
          return da(Q), b.write(Q).catch((de) => {
            throw N.error("Sending notification failed."), de;
          });
        }, "sendNotification"),
        onNotification: /* @__PURE__ */ i((m, w) => {
          Pt();
          let D;
          return o.func(m) ? qe = m : w && (o.string(m) ? (D = m, Qe.set(m, { type: void 0, handler: w })) : (D = m.method, Qe.set(m.method, { type: m, handler: w }))), {
            dispose: /* @__PURE__ */ i(() => {
              D !== void 0 ? Qe.get(D)?.handler === w && Qe.delete(D) : qe === m && (qe = void 0);
            }, "dispose")
          };
        }, "onNotification"),
        onProgress: /* @__PURE__ */ i((m, w, D) => {
          if (Ht.has(w))
            throw new Error(`Progress handler for token ${w} already registered`);
          return Ht.set(w, D), {
            dispose: /* @__PURE__ */ i(() => {
              Ht.get(w) === D && Ht.delete(w);
            }, "dispose")
          };
        }, "onProgress"),
        sendProgress: /* @__PURE__ */ i((m, w, D) => K.sendNotification(d.type, { token: w, value: D }), "sendProgress"),
        onUnhandledProgress: ra.event,
        sendRequest: /* @__PURE__ */ i((m, ...w) => {
          Pt(), ga();
          function D(ve, ot) {
            const It = st.sender.sendCancellation(ve, ot);
            It === void 0 ? N.log(`Received no promise from cancellation strategy when cancelling id ${ot}`) : It.catch(() => {
              N.log(`Sending cancellation messages for id ${ot} failed.`);
            });
          }
          i(D, "sendCancellation");
          let j, Q, de;
          if (o.string(m)) {
            j = m;
            const ve = w[0], ot = w[w.length - 1];
            let It = 0, va = l.ParameterStructures.auto;
            l.ParameterStructures.is(ve) && (It = 1, va = ve);
            let pr = w.length;
            p.CancellationToken.is(ot) && (pr = pr - 1, de = ot);
            const Nt = pr - It;
            switch (Nt) {
              case 0:
                Q = void 0;
                break;
              case 1:
                Q = f(va, w[It]);
                break;
              default:
                if (va === l.ParameterStructures.byName)
                  throw new Error(`Received ${Nt} parameters for 'by Name' request parameter structure.`);
                Q = w.slice(It, pr).map((gR) => kt(gR));
                break;
            }
          } else {
            const ve = w;
            j = m.method, Q = z(m, ve);
            const ot = m.numberOfParams;
            de = p.CancellationToken.is(ve[ot]) ? ve[ot] : void 0;
          }
          const se = V++;
          let _e, Me = !1;
          de !== void 0 && (de.isCancellationRequested ? Me = !0 : _e = de.onCancellationRequested(() => {
            D(K, se);
          }));
          const ge = {
            jsonrpc: Ee,
            id: se,
            method: j,
            params: Q
          };
          return pa(ge), typeof st.sender.enableCancellation == "function" && st.sender.enableCancellation(ge), new Promise(async (ve, ot) => {
            const It = /* @__PURE__ */ i((Nt) => {
              ve(Nt), st.sender.cleanup(se), _e?.dispose();
            }, "resolveWithCleanup"), va = /* @__PURE__ */ i((Nt) => {
              ot(Nt), st.sender.cleanup(se), _e?.dispose();
            }, "rejectWithCleanup"), pr = { method: j, timerStart: Date.now(), resolve: It, reject: va };
            try {
              at.set(se, pr), await b.write(ge), Me && D(K, se);
            } catch (Nt) {
              at.delete(se), pr.reject(new l.ResponseError(l.ErrorCodes.MessageWriteError, Nt.message ? Nt.message : "Unknown reason")), N.error("Sending request failed.");
            }
          });
        }, "sendRequest"),
        onRequest: /* @__PURE__ */ i((m, w) => {
          Pt();
          let D = null;
          return T.is(m) ? (D = void 0, oe = m) : o.string(m) ? (D = null, w !== void 0 && (D = m, be.set(m, { handler: w, type: void 0 }))) : w !== void 0 && (D = m.method, be.set(m.method, { type: m, handler: w })), {
            dispose: /* @__PURE__ */ i(() => {
              D !== null && (D !== void 0 ? be.get(D)?.handler === w && be.delete(D) : oe === m && (oe = void 0));
            }, "dispose")
          };
        }, "onRequest"),
        hasPendingResponse: /* @__PURE__ */ i(() => at.size > 0, "hasPendingResponse"),
        trace: /* @__PURE__ */ i(async (m, w, D) => {
          let j = !1, Q = S.Text;
          D !== void 0 && (o.boolean(D) ? j = D : (j = D.sendNotification || !1, Q = D.traceFormat || S.Text)), ie = m, mt = Q, ie === v.Off ? ye = void 0 : ye = w, j && !qr() && !ht() && await K.sendNotification(E.type, { value: v.toString(m) });
        }, "trace"),
        onError: Kr.event,
        onClose: ea.event,
        onUnhandledNotification: ta.event,
        onDispose: na.event,
        end: /* @__PURE__ */ i(() => {
          b.end();
        }, "end"),
        dispose: /* @__PURE__ */ i(() => {
          if (ht())
            return;
          it = P.Disposed, na.fire(void 0);
          const m = new l.ResponseError(l.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
          for (const w of at.values())
            w.reject(m);
          at = /* @__PURE__ */ new Map(), Yt = /* @__PURE__ */ new Map(), or = /* @__PURE__ */ new Set(), dt = new u.LinkedMap(), o.func(b.dispose) && b.dispose(), o.func(g.dispose) && g.dispose();
        }, "dispose"),
        listen: /* @__PURE__ */ i(() => {
          Pt(), ya(), it = P.Listening, g.listen(_i);
        }, "listen"),
        inspect: /* @__PURE__ */ i(() => {
          (0, s.default)().console.log("inspect");
        }, "inspect")
      };
      return K.onNotification(O.type, (m) => {
        if (ie === v.Off || !ye)
          return;
        const w = ie === v.Verbose || ie === v.Compact;
        ye.log(m.message, w ? m.verbose : void 0);
      }), K.onNotification(d.type, async (m) => {
        const w = Ht.get(m.token);
        w ? await w(m.value) : ra.fire(m);
      }), K;
    }
    i(R, "createMessageConnection");
  }
}), vi = H({
  "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/api.js"(e) {
    var t = e && e.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ProgressType = e.ProgressToken = e.createMessageConnection = e.NullLogger = e.ConnectionOptions = e.ConnectionStrategy = e.AbstractMessageBuffer = e.WriteableStreamMessageWriter = e.AbstractMessageWriter = e.MessageWriter = e.ReadableStreamMessageReader = e.AbstractMessageReader = e.MessageReader = e.SharedArrayReceiverStrategy = e.SharedArraySenderStrategy = e.CancellationToken = e.CancellationTokenSource = e.Emitter = e.Event = e.Disposable = e.LRUCache = e.Touch = e.LinkedMap = e.ParameterStructures = e.NotificationType9 = e.NotificationType8 = e.NotificationType7 = e.NotificationType6 = e.NotificationType5 = e.NotificationType4 = e.NotificationType3 = e.NotificationType2 = e.NotificationType1 = e.NotificationType0 = e.NotificationType = e.ErrorCodes = e.ResponseError = e.RequestType9 = e.RequestType8 = e.RequestType7 = e.RequestType6 = e.RequestType5 = e.RequestType4 = e.RequestType3 = e.RequestType2 = e.RequestType1 = e.RequestType0 = e.RequestType = e.Message = e.RAL = void 0, e.MessageStrategy = e.CancellationStrategy = e.CancellationSenderStrategy = e.RequestCancellationReceiverStrategy = e.IdCancellationReceiverStrategy = e.CancellationReceiverStrategy = e.ConnectionError = e.ConnectionErrors = e.LogTraceNotification = e.SetTraceNotification = e.TraceFormat = e.TraceValues = e.TraceValue = e.Trace = void 0;
    var r = xd();
    Object.defineProperty(e, "Message", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.Message;
    }, "get") }), Object.defineProperty(e, "RequestType", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType;
    }, "get") }), Object.defineProperty(e, "RequestType0", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType0;
    }, "get") }), Object.defineProperty(e, "RequestType1", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType1;
    }, "get") }), Object.defineProperty(e, "RequestType2", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType2;
    }, "get") }), Object.defineProperty(e, "RequestType3", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType3;
    }, "get") }), Object.defineProperty(e, "RequestType4", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType4;
    }, "get") }), Object.defineProperty(e, "RequestType5", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType5;
    }, "get") }), Object.defineProperty(e, "RequestType6", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType6;
    }, "get") }), Object.defineProperty(e, "RequestType7", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType7;
    }, "get") }), Object.defineProperty(e, "RequestType8", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType8;
    }, "get") }), Object.defineProperty(e, "RequestType9", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.RequestType9;
    }, "get") }), Object.defineProperty(e, "ResponseError", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.ResponseError;
    }, "get") }), Object.defineProperty(e, "ErrorCodes", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.ErrorCodes;
    }, "get") }), Object.defineProperty(e, "NotificationType", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType;
    }, "get") }), Object.defineProperty(e, "NotificationType0", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType0;
    }, "get") }), Object.defineProperty(e, "NotificationType1", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType1;
    }, "get") }), Object.defineProperty(e, "NotificationType2", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType2;
    }, "get") }), Object.defineProperty(e, "NotificationType3", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType3;
    }, "get") }), Object.defineProperty(e, "NotificationType4", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType4;
    }, "get") }), Object.defineProperty(e, "NotificationType5", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType5;
    }, "get") }), Object.defineProperty(e, "NotificationType6", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType6;
    }, "get") }), Object.defineProperty(e, "NotificationType7", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType7;
    }, "get") }), Object.defineProperty(e, "NotificationType8", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType8;
    }, "get") }), Object.defineProperty(e, "NotificationType9", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.NotificationType9;
    }, "get") }), Object.defineProperty(e, "ParameterStructures", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return r.ParameterStructures;
    }, "get") });
    var n = Fd();
    Object.defineProperty(e, "LinkedMap", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return n.LinkedMap;
    }, "get") }), Object.defineProperty(e, "LRUCache", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return n.LRUCache;
    }, "get") }), Object.defineProperty(e, "Touch", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return n.Touch;
    }, "get") });
    var a = CR();
    Object.defineProperty(e, "Disposable", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return a.Disposable;
    }, "get") });
    var s = gi();
    Object.defineProperty(e, "Event", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return s.Event;
    }, "get") }), Object.defineProperty(e, "Emitter", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return s.Emitter;
    }, "get") });
    var o = hc();
    Object.defineProperty(e, "CancellationTokenSource", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return o.CancellationTokenSource;
    }, "get") }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return o.CancellationToken;
    }, "get") });
    var l = bR();
    Object.defineProperty(e, "SharedArraySenderStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return l.SharedArraySenderStrategy;
    }, "get") }), Object.defineProperty(e, "SharedArrayReceiverStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return l.SharedArrayReceiverStrategy;
    }, "get") });
    var u = _R();
    Object.defineProperty(e, "MessageReader", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return u.MessageReader;
    }, "get") }), Object.defineProperty(e, "AbstractMessageReader", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return u.AbstractMessageReader;
    }, "get") }), Object.defineProperty(e, "ReadableStreamMessageReader", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return u.ReadableStreamMessageReader;
    }, "get") });
    var c = SR();
    Object.defineProperty(e, "MessageWriter", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return c.MessageWriter;
    }, "get") }), Object.defineProperty(e, "AbstractMessageWriter", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return c.AbstractMessageWriter;
    }, "get") }), Object.defineProperty(e, "WriteableStreamMessageWriter", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return c.WriteableStreamMessageWriter;
    }, "get") });
    var p = wR();
    Object.defineProperty(e, "AbstractMessageBuffer", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return p.AbstractMessageBuffer;
    }, "get") });
    var h = PR();
    Object.defineProperty(e, "ConnectionStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ConnectionStrategy;
    }, "get") }), Object.defineProperty(e, "ConnectionOptions", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ConnectionOptions;
    }, "get") }), Object.defineProperty(e, "NullLogger", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.NullLogger;
    }, "get") }), Object.defineProperty(e, "createMessageConnection", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.createMessageConnection;
    }, "get") }), Object.defineProperty(e, "ProgressToken", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ProgressToken;
    }, "get") }), Object.defineProperty(e, "ProgressType", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ProgressType;
    }, "get") }), Object.defineProperty(e, "Trace", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.Trace;
    }, "get") }), Object.defineProperty(e, "TraceValue", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.TraceValue;
    }, "get") }), Object.defineProperty(e, "TraceFormat", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.TraceFormat;
    }, "get") }), Object.defineProperty(e, "SetTraceNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.SetTraceNotification;
    }, "get") }), Object.defineProperty(e, "LogTraceNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.LogTraceNotification;
    }, "get") }), Object.defineProperty(e, "ConnectionErrors", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ConnectionErrors;
    }, "get") }), Object.defineProperty(e, "ConnectionError", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ConnectionError;
    }, "get") }), Object.defineProperty(e, "CancellationReceiverStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.CancellationReceiverStrategy;
    }, "get") }), Object.defineProperty(e, "IdCancellationReceiverStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.IdCancellationReceiverStrategy;
    }, "get") }), Object.defineProperty(e, "RequestCancellationReceiverStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.RequestCancellationReceiverStrategy;
    }, "get") }), Object.defineProperty(e, "CancellationSenderStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.CancellationSenderStrategy;
    }, "get") }), Object.defineProperty(e, "CancellationStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.CancellationStrategy;
    }, "get") }), Object.defineProperty(e, "MessageStrategy", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.MessageStrategy;
    }, "get") }), Object.defineProperty(e, "TraceValues", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.TraceValues;
    }, "get") });
    var y = t(Lr());
    e.RAL = y.default;
  }
}), Ws = {};
ER(Ws, {
  AnnotatedTextEdit: () => Lt,
  ApplyKind: () => Al,
  ChangeAnnotation: () => Jt,
  ChangeAnnotationIdentifier: () => Se,
  CodeAction: () => Gl,
  CodeActionContext: () => xl,
  CodeActionKind: () => Dl,
  CodeActionTag: () => Qi,
  CodeActionTriggerKind: () => Fa,
  CodeDescription: () => fl,
  CodeLens: () => Fl,
  Color: () => Yi,
  ColorInformation: () => il,
  ColorPresentation: () => sl,
  Command: () => $r,
  CompletionItem: () => Cl,
  CompletionItemKind: () => gl,
  CompletionItemLabelDetails: () => El,
  CompletionItemTag: () => Tl,
  CompletionList: () => bl,
  CreateFile: () => un,
  DeleteFile: () => fn,
  Diagnostic: () => La,
  DiagnosticRelatedInformation: () => Xi,
  DiagnosticSeverity: () => ul,
  DiagnosticTag: () => cl,
  DocumentHighlight: () => kl,
  DocumentHighlightKind: () => Pl,
  DocumentLink: () => zl,
  DocumentSymbol: () => Ll,
  DocumentUri: () => rl,
  EOL: () => Vd,
  FoldingRange: () => ll,
  FoldingRangeKind: () => ol,
  FormattingOptions: () => jl,
  Hover: () => _l,
  InlayHint: () => Xl,
  InlayHintKind: () => es,
  InlayHintLabelPart: () => ts,
  InlineCompletionContext: () => tu,
  InlineCompletionItem: () => Jl,
  InlineCompletionList: () => Zl,
  InlineCompletionTriggerKind: () => Ql,
  InlineValueContext: () => Yl,
  InlineValueEvaluatableExpression: () => Hl,
  InlineValueText: () => Wl,
  InlineValueVariableLookup: () => ql,
  InsertReplaceEdit: () => $l,
  InsertTextFormat: () => vl,
  InsertTextMode: () => Rl,
  LanguageKind: () => hl,
  Location: () => Ma,
  LocationLink: () => al,
  MarkedString: () => Ga,
  MarkupContent: () => Zt,
  MarkupKind: () => Zi,
  OptionalVersionedTextDocumentIdentifier: () => xa,
  ParameterInformation: () => Sl,
  Position: () => ae,
  Range: () => Z,
  RenameFile: () => cn,
  SelectedCompletionInfo: () => eu,
  SelectionRange: () => Ul,
  SemanticTokenModifiers: () => Vl,
  SemanticTokenTypes: () => Bl,
  SemanticTokens: () => Kl,
  SignatureInformation: () => wl,
  SnippetTextEdit: () => pl,
  StringValue: () => rs,
  SymbolInformation: () => Ol,
  SymbolKind: () => Il,
  SymbolTag: () => Nl,
  TextDocument: () => nu,
  TextDocumentEdit: () => Da,
  TextDocumentIdentifier: () => dl,
  TextDocumentItem: () => yl,
  TextEdit: () => vt,
  URI: () => Hi,
  VersionedTextDocumentIdentifier: () => ml,
  WorkspaceChange: () => Bd,
  WorkspaceEdit: () => Ji,
  WorkspaceFolder: () => ru,
  WorkspaceSymbol: () => Ml,
  integer: () => nl,
  uinteger: () => Oa
});
var rl, Hi, nl, Oa, ae, Z, Ma, al, Yi, il, sl, ol, ll, Xi, ul, cl, fl, La, $r, vt, Jt, Se, Lt, Da, un, cn, fn, Ji, Ta, pl, bo, Bd, dl, ml, xa, hl, yl, Zi, Zt, gl, vl, Tl, $l, Rl, Al, El, Cl, bl, Ga, _l, Sl, wl, Pl, kl, Il, Nl, Ol, Ml, Ll, Dl, Fa, xl, Qi, Gl, Fl, jl, zl, Ul, Bl, Vl, Kl, Wl, ql, Hl, Yl, es, ts, Xl, rs, Jl, Zl, Ql, eu, tu, ru, Vd, nu, kf, C, qs = AR({
  "../../node_modules/.pnpm/vscode-languageserver-types@3.18.4/node_modules/vscode-languageserver-types/lib/esm/main.js"() {
    (function(e) {
      function t(r) {
        return typeof r == "string";
      }
      i(t, "is"), e.is = t;
    })(rl || (rl = {})), (function(e) {
      function t(r) {
        return typeof r == "string";
      }
      i(t, "is"), e.is = t;
    })(Hi || (Hi = {})), (function(e) {
      e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
      function t(r) {
        return typeof r == "number" && e.MIN_VALUE <= r && r <= e.MAX_VALUE;
      }
      i(t, "is"), e.is = t;
    })(nl || (nl = {})), (function(e) {
      e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
      function t(r) {
        return typeof r == "number" && e.MIN_VALUE <= r && r <= e.MAX_VALUE;
      }
      i(t, "is"), e.is = t;
    })(Oa || (Oa = {})), (function(e) {
      function t(n, a) {
        return n === Number.MAX_VALUE && (n = Oa.MAX_VALUE), a === Number.MAX_VALUE && (a = Oa.MAX_VALUE), { line: n, character: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && C.uinteger(a.line) && C.uinteger(a.character);
      }
      i(r, "is"), e.is = r;
    })(ae || (ae = {})), (function(e) {
      function t(n, a, s, o) {
        if (C.uinteger(n) && C.uinteger(a) && C.uinteger(s) && C.uinteger(o))
          return { start: ae.create(n, a), end: ae.create(s, o) };
        if (ae.is(n) && ae.is(a))
          return { start: n, end: a };
        throw new Error(`Range#create called with invalid arguments[${n}, ${a}, ${s}, ${o}]`);
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && ae.is(a.start) && ae.is(a.end);
      }
      i(r, "is"), e.is = r;
    })(Z || (Z = {})), (function(e) {
      function t(n, a) {
        return { uri: n, range: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && Z.is(a.range) && (C.string(a.uri) || C.undefined(a.uri));
      }
      i(r, "is"), e.is = r;
    })(Ma || (Ma = {})), (function(e) {
      function t(n, a, s, o) {
        return { targetUri: n, targetRange: a, targetSelectionRange: s, originSelectionRange: o };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && Z.is(a.targetRange) && C.string(a.targetUri) && Z.is(a.targetSelectionRange) && (Z.is(a.originSelectionRange) || C.undefined(a.originSelectionRange));
      }
      i(r, "is"), e.is = r;
    })(al || (al = {})), (function(e) {
      function t(n, a, s, o) {
        return {
          red: n,
          green: a,
          blue: s,
          alpha: o
        };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && C.numberRange(a.red, 0, 1) && C.numberRange(a.green, 0, 1) && C.numberRange(a.blue, 0, 1) && C.numberRange(a.alpha, 0, 1);
      }
      i(r, "is"), e.is = r;
    })(Yi || (Yi = {})), (function(e) {
      function t(n, a) {
        return {
          range: n,
          color: a
        };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && Z.is(a.range) && Yi.is(a.color);
      }
      i(r, "is"), e.is = r;
    })(il || (il = {})), (function(e) {
      function t(n, a, s) {
        return {
          label: n,
          textEdit: a,
          additionalTextEdits: s
        };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && C.string(a.label) && (C.undefined(a.textEdit) || vt.is(a)) && (C.undefined(a.additionalTextEdits) || C.typedArray(a.additionalTextEdits, vt.is));
      }
      i(r, "is"), e.is = r;
    })(sl || (sl = {})), (function(e) {
      e.Comment = "comment", e.Imports = "imports", e.Region = "region";
    })(ol || (ol = {})), (function(e) {
      function t(n, a, s, o, l, u) {
        const c = {
          startLine: n,
          endLine: a
        };
        return C.defined(s) && (c.startCharacter = s), C.defined(o) && (c.endCharacter = o), C.defined(l) && (c.kind = l), C.defined(u) && (c.collapsedText = u), c;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && C.uinteger(a.startLine) && C.uinteger(a.startLine) && (C.undefined(a.startCharacter) || C.uinteger(a.startCharacter)) && (C.undefined(a.endCharacter) || C.uinteger(a.endCharacter)) && (C.undefined(a.kind) || C.string(a.kind));
      }
      i(r, "is"), e.is = r;
    })(ll || (ll = {})), (function(e) {
      function t(n, a) {
        return {
          location: n,
          message: a
        };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && Ma.is(a.location) && C.string(a.message);
      }
      i(r, "is"), e.is = r;
    })(Xi || (Xi = {})), (function(e) {
      e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
    })(ul || (ul = {})), (function(e) {
      e.Unnecessary = 1, e.Deprecated = 2;
    })(cl || (cl = {})), (function(e) {
      function t(r) {
        const n = r;
        return C.objectLiteral(n) && C.string(n.href);
      }
      i(t, "is"), e.is = t;
    })(fl || (fl = {})), (function(e) {
      function t(s, o, l, u, c, p) {
        const h = { range: s, message: o };
        return C.defined(l) && (h.severity = l), C.defined(u) && (h.code = u), C.defined(c) && (h.source = c), C.defined(p) && (h.relatedInformation = p), h;
      }
      i(t, "create"), e.create = t;
      function r(s) {
        var o;
        const l = s;
        return C.defined(l) && Z.is(l.range) && (C.string(l.message) || Zt.is(l.message)) && (C.number(l.severity) || C.undefined(l.severity)) && (C.integer(l.code) || C.string(l.code) || C.undefined(l.code)) && (C.undefined(l.codeDescription) || C.string((o = l.codeDescription) === null || o === void 0 ? void 0 : o.href)) && (C.string(l.source) || C.undefined(l.source)) && (C.undefined(l.relatedInformation) || C.typedArray(l.relatedInformation, Xi.is));
      }
      i(r, "is"), e.is = r;
      function n(s) {
        return C.string(s.message);
      }
      i(n, "is3_17"), e.is3_17 = n;
      function a(s) {
        if (C.string(s.message))
          return s.message;
        if (Zt.is(s.message))
          return s.message.value;
        throw new Error(`Unknown message type ${typeof s.message}`);
      }
      i(a, "getMessageString"), e.getMessageString = a;
    })(La || (La = {})), (function(e) {
      function t(n, a, ...s) {
        const o = { title: n, command: a };
        return C.defined(s) && s.length > 0 && (o.arguments = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.string(a.title) && (a.tooltip === void 0 || C.string(a.tooltip)) && C.string(a.command);
      }
      i(r, "is"), e.is = r;
    })($r || ($r = {})), (function(e) {
      function t(s, o) {
        return { range: s, newText: o };
      }
      i(t, "replace"), e.replace = t;
      function r(s, o) {
        return { range: { start: s, end: s }, newText: o };
      }
      i(r, "insert"), e.insert = r;
      function n(s) {
        return { range: s, newText: "" };
      }
      i(n, "del"), e.del = n;
      function a(s) {
        const o = s;
        return C.objectLiteral(o) && C.string(o.newText) && Z.is(o.range);
      }
      i(a, "is"), e.is = a;
    })(vt || (vt = {})), (function(e) {
      function t(n, a, s) {
        const o = { label: n };
        return a !== void 0 && (o.needsConfirmation = a), s !== void 0 && (o.description = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && C.string(a.label) && (C.boolean(a.needsConfirmation) || a.needsConfirmation === void 0) && (C.string(a.description) || a.description === void 0);
      }
      i(r, "is"), e.is = r;
    })(Jt || (Jt = {})), (function(e) {
      function t(r) {
        const n = r;
        return C.string(n);
      }
      i(t, "is"), e.is = t;
    })(Se || (Se = {})), (function(e) {
      function t(s, o, l) {
        return { range: s, newText: o, annotationId: l };
      }
      i(t, "replace"), e.replace = t;
      function r(s, o, l) {
        return { range: { start: s, end: s }, newText: o, annotationId: l };
      }
      i(r, "insert"), e.insert = r;
      function n(s, o) {
        return { range: s, newText: "", annotationId: o };
      }
      i(n, "del"), e.del = n;
      function a(s) {
        const o = s;
        return vt.is(o) && (Jt.is(o.annotationId) || Se.is(o.annotationId));
      }
      i(a, "is"), e.is = a;
    })(Lt || (Lt = {})), (function(e) {
      function t(n, a) {
        return { textDocument: n, edits: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && xa.is(a.textDocument) && Array.isArray(a.edits);
      }
      i(r, "is"), e.is = r;
    })(Da || (Da = {})), (function(e) {
      function t(n, a, s) {
        const o = {
          kind: "create",
          uri: n
        };
        return a !== void 0 && (a.overwrite !== void 0 || a.ignoreIfExists !== void 0) && (o.options = a), s !== void 0 && (o.annotationId = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && a.kind === "create" && C.string(a.uri) && (a.options === void 0 || (a.options.overwrite === void 0 || C.boolean(a.options.overwrite)) && (a.options.ignoreIfExists === void 0 || C.boolean(a.options.ignoreIfExists))) && (a.annotationId === void 0 || Se.is(a.annotationId));
      }
      i(r, "is"), e.is = r;
    })(un || (un = {})), (function(e) {
      function t(n, a, s, o) {
        const l = {
          kind: "rename",
          oldUri: n,
          newUri: a
        };
        return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (l.options = s), o !== void 0 && (l.annotationId = o), l;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && a.kind === "rename" && C.string(a.oldUri) && C.string(a.newUri) && (a.options === void 0 || (a.options.overwrite === void 0 || C.boolean(a.options.overwrite)) && (a.options.ignoreIfExists === void 0 || C.boolean(a.options.ignoreIfExists))) && (a.annotationId === void 0 || Se.is(a.annotationId));
      }
      i(r, "is"), e.is = r;
    })(cn || (cn = {})), (function(e) {
      function t(n, a, s) {
        const o = {
          kind: "delete",
          uri: n
        };
        return a !== void 0 && (a.recursive !== void 0 || a.ignoreIfNotExists !== void 0) && (o.options = a), s !== void 0 && (o.annotationId = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && a.kind === "delete" && C.string(a.uri) && (a.options === void 0 || (a.options.recursive === void 0 || C.boolean(a.options.recursive)) && (a.options.ignoreIfNotExists === void 0 || C.boolean(a.options.ignoreIfNotExists))) && (a.annotationId === void 0 || Se.is(a.annotationId));
      }
      i(r, "is"), e.is = r;
    })(fn || (fn = {})), (function(e) {
      function t(r) {
        const n = r;
        return n && (n.changes !== void 0 || n.documentChanges !== void 0) && (n.documentChanges === void 0 || n.documentChanges.every((a) => C.string(a.kind) ? un.is(a) || cn.is(a) || fn.is(a) : Da.is(a)));
      }
      i(t, "is"), e.is = t;
    })(Ji || (Ji = {})), Ta = class {
      static {
        i(this, "TextEditChangeImpl");
      }
      constructor(e, t) {
        this.edits = e, this.changeAnnotations = t;
      }
      insert(e, t, r) {
        let n, a;
        if (r === void 0 ? n = vt.insert(e, t) : Se.is(r) ? (a = r, n = Lt.insert(e, t, r)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(r), n = Lt.insert(e, t, a)), this.edits.push(n), a !== void 0)
          return a;
      }
      replace(e, t, r) {
        let n, a;
        if (r === void 0 ? n = vt.replace(e, t) : Se.is(r) ? (a = r, n = Lt.replace(e, t, r)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(r), n = Lt.replace(e, t, a)), this.edits.push(n), a !== void 0)
          return a;
      }
      delete(e, t) {
        let r, n;
        if (t === void 0 ? r = vt.del(e) : Se.is(t) ? (n = t, r = Lt.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations), n = this.changeAnnotations.manage(t), r = Lt.del(e, n)), this.edits.push(r), n !== void 0)
          return n;
      }
      add(e) {
        this.edits.push(e);
      }
      all() {
        return this.edits;
      }
      clear() {
        this.edits.splice(0, this.edits.length);
      }
      assertChangeAnnotations(e) {
        if (e === void 0)
          throw new Error("Text edit change is not configured to manage change annotations.");
      }
    }, (function(e) {
      function t(r) {
        const n = r;
        return C.objectLiteral(n) && Z.is(n.range) && rs.isSnippet(n.snippet) && (n.annotationId === void 0 || Jt.is(n.annotationId) || Se.is(n.annotationId));
      }
      i(t, "is"), e.is = t;
    })(pl || (pl = {})), bo = class {
      static {
        i(this, "ChangeAnnotations");
      }
      constructor(e) {
        this._annotations = e === void 0 ? /* @__PURE__ */ Object.create(null) : e, this._counter = 0, this._size = 0;
      }
      all() {
        return this._annotations;
      }
      get size() {
        return this._size;
      }
      manage(e, t) {
        let r;
        if (Se.is(e) ? r = e : (r = this.nextId(), t = e), this._annotations[r] !== void 0)
          throw new Error(`Id ${r} is already in use.`);
        if (t === void 0)
          throw new Error(`No annotation provided for id ${r}`);
        return this._annotations[r] = t, this._size++, r;
      }
      nextId() {
        return this._counter++, this._counter.toString();
      }
    }, Bd = class {
      static {
        i(this, "WorkspaceChange");
      }
      constructor(e) {
        this._textEditChanges = /* @__PURE__ */ Object.create(null), e !== void 0 ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new bo(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((t) => {
          if (Da.is(t)) {
            const r = new Ta(t.edits, this._changeAnnotations);
            this._textEditChanges[t.textDocument.uri] = r;
          }
        })) : e.changes && Object.keys(e.changes).forEach((t) => {
          const r = new Ta(e.changes[t]);
          this._textEditChanges[t] = r;
        })) : this._workspaceEdit = {};
      }
      /**
       * Returns the underlying {@link WorkspaceEdit} literal
       * use to be returned from a workspace edit operation like rename.
       */
      get edit() {
        return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
      }
      getTextEditChange(e) {
        if (xa.is(e)) {
          if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
            throw new Error("Workspace edit is not configured for document changes.");
          const t = { uri: e.uri, version: e.version };
          let r = this._textEditChanges[t.uri];
          if (!r) {
            const n = [], a = {
              textDocument: t,
              edits: n
            };
            this._workspaceEdit.documentChanges.push(a), r = new Ta(n, this._changeAnnotations), this._textEditChanges[t.uri] = r;
          }
          return r;
        } else {
          if (this.initChanges(), this._workspaceEdit.changes === void 0)
            throw new Error("Workspace edit is not configured for normal text edit changes.");
          let t = this._textEditChanges[e];
          if (!t) {
            const r = [];
            this._workspaceEdit.changes[e] = r, t = new Ta(r), this._textEditChanges[e] = t;
          }
          return t;
        }
      }
      initDocumentChanges() {
        this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new bo(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
      }
      initChanges() {
        this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
      }
      createFile(e, t, r) {
        if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
          throw new Error("Workspace edit is not configured for document changes.");
        let n;
        Jt.is(t) || Se.is(t) ? n = t : r = t;
        let a, s;
        if (n === void 0 ? a = un.create(e, r) : (s = Se.is(n) ? n : this._changeAnnotations.manage(n), a = un.create(e, r, s)), this._workspaceEdit.documentChanges.push(a), s !== void 0)
          return s;
      }
      renameFile(e, t, r, n) {
        if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
          throw new Error("Workspace edit is not configured for document changes.");
        let a;
        Jt.is(r) || Se.is(r) ? a = r : n = r;
        let s, o;
        if (a === void 0 ? s = cn.create(e, t, n) : (o = Se.is(a) ? a : this._changeAnnotations.manage(a), s = cn.create(e, t, n, o)), this._workspaceEdit.documentChanges.push(s), o !== void 0)
          return o;
      }
      deleteFile(e, t, r) {
        if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
          throw new Error("Workspace edit is not configured for document changes.");
        let n;
        Jt.is(t) || Se.is(t) ? n = t : r = t;
        let a, s;
        if (n === void 0 ? a = fn.create(e, r) : (s = Se.is(n) ? n : this._changeAnnotations.manage(n), a = fn.create(e, r, s)), this._workspaceEdit.documentChanges.push(a), s !== void 0)
          return s;
      }
    }, (function(e) {
      function t(n) {
        return { uri: n };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.string(a.uri);
      }
      i(r, "is"), e.is = r;
    })(dl || (dl = {})), (function(e) {
      function t(n, a) {
        return { uri: n, version: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.string(a.uri) && C.integer(a.version);
      }
      i(r, "is"), e.is = r;
    })(ml || (ml = {})), (function(e) {
      function t(n, a) {
        return { uri: n, version: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.string(a.uri) && (a.version === null || C.integer(a.version));
      }
      i(r, "is"), e.is = r;
    })(xa || (xa = {})), (function(e) {
      e.ABAP = "abap", e.WindowsBat = "bat", e.BibTeX = "bibtex", e.Clojure = "clojure", e.Coffeescript = "coffeescript", e.C = "c", e.CPP = "cpp", e.CSharp = "csharp", e.CSS = "css", e.D = "d", e.Delphi = "pascal", e.Diff = "diff", e.Dart = "dart", e.Dockerfile = "dockerfile", e.Elixir = "elixir", e.Erlang = "erlang", e.FSharp = "fsharp", e.GitCommit = "git-commit", e.GitRebase = "git-rebase", e.Go = "go", e.Groovy = "groovy", e.Handlebars = "handlebars", e.Haskell = "haskell", e.HTML = "html", e.Ini = "ini", e.Java = "java", e.JavaScript = "javascript", e.JavaScriptReact = "javascriptreact", e.JSON = "json", e.LaTeX = "latex", e.Less = "less", e.Lua = "lua", e.Makefile = "makefile", e.Markdown = "markdown", e.ObjectiveC = "objective-c", e.ObjectiveCPP = "objective-cpp", e.Pascal = "pascal", e.Perl = "perl", e.Perl6 = "perl6", e.PHP = "php", e.Plaintext = "plaintext", e.Powershell = "powershell", e.Pug = "jade", e.Python = "python", e.R = "r", e.Razor = "razor", e.Ruby = "ruby", e.Rust = "rust", e.SCSS = "scss", e.SASS = "sass", e.Scala = "scala", e.ShaderLab = "shaderlab", e.ShellScript = "shellscript", e.SQL = "sql", e.Swift = "swift", e.TypeScript = "typescript", e.TypeScriptReact = "typescriptreact", e.TeX = "tex", e.VisualBasic = "vb", e.XML = "xml", e.XSL = "xsl", e.YAML = "yaml";
    })(hl || (hl = {})), (function(e) {
      function t(n, a, s, o) {
        return { uri: n, languageId: a, version: s, text: o };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.string(a.uri) && C.string(a.languageId) && C.integer(a.version) && C.string(a.text);
      }
      i(r, "is"), e.is = r;
    })(yl || (yl = {})), (function(e) {
      e.PlainText = "plaintext", e.Markdown = "markdown";
      function t(r) {
        const n = r;
        return n === e.PlainText || n === e.Markdown;
      }
      i(t, "is"), e.is = t;
    })(Zi || (Zi = {})), (function(e) {
      function t(r) {
        const n = r;
        return C.objectLiteral(r) && Zi.is(n.kind) && C.string(n.value);
      }
      i(t, "is"), e.is = t;
    })(Zt || (Zt = {})), (function(e) {
      e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
    })(gl || (gl = {})), (function(e) {
      e.PlainText = 1, e.Snippet = 2;
    })(vl || (vl = {})), (function(e) {
      e.Deprecated = 1;
    })(Tl || (Tl = {})), (function(e) {
      function t(n, a, s) {
        return { newText: n, insert: a, replace: s };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && C.string(a.newText) && Z.is(a.insert) && Z.is(a.replace);
      }
      i(r, "is"), e.is = r;
    })($l || ($l = {})), (function(e) {
      e.asIs = 1, e.adjustIndentation = 2;
    })(Rl || (Rl = {})), (function(e) {
      e.Replace = 1, e.Merge = 2;
    })(Al || (Al = {})), (function(e) {
      function t(r) {
        const n = r;
        return n && (C.string(n.detail) || n.detail === void 0) && (C.string(n.description) || n.description === void 0);
      }
      i(t, "is"), e.is = t;
    })(El || (El = {})), (function(e) {
      function t(r) {
        return { label: r };
      }
      i(t, "create"), e.create = t;
    })(Cl || (Cl = {})), (function(e) {
      function t(r, n) {
        return { items: r || [], isIncomplete: !!n };
      }
      i(t, "create"), e.create = t;
    })(bl || (bl = {})), (function(e) {
      function t(n) {
        return n.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
      }
      i(t, "fromPlainText"), e.fromPlainText = t;
      function r(n) {
        const a = n;
        return C.string(a) || C.objectLiteral(a) && C.string(a.language) && C.string(a.value);
      }
      i(r, "is"), e.is = r;
    })(Ga || (Ga = {})), (function(e) {
      function t(r) {
        const n = r;
        return !!n && C.objectLiteral(n) && (Zt.is(n.contents) || Ga.is(n.contents) || C.typedArray(n.contents, Ga.is)) && (r.range === void 0 || Z.is(r.range));
      }
      i(t, "is"), e.is = t;
    })(_l || (_l = {})), (function(e) {
      function t(r, n) {
        return n ? { label: r, documentation: n } : { label: r };
      }
      i(t, "create"), e.create = t;
    })(Sl || (Sl = {})), (function(e) {
      function t(r, n, ...a) {
        const s = { label: r };
        return C.defined(n) && (s.documentation = n), C.defined(a) ? s.parameters = a : s.parameters = [], s;
      }
      i(t, "create"), e.create = t;
    })(wl || (wl = {})), (function(e) {
      e.Text = 1, e.Read = 2, e.Write = 3;
    })(Pl || (Pl = {})), (function(e) {
      function t(r, n) {
        const a = { range: r };
        return C.number(n) && (a.kind = n), a;
      }
      i(t, "create"), e.create = t;
    })(kl || (kl = {})), (function(e) {
      e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
    })(Il || (Il = {})), (function(e) {
      e.Deprecated = 1;
    })(Nl || (Nl = {})), (function(e) {
      function t(r, n, a, s, o) {
        const l = {
          name: r,
          kind: n,
          location: { uri: s, range: a }
        };
        return o && (l.containerName = o), l;
      }
      i(t, "create"), e.create = t;
    })(Ol || (Ol = {})), (function(e) {
      function t(r, n, a, s) {
        return s !== void 0 ? { name: r, kind: n, location: { uri: a, range: s } } : { name: r, kind: n, location: { uri: a } };
      }
      i(t, "create"), e.create = t;
    })(Ml || (Ml = {})), (function(e) {
      function t(n, a, s, o, l, u) {
        const c = {
          name: n,
          detail: a,
          kind: s,
          range: o,
          selectionRange: l
        };
        return u !== void 0 && (c.children = u), c;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && C.string(a.name) && C.number(a.kind) && Z.is(a.range) && Z.is(a.selectionRange) && (a.detail === void 0 || C.string(a.detail)) && (a.deprecated === void 0 || C.boolean(a.deprecated)) && (a.children === void 0 || Array.isArray(a.children)) && (a.tags === void 0 || Array.isArray(a.tags));
      }
      i(r, "is"), e.is = r;
    })(Ll || (Ll = {})), (function(e) {
      e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorMove = "refactor.move", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll", e.Notebook = "notebook";
    })(Dl || (Dl = {})), (function(e) {
      e.Invoked = 1, e.Automatic = 2;
    })(Fa || (Fa = {})), (function(e) {
      function t(n, a, s) {
        const o = { diagnostics: n };
        return a != null && (o.only = a), s != null && (o.triggerKind = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.typedArray(a.diagnostics, La.is) && (a.only === void 0 || C.typedArray(a.only, C.string)) && (a.triggerKind === void 0 || a.triggerKind === Fa.Invoked || a.triggerKind === Fa.Automatic);
      }
      i(r, "is"), e.is = r;
    })(xl || (xl = {})), (function(e) {
      e.LLMGenerated = 1;
      function t(r) {
        return C.defined(r) && r === e.LLMGenerated;
      }
      i(t, "is"), e.is = t;
    })(Qi || (Qi = {})), (function(e) {
      function t(n, a, s) {
        const o = { title: n };
        let l = !0;
        return typeof a == "string" ? (l = !1, o.kind = a) : $r.is(a) ? o.command = a : o.edit = a, l && s !== void 0 && (o.kind = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a && C.string(a.title) && (a.diagnostics === void 0 || C.typedArray(a.diagnostics, La.is)) && (a.kind === void 0 || C.string(a.kind)) && (a.edit !== void 0 || a.command !== void 0) && (a.command === void 0 || $r.is(a.command)) && (a.isPreferred === void 0 || C.boolean(a.isPreferred)) && (a.edit === void 0 || Ji.is(a.edit)) && (a.tags === void 0 || C.typedArray(a.tags, Qi.is));
      }
      i(r, "is"), e.is = r;
    })(Gl || (Gl = {})), (function(e) {
      function t(n, a) {
        const s = { range: n };
        return C.defined(a) && (s.data = a), s;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && Z.is(a.range) && (C.undefined(a.command) || $r.is(a.command));
      }
      i(r, "is"), e.is = r;
    })(Fl || (Fl = {})), (function(e) {
      function t(n, a) {
        return { tabSize: n, insertSpaces: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && C.uinteger(a.tabSize) && C.boolean(a.insertSpaces);
      }
      i(r, "is"), e.is = r;
    })(jl || (jl = {})), (function(e) {
      function t(n, a, s) {
        return { range: n, target: a, data: s };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && Z.is(a.range) && (C.undefined(a.target) || C.string(a.target));
      }
      i(r, "is"), e.is = r;
    })(zl || (zl = {})), (function(e) {
      function t(n, a) {
        return { range: n, parent: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && Z.is(a.range) && (a.parent === void 0 || e.is(a.parent));
      }
      i(r, "is"), e.is = r;
    })(Ul || (Ul = {})), (function(e) {
      e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator", e.label = "label";
    })(Bl || (Bl = {})), (function(e) {
      e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
    })(Vl || (Vl = {})), (function(e) {
      function t(r) {
        const n = r;
        return C.objectLiteral(n) && (n.resultId === void 0 || typeof n.resultId == "string") && Array.isArray(n.data) && (n.data.length === 0 || typeof n.data[0] == "number");
      }
      i(t, "is"), e.is = t;
    })(Kl || (Kl = {})), (function(e) {
      function t(n, a) {
        return { range: n, text: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a != null && Z.is(a.range) && C.string(a.text);
      }
      i(r, "is"), e.is = r;
    })(Wl || (Wl = {})), (function(e) {
      function t(n, a, s) {
        return { range: n, variableName: a, caseSensitiveLookup: s };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a != null && Z.is(a.range) && C.boolean(a.caseSensitiveLookup) && (C.string(a.variableName) || a.variableName === void 0);
      }
      i(r, "is"), e.is = r;
    })(ql || (ql = {})), (function(e) {
      function t(n, a) {
        return { range: n, expression: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return a != null && Z.is(a.range) && (C.string(a.expression) || a.expression === void 0);
      }
      i(r, "is"), e.is = r;
    })(Hl || (Hl = {})), (function(e) {
      function t(n, a) {
        return { frameId: n, stoppedLocation: a };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.defined(a) && Z.is(n.stoppedLocation);
      }
      i(r, "is"), e.is = r;
    })(Yl || (Yl = {})), (function(e) {
      e.Type = 1, e.Parameter = 2;
      function t(r) {
        return r === 1 || r === 2;
      }
      i(t, "is"), e.is = t;
    })(es || (es = {})), (function(e) {
      function t(n) {
        return { value: n };
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && (a.tooltip === void 0 || C.string(a.tooltip) || Zt.is(a.tooltip)) && (a.location === void 0 || Ma.is(a.location)) && (a.command === void 0 || $r.is(a.command));
      }
      i(r, "is"), e.is = r;
    })(ts || (ts = {})), (function(e) {
      function t(n, a, s) {
        const o = { position: n, label: a };
        return s !== void 0 && (o.kind = s), o;
      }
      i(t, "create"), e.create = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && ae.is(a.position) && (C.string(a.label) || C.typedArray(a.label, ts.is)) && (a.kind === void 0 || es.is(a.kind)) && a.textEdits === void 0 || C.typedArray(a.textEdits, vt.is) && (a.tooltip === void 0 || C.string(a.tooltip) || Zt.is(a.tooltip)) && (a.paddingLeft === void 0 || C.boolean(a.paddingLeft)) && (a.paddingRight === void 0 || C.boolean(a.paddingRight));
      }
      i(r, "is"), e.is = r;
    })(Xl || (Xl = {})), (function(e) {
      function t(n) {
        return { kind: "snippet", value: n };
      }
      i(t, "createSnippet"), e.createSnippet = t;
      function r(n) {
        const a = n;
        return C.objectLiteral(a) && a.kind === "snippet" && C.string(a.value);
      }
      i(r, "isSnippet"), e.isSnippet = r;
    })(rs || (rs = {})), (function(e) {
      function t(r, n, a, s) {
        return { insertText: r, filterText: n, range: a, command: s };
      }
      i(t, "create"), e.create = t;
    })(Jl || (Jl = {})), (function(e) {
      function t(r) {
        return { items: r };
      }
      i(t, "create"), e.create = t;
    })(Zl || (Zl = {})), (function(e) {
      e.Invoked = 1, e.Automatic = 2;
    })(Ql || (Ql = {})), (function(e) {
      function t(r, n) {
        return { range: r, text: n };
      }
      i(t, "create"), e.create = t;
    })(eu || (eu = {})), (function(e) {
      function t(r, n) {
        return { triggerKind: r, selectedCompletionInfo: n };
      }
      i(t, "create"), e.create = t;
    })(tu || (tu = {})), (function(e) {
      function t(r) {
        const n = r;
        return C.objectLiteral(n) && Hi.is(n.uri) && C.string(n.name);
      }
      i(t, "is"), e.is = t;
    })(ru || (ru = {})), Vd = [`
`, `\r
`, "\r"], (function(e) {
      function t(s, o, l, u) {
        return new kf(s, o, l, u);
      }
      i(t, "create"), e.create = t;
      function r(s) {
        const o = s;
        return !!(C.defined(o) && C.string(o.uri) && (C.undefined(o.languageId) || C.string(o.languageId)) && C.uinteger(o.lineCount) && C.func(o.getText) && C.func(o.positionAt) && C.func(o.offsetAt));
      }
      i(r, "is"), e.is = r;
      function n(s, o) {
        let l = s.getText();
        const u = a(o, (p, h) => {
          const y = p.range.start.line - h.range.start.line;
          return y === 0 ? p.range.start.character - h.range.start.character : y;
        });
        let c = l.length;
        for (let p = u.length - 1; p >= 0; p--) {
          const h = u[p], y = s.offsetAt(h.range.start), d = s.offsetAt(h.range.end);
          if (d <= c)
            l = l.substring(0, y) + h.newText + l.substring(d, l.length);
          else
            throw new Error("Overlapping edit");
          c = y;
        }
        return l;
      }
      i(n, "applyEdits"), e.applyEdits = n;
      function a(s, o) {
        if (s.length <= 1)
          return s;
        const l = s.length / 2 | 0, u = s.slice(0, l), c = s.slice(l);
        a(u, o), a(c, o);
        let p = 0, h = 0, y = 0;
        for (; p < u.length && h < c.length; )
          o(u[p], c[h]) <= 0 ? s[y++] = u[p++] : s[y++] = c[h++];
        for (; p < u.length; )
          s[y++] = u[p++];
        for (; h < c.length; )
          s[y++] = c[h++];
        return s;
      }
      i(a, "mergeSort");
    })(nu || (nu = {})), kf = class {
      static {
        i(this, "FullTextDocument");
      }
      constructor(e, t, r, n) {
        this._uri = e, this._languageId = t, this._version = r, this._content = n, this._lineOffsets = void 0;
      }
      get uri() {
        return this._uri;
      }
      get languageId() {
        return this._languageId;
      }
      get version() {
        return this._version;
      }
      getText(e) {
        if (e) {
          const t = this.offsetAt(e.start), r = this.offsetAt(e.end);
          return this._content.substring(t, r);
        }
        return this._content;
      }
      update(e, t) {
        this._content = e.text, this._version = t, this._lineOffsets = void 0;
      }
      getLineOffsets() {
        if (this._lineOffsets === void 0) {
          const e = [], t = this._content;
          let r = !0;
          for (let n = 0; n < t.length; n++) {
            r && (e.push(n), r = !1);
            const a = t.charAt(n);
            r = a === "\r" || a === `
`, a === "\r" && n + 1 < t.length && t.charAt(n + 1) === `
` && n++;
          }
          r && t.length > 0 && e.push(t.length), this._lineOffsets = e;
        }
        return this._lineOffsets;
      }
      positionAt(e) {
        e = Math.max(Math.min(e, this._content.length), 0);
        const t = this.getLineOffsets();
        let r = 0, n = t.length;
        if (n === 0)
          return ae.create(0, e);
        for (; r < n; ) {
          const s = Math.floor((r + n) / 2);
          t[s] > e ? n = s : r = s + 1;
        }
        const a = r - 1;
        return ae.create(a, e - t[a]);
      }
      offsetAt(e) {
        const t = this.getLineOffsets();
        if (e.line >= t.length)
          return this._content.length;
        if (e.line < 0)
          return 0;
        const r = t[e.line], n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
        return Math.max(Math.min(r + e.character, n), r);
      }
      get lineCount() {
        return this.getLineOffsets().length;
      }
    }, (function(e) {
      const t = Object.prototype.toString;
      function r(d) {
        return typeof d < "u";
      }
      i(r, "defined"), e.defined = r;
      function n(d) {
        return typeof d > "u";
      }
      i(n, "undefined"), e.undefined = n;
      function a(d) {
        return d === !0 || d === !1;
      }
      i(a, "boolean"), e.boolean = a;
      function s(d) {
        return t.call(d) === "[object String]";
      }
      i(s, "string"), e.string = s;
      function o(d) {
        return t.call(d) === "[object Number]";
      }
      i(o, "number"), e.number = o;
      function l(d, A, T) {
        return t.call(d) === "[object Number]" && A <= d && d <= T;
      }
      i(l, "numberRange"), e.numberRange = l;
      function u(d) {
        return t.call(d) === "[object Number]" && -2147483648 <= d && d <= 2147483647;
      }
      i(u, "integer"), e.integer = u;
      function c(d) {
        return t.call(d) === "[object Number]" && 0 <= d && d <= 2147483647;
      }
      i(c, "uinteger"), e.uinteger = c;
      function p(d) {
        return t.call(d) === "[object Function]";
      }
      i(p, "func"), e.func = p;
      function h(d) {
        return d !== null && typeof d == "object";
      }
      i(h, "objectLiteral"), e.objectLiteral = h;
      function y(d, A) {
        return Array.isArray(d) && d.every(A);
      }
      i(y, "typedArray"), e.typedArray = y;
    })(C || (C = {}));
  }
}), fe = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/messages.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CM = e.ProtocolNotificationType = e.ProtocolNotificationType0 = e.ProtocolRequestType = e.ProtocolRequestType0 = e.RegistrationType = e.MessageDirection = void 0;
    var t = vi(), r;
    (function(c) {
      c.clientToServer = "clientToServer", c.serverToClient = "serverToClient", c.both = "both";
    })(r || (e.MessageDirection = r = {}));
    var n = class {
      static {
        i(this, "RegistrationType");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ____;
      method;
      constructor(c) {
        this.method = c;
      }
    };
    e.RegistrationType = n;
    var a = class extends t.RequestType0 {
      static {
        i(this, "ProtocolRequestType0");
      }
      /**
       * Clients must not use these properties. They are here to ensure correct typing.
       * in TypeScript
       */
      __;
      ___;
      ____;
      _pr;
      constructor(c) {
        super(c);
      }
    };
    e.ProtocolRequestType0 = a;
    var s = class extends t.RequestType {
      static {
        i(this, "ProtocolRequestType");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      __;
      ___;
      ____;
      _pr;
      constructor(c) {
        super(c, t.ParameterStructures.byName);
      }
    };
    e.ProtocolRequestType = s;
    var o = class extends t.NotificationType0 {
      static {
        i(this, "ProtocolNotificationType0");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ___;
      ____;
      constructor(c) {
        super(c);
      }
    };
    e.ProtocolNotificationType0 = o;
    var l = class extends t.NotificationType {
      static {
        i(this, "ProtocolNotificationType");
      }
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ___;
      ____;
      constructor(c) {
        super(c, t.ParameterStructures.byName);
      }
    };
    e.ProtocolNotificationType = l;
    var u;
    (function(c) {
      function p(h, y) {
        return { client: h, server: y };
      }
      i(p, "create"), c.create = p;
    })(u || (e.CM = u = {}));
  }
}), yc = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.boolean = t, e.string = r, e.number = n, e.error = a, e.func = s, e.array = o, e.stringArray = l, e.typedArray = u, e.objectLiteral = c;
    function t(p) {
      return p === !0 || p === !1;
    }
    i(t, "boolean");
    function r(p) {
      return typeof p == "string" || p instanceof String;
    }
    i(r, "string");
    function n(p) {
      return typeof p == "number" || p instanceof Number;
    }
    i(n, "number");
    function a(p) {
      return p instanceof Error;
    }
    i(a, "error");
    function s(p) {
      return typeof p == "function";
    }
    i(s, "func");
    function o(p) {
      return Array.isArray(p);
    }
    i(o, "array");
    function l(p) {
      return o(p) && p.every((h) => r(h));
    }
    i(l, "stringArray");
    function u(p, h) {
      return Array.isArray(p) && p.every(h);
    }
    i(u, "typedArray");
    function c(p) {
      return p !== null && typeof p == "object";
    }
    i(c, "objectLiteral");
  }
}), kR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ImplementationRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/implementation", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.implementation", "implementationProvider");
    })(r || (e.ImplementationRequest = r = {}));
  }
}), IR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeDefinitionRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/typeDefinition", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.typeDefinition", "typeDefinitionProvider");
    })(r || (e.TypeDefinitionRequest = r = {}));
  }
}), NR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.DidChangeWorkspaceFoldersNotification = e.WorkspaceFoldersRequest = void 0;
    var t = fe(), r;
    (function(a) {
      a.method = "workspace/workspaceFolders", a.messageDirection = t.MessageDirection.serverToClient, a.type = new t.ProtocolRequestType0(a.method), a.capabilities = t.CM.create("workspace.workspaceFolders", "workspace.workspaceFolders");
    })(r || (e.WorkspaceFoldersRequest = r = {}));
    var n;
    (function(a) {
      a.method = "workspace/didChangeWorkspaceFolders", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolNotificationType(a.method), a.capabilities = t.CM.create(void 0, "workspace.workspaceFolders.changeNotifications");
    })(n || (e.DidChangeWorkspaceFoldersNotification = n = {}));
  }
}), OR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ConfigurationRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "workspace/configuration", n.messageDirection = t.MessageDirection.serverToClient, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("workspace.configuration", void 0);
    })(r || (e.ConfigurationRequest = r = {}));
  }
}), MR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ColorPresentationRequest = e.DocumentColorRequest = void 0;
    var t = fe(), r;
    (function(a) {
      a.method = "textDocument/documentColor", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolRequestType(a.method), a.capabilities = t.CM.create("textDocument.colorProvider", "colorProvider");
    })(r || (e.DocumentColorRequest = r = {}));
    var n;
    (function(a) {
      a.method = "textDocument/colorPresentation", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolRequestType(a.method), a.capabilities = t.CM.create("textDocument.colorProvider", "colorProvider");
    })(n || (e.ColorPresentationRequest = n = {}));
  }
}), LR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.FoldingRangeRefreshRequest = e.FoldingRangeRequest = void 0;
    var t = fe(), r;
    (function(a) {
      a.method = "textDocument/foldingRange", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolRequestType(a.method), a.capabilities = t.CM.create("textDocument.foldingRange", "foldingRangeProvider");
    })(r || (e.FoldingRangeRequest = r = {}));
    var n;
    (function(a) {
      a.method = "workspace/foldingRange/refresh", a.messageDirection = t.MessageDirection.serverToClient, a.type = new t.ProtocolRequestType0(a.method), a.capabilities = t.CM.create("workspace.foldingRange.refreshSupport", void 0);
    })(n || (e.FoldingRangeRefreshRequest = n = {}));
  }
}), DR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.DeclarationRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/declaration", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.declaration", "declarationProvider");
    })(r || (e.DeclarationRequest = r = {}));
  }
}), xR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SelectionRangeRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/selectionRange", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.selectionRange", "selectionRangeProvider");
    })(r || (e.SelectionRangeRequest = r = {}));
  }
}), GR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.WorkDoneProgressCancelNotification = e.WorkDoneProgressCreateRequest = e.WorkDoneProgress = void 0;
    var t = vi(), r = fe(), n;
    (function(o) {
      o.type = new t.ProgressType();
      function l(u) {
        return u === o.type;
      }
      i(l, "is"), o.is = l;
    })(n || (e.WorkDoneProgress = n = {}));
    var a;
    (function(o) {
      o.method = "window/workDoneProgress/create", o.messageDirection = r.MessageDirection.serverToClient, o.type = new r.ProtocolRequestType(o.method), o.capabilities = r.CM.create("window.workDoneProgress", void 0);
    })(a || (e.WorkDoneProgressCreateRequest = a = {}));
    var s;
    (function(o) {
      o.method = "window/workDoneProgress/cancel", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolNotificationType(o.method);
    })(s || (e.WorkDoneProgressCancelNotification = s = {}));
  }
}), FR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CallHierarchyOutgoingCallsRequest = e.CallHierarchyIncomingCallsRequest = e.CallHierarchyPrepareRequest = void 0;
    var t = fe(), r;
    (function(s) {
      s.method = "textDocument/prepareCallHierarchy", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(r || (e.CallHierarchyPrepareRequest = r = {}));
    var n;
    (function(s) {
      s.method = "callHierarchy/incomingCalls", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(n || (e.CallHierarchyIncomingCallsRequest = n = {}));
    var a;
    (function(s) {
      s.method = "callHierarchy/outgoingCalls", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(a || (e.CallHierarchyOutgoingCallsRequest = a = {}));
  }
}), jR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.SemanticTokensRefreshRequest = e.SemanticTokensRangeRequest = e.SemanticTokensDeltaRequest = e.SemanticTokensRequest = e.SemanticTokensRegistrationType = e.TokenFormat = void 0;
    var t = fe(), r;
    (function(u) {
      u.Relative = "relative";
    })(r || (e.TokenFormat = r = {}));
    var n;
    (function(u) {
      u.method = "textDocument/semanticTokens", u.type = new t.RegistrationType(u.method);
    })(n || (e.SemanticTokensRegistrationType = n = {}));
    var a;
    (function(u) {
      u.method = "textDocument/semanticTokens/full", u.messageDirection = t.MessageDirection.clientToServer, u.type = new t.ProtocolRequestType(u.method), u.registrationMethod = n.method, u.capabilities = t.CM.create("textDocument.semanticTokens", "semanticTokensProvider");
    })(a || (e.SemanticTokensRequest = a = {}));
    var s;
    (function(u) {
      u.method = "textDocument/semanticTokens/full/delta", u.messageDirection = t.MessageDirection.clientToServer, u.type = new t.ProtocolRequestType(u.method), u.registrationMethod = n.method, u.capabilities = t.CM.create("textDocument.semanticTokens.requests.full.delta", "semanticTokensProvider.full.delta");
    })(s || (e.SemanticTokensDeltaRequest = s = {}));
    var o;
    (function(u) {
      u.method = "textDocument/semanticTokens/range", u.messageDirection = t.MessageDirection.clientToServer, u.type = new t.ProtocolRequestType(u.method), u.registrationMethod = n.method, u.capabilities = t.CM.create("textDocument.semanticTokens.requests.range", "semanticTokensProvider.range");
    })(o || (e.SemanticTokensRangeRequest = o = {}));
    var l;
    (function(u) {
      u.method = "workspace/semanticTokens/refresh", u.messageDirection = t.MessageDirection.serverToClient, u.type = new t.ProtocolRequestType0(u.method), u.capabilities = t.CM.create("workspace.semanticTokens.refreshSupport", void 0);
    })(l || (e.SemanticTokensRefreshRequest = l = {}));
  }
}), zR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ShowDocumentRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "window/showDocument", n.messageDirection = t.MessageDirection.serverToClient, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("window.showDocument.support", void 0);
    })(r || (e.ShowDocumentRequest = r = {}));
  }
}), UR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.LinkedEditingRangeRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/linkedEditingRange", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.linkedEditingRange", "linkedEditingRangeProvider");
    })(r || (e.LinkedEditingRangeRequest = r = {}));
  }
}), BR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.WillDeleteFilesRequest = e.DidDeleteFilesNotification = e.DidRenameFilesNotification = e.WillRenameFilesRequest = e.DidCreateFilesNotification = e.WillCreateFilesRequest = e.FileOperationPatternKind = void 0;
    var t = fe(), r;
    (function(c) {
      c.file = "file", c.folder = "folder";
    })(r || (e.FileOperationPatternKind = r = {}));
    var n;
    (function(c) {
      c.method = "workspace/willCreateFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolRequestType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.willCreate", "workspace.fileOperations.willCreate");
    })(n || (e.WillCreateFilesRequest = n = {}));
    var a;
    (function(c) {
      c.method = "workspace/didCreateFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolNotificationType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.didCreate", "workspace.fileOperations.didCreate");
    })(a || (e.DidCreateFilesNotification = a = {}));
    var s;
    (function(c) {
      c.method = "workspace/willRenameFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolRequestType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.willRename", "workspace.fileOperations.willRename");
    })(s || (e.WillRenameFilesRequest = s = {}));
    var o;
    (function(c) {
      c.method = "workspace/didRenameFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolNotificationType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.didRename", "workspace.fileOperations.didRename");
    })(o || (e.DidRenameFilesNotification = o = {}));
    var l;
    (function(c) {
      c.method = "workspace/didDeleteFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolNotificationType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.didDelete", "workspace.fileOperations.didDelete");
    })(l || (e.DidDeleteFilesNotification = l = {}));
    var u;
    (function(c) {
      c.method = "workspace/willDeleteFiles", c.messageDirection = t.MessageDirection.clientToServer, c.type = new t.ProtocolRequestType(c.method), c.capabilities = t.CM.create("workspace.fileOperations.willDelete", "workspace.fileOperations.willDelete");
    })(u || (e.WillDeleteFilesRequest = u = {}));
  }
}), VR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.MonikerRequest = e.MonikerKind = e.UniquenessLevel = void 0;
    var t = fe(), r;
    (function(s) {
      s.document = "document", s.project = "project", s.group = "group", s.scheme = "scheme", s.global = "global";
    })(r || (e.UniquenessLevel = r = {}));
    var n;
    (function(s) {
      s.$import = "import", s.$export = "export", s.local = "local";
    })(n || (e.MonikerKind = n = {}));
    var a;
    (function(s) {
      s.method = "textDocument/moniker", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.moniker", "monikerProvider");
    })(a || (e.MonikerRequest = a = {}));
  }
}), KR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeHierarchySubtypesRequest = e.TypeHierarchySupertypesRequest = e.TypeHierarchyPrepareRequest = void 0;
    var t = fe(), r;
    (function(s) {
      s.method = "textDocument/prepareTypeHierarchy", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.typeHierarchy", "typeHierarchyProvider");
    })(r || (e.TypeHierarchyPrepareRequest = r = {}));
    var n;
    (function(s) {
      s.method = "typeHierarchy/supertypes", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method);
    })(n || (e.TypeHierarchySupertypesRequest = n = {}));
    var a;
    (function(s) {
      s.method = "typeHierarchy/subtypes", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method);
    })(a || (e.TypeHierarchySubtypesRequest = a = {}));
  }
}), WR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.InlineValueRefreshRequest = e.InlineValueRequest = void 0;
    var t = fe(), r;
    (function(a) {
      a.method = "textDocument/inlineValue", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolRequestType(a.method), a.capabilities = t.CM.create("textDocument.inlineValue", "inlineValueProvider");
    })(r || (e.InlineValueRequest = r = {}));
    var n;
    (function(a) {
      a.method = "workspace/inlineValue/refresh", a.messageDirection = t.MessageDirection.serverToClient, a.type = new t.ProtocolRequestType0(a.method), a.capabilities = t.CM.create("workspace.inlineValue.refreshSupport", void 0);
    })(n || (e.InlineValueRefreshRequest = n = {}));
  }
}), qR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.InlayHintRefreshRequest = e.InlayHintResolveRequest = e.InlayHintRequest = void 0;
    var t = fe(), r;
    (function(s) {
      s.method = "textDocument/inlayHint", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.inlayHint", "inlayHintProvider");
    })(r || (e.InlayHintRequest = r = {}));
    var n;
    (function(s) {
      s.method = "inlayHint/resolve", s.messageDirection = t.MessageDirection.clientToServer, s.type = new t.ProtocolRequestType(s.method), s.capabilities = t.CM.create("textDocument.inlayHint.resolveSupport", "inlayHintProvider.resolveProvider");
    })(n || (e.InlayHintResolveRequest = n = {}));
    var a;
    (function(s) {
      s.method = "workspace/inlayHint/refresh", s.messageDirection = t.MessageDirection.serverToClient, s.type = new t.ProtocolRequestType0(s.method), s.capabilities = t.CM.create("workspace.inlayHint.refreshSupport", void 0);
    })(a || (e.InlayHintRefreshRequest = a = {}));
  }
}), HR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(y, d, A, T) {
      T === void 0 && (T = A);
      var v = Object.getOwnPropertyDescriptor(d, A);
      (!v || ("get" in v ? !d.__esModule : v.writable || v.configurable)) && (v = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return d[A];
      }, "get") }), Object.defineProperty(y, T, v);
    }) : (function(y, d, A, T) {
      T === void 0 && (T = A), y[T] = d[A];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(y, d) {
      Object.defineProperty(y, "default", { enumerable: !0, value: d });
    }) : function(y, d) {
      y.default = d;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var y = /* @__PURE__ */ i(function(d) {
        return y = Object.getOwnPropertyNames || function(A) {
          var T = [];
          for (var v in A) Object.prototype.hasOwnProperty.call(A, v) && (T[T.length] = v);
          return T;
        }, y(d);
      }, "ownKeys");
      return function(d) {
        if (d && d.__esModule) return d;
        var A = {};
        if (d != null)
          for (var T = y(d), v = 0; v < T.length; v++) T[v] !== "default" && t(A, d, T[v]);
        return r(A, d), A;
      };
    })();
    Object.defineProperty(e, "__esModule", { value: !0 }), e.DiagnosticRefreshRequest = e.WorkspaceDiagnosticRequest = e.DocumentDiagnosticRequest = e.DocumentDiagnosticReportKind = e.DiagnosticServerCancellationData = void 0;
    var a = vi(), s = n(yc()), o = fe(), l;
    (function(y) {
      function d(A) {
        const T = A;
        return T && s.boolean(T.retriggerRequest);
      }
      i(d, "is"), y.is = d;
    })(l || (e.DiagnosticServerCancellationData = l = {}));
    var u;
    (function(y) {
      y.Full = "full", y.Unchanged = "unchanged";
    })(u || (e.DocumentDiagnosticReportKind = u = {}));
    var c;
    (function(y) {
      y.method = "textDocument/diagnostic", y.messageDirection = o.MessageDirection.clientToServer, y.type = new o.ProtocolRequestType(y.method), y.partialResult = new a.ProgressType(), y.capabilities = o.CM.create("textDocument.diagnostic", "diagnosticProvider");
    })(c || (e.DocumentDiagnosticRequest = c = {}));
    var p;
    (function(y) {
      y.method = "workspace/diagnostic", y.messageDirection = o.MessageDirection.clientToServer, y.type = new o.ProtocolRequestType(y.method), y.partialResult = new a.ProgressType(), y.capabilities = o.CM.create("workspace.diagnostics", "diagnosticProvider.workspaceDiagnostics");
    })(p || (e.WorkspaceDiagnosticRequest = p = {}));
    var h;
    (function(y) {
      y.method = "workspace/diagnostic/refresh", y.messageDirection = o.MessageDirection.serverToClient, y.type = new o.ProtocolRequestType0(y.method), y.capabilities = o.CM.create("workspace.diagnostics.refreshSupport", void 0);
    })(h || (e.DiagnosticRefreshRequest = h = {}));
  }
}), YR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function($, S, E, O) {
      O === void 0 && (O = E);
      var M = Object.getOwnPropertyDescriptor(S, E);
      (!M || ("get" in M ? !S.__esModule : M.writable || M.configurable)) && (M = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return S[E];
      }, "get") }), Object.defineProperty($, O, M);
    }) : (function($, S, E, O) {
      O === void 0 && (O = E), $[O] = S[E];
    })), r = e && e.__setModuleDefault || (Object.create ? (function($, S) {
      Object.defineProperty($, "default", { enumerable: !0, value: S });
    }) : function($, S) {
      $.default = S;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var $ = /* @__PURE__ */ i(function(S) {
        return $ = Object.getOwnPropertyNames || function(E) {
          var O = [];
          for (var M in E) Object.prototype.hasOwnProperty.call(E, M) && (O[O.length] = M);
          return O;
        }, $(S);
      }, "ownKeys");
      return function(S) {
        if (S && S.__esModule) return S;
        var E = {};
        if (S != null)
          for (var O = $(S), M = 0; M < O.length; M++) O[M] !== "default" && t(E, S, O[M]);
        return r(E, S), E;
      };
    })();
    Object.defineProperty(e, "__esModule", { value: !0 }), e.DidCloseNotebookDocumentNotification = e.DidSaveNotebookDocumentNotification = e.DidChangeNotebookDocumentNotification = e.NotebookCellArrayChange = e.DidOpenNotebookDocumentNotification = e.NotebookDocumentSyncRegistrationType = e.NotebookDocument = e.NotebookCell = e.ExecutionSummary = e.NotebookCellKind = void 0;
    var a = (qs(), mc(Ws)), s = n(yc()), o = fe(), l;
    (function($) {
      $.Markup = 1, $.Code = 2;
      function S(E) {
        return E === 1 || E === 2;
      }
      i(S, "is"), $.is = S;
    })(l || (e.NotebookCellKind = l = {}));
    var u;
    (function($) {
      function S(M, F) {
        const U = { executionOrder: M };
        return (F === !0 || F === !1) && (U.success = F), U;
      }
      i(S, "create"), $.create = S;
      function E(M) {
        const F = M;
        return s.objectLiteral(F) && a.uinteger.is(F.executionOrder) && (F.success === void 0 || s.boolean(F.success));
      }
      i(E, "is"), $.is = E;
      function O(M, F) {
        return M === F ? !0 : M == null || F === null || F === void 0 ? !1 : M.executionOrder === F.executionOrder && M.success === F.success;
      }
      i(O, "equals"), $.equals = O;
    })(u || (e.ExecutionSummary = u = {}));
    var c;
    (function($) {
      function S(F, U) {
        return { kind: F, document: U };
      }
      i(S, "create"), $.create = S;
      function E(F) {
        const U = F;
        return s.objectLiteral(U) && l.is(U.kind) && a.DocumentUri.is(U.document) && (U.metadata === void 0 || s.objectLiteral(U.metadata));
      }
      i(E, "is"), $.is = E;
      function O(F, U) {
        const J = /* @__PURE__ */ new Set();
        return F.document !== U.document && J.add("document"), F.kind !== U.kind && J.add("kind"), F.executionSummary !== U.executionSummary && J.add("executionSummary"), (F.metadata !== void 0 || U.metadata !== void 0) && !M(F.metadata, U.metadata) && J.add("metadata"), (F.executionSummary !== void 0 || U.executionSummary !== void 0) && !u.equals(F.executionSummary, U.executionSummary) && J.add("executionSummary"), J;
      }
      i(O, "diff"), $.diff = O;
      function M(F, U) {
        if (F === U)
          return !0;
        if (F == null || U === null || U === void 0 || typeof F != typeof U || typeof F != "object")
          return !1;
        const J = Array.isArray(F), ne = Array.isArray(U);
        if (J !== ne)
          return !1;
        if (J && ne) {
          if (F.length !== U.length)
            return !1;
          for (let Y = 0; Y < F.length; Y++)
            if (!M(F[Y], U[Y]))
              return !1;
        }
        if (s.objectLiteral(F) && s.objectLiteral(U)) {
          const Y = Object.keys(F), L = Object.keys(U);
          if (Y.length !== L.length || (Y.sort(), L.sort(), !M(Y, L)))
            return !1;
          for (let k = 0; k < Y.length; k++) {
            const x = Y[k];
            if (!M(F[x], U[x]))
              return !1;
          }
        }
        return !0;
      }
      i(M, "equalsMetadata");
    })(c || (e.NotebookCell = c = {}));
    var p;
    (function($) {
      function S(O, M, F, U) {
        return { uri: O, notebookType: M, version: F, cells: U };
      }
      i(S, "create"), $.create = S;
      function E(O) {
        const M = O;
        return s.objectLiteral(M) && s.string(M.uri) && a.integer.is(M.version) && s.typedArray(M.cells, c.is);
      }
      i(E, "is"), $.is = E;
    })(p || (e.NotebookDocument = p = {}));
    var h;
    (function($) {
      $.method = "notebookDocument/sync", $.messageDirection = o.MessageDirection.clientToServer, $.type = new o.RegistrationType($.method);
    })(h || (e.NotebookDocumentSyncRegistrationType = h = {}));
    var y;
    (function($) {
      $.method = "notebookDocument/didOpen", $.messageDirection = o.MessageDirection.clientToServer, $.type = new o.ProtocolNotificationType($.method), $.registrationMethod = h.method;
    })(y || (e.DidOpenNotebookDocumentNotification = y = {}));
    var d;
    (function($) {
      function S(O) {
        const M = O;
        return s.objectLiteral(M) && a.uinteger.is(M.start) && a.uinteger.is(M.deleteCount) && (M.cells === void 0 || s.typedArray(M.cells, c.is));
      }
      i(S, "is"), $.is = S;
      function E(O, M, F) {
        const U = { start: O, deleteCount: M };
        return F !== void 0 && (U.cells = F), U;
      }
      i(E, "create"), $.create = E;
    })(d || (e.NotebookCellArrayChange = d = {}));
    var A;
    (function($) {
      $.method = "notebookDocument/didChange", $.messageDirection = o.MessageDirection.clientToServer, $.type = new o.ProtocolNotificationType($.method), $.registrationMethod = h.method;
    })(A || (e.DidChangeNotebookDocumentNotification = A = {}));
    var T;
    (function($) {
      $.method = "notebookDocument/didSave", $.messageDirection = o.MessageDirection.clientToServer, $.type = new o.ProtocolNotificationType($.method), $.registrationMethod = h.method;
    })(T || (e.DidSaveNotebookDocumentNotification = T = {}));
    var v;
    (function($) {
      $.method = "notebookDocument/didClose", $.messageDirection = o.MessageDirection.clientToServer, $.type = new o.ProtocolNotificationType($.method), $.registrationMethod = h.method;
    })(v || (e.DidCloseNotebookDocumentNotification = v = {}));
  }
}), XR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.InlineCompletionRequest = void 0;
    var t = fe(), r;
    (function(n) {
      n.method = "textDocument/inlineCompletion", n.messageDirection = t.MessageDirection.clientToServer, n.type = new t.ProtocolRequestType(n.method), n.capabilities = t.CM.create("textDocument.inlineCompletion", "inlineCompletionProvider");
    })(r || (e.InlineCompletionRequest = r = {}));
  }
}), JR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.textDocumentContent.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TextDocumentContentRefreshRequest = e.TextDocumentContentRequest = void 0;
    var t = fe(), r;
    (function(a) {
      a.method = "workspace/textDocumentContent", a.messageDirection = t.MessageDirection.clientToServer, a.type = new t.ProtocolRequestType(a.method), a.capabilities = t.CM.create("workspace.textDocumentContent", "workspace.textDocumentContent");
    })(r || (e.TextDocumentContentRequest = r = {}));
    var n;
    (function(a) {
      a.method = "workspace/textDocumentContent/refresh", a.messageDirection = t.MessageDirection.serverToClient, a.type = new t.ProtocolRequestType(a.method);
    })(n || (e.TextDocumentContentRefreshRequest = n = {}));
  }
}), ZR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(f, z, K, m) {
      m === void 0 && (m = K);
      var w = Object.getOwnPropertyDescriptor(z, K);
      (!w || ("get" in w ? !z.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return z[K];
      }, "get") }), Object.defineProperty(f, m, w);
    }) : (function(f, z, K, m) {
      m === void 0 && (m = K), f[m] = z[K];
    })), r = e && e.__setModuleDefault || (Object.create ? (function(f, z) {
      Object.defineProperty(f, "default", { enumerable: !0, value: z });
    }) : function(f, z) {
      f.default = z;
    }), n = e && e.__importStar || /* @__PURE__ */ (function() {
      var f = /* @__PURE__ */ i(function(z) {
        return f = Object.getOwnPropertyNames || function(K) {
          var m = [];
          for (var w in K) Object.prototype.hasOwnProperty.call(K, w) && (m[m.length] = w);
          return m;
        }, f(z);
      }, "ownKeys");
      return function(z) {
        if (z && z.__esModule) return z;
        var K = {};
        if (z != null)
          for (var m = f(z), w = 0; w < m.length; w++) m[w] !== "default" && t(K, z, m[w]);
        return r(K, z), K;
      };
    })();
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeActionRequest = e.DocumentSymbolRequest = e.DocumentHighlightRequest = e.ReferencesRequest = e.DefinitionRequest = e.SignatureHelpRequest = e.SignatureHelpTriggerKind = e.HoverRequest = e.CompletionResolveRequest = e.CompletionRequest = e.CompletionTriggerKind = e.PublishDiagnosticsNotification = e.WatchKind = e.GlobPattern = e.RelativePattern = e.FileChangeType = e.DidChangeWatchedFilesNotification = e.WillSaveTextDocumentWaitUntilRequest = e.WillSaveTextDocumentNotification = e.TextDocumentSaveReason = e.DidSaveTextDocumentNotification = e.DidCloseTextDocumentNotification = e.DidChangeTextDocumentNotification = e.TextDocumentContentChangeEvent = e.DidOpenTextDocumentNotification = e.TextDocumentSyncKind = e.TelemetryEventNotification = e.LogMessageNotification = e.ShowMessageRequest = e.ShowMessageNotification = e.MessageType = e.DidChangeConfigurationNotification = e.ExitNotification = e.ShutdownRequest = e.InitializedNotification = e.InitializeErrorCodes = e.InitializeRequest = e.WorkDoneProgressOptions = e.TextDocumentRegistrationOptions = e.StaticRegistrationOptions = e.PositionEncodingKind = e.RegularExpressionEngineKind = e.FailureHandlingKind = e.ResourceOperationKind = e.UnregistrationRequest = e.RegistrationRequest = e.DocumentSelector = e.NotebookCellTextDocumentFilter = e.NotebookDocumentFilter = e.TextDocumentFilter = void 0, e.UniquenessLevel = e.WillDeleteFilesRequest = e.DidDeleteFilesNotification = e.WillRenameFilesRequest = e.DidRenameFilesNotification = e.WillCreateFilesRequest = e.DidCreateFilesNotification = e.FileOperationPatternKind = e.LinkedEditingRangeRequest = e.ShowDocumentRequest = e.SemanticTokensRegistrationType = e.SemanticTokensRefreshRequest = e.SemanticTokensRangeRequest = e.SemanticTokensDeltaRequest = e.SemanticTokensRequest = e.TokenFormat = e.CallHierarchyPrepareRequest = e.CallHierarchyOutgoingCallsRequest = e.CallHierarchyIncomingCallsRequest = e.WorkDoneProgressCancelNotification = e.WorkDoneProgressCreateRequest = e.WorkDoneProgress = e.SelectionRangeRequest = e.DeclarationRequest = e.FoldingRangeRefreshRequest = e.FoldingRangeRequest = e.ColorPresentationRequest = e.DocumentColorRequest = e.ConfigurationRequest = e.DidChangeWorkspaceFoldersNotification = e.WorkspaceFoldersRequest = e.TypeDefinitionRequest = e.ImplementationRequest = e.ApplyWorkspaceEditRequest = e.ExecuteCommandRequest = e.PrepareRenameRequest = e.RenameRequest = e.PrepareSupportDefaultBehavior = e.DocumentOnTypeFormattingRequest = e.DocumentRangesFormattingRequest = e.DocumentRangeFormattingRequest = e.DocumentFormattingRequest = e.DocumentLinkResolveRequest = e.DocumentLinkRequest = e.CodeLensRefreshRequest = e.CodeLensResolveRequest = e.CodeLensRequest = e.WorkspaceSymbolResolveRequest = e.WorkspaceSymbolRequest = e.CodeActionResolveRequest = void 0, e.TextDocumentContentRefreshRequest = e.TextDocumentContentRequest = e.InlineCompletionRequest = e.DidCloseNotebookDocumentNotification = e.DidSaveNotebookDocumentNotification = e.DidChangeNotebookDocumentNotification = e.NotebookCellArrayChange = e.DidOpenNotebookDocumentNotification = e.NotebookDocumentSyncRegistrationType = e.NotebookDocument = e.NotebookCell = e.ExecutionSummary = e.NotebookCellKind = e.DiagnosticRefreshRequest = e.WorkspaceDiagnosticRequest = e.DocumentDiagnosticRequest = e.DocumentDiagnosticReportKind = e.DiagnosticServerCancellationData = e.InlayHintRefreshRequest = e.InlayHintResolveRequest = e.InlayHintRequest = e.InlineValueRefreshRequest = e.InlineValueRequest = e.TypeHierarchySupertypesRequest = e.TypeHierarchySubtypesRequest = e.TypeHierarchyPrepareRequest = e.MonikerRequest = e.MonikerKind = void 0;
    var a = fe(), s = (qs(), mc(Ws)), o = n(yc()), l = kR();
    Object.defineProperty(e, "ImplementationRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return l.ImplementationRequest;
    }, "get") });
    var u = IR();
    Object.defineProperty(e, "TypeDefinitionRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return u.TypeDefinitionRequest;
    }, "get") });
    var c = NR();
    Object.defineProperty(e, "WorkspaceFoldersRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return c.WorkspaceFoldersRequest;
    }, "get") }), Object.defineProperty(e, "DidChangeWorkspaceFoldersNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return c.DidChangeWorkspaceFoldersNotification;
    }, "get") });
    var p = OR();
    Object.defineProperty(e, "ConfigurationRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return p.ConfigurationRequest;
    }, "get") });
    var h = MR();
    Object.defineProperty(e, "DocumentColorRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.DocumentColorRequest;
    }, "get") }), Object.defineProperty(e, "ColorPresentationRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return h.ColorPresentationRequest;
    }, "get") });
    var y = LR();
    Object.defineProperty(e, "FoldingRangeRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return y.FoldingRangeRequest;
    }, "get") }), Object.defineProperty(e, "FoldingRangeRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return y.FoldingRangeRefreshRequest;
    }, "get") });
    var d = DR();
    Object.defineProperty(e, "DeclarationRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return d.DeclarationRequest;
    }, "get") });
    var A = xR();
    Object.defineProperty(e, "SelectionRangeRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return A.SelectionRangeRequest;
    }, "get") });
    var T = GR();
    Object.defineProperty(e, "WorkDoneProgress", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return T.WorkDoneProgress;
    }, "get") }), Object.defineProperty(e, "WorkDoneProgressCreateRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return T.WorkDoneProgressCreateRequest;
    }, "get") }), Object.defineProperty(e, "WorkDoneProgressCancelNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return T.WorkDoneProgressCancelNotification;
    }, "get") });
    var v = FR();
    Object.defineProperty(e, "CallHierarchyIncomingCallsRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return v.CallHierarchyIncomingCallsRequest;
    }, "get") }), Object.defineProperty(e, "CallHierarchyOutgoingCallsRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return v.CallHierarchyOutgoingCallsRequest;
    }, "get") }), Object.defineProperty(e, "CallHierarchyPrepareRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return v.CallHierarchyPrepareRequest;
    }, "get") });
    var $ = jR();
    Object.defineProperty(e, "TokenFormat", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.TokenFormat;
    }, "get") }), Object.defineProperty(e, "SemanticTokensRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.SemanticTokensRequest;
    }, "get") }), Object.defineProperty(e, "SemanticTokensDeltaRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.SemanticTokensDeltaRequest;
    }, "get") }), Object.defineProperty(e, "SemanticTokensRangeRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.SemanticTokensRangeRequest;
    }, "get") }), Object.defineProperty(e, "SemanticTokensRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.SemanticTokensRefreshRequest;
    }, "get") }), Object.defineProperty(e, "SemanticTokensRegistrationType", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return $.SemanticTokensRegistrationType;
    }, "get") });
    var S = zR();
    Object.defineProperty(e, "ShowDocumentRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return S.ShowDocumentRequest;
    }, "get") });
    var E = UR();
    Object.defineProperty(e, "LinkedEditingRangeRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return E.LinkedEditingRangeRequest;
    }, "get") });
    var O = BR();
    Object.defineProperty(e, "FileOperationPatternKind", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.FileOperationPatternKind;
    }, "get") }), Object.defineProperty(e, "DidCreateFilesNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.DidCreateFilesNotification;
    }, "get") }), Object.defineProperty(e, "WillCreateFilesRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.WillCreateFilesRequest;
    }, "get") }), Object.defineProperty(e, "DidRenameFilesNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.DidRenameFilesNotification;
    }, "get") }), Object.defineProperty(e, "WillRenameFilesRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.WillRenameFilesRequest;
    }, "get") }), Object.defineProperty(e, "DidDeleteFilesNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.DidDeleteFilesNotification;
    }, "get") }), Object.defineProperty(e, "WillDeleteFilesRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return O.WillDeleteFilesRequest;
    }, "get") });
    var M = VR();
    Object.defineProperty(e, "UniquenessLevel", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return M.UniquenessLevel;
    }, "get") }), Object.defineProperty(e, "MonikerKind", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return M.MonikerKind;
    }, "get") }), Object.defineProperty(e, "MonikerRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return M.MonikerRequest;
    }, "get") });
    var F = KR();
    Object.defineProperty(e, "TypeHierarchyPrepareRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return F.TypeHierarchyPrepareRequest;
    }, "get") }), Object.defineProperty(e, "TypeHierarchySubtypesRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return F.TypeHierarchySubtypesRequest;
    }, "get") }), Object.defineProperty(e, "TypeHierarchySupertypesRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return F.TypeHierarchySupertypesRequest;
    }, "get") });
    var U = WR();
    Object.defineProperty(e, "InlineValueRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return U.InlineValueRequest;
    }, "get") }), Object.defineProperty(e, "InlineValueRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return U.InlineValueRefreshRequest;
    }, "get") });
    var J = qR();
    Object.defineProperty(e, "InlayHintRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return J.InlayHintRequest;
    }, "get") }), Object.defineProperty(e, "InlayHintResolveRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return J.InlayHintResolveRequest;
    }, "get") }), Object.defineProperty(e, "InlayHintRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return J.InlayHintRefreshRequest;
    }, "get") });
    var ne = HR();
    Object.defineProperty(e, "DiagnosticServerCancellationData", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return ne.DiagnosticServerCancellationData;
    }, "get") }), Object.defineProperty(e, "DocumentDiagnosticReportKind", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return ne.DocumentDiagnosticReportKind;
    }, "get") }), Object.defineProperty(e, "DocumentDiagnosticRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return ne.DocumentDiagnosticRequest;
    }, "get") }), Object.defineProperty(e, "WorkspaceDiagnosticRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return ne.WorkspaceDiagnosticRequest;
    }, "get") }), Object.defineProperty(e, "DiagnosticRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return ne.DiagnosticRefreshRequest;
    }, "get") });
    var Y = YR();
    Object.defineProperty(e, "NotebookCellKind", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.NotebookCellKind;
    }, "get") }), Object.defineProperty(e, "ExecutionSummary", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.ExecutionSummary;
    }, "get") }), Object.defineProperty(e, "NotebookCell", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.NotebookCell;
    }, "get") }), Object.defineProperty(e, "NotebookDocument", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.NotebookDocument;
    }, "get") }), Object.defineProperty(e, "NotebookDocumentSyncRegistrationType", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.NotebookDocumentSyncRegistrationType;
    }, "get") }), Object.defineProperty(e, "DidOpenNotebookDocumentNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.DidOpenNotebookDocumentNotification;
    }, "get") }), Object.defineProperty(e, "NotebookCellArrayChange", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.NotebookCellArrayChange;
    }, "get") }), Object.defineProperty(e, "DidChangeNotebookDocumentNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.DidChangeNotebookDocumentNotification;
    }, "get") }), Object.defineProperty(e, "DidSaveNotebookDocumentNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.DidSaveNotebookDocumentNotification;
    }, "get") }), Object.defineProperty(e, "DidCloseNotebookDocumentNotification", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return Y.DidCloseNotebookDocumentNotification;
    }, "get") });
    var L = XR();
    Object.defineProperty(e, "InlineCompletionRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return L.InlineCompletionRequest;
    }, "get") });
    var k = JR();
    Object.defineProperty(e, "TextDocumentContentRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return k.TextDocumentContentRequest;
    }, "get") }), Object.defineProperty(e, "TextDocumentContentRefreshRequest", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return k.TextDocumentContentRefreshRequest;
    }, "get") });
    var x;
    (function(f) {
      function z(K) {
        const m = K;
        return o.string(m) || o.string(m.language) || o.string(m.scheme) || lr.is(m.pattern);
      }
      i(z, "is"), f.is = z;
    })(x || (e.TextDocumentFilter = x = {}));
    var G;
    (function(f) {
      function z(K) {
        const m = K;
        return o.objectLiteral(m) && (o.string(m.notebookType) || o.string(m.scheme) || o.string(m.pattern));
      }
      i(z, "is"), f.is = z;
    })(G || (e.NotebookDocumentFilter = G = {}));
    var P;
    (function(f) {
      function z(K) {
        const m = K;
        return o.objectLiteral(m) && (o.string(m.notebook) || G.is(m.notebook)) && (m.language === void 0 || o.string(m.language));
      }
      i(z, "is"), f.is = z;
    })(P || (e.NotebookCellTextDocumentFilter = P = {}));
    var R;
    (function(f) {
      function z(K) {
        if (!Array.isArray(K))
          return !1;
        for (const m of K)
          if (!o.string(m) && !x.is(m) && !P.is(m))
            return !1;
        return !0;
      }
      i(z, "is"), f.is = z;
    })(R || (e.DocumentSelector = R = {}));
    var g;
    (function(f) {
      f.method = "client/registerCapability", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolRequestType(f.method);
    })(g || (e.RegistrationRequest = g = {}));
    var b;
    (function(f) {
      f.method = "client/unregisterCapability", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolRequestType(f.method);
    })(b || (e.UnregistrationRequest = b = {}));
    var I;
    (function(f) {
      f.Create = "create", f.Rename = "rename", f.Delete = "delete";
    })(I || (e.ResourceOperationKind = I = {}));
    var _;
    (function(f) {
      f.Abort = "abort", f.Transactional = "transactional", f.TextOnlyTransactional = "textOnlyTransactional", f.Undo = "undo";
    })(_ || (e.FailureHandlingKind = _ = {}));
    var N;
    (function(f) {
      f.ES2020 = "ES2020";
    })(N || (e.RegularExpressionEngineKind = N = {}));
    var V;
    (function(f) {
      f.UTF8 = "utf-8", f.UTF16 = "utf-16", f.UTF32 = "utf-32";
    })(V || (e.PositionEncodingKind = V = {}));
    var q;
    (function(f) {
      function z(K) {
        const m = K;
        return m && o.string(m.id) && m.id.length > 0;
      }
      i(z, "hasId"), f.hasId = z;
    })(q || (e.StaticRegistrationOptions = q = {}));
    var W;
    (function(f) {
      function z(K) {
        const m = K;
        return m && (m.documentSelector === null || R.is(m.documentSelector));
      }
      i(z, "is"), f.is = z;
    })(W || (e.TextDocumentRegistrationOptions = W = {}));
    var Ee;
    (function(f) {
      function z(m) {
        const w = m;
        return o.objectLiteral(w) && (w.workDoneProgress === void 0 || o.boolean(w.workDoneProgress));
      }
      i(z, "is"), f.is = z;
      function K(m) {
        const w = m;
        return w && o.boolean(w.workDoneProgress);
      }
      i(K, "hasWorkDoneProgress"), f.hasWorkDoneProgress = K;
    })(Ee || (e.WorkDoneProgressOptions = Ee = {}));
    var te;
    (function(f) {
      f.method = "initialize", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method);
    })(te || (e.InitializeRequest = te = {}));
    var pe;
    (function(f) {
      f.unknownProtocolVersion = 1;
    })(pe || (e.InitializeErrorCodes = pe = {}));
    var oe;
    (function(f) {
      f.method = "initialized", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method);
    })(oe || (e.InitializedNotification = oe = {}));
    var be;
    (function(f) {
      f.method = "shutdown", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType0(f.method);
    })(be || (e.ShutdownRequest = be = {}));
    var qe;
    (function(f) {
      f.method = "exit", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType0(f.method);
    })(qe || (e.ExitNotification = qe = {}));
    var Qe;
    (function(f) {
      f.method = "workspace/didChangeConfiguration", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("workspace.didChangeConfiguration", void 0);
    })(Qe || (e.DidChangeConfigurationNotification = Qe = {}));
    var Ht;
    (function(f) {
      f.Error = 1, f.Warning = 2, f.Info = 3, f.Log = 4, f.Debug = 5;
    })(Ht || (e.MessageType = Ht = {}));
    var Vr;
    (function(f) {
      f.method = "window/showMessage", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("window.showMessage", void 0);
    })(Vr || (e.ShowMessageNotification = Vr = {}));
    var dt;
    (function(f) {
      f.method = "window/showMessageRequest", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("window.showMessage", void 0);
    })(dt || (e.ShowMessageRequest = dt = {}));
    var at;
    (function(f) {
      f.method = "window/logMessage", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolNotificationType(f.method);
    })(at || (e.LogMessageNotification = at = {}));
    var or;
    (function(f) {
      f.method = "telemetry/event", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolNotificationType(f.method);
    })(or || (e.TelemetryEventNotification = or = {}));
    var Yt;
    (function(f) {
      f.None = 0, f.Full = 1, f.Incremental = 2;
    })(Yt || (e.TextDocumentSyncKind = Yt = {}));
    var ie;
    (function(f) {
      f.method = "textDocument/didOpen", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
    })(ie || (e.DidOpenTextDocumentNotification = ie = {}));
    var mt;
    (function(f) {
      function z(m) {
        const w = m;
        return w != null && typeof w.text == "string" && w.range !== void 0 && (w.rangeLength === void 0 || typeof w.rangeLength == "number");
      }
      i(z, "isIncremental"), f.isIncremental = z;
      function K(m) {
        const w = m;
        return w != null && typeof w.text == "string" && w.range === void 0 && w.rangeLength === void 0;
      }
      i(K, "isFull"), f.isFull = K;
    })(mt || (e.TextDocumentContentChangeEvent = mt = {}));
    var ye;
    (function(f) {
      f.method = "textDocument/didChange", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.synchronization", "textDocumentSync");
    })(ye || (e.DidChangeTextDocumentNotification = ye = {}));
    var it;
    (function(f) {
      f.method = "textDocument/didClose", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
    })(it || (e.DidCloseTextDocumentNotification = it = {}));
    var Kr;
    (function(f) {
      f.method = "textDocument/didSave", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.synchronization.didSave", "textDocumentSync.save");
    })(Kr || (e.DidSaveTextDocumentNotification = Kr = {}));
    var ea;
    (function(f) {
      f.Manual = 1, f.AfterDelay = 2, f.FocusOut = 3;
    })(ea || (e.TextDocumentSaveReason = ea = {}));
    var ta;
    (function(f) {
      f.method = "textDocument/willSave", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.synchronization.willSave", "textDocumentSync.willSave");
    })(ta || (e.WillSaveTextDocumentNotification = ta = {}));
    var ra;
    (function(f) {
      f.method = "textDocument/willSaveWaitUntil", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.synchronization.willSaveWaitUntil", "textDocumentSync.willSaveWaitUntil");
    })(ra || (e.WillSaveTextDocumentWaitUntilRequest = ra = {}));
    var na;
    (function(f) {
      f.method = "workspace/didChangeWatchedFiles", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("workspace.didChangeWatchedFiles", void 0);
    })(na || (e.DidChangeWatchedFilesNotification = na = {}));
    var st;
    (function(f) {
      f.Created = 1, f.Changed = 2, f.Deleted = 3;
    })(st || (e.FileChangeType = st = {}));
    var Wr;
    (function(f) {
      function z(K) {
        const m = K;
        return o.objectLiteral(m) && (s.URI.is(m.baseUri) || s.WorkspaceFolder.is(m.baseUri)) && o.string(m.pattern);
      }
      i(z, "is"), f.is = z;
    })(Wr || (e.RelativePattern = Wr = {}));
    var lr;
    (function(f) {
      function z(K) {
        const m = K;
        return o.string(m) || Wr.is(m);
      }
      i(z, "is"), f.is = z;
    })(lr || (e.GlobPattern = lr = {}));
    var qr;
    (function(f) {
      f.Create = 1, f.Change = 2, f.Delete = 4;
    })(qr || (e.WatchKind = qr = {}));
    var ht;
    (function(f) {
      f.method = "textDocument/publishDiagnostics", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolNotificationType(f.method), f.capabilities = a.CM.create("textDocument.publishDiagnostics", void 0);
    })(ht || (e.PublishDiagnosticsNotification = ht = {}));
    var Hr;
    (function(f) {
      f.Invoked = 1, f.TriggerCharacter = 2, f.TriggerForIncompleteCompletions = 3;
    })(Hr || (e.CompletionTriggerKind = Hr = {}));
    var aa;
    (function(f) {
      f.method = "textDocument/completion", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.completion", "completionProvider");
    })(aa || (e.CompletionRequest = aa = {}));
    var ia;
    (function(f) {
      f.method = "completionItem/resolve", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.completion.completionItem.resolveSupport", "completionProvider.resolveProvider");
    })(ia || (e.CompletionResolveRequest = ia = {}));
    var Yr;
    (function(f) {
      f.method = "textDocument/hover", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.hover", "hoverProvider");
    })(Yr || (e.HoverRequest = Yr = {}));
    var sa;
    (function(f) {
      f.Invoked = 1, f.TriggerCharacter = 2, f.ContentChange = 3;
    })(sa || (e.SignatureHelpTriggerKind = sa = {}));
    var oa;
    (function(f) {
      f.method = "textDocument/signatureHelp", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.signatureHelp", "signatureHelpProvider");
    })(oa || (e.SignatureHelpRequest = oa = {}));
    var la;
    (function(f) {
      f.method = "textDocument/definition", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.definition", "definitionProvider");
    })(la || (e.DefinitionRequest = la = {}));
    var ur;
    (function(f) {
      f.method = "textDocument/references", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.references", "referencesProvider");
    })(ur || (e.ReferencesRequest = ur = {}));
    var Xr;
    (function(f) {
      f.method = "textDocument/documentHighlight", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.documentHighlight", "documentHighlightProvider");
    })(Xr || (e.DocumentHighlightRequest = Xr = {}));
    var _i;
    (function(f) {
      f.method = "textDocument/documentSymbol", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.documentSymbol", "documentSymbolProvider");
    })(_i || (e.DocumentSymbolRequest = _i = {}));
    var ua;
    (function(f) {
      f.method = "textDocument/codeAction", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.codeAction", "codeActionProvider");
    })(ua || (e.CodeActionRequest = ua = {}));
    var Jr;
    (function(f) {
      f.method = "codeAction/resolve", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.codeAction.resolveSupport", "codeActionProvider.resolveProvider");
    })(Jr || (e.CodeActionResolveRequest = Jr = {}));
    var ca;
    (function(f) {
      f.method = "workspace/symbol", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("workspace.symbol", "workspaceSymbolProvider");
    })(ca || (e.WorkspaceSymbolRequest = ca = {}));
    var fa;
    (function(f) {
      f.method = "workspaceSymbol/resolve", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("workspace.symbol.resolveSupport", "workspaceSymbolProvider.resolveProvider");
    })(fa || (e.WorkspaceSymbolResolveRequest = fa = {}));
    var et;
    (function(f) {
      f.method = "textDocument/codeLens", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.codeLens", "codeLensProvider");
    })(et || (e.CodeLensRequest = et = {}));
    var pa;
    (function(f) {
      f.method = "codeLens/resolve", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.codeLens.resolveSupport", "codeLensProvider.resolveProvider");
    })(pa || (e.CodeLensResolveRequest = pa = {}));
    var da;
    (function(f) {
      f.method = "workspace/codeLens/refresh", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolRequestType0(f.method), f.capabilities = a.CM.create("workspace.codeLens", void 0);
    })(da || (e.CodeLensRefreshRequest = da = {}));
    var cr;
    (function(f) {
      f.method = "textDocument/documentLink", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.documentLink", "documentLinkProvider");
    })(cr || (e.DocumentLinkRequest = cr = {}));
    var ma;
    (function(f) {
      f.method = "documentLink/resolve", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.documentLink", "documentLinkProvider.resolveProvider");
    })(ma || (e.DocumentLinkResolveRequest = ma = {}));
    var fr;
    (function(f) {
      f.method = "textDocument/formatting", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.formatting", "documentFormattingProvider");
    })(fr || (e.DocumentFormattingRequest = fr = {}));
    var ha;
    (function(f) {
      f.method = "textDocument/rangeFormatting", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.rangeFormatting", "documentRangeFormattingProvider");
    })(ha || (e.DocumentRangeFormattingRequest = ha = {}));
    var yt;
    (function(f) {
      f.method = "textDocument/rangesFormatting", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.rangeFormatting.rangesSupport", "documentRangeFormattingProvider.rangesSupport");
    })(yt || (e.DocumentRangesFormattingRequest = yt = {}));
    var Pt;
    (function(f) {
      f.method = "textDocument/onTypeFormatting", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.onTypeFormatting", "documentOnTypeFormattingProvider");
    })(Pt || (e.DocumentOnTypeFormattingRequest = Pt = {}));
    var ya;
    (function(f) {
      f.Identifier = 1;
    })(ya || (e.PrepareSupportDefaultBehavior = ya = {}));
    var ga;
    (function(f) {
      f.method = "textDocument/rename", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.rename", "renameProvider");
    })(ga || (e.RenameRequest = ga = {}));
    var kt;
    (function(f) {
      f.method = "textDocument/prepareRename", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("textDocument.rename.prepareSupport", "renameProvider.prepareProvider");
    })(kt || (e.PrepareRenameRequest = kt = {}));
    var Zr;
    (function(f) {
      f.method = "workspace/executeCommand", f.messageDirection = a.MessageDirection.clientToServer, f.type = new a.ProtocolRequestType(f.method), f.capabilities = a.CM.create("workspace.executeCommand", "executeCommandProvider");
    })(Zr || (e.ExecuteCommandRequest = Zr = {}));
    var Qr;
    (function(f) {
      f.method = "workspace/applyEdit", f.messageDirection = a.MessageDirection.serverToClient, f.type = new a.ProtocolRequestType("workspace/applyEdit"), f.capabilities = a.CM.create("workspace.applyEdit", void 0);
    })(Qr || (e.ApplyWorkspaceEditRequest = Qr = {}));
  }
}), QR = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/connection.js"(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createProtocolConnection = r;
    var t = vi();
    function r(n, a, s, o) {
      return t.ConnectionStrategy.is(o) && (o = { connectionStrategy: o }), (0, t.createMessageConnection)(n, a, s, o);
    }
    i(r, "createProtocolConnection");
  }
}), gc = H({
  "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/api.js"(e) {
    var t = e && e.__createBinding || (Object.create ? (function(s, o, l, u) {
      u === void 0 && (u = l);
      var c = Object.getOwnPropertyDescriptor(o, l);
      (!c || ("get" in c ? !o.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: /* @__PURE__ */ i(function() {
        return o[l];
      }, "get") }), Object.defineProperty(s, u, c);
    }) : (function(s, o, l, u) {
      u === void 0 && (u = l), s[u] = o[l];
    })), r = e && e.__exportStar || function(s, o) {
      for (var l in s) l !== "default" && !Object.prototype.hasOwnProperty.call(o, l) && t(o, s, l);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.LSPErrorCodes = e.createProtocolConnection = void 0, r(vi(), e), r((qs(), mc(Ws)), e), r(fe(), e), r(ZR(), e);
    var n = QR();
    Object.defineProperty(e, "createProtocolConnection", { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return n.createProtocolConnection;
    }, "get") });
    var a;
    (function(s) {
      s.lspReservedErrorRangeStart = -32899, s.RequestFailed = -32803, s.ServerCancelled = -32802, s.ContentModified = -32801, s.RequestCancelled = -32800, s.lspReservedErrorRangeEnd = -32800;
    })(a || (e.LSPErrorCodes = a = {}));
  }
});
function we(e) {
  return typeof e == "object" && e !== null && typeof e.$type == "string";
}
i(we, "isAstNode");
function rt(e) {
  return typeof e == "object" && e !== null && typeof e.$refText == "string" && "ref" in e;
}
i(rt, "isReference");
function Ut(e) {
  return typeof e == "object" && e !== null && typeof e.$refText == "string" && "items" in e;
}
i(Ut, "isMultiReference");
function Kd(e) {
  return typeof e == "object" && e !== null && typeof e.name == "string" && typeof e.type == "string" && typeof e.path == "string";
}
i(Kd, "isAstNodeDescription");
function In(e) {
  return typeof e == "object" && e !== null && typeof e.info == "object" && typeof e.message == "string";
}
i(In, "isLinkingError");
var Wd = class {
  static {
    i(this, "AbstractAstReflection");
  }
  constructor() {
    this.subtypes = {}, this.allSubtypes = {};
  }
  getAllTypes() {
    return Object.keys(this.types);
  }
  getReferenceType(e) {
    const t = this.types[e.container.$type];
    if (!t)
      throw new Error(`Type ${e.container.$type || "undefined"} not found.`);
    const r = t.properties[e.property]?.referenceType;
    if (!r)
      throw new Error(`Property ${e.property || "undefined"} of type ${e.container.$type} is not a reference.`);
    return r;
  }
  getTypeMetaData(e) {
    const t = this.types[e];
    return t || {
      name: e,
      properties: {},
      superTypes: []
    };
  }
  isInstance(e, t) {
    return we(e) && this.isSubtype(e.$type, t);
  }
  isSubtype(e, t) {
    if (e === t)
      return !0;
    let r = this.subtypes[e];
    r || (r = this.subtypes[e] = {});
    const n = r[t];
    if (n !== void 0)
      return n;
    {
      const a = this.types[e], s = a ? a.superTypes.some((o) => this.isSubtype(o, t)) : !1;
      return r[t] = s, s;
    }
  }
  getAllSubTypes(e) {
    const t = this.allSubtypes[e];
    if (t)
      return t;
    {
      const r = this.getAllTypes(), n = [];
      for (const a of r)
        this.isSubtype(a, e) && n.push(a);
      return this.allSubtypes[e] = n, n;
    }
  }
  /**
   * Check whether a given AST node is missing any non-optional properties.
   * Used to guard against incomplete nodes that deviate from their declared type,
   * particularly when error recovery is in effect.
   */
  isComplete(e) {
    const t = this.getTypeMetaData(e.$type);
    for (const r of Object.keys(t.properties)) {
      const n = t.properties[r];
      if (n.optional)
        continue;
      const a = e[n.name];
      if (a == null)
        return !1;
    }
    return !0;
  }
};
function Dn(e) {
  return typeof e == "object" && e !== null && Array.isArray(e.content);
}
i(Dn, "isCompositeCstNode");
function vc(e) {
  return typeof e == "object" && e !== null && typeof e.tokenType == "object";
}
i(vc, "isLeafCstNode");
function Tc(e) {
  return Dn(e) && typeof e.fullText == "string";
}
i(Tc, "isRootCstNode");
var er = class Dt {
  static {
    i(this, "StreamImpl");
  }
  constructor(t, r) {
    this.startFn = t, this.nextFn = r;
  }
  iterator() {
    const t = {
      state: this.startFn(),
      next: /* @__PURE__ */ i(() => this.nextFn(t.state), "next"),
      [Symbol.iterator]: () => t
    };
    return t;
  }
  [Symbol.iterator]() {
    return this.iterator();
  }
  isEmpty() {
    return !!this.iterator().next().done;
  }
  count() {
    const t = this.iterator();
    let r = 0, n = t.next();
    for (; !n.done; )
      r++, n = t.next();
    return r;
  }
  toArray() {
    const t = [], r = this.iterator();
    let n;
    do
      n = r.next(), n.value !== void 0 && t.push(n.value);
    while (!n.done);
    return t;
  }
  toSet() {
    return new Set(this);
  }
  toMap(t, r) {
    const n = this.map((a) => [
      t ? t(a) : a,
      r ? r(a) : a
    ]);
    return new Map(n);
  }
  toString() {
    return this.join();
  }
  concat(t) {
    return new Dt(() => ({ first: this.startFn(), firstDone: !1, iterator: t[Symbol.iterator]() }), (r) => {
      let n;
      if (!r.firstDone) {
        do
          if (n = this.nextFn(r.first), !n.done)
            return n;
        while (!n.done);
        r.firstDone = !0;
      }
      do
        if (n = r.iterator.next(), !n.done)
          return n;
      while (!n.done);
      return Ye;
    });
  }
  join(t = ",") {
    const r = this.iterator();
    let n = "", a, s = !1;
    do
      a = r.next(), a.done || (s && (n += t), n += qd(a.value)), s = !0;
    while (!a.done);
    return n;
  }
  indexOf(t, r = 0) {
    const n = this.iterator();
    let a = 0, s = n.next();
    for (; !s.done; ) {
      if (a >= r && s.value === t)
        return a;
      s = n.next(), a++;
    }
    return -1;
  }
  every(t) {
    const r = this.iterator();
    let n = r.next();
    for (; !n.done; ) {
      if (!t(n.value))
        return !1;
      n = r.next();
    }
    return !0;
  }
  some(t) {
    const r = this.iterator();
    let n = r.next();
    for (; !n.done; ) {
      if (t(n.value))
        return !0;
      n = r.next();
    }
    return !1;
  }
  forEach(t) {
    const r = this.iterator();
    let n = 0, a = r.next();
    for (; !a.done; )
      t(a.value, n), a = r.next(), n++;
  }
  map(t) {
    return new Dt(this.startFn, (r) => {
      const { done: n, value: a } = this.nextFn(r);
      return n ? Ye : { done: !1, value: t(a) };
    });
  }
  filter(t) {
    return new Dt(this.startFn, (r) => {
      let n;
      do
        if (n = this.nextFn(r), !n.done && t(n.value))
          return n;
      while (!n.done);
      return Ye;
    });
  }
  nonNullable() {
    return this.filter((t) => t != null);
  }
  reduce(t, r) {
    const n = this.iterator();
    let a = r, s = n.next();
    for (; !s.done; )
      a === void 0 ? a = s.value : a = t(a, s.value), s = n.next();
    return a;
  }
  reduceRight(t, r) {
    return this.recursiveReduce(this.iterator(), t, r);
  }
  recursiveReduce(t, r, n) {
    const a = t.next();
    if (a.done)
      return n;
    const s = this.recursiveReduce(t, r, n);
    return s === void 0 ? a.value : r(s, a.value);
  }
  find(t) {
    const r = this.iterator();
    let n = r.next();
    for (; !n.done; ) {
      if (t(n.value))
        return n.value;
      n = r.next();
    }
  }
  findIndex(t) {
    const r = this.iterator();
    let n = 0, a = r.next();
    for (; !a.done; ) {
      if (t(a.value))
        return n;
      a = r.next(), n++;
    }
    return -1;
  }
  includes(t) {
    const r = this.iterator();
    let n = r.next();
    for (; !n.done; ) {
      if (n.value === t)
        return !0;
      n = r.next();
    }
    return !1;
  }
  flatMap(t) {
    return new Dt(() => ({ this: this.startFn() }), (r) => {
      do {
        if (r.iterator) {
          const s = r.iterator.next();
          if (s.done)
            r.iterator = void 0;
          else
            return s;
        }
        const { done: n, value: a } = this.nextFn(r.this);
        if (!n) {
          const s = t(a);
          if (ti(s))
            r.iterator = s[Symbol.iterator]();
          else
            return { done: !1, value: s };
        }
      } while (r.iterator);
      return Ye;
    });
  }
  flat(t) {
    if (t === void 0 && (t = 1), t <= 0)
      return this;
    const r = t > 1 ? this.flat(t - 1) : this;
    return new Dt(() => ({ this: r.startFn() }), (n) => {
      do {
        if (n.iterator) {
          const o = n.iterator.next();
          if (o.done)
            n.iterator = void 0;
          else
            return o;
        }
        const { done: a, value: s } = r.nextFn(n.this);
        if (!a)
          if (ti(s))
            n.iterator = s[Symbol.iterator]();
          else
            return { done: !1, value: s };
      } while (n.iterator);
      return Ye;
    });
  }
  head() {
    const r = this.iterator().next();
    if (!r.done)
      return r.value;
  }
  tail(t = 1) {
    return new Dt(() => {
      const r = this.startFn();
      for (let n = 0; n < t; n++)
        if (this.nextFn(r).done)
          return r;
      return r;
    }, this.nextFn);
  }
  limit(t) {
    return new Dt(() => ({ size: 0, state: this.startFn() }), (r) => (r.size++, r.size > t ? Ye : this.nextFn(r.state)));
  }
  distinct(t) {
    return new Dt(() => ({ set: /* @__PURE__ */ new Set(), internalState: this.startFn() }), (r) => {
      let n;
      do
        if (n = this.nextFn(r.internalState), !n.done) {
          const a = t ? t(n.value) : n.value;
          if (!r.set.has(a))
            return r.set.add(a), n;
        }
      while (!n.done);
      return Ye;
    });
  }
  exclude(t, r) {
    const n = /* @__PURE__ */ new Set();
    for (const a of t) {
      const s = r ? r(a) : a;
      n.add(s);
    }
    return this.filter((a) => {
      const s = r ? r(a) : a;
      return !n.has(s);
    });
  }
};
function qd(e) {
  return typeof e == "string" ? e : typeof e > "u" ? "undefined" : typeof e.toString == "function" ? e.toString() : Object.prototype.toString.call(e);
}
i(qd, "toString");
function ti(e) {
  return !!e && typeof e[Symbol.iterator] == "function";
}
i(ti, "isIterable");
var Hd = new er(() => {
}, () => Ye), Ye = Object.freeze({ done: !0, value: void 0 });
function ce(...e) {
  if (e.length === 1) {
    const t = e[0];
    if (t instanceof er)
      return t;
    if (ti(t))
      return new er(() => t[Symbol.iterator](), (r) => r.next());
    if (typeof t.length == "number")
      return new er(() => ({ index: 0 }), (r) => r.index < t.length ? { done: !1, value: t[r.index++] } : Ye);
  }
  return e.length > 1 ? new er(() => ({ collIndex: 0, arrIndex: 0 }), (t) => {
    do {
      if (t.iterator) {
        const r = t.iterator.next();
        if (!r.done)
          return r;
        t.iterator = void 0;
      }
      if (t.array) {
        if (t.arrIndex < t.array.length)
          return { done: !1, value: t.array[t.arrIndex++] };
        t.array = void 0, t.arrIndex = 0;
      }
      if (t.collIndex < e.length) {
        const r = e[t.collIndex++];
        ti(r) ? t.iterator = r[Symbol.iterator]() : r && typeof r.length == "number" && (t.array = r);
      }
    } while (t.iterator || t.array || t.collIndex < e.length);
    return Ye;
  }) : Hd;
}
i(ce, "stream");
var _s = class extends er {
  static {
    i(this, "TreeStreamImpl");
  }
  constructor(e, t, r) {
    super(() => ({
      iterators: r?.includeRoot ? [[e][Symbol.iterator]()] : [t(e)[Symbol.iterator]()],
      pruned: !1
    }), (n) => {
      for (n.pruned && (n.iterators.pop(), n.pruned = !1); n.iterators.length > 0; ) {
        const s = n.iterators[n.iterators.length - 1].next();
        if (s.done)
          n.iterators.pop();
        else
          return n.iterators.push(t(s.value)[Symbol.iterator]()), s;
      }
      return Ye;
    });
  }
  iterator() {
    const e = {
      state: this.startFn(),
      next: /* @__PURE__ */ i(() => this.nextFn(e.state), "next"),
      prune: /* @__PURE__ */ i(() => {
        e.state.pruned = !0;
      }, "prune"),
      [Symbol.iterator]: () => e
    };
    return e;
  }
}, au;
(function(e) {
  function t(s) {
    return s.reduce((o, l) => o + l, 0);
  }
  i(t, "sum"), e.sum = t;
  function r(s) {
    return s.reduce((o, l) => o * l, 0);
  }
  i(r, "product"), e.product = r;
  function n(s) {
    return s.reduce((o, l) => Math.min(o, l));
  }
  i(n, "min"), e.min = n;
  function a(s) {
    return s.reduce((o, l) => Math.max(o, l));
  }
  i(a, "max"), e.max = a;
})(au || (au = {}));
function Ss(e, t = {}) {
  for (const [r, n] of Object.entries(e))
    r.startsWith("$") || (Array.isArray(n) ? n.forEach((a, s) => {
      we(a) && (a.$container = e, a.$containerProperty = r, a.$containerIndex = s, t.deep && Ss(a, t));
    }) : we(n) && (n.$container = e, n.$containerProperty = r, t.deep && Ss(n, t)));
}
i(Ss, "linkContentToContainer");
function Ti(e, t) {
  let r = e;
  for (; r; ) {
    if (t(r))
      return r;
    r = r.$container;
  }
}
i(Ti, "getContainerOfType");
function Rt(e) {
  const r = Xa(e).$document;
  if (!r)
    throw new Error("AST node has no document.");
  return r;
}
i(Rt, "getDocument");
function Xa(e) {
  for (; e.$container; )
    e = e.$container;
  return e;
}
i(Xa, "findRootNode");
function iu(e) {
  return rt(e) ? e.ref ? [e.ref] : [] : Ut(e) ? e.items.map((t) => t.ref) : [];
}
i(iu, "getReferenceNodes");
function Hs(e, t) {
  if (!e)
    throw new Error("Node must be an AstNode.");
  const r = t?.range;
  return new er(() => ({
    keys: Object.keys(e),
    keyIndex: 0,
    arrayIndex: 0
  }), (n) => {
    for (; n.keyIndex < n.keys.length; ) {
      const a = n.keys[n.keyIndex];
      if (!a.startsWith("$")) {
        const s = e[a];
        if (we(s)) {
          if (n.keyIndex++, ws(s, r))
            return { done: !1, value: s };
        } else if (Array.isArray(s)) {
          for (; n.arrayIndex < s.length; ) {
            const o = n.arrayIndex++, l = s[o];
            if (we(l) && ws(l, r))
              return { done: !1, value: l };
          }
          n.arrayIndex = 0;
        }
      }
      n.keyIndex++;
    }
    return Ye;
  });
}
i(Hs, "streamContents");
function zn(e, t) {
  if (!e)
    throw new Error("Root node must be an AstNode.");
  return new _s(e, (r) => Hs(r, t));
}
i(zn, "streamAllContents");
function At(e, t) {
  if (e) {
    if (t?.range && !ws(e, t.range))
      return new _s(e, () => []);
  } else throw new Error("Root node must be an AstNode.");
  return new _s(e, (r) => Hs(r, t), { includeRoot: !0 });
}
i(At, "streamAst");
function ws(e, t) {
  if (!t)
    return !0;
  const r = e.$cstNode?.range;
  return r ? vm(r, t) : !1;
}
i(ws, "isAstNodeInRange");
function ri(e) {
  return new er(() => ({
    keys: Object.keys(e),
    keyIndex: 0,
    arrayIndex: 0
  }), (t) => {
    for (; t.keyIndex < t.keys.length; ) {
      const r = t.keys[t.keyIndex];
      if (!r.startsWith("$")) {
        const n = e[r];
        if (rt(n) || Ut(n))
          return t.keyIndex++, { done: !1, value: { reference: n, container: e, property: r } };
        if (Array.isArray(n)) {
          for (; t.arrayIndex < n.length; ) {
            const a = t.arrayIndex++, s = n[a];
            if (rt(s) || Ut(s))
              return { done: !1, value: { reference: s, container: e, property: r, index: a } };
          }
          t.arrayIndex = 0;
        }
      }
      t.keyIndex++;
    }
    return Ye;
  });
}
i(ri, "streamReferences");
function Yd(e, t) {
  const r = e.getTypeMetaData(t.$type), n = t;
  for (const a of Object.values(r.properties))
    a.defaultValue !== void 0 && n[a.name] === void 0 && (n[a.name] = $c(a.defaultValue));
}
i(Yd, "assignMandatoryProperties");
function $c(e) {
  return Array.isArray(e) ? [...e.map($c)] : e;
}
i($c, "copyDefaultValue");
var He = {
  $type: "AbstractElement",
  cardinality: "cardinality"
};
function Xd(e) {
  return re.isInstance(e, He.$type);
}
i(Xd, "isAbstractElement");
var ns = {
  $type: "AbstractParserRule"
};
function Un(e) {
  return re.isInstance(e, ns.$type);
}
i(Un, "isAbstractParserRule");
var Si = {
  $type: "AbstractRule"
}, lt = {
  $type: "AbstractType"
}, Rr = {
  $type: "Action",
  cardinality: "cardinality",
  feature: "feature",
  inferredType: "inferredType",
  operator: "operator",
  type: "type"
};
function $i(e) {
  return re.isInstance(e, Rr.$type);
}
i($i, "isAction");
var as = {
  $type: "Alternatives",
  cardinality: "cardinality",
  elements: "elements"
};
function Rc(e) {
  return re.isInstance(e, as.$type);
}
i(Rc, "isAlternatives");
var If = {
  $type: "ArrayLiteral",
  elements: "elements"
}, Nf = {
  $type: "ArrayType",
  elementType: "elementType"
}, Ar = {
  $type: "Assignment",
  cardinality: "cardinality",
  feature: "feature",
  operator: "operator",
  predicate: "predicate",
  terminal: "terminal"
};
function tr(e) {
  return re.isInstance(e, Ar.$type);
}
i(tr, "isAssignment");
var su = {
  $type: "BooleanLiteral",
  true: "true"
};
function Jd(e) {
  return re.isInstance(e, su.$type);
}
i(Jd, "isBooleanLiteral");
var Er = {
  $type: "CharacterRange",
  cardinality: "cardinality",
  left: "left",
  lookahead: "lookahead",
  parenthesized: "parenthesized",
  right: "right"
};
function Zd(e) {
  return re.isInstance(e, Er.$type);
}
i(Zd, "isCharacterRange");
var en = {
  $type: "Condition"
}, is = {
  $type: "Conjunction",
  left: "left",
  right: "right"
};
function Qd(e) {
  return re.isInstance(e, is.$type);
}
i(Qd, "isConjunction");
var Cr = {
  $type: "CrossReference",
  cardinality: "cardinality",
  deprecatedSyntax: "deprecatedSyntax",
  isMulti: "isMulti",
  terminal: "terminal",
  type: "type"
};
function Ri(e) {
  return re.isInstance(e, Cr.$type);
}
i(Ri, "isCrossReference");
var ss = {
  $type: "Disjunction",
  left: "left",
  right: "right"
};
function em(e) {
  return re.isInstance(e, ss.$type);
}
i(em, "isDisjunction");
var ou = {
  $type: "EndOfFile",
  cardinality: "cardinality"
};
function tm(e) {
  return re.isInstance(e, ou.$type);
}
i(tm, "isEndOfFile");
var dr = {
  $type: "Grammar",
  imports: "imports",
  interfaces: "interfaces",
  isDeclared: "isDeclared",
  name: "name",
  rules: "rules",
  types: "types"
}, Of = {
  $type: "GrammarImport",
  path: "path"
}, pn = {
  $type: "Group",
  cardinality: "cardinality",
  elements: "elements",
  guardCondition: "guardCondition",
  predicate: "predicate"
};
function Ys(e) {
  return re.isInstance(e, pn.$type);
}
i(Ys, "isGroup");
var lu = {
  $type: "InferredType",
  name: "name"
};
function Ac(e) {
  return re.isInstance(e, lu.$type);
}
i(Ac, "isInferredType");
var xt = {
  $type: "InfixRule",
  call: "call",
  dataType: "dataType",
  inferredType: "inferredType",
  name: "name",
  operators: "operators",
  parameters: "parameters",
  returnType: "returnType"
};
function ni(e) {
  return re.isInstance(e, xt.$type);
}
i(ni, "isInfixRule");
var _o = {
  $type: "InfixRuleOperatorList",
  associativity: "associativity",
  operators: "operators"
}, Mf = {
  $type: "InfixRuleOperators",
  precedences: "precedences"
}, ja = {
  $type: "Interface",
  attributes: "attributes",
  name: "name",
  superTypes: "superTypes"
};
function rm(e) {
  return re.isInstance(e, ja.$type);
}
i(rm, "isInterface");
var za = {
  $type: "Keyword",
  cardinality: "cardinality",
  predicate: "predicate",
  value: "value"
};
function rr(e) {
  return re.isInstance(e, za.$type);
}
i(rr, "isKeyword");
var wi = {
  $type: "NamedArgument",
  calledByName: "calledByName",
  parameter: "parameter",
  value: "value"
}, dn = {
  $type: "NegatedToken",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized",
  terminal: "terminal"
};
function nm(e) {
  return re.isInstance(e, dn.$type);
}
i(nm, "isNegatedToken");
var uu = {
  $type: "Negation",
  value: "value"
};
function am(e) {
  return re.isInstance(e, uu.$type);
}
i(am, "isNegation");
var Lf = {
  $type: "NumberLiteral",
  value: "value"
}, Pi = {
  $type: "Parameter",
  name: "name"
}, cu = {
  $type: "ParameterReference",
  parameter: "parameter"
};
function im(e) {
  return re.isInstance(e, cu.$type);
}
i(im, "isParameterReference");
var Tt = {
  $type: "ParserRule",
  dataType: "dataType",
  definition: "definition",
  entry: "entry",
  fragment: "fragment",
  inferredType: "inferredType",
  name: "name",
  parameters: "parameters",
  returnType: "returnType"
};
function bt(e) {
  return re.isInstance(e, Tt.$type);
}
i(bt, "isParserRule");
var So = {
  $type: "ReferenceType",
  isMulti: "isMulti",
  referenceType: "referenceType"
}, mn = {
  $type: "RegexToken",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized",
  regex: "regex"
};
function sm(e) {
  return re.isInstance(e, mn.$type);
}
i(sm, "isRegexToken");
var fu = {
  $type: "ReturnType",
  name: "name"
};
function om(e) {
  return re.isInstance(e, fu.$type);
}
i(om, "isReturnType");
var hn = {
  $type: "RuleCall",
  arguments: "arguments",
  cardinality: "cardinality",
  predicate: "predicate",
  rule: "rule"
};
function nr(e) {
  return re.isInstance(e, hn.$type);
}
i(nr, "isRuleCall");
var Ua = {
  $type: "SimpleType",
  primitiveType: "primitiveType",
  stringType: "stringType",
  typeRef: "typeRef"
};
function lm(e) {
  return re.isInstance(e, Ua.$type);
}
i(lm, "isSimpleType");
var Df = {
  $type: "StringLiteral",
  value: "value"
}, yn = {
  $type: "TerminalAlternatives",
  cardinality: "cardinality",
  elements: "elements",
  lookahead: "lookahead",
  parenthesized: "parenthesized"
};
function um(e) {
  return re.isInstance(e, yn.$type);
}
i(um, "isTerminalAlternatives");
var tt = {
  $type: "TerminalElement",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized"
}, gn = {
  $type: "TerminalGroup",
  cardinality: "cardinality",
  elements: "elements",
  lookahead: "lookahead",
  parenthesized: "parenthesized"
};
function cm(e) {
  return re.isInstance(e, gn.$type);
}
i(cm, "isTerminalGroup");
var Qt = {
  $type: "TerminalRule",
  definition: "definition",
  fragment: "fragment",
  hidden: "hidden",
  name: "name",
  type: "type"
};
function _t(e) {
  return re.isInstance(e, Qt.$type);
}
i(_t, "isTerminalRule");
var vn = {
  $type: "TerminalRuleCall",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized",
  rule: "rule"
};
function Ec(e) {
  return re.isInstance(e, vn.$type);
}
i(Ec, "isTerminalRuleCall");
var os = {
  $type: "Type",
  name: "name",
  type: "type"
};
function fm(e) {
  return re.isInstance(e, os.$type);
}
i(fm, "isType");
var $a = {
  $type: "TypeAttribute",
  defaultValue: "defaultValue",
  isOptional: "isOptional",
  name: "name",
  type: "type"
}, Ra = {
  $type: "TypeDefinition"
}, xf = {
  $type: "UnionType",
  types: "types"
}, ls = {
  $type: "UnorderedGroup",
  cardinality: "cardinality",
  elements: "elements"
};
function Cc(e) {
  return re.isInstance(e, ls.$type);
}
i(Cc, "isUnorderedGroup");
var Tn = {
  $type: "UntilToken",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized",
  terminal: "terminal"
};
function pm(e) {
  return re.isInstance(e, Tn.$type);
}
i(pm, "isUntilToken");
var Aa = {
  $type: "ValueLiteral"
}, Ba = {
  $type: "Wildcard",
  cardinality: "cardinality",
  lookahead: "lookahead",
  parenthesized: "parenthesized"
};
function dm(e) {
  return re.isInstance(e, Ba.$type);
}
i(dm, "isWildcard");
var mm = class extends Wd {
  static {
    i(this, "LangiumGrammarAstReflection");
  }
  constructor() {
    super(...arguments), this.types = {
      AbstractElement: {
        name: He.$type,
        properties: {
          cardinality: {
            name: He.cardinality,
            optional: !0
          }
        },
        superTypes: []
      },
      AbstractParserRule: {
        name: ns.$type,
        properties: {},
        superTypes: [Si.$type, lt.$type]
      },
      AbstractRule: {
        name: Si.$type,
        properties: {},
        superTypes: []
      },
      AbstractType: {
        name: lt.$type,
        properties: {},
        superTypes: []
      },
      Action: {
        name: Rr.$type,
        properties: {
          cardinality: {
            name: Rr.cardinality,
            optional: !0
          },
          feature: {
            name: Rr.feature,
            optional: !0
          },
          inferredType: {
            name: Rr.inferredType,
            optional: !0
          },
          operator: {
            name: Rr.operator,
            optional: !0
          },
          type: {
            name: Rr.type,
            referenceType: lt.$type,
            optional: !0
          }
        },
        superTypes: [He.$type]
      },
      Alternatives: {
        name: as.$type,
        properties: {
          cardinality: {
            name: as.cardinality,
            optional: !0
          },
          elements: {
            name: as.elements,
            defaultValue: []
          }
        },
        superTypes: [He.$type]
      },
      ArrayLiteral: {
        name: If.$type,
        properties: {
          elements: {
            name: If.elements,
            defaultValue: []
          }
        },
        superTypes: [Aa.$type]
      },
      ArrayType: {
        name: Nf.$type,
        properties: {
          elementType: {
            name: Nf.elementType
          }
        },
        superTypes: [Ra.$type]
      },
      Assignment: {
        name: Ar.$type,
        properties: {
          cardinality: {
            name: Ar.cardinality,
            optional: !0
          },
          feature: {
            name: Ar.feature
          },
          operator: {
            name: Ar.operator
          },
          predicate: {
            name: Ar.predicate,
            optional: !0
          },
          terminal: {
            name: Ar.terminal
          }
        },
        superTypes: [He.$type]
      },
      BooleanLiteral: {
        name: su.$type,
        properties: {
          true: {
            name: su.true,
            defaultValue: !1
          }
        },
        superTypes: [en.$type, Aa.$type]
      },
      CharacterRange: {
        name: Er.$type,
        properties: {
          cardinality: {
            name: Er.cardinality,
            optional: !0
          },
          left: {
            name: Er.left
          },
          lookahead: {
            name: Er.lookahead,
            optional: !0
          },
          parenthesized: {
            name: Er.parenthesized,
            defaultValue: !1,
            optional: !0
          },
          right: {
            name: Er.right,
            optional: !0
          }
        },
        superTypes: [tt.$type]
      },
      Condition: {
        name: en.$type,
        properties: {},
        superTypes: []
      },
      Conjunction: {
        name: is.$type,
        properties: {
          left: {
            name: is.left
          },
          right: {
            name: is.right
          }
        },
        superTypes: [en.$type]
      },
      CrossReference: {
        name: Cr.$type,
        properties: {
          cardinality: {
            name: Cr.cardinality,
            optional: !0
          },
          deprecatedSyntax: {
            name: Cr.deprecatedSyntax,
            defaultValue: !1
          },
          isMulti: {
            name: Cr.isMulti,
            defaultValue: !1
          },
          terminal: {
            name: Cr.terminal,
            optional: !0
          },
          type: {
            name: Cr.type,
            referenceType: lt.$type
          }
        },
        superTypes: [He.$type]
      },
      Disjunction: {
        name: ss.$type,
        properties: {
          left: {
            name: ss.left
          },
          right: {
            name: ss.right
          }
        },
        superTypes: [en.$type]
      },
      EndOfFile: {
        name: ou.$type,
        properties: {
          cardinality: {
            name: ou.cardinality,
            optional: !0
          }
        },
        superTypes: [He.$type]
      },
      Grammar: {
        name: dr.$type,
        properties: {
          imports: {
            name: dr.imports,
            defaultValue: []
          },
          interfaces: {
            name: dr.interfaces,
            defaultValue: []
          },
          isDeclared: {
            name: dr.isDeclared,
            defaultValue: !1
          },
          name: {
            name: dr.name,
            optional: !0
          },
          rules: {
            name: dr.rules,
            defaultValue: []
          },
          types: {
            name: dr.types,
            defaultValue: []
          }
        },
        superTypes: []
      },
      GrammarImport: {
        name: Of.$type,
        properties: {
          path: {
            name: Of.path
          }
        },
        superTypes: []
      },
      Group: {
        name: pn.$type,
        properties: {
          cardinality: {
            name: pn.cardinality,
            optional: !0
          },
          elements: {
            name: pn.elements,
            defaultValue: []
          },
          guardCondition: {
            name: pn.guardCondition,
            optional: !0
          },
          predicate: {
            name: pn.predicate,
            optional: !0
          }
        },
        superTypes: [He.$type]
      },
      InferredType: {
        name: lu.$type,
        properties: {
          name: {
            name: lu.name
          }
        },
        superTypes: [lt.$type]
      },
      InfixRule: {
        name: xt.$type,
        properties: {
          call: {
            name: xt.call
          },
          dataType: {
            name: xt.dataType,
            optional: !0
          },
          inferredType: {
            name: xt.inferredType,
            optional: !0
          },
          name: {
            name: xt.name
          },
          operators: {
            name: xt.operators
          },
          parameters: {
            name: xt.parameters,
            defaultValue: []
          },
          returnType: {
            name: xt.returnType,
            referenceType: lt.$type,
            optional: !0
          }
        },
        superTypes: [ns.$type]
      },
      InfixRuleOperatorList: {
        name: _o.$type,
        properties: {
          associativity: {
            name: _o.associativity,
            optional: !0
          },
          operators: {
            name: _o.operators,
            defaultValue: []
          }
        },
        superTypes: []
      },
      InfixRuleOperators: {
        name: Mf.$type,
        properties: {
          precedences: {
            name: Mf.precedences,
            defaultValue: []
          }
        },
        superTypes: []
      },
      Interface: {
        name: ja.$type,
        properties: {
          attributes: {
            name: ja.attributes,
            defaultValue: []
          },
          name: {
            name: ja.name
          },
          superTypes: {
            name: ja.superTypes,
            defaultValue: [],
            referenceType: lt.$type
          }
        },
        superTypes: [lt.$type]
      },
      Keyword: {
        name: za.$type,
        properties: {
          cardinality: {
            name: za.cardinality,
            optional: !0
          },
          predicate: {
            name: za.predicate,
            optional: !0
          },
          value: {
            name: za.value
          }
        },
        superTypes: [He.$type]
      },
      NamedArgument: {
        name: wi.$type,
        properties: {
          calledByName: {
            name: wi.calledByName,
            defaultValue: !1
          },
          parameter: {
            name: wi.parameter,
            referenceType: Pi.$type,
            optional: !0
          },
          value: {
            name: wi.value
          }
        },
        superTypes: []
      },
      NegatedToken: {
        name: dn.$type,
        properties: {
          cardinality: {
            name: dn.cardinality,
            optional: !0
          },
          lookahead: {
            name: dn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: dn.parenthesized,
            defaultValue: !1,
            optional: !0
          },
          terminal: {
            name: dn.terminal
          }
        },
        superTypes: [tt.$type]
      },
      Negation: {
        name: uu.$type,
        properties: {
          value: {
            name: uu.value
          }
        },
        superTypes: [en.$type]
      },
      NumberLiteral: {
        name: Lf.$type,
        properties: {
          value: {
            name: Lf.value
          }
        },
        superTypes: [Aa.$type]
      },
      Parameter: {
        name: Pi.$type,
        properties: {
          name: {
            name: Pi.name
          }
        },
        superTypes: []
      },
      ParameterReference: {
        name: cu.$type,
        properties: {
          parameter: {
            name: cu.parameter,
            referenceType: Pi.$type
          }
        },
        superTypes: [en.$type]
      },
      ParserRule: {
        name: Tt.$type,
        properties: {
          dataType: {
            name: Tt.dataType,
            optional: !0
          },
          definition: {
            name: Tt.definition
          },
          entry: {
            name: Tt.entry,
            defaultValue: !1
          },
          fragment: {
            name: Tt.fragment,
            defaultValue: !1
          },
          inferredType: {
            name: Tt.inferredType,
            optional: !0
          },
          name: {
            name: Tt.name
          },
          parameters: {
            name: Tt.parameters,
            defaultValue: []
          },
          returnType: {
            name: Tt.returnType,
            referenceType: lt.$type,
            optional: !0
          }
        },
        superTypes: [ns.$type]
      },
      ReferenceType: {
        name: So.$type,
        properties: {
          isMulti: {
            name: So.isMulti,
            defaultValue: !1
          },
          referenceType: {
            name: So.referenceType
          }
        },
        superTypes: [Ra.$type]
      },
      RegexToken: {
        name: mn.$type,
        properties: {
          cardinality: {
            name: mn.cardinality,
            optional: !0
          },
          lookahead: {
            name: mn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: mn.parenthesized,
            defaultValue: !1,
            optional: !0
          },
          regex: {
            name: mn.regex
          }
        },
        superTypes: [tt.$type]
      },
      ReturnType: {
        name: fu.$type,
        properties: {
          name: {
            name: fu.name
          }
        },
        superTypes: []
      },
      RuleCall: {
        name: hn.$type,
        properties: {
          arguments: {
            name: hn.arguments,
            defaultValue: []
          },
          cardinality: {
            name: hn.cardinality,
            optional: !0
          },
          predicate: {
            name: hn.predicate,
            optional: !0
          },
          rule: {
            name: hn.rule,
            referenceType: Si.$type
          }
        },
        superTypes: [He.$type]
      },
      SimpleType: {
        name: Ua.$type,
        properties: {
          primitiveType: {
            name: Ua.primitiveType,
            optional: !0
          },
          stringType: {
            name: Ua.stringType,
            optional: !0
          },
          typeRef: {
            name: Ua.typeRef,
            referenceType: lt.$type,
            optional: !0
          }
        },
        superTypes: [Ra.$type]
      },
      StringLiteral: {
        name: Df.$type,
        properties: {
          value: {
            name: Df.value
          }
        },
        superTypes: [Aa.$type]
      },
      TerminalAlternatives: {
        name: yn.$type,
        properties: {
          cardinality: {
            name: yn.cardinality,
            optional: !0
          },
          elements: {
            name: yn.elements,
            defaultValue: []
          },
          lookahead: {
            name: yn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: yn.parenthesized,
            defaultValue: !1,
            optional: !0
          }
        },
        superTypes: [tt.$type]
      },
      TerminalElement: {
        name: tt.$type,
        properties: {
          cardinality: {
            name: tt.cardinality,
            optional: !0
          },
          lookahead: {
            name: tt.lookahead,
            optional: !0
          },
          parenthesized: {
            name: tt.parenthesized,
            defaultValue: !1,
            optional: !0
          }
        },
        superTypes: [He.$type]
      },
      TerminalGroup: {
        name: gn.$type,
        properties: {
          cardinality: {
            name: gn.cardinality,
            optional: !0
          },
          elements: {
            name: gn.elements,
            defaultValue: []
          },
          lookahead: {
            name: gn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: gn.parenthesized,
            defaultValue: !1,
            optional: !0
          }
        },
        superTypes: [tt.$type]
      },
      TerminalRule: {
        name: Qt.$type,
        properties: {
          definition: {
            name: Qt.definition
          },
          fragment: {
            name: Qt.fragment,
            defaultValue: !1
          },
          hidden: {
            name: Qt.hidden,
            defaultValue: !1
          },
          name: {
            name: Qt.name
          },
          type: {
            name: Qt.type,
            optional: !0
          }
        },
        superTypes: [Si.$type]
      },
      TerminalRuleCall: {
        name: vn.$type,
        properties: {
          cardinality: {
            name: vn.cardinality,
            optional: !0
          },
          lookahead: {
            name: vn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: vn.parenthesized,
            defaultValue: !1,
            optional: !0
          },
          rule: {
            name: vn.rule,
            referenceType: Qt.$type
          }
        },
        superTypes: [tt.$type]
      },
      Type: {
        name: os.$type,
        properties: {
          name: {
            name: os.name
          },
          type: {
            name: os.type
          }
        },
        superTypes: [lt.$type]
      },
      TypeAttribute: {
        name: $a.$type,
        properties: {
          defaultValue: {
            name: $a.defaultValue,
            optional: !0
          },
          isOptional: {
            name: $a.isOptional,
            defaultValue: !1
          },
          name: {
            name: $a.name
          },
          type: {
            name: $a.type
          }
        },
        superTypes: []
      },
      TypeDefinition: {
        name: Ra.$type,
        properties: {},
        superTypes: []
      },
      UnionType: {
        name: xf.$type,
        properties: {
          types: {
            name: xf.types,
            defaultValue: []
          }
        },
        superTypes: [Ra.$type]
      },
      UnorderedGroup: {
        name: ls.$type,
        properties: {
          cardinality: {
            name: ls.cardinality,
            optional: !0
          },
          elements: {
            name: ls.elements,
            defaultValue: []
          }
        },
        superTypes: [He.$type]
      },
      UntilToken: {
        name: Tn.$type,
        properties: {
          cardinality: {
            name: Tn.cardinality,
            optional: !0
          },
          lookahead: {
            name: Tn.lookahead,
            optional: !0
          },
          parenthesized: {
            name: Tn.parenthesized,
            defaultValue: !1,
            optional: !0
          },
          terminal: {
            name: Tn.terminal
          }
        },
        superTypes: [tt.$type]
      },
      ValueLiteral: {
        name: Aa.$type,
        properties: {},
        superTypes: []
      },
      Wildcard: {
        name: Ba.$type,
        properties: {
          cardinality: {
            name: Ba.cardinality,
            optional: !0
          },
          lookahead: {
            name: Ba.lookahead,
            optional: !0
          },
          parenthesized: {
            name: Ba.parenthesized,
            defaultValue: !1,
            optional: !0
          }
        },
        superTypes: [tt.$type]
      }
    };
  }
}, re = new mm();
function Ps(e) {
  return new _s(e, (t) => Dn(t) ? t.content : [], { includeRoot: !0 });
}
i(Ps, "streamCst");
function hm(e, t) {
  for (; e.container; )
    if (e = e.container, e === t)
      return !0;
  return !1;
}
i(hm, "isChildNode");
function ym(e) {
  return {
    start: {
      line: e.startLine - 1,
      character: e.startColumn - 1
    },
    end: {
      line: e.endLine - 1,
      character: e.endColumn
      // endColumn uses the correct index
    }
  };
}
i(ym, "tokenToRange");
function ks(e) {
  const { startOffset: t, endOffset: r } = e;
  return typeof t == "number" && Number.isFinite(t) && t >= 0 && typeof r == "number" && Number.isFinite(r) && r >= t;
}
i(ks, "isValidTokenRange");
function ai(e) {
  if (!e)
    return;
  const { offset: t, end: r, range: n } = e;
  return {
    range: n,
    offset: t,
    end: r,
    length: r - t
  };
}
i(ai, "toDocumentSegment");
var jt;
(function(e) {
  e[e.Before = 0] = "Before", e[e.After = 1] = "After", e[e.OverlapFront = 2] = "OverlapFront", e[e.OverlapBack = 3] = "OverlapBack", e[e.Inside = 4] = "Inside", e[e.Outside = 5] = "Outside";
})(jt || (jt = {}));
function gm(e, t) {
  if (e.end.line < t.start.line || e.end.line === t.start.line && e.end.character <= t.start.character)
    return jt.Before;
  if (e.start.line > t.end.line || e.start.line === t.end.line && e.start.character >= t.end.character)
    return jt.After;
  const r = e.start.line > t.start.line || e.start.line === t.start.line && e.start.character >= t.start.character, n = e.end.line < t.end.line || e.end.line === t.end.line && e.end.character <= t.end.character;
  return r && n ? jt.Inside : r ? jt.OverlapBack : n ? jt.OverlapFront : jt.Outside;
}
i(gm, "compareRange");
function vm(e, t) {
  return gm(e, t) > jt.After;
}
i(vm, "inRange");
var eA = /^[\w\p{L}]$/u;
function Tm(e, t) {
  if (e) {
    const r = $m(e, !0);
    if (r && pu(r, t))
      return r;
    if (Tc(e)) {
      const n = e.content.findIndex((a) => !a.hidden);
      for (let a = n - 1; a >= 0; a--) {
        const s = e.content[a];
        if (pu(s, t))
          return s;
      }
    }
  }
}
i(Tm, "findCommentNode");
function pu(e, t) {
  return vc(e) && t.includes(e.tokenType.name);
}
i(pu, "isCommentNode");
function $m(e, t = !0) {
  for (; e.container; ) {
    const r = e.container;
    let n = r.content.indexOf(e);
    for (; n > 0; ) {
      n--;
      const a = r.content[n];
      if (t || !a.hidden)
        return a;
    }
    e = r;
  }
}
i($m, "getPreviousNode");
var Rm = class extends Error {
  static {
    i(this, "ErrorWithLocation");
  }
  constructor(e, t) {
    const r = typeof t == "string" ? t : t();
    super(e ? `${r} at ${e.range.start.line}:${e.range.start.character}` : r);
  }
};
function Bn(e, t = "Error: Got unexpected value.") {
  throw new Error(typeof t == "string" ? t : t());
}
i(Bn, "assertUnreachable");
function B(e) {
  return e.charCodeAt(0);
}
i(B, "cc");
function us(e, t) {
  Array.isArray(e) ? e.forEach(function(r) {
    t.push(r);
  }) : t.push(e);
}
i(us, "insertToSet");
function $n(e, t) {
  if (e[t] === !0)
    throw "duplicate flag " + t;
  e[t], e[t] = !0;
}
i($n, "addFlag");
function br(e) {
  if (e === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
i(br, "ASSERT_EXISTS");
function Am() {
  throw Error("Internal Error - Should never get here!");
}
i(Am, "ASSERT_NEVER_REACH_HERE");
function du(e) {
  return e.type === "Character";
}
i(du, "isCharacter");
var Is = [];
for (let e = B("0"); e <= B("9"); e++)
  Is.push(e);
var Ns = [B("_")].concat(Is);
for (let e = B("a"); e <= B("z"); e++)
  Ns.push(e);
for (let e = B("A"); e <= B("Z"); e++)
  Ns.push(e);
var Gf = [
  B(" "),
  B("\f"),
  B(`
`),
  B("\r"),
  B("	"),
  B("\v"),
  B("	"),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B(" "),
  B("\u2028"),
  B("\u2029"),
  B(" "),
  B(" "),
  B("　"),
  B("\uFEFF")
], tA = /[0-9a-fA-F]/, ki = /[0-9]/, rA = /[1-9]/, Em = class {
  static {
    i(this, "RegExpParser");
  }
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    const t = this.disjunction();
    this.consumeChar("/");
    const r = {
      type: "Flags",
      loc: { begin: this.idx, end: e.length },
      global: !1,
      ignoreCase: !1,
      multiLine: !1,
      unicode: !1,
      sticky: !1
    };
    for (; this.isRegExpFlag(); )
      switch (this.popChar()) {
        case "g":
          $n(r, "global");
          break;
        case "i":
          $n(r, "ignoreCase");
          break;
        case "m":
          $n(r, "multiLine");
          break;
        case "u":
          $n(r, "unicode");
          break;
        case "y":
          $n(r, "sticky");
          break;
      }
    if (this.idx !== this.input.length)
      throw Error("Redundant input: " + this.input.substring(this.idx));
    return {
      type: "Pattern",
      flags: r,
      value: t,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const e = [], t = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; )
      this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(t) };
  }
  alternative() {
    const e = [], t = this.idx;
    for (; this.isTerm(); )
      e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(t) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    const e = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(e)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      // '\b' or '\B'
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(e)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(e)
            };
        }
        throw Error("Invalid Assertion Escape");
      // '(?=' or '(?!'
      case "(":
        this.consumeChar("?");
        let t;
        switch (this.popChar()) {
          case "=":
            t = "Lookahead";
            break;
          case "!":
            t = "NegativeLookahead";
            break;
          case "<": {
            switch (this.popChar()) {
              case "=":
                t = "Lookbehind";
                break;
              case "!":
                t = "NegativeLookbehind";
            }
            break;
          }
        }
        br(t);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: t,
          value: r,
          loc: this.loc(e)
        };
    }
    return Am();
  }
  quantifier(e = !1) {
    let t;
    const r = this.idx;
    switch (this.popChar()) {
      case "*":
        t = {
          atLeast: 0,
          atMost: 1 / 0
        };
        break;
      case "+":
        t = {
          atLeast: 1,
          atMost: 1 / 0
        };
        break;
      case "?":
        t = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const n = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            t = {
              atLeast: n,
              atMost: n
            };
            break;
          case ",":
            let a;
            this.isDigit() ? (a = this.integerIncludingZero(), t = {
              atLeast: n,
              atMost: a
            }) : t = {
              atLeast: n,
              atMost: 1 / 0
            }, this.consumeChar("}");
            break;
        }
        if (e === !0 && t === void 0)
          return;
        br(t);
        break;
    }
    if (!(e === !0 && t === void 0) && br(t))
      return this.peekChar(0) === "?" ? (this.consumeChar("?"), t.greedy = !1) : t.greedy = !0, t.type = "Quantifier", t.loc = this.loc(r), t;
  }
  atom() {
    let e;
    const t = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), br(e))
      return e.loc = this.loc(t), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
  }
  dotAll() {
    return this.consumeChar("."), {
      type: "Set",
      complement: !0,
      value: [B(`
`), B("\r"), B("\u2028"), B("\u2029")]
    };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, t = !1;
    switch (this.popChar()) {
      case "d":
        e = Is;
        break;
      case "D":
        e = Is, t = !0;
        break;
      case "s":
        e = Gf;
        break;
      case "S":
        e = Gf, t = !0;
        break;
      case "w":
        e = Ns;
        break;
      case "W":
        e = Ns, t = !0;
        break;
    }
    if (br(e))
      return { type: "Set", value: e, complement: t };
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = B("\f");
        break;
      case "n":
        e = B(`
`);
        break;
      case "r":
        e = B("\r");
        break;
      case "t":
        e = B("	");
        break;
      case "v":
        e = B("\v");
        break;
    }
    if (br(e))
      return { type: "Character", value: e };
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const e = this.popChar();
    if (/[a-zA-Z]/.test(e) === !1)
      throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: B("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const e = this.popChar();
    return { type: "Character", value: B(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case "]":
        throw Error("TBD");
      default:
        const e = this.popChar();
        return { type: "Character", value: B(e) };
    }
  }
  characterClass() {
    const e = [];
    let t = !1;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), t = !0); this.isClassAtom(); ) {
      const r = this.classAtom();
      if (r.type, du(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const n = this.classAtom();
        if (n.type, du(n)) {
          if (n.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: n.value });
        } else
          us(r.value, e), e.push(B("-")), us(n.value, e);
      } else
        us(r.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: t, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      // istanbul ignore next
      case "]":
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      // Matches a backspace.
      // (Not to be confused with \b word boundary outside characterClass)
      case "b":
        return this.consumeChar("b"), { type: "Character", value: B("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = !0;
    this.consumeChar("("), this.peekChar(0) === "?" ? (this.consumeChar("?"), this.consumeChar(":"), e = !1) : this.groupIdx++;
    const t = this.disjunction();
    this.consumeChar(")");
    const r = {
      type: "Group",
      capturing: e,
      value: t
    };
    return e && (r.idx = this.groupIdx), r;
  }
  positiveInteger() {
    let e = this.popChar();
    if (rA.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; ki.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (ki.test(e) === !1)
      throw Error("Expecting an integer");
    for (; ki.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    const e = this.popChar();
    switch (e) {
      // istanbul ignore next
      case `
`:
      // istanbul ignore next
      case "\r":
      // istanbul ignore next
      case "\u2028":
      // istanbul ignore next
      case "\u2029":
      // istanbul ignore next
      case "^":
      // istanbul ignore next
      case "$":
      // istanbul ignore next
      case "\\":
      // istanbul ignore next
      case ".":
      // istanbul ignore next
      case "*":
      // istanbul ignore next
      case "+":
      // istanbul ignore next
      case "?":
      // istanbul ignore next
      case "(":
      // istanbul ignore next
      case ")":
      // istanbul ignore next
      case "[":
      // istanbul ignore next
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: B(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return !0;
      default:
        return !1;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return ki.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter())
      return !0;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      // atomEscape
      case "[":
      // characterClass
      // TODO: isAtom must be called before isAssertion - disambiguate
      case "(":
        return !0;
      default:
        return !1;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return !0;
      // '\b' or '\B'
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return !0;
          default:
            return !1;
        }
      // '(?=' or '(?!' or `(?<=` or `(?<!`
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
      default:
        return !1;
    }
  }
  isQuantifier() {
    const e = this.saveState();
    try {
      return this.quantifier(!0) !== void 0;
    } catch {
      return !1;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  parseHexDigits(e) {
    let t = "";
    for (let n = 0; n < e; n++) {
      const a = this.popChar();
      if (tA.test(a) === !1)
        throw Error("Expecting a HexDecimal digits");
      t += a;
    }
    return { type: "Character", value: parseInt(t, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    const e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e)
      throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length)
      throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}, Xs = class {
  static {
    i(this, "BaseRegExpVisitor");
  }
  visitChildren(e) {
    for (const t in e) {
      const r = e[t];
      e.hasOwnProperty(t) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((n) => {
        this.visit(n);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Lookbehind":
        this.visitLookbehind(e);
        break;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  // Assertion
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  visitLookbehind(e) {
  }
  visitNegativeLookbehind(e) {
  }
  // atoms
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}, nA = /\r?\n/gm, aA = new Em(), iA = class extends Xs {
  static {
    i(this, "TerminalRegExpVisitor");
  }
  constructor() {
    super(...arguments), this.isStarting = !0, this.endRegexpStack = [], this.multiline = !1;
  }
  get endRegex() {
    return this.endRegexpStack.join("");
  }
  reset(e) {
    this.multiline = !1, this.regex = e, this.startRegexp = "", this.isStarting = !0, this.endRegexpStack = [];
  }
  visitGroup(e) {
    e.quantifier && (this.isStarting = !1, this.endRegexpStack = []);
  }
  visitCharacter(e) {
    const t = String.fromCharCode(e.value);
    if (!this.multiline && t === `
` && (this.multiline = !0), e.quantifier)
      this.isStarting = !1, this.endRegexpStack = [];
    else {
      const r = Ai(t);
      this.endRegexpStack.push(r), this.isStarting && (this.startRegexp += r);
    }
  }
  visitSet(e) {
    if (!this.multiline) {
      const t = this.regex.substring(e.loc.begin, e.loc.end), r = new RegExp(t);
      this.multiline = !!`
`.match(r);
    }
    if (e.quantifier)
      this.isStarting = !1, this.endRegexpStack = [];
    else {
      const t = this.regex.substring(e.loc.begin, e.loc.end);
      this.endRegexpStack.push(t), this.isStarting && (this.startRegexp += t);
    }
  }
  visitChildren(e) {
    e.type === "Group" && e.quantifier || super.visitChildren(e);
  }
}, wo = new iA();
function Cm(e) {
  try {
    return typeof e == "string" && (e = new RegExp(e)), e = e.toString(), wo.reset(e), wo.visit(aA.pattern(e)), wo.multiline;
  } catch {
    return !1;
  }
}
i(Cm, "isMultilineComment");
var sA = `\f
\r	\v              \u2028\u2029  　\uFEFF`.split("");
function bc(e) {
  const t = typeof e == "string" ? new RegExp(e) : e;
  return sA.some((r) => t.test(r));
}
i(bc, "isWhitespace");
function Ai(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
i(Ai, "escapeRegExp");
function bm(e, t) {
  const r = _m(e), n = t.match(r);
  return !!n && n[0].length > 0;
}
i(bm, "partialMatches");
function _m(e) {
  typeof e == "string" && (e = new RegExp(e));
  const t = e, r = e.source;
  let n = 0;
  function a() {
    let s = "", o;
    function l(c) {
      s += r.substr(n, c), n += c;
    }
    i(l, "appendRaw");
    function u(c) {
      s += "(?:" + r.substr(n, c) + "|$)", n += c;
    }
    for (i(u, "appendOptional"); n < r.length; )
      switch (r[n]) {
        case "\\":
          switch (r[n + 1]) {
            case "c":
              u(3);
              break;
            case "x":
              u(4);
              break;
            case "u":
              t.unicode ? r[n + 2] === "{" ? u(r.indexOf("}", n) - n + 1) : u(6) : u(2);
              break;
            case "p":
            case "P":
              t.unicode ? u(r.indexOf("}", n) - n + 1) : u(2);
              break;
            case "k":
              u(r.indexOf(">", n) - n + 1);
              break;
            default:
              u(2);
              break;
          }
          break;
        case "[":
          o = /\[(?:\\.|.)*?\]/g, o.lastIndex = n, o = o.exec(r) || [], u(o[0].length);
          break;
        case "|":
        case "^":
        case "$":
        case "*":
        case "+":
        case "?":
          l(1);
          break;
        case "{":
          o = /\{\d+,?\d*\}/g, o.lastIndex = n, o = o.exec(r), o ? l(o[0].length) : u(1);
          break;
        case "(":
          if (r[n + 1] === "?")
            switch (r[n + 2]) {
              case ":":
                s += "(?:", n += 3, s += a() + "|$)";
                break;
              case "=":
                s += "(?=", n += 3, s += a() + ")";
                break;
              case "!":
                o = n, n += 3, a(), s += r.substr(o, n - o);
                break;
              case "<":
                switch (r[n + 3]) {
                  case "=":
                  case "!":
                    o = n, n += 4, a(), s += r.substr(o, n - o);
                    break;
                  default:
                    l(r.indexOf(">", n) - n + 1), s += a() + "|$)";
                    break;
                }
                break;
            }
          else
            l(1), s += a() + "|$)";
          break;
        case ")":
          return ++n, s;
        default:
          u(1);
          break;
      }
    return s;
  }
  return i(a, "process"), new RegExp(a(), e.flags);
}
i(_m, "partialRegExp");
function Sm(e) {
  return e.rules.find((t) => bt(t) && t.entry);
}
i(Sm, "getEntryRule");
function wm(e) {
  return e.rules.filter((t) => _t(t) && t.hidden);
}
i(wm, "getHiddenRules");
function _c(e, t) {
  const r = /* @__PURE__ */ new Set(), n = Sm(e);
  if (!n)
    return new Set(e.rules);
  const a = [n].concat(wm(e));
  for (const o of a)
    Sc(o, r, t);
  const s = /* @__PURE__ */ new Set();
  for (const o of e.rules)
    (r.has(o.name) || _t(o) && o.hidden) && s.add(o);
  return s;
}
i(_c, "getAllReachableRules");
function Sc(e, t, r) {
  t.add(e.name), zn(e).forEach((n) => {
    if (nr(n) || r && Ec(n)) {
      const a = n.rule.ref;
      a && !t.has(a.name) && Sc(a, t, r);
    }
  });
}
i(Sc, "ruleDfs");
function Pm(e) {
  if (e.terminal)
    return e.terminal;
  if (e.type.ref)
    return Pc(e.type.ref)?.terminal;
}
i(Pm, "getCrossReferenceTerminal");
function km(e) {
  return e.hidden && !bc(Zs(e));
}
i(km, "isCommentTerminal");
function Im(e, t) {
  return !e || !t ? [] : Js(e, t, e.astNode, !0);
}
i(Im, "findNodesForProperty");
function wc(e, t, r) {
  if (!e || !t)
    return;
  const n = Js(e, t, e.astNode, !0);
  if (n.length !== 0)
    return r !== void 0 ? r = Math.max(0, Math.min(r, n.length - 1)) : r = 0, n[r];
}
i(wc, "findNodeForProperty");
function Js(e, t, r, n) {
  if (!n) {
    const a = Ti(e.grammarSource, tr);
    if (a && a.feature === t)
      return [e];
  }
  return Dn(e) && e.astNode === r ? e.content.flatMap((a) => Js(a, t, r, !1)) : [];
}
i(Js, "findNodesForPropertyInternal");
function Nm(e, t, r) {
  if (!e)
    return;
  const n = Om(e, t, e?.astNode);
  if (n.length !== 0)
    return r !== void 0 ? r = Math.max(0, Math.min(r, n.length - 1)) : r = 0, n[r];
}
i(Nm, "findNodeForKeyword");
function Om(e, t, r) {
  if (e.astNode !== r)
    return [];
  if (rr(e.grammarSource) && e.grammarSource.value === t)
    return [e];
  const n = Ps(e).iterator();
  let a;
  const s = [];
  do
    if (a = n.next(), !a.done) {
      const o = a.value;
      o.astNode === r ? rr(o.grammarSource) && o.grammarSource.value === t && s.push(o) : n.prune();
    }
  while (!a.done);
  return s;
}
i(Om, "findNodesForKeywordInternal");
function Mm(e) {
  const t = e.astNode;
  for (; t === e.container?.astNode; ) {
    const r = Ti(e.grammarSource, tr);
    if (r)
      return r;
    e = e.container;
  }
}
i(Mm, "findAssignment");
function Pc(e) {
  let t = e;
  return Ac(t) && ($i(t.$container) ? t = t.$container.$container : Un(t.$container) ? t = t.$container : Bn(t.$container)), kc(e, t, /* @__PURE__ */ new Map());
}
i(Pc, "findNameAssignment");
function kc(e, t, r) {
  function n(a, s) {
    let o;
    return Ti(a, tr) || (o = kc(s, s, r)), r.set(e, o), o;
  }
  if (i(n, "go"), r.has(e))
    return r.get(e);
  r.set(e, void 0);
  for (const a of zn(t)) {
    if (tr(a) && a.feature.toLowerCase() === "name")
      return r.set(e, a), a;
    if (nr(a) && bt(a.rule.ref))
      return n(a, a.rule.ref);
    if (lm(a) && a.typeRef?.ref)
      return n(a, a.typeRef.ref);
  }
}
i(kc, "findNameAssignmentInternal");
function Ic(e) {
  return Nc(e, /* @__PURE__ */ new Set());
}
i(Ic, "isDataTypeRule");
function Nc(e, t) {
  if (t.has(e))
    return !0;
  t.add(e);
  for (const r of zn(e))
    if (nr(r)) {
      if (!r.rule.ref || bt(r.rule.ref) && !Nc(r.rule.ref, t) || ni(r.rule.ref))
        return !1;
    } else {
      if (tr(r))
        return !1;
      if ($i(r))
        return !1;
    }
  return !!e.definition;
}
i(Nc, "isDataTypeRuleInternal");
function Oc(e) {
  if (!_t(e)) {
    if (e.inferredType)
      return e.inferredType.name;
    if (e.dataType)
      return e.dataType;
    if (e.returnType) {
      const t = e.returnType.ref;
      if (t)
        return t.name;
    }
  }
}
i(Oc, "getExplicitRuleType");
function xn(e) {
  if (Un(e))
    return bt(e) && Ic(e) ? e.name : Oc(e) ?? e.name;
  if (rm(e) || fm(e) || om(e))
    return e.name;
  if ($i(e)) {
    const t = Lm(e);
    if (t)
      return t;
  } else if (Ac(e))
    return e.name;
  throw new Error("Cannot get name of Unknown Type");
}
i(xn, "getTypeName");
function Lm(e) {
  if (e.inferredType)
    return e.inferredType.name;
  if (e.type?.ref)
    return xn(e.type.ref);
}
i(Lm, "getActionType");
function Dm(e) {
  return _t(e) ? e.type?.name ?? "string" : Oc(e) ?? e.name;
}
i(Dm, "getRuleType");
function Zs(e) {
  const t = {
    s: !1,
    i: !1,
    u: !1
  }, r = Dr(e.definition, t), n = Object.entries(t).filter(([, a]) => a).map(([a]) => a).join("");
  return new RegExp(r, n);
}
i(Zs, "terminalRegex");
var Mc = /[\s\S]/.source;
function Dr(e, t) {
  if (um(e))
    return xm(e);
  if (cm(e))
    return Gm(e);
  if (Zd(e))
    return zm(e);
  if (Ec(e)) {
    const r = e.rule.ref;
    if (!r)
      throw new Error("Missing rule reference.");
    return Et(Dr(r.definition), {
      cardinality: e.cardinality,
      lookahead: e.lookahead,
      parenthesized: e.parenthesized
    });
  } else {
    if (nm(e))
      return jm(e);
    if (pm(e))
      return Fm(e);
    if (sm(e)) {
      const r = e.regex.lastIndexOf("/"), n = e.regex.substring(1, r), a = e.regex.substring(r + 1);
      return t && (t.i = a.includes("i"), t.s = a.includes("s"), t.u = a.includes("u")), Et(n, {
        cardinality: e.cardinality,
        lookahead: e.lookahead,
        parenthesized: e.parenthesized,
        wrap: !1
      });
    } else {
      if (dm(e))
        return Et(Mc, {
          cardinality: e.cardinality,
          lookahead: e.lookahead,
          parenthesized: e.parenthesized
        });
      throw new Error(`Invalid terminal element: ${e?.$type}, ${e?.$cstNode?.text}`);
    }
  }
}
i(Dr, "abstractElementToRegex");
function xm(e) {
  return Et(e.elements.map((t) => Dr(t)).join("|"), {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized,
    wrap: !1
    // wrapping is not required for top level alternatives, and nested alternatives are already parenthesized according to the grammar
  });
}
i(xm, "terminalAlternativesToRegex");
function Gm(e) {
  return Et(e.elements.map((t) => Dr(t)).join(""), {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized,
    wrap: !1
    // wrapping is not required for top level group, and nested group are already parenthesized according to the grammar
  });
}
i(Gm, "terminalGroupToRegex");
function Fm(e) {
  return Et(`${Mc}*?${Dr(e.terminal)}`, {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized
  });
}
i(Fm, "untilTokenToRegex");
function jm(e) {
  return Et(`(?!${Dr(e.terminal)})${Mc}*?`, {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized
  });
}
i(jm, "negateTokenToRegex");
function zm(e) {
  return e.right ? Et(`[${cs(e.left)}-${cs(e.right)}]`, {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized,
    wrap: !1
  }) : Et(cs(e.left), {
    cardinality: e.cardinality,
    lookahead: e.lookahead,
    parenthesized: e.parenthesized,
    wrap: !1
  });
}
i(zm, "characterRangeToRegex");
function cs(e) {
  return Ai(e.value);
}
i(cs, "keywordToRegex");
function Et(e, t) {
  return (t.parenthesized || t.lookahead || t.wrap !== !1) && (e = `(${t.lookahead ?? (t.parenthesized ? "" : "?:")}${e})`), t.cardinality ? `${e}${t.cardinality}` : e;
}
i(Et, "withCardinality");
function Um(e) {
  const t = [], r = e.Grammar;
  for (const n of r.rules)
    _t(n) && km(n) && Cm(Zs(n)) && t.push(n.name);
  return {
    multilineCommentRules: t,
    nameRegexp: eA
  };
}
i(Um, "createGrammarConfig");
function Os(e) {
  console && console.error && console.error(`Error: ${e}`);
}
i(Os, "PRINT_ERROR");
function Lc(e) {
  console && console.warn && console.warn(`Warning: ${e}`);
}
i(Lc, "PRINT_WARNING");
function Dc(e) {
  const t = (/* @__PURE__ */ new Date()).getTime(), r = e();
  return { time: (/* @__PURE__ */ new Date()).getTime() - t, value: r };
}
i(Dc, "timer");
function xc(e) {
  function t() {
  }
  i(t, "FakeConstructor"), t.prototype = e;
  const r = new t();
  function n() {
    return typeof r.bar;
  }
  return i(n, "fakeAccess"), n(), n(), e;
}
i(xc, "toFastProperties");
function Bm(e) {
  return Vm(e) ? e.LABEL : e.name;
}
i(Bm, "tokenLabel");
function Vm(e) {
  return typeof e.LABEL == "string" && e.LABEL !== "";
}
i(Vm, "hasTokenLabel");
var St = class {
  static {
    i(this, "AbstractProduction");
  }
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), this.definition.forEach((t) => {
      t.accept(e);
    });
  }
}, Ge = class extends St {
  static {
    i(this, "NonTerminal");
  }
  constructor(e) {
    super([]), this.idx = 1, Object.assign(this, pt(e));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}, Vn = class extends St {
  static {
    i(this, "Rule");
  }
  constructor(e) {
    super(e.definition), this.orgText = "", Object.assign(this, pt(e));
  }
}, Ve = class extends St {
  static {
    i(this, "Alternative");
  }
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, Object.assign(this, pt(e));
  }
}, Ie = class extends St {
  static {
    i(this, "Option");
  }
  constructor(e) {
    super(e.definition), this.idx = 1, Object.assign(this, pt(e));
  }
}, Je = class extends St {
  static {
    i(this, "RepetitionMandatory");
  }
  constructor(e) {
    super(e.definition), this.idx = 1, Object.assign(this, pt(e));
  }
}, Ze = class extends St {
  static {
    i(this, "RepetitionMandatoryWithSeparator");
  }
  constructor(e) {
    super(e.definition), this.idx = 1, Object.assign(this, pt(e));
  }
}, Te = class extends St {
  static {
    i(this, "Repetition");
  }
  constructor(e) {
    super(e.definition), this.idx = 1, Object.assign(this, pt(e));
  }
}, Ke = class extends St {
  static {
    i(this, "RepetitionWithSeparator");
  }
  constructor(e) {
    super(e.definition), this.idx = 1, Object.assign(this, pt(e));
  }
}, We = class extends St {
  static {
    i(this, "Alternation");
  }
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, Object.assign(this, pt(e));
  }
}, ue = class {
  static {
    i(this, "Terminal");
  }
  constructor(e) {
    this.idx = 1, Object.assign(this, pt(e));
  }
  accept(e) {
    e.visit(this);
  }
};
function Km(e) {
  return e.map(Ja);
}
i(Km, "serializeGrammar");
function Ja(e) {
  function t(r) {
    return r.map(Ja);
  }
  if (i(t, "convertDefinition"), e instanceof Ge) {
    const r = {
      type: "NonTerminal",
      name: e.nonTerminalName,
      idx: e.idx
    };
    return typeof e.label == "string" && (r.label = e.label), r;
  } else {
    if (e instanceof Ve)
      return {
        type: "Alternative",
        definition: t(e.definition)
      };
    if (e instanceof Ie)
      return {
        type: "Option",
        idx: e.idx,
        definition: t(e.definition)
      };
    if (e instanceof Je)
      return {
        type: "RepetitionMandatory",
        idx: e.idx,
        definition: t(e.definition)
      };
    if (e instanceof Ze)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: e.idx,
        separator: Ja(new ue({ terminalType: e.separator })),
        definition: t(e.definition)
      };
    if (e instanceof Ke)
      return {
        type: "RepetitionWithSeparator",
        idx: e.idx,
        separator: Ja(new ue({ terminalType: e.separator })),
        definition: t(e.definition)
      };
    if (e instanceof Te)
      return {
        type: "Repetition",
        idx: e.idx,
        definition: t(e.definition)
      };
    if (e instanceof We)
      return {
        type: "Alternation",
        idx: e.idx,
        definition: t(e.definition)
      };
    if (e instanceof ue) {
      const r = {
        type: "Terminal",
        name: e.terminalType.name,
        label: Bm(e.terminalType),
        idx: e.idx
      };
      typeof e.label == "string" && (r.terminalLabel = e.label);
      const n = e.terminalType.PATTERN;
      return e.terminalType.PATTERN && (r.pattern = n instanceof RegExp ? n.source : n), r;
    } else {
      if (e instanceof Vn)
        return {
          type: "Rule",
          name: e.name,
          orgText: e.orgText,
          definition: t(e.definition)
        };
      throw Error("non exhaustive match");
    }
  }
}
i(Ja, "serializeProduction");
function pt(e) {
  return Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0));
}
i(pt, "pickOnlyDefined");
var Kn = class {
  static {
    i(this, "GAstVisitor");
  }
  visit(e) {
    const t = e;
    switch (t.constructor) {
      case Ge:
        return this.visitNonTerminal(t);
      case Ve:
        return this.visitAlternative(t);
      case Ie:
        return this.visitOption(t);
      case Je:
        return this.visitRepetitionMandatory(t);
      case Ze:
        return this.visitRepetitionMandatoryWithSeparator(t);
      case Ke:
        return this.visitRepetitionWithSeparator(t);
      case Te:
        return this.visitRepetition(t);
      case We:
        return this.visitAlternation(t);
      case ue:
        return this.visitTerminal(t);
      case Vn:
        return this.visitRule(t);
      /* c8 ignore next 2 */
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(e) {
  }
  /* c8 ignore next */
  visitAlternative(e) {
  }
  /* c8 ignore next */
  visitOption(e) {
  }
  /* c8 ignore next */
  visitRepetition(e) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(e) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(e) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(e) {
  }
  /* c8 ignore next */
  visitAlternation(e) {
  }
  /* c8 ignore next */
  visitTerminal(e) {
  }
  /* c8 ignore next */
  visitRule(e) {
  }
};
function Wm(e) {
  return e instanceof Ve || e instanceof Ie || e instanceof Te || e instanceof Je || e instanceof Ze || e instanceof Ke || e instanceof ue || e instanceof Vn;
}
i(Wm, "isSequenceProd");
function ii(e, t = []) {
  return e instanceof Ie || e instanceof Te || e instanceof Ke ? !0 : e instanceof We ? e.definition.some((n) => ii(n, t)) : e instanceof Ge && t.includes(e) ? !1 : e instanceof St ? (e instanceof Ge && t.push(e), e.definition.every((n) => ii(n, t))) : !1;
}
i(ii, "isOptionalProd");
function qm(e) {
  return e instanceof We;
}
i(qm, "isBranchingProd");
function ut(e) {
  if (e instanceof Ge)
    return "SUBRULE";
  if (e instanceof Ie)
    return "OPTION";
  if (e instanceof We)
    return "OR";
  if (e instanceof Je)
    return "AT_LEAST_ONE";
  if (e instanceof Ze)
    return "AT_LEAST_ONE_SEP";
  if (e instanceof Ke)
    return "MANY_SEP";
  if (e instanceof Te)
    return "MANY";
  if (e instanceof ue)
    return "CONSUME";
  throw Error("non exhaustive match");
}
i(ut, "getProductionDslName");
var Qs = class {
  static {
    i(this, "RestWalker");
  }
  walk(e, t = []) {
    e.definition.forEach((r, n) => {
      const a = e.definition.slice(n + 1);
      if (r instanceof Ge)
        this.walkProdRef(r, a, t);
      else if (r instanceof ue)
        this.walkTerminal(r, a, t);
      else if (r instanceof Ve)
        this.walkFlat(r, a, t);
      else if (r instanceof Ie)
        this.walkOption(r, a, t);
      else if (r instanceof Je)
        this.walkAtLeastOne(r, a, t);
      else if (r instanceof Ze)
        this.walkAtLeastOneSep(r, a, t);
      else if (r instanceof Ke)
        this.walkManySep(r, a, t);
      else if (r instanceof Te)
        this.walkMany(r, a, t);
      else if (r instanceof We)
        this.walkOr(r, a, t);
      else
        throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
  }
  walkFlat(e, t, r) {
    const n = t.concat(r);
    this.walk(e, n);
  }
  walkOption(e, t, r) {
    const n = t.concat(r);
    this.walk(e, n);
  }
  walkAtLeastOne(e, t, r) {
    const n = [
      new Ie({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, n);
  }
  walkAtLeastOneSep(e, t, r) {
    const n = mu(e, t, r);
    this.walk(e, n);
  }
  walkMany(e, t, r) {
    const n = [
      new Ie({ definition: e.definition })
    ].concat(t, r);
    this.walk(e, n);
  }
  walkManySep(e, t, r) {
    const n = mu(e, t, r);
    this.walk(e, n);
  }
  walkOr(e, t, r) {
    const n = t.concat(r);
    e.definition.forEach((a) => {
      const s = new Ve({ definition: [a] });
      this.walk(s, n);
    });
  }
};
function mu(e, t, r) {
  return [
    new Ie({
      definition: [
        new ue({ terminalType: e.separator })
      ].concat(e.definition)
    })
  ].concat(t, r);
}
i(mu, "restForRepetitionWithSeparator");
function Wn(e) {
  if (e instanceof Ge)
    return Wn(e.referencedRule);
  if (e instanceof ue)
    return Xm(e);
  if (Wm(e))
    return Hm(e);
  if (qm(e))
    return Ym(e);
  throw Error("non exhaustive match");
}
i(Wn, "first");
function Hm(e) {
  let t = [];
  const r = e.definition;
  let n = 0, a = r.length > n, s, o = !0;
  for (; a && o; )
    s = r[n], o = ii(s), t = t.concat(Wn(s)), n = n + 1, a = r.length > n;
  return [...new Set(t)];
}
i(Hm, "firstForSequence");
function Ym(e) {
  const t = e.definition.map((r) => Wn(r));
  return [...new Set(t.flat())];
}
i(Ym, "firstForBranching");
function Xm(e) {
  return [e.terminalType];
}
i(Xm, "firstForTerminal");
var Jm = "_~IN~_", oA = class extends Qs {
  static {
    i(this, "ResyncFollowsWalker");
  }
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, t, r) {
  }
  walkProdRef(e, t, r) {
    const n = Qm(e.referencedRule, e.idx) + this.topProd.name, a = t.concat(r), s = new Ve({ definition: a }), o = Wn(s);
    this.follows[n] = o;
  }
};
function Zm(e) {
  const t = {};
  return e.forEach((r) => {
    const n = new oA(r).startWalking();
    Object.assign(t, n);
  }), t;
}
i(Zm, "computeAllProdsFollows");
function Qm(e, t) {
  return e.name + t + Jm;
}
i(Qm, "buildBetweenProdsFollowPrefix");
var fs = {}, lA = new Em();
function qn(e) {
  const t = e.toString();
  if (fs.hasOwnProperty(t))
    return fs[t];
  {
    const r = lA.pattern(t);
    return fs[t] = r, r;
  }
}
i(qn, "getRegExpAst");
function eh() {
  fs = {};
}
i(eh, "clearRegExpParserCache");
var th = "Complement Sets are not supported for first char optimization", Ms = `Unable to use "first char" lexer optimizations:
`;
function rh(e, t = !1) {
  try {
    const r = qn(e);
    return Ls(r.value, {}, r.flags.ignoreCase);
  } catch (r) {
    if (r.message === th)
      t && Lc(`${Ms}	Unable to optimize: < ${e.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let n = "";
      t && (n = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), Os(`${Ms}
	Failed parsing: < ${e.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + n);
    }
  }
  return [];
}
i(rh, "getOptimizedStartCodesIndices");
function Ls(e, t, r) {
  switch (e.type) {
    case "Disjunction":
      for (let a = 0; a < e.value.length; a++)
        Ls(e.value[a], t, r);
      break;
    case "Alternative":
      const n = e.value;
      for (let a = 0; a < n.length; a++) {
        const s = n[a];
        switch (s.type) {
          case "EndAnchor":
          // A group back reference cannot affect potential starting char.
          // because if a back reference is the first production than automatically
          // the group being referenced has had to come BEFORE so its codes have already been added
          case "GroupBackReference":
          // assertions do not affect potential starting codes
          case "Lookahead":
          case "NegativeLookahead":
          case "Lookbehind":
          case "NegativeLookbehind":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const o = s;
        switch (o.type) {
          case "Character":
            Va(o.value, t, r);
            break;
          case "Set":
            if (o.complement === !0)
              throw Error(th);
            o.value.forEach((u) => {
              if (typeof u == "number")
                Va(u, t, r);
              else {
                const c = u;
                if (r === !0)
                  for (let p = c.from; p <= c.to; p++)
                    Va(p, t, r);
                else {
                  for (let p = c.from; p <= c.to && p < Wa; p++)
                    Va(p, t, r);
                  if (c.to >= Wa) {
                    const p = c.from >= Wa ? c.from : Wa, h = c.to, y = Bt(p), d = Bt(h);
                    for (let A = y; A <= d; A++)
                      t[A] = A;
                  }
                }
              }
            });
            break;
          case "Group":
            Ls(o.value, t, r);
            break;
          /* istanbul ignore next */
          default:
            throw Error("Non Exhaustive Match");
        }
        const l = o.quantifier !== void 0 && o.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          o.type === "Group" && Ds(o) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
          o.type !== "Group" && l === !1
        )
          break;
      }
      break;
    /* istanbul ignore next */
    default:
      throw Error("non exhaustive match!");
  }
  return Object.values(t);
}
i(Ls, "firstCharOptimizedIndices");
function Va(e, t, r) {
  const n = Bt(e);
  t[n] = n, r === !0 && nh(e, t);
}
i(Va, "addOptimizedIdxToResult");
function nh(e, t) {
  const r = String.fromCharCode(e), n = r.toUpperCase();
  if (n !== r) {
    const a = Bt(n.charCodeAt(0));
    t[a] = a;
  } else {
    const a = r.toLowerCase();
    if (a !== r) {
      const s = Bt(a.charCodeAt(0));
      t[s] = s;
    }
  }
}
i(nh, "handleIgnoreCase");
function hu(e, t) {
  return e.value.find((r) => {
    if (typeof r == "number")
      return t.includes(r);
    {
      const n = r;
      return t.find((a) => n.from <= a && a <= n.to) !== void 0;
    }
  });
}
i(hu, "findCode");
function Ds(e) {
  const t = e.quantifier;
  return t && t.atLeast === 0 ? !0 : e.value ? Array.isArray(e.value) ? e.value.every(Ds) : Ds(e.value) : !1;
}
i(Ds, "isWholeOptional");
var uA = class extends Xs {
  static {
    i(this, "CharCodeFinder");
  }
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = !1;
  }
  visitChildren(e) {
    if (this.found !== !0) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
        case "Lookbehind":
          this.visitLookbehind(e);
          return;
        case "NegativeLookbehind":
          this.visitNegativeLookbehind(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    this.targetCharCodes.includes(e.value) && (this.found = !0);
  }
  visitSet(e) {
    e.complement ? hu(e, this.targetCharCodes) === void 0 && (this.found = !0) : hu(e, this.targetCharCodes) !== void 0 && (this.found = !0);
  }
};
function eo(e, t) {
  if (t instanceof RegExp) {
    const r = qn(t), n = new uA(e);
    return n.visit(r), n.found;
  } else {
    for (const r of t) {
      const n = r.charCodeAt(0);
      if (e.includes(n))
        return !0;
    }
    return !1;
  }
}
i(eo, "canMatchCharCode");
var Or = "PATTERN", Ka = "defaultMode", Ii = "modes", yu = 0, ps = 1, gu = 2, vu = 3;
function ah(e, t) {
  t = Object.assign({ safeMode: !1, positionTracking: "full", lineTerminatorCharacters: ["\r", `
`], tracer: /* @__PURE__ */ i((S, E) => E(), "tracer") }, t);
  const r = t.tracer;
  r("initCharCodeToOptimizedIndexMap", () => {
    bh();
  });
  let n;
  r("Reject Lexer.NA", () => {
    n = e.filter((S) => S[Or] !== Be.NA);
  });
  let a = !1, s;
  r("Transform Patterns", () => {
    a = !1, s = n.map((S) => {
      const E = S[Or];
      if (E instanceof RegExp) {
        const O = E.source;
        return O.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        O !== "^" && O !== "$" && O !== "." && !E.ignoreCase ? O : O.length === 2 && O[0] === "\\" && // not a meta character
        ![
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ].includes(O[1]) ? O[1] : Tu(E);
      } else {
        if (typeof E == "function")
          return a = !0, { exec: E };
        if (typeof E == "object")
          return a = !0, E;
        if (typeof E == "string") {
          if (E.length === 1)
            return E;
          {
            const O = E.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), M = new RegExp(O);
            return Tu(M);
          }
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  let o, l, u, c, p;
  r("misc mapping", () => {
    o = n.map((S) => S.tokenTypeIdx), l = n.map((S) => {
      const E = S.GROUP;
      if (E !== Be.SKIPPED) {
        if (typeof E == "string")
          return E;
        if (E === void 0)
          return !1;
        throw Error("non exhaustive match");
      }
    }), u = n.map((S) => {
      const E = S.LONGER_ALT;
      if (E)
        return Array.isArray(E) ? E.map((M) => n.indexOf(M)) : [n.indexOf(E)];
    }), c = n.map((S) => S.PUSH_MODE), p = n.map((S) => Object.hasOwn(S, "POP_MODE"));
  });
  let h;
  r("Line Terminator Handling", () => {
    const S = jc(t.lineTerminatorCharacters);
    h = n.map((E) => !1), t.positionTracking !== "onlyOffset" && (h = n.map((E) => Object.hasOwn(E, "LINE_BREAKS") ? !!E.LINE_BREAKS : Fc(E, S) === !1 && eo(S, E.PATTERN)));
  });
  let y, d, A, T;
  r("Misc Mapping #2", () => {
    y = n.map(Gc), d = s.map(Eh), A = n.reduce((S, E) => {
      const O = E.GROUP;
      return typeof O == "string" && O !== Be.SKIPPED && (S[O] = []), S;
    }, {}), T = s.map((S, E) => {
      const O = l[E] === void 0 && u[E] === void 0 ? ih(n[E].PATTERN) : void 0;
      return {
        pattern: s[E],
        asciiClass: O,
        longerAlt: u[E],
        canLineTerminator: h[E],
        matchType: O !== void 0 ? vu : d[E] !== !1 ? yu : y[E] ? ps : gu,
        short: d[E],
        group: l[E],
        push: c[E],
        pop: p[E],
        tokenTypeIdx: o[E],
        tokenType: n[E]
      };
    });
  });
  let v = !0, $ = [];
  return t.safeMode || r("First Char Optimization", () => {
    $ = n.reduce((S, E, O) => {
      if (typeof E.PATTERN == "string") {
        const M = E.PATTERN.charCodeAt(0), F = Bt(M);
        ds(S, F, T[O]);
      } else if (Array.isArray(E.START_CHARS_HINT)) {
        let M;
        E.START_CHARS_HINT.forEach((F) => {
          const U = typeof F == "string" ? F.charCodeAt(0) : F, J = Bt(U);
          M !== J && (M = J, ds(S, J, T[O]));
        });
      } else if (E.PATTERN instanceof RegExp)
        if (E.PATTERN.unicode)
          v = !1, t.ensureOptimizations && Os(`${Ms}	Unable to analyze < ${E.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const M = rh(E.PATTERN, t.ensureOptimizations);
          M.length === 0 && (v = !1), M.forEach((F) => {
            ds(S, F, T[O]);
          });
        }
      else
        t.ensureOptimizations && Os(`${Ms}	TokenType: <${E.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), v = !1;
      return S;
    }, []);
  }), {
    emptyGroups: A,
    patternIdxToConfig: T,
    charCodeToPatternIdxToConfig: $,
    hasCustom: a,
    canBeOptimized: v
  };
}
i(ah, "analyzeTokenTypes");
function ih(e) {
  var t, r;
  if (!(e instanceof RegExp) || e.flags !== "")
    return;
  let n;
  try {
    n = qn(e);
  } catch {
    return;
  }
  if (n.value.value.length !== 1 || n.value.value[0].value.length !== 1)
    return;
  let a = n.value.value[0].value[0], s;
  for (; a.type === "Group"; ) {
    if (a.capturing || a.quantifier !== void 0 && s !== void 0 || a.value.value.length !== 1 || a.value.value[0].value.length !== 1)
      return;
    s = (t = a.quantifier) !== null && t !== void 0 ? t : s, a = a.value.value[0].value[0];
  }
  if (a.type !== "Set" || a.complement || a.quantifier !== void 0 && s !== void 0 || (s = (r = a.quantifier) !== null && r !== void 0 ? r : s, s?.atLeast !== 1 || s.atMost !== 1 / 0 || !s.greedy))
    return;
  const o = new Uint8Array(128);
  for (const l of a.value) {
    const u = typeof l == "number" ? l : l.from, c = typeof l == "number" ? l : l.to;
    if (u < 0 || c >= o.length)
      return;
    o.fill(1, u, c + 1);
  }
  return o;
}
i(ih, "getAsciiClass");
function sh(e, t) {
  let r = [];
  const n = lh(e);
  r = r.concat(n.errors);
  const a = uh(n.valid), s = a.valid;
  return r = r.concat(a.errors), r = r.concat(oh(s)), r = r.concat(hh(s)), r = r.concat(yh(s, t)), r = r.concat(gh(s)), r;
}
i(sh, "validatePatterns");
function oh(e) {
  let t = [];
  const r = e.filter((n) => n[Or] instanceof RegExp);
  return t = t.concat(ch(r)), t = t.concat(ph(r)), t = t.concat(dh(r)), t = t.concat(mh(r)), t = t.concat(fh(r)), t;
}
i(oh, "validateRegExpPattern");
function lh(e) {
  const t = e.filter((a) => !Object.hasOwn(a, Or)), r = t.map((a) => ({
    message: "Token Type: ->" + a.name + "<- missing static 'PATTERN' property",
    type: $e.MISSING_PATTERN,
    tokenTypes: [a]
  })), n = e.filter((a) => !t.includes(a));
  return { errors: r, valid: n };
}
i(lh, "findMissingPatterns");
function uh(e) {
  const t = e.filter((a) => {
    const s = a[Or];
    return !(s instanceof RegExp) && typeof s != "function" && !Object.hasOwn(s, "exec") && typeof s != "string";
  }), r = t.map((a) => ({
    message: "Token Type: ->" + a.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: $e.INVALID_PATTERN,
    tokenTypes: [a]
  })), n = e.filter((a) => !t.includes(a));
  return { errors: r, valid: n };
}
i(uh, "findInvalidPatterns");
var cA = /[^\\][$]/;
function ch(e) {
  class t extends Xs {
    static {
      i(this, "EndAnchorFinder");
    }
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(s) {
      this.found = !0;
    }
  }
  return e.filter((a) => {
    const s = a.PATTERN;
    try {
      const o = qn(s), l = new t();
      return l.visit(o), l.found;
    } catch {
      return cA.test(s.source);
    }
  }).map((a) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + a.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: $e.EOI_ANCHOR_FOUND,
    tokenTypes: [a]
  }));
}
i(ch, "findEndOfInputAnchor");
function fh(e) {
  return e.filter((n) => n.PATTERN.test("")).map((n) => ({
    message: "Token Type: ->" + n.name + "<- static 'PATTERN' must not match an empty string",
    type: $e.EMPTY_MATCH_PATTERN,
    tokenTypes: [n]
  }));
}
i(fh, "findEmptyMatchRegExps");
var fA = /[^\\[][\^]|^\^/;
function ph(e) {
  class t extends Xs {
    static {
      i(this, "StartAnchorFinder");
    }
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(s) {
      this.found = !0;
    }
  }
  return e.filter((a) => {
    const s = a.PATTERN;
    try {
      const o = qn(s), l = new t();
      return l.visit(o), l.found;
    } catch {
      return fA.test(s.source);
    }
  }).map((a) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + a.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: $e.SOI_ANCHOR_FOUND,
    tokenTypes: [a]
  }));
}
i(ph, "findStartOfInputAnchor");
function dh(e) {
  return e.filter((n) => {
    const a = n[Or];
    return a instanceof RegExp && (a.multiline || a.global);
  }).map((n) => ({
    message: "Token Type: ->" + n.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: $e.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [n]
  }));
}
i(dh, "findUnsupportedFlags");
function mh(e) {
  const t = [];
  let r = e.map((s) => e.reduce((o, l) => (s.PATTERN.source === l.PATTERN.source && !t.includes(l) && l.PATTERN !== Be.NA && (t.push(l), o.push(l)), o), []));
  return r = r.filter(Boolean), r.filter((s) => s.length > 1).map((s) => {
    const o = s.map((u) => u.name);
    return {
      message: `The same RegExp pattern ->${s[0].PATTERN}<-has been used in all of the following Token Types: ${o.join(", ")} <-`,
      type: $e.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: s
    };
  });
}
i(mh, "findDuplicatePatterns");
function hh(e) {
  return e.filter((n) => {
    if (!Object.hasOwn(n, "GROUP"))
      return !1;
    const a = n.GROUP;
    return a !== Be.SKIPPED && a !== Be.NA && typeof a != "string";
  }).map((n) => ({
    message: "Token Type: ->" + n.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: $e.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [n]
  }));
}
i(hh, "findInvalidGroupType");
function yh(e, t) {
  return e.filter((a) => a.PUSH_MODE !== void 0 && !t.includes(a.PUSH_MODE)).map((a) => ({
    message: `Token Type: ->${a.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${a.PUSH_MODE}<-which does not exist`,
    type: $e.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [a]
  }));
}
i(yh, "findModesThatDoNotExist");
function gh(e) {
  const t = [], r = e.reduce((n, a, s) => {
    const o = a.PATTERN;
    return o === Be.NA || (typeof o == "string" ? n.push({ str: o, idx: s, tokenType: a }) : o instanceof RegExp && Th(o) && n.push({ str: o.source, idx: s, tokenType: a })), n;
  }, []);
  return e.forEach((n, a) => {
    r.forEach(({ str: s, idx: o, tokenType: l }) => {
      if (a < o && vh(s, n.PATTERN)) {
        const u = `Token: ->${l.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        t.push({
          message: u,
          type: $e.UNREACHABLE_PATTERN,
          tokenTypes: [n, l]
        });
      }
    });
  }), t;
}
i(gh, "findUnreachablePatterns");
function vh(e, t) {
  if (t instanceof RegExp) {
    if ($h(t))
      return !1;
    const r = t.exec(e);
    return r !== null && r.index === 0;
  } else {
    if (typeof t == "function")
      return t(e, 0, [], {});
    if (Object.hasOwn(t, "exec"))
      return t.exec(e, 0, [], {});
    if (typeof t == "string")
      return t === e;
    throw Error("non exhaustive match");
  }
}
i(vh, "tryToMatchStrToPattern");
function Th(e) {
  return [
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ].find((r) => e.source.indexOf(r) !== -1) === void 0;
}
i(Th, "noMetaChar");
function $h(e) {
  return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(e.source);
}
i($h, "usesLookAheadOrBehind");
function Tu(e) {
  const t = e.ignoreCase ? "iy" : "y";
  return new RegExp(`${e.source}`, t);
}
i(Tu, "addStickyFlag");
function Rh(e, t, r) {
  const n = [];
  return Object.hasOwn(e, Ka) || n.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Ka + `> property in its definition
`,
    type: $e.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), Object.hasOwn(e, Ii) || n.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Ii + `> property in its definition
`,
    type: $e.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), Object.hasOwn(e, Ii) && Object.hasOwn(e, Ka) && !Object.hasOwn(e.modes, e.defaultMode) && n.push({
    message: `A MultiMode Lexer cannot be initialized with a ${Ka}: <${e.defaultMode}>which does not exist
`,
    type: $e.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), Object.hasOwn(e, Ii) && Object.keys(e.modes).forEach((a) => {
    const s = e.modes[a];
    s.forEach((o, l) => {
      o === void 0 ? n.push({
        message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${a}> at index: <${l}>
`,
        type: $e.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
      }) : Object.hasOwn(o, "LONGER_ALT") && (Array.isArray(o.LONGER_ALT) ? o.LONGER_ALT : [o.LONGER_ALT]).forEach((c) => {
        c !== void 0 && !s.includes(c) && n.push({
          message: `A MultiMode Lexer cannot be initialized with a longer_alt <${c.name}> on token <${o.name}> outside of mode <${a}>
`,
          type: $e.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
        });
      });
    });
  }), n;
}
i(Rh, "performRuntimeChecks");
function Ah(e, t, r) {
  const n = [];
  let a = !1;
  const o = Object.values(e.modes || {}).flat().filter(Boolean).filter((u) => u[Or] !== Be.NA), l = jc(r);
  return t && o.forEach((u) => {
    const c = Fc(u, l);
    if (c !== !1) {
      const h = {
        message: Ch(u, c),
        type: c.issue,
        tokenType: u
      };
      n.push(h);
    } else
      Object.hasOwn(u, "LINE_BREAKS") ? u.LINE_BREAKS === !0 && (a = !0) : eo(l, u.PATTERN) && (a = !0);
  }), t && !a && n.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: $e.NO_LINE_BREAKS_FLAGS
  }), n;
}
i(Ah, "performWarningRuntimeChecks");
function Gc(e) {
  const t = e.PATTERN;
  if (t instanceof RegExp)
    return !1;
  if (typeof t == "function")
    return !0;
  if (Object.hasOwn(t, "exec"))
    return !0;
  if (typeof t == "string")
    return !1;
  throw Error("non exhaustive match");
}
i(Gc, "isCustomPattern");
function Eh(e) {
  return typeof e == "string" && e.length === 1 ? e.charCodeAt(0) : !1;
}
i(Eh, "isShortPattern");
var pA = {
  // implements /\n|\r\n?/g.test
  test: /* @__PURE__ */ i(function(e) {
    const t = e.length;
    for (let r = this.lastIndex; r < t; r++) {
      const n = e.charCodeAt(r);
      if (n === 10)
        return this.lastIndex = r + 1, !0;
      if (n === 13)
        return e.charCodeAt(r + 1) === 10 ? this.lastIndex = r + 2 : this.lastIndex = r + 1, !0;
    }
    return !1;
  }, "test"),
  lastIndex: 0
};
function Fc(e, t) {
  if (Object.hasOwn(e, "LINE_BREAKS"))
    return !1;
  if (e.PATTERN instanceof RegExp) {
    try {
      eo(t, e.PATTERN);
    } catch (r) {
      return {
        issue: $e.IDENTIFY_TERMINATOR,
        errMsg: r.message
      };
    }
    return !1;
  } else {
    if (typeof e.PATTERN == "string")
      return !1;
    if (Gc(e))
      return { issue: $e.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
i(Fc, "checkLineBreaksIssues");
function Ch(e, t) {
  if (t.issue === $e.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${e.name}> Token Type
	 Root cause: ${t.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (t.issue === $e.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${e.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
i(Ch, "buildLineBreakIssueMessage");
function jc(e) {
  return e.map((r) => typeof r == "string" ? r.charCodeAt(0) : r);
}
i(jc, "getCharCodes");
function ds(e, t, r) {
  e[t] === void 0 ? e[t] = [r] : e[t].push(r);
}
i(ds, "addToMapOfArrays");
var Wa = 256, ms = [];
function Bt(e) {
  return e < Wa ? e : ms[e];
}
i(Bt, "charCodeToOptimizedIndex");
function bh() {
  if (ms.length === 0) {
    ms = new Array(65536);
    for (let e = 0; e < 65536; e++)
      ms[e] = e > 255 ? 255 + ~~(e / 255) : e;
  }
}
i(bh, "initCharCodeToOptimizedIndexMap");
function Hn(e, t) {
  const r = e.tokenTypeIdx;
  return r === t.tokenTypeIdx ? !0 : t.isParent === !0 && t.categoryMatchesMap[r] === !0;
}
i(Hn, "tokenStructuredMatcher");
function si(e, t) {
  return e.tokenTypeIdx === t.tokenTypeIdx;
}
i(si, "tokenStructuredMatcherNoCategories");
var Ff = 1, _h = {};
function Yn(e) {
  const t = Sh(e);
  wh(t), kh(t), Ph(t), t.forEach((r) => {
    r.isParent = r.categoryMatches.length > 0;
  });
}
i(Yn, "augmentTokenTypes");
function Sh(e) {
  let t = [...e], r = e, n = !0;
  for (; n; ) {
    r = r.map((s) => s.CATEGORIES).flat().filter(Boolean);
    const a = r.filter((s) => !t.includes(s));
    t = t.concat(a), a.length === 0 ? n = !1 : r = a;
  }
  return t;
}
i(Sh, "expandCategories");
function wh(e) {
  e.forEach((t) => {
    Uc(t) || (_h[Ff] = t, t.tokenTypeIdx = Ff++), $u(t) && !Array.isArray(t.CATEGORIES) && (t.CATEGORIES = [t.CATEGORIES]), $u(t) || (t.CATEGORIES = []), Ih(t) || (t.categoryMatches = []), Nh(t) || (t.categoryMatchesMap = {});
  });
}
i(wh, "assignTokenDefaultProps");
function Ph(e) {
  e.forEach((t) => {
    t.categoryMatches = [], Object.keys(t.categoryMatchesMap).forEach((r) => {
      t.categoryMatches.push(_h[r].tokenTypeIdx);
    });
  });
}
i(Ph, "assignCategoriesTokensProp");
function kh(e) {
  e.forEach((t) => {
    zc([], t);
  });
}
i(kh, "assignCategoriesMapProp");
function zc(e, t) {
  e.forEach((r) => {
    t.categoryMatchesMap[r.tokenTypeIdx] = !0;
  }), t.CATEGORIES.forEach((r) => {
    const n = e.concat(t);
    n.includes(r) || zc(n, r);
  });
}
i(zc, "singleAssignCategoriesToksMap");
function Uc(e) {
  return Object.hasOwn(e ?? {}, "tokenTypeIdx");
}
i(Uc, "hasShortKeyProperty");
function $u(e) {
  return Object.hasOwn(e ?? {}, "CATEGORIES");
}
i($u, "hasCategoriesProperty");
function Ih(e) {
  return Object.hasOwn(e ?? {}, "categoryMatches");
}
i(Ih, "hasExtendingTokensTypesProperty");
function Nh(e) {
  return Object.hasOwn(e ?? {}, "categoryMatchesMap");
}
i(Nh, "hasExtendingTokensTypesMapProperty");
function Oh(e) {
  return Object.hasOwn(e ?? {}, "tokenTypeIdx");
}
i(Oh, "isTokenType");
var Ru = {
  buildUnableToPopLexerModeMessage(e) {
    return `Unable to pop Lexer Mode after encountering Token ->${e.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(e, t, r, n, a, s) {
    return `unexpected character: ->${e.charAt(t)}<- at offset: ${t}, skipped ${r} characters.`;
  }
}, $e;
(function(e) {
  e[e.MISSING_PATTERN = 0] = "MISSING_PATTERN", e[e.INVALID_PATTERN = 1] = "INVALID_PATTERN", e[e.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", e[e.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", e[e.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", e[e.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", e[e.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", e[e.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", e[e.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", e[e.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", e[e.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", e[e.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", e[e.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", e[e.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", e[e.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", e[e.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", e[e.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", e[e.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})($e || ($e = {}));
var qa = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: Ru,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(qa);
var Be = class {
  static {
    i(this, "Lexer");
  }
  constructor(e, t = qa) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.cachedGroupKeys = [], this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (n, a) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const s = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${s}--> <${n}>`);
        const { time: o, value: l } = Dc(a), u = o > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${s}<-- <${n}> time: ${o}ms`), this.traceInitIndent--, l;
      } else
        return a();
    }, typeof t == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = Object.assign({}, qa, t);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let n, a = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === qa.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = pA;
        else if (this.config.lineTerminatorCharacters === qa.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (t.safeMode && t.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), Array.isArray(e) ? n = {
          modes: { defaultMode: [...e] },
          defaultMode: Ka
        } : (a = !1, n = Object.assign({}, e));
      }), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Rh(n, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Ah(n, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), n.modes = n.modes ? n.modes : {}, Object.entries(n.modes).forEach(([o, l]) => {
        n.modes[o] = l.filter((u) => u !== void 0);
      });
      const s = Object.keys(n.modes);
      if (Object.entries(n.modes).forEach(([o, l]) => {
        this.TRACE_INIT(`Mode: <${o}> processing`, () => {
          if (this.modes.push(o), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(sh(l, s));
          }), this.lexerDefinitionErrors.length === 0) {
            Yn(l);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = ah(l, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: t.positionTracking,
                ensureOptimizations: t.ensureOptimizations,
                safeMode: t.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[o] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[o] = u.charCodeToPatternIdxToConfig, this.emptyGroups = Object.assign({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[o] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = n.defaultMode, this.cachedGroupKeys = Object.keys(this.emptyGroups), this.lexerDefinitionErrors.length > 0 && !this.config.deferDefinitionErrorsHandling) {
        const l = this.lexerDefinitionErrors.map((u) => u.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + l);
      }
      this.lexerDefinitionWarning.forEach((o) => {
        Lc(o.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (a && (this.handleModes = () => {
        }), this.trackStartLines === !1 && (this.computeNewColumn = (o) => o), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = () => {
        }), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const o = Object.entries(this.canModeBeOptimized).reduce((l, [u, c]) => (c === !1 && l.push(u), l), []);
        if (t.ensureOptimizations && o.length > 0)
          throw Error(`Lexer Modes: < ${o.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        eh();
      }), this.TRACE_INIT("toFastProperties", () => {
        xc(this);
      });
    });
  }
  tokenize(e, t = this.defaultMode) {
    if (this.lexerDefinitionErrors.length > 0) {
      const n = this.lexerDefinitionErrors.map((a) => a.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + n);
    }
    return this.tokenizeInternal(e, t);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(e, t) {
    let r, n, a, s, o, l, u, c, p, h, y, d, A, T, v;
    const $ = e, S = $.length;
    let E = 0, O = 0;
    const M = this.hasCustom ? 0 : Math.floor(e.length / 10), F = new Array(M), U = [];
    let J = this.trackStartLines ? 1 : void 0, ne = this.trackStartLines ? 1 : void 0;
    const Y = {};
    for (let q = 0; q < this.cachedGroupKeys.length; q++)
      Y[this.cachedGroupKeys[q]] = [];
    const L = this.trackStartLines, k = this.config.lineTerminatorsPattern;
    let x = 0, G = [], P = [];
    const R = [], g = [];
    Object.freeze(g);
    let b = !1;
    const I = /* @__PURE__ */ i((q) => {
      if (R.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      q.tokenType.PUSH_MODE === void 0) {
        const W = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(q);
        U.push({
          offset: q.startOffset,
          line: q.startLine,
          column: q.startColumn,
          length: q.image.length,
          message: W
        });
      } else {
        R.pop();
        const W = R.at(-1);
        G = this.patternIdxToConfig[W], P = this.charCodeToPatternIdxToConfig[W], x = G.length;
        const Ee = this.canModeBeOptimized[W] && this.config.safeMode === !1;
        P && Ee ? b = !0 : b = !1;
      }
    }, "pop_mode");
    function _(q) {
      R.push(q), P = this.charCodeToPatternIdxToConfig[q], G = this.patternIdxToConfig[q], x = G.length;
      const W = this.canModeBeOptimized[q] && this.config.safeMode === !1;
      P && W ? b = !0 : b = !1;
    }
    i(_, "push_mode"), _.call(this, t);
    let N;
    const V = this.config.recoveryEnabled;
    for (; E < S; ) {
      l = null, p = -1;
      const q = $.charCodeAt(E);
      let W;
      if (b) {
        const te = Bt(q), pe = P[te];
        W = pe !== void 0 ? pe : g;
      } else
        W = G;
      const Ee = W.length;
      for (r = 0; r < Ee; r++) {
        N = W[r];
        const te = N.pattern;
        switch (u = null, N.matchType) {
          case yu:
            q === N.short && (p = 1, l = te);
            break;
          case ps:
            v = te.exec($, E, F, Y), v !== null ? (l = v[0], p = l.length, v.payload !== void 0 && (u = v.payload)) : l = null;
            break;
          case vu: {
            const pe = N.asciiClass;
            if (pe[q] !== 1) {
              te.lastIndex = 0;
              break;
            }
            let oe = E + 1;
            for (; pe[$.charCodeAt(oe)] === 1; )
              oe++;
            p = oe - E, te.lastIndex = oe;
            break;
          }
          case gu:
            te.lastIndex = E, p = this.matchLength(te, e, E);
            break;
        }
        if (p !== -1) {
          if (o = N.longerAlt, o !== void 0) {
            l = e.substring(E, E + p);
            const pe = o.length;
            for (a = 0; a < pe; a++) {
              const oe = G[o[a]], be = oe.pattern;
              if (c = null, oe.matchType === ps ? (v = be.exec($, E, F, Y), v !== null ? (s = v[0], v.payload !== void 0 && (c = v.payload)) : s = null) : (be.lastIndex = E, s = this.match(be, e, E)), s && s.length > l.length) {
                l = s, p = s.length, u = c, N = oe;
                break;
              }
            }
          }
          break;
        }
      }
      if (p !== -1) {
        if (h = N.group, h !== void 0 && (l = l !== null ? l : e.substring(E, E + p), y = N.tokenTypeIdx, d = this.createTokenInstance(l, E, y, N.tokenType, J, ne, p), this.handlePayload(d, u), h === !1 ? O = this.addToken(F, O, d) : Y[h].push(d)), L === !0 && N.canLineTerminator === !0) {
          let te = 0, pe, oe;
          k.lastIndex = 0;
          do
            l = l !== null ? l : e.substring(E, E + p), pe = k.test(l), pe === !0 && (oe = k.lastIndex - 1, te++);
          while (pe === !0);
          te !== 0 ? (J = J + te, ne = p - oe, this.updateTokenEndLineColumnLocation(d, h, oe, te, J, ne, p)) : ne = this.computeNewColumn(ne, p);
        } else
          ne = this.computeNewColumn(ne, p);
        E = E + p, this.handleModes(N, I, _, d);
      } else {
        const te = E, pe = J, oe = ne;
        let be = V === !1;
        for (; be === !1 && E < S; )
          for (E++, n = 0; n < x; n++) {
            const qe = G[n], Qe = qe.pattern;
            switch (qe.matchType) {
              case yu:
                $.charCodeAt(E) === qe.short && (be = !0);
                break;
              case ps:
                be = Qe.exec($, E, F, Y) !== null;
                break;
              case vu:
              case gu:
                Qe.lastIndex = E, be = Qe.exec(e) !== null;
                break;
            }
            if (be === !0)
              break;
          }
        if (A = E - te, ne = this.computeNewColumn(ne, A), T = this.config.errorMessageProvider.buildUnexpectedCharactersMessage($, te, A, pe, oe, R.at(-1)), U.push({
          offset: te,
          line: pe,
          column: oe,
          length: A,
          message: T
        }), V === !1)
          break;
      }
    }
    return this.hasCustom || (F.length = O), {
      tokens: F,
      groups: Y,
      errors: U
    };
  }
  handleModes(e, t, r, n) {
    if (e.pop === !0) {
      const a = e.push;
      t(n), a !== void 0 && r.call(this, a);
    } else e.push !== void 0 && r.call(this, e.push);
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(e, t, r, n, a, s, o) {
    let l, u;
    t !== void 0 && (l = r === o - 1, u = l ? -1 : 0, n === 1 && l === !0 || (e.endLine = a + u, e.endColumn = s - 1 + -u));
  }
  computeNewColumn(e, t) {
    return e + t;
  }
  createOffsetOnlyToken(e, t, r, n) {
    return {
      image: e,
      startOffset: t,
      tokenTypeIdx: r,
      tokenType: n
    };
  }
  createStartOnlyToken(e, t, r, n, a, s) {
    return {
      image: e,
      startOffset: t,
      startLine: a,
      startColumn: s,
      tokenTypeIdx: r,
      tokenType: n
    };
  }
  createFullToken(e, t, r, n, a, s, o) {
    return {
      image: e,
      startOffset: t,
      endOffset: t + o - 1,
      startLine: a,
      endLine: a,
      startColumn: s,
      endColumn: s + o - 1,
      tokenTypeIdx: r,
      tokenType: n
    };
  }
  addTokenUsingPush(e, t, r) {
    return e.push(r), t;
  }
  addTokenUsingMemberAccess(e, t, r) {
    return e[t] = r, t++, t;
  }
  handlePayloadNoCustom(e, t) {
  }
  handlePayloadWithCustom(e, t) {
    t !== null && (e.payload = t);
  }
  match(e, t, r) {
    return e.test(t) === !0 ? t.substring(r, e.lastIndex) : null;
  }
  matchLength(e, t, r) {
    return e.test(t) === !0 ? e.lastIndex - r : -1;
  }
};
Be.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Be.NA = /NOT_APPLICABLE/;
function Nr(e) {
  return Bc(e) ? e.LABEL : e.name;
}
i(Nr, "tokenLabel");
function Bc(e) {
  return typeof e.LABEL == "string" && e.LABEL !== "";
}
i(Bc, "hasTokenLabel");
var dA = "parent", jf = "categories", zf = "label", Uf = "group", Bf = "push_mode", Vf = "pop_mode", Kf = "longer_alt", Wf = "line_breaks", qf = "start_chars_hint";
function Vc(e) {
  return Mh(e);
}
i(Vc, "createToken");
function Mh(e) {
  const t = e.pattern, r = {};
  if (r.name = e.name, t !== void 0 && (r.PATTERN = t), Object.hasOwn(e, dA))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return Object.hasOwn(e, jf) && (r.CATEGORIES = e[jf]), Yn([r]), Object.hasOwn(e, zf) && (r.LABEL = e[zf]), Object.hasOwn(e, Uf) && (r.GROUP = e[Uf]), Object.hasOwn(e, Vf) && (r.POP_MODE = e[Vf]), Object.hasOwn(e, Bf) && (r.PUSH_MODE = e[Bf]), Object.hasOwn(e, Kf) && (r.LONGER_ALT = e[Kf]), Object.hasOwn(e, Wf) && (r.LINE_BREAKS = e[Wf]), Object.hasOwn(e, qf) && (r.START_CHARS_HINT = e[qf]), r;
}
i(Mh, "createTokenInternal");
var Vt = Vc({ name: "EOF", pattern: Be.NA });
Yn([Vt]);
function to(e, t, r, n, a, s, o, l) {
  return {
    image: t,
    startOffset: r,
    endOffset: n,
    startLine: a,
    endLine: s,
    startColumn: o,
    endColumn: l,
    tokenTypeIdx: e.tokenTypeIdx,
    tokenType: e
  };
}
i(to, "createTokenInstance");
function ro(e, t) {
  return Hn(e, t);
}
i(ro, "tokenMatcher");
var Nn = {
  buildMismatchTokenMessage({ expected: e, actual: t, previous: r, ruleName: n }) {
    return `Expecting ${Bc(e) ? `--> ${Nr(e)} <--` : `token of type --> ${e.name} <--`} but found --> '${t.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: t }) {
    return "Redundant input, expecting EOF but found: " + e.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: e, actual: t, previous: r, customUserDescription: n, ruleName: a }) {
    const s = "Expecting: ", l = `
but found: '` + t[0].image + "'";
    if (n)
      return s + n + l;
    {
      const h = `one of these possible Token sequences:
${e.reduce((y, d) => y.concat(d), []).map((y) => `[${y.map((d) => Nr(d)).join(", ")}]`).map((y, d) => `  ${d + 1}. ${y}`).join(`
`)}`;
      return s + h + l;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: e, actual: t, customUserDescription: r, ruleName: n }) {
    const a = "Expecting: ", o = `
but found: '` + t[0].image + "'";
    if (r)
      return a + r + o;
    {
      const u = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${e.map((c) => `[${c.map((p) => Nr(p)).join(",")}]`).join(" ,")}>`;
      return a + u + o;
    }
  }
};
Object.freeze(Nn);
var mA = {
  buildRuleNotFoundError(e, t) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + t.nonTerminalName + `<-
inside top level rule: ->` + e.name + "<-";
  }
}, Ir = {
  buildDuplicateFoundError(e, t) {
    function r(p) {
      return p instanceof ue ? p.terminalType.name : p instanceof Ge ? p.nonTerminalName : "";
    }
    i(r, "getExtraProductionArgument");
    const n = e.name, a = t[0], s = a.idx, o = ut(a), l = r(a), u = s > 0;
    let c = `->${o}${u ? s : ""}<- ${l ? `with argument: ->${l}<-` : ""}
                  appears more than once (${t.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return c = c.replace(/[ \t]+/g, " "), c = c.replace(/\s\s+/g, `
`), c;
  },
  buildNamespaceConflictError(e) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${e.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  },
  buildAlternationPrefixAmbiguityError(e) {
    const t = e.prefixPath.map((a) => Nr(a)).join(", "), r = e.alternation.idx === 0 ? "" : e.alternation.idx;
    return `Ambiguous alternatives: <${e.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${e.topLevelRule.name}> Rule,
<${t}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(e) {
    const t = e.alternation.idx === 0 ? "" : e.alternation.idx, r = e.prefixPath.length === 0;
    let n = `Ambiguous Alternatives Detected: <${e.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${e.topLevelRule.name}> Rule,
`;
    if (r)
      n += `These alternatives are all empty (match no tokens), making them indistinguishable.
Only the last alternative may be empty.
`;
    else {
      const a = e.prefixPath.map((s) => Nr(s)).join(", ");
      n += `<${a}> may appears as a prefix path in all these alternatives.
`;
    }
    return n += `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n;
  },
  buildEmptyRepetitionError(e) {
    let t = ut(e.repetition);
    return e.repetition.idx !== 0 && (t += e.repetition.idx), `The repetition <${t}> within Rule <${e.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(e) {
    return "deprecated";
  },
  buildEmptyAlternationError(e) {
    return `Ambiguous empty alternative: <${e.emptyChoiceIdx + 1}> in <OR${e.alternation.idx}> inside <${e.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  },
  buildTooManyAlternativesError(e) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${e.alternation.idx}> inside <${e.topLevelRule.name}> Rule.
 has ${e.alternation.definition.length + 1} alternatives.`;
  },
  buildLeftRecursionError(e) {
    const t = e.topLevelRule.name, r = e.leftRecursionPath.map((s) => s.name), n = `${t} --> ${r.concat([t]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${t}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(e) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(e) {
    let t;
    return e.topLevelRule instanceof Vn ? t = e.topLevelRule.name : t = e.topLevelRule, `Duplicate definition, rule: ->${t}<- is already defined in the grammar: ->${e.grammarName}<-`;
  }
};
function Lh(e, t) {
  const r = new hA(e, t);
  return r.resolveRefs(), r.errors;
}
i(Lh, "resolveGrammar");
var hA = class extends Kn {
  static {
    i(this, "GastRefResolverVisitor");
  }
  constructor(e, t) {
    super(), this.nameToTopRule = e, this.errMsgProvider = t, this.errors = [];
  }
  resolveRefs() {
    Object.values(this.nameToTopRule).forEach((e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    const t = this.nameToTopRule[e.nonTerminalName];
    if (t)
      e.referencedRule = t;
    else {
      const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({
        message: r,
        type: Fe.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: e.nonTerminalName
      });
    }
  }
}, yA = class extends Qs {
  static {
    i(this, "AbstractNextPossibleTokensWalker");
  }
  constructor(e, t) {
    super(), this.topProd = e, this.path = t, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1;
  }
  startWalking() {
    if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
      throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = [...this.path.ruleStack].reverse(), this.occurrenceStack = [...this.path.occurrenceStack].reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, t = []) {
    this.found || super.walk(e, t);
  }
  walkProdRef(e, t, r) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      const n = t.concat(r);
      this.updateExpectedNext(), this.walk(e.referencedRule, n);
    }
  }
  updateExpectedNext() {
    this.ruleStack.length === 0 ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}, gA = class extends yA {
  static {
    i(this, "NextAfterTokenWalker");
  }
  constructor(e, t) {
    super(e, t), this.path = t, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, t, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const n = t.concat(r), a = new Ve({ definition: n });
      this.possibleTokTypes = Wn(a), this.found = !0;
    }
  }
}, no = class extends Qs {
  static {
    i(this, "AbstractNextTerminalAfterProductionWalker");
  }
  constructor(e, t) {
    super(), this.topRule = e, this.occurrence = t, this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}, vA = class extends no {
  static {
    i(this, "NextTerminalAfterManyWalker");
  }
  walkMany(e, t, r) {
    if (e.idx === this.occurrence) {
      const n = t.concat(r)[0];
      this.result.isEndOfRule = n === void 0, n instanceof ue && (this.result.token = n.terminalType, this.result.occurrence = n.idx);
    } else
      super.walkMany(e, t, r);
  }
}, Hf = class extends no {
  static {
    i(this, "NextTerminalAfterManySepWalker");
  }
  walkManySep(e, t, r) {
    if (e.idx === this.occurrence) {
      const n = t.concat(r)[0];
      this.result.isEndOfRule = n === void 0, n instanceof ue && (this.result.token = n.terminalType, this.result.occurrence = n.idx);
    } else
      super.walkManySep(e, t, r);
  }
}, TA = class extends no {
  static {
    i(this, "NextTerminalAfterAtLeastOneWalker");
  }
  walkAtLeastOne(e, t, r) {
    if (e.idx === this.occurrence) {
      const n = t.concat(r)[0];
      this.result.isEndOfRule = n === void 0, n instanceof ue && (this.result.token = n.terminalType, this.result.occurrence = n.idx);
    } else
      super.walkAtLeastOne(e, t, r);
  }
}, Yf = class extends no {
  static {
    i(this, "NextTerminalAfterAtLeastOneSepWalker");
  }
  walkAtLeastOneSep(e, t, r) {
    if (e.idx === this.occurrence) {
      const n = t.concat(r)[0];
      this.result.isEndOfRule = n === void 0, n instanceof ue && (this.result.token = n.terminalType, this.result.occurrence = n.idx);
    } else
      super.walkAtLeastOneSep(e, t, r);
  }
};
function xs(e, t, r = []) {
  r = [...r];
  let n = [], a = 0;
  function s(l) {
    return l.concat(e.slice(a + 1));
  }
  i(s, "remainingPathWith");
  function o(l) {
    const u = xs(s(l), t, r);
    return n.concat(u);
  }
  for (i(o, "getAlternativesForProd"); r.length < t && a < e.length; ) {
    const l = e[a];
    if (l instanceof Ve)
      return o(l.definition);
    if (l instanceof Ge)
      return o(l.definition);
    if (l instanceof Ie)
      n = o(l.definition);
    else if (l instanceof Je) {
      const u = l.definition.concat([
        new Te({
          definition: l.definition
        })
      ]);
      return o(u);
    } else if (l instanceof Ze) {
      const u = [
        new Ve({ definition: l.definition }),
        new Te({
          definition: [new ue({ terminalType: l.separator })].concat(l.definition)
        })
      ];
      return o(u);
    } else if (l instanceof Ke) {
      const u = l.definition.concat([
        new Te({
          definition: [new ue({ terminalType: l.separator })].concat(l.definition)
        })
      ]);
      n = o(u);
    } else if (l instanceof Te) {
      const u = l.definition.concat([
        new Te({
          definition: l.definition
        })
      ]);
      n = o(u);
    } else {
      if (l instanceof We)
        return l.definition.forEach((u) => {
          u.definition.length !== 0 && (n = o(u.definition));
        }), n;
      if (l instanceof ue)
        r.push(l.terminalType);
      else
        throw Error("non exhaustive match");
    }
    a++;
  }
  return n.push({
    partialPath: r,
    suffixDef: e.slice(a)
  }), n;
}
i(xs, "possiblePathsFrom");
function Dh(e, t, r, n) {
  const a = "EXIT_NONE_TERMINAL", s = [a], o = "EXIT_ALTERNATIVE";
  let l = !1;
  const u = t.length, c = u - n - 1, p = [], h = [];
  for (h.push({
    idx: -1,
    def: e,
    ruleStack: [],
    occurrenceStack: []
  }); h.length !== 0; ) {
    const y = h.pop();
    if (y === o) {
      l && h.at(-1).idx <= c && h.pop();
      continue;
    }
    const d = y.def, A = y.idx, T = y.ruleStack, v = y.occurrenceStack;
    if (d.length === 0)
      continue;
    const $ = d[0];
    if ($ === a) {
      const S = {
        idx: A,
        def: d.slice(1),
        ruleStack: T.slice(0, -1),
        occurrenceStack: v.slice(0, -1)
      };
      h.push(S);
    } else if ($ instanceof ue)
      if (A < u - 1) {
        const S = A + 1, E = t[S];
        if (r(E, $.terminalType)) {
          const O = {
            idx: S,
            def: d.slice(1),
            ruleStack: T,
            occurrenceStack: v
          };
          h.push(O);
        }
      } else if (A === u - 1)
        p.push({
          nextTokenType: $.terminalType,
          nextTokenOccurrence: $.idx,
          ruleStack: T,
          occurrenceStack: v
        }), l = !0;
      else
        throw Error("non exhaustive match");
    else if ($ instanceof Ge) {
      const S = [...T];
      S.push($.nonTerminalName);
      const E = [...v];
      E.push($.idx);
      const O = {
        idx: A,
        def: $.definition.concat(s, d.slice(1)),
        ruleStack: S,
        occurrenceStack: E
      };
      h.push(O);
    } else if ($ instanceof Ie) {
      const S = {
        idx: A,
        def: d.slice(1),
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(S), h.push(o);
      const E = {
        idx: A,
        def: $.definition.concat(d.slice(1)),
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(E);
    } else if ($ instanceof Je) {
      const S = new Te({
        definition: $.definition,
        idx: $.idx
      }), E = $.definition.concat([S], d.slice(1)), O = {
        idx: A,
        def: E,
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(O);
    } else if ($ instanceof Ze) {
      const S = new ue({
        terminalType: $.separator
      }), E = new Te({
        definition: [S].concat($.definition),
        idx: $.idx
      }), O = $.definition.concat([E], d.slice(1)), M = {
        idx: A,
        def: O,
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(M);
    } else if ($ instanceof Ke) {
      const S = {
        idx: A,
        def: d.slice(1),
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(S), h.push(o);
      const E = new ue({
        terminalType: $.separator
      }), O = new Te({
        definition: [E].concat($.definition),
        idx: $.idx
      }), M = $.definition.concat([O], d.slice(1)), F = {
        idx: A,
        def: M,
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(F);
    } else if ($ instanceof Te) {
      const S = {
        idx: A,
        def: d.slice(1),
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(S), h.push(o);
      const E = new Te({
        definition: $.definition,
        idx: $.idx
      }), O = $.definition.concat([E], d.slice(1)), M = {
        idx: A,
        def: O,
        ruleStack: T,
        occurrenceStack: v
      };
      h.push(M);
    } else if ($ instanceof We)
      for (let S = $.definition.length - 1; S >= 0; S--) {
        const E = $.definition[S], O = {
          idx: A,
          def: E.definition.concat(d.slice(1)),
          ruleStack: T,
          occurrenceStack: v
        };
        h.push(O), h.push(o);
      }
    else if ($ instanceof Ve)
      h.push({
        idx: A,
        def: $.definition.concat(d.slice(1)),
        ruleStack: T,
        occurrenceStack: v
      });
    else if ($ instanceof Vn)
      h.push(xh($, A, T, v));
    else
      throw Error("non exhaustive match");
  }
  return p;
}
i(Dh, "nextPossibleTokensAfter");
function xh(e, t, r, n) {
  const a = [...r];
  a.push(e.name);
  const s = [...n];
  return s.push(1), {
    idx: t,
    def: e.definition,
    ruleStack: a,
    occurrenceStack: s
  };
}
i(xh, "expandTopLevelRule");
var me;
(function(e) {
  e[e.OPTION = 0] = "OPTION", e[e.REPETITION = 1] = "REPETITION", e[e.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", e[e.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", e[e.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", e[e.ALTERNATION = 5] = "ALTERNATION";
})(me || (me = {}));
function ao(e) {
  if (e instanceof Ie || e === "Option")
    return me.OPTION;
  if (e instanceof Te || e === "Repetition")
    return me.REPETITION;
  if (e instanceof Je || e === "RepetitionMandatory")
    return me.REPETITION_MANDATORY;
  if (e instanceof Ze || e === "RepetitionMandatoryWithSeparator")
    return me.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (e instanceof Ke || e === "RepetitionWithSeparator")
    return me.REPETITION_WITH_SEPARATOR;
  if (e instanceof We || e === "Alternation")
    return me.ALTERNATION;
  throw Error("non exhaustive match");
}
i(ao, "getProdType");
function Au(e) {
  const { occurrence: t, rule: r, prodType: n, maxLookahead: a } = e, s = ao(n);
  return s === me.ALTERNATION ? Ei(t, r, a) : Ci(t, r, s, a);
}
i(Au, "getLookaheadPaths");
function Gh(e, t, r, n, a, s) {
  const o = Ei(e, t, r), l = Wc(o) ? si : Hn;
  return s(o, n, l, a);
}
i(Gh, "buildLookaheadFuncForOr");
function Fh(e, t, r, n, a, s) {
  const o = Ci(e, t, a, r), l = Wc(o) ? si : Hn;
  return s(o[0], l, n);
}
i(Fh, "buildLookaheadFuncForOptionalProd");
function jh(e, t, r, n) {
  const a = e.length, s = e.every((o) => o.every((l) => l.length === 1));
  if (t)
    return function(o) {
      const l = o.map((u) => u.GATE);
      for (let u = 0; u < a; u++) {
        const c = e[u], p = c.length, h = l[u];
        if (!(h !== void 0 && h.call(this) === !1))
          e: for (let y = 0; y < p; y++) {
            const d = c[y], A = d.length;
            for (let T = 0; T < A; T++) {
              const v = this.LA_FAST(T + 1);
              if (r(v, d[T]) === !1)
                continue e;
            }
            return u;
          }
      }
    };
  if (s && !n) {
    const l = e.map((u) => u.flat()).reduce((u, c, p) => (c.forEach((h) => {
      h.tokenTypeIdx in u || (u[h.tokenTypeIdx] = p), h.categoryMatches.forEach((y) => {
        Object.hasOwn(u, y) || (u[y] = p);
      });
    }), u), {});
    return function() {
      const u = this.LA_FAST(1);
      return l[u.tokenTypeIdx];
    };
  } else
    return function() {
      for (let o = 0; o < a; o++) {
        const l = e[o], u = l.length;
        e: for (let c = 0; c < u; c++) {
          const p = l[c], h = p.length;
          for (let y = 0; y < h; y++) {
            const d = this.LA_FAST(y + 1);
            if (r(d, p[y]) === !1)
              continue e;
          }
          return o;
        }
      }
    };
}
i(jh, "buildAlternativesLookAheadFunc");
function zh(e, t, r) {
  const n = e.every((s) => s.length === 1), a = e.length;
  if (n && !r) {
    const s = e.flat();
    if (s.length === 1 && s[0].categoryMatches.length === 0) {
      const l = s[0].tokenTypeIdx;
      return function() {
        return this.LA_FAST(1).tokenTypeIdx === l;
      };
    } else {
      const o = s.reduce((l, u, c) => (l[u.tokenTypeIdx] = !0, u.categoryMatches.forEach((p) => {
        l[p] = !0;
      }), l), []);
      return function() {
        const l = this.LA_FAST(1);
        return o[l.tokenTypeIdx] === !0;
      };
    }
  } else
    return function() {
      e: for (let s = 0; s < a; s++) {
        const o = e[s], l = o.length;
        for (let u = 0; u < l; u++) {
          const c = this.LA_FAST(u + 1);
          if (t(c, o[u]) === !1)
            continue e;
        }
        return !0;
      }
      return !1;
    };
}
i(zh, "buildSingleAlternativeLookaheadFunction");
var $A = class extends Qs {
  static {
    i(this, "RestDefinitionFinderWalker");
  }
  constructor(e, t, r) {
    super(), this.topProd = e, this.targetOccurrence = t, this.targetProdType = r;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, t, r, n) {
    return e.idx === this.targetOccurrence && this.targetProdType === t ? (this.restDef = r.concat(n), !0) : !1;
  }
  walkOption(e, t, r) {
    this.checkIsTarget(e, me.OPTION, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOne(e, t, r) {
    this.checkIsTarget(e, me.REPETITION_MANDATORY, t, r) || super.walkOption(e, t, r);
  }
  walkAtLeastOneSep(e, t, r) {
    this.checkIsTarget(e, me.REPETITION_MANDATORY_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
  walkMany(e, t, r) {
    this.checkIsTarget(e, me.REPETITION, t, r) || super.walkOption(e, t, r);
  }
  walkManySep(e, t, r) {
    this.checkIsTarget(e, me.REPETITION_WITH_SEPARATOR, t, r) || super.walkOption(e, t, r);
  }
}, Uh = class extends Kn {
  static {
    i(this, "InsideDefinitionFinderVisitor");
  }
  constructor(e, t, r) {
    super(), this.targetOccurrence = e, this.targetProdType = t, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, t) {
    e.idx === this.targetOccurrence && this.targetProdType === t && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, me.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, me.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, me.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, me.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, me.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, me.ALTERNATION);
  }
};
function Eu(e) {
  const t = new Array(e);
  for (let r = 0; r < e; r++)
    t[r] = [];
  return t;
}
i(Eu, "initializeArrayOfArrays");
function hs(e) {
  let t = [""];
  for (let r = 0; r < e.length; r++) {
    const n = e[r], a = [];
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      a.push(o + "_" + n.tokenTypeIdx);
      for (let l = 0; l < n.categoryMatches.length; l++) {
        const u = "_" + n.categoryMatches[l];
        a.push(o + u);
      }
    }
    t = a;
  }
  return t;
}
i(hs, "pathToHashKeys");
function Bh(e, t, r) {
  for (let n = 0; n < e.length; n++) {
    if (n === r)
      continue;
    const a = e[n];
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      if (a[o] === !0)
        return !1;
    }
  }
  return !0;
}
i(Bh, "isUniquePrefixHash");
function Kc(e, t) {
  const r = e.map((o) => xs([o], 1)), n = Eu(r.length), a = r.map((o) => {
    const l = {};
    return o.forEach((u) => {
      hs(u.partialPath).forEach((p) => {
        l[p] = !0;
      });
    }), l;
  });
  let s = r;
  for (let o = 1; o <= t; o++) {
    const l = s;
    s = Eu(l.length);
    for (let u = 0; u < l.length; u++) {
      const c = l[u];
      for (let p = 0; p < c.length; p++) {
        const h = c[p].partialPath, y = c[p].suffixDef, d = hs(h);
        if (Bh(a, d, u) || y.length === 0 || h.length === t) {
          const T = n[u];
          if (Gs(T, h) === !1) {
            T.push(h);
            for (let v = 0; v < d.length; v++) {
              const $ = d[v];
              a[u][$] = !0;
            }
          }
        } else {
          const T = xs(y, o + 1, h);
          s[u] = s[u].concat(T), T.forEach((v) => {
            hs(v.partialPath).forEach((S) => {
              a[u][S] = !0;
            });
          });
        }
      }
    }
  }
  return n;
}
i(Kc, "lookAheadSequenceFromAlternatives");
function Ei(e, t, r, n) {
  const a = new Uh(e, me.ALTERNATION, n);
  return t.accept(a), Kc(a.result, r);
}
i(Ei, "getLookaheadPathsForOr");
function Ci(e, t, r, n) {
  const a = new Uh(e, r);
  t.accept(a);
  const s = a.result, l = new $A(t, e, r).startWalking(), u = new Ve({ definition: s }), c = new Ve({ definition: l });
  return Kc([u, c], n);
}
i(Ci, "getLookaheadPathsForOptionalProd");
function Gs(e, t) {
  e: for (let r = 0; r < e.length; r++) {
    const n = e[r];
    if (n.length === t.length) {
      for (let a = 0; a < n.length; a++) {
        const s = t[a], o = n[a];
        if ((s === o || o.categoryMatchesMap[s.tokenTypeIdx] !== void 0) === !1)
          continue e;
      }
      return !0;
    }
  }
  return !1;
}
i(Gs, "containsPath");
function Vh(e, t) {
  return e.length < t.length && e.every((r, n) => {
    const a = t[n];
    return r === a || a.categoryMatchesMap[r.tokenTypeIdx];
  });
}
i(Vh, "isStrictPrefixOfPath");
function Wc(e) {
  return e.every((t) => t.every((r) => r.every((n) => n.categoryMatches.length === 0)));
}
i(Wc, "areTokenCategoriesNotUsed");
function Kh(e) {
  return e.lookaheadStrategy.validate({
    rules: e.rules,
    tokenTypes: e.tokenTypes,
    grammarName: e.grammarName
  }).map((r) => Object.assign({ type: Fe.CUSTOM_LOOKAHEAD_VALIDATION }, r));
}
i(Kh, "validateLookahead");
function Wh(e, t, r, n) {
  const a = e.flatMap((u) => qh(u, r)), s = ny(e, t, r), o = e.flatMap((u) => Qh(u, r)), l = e.flatMap((u) => Yh(u, e, n, r));
  return a.concat(s, o, l);
}
i(Wh, "validateGrammar");
function qh(e, t) {
  const r = new RA();
  e.accept(r);
  const n = r.allProductions, a = Object.groupBy(n, Hh), s = Object.fromEntries(Object.entries(a).filter(([l, u]) => u.length > 1));
  return Object.values(s).map((l) => {
    const u = l[0], c = t.buildDuplicateFoundError(e, l), p = ut(u), h = {
      message: c,
      type: Fe.DUPLICATE_PRODUCTIONS,
      ruleName: e.name,
      dslName: p,
      occurrence: u.idx
    }, y = qc(u);
    return y && (h.parameter = y), h;
  });
}
i(qh, "validateDuplicateProductions");
function Hh(e) {
  return `${ut(e)}_#_${e.idx}_#_${qc(e)}`;
}
i(Hh, "identifyProductionForDuplicates");
function qc(e) {
  return e instanceof ue ? e.terminalType.name : e instanceof Ge ? e.nonTerminalName : "";
}
i(qc, "getExtraProductionArgument");
var RA = class extends Kn {
  static {
    i(this, "OccurrenceValidationCollector");
  }
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
};
function Yh(e, t, r, n) {
  const a = [];
  if (t.reduce((o, l) => l.name === e.name ? o + 1 : o, 0) > 1) {
    const o = n.buildDuplicateRuleNameError({
      topLevelRule: e,
      grammarName: r
    });
    a.push({
      message: o,
      type: Fe.DUPLICATE_RULE_NAME,
      ruleName: e.name
    });
  }
  return a;
}
i(Yh, "validateRuleDoesNotAlreadyExist");
function Xh(e, t, r) {
  const n = [];
  let a;
  return t.includes(e) || (a = `Invalid rule override, rule: ->${e}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `, n.push({
    message: a,
    type: Fe.INVALID_RULE_OVERRIDE,
    ruleName: e
  })), n;
}
i(Xh, "validateRuleIsOverridden");
function Hc(e, t, r, n = []) {
  const a = [], s = Za(t.definition);
  if (s.length === 0)
    return [];
  {
    const o = e.name;
    s.includes(e) && a.push({
      message: r.buildLeftRecursionError({
        topLevelRule: e,
        leftRecursionPath: n
      }),
      type: Fe.LEFT_RECURSION,
      ruleName: o
    });
    const u = n.concat([e]), p = s.filter((h) => !u.includes(h)).flatMap((h) => {
      const y = [...n];
      return y.push(h), Hc(e, h, r, y);
    });
    return a.concat(p);
  }
}
i(Hc, "validateNoLeftRecursion");
function Za(e) {
  let t = [];
  if (e.length === 0)
    return t;
  const r = e[0];
  if (r instanceof Ge)
    t.push(r.referencedRule);
  else if (r instanceof Ve || r instanceof Ie || r instanceof Je || r instanceof Ze || r instanceof Ke || r instanceof Te)
    t = t.concat(Za(r.definition));
  else if (r instanceof We)
    t = r.definition.map((s) => Za(s.definition)).flat();
  else if (!(r instanceof ue)) throw Error("non exhaustive match");
  const n = ii(r), a = e.length > 1;
  if (n && a) {
    const s = e.slice(1);
    return t.concat(Za(s));
  } else
    return t;
}
i(Za, "getFirstNoneTerminal");
var Yc = class extends Kn {
  static {
    i(this, "OrCollector");
  }
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
};
function Jh(e, t) {
  const r = new Yc();
  return e.accept(r), r.alternations.flatMap((s) => s.definition.slice(0, -1).flatMap((l, u) => Dh([l], [], Hn, 1).length === 0 ? [
    {
      message: t.buildEmptyAlternationError({
        topLevelRule: e,
        alternation: s,
        emptyChoiceIdx: u
      }),
      type: Fe.NONE_LAST_EMPTY_ALT,
      ruleName: e.name,
      occurrence: s.idx,
      alternative: u + 1
    }
  ] : []));
}
i(Jh, "validateEmptyOrAlternative");
function Zh(e, t, r) {
  const n = new Yc();
  e.accept(n);
  let a = n.alternations;
  return a = a.filter((o) => o.ignoreAmbiguities !== !0), a.flatMap((o) => {
    const l = o.idx, u = o.maxLookahead || t, c = Ei(l, e, u, o), p = ty(c, o, e, r), h = ry(c, o, e, r);
    return p.concat(h);
  });
}
i(Zh, "validateAmbiguousAlternationAlternatives");
var AA = class extends Kn {
  static {
    i(this, "RepetitionCollector");
  }
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
};
function Qh(e, t) {
  const r = new Yc();
  return e.accept(r), r.alternations.flatMap((s) => s.definition.length > 255 ? [
    {
      message: t.buildTooManyAlternativesError({
        topLevelRule: e,
        alternation: s
      }),
      type: Fe.TOO_MANY_ALTS,
      ruleName: e.name,
      occurrence: s.idx
    }
  ] : []);
}
i(Qh, "validateTooManyAlts");
function ey(e, t, r) {
  const n = [];
  return e.forEach((a) => {
    const s = new AA();
    a.accept(s), s.allProductions.forEach((l) => {
      const u = ao(l), c = l.maxLookahead || t, p = l.idx;
      if (Ci(p, a, u, c)[0].flat().length === 0) {
        const d = r.buildEmptyRepetitionError({
          topLevelRule: a,
          repetition: l
        });
        n.push({
          message: d,
          type: Fe.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: a.name
        });
      }
    });
  }), n;
}
i(ey, "validateSomeNonEmptyLookaheadPath");
function ty(e, t, r, n) {
  const a = [];
  return e.reduce((l, u, c) => (t.definition[c].ignoreAmbiguities === !0 || u.forEach((p) => {
    const h = [c];
    e.forEach((y, d) => {
      c !== d && Gs(y, p) && // ignore (skip) ambiguities with this "other" alternative
      t.definition[d].ignoreAmbiguities !== !0 && h.push(d);
    }), h.length > 1 && !Gs(a, p) && (a.push(p), l.push({
      alts: h,
      path: p
    }));
  }), l), []).map((l) => {
    const u = l.alts.map((p) => p + 1);
    return {
      message: n.buildAlternationAmbiguityError({
        topLevelRule: r,
        alternation: t,
        ambiguityIndices: u,
        prefixPath: l.path
      }),
      type: Fe.AMBIGUOUS_ALTS,
      ruleName: r.name,
      occurrence: t.idx,
      alternatives: l.alts
    };
  });
}
i(ty, "checkAlternativesAmbiguities");
function ry(e, t, r, n) {
  const a = e.reduce((o, l, u) => {
    const c = l.map((p) => ({ idx: u, path: p }));
    return o.concat(c);
  }, []);
  return a.flatMap((o) => {
    if (t.definition[o.idx].ignoreAmbiguities === !0)
      return [];
    const u = o.idx, c = o.path;
    return a.filter((y) => (
      // ignore (skip) ambiguities with this "other" alternative
      t.definition[y.idx].ignoreAmbiguities !== !0 && y.idx < u && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      Vh(y.path, c)
    )).map((y) => {
      const d = [y.idx + 1, u + 1], A = t.idx === 0 ? "" : t.idx;
      return {
        message: n.buildAlternationPrefixAmbiguityError({
          topLevelRule: r,
          alternation: t,
          ambiguityIndices: d,
          prefixPath: y.path
        }),
        type: Fe.AMBIGUOUS_PREFIX_ALTS,
        ruleName: r.name,
        occurrence: A,
        alternatives: d
      };
    });
  });
}
i(ry, "checkPrefixAlternativesAmbiguities");
function ny(e, t, r) {
  const n = [], a = t.map((s) => s.name);
  return e.forEach((s) => {
    const o = s.name;
    if (a.includes(o)) {
      const l = r.buildNamespaceConflictError(s);
      n.push({
        message: l,
        type: Fe.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: o
      });
    }
  }), n;
}
i(ny, "checkTerminalAndNoneTerminalsNameSpace");
function ay(e) {
  const t = Object.assign({ errMsgProvider: mA }, e), r = {};
  return e.rules.forEach((n) => {
    r[n.name] = n;
  }), Lh(r, t.errMsgProvider);
}
i(ay, "resolveGrammar");
function iy(e) {
  var t;
  const r = (t = e.errMsgProvider) !== null && t !== void 0 ? t : Ir;
  return Wh(e.rules, e.tokenTypes, r, e.grammarName);
}
i(iy, "validateGrammar");
var sy = "MismatchedTokenException", oy = "NoViableAltException", ly = "EarlyExitException", uy = "NotAllInputParsedException", cy = [
  sy,
  oy,
  ly,
  uy
];
Object.freeze(cy);
function oi(e) {
  return cy.includes(e.name);
}
i(oi, "isRecognitionException");
var io = class extends Error {
  static {
    i(this, "RecognitionException");
  }
  constructor(e, t) {
    super(e), this.token = t, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}, fy = class extends io {
  static {
    i(this, "MismatchedTokenException");
  }
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = sy;
  }
}, EA = class extends io {
  static {
    i(this, "NoViableAltException");
  }
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = oy;
  }
}, CA = class extends io {
  static {
    i(this, "NotAllInputParsedException");
  }
  constructor(e, t) {
    super(e, t), this.name = uy;
  }
}, bA = class extends io {
  static {
    i(this, "EarlyExitException");
  }
  constructor(e, t, r) {
    super(e, t), this.previousToken = r, this.name = ly;
  }
}, Po = {}, py = "InRuleRecoveryException", _A = class extends Error {
  static {
    i(this, "InRuleRecoveryException");
  }
  constructor(e) {
    super(e), this.name = py;
  }
}, SA = class {
  static {
    i(this, "Recoverable");
  }
  initRecoverable(e) {
    this.firstAfterRepMap = [], this.resyncFollows = {}, this.recoveryEnabled = Object.hasOwn(e, "recoveryEnabled") ? e.recoveryEnabled : Kt.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = dy);
  }
  getTokenToInsert(e) {
    const t = to(e, "", -1, -1, -1, -1, -1, -1);
    return t.isInsertedInRecovery = !0, t;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return !0;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return !0;
  }
  tryInRepetitionRecovery(e, t, r, n) {
    const a = this.findReSyncTokenType(), s = this.exportLexerState(), o = [];
    let l = !1;
    const u = this.LA_FAST(1);
    let c = this.LA_FAST(1);
    const p = /* @__PURE__ */ i(() => {
      const h = this.LA(0), y = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: n,
        actual: u,
        previous: h,
        ruleName: this.getCurrRuleFullName()
      }), d = new fy(y, u, this.LA(0));
      d.resyncedTokens = o.slice(0, -1), this.SAVE_ERROR(d);
    }, "generateErrorMessage");
    for (; !l; )
      if (this.tokenMatcher(c, n)) {
        p();
        return;
      } else if (r.call(this)) {
        p(), e.apply(this, t);
        return;
      } else this.tokenMatcher(c, a) ? l = !0 : (c = this.SKIP_TOKEN(), this.addToResyncTokens(c, o));
    this.importLexerState(s);
  }
  shouldInRepetitionRecoveryBeTried(e, t, r) {
    return !(r === !1 || this.tokenMatcher(this.LA_FAST(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)));
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const t = e.ruleStack[0], n = this.getGAstProductions()[t];
    return new gA(n, e).startWalking();
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(e, t) {
    const r = this.getCurrentGrammarPath(e, t);
    return this.getNextPossibleTokenTypes(r);
  }
  tryInRuleRecovery(e, t) {
    if (this.canRecoverWithSingleTokenInsertion(e, t))
      return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      const r = this.SKIP_TOKEN();
      return this.consumeToken(), r;
    }
    throw new _A("sad sad panda");
  }
  canPerformInRuleRecovery(e, t) {
    return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, t) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || t.length === 0)
      return !1;
    const r = this.LA_FAST(1);
    return t.find((a) => this.tokenMatcher(r, a)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(
      // not using LA_FAST because LA(2) might be un-safe with maxLookahead=1
      // in some edge cases (?)
      this.LA(2),
      e
    ) : !1;
  }
  isInCurrentRuleReSyncSet(e) {
    const t = this.getCurrFollowKey();
    return this.getFollowSetFromFollowKey(t).includes(e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let t = this.LA_FAST(1), r = 2;
    for (; ; ) {
      const n = e.find((a) => ro(t, a));
      if (n !== void 0)
        return n;
      t = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK_IDX === 0)
      return Po;
    const e = this.currRuleShortName, t = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: t,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, t = this.RULE_OCCURRENCE_STACK, r = this.RULE_STACK_IDX + 1, n = new Array(r);
    for (let a = 0; a < r; a++)
      a === 0 ? n[a] = Po : n[a] = {
        ruleName: this.shortRuleNameToFullName(e[a]),
        idxInCallingRule: t[a],
        inRule: this.shortRuleNameToFullName(e[a - 1])
      };
    return n;
  }
  flattenFollowSet() {
    return this.buildFullFollowKeyStack().map((t) => this.getFollowSetFromFollowKey(t)).flat();
  }
  getFollowSetFromFollowKey(e) {
    if (e === Po)
      return [Vt];
    const t = e.ruleName + e.idxInCallingRule + Jm + e.inRule;
    return this.resyncFollows[t];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, t) {
    return this.tokenMatcher(e, Vt) || t.push(e), t;
  }
  reSyncTo(e) {
    const t = [];
    let r = this.LA_FAST(1);
    for (; this.tokenMatcher(r, e) === !1; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, t);
    return t.slice(0, -1);
  }
  attemptInRepetitionRecovery(e, t, r, n, a, s, o) {
  }
  getCurrentGrammarPath(e, t) {
    const r = this.getHumanReadableRuleStack(), n = this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1);
    return {
      ruleStack: r,
      occurrenceStack: n,
      lastTok: e,
      lastTokOccurrence: t
    };
  }
  getHumanReadableRuleStack() {
    const e = this.RULE_STACK_IDX + 1, t = new Array(e);
    for (let r = 0; r < e; r++)
      t[r] = this.shortRuleNameToFullName(this.RULE_STACK[r]);
    return t;
  }
};
function dy(e, t, r, n, a, s, o) {
  var l, u, c;
  const p = n | a, h = (l = (u = this.firstAfterRepMap)[c = this.currRuleShortName]) !== null && l !== void 0 ? l : u[c] = [];
  let y = h[p];
  if (y === void 0) {
    const v = this.getCurrRuleFullName(), $ = this.getGAstProductions()[v];
    y = new s($, a).startWalking(), h[p] = y;
  }
  let d = y.token, A = y.occurrence;
  const T = y.isEndOfRule;
  this.RULE_STACK_IDX === 0 && T && d === void 0 && (d = Vt, A = 1), !(d === void 0 || A === void 0) && this.shouldInRepetitionRecoveryBeTried(d, A, o) && this.tryInRepetitionRecovery(e, t, r, d);
}
i(dy, "attemptInRepetitionRecovery");
var Xn = 8, my = 1 << Xn, hy = 2 << Xn, Cu = 3 << Xn, bu = 4 << Xn, _u = 5 << Xn, ys = 6 << Xn, Xc = class {
  static {
    i(this, "LLkLookaheadStrategy");
  }
  constructor(e) {
    var t;
    this.maxLookahead = (t = e?.maxLookahead) !== null && t !== void 0 ? t : Kt.maxLookahead;
  }
  validate(e) {
    const t = this.validateNoLeftRecursion(e.rules);
    if (t.length === 0) {
      const r = this.validateEmptyOrAlternatives(e.rules), n = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), a = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [
        ...t,
        ...r,
        ...n,
        ...a
      ];
    }
    return t;
  }
  validateNoLeftRecursion(e) {
    return e.flatMap((t) => Hc(t, t, Ir));
  }
  validateEmptyOrAlternatives(e) {
    return e.flatMap((t) => Jh(t, Ir));
  }
  validateAmbiguousAlternationAlternatives(e, t) {
    return e.flatMap((r) => Zh(r, t, Ir));
  }
  validateSomeNonEmptyLookaheadPath(e, t) {
    return ey(e, t, Ir);
  }
  buildLookaheadForAlternation(e) {
    return Gh(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, jh);
  }
  buildLookaheadForOptional(e) {
    return Fh(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, ao(e.prodType), zh);
  }
}, wA = class {
  static {
    i(this, "LooksAhead");
  }
  initLooksAhead(e) {
    this.dynamicTokensEnabled = Object.hasOwn(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Kt.dynamicTokensEnabled, this.maxLookahead = Object.hasOwn(e, "maxLookahead") ? e.maxLookahead : Kt.maxLookahead, this.lookaheadStrategy = Object.hasOwn(e, "lookaheadStrategy") ? e.lookaheadStrategy : new Xc({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = [], this.currRuleLookaheadFuncs = [];
  }
  preComputeLookaheadFunctions(e) {
    e.forEach((t) => {
      this.TRACE_INIT(`${t.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: n, option: a, repetitionMandatory: s, repetitionMandatoryWithSeparator: o, repetitionWithSeparator: l } = yy(t);
        r.forEach((u) => {
          const c = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${ut(u)}${c}`, () => {
            const p = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: t,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            });
            this.setLaFuncCache(this.fullRuleNameToShort[t.name], my | u.idx, p);
          });
        }), n.forEach((u) => {
          this.computeLookaheadFunc(t, u.idx, Cu, "Repetition", u.maxLookahead, ut(u));
        }), a.forEach((u) => {
          this.computeLookaheadFunc(t, u.idx, hy, "Option", u.maxLookahead, ut(u));
        }), s.forEach((u) => {
          this.computeLookaheadFunc(t, u.idx, bu, "RepetitionMandatory", u.maxLookahead, ut(u));
        }), o.forEach((u) => {
          this.computeLookaheadFunc(t, u.idx, ys, "RepetitionMandatoryWithSeparator", u.maxLookahead, ut(u));
        }), l.forEach((u) => {
          this.computeLookaheadFunc(t, u.idx, _u, "RepetitionWithSeparator", u.maxLookahead, ut(u));
        });
      });
    });
  }
  computeLookaheadFunc(e, t, r, n, a, s) {
    this.TRACE_INIT(`${s}${t === 0 ? "" : t}`, () => {
      const o = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence: t,
        rule: e,
        maxLookahead: a || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType: n
      });
      this.setLaFuncCache(this.fullRuleNameToShort[e.name], r | t, o);
    });
  }
  setLaFuncCache(e, t, r) {
    let n = this.lookAheadFuncsCache[e];
    n === void 0 && (n = [], this.lookAheadFuncsCache[e] = n), n[t] = r;
  }
}, PA = class extends Kn {
  static {
    i(this, "DslMethodsCollectorVisitor");
  }
  constructor() {
    super(...arguments), this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}, Ni = new PA();
function yy(e) {
  Ni.reset(), e.accept(Ni);
  const t = Ni.dslMethods;
  return Ni.reset(), t;
}
i(yy, "collectMethods");
function Su(e, t) {
  e.startOffset === -1 ? (e.startOffset = t.startOffset, e.endOffset = t.endOffset) : e.endOffset < t.endOffset && (e.endOffset = t.endOffset);
}
i(Su, "setNodeLocationOnlyOffset");
function wu(e, t) {
  e.startOffset === -1 ? (e.startOffset = t.startOffset, e.startColumn = t.startColumn, e.startLine = t.startLine, e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine) : e.endOffset < t.endOffset && (e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine);
}
i(wu, "setNodeLocationFull");
function gy(e, t, r) {
  e.children[r] === void 0 ? e.children[r] = [t] : e.children[r].push(t);
}
i(gy, "addTerminalToCst");
function vy(e, t, r) {
  e.children[t] === void 0 ? e.children[t] = [r] : e.children[t].push(r);
}
i(vy, "addNoneTerminalToCst");
var kA = "name";
function Jc(e, t) {
  Object.defineProperty(e, kA, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: t
  });
}
i(Jc, "defineNameProp");
function Ty(e, t) {
  const r = Object.keys(e), n = r.length;
  for (let a = 0; a < n; a++) {
    const s = r[a], o = e[s], l = o.length;
    for (let u = 0; u < l; u++) {
      const c = o[u];
      c.tokenTypeIdx === void 0 && this[c.name](c.children, t);
    }
  }
}
i(Ty, "defaultVisit");
function $y(e, t) {
  const r = /* @__PURE__ */ i(function() {
  }, "derivedConstructor");
  Jc(r, e + "BaseSemantics");
  const n = {
    visit: /* @__PURE__ */ i(function(a, s) {
      if (Array.isArray(a) && (a = a[0]), a !== void 0)
        return this[a.name](a.children, s);
    }, "visit"),
    validateVisitor: /* @__PURE__ */ i(function() {
      const a = Ay(this, t);
      if (a.length !== 0) {
        const s = a.map((o) => o.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${s.join(`

`).replace(/\n/g, `
	`)}`);
      }
    }, "validateVisitor")
  };
  return r.prototype = n, r.prototype.constructor = r, r._RULE_NAMES = t, r;
}
i($y, "createBaseSemanticVisitorConstructor");
function Ry(e, t, r) {
  const n = /* @__PURE__ */ i(function() {
  }, "derivedConstructor");
  Jc(n, e + "BaseSemanticsWithDefaults");
  const a = Object.create(r.prototype);
  return t.forEach((s) => {
    a[s] = Ty;
  }), n.prototype = a, n.prototype.constructor = n, n;
}
i(Ry, "createBaseVisitorConstructorWithDefaults");
var Pu;
(function(e) {
  e[e.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", e[e.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Pu || (Pu = {}));
function Ay(e, t) {
  return Ey(e, t);
}
i(Ay, "validateVisitor");
function Ey(e, t) {
  return t.filter((a) => typeof e[a] != "function").map((a) => ({
    msg: `Missing visitor method: <${a}> on ${e.constructor.name} CST Visitor.`,
    type: Pu.MISSING_METHOD,
    methodName: a
  })).filter(Boolean);
}
i(Ey, "validateMissingCstMethods");
var IA = class {
  static {
    i(this, "TreeBuilder");
  }
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = Object.hasOwn(e, "nodeLocationTracking") ? e.nodeLocationTracking : Kt.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = () => {
      }, this.cstFinallyStateUpdate = () => {
      }, this.cstPostTerminal = () => {
      }, this.cstPostNonTerminal = () => {
      }, this.cstPostRule = () => {
      };
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = wu, this.setNodeLocationFromNode = wu, this.cstPostRule = () => {
      }, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = () => {
      }, this.setNodeLocationFromNode = () => {
      }, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = Su, this.setNodeLocationFromNode = Su, this.cstPostRule = () => {
      }, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = () => {
      }, this.setNodeLocationFromNode = () => {
      }, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = () => {
      }, this.setNodeLocationFromNode = () => {
      }, this.cstPostRule = () => {
      }, this.setInitialNodeLocation = () => {
      };
    else
      throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = {
      startOffset: -1,
      endOffset: -1
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA_FAST(1).startOffset,
      endOffset: -1
    };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = {
      startOffset: -1,
      startLine: -1,
      startColumn: -1,
      endOffset: -1,
      endLine: -1,
      endColumn: -1
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(e) {
    const t = this.LA_FAST(1);
    e.location = {
      startOffset: t.startOffset,
      startLine: t.startLine,
      startColumn: t.startColumn,
      endOffset: -1,
      endLine: -1,
      endColumn: -1
    };
  }
  cstInvocationStateUpdate(e) {
    const t = {
      name: e,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(t), this.CST_STACK.push(t);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset !== -1 && r.startOffset <= t.startOffset ? (r.endOffset = t.endOffset, r.endLine = t.endLine, r.endColumn = t.endColumn) : (r.startOffset = -1, r.startLine = -1, r.startColumn = -1);
  }
  cstPostRuleOnlyOffset(e) {
    const t = this.LA(0), r = e.location;
    r.startOffset !== -1 && r.startOffset <= t.startOffset ? r.endOffset = t.endOffset : r.startOffset = -1;
  }
  cstPostTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    gy(r, t, e), this.setNodeLocationFromToken(r.location, t);
  }
  cstPostNonTerminal(e, t) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    vy(r, t, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  get currCSTNode() {
    const e = this;
    return e.CST_STACK[e.CST_STACK.length - 1];
  }
  getBaseCstVisitorConstructor() {
    if (this.baseCstVisitorConstructor === void 0) {
      const e = $y(this.className, Object.keys(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (this.baseCstVisitorWithDefaultsConstructor === void 0) {
      const e = Ry(this.className, Object.keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getPreviousExplicitRuleShortName() {
    return this.RULE_STACK[this.RULE_STACK_IDX - 1];
  }
  getLastExplicitRuleOccurrenceIndex() {
    return this.RULE_OCCURRENCE_STACK[this.RULE_OCCURRENCE_STACK_IDX];
  }
}, NA = class {
  static {
    i(this, "LexerAdapter");
  }
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== !0)
      throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVectorLength - 2 ? (this.consumeToken(), this.LA_FAST(1)) : Gn;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  // Performance Optimized version of LA without bound checks
  // note that token beyond the end of the token vector EOF Token will still be returned
  // due to using sentinels at the end of the token vector. (for K=max lookahead)
  LA_FAST(e) {
    const t = this.currIdx + e;
    return this.tokVector[t];
  }
  LA(e) {
    const t = this.currIdx + e;
    return t < 0 || this.tokVectorLength <= t ? Gn : this.tokVector[t];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVectorLength - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}, OA = class {
  static {
    i(this, "RecognizerApi");
  }
  ACTION(e) {
    return e.call(this);
  }
  consume(e, t, r) {
    return this.consumeInternal(t, e, r);
  }
  subrule(e, t, r) {
    return this.subruleInternal(t, e, r);
  }
  option(e, t) {
    return this.optionInternal(t, e);
  }
  or(e, t) {
    return this.orInternal(t, e);
  }
  many(e, t) {
    return this.manyInternal(e, t);
  }
  atLeastOne(e, t) {
    return this.atLeastOneInternal(e, t);
  }
  CONSUME(e, t) {
    return this.consumeInternal(e, 0, t);
  }
  CONSUME1(e, t) {
    return this.consumeInternal(e, 1, t);
  }
  CONSUME2(e, t) {
    return this.consumeInternal(e, 2, t);
  }
  CONSUME3(e, t) {
    return this.consumeInternal(e, 3, t);
  }
  CONSUME4(e, t) {
    return this.consumeInternal(e, 4, t);
  }
  CONSUME5(e, t) {
    return this.consumeInternal(e, 5, t);
  }
  CONSUME6(e, t) {
    return this.consumeInternal(e, 6, t);
  }
  CONSUME7(e, t) {
    return this.consumeInternal(e, 7, t);
  }
  CONSUME8(e, t) {
    return this.consumeInternal(e, 8, t);
  }
  CONSUME9(e, t) {
    return this.consumeInternal(e, 9, t);
  }
  SUBRULE(e, t) {
    return this.subruleInternal(e, 0, t);
  }
  SUBRULE1(e, t) {
    return this.subruleInternal(e, 1, t);
  }
  SUBRULE2(e, t) {
    return this.subruleInternal(e, 2, t);
  }
  SUBRULE3(e, t) {
    return this.subruleInternal(e, 3, t);
  }
  SUBRULE4(e, t) {
    return this.subruleInternal(e, 4, t);
  }
  SUBRULE5(e, t) {
    return this.subruleInternal(e, 5, t);
  }
  SUBRULE6(e, t) {
    return this.subruleInternal(e, 6, t);
  }
  SUBRULE7(e, t) {
    return this.subruleInternal(e, 7, t);
  }
  SUBRULE8(e, t) {
    return this.subruleInternal(e, 8, t);
  }
  SUBRULE9(e, t) {
    return this.subruleInternal(e, 9, t);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, t, r = Fs) {
    if (this.definedRulesNames.includes(e)) {
      const s = {
        message: Ir.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }),
        type: Fe.DUPLICATE_RULE_NAME,
        ruleName: e
      };
      this.definitionErrors.push(s);
    }
    this.definedRulesNames.push(e);
    const n = this.defineRule(e, t, r);
    return this[e] = n, n;
  }
  OVERRIDE_RULE(e, t, r = Fs) {
    const n = Xh(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(n);
    const a = this.defineRule(e, t, r);
    return this[e] = a, a;
  }
  BACKTRACK(e, t) {
    var r;
    const n = (r = e.coreRule) !== null && r !== void 0 ? r : e;
    return function() {
      this.isBackTrackingStack.push(1);
      const a = this.saveRecogState();
      try {
        return n.apply(this, t), !0;
      } catch (s) {
        if (oi(s))
          return !1;
        throw s;
      } finally {
        this.reloadRecogState(a), this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return Km(Object.values(this.gastProductionsCache));
  }
}, MA = class {
  static {
    i(this, "RecognizerEngine");
  }
  initRecognizerEngine(e, t) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = [], this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 0, this.tokenMatcher = si, this.subruleIdx = 0, this.currRuleShortName = -1, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK = [], this.RULE_OCCURRENCE_STACK_IDX = -1, this.gastProductionsCache = {}, Object.hasOwn(t, "serializedGrammar"))
      throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (Array.isArray(e)) {
      if (e.length === 0)
        throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number")
        throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (Array.isArray(e))
      this.tokensMap = e.reduce((a, s) => (a[s.name] = s, a), {});
    else if (Object.hasOwn(e, "modes") && Object.values(e.modes).flat().every(Oh)) {
      const a = Object.values(e.modes).flat(), s = [...new Set(a)];
      this.tokensMap = s.reduce((o, l) => (o[l.name] = l, o), {});
    } else if (typeof e == "object" && e !== null)
      this.tokensMap = Object.assign({}, e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = Vt;
    const n = (Object.hasOwn(e, "modes") ? Object.values(e.modes).flat() : Object.values(e)).every(
      // intentional "==" to also cover "undefined"
      (a) => {
        var s;
        return ((s = a.categoryMatches) === null || s === void 0 ? void 0 : s.length) == 0;
      }
    );
    this.tokenMatcher = n ? si : Hn, Yn(Object.values(this.tokensMap));
  }
  defineRule(e, t, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const n = Object.hasOwn(r, "resyncEnabled") ? r.resyncEnabled : Fs.resyncEnabled, a = Object.hasOwn(r, "recoveryValueFunc") ? r.recoveryValueFunc : Fs.recoveryValueFunc, s = this.ruleShortNameIdx++;
    this.shortRuleNameToFull[s] = e, this.fullRuleNameToShort[e] = s;
    let o;
    return this.outputCst === !0 ? o = /* @__PURE__ */ i(function(...p) {
      try {
        this.ruleInvocationStateUpdate(s, e, this.subruleIdx), t.apply(this, p);
        const h = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(h), h;
      } catch (h) {
        return this.invokeRuleCatch(h, n, a);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, "invokeRuleWithTry") : o = /* @__PURE__ */ i(function(...p) {
      try {
        return this.ruleInvocationStateUpdate(s, e, this.subruleIdx), t.apply(this, p);
      } catch (h) {
        return this.invokeRuleCatch(h, n, a);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, "invokeRuleWithTryCst"), Object.assign(/* @__PURE__ */ i(function(...p) {
      this.onBeforeParse(e);
      try {
        return o.apply(this, p);
      } finally {
        this.onAfterParse(e);
      }
    }, "rootRule"), { ruleName: e, originalGrammarAction: t, coreRule: o });
  }
  invokeRuleCatch(e, t, r) {
    const n = this.RULE_STACK_IDX === 0, a = t && !this.isBackTracking() && this.recoveryEnabled;
    if (oi(e)) {
      const s = e;
      if (a) {
        const o = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(o))
          if (s.resyncedTokens = this.reSyncTo(o), this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            return l.recoveredNode = !0, l;
          } else
            return r(e);
        else {
          if (this.outputCst) {
            const l = this.CST_STACK[this.CST_STACK.length - 1];
            l.recoveredNode = !0, s.partialCstResult = l;
          }
          throw s;
        }
      } else {
        if (n)
          return this.moveToTerminatedState(), r(e);
        throw s;
      }
    } else
      throw e;
  }
  // Implementation of parsing DSL
  optionInternal(e, t) {
    const r = hy | t;
    return this.optionInternalLogic(e, t, r);
  }
  optionInternalLogic(e, t, r) {
    let n = this.currRuleLookaheadFuncs[r], a;
    if (typeof e != "function") {
      a = e.DEF;
      const s = e.GATE;
      if (s !== void 0) {
        const o = n;
        n = /* @__PURE__ */ i(() => s.call(this) && o.call(this), "lookAheadFunc");
      }
    } else
      a = e;
    if (n.call(this) === !0)
      return a.call(this);
  }
  atLeastOneInternal(e, t) {
    const r = bu | e;
    return this.atLeastOneInternalLogic(e, t, r);
  }
  atLeastOneInternalLogic(e, t, r) {
    let n = this.currRuleLookaheadFuncs[r], a;
    if (typeof t != "function") {
      a = t.DEF;
      const s = t.GATE;
      if (s !== void 0) {
        const o = n;
        n = /* @__PURE__ */ i(() => s.call(this) && o.call(this), "lookAheadFunc");
      }
    } else
      a = t;
    if (n.call(this) === !0) {
      let s = this.doSingleRepetition(a);
      for (; n.call(this) === !0 && s === !0; )
        s = this.doSingleRepetition(a);
    } else
      throw this.raiseEarlyExitException(e, me.REPETITION_MANDATORY, t.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], n, bu, e, TA);
  }
  atLeastOneSepFirstInternal(e, t) {
    const r = ys | e;
    this.atLeastOneSepFirstInternalLogic(e, t, r);
  }
  atLeastOneSepFirstInternalLogic(e, t, r) {
    const n = t.DEF, a = t.SEP;
    if (this.currRuleLookaheadFuncs[r].call(this) === !0) {
      n.call(this);
      const o = /* @__PURE__ */ i(() => this.tokenMatcher(this.LA_FAST(1), a), "separatorLookAheadFunc");
      for (; this.tokenMatcher(this.LA_FAST(1), a) === !0; )
        this.CONSUME(a), n.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        a,
        o,
        n,
        Yf
      ], o, ys, e, Yf);
    } else
      throw this.raiseEarlyExitException(e, me.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG);
  }
  manyInternal(e, t) {
    const r = Cu | e;
    return this.manyInternalLogic(e, t, r);
  }
  manyInternalLogic(e, t, r) {
    let n = this.currRuleLookaheadFuncs[r], a;
    if (typeof t != "function") {
      a = t.DEF;
      const o = t.GATE;
      if (o !== void 0) {
        const l = n;
        n = /* @__PURE__ */ i(() => o.call(this) && l.call(this), "lookaheadFunction");
      }
    } else
      a = t;
    let s = !0;
    for (; n.call(this) === !0 && s === !0; )
      s = this.doSingleRepetition(a);
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [e, t],
      n,
      Cu,
      e,
      vA,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      s
    );
  }
  manySepFirstInternal(e, t) {
    const r = _u | e;
    this.manySepFirstInternalLogic(e, t, r);
  }
  manySepFirstInternalLogic(e, t, r) {
    const n = t.DEF, a = t.SEP;
    if (this.currRuleLookaheadFuncs[r].call(this) === !0) {
      n.call(this);
      const o = /* @__PURE__ */ i(() => this.tokenMatcher(this.LA_FAST(1), a), "separatorLookAheadFunc");
      for (; this.tokenMatcher(this.LA_FAST(1), a) === !0; )
        this.CONSUME(a), n.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        a,
        o,
        n,
        Hf
      ], o, _u, e, Hf);
    }
  }
  repetitionSepSecondInternal(e, t, r, n, a) {
    for (; r(); )
      this.CONSUME(t), n.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      e,
      t,
      r,
      n,
      a
    ], r, ys, e, a);
  }
  doSingleRepetition(e) {
    const t = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > t;
  }
  orInternal(e, t) {
    const r = my | t, n = Array.isArray(e) ? e : e.DEF, s = this.currRuleLookaheadFuncs[r].call(this, n);
    if (s !== void 0)
      return n[s].ALT.call(this);
    this.raiseNoAltException(t, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    this.RULE_STACK_IDX--, this.RULE_OCCURRENCE_STACK_IDX--, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX], this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[this.currRuleShortName]), this.cstFinallyStateUpdate();
  }
  subruleInternal(e, t, r) {
    let n;
    try {
      const a = r !== void 0 ? r.ARGS : void 0;
      return this.subruleIdx = t, n = e.coreRule.apply(this, a), this.cstPostNonTerminal(n, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), n;
    } catch (a) {
      throw this.subruleInternalError(a, r, e.ruleName);
    }
  }
  subruleInternalError(e, t, r) {
    throw oi(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, t !== void 0 && t.LABEL !== void 0 ? t.LABEL : r), delete e.partialCstResult), e;
  }
  consumeInternal(e, t, r) {
    let n;
    try {
      const a = this.LA_FAST(1);
      this.tokenMatcher(a, e) === !0 ? (this.consumeToken(), n = a) : this.consumeInternalError(e, a, r);
    } catch (a) {
      n = this.consumeInternalRecovery(e, t, a);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, n), n;
  }
  consumeInternalError(e, t, r) {
    let n;
    const a = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? n = r.ERR_MSG : n = this.errorMessageProvider.buildMismatchTokenMessage({
      expected: e,
      actual: t,
      previous: a,
      ruleName: this.getCurrRuleFullName()
    }), this.SAVE_ERROR(new fy(n, t, a));
  }
  consumeInternalRecovery(e, t, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const n = this.getFollowsForInRuleRecovery(e, t);
      try {
        return this.tryInRuleRecovery(e, n);
      } catch (a) {
        throw a.name === py ? r : a;
      }
    } else
      throw r;
  }
  saveRecogState() {
    const e = this.errors, t = this.RULE_STACK.slice(0, this.RULE_STACK_IDX + 1);
    return {
      errors: e,
      lexerState: this.exportLexerState(),
      RULE_STACK: t,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState);
    const t = e.RULE_STACK;
    for (let r = 0; r < t.length; r++)
      this.RULE_STACK[r] = t[r];
    this.RULE_STACK_IDX = t.length - 1, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX], this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[this.currRuleShortName]);
  }
  ruleInvocationStateUpdate(e, t, r) {
    this.RULE_OCCURRENCE_STACK[++this.RULE_OCCURRENCE_STACK_IDX] = r, this.RULE_STACK[++this.RULE_STACK_IDX] = e, this.currRuleShortName = e, this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[e], this.cstInvocationStateUpdate(t);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const e = this.currRuleShortName;
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), Vt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.currRuleShortName = -1, this.currRuleLookaheadFuncs = [], this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK_IDX = -1, this.CST_STACK = [];
  }
  /**
   * Hook called before the root-level parsing rule is invoked.
   * This is only called when a rule is invoked directly by the consumer
   * (e.g., `parser.json()`), not when invoked as a sub-rule via SUBRULE.
   *
   * Override this method to perform actions before parsing begins.
   * The default implementation is a no-op.
   *
   * @param ruleName - The name of the root rule being invoked.
   */
  onBeforeParse(e) {
    for (let t = 0; t < this.maxLookahead + 1; t++)
      this.tokVector.push(Gn);
  }
  /**
   * Hook called after the root-level parsing rule has completed (or thrown).
   * This is only called when a rule is invoked directly by the consumer
   * (e.g., `parser.json()`), not when invoked as a sub-rule via SUBRULE.
   *
   * This hook is called in a `finally` block, so it executes regardless of
   * whether parsing succeeded or threw an error.
   *
   * Override this method to perform actions after parsing completes.
   * The default implementation is a no-op.
   *
   * @param ruleName - The name of the root rule that was invoked.
   */
  onAfterParse(e) {
    if (this.isAtEndOfInput() === !1) {
      const t = this.LA(1), r = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: t,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new CA(r, t));
    }
    for (; this.tokVector.at(-1) === Gn; )
      this.tokVector.pop();
  }
}, LA = class {
  static {
    i(this, "ErrorHandler");
  }
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = Object.hasOwn(e, "errorMessageProvider") ? e.errorMessageProvider : Kt.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (oi(e))
      return e.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1)
      }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return [...this._errors];
  }
  set errors(e) {
    this._errors = e;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(e, t, r) {
    const n = this.getCurrRuleFullName(), a = this.getGAstProductions()[n], o = Ci(e, a, t, this.maxLookahead)[0], l = [];
    for (let c = 1; c <= this.maxLookahead; c++)
      l.push(this.LA(c));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: o,
      actual: l,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: n
    });
    throw this.SAVE_ERROR(new bA(u, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, t) {
    const r = this.getCurrRuleFullName(), n = this.getGAstProductions()[r], a = Ei(e, n, this.maxLookahead), s = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      s.push(this.LA(u));
    const o = this.LA(0), l = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: a,
      actual: s,
      previous: o,
      customUserDescription: t,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new EA(l, this.LA(1), o));
  }
}, so = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(so);
var Xf = !0, Jf = 255, Cy = Vc({ name: "RECORDING_PHASE_TOKEN", pattern: Be.NA });
Yn([Cy]);
var by = to(
  Cy,
  `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  // Negative positions are less likely to cause errors if the output of LA or CONSUME
  // is incorrectly used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(by);
var DA = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
}, xA = class {
  static {
    i(this, "GastRecorder");
  }
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = !1;
  }
  enableRecording() {
    this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        const t = e > 0 ? e : "";
        this[`CONSUME${t}`] = function(r, n) {
          return this.consumeInternalRecord(r, e, n);
        }, this[`SUBRULE${t}`] = function(r, n) {
          return this.subruleInternalRecord(r, e, n);
        }, this[`OPTION${t}`] = function(r) {
          return this.optionInternalRecord(r, e);
        }, this[`OR${t}`] = function(r) {
          return this.orInternalRecord(r, e);
        }, this[`MANY${t}`] = function(r) {
          this.manyInternalRecord(e, r);
        }, this[`MANY_SEP${t}`] = function(r) {
          this.manySepFirstInternalRecord(e, r);
        }, this[`AT_LEAST_ONE${t}`] = function(r) {
          this.atLeastOneInternalRecord(e, r);
        }, this[`AT_LEAST_ONE_SEP${t}`] = function(r) {
          this.atLeastOneSepFirstInternalRecord(e, r);
        };
      }
      this.consume = function(e, t, r) {
        return this.consumeInternalRecord(t, e, r);
      }, this.subrule = function(e, t, r) {
        return this.subruleInternalRecord(t, e, r);
      }, this.option = function(e, t) {
        return this.optionInternalRecord(t, e);
      }, this.or = function(e, t) {
        return this.orInternalRecord(t, e);
      }, this.many = function(e, t) {
        this.manyInternalRecord(e, t);
      }, this.atLeastOne = function(e, t) {
        this.atLeastOneInternalRecord(e, t);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => {
      const e = this;
      for (let t = 0; t < 10; t++) {
        const r = t > 0 ? t : "";
        delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(e) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(e, t) {
    return () => !0;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(e) {
    return Gn;
  }
  topLevelRuleRecord(e, t) {
    try {
      const r = new Vn({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), t.call(this), this.recordingProdStack.pop(), r;
    } catch (r) {
      if (r.KNOWN_RECORDER_ERROR !== !0)
        try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
      throw r;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(e, t) {
    return Rn.call(this, Ie, e, t);
  }
  atLeastOneInternalRecord(e, t) {
    Rn.call(this, Je, t, e);
  }
  atLeastOneSepFirstInternalRecord(e, t) {
    Rn.call(this, Ze, t, e, Xf);
  }
  manyInternalRecord(e, t) {
    Rn.call(this, Te, t, e);
  }
  manySepFirstInternalRecord(e, t) {
    Rn.call(this, Ke, t, e, Xf);
  }
  orInternalRecord(e, t) {
    return _y.call(this, e, t);
  }
  subruleInternalRecord(e, t, r) {
    if (li(t), !e || !Object.hasOwn(e, "ruleName")) {
      const o = new Error(`<SUBRULE${ku(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw o.KNOWN_RECORDER_ERROR = !0, o;
    }
    const n = this.recordingProdStack.at(-1), a = e.ruleName, s = new Ge({
      idx: t,
      nonTerminalName: a,
      label: r?.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return n.definition.push(s), this.outputCst ? DA : so;
  }
  consumeInternalRecord(e, t, r) {
    if (li(t), !Uc(e)) {
      const s = new Error(`<CONSUME${ku(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw s.KNOWN_RECORDER_ERROR = !0, s;
    }
    const n = this.recordingProdStack.at(-1), a = new ue({
      idx: t,
      terminalType: e,
      label: r?.LABEL
    });
    return n.definition.push(a), by;
  }
};
function Rn(e, t, r, n = !1) {
  li(r);
  const a = this.recordingProdStack.at(-1), s = typeof t == "function" ? t : t.DEF, o = new e({ definition: [], idx: r });
  return n && (o.separator = t.SEP), Object.hasOwn(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD), this.recordingProdStack.push(o), s.call(this), a.definition.push(o), this.recordingProdStack.pop(), so;
}
i(Rn, "recordProd");
function _y(e, t) {
  li(t);
  const r = this.recordingProdStack.at(-1), n = Array.isArray(e) === !1, a = n === !1 ? e : e.DEF, s = new We({
    definition: [],
    idx: t,
    ignoreAmbiguities: n && e.IGNORE_AMBIGUITIES === !0
  });
  Object.hasOwn(e, "MAX_LOOKAHEAD") && (s.maxLookahead = e.MAX_LOOKAHEAD);
  const o = a.some((l) => typeof l.GATE == "function");
  return s.hasPredicates = o, r.definition.push(s), a.forEach((l) => {
    const u = new Ve({ definition: [] });
    s.definition.push(u), Object.hasOwn(l, "IGNORE_AMBIGUITIES") ? u.ignoreAmbiguities = l.IGNORE_AMBIGUITIES : Object.hasOwn(l, "GATE") && (u.ignoreAmbiguities = !0), this.recordingProdStack.push(u), l.ALT.call(this), this.recordingProdStack.pop();
  }), so;
}
i(_y, "recordOrProd");
function ku(e) {
  return e === 0 ? "" : `${e}`;
}
i(ku, "getIdxSuffix");
function li(e) {
  if (e < 0 || e > Jf) {
    const t = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${e}>
	Idx value must be a none negative value smaller than ${Jf + 1}`
    );
    throw t.KNOWN_RECORDER_ERROR = !0, t;
  }
}
i(li, "assertMethodIdxIsValid");
var GA = class {
  static {
    i(this, "PerformanceTracer");
  }
  initPerformanceTracer(e) {
    if (Object.hasOwn(e, "traceInitPerf")) {
      const t = e.traceInitPerf, r = typeof t == "number";
      this.traceInitMaxIdent = r ? t : 1 / 0, this.traceInitPerf = r ? t > 0 : t;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = Kt.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, t) {
    if (this.traceInitPerf === !0) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: n, value: a } = Dc(t), s = n > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && s(`${r}<-- <${e}> time: ${n}ms`), this.traceInitIndent--, a;
    } else
      return t();
  }
};
function Sy(e, t) {
  t.forEach((r) => {
    const n = r.prototype;
    Object.getOwnPropertyNames(n).forEach((a) => {
      if (a === "constructor")
        return;
      const s = Object.getOwnPropertyDescriptor(n, a);
      s && (s.get || s.set) ? Object.defineProperty(e.prototype, a, s) : e.prototype[a] = r.prototype[a];
    });
  });
}
i(Sy, "applyMixins");
var Gn = to(Vt, "", -1, -1, -1, -1, -1, -1);
Object.freeze(Gn);
var Kt = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: Nn,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), Fs = Object.freeze({
  recoveryValueFunc: /* @__PURE__ */ i(() => {
  }, "recoveryValueFunc"),
  resyncEnabled: !0
}), Fe;
(function(e) {
  e[e.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", e[e.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", e[e.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", e[e.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", e[e.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", e[e.LEFT_RECURSION = 5] = "LEFT_RECURSION", e[e.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", e[e.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", e[e.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", e[e.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", e[e.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", e[e.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", e[e.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", e[e.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(Fe || (Fe = {}));
function Iu(e = void 0) {
  return function() {
    return e;
  };
}
i(Iu, "EMPTY_ALT");
var Zc = class wy {
  static {
    i(this, "Parser");
  }
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(t) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let t;
      this.selfAnalysisDone = !0;
      const r = this.className;
      this.TRACE_INIT("toFastProps", () => {
        xc(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), this.definedRulesNames.forEach((a) => {
            const o = this[a].originalGrammarAction;
            let l;
            this.TRACE_INIT(`${a} Rule`, () => {
              l = this.topLevelRuleRecord(a, o);
            }), this.gastProductionsCache[a] = l;
          });
        } finally {
          this.disableRecording();
        }
      });
      let n = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        n = ay({
          rules: Object.values(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(n);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (n.length === 0 && this.skipValidations === !1) {
          const a = iy({
            rules: Object.values(this.gastProductionsCache),
            tokenTypes: Object.values(this.tokensMap),
            errMsgProvider: Ir,
            grammarName: r
          }), s = Kh({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: Object.values(this.gastProductionsCache),
            tokenTypes: Object.values(this.tokensMap),
            grammarName: r
          });
          this.definitionErrors = this.definitionErrors.concat(a, s);
        }
      }), this.definitionErrors.length === 0 && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const a = Zm(Object.values(this.gastProductionsCache));
        this.resyncFollows = a;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var a, s;
        (s = (a = this.lookaheadStrategy).initialize) === null || s === void 0 || s.call(a, {
          rules: Object.values(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(Object.values(this.gastProductionsCache));
      })), !wy.DEFER_DEFINITION_ERRORS_HANDLING && this.definitionErrors.length !== 0)
        throw t = this.definitionErrors.map((a) => a.message), new Error(`Parser Definition Errors detected:
 ${t.join(`
-------------------------------
`)}`);
    });
  }
  constructor(t, r) {
    this.definitionErrors = [], this.selfAnalysisDone = !1;
    const n = this;
    if (n.initErrorHandler(r), n.initLexerAdapter(), n.initLooksAhead(r), n.initRecognizerEngine(t, r), n.initRecoverable(r), n.initTreeBuilder(r), n.initGastRecorder(r), n.initPerformanceTracer(r), Object.hasOwn(r, "ignoredIssues"))
      throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = Object.hasOwn(r, "skipValidations") ? r.skipValidations : Kt.skipValidations;
  }
};
Zc.DEFER_DEFINITION_ERRORS_HANDLING = !1;
Sy(Zc, [
  SA,
  wA,
  IA,
  NA,
  MA,
  OA,
  LA,
  xA,
  GA
]);
var FA = class extends Zc {
  static {
    i(this, "EmbeddedActionsParser");
  }
  constructor(e, t = Kt) {
    const r = Object.assign({}, t);
    r.outputCst = !1, super(e, r);
  }
};
function Py(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
i(Py, "arrayMap");
var ky = Py;
function Iy() {
  this.__data__ = [], this.size = 0;
}
i(Iy, "listCacheClear");
var jA = Iy;
function Ny(e, t) {
  return e === t || e !== e && t !== t;
}
i(Ny, "eq");
var Oy = Ny;
function My(e, t) {
  for (var r = e.length; r--; )
    if (Oy(e[r][0], t))
      return r;
  return -1;
}
i(My, "assocIndexOf");
var oo = My, zA = Array.prototype, UA = zA.splice;
function Ly(e) {
  var t = this.__data__, r = oo(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : UA.call(t, r, 1), --this.size, !0;
}
i(Ly, "listCacheDelete");
var BA = Ly;
function Dy(e) {
  var t = this.__data__, r = oo(t, e);
  return r < 0 ? void 0 : t[r][1];
}
i(Dy, "listCacheGet");
var VA = Dy;
function xy(e) {
  return oo(this.__data__, e) > -1;
}
i(xy, "listCacheHas");
var KA = xy;
function Gy(e, t) {
  var r = this.__data__, n = oo(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
i(Gy, "listCacheSet");
var WA = Gy;
function xr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
i(xr, "ListCache");
xr.prototype.clear = jA;
xr.prototype.delete = BA;
xr.prototype.get = VA;
xr.prototype.has = KA;
xr.prototype.set = WA;
var lo = xr;
function Fy() {
  this.__data__ = new lo(), this.size = 0;
}
i(Fy, "stackClear");
var qA = Fy;
function jy(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
i(jy, "stackDelete");
var HA = jy;
function zy(e) {
  return this.__data__.get(e);
}
i(zy, "stackGet");
var YA = zy;
function Uy(e) {
  return this.__data__.has(e);
}
i(Uy, "stackHas");
var XA = Uy, JA = typeof global == "object" && global && global.Object === Object && global, By = JA, ZA = typeof self == "object" && self && self.Object === Object && self, QA = By || ZA || Function("return this")(), Wt = QA, eE = Wt.Symbol, Ct = eE, Vy = Object.prototype, tE = Vy.hasOwnProperty, rE = Vy.toString, Ea = Ct ? Ct.toStringTag : void 0;
function Ky(e) {
  var t = tE.call(e, Ea), r = e[Ea];
  try {
    e[Ea] = void 0;
    var n = !0;
  } catch {
  }
  var a = rE.call(e);
  return n && (t ? e[Ea] = r : delete e[Ea]), a;
}
i(Ky, "getRawTag");
var nE = Ky, aE = Object.prototype, iE = aE.toString;
function Wy(e) {
  return iE.call(e);
}
i(Wy, "objectToString");
var sE = Wy, oE = "[object Null]", lE = "[object Undefined]", Zf = Ct ? Ct.toStringTag : void 0;
function qy(e) {
  return e == null ? e === void 0 ? lE : oE : Zf && Zf in Object(e) ? nE(e) : sE(e);
}
i(qy, "baseGetTag");
var Jn = qy;
function Hy(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
i(Hy, "isObject");
var Qc = Hy, uE = "[object AsyncFunction]", cE = "[object Function]", fE = "[object GeneratorFunction]", pE = "[object Proxy]";
function Yy(e) {
  if (!Qc(e))
    return !1;
  var t = Jn(e);
  return t == cE || t == fE || t == uE || t == pE;
}
i(Yy, "isFunction");
var Xy = Yy, dE = Wt["__core-js_shared__"], ko = dE, Qf = (function() {
  var e = /[^.]+$/.exec(ko && ko.keys && ko.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function Jy(e) {
  return !!Qf && Qf in e;
}
i(Jy, "isMasked");
var mE = Jy, hE = Function.prototype, yE = hE.toString;
function Zy(e) {
  if (e != null) {
    try {
      return yE.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
i(Zy, "toSource");
var Gr = Zy, gE = /[\\^$.*+?()[\]{}|]/g, vE = /^\[object .+?Constructor\]$/, TE = Function.prototype, $E = Object.prototype, RE = TE.toString, AE = $E.hasOwnProperty, EE = RegExp(
  "^" + RE.call(AE).replace(gE, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Qy(e) {
  if (!Qc(e) || mE(e))
    return !1;
  var t = Xy(e) ? EE : vE;
  return t.test(Gr(e));
}
i(Qy, "baseIsNative");
var CE = Qy;
function eg(e, t) {
  return e?.[t];
}
i(eg, "getValue");
var bE = eg;
function tg(e, t) {
  var r = bE(e, t);
  return CE(r) ? r : void 0;
}
i(tg, "getNative");
var Zn = tg, _E = Zn(Wt, "Map"), ui = _E, SE = Zn(Object, "create"), ci = SE;
function rg() {
  this.__data__ = ci ? ci(null) : {}, this.size = 0;
}
i(rg, "hashClear");
var wE = rg;
function ng(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
i(ng, "hashDelete");
var PE = ng, kE = "__lodash_hash_undefined__", IE = Object.prototype, NE = IE.hasOwnProperty;
function ag(e) {
  var t = this.__data__;
  if (ci) {
    var r = t[e];
    return r === kE ? void 0 : r;
  }
  return NE.call(t, e) ? t[e] : void 0;
}
i(ag, "hashGet");
var OE = ag, ME = Object.prototype, LE = ME.hasOwnProperty;
function ig(e) {
  var t = this.__data__;
  return ci ? t[e] !== void 0 : LE.call(t, e);
}
i(ig, "hashHas");
var DE = ig, xE = "__lodash_hash_undefined__";
function sg(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ci && t === void 0 ? xE : t, this;
}
i(sg, "hashSet");
var GE = sg;
function Fr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
i(Fr, "Hash");
Fr.prototype.clear = wE;
Fr.prototype.delete = PE;
Fr.prototype.get = OE;
Fr.prototype.has = DE;
Fr.prototype.set = GE;
var ep = Fr;
function og() {
  this.size = 0, this.__data__ = {
    hash: new ep(),
    map: new (ui || lo)(),
    string: new ep()
  };
}
i(og, "mapCacheClear");
var FE = og;
function lg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
i(lg, "isKeyable");
var jE = lg;
function ug(e, t) {
  var r = e.__data__;
  return jE(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
i(ug, "getMapData");
var uo = ug;
function cg(e) {
  var t = uo(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
i(cg, "mapCacheDelete");
var zE = cg;
function fg(e) {
  return uo(this, e).get(e);
}
i(fg, "mapCacheGet");
var UE = fg;
function pg(e) {
  return uo(this, e).has(e);
}
i(pg, "mapCacheHas");
var BE = pg;
function dg(e, t) {
  var r = uo(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
i(dg, "mapCacheSet");
var VE = dg;
function jr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
i(jr, "MapCache");
jr.prototype.clear = FE;
jr.prototype.delete = zE;
jr.prototype.get = UE;
jr.prototype.has = BE;
jr.prototype.set = VE;
var co = jr, KE = 200;
function mg(e, t) {
  var r = this.__data__;
  if (r instanceof lo) {
    var n = r.__data__;
    if (!ui || n.length < KE - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new co(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
i(mg, "stackSet");
var WE = mg;
function zr(e) {
  var t = this.__data__ = new lo(e);
  this.size = t.size;
}
i(zr, "Stack");
zr.prototype.clear = qA;
zr.prototype.delete = HA;
zr.prototype.get = YA;
zr.prototype.has = XA;
zr.prototype.set = WE;
var gs = zr, qE = "__lodash_hash_undefined__";
function hg(e) {
  return this.__data__.set(e, qE), this;
}
i(hg, "setCacheAdd");
var HE = hg;
function yg(e) {
  return this.__data__.has(e);
}
i(yg, "setCacheHas");
var YE = yg;
function fi(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new co(); ++t < r; )
    this.add(e[t]);
}
i(fi, "SetCache");
fi.prototype.add = fi.prototype.push = HE;
fi.prototype.has = YE;
var gg = fi;
function vg(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
i(vg, "arraySome");
var XE = vg;
function Tg(e, t) {
  return e.has(t);
}
i(Tg, "cacheHas");
var $g = Tg, JE = 1, ZE = 2;
function Rg(e, t, r, n, a, s) {
  var o = r & JE, l = e.length, u = t.length;
  if (l != u && !(o && u > l))
    return !1;
  var c = s.get(e), p = s.get(t);
  if (c && p)
    return c == t && p == e;
  var h = -1, y = !0, d = r & ZE ? new gg() : void 0;
  for (s.set(e, t), s.set(t, e); ++h < l; ) {
    var A = e[h], T = t[h];
    if (n)
      var v = o ? n(T, A, h, t, e, s) : n(A, T, h, e, t, s);
    if (v !== void 0) {
      if (v)
        continue;
      y = !1;
      break;
    }
    if (d) {
      if (!XE(t, function($, S) {
        if (!$g(d, S) && (A === $ || a(A, $, r, n, s)))
          return d.push(S);
      })) {
        y = !1;
        break;
      }
    } else if (!(A === T || a(A, T, r, n, s))) {
      y = !1;
      break;
    }
  }
  return s.delete(e), s.delete(t), y;
}
i(Rg, "equalArrays");
var Ag = Rg, QE = Wt.Uint8Array, tp = QE;
function Eg(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, a) {
    r[++t] = [a, n];
  }), r;
}
i(Eg, "mapToArray");
var eC = Eg;
function Cg(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
i(Cg, "setToArray");
var ef = Cg, tC = 1, rC = 2, nC = "[object Boolean]", aC = "[object Date]", iC = "[object Error]", sC = "[object Map]", oC = "[object Number]", lC = "[object RegExp]", uC = "[object Set]", cC = "[object String]", fC = "[object Symbol]", pC = "[object ArrayBuffer]", dC = "[object DataView]", rp = Ct ? Ct.prototype : void 0, Io = rp ? rp.valueOf : void 0;
function bg(e, t, r, n, a, s, o) {
  switch (r) {
    case dC:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case pC:
      return !(e.byteLength != t.byteLength || !s(new tp(e), new tp(t)));
    case nC:
    case aC:
    case oC:
      return Oy(+e, +t);
    case iC:
      return e.name == t.name && e.message == t.message;
    case lC:
    case cC:
      return e == t + "";
    case sC:
      var l = eC;
    case uC:
      var u = n & tC;
      if (l || (l = ef), e.size != t.size && !u)
        return !1;
      var c = o.get(e);
      if (c)
        return c == t;
      n |= rC, o.set(e, t);
      var p = Ag(l(e), l(t), n, a, s, o);
      return o.delete(e), p;
    case fC:
      if (Io)
        return Io.call(e) == Io.call(t);
  }
  return !1;
}
i(bg, "equalByTag");
var mC = bg;
function _g(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
i(_g, "arrayPush");
var Sg = _g, hC = Array.isArray, je = hC;
function wg(e, t, r) {
  var n = t(e);
  return je(e) ? n : Sg(n, r(e));
}
i(wg, "baseGetAllKeys");
var yC = wg;
function Pg(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, s = []; ++r < n; ) {
    var o = e[r];
    t(o, r, e) && (s[a++] = o);
  }
  return s;
}
i(Pg, "arrayFilter");
var kg = Pg;
function Ig() {
  return [];
}
i(Ig, "stubArray");
var gC = Ig, vC = Object.prototype, TC = vC.propertyIsEnumerable, np = Object.getOwnPropertySymbols, $C = np ? function(e) {
  return e == null ? [] : (e = Object(e), kg(np(e), function(t) {
    return TC.call(e, t);
  }));
} : gC, RC = $C;
function Ng(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
i(Ng, "baseTimes");
var AC = Ng;
function Og(e) {
  return e != null && typeof e == "object";
}
i(Og, "isObjectLike");
var Fn = Og, EC = "[object Arguments]";
function Mg(e) {
  return Fn(e) && Jn(e) == EC;
}
i(Mg, "baseIsArguments");
var ap = Mg, Lg = Object.prototype, CC = Lg.hasOwnProperty, bC = Lg.propertyIsEnumerable, _C = ap(/* @__PURE__ */ (function() {
  return arguments;
})()) ? ap : function(e) {
  return Fn(e) && CC.call(e, "callee") && !bC.call(e, "callee");
}, fo = _C;
function Dg() {
  return !1;
}
i(Dg, "stubFalse");
var SC = Dg, xg = typeof exports == "object" && exports && !exports.nodeType && exports, ip = xg && typeof module == "object" && module && !module.nodeType && module, wC = ip && ip.exports === xg, sp = wC ? Wt.Buffer : void 0, PC = sp ? sp.isBuffer : void 0, kC = PC || SC, js = kC, IC = 9007199254740991, NC = /^(?:0|[1-9]\d*)$/;
function Gg(e, t) {
  var r = typeof e;
  return t = t ?? IC, !!t && (r == "number" || r != "symbol" && NC.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
i(Gg, "isIndex");
var Fg = Gg, OC = 9007199254740991;
function jg(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= OC;
}
i(jg, "isLength");
var tf = jg, MC = "[object Arguments]", LC = "[object Array]", DC = "[object Boolean]", xC = "[object Date]", GC = "[object Error]", FC = "[object Function]", jC = "[object Map]", zC = "[object Number]", UC = "[object Object]", BC = "[object RegExp]", VC = "[object Set]", KC = "[object String]", WC = "[object WeakMap]", qC = "[object ArrayBuffer]", HC = "[object DataView]", YC = "[object Float32Array]", XC = "[object Float64Array]", JC = "[object Int8Array]", ZC = "[object Int16Array]", QC = "[object Int32Array]", eb = "[object Uint8Array]", tb = "[object Uint8ClampedArray]", rb = "[object Uint16Array]", nb = "[object Uint32Array]", le = {};
le[YC] = le[XC] = le[JC] = le[ZC] = le[QC] = le[eb] = le[tb] = le[rb] = le[nb] = !0;
le[MC] = le[LC] = le[qC] = le[DC] = le[HC] = le[xC] = le[GC] = le[FC] = le[jC] = le[zC] = le[UC] = le[BC] = le[VC] = le[KC] = le[WC] = !1;
function zg(e) {
  return Fn(e) && tf(e.length) && !!le[Jn(e)];
}
i(zg, "baseIsTypedArray");
var ab = zg;
function Ug(e) {
  return function(t) {
    return e(t);
  };
}
i(Ug, "baseUnary");
var ib = Ug, Bg = typeof exports == "object" && exports && !exports.nodeType && exports, Qa = Bg && typeof module == "object" && module && !module.nodeType && module, sb = Qa && Qa.exports === Bg, No = sb && By.process, ob = (function() {
  try {
    var e = Qa && Qa.require && Qa.require("util").types;
    return e || No && No.binding && No.binding("util");
  } catch {
  }
})(), op = ob, lp = op && op.isTypedArray, lb = lp ? ib(lp) : ab, rf = lb, ub = Object.prototype, cb = ub.hasOwnProperty;
function Vg(e, t) {
  var r = je(e), n = !r && fo(e), a = !r && !n && js(e), s = !r && !n && !a && rf(e), o = r || n || a || s, l = o ? AC(e.length, String) : [], u = l.length;
  for (var c in e)
    (t || cb.call(e, c)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    Fg(c, u))) && l.push(c);
  return l;
}
i(Vg, "arrayLikeKeys");
var fb = Vg, pb = Object.prototype;
function Kg(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || pb;
  return e === r;
}
i(Kg, "isPrototype");
var Wg = Kg;
function qg(e, t) {
  return function(r) {
    return e(t(r));
  };
}
i(qg, "overArg");
var db = qg, mb = db(Object.keys, Object), hb = mb, yb = Object.prototype, gb = yb.hasOwnProperty;
function Hg(e) {
  if (!Wg(e))
    return hb(e);
  var t = [];
  for (var r in Object(e))
    gb.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
i(Hg, "baseKeys");
var Yg = Hg;
function Xg(e) {
  return e != null && tf(e.length) && !Xy(e);
}
i(Xg, "isArrayLike");
var po = Xg;
function Jg(e) {
  return po(e) ? fb(e) : Yg(e);
}
i(Jg, "keys");
var nf = Jg;
function Zg(e) {
  return yC(e, nf, RC);
}
i(Zg, "getAllKeys");
var up = Zg, vb = 1, Tb = Object.prototype, $b = Tb.hasOwnProperty;
function Qg(e, t, r, n, a, s) {
  var o = r & vb, l = up(e), u = l.length, c = up(t), p = c.length;
  if (u != p && !o)
    return !1;
  for (var h = u; h--; ) {
    var y = l[h];
    if (!(o ? y in t : $b.call(t, y)))
      return !1;
  }
  var d = s.get(e), A = s.get(t);
  if (d && A)
    return d == t && A == e;
  var T = !0;
  s.set(e, t), s.set(t, e);
  for (var v = o; ++h < u; ) {
    y = l[h];
    var $ = e[y], S = t[y];
    if (n)
      var E = o ? n(S, $, y, t, e, s) : n($, S, y, e, t, s);
    if (!(E === void 0 ? $ === S || a($, S, r, n, s) : E)) {
      T = !1;
      break;
    }
    v || (v = y == "constructor");
  }
  if (T && !v) {
    var O = e.constructor, M = t.constructor;
    O != M && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof M == "function" && M instanceof M) && (T = !1);
  }
  return s.delete(e), s.delete(t), T;
}
i(Qg, "equalObjects");
var Rb = Qg, Ab = Zn(Wt, "DataView"), Nu = Ab, Eb = Zn(Wt, "Promise"), Ou = Eb, Cb = Zn(Wt, "Set"), Ln = Cb, bb = Zn(Wt, "WeakMap"), Mu = bb, cp = "[object Map]", _b = "[object Object]", fp = "[object Promise]", pp = "[object Set]", dp = "[object WeakMap]", mp = "[object DataView]", Sb = Gr(Nu), wb = Gr(ui), Pb = Gr(Ou), kb = Gr(Ln), Ib = Gr(Mu), _r = Jn;
(Nu && _r(new Nu(new ArrayBuffer(1))) != mp || ui && _r(new ui()) != cp || Ou && _r(Ou.resolve()) != fp || Ln && _r(new Ln()) != pp || Mu && _r(new Mu()) != dp) && (_r = /* @__PURE__ */ i(function(e) {
  var t = Jn(e), r = t == _b ? e.constructor : void 0, n = r ? Gr(r) : "";
  if (n)
    switch (n) {
      case Sb:
        return mp;
      case wb:
        return cp;
      case Pb:
        return fp;
      case kb:
        return pp;
      case Ib:
        return dp;
    }
  return t;
}, "getTag"));
var Lu = _r, Nb = 1, hp = "[object Arguments]", yp = "[object Array]", Oi = "[object Object]", Ob = Object.prototype, gp = Ob.hasOwnProperty;
function ev(e, t, r, n, a, s) {
  var o = je(e), l = je(t), u = o ? yp : Lu(e), c = l ? yp : Lu(t);
  u = u == hp ? Oi : u, c = c == hp ? Oi : c;
  var p = u == Oi, h = c == Oi, y = u == c;
  if (y && js(e)) {
    if (!js(t))
      return !1;
    o = !0, p = !1;
  }
  if (y && !p)
    return s || (s = new gs()), o || rf(e) ? Ag(e, t, r, n, a, s) : mC(e, t, u, r, n, a, s);
  if (!(r & Nb)) {
    var d = p && gp.call(e, "__wrapped__"), A = h && gp.call(t, "__wrapped__");
    if (d || A) {
      var T = d ? e.value() : e, v = A ? t.value() : t;
      return s || (s = new gs()), a(T, v, r, n, s);
    }
  }
  return y ? (s || (s = new gs()), Rb(e, t, r, n, a, s)) : !1;
}
i(ev, "baseIsEqualDeep");
var Mb = ev;
function af(e, t, r, n, a) {
  return e === t ? !0 : e == null || t == null || !Fn(e) && !Fn(t) ? e !== e && t !== t : Mb(e, t, r, n, af, a);
}
i(af, "baseIsEqual");
var tv = af, Lb = 1, Db = 2;
function rv(e, t, r, n) {
  var a = r.length, s = a, o = !n;
  if (e == null)
    return !s;
  for (e = Object(e); a--; ) {
    var l = r[a];
    if (o && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++a < s; ) {
    l = r[a];
    var u = l[0], c = e[u], p = l[1];
    if (o && l[2]) {
      if (c === void 0 && !(u in e))
        return !1;
    } else {
      var h = new gs();
      if (n)
        var y = n(c, p, u, e, t, h);
      if (!(y === void 0 ? tv(p, c, Lb | Db, n, h) : y))
        return !1;
    }
  }
  return !0;
}
i(rv, "baseIsMatch");
var xb = rv;
function nv(e) {
  return e === e && !Qc(e);
}
i(nv, "isStrictComparable");
var av = nv;
function iv(e) {
  for (var t = nf(e), r = t.length; r--; ) {
    var n = t[r], a = e[n];
    t[r] = [n, a, av(a)];
  }
  return t;
}
i(iv, "getMatchData");
var Gb = iv;
function sv(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
i(sv, "matchesStrictComparable");
var ov = sv;
function lv(e) {
  var t = Gb(e);
  return t.length == 1 && t[0][2] ? ov(t[0][0], t[0][1]) : function(r) {
    return r === e || xb(r, e, t);
  };
}
i(lv, "baseMatches");
var Fb = lv, jb = "[object Symbol]";
function uv(e) {
  return typeof e == "symbol" || Fn(e) && Jn(e) == jb;
}
i(uv, "isSymbol");
var mo = uv, zb = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ub = /^\w*$/;
function cv(e, t) {
  if (je(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || mo(e) ? !0 : Ub.test(e) || !zb.test(e) || t != null && e in Object(t);
}
i(cv, "isKey");
var sf = cv, Bb = "Expected a function";
function ho(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Bb);
  var r = /* @__PURE__ */ i(function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], s = r.cache;
    if (s.has(a))
      return s.get(a);
    var o = e.apply(this, n);
    return r.cache = s.set(a, o) || s, o;
  }, "memoized");
  return r.cache = new (ho.Cache || co)(), r;
}
i(ho, "memoize");
ho.Cache = co;
var Vb = ho, Kb = 500;
function fv(e) {
  var t = Vb(e, function(n) {
    return r.size === Kb && r.clear(), n;
  }), r = t.cache;
  return t;
}
i(fv, "memoizeCapped");
var Wb = fv, qb = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Hb = /\\(\\)?/g, Yb = Wb(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(qb, function(r, n, a, s) {
    t.push(a ? s.replace(Hb, "$1") : n || r);
  }), t;
}), Xb = Yb, vp = Ct ? Ct.prototype : void 0, Tp = vp ? vp.toString : void 0;
function of(e) {
  if (typeof e == "string")
    return e;
  if (je(e))
    return ky(e, of) + "";
  if (mo(e))
    return Tp ? Tp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
i(of, "baseToString");
var Jb = of;
function pv(e) {
  return e == null ? "" : Jb(e);
}
i(pv, "toString");
var Zb = pv;
function dv(e, t) {
  return je(e) ? e : sf(e, t) ? [e] : Xb(Zb(e));
}
i(dv, "castPath");
var mv = dv;
function hv(e) {
  if (typeof e == "string" || mo(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
i(hv, "toKey");
var yo = hv;
function yv(e, t) {
  t = mv(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[yo(t[r++])];
  return r && r == n ? e : void 0;
}
i(yv, "baseGet");
var gv = yv;
function vv(e, t, r) {
  var n = e == null ? void 0 : gv(e, t);
  return n === void 0 ? r : n;
}
i(vv, "get");
var Qb = vv;
function Tv(e, t) {
  return e != null && t in Object(e);
}
i(Tv, "baseHasIn");
var e_ = Tv;
function $v(e, t, r) {
  t = mv(t, e);
  for (var n = -1, a = t.length, s = !1; ++n < a; ) {
    var o = yo(t[n]);
    if (!(s = e != null && r(e, o)))
      break;
    e = e[o];
  }
  return s || ++n != a ? s : (a = e == null ? 0 : e.length, !!a && tf(a) && Fg(o, a) && (je(e) || fo(e)));
}
i($v, "hasPath");
var t_ = $v;
function Rv(e, t) {
  return e != null && t_(e, t, e_);
}
i(Rv, "hasIn");
var r_ = Rv, n_ = 1, a_ = 2;
function Av(e, t) {
  return sf(e) && av(t) ? ov(yo(e), t) : function(r) {
    var n = Qb(r, e);
    return n === void 0 && n === t ? r_(r, e) : tv(t, n, n_ | a_);
  };
}
i(Av, "baseMatchesProperty");
var i_ = Av;
function Ev(e) {
  return e;
}
i(Ev, "identity");
var lf = Ev;
function Cv(e) {
  return function(t) {
    return t?.[e];
  };
}
i(Cv, "baseProperty");
var s_ = Cv;
function bv(e) {
  return function(t) {
    return gv(t, e);
  };
}
i(bv, "basePropertyDeep");
var o_ = bv;
function _v(e) {
  return sf(e) ? s_(yo(e)) : o_(e);
}
i(_v, "property");
var l_ = _v;
function Sv(e) {
  return typeof e == "function" ? e : e == null ? lf : typeof e == "object" ? je(e) ? i_(e[0], e[1]) : Fb(e) : l_(e);
}
i(Sv, "baseIteratee");
var go = Sv;
function wv(e) {
  return function(t, r, n) {
    for (var a = -1, s = Object(t), o = n(t), l = o.length; l--; ) {
      var u = o[e ? l : ++a];
      if (r(s[u], u, s) === !1)
        break;
    }
    return t;
  };
}
i(wv, "createBaseFor");
var u_ = wv, c_ = u_(), f_ = c_;
function Pv(e, t) {
  return e && f_(e, t, nf);
}
i(Pv, "baseForOwn");
var p_ = Pv;
function kv(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!po(r))
      return e(r, n);
    for (var a = r.length, s = t ? a : -1, o = Object(r); (t ? s-- : ++s < a) && n(o[s], s, o) !== !1; )
      ;
    return r;
  };
}
i(kv, "createBaseEach");
var d_ = kv, m_ = d_(p_), vo = m_;
function Iv(e, t) {
  var r = -1, n = po(e) ? Array(e.length) : [];
  return vo(e, function(a, s, o) {
    n[++r] = t(a, s, o);
  }), n;
}
i(Iv, "baseMap");
var h_ = Iv;
function Nv(e, t) {
  var r = je(e) ? ky : h_;
  return r(e, go(t));
}
i(Nv, "map");
var zt = Nv;
function Ov(e, t) {
  var r = [];
  return vo(e, function(n, a, s) {
    t(n, a, s) && r.push(n);
  }), r;
}
i(Ov, "baseFilter");
var y_ = Ov;
function Mv(e, t) {
  var r = je(e) ? kg : y_;
  return r(e, go(t));
}
i(Mv, "filter");
var g_ = Mv;
function Mr(e, t, r) {
  return `${e.name}_${t}_${r}`;
}
i(Mr, "buildATNKey");
var ar = 1, v_ = 2, Lv = 4, Dv = 5, Ur = 7, T_ = 8, $_ = 9, R_ = 10, A_ = 11, xv = 12, uf = class {
  static {
    i(this, "AbstractTransition");
  }
  constructor(e) {
    this.target = e;
  }
  isEpsilon() {
    return !1;
  }
}, To = class extends uf {
  static {
    i(this, "AtomTransition");
  }
  constructor(e, t) {
    super(e), this.tokenType = t;
  }
}, Gv = class extends uf {
  static {
    i(this, "EpsilonTransition");
  }
  constructor(e) {
    super(e);
  }
  isEpsilon() {
    return !0;
  }
}, $o = class extends uf {
  static {
    i(this, "RuleTransition");
  }
  constructor(e, t, r) {
    super(e), this.rule = t, this.followState = r;
  }
  isEpsilon() {
    return !0;
  }
};
function Fv(e) {
  const t = {
    decisionMap: {},
    decisionStates: [],
    ruleToStartState: /* @__PURE__ */ new Map(),
    ruleToStopState: /* @__PURE__ */ new Map(),
    states: []
  };
  jv(t, e);
  const r = e.length;
  for (let n = 0; n < r; n++) {
    const a = e[n], s = sr(t, a, a);
    s !== void 0 && Jv(t, a, s);
  }
  return t;
}
i(Fv, "createATN");
function jv(e, t) {
  const r = t.length;
  for (let n = 0; n < r; n++) {
    const a = t[n], s = Ce(e, a, void 0, {
      type: v_
    }), o = Ce(e, a, void 0, {
      type: Ur
    });
    s.stop = o, e.ruleToStartState.set(a, s), e.ruleToStopState.set(a, o);
  }
}
i(jv, "createRuleStartAndStopATNStates");
function cf(e, t, r) {
  return r instanceof ue ? Ro(e, t, r.terminalType, r) : r instanceof Ge ? Xv(e, t, r) : r instanceof We ? Kv(e, t, r) : r instanceof Ie ? Wv(e, t, r) : r instanceof Te ? zv(e, t, r) : r instanceof Ke ? Uv(e, t, r) : r instanceof Je ? Bv(e, t, r) : r instanceof Ze ? Vv(e, t, r) : sr(e, t, r);
}
i(cf, "atom");
function zv(e, t, r) {
  const n = Ce(e, t, r, {
    type: Dv
  });
  qt(e, n);
  const a = Br(e, t, n, r, sr(e, t, r));
  return pf(e, t, r, a);
}
i(zv, "repetition");
function Uv(e, t, r) {
  const n = Ce(e, t, r, {
    type: Dv
  });
  qt(e, n);
  const a = Br(e, t, n, r, sr(e, t, r)), s = Ro(e, t, r.separator, r);
  return pf(e, t, r, a, s);
}
i(Uv, "repetitionSep");
function Bv(e, t, r) {
  const n = Ce(e, t, r, {
    type: Lv
  });
  qt(e, n);
  const a = Br(e, t, n, r, sr(e, t, r));
  return ff(e, t, r, a);
}
i(Bv, "repetitionMandatory");
function Vv(e, t, r) {
  const n = Ce(e, t, r, {
    type: Lv
  });
  qt(e, n);
  const a = Br(e, t, n, r, sr(e, t, r)), s = Ro(e, t, r.separator, r);
  return ff(e, t, r, a, s);
}
i(Vv, "repetitionMandatorySep");
function Kv(e, t, r) {
  const n = Ce(e, t, r, {
    type: ar
  });
  qt(e, n);
  const a = zt(r.definition, (o) => cf(e, t, o));
  return Br(e, t, n, r, ...a);
}
i(Kv, "alternation");
function Wv(e, t, r) {
  const n = Ce(e, t, r, {
    type: ar
  });
  qt(e, n);
  const a = Br(e, t, n, r, sr(e, t, r));
  return qv(e, t, r, a);
}
i(Wv, "option");
function sr(e, t, r) {
  const n = g_(zt(r.definition, (a) => cf(e, t, a)), (a) => a !== void 0);
  return n.length === 1 ? n[0] : n.length === 0 ? void 0 : Yv(e, n);
}
i(sr, "block");
function ff(e, t, r, n, a) {
  const s = n.left, o = n.right, l = Ce(e, t, r, {
    type: A_
  });
  qt(e, l);
  const u = Ce(e, t, r, {
    type: xv
  });
  return s.loopback = l, u.loopback = l, e.decisionMap[Mr(t, a ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", r.idx)] = l, Re(o, l), a === void 0 ? (Re(l, s), Re(l, u)) : (Re(l, u), Re(l, a.left), Re(a.right, s)), {
    left: s,
    right: u
  };
}
i(ff, "plus");
function pf(e, t, r, n, a) {
  const s = n.left, o = n.right, l = Ce(e, t, r, {
    type: R_
  });
  qt(e, l);
  const u = Ce(e, t, r, {
    type: xv
  }), c = Ce(e, t, r, {
    type: $_
  });
  return l.loopback = c, u.loopback = c, Re(l, s), Re(l, u), Re(o, c), a !== void 0 ? (Re(c, u), Re(c, a.left), Re(a.right, s)) : Re(c, l), e.decisionMap[Mr(t, a ? "RepetitionWithSeparator" : "Repetition", r.idx)] = l, {
    left: l,
    right: u
  };
}
i(pf, "star");
function qv(e, t, r, n) {
  const a = n.left, s = n.right;
  return Re(a, s), e.decisionMap[Mr(t, "Option", r.idx)] = a, n;
}
i(qv, "optional");
function qt(e, t) {
  return e.decisionStates.push(t), t.decision = e.decisionStates.length - 1, t.decision;
}
i(qt, "defineDecisionState");
function Br(e, t, r, n, ...a) {
  const s = Ce(e, t, n, {
    type: T_,
    start: r
  });
  r.end = s;
  for (const l of a)
    l !== void 0 ? (Re(r, l.left), Re(l.right, s)) : Re(r, s);
  const o = {
    left: r,
    right: s
  };
  return e.decisionMap[Mr(t, Hv(n), n.idx)] = r, o;
}
i(Br, "makeAlts");
function Hv(e) {
  if (e instanceof We)
    return "Alternation";
  if (e instanceof Ie)
    return "Option";
  if (e instanceof Te)
    return "Repetition";
  if (e instanceof Ke)
    return "RepetitionWithSeparator";
  if (e instanceof Je)
    return "RepetitionMandatory";
  if (e instanceof Ze)
    return "RepetitionMandatoryWithSeparator";
  throw new Error("Invalid production type encountered");
}
i(Hv, "getProdType");
function Yv(e, t) {
  const r = t.length;
  for (let s = 0; s < r - 1; s++) {
    const o = t[s];
    let l;
    o.left.transitions.length === 1 && (l = o.left.transitions[0]);
    const u = l instanceof $o, c = l, p = t[s + 1].left;
    o.left.type === ar && o.right.type === ar && l !== void 0 && (u && c.followState === o.right || l.target === o.right) ? (u ? c.followState = p : l.target = p, Zv(e, o.right)) : Re(o.right, p);
  }
  const n = t[0], a = t[r - 1];
  return {
    left: n.left,
    right: a.right
  };
}
i(Yv, "makeBlock");
function Ro(e, t, r, n) {
  const a = Ce(e, t, n, {
    type: ar
  }), s = Ce(e, t, n, {
    type: ar
  });
  return Ao(a, new To(s, r)), {
    left: a,
    right: s
  };
}
i(Ro, "tokenRef");
function Xv(e, t, r) {
  const n = r.referencedRule, a = e.ruleToStartState.get(n), s = Ce(e, t, r, {
    type: ar
  }), o = Ce(e, t, r, {
    type: ar
  }), l = new $o(a, n, o);
  return Ao(s, l), {
    left: s,
    right: o
  };
}
i(Xv, "ruleRef");
function Jv(e, t, r) {
  const n = e.ruleToStartState.get(t);
  Re(n, r.left);
  const a = e.ruleToStopState.get(t);
  return Re(r.right, a), {
    left: n,
    right: a
  };
}
i(Jv, "buildRuleHandle");
function Re(e, t) {
  const r = new Gv(t);
  Ao(e, r);
}
i(Re, "epsilon");
function Ce(e, t, r, n) {
  const a = Object.assign({
    atn: e,
    production: r,
    epsilonOnlyTransitions: !1,
    rule: t,
    transitions: [],
    nextTokenWithinRule: [],
    stateNumber: e.states.length
  }, n);
  return e.states.push(a), a;
}
i(Ce, "newState");
function Ao(e, t) {
  e.transitions.length === 0 && (e.epsilonOnlyTransitions = t.isEpsilon()), e.transitions.push(t);
}
i(Ao, "addTransition");
function Zv(e, t) {
  e.states.splice(e.states.indexOf(t), 1);
}
i(Zv, "removeState");
var zs = {}, Du = class {
  static {
    i(this, "ATNConfigSet");
  }
  constructor() {
    this.map = {}, this.configs = [];
  }
  get size() {
    return this.configs.length;
  }
  finalize() {
    this.map = {};
  }
  add(e) {
    const t = df(e);
    t in this.map || (this.map[t] = this.configs.length, this.configs.push(e));
  }
  get elements() {
    return this.configs;
  }
  get alts() {
    return zt(this.configs, (e) => e.alt);
  }
  get key() {
    let e = "";
    for (const t in this.map)
      e += t + ":";
    return e;
  }
};
function df(e, t = !0) {
  return `${t ? `a${e.alt}` : ""}s${e.state.stateNumber}:${e.stack.map((r) => r.stateNumber.toString()).join("_")}`;
}
i(df, "getATNConfigKey");
function Qv(e, t, r) {
  for (var n = -1, a = e.length; ++n < a; ) {
    var s = e[n], o = t(s);
    if (o != null && (l === void 0 ? o === o && !mo(o) : r(o, l)))
      var l = o, u = s;
  }
  return u;
}
i(Qv, "baseExtremum");
var E_ = Qv;
function eT(e, t) {
  return e < t;
}
i(eT, "baseLt");
var C_ = eT;
function tT(e) {
  return e && e.length ? E_(e, lf, C_) : void 0;
}
i(tT, "min");
var b_ = tT, $p = Ct ? Ct.isConcatSpreadable : void 0;
function rT(e) {
  return je(e) || fo(e) || !!($p && e && e[$p]);
}
i(rT, "isFlattenable");
var __ = rT;
function mf(e, t, r, n, a) {
  var s = -1, o = e.length;
  for (r || (r = __), a || (a = []); ++s < o; ) {
    var l = e[s];
    t > 0 && r(l) ? t > 1 ? mf(l, t - 1, r, n, a) : Sg(a, l) : n || (a[a.length] = l);
  }
  return a;
}
i(mf, "baseFlatten");
var nT = mf;
function aT(e, t) {
  return nT(zt(e, t), 1);
}
i(aT, "flatMap");
var S_ = aT;
function iT(e, t, r, n) {
  for (var a = e.length, s = r + (n ? 1 : -1); n ? s-- : ++s < a; )
    if (t(e[s], s, e))
      return s;
  return -1;
}
i(iT, "baseFindIndex");
var w_ = iT;
function sT(e) {
  return e !== e;
}
i(sT, "baseIsNaN");
var P_ = sT;
function oT(e, t, r) {
  for (var n = r - 1, a = e.length; ++n < a; )
    if (e[n] === t)
      return n;
  return -1;
}
i(oT, "strictIndexOf");
var k_ = oT;
function lT(e, t, r) {
  return t === t ? k_(e, t, r) : w_(e, P_, r);
}
i(lT, "baseIndexOf");
var I_ = lT;
function uT(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && I_(e, t, 0) > -1;
}
i(uT, "arrayIncludes");
var N_ = uT;
function cT(e, t, r) {
  for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
i(cT, "arrayIncludesWith");
var O_ = cT;
function fT() {
}
i(fT, "noop");
var M_ = fT, L_ = 1 / 0, D_ = Ln && 1 / ef(new Ln([, -0]))[1] == L_ ? function(e) {
  return new Ln(e);
} : M_, x_ = D_, G_ = 200;
function pT(e, t, r) {
  var n = -1, a = N_, s = e.length, o = !0, l = [], u = l;
  if (r)
    o = !1, a = O_;
  else if (s >= G_) {
    var c = t ? null : x_(e);
    if (c)
      return ef(c);
    o = !1, a = $g, u = new gg();
  } else
    u = t ? [] : l;
  e:
    for (; ++n < s; ) {
      var p = e[n], h = t ? t(p) : p;
      if (p = r || p !== 0 ? p : 0, o && h === h) {
        for (var y = u.length; y--; )
          if (u[y] === h)
            continue e;
        t && u.push(h), l.push(p);
      } else a(u, h, r) || (u !== l && u.push(h), l.push(p));
    }
  return l;
}
i(pT, "baseUniq");
var F_ = pT;
function dT(e, t) {
  return e && e.length ? F_(e, go(t)) : [];
}
i(dT, "uniqBy");
var j_ = dT;
function mT(e) {
  var t = e == null ? 0 : e.length;
  return t ? nT(e, 1) : [];
}
i(mT, "flatten");
var z_ = mT;
function hT(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
i(hT, "arrayEach");
var U_ = hT;
function yT(e) {
  return typeof e == "function" ? e : lf;
}
i(yT, "castFunction");
var B_ = yT;
function gT(e, t) {
  var r = je(e) ? U_ : vo;
  return r(e, B_(t));
}
i(gT, "forEach");
var Oo = gT, V_ = "[object Map]", K_ = "[object Set]", W_ = Object.prototype, q_ = W_.hasOwnProperty;
function vT(e) {
  if (e == null)
    return !0;
  if (po(e) && (je(e) || typeof e == "string" || typeof e.splice == "function" || js(e) || rf(e) || fo(e)))
    return !e.length;
  var t = Lu(e);
  if (t == V_ || t == K_)
    return !e.size;
  if (Wg(e))
    return !Yg(e).length;
  for (var r in e)
    if (q_.call(e, r))
      return !1;
  return !0;
}
i(vT, "isEmpty");
var H_ = vT;
function TT(e, t, r, n) {
  var a = -1, s = e == null ? 0 : e.length;
  for (n && s && (r = e[++a]); ++a < s; )
    r = t(r, e[a], a, e);
  return r;
}
i(TT, "arrayReduce");
var Y_ = TT;
function $T(e, t, r, n, a) {
  return a(e, function(s, o, l) {
    r = n ? (n = !1, s) : t(r, s, o, l);
  }), r;
}
i($T, "baseReduce");
var X_ = $T;
function RT(e, t, r) {
  var n = je(e) ? Y_ : X_, a = arguments.length < 3;
  return n(e, go(t), r, a, vo);
}
i(RT, "reduce");
var Rp = RT;
function AT(e, t) {
  const r = {};
  return (n) => {
    const a = n.toString();
    let s = r[a];
    return s !== void 0 || (s = {
      atnStartState: e,
      decision: t,
      states: {}
    }, r[a] = s), s;
  };
}
i(AT, "createDFACache");
var ET = class {
  static {
    i(this, "PredicateSet");
  }
  constructor() {
    this.predicates = [];
  }
  is(e) {
    return e >= this.predicates.length || this.predicates[e];
  }
  set(e, t) {
    this.predicates[e] = t;
  }
  toString() {
    let e = "";
    const t = this.predicates.length;
    for (let r = 0; r < t; r++)
      e += this.predicates[r] === !0 ? "1" : "0";
    return e;
  }
}, Ap = new ET(), J_ = class extends Xc {
  static {
    i(this, "LLStarLookaheadStrategy");
  }
  constructor(e) {
    var t, r;
    super(), this.logging = (t = e?.logging) !== null && t !== void 0 ? t : ((n) => console.log(n)), this.incomplete = (r = e?.incomplete) !== null && r !== void 0 ? r : !1;
  }
  initialize(e) {
    this.atn = Fv(e.rules), this.dfas = _T(this.atn), this.callers = CT(this.atn);
  }
  validateAmbiguousAlternationAlternatives() {
    return [];
  }
  validateEmptyOrAlternatives() {
    return [];
  }
  buildLookaheadForAlternation(e) {
    const { prodOccurrence: t, rule: r, hasPredicates: n, dynamicTokensEnabled: a } = e, s = this.dfas, o = this.logging, l = this.incomplete, u = Mr(r, "Alternation", t), p = this.atn.decisionMap[u].decision, h = zt(Au({
      maxLookahead: 1,
      occurrence: t,
      prodType: "Alternation",
      rule: r
    }), (y) => zt(y, (d) => d[0]));
    if (xu(h, !1) && !a) {
      const y = Rp(h, (d, A, T) => (Oo(A, (v) => {
        v && (d[v.tokenTypeIdx] = T, Oo(v.categoryMatches, ($) => {
          d[$] = T;
        }));
      }), d), {});
      return n ? function(d) {
        var A;
        const T = this.LA_FAST(1), v = y[T.tokenTypeIdx];
        if (d !== void 0 && v !== void 0) {
          const $ = (A = d[v]) === null || A === void 0 ? void 0 : A.GATE;
          if ($ !== void 0 && $.call(this) === !1)
            return;
        }
        return v;
      } : function() {
        const d = this.LA_FAST(1);
        return y[d.tokenTypeIdx];
      };
    } else return n ? function(y) {
      const d = new ET(), A = y === void 0 ? 0 : y.length;
      for (let v = 0; v < A; v++) {
        const $ = y?.[v].GATE;
        d.set(v, $ === void 0 || $.call(this));
      }
      const T = vs.call(this, s, p, d, o, l);
      return typeof T == "number" ? T : void 0;
    } : function() {
      const y = vs.call(this, s, p, Ap, o, l);
      return typeof y == "number" ? y : void 0;
    };
  }
  buildLookaheadForOptional(e) {
    const { prodOccurrence: t, rule: r, prodType: n, dynamicTokensEnabled: a } = e, s = this.dfas, o = this.logging, l = this.incomplete, u = this.callers, c = Mr(r, n, t), p = this.atn.decisionMap[c], h = p.decision, y = zt(Au({
      maxLookahead: 1,
      occurrence: t,
      prodType: n,
      rule: r
    }), (d) => zt(d, (A) => A[0]));
    if (xu(y) && y[0][0] && !a && !bT(p, n, u)) {
      const d = y[0], A = z_(d);
      if (A.length === 1 && H_(A[0].categoryMatches)) {
        const v = A[0].tokenTypeIdx;
        return function() {
          return this.LA_FAST(1).tokenTypeIdx === v;
        };
      } else {
        const T = Rp(A, (v, $) => ($ !== void 0 && (v[$.tokenTypeIdx] = !0, Oo($.categoryMatches, (S) => {
          v[S] = !0;
        })), v), {});
        return function() {
          const v = this.LA_FAST(1);
          return T[v.tokenTypeIdx] === !0;
        };
      }
    }
    return function() {
      const d = vs.call(this, s, h, Ap, o, l);
      return typeof d == "object" ? !1 : d === 0;
    };
  }
};
function xu(e, t = !0) {
  const r = /* @__PURE__ */ new Set();
  for (const n of e) {
    const a = /* @__PURE__ */ new Set();
    for (const s of n) {
      if (s === void 0) {
        if (t)
          break;
        return !1;
      }
      const o = [s.tokenTypeIdx].concat(s.categoryMatches);
      for (const l of o)
        if (r.has(l)) {
          if (!a.has(l))
            return !1;
        } else
          r.add(l), a.add(l);
    }
  }
  return !0;
}
i(xu, "isLL1Sequence");
function CT(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.states)
    for (const n of r.transitions)
      if (n instanceof $o) {
        let a = t.get(n.rule);
        a === void 0 && (a = [], t.set(n.rule, a)), a.push(n.followState);
      }
  return t;
}
i(CT, "buildCallers");
function Gu(e, t) {
  const r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), a = [e];
  for (; a.length > 0; ) {
    const s = a.shift();
    if (!n.has(s)) {
      if (n.add(s), s.type === Ur) {
        if (t !== void 0) {
          const o = t.get(s.rule);
          o !== void 0 && a.push(...o);
        }
        continue;
      }
      for (const o of s.transitions)
        if (o instanceof To) {
          r.add(o.tokenType.tokenTypeIdx);
          for (const l of o.tokenType.categoryMatches)
            r.add(l);
        } else
          a.push(o.target);
    }
  }
  return r;
}
i(Gu, "firstSet");
function bT(e, t, r) {
  const n = t === "RepetitionMandatoryWithSeparator", a = e.transitions[n ? 1 : 0], s = e.transitions[n ? 0 : 1];
  if (a === void 0 || s === void 0)
    return !1;
  const o = Gu(a.target), l = Gu(s.target, r);
  for (const u of o)
    if (l.has(u))
      return !0;
  return !1;
}
i(bT, "optionalHasFollowConflict");
function _T(e) {
  const t = e.decisionStates.length, r = Array(t);
  for (let n = 0; n < t; n++)
    r[n] = AT(e.decisionStates[n], n);
  return r;
}
i(_T, "initATNSimulator");
function vs(e, t, r, n, a) {
  const s = e[t](r);
  let o = s.start;
  if (o === void 0) {
    const u = xT(s.atnStartState);
    o = yf(s, hf(u)), s.start = o;
  }
  return ST.apply(this, [s, o, r, n, a]);
}
i(vs, "adaptivePredict");
function ST(e, t, r, n, a) {
  let s = t, o = 1;
  const l = [];
  let u = this.LA_FAST(o++);
  for (; ; ) {
    let c = OT(s, u);
    if (c === void 0 && (c = wT.apply(this, [e, s, u, o, r, n])), c === zs)
      return NT(l, s, u);
    if (c.isAcceptState === !0) {
      if (a === !0 && ro(u, Vt)) {
        const p = KT(s, r);
        if (p !== void 0)
          return p;
      }
      return c.prediction;
    }
    s = c, l.push(u), u = this.LA(o++);
  }
}
i(ST, "performLookahead");
function wT(e, t, r, n, a, s) {
  const o = MT(t.configs, r, a);
  if (o.size === 0)
    return Fu(e, t, r, zs), zs;
  let l = hf(o);
  const u = DT(o, a);
  if (u !== void 0)
    l.isAcceptState = !0, l.prediction = u, l.configs.uniqueAlt = u;
  else if (zT(o)) {
    const c = b_(o.alts);
    l.isAcceptState = !0, l.prediction = c, l.configs.uniqueAlt = c, PT.apply(this, [e, n, o.alts, s]);
  }
  return l = Fu(e, t, r, l), l;
}
i(wT, "computeLookaheadTarget");
function PT(e, t, r, n) {
  const a = [];
  for (let c = 1; c <= t; c++)
    a.push(this.LA(c).tokenType);
  const s = e.atnStartState, o = s.rule, l = s.production, u = kT({
    topLevelRule: o,
    ambiguityIndices: r,
    production: l,
    prefixPath: a
  });
  n(u);
}
i(PT, "reportLookaheadAmbiguity");
function kT(e) {
  const t = zt(e.prefixPath, (a) => Nr(a)).join(", "), r = e.production.idx === 0 ? "" : e.production.idx;
  let n = `Ambiguous Alternatives Detected: <${e.ambiguityIndices.join(", ")}> in <${IT(e.production)}${r}> inside <${e.topLevelRule.name}> Rule,
<${t}> may appears as a prefix path in all these alternatives.
`;
  return n = n + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n;
}
i(kT, "buildAmbiguityError");
function IT(e) {
  if (e instanceof Ge)
    return "SUBRULE";
  if (e instanceof Ie)
    return "OPTION";
  if (e instanceof We)
    return "OR";
  if (e instanceof Je)
    return "AT_LEAST_ONE";
  if (e instanceof Ze)
    return "AT_LEAST_ONE_SEP";
  if (e instanceof Ke)
    return "MANY_SEP";
  if (e instanceof Te)
    return "MANY";
  if (e instanceof ue)
    return "CONSUME";
  throw Error("non exhaustive match");
}
i(IT, "getProductionDslName");
function NT(e, t, r) {
  const n = S_(t.configs.elements, (s) => s.state.transitions), a = j_(n.filter((s) => s instanceof To).map((s) => s.tokenType), (s) => s.tokenTypeIdx);
  return {
    actualToken: r,
    possibleTokenTypes: a,
    tokenPath: e
  };
}
i(NT, "buildAdaptivePredictError");
function OT(e, t) {
  return e.edges[t.tokenTypeIdx];
}
i(OT, "getExistingTargetState");
function MT(e, t, r) {
  const n = new Du(), a = [];
  for (const o of e.elements) {
    if (r.is(o.alt) === !1)
      continue;
    if (o.state.type === Ur) {
      a.push(o);
      continue;
    }
    const l = o.state.transitions.length;
    for (let u = 0; u < l; u++) {
      const c = o.state.transitions[u], p = LT(c, t);
      p !== void 0 && n.add({
        state: p,
        alt: o.alt,
        stack: o.stack
      });
    }
  }
  let s;
  if (a.length === 0 && n.size === 1 && (s = n), s === void 0) {
    s = new Du();
    for (const o of n.elements)
      pi(o, s);
  }
  if (a.length > 0 && !FT(s))
    for (const o of a)
      s.add(o);
  return s;
}
i(MT, "computeReachSet");
function LT(e, t) {
  if (e instanceof To && ro(t, e.tokenType))
    return e.target;
}
i(LT, "getReachableTarget");
function DT(e, t) {
  let r;
  for (const n of e.elements)
    if (t.is(n.alt) === !0) {
      if (r === void 0)
        r = n.alt;
      else if (r !== n.alt)
        return;
    }
  return r;
}
i(DT, "getUniqueAlt");
function hf(e) {
  return {
    configs: e,
    edges: {},
    isAcceptState: !1,
    prediction: -1
  };
}
i(hf, "newDFAState");
function Fu(e, t, r, n) {
  return n = yf(e, n), t.edges[r.tokenTypeIdx] = n, n;
}
i(Fu, "addDFAEdge");
function yf(e, t) {
  if (t === zs)
    return t;
  const r = t.configs.key, n = e.states[r];
  return n !== void 0 ? n : (t.configs.finalize(), e.states[r] = t, t);
}
i(yf, "addDFAState");
function xT(e) {
  const t = new Du(), r = e.transitions.length;
  for (let n = 0; n < r; n++) {
    const s = {
      state: e.transitions[n].target,
      alt: n,
      stack: []
    };
    pi(s, t);
  }
  return t;
}
i(xT, "computeStartState");
function pi(e, t) {
  const r = e.state;
  if (r.type === Ur) {
    if (e.stack.length > 0) {
      const a = [...e.stack], o = {
        state: a.pop(),
        alt: e.alt,
        stack: a
      };
      pi(o, t);
    } else
      t.add(e);
    return;
  }
  r.epsilonOnlyTransitions || t.add(e);
  const n = r.transitions.length;
  for (let a = 0; a < n; a++) {
    const s = r.transitions[a], o = GT(e, s);
    o !== void 0 && pi(o, t);
  }
}
i(pi, "closure");
function GT(e, t) {
  if (t instanceof Gv)
    return {
      state: t.target,
      alt: e.alt,
      stack: e.stack
    };
  if (t instanceof $o) {
    const r = [...e.stack, t.followState];
    return {
      state: t.target,
      alt: e.alt,
      stack: r
    };
  }
}
i(GT, "getEpsilonTarget");
function FT(e) {
  for (const t of e.elements)
    if (t.state.type === Ur)
      return !0;
  return !1;
}
i(FT, "hasConfigInRuleStopState");
function jT(e) {
  for (const t of e.elements)
    if (t.state.type !== Ur)
      return !1;
  return !0;
}
i(jT, "allConfigsInRuleStopStates");
function zT(e) {
  if (jT(e))
    return !0;
  const t = UT(e.elements);
  return BT(t) && !VT(t);
}
i(zT, "hasConflictTerminatingPrediction");
function UT(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) {
    const n = df(r, !1);
    let a = t.get(n);
    a === void 0 && (a = {}, t.set(n, a)), a[r.alt] = !0;
  }
  return t;
}
i(UT, "getConflictingAltSets");
function BT(e) {
  for (const t of Array.from(e.values()))
    if (Object.keys(t).length > 1)
      return !0;
  return !1;
}
i(BT, "hasConflictingAltSet");
function VT(e) {
  for (const t of Array.from(e.values()))
    if (Object.keys(t).length === 1)
      return !0;
  return !1;
}
i(VT, "hasStateAssociatedWithOneAlt");
function KT(e, t) {
  let r;
  for (const n of e.configs.elements)
    if (!(t.is(n.alt) === !1 || n.state.type === Ur)) {
      if (r === void 0)
        r = n.alt;
      else if (r !== n.alt)
        return;
    }
  return r;
}
i(KT, "getBestGuess");
var WT = class {
  static {
    i(this, "CstNodeBuilder");
  }
  constructor() {
    this.nodeStack = [];
  }
  /**
   * The composite node currently being built, i.e. the one to which new child nodes are added:
   * the innermost parser rule invocation that has not been completed with `construct` yet.
   */
  get current() {
    return this.nodeStack[this.nodeStack.length - 1] ?? this.rootNode;
  }
  /**
   * Reset the builder and create the root node of a new tree. This must be called once
   * before each parser run; all nodes built afterwards belong to the returned root.
   */
  buildRootNode(e) {
    return this.rootNode = new YT(e), this.nodeStack = [this.rootNode], this.rootNode;
  }
  /**
   * Create a composite node as a child of the current node and make it the new current node.
   * The parser calls this when a rule is invoked that creates its own AST node; the node
   * remains current until the corresponding `construct` call closes it.
   */
  buildCompositeNode(e) {
    const t = new gf();
    return t.grammarSource = e, this.appendChild(this.current, t), this.nodeStack.push(t), t;
  }
  /**
   * Create a leaf node for a consumed token and append it to the current composite node.
   * If no grammar element is given, the token is treated as hidden (e.g. a comment).
   */
  buildLeafNode(e, t) {
    const r = this.createLeafNode(e, !t);
    return t && (r.grammarSource = t), this.appendChild(this.current, r), r;
  }
  /**
   * Create a detached leaf node from a token, translating Chevrotain's position
   * information to the LSP conventions used by the CST.
   */
  createLeafNode(e, t) {
    return new HT(e.startOffset, e.image.length, e.startLine - 1, e.startColumn - 1, e.endLine - 1, e.endColumn, e.tokenType, t);
  }
  /**
   * Append a child node to the content of a composite node and set the child's container reference.
   */
  appendChild(e, t) {
    t.container = e, e.content.push(t);
  }
  /**
   * Append multiple child nodes to the content of a composite node and set their container references.
   */
  appendChildren(e, t) {
    for (const r of t)
      r.container = e;
    e.content.length === 0 ? e.content = t.slice() : e.content.push(...t);
  }
  /**
   * Insert child nodes at the given index into the content of a composite node and set their container references.
   */
  insertChildren(e, t, r) {
    for (const n of r)
      n.container = e;
    e.content.splice(t, 0, ...r);
  }
  /**
   * Remove a node from the content of its container.
   */
  removeNode(e) {
    const t = e.container;
    if (t) {
      const r = t.content.indexOf(e);
      r >= 0 && t.content.splice(r, 1);
    }
  }
  /**
   * Insert leaf nodes for hidden tokens (e.g. comments) into the tree. Since hidden tokens are
   * not part of the parser's token stream, the parser calls this separately: once before each
   * consumed token with the hidden tokens preceding it, and once after parsing for the trailing
   * hidden tokens. The nodes are attached where the tree is currently being built, so hidden
   * nodes end up next to the non-hidden token that follows them.
   */
  addHiddenNodes(e) {
    const t = [];
    for (const a of e)
      t.push(this.createLeafNode(a, !0));
    let r = this.current, n = !1;
    if (r.content.length > 0) {
      this.appendChildren(r, t);
      return;
    }
    for (; r.container; ) {
      const a = r.container.content.indexOf(r);
      if (a > 0) {
        this.insertChildren(r.container, a, t), n = !0;
        break;
      }
      r = r.container;
    }
    n || this.insertChildren(this.rootNode, 0, t);
  }
  /**
   * Close the current composite node and assign it to the given AST node (`item.$cstNode`).
   * The parser calls this when a rule implementation has finished, matching the preceding
   * `buildCompositeNode` (or `buildRootNode`) call; the parent node becomes current again.
   * If the closed node has no content, e.g. due to an unsuccessful optional rule call,
   * it is removed from the tree.
   */
  construct(e) {
    const t = this.current;
    e.$cstNode = t;
    const r = this.nodeStack.pop();
    r && (r.content.length === 0 ? this.removeNode(r) : r.content = r.content.slice());
  }
}, qT = class {
  static {
    i(this, "AbstractCstNode");
  }
  constructor() {
    this.container = void 0, this.grammarSource = void 0;
  }
  get root() {
    let e = this;
    for (; e.container; )
      e = e.container;
    return e;
  }
  get text() {
    return this.root.fullText.substring(this.offset, this.end);
  }
}, HT = class extends qT {
  static {
    i(this, "LeafCstNodeImpl");
  }
  get offset() {
    return this._offset;
  }
  get length() {
    return this._length;
  }
  get end() {
    return this._offset + this._length;
  }
  get hidden() {
    return this._hidden;
  }
  get tokenType() {
    return this._tokenType;
  }
  get astNode() {
    const e = this.container;
    if (!e)
      throw new Error("This node has no associated AST element");
    return e.astNode;
  }
  get range() {
    return {
      start: {
        line: this._startLine,
        character: this._startColumn
      },
      end: {
        line: this._endLine,
        character: this._endColumn
      }
    };
  }
  /**
   * All position values are 0-based and the end position is exclusive,
   * following the LSP convention (see the `Range` type).
   */
  constructor(e, t, r, n, a, s, o, l = !1) {
    super(), this._hidden = l, this._offset = Sr(e), this._length = Sr(t), this._startLine = Sr(r), this._startColumn = Sr(n), this._endLine = Sr(a), this._endColumn = Sr(s), this._tokenType = o;
  }
};
function Sr(e) {
  return e | 0;
}
i(Sr, "toSmi");
var gf = class extends qT {
  static {
    i(this, "CompositeCstNodeImpl");
  }
  constructor() {
    super(...arguments), this.content = [], this._astNode = void 0, this._rangeCache = void 0;
  }
  get astNode() {
    let e = this;
    for (; e; ) {
      if (e._astNode)
        return e._astNode;
      e = e.container;
    }
    throw new Error("This node has no associated AST element");
  }
  set astNode(e) {
    this._astNode = e;
  }
  get hidden() {
    return !1;
  }
  get offset() {
    return this.firstNonHiddenNode?.offset ?? 0;
  }
  get length() {
    return this.end - this.offset;
  }
  get end() {
    return this.lastNonHiddenNode?.end ?? 0;
  }
  get range() {
    let e = this._rangeCache;
    if (e === void 0) {
      const t = this.firstNonHiddenNode, r = this.lastNonHiddenNode;
      if (t && r) {
        const { range: n } = t, { range: a } = r;
        this._rangeCache = e = { start: n.start, end: a.end.line < n.start.line ? n.start : a.end };
      } else
        return { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
    }
    return e;
  }
  get firstNonHiddenNode() {
    for (const e of this.content)
      if (!e.hidden)
        return e;
    return this.content[0];
  }
  get lastNonHiddenNode() {
    for (let e = this.content.length - 1; e >= 0; e--) {
      const t = this.content[e];
      if (!t.hidden)
        return t;
    }
    return this.content[this.content.length - 1];
  }
}, YT = class extends gf {
  static {
    i(this, "RootCstNodeImpl");
  }
  get text() {
    return this._text.substring(this.offset, this.end);
  }
  get fullText() {
    return this._text;
  }
  constructor(e) {
    super(), this._text = "", this._text = e ?? "";
  }
}, ju = /* @__PURE__ */ Symbol("Datatype");
function Ts(e) {
  return e.$type === ju;
}
i(Ts, "isDataTypeNode");
var Ep = "​", XT = /* @__PURE__ */ i((e) => e.endsWith(Ep) ? e : e + Ep, "withRuleSuffix"), JT = class {
  static {
    i(this, "AbstractLangiumParser");
  }
  constructor(e, t) {
    this._unorderedGroups = /* @__PURE__ */ new Map(), this.allRules = /* @__PURE__ */ new Map(), this.lexer = e.parser.Lexer;
    const r = this.lexer.definition, n = e.LanguageMetaData.mode === "production";
    e.shared.profilers.LangiumProfiler?.isActive("parsing") ? this.wrapper = new rS(r, {
      ...e.parser.ParserConfig,
      skipValidations: n,
      errorMessageProvider: e.parser.ParserErrorMessageProvider
    }, t, e.shared.profilers.LangiumProfiler.createTask("parsing", e.LanguageMetaData.languageId)) : this.wrapper = new QT(r, {
      ...e.parser.ParserConfig,
      skipValidations: n,
      errorMessageProvider: e.parser.ParserErrorMessageProvider
    }, t);
  }
  alternatives(e, t) {
    this.wrapper.wrapOr(e, t);
  }
  optional(e, t) {
    this.wrapper.wrapOption(e, t);
  }
  many(e, t) {
    this.wrapper.wrapMany(e, t);
  }
  atLeastOne(e, t) {
    this.wrapper.wrapAtLeastOne(e, t);
  }
  getRule(e) {
    return this.allRules.get(e);
  }
  isRecording() {
    return this.wrapper.IS_RECORDING;
  }
  get unorderedGroups() {
    return this._unorderedGroups;
  }
  getRuleStack() {
    return this.wrapper.RULE_STACK;
  }
  finalize() {
    this.wrapper.wrapSelfAnalysis();
  }
}, Z_ = class extends JT {
  static {
    i(this, "LangiumParser");
  }
  get current() {
    return this.stack[this.stack.length - 1];
  }
  constructor(e) {
    super(e, !1), this.nodeBuilder = new WT(), this.stack = [], this.assignmentMap = /* @__PURE__ */ new Map(), this.operatorPrecedence = /* @__PURE__ */ new Map(), this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection;
  }
  rule(e, t) {
    const r = this.computeRuleType(e);
    let n;
    ni(e) && (n = e.name, this.registerPrecedenceMap(e));
    const a = this.wrapper.DEFINE_RULE(XT(e.name), this.startImplementation(r, n, t).bind(this));
    return this.allRules.set(e.name, a), bt(e) && e.entry && (this.mainRule = a), a;
  }
  registerPrecedenceMap(e) {
    const t = e.name, r = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.operators.precedences.length; n++) {
      const a = e.operators.precedences[n];
      for (const s of a.operators)
        r.set(s.value, {
          precedence: n,
          rightAssoc: a.associativity === "right"
        });
    }
    this.operatorPrecedence.set(t, r);
  }
  computeRuleType(e) {
    return ni(e) ? xn(e) : e.fragment ? void 0 : Ic(e) ? ju : xn(e);
  }
  parse(e, t = {}) {
    this.nodeBuilder.buildRootNode(e);
    const r = this.lexerResult = this.lexer.tokenize(e);
    this.wrapper.input = r.tokens;
    const n = t.rule ? this.allRules.get(t.rule) : this.mainRule;
    if (!n)
      throw new Error(t.rule ? `No rule found with name '${t.rule}'` : "No main rule available.");
    const a = this.doParse(n);
    return this.nodeBuilder.addHiddenNodes(r.hidden), this.unorderedGroups.clear(), this.lexerResult = void 0, Ss(a, { deep: !0 }), {
      value: a,
      lexerErrors: r.errors,
      lexerReport: r.report,
      parserErrors: this.wrapper.errors
    };
  }
  doParse(e) {
    let t = this.wrapper.rule(e);
    if (this.stack.length > 0 && (t = this.construct()), t === void 0)
      throw new Error("No result from parser");
    if (this.stack.length > 0)
      throw new Error("Parser stack is not empty after parsing");
    return this.linkCstNode(t), t;
  }
  /**
   * Assigns the CST-to-AST backlink for the given AST node. The link is stored only on the
   * CST node that is directly associated with an AST node (i.e. its `$cstNode`); all other
   * CST nodes find their AST node by walking up the container hierarchy in the `astNode`
   * getter. This method is called once per AST node as soon as its `$cstNode` is final:
   * for the parse result root here in `doParse`, for all other nodes in `assign`.
   */
  linkCstNode(e) {
    we(e) && e.$cstNode && (e.$cstNode.astNode = e);
  }
  startImplementation(e, t, r) {
    return (n) => {
      const a = !this.isRecording() && e !== void 0;
      if (a) {
        const s = { $type: e };
        this.stack.push(s), e === ju ? s.value = "" : t !== void 0 && (s.$infixName = t);
      }
      return r(n), a ? this.construct() : void 0;
    };
  }
  extractHiddenTokens(e) {
    const t = this.lexerResult.hidden;
    if (!t.length)
      return [];
    const r = e.startOffset;
    for (let n = 0; n < t.length; n++)
      if (t[n].startOffset > r)
        return t.splice(0, n);
    return t.splice(0, t.length);
  }
  consume(e, t, r) {
    const n = this.wrapper.wrapConsume(e, t);
    if (!this.isRecording() && this.isValidToken(n)) {
      const a = this.extractHiddenTokens(n);
      this.nodeBuilder.addHiddenNodes(a);
      const s = this.nodeBuilder.buildLeafNode(n, r), { assignment: o, crossRef: l } = this.getAssignment(r), u = this.current;
      if (o) {
        const c = rr(r) ? n.image : this.converter.convert(n.image, s);
        this.assign(o.operator, o.feature, c, s, l);
      } else if (Ts(u)) {
        let c = n.image;
        rr(r) || (c = this.converter.convert(c, s).toString()), u.value += c;
      }
    }
  }
  /**
   * Most consumed parser tokens are valid. However there are two cases in which they are not valid:
   *
   * 1. They were inserted during error recovery by the parser. These tokens don't really exist and should not be further processed
   * 2. They contain invalid token ranges. This might include the special EOF token, or other tokens produced by invalid token builders.
   */
  isValidToken(e) {
    return !e.isInsertedInRecovery && ks(e);
  }
  subrule(e, t, r, n, a) {
    let s;
    !this.isRecording() && !r && (s = this.nodeBuilder.buildCompositeNode(n));
    let o;
    try {
      o = this.wrapper.wrapSubrule(e, t, a);
    } finally {
      this.isRecording() || (o === void 0 && !r && (o = this.construct()), o !== void 0 && s && s.length > 0 && this.performSubruleAssignment(o, n, s));
    }
  }
  performSubruleAssignment(e, t, r) {
    const { assignment: n, crossRef: a } = this.getAssignment(t);
    if (n)
      this.assign(n.operator, n.feature, e, r, a);
    else if (!n) {
      const s = this.current;
      if (Ts(s))
        s.value += e.toString();
      else if (typeof e == "object" && e) {
        const l = this.assignWithoutOverride(e, s);
        this.stack.pop(), this.stack.push(l);
      }
    }
  }
  action(e, t) {
    if (!this.isRecording()) {
      let r = this.current;
      if (t.feature && t.operator) {
        r = this.construct(), this.nodeBuilder.removeNode(r.$cstNode);
        const n = this.nodeBuilder.buildCompositeNode(t);
        this.nodeBuilder.appendChild(n, r.$cstNode);
        const a = { $type: e };
        this.stack.push(a), this.assign(t.operator, t.feature, r, r.$cstNode);
      } else
        r.$type = e;
    }
  }
  construct() {
    if (this.isRecording())
      return;
    const e = this.stack.pop();
    return this.nodeBuilder.construct(e), "$infixName" in e ? this.constructInfix(e, this.operatorPrecedence.get(e.$infixName)) : Ts(e) ? this.converter.convert(e.value, e.$cstNode) : (Yd(this.astReflection, e), e);
  }
  constructInfix(e, t) {
    const r = e.parts;
    if (!Array.isArray(r) || r.length === 0)
      return;
    const n = e.operators;
    if (!Array.isArray(n) || r.length < 2)
      return r[0];
    let a = 0, s = -1;
    for (let A = 0; A < n.length; A++) {
      const T = n[A], v = t.get(T) ?? {
        precedence: 1 / 0,
        rightAssoc: !1
      };
      v.precedence > s ? (s = v.precedence, a = A) : v.precedence === s && (v.rightAssoc || (a = A));
    }
    const o = n.slice(0, a), l = n.slice(a + 1), u = r.slice(0, a + 1), c = r.slice(a + 1), p = {
      $infixName: e.$infixName,
      $type: e.$type,
      $cstNode: e.$cstNode,
      parts: u,
      operators: o
    }, h = {
      $infixName: e.$infixName,
      $type: e.$type,
      $cstNode: e.$cstNode,
      parts: c,
      operators: l
    }, y = this.constructInfix(p, t), d = this.constructInfix(h, t);
    return {
      $type: e.$type,
      $cstNode: e.$cstNode,
      left: y,
      operator: n[a],
      right: d
    };
  }
  getAssignment(e) {
    if (!this.assignmentMap.has(e)) {
      const t = Ti(e, tr);
      this.assignmentMap.set(e, {
        assignment: t,
        crossRef: t && Ri(t.terminal) ? t.terminal.isMulti ? "multi" : "single" : void 0
      });
    }
    return this.assignmentMap.get(e);
  }
  assign(e, t, r, n, a) {
    const s = this.current;
    let o;
    switch (a === "single" && typeof r == "string" ? o = this.linker.buildReference(s, t, n, r) : a === "multi" && typeof r == "string" ? o = this.linker.buildMultiReference(s, t, n, r) : o = r, this.linkCstNode(o), e) {
      case "=": {
        s[t] = o;
        break;
      }
      case "?=": {
        s[t] = !0;
        break;
      }
      case "+=":
        Array.isArray(s[t]) || (s[t] = []), s[t].push(o);
    }
  }
  assignWithoutOverride(e, t) {
    for (const [r, n] of Object.entries(t)) {
      const a = e[r];
      a === void 0 ? e[r] = n : Array.isArray(a) && Array.isArray(n) && (n.push(...a), e[r] = n);
    }
    return e.$cstNode = void 0, e;
  }
  get definitionErrors() {
    return this.wrapper.definitionErrors;
  }
}, Q_ = class {
  static {
    i(this, "AbstractParserErrorMessageProvider");
  }
  buildMismatchTokenMessage(e) {
    return Nn.buildMismatchTokenMessage(e);
  }
  buildNotAllInputParsedMessage(e) {
    return Nn.buildNotAllInputParsedMessage(e);
  }
  buildNoViableAltMessage(e) {
    return Nn.buildNoViableAltMessage(e);
  }
  buildEarlyExitMessage(e) {
    return Nn.buildEarlyExitMessage(e);
  }
}, ZT = class extends Q_ {
  static {
    i(this, "LangiumParserErrorMessageProvider");
  }
  buildMismatchTokenMessage({ expected: e, actual: t }) {
    return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${t.image}\`.`;
  }
  buildNotAllInputParsedMessage({ firstRedundant: e }) {
    return `Expecting end of file but found \`${e.image}\`.`;
  }
}, eS = class extends JT {
  static {
    i(this, "LangiumCompletionParser");
  }
  constructor(e) {
    super(e, !0), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  action() {
  }
  construct() {
  }
  parse(e) {
    this.resetState();
    const t = this.lexer.tokenize(e, { mode: "partial" });
    return this.tokens = t.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), {
      tokens: this.tokens,
      elementStack: [...this.lastElementStack],
      tokenIndex: this.nextTokenIndex
    };
  }
  rule(e, t) {
    const r = this.wrapper.DEFINE_RULE(XT(e.name), this.startImplementation(t).bind(this));
    return this.allRules.set(e.name, r), e.entry && (this.mainRule = r), r;
  }
  resetState() {
    this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
  }
  startImplementation(e) {
    return (t) => {
      const r = this.keepStackSize();
      try {
        e(t);
      } finally {
        this.resetStackSize(r);
      }
    };
  }
  removeUnexpectedElements() {
    this.elementStack.splice(this.stackSize);
  }
  keepStackSize() {
    const e = this.elementStack.length;
    return this.stackSize = e, e;
  }
  resetStackSize(e) {
    this.removeUnexpectedElements(), this.stackSize = e;
  }
  consume(e, t, r) {
    this.wrapper.wrapConsume(e, t), this.isRecording() || (this.lastElementStack = [...this.elementStack, r], this.nextTokenIndex = this.currIdx + 1);
  }
  subrule(e, t, r, n, a) {
    this.before(n), this.wrapper.wrapSubrule(e, t, a), this.after(n);
  }
  before(e) {
    this.isRecording() || this.elementStack.push(e);
  }
  after(e) {
    if (!this.isRecording()) {
      const t = this.elementStack.lastIndexOf(e);
      t >= 0 && this.elementStack.splice(t);
    }
  }
  get currIdx() {
    return this.wrapper.currIdx;
  }
}, tS = {
  recoveryEnabled: !0,
  nodeLocationTracking: "full",
  skipValidations: !0,
  errorMessageProvider: new ZT()
}, QT = class extends FA {
  static {
    i(this, "ChevrotainWrapper");
  }
  constructor(e, t, r) {
    const n = t && "maxLookahead" in t;
    super(e, {
      ...tS,
      lookaheadStrategy: n ? new Xc({ maxLookahead: t.maxLookahead }) : new J_({
        // If validations are skipped, don't log the lookahead warnings
        logging: t.skipValidations ? () => {
        } : void 0,
        incomplete: r
      }),
      ...t
    });
  }
  get IS_RECORDING() {
    return this.RECORDING_PHASE;
  }
  DEFINE_RULE(e, t, r) {
    return this.RULE(e, t, r);
  }
  wrapSelfAnalysis() {
    this.performSelfAnalysis();
  }
  wrapConsume(e, t) {
    return this.consume(e, t, void 0);
  }
  wrapSubrule(e, t, r) {
    return this.subrule(e, t, {
      ARGS: [r]
    });
  }
  wrapOr(e, t) {
    this.or(e, t);
  }
  wrapOption(e, t) {
    this.option(e, t);
  }
  wrapMany(e, t) {
    this.many(e, t);
  }
  wrapAtLeastOne(e, t) {
    this.atLeastOne(e, t);
  }
  rule(e) {
    return e.call(this, {});
  }
}, rS = class extends QT {
  static {
    i(this, "ProfilerWrapper");
  }
  constructor(e, t, r, n) {
    super(e, t, r), this.task = n;
  }
  rule(e) {
    this.task.start(), this.task.startSubTask(this.ruleName(e));
    try {
      return super.rule(e);
    } finally {
      this.task.stopSubTask(this.ruleName(e)), this.task.stop();
    }
  }
  ruleName(e) {
    return e.ruleName;
  }
  subrule(e, t, r) {
    this.task.startSubTask(this.ruleName(t));
    try {
      return super.subrule(e, t, r);
    } finally {
      this.task.stopSubTask(this.ruleName(t));
    }
  }
};
function vf(e, t, r) {
  return e$({
    parser: t,
    tokens: r,
    ruleNames: /* @__PURE__ */ new Map()
  }, e), t;
}
i(vf, "createParser");
function e$(e, t) {
  const r = _c(t, !1), n = ce(t.rules).filter(bt).filter((s) => r.has(s));
  for (const s of n) {
    const o = {
      ...e,
      consume: 1,
      optional: 1,
      subrule: 1,
      many: 1,
      or: 1
    };
    e.parser.rule(s, ir(o, s.definition));
  }
  const a = ce(t.rules).filter(ni).filter((s) => r.has(s));
  for (const s of a)
    e.parser.rule(s, t$(e, s));
}
i(e$, "buildRules");
function t$(e, t) {
  const r = t.call.rule.ref;
  if (!r)
    throw new Error("Could not resolve reference to infix operator rule: " + t.call.rule.$refText);
  if (_t(r))
    throw new Error("Cannot use terminal rule in infix expression");
  const n = t.operators.precedences.flatMap((d) => d.operators), a = {
    $type: "Group",
    elements: []
  }, s = {
    $container: a,
    $type: "Assignment",
    feature: "parts",
    operator: "+=",
    terminal: t.call
  }, o = {
    $container: a,
    $type: "Group",
    elements: [],
    cardinality: "*"
  };
  a.elements.push(s, o);
  const u = {
    $container: o,
    $type: "Assignment",
    feature: "operators",
    operator: "+=",
    terminal: {
      $type: "Alternatives",
      elements: n
    }
  }, c = {
    ...s,
    $container: o
  };
  o.elements.push(u, c);
  const h = n.map((d) => e.tokens[d.value]).map((d, A) => ({
    ALT: /* @__PURE__ */ i(() => e.parser.consume(A, d, u), "ALT")
  }));
  let y;
  return (d) => {
    y ?? (y = Eo(e, r)), e.parser.subrule(0, y, !1, s, d), e.parser.many(0, {
      DEF: /* @__PURE__ */ i(() => {
        e.parser.alternatives(0, h), e.parser.subrule(1, y, !1, c, d);
      }, "DEF")
    });
  };
}
i(t$, "buildInfixRule");
function ir(e, t, r = !1) {
  let n;
  if (rr(t))
    n = l$(e, t);
  else if ($i(t))
    n = r$(e, t);
  else if (tr(t))
    n = ir(e, t.terminal);
  else if (Ri(t))
    n = Tf(e, t);
  else if (nr(t))
    n = n$(e, t);
  else if (Rc(t))
    n = i$(e, t);
  else if (Cc(t))
    n = s$(e, t);
  else if (Ys(t))
    n = o$(e, t);
  else if (tm(t)) {
    const a = e.consume++;
    n = /* @__PURE__ */ i(() => e.parser.consume(a, Vt, t), "method");
  } else
    throw new Rm(t.$cstNode, `Unexpected element type: ${t.$type}`);
  return $f(e, r ? void 0 : di(t), n, t.cardinality);
}
i(ir, "buildElement");
function r$(e, t) {
  const r = xn(t);
  return () => e.parser.action(r, t);
}
i(r$, "buildAction");
function n$(e, t) {
  const r = t.rule.ref;
  if (Un(r)) {
    const n = e.subrule++, a = bt(r) && r.fragment, s = t.arguments.length > 0 ? a$(r, t.arguments) : () => ({});
    let o;
    return (l) => {
      o ?? (o = Eo(e, r)), e.parser.subrule(n, o, a, t, s(l));
    };
  } else if (_t(r)) {
    const n = e.consume++, a = Us(e, r.name);
    return () => e.parser.consume(n, a, t);
  } else if (r)
    Bn();
  else
    throw new Rm(t.$cstNode, `Undefined rule: ${t.rule.$refText}`);
}
i(n$, "buildRuleCall");
function a$(e, t) {
  if (t.some((n) => n.calledByName)) {
    const n = t.map((a) => ({
      parameterName: a.parameter?.ref?.name,
      predicate: ct(a.value)
    }));
    return (a) => {
      const s = {};
      for (const { parameterName: o, predicate: l } of n)
        o && (s[o] = l(a));
      return s;
    };
  } else {
    const n = t.map((a) => ct(a.value));
    return (a) => {
      const s = {};
      for (let o = 0; o < n.length; o++)
        if (o < e.parameters.length) {
          const l = e.parameters[o].name, u = n[o];
          s[l] = u(a);
        }
      return s;
    };
  }
}
i(a$, "buildRuleCallPredicate");
function ct(e) {
  if (em(e)) {
    const t = ct(e.left), r = ct(e.right);
    return (n) => t(n) || r(n);
  } else if (Qd(e)) {
    const t = ct(e.left), r = ct(e.right);
    return (n) => t(n) && r(n);
  } else if (am(e)) {
    const t = ct(e.value);
    return (r) => !t(r);
  } else if (im(e)) {
    const t = e.parameter.ref.name;
    return (r) => r !== void 0 && r[t] === !0;
  } else if (Jd(e)) {
    const t = !!e.true;
    return () => t;
  }
  Bn();
}
i(ct, "buildPredicate");
function i$(e, t) {
  if (t.elements.length === 1)
    return ir(e, t.elements[0]);
  {
    const r = [];
    for (const a of t.elements) {
      const s = {
        // Since we handle the guard condition in the alternative already
        // We can ignore the group guard condition inside
        ALT: ir(e, a, !0)
      }, o = di(a);
      o && (s.GATE = ct(o)), r.push(s);
    }
    const n = e.or++;
    return (a) => e.parser.alternatives(n, r.map((s) => {
      const o = {
        ALT: /* @__PURE__ */ i(() => s.ALT(a), "ALT")
      }, l = s.GATE;
      return l && (o.GATE = () => l(a)), o;
    }));
  }
}
i(i$, "buildAlternatives");
function s$(e, t) {
  if (t.elements.length === 1)
    return ir(e, t.elements[0]);
  const r = [];
  for (const l of t.elements) {
    const u = {
      // Since we handle the guard condition in the alternative already
      // We can ignore the group guard condition inside
      ALT: ir(e, l, !0)
    }, c = di(l);
    c && (u.GATE = ct(c)), r.push(u);
  }
  const n = e.or++, a = /* @__PURE__ */ i((l, u) => {
    const c = u.getRuleStack().join("-");
    return `uGroup_${l}_${c}`;
  }, "idFunc"), s = /* @__PURE__ */ i((l) => e.parser.alternatives(n, r.map((u, c) => {
    const p = { ALT: /* @__PURE__ */ i(() => !0, "ALT") }, h = e.parser;
    p.ALT = () => {
      if (u.ALT(l), !h.isRecording()) {
        const d = a(n, h);
        h.unorderedGroups.get(d) || h.unorderedGroups.set(d, []);
        const A = h.unorderedGroups.get(d);
        typeof A?.[c] > "u" && (A[c] = !0);
      }
    };
    const y = u.GATE;
    return y ? p.GATE = () => y(l) : p.GATE = () => !h.unorderedGroups.get(a(n, h))?.[c], p;
  })), "alternatives"), o = $f(e, di(t), s, "*");
  return (l) => {
    o(l), e.parser.isRecording() || e.parser.unorderedGroups.delete(a(n, e.parser));
  };
}
i(s$, "buildUnorderedGroup");
function o$(e, t) {
  const r = t.elements.map((n) => ir(e, n));
  return (n) => r.forEach((a) => a(n));
}
i(o$, "buildGroup");
function di(e) {
  if (Ys(e))
    return e.guardCondition;
}
i(di, "getGuardCondition");
function Tf(e, t, r = t.terminal) {
  if (r)
    if (nr(r) && bt(r.rule.ref)) {
      const n = r.rule.ref, a = e.subrule++;
      let s;
      return (o) => {
        s ?? (s = Eo(e, n)), e.parser.subrule(a, s, !1, t, o);
      };
    } else if (nr(r) && _t(r.rule.ref)) {
      const n = e.consume++, a = Us(e, r.rule.ref.name);
      return () => e.parser.consume(n, a, t);
    } else if (rr(r)) {
      const n = e.consume++, a = Us(e, r.value);
      return () => e.parser.consume(n, a, t);
    } else
      throw new Error("Could not build cross reference parser");
  else {
    if (!t.type.ref)
      throw new Error("Could not resolve reference to type: " + t.type.$refText);
    const a = Pc(t.type.ref)?.terminal;
    if (!a)
      throw new Error("Could not find name assignment for type: " + xn(t.type.ref));
    return Tf(e, t, a);
  }
}
i(Tf, "buildCrossReference");
function l$(e, t) {
  const r = e.consume++, n = e.tokens[t.value];
  if (!n)
    throw new Error("Could not find token for keyword: " + t.value);
  return () => e.parser.consume(r, n, t);
}
i(l$, "buildKeyword");
function $f(e, t, r, n) {
  const a = t && ct(t);
  if (!n)
    if (a) {
      const s = e.or++;
      return (o) => e.parser.alternatives(s, [
        {
          ALT: /* @__PURE__ */ i(() => r(o), "ALT"),
          GATE: /* @__PURE__ */ i(() => a(o), "GATE")
        },
        {
          ALT: Iu(),
          GATE: /* @__PURE__ */ i(() => !a(o), "GATE")
        }
      ]);
    } else
      return r;
  if (n === "*") {
    const s = e.many++;
    return (o) => e.parser.many(s, {
      DEF: /* @__PURE__ */ i(() => r(o), "DEF"),
      GATE: a ? () => a(o) : void 0
    });
  } else if (n === "+") {
    const s = e.many++;
    if (a) {
      const o = e.or++;
      return (l) => e.parser.alternatives(o, [
        {
          ALT: /* @__PURE__ */ i(() => e.parser.atLeastOne(s, {
            DEF: /* @__PURE__ */ i(() => r(l), "DEF")
          }), "ALT"),
          GATE: /* @__PURE__ */ i(() => a(l), "GATE")
        },
        {
          ALT: Iu(),
          GATE: /* @__PURE__ */ i(() => !a(l), "GATE")
        }
      ]);
    } else
      return (o) => e.parser.atLeastOne(s, {
        DEF: /* @__PURE__ */ i(() => r(o), "DEF")
      });
  } else if (n === "?") {
    const s = e.optional++;
    return (o) => e.parser.optional(s, {
      DEF: /* @__PURE__ */ i(() => r(o), "DEF"),
      GATE: a ? () => a(o) : void 0
    });
  } else
    Bn();
}
i($f, "wrap");
function Eo(e, t) {
  const r = u$(e, t), n = e.parser.getRule(r);
  if (!n)
    throw new Error(`Rule "${r}" not found."`);
  return n;
}
i(Eo, "getRule");
function u$(e, t) {
  if (Un(t))
    return t.name;
  if (e.ruleNames.has(t))
    return e.ruleNames.get(t);
  {
    let r = t, n = r.$container, a = t.$type;
    for (; !bt(n); )
      (Ys(n) || Rc(n) || Cc(n)) && (a = n.elements.indexOf(r).toString() + ":" + a), r = n, n = n.$container;
    return a = n.name + ":" + a, e.ruleNames.set(t, a), a;
  }
}
i(u$, "getRuleName");
function Us(e, t) {
  const r = e.tokens[t];
  if (!r)
    throw new Error(`Token "${t}" not found."`);
  return r;
}
i(Us, "getToken");
function c$(e) {
  const t = e.Grammar, r = e.parser.Lexer, n = new eS(e);
  return vf(t, n, r.definition), n.finalize(), n;
}
i(c$, "createCompletionParser");
function f$(e) {
  const t = p$(e);
  return t.finalize(), t;
}
i(f$, "createLangiumParser");
function p$(e) {
  const t = e.Grammar, r = e.parser.Lexer, n = new Z_(e);
  return vf(t, n, r.definition);
}
i(p$, "prepareLangiumParser");
var d$ = class {
  static {
    i(this, "DefaultTokenBuilder");
  }
  constructor() {
    this.diagnostics = [];
  }
  buildTokens(e, t) {
    const r = ce(_c(e, !1)), n = this.buildTerminalTokens(r), a = this.buildKeywordTokens(r, n, t);
    return a.push(...n), a;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flushLexingReport(e) {
    return { diagnostics: this.popDiagnostics() };
  }
  popDiagnostics() {
    const e = [...this.diagnostics];
    return this.diagnostics = [], e;
  }
  buildTerminalTokens(e) {
    return e.filter(_t).filter((t) => !t.fragment).map((t) => this.buildTerminalToken(t)).toArray();
  }
  buildTerminalToken(e) {
    const t = Zs(e), r = this.requiresCustomPattern(t) ? this.regexPatternFunction(t) : t, n = {
      name: e.name,
      PATTERN: r
    };
    return typeof r == "function" && (n.LINE_BREAKS = !0), e.hidden && (n.GROUP = bc(t) ? Be.SKIPPED : "hidden"), n;
  }
  requiresCustomPattern(e) {
    return !!(e.flags.includes("u") || e.flags.includes("s"));
  }
  regexPatternFunction(e) {
    const t = new RegExp(e, e.flags + "y");
    return (r, n) => (t.lastIndex = n, t.exec(r));
  }
  buildKeywordTokens(e, t, r) {
    return e.filter(Un).flatMap((n) => zn(n).filter(rr)).distinct((n) => n.value).toArray().sort((n, a) => a.value.length - n.value.length).map((n) => this.buildKeywordToken(n, t, !!r?.caseInsensitive));
  }
  buildKeywordToken(e, t, r) {
    const n = this.buildKeywordPattern(e, r), a = {
      name: e.value,
      PATTERN: n,
      LONGER_ALT: this.findLongerAlt(e, t)
    };
    return typeof n == "function" && (a.LINE_BREAKS = !0), a;
  }
  buildKeywordPattern(e, t) {
    return t ? new RegExp(Ai(e.value), "i") : e.value;
  }
  findLongerAlt(e, t) {
    return t.reduce((r, n) => {
      const a = n?.PATTERN;
      return a?.source && bm("^" + a.source + "$", e.value) && r.push(n), r;
    }, []);
  }
}, m$ = class {
  static {
    i(this, "DefaultValueConverter");
  }
  convert(e, t) {
    let r = t.grammarSource;
    if (Ri(r) && (r = Pm(r)), nr(r)) {
      const n = r.rule.ref;
      if (!n)
        throw new Error("This cst node was not parsed by a rule.");
      return this.runConverter(n, e, t);
    }
    return e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runConverter(e, t, r) {
    switch (e.name.toUpperCase()) {
      case "INT":
        return Ft.convertInt(t);
      case "STRING":
        return Ft.convertString(t);
      case "ID":
        return Ft.convertID(t);
    }
    switch (Dm(e)?.toLowerCase()) {
      case "number":
        return Ft.convertNumber(t);
      case "boolean":
        return Ft.convertBoolean(t);
      case "bigint":
        return Ft.convertBigint(t);
      case "date":
        return Ft.convertDate(t);
      default:
        return t;
    }
  }
}, Ft;
(function(e) {
  function t(c) {
    let p = "";
    for (let h = 1; h < c.length - 1; h++) {
      const y = c.charAt(h);
      if (y === "\\") {
        const d = c.charAt(++h);
        p += r(d);
      } else
        p += y;
    }
    return p;
  }
  i(t, "convertString"), e.convertString = t;
  function r(c) {
    switch (c) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return `
`;
      case "r":
        return "\r";
      case "t":
        return "	";
      case "v":
        return "\v";
      case "0":
        return "\0";
      default:
        return c;
    }
  }
  i(r, "convertEscapeCharacter");
  function n(c) {
    return c.charAt(0) === "^" ? c.substring(1) : c;
  }
  i(n, "convertID"), e.convertID = n;
  function a(c) {
    return parseInt(c);
  }
  i(a, "convertInt"), e.convertInt = a;
  function s(c) {
    return BigInt(c);
  }
  i(s, "convertBigint"), e.convertBigint = s;
  function o(c) {
    return new Date(c);
  }
  i(o, "convertDate"), e.convertDate = o;
  function l(c) {
    return Number(c);
  }
  i(l, "convertNumber"), e.convertNumber = l;
  function u(c) {
    return c.toLowerCase() === "true";
  }
  i(u, "convertBoolean"), e.convertBoolean = u;
})(Ft || (Ft = {}));
var he = dc(gc());
function h$() {
  return new Promise((e) => {
    typeof setImmediate > "u" ? setTimeout(e, 0) : setImmediate(e);
  });
}
i(h$, "delayNextTick");
var $s = 0, nS = 10;
function y$() {
  return $s = performance.now(), new he.CancellationTokenSource();
}
i(y$, "startCancelableOperation");
var On = /* @__PURE__ */ Symbol("OperationCancelled");
function bi(e) {
  return e === On;
}
i(bi, "isOperationCancelled");
async function Le(e) {
  if (e === he.CancellationToken.None)
    return;
  const t = performance.now();
  if (t - $s >= nS && ($s = t, await h$(), $s = performance.now()), e.isCancellationRequested)
    throw On;
}
i(Le, "interruptAndCheck");
var Rf = class {
  static {
    i(this, "Deferred");
  }
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = (r) => (e(r), this), this.reject = (r) => (t(r), this);
    });
  }
}, Cp = class zu {
  static {
    i(this, "FullTextDocument");
  }
  constructor(t, r, n, a) {
    this._uri = t, this._languageId = r, this._version = n, this._content = a, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(t) {
    if (t) {
      const r = this.offsetAt(t.start), n = this.offsetAt(t.end);
      return this._content.substring(r, n);
    }
    return this._content;
  }
  update(t, r) {
    for (const n of t)
      if (zu.isIncremental(n)) {
        const a = Ef(n.range), s = this.offsetAt(a.start), o = this.offsetAt(a.end);
        this._content = this._content.substring(0, s) + n.text + this._content.substring(o, this._content.length);
        const l = Math.max(a.start.line, 0), u = Math.max(a.end.line, 0);
        let c = this._lineOffsets;
        const p = Bu(n.text, !1, s);
        if (u - l === p.length)
          for (let y = 0, d = p.length; y < d; y++)
            c[y + l + 1] = p[y];
        else
          p.length < 1e4 ? c.splice(l + 1, u - l, ...p) : this._lineOffsets = c = c.slice(0, l + 1).concat(p, c.slice(u + 1));
        const h = n.text.length - (o - s);
        if (h !== 0)
          for (let y = l + 1 + p.length, d = c.length; y < d; y++)
            c[y] = c[y] + h;
      } else if (zu.isFull(n))
        this._content = n.text, this._lineOffsets = void 0;
      else
        throw new Error("Unknown change event received");
    this._version = r;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = Bu(this._content, !0)), this._lineOffsets;
  }
  positionAt(t) {
    t = Math.max(Math.min(t, this._content.length), 0);
    const r = this.getLineOffsets();
    let n = 0, a = r.length;
    if (a === 0)
      return { line: 0, character: t };
    for (; n < a; ) {
      const o = Math.floor((n + a) / 2);
      r[o] > t ? a = o : n = o + 1;
    }
    const s = n - 1;
    return t = this.ensureBeforeEOL(t, r[s]), { line: s, character: t - r[s] };
  }
  offsetAt(t) {
    const r = this.getLineOffsets();
    if (t.line >= r.length)
      return this._content.length;
    if (t.line < 0)
      return 0;
    const n = r[t.line];
    if (t.character <= 0)
      return n;
    const a = t.line + 1 < r.length ? r[t.line + 1] : this._content.length, s = Math.min(n + t.character, a);
    return this.ensureBeforeEOL(s, n);
  }
  getLineRange(t) {
    const r = this.getLineOffsets();
    if (t >= r.length) {
      const o = r.length - 1;
      return { start: { line: o, character: 0 }, end: { line: o, character: this._content.length - r[o] } };
    } else if (t < 0)
      return { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } };
    const n = r[t], a = t + 1 < r.length ? r[t + 1] : this._content.length, s = this.ensureBeforeEOL(a, n);
    return { start: { line: t, character: 0 }, end: { line: t, character: s - n } };
  }
  getEOLCharacters(t) {
    const r = this.getLineOffsets();
    if (t >= r.length)
      return "";
    if (t < 0)
      return "";
    const n = t + 1 < r.length ? r[t + 1] : this._content.length, a = this.ensureBeforeEOL(n, r[t]);
    return this._content.substring(a, n);
  }
  ensureBeforeEOL(t, r) {
    for (; t > r && Af(this._content.charCodeAt(t - 1)); )
      t--;
    return t;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(t) {
    const r = t;
    return r != null && typeof r.text == "string" && r.range !== void 0 && (r.rangeLength === void 0 || typeof r.rangeLength == "number");
  }
  static isFull(t) {
    const r = t;
    return r != null && typeof r.text == "string" && r.range === void 0 && r.rangeLength === void 0;
  }
}, Uu;
(function(e) {
  function t(a, s, o, l) {
    return new Cp(a, s, o, l);
  }
  i(t, "create"), e.create = t;
  function r(a, s, o) {
    if (a instanceof Cp)
      return a.update(s, o), a;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  i(r, "update"), e.update = r;
  function n(a, s) {
    const o = a.getText(), l = Bs(s.map(g$), (p, h) => {
      const y = p.range.start.line - h.range.start.line;
      return y === 0 ? p.range.start.character - h.range.start.character : y;
    });
    let u = 0;
    const c = [];
    for (const p of l) {
      const h = a.offsetAt(p.range.start);
      if (h < u)
        throw new Error("Overlapping edit");
      h > u && c.push(o.substring(u, h)), p.newText.length && c.push(p.newText), u = a.offsetAt(p.range.end);
    }
    return c.push(o.substr(u)), c.join("");
  }
  i(n, "applyEdits"), e.applyEdits = n;
})(Uu || (Uu = {}));
function Bs(e, t) {
  if (e.length <= 1)
    return e;
  const r = e.length / 2 | 0, n = e.slice(0, r), a = e.slice(r);
  Bs(n, t), Bs(a, t);
  let s = 0, o = 0, l = 0;
  for (; s < n.length && o < a.length; )
    t(n[s], a[o]) <= 0 ? e[l++] = n[s++] : e[l++] = a[o++];
  for (; s < n.length; )
    e[l++] = n[s++];
  for (; o < a.length; )
    e[l++] = a[o++];
  return e;
}
i(Bs, "mergeSort");
function Bu(e, t, r = 0) {
  const n = t ? [r] : [];
  for (let a = 0; a < e.length; a++) {
    const s = e.charCodeAt(a);
    Af(s) && (s === 13 && a + 1 < e.length && e.charCodeAt(a + 1) === 10 && a++, n.push(r + a + 1));
  }
  return n;
}
i(Bu, "computeLineOffsets");
function Af(e) {
  return e === 13 || e === 10;
}
i(Af, "isEOL");
function Ef(e) {
  const t = e.start, r = e.end;
  return t.line > r.line || t.line === r.line && t.character > r.character ? { start: r, end: t } : e;
}
i(Ef, "getWellformedRange");
function g$(e) {
  const t = Ef(e.range);
  return t !== e.range ? { newText: e.newText, range: t } : e;
}
i(g$, "getWellformedEdit");
var v$;
(() => {
  var e = { 975: (L) => {
    function k(P) {
      if (typeof P != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(P));
    }
    i(k, "e");
    function x(P, R) {
      for (var g, b = "", I = 0, _ = -1, N = 0, V = 0; V <= P.length; ++V) {
        if (V < P.length) g = P.charCodeAt(V);
        else {
          if (g === 47) break;
          g = 47;
        }
        if (g === 47) {
          if (!(_ === V - 1 || N === 1)) if (_ !== V - 1 && N === 2) {
            if (b.length < 2 || I !== 2 || b.charCodeAt(b.length - 1) !== 46 || b.charCodeAt(b.length - 2) !== 46) {
              if (b.length > 2) {
                var q = b.lastIndexOf("/");
                if (q !== b.length - 1) {
                  q === -1 ? (b = "", I = 0) : I = (b = b.slice(0, q)).length - 1 - b.lastIndexOf("/"), _ = V, N = 0;
                  continue;
                }
              } else if (b.length === 2 || b.length === 1) {
                b = "", I = 0, _ = V, N = 0;
                continue;
              }
            }
            R && (b.length > 0 ? b += "/.." : b = "..", I = 2);
          } else b.length > 0 ? b += "/" + P.slice(_ + 1, V) : b = P.slice(_ + 1, V), I = V - _ - 1;
          _ = V, N = 0;
        } else g === 46 && N !== -1 ? ++N : N = -1;
      }
      return b;
    }
    i(x, "r");
    var G = { resolve: /* @__PURE__ */ i(function() {
      for (var P, R = "", g = !1, b = arguments.length - 1; b >= -1 && !g; b--) {
        var I;
        b >= 0 ? I = arguments[b] : (P === void 0 && (P = process.cwd()), I = P), k(I), I.length !== 0 && (R = I + "/" + R, g = I.charCodeAt(0) === 47);
      }
      return R = x(R, !g), g ? R.length > 0 ? "/" + R : "/" : R.length > 0 ? R : ".";
    }, "resolve"), normalize: /* @__PURE__ */ i(function(P) {
      if (k(P), P.length === 0) return ".";
      var R = P.charCodeAt(0) === 47, g = P.charCodeAt(P.length - 1) === 47;
      return (P = x(P, !R)).length !== 0 || R || (P = "."), P.length > 0 && g && (P += "/"), R ? "/" + P : P;
    }, "normalize"), isAbsolute: /* @__PURE__ */ i(function(P) {
      return k(P), P.length > 0 && P.charCodeAt(0) === 47;
    }, "isAbsolute"), join: /* @__PURE__ */ i(function() {
      if (arguments.length === 0) return ".";
      for (var P, R = 0; R < arguments.length; ++R) {
        var g = arguments[R];
        k(g), g.length > 0 && (P === void 0 ? P = g : P += "/" + g);
      }
      return P === void 0 ? "." : G.normalize(P);
    }, "join"), relative: /* @__PURE__ */ i(function(P, R) {
      if (k(P), k(R), P === R || (P = G.resolve(P)) === (R = G.resolve(R))) return "";
      for (var g = 1; g < P.length && P.charCodeAt(g) === 47; ++g) ;
      for (var b = P.length, I = b - g, _ = 1; _ < R.length && R.charCodeAt(_) === 47; ++_) ;
      for (var N = R.length - _, V = I < N ? I : N, q = -1, W = 0; W <= V; ++W) {
        if (W === V) {
          if (N > V) {
            if (R.charCodeAt(_ + W) === 47) return R.slice(_ + W + 1);
            if (W === 0) return R.slice(_ + W);
          } else I > V && (P.charCodeAt(g + W) === 47 ? q = W : W === 0 && (q = 0));
          break;
        }
        var Ee = P.charCodeAt(g + W);
        if (Ee !== R.charCodeAt(_ + W)) break;
        Ee === 47 && (q = W);
      }
      var te = "";
      for (W = g + q + 1; W <= b; ++W) W !== b && P.charCodeAt(W) !== 47 || (te.length === 0 ? te += ".." : te += "/..");
      return te.length > 0 ? te + R.slice(_ + q) : (_ += q, R.charCodeAt(_) === 47 && ++_, R.slice(_));
    }, "relative"), _makeLong: /* @__PURE__ */ i(function(P) {
      return P;
    }, "_makeLong"), dirname: /* @__PURE__ */ i(function(P) {
      if (k(P), P.length === 0) return ".";
      for (var R = P.charCodeAt(0), g = R === 47, b = -1, I = !0, _ = P.length - 1; _ >= 1; --_) if ((R = P.charCodeAt(_)) === 47) {
        if (!I) {
          b = _;
          break;
        }
      } else I = !1;
      return b === -1 ? g ? "/" : "." : g && b === 1 ? "//" : P.slice(0, b);
    }, "dirname"), basename: /* @__PURE__ */ i(function(P, R) {
      if (R !== void 0 && typeof R != "string") throw new TypeError('"ext" argument must be a string');
      k(P);
      var g, b = 0, I = -1, _ = !0;
      if (R !== void 0 && R.length > 0 && R.length <= P.length) {
        if (R.length === P.length && R === P) return "";
        var N = R.length - 1, V = -1;
        for (g = P.length - 1; g >= 0; --g) {
          var q = P.charCodeAt(g);
          if (q === 47) {
            if (!_) {
              b = g + 1;
              break;
            }
          } else V === -1 && (_ = !1, V = g + 1), N >= 0 && (q === R.charCodeAt(N) ? --N == -1 && (I = g) : (N = -1, I = V));
        }
        return b === I ? I = V : I === -1 && (I = P.length), P.slice(b, I);
      }
      for (g = P.length - 1; g >= 0; --g) if (P.charCodeAt(g) === 47) {
        if (!_) {
          b = g + 1;
          break;
        }
      } else I === -1 && (_ = !1, I = g + 1);
      return I === -1 ? "" : P.slice(b, I);
    }, "basename"), extname: /* @__PURE__ */ i(function(P) {
      k(P);
      for (var R = -1, g = 0, b = -1, I = !0, _ = 0, N = P.length - 1; N >= 0; --N) {
        var V = P.charCodeAt(N);
        if (V !== 47) b === -1 && (I = !1, b = N + 1), V === 46 ? R === -1 ? R = N : _ !== 1 && (_ = 1) : R !== -1 && (_ = -1);
        else if (!I) {
          g = N + 1;
          break;
        }
      }
      return R === -1 || b === -1 || _ === 0 || _ === 1 && R === b - 1 && R === g + 1 ? "" : P.slice(R, b);
    }, "extname"), format: /* @__PURE__ */ i(function(P) {
      if (P === null || typeof P != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof P);
      return (function(R, g) {
        var b = g.dir || g.root, I = g.base || (g.name || "") + (g.ext || "");
        return b ? b === g.root ? b + I : b + "/" + I : I;
      })(0, P);
    }, "format"), parse: /* @__PURE__ */ i(function(P) {
      k(P);
      var R = { root: "", dir: "", base: "", ext: "", name: "" };
      if (P.length === 0) return R;
      var g, b = P.charCodeAt(0), I = b === 47;
      I ? (R.root = "/", g = 1) : g = 0;
      for (var _ = -1, N = 0, V = -1, q = !0, W = P.length - 1, Ee = 0; W >= g; --W) if ((b = P.charCodeAt(W)) !== 47) V === -1 && (q = !1, V = W + 1), b === 46 ? _ === -1 ? _ = W : Ee !== 1 && (Ee = 1) : _ !== -1 && (Ee = -1);
      else if (!q) {
        N = W + 1;
        break;
      }
      return _ === -1 || V === -1 || Ee === 0 || Ee === 1 && _ === V - 1 && _ === N + 1 ? V !== -1 && (R.base = R.name = N === 0 && I ? P.slice(1, V) : P.slice(N, V)) : (N === 0 && I ? (R.name = P.slice(1, _), R.base = P.slice(1, V)) : (R.name = P.slice(N, _), R.base = P.slice(N, V)), R.ext = P.slice(_, V)), N > 0 ? R.dir = P.slice(0, N - 1) : I && (R.dir = "/"), R;
    }, "parse"), sep: "/", delimiter: ":", win32: null, posix: null };
    G.posix = G, L.exports = G;
  } }, t = {};
  function r(L) {
    var k = t[L];
    if (k !== void 0) return k.exports;
    var x = t[L] = { exports: {} };
    return e[L](x, x.exports, r), x.exports;
  }
  i(r, "r"), r.d = (L, k) => {
    for (var x in k) r.o(k, x) && !r.o(L, x) && Object.defineProperty(L, x, { enumerable: !0, get: k[x] });
  }, r.o = (L, k) => Object.prototype.hasOwnProperty.call(L, k), r.r = (L) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(L, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(L, "__esModule", { value: !0 });
  };
  var n = {};
  let a;
  r.r(n), r.d(n, { URI: /* @__PURE__ */ i(() => y, "URI"), Utils: /* @__PURE__ */ i(() => Y, "Utils") }), typeof process == "object" ? a = process.platform === "win32" : typeof navigator == "object" && (a = navigator.userAgent.indexOf("Windows") >= 0);
  const s = /^\w[\w\d+.-]*$/, o = /^\//, l = /^\/\//;
  function u(L, k) {
    if (!L.scheme && k) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${L.authority}", path: "${L.path}", query: "${L.query}", fragment: "${L.fragment}"}`);
    if (L.scheme && !s.test(L.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
    if (L.path) {
      if (L.authority) {
        if (!o.test(L.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
      } else if (l.test(L.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
    }
  }
  i(u, "a");
  const c = "", p = "/", h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  class y {
    static {
      i(this, "l");
    }
    static isUri(k) {
      return k instanceof y || !!k && typeof k.authority == "string" && typeof k.fragment == "string" && typeof k.path == "string" && typeof k.query == "string" && typeof k.scheme == "string" && typeof k.fsPath == "string" && typeof k.with == "function" && typeof k.toString == "function";
    }
    scheme;
    authority;
    path;
    query;
    fragment;
    constructor(k, x, G, P, R, g = !1) {
      typeof k == "object" ? (this.scheme = k.scheme || c, this.authority = k.authority || c, this.path = k.path || c, this.query = k.query || c, this.fragment = k.fragment || c) : (this.scheme = /* @__PURE__ */ (function(b, I) {
        return b || I ? b : "file";
      })(k, g), this.authority = x || c, this.path = (function(b, I) {
        switch (b) {
          case "https":
          case "http":
          case "file":
            I ? I[0] !== p && (I = p + I) : I = p;
        }
        return I;
      })(this.scheme, G || c), this.query = P || c, this.fragment = R || c, u(this, g));
    }
    get fsPath() {
      return S(this, !1);
    }
    with(k) {
      if (!k) return this;
      let { scheme: x, authority: G, path: P, query: R, fragment: g } = k;
      return x === void 0 ? x = this.scheme : x === null && (x = c), G === void 0 ? G = this.authority : G === null && (G = c), P === void 0 ? P = this.path : P === null && (P = c), R === void 0 ? R = this.query : R === null && (R = c), g === void 0 ? g = this.fragment : g === null && (g = c), x === this.scheme && G === this.authority && P === this.path && R === this.query && g === this.fragment ? this : new A(x, G, P, R, g);
    }
    static parse(k, x = !1) {
      const G = h.exec(k);
      return G ? new A(G[2] || c, F(G[4] || c), F(G[5] || c), F(G[7] || c), F(G[9] || c), x) : new A(c, c, c, c, c);
    }
    static file(k) {
      let x = c;
      if (a && (k = k.replace(/\\/g, p)), k[0] === p && k[1] === p) {
        const G = k.indexOf(p, 2);
        G === -1 ? (x = k.substring(2), k = p) : (x = k.substring(2, G), k = k.substring(G) || p);
      }
      return new A("file", x, k, c, c);
    }
    static from(k) {
      const x = new A(k.scheme, k.authority, k.path, k.query, k.fragment);
      return u(x, !0), x;
    }
    toString(k = !1) {
      return E(this, k);
    }
    toJSON() {
      return this;
    }
    static revive(k) {
      if (k) {
        if (k instanceof y) return k;
        {
          const x = new A(k);
          return x._formatted = k.external, x._fsPath = k._sep === d ? k.fsPath : null, x;
        }
      }
      return k;
    }
  }
  const d = a ? 1 : void 0;
  class A extends y {
    static {
      i(this, "d");
    }
    _formatted = null;
    _fsPath = null;
    get fsPath() {
      return this._fsPath || (this._fsPath = S(this, !1)), this._fsPath;
    }
    toString(k = !1) {
      return k ? E(this, !0) : (this._formatted || (this._formatted = E(this, !1)), this._formatted);
    }
    toJSON() {
      const k = { $mid: 1 };
      return this._fsPath && (k.fsPath = this._fsPath, k._sep = d), this._formatted && (k.external = this._formatted), this.path && (k.path = this.path), this.scheme && (k.scheme = this.scheme), this.authority && (k.authority = this.authority), this.query && (k.query = this.query), this.fragment && (k.fragment = this.fragment), k;
    }
  }
  const T = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
  function v(L, k, x) {
    let G, P = -1;
    for (let R = 0; R < L.length; R++) {
      const g = L.charCodeAt(R);
      if (g >= 97 && g <= 122 || g >= 65 && g <= 90 || g >= 48 && g <= 57 || g === 45 || g === 46 || g === 95 || g === 126 || k && g === 47 || x && g === 91 || x && g === 93 || x && g === 58) P !== -1 && (G += encodeURIComponent(L.substring(P, R)), P = -1), G !== void 0 && (G += L.charAt(R));
      else {
        G === void 0 && (G = L.substr(0, R));
        const b = T[g];
        b !== void 0 ? (P !== -1 && (G += encodeURIComponent(L.substring(P, R)), P = -1), G += b) : P === -1 && (P = R);
      }
    }
    return P !== -1 && (G += encodeURIComponent(L.substring(P))), G !== void 0 ? G : L;
  }
  i(v, "m");
  function $(L) {
    let k;
    for (let x = 0; x < L.length; x++) {
      const G = L.charCodeAt(x);
      G === 35 || G === 63 ? (k === void 0 && (k = L.substr(0, x)), k += T[G]) : k !== void 0 && (k += L[x]);
    }
    return k !== void 0 ? k : L;
  }
  i($, "y");
  function S(L, k) {
    let x;
    return x = L.authority && L.path.length > 1 && L.scheme === "file" ? `//${L.authority}${L.path}` : L.path.charCodeAt(0) === 47 && (L.path.charCodeAt(1) >= 65 && L.path.charCodeAt(1) <= 90 || L.path.charCodeAt(1) >= 97 && L.path.charCodeAt(1) <= 122) && L.path.charCodeAt(2) === 58 ? k ? L.path.substr(1) : L.path[1].toLowerCase() + L.path.substr(2) : L.path, a && (x = x.replace(/\//g, "\\")), x;
  }
  i(S, "v");
  function E(L, k) {
    const x = k ? $ : v;
    let G = "", { scheme: P, authority: R, path: g, query: b, fragment: I } = L;
    if (P && (G += P, G += ":"), (R || P === "file") && (G += p, G += p), R) {
      let _ = R.indexOf("@");
      if (_ !== -1) {
        const N = R.substr(0, _);
        R = R.substr(_ + 1), _ = N.lastIndexOf(":"), _ === -1 ? G += x(N, !1, !1) : (G += x(N.substr(0, _), !1, !1), G += ":", G += x(N.substr(_ + 1), !1, !0)), G += "@";
      }
      R = R.toLowerCase(), _ = R.lastIndexOf(":"), _ === -1 ? G += x(R, !1, !0) : (G += x(R.substr(0, _), !1, !0), G += R.substr(_));
    }
    if (g) {
      if (g.length >= 3 && g.charCodeAt(0) === 47 && g.charCodeAt(2) === 58) {
        const _ = g.charCodeAt(1);
        _ >= 65 && _ <= 90 && (g = `/${String.fromCharCode(_ + 32)}:${g.substr(3)}`);
      } else if (g.length >= 2 && g.charCodeAt(1) === 58) {
        const _ = g.charCodeAt(0);
        _ >= 65 && _ <= 90 && (g = `${String.fromCharCode(_ + 32)}:${g.substr(2)}`);
      }
      G += x(g, !0, !1);
    }
    return b && (G += "?", G += x(b, !1, !1)), I && (G += "#", G += k ? I : v(I, !1, !1)), G;
  }
  i(E, "b");
  function O(L) {
    try {
      return decodeURIComponent(L);
    } catch {
      return L.length > 3 ? L.substr(0, 3) + O(L.substr(3)) : L;
    }
  }
  i(O, "C");
  const M = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
  function F(L) {
    return L.match(M) ? L.replace(M, ((k) => O(k))) : L;
  }
  i(F, "w");
  var U = r(975);
  const J = U.posix || U, ne = "/";
  var Y;
  (function(L) {
    L.joinPath = function(k, ...x) {
      return k.with({ path: J.join(k.path, ...x) });
    }, L.resolvePath = function(k, ...x) {
      let G = k.path, P = !1;
      G[0] !== ne && (G = ne + G, P = !0);
      let R = J.resolve(G, ...x);
      return P && R[0] === ne && !k.authority && (R = R.substring(1)), k.with({ path: R });
    }, L.dirname = function(k) {
      if (k.path.length === 0 || k.path === ne) return k;
      let x = J.dirname(k.path);
      return x.length === 1 && x.charCodeAt(0) === 46 && (x = ""), k.with({ path: x });
    }, L.basename = function(k) {
      return J.basename(k.path);
    }, L.extname = function(k) {
      return J.extname(k.path);
    };
  })(Y || (Y = {})), v$ = n;
})();
var { URI: Xe, Utils: Ca } = v$, nt;
(function(e) {
  e.basename = Ca.basename, e.dirname = Ca.dirname, e.extname = Ca.extname, e.joinPath = Ca.joinPath, e.resolvePath = Ca.resolvePath;
  const t = typeof process == "object" && process?.platform === "win32";
  function r(o, l) {
    return o?.toString() === l?.toString();
  }
  i(r, "equals"), e.equals = r;
  function n(o, l) {
    const u = typeof o == "string" ? Xe.parse(o).path : o.path, c = typeof l == "string" ? Xe.parse(l).path : l.path, p = u.split("/").filter((T) => T.length > 0), h = c.split("/").filter((T) => T.length > 0);
    if (t) {
      const T = /^[A-Z]:$/;
      if (p[0] && T.test(p[0]) && (p[0] = p[0].toLowerCase()), h[0] && T.test(h[0]) && (h[0] = h[0].toLowerCase()), p[0] !== h[0])
        return c.substring(1);
    }
    let y = 0;
    for (; y < p.length && p[y] === h[y]; y++)
      ;
    const d = "../".repeat(p.length - y), A = h.slice(y).join("/");
    return d + A;
  }
  i(n, "relative"), e.relative = n;
  function a(o) {
    return Xe.parse(o.toString()).toString();
  }
  i(a, "normalize"), e.normalize = a;
  function s(o, l) {
    const u = typeof o == "string" ? Xe.parse(o) : o, c = typeof l == "string" ? Xe.parse(l) : l;
    if (u.scheme !== c.scheme)
      return !1;
    let p = u.path, h = c.path;
    return h.charAt(h.length - 1) === "/" && (h = h.slice(0, -1)), p.charAt(p.length - 1) === "/" && (p = p.slice(0, -1)), h === p ? !0 : h.length < p.length || h.charAt(p.length) !== "/" ? !1 : h.startsWith(p);
  }
  i(s, "contains"), e.contains = s;
})(nt || (nt = {}));
var aS = class {
  static {
    i(this, "UriTrie");
  }
  constructor() {
    this.root = { name: "", children: /* @__PURE__ */ new Map() };
  }
  normalizeUri(e) {
    return nt.normalize(e);
  }
  clear() {
    this.root.children.clear();
  }
  insert(e, t) {
    const r = this.getNode(this.normalizeUri(e), !0);
    r.element = t;
  }
  delete(e) {
    const t = this.getNode(this.normalizeUri(e), !1);
    t?.parent && t.parent.children.delete(t.name);
  }
  has(e) {
    return this.getNode(this.normalizeUri(e), !1)?.element !== void 0;
  }
  hasNode(e) {
    return this.getNode(this.normalizeUri(e), !1) !== void 0;
  }
  find(e) {
    return this.getNode(this.normalizeUri(e), !1)?.element;
  }
  findNode(e) {
    const t = this.normalizeUri(e), r = this.getNode(t, !1);
    if (r)
      return {
        name: r.name,
        uri: nt.joinPath(Xe.parse(t), r.name).toString(),
        element: r.element
      };
  }
  findChildren(e) {
    const t = this.normalizeUri(e), r = this.getNode(t, !1);
    return r ? Array.from(r.children.values()).map((n) => ({
      name: n.name,
      uri: nt.joinPath(Xe.parse(t), n.name).toString(),
      element: n.element
    })) : [];
  }
  all() {
    return this.collectValues(this.root);
  }
  findAll(e) {
    const t = this.getNode(this.normalizeUri(e), !1);
    return t ? this.collectValues(t) : [];
  }
  getNode(e, t) {
    const r = e.split("/");
    e.charAt(e.length - 1) === "/" && r.pop();
    let n = this.root;
    for (const a of r) {
      let s = n.children.get(a);
      if (!s)
        if (t)
          s = {
            name: a,
            children: /* @__PURE__ */ new Map(),
            parent: n
          }, n.children.set(a, s);
        else
          return;
      n = s;
    }
    return n;
  }
  collectValues(e) {
    const t = [];
    e.element && t.push(e.element);
    for (const r of e.children.values())
      t.push(...this.collectValues(r));
    return t;
  }
}, X;
(function(e) {
  e[e.Changed = 0] = "Changed", e[e.Parsed = 1] = "Parsed", e[e.IndexedContent = 2] = "IndexedContent", e[e.ComputedScopes = 3] = "ComputedScopes", e[e.Linked = 4] = "Linked", e[e.IndexedReferences = 5] = "IndexedReferences", e[e.Validated = 6] = "Validated";
})(X || (X = {}));
var iS = class {
  static {
    i(this, "DefaultLangiumDocumentFactory");
  }
  constructor(e) {
    this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider;
  }
  async fromUri(e, t = he.CancellationToken.None) {
    const r = await this.getInitialText(e, t);
    return this.createAsync(e, r, t);
  }
  async getInitialText(e, t) {
    return this.fileSystemProvider.readFile(e);
  }
  fromTextDocument(e, t, r) {
    return t = t ?? Xe.parse(e.uri), he.CancellationToken.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromString(e, t, r) {
    return he.CancellationToken.is(r) ? this.createAsync(t, e, r) : this.create(t, e, r);
  }
  fromModel(e, t) {
    return this.create(t, { $model: e });
  }
  create(e, t, r) {
    if (typeof t == "string") {
      const n = this.parse(e, t, r);
      return this.createLangiumDocument(n, e, void 0, t);
    } else if ("$model" in t) {
      const n = { value: t.$model, parserErrors: [], lexerErrors: [] };
      return this.createLangiumDocument(n, e);
    } else {
      const n = this.parse(e, t.getText(), r);
      return this.createLangiumDocument(n, e, t);
    }
  }
  async createAsync(e, t, r) {
    if (typeof t == "string") {
      const n = await this.parseAsync(e, t, r);
      return this.createLangiumDocument(n, e, void 0, t);
    } else {
      const n = await this.parseAsync(e, t.getText(), r);
      return this.createLangiumDocument(n, e, t);
    }
  }
  /**
   * Create a LangiumDocument from a given parse result.
   *
   * A TextDocument is created on demand if it is not provided as argument here. Usually this
   * should not be necessary because the main purpose of the TextDocument is to convert between
   * text ranges and offsets, which is done solely in LSP request handling.
   *
   * With the introduction of {@link update} below this method is supposed to be mainly called
   * during workspace initialization and on addition/recognition of new files, while changes in
   * existing documents are processed via {@link update}.
   */
  createLangiumDocument(e, t, r, n) {
    let a;
    if (r)
      a = {
        parseResult: e,
        uri: t,
        state: X.Parsed,
        references: [],
        textDocument: r
      };
    else {
      const s = this.createTextDocumentGetter(t, n);
      a = {
        parseResult: e,
        uri: t,
        state: X.Parsed,
        references: [],
        get textDocument() {
          return s();
        }
      };
    }
    return e.value.$document = a, a;
  }
  async update(e, t) {
    const r = e.parseResult.value.$cstNode?.root.fullText, n = this.textDocuments?.get(e.uri.toString()), a = await this.getUpdatedText(e, n, t);
    if (n)
      Object.defineProperty(e, "textDocument", {
        value: n
      });
    else {
      const s = this.createTextDocumentGetter(e.uri, a);
      Object.defineProperty(e, "textDocument", {
        get: s
      });
    }
    return r !== a && (e.parseResult = await this.parseAsync(e.uri, a, t), e.parseResult.value.$document = e), e.state = X.Parsed, e;
  }
  async getUpdatedText(e, t, r) {
    return t ? t.getText() : await this.fileSystemProvider.readFile(e.uri);
  }
  parse(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t, r);
  }
  parseAsync(e, t, r) {
    return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(t, r);
  }
  createTextDocumentGetter(e, t) {
    const r = this.serviceRegistry;
    let n;
    return () => n ?? (n = Uu.create(e.toString(), r.getServices(e).LanguageMetaData.languageId, 0, t ?? ""));
  }
}, sS = class {
  static {
    i(this, "DefaultLangiumDocuments");
  }
  constructor(e) {
    this.documentTrie = new aS(), this.services = e, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.documentBuilder = () => e.workspace.DocumentBuilder;
  }
  get all() {
    return ce(this.documentTrie.all());
  }
  addDocument(e) {
    const t = e.uri.toString();
    if (this.documentTrie.has(t))
      throw new Error(`A document with the URI '${t}' is already present.`);
    this.documentTrie.insert(t, e);
  }
  getDocument(e) {
    const t = e.toString();
    return this.documentTrie.find(t);
  }
  getDocuments(e) {
    const t = e.toString();
    return this.documentTrie.findAll(t);
  }
  async getOrCreateDocument(e, t) {
    let r = this.getDocument(e);
    return r || (r = await this.langiumDocumentFactory.fromUri(e, t), this.addDocument(r), r);
  }
  createDocument(e, t, r) {
    if (r)
      return this.langiumDocumentFactory.fromString(t, e, r).then((n) => (this.addDocument(n), n));
    {
      const n = this.langiumDocumentFactory.fromString(t, e);
      return this.addDocument(n), n;
    }
  }
  hasDocument(e) {
    return this.documentTrie.has(e.toString());
  }
  /**
   * @deprecated Since 4.2 use `DocumentBuilder.resetToState(DocumentState.Changed)` instead
   * TODO remove this for the next major release
   */
  invalidateDocument(e) {
    const t = e.toString(), r = this.documentTrie.find(t);
    return r && this.documentBuilder().resetToState(r, X.Changed), r;
  }
  deleteDocument(e) {
    const t = e.toString(), r = this.documentTrie.find(t);
    return r && (r.state = X.Changed, this.documentTrie.delete(t)), r;
  }
  deleteDocuments(e) {
    const t = e.toString(), r = this.documentTrie.findAll(t);
    for (const n of r)
      n.state = X.Changed;
    return this.documentTrie.delete(t), r;
  }
}, tn = /* @__PURE__ */ Symbol("RefResolving"), oS = class {
  static {
    i(this, "DefaultReferenceImpl");
  }
  constructor(e, t, r, n, a) {
    this.resolver = e, this.node = t, this.property = r, this._ref = void 0, this.$refNode = n, this.$refText = a;
  }
  get ref() {
    return this.resolver.resolveReference(this, this.node, this.property);
  }
  get $nodeDescription() {
    return this._nodeDescription;
  }
  get error() {
    return In(this._ref) ? this._ref : void 0;
  }
}, lS = class {
  static {
    i(this, "DefaultMultiReferenceImpl");
  }
  constructor(e, t, r, n, a) {
    this.resolver = e, this.node = t, this.property = r, this._items = void 0, this.$refNode = n, this.$refText = a;
  }
  get items() {
    return this.resolver.resolveMultiReference(this, this.node, this.property);
  }
  get error() {
    return this._linkingError;
  }
}, uS = class {
  static {
    i(this, "DefaultLinker");
  }
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId, this.referenceResolver = {
      resolveReference: this.resolveReference.bind(this),
      resolveMultiReference: this.resolveMultiReference.bind(this)
    };
  }
  async link(e, t = he.CancellationToken.None) {
    if (this.profiler?.isActive("linking")) {
      const r = this.profiler.createTask("linking", this.languageId);
      r.start();
      try {
        for (const n of At(e.parseResult.value))
          await Le(t), ri(n).forEach((a) => {
            const s = `${n.$type}:${a.property}`;
            r.startSubTask(s);
            try {
              this.doLink(a, e);
            } finally {
              r.stopSubTask(s);
            }
          });
      } finally {
        r.stop();
      }
    } else
      for (const r of At(e.parseResult.value))
        await Le(t), ri(r).forEach((n) => this.doLink(n, e));
  }
  doLink(e, t) {
    const r = e.reference;
    if ("_ref" in r && r._ref === void 0) {
      r._ref = tn;
      try {
        const n = this.getCandidate(e);
        if (In(n))
          r._ref = n;
        else {
          r._nodeDescription = n;
          const a = this.loadAstNode(n);
          r._ref = a ?? this.createLinkingError(e, n);
        }
      } catch (n) {
        console.error(`An error occurred while resolving reference to '${r.$refText}':`, n);
        const a = n.message ?? String(n);
        r._ref = {
          info: e,
          message: `An error occurred while resolving reference to '${r.$refText}': ${a}`
        };
      }
      t.references.push(r);
    } else if ("_items" in r && r._items === void 0) {
      r._items = tn;
      try {
        const n = this.getCandidates(e), a = [];
        if (In(n))
          r._linkingError = n;
        else
          for (const s of n) {
            const o = this.loadAstNode(s);
            o && a.push({ ref: o, $nodeDescription: s });
          }
        r._items = a;
      } catch (n) {
        r._linkingError = {
          info: e,
          message: `An error occurred while resolving reference to '${r.$refText}': ${n}`
        }, r._items = [];
      }
      t.references.push(r);
    }
  }
  unlink(e) {
    for (const t of e.references)
      "_ref" in t ? (t._ref = void 0, delete t._nodeDescription) : "_items" in t && (t._items = void 0, delete t._linkingError);
    e.references = [];
  }
  getCandidate(e) {
    return this.scopeProvider.getScope(e).getElement(e.reference.$refText) ?? this.createLinkingError(e);
  }
  getCandidates(e) {
    const r = this.scopeProvider.getScope(e).getElements(e.reference.$refText).distinct((n) => `${n.documentUri}#${n.path}`).toArray();
    return r.length > 0 ? r : this.createLinkingError(e);
  }
  buildReference(e, t, r, n) {
    return new oS(this.referenceResolver, e, t, r, n);
  }
  buildMultiReference(e, t, r, n) {
    return new lS(this.referenceResolver, e, t, r, n);
  }
  resolveReference(e, t, r) {
    if (we(e._ref))
      return e._ref;
    if (Kd(e._nodeDescription)) {
      const n = this.loadAstNode(e._nodeDescription);
      e._ref = n ?? this.createLinkingError({ reference: e, container: t, property: r }, e._nodeDescription);
    } else if (e._ref === void 0) {
      e._ref = tn;
      const n = Xa(t).$document, a = this.getLinkedNode({ reference: e, container: t, property: r });
      if (a.error && n && n.state < X.ComputedScopes)
        return e._ref = void 0;
      e._ref = a.node ?? a.error, e._nodeDescription = a.descr, n?.references.push(e);
    } else e._ref === tn && this.throwCyclicReferenceError(t, r, e.$refText);
    return we(e._ref) ? e._ref : void 0;
  }
  resolveMultiReference(e, t, r) {
    if (Array.isArray(e._items))
      return e._items;
    if (e._items === void 0) {
      e._items = tn;
      const n = Xa(t).$document, a = this.getCandidates({
        reference: e,
        container: t,
        property: r
      }), s = [];
      if (In(a))
        e._linkingError = a;
      else {
        for (const o of a) {
          const l = this.loadAstNode(o);
          l && s.push({ ref: l, $nodeDescription: o });
        }
        s.length === 0 && (e._linkingError = this.createLinkingError({ reference: e, container: t, property: r }));
      }
      e._items = s, n?.references.push(e);
    } else e._items === tn && this.throwCyclicReferenceError(t, r, e.$refText);
    return Array.isArray(e._items) ? e._items : [];
  }
  throwCyclicReferenceError(e, t, r) {
    throw new Error(`Cyclic reference resolution detected: ${this.astNodeLocator.getAstNodePath(e)}/${t} (symbol '${r}')`);
  }
  getLinkedNode(e) {
    try {
      const t = this.getCandidate(e);
      if (In(t))
        return { error: t };
      const r = this.loadAstNode(t);
      return r ? { node: r, descr: t } : {
        descr: t,
        error: this.createLinkingError(e, t)
      };
    } catch (t) {
      console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`, t);
      const r = t.message ?? String(t);
      return {
        error: {
          info: e,
          message: `An error occurred while resolving reference to '${e.reference.$refText}': ${r}`
        }
      };
    }
  }
  loadAstNode(e) {
    if (e.node)
      return e.node;
    const t = this.langiumDocuments().getDocument(e.documentUri);
    if (t)
      return this.astNodeLocator.getAstNode(t.parseResult.value, e.path);
  }
  createLinkingError(e, t) {
    const r = Xa(e.container).$document;
    r && r.state < X.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${r.uri}).`);
    const n = this.reflection.getReferenceType(e);
    return {
      info: e,
      message: `Could not resolve reference to ${n} named '${e.reference.$refText}'.`,
      targetDescription: t
    };
  }
};
function T$(e) {
  return typeof e.name == "string";
}
i(T$, "isNamed");
var cS = class {
  static {
    i(this, "DefaultNameProvider");
  }
  getName(e) {
    if (T$(e))
      return e.name;
  }
  getNameNode(e) {
    return wc(e.$cstNode, "name");
  }
}, fS = class {
  static {
    i(this, "DefaultReferences");
  }
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator, this.documents = e.shared.workspace.LangiumDocuments, this.hasMultiReference = At(e.Grammar).some((t) => Ri(t) && t.isMulti);
  }
  findDeclarations(e) {
    if (e) {
      const t = Mm(e), r = e.astNode;
      if (t && r) {
        const n = r[t.feature];
        if (rt(n) || Ut(n))
          return iu(n);
        if (Array.isArray(n)) {
          for (const a of n)
            if ((rt(a) || Ut(a)) && a.$refNode && a.$refNode.offset <= e.offset && a.$refNode.end >= e.end)
              return iu(a);
        }
      }
      if (r) {
        const n = this.nameProvider.getNameNode(r);
        if (n && (n === e || hm(e, n)))
          return this.getSelfNodes(r);
      }
    }
    return [];
  }
  /**
   * Returns all self-references for the specified node.
   * Since the node can be part of a multi-reference, this method returns all nodes that are part of the same multi-reference.
   */
  getSelfNodes(e) {
    if (this.hasMultiReference) {
      const t = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e)), r = this.getNodeFromReferenceDescription(t.head());
      if (r) {
        for (const n of ri(r))
          if (Ut(n.reference) && n.reference.items.some((a) => a.ref === e))
            return n.reference.items.map((a) => a.ref);
      }
      return [e];
    } else
      return [e];
  }
  getNodeFromReferenceDescription(e) {
    if (!e)
      return;
    const t = this.documents.getDocument(e.sourceUri);
    if (t)
      return this.nodeLocator.getAstNode(t.parseResult.value, e.sourcePath);
  }
  findDeclarationNodes(e) {
    const t = this.findDeclarations(e), r = [];
    for (const n of t) {
      const a = this.nameProvider.getNameNode(n) ?? n.$cstNode;
      a && r.push(a);
    }
    return r;
  }
  findReferences(e, t) {
    const r = [];
    t.includeDeclaration && r.push(...this.getSelfReferences(e));
    let n = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e));
    return t.documentUri && (n = n.filter((a) => nt.equals(a.sourceUri, t.documentUri))), r.push(...n), ce(r);
  }
  getSelfReferences(e) {
    const t = this.getSelfNodes(e), r = [];
    for (const n of t) {
      const a = this.nameProvider.getNameNode(n);
      if (a) {
        const s = Rt(n), o = this.nodeLocator.getAstNodePath(n);
        r.push({
          sourceUri: s.uri,
          sourcePath: o,
          targetUri: s.uri,
          targetPath: o,
          segment: ai(a),
          local: !0
        });
      }
    }
    return r;
  }
}, mi = class {
  static {
    i(this, "MultiMap");
  }
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.add(t, r);
  }
  /**
   * The total number of values in the multimap.
   */
  get size() {
    return au.sum(ce(this.map.values()).map((e) => e.length));
  }
  /**
   * Clear all entries in the multimap.
   */
  clear() {
    this.map.clear();
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method deletes the specific key / value pair from the multimap.
   *  * Without a value, all values associated with the given key are deleted.
   *
   * @returns `true` if a value existed and has been removed, or `false` if the specified
   *     key / value does not exist.
   */
  delete(e, t) {
    if (t === void 0)
      return this.map.delete(e);
    {
      const r = this.map.get(e);
      if (r) {
        const n = r.indexOf(t);
        if (n >= 0)
          return r.length === 1 ? this.map.delete(e) : r.splice(n, 1), !0;
      }
      return !1;
    }
  }
  /**
   * Returns an array of all values associated with the given key. If no value exists,
   * an empty array is returned.
   *
   * _Note:_ The returned array is assumed not to be modified. Use the `set` method to add a
   * value and `delete` to remove a value from the multimap.
   */
  get(e) {
    return this.map.get(e) ?? [];
  }
  /**
   * Returns a stream of all values associated with the given key. If no value exists,
   * {@link EMPTY_STREAM} is returned.
   */
  getStream(e) {
    const t = this.map.get(e);
    return t ? ce(t) : Hd;
  }
  /**
   * Operates differently depending on whether a `value` is given:
   *  * With a value, this method returns `true` if the specific key / value pair is present in the multimap.
   *  * Without a value, this method returns `true` if the given key is present in the multimap.
   */
  has(e, t) {
    if (t === void 0)
      return this.map.has(e);
    {
      const r = this.map.get(e);
      return r ? r.indexOf(t) >= 0 : !1;
    }
  }
  /**
   * Add the given key / value pair to the multimap.
   */
  add(e, t) {
    return this.map.has(e) ? this.map.get(e).push(t) : this.map.set(e, [t]), this;
  }
  /**
   * Add the given set of key / value pairs to the multimap.
   */
  addAll(e, t) {
    return this.map.has(e) ? this.map.get(e).push(...t) : this.map.set(e, Array.from(t)), this;
  }
  /**
   * Invokes the given callback function for every key / value pair in the multimap.
   */
  forEach(e) {
    this.map.forEach((t, r) => t.forEach((n) => e(n, r, this)));
  }
  /**
   * Returns an iterator of key, value pairs for every entry in the map.
   */
  [Symbol.iterator]() {
    return this.entries().iterator();
  }
  /**
   * Returns a stream of key, value pairs for every entry in the map.
   */
  entries() {
    return ce(this.map.entries()).flatMap(([e, t]) => t.map((r) => [e, r]));
  }
  /**
   * Returns a stream of keys in the map.
   */
  keys() {
    return ce(this.map.keys());
  }
  /**
   * Returns a stream of values in the map.
   */
  values() {
    return ce(this.map.values()).flat();
  }
  /**
   * Returns a stream of key, value set pairs for every key in the map.
   */
  entriesGroupedByKey() {
    return ce(this.map.entries());
  }
}, bp = class {
  static {
    i(this, "BiMap");
  }
  get size() {
    return this.map.size;
  }
  constructor(e) {
    if (this.map = /* @__PURE__ */ new Map(), this.inverse = /* @__PURE__ */ new Map(), e)
      for (const [t, r] of e)
        this.set(t, r);
  }
  clear() {
    this.map.clear(), this.inverse.clear();
  }
  set(e, t) {
    return this.map.set(e, t), this.inverse.set(t, e), this;
  }
  get(e) {
    return this.map.get(e);
  }
  getKey(e) {
    return this.inverse.get(e);
  }
  delete(e) {
    const t = this.map.get(e);
    return t !== void 0 ? (this.map.delete(e), this.inverse.delete(t), !0) : !1;
  }
}, pS = class {
  static {
    i(this, "DefaultScopeComputation");
  }
  constructor(e) {
    this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider;
  }
  async collectExportedSymbols(e, t = he.CancellationToken.None) {
    return this.collectExportedSymbolsForNode(e.parseResult.value, e, void 0, t);
  }
  /**
   * Creates {@link AstNodeDescription AstNodeDescriptions} for the given {@link AstNode parentNode} and its children.
   * The list of children to be considered is determined by the function parameter {@link children}.
   * By default only the direct children of {@link parentNode} are visited, nested nodes are not exported.
   *
   * @param parentNode AST node to be exported, i.e., of which an {@link AstNodeDescription} shall be added to the returned list.
   * @param document The document containing the AST node to be exported.
   * @param children A function called with {@link parentNode} as single argument and returning an {@link Iterable} supplying the children to be visited, which must be directly or transitively contained in {@link parentNode}.
   * @param cancelToken Indicates when to cancel the current operation.
   * @throws `OperationCancelled` if a user action occurs during execution.
   * @returns A list of {@link AstNodeDescription AstNodeDescriptions} to be published to index.
   */
  async collectExportedSymbolsForNode(e, t, r = Hs, n = he.CancellationToken.None) {
    const a = [];
    this.addExportedSymbol(e, a, t);
    for (const s of r(e))
      await Le(n), this.addExportedSymbol(s, a, t);
    return a;
  }
  /**
   * Adds a single node to the list of exports if it has a name. Override this method to change how
   * symbols are exported, e.g. by modifying their exported name.
   */
  addExportedSymbol(e, t, r) {
    const n = this.nameProvider.getName(e);
    n && t.push(this.descriptions.createDescription(e, n, r));
  }
  // --- local symbols gathering ---
  async collectLocalSymbols(e, t = he.CancellationToken.None) {
    const r = e.parseResult.value, n = new mi();
    for (const a of zn(r))
      await Le(t), this.addLocalSymbol(a, e, n);
    return n;
  }
  /**
   * Adds a single node to the local symbols of its containing document if it has a name.
   * The default implementation makes the node visible in the subtree of its container if it does have a container.
   * Override this method to change this, e.g. by increasing the visibility to a higher level in the AST.
   */
  addLocalSymbol(e, t, r) {
    const n = e.$container;
    if (n) {
      const a = this.nameProvider.getName(e);
      a && r.add(n, this.descriptions.createDescription(e, a, t));
    }
  }
}, _p = class {
  static {
    i(this, "StreamScope");
  }
  constructor(e, t, r) {
    this.elements = e, this.outerScope = t, this.caseInsensitive = r?.caseInsensitive ?? !1, this.concatOuterScope = r?.concatOuterScope ?? !0;
  }
  getAllElements() {
    return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements;
  }
  getElement(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.caseInsensitive ? this.elements.find((n) => n.name.toLowerCase() === t) : this.elements.find((n) => n.name === e);
    if (r)
      return r;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
  getElements(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.caseInsensitive ? this.elements.filter((n) => n.name.toLowerCase() === t) : this.elements.filter((n) => n.name === e);
    return (this.concatOuterScope || r.isEmpty()) && this.outerScope ? r.concat(this.outerScope.getElements(e)) : r;
  }
}, dS = class {
  static {
    i(this, "MultiMapScope");
  }
  constructor(e, t, r) {
    this.elements = new mi(), this.caseInsensitive = r?.caseInsensitive ?? !1, this.concatOuterScope = r?.concatOuterScope ?? !0;
    for (const n of e) {
      const a = this.caseInsensitive ? n.name.toLowerCase() : n.name;
      this.elements.add(a, n);
    }
    this.outerScope = t;
  }
  getElement(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.elements.get(t)[0];
    if (r)
      return r;
    if (this.outerScope)
      return this.outerScope.getElement(e);
  }
  getElements(e) {
    const t = this.caseInsensitive ? e.toLowerCase() : e, r = this.elements.get(t);
    return (this.concatOuterScope || r.length === 0) && this.outerScope ? ce(r).concat(this.outerScope.getElements(e)) : ce(r);
  }
  getAllElements() {
    let e = ce(this.elements.values());
    return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
  }
}, $$ = class {
  static {
    i(this, "DisposableCache");
  }
  constructor() {
    this.toDispose = [], this.isDisposed = !1;
  }
  onDispose(e) {
    this.toDispose.push(e);
  }
  dispose() {
    this.throwIfDisposed(), this.clear(), this.isDisposed = !0, this.toDispose.forEach((e) => e.dispose());
  }
  throwIfDisposed() {
    if (this.isDisposed)
      throw new Error("This cache has already been disposed");
  }
}, mS = class extends $$ {
  static {
    i(this, "SimpleCache");
  }
  constructor() {
    super(...arguments), this.cache = /* @__PURE__ */ new Map();
  }
  has(e) {
    return this.throwIfDisposed(), this.cache.has(e);
  }
  set(e, t) {
    this.throwIfDisposed(), this.cache.set(e, t);
  }
  get(e, t) {
    if (this.throwIfDisposed(), this.cache.has(e))
      return this.cache.get(e);
    if (t) {
      const r = t();
      return this.cache.set(e, r), r;
    } else
      return;
  }
  delete(e) {
    return this.throwIfDisposed(), this.cache.delete(e);
  }
  clear() {
    this.throwIfDisposed(), this.cache.clear();
  }
}, hS = class extends $$ {
  static {
    i(this, "ContextCache");
  }
  constructor(e) {
    super(), this.cache = /* @__PURE__ */ new Map(), this.converter = e ?? ((t) => t);
  }
  has(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).has(t);
  }
  set(e, t, r) {
    this.throwIfDisposed(), this.cacheForContext(e).set(t, r);
  }
  get(e, t, r) {
    this.throwIfDisposed();
    const n = this.cacheForContext(e);
    if (n.has(t))
      return n.get(t);
    if (r) {
      const a = r();
      return n.set(t, a), a;
    } else
      return;
  }
  delete(e, t) {
    return this.throwIfDisposed(), this.cacheForContext(e).delete(t);
  }
  clear(e) {
    if (this.throwIfDisposed(), e) {
      const t = this.converter(e);
      this.cache.delete(t);
    } else
      this.cache.clear();
  }
  cacheForContext(e) {
    const t = this.converter(e);
    let r = this.cache.get(t);
    return r || (r = /* @__PURE__ */ new Map(), this.cache.set(t, r)), r;
  }
}, yS = class extends mS {
  static {
    i(this, "WorkspaceCache");
  }
  /**
   * Creates a new workspace cache.
   *
   * @param sharedServices Service container instance to hook into document lifecycle events.
   * @param state Optional document state on which the cache should evict.
   * If not provided, the cache will evict on `DocumentBuilder#onUpdate`.
   * *Deleted* documents are considered in both cases.
   */
  constructor(e, t) {
    super(), t ? (this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(t, () => {
      this.clear();
    })), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((r, n) => {
      n.length > 0 && this.clear();
    }))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(() => {
      this.clear();
    }));
  }
}, gS = class {
  static {
    i(this, "DefaultScopeProvider");
  }
  constructor(e) {
    this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager, this.globalScopeCache = new yS(e.shared);
  }
  getScope(e) {
    const t = [], r = this.reflection.getReferenceType(e), n = Rt(e.container).localSymbols;
    if (n) {
      let s = e.container;
      do
        n.has(s) && t.push(n.getStream(s).filter((o) => this.reflection.isSubtype(o.type, r))), s = s.$container;
      while (s);
    }
    let a = this.getGlobalScope(r, e);
    for (let s = t.length - 1; s >= 0; s--)
      a = this.createScope(t[s], a);
    return a;
  }
  /**
   * Create a scope for the given collection of AST node descriptions.
   */
  createScope(e, t, r) {
    return new _p(ce(e), t, r);
  }
  /**
   * Create a scope for the given collection of AST nodes, which need to be transformed into respective
   * descriptions first. This is done using the `NameProvider` and `AstNodeDescriptionProvider` services.
   */
  createScopeForNodes(e, t, r) {
    const n = ce(e).map((a) => {
      const s = this.nameProvider.getName(a);
      if (s)
        return this.descriptions.createDescription(a, s);
    }).nonNullable();
    return new _p(n, t, r);
  }
  /**
   * Create a global scope filtered for the given reference type.
   */
  getGlobalScope(e, t) {
    return this.globalScopeCache.get(e, () => new dS(this.indexManager.allElements(e)));
  }
};
function R$(e) {
  return typeof e.$comment == "string";
}
i(R$, "isAstNodeWithComment");
function Vu(e) {
  return typeof e == "object" && !!e && ("$ref" in e || "$refs" in e || "$error" in e);
}
i(Vu, "isIntermediateReference");
var vS = class {
  static {
    i(this, "DefaultJsonSerializer");
  }
  constructor(e) {
    this.ignoreProperties = /* @__PURE__ */ new Set(["$container", "$containerProperty", "$containerIndex", "$document", "$cstNode"]), this.langiumDocuments = e.shared.workspace.LangiumDocuments, this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider, this.commentProvider = e.documentation.CommentProvider;
  }
  serialize(e, t) {
    const r = t ?? {}, n = t?.replacer, a = /* @__PURE__ */ i((o, l) => this.replacer(o, l, r), "defaultReplacer"), s = n ? (o, l) => n(o, l, a) : a;
    try {
      return this.currentDocument = Rt(e), JSON.stringify(e, s, t?.space);
    } finally {
      this.currentDocument = void 0;
    }
  }
  deserialize(e, t) {
    const r = t ?? {}, n = JSON.parse(e);
    return this.linkNode(n, n, r), n;
  }
  replacer(e, t, { refText: r, sourceText: n, textRegions: a, comments: s, uriConverter: o }) {
    if (!this.ignoreProperties.has(e))
      if (rt(t)) {
        const l = t.ref, u = r ? t.$refText : void 0;
        if (l) {
          const c = Rt(l);
          let p = "";
          this.currentDocument && this.currentDocument !== c && (o ? p = o(c.uri, l) : p = c.uri.toString());
          const h = this.astNodeLocator.getAstNodePath(l);
          return {
            $ref: `${p}#${h}`,
            $refText: u
          };
        } else
          return {
            $error: t.error?.message ?? "Could not resolve reference",
            $refText: u
          };
      } else if (Ut(t)) {
        const l = r ? t.$refText : void 0, u = [];
        for (const c of t.items) {
          const p = c.ref, h = Rt(c.ref);
          let y = "";
          this.currentDocument && this.currentDocument !== h && (o ? y = o(h.uri, p) : y = h.uri.toString());
          const d = this.astNodeLocator.getAstNodePath(p);
          u.push(`${y}#${d}`);
        }
        return {
          $refs: u,
          $refText: l
        };
      } else if (we(t)) {
        let l;
        if (a && (l = this.addAstNodeRegionWithAssignmentsTo({ ...t }), (!e || t.$document) && l?.$textRegion && (l.$textRegion.documentURI = this.currentDocument?.uri.toString())), n && !e && (l ?? (l = { ...t }), l.$sourceText = t.$cstNode?.text), s) {
          l ?? (l = { ...t });
          const u = this.commentProvider.getComment(t);
          u && (l.$comment = u.replace(/\r/g, ""));
        }
        return l ?? t;
      } else
        return t;
  }
  addAstNodeRegionWithAssignmentsTo(e) {
    const t = /* @__PURE__ */ i((r) => ({
      offset: r.offset,
      end: r.end,
      length: r.length,
      range: r.range
    }), "createDocumentSegment");
    if (e.$cstNode) {
      const r = e.$textRegion = t(e.$cstNode), n = r.assignments = {};
      return Object.keys(e).filter((a) => !a.startsWith("$")).forEach((a) => {
        const s = Im(e.$cstNode, a).map(t);
        s.length !== 0 && (n[a] = s);
      }), e;
    }
  }
  linkNode(e, t, r, n, a, s) {
    for (const [l, u] of Object.entries(e))
      if (Array.isArray(u))
        for (let c = 0; c < u.length; c++) {
          const p = u[c];
          Vu(p) ? u[c] = this.reviveReference(e, l, t, p, r) : we(p) && this.linkNode(p, t, r, e, l, c);
        }
      else Vu(u) ? e[l] = this.reviveReference(e, l, t, u, r) : we(u) && this.linkNode(u, t, r, e, l);
    const o = e;
    o.$container = n, o.$containerProperty = a, o.$containerIndex = s;
  }
  reviveReference(e, t, r, n, a) {
    let s = n.$refText, o = n.$error, l;
    if (n.$ref) {
      const u = this.getRefNode(r, n.$ref, a.uriConverter);
      if (we(u))
        return s || (s = this.nameProvider.getName(u)), {
          $refText: s ?? "",
          ref: u
        };
      o = u;
    } else if (n.$refs) {
      const u = [];
      for (const c of n.$refs) {
        const p = this.getRefNode(r, c, a.uriConverter);
        we(p) && u.push({ ref: p });
      }
      if (u.length === 0)
        l = {
          $refText: s ?? "",
          items: u
        }, o ?? (o = "Could not resolve multi-reference");
      else
        return {
          $refText: s ?? "",
          items: u
        };
    }
    if (o)
      return l ?? (l = {
        $refText: s ?? "",
        ref: void 0
      }), l.error = {
        info: {
          container: e,
          property: t,
          reference: l
        },
        message: o
      }, l;
  }
  getRefNode(e, t, r) {
    try {
      const n = t.indexOf("#");
      if (n === 0) {
        const l = this.astNodeLocator.getAstNode(e, t.substring(1));
        return l || "Could not resolve path: " + t;
      }
      if (n < 0) {
        const l = r ? r(t) : Xe.parse(t), u = this.langiumDocuments.getDocument(l);
        return u ? u.parseResult.value : "Could not find document for URI: " + t;
      }
      const a = r ? r(t.substring(0, n)) : Xe.parse(t.substring(0, n)), s = this.langiumDocuments.getDocument(a);
      if (!s)
        return "Could not find document for URI: " + t;
      if (n === t.length - 1)
        return s.parseResult.value;
      const o = this.astNodeLocator.getAstNode(s.parseResult.value, t.substring(n + 1));
      return o || "Could not resolve URI: " + t;
    } catch (n) {
      return String(n);
    }
  }
}, TS = class {
  static {
    i(this, "DefaultServiceRegistry");
  }
  /**
   * @deprecated Since 3.1.0. Use the new `fileExtensionMap` (or `languageIdMap`) property instead.
   */
  get map() {
    return this.fileExtensionMap;
  }
  constructor(e) {
    this.languageIdMap = /* @__PURE__ */ new Map(), this.fileExtensionMap = /* @__PURE__ */ new Map(), this.fileNameMap = /* @__PURE__ */ new Map(), this.textDocuments = e?.workspace.TextDocuments;
  }
  register(e) {
    const t = e.LanguageMetaData;
    for (const r of t.fileExtensions)
      this.fileExtensionMap.has(r) && console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileExtensionMap.set(r, e);
    if (t.fileNames)
      for (const r of t.fileNames)
        this.fileNameMap.has(r) && console.warn(`The file name ${r} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileNameMap.set(r, e);
    this.languageIdMap.set(t.languageId, e);
  }
  getServices(e) {
    if (this.languageIdMap.size === 0)
      throw new Error("The service registry is empty. Use `register` to register the services of a language.");
    const t = this.textDocuments?.get(e)?.languageId;
    if (t !== void 0) {
      const s = this.languageIdMap.get(t);
      if (s)
        return s;
    }
    const r = nt.extname(e), n = nt.basename(e), a = this.fileNameMap.get(n) ?? this.fileExtensionMap.get(r);
    if (!a)
      throw t ? new Error(`The service registry contains no services for the extension '${r}' for language '${t}'.`) : new Error(`The service registry contains no services for the extension '${r}'.`);
    return a;
  }
  hasServices(e) {
    try {
      return this.getServices(e), !0;
    } catch {
      return !1;
    }
  }
  get all() {
    return Array.from(this.languageIdMap.values());
  }
};
function Mn(e) {
  return { code: e };
}
i(Mn, "diagnosticData");
var Ku;
(function(e) {
  e.defaults = ["fast", "slow", "built-in"], e.all = e.defaults;
})(Ku || (Ku = {}));
var $S = class {
  static {
    i(this, "ValidationRegistry");
  }
  constructor(e) {
    this.entries = new mi(), this.knownCategories = new Set(Ku.defaults), this.entriesBefore = [], this.entriesAfter = [], this.reflection = e.shared.AstReflection;
  }
  /**
   * Register a set of validation checks. Each value in the record can be either a single validation check (i.e. a function)
   * or an array of validation checks.
   *
   * @param checksRecord Set of validation checks to register.
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   * @param category Optional category for the validation checks (defaults to `'fast'`).
   */
  register(e, t = this, r = "fast") {
    if (r === "built-in")
      throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
    this.knownCategories.add(r);
    for (const [n, a] of Object.entries(e)) {
      const s = a;
      if (Array.isArray(s))
        for (const o of s) {
          const l = {
            check: this.wrapValidationException(o, t),
            category: r
          };
          this.addEntry(n, l);
        }
      else if (typeof s == "function") {
        const o = {
          check: this.wrapValidationException(s, t),
          category: r
        };
        this.addEntry(n, o);
      } else
        Bn();
    }
  }
  wrapValidationException(e, t) {
    return async (r, n, a) => {
      await this.handleException(() => e.call(t, r, n, a), "An error occurred during validation", n, r);
    };
  }
  async handleException(e, t, r, n) {
    try {
      await e();
    } catch (a) {
      if (bi(a))
        throw a;
      console.error(`${t}:`, a), a instanceof Error && a.stack && console.error(a.stack);
      const s = a instanceof Error ? a.message : String(a);
      r("error", `${t}: ${s}`, { node: n });
    }
  }
  addEntry(e, t) {
    if (e === "AstNode") {
      this.entries.add("AstNode", t);
      return;
    }
    for (const r of this.reflection.getAllSubTypes(e))
      this.entries.add(r, t);
  }
  getChecks(e, t) {
    let r = ce(this.entries.get(e)).concat(this.entries.get("AstNode"));
    return t && (r = r.filter((n) => t.includes(n.category))), r.map((n) => n.check);
  }
  /**
   * Register logic which will be executed once before validating all the nodes of an AST/Langium document.
   * This helps to prepare or initialize some information which are required or reusable for the following checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map for mapping names to nodes could be established.
   * During the usual checks on the nodes, they are put into this map with their name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerBeforeDocument(e, t = this) {
    this.entriesBefore.push(this.wrapPreparationException(e, "An error occurred during set-up of the validation", t));
  }
  /**
   * Register logic which will be executed once after validating all the nodes of an AST/Langium document.
   * This helps to finally evaluate information which are collected during the checks on the AstNodes.
   *
   * As an example, for validating unique fully-qualified names of nodes in the AST,
   * here the map with all the collected nodes and their names is checked
   * and validation hints are created for all nodes with the same name.
   *
   * Note that this approach makes validations stateful, which is relevant e.g. when cancelling the validation.
   * Therefore it is recommended to clear stored information
   * _before_ validating an AST to validate each AST unaffected from other ASTs
   * AND _after_ validating the AST to free memory by information which are no longer used.
   *
   * @param checkBefore a set-up function which will be called once before actually validating an AST
   * @param thisObj Optional object to be used as `this` when calling the validation check functions.
   */
  registerAfterDocument(e, t = this) {
    this.entriesAfter.push(this.wrapPreparationException(e, "An error occurred during tear-down of the validation", t));
  }
  wrapPreparationException(e, t, r) {
    return async (n, a, s, o) => {
      await this.handleException(() => e.call(r, n, a, s, o), t, a, n);
    };
  }
  get checksBefore() {
    return this.entriesBefore;
  }
  get checksAfter() {
    return this.entriesAfter;
  }
  getAllValidationCategories(e) {
    return this.knownCategories;
  }
}, RS = Object.freeze({
  validateNode: !0,
  validateChildren: !0
}), AS = class {
  static {
    i(this, "DefaultDocumentValidator");
  }
  constructor(e) {
    this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId;
  }
  async validateDocument(e, t = {}, r = he.CancellationToken.None) {
    const n = e.parseResult, a = [];
    if (await Le(r), (!t.categories || t.categories.includes("built-in")) && (this.processLexingErrors(n, a, t), t.stopAfterLexingErrors && a.some((s) => s.data?.code === ft.LexingError) || (this.processParsingErrors(n, a, t), t.stopAfterParsingErrors && a.some((s) => s.data?.code === ft.ParsingError)) || (this.processLinkingErrors(e, a, t), t.stopAfterLinkingErrors && a.some((s) => s.data?.code === ft.LinkingError))))
      return a;
    try {
      a.push(...await this.validateAst(n.value, t, r));
    } catch (s) {
      if (bi(s))
        throw s;
      console.error("An error occurred during validation:", s);
    }
    return await Le(r), a;
  }
  processLexingErrors(e, t, r) {
    const n = [...e.lexerErrors, ...e.lexerReport?.diagnostics ?? []];
    for (const a of n) {
      const s = a.severity ?? "error", o = {
        severity: Rs(s),
        range: {
          start: {
            line: a.line - 1,
            character: a.column - 1
          },
          end: {
            line: a.line - 1,
            character: a.column + a.length - 1
          }
        },
        message: a.message,
        data: E$(s),
        source: this.getSource()
      };
      t.push(o);
    }
  }
  processParsingErrors(e, t, r) {
    for (const n of e.parserErrors) {
      let a;
      if (ks(n.token))
        a = ym(n.token);
      else if ("previousToken" in n) {
        const s = n.previousToken;
        if (ks(s)) {
          const o = { line: s.endLine - 1, character: s.endColumn };
          a = { start: o, end: o };
        } else {
          const o = { line: 0, character: 0 };
          a = { start: o, end: o };
        }
      }
      if (a) {
        const s = {
          severity: Rs("error"),
          range: a,
          message: n.message,
          data: Mn(ft.ParsingError),
          source: this.getSource()
        };
        t.push(s);
      }
    }
  }
  processLinkingErrors(e, t, r) {
    for (const n of e.references) {
      const a = n.error;
      if (a) {
        const s = {
          node: a.info.container,
          range: n.$refNode?.range,
          property: a.info.property,
          index: a.info.index,
          data: {
            code: ft.LinkingError,
            containerType: a.info.container.$type,
            property: a.info.property,
            refText: a.info.reference.$refText
          }
        };
        t.push(this.toDiagnostic("error", a.message, s));
      }
    }
  }
  async validateAst(e, t, r = he.CancellationToken.None) {
    const n = [], a = /* @__PURE__ */ i((s, o, l) => {
      n.push(this.toDiagnostic(s, o, l));
    }, "acceptor");
    return await this.validateAstBefore(e, t, a, r), await this.validateAstNodes(e, t, a, r), await this.validateAstAfter(e, t, a, r), n;
  }
  async validateAstBefore(e, t, r, n = he.CancellationToken.None) {
    const a = this.validationRegistry.checksBefore;
    for (const s of a)
      await Le(n), await s(e, r, t.categories ?? [], n);
  }
  async validateAstNodes(e, t, r, n = he.CancellationToken.None) {
    if (this.profiler?.isActive("validating")) {
      const a = this.profiler.createTask("validating", this.languageId);
      a.start();
      try {
        const s = At(e).iterator();
        for (const o of s) {
          a.startSubTask(o.$type);
          const l = this.validateSingleNodeOptions(o, t);
          if (l.validateNode)
            try {
              const u = this.validationRegistry.getChecks(o.$type, t.categories);
              for (const c of u)
                await c(o, r, n);
            } finally {
              a.stopSubTask(o.$type);
            }
          l.validateChildren || s.prune();
        }
      } finally {
        a.stop();
      }
    } else {
      const a = At(e).iterator();
      for (const s of a) {
        await Le(n);
        const o = this.validateSingleNodeOptions(s, t);
        if (o.validateNode) {
          const l = this.validationRegistry.getChecks(s.$type, t.categories);
          for (const u of l)
            await u(s, r, n);
        }
        o.validateChildren || a.prune();
      }
    }
  }
  validateSingleNodeOptions(e, t) {
    return RS;
  }
  async validateAstAfter(e, t, r, n = he.CancellationToken.None) {
    const a = this.validationRegistry.checksAfter;
    for (const s of a)
      await Le(n), await s(e, r, t.categories ?? [], n);
  }
  toDiagnostic(e, t, r) {
    return {
      message: t,
      range: A$(r),
      severity: Rs(e),
      code: r.code,
      codeDescription: r.codeDescription,
      tags: r.tags,
      relatedInformation: r.relatedInformation,
      data: r.data,
      source: this.getSource()
    };
  }
  getSource() {
    return this.metadata.languageId;
  }
};
function A$(e) {
  if (e.range)
    return e.range;
  let t;
  return typeof e.property == "string" ? t = wc(e.node.$cstNode, e.property, e.index) : typeof e.keyword == "string" && (t = Nm(e.node.$cstNode, e.keyword, e.index)), t ?? (t = e.node.$cstNode), t ? t.range : {
    start: { line: 0, character: 0 },
    end: { line: 0, character: 0 }
  };
}
i(A$, "getDiagnosticRange");
function Rs(e) {
  switch (e) {
    case "error":
      return 1;
    case "warning":
      return 2;
    case "info":
      return 3;
    case "hint":
      return 4;
    default:
      throw new Error("Invalid diagnostic severity: " + e);
  }
}
i(Rs, "toDiagnosticSeverity");
function E$(e) {
  switch (e) {
    case "error":
      return Mn(ft.LexingError);
    case "warning":
      return Mn(ft.LexingWarning);
    case "info":
      return Mn(ft.LexingInfo);
    case "hint":
      return Mn(ft.LexingHint);
    default:
      throw new Error("Invalid diagnostic severity: " + e);
  }
}
i(E$, "toDiagnosticData");
var ft;
(function(e) {
  e.LexingError = "lexing-error", e.LexingWarning = "lexing-warning", e.LexingInfo = "lexing-info", e.LexingHint = "lexing-hint", e.ParsingError = "parsing-error", e.LinkingError = "linking-error";
})(ft || (ft = {}));
var ES = class {
  static {
    i(this, "DefaultAstNodeDescriptionProvider");
  }
  constructor(e) {
    this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider;
  }
  createDescription(e, t, r) {
    const n = r ?? Rt(e);
    t ?? (t = this.nameProvider.getName(e));
    const a = this.astNodeLocator.getAstNodePath(e);
    if (!t)
      throw new Error(`Node at path ${a} has no name.`);
    let s;
    const o = /* @__PURE__ */ i(() => s ?? (s = ai(this.nameProvider.getNameNode(e) ?? e.$cstNode)), "nameSegmentGetter");
    return {
      node: e,
      name: t,
      get nameSegment() {
        return o();
      },
      selectionSegment: ai(e.$cstNode),
      type: e.$type,
      documentUri: n.uri,
      path: a
    };
  }
}, CS = class {
  static {
    i(this, "DefaultReferenceDescriptionProvider");
  }
  constructor(e) {
    this.nodeLocator = e.workspace.AstNodeLocator;
  }
  async createDescriptions(e, t = he.CancellationToken.None) {
    const r = [], n = e.parseResult.value;
    for (const a of At(n))
      await Le(t), ri(a).forEach((s) => {
        s.reference.error || r.push(...this.createInfoDescriptions(s));
      });
    return r;
  }
  createInfoDescriptions(e) {
    const t = e.reference;
    if (t.error || !t.$refNode)
      return [];
    let r = [];
    rt(t) && t.$nodeDescription ? r = [t.$nodeDescription] : Ut(t) && (r = t.items.map((l) => l.$nodeDescription).filter((l) => l !== void 0));
    const n = Rt(e.container).uri, a = this.nodeLocator.getAstNodePath(e.container), s = [], o = ai(t.$refNode);
    for (const l of r)
      s.push({
        sourceUri: n,
        sourcePath: a,
        targetUri: l.documentUri,
        targetPath: l.path,
        segment: o,
        local: nt.equals(l.documentUri, n)
      });
    return s;
  }
}, bS = class {
  static {
    i(this, "DefaultAstNodeLocator");
  }
  constructor() {
    this.segmentSeparator = "/", this.indexSeparator = "@";
  }
  getAstNodePath(e) {
    if (e.$container) {
      const t = this.getAstNodePath(e.$container), r = this.getPathSegment(e);
      return t + this.segmentSeparator + r;
    }
    return "";
  }
  getPathSegment({ $containerProperty: e, $containerIndex: t }) {
    if (!e)
      throw new Error("Missing '$containerProperty' in AST node.");
    return t !== void 0 ? e + this.indexSeparator + t : e;
  }
  getAstNode(e, t) {
    return t.split(this.segmentSeparator).reduce((n, a) => {
      if (!n || a.length === 0)
        return n;
      const s = a.indexOf(this.indexSeparator);
      if (s > 0) {
        const o = a.substring(0, s), l = parseInt(a.substring(s + 1));
        return n[o]?.[l];
      }
      return n[a];
    }, e);
  }
}, _S = dc(gc()), SS = class {
  static {
    i(this, "DefaultConfigurationProvider");
  }
  constructor(e) {
    this._ready = new Rf(), this.onConfigurationSectionUpdateEmitter = new _S.Emitter(), this.settings = {}, this.workspaceConfig = !1, this.serviceRegistry = e.ServiceRegistry;
  }
  get ready() {
    return this._ready.promise;
  }
  initialize(e) {
    this.workspaceConfig = e.capabilities.workspace?.configuration ?? !1;
  }
  async initialized(e) {
    if (this.workspaceConfig) {
      if (e.register) {
        const t = this.serviceRegistry.all;
        e.register({
          // Listen to configuration changes for all languages
          section: t.map((r) => this.toSectionName(r.LanguageMetaData.languageId))
        });
      }
      if (e.fetchConfiguration) {
        const t = this.serviceRegistry.all.map((n) => ({
          // Fetch the configuration changes for all languages
          section: this.toSectionName(n.LanguageMetaData.languageId)
        })), r = await e.fetchConfiguration(t);
        t.forEach((n, a) => {
          this.updateSectionConfiguration(n.section, r[a]);
        });
      }
    }
    this._ready.resolve();
  }
  /**
   *  Updates the cached configurations using the `change` notification parameters.
   *
   * @param change The parameters of a change configuration notification.
   * `settings` property of the change object could be expressed as `Record<string, Record<string, any>>`
   */
  updateConfiguration(e) {
    typeof e.settings != "object" || e.settings === null || Object.entries(e.settings).forEach(([t, r]) => {
      this.updateSectionConfiguration(t, r), this.onConfigurationSectionUpdateEmitter.fire({ section: t, configuration: r });
    });
  }
  updateSectionConfiguration(e, t) {
    this.settings[e] = t;
  }
  /**
  * Returns a configuration value stored for the given language.
  *
  * @param language The language id
  * @param configuration Configuration name
  */
  async getConfiguration(e, t) {
    await this.ready;
    const r = this.toSectionName(e);
    if (this.settings[r])
      return this.settings[r][t];
  }
  toSectionName(e) {
    return `${e}`;
  }
  get onConfigurationSectionUpdate() {
    return this.onConfigurationSectionUpdateEmitter.event;
  }
}, Mi = dc(gc()), ei;
(function(e) {
  function t(r) {
    return {
      dispose: /* @__PURE__ */ i(async () => await r(), "dispose")
    };
  }
  i(t, "create"), e.create = t;
})(ei || (ei = {}));
var wS = class {
  static {
    i(this, "DefaultDocumentBuilder");
  }
  constructor(e) {
    this.updateBuildOptions = {
      // Default: run only the built-in validation checks and those in the _fast_ category (includes those without category)
      validation: {
        categories: ["built-in", "fast"]
      }
    }, this.updateListeners = [], this.buildPhaseListeners = new mi(), this.documentPhaseListeners = new mi(), this.buildState = /* @__PURE__ */ new Map(), this.documentBuildWaiters = /* @__PURE__ */ new Map(), this.currentState = X.Changed, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.textDocuments = e.workspace.TextDocuments, this.indexManager = e.workspace.IndexManager, this.fileSystemProvider = e.workspace.FileSystemProvider, this.workspaceManager = () => e.workspace.WorkspaceManager, this.serviceRegistry = e.ServiceRegistry;
  }
  async build(e, t = {}, r = he.CancellationToken.None) {
    for (const n of e) {
      const a = n.uri.toString();
      if (n.state === X.Validated) {
        if (typeof t.validation == "boolean" && t.validation)
          this.resetToState(n, X.IndexedReferences);
        else if (typeof t.validation == "object") {
          const s = this.findMissingValidationCategories(n, t);
          s.length > 0 && (this.buildState.set(a, {
            completed: !1,
            options: {
              validation: {
                categories: s
              }
            },
            result: this.buildState.get(a)?.result
          }), n.state = X.IndexedReferences);
        }
      } else
        this.buildState.delete(a);
    }
    this.currentState = X.Changed, await this.emitUpdate(e.map((n) => n.uri), []), await this.buildDocuments(e, t, r);
  }
  async update(e, t, r = he.CancellationToken.None) {
    this.currentState = X.Changed;
    const n = [];
    for (const l of t) {
      const u = this.langiumDocuments.deleteDocuments(l);
      for (const c of u)
        n.push(c.uri), this.cleanUpDeleted(c);
    }
    const a = (await Promise.all(e.map((l) => this.findChangedUris(l)))).flat();
    for (const l of a) {
      let u = this.langiumDocuments.getDocument(l);
      u === void 0 && (u = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, l), u.state = X.Changed, this.langiumDocuments.addDocument(u)), this.resetToState(u, X.Changed);
    }
    const s = ce(a).concat(n).map((l) => l.toString()).toSet();
    this.langiumDocuments.all.filter((l) => !s.has(l.uri.toString()) && this.shouldRelink(l, s)).forEach((l) => this.resetToState(l, X.ComputedScopes)), await this.emitUpdate(a, n), await Le(r);
    const o = this.sortDocuments(this.langiumDocuments.all.filter((l) => (
      // This includes those that were reported as changed and those that we selected for relinking
      l.state < X.Validated || !this.buildState.get(l.uri.toString())?.completed || this.resultsAreIncomplete(l, this.updateBuildOptions)
    )).toArray());
    await this.buildDocuments(o, this.updateBuildOptions, r);
  }
  resultsAreIncomplete(e, t) {
    return this.findMissingValidationCategories(e, t).length >= 1;
  }
  findMissingValidationCategories(e, t) {
    const r = this.buildState.get(e.uri.toString()), n = this.serviceRegistry.getServices(e.uri).validation.ValidationRegistry.getAllValidationCategories(e), a = r?.result?.validationChecks ? new Set(r?.result?.validationChecks) : r?.completed ? n : /* @__PURE__ */ new Set(), s = t === void 0 || t.validation === !0 ? n : typeof t.validation == "object" ? t.validation.categories ?? n : [];
    return ce(s).filter((o) => !a.has(o)).toArray();
  }
  async findChangedUris(e) {
    if (this.langiumDocuments.getDocument(e) ?? this.textDocuments?.get(e))
      return [e];
    try {
      const r = await this.fileSystemProvider.stat(e);
      if (r.isDirectory)
        return await this.workspaceManager().searchFolder(e);
      if (this.workspaceManager().shouldIncludeEntry(r))
        return [e];
    } catch {
    }
    return [];
  }
  async emitUpdate(e, t) {
    await Promise.all(this.updateListeners.map((r) => r(e, t)));
  }
  /**
   * Sort the given documents by priority. By default, documents with an open text document are prioritized.
   * This is useful to ensure that visible documents show their diagnostics before all other documents.
   *
   * This improves the responsiveness in large workspaces as users usually don't care about diagnostics
   * in files that are currently not opened in the editor.
   */
  sortDocuments(e) {
    let t = 0, r = e.length - 1;
    for (; t < r; ) {
      for (; t < e.length && this.hasTextDocument(e[t]); )
        t++;
      for (; r >= 0 && !this.hasTextDocument(e[r]); )
        r--;
      t < r && ([e[t], e[r]] = [e[r], e[t]]);
    }
    return e;
  }
  hasTextDocument(e) {
    return !!this.textDocuments?.get(e.uri);
  }
  /**
   * Check whether the given document should be relinked after changes were found in the given URIs.
   */
  shouldRelink(e, t) {
    return e.references.some((r) => r.error !== void 0) ? !0 : this.indexManager.isAffected(e, t);
  }
  onUpdate(e) {
    return this.updateListeners.push(e), ei.create(() => {
      const t = this.updateListeners.indexOf(e);
      t >= 0 && this.updateListeners.splice(t, 1);
    });
  }
  resetToState(e, t) {
    switch (t) {
      case X.Changed:
      case X.Parsed:
        this.indexManager.removeContent(e.uri);
      // Fall through
      case X.IndexedContent:
        e.localSymbols = void 0;
      // Fall through
      case X.ComputedScopes:
        this.serviceRegistry.getServices(e.uri).references.Linker.unlink(e);
      case X.Linked:
        this.indexManager.removeReferences(e.uri);
      // Fall through
      case X.IndexedReferences:
        e.diagnostics = void 0, this.buildState.delete(e.uri.toString());
      // Fall through
      case X.Validated:
    }
    e.state > t && (e.state = t);
  }
  cleanUpDeleted(e) {
    this.buildState.delete(e.uri.toString()), this.indexManager.remove(e.uri), e.state = X.Changed;
  }
  /**
   * Build the given documents by stepping through all build phases. If a document's state indicates
   * that a certain build phase is already done, the phase is skipped for that document.
   *
   * @param documents The documents to build.
   * @param options the {@link BuildOptions} to use.
   * @param cancelToken A cancellation token that can be used to cancel the build.
   * @returns A promise that resolves when the build is done.
   */
  async buildDocuments(e, t, r) {
    this.prepareBuild(e, t), await this.runCancelable(e, X.Parsed, r, (s) => this.langiumDocumentFactory.update(s, r)), await this.runCancelable(e, X.IndexedContent, r, (s) => this.indexManager.updateContent(s, r)), await this.runCancelable(e, X.ComputedScopes, r, async (s) => {
      const o = this.serviceRegistry.getServices(s.uri).references.ScopeComputation;
      s.localSymbols = await o.collectLocalSymbols(s, r);
    });
    const n = e.filter((s) => this.shouldLink(s));
    await this.runCancelable(n, X.Linked, r, (s) => this.serviceRegistry.getServices(s.uri).references.Linker.link(s, r)), await this.runCancelable(n, X.IndexedReferences, r, (s) => this.indexManager.updateReferences(s, r));
    const a = e.filter((s) => this.shouldValidate(s) ? !0 : (this.markAsCompleted(s), !1));
    await this.runCancelable(a, X.Validated, r, async (s) => {
      await this.validate(s, r), this.markAsCompleted(s);
    });
  }
  markAsCompleted(e) {
    const t = this.buildState.get(e.uri.toString());
    t && (t.completed = !0);
  }
  /**
   * Runs prior to beginning the build process to update the {@link DocumentBuildState} for each document
   *
   * @param documents collection of documents to be built
   * @param options the {@link BuildOptions} to use
   */
  prepareBuild(e, t) {
    for (const r of e) {
      const n = r.uri.toString(), a = this.buildState.get(n);
      (!a || a.completed) && this.buildState.set(n, {
        completed: !1,
        options: t,
        result: a?.result
      });
    }
  }
  /**
   * Runs a cancelable operation on a set of documents to bring them to a specified {@link DocumentState}.
   *
   * @param documents The array of documents to process.
   * @param targetState The target {@link DocumentState} to bring the documents to.
   * @param cancelToken A token that can be used to cancel the operation.
   * @param callback A function to be called for each document.
   * @returns A promise that resolves when all documents have been processed or the operation is canceled.
   * @throws Will throw `OperationCancelled` if the operation is canceled via a `CancellationToken`.
   */
  async runCancelable(e, t, r, n) {
    for (const s of e)
      s.state < t && (await Le(r), await n(s), s.state = t, await this.notifyDocumentPhase(s, t, r));
    const a = e.filter((s) => s.state === t);
    await this.notifyBuildPhase(a, t, r), this.currentState = t;
  }
  onBuildPhase(e, t) {
    return this.buildPhaseListeners.add(e, t), ei.create(() => {
      this.buildPhaseListeners.delete(e, t);
    });
  }
  onDocumentPhase(e, t) {
    return this.documentPhaseListeners.add(e, t), ei.create(() => {
      this.documentPhaseListeners.delete(e, t);
    });
  }
  waitUntil(e, t, r) {
    let n;
    return t && "path" in t ? n = t : r = t, r ?? (r = he.CancellationToken.None), n ? this.awaitDocumentState(e, n, r) : this.awaitBuilderState(e, r);
  }
  awaitDocumentState(e, t, r) {
    const n = this.langiumDocuments.getDocument(t);
    if (n) {
      if (n.state >= e)
        return Promise.resolve(t);
      if (r.isCancellationRequested)
        return Promise.reject(On);
      if (this.currentState >= e && e > n.state)
        return Promise.reject(new Mi.ResponseError(Mi.LSPErrorCodes.RequestFailed, `Document state of ${t.toString()} is ${X[n.state]}, requiring ${X[e]}, but workspace state is already ${X[this.currentState]}. Returning undefined.`));
    } else return Promise.reject(new Mi.ResponseError(Mi.LSPErrorCodes.ServerCancelled, `No document found for URI: ${t.toString()}`));
    return new Promise((a, s) => {
      const o = this.onDocumentPhase(e, (u) => {
        nt.equals(u.uri, t) && (o.dispose(), l.dispose(), a(u.uri));
      }), l = r.onCancellationRequested(() => {
        o.dispose(), l.dispose(), s(On);
      });
    });
  }
  awaitBuilderState(e, t) {
    return this.currentState >= e ? Promise.resolve() : t.isCancellationRequested ? Promise.reject(On) : new Promise((r, n) => {
      const a = this.onBuildPhase(e, () => {
        a.dispose(), s.dispose(), r();
      }), s = t.onCancellationRequested(() => {
        a.dispose(), s.dispose(), n(On);
      });
    });
  }
  async notifyDocumentPhase(e, t, r) {
    const a = this.documentPhaseListeners.get(t).slice();
    for (const s of a)
      try {
        await Le(r), await s(e, r);
      } catch (o) {
        if (!bi(o))
          throw o;
      }
  }
  async notifyBuildPhase(e, t, r) {
    if (e.length === 0)
      return;
    const a = this.buildPhaseListeners.get(t).slice();
    for (const s of a)
      await Le(r), await s(e, r);
  }
  /**
   * Determine whether the given document should be linked during a build. The default
   * implementation checks the `eagerLinking` property of the build options. If it's set to `true`
   * or `undefined`, the document is included in the linking phase. This also affects the
   * references indexing phase, which depends on eager linking.
   */
  shouldLink(e) {
    return this.getBuildOptions(e).eagerLinking ?? !0;
  }
  /**
   * Determine whether the given document should be validated during a build. The default
   * implementation checks the `validation` property of the build options. If it's set to `true`
   * or a `ValidationOptions` object, the document is included in the validation phase.
   */
  shouldValidate(e) {
    return !!this.getBuildOptions(e).validation;
  }
  /**
   * Run validation checks on the given document and store the resulting diagnostics in the document.
   * If the document already contains diagnostics, the new ones are added to the list.
   */
  async validate(e, t) {
    const r = this.serviceRegistry.getServices(e.uri).validation.DocumentValidator, n = this.getBuildOptions(e), a = typeof n.validation == "object" ? { ...n.validation } : {};
    a.categories = this.findMissingValidationCategories(e, n);
    const s = await r.validateDocument(e, a, t);
    e.diagnostics ? e.diagnostics.push(...s) : e.diagnostics = s;
    const o = this.buildState.get(e.uri.toString());
    o && (o.result ?? (o.result = {}), o.result.validationChecks ? o.result.validationChecks = ce(o.result.validationChecks).concat(a.categories).distinct().toArray() : o.result.validationChecks = [...a.categories]);
  }
  getBuildOptions(e) {
    return this.buildState.get(e.uri.toString())?.options ?? {};
  }
}, PS = class {
  static {
    i(this, "DefaultIndexManager");
  }
  constructor(e) {
    this.symbolIndex = /* @__PURE__ */ new Map(), this.symbolByTypeIndex = new hS(), this.referenceIndex = /* @__PURE__ */ new Map(), this.documents = e.workspace.LangiumDocuments, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection;
  }
  findAllReferences(e, t) {
    const r = Rt(e).uri, n = [];
    return this.referenceIndex.forEach((a) => {
      a.forEach((s) => {
        nt.equals(s.targetUri, r) && s.targetPath === t && n.push(s);
      });
    }), ce(n);
  }
  allElements(e, t) {
    let r = ce(this.symbolIndex.keys());
    return t && (r = r.filter((n) => !t || t.has(n))), r.map((n) => this.getFileDescriptions(n, e)).flat();
  }
  getFileDescriptions(e, t) {
    return t ? this.symbolByTypeIndex.get(e, t, () => (this.symbolIndex.get(e) ?? []).filter((a) => this.astReflection.isSubtype(a.type, t))) : this.symbolIndex.get(e) ?? [];
  }
  remove(e) {
    this.removeContent(e), this.removeReferences(e);
  }
  removeContent(e) {
    const t = e.toString();
    this.symbolIndex.delete(t), this.symbolByTypeIndex.clear(t);
  }
  removeReferences(e) {
    const t = e.toString();
    this.referenceIndex.delete(t);
  }
  async updateContent(e, t = he.CancellationToken.None) {
    const n = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.collectExportedSymbols(e, t), a = e.uri.toString();
    this.symbolIndex.set(a, n), this.symbolByTypeIndex.clear(a);
  }
  async updateReferences(e, t = he.CancellationToken.None) {
    const n = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, t);
    this.referenceIndex.set(e.uri.toString(), n);
  }
  isAffected(e, t) {
    const r = this.referenceIndex.get(e.uri.toString());
    return r ? r.some((n) => !n.local && t.has(n.targetUri.toString())) : !1;
  }
}, kS = class {
  static {
    i(this, "DefaultWorkspaceManager");
  }
  constructor(e) {
    this.initialBuildOptions = {}, this._ready = new Rf(), this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.WorkspaceLock;
  }
  get ready() {
    return this._ready.promise;
  }
  get workspaceFolders() {
    return this.folders;
  }
  initialize(e) {
    this.folders = e.workspaceFolders ?? void 0;
  }
  initialized(e) {
    return this.mutex.write((t) => this.initializeWorkspace(this.folders ?? [], t));
  }
  async initializeWorkspace(e, t = he.CancellationToken.None) {
    const r = await this.performStartup(e);
    await Le(t), await this.documentBuilder.build(r, this.initialBuildOptions, t);
  }
  /**
   * Performs the uninterruptable startup sequence of the workspace manager.
   * This methods loads all documents in the workspace and other documents and returns them.
   */
  async performStartup(e) {
    const t = [], r = /* @__PURE__ */ i((s) => {
      t.push(s), this.langiumDocuments.hasDocument(s.uri) || this.langiumDocuments.addDocument(s);
    }, "collector");
    await this.loadAdditionalDocuments(e, r);
    const n = [];
    await Promise.all(e.map((s) => this.getRootFolder(s)).map(async (s) => this.traverseFolder(s, n)));
    const a = ce(n).distinct((s) => s.toString()).filter((s) => !this.langiumDocuments.hasDocument(s));
    return await this.loadWorkspaceDocuments(a, r), this._ready.resolve(), t;
  }
  async loadWorkspaceDocuments(e, t) {
    await Promise.all(e.map(async (r) => {
      const n = await this.langiumDocuments.getOrCreateDocument(r);
      t(n);
    }));
  }
  /**
   * Load all additional documents that shall be visible in the context of the given workspace
   * folders and add them to the collector. This can be used to include built-in libraries of
   * your language, which can be either loaded from provided files or constructed in memory.
   */
  loadAdditionalDocuments(e, t) {
    return Promise.resolve();
  }
  /**
   * Determine the root folder of the source documents in the given workspace folder.
   * The default implementation returns the URI of the workspace folder, but you can override
   * this to return a subfolder like `src` instead.
   */
  getRootFolder(e) {
    return Xe.parse(e.uri);
  }
  /**
   * Traverse the file system folder identified by the given URI and its subfolders. All
   * contained files that match the file extensions are added to the `uris` array.
   */
  async traverseFolder(e, t) {
    try {
      const r = await this.fileSystemProvider.readDirectory(e);
      await Promise.all(r.map(async (n) => {
        this.shouldIncludeEntry(n) && (n.isDirectory ? await this.traverseFolder(n.uri, t) : n.isFile && t.push(n.uri));
      }));
    } catch (r) {
      console.error("Failure to read directory content of " + e.toString(!0), r);
    }
  }
  async searchFolder(e) {
    const t = [];
    return await this.traverseFolder(e, t), t;
  }
  /**
   * Determine whether the given folder entry shall be included while indexing the workspace.
   */
  shouldIncludeEntry(e) {
    const t = nt.basename(e.uri);
    return t.startsWith(".") ? !1 : e.isDirectory ? t !== "node_modules" && t !== "out" : e.isFile ? this.serviceRegistry.hasServices(e.uri) : !1;
  }
}, IS = class {
  static {
    i(this, "DefaultLexerErrorMessageProvider");
  }
  buildUnexpectedCharactersMessage(e, t, r, n, a) {
    return Ru.buildUnexpectedCharactersMessage(e, t, r, n, a);
  }
  buildUnableToPopLexerModeMessage(e) {
    return Ru.buildUnableToPopLexerModeMessage(e);
  }
}, NS = { mode: "full" }, OS = class {
  static {
    i(this, "DefaultLexer");
  }
  constructor(e) {
    this.errorMessageProvider = e.parser.LexerErrorMessageProvider, this.tokenBuilder = e.parser.TokenBuilder;
    const t = this.tokenBuilder.buildTokens(e.Grammar, {
      caseInsensitive: e.LanguageMetaData.caseInsensitive
    });
    this.tokenTypes = this.toTokenTypeDictionary(t);
    const r = Wu(t) ? Object.values(t) : t, n = e.LanguageMetaData.mode === "production";
    this.chevrotainLexer = new Be(r, {
      positionTracking: "full",
      skipValidations: n,
      errorMessageProvider: this.errorMessageProvider
    });
  }
  get definition() {
    return this.tokenTypes;
  }
  tokenize(e, t = NS) {
    const r = this.chevrotainLexer.tokenize(e);
    return {
      tokens: r.tokens,
      errors: r.errors,
      hidden: r.groups.hidden ?? [],
      report: this.tokenBuilder.flushLexingReport?.(e)
    };
  }
  toTokenTypeDictionary(e) {
    if (Wu(e))
      return e;
    const t = Cf(e) ? Object.values(e.modes).flat() : e, r = {};
    return t.forEach((n) => r[n.name] = n), r;
  }
};
function C$(e) {
  return Array.isArray(e) && (e.length === 0 || "name" in e[0]);
}
i(C$, "isTokenTypeArray");
function Cf(e) {
  return e && "modes" in e && "defaultMode" in e;
}
i(Cf, "isIMultiModeLexerDefinition");
function Wu(e) {
  return !C$(e) && !Cf(e);
}
i(Wu, "isTokenTypeDictionary");
qs();
function b$(e, t, r) {
  let n, a;
  typeof e == "string" ? (a = t, n = r) : (a = e.range.start, n = t), a || (a = ae.create(0, 0));
  const s = bf(e), o = Co(n), l = S$({
    lines: s,
    position: a,
    options: o
  });
  return k$({
    index: 0,
    tokens: l,
    position: a
  });
}
i(b$, "parseJSDoc");
function _$(e, t) {
  const r = Co(t), n = bf(e);
  if (n.length === 0)
    return !1;
  const a = n[0], s = n[n.length - 1], o = r.start, l = r.end;
  return !!o?.exec(a) && !!l?.exec(s);
}
i(_$, "isJSDoc");
function bf(e) {
  let t = "";
  return typeof e == "string" ? t = e : t = e.text, t.split(nA);
}
i(bf, "getLines");
var Sp = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy, MS = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function S$(e) {
  const t = [];
  let r = e.position.line, n = e.position.character;
  for (let a = 0; a < e.lines.length; a++) {
    const s = a === 0, o = a === e.lines.length - 1;
    let l = e.lines[a], u = 0;
    if (s && e.options.start) {
      const p = e.options.start?.exec(l);
      p && (u = p.index + p[0].length);
    } else {
      const p = e.options.line?.exec(l);
      p && (u = p.index + p[0].length);
    }
    if (o) {
      const p = e.options.end?.exec(l);
      p && (l = l.substring(0, p.index));
    }
    if (l = l.substring(0, P$(l)), Vs(l, u) >= l.length) {
      if (t.length > 0) {
        const p = ae.create(r, n);
        t.push({
          type: "break",
          content: "",
          range: Z.create(p, p)
        });
      }
    } else {
      Sp.lastIndex = u;
      const p = Sp.exec(l);
      if (p) {
        const h = p[0], y = p[1], d = ae.create(r, n + u), A = ae.create(r, n + u + h.length);
        t.push({
          type: "tag",
          content: y,
          range: Z.create(d, A)
        }), u += h.length, u = Vs(l, u);
      }
      if (u < l.length) {
        const h = l.substring(u), y = Array.from(h.matchAll(MS));
        t.push(...w$(y, h, r, n + u));
      }
    }
    r++, n = 0;
  }
  return t.length > 0 && t[t.length - 1].type === "break" ? t.slice(0, -1) : t;
}
i(S$, "tokenize");
function w$(e, t, r, n) {
  const a = [];
  if (e.length === 0) {
    const s = ae.create(r, n), o = ae.create(r, n + t.length);
    a.push({
      type: "text",
      content: t,
      range: Z.create(s, o)
    });
  } else {
    let s = 0;
    for (const l of e) {
      const u = l.index, c = t.substring(s, u);
      c.length > 0 && a.push({
        type: "text",
        content: t.substring(s, u),
        range: Z.create(ae.create(r, s + n), ae.create(r, u + n))
      });
      let p = c.length + 1;
      const h = l[1];
      if (a.push({
        type: "inline-tag",
        content: h,
        range: Z.create(ae.create(r, s + p + n), ae.create(r, s + p + h.length + n))
      }), p += h.length, l.length === 4) {
        p += l[2].length;
        const y = l[3];
        a.push({
          type: "text",
          content: y,
          range: Z.create(ae.create(r, s + p + n), ae.create(r, s + p + y.length + n))
        });
      } else
        a.push({
          type: "text",
          content: "",
          range: Z.create(ae.create(r, s + p + n), ae.create(r, s + p + n))
        });
      s = u + l[0].length;
    }
    const o = t.substring(s);
    o.length > 0 && a.push({
      type: "text",
      content: o,
      range: Z.create(ae.create(r, s + n), ae.create(r, s + n + o.length))
    });
  }
  return a;
}
i(w$, "buildInlineTokens");
var LS = /\S/, DS = /\s*$/;
function Vs(e, t) {
  const r = e.substring(t).match(LS);
  return r ? t + r.index : e.length;
}
i(Vs, "skipWhitespace");
function P$(e) {
  const t = e.match(DS);
  if (t && typeof t.index == "number")
    return t.index;
}
i(P$, "lastCharacter");
function k$(e) {
  const t = ae.create(e.position.line, e.position.character);
  if (e.tokens.length === 0)
    return new wp([], Z.create(t, t));
  const r = [];
  for (; e.index < e.tokens.length; ) {
    const s = I$(e, r[r.length - 1]);
    s && r.push(s);
  }
  const n = r[0]?.range.start ?? t, a = r[r.length - 1]?.range.end ?? t;
  return new wp(r, Z.create(n, a));
}
i(k$, "parseJSDocComment");
function I$(e, t) {
  const r = e.tokens[e.index];
  if (r.type === "tag")
    return Sf(e, !1);
  if (r.type === "text" || r.type === "inline-tag")
    return _f(e);
  N$(r, t), e.index++;
}
i(I$, "parseJSDocElement");
function N$(e, t) {
  if (t) {
    const r = new D$("", e.range);
    "inlines" in t ? t.inlines.push(r) : t.content.inlines.push(r);
  }
}
i(N$, "appendEmptyLine");
function _f(e) {
  let t = e.tokens[e.index];
  const r = t;
  let n = t;
  const a = [];
  for (; t && t.type !== "break" && t.type !== "tag"; )
    a.push(O$(e)), n = t, t = e.tokens[e.index];
  return new qu(a, Z.create(r.range.start, n.range.end));
}
i(_f, "parseJSDocText");
function O$(e) {
  return e.tokens[e.index].type === "inline-tag" ? Sf(e, !0) : wf(e);
}
i(O$, "parseJSDocInline");
function Sf(e, t) {
  const r = e.tokens[e.index++], n = r.content.substring(1);
  if (e.tokens[e.index]?.type === "text")
    if (t) {
      const s = wf(e);
      return new Mo(n, new qu([s], s.range), t, Z.create(r.range.start, s.range.end));
    } else {
      const s = _f(e);
      return new Mo(n, s, t, Z.create(r.range.start, s.range.end));
    }
  else {
    const s = r.range;
    return new Mo(n, new qu([], s), t, s);
  }
}
i(Sf, "parseJSDocTag");
function wf(e) {
  const t = e.tokens[e.index++];
  return new D$(t.content, t.range);
}
i(wf, "parseJSDocLine");
function Co(e) {
  if (!e)
    return Co({
      start: "/**",
      end: "*/",
      line: "*"
    });
  const { start: t, end: r, line: n } = e;
  return {
    start: As(t, !0),
    end: As(r, !1),
    line: As(n, !0)
  };
}
i(Co, "normalizeOptions");
function As(e, t) {
  if (typeof e == "string" || typeof e == "object") {
    const r = typeof e == "string" ? Ai(e) : e.source;
    return t ? new RegExp(`^\\s*${r}`) : new RegExp(`\\s*${r}\\s*$`);
  } else
    return e;
}
i(As, "normalizeOption");
var wp = class {
  static {
    i(this, "JSDocCommentImpl");
  }
  constructor(e, t) {
    this.elements = e, this.range = t;
  }
  getTag(e) {
    return this.getAllTags().find((t) => t.name === e);
  }
  getTags(e) {
    return this.getAllTags().filter((t) => t.name === e);
  }
  getAllTags() {
    return this.elements.filter((e) => "name" in e);
  }
  toString() {
    let e = "";
    for (const t of this.elements)
      if (e.length === 0)
        e = t.toString();
      else {
        const r = t.toString();
        e += Hu(e) + r;
      }
    return e.trim();
  }
  toMarkdown(e) {
    let t = "";
    for (const r of this.elements)
      if (t.length === 0)
        t = r.toMarkdown(e);
      else {
        const n = r.toMarkdown(e);
        t += Hu(t) + n;
      }
    return t.trim();
  }
}, Mo = class {
  static {
    i(this, "JSDocTagImpl");
  }
  constructor(e, t, r, n) {
    this.name = e, this.content = t, this.inline = r, this.range = n;
  }
  toString() {
    let e = `@${this.name}`;
    const t = this.content.toString();
    return this.content.inlines.length === 1 ? e = `${e} ${t}` : this.content.inlines.length > 1 && (e = `${e}
${t}`), this.inline ? `{${e}}` : e;
  }
  toMarkdown(e) {
    return e?.renderTag?.(this) ?? this.toMarkdownDefault(e);
  }
  toMarkdownDefault(e) {
    const t = this.content.toMarkdown(e);
    if (this.inline) {
      const a = M$(this.name, t, e ?? {});
      if (typeof a == "string")
        return a;
    }
    let r = "";
    e?.tag === "italic" || e?.tag === void 0 ? r = "*" : e?.tag === "bold" ? r = "**" : e?.tag === "bold-italic" && (r = "***");
    let n = `${r}@${this.name}${r}`;
    return this.content.inlines.length === 1 ? n = `${n} — ${t}` : this.content.inlines.length > 1 && (n = `${n}
${t}`), this.inline ? `{${n}}` : n;
  }
};
function M$(e, t, r) {
  if (e === "linkplain" || e === "linkcode" || e === "link") {
    const n = t.indexOf(" ");
    let a = t;
    if (n > 0) {
      const o = Vs(t, n);
      a = t.substring(o), t = t.substring(0, n);
    }
    return (e === "linkcode" || e === "link" && r.link === "code") && (a = `\`${a}\``), r.renderLink?.(t, a) ?? L$(t, a);
  }
}
i(M$, "renderInlineTag");
function L$(e, t) {
  try {
    return Xe.parse(e, !0), `[${t}](${e})`;
  } catch {
    return e;
  }
}
i(L$, "renderLinkDefault");
var qu = class {
  static {
    i(this, "JSDocTextImpl");
  }
  constructor(e, t) {
    this.inlines = e, this.range = t;
  }
  toString() {
    let e = "";
    for (let t = 0; t < this.inlines.length; t++) {
      const r = this.inlines[t], n = this.inlines[t + 1];
      e += r.toString(), n && n.range.start.line > r.range.start.line && (e += `
`);
    }
    return e;
  }
  toMarkdown(e) {
    let t = "";
    for (let r = 0; r < this.inlines.length; r++) {
      const n = this.inlines[r], a = this.inlines[r + 1];
      t += n.toMarkdown(e), a && a.range.start.line > n.range.start.line && (t += `
`);
    }
    return t;
  }
}, D$ = class {
  static {
    i(this, "JSDocLineImpl");
  }
  constructor(e, t) {
    this.text = e, this.range = t;
  }
  toString() {
    return this.text;
  }
  toMarkdown() {
    return this.text;
  }
};
function Hu(e) {
  return e.endsWith(`
`) ? `
` : `

`;
}
i(Hu, "fillNewlines");
var xS = class {
  static {
    i(this, "JSDocDocumentationProvider");
  }
  constructor(e) {
    this.indexManager = e.shared.workspace.IndexManager, this.commentProvider = e.documentation.CommentProvider;
  }
  getDocumentation(e) {
    const t = this.commentProvider.getComment(e);
    if (t && _$(t))
      return b$(t).toMarkdown({
        renderLink: /* @__PURE__ */ i((n, a) => this.documentationLinkRenderer(e, n, a), "renderLink"),
        renderTag: /* @__PURE__ */ i((n) => this.documentationTagRenderer(e, n), "renderTag")
      });
  }
  documentationLinkRenderer(e, t, r) {
    const n = this.findNameInLocalSymbols(e, t) ?? this.findNameInGlobalScope(e, t);
    if (n && n.nameSegment) {
      const a = n.nameSegment.range.start.line + 1, s = n.nameSegment.range.start.character + 1, o = n.documentUri.with({ fragment: `L${a},${s}` });
      return `[${r}](${o.toString()})`;
    } else
      return;
  }
  documentationTagRenderer(e, t) {
  }
  findNameInLocalSymbols(e, t) {
    const n = Rt(e).localSymbols;
    if (!n)
      return;
    let a = e;
    do {
      const o = n.getStream(a).find((l) => l.name === t);
      if (o)
        return o;
      a = a.$container;
    } while (a);
  }
  findNameInGlobalScope(e, t) {
    return this.indexManager.allElements().find((n) => n.name === t);
  }
}, GS = class {
  static {
    i(this, "DefaultCommentProvider");
  }
  constructor(e) {
    this.grammarConfig = () => e.parser.GrammarConfig;
  }
  getComment(e) {
    return R$(e) ? e.$comment : Tm(e.$cstNode, this.grammarConfig().multilineCommentRules)?.text;
  }
}, FS = class {
  static {
    i(this, "DefaultAsyncParser");
  }
  constructor(e) {
    this.syncParser = e.parser.LangiumParser;
  }
  parse(e, t) {
    return Promise.resolve(this.syncParser.parse(e));
  }
}, Ks;
(function(e) {
  e[e.Normal = 0] = "Normal", e[e.Immediate = 1] = "Immediate";
})(Ks || (Ks = {}));
var jS = class {
  static {
    i(this, "DefaultWorkspaceLock");
  }
  constructor() {
    this.previousTokenSource = new he.CancellationTokenSource(), this.writeQueue = [], this.readQueue = [], this.immediateReads = [], this.done = !0;
  }
  write(e) {
    this.cancelWrite();
    const t = y$();
    return this.previousTokenSource = t, this.enqueue(this.writeQueue, e, t.token);
  }
  read(e, t = Ks.Normal) {
    if (t === Ks.Immediate) {
      const r = Promise.resolve().then(() => e());
      this.immediateReads.push(r);
      const n = /* @__PURE__ */ i(() => {
        this.immediateReads.splice(this.immediateReads.indexOf(r), 1);
      }, "remove");
      return r.then(n, n), r;
    }
    return this.enqueue(this.readQueue, e);
  }
  enqueue(e, t, r = he.CancellationToken.None) {
    const n = new Rf(), a = {
      action: t,
      deferred: n,
      cancellationToken: r
    };
    return e.push(a), this.performNextOperation(), n.promise;
  }
  async performNextOperation() {
    if (!this.done)
      return;
    const e = [];
    if (this.writeQueue.length > 0)
      for (e.push(this.writeQueue.shift()), this.done = !1; this.immediateReads.length > 0; )
        await Promise.allSettled(this.immediateReads.slice());
    else if (this.readQueue.length > 0)
      e.push(...this.readQueue.splice(0, this.readQueue.length)), this.done = !1;
    else
      return;
    await Promise.all(e.map(async ({ action: t, deferred: r, cancellationToken: n }) => {
      try {
        const a = await Promise.resolve().then(() => t(n));
        r.resolve(a);
      } catch (a) {
        bi(a) ? r.resolve(void 0) : r.reject(a);
      }
    })), this.done = !0, this.performNextOperation();
  }
  cancelWrite() {
    this.previousTokenSource.cancel();
  }
}, zS = class {
  static {
    i(this, "DefaultHydrator");
  }
  constructor(e) {
    this.grammarElementIdMap = new bp(), this.tokenTypeIdMap = new bp(), this.cstNodeBuilder = new WT(), this.grammar = e.Grammar, this.lexer = e.parser.Lexer, this.linker = e.references.Linker;
  }
  dehydrate(e) {
    return {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport ? this.dehydrateLexerReport(e.lexerReport) : void 0,
      // We need to create shallow copies of the errors
      // The original errors inherit from the `Error` class, which is not transferable across worker threads
      parserErrors: e.parserErrors.map((t) => ({ ...t, message: t.message })),
      value: this.dehydrateAstNode(e.value, this.createDehyrationContext(e.value))
    };
  }
  dehydrateLexerReport(e) {
    return e;
  }
  createDehyrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const n of At(e))
      t.set(n, {});
    if (e.$cstNode)
      for (const n of Ps(e.$cstNode))
        r.set(n, {});
    return {
      astNodes: t,
      cstNodes: r
    };
  }
  dehydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode !== void 0 && (r.$cstNode = this.dehydrateCstNode(e.$cstNode, t));
    for (const [n, a] of Object.entries(e))
      if (!n.startsWith("$"))
        if (Array.isArray(a)) {
          const s = [];
          r[n] = s;
          for (const o of a)
            we(o) ? s.push(this.dehydrateAstNode(o, t)) : rt(o) ? s.push(this.dehydrateReference(o, t)) : s.push(o);
        } else we(a) ? r[n] = this.dehydrateAstNode(a, t) : rt(a) ? r[n] = this.dehydrateReference(a, t) : a !== void 0 && (r[n] = a);
    return r;
  }
  dehydrateReference(e, t) {
    const r = {};
    return r.$refText = e.$refText, e.$refNode && (r.$refNode = t.cstNodes.get(e.$refNode)), r;
  }
  dehydrateCstNode(e, t) {
    const r = t.cstNodes.get(e);
    if (Tc(e) ? r.fullText = e.fullText : r.grammarSource = this.getGrammarElementId(e.grammarSource), r.hidden = e.hidden, Dn(e))
      r.content = e.content.map((n) => this.dehydrateCstNode(n, t));
    else if (vc(e)) {
      r.tokenType = e.tokenType.name, r.offset = e.offset, r.length = e.length;
      const { start: n, end: a } = e.range;
      r.startLine = n.line, r.startColumn = n.character, r.endLine = a.line, r.endColumn = a.character;
    }
    return r;
  }
  hydrate(e) {
    const t = e.value, r = this.createHydrationContext(t);
    return "$cstNode" in t && this.hydrateCstNode(t.$cstNode, r), {
      lexerErrors: e.lexerErrors,
      lexerReport: e.lexerReport,
      parserErrors: e.parserErrors,
      value: this.hydrateAstNode(t, r)
    };
  }
  createHydrationContext(e) {
    const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const n of At(e))
      t.set(n, {});
    if (e.$cstNode)
      for (const n of Ps(e.$cstNode)) {
        let a;
        "fullText" in n ? a = new YT(n.fullText) : "content" in n ? a = new gf() : "tokenType" in n && (a = this.hydrateCstLeafNode(n)), a && r.set(n, a);
      }
    return {
      astNodes: t,
      cstNodes: r,
      linkedCstNodes: /* @__PURE__ */ new Set()
    };
  }
  hydrateAstNode(e, t) {
    const r = t.astNodes.get(e);
    if (r.$type = e.$type, r.$containerIndex = e.$containerIndex, r.$containerProperty = e.$containerProperty, e.$cstNode) {
      const n = t.cstNodes.get(e.$cstNode);
      r.$cstNode = n, n && !t.linkedCstNodes.has(n) && (t.linkedCstNodes.add(n), n.astNode = r);
    }
    for (const [n, a] of Object.entries(e))
      if (!n.startsWith("$"))
        if (Array.isArray(a)) {
          const s = [];
          r[n] = s;
          for (const o of a)
            we(o) ? s.push(this.setParent(this.hydrateAstNode(o, t), r)) : rt(o) ? s.push(this.hydrateReference(o, r, n, t)) : s.push(o);
        } else we(a) ? r[n] = this.setParent(this.hydrateAstNode(a, t), r) : rt(a) ? r[n] = this.hydrateReference(a, r, n, t) : a !== void 0 && (r[n] = a);
    return r;
  }
  setParent(e, t) {
    return e.$container = t, e;
  }
  hydrateReference(e, t, r, n) {
    return this.linker.buildReference(t, r, n.cstNodes.get(e.$refNode), e.$refText);
  }
  hydrateCstNode(e, t, r = 0) {
    const n = t.cstNodes.get(e);
    if (typeof e.grammarSource == "number" && (n.grammarSource = this.getGrammarElement(e.grammarSource)), Dn(n)) {
      const a = [];
      for (const s of e.content)
        a.push(this.hydrateCstNode(s, t, r++));
      this.cstNodeBuilder.appendChildren(n, a);
    }
    return n;
  }
  hydrateCstLeafNode(e) {
    const t = this.getTokenType(e.tokenType);
    return new HT(e.offset, e.length, e.startLine, e.startColumn, e.endLine, e.endColumn, t, e.hidden);
  }
  getTokenType(e) {
    return this.lexer.definition[e];
  }
  getGrammarElementId(e) {
    if (e)
      return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.get(e);
  }
  getGrammarElement(e) {
    return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.getKey(e);
  }
  createGrammarElementIdMap() {
    let e = 0;
    for (const t of At(this.grammar))
      Xd(t) && this.grammarElementIdMap.set(t, e++);
  }
};
function Ne(e) {
  return {
    documentation: {
      CommentProvider: /* @__PURE__ */ i((t) => new GS(t), "CommentProvider"),
      DocumentationProvider: /* @__PURE__ */ i((t) => new xS(t), "DocumentationProvider")
    },
    parser: {
      AsyncParser: /* @__PURE__ */ i((t) => new FS(t), "AsyncParser"),
      GrammarConfig: /* @__PURE__ */ i((t) => Um(t), "GrammarConfig"),
      LangiumParser: /* @__PURE__ */ i((t) => f$(t), "LangiumParser"),
      CompletionParser: /* @__PURE__ */ i((t) => c$(t), "CompletionParser"),
      ValueConverter: /* @__PURE__ */ i(() => new m$(), "ValueConverter"),
      TokenBuilder: /* @__PURE__ */ i(() => new d$(), "TokenBuilder"),
      Lexer: /* @__PURE__ */ i((t) => new OS(t), "Lexer"),
      ParserErrorMessageProvider: /* @__PURE__ */ i(() => new ZT(), "ParserErrorMessageProvider"),
      LexerErrorMessageProvider: /* @__PURE__ */ i(() => new IS(), "LexerErrorMessageProvider")
    },
    workspace: {
      AstNodeLocator: /* @__PURE__ */ i(() => new bS(), "AstNodeLocator"),
      AstNodeDescriptionProvider: /* @__PURE__ */ i((t) => new ES(t), "AstNodeDescriptionProvider"),
      ReferenceDescriptionProvider: /* @__PURE__ */ i((t) => new CS(t), "ReferenceDescriptionProvider")
    },
    references: {
      Linker: /* @__PURE__ */ i((t) => new uS(t), "Linker"),
      NameProvider: /* @__PURE__ */ i(() => new cS(), "NameProvider"),
      ScopeProvider: /* @__PURE__ */ i((t) => new gS(t), "ScopeProvider"),
      ScopeComputation: /* @__PURE__ */ i((t) => new pS(t), "ScopeComputation"),
      References: /* @__PURE__ */ i((t) => new fS(t), "References")
    },
    serializer: {
      Hydrator: /* @__PURE__ */ i((t) => new zS(t), "Hydrator"),
      JsonSerializer: /* @__PURE__ */ i((t) => new vS(t), "JsonSerializer")
    },
    validation: {
      DocumentValidator: /* @__PURE__ */ i((t) => new AS(t), "DocumentValidator"),
      ValidationRegistry: /* @__PURE__ */ i((t) => new $S(t), "ValidationRegistry")
    },
    shared: /* @__PURE__ */ i(() => e.shared, "shared")
  };
}
i(Ne, "createDefaultCoreModule");
function Oe(e) {
  return {
    ServiceRegistry: /* @__PURE__ */ i((t) => new TS(t), "ServiceRegistry"),
    workspace: {
      LangiumDocuments: /* @__PURE__ */ i((t) => new sS(t), "LangiumDocuments"),
      LangiumDocumentFactory: /* @__PURE__ */ i((t) => new iS(t), "LangiumDocumentFactory"),
      DocumentBuilder: /* @__PURE__ */ i((t) => new wS(t), "DocumentBuilder"),
      IndexManager: /* @__PURE__ */ i((t) => new PS(t), "IndexManager"),
      WorkspaceManager: /* @__PURE__ */ i((t) => new kS(t), "WorkspaceManager"),
      FileSystemProvider: /* @__PURE__ */ i((t) => e.fileSystemProvider(t), "FileSystemProvider"),
      WorkspaceLock: /* @__PURE__ */ i(() => new jS(), "WorkspaceLock"),
      ConfigurationProvider: /* @__PURE__ */ i((t) => new SS(t), "ConfigurationProvider")
    },
    profilers: {}
  };
}
i(Oe, "createDefaultSharedCoreModule");
var Pp;
(function(e) {
  e.merge = (t, r) => jn(jn({}, t), r);
})(Pp || (Pp = {}));
function ee(e, t, r, n, a, s, o, l, u) {
  const c = [e, t, r, n, a, s, o, l, u].reduce(jn, {});
  return Pf(c);
}
i(ee, "inject");
var US = /* @__PURE__ */ Symbol("isProxy");
function Pf(e, t) {
  const r = new Proxy({}, {
    deleteProperty: /* @__PURE__ */ i(() => !1, "deleteProperty"),
    set: /* @__PURE__ */ i(() => {
      throw new Error("Cannot set property on injected service container");
    }, "set"),
    get: /* @__PURE__ */ i((n, a) => a === US ? !0 : Yu(n, a, e, t || r), "get"),
    getOwnPropertyDescriptor: /* @__PURE__ */ i((n, a) => (Yu(n, a, e, t || r), Object.getOwnPropertyDescriptor(n, a)), "getOwnPropertyDescriptor"),
    // used by for..in
    has: /* @__PURE__ */ i((n, a) => a in e, "has"),
    // used by ..in..
    ownKeys: /* @__PURE__ */ i(() => [...Object.getOwnPropertyNames(e)], "ownKeys")
    // used by for..in
  });
  return r;
}
i(Pf, "_inject");
var kp = /* @__PURE__ */ Symbol();
function Yu(e, t, r, n) {
  if (t in e) {
    if (e[t] instanceof Error)
      throw new Error("Construction failure. Please make sure that your dependencies are constructable. Cause: " + e[t]);
    if (e[t] === kp)
      throw new Error('Cycle detected. Please make "' + String(t) + '" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');
    return e[t];
  } else if (t in r) {
    const a = r[t];
    e[t] = kp;
    try {
      e[t] = typeof a == "function" ? a(n) : Pf(a, n);
    } catch (s) {
      throw e[t] = s instanceof Error ? s : void 0, s;
    }
    return e[t];
  } else
    return;
}
i(Yu, "_resolve");
function jn(e, t) {
  if (t) {
    for (const [r, n] of Object.entries(t))
      if (!(r === "__proto__" || r === "constructor" || r === "prototype") && n != null)
        if (typeof n == "object") {
          const a = e[r];
          typeof a == "object" && a !== null ? e[r] = jn(a, n) : e[r] = jn({}, n);
        } else
          e[r] = n;
  }
  return e;
}
i(jn, "_merge");
var BS = class {
  static {
    i(this, "EmptyFileSystemProvider");
  }
  stat(e) {
    throw new Error("No file system is available.");
  }
  statSync(e) {
    throw new Error("No file system is available.");
  }
  async exists() {
    return !1;
  }
  existsSync() {
    return !1;
  }
  readBinary() {
    throw new Error("No file system is available.");
  }
  readBinarySync() {
    throw new Error("No file system is available.");
  }
  readFile() {
    throw new Error("No file system is available.");
  }
  readFileSync() {
    throw new Error("No file system is available.");
  }
  async readDirectory() {
    return [];
  }
  readDirectorySync() {
    return [];
  }
}, De = {
  fileSystemProvider: /* @__PURE__ */ i(() => new BS(), "fileSystemProvider")
}, VS = {
  Grammar: /* @__PURE__ */ i(() => {
  }, "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => ({
    caseInsensitive: !1,
    fileExtensions: [".langium"],
    languageId: "langium"
  }), "LanguageMetaData")
}, KS = {
  AstReflection: /* @__PURE__ */ i(() => new mm(), "AstReflection")
};
function x$() {
  const e = ee(Oe(De), KS), t = ee(Ne({ shared: e }), VS);
  return e.ServiceRegistry.register(t), t;
}
i(x$, "createMinimalGrammarServices");
function xe(e) {
  const t = x$(), r = t.serializer.JsonSerializer.deserialize(e);
  return t.shared.workspace.LangiumDocumentFactory.fromModel(r, Xe.parse(`memory:/${r.name ?? "grammar"}.langium`)), r;
}
i(xe, "loadGrammarFromJson");
var Xu;
((e) => {
  e.Terminals = {
    ARROW_DIRECTION: /L|R|T|B/,
    ARROW_GROUP: /\{group\}/,
    ARROW_INTO: /<|>/,
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    ID: /[\w]([-\w]*\w)?/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    ARCH_ICON: /\([\w-:]+\)/,
    ARCH_TITLE: /\[(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[^\[\]\r\n]+)\]/
  };
})(Xu || (Xu = {}));
var Ju;
((e) => {
  e.Terminals = {
    DOMAIN_NAME: /complex|complicated|clear|chaotic|confusion/,
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(Ju || (Ju = {}));
var Zu;
((e) => {
  e.Terminals = {
    EM_ID: /[_a-zA-Z][\w_]*/,
    EM_FID: /\d{1,3}/,
    EM_DATA_INLINE: /\{(.*)\}|"(.*)"|'(.*)'/,
    EM_DATA_BLOCK: /\{[\t ]*\r?\n(?:[\S\s]*?\r?\n)?\}(?:\r?\n|(?!\S))/,
    EM_ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    EM_ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    EM_TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    EM_WS: /\s+/,
    EM_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    EM_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    EM_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    EM_ML_COMMENT: /\/\*[\s\S]*?\*\//,
    EM_SL_COMMENT: /\/\/[^\n\r]*/
  };
})(Zu || (Zu = {}));
var Qu;
((e) => {
  e.Terminals = {
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    INT: /0|[1-9][0-9]*(?!\.)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    REFERENCE: /\w([-\./\w]*[-\w])?/
  };
})(Qu || (Qu = {}));
var ec;
((e) => {
  e.Terminals = {
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(ec || (ec = {}));
var tc;
((e) => {
  e.Terminals = {
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    INT: /0|[1-9][0-9]*(?!\.)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(tc || (tc = {}));
var rc;
((e) => {
  e.Terminals = {
    NUMBER_PIE: /(?:-?[0-9]+\.[0-9]+(?!\.))|(?:-?(0|[1-9][0-9]*)(?!\.))/,
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(rc || (rc = {}));
var nc;
((e) => {
  e.Terminals = {
    GRATICULE: /circle|polygon/,
    BOOLEAN: /true|false/,
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    NUMBER: /(?:[0-9]+\.[0-9]+(?!\.))|(?:0|[1-9][0-9]*(?!\.))/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    ID: /[\w]([-\w]*\w)?/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(nc || (nc = {}));
var ac;
((e) => {
  e.Terminals = {
    TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ABNF_RULENAME: /[A-Za-z][A-Za-z0-9-]*/,
    ABNF_STRING: /"[^"]*"/,
    ABNF_NUMVAL: /%[xXdDbB][0-9A-Fa-f]+(?:-[0-9A-Fa-f]+|\.[0-9A-Fa-f]+)*/,
    ABNF_REPEAT: /[0-9]*\*[0-9]*/,
    ABNF_EXACT_REPEAT: /[0-9]+/,
    ABNF_WHITESPACE: /[\t \r\n]+/,
    ABNF_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    ABNF_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    ABNF_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    ABNF_COMMENT: /;[^\n\r]*/
  };
})(ac || (ac = {}));
var ic;
((e) => {
  e.Terminals = {
    TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    EBNF_ID: /[A-Z_a-z][\w-]*/,
    EBNF_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    EBNF_SPECIAL_SEQUENCE: /\?(?=[^?;]*[^?\s;][^?;]*\?)[^?;]*\?/,
    EBNF_WHITESPACE: /[\t \r\n]+/,
    EBNF_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    EBNF_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    EBNF_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    EBNF_BLOCK_COMMENT: /\/\*[\s\S]*?\*\//,
    EBNF_ISO_COMMENT: /\(\*[\s\S]*?\*\)/
  };
})(ic || (ic = {}));
var sc;
((e) => {
  e.Terminals = {
    TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    RR_ID: /[A-Z_a-z][\w-]*/,
    RR_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    RR_WHITESPACE: /[\t \r\n]+/,
    RR_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    RR_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    RR_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    RR_BLOCK_COMMENT: /\/\*[\s\S]*?\*\//
  };
})(sc || (sc = {}));
var oc;
((e) => {
  e.Terminals = {
    TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    PEG_ID: /[A-Z_a-z][\w-]*/,
    PEG_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    PEG_WHITESPACE: /[\t \r\n]+/,
    PEG_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    PEG_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    PEG_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
    PEG_LINE_COMMENT: /#[^\n\r]*/
  };
})(oc || (oc = {}));
var lc;
((e) => {
  e.Terminals = {
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    TREEMAP_KEYWORD: /treemap-beta|treemap/,
    CLASS_DEF: /classDef\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\s+([^;\r\n]*))?(?:;)?/,
    STYLE_SEPARATOR: /:::/,
    SEPARATOR: /:/,
    COMMA: /,/,
    INDENTATION: /[ \t]{1,}/,
    WS: /[ \t]+/,
    ML_COMMENT: /\%\%[^\n]*/,
    NL: /\r?\n/,
    ID2: /[a-zA-Z_][a-zA-Z0-9_]*/,
    NUMBER2: /[0-9_\.\,]+/,
    STRING2: /"[^"]*"|'[^']*'/
  };
})(lc || (lc = {}));
var uc;
((e) => {
  e.Terminals = {
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    CLASS_ANNOTATION: /[ \t]+:::[ \t]*[A-Za-z_][\w-]*/,
    ICON_ANNOTATION: /[ \t]+icon\([\w-]*(?::[\w-]+)?\)/,
    DESC_ANNOTATION: /[ \t]+##[^\n\r]*/,
    INDENTATION: /[ \t]{1,}/,
    QUOTED_NAME: /"[^"]*"|'[^']*'/,
    WS: /[ \t]+/,
    ML_COMMENT: /\%\%[^\n]*/,
    NL: /\r?\n/,
    BARE_NAME: /(?!:::|icon\(|##)[^ \t\n\r"'](?:(?![ \t]+:::[ \t]*[A-Za-z_]|[ \t]+icon\(|[ \t]+##)[^\n\r])*/
  };
})(uc || (uc = {}));
var cc;
((e) => {
  e.Terminals = {
    WARDLEY_NUMBER: /[0-9]+\.[0-9]+/,
    ARROW: /->/,
    LINK_PORT: /\+<>|\+>|\+</,
    LINK_ARROW: /-->|-\.->|>|\+'[^']*'<>|\+'[^']*'<|\+'[^']*'>/,
    LINK_LABEL: /;[^\n\r]+/,
    STRATEGY: /build|buy|outsource|market/,
    KW_WARDLEY: /wardley-beta/,
    KW_SIZE: /size/,
    KW_EVOLUTION: /evolution/,
    KW_ANCHOR: /anchor/,
    KW_COMPONENT: /component/,
    KW_LABEL: /label/,
    KW_INERTIA: /inertia/,
    KW_EVOLVE: /evolve/,
    KW_PIPELINE: /pipeline/,
    KW_NOTE: /note/,
    KW_ANNOTATIONS: /annotations/,
    KW_ANNOTATION: /annotation/,
    KW_ACCELERATOR: /accelerator/,
    KW_DEACCELERATOR: /deaccelerator/,
    NAME_WITH_SPACES: /(?!title\s|accTitle|accDescr)[A-Za-z](?:[A-Za-z0-9_()&]|-(?!>))*(?:[ \t]+[A-Za-z(](?:[A-Za-z0-9_()&]|-(?!>))*)*/,
    WS: /[ \t]+/,
    ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
    ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
    TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
    INT: /0|[1-9][0-9]*(?!\.)/,
    STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    ID: /[\w]([-\w]*\w)?/,
    NEWLINE: /\r?\n/,
    WHITESPACE: /[\t ]+/,
    YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
    DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
    SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
  };
})(cc || (cc = {}));
({
  ...Xu.Terminals,
  ...Ju.Terminals,
  ...Zu.Terminals,
  ...Qu.Terminals,
  ...ec.Terminals,
  ...tc.Terminals,
  ...rc.Terminals,
  ...nc.Terminals,
  ...ac.Terminals,
  ...ic.Terminals,
  ...sc.Terminals,
  ...oc.Terminals,
  ...uc.Terminals,
  ...lc.Terminals,
  ...cc.Terminals
});
var Ip = {
  $type: "AbnfAlternation",
  alternatives: "alternatives"
}, Np = {
  $type: "AbnfConcatenation",
  elements: "elements"
}, Lo = {
  $type: "AbnfElement",
  primary: "primary",
  repeat: "repeat"
}, Op = {
  $type: "AbnfGroup",
  element: "element"
}, Mp = {
  $type: "AbnfNumVal",
  value: "value"
}, Lp = {
  $type: "AbnfOptionalGroup",
  element: "element"
}, rn = {
  $type: "AbnfPrimary"
}, Do = {
  $type: "AbnfRule",
  definition: "definition",
  name: "name"
}, Dp = {
  $type: "AbnfRuleName",
  name: "name"
}, xp = {
  $type: "AbnfStringLiteral",
  value: "value"
}, Li = {
  $type: "Accelerator",
  name: "name",
  x: "x",
  y: "y"
}, xo = {
  $type: "Alignment",
  direction: "direction",
  members: "members"
}, Di = {
  $type: "Anchor",
  evolution: "evolution",
  name: "name",
  visibility: "visibility"
}, ba = {
  $type: "Annotation",
  number: "number",
  text: "text",
  x: "x",
  y: "y"
}, Go = {
  $type: "Annotations",
  x: "x",
  y: "y"
}, $t = {
  $type: "Architecture",
  accDescr: "accDescr",
  accTitle: "accTitle",
  alignments: "alignments",
  edges: "edges",
  groups: "groups",
  junctions: "junctions",
  services: "services",
  title: "title"
};
function WS(e) {
  return Ae.isInstance(e, $t.$type);
}
i(WS, "isArchitecture");
var xi = {
  $type: "Axis",
  label: "label",
  name: "name"
}, Es = {
  $type: "Branch",
  name: "name",
  order: "order"
};
function qS(e) {
  return Ae.isInstance(e, Es.$type);
}
i(qS, "isBranch");
var Gp = {
  $type: "Checkout",
  branch: "branch"
}, Gi = {
  $type: "CherryPicking",
  id: "id",
  parent: "parent",
  tags: "tags"
}, Fo = {
  $type: "ClassDefStatement",
  className: "className",
  styleText: "styleText"
}, An = {
  $type: "Commit",
  id: "id",
  message: "message",
  tags: "tags",
  type: "type"
};
function HS(e) {
  return Ae.isInstance(e, An.$type);
}
i(HS, "isCommit");
var Fi = {
  $type: "Common",
  accDescr: "accDescr",
  accTitle: "accTitle",
  title: "title"
}, mr = {
  $type: "Component",
  decorator: "decorator",
  evolution: "evolution",
  inertia: "inertia",
  label: "label",
  name: "name",
  visibility: "visibility"
}, ji = {
  $type: "Curve",
  entries: "entries",
  label: "label",
  name: "name"
}, wr = {
  $type: "Cynefin",
  accDescr: "accDescr",
  accTitle: "accTitle",
  domains: "domains",
  title: "title",
  transitions: "transitions"
};
function YS(e) {
  return Ae.isInstance(e, wr.$type);
}
i(YS, "isCynefin");
var zi = {
  $type: "Deaccelerator",
  name: "name",
  x: "x",
  y: "y"
}, Fp = {
  $type: "Decorator",
  strategy: "strategy"
}, nn = {
  $type: "Direction",
  accDescr: "accDescr",
  accTitle: "accTitle",
  dir: "dir",
  statements: "statements",
  title: "title"
}, Cs = {
  $type: "DomainBlock",
  domain: "domain",
  items: "items"
};
function XS(e) {
  return Ae.isInstance(e, Cs.$type);
}
i(XS, "isDomainBlock");
var fc = {
  $type: "DomainItem",
  label: "label"
};
function JS(e) {
  return Ae.isInstance(e, fc.$type);
}
i(JS, "isDomainItem");
var jp = {
  $type: "EbnfChoice",
  alternatives: "alternatives"
}, zp = {
  $type: "EbnfExceptionPostfix",
  except: "except"
}, Up = {
  $type: "EbnfGroup",
  element: "element"
}, Bp = {
  $type: "EbnfNonTerminal",
  name: "name"
}, Vp = {
  $type: "EbnfOneOrMorePostfix",
  operator: "operator"
}, Kp = {
  $type: "EbnfOptional",
  element: "element"
}, Wp = {
  $type: "EbnfOptionalPostfix",
  operator: "operator"
}, _a = {
  $type: "EbnfPostfix"
}, hr = {
  $type: "EbnfPrimary"
}, qp = {
  $type: "EbnfRepetition",
  element: "element"
}, jo = {
  $type: "EbnfRule",
  definition: "definition",
  name: "name"
}, Hp = {
  $type: "EbnfSequence",
  elements: "elements"
}, Yp = {
  $type: "EbnfSpecial",
  text: "text"
}, zo = {
  $type: "EbnfTerm",
  base: "base",
  postfixes: "postfixes"
}, Xp = {
  $type: "EbnfTerminal",
  value: "value"
}, Jp = {
  $type: "EbnfZeroOrMorePostfix",
  operator: "operator"
}, gt = {
  $type: "Edge",
  lhsDir: "lhsDir",
  lhsGroup: "lhsGroup",
  lhsId: "lhsId",
  lhsInto: "lhsInto",
  rhsDir: "rhsDir",
  rhsGroup: "rhsGroup",
  rhsId: "rhsId",
  rhsInto: "rhsInto",
  title: "title"
}, an = {
  $type: "EmDataEntity",
  dataBlockValue: "dataBlockValue",
  dataType: "dataType",
  name: "name"
}, yr = {
  $type: "EmFrame"
}, Sa = {
  $type: "EmGwt",
  givenStatements: "givenStatements",
  sourceFrame: "sourceFrame",
  thenStatements: "thenStatements",
  whenStatements: "whenStatements"
}, Zp = {
  $type: "EmGwtStatement",
  entityIdentifier: "entityIdentifier"
}, Uo = {
  $type: "EmModelEntity",
  name: "name"
};
function ZS(e) {
  return e === "rmo" || e === "readmodel" || e === "ui" || e === "cmd" || e === "command" || e === "evt" || e === "event" || e === "pcr" || e === "processor";
}
i(ZS, "isEmModelEntityType");
var Ui = {
  $type: "EmNoteEntity",
  dataBlockValue: "dataBlockValue",
  dataType: "dataType",
  sourceFrame: "sourceFrame"
}, Gt = {
  $type: "EmResetFrame",
  dataInlineValue: "dataInlineValue",
  dataReference: "dataReference",
  dataType: "dataType",
  entityIdentifier: "entityIdentifier",
  modelEntityType: "modelEntityType",
  name: "name",
  sourceFrames: "sourceFrames"
};
function QS(e) {
  return Ae.isInstance(e, Gt.$type);
}
i(QS, "isEmResetFrame");
var Xt = {
  $type: "EmTimeFrame",
  dataInlineValue: "dataInlineValue",
  dataReference: "dataReference",
  dataType: "dataType",
  entityIdentifier: "entityIdentifier",
  modelEntityType: "modelEntityType",
  name: "name",
  sourceFrames: "sourceFrames"
}, Bo = {
  $type: "Entry",
  axis: "axis",
  value: "value"
}, Ot = {
  $type: "EventModel",
  accDescr: "accDescr",
  accTitle: "accTitle",
  dataEntities: "dataEntities",
  frames: "frames",
  gwtEntities: "gwtEntities",
  modelEntities: "modelEntities",
  noteEntities: "noteEntities",
  title: "title"
}, Qp = {
  $type: "Evolution",
  stages: "stages"
}, Bi = {
  $type: "EvolutionStage",
  boundary: "boundary",
  name: "name",
  secondName: "secondName"
}, Vo = {
  $type: "Evolve",
  component: "component",
  target: "target"
}, Pr = {
  $type: "GitGraph",
  accDescr: "accDescr",
  accTitle: "accTitle",
  statements: "statements",
  title: "title"
};
function ew(e) {
  return Ae.isInstance(e, Pr.$type);
}
i(ew, "isGitGraph");
var wa = {
  $type: "Group",
  icon: "icon",
  id: "id",
  in: "in",
  title: "title"
}, Ha = {
  $type: "Info",
  accDescr: "accDescr",
  accTitle: "accTitle",
  title: "title"
};
function tw(e) {
  return Ae.isInstance(e, Ha.$type);
}
i(tw, "isInfo");
var Pa = {
  $type: "Item",
  classSelector: "classSelector",
  name: "name"
}, Ko = {
  $type: "Junction",
  id: "id",
  in: "in"
}, ka = {
  $type: "Label",
  negX: "negX",
  negY: "negY",
  offsetX: "offsetX",
  offsetY: "offsetY"
}, Vi = {
  $type: "Leaf",
  classSelector: "classSelector",
  name: "name",
  value: "value"
}, gr = {
  $type: "Link",
  arrow: "arrow",
  from: "from",
  fromPort: "fromPort",
  linkLabel: "linkLabel",
  to: "to",
  toPort: "toPort"
}, En = {
  $type: "Merge",
  branch: "branch",
  id: "id",
  tags: "tags",
  type: "type"
};
function rw(e) {
  return Ae.isInstance(e, En.$type);
}
i(rw, "isMerge");
var Ki = {
  $type: "Note",
  evolution: "evolution",
  text: "text",
  visibility: "visibility"
}, Wo = {
  $type: "Option",
  name: "name",
  value: "value"
}, Cn = {
  $type: "Packet",
  accDescr: "accDescr",
  accTitle: "accTitle",
  blocks: "blocks",
  title: "title"
};
function nw(e) {
  return Ae.isInstance(e, Cn.$type);
}
i(nw, "isPacket");
var bn = {
  $type: "PacketBlock",
  bits: "bits",
  end: "end",
  label: "label",
  start: "start"
};
function aw(e) {
  return Ae.isInstance(e, bn.$type);
}
i(aw, "isPacketBlock");
var ed = {
  $type: "PegAny",
  dot: "dot"
}, td = {
  $type: "PegGroup",
  element: "element"
}, rd = {
  $type: "PegIdentifier",
  name: "name"
}, nd = {
  $type: "PegLiteral",
  value: "value"
}, ad = {
  $type: "PegOrderedChoice",
  alternatives: "alternatives"
}, qo = {
  $type: "PegPrefix",
  operator: "operator",
  suffix: "suffix"
}, Ia = {
  $type: "PegPrimary"
}, Ho = {
  $type: "PegRule",
  definition: "definition",
  name: "name"
}, id = {
  $type: "PegSequence",
  elements: "elements"
}, Yo = {
  $type: "PegSuffix",
  operator: "operator",
  primary: "primary"
}, kr = {
  $type: "Pie",
  accDescr: "accDescr",
  accTitle: "accTitle",
  sections: "sections",
  showData: "showData",
  title: "title"
};
function iw(e) {
  return Ae.isInstance(e, kr.$type);
}
i(iw, "isPie");
var bs = {
  $type: "PieSection",
  label: "label",
  value: "value"
};
function sw(e) {
  return Ae.isInstance(e, bs.$type);
}
i(sw, "isPieSection");
var Xo = {
  $type: "Pipeline",
  components: "components",
  parent: "parent"
}, Wi = {
  $type: "PipelineComponent",
  evolution: "evolution",
  label: "label",
  name: "name"
}, vr = {
  $type: "Radar",
  accDescr: "accDescr",
  accTitle: "accTitle",
  axes: "axes",
  curves: "curves",
  options: "options",
  title: "title"
}, _n = {
  $type: "Railroad",
  accDescr: "accDescr",
  accTitle: "accTitle",
  rules: "rules",
  title: "title"
};
function ow(e) {
  return Ae.isInstance(e, _n.$type);
}
i(ow, "isRailroad");
var Sn = {
  $type: "RailroadAbnf",
  accDescr: "accDescr",
  accTitle: "accTitle",
  rules: "rules",
  title: "title"
};
function lw(e) {
  return Ae.isInstance(e, Sn.$type);
}
i(lw, "isRailroadAbnf");
var sd = {
  $type: "RailroadChoiceExpr",
  alternatives: "alternatives"
}, wn = {
  $type: "RailroadEbnf",
  accDescr: "accDescr",
  accTitle: "accTitle",
  rules: "rules",
  title: "title"
};
function uw(e) {
  return Ae.isInstance(e, wn.$type);
}
i(uw, "isRailroadEbnf");
var Mt = {
  $type: "RailroadExpression"
}, od = {
  $type: "RailroadNonTerminalExpr",
  name: "name"
}, ld = {
  $type: "RailroadOneOrMoreExpr",
  element: "element"
}, ud = {
  $type: "RailroadOptionalExpr",
  element: "element"
}, Pn = {
  $type: "RailroadPeg",
  accDescr: "accDescr",
  accTitle: "accTitle",
  rules: "rules",
  title: "title"
};
function cw(e) {
  return Ae.isInstance(e, Pn.$type);
}
i(cw, "isRailroadPeg");
var Jo = {
  $type: "RailroadRule",
  definition: "definition",
  name: "name"
}, cd = {
  $type: "RailroadSequenceExpr",
  elements: "elements"
}, fd = {
  $type: "RailroadSpecialExpr",
  text: "text"
}, pd = {
  $type: "RailroadTerminalExpr",
  value: "value"
}, dd = {
  $type: "RailroadZeroOrMoreExpr",
  element: "element"
}, Zo = {
  $type: "Section",
  classSelector: "classSelector",
  name: "name"
}, sn = {
  $type: "Service",
  icon: "icon",
  iconText: "iconText",
  id: "id",
  in: "in",
  title: "title"
}, Qo = {
  $type: "Size",
  height: "height",
  width: "width"
}, on = {
  $type: "Statement"
}, Ya = {
  $type: "Transition",
  from: "from",
  label: "label",
  to: "to"
};
function fw(e) {
  return Ae.isInstance(e, Ya.$type);
}
i(fw, "isTransition");
var kn = {
  $type: "Treemap",
  accDescr: "accDescr",
  accTitle: "accTitle",
  title: "title",
  TreemapRows: "TreemapRows"
};
function pw(e) {
  return Ae.isInstance(e, kn.$type);
}
i(pw, "isTreemap");
var el = {
  $type: "TreemapRow",
  indent: "indent",
  item: "item"
}, ln = {
  $type: "TreeNode",
  classAnnotation: "classAnnotation",
  descAnnotation: "descAnnotation",
  iconAnnotation: "iconAnnotation",
  indent: "indent",
  name: "name"
}, Na = {
  $type: "TreeView",
  accDescr: "accDescr",
  accTitle: "accTitle",
  nodes: "nodes",
  title: "title"
}, Pe = {
  $type: "Wardley",
  accDescr: "accDescr",
  accelerators: "accelerators",
  accTitle: "accTitle",
  anchors: "anchors",
  annotation: "annotation",
  annotations: "annotations",
  components: "components",
  deaccelerators: "deaccelerators",
  evolution: "evolution",
  evolves: "evolves",
  links: "links",
  notes: "notes",
  pipelines: "pipelines",
  size: "size",
  title: "title"
};
function dw(e) {
  return Ae.isInstance(e, Pe.$type);
}
i(dw, "isWardley");
var G$ = class extends Wd {
  constructor() {
    super(...arguments), this.types = {
      AbnfAlternation: {
        name: Ip.$type,
        properties: {
          alternatives: {
            name: Ip.alternatives,
            defaultValue: []
          }
        },
        superTypes: []
      },
      AbnfConcatenation: {
        name: Np.$type,
        properties: {
          elements: {
            name: Np.elements,
            defaultValue: []
          }
        },
        superTypes: []
      },
      AbnfElement: {
        name: Lo.$type,
        properties: {
          primary: {
            name: Lo.primary
          },
          repeat: {
            name: Lo.repeat,
            optional: !0
          }
        },
        superTypes: []
      },
      AbnfGroup: {
        name: Op.$type,
        properties: {
          element: {
            name: Op.element
          }
        },
        superTypes: [rn.$type]
      },
      AbnfNumVal: {
        name: Mp.$type,
        properties: {
          value: {
            name: Mp.value
          }
        },
        superTypes: [rn.$type]
      },
      AbnfOptionalGroup: {
        name: Lp.$type,
        properties: {
          element: {
            name: Lp.element
          }
        },
        superTypes: [rn.$type]
      },
      AbnfPrimary: {
        name: rn.$type,
        properties: {},
        superTypes: []
      },
      AbnfRule: {
        name: Do.$type,
        properties: {
          definition: {
            name: Do.definition
          },
          name: {
            name: Do.name
          }
        },
        superTypes: []
      },
      AbnfRuleName: {
        name: Dp.$type,
        properties: {
          name: {
            name: Dp.name
          }
        },
        superTypes: [rn.$type]
      },
      AbnfStringLiteral: {
        name: xp.$type,
        properties: {
          value: {
            name: xp.value
          }
        },
        superTypes: [rn.$type]
      },
      Accelerator: {
        name: Li.$type,
        properties: {
          name: {
            name: Li.name
          },
          x: {
            name: Li.x
          },
          y: {
            name: Li.y
          }
        },
        superTypes: []
      },
      Alignment: {
        name: xo.$type,
        properties: {
          direction: {
            name: xo.direction
          },
          members: {
            name: xo.members,
            defaultValue: []
          }
        },
        superTypes: []
      },
      Anchor: {
        name: Di.$type,
        properties: {
          evolution: {
            name: Di.evolution
          },
          name: {
            name: Di.name
          },
          visibility: {
            name: Di.visibility
          }
        },
        superTypes: []
      },
      Annotation: {
        name: ba.$type,
        properties: {
          number: {
            name: ba.number
          },
          text: {
            name: ba.text
          },
          x: {
            name: ba.x
          },
          y: {
            name: ba.y
          }
        },
        superTypes: []
      },
      Annotations: {
        name: Go.$type,
        properties: {
          x: {
            name: Go.x
          },
          y: {
            name: Go.y
          }
        },
        superTypes: []
      },
      Architecture: {
        name: $t.$type,
        properties: {
          accDescr: {
            name: $t.accDescr,
            optional: !0
          },
          accTitle: {
            name: $t.accTitle,
            optional: !0
          },
          alignments: {
            name: $t.alignments,
            defaultValue: [],
            optional: !0
          },
          edges: {
            name: $t.edges,
            defaultValue: [],
            optional: !0
          },
          groups: {
            name: $t.groups,
            defaultValue: [],
            optional: !0
          },
          junctions: {
            name: $t.junctions,
            defaultValue: [],
            optional: !0
          },
          services: {
            name: $t.services,
            defaultValue: [],
            optional: !0
          },
          title: {
            name: $t.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Axis: {
        name: xi.$type,
        properties: {
          label: {
            name: xi.label,
            optional: !0
          },
          name: {
            name: xi.name
          }
        },
        superTypes: []
      },
      Branch: {
        name: Es.$type,
        properties: {
          name: {
            name: Es.name
          },
          order: {
            name: Es.order
          }
        },
        superTypes: [on.$type]
      },
      Checkout: {
        name: Gp.$type,
        properties: {
          branch: {
            name: Gp.branch
          }
        },
        superTypes: [on.$type]
      },
      CherryPicking: {
        name: Gi.$type,
        properties: {
          id: {
            name: Gi.id
          },
          parent: {
            name: Gi.parent
          },
          tags: {
            name: Gi.tags,
            defaultValue: []
          }
        },
        superTypes: [on.$type]
      },
      ClassDefStatement: {
        name: Fo.$type,
        properties: {
          className: {
            name: Fo.className
          },
          styleText: {
            name: Fo.styleText
          }
        },
        superTypes: []
      },
      Commit: {
        name: An.$type,
        properties: {
          id: {
            name: An.id
          },
          message: {
            name: An.message
          },
          tags: {
            name: An.tags,
            defaultValue: []
          },
          type: {
            name: An.type
          }
        },
        superTypes: [on.$type]
      },
      Common: {
        name: Fi.$type,
        properties: {
          accDescr: {
            name: Fi.accDescr,
            optional: !0
          },
          accTitle: {
            name: Fi.accTitle,
            optional: !0
          },
          title: {
            name: Fi.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Component: {
        name: mr.$type,
        properties: {
          decorator: {
            name: mr.decorator,
            optional: !0
          },
          evolution: {
            name: mr.evolution
          },
          inertia: {
            name: mr.inertia,
            defaultValue: !1
          },
          label: {
            name: mr.label,
            optional: !0
          },
          name: {
            name: mr.name
          },
          visibility: {
            name: mr.visibility
          }
        },
        superTypes: []
      },
      Curve: {
        name: ji.$type,
        properties: {
          entries: {
            name: ji.entries,
            defaultValue: []
          },
          label: {
            name: ji.label,
            optional: !0
          },
          name: {
            name: ji.name
          }
        },
        superTypes: []
      },
      Cynefin: {
        name: wr.$type,
        properties: {
          accDescr: {
            name: wr.accDescr,
            optional: !0
          },
          accTitle: {
            name: wr.accTitle,
            optional: !0
          },
          domains: {
            name: wr.domains,
            defaultValue: [],
            optional: !0
          },
          title: {
            name: wr.title,
            optional: !0
          },
          transitions: {
            name: wr.transitions,
            defaultValue: [],
            optional: !0
          }
        },
        superTypes: []
      },
      Deaccelerator: {
        name: zi.$type,
        properties: {
          name: {
            name: zi.name
          },
          x: {
            name: zi.x
          },
          y: {
            name: zi.y
          }
        },
        superTypes: []
      },
      Decorator: {
        name: Fp.$type,
        properties: {
          strategy: {
            name: Fp.strategy
          }
        },
        superTypes: []
      },
      Direction: {
        name: nn.$type,
        properties: {
          accDescr: {
            name: nn.accDescr
          },
          accTitle: {
            name: nn.accTitle
          },
          dir: {
            name: nn.dir
          },
          statements: {
            name: nn.statements,
            defaultValue: []
          },
          title: {
            name: nn.title
          }
        },
        superTypes: [Pr.$type]
      },
      DomainBlock: {
        name: Cs.$type,
        properties: {
          domain: {
            name: Cs.domain
          },
          items: {
            name: Cs.items,
            defaultValue: [],
            optional: !0
          }
        },
        superTypes: []
      },
      DomainItem: {
        name: fc.$type,
        properties: {
          label: {
            name: fc.label
          }
        },
        superTypes: []
      },
      EbnfChoice: {
        name: jp.$type,
        properties: {
          alternatives: {
            name: jp.alternatives,
            defaultValue: []
          }
        },
        superTypes: []
      },
      EbnfExceptionPostfix: {
        name: zp.$type,
        properties: {
          except: {
            name: zp.except
          }
        },
        superTypes: [_a.$type]
      },
      EbnfGroup: {
        name: Up.$type,
        properties: {
          element: {
            name: Up.element
          }
        },
        superTypes: [hr.$type]
      },
      EbnfNonTerminal: {
        name: Bp.$type,
        properties: {
          name: {
            name: Bp.name
          }
        },
        superTypes: [hr.$type]
      },
      EbnfOneOrMorePostfix: {
        name: Vp.$type,
        properties: {
          operator: {
            name: Vp.operator
          }
        },
        superTypes: [_a.$type]
      },
      EbnfOptional: {
        name: Kp.$type,
        properties: {
          element: {
            name: Kp.element
          }
        },
        superTypes: [hr.$type]
      },
      EbnfOptionalPostfix: {
        name: Wp.$type,
        properties: {
          operator: {
            name: Wp.operator
          }
        },
        superTypes: [_a.$type]
      },
      EbnfPostfix: {
        name: _a.$type,
        properties: {},
        superTypes: []
      },
      EbnfPrimary: {
        name: hr.$type,
        properties: {},
        superTypes: []
      },
      EbnfRepetition: {
        name: qp.$type,
        properties: {
          element: {
            name: qp.element
          }
        },
        superTypes: [hr.$type]
      },
      EbnfRule: {
        name: jo.$type,
        properties: {
          definition: {
            name: jo.definition
          },
          name: {
            name: jo.name
          }
        },
        superTypes: []
      },
      EbnfSequence: {
        name: Hp.$type,
        properties: {
          elements: {
            name: Hp.elements,
            defaultValue: []
          }
        },
        superTypes: []
      },
      EbnfSpecial: {
        name: Yp.$type,
        properties: {
          text: {
            name: Yp.text
          }
        },
        superTypes: [hr.$type]
      },
      EbnfTerm: {
        name: zo.$type,
        properties: {
          base: {
            name: zo.base
          },
          postfixes: {
            name: zo.postfixes,
            defaultValue: []
          }
        },
        superTypes: []
      },
      EbnfTerminal: {
        name: Xp.$type,
        properties: {
          value: {
            name: Xp.value
          }
        },
        superTypes: [hr.$type]
      },
      EbnfZeroOrMorePostfix: {
        name: Jp.$type,
        properties: {
          operator: {
            name: Jp.operator
          }
        },
        superTypes: [_a.$type]
      },
      Edge: {
        name: gt.$type,
        properties: {
          lhsDir: {
            name: gt.lhsDir
          },
          lhsGroup: {
            name: gt.lhsGroup,
            defaultValue: !1,
            optional: !0
          },
          lhsId: {
            name: gt.lhsId
          },
          lhsInto: {
            name: gt.lhsInto,
            defaultValue: !1,
            optional: !0
          },
          rhsDir: {
            name: gt.rhsDir
          },
          rhsGroup: {
            name: gt.rhsGroup,
            defaultValue: !1,
            optional: !0
          },
          rhsId: {
            name: gt.rhsId
          },
          rhsInto: {
            name: gt.rhsInto,
            defaultValue: !1,
            optional: !0
          },
          title: {
            name: gt.title,
            optional: !0
          }
        },
        superTypes: []
      },
      EmDataEntity: {
        name: an.$type,
        properties: {
          dataBlockValue: {
            name: an.dataBlockValue
          },
          dataType: {
            name: an.dataType,
            optional: !0
          },
          name: {
            name: an.name
          }
        },
        superTypes: []
      },
      EmFrame: {
        name: yr.$type,
        properties: {},
        superTypes: []
      },
      EmGwt: {
        name: Sa.$type,
        properties: {
          givenStatements: {
            name: Sa.givenStatements,
            defaultValue: []
          },
          sourceFrame: {
            name: Sa.sourceFrame,
            referenceType: yr.$type
          },
          thenStatements: {
            name: Sa.thenStatements,
            defaultValue: []
          },
          whenStatements: {
            name: Sa.whenStatements,
            defaultValue: [],
            optional: !0
          }
        },
        superTypes: []
      },
      EmGwtStatement: {
        name: Zp.$type,
        properties: {
          entityIdentifier: {
            name: Zp.entityIdentifier,
            referenceType: Uo.$type
          }
        },
        superTypes: []
      },
      EmModelEntity: {
        name: Uo.$type,
        properties: {
          name: {
            name: Uo.name
          }
        },
        superTypes: []
      },
      EmNoteEntity: {
        name: Ui.$type,
        properties: {
          dataBlockValue: {
            name: Ui.dataBlockValue
          },
          dataType: {
            name: Ui.dataType,
            optional: !0
          },
          sourceFrame: {
            name: Ui.sourceFrame,
            referenceType: yr.$type
          }
        },
        superTypes: []
      },
      EmResetFrame: {
        name: Gt.$type,
        properties: {
          dataInlineValue: {
            name: Gt.dataInlineValue,
            optional: !0
          },
          dataReference: {
            name: Gt.dataReference,
            referenceType: an.$type,
            optional: !0
          },
          dataType: {
            name: Gt.dataType,
            optional: !0
          },
          entityIdentifier: {
            name: Gt.entityIdentifier
          },
          modelEntityType: {
            name: Gt.modelEntityType
          },
          name: {
            name: Gt.name
          },
          sourceFrames: {
            name: Gt.sourceFrames,
            defaultValue: [],
            referenceType: yr.$type,
            optional: !0
          }
        },
        superTypes: [yr.$type]
      },
      EmTimeFrame: {
        name: Xt.$type,
        properties: {
          dataInlineValue: {
            name: Xt.dataInlineValue,
            optional: !0
          },
          dataReference: {
            name: Xt.dataReference,
            referenceType: an.$type,
            optional: !0
          },
          dataType: {
            name: Xt.dataType,
            optional: !0
          },
          entityIdentifier: {
            name: Xt.entityIdentifier
          },
          modelEntityType: {
            name: Xt.modelEntityType
          },
          name: {
            name: Xt.name
          },
          sourceFrames: {
            name: Xt.sourceFrames,
            defaultValue: [],
            referenceType: yr.$type,
            optional: !0
          }
        },
        superTypes: [yr.$type]
      },
      Entry: {
        name: Bo.$type,
        properties: {
          axis: {
            name: Bo.axis,
            referenceType: xi.$type,
            optional: !0
          },
          value: {
            name: Bo.value
          }
        },
        superTypes: []
      },
      EventModel: {
        name: Ot.$type,
        properties: {
          accDescr: {
            name: Ot.accDescr,
            optional: !0
          },
          accTitle: {
            name: Ot.accTitle,
            optional: !0
          },
          dataEntities: {
            name: Ot.dataEntities,
            defaultValue: [],
            optional: !0
          },
          frames: {
            name: Ot.frames,
            defaultValue: [],
            optional: !0
          },
          gwtEntities: {
            name: Ot.gwtEntities,
            defaultValue: [],
            optional: !0
          },
          modelEntities: {
            name: Ot.modelEntities,
            defaultValue: [],
            optional: !0
          },
          noteEntities: {
            name: Ot.noteEntities,
            defaultValue: [],
            optional: !0
          },
          title: {
            name: Ot.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Evolution: {
        name: Qp.$type,
        properties: {
          stages: {
            name: Qp.stages,
            defaultValue: []
          }
        },
        superTypes: []
      },
      EvolutionStage: {
        name: Bi.$type,
        properties: {
          boundary: {
            name: Bi.boundary,
            optional: !0
          },
          name: {
            name: Bi.name
          },
          secondName: {
            name: Bi.secondName,
            optional: !0
          }
        },
        superTypes: []
      },
      Evolve: {
        name: Vo.$type,
        properties: {
          component: {
            name: Vo.component
          },
          target: {
            name: Vo.target
          }
        },
        superTypes: []
      },
      GitGraph: {
        name: Pr.$type,
        properties: {
          accDescr: {
            name: Pr.accDescr
          },
          accTitle: {
            name: Pr.accTitle
          },
          statements: {
            name: Pr.statements,
            defaultValue: []
          },
          title: {
            name: Pr.title
          }
        },
        superTypes: []
      },
      Group: {
        name: wa.$type,
        properties: {
          icon: {
            name: wa.icon,
            optional: !0
          },
          id: {
            name: wa.id
          },
          in: {
            name: wa.in
          },
          title: {
            name: wa.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Info: {
        name: Ha.$type,
        properties: {
          accDescr: {
            name: Ha.accDescr,
            optional: !0
          },
          accTitle: {
            name: Ha.accTitle,
            optional: !0
          },
          title: {
            name: Ha.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Item: {
        name: Pa.$type,
        properties: {
          classSelector: {
            name: Pa.classSelector,
            optional: !0
          },
          name: {
            name: Pa.name
          }
        },
        superTypes: []
      },
      Junction: {
        name: Ko.$type,
        properties: {
          id: {
            name: Ko.id
          },
          in: {
            name: Ko.in
          }
        },
        superTypes: []
      },
      Label: {
        name: ka.$type,
        properties: {
          negX: {
            name: ka.negX,
            defaultValue: !1,
            optional: !0
          },
          negY: {
            name: ka.negY,
            defaultValue: !1,
            optional: !0
          },
          offsetX: {
            name: ka.offsetX
          },
          offsetY: {
            name: ka.offsetY
          }
        },
        superTypes: []
      },
      Leaf: {
        name: Vi.$type,
        properties: {
          classSelector: {
            name: Vi.classSelector,
            optional: !0
          },
          name: {
            name: Vi.name
          },
          value: {
            name: Vi.value
          }
        },
        superTypes: [Pa.$type]
      },
      Link: {
        name: gr.$type,
        properties: {
          arrow: {
            name: gr.arrow,
            optional: !0
          },
          from: {
            name: gr.from
          },
          fromPort: {
            name: gr.fromPort,
            optional: !0
          },
          linkLabel: {
            name: gr.linkLabel,
            optional: !0
          },
          to: {
            name: gr.to
          },
          toPort: {
            name: gr.toPort,
            optional: !0
          }
        },
        superTypes: []
      },
      Merge: {
        name: En.$type,
        properties: {
          branch: {
            name: En.branch
          },
          id: {
            name: En.id
          },
          tags: {
            name: En.tags,
            defaultValue: []
          },
          type: {
            name: En.type
          }
        },
        superTypes: [on.$type]
      },
      Note: {
        name: Ki.$type,
        properties: {
          evolution: {
            name: Ki.evolution
          },
          text: {
            name: Ki.text
          },
          visibility: {
            name: Ki.visibility
          }
        },
        superTypes: []
      },
      Option: {
        name: Wo.$type,
        properties: {
          name: {
            name: Wo.name
          },
          value: {
            name: Wo.value,
            defaultValue: !1
          }
        },
        superTypes: []
      },
      Packet: {
        name: Cn.$type,
        properties: {
          accDescr: {
            name: Cn.accDescr,
            optional: !0
          },
          accTitle: {
            name: Cn.accTitle,
            optional: !0
          },
          blocks: {
            name: Cn.blocks,
            defaultValue: [],
            optional: !0
          },
          title: {
            name: Cn.title,
            optional: !0
          }
        },
        superTypes: []
      },
      PacketBlock: {
        name: bn.$type,
        properties: {
          bits: {
            name: bn.bits
          },
          end: {
            name: bn.end,
            optional: !0
          },
          label: {
            name: bn.label
          },
          start: {
            name: bn.start
          }
        },
        superTypes: []
      },
      PegAny: {
        name: ed.$type,
        properties: {
          dot: {
            name: ed.dot
          }
        },
        superTypes: [Ia.$type]
      },
      PegGroup: {
        name: td.$type,
        properties: {
          element: {
            name: td.element
          }
        },
        superTypes: [Ia.$type]
      },
      PegIdentifier: {
        name: rd.$type,
        properties: {
          name: {
            name: rd.name
          }
        },
        superTypes: [Ia.$type]
      },
      PegLiteral: {
        name: nd.$type,
        properties: {
          value: {
            name: nd.value
          }
        },
        superTypes: [Ia.$type]
      },
      PegOrderedChoice: {
        name: ad.$type,
        properties: {
          alternatives: {
            name: ad.alternatives,
            defaultValue: []
          }
        },
        superTypes: []
      },
      PegPrefix: {
        name: qo.$type,
        properties: {
          operator: {
            name: qo.operator,
            optional: !0
          },
          suffix: {
            name: qo.suffix
          }
        },
        superTypes: []
      },
      PegPrimary: {
        name: Ia.$type,
        properties: {},
        superTypes: []
      },
      PegRule: {
        name: Ho.$type,
        properties: {
          definition: {
            name: Ho.definition
          },
          name: {
            name: Ho.name
          }
        },
        superTypes: []
      },
      PegSequence: {
        name: id.$type,
        properties: {
          elements: {
            name: id.elements,
            defaultValue: []
          }
        },
        superTypes: []
      },
      PegSuffix: {
        name: Yo.$type,
        properties: {
          operator: {
            name: Yo.operator,
            optional: !0
          },
          primary: {
            name: Yo.primary
          }
        },
        superTypes: []
      },
      Pie: {
        name: kr.$type,
        properties: {
          accDescr: {
            name: kr.accDescr,
            optional: !0
          },
          accTitle: {
            name: kr.accTitle,
            optional: !0
          },
          sections: {
            name: kr.sections,
            defaultValue: [],
            optional: !0
          },
          showData: {
            name: kr.showData,
            defaultValue: !1,
            optional: !0
          },
          title: {
            name: kr.title,
            optional: !0
          }
        },
        superTypes: []
      },
      PieSection: {
        name: bs.$type,
        properties: {
          label: {
            name: bs.label
          },
          value: {
            name: bs.value
          }
        },
        superTypes: []
      },
      Pipeline: {
        name: Xo.$type,
        properties: {
          components: {
            name: Xo.components,
            defaultValue: []
          },
          parent: {
            name: Xo.parent
          }
        },
        superTypes: []
      },
      PipelineComponent: {
        name: Wi.$type,
        properties: {
          evolution: {
            name: Wi.evolution
          },
          label: {
            name: Wi.label,
            optional: !0
          },
          name: {
            name: Wi.name
          }
        },
        superTypes: []
      },
      Radar: {
        name: vr.$type,
        properties: {
          accDescr: {
            name: vr.accDescr,
            optional: !0
          },
          accTitle: {
            name: vr.accTitle,
            optional: !0
          },
          axes: {
            name: vr.axes,
            defaultValue: [],
            optional: !0
          },
          curves: {
            name: vr.curves,
            defaultValue: [],
            optional: !0
          },
          options: {
            name: vr.options,
            defaultValue: [],
            optional: !0
          },
          title: {
            name: vr.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Railroad: {
        name: _n.$type,
        properties: {
          accDescr: {
            name: _n.accDescr,
            optional: !0
          },
          accTitle: {
            name: _n.accTitle,
            optional: !0
          },
          rules: {
            name: _n.rules,
            defaultValue: []
          },
          title: {
            name: _n.title,
            optional: !0
          }
        },
        superTypes: []
      },
      RailroadAbnf: {
        name: Sn.$type,
        properties: {
          accDescr: {
            name: Sn.accDescr,
            optional: !0
          },
          accTitle: {
            name: Sn.accTitle,
            optional: !0
          },
          rules: {
            name: Sn.rules,
            defaultValue: []
          },
          title: {
            name: Sn.title,
            optional: !0
          }
        },
        superTypes: []
      },
      RailroadChoiceExpr: {
        name: sd.$type,
        properties: {
          alternatives: {
            name: sd.alternatives,
            defaultValue: []
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadEbnf: {
        name: wn.$type,
        properties: {
          accDescr: {
            name: wn.accDescr,
            optional: !0
          },
          accTitle: {
            name: wn.accTitle,
            optional: !0
          },
          rules: {
            name: wn.rules,
            defaultValue: []
          },
          title: {
            name: wn.title,
            optional: !0
          }
        },
        superTypes: []
      },
      RailroadExpression: {
        name: Mt.$type,
        properties: {},
        superTypes: []
      },
      RailroadNonTerminalExpr: {
        name: od.$type,
        properties: {
          name: {
            name: od.name
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadOneOrMoreExpr: {
        name: ld.$type,
        properties: {
          element: {
            name: ld.element
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadOptionalExpr: {
        name: ud.$type,
        properties: {
          element: {
            name: ud.element
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadPeg: {
        name: Pn.$type,
        properties: {
          accDescr: {
            name: Pn.accDescr,
            optional: !0
          },
          accTitle: {
            name: Pn.accTitle,
            optional: !0
          },
          rules: {
            name: Pn.rules,
            defaultValue: []
          },
          title: {
            name: Pn.title,
            optional: !0
          }
        },
        superTypes: []
      },
      RailroadRule: {
        name: Jo.$type,
        properties: {
          definition: {
            name: Jo.definition
          },
          name: {
            name: Jo.name
          }
        },
        superTypes: []
      },
      RailroadSequenceExpr: {
        name: cd.$type,
        properties: {
          elements: {
            name: cd.elements,
            defaultValue: []
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadSpecialExpr: {
        name: fd.$type,
        properties: {
          text: {
            name: fd.text
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadTerminalExpr: {
        name: pd.$type,
        properties: {
          value: {
            name: pd.value
          }
        },
        superTypes: [Mt.$type]
      },
      RailroadZeroOrMoreExpr: {
        name: dd.$type,
        properties: {
          element: {
            name: dd.element
          }
        },
        superTypes: [Mt.$type]
      },
      Section: {
        name: Zo.$type,
        properties: {
          classSelector: {
            name: Zo.classSelector,
            optional: !0
          },
          name: {
            name: Zo.name
          }
        },
        superTypes: [Pa.$type]
      },
      Service: {
        name: sn.$type,
        properties: {
          icon: {
            name: sn.icon,
            optional: !0
          },
          iconText: {
            name: sn.iconText,
            optional: !0
          },
          id: {
            name: sn.id
          },
          in: {
            name: sn.in
          },
          title: {
            name: sn.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Size: {
        name: Qo.$type,
        properties: {
          height: {
            name: Qo.height
          },
          width: {
            name: Qo.width
          }
        },
        superTypes: []
      },
      Statement: {
        name: on.$type,
        properties: {},
        superTypes: []
      },
      Transition: {
        name: Ya.$type,
        properties: {
          from: {
            name: Ya.from
          },
          label: {
            name: Ya.label
          },
          to: {
            name: Ya.to
          }
        },
        superTypes: []
      },
      TreeNode: {
        name: ln.$type,
        properties: {
          classAnnotation: {
            name: ln.classAnnotation,
            optional: !0
          },
          descAnnotation: {
            name: ln.descAnnotation,
            optional: !0
          },
          iconAnnotation: {
            name: ln.iconAnnotation,
            optional: !0
          },
          indent: {
            name: ln.indent,
            optional: !0
          },
          name: {
            name: ln.name
          }
        },
        superTypes: []
      },
      TreeView: {
        name: Na.$type,
        properties: {
          accDescr: {
            name: Na.accDescr,
            optional: !0
          },
          accTitle: {
            name: Na.accTitle,
            optional: !0
          },
          nodes: {
            name: Na.nodes,
            defaultValue: []
          },
          title: {
            name: Na.title,
            optional: !0
          }
        },
        superTypes: []
      },
      Treemap: {
        name: kn.$type,
        properties: {
          accDescr: {
            name: kn.accDescr,
            optional: !0
          },
          accTitle: {
            name: kn.accTitle,
            optional: !0
          },
          title: {
            name: kn.title,
            optional: !0
          },
          TreemapRows: {
            name: kn.TreemapRows,
            defaultValue: []
          }
        },
        superTypes: []
      },
      TreemapRow: {
        name: el.$type,
        properties: {
          indent: {
            name: el.indent,
            optional: !0
          },
          item: {
            name: el.item
          }
        },
        superTypes: []
      },
      Wardley: {
        name: Pe.$type,
        properties: {
          accDescr: {
            name: Pe.accDescr,
            optional: !0
          },
          accelerators: {
            name: Pe.accelerators,
            defaultValue: [],
            optional: !0
          },
          accTitle: {
            name: Pe.accTitle,
            optional: !0
          },
          anchors: {
            name: Pe.anchors,
            defaultValue: [],
            optional: !0
          },
          annotation: {
            name: Pe.annotation,
            defaultValue: [],
            optional: !0
          },
          annotations: {
            name: Pe.annotations,
            defaultValue: [],
            optional: !0
          },
          components: {
            name: Pe.components,
            defaultValue: [],
            optional: !0
          },
          deaccelerators: {
            name: Pe.deaccelerators,
            defaultValue: [],
            optional: !0
          },
          evolution: {
            name: Pe.evolution,
            optional: !0
          },
          evolves: {
            name: Pe.evolves,
            defaultValue: [],
            optional: !0
          },
          links: {
            name: Pe.links,
            defaultValue: [],
            optional: !0
          },
          notes: {
            name: Pe.notes,
            defaultValue: [],
            optional: !0
          },
          pipelines: {
            name: Pe.pipelines,
            defaultValue: [],
            optional: !0
          },
          size: {
            name: Pe.size,
            optional: !0
          },
          title: {
            name: Pe.title,
            optional: !0
          }
        },
        superTypes: []
      }
    };
  }
  static {
    i(this, "MermaidAstReflection");
  }
}, Ae = new G$(), md, mw = /* @__PURE__ */ i(() => md ?? (md = xe(`{"$type":"Grammar","isDeclared":true,"name":"ArchitectureGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Architecture","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"architecture-beta"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"groups","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"services","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"junctions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Assignment","feature":"edges","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"alignments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"LeftPort","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"lhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"RightPort","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"Keyword","value":":"}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Arrow","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Assignment","feature":"lhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"--"},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}},{"$type":"Keyword","value":"-"}]}]},{"$type":"Assignment","feature":"rhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Group","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"group"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Service","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"service"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"iconText","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Junction","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"junction"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Edge","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"lhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Assignment","feature":"lhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Assignment","feature":"rhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Assignment","feature":"rhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Alignment","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"align"},{"$type":"Assignment","feature":"direction","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"row"},{"$type":"Keyword","value":"column"}]}},{"$type":"Assignment","feature":"members","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Assignment","feature":"members","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},"cardinality":"+"},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"ARROW_DIRECTION","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"L"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"R"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"T"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"B"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_GROUP","definition":{"$type":"RegexToken","regex":"/\\\\{group\\\\}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_INTO","definition":{"$type":"RegexToken","regex":"/<|>/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@19"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@20"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","name":"ARCH_ICON","definition":{"$type":"RegexToken","regex":"/\\\\([\\\\w-:]+\\\\)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARCH_TITLE","definition":{"$type":"RegexToken","regex":"/\\\\[(?:\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'|[^\\\\[\\\\]\\\\r\\\\n]+)\\\\]/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[],"types":[]}`)), "ArchitectureGrammarGrammar"), hd, hw = /* @__PURE__ */ i(() => hd ?? (hd = xe(`{"$type":"Grammar","isDeclared":true,"name":"CynefinGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Cynefin","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"cynefin-beta"},{"$type":"Keyword","value":"cynefin-beta:"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Assignment","feature":"domains","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"transitions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"DomainBlock","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"domain","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"items","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"DomainItem","definition":{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Transition","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"from","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":"-->"},{"$type":"Assignment","feature":"to","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"DOMAIN_NAME","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"complex"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"complicated"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"clear"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"chaotic"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"confusion"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@11"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@12"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "CynefinGrammarGrammar"), yd, yw = /* @__PURE__ */ i(() => yd ?? (yd = xe('{"$type":"Grammar","isDeclared":true,"name":"EventModeling","interfaces":[{"$type":"Interface","name":"Common","attributes":[{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"rules":[{"$type":"ParserRule","entry":true,"name":"EventModel","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"eventmodeling"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"modelEntities","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"frames","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"dataEntities","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"Assignment","feature":"noteEntities","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"gwtEntities","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmModelEntityType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"rmo"},{"$type":"Keyword","value":"readmodel"},{"$type":"Keyword","value":"ui"},{"$type":"Keyword","value":"cmd"},{"$type":"Keyword","value":"command"},{"$type":"Keyword","value":"evt"},{"$type":"Keyword","value":"event"},{"$type":"Keyword","value":"pcr"},{"$type":"Keyword","value":"processor"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmDataType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"json"},{"$type":"Keyword","value":"jsobj"},{"$type":"Keyword","value":"figma"},{"$type":"Keyword","value":"salt"},{"$type":"Keyword","value":"uri"},{"$type":"Keyword","value":"md"},{"$type":"Keyword","value":"html"},{"$type":"Keyword","value":"text"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"EmDataInline","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"`"},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Keyword","value":"`"}],"cardinality":"?"},{"$type":"Assignment","feature":"dataInlineValue","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"EmDataBlock","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"`"},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Keyword","value":"`"}],"cardinality":"?"},{"$type":"Assignment","feature":"dataBlockValue","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"QualifiedName","dataType":"string","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmTimeFrame","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"tf"},{"$type":"Keyword","value":"timeframe"}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"modelEntityType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"entityIdentifier","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"->>"},{"$type":"Assignment","feature":"sourceFrames","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@8"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}}],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"[["},{"$type":"Assignment","feature":"dataReference","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@10"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"Keyword","value":"]]"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmResetFrame","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"rf"},{"$type":"Keyword","value":"resetframe"}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"modelEntityType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"entityIdentifier","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"->>"},{"$type":"Assignment","feature":"sourceFrames","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@8"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}}],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"[["},{"$type":"Assignment","feature":"dataReference","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@10"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"Keyword","value":"]]"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmFrame","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmModelEntity","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"entity"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmDataEntity","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"data"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmNoteEntity","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"note"},{"$type":"Assignment","feature":"sourceFrame","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@8"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmGwt","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"gwt"},{"$type":"Assignment","feature":"sourceFrame","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@8"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"Keyword","value":"given"},{"$type":"Assignment","feature":"givenStatements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},"cardinality":"+"},{"$type":"Group","elements":[{"$type":"Keyword","value":"when"},{"$type":"Assignment","feature":"whenStatements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"},{"$type":"Keyword","value":"then"},{"$type":"Assignment","feature":"thenStatements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},"cardinality":"+"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EmGwtStatement","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]},{"$type":"Assignment","feature":"entityIdentifier","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@9"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EM_EID","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EM_FI","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"EM_ID","definition":{"$type":"RegexToken","regex":"/[_a-zA-Z][\\\\w_]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_FID","definition":{"$type":"RegexToken","regex":"/\\\\d{1,3}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_DATA_INLINE","definition":{"$type":"RegexToken","regex":"/\\\\{(.*)\\\\}|\\"(.*)\\"|\'(.*)\'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_DATA_BLOCK","definition":{"$type":"RegexToken","regex":"/\\\\{[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?\\\\}(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EM_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"EM_WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EM_YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EM_DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EM_SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EM_ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EM_SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"imports":[],"types":[]}')), "EventModelingGrammar"), gd, gw = /* @__PURE__ */ i(() => gd ?? (gd = xe(`{"$type":"Grammar","isDeclared":true,"name":"GitGraphGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"GitGraph","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Keyword","value":":"}]},{"$type":"Keyword","value":"gitGraph:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Keyword","value":":"}]}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"Assignment","feature":"statements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Direction","definition":{"$type":"Assignment","feature":"dir","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"LR"},{"$type":"Keyword","value":"TB"},{"$type":"Keyword","value":"BT"}]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Commit","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"commit"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"msg:","cardinality":"?"},{"$type":"Assignment","feature":"message","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Branch","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"branch"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"order:"},{"$type":"Assignment","feature":"order","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Merge","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"merge"},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Checkout","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"checkout"},{"$type":"Keyword","value":"switch"}]},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"CherryPicking","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"cherry-pick"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"parent:"},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@14"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","name":"REFERENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[],"types":[]}`)), "GitGraphGrammarGrammar"), vd, vw = /* @__PURE__ */ i(() => vd ?? (vd = xe(`{"$type":"Grammar","isDeclared":true,"name":"InfoGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Info","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"info"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"showInfo"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[],"cardinality":"?"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@7"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "InfoGrammarGrammar"), Td, Tw = /* @__PURE__ */ i(() => Td ?? (Td = xe(`{"$type":"Grammar","isDeclared":true,"name":"PacketGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Packet","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"packet"},{"$type":"Keyword","value":"packet-beta"}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"blocks","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PacketBlock","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"start","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"end","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}],"cardinality":"?"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"+"},{"$type":"Assignment","feature":"bits","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "PacketGrammarGrammar"), $d, $w = /* @__PURE__ */ i(() => $d ?? ($d = xe(`{"$type":"Grammar","isDeclared":true,"name":"PieGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Pie","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"pie"},{"$type":"Assignment","feature":"showData","operator":"?=","terminal":{"$type":"Keyword","value":"showData"},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Assignment","feature":"sections","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PieSection","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"FLOAT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/-?(0|[1-9][0-9]*)(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER_PIE","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@2"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@3"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@11"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@12"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "PieGrammarGrammar"), Rd, Rw = /* @__PURE__ */ i(() => Rd ?? (Rd = xe(`{"$type":"Grammar","isDeclared":true,"name":"RadarGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Radar","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":"radar-beta:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":":"}]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"axis"},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"curve"},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Label","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Axis","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Curve","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":"}"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Entries","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"DetailedEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"axis","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@2"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"deprecatedSyntax":false,"isMulti":false}},{"$type":"Keyword","value":":","cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"NumberEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Option","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"showLegend"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"ticks"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"max"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"min"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"graticule"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"GRATICULE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"circle"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"polygon"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@16"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[{"$type":"Interface","name":"Entry","attributes":[{"$type":"TypeAttribute","name":"axis","isOptional":true,"type":{"$type":"ReferenceType","referenceType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@2"}},"isMulti":false}},{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}],"superTypes":[]}],"types":[]}`)), "RadarGrammarGrammar"), Ad, Aw = /* @__PURE__ */ i(() => Ad ?? (Ad = xe('{"$type":"Grammar","isDeclared":true,"name":"RailroadAbnfGrammar","rules":[{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ABNF_RULENAME","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[A-Za-z][A-Za-z0-9-]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ABNF_STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ABNF_NUMVAL","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/%[xXdDbB][0-9A-Fa-f]+(?:-[0-9A-Fa-f]+|\\\\.[0-9A-Fa-f]+)*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ABNF_REPEAT","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[0-9]*\\\\*[0-9]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ABNF_EXACT_REPEAT","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[0-9]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"ABNF_WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t \\\\r\\\\n]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ABNF_YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ABNF_DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ABNF_SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ABNF_COMMENT","definition":{"$type":"RegexToken","regex":"/;[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"ParserRule","entry":true,"name":"RailroadAbnf","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"railroad-abnf-beta"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"},{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfRule","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfAlternation","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"/"},{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfConcatenation","returnType":{"$ref":"#/interfaces@3"},"definition":{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},"cardinality":"+"},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfElement","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"repeat","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"repeat","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"primary","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfPrimary","returnType":{"$ref":"#/interfaces@5"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfStringLiteral","returnType":{"$ref":"#/interfaces@6"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfNumVal","returnType":{"$ref":"#/interfaces@7"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfRuleName","returnType":{"$ref":"#/interfaces@8"},"definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfGroup","returnType":{"$ref":"#/interfaces@9"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"AbnfOptionalGroup","returnType":{"$ref":"#/interfaces@10"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"fragment":false,"parameters":[]}],"interfaces":[{"$type":"Interface","name":"RailroadAbnf","attributes":[{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"rules","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@1"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"AbnfRule","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"definition","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"AbnfAlternation","attributes":[{"$type":"TypeAttribute","name":"alternatives","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@3"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"AbnfConcatenation","attributes":[{"$type":"TypeAttribute","name":"elements","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@4"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"AbnfElement","attributes":[{"$type":"TypeAttribute","name":"repeat","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"primary","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@5"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"AbnfPrimary","attributes":[],"superTypes":[]},{"$type":"Interface","name":"AbnfStringLiteral","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"AbnfNumVal","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"AbnfRuleName","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"AbnfGroup","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"AbnfOptionalGroup","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]}],"imports":[],"types":[]}')), "RailroadAbnfGrammarGrammar"), Ed, Ew = /* @__PURE__ */ i(() => Ed ?? (Ed = xe(`{"$type":"Grammar","isDeclared":true,"name":"RailroadEbnfGrammar","rules":[{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EBNF_ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[A-Z_a-z][\\\\w-]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EBNF_STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"EBNF_SPECIAL_SEQUENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\?(?=[^?;]*[^?\\\\s;][^?;]*\\\\?)[^?;]*\\\\?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t \\\\r\\\\n]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_BLOCK_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"EBNF_ISO_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\(\\\\*[\\\\s\\\\S]*?\\\\*\\\\)/","parenthesized":false},"fragment":false},{"$type":"ParserRule","entry":true,"name":"RailroadEbnf","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"railroad-ebnf-beta"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"},{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfRule","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"::="}]},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfChoice","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfSequence","returnType":{"$ref":"#/interfaces@3"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":",","cardinality":"?"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfTerm","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"base","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Assignment","feature":"postfixes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfPrimary","returnType":{"$ref":"#/interfaces@5"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfTerminal","returnType":{"$ref":"#/interfaces@7"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfNonTerminal","returnType":{"$ref":"#/interfaces@8"},"definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfSpecial","returnType":{"$ref":"#/interfaces@9"},"definition":{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfGroup","returnType":{"$ref":"#/interfaces@10"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfOptional","returnType":{"$ref":"#/interfaces@11"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfRepetition","returnType":{"$ref":"#/interfaces@12"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Keyword","value":"}"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfPostfix","returnType":{"$ref":"#/interfaces@6"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfOptionalPostfix","returnType":{"$ref":"#/interfaces@13"},"definition":{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"?"}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfZeroOrMorePostfix","returnType":{"$ref":"#/interfaces@14"},"definition":{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"*"}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfOneOrMorePostfix","returnType":{"$ref":"#/interfaces@15"},"definition":{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"+"}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EbnfExceptionPostfix","returnType":{"$ref":"#/interfaces@16"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"except","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]}],"interfaces":[{"$type":"Interface","name":"RailroadEbnf","attributes":[{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"rules","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@1"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"EbnfRule","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"definition","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"EbnfChoice","attributes":[{"$type":"TypeAttribute","name":"alternatives","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@3"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"EbnfSequence","attributes":[{"$type":"TypeAttribute","name":"elements","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@4"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"EbnfTerm","attributes":[{"$type":"TypeAttribute","name":"base","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@5"}},"isOptional":false},{"$type":"TypeAttribute","name":"postfixes","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@6"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"EbnfPrimary","attributes":[],"superTypes":[]},{"$type":"Interface","name":"EbnfPostfix","attributes":[],"superTypes":[]},{"$type":"Interface","name":"EbnfTerminal","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfNonTerminal","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfSpecial","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"text","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfGroup","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"EbnfOptional","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"EbnfRepetition","superTypes":[{"$ref":"#/interfaces@5"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"EbnfOptionalPostfix","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"operator","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfZeroOrMorePostfix","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"operator","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfOneOrMorePostfix","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"operator","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"EbnfExceptionPostfix","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"except","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@5"}},"isOptional":false}]}],"imports":[],"types":[]}`)), "RailroadEbnfGrammarGrammar"), Cd, Cw = /* @__PURE__ */ i(() => Cd ?? (Cd = xe(`{"$type":"Grammar","isDeclared":true,"name":"RailroadGrammar","rules":[{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RR_ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[A-Z_a-z][\\\\w-]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RR_STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"RR_WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t \\\\r\\\\n]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"RR_YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"RR_DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"RR_SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"RR_BLOCK_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//","parenthesized":false},"fragment":false},{"$type":"ParserRule","entry":true,"name":"Railroad","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"railroad-beta"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"},{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadRule","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadExpression","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadSequenceExpr","returnType":{"$ref":"#/interfaces@3"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"sequence"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadChoiceExpr","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"choice"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadOptionalExpr","returnType":{"$ref":"#/interfaces@5"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"optional"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadOneOrMoreExpr","returnType":{"$ref":"#/interfaces@6"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"oneOrMore"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadZeroOrMoreExpr","returnType":{"$ref":"#/interfaces@7"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"zeroOrMore"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadTerminalExpr","returnType":{"$ref":"#/interfaces@8"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadNonTerminalExpr","returnType":{"$ref":"#/interfaces@9"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"nonterminal"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"RailroadSpecialExpr","returnType":{"$ref":"#/interfaces@10"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"special"},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]}],"interfaces":[{"$type":"Interface","name":"Railroad","attributes":[{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"rules","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@1"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"RailroadRule","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"definition","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"RailroadExpression","attributes":[],"superTypes":[]},{"$type":"Interface","name":"RailroadSequenceExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"elements","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}}},"isOptional":false}]},{"$type":"Interface","name":"RailroadChoiceExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"alternatives","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}}},"isOptional":false}]},{"$type":"Interface","name":"RailroadOptionalExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"RailroadOneOrMoreExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"RailroadZeroOrMoreExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"RailroadTerminalExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"RailroadNonTerminalExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"RailroadSpecialExpr","superTypes":[{"$ref":"#/interfaces@2"}],"attributes":[{"$type":"TypeAttribute","name":"text","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]}],"imports":[],"types":[]}`)), "RailroadGrammarGrammar"), bd, bw = /* @__PURE__ */ i(() => bd ?? (bd = xe(`{"$type":"Grammar","isDeclared":true,"name":"RailroadPegGrammar","rules":[{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"PEG_ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[A-Z_a-z][\\\\w-]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"PEG_STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"PEG_WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t \\\\r\\\\n]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"PEG_YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"PEG_DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"PEG_SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"PEG_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/#[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false},{"$type":"ParserRule","entry":true,"name":"RailroadPeg","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"railroad-peg-beta"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"},{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegRule","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Keyword","value":"<-"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegOrderedChoice","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"/"},{"$type":"Assignment","feature":"alternatives","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegSequence","returnType":{"$ref":"#/interfaces@3"},"definition":{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"cardinality":"+"},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegPrefix","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"&"}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"!"}}],"cardinality":"?"},{"$type":"Assignment","feature":"suffix","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegSuffix","returnType":{"$ref":"#/interfaces@5"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"primary","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"?"}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Keyword","value":"+"}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegPrimary","returnType":{"$ref":"#/interfaces@6"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegLiteral","returnType":{"$ref":"#/interfaces@7"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegIdentifier","returnType":{"$ref":"#/interfaces@8"},"definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegGroup","returnType":{"$ref":"#/interfaces@9"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"element","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PegAny","returnType":{"$ref":"#/interfaces@10"},"definition":{"$type":"Assignment","feature":"dot","operator":"=","terminal":{"$type":"Keyword","value":"."}},"entry":false,"fragment":false,"parameters":[]}],"interfaces":[{"$type":"Interface","name":"RailroadPeg","attributes":[{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"rules","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@1"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"PegRule","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"definition","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"PegOrderedChoice","attributes":[{"$type":"TypeAttribute","name":"alternatives","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@3"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"PegSequence","attributes":[{"$type":"TypeAttribute","name":"elements","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@4"}}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"PegPrefix","attributes":[{"$type":"TypeAttribute","name":"operator","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"suffix","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@5"}},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"PegSuffix","attributes":[{"$type":"TypeAttribute","name":"primary","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@6"}},"isOptional":false},{"$type":"TypeAttribute","name":"operator","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"PegPrimary","attributes":[],"superTypes":[]},{"$type":"Interface","name":"PegLiteral","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"PegIdentifier","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]},{"$type":"Interface","name":"PegGroup","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"element","type":{"$type":"SimpleType","typeRef":{"$ref":"#/interfaces@2"}},"isOptional":false}]},{"$type":"Interface","name":"PegAny","superTypes":[{"$ref":"#/interfaces@6"}],"attributes":[{"$type":"TypeAttribute","name":"dot","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}]}],"imports":[],"types":[]}`)), "RailroadPegGrammarGrammar"), _d, _w = /* @__PURE__ */ i(() => _d ?? (_d = xe(`{"$type":"Grammar","isDeclared":true,"name":"TreemapGrammar","rules":[{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"Treemap","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]},{"$type":"Assignment","feature":"TreemapRows","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"TREEMAP_KEYWORD","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap-beta"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"CLASS_DEF","definition":{"$type":"RegexToken","regex":"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STYLE_SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":::"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"COMMA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":","},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false},{"$type":"ParserRule","name":"TreemapRow","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"item","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"ClassDef","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Item","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Section","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Leaf","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[],"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"ID2","definition":{"$type":"RegexToken","regex":"/[a-zA-Z_][a-zA-Z0-9_]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER2","definition":{"$type":"RegexToken","regex":"/[0-9_\\\\.\\\\,]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"MyNumber","dataType":"number","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/","parenthesized":false},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"Item","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"classSelector","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"Section","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[]},{"$type":"Interface","name":"Leaf","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}]},{"$type":"Interface","name":"ClassDefStatement","attributes":[{"$type":"TypeAttribute","name":"className","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"styleText","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"Treemap","attributes":[{"$type":"TypeAttribute","name":"TreemapRows","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@15"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"imports":[],"types":[],"$comment":"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */"}`)), "TreemapGrammarGrammar"), Sd, Sw = /* @__PURE__ */ i(() => Sd ?? (Sd = xe(`{"$type":"Grammar","isDeclared":true,"name":"TreeViewGrammar","rules":[{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"TreeView","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"treeView-beta"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"nodes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]},"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"CLASS_ANNOTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+:::[ \\\\t]*[A-Za-z_][\\\\w-]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ICON_ANNOTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+icon\\\\([\\\\w-]*(?::[\\\\w-]+)?\\\\)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"DESC_ANNOTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+##[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"QUOTED_NAME","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","name":"BARE_NAME","definition":{"$type":"RegexToken","regex":"/(?!:::|icon\\\\(|##)[^ \\\\t\\\\n\\\\r\\"'](?:(?![ \\\\t]+:::[ \\\\t]*[A-Za-z_]|[ \\\\t]+icon\\\\(|[ \\\\t]+##)[^\\\\n\\\\r])*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"TreeNode","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"classAnnotation","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"iconAnnotation","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"descAnnotation","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},"entry":false,"fragment":false,"parameters":[]}],"interfaces":[{"$type":"Interface","name":"TreeView","attributes":[{"$type":"TypeAttribute","name":"nodes","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@14"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"imports":[],"types":[],"$comment":"/**\\n * TreeView grammar for Langium\\n *\\n * Supports both quoted labels (\\"my file\\") and bare labels (index.js).\\n * Annotations (:::class, icon(), ## description) are parsed directly into\\n * AST fields by the grammar. Value conversion for stripping quotes, extracting\\n * class names, icon names, and description text happens in valueConverter.ts.\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treeView keyword, allowing for empty lines and comments before the\\n * treeView declaration.\\n */"}`)), "TreeViewGrammarGrammar"), wd, ww = /* @__PURE__ */ i(() => wd ?? (wd = xe(`{"$type":"Grammar","isDeclared":true,"name":"WardleyGrammar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Wardley","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"size","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"anchors","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"components","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"links","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"evolves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"Assignment","feature":"pipelines","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"notes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"annotations","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}},{"$type":"Assignment","feature":"annotation","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accelerators","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Assignment","feature":"deaccelerators","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}]},"entry":false,"parameters":[]},{"$type":"ParserRule","name":"Size","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"width","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"height","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Evolution","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]},{"$type":"Assignment","feature":"stages","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Assignment","feature":"stages","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"EvolutionStage","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"boundary","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"/"},{"$type":"Assignment","feature":"secondName","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}}],"cardinality":"?"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Anchor","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Component","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"decorator","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"inertia","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"inertia","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}},{"$type":"Keyword","value":")"}]}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Label","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"negX","operator":"?=","terminal":{"$type":"Keyword","value":"-"},"cardinality":"?"},{"$type":"Assignment","feature":"offsetX","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"negY","operator":"?=","terminal":{"$type":"Keyword","value":"-"},"cardinality":"?"},{"$type":"Assignment","feature":"offsetY","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Decorator","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"strategy","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Link","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"from","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"fromPort","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"arrow","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}]},"cardinality":"?"},{"$type":"Assignment","feature":"to","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"toPort","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"linkLabel","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Evolve","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Assignment","feature":"component","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Assignment","feature":"target","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Pipeline","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"+"},{"$type":"Assignment","feature":"components","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"+"},{"$type":"Keyword","value":"}"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"PipelineComponent","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Note","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"visibility","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"evolution","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Annotations","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Annotation","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"Assignment","feature":"number","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"Assignment","feature":"text","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"CoordinateValue","dataType":"number","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Accelerator","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","name":"Deaccelerator","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]}]}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"x","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"y","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"Keyword","value":"]"},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"TerminalRule","name":"WARDLEY_NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"->"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_PORT","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+<>"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+>"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"+<"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_ARROW","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"-->"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"-.->"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":">"},"parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'<>/","parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'</","parenthesized":false}],"parenthesized":false},{"$type":"RegexToken","regex":"/\\\\+'[^']*'>/","parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"LINK_LABEL","definition":{"$type":"RegexToken","regex":"/;[^\\\\n\\\\r]+/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRATEGY","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"build"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"buy"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"outsource"},"parenthesized":false}],"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"market"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_WARDLEY","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"wardley-beta"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_SIZE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"size"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_EVOLUTION","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"evolution"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANCHOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"anchor"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_COMPONENT","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"component"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_LABEL","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"label"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_INERTIA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"inertia"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_EVOLVE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"evolve"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_PIPELINE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"pipeline"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_NOTE","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"note"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANNOTATIONS","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"annotations"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ANNOTATION","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"annotation"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_ACCELERATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"accelerator"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"KW_DEACCELERATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":"deaccelerator"},"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NAME_WITH_SPACES","definition":{"$type":"RegexToken","regex":"/(?!title\\\\s|accTitle|accDescr)[A-Za-z](?:[A-Za-z0-9_()&]|-(?!>))*(?:[ \\\\t]+[A-Za-z(](?:[A-Za-z0-9_()&]|-(?!>))*)*/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/","parenthesized":false},"fragment":false},{"$type":"ParserRule","name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"entry":false,"fragment":false,"parameters":[]},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}],"cardinality":"+"},"entry":false,"parameters":[]},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"},"parenthesized":false},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@47"},"parenthesized":false},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@48"},"parenthesized":false}],"parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/","parenthesized":false},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/","parenthesized":false},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/","parenthesized":false},"fragment":false}],"interfaces":[],"types":[]}`)), "WardleyGrammarGrammar"), Pw = {
  languageId: "architecture",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, kw = {
  languageId: "cynefin",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Iw = {
  languageId: "eventmodeling",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Nw = {
  languageId: "gitGraph",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Ow = {
  languageId: "info",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Mw = {
  languageId: "packet",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Lw = {
  languageId: "pie",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Dw = {
  languageId: "radar",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, xw = {
  languageId: "railroadAbnf",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Gw = {
  languageId: "railroadEbnf",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Fw = {
  languageId: "railroad",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, jw = {
  languageId: "railroadPeg",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, zw = {
  languageId: "treemap",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Uw = {
  languageId: "treeView",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, Bw = {
  languageId: "wardley",
  fileExtensions: [".mmd", ".mermaid"],
  caseInsensitive: !1,
  mode: "production"
}, ze = {
  AstReflection: /* @__PURE__ */ i(() => new G$(), "AstReflection")
}, Vw = {
  Grammar: /* @__PURE__ */ i(() => mw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Pw, "LanguageMetaData"),
  parser: {}
}, Kw = {
  Grammar: /* @__PURE__ */ i(() => hw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => kw, "LanguageMetaData"),
  parser: {}
}, Ww = {
  Grammar: /* @__PURE__ */ i(() => yw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Iw, "LanguageMetaData"),
  parser: {}
}, qw = {
  Grammar: /* @__PURE__ */ i(() => gw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Nw, "LanguageMetaData"),
  parser: {}
}, Hw = {
  Grammar: /* @__PURE__ */ i(() => vw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Ow, "LanguageMetaData"),
  parser: {}
}, Yw = {
  Grammar: /* @__PURE__ */ i(() => Tw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Mw, "LanguageMetaData"),
  parser: {}
}, Xw = {
  Grammar: /* @__PURE__ */ i(() => $w(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Lw, "LanguageMetaData"),
  parser: {}
}, Jw = {
  Grammar: /* @__PURE__ */ i(() => Rw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Dw, "LanguageMetaData"),
  parser: {}
}, Zw = {
  Grammar: /* @__PURE__ */ i(() => Aw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => xw, "LanguageMetaData"),
  parser: {}
}, Qw = {
  Grammar: /* @__PURE__ */ i(() => Ew(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Gw, "LanguageMetaData"),
  parser: {}
}, eP = {
  Grammar: /* @__PURE__ */ i(() => Cw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Fw, "LanguageMetaData"),
  parser: {}
}, tP = {
  Grammar: /* @__PURE__ */ i(() => bw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => jw, "LanguageMetaData"),
  parser: {}
}, rP = {
  Grammar: /* @__PURE__ */ i(() => _w(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => zw, "LanguageMetaData"),
  parser: {}
}, nP = {
  Grammar: /* @__PURE__ */ i(() => Sw(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Uw, "LanguageMetaData"),
  parser: {}
}, aP = {
  Grammar: /* @__PURE__ */ i(() => ww(), "Grammar"),
  LanguageMetaData: /* @__PURE__ */ i(() => Bw, "LanguageMetaData"),
  parser: {}
}, iP = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/, sP = /accTitle[\t ]*:([^\n\r]*)/, oP = /title([\t ][^\n\r]*|)/, lP = {
  ACC_DESCR: iP,
  ACC_TITLE: sP,
  TITLE: oP
}, wt = class extends m$ {
  static {
    i(this, "AbstractMermaidValueConverter");
  }
  runConverter(e, t, r) {
    let n = this.runCommonConverter(e, t, r);
    return n === void 0 && (n = this.runCustomConverter(e, t, r)), n === void 0 ? super.runConverter(e, t, r) : n;
  }
  runCommonConverter(e, t, r) {
    const n = lP[e.name];
    if (n === void 0)
      return;
    const a = n.exec(t);
    if (a !== null) {
      if (a[1] !== void 0)
        return a[1].trim().replace(/[\t ]{2,}/gm, " ");
      if (a[2] !== void 0)
        return a[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, `
`);
    }
  }
}, Qn = class extends wt {
  static {
    i(this, "CommonValueConverter");
  }
  runCustomConverter(e, t, r) {
  }
}, Ue = class extends d$ {
  static {
    i(this, "AbstractMermaidTokenBuilder");
  }
  constructor(e) {
    super(), this.keywords = new Set(e);
  }
  buildKeywordTokens(e, t, r) {
    const n = super.buildKeywordTokens(e, t, r);
    return n.forEach((a) => {
      this.keywords.has(a.name) && a.PATTERN !== void 0 && (a.PATTERN = new RegExp(a.PATTERN.toString() + "(?:(?=%%)|(?!\\S))"));
    }), n;
  }
};
(class extends Ue {
  static {
    i(this, "CommonTokenBuilder");
  }
});
var uP = class extends Ue {
  static {
    i(this, "RadarTokenBuilder");
  }
  constructor() {
    super(["radar-beta"]);
  }
}, F$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new uP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  }
};
function j$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Jw,
    F$
  );
  return t.ServiceRegistry.register(r), { shared: t, Radar: r };
}
i(j$, "createRadarServices");
var cP = class extends Ue {
  static {
    i(this, "RailroadTokenBuilder");
  }
  constructor() {
    super(["railroad-beta"]);
  }
}, Pd = /* @__PURE__ */ i((e) => {
  const t = e.slice(1, -1);
  let r = "";
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    if (a === "\\" && n + 1 < t.length) {
      n++;
      const s = t[n];
      switch (s) {
        case "n":
          r += `
`;
          break;
        case "r":
          r += "\r";
          break;
        case "t":
          r += "	";
          break;
        default:
          r += s;
      }
      continue;
    }
    r += a;
  }
  return r;
}, "decodeEscapedString"), fP = class extends wt {
  static {
    i(this, "RailroadValueConverter");
  }
  runConverter(e, t, r) {
    const n = super.runConverter(e, t, r);
    if (e.name === "TITLE" && typeof n == "string") {
      const a = n.trim();
      if (a.startsWith('"') && a.endsWith('"') || a.startsWith("'") && a.endsWith("'"))
        return Pd(a);
    }
    return n;
  }
  runCustomConverter(e, t, r) {
    if (e.name === "RR_STRING")
      return Pd(t);
  }
}, z$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new cP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new fP(), "ValueConverter")
  }
};
function U$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    eP,
    z$
  );
  return t.ServiceRegistry.register(r), { shared: t, Railroad: r };
}
i(U$, "createRailroadServices");
var pP = class extends Ue {
  static {
    i(this, "RailroadEbnfTokenBuilder");
  }
  constructor() {
    super(["railroad-ebnf-beta"]);
  }
}, kd = /* @__PURE__ */ i((e) => {
  const t = e.slice(1, -1);
  let r = "";
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    if (a === "\\" && n + 1 < t.length) {
      n++;
      const s = t[n];
      switch (s) {
        case "n":
          r += `
`;
          break;
        case "r":
          r += "\r";
          break;
        case "t":
          r += "	";
          break;
        default:
          r += s;
      }
      continue;
    }
    r += a;
  }
  return r;
}, "decodeEscapedString"), dP = class extends wt {
  static {
    i(this, "RailroadEbnfValueConverter");
  }
  runConverter(e, t, r) {
    const n = super.runConverter(e, t, r);
    if (e.name === "TITLE" && typeof n == "string") {
      const a = n.trim();
      if (a.startsWith('"') && a.endsWith('"') || a.startsWith("'") && a.endsWith("'"))
        return kd(a);
    }
    return n;
  }
  runCustomConverter(e, t, r) {
    if (e.name === "EBNF_STRING")
      return kd(t);
    if (e.name === "EBNF_SPECIAL_SEQUENCE")
      return t.slice(1, -1).trim();
  }
}, B$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new pP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new dP(), "ValueConverter")
  }
};
function V$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Qw,
    B$
  );
  return t.ServiceRegistry.register(r), { shared: t, RailroadEbnf: r };
}
i(V$, "createRailroadEbnfServices");
var mP = class extends Ue {
  static {
    i(this, "RailroadAbnfTokenBuilder");
  }
  constructor() {
    super(["railroad-abnf-beta"]);
  }
}, hP = class extends wt {
  static {
    i(this, "RailroadAbnfValueConverter");
  }
  runConverter(e, t, r) {
    const n = super.runConverter(e, t, r);
    if (e.name === "TITLE" && typeof n == "string") {
      const a = n.trim();
      if (a.startsWith('"') && a.endsWith('"') || a.startsWith("'") && a.endsWith("'"))
        return a.slice(1, -1);
    }
    return n;
  }
  runCustomConverter(e, t, r) {
    if (e.name === "ABNF_STRING")
      return t.slice(1, -1);
  }
}, K$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new mP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new hP(), "ValueConverter")
  }
};
function W$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Zw,
    K$
  );
  return t.ServiceRegistry.register(r), { shared: t, RailroadAbnf: r };
}
i(W$, "createRailroadAbnfServices");
var yP = class extends Ue {
  static {
    i(this, "RailroadPegTokenBuilder");
  }
  constructor() {
    super(["railroad-peg-beta"]);
  }
}, Id = /* @__PURE__ */ i((e) => {
  const t = e.slice(1, -1);
  let r = "";
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    if (a === "\\" && n + 1 < t.length) {
      n++;
      const s = t[n];
      switch (s) {
        case "n":
          r += `
`;
          break;
        case "r":
          r += "\r";
          break;
        case "t":
          r += "	";
          break;
        default:
          r += s;
      }
      continue;
    }
    r += a;
  }
  return r;
}, "decodeEscapedString"), gP = class extends wt {
  static {
    i(this, "RailroadPegValueConverter");
  }
  runConverter(e, t, r) {
    const n = super.runConverter(e, t, r);
    if (e.name === "TITLE" && typeof n == "string") {
      const a = n.trim();
      if (a.startsWith('"') && a.endsWith('"') || a.startsWith("'") && a.endsWith("'"))
        return Id(a);
    }
    return n;
  }
  runCustomConverter(e, t, r) {
    if (e.name === "PEG_STRING")
      return Id(t);
  }
}, q$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new yP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new gP(), "ValueConverter")
  }
};
function H$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    tP,
    q$
  );
  return t.ServiceRegistry.register(r), { shared: t, RailroadPeg: r };
}
i(H$, "createRailroadPegServices");
var vP = class extends Ue {
  static {
    i(this, "TreemapTokenBuilder");
  }
  constructor() {
    super(["treemap"]);
  }
}, TP = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/, $P = class extends wt {
  static {
    i(this, "TreemapValueConverter");
  }
  runCustomConverter(e, t, r) {
    if (e.name === "NUMBER2")
      return parseFloat(t.replace(/,/g, ""));
    if (e.name === "SEPARATOR")
      return t.substring(1, t.length - 1);
    if (e.name === "STRING2")
      return t.substring(1, t.length - 1);
    if (e.name === "INDENTATION")
      return t.length;
    if (e.name === "ClassDef") {
      if (typeof t != "string")
        return t;
      const n = TP.exec(t);
      if (n)
        return {
          $type: "ClassDefStatement",
          className: n[1],
          styleText: n[2] || void 0
        };
    }
  }
};
function Y$(e) {
  const t = e.validation.TreemapValidator, r = e.validation.ValidationRegistry;
  if (r) {
    const n = {
      Treemap: t.checkSingleRoot.bind(t)
      // Remove unused validation for TreemapRow
    };
    r.register(n, t);
  }
}
i(Y$, "registerValidationChecks");
var RP = class {
  static {
    i(this, "TreemapValidator");
  }
  /**
   * Validates that a treemap has only one root node.
   * A root node is defined as a node that has no indentation.
   */
  checkSingleRoot(e, t) {
    let r;
    for (const n of e.TreemapRows)
      n.item && (r === void 0 && // Check if this is a root node (no indentation)
      n.indent === void 0 ? r = 0 : n.indent === void 0 ? t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: n,
        property: "item"
      }) : r !== void 0 && r >= parseInt(n.indent, 10) && t("error", "Multiple root nodes are not allowed in a treemap.", {
        node: n,
        property: "item"
      }));
  }
}, X$ = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new vP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new $P(), "ValueConverter")
  },
  validation: {
    TreemapValidator: /* @__PURE__ */ i(() => new RP(), "TreemapValidator")
  }
};
function J$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    rP,
    X$
  );
  return t.ServiceRegistry.register(r), Y$(r), { shared: t, Treemap: r };
}
i(J$, "createTreemapServices");
var AP = class extends wt {
  static {
    i(this, "WardleyValueConverter");
  }
  runCustomConverter(e, t, r) {
    if (e.name.toUpperCase() === "LINK_LABEL")
      return t.substring(1).trim();
  }
}, Z$ = {
  parser: {
    ValueConverter: /* @__PURE__ */ i(() => new AP(), "ValueConverter")
  }
};
function Q$(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    aP,
    Z$
  );
  return t.ServiceRegistry.register(r), { shared: t, Wardley: r };
}
i(Q$, "createWardleyServices");
var EP = class extends Ue {
  static {
    i(this, "CynefinTokenBuilder");
  }
  constructor() {
    super(["cynefin-beta"]);
  }
}, eR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new EP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  }
};
function tR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Kw,
    eR
  );
  return t.ServiceRegistry.register(r), { shared: t, Cynefin: r };
}
i(tR, "createCynefinServices");
var CP = class extends Ue {
  static {
    i(this, "GitGraphTokenBuilder");
  }
  constructor() {
    super(["gitGraph"]);
  }
}, rR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new CP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  }
};
function nR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    qw,
    rR
  );
  return t.ServiceRegistry.register(r), { shared: t, GitGraph: r };
}
i(nR, "createGitGraphServices");
var bP = class extends Ue {
  static {
    i(this, "InfoTokenBuilder");
  }
  constructor() {
    super(["info", "showInfo"]);
  }
}, aR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new bP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  }
};
function iR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Hw,
    aR
  );
  return t.ServiceRegistry.register(r), { shared: t, Info: r };
}
i(iR, "createInfoServices");
var _P = class extends Ue {
  static {
    i(this, "PacketTokenBuilder");
  }
  constructor() {
    super(["packet"]);
  }
}, sR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new _P(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  }
};
function oR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Yw,
    sR
  );
  return t.ServiceRegistry.register(r), { shared: t, Packet: r };
}
i(oR, "createPacketServices");
var SP = class extends Ue {
  static {
    i(this, "PieTokenBuilder");
  }
  constructor() {
    super(["pie", "showData"]);
  }
}, wP = class extends wt {
  static {
    i(this, "PieValueConverter");
  }
  runCustomConverter(e, t, r) {
    if (e.name === "PIE_SECTION_LABEL")
      return t.replace(/"/g, "").trim();
  }
}, lR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new SP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new wP(), "ValueConverter")
  }
};
function uR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Xw,
    lR
  );
  return t.ServiceRegistry.register(r), { shared: t, Pie: r };
}
i(uR, "createPieServices");
var PP = class extends wt {
  static {
    i(this, "TreeViewValueConverter");
  }
  runCustomConverter(e, t, r) {
    if (e.name === "INDENTATION")
      return t?.length || 0;
    if (e.name === "QUOTED_NAME")
      return t.substring(1, t.length - 1);
    if (e.name === "BARE_NAME")
      return t.replace(/[\t ]+$/, "");
    if (e.name === "CLASS_ANNOTATION")
      return t.trim().substring(3).trim();
    if (e.name === "ICON_ANNOTATION") {
      const n = t.trim();
      return n.substring(5, n.length - 1);
    }
    if (e.name === "DESC_ANNOTATION")
      return t.trim().substring(2).trim();
  }
}, kP = class extends Ue {
  static {
    i(this, "TreeViewTokenBuilder");
  }
  constructor() {
    super(["treeView-beta"]);
  }
}, cR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new kP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new PP(), "ValueConverter")
  }
};
function fR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    nP,
    cR
  );
  return t.ServiceRegistry.register(r), { shared: t, TreeView: r };
}
i(fR, "createTreeViewServices");
var IP = class extends Ue {
  static {
    i(this, "ArchitectureTokenBuilder");
  }
  constructor() {
    super(["architecture"]);
  }
}, NP = class extends wt {
  static {
    i(this, "ArchitectureValueConverter");
  }
  runCustomConverter(e, t, r) {
    if (e.name === "ARCH_ICON")
      return t.replace(/[()]/g, "").trim();
    if (e.name === "ARCH_TEXT_ICON")
      return t.replace(/["()]/g, "");
    if (e.name === "ARCH_TITLE") {
      let n = t.replace(/^\[|]$/g, "").trim();
      return (n.startsWith('"') && n.endsWith('"') || n.startsWith("'") && n.endsWith("'")) && (n = n.slice(1, -1), n = n.replace(/\\"/g, '"').replace(/\\'/g, "'")), n.trim();
    }
  }
}, pR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new IP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new NP(), "ValueConverter")
  }
};
function dR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Vw,
    pR
  );
  return t.ServiceRegistry.register(r), { shared: t, Architecture: r };
}
i(dR, "createArchitectureServices");
var OP = class extends Ue {
  static {
    i(this, "EventModelingTokenBuilder");
  }
  constructor() {
    super(["eventmodeling"]);
  }
}, Nd = /* @__PURE__ */ new Set(["cmd", "command"]), Od = /* @__PURE__ */ new Set(["evt", "event"]), tl = /* @__PURE__ */ new Set(["rmo", "readmodel"]), Md = /* @__PURE__ */ new Set(["pcr", "processor"]), Ld = /* @__PURE__ */ new Set(["ui"]);
function mR(e) {
  const t = e.validation.EventModelingValidator, r = e.validation.ValidationRegistry;
  if (r) {
    const n = {
      EmTimeFrame: t.checkSourceFrameTypes.bind(t),
      EmResetFrame: t.checkSourceFrameTypes.bind(t)
    };
    r.register(n, t);
  }
}
i(mR, "registerValidationChecks");
var MP = class {
  static {
    i(this, "EventModelingValidator");
  }
  checkSourceFrameTypes(e, t) {
    e.sourceFrames.length !== 0 && (Nd.has(e.modelEntityType) ? this.validateSources(
      e,
      /* @__PURE__ */ new Set([...Ld, ...Md]),
      "command",
      "ui or processor",
      t
    ) : Od.has(e.modelEntityType) ? this.validateSources(e, Nd, "event", "command", t) : tl.has(e.modelEntityType) ? this.validateSources(e, Od, "read model", "event", t) : Md.has(e.modelEntityType) ? this.validateSources(e, tl, "processor", "read model", t) : Ld.has(e.modelEntityType) && this.validateSources(e, tl, "ui", "read model", t));
  }
  validateSources(e, t, r, n, a) {
    for (const s of e.sourceFrames) {
      const o = s.ref;
      o !== void 0 && !t.has(o.modelEntityType) && a(
        "error",
        `A ${r} can only receive input from a ${n}, not from '${o.modelEntityType}'.`,
        { node: e, property: "sourceFrames" }
      );
    }
  }
}, hR = {
  parser: {
    TokenBuilder: /* @__PURE__ */ i(() => new OP(), "TokenBuilder"),
    ValueConverter: /* @__PURE__ */ i(() => new Qn(), "ValueConverter")
  },
  validation: {
    EventModelingValidator: /* @__PURE__ */ i(() => new MP(), "EventModelingValidator")
  }
};
function yR(e = De) {
  const t = ee(
    Oe(e),
    ze
  ), r = ee(
    Ne({ shared: t }),
    Ww,
    hR
  );
  return t.ServiceRegistry.register(r), mR(r), { shared: t, EventModel: r };
}
i(yR, "createEventModelingServices");
var ke = {}, LP = {
  info: /* @__PURE__ */ i(async () => {
    const { createInfoServices: e } = await Promise.resolve().then(() => GP), t = e().Info.parser.LangiumParser;
    ke.info = t;
  }, "info"),
  packet: /* @__PURE__ */ i(async () => {
    const { createPacketServices: e } = await Promise.resolve().then(() => FP), t = e().Packet.parser.LangiumParser;
    ke.packet = t;
  }, "packet"),
  pie: /* @__PURE__ */ i(async () => {
    const { createPieServices: e } = await Promise.resolve().then(() => jP), t = e().Pie.parser.LangiumParser;
    ke.pie = t;
  }, "pie"),
  treeView: /* @__PURE__ */ i(async () => {
    const { createTreeViewServices: e } = await Promise.resolve().then(() => zP), t = e().TreeView.parser.LangiumParser;
    ke.treeView = t;
  }, "treeView"),
  architecture: /* @__PURE__ */ i(async () => {
    const { createArchitectureServices: e } = await Promise.resolve().then(() => UP), t = e().Architecture.parser.LangiumParser;
    ke.architecture = t;
  }, "architecture"),
  gitGraph: /* @__PURE__ */ i(async () => {
    const { createGitGraphServices: e } = await Promise.resolve().then(() => BP), t = e().GitGraph.parser.LangiumParser;
    ke.gitGraph = t;
  }, "gitGraph"),
  eventmodeling: /* @__PURE__ */ i(async () => {
    const { createEventModelingServices: e } = await Promise.resolve().then(() => VP), t = e().EventModel.parser.LangiumParser;
    ke.eventmodeling = t;
  }, "eventmodeling"),
  radar: /* @__PURE__ */ i(async () => {
    const { createRadarServices: e } = await Promise.resolve().then(() => KP), t = e().Radar.parser.LangiumParser;
    ke.radar = t;
  }, "radar"),
  railroad: /* @__PURE__ */ i(async () => {
    const { createRailroadServices: e } = await Promise.resolve().then(() => WP), t = e().Railroad.parser.LangiumParser;
    ke.railroad = t;
  }, "railroad"),
  railroadEbnf: /* @__PURE__ */ i(async () => {
    const { createRailroadEbnfServices: e } = await Promise.resolve().then(() => qP), t = e().RailroadEbnf.parser.LangiumParser;
    ke.railroadEbnf = t;
  }, "railroadEbnf"),
  railroadAbnf: /* @__PURE__ */ i(async () => {
    const { createRailroadAbnfServices: e } = await Promise.resolve().then(() => HP), t = e().RailroadAbnf.parser.LangiumParser;
    ke.railroadAbnf = t;
  }, "railroadAbnf"),
  railroadPeg: /* @__PURE__ */ i(async () => {
    const { createRailroadPegServices: e } = await Promise.resolve().then(() => YP), t = e().RailroadPeg.parser.LangiumParser;
    ke.railroadPeg = t;
  }, "railroadPeg"),
  treemap: /* @__PURE__ */ i(async () => {
    const { createTreemapServices: e } = await Promise.resolve().then(() => XP), t = e().Treemap.parser.LangiumParser;
    ke.treemap = t;
  }, "treemap"),
  wardley: /* @__PURE__ */ i(async () => {
    const { createWardleyServices: e } = await Promise.resolve().then(() => JP), t = e().Wardley.parser.LangiumParser;
    ke.wardley = t;
  }, "wardley"),
  cynefin: /* @__PURE__ */ i(async () => {
    const { createCynefinServices: e } = await Promise.resolve().then(() => ZP), t = e().Cynefin.parser.LangiumParser;
    ke.cynefin = t;
  }, "cynefin")
};
async function DP(e, t) {
  const r = LP[e];
  if (!r)
    throw new Error(`Unknown diagram type: ${e}`);
  ke[e] || await r();
  const a = ke[e].parse(t);
  if (a.lexerErrors.length > 0 || a.parserErrors.length > 0)
    throw new xP(a);
  return a.value;
}
i(DP, "parse");
var qi = /* @__PURE__ */ i((e) => e !== void 0 && e >= 0 ? e : "?", "formatLocation"), xP = class extends Error {
  constructor(e) {
    const t = e.lexerErrors.map((n) => {
      const a = qi(n.line), s = qi(n.column);
      return `Lexer error on line ${a}, column ${s}: ${n.message}`;
    }).join(`
`), r = e.parserErrors.map((n) => {
      const a = qi(n.token.startLine), s = qi(n.token.startColumn);
      return `Parse error on line ${a}, column ${s}: ${n.message}`;
    }).join(`
`);
    super(`Parsing failed: ${t} ${r}`), this.result = e;
  }
  static {
    i(this, "MermaidParseError");
  }
};
const GP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InfoModule: aR,
  createInfoServices: iR
}, Symbol.toStringTag, { value: "Module" })), FP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PacketModule: sR,
  createPacketServices: oR
}, Symbol.toStringTag, { value: "Module" })), jP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PieModule: lR,
  createPieServices: uR
}, Symbol.toStringTag, { value: "Module" })), zP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TreeViewModule: cR,
  createTreeViewServices: fR
}, Symbol.toStringTag, { value: "Module" })), UP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArchitectureModule: pR,
  createArchitectureServices: dR
}, Symbol.toStringTag, { value: "Module" })), BP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GitGraphModule: rR,
  createGitGraphServices: nR
}, Symbol.toStringTag, { value: "Module" })), VP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventModelingModule: hR,
  createEventModelingServices: yR
}, Symbol.toStringTag, { value: "Module" })), KP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RadarModule: F$,
  createRadarServices: j$
}, Symbol.toStringTag, { value: "Module" })), WP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadModule: z$,
  createRailroadServices: U$
}, Symbol.toStringTag, { value: "Module" })), qP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadEbnfModule: B$,
  createRailroadEbnfServices: V$
}, Symbol.toStringTag, { value: "Module" })), HP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadAbnfModule: K$,
  createRailroadAbnfServices: W$
}, Symbol.toStringTag, { value: "Module" })), YP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadPegModule: q$,
  createRailroadPegServices: H$
}, Symbol.toStringTag, { value: "Module" })), XP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TreemapModule: X$,
  createTreemapServices: J$
}, Symbol.toStringTag, { value: "Module" })), JP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WardleyModule: Z$,
  createWardleyServices: Q$
}, Symbol.toStringTag, { value: "Module" })), ZP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CynefinModule: eR,
  createCynefinServices: tR
}, Symbol.toStringTag, { value: "Module" }));
export {
  xP as M,
  V$ as a,
  H$ as b,
  W$ as c,
  U$ as d,
  QS as i,
  DP as p
};
