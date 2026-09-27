export interface TopUpPackage {
  id: string;
  name: string;
  diamonds?: number;
  price: number;
  originalPrice?: number;
  tag?: string;
  bonus?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface GameItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
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

export interface StoreSettings {
  storeName: string;
  supportPhone: string;
  whatsappNumber: string;
  facebookLink: string;
  telegramLink: string;
  noticeText: string;
  noticeActive: boolean;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
}
