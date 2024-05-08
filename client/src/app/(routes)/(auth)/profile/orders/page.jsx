import Card from "@src/components/profile/card/card"
import dataTest from "./data.test"
import styles from './page.module.css'
import { getMyOrders } from "@src/_lib/orders"
import { cookies } from "next/headers"
const page = async () => {
    const { data } = await getMyOrders(cookies().get('jwt')?.value)
    return (
        <main className={`section flex mt50  wrap gap20 ${styles.section}`}>
            {data?.map((item) => <Card key={item?.id} item={item} />)}
        </main>
    )
}

export default page