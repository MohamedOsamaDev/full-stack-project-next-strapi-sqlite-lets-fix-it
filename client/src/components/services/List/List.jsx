"use client";

import Card from "../Card/Card";
import styles from "./List.module.css";
import { getCompanies } from "@src/_lib/getCompanies";
import useInfinityQuery from "@src/hooks/useInfinityQuery";
import { useQueryParam } from "@src/hooks/useQueryParam";
import InfinteScroll from "@src/utils/InfintyScroll";

const List = ({ }) => {
    const { searchParams } = useQueryParam();
    const query = searchParams.get("service") || "";
    const { data, fetchNextPage, hasNextPage, isLoading } = useInfinityQuery({
        Key: ["get/services", query],
        next: getCompanies,
    });
    return (
        <section className={`${styles.section} flex-all-c gap20 f-column `}>
            <h1 className={styles.title}>الشركات</h1>
            <div className={`${styles.list} flex al-i-c wrap gap20 pb20 `}>
                <InfinteScroll isLoading={isLoading} hasMore={hasNextPage} next={fetchNextPage}  >
                    {data?.map((val, ind) => (
                        <Card service={query} key={ind} item={val} />
                    ))}
                </InfinteScroll>
            </div>
        </section>
    );
};

export default List;
