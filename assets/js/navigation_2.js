// Get all the heading elements.
const HEADING_ELEMENTS = document.getElementsByClassName("heading");

// Get the heading IDs from the elements.
const HEADING_ID_LIST = [];
const NAVIGATION_LINKS = [];

for(let index = 0; index < HEADING_ELEMENTS.length; index++) {
    const HEADING_ID = HEADING_ELEMENTS[index].getAttribute("id");

    if(HEADING_ID !== null) {
        HEADING_ID_LIST.push(HEADING_ID);

        // Convert the heading IDs into capitalized format.
        const PARSED_ID_TEXT = HEADING_ID.split("-");
        let navigation_link = "";

        for(let index = 0; index < PARSED_ID_TEXT.length; index++) {
            const FIRST_CHARACTER = PARSED_ID_TEXT[index].charAt(0).toUpperCase();
            const CAPITALIZED_TEXT = FIRST_CHARACTER + PARSED_ID_TEXT[index].slice(1);
    
            navigation_link += ` ${CAPITALIZED_TEXT}`
        }

        NAVIGATION_LINKS.push(navigation_link);
    }
}

// Create navigation list.
const NAVIGATION_LIST_ELEMENT = document.getElementById("navigation-list");

for(let index = 0; index < NAVIGATION_LINKS.length; index++) {
    const P_ELEMENT = document.createElement("p");
    P_ELEMENT.textContent = `${index + 1}. `;

    const A_ELEMENT = document.createElement("a");
    A_ELEMENT.textContent = NAVIGATION_LINKS[index];

    A_ELEMENT.setAttribute("href", `#${HEADING_ID_LIST[index]}`);
    P_ELEMENT.appendChild(A_ELEMENT);
    NAVIGATION_LIST_ELEMENT.appendChild(P_ELEMENT);
}

// Display navigation.
let window_width = window.screen.width;
displayNavigation(window_width);

window.onresize = function() {
    window_width = window.screen.width;
    displayNavigation(window_width);
};

function displayNavigation(windowWidth) {
    if(HEADING_ID_LIST.length !== 0) {
        const NAVIGATION_ELEMENT = document.getElementById("navigation");
        const SCROLL_TO_TOP = document.getElementById("scroll-to-top");

        if(windowWidth > 1199) {
            NAVIGATION_ELEMENT.style.display = "flex";
            SCROLL_TO_TOP.style.display = "none";
        } else {
            NAVIGATION_ELEMENT.style.display = "none";
            SCROLL_TO_TOP.style.display = "flex";
        }
    }
}