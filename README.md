# Connfy API

RESTfull API for our Group Project, Semester 4 - Connfy 
## Development
With the pre-defined project strucutre, you can extend the application. Please confine to the follwing structure:

- */src/index.ts* - starting point of the application

- */src/controller* - is the router folder, middleware added to the main app

- */src/model* - is the model folder where you can place models interfaces 

- */src/prisma/schema.prisma* - is the database schema file
## Local Setup:
### Prerequisites:
In order to start the app succesfully, you need: 
- Node @12.0.1 or higher
- NPM @6.14.0 or higher
- SQLite Drivers

### Setup flow
Go to the **/src** folder and run the following command to install the dependencies: 
```
npm install
```

To make a migration to the SQLite Database run the following command:
```
npx prisma migrate dev --name init
```
SQLite File location:
*connfy-api/src/prisma/connfy.db*

SQLite GUI: [download from here](https://sqlitestudio.pl/)

For API debuging and testing you can use Postman: [download from here](https://www.postman.com/)

