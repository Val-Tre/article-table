import countAliveNeighbors from "./countAliveNeighbors";
import { CellState } from "../types/types";

// apply game rules
const applyRules = (grid: number[][]) => {
    const newGrid = [];

    for (let i = 0; i < grid.length; i++) {
        const newRow = [];
        for (let j = 0; j < grid[i].length; j++) {
            const liveNeighbors = countAliveNeighbors(grid, i, j);
            const currentCell = grid[i][j];

            if (currentCell === CellState.ALIVE) {
                // Rule 1: Any live cell with fewer than two live neighbors dies
                // Rule 2: Any live cell with two or three live neighbors lives on
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newRow.push(CellState.DEAD);
                } else {
                    newRow.push(CellState.ALIVE);
                }
            } else {
                // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell
                if (liveNeighbors === 3) {
                    newRow.push(CellState.ALIVE);
                } else {
                    newRow.push(CellState.DEAD);
                }
            }
        }
        newGrid.push(newRow);
    }

    return newGrid;
};

export default applyRules;
