let labirinth;

let size = 5;
let noWayNodes = new Set();

let matrix = Array();
let count = 0;
for (let i = 0; i < size; i++) {
  let line = Array();
  for (let j = 0; j < size; j++) {
    count++;
    line.push(count);
  }
  matrix.push(line);
}

console.log(matrix);

let randInt = (max, min = 0) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

const getCoordinates = (nodeNumber) => {
  let x = Math.floor((nodeNumber - 1) / size);
  let y = nodeNumber % size;

  return {x, y};
}

const getNeibours = (nodeNumber) => {
  let x = Math.floor((nodeNumber - 1) / size);
  let y = nodeNumber % size;

  let neibours = [];
  if (x == 0) {
    neibours.push(matrix[x+2][y]);
  } else if (x + 2 >= size - 1) {
    neibours.push(matrix[x - 2][y]);
  } else {
    neibours.push(matrix[x - 2][y], matrix[x + 2][y]);
  }

  if (y == 0) {
    neibours.push(matrix[x][y + 2]);
  } else if (y + 2 >= size - 1) {
    neibours.push(matrix[x][y - 2]);
  } else {
    neibours.push(matrix[x][y - 2], matrix[x][y + 2]);
  }
};

const createBaseLabir = () => {
  let graphLines = "";

  for (let i = 0; i < size; i++) {
    graphLines += "<div class='graph-line'>";
    for (let j = 0; j < size; j++) {
      if (((j % 2) != 0) || ((i % 2) != 0)) {
        graphLines += `<div class="graph-node no-way-node" id="${matrix[i][j]
          }"></div>`;
        noWayNodes.add(matrix[i][j]);
      } else {
        graphLines += `<div class="graph-node" id="${matrix[i][j]}"></div>`;
      }
    }
    graphLines += "</div>";
  }

  document.querySelector(".graph").innerHTML += graphLines;
};

createBaseLabir();

const generateLabirinth = () => {
  let visited = new Set();
  let unvisited = [1];
  
  while (unvisited.length){
    let currert = unvisited.pop();
    let neibours = getNeibours(currert);
    visited.add(currert);
    
    for (let neibour of neibours) {
      if (!visited.has(neibour) && !unvisited.includes(neibour)) {
        unvisited.push(neibour);
      }
    }
    
    
  }
};
