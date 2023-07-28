import React, { FC, ReactNode, memo } from 'react';
import { Block } from '../traverse/index.d';
import './style.less';
import './index.less';
import PageRender from './components/page';
import TextRender from './components/text';
import BulletRender from './components/bullet';
import ImageRender from './components/image';
import Heading1Render from './components/heading1';
import Heading2Render from './components/heading2';
import Heading3Render from './components/heading3';
import Heading4Render from './components/heading4';
import Heading5Render from './components/heading5';
import Heading6Render from './components/heading6';
import Heading7Render from './components/heading7';
import Heading8Render from './components/heading8';
import Heading9Render from './components/heading9';
import TableRender from './components/table';
import TableCellRender from './components/table-cell';

type Props = {
  showDirectory?: boolean,
  data: Block[];
  className?: string;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

export const renderSwitch = (d: Block, map: Record<string, Block>, render?: Props['render'], onLink?: Props['onLink']) => {
  switch (d?.block_type) {
    case 1: return <PageRender data={d} dataMap={map} render={render} key={d.block_id} onLink={onLink} />
    case 2: return <TextRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case 3: return <Heading1Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 4: return <Heading2Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 5: return <Heading3Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 6: return <Heading4Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 7: return <Heading5Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 8: return <Heading6Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 9: return <Heading7Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 10: return <Heading8Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 11: return <Heading9Render data={d} render={render} key={d.block_id} onLink={onLink} />
    case 12: return <BulletRender data={d} render={render} key={d.block_id} onLink={onLink} dataMap={map} />
    // case 13: return <Ordered data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 14: return <Code data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 15: return <Quote data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 17: return <Todo data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 18: return <Bitable data={d} render={render} key={d.block_id} />
    // case 19: return <Callout data={d} render={render} key={d.block_id} />
    // case 20: return <ChatCard data={d} render={render} key={d.block_id} />
    // case 21: return <Diagram data={d} render={render} key={d.block_id} />
    // case 22: return <Divider data={d} render={render} key={d.block_id} />
    // case 23: return <File data={d} render={render} key={d.block_id} />
    // case 24: return <Grid data={d} render={render} key={d.block_id} />
    // case 25: return <GridColumn data={d} render={render} key={d.block_id} />
    // case 26: return <Iframe data={d} render={render} key={d.block_id} />
    case 27: return <ImageRender data={d} render={render} key={d.block_id} />
    // case 28: return <ISV data={d} render={render} key={d.block_id} />
    // case 29: return <Mindnote data={d} render={render} key={d.block_id} />
    // case 30: return <Sheet data={d} render={render} key={d.block_id} />
    case 31: return <TableRender data={d} dataMap={map} render={render} key={d.block_id} onLink={onLink} />
    case 32: return <TableCellRender data={d} dataMap={map} render={render} key={d.block_id} onLink={onLink} />;
    // case 33: return <View data={d} render={render} key={d.block_id} />
    // case 34: return <QuoteContainer data={d} render={render} key={d.block_id} />
    // case 35: return <Task data={d} render={render} key={d.block_id} />
    // case 36: return <OKR data={d} render={render} key={d.block_id} />
    // case 37: return <OkrObjective data={d} render={render} key={d.block_id} />
    // case 38: return <OkrKeyResult data={d} render={render} key={d.block_id} />
    // case 39: return <OkrProgress data={d} render={render} key={d.block_id} />
    // case 40: return <AddOns data={d} render={render} key={d.block_id} />
    // case 41: return <JiraIssue data={d} render={render} key={d.block_id} />
    // case 999: return <Undefined data={d} render={render} key={d.block_id} />
    default: return null;
  };
}

const traverseTree = (data: Block[], map: Record<string, Block>, ignoreMap: Record<string, boolean> = {}) => {
  data?.forEach((d) => {
    if (d?.children) {
      traverseTree(d.children.map((d) => {
        ignoreMap[d] = true;
        return map[d];
      }), map, ignoreMap); 
    }
  });
}

const Index: FC<Props> = ({
  data = [], render, onLink,
}) => {
  if (!data) {
    return null;
  }
  const map: Record<string, Block> = {};
  data?.forEach((d) => {
    map[d.block_id] = d;
  });
  const ignoreMap: Record<string, boolean> = {};
  traverseTree(data || [], map, ignoreMap);
  const filterList: Block[] = data?.filter(d => !ignoreMap[d.block_id]) || [];
  return (
    <div className="feishudocx-container">
      {
        filterList.map(d => renderSwitch(d, map, render, onLink))
      }
    </div>
  );
}

export default memo(Index);
