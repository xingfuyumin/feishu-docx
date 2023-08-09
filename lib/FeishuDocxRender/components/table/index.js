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

// src/FeishuDocxRender/components/table/index.tsx
var table_exports = {};
__export(table_exports, {
  default: () => table_default
});
module.exports = __toCommonJS(table_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_index = require("./index.less");
var import__ = require("../..");
var table_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  var _a, _b;
  const property = ((_a = data == null ? void 0 : data.table) == null ? void 0 : _a.property) || { column_size: 0, row_size: 0, column_width: [], merge_info: [] };
  const cellNodes = ((_b = data == null ? void 0 : data.table) == null ? void 0 : _b.cellNodes) || [];
  const rowLen = (property == null ? void 0 : property.row_size) || 0;
  const colLen = (property == null ? void 0 : property.column_size) || 0;
  const rows = new Array(rowLen).fill("");
  const cols = new Array(colLen).fill("");
  const ignoreIndex = {};
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-table"
      )
    },
    /* @__PURE__ */ import_react.default.createElement("table", null, /* @__PURE__ */ import_react.default.createElement("colgroup", null, cols.map((col, colIndex) => {
      var _a2;
      return /* @__PURE__ */ import_react.default.createElement("col", { key: colIndex, width: (_a2 = property == null ? void 0 : property.column_width) == null ? void 0 : _a2[colIndex] });
    })), rows.map((row, rowIndex) => /* @__PURE__ */ import_react.default.createElement("tr", { key: rowIndex }, cols.map((col, colIndex) => {
      var _a2, _b2, _c, _d;
      const index = rowIndex * colLen + colIndex;
      const rowSpan = ((_b2 = (_a2 = property.merge_info) == null ? void 0 : _a2[index]) == null ? void 0 : _b2.row_span) || 1;
      const colSpan = ((_d = (_c = property.merge_info) == null ? void 0 : _c[index]) == null ? void 0 : _d.col_span) || 1;
      if (rowSpan > 1) {
        for (let x = colIndex; x < colIndex + colSpan; x += 1) {
          for (let y = rowIndex; y < rowIndex + rowSpan; y += 1) {
            ignoreIndex[`${x}-${y}`] = true;
          }
        }
        delete ignoreIndex[`${colIndex}-${rowIndex}`];
      }
      if (ignoreIndex[`${colIndex}-${rowIndex}`]) {
        return null;
      }
      return /* @__PURE__ */ import_react.default.createElement("td", { key: colIndex, rowSpan, colSpan }, (0, import__.renderSwitch)(cellNodes[index], render, onLink));
    }))))
  ) : null;
  return render ? render("Table", data, tsx) || null : tsx;
});
