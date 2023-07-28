import React, { FC, ReactNode, memo } from 'react';
import { QuoteContainer, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: QuoteContainer;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {}
}) => {
  let tsx = data ? (
    <>
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-quotecontainer',
      )}
    >
      {data?.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))}
    </div>
    </>
  ) : null;
  return render ? render('QuoteContainer', data, tsx) || null : tsx;
}) as FC<Props>)