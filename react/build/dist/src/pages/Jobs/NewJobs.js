import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useEffect } from "react";
import { DeleteFilled, SaveOutlined, GoogleOutlined, DollarCircleOutlined, LeftOutlined, RightOutlined, RestFilled, } from '@ant-design/icons';
import { Button, Card, Empty, Typography, Table, Input } from 'antd';
import { Menu, Row, Col, Layout, Drawer } from 'antd';
import { Tag, message } from 'antd';
import Column from 'antd/lib/table/Column';
import JobsService from "./JobsService";
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Sider, Content } = Layout;
import "./job.css";
export default (props) => {
    var restService = new JobsService();
    // ******************** States ******************** //  
    const [data, setData] = React.useState([]);
    const [job, setJob] = React.useState({});
    const [jobIndex, setJobIndex] = React.useState(0);
    const [collapsed, setCollapsed] = React.useState(false);
    const [size, setSize] = React.useState(12);
    const [selectedJobId, setSelectedJobId] = React.useState(8);
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [tags, setTags] = React.useState({});
    const [companyFilter, setCompanyFilter] = React.useState("");
    const [descriptionFilter, setDescriptionFilter] = React.useState("");
    const [titleFilter, setTitleFitler] = React.useState("");
    var matchKeyword = ["microservices", "java", "spring", "distributed systems"];
    function handleClick(e) {
        console.log('click ', e);
        // this.setState({ current: e.key });
    }
    ;
    // ******************** REST Handlers ******************** //  
    function fetchData() {
        var tag = {};
        restService
            .getAll()
            .then((data) => {
            for (var i = 0; i < data.length; i++) {
                if (tag.hasOwnProperty(data[i].companyName)) {
                    tag[data[i].companyName] = tag[data[i].companyName] + 1;
                }
                else {
                    tag[data[i].companyName] = 1;
                }
            }
            setTags(tag);
            data = data.map((record) => {
                record.jobDescription = highlightData(record.jobDescription);
                return record;
            });
            setData(data);
            if (data.length > 0) {
                setCurrentJob(data[0]);
                setSelectedJobId(data[0].jobId);
            }
        })
            .catch((error) => {
            message.error("Failed to get jobs data." + error);
        });
    }
    function saveJob(jobId) {
        restService
            .saveJob(jobId)
            .then((data) => {
            message.info(JSON.stringify(data));
            fetchData();
        })
            .catch((error) => {
            message.error("Failed to delete the job." + error);
        });
    }
    function deleteJob(jobId) {
        restService
            .deleteJob(jobId)
            .then((data) => {
            message.info(JSON.stringify(data));
            fetchData();
        })
            .catch((error) => {
            message.error("Failed to delete the job." + error);
        });
    }
    useEffect(() => {
        fetchData();
        setCompanyFilter(props.location.query.companyName);
    }, []);
    // ******************** Helper Methods ******************** //
    function getDaysDifference(pastDate) {
        var today = new Date();
        var timeDifference = today.getTime() - pastDate.getTime();
        var days = timeDifference / (24 * 3600 * 1000);
        return Math.floor(days);
    }
    function getDateString(pastDate) {
        var difference = getDaysDifference(pastDate);
        if (difference == 0)
            return "Today";
        else if (difference == 1)
            return "Yesterday";
        else
            return difference + " days ago";
    }
    function setCurrentJob(jobData, rowIndex) {
        var htmlText = jobData["jobDescription"];
        jobData["jobDescription"] = highlightData(htmlText);
        setJob(jobData);
        setJobIndex(rowIndex);
    }
    function highlightData(htmlText) {
        var keywords = ["team", "Microservices", "Java", "Spring", "Kafka", "Server Side", "Distributed systems", "NOSQL", "highly scalable", "fault tolerant"];
        for (var keyword in keywords) {
            var regEx = new RegExp(keywords[keyword], "ig");
            htmlText = htmlText.replaceAll(regEx, "<strong class='primary'>" + keywords[keyword] + "</strong>");
        }
        return htmlText;
    }
    let keys = [];
    // ******************** React Renderer ******************** //
    return (_jsx(React.Fragment, { children: _jsxs(Card, { bordered: false, children: [_jsxs(Row, { children: [_jsxs(Col, { span: 18, children: [_jsxs(Row, { gutter: 10, style: { marginBottom: "10px" }, children: [_jsxs(Col, { span: 8, children: [_jsxs(Button, { type: 'primary', children: ["#", data.length] }, void 0), _jsx(Input, { style: { width: "82%", marginLeft: "10px" }, placeholder: "Job Title", onChange: (event) => {
                                                        setTitleFitler(event.target.value);
                                                    } }, void 0)] }, void 0), _jsx(Col, { span: 8, children: _jsx(Input, { placeholder: "Company", value: companyFilter, onChange: (event) => {
                                                    setCompanyFilter(event.target.value);
                                                } }, void 0) }, void 0), _jsxs(Col, { span: 8, children: [_jsx(Input, { style: { width: "90%" }, placeholder: "Description", value: descriptionFilter, onChange: (event) => {
                                                        setDescriptionFilter(event.target.value);
                                                    } }, void 0), _jsx(Button, { icon: _jsx(RestFilled, {}, void 0), onClick: () => {
                                                        setCompanyFilter("");
                                                        setTitleFitler("");
                                                        setDescriptionFilter("");
                                                    } }, void 0)] }, void 0)] }, void 0), _jsxs(Table, { dataSource: data, size: "small", pagination: false, rowKey: (record) => record.jobId, children: [_jsx(Column, { title: "ID", dataIndex: "jobId" }, "jobId"), _jsx(Column, { title: "Title", dataIndex: "jobTitle", filteredValue: [titleFilter], onFilter: (value, record) => {
                                                return record.jobTitle.toLowerCase().indexOf(titleFilter.toLowerCase()) != -1;
                                            }, sorter: (a, b) => {
                                                var count = 0;
                                                for (var i = 0; i < matchKeyword.length; i++) {
                                                    count += a.jobDescription.toLowerCase().indexOf(matchKeyword[i]) == -1 ? 0 : 1;
                                                }
                                                return count >= 2;
                                            }, render: (value, record) => {
                                                var count = 0;
                                                for (var i = 0; i < matchKeyword.length; i++) {
                                                    count += record.jobDescription.toLowerCase().indexOf(matchKeyword[i]) == -1 ? 0 : 1;
                                                }
                                                if (count >= 2) {
                                                    return (_jsx("p", { style: { color: "green" }, children: value }, void 0));
                                                }
                                                else {
                                                    return _jsx("p", { children: value }, void 0);
                                                }
                                            }, onCell: (data, index) => {
                                                return {
                                                    onClick: event => {
                                                        setCurrentJob(data);
                                                        setDrawerVisible(true);
                                                    }
                                                };
                                            } }, "jobTitle"), _jsx(Column, { title: "Description", dataIndex: "jobDescription", filteredValue: [descriptionFilter], onFilter: (value, record) => {
                                                return record.jobDescription.toLowerCase().indexOf(descriptionFilter.toLowerCase()) != -1;
                                            }, render: () => {
                                                return _jsx("p", {}, void 0);
                                            } }, "jobDescription"), _jsx(Column, { title: "Company", dataIndex: "companyName", sorter: (a, b) => {
                                                return a.companyName < b.companyName;
                                            }, onCell: (data, index) => {
                                                return {
                                                    onClick: event => {
                                                        setCurrentJob(data);
                                                        setDrawerVisible(true);
                                                    }
                                                };
                                            }, onFilter: (value, record) => {
                                                return record.companyName.indexOf(companyFilter) != -1;
                                            }, filteredValue: [companyFilter], filters: [
                                                {
                                                    text: 'Paypal',
                                                    value: 'Paypal',
                                                }, {
                                                    text: 'Microsoft',
                                                    value: 'Microsoft',
                                                }, {
                                                    text: 'Goldman Sachs',
                                                    value: 'Goldman Sachs',
                                                }, {
                                                    text: "Uber",
                                                    value: "Uber"
                                                }
                                            ] }, "companyName"), _jsx(Column, { title: "Show", render: (text, record) => (_jsxs("div", { style: { width: "100px" }, children: [_jsx(Button, { style: { marginRight: "5px" }, icon: _jsx(DeleteFilled, {}, void 0), size: 'small', type: 'danger', onClick: () => deleteJob(record.jobId) }, void 0), _jsx(Button, { style: { "marginRight": "5px" }, icon: _jsx(SaveOutlined, {}, void 0), type: 'primary', size: 'small', onClick: () => saveJob(record.jobId) }, void 0), _jsx("a", { href: "https://www.google.com/search?q=" + record.companyName, target: "_blank", style: { marginRight: "5px" }, children: _jsx(Button, { icon: _jsx(GoogleOutlined, {}, void 0), size: 'small', type: 'primary' }, void 0) }, void 0)] }, void 0)) }, void 0), _jsx(Column, { title: "Location", dataIndex: "location", filters: [{
                                                    text: 'Hyderabad',
                                                    value: 'Hyderabad',
                                                }, {
                                                    text: 'Bengaluru',
                                                    value: 'Bengaluru',
                                                }], onCell: (data, index) => {
                                                return {
                                                    onClick: event => {
                                                        setCurrentJob(data);
                                                        setDrawerVisible(true);
                                                    }
                                                };
                                            }, onFilter: (value, record) => {
                                                return record.location.indexOf(value) != -1;
                                            }, render: (text, record) => {
                                                if (text.indexOf("Hyderabad") != -1) {
                                                    return "Hyderabad";
                                                }
                                                else if (text.indexOf("Bengaluru") != -1) {
                                                    return "Bengaluru";
                                                }
                                                else {
                                                    return text;
                                                }
                                            } }, "location"), _jsx(Column, { title: "Date", dataIndex: "datePosted", render: (text, record) => getDateString(new Date(text)) }, "datePosted")] }, void 0), data != null ? "" : _jsx(Empty, {}, void 0)] }, void 0), _jsx(Col, { span: 6, children: _jsx(Row, { style: { width: "90%", float: "right" }, children: _jsx(Col, { children: _jsx(Card, { style: { float: "right" }, children: Object.keys(tags).map((name) => {
                                            return (_jsx("a", { onClick: () => {
                                                    setCompanyFilter(name);
                                                }, children: _jsxs(Tag, { color: "grey", style: { margin: "5px" }, children: [_jsx("span", { children: name }, void 0), _jsx("span", { style: { backgroundColor: 'red', padding: "1px 5px", marginLeft: "5px", width: "10px", borderRadius: "10px" }, children: tags[name] }, void 0)] }, void 0) }, void 0));
                                        }) }, void 0) }, void 0) }, void 0) }, void 0)] }, void 0), _jsx(Drawer, { width: "80%", closable: false, placement: "right", onClose: () => setDrawerVisible(!drawerVisible), visible: drawerVisible, children: _jsx(Card, { bordered: false, children: job.id == undefined ? _jsx(Empty, {}, void 0) : (_jsxs(Row, { gutter: 24, children: [_jsxs(Col, { span: 16, children: [_jsx(Row, { children: _jsx(Col, { children: _jsx(Title, { level: 2, children: job.jobTitle }, void 0) }, void 0) }, void 0), _jsxs(Tag, { children: [" ", job.companyName, " "] }, void 0), _jsxs(Tag, { children: [" ", job.jobId, " "] }, void 0), _jsxs(Tag, { children: [" ", getDateString(new Date(job.datePosted)), " "] }, void 0), _jsx(Tag, { children: job.location }, void 0), _jsx(Tag, { children: ' Team ' + (job.teamName == null ? '' : job.teamName) }, void 0)] }, void 0), _jsx(Col, { span: 8, children: _jsxs(Row, { justify: 'end', children: [_jsx(Button, { icon: _jsx(LeftOutlined, {}, void 0), style: { margin: "5px" }, onClick: () => {
                                                    setJobIndex(jobIndex - 1);
                                                    setJob(data[jobIndex - 1]);
                                                }, disabled: data.length == 0 || jobIndex == 0, type: 'primary' }, void 0), _jsx(Button, { icon: _jsx(RightOutlined, {}, void 0), style: { margin: "5px" }, type: 'primary', disabled: data.length == 0 || jobIndex == data.length - 1, onClick: () => {
                                                    setJobIndex(jobIndex + 1);
                                                    setJob(data[jobIndex + 1]);
                                                } }, void 0), _jsx("a", { href: "https://www.google.com/search?q=" + job.companyName, target: "_blank", style: { margin: "5px" }, children: _jsx(Button, { icon: _jsx(GoogleOutlined, {}, void 0), type: 'primary' }, void 0) }, void 0), _jsx("a", { href: "https://www.google.com/search?q=" + job.companyName + " revenue", target: "_blank", style: { margin: "5px" }, children: _jsx(Button, { icon: _jsx(DollarCircleOutlined, {}, void 0), type: 'primary' }, void 0) }, void 0), _jsx("a", { href: job.url, target: "_blank", style: { margin: "5px" }, children: _jsx(Button, { type: 'primary', children: "Apply" }, void 0) }, void 0), _jsx(Button, { icon: _jsx(SaveOutlined, {}, void 0), type: 'primary', style: { margin: "5px" }, onClick: () => {
                                                    saveJob(job.jobId);
                                                } }, void 0), _jsx(Button, { icon: _jsx(DeleteFilled, {}, void 0), type: 'danger', style: { margin: "5px" }, onClick: () => {
                                                    deleteJob(job.jobId);
                                                } }, void 0)] }, void 0) }, void 0), _jsx("div", { id: "job_content", style: {
                                        marginTop: "20px"
                                    }, dangerouslySetInnerHTML: { __html: job.jobDescription } }, void 0)] }, void 0)) }, void 0) }, void 0)] }, void 0) }, void 0));
};
//# sourceMappingURL=NewJobs.js.map