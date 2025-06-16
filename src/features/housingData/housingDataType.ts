export interface HousingData {
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

export interface HousingDataState {
  housingData: HousingData[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
