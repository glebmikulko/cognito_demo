import React, { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsMobile from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

Amplify.configure(awsMobile);

function App() {
  return (
    <Router>
      <div className="App">
        <AmplifySignOut />
        <div className="App-body">
          <div>
            <Link style={{ marginRight: "0.5rem" }} to="/">
              Home
            </Link>

            <Link style={{ marginRight: "0.5rem" }} to="/about">
              About
            </Link>

            <Link style={{ marginRight: "0.5rem" }} to="/info">
              Info
            </Link>

            <Switch>
              <Route path="/about">
                <Page title="about" />
              </Route>
              <Route path="/info">
                <Page title="info" />
              </Route>
              <Route path="/">
                <Page title="home" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Page({ title }) {
  const [session, setSession] = useState();

  useEffect(() => {
    async function updateSession() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        setSession(currentSession)
        cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
          if (!err) {
            console.log("update session");
            setSession(session);
          }
        });
      } catch (e) {
        console.log("Unable to refresh Token", e);
      }
    }
    updateSession();
  }, [title]);


  const idToken = session && session.getIdToken();
  const idTokenIat = idToken && idToken.payload.iat;
  const idTokenExpiration = idToken && idToken.payload.exp - idToken.payload.iat;

  const accessToken = session && session.getAccessToken();
  const accessTokenIat = accessToken && accessToken.payload.iat;
  const accessTokenExpiration = accessToken && accessToken.payload.exp - accessToken.payload.iat;

  return (
    <>
      <h1>You have successfully logged in via Cognito</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Id token expiration = {idTokenExpiration} minutes, issued at = {idTokenIat}
      </p>
      <p>
        Access token expiration = {accessTokenExpiration} minutes, issued at = {accessTokenIat}
      </p>
    </>
  );
}

export default withAuthenticator(App);
