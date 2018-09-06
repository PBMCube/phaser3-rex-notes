'use strict'

// https://www.redblobgames.com/grids/hexagons/

import Offset from './Offset.js';
import Width from './Width.js';
import Height from './Height.js';

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

class Hexagon extends Polygon {
    constructor(x, y, size, type) {
        super();
        if (typeof (type) === 'string') {
            type = ORIENTATIONTYPE[type]
        }
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            size = GetValue(config, 'size', 0);
            type = GetValue(config, 'type', 0);
        }
        var points = this.points;
        for (var i = 0; i < 6; i++) {
            points.push({});
        }
        this.setTo(x, y, size, type);
    }

    // override
    setTo(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;

        var points = this.points,
            point;
        var angleOffset = (type === 0) ? 0 : -30;
        var angleDeg, angleRad;
        for (var i = 0; i < 6; i++) {
            angleDeg = (60 * i) + angleOffset;
            angleRad = DegToRad(angleDeg);
            point = points[i];
            point.x = x + size * Math.cos(angleRad);
            point.y = y + size * Math.sin(angleRad);
        }
        this.calculateArea();
        this.width = Width(this);
        this.height = Height(this);
        return this;
    }

    get left() {
        return this.x - (this.width / 2);
    }

    set left(value) {
        var offsetX = value - this.left;
        Offset(this, offsetX, 0);
    }

    get right() {
        return this.x + (this.width / 2);
    }

    set right(value) {
        var offsetX = value - this.right;
        Offset(this, offsetX, 0);
    }
    get top() {
        return this.y - (this.height / 2);
    }

    set top(value) {
        var offsetY = value - this.top;
        Offset(this, 0, offsetY);
    }

    get bottom() {
        return this.y + (this.height / 2);
    }

    set bottom(value) {
        var offsetY = value - this.bottom;
        Offset(this, 0, offsetY);
    }
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'vertical': 0,
    'pointy': 1,
    'horizontal': 1
};

export default Hexagon;