import React, { ReactNode } from 'react';
import { Block, Table } from '../../../traverse/index.d';
import './index.less';
type Props = {
    data?: Table;
    allData?: Block[];
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
//# sourceMappingURL=index.d.ts.map