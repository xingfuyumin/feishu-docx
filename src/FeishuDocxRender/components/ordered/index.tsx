import React, { FC, ReactNode, memo } from 'react';
import { Ordered } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, formatOrderNum, getTextStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Ordered;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
  order?: string;
}

export default memo((({
  data, render, onLink, order = '',
}) => {
  const elements = data?.ordered?.elements || [];
  formatInlinecode(elements);
  let finalOrder = String(order);
  if (!order) {
    finalOrder = String(formatOrderNum(data));
  }
  let tsx = data ? (
    <>
      <div
        key={data.block_id}
        id={data.block_id}
        className={classNames(
          'feishudocx-ordered',
          ...getTextStyle(data.ordered?.style || {})
        )}
      >
        <span className='feishudocx-ordered-dot' >{finalOrder}.</span>
        <span className='feishudocx-ordered-content'>
          {
            elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
          }
        </span>
      </div>
      <div
        className={classNames(
          'feishudocx-ordered-children',
        )}
      >
        {data?.childrenNodes?.map((d, index) => renderSwitch(d, render, onLink, { order: `${finalOrder}.${index + 1}` }))}
      </div>
    </>
  ) : null;
  return render ? render('Ordered', data, tsx) || null : tsx;
}) as FC<Props>)