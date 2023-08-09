import React, { FC, ReactNode, memo } from 'react';
import { TabsBlock, TabPaneBlock } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';
import { Tabs } from '@tant/ui-next';

type Props = {
  data?: TabsBlock;
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
        'feishudocx-tabsblock',
      )}
    >
      <Tabs
        items={
          data?.childrenNodes?.map(d => {
            return ({
              key: d?.block_id,
              label: (d as unknown as TabPaneBlock)?.text?.elements?.[0]?.text_run?.content || '',
              children: renderSwitch(d, render, onLink),
            });
          })
        }
      />
    </div>
  ) : null;
  return render ? render('TabsBlock', data, tsx) || null : tsx;
}) as FC<Props>)