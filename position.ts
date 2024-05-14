class Position2D {
    constructor(
        public x: number,
        public y: number
    ) {}

    public getDifference(position: Position2D): Position2D {
        return new Position2D(
            this.x - position.x,
            this.y - position.y
        );
    }
    
    public add(x: number, y: number): void;
    public add(position: Position2D): void;
    public add(x: Position2D | number, y?: number) {
        if (x instanceof Position2D) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x += x;
            this.y += y!;
        }
    }
    
    public sub(x: number, y: number): void
    public sub(position: Position2D): void
    public sub(x: Position2D | number, y?: number) {
        if (x instanceof Position2D) {
            this.x -= x.x;
            this.y -= x.y;
        } else {
            this.x -= x;
            this.y -= y!;
        }
    }

    public get norm() {
        return this.x ** 2 + this.y ** 2;
    }

    public get distance() {
        return this.norm ** 0.5;
    }

    public getNormForm(x: number, y: number): number
    public getNormForm(position: Position2D): number
    public getNormForm(x: Position2D | number, y?: number) {
        if (x instanceof Position2D) return (this.x - x.x) ** 2 + (this.y - x.y);
        else return (this.x - x) ** 2 + (this.y - y!);
    }

    public getDistanceForm(x: number, y: number): number
    public getDistanceForm(position: Position2D): number
    public getDistanceForm(x: Position2D | number, y?: number) {
        return this.getNormForm(x as any, y as any) ** 0.5;
    }
}

class Position3D {
    constructor(
        public x: number,
        public y: number,
        public z: number
    ) {}

    public add(x: number, y: number, z: number): void;
    public add(position: Position3D): void;
    public add(x: Position3D | number, y?: number, z?: number) {
        if (x instanceof Position3D) {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        } else {
            this.x += x;
            this.y += y!;
            this.z += z!;
        }
    }

    public sub(x: number, y: number, z: number): void;
    public sub(position: Position3D): void;
    public sub(x: Position3D | number, y?: number, z?: number) {
        if (x instanceof Position3D) {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        } else {
            this.x -= x;
            this.y -= y!;
            this.z -= z!;
        }
    }
}