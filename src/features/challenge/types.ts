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
  fabric_type: string;
  value: number;
  label: string;
  dataId: string;
  factor: number;
  unit: string;
  points: number;
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
  factor: number;
  unit: string;
  points: number;
};
export type TApplianceTypeResponse = {
  status: string;
  message: string;
  data: TApplianceType[];
};

export type TApplianceState = {
  appliances: TApplianceType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type TGoodsFormPayload = {
  goodsType: number;
  date: Date;
  // applianceType: number;
  item: TApplianceType[] | TClothesType[];
  notes: string;
  image: string[];
};

export type TGoodsFormState = {
  goodsType: any;
  status: 'idle' | 'loading' | 'succeded' | 'failed';
  error: string | null;
};

export type TMember = {
  _id: string;
  fullName: string;
  mobileNumber: string;
  relationship: string;
  studentId: string;
  schoolCollegeId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  // __v: number;
};

export type TAddMemberFormPayload = {
  fullName: string;
  mobileNumber: string;
  relationship: string;
  // image: string;
};

export type TAddMemberFormResponse = {
  status: string;
  message: string;
  data: TMember;
};

export type TGetMembersResponse = {
  status: string;
  message: string;
  data: TMember[];
};
