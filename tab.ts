class Tab {

    constructor(
        public x: number = window.screenLeft,
        public y: number = window.screenTop,
        public width: number = window.innerWidth,
        public height: number = window.innerHeight,
        public id: number = Tab.uniqueId
    ) {}


    public static get uniqueId(): number {
        const idCounter = LocalStorage.getIdCounter();
        LocalStorage.setIdCounter(idCounter + 1);

        return idCounter;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}