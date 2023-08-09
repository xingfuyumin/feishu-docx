var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/FeishuDocxRender/components/table-cell/index.tsx
var table_cell_exports = {};
__export(table_cell_exports, {
  default: () => table_cell_default
});
module.exports = __toCommonJS(table_cell_exports);
var import_react = require("react");
var import_index = require("./index.less");
var import__ = require("../..");
var table_cell_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  var _a;
  const tsx = data ? (_a = data.childrenNodes) == null ? void 0 : _a.map((d) => (0, import__.renderSwitch)(d, render, onLink)) : null;
  return render ? render("TableCell", data, tsx) || null : tsx;
});
