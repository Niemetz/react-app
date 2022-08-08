"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;

var _navigationBehavior = require("./navigation-behavior");

var getElementLocator = function getElementLocator(elementKey, page, globalConfig) {
  var _pageElementMappings$, _pageElementMappings$2;

  var currentPage = (0, _navigationBehavior.getCurrentPageId)(page, globalConfig); // New, lecture #37

  var pageElementMappings = globalConfig.pageElementMappings;
  var elementIdentifier = ((_pageElementMappings$ = pageElementMappings[currentPage]) === null || _pageElementMappings$ === void 0 ? void 0 : _pageElementMappings$[elementKey]) || ((_pageElementMappings$2 = pageElementMappings.common) === null || _pageElementMappings$2 === void 0 ? void 0 : _pageElementMappings$2[elementKey]);
  if (elementIdentifier) return elementIdentifier;else {
    throw new Error("** The Gherkin element name = \"".concat(elementKey, "\" DOES NOT EXIST in the pageobject \"").concat(currentPage, "\" !"));
  }
};

exports.getElementLocator = getElementLocator;