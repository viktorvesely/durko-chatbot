import Vue from 'vue'
import BotUI from 'botui'


const TIMEOUT_LOADING = 10 * 1000; // miliseconds
const NO_ACTION = "DO__NOTHING";

class Chat {
    constructor(id, onQuery) {
        this.chat = new BotUI(id, {
            vue: Vue
        });
        this.currentMsgIndex = null;
        this.loading = false;
        this._timeout = null;
        this.tasks = [];
        this.executing = false;
        this.onQuery = onQuery;
    }

    timeout() {
        if (!this.loading) {
            console.error("Timeout was called but loading was false, there is an ongoing logical fallacy in the code!");
            return;
        }

        this.text("Bohužiaľ Ďurko nebol možný odpovedať, možno spí")
        .wait(500)
        .text("Kontaktuj môjho developera (HR odelenie)");

        this._timeout = null;
        this.loading = false;
    }

    loading() {
        if (this.loading) return;

        this.loading = true;

        const that = this;
        this._timeout = window.setTimeout(() => { that.timeout.call(that); }, TIMEOUT_LOADING);

        this.addTask(() => {
            return new Promise(resolve => {
                this.chat.message.add({
                    loading: true,
                    human: false
                }).then(index => {
                    this.currentMsgIndex = index;
                    resolve();
                });
            });
        })
    }

    execute() {
        this.executing = true;
        if (this.tasks.length === 0) {
            this.executing = false;
            this.readQuery();
            return;
        }
        let task = this.tasks.splice(0, 1)[0];
        task.func.call(this, task.arg).then(() => {
            this.execute();
        });
    }

    addTask(task, arg = undefined) {
        this.tasks.push({ func: task, arg: arg });
        if (!this.executing) this.execute();
    }

    text(msg, human = false) {
        if (this.loading) {
            window.clearTimeout(this._timeout);
            this.addTask(() => {
                return new Promise(resolve => {
                    chat.message.update(this.currentMsgIndex, {
                        loading: false,
                        content: msg,
                        human: human
                    }).then(() => { resolve(); });
                });
            });
            this.loading = false;
            return this;
        }

        this.addTask(this.chat.message.add, {
            content: msg,
            human: human
        });
        return this;
    }

    readQuery() {
        this.chat.action.text({
            action: {
                placeholder: "Vyskúšaj ma"
            }
        }).then(res => {
            this.onQuery(res.value);
        });
        return this;
    }

    noAction(actions) {
        actions.push({
            text: "Zrušiť",
            value: NO_ACTION
        });
    }

    url(btns) {
        this.addTask(() => {
            return new Promise(resolve => {
                let actions = [];

                btns.forEach(btn => {
                    actions.push({
                        text: btn.title,
                        value: btn.url
                    });
                });

                this.noAction(actions);

                this.chat.action.button({
                    human: false,
                    action: actions
                }).then(res => {
                    let action = res.value;
                    if (action !== NO_ACTION) window.open(action);
                    resolve();
                });
            });
        });
        return this;
    }

    quicks(btns, sendPayload) {
        this.addTask(() => {
            return new Promise(resolve => {
                let actions = [];

                btns.forEach(btn => {
                    actions.push({
                        text: btn.title,
                        value: btn.payload
                    });
                });

                this.chat.action.button({
                    human: false,
                    action: actions
                }).then(res => {
                    sendPayload(res.value);
                    resolve();
                });
            });
        });
        return this;
    }


    wait(value) {
        this.addTask(() => {
            return new Promise(resolve => {
                window.setTimeout(() => {
                    resolve();
                }, value);
            });
        });
        return this;
    }
}


export default Chat;