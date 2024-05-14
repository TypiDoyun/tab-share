const tabElements = new Map<number, HTMLDivElement>();
const tabManager = new TabManager();

const updateView = () => {
    const tabs = tabManager.getTabs();
    const mainTab = tabManager.tabs[tabManager.getMainTabIndex()];

    for (const tab of tabs) {
        const left = tab.x - mainTab.x + tab.width / 2 - 100;
        const top = tab.y - mainTab.y + tab.height / 2 - 50;
        if (tabElements.has(tab.id)) {
            const element = tabElements.get(tab.id)!;
            
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
        } else {
            const element = document.createElement("div");
            const child = document.createElement("span");
            child.innerText = "Hello World";
            element.appendChild(child);
            element.style.position = "absolute";
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
            tabElements.set(tab.id, document.body.appendChild(element));
        }
    }

    tabElements.forEach((_, id) => {
        if (tabs.some(tab => tab.id === id)) return;
        
        _.remove();

        tabElements.delete(id);
    });


}

BrowserEvents.move.on(updateView);
addEventListener("visibilitychange", updateView);