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
import GridRender from './components/grid';
import GridColumnRender from './components/grid-column';
import DividerRender from './components/divider';
import OrderedRender from './components/ordered';
import CalloutRender from './components/callout';
import QuoteContainerRender from './components/quote-container';
import CodeRender from './components/code';
import TipBlockRender from './components/tip-block';
import DangerBlockRender from './components/danger-block';
import WarningBlockRender from './components/warning-block';
import TabsBlockRender from './components/tabs-block';
import TabpaneBlockRender from './components/tabpane-block';
import { formatTree } from '../traverse';

type Props = {
  showDirectory?: boolean,
  data: Block[];
  className?: string;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}
type Extra = {
  order?: string; // 有序列表中的前缀
}

export const renderSwitch = (d: Block, render?: Props['render'], onLink?: Props['onLink'], extra?: Extra) => {
  switch (d?.block_type) {
    case -5: return <TabpaneBlockRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case -4: return <TabsBlockRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case -3: return <WarningBlockRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case -2: return <DangerBlockRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case -1: return <TipBlockRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case 1: return <PageRender data={d} render={render} key={d.block_id} onLink={onLink} />
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
    case 12: return <BulletRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case 13: return <OrderedRender data={d} render={render} key={d.block_id} onLink={onLink} {...extra} />
    case 14: return <CodeRender data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 15: return <Quote data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 17: return <Todo data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 18: return <Bitable data={d} render={render} key={d.block_id} />
    case 19: return <CalloutRender data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 20: return <ChatCard data={d} render={render} key={d.block_id} />
    // case 21: return <Diagram data={d} render={render} key={d.block_id} />
    case 22: return <DividerRender data={d} render={render} key={d.block_id} />
    // case 23: return <File data={d} render={render} key={d.block_id} />
    case 24: return <GridRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case 25: return <GridColumnRender data={d} render={render} key={d.block_id} onLink={onLink} />
    // case 26: return <Iframe data={d} render={render} key={d.block_id} />
    case 27: return <ImageRender data={d} render={render} key={d.block_id} />
    // case 28: return <ISV data={d} render={render} key={d.block_id} />
    // case 29: return <Mindnote data={d} render={render} key={d.block_id} />
    // case 30: return <Sheet data={d} render={render} key={d.block_id} />
    case 31: return <TableRender data={d} render={render} key={d.block_id} onLink={onLink} />
    case 32: return <TableCellRender data={d} render={render} key={d.block_id} onLink={onLink} />;
    // case 33: return <View data={d} render={render} key={d.block_id} />
    case 34: return <QuoteContainerRender data={d} render={render} key={d.block_id} onLink={onLink} />
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
const Index: FC<Props> = ({
  data = [], render, onLink,
}) => {
  if (!data) {
    return null;
  }
  const filterList = formatTree(data);
  return (
    <div className="feishudocx-container">
      {
        filterList.map(d => renderSwitch(d, render, onLink))
      }
    </div>
  );
}

export default memo(Index);
