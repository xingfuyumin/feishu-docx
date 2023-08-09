import {
  AddOns, Bitable, Block, Bullet, Callout, ChatCard, Code, Diagram, Divider,
  Equation, Text, File,
  Grid, GridColumn, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  Heading7, Heading8, Heading9, ISV, Iframe, Image, InlineBlock, JiraIssue, Link, MentionDoc, MentionUser, Mindnote, OKR,
  OkrKeyResult, OkrObjective, OkrProgress, Ordered, Page, Quote, Reminder, Sheet, Table, TableCell,
  Task, TextElement, TextElementStyle, TextRun, TextStyle, Todo, Undefined, UndefinedElement, View, QuoteContainer, InlineFile, TipBlock, DangerBlock, WarningBlock, TabsBlock, TabPaneBlock
} from './index.d';

type Func<T> = (pms: {
  data: T,
  skip: () => void;
  stop: () => void;
}) => void;
type FuncMap = {
  Page?: Func<Page>,
  Text?: Func<Text>,
  Heading1?: Func<Heading1>,
  Heading2?: Func<Heading2>,
  Heading3?: Func<Heading3>,
  Heading4?: Func<Heading4>,
  Heading5?: Func<Heading5>,
  Heading6?: Func<Heading6>,
  Heading7?: Func<Heading7>,
  Heading8?: Func<Heading8>,
  Heading9?: Func<Heading9>,
  Bullet?: Func<Bullet>,
  Ordered?: Func<Ordered>,
  Code?: Func<Code>,
  Quote?: Func<Quote>,
  Todo?: Func<Todo>,
  Bitable?: Func<Bitable>,
  Callout?: Func<Callout>,
  ChatCard?: Func<ChatCard>,
  Diagram?: Func<Diagram>,
  Divider?: Func<Divider>,
  File?: Func<File>,
  Grid?: Func<Grid>,
  GridColumn?: Func<GridColumn>,
  Iframe?: Func<Iframe>,
  Image?: Func<Image>,
  ISV?: Func<ISV>,
  Mindnote?: Func<Mindnote>,
  Sheet?: Func<Sheet>,
  Table?: Func<Table>,
  TableCell?: Func<TableCell>,
  View?: Func<View>,
  Undefined?: Func<Undefined>,
  QuoteContainer?: Func<Page>,
  Task?: Func<Task>,
  OKR?: Func<OKR>,
  OkrObjective?: Func<OkrObjective>,
  OkrKeyResult?: Func<OkrKeyResult>,
  OkrProgress?: Func<OkrProgress>,
  AddOns?: Func<AddOns>,
  JiraIssue?: Func<JiraIssue>,
  Link?: Func<Link>,
  TextElementStyle?: Func<TextElementStyle>,
  UndefinedElement?: Func<UndefinedElement>,
  Equation?: Func<Equation>,
  InlineBlock?: Func<InlineBlock>,
  InlineFile?: Func<InlineFile>,
  Reminder?: Func<Reminder>,
  MentionDoc?: Func<MentionDoc>,
  MentionUser?: Func<MentionUser>,
  TextRun?: Func<TextRun>,
  TextElement?: Func<TextElement>,
  TextStyle?: Func<TextStyle>,
  start?: Func<unknown>,
  end?: Func<unknown>,
  TipBlock?: Func<TipBlock>,
  DangerBlock?: Func<DangerBlock>,
  WarningBlock?: Func<WarningBlock>,
  TabsBlock?: Func<TabsBlock>,
  TabPaneBlock?: Func<TabPaneBlock>,
};

const traverseTree = (data: Block[], map: Record<string, Block>, ignoreMap: Record<string, boolean> = {}) => {
  data?.forEach((d) => {
    if (d?.block_type === 31) {
      d.table.cellNodes = d.table.cells?.map(k => map[k]);
    }
    if (d?.parent_id) {
      d.parentNode = map[d.parent_id];
    }
    if (d?.children) {
      d.childrenNodes = d.children.map(k => {
        ignoreMap[k] = true;
        return map[k];
      });
      traverseTree(d.childrenNodes, map, ignoreMap);
    }
  });
}

/**
 * 飞书文档语法处理
 */
