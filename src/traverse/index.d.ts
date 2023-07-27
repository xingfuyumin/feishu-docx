/**
 * 文档
 */
export interface Document {
  /**
   * 文档唯一标识
   * 其也是文档根 Block 的 ID。
   */
  document_id: string;
  /**
   * 文档版本 ID
   * 用以指定要查询或更新的文档版本。
   * 如果多次调用接口，其返回版本 ID 未更改，则表示文档未更改。相反，版本 ID 发生更改通常意味着文档已更新， 但需要注意的是 ID 变更并非一定是文档内容发生变化，比如也有可能是文档被他人评论所致。
   */
  revision_id: number;
  /**
   * 文档标题
   * Document 只支持返回纯文本。
   */
  title: string;
}

export interface IBlock {
  /**
   * Block 全局唯一标识，创建 Block 时会自动生成
   */
  block_id: string;
  /**
   * Block 类型，枚举类型
   */
  block_type: number;
  /**
   * 父 BlockID，除了根节点 PageBlock 外，其余 Block 均有 ParentBlock
   */
  parent_id?: string;
  /**
   * 子 BlockID 列表
   */
  children?: string[];
  /**
   * 评论 ID 列表。查询评论内容请阅览https://open.feishu.cn/document/server-docs/docs/CommentAPI/get
   */
  comment_ids?: string[];
}

export interface IText {
  /**
   * 文本样式
   */
  style: TextStyle;
  /**
   * 文本元素
   */
  elements: TextElement[];
}

/**
 * 页面（根） Block
 */
export interface Page extends IBlock {
  block_type: 1;
  page: IText;
}
/**
 * 文本 Block
 */
export  interface Text extends IBlock {
  block_type: 2;
  text: IText;
}
/**
 * 一级标题 Block
 */
export interface Heading1 extends IBlock {
  block_type: 3;
  heading1: IText;
}
/**
 * 二级标题 Block
 */
export interface Heading2 extends IBlock {
  block_type: 4;
  heading2: IText;
}
/**
 * 三级标题 Block
 */
export interface Heading3 extends IBlock {
  block_type: 5;
  heading3: IText;
}
/**
 * 四级标题 Block
 */
export interface Heading4 extends IBlock {
  block_type: 6;
  heading4: IText;
}
/**
 * 五级标题 Block
 */
export interface Heading5 extends IText {
  block_type: 7;
  heading5: IText;
}
/**
 * 六级标题 Block
 */
export interface Heading6 extends IBlock {
  block_type: 8;
  heading6: IText;
}
/**
 * 七级标题 Block
 */
export interface Heading7 extends IBlock {
  block_type: 9;
  heading7: IText;
}
/**
 * 八级标题 Block
 */
export interface Heading8 extends IBlock {
  block_type: 10;
  heading8: IText;
}
/**
 * 九级标题 Block
 */
export interface Heading9 extends IBlock {
  block_type: 11;
  heading9: IText;
}
/**
 * 无序列表 Block
 */
export interface Bullet extends IBlock {
  block_type: 12;
  bullet: IText;
}
/**
 * 有序列表 Block
 */
export interface Ordered extends IBlock {
  block_type: 13;
  ordered: IText;
}
/**
 * 代码块 Block
 */
export interface Code extends IBlock {
  block_type: 14;
  code: IText;
}
/**
 * 引用 Block
 */
export interface Quote extends IBlock {
  block_type: 15;
  quote: IText;
}
/**
 * 待办事项 Block
 */
export interface Todo extends IBlock {
  block_type: 17;
  todo: IText;
}
/**
 * 多维表格 Block
 */
export interface Bitable extends IBlock {
  block_type: 18;
  bitable: {
    /**
     * 多维表格文档 Token，只读属性。
     * 格式为BitableToken_TableID，其中，BitableToken是一篇多维表格唯一标识，TableID是一张数据表的唯一标识，使用时请注意拆分
     */
    token: string,
    /**
     * 视图类型
     */
    view_type: BitableViewType,
  }
}
/**
 * 高亮块 Block
 */
