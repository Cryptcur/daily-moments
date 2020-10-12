import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth";
import { firestore } from "../firebase";

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    const entryData = { date, title, description };
    const entryRef = await entriesRef.add(entryData);
    console.log("save", entryRef.id);
    history.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={ev => setDate(ev.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">title</IonLabel>
            <IonInput
              value={title}
              onIonChange={ev => setTitle(ev.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={ev => setDescription(ev.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
