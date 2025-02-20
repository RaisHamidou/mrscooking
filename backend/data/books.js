import "dotenv/config";
const books = [
  {
    id: 1,
    titre: "Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr",
    price: 6.99,
    description:
      "<p>Retrouvez 10 recettes de desserts incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.</p> <br> <p>Dans cet E-book tu trouveras 10 recettes incontournables pour un tête à tête :</p> <ul> <li>Chantilly mascarpone (bonus) </li> <li>Pavlova </li> <li>Verrine citronnée</li> <li>Coulant au chocolat </li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel </li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook1.png",
    image_books:["/image/photo/ebook 1/first.jpg","/image/photo/ebook 1/1.jpg","/image/photo/ebook 1/2.jpg","/image/photo/ebook 1/3.jpg","/image/photo/ebook 1/4.jpg","/image/photo/ebook 1/5.jpg"],
    fileType: "pdf",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20desserts?token=${process.env.BOOK_TOKEN}`,

  },
  {
    id: 2,
    titre: "E-book 2 : 10 recettes de plat comme au resto",
    price: 8.99,
    description:"<p>Retrouvez 10 recettes de plat incontournables et faciles à réaliser pour vous régaler avec Mr. E-book détaillé et bien expliqué afin de permettre à chacune d’entre vous de réussir votre tête-à-tête avec Mr.</p> <br> <p>Dans cet E-book tu trouveras 10 recettes simple et délicieuses pour un tête à tête :</p> <ul> <li>Souris d’agneau et son écrasé de patate douce </li> <li>Coquille Saint-Jacques accompagnée de sa purée</li> <li>Escalope farcie au cheddar et épinard</li> <li>Moules à la crème</li> <li>Patate douce rôties et saumon tyriaki</li> <li>Courgettes farcies à la viande hachée</li> <li>Saumon rôti et blé sautés aux champignons</li> <li>Courge jack be little et cabillaud grillé</li> <li>Tagine de chou-fleur</li> <li>Carottes  et côtelettes rôties</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook2.png",
    image_books:["/image/photo/ebook 2/first.jpg","/image/photo/ebook 2/1.jpg","/image/photo/ebook 2/2.jpg","/image/photo/ebook 2/3.png","/image/photo/ebook 2/4.jpg","/image/photo/ebook 2/5.jpg"],
    fileType: "pdf",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20plat%20comme%20au%20resto?token=${process.env.BOOK_TOKEN}`,
    
  },
  {
    id: 3,
    titre: "Pack desserts et plats",
    price: 11.99,
    description:"<p>Un pack avec les deux premiers E-books recettes desserts et plats pour vous régaler. Des recettes incontournables et faciles à réaliser.</p> <br><p>Dans l’E-book plats comme au resto tu trouveras 10 recettes simples et délicieuses pour un tête-à-tête :</p> <ul> <li>Souris d’agneau et son écrasé de patate douce </li> <li>Coquille Saint-Jacques accompagnée de sa purée</li> <li>Escalope farcie au cheddar et épinard</li> <li>Moules à la crème</li> <li> Patates douces rôties et saumon tyriaki</li> <li>Courgettes farcies à la viande hachée </li> <li>Saumon rôti et blé sautés aux champignons</li> <li>Courge jack be little et cabillaud grillé </li> <li>Tagine de chou-fleur</li> <li> Carottes  et côtelettes rôties</li> </ul> <br> <p>Dans l’E-book dessers tu trouveras 10 recettes de desserts légers à déguster après un bon repas :</p>  <ul> <li>Chantilly mascarpone (bonus)</li> <li>Pavlova</li> <li>Verrine citronnée</li> <li>Coulant au chocolat</li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel</li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack1.png",
    image_books:["/image/photo/pack/first.jpg","/image/photo/pack/1.jpg","/image/photo/pack/2.jpg","/image/photo/pack/3.png","/image/photo/pack/4.jpg","/image/photo/pack/5.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack%20desserts%20et%20plats?token=${process.env.BOOK_TOKEN}`,
   
  },
  {
    id: 4,
    titre: "E-book 3 : 30 recettes spécial ramadan",
    price: 16.99,
    description:"<p>Retrouvez 30 recettes incontournables aux multiples saveurs pour le mois du ramadan. Des recettes variées entre le traditionnel et la modernité.</p> <p>Des recettes faciles à réaliser, détaillées et bien expliquées afin de permettre à chacune d’entre vous de réussir.</p> <p>Dans cet E-book, tu trouveras 30 recettes simples et délicieuses pour varier tes plats durant le ramadan :</p> <ul> <li>Matlouh</li> <li>Chorba frik</li> <li>Chorba vermicelles</li> <li>Hrira</li> <li>Tagine de poisson</li> <li>Cuisses de poulet rôties et potatoes citronnée</li> <li>Beef balls aux champignons</li> <li>Tagine Kefta</li> <li>Chou farcie à la viande hachée</li> <li>Jarret de veau aux olives</li> <li>Mille feuille d’aubergines</li> <li>Ham lahlou</li> <li>Poulet aux olives</li> <li>Chicken dynamite</li> <li>Cheesy balls</li> <li>Pains farcis au poulet curry</li> <li>Soufflé au thon</li> <li>Galette saumon fumée boursin</li> <li>Mini tacos au poulet</li> <li>Bourek aux oignons et thon</li> <li>Bourek annabi</li> <li>Bourek poulet curry</li> <li>Bourek crevette</li> <li>Makouda</li> <li>Cheesy donut au poulet</li> <li>Baklava turc</li> <li>Kunfee</li> <li>Milkshake dattes avocat</li> <li>Kalb el louse</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook-3.png",
    image_books:["/image/photo/ebook-3/1.png","/image/photo/ebook-3/2.jpg","/image/photo/ebook-3/3.jpg","/image/photo/ebook-3/4.jpg","/image/photo/ebook-3/5.jpg","/image/photo/ebook-3/6.jpg","/image/photo/ebook-3/7.jpg","/image/photo/ebook-3/8.png","/image/photo/ebook-3/9.png","/image/photo/ebook-3/10.png"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/30 recettes spécial ramadan?token=${process.env.BOOK_TOKEN}`,
   
  },
  {
    id: 5,
    titre: "E-book 4 : 13 recettes de gâteaux traditionnels",
    price: 12.99,
    description:"<p>Retrouvez 13 recettes incontournables de gâteaux traditionnels pour sublimer votre table le jour de l’Aïd.</p> <p>Dans cet E-book, tu trouveras 13 recettes simples et délicieuses à réaliser :</p> <ul> <li>Gâteau coeur pistache</li> <li>Bniwen</li> <li>Gâteaux façon snikers</li> <li>Makrout el louse</li> <li>Sablé sucre glace</li> <li>Sablé marbre</li> <li>Gâteau gaufrette</li> <li>Puits coco abricot</li> <li>Mchawek</li> <li>Tcharek</li> <li>Baklawa</li> <li>Maktout</li> <li>Makrout prestige</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook-4.png",
    image_books:["/image/photo/ebook-4/1.png","/image/photo/ebook-4/2.jpg","/image/photo/ebook-4/3.jpg","/image/photo/ebook-4/4.jpg","/image/photo/ebook-4/5.jpg","/image/photo/ebook-4/6.jpg","/image/photo/ebook-4/7.jpg",],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/13 recettes de gâteaux traditionnels?token=${process.env.BOOK_TOKEN}`,
   
  },
  {
    id: 6,
    titre: "Pack Duo festif : Recettes spécial ramadan  et gâteaux traditionnels",
    price: 24.99,
    description:"<p>Dans ce pack tu trouveras des recettes variées entre plats et gâteaux traditionnels pour te régaler et sublimer ta table le jour du ramadan et de l’Aïd.</p> <p>Un pack avec 43 recettes inédites. Tu trouveras un large choix de plats et desserts diversifiés spécial ramadan, à savoir :</p> <ul> <li>Matlouh</li> <li>Chorba frik</li> <li>Chorba vermicelles</li> <li>Hrira</li> <li>Tagine de poisson</li> <li>Cuisses de poulet rôties et potatoes citronnée</li> <li>Beef balls aux champignons</li> <li>Tagine Kefta</li> <li>Chou farcie à la viande hachée</li> <li>Jarret de veau aux olives</li> <li>Mille feuille d’aubergines</li> <li>Ham lahlou</li> <li>Poulet aux olives</li> <li>Chicken dynamite</li> <li>Cheesy balls</li> <li>Pains farcis au poulet curry</li> <li>Soufflé au thon</li> <li>Galette saumon fumée boursin</li> <li>Mini tacos au poulet</li> <li>Bourek aux oignons et thon</li> <li>Bourek annabi</li> <li>Bourek poulet curry</li> <li>Bourek crevette</li> <li>Makouda</li> <li>Cheesy donut au poulet</li> <li>Baklava turc</li> <li>Kunfee</li> <li>Milkshake dattes avocat</li> <li>Kalb el louse</li> </ul> <p>En ce qui concerne les gâteaux traditionnels, diverses recettes sont également disponibles :</p> <ul> <li>Gâteau coeur pistache</li> <li>Bniwen</li> <li>Gâteaux façon snikers</li> <li>Makrout el louse</li> <li>Sablé sucre glace</li> <li>Sablé marbre</li> <li>Gâteau gaufrette</li> <li>Puits coco abricot</li> <li>Mchawek</li> <li>Tcharek</li> <li>Baklawa</li> <li>Maktout</li> <li>Makrout prestige</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack-2.png",
    image_books:["/image/photo/pack-2/1.png","/image/photo/pack-2/2.jpg","/image/photo/pack-2/3.jpg","/image/photo/pack-2/4.jpg","/image/photo/pack-2/5.png","/image/photo/pack-2/6.jpg","/image/photo/pack-2/7.jpg","/image/photo/pack-2/8.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack Duo festif Recettes spécial ramadan  et gâteaux traditionnels?token=${process.env.BOOK_TOKEN}`,
  },
 /*  {
    id: 7,
    titre: "Pack complet : Un large choix de recettes variées",
    price: 34.99,
    description:"<p>Dans ce pack, tu trouveras des recettes variées entre plats, desserts et gâteaux traditionnels pour te régaler et sublimer ta table. Ce pack regroupe tous les e-books du site avec l’ensemble des recettes proposées sur le site.</P>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack-3.png",
    image_books:["/image/photo/pack-3/1.png","/image/photo/pack-3/2.jpg","/image/photo/pack-3/3.png","/image/photo/pack-3/4.jpg","/image/photo/pack-3/5.jpg","/image/photo/pack-3/6.jpg","/image/photo/pack-3/7.jpg","/image/photo/pack-3/8.jpg","/image/photo/pack-3/9.jpg","/image/photo/pack-3/10.jpg","/image/photo/pack-3/11.jpg","/image/photo/pack-3/12.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack complet Un large choix de recettes variées?token=${process.env.BOOK_TOKEN}`,
  }, */
];

export default books;
