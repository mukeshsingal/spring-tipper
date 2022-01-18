
import { Button, Card, Col, Empty, Icon, Input, Menu, message, Row, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Tabs } from 'antd';


import styles from "../Coding/Question.css";
import QuestionService from "./QuestionService";

import { DeleteFilled, GoogleOutlined, LeftCircleFilled, SearchOutline, StarFilled, StarOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;
const { SubMenu } = Menu;
const style = { background: '#0092ff', padding: '8px 0' };
var Router = require("react-router");


export default (props) => {


    var restService = new QuestionService();
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

        <React.Fragment>

            <Card bordered={false} >

                <Row gutter={18}>
                    <Col span={2} className="icons-list">
                        <Button className={styles.actionbutton} type="primary" onClick={() => window.open("https://www.google.com/search?q=" + data.title, '_blank')}><GoogleOutlined /></Button>
                        <Button className={styles.actionbutton} type="primary" onClick={() => {
                            history.goBack()
                        }}><LeftCircleFilled></LeftCircleFilled></Button>

                    </Col>
                    <Col span={14}>
                        <div ><h1 style={{ marginTop: "12px" }}><a href={data.problemUrl} target="_blank">{data.title}</a></h1></div>
                    </Col>
                    <Col span={8}>

                        <Button className={styles.actionbutton} type="primary" onClick={() => markDeleted()}><DeleteFilled></DeleteFilled></Button>

                        {
                            data?.favourite ?
                                <Button className={styles.actionbutton} type="primary" onClick={() => markFavourite()}><StarFilled></StarFilled></Button>
                                :
                                <Button className={styles.actionbutton} type="primary" onClick={() => markFavourite()}><StarOutlined></StarOutlined></Button>
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

            <Row gutter={18}>
                <Col span={18} >
                    <Card style={{ marginTop: "5px" }} className={styles.articlecard} >

                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span>Problem</span>} key="1">
                                <div dangerouslySetInnerHTML={{ __html: data.problemDescription?.replaceAll("font-size:18px", "") }} />
                            </TabPane>
                            <TabPane tab={<span> Solution</span>} key="2" >
                                <div dangerouslySetInnerHTML={{ __html: data.solutionDescription?.replaceAll("font-size:18px", "") }} />
                            </TabPane>
                        </Tabs>



                    </Card>
                </Col>
                <Col span={6} >
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