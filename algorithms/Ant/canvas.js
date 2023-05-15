const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const container = document.querySelector(".container");
canvas.width = container.clientWidth - 2;
canvas.height = container.clientWidth - 2;

let vertexes = [];
let size = canvas.width;

canvas.addEventListener('click', mouseClick);
document.getElementById("clear").onclick = Clear;

function Clear(){
    context.beginPath()
    context.clearRect(0, 0, size, size)
    vertexes = []
    context.closePath()
}

function mouseClick(e){
    let clientX = e.pageX - e.target.offsetLeft;
    let clientY = e.pageY - e.target.offsetTop;

    context.beginPath();
    if (vertexes.length >= 1){
        for(let vert of vertexes){
            let vertX = vert[0];
            let vertY = vert[1];

            let vector = [clientX - vertX , clientY - vertY];
            let s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
            context.moveTo(vertX + vector[0] * 10 / s, vertY + vector[1] * 10 / s);

            context.lineTo(clientX, clientY);
            context.strokeStyle = '#70b8ff';
            context.stroke();
        }
    }

    context.beginPath();
    context.arc(clientX, clientY, 10, 0, 2*Math.PI, false);
    context.fillStyle = '#a8a1a1';
    context.fill();

    vertexes.push([clientX, clientY]);
    redrawVertexes();
}

function redrawVertexes(){
    for (let i = 0; i < vertexes.length; ++i){
        context.beginPath();
        context.arc(vertexes[i][0], vertexes[i][1], 10, 0, 2*Math.PI, false);
        context.fillStyle = '#a8a1a1';
        context.fill();
    }
}

function drawTheLines(from, to){
    let a = from.slice()
    a.push(a[0].slice())

    for (let i = 0; i < a.length - 1; ++i){
        context.beginPath();
        let vector = [a[i + 1][0] - a[i][0] , a[i + 1][1] - a[i][1]];
        let s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);

        context.moveTo(a[i][0] + vector[0] * 10 / s, a[i][1] + vector[1] * 10 / s);
        context.lineTo(a[i + 1][0] - vector[0] * 10 / s, a[i + 1][1] - vector[1] * 10 / s);
        context.strokeStyle = "rgb(255,255,255)";
        context.lineWidth = 2;
        context.stroke();

        context.moveTo(a[i][0] + vector[0] * 10 / s, a[i][1] + vector[1] * 10 / s);
        context.lineTo(a[i + 1][0] - vector[0] * 10 / s, a[i + 1][1] - vector[1] * 10 / s);
        context.strokeStyle = "rgba(243,243,243,0.34)";
        context.lineWidth = 1;
        context.stroke()
    }

    let b = to.slice();
    b.push(b[0].slice())

    for (let i = 0; i < b.length - 1; ++i){
        context.beginPath();
        let vector = [b[i + 1][0] - b[i][0] , b[i + 1][1] - b[i][1]];
        let s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
        context.moveTo(b[i][0] + vector[0] * 10 / s, b[i][1] + vector[1] * 10 / s);
        context.lineTo(b[i + 1][0] - vector[0] * 10 / s, b[i + 1][1] - vector[1] * 10 / s);
        context.strokeStyle = "rgb(250,47,47)";
        context.lineWidth = 1;
        context.stroke();
    }

}

function drawFinishPath(bestPath){
    bestPath.push(bestPath[0].slice());
    for (let i = 0; i < bestPath.length - 1; ++i){
        context.beginPath();
        let vector = [bestPath[i + 1][0] - bestPath[i][0] , bestPath[i + 1][1] - bestPath[i][1]];
        let s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);

        context.moveTo(bestPath[i][0] + vector[0] * 10 / s, bestPath[i][1] + vector[1] * 10 / s);
        context.lineTo(bestPath[i + 1][0] - vector[0] * 10 / s, bestPath[i + 1][1] - vector[1] * 10 / s);
        context.strokeStyle = "rgb(255,255,255)";
        context.lineWidth = 2;
        context.stroke();

        context.moveTo(bestPath[i][0] + vector[0] * 10 / s, bestPath[i][1] + vector[1] * 10 / s);
        context.lineTo(bestPath[i + 1][0] - vector[0] * 10 / s, bestPath[i + 1][1] - vector[1] * 10 / s);
        context.strokeStyle = "rgb(47,250,47)";
        context.lineWidth = 1;
        context.stroke()
    }
}