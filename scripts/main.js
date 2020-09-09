// Declare buttons
let gridContainer = document.querySelector("#grid-container");
const resize = document.querySelector(".resize");
const clear = document.querySelector(".clear");
const blackPen = document.querySelector(".black");
const rainbowPen = document.querySelector(".rainbow");
const pencil = document.querySelector(".pencil");

// Declare initial values
let penColor = #000;
let gridSides = 16;
let maxGridSize = 500;
let cell;

clear.addEventListener("click", generateGrid);



function generateGrid() {
    let cellSize = (maxGridSize / gridSides) + "px";

    gridContainer.style["grid-template"] = `repeat(${gridSides}, ${cellSize}) / repeat(${gridSides}, ${cellSize})`;

    for (let i = 0; i < gridSides; i++) {
        for (let j = 0; j < gridSides; j++){
            cell = document.createElement("div");
            cell.classList.add("cell");
            gridContainer.appendChild(cell);
        }
    }
}

function clearGrid() {

}