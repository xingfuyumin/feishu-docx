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

// src/FeishuDocxRender/components/utils.ts
var utils_exports = {};
__export(utils_exports, {
  formatInlinecode: () => formatInlinecode,
  formatOrderNum: () => formatOrderNum,
  getCalloutStyle: () => getCalloutStyle,
  getTextElementStyle: () => getTextElementStyle,
  getTextStyle: () => getTextStyle
});
module.exports = __toCommonJS(utils_exports);
var getTextStyle = (d, isCode) => {
  const obj = [];
  if ((d == null ? void 0 : d.align) !== void 0 && (d == null ? void 0 : d.align) >= 1) {
    obj.push(`feishudocx-textstyle-align-${d.align}`);
  }
  if (isCode && (d == null ? void 0 : d.wrap)) {
    obj.push("feishudocx-textstyle-wrap");
  }
  return obj;
};
var getTextElementStyle = (d) => {
  const obj = [];
  if (d == null ? void 0 : d.bold) {
    obj.push("feishudocx-textelementstyle-bold");
  }
  if (d == null ? void 0 : d.background_color) {
    obj.push(`feishudocx-textelementstyle-bgcolor-${d.background_color}`);
  }
  if (d == null ? void 0 : d.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${d.text_color}`);
  }
  if (d == null ? void 0 : d.underline) {
    obj.push("feishudocx-textelementstyle-underline");
  }
  if (d == null ? void 0 : d.italic) {
    obj.push("feishudocx-textelementstyle-italic");
  }
  if (d == null ? void 0 : d.strikethrough) {
    obj.push("feishudocx-textelementstyle-strikethrough");
  }
  if (d == null ? void 0 : d.inline_code) {
    obj.push("feishudocx-textelementstyle-inlinecode");
  }
  if (d == null ? void 0 : d.inline_code_first) {
    obj.push("feishudocx-textelementstyle-inlinecode-first");
  }
  if (d == null ? void 0 : d.inline_code_last) {
    obj.push("feishudocx-textelementstyle-inlinecode-last");
  }
  if (d == null ? void 0 : d.link) {
    obj.push("feishudocx-textelementstyle-link");
  }
  return obj;
};
var formatInlinecode = (elements) => {
  elements.forEach((el, index) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!!((_b = (_a = el.text_run) == null ? void 0 : _a.text_element_style) == null ? void 0 : _b.inline_code)) {
      if (!((_e = (_d = (_c = elements[index - 1]) == null ? void 0 : _c.text_run) == null ? void 0 : _d.text_element_style) == null ? void 0 : _e.inline_code)) {
        el.text_run.text_element_style.inline_code_first = true;
      }
      if (!((_h = (_g = (_f = elements[index + 1]) == null ? void 0 : _f.text_run) == null ? void 0 : _g.text_element_style) == null ? void 0 : _h.inline_code)) {
        el.text_run.text_element_style.inline_code_last = true;
      }
    }
  });
};
var formatOrderNum = (data) => {
  var _a;
  if (!data) {
    return null;
  }
  if (!data.parentNode) {
    return null;
  }
  let num = 0;
  for (const d of data.parentNode.childrenNodes || []) {
    if ((d == null ? void 0 : d.block_type) === 13) {
      num += 1;
    } else if ((d == null ? void 0 : d.block_type) === 2 && ((_a = d == null ? void 0 : d.text.elements[0].text_run) == null ? void 0 : _a.content.includes("  "))) {
      continue;
    } else {
      num = 0;
    }
    if ((data == null ? void 0 : data.block_id) === (d == null ? void 0 : d.block_id)) {
      break;
    }
  }
  return num;
};
var getCalloutStyle = (d) => {
  var _a, _b, _c, _d, _e, _f;
  const obj = [];
  if ((_a = d.callout) == null ? void 0 : _a.background_color) {
    obj.push(`feishudocx-calloutstyle-bgcolor-${(_b = d.callout) == null ? void 0 : _b.background_color}`);
  }
  if ((_c = d.callout) == null ? void 0 : _c.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${(_d = d.callout) == null ? void 0 : _d.text_color}`);
  }
  if ((_e = d.callout) == null ? void 0 : _e.border_color) {
    obj.push(`feishudocx-calloutstyle-bdcolor-${(_f = d.callout) == null ? void 0 : _f.border_color}`);
  }
  return obj;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatInlinecode,
  formatOrderNum,
  getCalloutStyle,
  getTextElementStyle,
  getTextStyle
});
