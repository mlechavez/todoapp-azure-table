# Todo app

**Todo app** has always been a friend of ours when learning new stuff in the world of coding. As I learn about **Azure Table Storage**, I came up with creating an app that utilizes the [Azure Tables client library](https://docs.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest). This project was created in React (Typescript) with Azure Table Storage.

## How to use the project

> **Note:**  
> I am using MSAL for the authentication.
> If you wanna know about `msal-react`, please see the helpful links section below.

Before running the script:

Add a `.env.local` file to the root folder and the necessary keys:

REACT_APP_ENV=**development**  
REACT_APP_TENANT_ID=**{YOUR_SAS_KEY}**  
REACT_APP_CLIENT_ID=**{YOUR_CLIENT_ID}**  
REACT_APP_REDIRECT_URI=**{YOUR_REDIRECT_URI}**  
REACT_APP_STORAGE_ACCOUNT_NAME=**{YOUR_STORAGE_ACCOUNT_NAME}**

In the project directory, you can run:

### `npm install`

Installs the dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> **Note:**  
> I did not include any testing

## Helpful Links

- [Register your application](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration)
- [Microsoft Authentication Library for React (msal-react)](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
- [Azure Tables client library](https://docs.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest)
- [Sign in users and call the Microsoft Graph API from a React single-page app (SPA) using auth code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Styled components](https://styled-components.com/)

## License

Copyright (c) Mark Lester Echavez. Licensed under the MIT License (the "License").
