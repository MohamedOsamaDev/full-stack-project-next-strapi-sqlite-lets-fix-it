"use client";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import styles from "./Form.module.css";
import { RegistrationVal } from "./schema";
import ErrorMessage from "@src/components/shared/ErrorMessage/ErrorMessage";
import { signUp } from "@src/_lib/sign-up";
import DropDownSearch from "@src/components/shared/DropDownSearch/DropDownSearch";
import toast from "react-hot-toast";
import useAuth from "@src/hooks/useAuth";
import { useSearchParams } from "next/navigation";
const Form = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ resolver: joiResolver(RegistrationVal) });

    const { signIn } = useAuth()

    const next = useSearchParams().get('next') || '/';

    const handleSignUp = async (form) => {
        toast.promise(signUp(form), {
            loading: "saveing...",
            success: async (data) => {
                signIn({ jwt: data?.jwt, next })
                return `تم`;
            },
            error: (error) => `${error}`,
            style: {
                backGround: 'black'
            },
        });
    };
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit((data) => handleSignUp(data))}
        >
            {/* start labels */}
            <label className={styles.label} htmlFor="firstName">
                <h1>  الاسم بالكامل رباعي  <b className="c-red">*</b></h1>
                <input
                    className={` input`}
                    type="text"
                    id="#firstName"
                    name="firstName"
                    autoComplete="new-password"
                    {...register("username")}
                    placeholder="الاسم بالكامل رباعي *"
                />
                <ErrorMessage message={errors?.firstName?.message} />
            </label>
            <label className={styles.label} htmlFor="governorate">

                <h1> المحافظة<b className="c-red">*</b></h1>
                <DropDownSearch
                    currentValue={watch("governorate")}
                    options={["high_school_year", "high_school_", "year"]}
                    placeholder="المحافظة"
                    callBack={(value) => setValue("governorate", value)}
                />
                <ErrorMessage message={errors?.governorate?.message} />
            </label>
            <label className={styles.label} htmlFor="Region">
                <h1> المنطقة<b className="c-red">*</b></h1>
                <DropDownSearch
                    currentValue={watch("Region")}
                    options={["high_school_year", "high_school_", "year"]}
                    placeholder="المنطقة"
                    callBack={(value) => setValue("Region", value)}
                />
                <ErrorMessage message={errors?.Region?.message} />
            </label>
            <label className={styles.label} htmlFor="email">
                <h1>  بريد إلكتروني <b className="c-red">*</b></h1>

                <input
                    className={` input`}
                    type="email"
                    name="email"
                    id="#email-signup"
                    {...register("email")}
                    autoComplete="new-password"
                    placeholder="  بريد إلكتروني *"
                />
                <ErrorMessage message={errors?.email?.message} />
            </label>
            <label className={styles.label} htmlFor="password">

                <h1>  كلمة المرور <b className="c-red">*</b></h1>
                <input
                    className={` input`}
                    type="password"
                    name="password"
                    id="#password"
                    {...register("password")}
                    autoComplete="new-password"
                    placeholder="كلمة المرور *"
                />
                <ErrorMessage message={errors?.password?.message} />
            </label>
            <label className={styles.label} htmlFor="phone_number">

                <h1> رقم التليفون  <b className="c-red">*</b></h1>
                <input
                    className={` input`}
                    type="phone_number"
                    name="phone_number"
                    id="#phone_number"
                    {...register("phone_number")}
                    autoComplete="new-password"
                    placeholder="رقم التليفون *"
                />
                <ErrorMessage message={errors?.phone_number?.message} />
            </label>
            {/* end labels   */}
            <span className={styles.polices_box}>
                <p className="">من خلال إنشاء حساب، فإنك توافق على لدينا </p>
                <span className=" flex  gap10">
                    <p>الأحكام والشروط</p>
                    <p className="">&</p>
                    <p>سياسة الخصوصية</p>
                </span>
            </span>
            <button className={styles.button} type="submit">
                انشاء حساب
            </button>
        </form>
    );
};

export default Form;
