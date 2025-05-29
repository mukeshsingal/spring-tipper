import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';
const NoticeList = ({ list = [], onClick, onClear, title, onViewMore, emptyText, showClear = true, clearText, viewMoreText, showViewMore = false, }) => {
    if (!list || list.length === 0) {
        return (_jsxs("div", { className: styles.notFound, children: [_jsx("img", { src: "https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg", alt: "not found" }, void 0), _jsx("div", { children: emptyText }, void 0)] }, void 0));
    }
    return (_jsxs("div", { children: [_jsx(List, { className: styles.list, dataSource: list, renderItem: (item, i) => {
                    const itemCls = classNames(styles.item, {
                        [styles.read]: item.read,
                    });
                    // eslint-disable-next-line no-nested-ternary
                    const leftIcon = item.avatar ? (typeof item.avatar === 'string' ? (_jsx(Avatar, { className: styles.avatar, src: item.avatar }, void 0)) : (_jsx("span", { className: styles.iconElement, children: item.avatar }, void 0))) : null;
                    return (_jsx(List.Item, { className: itemCls, onClick: () => {
                            onClick?.(item);
                        }, children: _jsx(List.Item.Meta, { className: styles.meta, avatar: leftIcon, title: _jsxs("div", { className: styles.title, children: [item.title, _jsx("div", { className: styles.extra, children: item.extra }, void 0)] }, void 0), description: _jsxs("div", { children: [_jsx("div", { className: styles.description, children: item.description }, void 0), _jsx("div", { className: styles.datetime, children: item.datetime }, void 0)] }, void 0) }, void 0) }, item.key || i));
                } }, void 0), _jsxs("div", { className: styles.bottomBar, children: [showClear ? (_jsxs("div", { onClick: onClear, children: [clearText, " ", title] }, void 0)) : null, showViewMore ? (_jsx("div", { onClick: (e) => {
                            if (onViewMore) {
                                onViewMore(e);
                            }
                        }, children: viewMoreText }, void 0)) : null] }, void 0)] }, void 0));
};
export default NoticeList;
//# sourceMappingURL=NoticeList.js.map