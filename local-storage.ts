namespace LocalStorage {
    export const keys = {
        tabs: "screen-share:tabs",
        idCounter: "screen-share:id-counter"
    };

    export const getTabs = () => {
        return window.localStorage.getItem(keys.tabs) ?? "[]"
    }

    export const setTabs = (tabs: Tab[]) => {
        return window.localStorage.setItem(keys.tabs, JSON.stringify(tabs));
    }

    export const getIdCounter = () => {
        return +(localStorage.getItem(keys.idCounter) ?? 0)
    }

    export const setIdCounter = (value: number) => {
        localStorage.setItem(keys.idCounter, `${value}`);
    }
}
