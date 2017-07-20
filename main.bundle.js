/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const game = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	//Game Files
	__webpack_require__(2);
	// const $ = require('jquery');
	const Soot = __webpack_require__(6);
	const Fire = __webpack_require__(8);
	const Deadly = __webpack_require__(9);
	const Harmless = __webpack_require__(10);
	const Platform = __webpack_require__(11);

	//Canvas Elements
	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	//DOM Elements to Update
	let sootLives = 3;
	let score = 0;
	let highScore = localStorage.getItem("highScore") || 0;
	let scoreDom = document.getElementById('score');
	let highScoreDom = document.getElementById('high-score');
	let sootLivesDom = document.getElementById('lives');
	const startPage = document.getElementById('start-page');

	//Game States
	let gameLoopTrigger = false;
	const winGame = document.getElementById('win-game');
	const loseGame = document.getElementById('lose-game');
	const levelUp = document.getElementById('level-up');

	//Objects
	const deadly = new Deadly();
	const harmless = new Harmless();
	const fire = new Fire();

	let newSoot = new Soot(400, 700, 40, 50, '/img/sootball.png', 'image', 0);
	const grass1 = new Platform(0, 700, canvas.width, 100, '#39ac73');
	const grass2 = new Platform(0, 400, canvas.width, 100, '#39ac73');
	const firepit = new Platform(0, 0, canvas.width, 100, '#ffe0b3');
	const water = new Platform(0, 100, canvas.width, 300, '#99d6ff');
	const road = new Platform(0, 500, canvas.width, 200, '#d1d1e0');
	const platforms = [grass1, grass2, firepit, water, road];

	//Generating Objects
	const deadlyToGenerate = deadly.generateDeadly();
	const harmlessToGenerate = harmless.generateHarmless();
	const fireToGenerate = fire.generateFire();

	//Event Listeners
	$(document).ready(prependUi);
	$(window).on('keydown', sootMovement);
	$('#main-game').on('click', '.play-btn', triggerGamePlay);
	$('#main-game').on('click', '.win-game-btn', resetGame);
	$('#main-game').on('click', '#play-again-btn', resetGame);
	$('#main-game').on('click', '#next-level-btn', nextLevelGameState);
	$('#reset-btn').on('click', resetGame);

	//Functions
	function checkBoundaries() {
	  return newSoot.x > 0 && newSoot.x < 800 && newSoot.y > 0 && newSoot.y < 800;
	}

	function collide(array) {
	  for (var i = 0; i < array.length; i++) {
	    if (array[i].x < newSoot.x + newSoot.width && array[i].x + array[i].width > newSoot.x && array[i].y < newSoot.y + newSoot.height && array[i].height + array[i].y > newSoot.y) {
	      return true;
	    }
	  }
	}

	function collisionDetectionDeadly() {
	  if (collide(deadlyToGenerate)) {
	    sootLives--;
	    $(sootLivesDom).html('Lives: ' + sootLives);
	    return true;
	  }
	}

	function collisionDetectionFirePit() {
	  return newSoot.y > 0 && newSoot.y < 100;
	}

	function collisionDetectionHarmless() {
	  if (newSoot.y < 400) {
	    for (var i = 0; i < harmlessToGenerate.length; i++) {
	      if (harmlessToGenerate[i].x < newSoot.x + newSoot.width && harmlessToGenerate[i].x + harmlessToGenerate[i].width > newSoot.x && harmlessToGenerate[i].y < newSoot.y + newSoot.height && harmlessToGenerate[i].height + harmlessToGenerate[i].y > newSoot.y) {
	        newSoot.speed = harmlessToGenerate[i].speed;
	        newSoot.x += harmlessToGenerate[i].speed * harmlessToGenerate[i].direction;
	        return true;
	      }
	    }
	  }
	  return false;
	}

	function collisionDetectionWater() {
	  return newSoot.y > 50 && newSoot.y < 400;
	}

	function displayScore() {
	  if (reachFire() === true) {
	    score += 25;
	    storeHighScore();
	    $(scoreDom).html('Score: ' + score);
	    nextLevel(125);
	    nextLevel(250);
	    winTheGame();
	  }
	}

	function drawObjects(array) {
	  array.forEach(function (obj) {
	    obj.draw(context);
	  });
	}

	function gameLoop() {
	  if (gameLoopTrigger === true) {
	    startRound();
	    moveObjectsInCanvas();

	    if (collisionDetectionWater() === true && collisionDetectionHarmless() === false) {
	      updateDom();
	    }
	    if (collisionDetectionFirePit() === true && reachFire() === false) {
	      updateDom();
	    }
	    if (collisionDetectionDeadly() === true || reachFire() === true) {
	      displayScore();
	      restartRound();
	    }
	    if (checkBoundaries() === false) {
	      updateDom();
	    }
	    resetLives();
	    requestAnimationFrame(gameLoop);
	  }
	}

	function gameOver() {
	  toggleDisplay(loseGame);
	}

	function increaseSpeed(array) {
	  for (let i = 0; i < array.length; i++) {
	    array[i].speed += 1;
	  }
	}

	function levelUpSpeed() {
	  if (score === 125) {
	    increaseSpeed(harmlessToGenerate);
	    increaseSpeed(deadlyToGenerate);
	  } else if (score === 250) {
	    increaseSpeed(harmlessToGenerate);
	    increaseSpeed(deadlyToGenerate);
	  }
	}

	function moveObjects(array) {
	  for (var i = 0; i < array.length; i++) {

	    if (array[i].y === 650 || array[i].y === 550 || array[i].y === 350 || array[i].y === 250 || array[i].y === 150) {
	      if (array[i].x <= -200) {
	        array[i].x = 800;
	      } else {
	        array[i].move('left');
	      }
	    } else {
	      if (array[i].x >= canvas.width + 200) {
	        array[i].x = -200;
	      } else {
	        array[i].move('right');
	      }
	    }
	  }
	}

	function moveObjectsInCanvas() {
	  moveObjects(deadlyToGenerate);
	  moveObjects(harmlessToGenerate);
	}

	function nextLevel(currentScore) {
	  if (score === currentScore) {
	    setTimeout(function () {
	      toggleDisplay(levelUp);
	    }, 1500);
	  }
	}

	function nextLevelGameState() {
	  toggleDisplay(levelUp);
	  levelUpSpeed();
	}

	function prependUi() {
	  scoreDom.prepend(`Score: ${score}`);
	  highScoreDom.prepend(`High-Score: ${highScore}`);
	  sootLivesDom.prepend(`Lives: ${sootLives}`);
	  canvas.style.display = 'none';
	}

	function reachFire() {
	  if (newSoot.y < 150 && collide(fireToGenerate)) {
	    return true;
	  }
	  return false;
	}

	function resetGame() {
	  location.reload();
	}

	function resetLives() {
	  if (sootLives === 0) {
	    sootLives = 3;
	    score = 0;
	    $(sootLivesDom).html('Lives: ' + sootLives);
	    $(scoreDom).html('Score: ' + score);
	    gameOver();
	  }
	}

	function restartRound() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  newSoot.resetSoot();
	  newSoot.draw(context);
	}

	function sootMovement(event) {
	  if (event.keyCode === 37) {
	    newSoot.move('left');
	  } else if (event.keyCode === 39) {
	    newSoot.move('right');
	  } else if (event.keyCode === 38) {
	    newSoot.move('up');
	  } else if (event.keyCode === 40) {
	    newSoot.move('down');
	  }
	}

	function startRound() {
	  context.clearRect(0, 0, canvas.width, canvas.height);

	  for (var i = 0; i < platforms.length; i++) {
	    platforms[i].draw(context);
	  }
	  drawObjects(deadlyToGenerate);
	  drawObjects(harmlessToGenerate);
	  drawObjects(fireToGenerate);
	  newSoot.draw(context);
	}

	function storeHighScore() {
	  if (highScore !== null && score > highScore) {
	    localStorage.setItem("highScore", score);
	    $(highScoreDom).html('High-Score: ' + score);
	  }
	}

	function toggleDisplay(gameState) {
	  if (canvas.style.display === 'none') {
	    canvas.style.display = 'block';
	    gameState.style.display = 'none';
	  } else {
	    canvas.style.display = "none";
	    gameState.style.display = "block";
	  }
	}

	function triggerGamePlay() {
	  if (gameLoopTrigger === false) {
	    toggleDisplay(startPage);
	    gameLoopTrigger = true;
	    gameLoop();
	  }
	}

	function updateDom() {
	  sootLives--;
	  $(sootLivesDom).html('Lives: ' + sootLives);
	  displayScore();
	  restartRound();
	}

	function winTheGame() {
	  if (score === 375) {
	    setTimeout(function () {
	      canvas.style.display = "none";
	      winGame.style.display = "block";
	    }, 1500);
	  }
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./game.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./game.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "/*** BASE STYLES ***/\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  height: 100%;\n  width: 100%;\n}\n\nbody::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: -1;\n  content: \"\";\n  background: url(\"/img/soot-sprint-bkgrd2.jpeg\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  opacity: 0.4;\n  color: #000;\n}\n\n/* Header */\n\nheader {\n  margin: 25px 0;\n}\n\nh1 {\n  font-family: 'Cinzel', serif;\n  font-size: 80px;\n  text-align: center;\n  text-shadow: 2px 2px #a3a3c2;\n}\n\n/* MAIN */\n\nsection {\n  margin: 15px 0;\n}\n\np {\n  font-family: 'Roboto Mono', serif;\n  font-size: 35px;\n  text-align: center;\n  text-shadow: 2px 2px #a3a3c2;\n}\n\nbutton {\n  padding: 10px 40px;\n  margin: 0;\n  background-color: #000;\n  border: 2px solid #a3a3c2;\n  border-radius: 30px;\n  color: #fff;\n  cursor: pointer;\n  font-size: 30px;\n}\n\nbutton:hover {\n  background-color: #a3a3c2;\n  border: 2px solid #000;\n  color: #000;\n}\n\n.reset-btn-container {\n  text-align: center;\n}\n\n/*** GAME PAGES ***/\n\n/* CANVAS */\n#game {\n  display: block;\n  margin: auto;\n  border: 5px solid #000;\n}\n\n/* START */\n#start-page {\n  display: block;\n  margin: auto;\n  height: 800px;\n  width: 800px;\n  background-image: url('/img/sootsprintstart.png');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  border: 5px solid #000;\n}\n\n.game-start-question {\n  position: relative;\n  top: 50px;\n  left: 50px;\n  height: 200px;\n  width: 200px;\n}\n\n.play-btn-container {\n  position: relative;\n  top: 450px;\n  left: 600px;\n  height: 200px;\n  width: 200px;\n}\n\n/* WIN */\n#win-game {\n  display: none;\n  margin: auto;\n  height: 800px;\n  width: 800px;\n  background-image: url(\"/img/sootstars.png\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  border: 5px solid #000;\n}\n\n.win-text-container {\n  position: relative;\n  top: 50px;\n  left: 50px;\n  height: 200px;\n  width: 200px;\n}\n\n.win-text {\n  font-size: 30px;\n  text-align: left;\n}\n\n.play-again-btn-container {\n  position: relative;\n  top: 450px;\n  left: 510px;\n  height: 200px;\n  width: 300px;\n}\n\n/* LOSE */\n#lose-game {\n  display: none;\n  margin: auto;\n  color: #fff;\n  height: 800px;\n  width: 800px;\n  background-image: url('/img/deadSoot.png');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  border: 5px solid #000;\n}\n\n.game-over-text {\n  margin: 100px 20px;\n}\n\n.lose-text {\n  font-size: 40px;\n}\n\n.game-over-btn-container {\n  margin: 100px auto;\n  width: 220px;\n  height: 300px;\n}\n\n/* LEVEL UP */\n#level-up {\n  display: none;\n  margin: auto;\n  height: 800px;\n  width: 800px;\n  background-image: url('/img/level-up-soot.jpg');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  border: 5px solid #000;\n  color: #000;\n}\n\n.level-up-text-container {\n  margin: 100px 20px;\n}\n\n.level-up-text {\n  font-size: 40px;\n}\n\n.level-up-btn-container {\n  margin: 400px auto;\n  height: 300px;\n  width: 225px;\n}\n", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Umbrella = __webpack_require__(7);

	class Soot extends Umbrella {
	  constructor(x, y, width, height, color, type, speed) {
	    super(x, y, width, height);
	    this.type = type;
	    this.speed = speed;
	  }

	  draw(context) {
	    let sootImage = new Image();

	    sootImage.src = '/img/sootball.png';
	    context.drawImage(sootImage, this.x, this.y, this.width, this.height);
	  }

	  move(direction) {
	    switch (direction) {
	      case 'left':
	        this.x -= this.width;
	        break;

	      case 'right':
	        this.x += this.width;
	        break;

	      case 'up':
	        this.y -= this.height;
	        break;

	      case 'down':
	        this.y += this.height;
	        break;
	    }
	  }

	  resetSoot() {
	    this.x = 400;
	    this.y = 700;
	  }
	}

	module.exports = Soot;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	class Umbrella {
	  constructor(x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }
	}

	module.exports = Umbrella;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Umbrella = __webpack_require__(7);

	class Fire extends Umbrella {
	  constructor(x, y, width, height, color) {
	    super(x, y, width, height, color);
	  }

	  draw(context) {
	    let fireImage = new Image();

	    fireImage.src = '/img/fire.png';
	    context.drawImage(fireImage, this.x, this.y, this.width, this.height);
	  }

	  generateFire() {
	    const fireArray = [];
	    var initX = 50;

	    for (var i = 0; i < 5; i++) {
	      let fireRowOne = new Fire(initX, 20, 50, 59, 'orange');

	      initX += 160;
	      fireArray.push(fireRowOne);
	    }
	    return fireArray;
	  }
	}

	module.exports = Fire;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Umbrella = __webpack_require__(7);

	class Deadly extends Umbrella {
	  constructor(x, y, width, height, speed) {
	    super(x, y, width, height);
	    this.speed = speed;
	  }

	  draw(context) {
	    let deadlyImage = new Image();

	    deadlyImage.src = '/img/catbus.png';
	    context.drawImage(deadlyImage, this.x, this.y, this.width, this.height);
	  }

	  generateDeadly() {
	    const deadlyArray = [];
	    var initX = 100;

	    for (var i = 0; i < 14; i++) {
	      switch (i === true) {
	        case i > 3:
	          {
	            let deadlyRowOne = new Deadly(initX, 650, 60, 40, 1.5);

	            initX += 200;
	            deadlyArray.push(deadlyRowOne);
	            break;
	          }

	        case i > 7:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let deadlyRowTwo = new Deadly(initX, 600, 100, 40, 4);

	            initX += 200;
	            deadlyArray.push(deadlyRowTwo);
	            break;
	          }

	        case i > 10:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let deadlyRowThree = new Deadly(initX, 550, 60, 40, 3);

	            initX += 150;
	            deadlyArray.push(deadlyRowThree);
	            break;
	          }

	        case i > 14:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let deadlyRowFour = new Deadly(initX, 500, 100, 40, 2);

	            initX += 200;
	            deadlyArray.push(deadlyRowFour);
	            break;
	          }
	      }
	    }
	    return deadlyArray;
	  }

	  move(direction) {
	    switch (direction) {
	      case 'left':
	        this.x -= this.speed;
	        break;
	      case 'right':
	        this.x += this.speed;
	        break;
	    }
	  }
	}

	module.exports = Deadly;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Umbrella = __webpack_require__(7);

	class Harmless extends Umbrella {
	  constructor(x, y, width, height, speed, direction) {
	    super(x, y, width, height);
	    this.speed = speed;
	    this.direction = direction;
	  }

	  draw(context) {
	    let harmlessImage = new Image();

	    harmlessImage.src = '/img/train.png';
	    context.drawImage(harmlessImage, this.x, this.y, this.width, this.height);
	  }

	  generateHarmless() {
	    const harmlessArray = [];
	    var initX = 100;

	    for (var i = 0; i < 20; i++) {
	      switch (i === true) {

	        case i > 3:
	          {

	            let harmlessRowOne = new Harmless(initX, 350, 120, 45, 1, -1);

	            initX += 200;
	            harmlessArray.push(harmlessRowOne);
	            break;
	          }

	        case i > 7:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let harmlessRowTwo = new Harmless(initX, 300, 180, 45, 2, 1);

	            initX += 350;
	            harmlessArray.push(harmlessRowTwo);
	            break;
	          }

	        case i > 10:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let harmlessRowThree = new Harmless(initX, 250, 120, 45, 3, -1);

	            initX += 380;
	            harmlessArray.push(harmlessRowThree);
	            break;
	          }

	        case i > 14:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let harmlessRowFour = new Harmless(initX, 200, 100, 45, 4, 1);

	            initX += 300;
	            harmlessArray.push(harmlessRowFour);
	            break;
	          }

	        case i > 17:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let harmlessRowFive = new Harmless(initX, 150, 90, 45, 2, -1);

	            initX += 200;
	            harmlessArray.push(harmlessRowFive);
	            break;
	          }

	        case i > 19:
	          {
	            if (initX > 700) {
	              initX = 100;
	            }

	            let harmlessRowSix = new Harmless(initX, 100, 180, 45, 1.5, 1);

	            initX += 200;
	            harmlessArray.push(harmlessRowSix);
	            break;
	          }
	      }
	    }
	    return harmlessArray;
	  }

	  move(direction) {
	    switch (direction) {
	      case 'left':
	        this.x -= this.speed;
	        break;

	      case 'right':
	        this.x += this.speed;
	        break;
	    }
	  }
	}

	module.exports = Harmless;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var Umbrella = __webpack_require__(7);

	class Platform extends Umbrella {
	  constructor(x, y, width, height, color) {
	    super(x, y, width, height);
	    this.color = color;
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = Platform;

/***/ })
/******/ ]);