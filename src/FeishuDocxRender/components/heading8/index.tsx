import React, { FC, ReactNode, memo } from 'react';
import { Heading8 } from "../../../traverse/index.d";
import classNames from 'classnames';
import TextElement from '../text-element';
import { formatInlinecode, getTextStyle } from '../utils';
import './index.less';

type Props = {
  data?: Heading8;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export default memo((({
  data, render, onLink,
}) => {
  const elements = data?.heading8?.elements || [];
  formatInlinecode(elements);
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-heading8',
        ...getTextStyle(data.heading8?.style || {})
      )}
    >
      {
        elements.map((el, index) => <TextElement key={index} data={el} render={render} onLink={onLink} />)
      }
    </div>
  ) : null;
  return render ? render('Heading8', data, tsx) || null : tsx;
}) as FC<Props>)