export interface GoodsGroup {
  id: number
  name: string
  description: string
  is_active: boolean
}
export interface Goods{
  id: number
  goods_name: string
  model_no: string
  owner: string
  detail: string
  goodsGroup: GoodsGroup | null
  goods_group_id: number | null
}