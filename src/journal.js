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
