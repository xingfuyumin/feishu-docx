import React, { FC, ReactNode, memo, useEffect, useRef } from 'react';
import { Image as Img } from "../../../traverse/index.d";
import { Image } from '@tant/ui-next'
import classNames from 'classnames';
import './index.less';

type Props = {
  data?: Img;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
}

const Index: FC<Props> = ({
  data, render,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imageRef.current) {
      const w = imageRef.current.offsetWidth || 0;
      const h = w * (data?.image.height || 0) / (data?.image.width || 0);
      imageRef.current.style.minHeight = `${Math.min(h, data?.image.height || 0)}px`;
    }
  })
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      ref={imageRef}
      className={classNames(
        'feishudocx-image',
        data.image?.align ? `feishudocx-textstyle-align-${data.image?.align}` : '',
      )}
    >
      <Image className='feishudocx-image-container' src={data.image.base64} />
    </div>
  ) : null;
  return render ? render('Image', data, tsx) || null : tsx;
}

export default memo(Index);