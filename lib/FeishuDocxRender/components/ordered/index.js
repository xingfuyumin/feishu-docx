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

// src/FeishuDocxRender/components/ordered/index.tsx
var ordered_exports = {};
__export(ordered_exports, {
  default: () => ordered_default
});
module.exports = __toCommonJS(ordered_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_text_element = __toESM(require("../text-element"));
var import_utils = require("../utils");
var import_index = require("./index.less");
var import__ = require("../..");
var ordered_default = (0, import_react.memo)(({
  data,
  render,
  onLink,
  order = ""
}) => {
  var _a, _b, _c;
  const elements = ((_a = data == null ? void 0 : data.ordered) == null ? void 0 : _a.elements) || [];
  (0, import_utils.formatInlinecode)(elements);
  let finalOrder = String(order);
  if (!order) {
    finalOrder = String((0, import_utils.formatOrderNum)(data));
  }
  let tsx = data ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-ordered",
        ...(0, import_utils.getTextStyle)(((_b = data.ordered) == null ? void 0 : _b.style) || {})
      )
    },
    /* @__PURE__ */ import_react.default.createElement("span", { className: "feishudocx-ordered-dot" }, finalOrder, "."),
    /* @__PURE__ */ import_react.default.createElement("span", { className: "feishudocx-ordered-content" }, elements.map((el, index) => /* @__PURE__ */ import_react.default.createElement(import_text_element.default, { key: index, data: el, render, onLink })))
  ), /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: (0, import_classnames.default)(
        "feishudocx-ordered-children"
      )
    },
    (_c = data == null ? void 0 : data.childrenNodes) == null ? void 0 : _c.map((d, index) => (0, import__.renderSwitch)(d, render, onLink, { order: `${finalOrder}.${index + 1}` }))
  )) : null;
  return render ? render("Ordered", data, tsx) || null : tsx;
});
