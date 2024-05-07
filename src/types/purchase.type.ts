import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  createdAt: string
  updatedAt: string
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
}