export const formatTree = (data: Block[]): Block[] => {
  const map: Record<string, Block> = {};
  let parentIndexArr: number[] = []; // 用于自定义语法识别时绑定id关系
  data?.forEach((d, index) => {
    map[d.block_id] = d;
    if (d.block_type === 2) {
      const content = d.text?.elements?.[0].text_run?.content;
      if (content?.startsWith('::: tip')) {
        parentIndexArr.push(index);
        (d as any).text.elements[0].text_run.content = content.split('tip')[1].trim();
        (d as any).block_type = -1; // 自定义语法：普通提示
      } else if (content?.startsWith('::: danger')) {
        parentIndexArr.push(index);
        (d as any).text.elements[0].text_run.content = content.split('danger')[1].trim();
        (d as any).block_type = -2; // 自定义语法：危险提示
      } else if (content?.startsWith('::: warning')) {
        parentIndexArr.push(index);
        (d as any).text.elements[0].text_run.content = content.split('warning')[1].trim();
        (d as any).block_type = -3; // 自定义语法：警告提示
      } else if (content?.startsWith(':::: el-tabs')) {
        parentIndexArr.push(index);
        (d as any).block_type = -4; // 自定义语法：标签页
      } else if (content?.startsWith('::: el-tab-pane label=')) {
        (d as any).text.elements[0].text_run.content = content.split('label=')[1].trim();
        const lastIndex = parentIndexArr.length - 1;
        if (data[parentIndexArr[lastIndex]]) {
          if (!data[parentIndexArr[lastIndex]].children) {
            data[parentIndexArr[lastIndex]].children = [];
          }
          data[parentIndexArr[lastIndex]].children?.push(d.block_id);
          const parentData = map[d.parent_id || ''];
          if (parentData && parentData.children) {
            parentData.children = parentData.children.filter(v => v !== d.block_id);// 老的层级关系需要接解除
          }

        }
        parentIndexArr.push(index);
        (d as any).block_type = -5; // 自定义语法：标签栏
      } else if (content?.includes(':::')) {
        (d as any).block_type = 999; // 自定义语法：标签页
        parentIndexArr.pop();
      } else {
        const lastIndex = parentIndexArr.length - 1;
        if (data[parentIndexArr[lastIndex]]) {
          if (!data[parentIndexArr[lastIndex]].children) {
            data[parentIndexArr[lastIndex]].children = []
          }
          data[parentIndexArr[lastIndex]].children?.push(d.block_id);
          const parentData = map[d.parent_id || ''];
          if (parentData && parentData.children) {
            parentData.children = parentData.children.filter(v => v !== d.block_id);// 老的层级关系需要接解除
          }
        }
      }
    } else {
      const lastIndex = parentIndexArr.length - 1;
      if (data[parentIndexArr[lastIndex]]) {
        if (!data[parentIndexArr[lastIndex]].children) {
          data[parentIndexArr[lastIndex]].children = []
        }
        data[parentIndexArr[lastIndex]].children?.push(d.block_id);
        const parentData = map[d.parent_id || ''];
        if (parentData && parentData.children) {
          parentData.children = parentData.children.filter(v => v !== d.block_id);// 老的层级关系需要接解除
        }
      }
    }
  });
  const ignoreMap: Record<string, boolean> = {};
  traverseTree(data || [], map, ignoreMap);
  const filterList: Block[] = data?.filter(d => !ignoreMap[d.block_id]) || [];
  return filterList;
}
/**
 * 0进行，1跳过，2终止
 */
