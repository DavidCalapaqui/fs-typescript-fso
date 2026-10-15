import express, { type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculator, type Operation } from './calculator.ts';
import { calculateExcercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/ping', (_req, res) => {
    
  res.send('pong');
});


app.get('/hello', (_req, res) => {
  res.status(200).send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    console.log("Received", { height, weight });
    
    if( !height || !weight || isNaN(Number(height)) || isNaN(Number(weight)) ) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    const bmiText = calculateBmi(Number(height), Number(weight));
    return res.status(200).send({
        weight: Number(weight),
        height: Number(height),
        bmi: bmiText
    });
});


app.post('/calculate', (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if ( !value1 || isNaN(Number(value1)) ) {    
        return res.status(400).send({ error: '...'});  
    }

    const operation = op as Operation;

    const result = calculator(Number(value1), Number(value2), operation);
    return res.send({ result });
});


app.post('/exercises', (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    if (!daily_exercises.every((hours: unknown) => typeof hours === 'number')) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const exercises = daily_exercises;

    const targetNumber = Number(target);

    
    const result = calculateExcercises(exercises, targetNumber);
    
    // For now, just return a placeholder response
    return res.status(200).send(
        result
    );
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
