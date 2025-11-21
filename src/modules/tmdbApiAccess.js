export const accessTokenAuth =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDE4OGY2ZTExYzY1NzlmMDZlMzQzOWJkYmIwNzE4OSIsIm5iZiI6MTc2Mjg5ODAwNC4xNDUsInN1YiI6IjY5MTNiMDU0NzAwNDhkODJlYzlhY2NiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G_O2_echWC-sjWgWSdiL6YuaZlbtUL7d5PoEC5260Ik";
export const apiKey = "a0188f6e11c6579f06e3439bdbb07189";

const TMDB_ApiV3BaseUrl = "https://api.themoviedb.org/3";
const TMDB_ConfigurationEndpoint = "/configuration";
const TMDB_PopularMoviesEndpoint = "/movie/popular";
const NumberOfPages = "1";
const TMDB_PopMov_options = `&language=en-US&page=${NumberOfPages}`;
const QUERY = "?";
const API_KEY = `api_key=${apiKey}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessTokenAuth}`,
  },
};

let tmdbConfig;
/**
 * Get Popular Movie from TMDB
 * @param {function} renderMoviesFunc - Reference to the render movie function
 */
export function getPopularMovies(renderMoviesFunc) {
  /* First get API Config data */
  fetch(TMDB_ApiV3BaseUrl + TMDB_ConfigurationEndpoint + QUERY + API_KEY)
    .then((res) => {
      if (!res.ok) throw new Error("Request Error: Get configuration failed");
      // Or access the JSON data in the response
      return res.json();
    })
    .then((configData) => {
      console.log("Fetched config data", configData);
      tmdbConfig = configData;
      /* Then get Movie data */
      fetch(
        TMDB_ApiV3BaseUrl +
          TMDB_PopularMoviesEndpoint +
          QUERY +
          API_KEY +
          TMDB_PopMov_options
      )
        .then((res) => res.json())
        .then((movieData) => {
          console.log("Fetched movie data", movieData);
          renderMoviesFunc(movieData, configData);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

export function getTmdbConfig() {
  return tmdbConfig;
}
