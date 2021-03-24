import { getEntries } from './JournalData.js';
import { entryAsHTML } from './JournalEntry.js';

const DOMselector = document.querySelector('.entries');

export const listEntries = () => {
    getEntries()
    .then(response => {
        let HTMLlist = ``;

        for (const eachEntry of response) {
            HTMLlist += entryAsHTML(eachEntry);
        }   

    DOMselector.innerHTML = HTMLlist;
    })

}