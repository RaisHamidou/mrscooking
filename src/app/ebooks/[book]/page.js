import axios from "axios";
import Details from "@/components/Details/Details";

export default async function Page({ params }) {
  const { book } = params;
  let data = await axios.get(`http://localhost:4000/api/books/${book}`);
  let posts = await data.data;
  return (
    <section className="container-detail-book">
        <Details posts={posts}/>
      </section>
  );
}