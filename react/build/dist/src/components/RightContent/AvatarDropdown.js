import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
    await outLogin();
    const { query = {}, search, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
            pathname: '/user/login',
            search: stringify({
                redirect: pathname + search,
            }),
        });
    }
};
const AvatarDropdown = ({ menu }) => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const onMenuClick = useCallback((event) => {
        const { key } = event;
        if (key === 'logout') {
            setInitialState((s) => ({ ...s, currentUser: undefined }));
            loginOut();
            return;
        }
        history.push(`/account/${key}`);
    }, [setInitialState]);
    const loading = (_jsx("span", { className: `${styles.action} ${styles.account}`, children: _jsx(Spin, { size: "small", style: {
                marginLeft: 8,
                marginRight: 8,
            } }, void 0) }, void 0));
    if (!initialState) {
        return loading;
    }
    const { currentUser } = initialState;
    if (!currentUser || !currentUser.name) {
        return loading;
    }
    const menuHeaderDropdown = (_jsxs(Menu, { className: styles.menu, selectedKeys: [], onClick: onMenuClick, children: [menu && (_jsxs(Menu.Item, { children: [_jsx(UserOutlined, {}, void 0), "\u4E2A\u4EBA\u4E2D\u5FC3"] }, "center")), menu && (_jsxs(Menu.Item, { children: [_jsx(SettingOutlined, {}, void 0), "\u4E2A\u4EBA\u8BBE\u7F6E"] }, "settings")), menu && _jsx(Menu.Divider, {}, void 0), _jsxs(Menu.Item, { children: [_jsx(LogoutOutlined, {}, void 0), "\u9000\u51FA\u767B\u5F55"] }, "logout")] }, void 0));
    return (_jsx(HeaderDropdown, { overlay: menuHeaderDropdown, children: _jsxs("span", { className: `${styles.action} ${styles.account}`, children: [_jsx(Avatar, { size: "small", className: styles.avatar, src: currentUser.avatar, alt: "avatar" }, void 0), _jsx("span", { className: `${styles.name} anticon`, children: currentUser.name }, void 0)] }, void 0) }, void 0));
};
export default AvatarDropdown;
//# sourceMappingURL=AvatarDropdown.js.map