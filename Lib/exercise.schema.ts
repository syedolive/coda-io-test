export interface ExerciseInterface {
  eng: string;
  ger: string;
  toGuess?: boolean;
}

export interface ExerciseSchema {
  exercise: Array<ExerciseInterface>;
  hints: string[];
}
