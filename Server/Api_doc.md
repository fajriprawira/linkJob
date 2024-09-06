LinkJob API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /linkjob`
- `GET /job`
- `POST /profiles`
- `GET /profile`
- `PUT /editProfiles`
- `PATCH /editProfiles/image/:id`
- `POST /myjob`
- `GET /myjob`
- `DELETE /myjob/:id`

&nbsp;

1. POST /register
Request:

- body:
```json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
_Response (201 - Created)_

```json
Salin kode
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "access_token": "string"
}
```
_Response (400 - Bad Request)_

```json

{
  "message": "Username, email, or password is required"
}
``` 

&nbsp;

## 2. POST /login
Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```
_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```
_Response (400 - Bad Request)_

```json

{
  "message": "Email or password is required"
}
OR
{
  "message": "Invalid email/password"
}
```

&nbsp;
 

## 3. POST /google-login
Request:

- body:
```json

{
  "token": "string"
}
```
_Response (200 - OK)_

```json

{
  "access_token": "string"
}
``` 
&nbsp;

## 4. GET /linkjob
Description:

Get all jobs available.
_Response (200 - OK)_

```json

[
  {
    "id": 1,
    "title": "Software Developer",
    "description": "Developing applications",
    "location": "Remote"
  },
  {
    "id": 2,
    "title": "Data Analyst",
    "description": "Analyzing data",
    "location": "On-site"
  }
]

```
&nbsp;

## 5. GET /job
Description:

- Get job recommendation based on AI model.
_Response (200 - OK)_

```json

[
  {
    "id": 1,
    "title": "AI Engineer",
    "description": "Building AI models",
    "location": "Remote"
  }
]
```

&nbsp;
 

## 6. POST /profiles
Description:

- Create a profile for the logged-in user.
Request:

- body:
```json

{
  "fullname": "string",
  "age": "integer",
  "phoneNumber": "string",
  "address": "string",
  "skill": "string"
}
```
_Response (201 - Created)_

```json

{
  "id": "integer",
  "fullname": "string",
  "age": "integer",
  "phoneNumber": "string",
  "address": "string",
  "skill": "string"
}
```
_Response (400 - Bad Request)_

```json

{
  "message": "Profile data is required"
}
```
&nbsp;

## 7. GET /profile
Description:

Get a profile for the logged-in userId.
Request:

```json

{
  "userId": "integer"
}

```
Response:

_Response (200 - OK)_

```json

{
  "id": "integer",
  "fullname": "string",
  "age": "integer",
  "phoneNumber": "string",
  "address": "string",
  "skill": "string"
}

```

_Response (400 - Bad Request)_

```json

{
  "message": "User ID is required"
}

```

_Response (404 - Not Found)_

```json

{
  "message": "Profile not found"
}

```

&nbsp;

## 8. PUT /editProfiles
Description:

- Update profile for the logged-in user.
Request:

- body:
```json

{
  "fullname": "string",
  "age": "integer",
  "phoneNumber": "string",
  "address": "string",
  "skill": "string"
}

```

_Response (200 - OK)_

```json

{
  "message": "Profile updated successfully"
}

```

_Response (400 - Bad Request)_

```json

{
  "message": "Invalid profile data"
}
 
```

&nbsp;

## 9. PATCH /editProfiles/image/
Description:

- Upload a profile image.
Request:

- params:
```json

{
  "id": "integer (required)"
}
```
- form-data:
```json

{
  "image": "file"
}

```

_Response (200 - OK)_

```json

{
  "message": "Profile image uploaded successfully"
}

```
_Response (400 - Bad Request)_

```json

{
  "message": "Invalid file format"
}
 
```

&nbsp;

## 10. POST /myjob
Description:

- Add a new job for the logged-in user.
Request:

- body:

```json

{
  "title": "string",
  "description": "string",
  "location": "string"
}

```

_Response (201 - Created)_

```json

{
  "id": "integer",
  "title": "string",
  "description": "string",
  "location": "string"
}

```
_Response (400 - Bad Request)_

```json

{
  "message": "Job details are required"
}
 
```

&nbsp;

## 11. GET /myjob

Description:

- Get all jobs posted by the logged-in user.

_Response (200 - OK)_

```json

[
  {
    "id": 1,
    "title": "Software Developer",
    "description": "Developing applications",
    "location": "Remote"
  }
]

```

&nbsp;
 

## 12. DELETE /myjob/
Description:

- Delete a job by its ID for the logged-in user.
Request:

- params:

```json

{
  "id": "integer (required)"
}

```

_Response (200 - OK)_

```json

{
  "message": "Job has been deleted"
}

```
_Response (404 - Not Found)_

```json

{
  "message": "Job not found"
}
```
 
&nbsp;

## Global Errors

_Response (401 - Unauthorized)_

```json

{
  "message": "Invalid token"
}

```

_Response (500 - Internal Server Error)_

```json

{
  "message": "Internal server error"
}
```

&nbsp;






