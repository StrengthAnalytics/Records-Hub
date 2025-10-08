export enum Region {
  British = 'British',
  England = 'England',
  Wales = 'Wales',
  Scotland = 'Scotland',
  NorthernIreland = 'Northern Ireland',
  NorthWest = 'North West',
  YorkshireNorthEast = 'Yorkshire and North East',
  NorthMidlands = 'North Midlands',
  WestMidlands = 'West Midlands',
  EastMidlands = 'East Midlands',
  SouthMidlands = 'South Midlands',
  GreaterLondon = 'Greater London',
  SouthWest = 'South West',
  SouthEast = 'South East',
}

export enum AgeCategory {
  SubJunior = 'Sub-Junior',
  Junior = 'Junior',
  Open = 'Open',
  Masters1 = 'Masters 1',
  Masters2 = 'Masters 2',
  Masters3 = 'Masters 3',
  Masters4 = 'Masters 4',
}

export enum LiftType {
  Squat = 'Squat',
  Bench = 'Bench Press',
  Deadlift = 'Deadlift',
  Total = 'Total',
}

export interface PowerliftingRecord {
  id: number;
  lifterName: string;
  region: Region;
  ageCategory: AgeCategory;
  bodyweightCategory: string; // e.g., 'U83kg', '120kg+'
  gender: 'Male' | 'Female';
  liftType: LiftType;
  weightKg: number;
  dateSet: string; // YYYY-MM-DD
  competition: string;
}

export enum ViewMode {
  Viewer = 'VIEWER',
  Admin = 'ADMIN',
}

export interface Notification {
    id: number;
    region: Region;
    date: string; // YYYY-MM-DD
    sourceType: 'PDF' | 'Google Sheet';
    sourceUrl: string;
    gender: 'Male' | 'Female';
}
