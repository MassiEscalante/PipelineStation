export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  question: string;
  answers: Answer[]; // Clear definition for the structure of `answers`
}
