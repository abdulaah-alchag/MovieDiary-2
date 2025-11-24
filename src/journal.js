import {
  handelFavoritesRemove,
  loadFavorites,
} from "./modules/favoritesControl.js";
import { getRefs } from "./modules/getRefs.js";
import { loadNotes, saveNote } from "./modules/notes.js";
import {
  buildDetailsHTML,
  setupFavoriteRemoveCleanup,
  setupModalClose,
} from "./modules/ui.js";

// Refs holen
const { movieContainer: favoritesContainer } = getRefs();

// Favorites laden und im DOM anzeigen
loadFavorites();

// Overlay und Detail-Karte referenzieren
const overlay = document.querySelector("#movie-details-overlay");
const detailsCard = document.querySelector("#movie-details-card");

// Entfernen von Favoriten + evtl. Details schließen
setupFavoriteRemoveCleanup(favoritesContainer, handelFavoritesRemove);
// Modal schließen (per X-Button oder Klick außerhalb)
setupModalClose(detailsCard, overlay);

// Details anzeigen, wenn auf "show details" geklickt wird
favoritesContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".show-details");
  if (!btn) return;

  const movieId = btn.dataset.id;
  // Favoriten aus LocalStorage laden
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movie = favorites.find((m) => m.id == movieId);
  if (!movie) return;

  // HTML für Details erzeugen
  detailsCard.innerHTML = buildDetailsHTML(movie);

  // Overlay sichtbar machen
  overlay.classList.remove("hidden");

  // Öffnungsanimation starten
  setTimeout(() => {
    detailsCard.classList.remove("opacity-0", "translate-y-5", "scale-95");
  }, 20);

  // Notes für dieses Movie laden
  loadNotes(movieId);
});

// Neue Notiz speichern
document.addEventListener("click", (e) => {
  if (!e.target.matches("#add-note")) return;

  const movieId = e.target.dataset.id;
  const input = document.querySelector("#note-input");

  if (!input || input.value.trim() === "") return;

  // Notiz in LocalStorage speichern
  saveNote(movieId, input.value);

  // Eingabefeld leeren
  input.value = "";

  // Notes neu laden
  loadNotes(movieId);
});

// // Prüfen ob leer
setTimeout(() => {
  checkEmptyFavoritesState();
}, 0);

// ------------------------
function checkEmptyFavoritesState() {
  // stelle sicher, dass wir auf der Journal-Seite sind
  const journalPage = document.querySelector("#journal-page");
  if (!journalPage) return; // <-- verhindert Fehler auf der Homepage

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    journalPage.innerHTML = `
      <div id="empty-state"
        class="col-span-full flex flex-col justify-center items-center opacity-0 translate-y-5 transition-all duration-700">

        <dotlottie-wc class="w-96"
          src="https://lottie.host/3d1f3724-085b-4212-81d8-0c400bd3301f/6QhfCdtOsf.lottie"
          autoplay loop>
        </dotlottie-wc>

        <p class="text-secondary-text-grey-blue text-2xl text-center font-semibold">
          Your journal is empty 🍿
        </p>

        <p class="text-secondary-text-grey-blue text-md mt-2 mb-6 text-center">
          Start adding favorite movies and write your notes!
        </p>

        <a href="index.html"
          class="px-6 py-3 bg-popcorn-gold-accent1 text-background-main rounded-lg
          hover:bg-red-coral-accent3 transition-all shadow-md hover:shadow-lg">
          Discover Movies
        </a>
      </div>
    `;

    setTimeout(() => {
      document
        .querySelector("#empty-state")
        .classList.remove("opacity-0", "translate-y-5");
    }, 50);
  }
}
