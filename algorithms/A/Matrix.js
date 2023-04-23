class Matrix {
	constructor(size) {
		this.matrix = Array(size).fill(Array(size));
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				if (j != i) {
					this.matrix[i][j] = 1;
				} else {
					this.matrix[i][j] = 0;
				}
			}
		}
		let numberOfNoWayNodes = Math.floor(Math.random() * (size - 1 + 1)) + 1;
		this.noWayNodes = Array();
		let noWayNode;
		do {
			noWayNode = Math.floor(Math.random() * (size - 1 + 1)) + 1;
			if (!(noWayNode in this.noWayNodes)) {
				this.noWayNodes.push(noWayNode)
			}
		} while(noWayNode.length !== numberOfNoWayNodes);
	}
	
	regenerateNoWayNodes() {
		
	}
}