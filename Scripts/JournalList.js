import { getJournalEntries } from './JournalData.js';
import { entryAsHTML } from './JournalEntry.js';

const DOMselector = document.querySelector('.entries');

export const listEntries = () => {
    const entries = getJournalEntries();
    let HTMLlist = '';

    for (const eachEntry of entries) {
        HTMLlist += entryAsHTML(eachEntry);
    }

    DOMselector.innerHTML = HTMLlist;
}