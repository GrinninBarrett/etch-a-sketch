// Declare buttons and other elements
let gridContainer = document.querySelector("#grid-container");
const startButton = document.querySelector("#start");
const resizeButton = document.querySelector(".resize");
const clear = document.querySelector(".clear");
const blackPen = document.querySelector(".black");
const rainbowPen = document.querySelector(".rainbow");
const pencil = document.querySelector(".pencil");
const buttons = document.querySelectorAll(".controls");
const gridStatus = document.querySelector(".status");

//Declare elements needed for the color-choice modal
const chooseColor = document.querySelector(".choose");
const modalRoot = document.querySelector("#modal-root");
const modal = document.querySelector("#modal");
const close = document.querySelector(".close");
const redSlider = document.querySelector("#red");
const greenSlider = document.querySelector("#green");
const blueSlider = document.querySelector("#blue");
const redOut = document.querySelector("#r_out");
const greenOut = document.querySelector("#g_out");
const blueOut = document.querySelector("#b_out");
const colorPreview = document.querySelector("#color-preview");
const customColorAccept = document.querySelector("#custom-color-accept");


// Declare other initial values
let isDrawing = false;
let penColor = "#000";
let rValue = redSlider.value;
let gValue = greenSlider.value;
let bValue = blueSlider.value;
let gridSidesLength = 16;
let gridSize;
let grid;
let cellSize;
let cell;
let lastSelection;
let darkness;
let maxGridSize = function() {
    if (window.innerWidth <= 700) {
        gridSize = 350;
    } else if (window.innerWidth > 700) {
        gridSize = 600;
    }
    return gridSize;
}

//Set timeout to improve performance when resizing window
let timeout;
window.addEventListener("resize", () => {
    if (!timeout) {
        timeout = setTimeout(function () {
            timeout = null;
            generateGrid(gridSidesLength);
        }, 500);
    }
}, false);


//Add event listeners for all controls
startButton.addEventListener("click", () => {
    if (isDrawing) {
        stop();
        isDrawing = false;
        startButton.textContent = "Start";
        startButton.style.backgroundColor = "rgb(110, 255, 161)";
        stop();
    } else {
        draw();
        isDrawing = true;
        startButton.textContent = "Stop";
        startButton.style.backgroundColor = "rgb(255, 100, 110)";
        draw();
    }
});
blackPen.addEventListener("click", blackStart);
rainbowPen.addEventListener("click", rainbowStart);
pencil.addEventListener("click", pencilStart);
clear.addEventListener("click", clearGrid);
resizeButton.addEventListener("click", resizeGrid);
chooseColor.addEventListener("click", () => {
    customColorStart();
    modalRoot.style.display = "flex";
    modal.style.display = "block";
});

//Use slider input to change printed value beside sliders and color of colorPreview
redSlider.addEventListener("input", () => {
    r_out.textContent = redSlider.value;
    getCustomColor();
});
greenSlider.addEventListener("input", () => {
    g_out.textContent = greenSlider.value;
    getCustomColor();
});
blueSlider.addEventListener("input", () => {
    b_out.textContent = blueSlider.value;
    getCustomColor();
});

//Close modal one of three ways
close.addEventListener("click", () => {
    modalRoot.style.display = "none";
    modal.style.dispaly = "none";
});
modalRoot.addEventListener("click", function(event) {
    if (event.target == modalRoot) {
        modalRoot.style.display = "none";
        modal.style.dispaly = "none";
    }
});
customColorAccept.addEventListener("click", () => {
    modalRoot.style.display = "none";
    modal.style.dispaly = "none";
    stop();
});

//Black pen
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
    if (isDrawing) {
        draw();
    }
}

//Rainbow pen
function rainbowStart() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", shadeCells);
        grid[i].addEventListener("mouseover", getRainbowColors);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }
    rainbowPen.classList.add("last-chosen");
    lastSelection = "rainbow";
    if (isDrawing) {
        draw();
    }
}
let getRainbowColors = function() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    penColor = `rgb(${r}, ${g}, ${b})`;
};

//Pencil
function pencilStart() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", getRainbowColors);
        grid[i].addEventListener("mouseover", shadeCells);
        grid[i].setAttribute("darknessCounter", 240);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }
    pencil.classList.add("last-chosen");
    lastSelection = "pencil";
    if (isDrawing) {
        draw();
    }
}
let shadeCells = function() {
    darkness = this.getAttribute("darknessCounter");
    darkness -= 24;
    penColor = `rgb(${darkness}, ${darkness}, ${darkness})`;
    this.setAttribute("darknessCounter", darkness);
}

//Custom color picker
function customColorStart() {

    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", getRainbowColors);
        grid[i].removeEventListener("mouseover", shadeCells);
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("last-chosen");
    }
    chooseColor.classList.add("last-chosen");
    lastSelection = "customColor";
    getCustomColor();
    if (isDrawing) {
        draw();
    }
}
let getCustomColor = function() {
    rValue = redSlider.value;
    gValue = greenSlider.value;
    bValue = blueSlider.value;
    colorPreview.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
    penColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
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
    } else if (lastSelection === "customColor") {
        customColorStart();
    } else {
        blackStart();
    }
    gridStatus.textContent = `Current grid dimensions: ${gridSidesLength} x ${gridSidesLength}`;
}
function getCellSize() {
    let cellSize = (maxGridSize() / gridSidesLength) + "px";
    return cellSize;
}


function draw() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener("mouseover", function() {
            grid[i].style.backgroundColor = penColor;
        });  
    }
}

function stop() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener("mouseover", function() {
            grid[i].style.backgroundColor = penColor;
        });
        grid[i].removeEventListener("mouseover", getRainbowColors);
        grid[i].removeEventListener("mouseover", shadeCells);
    }
}


function clearGrid() {
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
        while (gridContainer.hasChildNodes()) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        generateGrid(gridSidesLength);
    }
}


generateGrid(gridSidesLength);
