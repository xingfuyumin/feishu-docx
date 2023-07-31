import React, { FC, ReactNode, memo } from 'react';
import { Code } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { formatInlinecode, getTextStyle } from '../utils';
import TextElement from '../text-element';

type Props = {
  data?: Code;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export const CODE_TYPE = [
  'plaintext',
  'abap',
  'ada',
  'apache',
  'apex',
  'assembly',
  'bash',
  'csharp',
  'c++',
  'c',
  'cobol',
  'css',
  'coffeescript',
  'd',
  'dart',
  'delphi',
  'django',
  'dockerfile',
  'erlang',
  'fortran',
  'foxpro',
  'go',
  'groovy',
  'html',
  'htmlbars',
  'http',
  'haskell',
  'json',
  'java',
  'javascript',
  'julia',
  'kotlin',
  'latex',
  'lisp',
  'logo',
  'lua',
  'matlab',
  'makefile',
  'markdown',
  'nginx',
  'objective',
  'openedgeabl',
  'php',
  'perl',
  'postscript',
  'power',
  'prolog',
  'protobuf',
  'python',
  'r',
  'rpg',
  'ruby',
  'rust',
  'sas',
  'scss',
  'sql',
  'scala',
  'scheme',
  'scratch',
  'shell',
  'swift',
  'thrift',
  'typescript',
  'vbscript',
  'visual',
  'xml',
  'yaml',
  'cmake',
  'diff',
  'gherkin',
  'graphql',
  'opengl shading language',
  'properties',
  'solidity',
  'toml'
];

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.code?.elements || [];
  formatInlinecode(elements);
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-code',
        ...getTextStyle(data.code.style, true),
      )}
    >
      {
        elements.map((el, index) => <div data-line-num={index + 1} key={index} className="feishudocx-code-line">
          <TextElement data={el} render={render} onLink={onLink} />
        </div>)
      }
    </div>
  ) : null;
  return render ? render('Code', data, tsx) || null : tsx;
}) as FC<Props>)