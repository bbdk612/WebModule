let matrixSize;
let buttonClicked = false;
let graph;
const button = document.querySelector(".size__button");
button.addEventListener("click", () => {
	matrixSize = parseInt(document.querySelector(".size__input").value);
	buttonClicked = true;
	console.log(matrixSize);
	graph = new Graph(matrixSize);

	let graphLine = '';
	for (let i = 0; i < matrixSize; i++) {
		graphLine += `<div class="graph-line">`
		for (let j = 0; j < matrixSize; j++) {
			graphLine += `<div class="graph-node" id="${graph.M[i][j]}">${graph.M[i][j]}</div>`
		}
		graphLine += "</div>"
	}
	let G = document.querySelector(".graph");
	G.innerHTML = "";
	G.innerHTML += graphLine;
	graph.noWayNodes.forEach((nodeNumber) => {
		let node = document.querySelector(`[id="${nodeNumber}"]`);
		node.classList.add( "no-way-node");
	})

	let start = document.querySelector(`[id="${graph.start}"]`);
	start.classList.add("start");

	let finish = document.querySelector(`[id="${graph.finish}"]`);
	finish.classList.add("finish");
});

