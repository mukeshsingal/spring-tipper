import { configConsumerProps } from "antd/lib/config-provider";

var host = "";

class SolutionService {
  async getAll(pageNumber, pageSize, searchQuery) {
    return fetch(host + "/api/solutions/search?pageNumber=" + pageNumber + "&pageSize=" + pageSize, {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        "content-type": "application/json",
        "accepts": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  async getAllDone() {
    return fetch(host + "/api/solutions/completed", {
      headers: {
        accepts: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getById(id) {
    return fetch(host + "/api/solutions/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async markDeleted(id) {
    const requestOptions = {
      method: "DELETE",
    };
    return fetch(host + "/api/solutions/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async markFavourite(id) {
    const requestOptions = {
      method: "PUT",
    };
    return fetch(host + "/api/solutions/" + id + "/favourite", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async markDone(id) {
    const requestOptions = {
      method: "PUT",
    };
    return fetch(host + "/api/solutions/" + id + "/done", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getCompanyTags() {
    return fetch(host + "/api/companyTags")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  async getTopicTags() {
    return fetch(host + "/api/solutions/topicTags")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  // async getAllFavourite() {
  //   return fetch(host + "/api/questions/favourite")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });
  // }

  // async getAllLists() {
  //   return fetch(host + "/api/lists/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }

  // async getListsByChapter(chapterName) {
  //   return fetch(host + "/api/lists/byChapter/" + chapterName)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });
  // }

  // async addQuestionToList(id, questions) {

  //   const requestOptions = {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       {
  //         "list": questions,
  //         "id": id
  //       }
  //     ),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //   };

  //   return fetch(host + "/api/lists/addQuestions", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("ListData", data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log("ListData error", error);
  //       throw error;
  //     });
  // }

  // async createList(listName, questions) {

  //   const requestOptions = {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       {
  //         "list": questions,
  //         "listName": listName
  //       }
  //     ),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //   };

  //   return fetch(host + "/api/lists", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("ListData", data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log("ListData error", error);
  //       throw error;
  //     });
  // }

  // async startParsing(id, url) {

  //   const bodyData = {
  //     "solutionUrl": url
  //   }

  //   const requestOptions = {
  //     method: 'POST',
  //     body: JSON.stringify(bodyData),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },

  //   };
  //   return fetch(host + "/api/parsers/parse-solution/" + id, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });
  // }
}

export default SolutionService;
