
interface IExerciseAverageResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExcercises = ( dailyExcercises: number[], target: number): IExerciseAverageResult => {
    const periodLength = dailyExcercises.length;
    const trainingDays = dailyExcercises.filter(day => day > 0).length;
    const average = dailyExcercises.reduce((sum, day) => sum + day, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;
    
    if (average < target * 0.5) {
        rating = 1;
        ratingDescription = "You need to work harder!";
    } else if (average < target) {
        rating = 2;
        ratingDescription = "Not too bad but could be better.";
    } else {
        rating = 3;
        ratingDescription = "Great job! You've met your target.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

/*

if(process.argv[1] === import.meta.filename){
    const args = process.argv.slice(2).map(Number);

    if(args.some(isNotNumber)){
        console.log("Provided values were not numbers");
        process.exit(1);
    }

    if (args.length < 2) {
        console.log("Please provide at least one daily exercise value and a target.");
        process.exit(1);
    }

    //const exerciseData = [3, 2, 2, 4.5, 1, 3, 1];

    const exerciseData = args;
    console.log(`Exercise data: ${exerciseData}`);
    const target = 2;

    const result = calculateExcercises(exerciseData, target);
    console.log(result);

}*/

