let editButtons = document.querySelectorAll(
	".edit__button:not(#stop-no-way-node)",
);

for (let editButton of editButtons) {
	editButton.disabled = true;
}

document.querySelectorAll(".edit__button:not(#stop-no-way-node)").disabled =
	true;

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

    let graphLine = "";
//  for (let i = 0; i < matrixSize; i++) {
//    graphLine += `<div class="graph-line">`;
//    for (let j = 0; j < matrixSize; j++) {
//      graphLine += `<div class="graph-node" id="${graph.M[i][j]}"></div>`;
//    }
//    graphLine += "</div>";
//  }
	let G = document.querySelector(".graph")
	G.innerHTML += graphLine;
//  graph.noWayNodes.forEach((nodeNumber) => {
//    let node = document.querySelector(`[id="${nodeNumber}"]`);
//    setTimeout(() => {
//      node.classList.add("no-way-node");
//    }, 500);
//  });

	let start = document.querySelector(`[id="${graph.start}"]`);
	start.classList.add("start");

	let finish = document.querySelector(`[id="${graph.finish}"]`);
	finish.classList.add("finish");

	for (let editButton of editButtons) {
		editButton.disabled = false;
	}
});

let switchNode = (event) => {
	if (event.target.classList.contains("no-way-node")) {
		event.target.classList.remove("no-way-node");
		graph.noWayNodes.splice(
			graph.noWayNodes.indexOf(parseInt(event.target.id)),
			1,
		);
	} else {
		event.target.classList.add("no-way-node");
		graph.noWayNodes.push(parseInt(event.target.id));
	}
};

let startEditNoWay = document.querySelector("#start-no-way-node");
startEditNoWay.addEventListener("click", () => {
	document.querySelectorAll("button:not(#stop-no-way-node)").forEach(
		(editButton) => {
			editButton.disabled = true;
		},
	);

	document.querySelector("button#stop-no-way-node").disabled = false;
	let nodes = document.querySelectorAll(".graph-node:not(.start):not(finish)");

	nodes.forEach((node) => {
		node.addEventListener("click", switchNode);
	});
});

let stopEditNoWay = document.querySelector("#stop-no-way-node");
stopEditNoWay.addEventListener("click", () => {
	document.querySelectorAll("button:not(#stop-no-way-node)").forEach(
		(editButton) => {
			editButton.disabled = false;
		},
	);

	document.querySelector("button#stop-no-way-node").disabled = true;
	let nodes = document.querySelectorAll(".graph-node:not(.start):not(finish)");

	nodes.forEach((node) => {
		node.removeEventListener("click", switchNode);
	});
});

let editStart = document.querySelector("button#start");
editStart.addEventListener("click", (event) => {
	let nodes = document.querySelectorAll(
		".graph-node:not(.start):not(.finish):not(.no-way-node)",
	);
	event.target.disabled = true;
	let changeStart = (event) => {
		document.querySelector(".graph-node.start").classList.remove("start");
		event.target.classList.add("start");
		graph.start = parseInt(event.target.id);
		editStart.disabled = false;
		event.target.removeEventListener("click", changeStart);
		let nodes = document.querySelectorAll(
			".graph-node:not(.start):not(.finish):not(.no-way-node)",
		);
		for (let node of nodes) {
			node.removeEventListener("click", changeStart);
		}
	}

	for (let node of nodes) {
		node.addEventListener("click", changeStart);
	}
});

let editFinish = document.querySelector("button#finish");
editFinish.addEventListener("click", (event) => {
	let nodes = document.querySelectorAll(
		".graph-node:not(.start):not(.finish):not(.no-way-node)",
	);
	event.target.disabled = true;
	let changeFinish = (event) => {
		document.querySelector(".graph-node.finish").classList.remove("finish");
		event.target.classList.add("finish");
		graph.finish = parseInt(event.target.id);
		editFinish.disabled = false;
		event.target.removeEventListener("click", changeFinish);
		let nodes = document.querySelectorAll(
			".graph-node:not(.start):not(.finish):not(.no-way-node)",
		);
		for (let node of nodes) {
			node.removeEventListener("click", changeFinish);
		}
	}

	for (let node of nodes) {
		node.addEventListener("click", changeFinish);
	}
});

let letsFuckingGo = document.querySelector("button#letsGo");
letsFuckingGo.addEventListener("click", () => {
	graph.AStarAlgoritm();
});
