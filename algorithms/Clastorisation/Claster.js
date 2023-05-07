class Cluster {
  points;
  lastCenter;
  curCenter;
  color;
  constructor(col) {
    this.color = col;
  }
  static InitCenter(k, clusters, points) {
    let size = points.length;
    let step = Math.floor(size / k);
    let stepper = 0;

    for (let i = 0; i < k; i++, stepper += step) {
      clusters[i].curCenter = new Point(points[stepper].x, points[stepper].y);
      // clusters[i].curCenter.setColor(clusters[i].color, true);
    }
  }

  SetCenter() {
    let sumX = 0, sumY = 0;
    let i = 0;
    let size = this.points.length;

    for (; i < size; sumX += this.points[i].x, i++ );
    i = 0;
    for (; i < size; sumY += this.points[i].y, i++ );

    this.lastCenter = this.curCenter;

    this.curCenter = new Point((sumX / size), sumY / size);
  }

  Clear() {
    this.points = Array();
  }

  static Bind(k, clusters, points, ctx) {
    for (let i = 0; i < k; i++) {
      clusters[i].Clear();
    }

    let size = points.length;
    for (let i = 0; i < size; i++) {
      let min = Math.round(Math.sqrt(Math.pow(clusters[0].curCenter.x - points[i].x, 2) + Math.pow(clusters[0].curCenter.y - points[i].y, 2)));
      
      let cl = clusters[0];
      let clInd = 0;
      for (let j = 1;j < k; j++) {
        let tmp = Math.round(Math.sqrt(Math.pow(clusters[j].curCenter.x - points[i].x, 2) + Math.pow(clusters[j].curCenter.y - points[i].y, 2)));
        if (min > tmp) {
          min = tmp;
          clInd = j;
          cl = clusters[j];
        }
      }
      clusters[clInd].points.push(points[i]);
      points[i].setColor(clusters[clInd].color, ctx);
    }

    return clusters;
  }

  static Start(k, clusters, points, ctx) {
    Cluster.InitCenter(k, clusters, points, ctx);
    while (true) {
      let check = 0;
      Cluster.Bind(k, clusters, points, ctx);
      for (let i = 0; i < k; i++) {
        clusters[i].SetCenter();
      }
      for (let j = 0; j < k; j++) {
        if ((clusters[j].curCenter.x === clusters[j].lastCenter.x) && (clusters[j].curCenter.y === clusters[j].lastCenter.y)) {
          check++;
        }
      }
      if (check === k) {
        return;
      }

    }
  }
}
