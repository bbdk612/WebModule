const points = [];
let k;

const randInt = (max, min = 0) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};
const ctx = document.querySelector("canvas").getContext("2d");

const canvas = document.querySelector("canvas");

const createPoints = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    let point = new Point(x , y)
    points.push(point);
    point.draw();
}

canvas.addEventListener("click", (event) => {
    createPoints(canvas, event);
})

const createClusters = () => {
    const clusters = [];
    let k = parseInt(document.querySelector("#k").value)
    const colors = [];

    let i = 0;
    while (i < k) {
        let color = `rgb(${randInt(255)}, 
        ${randInt(255)}, 
        ${randInt(255)})`
        if (!colors.includes(color)) {
            colors.push(color);
            i++;
        }
    }
    for (let i = 0; i < k; i++) {
        let cluster = new Cluster(colors[i]);
        clusters.push(cluster);
    }

    Cluster.Start(k, clusters, points);
    // Cluster.ClearField(points);
}

const start = document.querySelector("#start");
start.addEventListener("click", createClusters);