generetiveAlgoritm(){
    let numberOfIterations;
    let individualsList;
    let individualsGenes;
    let pointsList;
    //setting start
    for (let i = 0; i<individualsList.length; i++){
        individualsGenes[i][0]=pointsList[randInt(pointsList.length-1,0)];
        let choiseList=pointsList.length-2;
        for (let j = 1; j<pointsList.length;j++,choiseList--){
            individualsGenes[i][j] = randInt (choiseList,0);
        }
    }
    //algoritm 
    let individualsPathValue;
    for (let tmp = 0; tmp<numberOfIterations;tmp++){
        //calculation length of individual Path
        for (let i = 0; i<individualsList.length; i++){
            for (let j = 0; j < individualsGenes.length-1;j++){
                individualsPathValue[i]= individualsPathValue[i]+approachToEnd(individualsGenes[j],individualsGenes[j+1]);//approachToEnd from individualsGenes[j](begin) to individualsGenes[j+1](end)
            }
            individualsPathValue[i]= individualsPathValue[i]+approachToEnd(individualsGenes[0],individualsGenes[individualsGenes.length-1]);//approachToEnd from individualsGenes[0](start point of individual) to individualsGenes[individualsGenes.length-1](end point of individual)
        }
        //OPTIONAL: write path of best individual
        let bestIndividual;
        let bestIndividualPathValue=10000000000;
        for(let i=0;i<individualsList.length;i++){
            if(individualsPathValue[i]<bestIndividualPathValue){
                bestIndividual=i;
                bestIndividualPathValue=individualsPathValue[i];
            }
       }
        //calculation chance of individual "survive"
    let individualsChanceToSurvive;
    let individualSexList;
    let sumOfReciprocals;
    for (let i = 0;i < individualsList.length;i++){
        sumOfReciprocals+=(1/individualsPathValue[i]);
    }
    for (let i = 0;i < individualsList.length;i++){
        individualsChanceToSurvive[i]=((1/individualsPathValue[i])/sumOfReciprocals)
    }
    for(let i=0;i< Math.ceil(Math.sqrt(individualsList.length));i++){
        let individualToSex;
        for (let j = 1;j < individualsList.length;j++){
            let individualToSexChance=0;
            if (individualToSexChance<individualsChanceToSurvive[i]){
                individualToSex=j;
                individualToSexChance=individualsChanceToSurvive[i];
            }
        }
        individualsChanceToSurvive[individualToSex]=0;
        individualSexList.push(individualToSex);
    }
        //generate new individualList
    let childList;
        for(let i = 0;i < individualSexList.length;i++){
            if (childList.length < individualsList.length){ 
                for(let j = 0;j < individualSexList.length;j++){
                    let child;
                    if (individualSexList[i]!== individualSexList[j]){
                        let moneyFlip;
                        moneyFlip=randomint(2,1);
                        if (moneyFlip===1){
                            let separationLine=Math.floor(individualsGenes[individualSexList[i]]/2)
                            for(let k=0;k<separationLine;k++){
                                child[k]=individualsGenes[individualSexList[j]][k];
                            }
                            for(let k=separationLine+1;k<individualsGenes[individualSexList[i]].length;k++){
                                child[k]=individualsGenes[individualSexList[i]][k];
                            }
                        }
                        else{
                            let separationLine=Math.floor(individualsGenes[individualSexList[i]]/2)
                            for(let k=0;k<separationLine;k++){
                                child[k]=individualsGenes[individualSexList[i]][k];
                            }
                            for(let k=separationLine;k<individualsGenes[individualSexList[i]].length;k++){
                                child[k]=individualsGenes[individualSexList[j]][k];
                            }
                        }
                        if (childList.length<individualsList.length){
                            childList.push(child);
                        }
                        else{
                            break;
                        }
                    }
                }
            }
            else{
                break;
            }
        }
        individualsList=childList;
    }
    //create mutation on last individual
    let randomMutation=randInt(individualsGenes.individualsList-1,0);
    if(randomMutation===0){
        individualsGenes[individualsGenes.length-1][randomMutation]=randInt(pointsList.length-1,0);
    }
    else{
        individualsGenes[individualsGenes.length-1][randomMutation]=randInt(pointList.length-randomMutation,0);
    }
}