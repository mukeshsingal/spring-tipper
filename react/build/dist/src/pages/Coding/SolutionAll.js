import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button, Card, Col, Empty, Menu, message, Row, Tag, Select, Divider, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SortAscendingOutlined, SyncOutlined, UnorderedListOutlined, CheckCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const style = {
    background: '#0092ff',
    padding: '8px 0',
};
import { useHistory } from 'react-router-dom';
import SolutionService from './SolutionService';
const { SubMenu } = Menu;
const { Option } = Select;
let timeout;
let currentValue;
const DS = [
    "Amazon",
    "Arrays",
    "Graph",
    "BFS",
    "DFS",
    'Hashing',
    "Heap",
    "Binary Search",
    "Binary Search Tree",
    'Linked List',
    "Queue",
    "Stack",
    "Strings",
    "Tree",
    "Sorting",
    "Searching"
];
const FAV_TAGS = [
    "Arrays",
    "Graph",
    "BFS",
    "DFS",
    "Heap",
    "Binary Search",
    "Binary Search Tree",
    "Queue",
    "Stack",
    "Strings",
    "Tree",
    "Sorting",
    "Searching",
];
const EXCLUDED_TAGS = [
    "CPP",
    "CPP-Control-Flow",
    "Class",
    "Cpp-operator",
    "Cpp-pointers",
    "Cpp-strings",
    "Data Type",
    "Java-Class and Object",
    "Java-Control-Flow",
    "Java-Collections",
    "OOP",
    "Pointers",
    "Operating System",
    "Operators",
    "Physics",
    "STL",
    "Structures",
    "Date-Time",
    "Java-Operators",
    "Functions",
    "Practice-Problems",
    "Machine Learning",
    "Java-BigInteger",
    "Operating Systems"
];
export default withRouter((props) => {
    var restService = new SolutionService();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [collapse, setCollapse] = React.useState(true);
    const [processingData, setProcessingData] = React.useState([]);
    const [companyTagData, setCompanyTagData] = React.useState([]);
    const [topicTagData, setTopicTagData] = React.useState([]);
    const [selectedCompanyTag, setSelectedCompanyTag] = React.useState(undefined);
    const [searchFilter, setSearchFilter] = React.useState('');
    const [difficultyFilter, setDifficultyFilter] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [companyTagFilter, setCompanyTagFilter] = React.useState('');
    const [dsFilter, setDsFilter] = React.useState('');
    const [topicTagFilter, setTopicTagFilter] = React.useState('');
    const [sort, setSort] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [listName, setListName] = React.useState("");
    const [listData, setListData] = React.useState([]);
    let history = useHistory();
    function fetchCompanyTags() {
        restService
            .getCompanyTags()
            .then((data) => {
            console.log('Data 1 ', data);
            var data2 = data.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            });
            console.log('Data 2', data2);
            setCompanyTagData(data2);
        })
            .catch((error) => {
            message.error('Failed to Fetch the data.');
        });
    }
    function fetchListData() {
        restService
            .getAllLists()
            .then((data) => {
            setListData(data);
            console.log("ListData", data);
        })
            .catch((error) => {
            message.error('Failed to Fetch the data.');
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
            message.error('Failed to fetch the data.');
        });
    }
    function fetchQuestionBasedOnFilter() {
        restService
            .getAll()
            .then((data) => {
            setData(data);
            setProcessingData(data);
            setFilters();
            setLoading(false);
        })
            .catch((error) => {
            message.error('Failed to Fetch the data.');
        });
    }
    useEffect(() => {
        fetchQuestionBasedOnFilter();
        fetchCompanyTags();
        fetchTopicTags();
        // fetchListData();
    }, []);
    function setFilters() {
        if (props.location.query.difficulty) {
            setDifficultyFilter(props.location.query.difficulty);
        }
    } // useEffect(() => {
    //   console.log("difficultyFilter", difficultyFilter)
    // }, [difficultyFilter])
    useEffect(() => {
        filterData();
    }, [topicTagFilter, difficultyFilter, statusFilter, searchFilter, companyTagFilter]);
    function filterData() {
        var localData = processingData;
        localData = localData.filter((question) => {
            if (searchFilter) {
                if (question.title.toLowerCase().indexOf(searchFilter) == -1) {
                    return false;
                }
            }
            if (topicTagFilter) {
                if (!question?.topicTags.find((tag) => tag.name == topicTagFilter)) {
                    return false;
                }
            }
            if (companyTagFilter) {
                if (!question?.topicTags.find((tag) => tag.name == companyTagFilter)) {
                    return false;
                }
            }
            if (difficultyFilter) {
                if (question.difficultyLevel != difficultyFilter) {
                    return false;
                }
            }
            if (statusFilter) {
                debugger;
                if (question.status != statusFilter) {
                    return false;
                }
            }
            return true;
        });
        setData(localData);
    }
    useEffect(() => {
        sorting();
    }, [sort]);
    function sorting() {
        var localData = data;
        localData = localData.sort((a, b) => {
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
        console.log(localData);
        setData(localData);
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        var listData = data;
        var name = listName;
        restService
            .createList(listName, listData)
            .then((data) => {
            message.info("List created succesfully. Name: " + name);
        })
            .catch((error) => {
            message.error("Failed to create list");
        });
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (_jsx(React.Fragment, { children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { className: "gutter-row", span: collapse ? 24 : 18, children: _jsxs(Card, { bordered: false, children: [_jsxs("div", { style: {
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '20px',
                                }, children: [data ? _jsx(Button, { type: 'primary', children: '#' + data?.length }, void 0) : '', _jsx(Input, { placeholder: "Search", style: {
                                            width: '20%',
                                        }, onChange: (value) => {
                                            var l = value.target.value;
                                            if (l && l.length >= 3) {
                                                setSearchFilter(l.toLowerCase());
                                            }
                                            else if (l == undefined || l == '') {
                                                setSearchFilter(l);
                                            }
                                        } }, void 0), '   ', _jsx(Select, { showSearch: true, placeholder: "Topic Tag", style: {
                                            width: '25%',
                                        }, allowClear: true, onChange: (value) => {
                                            setCompanyTagFilter(value);
                                        }, children: topicTagData?.map((d) => (_jsx(Option, { children: d.name }, d.name))) }, void 0), '   ', _jsx(Select, { placeholder: "Data Structure", style: {
                                            width: '15%',
                                        }, showSearch: true, allowClear: true, onChange: (value) => {
                                            setTopicTagFilter(value);
                                        }, children: DS.map((d) => {
                                            return _jsx(Option, { value: d, children: d }, void 0);
                                        }) }, void 0), '   ', _jsxs(Select, { placeholder: "Status", style: {
                                            width: '15%',
                                        }, allowClear: true, onChange: (value) => {
                                            setStatusFilter(value);
                                        }, children: [_jsx(Option, { value: "DONE", children: "Done" }, void 0), _jsx(Option, { value: "NOT_DONE", children: "Not Done" }, void 0)] }, void 0), '   ', _jsx(Button, { onClick: () => setSort(!sort), children: _jsx(SortAscendingOutlined, {}, void 0) }, void 0), _jsx(Button, { onClick: () => {
                                            setCompanyTagFilter('');
                                            setSearchFilter('');
                                            setStatusFilter('');
                                            setTopicTagFilter('');
                                            setDifficultyFilter("");
                                            setData(processingData);
                                            const queryParams = props.location.query;
                                            delete queryParams.difficulty;
                                            history.replace('/solutions/all', queryParams);
                                        }, children: _jsx(SyncOutlined, {}, void 0) }, void 0), _jsx(Button, { onClick: showModal, children: _jsx(UnorderedListOutlined, {}, void 0) }, void 0), _jsxs(Modal, { title: "Create List", visible: isModalVisible, onOk: handleOk, onCancel: handleCancel, footer: [
                                            _jsx(Button, { onClick: handleCancel, children: "Cancel" }, "back"),
                                            _jsx(Button, { type: "primary", onClick: handleOk, children: "Submit" }, "submit")
                                        ], children: [_jsx(Input, { placeholder: "List Name", style: {
                                                    width: '100%',
                                                    margin: "10px",
                                                    marginBottom: "20px"
                                                }, onChange: (value) => {
                                                    var l = value.target.value;
                                                    setListName(l);
                                                } }, void 0), _jsx("ul", { style: { listStyle: "auto" }, children: data.map((question, index) => {
                                                    return _jsx("li", { style: { padding: "1px", "margin": "1px" }, children: question.title }, void 0);
                                                }) }, void 0)] }, void 0), _jsx(Button, { hidden: collapse, onClick: () => setCollapse(true), children: _jsx(MenuUnfoldOutlined, {}, void 0) }, void 0), _jsx(Button, { hidden: !collapse, onClick: () => setCollapse(false), children: _jsx(MenuFoldOutlined, {}, void 0) }, void 0)] }, void 0), topicTagFilter ? (_jsxs(Tag, { color: "green", children: [" ", topicTagFilter] }, void 0)) : "", companyTagFilter ? (_jsxs(Tag, { color: "green", children: [" ", companyTagFilter] }, void 0)) : "", difficultyFilter ? (_jsxs(Tag, { color: "green", children: [" ", difficultyFilter] }, void 0)) : "", statusFilter ? (_jsxs(Tag, { color: "green", children: [" ", statusFilter] }, void 0)) : "", _jsx(Divider, {}, void 0), data.length == 0 && loading == false ? _jsx(Empty, {}, void 0) : "", loading ? (_jsxs("div", { style: {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }, children: [_jsx(Spin, { size: "large" }, void 0), ' '] }, void 0)) : (''), _jsx("ol", { style: {
                                    listStyle: 'auto',
                                }, children: data?.map((question, index) => {
                                    return (_jsxs("li", { style: {
                                            padding: '3px',
                                            paddingLeft: '10px',
                                            margin: '3px'
                                        }, children: [_jsx(Link, { target: '_blank', to: '/solutions/solution/' + question.id, style: {
                                                    color: question.status == 'DONE' ? 'grey' : '',
                                                }, children: question.title.replace('- GeeksforGeeks', '') }, void 0), _jsx(Button, { size: "small", style: {
                                                    float: 'right',
                                                }, icon: _jsx(CheckCircleOutlined, {}, void 0), onClick: () => {
                                                    markDone(question.id);
                                                } }, void 0), question.difficultyLevel ? (_jsx("div", { style: {
                                                    float: 'right',
                                                }, children: _jsx(Tag, { color: "pink", children: question.difficultyLevel }, void 0) }, void 0)) : (''), question.topicTags.slice(0, 4).map((tag, index) => {
                                                return (_jsx(Tag, { style: {
                                                        float: 'right',
                                                    }, color: "blue", onClick: () => {
                                                        setTopicTagFilter(tag.name);
                                                    }, children: tag.name }, void 0));
                                            })] }, question.id));
                                }) }, void 0)] }, void 0) }, void 0), _jsxs(Col, { className: "gutter-row", span: collapse ? 0 : 6, hidden: collapse, children: [_jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Topics" }, void 0), _jsx("span", { className: "avatar-item", children: topicTagData?.map((d) => ((EXCLUDED_TAGS.indexOf(d.name) == -1 ? (_jsx(Tag, { style: {
                                            margin: '3px',
                                        }, onClick: () => {
                                            // setSelectedCompanyTag(d.name)
                                            setTopicTagFilter(d.name);
                                        }, color: FAV_TAGS.indexOf(d.name) != -1 ? "green" : "", children: d.name }, d.name)) : ""))) }, void 0)] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Companies" }, void 0), _jsx("span", { className: "avatar-item", children: companyTagData?.map((d) => (_jsx(Tag, { style: {
                                            margin: '3px',
                                        }, onClick: () => {
                                            // setSelectedCompanyTag(d.name)
                                            setCompanyTagFilter(d.name);
                                        }, children: d.name }, d.name))) }, void 0)] }, void 0), _jsx("br", {}, void 0), _jsxs(Card, { bordered: false, children: [_jsx("h3", { children: "Data Structures" }, void 0), DS.map((data, index) => {
                                    return (_jsx(Button, { style: {
                                            padding: '0px',
                                            marginTop: '3px',
                                        }, size: "small", type: "link", children: _jsx(Tag, { style: {
                                                margin: '3px',
                                            }, children: data }, void 0) }, void 0));
                                })] }, void 0)] }, void 0)] }, void 0) }, void 0));
});
//# sourceMappingURL=SolutionAll.js.map