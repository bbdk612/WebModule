const randInt = (max, min = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};



const findPointIndex = (arr, point) => {
  let index = 0;
  for (; index < arr.length; index++) {
    if (arr[index].x === point.x && arr[index].y === point.y) {
      return index;
    }
  }
}
const findPointbyIndex = (arr, index) => {
  let i = 0;
  for (; i < arr.length; i++) {
    if (arr[i].index === index) {
      return i;
    }
  }
}

const generativeAlgorithm = ( pointsList, numberOfIterations, numberOfIndividuals ) => {
  let individualsGenes = [];
  let bestWay = [];
  let bestIndividualPathValue;
  //setting start
  for (let i = 0; i < numberOfIndividuals; i++) {
    let individualsGenesLine = [];
    individualsGenesLine.push(randInt(pointsList.length - 1, 0));
    for (let choiseList = pointsList.length - 2; choiseList >= 0; choiseList--) {
      individualsGenesLine.push(randInt(choiseList, 0));
    }
    individualsGenes.push(individualsGenesLine);
  }
  //algorithm
  for (let tmp = 0; tmp < numberOfIterations; tmp++) {
    //calculation length of individual Path
    let individualsPathValue = [];
    for (let i = 0; i < numberOfIndividuals; i++) {
      individualsPathValue.push(0)
    }
    for (let i = 0; i < numberOfIndividuals; i++) {
      let checkList = [...pointsList];
      let individualPath = [];
      individualPath.push(checkList[individualsGenes[i][0]].index); // TODO: What is j
      // let index = findPointIndex(checkList, pointsList[individualsGenes[i][0]]);
      checkList.splice(individualsGenes[i][0], 1);
      for (let j = 1; j < individualsGenes[i].length; j++) {
        individualPath.push(checkList[individualsGenes[i][j]].index);
        // let index = findPointIndex(checkList, pointsList[individualsGenes[i][j]]);
        checkList.splice(individualsGenes[i][j], 1);
      }

      for (let j = 1; j < individualPath.length - 1; j++) {
        individualsPathValue[i] += Point.distanceBetweenPoints(
          pointsList[individualPath[j - 1]],
          pointsList[individualPath[j]],
        );
      }
      individualsPathValue[i] += Point.distanceBetweenPoints(
        pointsList[individualPath[individualPath.length - 1]],
        pointsList[individualPath[0]],
      );
    }
    //write path of best individual
    let bestIndividual;
    bestIndividualPathValue = 10000000000;
    for (let i = 0; i < numberOfIndividuals; i++) {
      if (individualsPathValue[i] < bestIndividualPathValue) {
        bestIndividual = i;
        bestIndividualPathValue = individualsPathValue[i];
      }
    }
    let checkList = [...pointsList];
    bestWay = [];
    bestWay.push(checkList[individualsGenes[bestIndividual][0]].index);
    checkList.splice(individualsGenes[bestIndividual][0], 1);
    for (let j = 1; j < individualsGenes[bestIndividual].length; j++) {
      bestWay.push(checkList[individualsGenes[bestIndividual][j]].index);
      checkList.splice(
        individualsGenes[bestIndividual][j],
        1,
      );
    }
    
        //calculation chance of individual "survive"
    let individualsChanceToSurvive = [];
    let sumOfReciprocals = 0;
    for (let i = 0; i < numberOfIndividuals; i++) {
      sumOfReciprocals += 1 / individualsPathValue[i];
    }
    for (let i = 0; i < numberOfIndividuals; i++) {
      individualsChanceToSurvive.push((1 / individualsPathValue[i]) /
        sumOfReciprocals);
    }
    //generate new individualGenes
    let childGenesList = [];
    for (let i = 0; i < numberOfIndividuals; i++) {
      let individualFather;
      let FathershipChance = Math.random();
      let modifier = 0;
      for (let j = 0; j < numberOfIndividuals; j++) {
        if (FathershipChance < individualsChanceToSurvive[j] + modifier) {
          individualFather = j;
          break;
        } else {
          modifier += individualsChanceToSurvive[j];
        }
      }
      let individualMother = individualFather;
      while (individualMother === individualFather) {
        let MothershipChance = Math.random();
        modifier = 0;
        for (let j = 0; j < numberOfIndividuals; j++) {
          if (MothershipChance < individualsChanceToSurvive[j] + modifier) {
            individualMother = j;
            break;
          } else {
            modifier += individualsChanceToSurvive[j];
          }
        }
      }
      let childGenes = [];
      let separationLine = Math.floor(individualsGenes[i].length / 2);
      for (let j = 0; j < separationLine; j++) {
        childGenes.push(individualsGenes[individualFather][j]);
      }
      for (let j = separationLine; j < individualsGenes[i].length; j++) {
        childGenes.push(individualsGenes[individualMother][j]);
      }
      childGenesList.push(childGenes);
    }
    individualsGenes = [...childGenesList];
  }
  //create mutation on last individual
  let randomMutation = randInt(individualsGenes.individualsList - 1, 0);
  if (randomMutation === 0) {
    individualsGenes[individualsGenes.length - 1][randomMutation] = randInt(
      pointsList.length - 1,
      0,
    );
  } else {
    individualsGenes[individualsGenes.length - 1][randomMutation] = randInt(
      pointsList.length - randomMutation,
      0,
    );
  }

  return {path: bestWay, ofExile: bestIndividualPathValue};
}
