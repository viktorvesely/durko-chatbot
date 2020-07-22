
import MessageRequest from './MsgReq.js'
import axios from 'axios'
import Socket from './Socket.js'
import Chat from './Chat.js'

import './main.css'

const sender_psid = "testing_sender_psid_123";
const socket = new Socket();
const chat = new Chat("durko-chat", send_query);


function send_query(msg) {
    axios.post('/webhook', new MessageRequest(msg).export())
      .then(function (response) {
          // TODO print an error msg if something went wrong
      })
      .catch(function (error) {
        console.error(error);
      });
}

function getPendings() {
    return new Promise((resolve, reject) => {
        axios.post("/pendings", {sender_psid: sender_psid})
        .then(response => {
            let data = response.data;
            let msgs = data.msgs;
            resolve(msgs);
        });
    });
}

function handlePostBacks(value) {
    console.log(value);
}

function handleMsg(msg) {
    switch(msg.type) {
        case "buttons":
            let btns = msg.options.btns;
            let first = btns[0];
            chat.text(msg.value);
            if (first.type === "web_url") {
                chat.url(btns);
            } else if (first.type === "postback") {
                chat.quicks(btns, handlePostBacks);
            } else {
                throw new Error("Could not identify btns type. Got:" + first.type.toString());
            }
            break;
        case "wait":
            chat.wait(msg.value);
            break;
        case "text":
            chat.text(msg.value);
            break;
        default:
            throw new Error("Could not identify msg type. Got:" + msg.type.toString());
    };
}

function onMessage() {
    getPendings().then(msgs => {
        msgs.forEach(msg => {
            handleMsg(msg);
        });
    });
}

function noMessage() {
    chat.readQuery();
}

socket.onMessage(onMessage).noMessage(noMessage);


function init() {
    socket.identify(sender_psid);
}

init();