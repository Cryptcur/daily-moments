import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { home, settings } from "ionicons/icons";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import { useAuth } from "./Auth";
import AddEntryPage from "./pages/AddEntryPage";

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries" component={HomePage} />
        <Route exact path="/my/settings" component={SettingsPage} />
        <Route exact path="/my/entries/add" component={AddEntryPage} />
        <Route exact path="/my/entries/view/:id" component={EntryPage} />
        <Redirect exact path="/" to="/my/entries" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
