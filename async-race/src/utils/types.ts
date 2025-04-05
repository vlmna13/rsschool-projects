export type Car = {
  name: string;
  color: string;
  id: number;
};

export type GarageResponse = Car[];
export type ShuffleCars = string[];

export type Velocity = {
  velocity: number;
  distance: number;
};

export type Move = {
  success: boolean;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = Winner[];
