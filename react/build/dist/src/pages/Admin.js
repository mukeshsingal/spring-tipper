import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
const Admin = () => {
    return (_jsxs(PageHeaderWrapper, { content: ' 这个页面只有 admin 权限才能查看', children: [_jsxs(Card, { children: [_jsx(Alert, { message: '更快更强的重型组件，已经发布。', type: "success", showIcon: true, banner: true, style: {
                            margin: -12,
                            marginBottom: 48,
                        } }, void 0), _jsxs(Typography.Title, { level: 2, style: {
                            textAlign: 'center',
                        }, children: [_jsx(SmileTwoTone, {}, void 0), " Ant Design Pro ", _jsx(HeartTwoTone, { twoToneColor: "#eb2f96" }, void 0), " You"] }, void 0)] }, void 0), _jsxs("p", { style: {
                    textAlign: 'center',
                    marginTop: 24,
                }, children: ["Want to add more pages? Please refer to", ' ', _jsx("a", { href: "https://pro.ant.design/docs/block-cn", target: "_blank", rel: "noopener noreferrer", children: "use block" }, void 0), "\u3002"] }, void 0)] }, void 0));
};
export default Admin;
//# sourceMappingURL=Admin.js.map