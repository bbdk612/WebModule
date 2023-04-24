import {randInt} from "./functionStack";

export class Graph {
	#createEdge(Node1, Node2){
		if (!(Node1 in this.noWayNodes)) {
			if (!(Node1 in this.adjacencyList)) {
				this.adjacencyList[Node1] = new Set();
			}
			if (!(Node2 in this.noWayNodes)) {
				this.adjacencyList[Node1].add(Node2);
				(Node2 in this.adjacencyList) ? (this.adjacencyList[Node2].add(Node1)) : (this.adjacencyList[Node2] = new Set(Node1)); // here is creates back connection on node
				// if y in AL then x just adding to AL[y] else in AL creates a new set with value x
			}
		}
	}
	constructor(size) {
		let Size = size * size;

		this.generateNoWayNodesStartFinish(Size);

		let matrix = Array();
		let counter = 1;
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
		this.adjacencyList = {};
		for (let j = 0; j < size; j++) {
			for (let i = 0; i < size - 1; i++) {
				let x = matrix[i][j];
				let y = matrix[i + 1][j];
				this.#createEdge(x, y);

				if (j !== (this.size - 1)) {
					y = matrix[i+1][j+1];
					this.#createEdge(x, y);
				}

				x = matrix[j][i];
				y = matrix[j][i + 1];
				this.#createEdge(x, y)

				if ((j !== 0) && (j !== 0)) {
					y = matrix[j - 1][i - 1];
					this.#createEdge(x, y);
				}

			}
		}
	}

	generateNoWayNodesStartFinish(size) {
		this.size = size;
		let Size = size * size;
		let simpleNodeNumbers = Array(Size);
		for (let i = 0; i < Size; i++) {
			simpleNodeNumbers[i] = i+1;
		}

		// GENERATE NOWAY NODES
		let numberOfNoWayNodes = randInt(Size - 2, 1);
		this.noWayNodes = Array(numberOfNoWayNodes);
		let noWayNode;
		for (let i = 0; i < numberOfNoWayNodes; i++) {
			let indexNoWayNode = randInt(simpleNodeNumbers.length);
			noWayNode = simpleNodeNumbers[indexNoWayNode];
			delete simpleNodeNumbers[indexNoWayNode];
		}

		// GENERATE START
		let startIndex = randInt(simpleNodeNumbers.length);
		this.start = simpleNodeNumbers[startIndex];
		delete simpleNodeNumbers[startIndex];

		// GENERATE FINISH
		let finishIndex = randInt(simpleNodeNumbers.length);
		this.finish = simpleNodeNumbers[finishIndex];
		delete simpleNodeNumbers[finishIndex];
	}



	lookAround(NodeNumber) {
		let x = Math.floor((NodeNumber - 1) / this.size) ;
		let y = (NodeNumber - 1) % this.size;

		let nodesAround = [];
		if (y === (this.size - 1)) {
			nodesAround.push(this.M[x][y - 1])
		} else if (y === 0) {
			nodesAround.push(this.M[x][y + 1]);
		} else {
			nodesAround.push(this.M[x][y - 1], this.M[x][y + 1]);
		}

		if (x === 0) {
			nodesAround.push(this.M[x + 1][y]);
		} else if (x === (this.size - 1)) {
			nodesAround.push(this.M[x - 1][y]);
		} else {
			nodesAround.push(this.M[x - 1][y], this.M[x + 1][y]);
		}

		if ((x === 0) && (y === 0)) {
			nodesAround.push(this.M[x+1][y+1]);
		} else if (x === 0) {
			nodesAround.push(this.M[x+1][y-1], this.M[x+1][y+1]);
		} else if (y === 0) {
			nodesAround.push(this.M[x-1][y + 1], this.M[x + 1][y +1]);
		} else if ( (x === (this.size - 1)) && (y === (this.size - 1)) ) {
			nodesAround.push(this.M[x - 1][y - 1]);
		} else if (x === (this.size - 1)) {
			nodesAround.push(this.M[x - 1][y - 1], this.M[x - 1][y + 1]);
		} else if (y === (this.size - 1)) {
			nodesAround.push(this.M[x - 1][y - 1], this.M[x + 1][y - 1]);
		} else {
			nodesAround.push(this.M[x - 1][y - 1], this.M[x - 1][y + 1], this.M[x + 1][y - 1], this.M[x + 1][y + 1]);
		}
		return nodesAround;
	}
}