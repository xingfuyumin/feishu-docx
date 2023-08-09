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

// src/FeishuDocxRender/index.tsx
var FeishuDocxRender_exports = {};
__export(FeishuDocxRender_exports, {
  default: () => FeishuDocxRender_default,
  renderSwitch: () => renderSwitch
});
module.exports = __toCommonJS(FeishuDocxRender_exports);
var import_react = __toESM(require("react"));
var import_style = require("./style.less");
var import_index = require("./index.less");
var import_page = __toESM(require("./components/page"));
var import_text = __toESM(require("./components/text"));
var import_bullet = __toESM(require("./components/bullet"));
var import_image = __toESM(require("./components/image"));
var import_heading1 = __toESM(require("./components/heading1"));
var import_heading2 = __toESM(require("./components/heading2"));
var import_heading3 = __toESM(require("./components/heading3"));
var import_heading4 = __toESM(require("./components/heading4"));
var import_heading5 = __toESM(require("./components/heading5"));
var import_heading6 = __toESM(require("./components/heading6"));
var import_heading7 = __toESM(require("./components/heading7"));
var import_heading8 = __toESM(require("./components/heading8"));
var import_heading9 = __toESM(require("./components/heading9"));
var import_table = __toESM(require("./components/table"));
var import_table_cell = __toESM(require("./components/table-cell"));
var import_grid = __toESM(require("./components/grid"));
var import_grid_column = __toESM(require("./components/grid-column"));
var import_divider = __toESM(require("./components/divider"));
var import_ordered = __toESM(require("./components/ordered"));
var import_callout = __toESM(require("./components/callout"));
var import_quote_container = __toESM(require("./components/quote-container"));
var import_code = __toESM(require("./components/code"));
var import_tip_block = __toESM(require("./components/tip-block"));
var import_danger_block = __toESM(require("./components/danger-block"));
var import_warning_block = __toESM(require("./components/warning-block"));
var import_tabs_block = __toESM(require("./components/tabs-block"));
var import_tabpane_block = __toESM(require("./components/tabpane-block"));
var import_traverse = require("../traverse");
var renderSwitch = (d, render, onLink, extra) => {
  switch (d == null ? void 0 : d.block_type) {
    case -5:
      return /* @__PURE__ */ import_react.default.createElement(import_tabpane_block.default, { data: d, render, key: d.block_id, onLink });
    case -4:
      return /* @__PURE__ */ import_react.default.createElement(import_tabs_block.default, { data: d, render, key: d.block_id, onLink });
    case -3:
      return /* @__PURE__ */ import_react.default.createElement(import_warning_block.default, { data: d, render, key: d.block_id, onLink });
    case -2:
      return /* @__PURE__ */ import_react.default.createElement(import_danger_block.default, { data: d, render, key: d.block_id, onLink });
    case -1:
      return /* @__PURE__ */ import_react.default.createElement(import_tip_block.default, { data: d, render, key: d.block_id, onLink });
    case 1:
      return /* @__PURE__ */ import_react.default.createElement(import_page.default, { data: d, render, key: d.block_id, onLink });
    case 2:
      return /* @__PURE__ */ import_react.default.createElement(import_text.default, { data: d, render, key: d.block_id, onLink });
    case 3:
      return /* @__PURE__ */ import_react.default.createElement(import_heading1.default, { data: d, render, key: d.block_id, onLink });
    case 4:
      return /* @__PURE__ */ import_react.default.createElement(import_heading2.default, { data: d, render, key: d.block_id, onLink });
    case 5:
      return /* @__PURE__ */ import_react.default.createElement(import_heading3.default, { data: d, render, key: d.block_id, onLink });
    case 6:
      return /* @__PURE__ */ import_react.default.createElement(import_heading4.default, { data: d, render, key: d.block_id, onLink });
    case 7:
      return /* @__PURE__ */ import_react.default.createElement(import_heading5.default, { data: d, render, key: d.block_id, onLink });
    case 8:
      return /* @__PURE__ */ import_react.default.createElement(import_heading6.default, { data: d, render, key: d.block_id, onLink });
    case 9:
      return /* @__PURE__ */ import_react.default.createElement(import_heading7.default, { data: d, render, key: d.block_id, onLink });
    case 10:
      return /* @__PURE__ */ import_react.default.createElement(import_heading8.default, { data: d, render, key: d.block_id, onLink });
    case 11:
      return /* @__PURE__ */ import_react.default.createElement(import_heading9.default, { data: d, render, key: d.block_id, onLink });
    case 12:
      return /* @__PURE__ */ import_react.default.createElement(import_bullet.default, { data: d, render, key: d.block_id, onLink });
    case 13:
      return /* @__PURE__ */ import_react.default.createElement(import_ordered.default, { data: d, render, key: d.block_id, onLink, ...extra });
    case 14:
      return /* @__PURE__ */ import_react.default.createElement(import_code.default, { data: d, render, key: d.block_id, onLink });
    case 19:
      return /* @__PURE__ */ import_react.default.createElement(import_callout.default, { data: d, render, key: d.block_id, onLink });
    case 22:
      return /* @__PURE__ */ import_react.default.createElement(import_divider.default, { data: d, render, key: d.block_id });
    case 24:
      return /* @__PURE__ */ import_react.default.createElement(import_grid.default, { data: d, render, key: d.block_id, onLink });
    case 25:
      return /* @__PURE__ */ import_react.default.createElement(import_grid_column.default, { data: d, render, key: d.block_id, onLink });
    case 27:
      return /* @__PURE__ */ import_react.default.createElement(import_image.default, { data: d, render, key: d.block_id });
    case 31:
      return /* @__PURE__ */ import_react.default.createElement(import_table.default, { data: d, render, key: d.block_id, onLink });
    case 32:
      return /* @__PURE__ */ import_react.default.createElement(import_table_cell.default, { data: d, render, key: d.block_id, onLink });
    case 34:
      return /* @__PURE__ */ import_react.default.createElement(import_quote_container.default, { data: d, render, key: d.block_id, onLink });
    default:
      return null;
  }
  ;
};
var Index = ({
  data = [],
  render,
  onLink
}) => {
  if (!data) {
    return null;
  }
  const filterList = (0, import_traverse.formatTree)(data);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "feishudocx-container" }, filterList.map((d) => renderSwitch(d, render, onLink)));
};
var FeishuDocxRender_default = (0, import_react.memo)(Index);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderSwitch
});
