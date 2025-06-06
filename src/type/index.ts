export interface Offer {
  id: number;
  ads_name: string;
  owner_name: string;
  created_date: string; // hoặc dùng Date nếu bạn sẽ parse thành Date object
  status: string;
  image_url: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  image_url: string;
  seller_name: string;
  location_distance: number;
  total_offer: string;
  offers: Offer[];
  images: string[];
}
export interface ProductItem {
  id: number;
  name: string;
  type: string;
  short_description: string;
  description: string;
  image_url: string;
  seller_id: number;
  seller_name: string;
  location_distance: number;
  status: string;
  created_date: string; // hoặc Date nếu bạn muốn parse ngày
  collection_id: number;
  collection_name: string;
}
