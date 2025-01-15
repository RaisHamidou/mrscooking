import "dotenv/config";
const books = [
  {
    id: 1,
    titre: "Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr",
    price: 6.99,
    originalPrice: 7.99,
    description:
      "<p>Retrouvez 10 recettes de desserts incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.</p> <br> <p>Dans cet E-book tu trouveras 10 recettes incontournables pour un tête à tête :</p> <ul> <li>Chantilly mascarpone (bonus) </li> <li>Pavlova </li> <li>Verrine citronnée</li> <li>Coulant au chocolat </li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel </li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook1.png",
    image_books:["/image/photo/ebook 1/first.jpg","/image/photo/ebook 1/1.jpg","/image/photo/ebook 1/2.jpg","/image/photo/ebook 1/3.jpg","/image/photo/ebook 1/4.jpg","/image/photo/ebook 1/5.jpg"],
    fileType: "pdf",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20desserts?token=${process.env.BOOK_TOKEN}`,

  },
  {
    id: 2,
    titre: "E-book 2 : 10 recettes de plat comme au resto",
    price: 8.99,
    originalPrice: 9.99,
    description:"<p>Retrouvez 10 recettes de plat incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.</p> <br> <p>Dans cet E-book tu trouveras 10 recettes simple et délicieuses pour un tête à tête :</p> <ul> <li>Souris d’agneau et son écrasé de patate douce </li> <li>Coquille Saint-Jacques accompagnée de sa purée</li> <li>Escalope farcie au cheddar et épinard</li> <li>Moules à la crème</li> <li>Patate douce rôties et saumon tyriaki</li> <li>Courgettes farcies à la viande hachée</li> <li>Saumon rôti et blé sautés aux champignons</li> <li>Courge jack be little et cabillaud grillé</li> <li>Tagine de chou-fleur</li> <li>Carottes  et côtelettes rôties</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook2.png",
    image_books:["/image/photo/ebook 2/first.jpg","/image/photo/ebook 2/1.jpg","/image/photo/ebook 2/2.jpg","/image/photo/ebook 2/3.png","/image/photo/ebook 2/4.jpg","/image/photo/ebook 2/5.jpg"],
    fileType: "pdf",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20plat%20comme%20au%20resto?token=${process.env.BOOK_TOKEN}`,
    
  },
  {
    id: 3,
    titre: "Pack desserts et plats",
    price: 11.99,
    originalPrice: 12.99,
    description:"<p>Un pack avec les deux premiers E-books recettes desserts et plats pour vous régaler. Des recettes incontournables et faciles à réaliser.</p> <br><p>Dans l’E-book plats comme au resto tu trouveras 10 recettes simples et délicieuses pour un tête-à-tête :</p> <ul> <li>Souris d’agneau et son écrasé de patate douce </li> <li>Coquille Saint-Jacques accompagnée de sa purée</li> <li>Escalope farcie au cheddar et épinard</li> <li>Moules à la crème</li> <li> Patates douces rôties et saumon tyriaki</li> <li>Courgettes farcies à la viande hachée </li> <li>Saumon rôti et blé sautés aux champignons</li> <li>Courge jack be little et cabillaud grillé </li> <li>Tagine de chou-fleur</li> <li> Carottes  et côtelettes rôties</li> </ul> <br> <p>Dans l’E-book dessers tu trouveras 10 recettes de desserts légers à déguster après un bon repas :</p>  <ul> <li>Chantilly mascarpone (bonus)</li> <li>Pavlova</li> <li>Verrine citronnée</li> <li>Coulant au chocolat</li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel</li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack1.png",
    image_books:["/image/photo/pack/first.jpg","/image/photo/pack/1.jpg","/image/photo/pack/2.jpg","/image/photo/pack/3.png","/image/photo/pack/4.jpg","/image/photo/pack/5.jpg"],
    fileType: "zip",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack%20desserts%20et%20plats?token=${process.env.BOOK_TOKEN}`,
   
  },
 
];

export default books;
