
import Hero from "../components/Hero/Hero";
import Book from "../components/Book/Book";
import About from "../components/About/About";
import Info from "../components/Info/Info";
import Posts from "../components/Posts/Posts";
import Header from "@/components/Header/Header";
export default function Home() {
  return (
    <main>
      <Header/>
     <Hero />
       <Book />
      <About />
      <Posts />
      <Info /> 
    </main>
  );
}
