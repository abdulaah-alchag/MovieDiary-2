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

const { movieContainer: favoritesContainer } = getRefs();

// Loading favorites movie
loadFavorites();

////////////////// Film Details —— move details card below clicked movie /////////////////////////

// Overlay
const overlay = document.querySelector("#movie-details-overlay");
const detailsCard = document.querySelector("#movie-details-card");

setupFavoriteRemoveCleanup(favoritesContainer, handelFavoritesRemove);
setupModalClose(detailsCard, overlay);

// Detailskarte öffnen
favoritesContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".show-details");
  if (!btn) return;

  const movieId = btn.dataset.id;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movie = favorites.find((m) => m.id == movieId);
  if (!movie) return;

  detailsCard.innerHTML = buildDetailsHTML(movie);

  overlay.classList.remove("hidden");

  // transition
  setTimeout(() => {
    detailsCard.classList.remove("opacity-0", "translate-y-5", "scale-95");
  }, 20);
  loadNotes(movieId);
});

// Save new note
document.addEventListener("click", (e) => {
  if (!e.target.matches("#add-note")) return;

  const movieId = e.target.dataset.id;
  const input = document.querySelector("#note-input");

  if (!input || input.value.trim() === "") return;

  const notes = JSON.parse(localStorage.getItem("notes-" + movieId)) || [];
  notes.push(input.value.trim());
  localStorage.setItem("notes-" + movieId, JSON.stringify(notes));

  input.value = "";
  loadNotes(movieId);
});
