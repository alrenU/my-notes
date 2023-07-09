// Get all the heading elements.
const HEADING_ELEMENTS = document.getElementsByClassName("heading");

// Declare title depth counter.
let titleDepthCounter = [];

// Get the heading IDs from the elements.
const HEADING_ID_LIST = [];
const NAVIGATION_LIST_ELEMENT = document.getElementById("navigation-list");

for(let index = 0; index < HEADING_ELEMENTS.length; index++) {
    const HEADING_ID = HEADING_ELEMENTS[index].getAttribute("id");

    if(HEADING_ID !== null) {
        HEADING_ID_LIST.push(HEADING_ID);

        // Convert the heading IDs into capitalized format.
        const PARSED_ID_TEXT = HEADING_ID.split("-");
        let navigation_link = "";

        for(let index_2 = 0; index_2 < PARSED_ID_TEXT.length; index_2++) {
            const FIRST_CHARACTER = PARSED_ID_TEXT[index_2].charAt(0).toUpperCase();
            const CAPITALIZED_TEXT = FIRST_CHARACTER + PARSED_ID_TEXT[index_2].slice(1);
    
            navigation_link += ` ${CAPITALIZED_TEXT}`
        }

        // Create navigation list.
        // In this section, title depth and its styling also take into account.
        const TITLE_DEPTH = HEADING_ELEMENTS[index].classList[2];

        if(TITLE_DEPTH !== undefined) {
            const TITLE_DEPTH_LENGTH = TITLE_DEPTH.length;

            // If the n-th array is not available, create one and assing '0' to it.
            if(titleDepthCounter[TITLE_DEPTH_LENGTH - 1] === undefined) {
                titleDepthCounter[TITLE_DEPTH_LENGTH - 1] = 0;
            }

            // If depth length is less than the array size, reset some part of the counter.
            // For example if the next number is '6' and the current counter is '5.8', pop the '8'.
            // Because there might be a subtitle in '6'. If it is the case, the counter should start from the '0', not the  '8'.

            if(TITLE_DEPTH_LENGTH < titleDepthCounter.length){
                for(let index_2 = 0; index_2 < (titleDepthCounter.length - TITLE_DEPTH_LENGTH); index_2++) {
                    titleDepthCounter.pop();
                }
            }

            titleDepthCounter[TITLE_DEPTH_LENGTH - 1] += 1;

            // Cereate the number to be assigned as an ordered list.
            let titleNumber = "";

            for(let index_2 = 0; index_2 < TITLE_DEPTH_LENGTH; index_2++) {
                titleNumber += `${titleDepthCounter[index_2]}.`;
            }

            const P_ELEMENT = document.createElement("p");
            P_ELEMENT.textContent = `${titleNumber} `;
            P_ELEMENT.style.marginLeft = `${8 * (TITLE_DEPTH_LENGTH - 1)}px`;

            const A_ELEMENT = document.createElement("a");
            A_ELEMENT.textContent = navigation_link;
            A_ELEMENT.setAttribute("href", `#${HEADING_ID}`);

            P_ELEMENT.appendChild(A_ELEMENT);
            NAVIGATION_LIST_ELEMENT.appendChild(P_ELEMENT);
        }
    }
}

// Display navigation.
let window_width = window.screen.width;
displayNavigation(window_width);

window.onresize = function() {
    window_width = window.screen.width;
    displayNavigation(window_width);
};

// FUNCTIONS
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