import { Point } from "./Point.js";
import { generativeAlgorithm } from "./algorithm.js";

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
  generativeAlgorithm(points,50, points.length);
}

startButton.addEventListener("click", start);
