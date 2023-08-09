import { TextElementStyle, TextStyle, TextElement, Callout, Ordered } from "../../traverse/index.d";
export declare const getTextStyle: (d: TextStyle, isCode?: boolean) => string[];
export declare const getTextElementStyle: (d: TextElementStyle) => string[];
export declare const formatInlinecode: (elements: TextElement[]) => void;
export declare const formatOrderNum: (data?: Ordered) => number | null;
export declare const getCalloutStyle: (d: Callout) => string[];
