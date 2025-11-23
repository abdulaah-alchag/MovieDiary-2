import {
  TMDB_ApiV3BaseUrl,
  TMDB_PopMov_options,
  TMDB_SeachEndpoint,
  detailsCard,
  movieContainer,
  options,
  overlay,
  renderMovieCards,
} from "../main.js";
import { getTmdbConfig } from "./tmdbApiAccess.js";

export const searchApi = async function (query) {
  const QUERY = `?query=`;
  const searhcUrl =
    TMDB_ApiV3BaseUrl +
    TMDB_SeachEndpoint +
    QUERY +
    query +
    TMDB_PopMov_options;

  try {
    const res = await fetch(searhcUrl, options);
    if (!res.ok) {
      throw new Error("ma ente Hmar");
    }
    const data = await res.json();
    console.log(data);
    const html = ``;

    let element = data.results;
    console.log(element[0]);
    console.log(element[0].poster_path);

    if (!element[0]) {
      detailsCard.innerHTML = ``;
    }

    movieContainer.innerHTML = "";
    renderMovieCards(data, getTmdbConfig());
    detailsCard.innerHTML = `

      <!-- close Button-->
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

      <!-- Kart Inhalte in overlaym-->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pt-14">

          <img src="https://image.tmdb.org/t/p/w500${element[0].poster_path}" class="rounded-xl shadow-lg max-h-lg object-cover" />

          <div class="flex flex-col gap-4">
            <h2 class="text-3xl font-bold">${element[0].title}</h2>
            <p class="text-secondary-text-grey-blue text-lg">${element[0].release_date}</p>
            <p class="text-secondary-text-grey-blue leading-relaxed">${element[0].overview}</p>
          </div>
        </div>
        `;
    overlay.classList.remove("hidden");
    detailsCard.classList.remove("opacity-0", "translate-y-5", "scale-95");

    // Close button (Overlay)
    document.addEventListener("click", (e) => {
      if (e.target.closest("#close-btn")) {
        closeModal();
        return;
      }

      //
      if (e.target.id === "movie-details-overlay") {
        closeModal();
      }
    });
    function closeModal() {
      // Start close animation
      detailsCard.classList.add("opacity-0", "translate-y-5", "scale-95");

      // Wait for animation to finish
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 400);
    }
  } catch (err) {
    console.log(err);
  }
};
