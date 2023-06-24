# Requirements

Specifications:

- [ ] The API should support CRUD (Create, Read, Update, and Delete) operations for a single resource - User.
  - A User resource should have the following attributes:
    - id: unique identifier for the user (string or UUID)
    - name: user's name (string)
    - email: user's email address (string)
    - password: user's password (string)
- [ ] The API should handle input validation and provide appropriate error messages for invalid inputs.
- [x] The API should be secured using JWT authentication.
- [ ] The API should be well documented with clear instructions on how to run the code and test the API.
- [ ] A GitHub repository with all the code required to run the API.
- [ ] A README file with clear instructions on how to run the code and test the API.

# How to use the user api using Postman

Load the included postman.json file into Postman.
Execute the requests without logging in to confirm the

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
