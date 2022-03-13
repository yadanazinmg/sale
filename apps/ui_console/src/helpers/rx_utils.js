import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { from, fromEventPattern, of } from "rxjs";
import { map, tap, filter, mergeMap, distinctUntilChanged } from "rxjs/operators";

export const getDocument = (docPath, id, idField = "id") => {
  const db = getFirestore();
  return from(getDoc(doc(db, docPath, id))).pipe(
    filter((doc) => doc.exists()),
    map((doc) => ({
      ...doc.data(),
      [idField]: doc.id,
    }))
  );
};

export const getDocuments = (collectionPath, idField = "id") => {
  const db = getFirestore();
  return from(getDocs(collection(db, collectionPath))).pipe(
    map((docs) => {
      const docArr = [];
      docs.forEach((doc) => {
        docArr.push({
          ...doc.data(),
          [idField]: doc.id,
        });
      });
      return docArr;
    })
  );
};
