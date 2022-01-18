// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Badge, Button, Card, Col, Empty, Icon, Menu, message, Row, Tag, Select, Divider } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import QuestionService from "./QuestionService";
import { RightCircleOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { MessageOutlined } from '@ant-design/icons';

const style = { background: '#0092ff', padding: '8px 0' };
import qs from 'qs';

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

{/* 
          */}



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
        console.log("Data 1 ", data)
        var data2 = data.sort((a, b) => {
          return a.name < b.name ? -1 : 1
        })
        console.log("Data 2", data2)
        setCompanyTagData(data2);
      })
      .catch((error) => {
        message.error("Failed to Fetch the data.")
      });
  }

  function fetchTopicTags() {
    restService
      .getTopicTags()
      .then((data) => {
        var data2 = data.sort((a, b) => {
          return a.name < b.name ? -1 : 1
        })
        setTopicTagData(data2);
      })
      .catch((error) => {
        message.error("Failed to fetch the data.")
      });
  }

  function fetchQuestionBasedOnFilter() {
    restService
      .getAllFavourite()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        message.error("Failed to Fetch the data.")
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
    })


    setListData(newListData);
  }


  useEffect(() => {
    fetchLists();
    fetchQuestionBasedOnFilter();
    fetchCompanyTags();
    fetchTopicTags();
  }, []);

  return (
    <React.Fragment>
      {/* <PageHeaderWrapper> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Card bordered={false}>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "right", justifyContent: "right", gap: "20px" }}>
              <Button onClick={() => setSort(!sort)}>
                <SortAscendingOutlined />
              </Button>
            </div>

            <Divider />
            <ol style={{ listStyle: "auto" }}>
              {listData.map((list, index) => {
                return <li><h3>{list?.listName}</h3>

                  {list.list != null ? "" : <Empty />}
                  <ol style={{ listStyle: "auto" }}>
                    {

                      list.list?.map((question, index) => {
                        return (
                          <li style={{ padding: "3px", paddingLeft: "10px", margin: "3px" }} key={question.id}>

                            <Link
                              to={"/coding/question/" + question.id}
                              style={{ color: question.status == "DONE" ? "grey" : "blue" }}
                            >
                              {question.title.replace("- GeeksforGeeks", "")}
                            </Link>

                            {question.difficultyLevel ? <div style={{ float: "right" }}>

                              <Tag color="pink">{question.difficultyLevel}</Tag>
                            </div> : ""}
                          </li>
                        )
                      })

                    }
                  </ol>

                </li>
              })}
            </ol>



          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card bordered={false}>
            <h3>Data Structures</h3>
            {DS.map((data, index) => {
              return (
                <Button style={{ padding: "0px", marginTop: "3px" }} size="small" type="link">
                  <Tag style={{ margin: "3px" }}>{data}</Tag>
                </Button>
              )
            })}
          </Card>
          <br />
          <Card bordered={false}>
            <h3>Companies</h3>
            <span className="avatar-item">
              {
                companyTagData?.map(d => <Tag style={{ margin: "3px" }} key={d.name}>{d.name}</Tag>)
              }
            </span>
          </Card>
          <br />
          <Card bordered={false}>
            <h3>Topics</h3>
            <span className="avatar-item">
              {
                topicTagData?.map(d => <Tag style={{ margin: "3px" }} key={d.name}>{d.name}</Tag>)
              }
            </span>
          </Card>
        </Col>
      </Row>


      {/* </PageHeaderWrapper> */}
    </React.Fragment>
  )
})