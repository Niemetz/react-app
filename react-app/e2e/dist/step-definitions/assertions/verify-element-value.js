"use strict";

var _cucumber = require("@cucumber/cucumber");

var _webElementHelper = require("../../support/actions/web-element-helper");

var _waitForBehavior = require("../../support/actions/wait-for-behavior");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)('the {string} should contain the text {string}', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elementKey, expectedElementText) {
    var page, globalVariables, globalConfig, elementIdentifier, executionResult;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = this.screen.page, globalVariables = this.globalVariables, globalConfig = this.globalConfig; //console.log(`The ${elementKey} should contains the text ${expectedElementText}....`);

            elementIdentifier = (0, _webElementHelper.getElementLocator)(page, elementKey, globalVariables, globalConfig);
            _context2.next = 4;
            return (0, _waitForBehavior.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var elementText;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return page.textContent(elementIdentifier);

                    case 2:
                      elementText = _context.sent;
                      return _context.abrupt("return", elementText === null || elementText === void 0 ? void 0 : elementText.includes(expectedElementText));

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 4:
            executionResult = _context2.sent;

            if (!(executionResult == false)) {
              _context2.next = 13;
              break;
            }

            _context2.t0 = Error;
            _context2.t1 = " \n            Step    = The ".concat(elementKey, " should contains the text \"").concat(expectedElementText, "\".\n            Page    = ").concat(globalVariables.currentScreen.toUpperCase(), ".\n            Element = \"").concat(elementIdentifier, "\".\n            Expeccted Text = \"").concat(expectedElementText, "\".\n            Actual Text    = \"");
            _context2.next = 10;
            return page.textContent(elementIdentifier);

          case 10:
            _context2.t2 = _context2.sent;
            _context2.t3 = _context2.t1.concat.call(_context2.t1, _context2.t2, "\".");
            throw new _context2.t0(_context2.t3);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());