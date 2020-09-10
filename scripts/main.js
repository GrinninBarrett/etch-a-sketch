// Declare buttons
let gridContainer = document.querySelector("#grid-container");
const resizeButton = document.querySelector(".resize");
const clear = document.querySelector(".clear");
const blackPen = document.querySelector(".black");
const rainbowPen = document.querySelector(".rainbow");
const pencil = document.querySelector(".pencil");
const gridStatus = document.querySelector(".status");

// Declare initial values
let penColor = "#000";
let gridSidesLength = 16;
let maxGridSize;
let screen = window.matchMedia("(max-width: 700px)");
if (screen.matches) {
    maxGridSize = 400;
} else {
    maxGridSize = 600;
}
let grid;
let cellSize;
let cell;

resizeButton.addEventListener("click", resizeGrid);
clear.addEventListener("click", clearGrid);

function getCellSize() {
    let cellSize = (maxGridSize / gridSidesLength) + "px";
    return cellSize;
}

function generateGrid(gridSidesLength) {
    cellSize = getCellSize(maxGridSize, gridSidesLength);

    gridContainer.style['grid-template'] =
        `repeat(${gridSidesLength}, ${cellSize}) / repeat(${gridSidesLength}, ${cellSize})`;

    for (let i = 0; i < gridSidesLength; i++) {
        for (let j = 0; j < gridSidesLength; j++) {
            cell = document.createElement("div");
            cell.classList.add("cell");
            gridContainer.appendChild(cell);
        }
    }
    gridStatus.textContent = `Current grid dimensions: ${gridSidesLength} x ${gridSidesLength}`;
}

function draw() {
    grid = document.querySelectorAll(".cell");

    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener("mouseover", function() {
            grid[i].style.backgroundColor = penColor;
        });
    }
}

function clearGrid() {
    grid = document.querySelectorAll(".cell");
    for (let i = 0; i < grid.length; i++) {
        grid[i].style.backgroundColor = "#FFF";
    }
}

function resizeGrid() {
    gridSidesLength = prompt("Enter a number between 1 and 100");
    if (gridSidesLength > 100 || gridSidesLength < 1) {
        if (typeof(gridSidesLength) !== "object") {
            alert("Try again - that's not within range!");
        }
    } else {
        while (gridContainer.hasChildNodes()) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        generateGrid(gridSidesLength);
        draw();
    }
}

generateGrid(gridSidesLength);
draw();