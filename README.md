This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Instructions to run locally

To install dependencies.
```
yarn install
```
To Run the app.
```
yarn start
```


## Technical Decisions
- Typescript to make code easier to read, understand, and reduce the number of run time bugs that can occur when using plain Javascript.

- A separate state for all the applicants and filtered applicants. The reason for this is that it allows us to have a single source to filter from without having to make subsequent request from the API for all the applicants.

## Features
- Filtering applicants by first name or last name 
- Filtering applicants by their credit indicator score with a dropdown menu 
- A status indicator based on the applicant's credit indicator score
- A button to clear all the applied filters
- A modal when a row on the table is clicked to view a specific applicant