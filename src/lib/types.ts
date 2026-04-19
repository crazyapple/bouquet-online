export interface Flower {
  id: string;
  name: string;
  count: number;
  imageUrl: string; // Placeholder or actual image URL
}

export interface Leaf {
  id: string;
  name: string;
  imageUrl: string; // Placeholder or actual image URL
}

export interface FlowerPlacement {
  id: string;
  name: string;
  imageUrl: string;
  flowerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface BouquetDesign {
  id: string;
  placements: FlowerPlacement[];
  leafId: string;
  sender: string;
  message: string;
  recipient: string;
  createdAt: Date;
  canvasWidth: number;
  canvasHeight: number
}

export interface CartItem {
  id: string;
  bouquetDesign: BouquetDesign;
  quantity: number;
  price: number;
}

export interface UserState {
  selectedFlowers: Flower[];
  currentBouquet: BouquetDesign | null;
  cartItems: CartItem[];
  totalPrice: number;
}

export interface DragItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
