import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from 'antd';
import { ProFormSelect, ProFormText, ProFormTextArea, StepsForm, ProFormRadio, ProFormDateTimePicker, } from '@ant-design/pro-form';
const UpdateForm = (props) => {
    return (_jsxs(StepsForm, { stepsProps: {
            size: 'small',
        }, stepsFormRender: (dom, submitter) => {
            return (_jsx(Modal, { width: 640, bodyStyle: {
                    padding: '32px 40px 48px',
                }, destroyOnClose: true, title: '规则配置', visible: props.updateModalVisible, footer: submitter, onCancel: () => {
                    props.onCancel();
                }, children: dom }, void 0));
        }, onFinish: props.onSubmit, children: [_jsxs(StepsForm.StepForm, { initialValues: {
                    name: props.values.name,
                    desc: props.values.desc,
                }, title: '基本信息', children: [_jsx(ProFormText, { name: "name", label: '规则名称', width: "md", rules: [
                            {
                                required: true,
                                message: '请输入规则名称！',
                            },
                        ] }, void 0), _jsx(ProFormTextArea, { name: "desc", width: "md", label: '规则描述', placeholder: '请输入至少五个字符', rules: [
                            {
                                required: true,
                                message: '请输入至少五个字符的规则描述！',
                                min: 5,
                            },
                        ] }, void 0)] }, void 0), _jsxs(StepsForm.StepForm, { initialValues: {
                    target: '0',
                    template: '0',
                }, title: '配置规则属性', children: [_jsx(ProFormSelect, { name: "target", width: "md", label: '监控对象', valueEnum: {
                            0: '表一',
                            1: '表二',
                        } }, void 0), _jsx(ProFormSelect, { name: "template", width: "md", label: '规则模板', valueEnum: {
                            0: '规则模板一',
                            1: '规则模板二',
                        } }, void 0), _jsx(ProFormRadio.Group, { name: "type", label: '规则类型', options: [
                            {
                                value: '0',
                                label: '强',
                            },
                            {
                                value: '1',
                                label: '弱',
                            },
                        ] }, void 0)] }, void 0), _jsxs(StepsForm.StepForm, { initialValues: {
                    type: '1',
                    frequency: 'month',
                }, title: '设定调度周期', children: [_jsx(ProFormDateTimePicker, { name: "time", width: "md", label: '开始时间', rules: [
                            {
                                required: true,
                                message: '请选择开始时间！',
                            },
                        ] }, void 0), _jsx(ProFormSelect, { name: "frequency", label: '监控对象', width: "md", valueEnum: {
                            month: '月',
                            week: '周',
                        } }, void 0)] }, void 0)] }, void 0));
};
export default UpdateForm;
//# sourceMappingURL=UpdateForm.js.map