type StopType = 0 | 1 | 2;
const traverse = async (name: keyof FuncMap, d: unknown, m: FuncMap): Promise<StopType> => {
  if (!name || !d || !m[name]) {
    return 0;
  }
  let stopType: StopType = 0;
  await (m[name] as any)({
    data: d,
    skip: () => {
      stopType = 1;
    },
    stop: () => {
      stopType = 2;
    },
  });
  return stopType;
};
const traverseLink = async (d: Link | undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Link', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTextElementStyle = async (d: TextElementStyle | undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextElementStyle', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseLink(d?.link, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTextStyle = async (d: TextStyle, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextStyle', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}

const traverseTextRun = async (d: TextRun | undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextRun', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseMentionUser = async (d: MentionUser| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('MentionUser', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseMentionDoc = async (d: MentionDoc| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('MentionDoc', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseReminder = async (d: Reminder| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Reminder', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseInlineBlock = async (d: InlineBlock| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('InlineBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseInlineFile = async (d: InlineFile| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('InlineFile', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseEquation = async (d: Equation| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Equation', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextElementStyle(d?.text_element_style, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseUndefinedElement = async (d: UndefinedElement | undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('UndefinedElement', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseUndefined = async (d: Undefined | undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Undefined', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTextElement = async (d: TextElement| undefined, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextElement', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextRun(d?.text_run, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseMentionUser(d?.mention_user, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseMentionDoc(d?.mention_doc, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseReminder(d?.reminder, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseInlineFile(d?.file, m);
  if (stopType > 0) {
    return stopType;
  }

  stopType = await traverseInlineBlock(d?.inline_block, m);
  if (stopType > 0) {
    return stopType;
  }

  stopType = await traverseEquation(d?.equation, m);
  if (stopType > 0) {
    return stopType;
  }

  stopType = await traverseUndefinedElement(d?.undefined_element, m);
  if (stopType > 0) {
    return stopType;
  }
  
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTipBlock = async (d: TipBlock, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TipBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextRun', d.text.elements?.[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseDangerBlock = async (d: DangerBlock, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('DangerBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextRun', d.text.elements?.[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseWarningBlock = async (d: WarningBlock, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('WarningBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextRun', d.text.elements?.[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTabsBlock = async (d: TabsBlock, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TabsBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTabPaneBlock = async (d: TabPaneBlock, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TabPaneBlock', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TextRun', d.text.elements?.[0], m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traversePage = async (d: Page, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Page', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.page.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.page.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseText = async (d: Text, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Text', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.text.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.text.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading1 = async (d: Heading1, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading1', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading1.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading1.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading2 = async (d: Heading2, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading2', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading2.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading2.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading3 = async (d: Heading3, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading3', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading3.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading3.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading4 = async (d: Heading4, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading4', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading4.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading4.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading5 = async (d: Heading5, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading5', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading5.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading5.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading6 = async (d: Heading6, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading6', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading6.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading6.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading7 = async (d: Heading7, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading7', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading7.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading7.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading8 = async (d: Heading8, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading8', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading8.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading8.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseHeading9 = async (d: Heading9, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Heading9', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.heading9.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.heading9.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseBullet = async (d: Bullet, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Bullet', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.bullet.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.bullet.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseOrdered = async (d: Ordered, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Ordered', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.ordered.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.ordered.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseCode = async (d: Code, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Code', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.code.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.code.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseQuote = async (d: Quote, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Quote', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.quote.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.quote.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTodo = async (d: Todo, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Todo', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverseTextStyle(d.todo.style, m);
  if (stopType > 0) {
    return stopType;
  }
  for (const el of (d.todo.elements || [])) {
    stopType = await traverseTextElement(el, m);
    if (stopType === 2) {
      break;
    }
  }
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseBitable = async (d: Bitable, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Bitable', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseCallout = async (d: Callout, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Callout', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseChatCard = async (d: ChatCard, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('ChatCard', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseDiagram = async (d: Diagram, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Diagram', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseDivider = async (d: Divider, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Divider', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseFile = async (d: File, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('File', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseGrid = async (d: Grid, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Grid', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseGridColumn = async (d: GridColumn, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('GridColumn', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseIframe = async (d: Iframe, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Iframe', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseImage = async (d: Image, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Image', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseISV = async (d: ISV, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('ISV', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseMindnote = async (d: Mindnote, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Mindnote', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseSheet = async (d: Sheet, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Sheet', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTable = async (d: Table, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Table', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTableCell = async (d: TableCell, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('TableCell', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseView = async (d: View, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('View', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseQuoteContainer = async (d: QuoteContainer, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('QuoteContainer', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseTask = async (d: Task, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('Task', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseOKR = async (d: OKR, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('OKR', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseOkrObjective = async (d: OkrObjective, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('OkrObjective', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseOkrKeyResult = async (d: OkrKeyResult, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('OkrKeyResult', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseOkrProgress = async (d: OkrProgress, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('OkrProgress', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseAddOns = async (d: AddOns, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('AddOns', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseJiraIssue = async (d: JiraIssue, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = await traverse('start', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('JiraIssue', d, m);
  if (stopType > 0) {
    return stopType;
  }
  stopType = await traverse('end', d, m);
  if (stopType > 0) {
    return stopType;
  }
  return stopType;
}
const traverseBlock = async (d: Block, m: FuncMap): Promise<StopType> => {
  let stopType: StopType = 0;
  switch (d.block_type) {
    case -5: stopType = await traverseTabPaneBlock(d, m);break;
    case -4: stopType = await traverseTabsBlock(d, m);break;
    case -3: stopType = await traverseWarningBlock(d, m);break;
    case -2: stopType = await traverseDangerBlock(d, m);break;
    case -1: stopType = await traverseTipBlock(d, m);break;
    case 1: stopType = await traversePage(d, m);break;
    case 2: stopType = await traverseText(d, m);break;
    case 3: stopType = await traverseHeading1(d, m);break;
    case 4: stopType = await traverseHeading2(d, m);break;
    case 5: stopType = await traverseHeading3(d, m);break;
    case 6: stopType = await traverseHeading4(d, m);break;
    case 7: stopType = await traverseHeading5(d, m);break;
    case 8: stopType = await traverseHeading6(d, m);break;
    case 9: stopType = await traverseHeading7(d, m);break;
    case 10: stopType = await traverseHeading8(d, m);break;
    case 11: stopType = await traverseHeading9(d, m);break;
    case 12: stopType = await traverseBullet(d, m);break;
    case 13: stopType = await traverseOrdered(d, m);break;
    case 14: stopType = await traverseCode(d, m);break;
    case 15: stopType = await traverseQuote(d, m);break;
    case 17: stopType = await traverseTodo(d, m);break;
    case 18: stopType = await traverseBitable(d, m);break;
    case 19: stopType = await traverseCallout(d, m);break;
    case 20: stopType = await traverseChatCard(d, m);break;
    case 21: stopType = await traverseDiagram(d, m);break;
    case 22: stopType = await traverseDivider(d, m);break;
    case 23: stopType = await traverseFile(d, m);break;
    case 24: stopType = await traverseGrid(d, m);break;
    case 25: stopType = await traverseGridColumn(d, m);break;
    case 26: stopType = await traverseIframe(d, m);break;
    case 27: stopType = await traverseImage(d, m);break;
    case 28: stopType = await traverseISV(d, m);break;
    case 29: stopType = await traverseMindnote(d, m);break;
    case 30: stopType = await traverseSheet(d, m);break;
    case 31: stopType = await traverseTable(d, m);break;
    case 32: stopType = await traverseTableCell(d, m);break;
    case 33: stopType = await traverseView(d, m);break;
    case 34: stopType = await traverseQuoteContainer(d, m);break;
    case 35: stopType = await traverseTask(d, m);break;
    case 36: stopType = await traverseOKR(d, m);break;
    case 37: stopType = await traverseOkrObjective(d, m);break;
    case 38: stopType = await traverseOkrKeyResult(d, m);break;
    case 39: stopType = await traverseOkrProgress(d, m);break;
    case 40: stopType = await traverseAddOns(d, m);break;
    case 41: stopType = await traverseJiraIssue(d, m);break;
    case 999: stopType = await traverseUndefined(d, m);break;
    default: return 0;
  };
  for (const childrenNode of (d.childrenNodes || [])) {
    if (childrenNode) {
      stopType = await traverseBlock(childrenNode, m);
      if (stopType === 2) {
        break;
      }
    }
  }
  return stopType;
}

/**
 * 遍历飞书文档
 */
export default async (data: Block[], m: FuncMap) => {
  if (!Array.isArray(data)) {
    return;
  }
  const list = await formatTree(data);
  for (const d of list) {
    let stopType: StopType = await traverseBlock(d, m);
    if (stopType === 2) {
      break;
    }
  }
}
