import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "./inputs/dropdown";
import Button from "./inputs/button";
import applyRules from "./utils/applyRules";
import { TypeGridProps, CellState } from "./types/types";
import styles from "./styles/gameoflife.module.css";

const Grid: React.FC = () => {
    const widthValues = [10, 20, 30, 40, 50, 60, 70];
    const heightValues = [10, 20, 30, 40, 50];
    const speedValues = [30, 60, 120];
    const initialLifeProbabilityValues = [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    ];

    const [gridProps, setGridProps] = useState<TypeGridProps>({
        width: 70,
        height: 30,
        speed: 60,
        life: 0.5,
    });
    
    const [initialGrid, setInitialGrid] = useState<number[][]>([]);
    const [initialIteration, setInitialIteration] = useState(true);
    const [isRunning, setIsRunning] = useState(true);
    const [iteration, setIteration] = useState(0);
    const totalGridCount = initialGrid.flat().length;
    const aliveCount = countOnesInGrid(initialGrid);
    const alivePercent = ((aliveCount / totalGridCount) * 100).toFixed(1);

    // Fill the grid with initial values
    const fillGrid = () => {
        const newGrid = Array.from({ length: gridProps.height }, () =>
            Array.from({ length: gridProps.width }, () =>
                Math.random() < gridProps.life
                    ? CellState.ALIVE
                    : CellState.DEAD
            )
        );
        setInitialGrid(applyRules(newGrid));
    };

    // Count 1's (ALIVE) in the grid
    function countOnesInGrid(grid: number[][]): number {
        // Flatten the grid array and use reduce to count the number of 1's
        return grid
            .flat()
            .reduce((count, cell) => count + (cell === 1 ? 1 : 0), 0);
    }

    // Handlers
    const handleGridPropChange = useCallback(
        (property: string, value: number) => {
            setGridProps((prevProps) => ({ ...prevProps, [property]: value }));
        },
        []
    );

    const handleIteration = () => {
        setIteration((prevIteration) => prevIteration + 1);
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleApplyNewGridProps = () => {
        setInitialIteration(true);
        setIsRunning(true);
    };

    useEffect(() => {
        handleIteration();
    }, [isRunning, gridProps.speed]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        // Run on initial/first iteration
        if (initialIteration) {
            setInitialIteration(false);
            fillGrid();
        }

        // Update grid with the game rules
        setInitialGrid((prevGrid) => applyRules(prevGrid));

        if (isRunning) {
            intervalId = setInterval(() => {
                setIteration((prevIteration) => prevIteration + 1);
            }, gridProps.speed);
        }

        return () => clearInterval(intervalId);
    }, [iteration]);

    return (
        <>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className={styles.formContent}>
                    <Dropdown
                        label="Grid Width"
                        valuesArray={widthValues}
                        defaultValue={gridProps.width}
                        type="width"
                        onChange={handleGridPropChange}
                    />
                    <Dropdown
                        label="Grid Height"
                        valuesArray={heightValues}
                        defaultValue={gridProps.height}
                        type="height"
                        onChange={handleGridPropChange}
                    />
                    <Dropdown
                        label="Speed"
                        valuesArray={speedValues}
                        defaultValue={gridProps.speed}
                        type="speed"
                        onChange={handleGridPropChange}
                    />
                    <Dropdown
                        label="Initial Life Probability"
                        valuesArray={initialLifeProbabilityValues}
                        defaultValue={gridProps.life}
                        type="life"
                        onChange={handleGridPropChange}
                    />

                    <Button
                        text={isRunning ? "Pause" : "Resume"}
                        onClick={handleStartStop}
                    />
                    <Button text="Apply" onClick={handleApplyNewGridProps} />
                </div>
            </form>

            <div className={styles.barWrapper}>
                <span>Currently alive</span>
                <div className={styles.bar}>
                    <div
                        className={styles.barPercent}
                        style={{ width: alivePercent + "%" }}
                    >
                        <span className={styles.barSpan}>{alivePercent}%</span>
                    </div>
                </div>
            </div>

            <table className={styles.gameTable}>
                <tbody>
                    {initialGrid.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td
                                    className={`${styles.gameCell} ${
                                        cell === 1
                                            ? styles.gameAlive
                                            : styles.gameDead
                                    }`}
                                    key={colIndex}
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Grid;
