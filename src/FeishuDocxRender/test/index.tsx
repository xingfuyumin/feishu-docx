import React, { useEffect, useState } from 'react';
import data from './data.json';
import FeishuDocxRender from '../index';
import ImageRender from '../components/image';
import { Tree } from '@tant/ui-next';
import './index.less';


export default () => {
  const [id, setId] = useState('JRYIdsXdToa6PRxWUSQcW4I5nth');
  const [treeData, setTreeData] = useState([]);
  const [map, setMap] = useState<Record<string, any[]>>({});
  const traverseTree = (ds: any[], td: any) => {
    ds.forEach((d) => {
      map[d.obj_token] = d.contents;
      const obj = {
        key: d.obj_token,
        title: d.title,
        children: d.has_child ? [] : null,
        selectable: true,
      }
      td.push(obj);
      if (d.has_child) {
        traverseTree(d.children, obj.children);
      }
    });
  }
  useEffect(() => {
    traverseTree(data as any, treeData);
    setMap({ ...map });
    setTreeData([...treeData]);
  }, [1]);
  const contents = map[id];
  console.log(id, contents);
  return (
    <div className="demo-container">
      <div className="demo-left">
        <Tree
          treeData={treeData}
          defaultExpandAll
          autoExpandParent
          selectable
          selectedKeys={[id]}
          onSelect={v => {
            setId(v[0] || '' as any)
          }}
          onExpand={(ks, { node }) => {
            setId(node.key);
          }}
        />
      </div>
      <div className="demo-right">
        <FeishuDocxRender
          data={contents}
          render={(name, data, tsx) => {
            if (name === 'Image') {
              data.image.base64 = `http://localhost:8000/image/${data.image.token}.png`;
              return <ImageRender data={data} />
            }
            return tsx;
          }}
        />
      </div>
    </div>
  )
}