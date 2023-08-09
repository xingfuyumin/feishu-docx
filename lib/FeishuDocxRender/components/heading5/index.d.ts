import React, { ReactNode } from 'react';
import { Heading5 } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Heading5;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
