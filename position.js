"use strict";
class Position2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getDifference(position) {
        return new Position2D(this.x - position.x, this.y - position.y);
    }
    add(x, y) {
        if (x instanceof Position2D) {
            this.x += x.x;
            this.y += x.y;
        }
        else {
            this.x += x;
            this.y += y;
        }
    }
    sub(x, y) {
        if (x instanceof Position2D) {
            this.x -= x.x;
            this.y -= x.y;
        }
        else {
            this.x -= x;
            this.y -= y;
        }
    }
    get norm() {
        return this.x ** 2 + this.y ** 2;
    }
    get distance() {
        return this.norm ** 0.5;
    }
    getNormForm(x, y) {
        if (x instanceof Position2D)
            return (this.x - x.x) ** 2 + (this.y - x.y);
        else
            return (this.x - x) ** 2 + (this.y - y);
    }
    getDistanceForm(x, y) {
        return this.getNormForm(x, y) ** 0.5;
    }
}
class Position3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(x, y, z) {
        if (x instanceof Position3D) {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        }
        else {
            this.x += x;
            this.y += y;
            this.z += z;
        }
    }
    sub(x, y, z) {
        if (x instanceof Position3D) {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        }
        else {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }
    }
}
