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
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      style={{ width: data.image.width }}
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