export interface Callout extends IBlock {
  block_type: 19;
  callout: {
    /**
     * 背景色
     */
    background_color?: CalloutBackgroundColor,
    /**
     * 边框色
     */
    border_color?: CalloutBorderColor,
    /**
     * 字体色
     */
    text_color?: FontColor;
    /**
     * EmojiID。高亮块支持以下表情：https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/emoji
     */
    emoji_id?: string,
  }
}
/**
 * 会话卡片 Block
 */
export interface ChatCard extends IBlock {
  block_type: 20;
  chat_card: {
    /**
     * 群聊天会话 OpenID，其值以 ‘oc_’ 开头，表示专为开放能力接口定义的群组 ID。对于写操作，如果用户不在该群则返回无权限错误。
     */
    chat_id: string,
    /**
     * 对齐方式
     */
    align?: Align;
  }
}
/**
 * 流程图 & UML 图 Block
 */
export interface Diagram extends IBlock {
  block_type: 21;
  diagram: {
    /**
     * 绘图类型
     */
    diagram_type?: DiagramType;
  }
}
/**
 * 分割线 Block
 */
export interface Divider extends IBlock {
  block_type: 22;
  divider: object;
}
/**
 * 文件 Block
 */
export interface File extends IBlock {
  block_type: 23;
  file: {
    /**
     * 附件 Token，只读属性
     */
    token?: string;
    /**
     * 附件文件名，只读属性
     */
    name?: string;
  }
}
/**
 * 分栏 Block
 */
export interface Grid extends IBlock {
  block_type: 24;
  grid: {
    /**
     * 分栏列数量，取值范围 [2,5)
     */
    column_size: number;
  }
}
/**
 * 分栏列 Block
 */
export interface GridColumn extends IBlock {
  block_type: 25;
  grid_column: {
    /**
     * 当前分栏列占整个分栏的比例，取值范围 [1,99]
     */
    width_ratio?: number;
  }
}

/**
 * 内嵌 Block
 */
export interface Iframe extends IBlock {
  block_type: 26;
  iframe: {
    /**
     * 当前分栏列占整个分栏的比例，取值范围 [1,99]
     */
    component: {
      /**
       * Iframe 组件类型
       */
      type: IframeComponentType;
      /**
       * 目标网页 URL，读写均需要进行 URL Encode
       */
      url: string;
    };
  }
}
/**
 * 图片 Block
 */
export interface Image extends IBlock {
  block_type: 27;
  image: {
    /**
     * 图片 对齐方式
     */
    align?: Align;
    /**
     * 图片 Token，只读属性
     */
    token?: string;
    /**
     * 图片宽度，单位 px，只读属性
     */
    width?: number;
    /**
     * 图片高度，单位 px，只读属性
     */
    height?: number;
    /**
     * 自定义属性：图片base64编码
     */
    base64?: string;
  }
}
/**
 * 开放平台小组件 Block
 */
export interface ISV extends IBlock {
  block_type: 28;
  isv: {
    /**
     * 团队互动应用唯一ID
     */
    component_id?: string;
    /**
     * 团队互动应用类型，比如信息收集
     */
    component_type_id?: string;
  }
}
/**
 * 思维笔记 Block
 */
export interface Mindnote extends IBlock {
  block_type: 29;
  mindnote: {
    /**
     * 思维笔记 Token
     */
    token: string;
  }
}
/**
 * 电子表格 Block
 */
export interface Sheet extends IBlock {
  block_type: 30;
  sheet: {
    /**
     * 电子表格文档 Token，只读属性。
     * 格式为 SpreadsheetToken_SheetID。其中，SpreadsheetToken是一篇电子表格的唯一标识，SheetID是一张工作表的唯一标识，使用时请注意拆分。
     */
    token?: string;
    /**
     * 电子表格列数量。创建空电子表格时使用，最大值 9。
     */
    row_size?: number;
    /**
     * 电子表格列数量。创建空电子表格时使用，最大值 9。
     */
    column_size?: number;
  }
}
/**
 * 表格 Block
 */
