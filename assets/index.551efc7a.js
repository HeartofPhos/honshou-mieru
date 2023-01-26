var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const p$3 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$3();
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t$1 = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (a === null || typeof a !== "object")
    return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return typeof a === "function" ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if (typeof a !== "object" && typeof a !== "function" && a != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (b != null)
    for (d in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k2 = "" + b.key), b)
      J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (g === 1)
    c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      c[d] === void 0 && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return typeof a === "object" && a !== null && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if (k2 === "undefined" || k2 === "boolean")
    a = null;
  var h = false;
  if (a === null)
    h = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = d === "" ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", a != null && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
      return a2;
    })) : c != null && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = d === "" ? "." : d + ":";
  if (I$1(a))
    for (var g = 0; g < a.length; g++) {
      k2 = a[g];
      var f2 = d + Q$1(k2, g);
      h += R$1(k2, b, e, f2, c);
    }
  else if (f2 = A$1(a), typeof f2 === "function")
    for (a = f2.call(a), g = 0; !(k2 = a.next()).done; )
      k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if (k2 === "object")
    throw b = String(a), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (a == null)
    return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (a._status === -1) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 2, a._result = b2;
    });
    a._status === -1 && (a._status = 0, a._result = b);
  }
  if (a._status === 1)
    return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.cloneElement = function(a, b, e) {
  if (a === null || a === void 0)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (b != null) {
    b.ref !== void 0 && (k2 = b.ref, h = K$1.current);
    b.key !== void 0 && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f2 in b)
      J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = b[f2] === void 0 && g !== void 0 ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (f2 === 1)
    d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t$1, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: b === void 0 ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.1.0";
{
  react.exports = react_production_min;
}
var React$1 = react.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function h(a) {
    return a.length === 0 ? null : a[0];
  }
  function k2(a) {
    if (a.length === 0)
      return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a:
        for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g(C2, c))
            n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
          else if (n2 < e && 0 > g(x2, c))
            a[d] = x2, a[n2] = c, d = n2;
          else
            break a;
        }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return c !== 0 ? c : a.id - b.id;
  }
  if (typeof performance === "object" && typeof performance.now === "function") {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = typeof setTimeout === "function" ? setTimeout : null, E2 = typeof clearTimeout === "function" ? clearTimeout : null, F2 = typeof setImmediate !== "undefined" ? setImmediate : null;
  typeof navigator !== "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); b !== null; ) {
      if (b.callback === null)
        k2(t2);
      else if (b.startTime <= a)
        k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else
        break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2)
      if (h(r2) !== null)
        A2 = true, I2(J2);
      else {
        var b = h(t2);
        b !== null && K2(H2, b.startTime - a);
      }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); v2 !== null && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if (typeof d === "function") {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          typeof e === "function" ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else
          k2(r2);
        v2 = h(r2);
      }
      if (v2 !== null)
        var w2 = true;
      else {
        var m2 = h(t2);
        m2 !== null && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (O2 !== null) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if (typeof F2 === "function")
    S2 = function() {
      F2(R2);
    };
  else if (typeof MessageChannel !== "undefined") {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    typeof c === "object" && c !== null ? (c = c.delay, c = typeof c === "number" && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), h(r2) === null && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = react.exports, ba = scheduler.exports;
function p$1(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++)
    da.add(b[a]);
}
var ia = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined"), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function na(a) {
  if (ja.call(ma, a))
    return true;
  if (ja.call(la, a))
    return false;
  if (ka.test(a))
    return ma[a] = true;
  la[a] = true;
  return false;
}
function oa(a, b, c, d) {
  if (c !== null && c.type === 0)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (c !== null)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return a !== "data-" && a !== "aria-";
    default:
      return false;
  }
}
function pa(a, b, c, d) {
  if (b === null || typeof b === "undefined" || oa(a, b, c, d))
    return true;
  if (d)
    return false;
  if (c !== null)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return b === false;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function t(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = b === 2 || b === 3 || b === 4;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new t(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new t(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new t(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new t(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new t(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new t(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new t(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new t(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new t(a, 5, false, a.toLowerCase(), null, false, false);
});
var qa = /[\-:]([a-z])/g;
function ra(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(qa, ra);
  z[b] = new t(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(qa, ra);
  z[b] = new t(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(qa, ra);
  z[b] = new t(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new t(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new t("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new t(a, 1, false, a.toLowerCase(), null, true, true);
});
function sa(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (e !== null ? e.type !== 0 : d || !(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N")
    pa(b, c, e, d) && (c = null), d || e === null ? na(b) && (c === null ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = c === null ? e.type === 3 ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, c === null ? a.removeAttribute(b) : (e = e.type, c = e === 3 || e === 4 && c === true ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ta = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ua = Symbol.for("react.element"), va = Symbol.for("react.portal"), wa = Symbol.for("react.fragment"), xa = Symbol.for("react.strict_mode"), za = Symbol.for("react.profiler"), Aa = Symbol.for("react.provider"), Ba = Symbol.for("react.context"), Ca = Symbol.for("react.forward_ref"), Da = Symbol.for("react.suspense"), Ea = Symbol.for("react.suspense_list"), Fa = Symbol.for("react.memo"), Ga = Symbol.for("react.lazy");
var Ha = Symbol.for("react.offscreen");
var Ia = Symbol.iterator;
function Ja(a) {
  if (a === null || typeof a !== "object")
    return null;
  a = Ia && a[Ia] || a["@@iterator"];
  return typeof a === "function" ? a : null;
}
var A = Object.assign, Ka;
function La(a) {
  if (Ka === void 0)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      Ka = b && b[1] || "";
    }
  return "\n" + Ka + a;
}
var Ma = false;
function Na(a, b) {
  if (!a || Ma)
    return "";
  Ma = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect === "object" && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && typeof l2.stack === "string") {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; )
        h--;
      for (; 1 <= g && 0 <= h; g--, h--)
        if (e[g] !== f2[h]) {
          if (g !== 1 || h !== 1) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k2 = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Ma = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? La(a) : "";
}
function Oa(a) {
  switch (a.tag) {
    case 5:
      return La(a.type);
    case 16:
      return La("Lazy");
    case 13:
      return La("Suspense");
    case 19:
      return La("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Na(a.type, false), a;
    case 11:
      return a = Na(a.type.render, false), a;
    case 1:
      return a = Na(a.type, true), a;
    default:
      return "";
  }
}
function Pa(a) {
  if (a == null)
    return null;
  if (typeof a === "function")
    return a.displayName || a.name || null;
  if (typeof a === "string")
    return a;
  switch (a) {
    case wa:
      return "Fragment";
    case va:
      return "Portal";
    case za:
      return "Profiler";
    case xa:
      return "StrictMode";
    case Da:
      return "Suspense";
    case Ea:
      return "SuspenseList";
  }
  if (typeof a === "object")
    switch (a.$$typeof) {
      case Ba:
        return (a.displayName || "Context") + ".Consumer";
      case Aa:
        return (a._context.displayName || "Context") + ".Provider";
      case Ca:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Fa:
        return b = a.displayName || null, b !== null ? b : Pa(a.type) || "Memo";
      case Ga:
        b = a._payload;
        a = a._init;
        try {
          return Pa(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Qa(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || (a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Pa(b);
    case 8:
      return b === xa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof b === "function")
        return b.displayName || b.name || null;
      if (typeof b === "string")
        return b;
  }
  return null;
}
function Ra(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Sa(a) {
  var b = a.type;
  return (a = a.nodeName) && a.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
}
function Ta(a) {
  var b = Sa(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && typeof c !== "undefined" && typeof c.get === "function" && typeof c.set === "function") {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Ua(a) {
  a._valueTracker || (a._valueTracker = Ta(a));
}
function Va(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Sa(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Wa(a) {
  a = a || (typeof document !== "undefined" ? document : void 0);
  if (typeof a === "undefined")
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Xa(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c != null ? c : a._wrapperState.initialChecked });
}
function Ya(a, b) {
  var c = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
  c = Ra(b.value != null ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null };
}
function Za(a, b) {
  b = b.checked;
  b != null && sa(a, "checked", b, false);
}
function $a(a, b) {
  Za(a, b);
  var c = Ra(b.value), d = b.type;
  if (c != null)
    if (d === "number") {
      if (c === 0 && a.value === "" || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if (d === "submit" || d === "reset") {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Ra(b.defaultValue));
  b.checked == null && b.defaultChecked != null && (a.defaultChecked = !!b.defaultChecked);
}
function cb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  c !== "" && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  c !== "" && (a.name = c);
}
function bb(a, b, c) {
  if (b !== "number" || Wa(a.ownerDocument) !== a)
    c == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var db = Array.isArray;
function eb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Ra(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      b !== null || a[e].disabled || (b = a[e]);
    }
    b !== null && (b.selected = true);
  }
}
function fb(a, b) {
  if (b.dangerouslySetInnerHTML != null)
    throw Error(p$1(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function gb(a, b) {
  var c = b.value;
  if (c == null) {
    c = b.children;
    b = b.defaultValue;
    if (c != null) {
      if (b != null)
        throw Error(p$1(92));
      if (db(c)) {
        if (1 < c.length)
          throw Error(p$1(93));
        c = c[0];
      }
      b = c;
    }
    b == null && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Ra(c) };
}
function hb(a, b) {
  var c = Ra(b.value), d = Ra(b.defaultValue);
  c != null && (c = "" + c, c !== a.value && (a.value = c), b.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c));
  d != null && (a.defaultValue = "" + d);
}
function ib(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && b !== "" && b !== null && (a.value = b);
}
function jb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function kb(a, b) {
  return a == null || a === "http://www.w3.org/1999/xhtml" ? jb(b) : a === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
}
var lb, mb = function(a) {
  return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if (a.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in a)
    a.innerHTML = b;
  else {
    lb = lb || document.createElement("div");
    lb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = lb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function nb(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && c.nodeType === 3) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var ob = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, pb = ["Webkit", "ms", "Moz", "O"];
Object.keys(ob).forEach(function(a) {
  pb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    ob[b] = ob[a];
  });
});
function qb(a, b, c) {
  return b == null || typeof b === "boolean" || b === "" ? "" : c || typeof b !== "number" || b === 0 || ob.hasOwnProperty(a) && ob[a] ? ("" + b).trim() : b + "px";
}
function rb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = c.indexOf("--") === 0, e = qb(c, b[c], d);
      c === "float" && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var sb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function tb(a, b) {
  if (b) {
    if (sb[a] && (b.children != null || b.dangerouslySetInnerHTML != null))
      throw Error(p$1(137, a));
    if (b.dangerouslySetInnerHTML != null) {
      if (b.children != null)
        throw Error(p$1(60));
      if (typeof b.dangerouslySetInnerHTML !== "object" || !("__html" in b.dangerouslySetInnerHTML))
        throw Error(p$1(61));
    }
    if (b.style != null && typeof b.style !== "object")
      throw Error(p$1(62));
  }
}
function ub(a, b) {
  if (a.indexOf("-") === -1)
    return typeof b.is === "string";
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var vb = null;
function wb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return a.nodeType === 3 ? a.parentNode : a;
}
var xb = null, yb = null, zb = null;
function Ab(a) {
  if (a = Bb(a)) {
    if (typeof xb !== "function")
      throw Error(p$1(280));
    var b = a.stateNode;
    b && (b = Cb(b), xb(a.stateNode, a.type, b));
  }
}
function Db(a) {
  yb ? zb ? zb.push(a) : zb = [a] : yb = a;
}
function Eb() {
  if (yb) {
    var a = yb, b = zb;
    zb = yb = null;
    Ab(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Ab(b[a]);
  }
}
function Fb(a, b) {
  return a(b);
}
function Gb() {
}
var Hb = false;
function Ib(a, b, c) {
  if (Hb)
    return a(b, c);
  Hb = true;
  try {
    return Fb(a, b, c);
  } finally {
    if (Hb = false, yb !== null || zb !== null)
      Gb(), Eb();
  }
}
function Jb(a, b) {
  var c = a.stateNode;
  if (c === null)
    return null;
  var d = Cb(c);
  if (d === null)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !(a === "button" || a === "input" || a === "select" || a === "textarea"));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && typeof c !== "function")
    throw Error(p$1(231, b, typeof c));
  return c;
}
var Kb = false;
if (ia)
  try {
    var Lb = {};
    Object.defineProperty(Lb, "passive", { get: function() {
      Kb = true;
    } });
    window.addEventListener("test", Lb, Lb);
    window.removeEventListener("test", Lb, Lb);
  } catch (a) {
    Kb = false;
  }
function Mb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (n2) {
    this.onError(n2);
  }
}
var Nb = false, Ob = null, Pb = false, Qb = null, Rb = { onError: function(a) {
  Nb = true;
  Ob = a;
} };
function Sb(a, b, c, d, e, f2, g, h, k2) {
  Nb = false;
  Ob = null;
  Mb.apply(Rb, arguments);
}
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Sb.apply(this, arguments);
  if (Nb) {
    if (Nb) {
      var l2 = Ob;
      Nb = false;
      Ob = null;
    } else
      throw Error(p$1(198));
    Pb || (Pb = true, Qb = l2);
  }
}
function Ub(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, (b.flags & 4098) !== 0 && (c = b.return), a = b.return;
    while (a);
  }
  return b.tag === 3 ? c : null;
}
function Vb(a) {
  if (a.tag === 13) {
    var b = a.memoizedState;
    b === null && (a = a.alternate, a !== null && (b = a.memoizedState));
    if (b !== null)
      return b.dehydrated;
  }
  return null;
}
function Wb(a) {
  if (Ub(a) !== a)
    throw Error(p$1(188));
}
function Xb(a) {
  var b = a.alternate;
  if (!b) {
    b = Ub(a);
    if (b === null)
      throw Error(p$1(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (e === null)
      break;
    var f2 = e.alternate;
    if (f2 === null) {
      d = e.return;
      if (d !== null) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c)
          return Wb(e), a;
        if (f2 === d)
          return Wb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p$1(188));
    }
    if (c.return !== d.return)
      c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g)
          throw Error(p$1(189));
      }
    }
    if (c.alternate !== d)
      throw Error(p$1(190));
  }
  if (c.tag !== 3)
    throw Error(p$1(188));
  return c.stateNode.current === c ? a : b;
}
function Yb(a) {
  a = Xb(a);
  return a !== null ? Zb(a) : null;
}
function Zb(a) {
  if (a.tag === 5 || a.tag === 6)
    return a;
  for (a = a.child; a !== null; ) {
    var b = Zb(a);
    if (b !== null)
      return b;
    a = a.sibling;
  }
  return null;
}
var $b = ba.unstable_scheduleCallback, ac = ba.unstable_cancelCallback, bc = ba.unstable_shouldYield, cc = ba.unstable_requestPaint, B = ba.unstable_now, dc = ba.unstable_getCurrentPriorityLevel, ec = ba.unstable_ImmediatePriority, fc = ba.unstable_UserBlockingPriority, gc = ba.unstable_NormalPriority, hc = ba.unstable_LowPriority, ic = ba.unstable_IdlePriority, jc = null, kc = null;
function lc(a) {
  if (kc && typeof kc.onCommitFiberRoot === "function")
    try {
      kc.onCommitFiberRoot(jc, a, void 0, (a.current.flags & 128) === 128);
    } catch (b) {
    }
}
var nc = Math.clz32 ? Math.clz32 : mc, oc = Math.log, pc = Math.LN2;
function mc(a) {
  a >>>= 0;
  return a === 0 ? 32 : 31 - (oc(a) / pc | 0) | 0;
}
var qc = 64, rc = 4194304;
function sc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function tc(a, b) {
  var c = a.pendingLanes;
  if (c === 0)
    return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (g !== 0) {
    var h = g & ~e;
    h !== 0 ? d = sc(h) : (f2 &= g, f2 !== 0 && (d = sc(f2)));
  } else
    g = c & ~e, g !== 0 ? d = sc(g) : f2 !== 0 && (d = sc(f2));
  if (d === 0)
    return 0;
  if (b !== 0 && b !== d && (b & e) === 0 && (e = d & -d, f2 = b & -b, e >= f2 || e === 16 && (f2 & 4194240) !== 0))
    return b;
  (d & 4) !== 0 && (d |= c & 16);
  b = a.entangledLanes;
  if (b !== 0)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - nc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function uc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function vc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - nc(f2), h = 1 << g, k2 = e[g];
    if (k2 === -1) {
      if ((h & c) === 0 || (h & d) !== 0)
        e[g] = uc(h, b);
    } else
      k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function wc(a) {
  a = a.pendingLanes & -1073741825;
  return a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
}
function xc() {
  var a = qc;
  qc <<= 1;
  (qc & 4194240) === 0 && (qc = 64);
  return a;
}
function yc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function zc(a, b, c) {
  a.pendingLanes |= b;
  b !== 536870912 && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - nc(b);
  a[b] = c;
}
function Ac(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - nc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Bc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - nc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Cc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? (a & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
}
var Dc, Ec, Fc, Gc, Hc, Ic = false, Jc = [], Kc = null, Lc = null, Mc = null, Nc = /* @__PURE__ */ new Map(), Oc = /* @__PURE__ */ new Map(), Pc = [], Qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Rc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Kc = null;
      break;
    case "dragenter":
    case "dragleave":
      Lc = null;
      break;
    case "mouseover":
    case "mouseout":
      Mc = null;
      break;
    case "pointerover":
    case "pointerout":
      Nc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Oc.delete(b.pointerId);
  }
}
function Sc(a, b, c, d, e, f2) {
  if (a === null || a.nativeEvent !== f2)
    return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, b !== null && (b = Bb(b), b !== null && Ec(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  e !== null && b.indexOf(e) === -1 && b.push(e);
  return a;
}
function Tc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Kc = Sc(Kc, a, b, c, d, e), true;
    case "dragenter":
      return Lc = Sc(Lc, a, b, c, d, e), true;
    case "mouseover":
      return Mc = Sc(Mc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Nc.set(f2, Sc(Nc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Oc.set(f2, Sc(Oc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Uc(a) {
  var b = Vc(a.target);
  if (b !== null) {
    var c = Ub(b);
    if (c !== null) {
      if (b = c.tag, b === 13) {
        if (b = Vb(c), b !== null) {
          a.blockedOn = b;
          Hc(a.priority, function() {
            Fc(c);
          });
          return;
        }
      } else if (b === 3 && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Wc(a) {
  if (a.blockedOn !== null)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Xc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (c === null) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      vb = d;
      c.target.dispatchEvent(d);
      vb = null;
    } else
      return b = Bb(c), b !== null && Ec(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Yc(a, b, c) {
  Wc(a) && c.delete(b);
}
function Zc() {
  Ic = false;
  Kc !== null && Wc(Kc) && (Kc = null);
  Lc !== null && Wc(Lc) && (Lc = null);
  Mc !== null && Wc(Mc) && (Mc = null);
  Nc.forEach(Yc);
  Oc.forEach(Yc);
}
function $c(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Ic || (Ic = true, ba.unstable_scheduleCallback(ba.unstable_NormalPriority, Zc)));
}
function ad(a) {
  function b(b2) {
    return $c(b2, a);
  }
  if (0 < Jc.length) {
    $c(Jc[0], a);
    for (var c = 1; c < Jc.length; c++) {
      var d = Jc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  Kc !== null && $c(Kc, a);
  Lc !== null && $c(Lc, a);
  Mc !== null && $c(Mc, a);
  Nc.forEach(b);
  Oc.forEach(b);
  for (c = 0; c < Pc.length; c++)
    d = Pc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Pc.length && (c = Pc[0], c.blockedOn === null); )
    Uc(c), c.blockedOn === null && Pc.shift();
}
var bd = ta.ReactCurrentBatchConfig, cd = true;
function dd(a, b, c, d) {
  var e = C, f2 = bd.transition;
  bd.transition = null;
  try {
    C = 1, ed(a, b, c, d);
  } finally {
    C = e, bd.transition = f2;
  }
}
function fd(a, b, c, d) {
  var e = C, f2 = bd.transition;
  bd.transition = null;
  try {
    C = 4, ed(a, b, c, d);
  } finally {
    C = e, bd.transition = f2;
  }
}
function ed(a, b, c, d) {
  if (cd) {
    var e = Xc(a, b, c, d);
    if (e === null)
      gd(a, b, d, hd, c), Rc(a, d);
    else if (Tc(e, a, b, c, d))
      d.stopPropagation();
    else if (Rc(a, d), b & 4 && -1 < Qc.indexOf(a)) {
      for (; e !== null; ) {
        var f2 = Bb(e);
        f2 !== null && Dc(f2);
        f2 = Xc(a, b, c, d);
        f2 === null && gd(a, b, d, hd, c);
        if (f2 === e)
          break;
        e = f2;
      }
      e !== null && d.stopPropagation();
    } else
      gd(a, b, d, null, c);
  }
}
var hd = null;
function Xc(a, b, c, d) {
  hd = null;
  a = wb(d);
  a = Vc(a);
  if (a !== null)
    if (b = Ub(a), b === null)
      a = null;
    else if (c = b.tag, c === 13) {
      a = Vb(b);
      if (a !== null)
        return a;
      a = null;
    } else if (c === 3) {
      if (b.stateNode.current.memoizedState.isDehydrated)
        return b.tag === 3 ? b.stateNode.containerInfo : null;
      a = null;
    } else
      b !== a && (a = null);
  hd = a;
  return null;
}
function id(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (dc()) {
        case ec:
          return 1;
        case fc:
          return 4;
        case gc:
        case hc:
          return 16;
        case ic:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var jd = null, kd = null, ld = null;
function md() {
  if (ld)
    return ld;
  var a, b = kd, c = b.length, d, e = "value" in jd ? jd.value : jd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++)
    ;
  return ld = e.slice(a, 1 < d ? 1 - d : void 0);
}
function nd(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, a === 0 && b === 13 && (a = 13)) : a = b;
  a === 10 && (a = 13);
  return 32 <= a || a === 13 ? a : 0;
}
function od() {
  return true;
}
function pd() {
  return false;
}
function qd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (f2.defaultPrevented != null ? f2.defaultPrevented : f2.returnValue === false) ? od : pd;
    this.isPropagationStopped = pd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : typeof a2.returnValue !== "unknown" && (a2.returnValue = false), this.isDefaultPrevented = od);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : typeof a2.cancelBubble !== "unknown" && (a2.cancelBubble = true), this.isPropagationStopped = od);
  }, persist: function() {
  }, isPersistent: od });
  return b;
}
var rd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, sd = qd(rd), td = A({}, rd, { view: 0, detail: 0 }), ud = qd(td), vd, wd, xd, zd = A({}, td, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: yd, button: 0, buttons: 0, relatedTarget: function(a) {
  return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== xd && (xd && a.type === "mousemove" ? (vd = a.screenX - xd.screenX, wd = a.screenY - xd.screenY) : wd = vd = 0, xd = a);
  return vd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : wd;
} }), Ad = qd(zd), Bd = A({}, zd, { dataTransfer: 0 }), Cd = qd(Bd), Dd = A({}, td, { relatedTarget: 0 }), Ed = qd(Dd), Fd = A({}, rd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gd = qd(Fd), Hd = A({}, rd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Id = qd(Hd), Jd = A({}, rd, { data: 0 }), Kd = qd(Jd), Ld = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Md = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Nd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Od(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Nd[a]) ? !!b[a] : false;
}
function yd() {
  return Od;
}
var Pd = A({}, td, { key: function(a) {
  if (a.key) {
    var b = Ld[a.key] || a.key;
    if (b !== "Unidentified")
      return b;
  }
  return a.type === "keypress" ? (a = nd(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? Md[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: yd, charCode: function(a) {
  return a.type === "keypress" ? nd(a) : 0;
}, keyCode: function(a) {
  return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
}, which: function(a) {
  return a.type === "keypress" ? nd(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
} }), Qd = qd(Pd), Rd = A({}, zd, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Sd = qd(Rd), Td = A({}, td, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: yd }), Ud = qd(Td), Vd = A({}, rd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wd = qd(Vd), Xd = A({}, zd, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Yd = qd(Xd), Zd = [9, 13, 27, 32], $d = ia && "CompositionEvent" in window, ae = null;
ia && "documentMode" in document && (ae = document.documentMode);
var be = ia && "TextEvent" in window && !ae, ce = ia && (!$d || ae && 8 < ae && 11 >= ae), de = String.fromCharCode(32), ee = false;
function fe(a, b) {
  switch (a) {
    case "keyup":
      return Zd.indexOf(b.keyCode) !== -1;
    case "keydown":
      return b.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function ge(a) {
  a = a.detail;
  return typeof a === "object" && "data" in a ? a.data : null;
}
var he = false;
function ie(a, b) {
  switch (a) {
    case "compositionend":
      return ge(b);
    case "keypress":
      if (b.which !== 32)
        return null;
      ee = true;
      return de;
    case "textInput":
      return a = b.data, a === de && ee ? null : a;
    default:
      return null;
  }
}
function je(a, b) {
  if (he)
    return a === "compositionend" || !$d && fe(a, b) ? (a = md(), ld = kd = jd = null, he = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return ce && b.locale !== "ko" ? null : b.data;
    default:
      return null;
  }
}
var ke = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function le(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b === "input" ? !!ke[a.type] : b === "textarea" ? true : false;
}
function me(a, b, c, d) {
  Db(d);
  b = ne(b, "onChange");
  0 < b.length && (c = new sd("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var oe = null, pe = null;
function qe(a) {
  re(a, 0);
}
function se(a) {
  var b = te(a);
  if (Va(b))
    return a;
}
function ue(a, b) {
  if (a === "change")
    return b;
}
var ve = false;
if (ia) {
  var we;
  if (ia) {
    var xe = "oninput" in document;
    if (!xe) {
      var ye = document.createElement("div");
      ye.setAttribute("oninput", "return;");
      xe = typeof ye.oninput === "function";
    }
    we = xe;
  } else
    we = false;
  ve = we && (!document.documentMode || 9 < document.documentMode);
}
function ze() {
  oe && (oe.detachEvent("onpropertychange", Ae), pe = oe = null);
}
function Ae(a) {
  if (a.propertyName === "value" && se(pe)) {
    var b = [];
    me(b, pe, a, wb(a));
    Ib(qe, b);
  }
}
function Be(a, b, c) {
  a === "focusin" ? (ze(), oe = b, pe = c, oe.attachEvent("onpropertychange", Ae)) : a === "focusout" && ze();
}
function Ce(a) {
  if (a === "selectionchange" || a === "keyup" || a === "keydown")
    return se(pe);
}
function De(a, b) {
  if (a === "click")
    return se(b);
}
function Ee(a, b) {
  if (a === "input" || a === "change")
    return se(b);
}
function Fe(a, b) {
  return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
}
var Ge = typeof Object.is === "function" ? Object.is : Fe;
function He(a, b) {
  if (Ge(a, b))
    return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !Ge(a[e], b[e]))
      return false;
  }
  return true;
}
function Ie(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Je(a, b) {
  var c = Ie(a);
  a = 0;
  for (var d; c; ) {
    if (c.nodeType === 3) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Ie(c);
  }
}
function Ke(a, b) {
  return a && b ? a === b ? true : a && a.nodeType === 3 ? false : b && b.nodeType === 3 ? Ke(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Le() {
  for (var a = window, b = Wa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = typeof b.contentWindow.location.href === "string";
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Wa(a.document);
  }
  return b;
}
function Me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && (b === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || b === "textarea" || a.contentEditable === "true");
}
function Ne(a) {
  var b = Le(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Ke(c.ownerDocument.documentElement, c)) {
    if (d !== null && Me(c)) {
      if (b = d.start, a = d.end, a === void 0 && (a = b), "selectionStart" in c)
        c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = d.end === void 0 ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Je(c, f2);
        var g = Je(c, d);
        e && g && (a.rangeCount !== 1 || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; )
      a.nodeType === 1 && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    typeof c.focus === "function" && c.focus();
    for (c = 0; c < b.length; c++)
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Oe = ia && "documentMode" in document && 11 >= document.documentMode, Pe = null, Qe = null, Re = null, Se = false;
function Te(a, b, c) {
  var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
  Se || Pe == null || Pe !== Wa(d) || (d = Pe, "selectionStart" in d && Me(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Re && He(Re, d) || (Re = d, d = ne(Qe, "onSelect"), 0 < d.length && (b = new sd("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Pe)));
}
function Ue(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var Ve = { animationend: Ue("Animation", "AnimationEnd"), animationiteration: Ue("Animation", "AnimationIteration"), animationstart: Ue("Animation", "AnimationStart"), transitionend: Ue("Transition", "TransitionEnd") }, We = {}, Xe = {};
ia && (Xe = document.createElement("div").style, "AnimationEvent" in window || (delete Ve.animationend.animation, delete Ve.animationiteration.animation, delete Ve.animationstart.animation), "TransitionEvent" in window || delete Ve.transitionend.transition);
function Ye(a) {
  if (We[a])
    return We[a];
  if (!Ve[a])
    return a;
  var b = Ve[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Xe)
      return We[a] = b[c];
  return a;
}
var Ze = Ye("animationend"), $e = Ye("animationiteration"), af = Ye("animationstart"), bf = Ye("transitionend"), cf = /* @__PURE__ */ new Map(), df = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ef(a, b) {
  cf.set(a, b);
  fa(b, [a]);
}
for (var ff = 0; ff < df.length; ff++) {
  var gf = df[ff], hf = gf.toLowerCase(), jf = gf[0].toUpperCase() + gf.slice(1);
  ef(hf, "on" + jf);
}
ef(Ze, "onAnimationEnd");
ef($e, "onAnimationIteration");
ef(af, "onAnimationStart");
ef("dblclick", "onDoubleClick");
ef("focusin", "onFocus");
ef("focusout", "onBlur");
ef(bf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var kf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), lf = new Set("cancel close invalid load scroll toggle".split(" ").concat(kf));
function mf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Tb(d, b, void 0, a);
  a.currentTarget = null;
}
function re(a, b) {
  b = (b & 4) !== 0;
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          mf(e, h, l2);
          f2 = k2;
        }
      else
        for (g = 0; g < d.length; g++) {
          h = d[g];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          mf(e, h, l2);
          f2 = k2;
        }
    }
  }
  if (Pb)
    throw a = Qb, Pb = false, Qb = null, a;
}
function D(a, b) {
  var c = b[nf];
  c === void 0 && (c = b[nf] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (of(b, a, 2, false), c.add(d));
}
function pf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  of(c, a, d, b);
}
var qf = "_reactListening" + Math.random().toString(36).slice(2);
function rf(a) {
  if (!a[qf]) {
    a[qf] = true;
    da.forEach(function(b2) {
      b2 !== "selectionchange" && (lf.has(b2) || pf(b2, false, a), pf(b2, true, a));
    });
    var b = a.nodeType === 9 ? a : a.ownerDocument;
    b === null || b[qf] || (b[qf] = true, pf("selectionchange", false, b));
  }
}
function of(a, b, c, d) {
  switch (id(b)) {
    case 1:
      var e = dd;
      break;
    case 4:
      e = fd;
      break;
    default:
      e = ed;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Kb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e = true);
  d ? e !== void 0 ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : e !== void 0 ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function gd(a, b, c, d, e) {
  var f2 = d;
  if ((b & 1) === 0 && (b & 2) === 0 && d !== null)
    a:
      for (; ; ) {
        if (d === null)
          return;
        var g = d.tag;
        if (g === 3 || g === 4) {
          var h = d.stateNode.containerInfo;
          if (h === e || h.nodeType === 8 && h.parentNode === e)
            break;
          if (g === 4)
            for (g = d.return; g !== null; ) {
              var k2 = g.tag;
              if (k2 === 3 || k2 === 4) {
                if (k2 = g.stateNode.containerInfo, k2 === e || k2.nodeType === 8 && k2.parentNode === e)
                  return;
              }
              g = g.return;
            }
          for (; h !== null; ) {
            g = Vc(h);
            if (g === null)
              return;
            k2 = g.tag;
            if (k2 === 5 || k2 === 6) {
              d = f2 = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Ib(function() {
    var d2 = f2, e2 = wb(c), g2 = [];
    a: {
      var h2 = cf.get(a);
      if (h2 !== void 0) {
        var k3 = sd, m2 = a;
        switch (a) {
          case "keypress":
            if (nd(c) === 0)
              break a;
          case "keydown":
          case "keyup":
            k3 = Qd;
            break;
          case "focusin":
            m2 = "focus";
            k3 = Ed;
            break;
          case "focusout":
            m2 = "blur";
            k3 = Ed;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Ed;
            break;
          case "click":
            if (c.button === 2)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Ad;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Cd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Ud;
            break;
          case Ze:
          case $e:
          case af:
            k3 = Gd;
            break;
          case bf:
            k3 = Wd;
            break;
          case "scroll":
            k3 = ud;
            break;
          case "wheel":
            k3 = Yd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Id;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Sd;
        }
        var w2 = (b & 4) !== 0, J2 = !w2 && a === "scroll", v2 = w2 ? h2 !== null ? h2 + "Capture" : null : h2;
        w2 = [];
        for (var x2 = d2, r2; x2 !== null; ) {
          r2 = x2;
          var F2 = r2.stateNode;
          r2.tag === 5 && F2 !== null && (r2 = F2, v2 !== null && (F2 = Jb(x2, v2), F2 != null && w2.push(sf(x2, F2, r2))));
          if (J2)
            break;
          x2 = x2.return;
        }
        0 < w2.length && (h2 = new k3(h2, m2, null, c, e2), g2.push({ event: h2, listeners: w2 }));
      }
    }
    if ((b & 7) === 0) {
      a: {
        h2 = a === "mouseover" || a === "pointerover";
        k3 = a === "mouseout" || a === "pointerout";
        if (h2 && c !== vb && (m2 = c.relatedTarget || c.fromElement) && (Vc(m2) || m2[tf]))
          break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (m2 = c.relatedTarget || c.toElement, k3 = d2, m2 = m2 ? Vc(m2) : null, m2 !== null && (J2 = Ub(m2), m2 !== J2 || m2.tag !== 5 && m2.tag !== 6))
              m2 = null;
          } else
            k3 = null, m2 = d2;
          if (k3 !== m2) {
            w2 = Ad;
            F2 = "onMouseLeave";
            v2 = "onMouseEnter";
            x2 = "mouse";
            if (a === "pointerout" || a === "pointerover")
              w2 = Sd, F2 = "onPointerLeave", v2 = "onPointerEnter", x2 = "pointer";
            J2 = k3 == null ? h2 : te(k3);
            r2 = m2 == null ? h2 : te(m2);
            h2 = new w2(F2, x2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = r2;
            F2 = null;
            Vc(e2) === d2 && (w2 = new w2(v2, x2 + "enter", m2, c, e2), w2.target = r2, w2.relatedTarget = J2, F2 = w2);
            J2 = F2;
            if (k3 && m2)
              b: {
                w2 = k3;
                v2 = m2;
                x2 = 0;
                for (r2 = w2; r2; r2 = uf(r2))
                  x2++;
                r2 = 0;
                for (F2 = v2; F2; F2 = uf(F2))
                  r2++;
                for (; 0 < x2 - r2; )
                  w2 = uf(w2), x2--;
                for (; 0 < r2 - x2; )
                  v2 = uf(v2), r2--;
                for (; x2--; ) {
                  if (w2 === v2 || v2 !== null && w2 === v2.alternate)
                    break b;
                  w2 = uf(w2);
                  v2 = uf(v2);
                }
                w2 = null;
              }
            else
              w2 = null;
            k3 !== null && vf(g2, h2, k3, w2, false);
            m2 !== null && J2 !== null && vf(g2, J2, m2, w2, true);
          }
        }
      }
      a: {
        h2 = d2 ? te(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if (k3 === "select" || k3 === "input" && h2.type === "file")
          var Z = ue;
        else if (le(h2))
          if (ve)
            Z = Ee;
          else {
            Z = Ce;
            var ya = Be;
          }
        else
          (k3 = h2.nodeName) && k3.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (Z = De);
        if (Z && (Z = Z(a, d2))) {
          me(g2, Z, c, e2);
          break a;
        }
        ya && ya(a, h2, d2);
        a === "focusout" && (ya = h2._wrapperState) && ya.controlled && h2.type === "number" && bb(h2, "number", h2.value);
      }
      ya = d2 ? te(d2) : window;
      switch (a) {
        case "focusin":
          if (le(ya) || ya.contentEditable === "true")
            Pe = ya, Qe = d2, Re = null;
          break;
        case "focusout":
          Re = Qe = Pe = null;
          break;
        case "mousedown":
          Se = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Se = false;
          Te(g2, c, e2);
          break;
        case "selectionchange":
          if (Oe)
            break;
        case "keydown":
        case "keyup":
          Te(g2, c, e2);
      }
      var ab;
      if ($d)
        b: {
          switch (a) {
            case "compositionstart":
              var ca = "onCompositionStart";
              break b;
            case "compositionend":
              ca = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ca = "onCompositionUpdate";
              break b;
          }
          ca = void 0;
        }
      else
        he ? fe(a, c) && (ca = "onCompositionEnd") : a === "keydown" && c.keyCode === 229 && (ca = "onCompositionStart");
      ca && (ce && c.locale !== "ko" && (he || ca !== "onCompositionStart" ? ca === "onCompositionEnd" && he && (ab = md()) : (jd = e2, kd = "value" in jd ? jd.value : jd.textContent, he = true)), ya = ne(d2, ca), 0 < ya.length && (ca = new Kd(ca, a, null, c, e2), g2.push({ event: ca, listeners: ya }), ab ? ca.data = ab : (ab = ge(c), ab !== null && (ca.data = ab))));
      if (ab = be ? ie(a, c) : je(a, c))
        d2 = ne(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Kd("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = ab);
    }
    re(g2, b);
  });
}
function sf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function ne(a, b) {
  for (var c = b + "Capture", d = []; a !== null; ) {
    var e = a, f2 = e.stateNode;
    e.tag === 5 && f2 !== null && (e = f2, f2 = Jb(a, c), f2 != null && d.unshift(sf(a, f2, e)), f2 = Jb(a, b), f2 != null && d.push(sf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function uf(a) {
  if (a === null)
    return null;
  do
    a = a.return;
  while (a && a.tag !== 5);
  return a ? a : null;
}
function vf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; c !== null && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (k2 !== null && k2 === d)
      break;
    h.tag === 5 && l2 !== null && (h = l2, e ? (k2 = Jb(c, f2), k2 != null && g.unshift(sf(c, k2, h))) : e || (k2 = Jb(c, f2), k2 != null && g.push(sf(c, k2, h))));
    c = c.return;
  }
  g.length !== 0 && a.push({ event: b, listeners: g });
}
var wf = /\r\n?/g, xf = /\u0000|\uFFFD/g;
function yf(a) {
  return (typeof a === "string" ? a : "" + a).replace(wf, "\n").replace(xf, "");
}
function zf(a, b, c) {
  b = yf(b);
  if (yf(a) !== b && c)
    throw Error(p$1(425));
}
function Af() {
}
var Bf = null, Cf = null;
function Df(a, b) {
  return a === "textarea" || a === "noscript" || typeof b.children === "string" || typeof b.children === "number" || typeof b.dangerouslySetInnerHTML === "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
}
var Ef = typeof setTimeout === "function" ? setTimeout : void 0, Ff = typeof clearTimeout === "function" ? clearTimeout : void 0, Gf = typeof Promise === "function" ? Promise : void 0, If = typeof queueMicrotask === "function" ? queueMicrotask : typeof Gf !== "undefined" ? function(a) {
  return Gf.resolve(null).then(a).catch(Hf);
} : Ef;
function Hf(a) {
  setTimeout(function() {
    throw a;
  });
}
function Jf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && e.nodeType === 8)
      if (c = e.data, c === "/$") {
        if (d === 0) {
          a.removeChild(e);
          ad(b);
          return;
        }
        d--;
      } else
        c !== "$" && c !== "$?" && c !== "$!" || d++;
    c = e;
  } while (c);
  ad(b);
}
function Kf(a) {
  for (; a != null; a = a.nextSibling) {
    var b = a.nodeType;
    if (b === 1 || b === 3)
      break;
    if (b === 8) {
      b = a.data;
      if (b === "$" || b === "$!" || b === "$?")
        break;
      if (b === "/$")
        return null;
    }
  }
  return a;
}
function Lf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (a.nodeType === 8) {
      var c = a.data;
      if (c === "$" || c === "$!" || c === "$?") {
        if (b === 0)
          return a;
        b--;
      } else
        c === "/$" && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Mf = Math.random().toString(36).slice(2), Nf = "__reactFiber$" + Mf, Of = "__reactProps$" + Mf, tf = "__reactContainer$" + Mf, nf = "__reactEvents$" + Mf, Pf = "__reactListeners$" + Mf, Qf = "__reactHandles$" + Mf;
function Vc(a) {
  var b = a[Nf];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[tf] || c[Nf]) {
      c = b.alternate;
      if (b.child !== null || c !== null && c.child !== null)
        for (a = Lf(a); a !== null; ) {
          if (c = a[Nf])
            return c;
          a = Lf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Bb(a) {
  a = a[Nf] || a[tf];
  return !a || a.tag !== 5 && a.tag !== 6 && a.tag !== 13 && a.tag !== 3 ? null : a;
}
function te(a) {
  if (a.tag === 5 || a.tag === 6)
    return a.stateNode;
  throw Error(p$1(33));
}
function Cb(a) {
  return a[Of] || null;
}
var Rf = [], Sf = -1;
function Tf(a) {
  return { current: a };
}
function E(a) {
  0 > Sf || (a.current = Rf[Sf], Rf[Sf] = null, Sf--);
}
function G(a, b) {
  Sf++;
  Rf[Sf] = a.current;
  a.current = b;
}
var Uf = {}, H = Tf(Uf), Vf = Tf(false), Wf = Uf;
function Xf(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Uf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c)
    e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Yf(a) {
  a = a.childContextTypes;
  return a !== null && a !== void 0;
}
function Zf() {
  E(Vf);
  E(H);
}
function $f(a, b, c) {
  if (H.current !== Uf)
    throw Error(p$1(168));
  G(H, b);
  G(Vf, c);
}
function ag(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if (typeof d.getChildContext !== "function")
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in b))
      throw Error(p$1(108, Qa(a) || "Unknown", e));
  return A({}, c, d);
}
function bg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Uf;
  Wf = H.current;
  G(H, a);
  G(Vf, Vf.current);
  return true;
}
function cg(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(p$1(169));
  c ? (a = ag(a, b, Wf), d.__reactInternalMemoizedMergedChildContext = a, E(Vf), E(H), G(H, a)) : E(Vf);
  G(Vf, c);
}
var dg = null, eg = false, fg = false;
function gg(a) {
  dg === null ? dg = [a] : dg.push(a);
}
function hg(a) {
  eg = true;
  gg(a);
}
function ig() {
  if (!fg && dg !== null) {
    fg = true;
    var a = 0, b = C;
    try {
      var c = dg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (d !== null);
      }
      dg = null;
      eg = false;
    } catch (e) {
      throw dg !== null && (dg = dg.slice(a + 1)), $b(ec, ig), e;
    } finally {
      C = b, fg = false;
    }
  }
  return null;
}
var jg = ta.ReactCurrentBatchConfig;
function kg(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a)
      b[c] === void 0 && (b[c] = a[c]);
    return b;
  }
  return b;
}
var lg = Tf(null), mg = null, ng = null, og = null;
function pg() {
  og = ng = mg = null;
}
function qg(a) {
  var b = lg.current;
  E(lg);
  a._currentValue = b;
}
function rg(a, b, c) {
  for (; a !== null; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, d !== null && (d.childLanes |= b)) : d !== null && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c)
      break;
    a = a.return;
  }
}
function sg(a, b) {
  mg = a;
  og = ng = null;
  a = a.dependencies;
  a !== null && a.firstContext !== null && ((a.lanes & b) !== 0 && (tg = true), a.firstContext = null);
}
function ug(a) {
  var b = a._currentValue;
  if (og !== a)
    if (a = { context: a, memoizedValue: b, next: null }, ng === null) {
      if (mg === null)
        throw Error(p$1(308));
      ng = a;
      mg.dependencies = { lanes: 0, firstContext: a };
    } else
      ng = ng.next = a;
  return b;
}
var vg = null, wg = false;
function xg(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function yg(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function zg(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function Ag(a, b) {
  var c = a.updateQueue;
  c !== null && (c = c.shared, Bg(a) ? (a = c.interleaved, a === null ? (b.next = b, vg === null ? vg = [c] : vg.push(c)) : (b.next = a.next, a.next = b), c.interleaved = b) : (a = c.pending, a === null ? b.next = b : (b.next = a.next, a.next = b), c.pending = b));
}
function Cg(a, b, c) {
  b = b.updateQueue;
  if (b !== null && (b = b.shared, (c & 4194240) !== 0)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Bc(a, c);
  }
}
function Dg(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (d !== null && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (c !== null) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        f2 === null ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (c !== null);
      f2 === null ? e = f2 = b : f2 = f2.next = b;
    } else
      e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  a === null ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function Eg(a, b, c, d) {
  var e = a.updateQueue;
  wg = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (h !== null) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    g === null ? f2 = l2 : g.next = l2;
    g = k2;
    var n2 = a.alternate;
    n2 !== null && (n2 = n2.updateQueue, h = n2.lastBaseUpdate, h !== g && (h === null ? n2.firstBaseUpdate = l2 : h.next = l2, n2.lastBaseUpdate = k2));
  }
  if (f2 !== null) {
    var u2 = e.baseState;
    g = 0;
    n2 = l2 = k2 = null;
    h = f2;
    do {
      var q2 = h.lane, y2 = h.eventTime;
      if ((d & q2) === q2) {
        n2 !== null && (n2 = n2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var m2 = a, w2 = h;
          q2 = b;
          y2 = c;
          switch (w2.tag) {
            case 1:
              m2 = w2.payload;
              if (typeof m2 === "function") {
                u2 = m2.call(y2, u2, q2);
                break a;
              }
              u2 = m2;
              break a;
            case 3:
              m2.flags = m2.flags & -65537 | 128;
            case 0:
              m2 = w2.payload;
              q2 = typeof m2 === "function" ? m2.call(y2, u2, q2) : m2;
              if (q2 === null || q2 === void 0)
                break a;
              u2 = A({}, u2, q2);
              break a;
            case 2:
              wg = true;
          }
        }
        h.callback !== null && h.lane !== 0 && (a.flags |= 64, q2 = e.effects, q2 === null ? e.effects = [h] : q2.push(h));
      } else
        y2 = { eventTime: y2, lane: q2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, n2 === null ? (l2 = n2 = y2, k2 = u2) : n2 = n2.next = y2, g |= q2;
      h = h.next;
      if (h === null)
        if (h = e.shared.pending, h === null)
          break;
        else
          q2 = h, h = q2.next, q2.next = null, e.lastBaseUpdate = q2, e.shared.pending = null;
    } while (1);
    n2 === null && (k2 = u2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = n2;
    b = e.shared.interleaved;
    if (b !== null) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else
      f2 === null && (e.shared.lanes = 0);
    Fg |= g;
    a.lanes = g;
    a.memoizedState = u2;
  }
}
function Gg(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (a !== null)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (e !== null) {
        d.callback = null;
        d = c;
        if (typeof e !== "function")
          throw Error(p$1(191, e));
        e.call(d);
      }
    }
}
var Hg = new aa.Component().refs;
function Ig(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = c === null || c === void 0 ? b : A({}, b, c);
  a.memoizedState = c;
  a.lanes === 0 && (a.updateQueue.baseState = c);
}
var Mg = { isMounted: function(a) {
  return (a = a._reactInternals) ? Ub(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = Jg(), e = Kg(a), f2 = zg(d, e);
  f2.payload = b;
  c !== void 0 && c !== null && (f2.callback = c);
  Ag(a, f2);
  b = Lg(a, e, d);
  b !== null && Cg(b, a, e);
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = Jg(), e = Kg(a), f2 = zg(d, e);
  f2.tag = 1;
  f2.payload = b;
  c !== void 0 && c !== null && (f2.callback = c);
  Ag(a, f2);
  b = Lg(a, e, d);
  b !== null && Cg(b, a, e);
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = Jg(), d = Kg(a), e = zg(c, d);
  e.tag = 2;
  b !== void 0 && b !== null && (e.callback = b);
  Ag(a, e);
  b = Lg(a, d, c);
  b !== null && Cg(b, a, d);
} };
function Ng(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return typeof a.shouldComponentUpdate === "function" ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !He(c, d) || !He(e, f2) : true;
}
function Og(a, b, c) {
  var d = false, e = Uf;
  var f2 = b.contextType;
  typeof f2 === "object" && f2 !== null ? f2 = ug(f2) : (e = Yf(b) ? Wf : H.current, d = b.contextTypes, f2 = (d = d !== null && d !== void 0) ? Xf(a, e) : Uf);
  b = new b(c, f2);
  a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
  b.updater = Mg;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Pg(a, b, c, d) {
  a = b.state;
  typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c, d);
  typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Mg.enqueueReplaceState(b, b.state, null);
}
function Qg(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Hg;
  xg(a);
  var f2 = b.contextType;
  typeof f2 === "object" && f2 !== null ? e.context = ug(f2) : (f2 = Yf(b) ? Wf : H.current, e.context = Xf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  typeof f2 === "function" && (Ig(a, b, f2, c), e.state = a.memoizedState);
  typeof b.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b !== e.state && Mg.enqueueReplaceState(e, e.state, null), Eg(a, c, e, d), e.state = a.memoizedState);
  typeof e.componentDidMount === "function" && (a.flags |= 4194308);
}
var Rg = [], Sg = 0, Tg = null, Ug = 0, Vg = [], Wg = 0, Xg = null, Yg = 1, Zg = "";
function $g(a, b) {
  Rg[Sg++] = Ug;
  Rg[Sg++] = Tg;
  Tg = a;
  Ug = b;
}
function ah(a, b, c) {
  Vg[Wg++] = Yg;
  Vg[Wg++] = Zg;
  Vg[Wg++] = Xg;
  Xg = a;
  var d = Yg;
  a = Zg;
  var e = 32 - nc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - nc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    Yg = 1 << 32 - nc(b) + e | c << e | d;
    Zg = f2 + a;
  } else
    Yg = 1 << f2 | c << e | d, Zg = a;
}
function bh(a) {
  a.return !== null && ($g(a, 1), ah(a, 1, 0));
}
function ch(a) {
  for (; a === Tg; )
    Tg = Rg[--Sg], Rg[Sg] = null, Ug = Rg[--Sg], Rg[Sg] = null;
  for (; a === Xg; )
    Xg = Vg[--Wg], Vg[Wg] = null, Zg = Vg[--Wg], Vg[Wg] = null, Yg = Vg[--Wg], Vg[Wg] = null;
}
var dh = null, eh = null, I = false, fh = null;
function gh(a, b) {
  var c = hh(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  b === null ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function ih(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = b.nodeType !== 1 || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return b !== null ? (a.stateNode = b, dh = a, eh = Kf(b.firstChild), true) : false;
    case 6:
      return b = a.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a.stateNode = b, dh = a, eh = null, true) : false;
    case 13:
      return b = b.nodeType !== 8 ? null : b, b !== null ? (c = Xg !== null ? { id: Yg, overflow: Zg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = hh(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, dh = a, eh = null, true) : false;
    default:
      return false;
  }
}
function jh(a) {
  return (a.mode & 1) !== 0 && (a.flags & 128) === 0;
}
function kh(a) {
  if (I) {
    var b = eh;
    if (b) {
      var c = b;
      if (!ih(a, b)) {
        if (jh(a))
          throw Error(p$1(418));
        b = Kf(c.nextSibling);
        var d = dh;
        b && ih(a, b) ? gh(d, c) : (a.flags = a.flags & -4097 | 2, I = false, dh = a);
      }
    } else {
      if (jh(a))
        throw Error(p$1(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      dh = a;
    }
  }
}
function lh(a) {
  for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
    a = a.return;
  dh = a;
}
function mh(a) {
  if (a !== dh)
    return false;
  if (!I)
    return lh(a), I = true, false;
  var b;
  (b = a.tag !== 3) && !(b = a.tag !== 5) && (b = a.type, b = b !== "head" && b !== "body" && !Df(a.type, a.memoizedProps));
  if (b && (b = eh)) {
    if (jh(a)) {
      for (a = eh; a; )
        a = Kf(a.nextSibling);
      throw Error(p$1(418));
    }
    for (; b; )
      gh(a, b), b = Kf(b.nextSibling);
  }
  lh(a);
  if (a.tag === 13) {
    a = a.memoizedState;
    a = a !== null ? a.dehydrated : null;
    if (!a)
      throw Error(p$1(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (a.nodeType === 8) {
          var c = a.data;
          if (c === "/$") {
            if (b === 0) {
              eh = Kf(a.nextSibling);
              break a;
            }
            b--;
          } else
            c !== "$" && c !== "$!" && c !== "$?" || b++;
        }
        a = a.nextSibling;
      }
      eh = null;
    }
  } else
    eh = dh ? Kf(a.stateNode.nextSibling) : null;
  return true;
}
function nh() {
  eh = dh = null;
  I = false;
}
function oh(a) {
  fh === null ? fh = [a] : fh.push(a);
}
function ph(a, b, c) {
  a = c.ref;
  if (a !== null && typeof a !== "function" && typeof a !== "object") {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (c.tag !== 1)
          throw Error(p$1(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(p$1(147, a));
      var e = d, f2 = "" + a;
      if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === f2)
        return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        b2 === Hg && (b2 = e.refs = {});
        a2 === null ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if (typeof a !== "string")
      throw Error(p$1(284));
    if (!c._owner)
      throw Error(p$1(290, a));
  }
  return a;
}
function qh(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p$1(31, a === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function rh(a) {
  var b = a._init;
  return b(a._payload);
}
function sh(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      d2 === null ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; d2 !== null; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); b2 !== null; )
      b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = th(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (d2 !== null)
      return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && b2.alternate === null && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (b2 === null || b2.tag !== 6)
      return b2 = uh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === wa)
      return n2(a2, b2, c2.props.children, d2, c2.key);
    if (b2 !== null && (b2.elementType === f3 || typeof f3 === "object" && f3 !== null && f3.$$typeof === Ga && rh(f3) === b2.type))
      return d2 = e(b2, c2.props), d2.ref = ph(a2, b2, c2), d2.return = a2, d2;
    d2 = vh(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = ph(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = wh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function n2(a2, b2, c2, d2, f3) {
    if (b2 === null || b2.tag !== 7)
      return b2 = xh(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function u2(a2, b2, c2) {
    if (typeof b2 === "string" && b2 !== "" || typeof b2 === "number")
      return b2 = uh("" + b2, a2.mode, c2), b2.return = a2, b2;
    if (typeof b2 === "object" && b2 !== null) {
      switch (b2.$$typeof) {
        case ua:
          return c2 = vh(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = ph(a2, null, b2), c2.return = a2, c2;
        case va:
          return b2 = wh(b2, a2.mode, c2), b2.return = a2, b2;
        case Ga:
          var d2 = b2._init;
          return u2(a2, d2(b2._payload), c2);
      }
      if (db(b2) || Ja(b2))
        return b2 = xh(b2, a2.mode, c2, null), b2.return = a2, b2;
      qh(a2, b2);
    }
    return null;
  }
  function q2(a2, b2, c2, d2) {
    var e2 = b2 !== null ? b2.key : null;
    if (typeof c2 === "string" && c2 !== "" || typeof c2 === "number")
      return e2 !== null ? null : h(a2, b2, "" + c2, d2);
    if (typeof c2 === "object" && c2 !== null) {
      switch (c2.$$typeof) {
        case ua:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case va:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ga:
          return e2 = c2._init, q2(a2, b2, e2(c2._payload), d2);
      }
      if (db(c2) || Ja(c2))
        return e2 !== null ? null : n2(a2, b2, c2, d2, null);
      qh(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if (typeof d2 === "string" && d2 !== "" || typeof d2 === "number")
      return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if (typeof d2 === "object" && d2 !== null) {
      switch (d2.$$typeof) {
        case ua:
          return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case va:
          return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ga:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (db(d2) || Ja(d2))
        return a2 = a2.get(c2) || null, n2(b2, a2, d2, e2, null);
      qh(b2, d2);
    }
    return null;
  }
  function m2(e2, g2, h2, k3) {
    for (var l3 = null, n3 = null, r2 = g2, m3 = g2 = 0, x2 = null; r2 !== null && m3 < h2.length; m3++) {
      r2.index > m3 ? (x2 = r2, r2 = null) : x2 = r2.sibling;
      var v2 = q2(e2, r2, h2[m3], k3);
      if (v2 === null) {
        r2 === null && (r2 = x2);
        break;
      }
      a && r2 && v2.alternate === null && b(e2, r2);
      g2 = f2(v2, g2, m3);
      n3 === null ? l3 = v2 : n3.sibling = v2;
      n3 = v2;
      r2 = x2;
    }
    if (m3 === h2.length)
      return c(e2, r2), I && $g(e2, m3), l3;
    if (r2 === null) {
      for (; m3 < h2.length; m3++)
        r2 = u2(e2, h2[m3], k3), r2 !== null && (g2 = f2(r2, g2, m3), n3 === null ? l3 = r2 : n3.sibling = r2, n3 = r2);
      I && $g(e2, m3);
      return l3;
    }
    for (r2 = d(e2, r2); m3 < h2.length; m3++)
      x2 = y2(r2, e2, m3, h2[m3], k3), x2 !== null && (a && x2.alternate !== null && r2.delete(x2.key === null ? m3 : x2.key), g2 = f2(x2, g2, m3), n3 === null ? l3 = x2 : n3.sibling = x2, n3 = x2);
    a && r2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && $g(e2, m3);
    return l3;
  }
  function w2(e2, g2, h2, k3) {
    var l3 = Ja(h2);
    if (typeof l3 !== "function")
      throw Error(p$1(150));
    h2 = l3.call(h2);
    if (h2 == null)
      throw Error(p$1(151));
    for (var n3 = l3 = null, m3 = g2, r2 = g2 = 0, x2 = null, v2 = h2.next(); m3 !== null && !v2.done; r2++, v2 = h2.next()) {
      m3.index > r2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var w3 = q2(e2, m3, v2.value, k3);
      if (w3 === null) {
        m3 === null && (m3 = x2);
        break;
      }
      a && m3 && w3.alternate === null && b(e2, m3);
      g2 = f2(w3, g2, r2);
      n3 === null ? l3 = w3 : n3.sibling = w3;
      n3 = w3;
      m3 = x2;
    }
    if (v2.done)
      return c(e2, m3), I && $g(e2, r2), l3;
    if (m3 === null) {
      for (; !v2.done; r2++, v2 = h2.next())
        v2 = u2(e2, v2.value, k3), v2 !== null && (g2 = f2(v2, g2, r2), n3 === null ? l3 = v2 : n3.sibling = v2, n3 = v2);
      I && $g(e2, r2);
      return l3;
    }
    for (m3 = d(e2, m3); !v2.done; r2++, v2 = h2.next())
      v2 = y2(m3, e2, r2, v2.value, k3), v2 !== null && (a && v2.alternate !== null && m3.delete(v2.key === null ? r2 : v2.key), g2 = f2(v2, g2, r2), n3 === null ? l3 = v2 : n3.sibling = v2, n3 = v2);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && $g(e2, r2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    typeof f3 === "object" && f3 !== null && f3.type === wa && f3.key === null && (f3 = f3.props.children);
    if (typeof f3 === "object" && f3 !== null) {
      switch (f3.$$typeof) {
        case ua:
          a: {
            for (var k3 = f3.key, l3 = d2; l3 !== null; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === wa) {
                  if (l3.tag === 7) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || typeof k3 === "object" && k3 !== null && k3.$$typeof === Ga && rh(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = ph(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else
                b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === wa ? (d2 = xh(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = vh(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = ph(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case va:
          a: {
            for (l3 = f3.key; d2 !== null; ) {
              if (d2.key === l3)
                if (d2.tag === 4 && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = wh(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ga:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (db(f3))
        return m2(a2, d2, f3, h2);
      if (Ja(f3))
        return w2(a2, d2, f3, h2);
      qh(a2, f3);
    }
    return typeof f3 === "string" && f3 !== "" || typeof f3 === "number" ? (f3 = "" + f3, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = uh(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var yh = sh(true), zh = sh(false), Ah = {}, Bh = Tf(Ah), Ch = Tf(Ah), Dh = Tf(Ah);
function Eh(a) {
  if (a === Ah)
    throw Error(p$1(174));
  return a;
}
function Fh(a, b) {
  G(Dh, b);
  G(Ch, a);
  G(Bh, Ah);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : kb(null, "");
      break;
    default:
      a = a === 8 ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = kb(b, a);
  }
  E(Bh);
  G(Bh, b);
}
function Gh() {
  E(Bh);
  E(Ch);
  E(Dh);
}
function Hh(a) {
  Eh(Dh.current);
  var b = Eh(Bh.current);
  var c = kb(b, a.type);
  b !== c && (G(Ch, a), G(Bh, c));
}
function Ih(a) {
  Ch.current === a && (E(Bh), E(Ch));
}
var K = Tf(0);
function Jh(a) {
  for (var b = a; b !== null; ) {
    if (b.tag === 13) {
      var c = b.memoizedState;
      if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || c.data === "$!"))
        return b;
    } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
      if ((b.flags & 128) !== 0)
        return b;
    } else if (b.child !== null) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; b.sibling === null; ) {
      if (b.return === null || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Kh = [];
function Lh() {
  for (var a = 0; a < Kh.length; a++)
    Kh[a]._workInProgressVersionPrimary = null;
  Kh.length = 0;
}
var Mh = ta.ReactCurrentDispatcher, Nh = ta.ReactCurrentBatchConfig, Oh = 0, L = null, M = null, N = null, Ph = false, Qh = false, Rh = 0, Sh = 0;
function O() {
  throw Error(p$1(321));
}
function Th(a, b) {
  if (b === null)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!Ge(a[c], b[c]))
      return false;
  return true;
}
function Uh(a, b, c, d, e, f2) {
  Oh = f2;
  L = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Mh.current = a === null || a.memoizedState === null ? Vh : Wh;
  a = c(d, e);
  if (Qh) {
    f2 = 0;
    do {
      Qh = false;
      Rh = 0;
      if (25 <= f2)
        throw Error(p$1(301));
      f2 += 1;
      N = M = null;
      b.updateQueue = null;
      Mh.current = Xh;
      a = c(d, e);
    } while (Qh);
  }
  Mh.current = Yh;
  b = M !== null && M.next !== null;
  Oh = 0;
  N = M = L = null;
  Ph = false;
  if (b)
    throw Error(p$1(300));
  return a;
}
function Zh() {
  var a = Rh !== 0;
  Rh = 0;
  return a;
}
function $h() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  N === null ? L.memoizedState = N = a : N = N.next = a;
  return N;
}
function ai() {
  if (M === null) {
    var a = L.alternate;
    a = a !== null ? a.memoizedState : null;
  } else
    a = M.next;
  var b = N === null ? L.memoizedState : N.next;
  if (b !== null)
    N = b, M = a;
  else {
    if (a === null)
      throw Error(p$1(310));
    M = a;
    a = { memoizedState: M.memoizedState, baseState: M.baseState, baseQueue: M.baseQueue, queue: M.queue, next: null };
    N === null ? L.memoizedState = N = a : N = N.next = a;
  }
  return N;
}
function bi(a, b) {
  return typeof b === "function" ? b(a) : b;
}
function ci(a) {
  var b = ai(), c = b.queue;
  if (c === null)
    throw Error(p$1(311));
  c.lastRenderedReducer = a;
  var d = M, e = d.baseQueue, f2 = c.pending;
  if (f2 !== null) {
    if (e !== null) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (e !== null) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var n2 = l2.lane;
      if ((Oh & n2) === n2)
        k2 !== null && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var u2 = {
          lane: n2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        k2 === null ? (h = k2 = u2, g = d) : k2 = k2.next = u2;
        L.lanes |= n2;
        Fg |= n2;
      }
      l2 = l2.next;
    } while (l2 !== null && l2 !== f2);
    k2 === null ? g = d : k2.next = h;
    Ge(d, b.memoizedState) || (tg = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (a !== null) {
    e = a;
    do
      f2 = e.lane, L.lanes |= f2, Fg |= f2, e = e.next;
    while (e !== a);
  } else
    e === null && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function di(a) {
  var b = ai(), c = b.queue;
  if (c === null)
    throw Error(p$1(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (e !== null) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    Ge(f2, b.memoizedState) || (tg = true);
    b.memoizedState = f2;
    b.baseQueue === null && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function ei() {
}
function fi(a, b) {
  var c = L, d = ai(), e = b(), f2 = !Ge(d.memoizedState, e);
  f2 && (d.memoizedState = e, tg = true);
  d = d.queue;
  gi(hi.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || N !== null && N.memoizedState.tag & 1) {
    c.flags |= 2048;
    ii(9, ji.bind(null, c, d, e, b), void 0, null);
    if (P === null)
      throw Error(p$1(349));
    (Oh & 30) !== 0 || ki(c, b, e);
  }
  return e;
}
function ki(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = L.updateQueue;
  b === null ? (b = { lastEffect: null, stores: null }, L.updateQueue = b, b.stores = [a]) : (c = b.stores, c === null ? b.stores = [a] : c.push(a));
}
function ji(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  li(b) && Lg(a, 1, -1);
}
function hi(a, b, c) {
  return c(function() {
    li(b) && Lg(a, 1, -1);
  });
}
function li(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !Ge(a, c);
  } catch (d) {
    return true;
  }
}
function mi(a) {
  var b = $h();
  typeof a === "function" && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: bi, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ni.bind(null, L, a);
  return [b.memoizedState, a];
}
function ii(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = L.updateQueue;
  b === null ? (b = { lastEffect: null, stores: null }, L.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function oi() {
  return ai().memoizedState;
}
function pi(a, b, c, d) {
  var e = $h();
  L.flags |= a;
  e.memoizedState = ii(1 | b, c, void 0, d === void 0 ? null : d);
}
function qi(a, b, c, d) {
  var e = ai();
  d = d === void 0 ? null : d;
  var f2 = void 0;
  if (M !== null) {
    var g = M.memoizedState;
    f2 = g.destroy;
    if (d !== null && Th(d, g.deps)) {
      e.memoizedState = ii(b, c, f2, d);
      return;
    }
  }
  L.flags |= a;
  e.memoizedState = ii(1 | b, c, f2, d);
}
function ri(a, b) {
  return pi(8390656, 8, a, b);
}
function gi(a, b) {
  return qi(2048, 8, a, b);
}
function si(a, b) {
  return qi(4, 2, a, b);
}
function ti(a, b) {
  return qi(4, 4, a, b);
}
function ui(a, b) {
  if (typeof b === "function")
    return a = a(), b(a), function() {
      b(null);
    };
  if (b !== null && b !== void 0)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function vi(a, b, c) {
  c = c !== null && c !== void 0 ? c.concat([a]) : null;
  return qi(4, 4, ui.bind(null, b, a), c);
}
function wi() {
}
function xi(a, b) {
  var c = ai();
  b = b === void 0 ? null : b;
  var d = c.memoizedState;
  if (d !== null && b !== null && Th(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function yi(a, b) {
  var c = ai();
  b = b === void 0 ? null : b;
  var d = c.memoizedState;
  if (d !== null && b !== null && Th(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function zi(a, b, c) {
  if ((Oh & 21) === 0)
    return a.baseState && (a.baseState = false, tg = true), a.memoizedState = c;
  Ge(c, b) || (c = xc(), L.lanes |= c, Fg |= c, a.baseState = true);
  return b;
}
function Ai(a, b) {
  var c = C;
  C = c !== 0 && 4 > c ? c : 4;
  a(true);
  var d = Nh.transition;
  Nh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Nh.transition = d;
  }
}
function Bi() {
  return ai().memoizedState;
}
function Ci(a, b, c) {
  var d = Kg(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  Di(a) ? Ei(b, c) : (Fi(a, b, c), c = Jg(), a = Lg(a, d, c), a !== null && Gi(a, b, d));
}
function ni(a, b, c) {
  var d = Kg(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (Di(a))
    Ei(b, e);
  else {
    Fi(a, b, e);
    var f2 = a.alternate;
    if (a.lanes === 0 && (f2 === null || f2.lanes === 0) && (f2 = b.lastRenderedReducer, f2 !== null))
      try {
        var g = b.lastRenderedState, h = f2(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (Ge(h, g))
          return;
      } catch (k2) {
      } finally {
      }
    c = Jg();
    a = Lg(a, d, c);
    a !== null && Gi(a, b, d);
  }
}
function Di(a) {
  var b = a.alternate;
  return a === L || b !== null && b === L;
}
function Ei(a, b) {
  Qh = Ph = true;
  var c = a.pending;
  c === null ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Fi(a, b, c) {
  Bg(a) ? (a = b.interleaved, a === null ? (c.next = c, vg === null ? vg = [b] : vg.push(b)) : (c.next = a.next, a.next = c), b.interleaved = c) : (a = b.pending, a === null ? c.next = c : (c.next = a.next, a.next = c), b.pending = c);
}
function Gi(a, b, c) {
  if ((c & 4194240) !== 0) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Bc(a, c);
  }
}
var Yh = { readContext: ug, useCallback: O, useContext: O, useEffect: O, useImperativeHandle: O, useInsertionEffect: O, useLayoutEffect: O, useMemo: O, useReducer: O, useRef: O, useState: O, useDebugValue: O, useDeferredValue: O, useTransition: O, useMutableSource: O, useSyncExternalStore: O, useId: O, unstable_isNewReconciler: false }, Vh = { readContext: ug, useCallback: function(a, b) {
  $h().memoizedState = [a, b === void 0 ? null : b];
  return a;
}, useContext: ug, useEffect: ri, useImperativeHandle: function(a, b, c) {
  c = c !== null && c !== void 0 ? c.concat([a]) : null;
  return pi(4194308, 4, ui.bind(null, b, a), c);
}, useLayoutEffect: function(a, b) {
  return pi(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return pi(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = $h();
  b = b === void 0 ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = $h();
  b = c !== void 0 ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = Ci.bind(null, L, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = $h();
  a = { current: a };
  return b.memoizedState = a;
}, useState: mi, useDebugValue: wi, useDeferredValue: function(a) {
  return $h().memoizedState = a;
}, useTransition: function() {
  var a = mi(false), b = a[0];
  a = Ai.bind(null, a[1]);
  $h().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = L, e = $h();
  if (I) {
    if (c === void 0)
      throw Error(p$1(407));
    c = c();
  } else {
    c = b();
    if (P === null)
      throw Error(p$1(349));
    (Oh & 30) !== 0 || ki(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  ri(hi.bind(null, d, f2, a), [a]);
  d.flags |= 2048;
  ii(9, ji.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = $h(), b = P.identifierPrefix;
  if (I) {
    var c = Zg;
    var d = Yg;
    c = (d & ~(1 << 32 - nc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Rh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else
    c = Sh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Wh = {
  readContext: ug,
  useCallback: xi,
  useContext: ug,
  useEffect: gi,
  useImperativeHandle: vi,
  useInsertionEffect: si,
  useLayoutEffect: ti,
  useMemo: yi,
  useReducer: ci,
  useRef: oi,
  useState: function() {
    return ci(bi);
  },
  useDebugValue: wi,
  useDeferredValue: function(a) {
    var b = ai();
    return zi(b, M.memoizedState, a);
  },
  useTransition: function() {
    var a = ci(bi)[0], b = ai().memoizedState;
    return [a, b];
  },
  useMutableSource: ei,
  useSyncExternalStore: fi,
  useId: Bi,
  unstable_isNewReconciler: false
}, Xh = { readContext: ug, useCallback: xi, useContext: ug, useEffect: gi, useImperativeHandle: vi, useInsertionEffect: si, useLayoutEffect: ti, useMemo: yi, useReducer: di, useRef: oi, useState: function() {
  return di(bi);
}, useDebugValue: wi, useDeferredValue: function(a) {
  var b = ai();
  return M === null ? b.memoizedState = a : zi(b, M.memoizedState, a);
}, useTransition: function() {
  var a = di(bi)[0], b = ai().memoizedState;
  return [a, b];
}, useMutableSource: ei, useSyncExternalStore: fi, useId: Bi, unstable_isNewReconciler: false };
function Hi(a, b) {
  try {
    var c = "", d = b;
    do
      c += Oa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e };
}
function Ii(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Ji = typeof WeakMap === "function" ? WeakMap : Map;
function Ki(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Li || (Li = true, Mi = d);
    Ii(a, b);
  };
  return c;
}
function Ni(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if (typeof d === "function") {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Ii(a, b);
    };
  }
  var f2 = a.stateNode;
  f2 !== null && typeof f2.componentDidCatch === "function" && (c.callback = function() {
    Ii(a, b);
    typeof d !== "function" && (Oi === null ? Oi = /* @__PURE__ */ new Set([this]) : Oi.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
  });
  return c;
}
function Pi(a, b, c) {
  var d = a.pingCache;
  if (d === null) {
    d = a.pingCache = new Ji();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else
    e = d.get(b), e === void 0 && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Qi.bind(null, a, b, c), b.then(a, a));
}
function Ri(a) {
  do {
    var b;
    if (b = a.tag === 13)
      b = a.memoizedState, b = b !== null ? b.dehydrated !== null ? true : false : true;
    if (b)
      return a;
    a = a.return;
  } while (a !== null);
  return null;
}
function Si(a, b, c, d, e) {
  if ((a.mode & 1) === 0)
    return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, c.tag === 1 && (c.alternate === null ? c.tag = 17 : (b = zg(-1, 1), b.tag = 2, Ag(c, b))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Ti, Ui, Vi, Wi;
Ti = function(a, b) {
  for (var c = b.child; c !== null; ) {
    if (c.tag === 5 || c.tag === 6)
      a.appendChild(c.stateNode);
    else if (c.tag !== 4 && c.child !== null) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; c.sibling === null; ) {
      if (c.return === null || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Ui = function() {
};
Vi = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    Eh(Bh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Xa(a, e);
        d = Xa(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = fb(a, e);
        d = fb(a, d);
        f2 = [];
        break;
      default:
        typeof e.onClick !== "function" && typeof d.onClick === "function" && (a.onclick = Af);
    }
    tb(c, d);
    var g;
    c = null;
    for (l2 in e)
      if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && e[l2] != null)
        if (l2 === "style") {
          var h = e[l2];
          for (g in h)
            h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else
          l2 !== "dangerouslySetInnerHTML" && l2 !== "children" && l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && l2 !== "autoFocus" && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = e != null ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (k2 != null || h != null))
        if (l2 === "style")
          if (h) {
            for (g in h)
              !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k2)
              k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
          } else
            c || (f2 || (f2 = []), f2.push(l2, c)), c = k2;
        else
          l2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, k2 != null && h !== k2 && (f2 = f2 || []).push(l2, k2)) : l2 === "children" ? typeof k2 !== "string" && typeof k2 !== "number" || (f2 = f2 || []).push(l2, "" + k2) : l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && (ea.hasOwnProperty(l2) ? (k2 != null && l2 === "onScroll" && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2)
      b.flags |= 4;
  }
};
Wi = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Xi(a, b) {
  if (!I)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; b !== null; )
          b.alternate !== null && (c = b), b = b.sibling;
        c === null ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; c !== null; )
          c.alternate !== null && (d = c), c = c.sibling;
        d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function Q(a) {
  var b = a.alternate !== null && a.alternate.child === a.child, c = 0, d = 0;
  if (b)
    for (var e = a.child; e !== null; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else
    for (e = a.child; e !== null; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Yi(a, b, c) {
  var d = b.pendingProps;
  ch(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Q(b), null;
    case 1:
      return Yf(b.type) && Zf(), Q(b), null;
    case 3:
      d = b.stateNode;
      Gh();
      E(Vf);
      E(H);
      Lh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (a === null || a.child === null)
        mh(b) ? b.flags |= 4 : a === null || a.memoizedState.isDehydrated && (b.flags & 256) === 0 || (b.flags |= 1024, fh !== null && (Zi(fh), fh = null));
      Ui(a, b);
      Q(b);
      return null;
    case 5:
      Ih(b);
      var e = Eh(Dh.current);
      c = b.type;
      if (a !== null && b.stateNode != null)
        Vi(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (b.stateNode === null)
            throw Error(p$1(166));
          Q(b);
          return null;
        }
        a = Eh(Bh.current);
        if (mh(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Nf] = b;
          d[Of] = f2;
          a = (b.mode & 1) !== 0;
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < kf.length; e++)
                D(kf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D("error", d);
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Ya(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              gb(d, f2), D("invalid", d);
          }
          tb(c, f2);
          e = null;
          for (var g in f2)
            if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              g === "children" ? typeof h === "string" ? d.textContent !== h && (f2.suppressHydrationWarning !== true && zf(d.textContent, h, a), e = ["children", h]) : typeof h === "number" && d.textContent !== "" + h && (f2.suppressHydrationWarning !== true && zf(d.textContent, h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && h != null && g === "onScroll" && D("scroll", d);
            }
          switch (c) {
            case "input":
              Ua(d);
              cb(d, f2, true);
              break;
            case "textarea":
              Ua(d);
              ib(d);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof f2.onClick === "function" && (d.onclick = Af);
          }
          d = e;
          b.updateQueue = d;
          d !== null && (b.flags |= 4);
        } else {
          g = e.nodeType === 9 ? e : e.ownerDocument;
          a === "http://www.w3.org/1999/xhtml" && (a = jb(c));
          a === "http://www.w3.org/1999/xhtml" ? c === "script" ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : typeof d.is === "string" ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), c === "select" && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Nf] = b;
          a[Of] = d;
          Ti(a, b, false, false);
          b.stateNode = a;
          a: {
            g = ub(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < kf.length; e++)
                  D(kf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D("error", a);
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Ya(a, d);
                e = Xa(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                gb(a, d);
                e = fb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            tb(c, e);
            h = e;
            for (f2 in h)
              if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                f2 === "style" ? rb(a, k2) : f2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, k2 != null && mb(a, k2)) : f2 === "children" ? typeof k2 === "string" ? (c !== "textarea" || k2 !== "") && nb(a, k2) : typeof k2 === "number" && nb(a, "" + k2) : f2 !== "suppressContentEditableWarning" && f2 !== "suppressHydrationWarning" && f2 !== "autoFocus" && (ea.hasOwnProperty(f2) ? k2 != null && f2 === "onScroll" && D("scroll", a) : k2 != null && sa(a, f2, k2, g));
              }
            switch (c) {
              case "input":
                Ua(a);
                cb(a, d, false);
                break;
              case "textarea":
                Ua(a);
                ib(a);
                break;
              case "option":
                d.value != null && a.setAttribute("value", "" + Ra(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                f2 != null ? eb(a, !!d.multiple, f2, false) : d.defaultValue != null && eb(a, !!d.multiple, d.defaultValue, true);
                break;
              default:
                typeof e.onClick === "function" && (a.onclick = Af);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        b.ref !== null && (b.flags |= 512, b.flags |= 2097152);
      }
      Q(b);
      return null;
    case 6:
      if (a && b.stateNode != null)
        Wi(a, b, a.memoizedProps, d);
      else {
        if (typeof d !== "string" && b.stateNode === null)
          throw Error(p$1(166));
        c = Eh(Dh.current);
        Eh(Bh.current);
        if (mh(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Nf] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = dh, a !== null)
              switch (a.tag) {
                case 3:
                  zf(d.nodeValue, c, (a.mode & 1) !== 0);
                  break;
                case 5:
                  a.memoizedProps.suppressHydrationWarning !== true && zf(d.nodeValue, c, (a.mode & 1) !== 0);
              }
          }
          f2 && (b.flags |= 4);
        } else
          d = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(d), d[Nf] = b, b.stateNode = d;
      }
      Q(b);
      return null;
    case 13:
      E(K);
      d = b.memoizedState;
      if (I && eh !== null && (b.mode & 1) !== 0 && (b.flags & 128) === 0) {
        for (d = eh; d; )
          d = Kf(d.nextSibling);
        nh();
        b.flags |= 98560;
        return b;
      }
      if (d !== null && d.dehydrated !== null) {
        d = mh(b);
        if (a === null) {
          if (!d)
            throw Error(p$1(318));
          d = b.memoizedState;
          d = d !== null ? d.dehydrated : null;
          if (!d)
            throw Error(p$1(317));
          d[Nf] = b;
        } else
          nh(), (b.flags & 128) === 0 && (b.memoizedState = null), b.flags |= 4;
        Q(b);
        return null;
      }
      fh !== null && (Zi(fh), fh = null);
      if ((b.flags & 128) !== 0)
        return b.lanes = c, b;
      d = d !== null;
      c = false;
      a === null ? mh(b) : c = a.memoizedState !== null;
      d !== c && d && (b.child.flags |= 8192, (b.mode & 1) !== 0 && (a === null || (K.current & 1) !== 0 ? R === 0 && (R = 3) : $i()));
      b.updateQueue !== null && (b.flags |= 4);
      Q(b);
      return null;
    case 4:
      return Gh(), Ui(a, b), a === null && rf(b.stateNode.containerInfo), Q(b), null;
    case 10:
      return qg(b.type._context), Q(b), null;
    case 17:
      return Yf(b.type) && Zf(), Q(b), null;
    case 19:
      E(K);
      f2 = b.memoizedState;
      if (f2 === null)
        return Q(b), null;
      d = (b.flags & 128) !== 0;
      g = f2.rendering;
      if (g === null)
        if (d)
          Xi(f2, false);
        else {
          if (R !== 0 || a !== null && (a.flags & 128) !== 0)
            for (a = b.child; a !== null; ) {
              g = Jh(a);
              if (g !== null) {
                b.flags |= 128;
                Xi(f2, false);
                d = g.updateQueue;
                d !== null && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; c !== null; )
                  f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, g === null ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(K, K.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          f2.tail !== null && B() > aj && (b.flags |= 128, d = true, Xi(f2, false), b.lanes = 4194304);
        }
      else {
        if (!d)
          if (a = Jh(g), a !== null) {
            if (b.flags |= 128, d = true, c = a.updateQueue, c !== null && (b.updateQueue = c, b.flags |= 4), Xi(f2, true), f2.tail === null && f2.tailMode === "hidden" && !g.alternate && !I)
              return Q(b), null;
          } else
            2 * B() - f2.renderingStartTime > aj && c !== 1073741824 && (b.flags |= 128, d = true, Xi(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, c !== null ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (f2.tail !== null)
        return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = K.current, G(K, d ? c & 1 | 2 : c & 1), b;
      Q(b);
      return null;
    case 22:
    case 23:
      return bj(), d = b.memoizedState !== null, a !== null && a.memoizedState !== null !== d && (b.flags |= 8192), d && (b.mode & 1) !== 0 ? (cj & 1073741824) !== 0 && (Q(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : Q(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$1(156, b.tag));
}
var dj = ta.ReactCurrentOwner, tg = false;
function ej(a, b, c, d) {
  b.child = a === null ? zh(b, null, c, d) : yh(b, a.child, c, d);
}
function fj(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  sg(b, e);
  d = Uh(a, b, c, d, f2, e);
  c = Zh();
  if (a !== null && !tg)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, gj(a, b, e);
  I && c && bh(b);
  b.flags |= 1;
  ej(a, b, d, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (a === null) {
    var f2 = c.type;
    if (typeof f2 === "function" && !ij(f2) && f2.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0)
      return b.tag = 15, b.type = f2, jj(a, b, f2, d, e);
    a = vh(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if ((a.lanes & e) === 0) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = c !== null ? c : He;
    if (c(g, d) && a.ref === b.ref)
      return gj(a, b, e);
  }
  b.flags |= 1;
  a = th(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function jj(a, b, c, d, e) {
  if (a !== null) {
    var f2 = a.memoizedProps;
    if (He(f2, d) && a.ref === b.ref)
      if (tg = false, b.pendingProps = d = f2, (a.lanes & e) !== 0)
        (a.flags & 131072) !== 0 && (tg = true);
      else
        return b.lanes = a.lanes, gj(a, b, e);
  }
  return kj(a, b, c, d, e);
}
function lj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = a !== null ? a.memoizedState : null;
  if (d.mode === "hidden")
    if ((b.mode & 1) === 0)
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(mj, cj), cj |= c;
    else if ((c & 1073741824) !== 0)
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = f2 !== null ? f2.baseLanes : c, G(mj, cj), cj |= d;
    else
      return a = f2 !== null ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(mj, cj), cj |= a, null;
  else
    f2 !== null ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(mj, cj), cj |= d;
  ej(a, b, e, c);
  return b.child;
}
function nj(a, b) {
  var c = b.ref;
  if (a === null && c !== null || a !== null && a.ref !== c)
    b.flags |= 512, b.flags |= 2097152;
}
function kj(a, b, c, d, e) {
  var f2 = Yf(c) ? Wf : H.current;
  f2 = Xf(b, f2);
  sg(b, e);
  c = Uh(a, b, c, d, f2, e);
  d = Zh();
  if (a !== null && !tg)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, gj(a, b, e);
  I && d && bh(b);
  b.flags |= 1;
  ej(a, b, c, e);
  return b.child;
}
function oj(a, b, c, d, e) {
  if (Yf(c)) {
    var f2 = true;
    bg(b);
  } else
    f2 = false;
  sg(b, e);
  if (b.stateNode === null)
    a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), Og(b, c, d), Qg(b, c, d, e), d = true;
  else if (a === null) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    typeof l2 === "object" && l2 !== null ? l2 = ug(l2) : (l2 = Yf(c) ? Wf : H.current, l2 = Xf(b, l2));
    var n2 = c.getDerivedStateFromProps, u2 = typeof n2 === "function" || typeof g.getSnapshotBeforeUpdate === "function";
    u2 || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k2 !== l2) && Pg(b, g, d, l2);
    wg = false;
    var q2 = b.memoizedState;
    g.state = q2;
    Eg(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || q2 !== k2 || Vf.current || wg ? (typeof n2 === "function" && (Ig(b, c, n2, d), k2 = b.memoizedState), (h = wg || Ng(b, c, h, d, q2, k2, l2)) ? (u2 || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b.flags |= 4194308)) : (typeof g.componentDidMount === "function" && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : (typeof g.componentDidMount === "function" && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    yg(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : kg(b.type, h);
    g.props = l2;
    u2 = b.pendingProps;
    q2 = g.context;
    k2 = c.contextType;
    typeof k2 === "object" && k2 !== null ? k2 = ug(k2) : (k2 = Yf(c) ? Wf : H.current, k2 = Xf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (n2 = typeof y2 === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== u2 || q2 !== k2) && Pg(b, g, d, k2);
    wg = false;
    q2 = b.memoizedState;
    g.state = q2;
    Eg(b, d, g, e);
    var m2 = b.memoizedState;
    h !== u2 || q2 !== m2 || Vf.current || wg ? (typeof y2 === "function" && (Ig(b, c, y2, d), m2 = b.memoizedState), (l2 = wg || Ng(b, c, l2, d, q2, m2, k2) || false) ? (n2 || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, m2, k2), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, m2, k2)), typeof g.componentDidUpdate === "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b.flags |= 1024)) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && q2 === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && q2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = m2), g.props = d, g.state = m2, g.context = k2, d = l2) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && q2 === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && q2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return pj(a, b, c, d, f2, e);
}
function pj(a, b, c, d, e, f2) {
  nj(a, b);
  var g = (b.flags & 128) !== 0;
  if (!d && !g)
    return e && cg(b, c, false), gj(a, b, f2);
  d = b.stateNode;
  dj.current = b;
  var h = g && typeof c.getDerivedStateFromError !== "function" ? null : d.render();
  b.flags |= 1;
  a !== null && g ? (b.child = yh(b, a.child, null, f2), b.child = yh(b, null, h, f2)) : ej(a, b, h, f2);
  b.memoizedState = d.state;
  e && cg(b, c, true);
  return b.child;
}
function qj(a) {
  var b = a.stateNode;
  b.pendingContext ? $f(a, b.pendingContext, b.pendingContext !== b.context) : b.context && $f(a, b.context, false);
  Fh(a, b.containerInfo);
}
function rj(a, b, c, d, e) {
  nh();
  oh(e);
  b.flags |= 256;
  ej(a, b, c, d);
  return b.child;
}
var sj = { dehydrated: null, treeContext: null, retryLane: 0 };
function tj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function uj(a, b) {
  return { baseLanes: a.baseLanes | b, cachePool: null, transitions: a.transitions };
}
function vj(a, b, c) {
  var d = b.pendingProps, e = K.current, f2 = false, g = (b.flags & 128) !== 0, h;
  (h = g) || (h = a !== null && a.memoizedState === null ? false : (e & 2) !== 0);
  if (h)
    f2 = true, b.flags &= -129;
  else if (a === null || a.memoizedState !== null)
    e |= 1;
  G(K, e & 1);
  if (a === null) {
    kh(b);
    a = b.memoizedState;
    if (a !== null && (a = a.dehydrated, a !== null))
      return (b.mode & 1) === 0 ? b.lanes = 1 : a.data === "$!" ? b.lanes = 8 : b.lanes = 1073741824, null;
    e = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, e = { mode: "hidden", children: e }, (d & 1) === 0 && f2 !== null ? (f2.childLanes = 0, f2.pendingProps = e) : f2 = wj(e, d, 0, null), a = xh(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = tj(c), b.memoizedState = sj, a) : xj(b, e);
  }
  e = a.memoizedState;
  if (e !== null) {
    h = e.dehydrated;
    if (h !== null) {
      if (g) {
        if (b.flags & 256)
          return b.flags &= -257, yj(a, b, c, Error(p$1(422)));
        if (b.memoizedState !== null)
          return b.child = a.child, b.flags |= 128, null;
        f2 = d.fallback;
        e = b.mode;
        d = wj({ mode: "visible", children: d.children }, e, 0, null);
        f2 = xh(f2, e, c, null);
        f2.flags |= 2;
        d.return = b;
        f2.return = b;
        d.sibling = f2;
        b.child = d;
        (b.mode & 1) !== 0 && yh(b, a.child, null, c);
        b.child.memoizedState = tj(c);
        b.memoizedState = sj;
        return f2;
      }
      if ((b.mode & 1) === 0)
        b = yj(a, b, c, null);
      else if (h.data === "$!")
        b = yj(a, b, c, Error(p$1(419)));
      else if (d = (c & a.childLanes) !== 0, tg || d) {
        d = P;
        if (d !== null) {
          switch (c & -c) {
            case 4:
              f2 = 2;
              break;
            case 16:
              f2 = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              f2 = 32;
              break;
            case 536870912:
              f2 = 268435456;
              break;
            default:
              f2 = 0;
          }
          d = (f2 & (d.suspendedLanes | c)) !== 0 ? 0 : f2;
          d !== 0 && d !== e.retryLane && (e.retryLane = d, Lg(a, d, -1));
        }
        $i();
        b = yj(a, b, c, Error(p$1(421)));
      } else
        h.data === "$?" ? (b.flags |= 128, b.child = a.child, b = zj.bind(null, a), h._reactRetry = b, b = null) : (c = e.treeContext, eh = Kf(h.nextSibling), dh = b, I = true, fh = null, c !== null && (Vg[Wg++] = Yg, Vg[Wg++] = Zg, Vg[Wg++] = Xg, Yg = c.id, Zg = c.overflow, Xg = b), b = xj(b, b.pendingProps.children), b.flags |= 4096);
      return b;
    }
    if (f2)
      return d = Aj(a, b, d.children, d.fallback, c), f2 = b.child, e = a.child.memoizedState, f2.memoizedState = e === null ? tj(c) : uj(e, c), f2.childLanes = a.childLanes & ~c, b.memoizedState = sj, d;
    c = Bj(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }
  if (f2)
    return d = Aj(a, b, d.children, d.fallback, c), f2 = b.child, e = a.child.memoizedState, f2.memoizedState = e === null ? tj(c) : uj(e, c), f2.childLanes = a.childLanes & ~c, b.memoizedState = sj, d;
  c = Bj(a, b, d.children, c);
  b.memoizedState = null;
  return c;
}
function xj(a, b) {
  b = wj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function Bj(a, b, c, d) {
  var e = a.child;
  a = e.sibling;
  c = th(e, { mode: "visible", children: c });
  (b.mode & 1) === 0 && (c.lanes = d);
  c.return = b;
  c.sibling = null;
  a !== null && (d = b.deletions, d === null ? (b.deletions = [a], b.flags |= 16) : d.push(a));
  return b.child = c;
}
function Aj(a, b, c, d, e) {
  var f2 = b.mode;
  a = a.child;
  var g = a.sibling, h = { mode: "hidden", children: c };
  (f2 & 1) === 0 && b.child !== a ? (c = b.child, c.childLanes = 0, c.pendingProps = h, b.deletions = null) : (c = th(a, h), c.subtreeFlags = a.subtreeFlags & 14680064);
  g !== null ? d = th(g, d) : (d = xh(d, f2, e, null), d.flags |= 2);
  d.return = b;
  c.return = b;
  c.sibling = d;
  b.child = c;
  return d;
}
function yj(a, b, c, d) {
  d !== null && oh(d);
  yh(b, a.child, null, c);
  a = xj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function Cj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  d !== null && (d.lanes |= b);
  rg(a.return, b, c);
}
function Dj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  f2 === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function Ej(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  ej(a, b, d.children, c);
  d = K.current;
  if ((d & 2) !== 0)
    d = d & 1 | 2, b.flags |= 128;
  else {
    if (a !== null && (a.flags & 128) !== 0)
      a:
        for (a = b.child; a !== null; ) {
          if (a.tag === 13)
            a.memoizedState !== null && Cj(a, c, b);
          else if (a.tag === 19)
            Cj(a, c, b);
          else if (a.child !== null) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  G(K, d);
  if ((b.mode & 1) === 0)
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; c !== null; )
          a = c.alternate, a !== null && Jh(a) === null && (e = c), c = c.sibling;
        c = e;
        c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        Dj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; e !== null; ) {
          a = e.alternate;
          if (a !== null && Jh(a) === null) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        Dj(b, true, c, null, f2);
        break;
      case "together":
        Dj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function gj(a, b, c) {
  a !== null && (b.dependencies = a.dependencies);
  Fg |= b.lanes;
  if ((c & b.childLanes) === 0)
    return null;
  if (a !== null && b.child !== a.child)
    throw Error(p$1(153));
  if (b.child !== null) {
    a = b.child;
    c = th(a, a.pendingProps);
    b.child = c;
    for (c.return = b; a.sibling !== null; )
      a = a.sibling, c = c.sibling = th(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function Fj(a, b, c) {
  switch (b.tag) {
    case 3:
      qj(b);
      nh();
      break;
    case 5:
      Hh(b);
      break;
    case 1:
      Yf(b.type) && bg(b);
      break;
    case 4:
      Fh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(lg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (d !== null) {
        if (d.dehydrated !== null)
          return G(K, K.current & 1), b.flags |= 128, null;
        if ((c & b.child.childLanes) !== 0)
          return vj(a, b, c);
        G(K, K.current & 1);
        a = gj(a, b, c);
        return a !== null ? a.sibling : null;
      }
      G(K, K.current & 1);
      break;
    case 19:
      d = (c & b.childLanes) !== 0;
      if ((a.flags & 128) !== 0) {
        if (d)
          return Ej(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(K, K.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b.lanes = 0, lj(a, b, c);
  }
  return gj(a, b, c);
}
function Gj(a, b) {
  ch(b);
  switch (b.tag) {
    case 1:
      return Yf(b.type) && Zf(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return Gh(), E(Vf), E(H), Lh(), a = b.flags, (a & 65536) !== 0 && (a & 128) === 0 ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Ih(b), null;
    case 13:
      E(K);
      a = b.memoizedState;
      if (a !== null && a.dehydrated !== null) {
        if (b.alternate === null)
          throw Error(p$1(340));
        nh();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(K), null;
    case 4:
      return Gh(), null;
    case 10:
      return qg(b.type._context), null;
    case 22:
    case 23:
      return bj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Hj = false, S = false, Ij = typeof WeakSet === "function" ? WeakSet : Set, T = null;
function Jj(a, b) {
  var c = a.ref;
  if (c !== null)
    if (typeof c === "function")
      try {
        c(null);
      } catch (d) {
        U(a, b, d);
      }
    else
      c.current = null;
}
function Kj(a, b, c) {
  try {
    c();
  } catch (d) {
    U(a, b, d);
  }
}
var Lj = false;
function Mj(a, b) {
  Bf = cd;
  a = Le();
  if (Me(a)) {
    if ("selectionStart" in a)
      var c = { start: a.selectionStart, end: a.selectionEnd };
    else
      a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && d.rangeCount !== 0) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (Z) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k2 = -1, l2 = 0, n2 = 0, u2 = a, q2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                u2 !== c || e !== 0 && u2.nodeType !== 3 || (h = g + e);
                u2 !== f2 || d !== 0 && u2.nodeType !== 3 || (k2 = g + d);
                u2.nodeType === 3 && (g += u2.nodeValue.length);
                if ((y2 = u2.firstChild) === null)
                  break;
                q2 = u2;
                u2 = y2;
              }
              for (; ; ) {
                if (u2 === a)
                  break b;
                q2 === c && ++l2 === e && (h = g);
                q2 === f2 && ++n2 === d && (k2 = g);
                if ((y2 = u2.nextSibling) !== null)
                  break;
                u2 = q2;
                q2 = u2.parentNode;
              }
              u2 = y2;
            }
          c = h === -1 || k2 === -1 ? null : { start: h, end: k2 };
        } else
          c = null;
      }
    c = c || { start: 0, end: 0 };
  } else
    c = null;
  Cf = { focusedElem: a, selectionRange: c };
  cd = false;
  for (T = b; T !== null; )
    if (b = T, a = b.child, (b.subtreeFlags & 1028) !== 0 && a !== null)
      a.return = b, T = a;
    else
      for (; T !== null; ) {
        b = T;
        try {
          var m2 = b.alternate;
          if ((b.flags & 1024) !== 0)
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m2 !== null) {
                  var w2 = m2.memoizedProps, J2 = m2.memoizedState, v2 = b.stateNode, x2 = v2.getSnapshotBeforeUpdate(b.elementType === b.type ? w2 : kg(b.type, w2), J2);
                  v2.__reactInternalSnapshotBeforeUpdate = x2;
                }
                break;
              case 3:
                var r2 = b.stateNode.containerInfo;
                if (r2.nodeType === 1)
                  r2.textContent = "";
                else if (r2.nodeType === 9) {
                  var F2 = r2.body;
                  F2 != null && (F2.textContent = "");
                }
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$1(163));
            }
        } catch (Z) {
          U(b, b.return, Z);
        }
        a = b.sibling;
        if (a !== null) {
          a.return = b.return;
          T = a;
          break;
        }
        T = b.return;
      }
  m2 = Lj;
  Lj = false;
  return m2;
}
function Nj(a, b, c) {
  var d = b.updateQueue;
  d = d !== null ? d.lastEffect : null;
  if (d !== null) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        f2 !== void 0 && Kj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Oj(a, b) {
  b = b.updateQueue;
  b = b !== null ? b.lastEffect : null;
  if (b !== null) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Pj(a) {
  var b = a.ref;
  if (b !== null) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    typeof b === "function" ? b(a) : b.current = a;
  }
}
function Qj(a) {
  var b = a.alternate;
  b !== null && (a.alternate = null, Qj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  a.tag === 5 && (b = a.stateNode, b !== null && (delete b[Nf], delete b[Of], delete b[nf], delete b[Pf], delete b[Qf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Rj(a) {
  return a.tag === 5 || a.tag === 3 || a.tag === 4;
}
function Sj(a) {
  a:
    for (; ; ) {
      for (; a.sibling === null; ) {
        if (a.return === null || Rj(a.return))
          return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18; ) {
        if (a.flags & 2)
          continue a;
        if (a.child === null || a.tag === 4)
          continue a;
        else
          a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2))
        return a.stateNode;
    }
}
function Tj(a, b, c) {
  var d = a.tag;
  if (d === 5 || d === 6)
    a = a.stateNode, b ? c.nodeType === 8 ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (c.nodeType === 8 ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, c !== null && c !== void 0 || b.onclick !== null || (b.onclick = Af));
  else if (d !== 4 && (a = a.child, a !== null))
    for (Tj(a, b, c), a = a.sibling; a !== null; )
      Tj(a, b, c), a = a.sibling;
}
function Uj(a, b, c) {
  var d = a.tag;
  if (d === 5 || d === 6)
    a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (d !== 4 && (a = a.child, a !== null))
    for (Uj(a, b, c), a = a.sibling; a !== null; )
      Uj(a, b, c), a = a.sibling;
}
var V = null, Vj = false;
function Wj(a, b, c) {
  for (c = c.child; c !== null; )
    Xj(a, b, c), c = c.sibling;
}
function Xj(a, b, c) {
  if (kc && typeof kc.onCommitFiberUnmount === "function")
    try {
      kc.onCommitFiberUnmount(jc, c);
    } catch (h) {
    }
  switch (c.tag) {
    case 5:
      S || Jj(c, b);
    case 6:
      var d = V, e = Vj;
      V = null;
      Wj(a, b, c);
      V = d;
      Vj = e;
      V !== null && (Vj ? (a = V, c = c.stateNode, a.nodeType === 8 ? a.parentNode.removeChild(c) : a.removeChild(c)) : V.removeChild(c.stateNode));
      break;
    case 18:
      V !== null && (Vj ? (a = V, c = c.stateNode, a.nodeType === 8 ? Jf(a.parentNode, c) : a.nodeType === 1 && Jf(a, c), ad(a)) : Jf(V, c.stateNode));
      break;
    case 4:
      d = V;
      e = Vj;
      V = c.stateNode.containerInfo;
      Vj = true;
      Wj(a, b, c);
      V = d;
      Vj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!S && (d = c.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          g !== void 0 && ((f2 & 2) !== 0 ? Kj(c, b, g) : (f2 & 4) !== 0 && Kj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Wj(a, b, c);
      break;
    case 1:
      if (!S && (Jj(c, b), d = c.stateNode, typeof d.componentWillUnmount === "function"))
        try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          U(c, b, h);
        }
      Wj(a, b, c);
      break;
    case 21:
      Wj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (S = (d = S) || c.memoizedState !== null, Wj(a, b, c), S = d) : Wj(a, b, c);
      break;
    default:
      Wj(a, b, c);
  }
}
function Yj(a) {
  var b = a.updateQueue;
  if (b !== null) {
    a.updateQueue = null;
    var c = a.stateNode;
    c === null && (c = a.stateNode = new Ij());
    b.forEach(function(b2) {
      var d = Zj.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ak(a, b) {
  var c = b.deletions;
  if (c !== null)
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g = b, h = g;
        a:
          for (; h !== null; ) {
            switch (h.tag) {
              case 5:
                V = h.stateNode;
                Vj = false;
                break a;
              case 3:
                V = h.stateNode.containerInfo;
                Vj = true;
                break a;
              case 4:
                V = h.stateNode.containerInfo;
                Vj = true;
                break a;
            }
            h = h.return;
          }
        if (V === null)
          throw Error(p$1(160));
        Xj(f2, g, e);
        V = null;
        Vj = false;
        var k2 = e.alternate;
        k2 !== null && (k2.return = null);
        e.return = null;
      } catch (l2) {
        U(e, b, l2);
      }
    }
  if (b.subtreeFlags & 12854)
    for (b = b.child; b !== null; )
      bk(b, a), b = b.sibling;
}
function bk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ak(b, a);
      ck(a);
      if (d & 4) {
        try {
          Nj(3, a, a.return), Oj(3, a);
        } catch (m2) {
          U(a, a.return, m2);
        }
        try {
          Nj(5, a, a.return);
        } catch (m2) {
          U(a, a.return, m2);
        }
      }
      break;
    case 1:
      ak(b, a);
      ck(a);
      d & 512 && c !== null && Jj(c, c.return);
      break;
    case 5:
      ak(b, a);
      ck(a);
      d & 512 && c !== null && Jj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          nb(e, "");
        } catch (m2) {
          U(a, a.return, m2);
        }
      }
      if (d & 4 && (e = a.stateNode, e != null)) {
        var f2 = a.memoizedProps, g = c !== null ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (k2 !== null)
          try {
            h === "input" && f2.type === "radio" && f2.name != null && Za(e, f2);
            ub(h, g);
            var l2 = ub(h, f2);
            for (g = 0; g < k2.length; g += 2) {
              var n2 = k2[g], u2 = k2[g + 1];
              n2 === "style" ? rb(e, u2) : n2 === "dangerouslySetInnerHTML" ? mb(e, u2) : n2 === "children" ? nb(e, u2) : sa(e, n2, u2, l2);
            }
            switch (h) {
              case "input":
                $a(e, f2);
                break;
              case "textarea":
                hb(e, f2);
                break;
              case "select":
                var q2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                y2 != null ? eb(e, !!f2.multiple, y2, false) : q2 !== !!f2.multiple && (f2.defaultValue != null ? eb(e, !!f2.multiple, f2.defaultValue, true) : eb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Of] = f2;
          } catch (m2) {
            U(a, a.return, m2);
          }
      }
      break;
    case 6:
      ak(b, a);
      ck(a);
      if (d & 4) {
        if (a.stateNode === null)
          throw Error(p$1(162));
        l2 = a.stateNode;
        n2 = a.memoizedProps;
        try {
          l2.nodeValue = n2;
        } catch (m2) {
          U(a, a.return, m2);
        }
      }
      break;
    case 3:
      ak(b, a);
      ck(a);
      if (d & 4 && c !== null && c.memoizedState.isDehydrated)
        try {
          ad(b.containerInfo);
        } catch (m2) {
          U(a, a.return, m2);
        }
      break;
    case 4:
      ak(b, a);
      ck(a);
      break;
    case 13:
      ak(b, a);
      ck(a);
      l2 = a.child;
      l2.flags & 8192 && l2.memoizedState !== null && (l2.alternate === null || l2.alternate.memoizedState === null) && (dk = B());
      d & 4 && Yj(a);
      break;
    case 22:
      l2 = c !== null && c.memoizedState !== null;
      a.mode & 1 ? (S = (n2 = S) || l2, ak(b, a), S = n2) : ak(b, a);
      ck(a);
      if (d & 8192) {
        n2 = a.memoizedState !== null;
        a:
          for (u2 = null, q2 = a; ; ) {
            if (q2.tag === 5) {
              if (u2 === null) {
                u2 = q2;
                try {
                  e = q2.stateNode, n2 ? (f2 = e.style, typeof f2.setProperty === "function" ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = k2 !== void 0 && k2 !== null && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = qb("display", g));
                } catch (m2) {
                  U(a, a.return, m2);
                }
              }
            } else if (q2.tag === 6) {
              if (u2 === null)
                try {
                  q2.stateNode.nodeValue = n2 ? "" : q2.memoizedProps;
                } catch (m2) {
                  U(a, a.return, m2);
                }
            } else if ((q2.tag !== 22 && q2.tag !== 23 || q2.memoizedState === null || q2 === a) && q2.child !== null) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a)
              break a;
            for (; q2.sibling === null; ) {
              if (q2.return === null || q2.return === a)
                break a;
              u2 === q2 && (u2 = null);
              q2 = q2.return;
            }
            u2 === q2 && (u2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        if (n2 && !l2 && (a.mode & 1) !== 0)
          for (T = a, a = a.child; a !== null; ) {
            for (l2 = T = a; T !== null; ) {
              n2 = T;
              u2 = n2.child;
              switch (n2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Nj(4, n2, n2.return);
                  break;
                case 1:
                  Jj(n2, n2.return);
                  f2 = n2.stateNode;
                  if (typeof f2.componentWillUnmount === "function") {
                    q2 = n2;
                    y2 = n2.return;
                    try {
                      e = q2, f2.props = e.memoizedProps, f2.state = e.memoizedState, f2.componentWillUnmount();
                    } catch (m2) {
                      U(q2, y2, m2);
                    }
                  }
                  break;
                case 5:
                  Jj(n2, n2.return);
                  break;
                case 22:
                  if (n2.memoizedState !== null) {
                    ek(l2);
                    continue;
                  }
              }
              u2 !== null ? (u2.return = n2, T = u2) : ek(l2);
            }
            a = a.sibling;
          }
      }
      break;
    case 19:
      ak(b, a);
      ck(a);
      d & 4 && Yj(a);
      break;
    case 21:
      break;
    default:
      ak(b, a), ck(a);
  }
}
function ck(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; c !== null; ) {
          if (Rj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p$1(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (nb(e, ""), d.flags &= -33);
          var f2 = Sj(a);
          Uj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Sj(a);
          Tj(a, h, g);
          break;
        default:
          throw Error(p$1(161));
      }
    } catch (k2) {
      U(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function fk(a, b, c) {
  T = a;
  gk(a);
}
function gk(a, b, c) {
  for (var d = (a.mode & 1) !== 0; T !== null; ) {
    var e = T, f2 = e.child;
    if (e.tag === 22 && d) {
      var g = e.memoizedState !== null || Hj;
      if (!g) {
        var h = e.alternate, k2 = h !== null && h.memoizedState !== null || S;
        h = Hj;
        var l2 = S;
        Hj = g;
        if ((S = k2) && !l2)
          for (T = e; T !== null; )
            g = T, k2 = g.child, g.tag === 22 && g.memoizedState !== null ? hk(e) : k2 !== null ? (k2.return = g, T = k2) : hk(e);
        for (; f2 !== null; )
          T = f2, gk(f2), f2 = f2.sibling;
        T = e;
        Hj = h;
        S = l2;
      }
      ik(a);
    } else
      (e.subtreeFlags & 8772) !== 0 && f2 !== null ? (f2.return = e, T = f2) : ik(a);
  }
}
function ik(a) {
  for (; T !== null; ) {
    var b = T;
    if ((b.flags & 8772) !== 0) {
      var c = b.alternate;
      try {
        if ((b.flags & 8772) !== 0)
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              S || Oj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !S)
                if (c === null)
                  d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : kg(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b.updateQueue;
              f2 !== null && Gg(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (g !== null) {
                c = null;
                if (b.child !== null)
                  switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                Gg(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (c === null && b.flags & 4) {
                c = h;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c.focus();
                    break;
                  case "img":
                    k2.src && (c.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (b.memoizedState === null) {
                var l2 = b.alternate;
                if (l2 !== null) {
                  var n2 = l2.memoizedState;
                  if (n2 !== null) {
                    var u2 = n2.dehydrated;
                    u2 !== null && ad(u2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;
            default:
              throw Error(p$1(163));
          }
        S || b.flags & 512 && Pj(b);
      } catch (q2) {
        U(b, b.return, q2);
      }
    }
    if (b === a) {
      T = null;
      break;
    }
    c = b.sibling;
    if (c !== null) {
      c.return = b.return;
      T = c;
      break;
    }
    T = b.return;
  }
}
function ek(a) {
  for (; T !== null; ) {
    var b = T;
    if (b === a) {
      T = null;
      break;
    }
    var c = b.sibling;
    if (c !== null) {
      c.return = b.return;
      T = c;
      break;
    }
    T = b.return;
  }
}
function hk(a) {
  for (; T !== null; ) {
    var b = T;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Oj(4, b);
          } catch (k2) {
            U(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if (typeof d.componentDidMount === "function") {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              U(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Pj(b);
          } catch (k2) {
            U(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Pj(b);
          } catch (k2) {
            U(b, g, k2);
          }
      }
    } catch (k2) {
      U(b, b.return, k2);
    }
    if (b === a) {
      T = null;
      break;
    }
    var h = b.sibling;
    if (h !== null) {
      h.return = b.return;
      T = h;
      break;
    }
    T = b.return;
  }
}
var jk = Math.ceil, kk = ta.ReactCurrentDispatcher, lk = ta.ReactCurrentOwner, mk = ta.ReactCurrentBatchConfig, W = 0, P = null, X = null, Y = 0, cj = 0, mj = Tf(0), R = 0, nk = null, Fg = 0, ok = 0, pk = 0, qk = null, rk = null, dk = 0, aj = Infinity, sk = null, Li = false, Mi = null, Oi = null, tk = false, uk = null, vk = 0, wk = 0, xk = null, yk = -1, zk = 0;
function Jg() {
  return (W & 6) !== 0 ? B() : yk !== -1 ? yk : yk = B();
}
function Kg(a) {
  if ((a.mode & 1) === 0)
    return 1;
  if ((W & 2) !== 0 && Y !== 0)
    return Y & -Y;
  if (jg.transition !== null)
    return zk === 0 && (zk = xc()), zk;
  a = C;
  if (a !== 0)
    return a;
  a = window.event;
  a = a === void 0 ? 16 : id(a.type);
  return a;
}
function Lg(a, b, c) {
  if (50 < wk)
    throw wk = 0, xk = null, Error(p$1(185));
  var d = Ak(a, b);
  if (d === null)
    return null;
  zc(d, b, c);
  if ((W & 2) === 0 || d !== P)
    d === P && ((W & 2) === 0 && (ok |= b), R === 4 && Bk(d, Y)), Ck(d, c), b === 1 && W === 0 && (a.mode & 1) === 0 && (aj = B() + 500, eg && ig());
  return d;
}
function Ak(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  c !== null && (c.lanes |= b);
  c = a;
  for (a = a.return; a !== null; )
    a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
  return c.tag === 3 ? c.stateNode : null;
}
function Bg(a) {
  return (P !== null || vg !== null) && (a.mode & 1) !== 0 && (W & 2) === 0;
}
function Ck(a, b) {
  var c = a.callbackNode;
  vc(a, b);
  var d = tc(a, a === P ? Y : 0);
  if (d === 0)
    c !== null && ac(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    c != null && ac(c);
    if (b === 1)
      a.tag === 0 ? hg(Dk.bind(null, a)) : gg(Dk.bind(null, a)), If(function() {
        W === 0 && ig();
      }), c = null;
    else {
      switch (Cc(d)) {
        case 1:
          c = ec;
          break;
        case 4:
          c = fc;
          break;
        case 16:
          c = gc;
          break;
        case 536870912:
          c = ic;
          break;
        default:
          c = gc;
      }
      c = Ek(c, Fk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Fk(a, b) {
  yk = -1;
  zk = 0;
  if ((W & 6) !== 0)
    throw Error(p$1(327));
  var c = a.callbackNode;
  if (Gk() && a.callbackNode !== c)
    return null;
  var d = tc(a, a === P ? Y : 0);
  if (d === 0)
    return null;
  if ((d & 30) !== 0 || (d & a.expiredLanes) !== 0 || b)
    b = Hk(a, d);
  else {
    b = d;
    var e = W;
    W |= 2;
    var f2 = Ik();
    if (P !== a || Y !== b)
      sk = null, aj = B() + 500, Jk(a, b);
    do
      try {
        Kk();
        break;
      } catch (h) {
        Lk(a, h);
      }
    while (1);
    pg();
    kk.current = f2;
    W = e;
    X !== null ? b = 0 : (P = null, Y = 0, b = R);
  }
  if (b !== 0) {
    b === 2 && (e = wc(a), e !== 0 && (d = e, b = Mk(a, e)));
    if (b === 1)
      throw c = nk, Jk(a, 0), Bk(a, d), Ck(a, B()), c;
    if (b === 6)
      Bk(a, d);
    else {
      e = a.current.alternate;
      if ((d & 30) === 0 && !Nk(e) && (b = Hk(a, d), b === 2 && (f2 = wc(a), f2 !== 0 && (d = f2, b = Mk(a, f2))), b === 1))
        throw c = nk, Jk(a, 0), Bk(a, d), Ck(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$1(345));
        case 2:
          Ok(a, rk, sk);
          break;
        case 3:
          Bk(a, d);
          if ((d & 130023424) === d && (b = dk + 500 - B(), 10 < b)) {
            if (tc(a, 0) !== 0)
              break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              Jg();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ef(Ok.bind(null, a, rk, sk), b);
            break;
          }
          Ok(a, rk, sk);
          break;
        case 4:
          Bk(a, d);
          if ((d & 4194240) === d)
            break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - nc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * jk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ef(Ok.bind(null, a, rk, sk), d);
            break;
          }
          Ok(a, rk, sk);
          break;
        case 5:
          Ok(a, rk, sk);
          break;
        default:
          throw Error(p$1(329));
      }
    }
  }
  Ck(a, B());
  return a.callbackNode === c ? Fk.bind(null, a) : null;
}
function Mk(a, b) {
  var c = qk;
  a.current.memoizedState.isDehydrated && (Jk(a, b).flags |= 256);
  a = Hk(a, b);
  a !== 2 && (b = rk, rk = c, b !== null && Zi(b));
  return a;
}
function Zi(a) {
  rk === null ? rk = a : rk.push.apply(rk, a);
}
function Nk(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (c !== null && (c = c.stores, c !== null))
        for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!Ge(f2(), e))
              return false;
          } catch (g) {
            return false;
          }
        }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && c !== null)
      c.return = b, b = c;
    else {
      if (b === a)
        break;
      for (; b.sibling === null; ) {
        if (b.return === null || b.return === a)
          return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Bk(a, b) {
  b &= ~pk;
  b &= ~ok;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - nc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Dk(a) {
  if ((W & 6) !== 0)
    throw Error(p$1(327));
  Gk();
  var b = tc(a, 0);
  if ((b & 1) === 0)
    return Ck(a, B()), null;
  var c = Hk(a, b);
  if (a.tag !== 0 && c === 2) {
    var d = wc(a);
    d !== 0 && (b = d, c = Mk(a, d));
  }
  if (c === 1)
    throw c = nk, Jk(a, 0), Bk(a, b), Ck(a, B()), c;
  if (c === 6)
    throw Error(p$1(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Ok(a, rk, sk);
  Ck(a, B());
  return null;
}
function Pk(a, b) {
  var c = W;
  W |= 1;
  try {
    return a(b);
  } finally {
    W = c, W === 0 && (aj = B() + 500, eg && ig());
  }
}
function Qk(a) {
  uk !== null && uk.tag === 0 && (W & 6) === 0 && Gk();
  var b = W;
  W |= 1;
  var c = mk.transition, d = C;
  try {
    if (mk.transition = null, C = 1, a)
      return a();
  } finally {
    C = d, mk.transition = c, W = b, (W & 6) === 0 && ig();
  }
}
function bj() {
  cj = mj.current;
  E(mj);
}
function Jk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  c !== -1 && (a.timeoutHandle = -1, Ff(c));
  if (X !== null)
    for (c = X.return; c !== null; ) {
      var d = c;
      ch(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          d !== null && d !== void 0 && Zf();
          break;
        case 3:
          Gh();
          E(Vf);
          E(H);
          Lh();
          break;
        case 5:
          Ih(d);
          break;
        case 4:
          Gh();
          break;
        case 13:
          E(K);
          break;
        case 19:
          E(K);
          break;
        case 10:
          qg(d.type._context);
          break;
        case 22:
        case 23:
          bj();
      }
      c = c.return;
    }
  P = a;
  X = a = th(a.current, null);
  Y = cj = b;
  R = 0;
  nk = null;
  pk = ok = Fg = 0;
  rk = qk = null;
  if (vg !== null) {
    for (b = 0; b < vg.length; b++)
      if (c = vg[b], d = c.interleaved, d !== null) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (f2 !== null) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c.pending = d;
      }
    vg = null;
  }
  return a;
}
function Lk(a, b) {
  do {
    var c = X;
    try {
      pg();
      Mh.current = Yh;
      if (Ph) {
        for (var d = L.memoizedState; d !== null; ) {
          var e = d.queue;
          e !== null && (e.pending = null);
          d = d.next;
        }
        Ph = false;
      }
      Oh = 0;
      N = M = L = null;
      Qh = false;
      Rh = 0;
      lk.current = null;
      if (c === null || c.return === null) {
        R = 1;
        nk = b;
        X = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Y;
        h.flags |= 32768;
        if (k2 !== null && typeof k2 === "object" && typeof k2.then === "function") {
          var l2 = k2, n2 = h, u2 = n2.tag;
          if ((n2.mode & 1) === 0 && (u2 === 0 || u2 === 11 || u2 === 15)) {
            var q2 = n2.alternate;
            q2 ? (n2.updateQueue = q2.updateQueue, n2.memoizedState = q2.memoizedState, n2.lanes = q2.lanes) : (n2.updateQueue = null, n2.memoizedState = null);
          }
          var y2 = Ri(g);
          if (y2 !== null) {
            y2.flags &= -257;
            Si(y2, g, h, f2, b);
            y2.mode & 1 && Pi(f2, l2, b);
            b = y2;
            k2 = l2;
            var m2 = b.updateQueue;
            if (m2 === null) {
              var w2 = /* @__PURE__ */ new Set();
              w2.add(k2);
              b.updateQueue = w2;
            } else
              m2.add(k2);
            break a;
          } else {
            if ((b & 1) === 0) {
              Pi(f2, l2, b);
              $i();
              break a;
            }
            k2 = Error(p$1(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ri(g);
          if (J2 !== null) {
            (J2.flags & 65536) === 0 && (J2.flags |= 256);
            Si(J2, g, h, f2, b);
            oh(k2);
            break a;
          }
        }
        f2 = k2;
        R !== 4 && (R = 2);
        qk === null ? qk = [f2] : qk.push(f2);
        k2 = Hi(k2, h);
        h = g;
        do {
          switch (h.tag) {
            case 3:
              h.flags |= 65536;
              b &= -b;
              h.lanes |= b;
              var v2 = Ki(h, k2, b);
              Dg(h, v2);
              break a;
            case 1:
              f2 = k2;
              var x2 = h.type, r2 = h.stateNode;
              if ((h.flags & 128) === 0 && (typeof x2.getDerivedStateFromError === "function" || r2 !== null && typeof r2.componentDidCatch === "function" && (Oi === null || !Oi.has(r2)))) {
                h.flags |= 65536;
                b &= -b;
                h.lanes |= b;
                var F2 = Ni(h, f2, b);
                Dg(h, F2);
                break a;
              }
          }
          h = h.return;
        } while (h !== null);
      }
      Rk(c);
    } catch (Z) {
      b = Z;
      X === c && c !== null && (X = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Ik() {
  var a = kk.current;
  kk.current = Yh;
  return a === null ? Yh : a;
}
function $i() {
  if (R === 0 || R === 3 || R === 2)
    R = 4;
  P === null || (Fg & 268435455) === 0 && (ok & 268435455) === 0 || Bk(P, Y);
}
function Hk(a, b) {
  var c = W;
  W |= 2;
  var d = Ik();
  if (P !== a || Y !== b)
    sk = null, Jk(a, b);
  do
    try {
      Sk();
      break;
    } catch (e) {
      Lk(a, e);
    }
  while (1);
  pg();
  W = c;
  kk.current = d;
  if (X !== null)
    throw Error(p$1(261));
  P = null;
  Y = 0;
  return R;
}
function Sk() {
  for (; X !== null; )
    Tk(X);
}
function Kk() {
  for (; X !== null && !bc(); )
    Tk(X);
}
function Tk(a) {
  var b = Uk(a.alternate, a, cj);
  a.memoizedProps = a.pendingProps;
  b === null ? Rk(a) : X = b;
  lk.current = null;
}
function Rk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if ((b.flags & 32768) === 0) {
      if (c = Yi(c, b, cj), c !== null) {
        X = c;
        return;
      }
    } else {
      c = Gj(c, b);
      if (c !== null) {
        c.flags &= 32767;
        X = c;
        return;
      }
      if (a !== null)
        a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        R = 6;
        X = null;
        return;
      }
    }
    b = b.sibling;
    if (b !== null) {
      X = b;
      return;
    }
    X = b = a;
  } while (b !== null);
  R === 0 && (R = 5);
}
function Ok(a, b, c) {
  var d = C, e = mk.transition;
  try {
    mk.transition = null, C = 1, Vk(a, b, c, d);
  } finally {
    mk.transition = e, C = d;
  }
  return null;
}
function Vk(a, b, c, d) {
  do
    Gk();
  while (uk !== null);
  if ((W & 6) !== 0)
    throw Error(p$1(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (c === null)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(p$1(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Ac(a, f2);
  a === P && (X = P = null, Y = 0);
  (c.subtreeFlags & 2064) === 0 && (c.flags & 2064) === 0 || tk || (tk = true, Ek(gc, function() {
    Gk();
    return null;
  }));
  f2 = (c.flags & 15990) !== 0;
  if ((c.subtreeFlags & 15990) !== 0 || f2) {
    f2 = mk.transition;
    mk.transition = null;
    var g = C;
    C = 1;
    var h = W;
    W |= 4;
    lk.current = null;
    Mj(a, c);
    bk(c, a);
    Ne(Cf);
    cd = !!Bf;
    Cf = Bf = null;
    a.current = c;
    fk(c);
    cc();
    W = h;
    C = g;
    mk.transition = f2;
  } else
    a.current = c;
  tk && (tk = false, uk = a, vk = e);
  f2 = a.pendingLanes;
  f2 === 0 && (Oi = null);
  lc(c.stateNode);
  Ck(a, B());
  if (b !== null)
    for (d = a.onRecoverableError, c = 0; c < b.length; c++)
      d(b[c]);
  if (Li)
    throw Li = false, a = Mi, Mi = null, a;
  (vk & 1) !== 0 && a.tag !== 0 && Gk();
  f2 = a.pendingLanes;
  (f2 & 1) !== 0 ? a === xk ? wk++ : (wk = 0, xk = a) : wk = 0;
  ig();
  return null;
}
function Gk() {
  if (uk !== null) {
    var a = Cc(vk), b = mk.transition, c = C;
    try {
      mk.transition = null;
      C = 16 > a ? 16 : a;
      if (uk === null)
        var d = false;
      else {
        a = uk;
        uk = null;
        vk = 0;
        if ((W & 6) !== 0)
          throw Error(p$1(331));
        var e = W;
        W |= 4;
        for (T = a.current; T !== null; ) {
          var f2 = T, g = f2.child;
          if ((T.flags & 16) !== 0) {
            var h = f2.deletions;
            if (h !== null) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (T = l2; T !== null; ) {
                  var n2 = T;
                  switch (n2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Nj(8, n2, f2);
                  }
                  var u2 = n2.child;
                  if (u2 !== null)
                    u2.return = n2, T = u2;
                  else
                    for (; T !== null; ) {
                      n2 = T;
                      var q2 = n2.sibling, y2 = n2.return;
                      Qj(n2);
                      if (n2 === l2) {
                        T = null;
                        break;
                      }
                      if (q2 !== null) {
                        q2.return = y2;
                        T = q2;
                        break;
                      }
                      T = y2;
                    }
                }
              }
              var m2 = f2.alternate;
              if (m2 !== null) {
                var w2 = m2.child;
                if (w2 !== null) {
                  m2.child = null;
                  do {
                    var J2 = w2.sibling;
                    w2.sibling = null;
                    w2 = J2;
                  } while (w2 !== null);
                }
              }
              T = f2;
            }
          }
          if ((f2.subtreeFlags & 2064) !== 0 && g !== null)
            g.return = f2, T = g;
          else
            b:
              for (; T !== null; ) {
                f2 = T;
                if ((f2.flags & 2048) !== 0)
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Nj(9, f2, f2.return);
                  }
                var v2 = f2.sibling;
                if (v2 !== null) {
                  v2.return = f2.return;
                  T = v2;
                  break b;
                }
                T = f2.return;
              }
        }
        var x2 = a.current;
        for (T = x2; T !== null; ) {
          g = T;
          var r2 = g.child;
          if ((g.subtreeFlags & 2064) !== 0 && r2 !== null)
            r2.return = g, T = r2;
          else
            b:
              for (g = x2; T !== null; ) {
                h = T;
                if ((h.flags & 2048) !== 0)
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Oj(9, h);
                    }
                  } catch (Z) {
                    U(h, h.return, Z);
                  }
                if (h === g) {
                  T = null;
                  break b;
                }
                var F2 = h.sibling;
                if (F2 !== null) {
                  F2.return = h.return;
                  T = F2;
                  break b;
                }
                T = h.return;
              }
        }
        W = e;
        ig();
        if (kc && typeof kc.onPostCommitFiberRoot === "function")
          try {
            kc.onPostCommitFiberRoot(jc, a);
          } catch (Z) {
          }
        d = true;
      }
      return d;
    } finally {
      C = c, mk.transition = b;
    }
  }
  return false;
}
function Wk(a, b, c) {
  b = Hi(c, b);
  b = Ki(a, b, 1);
  Ag(a, b);
  b = Jg();
  a = Ak(a, 1);
  a !== null && (zc(a, 1, b), Ck(a, b));
}
function U(a, b, c) {
  if (a.tag === 3)
    Wk(a, a, c);
  else
    for (; b !== null; ) {
      if (b.tag === 3) {
        Wk(b, a, c);
        break;
      } else if (b.tag === 1) {
        var d = b.stateNode;
        if (typeof b.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (Oi === null || !Oi.has(d))) {
          a = Hi(c, a);
          a = Ni(b, a, 1);
          Ag(b, a);
          a = Jg();
          b = Ak(b, 1);
          b !== null && (zc(b, 1, a), Ck(b, a));
          break;
        }
      }
      b = b.return;
    }
}
function Qi(a, b, c) {
  var d = a.pingCache;
  d !== null && d.delete(b);
  b = Jg();
  a.pingedLanes |= a.suspendedLanes & c;
  P === a && (Y & c) === c && (R === 4 || R === 3 && (Y & 130023424) === Y && 500 > B() - dk ? Jk(a, 0) : pk |= c);
  Ck(a, b);
}
function Xk(a, b) {
  b === 0 && ((a.mode & 1) === 0 ? b = 1 : (b = rc, rc <<= 1, (rc & 130023424) === 0 && (rc = 4194304)));
  var c = Jg();
  a = Ak(a, b);
  a !== null && (zc(a, b, c), Ck(a, c));
}
function zj(a) {
  var b = a.memoizedState, c = 0;
  b !== null && (c = b.retryLane);
  Xk(a, c);
}
function Zj(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      e !== null && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p$1(314));
  }
  d !== null && d.delete(b);
  Xk(a, c);
}
var Uk;
Uk = function(a, b, c) {
  if (a !== null)
    if (a.memoizedProps !== b.pendingProps || Vf.current)
      tg = true;
    else {
      if ((a.lanes & c) === 0 && (b.flags & 128) === 0)
        return tg = false, Fj(a, b, c);
      tg = (a.flags & 131072) !== 0 ? true : false;
    }
  else
    tg = false, I && (b.flags & 1048576) !== 0 && ah(b, Ug, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
      a = b.pendingProps;
      var e = Xf(b, H.current);
      sg(b, c);
      e = Uh(null, b, d, a, e, c);
      var f2 = Zh();
      b.flags |= 1;
      typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0 ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Yf(d) ? (f2 = true, bg(b)) : f2 = false, b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, xg(b), e.updater = Mg, b.stateNode = e, e._reactInternals = b, Qg(b, d, a, c), b = pj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && bh(b), ej(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Yk(d);
        a = kg(d, a);
        switch (e) {
          case 0:
            b = kj(null, b, d, a, c);
            break a;
          case 1:
            b = oj(null, b, d, a, c);
            break a;
          case 11:
            b = fj(null, b, d, a, c);
            break a;
          case 14:
            b = hj(null, b, d, kg(d.type, a), c);
            break a;
        }
        throw Error(p$1(306, d, ""));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : kg(d, e), kj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : kg(d, e), oj(a, b, d, e, c);
    case 3:
      a: {
        qj(b);
        if (a === null)
          throw Error(p$1(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        yg(a, b);
        Eg(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated)
          if (f2 = {
            element: d,
            isDehydrated: false,
            cache: g.cache,
            pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
            transitions: g.transitions
          }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Error(p$1(423));
            b = rj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Error(p$1(424));
            b = rj(a, b, d, c, e);
            break a;
          } else
            for (eh = Kf(b.stateNode.containerInfo.firstChild), dh = b, I = true, fh = null, c = zh(b, null, d, c), b.child = c; c; )
              c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          nh();
          if (d === e) {
            b = gj(a, b, c);
            break a;
          }
          ej(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Hh(b), a === null && kh(b), d = b.type, e = b.pendingProps, f2 = a !== null ? a.memoizedProps : null, g = e.children, Df(d, e) ? g = null : f2 !== null && Df(d, f2) && (b.flags |= 32), nj(a, b), ej(a, b, g, c), b.child;
    case 6:
      return a === null && kh(b), null;
    case 13:
      return vj(a, b, c);
    case 4:
      return Fh(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = yh(b, null, d, c) : ej(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : kg(d, e), fj(a, b, d, e, c);
    case 7:
      return ej(a, b, b.pendingProps, c), b.child;
    case 8:
      return ej(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return ej(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(lg, d._currentValue);
        d._currentValue = g;
        if (f2 !== null)
          if (Ge(f2.value, g)) {
            if (f2.children === e.children && !Vf.current) {
              b = gj(a, b, c);
              break a;
            }
          } else
            for (f2 = b.child, f2 !== null && (f2.return = b); f2 !== null; ) {
              var h = f2.dependencies;
              if (h !== null) {
                g = f2.child;
                for (var k2 = h.firstContext; k2 !== null; ) {
                  if (k2.context === d) {
                    if (f2.tag === 1) {
                      k2 = zg(-1, c & -c);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (l2 !== null) {
                        l2 = l2.shared;
                        var n2 = l2.pending;
                        n2 === null ? k2.next = k2 : (k2.next = n2.next, n2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c;
                    k2 = f2.alternate;
                    k2 !== null && (k2.lanes |= c);
                    rg(f2.return, c, b);
                    h.lanes |= c;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (f2.tag === 10)
                g = f2.type === b.type ? null : f2.child;
              else if (f2.tag === 18) {
                g = f2.return;
                if (g === null)
                  throw Error(p$1(341));
                g.lanes |= c;
                h = g.alternate;
                h !== null && (h.lanes |= c);
                rg(g, c, b);
                g = f2.sibling;
              } else
                g = f2.child;
              if (g !== null)
                g.return = f2;
              else
                for (g = f2; g !== null; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f2 = g.sibling;
                  if (f2 !== null) {
                    f2.return = g.return;
                    g = f2;
                    break;
                  }
                  g = g.return;
                }
              f2 = g;
            }
        ej(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, sg(b, c), e = ug(e), d = d(e), b.flags |= 1, ej(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = kg(d, b.pendingProps), e = kg(d.type, e), hj(a, b, d, e, c);
    case 15:
      return jj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : kg(d, e), a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Yf(d) ? (a = true, bg(b)) : a = false, sg(b, c), Og(b, d, e), Qg(b, d, e, c), pj(null, b, d, true, a, c);
    case 19:
      return Ej(a, b, c);
    case 22:
      return lj(a, b, c);
  }
  throw Error(p$1(156, b.tag));
};
function Ek(a, b) {
  return $b(a, b);
}
function Zk(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function hh(a, b, c, d) {
  return new Zk(a, b, c, d);
}
function ij(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Yk(a) {
  if (typeof a === "function")
    return ij(a) ? 1 : 0;
  if (a !== void 0 && a !== null) {
    a = a.$$typeof;
    if (a === Ca)
      return 11;
    if (a === Fa)
      return 14;
  }
  return 2;
}
function th(a, b) {
  var c = a.alternate;
  c === null ? (c = hh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function vh(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if (typeof a === "function")
    ij(a) && (g = 1);
  else if (typeof a === "string")
    g = 5;
  else
    a:
      switch (a) {
        case wa:
          return xh(c.children, e, f2, b);
        case xa:
          g = 8;
          e |= 8;
          break;
        case za:
          return a = hh(12, c, b, e | 2), a.elementType = za, a.lanes = f2, a;
        case Da:
          return a = hh(13, c, b, e), a.elementType = Da, a.lanes = f2, a;
        case Ea:
          return a = hh(19, c, b, e), a.elementType = Ea, a.lanes = f2, a;
        case Ha:
          return wj(c, e, f2, b);
        default:
          if (typeof a === "object" && a !== null)
            switch (a.$$typeof) {
              case Aa:
                g = 10;
                break a;
              case Ba:
                g = 9;
                break a;
              case Ca:
                g = 11;
                break a;
              case Fa:
                g = 14;
                break a;
              case Ga:
                g = 16;
                d = null;
                break a;
            }
          throw Error(p$1(130, a == null ? a : typeof a, ""));
      }
  b = hh(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function xh(a, b, c, d) {
  a = hh(7, a, d, b);
  a.lanes = c;
  return a;
}
function wj(a, b, c, d) {
  a = hh(22, a, d, b);
  a.elementType = Ha;
  a.lanes = c;
  a.stateNode = {};
  return a;
}
function uh(a, b, c) {
  a = hh(6, a, null, b);
  a.lanes = c;
  return a;
}
function wh(a, b, c) {
  b = hh(4, a.children !== null ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function $k(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = yc(0);
  this.expirationTimes = yc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = yc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function al(a, b, c, d, e, f2, g, h, k2) {
  a = new $k(a, b, c, h, k2);
  b === 1 ? (b = 1, f2 === true && (b |= 8)) : b = 0;
  f2 = hh(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  xg(f2);
  return a;
}
function bl(a, b, c) {
  var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: va, key: d == null ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function cl(a) {
  if (!a)
    return Uf;
  a = a._reactInternals;
  a: {
    if (Ub(a) !== a || a.tag !== 1)
      throw Error(p$1(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Yf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (b !== null);
    throw Error(p$1(171));
  }
  if (a.tag === 1) {
    var c = a.type;
    if (Yf(c))
      return ag(a, c, b);
  }
  return b;
}
function dl(a, b, c, d, e, f2, g, h, k2) {
  a = al(c, d, true, a, e, f2, g, h, k2);
  a.context = cl(null);
  c = a.current;
  d = Jg();
  e = Kg(c);
  f2 = zg(d, e);
  f2.callback = b !== void 0 && b !== null ? b : null;
  Ag(c, f2);
  a.current.lanes = e;
  zc(a, e, d);
  Ck(a, d);
  return a;
}
function el(a, b, c, d) {
  var e = b.current, f2 = Jg(), g = Kg(e);
  c = cl(c);
  b.context === null ? b.context = c : b.pendingContext = c;
  b = zg(f2, g);
  b.payload = { element: a };
  d = d === void 0 ? null : d;
  d !== null && (b.callback = d);
  Ag(e, b);
  a = Lg(e, g, f2);
  a !== null && Cg(a, e, g);
  return g;
}
function fl(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function gl(a, b) {
  a = a.memoizedState;
  if (a !== null && a.dehydrated !== null) {
    var c = a.retryLane;
    a.retryLane = c !== 0 && c < b ? c : b;
  }
}
function hl(a, b) {
  gl(a, b);
  (a = a.alternate) && gl(a, b);
}
function il() {
  return null;
}
var jl = typeof reportError === "function" ? reportError : function(a) {
  console.error(a);
};
function kl(a) {
  this._internalRoot = a;
}
ll.prototype.render = kl.prototype.render = function(a) {
  var b = this._internalRoot;
  if (b === null)
    throw Error(p$1(409));
  el(a, b, null, null);
};
ll.prototype.unmount = kl.prototype.unmount = function() {
  var a = this._internalRoot;
  if (a !== null) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Qk(function() {
      el(null, a, null, null);
    });
    b[tf] = null;
  }
};
function ll(a) {
  this._internalRoot = a;
}
ll.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Gc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Pc.length && b !== 0 && b < Pc[c].priority; c++)
      ;
    Pc.splice(c, 0, a);
    c === 0 && Uc(a);
  }
};
function ml(a) {
  return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11);
}
function nl(a) {
  return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 && (a.nodeType !== 8 || a.nodeValue !== " react-mount-point-unstable "));
}
function ol() {
}
function pl(a, b, c, d, e) {
  if (e) {
    if (typeof d === "function") {
      var f2 = d;
      d = function() {
        var a2 = fl(g);
        f2.call(a2);
      };
    }
    var g = dl(b, d, a, 0, null, false, false, "", ol);
    a._reactRootContainer = g;
    a[tf] = g.current;
    rf(a.nodeType === 8 ? a.parentNode : a);
    Qk();
    return g;
  }
  for (; e = a.lastChild; )
    a.removeChild(e);
  if (typeof d === "function") {
    var h = d;
    d = function() {
      var a2 = fl(k2);
      h.call(a2);
    };
  }
  var k2 = al(a, 0, false, null, null, false, false, "", ol);
  a._reactRootContainer = k2;
  a[tf] = k2.current;
  rf(a.nodeType === 8 ? a.parentNode : a);
  Qk(function() {
    el(b, k2, c, d);
  });
  return k2;
}
function ql(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if (typeof e === "function") {
      var h = e;
      e = function() {
        var a2 = fl(g);
        h.call(a2);
      };
    }
    el(b, g, a, e);
  } else
    g = pl(c, b, a, e, d);
  return fl(g);
}
Dc = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = sc(b.pendingLanes);
        c !== 0 && (Bc(b, c | 1), Ck(b, B()), (W & 6) === 0 && (aj = B() + 500, ig()));
      }
      break;
    case 13:
      var d = Jg();
      Qk(function() {
        return Lg(a, 1, d);
      });
      hl(a, 1);
  }
};
Ec = function(a) {
  if (a.tag === 13) {
    var b = Jg();
    Lg(a, 134217728, b);
    hl(a, 134217728);
  }
};
Fc = function(a) {
  if (a.tag === 13) {
    var b = Jg(), c = Kg(a);
    Lg(a, c, b);
    hl(a, c);
  }
};
Gc = function() {
  return C;
};
Hc = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
xb = function(a, b, c) {
  switch (b) {
    case "input":
      $a(a, c);
      b = c.name;
      if (c.type === "radio" && b != null) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Cb(d);
            if (!e)
              throw Error(p$1(90));
            Va(d);
            $a(d, e);
          }
        }
      }
      break;
    case "textarea":
      hb(a, c);
      break;
    case "select":
      b = c.value, b != null && eb(a, !!c.multiple, b, false);
  }
};
Fb = Pk;
Gb = Qk;
var rl = { usingClientEntryPoint: false, Events: [Bb, te, Cb, Db, Eb, Pk] }, sl = { findFiberByHostInstance: Vc, bundleType: 0, version: "18.1.0", rendererPackageName: "react-dom" };
var tl = { bundleType: sl.bundleType, version: sl.version, rendererPackageName: sl.rendererPackageName, rendererConfig: sl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ta.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Yb(a);
  return a === null ? null : a.stateNode;
}, findFiberByHostInstance: sl.findFiberByHostInstance || il, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.1.0-next-22edb9f77-20220426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  var ul = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ul.isDisabled && ul.supportsFiber)
    try {
      jc = ul.inject(tl), kc = ul;
    } catch (a) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ml(b))
    throw Error(p$1(200));
  return bl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!ml(a))
    throw Error(p$1(299));
  var c = false, d = "", e = jl;
  b !== null && b !== void 0 && (b.unstable_strictMode === true && (c = true), b.identifierPrefix !== void 0 && (d = b.identifierPrefix), b.onRecoverableError !== void 0 && (e = b.onRecoverableError));
  b = al(a, 1, false, null, null, c, false, d, e);
  a[tf] = b.current;
  rf(a.nodeType === 8 ? a.parentNode : a);
  return new kl(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (a == null)
    return null;
  if (a.nodeType === 1)
    return a;
  var b = a._reactInternals;
  if (b === void 0) {
    if (typeof a.render === "function")
      throw Error(p$1(188));
    a = Object.keys(a).join(",");
    throw Error(p$1(268, a));
  }
  a = Yb(b);
  a = a === null ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Qk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!nl(b))
    throw Error(p$1(200));
  return ql(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!ml(a))
    throw Error(p$1(405));
  var d = c != null && c.hydratedSources || null, e = false, f2 = "", g = jl;
  c !== null && c !== void 0 && (c.unstable_strictMode === true && (e = true), c.identifierPrefix !== void 0 && (f2 = c.identifierPrefix), c.onRecoverableError !== void 0 && (g = c.onRecoverableError));
  b = dl(b, null, a, 1, c != null ? c : null, e, false, f2, g);
  a[tf] = b.current;
  rf(a);
  if (d)
    for (a = 0; a < d.length; a++)
      c = d[a], e = c._getVersion, e = e(c._source), b.mutableSourceEagerHydrationData == null ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c, e);
  return new ll(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!nl(b))
    throw Error(p$1(200));
  return ql(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!nl(a))
    throw Error(p$1(40));
  return a._reactRootContainer ? (Qk(function() {
    ql(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[tf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Pk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!nl(c))
    throw Error(p$1(200));
  if (a == null || a._reactInternals === void 0)
    throw Error(p$1(38));
  return ql(a, b, c, false, d);
};
reactDom_production_min.version = "18.1.0-next-22edb9f77-20220426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var m$1 = reactDom.exports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var readOnly = function(obj) {
  return obj;
};
var BeforeUnloadEventType = "beforeunload";
var PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$window = _options.window, window2 = _options$window === void 0 ? document.defaultView : _options$window;
  var globalHistory = window2.history;
  function getIndexAndLocation() {
    var _window$location = window2.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname,
      search,
      hash,
      state: state.usr || null,
      key: state.key || "default"
    })];
  }
  var blockedPopTx = null;
  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;
      var _getIndexAndLocation = getIndexAndLocation(), nextIndex = _getIndexAndLocation[0], nextLocation = _getIndexAndLocation[1];
      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;
          if (delta) {
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        }
      } else {
        applyTx(nextAction);
      }
    }
  }
  window2.addEventListener(PopStateEventType, handlePop);
  var action = Action.Pop;
  var _getIndexAndLocation2 = getIndexAndLocation(), index = _getIndexAndLocation2[0], location = _getIndexAndLocation2[1];
  var listeners = createEvents();
  var blockers = createEvents();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends$1({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }
    return readOnly(_extends$1({
      pathname: location.pathname,
      hash: "",
      search: ""
    }, typeof to === "string" ? parsePath(to) : to, {
      state,
      key: createKey()
    }));
  }
  function getHistoryStateAndUrl(nextLocation, index2) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index2
    }, createHref(nextLocation)];
  }
  function allowTx(action2, location2, retry) {
    return !blockers.length || (blockers.call({
      action: action2,
      location: location2,
      retry
    }), false);
  }
  function applyTx(nextAction) {
    action = nextAction;
    var _getIndexAndLocation3 = getIndexAndLocation();
    index = _getIndexAndLocation3[0];
    location = _getIndexAndLocation3[1];
    listeners.call({
      action,
      location
    });
  }
  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1), historyState = _getHistoryStateAndUr[0], url = _getHistoryStateAndUr[1];
      try {
        globalHistory.pushState(historyState, "", url);
      } catch (error) {
        window2.location.assign(url);
      }
      applyTx(nextAction);
    }
  }
  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index), historyState = _getHistoryStateAndUr2[0], url = _getHistoryStateAndUr2[1];
      globalHistory.replaceState(historyState, "", url);
      applyTx(nextAction);
    }
  }
  function go(delta) {
    globalHistory.go(delta);
  }
  var history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref,
    push,
    replace,
    go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);
      if (blockers.length === 1) {
        window2.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }
      return function() {
        unblock();
        if (!blockers.length) {
          window2.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
function promptBeforeUnload(event) {
  event.preventDefault();
  event.returnValue = "";
}
function createEvents() {
  var handlers = [];
  return {
    get length() {
      return handlers.length;
    },
    push: function push(fn) {
      handlers.push(fn);
      return function() {
        handlers = handlers.filter(function(handler) {
          return handler !== fn;
        });
      };
    },
    call: function call(arg) {
      handlers.forEach(function(fn) {
        return fn && fn(arg);
      });
    }
  };
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function createPath(_ref) {
  var _ref$pathname = _ref.pathname, pathname = _ref$pathname === void 0 ? "/" : _ref$pathname, _ref$search = _ref.search, search = _ref$search === void 0 ? "" : _ref$search, _ref$hash = _ref.hash, hash = _ref$hash === void 0 ? "" : _ref$hash;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  var parsedPath = {};
  if (path) {
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    var searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const NavigationContext = /* @__PURE__ */ react.exports.createContext(null);
const LocationContext = /* @__PURE__ */ react.exports.createContext(null);
const RouteContext = /* @__PURE__ */ react.exports.createContext({
  outlet: null,
  matches: []
});
function invariant(cond, message) {
  if (!cond)
    throw new Error(message);
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      !meta.relativePath.startsWith(parentPath) ? invariant(false) : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      !(route.index !== true) ? invariant(false) : void 0;
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  });
  return branches;
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "");
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else {
    regexpSource += end ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let nextChar = pathname.charAt(basename.length);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(basename.length) || "/";
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
function useInRouterContext() {
  return react.exports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return react.exports.useContext(LocationContext).location;
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    matches: parentMatches
  } = react.exports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
  })), parentMatches);
}
function _renderMatches(matches, parentMatches) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null)
    return null;
  return matches.reduceRight((outlet, match, index) => {
    return /* @__PURE__ */ react.exports.createElement(RouteContext.Provider, {
      children: match.route.element !== void 0 ? match.route.element : outlet,
      value: {
        outlet,
        matches: parentMatches.concat(matches.slice(0, index + 1))
      }
    });
  }, null);
}
function Route(_props) {
  invariant(false);
}
function Router(_ref3) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false
  } = _ref3;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = normalizePathname(basenameProp);
  let navigationContext = react.exports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react.exports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  if (location == null) {
    return null;
  }
  return /* @__PURE__ */ react.exports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ react.exports.createElement(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
function Routes(_ref4) {
  let {
    children,
    location
  } = _ref4;
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children) {
  let routes = [];
  react.exports.Children.forEach(children, (element) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(element)) {
      return;
    }
    if (element.type === react.exports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    let route = {
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window: window2
  } = _ref;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2
    });
  }
  let history = historyRef.current;
  let [state, setState] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  react.exports.useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
var styles$2 = "";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react.exports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const Layout = ({
  children
}) => /* @__PURE__ */ jsx(Fragment, {
  children: /* @__PURE__ */ jsx("main", {
    className: "container",
    children
  })
});
const scriptRel = "modulepreload";
const seen = {};
const base = "/honshou-mieru/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
var classnames$1 = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          } else {
            classes.push(arg.toString());
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
})(classnames$1);
var classnames = classnames$1.exports;
var styles$1 = "";
var logoUrl = "/honshou-mieru/assets/logo.7e8fe7fb.svg";
const Loader = ({
  className
}) => /* @__PURE__ */ jsx("img", {
  src: logoUrl,
  className: classnames("logo", "animating", className)
});
const Home = react.exports.lazy(() => __vitePreload(() => import("./home.f788f748.js"), true ? ["assets/home.f788f748.js","assets/home.aa5b3ee8.css"] : void 0));
const LazyHome = (props) => /* @__PURE__ */ jsx(react.exports.Suspense, {
  fallback: /* @__PURE__ */ jsx(Loader, {}),
  children: /* @__PURE__ */ jsx(Home, __spreadValues({}, props))
});
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var PropTypes = propTypes.exports;
function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}
var React = react.exports;
var React__default = _interopDefault(React);
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function withSideEffect(reducePropsToState3, handleStateChangeOnClient, mapStateOnServer3) {
  if (typeof reducePropsToState3 !== "function") {
    throw new Error("Expected reducePropsToState to be a function.");
  }
  if (typeof handleStateChangeOnClient !== "function") {
    throw new Error("Expected handleStateChangeOnClient to be a function.");
  }
  if (typeof mapStateOnServer3 !== "undefined" && typeof mapStateOnServer3 !== "function") {
    throw new Error("Expected mapStateOnServer to either be undefined or a function.");
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }
  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== "function") {
      throw new Error("Expected WrappedComponent to be a React component.");
    }
    var mountedInstances = [];
    var state;
    function emitChange() {
      state = reducePropsToState3(mountedInstances.map(function(instance) {
        return instance.props;
      }));
      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer3) {
        state = mapStateOnServer3(state);
      }
    }
    var SideEffect = /* @__PURE__ */ function(_PureComponent) {
      _inheritsLoose(SideEffect2, _PureComponent);
      function SideEffect2() {
        return _PureComponent.apply(this, arguments) || this;
      }
      SideEffect2.peek = function peek() {
        return state;
      };
      SideEffect2.rewind = function rewind() {
        if (SideEffect2.canUseDOM) {
          throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
        }
        var recordedState = state;
        state = void 0;
        mountedInstances = [];
        return recordedState;
      };
      var _proto = SideEffect2.prototype;
      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };
      _proto.render = function render() {
        return /* @__PURE__ */ React__default.createElement(WrappedComponent, this.props);
      };
      return SideEffect2;
    }(React.PureComponent);
    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
    _defineProperty(SideEffect, "canUseDOM", canUseDOM);
    return SideEffect;
  };
}
var lib = withSideEffect;
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    var it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0])))
          return false;
      return true;
    }
    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (a[i] !== b[i])
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    if (hasElementType && a instanceof Element)
      return false;
    for (i = length; i-- !== 0; ) {
      if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys[i]], b[keys[i]]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || "").match(/stack|recursion/i)) {
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    throw error;
  }
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
var ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
Object.keys(TAG_NAMES).map(function(name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src",
  TARGET: "target"
};
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function(obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = "data-react-helmet";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var inherits = function(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
};
var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};
var encodeSpecialCharacters = function encodeSpecialCharacters2(str) {
  var encode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var getTitleFromPropsList = function getTitleFromPropsList2(propsList) {
  var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, function() {
      return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
    });
  }
  var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = function getOnChangeClientState2(propsList) {
  return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {
  };
};
var getAttributesFromPropsList = function getAttributesFromPropsList2(tagType, propsList) {
  return propsList.filter(function(props) {
    return typeof props[tagType] !== "undefined";
  }).map(function(props) {
    return props[tagType];
  }).reduce(function(tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};
var getBaseTagFromPropsList = function getBaseTagFromPropsList2(primaryAttributes, propsList) {
  return propsList.filter(function(props) {
    return typeof props[TAG_NAMES.BASE] !== "undefined";
  }).map(function(props) {
    return props[TAG_NAMES.BASE];
  }).reverse().reduce(function(innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);
      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }
    return innermostBaseTag;
  }, []);
};
var getTagsFromPropsList = function getTagsFromPropsList2(tagName, primaryAttributes, propsList) {
  var approvedSeenTags = {};
  return propsList.filter(function(props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + ' should be of type "Array". Instead found type "' + _typeof(props[tagName]) + '"');
    }
    return false;
  }).map(function(props) {
    return props[tagName];
  }).reverse().reduce(function(approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function(tag) {
      var primaryAttributeKey = void 0;
      var keys2 = Object.keys(tag);
      for (var i2 = 0; i2 < keys2.length; i2++) {
        var attributeKey2 = keys2[i2];
        var lowerCaseAttributeKey = attributeKey2.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey2) !== -1 && (attributeKey2 === TAG_PROPERTIES.INNER_HTML || attributeKey2 === TAG_PROPERTIES.CSS_TEXT || attributeKey2 === TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey2;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      var value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach(function(tag) {
      return approvedTags.push(tag);
    });
    var keys = Object.keys(instanceSeenTags);
    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = objectAssign({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getInnermostProperty = function getInnermostProperty2(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];
    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }
  return null;
};
var reducePropsToState = function reducePropsToState2(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
    bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
  };
};
var rafPolyfill = function() {
  var clock = Date.now();
  return function(callback) {
    var currentTime = Date.now();
    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function() {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();
var cafPolyfill = function cafPolyfill2(id2) {
  return clearTimeout(id2);
};
var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
var warn = function warn2(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};
var _helmetCallback = null;
var handleClientStateChange = function handleClientStateChange2(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function() {
      commitTagChanges(newState, function() {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var commitTagChanges = function commitTagChanges2(newState, cb2) {
  var baseTag = newState.baseTag, bodyAttributes = newState.bodyAttributes, htmlAttributes = newState.htmlAttributes, linkTags = newState.linkTags, metaTags = newState.metaTags, noscriptTags = newState.noscriptTags, onChangeClientState = newState.onChangeClientState, scriptTags = newState.scriptTags, styleTags = newState.styleTags, title = newState.title, titleAttributes = newState.titleAttributes;
  updateAttributes(TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function(tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType], newTags = _tagUpdates$tagType.newTags, oldTags = _tagUpdates$tagType.oldTags;
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb2 && cb2();
  onChangeClientState(newState, addedTags, removedTags);
};
var flattenArray = function flattenArray2(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};
var updateTitle = function updateTitle2(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes(TAG_NAMES.TITLE, attributes);
};
var updateAttributes = function updateAttributes2(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);
  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    var indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTags = function updateTags2(type, tags) {
  var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;
  if (tags && tags.length) {
    tags.forEach(function(tag) {
      var newElement = document.createElement(type);
      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some(function(existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach(function(tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function(tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags,
    newTags
  };
};
var generateElementAttributesAsString = function generateElementAttributesAsString2(attributes) {
  return Object.keys(attributes).reduce(function(str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + '="' + attributes[key] + '"' : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};
var generateTitleAsString = function generateTitleAsString2(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + '="true" ' + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + '="true">' + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};
var generateTagsAsString = function generateTagsAsString2(type, tags, encode) {
  return tags.reduce(function(str, tag) {
    var attributeHtml = Object.keys(tag).filter(function(attribute) {
      return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function(string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + '="' + encodeSpecialCharacters(tag[attribute], encode) + '"';
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + HELMET_ATTRIBUTE + '="true" ' + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};
var convertElementAttributestoReactProps = function convertElementAttributestoReactProps2(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(attributes).reduce(function(obj, key) {
    obj[REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};
var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes2(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(props).reduce(function(obj, key) {
    obj[HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};
var generateTitleAsReactComponent = function generateTitleAsReactComponent2(type, title, attributes) {
  var _initProps;
  var initProps = (_initProps = {
    key: title
  }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [React$1.createElement(TAG_NAMES.TITLE, props, title)];
};
var generateTagsAsReactComponent = function generateTagsAsReactComponent2(type, tags) {
  return tags.map(function(tag, i) {
    var _mappedTag;
    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function(attribute) {
      var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;
      if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = { __html: content };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return React$1.createElement(type, mappedTag);
  });
};
var getMethodsForTag = function getMethodsForTag2(type, tags, encode) {
  switch (type) {
    case TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };
    case ATTRIBUTE_NAMES.BODY:
    case ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };
    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};
var mapStateOnServer = function mapStateOnServer2(_ref) {
  var baseTag = _ref.baseTag, bodyAttributes = _ref.bodyAttributes, encode = _ref.encode, htmlAttributes = _ref.htmlAttributes, linkTags = _ref.linkTags, metaTags = _ref.metaTags, noscriptTags = _ref.noscriptTags, scriptTags = _ref.scriptTags, styleTags = _ref.styleTags, _ref$title = _ref.title, title = _ref$title === void 0 ? "" : _ref$title, titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(TAG_NAMES.TITLE, { title, titleAttributes }, encode)
  };
};
var Helmet = function Helmet2(Component) {
  var _class, _temp;
  return _temp = _class = function(_React$Component) {
    inherits(HelmetWrapper, _React$Component);
    function HelmetWrapper() {
      classCallCheck(this, HelmetWrapper);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }
    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !reactFastCompare(this.props, nextProps);
    };
    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }
      switch (child.type) {
        case TAG_NAMES.SCRIPT:
        case TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };
        case TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }
      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };
    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _babelHelpers$extends;
      var child = _ref.child, arrayTypeChildren = _ref.arrayTypeChildren, newChildProps = _ref.newChildProps, nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
    };
    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _babelHelpers$extends2, _babelHelpers$extends3;
      var child = _ref2.child, newProps = _ref2.newProps, newChildProps = _ref2.newChildProps, nestedChildren = _ref2.nestedChildren;
      switch (child.type) {
        case TAG_NAMES.TITLE:
          return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));
        case TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });
        case TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }
      return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
    };
    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);
      Object.keys(arrayTypeChildren).forEach(function(arrayChildName) {
        var _babelHelpers$extends4;
        newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
      });
      return newFlattenedProps;
    };
    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      return true;
    };
    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;
      var arrayTypeChildren = {};
      React$1.Children.forEach(children, function(child) {
        if (!child || !child.props) {
          return;
        }
        var _child$props = child.props, nestedChildren = _child$props.children, childProps = objectWithoutProperties(_child$props, ["children"]);
        var newChildProps = convertReactPropstoHtmlAttributes(childProps);
        _this2.warnOnInvalidChildren(child, nestedChildren);
        switch (child.type) {
          case TAG_NAMES.LINK:
          case TAG_NAMES.META:
          case TAG_NAMES.NOSCRIPT:
          case TAG_NAMES.SCRIPT:
          case TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child,
              arrayTypeChildren,
              newChildProps,
              nestedChildren
            });
            break;
          default:
            newProps = _this2.mapObjectTypeChildren({
              child,
              newProps,
              newChildProps,
              nestedChildren
            });
            break;
        }
      });
      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };
    HelmetWrapper.prototype.render = function render() {
      var _props = this.props, children = _props.children, props = objectWithoutProperties(_props, ["children"]);
      var newProps = _extends({}, props);
      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }
      return React$1.createElement(Component, newProps);
    };
    createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      set: function set$$1(canUseDOM2) {
        Component.canUseDOM = canUseDOM2;
      }
    }]);
    return HelmetWrapper;
  }(React$1.Component), _class.propTypes = {
    base: PropTypes.object,
    bodyAttributes: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultTitle: PropTypes.string,
    defer: PropTypes.bool,
    encodeSpecialCharacters: PropTypes.bool,
    htmlAttributes: PropTypes.object,
    link: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.arrayOf(PropTypes.object),
    noscript: PropTypes.arrayOf(PropTypes.object),
    onChangeClientState: PropTypes.func,
    script: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    titleAttributes: PropTypes.object,
    titleTemplate: PropTypes.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function() {
    var mappedState = Component.rewind();
    if (!mappedState) {
      mappedState = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
    return mappedState;
  }, _temp;
};
var NullComponent = function NullComponent2() {
  return null;
};
var HelmetSideEffects = lib(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
var styles = "";
var notFoundUrl = "/honshou-mieru/assets/404.8bdf86ef.svg";
const NotFound = () => /* @__PURE__ */ jsxs("div", {
  className: "notFound",
  children: [/* @__PURE__ */ jsx(HelmetExport, {
    title: "HonshouMieru - Not Found!"
  }), /* @__PURE__ */ jsx("h1", {
    children: "Uhhh"
  }), /* @__PURE__ */ jsx("img", {
    src: notFoundUrl,
    className: "image"
  }), /* @__PURE__ */ jsx("p", {
    children: "This doesn't seem right..."
  })]
});
const App = () => /* @__PURE__ */ jsx(Layout, {
  children: /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(LazyHome, {})
    }), /* @__PURE__ */ jsx(Route, {
      element: /* @__PURE__ */ jsx(NotFound, {})
    })]
  })
});
client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(React$1.StrictMode, {
  children: /* @__PURE__ */ jsx(BrowserRouter, {
    basename: "/honshou-mieru/",
    children: /* @__PURE__ */ jsx(App, {})
  })
}));
export { Fragment as F, PropTypes as P, React$1 as R, jsxs as a, jsx as j, react as r };
