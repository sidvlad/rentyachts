/**
 * Yacht & Catamaran Rental - Data
 * Contains all yacht/catamaran data for the catalog
 */

const yachtsData = [
  // Sailing Yachts
  {
    id: "azure-dream",
    type: "sailing",
    name: "Azure Dream",
    priceFrom: 850,
    length: 14.5,
    cabins: 4,
    guests: 8,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Elegant sailing yacht perfect for island hopping adventures",
      ru: "Элегантная парусная яхта для путешествий по островам",
      el: "Κομψό ιστιοπλοϊκό σκάφος ιδανικό για περιπέτειες στα νησιά"
    },
    fullDesc: {
      en: "Azure Dream is a stunning 14.5-meter sailing yacht that combines classic elegance with modern comfort. Perfect for families or groups looking to explore the beautiful Greek islands at their own pace. The yacht features spacious deck areas, a fully equipped galley, and comfortable accommodation for up to 8 guests.",
      ru: "Azure Dream — потрясающая 14,5-метровая парусная яхта, сочетающая классическую элегантность с современным комфортом. Идеально подходит для семей или групп, желающих исследовать прекрасные греческие острова в своём темпе. Яхта оснащена просторными палубными зонами, полностью оборудованным камбузом и комфортабельным размещением до 8 гостей.",
      el: "Το Azure Dream είναι ένα εκπληκτικό ιστιοπλοϊκό σκάφος 14,5 μέτρων που συνδυάζει την κλασική κομψότητα με τη σύγχρονη άνεση. Ιδανικό για οικογένειες ή παρέες που θέλουν να εξερευνήσουν τα όμορφα ελληνικά νησιά με τον δικό τους ρυθμό."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem"]
  },
  {
    id: "sea-spirit",
    type: "sailing",
    name: "Sea Spirit",
    priceFrom: 720,
    length: 12.8,
    cabins: 3,
    guests: 6,
    location: "Kos Harbor",
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Classic sailing yacht with exceptional performance",
      ru: "Классическая парусная яхта с исключительными характеристиками",
      el: "Κλασικό ιστιοπλοϊκό σκάφος με εξαιρετικές επιδόσεις"
    },
    fullDesc: {
      en: "Sea Spirit offers an authentic sailing experience with modern amenities. This well-maintained yacht is perfect for those who appreciate the art of sailing while enjoying comfortable cruising. With 3 cabins and space for 6 guests, it's ideal for small groups or families.",
      ru: "Sea Spirit предлагает аутентичный парусный опыт с современными удобствами. Эта ухоженная яхта идеально подходит для тех, кто ценит искусство парусного спорта, наслаждаясь комфортным круизом.",
      el: "Το Sea Spirit προσφέρει μια αυθεντική ιστιοπλοϊκή εμπειρία με σύγχρονες ανέσεις. Αυτό το καλά συντηρημένο σκάφος είναι ιδανικό για όσους εκτιμούν την τέχνη της ιστιοπλοΐας."
    },
    amenities: ["wifi", "kitchen", "shower", "soundSystem"]
  },
  {
    id: "wind-dancer",
    type: "sailing",
    name: "Wind Dancer",
    priceFrom: 950,
    length: 16.2,
    cabins: 4,
    guests: 10,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588401667987-e06480c453f9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1535649619-1c3be27ee958?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Spacious sailing yacht for unforgettable group adventures",
      ru: "Просторная парусная яхта для незабываемых групповых приключений",
      el: "Ευρύχωρο ιστιοπλοϊκό σκάφος για αξέχαστες ομαδικές περιπέτειες"
    },
    fullDesc: {
      en: "Wind Dancer is our largest sailing yacht, offering exceptional space and comfort for up to 10 guests. Perfect for corporate events, celebrations, or extended family vacations. Features include a spacious saloon, multiple deck areas, and premium amenities throughout.",
      ru: "Wind Dancer — наша самая большая парусная яхта, предлагающая исключительное пространство и комфорт для 10 гостей. Идеально подходит для корпоративных мероприятий, торжеств или семейного отдыха.",
      el: "Το Wind Dancer είναι το μεγαλύτερο ιστιοπλοϊκό μας σκάφος, προσφέροντας εξαιρετικό χώρο και άνεση για έως 10 επισκέπτες."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "generator"]
  },
  {
    id: "aegean-star",
    type: "sailing",
    name: "Aegean Star",
    priceFrom: 680,
    length: 11.5,
    cabins: 2,
    guests: 4,
    location: "Symi Port",
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Compact sailing yacht perfect for couples",
      ru: "Компактная парусная яхта, идеальная для пар",
      el: "Συμπαγές ιστιοπλοϊκό σκάφος ιδανικό για ζευγάρια"
    },
    fullDesc: {
      en: "Aegean Star is an intimate sailing yacht designed for couples or small groups seeking a romantic getaway. Despite its compact size, it offers all the comforts needed for a memorable sailing experience in the crystal-clear waters of the Aegean.",
      ru: "Aegean Star — уютная парусная яхта, созданная для пар или небольших групп, ищущих романтический отдых. Несмотря на компактный размер, она предлагает все удобства для незабываемого парусного отдыха.",
      el: "Το Aegean Star είναι ένα οικείο ιστιοπλοϊκό σκάφος σχεδιασμένο για ζευγάρια ή μικρές παρέες που αναζητούν ρομαντική απόδραση."
    },
    amenities: ["wifi", "kitchen", "shower"]
  },

  // Motor Yachts
  {
    id: "poseidon-power",
    type: "motor",
    name: "Poseidon Power",
    priceFrom: 1200,
    length: 18.0,
    cabins: 4,
    guests: 10,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Luxury motor yacht with impressive speed and comfort",
      ru: "Роскошная моторная яхта с впечатляющей скоростью и комфортом",
      el: "Πολυτελές μηχανοκίνητο σκάφος με εντυπωσιακή ταχύτητα και άνεση"
    },
    fullDesc: {
      en: "Poseidon Power is a magnificent motor yacht that combines luxury with performance. Reach distant islands quickly and in style, then enjoy the spacious sun deck and premium amenities. Perfect for those who want to maximize their time exploring.",
      ru: "Poseidon Power — великолепная моторная яхта, сочетающая роскошь с производительностью. Быстро и стильно добирайтесь до далёких островов, наслаждаясь просторной солнечной палубой и премиальными удобствами.",
      el: "Το Poseidon Power είναι ένα υπέροχο μηχανοκίνητο σκάφος που συνδυάζει την πολυτέλεια με την απόδοση."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "generator", "waterToys"]
  },
  {
    id: "speed-king",
    type: "motor",
    name: "Speed King",
    priceFrom: 980,
    length: 15.5,
    cabins: 3,
    guests: 8,
    location: "Kos Harbor",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588401667987-e06480c453f9?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Fast and stylish motor yacht for day trips",
      ru: "Быстрая и стильная моторная яхта для дневных поездок",
      el: "Γρήγορο και κομψό μηχανοκίνητο σκάφος για ημερήσιες εκδρομές"
    },
    fullDesc: {
      en: "Speed King delivers exhilarating performance combined with elegant styling. This motor yacht is perfect for day trips to nearby islands or extended cruises. The powerful engines ensure you reach your destination quickly while the luxurious interior keeps everyone comfortable.",
      ru: "Speed King обеспечивает захватывающую производительность в сочетании с элегантным стилем. Эта моторная яхта идеально подходит для дневных поездок на близлежащие острова или продолжительных круизов.",
      el: "Το Speed King προσφέρει συναρπαστικές επιδόσεις σε συνδυασμό με κομψό στυλ."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem"]
  },
  {
    id: "ocean-voyager",
    type: "motor",
    name: "Ocean Voyager",
    priceFrom: 1450,
    length: 21.0,
    cabins: 5,
    guests: 12,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1535649619-1c3be27ee958?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Premium motor yacht for ultimate luxury experience",
      ru: "Премиальная моторная яхта для максимального комфорта",
      el: "Premium μηχανοκίνητο σκάφος για απόλυτη πολυτέλεια"
    },
    fullDesc: {
      en: "Ocean Voyager represents the pinnacle of motor yacht luxury. This 21-meter vessel features 5 beautifully appointed cabins, multiple entertainment areas, and a comprehensive water sports package. Ideal for discerning guests who expect nothing but the best.",
      ru: "Ocean Voyager представляет вершину роскоши моторных яхт. Это 21-метровое судно имеет 5 прекрасно оборудованных кают, несколько развлекательных зон и полный пакет водных видов спорта.",
      el: "Το Ocean Voyager αντιπροσωπεύει την κορυφή της πολυτέλειας στα μηχανοκίνητα σκάφη."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "generator", "waterToys", "jetski"]
  },
  {
    id: "blue-horizon",
    type: "motor",
    name: "Blue Horizon",
    priceFrom: 850,
    length: 13.0,
    cabins: 2,
    guests: 6,
    location: "Lindos Bay",
    images: [
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Versatile motor yacht for coastal exploration",
      ru: "Универсальная моторная яхта для прибрежных исследований",
      el: "Ευέλικτο μηχανοκίνητο σκάφος για παράκτια εξερεύνηση"
    },
    fullDesc: {
      en: "Blue Horizon offers the perfect balance of performance and practicality. This motor yacht is ideal for exploring hidden coves, beach hopping, and enjoying the stunning Greek coastline. Comfortable accommodation for up to 6 guests makes overnight trips a pleasure.",
      ru: "Blue Horizon предлагает идеальный баланс производительности и практичности. Эта моторная яхта идеально подходит для исследования скрытых бухт и наслаждения потрясающим греческим побережьем.",
      el: "Το Blue Horizon προσφέρει την τέλεια ισορροπία απόδοσης και πρακτικότητας."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "soundSystem"]
  },
  {
    id: "thunder-wave",
    type: "motor",
    name: "Thunder Wave",
    priceFrom: 1100,
    length: 16.8,
    cabins: 3,
    guests: 8,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "High-performance motor yacht with sporty character",
      ru: "Высокопроизводительная моторная яхта со спортивным характером",
      el: "Υψηλών επιδόσεων μηχανοκίνητο σκάφος με σπορ χαρακτήρα"
    },
    fullDesc: {
      en: "Thunder Wave is designed for those who crave speed and excitement. This sporty motor yacht delivers thrilling performance while maintaining exceptional comfort. Perfect for adrenaline seekers who don't want to compromise on luxury.",
      ru: "Thunder Wave создана для тех, кто жаждет скорости и волнения. Эта спортивная моторная яхта обеспечивает захватывающую производительность, сохраняя исключительный комфорт.",
      el: "Το Thunder Wave είναι σχεδιασμένο για όσους λαχταρούν ταχύτητα και ενθουσιασμό."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "waterToys"]
  },

  // Catamarans
  {
    id: "twin-paradise",
    type: "catamaran",
    name: "Twin Paradise",
    priceFrom: 1350,
    length: 13.5,
    cabins: 4,
    guests: 10,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1588401667987-e06480c453f9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1535649619-1c3be27ee958?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Spacious catamaran with exceptional stability",
      ru: "Просторный катамаран с исключительной устойчивостью",
      el: "Ευρύχωρο καταμαράν με εξαιρετική σταθερότητα"
    },
    fullDesc: {
      en: "Twin Paradise offers the ultimate in space and stability. This modern catamaran features expansive deck areas, comfortable saloon, and 4 well-appointed cabins. The twin-hull design provides smooth sailing and ample room for sunbathing, dining, and relaxation.",
      ru: "Twin Paradise предлагает максимум пространства и устойчивости. Этот современный катамаран имеет обширные палубные зоны, комфортабельный салон и 4 хорошо оборудованные каюты.",
      el: "Το Twin Paradise προσφέρει το απόλυτο σε χώρο και σταθερότητα."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "generator", "waterToys"]
  },
  {
    id: "island-hopper",
    type: "catamaran",
    name: "Island Hopper",
    priceFrom: 1180,
    length: 12.0,
    cabins: 3,
    guests: 8,
    location: "Kos Harbor",
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Perfect catamaran for multi-island adventures",
      ru: "Идеальный катамаран для путешествий по островам",
      el: "Τέλειο καταμαράν για περιπέτειες σε πολλά νησιά"
    },
    fullDesc: {
      en: "Island Hopper is designed specifically for exploring the Greek islands. The shallow draft allows access to secluded beaches, while the spacious deck and comfortable cabins make extended cruising a joy. Perfect for adventurous groups who want to discover hidden gems.",
      ru: "Island Hopper специально создан для исследования греческих островов. Мелкая осадка позволяет добраться до уединённых пляжей, а просторная палуба и комфортабельные каюты делают длительные круизы удовольствием.",
      el: "Το Island Hopper είναι σχεδιασμένο ειδικά για εξερεύνηση των ελληνικών νησιών."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "soundSystem", "waterToys"]
  },
  {
    id: "sea-breeze-cat",
    type: "catamaran",
    name: "Sea Breeze",
    priceFrom: 1500,
    length: 15.0,
    cabins: 5,
    guests: 12,
    location: "Rhodes Marina",
    images: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Luxury catamaran for large groups and events",
      ru: "Роскошный катамаран для больших групп и мероприятий",
      el: "Πολυτελές καταμαράν για μεγάλες ομάδες και εκδηλώσεις"
    },
    fullDesc: {
      en: "Sea Breeze is our flagship catamaran, offering unparalleled space and luxury for up to 12 guests. With 5 cabins, multiple deck levels, and premium amenities throughout, it's perfect for celebrations, corporate retreats, or extended family vacations.",
      ru: "Sea Breeze — наш флагманский катамаран, предлагающий непревзойдённое пространство и роскошь для 12 гостей. С 5 каютами, несколькими палубными уровнями и премиальными удобствами.",
      el: "Το Sea Breeze είναι το ναυαρχίδα καταμαράν μας, προσφέροντας απαράμιλλο χώρο και πολυτέλεια για έως 12 επισκέπτες."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "generator", "waterToys", "jetski"]
  },
  {
    id: "sunset-cat",
    type: "catamaran",
    name: "Sunset Cruiser",
    priceFrom: 980,
    length: 11.0,
    cabins: 2,
    guests: 6,
    location: "Symi Port",
    images: [
      "https://images.unsplash.com/photo-1562281302-809108fd533c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588401667987-e06480c453f9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1535649619-1c3be27ee958?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Intimate catamaran perfect for romantic getaways",
      ru: "Уютный катамаран для романтического отдыха",
      el: "Οικείο καταμαράν ιδανικό για ρομαντικές αποδράσεις"
    },
    fullDesc: {
      en: "Sunset Cruiser is a cozy catamaran designed for couples or small groups seeking intimacy and romance. Watch stunning sunsets from the spacious deck, enjoy quiet anchorages, and create unforgettable memories in the beautiful Aegean waters.",
      ru: "Sunset Cruiser — уютный катамаран, созданный для пар или небольших групп, ищущих уединения и романтики. Наблюдайте потрясающие закаты с просторной палубы.",
      el: "Το Sunset Cruiser είναι ένα άνετο καταμαράν σχεδιασμένο για ζευγάρια ή μικρές παρέες που αναζητούν οικειότητα και ρομαντισμό."
    },
    amenities: ["wifi", "kitchen", "shower", "soundSystem"]
  },
  {
    id: "family-fun",
    type: "catamaran",
    name: "Family Fun",
    priceFrom: 1250,
    length: 13.0,
    cabins: 4,
    guests: 10,
    location: "Lindos Bay",
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Family-friendly catamaran with all amenities",
      ru: "Семейный катамаран со всеми удобствами",
      el: "Οικογενειακό καταμαράν με όλες τις ανέσεις"
    },
    fullDesc: {
      en: "Family Fun is specifically designed with families in mind. The stable platform is safe for children, while the spacious layout ensures everyone has their own space. Water toys, snorkeling gear, and entertainment systems keep guests of all ages happy.",
      ru: "Family Fun специально создан с учётом потребностей семей. Устойчивая платформа безопасна для детей, а просторная планировка обеспечивает каждому своё пространство.",
      el: "Το Family Fun είναι ειδικά σχεδιασμένο με γνώμονα τις οικογένειες."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "tv", "soundSystem", "waterToys"]
  },
  {
    id: "adventure-cat",
    type: "catamaran",
    name: "Adventure Cat",
    priceFrom: 1100,
    length: 12.5,
    cabins: 3,
    guests: 8,
    location: "Kos Harbor",
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop"
    ],
    shortDesc: {
      en: "Adventure-ready catamaran for active travelers",
      ru: "Катамаран для активных путешественников",
      el: "Καταμαράν έτοιμο για περιπέτεια για ενεργούς ταξιδιώτες"
    },
    fullDesc: {
      en: "Adventure Cat is equipped for active travelers who love water sports and exploration. Complete with diving equipment, kayaks, paddleboards, and fishing gear, this catamaran transforms every day into an adventure. Comfortable cabins ensure restful nights after action-packed days.",
      ru: "Adventure Cat оснащён для активных путешественников, которые любят водные виды спорта и исследования. С оборудованием для дайвинга, каяками, падлбордами и рыболовными снастями.",
      el: "Το Adventure Cat είναι εξοπλισμένο για ενεργούς ταξιδιώτες που αγαπούν τα θαλάσσια σπορ και την εξερεύνηση."
    },
    amenities: ["wifi", "aircon", "kitchen", "shower", "soundSystem", "waterToys", "divingGear"]
  }
];

