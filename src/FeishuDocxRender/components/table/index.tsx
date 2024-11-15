import classNames from 'classnames';
import React, { FC, ReactNode, memo, useMemo } from 'react';
import { renderSwitch } from '../..';
import { Block, Table } from '../../../traverse/index.d';
import './index.less';

type Props = {
  data?: Table;
  allData?: Block[];
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
};

const Index: FC<Props> = ({ data, render, onLink }) => {
  const property = data?.table?.property || {
    column_size: 0,
    row_size: 0,
    column_width: [],
    merge_info: [],
  };
  const cellNodes = data?.table?.cellNodes || [];
  const rowLen = property?.row_size || 0;
  const colLen = property?.column_size || 0;
  const rows = new Array(rowLen).fill('');
  const cols = new Array(colLen).fill('');

  // 表格里的api需要缩进处理的会有专门标识“$$”,参见各个模型api
  const needApiIndent = cellNodes.some((cell:any)=>{
    const d = cell?.childrenNodes?.[0]?.text?.elements?.[0]?.text_run?.content||''
    return d.indexOf('$$')!==-1
  })


  const ignoreArr = useMemo(() => {
    const arr: number[][] = [];
    rows.forEach((row, rowIndex) => {
      cols.forEach((col, colIndex) => {
        const index = rowIndex * colLen + colIndex;
        const rowSpan = property.merge_info?.[index]?.row_span || 1;
        const colSpan = property.merge_info?.[index]?.col_span || 1;
        if (rowSpan > 1 || colSpan > 1) {
          const d = [rowIndex, colIndex, rowIndex, colIndex];
          if (rowSpan > 1) {
            d[2] = rowIndex + rowSpan - 1;
          }
          if (colSpan > 1) {
            d[3] = colIndex + colSpan - 1;
          }
          arr.push(d);
        }
      });
    });
    return arr;
  }, [rowLen, colLen]);

  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames('feishudocx-table')}
    >
      <table>
        <colgroup>
          {cols.map((col, colIndex) => (
            <col key={colIndex} width={property?.column_width?.[colIndex]} />
          ))}
        </colgroup>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {cols.map((col, colIndex) => {
              const index = rowIndex * colLen + colIndex;
              const rowSpan = property.merge_info?.[index]?.row_span || 1;
              const colSpan = property.merge_info?.[index]?.col_span || 1;
              let cellData = cellNodes[index] as any;

              if (
                ignoreArr.find(
                  (d) =>
                    (rowIndex > d[0] &&
                      rowIndex <= d[2] &&
                      colIndex >= d[1] &&
                      colIndex <= d[3]) ||
                    (colIndex > d[1] &&
                      colIndex <= d[3] &&
                      rowIndex >= d[0] &&
                      rowIndex <= d[2]),
                )
              ) {
                return null;
              }
              if (
                cellData &&
                cellData.childrenNodes &&
                cellData.childrenNodes[0] &&
                cellData.childrenNodes[0].text &&
                cellData.childrenNodes[0].text.elements &&
                cellData.childrenNodes[0].text.elements[0] &&
                cellData.childrenNodes[0].text.elements[0].text_run
              ) {
                cellData.childrenNodes[0].text.elements[0].text_run.tableCellInfo =
                  {
                    colIndex,
                    rowIndex,
                    apiColIndex: 0, //默认第一列是参数
                    needApiIndent
                  };
              }
              return (
                <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan}>
                  {renderSwitch(cellData, render, onLink)}
                </td>
              );
            })}
          </tr>
        ))}
      </table>
    </div>
  ) : null;

  return render ? render('Table', data, tsx) || null : tsx;
};

export default memo(Index);
