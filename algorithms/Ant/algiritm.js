AStarAlgoritm() {
    let currentAntcoordinate= Array();
    let tabuList;//matrix for every ant
    let pointsValue;
    let foodfoundChecker;
    let nodesAround;
    //setting start parameters
    for (let i = 0; i < this.size * this.size; i++) {
        pointsValue.push(0);
    }
    for (let i = 0; i < antsQuantity; i++) {
        currentAntcoordinates = this.start;
        foodfoundChecker = true;
    }
    //algoritm
    //TODO: make a delay between iterations
    while(antsQuantity>0){    
        for (let i = 0; i < antsQuantity; i++){
            if (foodfoundChecker){
                tabuList.push(currentAntcoordinate[i]);
                nodesAround = lookaround(currentAntcoordinate[i]);
                for (let j = 0; j < nodesAround.length;j++){
                    if (nodesAround[j]===finish){
                        foodfoundChecker=false;
                    }
                }
                //TODO: make random point of nodesarond with pheromones priority;
            }
        }
    }
}