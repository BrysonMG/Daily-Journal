const entryForm = () => {
    return `
    <form>
    <fieldset>
        <label for="date">Date:</label>
        <input type="date" name="date" id="date">
    </fieldset>
    <fieldset>
        <label for="concepts">Concepts Covered:</label>
        <input type="text" name="concepts" id="concepts">
    </fieldset>
    <fieldset>
        <label for="entry">Entry:</label>
        <textarea name="entry" id="entry" cols="30" rows="5"></textarea>
    </fieldset>
    <fieldset>
        <label for="mood">Mood:</label>
        <select name="mood" id="mood">
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
    <input id="submit" type="submit" value="Submit">
</form>
<br>
<div class="filterBox">
            <label for="filterMood" id="filterlabel">Only Show this mood</label>
            <br>
            <select name="filterMood" id="filterMood">
                <option value="all">Show All</option>
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
        </div>
    <br>
    `
}

export const showEntryForm = () => {
    const selector = document.querySelector(".form-container");
    selector.innerHTML = entryForm();
}
