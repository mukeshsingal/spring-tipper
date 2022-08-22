import React from 'react';
import { useEffect } from "react";

import {
  DeleteFilled,
  SaveOutlined,
  GoogleOutlined,
  DollarCircleOutlined,
  LeftOutlined,
  RightOutlined,
  RestFilled,
} from '@ant-design/icons';

import { Button, Card, Empty, Typography, Table, Avatar, Input } from 'antd';
import { Menu, Row, Col, Layout, Drawer } from 'antd';
import { Tag, message } from 'antd';

import Column from 'antd/lib/table/Column';
import JobsService from "./JobsService";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

import "./job.css"

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

  var matchKeyword = ["microservices", "java", "spring", "distributed systems"]
  function handleClick(e) {
    console.log('click ', e);
    // this.setState({ current: e.key });
  };


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
        })

        setData(data);
        if (data.length > 0) {
          setCurrentJob(data[0])
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
    setCompanyFilter(props.location.query.companyName)
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
    if (difference == 0) return "Today";
    else if (difference == 1) return "Yesterday";
    else return difference + " days ago";
  }

  function setCurrentJob(jobData, rowIndex) {
    var htmlText = jobData["jobDescription"];
    jobData["jobDescription"] = highlightData(htmlText);
    setJob(jobData);
    setJobIndex(rowIndex)
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
  return (
    <React.Fragment>

      <Card bordered={false}>
        <Row>
          <Col span={18}>
            <Row gutter={10} style={{marginBottom: "10px"}}>
              <Col span={8}>
                <Button type='primary'>#{data.length}</Button>
                <Input style={{width: "82%", marginLeft: "10px"}} placeholder="Job Title" onChange={(event) => {
                  setTitleFitler(event.target.value)
                }} />
              </Col>
              <Col span={8}>
                <Input  placeholder="Company" value={companyFilter} onChange={(event) => {
                  setCompanyFilter(event.target.value)
                }} />
                
              </Col>
              <Col span={8}>
                <Input style={{width: "90%"}} placeholder="Description" value={descriptionFilter} onChange={(event) => {
                  setDescriptionFilter(event.target.value)
                }} />
                <Button icon={<RestFilled/>} onClick={()=>{
                  setCompanyFilter("");
                  setTitleFitler("");
                  setDescriptionFilter("")
                }}></Button>
              </Col>
            </Row>


            <Table
              dataSource={data}
              size="small"
              pagination={false}
              rowKey={(record) => record.jobId}
              // onRow={(record, rowIndex) => {
              //   return {
              //     onClick: event => {
              //       setCurrentJob(record, rowIndex);
              //       setDrawerVisible(true);
              //     }
              //   }
              // }}
            >

              <Column
                title="ID"
                key="jobId"
                dataIndex="jobId"

              />
              <Column
                title="Title"
                key="jobTitle"
                dataIndex="jobTitle"
                filteredValue={[titleFilter]}
                onFilter={(value, record) => {
                  return record.jobTitle.toLowerCase().indexOf(titleFilter.toLowerCase()) != -1
                }}
                sorter={(a, b) => {
                  var count = 0;
                  for(var i = 0; i < matchKeyword.length; i++) {
                      count += a.jobDescription.toLowerCase().indexOf(matchKeyword[i]) == -1 ? 0 : 1;
                  }
                  return count >= 2;
                }}
                render={(value, record)=> {
                  var count = 0;
                  for(var i = 0; i < matchKeyword.length; i++) {
                      count += record.jobDescription.toLowerCase().indexOf(matchKeyword[i]) == -1 ? 0 : 1;
                  }
                  if(count >= 2) {
                    return (<p style={{color: "green"}}>{value}</p>);
                  }
                  else {
                    return <p>{value}</p>;
                  }
                }}
                onCell={(data, index) => {
                  return {
                    onClick: event => {
                      setCurrentJob(data);
                      setDrawerVisible(true);
                    }
                  }
                }}
              />
               <Column
                title="Description"
                key="jobDescription"
                dataIndex="jobDescription"
                filteredValue={[descriptionFilter]}
                onFilter={(value, record) => {
                  return record.jobDescription.toLowerCase().indexOf(descriptionFilter.toLowerCase()) != -1
                }}
                render={()=> {
                  return <p></p>
                }}
              />

              <Column
                title="Company"
                key="companyName"
                dataIndex="companyName"
                
                sorter={(a, b) => {

                  return a.companyName < b.companyName

                }}
                onCell={(data, index) => {
                  return {
                    onClick: event => {
                      setCurrentJob(data);
                      setDrawerVisible(true);
                    }
                  }
                }}


                onFilter={(value, record) => {
                  return record.companyName.indexOf(companyFilter) != -1
                }}
                filteredValue={[companyFilter]}
                filters={[
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
                ]}
              />
              <Column
                title="Show"
                render={(text, record) => (
                  <div style={{ width: "100px" }}>
                    <Button
                      style={{ marginRight: "5px" }}
                      icon={<DeleteFilled />}
                      size='small'
                      type='danger'
                      onClick={() => deleteJob(record.jobId)}
                    ></Button>

                    <Button
                      style={{ "marginRight": "5px" }}
                      icon={<SaveOutlined />}
                      type='primary'
                      size='small'
                      onClick={() => saveJob(record.jobId)}
                    ></Button>
                    <a href={"https://www.google.com/search?q=" + record.companyName} target="_blank" style={{ marginRight: "5px" }}>
                      <Button icon={<GoogleOutlined />} size='small' type='primary'></Button>
                    </a>
                  </div>
                )}

              />
              <Column
                title="Location"
                key="location"
                dataIndex="location"
                filters={[{
                  text: 'Hyderabad',
                  value: 'Hyderabad',
                }, {
                  text: 'Bengaluru',
                  value: 'Bengaluru',
                }]}
                onCell={(data, index) => {
                  return {
                    onClick: event => {
                      setCurrentJob(data);
                      setDrawerVisible(true);
                    }
                  }
                }}
                onFilter={(value, record) => {
                  return record.location.indexOf(value) != -1
                }}
                render={(text, record) => {
                  if (text.indexOf("Hyderabad") != -1) {
                    return "Hyderabad"
                  }
                  else if (text.indexOf("Bengaluru") != -1) {
                    return "Bengaluru"
                  }
                  else {
                    return text;
                  }
                }}
              />
              <Column
                title="Date"
                key="datePosted"
                dataIndex="datePosted"
                render={(text, record) => getDateString(new Date(text))}

              />

            </Table>
            {data != null ? "" : <Empty />}</Col>
          <Col span={6} >
            <Row style={{ width: "90%", float: "right" }}>
              <Col>
                <Card style={{ float: "right" }}>
                  {
                    Object.keys(tags).map((name) => {
                      return (
                        <a onClick={() => {
                          setCompanyFilter(name);
                        }}>
                          <Tag color="grey" style={{ margin: "5px" }}>
                            <span>{name}</span>
                            <span style={{ backgroundColor: 'red', padding: "1px 5px", marginLeft: "5px", width: "10px", borderRadius: "10px" }}>{tags[name]}</span>
                          </Tag>
                        </a>
                      )
                    })
                  }</Card>
              </Col>
            </Row>
          </Col>
        </Row>





        <Drawer width={"80%"} closable={false} placement="right" onClose={() => setDrawerVisible(!drawerVisible)} visible={drawerVisible}>
          <Card bordered={false} >
            {
              job.id == undefined ? <Empty></Empty> : (
                <Row gutter={24} >
                  <Col span={16}>
                    <Row>

                      <Col>
                        <Title level={2}>{job.jobTitle}</Title>
                      </Col>
                    </Row>
                    <Tag> {job.companyName} </Tag>
                    <Tag> {job.jobId} </Tag>
                    <Tag> {getDateString(new Date(job.datePosted))} </Tag>
                    <Tag>{job.location}</Tag>
                    <Tag>{' Team ' + (job.teamName == null ? '' : job.teamName)}</Tag>
                  </Col>
                  <Col span={8}>
                    <Row justify='end' >
                      <Button icon={<LeftOutlined />} style={{ margin: "5px" }} onClick={() => {
                        setJobIndex(jobIndex - 1)
                        setJob(data[jobIndex - 1])
                      }} disabled={data.length == 0 || jobIndex == 0}
                        type='primary'>
                      </Button>
                      <Button
                        icon={<RightOutlined />}
                        style={{ margin: "5px" }}
                        type='primary'
                        disabled={data.length == 0 || jobIndex == data.length - 1}
                        onClick={() => {
                          setJobIndex(jobIndex + 1)
                          setJob(data[jobIndex + 1])
                        }}></Button>
                      <a href={"https://www.google.com/search?q=" + job.companyName} target="_blank" style={{ margin: "5px" }}>
                        <Button icon={<GoogleOutlined />} type='primary'></Button>
                      </a>
                      <a href={"https://www.google.com/search?q=" + job.companyName + " revenue"} target="_blank" style={{ margin: "5px" }}>
                        <Button icon={<DollarCircleOutlined />} type='primary'></Button>
                      </a>
                      <a href={job.url} target="_blank" style={{ margin: "5px" }}>
                        <Button type='primary'>Apply</Button>
                      </a>
                      <Button
                        icon={<SaveOutlined />}
                        type='primary'
                        style={{ margin: "5px" }}
                        onClick={() => {
                          saveJob(job.jobId)
                        }}
                      ></Button>
                      <Button
                        icon={<DeleteFilled />}
                        type='danger'
                        style={{ margin: "5px" }}
                        onClick={() => {
                          deleteJob(job.jobId)
                        }}
                      ></Button>
                    </Row>
                  </Col>
                  <div id="job_content" style={{
                    marginTop: "20px"
                  }} dangerouslySetInnerHTML={{ __html: job.jobDescription }}></div>
                </Row>
              )
            }
          </Card>
        </Drawer>

      </Card>
    </React.Fragment>
  )
}