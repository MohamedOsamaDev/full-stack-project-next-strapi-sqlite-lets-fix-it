"use cleint";
import { useEffect, useState } from "react";
import styles from "./DropDownSearch.module.css";
import { ClickOutsideComponent } from "../ClickoutSideComponent/ClickoutSideComponent";
import SearchIcon from "@mui/icons-material/Search";
const DropDownSearch = ({
    className = "",
    options = [],
    placeholder = "select an a option",
    currentValue = "",
    callBack,
}) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        setInputValue(currentValue);
    }, [currentValue]);
    return (
        <ClickOutsideComponent onClickOutside={() => setOpen(false)}>
            <div
                onClick={() => setOpen(!open)}
                className={`${styles.dropDown} ${className} dropDown-search`}
                open={open}
            >
                <input
                    className={styles.searchInput}
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    value={inputValue}
                />

                <div open={open} className={styles.icon}>
                    <SearchIcon />
                </div>
                {open ? (
                    <ul className={`${styles.options} options `}>
                        {options
                            ?.filter(
                                (val) =>
                                    !inputValue ||
                                    val.toLowerCase().includes(inputValue) ||
                                    options.includes(inputValue)
                            )
                            .map((item, index) => (
                                <li
                                    className={`${styles.option} ShowSmoothEffect`}
                                    key={index}
                                    onClick={() => callBack(item)}
                                >
                                    {item}
                                </li>
                            ))}
                    </ul>
                ) : (
                    ""
                )}
            </div>
        </ClickOutsideComponent>
    );
};

export default DropDownSearch;
