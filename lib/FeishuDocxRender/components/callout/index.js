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

// src/FeishuDocxRender/components/callout/index.tsx
var callout_exports = {};
__export(callout_exports, {
  default: () => callout_default
});
module.exports = __toCommonJS(callout_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_utils = require("../utils");
var import_index = require("./index.less");
var import__ = require("../..");
var import_emoji = __toESM(require("../emoji.json"));
var callout_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  var _a, _b;
  let tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-callout",
        ...(0, import_utils.getCalloutStyle)(data)
      )
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: "feishudocx-callout-emoji" }, import_emoji.default[((_a = data.callout) == null ? void 0 : _a.emoji_id) || ""]),
    /* @__PURE__ */ import_react.default.createElement("div", { className: "feishudocx-callout-content" }, (_b = data == null ? void 0 : data.childrenNodes) == null ? void 0 : _b.map((d) => (0, import__.renderSwitch)(d, render, onLink)))
  ) : null;
  return render ? render("Callout", data, tsx) || null : tsx;
});
