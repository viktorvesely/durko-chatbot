import axios from 'axios';


export default {
    getIntents() {
        if (false) {
            return new Promise((resolve, reject) => {
                resolve([{name: "request_holiday"}, {name: "knock_knock"}, {name: "get_info"}]);
            });
        } 

        return new Promise((resolve, reject) => {
            axios.post("/api", {request: "intents"}).then(response => {
                let intents = response.data;
                resolve(intents);
            });
        });
    }
}