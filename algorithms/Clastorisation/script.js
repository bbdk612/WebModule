const points = [];
let k;

const canvas = document.querySelector("canvas")

canvas.width = document.querySelector(".container").clientWidth
canvas.height = document.querySelector(".container").clientWidth

document.querySelectorAll("input").forEach((input) => {
    input.value = ""
})

const hideFields = () => {
    document.querySelectorAll("fieldset").forEach((fieldset) => {
        fieldset.style.display = "none"
    })
}

const enableChooseButtons = () => {
    document.querySelectorAll(".chooseType > button").forEach((value) => {
        value.disabled = false
    })
}

hideFields()

const chooseType = (event) => {
    switch (event.target.classList[0]) {
        case "chooseKMeans":
            enableChooseButtons()
            event.target.disabled = true
            startKMeans.disabled = true
            hideFields()
            document.querySelector("fieldset.k-means").style.display = "flex"
            break
        case "chooseCC":
            enableChooseButtons()
            event.target.disabled = true
            startCC.disabled = true
            hideFields()
            document.querySelector("fieldset.connectedComponents").style.display = "flex"
            break
        case "chooseHierarchy":
            enableChooseButtons()
            event.target.disabled = true;
            document.querySelectorAll(".Hierarchy > button").forEach((button) => {
                button.disabled = true;
            })
            hideFields()
            document.querySelector("fieldset.Hierarchy").style.display = "flex"
            break
    }
}

document.querySelectorAll(".chooseType > button").forEach((button) => {
    button.addEventListener('click', chooseType)
})



const randInt = (max, min = 0) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};
const ctx = document.querySelector("canvas").getContext("2d");


let counter = 0;
const createPoints = (canvas, event) => {
    startKMeans.disabled = false
    startCC.disabled = false
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    document.querySelectorAll(".Hierarchy > button").forEach((button) => {
        button.disabled = false;
    })
    let point = new Point(x, y, counter)
    points.push(point);
    point.draw();
    counter++;
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
        let cluster = new KCluster(colors[i]);
        clusters.push(cluster);
    }

    KCluster.Start(k, clusters, points);
    // Cluster.ClearField(points);
}

const startKMeans = document.querySelector("#startKMeans");
startKMeans.disabled = true
startKMeans.addEventListener("click", createClusters);

const startCC = document.querySelector("#startCC")
startCC.disabled = true
startCC.addEventListener("click", () => {
    const r = parseInt(document.querySelector("#R").value)
    conCompClusters(points, r)
})

document.addEventListener("change", (event) => {
    if (parseInt(event.target.value) > points.length) {
        document.querySelectorAll(".Hierarchy > button").forEach((button) => {
            button.disabled = true;
        })
    }
})

document.querySelector(".closeNeighbour").addEventListener("click", () => {
    const canvas = document.querySelector("canvas")
    let k = parseInt(document.querySelector("#hK").value)
    let colors = []
    let color = `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`
    for (let  i = 0; i < 3;) {
        if (!colors.includes(color)) {
            colors.push(color)
            color = `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`
            i++
        }
    }
    const clusters = HierarchyClusters(points, 0.5, 0.5, 0, -0.5, k);
    for (let i = 0; i < clusters.length; i++) {
        let color = colors[i]
        for (let j = 0; j < clusters[i].length; j++) {
            points[clusters[i][j]].color = color;
        }
    }
    const ctx = document.querySelector("canvas").getContext("2d")
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let point of points) {
        point.draw()
    }
    ctx.closePath()
})

document.querySelector(".farNeighbour").addEventListener("click", () => {
    let k = parseInt(document.querySelector("#hK").value)
    let colors = []
    let color = `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`
    for (let  i = 0; i < 3;) {
        if (!colors.includes(color)) {
            colors.push(color)
            color = `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`
            i++
        }
    }
    const clusters = HierarchyClusters(points, 0.5, 0.5, 0, 0.5, k);
    for (let i = 0; i < clusters.length; i++) {
        let color = colors[i]
        for (let j = 0; j < clusters[i].length; j++) {
            points[clusters[i][j]].color = color;
        }
    }
    const ctx = document.querySelector("canvas").getContext("2d")
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let point of points) {
        point.draw()
    }
    ctx.closePath()
})