// Popular tours data
const toursData = [
  {
    id: "blue-lagoon",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    duration: "8h",
    priceFrom: 95
  },
  {
    id: "sunset-cruise",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
    duration: "4h",
    priceFrom: 65
  },
  {
    id: "fishing-trip",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    duration: "6h",
    priceFrom: 120
  }
];

// Amenities mapping
const amenitiesMap = {
  wifi: {
    icon: "wifi",
    en: "Wi-Fi",
    ru: "Wi-Fi",
    el: "Wi-Fi"
  },
  aircon: {
    icon: "ac_unit",
    en: "Air Conditioning",
    ru: "Кондиционер",
    el: "Κλιματισμός"
  },
  kitchen: {
    icon: "restaurant",
    en: "Full Kitchen",
    ru: "Полная кухня",
    el: "Πλήρης κουζίνα"
  },
  shower: {
    icon: "shower",
    en: "Shower",
    ru: "Душ",
    el: "Ντους"
  },
  tv: {
    icon: "tv",
    en: "TV",
    ru: "Телевизор",
    el: "Τηλεόραση"
  },
  soundSystem: {
    icon: "speaker",
    en: "Sound System",
    ru: "Аудиосистема",
    el: "Ηχοσύστημα"
  },
  generator: {
    icon: "bolt",
    en: "Generator",
    ru: "Генератор",
    el: "Γεννήτρια"
  },
  waterToys: {
    icon: "kayaking",
    en: "Water Toys",
    ru: "Водные игрушки",
    el: "Θαλάσσια παιχνίδια"
  },
  jetski: {
    icon: "surfing",
    en: "Jet Ski",
    ru: "Гидроцикл",
    el: "Τζετ σκι"
  },
  divingGear: {
    icon: "scuba_diving",
    en: "Diving Gear",
    ru: "Снаряжение для дайвинга",
    el: "Εξοπλισμός κατάδυσης"
  }
};
