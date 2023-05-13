class Graph {
  points;
  center;
  color;

  set center(point) {
    this.center = point
  }
  
  get center() {
    return this.center
  }

  addPoint(point) {
    this.points.push(point)
    point.color = this.color
  }
  
  get points() {
    return this.points
  }
  
  removePoint(point) {
    let i = 0
    for (; i < points.length; i++) {
      if (points[i].x === point.x && points[i].y === point.y) {
        break
      }
    }
    
    points.splice(i, 1)
  }
  
  constructor(center, color) {
    this.center = center
    this.color = color
    this.points = []
    this.points.push(center)
    center.color = color
  }
}
