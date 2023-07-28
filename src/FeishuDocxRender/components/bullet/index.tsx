import React, { FC, ReactNode, memo } from 'react';
import { Bullet, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Bullet;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {},
}) => {
  const elements = data?.bullet?.elements || [];
  formatInlinecode(elements);
  let tsx = data ? (
    <>
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-bullet',
        ...getTextStyle(data.bullet?.style || {})
      )}
    >
      <span className='feishudocx-bullet-dot' >•</span>
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
    <div
      className={classNames(
        'feishudocx-bullet-children',
      )}
    >
      {data?.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))}
    </div>
    </>
  ) : null;
  return render ? render('Bullet', data, tsx) || null : tsx;
}) as FC<Props>)