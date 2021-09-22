import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
    return;
  } else {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.target || !req.body.daily_exercises) {
    res.json({
      error: 'parameters missing'
    });
  }
  const target: number = req.body.target;
  const dailyExercises: Array<string> = req.body.daily_exercises;
  const numbers: Array<number> = [];
  if (isNaN(Number(target))) {
    res.json({
      error: 'malformatted parameters'
    });
  }
  dailyExercises.forEach(element => {
    if (isNaN(Number(element))) {
      res.json({
        error: 'malformatted parameters'
      });
    }
    numbers.push(Number(element));
  });

  const result = calculateExercise(numbers, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});