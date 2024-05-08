import Link from "next/link";
import styles from "./Popup.module.css";

const Popup = ({ show = false }) => {
    if (!show) return;
    return (
        <div className={`${styles.popup} ShowSmoothEffect flex-all-c`}>
            <div className={styles.popupWrapper}>
                <h1 className={styles.title}>تم ارسال طلبك</h1>
                <p className={styles.text}>سيتم التواصل معك في أقرب وقت ممكن</p>
                <div className=" flex just-sb w-90 f-column m-auto ">
                    <Link className={`${styles.link} ${styles.linkHome}`} href={"/"}>الصفحة الرئيسيه</Link>
                    <Link className={styles.link} href={"/profile/orders"}>عرض طلبات الصيانة الخاصة بك</Link>
                </div>
            </div>
        </div >
    );
};

export default Popup;
