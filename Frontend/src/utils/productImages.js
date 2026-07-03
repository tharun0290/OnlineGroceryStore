import { SERVER_URL } from './constants';

/**
 * Maps product names to their local image paths in /products/.
 * When the backend doesn't provide an imageUrl, this mapping provides
 * a high-quality local fallback image for each seeded product.
 */

const PRODUCT_IMAGE_MAP = {
  'Basmati Rice (5kg)': '/products/basmati_rice.png',
  'Sona Masoori Rice (10kg)': '/products/sona_masoori_rice.png',
  'Toor Dal (1kg)': '/products/toor_dal.png',
  'Moong Dal (1kg)': '/products/moong_dal.png',
  'Sunflower Oil (5L)': '/products/sunflower_oil.png',
  'Groundnut Oil (1L)': '/products/groundnut_oil.png',
  'Turmeric Powder (200g)': '/products/turmeric_powder.png',
  'Red Chilli Powder (200g)': '/products/red_chilli_powder.png',
  'Cumin Seeds (100g)': '/products/cumin_seeds.png',
  'Cashew Nuts (250g)': '/products/cashew_nuts.png',
  'Almonds (250g)': '/products/almonds.png',
  'Raisins (200g)': '/products/raisins.png',
  'Potato Chips (150g)': '/products/potato_chips.png',
  'Mixture (200g)': '/products/mixture.png',
  'Full Cream Milk (1L)': '/products/full_cream_milk.png',
  'Paneer (200g)': '/products/paneer.png',
  'Curd (500ml)': '/products/curd.png',
  'Filter Coffee Powder (200g)': '/products/filter_coffee.svg',
  'Green Tea (25 bags)': '/products/green_tea.svg',
  'Tomato (1kg)': '/products/tomato.svg',
  'Onion (1kg)': '/products/onion.svg',
  'Banana (1 dozen)': '/products/banana.svg',
  'Apple (1kg)': '/products/apple.svg',
  'Detergent Powder (1kg)': '/products/detergent_powder.svg',
  'Dish Wash Liquid (500ml)': '/products/dish_wash.svg',
};

/**
 * Resolves the best available image URL for a product.
 * Priority: backend imageUrl > local name-based map > generated placeholder.
 *
 * @param {object} product - The product object with name and optional imageUrl
 * @param {string} apiUrl  - The backend API base URL
 * @returns {string} The resolved image URL
 */
export function getProductImageUrl(product, apiUrl = SERVER_URL) {
  // 1. Backend-provided image (uploaded by admin)
  if (product.imageUrl) {
    return `${apiUrl}${product.imageUrl}`;
  }

  // 2. Local image from the map
  if (PRODUCT_IMAGE_MAP[product.name]) {
    return PRODUCT_IMAGE_MAP[product.name];
  }

  // 3. Fallback: generated placeholder with product initial
  return `https://placehold.co/400x300/E8F5E9/16A34A?text=${encodeURIComponent(product.name.split(' ')[0])}`;
}

export default PRODUCT_IMAGE_MAP;
