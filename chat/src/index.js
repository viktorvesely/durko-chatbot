
import Vue from 'vue'
import BotUI from 'botui'
import './main.css'
import io from 'socket.io-client';
import MessageRequest from './MsgReq.js'
import axios from 'axios'


const sender_psid = "testing_sender_psid_123";
var currentMsgIndex = null;

var chat = new BotUI("durko-chat", {
    vue: Vue
});

const socket = io('localhost:1337');
socket.on("new_message", () => {
    axios.post("/pendings", {sender_psid: sender_psid})
    .then(response => {
        let data = response.data;
        let msgs = data.msgs;
        if (!data.update) return;
        let button = false;

        msgs.forEach(msg => {
            if (currentMsgIndex !== null) {
                if (msg.type === "buttons") {
                    button = true;
                    let btn = msg.options.btns[0];
                    chat.message.update(currentMsgIndex, {
                        loading: false,
                        content: msg.value
                    });
                    chat.action.button({
                        action: [
                            {
                                text: btn.title,
                                value: btn.url 
                            }
                        ]
                    }).then(res => {
                        window.open(res.value);
                    });
                    return;
                }


                chat.message.update(currentMsgIndex, {
                    loading: false,
                    content: msg.value
                });
                currentMsgIndex = null;
            } else {
                if (msg.type === "buttons") {
                    button = true;
                    let btn = msg.options.btns[0];
                    chat.message.add({
                        content: msg.value,
                        human: false
                    });
                    chat.action.button({
                        human: false,
                        action: [
                            {
                                text: btn.title,
                                value: btn.url 
                            },
                            {
                                text: "Nie diky",
                                value: "none"
                            }
                        ]
                    }).then(res => {
                        readQuery();
                        if (res.value === "none") return;
                        window.open(res.value);
                    });
                    return;
                }
                chat.message.add({
                    content: msg.value,
                    human: false  
                });
            }
        });
        
        if (!button) {
            readQuery();
        }

    })
    .catch(function (error) {
        console.error(error);
    });
});

socket.emit("identify", sender_psid);

function send_query(msg) {
    axios.post('/webhook', new MessageRequest(msg).export())
      .then(function (response) {
          // TODO print an error msg if something went wrong
      })
      .catch(function (error) {
        console.error(error);
      });
}

function setBusy() {
    return chat.message.add({
        loading: true,
        human: false
    });
}

function readQuery() {
    chat.action.text({
        action: {
            placeholder: 'Co chces?!'
        }
    }).then(function (res) {
        setBusy().then(index => {
            currentMsgIndex = index;;
            send_query(res.value);
        });
    });
}

chat.message.add({
    content: 'Helo babe!'
  }).then(function () {
    readQuery();
  });