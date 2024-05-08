"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import styles from "./Form.module.css";
import { requsetVal } from "./schema";
import ErrorMessage from "@src/components/shared/ErrorMessage/ErrorMessage";
import DropDownSearch from "@src/components/shared/DropDownSearch/DropDownSearch";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getServies } from "@src/_lib/companies";
import { appendObjectToFormData } from "@src/utils/ConvertToFromData";
import toast from "react-hot-toast";
import { createOrder } from "@src/_lib/request";
import Popup from "../popup/Popup";
import useAuth from "@src/hooks/useAuth";
import { useQueryParam } from "@src/hooks/useQueryParam";
const Form = ({ company, info }) => {
    const { searchParams } = useQueryParam()
    const q = searchParams.get('q')
    const service = searchParams.get('service')
    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);
    const { data } = useQuery({
        queryKey: ["get/services"],
        queryFn: getServies,
    });
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        values: {
            service: data?.find((s) => s?.slug === service)?.id,
            governorate: info?.governorate,
            Region: info?.Region,
        },
        resolver: joiResolver(requsetVal)
    });
    const {
        jwt
    } = useAuth()

    const handler = async (formData) => {
        formData.company = searchParams.get('q')
        const form = appendObjectToFormData(formData)
        toast.promise(createOrder({ form, jwt }), {
            loading: "saveing...",
            success: (res) => {
                setShowPopup(true)
                return `تم الارسال بنجاح`;
            },
            error: (error) => `${error}`,
        });
    };
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setValue("media", selectedFile);
    };
    return (
        <>
            <form
                className={styles.form}
                onSubmit={handleSubmit((val) => handler(val))}
            >
                {/* start labels */}
                <label className={styles.label} htmlFor="governorate">
                    <h1>
                        {" "}
                        الشركة
                    </h1>
                    <input
                        className={` input al-i-s flex `}
                        type="button"
                        id="#firstName"
                        name="firstName"
                        autoComplete="new-password"
                        value={company.title}
                    />
                    <ErrorMessage message={errors?.governorate?.message} />
                </label>
                <label className={styles.label} htmlFor="services">
                    <h1>
                        الخدمة<b className="c-red">*</b>
                    </h1>
                    <DropDownSearch
                        className={""}
                        currentValue={data?.find((s) => s?.id === watch("service"))?.title || ""}
                        options={data?.map((val) => val.title)}
                        placeholder="  اختار الخدمة *"
                        callBack={(value) => setValue("service", data.find((val) => val?.title === value)?.id)}
                    />
                    <ErrorMessage message={errors?.services?.message} />
                </label>
                <label className={styles.label} htmlFor="governorate">
                    <h1>
                        {" "}
                        المحافظة<b className="c-red">*</b>
                    </h1>
                    <DropDownSearch
                        className={""}
                        currentValue={watch("governorate")}
                        options={["high_school_year", "high_school_", "year"]}
                        placeholder="المحافظة"
                        callBack={(value) => setValue("governorate", value)}
                    />
                    <ErrorMessage message={errors?.governorate?.message} />
                </label>
                <label className={styles.label} htmlFor="Region">
                    <h1>
                        {" "}
                        المنطقة<b className="c-red">*</b>
                    </h1>
                    <DropDownSearch
                        className={""}
                        currentValue={watch("Region")}
                        options={["high_school_year", "high_school_", "year"]}
                        placeholder="المنطقة"
                        callBack={(value) => setValue("Region", value)}
                    />
                    <ErrorMessage message={errors?.Region?.message} />
                </label>
                <label className={`${styles.label} ${styles.fileUpload}`}>
                    <h1> صورة لشرح المشكلة</h1>
                    <input
                        type="file"
                        name="myImage"
                        placeholder="ارفع صورة"
                        onChange={handleChange}
                        accept="image/png, image/gif, image/jpeg"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />
                    <button
                        className={` ${styles.fileDesc} input-file input`}
                        onClick={handleClick}
                    >
                        اختار صورة
                        <span className={`${styles.fileTitle} ml10  mr15 `}>
                            {watch('media')?.name?.substring(0, 20)}
                        </span>
                    </button>
                    <ErrorMessage message={errors?.media?.message} />
                </label>
                <label className={`${styles.label} ${styles.textarea}`} htmlFor="information">
                    <h1>
                        {" "}
                        ايه المشكله ؟<b className="c-red">*</b>
                    </h1>
                    <textarea
                        className={` input`}
                        name="information"
                        id="#desc"
                        {...register("information")}
                        autoComplete="new-password"
                        placeholder="   التفاصل"
                    />
                    <ErrorMessage message={errors?.information?.message} />
                </label>
                {/* end labels   */}
                <span className={styles.polices_box}>
                    <p className="">ارسل طلب وسيتم الرد عليك في اسرع وقت من خلال الشركة </p>
                </span>
                <button disabled={showPopup} className={styles.button} type="submit">
                    {!showPopup ? ' ارسال طلب' : 'تم ارسال طلبك'}
                </button>
            </form>
            <Popup show={showPopup} />
        </>
    );
};

export default Form;
