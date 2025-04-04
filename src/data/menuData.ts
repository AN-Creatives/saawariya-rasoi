
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
  "Saawariya's Dessert",
  "Saawariya's Beverages"
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
    image: "/lovable-uploads/d87c301a-c018-427d-8769-cbce42c3ed90.png",
    description: "Traditional sweet delicacy from Purwanchal, perfect with evening tea"
  },
  {
    id: 2,
    name: "Dal Pithi",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/f3297764-5a42-4d41-9da9-8db3e7c0e496.png",
    description: "Handmade pasta in a spiced lentil soup, a comforting regional staple"
  },
  {
    id: 3,
    name: "Sabudana Vada",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/37227f53-735b-4ced-923b-448c62b773af.png",
    description: "Crispy tapioca pearls patties flavored with herbs and spices"
  },
  {
    id: 4,
    name: "Farra",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/d732eba0-f1e3-4ddb-86d6-b6463755436e.png",
    description: "Steamed rice dumplings with a delicious filling, served with spicy chutney"
  },
  {
    id: 5,
    name: "Bhauri",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/1f2f4253-b47e-49bc-9613-9b10ca562c19.png",
    description: "Traditional breakfast item made with rice flour, steamed to perfection"
  },
  {
    id: 6,
    name: "Dahi Vada",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/dahi-vada.jpg",
    description: "Soft lentil dumplings soaked in yogurt with tangy chutneys",
    quantity: "4 pc"
  },
  {
    id: 7,
    name: "Dahi Vada",
    price: "₹299",
    takeawayPrice: "₹269",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/dahi-vada-large.jpg",
    description: "Soft lentil dumplings soaked in yogurt with tangy chutneys",
    quantity: "10 pc"
  },
  {
    id: 8,
    name: "Chana Dal Pakora",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/c9bb4575-9871-4cf1-a947-7726885fa905.png",
    description: "Crispy fritters made with split chickpeas, perfect snack with tea"
  },
  {
    id: 9,
    name: "2 Sattu Paratha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/sattu-paratha.jpg",
    description: "Flatbread stuffed with roasted gram flour mixture, served with pickle"
  },
  {
    id: 10,
    name: "Poha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/a39b39ea-e0eb-448d-a369-856b228b31be.png",
    description: "Flattened rice cooked with onions, peanuts, and spices, a light meal"
  },
  {
    id: 11,
    name: "Appe",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/3a42cbeb-7dc9-49db-8012-7d3bb797111d.png",
    description: "Soft and fluffy rice pancakes, served with coconut chutney"
  },
  {
    id: 12,
    name: "Sev Tamatar Sabji",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true,
    image: "/images/food/sev-tamatar.jpg",
    description: "Spicy tomato curry topped with crispy gram flour noodles"
  },
  {
    id: 13,
    name: "Namkeen Sevai",
    price: "₹119",
    takeawayPrice: "₹107",
    category: "Saawariya Specialty",
    veg: true,
    image: "/lovable-uploads/86db043d-2f31-4cfa-9bd7-b146abbbed41.png",
    description: "Savory rice noodles tossed with spices and vegetables"
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
    image: "/lovable-uploads/41106599-16ab-424e-823b-059e97ee0be0.png",
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
    image: "/lovable-uploads/4ae29181-655a-42cb-ada7-c6103515d3a7.png",
    description: "Spiced potato fritters made with rock salt, perfect for fasting"
  },
  {
    id: 16,
    name: "Sabudana Vada",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true,
    image: "/lovable-uploads/37227f53-735b-4ced-923b-448c62b773af.png",
    description: "Fasting-friendly tapioca pearls patties with peanuts"
  },
  
  // Saawariya Vrat Special - Vrat Sweet
  {
    id: 17,
    name: "Sabudana Kheer",
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
    image: "/lovable-uploads/63ac2e7f-50f8-4f1a-967f-70bc79c7b488.png",
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
    description: "Sabudana Khichdi + Aloo Jeera + Kuttu ke atta ki 2 poori + 2 Aloo Vada + Curd",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    popular: true,
    image: "/images/food/vrat-special-thali.jpg"
  },
  
  // Saawariya Combos - Meal Combos
  {
    id: 22,
    name: "Dal Fry Combo",
    description: "Served with Rice/4 Roti/2 Paratha",
    price: "₹159",
    takeawayPrice: "₹143",
    category: "Saawariya Combos",
    subcategory: "Meal Combos",
    veg: true,
    image: "/images/food/dal-fry-combo.jpg"
  },
  {
    id: 23,
    name: "Poori Sabji Combo",
    description: "Served with 6 Poori/4 Roti/2 Paratha/4 Chawal ke Atte ki poori",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Combos",
    subcategory: "Meal Combos",
    veg: true,
    image: "/images/food/poori-sabji-combo.jpg"
  },
  {
    id: 24,
    name: "Paneer Bhurji Combo",
    description: "Served with 4 Roti/2 Paratha",
    price: "₹179",
    takeawayPrice: "₹161",
    category: "Saawariya Combos",
    subcategory: "Meal Combos",
    veg: true,
    image: "/images/food/paneer-bhurji-combo.jpg"
  },
  {
    id: 31,
    name: "Tahri Combo",
    description: "Tahari + Raita + Achaar + Salad",
    price: "₹189",
    takeawayPrice: "₹170",
    category: "Saawariya Combos",
    subcategory: "Meal Combos",
    veg: true,
    image: "/images/food/tahri-combo.jpg"
  },
  
  // Saawariya Combos - Paratha Combos
  {
    id: 32,
    name: "Aloo Paratha with Dahi",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Combos",
    subcategory: "Paratha Combos",
    veg: true,
    image: "/images/food/aloo-paratha.jpg",
    description: "Potato stuffed flatbread served with yogurt"
  },
  {
    id: 33,
    name: "Paneer Paratha with Curd",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Combos",
    subcategory: "Paratha Combos",
    veg: true,
    image: "/images/food/paneer-paratha.jpg",
    description: "Cottage cheese stuffed flatbread served with yogurt"
  },
  
  // Saawariya Combos - Thali
  {
    id: 25,
    name: "Veg Basic Thali",
    description: "Daal + Sookhi Sabji + Rice + 4 Roti/2 Paratha",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Combos",
    subcategory: "Thali",
    veg: true,
    image: "/images/food/veg-basic-thali.jpg"
  },
  {
    id: 26,
    name: "Veg Standard Thali",
    description: "Paneer ki Sabji + Rice + Roti/Paratha",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Combos",
    subcategory: "Thali",
    veg: true,
    image: "/images/food/veg-standard-thali.jpg"
  },
  {
    id: 27,
    name: "Veg Special Thali",
    description: "Paneer ki Sabji + Daal + Rice + Roti/Paratha + Sweet",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    subcategory: "Thali",
    veg: true,
    popular: true,
    image: "/images/food/veg-special-thali.jpg"
  },
  
  // Saawariya's Dessert
  {
    id: 28,
    name: "Kheer",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya's Dessert",
    veg: true,
    image: "/images/food/kheer.jpg",
    description: "Traditional rice pudding with cardamom and nuts"
  },
  
  // Saawariya's Beverages
  {
    id: 29,
    name: "Lassi",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya's Beverages",
    veg: true,
    image: "/images/food/lassi.jpg",
    description: "Traditional yogurt-based sweet or salted drink"
  },
  {
    id: 30,
    name: "Masala Chaas",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya's Beverages",
    veg: true,
    image: "/images/food/masala-chaas.jpg",
    description: "Spiced buttermilk with mint and cumin"
  }
];
