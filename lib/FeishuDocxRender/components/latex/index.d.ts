import React, { ReactNode } from 'react';
import 'katex/dist/katex.min.css';
type Props = {
    data?: any;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
