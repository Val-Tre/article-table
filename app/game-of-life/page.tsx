"use client";

import React from "react";
import Grid from "../components/game-of-life/grid";
import "../styles/globals.css";
import styles from "../styles/page.module.css";

export default function GameOfLifePage() {
    return (
        <>
            <h1 className={`${styles.title} ${styles.withSpacing}`}>
                Conways Game of Life
            </h1>
            <Grid />
        </>
    );
}
