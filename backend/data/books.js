import "dotenv/config";
const books = [
  {
    id: 1,
    titre: "Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr",
    price: 7.99,
    originalPrice: 7.99,
    description:
      "<p>Retrouvez 10 recettes de desserts incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.</p> <br> <p>Dans cet E-book tu trouveras 10 recettes incontournables pour un tête à tête :</p> <ul> <li>Chantilly mascarpone (bonus) </li> <li>Pavlova </li> <li>Verrine citronnée</li> <li>Coulant au chocolat </li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel </li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook1.png",
    image_books:["/image/photo/ebook 1/first.jpg","/image/photo/ebook 1/1.jpg","/image/photo/ebook 1/2.jpg","/image/photo/ebook 1/3.jpg","/image/photo/ebook 1/4.jpg","/image/photo/ebook 1/5.jpg"],
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20desserts?token=${process.env.BOOK_TOKEN}`,
    pdfPath: "./backend/Books/10 recettes de desserts.pdf",
  },
 
];

export default books;
