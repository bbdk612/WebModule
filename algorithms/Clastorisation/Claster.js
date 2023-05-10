class KCluster {
  points;
  curX;
  curY;
  lastX;
  lastY;
  color;

  constructor(color) {
    this.color = color;
    this.points = [];
  }

  get curX() {
    return this.curX;
  }

  get curY() {
    return this.curY;
  }

  set curX(x) {
    this.curX = x;
  }

  set curY(y) {
    this.curY = y;
  }

  get color() {
    return this.color;
  }

  static InitCenter(k, clusters, points) {
    let size = points.length;
    let step = Math.floor(size / k);
    let stepper = 0;

    for (let i = 0; i < k; i++, stepper += step) {
      clusters[i].curX = points[stepper].x;
      clusters[i].curY = points[stepper].y;
      console.log(clusters[i].curX, clusters[i].curY);
    }
  }

  SetCenter() {
    let sumX = 0, sumY = 0;
    let i = 0;
    let size = this.points.length;

    for (; i < size; sumX += this.points[i].x, i++);
    i = 0;
    for (; i < size; sumY += this.points[i].y, i++);

    this.lastX = this.curX;
    this.lastY = this.curY;

    this.curX = Math.floor(sumX / size);
    this.curY = Math.floor(sumY / size);
  }

  Clear() {
    this.points = Array();
  }
  static ClearField(points) {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let point of points) {
      point.draw();
    }
    ctx.closePath();
  }
  static async Bind(k, clusters, points) {
    for (let i = 0; i < k; i++) {
      clusters[i].Clear();
    }

    let size = points.length;
    for (let i = 0; i < size; i++) {
      let min = Math.round(
        Math.sqrt(
          Math.pow(clusters[0].curX - points[i].x, 2) +
          Math.pow(clusters[0].curY - points[i].y, 2),
        ),
      );

      let minClIndex = 0;
      let cl = clusters[0];
      
      for (let j = 1; j < k; j++) {
        let tmp = Math.round(
          Math.sqrt(
            Math.pow(clusters[j].curX - points[i].x, 2) +
            Math.pow(clusters[j].curY - points[i].y, 2),
          ),
        );
        if (min > tmp) {
          min = tmp;
          minClIndex = j;
          cl = clusters[j];
        }
      }
      clusters[minClIndex].points.push(points[i]);
      points[i].color = clusters[minClIndex].color;
      Cluster.ClearField(points);
    }

    return clusters;
  }

  static Start(k, clusters, points) {
    Cluster.InitCenter(k, clusters, points);
    while (true) {
      let check = 0;
      Cluster.Bind(k, clusters, points);
      for (let i = 0; i < k; i++) {
        clusters[i].SetCenter();
      }
      for (let j = 0; j < k; j++) {
        if (
          clusters[j].curX === clusters[j].lastX &&
          clusters[j].curY === clusters[j].lastY
        ) {
          check++;
        }
      }
      if (check === k) {
        return;
      }
    }
  }
}
