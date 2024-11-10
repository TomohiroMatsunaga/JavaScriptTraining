/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/index.js":
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ \"./ex05/updateGrid.js\");\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ \"./ex05/renderGrid.js\");\n\n\n\nconst canvas = document.querySelector(\"#screen\");\nconst ctx = canvas.getContext(\"2d\");\nconst startButton = document.querySelector(\"#start\");\nconst pauseButton = document.querySelector(\"#pause\");\n\ncanvas.width = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.RESOLUTION;\ncanvas.height = _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS * _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.RESOLUTION;\n\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID\nlet animationId = null;\n\n// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3\nconst sound = new Audio(\"/decision1.mp3\");\n\n// ライフゲームのセル (true or false) をランダムに初期化する\nlet grid = new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS)\n  .fill(null)\n  .map(() =>\n    new Array(_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))\n  );\n\n// // grid を canvas に描画する\n// function renderGrid(grid) {\n//   for (let row = 0; row < ROWS; row++) {\n//     for (let col = 0; col < COLS; col++) {\n//       const cell = grid[row][col];\n//       ctx.beginPath();\n//       ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\n//       ctx.fillStyle = cell ? \"black\" : \"white\";\n//       ctx.fill();\n//       ctx.stroke();\n//     }\n//   }\n// }\n\n// // Life Game のルールに従ってセルを更新する\n// function updateGrid(grid) {\n//   // 新しいグリッドを作成\n//   const nextGrid = grid.map((arr) => [...arr]);\n\n//   for (let row = 0; row < ROWS; row++) {\n//     for (let col = 0; col < COLS; col++) {\n//       // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)\n//       //-----実装部分開始位置\n\n//       // 周囲のセルの生存数の合計\n//       let livingNeighbors = 0;\n\n//       // 8つの近隣セルの座標\n//       const neighbors = [\n//         [-1, -1], [-1, 0], [-1, 1],\n//         [ 0, -1],          [ 0, 1],\n//         [ 1, -1], [ 1, 0], [ 1, 1]\n//       ];\n\n//       //8つの隣接するセルを調べて、生存していたら(trueなら)livingNeighborsに1を足す\n//       neighbors.forEach(([dx, dy]) => {\n//         const x = row + dx;\n//         const y = col + dy;\n        \n//         // グリッドの範囲内であるかをチェック\n//         if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {\n//           livingNeighbors += grid[x][y] ? 1 : 0;\n//         }\n//       });\n\n//       // 更新するセルの現在の状態\n//       const isAlive = grid[row][col];\n\n//       // ゲームのルールに従って次の状態を決定\n//       // 「自身が生きていて周りに生きている細胞が1つもない」or「自身が生きていて4つ以上生きている細胞がある」ときは死ぬ\n//       if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {\n//         nextGrid[row][col] = false;\n//       } \n//       // 「自身が死んでいて周りに丁度3つの生きている細胞がある」ときは誕生する\n//       else if (!isAlive && livingNeighbors === 3) {\n//         nextGrid[row][col] = true;\n//       }\n//       //その他の場合は細胞の死や誕生に影響しない\n\n//       //-----実装部分終了位置\n//     }\n//   }\n//   return nextGrid;\n// }\n\n// canvas がクリックされたときの処理 (セルの値を反転する)\ncanvas.addEventListener('click', function (evt) {\n  const rect = canvas.getBoundingClientRect();\n  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };\n\n  const row = Math.floor(pos.y / _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.RESOLUTION);\n  const col = Math.floor(pos.x / _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.RESOLUTION);\n  grid[row][col] = !grid[row][col];\n  sound.cloneNode().play();\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n});\n\n// requestAnimationFrame によって一定間隔で更新・描画を行う\n// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame\nfunction update() {\n  grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid);\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n  animationId = requestAnimationFrame(update);\n}\n\nstartButton.addEventListener(\"click\", () => {\n  // 既にアニメーションが動いている場合は何もしない\n  if (animationId) {\n    return;\n  }\n  update();\n});\n\npauseButton.addEventListener(\"click\", () => {\n  // アニメーションが停止している場合は何もしない\n  if (!animationId) {\n    return;\n  }\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n\n(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n\n\n//# sourceURL=webpack://ch17/./ex05/index.js?");

/***/ }),

/***/ "./ex05/renderGrid.js":
/*!****************************!*\
  !*** ./ex05/renderGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ \"./ex05/updateGrid.js\");\n// 1セルのサイズ\r\nconst RESOLUTION = 10;\r\n\r\n\r\n\r\n/**\r\n * grid を canvas に描画する\r\n * @param {CanvasRenderingContext2D} ctx\r\n * @param {Array<Array<boolean>>} grid\r\n */\r\nfunction renderGrid(ctx, grid) {\r\n  for (let row = 0; row < _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\r\n    for (let col = 0; col < _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\r\n      const cell = grid[row][col];\r\n      ctx.beginPath();\r\n      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\r\n      ctx.fillStyle = cell ? 'black' : 'white';\r\n      ctx.fill();\r\n      ctx.stroke();\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://ch17/./ex05/renderGrid.js?");

/***/ }),

/***/ "./ex05/updateGrid.js":
/*!****************************!*\
  !*** ./ex05/updateGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   ROWS: () => (/* binding */ ROWS),\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n// 50 x 50 の盤面とする\r\nconst ROWS = 50;\r\nconst COLS = 50;\r\n\r\n/**\r\n * Life Game のルールに従ってセルを更新する\r\n * @param {Array<Array<boolean>>} grid\r\n * @returns {Array<Array<boolean>>}\r\n */\r\nfunction updateGrid(grid) {\r\n  // 新しいグリッドを作成\r\n  const nextGrid = grid.map((arr) => [...arr]);\r\n\r\n  for (let row = 0; row < ROWS; row++) {\r\n    for (let col = 0; col < COLS; col++) {\r\n      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する\r\n\r\n      // 周囲のセルの生存数の合計\r\n      let livingNeighbors = 0;\r\n\r\n      // 8つの近隣セルの座標\r\n      const neighbors = [\r\n        [-1, -1], [-1, 0], [-1, 1],\r\n        [0, -1],           [0, 1],\r\n        [1, -1],  [1, 0],  [1, 1],\r\n      ];\r\n\r\n      // 8つの隣接するセルを調べる\r\n      neighbors.forEach(([dx, dy]) => {\r\n        const x = row + dx;\r\n        const y = col + dy;\r\n\r\n        // グリッドの範囲内であるかをチェック\r\n        if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {\r\n          livingNeighbors += grid[x][y] ? 1 : 0;\r\n        }\r\n      });\r\n\r\n      // 更新するセルの現在の状態\r\n      const isAlive = grid[row][col];\r\n\r\n      // ゲームのルールに従って次の状態を決定\r\n      if (isAlive && (livingNeighbors < 2 || livingNeighbors > 3)) {\r\n        nextGrid[row][col] = false;\r\n      } else if (!isAlive && livingNeighbors === 3) {\r\n        nextGrid[row][col] = true;\r\n      }\r\n      // その他の場合は状態を維持\r\n    }\r\n  }\r\n  return nextGrid;\r\n}\r\n\n\n//# sourceURL=webpack://ch17/./ex05/updateGrid.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/index.js");
/******/ 	
/******/ })()
;