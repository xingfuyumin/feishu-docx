import React, { ReactNode } from 'react';
import { Ordered } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Ordered;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
    order?: string;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
