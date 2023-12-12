import { CellState } from "../types/types";

/**
 * Counts the number of alive neighbors for a given cell in a 2D grid.
 *
 * @param {number[][]} grid - The 2D array representing the grid of cell states.
 * @param {number} row - The row index of the target cell.
 * @param {number} col - The column index of the target cell.
 * @returns {number} - The number of alive neighbors for the target cell.
 */
const countAliveNeighbors = (
    grid: number[][],
    row: number,
    col: number
): number => {
    /**
     * Checks if the given coordinates are inside the grid boundaries.
     *
     * @param {number} r - The row index.
     * @param {number} c - The column index.
     * @returns {boolean} - True if the coordinates are inside the grid, false otherwise.
     */
    const isInsideGrid = (r: number, c: number): boolean =>
        r >= 0 && r < numRows && c >= 0 && c < numCols;

    /**
     * Represents the possible directions to check for neighbors.
     * @type {{row: number, col: number}[]}
     */
    const directions = [
        { row: -1, col: -1 }, // top left
        { row: -1, col: 0 }, // top middle
        { row: -1, col: 1 }, // top right
        { row: 0, col: -1 }, // same left
        { row: 0, col: 1 }, // same right
        { row: 1, col: -1 }, // bottom left
        { row: 1, col: 0 }, // bottom middle
        { row: 1, col: 1 }, // bottom right
    ];

    /**
     * The number of rows in the grid.
     * @type {number}
     */
    const numRows = grid.length;

    /**
     * The number of columns in the grid.
     * @type {number}
     */
    const numCols = grid[0].length;

    /**
     * The count of alive neighbors.
     * @type {number}
     */
    let aliveNeighbors = 0;

    // Iterate through each direction and count alive neighbors
    directions.forEach((direction) => {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (
            isInsideGrid(newRow, newCol) &&
            grid[newRow][newCol] === CellState.ALIVE
        ) {
            aliveNeighbors++;
        }
    });

    return aliveNeighbors;
};

export default countAliveNeighbors;
