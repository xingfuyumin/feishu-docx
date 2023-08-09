import React, { ReactNode } from 'react';
import { QuoteContainer } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: QuoteContainer;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
