export const EditForm = (selectedObj) => {
    return `
    <form>
    <h2>Edit This Entry</h3>
    <fieldset>
        <label for="date">Date:</label>
        <input value="${selectedObj.date}" type="date" name="date" id="date">
    </fieldset>
    <fieldset>
        <label for="concepts">Concepts Covered:</label>
        <input value="${selectedObj.concept}" type="text" name="concepts" id="concepts">
    </fieldset>
    <fieldset>
        <label for="entry">Entry:</label>
        <textarea value="${selectedObj.entry}" name="entry" id="entry" cols="30" rows="5">${selectedObj.entry}</textarea>
    </fieldset>
    <fieldset>
        <label for="mood">Mood:</label>
        <select name="mood" id="mood">
            <option value="${selectedObj.mood}" selected >Unchanged</option>
            <option value="happy">Happy</option>
            <option value="great">Great</option>
            <option value="ok">Ok</option>
            <option value="sad">Sad</option>
            <option value="frustrated">Frustrated</option>
            <option value="hopeful">Hopeful</option>
            <option value="curious">Curious</option>
            <option value="other">Other</option>
            <option value="unknown">I'm not sure how I feel</option>
        </select>
    </fieldset>
    <button id="updatePost--${selectedObj.id}">Update</button>
    <button id="cancelEdit">Cancel</button>

    <input type="hidden" value="${selectedObj.id}" name="entryId">
    </form>
    `
}