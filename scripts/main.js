// Declare buttons
let gridContainer = document.querySelector("#grid-container");
const resizeButton = document.querySelector(".resize");
const clear = document.querySelector(".clear");
const blackPen = document.querySelector(".black");
const rainbowPen = document.querySelector(".rainbow");
const pencil = document.querySelector(".pencil");
const buttons = document.querySelectorAll(".controls");
const gridStatus = document.querySelector(".status");

// Declare initial values
let penColor = "#000";
let gridSidesLength = 16;
let gridSize;
let maxGridSize = function() {
    if (window.innerWidth <= 700) {
        gridSize = 350;
    } else if (window.innerWidth > 700) {
        gridSize = 600;
    }
    return gridSize;
}

let timeout;
window.addEventListener("resize", () => {
    if (!timeout) {
        timeout = setTimeout(function () {
            timeout = null;
            generateGrid(gridSidesLength);
            draw();
        }, 500);
    }
}, false);

let grid;
let cellSize;
let cell;
let lastSelection;
let darkness;

blackPen.addEventListener("click", blackStart);
rainbowPen.addEventListener("click", rainbowStart);
pencil.addEventListener("click", pencilStart);
clear.addEventListener("click", clearGrid);
resizeButton.addEventListener("click", resizeGrid);


function blackStart() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", getRainbowColors);
        grid[i].removeEventListener("mouseover", shadeCells);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }
    blackPen.classList.add("last-chosen");
    penColor = "#000";
    lastSelection = "black";
    draw();
}

function rainbowStart() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", shadeCells);
        grid[i].addEventListener("mouseover", getRainbowColors);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }    rainbowPen.classList.add("last-chosen");
    lastSelection = "rainbow";
    draw();
}

let getRainbowColors = function() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    penColor = `rgb(${r}, ${g}, ${b})`;
};

function pencilStart() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", getRainbowColors);
        grid[i].addEventListener("mouseover", shadeCells);
        grid[i].setAttribute("darknessCounter", 240);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }    pencil.classList.add("last-chosen");
    lastSelection = "pencil";
    draw();
}

let shadeCells = function() {
    darkness = this.getAttribute("darknessCounter");
    darkness -= 24;
    penColor = `rgb(${darkness}, ${darkness}, ${darkness})`;
    this.setAttribute("darknessCounter", darkness);
}

function getCellSize() {
    let cellSize = (maxGridSize() / gridSidesLength) + "px";
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
    grid = document.querySelectorAll(".cell");

    if (lastSelection === "rainbow") {
        rainbowStart();
    } else if (lastSelection === "pencil") {
        pencilStart();
    } else {
        blackStart();
    }
    gridStatus.textContent = `Current grid dimensions: ${gridSidesLength} x ${gridSidesLength}`;
}

function draw() {
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
        grid[i].setAttribute("darknessCounter", 240);
    }
}

function resizeGrid() {
    gridSidesLength = prompt("Enter a number between 1 and 100");
    if (gridSidesLength > 100 || gridSidesLength < 1) {
        if (typeof(gridSidesLength) !== "object") {
            alert("Try again - that's not within range!");
        }
    } else {
        clearGrid();
        while (gridContainer.hasChildNodes()) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        generateGrid(gridSidesLength);
        draw();
    }
}

generateGrid(gridSidesLength);
draw();