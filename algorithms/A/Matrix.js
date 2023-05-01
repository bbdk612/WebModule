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
		this.generateNoWayNodesStartFinish(size);

		let matrix = Array();
		let counter = 0;
		for (let i = 0; i < size; i++) {
			matrix.push(Array());
			for (let j = 0; j < size; j++) {
//				console.log(counter)
				matrix[i].push(counter);
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
			simpleNodeNumbers.push(i);
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

	coordinatesOfNode(nodeNumber) {
		let x = Math.floor((nodeNumber) / this.size);
		let y = (nodeNumber) % this.size;

		return {x, y};
	}

	lookAround(NodeNumber) {
		let x = Math.floor((NodeNumber) / this.size);
		let y = (NodeNumber) % this.size;
		let nodes = [];

		if (y === (this.size - 1)) {
			nodes.push(this.M[x][y - 1])
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
			nodes.push(this.M[x - 1][y - 1], this.M[x - 1][y + 1], this.M[x + 1][y - 1], this.M[x + 1][y + 1]);
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
		const bigNum=100000000;
		let minDis = Array();//minimal distance from start to this point
		let heuristicCost= Array();//minimal distance from this point to end
		let coefficient= Array();//minDis + heuristicCost

		let min;//minimal distance in way: start->current point->one of potencial points
		let potencial = Array();//array of point that border with visited points
		let minIndex = 0;//closest to end potencial point
		let nodesAround;

		console.log(this.start); 
		console.log(this.finish); 
		//setting start data
		for (let i = 0; i < this.size * this.size; i++) {
			minDis.push(bigNum);
		}

		//setting start point
		minDis[this.start] = 0;
		heuristicCost[this.start]= this.approachToEnd(this.start);
		nodesAround = this.lookAround(this.start);

		for (let i = 0; i < nodesAround.length; i++) {
			potencial.push(nodesAround[i]);
			//TODO: create colors to "potential" point
			minDis[nodesAround[i]] = 2;//TODO:заменить 1 на вес ребра
			heuristicCost[nodesAround[i]]= 	this.approachToEnd(nodesAround[i]);
			coefficient[nodesAround[i]] = minDis[nodesAround[i]]+heuristicCost[nodesAround[i]];
		}

		//algor
    let visited = Array();
	minIndex = this.start;
		while (potencial.length > 0) {

			min = bigNum;
			for (let i = 0; i < potencial.length; i++) {
				if (coefficient[potencial[i]] <= min) {
					if ((coefficient[potencial[i]] === min)&(heuristicCost[potencial[i]]<heuristicCost[minIndex])){
						min = coefficient[potencial[i]];
						minIndex = potencial[i];
					}
					else{
						min = coefficient[potencial[i]];
						minIndex = potencial[i];
					}
				}
			}

			if (minDis[this.finish]!==bigNum) {
				console.log("finded"); 
				break;
			}

			if (minIndex !== this.start) {
				console.log(minIndex); 
				nodesAround = this.lookAround(minIndex);
				potencial.splice(potencial.indexOf(minIndex), 1);

				for (let i = 0; i < nodesAround.length; i++) {
					if (minDis[nodesAround[i]]===bigNum) {
						potencial.push(nodesAround[i]);
						//TODO: create colours to "potential" point
						minDis[nodesAround[i]] = minDis[minIndex] + 2;//TODO:заменить 1 на вес ребра
						heuristicCost[nodesAround[i]]= 	this.approachToEnd(nodesAround[i]);
						coefficient[nodesAround[i]] = minDis[nodesAround[i]]+heuristicCost[nodesAround[i]];
					} else {
						if (minDis[minIndex]<minDis[nodesAround[i]]){
							minDis[nodesAround[i]]=minDis[minIndex]+2;//TODO:заменить 1 на вес ребра
							coefficient[nodesAround[i]] = minDis[nodesAround[i]]+heuristicCost[nodesAround[i]];
						}
					}
				}
				visited.push(minIndex);
			}
		}
		let i = 0;
		let timeid = setInterval(() => {
      let visitedNode = document.querySelector(`[id="${visited[i]}"]`);
      visitedNode.classList.add("visited");
      i++;
      if (i == visited.length) {
        clearInterval(timeid);
      }

    }, 50);
    console.log("ok");
		//way output
		if (minDis[this.finish]!=bigNum) {
			console.log("ok");
			return -1;
		} else {
			let current = this.finish;
			let rightPath= Array();
			while (current !== this.start) {
				//TODO: create colouring on "current"
				console.log(current);
				nodesAround = this.lookAround(current);
				let tmpX = minDis[current];
				for (let i = 0; i < nodesAround.length; i++) {
					if (minDis[nodesAround[i]] < tmpX) {
						current = nodesAround[i];
						tmpX = minDis[nodesAround[i] - 1];
					}
				}
				rightPath.push(current)
			}
			console.log(current);
		}
	}
	approachToEnd(nodeNumber) {
		let {x, y} = this.coordinatesOfNode(nodeNumber);
		let nodeX = x;
		let nodeY = y;
		let finish = this.coordinatesOfNode(this.finish);


		return (Math.abs(nodeX - finish.x) + Math.abs(nodeY - finish.y));
	}
}
