"use strict";
class Tab {
    constructor(x = window.screenLeft, y = window.screenTop, width = window.innerWidth, height = window.innerHeight, id = Tab.uniqueId) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    }
    static get uniqueId() {
        const idCounter = LocalStorage.getIdCounter();
        LocalStorage.setIdCounter(idCounter + 1);
        return idCounter;
    }
    toString() {
        return JSON.stringify(this);
    }
}
