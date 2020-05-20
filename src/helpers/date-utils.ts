export const BIT_TO_GIGBABIT_DIVISOR = 1000000000;

export const generateDates = () : Date[] => {
    var dateArray : Date[] = [] 
    for (var i = 0; i <= 15; i++) {
        dateArray.push(new Date(new Date().setDate(new Date().getDate()-i))); //I HATE JS DATES SANS LIBRARIES
    }
    return dateArray;
}

// I AM USED TO WORKING WITH MOMENT.JS WHICH I DID NOT WANT TO BRING IS AS A DEPENDENCY, SO APOLOGIES FOR THIS CODE
export const subtractDate = (subtractor : number) : number => {
    return new Date(new Date().setDate(new Date().getDate()-subtractor)).valueOf()
}