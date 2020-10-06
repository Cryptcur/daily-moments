import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { firestore } from "../firebase";

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<any>();
  useEffect(() => {
    const entryRef = firestore.collection("entries").doc(id);
    entryRef.get().then(doc => {
      const entry = { id: doc.id, ...doc.data() };
      setEntry(entry);
    });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        This is the {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
