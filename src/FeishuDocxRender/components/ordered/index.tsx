import React, { FC, ReactNode, memo } from 'react';
import { Ordered, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Ordered;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
  order?: string;
}

export default memo((({
  data, render, onLink, dataMap = {}, order = '',
}) => {
  const elements = data?.ordered?.elements || [];
  formatInlinecode(elements);
  let finalOrder = String(order);
  if (!order) {
    const parentData = dataMap?.[data?.parent_id || ''];
    if (parentData) {
      const childrenData = (parentData.children?.map(d => dataMap[d]) || []).filter(v => v.block_type === 13);
      finalOrder = String((childrenData?.findIndex(d => d.block_id === data?.block_id) || 0) + 1);
    }
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
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
    <div
      className={classNames(
        'feishudocx-ordered-children',
      )}
    >
      {data?.children?.map((d, index) => renderSwitch(dataMap[d], dataMap, render, onLink, { order: `${finalOrder}.${index + 1}` }))}
    </div>
    </>
  ) : null;
  return render ? render('Ordered', data, tsx) || null : tsx;
}) as FC<Props>)