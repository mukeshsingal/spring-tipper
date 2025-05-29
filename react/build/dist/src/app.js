import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: _jsx(PageLoading, {}, void 0),
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
    const fetchUserInfo = async () => {
        try {
            const msg = await queryCurrentUser();
            return msg.data;
        }
        catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // 如果是登录页面，不执行
    if (history.location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: {},
        };
    }
    return {
        fetchUserInfo,
        settings: {},
    };
}
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
    return {
        rightContentRender: () => _jsx(RightContent, {}, void 0),
        disableContentMargin: false,
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        footerRender: () => _jsx(Footer, {}, void 0),
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        links: isDev
            ? [
                _jsxs(Link, { to: "/umi/plugin/openapi", target: "_blank", children: [_jsx(LinkOutlined, {}, void 0), _jsx("span", { children: "OpenAPI \u6587\u6863" }, void 0)] }, void 0),
                _jsxs(Link, { to: "/~docs", children: [_jsx(BookOutlined, {}, void 0), _jsx("span", { children: "\u4E1A\u52A1\u7EC4\u4EF6\u6587\u6863" }, void 0)] }, void 0),
            ]
            : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            // if (initialState?.loading) return <PageLoading />;
            return (_jsxs(_Fragment, { children: [children, !props.location?.pathname?.includes('/login') && (_jsx(SettingDrawer, { enableDarkTheme: true, settings: initialState?.settings, onSettingChange: (settings) => {
                            setInitialState((preInitialState) => ({
                                ...preInitialState,
                                settings,
                            }));
                        } }, void 0))] }, void 0));
        },
        ...initialState?.settings,
    };
};
//# sourceMappingURL=app.js.map