export interface Table extends IBlock {
  block_type: 31;
  table: {
    /**
     * 单元格数组，数组元素为 Table Cell Block 的 ID。
     */
    cells?: string[];
    /**
     * 表格属性。
     */
    property: {
      /**
       * 行数。
       */
      row_size: number;
      /**
      * 列数。
      */
      column_size: number;
      /**
      * 列宽，单位px。
      */
      column_width?: number[];
      /**
      * 单元格合并信息。在创建 Table 时候此属性是只读的，将由后端进行生成。如果需要对单元格进行合并操作，可以通过更新块的子请求 merge_table_cells 来实现。
      */
      merge_info?: {
        /**
         * 从当前行索引起被合并的连续行数。
         */
        row_span?: number;
        /**
         * 从当前列索引起被合并的连续列数。
         */
        col_span?: number;
      };
    }
  }
}
/**
 * 表格单元格 Block
 */
export interface TableCell extends IBlock {
  block_type: 32;
  table_cell: object
}
/**
 * 视图 Block
 */
export interface View extends IBlock {
  block_type: 33;
  view?: ViewType;
}
/**
 * 未定义 Block
 */
export interface Undefined extends IBlock {
  block_type: 999;
  undefined: object,
}
/**
 * 引用容器 Block
 */
export interface QuoteContainer extends IBlock {
  block_type: 34;
  quote_container: object;
}
/**
 * 任务 Block
 */
export interface Task extends IBlock {
  block_type: 35;
  task: {
    /**
     * 任务 ID
     */
    task_id: string;
  }
}
/**
 * OKR Block
 */
export interface OKR extends IBlock {
  block_type: 36;
  okr: {
    /**
     * OKR ID，获取需要插入的 OKR ID 可见https://open.feishu.cn/document/server-docs/okr-v1/okr/list
     */
    okr_id?: string;
    /**
     * 周期的状态
     */
    period_display_status?: OkrPeriodDisplayStatus;
    /**
     * 周期名 - 中文
     */
    period_name_zh?: string;
    /**
     * 周期名 - 英文
     */
    period_name_en?: string;
    /**
     * OKR 所属的用户 ID
     */
    user_id?: string;
    /**
     * OKR Block 中的 Objective ID 和 Key Result ID。
     * 此值为空时插入 OKR 下所有的 Objective 和 Key Result
     */
    objectives?: {
      /**
       * OKR 中 Objective 的 ID。
       */
      objective_id: string;
      /**
       * Key Result 的 ID 列表。
       * 此值为空时插入当前 Objective 下的所有 Key Result。
       */
      kr_ids?: string[];
    };
    /**
     * 可见性设置
     */
    visible_setting?: {
      /**
       * 进展编辑区域是否可见
       */
      progress_fill_area_visible?: boolean;
      /**
       * 进展状态是否可见
       */
      progress_status_visible?: boolean;
      /**
       * 分数是否可见
       */
      score_visible?: boolean;
    };
  }
}
/**
 * OKR Objective Block
 */
export interface OkrObjective extends IBlock {
  block_type: 37;
  okr_objective: {
    /**
     * OKR Objective ID
     */
    objective_id: string;
    /**
     * 是否在 OKR 平台设置了私密权限
     */
    confidential: boolean;
    /**
     * Key Result 的位置编号，对应 Block 中 KR1、KR2 的 1、2
     */
    position: number;
    /**
     * 打分信息
     */
    score: number;
    /**
     * OKR Block 中是否展示该 Key Result
     */
    visible: boolean;
    /**
     * Key Result 的权重
     */
    weight: number;
    /**
     * 进展信息
     */
    progress_rate: {
      /**
       * 状态模式，分 simple 和 advanced 两种
       */
      mode: OkrProgressRateMode;
      /**
       * 	进展状态计算类型
       */
      status_type: OkrProgressStatusType;
      /**
       * 	进展状态计算类型
       */
      progress_status: OkrProgressStatus;
      /**
       * 	当前进度百分比，simple 模式下使用
       */
      percent: number;
      /**
       * 	进度起始值，advanced 模式使用
       */
      start: number;
      /**
       * 	当前进度, advanced 模式使用
       */
      current: number;
      /**
       * 	进度目标值，advanced 模式使用
       */
      target: number;
    };
    /**
     * Key Result 的文本内容
     */
    content: IText;
  }
}
/**
 * OKR Key Result Block
 */
