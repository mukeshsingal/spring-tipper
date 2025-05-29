import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Col, Empty, Menu, message, Row, Tag, Select, Divider } from 'antd';
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import QuestionService from "./QuestionService";
import { SortAscendingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
const style = { background: '#0092ff', padding: '8px 0' };
const { SubMenu } = Menu;
const { Option } = Select;
let timeout;
let currentValue;
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
{ /*
          */
}
export default withRouter((props) => {
    var restService = new QuestionService();
    const [data, setData] = React.useState([]);
    const [companyTagData, setCompanyTagData] = React.useState([]);
    const [topicTagData, setTopicTagData] = React.useState([]);
    const [selectedCompanyTag, setSelectedCompanyTag] = React.useState(undefined);
    const [listData, setListData] = React.useState([]);
    const [sort, setSort] = React.useState(false);
    function fetchCompanyTags() {
        restService
            .getCompanyTags()
            .then((data) => {
            console.log("Data 1 ", data);
            var data2 = data.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            });
            console.log("Data 2", data2);
            setCompanyTagData(data2);
        })
            .catch((error) => {
            message.error("Failed to Fetch the data.");
        });
    }
    function fetchTopicTags() {
        restService
            .getTopicTags()
            .then((data) => {
            var data2 = data.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            });
            setTopicTagData(data2);
        })
            .catch((error) => {
            message.error("Failed to fetch the data.");
        });
    }
    function fetchQuestionBasedOnFilter() {
        restService
            .getAllFavourite()
            .then((data) => {
            setData(data);
        })
            .catch((error) => {
            message.error("Failed to Fetch the data.");
        });
    }
    function fetchLists() {
        restService
            .getAllLists()
            .then((data) => {
            setListData(data);
        })
            .catch((error) => {
            message.error("Faield to fetch list data from server.");
        });
    }
    useEffect(() => {
        sorting();
    }, [sort]);
    function sorting() {
        var localData = listData;
        var newListData = [];
        localData?.forEach((list) => {
            var mylocalList = list;
            mylocalList.list = mylocalList?.list?.sort((a, b) => {
                if (a.difficultyLevel == 'Basic') {
                    return -1;
                }
                if (b.difficultyLevel == 'Basic') {
                    return 1;
                }
                if (a.difficultyLevel == 'Easy') {
                    return -1;
                }
                if (b.difficultyLevel == 'Easy') {
                    return 1;
                }
                if (a.difficultyLevel == 'Medium') {
                    return -1;
                }
                if (b.difficultyLevel == 'Medium') {
                    return 1;
                }
                if (a.difficultyLevel == 'Hard') {
                    return -1;
                }
                if (b.difficultyLevel == 'Hard') {
                    return 1;
                }
                if (a.difficultyLevel == 'Expert') {
                    return -1;
                }
                if (b.difficultyLevel == 'Expert') {
                    return 1;
                }
            });
            newListData.push(mylocalList);
        });
        setListData(newListData);
    }
    useEffect(() => {
        fetchLists();
        fetchQuestionBasedOnFilter();
        fetchCompanyTags();
        fetchTopicTags();
    }, []);
    return (_jsx(React.Fragment, { children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { className: "gutter-row", span: 18, children: _jsxs(Card, { bordered: false, children: [_jsx("div", { style: { marginBottom: "20px", display: "flex", alignItems: "right", justifyContent: "right", gap: "20px" }, children: _jsx(Button, { onClick: () => setSort(!sort), children: _jsx(SortAscendingOutlined, {}, void 0) }, void 0) }, void 0), _jsx(Divider, {}, void 0), data?.map((question, index) => {
                                return (_jsxs("li", { style: {
                                        padding: '3px',
                                        paddingLeft: '10px',
                                        margin: '3px'
                                    }, children: [_jsx(Popover, { placement: "right", style: {
                                                width: '300px',
                                            }, content: _jsx("div", { style: {
                                                    width: '300px',
                                                }, children: question.companyTags.map((tag, index) => {
                                                    return (_jsx(Tag, { style: {
                                                            margin: '4px',
                                                        }, color: "green", children: tag.name }, void 0));
                                                }) }, void 0), title: "Company Tags", children: _jsx(Link, { to: '/coding/question/' + question.id, style: {
                                                    color: question.status == 'DONE' ? 'grey' : '',
                                                }, children: question.title.replace('- GeeksforGeeks', '') }, void 0) }, void 0), _jsx(Button, { size: "small", style: {
                                                float: 'right',
                                            }, icon: _jsx(PlusOutlined, {}, void 0) }, void 0), question.difficultyLevel ? (_jsx("div", { style: {
                                                float: 'right',
                                            }, children: _jsx(Tag, { color: "pink", children: question.difficultyLevel }, void 0) }, void 0)) : (''), question.topicTags.map((tag, index) => {
                                            return (_jsx(Tag, { style: {
                                                    float: 'right',
                                                }, color: "blue", children: tag.name }, void 0));
                                        })] }, question.id));
                            }), _jsx(Divider, {}, void 0), _jsx("ol", { style: { listStyle: "auto" }, children: listData.map((list, index) => {
                                    return _jsxs("li", { children: [_jsx("h3", { children: list?.listName }, void 0), list.list != null ? "" : _jsx(Empty, {}, void 0), _jsx("ol", { style: { listStyle: "auto" }, children: list.list?.map((question, index) => {
                                                    return (_jsxs("li", { style: { padding: "3px", paddingLeft: "10px", margin: "3px" }, children: [_jsx(Link, { to: "/coding/question/" + question.id, style: { color: question.status == "DONE" ? "grey" : "blue" }, children: question.title.replace("- GeeksforGeeks", "") }, void 0), question.difficultyLevel ? _jsx("div", { style: { float: "right" }, children: _jsx(Tag, { color: "pink", children: question.difficultyLevel }, void 0) }, void 0) : ""] }, question.id));
                                                }) }, void 0)] }, void 0);
                                }) }, void 0)] }, void 0) }, void 0), _jsxs(Col, { className: "gutter-row", span: 6, children: [_jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Data Structures" }, void 0), DS.map((data, index) => {
                                    return (_jsx(Button, { style: { padding: "0px", marginTop: "3px" }, size: "small", type: "link", children: _jsx(Tag, { style: { margin: "3px" }, children: data }, void 0) }, void 0));
                                })] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Companies" }, void 0), _jsx("span", { className: "avatar-item", children: companyTagData?.map(d => _jsx(Tag, { style: { margin: "3px" }, children: d.name }, d.name)) }, void 0)] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Topics" }, void 0), _jsx("span", { className: "avatar-item", children: topicTagData?.map(d => _jsx(Tag, { style: { margin: "3px" }, children: d.name }, d.name)) }, void 0)] }, void 0)] }, void 0)] }, void 0) }, void 0));
});
//# sourceMappingURL=Favourite.js.map