"use client";
import { memo } from "react";
import styles from "./Card.module.css";
import IMAGE from "@src/components/shared/image/Image";
import Link from "next/link";

const Card = memo(({ item, service }) => {

    return (
        <div className={`${styles.card} ShowSmoothEffect`}>
           {service ? <Link  className={styles.link} href={`/services/requset?q=${item?.slug}&service=${service}`}> :   </Link> : ''}
                <div className={styles.poster}>
                    <IMAGE
                        className={styles.image}
                        alt={item?.title}
                        src={process.env.NEXT_PUBLIC_UP + item?.poster?.url}
                    />
                </div>
                <div className={`${styles.info}  flex just-sb al-i-c`}>
                    <div className="right text-i-s">
                        <h1 className={styles.title}>{item?.title}</h1>
                        <p className={styles.teacher_subject}>
                            {" "}
                            +{Math.floor(Math.random() * (200 - 20 + 1)) + 20} خدمة{" "}
                        </p>
                    </div>
                    <div className={styles.icon}></div>
                </div>
        </div>
    );
});

export default Card;
