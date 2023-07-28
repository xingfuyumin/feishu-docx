import React, { FC, ReactNode, memo } from 'react';
import { GridColumn, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: GridColumn;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {},
}) => {
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      style={{
        width: `${data.grid_column.width_ratio}%`,
      }}
      className={classNames(
        'feishudocx-gridcolumn',
      )}
    >
      {data.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))}
    </div>
  ) : null;
  return render ? render('GridColumn', data, tsx) || null : tsx;
}) as FC<Props>)