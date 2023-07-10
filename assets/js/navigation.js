// Get all the heading elements.
const HEADING_ELEMENTS = document.getElementsByClassName("heading");

// Declare title depth counter.
let titleDepthCounter = [];

// Get the heading IDs from the elements.
const HEADING_ID_LIST = [];
const NAVIGATION_LIST_ELEMENT = document.getElementById("navigation-list");

for (let index = 0; index < HEADING_ELEMENTS.length; index++) {
  const heading_id = HEADING_ELEMENTS[index].getAttribute("id");

  if (heading_id !== null) {
    HEADING_ID_LIST.push(heading_id);

    // Convert the heading IDs into capitalized format.
    const PARSED_ID_TEXT = heading_id.split("-");
    let navigation_link = "";

    for (let index_2 = 0; index_2 < PARSED_ID_TEXT.length; index_2++) {
      const first_character = PARSED_ID_TEXT[index_2].charAt(0).toUpperCase();
      const capitalized_text =
        first_character + PARSED_ID_TEXT[index_2].slice(1);

      navigation_link += ` ${capitalized_text}`;
    }

    // Create navigation list.
    // In this section, title depth and its styling also take into account.
    const title_depth = HEADING_ELEMENTS[index].classList[2];

    if (title_depth !== undefined) {
      const title_depth_length = title_depth.length;

      // If the n-th array is not available, create one and assing '0' to it.
      if (titleDepthCounter[title_depth_length - 1] === undefined) {
        titleDepthCounter[title_depth_length - 1] = 0;
      }

      // If depth length is less than the array size, reset some part of the counter.
      // For example if the next number is '6' and the current counter is '5.8', pop the '8'.
      // Because there might be a subtitle in '6'. If it is the case, the counter should start from the '0', not the  '8'.

      if (title_depth_length < titleDepthCounter.length) {
        for (
          let index_2 = 0;
          index_2 < titleDepthCounter.length - title_depth_length;
          index_2++
        ) {
          titleDepthCounter.pop();
        }
      }

      titleDepthCounter[title_depth_length - 1] += 1;

      // Cereate the number to be assigned as an ordered list.
      let titleNumber = "";

      for (let index_2 = 0; index_2 < title_depth_length; index_2++) {
        titleNumber += `${titleDepthCounter[index_2]}.`;
      }

      const ELEMENT_P = document.createElement("p");
      ELEMENT_P.textContent = `${titleNumber} `;
      ELEMENT_P.style.marginLeft = `${8 * (title_depth_length - 1)}px`;

      const ELEMENT_A = document.createElement("a");
      ELEMENT_A.textContent = navigation_link;
      ELEMENT_A.setAttribute("href", `#${heading_id}`);

      ELEMENT_P.appendChild(ELEMENT_A);
      NAVIGATION_LIST_ELEMENT.appendChild(ELEMENT_P);
    }
  }
}

// Display navigation.
let window_width = window.screen.width;
displayNavigation(window_width);

window.onresize = function () {
  window_width = window.screen.width;
  displayNavigation(window_width);
};

function displayNavigation(windowWidth) {
    if (HEADING_ID_LIST.length !== 0) {
      const NAVIGATION_ELEMENT = document.getElementById("navigation");
      const SCROLL_TO_TOP = document.getElementById("scroll-to-top");
  
      if (windowWidth > 1199) {
        NAVIGATION_ELEMENT.style.display = "flex";
        SCROLL_TO_TOP.style.display = "none";
      } else {
        NAVIGATION_ELEMENT.style.display = "none";
        SCROLL_TO_TOP.style.display = "flex";
      }
    }
  }
  

// Scrollspy / Scroll Navigation
document.addEventListener("DOMContentLoaded", function () {
  const ELEMENTS_WITH_HEADINGS = document.querySelectorAll(".heading");
  const NAV_LINKS = document.querySelectorAll("#navigation-list a");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    ELEMENTS_WITH_HEADINGS.forEach(function (element) {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;

      if (window.scrollY >= elementTop - elementHeight / 2) {
        currentSection = element.getAttribute("id");
      }
    });

    NAV_LINKS.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
});