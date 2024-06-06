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

// src/FeishuDocxRender/components/code/index.tsx
var code_exports = {};
__export(code_exports, {
  CODE_TYPE: () => CODE_TYPE,
  default: () => code_default
});
module.exports = __toCommonJS(code_exports);
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_utils = require("../utils");
var import_code_block = __toESM(require("./code-block"));
var import_index = require("./index.less");
var CODE_TYPE = [
  "plaintext",
  "abap",
  "ada",
  "apache",
  "apex",
  "assembly",
  "bash",
  "csharp",
  "c++",
  "c",
  "cobol",
  "css",
  "coffeescript",
  "d",
  "dart",
  "delphi",
  "django",
  "dockerfile",
  "erlang",
  "fortran",
  "foxpro",
  "go",
  "groovy",
  "html",
  "htmlbars",
  "http",
  "haskell",
  "json",
  "java",
  "javascript",
  "julia",
  "kotlin",
  "latex",
  "lisp",
  "logo",
  "lua",
  "matlab",
  "makefile",
  "markdown",
  "nginx",
  "objective",
  "openedgeabl",
  "php",
  "perl",
  "postscript",
  "power",
  "prolog",
  "protobuf",
  "python",
  "r",
  "rpg",
  "ruby",
  "rust",
  "sas",
  "scss",
  "sql",
  "scala",
  "scheme",
  "scratch",
  "shell",
  "swift",
  "thrift",
  "typescript",
  "vbscript",
  "visual",
  "xml",
  "yaml",
  "cmake",
  "diff",
  "gherkin",
  "graphql",
  "opengl shading language",
  "properties",
  "solidity",
  "toml"
];
var code_default = (0, import_react.memo)(({ data, render, onLink }) => {
  var _a;
  const elements = ((_a = data == null ? void 0 : data.code) == null ? void 0 : _a.elements) || [];
  (0, import_utils.formatInlinecode)(elements);
  let codeString = "";
  elements.forEach((el) => {
    var _a2;
    codeString += `${(_a2 = el == null ? void 0 : el.text_run) == null ? void 0 : _a2.content}`;
  });
  const tsx = data ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: data.block_id,
      id: data.block_id,
      className: (0, import_classnames.default)(
        "feishudocx-code",
        ...(0, import_utils.getTextStyle)(data.code.style, true)
      )
    },
    /* @__PURE__ */ import_react.default.createElement(import_code_block.default, { language: "javascript", code: codeString })
  ) : null;
  return render ? render("Code", data, tsx) || null : tsx;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CODE_TYPE
});
