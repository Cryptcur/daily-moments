export interface Entry {
  id: string;
  title: string;
  description: string;
}

export const toEntry = (doc: firebase.firestore.DocumentSnapshot): Entry => {
  return { id: doc.id, ...doc.data() } as Entry;
};
