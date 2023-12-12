import React from "react";
import Image from "next/image";
import loaderImage from "../../../public/images/loader.svg";
import "../../styles/globals.css";
import styles from "./styles/loader.module.css";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Image src={loaderImage} alt="Loading image" />
        </div>
    );
};

export default Loader;
