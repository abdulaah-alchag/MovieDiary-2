//////////////////////// notes hochladen & speichern /////////////////////////
export function loadNotes(movieId) {
  const notes = JSON.parse(localStorage.getItem("notes-" + movieId)) || [];
  const list = document.querySelector("#notes-list");

  if (!list) return;
  list.innerHTML = notes
    .map(
      (n) => `
      <div class="bg-background-cards p-4 rounded-lg border border-secondary-text-grey-blue/20">
        ${n}
      </div>`,
    )
    .join("");
}

export function saveNote(movieId, text) {
  const notes = JSON.parse(localStorage.getItem("notes-" + movieId)) || [];
  notes.push(text.trim());
  localStorage.setItem("notes-" + movieId, JSON.stringify(notes));
}
