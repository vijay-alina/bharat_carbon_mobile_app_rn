export interface FoodItem {
  EF_Value_Unit: string;
  Final_EF_Value: number;
  points: number;
  label: string;
  value: number;
  quantity?: number;
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
  dataId: string;
  factor: number;
  unit: string;
  points: number;
}

export interface WaterSourceType {
  value: number;
  label: string;
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
  dataId: string;
  factor: number;
  unit: string;
  points: number;
}

export interface leisureActivityNameType {
  value: number;
  label: string;
  dataId: string;
  factor: number;
  unit: string;
  points: number;
}

export interface TravelMode {
  value: number;
  label: string;
  dataId: string;
  factor: number;
  unit: string;
  points: number;
}

export interface TripType {
  value: number;
  label: string;
}

export interface WasteType {
  value: number;
  label: string;
  dataId: string;
  factor: number;
  unit: string;
  points: number;
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
  travelMode: TravelMode[] | [];
  tripType: TripType[] | [];
  wasteType: WasteType[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
