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
		let noWayNodes = Array();
		this.size = size;
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
		let graphLines = "";

		for (let i = 0; i < size; i++) {
			graphLines += "<div class='graph-line'>";
			for (let j = 0; j < size; j++) {
				graphLines += `<div class="graph-node no-way-node" id="${matrix[i][j]
				}"></div>`;
				noWayNodes.push(matrix[i][j]);
			}
			graphLines += "</div>";
		}
		this.noWayNodes = noWayNodes;

		document.querySelector(".graph").innerHTML += graphLines;
		this.generateLabirinth();
        console.log(this.noWayNodes);
        this.noWayNodes = Array();
        let nodes = document.querySelectorAll(".graph-node");
        for (let node of nodes) {
          if (node.classList.contains("no-way-node")) {
            this.noWayNodes.push(parseInt(node.id));
          }
        }

		this.generateStartFinish();
		
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

	getNeibours(nodeNumber) {
		let x = Math.floor((nodeNumber) / this.size);
		let y = nodeNumber % this.size;
		// console.log(nodeNumber);
		// console.log(x, y);
		let neibours = [];
		if (x - 2 < 0) {
			neibours.push(this.M[x + 2][y]);
		} else if (x + 2 >= this.size) {
			neibours.push(this.M[x - 2][y]);
		} else {
			neibours.push(this.M[x - 2][y], this.M[x + 2][y]);
		}

		if (y - 2 < 0) {
			neibours.push(this.M[x][y + 2]);
		} else if (y + 2 >= this.size) {
			neibours.push(this.M[x][y - 2]);
		} else {
			neibours.push(this.M[x][y - 2], this.M[x][y + 2]);
		}

		return neibours;
	}

	generateLabirinth() {
		let x = randInt(Math.floor((this.size - 1) / 2), 0) * 2 + 1;
		let y = randInt(Math.floor((this.size - 1) / 2), 0) * 2 + 1;
		console.log(x, y);
		this.noWayNodes.splice(this.noWayNodes.indexOf(this.M[x][y]), 1);
		document.querySelector(`[id="${this.M[x][y]}"]`).classList.remove("no-way-node");
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
			// console.log(this.M[randomNeibour.x][randomNeibour.y]);
			visited.push(this.M[randomNeibour.x][randomNeibour.y]);
			this.noWayNodes.splice(
				this.noWayNodes.indexOf(this.M[randomNeibour.x][randomNeibour.y]),
				1,
			);
			document.querySelector(`[id="${this.M[randomNeibour.x][randomNeibour.y]}"]`).classList.remove("no-way-node");
			let directions = ["N", "S", "W", "E"];
			while (directions.length > 0) {
				let randDir = randInt(directions.length - 1, 0);
				switch (directions[randDir]) {
					case "N":
						if (
							(randomNeibour.y - 2 >= 0) &&
							(!this.noWayNodes.includes(this.M[randomNeibour.x][randomNeibour.y - 2]))
						) {
							this.noWayNodes.splice(
								this.noWayNodes.indexOf(this.M[randomNeibour.x][randomNeibour.y - 1]),
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
							(randomNeibour.y + 2 < this.size) &&
							(!this.noWayNodes.includes(this.M[randomNeibour.x][randomNeibour.y + 2]))
						) {
							this.noWayNodes.splice(
								this.noWayNodes.indexOf(this.M[randomNeibour.x][randomNeibour.y + 1]),
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
							(!this.noWayNodes.includes(this.M[randomNeibour.x - 2][randomNeibour.y]))
						) {
							this.noWayNodes.splice(
								this.noWayNodes.indexOf(this.M[randomNeibour.x - 1][randomNeibour.y]),
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
							(randomNeibour.x + 2 < this.size) &&
							(!this.noWayNodes.includes(this.M[randomNeibour.x + 2][randomNeibour.y]))
						) {
							this.noWayNodes.splice(
								this.noWayNodes.indexOf(this.M[randomNeibour.x + 1][randomNeibour.y]),
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

	generateStartFinish() {
		let simpleNodeNumbers = Array();
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (!this.noWayNodes.includes(this.M[i][j]))
					simpleNodeNumbers.push(this.M[i][j]);
			}
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

	lookAround(NodeNumber, size, M, noWayNodes) {
		let x = Math.floor((NodeNumber) / size);
		let y = (NodeNumber) % size;
		let nodes = [];

		if (y === (size - 1)) {
			nodes.push(M[x][y - 1]);
		} else if (y === 0) {
			nodes.push(M[x][y + 1]);
		} else {
			nodes.push(M[x][y - 1], M[x][y + 1]);
		}

		if (x === 0) {
			nodes.push(M[x + 1][y]);
		} else if (x === (size - 1)) {
			nodes.push(M[x - 1][y]);
		} else {
			nodes.push(M[x - 1][y], M[x + 1][y]);
		}

		//TODO: refactor this shitcode!
		if ((x === 0) && (y === 0)) {
			nodes.push(M[x + 1][y + 1]);
		} else if (x === 0) {
			if (y !== size - 1) {
				nodes.push(M[x + 1][y - 1], M[x + 1][y + 1]);
			} else {
				nodes.push(M[x + 1][y - 1]);
			}
		} else if (y === 0) {
			if (x !== size - 1) {
				nodes.push(M[x - 1][y + 1], M[x + 1][y + 1]);
			} else {
				nodes.push(M[x - 1][y + 1]);
			}
		} else if ((x === (size - 1)) && (y === (size - 1))) {
			nodes.push(M[x - 1][y - 1]);
		} else if (x === (size - 1)) {
			nodes.push(M[x - 1][y - 1], M[x - 1][y + 1]);
		} else if (y === (size - 1)) {
			nodes.push(M[x - 1][y - 1], M[x + 1][y - 1]);
		} else {
			nodes.push(
				M[x - 1][y - 1],
				M[x - 1][y + 1],
				M[x + 1][y - 1],
				M[x + 1][y + 1],
			);
		}

		let nodesAround = [];

		for (let node of nodes) {
			if (!noWayNodes.includes(node)) {
				nodesAround.push(node);
			}
		}

		return nodesAround;
	}

	async AStarAlgoritm() {
		const bigNum = 100000000;
		let minDis = Array(); //minimal distance from start to this point
		let heuristicCost = Array(); //minimal distance from this point to end
		let coefficient = Array(); //minDis + heuristicCost
		let noWayNodes = this.noWayNodes;
        console.log(noWayNodes);
		let potencialForDraw = Array();
		let min; //minimal distance in way: start->current point->one of potencial points
		let potencial = Array(); //array of point that border with visited points
		let minIndex = 0; //closest to end potencial point
		let nodesAround;

		console.log(this.start);
		console.log(this.finish);
		//setting start data
		for (let i = 0; i < this.size * this.size; i++) {
			minDis.push(bigNum);
		}

		//setting start point
		minDis[this.start] = 0;
		heuristicCost[this.start] = this.approachToEnd(this.start);
		let Size = this.size;
		let appToEnd = this.approachToEnd;
		let M = this.M;
		nodesAround = this.lookAround(this.start, Size, M, noWayNodes);

		function potencialGenNDraw() {
			let i = 0;
			return new Promise((drawed) => {
				let timeID = setInterval(() => {
					potencial.push(nodesAround[i]);
					document.querySelector(`[id="${nodesAround[i]}"]`).classList.add("potencial");
					potencialForDraw.push(nodesAround[i]);
					//TODO: create colors to "potential" point
					minDis[nodesAround[i]] = 1; //TODO:заменить 1 на вес ребра
					heuristicCost[nodesAround[i]] = appToEnd(nodesAround[i], Size);
					coefficient[nodesAround[i]] = minDis[nodesAround[i]] +
						heuristicCost[nodesAround[i]];
					i++;
					if (i == nodesAround.length) {
						clearInterval(timeID);
						drawed(true);
					}
				}, 50);
			});
		}

		let potencialDrawed = await potencialGenNDraw();
		let lookA = this.lookAround;
		//algor
		let visited = Array();
		minIndex = this.start;
		let s = this.start;
		let f = this.finish;

		function mainfuncdrawing() {
			return new Promise(completed => {
				let timeID = setInterval(() => {
					if (!(potencial.length > 0)) {
						clearInterval(timeID);
						completed(true);
					}
					min = bigNum;
					for (let i = 0; i < potencial.length; i++) {
						if (coefficient[potencial[i]] <= min) {
							if (
								(coefficient[potencial[i]] === min) &
								(heuristicCost[potencial[i]] < heuristicCost[minIndex])
							) {
								min = coefficient[potencial[i]];
								minIndex = potencial[i];
							} else {
								min = coefficient[potencial[i]];
								minIndex = potencial[i];
							}
						}
					}

					if (minDis[f] !== bigNum) {
						console.log("finded");
						clearInterval(timeID);
						completed(true);
					}

					if (minIndex !== s) {
						console.log(minIndex);
						nodesAround = lookA(minIndex, Size, M, noWayNodes);
						potencial.splice(potencial.indexOf(minIndex), 1);

						for (let i = 0; i < nodesAround.length; i++) {
							if (minDis[nodesAround[i]] === bigNum) {
								potencial.push(nodesAround[i]);
								potencialForDraw.push(nodesAround[i]);
								document.querySelector(`[id="${nodesAround[i]}"]`).classList.add("potencial");
								//TODO: create colours to "potential" point
								minDis[nodesAround[i]] = minDis[minIndex] + 1; //TODO:заменить 1 на вес ребра
								heuristicCost[nodesAround[i]] = appToEnd(
									nodesAround[i], Size
								);
								coefficient[nodesAround[i]] = minDis[nodesAround[i]] +
									heuristicCost[nodesAround[i]];
							} else {
								if (minDis[minIndex] < minDis[nodesAround[i]]) {
									minDis[nodesAround[i]] = minDis[minIndex] + 1; //TODO:заменить 1 на вес ребра
									coefficient[nodesAround[i]] = minDis[nodesAround[i]] +
										heuristicCost[nodesAround[i]];
								}
							}
						}
						setTimeout(() => {
							document.querySelector(`[id="${minIndex}"]`).classList.add("visited");
						}, 25);
					}
				}, 50);
			});
		}

		let mainDraw = await mainfuncdrawing();
		console.log("ok", potencialDrawed, mainDraw);
		//way output

		let rightPath = Array();
		if (minDis[this.finish] == bigNum) {
			console.log("ok");
			return -1;
		} else {
			let current = this.finish;
			while (current !== this.start) {
				//TODO: create colouring on "current"
				console.log(current);
				nodesAround = this.lookAround(current, Size, M, noWayNodes);
				let tmpX = minDis[current];
				for (let i = 0; i < nodesAround.length; i++) {
					if (minDis[nodesAround[i]] < tmpX) {
						current = nodesAround[i];
						tmpX = minDis[nodesAround[i]];
					}
				}
				rightPath.push(current);
			}
			console.log(rightPath);
		}

		// function drawVisited() {
		//   let i = 0;
		//   return new Promise((drawed) => {
		//     let timeid = setInterval(() => {
		//       let visitedNode = document.querySelector(`[id="${visited[i]}"]`);
		//       visitedNode.classList.add("visited");
		//       i++;
		//       if (i == visited.length) {
		//         clearInterval(timeid);
		//         drawed(true);
		//       }
		//     }, 50);
		//   });
		// }

		function drawRightPath() {
			let i = 0;
			return new Promise((drawed) => {
				let timeid = setInterval(() => {
					let rightNode = document.querySelector(`[id="${rightPath[i]}"]`);
					rightNode.classList.add("rightPath");
					i++;
					if (i == rightPath.length) {
						clearInterval(timeid);
						drawed(true);
					}
				}, 50);
			});
		}

		async function draw() {
			//  let drawedVisited = await drawVisited();
			let drawedRightPath = await drawRightPath();

			console.log(drawedRightPath);
		}

		await draw();
	}

	approachToEnd(nodeNumber, size) {
		let coorOfN = (nodeNumber) => {
			let x = Math.floor((nodeNumber) / size);
			let y = (nodeNumber) % size;

			return {x, y};
		}
		let {x, y} = coorOfN(nodeNumber);
		let nodeX = x;
		let nodeY = y;
		let finish = coorOfN(nodeNumber);

		return (Math.abs(nodeX - finish.x) + Math.abs(nodeY - finish.y));
	}
}
