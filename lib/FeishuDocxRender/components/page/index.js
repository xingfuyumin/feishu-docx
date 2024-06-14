var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/FeishuDocxRender/components/page/index.tsx
var page_exports = {};
__export(page_exports, {
  default: () => page_default
});
module.exports = __toCommonJS(page_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_text_element = __toESM(require("../text-element"));
var import_utils = require("../utils");
var import_index = require("./index.less");
var import__ = require("../..");
var page_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  var _a, _b, _c;
  const elements = ((_a = data == null ? void 0 : data.page) == null ? void 0 : _a.elements) || [];
  (0, import_utils.formatInlinecode)(elements);
  console.log(111, data);
  let tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-page",
        ...(0, import_utils.getTextStyle)(((_b = data.page) == null ? void 0 : _b.style) || {})
      )
    },
    elements.map((el, index) => /* @__PURE__ */ import_react.default.createElement(import_text_element.default, { key: index, data: el, render, onLink }))
  ) : null;
  tsx = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, tsx, (_c = data == null ? void 0 : data.childrenNodes) == null ? void 0 : _c.map((d) => (0, import__.renderSwitch)(d, render, onLink)));
  return render ? render("Page", data, tsx) || null : tsx;
});
