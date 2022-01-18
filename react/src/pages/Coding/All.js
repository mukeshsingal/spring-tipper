// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Icon,
  Menu,
  message,
  Row,
  Tag,
  Select,
  Divider,
  Input,
  Popover,
  Modal
} from 'antd';
import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import QuestionService from './QuestionService';
import { MediumOutlined, RightCircleOutlined, SortAscendingOutlined, SyncOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MessageOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const style = {
  background: '#0092ff',
  padding: '8px 0',
};
import qs from 'qs';
import Avatar from 'antd/lib/avatar/avatar';
import { useHistory } from 'react-router-dom';
const { SubMenu } = Menu;
const { Option } = Select;
let timeout;
let currentValue;
const DS = [
  'Array',
  'Stack',
  'Linked List',
  'Stack',
  'Queue',
  'Binary Tree',
  'Binary Search Tree',
  'Heap',
  'Hashing',
  'Graph',
  'Matrix',
  'Strings',
];
{
  /*
   */
} // const extra = (
//   <Fragment>
//     <div
//       style={{
//         fontSize: 16,
//         color: 'rgba(0, 0, 0, 0.85)',
//         fontWeight: '500',
//         marginBottom: 16,
//       }}
//     >
//       <FormattedMessage
//         id="app.result.error.hint-title"
//         defaultMessage="The content you submitted has the following error:"
//       />
//     </div>
//     <div style={{ marginBottom: 16 }}>
//       <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
//       <FormattedMessage
//         id="app.result.error.hint-text1"
//         defaultMessage="Your account has been frozen"
//       />
//       <a style={{ marginLeft: 16 }}>
//         <FormattedMessage id="app.result.error.hint-btn1" defaultMessage="Thaw immediately" />
//         <Icon type="right" />
//       </a>
//     </div>
//     <div>
//       <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
//       <FormattedMessage
//         id="app.result.error.hint-text2"
//         defaultMessage="Your account is not yet eligible to apply"
//       />
//       <a style={{ marginLeft: 16 }}>
//         <FormattedMessage id="app.result.error.hint-btn2" defaultMessage="Upgrade immediately" />
//         <Icon type="right" />
//       </a>
//     </div>
//   </Fragment>
// );
// const actions = (
//   <Button type="primary">
//     <FormattedMessage id="app.result.error.btn-text" defaultMessage="Return to modify" />
//   </Button>
// );

export default withRouter((props) => {
  var restService = new QuestionService();
  const [data, setData] = React.useState([]);
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
      })
      .catch((error) => {
        message.error('Failed to Fetch the data.');
      });
  }

  useEffect(() => {
    fetchQuestionBasedOnFilter();
    fetchCompanyTags();
    fetchTopicTags();
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
        if (!question?.companyTags.find((tag) => tag.name == companyTagFilter)) {
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
        message.info("List created succesfully. Name: " + name)

      })
      .catch((error) => {
        message.error("Failed to create list")
      });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <React.Fragment>
      {/* <PageHeaderWrapper> */}
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Card bordered={false}>
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              {data ? <Button type={'primary'}>{'#' + data?.length}</Button> : ''}

              <Input
                placeholder="Search"
                style={{
                  width: '300px',
                }}
                onChange={(value) => {
                  var l = value.target.value;

                  if (l && l.length >= 3) {
                    setSearchFilter(l.toLowerCase());
                  } else if (l == undefined || l == '') {
                    setSearchFilter(l);
                  }
                }}
              />
              {'   '}
              <Select
                placeholder="Data Structure"
                style={{
                  width: 200,
                }}
                allowClear
                onChange={(value) => {
                  setDsFilter(value);
                }}
              >
                <Option value="Array">Array</Option>
                <Option value="Stack">Stack</Option>
                <Option value="Linked List">Linked List</Option>
                <Option value="Binary Tree">Binary Tree</Option>
                <Option value="Binary Search Tree">Binary Search Tree</Option>
                <Option value="Heap">Heap</Option>
                <Option value="Graph">Graph</Option>
              </Select>
              {'   '}
              <Select
                placeholder="Difficulty"
                style={{
                  width: 150,
                }}
                onChange={(value) => {
                  setDifficultyFilter(value);
                  history.push({
                    pathname: '/coding/questions',
                    search: '?difficulty=' + value,
                  });
                }}
                allowClear
              >
                <Option value="Basic">Basic</Option>
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Hard">Hard</Option>
                <Option value="Expert">Expert</Option>
              </Select>
              {'   '}
              <Select
                placeholder="Status"
                style={{
                  width: 150,
                }}
                allowClear
                onChange={(value) => {
                  setStatusFilter(value);
                }}
              >
                <Option value="DONE">Done</Option>
                <Option value="NOT_DONE">Not Done</Option>
              </Select>
              {'   '}

              <Select
                placeholder="Company Tag"
                style={{
                  width: 200,
                }}
                allowClear
                onChange={(value) => {
                  setCompanyTagFilter(value);
                }}
              >
                {companyTagData?.map((d) => (
                  <Option key={d.name}>{d.name}</Option>
                ))}
              </Select>
              {'   '}
              <Select
                placeholder="Topic Tag"
                style={{
                  width: 200,
                }}
                allowClear
                onChange={(value) => {
                  setTopicTagFilter(value);
                }}
              >
                {topicTagData?.map((d) => (
                  <Option key={d.name}>{d.name}</Option>
                ))}
              </Select>
              <Button onClick={() => setSort(!sort)}>
                <SortAscendingOutlined />
              </Button>
              <Button
                onClick={() => {
                  setCompanyTagFilter('');
                  setSearchFilter('');
                  setStatusFilter('');
                  setTopicTagFilter('');
                  setDifficultyFilter("")
                  const queryParams = props.location.query;
                  delete queryParams.difficulty;
                  history.replace('/coding/questions', queryParams);
                }}
              >
                <SyncOutlined />
              </Button>
              <Button onClick={showModal}><UnorderedListOutlined /></Button>
              <Modal title="Create List"


                visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Submit
                </Button>
                ]}

              >
                <Input
                  placeholder="List Name"
                  style={{
                    width: '100%',
                    margin: "10px",
                    marginBottom: "20px"
                  }}
                  onChange={(value) => {
                    var l = value.target.value;
                    setListName(l);
                  }}
                />

                <ul style={{ listStyle: "auto" }}>
                  {data.map((question, index) => {
                    return <li style={{ padding: "1px", "margin": "1px" }}>{question.title}</li>
                  })
                  }
                </ul>

              </Modal>
            </div>
            <Divider />
            {data == undefined || data.length == 0 ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Spin size="large" />{' '}
              </div>
            ) : (
              ''
            )}
            <ol
              style={{
                listStyle: 'auto',
              }}
            >
              {data?.map((question, index) => {
                return (
                  <li
                    style={{
                      padding: '3px',
                      paddingLeft: '10px',
                      margin: '3px',
                    }}
                    key={question.id}
                  >
                    <Popover
                      placement="right"
                      style={{
                        width: '300px',
                      }}
                      content={
                        <div
                          style={{
                            width: '300px',
                          }}
                        >
                          {question.companyTags.map((tag, index) => {
                            return (
                              <Tag
                                style={{
                                  margin: '4px',
                                }}
                                color="green"
                              >
                                {tag.name}
                              </Tag>
                            );
                          })}
                        </div>
                      }
                      title="Company Tags"
                    >
                      <Link
                        to={'/coding/question/' + question.id}
                        style={{
                          color: question.status == 'DONE' ? 'grey' : '',
                        }}
                      >
                        {question.title.replace('- GeeksforGeeks', '')}
                      </Link>
                    </Popover>

                    {question.difficultyLevel ? (
                      <div
                        style={{
                          float: 'right',
                        }}
                      >
                        <Tag color="pink">{question.difficultyLevel}</Tag>
                      </div>
                    ) : (
                      ''
                    )}

                    {question.topicTags.map((tag, index) => {
                      return (
                        <Tag
                          style={{
                            float: 'right',
                          }}
                          color="blue"
                        >
                          {tag.name}
                        </Tag>
                      );
                    })}
                  </li>
                );
              })}
            </ol>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card bordered={false}>
            <h3>Topics</h3>
            <span className="avatar-item">
              {topicTagData?.map((d) => (
                <Tag
                  style={{
                    margin: '3px',
                  }}
                  onClick={() => {
                    // setSelectedCompanyTag(d.name)
                    setTopicTagFilter(d.name);
                  }}
                  key={d.name}
                >
                  {d.name}
                </Tag>
              ))}
            </span>
          </Card>
          <br />
          <Card bordered={false}>
            <h3>Companies</h3>
            <span className="avatar-item">
              {companyTagData?.map((d) => (
                <Tag
                  style={{
                    margin: '3px',
                  }}
                  onClick={() => {
                    // setSelectedCompanyTag(d.name)
                    setCompanyTagFilter(d.name);
                  }}
                  key={d.name}
                >
                  {d.name}
                </Tag>
              ))}
            </span>
          </Card>
          <br />

          <Card bordered={false}>
            <h3>Data Structures</h3>
            {DS.map((data, index) => {
              return (
                <Button
                  style={{
                    padding: '0px',
                    marginTop: '3px',
                  }}
                  size="small"
                  type="link"
                >
                  <Tag
                    style={{
                      margin: '3px',
                    }}
                  >
                    {data}
                  </Tag>
                </Button>
              );
            })}
          </Card>
        </Col>
      </Row>
      {/* </PageHeaderWrapper> */}
    </React.Fragment>
  );
});
