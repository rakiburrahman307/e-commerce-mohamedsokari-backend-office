import { Types } from 'mongoose';

export interface CartItem {
  productId: Types.ObjectId;
}

export interface ICart {
  userId: Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}
