import React, { FC, ReactNode, memo } from 'react';
import { TextRun } from "../../../traverse/index.d";
import classNames from 'classnames';
import { getTextElementStyle } from '../utils';
import './index.less';

type Props = {
  data?: TextRun;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink = () => {},
}) => {
  const tsx = data ? (
    <span
      className={classNames(
        'feishudocx-textrun',
        ...getTextElementStyle(data?.text_element_style || {}),
      )}
      onClick={() => {
        if (data.text_element_style?.link?.url) {
          onLink(decodeURIComponent(data.text_element_style?.link?.url));
        }
      }}
    >
      {data.content}
    </span>
  ) : null;
  return render ? render('TextRun', data, tsx) || null : tsx;
}) as FC<Props>)