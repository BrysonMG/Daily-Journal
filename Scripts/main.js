import { useAllEntries } from './JournalData.js';
import { listEntries } from './JournalList.js';
import { entryAsHTML } from './JournalEntry.js';
import { showEntryForm } from './EntryForm.js';
import { createEntry } from './JournalData.js';
showEntryForm();
listEntries();

const mainElement = document.querySelector("main");

mainElement.addEventListener("change", e => {
    if (e.target.id === "filterMood") {

        let moodSelect = e.target.options.selectedIndex;

        if (e.target.options[moodSelect].value === "all") {
            const entriesElement = document.querySelector(".entries");
            entriesElement.innerHTML = filtered2HTML(useAllEntries());
        } else {
            showFilteredMoods(e.target.options[moodSelect].value)
        }
    }
})

mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "submit") {
        const date = document.querySelector("input[name='date']").value;
        const concepts = document.querySelector("input[name='concepts']").value;
        const entry = document.querySelector("textarea[name='entry']").value;
        const mood = document.querySelector("select[name='mood']").value;

        const entryObj = {
            date: date,
            concept: concepts,
            entry: entry,
            mood: mood
        }
        createEntry(entryObj)
        .then(response => {
            listEntries();
            showEntryForm();
        })
    }
})


const filtered2HTML = (arr) => {
    let newHTML = '';
    for (const eachObj of arr) {
        newHTML += entryAsHTML(eachObj)
    }
    return newHTML
}

const showFilteredMoods = (mood) => {
    const filtered = useAllEntries().filter(eachEntry => {
        if (eachEntry.mood === mood) {
            return eachEntry
        }
    })
    
    const entriesElement = document.querySelector(".entries")
    entriesElement.innerHTML = filtered2HTML(filtered)
}