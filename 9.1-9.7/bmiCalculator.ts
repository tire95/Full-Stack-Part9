interface BmiParameters {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiParameters => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi <= 16.9:
      return "Underweight (Moderate thinness)";
    case bmi <= 18.4:
      return "Underweight (Mild thinness)";
    case bmi <= 24.9:
      return "Normal range";
    case bmi <= 29.9:
      return "Overweight (Pre-obese)";
    case bmi <= 34.9:
      return "Obese (Class I)";
    case bmi <= 39.9:
      return "Obese (Class II)";
    case bmi >= 40.0:
      return "Obese (Class III)";
  }
  return "undefined";
};

export { calculateBmi };

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('Error, message: ', error.message);
}