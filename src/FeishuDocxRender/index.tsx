import React, { FC, ReactNode } from 'react';
import { Block } from '../traverse/index.d';
import './style.less';
import './index.less';
import PageRender from './components/page';
import TextRender from './components/text';
import BulletRender from './components/bullet';
import ImageRender from './components/image';

type Props = {
  showDirectory?: boolean,
  data: Block[];
  className?: string;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
}

const Index: FC<Props> = ({
  data = [], render, onLink,
}) => {
  if (!data) {
    return null;
  }
  const renderSwitch = (d: Block) => {
    switch (d.block_type) {
      case 1: return <PageRender data={d} render={render} key={d.block_id} onLink={onLink} />
      case 2: return <TextRender data={d} render={render} key={d.block_id} onLink={onLink} />
      // case 3: return <Heading1 data={d} render={render} key={d.block_id} />
      // case 4: return <Heading2 data={d} render={render} key={d.block_id} />
      // case 5: return <Heading3 data={d} render={render} key={d.block_id} />
      // case 6: return <Heading4 data={d} render={render} key={d.block_id} />
      // case 7: return <Heading5 data={d} render={render} key={d.block_id} />
      // case 8: return <Heading6 data={d} render={render} key={d.block_id} />
      // case 9: return <Heading7 data={d} render={render} key={d.block_id} />
      // case 10: return <Heading8 data={d} render={render} key={d.block_id} />
      // case 11: return <Heading9 data={d} render={render} key={d.block_id} />
      case 12: return <BulletRender data={d} render={render} key={d.block_id} onLink={onLink} />
      // case 13: return <Ordered data={d} render={render} key={d.block_id} />
      // case 14: return <Code data={d} render={render} key={d.block_id} />
      // case 15: return <Quote data={d} render={render} key={d.block_id} />
      // case 17: return <Todo data={d} render={render} key={d.block_id} />
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
      // case 31: return <Table data={d} render={render} key={d.block_id} />
      // case 32: return <TableCell data={d} render={render} key={d.block_id} />
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
  return (
    <div className="feishudocx-container">
      {
        data.map(d => renderSwitch(d))
      }
    </div>
  );
}

export default Index;
