webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Row.tsx":
/*!****************************!*\
  !*** ./components/Row.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_array_from__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/array/from */ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_from__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Square__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Square */ "./components/Square.tsx");


var _jsxFileName = "/home/asai/dev/murodor/components/Row.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2__["createElement"];

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  clear: both;\n  content: \"\";\n  display: table;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}




var Main = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject());

var Row = function Row(props) {
  var range = function range(start, end) {
    return _babel_runtime_corejs2_core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default()({
      length: end - start
    }, function (v, k) {
      return k + start;
    });
  };

  return __jsx(Main, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, range(0, props.size).map(function (j) {
    return __jsx(_Square__WEBPACK_IMPORTED_MODULE_4__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, "");
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Row);

/***/ })

})
//# sourceMappingURL=index.js.7bcdc6cde1603704d5ef.hot-update.js.map