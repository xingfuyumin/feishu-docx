import React, { FC, ReactNode, memo } from 'react';
import { Callout, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import { getCalloutStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';
import emojiData from '../emoji.json';

type Props = {
  data?: Callout;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {},
}) => {
  let tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-callout',
        ...getCalloutStyle(data),
      )}
    >
      <div className="feishudocx-callout-emoji">
        {(emojiData as any)[data.callout?.emoji_id || '']}
      </div>
      <div className="feishudocx-callout-content">
        {
          data?.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))
        }
      </div>
    </div>
  ) : null;
  return render ? render('Callout', data, tsx) || null : tsx;
}) as FC<Props>)