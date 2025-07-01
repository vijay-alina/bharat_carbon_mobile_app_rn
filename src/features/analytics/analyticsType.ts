export interface AnalyticsResponse {
  status: string;
  message: string;
  data: AnalyticsData;
}

export interface EmissionValue {
  value: number;
  unit: string;
  year: string;
}

export interface MonthlyEmissionAll {
  month: number;
  name: string;
  value: number;
  unit: string;
}

export interface MonthlyEmission {
  month: number;
  value: number;
}

export interface SubCategoryItem {
  _id: string;
  dataId: string;
  category: string;
  monthlyEmission: MonthlyEmission[];
  yearlyEmission: number;
  percent: number;
  unit: string;
  year: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AnalyticsCategory {
  category: string;
  icon: string;
  bgFill: string;
  fill: string;
  totalEmission: number;
  percent: number;
  timeRange: string;
  subCategoryItem: SubCategoryItem[];
}

export interface AnalyticsData {
  totalEmission: EmissionValue;
  monthlyEmission: MonthlyEmissionAll[];
  category: AnalyticsCategory[];
}

export interface AnalyticState {
  analytics: AnalyticsData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
