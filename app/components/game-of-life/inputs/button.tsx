import React from "react";
import { TypeButtonProps } from "../types/types";
import styles from "../../../styles/button.module.css";

const Button: React.FC<TypeButtonProps> = ({ text, onClick }) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
    };

    return (
        <div className={styles.buttonWrapper}>
            <button
                className={`${styles.button} ${styles.topMarginOnly}`}
                onClick={handleButtonClick}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
