import classNames from 'classnames';
import React, { FC, ReactNode, memo } from 'react';
import { Code } from '../../../traverse/index.d';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import CodeBlock from './code-block';
import './index.less';

type Props = {
  data?: Code;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
};

export const CODE_TYPE = [
"",//下标枚举从1开始
"PlainText",
"ABAP",
"Ada",
"Apache",
"Apex",
"Assembly",
"Bash",
"CSharp",
"C++",
"C",
"COBOL",
"CSS",
"CoffeeScript",
"D",
"Dart",
"Delphi",
"Django",
"Dockerfile",
"Erlang",
"Fortran",
"FoxPro",
"Go",
"Groovy",
"HTML",
"HTMLBars",
"HTTP",
"Haskell",
"JSON",
"Java",
"JavaScript",
"Julia",
"Kotlin",
"LateX",
"Lisp",
"Logo",
"Lua",
"MATLAB",
"Makefile",
"Markdown",
"Nginx",
"Objective",
"OpenEdgeABL",
"PHP",
"Perl",
"PostScript",
"PowerShell",
"Prolog",
"ProtoBuf",
"Python",
"R",
"RPG",
"Ruby",
"Rust",
"SAS",
"SCSS",
"SQL",
"Scala",
"Scheme",
"Scratch",
"Shell",
"Swift",
"Thrift",
"TypeScript",
"VBScript",
"Visual",
"XML",
"YAML",
"CMake",
"Diff",
"Gherkin",
"GraphQL",
"OpenGL Shading Language",
"Properties",
"Solidity",
"TOML",
];

export default memo((({ data, render, onLink }) => {
  const elements = data?.code?.elements || [];
  formatInlinecode(elements);
  let codeString = ''
  elements.forEach(el=>{
    codeString += `${el?.text_run?.content}`
  })
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-code',
        ...getTextStyle(data.code.style, true),
      )}
    >
      <CodeBlock language={CODE_TYPE[Number(data.code.style.language)]} code={codeString} />
      {/* {elements.map((el, index) => (
        <div
          data-line-num={index + 1}
          key={index}
          className="feishudocx-code-line"
        >
          <TextElement data={el} render={render} onLink={onLink} />
        </div>
      ))} */}
    </div>
  ) : null;
  return render ? render('Code', data, tsx) || null : tsx;
}) as FC<Props>);
