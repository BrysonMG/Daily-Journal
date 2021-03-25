import { useAllEntries, createEntry, getSelectedEntry, updateEntry, deleteEntry } from './JournalData.js';
import { listEntries, onlyUsersEntries } from './JournalList.js';
import { entryAsHTML } from './JournalEntry.js';
import { showEntryForm } from './EntryForm.js';
import { EditForm } from './EditForm.js';
import { displayLoginRegister, displayLogout, logoutUser,
    setLoggedInUser, loginUser, useLoggedInUser, registerUser } from './Login.js'

const filtered2HTML = (arr) => {
    let newHTML = '';
    for (const eachObj of arr) {
        newHTML += entryAsHTML(eachObj)
    }
    return newHTML
}

const showFilteredMoods = (mood) => {
    const filtered = onlyUsersEntries.filter(eachEntry => {
        if (eachEntry.mood === mood) {
            return eachEntry
        }
    })
    
    const entriesElement = document.querySelector(".entries")
    entriesElement.innerHTML = filtered2HTML(filtered)
}

const mainElement = document.querySelector("body");

mainElement.addEventListener("change", e => {
    if (e.target.id === "filterMood") {

        let moodSelect = e.target.options.selectedIndex;

        if (e.target.options[moodSelect].value === "all") {
            const entriesElement = document.querySelector(".entries");
            entriesElement.innerHTML = filtered2HTML(onlyUsersEntries);
        } else {
            showFilteredMoods(e.target.options[moodSelect].value)
        }
    }
})

mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "submit") {
        const userObj = JSON.parse(sessionStorage.getItem("user"))

        const date = document.querySelector("input[name='date']").value;
        const concepts = document.querySelector("input[name='concepts']").value;
        const entry = document.querySelector("textarea[name='entry']").value;
        const mood = document.querySelector("select[name='mood']").value;
        const userId = userObj.id;

        const entryObj = {
            date: date,
            concept: concepts,
            entry: entry,
            mood: mood,
            userId: userId
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

//
//
//Below here, Login/logout/register functions and listeners
//
//

const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        //If there IS a user, do this
        const userObj = JSON.parse(sessionStorage.getItem("user"))
        setLoggedInUser(userObj)
        displayLogout(userObj)
        showEntryForm();
        //Eventually, change listEntries for a function that only shows user's entries
        listEntries();
    } else {
        //If there IS NOT a user, do this
        displayLoginRegister()
    }
}

checkForUser();

//Login Button
mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "loginBtn") {
        const userObject = {
            username: document.querySelector("input[name='loginUsername']").value,
            email: document.querySelector("input[name='loginEmail']").value
        }

        loginUser(userObject)
        .then(dbUserObj => {
            if (dbUserObj) {
                //if user exists, do this
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                const userObj = JSON.parse(sessionStorage.getItem("user"))
                displayLogout(userObj);
                showEntryForm();
                //Eventually change listEntries for a function that only shows user's entries
                listEntries();
                location.reload();
            } else {
                alert("Invalid user, try again or register a new account.")
                displayLoginRegister()
            }
        })
    }
})

//Register Button
mainElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "registerBtn") {

        const userObject = {
            username: document.querySelector("input[name='registerUsername']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }

        registerUser(userObject)
        .then(dbUserObj => {
            if (dbUserObj) {
            sessionStorage.setItem("user", JSON.stringify(dbUserObj));
            const userObj = JSON.parse(sessionStorage.getItem("user"))
            displayLogout(userObj);
            showEntryForm();
            location.reload();
            } else {
                displayLoginRegister();
            }
    })
    }
})

//Logout Button
mainElement.addEventListener("click", event => {
    if (event.target.id === "logoutBtn") {
        logoutUser();
        sessionStorage.clear();
        checkForUser()
        const headerSelect = document.querySelector("#usernameDisplay");
        headerSelect.innerHTML = `Please Login or Register`;
        const DOMselect = document.querySelector("main");
        DOMselect.innerHTML = `
        <div class="main-container">
            <div class="form-container">

            </div>
        </div>
        
        <br>
        <div class="entries">

        </div>
        `
    }
})