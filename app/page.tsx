import "./styles/globals.css";
import styles from "./styles/page.module.css";

export default function Home() {
    return (
        <div className={styles.contentCentered}>
            <h1 className={`${styles.title} ${styles.highlighted}`}>
                Trinidad Wiseman
            </h1>
            <p className={styles.paragraph}>SPA proovitöö</p>
        </div>
    );
}
