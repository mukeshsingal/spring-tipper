import { jsx as _jsx } from "react/jsx-runtime";
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
const Footer = () => {
    const defaultMessage = '蚂蚁集团体验技术部出品';
    const currentYear = new Date().getFullYear();
    return (_jsx(DefaultFooter, { copyright: `${currentYear} ${defaultMessage}`, links: [
            {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true,
            },
            {
                key: 'github',
                title: _jsx(GithubOutlined, {}, void 0),
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
            },
            {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
            },
        ] }, void 0));
};
export default Footer;
//# sourceMappingURL=index.js.map