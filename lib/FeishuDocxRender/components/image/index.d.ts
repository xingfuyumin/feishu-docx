import React, { ReactNode } from 'react';
import { Image } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Image;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
