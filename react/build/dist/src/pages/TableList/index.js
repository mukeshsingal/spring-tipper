import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    }
    catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();
        message.success('Configuration is successful');
        return true;
    }
    catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows)
        return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    }
    catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};
const TableList = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const actionRef = useRef();
    const [currentRow, setCurrentRow] = useState();
    const [selectedRowsState, setSelectedRows] = useState([]);
    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const columns = [
        {
            title: '规则名称',
            dataIndex: 'name',
            tip: 'The rule name is the unique key',
            render: (dom, entity) => {
                return (_jsx("a", { onClick: () => {
                        setCurrentRow(entity);
                        setShowDetail(true);
                    }, children: dom }, void 0));
            },
        },
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            hideInForm: true,
            renderText: (val) => `${val}${'万'}`,
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: '关闭',
                    status: 'Default',
                },
                1: {
                    text: '运行中',
                    status: 'Processing',
                },
                2: {
                    text: '已上线',
                    status: 'Success',
                },
                3: {
                    text: '异常',
                    status: 'Error',
                },
            },
        },
        {
            title: '上次调度时间',
            sorter: true,
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '0') {
                    return false;
                }
                if (`${status}` === '3') {
                    return _jsx(Input, { ...rest, placeholder: '请输入异常原因！' }, void 0);
                }
                return defaultRender(item);
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                _jsx("a", { onClick: () => {
                        handleUpdateModalVisible(true);
                        setCurrentRow(record);
                    }, children: "\u914D\u7F6E" }, "config"),
                _jsx("a", { href: "https://procomponents.ant.design/", children: "\u8BA2\u9605\u8B66\u62A5" }, "subscribeAlert"),
            ],
        },
    ];
    return (_jsxs(PageContainer, { children: [_jsx(ProTable, { headerTitle: '查询表格', actionRef: actionRef, rowKey: "key", search: {
                    labelWidth: 120,
                }, toolBarRender: () => [
                    _jsxs(Button, { type: "primary", onClick: () => {
                            handleModalVisible(true);
                        }, children: [_jsx(PlusOutlined, {}, void 0), " \u65B0\u5EFA"] }, "primary"),
                ], request: rule, columns: columns, rowSelection: {
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                } }, void 0), selectedRowsState?.length > 0 && (_jsxs(FooterToolbar, { extra: _jsxs("div", { children: ["\u5DF2\u9009\u62E9", ' ', _jsx("a", { style: {
                                fontWeight: 600,
                            }, children: selectedRowsState.length }, void 0), ' ', "\u9879 \u00A0\u00A0", _jsxs("span", { children: ["\u670D\u52A1\u8C03\u7528\u6B21\u6570\u603B\u8BA1 ", selectedRowsState.reduce((pre, item) => pre + item.callNo, 0), " \u4E07"] }, void 0)] }, void 0), children: [_jsx(Button, { onClick: async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }, children: "\u6279\u91CF\u5220\u9664" }, void 0), _jsx(Button, { type: "primary", children: "\u6279\u91CF\u5BA1\u6279" }, void 0)] }, void 0)), _jsxs(ModalForm, { title: '新建规则', width: "400px", visible: createModalVisible, onVisibleChange: handleModalVisible, onFinish: async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }, children: [_jsx(ProFormText, { rules: [
                            {
                                required: true,
                                message: '规则名称为必填项',
                            },
                        ], width: "md", name: "name" }, void 0), _jsx(ProFormTextArea, { width: "md", name: "desc" }, void 0)] }, void 0), _jsx(UpdateForm, { onSubmit: async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }, onCancel: () => {
                    handleUpdateModalVisible(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }, updateModalVisible: updateModalVisible, values: currentRow || {} }, void 0), _jsx(Drawer, { width: 600, visible: showDetail, onClose: () => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }, closable: false, children: currentRow?.name && (_jsx(ProDescriptions, { column: 2, title: currentRow?.name, request: async () => ({
                        data: currentRow || {},
                    }), params: {
                        id: currentRow?.name,
                    }, columns: columns }, void 0)) }, void 0)] }, void 0));
};
export default TableList;
//# sourceMappingURL=index.js.map