import axios from "axios";
import Details from "@/components/Details/Details";
import URL from "@/components/config/config";

export default async function Page({ params }) {
  const { book } = params;
  let data = await axios.get(`${URL}/api/books/${book}`);
  let posts = await data.data;
  return (
    <section className="container-detail-book">
        <Details posts={posts}/>
      </section>
  );
}