import { isNotNumber } from "./utils.ts";

// bodymass = weight / (height * height)

export const calculateBmi = (height: number, weight: number): string => {
    console.log(`Calculating BMI for height: ${height} m and weight: ${weight} kg`);
    
    const bmi = weight / (height * height);

    console.log(`Your BMI is: ${bmi.toFixed(2)}`);

    if(bmi < 16.){
        return "Underweight (Severe thinness)";
    }else if(bmi < 17.){
        return ("Underweight (Moderate thinness)");
    }else if(bmi < 18.5){
        return ("Underweight (Mild thinness)");
    }else if(bmi < 25.){
        return ("Normal range");
    }else if(bmi < 30.){
        return ("Overweight (Pre-obese)");
    }else if(bmi < 35.){
        return ("Obese (Class I)");
    }else if(bmi < 40.){
        return ("Obese (Class II)");
    }else{
        return ("Obese (Class III)");
    }
};

if (process.argv[1] === import.meta.filename) {

    const [,,heightArg,weightArg] = process.argv;

    const height = Number(heightArg);
    const weight = Number(weightArg);

    if( isNotNumber(height) || isNotNumber(weight) ){
        console.log("Provided values were not numbers");
        process.exit(1);
    }

    console.log(calculateBmi(height, weight));

}