import { ReactNode } from 'react';
import { TableCell, Block } from "../../../traverse/index.d";
import './index.less';
type Props = {
    data?: TableCell;
    allData?: Block[];
    render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
    onLink?: (link: string) => void;
};
declare const _default: import("react").NamedExoticComponent<Props>;
export default _default;
//# sourceMappingURL=index.d.ts.map