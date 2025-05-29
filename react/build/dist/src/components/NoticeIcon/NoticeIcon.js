import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import classNames from 'classnames';
import NoticeList from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
const { TabPane } = Tabs;
const NoticeIcon = (props) => {
    const getNotificationBox = () => {
        const { children, loading, onClear, onTabChange, onItemClick, onViewMore, clearText, viewMoreText, } = props;
        if (!children) {
            return null;
        }
        const panes = [];
        React.Children.forEach(children, (child) => {
            if (!child) {
                return;
            }
            const { list, title, count, tabKey, showClear, showViewMore } = child.props;
            const len = list && list.length ? list.length : 0;
            const msgCount = count || count === 0 ? count : len;
            const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title;
            panes.push(_jsx(TabPane, { tab: tabTitle, children: _jsx(NoticeList, { clearText: clearText, viewMoreText: viewMoreText, list: list, tabKey: tabKey, onClear: () => onClear && onClear(title, tabKey), onClick: (item) => onItemClick && onItemClick(item, child.props), onViewMore: (event) => onViewMore && onViewMore(child.props, event), showClear: showClear, showViewMore: showViewMore, title: title }, void 0) }, tabKey));
        });
        return (_jsx(_Fragment, { children: _jsx(Spin, { spinning: loading, delay: 300, children: _jsx(Tabs, { className: styles.tabs, onChange: onTabChange, children: panes }, void 0) }, void 0) }, void 0));
    };
    const { className, count, bell } = props;
    const [visible, setVisible] = useMergedState(false, {
        value: props.popupVisible,
        onChange: props.onPopupVisibleChange,
    });
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = getNotificationBox();
    const NoticeBellIcon = bell || _jsx(BellOutlined, { className: styles.icon }, void 0);
    const trigger = (_jsx("span", { className: classNames(noticeButtonClass, { opened: visible }), children: _jsx(Badge, { count: count, style: { boxShadow: 'none' }, className: styles.badge, children: NoticeBellIcon }, void 0) }, void 0));
    if (!notificationBox) {
        return trigger;
    }
    return (_jsx(HeaderDropdown, { placement: "bottomRight", overlay: notificationBox, overlayClassName: styles.popover, trigger: ['click'], visible: visible, onVisibleChange: setVisible, children: trigger }, void 0));
};
NoticeIcon.defaultProps = {
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};
NoticeIcon.Tab = NoticeList;
export default NoticeIcon;
//# sourceMappingURL=NoticeIcon.js.map