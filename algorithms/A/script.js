let matrixSize;
let buttonClicked = false;
const button = document.querySelector(".size__button");
button.addEventListener("click", () => {
	matrixSize = parseInt(document.querySelector(".size__input").value);
	buttonClicked =  true;
//	console.log(matrixSize);
});

if (buttonClicked) {
	
}