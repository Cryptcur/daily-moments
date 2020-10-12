import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { trash as trachIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../Auth";
import { formatDate } from "../date";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const history = useHistory();
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    entryRef.get().then(doc => {
      setEntry(toEntry(doc));
    });
  }, [userId, id]);
  console.log("ENTRYPAGE");

  const handleDelete = async () => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trachIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <h2>{entry?.description}</h2>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
