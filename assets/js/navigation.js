// Get the elements which has the ID value of 'heading'.
const headings = document.getElementsByClassName("heading");

const HEADING_ID_LIST = [];

for(let index = 0; index < headings.length; index++) {
    const heading_id = headings[index].getAttribute("id");

    if(heading_id !== null) {
        HEADING_ID_LIST.push(heading_id);
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
const navigationListElement = document.getElementById("navigation-list");

for(let index = 0; index < NAVIGATION_LINKS.length; index++) {
    const newParagraphElement = document.createElement("p");
    newParagraphElement.textContent = `${index + 1}. `;

    const newLinkElement = document.createElement("a");
    newLinkElement.textContent = NAVIGATION_LINKS[index];

    newLinkElement.setAttribute("href", `#${HEADING_ID_LIST[index]}`);
    newParagraphElement.appendChild(newLinkElement);
    navigationListElement.appendChild(newParagraphElement);
}

// Make navigation visible.
let window_width = window.screen.width;
displayNavigation(window_width);

window.onresize = function() {
    window_width = window.screen.width;
    displayNavigation(window_width);
};

function displayNavigation(windowWidth) {
    if(HEADING_ID_LIST.length !== 0) {
        const navigationElement = document.getElementById("navigation");
        const scrollToTop = document.getElementById("scroll-to-top");

        if(windowWidth > 1199) {
            navigationElement.style.display = "flex";
            scrollToTop.style.display = "none";
        } else {
            navigationElement.style.display = "none";
            scrollToTop.style.display = "flex";
        }
    }
}