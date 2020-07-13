import axios from 'axios';

const URL = "http://localhost:1337"

class Databaseclass {
    constructor() {
        
    }

    
    save(name, response) {
        return new Promise((resolve, reject) => {
            let sendResponse = this.backend(name, response);
            sendResponse.request = "save";
            axios.post(this.url("responses"), sendResponse).then(() => {
                console.log("saved");
                resolve();
            });
        });
    }

    load(name) {
        return new Promise((resolve, reject) => {
            let sendResponse =  {
                request: "load",
                name: name
            };
            axios.post(this.url("responses"), sendResponse).then(response => {
                resolve(this.serializeBackend(response.data));
            });
        });
    }

    removePostback(names) {
        return new Promise((resolve, reject) => {
            let sendResponse = {
                request: "remove",
                names: names
            }
            axio.post(this.url("responses"), sendResponse).then(response => {
                console.log(response);
                resolve();
            });
        });
    }

    serializeFrontend(response) {
        let serializedResponse = [];
        for (let i = 0; i < response.length; ++i) {
            let msg = response[i];
            let serialized = {
                value: msg.value
            };
            switch(msg.type) {
                case "quicks":
                    serialized.type = "buttons";
                    let btns = [];
                    msg.options.foreach(btn => {
                        btns.push({
                            title: btn.title,
                            type: "postback",
                            payload: btn.post_back
                        });
                    });
                    serialized.options = {
                        btns: btns
                    }
                    break;
                case "URL":
                    serialized.type = "buttons";
                    let btn = [
                        {
                            type: "web_url",
                            urls: msg.options.url,
                            title: msg.options.title
                        }
                    ]
                    serialized.options = {
                        btns: btn
                    }
                    break;
                case "text":
                    serialized.type = "text";
                    break;
                case "wait":
                    serialized.type = "wait";
                    serialized.value = msg.value;
                    break;
            }
            serializedResponse.push(serialized);
        }
        return JSON.stringify(serializedResponse);     
    }

    serializeBackend(response) {
        let msgs = JSON.parse(response);
        let serializedResponse = [];
        msgs.foreach(msg => {
            
        });
        return serializedResponse;
    }

    url(relative) {
        return `${URL}/${relative}`;
    }

    backend(name, frontend) {
        let payload = { name: name, isIntent: name.split(':').length === 1, response: this.serializeFrontend(frontend) };
        let request = { payload: payload, request: ""};
        return request;
    }
}

export const Database = new Databaseclass();
