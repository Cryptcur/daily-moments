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
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth";
import { firestore, storage } from "../firebase";

const savePicture = async (blobUrl, userId) => {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log("saved", url);
  return url;
};

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(
    () => () => {
      if (pictureUrl.startsWith("blob")) {
        URL.revokeObjectURL(pictureUrl);
        console.log("revoked", pictureUrl);
      }
    },
    [pictureUrl]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const picUrl = URL.createObjectURL(file);
      console.log(picUrl);
      setPictureUrl(picUrl);
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    const entryData = { date, title, pictureUrl, description };
    if (pictureUrl.startsWith("blob:")) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
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
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <img
              style={{ cursor: "pointer" }}
              src={pictureUrl}
              alt=""
              onClick={() => fileInputRef.current.click()}
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
