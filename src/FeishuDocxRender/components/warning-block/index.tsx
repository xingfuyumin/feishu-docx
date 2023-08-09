import React, { FC, ReactNode, memo } from 'react';
import { WarningBlock } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: WarningBlock;
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
        'feishudocx-warningblock',
      )}
    >
      <div className="feishudocx-warningblock-title">{data?.text?.elements?.[0]?.text_run?.content}</div>
      {data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))}
    </div>
  ) : null;
  return render ? render('WarningBlock', data, tsx) || null : tsx;
}) as FC<Props>)