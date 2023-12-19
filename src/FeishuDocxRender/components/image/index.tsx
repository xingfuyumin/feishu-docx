import React, { FC, ReactNode, memo } from 'react';
import { Image as Img } from "../../../traverse/index.d";
import { Image } from '@tant/ui-next'
import classNames from 'classnames';
import './index.less';

type Props = {
  data?: Img;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
}

export default memo((({
  data, render,
}) => {
  const containerWidth = document.querySelector('.feishudocx-container')?.clientWidth;
  const width = containerWidth ? (containerWidth - 64 ): data?.image.width || 0;
  const height = width / (data?.image.width || 0) * (data?.image.height || 0);
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      style={{ width: '100%', minHeight: height }}
      className={classNames(
        'feishudocx-image',
        data.image?.align ? `feishudocx-textstyle-align-${data.image?.align}` : '',
      )}
    >
      <Image className='feishudocx-image-container' src={data.image.base64} />
    </div>
  ) : null;
  return render ? render('Image', data, tsx) || null : tsx;
}) as FC<Props>)