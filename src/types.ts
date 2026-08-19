export interface Thought {
  id: number;
  content: string;
  date: string; // ISO date string, e.g. "2025-04-21"
  author: string;
}

export interface Word {
  id: number;
  word: string;
  sounds_good: boolean;
  looks_good: boolean;
  means_good: boolean;
  overall_good: boolean;
  comment: string;
  entry_date: string; // ISO date string, e.g. "2025-04-21"
  author: string;
}

export enum SortDirection {
  Abc = "Abc",
  Zyx = "Zyx",
  Unchanged = "Unchanged",
}

export enum FilterState {
  OnlyTrue = "OnlyTrue",
  OnlyFalse = "OnlyFalse",
  All = "All",
}
