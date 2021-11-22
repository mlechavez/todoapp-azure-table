import { Configuration } from "@azure/msal-browser";

const configuration: Configuration = {
  auth: {
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
export default configuration;

export const loginRequest = {
  scopes: ["User.Read"],
};
