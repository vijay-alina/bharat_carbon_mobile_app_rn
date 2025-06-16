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

export interface dropdownState {
  foodItem: FoodItem | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
