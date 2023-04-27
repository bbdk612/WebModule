let editButtons = document.querySelectorAll(".edit__button:not(#stop-no-way-node)");

for (let editButton of editButtons) {
	editButton.disabled = true;
}

let graphSizeInput = document.querySelector(".size__input");
let buttonClicked = false;
let graph;
const button = document.querySelector(".size__button");

let matrixSize;

graphSizeInput.addEventListener("change", () => {
	button.disabled = parseInt(graphSizeInput.value) > 100;
});

button.addEventListener("click", () => {
	matrixSize = parseInt(document.querySelector(".size__input").value);
	buttonClicked = true;
//	console.log(matrixSize);
	graph = new Graph(matrixSize);

	let graphLine = '<h2>Граф</h2>';
	for (let i = 0; i < matrixSize; i++) {

		graphLine += `<div class="graph-line">`
		for (let j = 0; j < matrixSize; j++) {
			graphLine += `<div class="graph-node" id="${graph.M[i][j]}"></div>`
		}
		graphLine += "</div>"
	}
	let G = document.querySelector(".graph");
	G.innerHTML = "";
	G.innerHTML += graphLine;
	graph.noWayNodes.forEach((nodeNumber) => {
		let node = document.querySelector(`[id="${nodeNumber}"]`);
		setTimeout(()=>{node.classList.add( "no-way-node");}, 500);
	})

	let start = document.querySelector(`[id="${graph.start}"]`);
	start.classList.add("start");

	let finish = document.querySelector(`[id="${graph.finish}"]`);
	finish.classList.add("finish");

	for (let editButton of editButtons) {
		editButton.disabled = false;
	}
});

let startEditNoWay = document.querySelector("#start-no-way-node");
startEditNoWay.addEventListener("click", () => {
	
});