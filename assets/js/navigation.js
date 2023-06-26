// Get the elements which has the ID value of 'heading'.
const headings = document.getElementsByClassName("heading");
const HEADING_ID_LIST = [];
let heading_number = 1;

for(let index = 0; index < headings.length; index++) {
    const heading_id = headings[index].getAttribute("id");

    if(heading_id !== null) {
        HEADING_ID_LIST.push(heading_id);

        // Assign number to the heading.
        headings[index].textContent = `${heading_number}. ${headings[index].textContent}`
        heading_number++;
    }
}

const NAVIGATION_LINKS = [];

// Convert the link texts into capitalized format.
for(let index = 0; index < HEADING_ID_LIST.length; index++) {
    const parsedIdText = HEADING_ID_LIST[index].split("-");
    let navigation_link = "";

    for(let index_2 = 0; index_2 < parsedIdText.length; index_2++) {
        const firstCharacter = parsedIdText[index_2].charAt(0);
        const capitalizedFirstCharacter = firstCharacter.toUpperCase();
        const capitalizedText = capitalizedFirstCharacter + parsedIdText[index_2].slice(1);

        navigation_link += ` ${capitalizedText}`
    }
    
    NAVIGATION_LINKS.push(navigation_link);
}

// Put navigation links inside unordered list.
// const navigationElement = document.getElementById("navigation");
const navigationListElement = document.getElementById("navigaation-list");

for(let index = 0; index < NAVIGATION_LINKS.length; index++) {
    const newListElement = document.createElement("li");
    const newLinkElement = document.createElement("a");

    newLinkElement.textContent = NAVIGATION_LINKS[index];

    newLinkElement.setAttribute("href", `#${HEADING_ID_LIST[index]}`);
    // navigationElement.appendChild(newLinkElement);
    newListElement.appendChild(newLinkElement);
    navigationListElement.appendChild(newListElement);
}