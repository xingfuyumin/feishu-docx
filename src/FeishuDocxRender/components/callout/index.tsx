import React, { FC, ReactNode, memo } from 'react';
import { Callout } from "../../../traverse/index.d";
import classNames from 'classnames';
import { getCalloutStyle } from '../utils';
import './index.less';
import { renderSwitch } from '../..';
import emojiData from '../emoji.json';

type Props = {
  data?: Callout;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
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
          data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))
        }
      </div>
    </div>
  ) : null;
  return render ? render('Callout', data, tsx) || null : tsx;
}) as FC<Props>)