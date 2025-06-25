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
  error: string | null;
};


export type TClothesType = {
  value: number;
  label: string;
  dataId: string;
};

export type TClothesTypeResponse = {
  status: string;
  message: string;
  data: TClothesType[];
};

export type TClothesState = {
  cloths: TClothesType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type TApplianceType = {
  value: number;
  label: string;
  dataId: string;
}
export type TApplianceTypeResponse = {
  status: string;
  message: string;
  data: TApplianceType[];
}

export type TApplianceState = {
  appliances: TApplianceType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type TGoodsFormPayload = {
  goodsType: number,
  date: Date
  applianceType: number
  notes: string
  image: string[]
}

export type TGoodsFormState = {
  goodsType: any
  status: 'idle' | 'loading' | 'succeded' | 'failed';
  error: string | null;

}