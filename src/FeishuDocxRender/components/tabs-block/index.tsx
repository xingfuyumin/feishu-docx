import React, { FC, ReactNode, memo } from 'react';
import { TabsBlock, Block, TabPaneBlock } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';
import { Tabs } from '@tant/ui-next';

type Props = {
  data?: TabsBlock;
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
      className={classNames(
        'feishudocx-tabsblock',
      )}
    >
      <Tabs
        items={
          data?.children?.map(d => {
            return ({
              key: d,
              label: (dataMap[d] as unknown as TabPaneBlock)?.text?.elements?.[0]?.text_run?.content || '',
              children: renderSwitch(dataMap[d], dataMap, render, onLink),
            });
          })
        }
      />
    </div>
  ) : null;
  return render ? render('TabsBlock', data, tsx) || null : tsx;
}) as FC<Props>)