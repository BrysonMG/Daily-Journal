import { useAllEntries } from './JournalData.js';
import { listEntries } from './JournalList.js';
import { entryAsHTML } from './JournalEntry.js';
listEntries();

const mainElement = document.querySelector("main");

mainElement.addEventListener("change", e => {
    if (e.target.id === "filterMood") {

        let moodSelect = e.target.options.selectedIndex;

        if (e.target.options[moodSelect].value === "all") {
            const entriesElement = document.querySelector(".entries");
            entriesElement.innerHTML = filtered2HTML(useAllEntries());
        } else {
            showFilteredMoods(e.target.options[moodSelect].innerHTML)
        }
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