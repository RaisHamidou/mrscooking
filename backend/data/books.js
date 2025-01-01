const books = [
  {
    id: 1,
    titre: "livre1",
    price: 9.99,
    originalPrice: 9.99,
    description:
      "Retrouvez 10 recettes de desserts incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/book1.png",
    apiEndpoint: "https://www.mrscooking.com/api/book/10%20recettes%20de%20desserts",
    pdfPath: "./backend/Books/10 recettes de desserts.pdf",
  },
 
];

export default books;
