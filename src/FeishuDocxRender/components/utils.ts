import { TextElementStyle, TextStyle, TextElement, Callout, Ordered, Block } from "../../traverse/index.d";

export const getTextStyle = (d: TextStyle, isCode?: boolean) => {
  const obj = [];
  if (d?.align !== undefined && d?.align >= 1) {
    obj.push(`feishudocx-textstyle-align-${d.align}`);
  }
  if (isCode && d?.wrap) {
    obj.push('feishudocx-textstyle-wrap');
  }
  return obj;
}
export const getTextElementStyle = (d: TextElementStyle) => {
  const obj = [];
  if (d?.bold) {
    obj.push('feishudocx-textelementstyle-bold');
  }
  if (d?.background_color) {
    obj.push(`feishudocx-textelementstyle-bgcolor-${d.background_color}`);
  }
  if (d?.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${d.text_color}`);
  }
  if (d?.underline) {
    obj.push('feishudocx-textelementstyle-underline');
  }
  if (d?.italic) {
    obj.push('feishudocx-textelementstyle-italic');
  }
  if (d?.strikethrough) {
    obj.push('feishudocx-textelementstyle-strikethrough');
  }
  if (d?.inline_code) {
    obj.push('feishudocx-textelementstyle-inlinecode');
  }
  if (d?.inline_code_first) {
    obj.push('feishudocx-textelementstyle-inlinecode-first');
  }
  if (d?.inline_code_last) {
    obj.push('feishudocx-textelementstyle-inlinecode-last');
  }
  if (d?.link) {
    obj.push('feishudocx-textelementstyle-link');
  }
  return obj;
}
export const formatInlinecode = (elements: TextElement[]) => {
  elements.forEach((el, index) => {
    if (!!el.text_run?.text_element_style?.inline_code) {
      if (!elements[index - 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_first = true;
      }
      if (!elements[index + 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_last = true;
      }
    }
  });
}
export const formatOrderNum = (data?: Ordered, dataMap?: Record<string, Block>) => {
  if (!data) {
    return null;
  }
  const parentData = dataMap?.[data?.parent_id || ''];
  if (!parentData) {
    return null;
  }
  let num = 0;
  for (const id of parentData.children || []) {
    if (dataMap?.[id]?.block_type === 13) {
      num += 1;
    } else {
      num = 0;
    }
    if (data?.block_id === id) {
      break;
    }
  }
  return num;
}
export const getCalloutStyle = (d: Callout) => {
  const obj = [];
  if (d.callout?.background_color) {
    obj.push(`feishudocx-calloutstyle-bgcolor-${d.callout?.background_color}`);
  }
  if (d.callout?.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${d.callout?.text_color}`);
  }
  if (d.callout?.border_color) {
    obj.push(`feishudocx-calloutstyle-bdcolor-${d.callout?.border_color}`);
  }
  return obj;
}