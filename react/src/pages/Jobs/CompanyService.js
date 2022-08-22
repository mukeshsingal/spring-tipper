import { configConsumerProps } from "antd/lib/config-provider";

var host = "http://localhost:8081"

class CompanyService {

    async getAllActive() {
        return fetch(host + "/api/company/active", {
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
    
    async getAllInActive() {
        return fetch(host + "/api/company/inactive", {
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

    

    async blacklistCompany(companyName) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch(host + "/api/company/" + companyName + '/status', requestOptions)
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

export default CompanyService;