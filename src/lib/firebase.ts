// Firebase client‑only wrapper
// All Firebase packages are loaded lazily via require() inside a typeof window check
// so that Next.js never tries to bundle them for the server, preventing ENOENT errors.

let app: any = null;
let dbInstance: any = null;
let auth: any = null;

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { initializeApp, getApps, getApp } = require("firebase/app");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { getAuth } = require("firebase/auth");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const firebaseConfig = require("../../firebase-applet-config.json");

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
}

export { auth };

export function getFirestoreDb() {
  if (typeof window === "undefined" || !app) return null;
  if (!dbInstance) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getFirestore } = require("firebase/firestore");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const firebaseConfig = require("../../firebase-applet-config.json");
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
  return dbInstance;
}

export default app;
