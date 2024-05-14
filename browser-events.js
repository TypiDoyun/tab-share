"use strict";
class BrowserEventSignal {
    constructor() {
        this.listeners = [];
    }
}
class BrowserMoveEventSignal extends BrowserEventSignal {
    on(callback) {
        if (this.listeners.indexOf(callback) !== -1)
            return false;
        this.listeners.push(callback);
        return true;
    }
    delete(callback) {
        this.listeners.splice(this.listeners.indexOf(callback), 1);
    }
    fire(event) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}
class BrowserMoveEvent {
    constructor(oldPosition, newPosition) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }
}
var BrowserEvents;
(function (BrowserEvents) {
    BrowserEvents.move = new BrowserMoveEventSignal();
})(BrowserEvents || (BrowserEvents = {}));
let beforeLeft = window.screenLeft;
let beforeTop = window.screenTop;
setInterval(() => {
    if (beforeLeft === window.screenLeft && beforeTop === window.screenTop)
        return;
    const browserMoveEvent = new BrowserMoveEvent(new Position2D(beforeLeft, beforeTop), new Position2D(window.screenLeft, window.screenTop));
    beforeLeft = window.screenLeft;
    beforeTop = window.screenTop;
    BrowserEvents.move.fire(browserMoveEvent);
}, 1);
