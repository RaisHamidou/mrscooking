import Hero from "../components/Hero/Hero";
import Book from "../components/Book/Book";
import About from "../components/About/About";
import Info from "../components/Info/Info";
//import Posts from "../components/Posts/Posts";
import Header from "@/components/Header/Header";
import InfiniteScroll from "@/components/Gallerie/Gallerie";
import image1 from "../assets/photo/1.png"
import image2 from "../assets/photo/2.jpeg";
import image3 from "../assets/photo/3.jpeg";
import image4 from "../assets/photo/4.jpeg";
import image5 from "../assets/photo/5.jpeg";
import image6 from "../assets/photo/6.jpeg"
import image7 from "../assets/photo/7.jpeg";
import image8 from "../assets/photo/8.jpg";
import image9 from "../assets/photo/9.jpg";
import image10 from "../assets/photo/10.jpg";

export default function Home() {
  const images = [
    image1,image2,image3,image4,image5,image6,image7,image8,image9,image10
  ];
  return (
    <main>
      <Header />
      <Hero />
      <Book />
      <About />
      {/* <Posts /> */}
      <InfiniteScroll images={images} />
      <Info />
    </main>
  );
}
