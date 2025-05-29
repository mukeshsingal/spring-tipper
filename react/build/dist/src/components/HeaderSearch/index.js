import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { useRef } from 'react';
import classNames from 'classnames';
import styles from './index.less';
const HeaderSearch = (props) => {
    const { className, defaultValue, onVisibleChange, placeholder, visible, defaultVisible, ...restProps } = props;
    const inputRef = useRef(null);
    const [value, setValue] = useMergedState(defaultValue, {
        value: props.value,
        onChange: props.onChange,
    });
    const [searchMode, setSearchMode] = useMergedState(defaultVisible ?? false, {
        value: props.visible,
        onChange: onVisibleChange,
    });
    const inputClass = classNames(styles.input, {
        [styles.show]: searchMode,
    });
    return (_jsxs("div", { className: classNames(className, styles.headerSearch), onClick: () => {
            setSearchMode(true);
            if (searchMode && inputRef.current) {
                inputRef.current.focus();
            }
        }, onTransitionEnd: ({ propertyName }) => {
            if (propertyName === 'width' && !searchMode) {
                if (onVisibleChange) {
                    onVisibleChange(searchMode);
                }
            }
        }, children: [_jsx(SearchOutlined, { style: {
                    cursor: 'pointer',
                } }, "Icon"), _jsx(AutoComplete, { className: inputClass, value: value, options: restProps.options, onChange: setValue, children: _jsx(Input, { size: "small", ref: inputRef, defaultValue: defaultValue, "aria-label": placeholder, placeholder: placeholder, onKeyDown: (e) => {
                        if (e.key === 'Enter') {
                            if (restProps.onSearch) {
                                restProps.onSearch(value);
                            }
                        }
                    }, onBlur: () => {
                        setSearchMode(false);
                    } }, void 0) }, "AutoComplete")] }, void 0));
};
export default HeaderSearch;
//# sourceMappingURL=index.js.map