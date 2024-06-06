import React, { ReactNode } from 'react';
import { Text } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: Text;
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
//# sourceMappingURL=index.d.ts.map