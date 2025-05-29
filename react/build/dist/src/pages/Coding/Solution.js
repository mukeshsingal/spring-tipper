import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Empty } from 'antd';
import { Tabs, Input, Menu, message, Row, Tag } from 'antd';
import { DeleteFilled, ExportOutlined, GoogleOutlined, LeftCircleFilled, StarFilled } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined, StarOutlined } from "@ant-design/icons";
import styles from "../Coding/Question.css";
import SolutionService from "./SolutionService";
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const style = { background: '#0092ff', padding: '8px 0' };
var Router = require("react-router");
export default (props) => {
    var restService = new SolutionService();
    const [collapse, setCollapse] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [solutionLink, setSolutionLink] = React.useState([]);
    let history = useHistory();
    function handleClick(e) {
        console.log('click ', e);
        // this.setState({ current: e.key });
    }
    ;
    function fetchData() {
        restService
            .getById(props.match.params.id)
            .then((data) => {
            console.log("Solution is ", data);
            setData(data);
            console.log(data);
        })
            .catch((error) => {
            console.error("Failed to get data");
        });
    }
    function markDeleted() {
        restService
            .markDeleted(props.match.params.id)
            .then((data) => {
            setData(data);
            console.log(data);
        })
            .catch((error) => {
            console.error("Failed to get data");
        });
    }
    function markFavourite() {
        restService
            .markFavourite(props.match.params.id)
            .then((data) => {
            setData(data);
            console.log(data);
        })
            .catch((error) => {
            console.error("Failed to get data");
        });
    }
    function startParsing() {
        restService
            .startParsing(props.match.params.id, solutionLink)
            .then((data) => {
            setData(data);
            message.info("Parsed data has been loaded successfully.");
        })
            .catch((error) => {
            message.error("Failed to parse the solution link. Plese check logs.");
        });
        message.info("URL has been submitted for parsing.");
    }
    function markDone() {
        restService
            .markDone(props.match.params.id)
            .then((data) => {
            setData(data);
            console.log(data);
        })
            .catch((error) => {
            console.error("Failed to get data");
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (_jsxs(React.Fragment, { style: { padding: "0px" }, children: [_jsx(Card, { bordered: false, style: { padding: "0px" }, children: _jsxs(Row, { gutter: 18, children: [_jsxs(Col, { span: 16, className: "icons-list", style: { display: "flex" }, children: [_jsx(Button, { className: styles.action_button, type: "primary", onClick: () => {
                                        history.goBack();
                                    }, children: _jsx(LeftCircleFilled, {}, void 0) }, void 0), _jsx(Button, { className: styles.action_button, type: "primary", onClick: () => window.open("https://www.youtube.com/results?search_query=" + data.title + " geeksforgeeks", '_blank'), children: _jsx(GoogleOutlined, {}, void 0) }, void 0), _jsx(Button, { className: styles.action_button, type: "primary", onClick: () => window.open(data.problemUrl, '_blank'), children: _jsx(ExportOutlined, {}, void 0) }, void 0), _jsx("div", { children: _jsx("h1", { style: { marginTop: "5px", marginLeft: "10px" }, children: _jsx("a", { href: data.url, target: "_blank", children: data.title }, void 0) }, void 0) }, void 0)] }, void 0), _jsxs(Col, { span: 8, children: [_jsx(Button, { className: styles.action_button, hidden: collapse, type: "primary", onClick: () => setCollapse(true), children: _jsx(MenuUnfoldOutlined, {}, void 0) }, void 0), _jsx(Button, { className: styles.action_button, hidden: !collapse, type: "primary", onClick: () => setCollapse(false), children: _jsx(MenuFoldOutlined, {}, void 0) }, void 0), _jsx(Button, { className: styles.action_button, type: "primary", onClick: () => markDeleted(), children: _jsx(DeleteFilled, {}, void 0) }, void 0), data?.favourite ?
                                    _jsx(Button, { className: styles.action_button, type: "primary", onClick: () => markFavourite(), children: _jsx(StarFilled, {}, void 0) }, void 0)
                                    :
                                        _jsx(Button, { className: styles.action_button, type: "primary", onClick: () => markFavourite(), children: _jsx(StarOutlined, {}, void 0) }, void 0), data?.status == "DONE" ?
                                    _jsx(Button, { style: { height: "40px", float: "right", margin: "3px" }, type: "primary", onClick: () => markDone(), children: "Not Done" }, void 0)
                                    :
                                        _jsx(Button, { style: { height: "40px", float: "right", margin: "3px" }, type: "primary", onClick: () => markDone(), children: "Done" }, void 0)] }, void 0)] }, void 0) }, void 0), _jsxs(Row, { gutter: collapse ? 24 : 18, children: [_jsx(Col, { span: collapse ? 24 : 18, children: _jsx(Card, { style: { marginTop: "5px" }, className: styles.articlecard, children: _jsx("div", { dangerouslySetInnerHTML: { __html: data.solutionDescription?.replaceAll("font-size:18px", "") + "<style>article{font-size:larger;font-family: \"IBMPlexSerif\"}.tabcontent{font-size:14px}.comments{color:#686867!important}.keyword{font-weight:bold;color: #f92672;}.color1{color:#66d9ef;}.string{color:#e6db74;}</style>" } }, void 0) }, void 0) }, void 0), _jsxs(Col, { span: collapse ? 0 : 6, children: [_jsxs(Card, { bordered: false, style: { marginTop: "5px" }, children: [console.log(data.practiceUrl), data.practiceUrl != undefined && data.practiceUrl != "" ? _jsxs("div", { children: [_jsx("a", { target: "_blank", href: data.practiceUrl, children: "Practice URL" }, void 0), " "] }, void 0) : _jsx(Empty, {}, void 0)] }, void 0), _jsxs(Card, { bordered: false, style: { marginTop: "5px" }, children: [_jsx("h3", { children: "Topics" }, void 0), data.topicTags == undefined || data.topicTags.length == 0 ? _jsx(Empty, {}, void 0) : data.topicTags.map((tag, index) => { return _jsx(Tag, { color: "blue", children: tag.name }, index); })] }, void 0), _jsxs(Card, { bordered: false, style: { marginTop: "5px" }, children: [_jsx("h3", { children: "Companies" }, void 0), data.companyTags == undefined || data.companyTags.length == 0 ? _jsx(Empty, {}, void 0) : data.companyTags.map((tag, index) => { return _jsx(Tag, { color: "magenta", children: tag.name }, index); })] }, void 0), _jsxs(Card, { bordered: false, style: { marginTop: "5px" }, children: [_jsx("h3", { children: "Submit Solution Link" }, void 0), _jsx(Input, { placeholder: "Solution Link", onChange: (value) => {
                                            setSolutionLink(value.target.value);
                                        } }, void 0), _jsx(Button, { type: "primary", style: { margin: "3px", float: "right" }, onClick: startParsing, children: " Parse" }, void 0)] }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
//# sourceMappingURL=Solution.js.map