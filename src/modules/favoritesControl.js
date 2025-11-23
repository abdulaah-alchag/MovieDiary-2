import { getRefs } from "./getRefs.js";

export const handleFavoriteAdding = () => {
  // Click listener on movie container
  const refs = getRefs();
  refs.movieContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-fav");
    if (!btn) return;

    const addedFilmData = {
      overview: btn.dataset.overview,
      id: btn.dataset.id,
      title: btn.dataset.title,
      poster_path: btn.dataset.poster_path,
      release_date: btn.dataset.release_date,
    };

    const storageData = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = storageData.find(
      (item) => item.id === addedFilmData.id,
    );

    // If the movie is already in your favorites, delete it.
    if (alreadyExists) {
      const updatedData = storageData.filter(
        (item) => item.id !== addedFilmData.id,
      );
      localStorage.setItem("favorites", JSON.stringify(updatedData));

      // Change the button back to "Add"
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87
        C13.46 5.99 14.96 5 16.5 5C18.58 5 20 6.42 20 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      Add`;
      btn.classList.add("bg-popcorn-gold-accent1");
      btn.classList.remove("bg-mint-accent2");

      console.log(
        `The film "${addedFilmData.title}" has been removed from favorites.`,
      );
    } else {
      // Otherwise, add the film to your favorites
      const newStorageData = [...storageData, addedFilmData];
      localStorage.setItem("favorites", JSON.stringify(newStorageData));

      // Change the button to "Added"
      btn.innerHTML = `Added`;
      btn.classList.add("bg-mint-accent2");
      btn.classList.remove("bg-popcorn-gold-accent1");

      console.log(
        `The film "${addedFilmData.title}" has been added to your favorites`,
      );
    }
  });
};

// Function to check if a movie is already in favorites
function isFavorite(id) {
  const storageData = JSON.parse(localStorage.getItem("favorites")) || [];
  return storageData.some((item) => item.id === id);
}

// Function to update buttons after downloading movies

export const updateFavoriteButtons = () => {
  const refs = getRefs();
  refs.favoriteControlCardButtons.forEach((btn) => {
    const movieId = btn.dataset.id;
    if (isFavorite(movieId)) {
      btn.innerHTML = `Added`;
      btn.classList.add("bg-mint-accent2");
      btn.classList.remove("bg-popcorn-gold-accent1");
    } else {
      btn.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87
          C13.46 5.99 14.96 5 16.5 5C18.58 5 20 6.42 20 8.5
          c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      Add`;
      btn.classList.add("bg-popcorn-gold-accent1");
      btn.classList.remove("bg-mint-accent2");
    }
  });
};

// //////////// Downloading selected movies from localStorage //////////
export const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const refs = getRefs();

  // // If there is nothing, we show a message
  // if (favorites.length === 0) {
  //   refs.movieContainer.innerHTML = `
  //     <div class="col-span-full flex justify-center items-center py-10">
  //       <p class="text-secondary-text-grey-blue text-lg text-center">
  //          You haven’t added any favorite movies yet 🎬
  //       </p>
  //     </div>
  //   `;
  //   return;
  // }

  // Cleaning the container
  refs.movieContainer.innerHTML = "";

  // Render each card
  favorites.forEach((movie) => {
    const html = `
      <article
        class="movie-card bg-background-cards/70 rounded-xl overflow-hidden shadow-md border border-popcorn-gold-accent1/10 transition transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg duration-300"
      >
        <!-- Poster -->
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
             alt="${movie.title}"
             class="w-full aspect-[2/3] object-cover rounded-t-xl" />

        <!-- Content -->
        <div class="p-4 flex flex-col min-h-[220px]">
          <div class="flex-grow">
            <h2 class="text-lg font-semibold text-popcorn-gold-accent1 line-clamp-2 min-h-[48px]">${movie.title}</h2>
            <p class="mt-1 text-sm text-secondary-text-grey-blue line-clamp-3">${movie.overview}</p>
          </div>

          <!-- Footer Buttons  -->
          <div class="mt-3 flex items-center justify-between ">
            <div class="text-sm text-secondary-text-grey-blue">
               ${movie.release_date}
            </div>
            <!-- more button-->
            <div class="flex gap-3 ml-auto">
              <button
                 data-id="${movie.id}"
                  class="show-details  inline-flex items-center justify-center gap-2 w-22 bg-mint-accent2 text-background-main px-3 py-2 rounded-md font-semibold hover:bg-popcorn-gold-accent1 transition-all shadow-sm hover:shadow-md"
                    >
                        more
              </button>
              <button
                data-id="${movie.id}"
                class="remove-fav inline-flex items-center justify-center gap-2 w-22 bg-red-coral-accent3 text-background-main px-3 py-2 rounded-md font-semibold hover:bg-popcorn-gold-accent1 hover:text-background-main transition-all shadow-sm hover:shadow-md"
                >
                Remove
              </button>
            </div>
          </div>

           <!-- Hidden Details Box -->
      <div class="details hidden mt-4 p-4 bg-background-cards rounded-lg border border-popcorn-gold-accent1/20">

        <p class="text-sm text-secondary-text-grey-blue mb-2">
          <span class="font-bold">Release:</span> ${movie.release_date}
        </p>

        <p class="text-sm text-secondary-text-grey-blue mb-4">
          ${movie.overview}
        </p>

        <!-- Note Input -->
        <textarea
          class="note-input w-full bg-background-main text-main-text-light-grey p-3 rounded-lg border border-secondary-text-grey-blue/30"
          placeholder="Schreibe eine Notiz..."
        ></textarea>

        <button
          class="save-note mt-2 px-4 py-2 bg-popcorn-gold-accent1 text-background-main rounded-lg"
          data-id="${movie.id}"
        >
          Senden
        </button>

        <!-- Notes list -->
        <div class="notes-list mt-4 space-y-2"></div>

      </div>

        </div>
      </article>
    `;

    refs.movieContainer.insertAdjacentHTML("beforeend", html);
  });
};

////////////////// Remove Favorite ////////////////////
export const handelFavoritesRemove = (e) => {
  const refs = getRefs();
  const btn = e.target.closest(".remove-fav");
  if (!btn) return;

  const movieId = btn.dataset.id;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Redrawing the list
  loadFavorites();
};
