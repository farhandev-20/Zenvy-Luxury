import { Product, UserProfile } from './types';

// Let's gather the top-tier imagery
export const IMAGES = {
  // Banners & Backgrounds
  splashBg: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=1200', // Spotlight white overlay
  onboarding01: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600', // Modish model
  onboarding02: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600', // Chic detail (Fixed)
  onboarding03: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600', // Golden touch env
  loginSidebar: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', // Side moody luxury
  fashionBanner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200', // Sea blue linen model
  accessoriesBanner: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200', // Elegant bag complete look
  beautyBanner: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200', // Gold radiance bottles (Fixed)
  kidsBanner: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1200', // Playful clothing
  silkGoldBanner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200', // Heritage banner
};

export const FASHION_PRODUCTS: Product[] = [
  // Flash Sale Items
  {
    id: 'f-1',
    name: 'Classic Tote',
    category: 'LEATHER GOODS',
    price: 450,
    originalPrice: 640,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    tag: '-30%'
  },
  {
    id: 'f-2',
    name: 'Wool Coat',
    category: 'OUTERWEAR',
    price: 890,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    tag: '-20%'
  },
  {
    id: 'f-3',
    name: 'Silk Scarf Set',
    category: 'ACCESSORIES',
    price: 120,
    originalPrice: 200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
    tag: '-40%'
  },
  {
    id: 'f-4',
    name: 'City Watch',
    category: 'WATCHES',
    price: 1250,
    originalPrice: 1470,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    tag: '-15%'
  },
  // Trending Now
  {
    id: 'f-5',
    name: 'Canary Silk Gown',
    category: 'TRENDING',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f-6',
    name: 'Suede Classic Loafer',
    category: 'TRENDING',
    price: 580,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f-7',
    name: 'Linen Blend Jacket',
    category: 'TRENDING',
    price: 720,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f-8',
    name: 'Sterling Ripple Hoop',
    category: 'TRENDING',
    price: 310,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600'
  }
];

export const ACCESSORIES_PRODUCTS: Product[] = [
  {
    id: 'a-1',
    name: 'Grand Watch',
    category: 'WATCHES', // Simplified
    price: 1250,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600', // Fixed
    tag: 'NEW ARRIVAL',
    subCategory: 'watches'
  },
  {
    id: 'a-2',
    name: 'Azure Silk Scarf',
    category: 'SCARVES', // Simplified
    price: 340,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    subCategory: 'bags'
  },
  {
    id: 'a-3',
    name: 'Gold Link Bracelet',
    category: 'JEWELRY', // Simplified
    price: 890,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    subCategory: 'jewellery'
  },
  {
    id: 'a-4',
    name: 'Black Leather Bag',
    category: 'BAGS',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600', // Fixed
    subCategory: 'bags'
  },
  {
    id: 'a-5',
    name: 'The Gold Standard',
    category: 'WATCHES',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    subCategory: 'watches',
    description: 'Classic watch for collectors' // Simplified
  }
];

export const BEAUTY_PRODUCTS: Product[] = [
  {
    id: 'b-1',
    name: 'Golden Radiance Serum',
    category: 'SERUMS', // Simplified
    price: 145,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    rating: 5,
    reviewsCount: 124,
    tag: 'BEST SELLER',
    subCategory: 'skincare'
  },
  {
    id: 'b-2',
    name: 'Repair & Renew Balm',
    category: 'BALMS', // Simplified
    price: 98,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600', // Fixed
    rating: 5,
    reviewsCount: 89,
    subCategory: 'skincare'
  },
  {
    id: 'b-3',
    name: 'Midnight Bloom Perfume',
    category: 'PERFUMES', // Simplified
    price: 220,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    rating: 5,
    reviewsCount: 210,
    subCategory: 'fragrance'
  },
  {
    id: 'b-4',
    name: 'Desert Muse Palette',
    category: 'MAKEUP', // Simplified
    price: 72,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
    rating: 5,
    reviewsCount: 56,
    subCategory: 'makeup'
  }
];

