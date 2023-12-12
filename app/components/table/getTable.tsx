import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable, {
    TableColumn,
    ExpanderComponentProps,
} from "react-data-table-component";
import parse from "html-react-parser";
import { TypeGetTableProps, TypeApiResponse, TypeNewDataArray } from "./types/types";
import Loader from "../loader/loader";
import configData from "../../config.json";
import "../../styles/globals.css";
import buttonStyles from "../../styles/button.module.css";
import styles from "./styles/table.module.css";
import customTableStyles from "./styles/customTableStyles";

const GetTable: React.FC<TypeGetTableProps> = ({ apiLimit }) => {
    const apiLimitString = "?limit=" + apiLimit;
    const router = useRouter();
    const [data, setData] = useState<TypeNewDataArray[] | null>(null);
    const [expandedRows, setExpandedRows] = useState<{
        [key: string]: boolean;
    }>({});
    const tableHeadings = ["Firstname", "Surname", "Sex", "Date", "Phone"];

    function addSpaceAfterCountryCode(inputString: string) {
        var regex = /^(\+\d{1,3})(\d{3})/;
        var match = inputString.match(regex);

        if (match) {
            return inputString.replace(match[1], match[1] + " ");
        } else {
            return inputString;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<TypeApiResponse>(
                    configData.API_URL + configData.LIST_PATH + apiLimitString
                );
                const userData: TypeApiResponse = response.data;

                const newDataArray: TypeNewDataArray[] = userData.list.map(
                    (item) => {
                        const formattedDate = new Date(item.date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "."); // Replace slashes with dots

                        return {
                            id: item.id,
                            firstname: item.firstname,
                            surname: item.surname,
                            sex: item.sex === "m" ? "male" : "female",
                            date: formattedDate,
                            phone: addSpaceAfterCountryCode(item.phone),
                            image: item.image.small,
                            intro: item.intro,
                        };
                    }
                );

                setData(newDataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [apiLimitString]);

    const columns: TableColumn<TypeNewDataArray>[] = [
        {
            name: "Firstname",
            selector: (row) => row.firstname,
            sortable: true,
        },
        {
            name: "Surname",
            selector: (row) => row.surname,
            sortable: true,
        },
        {
            name: "Sex",
            selector: (row) => row.sex,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: false,
        },
    ];

    const handleRowClicked = (row: TypeNewDataArray) => {
        const newRowState = { [row.id]: !expandedRows[row.id] };
        setExpandedRows(newRowState);
    };

    return (
        <div>
            {data ? (
                <div className={styles.tableWrapper}>
                    <DataTable
                        // theme="dark"
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover
                        striped
                        noContextMenu
                        noHeader
                        pointerOnHover
                        responsive
                        subHeaderWrap
                        customStyles={customTableStyles}
                        onRowClicked={handleRowClicked}
                        expandOnRowClicked
                        expandableRows
                        expandableRowsHideExpander
                        expandableRowExpanded={(row) => expandedRows[row.id]}
                        expandableRowsComponent={(
                            props: ExpanderComponentProps<TypeNewDataArray>
                        ) => (
                            <div className={styles.previewSection}>
                                <div
                                    className={styles.previewImage}
                                    style={{
                                        backgroundImage: `url(${props.data.image})`,
                                    }}
                                    title={`Image for ${props.data.firstname} ${props.data.surname}`}
                                />
                                <div className={styles.previewSide}>
                                    <div>{parse(props.data.intro)}</div>
                                    <button
                                        className={buttonStyles.button}
                                        onClick={() => {
                                            router.push(
                                                `/article/${props.data.id}`
                                            );
                                        }}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default GetTable;
