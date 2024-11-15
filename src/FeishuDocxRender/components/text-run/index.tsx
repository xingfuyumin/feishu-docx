import classNames from 'classnames';
import React, { FC, ReactNode, memo } from 'react';
import { TextRun } from '../../../traverse/index.d';
import { getTextElementStyle } from '../utils';
import './index.less';

type Props = {
  data?: TextRun;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
};

export default memo((({ data, render, onLink = () => {} }) => {
  //api表格数据处理
  const replaceTxt = (data: any) => {
    if (!data?.tableCellInfo) {
      return <span>{data.content}</span>;
    }

    const { colIndex, apiColIndex, rowIndex,needApiIndent } = data.tableCellInfo;
    if (colIndex !== apiColIndex) {
      return <span>{data.content}</span>;
    }

    if (data.content.includes('$$')) {
      return <span>{data.content.replace('$$', '')}</span>;
    }

    if (rowIndex > 1&&needApiIndent) {
      const values = data.content
        .split('.')
        .map((v: string) => v.replace(/\s+/g, ''));
      const lastValue = values.pop();
      const count = values.length;
      return count?<span style={{ paddingLeft: count * 20 }}><b style={{fontWeight:'normal',color:'#8d8d8d',marginRight:'4px'}}>∟</b>{`${lastValue}`}</span>:<span>{data.content}</span>;
    }

    return <span>{data.content}</span>;
  };

  const tsx = data ? (
    <span
      className={classNames(
        'feishudocx-textrun',
        ...getTextElementStyle(data?.text_element_style || {}),
      )}
      onClick={() => {
        if (data.text_element_style?.link?.url) {
          onLink(decodeURIComponent(data.text_element_style?.link?.url));
        }
      }}
    >
      {replaceTxt(data)}
    </span>
  ) : null;
  return render ? render('TextRun', data, tsx) || null : tsx;
}) as FC<Props>);
