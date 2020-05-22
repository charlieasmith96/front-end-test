This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Email Address: charlieasmith96@gmail.com

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app on port 4000.

CORS policy MUST to be enabled in the backend mock to be able to communicate.


## KNOWN ISSUES:

1. Performance issues on graph when rendering many points. 
 Future enhancement: Only render visible points in the zoom domain to improve performance
2. From date and To date can overlap each other (ie: from Date after To date) causing a crash that is caught (a refresh is needed).
    Future enhancement: Do not allow From date and To date to overlap each other.
3. Tooltip only works accurately on graph when fully zoomed out. I played around for hours trying to fix this to no avail. 
    Future enhancement: Figure out what is going wrong with the tooltip. Possibly a library bug?
4. From date and To date are generated from the current date to 15 days earlier, and NOT based on the data.
    Future enhancement: Generate From date and To date from the data points
5. Lack of testing coverage due to lack of prior experience with React-Testing-Library (I am  used to Enzyme)
6. CSS is vanilla and therefore not scalable.
    Future enhancement: if the project was to become larger, implement CSS Modules and SASS
    
   
