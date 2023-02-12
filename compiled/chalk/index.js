(function () {
  'use strict';
  var e = {};
  !(function () {
    e.d = function (r, t) {
      for (var n in t) {
        if (e.o(t, n) && !e.o(r, n)) {
          Object.defineProperty(r, n, { enumerable: true, get: t[n] });
        }
      }
    };
  })();
  !(function () {
    e.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    };
  })();
  !(function () {
    e.r = function (e) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(e, '__esModule', { value: true });
    };
  })();
  if (typeof e !== 'undefined') e.ab = __dirname + '/';
  var r = {};
  e.r(r);
  e.d(r, {
    Chalk: function () {
      return Chalk;
    },
    chalkStderr: function () {
      return R;
    },
    default: function () {
      return y;
    },
    supportsColor: function () {
      return g;
    },
    supportsColorStderr: function () {
      return h;
    },
  });
  const t = 10;
  const wrapAnsi16 =
    (e = 0) =>
    (r) =>
      `[${r + e}m`;
  const wrapAnsi256 =
    (e = 0) =>
    (r) =>
      `[${38 + e};5;${r}m`;
  const wrapAnsi16m =
    (e = 0) =>
    (r, t, n) =>
      `[${38 + e};2;${r};${t};${n}m`;
  function assembleStyles() {
    const e = new Map();
    const r = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],
      },
    };
    r.color.gray = r.color.blackBright;
    r.bgColor.bgGray = r.bgColor.bgBlackBright;
    r.color.grey = r.color.blackBright;
    r.bgColor.bgGrey = r.bgColor.bgBlackBright;
    for (const [t, n] of Object.entries(r)) {
      for (const [t, o] of Object.entries(n)) {
        r[t] = { open: `[${o[0]}m`, close: `[${o[1]}m` };
        n[t] = r[t];
        e.set(o[0], o[1]);
      }
      Object.defineProperty(r, t, { value: n, enumerable: false });
    }
    Object.defineProperty(r, 'codes', { value: e, enumerable: false });
    r.color.close = '[39m';
    r.bgColor.close = '[49m';
    r.color.ansi = wrapAnsi16();
    r.color.ansi256 = wrapAnsi256();
    r.color.ansi16m = wrapAnsi16m();
    r.bgColor.ansi = wrapAnsi16(t);
    r.bgColor.ansi256 = wrapAnsi256(t);
    r.bgColor.ansi16m = wrapAnsi16m(t);
    Object.defineProperties(r, {
      rgbToAnsi256: {
        value: (e, r, t) => {
          if (e === r && r === t) {
            if (e < 8) {
              return 16;
            }
            if (e > 248) {
              return 231;
            }
            return Math.round(((e - 8) / 247) * 24) + 232;
          }
          return (
            16 +
            36 * Math.round((e / 255) * 5) +
            6 * Math.round((r / 255) * 5) +
            Math.round((t / 255) * 5)
          );
        },
        enumerable: false,
      },
      hexToRgb: {
        value: (e) => {
          const r = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(
            e.toString(16)
          );
          if (!r) {
            return [0, 0, 0];
          }
          let { colorString: t } = r.groups;
          if (t.length === 3) {
            t = [...t].map((e) => e + e).join('');
          }
          const n = Number.parseInt(t, 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        },
        enumerable: false,
      },
      hexToAnsi256: {
        value: (e) => r.rgbToAnsi256(...r.hexToRgb(e)),
        enumerable: false,
      },
      ansi256ToAnsi: {
        value: (e) => {
          if (e < 8) {
            return 30 + e;
          }
          if (e < 16) {
            return 90 + (e - 8);
          }
          let r;
          let t;
          let n;
          if (e >= 232) {
            r = ((e - 232) * 10 + 8) / 255;
            t = r;
            n = r;
          } else {
            e -= 16;
            const o = e % 36;
            r = Math.floor(e / 36) / 5;
            t = Math.floor(o / 6) / 5;
            n = (o % 6) / 5;
          }
          const o = Math.max(r, t, n) * 2;
          if (o === 0) {
            return 30;
          }
          let l =
            30 + ((Math.round(n) << 2) | (Math.round(t) << 1) | Math.round(r));
          if (o === 2) {
            l += 60;
          }
          return l;
        },
        enumerable: false,
      },
      rgbToAnsi: {
        value: (e, t, n) => r.ansi256ToAnsi(r.rgbToAnsi256(e, t, n)),
        enumerable: false,
      },
      hexToAnsi: {
        value: (e) => r.ansi256ToAnsi(r.hexToAnsi256(e)),
        enumerable: false,
      },
    });
    return r;
  }
  const n = assembleStyles();
  var o = n;
  var l = require('process');
  var i = require('os');
  var s = require('tty');
  function hasFlag(e, r = l.argv) {
    const t = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--';
    const n = r.indexOf(t + e);
    const o = r.indexOf('--');
    return n !== -1 && (o === -1 || n < o);
  }
  const { env: a } = l;
  let c;
  if (
    hasFlag('no-color') ||
    hasFlag('no-colors') ||
    hasFlag('color=false') ||
    hasFlag('color=never')
  ) {
    c = 0;
  } else if (
    hasFlag('color') ||
    hasFlag('colors') ||
    hasFlag('color=true') ||
    hasFlag('color=always')
  ) {
    c = 1;
  }
  function envForceColor() {
    if ('FORCE_COLOR' in a) {
      if (a.FORCE_COLOR === 'true') {
        return 1;
      }
      if (a.FORCE_COLOR === 'false') {
        return 0;
      }
      return a.FORCE_COLOR.length === 0
        ? 1
        : Math.min(Number.parseInt(a.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(e) {
    if (e === 0) {
      return false;
    }
    return { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
  }
  function _supportsColor(e, { streamIsTTY: r, sniffFlags: t = true } = {}) {
    const n = envForceColor();
    if (n !== undefined) {
      c = n;
    }
    const o = t ? c : n;
    if (o === 0) {
      return 0;
    }
    if (t) {
      if (
        hasFlag('color=16m') ||
        hasFlag('color=full') ||
        hasFlag('color=truecolor')
      ) {
        return 3;
      }
      if (hasFlag('color=256')) {
        return 2;
      }
    }
    if (e && !r && o === undefined) {
      return 0;
    }
    const s = o || 0;
    if (a.TERM === 'dumb') {
      return s;
    }
    if (l.platform === 'win32') {
      const e = i.release().split('.');
      if (Number(e[0]) >= 10 && Number(e[2]) >= 10586) {
        return Number(e[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ('CI' in a) {
      if (
        [
          'TRAVIS',
          'CIRCLECI',
          'APPVEYOR',
          'GITLAB_CI',
          'GITHUB_ACTIONS',
          'BUILDKITE',
          'DRONE',
        ].some((e) => e in a) ||
        a.CI_NAME === 'codeship'
      ) {
        return 1;
      }
      return s;
    }
    if ('TEAMCITY_VERSION' in a) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(a.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ('TF_BUILD' in a && 'AGENT_NAME' in a) {
      return 1;
    }
    if (a.COLORTERM === 'truecolor') {
      return 3;
    }
    if ('TERM_PROGRAM' in a) {
      const e = Number.parseInt(
        (a.TERM_PROGRAM_VERSION || '').split('.')[0],
        10
      );
      switch (a.TERM_PROGRAM) {
        case 'iTerm.app':
          return e >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    if (/-256(color)?$/i.test(a.TERM)) {
      return 2;
    }
    if (
      /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(a.TERM)
    ) {
      return 1;
    }
    if ('COLORTERM' in a) {
      return 1;
    }
    return s;
  }
  function createSupportsColor(e, r = {}) {
    const t = _supportsColor(e, { streamIsTTY: e && e.isTTY, ...r });
    return translateLevel(t);
  }
  const u = {
    stdout: createSupportsColor({ isTTY: s.isatty(1) }),
    stderr: createSupportsColor({ isTTY: s.isatty(2) }),
  };
  var f = u;
  function stringReplaceAll(e, r, t) {
    let n = e.indexOf(r);
    if (n === -1) {
      return e;
    }
    const o = r.length;
    let l = 0;
    let i = '';
    do {
      i += e.substr(l, n - l) + r + t;
      l = n + o;
      n = e.indexOf(r, l);
    } while (n !== -1);
    i += e.slice(l);
    return i;
  }
  function stringEncaseCRLFWithFirstIndex(e, r, t, n) {
    let o = 0;
    let l = '';
    do {
      const i = e[n - 1] === '\r';
      l += e.substr(o, (i ? n - 1 : n) - o) + r + (i ? '\r\n' : '\n') + t;
      o = n + 1;
      n = e.indexOf('\n', o);
    } while (n !== -1);
    l += e.slice(o);
    return l;
  }
  const { stdout: g, stderr: h } = f;
  const b = Symbol('GENERATOR');
  const d = Symbol('STYLER');
  const p = Symbol('IS_EMPTY');
  const m = ['ansi', 'ansi', 'ansi256', 'ansi16m'];
  const O = Object.create(null);
  const applyOptions = (e, r = {}) => {
    if (
      r.level &&
      !(Number.isInteger(r.level) && r.level >= 0 && r.level <= 3)
    ) {
      throw new Error('The `level` option should be an integer from 0 to 3');
    }
    const t = g ? g.level : 0;
    e.level = r.level === undefined ? t : r.level;
  };
  class Chalk {
    constructor(e) {
      return chalkFactory(e);
    }
  }
  const chalkFactory = (e) => {
    const chalk = (...e) => e.join(' ');
    applyOptions(chalk, e);
    Object.setPrototypeOf(chalk, createChalk.prototype);
    return chalk;
  };
  function createChalk(e) {
    return chalkFactory(e);
  }
  Object.setPrototypeOf(createChalk.prototype, Function.prototype);
  for (const [e, r] of Object.entries(o)) {
    O[e] = {
      get() {
        const t = createBuilder(
          this,
          createStyler(r.open, r.close, this[d]),
          this[p]
        );
        Object.defineProperty(this, e, { value: t });
        return t;
      },
    };
  }
  O.visible = {
    get() {
      const e = createBuilder(this, this[d], true);
      Object.defineProperty(this, 'visible', { value: e });
      return e;
    },
  };
  const getModelAnsi = (e, r, t, ...n) => {
    if (e === 'rgb') {
      if (r === 'ansi16m') {
        return o[t].ansi16m(...n);
      }
      if (r === 'ansi256') {
        return o[t].ansi256(o.rgbToAnsi256(...n));
      }
      return o[t].ansi(o.rgbToAnsi(...n));
    }
    if (e === 'hex') {
      return getModelAnsi('rgb', r, t, ...o.hexToRgb(...n));
    }
    return o[t][e](...n);
  };
  const C = ['rgb', 'hex', 'ansi256'];
  for (const e of C) {
    O[e] = {
      get() {
        const { level: r } = this;
        return function (...t) {
          const n = createStyler(
            getModelAnsi(e, m[r], 'color', ...t),
            o.color.close,
            this[d]
          );
          return createBuilder(this, n, this[p]);
        };
      },
    };
    const r = 'bg' + e[0].toUpperCase() + e.slice(1);
    O[r] = {
      get() {
        const { level: r } = this;
        return function (...t) {
          const n = createStyler(
            getModelAnsi(e, m[r], 'bgColor', ...t),
            o.bgColor.close,
            this[d]
          );
          return createBuilder(this, n, this[p]);
        };
      },
    };
  }
  const v = Object.defineProperties(() => {}, {
    ...O,
    level: {
      enumerable: true,
      get() {
        return this[b].level;
      },
      set(e) {
        this[b].level = e;
      },
    },
  });
  const createStyler = (e, r, t) => {
    let n;
    let o;
    if (t === undefined) {
      n = e;
      o = r;
    } else {
      n = t.openAll + e;
      o = r + t.closeAll;
    }
    return { open: e, close: r, openAll: n, closeAll: o, parent: t };
  };
  const createBuilder = (e, r, t) => {
    const builder = (...e) =>
      applyStyle(builder, e.length === 1 ? '' + e[0] : e.join(' '));
    Object.setPrototypeOf(builder, v);
    builder[b] = e;
    builder[d] = r;
    builder[p] = t;
    return builder;
  };
  const applyStyle = (e, r) => {
    if (e.level <= 0 || !r) {
      return e[p] ? '' : r;
    }
    let t = e[d];
    if (t === undefined) {
      return r;
    }
    const { openAll: n, closeAll: o } = t;
    if (r.includes('')) {
      while (t !== undefined) {
        r = stringReplaceAll(r, t.close, t.open);
        t = t.parent;
      }
    }
    const l = r.indexOf('\n');
    if (l !== -1) {
      r = stringEncaseCRLFWithFirstIndex(r, o, n, l);
    }
    return n + r + o;
  };
  Object.defineProperties(createChalk.prototype, O);
  const T = createChalk();
  const R = createChalk({ level: h ? h.level : 0 });
  var y = T;
  module.exports = r;
})();
