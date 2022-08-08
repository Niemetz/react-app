"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoke = exports.regression = exports.dev = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _parseEnv = require("./env/parseEnv");

var fs = _interopRequireWildcard(require("fs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//NEW
_dotenv.default.config({
  path: (0, _parseEnv.env)('COMMON_CONFIG_FILE')
}); // NOTE: this is the hostS URLs.  NOT a sigle host.


var hostsConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('HOSTS_URLS_PATH')); //console.log(`hostsConfi = ${JSON.stringify(hostsConfig)}`)

var pagesConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('PAGE_URLS_PATH')); //console.log(`pagesConfig = ${JSON.stringify(pagesConfig)}`)
// get all the pages under /config/mappings folder. The pages contains the elements on the pages.
// This will help speed up the element retrieval process since all elements of all pages already loaded in this
// "mappingFiles" array.

var mappingFiles = fs.readdirSync("".concat(process.cwd()).concat((0, _parseEnv.env)('PAGE_ELEMENTS_PATH'))); //NEW
// NEW, the whole block is NEW
// Loop through each of the pages specified in JSON files under the /config/mappings folder.
// the content of the pageElementMappings is an array of 
// <"name of page derived from the pageobject.ts",<elementName (passed down from Gherkin), ElementCSSPath>>

var pageElementMappings = mappingFiles.reduce(function (pageElementConfigAcc, file) {
  // Strip off the "json" extensions and use the filename as the key
  // it means that you need to name the file as the name of the page(s).
  // for example:  the "home" page must be named "home.json"... not sure of the name support spaces?
  // the step below is to get the names of all pages under folder "mappings"
  var key = file.replace('.json', ''); //console.log("CONTENT OF THE KEY = " + key);
  //console.log(`CONTENT OF THE pageElementConfigAcc =  ${JSON.stringify(pageElementConfigAcc)}`);
  // extract the element from the pages

  var elementMappings = (0, _parseEnv.getJsonFromFile)("".concat((0, _parseEnv.env)('PAGE_ELEMENTS_PATH')).concat(file)); //console.log(`CONTENT OF THE elementMappings =  ${JSON.stringify(elementMappings)}`);

  return _objectSpread(_objectSpread({}, pageElementConfigAcc), {}, _defineProperty({}, key, elementMappings));
}, {}); //console.log(`CONTENT OF THE pageElementMappings =  ${JSON.stringify(pageElementMappings)}`);
// this "global" object will be passed along to each scenario's context

var worldParameters = {
  hostsConfig: hostsConfig,
  // based URL
  pagesConfig: pagesConfig,
  // route after based URL
  pageElementMappings: pageElementMappings //NEW, all of the elements on ALL pages

}; //console.log(`CONTENT OF THE worldParameters =  ${JSON.stringify(worldParameters)}`);

var common = "./src/features/**/*.feature                 --require-module ts-node/register                 --require ./src/step-definitions/**/**/*.ts                 -f json:./reports/report.json                 --world-parameters ".concat(JSON.stringify(worldParameters), "                 --format progress-bar");
var dev = "".concat(common, " --tags '@dev'");
exports.dev = dev;
var smoke = "".concat(common, " --tags '@smoke'");
exports.smoke = smoke;
var regression = "".concat(common, " --tags '@regression'");
exports.regression = regression;