export const KIDS_PRODUCTS: Product[] = [
  {
    id: 'k-1',
    name: 'Classic Linen Dress',
    category: 'GOLD EDITION',
    price: 185,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600',
    subCategory: 'girls'
  },
  {
    id: 'k-2',
    name: 'Velvet Hair Bows',
    category: 'LIMITED SERIES',
    price: 120,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
    tag: 'NEW',
    subCategory: 'girls'
  },
  {
    id: 'k-3',
    name: 'Soft Cashmere Sweater',
    category: 'ORGANIC BASICS',
    price: 210,
    image: 'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?auto=format&fit=crop&q=80&w=600',
    subCategory: 'baby'
  },
  {
    id: 'k-4',
    name: 'Tailored Golden Shorts',
    category: 'MODERN CLASSIC',
    price: 95,
    image: 'https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=600',
    subCategory: 'boys'
  }
];

export const SILK_GOLD_PRODUCTS: Product[] = [
  {
    id: 's-1',
    name: 'Champagne Silk Dress',
    category: 'ZENVY CLOTHING', // Simplified
    price: 450,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    tag: 'NEW ARRIVAL',
    subCategory: 'dresses'
  },
  {
    id: 's-2',
    name: 'Gold Foil Silk Set',
    category: 'TRADITIONAL EDIT', // Simplified
    price: 295,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    subCategory: 'ethnic'
  },
  {
    id: 's-3',
    name: 'Leather Tote Bag',
    category: 'BOUTIQUE', // Simplified
    price: 890,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600',
    subCategory: 'bags'
  },
  {
    id: 's-4',
    name: 'Golden Blazer',
    category: 'LIMITED EDITION', // Simplified
    price: 575,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    tag: 'LIMITED EDITION',
    subCategory: 'beauty'
  }
];

export const DEFAULT_CART_ITEMS = [
  {
    product: {
      id: 'cart-1',
      name: 'Ribbed Knit Dress',
      category: 'GOLD',
      price: 240,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    },
    quantity: 1,
    selectedSize: 'M'
  },
  {
    product: {
      id: 'cart-2',
      name: 'Leather Handbag',
      category: 'TAN',
      price: 850,
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600',
    },
    quantity: 1,
    selectedSize: 'One Size'
  }
];

export const WISH_RECOMMENDATIONS: Product[] = [
  {
    id: 'w-1',
    name: 'Gold Heels',
    category: 'NEW ARRIVAL',
    price: 380,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'w-2',
    name: 'Silk Print Scarf',
    category: 'LIMITED EDITION',
    price: 195,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'w-3',
    name: 'Gold Watch',
    category: 'ACCESSORIES',
    price: 520,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'w-4',
    name: 'Cashmere Sweater',
    category: 'ESSENTIAL',
    price: 450,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600'
  }
];

export const SANCTUARY_ITEMS: Product[] = [
  {
    id: 'sanct-1',
    name: 'Midnight Silk Dress', // Simplified
    category: 'ZENVY',
    price: 1240,
    originalPrice: 1550,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'sanct-2',
    name: 'Classic Leather Bag', // Simplified
    category: 'ZENVY',
    price: 850,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'sanct-3',
    name: 'Golden Earrings', // Simplified
    category: 'ZENVY',
    price: 420,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'sanct-4',
    name: 'Black Suede Heels', // Simplified
    category: 'ZENVY',
    price: 690,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_PROFILE: UserProfile = {
  fullName: 'Julianne V. Smith',
  email: 'julianne.smith@zenvy.com',
  phone: '+1 (555) 0123 4567',
  gender: 'Female',
  dob: '1992-05-15',
  address: {
    street: '742 Evergreen Terrace, Apartment 4B',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62704'
  },
  avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300'
};
