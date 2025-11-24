// overlay , html-cards //build moviecard
export function buildDetailsHTML(movie) {
  return `
  <div class="relative">
    <div id="close-btn" class="cursor-pointer transition group absolute top-0 right-0 z-50">
      <svg
         viewBox="0 0 24 24"
          class="w-10 h-10 fill-current text-red-coral-accent3 group-hover:text-[var(--color-popcorn-gold-accent1)] transition  "
          xmlns="http://www.w3.org/2000/svg"
       >
        <path d="M12 2C6.49556 2 2 6.49556 2 12C2 17.5044 6.49556 22 12 22C17.5044 22 22 17.5044 22 12C22 6.49556 17.5044 2 12 2ZM15.9393 15.9393C15.658 16.2206 15.2319 16.2628 14.9393 16.0669L14.8536 15.9999L12 13.1464L9.14645 15.9999C8.85444 16.2919 8.37828 16.2919 8.08622 15.9999C7.80491 15.7186 7.76268 15.2924 7.95859 14.9999L8.02563 14.9142L10.8787 12.0607L8.02563 9.20711C7.74432 8.9258 7.70209 8.49964 7.898 8.20711C8.17931 7.9258 8.60547 7.88357 8.898 8.07948L8.98374 8.14645L12 11.1623L15.0163 8.14645C15.2976 7.86514 15.7238 7.8229 16.0163 8.01882L16.102 8.08579C16.3833 8.3671 16.4256 8.79326 16.2296 9.08579L16.1626 9.17152L13.1464 12.1877L16.1626 15.2039C16.4439 15.4852 16.4862 15.9114 16.2903 16.2039L16.2232 16.2896L15.9393 15.9393Z"/>
      </svg>
  </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-14">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="rounded-xl shadow-lg" />

      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold">${movie.title}</h2>
        <p class="text-secondary-text-grey-blue text-lg">${movie.release_date}</p>
        <p class="text-secondary-text-grey-blue leading-relaxed">${movie.overview}</p>

        <textarea id="note-input"
          class="bg-background-main text-main-text-light-grey p-4 rounded-xl border border-secondary-text-grey-blue/30"
          placeholder="Write a note..."></textarea>

        <button id="add-note" data-id="${movie.id}"
          class="self-start px-6 py-2 bg-popcorn-gold-accent1 text-background-main rounded-lg hover:bg-red-coral-accent3 transition-all">
          send
        </button>
      </div>
    </div>

    <h3 class="text-xl font-bold mt-10 mb-4">Recent Noten</h3>
    <div id="notes-list" class="flex flex-col gap-4"></div>
  `;
}

////////////////// Remove Favorite ////////////////////
export function setupFavoriteRemoveCleanup(
  favoritesContainer,
  handelFavoritesRemove,
) {
  favoritesContainer.addEventListener("click", (e) => {
    handelFavoritesRemove(e);
    // Wir müssen den echten Button erhalten (falls SVG angeklickt wurde)
    const btn = e.target.closest("[data-id]");
    if (!btn) return;

    const movieId = btn.dataset.id;

    const detailsSection = document.querySelector("#movie-details-card");

    if (detailsSection && detailsSection.dataset.id == movieId) {
      const parent = detailsSection.parentElement;
      if (parent && parent.classList.contains("details-placeholder")) {
        parent.remove();
      }
      detailsSection.classList.add("hidden");
      detailsSection.dataset.id = "";
    }
  });
}

////////////////// Close button (Overlay) ////////////////////

export function setupModalClose(detailsCard, overlay) {
  document.addEventListener("click", (e) => {
    if (e.target.closest("#close-btn")) {
      closeModal(detailsCard, overlay);
      return;
    }

    if (e.target.id === "movie-details-overlay") {
      closeModal(detailsCard, overlay);
    }
  });
}
// Start close animation
function closeModal(detailsCard, overlay) {
  detailsCard.classList.add("opacity-0", "translate-y-5", "scale-95");
  // Wait for animation to finish
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 400);
}
