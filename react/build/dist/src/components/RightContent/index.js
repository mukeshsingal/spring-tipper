import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Space } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined, QuestionCircleOutlined, } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
const GlobalHeaderRight = () => {
    const { initialState } = useModel('@@initialState');
    if (!initialState || !initialState.settings) {
        return null;
    }
    const { navTheme, layout } = initialState.settings;
    let className = styles.right;
    if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
        className = `${styles.right}  ${styles.dark}`;
    }
    const [fullscreen, setFullscreen] = React.useState(false);
    return (_jsxs(Space, { className: className, children: [_jsx(HeaderSearch, { className: `${styles.action} ${styles.search}`, placeholder: "\u7AD9\u5185\u641C\u7D22", defaultValue: "umi ui", options: [
                    {
                        label: _jsx("a", { href: "https://umijs.org/zh/guide/umi-ui.html", children: "umi ui" }, void 0),
                        value: 'umi ui',
                    },
                    {
                        label: _jsx("a", { href: "next.ant.design", children: "Ant Design" }, void 0),
                        value: 'Ant Design',
                    },
                    {
                        label: _jsx("a", { href: "https://protable.ant.design/", children: "Pro Table" }, void 0),
                        value: 'Pro Table',
                    },
                    {
                        label: _jsx("a", { href: "https://prolayout.ant.design/", children: "Pro Layout" }, void 0),
                        value: 'Pro Layout',
                    },
                ] }, void 0), _jsx("span", { className: styles.action, onClick: () => {
                    window.open('https://pro.ant.design/docs/getting-started');
                }, children: _jsx(QuestionCircleOutlined, {}, void 0) }, void 0), fullscreen ? (_jsx("span", { onClick: () => {
                    document.exitFullscreen();
                    setFullscreen(false);
                }, children: _jsx(FullscreenExitOutlined, {}, void 0) }, void 0)) : (_jsx("span", { onClick: () => {
                    document.getElementById('root')?.requestFullscreen();
                    setFullscreen(true);
                }, children: _jsx(FullscreenOutlined, {}, void 0) }, void 0)), _jsx(Avatar, {}, void 0)] }, void 0));
};
export default GlobalHeaderRight;
//# sourceMappingURL=index.js.map