## Code Challenge

NodeJs POST API with Swagger Documentation, Validation and UI.

## Setup
install swagger -g 
npm install

## Start
npm start

## How to Use
Locally:
	Access API by http://localhost:10010
	Documentation and run with Swagger:
	http://localhost:10010/docs/#!/default/filter

Already deployed links:
	Access API by https://nine-code-challenge.herokuapp.com
	Documentation and run with Swagger:
	http://nine-code-challenge.herokuapp.com/docs/#!/default/filter


## Developer notes
Edit swagger routes and validation with swagger editor:
npm swagger edit
Note: make sure swagger is installed globally 


## Tests

npm test 
Note: Test cases response is not faked and its hitting the server for making calls . In Ideal production environment, we can mock the response to avoid hitting the real server.

