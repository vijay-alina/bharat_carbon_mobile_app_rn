export interface Electricity {
  month: number;
  year: number;
  consumption: number;
  unit: string;
  isSolarInstalled: boolean;
  notes: string;
  electricityGenerationUnit?: string;
  electricityGeneration?: number;
  image: string[];
}

export interface Fuel {
  date: Date;
  fuel: number;
  quantity: number;
  unit: string;
  notes: string;
  studentId: string;
  schoolCollegeId: string;
  image?: string[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Water {
  date: Date;
  waterSource: number;
  consumed: number;
  unit: string;
  notes: string;
  studentId: string;
  schoolCollegeId: string;
  image?: string[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Waste {
  date: Date;
  wasteType: number;
  quantity: number;
  unit: string;
  notes: string;
  studentId: string;
  schoolCollegeId: string;
  image?: string[];
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Applience {
  year: number;
  type: number;
  brandName: string;
  gasFilled: number;
  charge: number;
  unit: string;
  notes: string;
  image?: string[];
}

export interface HousingDataState {
  electricity: Electricity[] | [];
  fuel: Fuel[] | [];
  water: Water[] | [];
  waste: Waste[] | [];
  appliances: Applience[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
