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

function generativeAlgorithm(
  pointsList,
  numberOfIterations,
  numberOfIndividuals,
) {
  let individualsGenes = [];
  //setting start
  for (let i = 0; i < numberOfIndividuals; i++) {
    let individualsGenesLine = [];
    individualsGenesLine.push(randInt(pointsList.length - 1, 0));
    for (let choiseList = pointsList.length - 2; choiseList > 0; choiseList--) {
      individualsGenesLine.push(randInt(choiseList, 0));
    }
    individualsGenes.push(individualsGenesLine);
  }
  //algorithm
  for (let tmp = 0; tmp < numberOfIterations; tmp++) {
    //calculation length of individual Path
    let individualsPathValue = Array(numberOfIndividuals);
    for (let i = 0; i < numberOfIndividuals; i++) {
      let checkList = pointsList;
      let individualPath = [];
      individualPath[0] = individualsGenes[i][0]; // TODO: What is j
      //TODO: rework indexOf
      let index = findPointIndex(checkList, pointsList[individualsGenes[i][0]]);
      checkList.splice(index, 1);
      for (let j = 1; j < individualsGenes[i].length; j++) {
        individualPath[j] = checkList[individualsGenes[i][j]];
        //TODO: rework indexOf
        let index = findPointIndex(checkList, pointsList[individualsGenes[i][j]]);
        checkList.splice(index, 1);
      }
      for (let j = 0; j < individualPath.length - 1; j++) {
        individualsPathValue[i] += Point.distanceBetweenPoints(
          individualPath[j],
          individualPath[j + 1],
        );
      }
      individualsPathValue[i] += Point.distanceBetweenPoints(
        individualPath[individualPath.length - 1],
        individualPath[0],
      );
    }
    //write path of best individual
    let bestIndividual;
    let bestIndividualPathValue = 10000000000;
    for (let i = 0; i < numberOfIndividuals; i++) {
      if (individualsPathValue[i] < bestIndividualPathValue) {
        bestIndividual = i;
        bestIndividualPathValue = individualsPathValue[i];
      }
    }
    let checkList = pointsList;
    let bestWay = [];
    bestWay[0] = individualsGenes[bestIndividual][j];
    //TODO: rework indexOf
    checkList.splice(findPointIndex(checkList, individualsGenes[bestIndividual][0]), 1);
    for (let j = 1; j < individualsGenes[i].length; j++) {
      bestWay[j] = checkList[individualsGenes[bestIndividual][j]];
      //TODO: rework indexOf
      checkList.splice(
        findPointIndex(checkList, individualsGenes[bestIndividual][j]),
        1,
      );
    }
    //calculation chance of individual "survive"
    let individualsChanceToSurvive;
    let sumOfReciprocals;
    for (let i = 0; i < numberOfIndividuals; i++) {
      sumOfReciprocals += 1 / individualsPathValue[i];
    }
    for (let i = 0; i < numberOfIndividuals; i++) {
      individualsChanceToSurvive[i] = (1 / individualsPathValue[i]) /
        sumOfReciprocals;
    }
    //generate new individualGenes
    let childGenesList;
    for (let i = 0; i < numberOfIndividuals; i++) {
      let individualFather;
      let FathershipChance = Math.random();
      let modifier = 0;
      for (let j = 0; j < individualsList; j++) {
        if (FathershipChance < individualsChanceToSurvive[j] + modifier) {
          individualFather = j;
          break;
        } else {
          modifier += individualsChanceToSurvive[j];
        }
      }
      let individualMother = individualFather;
      while (individualMother = individualFather) {
        let MothershipChance = Math.random();
        modifier = 0;
        for (let j = 0; j < individualsList; j++) {
          if (MothershipChance < individualsChanceToSurvive[j] + modifier) {
            individualMother = j;
            break;
          } else {
            modifier += individualsChanceToSurvive[j];
          }
        }
      }
      let childGenes;
      let separationLine = Math.floor(individualsGenes[i].length / 2);
      for (let j = 0; j < separationLine; j++) {
        childGenes[j] = individualsGenes[individualFather][j];
      }
      for (let j = separationLine; j < individualsGenes[i].length; j++) {
        childGenes[j] = individualsGenes[individualMother][j];
      }
      childGenesList.push(childGenes);
    }
    individualsGenes = childGenesList;
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

  return bestWay;  
}
