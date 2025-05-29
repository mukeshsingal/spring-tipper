import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';
const CodePreview = ({ children }) => (_jsx("pre", { className: styles.pre, children: _jsx("code", { children: _jsx(Typography.Text, { copyable: true, children: children }, void 0) }, void 0) }, void 0));
const Welcome = () => {
    return (_jsx(PageContainer, { children: _jsxs(Card, { children: [_jsx(Alert, { message: '更快更强的重型组件，已经发布。', type: "success", showIcon: true, banner: true, style: {
                        margin: -12,
                        marginBottom: 24,
                    } }, void 0), _jsxs(Typography.Text, { strong: true, children: ["\u9AD8\u7EA7\u8868\u683C", ' ', _jsx("a", { href: "https://procomponents.ant.design/components/table", rel: "noopener noreferrer", target: "__blank", children: "\u6B22\u8FCE\u4F7F\u7528" }, void 0)] }, void 0), _jsx(CodePreview, { children: "yarn add @ant-design/pro-table" }, void 0), _jsxs(Typography.Text, { strong: true, style: {
                        marginBottom: 12,
                    }, children: ["\u9AD8\u7EA7\u5E03\u5C40", ' ', _jsx("a", { href: "https://procomponents.ant.design/components/layout", rel: "noopener noreferrer", target: "__blank", children: "\u6B22\u8FCE\u4F7F\u7528" }, void 0)] }, void 0), _jsx(CodePreview, { children: "yarn add @ant-design/pro-layout" }, void 0)] }, void 0) }, void 0));
};
export default Welcome;
//# sourceMappingURL=Welcome.js.map