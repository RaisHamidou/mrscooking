import axios from "axios";
import Cards from "@/components/Cards/Cards";

export default async function Page() {
  let data = await axios.get(`http://localhost:4000/api/books`, {
    method: "GET",
    headers: {
      Authorization: "bejaia1984",
      Accept: "Application/json",
    },
  });
  let posts = await data.data;

  console.log(posts);
  return (
    <section>
      <div className="books-page-hero">
        <h1>Ebooks</h1>
      </div>
      <div className="container-ebooks">
        <Cards array={posts} />
      </div>
    </section>
  );
}
