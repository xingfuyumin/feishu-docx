import React, { FC, ReactNode, memo } from 'react';
import { Divider } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';

type Props = {
  data?: Divider;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
}

export default memo((({
  data, render,
}) => {
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-divider',
      )}
    />
  ) : null;
  return render ? render('Divider', data, tsx) || null : tsx;
}) as FC<Props>)