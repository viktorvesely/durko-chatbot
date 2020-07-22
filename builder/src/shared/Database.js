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
            axios.post(this.url("responses"), sendResponse).then(() => {
                resolve();
            });
        });
    }

    serializeFrontend(response, name) {
        let serializedResponse = [];
        for (let i = 0; i < response.length; ++i) {
            let msg = response[i];
            let serialized = {
                value: msg.value
            };
            let btns;
            switch(msg.type) {
                case "quicks":
                    serialized.type = "buttons";
                    btns = [];
                    msg.options.forEach(btn => {
                        btns.push({
                            title: btn.title,
                            type: "postback",
                            payload: name + ":" + btn.post_back
                        });
                    });
                    serialized.options = {
                        btns: btns
                    }
                    break;
                case "url":
                    serialized.type = "buttons";
                    btns = [];
                    //msg.options.forEach(btn => {
                        btns.push({
                            title: msg.options.title,
                            type: "web_url",
                            url: msg.options.url
                        });
                    //});
                    serialized.options = {
                        btns: btns
                    }
                    break;
                case "text":
                    serialized.type = "text";
                    break;
                case "wait":
                    serialized.type = "wait";
                    break;
            }
            serializedResponse.push(serialized);
        }
        return JSON.stringify(serializedResponse);     
    }

    serializeBackend(response) {
        let serializedResponse = [];
        for (let i = 0; i < response.length; ++i) {
            let msg = response[i];
            let serialized = {
                value: msg.value
            };
            switch(msg.type) {
                case "buttons":
                    let btns = msg.options.btns;
                    if (btns[0].type === "postback") { // Quicks
                        serialized.type = "quicks";
                        let quicks = []
                        btns.forEach(btn => {
                            let postback = btn.payload;
                            postback = postback.split(":");
                            postback = postback.pop();
                            quicks.push({
                                title: btn.title,
                                post_back: postback
                            });
                        });
                        serialized.options = quicks;
                    } else  { // URL
                        serialized.type = "url";
                        let url = {
                            title: btns[0].title,
                            url: btns[0].url
                        }
                        serialized.options = url;
                    }
                    break;
                case "text":
                    serialized.type = "text";
                    break;
                case "wait":
                    serialized.type = "wait";
                    break;
            }
            serializedResponse.push(serialized);
        }
        return serializedResponse;
    }

    url(relative) {
        return `${URL}/${relative}`;
    }

    backend(name, frontend) {
        let payload = { name: name, isIntent: name.split(':').length === 1, response: this.serializeFrontend(frontend, name) };
        let request = { payload: payload, request: ""};
        return request;
    }
}

export const Database = new Databaseclass();
