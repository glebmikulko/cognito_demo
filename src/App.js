import React, { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsMobile from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import logo from './logo.svg';
import './App.css';

Amplify.configure(awsMobile);

function App() {
  const [session, setSession] = useState()

  useEffect(() => {
    Auth.currentSession()
    .then(data => {
      setSession(data)
    })
    .catch(err => console.log(err));
  }, [])

  const idTokenExpiration = session && (session.getIdToken().payload.exp - session.getIdToken().payload.iat)
  const accessTokenExpiration = session && (session.getAccessToken().payload.exp - session.getAccessToken().payload.iat)

  return (
    <div className="App">
      <AmplifySignOut />
      <header className="App-header">
        <h1>
          You have successfully logged in via Cognito
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Id token expiration = {idTokenExpiration} minutes
        </p>
        <p>
          Access token expiration = {accessTokenExpiration} minutes
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
