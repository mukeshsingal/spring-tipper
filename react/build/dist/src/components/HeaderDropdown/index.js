import { jsx as _jsx } from "react/jsx-runtime";
import { Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => (_jsx(Dropdown, { overlayClassName: classNames(styles.container, cls), ...restProps }, void 0));
export default HeaderDropdown;
//# sourceMappingURL=index.js.map