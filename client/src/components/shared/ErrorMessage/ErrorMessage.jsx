import styles from './ErrorMessage.module.css'
const ErrorMessage = ({ message }) => {
    return (
        <span className={`${styles.message}   t-f-cap ml10 flex al-i-c gap5`}>
            {message ? message : ""}
        </span>
    );
};

export default ErrorMessage;
