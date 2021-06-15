# REST API with Node.js

This a partial rest API to show basic implementation of JWT Auth method with token refresh, and using many to many refs inside noSQL Database.

## Installation

To test this API, you would start the server with command ```npm run dev``` note this will start server in port 3000.

Feel free to change port number inside src/index.js file if you are already using this port.

Database is provided prior starting server, if you have MongoDB service locally installed. In this case, you can run ```npm run db``` for setting up database.

The collections is named as 'fakeIMDB23', be carefull to not overwrite your current collections.

## JWT Tokens

Login based restrictions based on tokens, let you to pass middleware verification wall. When you first log in, the server will provide you with an access and refresh token. 

Access will be required to make these POST requests to server, in order to manage DB. After expiration, a refresh token endpoint was provided, where refresh token is sent into req.body, an after a brief check, server will respond with a new non-expired access token, to use on other request to DB.

## Many to many refs

Many to many refs are everywhere in this project. In an attempt to validate some new data for existence, server will check for the Mongo ObjectID's data before creating your document.

Actors and directors, should be the entry-point to insert a new Movie/Show ( without show or movie list ), and next requests from clients will try to fill this list with corresponding movies and show the client insert.

## Considerations

Used babel as an ES6 to ES5 Transpiller, to keep a cleaner structure mostly with import/export modules.

Postman document is provided, with information of all endpoints and some pre-data you can use to test this app.

For get request, no authorization is required, for posting, you will need to provide Access token in 'Authorization' header. You can get this token with login endpoint and data provided on postman document.

If your token expires, use refresh token provided in login to refresh access token.

Thank you for reading, and I hope you like my work ;).
