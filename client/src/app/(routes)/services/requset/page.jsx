import styles from "./page.module.css";
import Form from "@src/components/company/Form/Form";

import { getCompanyData } from "@src/_lib/request";
import { AuthManager } from "@src/contexts/AuthManager";
import { cookies } from "next/headers";

const page = async ({ searchParams = {} }) => {
    const { company, info } = await getCompanyData({ slug: searchParams?.q, jwt: cookies().get('jwt')?.value });

    return (
        <main className="w-100 min-h100  ShowSmoothEffect   p-relative">
            <div className="coverHeader" />
            <section className={`${styles.section} section`}>
                <h1 className={styles.title}>اكمل الحقول لي ارسال طلب صيانة</h1>
                <Form company={company} info={info} />
            </section>
        </main>
    );
};

export default page;
