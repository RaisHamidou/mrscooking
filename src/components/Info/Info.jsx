import React from "react"
import { FaShippingFast } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

const Info = ()=>{
    return(
        <section id="container-info" >
            <div className="info">
                <h1>+25</h1>
                <p>recettes unique</p>
            </div>
            <div className="info">
                <FaShippingFast className="icon-info" />
                <p>Recevez instantanément votre ebook</p>
            </div>
            <div className="info">
                <LiaMoneyBillWaveSolid className="icon-info" />
                <p>Payement sécuriser</p>
            </div>
        </section>
    )
}

export default Info
