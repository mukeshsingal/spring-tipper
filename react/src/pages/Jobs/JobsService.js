import { configConsumerProps } from "antd/lib/config-provider";

var host = "http://localhost:8081"

class JobsService {

    async getAll() {
        return fetch(host + "/api/job/unstared", {
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

    async getStaredJob() {
        return fetch(host + "/api/job/stared", {
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

    async saveJob(jobId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/job/save/" + jobId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async getStatsByCompany() {
        return fetch(host + "/api/job/stats/byCompany", {
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
    

    async parseCompany(companyName) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/parser/linkedin/company/" + companyName, requestOptions)
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


    

    async parseLastDay() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/parser/linkedin/lastOneDay", requestOptions)
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

    async deleteJob(jobId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/job/delete/" + jobId, requestOptions)
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
    
    async markApplied(jobId) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/job/applied/" + jobId, requestOptions)
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

export default JobsService;