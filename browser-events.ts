type EventCallback<MainEvent> = (event: MainEvent) => void;

abstract class BrowserEventSignal<MainEvent> {
    protected readonly listeners: EventCallback<MainEvent>[] = [];

    public abstract on(callback: EventCallback<MainEvent>): void;
    public abstract delete(callback: EventCallback<MainEvent>): void;
    public abstract fire(event: MainEvent): void;
}

class BrowserMoveEventSignal<MainEvent> extends BrowserEventSignal<MainEvent> {
    public on(callback: EventCallback<MainEvent>) {
        if (this.listeners.indexOf(callback) !== -1) return false;

        this.listeners.push(callback);

        return true;
    }

    public delete(callback: EventCallback<MainEvent>) {
        this.listeners.splice(this.listeners.indexOf(callback), 1);
    }

    public fire(event: MainEvent) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}

class BrowserMoveEvent {
    constructor(
        public oldPosition: Position2D,
        public newPosition: Position2D
    ) {}
}

namespace BrowserEvents {
    export const move = new BrowserMoveEventSignal<BrowserMoveEvent>();
}

let beforeLeft = window.screenLeft;
let beforeTop = window.screenTop;

setInterval(() => {
    if (beforeLeft === window.screenLeft && beforeTop === window.screenTop) return;
    
    const browserMoveEvent = new BrowserMoveEvent(
        new Position2D(beforeLeft, beforeTop),
        new Position2D(window.screenLeft, window.screenTop),
    );

    beforeLeft = window.screenLeft;
    beforeTop = window.screenTop;

    BrowserEvents.move.fire(browserMoveEvent);
}, 1);