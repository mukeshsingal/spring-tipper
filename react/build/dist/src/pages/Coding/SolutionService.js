var host = "";
class SolutionService {
    async getAll() {
        return fetch(host + "/api/solutions", {
            headers: {
                "accepts": "application/json"
            }
        }).then((response) => response.json())
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
                "accepts": "application/json"
            }
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
        return fetch(host + "/api/solution/" + id)
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
            method: 'DELETE'
        };
        return fetch(host + "/api/solution/" + id, requestOptions)
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
            method: 'PUT'
        };
        return fetch(host + "/api/solution/" + id + "/favourite", requestOptions)
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
            method: 'PUT'
        };
        return fetch(host + "/api/solution/" + id + "/done", requestOptions)
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
        return fetch(host + "/api/solution/topicTags")
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
}
export default SolutionService;
//# sourceMappingURL=SolutionService.js.map