export const BIT_TO_GIGBABIT_DIVISOR = 1000000000;

export const generateDates = () : Date[] => {
    var dateArray : Date[] = [] 
    for (var i = 0; i <= 15; i++) {
        dateArray.push(new Date(new Date().setDate(new Date().getDate()-i))); //I HATE JS DATES SANS LIBRARIES
    }
    return dateArray;
}