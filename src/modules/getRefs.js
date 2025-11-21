export const getRefs = () => {
  return {
    movieContainer: document.querySelector(`#movies-container`),
    favoriteControlCardButtons: document.querySelectorAll(".add-fav"),
    // detailsSection: document.querySelector("#movie-details"),

    movieDetailsOverlay: document.querySelector("#movie-details-overlay"),
    movieDetailsCard: document.querySelector("#movie-details-card"),
  };
};
