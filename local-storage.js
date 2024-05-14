"use strict";
var LocalStorage;
(function (LocalStorage) {
    LocalStorage.keys = {
        tabs: "screen-share:tabs",
        idCounter: "screen-share:id-counter"
    };
    LocalStorage.getTabs = () => {
        var _a;
        return (_a = window.localStorage.getItem(LocalStorage.keys.tabs)) !== null && _a !== void 0 ? _a : "[]";
    };
    LocalStorage.setTabs = (tabs) => {
        return window.localStorage.setItem(LocalStorage.keys.tabs, JSON.stringify(tabs));
    };
    LocalStorage.getIdCounter = () => {
        var _a;
        return +((_a = localStorage.getItem(LocalStorage.keys.idCounter)) !== null && _a !== void 0 ? _a : 0);
    };
    LocalStorage.setIdCounter = (value) => {
        localStorage.setItem(LocalStorage.keys.idCounter, `${value}`);
    };
})(LocalStorage || (LocalStorage = {}));
