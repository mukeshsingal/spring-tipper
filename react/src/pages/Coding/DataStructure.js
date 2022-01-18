import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import { Button, Icon, Card, Empty } from 'antd';
// import Result from '@/components/Result';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Menu, Row, Col } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const style = { background: '#0092ff', padding: '8px 0' };
import { Tag, Avatar, Badge, message } from 'antd';
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

  function fetchLists(chapter) {
    console.log("Fetchng Lits is callled" + chapter)
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

  return (
    <React.Fragment>
      {/* <PageHeaderWrapper> */}



      <Row gutter={16}>
        <Col className="gutter-row" span={18}>

          <Card bordered={false}>
            <h2>{currentChapter}</h2>
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
                              <Link to={"/coding/question/" + question.id}>{question.title.replace("- GeeksforGeeks", "")}</Link>

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
            <h3>Data Structures</h3>
            {DS.map((data, index) => {
              return (
                <Button style={{ padding: "0px", marginTop: "3px" }} size="small" type="link" onClick={() => setCurrentChapter(data)}>
                  <Tag style={{ margin: "3px" }}>{data}</Tag>
                </Button>
              )
            })}
          </Card>
          <br />
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
              <Badge count={10}>
                <Tag style={{ paddingRight: "10px", }}>Array</Tag>
              </Badge>
            </span>
            {" "}
            <span className="avatar-item">
              <Badge count={10}>
                <Tag style={{ paddingRight: "10px" }}>Tree</Tag>
              </Badge>
            </span>
          </Card>
        </Col>
      </Row>


      {/* </PageHeaderWrapper> */}
    </React.Fragment>
  )
})