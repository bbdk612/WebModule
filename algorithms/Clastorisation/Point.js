class Point {
    x;
    y;
    radius;
    color;

    constructor(X, Y, radius = 10, clr = "black") {
        this.x = X;
        this.y = Y;
        this.radius = radius;
        this.color = clr;
    }

    setColor(colorName, stroke = false, ctx) {
        this.color = colorName;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        if (stroke) {
            ctx.strokeStyle = "black";
            ctx.stroke()
        }
        ctx.closePath();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}