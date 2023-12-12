import { TypeDropdownProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/gameoflife.module.css";

library.add(faChevronDown);

const Dropdown: React.FC<TypeDropdownProps> = ({
    label,
    valuesArray,
    defaultValue,
    type,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectedValue = +e.currentTarget.value;

        onChange(type, selectedValue);
    };

    // render options
    const renderOptions = () => {
        return valuesArray.map((value) => (
            <option
                key={value.toString()}
                value={type === "life" ? value / 100 : value}
            >
                {type === "speed" &&
                    (value === 60 ? "Normal" : value < 60 ? "Fast" : "Slow")}
                {type === "life" && `${value}%`}
                {(type === "width" || type === "height") && value}
            </option>
        ));
    };

    return (
        <div className={styles.formItem}>
            <label>{label}</label>
            <select
                value={defaultValue}
                onChange={handleChange}
                className={styles.select}
            >
                {renderOptions()}
            </select>

            <div className={styles.chevronIconWrapper}>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
        </div>
    );
};

export default Dropdown;
