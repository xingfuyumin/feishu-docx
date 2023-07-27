import React, { FC, ReactNode, memo } from 'react';
import { Text } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Text;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.text?.elements || [];
  elements.forEach((el, index) => {
    if (!!el.text_run?.text_element_style?.inline_code) {
      if (!elements[index - 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_first = true;
      }
      if (!elements[index + 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_last = true;
      }
    }
  });
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-text',
        ...getTextStyle('Text', data.text?.style || {})
      )}
    >
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Text', data, tsx) || null : tsx;
}) as FC<Props>)