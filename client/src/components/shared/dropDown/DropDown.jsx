"use cleint";
import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import { ClickOutsideComponent } from "../ClickoutSideComponent/ClickoutSideComponent";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const DropDown = ({
    className = '',
    options = [],
    placeholder = "select an a option",
    currentValue,
    callBack,
}) => {
    const [open, setOpen] = useState(false);



    return (
        <ClickOutsideComponent onClickOutside={() => setOpen(false)}>
            <div
                onClick={() => setOpen(!open)}
                className={`${styles.dropDown} ${className} dropDown`}
                open={open}
            >
                {currentValue ? (
                    <h1 className={styles.title}>{currentValue}</h1>
                ) : (
                    <h1 className={styles.placeholder}> {placeholder}</h1>
                )}
                <div open={open} className={styles.icon}>
                    <ArrowBackIosNewIcon />
                </div>
                {open ? (
                    <ul className={`${styles.options} options `}>
                        {options?.map((item, index) => (
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

export default DropDown;
