import React, { useEffect } from 'react';
import testData from './data.json';
import traverse from '..';


export default () => {
  const traverseTree = async (data: any[], map: Record<string, boolean>) => {
    for (const d of data) {
      console.log(d.title);
      await traverse(d.contents, {
        TextRun: ({ data, skip, stop }) => {
          map[data.content] = true;
        },
        Code: async ({ data, skip, stop }) => {
          const strArr: string[] = [];
          for (const childNode of data?.childrenNodes || []) {
            const strs: string[] = [];
            await traverse([childNode], {
              TextRun: ({ data, skip, stop }) => {
                strs.push(data.content);
              },
            });
            strArr.push(strs.join(','))
          }
          map[strArr.join('\n')] = true;
          console.log(strArr.join('\n'));
          skip();
        },
      });
      if (d.children?.length) {
        await traverseTree(d.children, map);
      }
    }
  }
  useEffect(() => {
    (async () => {
      const map: Record<string, boolean> = {};
      await traverseTree(testData as any[], map);
      console.log(map);
    })();
  }, [])
  return (
    <div className="demo-container">
    </div>
  )
}