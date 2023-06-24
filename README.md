# Requirements

Specifications:

- [x] The API should support CRUD (Create, Read, Update, and Delete) operations for a single resource - User.
  - A User resource should have the following attributes:
    - id: unique identifier for the user (string or UUID)
    - name: user's name (string)
    - email: user's email address (string)
    - password: user's password (string)
- [x] The API should handle input validation and provide appropriate error messages for invalid inputs.
- [x] The API should be secured using JWT authentication.
- [x] The API should be well documented with clear instructions on how to run the code and test the API.
- [x] A GitHub repository with all the code required to run the API.
- [ ] A README file with clear instructions on how to run the code and test the API.

# First Steps

## PostgreSQL

Because I am using PostgreSQL with Sequelize I expect the User table to be standardized (and for all projects using these tools it would be).
The requirement says: "You can assume that the database schema and tables have already been created."
So I would be correct in assuming the Users table to be the following (Although I know with pafinTeam it is probably Express, typeORM, and Postgres):

CREATE TABLE "Users" (
id SERIAL PRIMARY KEY,
name VARCHAR NOT NULL,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
"createdAt" DATE,
"updatedAt" DATE
);

The table Users, createdAt, and updatedAt columns must be spelled exactly as above and be contained in double quotes as per Sequelize standards.
This is one of the mechanisms Sequelize uses against SQL injection and for these tools we would adapt our conventions for the security benefit.

## Initial User Record

Because I am using bcrypt to salt and hash the passwords, you will need one user record with a correctly salted and hashed saved password as expected by the application.
Please use the following script to insert the initial User record:

INSERT INTO "Users"
VALUES (1, 'Alpha', 'alpha@email.com', '$2b$10$.ejuMyM.xmb.oU0yzl0QceBoSXT3Qaw9pLzqhk7mmNo8w9OXkmT9y');

# Download the pafinTeam User API

# How to use the user api using curl in bash

You must use bash for curl, not cmd or Powershell. Why? https://github.com/MicrosoftDocs/azure-docs/issues/31851
I am using git-bash (MINGW64) for this assessment.

## Login to get token

curl -X POST http://localhost:3000/auth/login -d '{"email": "alpha@test.com", "password": "0000"}' -H "Content-Type: application/json"
Success example: {"access_token": "<token>"}
Failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to /profile using token (just verifies its working)

curl http://localhost:3000/auth/profile -H "Authorization: Bearer <token>"
Success example: {"sub": "alpha@test.com", "username": "Alpha", "iat": 1687500634, "exp": 1687500934}
Failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to CREATE user record

Success example:
Failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to READ user record

curl http://localhost:3000/user/1 -H "Authorization: Bearer <token>"
Success example: {"id": "1", "email": "alpha@test.com", "name": "Alpha", "password": "0000"}
Failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to UPDATE user record

Success example:
Failure example: {"message": "Unauthorized", "statusCode": 401 }

## Make call to DELETE user record

Success example:
Failure example: {"message": "Unauthorized", "statusCode": 401 }
