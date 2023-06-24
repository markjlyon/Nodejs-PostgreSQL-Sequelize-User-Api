# Requirements

Specifications:

- [x] The API should support CRUD (Create, Read, Update, and Delete) operations for a single resource - User.
  - [x] A User resource should have the following attributes:
    - [x] id: unique identifier for the user (string or UUID)
    - [x] name: user's name (string)
    - [x] email: user's email address (string)
    - [x] password: user's password (string)
- [x] The API should handle input validation and provide appropriate error messages for invalid inputs.
- [x] The API should be secured using JWT authentication.
- [x] The API should be well documented with clear instructions on how to run the code and test the API.
- [x] A GitHub repository with all the code required to run the API.
- [x] A README file with clear instructions on how to run the code and test the API.

Additions:

- [x] Store passwords as a hash so the real plaintext password is never stored.

# First Steps

## PostgreSQL

Because I am using PostgreSQL with Sequelize I expect the User table to be standardized (and for all projects using these tools it would be).
The requirement says: "You can assume that the database schema and tables have already been created."
So I would be correct in assuming the Users table to be the following (Although I know with pafinTeam it is probably Express, typeORM, and Postgres):

```sql
CREATE TABLE "Users" (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	"createdAt" DATE,
	"updatedAt" DATE
);
```

The table Users, createdAt, and updatedAt columns must be spelled exactly as above and be contained in double quotes as per Sequelize standards.
This is one of the mechanisms Sequelize uses against SQL injection and for these tools we would adapt our conventions for the security benefit.

## Initial User record

Because I am using bcrypt to salt and hash the passwords, you will need one user record with a correctly salted and hashed saved password as expected by the application.
Please use the following script to insert the initial User record:

```sql
INSERT INTO "Users"
VALUES (1, 'Alpha', 'alpha@email.com', '$2b$10$.ejuMyM.xmb.oU0yzl0QceBoSXT3Qaw9pLzqhk7mmNo8w9OXkmT9y');
```

The value saved in the password field is the SALT and HASH result for _Password!1_.

## Confirm PostgreSQL is running

Verify PostgreSQL is running and record the username, password, and database name for later use.
This should already be up and running according to the requirements.

# User API setup and execution

Please follow the steps below to access and setup the User API.

## Download from GITHUB

Download the User API from here https://github.com/markjlyon/Nodejs-PostgreSQL-Sequelize-User-Api/archive/refs/heads/master.zip to a folder where you can securely scan and verify it.

Unzip it into a folder you prepared for its analysis.

I recommend keeping the top level folder "Nodejs-PostgreSQL-Sequelize-User-Api-master" inside your prepared folder, in case you will do other analysis in the future.

## Node dependencies install

Open your favorite terminal and navigate to the root of the User API project.
Use npm to install the node dependencies:

```
npm install
```

## Visual Studio Code

### Open Visual Studio Code

Using the same terminal from above:

```
code .
```

### Open the project folder

Once Visual Studio code opens, if the folder is not already open, open the main menu and choose **File > Open Folder** and choose the "Nodejs-PostgreSQL-Sequelize-User-Api-master" folder.

### Open the terminal window

From the main menu choose **Terminal > New Terminal**

### PostgreSQL

### The .env.sample file

You need to copy the _.env.sample_ file to a new file named _.env_.
You need to edit the new _.env_ file with your host, port, username, password, dialect, test database name, development database name, production database name, and the JWT token expiration life time.

```js
DB_HOST = localhost;
DB_PORT = 5432;
DB_USER = username;
DB_PASS = password;
DB_DIALECT = postgres;
DB_NAME_TEST = postgres;
DB_NAME_DEVELOPMENT = postgres;
DB_NAME_PRODUCTION = postgres;
TOKEN_EXPIRATION=300s
```

You will not need to edit SALT or HASH entries for this assessment.
This is a separate file from jwt.constants.ts to represent multiple avenues of injecting different values required for execution.

### The jwt.constants.ts file

You will need to open the jwt.constants.ts file and add the JWT secret you wish to use.
This is a separate file from .env to represent multiple avenues of injecting different values required for execution.

## Start The User API

From the terminal window enter the following command:

