import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
// import Result from '@/components/Result';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const { Step } = Steps;
const desc1 = (_jsxs("div", { style: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45)',
        position: 'relative',
        left: 42,
        textAlign: 'left',
    }, children: [_jsxs("div", { style: { margin: '8px 0 4px' }, children: [_jsx(FormattedMessage, { id: "app.result.success.step1-operator", defaultMessage: "Qu Lili" }, void 0), _jsx(Icon, { style: { marginLeft: 8 }, type: "dingding-o" }, void 0)] }, void 0), _jsx("div", { children: "2016-12-12 12:32" }, void 0)] }, void 0));
const desc2 = (_jsxs("div", { style: { fontSize: 12, position: 'relative', left: 42, textAlign: 'left' }, children: [_jsxs("div", { style: { margin: '8px 0 4px' }, children: [_jsx(FormattedMessage, { id: "app.result.success.step2-operator", defaultMessage: "Zhou Maomao" }, void 0), _jsx(Icon, { type: "dingding-o", style: { color: '#00A0E9', marginLeft: 8 } }, void 0)] }, void 0), _jsx("div", { children: _jsx("a", { href: "", children: _jsx(FormattedMessage, { id: "app.result.success.step2-extra", defaultMessage: "Urge" }, void 0) }, void 0) }, void 0)] }, void 0));
const extra = (_jsxs(Fragment, { children: [_jsx("div", { style: {
                fontSize: 16,
                color: 'rgba(0, 0, 0, 0.85)',
                fontWeight: '500',
                marginBottom: 20,
            }, children: _jsx(FormattedMessage, { id: "app.result.success.operate-title", defaultMessage: "Project Name" }, void 0) }, void 0), _jsxs(Row, { style: { marginBottom: 16 }, children: [_jsxs(Col, { xs: 24, sm: 12, md: 12, lg: 12, xl: 6, children: [_jsx("span", { style: { color: 'rgba(0, 0, 0, 0.85)' }, children: _jsx(FormattedMessage, { id: "app.result.success.operate-id", defaultMessage: "Project ID\uFF1A" }, void 0) }, void 0), "23421"] }, void 0), _jsxs(Col, { xs: 24, sm: 12, md: 12, lg: 12, xl: 6, children: [_jsx("span", { style: { color: 'rgba(0, 0, 0, 0.85)' }, children: _jsx(FormattedMessage, { id: "app.result.success.principal", defaultMessage: "Principal\uFF1A" }, void 0) }, void 0), _jsx(FormattedMessage, { id: "app.result.success.step1-operator", defaultMessage: "Qu Lili" }, void 0)] }, void 0), _jsxs(Col, { xs: 24, sm: 24, md: 24, lg: 24, xl: 12, children: [_jsx("span", { style: { color: 'rgba(0, 0, 0, 0.85)' }, children: _jsx(FormattedMessage, { id: "app.result.success.operate-time", defaultMessage: "Effective time\uFF1A" }, void 0) }, void 0), "2016-12-12 ~ 2017-12-12"] }, void 0)] }, void 0), _jsxs(Steps, { style: { marginLeft: -42, width: 'calc(100% + 84px)' }, progressDot: true, current: 1, children: [_jsx(Step, { title: _jsx("span", { style: { fontSize: 14 }, children: _jsx(FormattedMessage, { id: "app.result.success.step1-title", defaultMessage: "Create project" }, void 0) }, void 0), description: desc1 }, void 0), _jsx(Step, { title: _jsx("span", { style: { fontSize: 14 }, children: _jsx(FormattedMessage, { id: "app.result.success.step2-title", defaultMessage: "Departmental preliminary review" }, void 0) }, void 0), description: desc2 }, void 0), _jsx(Step, { title: _jsx("span", { style: { fontSize: 14 }, children: _jsx(FormattedMessage, { id: "app.result.success.step3-title", defaultMessage: "Financial review" }, void 0) }, void 0) }, void 0), _jsx(Step, { title: _jsx("span", { style: { fontSize: 14 }, children: _jsx(FormattedMessage, { id: "app.result.success.step4-title", defaultMessage: "Finish" }, void 0) }, void 0) }, void 0)] }, void 0)] }, void 0));
const actions = (_jsxs(Fragment, { children: [_jsx(Button, { type: "primary", children: _jsx(FormattedMessage, { id: "app.result.success.btn-return", defaultMessage: "Back to list" }, void 0) }, void 0), _jsx(Button, { children: _jsx(FormattedMessage, { id: "app.result.success.btn-project", defaultMessage: "View project" }, void 0) }, void 0), _jsx(Button, { children: _jsx(FormattedMessage, { id: "app.result.success.btn-print", defaultMessage: "Print" }, void 0) }, void 0)] }, void 0));
export default () => (
// <PageHeaderWrapper>
_jsx(Card, { bordered: false, children: _jsx(Result, { type: "success", title: formatMessage({ id: 'app.result.success.title' }), description: formatMessage({ id: 'app.result.success.description' }), extra: extra, actions: actions, style: { marginTop: 48, marginBottom: 16 } }, void 0) }, void 0)) /* </PageHeaderWrapper> */;
{ /* </PageHeaderWrapper> */ }
;
//# sourceMappingURL=Success.js.map