
const startButton = document.querySelector("#start");
startButton.disabled = true;

const canvas = document.querySelector("canvas");

let points = [];
function createPoints(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  let point = new Point(x, y);
  points.push(point);
  point.draw();
  startButton.disabled = false;
}

canvas.addEventListener("click", createPoints);


function start() {
  let obj = generativeAlgorithm(points, 2, points.length);
  console.log("dfsdfd", obj);
}


startButton.addEventListener("click", start);
