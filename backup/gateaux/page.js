import axios from "axios";
import Cards from "@/components/Cards/Cards";
import {URL} from "@/components/config/config";
import Header from "@/components/Header/Header";

export default async function Page() {
  
  let data = await axios.get(`${URL}/api/cakes`,{
      method: "GET",
      headers: {
        Authorization:process.env.PASSWORD,
        Accept: "Application/json",
      },
  })
  let posts = await data.data 
  return (
    <section>
      <Header/>
      <div className="books-page-hero">
        <h1>Ebooks</h1>
      </div>
      <div className="container-ebooks">
        <Cards array={posts} />
      </div>
    </section>
  );
}
