"use client";

import React from "react";
import GetTable from "../components/table/getTable";
import "../styles/globals.css";
import styles from "../styles/page.module.css";

export default function TablePage() {
    const elementLimit = 150;

    return (
        <>
            <h1 className={`${styles.title} ${styles.withSpacing}`}>
                Name table
            </h1>

            <GetTable apiLimit={elementLimit} />
        </>
    );
}
