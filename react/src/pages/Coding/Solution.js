
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Empty, Icon } from 'antd';
import { Tabs, Input, Menu, message, Row, Tag } from 'antd';
import { AppstoreOutlined, DeleteFilled, ExportOutlined, GoogleOutlined, LeftCircleFilled, StarFilled } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutline, StarOutlined } from "@ant-design/icons";

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
    };

    function fetchData() {
        restService
            .getById(props.match.params.id)
            .then((data) => {
                console.log("Solution is ", data);
                setData(data);
                console.log(data)
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
                console.log(data)
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
                console.log(data)
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
                message.error("Failed to parse the solution link. Plese check logs.")
            });

        message.info("URL has been submitted for parsing.")

    }

    function markDone() {
        restService
            .markDone(props.match.params.id)
            .then((data) => {
                setData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Failed to get data");

            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <React.Fragment style={{padding:"0px"}} >
            <Card bordered={false} style={{padding:"0px"}} >
                <Row gutter={18}>
                    <Col span={16} className="icons-list" style={{display:"flex"}}>
                        <Button className={styles.action_button} type="primary" onClick={() => {
                            history.goBack()
                        }}><LeftCircleFilled></LeftCircleFilled></Button>
                        <Button className={styles.action_button} type="primary" onClick={() => window.open("https://www.youtube.com/results?search_query=" + data.title + " geeksforgeeks", '_blank')}>
                            <GoogleOutlined />
                        </Button>
                        <Button className={styles.action_button} type="primary" onClick={() => window.open(data.problemUrl, '_blank')}>
                            <ExportOutlined />
                        </Button>
                        <div>
                            <h1 style={{ marginTop: "5px",  marginLeft: "10px" }}>
                                <a href={data.url} target="_blank">{data.title}</a>
                            </h1>
                        </div>                        
                    </Col>
                    <Col span={8}>
                        
                        <Button className={styles.action_button} hidden={collapse} type="primary"  onClick={() => setCollapse(true)}>
                            <MenuUnfoldOutlined />
                        </Button>
                        <Button className={styles.action_button} hidden={!collapse} type="primary"  onClick={() => setCollapse(false)}>
                            <MenuFoldOutlined />
                        </Button>
                        
                        <Button className={styles.action_button} type="primary" onClick={() => markDeleted()}><DeleteFilled></DeleteFilled></Button>
                        {
                            data?.favourite ?
                                <Button className={styles.action_button} type="primary" onClick={() => markFavourite()}><StarFilled></StarFilled></Button>
                                :
                                <Button className={styles.action_button} type="primary" onClick={() => markFavourite()}><StarOutlined></StarOutlined></Button>
                        }
                        {
                            data?.status == "DONE" ?
                                <Button style={{ height: "40px", float: "right", margin: "3px" }} type="primary" onClick={() => markDone()}>Not Done</Button>
                                :
                                <Button style={{ height: "40px", float: "right", margin: "3px" }} type="primary" onClick={() => markDone()}>Done</Button>
                        }
                        
                    </Col>
                </Row>
            </Card>

            <Row gutter={collapse?24:18}>
                <Col span={collapse?24:18} >
                    <Card style={{ marginTop: "5px" }} className={styles.articlecard} >

                    <div dangerouslySetInnerHTML={
                        { __html: data.solutionDescription?.replaceAll("font-size:18px", "") + "<style>article{font-size:larger;font-family: \"IBMPlexSerif\"}.tabcontent{font-size:14px}.comments{color:#686867!important}.keyword{font-weight:bold;color: #f92672;}.color1{color:#66d9ef;}.string{color:#e6db74;}</style>" }} />


                    </Card>
                </Col>
                <Col span={collapse?0:6} >
                    <Card bordered={false} style={{ marginTop: "5px" }}>
                        {console.log(data.practiceUrl)}
                        {data.practiceUrl != undefined && data.practiceUrl != "" ? <div><a target="_blank" href={data.practiceUrl}>Practice URL</a> </div> : <Empty></Empty>}

                    </Card>
                    <Card bordered={false} style={{ marginTop: "5px" }}>
                        <h3>Topics</h3>

                        {
                            data.topicTags == undefined || data.topicTags.length == 0 ? <Empty></Empty> : data.topicTags.map((tag, index) => { return <Tag color="blue" key={index}>{tag.name}</Tag> })
                        }


                    </Card>
                    <Card bordered={false} style={{ marginTop: "5px" }}>
                        <h3>Companies</h3>
                        {
                            data.companyTags == undefined || data.companyTags.length == 0 ? <Empty></Empty> : data.companyTags.map((tag, index) => { return <Tag color="magenta" key={index}>{tag.name}</Tag> })
                        }

                    </Card>
                    <Card bordered={false} style={{ marginTop: "5px" }}>
                        <h3>Submit Solution Link</h3>
                        <Input placeholder="Solution Link" onChange={(value) => {
                            setSolutionLink(value.target.value)
                        }} />
                        <Button type="primary" style={{ margin: "3px", float: "right" }} onClick={startParsing}> Parse</Button>

                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    )
}