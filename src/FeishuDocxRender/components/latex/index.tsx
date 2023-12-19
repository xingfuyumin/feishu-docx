import React, { FC, ReactNode, memo } from 'react';
// import { TextRun } from "../../../traverse/index.d";
import classNames from 'classnames';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { getTextElementStyle } from '../utils';

type Props = {
  data?: any;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
};

export default memo((({ data, render, onLink = () => {} }) => {
  const tsx = data ? (
    <span
      className={classNames(
        'feishudocx-latex',
        ...getTextElementStyle(data?.text_element_style || {}),
      )}
      onClick={() => {
        if (data.text_element_style?.link?.url) {
          onLink(decodeURIComponent(data.text_element_style?.link?.url));
        }
      }}
    >
      <InlineMath math={data.content} />
    </span>
  ) : null;
  return render ? render('Latex', data, tsx) || null : tsx;
}) as FC<Props>);