export interface OkrKeyResult extends IBlock {
  block_type: 38;
  okr_key_result: {
    /**
     * OKR Key Result ID
     */
    kr_id: string;
    /**
     * 是否在 OKR 平台设置了私密权限
     */
    confidential: boolean;
    /**
     * Key Result 的位置编号，对应 Block 中 KR1、KR2 的 1、2
     */
    position: number;
    /**
     * 打分信息
     */
    score: number;
    /**
     * OKR Block 中是否展示该 Key Result
     */
    visible: boolean;
    /**
     * Key Result 的权重
     */
    weight: number;
    /**
     * 进展信息
     */
    progress_rate: {
      /**
       * 状态模式，分 simple 和 advanced 两种
       */
      mode: OkrProgressRateMode;
      /**
       * 	进展状态计算类型
       */
      status_type: OkrProgressStatusType;
      /**
       * 	进展状态计算类型
       */
      progress_status: OkrProgressStatus;
      /**
       * 	当前进度百分比，simple 模式下使用
       */
      percent: number;
      /**
       * 	进度起始值，advanced 模式使用
       */
      start: number;
      /**
       * 	当前进度, advanced 模式使用
       */
      current: number;
      /**
       * 	进度目标值，advanced 模式使用
       */
      target: number;
    };
    /**
     * Key Result 的文本内容
     */
    content: IText;
  }
}
/**
 * OKR 进展 Block
 */
export interface OkrProgress extends IBlock {
  block_type: 39;
  okr_progress: object;
}
/**
 * 文档小组件
 */
export interface AddOns extends IBlock {
  block_type: 40;
  add_ons: {
    /**
     * 文档小组件 ID
     */
    component_id?: string;
    /**
     * 文档小组件类型，比如问答互动
     */
    component_type_id?: string;
    /**
     * 文档小组件内容数据，JSON 字符串
     */
    record?: string;
  }
}
/**
 * Jira 问题
 */
export interface JiraIssue extends IBlock {
  block_type: 41;
  jira_issue: {
    /**
     * Jira 问题 ID
     */
    id?: string;
    /**
     * Jira 问题 Key
     */
    key?: string;
  }
}

export interface TextStyle {
  /**
   * 对齐方式
   */
  align?: Align;
  /**
   * Todo 的完成状态
   */
  done?: boolean;
  /**
   * 文本的折叠状态
   */
  folded?: boolean;
  /**
   * 代码块语言
   */
  language?: CodeLanguage;
  /**
   * 代码块是否自动换行
   */
  wrap?: boolean;
}

export interface TextElement {
  /**
   * 文字
   */
  text_run?: TextRun;
  /**
   * @用户
   */
  mention_user?: MentionUser;
  /**
   * @文档
   */
  mention_doc?: MentionDoc;
  /**
   * 日期提醒
   */
  reminder?: Reminder;
  /**
   * 内联附件
   */
  file?: InlineFile;
  /**
   * 内联 Block
   */
  inline_block?: InlineBlock;
  /**
   * 公式
   */
  equation?: Equation;
  /**
   * 未支持的 TextElement
   */
  undefined_element?: UndefinedElement;
}

