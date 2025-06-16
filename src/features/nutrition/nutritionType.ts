export interface Nutrition {
  date: Date;
  mealType: number;
  mealStyle: number;
  item?: string[];
  notes: string;
  studentId: string; // or Types.ObjectId if you want stricter typing
  schoolCollegeId: string; // or Types.ObjectId
  image?: string[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NutritionState {
  nutrition: Nutrition[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
