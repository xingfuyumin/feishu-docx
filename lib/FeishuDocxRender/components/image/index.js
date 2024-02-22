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

// src/FeishuDocxRender/components/image/index.tsx
var image_exports = {};
__export(image_exports, {
  default: () => image_default
});
module.exports = __toCommonJS(image_exports);
var import_react = __toESM(require("react"));
var import_ui_next = require("@tant/ui-next");
var import_classnames = __toESM(require("classnames"));
var import_index = require("./index.less");
var Index = ({
  data,
  render
}) => {
  var _a, _b;
  const imageRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (imageRef.current) {
      const w = imageRef.current.offsetWidth || 0;
      const h = w * ((data == null ? void 0 : data.image.height) || 0) / ((data == null ? void 0 : data.image.width) || 0);
      imageRef.current.style.minHeight = `${Math.min(h, (data == null ? void 0 : data.image.height) || 0)}px`;
    }
  });
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      ref: imageRef,
      className: (0, import_classnames.default)(
        "feishudocx-image",
        ((_a = data.image) == null ? void 0 : _a.align) ? `feishudocx-textstyle-align-${(_b = data.image) == null ? void 0 : _b.align}` : ""
      )
    },
    /* @__PURE__ */ import_react.default.createElement(import_ui_next.Image, { className: "feishudocx-image-container", src: data.image.base64 })
  ) : null;
  return render ? render("Image", data, tsx) || null : tsx;
};
var image_default = (0, import_react.memo)(Index);
