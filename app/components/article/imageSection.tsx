import React from "react";
import { TypeImageSection } from "./types/types";
import "../../styles/globals.css";
import styles from "./styles/article.module.css";

const ImageSection: React.FC<TypeImageSection> = ({
    srcLarge,
    srcSmall,
    alt,
    title,
}) => {
    return (
        <div className={styles.imageSection}>
            <div
                className={styles.image}
                style={{ backgroundImage: `url(${srcLarge})` }}
                title={alt}
            />

            <div className={styles.titleSection}>{title}</div>

            <div className={`${styles.blurredImage} ${styles.noOverflow}`}>
                <div
                    className={`${styles.expandedBlurredImage} ${styles.blur}`}
                    style={{ backgroundImage: `url(${srcSmall})` }}
                    title={alt}
                />
            </div>
        </div>
    );
};

export default ImageSection;
