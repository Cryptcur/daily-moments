import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppTabs from "./AppTabs";
import { AuthContext } from "./Auth";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoggedIn(Boolean(user));
    });
  }, []);
  console.log("LOGGEDIN=", loggedIn);
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/entries" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
