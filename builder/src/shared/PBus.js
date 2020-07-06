import { Bus } from './Bus.js'

class PBus {
    constructor(name) {
        this.name = name;
    }

    translate(eventName) {
        return `${eventName}:${this.name}`;
    }

    $on(eventName, handler) {
        let translated = this.translate(eventName);
        //console.log(`Listening ${translated}`); 
        Bus.$on(translated, handler);
    }

    $emit(eventName, arg) {
        let translated = this.translate(eventName);
        //console.log(`Emiting ${translated}`);
        Bus.$emit(translated, arg);
    }
}

export default PBus;