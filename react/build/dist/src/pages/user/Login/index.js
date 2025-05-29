import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined, } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';
const LoginMessage = ({ content }) => (_jsx(Alert, { style: {
        marginBottom: 24,
    }, message: content, type: "error", showIcon: true }, void 0));
const Login = () => {
    const [userLoginState, setUserLoginState] = useState({});
    const [type, setType] = useState('account');
    const { initialState, setInitialState } = useModel('@@initialState');
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            await setInitialState((s) => ({ ...s, currentUser: userInfo }));
        }
    };
    const handleSubmit = async (values) => {
        try {
            // 登录
            const msg = await login({ ...values, type });
            if (msg.status === 'ok') {
                const defaultLoginSuccessMessage = '登录成功！';
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history)
                    return;
                const { query } = history.location;
                const { redirect } = query;
                history.push(redirect || '/');
                return;
            }
            console.log(msg); // 如果失败去设置用户错误信息
            setUserLoginState(msg);
        }
        catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            message.error(defaultLoginFailureMessage);
        }
    };
    const { status, type: loginType } = userLoginState;
    return (_jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.content, children: _jsxs(LoginForm, { logo: _jsx("img", { alt: "logo", src: "/logo.svg" }, void 0), title: "Ant Design", subTitle: 'Ant Design 是西湖区最具影响力的 Web 设计规范', initialValues: {
                        autoLogin: true,
                    }, actions: [
                        '其他登录方式 :',
                        _jsx(AlipayCircleOutlined, { className: styles.icon }, "AlipayCircleOutlined"),
                        _jsx(TaobaoCircleOutlined, { className: styles.icon }, "TaobaoCircleOutlined"),
                        _jsx(WeiboCircleOutlined, { className: styles.icon }, "WeiboCircleOutlined"),
                    ], onFinish: async (values) => {
                        await handleSubmit(values);
                    }, children: [_jsxs(Tabs, { activeKey: type, onChange: setType, children: [_jsx(Tabs.TabPane, { tab: '账户密码登录' }, "account"), _jsx(Tabs.TabPane, { tab: '手机号登录' }, "mobile")] }, void 0), status === 'error' && loginType === 'account' && (_jsx(LoginMessage, { content: '错误的用户名和密码(admin/ant.design)' }, void 0)), type === 'account' && (_jsxs(_Fragment, { children: [_jsx(ProFormText, { name: "username", fieldProps: {
                                        size: 'large',
                                        prefix: _jsx(UserOutlined, { className: styles.prefixIcon }, void 0),
                                    }, placeholder: '用户名: admin or user', rules: [
                                        {
                                            required: true,
                                            message: '用户名是必填项！',
                                        },
                                    ] }, void 0), _jsx(ProFormText.Password, { name: "password", fieldProps: {
                                        size: 'large',
                                        prefix: _jsx(LockOutlined, { className: styles.prefixIcon }, void 0),
                                    }, placeholder: '密码: ant.design', rules: [
                                        {
                                            required: true,
                                            message: '密码是必填项！',
                                        },
                                    ] }, void 0)] }, void 0)), status === 'error' && loginType === 'mobile' && _jsx(LoginMessage, { content: "\u9A8C\u8BC1\u7801\u9519\u8BEF" }, void 0), type === 'mobile' && (_jsxs(_Fragment, { children: [_jsx(ProFormText, { fieldProps: {
                                        size: 'large',
                                        prefix: _jsx(MobileOutlined, { className: styles.prefixIcon }, void 0),
                                    }, name: "mobile", placeholder: '请输入手机号！', rules: [
                                        {
                                            required: true,
                                            message: '手机号是必填项！',
                                        },
                                        {
                                            pattern: /^1\d{10}$/,
                                            message: '不合法的手机号！',
                                        },
                                    ] }, void 0), _jsx(ProFormCaptcha, { fieldProps: {
                                        size: 'large',
                                        prefix: _jsx(LockOutlined, { className: styles.prefixIcon }, void 0),
                                    }, captchaProps: {
                                        size: 'large',
                                    }, placeholder: '请输入验证码！', captchaTextRender: (timing, count) => {
                                        if (timing) {
                                            return `${count} ${'秒后重新获取'}`;
                                        }
                                        return '获取验证码';
                                    }, name: "captcha", rules: [
                                        {
                                            required: true,
                                            message: '验证码是必填项！',
                                        },
                                    ], onGetCaptcha: async (phone) => {
                                        const result = await getFakeCaptcha({
                                            phone,
                                        });
                                        if (result === false) {
                                            return;
                                        }
                                        message.success('获取验证码成功！验证码为：1234');
                                    } }, void 0)] }, void 0)), _jsxs("div", { style: {
                                marginBottom: 24,
                            }, children: [_jsx(ProFormCheckbox, { noStyle: true, name: "autoLogin", children: "\u81EA\u52A8\u767B\u5F55" }, void 0), _jsx("a", { style: {
                                        float: 'right',
                                    }, children: "\u5FD8\u8BB0\u5BC6\u7801 ?" }, void 0)] }, void 0)] }, void 0) }, void 0), _jsx(Footer, {}, void 0)] }, void 0));
};
export default Login;
//# sourceMappingURL=index.js.map