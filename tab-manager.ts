class TabManager {
    public tabs: Tab[] = [];
    private readonly mainTab: Tab = new Tab();

    private onMove: EventCallback<BrowserMoveEvent> = ({ oldPosition, newPosition }) => {
        this.update();
    }
    private onResize = () => {
        this.update();
    };
    private onBeforeUnload = () => {
        this.delete();
    }
    private onVisibilityChange = () => {
        this.update();
    }

    constructor() {
        this.initialize();


        BrowserEvents.move.on(this.onMove);
        addEventListener("resize", this.onResize)
        addEventListener("beforeunload", this.onBeforeUnload);
        addEventListener("visibilitychange", this.onVisibilityChange);
    }

    public getTabs(): Tab[] {
        const tabJsons = LocalStorage.getTabs();
        const tabs = JSON.parse(tabJsons).map((tabJson: any) => new Tab(
            tabJson.x,
            tabJson.y,
            tabJson.width,
            tabJson.height,
            tabJson.id
        )).filter((tab: Tab) => tab.id !== this.mainTab.id);

        return tabs;
    }
    
    private initialize() {
        this.tabs.push(this.mainTab);
        this.fetchTabs();
        this.saveTabs();
    }

    public delete() {
        this.fetchTabs();
        this.tabs = [ ...this.tabs.filter(tab => tab.id !== this.mainTab.id) ];
        this.saveTabs();
        removeEventListener("resize", this.onResize);
        removeEventListener("beforeunload", this.onBeforeUnload);
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
    }
    
    public fetchTabs() {
        this.tabs = [ this.tabs.find(tab => tab.id === this.mainTab.id)!, ...this.getTabs() ];
    }

    public saveTabs() {
        LocalStorage.setTabs(this.tabs);
    }

    public getMainTabIndex() {
        const mainTabIndex = this.tabs.findIndex(tab => tab.id === this.mainTab.id);
        
        return mainTabIndex;
    }
    
    public update() {
        const mainTabIndex = this.getMainTabIndex();
        this.tabs[mainTabIndex].x = window.screenLeft;
        this.tabs[mainTabIndex].y = window.screenTop;
        this.tabs[mainTabIndex].width = window.innerWidth;
        this.tabs[mainTabIndex].height = window.innerHeight;

        this.fetchTabs();
        this.saveTabs();
    }
}