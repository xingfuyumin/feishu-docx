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

// src/FeishuDocxRender/components/tabs-block/index.tsx
var tabs_block_exports = {};
__export(tabs_block_exports, {
  default: () => tabs_block_default
});
module.exports = __toCommonJS(tabs_block_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_index = require("./index.less");
var import__ = require("../..");
var import_ui_next = require("@tant/ui-next");
var tabs_block_default = (0, import_react.memo)(({
  data,
  render,
  onLink
}) => {
  var _a;
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-tabsblock"
      )
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_ui_next.Tabs,
      {
        items: (_a = data == null ? void 0 : data.childrenNodes) == null ? void 0 : _a.map((d) => {
          var _a2, _b, _c, _d;
          return {
            key: d == null ? void 0 : d.block_id,
            label: ((_d = (_c = (_b = (_a2 = d == null ? void 0 : d.text) == null ? void 0 : _a2.elements) == null ? void 0 : _b[0]) == null ? void 0 : _c.text_run) == null ? void 0 : _d.content) || "",
            children: (0, import__.renderSwitch)(d, render, onLink)
          };
        })
      }
    )
  ) : null;
  return render ? render("TabsBlock", data, tsx) || null : tsx;
});
