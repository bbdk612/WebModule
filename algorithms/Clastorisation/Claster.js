class Cluster {
  points;
  lastY;
  lastX;
  curX; 
  curY;

  static InitCenter(k, clusters, points) {
    let size = points.length;
    let step = Math.floor(size / k);
    let stepper = 0;

    for (let i = 0; i < k; i++, stepper += step) {
      clusters[i].curX = points[stepper].x;
      clusters[i].curY = points[stepper].y;
    }
  }

  SetCenter() {
    let sumX = 0, sumY = 0;
    let i = 0;
    let size = this.points.length;

    for (; i < size; sumX += this.points[i].x, i++ );
    i = 0;
    for (; i < size; sumY += this.points[i].y, i++ );

    this.lastX = this.curX;
    this.lastY = this.curY;

    this.curX = (sumX / size);
    this.curY = sumY / size;
  }

  Clear() {
    this.points = Array();
  }

  static Bind(k, clusters, points) {
    for (let i = 0; i < k; i++) {
      clusters[i].Clear();
    }

    let size = points.length;
    for (let i = 0; i < size; i++) {
      let min = Math.round(Math.sqrt(Math.pow(clusters[0].curX - points[i].x, 2) + Math.pow(clusters[0].curY - points[i].y, 2)));

      let cl = clusters[0];
      for (let j = 1;j < k; j++) {
        let tmp = Math.round(Math.sqrt(Math.pow(clusters[j].curX - points[i].x, 2) + Math.pow(clusters[j].curY - points[i].y, 2)));
        if (min > tmp) {
          min = tmp;
          cl = clusters[j];
        }
      }

      return clusters;
    }

  }

  Start(k, clusters, points) {
    Cluster.InitCenter(k, clusters, points);
    while (true) {
      let check = 0;
      Cluster.Bind(k, clusters, points);
      for (let i = 0; i < k; i++) {
        clusters[i].SetCenter();
      }
      for (let j = 0; j < k; j++) {
        if (clusters[j].curX === clusters[j].lastX && clusters[j].curY === clusters[j].lastY) {
          check++;
        }
      }
      if (check === k) {
        return;
      }

    }
  }
}
