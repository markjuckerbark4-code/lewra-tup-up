export interface TopUpPackage {
  id: string;
  name: string;
  diamonds?: number;
  price: number;
  originalPrice?: number;
  tag?: string;
  bonus?: string;
}

export interface GameItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'offer' | 'freefire' | 'efootball' | 'social';
  image: string;
  badge?: string;
  packages: TopUpPackage[];
  requirePlayerId: boolean;
  requireServer?: boolean;
  placeholderText?: string;
  description?: string;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'upay';

export interface Order {
  id: string;
  itemId: string;
  itemTitle: string;
  packageId: string;
  packageName: string;
  amount: number;
  playerId: string;
  playerName?: string;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  trxId: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
