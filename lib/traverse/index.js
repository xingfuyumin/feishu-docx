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

// src/traverse/index.ts
var traverse_exports = {};
__export(traverse_exports, {
  default: () => traverse_default,
  formatTree: () => formatTree
});
module.exports = __toCommonJS(traverse_exports);
var traverseTree = (data, map, ignoreMap = {}) => {
  data == null ? void 0 : data.forEach((d) => {
    var _a;
    if ((d == null ? void 0 : d.block_type) === 31) {
      d.table.cellNodes = (_a = d.table.cells) == null ? void 0 : _a.map((k) => map[k]);
    }
    if (d == null ? void 0 : d.parent_id) {
      d.parentNode = map[d.parent_id];
    }
    if (d == null ? void 0 : d.children) {
      d.childrenNodes = d.children.map((k) => {
        ignoreMap[k] = true;
        return map[k];
      });
      traverseTree(d.childrenNodes, map, ignoreMap);
    }
  });
};
var formatTree = (data) => {
  const map = {};
  let parentIndexArr = [];
  data == null ? void 0 : data.forEach((d, index) => {
    var _a, _b, _c, _d, _e, _f;
    map[d.block_id] = d;
    if (d.block_type === 2) {
      const content = (_c = (_b = (_a = d.text) == null ? void 0 : _a.elements) == null ? void 0 : _b[0].text_run) == null ? void 0 : _c.content;
      if (content == null ? void 0 : content.startsWith("::: tip")) {
        parentIndexArr.push(index);
        d.text.elements[0].text_run.content = content.split("tip")[1].trim();
        d.block_type = -1;
      } else if (content == null ? void 0 : content.startsWith("::: danger")) {
        parentIndexArr.push(index);
        d.text.elements[0].text_run.content = content.split("danger")[1].trim();
        d.block_type = -2;
      } else if (content == null ? void 0 : content.startsWith("::: warning")) {
        parentIndexArr.push(index);
        d.text.elements[0].text_run.content = content.split("warning")[1].trim();
        d.block_type = -3;
      } else if (content == null ? void 0 : content.startsWith(":::: el-tabs")) {
        parentIndexArr.push(index);
        d.block_type = -4;
      } else if (content == null ? void 0 : content.startsWith("::: el-tab-pane label=")) {
        d.text.elements[0].text_run.content = content.split("label=")[1].trim();
        const lastIndex = parentIndexArr.length - 1;
        if (data[parentIndexArr[lastIndex]]) {
          if (!data[parentIndexArr[lastIndex]].children) {
            data[parentIndexArr[lastIndex]].children = [];
          }
          (_d = data[parentIndexArr[lastIndex]].children) == null ? void 0 : _d.push(d.block_id);
          const parentData = map[d.parent_id || ""];
          if (parentData && parentData.children) {
            parentData.children = parentData.children.filter((v) => v !== d.block_id);
          }
        }
        parentIndexArr.push(index);
        d.block_type = -5;
      } else if (content == null ? void 0 : content.includes(":::")) {
        d.block_type = 999;
        parentIndexArr.pop();
      } else {
        const lastIndex = parentIndexArr.length - 1;
        if (data[parentIndexArr[lastIndex]]) {
          if (!data[parentIndexArr[lastIndex]].children) {
            data[parentIndexArr[lastIndex]].children = [];
          }
          (_e = data[parentIndexArr[lastIndex]].children) == null ? void 0 : _e.push(d.block_id);
          const parentData = map[d.parent_id || ""];
          if (parentData && parentData.children) {
            parentData.children = parentData.children.filter((v) => v !== d.block_id);
          }
        }
      }
    } else {
      const lastIndex = parentIndexArr.length - 1;
      if (data[parentIndexArr[lastIndex]]) {
        if (!data[parentIndexArr[lastIndex]].children) {
          data[parentIndexArr[lastIndex]].children = [];
        }
        (_f = data[parentIndexArr[lastIndex]].children) == null ? void 0 : _f.push(d.block_id);
        const parentData = map[d.parent_id || ""];
        if (parentData && parentData.children) {
          parentData.children = parentData.children.filter((v) => v !== d.block_id);
        }
      }
    }
  });
  const ignoreMap = {};
  traverseTree(data || [], map, ignoreMap);
  const filterList = (data == null ? void 0 : data.filter((d) => !ignoreMap[d.block_id])) || [];
  return filterList;
};
var traverse = async (name, d, m) => {
  if (!name || !d || !m[name]) {
    return 0;
  }
  let stopType = 0;
  await m[name]({
    data: d,
    skip: () => {
      stopType = 1;
    },
    stop: () => {
      stopType = 2;
    }
  });
  return stopType;
};
var traverseLink = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Link", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTextElementStyle = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextElementStyle", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseLink(d == null ? void 0 : d.link, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTextStyle = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextStyle", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTextRun = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextRun", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseMentionUser = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("MentionUser", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseMentionDoc = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("MentionDoc", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseReminder = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Reminder", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseInlineBlock = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("InlineBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseInlineFile = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("InlineFile", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseEquation = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Equation", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d == null ? void 0 : d.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseUndefinedElement = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("UndefinedElement", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseUndefined = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Undefined", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTextElement = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextElement", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextRun(d == null ? void 0 : d.text_run, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseMentionUser(d == null ? void 0 : d.mention_user, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseMentionDoc(d == null ? void 0 : d.mention_doc, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseReminder(d == null ? void 0 : d.reminder, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseInlineFile(d == null ? void 0 : d.file, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseInlineBlock(d == null ? void 0 : d.inline_block, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseEquation(d == null ? void 0 : d.equation, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseUndefinedElement(d == null ? void 0 : d.undefined_element, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTipBlock = async (d, m) => {
  var _a;
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TipBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextRun", (_a = d.text.elements) == null ? void 0 : _a[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseDangerBlock = async (d, m) => {
  var _a;
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("DangerBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextRun", (_a = d.text.elements) == null ? void 0 : _a[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseWarningBlock = async (d, m) => {
  var _a;
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("WarningBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextRun", (_a = d.text.elements) == null ? void 0 : _a[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTabsBlock = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TabsBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTabPaneBlock = async (d, m) => {
  var _a;
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TabPaneBlock", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TextRun", (_a = d.text.elements) == null ? void 0 : _a[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traversePage = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Page", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.page.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.page.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseText = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Text", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.text.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.text.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading1 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading1", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading1.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading1.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading2 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading2", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading2.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading2.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading3 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading3", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading3.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading3.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading4 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading4", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading4.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading4.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading5 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading5", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading5.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading5.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading6 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading6", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading6.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading6.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading7 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading7", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading7.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading7.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading8 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading8", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading8.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading8.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseHeading9 = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Heading9", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading9.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.heading9.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseBullet = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Bullet", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.bullet.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.bullet.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseOrdered = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Ordered", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.ordered.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.ordered.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseCode = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Code", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.code.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.code.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseQuote = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Quote", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.quote.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.quote.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTodo = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Todo", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.todo.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of d.todo.elements || []) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseBitable = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Bitable", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseCallout = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Callout", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseChatCard = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("ChatCard", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseDiagram = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Diagram", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseDivider = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Divider", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseFile = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("File", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseGrid = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Grid", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseGridColumn = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("GridColumn", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseIframe = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Iframe", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseImage = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Image", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseISV = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("ISV", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseMindnote = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Mindnote", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseSheet = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Sheet", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTable = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Table", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTableCell = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("TableCell", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseView = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("View", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseQuoteContainer = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("QuoteContainer", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseTask = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("Task", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseOKR = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("OKR", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseOkrObjective = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("OkrObjective", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseOkrKeyResult = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("OkrKeyResult", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseOkrProgress = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("OkrProgress", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseAddOns = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("AddOns", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseJiraIssue = async (d, m) => {
  let stopType = await traverse("start", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("JiraIssue", d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse("end", d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
};
var traverseBlock = async (d, m) => {
  let stopType = 0;
  switch (d.block_type) {
    case -5:
      stopType = await traverseTabPaneBlock(d, m);
      break;
    case -4:
      stopType = await traverseTabsBlock(d, m);
      break;
    case -3:
      stopType = await traverseWarningBlock(d, m);
      break;
    case -2:
      stopType = await traverseDangerBlock(d, m);
      break;
    case -1:
      stopType = await traverseTipBlock(d, m);
      break;
    case 1:
      stopType = await traversePage(d, m);
      break;
    case 2:
      stopType = await traverseText(d, m);
      break;
    case 3:
      stopType = await traverseHeading1(d, m);
      break;
    case 4:
      stopType = await traverseHeading2(d, m);
      break;
    case 5:
      stopType = await traverseHeading3(d, m);
      break;
    case 6:
      stopType = await traverseHeading4(d, m);
      break;
    case 7:
      stopType = await traverseHeading5(d, m);
      break;
    case 8:
      stopType = await traverseHeading6(d, m);
      break;
    case 9:
      stopType = await traverseHeading7(d, m);
      break;
    case 10:
      stopType = await traverseHeading8(d, m);
      break;
    case 11:
      stopType = await traverseHeading9(d, m);
      break;
    case 12:
      stopType = await traverseBullet(d, m);
      break;
    case 13:
      stopType = await traverseOrdered(d, m);
      break;
    case 14:
      stopType = await traverseCode(d, m);
      break;
    case 15:
      stopType = await traverseQuote(d, m);
      break;
    case 17:
      stopType = await traverseTodo(d, m);
      break;
    case 18:
      stopType = await traverseBitable(d, m);
      break;
    case 19:
      stopType = await traverseCallout(d, m);
      break;
    case 20:
      stopType = await traverseChatCard(d, m);
      break;
    case 21:
      stopType = await traverseDiagram(d, m);
      break;
    case 22:
      stopType = await traverseDivider(d, m);
      break;
    case 23:
      stopType = await traverseFile(d, m);
      break;
    case 24:
      stopType = await traverseGrid(d, m);
      break;
    case 25:
      stopType = await traverseGridColumn(d, m);
      break;
    case 26:
      stopType = await traverseIframe(d, m);
      break;
    case 27:
      stopType = await traverseImage(d, m);
      break;
    case 28:
      stopType = await traverseISV(d, m);
      break;
    case 29:
      stopType = await traverseMindnote(d, m);
      break;
    case 30:
      stopType = await traverseSheet(d, m);
      break;
    case 31:
      stopType = await traverseTable(d, m);
      break;
    case 32:
      stopType = await traverseTableCell(d, m);
      break;
    case 33:
      stopType = await traverseView(d, m);
      break;
    case 34:
      stopType = await traverseQuoteContainer(d, m);
      break;
    case 35:
      stopType = await traverseTask(d, m);
      break;
    case 36:
      stopType = await traverseOKR(d, m);
      break;
    case 37:
      stopType = await traverseOkrObjective(d, m);
      break;
    case 38:
      stopType = await traverseOkrKeyResult(d, m);
      break;
    case 39:
      stopType = await traverseOkrProgress(d, m);
      break;
    case 40:
      stopType = await traverseAddOns(d, m);
      break;
    case 41:
      stopType = await traverseJiraIssue(d, m);
      break;
    case 999:
      stopType = await traverseUndefined(d, m);
      break;
    default:
      return 0;
  }
  ;
  for (const childrenNode of d.childrenNodes || []) {
    if (childrenNode) {
      stopType = await traverseBlock(childrenNode, m);
      if (stopType === 2) {
        break;
      }
    }
  }
  return stopType;
};
var traverse_default = async (data, m) => {
  if (!Array.isArray(data)) {
    return;
  }
  const list = await formatTree(data);
  for (const d of list) {
    let stopType = await traverseBlock(d, m);
    if (stopType === 2) {
      break;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatTree
});
