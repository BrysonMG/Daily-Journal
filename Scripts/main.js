import { useAllEntries, createEntry, getSelectedEntry, updateEntry, deleteEntry } from './JournalData.js';
import { listEntries } from './JournalList.js';
import { entryAsHTML } from './JournalEntry.js';
import { showEntryForm } from './EntryForm.js';
import { EditForm } from './EditForm.js'

showEntryForm();
listEntries();

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

//Temporarily replace the entry form with an edit form, populated with the selected object
const showEdit = (selectedEntryObj) => {
    const formSelector = document.querySelector('.form-container');
    formSelector.innerHTML = EditForm(selectedEntryObj);
}

//Get an event listener for each edit button, but have it distinguish based on id
mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
        const entryId = event.target.id.split("--")[1];
        getSelectedEntry(entryId)
        .then(selectedEntry => {
            console.log(selectedEntry)
            showEdit(selectedEntry)
        })
    }
})

//Event listener for update button to save changes and PUT to the api
mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const entryId = event.target.id.split("--")[1];
        //Get all details from EditForm to build the object
        debugger
        const date = document.querySelector("input[name='date']").value
        const concept = document.querySelector("input[name='concepts']").value
        const entry = document.querySelector("textarea").value
        const mood = document.querySelector("select[name='mood']").value
        const entryObj = {
            date: date,
            concept: concept,
            entry: entry,
            mood: mood,
            id: parseInt(entryId)
        }
        updateEntry(entryObj)
        .then(response => {
            listEntries();
            showEntryForm();
        })
    }
})

mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "cancelEdit") {
        showEntryForm()
    }
})

mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const entryId = event.target.id.split("--")[1];
        deleteEntry(entryId)
        .then(response => {
            listEntries();
        })
    }
})