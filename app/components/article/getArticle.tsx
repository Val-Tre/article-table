import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { TypeGetArticleProps, TypeApiResponse } from "./types/types";
import ImageSection from "./imageSection";
import Loader from "../loader/loader";
import configData from "../../config.json";
import "../../styles/globals.css";
import stylesPage from "../../styles/page.module.css";
import styles from "./styles/article.module.css";

const GetArticle: React.FC<TypeGetArticleProps> = ({ id }) => {
    const [data, setData] = useState<TypeApiResponse | null>(null);

    // get data for article
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<TypeApiResponse>(
                    configData.API_URL + configData.LIST_PATH + id
                );
                const userData: TypeApiResponse = response.data;
                setData(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {data ? (
                <>
                    <h1
                        className={`${stylesPage.title} ${stylesPage.withSpacing}`}
                    >
                        {data.title}
                    </h1>
                    <div className={`${styles.bold} ${stylesPage.withSpacing}`}>
                        {parse(data.intro)}
                    </div>

                    <ImageSection
                        srcLarge={data.image.large}
                        srcSmall={data.image.small}
                        title={data.image.title}
                        alt={data.image.alt}
                    />

                    <div className={styles.contentBody}>{parse(data.body)}</div>

                    {data.tags.length > 0 && (
                        <ul className={styles.tags}>
                            {data.tags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default GetArticle;
