interface ExerciseParameters {
  days: Array<number>;
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsForBmi = (args: Array<string>): ExerciseParameters => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2]))) {
    const days = [];
    for (let i = 3; i < args.length; i++) {
      if (!isNaN(Number(args[i]))) {
        days.push(Number(args[i]));
      } else {
        throw new Error('Provided values were not numbers!');
      }
    }
    return {
      days,
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercise = (args: Array<number>, target: number): Result => {
  let trainingDays = 0;
  let reachedTargetDays = 0;
  let average = 0;

  args.forEach(day => {
    if (day > 0) {
      trainingDays++;
      average += day;
    }
    if (day >= target) {
      reachedTargetDays++;
    }
  });

  average /= args.length;
  let ratingDescription = 'you can do better';
  let rating = 1;
  reachedTargetDays = reachedTargetDays / args.length;

  if (reachedTargetDays >= 0.8) {
    ratingDescription = 'very good work';
    rating = 3;
  } else if (reachedTargetDays >= 0.4) {
    ratingDescription = 'not too bad but could be better';
    rating = 2;
  }

  return {
    periodLength: args.length,
    trainingDays,
    success: reachedTargetDays === 1 ? true : false,
    rating,
    ratingDescription,
    target,
    average
  };
};

export { calculateExercise };

try {
  const { days, target } = parseArgumentsForBmi(process.argv);
  console.log(calculateExercise(days, target));
} catch (e) {
  console.log('Error, message: ', e.message);
}