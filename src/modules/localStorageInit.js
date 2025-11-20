export const localStorageInit =()=>{
  if (!localStorage.getItem("favorites")) {
  localStorage.setItem("favorites", JSON.stringify([]));
}
}