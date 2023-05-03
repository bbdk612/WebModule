let labirinth;

let size = 101;
let noWayNodes = Array();

let matrix = Array();
let count = 0;
for (let i = 0; i < size; i++) {
  let line = Array();
  for (let j = 0; j < size; j++) {
    line.push(count);
    count++;
  }
  matrix.push(line);
}

console.log(matrix);

let randInt = (max, min = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getCoordinates = (nodeNumber) => {
  let x = Math.floor((nodeNumber) / size);
  let y = nodeNumber % size;

  return { x, y };
};

const getNeibours = (nodeNumber) => {
  let x = Math.floor((nodeNumber) / size);
  let y = nodeNumber % size;
  // console.log(nodeNumber);
  // console.log(x, y);
  let neibours = [];
  if (x - 2 < 0) {
    neibours.push(matrix[x + 2][y]);
  } else if (x + 2 >= size) {
    neibours.push(matrix[x - 2][y]);
  } else {
    neibours.push(matrix[x - 2][y], matrix[x + 2][y]);
  }

  if (y - 2 < 0) {
    neibours.push(matrix[x][y + 2]);
  } else if (y + 2 >= size) {
    neibours.push(matrix[x][y - 2]);
  } else {
    neibours.push(matrix[x][y - 2], matrix[x][y + 2]);
  }

  return neibours;
};

const createBaseLabir = () => {
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

  document.querySelector(".graph").innerHTML += graphLines;
};

createBaseLabir();

const generateLabirinth = () => {
  let x = randInt(0, Math.floor(size / 2)) * 2 + 1;
  let y = randInt(0, Math.floor(size / 2)) * 2 + 1;

  noWayNodes.splice(noWayNodes.indexOf(matrix[x][y]), 1);
  document.querySelector(`[id="${matrix[x][y]}"]`).classList.remove(
    "no-way-node",
  );
  let toCheck = Array();
  let neibours = getNeibours(matrix[x][y]);
  let visited = Array();
  visited.push(matrix[x][y]);
  for (let neibour of neibours) {
    let neibourCoordinates = getCoordinates(neibour);
    toCheck.push(neibourCoordinates);
  }
  while (toCheck.length > 0) {
    // console.log(toCheck);
    let randomNeibourIndex = randInt(toCheck.length - 1, 0);
    let randomNeibour = toCheck[randomNeibourIndex];
    toCheck.splice(randomNeibourIndex, 1);
    // console.log(matrix[randomNeibour.x][randomNeibour.y]);
    visited.push(matrix[randomNeibour.x][randomNeibour.y]);
    noWayNodes.splice(
      noWayNodes.indexOf(matrix[randomNeibour.x][randomNeibour.y]),
      1,
    );
    document.querySelector(
      `[id="${matrix[randomNeibour.x][randomNeibour.y]}"]`,
    ).classList.remove(
      "no-way-node",
    );

    let directions = ["N", "S", "W", "E"];
    while (directions.length > 0) {
      let randDir = randInt(directions.length - 1, 0);
      switch (directions[randDir]) {
        case "N":
          if (
            (randomNeibour.y - 2 >= 0) &&
            (!noWayNodes.includes(matrix[randomNeibour.x][randomNeibour.y - 2]))
          ) {
            noWayNodes.splice(
              noWayNodes.indexOf(matrix[randomNeibour.x][randomNeibour.y - 1]),
              1,
            );
            document.querySelector(
              `[id="${matrix[randomNeibour.x][randomNeibour.y - 1]}"]`,
            ).classList.remove(
              "no-way-node",
            );
            directions = Array();
          }
          break;

        case "S":
          if (
            (randomNeibour.y + 2 < size) &&
            (!noWayNodes.includes(matrix[randomNeibour.x][randomNeibour.y + 2]))
          ) {
            noWayNodes.splice(
              noWayNodes.indexOf(matrix[randomNeibour.x][randomNeibour.y + 1]),
              1,
            );
            document.querySelector(
              `[id="${matrix[randomNeibour.x][randomNeibour.y + 1]}"]`,
            ).classList.remove(
              "no-way-node",
            );
            directions = Array();
          }
          break;

        case "W":
          if (
            (randomNeibour.x - 2 >= 0) &&
            (!noWayNodes.includes(matrix[randomNeibour.x - 2][randomNeibour.y]))
          ) {
            noWayNodes.splice(
              noWayNodes.indexOf(matrix[randomNeibour.x - 1][randomNeibour.y]),
              1,
            );
            document.querySelector(
              `[id="${matrix[randomNeibour.x - 1][randomNeibour.y]}"]`,
            ).classList.remove(
              "no-way-node",
            );
            directions = Array();
          }
          break;

        case "E":
          if (
            (randomNeibour.x + 2 < size) &&
            (!noWayNodes.includes(matrix[randomNeibour.x + 2][randomNeibour.y]))
          ) {
            noWayNodes.splice(
              noWayNodes.indexOf(matrix[randomNeibour.x + 1][randomNeibour.y]),
              1,
            );
            document.querySelector(
              `[id="${matrix[randomNeibour.x + 1][randomNeibour.y]}"]`,
            ).classList.remove(
              "no-way-node",
            );
            directions = Array();
          }
          break;
      }
    }

    neibours = getNeibours(matrix[randomNeibour.x][randomNeibour.y]);

    for (let neibour of neibours) {
      if (!visited.includes(neibour)) {
        let neibourCoordinates = getCoordinates(neibour);
        toCheck.push(neibourCoordinates);
      }
    }
  }
};

let start = document.querySelector("button");
start.addEventListener("click", generateLabirinth);
