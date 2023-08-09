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

// src/traverse/test/index.tsx
var test_exports = {};
__export(test_exports, {
  default: () => test_default
});
module.exports = __toCommonJS(test_exports);
var import_react = __toESM(require("react"));
var import_data = __toESM(require("./data.json"));
var import__ = __toESM(require(".."));
var test_default = () => {
  const traverseTree = async (data, map) => {
    var _a;
    for (const d of data) {
      console.log(d.title);
      await (0, import__.default)(d.contents, {
        TextRun: ({ data: data2, skip, stop }) => {
          map[data2.content] = true;
        },
        Code: async ({ data: data2, skip, stop }) => {
          const strArr = [];
          for (const childNode of (data2 == null ? void 0 : data2.childrenNodes) || []) {
            const strs = [];
            await (0, import__.default)([childNode], {
              TextRun: ({ data: data3, skip: skip2, stop: stop2 }) => {
                strs.push(data3.content);
              }
            });
            strArr.push(strs.join(","));
          }
          map[strArr.join("\n")] = true;
          console.log(strArr.join("\n"));
          skip();
        }
      });
      if ((_a = d.children) == null ? void 0 : _a.length) {
        await traverseTree(d.children, map);
      }
    }
  };
  (0, import_react.useEffect)(() => {
    (async () => {
      const map = {};
      await traverseTree(import_data.default, map);
      console.log(map);
    })();
  }, []);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "demo-container" });
};
