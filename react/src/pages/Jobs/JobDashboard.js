import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { CloudDownloadOutlined, EditOutlined, EllipsisOutlined, DeleteFilled, SaveOutlined, GoogleOutlined, LinkedinFilled, ReloadOutlined, DeleteOutlined, LinkOutlined} from '@ant-design/icons';
import { Button, Icon, Card, Empty, List, Typography, Divider } from 'antd';
import { Menu, Row, Col, Layout } from 'antd';
import { Tag, Avatar, Badge, message, Skeleton } from 'antd';

import "./job.css"

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


import CompanyService from "./CompanyService";
import JobsService from "./JobsService"


const { SubMenu } = Menu;
const { Meta } = Card;

const { Title } = Typography;
// const { Header, Sider, Content } = Layout;


const style = { background: '#0092ff', padding: '8px 0' };

export default () => {

  var companyService = new CompanyService();
  var restService = new JobsService();

  let companies = [
    {
      "name": "Microsoft",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQEwDnqpYgYDKA/company-logo_100_100/0/1651805447404?e=1668643200&v=beta&t=_S1WdjjZu_Nx8D9706OsREIuYoU6FgmiqSociS5QzDY"
    },
    {
      "name": "Paypal",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQEEvjF9SDmDfg/company-logo_100_100/0/1657843479528?e=1668643200&v=beta&t=CZSr0UNCNQCsh57wqGFc2wjL-Q8YajiLQKECd5haO1o"
    }, {
      "name": 'Goldman Sachs',
      "logo": "https://media-exp1.licdn.com/dms/image/C4E0BAQHm5bYK6emQSg/company-logo_100_100/0/1595518030728?e=1668643200&v=beta&t=03izrn78QaGNXxo0ecRCa8lKOm2EZXoe5cUSY_E2Log"
    }, {
      "name": "Walmart Global Tech India",
      "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQEC3n4yU_w6bQ/company-logo_200_200/0/1630047631002?e=1668643200&v=beta&t=ctcZgq--Of-CLsfoGMRibFxSGXhry9LeN25lYOcde_w"
    },
    {
      "name": "LinkedIn",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1668643200&v=beta&t=yVG1TUfPEdKA2aBDbKd_C-l2KX1KZQafsTtQ-4ZF_PM"
    },
    {
      "name": "Airbnb",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQFhfl32crIGIw/company-logo_100_100/0/1595528954632?e=1668643200&v=beta&t=wFA0nEypNJGeEGxc7aOhxeX4y-lXA2hyiJmhN04kPbg"
    },
    {
      "name": "The D. E. Shaw Group",
      "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQFmyEBRsJiPhw/company-logo_100_100/0/1539190831860?e=1668643200&v=beta&t=r7bW16_wxFOXurCKLJzUZu6srlvpHXFmOaLwP-JbUiE"
    },
    {
      "name": "Atlassian",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQH5FOSGbPkisg/company-logo_100_100/0/1654721405735?e=1668643200&v=beta&t=PhMFzxIX641DrXIUGGXj4xc1ChXt-LajgHwY6bCpwcU"
    },
    {
      "name": "Google",
      "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_100_100/0/1519856215226?e=1668643200&v=beta&t=GLj4C5QprM3Up4V-swxLU7788z5QNYI64atjZFGNxBE"
    },
    {
      "name": "American Express",
      "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQGRhsociEn4gQ/company-logo_100_100/0/1523269243842?e=1668643200&v=beta&t=_RxnhImkCP5shLcm-YkJciBn0PG4c1IU7rbX-BPcdzs"
    },
    {
      "name": "Visa",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQEP8_eM4zW8bw/company-logo_100_100/0/1626865473807?e=1668643200&v=beta&t=3to7SMqu57fg2d5pgmxwB_5wpLzsP4iktnYrYwGxmKQ"
    },
    {
      "name": "Mastercard",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQGOW4NIyYRRqQ/company-logo_100_100/0/1519856263087?e=1668643200&v=beta&t=5QwPBETFjie72L2tJ2g6lP97Exp1Qwd_KOfT0ezIBpw",
      "description": "Pune"
    },
    {
      "name": "Github",
      "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQFY3BGhoMwEEA/company-logo_100_100/0/1626195279622?e=1668643200&v=beta&t=edps_KxjZqhXDjXkA-3JK7Mtiq2a7b-TOcJzYnI5cYk"
    },
    {
      "name": "Coinbase",
      "logo": "https://media-exp1.licdn.com/dms/image/C560BAQHsPlWyC0Ksxg/company-logo_100_100/0/1620063222443?e=1668643200&v=beta&t=MSeGv8IHJUQ0tQNPhvpo6yw0jlwV-kdwwlJzTfVhv6k"
    }
  ]

  // ******************** States ******************** //  
  const [activeJobs, setActiveJobs] = React.useState([]);
  const [inActiveJobs, setInActiveJobs] = React.useState([]);
  const [job, setJob] = React.useState({});
  const [stats, setStats] = React.useState({});
  const [collapsed, setCollapsed] = React.useState(false);
  const [size, setSize] = React.useState(8);
  

  function handleClick(e) {
    console.log('click ', e);
    // this.setState({ current: e.key });
  };


  // ******************** REST Handlers ******************** //  


  function blacklistCompany(companyName) {
    companyService
      .blacklistCompany(companyName)
      .then((data) => {
        getAllActive();
        getAllInActive();
      })
      .catch((error) => {
        message.error("Failed to blacklist company." + error);
      });
  }

  function fetchStats() {
    restService
      .getStatsByCompany()
      .then((data) => {
        var map = {};

        for(var i = 0; i < data.length; i++) {
          map[data[i][0]] = data[i][1];
        }
        setStats(map);
      })
      .catch((error) => {
        message.error("Failed to blacklist company." + error);
      });
  }

  function parseCompany(companyName) {
    restService
      .parseCompany(companyName)
      .then((data) => {
        message.info(JSON.stringify(data));
      })
      .catch((error) => {
        message.error("Failed to delete the job." + error);
      });
  }

  function parseLastDay() {
    restService
      .parseLastDay()
      .then((data) => {
        message.info(JSON.stringify(data));
      })
      .catch((error) => {
        message.error("Failed to delete the job." + error);
      });
  }

  function getAllActive() {
    companyService
      .getAllActive()
      .then((data) => {
        setActiveJobs(data);
      })
      .catch((error) => {
        message.error("Failed to get active jobs." + error);
      });
  }

  function getAllInActive() {
    companyService
      .getAllInActive()
      .then((data) => {
        setInActiveJobs(data);
      })
      .catch((error) => {
        message.error("Failed to get inactive jobs." + error);
      });
  }

  useEffect(() => {
    getAllActive();
    getAllInActive();
    fetchStats();
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

  function setCurrentJob(jobData) {
    var htmlText = jobData["jobDescription"];
    jobData["jobDescription"] = highlightData(htmlText);
    setJob(jobData);
  }

  function highlightData(htmlText) {

    var keywords = ["team", "Microservices", "Java", "Spring", "Kafka", "Server Side", "Distributed systems", "NOSQL"];

    for (var keyword in keywords) {
      htmlText = htmlText.replaceAll(keywords[keyword], "<strong class='primary'>" + keywords[keyword] + "</strong>");
    }

    return htmlText;
  }


  // ******************** React Renderer ******************** //
  return (
    <React.Fragment>
      <Row justify='end' >
        <Button type='primary' onClick={() => {
          parseLastDay();
        }}>Parse Lasy Day</Button>
      </Row>

      <Row gutter={12}>
        {
          activeJobs.map(company => {
            return (
              <Col>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <CloudDownloadOutlined key="setting" onClick={() => {
                      parseJobsByCompany(company.name)
                    }} />,
                    
                    <GoogleOutlined key="edit" onClick={() => {
                      window.open("https://www.google.com/search?q=" + company.name, "_blank")
                    }} />,
                    
                    <DeleteOutlined key={'inactive'} onClick={() => {
                      blacklistCompany(company.name);
                    }} />,
                    
                    <LinkedinFilled key="edit3" onClick={() => {
                      window.open(company.companyUrl, "_blank")
                      
                    }} />,
                    <LinkOutlined key="extenal" onClick={() => {
                      window.open("/jobs/unsaved?companyName=" + company.name, "_blank")
                    }}/>

                    // <Link target="_blank" to={'unsaved'} query={{"companyName": company.name}}>{company.name}</Link>
                    
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Skeleton loading={false} avatar active>
                    <Meta
                      avatar={<Avatar src={company.logoUrl} />}
                      title={company.name}
                      description={"Jobs Available: " + (stats && stats[company.name] ? stats[company.name] : "")}
                    />
                  </Skeleton>
                </Card>
              </Col>
            )
          })
        }
      </Row>
        
      <Divider/>

      <Row gutter={12}>
        {
          inActiveJobs.map(company => {
            return (
              <Col>
                <Card
                  
                  style={{ width: 300, marginTop: 16 }}
                >
                  <Skeleton loading={false} avatar active>
                    <Meta
                      avatar={<Avatar src={company.logoUrl} />}
                      title={company.name}
                    />
                  </Skeleton>
                </Card>
              </Col>
            )
          })
        }
      </Row>

    </React.Fragment>
  )
}