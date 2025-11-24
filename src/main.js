import {
  handleFavoriteAdding,
  updateFavoriteButtons,
} from "./modules/favoritesControl.js";
import { localStorageInit } from "./modules/localStorageInit.js";
import { searchApi } from "./modules/searchApi.js";
import { getPopularMovies, getTmdbConfig, accessTokenAuth, apiKey } from "./modules/tmdbApiAccess.js";
// import { accessTokenAuth, apiKey } from "./private.js";
import "./style.css";

const url = "https://api.themoviedb.org/3/authentication";

export const TMDB_ApiV3BaseUrl = "https://api.themoviedb.org/3";
const NumberOfPages = "1";
export const TMDB_PopMov_options = `&language=en-US&page=${NumberOfPages}`;
const MAX_NR_OF_MOVIES = 16;
export const TMDB_SeachEndpoint = `/search/movie`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessTokenAuth}`,
  },
};

export const movieContainer = document.querySelector(`#movies-container`);

/* # Select image size. Options are:
 * "w45", "w92", "w154", "w185" ,"w300", "w500", "original"
 */
const ImageFileSize = "original";

/* # Data we need from TMDB for rendering the movie cards:
 * - id
 * - overview
 * - poster_path
 * - release_date
 * - title
 */
export function renderMovieCards(movieData, configData) {
  let index = 0;
  for (const element of movieData.results) {
    if (index++ < MAX_NR_OF_MOVIES) {
      const html = `
        <article
          class="#${element.id} bg-background-cards/70 rounded-xl overflow-hidden shadow-md border border-popcorn-gold-accent1/10 transition transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg duration-300"
        >
          <!-- Poster -->
          <img src="${configData.images.secure_base_url}${ImageFileSize}${element.poster_path}" alt="Poster" class="w-full aspect-[2/3] object-cover rounded-t-xl" />

          <!-- Content -->
          <div class="p-4 flex flex-col min-h-[220px]">
            <div class="flex-grow">
              <h2 class="text-lg font-semibold text-popcorn-gold-accent1 line-clamp-2 min-h-[48px]">
                ${element.title}
              </h2>
              <p
                class="mt-1 text-sm text-secondary-text-grey-blue line-clamp-3"
              >
              ${element.overview}
              </p>
            </div>

            <!-- Footer (release + button) -->
            <div class="mt-3 flex items-center justify-between gap-3">
              <div class="text-sm text-secondary-text-grey-blue">
               ${element.release_date}
              </div>
              <button
              data-overview="${element.overview}"
              data-id="${element.id}"
              data-title="${element.title}"
              data-poster_path="${element.poster_path}"
              data-release_date="${element.release_date}"
                class="add-fav inline-flex items-center justify-center gap-2 w-22 bg-popcorn-gold-accent1 text-background-main px-3 py-2 rounded-md font-semibold hover:bg-red-coral-accent3 hover:text-background-main transition-all shadow-sm hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42
               3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99
               14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4
               6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>`; /* Back ticks, JavaScript Template literals */

      movieContainer.insertAdjacentHTML(`beforeend`, html);
    } else {
      break;
    }
  }
  handleFavoriteAdding(); //souher
  updateFavoriteButtons(); //souher
}

/**
 * Start fetching data from TMDB
 * Pass through function renderMovieCards and call it after config- and movie-data is safely fetched
 */
getPopularMovies(renderMovieCards);

empty - fav;

/////////////////abood///////////////////////

/////////////////////////////////////////////////////////
// Search Functionality
main;
const searchInput = document.getElementById("search-input");
const form = document.getElementById("search");

export const overlay = document.querySelector("#movie-details-overlay");
export const detailsCard = document.querySelector("#movie-details-card");
// Declare the search input as a Form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  console.log(query);
  //fetch data using searchApi
  searchApi(query);
});

////////////////////////////////////////////////////////

// Update the buttons after loading movies (after a short delay)
setTimeout(updateFavoriteButtons, 1000);
