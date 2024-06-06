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

// src/FeishuDocxRender/components/text-run/index.tsx
var text_run_exports = {};
__export(text_run_exports, {
  default: () => text_run_default
});
module.exports = __toCommonJS(text_run_exports);
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_utils = require("../utils");
var import_index = require("./index.less");
var text_run_default = (0, import_react.memo)(({ data, render, onLink = () => {
} }) => {
  const replaceTxt = (data2) => {
    if (!(data2 == null ? void 0 : data2.tableCellInfo)) {
      return /* @__PURE__ */ import_react.default.createElement("span", null, data2.content);
    }
    const { colIndex, apiColIndex, rowIndex } = data2.tableCellInfo;
    if (colIndex !== apiColIndex) {
      return /* @__PURE__ */ import_react.default.createElement("span", null, data2.content);
    }
    if (data2.content.includes("$$")) {
      return /* @__PURE__ */ import_react.default.createElement("span", null, data2.content.replace("$$", ""));
    }
    if (rowIndex > 1) {
      const values = data2.content.split(".").map((v) => v.replace(/\s+/g, ""));
      const lastValue = values.pop();
      const count = values.length;
      return count ? /* @__PURE__ */ import_react.default.createElement("span", { style: { paddingLeft: count * 20 } }, /* @__PURE__ */ import_react.default.createElement("b", { style: { fontWeight: "normal", color: "#8d8d8d", marginRight: "4px" } }, "∟"), `${lastValue}`) : /* @__PURE__ */ import_react.default.createElement("span", null, data2.content);
    }
    return /* @__PURE__ */ import_react.default.createElement("span", null, data2.content);
  };
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "span",
    {
      className: (0, import_classnames.default)(
        "feishudocx-textrun",
        ...(0, import_utils.getTextElementStyle)((data == null ? void 0 : data.text_element_style) || {})
      ),
      onClick: () => {
        var _a, _b, _c, _d;
        console.log(data.text_element_style);
        if ((_b = (_a = data.text_element_style) == null ? void 0 : _a.link) == null ? void 0 : _b.url) {
          onLink(decodeURIComponent((_d = (_c = data.text_element_style) == null ? void 0 : _c.link) == null ? void 0 : _d.url));
        }
      }
    },
    replaceTxt(data)
  ) : null;
  return render ? render("TextRun", data, tsx) || null : tsx;
});
