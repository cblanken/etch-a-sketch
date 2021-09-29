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

    //cell.addEventListener("mouseover", mouseover);
    cell.addEventListener("click", click);
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
 
function click(e) {
    // Draw over cell if only left-mouse button is pressed and cell isn't colored 
    if (e.target.classList.contains("drawn-over") === false) {
        e.target.classList.add("drawn-over");
        drawnOverCells.push(e.target);
    }
}

function mouseover(e) {
    // Draw over cell if only left-mouse button is pressed and cell isn't colored 
    if ((e.buttons & 1) === 1 && e.target.classList.contains("drawn-over") === false) {
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

function resizeGrid(width, height) {
    width = width > 100 ? 100 : width;
    height = height > 100 ? 100 : height;
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

    widthInput = document.querySelector("#width-input");
    heightInput = document.querySelector("#height-input")
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    resizeGrid(width, height);
    
    widthInput.value = "";
    heightInput.value = "";
}

function updateColor() {
    document.querySelector("html").style.setProperty('--highlight', colorInput.value);

}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", eraseGrid);

const resizeButton = document.querySelector("#resize-button");
resizeButton.addEventListener("click", handleResizeClick);

const colorInput = document.querySelector("#ui-container input[type='color']");
colorInput.addEventListener("change", updateColor);


