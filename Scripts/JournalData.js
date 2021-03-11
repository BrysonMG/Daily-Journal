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
