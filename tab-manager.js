"use strict";
class TabManager {
    constructor() {
        this.tabs = [];
        this.mainTab = new Tab();
        this.onMove = ({ oldPosition, newPosition }) => {
            this.update();
        };
        this.onResize = () => {
            this.update();
        };
        this.onBeforeUnload = () => {
            this.delete();
        };
        this.onVisibilityChange = () => {
            this.update();
        };
        this.initialize();
        BrowserEvents.move.on(this.onMove);
        addEventListener("resize", this.onResize);
        addEventListener("beforeunload", this.onBeforeUnload);
        addEventListener("visibilitychange", this.onVisibilityChange);
    }
    getTabs() {
        const tabJsons = LocalStorage.getTabs();
        const tabs = JSON.parse(tabJsons).map((tabJson) => new Tab(tabJson.x, tabJson.y, tabJson.width, tabJson.height, tabJson.id)).filter((tab) => tab.id !== this.mainTab.id);
        return tabs;
    }
    initialize() {
        this.tabs.push(this.mainTab);
        this.fetchTabs();
        this.saveTabs();
    }
    delete() {
        this.fetchTabs();
        this.tabs = [...this.tabs.filter(tab => tab.id !== this.mainTab.id)];
        this.saveTabs();
        removeEventListener("resize", this.onResize);
        removeEventListener("beforeunload", this.onBeforeUnload);
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
    }
    fetchTabs() {
        this.tabs = [this.tabs.find(tab => tab.id === this.mainTab.id), ...this.getTabs()];
    }
    saveTabs() {
        LocalStorage.setTabs(this.tabs);
    }
    getMainTabIndex() {
        const mainTabIndex = this.tabs.findIndex(tab => tab.id === this.mainTab.id);
        return mainTabIndex;
    }
    update() {
        const mainTabIndex = this.getMainTabIndex();
        this.tabs[mainTabIndex].x = window.screenLeft;
        this.tabs[mainTabIndex].y = window.screenTop;
        this.tabs[mainTabIndex].width = window.innerWidth;
        this.tabs[mainTabIndex].height = window.innerHeight;
        this.fetchTabs();
        this.saveTabs();
    }
}
