// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Ball =
/** @class */
function () {
  function Ball(radius, x, y, color) {
    this.direction = [1, 1];
    this.radius = radius;
    this.velocity = 3;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  Ball.prototype.move = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    this.x += this.velocity * this.direction[0];
    this.y += this.velocity * this.direction[1];
    ctx.fill();
    ctx.closePath();
  };

  Ball.prototype.checkBorder = function (canvasWidth, canvasHeight) {
    if (this.x + this.velocity > canvasWidth - this.radius || this.x + this.velocity < this.radius) {
      this.direction[0] *= -1;
    }

    if (this.y + this.velocity < this.radius || this.y > canvasHeight) {
      this.direction[1] *= -1;
    }
  };

  Ball.prototype.reverseDirection = function () {
    this.direction[0] *= -1;
    this.direction[1] *= -1;
  };

  return Ball;
}();

exports.Ball = Ball;
},{}],"src/Board.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Board =
/** @class */
function () {
  function Board(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.velocity = 5;
    this.x = x;
    this.y = y;
    this.direction = [1, 1];
    this.color = color;
  }

  Board.prototype.draw = function (canvas, ctx) {
    if (this.rightPressed) {
      this.x += 5;

      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
    } else if (this.leftPressed) {
      this.x -= 5;

      if (this.x < 0) {
        this.x = 0;
      }
    }

    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height * 2, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  return Board;
}();

exports.Board = Board;
},{}],"src/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Brick =
/** @class */
function () {
  function Brick(x, y, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.color = color;
  }

  Brick.prototype.draw = function (canvas, ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - Brick.height * 2, Brick.width, Brick.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  Brick.width = 50;
  Brick.height = 15;
  return Brick;
}();

exports.Brick = Brick;
},{}],"src/RectangeFigure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Brick_1 = require("./Brick");

var RectangleFigure =
/** @class */
function () {
  function RectangleFigure() {
    this.brickColomns = 7;
    this.brickRows = 3;
    this.bricks = new Array();
    this.brickPadding = 30;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.placeBricks();
  }

  RectangleFigure.prototype.placeBricks = function () {
    var ff = new Array();

    for (var c = 0; c < this.brickColomns; c++) {
      this.bricks[c] = [];

      for (var r = 0; r < this.brickRows; r++) {
        var brickX = c * (Brick_1.Brick.width + this.brickPadding) + this.brickOffsetLeft;
        var brickY = r * (Brick_1.Brick.height + this.brickPadding) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick_1.Brick(brickX, brickY, "#70E852");
      }
    }
  };

  return RectangleFigure;
}();

exports.RectangleFigure = RectangleFigure;
},{"./Brick":"src/Brick.ts"}],"src/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Ball_1 = require("./Ball");

var Board_1 = require("./Board");

var Brick_1 = require("./Brick");

var RectangeFigure_1 = require("./RectangeFigure");

var Game =
/** @class */
function () {
  function Game(document) {
    var _this = this;

    this.isGameOver = false;
    this.ball = new Ball_1.Ball(10, 100, 300, "#64C7FF");
    this.document = document;
    this.canvas = document.getElementById("canvas17");
    this.ctx = this.canvas.getContext("2d");
    this.board = new Board_1.Board(100, 10, 100, 5000, "#70E852");
    this.document.addEventListener("keydown", function (e) {
      return _this.keyDownHandler(e);
    }, false);
    this.document.addEventListener("keyup", function (e) {
      return _this.keyUpHandler(e);
    }, false);
    this.brickFigure = new RectangeFigure_1.RectangleFigure();
  }

  Game.prototype.keyDownHandler = function (e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      this.board.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      this.board.leftPressed = true;
    }
  };

  Game.prototype.keyUpHandler = function (e) {
    if (e.key == "D" || e.key == "ArrowRight") {
      this.board.rightPressed = false;
    } else if (e.key == "A" || e.key == "ArrowLeft") {
      this.board.leftPressed = false;
    }
  };

  Game.prototype.draw = function () {
    var _this = this;

    if (!this.isGameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.move(this.ctx);
      this.board.draw(this.canvas, this.ctx);
      this.drawBrickFigure(this.brickFigure);
      this.ball.checkBorder(this.canvas.width, this.canvas.height);
      this.checkBoard();
      this.collisionDetection();
      requestAnimationFrame(function () {
        return _this.draw();
      });
    }
  };

  Game.prototype.checkBoard = function () {
    if (this.ball.y + this.ball.velocity > this.canvas.height - this.ball.radius - this.board.height) {
      if (this.ball.x > this.board.x && this.ball.x < this.board.x + this.board.width) {
        this.ball.direction[1] *= -1;
      } else {
        if (this.ball.y + this.ball.velocity > this.canvas.height - this.ball.radius) {
          this.isGameOver = true;
          document.location.reload();
        } //alert("Loh")

      }
    }
  };

  Game.prototype.drawBrickFigure = function (figure) {
    for (var c = 0; c < figure.bricks.length; c++) {
      for (var r = 0; r < figure.bricks[0].length; r++) {
        if (figure.bricks[c][r].status == 1) {
          var brick = figure.bricks[c][r];
          this.ctx.beginPath();
          this.ctx.rect(brick.x, brick.y, Brick_1.Brick.width, Brick_1.Brick.height);
          this.ctx.fillStyle = "#0095DD";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  };

  Game.prototype.collisionDetection = function () {
    for (var c = 0; c < this.brickFigure.bricks.length; c++) {
      for (var r = 0; r < this.brickFigure.bricks[0].length; r++) {
        var b = this.brickFigure.bricks[c][r];

        if (b.status == 1) {
          if (this.ball.x > b.x && this.ball.x < b.x + Brick_1.Brick.width && this.ball.y > b.y && this.ball.y < b.y + Brick_1.Brick.height) {
            this.ball.direction[1] *= -1;
            b.status = 0;
          }
        }
      }
    }
  };

  return Game;
}();

exports.Game = Game;
},{"./Ball":"src/Ball.ts","./Board":"src/Board.ts","./Brick":"src/Brick.ts","./RectangeFigure":"src/RectangeFigure.ts"}],"indexts.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = require("./src/Game");

var canvas = document.getElementById("canvas17");
var ctx = canvas.getContext("2d");
var game = new Game_1.Game(document);
game.draw();
},{"./src/Game":"src/Game.ts"}],"../../../Users/11-CE1011UR/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62794" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/11-CE1011UR/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","indexts.ts"], null)
//# sourceMappingURL=/indexts.71f99780.js.map