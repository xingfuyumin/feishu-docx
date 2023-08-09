import React, { FC, ReactNode, memo } from 'react';
import { Table, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: Table;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
}

export default memo((({
  data, render, onLink,
}) => {
  const property = data?.table?.property || { column_size: 0, row_size: 0, column_width: [], merge_info: [] };
  const cellNodes = data?.table?.cellNodes || [];
  const rowLen = property?.row_size || 0;
  const colLen = property?.column_size || 0;
  const rows = new Array(rowLen).fill('');
  const cols = new Array(colLen).fill('');
  const ignoreIndex: Record<string, boolean> = {};
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-table',
      )}
    >
      <table>
        <colgroup>
          {
            cols.map((col, colIndex) => <col key={colIndex} width={property?.column_width?.[colIndex]} />)
          }
        </colgroup>
        {
          rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                cols.map((col, colIndex) => {
                  const index = rowIndex * colLen + colIndex;
                  const rowSpan = property.merge_info?.[index]?.row_span || 1;
                  const colSpan = property.merge_info?.[index]?.col_span || 1;
                  if (rowSpan > 1) {
                    for (let x = colIndex; x < colIndex + colSpan; x += 1) {
                      for (let y = rowIndex; y < rowIndex + rowSpan; y += 1) {
                        ignoreIndex[`${x}-${y}`] = true;
                      }
                    }
                    delete ignoreIndex[`${colIndex}-${rowIndex}`]; // 第一个是本身需要去掉
                  }
                  if (ignoreIndex[`${colIndex}-${rowIndex}`]) {
                    return null;
                  }
                  return (
                    <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan}>
                    {
                      renderSwitch(cellNodes[index], render, onLink)
                    }
                  </td>
                  );
                })
              }
            </tr>
          ))
        }
      </table>
    </div>
  ) : null;
  return render ? render('Table', data, tsx) || null : tsx;
}) as FC<Props>)