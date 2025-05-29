import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useModel, useRequest } from 'umi';
import { getNotices } from '@/services/ant-design-pro/api';
import NoticeIcon from './NoticeIcon';
import styles from './index.less';
const getNoticeData = (notices) => {
    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
        return {};
    }
    const newNotices = notices.map((notice) => {
        const newNotice = { ...notice };
        if (newNotice.datetime) {
            newNotice.datetime = moment(notice.datetime).fromNow();
        }
        if (newNotice.id) {
            newNotice.key = newNotice.id;
        }
        if (newNotice.extra && newNotice.status) {
            const color = {
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold',
            }[newNotice.status];
            newNotice.extra = (_jsx(Tag, { color: color, style: {
                    marginRight: 0,
                }, children: newNotice.extra }, void 0));
        }
        return newNotice;
    });
    return groupBy(newNotices, 'type');
};
const getUnreadData = (noticeData) => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach((key) => {
        const value = noticeData[key];
        if (!unreadMsg[key]) {
            unreadMsg[key] = 0;
        }
        if (Array.isArray(value)) {
            unreadMsg[key] = value.filter((item) => !item.read).length;
        }
    });
    return unreadMsg;
};
const NoticeIconView = () => {
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    const [notices, setNotices] = useState([]);
    const { data } = useRequest(getNotices);
    useEffect(() => {
        setNotices(data || []);
    }, [data]);
    const noticeData = getNoticeData(notices);
    const unreadMsg = getUnreadData(noticeData || {});
    const changeReadState = (id) => {
        setNotices(notices.map((item) => {
            const notice = { ...item };
            if (notice.id === id) {
                notice.read = true;
            }
            return notice;
        }));
    };
    const clearReadState = (title, key) => {
        setNotices(notices.map((item) => {
            const notice = { ...item };
            if (notice.type === key) {
                notice.read = true;
            }
            return notice;
        }));
        message.success(`${'清空了'} ${title}`);
    };
    return (_jsxs(NoticeIcon, { className: styles.action, count: currentUser && currentUser.unreadCount, onItemClick: (item) => {
            changeReadState(item.id);
        }, onClear: (title, key) => clearReadState(title, key), loading: false, clearText: "\u6E05\u7A7A", viewMoreText: "\u67E5\u770B\u66F4\u591A", onViewMore: () => message.info('Click on view more'), clearClose: true, children: [_jsx(NoticeIcon.Tab, { tabKey: "notification", count: unreadMsg.notification, list: noticeData.notification, title: "\u901A\u77E5", emptyText: "\u4F60\u5DF2\u67E5\u770B\u6240\u6709\u901A\u77E5", showViewMore: true }, void 0), _jsx(NoticeIcon.Tab, { tabKey: "message", count: unreadMsg.message, list: noticeData.message, title: "\u6D88\u606F", emptyText: "\u60A8\u5DF2\u8BFB\u5B8C\u6240\u6709\u6D88\u606F", showViewMore: true }, void 0), _jsx(NoticeIcon.Tab, { tabKey: "event", title: "\u5F85\u529E", emptyText: "\u4F60\u5DF2\u5B8C\u6210\u6240\u6709\u5F85\u529E", count: unreadMsg.event, list: noticeData.event, showViewMore: true }, void 0)] }, void 0));
};
export default NoticeIconView;
//# sourceMappingURL=index.js.map