const customTableStyles = {
    table: {
        style: {
            borderCollapse: "collapse",
            minWidth: "100%",
            fontSize: "1rem",
            tableLayout: "fixed",
            background: "none",
        },
    },
    rows: {
        style: {
            cursor: "pointer",
            backgroundColor: "none",

            "&:hover *": {
                color: "#000",
            },

            highlightOnHoverStyle: {
                color: "#000",
            },
        },
        stripedStyle: {
            backgroundColor: "rgba(255,255,255,.1)",
        },
    },
    headCells: {
        style: {
            background: "#333",
            color: "#fff",
            textAlign: "left",
            whiteSpace: "nowrap",
            padding: "0.625rem 1rem",
            borderBottom: "#fff 0.0625rem solid",
            fontSize: "1rem",
        },
    },
    cells: {
        style: {
            padding: "0.625rem 1rem",
            borderBottom: "#fff 0.0625rem solid",
            color: "#fff",
        },
    },
};

export default customTableStyles;
