import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import { Button, Icon, Card, Empty } from 'antd';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Menu, Row, Col } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const style = { background: '#0092ff', padding: '8px 0' };
import { Tag, Avatar, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import QuestionService from "./QuestionService";






export default () => {

  var restService = new QuestionService();
  const [data, setData] = React.useState([]);


  function handleClick(e) {
    console.log('click ', e);
    // this.setState({ current: e.key });
  };

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

  function fetchLists() {
    restService
      .getAllLists()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        message.error("Faield to fetch list data from server.");

      });
  }

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <React.Fragment>
      {/* <PageHeaderWrapper> */}

      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Card bordered={false}>
            <h2>Array</h2>
            {data != null ? "" : <Empty />}

            {

              data.map((list, index) => {
                return (
                  <div>
                    <div ><h3>{list.listName}</h3></div>
                    <ol style={{ listStyle: "auto" }}>
                      {
                        list.list.map((question, index) => {
                          return (
                            <li style={{ padding: "3px", paddingLeft: "10px", margin: "3px" }} key={question.id}>
                              <Link to={"/coding/" + question.id}>{question.title.replace("- GeeksforGeeks", "")}</Link>

                              {question.difficultyLevel ? <div style={{ float: "right" }}>
                                <Tag color="pink">{question.difficultyLevel}</Tag>
                              </div> : ""}
                            </li>
                          )
                        })
                      }
                    </ol>
                  </div>
                )
              })
            }

          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card bordered={false}>
            <h3>Companies</h3>
            <span className="avatar-item">
              <Badge count={1}>
                <div style={{ backgroundColor: "grey", padding: "6px", "borderRadius": "5px", color: "white" }}>Amazon</div>
              </Badge>
            </span>
            {" "}
            <span className="avatar-item">
              <Badge count={10}>
                <div style={{ backgroundColor: "grey", padding: "6px", "borderRadius": "5px", color: "white" }}>Samsung</div>
              </Badge>
            </span>
            <Empty></Empty>
          </Card>
          <br />
          <Card bordered={false}>
            <h3>Topics</h3>
            <span className="avatar-item">
              <Badge count={1}>
                <div style={{ backgroundColor: "grey", padding: "6px", "borderRadius": "5px", color: "white" }}>Array</div>
              </Badge>
            </span>
            {" "}
            <span className="avatar-item">
              <Badge count={10}>
                <div style={{ backgroundColor: "grey", paddingRight: "10px", "borderRadius": "5px", color: "white", paddingLeft: "10px", paddingTop: "6px", paddingBottom: "6px" }}>Tree</div>
              </Badge>
            </span>
            <Empty></Empty>
          </Card>
        </Col>
      </Row>


      {/* </PageHeaderWrapper> */}
    </React.Fragment>
  )
}