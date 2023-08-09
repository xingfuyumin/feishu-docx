import { FC, ReactNode, memo } from 'react';
import { TableCell, Block } from "../../../traverse/index.d";
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: TableCell;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
}

export default memo((({
  data, render, onLink,
}) => {
  const tsx = data ? data.childrenNodes?.map(d => renderSwitch(d, render, onLink))  : null;
  return render ? render('TableCell', data, tsx) || null : tsx;
}) as FC<Props>)