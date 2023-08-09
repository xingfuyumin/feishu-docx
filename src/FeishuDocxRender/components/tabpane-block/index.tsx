import React, { FC, ReactNode, memo } from 'react';
import { TabPaneBlock } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: TabPaneBlock;
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
        'feishudocx-tabpaneblock',
      )}
    >
      {data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))}
    </div>
  ) : null;
  return render ? render('TabPaneBlock', data, tsx) || null : tsx;
}) as FC<Props>)