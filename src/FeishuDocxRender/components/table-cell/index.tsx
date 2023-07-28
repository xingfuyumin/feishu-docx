import { FC, ReactNode, memo } from 'react';
import { TableCell, Block } from "../../../traverse/index.d";
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: TableCell;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {},
}) => {
  const tsx = data ? data.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))  : null;
  return render ? render('TableCell', data, tsx) || null : tsx;
}) as FC<Props>)