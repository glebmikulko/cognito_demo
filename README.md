# AWS Cognito + React demo
The goal of this project is to check the ability to retrieve a session from AWS Cognito with an active Internet connection and use tokens during the offline period (or intermittent connection).
## Demo
![Demo][demo]

## Setup
Create a file `aws-exports.js` with AWS Cognito configurations . Put it in the `/src` folder. This file shoudl export the JS object in conformity with https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js. The example
```js
const awsMobile = {
  Auth: {
    // Amazon Cognito Region
    region: "us-east-2",

    // Amazon Cognito User Pool ID
    userPoolId: "us-east-2_******",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "*************************"
  }
};

export default awsMobile;

```
Install dependencies and run the application:
```bash
yarn
yarn start
```

## Useful links
https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js
https://docs.amplify.aws/lib/auth/getting-started/q/platform/js
https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-scenarios.html
https://stackoverflow.com/questions/48543948/aws-cognito-whats-the-difference-between-access-and-identity-tokens

[demo]: docs/demo.gif "DEMO"