export interface TextRun {
  /**
   * 	文本
   */
  content: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;

}
export interface MentionUser {
  /**
   * 	用户 OpenID
   */
  user_id: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export interface MentionDoc {
  /**
   * 	云文档 Token
   */
  token: string;
  /**
   * 	云文档类型
   */
  obj_type: MentionObjType;
  /**
   * 	云文档链接（需要 URL Encode)
   */
  url: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export interface Reminder {
  /**
   * 	创建者用户 ID
   */
  create_user_id: string;
  /**
   * 	是否通知
   */
  is_notify?: boolean;
  /**
   * 	是日期还是整点小时
   */
  is_whole_day?: boolean;
  /**
   * 	事件发生的时间（毫秒级时间戳）
   */
  expire_time: number;
  /**
   * 	触发通知的时间（毫秒级时间戳）
   */
  notify_time: number;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export interface InlineFile {
  /**
   * 	附件 Token
   */
  file_token?: string;
  /**
   * 	当前文档中该附件所处的 BlockID
   */
  source_block_id?: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export interface InlineBlock {
  /**
   * 	当前 Block 关联的内联状态的 Block 的 BlockID
   */
  block_id?: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export interface Equation {
  /**
   * 	符合 KaTeX 语法的公式内容。语法规则请参考：https://katex.org/docs/supported.html
   */
  content: string;
  /**
   * 文本局部样式
   */
  text_element_style?: TextElementStyle;
}
export type UndefinedElement = object;

export interface TextElementStyle {
  /**
   * 	加粗
   */
  bold?: boolean;
  /**
     * 	斜体
     */
  italic?: boolean;
  /**
   * 	删除线
   */
  strikethrough?: boolean;
  /**
   * 	下划线
   */
  underline?: boolean;
  /**
   * 	inline 代码
   */
  inline_code?: boolean;
  /**
   * 自定义
   * 是否第一个inline_code
   */
  inline_code_first?: boolean;
  /**
   * 自定义
   * 是否最后一个inline_code
   */
  inline_code_last?: boolean; 
  /**
   * 	字体颜色
   */
  text_color?: FontColor;
  /**
   * 		背景色
   */
  background_color?: FontBackgroundColor;
  /**
   * 	链接
   */
  link?: Link;
  /**
   * 	评论 ID 列表。在创建 Block 时，不支持传入评论 ID；在更新文本 Block 的 Element 时，允许将对应版本已存在的评论 ID 移动到同一个 Block 内的任意 Element 中，但不支持传入新的评论 ID。如需查询评论内容请阅览「获取评论」。
   */
  comment_ids?: string[];
}

/**
 * Block 的排版方式，比如居左等
 * 1	居左排版
 * 2	居中排版
 * 3  居右排版
 */
export type Align = 1 | 2 | 3;
/**
 * 高亮块背景色（分为深色系和浅色系）
 * 1	浅红色
 * 2	浅橙色
 * 3	浅黄色
 * 4	浅绿色
 * 5	浅蓝色
 * 6	浅紫色
 * 7	浅灰色
 * 8	暗红色
 * 9	暗橙色
 * 10	暗黄色
 * 11	暗绿色
 * 12	暗蓝色
 * 13	暗紫色
 * 14	暗灰色
 */
export type CalloutBackgroundColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
/**
 * 高亮块边框色（色系与高亮块背景色色系一致）
 * 1	红色
 * 2	橙色
 * 3	黄色
 * 4	绿色
 * 5	蓝色
 * 6	紫色
 * 7	灰色
 */
export type CalloutBorderColor = 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
* 字体背景色（分为深色系和浅色系）
* 1	浅粉红色
* 2	浅橙色
* 3	浅黄色
* 4	浅绿色
* 5	浅蓝色
* 6	浅紫色
* 7	浅灰色
* 8	暗粉红色
* 9	暗橙色
* 10	暗黄色
* 11	暗绿色
* 12	暗蓝色
* 13	暗紫色
* 14	暗灰色
*/
export type FontBackgroundColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
/**
 * 字体色
 * 1	粉红色
 * 2	橙色
 * 3	黄色
 * 4	绿色
 * 5	蓝色
 * 6	紫色
 * 7	灰色
 */
export type FontColor = 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * View Block 的视图类型
 * 1	卡片视图，独占一行的一种视图，在 Card 上可有一些简单交互
 * 2	预览视图，在当前页面直接预览插入的 Block 内容，而不需要打开新的页面
 * 3	内联试图
 */
export type ViewType = 1 | 2 | 3;
/**
 * View Block 的视图类型
 * 1	数据表
 * 2	看板
 */
export type BitableViewType = 1 | 2;
/**
 * View Block 的视图类型
 * 1	流程图
 * 2	UML 图
 */
export type DiagramType = 1 | 2;
/**
  * 内嵌 Block 支持的类型
  * 1	哔哩哔哩
  * 2	西瓜视频
  * 3	优酷
  * 4	Airtable
  * 5	百度地图
  * 6	高德地图
  * 7	Undefined
  * 8	Figma
  * 9	墨刀
  * 10	Canva
  * 11	CodePen
  * 12	飞书问卷
  * 13	金数据
  * 14	Undefined
  * 15	Undefined
*/
export type IframeComponentType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
/**
  * Mention 云文档类型
  * 1	Doc
  * 3	Sheet
  * 8	Bitable
  * 11	MindNote
  * 12	File
  * 15	Slide
  * 16	Wiki
  * 22	Docx
*/
export type MentionObjType = 1 | 3 | 8 | 11 | 12 | 15 | 16 | 22;
/**
  * 代码块语言
  * 1	PlainText
  * 2	ABAP
3	Ada
4	Apache
5	Apex
6	Assembly
7	Bash
8	CSharp
9	C++
10	C
11	COBOL
12	CSS
13	CoffeeScript
14	D
15	Dart
16	Delphi
17	Django
18	Dockerfile
19	Erlang
20	Fortran
21	FoxPro
22	Go
23	Groovy
24	HTML
25	HTMLBars
26	HTTP
27	Haskell
28	JSON
29	Java
30	JavaScript
31	Julia
32	Kotlin
33	LateX
34	Lisp
35	Logo
36	Lua
37	MATLAB
38	Makefile
39	Markdown
40	Nginx
41	Objective
42	OpenEdgeABL
43	PHP
44	Perl
45	PostScript
46	Power
47	Prolog
48	ProtoBuf
49	Python
50	R
51	RPG
52	Ruby
53	Rust
54	SAS
55	SCSS
56	SQL
57	Scala
58	Scheme
59	Scratch
60	Shell
61	Swift
62	Thrift
63	TypeScript
64	VBScript
65	Visual
66	XML
67	YAML
68	CMake
69	Diff
70	Gherkin
71	GraphQL
72	OpenGL Shading Language
73	Properties
74	Solidity
75	TOML

*/
export type CodeLanguage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 |
51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 |
61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 |
71 | 72 | 73 | 74 | 75;
/**
 * 周期的状态
 */
export enum OkrPeriodDisplayStatus {
  /**
   * 默认
   */
  default,
  /**
   * 正常
   */
  normal,
  /**
   * 失效
   */
  invalid,
  /**
   * 隐藏
   */
  hidden,
}
/**
 * OKR 进展状态模式
 */
export enum OkrProgressRateMode {
  /**
   * 简单模式
   */
  simple,
  /**
   * 高级模式
   */
  advanced,
}
/**
 * 周期的状态
 */
export enum OkrProgressStatus {
  /**
   * 未设置
   */
  unset,
  /**
   * 正常
   */
  normal,
  /**
   * 有风险
   */
  risk,
  /**
   * 已延期
   */
  extended,
}
/**
 * OKR 进展状态模式
 */
export enum OkrProgressStatusType {
  /**
   * 以风险最高的 Key Result 状态展示
   */
  default,
  /**
   * 	自定义
   */
  custom,
}

export interface Link {
  /**
   * 链接地址
   */
  url: string;
}

export type Block = Page | Text | Heading1 | Heading2 | Heading3 | Heading4 | Heading5 | Heading6 | Heading7 | Heading8 | Heading9 |
Bullet | Ordered | Code | Quote | Todo | Bitable | Callout | ChatCard | Diagram | Divider | File | Grid | GridColumn |
Iframe | Image | ISV | Mindnote | Sheet | Table | TableCell | View | Undefined | QuoteContainer | Task | OKR |
OkrObjective | OkrKeyResult | OkrProgress | AddOns | JiraIssue;