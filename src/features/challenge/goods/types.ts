export type TGoodsType = {
  value: number;
  label: string;
  dataId: string;
};

export type TGoodsTypeResponse = {
  status: string;
  message: string;
  data: TGoodsType[];
};

export type TGoodsState = {
  goods: TGoodsType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string|null;
};
