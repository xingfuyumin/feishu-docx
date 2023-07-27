import React, { FC, ReactNode, memo } from 'react';
import { TextElement } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextRun from '../text-run';
import './index.less';

type Props = {
  data?: TextElement;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const tsx = data ? (
    <span
      className={classNames(
        'feishudocx-textelement',
      )}
    >
      <TextRun data={data?.text_run} render={render} onLink={onLink}/>
    </span>
  ) : null;
  return render ? render('TextElement', data, tsx) || null : tsx;
}) as FC<Props>)