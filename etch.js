// Etch-a-Sketch 


// Grid setup
const gridWidth = 32;
const gridHeight = 32;

const gridContainer = document.querySelector("#grid-container");
let drawnOverCells = [] 

function generateGrid(container, width, height) {
    // Create 2d array for grid
    let grid = Array.from(Array(width), () => new Array(height));
    // Create elements for each grid cell
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = document.createElement("div");
            cell.classList.add("square");
            grid.push(cell);

            cell.addEventListener("mouseover", mouseover);
            container.appendChild(cell);
        }
    }
    
    return grid;
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

function resetGridCell(cell) {
    if (cell.classList.contains("drawn-over")) {
        cell.classList.remove("drawn-over");
    }
}

function resetGrid() {
    drawnOverCells.forEach(cell => resetGridCell(cell)); 
}


let grid = generateGrid(gridContainer, gridWidth, gridHeight)


// UI setup
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGrid);

