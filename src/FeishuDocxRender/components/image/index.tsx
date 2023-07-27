import React, { FC, ReactNode, memo } from 'react';
import { Image } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';

type Props = {
  data?: Image;
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
        'feishudocx-image',
        data.image?.align ? `feishudocx-textstyle-align-${data.image?.align}` : '',
      )}
    >
      <img src={data.image.base64} />
    </div>
  ) : null;
  return render ? render('Image', data, tsx) || null : tsx;
}) as FC<Props>)