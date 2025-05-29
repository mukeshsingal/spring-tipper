import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Result } from 'antd';
import { history } from 'umi';
const NoFoundPage = () => (_jsx(Result, { status: "404", title: "404", subTitle: "Sorry, the page you visited does not exist.", extra: _jsx(Button, { type: "primary", onClick: () => history.push('/'), children: "Back Home" }, void 0) }, void 0));
export default NoFoundPage;
//# sourceMappingURL=404.js.map