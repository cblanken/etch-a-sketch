// Etch-a-Sketch 
const gridWidth = 32;
const gridHeight = 32;

const gridContainer = document.querySelector("#grid-container");

function generateGrid(root, width, height) {
    // Create 2d array for grid
    let grid = Array.from(Array(width), () => new Array(height));
    // Create elements for each grid cell
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = document.createElement("div");
            cell.classList.add("square");
            grid.push(cell);

            cell.addEventListener("mouseover", mouseover);
            root.appendChild(cell);
        }
    }
    
    return grid;
}

function mouseover(e) {
    if ("drawn-over" in e.target.classList === false) {
       e.target.classList.add("drawn-over") 
    }
}

function updateGridCell(grid, x, y, text) {
    grid[x][y].textContent = text; 
}

let grid = generateGrid(gridContainer, gridWidth, gridHeight)
