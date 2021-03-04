/*
 *   Journal data for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Ok"
    },{
        id: 2,
        date: "07/26/2025",
        concept: "Complex Flexbox",
        entry: "I tried to have an element in my Flexbox layout also be another Flexbox layout. It hurt my brain. I hate Steve.",
        mood: "Sad"
    },{
        id: 3,
        date: "07/30/2025",
        concept: "Automating with Functions",
        entry: "We learned how to take data from from arrays/objects, convert it to html, and send it to the DOM",
        mood: "Great"
    }
]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/

//I changed this function to list the entries newest to oldest
//rather than oldest to newest
export const getJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(nextEntry.date) - Date.parse(currentEntry.date)
    )
    return sortedByDate
}