```
npm run start:dev
```

# How to use the user api using curl in bash

You must use bash for curl, not cmd or Powershell. Why? https://github.com/MicrosoftDocs/azure-docs/issues/31851
I am using git-bash (MINGW64) for this assessment.

You will notice that all calls to the User api have a prefix of _api/v0_.
This is just a design choice to allow future versions of the api to permit versioning.

The requests are only examples.
You will need to modify some examples based on what data you have in the database.

## Login to get token

Use the following curl command to log in as *alpha@email.com* as defined above.

```
curl -X POST http://localhost:3000/api/v0/auth/login -d '{ "email": "alpha@email.com", "password": "Password1!" }' -H "Content-Type: application/json"
```

Success example: {"access_token": "<token>"}

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

Copy the resulting token for future calls. It has a default life time of 5 minutes, unless you changed it above.

## Make call to /profile using token to verify JWT is working

Paste the above token into the <token> placeholder below.
Use the following curl command to test if the user has been authorized.

```
curl http://localhost:3000/api/v0/auth/profile -H "Authorization: Bearer <token>"
```

Success example: {"sub": "alpha@email.com", "username": "Alpha", "iat": 1687500634, "exp": 1687500934}

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

There is no need to keep the results.

## Make call to READ ALL user records

Paste the above token into the <token> placeholder below.
Use the following curl command to return all users in the database.

```
curl -X GET http://localhost:3000/api/v0/users/list -H "Authorization: Bearer <token>"
```

Success example: [{"id": 1,"name": "Alpha","email": "alpha@email.com","password": "$2b$10$.ejuMyM.xmb.oU0yzl0QceBoSXT3Qaw9pLzqhk7mmNo8w9OXkmT9y","createdAt": null,"updatedAt": "2023-06-24"}]

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to CREATE user record

Paste the above token into the <token> placeholder below.
Use the following curl command to create a new user.

```
curl -X POST http://localhost:3000/api/v0/users -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"email": "beta@email.com", "name": "Beta", "password": "TESTaPassword#2"}'
```

Success example: {"id":9,"email":"beta@test.com","name":"Beta","password":"$2b$10$.ejuMyM.xmb.oU0yzl0QceRu.pagDPHwUMlUoboPS9WNIE7nhs3Uy","updatedAt":"2023-06-24","createdAt":"2023-06-24"}

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

Email failure example: "beta@emailcom" : {"statusCode":400,"message":"User EMAIL does not meet format requirements"}

Password failure example: "TestaPassword" {"statusCode":400,"message":"User PASSWORD does not meet complexity requirements"}

Create several new records so you can update and delete them in later tests.

## Make call to READ user record

Paste the above token into the <token> placeholder below.
Use the following curl command to retrieve a user by id.

```
curl -X GET http://localhost:3000/api/v0/users/1 -H "Authorization: Bearer <token>"
```

Success example: {"id":1,"name":"Alpha","email":"alpha@email.com","password":"$2b$10$.ejuMyM.xmb.oU0yzl0QceBoSXT3Qaw9pLzqhk7mmNo8w9OXkmT9y","createdAt":null,"updatedAt":"2023-06-24"}

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to UPDATE user record

Paste the above token into the <token> placeholder below.
Use the following curl command to update the user by id.

```
curl -X PUT http://localhost:3000/api/v0/users -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"id": "2","name": "Beta","email": "beta@email.com","password": "Password1!"}'
```

Success example: [1]

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to DELETE user record

Paste the above token into the <token> placeholder below.
Use the following curl command to delete the user by id.

```
curl -X DELETE http://localhost:3000/api/v0/users/6 -H "Authorization: Bearer <token>"
```

Success example: 1

Auth failure example: {"message": "Unauthorized", "statusCode": 401 }

# How to use the user api using Postman

Open the included postman.json file and import it into Postman.

The requests are only examples.

You will need to modify some examples based on what data you have in the database.

Use the _Login to get token_ request and copy the resulting token for use in the other tests.

The same exact tests, with the same names, exist in Postman as with the curl commands.

On each test's Authorization tab past the token into the Token field.

The results should duplicate the curl test results, with the differences being based on the previous tests.
