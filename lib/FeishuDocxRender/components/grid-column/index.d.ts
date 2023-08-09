import React, { ReactNode } from 'react';
import { GridColumn, Block } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: GridColumn;
    allData?: Block[];
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
