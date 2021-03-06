//This module now fetches from the api rather than using data stored within it.

//You must do "json-server -p 8088 -w Data.json" to serve the api before this will work

let allEntries = [];

export const useAllEntries = () => {
    return [...allEntries];
}

export const getEntries = () => {
    return fetch("http://localhost:8088/entries")
    .then(Response => Response.json())
    .then(ParsedResponse => {
        
        const sortedByDate = ParsedResponse.sort(
            (currentEntry, nextEntry) =>
                Date.parse(nextEntry.date) - Date.parse(currentEntry.date)
        )
        allEntries = sortedByDate;
        return sortedByDate;
    })
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(Response => Response.json)
    .then(ParsedResponse => {
        return ParsedResponse;
    })
}

export const createEntry = (entryObj) => {
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
    .then(response => response.json())
}

//EDITING-PUT METHOD////////////////////////////

//To edit, first get the targeted entry, and make sure its up to date by fetching it.
export const getSelectedEntry = (entryId) => {
    return fetch(`http://localhost:8088/entries/${entryId}`)
    .then(entry => entry.json())
}

//Create a function that uses the put method to update the entry in the database
//It takes in the updated object as a parameter.
//then get updated list of entries
export const updateEntry = (updatedObj) => {
    return fetch(`http://localhost:8088/entries/${updatedObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedObj)
    })
    .then(response => response.json())
    .then(getEntries)
}

//DELETING ENTRIES/////////////////////////////

export const deleteEntry = (entryId) => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(getEntries)
}