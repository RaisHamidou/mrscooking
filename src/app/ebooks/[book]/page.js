import axios from "axios";
import Details from "@/components/Details/Details";
import { URL } from "@/components/config/config";
import Header from "@/components/Header/Header";

export async function generateMetadata  ({params}){
  const {book} = await params;

  const {data: posts} = await axios.get(`${URL}/api/books/${book}`,
    {headers:{
      Accept:"application/json"
    }}
  )
  return {
    title:posts.titre,
    description:  posts.description.slice(0,160),
  }
}

export default async function Page({ params }) {
  const { book } = await params; // ✅ IMPORTANT

  const { data: posts } = await axios.get(
    `${URL}/api/books/${book}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return (
    <>
      <Header />
      <section className="container-detail-book">
        <Details posts={posts} />
      </section>
    </>
  );
}
