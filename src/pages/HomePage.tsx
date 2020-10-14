import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonThumbnail,
  IonImg
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { formatDate } from "../date";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    return entriesRef
      .orderBy("date", "desc")
      .limit(5)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entries.length > 0 ? (
          <IonList>
            {entries.map(entry => (
              <IonItem
                button
                key={entry.id}
                routerLink={`/my/entries/view/${entry.id}`}
              >
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{formatDate(entry.date)}</h2>
                  <h3>{entry.title}</h3>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <h2>No Entries</h2>
        )}

        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
