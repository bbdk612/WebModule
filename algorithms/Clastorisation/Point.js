class Point {
  x;
  y;
  color;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "black";
  }

  set color(colorName) {
    this.color = colorName;
  }

  get x() {
    return this.x;
  }

  get y() {
    return this.y;
  }
  static drawLine(point1, point2) {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
    ctx.closePath();
  }

  draw() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  static distanceBetween(point1, point2) {
    return Math.sqrt( Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) )
  }

  static ClearField(points) {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let point in points) {
      point.draw();
    }
    ctx.closePath();
  }
}
