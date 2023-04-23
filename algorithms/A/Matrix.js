class Matrix {
	constructor(size) {
		let numberOfNoWayNodes = Math.floor(Math.random() * ((size - 2) - 1 + 1)) + 1;
		this.noWayNodes = Array();
		let noWayNode;
		do {
			noWayNode = Math.floor(Math.random() * (size - 1 + 1)) + 1;
			if (!(noWayNode in this.noWayNodes)) {
				this.noWayNodes.push(noWayNode)
			}
		} while(noWayNode.length !== numberOfNoWayNodes);

		this.start = -1;
		this.finish = -1;
		while (this.start === -1) {
			this.start = Math.floor(Math.random() * (size - 1 + 1)) + 1;
			if (this.start in noWayNode) {
				this.start = -1;
			}
		}
		while (this.finish === -1) {
			this.finish = Math.floor(Math.random() * (size - 1 + 1)) + 1;
			if ((this.finish in noWayNode) || (this.finish === this.start)) {
				this.finish = -1;
			}
		}

		this.matrix = Array(size).fill(Array(size));
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {

			}
		}
	}
	
	regenerateNoWayNodes() {
		
	}
}