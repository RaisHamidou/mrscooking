import { URL } from "@/components/config/config"
import Header from "@/components/Header/Header"
import LegalComponents from "@/components/LegalsComponents/LegalsComponents"
import axios from "axios"

const Page = async ({params}) =>{
    const {legal} = await params
    

    const {data : post} = await await axios.get(`https://www.mrscooking.com/api/legals/${legal}`,{
        Header:{
            Accept:"application/json"
        }
    })
    return (
        <div>
            <Header/>
            <LegalComponents post={post}/>
        </div>
    )
}

export default Page