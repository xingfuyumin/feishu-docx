import React, { ReactNode } from 'react';
import { Block } from '../traverse/index.d';
import './style.less';
import './index.less';
type Props = {
    showDirectory?: boolean;
    data: Block[];
    className?: string;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
type Extra = {
    order?: string;
};
export declare const renderSwitch: (d: Block, render?: Props['render'], onLink?: Props['onLink'], extra?: Extra) => React.JSX.Element | null;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
