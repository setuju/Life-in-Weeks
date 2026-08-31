export interface LifeEvent {
  id: string;
  name: string;
  year: number;
  week?: number;
}

export interface AppState {
  birthDate: string | null;
  events: LifeEvent[];
}
