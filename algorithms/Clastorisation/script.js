let points = [];
let ctx = document.querySelector("canvas").getContext("2d");

function randInt(max, min) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function createPoints(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let point = new Point(x, y);
    point.draw(ctx);
    points.push(point);
}

function createClusters(canvas) {
    let k = parseInt(document.querySelector("#clustersNumber").value);
    let colors = [];
    let i = 0;
    while (i < k) {
        let color = `rgb(${randInt(255, 0)}, ${randInt(255, 0)}, ${randInt(255, 0)})`
        if (!colors.includes(color)) {
            i++;
            colors.push(color);
        }
    }
    let clusters = [];
    for (let i = 0; i < k; i++) {
        let cluster = new Cluster(colors[i]);
        clusters.push(cluster);
    }

    Cluster.Start(k, clusters, points, ctx);
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('click', function(e) {
    createPoints(canvas, e)
})

const startButton = document.querySelector("#start");
startButton.addEventListener("click", createClusters);

