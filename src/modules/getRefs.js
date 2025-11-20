export const getRefs =()=>{
  return {
    movieContainer: document.querySelector(`#movies-container`),
    favoriteControlCardButtons : document.querySelectorAll(".add-fav"),
    detailsSection: document.querySelector("#movie-details"),
  };
};
