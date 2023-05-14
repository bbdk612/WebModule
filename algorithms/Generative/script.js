
const startButton = document.querySelector("button.start");
startButton.disabled = true;

const canvas = document.querySelector("canvas");

let points = [];
let counter = 0;

const createPoints = (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let point = new Point(x, y, counter);
  points.push(point);
  point.draw();
  startButton.disabled = false;
  counter++;
}

canvas.addEventListener("click", createPoints);


const start = () => {
  startButton.disabled = true
  let numOfIters = parseInt(document.querySelector("input#numberOfIterations").value);
  let numberOfIndividuals = parseInt(document.querySelector("input#numberOfIndividuals").value)
  let obj = generativeAlgorithm(points, numOfIters, numberOfIndividuals);
  // console.log("dfsdfd", numbe);
  const pointNumbers = obj.path
  const lengthOfWeight = obj.ofExile
  let i = 1;
  const myInterval = setInterval(() => {
    let point = points[pointNumbers[(i === 0) ? (pointNumbers.length - 1) : (i - 1)]]
    let point1 = points[pointNumbers[i]];
    let ctx = document.querySelector("canvas").getContext("2d")
    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.lineTo(point1.x, point1.y)
    ctx.stroke()
    ctx.closePath()
    i++;
    if (i == 1) {
      clearInterval(myInterval)
    }
    if (i === (pointNumbers.length)) {
      i = 0;
    }
  }, 100)

}
startButton.addEventListener("click", start);

const clearFieldButton = document.querySelector("button.clearField")
const clearField = () => {
  const ctx = document.querySelector("canvas").getContext("2d")
  ctx.beginPath()
  ctx.clearRect(0, 0, 500, 500)
  ctx.closePath()
  points = new Array()
}

clearFieldButton.addEventListener("click", clearField)

const clearPathButton = document.querySelector("button.clearPath")
const clearLines = (points) => {
  const ctx = document.querySelector("canvas").getContext("2d")
  startButton.disabled = false
  ctx.beginPath()
  ctx.clearRect(0, 0, 500, 500)
  for (let point of points){
    point.draw()
  }
  ctx.closePath()
}

clearPathButton.addEventListener("click", () => {
  clearLines(points)
})
