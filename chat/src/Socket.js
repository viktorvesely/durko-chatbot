import io from 'socket.io-client';

URL = "localhost:1337"

class Socket {
    constructor() {
        this._onMessage = null;
        this._noMessage = null;
        this.socket = io('');
    }

    onMessage(callback) {
        this._onMessage = callback;
        this.socket.on('new_message', callback);
        return this;
    }

    noMessage(callback) {
        this._noMessage = callback;
        this.socket.on("no_messages", callback);
        return this;
    }

    identify(sender_psid) {
        this.socket.emit("identify", sender_psid);
    }
    
}

export default Socket;