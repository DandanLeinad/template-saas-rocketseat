import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";
import "server-only";

const firebaseCert = cert({
  projectId: "your-project-id",
  clientEmail: "your-client-email",
  privateKey: "your-private-key",
});

export const adminApp = initializeApp({
  credential: firebaseCert,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const db = getFirestore();
// export const storage = getStorage().bucket();