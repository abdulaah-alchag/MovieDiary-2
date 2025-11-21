// notes speichern, laden,

// Save note
export function saveNote(movieId, text) {
  const notesKey = "notes-" + movieId;

  const existing = JSON.parse(localStorage.getItem(notesKey)) || [];
  existing.push(text);

  localStorage.setItem(notesKey, JSON.stringify(existing));
}

// Load notes array
export function getNotes(movieId) {
  return JSON.parse(localStorage.getItem("notes-" + movieId)) || [];
}

// Render notes HTML
export function renderNotes(listElement, movieId) {
  const notes = getNotes(movieId);
  listElement.innerHTML = notes
    .map(
      (n) => `
      <div class="bg-background-cards p-4 rounded-lg border border-secondary-text-grey-blue/20">
        ${n}
      </div>`
    )
    .join("");
}
