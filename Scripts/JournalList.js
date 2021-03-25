import { getEntries } from './JournalData.js';
import { entryAsHTML } from './JournalEntry.js';
import { useLoggedInUser } from './Login.js'

const DOMselector = document.querySelector('.entries');

export let onlyUsersEntries = [];

export const listEntries = () => {
    getEntries()
    .then(response => {
        const arrOfEntries = response;
        const currentUser = useLoggedInUser();
        onlyUsersEntries = [];
        let HTMLlist = ``;
        for (const eachEntry of arrOfEntries) {
            if (eachEntry.userId === currentUser.id) {
                HTMLlist += entryAsHTML(eachEntry)
                onlyUsersEntries.push(eachEntry)
            }
        }
        DOMselector.innerHTML = HTMLlist;
    })
}