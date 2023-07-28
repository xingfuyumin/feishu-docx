import React, { FC, ReactNode, memo } from 'react';
import { Heading5 } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Heading5;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.heading5?.elements || [];
  formatInlinecode(elements);
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-heading5',
        ...getTextStyle(data.heading5?.style || {})
      )}
    >
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Heading5', data, tsx) || null : tsx;
}) as FC<Props>)