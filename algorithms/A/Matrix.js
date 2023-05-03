class Graph {
  // createEdge(Node1, Node2) {
  // 	if (!(Node1 in this.noWayNodes)) {
  // 		if (!(Node1 in this.adjacencyList)) {
  // 			this.adjacencyList[Node1] = new Set();
  // 		}
  // 		if (!(Node2 in this.noWayNodes)) {
  // 			this.adjacencyList[Node1].add(Node2);
  // 			(Node2 in this.adjacencyList) ? (this.adjacencyList[Node2].add(Node1)) : (this.adjacencyList[Node2] = new Set([Node1])); // here is creates back connection on node
  // 			// if y in AL then x just adding to AL[y] else in AL creates a new set with value x
  // 		}
  // 	}
  // }
  //
  // destroyEdge(Node1, Node2) {
  // 	this.adjacencyList[Node1].delete(Node2);
  // 	this.adjacencyList[Node2].delete(Node1);
  // }

  constructor(size) {
    this.noWayNodes = Array();

    let matrix = Array();
    let counter = 1;
    for (let i = 0; i < size; i++) {
      matrix.push(Array());
      for (let j = 0; j < size; j++) {
        //				console.log(counter)
        matrix[i].push(counter);
        this.noWayNodes.push(counter)
        counter++;
      }
    }

    this.M = matrix;

    // create adjacency list
    // this.adjacencyList = {};
    // for (let j = 0; j < size; j++) {
    // 	for (let i = 0; i < size - 1; i++) {
    // 		let x = matrix[i][j];
    // 		let y = matrix[i + 1][j];
    // 		this.createEdge(x, y);
    //
    // 		if (j !== (this.size - 1)) {
    // 			y = matrix[i + 1][j + 1];
    // 			this.createEdge(x, y);
    // 		}
    //
    // 		x = matrix[j][i];
    // 		y = matrix[j][i + 1];
    // 		this.createEdge(x, y)
    //
    // 		if ((j !== 0) && (j !== 0)) {
    // 			y = matrix[j - 1][i - 1];
    // 			this.createEdge(x, y);
    // 		}
    //
    // 	}
    // }
  }

  generateNoWayNodesStartFinish(size) {
    this.size = size;
    let Size = size * size;
    let simpleNodeNumbers = Array();
    for (let i = 0; i < Size; i++) {
      simpleNodeNumbers.push(i + 1);
    }

    // GENERATE NOWAY NODES
    let numberOfNoWayNodes = randInt(Math.floor(Size / 2), 1);
    this.noWayNodes = Array();

    let noWayNode;
    for (let i = 0; i < numberOfNoWayNodes; i++) {
      let indexNoWayNode = randInt(simpleNodeNumbers.length - 1);
      noWayNode = simpleNodeNumbers[indexNoWayNode];
      this.noWayNodes.push(noWayNode);
      simpleNodeNumbers.splice(indexNoWayNode, 1);
    }

    // GENERATE START
    let startIndex = randInt(simpleNodeNumbers.length - 1);
    this.start = simpleNodeNumbers[startIndex];
    simpleNodeNumbers.splice(startIndex, 1);

    // GENERATE FINISH
    let finishIndex = randInt(simpleNodeNumbers.length - 1);
    this.finish = simpleNodeNumbers[finishIndex];
    simpleNodeNumbers.splice(finishIndex);
  }

  getNeibours(nodeNumber) {
    let x = Math.floor((nodeNumber) / size);
    let y = nodeNumber % size;
    // console.log(nodeNumber);
    // console.log(x, y);
    let neibours = [];
    if (x - 2 < 0) {
      neibours.push(this.M[x + 2][y]);
    } else if (x + 2 >= size) {
      neibours.push(this.M[x - 2][y]);
    } else {
      neibours.push(this.M[x - 2][y], this.M[x + 2][y]);
    }

    if (y - 2 < 0) {
      neibours.push(this.M[x][y + 2]);
    } else if (y + 2 >= size) {
      neibours.push(this.M[x][y - 2]);
    } else {
      neibours.push(this.M[x][y - 2], this.M[x][y + 2]);
    }

    return neibours;
  }

  generateLabirinth() {
    let x = randInt(0, Math.floor(this.size / 2)) * 2 + 1;
    let y = randInt(0, Math.floor(this.size / 2)) * 2 + 1;

    this.noWayNodes.splice(this.noWayNodes.indexOf(this.M[x][y]), 1);
    document.querySelector(`[id="${this.M[x][y]}"]`).classList.remove(
      "no-way-node",
    );
    let toCheck = Array();
    let neibours = this.getNeibours(this.M[x][y]);
    let visited = Array();
    visited.push(this.M[x][y]);
    for (let neibour of neibours) {
      let neibourCoordinates = this.coordinatesOfNode(neibour);
      toCheck.push(neibourCoordinates);
    }
    while (toCheck.length > 0) {
      // console.log(toCheck);
      let randomNeibourIndex = randInt(toCheck.length - 1, 0);
      let randomNeibour = toCheck[randomNeibourIndex];
      toCheck.splice(randomNeibourIndex, 1);
      // console.log(matrix[randomNeibour.x][randomNeibour.y]);
      visited.push(this.M[randomNeibour.x][randomNeibour.y]);
      this.noWayNodes.splice(
        this.noWayNodes.indexOf(this.M[randomNeibour.x][randomNeibour.y]),
        1,
      );
      document.querySelector(
        `[id="${this.M[randomNeibour.x][randomNeibour.y]}"]`,
      ).classList.remove(
        "no-way-node",
      );

      let directions = ["N", "S", "W", "E"];
      while (directions.length > 0) {
        let randDir = randInt(directions.length - 1, 0);
        switch (directions[randDir]) {
          case "N":
            if (
              (randomNeibour.y - 2 >= 0) &&
              (!this.noWayNodes.includes(
                this.M[randomNeibour.x][randomNeibour.y - 2],
              ))
            ) {
              this.noWayNodes.splice(
                this.noWayNodes.indexOf(
                  this.M[randomNeibour.x][randomNeibour.y - 1],
                ),
                1,
              );
              document.querySelector(
                `[id="${this.M[randomNeibour.x][randomNeibour.y - 1]}"]`,
              ).classList.remove(
                "no-way-node",
              );
              directions = Array();
            }
            break;

          case "S":
            if (
              (randomNeibour.y + 2 < size) &&
              (!this.noWayNodes.includes(
                this.M[randomNeibour.x][randomNeibour.y + 2],
              ))
            ) {
              this.noWayNodes.splice(
                this.noWayNodes.indexOf(
                  this.M[randomNeibour.x][randomNeibour.y + 1],
                ),
                1,
              );
              document.querySelector(
                `[id="${this.M[randomNeibour.x][randomNeibour.y + 1]}"]`,
              ).classList.remove(
                "no-way-node",
              );
              directions = Array();
            }
            break;

          case "W":
            if (
              (randomNeibour.x - 2 >= 0) &&
              (!this.noWayNodes.includes(
                this.M[randomNeibour.x - 2][randomNeibour.y],
              ))
            ) {
              this.noWayNodes.splice(
                this.noWayNodes.indexOf(
                  this.M[randomNeibour.x - 1][randomNeibour.y],
                ),
                1,
              );
              document.querySelector(
                `[id="${this.M[randomNeibour.x - 1][randomNeibour.y]}"]`,
              ).classList.remove(
                "no-way-node",
              );
              directions = Array();
            }
            break;

          case "E":
            if (
              (randomNeibour.x + 2 < size) &&
              (!this.noWayNodes.includes(
                this.M[randomNeibour.x + 2][randomNeibour.y],
              ))
            ) {
              this.noWayNodes.splice(
                this.noWayNodes.indexOf(
                  this.M[randomNeibour.x + 1][randomNeibour.y],
                ),
                1,
              );
              document.querySelector(
                `[id="${this.M[randomNeibour.x + 1][randomNeibour.y]}"]`,
              ).classList.remove(
                "no-way-node",
              );
              directions = Array();
            }
            break;
        }
      }

      neibours = this.getNeibours(this.M[randomNeibour.x][randomNeibour.y]);

      for (let neibour of neibours) {
        if (!visited.includes(neibour)) {
          let neibourCoordinates = this.coordinatesOfNode(neibour);
          toCheck.push(neibourCoordinates);
        }
      }
    }
  }

  coordinatesOfNode(nodeNumber) {
    let x = Math.floor((nodeNumber - 1) / this.size);
    let y = (nodeNumber - 1) % this.size;

    return { x, y };
  }

  lookAround(NodeNumber) {
    let x = Math.floor((NodeNumber - 1) / this.size);
    let y = (NodeNumber - 1) % this.size;
    let nodes = [];

    if (y === (this.size - 1)) {
      nodes.push(this.M[x][y - 1]);
    } else if (y === 0) {
      nodes.push(this.M[x][y + 1]);
    } else {
      nodes.push(this.M[x][y - 1], this.M[x][y + 1]);
    }

    if (x === 0) {
      nodes.push(this.M[x + 1][y]);
    } else if (x === (this.size - 1)) {
      nodes.push(this.M[x - 1][y]);
    } else {
      nodes.push(this.M[x - 1][y], this.M[x + 1][y]);
    }

    //TODO: refactor this shitcode!
    if ((x === 0) && (y === 0)) {
      nodes.push(this.M[x + 1][y + 1]);
    } else if (x === 0) {
      if (y !== this.size - 1) {
        nodes.push(this.M[x + 1][y - 1], this.M[x + 1][y + 1]);
      } else {
        nodes.push(this.M[x + 1][y - 1]);
      }
    } else if (y === 0) {
      if (x !== this.size - 1) {
        nodes.push(this.M[x - 1][y + 1], this.M[x + 1][y + 1]);
      } else {
        nodes.push(this.M[x - 1][y + 1]);
      }
    } else if ((x === (this.size - 1)) && (y === (this.size - 1))) {
      nodes.push(this.M[x - 1][y - 1]);
    } else if (x === (this.size - 1)) {
      nodes.push(this.M[x - 1][y - 1], this.M[x - 1][y + 1]);
    } else if (y === (this.size - 1)) {
      nodes.push(this.M[x - 1][y - 1], this.M[x + 1][y - 1]);
    } else {
      nodes.push(
        this.M[x - 1][y - 1],
        this.M[x - 1][y + 1],
        this.M[x + 1][y - 1],
        this.M[x + 1][y + 1],
      );
    }

    let nodesAround = [];

    for (let node of nodes) {
      if (!this.noWayNodes.includes(node)) {
        nodesAround.push(node);
      }
    }

    return nodesAround;
  }

  AStarAlgoritm() {
    let minDis = Array(); //minimal distance from start to this point
    let notUsedPoints = Array(); //array of potencial and visited points
    let potencial = Array(); //array of point that border with visited points
    let tmp; //tmp array
    let tmpX; //как вариант убрать эту переменную нахуй т.к. js ведь не требователен к типам и можно тогда присваивать временные данные к tmp(я ебал формулировать ЭТО на иглише)
    let minIndex = 0; //closest to end potencial point
    let min; //minimal distance in way: start->current point->one of potencial points
    let beginIndex = this.start - 1; //не ебу зачем это. может это просто убрать?(я ебал писать ЭТО на иглише)
    //setting start data
    for (let i = 0; i < this.size * this.size; i++) {
      minDis.push(100000000);
      notUsedPoints.push(true);
    }
    //setting start point
    minDis[beginIndex] = 0;
    notUsedPoints[beginIndex] = false;
    tmp = this.lookAround(this.start);

    for (let i = 0; i < tmp.length; i++) {
      potencial.push(tmp[i] - 1);
      //TODO: create colors to "potential" point
      minDis[tmp[i] - 1] = minDis[this.start - 1] + 1; //TODO:заменить 1 на вес ребра
    }

    //algor
    let visited = Array();
    while (potencial.length > 0) {
      minIndex = 100000000;

      min = 100000000;
      for (let i = 0; i < potencial.length; i++) {
        if ((minDis[potencial[i]] + this.approachToEnd(potencial[i])) < min) {
          min = minDis[potencial[i]];
          minIndex = potencial[i];
        }
      }

      if (!notUsedPoints[this.finish - 1]) {
        console.log("finded");
        break;
      }

      if (minIndex !== 100000000) {
        //TODO: убрать minIndex из массива potencial
        let nodesAround = this.lookAround(minIndex + 1);
        potencial.splice(potencial.indexOf(minIndex), 1);

        for (let i = 0; i < nodesAround.length; i++) {
          if (notUsedPoints[nodesAround[i] - 1]) {
            potencial.push(nodesAround[i] - 1);
            //TODO: create colours to "potential" point
            minDis[nodesAround[i] - 1] = minDis[minIndex - 1] + 1; //TODO:заменить 1 на вес ребра
            notUsedPoints[nodesAround[i] - 1] = false;
          } else {
            tmpX = min + 1;
            if (tmpX < minDis[nodesAround[i] - 1]) {
              minDis[nodesAround[i] - 1] = tmpX;
            }
          }
        }
      }
      visited.push(minIndex + 1);
    }

    let i = 0;
    let timeid = setInterval(() => {
      let visitedNode = document.querySelector(`[id="${visited[i]}"]`);
      visitedNode.classList.add("visited");
      i++;
      if (i == visited.length) {
        clearInterval(timeid);
      }
    }, 200);
    console.log("ok");
    //way output
    if (notUsedPoints[this.finish - 1]) {
      console.log("ok");
      return -1;
    } //else {
    //			let current = this.finish;
    //			while (current !== this.start) {
    //				//TODO: create colouring on "current"
    //				console.log(current);
    //				let nodesAround = this.lookAround(current);
    //				tmpX = minDis[current - 1];
    //				for (let i = 0; i < nodesAround.length; i++) {
    //					if (((minDis[nodesAround[i] - 1] < minDis[current - 1]) || (minDis[nodesAround[i] - 1] < tmpX)) && (notUsedPoints[nodesAround[i] - 1])) {
    //						current = nodesAround[i];
    //						tmpX = minDis[nodesAround[i] - 1];
    //					}
    //				}
    //			}
    //			console.log(current);
    //		}
  }

  approachToEnd(nodeNumber) {
    let { x, y } = this.coordinatesOfNode(nodeNumber);
    let nodeX = x;
    let nodeY = y;
    let finish = this.coordinatesOfNode(this.finish);

    return (Math.abs(nodeX - finish.x) + Math.abs(nodeY - finish.y));
  }
}
