export const entryAsHTML = (entryObj) => {
    return `
    <section id="entry--${entryObj.id}" class="journalEntry">
        <h3>Concepts: ${entryObj.concept}</h3>
        <h4>Mood: ${entryObj.mood}</h4>
        <p>${entryObj.entry}</p>
        <p>${entryObj.date}</p>
        <button id="edit--${entryObj.id}">Edit</button>
        <button id="delete--${entryObj.id}">Delete</button>
    </section>
    `
}