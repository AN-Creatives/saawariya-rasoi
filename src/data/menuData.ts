
export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  takeawayPrice?: string;
  image?: string;
  popular?: boolean;
  category: string;
  subcategory?: string;
  veg: boolean;
  quantity?: string;
}

export const categories = [
  "All",
  "Saawariya Specialty",
  "Saawariya Vrat Special",
  "Saawariya Combos",
  "Saawariya's Dessert"
];

export const menuItems: MenuItem[] = [
  // Saawariya Specialty
  {
    id: 1,
    name: "Thekua",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    popular: true,
    image: "/images/food/thekua.jpg",
    description: "Traditional sweet delicacy from Purwanchal, perfect with evening tea"
  },
  {
    id: 2,
    name: "Dal Pithi",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/dal-pithi.jpg",
    description: "Handmade pasta in a spiced lentil soup, a comforting regional staple"
  },
  {
    id: 3,
    name: "Sabu dana Vada",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/saboodana-vada.jpg",
    description: "Crispy tapioca pearls patties flavored with herbs and spices"
  },
  {
    id: 4,
    name: "Farra",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/farra.jpg",
    description: "Steamed rice dumplings with a delicious filling, served with spicy chutney"
  },
  {
    id: 5,
    name: "Bhauri",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/bhauri.jpg",
    description: "Traditional breakfast item made with rice flour, steamed to perfection"
  },
  {
    id: 6,
    name: "Chana Dal Pakora",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/chana-dal-pakora.jpg",
    description: "Crispy fritters made with split chickpeas, perfect snack with tea"
  },
  {
    id: 7,
    name: "2 Sattu Paratha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/sattu-paratha.jpg",
    description: "Flatbread stuffed with roasted gram flour mixture, served with pickle"
  },
  {
    id: 8,
    name: "Poha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/poha.jpg",
    description: "Flattened rice cooked with onions, peanuts, and spices, a light meal"
  },
  {
    id: 9,
    name: "Appe",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/appe.jpg",
    description: "Soft and fluffy rice pancakes, served with coconut chutney"
  },
  {
    id: 10,
    name: "Sev Tamatar Sabji",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/sev-tamatar.jpg",
    description: "Spicy tomato curry topped with crispy gram flour noodles"
  },
  {
    id: 11,
    name: "2 Besan Chilla",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/besan-chilla.jpg",
    description: "Savory gram flour pancakes with herbs and spices"
  },
  {
    id: 12,
    name: "Namkeen Sevai",
    price: "₹119",
    takeawayPrice: "₹107",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/namkeen-sevai.jpg",
    description: "Savory rice noodles tossed with spices and vegetables"
  },
  {
    id: 13,
    name: "Nimona",
    price: "₹219",
    takeawayPrice: "₹197",
    category: "Saawariya Specialty",
    veg: true,
    popular: true,
    image: "/images/food/nimona.jpg",
    description: "Traditional green pea curry with special spices, a regional delicacy"
  },
  
  // Saawariya Vrat Special - Vrat Snacks
  {
    id: 14,
    name: "Paneer Pakora",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true,
    image: "/images/food/paneer-pakora.jpg",
    description: "Cottage cheese fritters suitable for fasting days"
  },
  {
    id: 15,
    name: "Aloo Vada",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true,
    image: "/images/food/aloo-vada.jpg",
    description: "Spiced potato fritters made with rock salt, perfect for fasting"
  },
  {
    id: 16,
    name: "Sabu dana Vada",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true,
    image: "/images/food/saboodana-vada-vrat.jpg",
    description: "Fasting-friendly tapioca pearls patties with peanuts"
  },
  
  // Saawariya Vrat Special - Vrat Sweet
  {
    id: 17,
    name: "Sabu dana Kheer",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Sweet",
    veg: true,
    image: "/images/food/saboodana-kheer.jpg",
    description: "Sweet tapioca pudding with nuts, suitable for fasting days"
  },
  
  // Saawariya Vrat Special - Vrat Meal Combo
  {
    id: 18,
    name: "Aloo Jeera with Curd",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    image: "/images/food/aloo-jeera-curd.jpg",
    description: "Cumin-flavored potatoes served with fresh curd"
  },
  {
    id: 19,
    name: "Sabudana Khichdi with Curd",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    image: "/images/food/saboodana-khichdi.jpg",
    description: "Tapioca pearls cooked with peanuts and spices, served with curd"
  },
  {
    id: 20,
    name: "Vrat Basic Thali",
    description: "Aloo Jeera + Kuttu ke atta ki 4 poori + Curd",
    price: "₹189",
    takeawayPrice: "₹170",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    image: "/images/food/vrat-basic-thali.jpg"
  },
  {
    id: 21,
    name: "Vrat Special Thali",
    description: "Sabudana Khichdi + Aloo Jeera + Aloo Vada + Curd",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    popular: true,
    image: "/images/food/vrat-special-thali.jpg"
  },
  
  // Saawariya Combos
  {
    id: 22,
    name: "Chili Paneer with Fried Rice/Noodles",
    description: "Served with a coke",
    price: "₹269",
    takeawayPrice: "₹242",
    category: "Saawariya Combos",
    veg: true,
    popular: true,
    image: "/images/food/chili-paneer-combo.jpg"
  },
  {
    id: 23,
    name: "Veg Manchurian with Fried Rice/Noodles",
    description: "Served with a coke",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/veg-manchurian-combo.jpg"
  },
  {
    id: 24,
    name: "Dal Fry Combo",
    description: "Served with Rice/4 Roti/2 Paratha",
    price: "₹159",
    takeawayPrice: "₹143",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/dal-fry-combo.jpg"
  },
  {
    id: 25,
    name: "Poori Sabji Combo",
    description: "Served with 6 Poori/4 Roti/2 Paratha/4 Chawal ke Atte ki poori",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/poori-sabji-combo.jpg"
  },
  {
    id: 26,
    name: "Paneer Bhurji Combo",
    description: "Served with 4 Roti/2 Paratha",
    price: "₹179",
    takeawayPrice: "₹161",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/paneer-bhurji-combo.jpg"
  },
  {
    id: 27,
    name: "Winter Special Combo",
    description: "Nimona + Rice + 4 Roti/2 Paratha",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Combos",
    veg: true,
    popular: true,
    image: "/images/food/winter-special-combo.jpg"
  },
  {
    id: 28,
    name: "Veg Basic Thali",
    description: "Daal + Sookhi Sabji + Rice + 4 Roti/2 Paratha",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/veg-basic-thali.jpg"
  },
  {
    id: 29,
    name: "Veg Standard Thali",
    description: "Paneer ki Sabji + Rice + Roti/Paratha",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Combos",
    veg: true,
    image: "/images/food/veg-standard-thali.jpg"
  },
  {
    id: 30,
    name: "Veg Special Thali",
    description: "Paneer ki Sabji + Daal + Rice + Roti/Paratha + Sweet",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    veg: true,
    popular: true,
    image: "/images/food/veg-special-thali.jpg"
  },
  
  // Saawariya's Dessert
  {
    id: 31,
    name: "Kheer",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya's Dessert",
    veg: true,
    image: "/images/food/kheer.jpg",
    description: "Traditional rice pudding with cardamom and nuts"
  },
  {
    id: 32,
    name: "Pedha",
    price: "₹179",
    takeawayPrice: "₹161",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams",
    image: "/images/food/pedha-small.jpg",
    description: "Traditional milk-based sweet with cardamom flavor"
  },
  {
    id: 33,
    name: "Pedha",
    price: "₹349",
    takeawayPrice: "₹314",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams",
    image: "/images/food/pedha-medium.jpg",
    description: "Traditional milk-based sweet with cardamom flavor"
  },
  {
    id: 34,
    name: "Pedha",
    price: "₹699",
    takeawayPrice: "₹629",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram",
    image: "/images/food/pedha-large.jpg",
    description: "Traditional milk-based sweet with cardamom flavor"
  },
  {
    id: 35,
    name: "Dry Fruits Laddu",
    price: "₹349",
    takeawayPrice: "₹314",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams",
    popular: true,
    image: "/images/food/dry-fruit-laddu-small.jpg",
    description: "Nutritious sweet balls made with assorted dry fruits and nuts"
  },
  {
    id: 36,
    name: "Dry Fruits Laddu",
    price: "₹749",
    takeawayPrice: "₹674",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams",
    image: "/images/food/dry-fruit-laddu-medium.jpg",
    description: "Nutritious sweet balls made with assorted dry fruits and nuts"
  },
  {
    id: 37,
    name: "Dry Fruits Laddu",
    price: "₹1549",
    takeawayPrice: "₹1394",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram",
    image: "/images/food/dry-fruit-laddu-large.jpg",
    description: "Nutritious sweet balls made with assorted dry fruits and nuts"
  },
  {
    id: 38,
    name: "Gondh ke Laddu",
    price: "₹289",
    takeawayPrice: "₹260",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams",
    image: "/images/food/gondh-laddu-small.jpg",
    description: "Traditional winter sweet with edible gum and nuts"
  },
  {
    id: 39,
    name: "Gondh ke Laddu",
    price: "₹599",
    takeawayPrice: "₹539",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams",
    image: "/images/food/gondh-laddu-medium.jpg",
    description: "Traditional winter sweet with edible gum and nuts"
  },
  {
    id: 40,
    name: "Gondh ke Laddu",
    price: "₹1199",
    takeawayPrice: "₹1079",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram",
    image: "/images/food/gondh-laddu-large.jpg",
    description: "Traditional winter sweet with edible gum and nuts"
  },
  {
    id: 41,
    name: "Alsi ke Laddu",
    price: "₹279",
    takeawayPrice: "₹251",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams",
    image: "/images/food/alsi-laddu-small.jpg",
    description: "Nutritious flaxseed-based sweet for winter"
  },
  {
    id: 42,
    name: "Alsi ke Laddu",
    price: "₹599",
    takeawayPrice: "₹539",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams",
    image: "/images/food/alsi-laddu-medium.jpg",
    description: "Nutritious flaxseed-based sweet for winter"
  },
  {
    id: 43,
    name: "Alsi ke Laddu",
    price: "₹1199",
    takeawayPrice: "₹1079",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram",
    image: "/images/food/alsi-laddu-large.jpg",
    description: "Nutritious flaxseed-based sweet for winter"
  }
];
