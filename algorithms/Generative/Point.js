export class Point {
  x;
  y; 
  color;

  set color(c) {
    this.color = c;
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
    return Math.sqrt( Math.pow( (point1.x - point2.x), 2 ) + Math.pow( (point1.y - point2.y), 2 ) );
  }
}
