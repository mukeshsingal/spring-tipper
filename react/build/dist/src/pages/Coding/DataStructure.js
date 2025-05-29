import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useEffect } from "react";
import { Button, Card, Empty } from 'antd';
// import Result from '@/components/Result';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Menu, Row, Col } from 'antd';
const style = { background: '#0092ff', padding: '8px 0' };
import { Tag, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import QuestionService from "./QuestionService";
import { withRouter } from 'react-router-dom';
const { SubMenu } = Menu;
const DS = [
    "Array",
    "Stack",
    "Linked List",
    "Stack",
    "Queue",
    "Binary Tree",
    "Binary Search Tree",
    "Heap",
    "Hashing",
    "Graph",
    "Matrix",
    "Strings"
];
export default withRouter((props) => {
    var restService = new QuestionService();
    const [data, setData] = React.useState([]);
    const [currentChapter, setCurrentChapter] = React.useState("Array");
    function handleClick(e) {
        console.log('click ', e);
        // this.setState({ current: e.key });
    }
    ;
    function fetchData() {
        restService
            .getAll()
            .then((data) => {
            setData(data);
        })
            .catch((error) => {
            alert("Faield to get data");
        });
    }
    function fetchLists(chapter) {
        console.log("Fetchng Lits is callled" + chapter);
        restService
            .getListsByChapter(chapter)
            .then((data) => {
            setData(data);
        })
            .catch((error) => {
            message.error("Faield to fetch list data from server.");
        });
    }
    useEffect(() => {
        fetchLists(currentChapter);
    }, [currentChapter]);
    return (_jsx(React.Fragment, { children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { className: "gutter-row", span: 18, children: _jsxs(Card, { bordered: false, children: [_jsx("h2", { children: currentChapter }, void 0), data != null ? "" : _jsx(Empty, {}, void 0), data.map((list, index) => {
                                return (_jsxs("div", { children: [_jsx("div", { children: _jsx("h3", { children: list.listName }, void 0) }, void 0), _jsx("ol", { style: { listStyle: "auto" }, children: list.list.map((question, index) => {
                                                return (_jsxs("li", { style: { padding: "3px", paddingLeft: "10px", margin: "3px" }, children: [_jsx(Link, { to: "/coding/question/" + question.id, children: question.title.replace("- GeeksforGeeks", "") }, void 0), question.difficultyLevel ? _jsx("div", { style: { float: "right" }, children: _jsx(Tag, { color: "pink", children: question.difficultyLevel }, void 0) }, void 0) : ""] }, question.id));
                                            }) }, void 0)] }, void 0));
                            })] }, void 0) }, void 0), _jsxs(Col, { className: "gutter-row", span: 6, children: [_jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Data Structures" }, void 0), DS.map((data, index) => {
                                    return (_jsx(Button, { style: { padding: "0px", marginTop: "3px" }, size: "small", type: "link", onClick: () => setCurrentChapter(data), children: _jsx(Tag, { style: { margin: "3px" }, children: data }, void 0) }, void 0));
                                })] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Companies" }, void 0), _jsx("span", { className: "avatar-item", children: _jsx(Badge, { count: 1, children: _jsx("div", { style: { backgroundColor: "grey", padding: "6px", "borderRadius": "5px", color: "white" }, children: "Amazon" }, void 0) }, void 0) }, void 0), " ", _jsx("span", { className: "avatar-item", children: _jsx(Badge, { count: 10, children: _jsx("div", { style: { backgroundColor: "grey", padding: "6px", "borderRadius": "5px", color: "white" }, children: "Samsung" }, void 0) }, void 0) }, void 0), _jsx(Empty, {}, void 0)] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Topics" }, void 0), _jsx("span", { className: "avatar-item", children: _jsx(Badge, { count: 10, children: _jsx(Tag, { style: { paddingRight: "10px", }, children: "Array" }, void 0) }, void 0) }, void 0), " ", _jsx("span", { className: "avatar-item", children: _jsx(Badge, { count: 10, children: _jsx(Tag, { style: { paddingRight: "10px" }, children: "Tree" }, void 0) }, void 0) }, void 0)] }, void 0)] }, void 0)] }, void 0) }, void 0));
});
//# sourceMappingURL=DataStructure.js.map