import axios from "axios";
import Details from "@/components/Details/Details";
import {URL, PASSWORD} from "@/components/config/config";
import Header from "@/components/Header/Header";

export default async function Page({ params }) {
  const { gateau } = params;
  let data = await axios.get(`${URL}/api/cakes/${gateau}`,{
    method: "GET",
            headers: {
              Authorization:process.env.PASSWORD,
              Accept: "Application/json",
            },
  });
  let posts = await data.data;
  return (
    <>
    <Header/>
    <section className="container-detail-book">
        <Details posts={posts}/>
      </section>
      </>
  );
}
