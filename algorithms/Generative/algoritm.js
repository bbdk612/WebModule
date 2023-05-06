generetiveAlgoritm(){
    let numberOfIterations;
    let individualsList;
    let individualsGenes;
    let pointsList;
    let individualsPathValue;
    //setting start
    for (let i = 0; i<individualsList.length; i++){
        let randomPointList=pointsList;
        for (let j = 0; j < pointList;j++){
            //TODO: generate random point of randomPointList
            //TODO: delete generated point from randomPointList
        }
    }
    //algoritm 
    for (let tmp = 0; tmp<numberOfIterations;tmp++){
        for (let i = 0; i<individualsList.length; i++){
            for (let j = 0; j < individualsGenes.length-1;j++){
                individualsPathValue[i]= individualsPathValue[i]+approachToEnd(individualsGenes[j],individualsGenes[j+1]);//approachToEnd from individualsGenes[j](begin) to individualsGenes[j+1](end)
            }
            individualsPathValue[i]= individualsPathValue[i]+approachToEnd(individualsGenes[0],individualsGenes[individualsGenes.length-1]);//approachToEnd from individualsGenes[0](start point of individual) to individualsGenes[individualsGenes.length-1](end point of individual)
        }
        //OPTIONAL: write path of best individual
        //calculation chance of individual "survive"
        //generate new individualList
    }
}