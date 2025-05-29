// import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { CheckCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SortAscendingOutlined, SyncOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Divider, Empty, Input, message, Modal, Pagination, Row, Select, Spin, Tag } from "antd";
import enUS from "antd/lib/locale/en_US";
import React, { useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { DS, EXCLUDED_TAGS, FAV_TAGS } from "./Constants";
import SolutionService from "./SolutionService";

const { Option } = Select;

export default withRouter((props) => {
  var restService = new SolutionService();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [collapse, setCollapse] = React.useState(true);
  const [processingData, setProcessingData] = React.useState([]);
  const [companyTagData, setCompanyTagData] = React.useState([]);
  const [topicTagData, setTopicTagData] = React.useState([]);
  const [selectedCompanyTag, setSelectedCompanyTag] = React.useState(undefined);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [companyTagFilter, setCompanyTagFilter] = React.useState([]);
  const [dsFilter, setDsFilter] = React.useState("");
  const [topicTagFilter, setTopicTagFilter] = React.useState("");

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [listName, setListName] = React.useState("");
  const [listData, setListData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState({});

  //Pagination States
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [totalPages, setTotalPages] = React.useState(1);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // HANDLE PROPS ON RELOAD
  let history = useHistory();

  function setFilters() {
    if (props.location.query.difficulty) {
      setDifficultyFilter(props.location.query.difficulty);
    }
  }

  // FETCH DATA CALLS
  function fetchQuestionBasedOnFilter() {
    restService
      .getAll(currentPage - 1, pageSize, searchQuery)
      .then((data) => {
        setData(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalElements);
        setPageSize(data.size);
        setProcessingData(data.content);
        setFilters();
        setLoading(false);
      })
      .catch((error) => {
        message.error("Failed to Fetch question based on filter.");
      });
  }

  // function fetchCompanyTags() {
  //   restService
  //     .getCompanyTags()
  //     .then((data) => {
  //       var data2 = data.sort((a, b) => {
  //         return a.name < b.name ? -1 : 1;
  //       });
  //       setCompanyTagData(data2);
  //     })
  //     .catch((error) => {
  //       message.error("Failed to Fetch Company Tags");
  //     });
  // }

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
        message.error("Failed to fetch topic tags.");
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
        message.error("Failed to Fetch List data");
      });
  }

  // useEffect(() => {
  //   console.log("difficultyFilter", difficultyFilter)
  // }, [difficultyFilter])

  useEffect(() => {
    fetchQuestionBasedOnFilter(currentPage, pageSize, searchQuery);
    // fetchCompanyTags();
    fetchTopicTags();
    // fetchListData();
  }, []);

  useEffect(() => {
    var searchData = JSON.parse(JSON.stringify(searchQuery));
    // if(searchFilter) searchData[
    // if (searchFilter && question.title.toLowerCase().indexOf(searchFilter) == -1) return false;
    // if (topicTagFilter && !question?.topicTags.find((tag) => tag.name == topicTagFilter)) return false;
    // if (companyTagFilter && !question?.topicTags.find((tag) => tag.name == companyTagFilter)) return false;
    // if (difficultyFilter && question.difficultyLevel != difficultyFilter) return false;
    // if (statusFilter && question.status != statusFilter) return false;

    if (searchFilter) {
      searchData["title"] = searchFilter;
    } else if (searchData.hasOwnProperty("title")) {
      delete searchData["title"];
    }

    if (statusFilter) {
      searchData["status"] = statusFilter;
    } else if (searchData.hasOwnProperty("status")) {
      delete searchData["status"];
    }

    if (companyTagFilter) {
      searchData["topicTags"] = companyTagFilter;
    } else if (searchData.hasOwnProperty("topicTags")) {
      delete searchData["topicTags"];
    }

    setSearchQuery(searchData);
  }, [topicTagFilter, difficultyFilter, statusFilter, searchFilter, companyTagFilter]);

  useEffect(() => {
    fetchQuestionBasedOnFilter(currentPage, pageSize, searchQuery);
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchQuestionBasedOnFilter(0, 50, searchQuery);
  }, [searchQuery]);

  //MODALS AND OTHER UTILITY
  const handleOk = () => {
    var listData = data;
    var name = listName;
    restService
      .createList(listName, listData)
      .then((data) => {
        message.info("List created successfully. Name: " + name);
      })
      .catch((error) => {
        message.error("Failed to create list");
      });

    setIsModalVisible(false);
  };

  return (
    <ConfigProvider locale={enUS}>
      <React.Fragment>
        {/* <PageHeaderWrapper> */}

        <Row gutter={16}>
          <Col className='gutter-row' span={collapse ? 24 : 18}>
            <Card bordered={false}>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}>
                {data ? <Button type={"primary"}>{"#" + totalPages}</Button> : ""}

                <Input
                  placeholder='Search'
                  style={{
                    width: "30%",
                  }}
                  onChange={(value) => {
                    var l = value.target.value;

                    if (l && l.length >= 3) {
                      setSearchFilter(l.toLowerCase());
                    } else if (l == undefined || l == "") {
                      setSearchFilter(l);
                    }
                  }}
                />
                {"   "}
                <Select
                  showSearch
                  placeholder='Topic Tag'
                  style={{
                    width: "30%",
                  }}
                  mode='multiple'
                  allowClear
                  onChange={(value) => {
                    debugger
                    setCompanyTagFilter(value);
                  }}>
                  {topicTagData?.map((d, index) => (
                    <Option key={d.name}>{d.name}</Option>
                  ))}
                </Select>

                <Select
                  placeholder='Status'
                  style={{ width: "20%" }}
                  allowClear
                  onChange={(value) => {
                    setStatusFilter(value);
                  }}>
                  <Option value='DONE'>Done</Option>
                  <Option value='NOT_DONE'>Not Done</Option>
                </Select>
                <Button
                  onClick={() => {
                    setCompanyTagFilter([]);
                    setSearchFilter("");
                    setStatusFilter("");

                    // const queryParams = props.location.query;
                    // delete queryParams.difficulty;
                    // history.replace("/solutions/all", queryParams);
                  }}>
                  <SyncOutlined />
                </Button>
                <Button onClick={() => setIsModalVisible(true)}>
                  <UnorderedListOutlined />
                </Button>
                <Modal
                  title='Create List'
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={() => setIsModalVisible(false)}
                  footer={[
                    <Button key='back' onClick={() => setIsModalVisible(false)}>
                      Cancel
                    </Button>,
                    <Button key='submit' type='primary' onClick={handleOk}>
                      Submit
                    </Button>,
                  ]}>
                  <Input
                    placeholder='List Name'
                    style={{
                      width: "100%",
                      margin: "10px",
                      marginBottom: "20px",
                    }}
                    onChange={(value) => {
                      var l = value.target.value;
                      setListName(l);
                    }}
                  />

                  <ul style={{ listStyle: "auto" }}>
                    {data.map((question, index) => {
                      return <li style={{ padding: "1px", margin: "1px" }} key={index}>{question.title}</li>;
                    })}
                  </ul>
                </Modal>
                <Button hidden={collapse} onClick={() => setCollapse(true)}>
                  <MenuUnfoldOutlined />
                </Button>
                <Button hidden={!collapse} onClick={() => setCollapse(false)}>
                  <MenuFoldOutlined />
                </Button>
              </div>

              {topicTagFilter ? <Tag color='success'> {topicTagFilter}</Tag> : ""}

              {companyTagFilter && companyTagFilter.length != 0 ? companyTagFilter.map((t, index) => <Tag key={index} color='success'> {t}</Tag>) : ""}

              {difficultyFilter ? <Tag color='success'> {difficultyFilter}</Tag> : ""}
              {statusFilter ? <Tag color='success'> {statusFilter}</Tag> : ""}

              <Divider />

              {data.length == 0 && loading == false ? <Empty></Empty> : ""}

              {loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Spin size='large' />{" "}
                </div>
              ) : (
                ""
              )}
              <ol
                start={(currentPage - 1) * pageSize + 1}
                style={{
                  listStyle: "auto",
                }}>
                {data?.map((question, index) => {
                  return (
                    <li
                      style={{
                        padding: "3px",
                        paddingLeft: "10px",
                        margin: "3px",
                      }}
                      key={index}>
                      <Link
                        target='_blank'
                        to={"/solutions/solution/" + question.id}
                        style={{
                          color: question.status == "DONE" ? "grey" : "",
                        }}>
                        {question.title.replace("- GeeksforGeeks", "")}
                      </Link>
                      <Button
                        size={"small"}
                        style={{
                          float: "right",
                        }}
                        icon={<CheckCircleOutlined />}
                        onClick={() => {
                          markDone(question.id);
                        }}></Button>

                      {question.difficultyLevel ? (
                        <div
                          style={{
                            float: "right",
                          }}>
                          <Tag color='pink'>{question.difficultyLevel}</Tag>
                        </div>
                      ) : (
                        ""
                      )}

                      {question.topicTags.slice(0,5).map((tag, index) => {
                        return (
                          <Tag
                            style={{
                              float: "right",
                            }}
                            key={index}
                            color='blue'
                            onClick={() => {
                              setTopicTagFilter(tag.name);
                            }}>
                            {tag.name}
                            
                          </Tag>
                        );
                      })}
                    </li>
                  );
                })}
              </ol>
              <Row gutter={16} justify='end' style={{ marginTop: "40px" }}>
                <div>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalPages} // Total number of items
                    onChange={onPageChange}
                    showSizeChanger // Allow users to change page size
                    onShowSizeChange={onPageChange}
                  />
                </div>
              </Row>
            </Card>
          </Col>
          <Col className='gutter-row' span={collapse ? 0 : 6} hidden={collapse}>
            <Card bordered={false}>
              <h3>Topics</h3>

              <span className='avatar-item'>
                {topicTagData?.map((d) =>
                  EXCLUDED_TAGS.indexOf(d.name) == -1 ? (
                    <Tag
                      style={{
                        margin: "3px",
                      }}
                      onClick={() => {
                        // setSelectedCompanyTag(d.name)
                        setTopicTagFilter(d.name);
                      }}
                      color={FAV_TAGS.indexOf(d.name) != -1 ? "green" : ""}
                      key={d.name}>
                      {d.name}
                    </Tag>
                  ) : (
                    ""
                  )
                )}
              </span>
            </Card>
            <br />
            <Card bordered={false}>
              <h3>Companies</h3>
              <span className='avatar-item'>
                {companyTagData?.map((d, index) => (
                  <Tag
                    style={{
                      margin: "3px",
                    }}
                    onClick={() => {
                      setCompanyTagFilter(d.name);
                    }}
                    key={index}>
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
                      padding: "0px",
                      marginTop: "3px",
                    }}
                    key={index}
                    size='small'
                    type='link'>
                    <Tag
                      style={{
                        margin: "3px",
                      }}>
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
    </ConfigProvider>
  );
});
