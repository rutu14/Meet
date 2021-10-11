Rgister request:
{
    "name": "R",
    "email": "newreg@example.com",
    "password": "Newreg3!"
}

Login request : response body
{
    "message": "Signed in sucessfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld3JlZ0BleGFtcGxlLmNvbSIsInVzZXJJZCI6IjYxNTgzYzhhNTE3MTAzMDAxNWRhNDgzZSIsImlhdCI6MTYzMzE3MjcwNiwiZXhwIjoxNjMzMjU5MTA2fQ.2cEH_fAfAqT3fXryiRyuDuoKfUlpugUGB_fUeKJbIBU",
    "email": "newreg@example.com",
    "name": "R"
}

"message": "User validation failed: password: Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character"

{
    "name": "r",
    "email": "powerrangers@gmail.com",
    "password": "Powerrangers1!"
}
returns 204 No content on successfully registering
    
    "email": "add@gmail.com",
    "password": "Password2@"

Login unauthorized status code 401 message: "credentials do not match"


Register @,%,$,#,! [ 8 characters ]

{"message":"Meeting validation failed: startTime.hours: Path `startTime.hours` is required., startTime.minutes: Path `startTime.minutes` is required., endTime.hours: Path `endTime.hours` is required., endTime.minutes: Path `endTime.minutes` is required., name: Path `name` is required."}


Add team member message: "user with matching user id = undefined and email id = undefined not found"

message: "Team validation failed: name: Path `name` is required., shortName: Path `shortName` is required."

409 Conflict message: "user with this email id already exists"


email: "powerranger@gmail.com"
name: "lgl"
password: "Poweran2!"