'use client'
import Image from "next/image";
import { useState } from "react";
const IMAGE = ({ src = "", alt = "", className = "" }) => {
    console.log("🚀 ~ IMAGE ~ src:", src)
    const [show, setShow] = useState(false);
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }} className={className?.toString()}>
            <Image
                src={src}
                alt={alt}
                quality={100}
                layout="fill"
                objectFit="cover"
                loading="lazy"
                style={{ objectPosition: "0% 50%" }}
                className="blurring-image"
                data-loaded={show}
                onLoad={() => setShow(true)}
                sizes="(max-width: 640px) 400px,
                (max-width: 768px) 600px,100vw"
            />
        </div>
    );
};

export default IMAGE;
