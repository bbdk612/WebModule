class Point {
    x;
    y;
    color;
    index;

    constructor(x, y, index, color="black") {
        this.x = x;
        this.y = y;
        this.color = color;
        this.index = index;
    }

    set color(c) {
        this.color = c;
    }

    set index(i) {}

    get index() {
        return this.index;
    }

    draw() {
        const ctx = document.querySelector("canvas").getContext("2d");

        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    static distanceBetweenPoints(point1, point2) {
        return Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2));
    }
}
