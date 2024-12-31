
import Hero from "../components/Hero/Hero";
import Book from "../components/Book/Book";
import About from "../components/About/About";
import Info from "../components/Info/Info";
import Posts from "../components/Posts/Posts";
export default function Home() {
  return (
    <main>
     <Hero />
       <Book />
      <About />
      <Posts />
      <Info /> 
    </main>
  );
}
