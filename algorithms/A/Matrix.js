class Matrix {
	constructor(size) {
		let Size = size * size;
		let numberOfNoWayNodes = this.randomNumber(Size - 2, 1);
		this.noWayNodes = Array(numberOfNoWayNodes);
		let noWayNode;

		let simpleNodeNumbers = Array(Size);
		for (let i = 0; i < Size; i++) {
			simpleNodeNumbers[i] = i+1;
		}

		for (let i = 0; i < numberOfNoWayNodes; i++) {
			let indexNoWayNode = this.randomNumber(Size);
			noWayNode = simpleNodeNumbers[indexNoWayNode];
			delete simpleNodeNumbers[indexNoWayNode];
		}

		let matrix = Array();
		let counter = 1;
		for (let i = 0; i < size; i++) {
			matrix.push(Array());
			for (let j = 0; j < size; j++) {
				console.log(counter)
				matrix[i].push(counter);
				counter++;
			}
		}

		for(let m of matrix){
			console.log(m);
		}
//		this.M = matrix;
	}

	randomNumber(max, min=0) {
		return Math.floor(Math.random()*(max - min + 1) + min);
	}

	regenerateNoWayNodes() {
		
	}
}