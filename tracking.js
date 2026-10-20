// tracking.js - add to the PUBLIC Kamie-HBD site (same folder as index.html).
// Records a small set of observable actions. It never reads wish text,
// never touches script.js, and never throws errors into the page.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Public client configuration (not a secret; the security rules protect the data).
const firebaseConfig = {
  apiKey: "AIzaSyBnbcg28XwfTXNqbaEVl_kGMZjr5IaDE8k",
  authDomain: "kamie-hbd-tracker.firebaseapp.com",
  projectId: "kamie-hbd-tracker",
  storageBucket: "kamie-hbd-tracker.firebasestorage.app",
  messagingSenderId: "788658613045",
  appId: "1:788658613045:web:c19be35c1091aa08773a7c",
  measurementId: "G-FZKYEP6QB5"
};

// ---------- Random ids ----------
const uuid = () =>
  crypto.randomUUID
    ? crypto.randomUUID() // 36 characters
    : [...crypto.getRandomValues(new Uint8Array(16))]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // 32 characters

// One id per browser tab visit. It survives a page refresh but not a new tab.
function getSessionId() {
  try {
    let id = sessionStorage.getItem("kh_session");
    if (!id) {
      id = uuid();
      sessionStorage.setItem("kh_session", id);
    }
    return id;
  } catch {
    return uuid(); // storage blocked: fall back to a one-off id
  }
}
const sessionId = getSessionId();

// ---------- Firebase setup (starts once, in the background) ----------
const ready = (async () => {
  const app = initializeApp(firebaseConfig, "kamie-tracker");
  const auth = getAuth(app);
  await auth.authStateReady();
  if (!auth.currentUser) await signInAnonymously(auth);
  return { db: getFirestore(app), uid: auth.currentUser.uid };
})();
ready.catch((err) => console.debug("[tracking] setup failed:", err?.code || err));

// ---------- Sending one event ----------
const lastSent = new Map();

async function track(type, section, label) {
  try {
    // Ignore accidental double-fires of the same action within 800ms
    const key = `${type}|${section}|${label || ""}`;
    const now = Date.now();
    if (now - (lastSent.get(key) || 0) < 800) return;
    lastSent.set(key, now);

    const { db, uid } = await ready;
    const data = { type, section, sessionId, uid, clientTime: now, createdAt: serverTimestamp() };
    if (label) data.label = label;
    await setDoc(doc(db, "events", uuid()), data);
  } catch (err) {
    console.debug("[tracking] event not recorded:", err?.code || err);
  }
}

// ---------- Which clicks mean what ----------
// [event type, section, optional label]
const BY_ID = {
  yes: ["gift_accepted", "welcome"],          // also means the main menu opened
  no: ["gift_declined", "welcome"],
  back1: ["declined_return", "declined"],
  "card-wish": ["section_opened", "wish"],
  "card-pics": ["section_opened", "pictures"],
  "card-song": ["section_opened", "song"],
  "card-kam": ["section_opened", "person"],
  "card-letter": ["section_opened", "letter"],
  fave: ["album_opened", "pictures", "faves"],
  wallpaper: ["album_opened", "pictures", "wallpapers"],
  nail: ["album_opened", "pictures", "nails"],
  random: ["album_opened", "pictures", "randoms"],
  bw: ["album_opened", "pictures", "bw"],
  mirror: ["album_opened", "pictures", "mirrors"],
  lynx: ["person_view_opened", "person", "lynx"],
  bear: ["person_view_opened", "person", "bear"],
  "letter-download": ["letter_downloaded", "letter"],
  rate: ["rating_opened", "rating"]
};

const PAGE_CLASS_TO_SECTION = {
  "page-wish": "wish",
  "page-view": "pictures",
  "page-song": "song",
  "page-kam": "person",
  "page-letter": "letter"
};

// "https://x.com/resources/P/fave-3.mp4" -> "fave-3"
const stem = (url) =>
  String(url || "")
    .split("?")[0]
    .split("/")
    .pop()
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 40);

// One listener for the whole page. It only watches; it never blocks clicks.
document.addEventListener(
  "click",
  (e) => {
    try {
      const target = e.target;
      if (!(target instanceof Element)) return;

      // Buttons with known ids
      const idEl = target.closest("[id]");
      const mapped = idEl && BY_ID[idEl.id];
      if (mapped) return track(...mapped);

      // Wish send button: records only that it was clicked with something typed
      if (target.closest("#send-btn")) {
        const box = document.getElementById("wish-input");
        if (box && box.value.trim()) track("wish_send_clicked", "wish");
        return;
      }

      // "Back" buttons that return to the main menu
      const back = target.closest(".back2");
      if (back) {
        const pageClass = Object.keys(PAGE_CLASS_TO_SECTION).find((c) =>
          back.parentElement?.classList.contains(c)
        );
        return track("hub_returned", "hub", PAGE_CLASS_TO_SECTION[pageClass]);
      }

      // Video opened from an album
      const video = target.closest(".video-item");
      if (video) {
        return track("video_played", "pictures", stem(video.querySelector("source")?.src));
      }

      // Photo opened in the lightbox
      const photo = target.closest("a.gallery-item[data-lightbox]");
      if (photo) return track("photo_opened", "pictures", stem(photo.getAttribute("href")));
    } catch (err) {
      console.debug("[tracking] click handler error:", err);
    }
  },
  true // capture phase: sees the click before other code can stop it
);

// The visit itself
track("site_opened", "welcome");