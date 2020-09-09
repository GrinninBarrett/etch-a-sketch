// Declare buttons
let gridContainer = document.querySelector("#grid-container");
const resizeButton = document.querySelector(".resize");
const clear = document.querySelector(".clear");
const blackPen = document.querySelector(".black");
const rainbowPen = document.querySelector(".rainbow");
const pencil = document.querySelector(".pencil");

// Declare initial values
let penColor = "#000";
let gridSidesLength = 16;
let maxGridSize = 500;
let cell;

clear.addEventListener("click", generateGrid);

resizeButton.addEventListener("click", () => {
    gridSides = prompt("Enter a number between 1 and 100");
    generateGrid();
});

function generateGrid() {
    let cellSize = (maxGridSize / gridSidesLength) + "px";

    gridContainer.style["grid-template"] =
     `repeat(${gridSidesLength}, ${cellSize}) / repeat(${gridSidesLength}, ${cellSize})`;

    for (let i = 0; i < gridSidesLength; i++) {
        for (let j = 0; j < gridSidesLength; j++){
            cell = document.createElement("div");
            cell.classList.add("cell");
            gridContainer.appendChild(cell);
        }
    }
}