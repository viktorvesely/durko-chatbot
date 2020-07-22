class Request {
    constructor(value, sender_psid,  isMsg=true) {
        this.value = value;
        this.payload = null;
        this.isMsg = isMsg;
        this.sender_psid = sender_psid;
        this.generateRequest();
    }

    export() {
        return this.payload;
    }

    generateRequest() {
        let core = null;
        
        if (this.isMsg) {
            core = {
                "sender":{
                    "id": this.sender_psid
                },
                "message": {
                    "text": this.value
                }
            }
        } else {
            core = {
                "sender":{
                    "id": this.sender_psid
                },
                "postback": {
                    "payload": this.value
                }
            }
        }

        this.payload = {
            "object": "page",
            "entry": [
                {
                    "messaging": [
                        core
                    ]
                }
            ]
        }
    }
}

export default Request;