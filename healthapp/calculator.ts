
export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = ( value1: number, value2: number, operation: Operation ): number => {
    switch (operation) {
        case 'add':
            return value1 + value2;
        // case 'subtract':
        //     return value1 - value2;
        case 'multiply':
            return value1 * value2;
        case 'divide':
            if (value2 === 0) {
                throw new Error("Division by zero is not allowed.");
            }
            return value1 / value2;
        default:
            throw new Error(`Unsupported operation: ${operation}`);
    }
};