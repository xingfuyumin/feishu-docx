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

// src/FeishuDocxRender/components/text-element/index.tsx
var text_element_exports = {};
__export(text_element_exports, {
  default: () => text_element_default
});
module.exports = __toCommonJS(text_element_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_text_run = __toESM(require("../text-run"));
var import_index = require("./index.less");
var text_element_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "span",
    {
      className: (0, import_classnames.default)(
        "feishudocx-textelement"
      )
    },
    /* @__PURE__ */ import_react.default.createElement(import_text_run.default, { data: data == null ? void 0 : data.text_run, render, onLink })
  ) : null;
  return render ? render("TextElement", data, tsx) || null : tsx;
});
