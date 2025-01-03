
import { URL } from "@/components/config/config"
import Header from "@/components/Header/Header"
import PaymentComponents from "@/components/Payement/Payement"

const PayementPage = ()=>{
    console.log(URL)
    return(

    <div>
        <Header/>
        <PaymentComponents URL={URL}/> 
    </div>
    )
}

export default PayementPage