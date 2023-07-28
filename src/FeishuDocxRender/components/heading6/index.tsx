import React, { FC, ReactNode, memo } from 'react';
import { Heading6 } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Heading6;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.heading6?.elements || [];
  formatInlinecode(elements);
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-heading6',
        ...getTextStyle(data.heading6?.style || {})
      )}
    >
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Heading6', data, tsx) || null : tsx;
}) as FC<Props>)