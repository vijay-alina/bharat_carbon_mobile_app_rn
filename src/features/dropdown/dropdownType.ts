export interface FoodItem {
  EF_Value_Unit: string;
  Final_EF_Value: number;
  Points: number;
  label: string;
  value: number;
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

export interface TravelMode {
  dataId: string;
  iconUrl: string;
  label: string;
  state: string;
  type: string;
  value: number;
}

export interface TripType {
  value: number;
  label: string;
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
