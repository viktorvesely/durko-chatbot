class Databaseclass {
    constructor() {
        
    }

    saveResponse(intent, response) {
        return new Promise((resolve, reject) => {
            let sendResponse = this.backendResponse(intent, response);
            localStorage.setItem(intent , sendResponse);
            resolve();
        });
    }
    
    savePostback(name, postback) {
        return new Promise((resolve, reject) => {
            let sendResponse = this.backendPostback(name, postback);
            localStorage.setItem(name, sendResponse);
            resolve();
        });
    }

    formKey(intent, name) {
        return `${intent}:${name}`;
    }

    loadResponse(intent) {
        return new Promise((resolve, reject) => {
            let backendResponse = localStorage.getItem(intent);
            if (backendResponse === null) {
                resolve([]);
                return;
            }
            let response = this.frontendResponse(backendResponse);
            resolve(response);
        });
    }

    loadPostback(name) {
        return new Promise((resolve, reject) => {
            let key = name;
            let backendPostback = localStorage.getItem(key);
            if (backendResponse == null) {
                resolve([]);
                return;
            }
            let postback = this.frontendPostback(backendPostback);
            resolve(postback);
        });
    }

    backendPostback(name, frontendPostback) {
        let key = name;
        return JSON.stringify({key: key, response: frontendPostback});
    }

    frontendPostback(backendPostback) {
        return JSON.parse(backendPostback).response;
    }

    
    backendResponse(intent, frontendResponse) {
        // TODO implement this for server communication
        return JSON.stringify({ intent: intent, response: frontendResponse});
    }

    frontendResponse(backendResponse) {
        // TODO implement this for server communication
        return JSON.parse(backendResponse).response;
    }
}

export const Database = new Databaseclass();
