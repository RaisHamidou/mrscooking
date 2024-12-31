import axios from "axios";
import Cards from "@/components/Cards/Cards";
import URL from "@/components/config/config";

export default async function Page() {

  return (
    <section>
      <div className="books-page-hero">
        <h1>Ebooks</h1>
      </div>
      <div className="container-ebooks">
        <Cards />
      </div>
    </section>
  );
}
