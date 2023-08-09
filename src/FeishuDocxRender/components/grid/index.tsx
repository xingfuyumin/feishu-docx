import React, { FC, ReactNode, memo } from 'react';
import { Grid, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Grid;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
}

export default memo((({
  data, render, onLink,
}) => {
  const cols = new Array(data?.grid?.column_size || 2).fill('');
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-grid',
      )}
    >
      {cols.map((col, colIndex) => renderSwitch(data.childrenNodes?.[colIndex] as any, render, onLink))}
    </div>
  ) : null;
  return render ? render('Grid', data, tsx) || null : tsx;
}) as FC<Props>)