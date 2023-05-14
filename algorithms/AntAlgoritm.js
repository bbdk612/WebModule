function wait(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

function distanceBetweenTwoPoints(first, second){
    return Math.sqrt(Math.pow(first[0] - second[0], 2) + Math.pow(first[1] - second[1], 2));
}

function allDistanceForPath(path_idx){
    let dist = 0
    for (let i = 0; i < path_idx.length - 1; ++i){
        dist += distanceBetweenTwoPoints(vertexes[path_idx[i]].slice(), vertexes[path_idx[i + 1]].slice());
    }
    dist += distanceBetweenTwoPoints(vertexes[path_idx[path_idx.length - 1]].slice(), vertexes[path_idx[0]].slice());
    return dist;
}

function addToPopulation(allWays, path) {
    if (!allWays.length) {
        allWays.push(path.slice());
    }
    else {
        let added = false
        for (let i = 0; i < allWays.length; ++i) {
            if (path[path.length - 1] < allWays[i][allWays[i].length - 1]) {
                allWays.splice(i, 0, path);
                added = true;
                break;
            }
        }
        if (!added) {
            allWays.push(path.slice());
        }
    }
}

document.getElementById("start").onclick = ACO;

async function ACO(){
    let SizeColony = document.getElementById("SizeColony").value;
    let alpha = document.getElementById("Alpha").value;
    let beta = document.getElementById("Beta").value;
    let evaporation = document.getElementById("Rho").value;
    let pheromones;
    let distance;
    let Q = 200;

    let vertexesLength = vertexes.length;
    let bestAnt = []; // [[vertexes], [idx_vertexes], length of path]

    let b = vertexes.slice(0);

    let qwe = [];
    for (let i = 0; i < vertexes.length; ++i){
        qwe.push(i);
    }

    bestAnt.push(b, qwe, allDistanceForPath(qwe));

    pheromones = [];
    distance = [];

    for (let i = 0; i < vertexesLength; ++i){
        pheromones[i] = new Array(vertexesLength);
        distance[i] = new Array(vertexesLength);
    }

    for (let i = 0; i < vertexes.length - 1; ++i){
        for (let j = i + 1; j < vertexes.length; ++j){
            distance[i][j] = Q / distanceBetweenTwoPoints(vertexes[i].slice(), vertexes[j].slice());
            pheromones[i][j] = 0.2;
        }
    }


    let end = vertexesLength * 2;

    for (let generation = 0; generation < SizeColony; ++generation){
        if (end === 0){
            drawFinishPath(bestAnt[0], "rgb(142,250,142)");
            break;
        }

        let ways = [];
        let path = [];
        let path_idx = [];

        for (let ant = 0; ant < vertexes.length; ++ant){
            path = [];
            path_idx = [];

            let startVertex_idx = ant;
            let startVertex = vertexes[startVertex_idx].slice();

            path.push(startVertex);
            path_idx.push(startVertex_idx);

            while (path.length !== vertexes.length){
                let sumOfDesires = 0;

                let p = [];
                for (let j = 0; j < vertexes.length; ++j) {
                    if (path_idx.indexOf(j) !== -1){
                        continue;
                    }
                    let min = Math.min(startVertex_idx, j);
                    let max = Math.max(startVertex_idx, j);
                    let desire = Math.pow(pheromones[min][max], alpha) * Math.pow(distance[min][max], beta);
                    p.push([j,desire]);
                    sumOfDesires += desire;
                }

                for (let i = 0; i < p.length; ++i){
                    p[i][1] /= sumOfDesires;
                }

                for (let j = 1; j < p.length; ++j){
                    p[j][1] += p[j - 1][1];
                }

                let rand = Math.random()
                let choice
                for (let i = 0; i < p.length; ++i){
                    if (rand < p[i][1]){
                        choice = p[i][0];
                        break;
                    }
                }
                startVertex_idx = choice;

                startVertex = vertexes[startVertex_idx].slice();
                path.push(startVertex.slice());
                path_idx.push(startVertex_idx);
            }
            ways.push([path.slice(), path_idx.slice(), allDistanceForPath(path_idx)])
        }

        ways.sort((function (a, b) { return a[2] - b[2]}));

        for (let i = 0; i < vertexesLength - 1; ++i){
            for (let j = i + 1; j < vertexesLength; ++j){
                pheromones[i][j] *= evaporation;
            }
        }

        for (let i = 0; i < ways.length; ++i){
            let idx_path = ways[i][1].slice();
            let lenOfPath = ways[i][2]
            for (let j = 0; j < vertexesLength - 1; ++j){
                let min = Math.min(idx_path[j], idx_path[j + 1]);
                let max = Math.max(idx_path[j], idx_path[j + 1]);
                pheromones[min][max] += Q / lenOfPath;
            }
        }

        let newBestAnt = ways[0].slice();

        if (newBestAnt[2] < bestAnt[2]){
            drawTheLines(bestAnt[0], newBestAnt[0]);
            bestAnt = newBestAnt.slice();
            redrawVertexes();
            end = vertexesLength * 2;
        }

        end -= 1;
        console.log(generation)
        await wait(100);
    }

    console.log("success!!!")

}