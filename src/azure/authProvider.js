import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import * as c from './config';

const config = {
  auth: {
    authority: c.authority,
    clientId: c.clientId,
    redirectUri: c.redirectUri
  },
  cache: {
    cacheLocation: c.cache,
    storeAuthStateInCookie: (c.storeAuthStateInCookie) ? c.storeAuthStateInCookie === 'true' : false
  }
};

const authParams = {
  scope: c.scopes
};

const options = {
  loginType: LoginType.Popup
};

export default new MsalAuthProvider(config, authParams, options);
