import "dotenv/config";
const books = [
  {
    id: 1,
    titre: "Ebook 1 : 10 recettes de desserts édition tête-à-tête avec Mr",
    price: 699,
    description: "<p>Envie de faire fondre Mr. avec des desserts aussi gourmands que faciles à réaliser ?</p> <br> <p>Cet e-book exclusif a été pensé pour t’accompagner pas à pas et t’aider à réussir, sans stress, un moment complice et savoureux à deux.</p><br> <p>À l’intérieur, tu découvriras 10 recettes incontournables, détaillées et accessibles, conçues pour impressionner tout en te faisant plaisir. Chaque recette est expliquée étape par étape pour garantir une réussite à coup sûr.</p><br> <p>✨ Au programme de cet e-book gourmand :</p> <ul> <li>Chantilly mascarpone (recette bonus)</li> <li>Pavlova croustillante et fondante</li> <li>Verrine citronnée fraîche et légère</li> <li>Coulant au chocolat au cœur fondant</li> <li>Dôme tiramisu</li> <li>Crème brûlée à la texture parfaite</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel</li> <li>Panna cotta onctueuse</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul><br> <p>💡 Que tu sois débutante ou passionnée, cet e-book est ton allié pour transformer chaque dessert en un moment de plaisir partagé.</p><br> <p>👉 N’attends plus : enfile ton tablier et fais de chaque bouchée un souvenir inoubliable.</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook1.png",
    image_books:["/image/photo/ebook_1/first.jpg","/image/photo/ebook_1/1.jpg","/image/photo/ebook_1/2.jpg","/image/photo/ebook_1/3.jpg","/image/photo/ebook_1/4.jpg","/image/photo/ebook_1/5.jpg"],
    fileType: "pdf",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20desserts?token=${process.env.BOOK_TOKEN}`,

  },
  {
    id: 2,
    titre: "E-book 2 : 10 recettes de plat comme au resto",
    price: 899,
    description: "<p>Retrouvez 10 recettes de plats incontournables, simples et faciles à réaliser, pour vous régaler avec Mr.</p><br> <p>Cet e-book détaillé et accessible a été conçu pour vous accompagner pas à pas et garantir un moment gourmand à deux.</p><br> <p>🍴 Dans cet e-book, découvrez 10 recettes simples et délicieuses :</p> <ul> <li> Souris d’agneau et écrasé de patate douce</li> <li> Coquilles Saint-Jacques accompagnées de leur purée</li> <li> Escalope farcie au cheddar et aux épinards</li> <li> Moules à la crème</li> <li> Patates douces rôties et saumon teriyaki</li> <li> Courgettes farcies à la viande hachée</li> <li> Saumon rôti et blé sauté aux champignons</li> <li> Courge Jack Be Little et cabillaud grillé</li> <li> Tajine de chou-fleur</li> <li> Carottes et côtelettes rôties</li> </ul> <br> <p>👉 Enfile ton tablier et transforme chaque plat en un moment complice et savoureux.</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook2.png",
    image_books:["/image/photo/ebook 2/first.jpg","/image/photo/ebook 2/1.jpg","/image/photo/ebook 2/2.jpg","/image/photo/ebook 2/3.png","/image/photo/ebook 2/4.jpg","/image/photo/ebook 2/5.jpg"],
    fileType: "pdf",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/10%20recettes%20de%20plat%20comme%20au%20resto?token=${process.env.BOOK_TOKEN}`,
    
  },
 /*  {
    id: 3,
    titre: "Pack desserts et plats",
    price: 1199,
    description:"<p>Un pack avec les deux premiers E-books recettes desserts et plats pour vous régaler. Des recettes incontournables et faciles à réaliser.</p> <br><p>Dans l’E-book plats comme au resto tu trouveras 10 recettes simples et délicieuses pour un tête-à-tête :</p> <ul> <li>Souris d’agneau et son écrasé de patate douce </li> <li>Coquille Saint-Jacques accompagnée de sa purée</li> <li>Escalope farcie au cheddar et épinard</li> <li>Moules à la crème</li> <li> Patates douces rôties et saumon tyriaki</li> <li>Courgettes farcies à la viande hachée </li> <li>Saumon rôti et blé sautés aux champignons</li> <li>Courge jack be little et cabillaud grillé </li> <li>Tagine de chou-fleur</li> <li> Carottes  et côtelettes rôties</li> </ul> <br> <p>Dans l’E-book dessers tu trouveras 10 recettes de desserts légers à déguster après un bon repas :</p>  <ul> <li>Chantilly mascarpone (bonus)</li> <li>Pavlova</li> <li>Verrine citronnée</li> <li>Coulant au chocolat</li> <li>Dôme tiramisu</li> <li>Crème brûlée</li> <li>Moelleux aux pommes</li> <li>Milkshake vanille caramel</li> <li>Panacota</li> <li>Entremet chocolat</li> <li>Mini charlotte aux framboises</li> </ul>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack1.png",
    image_books:["/image/photo/pack/first.jpg","/image/photo/pack/1.jpg","/image/photo/pack/2.jpg","/image/photo/pack/3.png","/image/photo/pack/4.jpg","/image/photo/pack/5.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack%20desserts%20et%20plats?token=${process.env.BOOK_TOKEN}`,
   
  }, */
  {
    id: 4,
    titre: "E-book 3 : Délices aux multiples saveurs",
    price: 1699,
    description:"<p>Découvrez 30 recettes variées, entre tradition et modernité.</p><br> <p>Des recettes simples, détaillées et faciles à réaliser, pensées pour permettre à chacune d’entre vous de réussir et de varier ses plats au quotidien.</p><br> <p>📖 Dans cet e-book, vous trouverez 30 recettes gourmandes :</p><br> <p>Découvrez 30 recettes variées, entre tradition et modernité. Des recettes simples, détaillées et faciles à réaliser, pensées pour permettre à chacune d’entre vous de réussir et de varier ses plats au quotidien.</p><br> <p>📖 Dans cet e-book, vous trouverez 30 recettes gourmandes :</p> <ul> <li>Matlouh</li> <li>Chorba frik</li> <li>Chorba vermicelles</li> <li>Hrira</li> <li>Tajine de poisson</li> <li>Cuisses de poulet rôties et potatoes citronnées</li> <li>Beef balls aux champignons</li> <li>Tajine kefta</li> <li>Chou farci à la viande hachée</li> <li>Jarret de veau aux olives</li> <li>Mille-feuille d’aubergines</li> <li>Ham lahlou</li> <li>Poulet aux olives</li> <li>Chicken dynamite</li> <li>Cheesy balls</li> <li>Pains farcis au poulet curry</li> <li>Soufflé au thon</li> <li>Galette saumon fumé et boursin</li> <li>Mini tacos au poulet</li> <li>Bourek aux oignons et au thon</li> <li>Bourek annabi</li> <li>Bourek poulet curry<l/i> <li>Bourek aux crevettes</li> <li>Maakouda</li> <li>Cheesy donut au poulet</li> <li>Baklava turc</li> <li>Kunafa</li> <li>Milkshake dattes–avocat</li> <li>Kalb el louz</li> </ul> <br> <p>👉 Un e-book complet pour des repas savoureux, généreux et pleins de partage.</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook-3.png",
    image_books:["/image/photo/ebook-3/1.png","/image/photo/ebook-3/2.jpg","/image/photo/ebook-3/3.jpg","/image/photo/ebook-3/4.jpg","/image/photo/ebook-3/5.jpg","/image/photo/ebook-3/6.jpg","/image/photo/ebook-3/7.jpg","/image/photo/ebook-3/8.png","/image/photo/ebook-3/9.png","/image/photo/ebook-3/10.png"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Délices aux multiples saveurs?token=${process.env.BOOK_TOKEN}`,
   
  },
  {
    id: 5,
    titre: "E-book 4 : 13 recettes de gâteaux traditionnels",
    price: 1299,
    description:"<p>Retrouvez 13 recettes gourmandes et simples à réaliser, pour sublimer votre table et régaler vos proches le jour de l’Aïd. Chaque recette est détaillée et expliquée, pour garantir une réussite à chaque préparation.</p><br> <p>🍰 Dans cet e-book, vous trouverez 13 recettes délicieuses :</p> <ul> <li>Gâteau cœur pistache</li> <li>Bniwen</li> <li>Gâteaux façon Snickers</li> <li>Makrout el louse</li> <li>Sablé sucre glace</li> <li>Sablé marbré</li> <li>Gâteau gaufrette</li> <li>Puits coco abricot</li> <li>Mchawek</li> <li>Tcharek</li> <li>Baklawa</li> <li>Maktout</li> <li>Makrout prestige</li> </ul> <br><p>👉 Un e-book parfait pour des douceurs traditionnelles réussies et une table festive inoubliable.</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/ebook-4.png",
    image_books:["/image/photo/ebook-4/1.png","/image/photo/ebook-4/2.jpg","/image/photo/ebook-4/3.jpg","/image/photo/ebook-4/4.jpg","/image/photo/ebook-4/5.jpg","/image/photo/ebook-4/6.jpg","/image/photo/ebook-4/7.jpg",],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/13 recettes de gâteaux traditionnels?token=${process.env.BOOK_TOKEN}`,
   
  },
  {
    id: 6,
    titre: "🌙 Pack Ramadan & Aïd – 43 recettes gourmandes à ne pas manquer ! 🌙",
    price: 2499,
    description:"<p>Transformez votre table du Ramadan et de l’Aïd en un véritable festin avec 43 recettes savoureuses, alliant tradition et modernité.</p> <p>Plats, boureks, desserts et gâteaux : tout est pensé pour régaler vos proches et impressionner vos invités.</p> <p>🍴 Plats savoureux et salés : Matlouh maison, Chorbas frik et vermicelles, Hrira parfumée, Tajines de poisson et kefta,  Jarret de veau aux olives, Boureks variés (saumon, poulet curry , crevette), ham lahlou et Beef balls aux champignons… des recettes simples, rapides et délicieuses à chaque fois !</p> <p>🍰 Gâteaux et desserts traditionnels : Gâteau cœur pistache, Makrout, Baklawa, Tcharek, Sablés, Puits coco abricot, Mchawek… des douceurs qui feront fondre tous les gourmands !</p> <p>✨ Pourquoi ce pack est fait pour vous :</p> <ul> <li>43 recettes faciles à réaliser</li> <li>Idéal pour varier vos plats et desserts</li> <li>Pour des repas généreux, festifs et mémorables</li> </ul> <p>🎁 Téléchargez dès maintenant votre pack et cuisinez sans stress pour régaler vos proches !</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack-2.png",
    image_books:["/image/photo/pack-2/1.png","/image/photo/pack-2/2.jpg","/image/photo/pack-2/3.jpg","/image/photo/pack-2/4.jpg","/image/photo/pack-2/5.png","/image/photo/pack-2/6.jpg","/image/photo/pack-2/7.jpg","/image/photo/pack-2/8.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack Duo festif sucrée salée?token=${process.env.BOOK_TOKEN}`,
  },
  {
    id: 7,
    titre: "🎁 Pack complet – Plats, desserts et gâteaux traditionnels",
    price: 3499,
    description:"<p>Dans ce pack, découvre une sélection de recettes variées, entre plats savoureux, desserts gourmands et gâteaux traditionnels, pour te régaler et sublimer ta table.</p><br> <p>Il regroupe tous les e-books du site, avec l’ensemble des recettes proposées, pour un accès complet à tout l’univers culinaire du site.</p><br> <p>👉 Un pack idéal pour gagner du temps, varier tes repas et impressionner tes proches avec des recettes simples et délicieuses.</p><br> <p>Téléchargez votre pack dès maintenant et cuisinez avec plaisir !</p>",
    detail: { pages: 35, format: "PDF", langue: "Français" },
    image: "/image/book/pack-3.png",
    image_books:["/image/photo/pack-3/1.png","/image/photo/pack-3/2.jpg","/image/photo/pack-3/3.png","/image/photo/pack-3/4.jpg","/image/photo/pack-3/5.jpg","/image/photo/pack-3/6.jpg","/image/photo/pack-3/7.jpg","/image/photo/pack-3/8.jpg","/image/photo/pack-3/9.jpg","/image/photo/pack-3/10.jpg","/image/photo/pack-3/11.jpg","/image/photo/pack-3/12.jpg"],
    fileType: "zip",
    type:"ebook",
    apiEndpoint: `https://www.mrscooking.com/api/book/Pack complet Un large choix de recettes variées?token=${process.env.BOOK_TOKEN}`,
  },

];

export default books;
