import React, { FC, ReactNode, memo } from 'react';
import { Page } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Page;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
}

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.page?.elements || [];
  formatInlinecode(elements);
  let tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-page',
        ...getTextStyle(data.page?.style || {})
      )}
    >
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  tsx = <>
    {tsx}
    {data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))}
  </>
  return render ? render('Page', data, tsx) || null : tsx;
}) as FC<Props>)