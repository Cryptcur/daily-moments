export interface Entry {
  id: string;
  title: string;
  description: string;
  date: string;
  pictureUrl: string;
}

export const toEntry = (doc: firebase.firestore.DocumentSnapshot): Entry => {
  return { id: doc.id, ...doc.data() } as Entry;
};
