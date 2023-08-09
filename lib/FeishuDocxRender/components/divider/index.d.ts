import React, { ReactNode } from 'react';
import { Divider } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Divider;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
