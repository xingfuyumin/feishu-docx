import React, { FC, ReactNode, memo } from 'react';
import { Bullet } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Bullet;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
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
      <span className='feishudocx-bullet-content'>
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
      </span>
    </div>
    <div
      className={classNames(
        'feishudocx-bullet-children',
      )}
    >
      {data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))}
    </div>
    </>
  ) : null;
  return render ? render('Bullet', data, tsx) || null : tsx;
}) as FC<Props>)