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
  let bestWay = [];
  //setting start
  for (let i = 0; i < numberOfIndividuals; i++) {
    let individualsGenesLine = [];
    individualsGenesLine.push(randInt(pointsList.length - 1, 0));
    for (let choiseList = pointsList.length - 2; choiseList >= 0; choiseList--) {
      individualsGenesLine.push(randInt(choiseList, 0));
    }
    individualsGenes.push(individualsGenesLine);
    console.log(individualsGenes[i])
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
      individualPath[0] = checkList[individualsGenes[i][0]]; // TODO: What is j
      //TODO: rework indexOf
      // console.log(pointsList.length)
      // console.log(pointsList[individualsGenes[i][0]])
      let index = findPointIndex(checkList, pointsList[individualsGenes[i][0]]);
      checkList.splice(index, 1);
      for (let j = 1; j < individualsGenes[i].length; j++) {
        console.log(checkList)
        individualPath[j] = checkList[individualsGenes[i][j]];
        //TODO: rework indexOf
        let index = findPointIndex(checkList, pointsList[individualsGenes[i][j]]);
        checkList.splice(index, 1);
      }
      console.log("IP: ", individualPath)

      for (let j = 1; j < individualPath.length - 1; j++) {
        individualsPathValue[i] += Point.distanceBetweenPoints(
          individualPath[j - 1],
          individualPath[j],
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
    console.log(individualsPathValue)
    for (let i = 0; i < numberOfIndividuals; i++) {
      if (individualsPathValue[i] < bestIndividualPathValue) {
        bestIndividual = i;
        bestIndividualPathValue = individualsPathValue[i];
      }
    }
    console.log(bestIndividual)
    let checkList = [...pointsList];
    bestWay[0] = checkList[individualsGenes[bestIndividual][0]];
    //TODO: rework indexOf
    checkList.splice(findPointIndex(checkList, pointsList[individualsGenes[bestIndividual][0]]), 1);
    for (let j = 1; j < individualsGenes[bestIndividual].length; j++) {
      bestWay[j] = checkList[individualsGenes[bestIndividual][j]];
      //TODO: rework indexOf
      checkList.splice(
        findPointIndex(checkList, individualsGenes[bestIndividual][j]),
        1,
      );
    }

    console.log("IG: ", individualsGenes[bestIndividual])
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
  console.log(`dfjslkfjsdl ${bestWay}`)
  return bestWay;
}
