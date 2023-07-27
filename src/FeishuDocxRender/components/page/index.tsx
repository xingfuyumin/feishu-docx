import React, { FC, ReactNode, memo } from 'react';
import { Page } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Page;
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
        'feishudocx-page',
        ...getTextStyle('Page', data.page?.style || {})
      )}
    >
      {
        data?.page?.elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Page', data, tsx) || null : tsx;
}) as FC<Props>)