"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;

// NEW, this a whole new file.
var getElementLocator = function getElementLocator(page, elementKey, globalVariables, globalConfig) {
  var _pageElementMappings$, _pageElementMappings$2;

  var pageElementMappings = globalConfig.pageElementMappings;
  var currentPage = globalVariables.currentScreen;
  var elementIdentifier = ((_pageElementMappings$ = pageElementMappings[currentPage]) === null || _pageElementMappings$ === void 0 ? void 0 : _pageElementMappings$[elementKey]) || ((_pageElementMappings$2 = pageElementMappings.common) === null || _pageElementMappings$2 === void 0 ? void 0 : _pageElementMappings$2[elementKey]);

  if (elementIdentifier == null) {
    throw new Error("** The element name = \"".concat(elementKey, "\" specified by Gherkin DOES NOT exist in the \"").concat(globalVariables.currentScreen, "\" pageobject!"));
  } else //return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
    return elementIdentifier;
};

exports.getElementLocator = getElementLocator;