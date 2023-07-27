import React, { FC, ReactNode, memo } from 'react';
import { Bullet } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Bullet;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-bullet',
        ...getTextStyle('Bullet', data.bullet?.style || {})
      )}
    >
      <span className='feishudocx-bullet-dot' >•</span>
      {
        data?.bullet?.elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Bullet', data, tsx) || null : tsx;
}) as FC<Props>)