"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import {
    faTable,
    faImage,
    faFile,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import configData from "../../config.json";
import logoImage from "../../../public/images/logo.svg";
import styles from "./styles/navigation.module.css";

library.add(faTable, faImage, faFile, faBars, faXmark);

const Navigation = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Menu toggle
    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className={styles.header}>
                <button onClick={handleMenuOpen} className={styles.navButton}>
                    <FontAwesomeIcon
                        className={styles.navButtonIcon}
                        icon={menuOpen ? faXmark : faBars}
                    />
                </button>
                <Image
                    className={styles.logo}
                    src={logoImage}
                    onClick={() => router.push("/")}
                    alt="Header logo"
                    width={103}
                    height={30}
                />
            </header>

            <nav
                className={`${styles.navigation} ${
                    menuOpen ? styles.navigationOpen : ""
                }`}
            >
                <Image
                    className={styles.logo}
                    src={logoImage}
                    onClick={() => router.push("/")}
                    alt="Side nav logo"
                    width={170}
                    height={50}
                />

                <ul className={styles.unorderedList}>
                    {configData.NAVIGATION_DATA.map((menuItem, index) => (
                        <li key={index}>
                            <Link
                                href={menuItem.url}
                                className={
                                    pathName == menuItem.url
                                        ? `${styles.link} ${styles.active}`
                                        : styles.link
                                }
                            >
                                {menuItem.title}
                                <FontAwesomeIcon
                                    className={styles.icon}
                                    icon={menuItem.icon as IconProp}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navigation;
