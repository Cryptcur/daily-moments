import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../Auth";
import { auth } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(credentials);
    } catch (ex) {
      setStatus({ loading: false, error: true });
      console.log("error!!!!!!!!", ex);
    }
  };
  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={ev => setEmail(ev.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={ev => setPassword(ev.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">Registration failed</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" routerLink="/login" fill="clear">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
