import React, { ReactNode } from 'react';
import { Code } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Code;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
export declare const CODE_TYPE: string[];
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
