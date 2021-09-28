// Etch-a-Sketch 

// Grid setup
const gridWidth = 8;
const gridHeight = 8;
const gridContainer = document.querySelector("#grid-container");

// Generate default grid
// NOTE: Cells can be referenced as grid[row][column]
let grid = generateGrid(gridContainer, gridWidth, gridHeight)
let drawnOverCells = [];

function generateGrid(container, width, height) {
    // Create 2d array for grid
    let grid = Array.from(Array(width), () => new Array(height));
    // Create elements for each grid cell
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            addCell(container, grid, x, y);
        }
    }
    
    return grid;
}

function addCell(container, grid, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("square");
    grid[x][y] = cell;

    cell.addEventListener("mouseover", mouseover);
    container.appendChild(cell);

    return grid;
}

function clearGrid() {
    gridContainer.innerHTML = ""
    grid.length = 0;
}

function removeCell(container, x, y) {
    const offset = x * (y - 1) + y;
    cell = document.querySelectorAll("#grid-container div")[offset];
    cell.remove();
}

function updateSketchPad(container, grid) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
        // TODO: update divs with grid param 
    }
}

function mouseover(e) {
    if (e.target.classList.contains("drawn-over") === false) {
        e.target.classList.add("drawn-over");
        drawnOverCells.push(e.target);
    }
}

function updateGridCell(grid, x, y, text) {
    grid[x][y].textContent = text; 
}

function eraseGridCell(cell) {
    if (cell.classList.contains("drawn-over")) {
        cell.classList.remove("drawn-over");
    }
}

// UI setup
function eraseGrid() {
    drawnOverCells.forEach(cell => eraseGridCell(cell)); 
    drawnOverCells.length = 0;
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", eraseGrid);

function addGridCol() {
    for (let x = 0; x < grid.length; x++) {
        grid[x].push();
        //addCell(gridContainer, grid, grid.length - 1, y);
        // TODO: link css width and height variables
    }
}

function addGridRow() {
    grid.push(new Array(grid[0].length));
    for (let y = 0; y < grid[0].length; y++) {
        addCell(gridContainer, grid, grid.length - 1, y);
        // TODO: link css width and height variables
    }
}

function removeGridCol() {

}

function removeGridRow() {
     
}

function resizeGrid(width, height) {
    try {
        const html = document.querySelector("html");
        console.log("Resizing grid...");
        const xDiff = width - gridWidth;
        const yDiff = height - gridHeight;
        console.log(`Diff: ${xDiff}, ${yDiff}`);
        
        clearGrid();
        grid = generateGrid(gridContainer, width, height);
        html.style.setProperty('--grid-width', width);
        html.style.setProperty('--grid-height', height);
    }
    catch (e) {
        alert(`${e}\nEnter valid dimensions before resizing.`); 
    }
}

function handleResizeClick(e) {
    e.preventDefault(); // default behavior includes reloading the page
    const width = Number(document.querySelector("#width-input").value);
    const height = Number(document.querySelector("#height-input").value);
    resizeGrid(width, height);
}

const resizeButton = document.querySelector("#resize-button");
resizeButton.addEventListener("click", handleResizeClick);

