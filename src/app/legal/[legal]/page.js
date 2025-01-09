import { URL } from "@/components/config/config"
import Header from "@/components/Header/Header"
import LegalComponents from "@/components/LegalsComponents/LegalsComponents"
import axios from "axios"

const Page = async ({params}) =>{
    const {legal} = params
    const res = await axios.get(`${URL}/api/legals/${legal}`)
    const data = await res.data
    return (
        <div>
            <Header/>
            <LegalComponents post={data}/>
        </div>
    )
}

export default Page