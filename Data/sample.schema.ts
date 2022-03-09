import {ExerciseSchema} from '../Lib/exercise.schema';

export const schema: ExerciseSchema = {
  exercise: [
    {
      eng: 'This',
      ger: 'Das',
    },
    {
      eng: 'house',
      ger: 'haus',
      toGuess: true,
    },
    {
      eng: 'is',
      ger: 'ist',
    },
    {
      eng: 'small',
      ger: 'klien',
    },
  ],
  hints: ['schaf', 'bereiden', 'foigen', 'haus'],
};
