import axios from "axios";
import Details from "@/components/Details/Details";
import URL from "@/components/config/config";
import Header from "@/components/Header/Header";

export default async function Page({ params }) {
  const { book } = params;
  let data = await axios.get(`${URL}/api/books/${book}`,{
    method: "GET",
            headers: {
              Authorization:"bejaia1984",
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