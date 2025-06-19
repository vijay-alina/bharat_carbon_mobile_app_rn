export interface FoodItem {
  date: Date;
  mealType: number;
  mealStyle: number;
  item?: string[];
  notes: string;
  studentId: string;
  schoolCollegeId: string;
  image?: string[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MealType {
  value: number;
  label: string;
  dataId: string;
}

export interface MealStyle {
  value: number;
  label: string;
  dataId: string;
}

export interface Fueltype {
  value: number;
  label: string;
  state: string;
  dataId: string;
}

export interface WaterSourceType {
  value: number;
  label: string;
  state: string;
  dataId: string;
}

export interface ApplianceType {
  value: number;
  label: string;
  dataId: string;
}

export interface GasUsedType {
  value: number;
  label: string;
  state: string;
  dataId: string;
}

export interface leisureActivityNameType {
  value: number;
  label: string;
  dataId: string;
}

export interface dropdownState {
  foodItem: FoodItem[] | [];
  mealType: MealType[] | [];
  mealStyle: MealStyle[] | [];
  fuelType: Fueltype[] | [];
  waterSource: WaterSourceType[] | [];
  appliance: ApplianceType[] | [];
  gasUsed: GasUsedType[] | [];
  leisureActivity: leisureActivityNameType[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
